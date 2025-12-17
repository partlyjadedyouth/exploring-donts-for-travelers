"use client";

import { Matrix } from "@/lib/aggregate";

type Props = {
  matrix: Matrix;
  active: { cities: string[]; reasons: string[] };
  selected?: { city: string; reason: string } | null;
  onSelect: (city: string, reason: string) => void;
};

const colorFor = (count: number, max: number, active: boolean) => {
  const pct = count / max;
  const base = Math.max(0.1, pct);
  const alpha = active ? 0.8 : 0.6;
  return `rgba(99, 102, 241, ${base * alpha})`;
};

export default function CityReasonHeatmap({ matrix, active, selected, onSelect }: Props) {
  const { cities, reasons, max, cells } = matrix;

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">City × Reason heatmap</p>
          <p className="text-xs text-neutral-500">Quick pulse of which reasons dominate per city.</p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Click a cell
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-neutral-500">City</th>
              {reasons.map((reason) => (
                <th key={reason} className="px-2 py-2 text-center text-neutral-500">
                  {reason}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city}>
                <td className="px-2 py-2 text-sm font-semibold text-neutral-800">{city}</td>
                {reasons.map((reason) => {
                  const count = cells[city]?.[reason] ?? 0;
                  const isActive =
                    (active.cities.length === 0 || active.cities.includes(city)) &&
                    (active.reasons.length === 0 || active.reasons.includes(reason));
                  const isSelected =
                    selected?.city === city && selected?.reason === reason;
                  return (
                    <td key={`${city}-${reason}`} className="px-2 py-1 text-center">
                      <button
                        onClick={() => onSelect(city, reason)}
                        className={`flex h-10 w-full items-center justify-center rounded-xl border text-[11px] font-semibold text-neutral-700 transition hover:-translate-y-0.5 hover:shadow-sm ${
                          isSelected ? "border-indigo-600 ring-2 ring-indigo-300" : "border-neutral-100"
                        }`}
                        style={{
                          backgroundColor: count === 0 ? "#f8fafc" : colorFor(count, max, isActive),
                        }}
                        title={`${city} × ${reason}: ${count}`}
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
                  colSpan={reasons.length + 1}
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
