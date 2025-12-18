export type Insight = {
  id: string;
  title: string;
  summary: string;
  tags?: string[];
  quotes: { quote: string; videoId: string }[];
};

export const insights: Insight[] = [
  // -------------------------
  // London
  // -------------------------
  {
    id: "london-attractions-curation-over-clubs",
    title: "London attractions pay off when you curate, not when you default",
    summary:
      "In London, Markets show up as a timing problem too—go at peak and the crowd becomes the experience. Also, not checking out the tourist nightlife is also not recommended",
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
    title: "London planning mistakes are mostly calendar + queue mistakes",
    summary:
      "Some places in London only feel “alive” on certain days (often weekends), and you have to plan efficiently since the transportation options are limited. In London, the real hack is picking the right day and playing the line culture correctly.",
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
    title: "London spending traps are policy surprises + autopilot purchases",
    summary:
      "London shopping DON’Ts repeatedly warn about VAT-refund assumptions post-Brexit and small “automatic” spends (still water, over-tipping) that add up. It’s not one big mistake—it’s default behavior leaking money.",
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
    title: "In London, don’t ‘perform local’—it reads louder than you think",
    summary:
      "London social DON’Ts point to awkward friction from forced local phrasing and offensive gestures. The safest strategy is neutral, polite communication and low-drama body language.",
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
    title: "London transit is a stack of micro-frictions that compound fast",
    summary:
      "London transit DON’Ts repeat the same pattern: map inaccuracies, underestimated walking/steps, confusing bridges, rideshare limits (and safety concerns), and flow rules like the correct escalator side. London rewards “flow literacy,” not brute-force walking.",
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
    title: "Paris icons underperform when you chase the postcard, not the plan",
    summary:
      "Paris attractions DON’Ts hit “icon fixation”: crowded front-of-building photo stops (Arc de Triomphe), Eiffel Tower viewpoints that disappoint from some angles, and treating the tower as the city’s center even though it’s far from other clusters.",
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
    title: "Paris punishes spontaneity: pre-book, go early, and pace yourself",
    summary:
      "Paris planning DON’Ts repeatedly warn that tickets can be booked out weeks ahead, buying Eiffel Tower tickets on-site creates long lines, and late starts (e.g., Sacré-Cœur after 9am) spike crowd stress. Summer adds a crowd-and-cost tax on top.",
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
    title:
      "Paris spending is best when it’s local—tourist meals and ‘food fear’ lose value",
    summary:
      "Paris shopping DON’Ts warn that tourist-targeted meals (like some Seine dinner cruises) can be overpriced and mediocre, and that avoiding typical French dishes out of unfamiliarity quietly reduces the whole trip’s payoff.",
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
    title:
      "In Paris, effort in French is a real travel skill (not just etiquette)",
    summary:
      "Paris social DON’Ts show friction when travelers expect English by default. Even basic French words act like a shortcut: less misunderstanding, smoother service, and a warmer response.",
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
    title: "Paris transit fails when you choose slow modes and look distracted",
    summary:
      "Paris transit DON’Ts cluster around time sinks (cars/taxis in traffic, time-limited group tours) and avoidable danger moments (using your phone near metro doors, attention-drawing behavior like whistling). The pattern: move smart and look alert.",
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
    title: "Paris safety DON’Ts treat pickpockets as the default environment",
    summary:
      "Paris unsafe-choice content frames pickpocketing as common, especially along tourist routes. The win isn’t paranoia—it’s consistent habits: tight valuables, low distraction, no open bags.",
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
  // New York
  // -------------------------
  {
    id: "newyork-attractions-time-is-the-price",
    title: "In NYC, time is the hidden ticket price for famous attractions",
    summary:
      "NYC attractions DON’Ts repeatedly flag queue magnets and hype mismatches: long lines at the bull, Statue of Liberty framed as overrated/too expensive, and Times Square shows labeled overrated. The dataset’s logic: if it’s iconic, audit the time cost first.",
    tags: [
      "city:New York",
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
    title: "NYC planning DON’T: schedule Times Square at peak hours",
    summary:
      "The dataset isolates one planning failure: Times Square during peak hours. In NYC, one crowd bottleneck can ripple into the rest of your day (missed reservations, longer transit, less time at everything else).",
    tags: [
      "city:New York",
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
    title: "NYC shopping DON’Ts: convenience becomes a ‘tourist rate’ tax",
    summary:
      "NYC spending DON’Ts concentrate on two autopilot choices: overpaying for hotels and eating at overpriced chains with poor quality. The city rewards specific picks and punishes default picks.",
    tags: ["city:New York", "activity:Shopping", "Reason:Price and Quality"],
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
    title:
      "NYC transit DON’Ts are really ‘system build’ failures: shoes + subway + fares",
    summary:
      "NYC transit DON’Ts repeat that movement is a system: bad footwear makes walking miserable, taxis are inefficient, and not using public transportation (or paying the wrong way) costs both time and money. The best NYC travelers design a walk + subway loop.",
    tags: [
      "city:New York",
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
    title: "NYC unsafe DON’Ts: ambiguity is the trap—scams monetize confusion",
    summary:
      "NYC unsafe-choice DON’Ts cluster around ‘free’ offers that turn into demands (bracelets, mixtapes, costume photos) and risky street behavior like bike-lane confusion. The dataset’s rule: if the transaction is unclear, leave.",
    tags: [
      "city:New York",
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

  // -------------------------
  // Seoul
  // -------------------------
  {
    id: "seoul-planning-season-savings-paperwork",
    title: "Seoul planning DON’Ts are season, savings, and compliance",
    summary:
      "Seoul planning DON’Ts point to peak season pressure (autumn/spring crowds and higher prices), missed savings (not knowing climate cards), and misunderstanding entry rules like K-ETA (including that it can be free for some countries).",
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
      "Seoul shopping DON’Ts: stop paying for hype—pay for unique local value",
    summary:
      "Seoul shopping DON’Ts cluster around expectation mismatches: Apple Pay isn’t widely accepted, some makeup categories feel overpriced for what you get, and global brands don’t deliver Seoul-specific advantage. The dataset nudges you toward what’s hard to get elsewhere.",
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
    title: "In Seoul, respect is distance + cleanliness, not small talk",
    summary:
      "Seoul social DON’Ts repeatedly warn against talking to strangers, staring, wearing shoes indoors, and handling cash in ways seen as unhygienic. The dataset frames politeness as ‘don’t intrude, don’t contaminate.’",
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
    title: "Seoul transit DON’Ts: adopt local apps and follow literal rules",
    summary:
      "Seoul transit mistakes cluster around not using Naver/Kakao maps, taxi language friction, using the wrong taxi door side, and breaking explicit rules like drinking on the bus. Seoul becomes easy the moment you switch to the local operating system.",
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
    title: "Seoul unsafe DON’Ts mix theft prevention with boundary mistakes",
    summary:
      "Seoul unsafe-choice content combines physical risk (unlocked bikes get stolen) with social risk (unsolicited food to strangers can be disrespectful). The dataset treats safety as both security and social correctness.",
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
    title:
      "Tokyo planning DON’Ts are logistics: where you sleep and where you store your bag",
    summary:
      "Tokyo planning DON’Ts emphasize that hotel location sets your daily friction, and skipping coin lockers turns movement into an avoidable cost problem. Tokyo rewards travelers who treat the city like a routing puzzle.",
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
    title: "Tokyo spending DON’Ts: buying is procedural, not instinctive",
    summary:
      "Tokyo shopping DON’Ts cluster around embedded systems and norms: ramen queues waste time, vending machines require color cues, tax-free bags have rule implications, tipping is rude, and eating while walking is socially awkward. In Tokyo, ‘spend well’ means ‘follow the procedure.’",
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
    title:
      "Tokyo etiquette DON’Ts read like a checklist: hygiene, space, and signals",
    summary:
      "Tokyo social DON’Ts are concrete: footwear rules in changing rooms, showering before onsen, not pointing at animals, backpack etiquette, and correct toilet use. The dataset frames Tokyo manners as ‘be clean and don’t inconvenience others.’",
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
    title: "Tokyo transit DON’Ts: protect flow—quiet, space, and clear signals",
    summary:
      "Tokyo transit DON’Ts overwhelmingly focus on not disrupting flow: loud talking, hogging space, ignoring escalator rules, misunderstanding out-of-service trains, and even touching taxi doors (they’re automatic). The city is smooth when you stop improvising.",
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
];
