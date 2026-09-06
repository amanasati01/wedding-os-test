import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.string().min(1, "Category is required"),
  vendor: z.string().min(1, "Vendor is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  status: z.enum(["Paid", "Pending"], {
    message: "Status is required",
  }),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
