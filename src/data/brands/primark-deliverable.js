import primarkBase from './primark.js';
import osRun from '../intel/primark/2026-04-26-os-run.md?raw';
import brandArchaeology from '../intel/primark/stage1-agent-1-brand-archaeology.md?raw';
import categoryEvolution from '../intel/primark/stage1-agent-3-category-evolution.md?raw';
import audienceIntelligence from '../intel/primark/stage1-agent-4-audience-intelligence.md?raw';
import competitiveLandscape from '../intel/primark/stage1-agent-5-competitive-landscape.md?raw';
import culturalCurrents from '../intel/primark/stage1-agent-6-cultural-currents.md?raw';
import deepCulture from '../intel/primark/stage1-agent-7-deep-culture.md?raw';

const strategicBrief = {
  headline: "Make value feel easier to defend.",
  recommendation: "Sail first to the territories where Primark can turn low price into dignity: protect the store hunt, own the in-between youth gap, and make adaptive everyday clothing a mainstream proof point.",
  sequencing: [
    "Start with The Treasure Hunt Store because it protects the core behaviour people already have.",
    "Build The In-Between Generation next because Primark Scene gives the brand a named youth platform before competitors do.",
    "Scale Adaptive Everyday as the credibility move because it proves access is not just about price.",
  ],
  brandNarrative: "Over the next 18-24 months, Primark should become the brand that makes cheap feel less apologetic: easier to find, easier to wear, easier to explain, and easier to feel good about.",
};

const riskFlags = [
  {
    territory: "Sustainability and overconsumption",
    risk: "If Primark talks too much about sustainability without acknowledging volume, people will hear corporate laundering rather than useful progress.",
    mitigation: "Use plain proof: better materials, repair, durability, traceability, and fewer vague virtue claims.",
  },
  {
    territory: "Store experience",
    risk: "The treasure hunt can tip from joyful chaos into stressful mess.",
    mitigation: "Keep the bargain thrill, but use clearer zones, stock signals, and creator-led navigation to make the trip feel winnable.",
  },
  {
    territory: "Inclusive products",
    risk: "Adaptive fashion can be rejected if it feels like PR or medical special-casing.",
    mitigation: "Let disabled creators and shoppers demonstrate the product in everyday life, with fit, price, and use cases first.",
  },
];

const extraSources = [
  { id: "digital-careers", label: "Primark digital careers", url: "https://careers.primark.com/en/digital" },
  { id: "supply-chain-careers", label: "Primark supply chain careers", url: "https://careers.primark.com/en/supply-chain" },
];

const islandEnhancements = {
  "treasure-hunt-store": {
    publicSignal: {
      summary: "The persona people perform is practical: they are just going in for basics or a quick bargain.",
      verbatim: [
        "People publicly frame Primark as cheap, useful and normalised high-street value. [PUBLIC - Reddit, r/AskUK]",
        "Local threads describe Primark as a busy town-centre fixture rather than a niche fashion destination. [PUBLIC - Reddit, r/Belfast]",
      ],
      platforms: ["Reddit", "Store floor", "TikTok"],
    },
    privateTruth: {
      summary: "The reality they live is more emotional: the messy hunt is part of the reward, but only if it still feels like they won.",
      verbatim: [
        "Community discussion keeps returning to the chaos, crowds and variable quality as part of the Primark bargain. [PRIVATE - Reddit, r/AskUK]",
        "The same shoppers criticise the experience while still treating the store as useful and unavoidable. [PRIVATE - Reddit, r/Belfast]",
      ],
      platforms: ["Reddit"],
    },
    gapStatement: "They say they are popping in for cheap basics, but what they want is the private little high of beating the system without looking foolish.",
    mediaHabitat: {
      primaryPlatform: "TikTok and the store floor",
      formatFamily: "Shop-with-me walkthroughs, finds of the week, basket reveal, queue-to-win edits",
      creatorLandscape: "Budget haulers, student shoppers, mum creators, everyday city-centre shoppers",
      activationPattern: "Make each store trip feel navigable: maps, weekly finds, creator-led routes, and price-led discoveries.",
    },
    creativeBrief: {
      theTerritory: "The Treasure Hunt Store is the ritual of entering a cheap, crowded shop and leaving with a story. It lives on the shop floor, in haul videos, and in local Reddit threads where people complain and recommend it in the same breath.",
      theHuman: "She says she only needs socks, school bits, a basic tee. But she walks the aisles like a small game is happening: can she find the one surprisingly good thing before the chaos becomes too much?",
      theEnemy: "The lie that low price has to feel low-status, joyless, or embarrassing.",
      theTask: "Make the Primark trip feel like a small public win instead of a private compromise.",
      emotionalArc: {
        arrest: "Open on the absurdity of the mission: one basket, one budget, one chaotic store.",
        middle: "Hold on the hunt: near-misses, price reveals, the moment of finding something weirdly good.",
        resolve: "Land on the win: the total is low, the find is real, and the shopper feels clever rather than cheap.",
      },
      theEmotion: "Joy",
      theIncongruence: "A chaotic budget retailer becomes the place where shoppers feel briefly lucky, skilled, and in control.",
      earnedReason: "Primark's own store-first model and community conversation both prove the hunt is already the behaviour to protect.",
      proof: [
        "Primark says physical stores and joyful social shopping sit at the centre of the model. [who-we-are]",
        "Community discussion frames the store as cheap, chaotic and still worth visiting. [askuk]",
        "Local Reddit discussion shows the store remains a city-centre social reference point. [belfast]",
      ],
      landmines: [
        "Do not make the store look too polished or premium; it kills the bargain thrill.",
        "Do not ignore the stress of queues, mess and crowds.",
        "Do not overclaim quality; show the actual find and the actual price.",
      ],
      oneSentence: "Turn the messy Primark trip into proof that finding value is a skill.",
    },
  },
  "in-between-generation": {
    publicSignal: {
      summary: "The persona they perform is individuality: they want clothes that feel grown-up, expressive and self-authored.",
      verbatim: [
        "Primark describes Scene as serving the in-between generation with a youth-focused label. [PUBLIC - Primark corporate]",
        "Youth styling content publicly performs confidence, taste and self-definition. [PUBLIC - TikTok/Instagram pattern]",
      ],
      platforms: ["TikTok", "Instagram", "In-store"],
    },
    privateTruth: {
      summary: "The reality they live is social limbo: they are trying not to look childish, copied, ignored, or priced out.",
      verbatim: [
        "The product launch names a gap between kidswear and adult fashion rather than just a trend gap. [PRIVATE - inferred from Primark Scene brief]",
        "The tension is not only style; it is the embarrassment of being visibly between categories. [PRIVATE - Stage 1 synthesis]",
      ],
      platforms: ["Peer groups", "Store floor", "TikTok comments"],
    },
    gapStatement: "They say they want individual style, but what they need is a way to be in-between without feeling exposed.",
    mediaHabitat: {
      primaryPlatform: "TikTok, Instagram and in-store youth zones",
      formatFamily: "GRWM, outfit checks, rack-to-look edits, peer styling challenges",
      creatorLandscape: "Teen creators, older-sibling stylists, school/college micro-creators",
      activationPattern: "Build Scene as a navigation system for social transition: not kidswear, not adult cosplay, just where they are now.",
    },
    creativeBrief: {
      theTerritory: "The In-Between Generation is the awkward life stage where clothing categories fail before people do. It lives between kidswear and adult fashion, and Primark has already named it through Scene.",
      theHuman: "They stand in the shop with a body, budget and social life changing faster than the rails can explain. They do not want to be styled by adults, but they do not want to be left alone with the wrong category either.",
      theEnemy: "The cultural lie that growing up should be seamless, stylish and easy to buy for.",
      theTask: "Give young shoppers a style language for the phase nobody usually designs for.",
      emotionalArc: {
        arrest: "Show the cringe of being sent to the wrong section.",
        middle: "Hold on the relief of finding clothes that understand the transition.",
        resolve: "Land on belonging: not older, not younger, exactly here.",
      },
      theEmotion: "Belonging",
      theIncongruence: "A mass-value retailer becomes the first brand to treat awkward transition as a real style moment.",
      earnedReason: "Primark Scene is already built around this specific underserved generation, so the brand has product proof before campaign language.",
      proof: [
        "Primark launched Scene for the in-between generation. [scene]",
        "The territory solves identity friction rather than only a sizing issue. [2026 Primark OS run]",
        "Primark's value position lets young shoppers experiment without high financial risk. [who-we-are]",
      ],
      landmines: [
        "Do not sound like adults explaining youth culture back to young people.",
        "Do not make it a generic Gen Z trend board.",
        "Do not collapse the territory into kidswear, schoolwear or adult fashion.",
      ],
      oneSentence: "Make the awkward middle of growing up feel like its own style era.",
    },
  },
  "adaptive-everyday": {
    publicSignal: {
      summary: "The persona people perform is inclusion and representation: adaptive fashion should offer visible choice.",
      verbatim: [
        "Primark publicly commits to making adaptive fashion more accessible and affordable. [PUBLIC - Primark corporate]",
        "The adaptive swimwear launch frames inclusion as a high-street first. [PUBLIC - Primark corporate]",
      ],
      platforms: ["Press", "Instagram", "Advocacy media"],
    },
    privateTruth: {
      summary: "The reality they live is practical dignity: people need clothes that work without making their body the problem.",
      verbatim: [
        "The product evidence points to functional needs: easier dressing, fit adaptation and swimwear access. [PRIVATE - product proof]",
        "The real emotional prize is independence and not being special-cased. [PRIVATE - Stage 1 synthesis]",
      ],
      platforms: ["Advocacy communities", "Carer networks", "Product reviews"],
    },
    gapStatement: "They say adaptive fashion is about inclusion, but the deeper need is to get dressed without the world turning your body into extra admin.",
    mediaHabitat: {
      primaryPlatform: "Instagram, YouTube and store education",
      formatFamily: "Fit demos, day-in-the-life try-ons, feature explanations, carer/shopper guides",
      creatorLandscape: "Disabled creators, adaptive designers, carers, occupational-therapy adjacent educators",
      activationPattern: "Let real users demonstrate everyday independence: seams, fastenings, seated fit, swim access, price.",
    },
    creativeBrief: {
      theTerritory: "Adaptive Everyday is not special occasion inclusion. It is normal clothing redesigned so more people can get dressed, swim, shop and move through the day without apology.",
      theHuman: "She is not looking for a campaign about bravery. She is trying to buy clothes that fit her actual morning: sitting, dressing, fastening, washing, changing, moving, being seen and then not being stared at.",
      theEnemy: "The cultural condition that treats accessibility as niche, medical, expensive or inspirational.",
      theTask: "Make adaptive clothing feel ordinary in the best possible way.",
      emotionalArc: {
        arrest: "Start with the tiny clothing frustrations most fashion ignores.",
        middle: "Show the design working quietly: seated fit, easy fastenings, normal styling, real price.",
        resolve: "Land on relief and pride: the product disappears into life because it works.",
      },
      theEmotion: "Relief",
      theIncongruence: "A cheap high-street giant earns emotional credibility by making inclusion practical rather than precious.",
      earnedReason: "Primark has shipped adaptive lingerie, broader adaptive pieces, and adaptive swimwear, giving it product proof rather than just purpose language.",
      proof: [
        "Primark pledged to make adaptive fashion more accessible and affordable. [adaptive]",
        "Primark launched adaptive swimwear on the UK high street. [adaptive-swim]",
        "The brand promise is broad access to affordable everyday essentials. [who-we-are]",
      ],
      landmines: [
        "Do not make disabled shoppers inspirational props.",
        "Do not lead with brand virtue before product usefulness.",
        "Do not hide the functional details; they are the emotional proof.",
      ],
      oneSentence: "Make adaptive fashion so normal that the relief is the story.",
    },
  },
};

const genericEnhancements = {
  "performance-without-tax": {
    gapStatement: "They say they want performance kit, but they really want permission to move without paying a confidence tax.",
    mediaHabitat: {
      primaryPlatform: "TikTok, Instagram and in-store performance zones",
      formatFamily: "Sweat tests, squat-proof checks, first-week fitness diaries, price reveal reviews",
      creatorLandscape: "Everyday fitness creators, walkers, beginners, budget gym reviewers",
      activationPattern: "Prove function first, reveal price second, keep the body language everyday rather than elite.",
    },
  },
  "pinterest-home-reset": {
    gapStatement: "They say they want home inspiration, but what they need is a cheap visible sign that life is a bit more together.",
    mediaHabitat: {
      primaryPlatform: "Pinterest and Instagram",
      formatFamily: "Before/after room resets, shoppable boards, tiny corner transformations, basket-to-room edits",
      creatorLandscape: "Budget decorators, renters, family home creators, small-space stylists",
      activationPattern: "Turn each aesthetic trend into a low-cost room recipe with Click & Collect support.",
    },
  },
  "click-and-collect-bridge": {
    gapStatement: "They say they want online shopping, but mostly they want not to waste a trip.",
    mediaHabitat: {
      primaryPlatform: "Primark web, email and store signage",
      formatFamily: "Stock-check explainers, pick-up guides, basket planning, trip-saving edits",
      creatorLandscape: "Practical shoppers, parents, commuters, local deal finders",
      activationPattern: "Frame Click & Collect as a trip-saving tool, not a compromised e-commerce substitute.",
    },
  },
  "value-basics": {
    gapStatement: "They say they are being sensible, but the real relief is not having to think too hard about a necessary purchase.",
    mediaHabitat: {
      primaryPlatform: "Store, web and family-budget content",
      formatFamily: "Best basics lists, wear tests, price ladders, household refill guides",
      creatorLandscape: "Budget family creators, practical reviewers, students, renters",
      activationPattern: "Use reliability proof and price clarity rather than lifestyle theatre.",
    },
  },
  "dupe-hunt": {
    gapStatement: "They say it is just a cheaper alternative, but the real pleasure is getting the look without accepting the hierarchy.",
    mediaHabitat: {
      primaryPlatform: "TikTok and Instagram Reels",
      formatFamily: "Dupe comparisons, blind price reveals, wear tests, shop-floor discoveries",
      creatorLandscape: "Value beauty creators, haul creators, comparison reviewers",
      activationPattern: "Make the price reveal the punchline, then let creators test what genuinely holds up.",
    },
  },
};

const enhancedIslands = primarkBase.islands.map(island => ({
  ...island,
  ...(genericEnhancements[island.id] || {}),
  ...(islandEnhancements[island.id] || {}),
}));

function renderList(items = []) {
  return items.map(item => `- ${item}`).join("\n");
}

function renderStage2TerritoryMap(islands) {
  return `# Stage 2 Agent: Territory Map Compiler

## Role
This output translates the Stage 2 map payload into a ranked cultural territory readout.

## Ranked Cultural Islands

${islands.map((island, index) => `### ${index + 1}. ${island.name}
- **Tier:** ${island.tier}
- **Score:** ${island.score}
- **Novelty distance:** ${island.noveltyDistance || "Not specified"}
- **Competitive space:** ${island.competitiveSpace || "Not specified"}
- **Status:** ${island.status || "Not specified"}
- **Growth:** ${island.growth || "Not specified"}
- **Window:** ${island.window || "Not specified"}
- **Emotional journey:** ${island.emotionalJourney || island.brandNarrative || "Not specified"}
- **Gap statement:** ${island.gapStatement || "Not specified"}`).join("\n\n")}

## Read
The immediate opportunity cluster is concentrated around value with dignity: making the store trip feel winnable, making transitional youth style feel seen, and making adaptive clothing feel ordinary and affordable.`;
}

function renderStage2Metrics(islands) {
  return `# Stage 2 Agent: Strategic Metrics

## Role
This output captures the scoring, prioritisation, and risk logic behind the Stage 2 territory map.

## Scorecard

${islands.map(island => `### ${island.name}
- **Total score:** ${island.score}
- **Tier:** ${island.tier}
- **Status:** ${island.status || "Not specified"}
${island.scoring ? Object.entries(island.scoring).map(([key, value]) => `- **${key.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}:** ${value}`).join("\n") : "- **Scoring detail:** Not specified"}
${island.sayDo ? `- **Say / Do gap:** ${island.sayDo.gap}/100` : "- **Say / Do gap:** Not specified"}`).join("\n\n")}

## Risk Flags

${riskFlags.map(risk => `### ${risk.territory}
- **Risk:** ${risk.risk}
- **Mitigation:** ${risk.mitigation}`).join("\n\n")}`;
}

function renderStage2MediaHabitat(islands) {
  return `# Stage 2 Agent: Media Habitat and Community Activation

## Role
This output makes each island usable by mapping where it should live, who can carry it, and what formats fit the behaviour.

${islands.filter(island => island.mediaHabitat || island.contentStrategy || island.community).map(island => `### ${island.name}
${island.community ? `- **Community:** ${island.community.name || "Not specified"}${island.community.members ? ` — ${island.community.members}` : ""}` : "- **Community:** Not specified"}
${island.mediaHabitat ? `- **Primary platform:** ${island.mediaHabitat.primaryPlatform}
- **Format family:** ${island.mediaHabitat.formatFamily}
- **Creator landscape:** ${island.mediaHabitat.creatorLandscape}
- **Activation pattern:** ${island.mediaHabitat.activationPattern}` : "- **Media habitat:** Not specified"}
${island.contentStrategy?.formats ? `- **Formats:** ${island.contentStrategy.formats.join(", ")}` : ""}
${island.contentStrategy?.platforms ? `- **Platforms:** ${island.contentStrategy.platforms.join(", ")}` : ""}
${island.contentStrategy?.pathToTrust ? `- **Path to trust:** ${island.contentStrategy.pathToTrust}` : ""}`).join("\n\n")}`;
}

function renderStage2CreativeBriefs(islands) {
  return `# Stage 2 Agent: Creative Brief Extractor

## Role
This output turns the strongest Stage 2 islands into early creative briefing material.

${islands.filter(island => island.creativeBrief).slice(0, 3).map(island => {
    const brief = island.creativeBrief;
    return `### ${island.name}
- **The territory:** ${brief.theTerritory || "Not specified"}
- **The human:** ${brief.theHuman || "Not specified"}
- **The enemy:** ${brief.theEnemy || "Not specified"}
- **The task:** ${brief.theTask || "Not specified"}
- **The emotion:** ${brief.theEmotion || "Not specified"}
- **The incongruence:** ${brief.theIncongruence || "Not specified"}
- **Earned reason:** ${brief.earnedReason || "Not specified"}

#### Emotional Arc
- **Arrest:** ${brief.emotionalArc?.arrest || "Not specified"}
- **Hold:** ${brief.emotionalArc?.middle || "Not specified"}
- **Resolve:** ${brief.emotionalArc?.resolve || "Not specified"}

#### Proof
${renderList(brief.proof)}

#### What Would Kill This
${renderList(brief.landmines)}

> ${brief.oneSentence || island.brandNarrative || ""}`;
  }).join("\n\n")}`;
}

const stage2Intel = [
  {
    id: "stage2-agent-territory-map",
    stage: "Stage 2",
    agent: "Territory Map Compiler",
    title: "Territory Map Compiler",
    body: renderStage2TerritoryMap(enhancedIslands),
  },
  {
    id: "stage2-agent-strategic-metrics",
    stage: "Stage 2",
    agent: "Strategic Metrics",
    title: "Strategic Metrics",
    body: renderStage2Metrics(enhancedIslands),
  },
  {
    id: "stage2-agent-media-habitat",
    stage: "Stage 2",
    agent: "Media Habitat",
    title: "Media Habitat and Community Activation",
    body: renderStage2MediaHabitat(enhancedIslands),
  },
  {
    id: "stage2-agent-creative-briefs",
    stage: "Stage 2",
    agent: "Creative Brief Extractor",
    title: "Creative Brief Extractor",
    body: renderStage2CreativeBriefs(enhancedIslands),
  },
];

const fullIntel = [
  {
    id: "os-run-synthesis",
    stage: "Stage 1+2",
    agent: "OS Synthesis",
    title: "OS Run Synthesis",
    date: "2026-04-26",
    body: osRun,
  },
  ...stage2Intel,
  {
    id: "stage1-agent-1-brand-archaeology",
    stage: "Stage 1",
    agent: "Agent 1",
    title: "Brand Archaeology",
    body: brandArchaeology,
  },
  {
    id: "stage1-agent-3-category-evolution",
    stage: "Stage 1",
    agent: "Agent 3",
    title: "Category Evolution",
    body: categoryEvolution,
  },
  {
    id: "stage1-agent-4-audience-intelligence",
    stage: "Stage 1",
    agent: "Agent 4",
    title: "Audience Intelligence",
    body: audienceIntelligence,
  },
  {
    id: "stage1-agent-5-competitive-landscape",
    stage: "Stage 1",
    agent: "Agent 5",
    title: "Competitive Landscape",
    body: competitiveLandscape,
  },
  {
    id: "stage1-agent-6-cultural-currents",
    stage: "Stage 1",
    agent: "Agent 6",
    title: "Cultural Currents",
    body: culturalCurrents,
  },
  {
    id: "stage1-agent-7-deep-culture",
    stage: "Stage 1",
    agent: "Agent 7",
    title: "Deep Culture",
    body: deepCulture,
  },
];

function mergeSources(sources = []) {
  const existingIds = new Set(sources.map(source => source.id));
  return [
    ...sources,
    ...extraSources.filter(source => !existingIds.has(source.id)),
  ];
}

const primarkDeliverable = {
  ...primarkBase,
  strategicBrief,
  riskFlags,
  fullIntel,
  sources: mergeSources(primarkBase.sources),
  islands: enhancedIslands,
};

export default primarkDeliverable;
