import React, { useEffect } from "react";
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
import { marked } from "marked"; // ✅ markdown parser

interface RichTextEditorProps {
  label?: string;
  value?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, value }) => {
  // Convert markdown to HTML before feeding to TipTap
  const parsedHTML = value ? marked.parse(value) : "<p></p>";

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
    content: parsedHTML,
  });

  /** 👇 Update editor when `value` changes */
  useEffect(() => {
    if (editor && value !== undefined) {
      const html = marked.parse(value || "");
      const current = editor.getHTML();
      if (current !== html) {
        editor.commands.setContent(html);
      }
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label className="text-[14px] font-bold text-[#212b37] dark:text-white">
          {label}
        </label>
      )}
      <div className="border mt-2 border-[#dee7f1] dark:border-gray-700 dark:text-gray-500 rounded">
        {/* Toolbar */}
        <div className="flex w-full border-b border-b-[#dee7f1] dark:border-b-gray-700 gap-2 px-4 py-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 ${
              editor.isActive("bold") ? "font-bold bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            Bold
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 ${
              editor.isActive("italic") ? "italic bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            Italic
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 ${
              editor.isActive("underline") ? "underline bg-gray-200 dark:bg-gray-700" : ""
            }`}
          >
            Underline
          </button>
        </div>

        {/* Content Area */}
        <div className="rounded p-2 w-full h-fit">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
