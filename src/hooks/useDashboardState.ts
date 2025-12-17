/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Filters } from "@/lib/aggregate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type Selection =
  | { type: "city" | "activity_simple" | "reason_simple" | "video_title"; value: string }
  | { type: "link"; value: string }
  | null;

const emptyFilters: Filters = { cities: [], activities: [], reasons: [], videoTitle: undefined };

const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v) => b.includes(v));

const filtersEqual = (a: Filters, b: Filters) =>
  arraysEqual(a.cities, b.cities) &&
  arraysEqual(a.activities, b.activities) &&
  arraysEqual(a.reasons, b.reasons) &&
  a.videoTitle === b.videoTitle;

const parseFiltersFromSearch = (params: URLSearchParams): Filters => {
  const split = (key: string) =>
    params
      .get(key)
      ?.split(",")
      .filter(Boolean) ?? [];

  return {
    cities: split("city"),
    activities: split("activity"),
    reasons: split("reason"),
    videoTitle: params.get("video") || undefined,
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.cities.length) params.set("city", filters.cities.join(","));
  if (filters.activities.length) params.set("activity", filters.activities.join(","));
  if (filters.reasons.length) params.set("reason", filters.reasons.join(","));
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
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [filters]);

  const toggleValue = (field: "cities" | "activities" | "reasons", value: string) => {
    setFilters((prev) => {
      const set = new Set(prev[field]);
      if (set.has(value)) {
        set.delete(value);
      } else {
        set.add(value);
      }
      return { ...prev, [field]: [...set] };
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
        prev.activities.includes(activity) && prev.reasons.includes(reason);
      return {
        ...prev,
        activities: hasBoth ? prev.activities.filter((a) => a !== activity) : [activity],
        reasons: hasBoth ? prev.reasons.filter((r) => r !== reason) : [reason],
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
