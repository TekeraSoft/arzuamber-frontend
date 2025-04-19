"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-image-resize";
import TextEditorToolBar from "./TextEditorToolBar";
import Highlight from "@tiptap/extension-highlight";

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
        HTMLAttributes: { class: "list-disc ml-3" },
      }),
      Highlight,
      Image,
      ImageResize,
    ],
  });

  return (
    <div>
      <TextEditorToolBar />
      <EditorContent />
    </div>
  );
}

export default TextEditor;
