type StatCardProps = {
  title: string;
  value: string | number;
  icon?: string;
  accent: string; // Tailwind border color class e.g. "border-[#099ff6]"
};

export default function StatCard({ title, value, icon, accent }: StatCardProps) {
  return (
    <div
      className={`bg-[#0f2236] border-t-4 ${accent} rounded-lg shadow-lg p-6 flex flex-col gap-3`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[#e8d5a3]/60 text-sm uppercase tracking-widest">
          {title}
        </span>
        {icon && <span className="text-2xl opacity-50">{icon}</span>}
      </div>
      <div className="text-[#e8d5a3] text-4xl font-semibold font-[family-name:var(--font-pixelify-sans)]">
        {value}
      </div>
    </div>
  );
}
