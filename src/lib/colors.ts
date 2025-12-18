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
  "#aec7e8", // light blue
  "#ffbb78", // light orange
];

// Common labels mapped explicitly to avoid collisions and ensure consistency.
const predefined: Record<string, string> = {
  "Transit Mistakes": "#1f77b4",
  Attractions: "#2ca02c",
  "Inefficient Planning": "#8c564b",
  Shopping: "#ff7f0e",
  "Social Misconduct": "#9467bd",
  "Unsafe Choices": "#d62728",
  "Price and Quality": "#7f7f7f",
  Overcrowding: "#17becf",
  "Cultural Misfits": "#e377c2",
  Regulations: "#bcbd22",
  "Timing and Distance": "#aec7e8",
  "Safety Concerns": "#ffbb78",
};

const assigned = new Map<string, string>();
let nextIndex = 0;

/**
 * Returns a consistent, high-contrast color for a given label.
 * Prefers predefined mappings; otherwise cycles through the palette and caches assignments.
 */
export function colorForLabel(label: string) {
  if (predefined[label]) return predefined[label];
  if (assigned.has(label)) return assigned.get(label)!;
  const color = palette[nextIndex % palette.length];
  assigned.set(label, color);
  nextIndex += 1;
  return color;
}
