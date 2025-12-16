import { Insight } from "@/content/insights";
import { Filters } from "./aggregate";

const hasAny = (haystack: string[], needles?: string[]) =>
  !needles || needles.length === 0
    ? haystack.length > 0
    : needles.some((n) => haystack.includes(n));

export const insightMatches = (insight: Insight, filters: Filters) => {
  if (!insight.conditions) return true;
  const c = insight.conditions;
  if (c.city && !hasAny(filters.cities, c.city)) return false;
  if (c.activity_simple && !hasAny(filters.activities, c.activity_simple)) return false;
  if (c.reason_simple && !hasAny(filters.reasons, c.reason_simple)) return false;
  if (c.video_title && c.video_title.length === 0 && !filters.videoTitle) return false;
  if (c.video_title && c.video_title.length > 0) {
    if (!filters.videoTitle || !c.video_title.includes(filters.videoTitle)) return false;
  }
  return true;
};
