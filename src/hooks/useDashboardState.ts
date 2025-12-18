"use client";

import { useEffect, useState } from "react";
import { Filters, normalizeCity } from "@/lib/aggregate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

export function useDashboardState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<Filters>(() =>
    parseFiltersFromSearch(searchParams),
  );

  useEffect(() => {
    const next = parseFiltersFromSearch(searchParams);
    setFilters((prev) => (filtersEqual(prev, next) ? prev : next));
  }, [searchParams]);

  useEffect(() => {
    const qs = toQueryString(filters);
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, pathname, router]);

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

  const resetFilters = () => setFilters(emptyFilters);

  return {
    filters,
    toggleValue,
    resetFilters,
  };
}
