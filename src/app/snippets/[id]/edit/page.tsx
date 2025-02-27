import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  // Extract the id from the params
  const { id } = await props.params;

  // Fetch the snippet from the database
  const snippet = await db.snippet.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  // Extract the title and code from the snippet
  // const { title, code } = snippet;

  return (
    <div className="container mx-auto px-4 border rounded my-8">
      <div className="space-y-4 gap-2 my-4">
        Editing snippet - <span className="italic font-semibold">{snippet.title}</span>
      </div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
