import { Router } from "express";
import { validate } from "../../middleware/validate.middleware.js";
import { loginSchema } from "./auth.schema.js";
import { authenticate } from "./auth.middleware.js";
import { loginHandler, getMeHandler } from "./auth.controller.js";

const authRouter = Router();

// POST /auth/login — Public
authRouter.post("/login", validate(loginSchema), loginHandler as any);

// GET /auth/me — Protected
authRouter.get("/me", authenticate as any, getMeHandler as any);

export default authRouter;
