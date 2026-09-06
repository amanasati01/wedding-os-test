import { Router } from "express";
import { CategoryController } from "./category.controller.js";
import { authenticate, requireRole } from "../auth/index.js";

const categoryRouter = Router();

// Protect all routes with authenticate middleware
categoryRouter.use(authenticate as any);

categoryRouter.get(
  "/:weddingId",
  requireRole("OWNER", "ADMIN", "MEMBER") as any,
  CategoryController.getAll as any
);

categoryRouter.get(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN", "MEMBER") as any,
  CategoryController.getById as any
);

categoryRouter.post(
  "/:weddingId",
  requireRole("OWNER", "ADMIN") as any,
  CategoryController.create as any
);

categoryRouter.patch(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN") as any,
  CategoryController.update as any
);

categoryRouter.delete(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN") as any,
  CategoryController.remove as any
);

export { categoryRouter };
