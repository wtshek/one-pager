"use client";
import { Button } from "@/components/ui/button";
import { TextEditor } from "@/components/ui/text-editor";
import { PATH } from "@/const";
import { useBookStore } from "@/providers/book-providers";
import { useRouter } from "next/navigation";

const Page = () => {
  const { book } = useBookStore((state) => state);
  const router = useRouter();

  if (!book?.key) {
    router.push(PATH.APP_HOMEPAGE);
    return;
  }

  const onPublishClick = () => {};

  return (
    <div className="px-10 py-20 mx-auto max-w-[1200px]">
      <div className="flex justify-between items-center">
        <div className="pl-10">
          Your are writing summary of{" "}
          <span className="font-bold">{book?.title}</span>
        </div>
        <Button>Publish</Button>
      </div>
      <TextEditor />
    </div>
  );
};

export default Page;
