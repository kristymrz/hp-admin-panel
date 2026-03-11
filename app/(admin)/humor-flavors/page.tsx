import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import HumorFlavorsTable from "@/components/admin/humor-flavors/HumorFlavorsTable";
import HumorFlavorStepsTable from "@/components/admin/humor-flavors/HumorFlavorStepsTable";
import HumorFlavorMixTable from "@/components/admin/humor-flavors/HumorFlavorMixTable";
import type { HumorFlavorRow } from "@/components/admin/humor-flavors/HumorFlavorsTable";
import type { HumorFlavorStepRow } from "@/components/admin/humor-flavors/HumorFlavorStepsTable";
import type { HumorFlavorMixRow } from "@/components/admin/humor-flavors/HumorFlavorMixTable";

const PAGE_SIZE = 25;

export default async function HumorFlavorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    flavorsPage?: string;
    stepsPage?: string;
    mixPage?: string;
  }>;
}) {
  const {
    tab: tabParam,
    flavorsPage: flavorsPageParam,
    stepsPage: stepsPageParam,
    mixPage: mixPageParam,
  } = await searchParams;

  const tab = tabParam === "steps" ? "steps" : tabParam === "mix" ? "mix" : "flavors";
  const flavorsPage = Math.max(1, parseInt(flavorsPageParam ?? "1", 10));
  const stepsPage = Math.max(1, parseInt(stepsPageParam ?? "1", 10));
  const mixPage = Math.max(1, parseInt(mixPageParam ?? "1", 10));

  const supabase = await createClient();

  let flavors: HumorFlavorRow[] = [];
  let steps: HumorFlavorStepRow[] = [];
  let mixRows: HumorFlavorMixRow[] = [];
  let totalPages = 1;
  let totalCount = 0;

  if (tab === "flavors") {
    const offset = (flavorsPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("humor_flavors")
        .select("id, created_datetime_utc, description, slug")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("humor_flavors").select("*", { count: "exact", head: true }),
    ]);

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    flavors = rows ?? [];
  } else if (tab === "steps") {
    const offset = (stepsPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("humor_flavor_steps")
        .select("id, created_datetime_utc, humor_flavor_id, llm_temperature, order_by, llm_input_type_id, llm_output_type_id, llm_model_id, humor_flavor_step_type_id, llm_system_prompt, llm_user_prompt, description")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("humor_flavor_steps").select("*", { count: "exact", head: true }),
    ]);

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    steps = rows ?? [];
  } else {
    const offset = (mixPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("humor_flavor_mix")
        .select("id, created_datetime_utc, humor_flavor_id, caption_count")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("humor_flavor_mix").select("*", { count: "exact", head: true }),
    ]);

    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    mixRows = rows ?? [];
  }

  const activePage = tab === "flavors" ? flavorsPage : tab === "steps" ? stepsPage : mixPage;
  const tabBase = `flavorsPage=${flavorsPage}&stepsPage=${stepsPage}&mixPage=${mixPage}`;

  function paginationHref(newPage: number) {
    if (tab === "flavors") {
      return `/humor-flavors?tab=flavors&flavorsPage=${newPage}&stepsPage=${stepsPage}&mixPage=${mixPage}`;
    }
    if (tab === "steps") {
      return `/humor-flavors?tab=steps&stepsPage=${newPage}&flavorsPage=${flavorsPage}&mixPage=${mixPage}`;
    }
    return `/humor-flavors?tab=mix&mixPage=${newPage}&flavorsPage=${flavorsPage}&stepsPage=${stepsPage}`;
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Humor Flavors
      </h2>

      {/* Tab switcher */}
      <div className="flex gap-2 font-[family-name:var(--font-pixelify-sans)]">
        <Link
          href={`/humor-flavors?tab=flavors&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "flavors"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Humor Flavors
        </Link>
        <Link
          href={`/humor-flavors?tab=steps&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "steps"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Humor Flavor Steps
        </Link>
        <Link
          href={`/humor-flavors?tab=mix&${tabBase}`}
          className={`px-4 py-1.5 text-sm rounded border transition-colors ${
            tab === "mix"
              ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
              : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
          }`}
        >
          Humor Flavor Mix
        </Link>
      </div>

      {/* Active table */}
      {tab === "flavors" ? (
        <HumorFlavorsTable flavors={flavors} />
      ) : tab === "steps" ? (
        <HumorFlavorStepsTable steps={steps} />
      ) : (
        <HumorFlavorMixTable rows={mixRows} />
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
