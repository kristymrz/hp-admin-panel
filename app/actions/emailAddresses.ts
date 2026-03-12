"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createEmailAddress(emailAddress: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("whitelist_email_addresses")
    .insert({ email_address: emailAddress });

  if (error) throw new Error(error.message);

  revalidatePath("/email-addresses");
}

export async function updateEmailAddress(id: number, emailAddress: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("whitelist_email_addresses")
    .update({
      email_address: emailAddress,
      modified_datetime_utc: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/email-addresses");
}

export async function deleteEmailAddress(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("whitelist_email_addresses")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/email-addresses");
}
