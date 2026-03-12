"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteLLMProvider } from "@/app/actions/llmProviders";

type Props = {
  providerId: number;
  onClose: () => void;
};

export default function LLMProviderDeleteModal({ providerId, onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await deleteLLMProvider(providerId);
      router.refresh();
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-md font-[family-name:var(--font-pixelify-sans)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ec6d70]/30">
          <h3 className="text-[#ec6d70] text-lg font-semibold">Delete LLM Provider</h3>
          <button onClick={onClose} disabled={isPending} className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30">✕</button>
        </div>
        <div className="px-6 py-6 flex flex-col gap-4">
          <p className="text-[#e8d5a3] text-sm leading-relaxed">
            Are you sure you want to delete this LLM provider? This action{" "}
            <span className="text-[#ec6d70] font-semibold">cannot be undone</span>.
          </p>
          <div className="flex gap-3 pt-1">
            <button onClick={handleDelete} disabled={isPending} className="flex-1 py-2 text-sm font-semibold bg-[#ec6d70] hover:bg-[#d45558] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {isPending ? "Deleting..." : "Delete"}
            </button>
            <button onClick={onClose} disabled={isPending} className="flex-1 py-2 text-sm text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded-lg hover:bg-[#e8d5a3]/5 transition-colors disabled:opacity-50 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
