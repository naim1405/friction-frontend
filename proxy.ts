import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const authOnlyForGuests = ["/login", "/signup", "/forget", "/reset"];
const requiresAuth = ["/change", "/admin", "/create"];

const routeMatches = (pathname: string, routes: string[]) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = Boolean(
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("refreshToken")?.value,
  );

  if (isAuthenticated && routeMatches(pathname, authOnlyForGuests)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthenticated && routeMatches(pathname, requiresAuth)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forget",
    "/reset",
    "/change",
    "/change/:path*",
    "/admin/:path*",
    "/create/:path*",
  ],
};
