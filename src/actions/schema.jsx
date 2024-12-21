import z from "zod"

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const SignUpSchema = z
  .object({
    name: z.string().min(3, { message: "Must be at least 3 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Must be at least 8 characters" })
      .regex(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/), {
        message:
          "Your pass should contain 1 upper letter, 1 lower letter, 1 number",
      }),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords didnt match",
        path: ["confirmPassword"],
      })
    }
  })
