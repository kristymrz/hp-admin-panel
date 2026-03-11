"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCaptionExample } from "@/app/actions/captionExamples";

type Props = {
  onClose: () => void;
};

export default function CaptionExampleCreateModal({ onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [imageDescription, setImageDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [explanation, setExplanation] = useState("");
  const [priority, setPriority] = useState("0");
  const [imageId, setImageId] = useState("");

  const isValid = imageDescription.trim() !== "" && caption.trim() !== "" && explanation.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    startTransition(async () => {
      await createCaptionExample({
        image_description: imageDescription.trim(),
        caption: caption.trim(),
        explanation: explanation.trim(),
        priority: parseInt(priority, 10) || 0,
        image_id: imageId.trim() || null,
      });
      router.refresh();
      onClose();
    });
  }

  const inputClass =
    "bg-[#0b1e30] border border-[#099ff6]/20 rounded-lg px-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors disabled:opacity-50";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20 sticky top-0 bg-[#0f2236]">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Create Caption Example</h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {/* Image Description — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Image Description <span className="text-[#ec6d70]">*</span>
            </label>
            <textarea
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
              disabled={isPending}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Describe the image..."
            />
          </div>

          {/* Caption — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Caption <span className="text-[#ec6d70]">*</span>
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              disabled={isPending}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Caption text..."
            />
          </div>

          {/* Explanation — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Explanation <span className="text-[#ec6d70]">*</span>
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              disabled={isPending}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Explain the caption..."
            />
          </div>

          {/* Priority — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Priority <span className="text-[#ec6d70]">*</span>
            </label>
            <input
              type="number"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isPending}
              className={inputClass}
            />
          </div>

          {/* Image ID — optional */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Image ID <span className="text-[#e8d5a3]/30">(optional)</span>
            </label>
            <input
              type="text"
              value={imageId}
              onChange={(e) => setImageId(e.target.value)}
              disabled={isPending}
              className={`${inputClass} font-mono`}
              placeholder="uuid..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isPending || !isValid}
              className="flex-1 py-2 text-sm font-semibold bg-[#099ff6] hover:bg-[#007ecc] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-2 text-sm text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded-lg hover:bg-[#e8d5a3]/5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
