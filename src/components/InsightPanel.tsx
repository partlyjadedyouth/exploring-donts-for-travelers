"use client";

import { buildFilterTags, insightMatches, matchedInsightTags } from "@/lib/insights-utils";
import { Filters } from "@/lib/aggregate";
import { insights } from "@/content/insights";
import InsightCard from "./InsightCard";
import { useMemo } from "react";

type Props = {
  filters: Filters;
};

export default function InsightPanel({ filters }: Props) {
  const filterTags = useMemo(() => buildFilterTags(filters), [filters]);
  const matches = useMemo(
    () =>
      insights
        .map((insight) => ({
          insight,
          matchedTags: matchedInsightTags(insight, filterTags),
        }))
        .filter(({ insight }) => insightMatches(insight, filterTags)),
    [filterTags],
  );

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
    </aside>
  );
}
