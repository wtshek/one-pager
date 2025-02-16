"use client";

import { Book } from "@/components/ui/book";
import { PATH } from "@/const";
import { useBookStore } from "@/providers/book-providers";
import { BookInformation } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// TODO: should use own database,
// no blogpost than 404

export default function Page() {
  const { book } = useBookStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!book?.key) {
      router.push(PATH.APP_HOMEPAGE);
      return;
    }
  }, [book?.key, router]);

  return (
    <div>
      <Book book={book as BookInformation} />
    </div>
  );
}
