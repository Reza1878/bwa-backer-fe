import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "utils/auth";

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/sign-up/upload"],
};
