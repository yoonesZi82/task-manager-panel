import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import redis from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "email is not valid",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit number

    await redis.setex(`otp:${email}`, 120, otp); // 2 min expire

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Otp",
      text: `کد تایید شما: ${otp}`,
      html: `<h2>Your Otp : </h2><p style="font-size: 20px; font-weight: bold;">${otp}</p>`,
    }); // send main

    return NextResponse.json({
      success: true,
      message: "Send Otp successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: `Unknown error for send otp API --> ${err}`,
    });
  }
}
