import z from "zod";

const phoneRegex = /^(\+98|0)?9\d{9}$/;

const emailOrPhoneSchema = z.object({
  contact: z.union([
    z
      .string({ message: "Enter your email address" })
      .email("Please enter a valid email or phone"),
    z
      .string({ message: "Enter your phone number" })
      .regex(phoneRegex, "Please enter a valid email or phone"),
  ]),
});

export default emailOrPhoneSchema;
