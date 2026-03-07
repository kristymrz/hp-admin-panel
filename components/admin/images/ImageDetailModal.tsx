"use client";

export type ImageRow = {
  id: string;
  url: string | null;
  is_common_use: boolean | null;
  profile_id: string | null;
  additional_context: string | null;
  is_public: boolean | null;
  image_description: string | null;
  celebrity_recognition: string | null;
  created_datetime_utc: string;
  modified_datetime_utc: string | null;
};

type Props = {
  image: ImageRow;
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

function BoolField({ label, value }: { label: string; value: boolean | null }) {
  if (value === null) return <Field label={label} value={null} />;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[#e8d5a3]/40 text-xs uppercase tracking-widest">
        {label}
      </span>
      {value ? (
        <span className="inline-block w-fit px-2 py-0.5 rounded text-xs bg-[#3ac586]/15 text-[#3ac586] border border-[#3ac586]/30">
          Yes
        </span>
      ) : (
        <span className="inline-block w-fit px-2 py-0.5 rounded text-xs bg-[#e8d5a3]/5 text-[#e8d5a3]/40 border border-[#e8d5a3]/10">
          No
        </span>
      )}
    </div>
  );
}

export default function ImageDetailModal({ image, onClose }: Props) {
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
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Image Details</h3>
          <button
            onClick={onClose}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-6">
          {/* Image */}
          {image.url ? (
            <img
              src={image.url}
              alt="Image"
              className="w-full rounded-lg object-contain max-h-72 bg-[#0b1e30]"
            />
          ) : (
            <div className="w-full h-48 bg-[#0b1e30] rounded-lg flex items-center justify-center border-2 border-dashed border-[#099ff6]/20">
              <span className="text-[#e8d5a3]/30 text-sm">No image available</span>
            </div>
          )}

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Image ID"    value={<span className="font-mono text-xs">{image.id}</span>} />
            <Field label="Profile ID"  value={image.profile_id ? <span className="font-mono text-xs">{image.profile_id}</span> : null} />
            <Field label="URL"         value={image.url} />
            <Field
              label="Created"
              value={new Date(image.created_datetime_utc).toLocaleString()}
            />
            <Field
              label="Modified"
              value={image.modified_datetime_utc ? new Date(image.modified_datetime_utc).toLocaleString() : null}
            />
            <BoolField label="Public"      value={image.is_public} />
            <BoolField label="Common Use"  value={image.is_common_use} />
          </div>

          {image.additional_context && (
            <Field label="Additional Context" value={image.additional_context} />
          )}
          {image.image_description && (
            <Field label="Image Description" value={image.image_description} />
          )}
          {image.celebrity_recognition && (
            <Field label="Celebrity Recognition" value={image.celebrity_recognition} />
          )}
        </div>
      </div>
    </div>
  );
}
