"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextEditorToolBar from "./TextEditorToolBar";
import Highlight from "@tiptap/extension-highlight";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

function TextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal ml-3" },
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc ml-10" },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "highlighted-text",
        },
      }),
      ImageResize.configure({
        // ayar yapılabilir
        resizeIcon: true,
        resizeHandleStyle: {
          width: "8px",
          height: "8px",
          backgroundColor: "blue",
        },
      }),
      Link.configure({ // 🔗 Link extension'ı burada aktif hale getirildi
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "editor-content min-h-[156px] border  rounded-md bg-slate-50 py-2 px-3",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  console.log(content)

  return (
    <>
      <TextEditorToolBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}

export default TextEditor;
