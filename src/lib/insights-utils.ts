import { Insight } from "@/content/insights";
import { Filters } from "./aggregate";

const normalizeTag = (tag: string) => {
  const idx = tag.indexOf(":");
  if (idx === -1) return tag.toLowerCase();
  const category = tag.slice(0, idx).toLowerCase();
  const value = tag.slice(idx + 1);
  return `${category}:${value}`;
};

/**
 * Builds a list of normalized tags representing the active filters.
 * Each category includes an `any` tag to denote that category is in play.
 */
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
    const category = tag.slice(0, idx).toLowerCase();
    if (!acc[category]) acc[category] = [];
    acc[category].push(tag);
    return acc;
  }, {});

/**
 * Determines whether an insight's tag set satisfies all active filter categories.
 * A category must have at least one overlapping tag to count as a match.
 */
export const insightMatches = (insight: Insight, filterTags: string[]) => {
  const tags = (insight.tags ?? []).map(normalizeTag);
  const normalizedFilters = filterTags.map(normalizeTag);
  if (tags.length === 0) return true;
  if (normalizedFilters.length === 0) return false;
  const filterByCategory = groupTags(normalizedFilters);
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

/**
 * Returns the subset of an insight's tags that are currently matched by filters.
 * Used to highlight which rule(s) triggered the surfaced card.
 */
export const matchedInsightTags = (insight: Insight, filterTags: string[]) => {
  const tags = insight.tags ?? [];
  if (tags.length === 0 || filterTags.length === 0) return [];
  const normalizedFilters = new Set(filterTags.map(normalizeTag));
  return tags.filter((tag) => normalizedFilters.has(normalizeTag(tag)));
};
