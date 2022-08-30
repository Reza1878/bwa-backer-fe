import { NextRequest } from "next/server";

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get("token");

  return !!token;
}

export { isAuthenticated };
