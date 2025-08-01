import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
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
      "/competitions",
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
    "/auth/:path*",
    "/competitions/:path*",
    "/competitions",
    "/apply/:path*",
    "/apply",
    "/dashboard/:path*",
    "/dashboard",
    "/about",
    "/winners",
  ],
};
