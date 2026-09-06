import type { Response, NextFunction } from "express";
import type { Role } from "@prisma/client";
import { APiResponse } from "../../shared/ApiResponse.js";
import type { AuthenticatedRequest } from "../auth/auth.types.js";
import * as userService from "./user.service.js";
import type { CreateUserInput } from "./user.schema.js";

// ─── POST /users ────────────────────────────────────────────────────────────

export async function createUserHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body as CreateUserInput;

    const user = await userService.createUser({
      firstName: body.firstName,
      lastName: body.lastName,
      displayName: body.displayName,
      password: body.password,
      role: body.role as Role,
      weddingId: body.weddingId,
      createdById: req.user.id,
    });

    res.status(201).json(
      new APiResponse(true, "User created successfully.", user)
    );
  } catch (error) {
    next(error);
  }
}
