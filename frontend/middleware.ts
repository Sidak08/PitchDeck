import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle CORS for API routes
  if (pathname.startsWith("/api/")) {
    const response = NextResponse.next();

    // Set CORS headers
    response.headers.set(
      "Access-Control-Allow-Origin",
      request.headers.get("origin") ||
        "http://localhost:3000,https://pitchdeck-ddnd.onrender.com,https://pitchdeck-7p0c.onrender.com",
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type,Authorization,Access-Control-Allow-Origin",
    );

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers });
    }

    return response;
  }

  // Check if site is under construction
  const isUnderConstruction =
    process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true";

  if (isUnderConstruction) {
    const url = request.nextUrl.clone();
    const path = url.pathname;

    // List of paths that should redirect to under-construction page when flag is true
    const protectedPaths = [
      "/auth/login",
      "/auth/signup",
      "/apply",
      "/dashboard",
      "/about",
      "/winners",
    ];

    // Check if the current path starts with any of the protected paths
    const isProtectedPath = protectedPaths.some(
      (protectedPath) =>
        path === protectedPath || path.startsWith(`${protectedPath}/`),
    );

    // Only redirect if it's a protected path and not already the under-construction page
    if (isProtectedPath && !path.startsWith("/under-construction")) {
      url.pathname = "/under-construction";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/api/:path*",
    "/auth/:path*",
    "/apply/:path*",
    "/apply",
    "/dashboard/:path*",
    "/dashboard",
    "/about",
    "/winners",
  ],
};
