"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteImage } from "@/app/actions/images";

type Props = {
  imageId: string;
  onClose: () => void;
};

export default function ImageDeleteModal({ imageId, onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteImage(imageId);
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
        className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-md font-[family-name:var(--font-pixelify-sans)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ec6d70]/30">
          <h3 className="text-[#ec6d70] text-lg font-semibold">Delete Image</h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-4">
          <p className="text-[#e8d5a3] text-sm leading-relaxed">
            Are you sure you want to delete this image? This action{" "}
            <span className="text-[#ec6d70] font-semibold">cannot be undone</span>.
          </p>

          {/* Cascade warning */}
          <div className="bg-[#ec6d70]/10 border border-[#ec6d70]/30 rounded-lg px-4 py-3 flex flex-col gap-1.5">
            <p className="text-[#ec6d70] text-xs font-semibold uppercase tracking-widest">
              Warning — Cascading Deletion
            </p>
            <p className="text-[#e8d5a3]/70 text-xs leading-relaxed">
              Deleting this image will permanently delete all associated data, including{" "}
              <span className="text-[#e8d5a3]">captions, caption requests, caption examples, reported images, and study image set mappings</span>{" "}
              that reference this image.
            </p>
          </div>

          {/* Storage warning */}
          <div className="bg-[#f3910c]/10 border border-[#f3910c]/30 rounded-lg px-4 py-3">
            <p className="text-[#f3910c] text-xs font-semibold uppercase tracking-widest mb-1">
              Note — Storage File Not Deleted
            </p>
            <p className="text-[#e8d5a3]/70 text-xs leading-relaxed">
              The image file in storage will <span className="text-[#e8d5a3]">not</span> be deleted. Complete storage deletion has not yet been implemented.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 py-2 text-sm font-semibold bg-[#ec6d70] hover:bg-[#d45558] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Deleting..." : "Delete"}
            </button>
            <button
              onClick={onClose}
              disabled={isPending}
              className="flex-1 py-2 text-sm text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded-lg hover:bg-[#e8d5a3]/5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
