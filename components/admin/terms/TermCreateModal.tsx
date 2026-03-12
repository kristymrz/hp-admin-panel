"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTerm } from "@/app/actions/terms";

const TERM_TYPES = [
  { id: 2, name: "Verb" },
  { id: 3, name: "Adjective" },
  { id: 4, name: "Phrase" },
  { id: 6, name: "Noun" },
  { id: 7, name: "Interjection" },
];

type Props = {
  onClose: () => void;
};

export default function TermCreateModal({ onClose }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [termText, setTermText] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [priority, setPriority] = useState("0");
  const [termTypeId, setTermTypeId] = useState("");

  const isValid =
    termText.trim() !== "" &&
    definition.trim() !== "" &&
    example.trim() !== "" &&
    termTypeId !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    startTransition(async () => {
      await createTerm({
        term: termText.trim(),
        definition: definition.trim(),
        example: example.trim(),
        priority: parseInt(priority, 10) || 0,
        term_type_id: termTypeId !== "" ? parseInt(termTypeId, 10) : null,
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
          <h3 className="text-[#e8d5a3] text-lg font-semibold">Add Term</h3>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-[#e8d5a3]/40 hover:text-[#e8d5a3] transition-colors text-lg leading-none cursor-pointer disabled:opacity-30"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
          {/* Term — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Term <span className="text-[#ec6d70]">*</span>
            </label>
            <input
              type="text"
              value={termText}
              onChange={(e) => setTermText(e.target.value)}
              disabled={isPending}
              className={inputClass}
              placeholder="Enter term..."
            />
          </div>

          {/* Definition — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Definition <span className="text-[#ec6d70]">*</span>
            </label>
            <textarea
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              disabled={isPending}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Define the term..."
            />
          </div>

          {/* Example — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Example <span className="text-[#ec6d70]">*</span>
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              disabled={isPending}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Provide an example..."
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

          {/* Term Type — required */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#e8d5a3]/50 text-xs uppercase tracking-widest">
              Term Type <span className="text-[#ec6d70]">*</span>
            </label>
            <select
              value={termTypeId}
              onChange={(e) => setTermTypeId(e.target.value)}
              disabled={isPending}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">— None —</option>
              {TERM_TYPES.map((t) => (
                <option key={t.id} value={String(t.id)}>
                  {t.name}
                </option>
              ))}
            </select>
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
