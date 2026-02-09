import { NextResponse } from "next/server";
import { Resend } from "resend";
import redis from "@/lib/redis";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "email is not valid" },
        { status: 400 },
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpKey = `otp:${email}`;
    const attemptsKey = `otp:attempts:${email}`;

    // ذخیره OTP جدید (۲ دقیقه)
    await redis.set(otpKey, hash, { ex: 120 });

    // ⭐ خیلی مهم: ریست تعداد تلاش‌ها
    await redis.del(attemptsKey);

    await resend.emails.send({
      from: "Task Manger <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `
<!DOCTYPE html>
<html lang="fa">
  <head>
    <meta charset="UTF-8" />
    <title>کد تایید</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Tahoma, Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:24px;">
          <table width="420" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; box-shadow:0 4px 14px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#4f46e5; padding:20px; border-radius:12px 12px 0 0; text-align:center;">
                <h1 style="margin:0; font-size:20px; color:#ffffff;">
                  My App
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px; color:#111827; text-align:center;">
                <p style="margin:0 0 12px; font-size:15px;">
                  کد تأیید ورود شما
                </p>

                <div style="
                  margin:20px 0;
                  padding:16px;
                  font-size:28px;
                  font-weight:bold;
                  letter-spacing:6px;
                  color:#4f46e5;
                  background:#eef2ff;
                  border-radius:8px;
                ">
                  ${otp}
                </div>

                <p style="margin:0; font-size:13px; color:#6b7280;">
                  این کد تا <b>۲ دقیقه</b> معتبر است.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px; font-size:11px; color:#9ca3af; text-align:center;">
                اگر شما این درخواست را ارسال نکرده‌اید، این ایمیل را نادیده بگیرید.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: String(err) },
      { status: 500 },
    );
  }
}
