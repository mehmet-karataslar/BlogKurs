"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { useCallback, useRef } from "react";

function getExtensions(placeholderText: string) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    Placeholder.configure({ placeholder: placeholderText }),
    Link.configure({ openOnClick: false, HTMLAttributes: { target: "_blank" } }),
    Image.configure({ allowBase64: false }),
    Underline,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Highlight,
    TextStyle,
    Color,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
  ];
}

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function Toolbar({ editor }: { editor: Editor | null }) {
  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Görsel URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)] rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="Geri al"
      >
        ↶
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="İleri al"
      >
        ↷
      </button>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <select
        className="rounded px-2 py-1 text-sm bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
        value=""
        onChange={(e) => {
          const v = e.target.value;
          if (v === "p") editor.chain().focus().setParagraph().run();
          else if (v === "h1") editor.chain().focus().setHeading({ level: 1 }).run();
          else if (v === "h2") editor.chain().focus().setHeading({ level: 2 }).run();
          else if (v === "h3") editor.chain().focus().setHeading({ level: 3 }).run();
          e.target.value = "";
        }}
      >
        <option value="">Başlık</option>
        <option value="p">Paragraf</option>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
      </select>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("bold") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="Kalın"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("italic") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="İtalik"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("underline") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="Altı çizili"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("strike") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="Üstü çizili"
      >
        <s>S</s>
      </button>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("code") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="Kod"
      >
        &lt;/&gt;
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("codeBlock") ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"}`}
        title="Kod bloğu"
      >
        {"{ }"}
      </button>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive({ textAlign: "left" }) ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Sola hizala"
      >
        ≡
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive({ textAlign: "center" }) ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Ortala"
      >
        ≡
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive({ textAlign: "right" }) ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Sağa hizala"
      >
        ≡
      </button>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("bulletList") ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Madde listesi"
      >
        •
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("orderedList") ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Numaralı liste"
      >
        1.
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("blockquote") ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Alıntı"
      >
        {'"'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="Yatay çizgi"
      >
        —
      </button>
      <span className="w-px h-5 bg-[var(--color-border)] mx-0.5" />
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Link URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("link") ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Link"
      >
        🔗
      </button>
      <button
        type="button"
        onClick={addImage}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="Görsel"
      >
        🖼
      </button>
      <button
        type="button"
        onClick={addTable}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="Tablo"
      >
        ⊞
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`p-1.5 rounded hover:bg-[var(--color-background)] ${editor.isActive("highlight") ? "bg-[var(--color-primary)]/20" : ""} text-[var(--color-text-primary)]`}
        title="Vurgu"
      >
        ✎
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
        className="p-1.5 rounded hover:bg-[var(--color-background)] text-[var(--color-text-primary)]"
        title="Biçimi temizle"
      >
        ✕
      </button>
    </div>
  );
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Blog yazınızı buraya yazın...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: getExtensions(placeholder),
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none min-h-[280px] p-4 text-[var(--color-text-primary)] focus:outline-none [&_.tiptap]:min-h-[280px]",
      },
      // Yapıştırılan metnin HTML biçimini koru (Word, Google Docs, başka sayfadan kopyala)
      transformPastedHTML(html) {
        return html;
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

/** "Dosyadan Aktar" — read .txt/.md and inject into editor. */
export function ImportFileButton({
  onImport,
}: {
  onImport: (text: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onImport(String(reader.result ?? ""));
    };
    reader.readAsText(file, "UTF-8");
    e.target.value = "";
  };
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,.md"
        className="hidden"
        onChange={handleFile}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg px-3 py-1.5 text-sm bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary)]/20 border border-[var(--color-border)]"
      >
        Dosyadan Aktar
      </button>
    </>
  );
}
