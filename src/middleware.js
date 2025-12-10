import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log(token);
  console.log("cookies in middleware:", request.cookies.getAll());

  const path = request.nextUrl.pathname;

  const isOAuthCallback = path.startsWith("/auth/oauth");
  if (isOAuthCallback) return NextResponse.next();

  const isAuthPage = path.startsWith("/auth");

  if (token && !isAuthPage) return NextResponse.next();

  if (token && isAuthPage)
    return NextResponse.redirect(new URL("/week", request.url));

  if (!token && !isAuthPage)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/week", "/month", "/year", "/all-time", "/auth/:path*"],
};
