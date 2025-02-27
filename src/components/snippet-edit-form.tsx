"use client";

import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";
import Link from "next/link";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState<string>(snippet.code);

  function handleEditorChange(value: string = ""): void {
    // console.log(value);
    setCode(value);
  }

  // const handleEditorChange = (value: string = ""): void => {
  //     console.log(value);
  // }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div className="space-y-4 gap-2 my-4">
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />

      <div className="flex justify-start items-center m-2 gap-4">
        <form action={editSnippetAction}>
          <button
            type="submit"
            className="rounded-md p-2 bg-sky-200 border border-sky-400"
          >
            Save
          </button>
        </form>
        <Link
          href={`/snippets/${snippet.id}`}
          className="border rounded-md p-2 bg-slate-200 border-slate-400"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
