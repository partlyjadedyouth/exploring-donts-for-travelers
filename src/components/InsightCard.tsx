"use client";

import { Insight, InsightCondition } from "@/content/insights";
import { useState } from "react";

const renderConditions = (conditions?: InsightCondition) => {
  if (!conditions) return "Matches any slice.";
  const parts: string[] = [];
  if (conditions.city?.length) parts.push(`City: ${conditions.city.join(", ")}`);
  if (conditions.activity_simple?.length)
    parts.push(`Activity: ${conditions.activity_simple.join(", ")}`);
  if (conditions.reason_simple?.length)
    parts.push(`Reason: ${conditions.reason_simple.join(", ")}`);
  if (conditions.video_title) parts.push(`Video: ${conditions.video_title.join(", ") || "any"}`);
  return parts.join(" · ");
};

export default function InsightCard({ insight }: { insight: Insight }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="space-y-3 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">{insight.title}</h3>
          <p className="text-sm text-neutral-600">{insight.summary}</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-semibold text-indigo-700">
          P{insight.priority}
        </span>
      </div>
      <p className="text-sm font-medium text-neutral-800">So what? {insight.soWhat}</p>
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          Evidence hints
        </p>
        <ul className="space-y-1 text-sm text-neutral-700">
          {insight.evidenceHints.map((hint) => (
            <li key={hint} className="flex items-start gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span>{hint}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-2xl bg-neutral-50 px-3 py-2 text-left text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100"
      >
        <span>Why am I seeing this?</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="rounded-2xl bg-indigo-50/60 px-3 py-2 text-xs text-neutral-700">
          {renderConditions(insight.conditions)}
        </div>
      )}
    </article>
  );
}
