import z from "zod";

const LoginSchema = z.object({
  email: z.string("Email is required").email("Email is not valid"),
  password: z
    .string("Password is required")
    .min(8, "password is must 8 or over 8 character")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
      "The password must be more than 8 digits long, a combination of uppercase and lowercase letters and symbols."
    ),
});

export default LoginSchema;
