"use client";

import { useState } from "react";
import LLMModelResponseDetailModal from "./LLMModelResponseDetailModal";

export type LLMModelResponseRow = {
  id: string;
  created_datetime_utc: string;
  llm_model_response: string | null;
  processing_time_seconds: number;
  llm_model_id: number;
  profile_id: string;
  caption_request_id: number;
  llm_system_prompt: string;
  llm_user_prompt: string;
  llm_temperature: number | null;
  humor_flavor_id: number;
  llm_prompt_chain_id: number | null;
  humor_flavor_step_id: number | null;
};

type Props = {
  responses: LLMModelResponseRow[];
};

function shortId(id: string) {
  return id.slice(0, 8) + "…";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LLMModelResponsesTable({ responses }: Props) {
  const [selected, setSelected] = useState<LLMModelResponseRow | null>(null);

  return (
    <>
      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
          <thead>
            <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Created
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Response
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Processing (s)
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Model ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Caption Request ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {responses.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                  i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
                }`}
              >
                <td className="px-4 py-3 text-[#099ff6]/70 font-mono text-xs whitespace-nowrap">
                  {shortId(row.id)}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {formatDate(row.created_datetime_utc)}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3] max-w-xs">
                  <span className="line-clamp-2 leading-relaxed text-xs">
                    {row.llm_model_response ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 text-xs">
                  {row.processing_time_seconds}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 text-xs">
                  {row.llm_model_id}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                  {row.caption_request_id}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelected(row)}
                    className="px-3 py-1 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    More Info
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <LLMModelResponseDetailModal response={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
