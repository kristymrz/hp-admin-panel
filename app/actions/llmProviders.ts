"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLLMProvider(fields: { name: string }) {
  const supabase = await createClient();

  const { error } = await supabase.from("llm_providers").insert({ name: fields.name });

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}

export async function updateLLMProvider(id: number, fields: { name: string }) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("llm_providers")
    .update({ name: fields.name })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}

export async function deleteLLMProvider(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("llm_providers").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}
