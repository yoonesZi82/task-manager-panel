import { NextResponse } from "next/server";
import redis from "@/lib/redis";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and code are required" },
        { status: 400 },
      );
    }

    const otpKey = `otp:${email}`;
    const attemptsKey = `otp:attempts:${email}`;

    const getHashOtp = await redis.get<string>(otpKey);

    if (!getHashOtp) {
      return NextResponse.json(
        { success: false, message: "Code expired or not found" },
        { status: 400 },
      );
    }

    // محدودیت تلاش
    const attempts = await redis.incr(attemptsKey);
    if (attempts === 1) {
      await redis.expire(attemptsKey, 300); // 5 دقیقه
    }

    if (attempts > 3) {
      await redis.del(otpKey);
      return NextResponse.json(
        { success: false, message: "Too many attempts. Try again later." },
        { status: 429 },
      );
    }

    // هش OTP ورودی
    const inputHash = crypto.createHash("sha256").update(otp).digest("hex");

    if (getHashOtp !== inputHash) {
      return NextResponse.json(
        { success: false, message: "Invalid code" },
        { status: 401 },
      );
    }

    // موفق 🎉
    await redis.del(otpKey);
    await redis.del(attemptsKey);

    return NextResponse.json({
      success: true,
      message: "Code verified successfully",
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
