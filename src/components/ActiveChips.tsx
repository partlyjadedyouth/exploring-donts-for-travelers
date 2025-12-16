"use client";

import { Filters } from "@/lib/aggregate";

type Props = {
  filters: Filters;
  onRemove: (field: "cities" | "activities" | "reasons", value: string) => void;
  onVideoClear: () => void;
};

export default function ActiveChips({ filters, onRemove, onVideoClear }: Props) {
  const chips = [
    ...filters.cities.map((v) => ({ field: "cities" as const, label: v })),
    ...filters.activities.map((v) => ({ field: "activities" as const, label: v })),
    ...filters.reasons.map((v) => ({ field: "reasons" as const, label: v })),
  ];

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-neutral-800">Active filters</div>
      <div className="flex flex-wrap gap-2">
        {chips.length === 0 && !filters.videoTitle && (
          <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
            None
          </div>
        )}
        {chips.map((chip) => (
          <button
            key={`${chip.field}-${chip.label}`}
            onClick={() => onRemove(chip.field, chip.label)}
            className="flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 ring-1 ring-indigo-100 transition hover:bg-indigo-100"
          >
            {chip.label} <span className="text-indigo-400">×</span>
          </button>
        ))}
        {filters.videoTitle && (
          <button
            onClick={onVideoClear}
            className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-100 transition hover:bg-amber-100"
          >
            Video: {filters.videoTitle} <span className="text-amber-500">×</span>
          </button>
        )}
      </div>
    </div>
  );
}
