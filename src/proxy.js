import { NextResponse } from "next/server";

export async function proxy(request) {
  const url = request.nextUrl;
  const path = url.pathname;

  // --- AUTH GUARD ---
  const token = request.cookies.get("token")?.value;
  const isAuthPage = path.startsWith("/auth");
  const isOAuthCallback = path.startsWith("/auth/oauth");

  if (!isOAuthCallback) {
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/week", request.url));
    }

    if (!token &&
        !isAuthPage &&
        ["/week", "/month", "/year", "/all-time"].includes(path)) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // --- PROXY: /server → backend ---
  if (path.startsWith("/server/")) {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Reconstruct URL WITHOUT "/server"
    const targetPath = path.replace("/server", "");
    const targetUrl = backend + targetPath + url.search;

    // Forward request to backend, INCLUDING cookies
    const backendRes = await fetch(targetUrl, {
      method: request.method,
      headers: {
        "Content-Type": request.headers.get("Content-Type") || "",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: request.method !== "GET" ? await request.text() : undefined,
      credentials: "include",
    });

    // Create a response from backend result
    const response = new NextResponse(backendRes.body, {
      status: backendRes.status,
      headers: backendRes.headers,
    });

    return response;
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
