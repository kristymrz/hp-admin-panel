"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateImage(
  id: string,
  fields: {
    url: string | null;
    image_description: string | null;
    celebrity_recognition: string | null;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("images")
    .update({
      url: fields.url || null,
      image_description: fields.image_description || null,
      celebrity_recognition: fields.celebrity_recognition || null,
      modified_datetime_utc: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/images");
}

export async function deleteImage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("images")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/images");
}
