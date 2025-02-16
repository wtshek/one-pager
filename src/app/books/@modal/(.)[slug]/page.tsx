"use client";

import { Book } from "@/components/ui/book";
import Modal from "@/components/ui/modal";
import { useBookStore } from "@/providers/book-providers";

export default function Page() {
  const { book } = useBookStore((state) => state);

  return (
    <Modal>{book && <Book book={book} infoContainerClass="!pt-0" />}</Modal>
  );
}
