# Travel Don'ts Research Dashboard

This project is a data-driven dashboard for exploring travel "don’ts" by city, activity, and reason.
It focuses on a research-story workflow: scan high-level patterns, apply filters, and interpret
insights. The UI is intentionally lightweight and visual-first, with fast filtering, shareable URL
state, and consistent category ordering across charts.

## Features

- Client-side CSV parsing with graceful fallback data if the file is missing
- Multi-city selection plus single activity/reason filters; every chart segment is clickable
- URL query params stay in sync so views can be bookmarked or shared without scroll jumps
- Rule-based insight cards keyed off filters (city/activity/reason/video)
- Deterministic label ordering and coloring so charts remain stable as filters change

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (using the @tailwindcss/postcss pipeline)
- No server runtime requirements for data beyond a static CSV

## Local Development

Requires Node 18+.

```bash
npm install
npm run dev
```

Useful checks:

- `npm run lint` — lint the codebase
- `npm run build` — production build

## Data

The dataset is a CSV stored at `public/data/donts.csv`. Relevant columns:

- `City`
- `Activity_Simple` (mapped to display labels)
- `Reason_Simple` (mapped to display labels)
- `Activity` and `Reason` (verbatim strings from the source clip)
- `Video_ID` and `Video_Title` (used for tagging and deduping)

Parsing, label normalization, and fallback sample rows live in `src/lib/donts-data.ts` so the UI
logic stays lean. If the CSV is missing, the dashboard falls back to two sample rows and surfaces a
warning in the header.

### Labeling and colors

- `Activity_Simple` and `Reason_Simple` values are normalized through maps in `src/lib/donts-data.ts`
  so edits to the CSV will still land in the intended buckets.
- Deterministic colors for every normalized label are defined in `src/lib/colors.ts`; add to this map
  if you introduce a new simplified label to keep palettes stable.

### Ordering rules

- Cities are sorted via a fixed narrative order (Seoul → Tokyo → London → Paris → New York).
- Activity/reason labels are ordered by overall frequency (ties broken alphabetically) so stacks and
  heatmaps remain predictable even when filtered.

## UX Overview

- Filters: City (multi-select), Activity (single), Reason (single).
- Stacked bars show City × Activity and City × Reason compositions.
- Activity × Reason heatmap shows density and highlights based on current filters.
- Insight cards are rule-based and update as filters change.
- Filters are mirrored into the URL (`city`, `activity`, `reason`, `video`) via
  `src/hooks/useDashboardState.ts`, making the current view shareable.

## Code Structure

```
src/
  app/
    page.tsx            # Dashboard shell + data load + wiring
    layout.tsx          # Metadata and base layout
    globals.css         # Global styling scale
  components/
    FilterRail.tsx      # City/Activity/Reason filters
    InsightPanel.tsx    # Insight cards + matching display
    InsightCard.tsx     # Individual insight UI
    charts/
      StackedCityActivity.tsx
      StackedCityReason.tsx
      ActivityReasonHeatmap.tsx
  content/
    insights.ts         # Rule-based insight definitions
  hooks/
    useDashboardState.ts # Filters + URL sync
  lib/
    aggregate.ts        # Filtering + aggregation utilities + ordering
    donts-data.ts       # CSV parsing + label normalization + fallback data
    colors.ts           # Deterministic color mapping for categories
    insights-utils.ts   # Insight tag building/matching logic
public/
  data/
    donts.csv           # Dashboard dataset
```

## Interaction Model

- Filter changes update URL query params without scrolling.
- Stacked bars are clickable to toggle a single Activity/Reason and to pick cities.
- Heatmap is read-only; highlights reflect current filters.

## Authoring insights

`src/content/insights.ts` holds curated cards. Each card can set `tags` that match the active filter
tags (`city:<name>`, `activity:<normalized activity label>`, `reason:<normalized reason label>`,
`video:<video title>`). Matching logic lives in `src/lib/insights-utils.ts` and requires overlap per
tag category; omit tags to make a card always show.

## Design Notes

- Consistent category ordering is enforced via `aggregate.ts` using the global label order so charts
  stay stable even when filtered.
- City order is fixed (Seoul → Tokyo → London → Paris → New York) for narrative clarity.
- Colors are explicitly mapped by label in `lib/colors.ts` to avoid collisions.
