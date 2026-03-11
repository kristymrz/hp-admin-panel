"use client";

import type { CaptionRequestRow } from "./CaptionRequestsTable";

type Props = {
  request: CaptionRequestRow;
  onClose: () => void;
};

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#e8d5a3]/40 text-xs uppercase tracking-widest">
        {label}
      </span>
      <span className="text-[#e8d5a3]/80 text-sm break-all">{value ?? "—"}</span>
    </div>
  );
}

export default function CaptionRequestDetailModal({ request, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20 sticky top-0 bg-[#0f2236]">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Caption Request Details</h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-4">
          <Field label="ID" value={<span className="font-mono text-xs">{request.id}</span>} />
          <Field label="Profile ID" value={<span className="font-mono text-xs">{request.profile_id}</span>} />
          <Field label="Image ID" value={<span className="font-mono text-xs">{request.image_id}</span>} />
          <Field
            label="Created"
            value={new Date(request.created_datetime_utc).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
}
