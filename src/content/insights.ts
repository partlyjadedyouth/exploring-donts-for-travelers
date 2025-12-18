export type Insight = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  quotes: string[];
};

export const insights: Insight[] = [
  {
    id: "london-transit-micro-inefficiencies",
    title: "London punishes “close enough” navigation",
    summary:
      "London’s biggest DON’Ts cluster around small routing errors that compound fast: Google Maps can mislead, walking can be impractical (and step-heavy), and even bridges trip people up. The dataset implies London rewards hyper-local navigation habits (right escalator side, bridge awareness, platform flow) more than brute-force walking.",
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
    id: "london-budget-leaks-water-tips-vat",
    title: "London’s tourist budget leaks are quiet (and avoidable)",
    summary:
      "London DON’Ts show “death by a thousand add-ons”: ordering still water when you don’t need it, over-tipping (double-paying), and buying designer goods expecting VAT refunds post-Brexit. It’s less about one huge splurge and more about default behaviors that trigger unnecessary spend.",
    tags: [
      "city:London",
      "activity:Shopping",
      "Reason:Price and Quality",
      "Reason:Regulations",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-prebook-offpeak-or-suffer",
    title: "Paris is a pre-booking city disguised as a stroll",
    summary:
      "Paris DON’Ts repeatedly punish spontaneity: waiting to buy tickets after arriving, buying Eiffel Tower tickets on-site, and visiting Sacré-Cœur after 9am all map to queues and crowd pressure. The dataset suggests the “best Paris” comes from pre-commitment: reservations, early starts, and timing discipline.",
    tags: [
      "city:Paris",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-icon-fixation-trap",
    title: "Paris DON’Ts warn against “icon fixation”",
    summary:
      "A major Paris pattern is over-indexing on the Eiffel Tower: assuming it’s the city’s center, chasing mediocre viewpoints, or treating a single landmark as the whole plan. The dataset frames this as a distance-and-value trap—your itinerary gets worse when one icon dictates your logistics.",
    tags: [
      "city:Paris",
      "activity:Attractions",
      "Reason:Price and Quality",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "paris-metro-alertness",
    title: "Paris metro DON’Ts are about alertness, not fear",
    summary:
      "Paris transit warnings skew toward situational awareness: using your phone near metro doors, whistling the metro, and other behaviors that attract problems. The dataset reads like: the metro is efficient—just don’t advertise distraction.",
    tags: ["city:Paris", "activity:Transit Mistakes", "Reason:Safety Concerns"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "nyc-scam-tax",
    title: "In New York, scams function like an unofficial tourist tax",
    summary:
      "NYC DON’Ts repeatedly flag street-consumption traps: monk bracelet approaches, “free” mix tapes, and costumed photo hustles. The insight is less ‘avoid one spot’ and more ‘avoid transaction ambiguity’—anything that starts as a gift often ends as a fee.",
    tags: [
      "city:New York",
      "activity:Unsafe Choices",
      "Reason:Safety Concerns",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "nyc-attraction-value-check",
    title: "NYC’s famous attractions are not always high-value",
    summary:
      "The NYC dataset leans hard on value skepticism: the Statue of Liberty shows up as overrated/too expensive, Times Square shows get labeled overrated, and even ‘bucket list’ choices are framed through cost-to-enjoyment ratio.",
    tags: ["city:New York", "activity:Attractions", "Reason:Price and Quality"],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "nyc-bottleneck-avoidance",
    title: "NYC DON’Ts recommend bottleneck avoidance as a strategy",
    summary:
      "Some NYC mistakes are pure crowd math: touching the bull statue (lines) and visiting Times Square at peak hours (gridlock). The dataset implies the city isn’t ‘too busy’—it’s ‘too peaky.’ Shift time-of-day and your experience changes dramatically.",
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
    id: "seoul-local-stack-maps-transit-card",
    title: "Seoul penalizes “global defaults”—you need the local stack",
    summary:
      "Seoul DON’Ts concentrate around assuming global tools work: Google Maps isn’t the default, Apple Pay isn’t universal, and not knowing the climate card is treated as leaving money on the table. The dataset suggests Seoul rewards travelers who switch to local infrastructure early.",
    tags: [
      "city:Seoul",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
      "Reason:Price and Quality",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "seoul-social-boundaries",
    title: "Seoul etiquette DON’Ts are about boundaries and respect cues",
    summary:
      "Seoul’s cultural DON’Ts repeatedly point to ‘keep your presence light’: don’t wear shoes indoors, don’t stare, don’t force small talk with strangers, and even money-handling norms show up. The pattern suggests travelers should prioritize subtlety over friendliness-by-default.",
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
    id: "seoul-rules-are-literal",
    title: "In Seoul, rules are literal—especially in transit",
    summary:
      "Seoul transit DON’Ts emphasize that ‘common sense’ varies: drinking on buses is prohibited, taxi entry side matters, and hailing taxis can fail via language friction. The dataset implies your biggest Seoul wins come from learning the exact rules, not improvising.",
    tags: [
      "city:Seoul",
      "activity:Transit Mistakes",
      "Reason:Regulations",
      "Reason:Timing and Distance",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
  {
    id: "tokyo-transit-etiquette-is-navigation",
    title: "Tokyo’s best navigation tip is etiquette",
    summary:
      "Tokyo DON’Ts cluster around train and escalator behavior: don’t talk loudly, don’t hog space, don’t ignore escalator rules, and don’t treat trains like playgrounds. The dataset’s message: in Tokyo, social flow *is* transit efficiency.",
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
    id: "tokyo-no-tip-no-snack-walking",
    title: "Tokyo has ‘invisible rules’ around money and eating",
    summary:
      "Tokyo DON’Ts repeatedly warn against habits that feel polite elsewhere: tipping (seen as rude) and eating while walking (socially awkward). Add onsen shower etiquette and you get a city where ‘good manners’ means following local defaults, not global ones.",
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
    id: "tokyo-systems-are-automatic-and-strict",
    title:
      "Tokyo is full of systems that are automatic—and surprisingly strict",
    summary:
      "Tokyo DON’Ts highlight system-specific pitfalls: taxi doors open automatically, out-of-service trains can mislead, tax-free bags shouldn’t be opened, and coin lockers change how you move through the city. The dataset suggests Tokyo rewards travelers who assume ‘the system is the boss.’",
    tags: [
      "city:Tokyo",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
      "Reason:Regulations",
    ],
    quotes: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
  },
];
