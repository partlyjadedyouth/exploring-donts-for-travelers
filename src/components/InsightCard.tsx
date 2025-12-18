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
}: {
  insight: Insight;
}) {
  const tags = insight.tags ?? [];

  return (
    <article className="space-y-3 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">
            {insight.title}
          </h3>
          <p className="text-sm text-neutral-600">{insight.summary}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          Quotes
        </p>
        <ul className="space-y-2 text-sm text-neutral-700">
          {insight.quotes.map((item) => (
            <li
              key={`${insight.id}-${item.videoId}-${item.quote.slice(0, 12)}`}
              className="relative overflow-hidden rounded-2xl bg-neutral-50 px-4 py-3 shadow-inner"
            >
              <span className="absolute left-3 top-1 text-4xl font-serif leading-none text-indigo-200">
                "
              </span>
              <p className="relative pl-6 pr-2 text-[15px] font-medium text-neutral-900">
                {item.quote}
              </p>
              <a
                href={`https://www.youtube.com/shorts/${item.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-600 hover:text-indigo-700"
              >
                Watch clip
                <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {tags.length > 0 && (
        <div className="rounded-2xl bg-indigo-50/60 px-3 py-2 text-xs text-neutral-700">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
              Tags
            </p>
            {renderTags(tags)}
          </div>
        </div>
      )}
    </article>
  );
}
