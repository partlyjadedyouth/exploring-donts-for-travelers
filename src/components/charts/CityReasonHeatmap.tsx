"use client";

import { Matrix } from "@/lib/aggregate";

type Props = {
  matrix: Matrix;
  active: { activityLabel?: string; reasonLabel?: string };
};

const colorFor = (count: number, max: number, active: boolean) => {
  const pct = count / max;
  const eased = Math.pow(pct, 0.7);
  const base = Math.max(0.2, eased);
  const alpha = active ? 0.95 : 0.75;
  return `rgba(99, 102, 241, ${base * alpha})`;
};

export default function CityReasonHeatmap({
  matrix,
  active,
}: Props) {
  const { activityLabels, reasonLabels, max, cells } = matrix;

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Heatmap</p>
          {/* <p className="text-xs text-neutral-500">Quick pulse of which reasons dominate per city.</p> */}
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Highlights follow filters
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-xs">
          <thead>
            <tr>
              <th className="w-32 px-2 py-2 text-left text-neutral-500">
                What \ Why
              </th>
              {reasonLabels.map((reason) => (
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
            {activityLabels.map((activity) => (
              <tr key={activity}>
                <td className="px-2 py-2 text-sm font-semibold text-neutral-800">
                  {activity}
                </td>
                {reasonLabels.map((reason) => {
                  const count = cells[activity]?.[reason] ?? 0;
                  const hasFilter = Boolean(active.activityLabel || active.reasonLabel);
                  const isActive =
                    hasFilter &&
                    (!active.activityLabel || active.activityLabel === activity) &&
                    (!active.reasonLabel || active.reasonLabel === reason);
                  return (
                    <td
                      key={`${activity}-${reason}`}
                      className="px-2 py-1 text-center"
                    >
                      <div
                        className={`flex h-12 w-full items-center justify-center rounded-xl border text-base font-semibold text-neutral-900 transition ${
                          isActive
                            ? "border-2 border-indigo-700 ring-4 ring-indigo-400 shadow-[0_0_12px_rgba(79,70,229,0.45)]"
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
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {activityLabels.length === 0 && (
              <tr>
                <td
                  colSpan={reasonLabels.length + 1}
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
