"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHumorFlavorMix(
  id: number,
  fields: {
    humor_flavor_id: number;
    caption_count: number;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("humor_flavor_mix")
    .update({
      humor_flavor_id: fields.humor_flavor_id,
      caption_count: fields.caption_count,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/humor-flavors");
}
