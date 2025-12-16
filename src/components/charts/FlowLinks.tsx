"use client";

import { LinkStat } from "@/lib/aggregate";

type Props = {
  links: LinkStat[];
  onSelect: (activity: string, reason: string) => void;
  active: { activities: string[]; reasons: string[] };
};

export default function FlowLinks({ links, onSelect, active }: Props) {
  const max = Math.max(...links.map((l) => l.count), 1);

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900">Top Activity → Reason links</p>
          <p className="text-xs text-neutral-500">
            Lightweight flow view; click a bar to set both filters.
          </p>
        </div>
        <span className="rounded-full bg-neutral-100 px-2 py-1 text-[11px] text-neutral-600">
          Click to filter
        </span>
      </div>
      <div className="space-y-2">
        {links.map((link) => {
          const width = Math.max((link.count / max) * 100, 8);
          const selected =
            active.activities.includes(link.activity) && active.reasons.includes(link.reason);
          return (
            <button
              key={`${link.activity}-${link.reason}`}
              onClick={() => onSelect(link.activity, link.reason)}
              className="group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-r from-indigo-50 via-white to-white px-3 py-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="relative h-10 flex-1 rounded-xl bg-neutral-100">
                <div
                  className={`absolute left-0 top-0 h-full rounded-xl transition ${
                    selected ? "bg-indigo-500" : "bg-indigo-300 group-hover:bg-indigo-400"
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <div className="flex min-w-[200px] flex-col">
                <span className="text-sm font-semibold text-neutral-900">
                  {link.activity} → {link.reason}
                </span>
                <span className="text-xs text-neutral-500">{link.count} mentions</span>
              </div>
            </button>
          );
        })}
        {links.length === 0 && (
          <div className="rounded-2xl bg-neutral-50 px-4 py-6 text-sm text-neutral-500">
            No links available for this slice.
          </div>
        )}
      </div>
    </div>
  );
}
