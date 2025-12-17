/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Filters } from "@/lib/aggregate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Selection =
  | { type: "city" | "activity_category" | "reason_category" | "video_title"; value: string }
  | { type: "link"; value: string }
  | null;

const emptyFilters: Filters = {
  city: undefined,
  activityCategory: undefined,
  reasonCategory: undefined,
  videoTitle: undefined,
};

const filtersEqual = (a: Filters, b: Filters) =>
  a.city === b.city &&
  a.activityCategory === b.activityCategory &&
  a.reasonCategory === b.reasonCategory &&
  a.videoTitle === b.videoTitle;

const parseFiltersFromSearch = (params: URLSearchParams): Filters => {
  return {
    city: params.get("city") || undefined,
    activityCategory: params.get("activity") || undefined,
    reasonCategory: params.get("reason") || undefined,
    videoTitle: params.get("video") || undefined,
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", filters.city);
  if (filters.activityCategory) params.set("activity", filters.activityCategory);
  if (filters.reasonCategory) params.set("reason", filters.reasonCategory);
  if (filters.videoTitle) params.set("video", filters.videoTitle);
  return params.toString();
};

export function useDashboardState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialFilters = useMemo(() => parseFiltersFromSearch(searchParams), []);
  const [filters, setFilters] = useState<Filters>(initialFilters || emptyFilters);
  const [selection, setSelection] = useState<Selection>(null);
  const [pinnedRows, setPinnedRows] = useState<string[]>([]);

  useEffect(() => {
    const next = parseFiltersFromSearch(searchParams);
    setFilters((prev) => (filtersEqual(prev, next) ? prev : next));
  }, [searchParams.toString()]);

  useEffect(() => {
    const qs = toQueryString(filters);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters]);

  const toggleValue = (
    field: "city" | "activityCategory" | "reasonCategory",
    value: string,
  ) => {
    setFilters((prev) => {
      const nextValue = prev[field] === value ? undefined : value;
      return { ...prev, [field]: nextValue };
    });
  };

  const setVideo = (videoTitle?: string) =>
    setFilters((prev) => ({ ...prev, videoTitle: videoTitle || undefined }));

  const resetFilters = () => setFilters(emptyFilters);

  const setFiltersDirect = (next: Filters) => setFilters(next);

  const togglePin = (id: string) =>
    setPinnedRows((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );

  const setSelectionWith = (sel: Selection) => setSelection(sel);

  const applyLinkCombo = (activity: string, reason: string) => {
    setFilters((prev) => {
      const hasBoth =
        prev.activityCategory === activity && prev.reasonCategory === reason;
      return {
        ...prev,
        activityCategory: hasBoth ? undefined : activity,
        reasonCategory: hasBoth ? undefined : reason,
      };
    });
    setSelection({ type: "link", value: `${activity} → ${reason}` });
  };

  return {
    filters,
    selection,
    pinnedRows,
    toggleValue,
    resetFilters,
    setFiltersDirect,
    setVideo,
    togglePin,
    setSelection: setSelectionWith,
    applyLinkCombo,
  };
}
