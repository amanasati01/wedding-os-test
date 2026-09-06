import { Router } from "express";
import { ExpenseController } from "./expense.controller.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createExpenseSchema, updateExpenseSchema } from "./expense.schema.js";
import { authenticate } from "../auth/auth.middleware.js";
import { requireRole } from "../auth/auth.middleware.js";

export const expenseRouter = Router();

expenseRouter.use(authenticate as any);

expenseRouter.get(
  "/:weddingId",
  requireRole("OWNER", "ADMIN", "MEMBER", "VIEWER") as any,
  ExpenseController.getAll as any
);

expenseRouter.get(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN", "MEMBER", "VIEWER") as any,
  ExpenseController.getById as any
);

expenseRouter.post(
  "/:weddingId",
  requireRole("OWNER", "ADMIN") as any,
  validate(createExpenseSchema) as any,
  ExpenseController.create as any
);

expenseRouter.patch(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN") as any,
  validate(updateExpenseSchema) as any,
  ExpenseController.update as any
);

expenseRouter.delete(
  "/:weddingId/:id",
  requireRole("OWNER", "ADMIN") as any,
  ExpenseController.remove as any
);
