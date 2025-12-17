// High-contrast palette to keep categories visually distinct.
const palette = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // olive
  "#17becf", // teal
];

// Common labels mapped explicitly to avoid collisions and ensure consistency.
const predefined: Record<string, string> = {
  Mobility: "#1f77b4",
  Commerce: "#ff7f0e",
  Sights: "#2ca02c",
  Risk: "#d62728",
  Conduct: "#9467bd",
  Logistics: "#8c564b",
  Rules: "#17becf",
  Friction: "#bcbd22",
  Value: "#7f7f7f",
  Norms: "#e377c2",
  Crowd: "#ff7f0e",
};

const assigned = new Map<string, string>();
let nextIndex = 0;

export function colorForLabel(label: string) {
  if (predefined[label]) return predefined[label];
  if (assigned.has(label)) return assigned.get(label)!;
  const color = palette[nextIndex % palette.length];
  assigned.set(label, color);
  nextIndex += 1;
  return color;
}
