import React from "react";
import "./RichTextEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";

interface RichTextEditorProps {
  label?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
    ],
    content: "<p>Hello World!</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col">
      <label
        htmlFor="rich-text-editor"
        className="text-[14px] font-medium text-[#212b37]"
      >
        {label || "Rich Text Editor"}
      </label>
      <div className="border mt-2 border-[#dee7f1] dark:border-gray-700 dark:text-gray-500 rounded">
        <div className="flex w-full border-b border-box border-b-[#dee7f1] dark:border-b dark:border-b-gray-700 gap-2 px-4 py-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? "font-bold bg-gray-200 px-2" : "px-2"
            }
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic") ? "italic bg-gray-200 px-2" : "px-2"
            }
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "underline bg-gray-200 px-2"
                : "px-2"
            }
          >
            Underline
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H3
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H4
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H5
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 })
                ? "bg-gray-200 px-2"
                : "px-2"
            }
          >
            H6
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? "bg-gray-200 px-2" : "px-2"
            }
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? "bg-gray-200 px-2" : "px-2"
            }
          >
            1. List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={
              editor.isActive("blockquote") ? "bg-gray-200 px-2" : "px-2"
            }
          >
            ❝ Quote
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={
              editor.isActive("codeBlock") ? "bg-gray-200 px-2" : "px-2"
            }
          >
            {"</>"} Code
          </button>
        </div>
        <div className="rounded p-2 w-full h-fit">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
