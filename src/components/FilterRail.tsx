"use client";

import { Filters } from "@/lib/aggregate";

type Props = {
  filters: Filters;
  options: {
    cities: string[];
    activityLabels: string[];
    reasonLabels: string[];
  };
  onToggle: (
    field: "city" | "activityLabel" | "reasonLabel",
    value: string,
  ) => void;
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
  selected?: string | string[];
  onToggle: (value: string) => void;
}) => (
  <div className="space-y-2">
    <div className="text-sm font-semibold text-neutral-800">{label}</div>
    <div className="flex flex-wrap gap-2">
      {values.map((v) => {
        const active = Array.isArray(selected)
          ? selected.includes(v)
          : selected === v;
        return (
          <button
            key={v}
            onClick={() => onToggle(v)}
            className={`cursor-pointer rounded-full border px-3 py-1 text-xs transition ${
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
          <p className="text-xs text-neutral-500">
            Click items in the charts or select from the options below.{" "}
            <b>Multiple cities</b> can be selected, but you can only choose{" "}
            <b>one activity and one reason.</b>
          </p>
        </div>
        <button
          onClick={onReset}
          className="cursor-pointer rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 transition hover:bg-neutral-200 hover:text-neutral-900 hover:shadow-sm"
        >
          Reset
        </button>
      </div>

      <FilterGroup
        label="City"
        values={options.cities}
        selected={filters.city}
        onToggle={(v) => onToggle("city", v)}
      />
      <FilterGroup
        label="Activity"
        values={options.activityLabels}
        selected={filters.activityLabel}
        onToggle={(v) => onToggle("activityLabel", v)}
      />
      <FilterGroup
        label="Reason"
        values={options.reasonLabels}
        selected={filters.reasonLabel}
        onToggle={(v) => onToggle("reasonLabel", v)}
      />
    </aside>
  );
}
