export default function ProfileSearchBar() {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e8d5a3]/30 text-sm pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        placeholder="Search profiles..."
        className="w-full bg-[#0f2236] border border-[#099ff6]/20 rounded-lg pl-9 pr-4 py-2.5 text-sm text-[#e8d5a3] placeholder-[#e8d5a3]/30 font-[family-name:var(--font-pixelify-sans)] outline-none focus:border-[#099ff6]/60 focus:ring-1 focus:ring-[#099ff6]/30 transition-colors"
      />
    </div>
  );
}
