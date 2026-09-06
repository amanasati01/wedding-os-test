import type { Role } from "@prisma/client";
import prisma from "../../database/prisma.js";
import { ApiError } from "../../shared/ApiError.js";
import { hashPassword } from "../auth/auth.utils.js";
import { generateUserId } from "./user.utils.js";

interface CreateUserData {
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  role: Role;
  weddingId: string;
  createdById: string; // The OWNER who is creating this user
}

/**
 * Creates a new User and assigns them to a wedding with the specified role.
 * Uses a Prisma transaction to ensure atomicity.
 */
export async function createUser(data: CreateUserData) {
  const {
    firstName,
    lastName,
    displayName,
    password,
    role,
    weddingId,
    createdById,
  } = data;

  // 1. Verify the wedding exists
  const wedding = await prisma.wedding.findUnique({
    where: { id: weddingId },
  });

  if (!wedding) {
    throw new ApiError(404, "Wedding not found.");
  }

  // 2. Generate unique userId
  const userId = await generateUserId(firstName, lastName);

  // 3. Hash password
  const passwordHash = await hashPassword(password);

  // 4. Create User + WeddingMember in a single transaction
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        userId,
        firstName,
        lastName,
        displayName,
        passwordHash,
      },
    });

    await tx.weddingMember.create({
      data: {
        weddingId,
        userId: user.id,
        role,
        invitedBy: createdById,
      },
    });

    return user;
  });

  // 5. Return user without passwordHash
  const { passwordHash: _, ...safeUser } = result;

  return { ...safeUser, assignedRole: role, weddingId };
}
