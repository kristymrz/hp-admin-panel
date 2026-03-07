"use client";

import { useState } from "react";
import CaptionDetailModal, { type CaptionRow } from "./CaptionDetailModal";

type Props = {
  captions: CaptionRow[];
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

function Badge({
  value,
  activeColor,
}: {
  value: boolean;
  activeColor: string;
}) {
  return value ? (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs border ${activeColor}`}
    >
      Yes
    </span>
  ) : (
    <span className="inline-block px-2 py-0.5 rounded text-xs bg-[#e8d5a3]/5 text-[#e8d5a3]/40 border border-[#e8d5a3]/10">
      No
    </span>
  );
}

export default function CaptionsTable({ captions }: Props) {
  const [selected, setSelected] = useState<CaptionRow | null>(null);

  return (
    <>
      <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-sm font-[family-name:var(--font-pixelify-sans)]">
          <thead>
            <tr className="bg-[#0b1e30] border-b border-[#099ff6]/20">
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Caption
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Image ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Public
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Featured
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Likes
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium whitespace-nowrap">
                Author ID
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                Created
              </th>
              <th className="text-left px-4 py-3 text-[#e8d5a3]/50 uppercase tracking-widest text-xs font-medium">
                More
              </th>
            </tr>
          </thead>
          <tbody>
            {captions.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-[#099ff6]/10 transition-colors hover:bg-[#099ff6]/5 ${
                  i % 2 === 0 ? "bg-[#0f2236]" : "bg-[#0d1f33]"
                }`}
              >
                <td className="px-4 py-3 text-[#e8d5a3] max-w-xs">
                  <span className="line-clamp-2 leading-relaxed text-xs">
                    {row.content ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#099ff6]/70 font-mono text-xs whitespace-nowrap">
                  {shortId(row.image_id)}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    value={row.is_public}
                    activeColor="bg-[#3ac586]/15 text-[#3ac586] border-[#3ac586]/30"
                  />
                </td>
                <td className="px-4 py-3">
                  <Badge
                    value={row.is_featured}
                    activeColor="bg-[#f3910c]/15 text-[#f3910c] border-[#f3910c]/30"
                  />
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap">
                  {row.like_count.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 font-mono text-xs whitespace-nowrap">
                  {shortId(row.profile_id)}
                </td>
                <td className="px-4 py-3 text-[#e8d5a3]/70 whitespace-nowrap text-xs">
                  {formatDate(row.created_datetime_utc)}
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
        <CaptionDetailModal caption={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
