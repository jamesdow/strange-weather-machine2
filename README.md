# Cultural Territory Mapper

**By Landfall — Elastic Brands methodology**

An interactive map-style tool that visualises where a brand lives in online culture. Islands in a dark ocean, each representing a cultural territory.

## What it does

Search any brand and see an archipelago where:
- **Island SIZE** = community/audience volume
- **Island DISTANCE from centre** = relevance to the brand
- **Island COLOUR** = brand receptivity (sandy brown = hostile/unaware → lush green = brand champion)

Click any island for deep strategic insight: metrics, top brands, topic cloud, content opportunities, sample conversations.

## Demo brands (instant, no API needed)

- **Hoka sneakers** — includes the nursing community, gorpcore, dog walkers, festival culture, dad fashion
- **Chanel** — luxury fashion, French culture, vintage collectors, sustainability critics
- **Guinness** — Irish pub culture, craft beer, sports fans, gaming communities, food pairing

## Custom brands (requires OpenAI key)

Add your OpenAI API key to `.env` as `VITE_OPENAI_API_KEY` and search any brand.

## Running locally

```bash
cd mapper
npm install
npm run dev
```

Or to serve the built version:
```bash
./start.sh
```

## Exposing publicly

```bash
cloudflared tunnel --url http://localhost:4173 --no-autoupdate
```

## Tech stack

- React + Vite
- SVG-based map rendering (no canvas library)
- Seeded procedural island shapes (noise-based coastlines)
- Pan/zoom via CSS transforms (GPU accelerated)
- OpenAI GPT-4o for live brand data generation
- Cloudflare Quick Tunnels for public access

## v0.2 wishlist

- Real API integrations (Reddit, TikTok, Instagram)
- Animated ocean (subtle wave motion)
- Connection lines between related islands
- Minimap overview
- Time-series view (how territories evolve)
- Comparison mode (two brands)
- Export as PDF/image
- Mobile touch gestures
- Named Cloudflare tunnel (persistent URL)
- Netlify/Vercel deploy for permanent hosting
