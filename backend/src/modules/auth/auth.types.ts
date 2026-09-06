import type { Request } from "express";
import type { User } from "@prisma/client";

// ─── JWT ─────────────────────────────────────────────────────────────────────
export interface JwtPayload {
  sub: string; // User.id (UUID)
}

// ─── Express extension ──────────────────────────────────────────────────────
export interface AuthenticatedRequest extends Request {
  user: User;
}
