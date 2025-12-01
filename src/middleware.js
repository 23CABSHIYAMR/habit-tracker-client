import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/week", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      "/week",          
      "/month",             
      "/year",  
      "/all-time",            
      "/auth/:path*"
    ]
};
