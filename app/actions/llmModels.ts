"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLLMModel(fields: {
  name: string;
  llm_provider_id: number;
  provider_model_id: string;
  is_temperature_supported: boolean;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("llm_models").insert({
    name: fields.name,
    llm_provider_id: fields.llm_provider_id,
    provider_model_id: fields.provider_model_id,
    is_temperature_supported: fields.is_temperature_supported,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}

export async function updateLLMModel(
  id: number,
  fields: {
    name: string;
    llm_provider_id: number;
    provider_model_id: string;
    is_temperature_supported: boolean;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("llm_models")
    .update({
      name: fields.name,
      llm_provider_id: fields.llm_provider_id,
      provider_model_id: fields.provider_model_id,
      is_temperature_supported: fields.is_temperature_supported,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}

export async function deleteLLMModel(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("llm_models").delete().eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/llms");
}
