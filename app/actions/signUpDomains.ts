"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createSignUpDomain(apexDomain: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("allowed_signup_domains")
    .insert({ apex_domain: apexDomain });

  if (error) throw new Error(error.message);

  revalidatePath("/sign-up-domains");
}

export async function updateSignUpDomain(id: number, apexDomain: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("allowed_signup_domains")
    .update({ apex_domain: apexDomain })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/sign-up-domains");
}

export async function deleteSignUpDomain(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("allowed_signup_domains")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/sign-up-domains");
}
