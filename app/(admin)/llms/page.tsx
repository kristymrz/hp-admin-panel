import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LLMPromptChainsTable from "@/components/admin/llms/LLMPromptChainsTable";
import LLMModelResponsesTable from "@/components/admin/llms/LLMModelResponsesTable";
import LLMModelsTable from "@/components/admin/llms/LLMModelsTable";
import LLMProvidersTable from "@/components/admin/llms/LLMProvidersTable";
import type { LLMPromptChainRow } from "@/components/admin/llms/LLMPromptChainsTable";
import type { LLMModelResponseRow } from "@/components/admin/llms/LLMModelResponsesTable";
import type { LLMModelRow } from "@/components/admin/llms/LLMModelsTable";
import type { LLMProviderRow } from "@/components/admin/llms/LLMProvidersTable";

const PAGE_SIZE = 25;

export default async function LLMsPage({
  searchParams,
}: {
  searchParams: Promise<{
    tab?: string;
    chainsPage?: string;
    responsesPage?: string;
    modelsPage?: string;
    providersPage?: string;
  }>;
}) {
  const {
    tab: tabParam,
    chainsPage: chainsPageParam,
    responsesPage: responsesPageParam,
    modelsPage: modelsPageParam,
    providersPage: providersPageParam,
  } = await searchParams;

  const tab =
    tabParam === "responses" ? "responses"
    : tabParam === "models" ? "models"
    : tabParam === "providers" ? "providers"
    : "chains";

  const chainsPage    = Math.max(1, parseInt(chainsPageParam    ?? "1", 10));
  const responsesPage = Math.max(1, parseInt(responsesPageParam ?? "1", 10));
  const modelsPage    = Math.max(1, parseInt(modelsPageParam    ?? "1", 10));
  const providersPage = Math.max(1, parseInt(providersPageParam ?? "1", 10));

  const supabase = await createClient();

  let chains: LLMPromptChainRow[] = [];
  let responses: LLMModelResponseRow[] = [];
  let models: LLMModelRow[] = [];
  let providers: LLMProviderRow[] = [];
  let totalPages = 1;
  let totalCount = 0;

  if (tab === "chains") {
    const offset = (chainsPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("llm_prompt_chains")
        .select("id, created_datetime_utc, caption_request_id")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("llm_prompt_chains").select("*", { count: "exact", head: true }),
    ]);
    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    chains = rows ?? [];
  } else if (tab === "responses") {
    const offset = (responsesPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("llm_model_responses")
        .select("id, created_datetime_utc, llm_model_response, processing_time_seconds, llm_model_id, profile_id, caption_request_id, llm_system_prompt, llm_user_prompt, llm_temperature, humor_flavor_id, llm_prompt_chain_id, humor_flavor_step_id")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("llm_model_responses").select("*", { count: "exact", head: true }),
    ]);
    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    responses = rows ?? [];
  } else if (tab === "models") {
    const offset = (modelsPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("llm_models")
        .select("id, created_datetime_utc, name, llm_provider_id, provider_model_id, is_temperature_supported")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("llm_models").select("*", { count: "exact", head: true }),
    ]);
    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    models = rows ?? [];
  } else {
    const offset = (providersPage - 1) * PAGE_SIZE;
    const [{ data: rows }, { count }] = await Promise.all([
      supabase
        .from("llm_providers")
        .select("id, created_datetime_utc, name")
        .order("created_datetime_utc", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1),
      supabase.from("llm_providers").select("*", { count: "exact", head: true }),
    ]);
    totalCount = count ?? 0;
    totalPages = Math.ceil(totalCount / PAGE_SIZE);
    providers = rows ?? [];
  }

  const activePage =
    tab === "chains" ? chainsPage
    : tab === "responses" ? responsesPage
    : tab === "models" ? modelsPage
    : providersPage;

  const tabBase = `chainsPage=${chainsPage}&responsesPage=${responsesPage}&modelsPage=${modelsPage}&providersPage=${providersPage}`;

  function paginationHref(newPage: number) {
    if (tab === "chains")    return `/llms?tab=chains&chainsPage=${newPage}&responsesPage=${responsesPage}&modelsPage=${modelsPage}&providersPage=${providersPage}`;
    if (tab === "responses") return `/llms?tab=responses&responsesPage=${newPage}&chainsPage=${chainsPage}&modelsPage=${modelsPage}&providersPage=${providersPage}`;
    if (tab === "models")    return `/llms?tab=models&modelsPage=${newPage}&chainsPage=${chainsPage}&responsesPage=${responsesPage}&providersPage=${providersPage}`;
    return `/llms?tab=providers&providersPage=${newPage}&chainsPage=${chainsPage}&responsesPage=${responsesPage}&modelsPage=${modelsPage}`;
  }

  const tabClass = (t: string) =>
    `px-4 py-1.5 text-sm rounded border transition-colors ${
      tab === t
        ? "bg-[#099ff6]/20 text-[#099ff6] border-[#099ff6]/50"
        : "text-[#e8d5a3]/50 border-[#e8d5a3]/10 hover:bg-[#099ff6]/10 hover:text-[#099ff6]"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        LLMs
      </h2>

      {/* Tab switcher */}
      <div className="flex gap-2 font-[family-name:var(--font-pixelify-sans)]">
        <Link href={`/llms?tab=chains&${tabBase}`}    className={tabClass("chains")}>Prompt Chains</Link>
        <Link href={`/llms?tab=responses&${tabBase}`} className={tabClass("responses")}>Model Responses</Link>
        <Link href={`/llms?tab=models&${tabBase}`}    className={tabClass("models")}>Models</Link>
        <Link href={`/llms?tab=providers&${tabBase}`} className={tabClass("providers")}>Providers</Link>
      </div>

      {/* Active table */}
      {tab === "chains"    ? <LLMPromptChainsTable chains={chains} />       :
       tab === "responses" ? <LLMModelResponsesTable responses={responses} /> :
       tab === "models"    ? <LLMModelsTable models={models} />              :
                             <LLMProvidersTable providers={providers} />}

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/50">
          Page {activePage} of {totalPages} &middot; {totalCount.toLocaleString()} total
        </span>
        <div className="flex gap-2">
          {activePage > 1 ? (
            <Link href={paginationHref(activePage - 1)} className="px-4 py-1.5 text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors">← Prev</Link>
          ) : (
            <span className="px-4 py-1.5 text-[#e8d5a3]/20 border border-[#e8d5a3]/10 rounded cursor-not-allowed">← Prev</span>
          )}
          {activePage < totalPages ? (
            <Link href={paginationHref(activePage + 1)} className="px-4 py-1.5 text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors">Next →</Link>
          ) : (
            <span className="px-4 py-1.5 text-[#e8d5a3]/20 border border-[#e8d5a3]/10 rounded cursor-not-allowed">Next →</span>
          )}
        </div>
      </div>
    </div>
  );
}
