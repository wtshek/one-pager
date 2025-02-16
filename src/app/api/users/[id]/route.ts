import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 🔹 GET - Fetch user by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: String(params.id) },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[GET /users/:id]", error)
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// 🔹 PUT - Update user by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email } = await req.json();
    const updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { name, email },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[PUT /users/:id]", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// 🔹 DELETE - Remove user by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: String(params.id) },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("[DELETE /users/:id]", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
