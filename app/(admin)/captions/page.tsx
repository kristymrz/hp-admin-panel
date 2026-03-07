import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CaptionsTable from "@/components/admin/captions/CaptionsTable";
import type { CaptionRow } from "@/components/admin/captions/CaptionDetailModal";

const PAGE_SIZE = 25;

export default async function CaptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();

  const [{ data: rows }, { count }] = await Promise.all([
    supabase
      .from("captions")
      .select(
        "id, content, image_id, is_public, is_featured, like_count, profile_id, created_datetime_utc, modified_datetime_utc, humor_flavor_id, caption_request_id, llm_prompt_chain_id, images!image_id(url)"
      )
      .order("created_datetime_utc", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    supabase.from("captions").select("*", { count: "exact", head: true }),
  ]);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  const captions: CaptionRow[] = (rows ?? []).map((row) => ({
    id: row.id,
    content: row.content,
    image_id: row.image_id,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image_url: (row.images as any)?.url ?? null,
    is_public: row.is_public,
    is_featured: row.is_featured,
    like_count: row.like_count,
    profile_id: row.profile_id,
    created_datetime_utc: row.created_datetime_utc,
    modified_datetime_utc: row.modified_datetime_utc,
    humor_flavor_id: row.humor_flavor_id,
    caption_request_id: row.caption_request_id,
    llm_prompt_chain_id: row.llm_prompt_chain_id,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Captions
      </h2>

      <CaptionsTable captions={captions} />

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/50">
          Page {page} of {totalPages} &middot; {count?.toLocaleString()} total
        </span>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link
              href={`/captions?page=${page - 1}`}
              className="px-4 py-1.5 text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors"
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-4 py-1.5 text-[#e8d5a3]/20 border border-[#e8d5a3]/10 rounded cursor-not-allowed">
              ← Prev
            </span>
          )}
          {page < totalPages ? (
            <Link
              href={`/captions?page=${page + 1}`}
              className="px-4 py-1.5 text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-1.5 text-[#e8d5a3]/20 border border-[#e8d5a3]/10 rounded cursor-not-allowed">
              Next →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
