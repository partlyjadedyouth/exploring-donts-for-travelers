export type Insight = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  quotes: { quote: string; videoId: string }[];
};

/**
 * Curated set of qualitative insights surfaced when filters align with their tags.
 * Tags follow the format `${category}:${value}` to support grouped matching.
 */
export const insights: Insight[] = [
  // -------------------------
  // Seoul
  // -------------------------
  {
    id: "seoul-planning-season-savings-paperwork",
    title:
      "Seoul planning: dodge peak-season chaos and sort the paperwork early",
    summary:
      "Spring/fall can get pricey and packed fast. Handle entry stuff (like K-ETA) ahead of time and don’t miss easy savings like transit cards.",
    tags: [
      "city:Seoul",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
      "Reason:Price and Quality",
      "Reason:Regulations",
    ],
    quotes: [
      {
        quote:
          "Number two is to apply for a KETA online and make sure it gets approved before.",
        videoId: "tXJRRImjWi4",
      },
      {
        quote:
          "Spring accommodation and flights are really expensive and it will be extremely crowded everywhere.",
        videoId: "qlntCoEjEbQ",
      },
    ],
  },
  {
    id: "seoul-shopping-unique-local-value",
    title:
      "Seoul shopping: skip the hype buys and pay for what’s actually worth it",
    summary:
      "A few “Seoul-famous” purchases don’t really deliver (and some payment methods won’t work like you expect). Bring a physical card and focus on things that feel uniquely Korea.",
    tags: [
      "city:Seoul",
      "activity:Shopping",
      "Reason:Price and Quality",
      "Reason:Timing and Distance",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "Most shops in korea accept card payment but keep in mind that apple pay is not common so make sure you bring your physical card for payment.",
        videoId: "tXJRRImjWi4",
      },
      {
        quote:
          "You really do not need cushion foundations. Most cushions only have three colors to choose from. They're more expensive for less product.",
        videoId: "QbIZOru-hJk",
      },
    ],
  },
  {
    id: "seoul-social-distance-and-cleanliness",
    title: "Seoul manners: give people space and keep it clean",
    summary:
      "Politeness in Seoul is less about small talk and more about not intruding. Keep your distance, watch the “indoor” rules, and don’t do anything that reads unhygienic.",
    tags: [
      "city:Seoul",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "Don't say hi to strangers because we Koreans don't really talk to strangers.",
        videoId: "GCL6LX0MAjs",
      },
    ],
  },
  {
    id: "seoul-transit-local-apps-literal-rules",
    title: "Seoul transit: switch to local apps and follow the rules literally",
    summary:
      "Seoul gets way easier once you stop fighting the system. Use local maps, make taxis painless with Korean addresses, and don’t ignore the posted rules.",
    tags: [
      "city:Seoul",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
      "Reason:Regulations",
    ],
    quotes: [
      {
        quote:
          "Taxi drivers do not speak english so make sure you show them the address of your destination in korean number.",
        videoId: "qlntCoEjEbQ",
      },
      {
        quote:
          "Google Maps does not work in Korea. I personally prefer using Naver map because it's more english friendly.",
        videoId: "tXJRRImjWi4",
      },
      {
        quote:
          "Taking any drinks on the bus is strictly prohibited and will get you kicked off.",
        videoId: "Fm8ohbqAMKA",
      },
    ],
  },
  {
    id: "seoul-unsafe-theft-plus-boundaries",
    title: "Seoul safety: don’t get lazy about security (or social boundaries)",
    summary:
      "Most of it is basic common sense—secure your stuff and don’t assume every “friendly” move lands well. Staying low-key keeps things smooth.",
    tags: [
      "city:Seoul",
      "activity:Unsafe Choices",
      "Reason:Safety Concerns",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "Never leave your bike unlocked in Korea. If you do this, don't be surprised if your bike gets stolen.",
        videoId: "Fm8ohbqAMKA",
      },
    ],
  },

  // -------------------------
  // Tokyo
  // -------------------------
  {
    id: "tokyo-planning-location-and-lockers",
    title: "Tokyo planning: pick a smart base and use lockers like a local",
    summary:
      "Where you stay changes everything in Tokyo. And if you skip coin lockers, you’ll waste time (and energy) dragging bags around.",
    tags: [
      "city:Tokyo",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
      "Reason:Price and Quality",
    ],
    quotes: [
      {
        quote:
          "Instead of breaking your back and carrying around your bags after shopping, just use one of these coin lockers.",
        videoId: "2HHv1AtwmEo",
      },
      {
        quote:
          "I wouldn't recommend an Airbnb. Just stay in a hotel for the best location.",
        videoId: "2HHv1AtwmEo",
      },
    ],
  },
  {
    id: "tokyo-shopping-procedural-spending",
    title: "Tokyo spending: don’t guess—follow the system",
    summary:
      "A lot of “simple” stuff in Tokyo has rules or etiquette attached. If you treat buying and eating like a procedure (not a vibe), you’ll avoid awkward moments and extra costs.",
    tags: [
      "city:Tokyo",
      "activity:Shopping",
      "Reason:Price and Quality",
      "Reason:Timing and Distance",
      "Reason:Cultural Misfits",
      "Reason:Regulations",
    ],
    quotes: [
      {
        quote:
          "Do not open your tax-free bags until you leave Japan. If you're caught at customs, you will need to pay the tax.",
        videoId: "mHoPSKu4QT8",
      },
    ],
  },
  {
    id: "tokyo-social-checklist-etiquette",
    title: "Tokyo etiquette: clean, considerate, and don’t make it weird",
    summary:
      "Most Tokyo “don’ts” are about hygiene and not inconveniencing other people. When in doubt, follow the signs and copy the calm energy around you.",
    tags: [
      "city:Tokyo",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
      "Reason:Timing and Distance",
    ],
    quotes: [
      {
        quote: "Number two, do not wear your shoes into changing rooms. ",
        videoId: "mHoPSKu4QT8",
      },
      {
        quote:
          "Don't go wild with Japanese toilet. (...) These signs exist for a reason, so sit the right way unless you want to go viral.",
        videoId: "Ri2vqt6m0TQ",
      },
    ],
  },
  {
    id: "tokyo-transit-protect-flow",
    title: "Tokyo transit: don’t break the flow",
    summary:
      "Tokyo runs smoothly when everyone plays their part. Keep it quiet, give people space, and don’t freestyle the train/taxi routines.",
    tags: [
      "city:Tokyo",
      "activity:Transit Mistakes",
      "Reason:Cultural Misfits",
      "Reason:Timing and Distance",
      "Reason:Overcrowding",
    ],
    quotes: [
      {
        quote:
          "Don't touch taxi doors. (...) Never wear your backpack the normal way on on crowded trains.",
        videoId: "Ri2vqt6m0TQ",
      },
      {
        quote: "Don't talk loudly on trains.",
        videoId: "xIGEgePw4Cw",
      },
    ],
  },

  // -------------------------
  // London
  // -------------------------
  {
    id: "london-attractions-curation-over-clubs",
    title: "London: don’t do sights on autopilot",
    summary:
      "Some “must-dos” are expensive and packed if you hit them at the wrong time. Be picky with what you pay for, and plan nightlife instead of skipping it by default.",
    tags: [
      "city:London",
      "activity:Attractions",
      "Reason:Price and Quality",
      "Reason:Overcrowding",
    ],
    quotes: [
      {
        quote:
          "It's in a super crowded and touristy area and the tickets are from 30 pounds per adult.",
        videoId: "MnXiCx4zkPU",
      },
      {
        quote:
          "#3 is not checking out the nightlife in London, (...) and my favorite club there was Cirque.",
        videoId: "kzNjmq63I_E,",
      },
    ],
  },
  {
    id: "london-planning-weekend-density-and-queues",
    title: "London planning: it’s a timing (and queue) game",
    summary:
      "Some spots really only pop on certain days, and getting around can take longer than you expect. Build your itinerary around peak days and line time.",
    tags: [
      "city:London",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "Uber's more limited. And the trains aren't always nearby like in New York.",
        videoId: "RPuZsC35mKk",
      },
      {
        quote:
          "The Notting Hill or brick lane market are really popping off only on the weekend so make sure you center your itinerary.",
        videoId: "kzNjmq63I_E",
      },
    ],
  },
  {
    id: "london-shopping-policy-and-autopilot-spend",
    title: "London spending: watch the fine print and the sneaky add-ons",
    summary:
      "The biggest traps aren’t dramatic—they’re assumptions and small charges. Check the rules (and your bill) so you don’t leak money without noticing.",
    tags: [
      "city:London",
      "activity:Shopping",
      "Reason:Regulations",
      "Reason:Price and Quality",
    ],
    quotes: [
      {
        quote:
          "Tipping is normal at restaurants in Europe and the US, but a lot of restaurants in London have a service charge already included in the bill. Make sure you check for it so you don't end up tipping twice.",
        videoId: "WOLrcR6yJyw",
      },
    ],
  },
  {
    id: "london-social-dont-perform-local",
    title: "London social: don’t try too hard to sound local",
    summary:
      "Forced local phrasing or the wrong gesture can land awkwardly. Keeping it neutral, polite, and chill works best.",
    tags: [
      "city:London",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
      "Reason:Price and Quality",
    ],
    quotes: [
      {
        quote:
          "Londoners never say things like London proper or downtown london so if you say those people won't know.",
        videoId: "5GzACwRHguc",
      },
      {
        quote:
          "Internationally, this is known as the peace sign, but if you turn around, you could offend some people here.",
        videoId: "WOLrcR6yJyw",
      },
    ],
  },
  {
    id: "london-transit-micro-frictions-stack",
    title: "London transit: tiny mistakes add up fast",
    summary:
      "London punishes “winging it” on the move. Know the flow (especially queues and escalators), and don’t assume a quick walk is always quick.",
    tags: [
      "city:London",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
      "Reason:Safety Concerns",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "If you block the way on the left side of the escalator you will have someone very quickly remind you to get out of the way.",
        videoId: "5GzACwRHguc",
      },
      {
        quote:
          "Do not skip the queue. The British people take so much pride in this queue",
        videoId: "nvTHBfZTld4",
      },
    ],
  },

  // -------------------------
  // Paris
  // -------------------------
  {
    id: "paris-attractions-postcard-traps",
    title: "Paris: don’t chase the postcard shot",
    summary:
      "The icons are great, but the “perfect photo” route can mean crowds and disappointment. Pick viewpoints and side trips with intention.",
    tags: [
      "city:Paris",
      "activity:Attractions",
      "Reason:Overcrowding",
      "Reason:Price and Quality",
      "Reason:Timing and Distance",
      "Reason:Cultural Misfits",
    ],
    quotes: [
      {
        quote:
          "If you only stay inside of Paris, you'll miss out on beautiful cities nearby that are just as beautiful like Versailles and Giverny.",
        videoId: "_WA-kBCxvMc",
      },
    ],
  },
  {
    id: "paris-planning-prebook-early-pace",
    title: "Paris planning: book ahead, start early",
    summary:
      "Paris is rough on last-minute plans. Lock in popular tickets early and avoid late starts if you don’t want your day eaten by lines.",
    tags: [
      "city:Paris",
      "activity:Inefficient Planning",
      "Reason:Timing and Distance",
      "Reason:Overcrowding",
    ],
    quotes: [
      {
        quote:
          "Don't wait until you arrive to get tickets to popular attractions, places like the Louvre or the top of Eiffel Tower.",
        videoId: "-wSYnQzZrWA",
      },
    ],
  },
  {
    id: "paris-shopping-tourist-meals-and-food-fear",
    title: "Paris spending: skip the tourist-trap meals",
    summary:
      "Some “experience” dining is overpriced for what you get. You’ll have a better time (and spend better) by eating more like a local and trying the classics.",
    tags: ["city:Paris", "activity:Shopping", "Reason:Price and Quality"],
    quotes: [
      {
        quote:
          "Don't sign up for one of those dinner cruises on the Seine River.",
        videoId: "-wSYnQzZrWA",
      },
    ],
  },
  {
    id: "paris-social-french-effort",
    title: "Paris: don’t assume English—try a little French",
    summary:
      "Even basic French changes the vibe. It cuts confusion and usually gets you a warmer response.",
    tags: [
      "city:Paris",
      "activity:Social Misconduct",
      "Reason:Cultural Misfits",
      "Reason:Timing and Distance",
    ],
    quotes: [
      {
        quote:
          "Don't expect everyone here to speak English. Try your French skills.",
        videoId: "doHwzBVkCSA",
      },
    ],
  },
  {
    id: "paris-transit-slow-modes-and-distraction",
    title: "Paris transit: don’t move slow and don’t look distracted",
    summary:
      "Time disappears fast if you rely on the slow options, and looking zoned out makes you an easy target. Move smart and stay aware.",
    tags: [
      "city:Paris",
      "activity:Transit Mistakes",
      "Reason:Timing and Distance",
      "Reason:Safety Concerns",
      "Reason:Price and Quality",
    ],
    quotes: [
      {
        quote:
          "The roads are busy and they're expensive. The public transport system is very well connected. Don't bother with cars or taxis.",
        videoId: "doHwzBVkCSA",
      },
    ],
  },
  {
    id: "paris-unsafe-pickpocket-baseline",
    title: "Paris safety: assume pickpockets and plan for it",
    summary:
      "Not paranoia—just habits. Keep valuables tight, don’t leave bags open, and stay extra alert in tourist-heavy spots.",
    tags: ["city:Paris", "activity:Unsafe Choices", "Reason:Safety Concerns"],
    quotes: [
      {
        quote:
          "Whilst the metro is generally safe, there is a bit of a pickpocketing problem, especially around tourist areas where pickpockets are looking for victims.",
        videoId: "Kr7PWSxwgd4",
      },
    ],
  },

  // -------------------------
  // New York City
  // -------------------------
  {
    id: "newyork-attractions-time-is-the-price",
    title: "NYC: the hidden cost of “iconic” is the line",
    summary:
      "A lot of famous stops are basically queue magnets (and not always worth it). If it’s iconic, check the time cost before you commit.",
    tags: [
      "city:New York City",
      "activity:Attractions",
      "Reason:Overcrowding",
      "Reason:Price and Quality",
    ],
    quotes: [
      {
        quote:
          "The Empire State Building may be iconic, but there are better observation decks. Instead, visit Top of the Rock or Summit. (...) Wall-street Bull is a big skit. Why? Because there's always long lines to take photos.",
        videoId: "i6tcnbseaBw",
      },
    ],
  },
  {
    id: "newyork-planning-times-square-peak-bottleneck",
    title: "NYC planning: don’t hit Times Square at peak hours",
    summary:
      "Times Square at the wrong time can wreck your whole day. Go early if you must—or skip it and save the energy.",
    tags: [
      "city:New York City",
      "activity:Inefficient Planning",
      "Reason:Overcrowding",
    ],
    quotes: [
      {
        quote:
          "Avoid peak tourist hours at Times Square and visit early mornings instead.",
        videoId: "hrqLIA1SWzs",
      },
    ],
  },
  {
    id: "newyork-shopping-convenience-tax",
    title: "NYC spending: convenience comes with a tourist tax",
    summary:
      "Default choices in NYC can get expensive fast—especially for where you stay and where you eat. A little intention goes a long way here.",
    tags: ["city:New York City", "activity:Shopping", "Reason:Price and Quality"],
    quotes: [
      {
        quote:
          "Save your money when in New York. (...) Hotels in Midtown cost three to four times the price of similar hotels outside of the city center.",
        videoId: "MEbEcv5hmfc",
      },
    ],
  },
  {
    id: "newyork-transit-system-build",
    title: "NYC transit: build a walk + subway routine (and skip the cabs)",
    summary:
      "NYC is easiest when you treat getting around like a system. Good shoes + smart subway use beats burning time and money on taxis.",
    tags: [
      "city:New York City",
      "activity:Transit Mistakes",
      "Reason:Price and Quality",
      "Reason:Timing and Distance",
    ],
    quotes: [
      {
        quote:
          "You'll be walking a lot after getting off the subway, so comfy kicks are a must.",
        videoId: "MEbEcv5hmfc",
      },
      {
        quote:
          "Getting from the airport to the city center via cab, it costs $100 and will save you a few minutes versus taking public transport for 11 bucks.",
        videoId: "MEbEcv5hmfc",
      },
    ],
  },
  {
    id: "newyork-unsafe-ambiguity-scams",
    title: "NYC safety: if it’s unclear, it’s probably a scam",
    summary:
      "The trap is confusion—“free” offers that suddenly aren’t free. If the interaction feels pushy or the deal isn’t clear, just leave.",
    tags: [
      "city:New York City",
      "activity:Unsafe Choices",
      "Reason:Safety Concerns",
    ],
    quotes: [
      {
        quote:
          "Don't get caught in these scams in Times Square or in any other city, but if you do, this is how you outsmart them.",
        videoId: "77Tcz8Jb7D0",
      },
    ],
  },
];
