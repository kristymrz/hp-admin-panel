"use client";

export type CaptionRow = {
  id: string;
  content: string | null;
  image_id: string;
  image_url: string | null;
  is_public: boolean;
  is_featured: boolean;
  like_count: number;
  profile_id: string;
  created_datetime_utc: string;
  modified_datetime_utc: string | null;
  humor_flavor_id: number | null;
  caption_request_id: number | null;
  llm_prompt_chain_id: number | null;
};

type Props = {
  caption: CaptionRow;
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

export default function CaptionDetailModal({ caption, onClose }: Props) {
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
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Caption Details</h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Associated image */}
          {caption.image_url ? (
            <img
              src={caption.image_url}
              alt="Associated image"
              className="w-full rounded-lg object-contain max-h-72 bg-[#0b1e30]"
            />
          ) : (
            <div className="w-full h-48 bg-[#0b1e30] rounded-lg flex items-center justify-center border-2 border-dashed border-[#099ff6]/20">
              <span className="text-[#e8d5a3]/30 text-sm">No image available</span>
            </div>
          )}

          {/* Full caption content */}
          <div className="flex flex-col gap-1">
            <span className="text-[#e8d5a3]/40 text-xs uppercase tracking-widest">
              Caption Content
            </span>
            <p className="text-[#e8d5a3] text-sm leading-relaxed">
              {caption.content ?? "—"}
            </p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Caption ID"       value={<span className="font-mono text-xs">{caption.id}</span>} />
            <Field label="Image ID"         value={<span className="font-mono text-xs">{caption.image_id}</span>} />
            <Field label="Profile ID"       value={<span className="font-mono text-xs">{caption.profile_id}</span>} />
            <Field label="Like Count"       value={caption.like_count} />
            <Field label="Public"           value={caption.is_public ? "Yes" : "No"} />
            <Field label="Featured"         value={caption.is_featured ? "Yes" : "No"} />
            <Field
              label="Created"
              value={new Date(caption.created_datetime_utc).toLocaleString()}
            />
            <Field
              label="Modified"
              value={
                caption.modified_datetime_utc
                  ? new Date(caption.modified_datetime_utc).toLocaleString()
                  : null
              }
            />
            <Field label="Humor Flavor ID"     value={caption.humor_flavor_id} />
            <Field label="Caption Request ID"  value={caption.caption_request_id} />
            <Field label="LLM Prompt Chain ID" value={caption.llm_prompt_chain_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
