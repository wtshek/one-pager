"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { debounce } from "@/utils";
import { BookInformation } from "@/types";
import { useBookStore } from "@/providers/book-providers";
import { useRouter } from "next/navigation";
import { PATH } from "@/const";

const BOOK_SEARCH_API = "https://openlibrary.org/search.json?title=";
const LIMIT = 5;

// TODO: make sure the uniqueness of the book
// e.g. search Mindsight

export default function Home() {
  const [bookName, setBookName] = useState("");
  const [searchResults, setSearchResults] = useState<BookInformation[]>([]);
  const { setCurrBook } = useBookStore((state) => state);
  const router = useRouter();

  const onBookNameChange = (string: string) => {
    setBookName(string);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (bookName.length > 2) {
        try {
          const response = await fetch(
            `${BOOK_SEARCH_API}${encodeURIComponent(bookName)}&limit=${LIMIT}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const filteredData: BookInformation[] = data.docs.filter(
            (doc: BookInformation, index: number, self: BookInformation[]) =>
              index ===
              self.findIndex(
                (t: BookInformation) =>
                  t.title?.includes(doc?.title || "") &&
                  t.author_name?.[0]?.includes(doc?.author_name?.[0] || "")
              )
          );
          setSearchResults(filteredData);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
    };

    const debounceFetchBooks = debounce(fetchBooks, 300);
    const timer = debounceFetchBooks();

    return () => clearTimeout(timer);
  }, [bookName]);

  const onSearchSelect = (book: BookInformation) => () => {
    setCurrBook(book);
    router.push(`${PATH.APP_HOMEPAGE}/${encodeURIComponent(book.title || "")}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto my-20 px-10">
      <div className="text-4xl text-center font-bold mb-10">The One Pager</div>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Enter a book title..."
          onValueChange={onBookNameChange}
        />
        <CommandList>
          <CommandGroup>
            {searchResults.map((result) => {
              return (
                <CommandItem
                  key={result.key?.toString()}
                  value={result.key}
                  onSelect={onSearchSelect(result)}
                >
                  {result.title} - {result.author_name?.[0]}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
