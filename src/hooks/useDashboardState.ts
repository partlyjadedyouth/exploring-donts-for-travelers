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

const arraysEqual = (a?: string[], b?: string[]) => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
};

const filtersEqual = (a: Filters, b: Filters) =>
  arraysEqual(a.city, b.city) &&
  a.activityLabel === b.activityLabel &&
  a.reasonLabel === b.reasonLabel &&
  a.videoTitle === b.videoTitle;

const parseFiltersFromSearch = (params: URLSearchParams): Filters => {
  const cityParam = params.get("city");
  const cities = cityParam
    ? cityParam
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean)
    : undefined;
  return {
    city: cities && cities.length > 0 ? cities : undefined,
    activityLabel: params.get("activity") || undefined,
    reasonLabel: params.get("reason") || undefined,
    videoTitle: params.get("video") || undefined,
  };
};

const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.city && filters.city.length > 0) {
    params.set("city", filters.city.join(","));
  }
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
    if (field === "city") {
      setFilters((prev) => {
        const current = prev.city ?? [];
        const next = current.includes(value)
          ? current.filter((city) => city !== value)
          : [...current, value];
        return { ...prev, city: next.length > 0 ? next : undefined };
      });
      return;
    }
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
