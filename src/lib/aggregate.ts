export type DontRow = {
  id: string;
  videoId: string;
  videoTitle: string;
  city: string;
  activity: string;
  reason: string;
  activityCategory: string;
  reasonCategory: string;
};

export type Filters = {
  city?: string;
  activityCategory?: string;
  reasonCategory?: string;
  videoTitle?: string;
};

export type CityComposition = {
  city: string;
  total: number;
  segments: { label: string; count: number; pct: number }[];
};

export type LinkStat = {
  activityCategory: string;
  reasonCategory: string;
  count: number;
};

export type Matrix = {
  cities: string[];
  reasonCategories: string[];
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
      includeIfSet(filters.activityCategory, row.activityCategory) &&
      includeIfSet(filters.reasonCategory, row.reasonCategory) &&
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
    activities.add(row.activityCategory);
    reasons.add(row.reasonCategory);
    videos.add(row.videoTitle);
  });

  return {
    cities: [...cities].sort(),
    activityCategories: [...activities].sort(),
    reasonCategories: [...reasons].sort(),
    videos: [...videos].sort(),
  };
}

export function cityActivityComposition(rows: DontRow[]): CityComposition[] {
  const globalCounts: Record<string, number> = {};
  const grouped: Record<string, Record<string, number>> = {};
  const totals: Record<string, number> = {};

  rows.forEach((row) => {
    const cityMap = grouped[row.city] || (grouped[row.city] = {});
    cityMap[row.activityCategory] = (cityMap[row.activityCategory] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
    globalCounts[row.activityCategory] = (globalCounts[row.activityCategory] || 0) + 1;
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
    cityMap[row.reasonCategory] = (cityMap[row.reasonCategory] || 0) + 1;
    totals[row.city] = (totals[row.city] || 0) + 1;
    globalCounts[row.reasonCategory] = (globalCounts[row.reasonCategory] || 0) + 1;
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
    const key = `${row.activityCategory}→${row.reasonCategory}`;
    map[key] = (map[key] || 0) + 1;
  });

  return Object.entries(map)
    .map(([key, count]) => {
      const [activityCategory, reasonCategory] = key.split("→");
      return { activityCategory, reasonCategory, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function hashRow(row: DontRow) {
  return `${row.videoId}-${row.activityCategory}-${row.reasonCategory}-${row.city}-${row.activity}`;
}

export function activityReasonMatrix(rows: DontRow[]): Matrix {
  const cells: Record<string, Record<string, number>> = {};
  const activityCounts: Record<string, number> = {};
  const reasonCounts: Record<string, number> = {};
  let max = 0;

  rows.forEach((row) => {
    activityCounts[row.activityCategory] = (activityCounts[row.activityCategory] || 0) + 1;
    reasonCounts[row.reasonCategory] = (reasonCounts[row.reasonCategory] || 0) + 1;
    if (!cells[row.activityCategory]) cells[row.activityCategory] = {};
    cells[row.activityCategory][row.reasonCategory] =
      (cells[row.activityCategory][row.reasonCategory] || 0) + 1;
    max = Math.max(max, cells[row.activityCategory][row.reasonCategory]);
  });

  return {
    cities: orderLabels(activityCounts),
    reasonCategories: orderLabels(reasonCounts),
    max: Math.max(max, 1),
    cells,
  };
}
