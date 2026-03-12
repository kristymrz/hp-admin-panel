"use client";

import type { LLMModelResponseRow } from "./LLMModelResponsesTable";

type Props = {
  response: LLMModelResponseRow;
  onClose: () => void;
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#e8d5a3]/40 text-xs uppercase tracking-widest">
        {label}
      </span>
      <span className="text-[#e8d5a3]/80 text-sm break-all leading-relaxed">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function LLMModelResponseDetailModal({ response, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20 sticky top-0 bg-[#0f2236]">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Model Response Details</h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Profile ID"            value={<span className="font-mono text-xs">{response.profile_id}</span>} />
            <Field label="Humor Flavor ID"       value={response.humor_flavor_id} />
            <Field label="LLM Prompt Chain ID"   value={response.llm_prompt_chain_id ?? null} />
            <Field label="Humor Flavor Step ID"  value={response.humor_flavor_step_id ?? null} />
            <Field label="LLM Temperature"       value={response.llm_temperature ?? null} />
          </div>
          <Field label="LLM System Prompt" value={response.llm_system_prompt} />
          <Field label="LLM User Prompt"   value={response.llm_user_prompt} />
        </div>
      </div>
    </div>
  );
}
