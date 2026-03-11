"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCaptionExample(
  id: number,
  fields: {
    image_description: string;
    caption: string;
    explanation: string;
    priority: number;
    image_id: string | null;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("caption_examples")
    .update({
      image_description: fields.image_description,
      caption: fields.caption,
      explanation: fields.explanation,
      priority: fields.priority,
      image_id: fields.image_id || null,
      modified_datetime_utc: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/captions");
}

export async function createCaptionExample(fields: {
  image_description: string;
  caption: string;
  explanation: string;
  priority: number;
  image_id: string | null;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("caption_examples").insert({
    image_description: fields.image_description,
    caption: fields.caption,
    explanation: fields.explanation,
    priority: fields.priority,
    image_id: fields.image_id || null,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/captions");
}

export async function deleteCaptionExample(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("caption_examples")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/captions");
}
