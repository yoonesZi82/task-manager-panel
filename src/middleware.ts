import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_EXCLUDE_PATHS = ["/login", "/api/auth"]; // pages that don't need auth
const SECRET = process.env.NEXTAUTH_SECRET!;

export async function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;

  // // skip static files or next internal paths
  // if (
  //   pathname.startsWith("/_next") ||
  //   pathname.startsWith("/api") ||
  //   pathname.includes(".")
  // ) {
  //   return NextResponse.next();
  // }

  // // Skip paths that don't require authentication
  // if (AUTH_EXCLUDE_PATHS.some((path) => pathname.startsWith(path))) {
  //   const token = await getToken({ req, secret: SECRET });
  //   if (token && pathname === "/login") {
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }
  //   return NextResponse.next();
  // }

  // // Protected routes
  // const token = await getToken({ req, secret: SECRET });

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // // Check refresh token expiration (if you store it in JWT)
  // if (
  //   token.refresh_expires_at &&
  //   Date.now() / 1000 > +token.refresh_expires_at
  // ) {
  //   return NextResponse.redirect(
  //     new URL("/login?message=session_expired", req.url)
  //   );
  // }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
