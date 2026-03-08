"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { ChartDataPoint } from "./CaptionsCreatedChart";

type TimeRange = "4W" | "9W" | "6M";

const RANGE_SLICES: Record<TimeRange, number> = { "4W": 4, "9W": 9, "6M": 26 };

type Props = {
  data: ChartDataPoint[];
};

function formatYAxis(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  return value.toString();
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0b1e30] border border-[#3ac586]/30 rounded-lg px-3 py-2 font-[family-name:var(--font-pixelify-sans)]">
      <p className="text-[#e8d5a3]/50 text-xs">{label}</p>
      <p className="text-[#3ac586] text-sm font-semibold">
        {payload[0].value.toLocaleString()} images
      </p>
    </div>
  );
}

export default function ImagesUploadedChart({ data }: Props) {
  const [range, setRange] = useState<TimeRange>("9W");
  const visibleData = data.slice(-RANGE_SLICES[range]);

  return (
    <div className="bg-[#0f2236] rounded-lg shadow-lg p-6 flex flex-col gap-4 font-[family-name:var(--font-pixelify-sans)]">
      <div className="flex items-center justify-between">
        <span className="text-[#e8d5a3]/60 text-sm uppercase tracking-widest">
          Images Uploaded Over Time
        </span>
        <div className="flex gap-1">
          {(["4W", "9W", "6M"] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
                range === r
                  ? "bg-[#3ac586] text-white"
                  : "text-[#e8d5a3]/40 hover:text-[#e8d5a3]/70 border border-[#3ac586]/20 hover:border-[#3ac586]/40"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={visibleData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="imageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3ac586" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3ac586" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3ac586" strokeOpacity={0.1} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#e8d5a3", opacity: 0.4, fontSize: 11, fontFamily: "var(--font-pixelify-sans)" }}
            axisLine={{ stroke: "#3ac586", strokeOpacity: 0.2 }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: "#e8d5a3", opacity: 0.4, fontSize: 11, fontFamily: "var(--font-pixelify-sans)" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#3ac586", fillOpacity: 0.05 }} />
          <Bar dataKey="count" fill="url(#imageFill)" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
