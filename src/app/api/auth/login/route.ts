import { prisma } from "@/lib/prisma";
import { verifyPassword, generateToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RESPONSE_STATUS } from "@/const";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: RESPONSE_STATUS.UNAUTHORIZED }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: RESPONSE_STATUS.UNAUTHORIZED }
      );
    }

    // Generate JWT
    const token = generateToken(user.id);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("[POST] /login", error);
    return NextResponse.json(
      { error: "Error logging in" },
      { status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
