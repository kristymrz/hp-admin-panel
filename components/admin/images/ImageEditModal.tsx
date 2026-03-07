"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateImage } from "@/app/actions/images";
import type { ImageRow } from "./ImageDetailModal";

type Props = {
  image: ImageRow;
  onClose: () => void;
};

export default function ImageEditModal({ image, onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [url, setUrl] = useState(image.url ?? "");
  const [description, setDescription] = useState(image.image_description ?? "");
  const [recognition, setRecognition] = useState(image.celebrity_recognition ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      await updateImage(image.id, {
        url: url || null,
        image_description: description || null,
        celebrity_recognition: recognition || null,
      });
      router.refresh();
      onClose();
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-xl font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Edit Image</h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {/* URL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isPending}
              className="bg-[#0b1e30] border border-[#099ff6]/20 rounded-lg px-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors disabled:opacity-50"
              placeholder="https://..."
            />
          </div>

          {/* Image Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Image Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={4}
              className="bg-[#0b1e30] border border-[#099ff6]/20 rounded-lg px-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors resize-none disabled:opacity-50"
              placeholder="Describe the image..."
            />
          </div>

          {/* Celebrity Recognition */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Celebrity Recognition
            </label>
            <textarea
              value={recognition}
              onChange={(e) => setRecognition(e.target.value)}
              disabled={isPending}
              rows={3}
              className="bg-[#0b1e30] border border-[#099ff6]/20 rounded-lg px-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors resize-none disabled:opacity-50"
              placeholder="Recognized celebrities..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2 text-sm font-semibold bg-[#099ff6] hover:bg-[#007ecc] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Updating..." : "Update"}
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
