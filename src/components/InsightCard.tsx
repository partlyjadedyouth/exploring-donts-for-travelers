"use client";

import { Insight } from "@/content/insights";

const renderTags = (tags: string[]) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700"
      >
        {tag}
      </span>
    ))}
  </div>
);

export default function InsightCard({
  insight,
  matchedTags,
}: {
  insight: Insight;
  matchedTags: string[];
}) {
  return (
    <article className="space-y-3 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">{insight.title}</h3>
          <p className="text-sm text-neutral-600">{insight.summary}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">Quotes</p>
        <ul className="space-y-1 text-sm text-neutral-700">
          {insight.quotes.map((quote) => (
            <li key={quote} className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>{quote}</span>
            </li>
          ))}
        </ul>
      </div>
      {insight.tags && insight.tags.length > 0 && (
        <div className="rounded-2xl bg-indigo-50/60 px-3 py-2 text-xs text-neutral-700">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              Matched tags
            </p>
            {matchedTags.length > 0 ? (
              renderTags(matchedTags)
            ) : (
              <p className="text-xs text-neutral-600">No active tags match yet.</p>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
