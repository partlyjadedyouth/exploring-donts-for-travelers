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
  city?: string;
  activityLabel?: string;
  reasonLabel?: string;
  videoTitle?: string;
};

export type CityComposition = {
  city: string;
  total: number;
  segments: { label: string; count: number; pct: number }[];
};

export type LinkStat = {
  activityLabel: string;
  reasonLabel: string;
  count: number;
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

const includeIfSet = (selected: string | undefined, value: string) =>
  !selected || selected === value;

export function filterRows(rows: DontRow[], filters: Filters) {
  return rows.filter(
    (row) =>
      includeIfSet(filters.city, row.city) &&
      includeIfSet(filters.activityLabel, row.activityLabel) &&
      includeIfSet(filters.reasonLabel, row.reasonLabel) &&
      (!filters.videoTitle || row.videoTitle === filters.videoTitle),
  );
}

export function uniqueValues(rows: DontRow[]) {
  const cities = new Set<string>();
  const activityCounts: Record<string, number> = {};
  const reasonCounts: Record<string, number> = {};
  const videos = new Set<string>();

  rows.forEach((row) => {
    cities.add(row.city);
    activityCounts[row.activityLabel] = (activityCounts[row.activityLabel] || 0) + 1;
    reasonCounts[row.reasonLabel] = (reasonCounts[row.reasonLabel] || 0) + 1;
    videos.add(row.videoTitle);
  });

  return {
    cities: [...cities].sort(),
    activityLabels: orderLabels(activityCounts),
    reasonLabels: orderLabels(reasonCounts),
    videos: [...videos].sort(),
  };
}

export function cityActivityComposition(rows: DontRow[]): CityComposition[] {
  const globalCounts: Record<string, number> = {};
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const cityMap = grouped[row.city] || (grouped[row.city] = {});
    cityMap[row.activityLabel] = (cityMap[row.activityLabel] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
    globalCounts[row.activityLabel] = (globalCounts[row.activityLabel] || 0) + 1;
  });

  const order = orderLabels(globalCounts);

  return Object.entries(grouped).map(([city, map]) => {
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
}

export function cityReasonComposition(rows: DontRow[]): CityComposition[] {
  const globalCounts: Record<string, number> = {};
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const cityMap = grouped[row.city] || (grouped[row.city] = {});
    cityMap[row.reasonLabel] = (cityMap[row.reasonLabel] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
    globalCounts[row.reasonLabel] = (globalCounts[row.reasonLabel] || 0) + 1;
  });

  const order = orderLabels(globalCounts);

  return Object.entries(grouped).map(([city, map]) => {
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
}

export function topLinks(rows: DontRow[], limit = 8): LinkStat[] {
  const map: Record<string, number> = {};

  rows.forEach((row) => {
    const key = `${row.activityLabel}→${row.reasonLabel}`;
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .map(([key, count]) => {
      const [activityLabel, reasonLabel] = key.split("→");
      return { activityLabel, reasonLabel, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function hashRow(row: DontRow) {
  return `${row.videoId}-${row.activityLabel}-${row.reasonLabel}-${row.city}-${row.activity}`;
}

export function activityReasonMatrix(rows: DontRow[]): Matrix {
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
    activityLabels: orderLabels(activityCounts),
    reasonLabels: orderLabels(reasonCounts),
    max: Math.max(max, 1),
    cells,
  };
}
