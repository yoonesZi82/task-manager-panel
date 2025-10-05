"use server";
import prisma from "@/utils/prisma";
import { z } from "zod";
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
    const { email, name, phone } = existingUser;

    return {
      ok: true,
      status: 200,
      message: "User found it successfully",
      data: {
        email,
        name,
        phone,
      },
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      message: `Unknown error in create user API: ${err.message}  `,
    };
  }
}
