export type Insight = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  quotes: string[];
};

export const insights: Insight[] = [
  // =========================
  // London (6/6)
  // =========================
  {
    id: "london-attractions-queue-free-culture",
    title: "In London, timing and free culture beat “tourist nightlife”",
    summary:
      "London DON’Ts cluster around expectation-setting (some touristy nightlife options can feel underwhelming), avoiding peak-time markets, and not missing high-quality free spots like major museums. The dataset’s subtext: in London, what you do matters less than when you do it.",
    tags: ["city:London", "activity:Attractions", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "london-inefficient-planning-weekend-density",
    title:
      "London itineraries fail when you ignore weekend density and queue culture",
    summary:
      "London planning DON’Ts warn that not knowing which areas spike on weekends (and how lines behave) turns simple moves into time sinks. Queue-skipping also shows up as a social friction risk—sometimes the ‘hack’ costs more than it saves.",
    tags: [
      "city:London",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "london-shopping-silent-leaks",
    title:
      "London’s tourist budget leaks are quiet: VAT, water, and tipping defaults",
    summary:
      "London shopping/ spending DON’Ts read like a checklist of silent drains: expecting VAT refunds on designer goods (policy mismatch), ordering bottled water by default, and over-tipping. It’s rarely one big splurge—more often it’s habit-driven overpayment.",
    tags: ["city:London", "activity:Shopping", "Reason:Regulations"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "london-social-misconduct-local-signals",
    title: "In London, ignoring local signals makes you stand out fast",
    summary:
      "London social DON’Ts suggest certain phrases, faux-local slang, or gestures can land as performative or irritating. Tiny language and body cues act like a ‘tourist mode’ switch—subtlety reads as competence.",
    tags: [
      "city:London",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "london-transit-local-rules-over-maps",
    title:
      "London transit is faster when you follow local rules—not just map apps",
    summary:
      "London transit DON’Ts converge on small-but-costly mistakes: Google Maps quirks, unrealistic ‘just walk’ assumptions (stairs, distance), rideshare limitations, and micro-rules like escalator sides. In London, knowing the flow is the real time saver.",
    tags: [
      "city:London",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "london-unsafe-choices-crossing-streets",
    title:
      "London safety DON’Ts start with the basics: crossing streets your “home way”",
    summary:
      "London unsafe-choice warnings repeatedly center on road-crossing habits. The dataset implies many ‘city risks’ are actually muscle memory—reset the habit, reduce the danger.",
    tags: ["city:London", "activity:Unsafe Choices", "Reason:Safety Concerns"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },

  // =========================
  // Paris (6/6)
  // =========================
  {
    id: "paris-attractions-photo-spot-fallacy",
    title: "Paris punishes “photo-spot obsession”",
    summary:
      "Paris attractions DON’Ts imply that chasing the same iconic shots (crowds, mediocre viewpoints, pricey areas) lowers satisfaction. The dataset’s hint: optimize for view quality and movement cost, not for the most copied frame.",
    tags: ["city:Paris", "activity:Attractions", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-inefficient-planning-prebook-early",
    title: "Paris is an early-start, pre-booking city",
    summary:
      "Paris planning DON’Ts repeatedly penalize spontaneity: buying tickets after you arrive, relying on on-site purchases, and showing up late to crowd-magnet spots. In this dataset, ‘Paris done right’ is reservations + mornings + off-peak.",
    tags: [
      "city:Paris",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-shopping-food-fear-and-tourist-traps",
    title:
      "Paris spending DON’Ts warn against tourist packages and “food fear”",
    summary:
      "Tourist-targeted bundles (like certain dinner cruises) appear as overpriced for the quality, and avoiding French food due to unfamiliarity shows up as a self-inflicted loss. The dataset frames ‘local-leaning choices’ as better value than glossy packages.",
    tags: ["city:Paris", "activity:Shopping", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-social-misconduct-language-effort",
    title: "In Paris, language effort matters more than fluency",
    summary:
      "Paris social DON’Ts point to friction when travelers assume English is the default. The dataset suggests basic greetings and visible effort lower resistance—even imperfect French improves the experience.",
    tags: [
      "city:Paris",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-transit-metro-awareness",
    title: "Paris transit DON’Ts are about awareness, not fear",
    summary:
      "Paris transit warnings focus on vulnerability signals: phone use near metro doors, distraction, and getting stuck in slow car traffic. In the dataset, successful movement comes from alertness plus smart mode choice.",
    tags: ["city:Paris", "activity:Transit Mistakes", "Reason:Safety Concerns"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-unsafe-pickpocket-baseline",
    title: "In Paris, treat pickpocketing as a baseline risk",
    summary:
      "Paris unsafe-choice DON’Ts don’t isolate risk to one neighborhood—they frame it as an always-on condition across common tourist routes. The takeaway: ‘being careful’ in Paris is a continuous posture, not a moment.",
    tags: ["city:Paris", "activity:Unsafe Choices", "Reason:Safety Concerns"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },

  // =========================
  // New York (6/6)
  // =========================
  {
    id: "newyork-attractions-line-value-audit",
    title: "In New York, a line is basically a price tag",
    summary:
      "NYC attractions DON’Ts highlight that famous spots can become low-value when time cost explodes (e.g., long queues for iconic photo stops). The dataset frames attraction choice as a ‘wait-time willingness’ decision as much as a sightseeing one.",
    tags: ["city:New York", "activity:Attractions", "Reason:Overcrowding"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "newyork-inefficient-planning-times-square-peak",
    title: "NYC planning DON’Ts: Times Square is all about time-of-day",
    summary:
      "NYC planning DON’Ts repeatedly warn that putting Times Square in peak hours turns your itinerary into a human-traffic bottleneck. Same place, different hour—completely different difficulty.",
    tags: [
      "city:New York",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "newyork-shopping-dont-pay-tourist-rates",
    title: "NYC spending DON’Ts: don’t pay the ‘tourist rate’ for convenience",
    summary:
      "NYC shopping/spending DON’Ts focus on convenience traps—overpaying for hotels and defaulting to overpriced chain restaurants. The dataset implies NYC punishes autopilot choices more than deliberate ones.",
    tags: ["city:New York", "activity:Shopping", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "newyork-social-misconduct-dataset-gap",
    title:
      "NYC has almost no ‘etiquette DON’Ts’ here—your dataset is biased toward money and risk",
    summary:
      "In this dataset, New York has little to no Social Misconduct coverage. That absence is itself an insight: creators seem to frame NYC as a city of scams, pricing, and logistics—not a city where etiquette mistakes are the main story.",
    tags: [
      "city:New York",
      "activity:Social Misconduct",
      "Reason:Price and Quality",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "newyork-transit-walk-subway-taxi-tradeoff",
    title:
      "NYC transit DON’Ts are really about failing to build the right walking + subway combo",
    summary:
      "NYC transit DON’Ts converge on practical breakdowns: bad shoes for long walking, not using the subway, and taxi inefficiency. In the dataset, transit failure isn’t the route—it’s the missing ‘walk + train’ strategy.",
    tags: [
      "city:New York",
      "activity:Transit Mistakes",
      "Reason:Price and Quality",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "newyork-unsafe-choices-tourist-tax-scams",
    title:
      "NYC unsafe-choice DON’Ts: scams behave like an unofficial tourist tax",
    summary:
      "Bracelet approaches, ‘free’ mixtapes, and costume-photo hustles share one pattern: anything that starts ambiguous often ends as a demand for money. The dataset’s advice is simple—avoid unclear transactions.",
    tags: [
      "city:New York",
      "activity:Unsafe Choices",
      "Reason:Safety Concerns",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },

  // =========================
  // Seoul (6/6)
  // =========================
  {
    id: "seoul-inefficient-planning-season-cards-rules",
    title:
      "Seoul planning DON’Ts are a trio: seasons, savings cards, and compliance",
    summary:
      "Seoul planning DON’Ts cluster around (1) peak-season price/crowd pressure (spring/fall), (2) missing transit savings options like city passes, and (3) forgetting policy-style checks. The dataset implies Seoul rewards travelers who ‘set the operating system’ first.",
    tags: [
      "city:Seoul",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "seoul-shopping-payments-beauty-value",
    title:
      "Seoul spending DON’Ts: payment assumptions and beauty ‘value illusions’",
    summary:
      "Seoul shopping DON’Ts emphasize that payment habits can backfire, and that some hyped beauty items don’t always deliver proportional value. The dataset pushes a ‘local-value’ mindset: hunt what’s uniquely advantageous in Seoul.",
    tags: ["city:Seoul", "activity:Shopping", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "seoul-social-misconduct-boundaries",
    title:
      "Seoul etiquette DON’Ts are less about friendliness and more about boundaries",
    summary:
      "Seoul social DON’Ts repeatedly point to “light presence”: don’t force small talk with strangers, don’t stare, respect indoor shoe norms, and follow local handling conventions. The dataset’s tone: non-intrusion reads as respect.",
    tags: [
      "city:Seoul",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "seoul-transit-local-maps-taxi-rules",
    title:
      "Seoul transit DON’Ts: if you don’t switch to local apps and taxi rules, movement gets messy",
    summary:
      "Seoul transit DON’Ts converge on skipping local map apps, struggling with taxi communication, and missing precise rules that affect pickups and rides. The dataset implies Seoul is extremely convenient—once you adopt the local stack.",
    tags: [
      "city:Seoul",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "seoul-unsafe-choices-bikes-and-boundaries",
    title:
      "Seoul unsafe-choice DON’Ts focus on theft-prevention basics and social risk",
    summary:
      "Not locking bikes appears as a straightforward theft risk, while certain unsolicited interactions are framed as boundary violations. In this dataset, Seoul ‘safety’ includes both physical security and social friction.",
    tags: ["city:Seoul", "activity:Unsafe Choices", "Reason:Safety Concerns"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },

  // =========================
  // Tokyo (5/6)
  // =========================
  {
    id: "tokyo-inefficient-planning-location-lockers",
    title:
      "Tokyo planning DON’Ts: hotel location and coin lockers change everything",
    summary:
      "Tokyo planning DON’Ts frame logistics as destiny: where you stay sets your daily friction, and ignoring coin lockers turns movement into a stamina drain. The dataset suggests Tokyo planning is less a timetable and more a supply chain.",
    tags: [
      "city:Tokyo",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "tokyo-shopping-vending-taxfree-norms",
    title:
      "Tokyo spending DON’Ts: understand vending, tax-free rules, and tipping norms first",
    summary:
      "Tokyo shopping DON’Ts emphasize that buying is system-driven: ramen queues, vending-machine choices, tax-free bag rules, and tipping norms. The dataset’s point: in Tokyo you’re not just buying products—you’re navigating procedures.",
    tags: ["city:Tokyo", "activity:Shopping", "Reason:Regulations"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "tokyo-social-misconduct-hygiene-etiquette",
    title: "Tokyo etiquette DON’Ts are a manual: hygiene, space, and gaze",
    summary:
      "Tokyo social DON’Ts appear as highly specific micro-rules: onsen shower steps, footwear norms, backpack positioning, bathroom usage, and even pointing behavior. In this dataset, Tokyo manners read less like vibes and more like a checklist.",
    tags: [
      "city:Tokyo",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "tokyo-transit-etiquette-is-flow",
    title: "Tokyo transit DON’Ts: etiquette is the transportation system",
    summary:
      "Tokyo transit DON’Ts cluster around behaviors that break flow: loud talking, blocking space, ignoring escalator rules, or treating trains casually. The dataset implies the best navigation skill in Tokyo is moving without disrupting others.",
    tags: [
      "city:Tokyo",
      "activity:Transit Mistakes",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "tokyo-unsafe-choices-night-walk-hazards",
    title:
      "Tokyo unsafe-choice DON’Ts: overconfidence at night is the variable",
    summary:
      "The dataset flags late-night walking confidence and careless handling of risky items as avoidable problems. Tokyo’s ‘safe reputation’ can create the real danger: relaxed attention and sloppy decisions.",
    tags: ["city:Tokyo", "activity:Unsafe Choices", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
];
