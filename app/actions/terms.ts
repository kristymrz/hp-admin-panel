"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTerm(
  id: number,
  fields: {
    term: string;
    definition: string;
    priority: number;
    term_type_id: number | null;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("terms")
    .update({
      term: fields.term,
      definition: fields.definition,
      priority: fields.priority,
      term_type_id: fields.term_type_id,
      modified_datetime_utc: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/terms");
}

export async function createTerm(fields: {
  term: string;
  definition: string;
  example: string;
  priority: number;
  term_type_id: number | null;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("terms").insert({
    term: fields.term,
    definition: fields.definition,
    example: fields.example,
    priority: fields.priority,
    term_type_id: fields.term_type_id,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/terms");
}

export async function deleteTerm(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("terms").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/terms");
}
