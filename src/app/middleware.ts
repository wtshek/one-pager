import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

// TODO: config the protected route
export const config = {
  matcher: "/api/protected/:path*",
};
