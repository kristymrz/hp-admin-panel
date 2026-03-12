import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EmailAddressesTable from "@/components/admin/email-addresses/EmailAddressesTable";
import type { EmailAddressRow } from "@/components/admin/email-addresses/EmailAddressesTable";

const PAGE_SIZE = 25;

export default async function EmailAddressesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();

  const [{ data }, { count }] = await Promise.all([
    supabase
      .from("whitelist_email_addresses")
      .select("id, created_datetime_utc, modified_datetime_utc, email_address")
      .order("created_datetime_utc", { ascending: false })
      .range(offset, offset + PAGE_SIZE - 1),
    supabase.from("whitelist_email_addresses").select("*", { count: "exact", head: true }),
  ]);

  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const rows: EmailAddressRow[] = (data ?? []).map((row) => ({
    id: row.id,
    created_datetime_utc: row.created_datetime_utc,
    modified_datetime_utc: row.modified_datetime_utc,
    email_address: row.email_address,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Whitelisted Email Addresses
      </h2>

      <EmailAddressesTable rows={rows} />

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/50">
          Page {page} of {totalPages} &middot; {totalCount.toLocaleString()} total
        </span>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link
              href={`/email-addresses?page=${page - 1}`}
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
              href={`/email-addresses?page=${page + 1}`}
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
