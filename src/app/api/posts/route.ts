import { RESPONSE_STATUS } from "@/const";
import { prisma } from "@/lib/prisma";
import { Book } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[GET /posts]", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { post, book: newBook } = await req.json();
    let book: Book | null;

    book = await prisma.book.findFirst({
      where: { openBookKey: newBook.key },
    });

    if (!book) {
      book = await prisma.book.create({
        data: {
          openBookKey: newBook.key,
          title: newBook.title,
          authorKey: newBook.author_key,
          authorName: newBook.author_name,
          coverEditionKey: newBook.cover_edition_key,
          coverI: newBook.cover_i,
          editionCount: newBook.edition_count,
          firstPublishYear: newBook.first_publish_year,
          hasFullText: newBook.has_fulltext,
          ia: newBook.ia,
          iaCollectionS: newBook.ia_collection_s,
          language: newBook.language,
          publicScanB: newBook.public_scan_b,
        },
      });
    }

    const newUser = await prisma.post.create({
      data: { title: post.title, content: post.content, bookId: book.id },
    });
    return NextResponse.json(newUser, {
      status: RESPONSE_STATUS.CREATED,
    });
  } catch (error) {
    console.error("[POST /posts]", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
