"use client";

export type LeaderboardEntry = {
  id: string;
  content: string | null;
  image_url: string | null;
  score: number;
};

type Props = {
  entry: LeaderboardEntry;
  rank: number;
  onClose: () => void;
};

export default function CaptionLeaderboardModal({ entry, rank, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-lg font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">
            #{rank} Top Caption
          </h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-4">
          {/* Image */}
          {entry.image_url ? (
            <img
              src={entry.image_url}
              alt="Caption image"
              className="w-full rounded-lg object-contain max-h-72 bg-[#0b1e30]"
            />
          ) : (
            <div className="w-full h-48 bg-[#0b1e30] rounded-lg flex items-center justify-center border-2 border-dashed border-[#099ff6]/20">
              <span className="text-[#e8d5a3]/30 text-sm">No image available</span>
            </div>
          )}

          {/* Caption + like count */}
          <div className="flex items-start justify-between gap-4">
            <p className="text-[#e8d5a3]/80 text-sm leading-relaxed flex-1">
              {entry.content ?? "—"}
            </p>
            <span className={`shrink-0 text-base font-semibold ${entry.score >= 0 ? "text-[#3ac586]" : "text-[#ec6d70]"}`}>
              {entry.score >= 0 ? "+" : ""}{entry.score}
            </span>
          </div>

          {/* Full ID */}
          <div className="flex flex-col gap-1">
            <span className="text-[#e8d5a3]/30 text-xs uppercase tracking-widest">Caption ID</span>
            <span className="font-mono text-xs text-[#099ff6]/60 bg-[#099ff6]/5 border border-[#099ff6]/15 rounded px-2 py-1 break-all">
              {entry.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
