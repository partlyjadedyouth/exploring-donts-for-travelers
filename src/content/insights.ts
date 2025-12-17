export type Insight = {
  id: string;
  title: string;
  summary: string;
  soWhat: string;
  tags?: string[];
  evidenceHints: string[];
  priority: number;
};

export const insights: Insight[] = [
  {
    id: "mobility-london",
    title: "London transit mistakes pile up quickly",
    summary:
      "Transit mistakes show up repeatedly as a blocker when visitors try to navigate London without prep.",
    soWhat:
      "Double down on motion guides and call out the worst friction points early.",
    tags: ["city:London", "activity:Transit Mistakes", "activity:Shopping"],
    evidenceHints: [
      "Look for rows mentioning Uber and walking fatigue.",
      "Cross-reference with Safety Concerns or Cultural Misfits reasons.",
    ],
    priority: 1,
  },
  {
    id: "commerce-fatigue",
    title: "Shopping pain signals purchase hesitation",
    summary:
      "Shopping-related don’ts often show up next to Price and Quality reasons, hinting at hidden sticker shock.",
    soWhat: "Add a quick price expectations widget to reduce regret.",
    tags: ["activity:Shopping", "reason:Price and Quality", "reason:Timing and Distance"],
    evidenceHints: [
      "Rows with VAT or tipping concerns.",
      "Any note calling out surprise fees.",
    ],
    priority: 2,
  },
  {
    id: "video-deep-dive",
    title: "Single video deep dives surface dense evidence",
    summary:
      "When focused on one video, clusters of repeated issues emerge—useful for storyboard moments.",
    soWhat: "Pull 2–3 strongest don’ts from this clip into the highlight reel.",
    tags: ["video:any"],
    evidenceHints: [
      "Pinned rows from this video.",
      "Look for repeated Activity_Simple tags.",
    ],
    priority: 3,
  },
];
