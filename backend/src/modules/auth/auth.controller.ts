import type { Response, NextFunction } from "express";
import { APiResponse } from "../../shared/ApiResponse.js";
import * as authService from "./auth.service.js";
import type { AuthenticatedRequest } from "./auth.types.js";
import type { LoginInput } from "./auth.schema.js";

// ─── POST /auth/login ───────────────────────────────────────────────────────

export async function loginHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { userId } = req.body as LoginInput;

    const result = await authService.login(userId, "");

    res.status(200).json(new APiResponse(true, "Login successful.", result));
  } catch (error) {
    next(error);
  }
}

// ─── GET /auth/me ───────────────────────────────────────────────────────────

export async function getMeHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await authService.getMe(req.user.id);

    res
      .status(200)
      .json(new APiResponse(true, "User profile retrieved.", user));
  } catch (error) {
    next(error);
  }
}
