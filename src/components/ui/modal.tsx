"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

const ICON_SIZE = 24;

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-4/5 h-fit p-5">
        <button
          onClick={onDismiss}
          className="absolute top-0 right-0 m-4 hover:cursor-pointer"
        >
          <IoClose size={ICON_SIZE} />
        </button>
        {children}
      </div>
    </div>
  );
}
