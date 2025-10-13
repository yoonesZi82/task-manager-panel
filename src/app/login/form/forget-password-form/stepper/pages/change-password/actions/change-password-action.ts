"use server";
import prisma from "@/utils/prisma";
import { z } from "zod";
import passwordSchema from "../schema/password.schema";
import bcrypt from "bcryptjs";

interface ChangePasswordActionProps {
  data: z.infer<typeof passwordSchema>;
  email: string;
  phone: string;
}

export async function changePasswordAction({
  data,
  email,
  phone,
}: ChangePasswordActionProps) {
  try {
    const parsed = passwordSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        status: 402,
        message: "Please fill all required fields correctly",
      };
    }

    const { confirmPassword, password } = parsed.data;

    const user = await prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });

    if (!user) {
      return {
        ok: false,
        status: 404,
        message: "User not found",
      };
    }

    if (user.password) {
      if (password !== confirmPassword) {
        return {
          ok: false,
          status: 404,
          message: "Password is must equal to confirm password",
        };
      }
      const newPasswordHash = await bcrypt.hash(password, 12);

      const isEqualOldPassword = await bcrypt.compare(password, user.password);

      if (isEqualOldPassword) {
        return {
          ok: false,
          status: 404,
          message: "Your new password is not equal to your old password",
        };
      }

      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: newPasswordHash,
        },
      });
      return {
        ok: true,
        status: 200,
        message: "Password update successfully",
      };
    } else {
      return {
        ok: false,
        status: 404,
        message: "This user is not have a password",
      };
    }
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      message: `Unknown error in create user API: ${err.message}  `,
    };
  }
}
