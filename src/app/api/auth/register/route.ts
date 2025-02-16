import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { RESPONSE_STATUS } from "@/const";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: RESPONSE_STATUS.BAD_REQUEST }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    await prisma.user.create({
      data: { email, passwordHash: hashedPassword, username },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: RESPONSE_STATUS.CREATED }
    );
  } catch (error) {
    console.error("[POST] /register", error);
    return NextResponse.json(
      { error: "Error registering user" },
      { status: RESPONSE_STATUS.BAD_REQUEST }
    );
  }
}
