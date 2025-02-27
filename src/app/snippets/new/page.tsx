"use client";

import Link from "next/link";
import { useActionState, startTransition, useState } from "react";
import { createSnippet } from "@/actions";
import { Editor } from "@monaco-editor/react";

export default function SnippetCreatePage() {
  const [formState, action] = useActionState(createSnippet, { message: "" });
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.currentTarget.value);
  }

  function handleEditorChange(value: string = ""): void {
    setCode(value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // const formData = new FormData(event.currentTarget);
    const formData = new FormData();
    // add title and code to the form data
    formData.append("title", title);
    formData.append("code", code);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full bg-sky-100"
            id="title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <Editor
          height="40vh"
          theme="vs-dark"
          defaultLanguage="python"
          options={{ minimap: { enabled: false } }}
            // name="code"
            className="border rounded-md w-full border-slate-200"
            // id="code"
            onChange={handleEditorChange}
          />
        </div>

        {
          /* Display the error message */
          formState.message ? (
            <div className="mx-auto items-center bg-red-400 p-4 rounded font-bold">
              {formState.message}
            </div>
          ) : null
        }

        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="border rounded-xl px-8 py-2 bg-blue-200 border-blue-400 max-w-fit"
          >
            Save
          </button>
          <Link
            href="/"
            className="border rounded-xl px-8 py-2 bg-slate-200 border-slate-400"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
