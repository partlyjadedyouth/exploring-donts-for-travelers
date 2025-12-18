export type DontRow = {
  id: string;
  videoId: string;
  videoTitle: string;
  city: string;
  activity: string;
  reason: string;
  activityLabel: string;
  reasonLabel: string;
};

export type Filters = {
  city?: string[];
  activityLabel?: string;
  reasonLabel?: string;
  videoTitle?: string;
};

export type CityComposition = {
  city: string;
  total: number;
  segments: { label: string; count: number; pct: number }[];
};

const cityLabelMap: Record<string, string> = {
  "New York": "New York City",
};

/**
 * Normalizes a city label so that visualizations group equivalent values together.
 * Trims whitespace and remaps known aliases (e.g., "New York" -> "New York City").
 */
export const normalizeCity = (value?: string) => {
  const trimmed = value?.trim();
  if (!trimmed) return value ?? "";
  return cityLabelMap[trimmed] ?? trimmed;
};

export type Matrix = {
  activityLabels: string[];
  reasonLabels: string[];
  max: number;
  cells: Record<string, Record<string, number>>;
};

const orderLabels = (counts: Record<string, number>) =>
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label]) => label);

/**
 * Returns true when the provided value should be included based on the filter selection.
 * - Strings must match exactly.
 * - Arrays act as a whitelist.
 * - Undefined/empty filters allow everything through.
 */
const includeIfSet = (selected: string | string[] | undefined, value: string) => {
  if (!selected || (Array.isArray(selected) && selected.length === 0)) return true;
  if (Array.isArray(selected)) return selected.includes(value);
  return selected === value;
};

const cityOrder = ["Seoul", "Tokyo", "London", "Paris", "New York City"];
const cityRank = (city: string) => {
  const idx = cityOrder.indexOf(city);
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
};
const sortCities = (cities: string[]) =>
  [...cities].sort((a, b) => {
    const aRank = cityRank(a);
    const bRank = cityRank(b);
    if (aRank === bRank) return a.localeCompare(b);
    return aRank - bRank;
  });

/**
 * Filters the dataset based on optional city, activity, reason, and video constraints.
 */
export function filterRows(rows: DontRow[], filters: Filters) {
  return rows.filter(
    (row) =>
      includeIfSet(filters.city, row.city) &&
      includeIfSet(filters.activityLabel, row.activityLabel) &&
      includeIfSet(filters.reasonLabel, row.reasonLabel) &&
      (!filters.videoTitle || row.videoTitle === filters.videoTitle),
  );
}

/**
 * Calculates distinct lists (and sensible ordering) for dropdowns and legends.
 * Orders are frequency-first with alphabetical tie-breaks.
 */
export function uniqueValues(rows: DontRow[]) {
  const cities = new Set<string>();
  const activityCounts: Record<string, number> = {};
  const reasonCounts: Record<string, number> = {};

  rows.forEach((row) => {
    cities.add(row.city);
    activityCounts[row.activityLabel] = (activityCounts[row.activityLabel] || 0) + 1;
    reasonCounts[row.reasonLabel] = (reasonCounts[row.reasonLabel] || 0) + 1;
  });

  return {
    cities: sortCities([...cities]),
    activityLabels: orderLabels(activityCounts),
    reasonLabels: orderLabels(reasonCounts),
  };
}

type CompositionKey = "activityLabel" | "reasonLabel";

/**
 * Builds a per-city composition where each segment represents activity or reason counts.
 * Supports injecting a fixed label order so colors and columns stay stable across renders.
 */
const buildCityComposition = (
  rows: DontRow[],
  key: CompositionKey,
  labelOrder?: string[],
): CityComposition[] => {
  const globalCounts: Record<string, number> = {};
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const city = row.city;
    const label = row[key];
    const cityMap = grouped[city] || (grouped[city] = {});
    cityMap[label] = (cityMap[label] || 0) + 1;
    totals[city] = (totals[city] || 0) + 1;
    globalCounts[label] = (globalCounts[label] || 0) + 1;
  });

  const order =
    labelOrder && labelOrder.length > 0 ? labelOrder : orderLabels(globalCounts);

  return sortCities(Object.keys(grouped)).map((city) => {
    const map = grouped[city];
    const total = totals[city] || 1;
    const segments = order
      .filter((label) => map[label])
      .map((label) => {
        const count = map[label];
        return {
          label,
          count,
          pct: Math.round((count / total) * 1000) / 10,
        };
      });
    return { city, total, segments };
  });
};

/**
 * Returns a city-by-activity composition for stacked bar charts.
 */
export function cityActivityComposition(
  rows: DontRow[],
  labelOrder?: string[],
): CityComposition[] {
  return buildCityComposition(rows, "activityLabel", labelOrder);
}

/**
 * Returns a city-by-reason composition for stacked bar charts.
 */
export function cityReasonComposition(
  rows: DontRow[],
  labelOrder?: string[],
): CityComposition[] {
  return buildCityComposition(rows, "reasonLabel", labelOrder);
}

/**
 * Stable identifier for a data row to avoid duplication across charts.
 */
export function hashRow(row: DontRow) {
  return `${row.videoId}-${row.activityLabel}-${row.reasonLabel}-${row.city}-${row.activity}`;
}

/**
 * Builds a matrix of activity x reason counts for heatmap rendering.
 * Keeps track of the maximum value for consistent color scaling across selections.
 */
export function activityReasonMatrix(
  rows: DontRow[],
  labelOrder?: { activityLabels: string[]; reasonLabels: string[] },
): Matrix {
  const cells: Record<string, Record<string, number>> = {};
  const activityCounts: Record<string, number> = {};
  const reasonCounts: Record<string, number> = {};
  let max = 0;

  rows.forEach((row) => {
    activityCounts[row.activityLabel] = (activityCounts[row.activityLabel] || 0) + 1;
    reasonCounts[row.reasonLabel] = (reasonCounts[row.reasonLabel] || 0) + 1;
    if (!cells[row.activityLabel]) cells[row.activityLabel] = {};
    cells[row.activityLabel][row.reasonLabel] =
      (cells[row.activityLabel][row.reasonLabel] || 0) + 1;
    max = Math.max(max, cells[row.activityLabel][row.reasonLabel]);
  });

  return {
    activityLabels: labelOrder?.activityLabels ?? orderLabels(activityCounts),
    reasonLabels: labelOrder?.reasonLabels ?? orderLabels(reasonCounts),
    max: Math.max(max, 1),
    cells,
  };
}
