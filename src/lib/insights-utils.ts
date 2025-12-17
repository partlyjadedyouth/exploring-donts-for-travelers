import { Insight } from "@/content/insights";
import { Filters } from "./aggregate";

export const buildFilterTags = (filters: Filters) => {
  const tags: string[] = [];
  if (filters.city && filters.city.length > 0) {
    tags.push("city:any");
    filters.city.forEach((city) => tags.push(`city:${city}`));
  }
  if (filters.activityLabel) {
    tags.push("activity:any");
    tags.push(`activity:${filters.activityLabel}`);
  }
  if (filters.reasonLabel) {
    tags.push("reason:any");
    tags.push(`reason:${filters.reasonLabel}`);
  }
  if (filters.videoTitle) {
    tags.push("video:any");
    tags.push(`video:${filters.videoTitle}`);
  }
  return tags;
};

export const insightMatches = (insight: Insight, filterTags: string[]) => {
  const tags = insight.tags ?? [];
  if (tags.length === 0) return true;
  if (filterTags.length === 0) return false;
  return tags.some((tag) => filterTags.includes(tag));
};

export const matchedInsightTags = (insight: Insight, filterTags: string[]) => {
  const tags = insight.tags ?? [];
  if (tags.length === 0 || filterTags.length === 0) return [];
  return tags.filter((tag) => filterTags.includes(tag));
};
