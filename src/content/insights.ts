export type InsightCondition = {
  city?: string[];
  activity_simple?: string[];
  reason_simple?: string[];
  video_title?: string[];
};

export type Insight = {
  id: string;
  title: string;
  summary: string;
  soWhat: string;
  conditions?: InsightCondition;
  evidenceHints: string[];
  priority: number;
};

export const insights: Insight[] = [
  {
    id: "mobility-london",
    title: "London mobility gripes pile up quickly",
    summary:
      "Mobility shows up repeatedly as a blocker when visitors try to navigate London without prep.",
    soWhat: "Double down on motion guides and call out the worst friction points early.",
    conditions: { city: ["London"], activity_simple: ["Mobility"] },
    evidenceHints: [
      "Look for rows mentioning Uber and walking fatigue.",
      "Cross-reference with Risk or Norms reasons.",
    ],
    priority: 1,
  },
  {
    id: "commerce-fatigue",
    title: "Commerce pain signals purchase hesitation",
    summary:
      "Commerce-related don’ts often show up next to Value reasons, hinting at hidden sticker shock.",
    soWhat: "Add a quick price expectations widget to reduce regret.",
    conditions: {
      activity_simple: ["Commerce"],
      reason_simple: ["Value", "Friction"],
    },
    evidenceHints: ["Rows with VAT or tipping concerns.", "Any note calling out surprise fees."],
    priority: 2,
  },
  {
    id: "video-deep-dive",
    title: "Single video deep dives surface dense evidence",
    summary:
      "When focused on one video, clusters of repeated issues emerge—useful for storyboard moments.",
    soWhat: "Pull 2–3 strongest don’ts from this clip into the highlight reel.",
    conditions: { video_title: [] },
    evidenceHints: ["Pinned rows from this video.", "Look for repeated Activity_Simple tags."],
    priority: 3,
  },
];
