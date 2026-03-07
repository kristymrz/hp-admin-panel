type DashboardChartPlaceholderProps = {
  label: string;
};

export default function DashboardChartPlaceholder({ label }: DashboardChartPlaceholderProps) {
  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <span className="text-[#e8d5a3]/60 text-sm uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-1 min-h-64 border-2 border-dashed border-[#099ff6]/20 rounded-md flex items-center justify-center">
        <span className="text-[#e8d5a3]/30 text-sm font-[family-name:var(--font-pixelify-sans)] tracking-wide">
          Chart coming soon
        </span>
      </div>
    </div>
  );
}
