"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FaBold, FaItalic, FaHeading } from "react-icons/fa";

// TODO: add word count and restriction

const ICON_SIZE = 16;

export const TextEditor = () => {
  const [title, setTitle] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your summary here...",
        emptyNodeClass:
          "first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "min-h-screen focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div className="p-10">
      <Input
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
        className="lg:text-4xl mb-10 !px-0"
      />
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-gray-800 border-[1px] px-4 py-3 rounded-md flex flex-row gap-4"
        >
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            <FaBold size={ICON_SIZE} fill="white" />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            <FaItalic size={ICON_SIZE} fill="white" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <FaHeading size={ICON_SIZE} fill="white" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};
