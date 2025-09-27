import z from "zod";

const RegisterSchema = z
  .object({
    name: z.string("Name is required").min(1, "Name is required"),
    email: z.string("Email is required").email("Email is not valid"),
    phone: z
      .string("Phone is required")
      .regex(/^(?:\+98|98|0)9\d{9}$/g, "Phone number is not valid"),
    password: z
      .string("Password is required")
      .min(8, "password is must 8 or over 8 character")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
        "The password must be more than 8 digits long, a combination of uppercase and lowercase letters and symbols."
      ),
    confirmPassword: z
      .string("Password is required")
      .min(8, "password is must 8 or over 8 character")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
        "The password must be more than 8 digits long, a combination of uppercase and lowercase letters and symbols."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords is must match to confirm password",
    path: ["confirmPassword"],
  });

export default RegisterSchema;
