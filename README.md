# Travel Don'ts Research Dashboard

This project is a data-driven dashboard for exploring travel "don’ts" by city, activity, and reason.
It focuses on a research-story workflow: scan high-level patterns, apply filters, and interpret
insights. The UI is intentionally lightweight and visual-first, with fast filtering and consistent
category ordering across charts.

## Stack

- Next.js 16 (App Router) + React 19
- Tailwind CSS v4
- Client-side CSV parsing (MVP)

## Local Development

```bash
npm install
npm run dev
```

## Data

The dataset is a CSV stored at `public/data/donts.csv`. Relevant columns:

- `City`
- `Activity_Simple` (mapped to display labels)
- `Reason_Simple` (mapped to display labels)

Parsing, label normalization, and fallback sample rows live in `src/lib/donts-data.ts` so the UI
logic stays lean. If the CSV is missing, the dashboard falls back to two sample rows.

## UX Overview

- Filters: City (multi-select), Activity (single), Reason (single).
- Stacked bars show City × Activity and City × Reason compositions.
- Activity × Reason heatmap shows density and highlights based on current filters.
- Insight cards are rule-based and update as filters change.

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
    aggregate.ts        # Filtering + aggregation utilities
    donts-data.ts       # CSV parsing + label normalization + fallback data
    colors.ts           # Deterministic color mapping for categories
    insights-utils.ts   # Insight matching logic
public/
  data/
    donts.csv           # Dashboard dataset
```

## Interaction Model

- Filter changes update URL query params without scrolling.
- Stacked bars are clickable to toggle a single Activity/Reason and to pick cities.
- Heatmap is read-only; highlights reflect current filters.

## Design Notes

- Consistent category ordering is enforced via `aggregate.ts` using the global label order so charts
  stay stable even when filtered.
- City order is fixed (Seoul → Tokyo → London → Paris → New York) for narrative clarity.
- Colors are explicitly mapped by label in `lib/colors.ts` to avoid collisions.

## Development Direction

Planned evolution (if needed):

1. Move CSV parsing to the server and cache in a route handler.
2. Replace heatmap with an alluvial/sankey view once the data grows.
3. Add user-authored insight annotations and exportable snapshots.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build
- `npm run lint` — lint the codebase
