import { NextResponse, proxyRequest } from "next/server";

export function proxy(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // 1 — AUTH LOGIC (Middleware replacement)
  const token = request.cookies.get("token")?.value;
  const isAuthPage = path.startsWith("/auth");
  const isOAuthCallback = path.startsWith("/auth/oauth");

  if (!isOAuthCallback) {
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/week", request.url));
    }

    if (!token && !isAuthPage && ["/week", "/month", "/year", "/all-time"].includes(path)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // 2 — API PROXY (required for cookies)
  if (path.startsWith("/server/")) {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    const target = backend + path.replace("/server", "") + url.search;

    return proxyRequest(request, target, {
      include: { cookies: true },
    });
  }

  // Default pass-through
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/server/:path*",
    "/week",
    "/month",
    "/year",
    "/all-time",
    "/auth/:path*"
  ],
};
