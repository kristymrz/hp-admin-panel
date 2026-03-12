import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TermsTable from "@/components/admin/terms/TermsTable";
import type { TermRow } from "@/components/admin/terms/TermsTable";

const PAGE_SIZE = 25;

export default async function TermsPage({
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
      .from("terms")
      .select("id, created_datetime_utc, modified_datetime_utc, term, definition, example, priority, term_type_id")
      .order("created_datetime_utc", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    supabase.from("terms").select("*", { count: "exact", head: true }),
  ]);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const terms: TermRow[] = (rows ?? []).map((row) => ({
    id: row.id,
    created_datetime_utc: row.created_datetime_utc,
    modified_datetime_utc: row.modified_datetime_utc,
    term: row.term,
    definition: row.definition,
    example: row.example,
    priority: row.priority,
    term_type_id: row.term_type_id,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Terms
      </h2>

      <TermsTable terms={terms} />

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/50">
          Page {page} of {totalPages} &middot; {totalCount.toLocaleString()} total
        </span>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link
              href={`/terms?page=${page - 1}`}
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
              href={`/terms?page=${page + 1}`}
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
