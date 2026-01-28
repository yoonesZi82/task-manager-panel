import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp)
      return NextResponse.json({
        success: false,
        message: "You must enter email and code",
      });

    const storedOtp = await redis.get(`otp:${email}`);

    if (!storedOtp)
      return NextResponse.json({ success: false, message: "Code is expired" });

    if (storedOtp !== otp)
      return NextResponse.json({
        success: false,
        message: "Code is incorrect",
      });

    await redis.del(`otp:${email}`); // delete otp after accept code

    return NextResponse.json({ success: true, message: "Code is valid" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    return NextResponse.json({
      success: false,
      message: `Unknown error for verify otp API --> ${err}`,
    });
  }
}
