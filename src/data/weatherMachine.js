const DEFAULT_COORDINATES = [
  [315, 220],
  [520, 170],
  [700, 250],
  [250, 405],
  [500, 365],
  [735, 430],
  [370, 585],
  [595, 610],
  [835, 590],
  [155, 625],
];

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function normaliseIsland(island, index) {
  const [defaultX, defaultY] = DEFAULT_COORDINATES[index % DEFAULT_COORDINATES.length];
  const incongruence = island.maya?.incongruence ?? island.incongruenceScore;
  const noveltyDistance = island.noveltyDistance || (incongruence >= 7 ? 'unexplored' : 'familiar');

  return {
    id: island.id || slugify(island.name || `island-${index + 1}`),
    rank: island.rank ?? index + 1,
    tier: island.tier || (index < 3 ? 1 : index < 7 ? 2 : 2),
    score: island.score ?? Math.max(60, 100 - index * 4),
    noveltyDistance,
    competitiveSpace: island.competitiveSpace || (index < 3 ? 'zero' : 'contested'),
    mapX: island.mapX ?? defaultX,
    mapY: island.mapY ?? defaultY,
    ...island,
  };
}

export function buildWeatherMachineBrand(baseBrand, run) {
  const islands = (run.islands || []).map(normaliseIsland);

  return {
    ...baseBrand,
    meta: {
      ...baseBrand.meta,
      ...run.meta,
      methodology: run.meta?.methodology || 'Strange Weather OS - Weather Machine Run',
    },
    weatherMachine: {
      version: run.version,
      runId: run.runId,
      strategicNarrative: run.strategicNarrative,
      archipelagoMatrix: run.archipelagoMatrix,
      creativeDirectives: run.creativeDirectives,
      recommendations: run.recommendations,
      contradictions: run.contradictions,
      verificationCodes: run.verificationCodes,
      rawIntel: run.fullIntel,
    },
    insights: run.insights || baseBrand.insights || [],
    sources: run.sources || baseBrand.sources || [],
    strategicBrief: run.strategicBrief,
    riskFlags: run.riskFlags || [],
    islands,
    fullIntel: run.fullIntel || [],
  };
}
