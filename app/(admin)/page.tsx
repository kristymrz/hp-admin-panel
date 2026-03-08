import { createClient } from "@/lib/supabase/server";
import StatCard from "@/components/admin/dashboard/StatCard";
import CaptionsCreatedChart, { type ChartDataPoint } from "@/components/admin/dashboard/CaptionsCreatedChart";
import ImagesUploadedChart from "@/components/admin/dashboard/ImagesUploadedChart";
import RecentImagesStrip from "@/components/admin/dashboard/RecentImagesStrip";
import CaptionLeaderboard from "@/components/admin/dashboard/CaptionLeaderboard";

const NUM_WEEKS = 26;

function getWeeklyBuckets(numWeeks: number) {
  const now = new Date();
  return Array.from({ length: numWeeks }, (_, i) => {
    const start = new Date(now);
    start.setDate(start.getDate() - (numWeeks - i) * 7);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setDate(end.getDate() - (numWeeks - i - 1) * 7);
    end.setHours(23, 59, 59, 999);

    const label = start.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return { start, end, label };
  });
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const weekBuckets = getWeeklyBuckets(NUM_WEEKS);

  const [statResults, captionWeekResults, imageWeekResults, recentImagesResult, topCaptionsResult] =
    await Promise.all([
      Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("images").select("*", { count: "exact", head: true }),
        supabase.from("captions").select("*", { count: "exact", head: true }),
        supabase.from("caption_likes").select("*", { count: "exact", head: true }),
      ]),
      Promise.all(
        weekBuckets.map(({ start, end }) =>
          supabase
            .from("captions")
            .select("*", { count: "exact", head: true })
            .gte("created_datetime_utc", start.toISOString())
            .lte("created_datetime_utc", end.toISOString())
        )
      ),
      Promise.all(
        weekBuckets.map(({ start, end }) =>
          supabase
            .from("images")
            .select("*", { count: "exact", head: true })
            .gte("created_datetime_utc", start.toISOString())
            .lte("created_datetime_utc", end.toISOString())
        )
      ),
      supabase
        .from("images")
        .select("id, url")
        .order("created_datetime_utc", { ascending: false })
        .limit(8),
      supabase
        .from("captions")
        .select("id, content, like_count, images!image_id(url)")
        .order("like_count", { ascending: false })
        .limit(12),
    ]);

  // Stat cards
  const [{ count: profileCount }, { count: imageCount }, { count: captionCount }, { count: likesCount }] = statResults;

  const statCards = [
    { title: "Total Profiles",      value: (profileCount ?? 0).toLocaleString(), icon: "👤", accent: "border-[#099ff6]" },
    { title: "Total Images",        value: (imageCount ?? 0).toLocaleString(),   icon: "🖼️",  accent: "border-[#3ac586]" },
    { title: "Total Captions",      value: (captionCount ?? 0).toLocaleString(), icon: "💬", accent: "border-[#f3910c]" },
    { title: "Total Caption Likes", value: (likesCount ?? 0).toLocaleString(),   icon: "❤️",  accent: "border-[#ec6d70]" },
  ];

  // Chart data
  const captionChartData: ChartDataPoint[] = weekBuckets.map(({ label }, i) => ({
    label,
    count: captionWeekResults[i].count ?? 0,
  }));

  const imageChartData: ChartDataPoint[] = weekBuckets.map(({ label }, i) => ({
    label,
    count: imageWeekResults[i].count ?? 0,
  }));

  // Recent images
  const recentImages = recentImagesResult.data ?? [];

  // Top 12 captions by like_count
  const leaderboardEntries = (topCaptionsResult.data ?? []).map((caption) => ({
    id: caption.id,
    content: caption.content ?? null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image_url: (caption.images as any)?.url ?? null,
    score: caption.like_count ?? 0,
  }));

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
        <CaptionsCreatedChart data={captionChartData} />
        <ImagesUploadedChart data={imageChartData} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RecentImagesStrip images={recentImages} />
        <CaptionLeaderboard entries={leaderboardEntries} />
      </div>
    </div>
  );
}
