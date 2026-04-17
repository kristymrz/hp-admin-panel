"use client";

import { useState } from "react";
import CaptionLeaderboardModal, { type LeaderboardEntry } from "./CaptionLeaderboardModal";

type Props = {
  entries: LeaderboardEntry[];
  title?: string;
};

export default function CaptionLeaderboard({ entries, title = "Top Captions Overall" }: Props) {
  const [selected, setSelected] = useState<{ entry: LeaderboardEntry; rank: number } | null>(null);

  return (
    <>
      <div className="bg-[#0f2236] rounded-lg shadow-lg p-6 flex flex-col gap-4 font-[family-name:var(--font-pixelify-sans)]">
        <span className="text-[#e8d5a3]/60 text-sm uppercase tracking-widest">
          {title}
        </span>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#099ff6]/20">
                <th className="text-left pb-3 pr-4 text-[#e8d5a3]/40 text-xs uppercase tracking-widest font-medium w-8">
                  #
                </th>
                <th className="text-left pb-3 pr-4 text-[#e8d5a3]/40 text-xs uppercase tracking-widest font-medium w-14">
                  Image
                </th>
                <th className="text-left pb-3 pr-4 text-[#e8d5a3]/40 text-xs uppercase tracking-widest font-medium">
                  Caption
                </th>
                <th className="text-left pb-3 pr-4 text-[#e8d5a3]/40 text-xs uppercase tracking-widest font-medium whitespace-nowrap">
                  Net Score
                </th>
                <th className="text-left pb-3 text-[#e8d5a3]/40 text-xs uppercase tracking-widest font-medium">
                  Info
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-[#099ff6]/10 ${
                    i % 2 === 0 ? "" : "bg-[#0d1f33]/40"
                  }`}
                >
                  {/* Rank */}
                  <td className="py-3 pr-4 text-[#e8d5a3]/30 text-xs">
                    {i + 1}
                  </td>

                  {/* Thumbnail */}
                  <td className="py-3 pr-4">
                    <div className="w-10 h-10 rounded bg-[#0b1e30] border border-[#099ff6]/10 overflow-hidden flex items-center justify-center shrink-0">
                      {entry.image_url ? (
                        <img
                          src={entry.image_url}
                          alt="Caption image"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[#e8d5a3]/15 text-sm">🖼️</span>
                      )}
                    </div>
                  </td>

                  {/* Caption text */}
                  <td className="py-3 pr-4 text-[#e8d5a3]/80 max-w-xs">
                    <span className="line-clamp-2 text-xs leading-relaxed">
                      {entry.content ?? "—"}
                    </span>
                  </td>

                  {/* Net score */}
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${entry.score >= 0 ? "text-[#3ac586]" : "text-[#ec6d70]"}`}>
                      {entry.score >= 0 ? "+" : ""}{entry.score}
                    </span>
                  </td>

                  {/* More Info button */}
                  <td className="py-3">
                    <button
                      onClick={() => setSelected({ entry, rank: i + 1 })}
                      className="px-2.5 py-1 text-xs rounded border border-[#099ff6]/30 text-[#099ff6]/70 hover:text-[#099ff6] hover:border-[#099ff6]/60 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      More Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <CaptionLeaderboardModal
          entry={selected.entry}
          rank={selected.rank}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
