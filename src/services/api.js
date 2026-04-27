// API service for generating island data
// Falls back gracefully when API keys aren't available

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const ISLAND_GENERATION_PROMPT = (query) => `You are a cultural intelligence analyst for a brand strategy tool. Generate a JSON array of 18-22 cultural interest territories/communities associated with the brand or product: "${query}".

CRITICAL: Include a mix of:
- 5-7 OBVIOUS adjacencies (the core communities clearly associated with this brand)
- 4-6 MEDIUM-DISTANCE connections (adjacent lifestyle/interest areas)  
- 4-6 SURPRISING/NON-OBVIOUS connections (unexpected audiences who actually care about this — these are the most valuable insights)

For "${query}", think carefully about:
- Who uses this product beyond the obvious audience?
- What life situations create the same need this product addresses?
- What cultural movements align with this brand's values (positively or negatively)?
- Which communities would be receptive vs resistant?

Return ONLY a valid JSON array, no markdown, no explanation. Each object must have exactly these fields:

{
  "id": "unique-kebab-case-id",
  "name": "Community Name (like a subreddit or interest group name)",
  "platformSource": "reddit|instagram|tiktok|youtube|facebook|twitter",
  "platformId": "r/SubredditName or platform handle",
  "category": "Broad category (e.g. Fitness & Running, Fashion & Style, Healthcare, Lifestyle)",
  "position": {
    "relevanceScore": 0.0-1.0,
    "x": -300 to 300 (organic positioning, not grid),
    "y": -300 to 300
  },
  "size": {
    "communitySize": realistic integer (1000 to 5000000),
    "activeParticipants": realistic integer (1-15% of communitySize),
    "normalizedScale": 0.2-1.0 (relative to largest island)
  },
  "ecosystem": {
    "receptivityScore": 0.0-1.0 (0=hostile/unaware, 1=brand champions),
    "sentiment": {"positive": 0.0-1.0, "neutral": 0.0-1.0, "negative": 0.0-1.0},
    "brandRank": 1-20 (where this brand ranks among brands discussed),
    "growthTrend": "growing|stable|declining"
  },
  "topBrands": [
    {"name": "Brand Name", "shareOfVoice": 0.0-1.0, "isSearchedBrand": true/false}
  ],
  "topics": [
    {"term": "topic word/phrase", "frequency": 0.0-1.0, "sentiment": 0.0-1.0}
  ],
  "contentOpportunity": {
    "summary": "2-3 sentences about this community and why/how the brand is relevant",
    "angles": ["Specific content idea 1", "Specific content idea 2", "Specific content idea 3", "Specific content idea 4"],
    "avoid": ["Thing to avoid 1", "Thing to avoid 2"],
    "recommendedFormats": ["format1", "format2"],
    "bestPlatforms": ["platform1", "platform2"]
  },
  "sampleConversations": [
    {"text": "Realistic anonymised post/comment that someone in this community might write", "sentiment": "positive|neutral|negative", "engagement": realistic integer}
  ]
}

Make the data feel real and insightful. The surprising connections should be genuinely surprising but logical in retrospect. Include ${Math.floor(Math.random() * 3) + 3} surprising non-obvious communities.`;

export async function generateIslands(query) {
  // Try Anthropic first, then OpenAI, then fail gracefully
  
  if (ANTHROPIC_API_KEY) {
    try {
      return await generateWithAnthropic(query);
    } catch (e) {
      console.warn('Anthropic API failed, trying OpenAI:', e.message);
    }
  }
  
  if (OPENAI_API_KEY) {
    try {
      return await generateWithOpenAI(query);
    } catch (e) {
      console.warn('OpenAI API failed:', e.message);
    }
  }
  
  throw new Error('No API available for data generation');
}

async function generateWithAnthropic(query) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 8000,
      messages: [{
        role: 'user',
        content: ISLAND_GENERATION_PROMPT(query)
      }]
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic API error: ${response.status} - ${err}`);
  }
  
  const data = await response.json();
  const text = data.content[0].text;
  
  return parseIslandJSON(text, query);
}

async function generateWithOpenAI(query) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 8000,
      messages: [{
        role: 'user',
        content: ISLAND_GENERATION_PROMPT(query)
      }],
      response_format: { type: 'json_object' }
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${err}`);
  }
  
  const data = await response.json();
  let text = data.choices[0].message.content;
  
  // OpenAI with json_object mode might wrap in an object
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return normalizeIslands(parsed, query);
    // Try to find array in the object
    const arr = Object.values(parsed).find(v => Array.isArray(v));
    if (arr) return normalizeIslands(arr, query);
  } catch {}
  
  return parseIslandJSON(text, query);
}

function parseIslandJSON(text, query) {
  // Try to extract JSON array from text
  const match = text.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON array found in response');
  
  const islands = JSON.parse(match[0]);
  if (!Array.isArray(islands)) throw new Error('Response is not an array');
  
  return normalizeIslands(islands, query);
}

function normalizeIslands(islands, query) {
  // Normalize scales so the largest island = 1.0
  const maxSize = Math.max(...islands.map(i => i.size?.communitySize || 1));
  const minSize = Math.min(...islands.map(i => i.size?.communitySize || 1));
  const sizeRange = maxSize - minSize;
  
  return islands.map(island => ({
    ...island,
    size: {
      ...island.size,
      normalizedScale: sizeRange > 0 
        ? 0.3 + 0.7 * ((island.size?.communitySize - minSize) / sizeRange)
        : 0.5
    }
  }));
}
