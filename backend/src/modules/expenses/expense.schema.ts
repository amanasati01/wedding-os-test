import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(2, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  expenseDate: z.string().datetime("Must be a valid ISO date string"),
  notes: z.string().optional(),
  status: z.enum(["PAID", "PENDING"]).optional(),
  budgetCategoryId: z.string().uuid("Invalid budget category ID"),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
