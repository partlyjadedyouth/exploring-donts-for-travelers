import { DontRow, hashRow, normalizeCity } from "@/lib/aggregate";

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

const normalizeLabel = (
  value: string | undefined,
  map: Record<string, string>,
) => {
  const trimmed = value?.trim();
  if (!trimmed) return value ?? "";
  return map[trimmed] ?? trimmed;
};

/**
 * Custom CSV parser that supports quoted fields and escaped quotes.
 * We avoid importing a full parser to keep the client bundle lean.
 */
const parseCsvLine = (line: string) => {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i += 1;
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

/**
 * Converts a CSV string into strongly typed rows used across visualizations.
 * Falls back to original values when optional headers are missing.
 */
export const parseDontsCsv = (text: string): DontRow[] => {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const cols = parseCsvLine(line);
    const obj: Record<string, string> = {};
    headers.forEach((header, idx) => {
      obj[header] = cols[idx]?.trim() ?? "";
    });
    const row: DontRow = {
      id: "",
      videoId:
        obj["Video_ID"] || obj["VideoId"] || obj["video_id"] || obj["videoId"],
      videoTitle: obj["Video_Title"],
      city: normalizeCity(obj["City"]),
      activity: obj["Activity"],
      reason: obj["Reason"],
      activityLabel: normalizeLabel(obj["Activity_Simple"], activityLabelMap),
      reasonLabel: normalizeLabel(obj["Reason_Simple"], reasonLabelMap),
    };
    row.id = hashRow(row);
    return row;
  });
};

/**
 * Lightweight sample rows to keep the experience interactive when the CSV fails to load.
 */
export const fallbackRows: DontRow[] = [
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
];
