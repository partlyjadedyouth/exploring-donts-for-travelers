"use client";

import { useMemo } from "react";

import { CityComposition } from "@/lib/aggregate";
import { colorForLabel } from "@/lib/colors";

type Props = {
  data: CityComposition[];
  reasonOrder: string[];
  active?: string;
  onToggle: (value: string) => void;
  onSelectCity: (value: string) => void;
};

export default function StackedCityReason({
  data,
  reasonOrder,
  active,
  onToggle,
  onSelectCity,
}: Props) {
  const animationKey = useMemo(
    () =>
      data
        .map(
          (row) =>
            `${row.city}:${row.total}:${row.segments
              .map((seg) => `${seg.label}:${seg.count}`)
              .join("|")}`,
        )
        .join("||"),
    [data],
  );

  const legendLabels = useMemo(
    () =>
      reasonOrder.filter((label) =>
        data.some((row) => row.segments.some((seg) => seg.label === label)),
      ),
    [data, reasonOrder],
  );
  const maxTotal = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">
            WHY people don{`'`}t recommend
          </p>
          {/* <p className="text-xs text-neutral-500">100% stacked; click segments to filter.</p> */}
        </div>
        {/* <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Click to filter
        </span> */}
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
        {legendLabels.map((label) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onToggle(label)}
              className={`inline-flex items-center gap-2 text-xs font-medium transition ${
                isActive
                  ? "text-[#0b5c55] underline decoration-2 underline-offset-4"
                  : "text-neutral-700 hover:text-[#0b5c55] hover:underline hover:underline-offset-4"
              }`}
              style={{ cursor: "pointer", background: "transparent", border: "none", padding: 0 }}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colorForLabel(label) }}
              />
              <span>{label}</span>
            </button>
          );
        })}
        {legendLabels.length === 0 && (
          <span className="text-neutral-400">No segments to display.</span>
        )}
      </div>
      <div key={animationKey} className="space-y-3">
        {data.map((row) => (
          <div key={row.city} className="space-y-2">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <button
                className="cursor-pointer font-semibold text-neutral-800 hover:text-indigo-600"
                onClick={() => onSelectCity(row.city)}
              >
                {row.city}
              </button>
              <span>
                {row.total} {row.total == 1 ? "reason" : "reasons"}
              </span>
            </div>
            <div
              className="relative flex origin-left overflow-visible rounded-full bg-neutral-50 ring-1 ring-neutral-100"
              style={{
                width: `${Math.max((row.total / maxTotal) * 100, 20)}%`,
                animation: "bar-grow 650ms ease forwards",
              }}
            >
              {reasonOrder
                .map((label) => row.segments.find((seg) => seg.label === label))
                .filter(
                  (seg): seg is (typeof row.segments)[number] => Boolean(seg),
                )
                .map((segment, idx, ordered) => {
                  const pctWidth = Math.max(segment.pct, 4);
                  const isActive = active === segment.label;
                  const color = colorForLabel(segment.label);
                  const isFirst = idx === 0;
                  const isLast = idx === ordered.length - 1;
                  const tooltipPositionClass = isFirst
                    ? "left-1 translate-x-0"
                    : isLast
                      ? "right-1 translate-x-0"
                      : "left-1/2 -translate-x-1/2";
                  return (
                    <button
                      key={segment.label}
                      style={{
                        width: `${pctWidth}%`,
                        backgroundColor: color,
                        borderTopLeftRadius: isFirst ? 999 : 0,
                        borderBottomLeftRadius: isFirst ? 999 : 0,
                        borderTopRightRadius: isLast ? 999 : 0,
                        borderBottomRightRadius: isLast ? 999 : 0,
                      }}
                      className={`group relative z-0 flex origin-left cursor-pointer items-center justify-center px-2 py-3 text-[11px] font-semibold text-white transition-all duration-500 ease-out ${
                        isActive
                          ? "brightness-110 ring-2 ring-white hover:shadow-[0_0_0_4px_rgba(59,130,246,0.75)] hover:z-10"
                          : "hover:brightness-110 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.75)] hover:z-10"
                      }`}
                      onClick={() => onToggle(segment.label)}
                      aria-label={`${segment.label} (${segment.count}, ${segment.pct}%)`}
                    >
                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
                      <div
                        className={`pointer-events-none absolute -top-12 hidden max-w-60 flex-col rounded-xl bg-black/80 px-2 py-1 text-[11px] text-white shadow-sm group-hover:flex group-hover:opacity-100 group-hover:z-30 ${tooltipPositionClass}`}
                      >
                        <span className="font-semibold leading-tight">
                          {segment.label}
                        </span>
                        <span className="leading-tight">
                          {segment.count}{" "}
                          {segment.count == 1 ? "reason" : "reasons"} ·{" "}
                          {segment.pct}%
                        </span>
                      </div>
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
