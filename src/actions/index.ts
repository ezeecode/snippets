"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(snippetId: number, code: string) {
  await db.snippet.update({
    where: {
      id: snippetId,
    },
    data: {
      code,
    },
  });

  revalidatePath(`/snippets/${snippetId}`);

  redirect(`/snippets/${snippetId}`);
}

export async function deleteSnippet(snippetId: number) {
  await db.snippet.delete({
    where: {
      id: snippetId,
    },
  });

  // dump the cache for the root route
  revalidatePath("/");
  // dump the cache for the snippets route for the id
  revalidatePath(`/snippets/${snippetId}`);

  redirect("/");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // check the user's input and make sure they are valid
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be at least 3 characters long",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer than 10 characters",
      };
    }

    // create a new record in the database
    await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "An unknown error occurred",
      };
    }
  }

  // dump the cache for the root route
  revalidatePath("/");

  // redirect the user back to the root route
  redirect("/");
}
