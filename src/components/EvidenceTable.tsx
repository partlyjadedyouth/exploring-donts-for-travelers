"use client";

import { DontRow } from "@/lib/aggregate";

type Props = {
  rows: DontRow[];
};

export default function EvidenceTable({ rows }: Props) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Evidence rows</p>
          <p className="text-xs text-neutral-500">Pulled from the selected heatmap cell.</p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Snapshot
        </span>
      </div>
      <div className="overflow-hidden rounded-2xl border border-neutral-100">
        <table className="min-w-full divide-y divide-neutral-100 text-sm">
          <thead className="bg-neutral-50/80 text-xs text-neutral-500">
            <tr>
              <th className="px-3 py-2 text-left font-semibold">City</th>
              <th className="px-3 py-2 text-left font-semibold">Activity</th>
              <th className="px-3 py-2 text-left font-semibold">Reason</th>
              <th className="px-3 py-2 text-left font-semibold">Video</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-indigo-50">
                <td className="px-3 py-2 align-top text-neutral-900">
                  <div className="text-sm font-semibold text-neutral-900">{row.city}</div>
                  <div className="text-[11px] text-neutral-500">{row.activitySimple}</div>
                </td>
                <td className="px-3 py-2 align-top text-neutral-800">
                  <div className="font-medium text-neutral-900">{row.activity}</div>
                  <div className="text-[11px] text-neutral-500">{row.reasonSimple}</div>
                </td>
                <td className="px-3 py-2 align-top text-neutral-700">{row.reason}</td>
                <td className="px-3 py-2 align-top text-neutral-600">{row.videoTitle}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-4 text-center text-sm text-neutral-500"
                >
                  No evidence rows for this slice.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
