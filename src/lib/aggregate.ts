export type DontRow = {
  id: string;
  videoId: string;
  videoTitle: string;
  city: string;
  activity: string;
  reason: string;
  activitySimple: string;
  reasonSimple: string;
};

export type Filters = {
  cities: string[];
  activities: string[];
  reasons: string[];
  videoTitle?: string;
};

export type CityComposition = {
  city: string;
  total: number;
  segments: { label: string; count: number; pct: number }[];
};

export type LinkStat = {
  activity: string;
  reason: string;
  count: number;
};

export type Matrix = {
  cities: string[];
  reasons: string[];
  max: number;
  cells: Record<string, Record<string, number>>;
};

const includeIfSet = (selected: string[], value: string) =>
  selected.length === 0 || selected.includes(value);

export function filterRows(rows: DontRow[], filters: Filters) {
  return rows.filter(
    (row) =>
      includeIfSet(filters.cities, row.city) &&
      includeIfSet(filters.activities, row.activitySimple) &&
      includeIfSet(filters.reasons, row.reasonSimple) &&
      (!filters.videoTitle || row.videoTitle === filters.videoTitle),
  );
}

export function uniqueValues(rows: DontRow[]) {
  const cities = new Set<string>();
  const activities = new Set<string>();
  const reasons = new Set<string>();
  const videos = new Set<string>();

  rows.forEach((row) => {
    cities.add(row.city);
    activities.add(row.activitySimple);
    reasons.add(row.reasonSimple);
    videos.add(row.videoTitle);
  });

  return {
    cities: [...cities].sort(),
    activities: [...activities].sort(),
    reasons: [...reasons].sort(),
    videos: [...videos].sort(),
  };
}

export function cityActivityComposition(rows: DontRow[]): CityComposition[] {
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const cityMap = grouped[row.city] || (grouped[row.city] = {});
    cityMap[row.activitySimple] = (cityMap[row.activitySimple] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
  });

  return Object.entries(grouped).map(([city, map]) => {
    const total = totals[city] || 1;
    const segments = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({
        label,
        count,
        pct: Math.round((count / total) * 1000) / 10,
      }));
    return { city, total, segments };
  });
}

export function cityReasonComposition(rows: DontRow[]): CityComposition[] {
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const cityMap = grouped[row.city] || (grouped[row.city] = {});
    cityMap[row.reasonSimple] = (cityMap[row.reasonSimple] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
  });

  return Object.entries(grouped).map(([city, map]) => {
    const total = totals[city] || 1;
    const segments = Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({
        label,
        count,
        pct: Math.round((count / total) * 1000) / 10,
      }));
    return { city, total, segments };
  });
}

export function topLinks(rows: DontRow[], limit = 8): LinkStat[] {
  const map: Record<string, number> = {};

  rows.forEach((row) => {
    const key = `${row.activitySimple}→${row.reasonSimple}`;
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .map(([key, count]) => {
      const [activity, reason] = key.split("→");
      return { activity, reason, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function hashRow(row: DontRow) {
  return `${row.videoId}-${row.activitySimple}-${row.reasonSimple}-${row.city}-${row.activity}`;
}

export function cityReasonMatrix(rows: DontRow[]): Matrix {
  const cells: Record<string, Record<string, number>> = {};
  const citySet = new Set<string>();
  const reasonSet = new Set<string>();
  let max = 0;

  rows.forEach((row) => {
    citySet.add(row.city);
    reasonSet.add(row.reasonSimple);
    if (!cells[row.city]) cells[row.city] = {};
    cells[row.city][row.reasonSimple] = (cells[row.city][row.reasonSimple] || 0) + 1;
    max = Math.max(max, cells[row.city][row.reasonSimple]);
  });

  return {
    cities: [...citySet],
    reasons: [...reasonSet],
    max: Math.max(max, 1),
    cells,
  };
}
