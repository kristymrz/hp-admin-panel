"use client";

import type { HumorFlavorStepRow } from "./HumorFlavorStepsTable";

type Props = {
  step: HumorFlavorStepRow;
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

export default function HumorFlavorStepDetailModal({ step, onClose }: Props) {
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
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Humor Flavor Step Details</h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="ID"                       value={<span className="font-mono text-xs">{step.id}</span>} />
            <Field label="Humor Flavor ID"          value={<span className="font-mono text-xs">{step.humor_flavor_id}</span>} />
            <Field label="Order By"                 value={step.order_by} />
            <Field label="LLM Temperature"          value={step.llm_temperature ?? null} />
            <Field label="LLM Input Type ID"        value={step.llm_input_type_id} />
            <Field label="LLM Output Type ID"       value={step.llm_output_type_id} />
            <Field label="LLM Model ID"             value={step.llm_model_id} />
            <Field label="Step Type ID"             value={step.humor_flavor_step_type_id} />
            <Field label="Created"                  value={new Date(step.created_datetime_utc).toLocaleString()} />
          </div>
          <Field label="Description"      value={step.description} />
          <Field label="LLM System Prompt" value={step.llm_system_prompt} />
          <Field label="LLM User Prompt"  value={step.llm_user_prompt} />
        </div>
      </div>
    </div>
  );
}
