import StatCard from "@/components/admin/dashboard/StatCard";
import DashboardChartPlaceholder from "@/components/admin/dashboard/DashboardChartPlaceholder";

const statCards = [
  { title: "Total Profiles",      value: "_____", icon: "👤", accent: "border-[#099ff6]" },
  { title: "Total Images",        value: "_____", icon: "🖼️",  accent: "border-[#3ac586]" },
  { title: "Total Captions",      value: "_____", icon: "💬", accent: "border-[#f3910c]" },
  { title: "Total Caption Likes", value: "_____", icon: "❤️",  accent: "border-[#ec6d70]" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-[#e8d5a3] text-2xl font-semibold font-[family-name:var(--font-pixelify-sans)] tracking-wide">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <DashboardChartPlaceholder label="Caption Likes Over Time" />
        <DashboardChartPlaceholder label="Images Uploaded Over Time" />
      </div>
    </div>
  );
}
