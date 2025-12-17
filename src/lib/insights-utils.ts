import { Insight } from "@/content/insights";
import { Filters } from "./aggregate";

const matchesIfSet = (value: string | string[] | undefined, needles?: string[]) => {
  if (!needles || needles.length === 0) {
    if (!value) return false;
    return Array.isArray(value) ? value.length > 0 : true;
  }
  if (!value) return false;
  if (Array.isArray(value)) return value.some((entry) => needles.includes(entry));
  return needles.includes(value);
};

export const insightMatches = (insight: Insight, filters: Filters) => {
  if (!insight.conditions) return true;
  const c = insight.conditions;
  if (c.city && !matchesIfSet(filters.city, c.city)) return false;
  if (c.activity_label && !matchesIfSet(filters.activityLabel, c.activity_label))
    return false;
  if (c.reason_label && !matchesIfSet(filters.reasonLabel, c.reason_label)) return false;
  if (c.video_title && c.video_title.length === 0 && !filters.videoTitle) return false;
  if (c.video_title && c.video_title.length > 0) {
    if (!filters.videoTitle || !c.video_title.includes(filters.videoTitle)) return false;
  }
  return true;
};
