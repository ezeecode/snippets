import Link from "next/link";
import { db } from "@/db";

// this disables catching entirely
// export const dynamic = 'force-dynamic';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <Link
      key={snippet.id}
      href={`/snippets/${snippet.id}`}
      className="flex justify-between items-center p-2 border rounded"
    >
      <div>{snippet.title}</div>
      <div>View</div>
    </Link>
  ));

  return (
    <div className="p-4">
      <div className="flex justify-end items-center p-4 m-2">
        {/* <h1 className="text-2xl font-bold">Snippets</h1> */}
        <Link href="/snippets/new" className="p-2 border rounded border-green-500 bg-green-300">
          Create New Snippet
        </Link>
      </div>

      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
