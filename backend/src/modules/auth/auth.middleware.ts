import type { Response, NextFunction } from "express";
import type { Role } from "@prisma/client";
import prisma from "../../database/prisma.js";
import { ApiError } from "../../shared/ApiError.js";
import { verifyAccessToken } from "./auth.utils.js";
import type { AuthenticatedRequest } from "./auth.types.js";

// ─── authenticate ───────────────────────────────────────────────────────────
// Verifies the JWT from the Authorization header, loads the user from DB,
// and attaches it to req.user.
// ─────────────────────────────────────────────────────────────────────────────

export function authenticate(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required. Provide a Bearer token.");
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Malformed Authorization header.");
    }

    const payload = verifyAccessToken(token);

    // Load the user from DB to ensure they still exist and are active
    prisma.user
      .findUnique({ where: { id: payload.sub } })
      .then((user) => {
        if (!user) {
          return next(new ApiError(401, "User not found. Token may be invalid."));
        }

        if (!user.isActive) {
          return next(new ApiError(403, "Account has been deactivated."));
        }

        req.user = user;
        next();
      })
      .catch(next);
  } catch {
    next(new ApiError(401, "Invalid or expired token."));
  }
}

// ─── requireRole ────────────────────────────────────────────────────────────
// Checks that the authenticated user has one of the allowed roles for the
// specified wedding. Resolves the role via WeddingMember — never from a
// global field on User.
//
// weddingId is read from:  req.params.weddingId  →  req.body.weddingId
// ─────────────────────────────────────────────────────────────────────────────

export function requireRole(...allowedRoles: Role[]) {
  return async (
    req: AuthenticatedRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const weddingId =
        (req.params as Record<string, string>)["weddingId"] ??
        (req.body as Record<string, unknown>)?.["weddingId"];

      if (!weddingId || typeof weddingId !== "string") {
        throw new ApiError(
          400,
          "weddingId is required for role-based authorization."
        );
      }

      const membership = await prisma.weddingMember.findUnique({
        where: {
          weddingId_userId: {
            weddingId,
            userId: req.user.id,
          },
        },
      });

      if (!membership) {
        throw new ApiError(
          403,
          "You are not a member of this wedding workspace."
        );
      }

      if (!allowedRoles.includes(membership.role)) {
        throw new ApiError(
          403,
          `Insufficient permissions. Required: ${allowedRoles.join(", ")}. Your role: ${membership.role}.`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
