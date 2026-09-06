import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(200, "Display name must be at most 200 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters"),
  role: z.enum(["OWNER", "ADMIN", "MEMBER", "VIEWER"], {
    message: "Role must be one of OWNER, ADMIN, MEMBER, VIEWER",
  }),
  weddingId: z.string().uuid("weddingId must be a valid UUID"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
