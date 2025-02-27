import { notFound } from "next/navigation";
import { db } from "@/db";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;

  // add artificial delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fetch the snippet from the database -- findFirst can also be used instead of findUnique
  const snippet = await db.snippet.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const { title, code } = snippet;

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div className="space-y-4 gap-2 my-4">
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold border rounded-md bg-teal-200 max-w-max px-4 py-2">
          {title}
        </h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${id}/edit`}
            className="m-2 px-4 py-2 border rounded-full bg-sky-200"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="m-2 px-4 py-2 border rounded-full bg-red-300">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="m-2 border rounded-md max-w-max px-8 py-2 bg-gray-200 border-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
}


export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });

}