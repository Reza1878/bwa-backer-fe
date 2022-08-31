import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "utils/auth";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/sign-in")) {
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/sign-up/upload")) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/sign-up/upload", "/sign-in"],
};
