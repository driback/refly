import { z } from "zod";

export const SignUpSchema = z.object({
  email: z.string().email(),
  username: z.string().min(4),
  password: z
    .string()
    .min(8)
    .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(val)),
});

export const SignInSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
  rememberMe: z.boolean().default(false),
});
