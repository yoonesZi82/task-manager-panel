"use server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import RegisterSchema from "../schema/register-schema";

export async function registerAction(data: z.infer<typeof RegisterSchema>) {
  try {
    const parsed = RegisterSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        status: 402,
        message: "Please fill all required fields correctly",
      };
    }

    const { name, email, password, confirmPassword, phone } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (existingUser) {
      return {
        ok: false,
        status: 400,
        message: "User already exists",
      };
    }

    if (password !== confirmPassword) {
      return {
        ok: false,
        status: 401,
        message: "Passwords is must match to confirm password",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const countUsers = await prisma.user.count();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        emailVerified: false,
        phoneVerified: false,
        role: countUsers === 0 ? "ADMIN" : "USER",
      },
    });

    return {
      ok: true,
      status: 201,
      message: "User created successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
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
