import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Prevent infinite redirect loop
  if (pathname === "/") {
    const response = NextResponse.redirect(new URL("/admin", request.url));
    response.headers.set("pathname", pathname);
    return response;
  }
   // Redirect /admin/users to /admin/landscaper
  if (pathname === "/admin/users" || pathname === "/admin/users/") {
    return NextResponse.redirect(new URL("/admin/landscaper", request.url));
  }


  // If already on /admin → allow the page to load
  const res = NextResponse.next();
  res.headers.set("pathname", pathname);
  return res;
}