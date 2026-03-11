"use client";

import { useState } from "react";
import HumorFlavorMixEditModal from "./HumorFlavorMixEditModal";

export type HumorFlavorMixRow = {
  id: number;
  created_datetime_utc: string;
  humor_flavor_id: number;
  caption_count: number;
};

type Props = {
  rows: HumorFlavorMixRow[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function HumorFlavorMixTable({ rows }: Props) {
  const [editRow, setEditRow] = useState<HumorFlavorMixRow | null>(null);

  return (
    <>
      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
          <thead>
            <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Humor Flavor ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Caption Count
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Created
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                  i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
                }`}
              >
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                  {row.id}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs">
                  {row.humor_flavor_id}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 text-xs">
                  {row.caption_count}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {formatDate(row.created_datetime_utc)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditRow(row)}
                    className="px-3 py-1 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editRow && (
        <HumorFlavorMixEditModal row={editRow} onClose={() => setEditRow(null)} />
      )}
    </>
  );
}
