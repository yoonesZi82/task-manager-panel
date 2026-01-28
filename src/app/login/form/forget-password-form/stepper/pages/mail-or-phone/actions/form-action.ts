"use server";

import prisma from "@/utils/prisma";
import { z } from "zod";
import axios from "axios";
import emailOrPhoneSchema from "../schema/form.schema";

export async function emailOrPhoneAction(
  data: z.infer<typeof emailOrPhoneSchema>
) {
  try {
    const parsed = emailOrPhoneSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        status: 402,
        message: "Please fill all required fields correctly",
      };
    }

    const { contact } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: contact }, { phone: contact }] },
    });

    if (!existingUser) {
      return {
        ok: false,
        status: 404,
        message: "User not found",
      };
    }

    const { email } = existingUser;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/otp/send-otp`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    return {
      ok: true,
      status: 200,
      message: response.data?.message || "OTP sent successfully",
    };
  } catch (err: any) {
    console.error("Error:", err?.message);
    return {
      ok: false,
      status: 500,
      message: "خطا در ارتباط با سرور یا ارسال ایمیل.",
    };
  }
}
