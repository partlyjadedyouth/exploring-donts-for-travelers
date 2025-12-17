/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Filters } from "@/lib/aggregate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Selection =
  | { type: "city" | "activity_label" | "reason_label" | "video_title"; value: string }
  | { type: "link"; value: string }
  | null;

const emptyFilters: Filters = {
  city: undefined,
  activityLabel: undefined,
  reasonLabel: undefined,
  videoTitle: undefined,
};

const filtersEqual = (a: Filters, b: Filters) =>
  a.city === b.city &&
  a.activityLabel === b.activityLabel &&
  a.reasonLabel === b.reasonLabel &&
  a.videoTitle === b.videoTitle;

const parseFiltersFromSearch = (params: URLSearchParams): Filters => {
  return {
    city: params.get("city") || undefined,
    activityLabel: params.get("activity") || undefined,
    reasonLabel: params.get("reason") || undefined,
    videoTitle: params.get("video") || undefined,
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", filters.city);
  if (filters.activityLabel) params.set("activity", filters.activityLabel);
  if (filters.reasonLabel) params.set("reason", filters.reasonLabel);
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
    field: "city" | "activityLabel" | "reasonLabel",
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
        prev.activityLabel === activity && prev.reasonLabel === reason;
      return {
        ...prev,
        activityLabel: hasBoth ? undefined : activity,
        reasonLabel: hasBoth ? undefined : reason,
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
