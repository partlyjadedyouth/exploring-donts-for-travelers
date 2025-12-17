"use client";

import { Matrix } from "@/lib/aggregate";

type Props = {
  matrix: Matrix;
  active: { activityCategory?: string; reasonCategory?: string };
  selected?: { activityCategory: string; reasonCategory: string } | null;
  onSelect: (activityCategory: string, reason: string) => void;
};

const colorFor = (count: number, max: number, active: boolean) => {
  const pct = count / max;
  const base = Math.max(0.1, pct);
  const alpha = active ? 0.8 : 0.6;
  return `rgba(99, 102, 241, ${base * alpha})`;
};

export default function CityReasonHeatmap({
  matrix,
  active,
  selected,
  onSelect,
}: Props) {
  const { cities, reasonCategories, max, cells } = matrix;

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Heatmap</p>
          {/* <p className="text-xs text-neutral-500">Quick pulse of which reasons dominate per city.</p> */}
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Click a cell
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-xs">
          <thead>
            <tr>
              <th className="w-32 px-2 py-2 text-left text-neutral-500">
                What \ Why
              </th>
              {reasonCategories.map((reason) => (
                <th
                  key={reason}
                  className="px-2 py-2 text-center text-neutral-500"
                >
                  {reason}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((activity) => (
              <tr key={activity}>
                <td className="px-2 py-2 text-sm font-semibold text-neutral-800">
                  {activity}
                </td>
                {reasonCategories.map((reason) => {
                  const count = cells[activity]?.[reason] ?? 0;
                  const isActive =
                    (!active.activityCategory ||
                      active.activityCategory === activity) &&
                    (!active.reasonCategory ||
                      active.reasonCategory === reason);
                  const isSelected =
                    selected?.activityCategory === activity &&
                    selected?.reasonCategory === reason;
                  return (
                    <td
                      key={`${activity}-${reason}`}
                      className="px-2 py-1 text-center"
                    >
                      <button
                        onClick={() => onSelect(activity, reason)}
                        className={`flex h-10 w-full items-center justify-center rounded-xl border text-[11px] font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:shadow-sm ${
                          isSelected
                            ? "border-indigo-600 ring-2 ring-indigo-300"
                            : "border-neutral-100"
                        }`}
                        style={{
                          backgroundColor:
                            count === 0
                              ? "#f8fafc"
                              : colorFor(count, max, isActive),
                        }}
                        title={`${activity} × ${reason}: ${count}`}
                      >
                        {count}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
            {cities.length === 0 && (
              <tr>
                <td
                  colSpan={reasonCategories.length + 1}
                  className="px-3 py-4 text-center text-sm text-neutral-500"
                >
                  No data for this slice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
