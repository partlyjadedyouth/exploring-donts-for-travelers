"use client";

import { Filters } from "@/lib/aggregate";
import ActiveChips from "./ActiveChips";

type Props = {
  filters: Filters;
  options: { cities: string[]; activities: string[]; reasons: string[]; videos: string[] };
  onToggle: (field: "cities" | "activities" | "reasons", value: string) => void;
  onVideoSelect: (video?: string) => void;
  onReset: () => void;
  onShare: () => void;
};

const FilterGroup = ({
  label,
  values,
  selected,
  onToggle,
}: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) => (
  <div className="space-y-2">
    <div className="text-sm font-semibold text-neutral-800">{label}</div>
    <div className="flex flex-wrap gap-2">
      {values.map((v) => {
        const active = selected.includes(v);
        return (
          <button
            key={v}
            onClick={() => onToggle(v)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              active
                ? "border-transparent bg-indigo-600 text-white shadow-sm"
                : "border-neutral-200 bg-white text-neutral-700 hover:border-indigo-200 hover:text-indigo-700"
            }`}
          >
            {v}
          </button>
        );
      })}
      {values.length === 0 && (
        <div className="text-xs text-neutral-400">No options yet</div>
      )}
    </div>
  </div>
);

export default function FilterRail({
  filters,
  options,
  onToggle,
  onVideoSelect,
  onReset,
  onShare,
}: Props) {
  return (
    <aside className="sticky top-4 flex h-fit flex-col gap-6 rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-neutral-100 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Filters</p>
          <p className="text-xs text-neutral-500">Click items in charts or pick below.</p>
        </div>
        <button
          onClick={onReset}
          className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200"
        >
          Reset
        </button>
      </div>

      <FilterGroup
        label="City"
        values={options.cities}
        selected={filters.cities}
        onToggle={(v) => onToggle("cities", v)}
      />
      <FilterGroup
        label="Activity"
        values={options.activities}
        selected={filters.activities}
        onToggle={(v) => onToggle("activities", v)}
      />
      <FilterGroup
        label="Reason"
        values={options.reasons}
        selected={filters.reasons}
        onToggle={(v) => onToggle("reasons", v)}
      />

      <div className="space-y-2">
        <div className="text-sm font-semibold text-neutral-800">Video (optional)</div>
        <select
          value={filters.videoTitle || ""}
          onChange={(e) => onVideoSelect(e.target.value || undefined)}
          className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition focus:border-indigo-400"
        >
          <option value="">All videos</option>
          {options.videos.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <ActiveChips filters={filters} onRemove={onToggle} onVideoClear={() => onVideoSelect()} />

      <button
        onClick={onShare}
        className="flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        Share current view
      </button>
    </aside>
  );
}
