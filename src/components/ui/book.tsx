"use client";

import { BlogPost, BookInformation } from "@/types";
import Image from "next/image";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import { PATH } from "@/const";

type BookProps = {
  book: BookInformation;
  blogposts?: BlogPost[];
  infoContainerClass?: string;
};

export function Book({ book, blogposts, infoContainerClass }: BookProps) {
  const router = useRouter();

  const onWriteSummaryBtnClick = () => {
    router.push(PATH.POST_CREATE);
  };

  return (
    <div className="flex flex-row gap-4">
      <Image
        src={`https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`}
        alt={book?.title || "Book cover"}
        width={500}
        height={750}
        className="w-1/3 h-auto"
      />
      <div className={`w-full p-5 overflow-y-auto ${infoContainerClass}`}>
        <h2 className="text-2xl font-bold">{book?.title}</h2>
        <p className="text-lg">Author: {book?.author_name?.[0]}</p>
        <p className="text-lg">Year of Publish: {book?.first_publish_year}</p>
        <h3 className="text-xl font-bold mt-10">Blog Posts:</h3>
        <ul className="list-disc list-inside">
          {/* TODO: use blogpost */}
          {[
            { title: "My Thoughts on the Book" },
            { title: "A Deep Dive into the Plot" },
            { title: "The Author's Use of Symbolism" },
          ].map((post, index) => (
            <li key={index} className="text-lg">
              {post.title}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button onClick={onWriteSummaryBtnClick}>Write Summary</Button>
        </div>
      </div>
    </div>
  );
}
