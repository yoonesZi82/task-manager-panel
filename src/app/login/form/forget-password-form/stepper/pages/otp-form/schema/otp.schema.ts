import z from "zod";

const otpSchema = z.object({
  otp: z
    .string({ message: "Otp is required" })
    .min(6, "otp is must 6 digit character")
    .max(6, "otp is must 6 digit character"),
});

export default otpSchema;
