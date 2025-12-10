
import { proxyRequest } from "next/server";

export function proxy(request) {
  const url = new URL(request.url);

  // Proxy ALL backend API calls
  if (url.pathname.startsWith("/api/")) {
    const backend = process.env.NEXT_PUBLIC_API_BASE_URL;

    const target = backend + url.pathname.replace("/api", "") + url.search;

    return proxyRequest(request, target, {
      include: {
        cookies: true,
      },
    });
  }

  return; // continue normal handling
}

export const config = {
  matcher: ["/api/:path*"],
};
