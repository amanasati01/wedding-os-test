import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate, requireRole } from "../auth/index.js";
import { createUserSchema } from "./user.schema.js";
import { createUserHandler } from "./user.controller.js";

const userRouter = Router();

// POST /users — Only OWNER can create users
// requireRole reads weddingId from req.body
userRouter.post(
  "/",
  authenticate as any,
  requireRole("OWNER") as any,
  validate(createUserSchema),
  createUserHandler as any
);

export default userRouter;
