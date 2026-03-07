type ImageCardProps = {
  title: string;
  captionSnippet: string;
};

export default function ImageCard({ title, captionSnippet }: ImageCardProps) {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg overflow-hidden flex flex-col font-[family-name:var(--font-pixelify-sans)]">
      {/* Placeholder image area */}
      <div className="w-full h-44 bg-[#0b1e30] border-b border-[#099ff6]/10 flex items-center justify-center">
        <span className="text-[#e8d5a3]/15 text-4xl">🖼️</span>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-[#e8d5a3] text-base font-semibold leading-snug">
          {title}
        </h3>
        <p className="text-[#e8d5a3]/50 text-xs leading-relaxed line-clamp-2">
          {captionSnippet}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 py-1.5 text-xs text-[#099ff6] border border-[#099ff6]/30 rounded hover:bg-[#099ff6]/10 transition-colors cursor-pointer">
          Edit
        </button>
        <button className="flex-1 py-1.5 text-xs text-[#ec6d70] border border-[#ec6d70]/30 rounded hover:bg-[#ec6d70]/10 transition-colors cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  );
}
