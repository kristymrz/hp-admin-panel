"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function getAccessToken(): Promise<string> {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  return session.access_token;
}

export async function generatePresignedUrl(
  contentType: string
): Promise<{ presignedUrl: string; cdnUrl: string }> {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.almostcrackd.ai/pipeline/generate-presigned-url",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contentType }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to generate presigned URL: ${text}`);
  }

  return res.json();
}

export async function registerImageUrl(
  imageUrl: string
): Promise<{ imageId: string; now: number }> {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.almostcrackd.ai/pipeline/upload-image-from-url",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, isCommonUse: false }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to register image URL: ${text}`);
  }

  revalidatePath("/images");
  return res.json();
}

export async function generateCaptions(imageId: string): Promise<void> {
  const token = await getAccessToken();

  const res = await fetch(
    "https://api.almostcrackd.ai/pipeline/generate-captions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageId }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to generate captions: ${text}`);
  }
}
