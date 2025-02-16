import { RESPONSE_STATUS } from "@/const";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("[GET /users]", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    return NextResponse.json(newUser, { status: RESPONSE_STATUS.CREATED });
  } catch (error) {
    console.error("[POST /users]", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
