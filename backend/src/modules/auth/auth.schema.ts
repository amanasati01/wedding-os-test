import { z } from "zod";

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, "userId is required")
    .max(50, "userId must be at most 50 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(128, "Password must be at most 128 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
