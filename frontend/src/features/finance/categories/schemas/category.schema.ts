import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters"),
  allocated: z
    .number()
    .positive("Allocated budget must be greater than 0"),
  color: z
    .string()
    .min(1, "Color is required"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;