import { NextResponse } from "next/server";

export async function proxy(request) {
  const url = request.nextUrl;
  const path = url.pathname;

  // --- AUTH GUARD ---
  const token = request.cookies.get("token")?.value;
  const isAuthPage = path.startsWith("/auth");
  const isOAuth = path.startsWith("/auth/oauth");

  if (!isOAuth) {
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/week", request.url));
    }

    const protectedRoutes = ["/week", "/month", "/year", "/all-time"];

    if (!token && protectedRoutes.includes(path)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // --- API PROXY ---
  if (path.startsWith("/server/")) {
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL;
    const targetPath = path.replace("/server", "");
    const targetUrl = backend + targetPath + url.search;

    // Forward headers
    const headers = new Headers(request.headers);
    headers.set("host", new URL(backend).host);

    const backendRes = await fetch(targetUrl, {
      method: request.method,
      headers,
      credentials: "include",
      body: ["GET", "HEAD"].includes(request.method)
        ? undefined
        : request.clone().body,
    });

    const responseHeaders = new Headers();
    backendRes.headers.forEach((value, key) => {
      responseHeaders.set(key, value);
    });

    return new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: responseHeaders,
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
