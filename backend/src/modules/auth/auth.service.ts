import prisma from "../../database/prisma.js";
import { ApiError } from "../../shared/ApiError.js";
import {
  comparePassword,
  generateAccessToken,
} from "./auth.utils.js";

// ─── login ──────────────────────────────────────────────────────────────────

export async function login(userId: string, password: string) {
  // 1. Find user by userId
  const user = await prisma.user.findUnique({
    where: { userId },
    include: {
      memberships: {
        include: {
          wedding: {
            select: {
              id: true,
              weddingName: true,
              brideName: true,
              groomName: true,
              weddingDate: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid credentials.");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account has been deactivated.");
  }

  // 2. Verify password
  const isMatch = await comparePassword(password, user.passwordHash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials.");
  }

  // 3. Generate JWT
  const token = generateAccessToken(user.id);

  // 4. Return token + user (excluding passwordHash)
  const { passwordHash: _, ...safeUser } = user;

  return { token, user: safeUser };
}

// ─── getMe ──────────────────────────────────────────────────────────────────

export async function getMe(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      memberships: {
        include: {
          wedding: {
            select: {
              id: true,
              weddingName: true,
              brideName: true,
              groomName: true,
              weddingDate: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const { passwordHash: _, ...safeUser } = user;

  return safeUser;
}
