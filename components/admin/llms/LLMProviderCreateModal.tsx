"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createLLMProvider } from "@/app/actions/llmProviders";

type Props = {
  onClose: () => void;
};

export default function LLMProviderCreateModal({ onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");

  const isValid = name.trim() !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    startTransition(async () => {
      await createLLMProvider({ name: name.trim() });
      router.refresh();
      onClose();
    });
  }

  const inputClass =
    "bg-[#0b1e30] border border-[#099ff6]/20 rounded-lg px-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors disabled:opacity-50";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-[#0f2236] rounded-lg shadow-2xl w-full max-w-xl font-[family-name:var(--font-pixelify-sans)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#099ff6]/20">
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Add LLM Provider</h3>
          <button onClick={onClose} disabled={isPending} className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Name <span className="text-[#ec6d70]">*</span>
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} className={inputClass} placeholder="Provider name..." />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={isPending || !isValid} className="flex-1 py-2 text-sm font-semibold bg-[#099ff6] hover:bg-[#007ecc] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
              {isPending ? "Creating..." : "Create"}
            </button>
            <button type="button" onClick={onClose} disabled={isPending} className="flex-1 py-2 text-sm text-[#e8d5a3]/70 border border-[#e8d5a3]/20 rounded-lg hover:bg-[#e8d5a3]/5 transition-colors disabled:opacity-50 cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
