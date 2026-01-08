import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  // Allow public routes
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect root → /admin
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Redirect /admin/users → /admin/landscaper
  if (pathname === "/admin/users" || pathname === "/admin/users/") {
    return NextResponse.redirect(
      new URL("/admin/landscaper", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/login"],
};