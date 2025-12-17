const palette = [
  "#4f46e5",
  "#0ea5e9",
  "#f97316",
  "#22c55e",
  "#a855f7",
  "#ec4899",
  "#facc15",
  "#14b8a6",
  "#ef4444",
  "#6366f1",
];

export function colorForLabel(label: string) {
  // Deterministic hash to keep colors consistent across charts.
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash << 5) - hash + label.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % palette.length;
  return palette[index];
}
