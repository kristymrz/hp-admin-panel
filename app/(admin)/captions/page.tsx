import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import CaptionsTable from "@/components/admin/captions/CaptionsTable";
import CaptionRequestsTable from "@/components/admin/captions/CaptionRequestsTable";
import CaptionExamplesTable from "@/components/admin/captions/CaptionExamplesTable";
import type { CaptionRow } from "@/components/admin/captions/CaptionDetailModal";
import type { CaptionRequestRow } from "@/components/admin/captions/CaptionRequestsTable";
import type { CaptionExampleRow } from "@/components/admin/captions/CaptionExamplesTable";

const PAGE_SIZE = 25;

export default async function CaptionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    captionsPage?: string;
    requestsPage?: string;
    examplesPage?: string;
  }>;
}) {
  const {
    tab: tabParam,
    captionsPage: captionsPageParam,
    requestsPage: requestsPageParam,
    examplesPage: examplesPageParam,
  } = await searchParams;

  const tab =
    tabParam === "requests" ? "requests"
    : tabParam === "examples" ? "examples"
    : "captions";

  const captionsPage = Math.max(1, parseInt(captionsPageParam ?? "1", 10));
  const requestsPage = Math.max(1, parseInt(requestsPageParam ?? "1", 10));
  const examplesPage = Math.max(1, parseInt(examplesPageParam ?? "1", 10));

  const supabase = await createClient();

  let captions: CaptionRow[] = [];
  let captionRequests: CaptionRequestRow[] = [];
  let captionExamples: CaptionExampleRow[] = [];
  let totalPages = 1;
  let totalCount = 0;

  if (tab === "captions") {
    const offset = (captionsPage - 1) * PAGE_SIZE;
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

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    captions = (rows ?? []).map((row) => ({
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
  } else if (tab === "requests") {
    const offset = (requestsPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("caption_requests")
        .select("id, profile_id, image_id, created_datetime_utc")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("caption_requests").select("*", { count: "exact", head: true }),
    ]);

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    captionRequests = (rows ?? []).map((row) => ({
      id: row.id,
      profile_id: row.profile_id,
      image_id: row.image_id,
      created_datetime_utc: row.created_datetime_utc,
    }));
  } else {
    const offset = (examplesPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("caption_examples")
        .select("id, created_datetime_utc, modified_datetime_utc, image_description, caption, explanation, priority, image_id")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("caption_examples").select("*", { count: "exact", head: true }),
    ]);

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    captionExamples = (rows ?? []).map((row) => ({
      id: row.id,
      created_datetime_utc: row.created_datetime_utc,
      modified_datetime_utc: row.modified_datetime_utc,
      image_description: row.image_description,
      caption: row.caption,
      explanation: row.explanation,
      priority: row.priority,
      image_id: row.image_id,
    }));
  }

  const activePage =
    tab === "captions" ? captionsPage
    : tab === "requests" ? requestsPage
    : examplesPage;

  function paginationHref(newPage: number) {
    if (tab === "captions") {
      return `/captions?tab=captions&captionsPage=${newPage}&requestsPage=${requestsPage}&examplesPage=${examplesPage}`;
    }
    if (tab === "requests") {
      return `/captions?tab=requests&requestsPage=${newPage}&captionsPage=${captionsPage}&examplesPage=${examplesPage}`;
    }
    return `/captions?tab=examples&examplesPage=${newPage}&captionsPage=${captionsPage}&requestsPage=${requestsPage}`;
  }

  const tabBase = `captionsPage=${captionsPage}&requestsPage=${requestsPage}&examplesPage=${examplesPage}`;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Captions
      </h2>

      {/* Tab switcher */}
      <div className="flex gap-2 font-[family-name:var(--font-pixelify-sans)]">
        <Link
          href={`/captions?tab=captions&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "captions"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Captions
        </Link>
        <Link
          href={`/captions?tab=requests&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "requests"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Caption Requests
        </Link>
        <Link
          href={`/captions?tab=examples&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "examples"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Caption Examples
        </Link>
      </div>

      {/* Active table */}
      {tab === "captions" ? (
        <CaptionsTable captions={captions} />
      ) : tab === "requests" ? (
        <CaptionRequestsTable requests={captionRequests} />
      ) : (
        <CaptionExamplesTable examples={captionExamples} />
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/50">
          Page {activePage} of {totalPages} &middot; {totalCount.toLocaleString()} total
        </span>
        <div className="flex gap-2">
          {activePage > 1 ? (
            <Link
              href={paginationHref(activePage - 1)}
              className="px-4 py-1.5 text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors"
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-4 py-1.5 text-[#e8d5a3]/20 border border-[#e8d5a3]/10 rounded cursor-not-allowed">
              ← Prev
            </span>
          )}
          {activePage < totalPages ? (
            <Link
              href={paginationHref(activePage + 1)}
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
