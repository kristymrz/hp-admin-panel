"use client";

import { useState } from "react";
import LLMModelDetailModal from "./LLMModelDetailModal";
import LLMModelEditModal from "./LLMModelEditModal";
import LLMModelDeleteModal from "./LLMModelDeleteModal";
import LLMModelCreateModal from "./LLMModelCreateModal";

export type LLMModelRow = {
  id: number;
  created_datetime_utc: string;
  name: string;
  llm_provider_id: number;
  provider_model_id: string;
  is_temperature_supported: boolean;
};

type Props = {
  models: LLMModelRow[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LLMModelsTable({ models }: Props) {
  const [detailRow, setDetailRow] = useState<LLMModelRow | null>(null);
  const [editRow, setEditRow] = useState<LLMModelRow | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#099ff6] hover:bg-[#007ecc] text-white text-sm font-semibold rounded-lg shadow transition-colors cursor-pointer font-[family-name:var(--font-pixelify-sans)]"
        >
          <span className="text-base leading-none">+</span>
          Add Model
        </button>
      </div>

      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
          <thead>
            <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">ID</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">Name</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">Provider ID</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">Provider Model ID</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">Temp. Supported</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">Created</th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                  i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
                }`}
              >
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">{row.id}</td>
                <td className="px-4 py-3 text-[#e8d5a3] text-xs">{row.name}</td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">{row.llm_provider_id}</td>
                <td className="px-4 py-3 text-[#099ff6]/80 font-mono text-xs whitespace-nowrap">{row.provider_model_id}</td>
                <td className="px-4 py-3 text-xs">
                  {row.is_temperature_supported ? (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#3ac586]/15 text-[#3ac586] border border-[#3ac586]/30">Yes</span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#e8d5a3]/5 text-[#e8d5a3]/40 border border-[#e8d5a3]/10">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">{formatDate(row.created_datetime_utc)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <button onClick={() => setDetailRow(row)} className="px-3 py-1 text-xs text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded hover:bg-[#e8d5a3]/5 transition-colors cursor-pointer whitespace-nowrap">More Info</button>
                    <button onClick={() => setEditRow(row)} className="px-3 py-1 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer">Update</button>
                    <button onClick={() => setDeleteId(row.id)} className="px-3 py-1 text-xs text-[#ec6d70] border border-[#ec6d70]/30 rounded hover:bg-[#ec6d70]/10 transition-colors cursor-pointer">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreate && <LLMModelCreateModal onClose={() => setShowCreate(false)} />}
      {detailRow && <LLMModelDetailModal model={detailRow} onClose={() => setDetailRow(null)} />}
      {editRow && <LLMModelEditModal model={editRow} onClose={() => setEditRow(null)} />}
      {deleteId !== null && <LLMModelDeleteModal modelId={deleteId} onClose={() => setDeleteId(null)} />}
    </>
  );
}
