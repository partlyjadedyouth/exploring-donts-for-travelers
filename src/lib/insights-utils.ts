import { Insight } from "@/content/insights";
import { Filters } from "./aggregate";

const matchesIfSet = (value: string | undefined, needles?: string[]) =>
  !needles || needles.length === 0 ? Boolean(value) : Boolean(value && needles.includes(value));

export const insightMatches = (insight: Insight, filters: Filters) => {
  if (!insight.conditions) return true;
  const c = insight.conditions;
  if (c.city && !matchesIfSet(filters.city, c.city)) return false;
  if (c.activity_category && !matchesIfSet(filters.activityCategory, c.activity_category))
    return false;
  if (c.reason_category && !matchesIfSet(filters.reasonCategory, c.reason_category)) return false;
  if (c.video_title && c.video_title.length === 0 && !filters.videoTitle) return false;
  if (c.video_title && c.video_title.length > 0) {
    if (!filters.videoTitle || !c.video_title.includes(filters.videoTitle)) return false;
  }
  return true;
};
