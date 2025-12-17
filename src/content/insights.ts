export type Insight = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  quotes: string[];
};

export const insights: Insight[] = [
  {
    id: "mobility-london",
    title: "London transit mistakes pile up quickly",
    summary:
      "Transit mistakes show up repeatedly as a blocker when visitors try to navigate London without prep.",
    tags: ["city:London", "activity:Transit Mistakes", "activity:Shopping"],
    quotes: [
      "Look for rows mentioning Uber and walking fatigue.",
      "Cross-reference with Safety Concerns or Cultural Misfits reasons.",
    ],
  },
  {
    id: "commerce-fatigue",
    title: "Shopping pain signals purchase hesitation",
    summary:
      "Shopping-related don’ts often show up next to Price and Quality reasons, hinting at hidden sticker shock.",
    tags: [
      "activity:Shopping",
      "activity:Transit Mistakes",
      "reason:Price and Quality",
      "reason:Timing and Distance",
    ],
    quotes: [
      "Rows with VAT or tipping concerns.",
      "Any note calling out surprise fees.",
    ],
  },
];
