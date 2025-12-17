"use client";

import { Filters } from "@/lib/aggregate";

type Props = {
  filters: Filters;
  options: { cities: string[]; activities: string[]; reasons: string[]; videos: string[] };
  onToggle: (field: "cities" | "activities" | "reasons", value: string) => void;
  onReset: () => void;
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
  onReset,
}: Props) {
  return (
    <aside className="flex h-fit flex-col gap-6 rounded-3xl bg-white/80 p-4 shadow-sm ring-1 ring-neutral-100 backdrop-blur">
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
        label="Activity"
        values={options.activities}
        selected={filters.activities}
        onToggle={(v) => onToggle("activities", v)}
      />
    </aside>
  );
}
