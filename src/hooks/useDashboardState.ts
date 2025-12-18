"use client";

import { useMemo } from "react";
import { Filters, normalizeCity } from "@/lib/aggregate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Reads filters from the current query string and normalizes values.
 * Supports multi-select cities and single-select activity/reason/video.
 */
const parseFiltersFromSearch = (params: URLSearchParams): Filters => {
  const cityParam = params.get("city");
  const cities = cityParam
    ? cityParam
        .split(",")
        .map((value) => normalizeCity(value.trim()))
        .filter(Boolean)
    : undefined;
  return {
    city: cities && cities.length > 0 ? cities : undefined,
    activityLabel: params.get("activity") || undefined,
    reasonLabel: params.get("reason") || undefined,
    videoTitle: params.get("video") || undefined,
  };
};

/**
 * Serializes filter state back to a query string so URLs stay shareable/bookmarkable.
 */
const toQueryString = (filters: Filters) => {
  const params = new URLSearchParams();
  if (filters.city && filters.city.length > 0) {
    params.set(
      "city",
      filters.city.map((city) => normalizeCity(city)).join(","),
    );
  }
  if (filters.activityLabel) params.set("activity", filters.activityLabel);
  if (filters.reasonLabel) params.set("reason", filters.reasonLabel);
  if (filters.videoTitle) params.set("video", filters.videoTitle);
  return params.toString();
};

/**
 * Keeps filter state in sync with the URL and exposes helpers for toggling values.
 * City supports multiple selections; the rest behave like radio buttons.
 */
export function useDashboardState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo(
    () => parseFiltersFromSearch(searchParams),
    [searchParams],
  );

  const toggleValue = (
    field: "city" | "activityLabel" | "reasonLabel",
    value: string,
  ) => {
    if (field === "city") {
      const current = filters.city ?? [];
      const next = current.includes(value)
        ? current.filter((city) => city !== value)
        : [...current, value];
      const nextFilters = { ...filters, city: next.length > 0 ? next : undefined };
      const qs = toQueryString(nextFilters);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      return;
    }
    const nextValue = filters[field] === value ? undefined : value;
    const nextFilters = { ...filters, [field]: nextValue };
    const qs = toQueryString(nextFilters);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  return {
    filters,
    toggleValue,
    resetFilters,
  };
}
