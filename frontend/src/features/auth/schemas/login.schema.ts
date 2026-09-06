import { z } from "zod";

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, { message: "User ID is required." })
    .max(50, { message: "User ID must be at most 50 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(128, { message: "Password must be at most 128 characters." }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
