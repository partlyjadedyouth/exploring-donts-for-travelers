"use client";

import { useEffect, useMemo, useState } from "react";
import FilterRail from "@/components/FilterRail";
import StackedCityActivity from "@/components/charts/StackedCityActivity";
import StackedCityReason from "@/components/charts/StackedCityReason";
import InsightPanel from "@/components/InsightPanel";
import {
  CityComposition,
  DontRow,
  filterRows,
  uniqueValues,
  cityActivityComposition,
  cityReasonComposition,
  activityReasonMatrix,
} from "@/lib/aggregate";
import { useDashboardState } from "@/hooks/useDashboardState";
import ActivityReasonHeatmap from "@/components/charts/ActivityReasonHeatmap";
import { fallbackRows, parseDontsCsv } from "@/lib/donts-data";

export default function DashboardPage() {
  const [rows, setRows] = useState<DontRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dashboard = useDashboardState();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/donts.csv", { cache: "no-store" });
        if (!res.ok) throw new Error("CSV missing, using fallback data.");
        const txt = await res.text();
        const parsed = parseDontsCsv(txt);
        setRows(parsed);
      } catch (err) {
        console.error(err);
        // lightweight fallback so the UI still works
        setRows(fallbackRows);
        setError(
          "Using fallback sample data because /data/donts.csv could not be loaded.",
        );
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const options = useMemo(() => uniqueValues(rows), [rows]);
  const filteredRows = useMemo(
    () => filterRows(rows, dashboard.filters),
    [rows, dashboard.filters],
  );

  const cityActivity: CityComposition[] = useMemo(
    () => cityActivityComposition(filteredRows, options.activityLabels),
    [filteredRows, options.activityLabels],
  );
  const cityReason: CityComposition[] = useMemo(
    () => cityReasonComposition(filteredRows, options.reasonLabels),
    [filteredRows, options.reasonLabels],
  );
  const heatmapRows = useMemo(() => {
    if (!dashboard.filters.city || dashboard.filters.city.length === 0)
      return rows;
    return rows.filter((row) => dashboard.filters.city?.includes(row.city));
  }, [rows, dashboard.filters.city]);

  const heatmap = useMemo(
    () =>
      activityReasonMatrix(heatmapRows, {
        activityLabels: options.activityLabels,
        reasonLabels: options.reasonLabels,
      }),
    [heatmapRows, options.activityLabels, options.reasonLabels],
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50  to-amber-50 text-neutral-900 lg:h-screen">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:h-screen lg:min-h-0 lg:overflow-hidden">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            ID418 Data Analysis for Designers
          </p>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Exploring DON{`'`}Ts for Travelers
          </h1>
          <p className="text-sm text-neutral-600">
            Click on any chart segment to drive filters. Heatmap highlights
            follow filters.
          </p>
          {error && (
            <p className="text-xs font-semibold text-amber-600">{error}</p>
          )}
        </header>

        <div className="mt-4 flex flex-1 flex-col gap-4 lg:min-h-0 lg:flex-row lg:gap-6 lg:overflow-hidden">
          <aside className="lg:w-[22%] lg:shrink-0 lg:self-start">
            <div className="lg:sticky lg:top-4">
              <FilterRail
                filters={dashboard.filters}
                options={options}
                onToggle={dashboard.toggleValue}
                onReset={dashboard.resetFilters}
              />
            </div>
          </aside>

          <main className="flex flex-col gap-4 lg:min-h-0 lg:flex-1 lg:flex-row lg:overflow-hidden lg:pr-2">
            <section className="flex-1 lg:w-[38%] lg:min-h-0 lg:overflow-y-auto lg:pr-3">
              <InsightPanel filters={dashboard.filters} />
            </section>

            <section className="flex-1 lg:w-[40%] lg:min-h-0 lg:overflow-y-auto lg:pl-3">
              {loading ? (
                <div className="rounded-3xl bg-white/80 p-6 text-center text-sm text-neutral-600 shadow-sm">
                  Loading CSV…
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1">
                    <StackedCityActivity
                      data={cityActivity}
                      activityOrder={options.activityLabels}
                      active={dashboard.filters.activityLabel}
                      onToggle={(v) => {
                        dashboard.toggleValue("activityLabel", v);
                      }}
                      onSelectCity={(v) => {
                        dashboard.toggleValue("city", v);
                      }}
                    />
                    <StackedCityReason
                      data={cityReason}
                      reasonOrder={options.reasonLabels}
                      active={dashboard.filters.reasonLabel}
                      onToggle={(v) => {
                        dashboard.toggleValue("reasonLabel", v);
                      }}
                      onSelectCity={(v) => {
                        dashboard.toggleValue("city", v);
                      }}
                    />
                  </div>

                  <ActivityReasonHeatmap
                    matrix={heatmap}
                    active={{
                      activityLabel: dashboard.filters.activityLabel,
                      reasonLabel: dashboard.filters.reasonLabel,
                    }}
                  />
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
