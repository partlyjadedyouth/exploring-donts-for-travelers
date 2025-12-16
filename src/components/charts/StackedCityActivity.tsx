"use client";

import { CityComposition } from "@/lib/aggregate";

type Props = {
  data: CityComposition[];
  active: string[];
  onToggle: (value: string) => void;
  onSelectCity: (value: string) => void;
};

const colors = ["#4f46e5", "#0ea5e9", "#f97316", "#22c55e", "#a855f7", "#ec4899", "#facc15"];

export default function StackedCityActivity({
  data,
  active,
  onToggle,
  onSelectCity,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">City × Activity</p>
          <p className="text-xs text-neutral-500">100% stacked; click segments to filter.</p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Click to filter
        </span>
      </div>
      <div className="space-y-3">
        {data.map((row) => (
          <div key={row.city} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <button
                className="font-semibold text-neutral-800 hover:text-indigo-600"
                onClick={() => onSelectCity(row.city)}
              >
                {row.city}
              </button>
              <span>{row.total} rows</span>
            </div>
            <div className="flex overflow-hidden rounded-2xl bg-neutral-50 ring-1 ring-neutral-100">
              {row.segments.map((seg, idx) => {
                const pctWidth = Math.max(seg.pct, 4);
                const isActive = active.includes(seg.label);
                return (
                  <button
                    key={seg.label}
                    style={{ width: `${pctWidth}%`, backgroundColor: colors[idx % colors.length] }}
                    className={`group relative flex items-center justify-center px-2 py-3 text-[11px] font-semibold text-white transition duration-200 ${
                      isActive ? "brightness-110 ring-2 ring-white" : "hover:brightness-110"
                    }`}
                    onClick={() => onToggle(seg.label)}
                    title={`${seg.label} (${seg.count})`}
                  >
                    <span className="drop-shadow-sm">{seg.label}</span>
                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="rounded-2xl bg-neutral-50 px-4 py-6 text-sm text-neutral-500">
            No rows for this selection.
          </div>
        )}
      </div>
    </div>
  );
}
