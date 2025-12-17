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

const groupTags = (tags: string[]) =>
  tags.reduce<Record<string, string[]>>((acc, tag) => {
    const idx = tag.indexOf(":");
    if (idx === -1) return acc;
    const category = tag.slice(0, idx);
    if (!acc[category]) acc[category] = [];
    acc[category].push(tag);
    return acc;
  }, {});

export const insightMatches = (insight: Insight, filterTags: string[]) => {
  const tags = insight.tags ?? [];
  if (tags.length === 0) return true;
  if (filterTags.length === 0) return false;
  const filterByCategory = groupTags(filterTags);
  const insightByCategory = groupTags(tags);
  for (const [category, filterList] of Object.entries(filterByCategory)) {
    if (filterList.length === 0) continue;
    const insightList = insightByCategory[category] ?? [];
    if (insightList.length === 0) return false;
    const hasOverlap = insightList.some((tag) => filterList.includes(tag));
    if (!hasOverlap) return false;
  }
  return true;
};

export const matchedInsightTags = (insight: Insight, filterTags: string[]) => {
  const tags = insight.tags ?? [];
  if (tags.length === 0 || filterTags.length === 0) return [];
  return tags.filter((tag) => filterTags.includes(tag));
};
