import { NextResponse } from "next/server";

export async function proxy(request) {
  const url = request.nextUrl;
  const path = url.pathname;

  const token = request.cookies.get("token")?.value;
  const protectedRoutes = ["/week", "/month", "/year", "/all-time"];

  const isAuthPage = path.startsWith("/auth");
  const isOAuth = path.startsWith("/auth/oauth");

  if (!isOAuth) {
    if (token && isAuthPage)
      return NextResponse.redirect(new URL("/week", request.url));

    if (!token && protectedRoutes.includes(path))
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (path.startsWith("/server/")) {
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL;
    const targetUrl = backend + path.replace("/server", "") + url.search;
    const headers = Object.fromEntries(request.headers);

if (request.headers.get("authorization")) {
  headers["authorization"] = request.headers.get("authorization");
}
    const backendRes = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : await request.text(),
    });

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: backendRes.headers,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/server/:path*",
    "/week",
    "/month",
    "/year",
    "/all-time",
    "/auth/:path*",
  ],
};
