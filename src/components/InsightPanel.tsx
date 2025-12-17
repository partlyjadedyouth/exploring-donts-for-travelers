"use client";

import { buildFilterTags, insightMatches, matchedInsightTags } from "@/lib/insights-utils";
import { Filters } from "@/lib/aggregate";
import { insights } from "@/content/insights";
import InsightCard from "./InsightCard";
import { useMemo, useState } from "react";

type Props = {
  filters: Filters;
};

export default function InsightPanel({ filters }: Props) {
  const [tab, setTab] = useState<"rows" | "quotes" | "shots">("rows");
  const filterTags = useMemo(() => buildFilterTags(filters), [filters]);
  const matches = useMemo(
    () =>
      insights
        .map((insight) => ({
          insight,
          matchedTags: matchedInsightTags(insight, filterTags),
        }))
        .filter(({ insight }) => insightMatches(insight, filterTags))
        .sort((a, b) => a.insight.priority - b.insight.priority),
    [filterTags],
  );

  const placeholder =
    tab === "rows"
      ? "Pinned rows show up above the evidence table on the left."
      : tab === "quotes"
        ? "Quotes workspace coming soon."
        : "Screenshot dropspace coming soon.";

  return (
    <aside className="flex h-full min-h-[260px] flex-col gap-4 rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-neutral-100 backdrop-blur">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Insights</p>
          <span className="text-[11px] text-neutral-400">auto-matched</span>
        </div>
        {matches.length === 0 && (
          <div className="rounded-2xl bg-neutral-50 px-3 py-3 text-sm text-neutral-500">
            No matching insights yet. Add a filter to trigger rule cards.
          </div>
        )}
        <div className="space-y-3">
          {matches.map(({ insight, matchedTags }) => (
            <InsightCard key={insight.id} insight={insight} matchedTags={matchedTags} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Evidence</p>
          <span className="text-[11px] text-neutral-400">pinned first</span>
        </div>
        <div className="flex overflow-hidden rounded-2xl border border-neutral-100">
          {[
            { id: "rows", label: "Rows" },
            { id: "quotes", label: "Quotes" },
            { id: "shots", label: "Screenshots" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`flex-1 px-3 py-2 text-xs font-semibold transition ${
                tab === t.id ? "bg-indigo-50 text-indigo-700" : "text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-2xl bg-neutral-50 px-3 py-4 text-sm text-neutral-600">
          {placeholder}
        </div>
      </div>
    </aside>
  );
}
