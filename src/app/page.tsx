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
  hashRow,
  uniqueValues,
  cityActivityComposition,
  cityReasonComposition,
  activityReasonMatrix,
} from "@/lib/aggregate";
import { useDashboardState } from "@/hooks/useDashboardState";
import CityReasonHeatmap from "@/components/charts/CityReasonHeatmap";

const activityLabelMap: Record<string, string> = {
  Mobility: "Transit Mistakes",
  Sights: "Attractions",
  Logistics: "Inefficient Planning",
  Commerce: "Shopping",
  Conduct: "Social Misconduct",
  Risk: "Unsafe Choices",
};

const reasonLabelMap: Record<string, string> = {
  Value: "Price and Quality",
  Risk: "Safety Concerns",
  Crowd: "Overcrowding",
  Norms: "Cultural Misfits",
  Rules: "Regulations",
  Friction: "Timing and Distance",
};

const mapActivityLabel = (value: string) =>
  activityLabelMap[value?.trim()] || value?.trim() || value;

const mapReasonLabel = (value: string) =>
  reasonLabelMap[value?.trim()] || value?.trim() || value;

const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i++;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
};

const parseCsv = (text: string): DontRow[] => {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = cols[idx]?.trim() ?? "";
    });
    const row: DontRow = {
      id: "",
      videoId: obj["Video_ID"] || obj["VideoId"] || obj["video_id"] || obj["videoId"],
      videoTitle: obj["Video_Title"],
      city: obj["City"],
      activity: obj["Activity"],
      reason: obj["Reason"],
      activityLabel: mapActivityLabel(obj["Activity_Simple"]),
      reasonLabel: mapReasonLabel(obj["Reason_Simple"]),
    };
    row.id = hashRow(row);
    return row;
  });
};

export default function DashboardPage() {
  const [rows, setRows] = useState<DontRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heatmapSelection, setHeatmapSelection] = useState<{
    activityLabel: string;
    reasonLabel: string;
  } | null>(null);
  const dashboard = useDashboardState();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/data/donts.csv", { cache: "no-store" });
        if (!res.ok) throw new Error("CSV missing, using fallback data.");
        const txt = await res.text();
        const parsed = parseCsv(txt);
        setRows(parsed);
      } catch (err) {
        console.error(err);
        // lightweight fallback so the UI still works
        setRows([
          {
            id: "fallback-1",
            videoId: "demo1",
            videoTitle: "Sample Clip A",
            city: "Tokyo",
            activity: "crossing busy crossings",
            reason: "overwhelming crowds",
            activityLabel: "Transit Mistakes",
            reasonLabel: "Overcrowding",
          },
          {
            id: "fallback-2",
            videoId: "demo2",
            videoTitle: "Sample Clip B",
            city: "Seoul",
            activity: "buying souvenirs",
            reason: "tourist traps",
            activityLabel: "Shopping",
            reasonLabel: "Price and Quality",
          },
        ]);
        setError("Using fallback sample data because /data/donts.csv could not be loaded.");
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
    () => cityActivityComposition(filteredRows),
    [filteredRows],
  );
  const cityReason: CityComposition[] = useMemo(
    () => cityReasonComposition(filteredRows),
    [filteredRows],
  );
  const heatmap = useMemo(() => activityReasonMatrix(rows), [rows]);

  const handleHeatmapSelect = (activityLabel: string, reasonLabel: string) => {
    const isSame =
      heatmapSelection?.activityLabel === activityLabel &&
      heatmapSelection?.reasonLabel === reasonLabel;
    if (isSame) {
      setHeatmapSelection(null);
      dashboard.setFiltersDirect({
        ...dashboard.filters,
        activityLabel: undefined,
        reasonLabel: undefined,
      });
      dashboard.setSelection(null);
      return;
    }
    setHeatmapSelection({ activityLabel, reasonLabel });
    dashboard.setFiltersDirect({
      ...dashboard.filters,
      activityLabel,
      reasonLabel,
    });
    dashboard.setSelection({ type: "link", value: `${activityLabel} × ${reasonLabel}` });
  };

  const handleReset = () => {
    dashboard.resetFilters();
    setHeatmapSelection(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 px-4 py-6 text-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Research story</p>
          <h1 className="text-2xl font-semibold text-neutral-900">
            Travel “don’ts” explorer
          </h1>
          <p className="text-sm text-neutral-600">
            Click on any chart segment to drive filters. Heatmap clicks also surface evidence rows.
          </p>
          {error && <p className="text-xs font-semibold text-amber-600">{error}</p>}
        </div>

        <section className="flex flex-col gap-4">
          <FilterRail
            filters={dashboard.filters}
            options={options}
            onToggle={dashboard.toggleValue}
            onReset={handleReset}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <InsightPanel filters={dashboard.filters} />
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white/80 p-6 text-center text-sm text-neutral-600 shadow-sm">
              Loading CSV…
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <StackedCityActivity
                  data={cityActivity}
                  active={dashboard.filters.activityLabel}
                  onToggle={(v) => {
                    dashboard.toggleValue("activityLabel", v);
                    dashboard.setSelection({ type: "activity_label", value: v });
                  }}
                  onSelectCity={(v) => {
                    dashboard.toggleValue("city", v);
                    dashboard.setSelection({ type: "city", value: v });
                  }}
                />
                <StackedCityReason
                  data={cityReason}
                  active={dashboard.filters.reasonLabel}
                  onToggle={(v) => {
                    dashboard.toggleValue("reasonLabel", v);
                    dashboard.setSelection({ type: "reason_label", value: v });
                  }}
                  onSelectCity={(v) => {
                    dashboard.toggleValue("city", v);
                    dashboard.setSelection({ type: "city", value: v });
                  }}
                />
              </div>

              <CityReasonHeatmap
                matrix={heatmap}
                active={{
                  activityLabel: dashboard.filters.activityLabel,
                  reasonLabel: dashboard.filters.reasonLabel,
                }}
                selected={heatmapSelection}
                onSelect={handleHeatmapSelect}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
