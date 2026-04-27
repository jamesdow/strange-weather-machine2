// Pre-loaded island data for demo brands
// These work without any API key

export const PRESET_DATA = {
  "hoka sneakers": {
    query: "Hoka sneakers",
    islands: [
      {
        id: "running-enthusiasts",
        name: "Running Shoe Enthusiasts",
        platformSource: "reddit",
        platformId: "r/RunningShoeGeeks",
        category: "Fitness & Running",
        position: { relevanceScore: 0.92, x: 80, y: -60 },
        size: { communitySize: 380000, activeParticipants: 28000, normalizedScale: 0.85 },
        ecosystem: { receptivityScore: 0.82, sentiment: { positive: 0.65, neutral: 0.28, negative: 0.07 }, brandRank: 2, growthTrend: "growing" },
        topBrands: [
          { name: "Nike", shareOfVoice: 0.28 },
          { name: "Hoka", shareOfVoice: 0.24, isSearchedBrand: true },
          { name: "New Balance", shareOfVoice: 0.18 },
          { name: "ASICS", shareOfVoice: 0.14 },
          { name: "Brooks", shareOfVoice: 0.09 }
        ],
        topics: [
          { term: "cushioning", frequency: 0.88, sentiment: 0.85 },
          { term: "Clifton 9", frequency: 0.72, sentiment: 0.78 },
          { term: "trail running", frequency: 0.65, sentiment: 0.82 },
          { term: "durability", frequency: 0.58, sentiment: 0.55 },
          { term: "price point", frequency: 0.52, sentiment: 0.38 },
          { term: "Speedgoat", frequency: 0.48, sentiment: 0.80 },
          { term: "wide fit", frequency: 0.41, sentiment: 0.70 },
          { term: "pronation", frequency: 0.38, sentiment: 0.60 }
        ],
        contentOpportunity: {
          summary: "This is Hoka's heartland. Highly engaged runners who care deeply about performance, comfort, and technology. They're brand loyal but also brand curious — always looking for the next breakthrough.",
          angles: [
            "Deep-dive cushioning technology comparisons (Hoka's CMEVA vs competitors)",
            "Athlete transformation stories — first ultra marathon in Hokas",
            "\"Why I switched from Nike to Hoka\" narrative content",
            "Trail vs road specific model guides",
            "Injury recovery and cushioning science explainers"
          ],
          avoid: ["Generic lifestyle content", "Influencer endorsements without technical credibility", "Price justification without value demonstration"],
          recommendedFormats: ["long-form reviews", "comparison videos", "technical breakdowns"],
          bestPlatforms: ["reddit", "youtube"]
        },
        sampleConversations: [
          { text: "Just switched from Brooks Ghost to Clifton 9 for my marathon training. The cushioning difference is insane — my knees thank me every morning.", sentiment: "positive", engagement: 847 },
          { text: "Anyone else notice Hokas feel narrower in the toe box this season? Would love a wide version of the Bondi.", sentiment: "neutral", engagement: 312 },
          { text: "Six months, 600 miles, and my Speedgoats are still going strong. Worth every penny for trail work.", sentiment: "positive", engagement: 1204 }
        ]
      },
      {
        id: "trail-running",
        name: "Trail Running Community",
        platformSource: "reddit",
        platformId: "r/TrailRunning",
        category: "Fitness & Running",
        position: { relevanceScore: 0.88, x: -90, y: -50 },
        size: { communitySize: 290000, activeParticipants: 22000, normalizedScale: 0.78 },
        ecosystem: { receptivityScore: 0.79, sentiment: { positive: 0.62, neutral: 0.30, negative: 0.08 }, brandRank: 1, growthTrend: "growing" },
        topBrands: [
          { name: "Hoka", shareOfVoice: 0.31, isSearchedBrand: true },
          { name: "Salomon", shareOfVoice: 0.28 },
          { name: "La Sportiva", shareOfVoice: 0.18 },
          { name: "Brooks", shareOfVoice: 0.12 },
          { name: "Nike Trail", shareOfVoice: 0.07 }
        ],
        topics: [
          { term: "Speedgoat", frequency: 0.75, sentiment: 0.85 },
          { term: "technical terrain", frequency: 0.68, sentiment: 0.72 },
          { term: "grip", frequency: 0.62, sentiment: 0.65 },
          { term: "ultra", frequency: 0.58, sentiment: 0.88 },
          { term: "Zinal", frequency: 0.45, sentiment: 0.80 },
          { term: "waterproofing", frequency: 0.40, sentiment: 0.55 },
          { term: "stack height", frequency: 0.38, sentiment: 0.60 },
          { term: "mud performance", frequency: 0.32, sentiment: 0.50 }
        ],
        contentOpportunity: {
          summary: "Hoka is genuinely dominant here. Trail runners trust Hoka for ultra distances and technical terrain. This is a community to nurture and celebrate, not sell to.",
          angles: [
            "Sponsorship of community ultra events with authentic documentation",
            "Partner with trail running influencers for genuine kit reviews",
            "\"Built for this\" — documentary-style content from UTMB and Western States",
            "Terrain-specific shoe selection guides",
            "Community spotlight: everyday ultra runners in Hokas"
          ],
          avoid: ["Hard selling", "Fitness model aesthetics", "Urban lifestyle content"],
          recommendedFormats: ["documentary video", "photo essays", "community Q&As"],
          bestPlatforms: ["youtube", "instagram", "reddit"]
        },
        sampleConversations: [
          { text: "Third 100-miler in Speedgoats. I know they look chunky but I don't care — my feet survive.", sentiment: "positive", engagement: 2100 },
          { text: "Debate: Hoka Speedgoat 5 vs Salomon Sense Ride 5 for high alpine terrain? Which do you trust?", sentiment: "neutral", engagement: 934 }
        ]
      },
      {
        id: "marathon-training",
        name: "Marathon Training",
        platformSource: "reddit",
        platformId: "r/MarathonTraining",
        category: "Fitness & Running",
        position: { relevanceScore: 0.85, x: 160, y: 20 },
        size: { communitySize: 320000, activeParticipants: 31000, normalizedScale: 0.82 },
        ecosystem: { receptivityScore: 0.76, sentiment: { positive: 0.60, neutral: 0.32, negative: 0.08 }, brandRank: 3, growthTrend: "growing" },
        topBrands: [
          { name: "Nike", shareOfVoice: 0.30 },
          { name: "Adidas", shareOfVoice: 0.22 },
          { name: "Hoka", shareOfVoice: 0.18, isSearchedBrand: true },
          { name: "New Balance", shareOfVoice: 0.16 },
          { name: "ASICS", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "training plan", frequency: 0.82, sentiment: 0.72 },
          { term: "race day shoes", frequency: 0.65, sentiment: 0.78 },
          { term: "long run", frequency: 0.72, sentiment: 0.70 },
          { term: "carbon plate", frequency: 0.55, sentiment: 0.65 },
          { term: "Rocket X", frequency: 0.42, sentiment: 0.80 },
          { term: "recovery", frequency: 0.48, sentiment: 0.75 },
          { term: "mileage", frequency: 0.60, sentiment: 0.68 },
          { term: "PB attempt", frequency: 0.38, sentiment: 0.90 }
        ],
        contentOpportunity: {
          summary: "Marathon runners are highly motivated, research-driven, and willing to invest in the right kit. Hoka's Rocket X and Cielo X are making serious inroads but aren't yet synonymous with marathon performance like Nike Vaporfly.",
          angles: [
            "Performance data: Hoka carbon plate efficiency vs competitors",
            "\"My BQ shoe\" — marathon runners who PR'd in Hoka",
            "Recovery-day vs race-day shoe philosophy content",
            "Hoka's marathon-specific technology explainer series",
            "Strava partnership or community challenge activations"
          ],
          avoid: ["Claiming performance superiority without data", "Ignoring the carbon plate conversation"],
          recommendedFormats: ["data-driven articles", "comparison videos", "athlete testimonials"],
          bestPlatforms: ["strava", "youtube", "instagram"]
        },
        sampleConversations: [
          { text: "Used Hokas for all my long training runs and switched to Vaporflys for race day. Anyone done a full marathon in the Hoka carbon? Curious how they compare.", sentiment: "neutral", engagement: 567 },
          { text: "Hoka Clifton is my recovery shoe bible. Legs feel so much better the day after a long run.", sentiment: "positive", engagement: 891 }
        ]
      },
      {
        id: "ultralight-hiking",
        name: "Ultralight Hiking",
        platformSource: "reddit",
        platformId: "r/Ultralight",
        category: "Outdoor & Adventure",
        position: { relevanceScore: 0.65, x: -160, y: 80 },
        size: { communitySize: 180000, activeParticipants: 14000, normalizedScale: 0.62 },
        ecosystem: { receptivityScore: 0.58, sentiment: { positive: 0.45, neutral: 0.42, negative: 0.13 }, brandRank: 4, growthTrend: "stable" },
        topBrands: [
          { name: "Altra", shareOfVoice: 0.28 },
          { name: "Salomon", shareOfVoice: 0.22 },
          { name: "Hoka", shareOfVoice: 0.15, isSearchedBrand: true },
          { name: "Merrell", shareOfVoice: 0.14 },
          { name: "Inov-8", shareOfVoice: 0.12 }
        ],
        topics: [
          { term: "gram weenie", frequency: 0.70, sentiment: 0.62 },
          { term: "thru-hiking", frequency: 0.65, sentiment: 0.78 },
          { term: "trail runners vs boots", frequency: 0.58, sentiment: 0.65 },
          { term: "PCT", frequency: 0.52, sentiment: 0.85 },
          { term: "weight savings", frequency: 0.60, sentiment: 0.70 },
          { term: "ankle support", frequency: 0.45, sentiment: 0.50 },
          { term: "durability miles", frequency: 0.40, sentiment: 0.58 },
          { term: "stack height debate", frequency: 0.35, sentiment: 0.45 }
        ],
        contentOpportunity: {
          summary: "Ultralight hikers value weight and durability above all. Hoka's stack height is divisive here — some love the cushioning for long miles, others see it as excessive weight. An untapped opportunity to own the 'comfort for long days' narrative.",
          angles: [
            "PCT/CDT thru-hiker kit lists featuring Hoka trail runners",
            "Weight vs comfort trade-off content — honest, data-led",
            "\"1000-mile trail runner\" durability challenge content",
            "Interviews with thru-hikers who use Hoka vs traditional boots"
          ],
          avoid: ["Ignoring weight concerns", "Luxury/lifestyle framing"],
          recommendedFormats: ["gear reviews", "thru-hiker interviews", "durability tests"],
          bestPlatforms: ["reddit", "youtube"]
        },
        sampleConversations: [
          { text: "Controversial opinion: Hoka Speedgoat is actually solid for ultralight thru-hiking if you go sockless. The cushioning makes up for the weight.", sentiment: "positive", engagement: 723 }
        ]
      },
      {
        id: "physical-therapy",
        name: "Physical Therapy & Recovery",
        platformSource: "reddit",
        platformId: "r/PhysicalTherapy",
        category: "Health & Wellness",
        position: { relevanceScore: 0.62, x: 50, y: 170 },
        size: { communitySize: 150000, activeParticipants: 9000, normalizedScale: 0.55 },
        ecosystem: { receptivityScore: 0.71, sentiment: { positive: 0.58, neutral: 0.35, negative: 0.07 }, brandRank: 1, growthTrend: "growing" },
        topBrands: [
          { name: "Hoka", shareOfVoice: 0.35, isSearchedBrand: true },
          { name: "Brooks", shareOfVoice: 0.22 },
          { name: "New Balance", shareOfVoice: 0.18 },
          { name: "ASICS", shareOfVoice: 0.15 },
          { name: "Saucony", shareOfVoice: 0.07 }
        ],
        topics: [
          { term: "plantar fasciitis", frequency: 0.72, sentiment: 0.55 },
          { term: "PT recommended", frequency: 0.65, sentiment: 0.85 },
          { term: "cushioning therapy", frequency: 0.58, sentiment: 0.80 },
          { term: "knee pain", frequency: 0.55, sentiment: 0.55 },
          { term: "recovery walking", frequency: 0.48, sentiment: 0.78 },
          { term: "orthotics", frequency: 0.42, sentiment: 0.60 },
          { term: "stress fracture", frequency: 0.38, sentiment: 0.45 },
          { term: "biomechanics", frequency: 0.35, sentiment: 0.70 }
        ],
        contentOpportunity: {
          summary: "Hoka is the #1 recommended shoe in physical therapy communities. PTs recommend them constantly for injury recovery. This is an underutilised credibility asset — Hoka should be owning the \"clinically endorsed comfort\" narrative.",
          angles: [
            "Partner with physical therapists for authentic video endorsements",
            "\"Recommended by my PT\" campaign leveraging real testimonials",
            "Cushioning science: how Hoka reduces impact force explained by physios",
            "Recovery journey content from injured runners returning in Hokas",
            "Plantar fasciitis guide with Hoka as the endorsed solution"
          ],
          avoid: ["Medical claims without professional backing", "Ignoring the clinical credibility opportunity"],
          recommendedFormats: ["expert interviews", "patient testimonials", "educational content"],
          bestPlatforms: ["youtube", "instagram", "tiktok"]
        },
        sampleConversations: [
          { text: "My physio specifically told me to get Hokas after my stress fracture. Three months later and I'm back running. The cushioning really does make a difference.", sentiment: "positive", engagement: 1456 }
        ]
      },
      {
        id: "nursing-healthcare",
        name: "Nursing & Healthcare Workers",
        platformSource: "reddit",
        platformId: "r/nursing",
        category: "Healthcare",
        position: { relevanceScore: 0.45, x: -220, y: -140 },
        size: { communitySize: 420000, activeParticipants: 38000, normalizedScale: 0.90 },
        ecosystem: { receptivityScore: 0.35, sentiment: { positive: 0.28, neutral: 0.55, negative: 0.17 }, brandRank: 8, growthTrend: "stable" },
        topBrands: [
          { name: "Dansko", shareOfVoice: 0.30 },
          { name: "Clogs (generic)", shareOfVoice: 0.22 },
          { name: "Crocs", shareOfVoice: 0.20 },
          { name: "New Balance", shareOfVoice: 0.12 },
          { name: "Hoka", shareOfVoice: 0.06, isSearchedBrand: true }
        ],
        topics: [
          { term: "12-hour shifts", frequency: 0.85, sentiment: 0.60 },
          { term: "foot pain", frequency: 0.78, sentiment: 0.40 },
          { term: "best nursing shoes", frequency: 0.72, sentiment: 0.65 },
          { term: "standing all day", frequency: 0.68, sentiment: 0.45 },
          { term: "anti-fatigue", frequency: 0.62, sentiment: 0.70 },
          { term: "slip resistant", frequency: 0.55, sentiment: 0.65 },
          { term: "compression socks", frequency: 0.48, sentiment: 0.72 },
          { term: "comfortable clogs", frequency: 0.45, sentiment: 0.68 }
        ],
        contentOpportunity: {
          summary: "MASSIVE untapped opportunity. Nurses work 12-hour shifts on hard floors — their need for cushioning is even greater than runners. Hoka has almost zero brand presence here despite being perfectly positioned. This is a blue ocean territory.",
          angles: [
            "\"Built for people who stand all day\" campaign targeting healthcare workers",
            "Partner with nurse influencers on TikTok (massive #nursetok community)",
            "Clinical setting content showing Hokas in real hospital environments",
            "Comparison: Dansko vs Hoka for 12-hour shift comfort",
            "Discount/partnership program with hospital systems or nursing schools"
          ],
          avoid: ["Runner-only messaging", "Ignoring the 12-hour shift reality", "Athletic aesthetic that feels irrelevant"],
          recommendedFormats: ["TikTok testimonials", "day-in-the-life content", "comparison content"],
          bestPlatforms: ["tiktok", "instagram", "facebook groups"]
        },
        sampleConversations: [
          { text: "Anyone tried Hokas for nursing? My running friend keeps telling me to ditch the Danskos but I'm not convinced.", sentiment: "neutral", engagement: 2341 },
          { text: "Switched to Hokas three months ago after a colleague recommended them. My back is SIGNIFICANTLY better. Why did I wait so long?", sentiment: "positive", engagement: 4102 },
          { text: "The sole is too thick for me — kept catching on things. Went back to Clogs.", sentiment: "negative", engagement: 234 }
        ]
      },
      {
        id: "gorpcore-fashion",
        name: "Gorpcore & Outdoor Fashion",
        platformSource: "reddit",
        platformId: "r/Gorpcore",
        category: "Fashion & Style",
        position: { relevanceScore: 0.52, x: 180, y: -160 },
        size: { communitySize: 95000, activeParticipants: 8200, normalizedScale: 0.45 },
        ecosystem: { receptivityScore: 0.62, sentiment: { positive: 0.52, neutral: 0.38, negative: 0.10 }, brandRank: 3, growthTrend: "growing" },
        topBrands: [
          { name: "Salomon", shareOfVoice: 0.32 },
          { name: "Arc'teryx", shareOfVoice: 0.25 },
          { name: "Hoka", shareOfVoice: 0.16, isSearchedBrand: true },
          { name: "Patagonia", shareOfVoice: 0.14 },
          { name: "The North Face", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "chunky silhouette", frequency: 0.70, sentiment: 0.72 },
          { term: "outdoor aesthetic", frequency: 0.65, sentiment: 0.78 },
          { term: "techwear", frequency: 0.58, sentiment: 0.65 },
          { term: "functional fashion", frequency: 0.55, sentiment: 0.80 },
          { term: "colour blocking", frequency: 0.48, sentiment: 0.70 },
          { term: "Mafate Speed", frequency: 0.42, sentiment: 0.82 },
          { term: "earth tones", frequency: 0.38, sentiment: 0.75 },
          { term: "limited editions", frequency: 0.35, sentiment: 0.88 }
        ],
        contentOpportunity: {
          summary: "Gorpcore has legitimised Hoka's chunky aesthetic in fashion circles. The brand is authentically cool here without trying to be. Risk: over-commercialising this will kill the organic cachet.",
          angles: [
            "Collaborations with outdoor-adjacent fashion brands (Arc'teryx, Patagonia)",
            "Editorial-style fashion photography in natural settings",
            "Limited edition colourways developed with gorpcore aesthetics",
            "Feature in outdoor fashion editorials and zines",
            "Subtle product placement in fashion content — let the community discover it"
          ],
          avoid: ["Hard fashion brand positioning", "Celebrity collabs that feel inauthentic", "Urban streetwear aesthetics that don't fit the outdoors origin"],
          recommendedFormats: ["editorial photography", "lookbooks", "limited drops"],
          bestPlatforms: ["instagram", "pinterest", "tiktok"]
        },
        sampleConversations: [
          { text: "Mafate Speed with Patagonia baggies is the perfect gorpcore fit. Hoka finally has something genuinely cool.", sentiment: "positive", engagement: 892 }
        ]
      },
      {
        id: "streetwear-sneaker",
        name: "Streetwear & Sneaker Culture",
        platformSource: "reddit",
        platformId: "r/Sneakers",
        category: "Fashion & Style",
        position: { relevanceScore: 0.48, x: 240, y: -80 },
        size: { communitySize: 2100000, activeParticipants: 145000, normalizedScale: 1.0 },
        ecosystem: { receptivityScore: 0.28, sentiment: { positive: 0.22, neutral: 0.52, negative: 0.26 }, brandRank: 12, growthTrend: "growing" },
        topBrands: [
          { name: "Nike", shareOfVoice: 0.35 },
          { name: "Jordan", shareOfVoice: 0.22 },
          { name: "Adidas", shareOfVoice: 0.18 },
          { name: "New Balance", shareOfVoice: 0.12 },
          { name: "Hoka", shareOfVoice: 0.03, isSearchedBrand: true }
        ],
        topics: [
          { term: "hypebeast", frequency: 0.72, sentiment: 0.65 },
          { term: "resell value", frequency: 0.68, sentiment: 0.60 },
          { term: "collab drops", frequency: 0.65, sentiment: 0.82 },
          { term: "dad shoe trend", frequency: 0.55, sentiment: 0.58 },
          { term: "chunky silhouette", frequency: 0.48, sentiment: 0.65 },
          { term: "limited edition", frequency: 0.60, sentiment: 0.80 },
          { term: "tech running aesthetic", frequency: 0.42, sentiment: 0.70 },
          { term: "clean colorways", frequency: 0.38, sentiment: 0.75 }
        ],
        contentOpportunity: {
          summary: "Hoka barely exists in sneaker culture. This is either a massive untapped opportunity OR a brand-risk space where trying too hard will backfire. The path in is through limited collabs and scarcity — not performance messaging.",
          angles: [
            "High-profile fashion designer or artist collab on limited edition colorways",
            "Target sneaker media (Sneaker News, Kicks on Fire) with fashion-forward stories",
            "Scarcity drops — numbered editions that create FOMO",
            "Ride the 'ugly/dad shoe' trend narrative with confidence rather than fighting it"
          ],
          avoid: ["Performance messaging", "Trying to out-cool Nike/Jordan", "Mass-market drops"],
          recommendedFormats: ["collab announcements", "drop campaigns", "editorial shoots"],
          bestPlatforms: ["instagram", "twitter/x", "stockx"]
        },
        sampleConversations: [
          { text: "Controversial: Hoka is about to be the next New Balance. Underdog performance brand breaks into hype culture. Calling it now.", sentiment: "positive", engagement: 3421 },
          { text: "Hokas are not sneakers. They're orthopaedic shoes with a marketing budget.", sentiment: "negative", engagement: 892 }
        ]
      },
      {
        id: "dog-walking",
        name: "Dog Walking & Pet Owners",
        platformSource: "facebook",
        platformId: "Dog Walking Groups",
        category: "Lifestyle",
        position: { relevanceScore: 0.38, x: -100, y: 220 },
        size: { communitySize: 650000, activeParticipants: 42000, normalizedScale: 0.92 },
        ecosystem: { receptivityScore: 0.22, sentiment: { positive: 0.18, neutral: 0.68, negative: 0.14 }, brandRank: 14, growthTrend: "stable" },
        topBrands: [
          { name: "Nike", shareOfVoice: 0.22 },
          { name: "New Balance", shareOfVoice: 0.18 },
          { name: "Sketchers", shareOfVoice: 0.16 },
          { name: "Adidas", shareOfVoice: 0.14 },
          { name: "Hoka", shareOfVoice: 0.02, isSearchedBrand: true }
        ],
        topics: [
          { term: "comfortable walking shoes", frequency: 0.78, sentiment: 0.72 },
          { term: "mud-resistant", frequency: 0.65, sentiment: 0.65 },
          { term: "grip on wet paths", frequency: 0.58, sentiment: 0.68 },
          { term: "daily miles", frequency: 0.52, sentiment: 0.75 },
          { term: "wide fit", frequency: 0.45, sentiment: 0.65 },
          { term: "foot support", frequency: 0.48, sentiment: 0.70 },
          { term: "all-weather", frequency: 0.42, sentiment: 0.65 },
          { term: "easy to clean", frequency: 0.38, sentiment: 0.68 }
        ],
        contentOpportunity: {
          summary: "Dog walkers clock serious daily mileage — often 3-5 miles per day. They need comfort shoes but have never been targeted by performance footwear brands. Hoka could own this space with almost no competition.",
          angles: [
            "\"For those who walk 1000 miles a year\" — dog owner targeted campaign",
            "Partner with dog training influencers and pet lifestyle creators",
            "User-generated content from Hoka-wearing dog owners on trails",
            "All-weather + comfort story: Hokas for every surface, every weather",
            "\"Your dog needs you at your best\" — emotional comfort story"
          ],
          avoid: ["Athletic performance messaging", "Speed/running focus", "Anything that feels like hard sport"],
          recommendedFormats: ["feel-good social content", "UGC campaigns", "pet influencer partnerships"],
          bestPlatforms: ["instagram", "facebook", "tiktok"]
        },
        sampleConversations: [
          { text: "My brother-in-law who runs marathons gave me his old Hokas and I've been wearing them for dog walks. Honestly the most comfortable thing I've ever worn for a 2-hour walk.", sentiment: "positive", engagement: 1823 }
        ]
      },
      {
        id: "festival-music",
        name: "Festival & Music Culture",
        platformSource: "reddit",
        platformId: "r/FestivalFashion",
        category: "Lifestyle",
        position: { relevanceScore: 0.32, x: 80, y: 270 },
        size: { communitySize: 320000, activeParticipants: 28000, normalizedScale: 0.80 },
        ecosystem: { receptivityScore: 0.18, sentiment: { positive: 0.15, neutral: 0.70, negative: 0.15 }, brandRank: 18, growthTrend: "stable" },
        topBrands: [
          { name: "Nike", shareOfVoice: 0.24 },
          { name: "Adidas", shareOfVoice: 0.20 },
          { name: "Dr. Martens", shareOfVoice: 0.18 },
          { name: "Converse", shareOfVoice: 0.14 },
          { name: "Hoka", shareOfVoice: 0.01, isSearchedBrand: true }
        ],
        topics: [
          { term: "comfortable for standing", frequency: 0.82, sentiment: 0.70 },
          { term: "Wellington boots", frequency: 0.75, sentiment: 0.62 },
          { term: "mud", frequency: 0.70, sentiment: 0.55 },
          { term: "all-day wear", frequency: 0.65, sentiment: 0.72 },
          { term: "festival outfit", frequency: 0.60, sentiment: 0.80 },
          { term: "blisters", frequency: 0.55, sentiment: 0.35 },
          { term: "practical", frequency: 0.48, sentiment: 0.68 },
          { term: "waterproof", frequency: 0.45, sentiment: 0.65 }
        ],
        contentOpportunity: {
          summary: "Festival-goers stand for 10+ hours on hard ground — identical comfort need to nurses and dog walkers. Hoka has virtually zero presence here. The 'comfortable shoe for people who hate blisters' story is completely unclaimed.",
          angles: [
            "Festival season campaign: \"Survive the weekend in comfort\"",
            "Partner with festival content creators for authentic coverage",
            "Glastonbury/Coachella targeted content around comfort and endurance",
            "\"Worn by people who stand longer than marathon runners\" angle"
          ],
          avoid: ["Sports performance messaging", "Trying to compete with festival fashion brands"],
          recommendedFormats: ["festival content", "influencer partnerships", "seasonal campaigns"],
          bestPlatforms: ["tiktok", "instagram"]
        },
        sampleConversations: [
          { text: "Wore my Hokas to Glastonbury this year instead of wellies. Controversial choice that paid off massively. Feet were perfect at midnight on day 3.", sentiment: "positive", engagement: 5621 }
        ]
      },
      {
        id: "dad-fashion",
        name: "Dad Fashion & Normcore",
        platformSource: "reddit",
        platformId: "r/DadFashionAdvice",
        category: "Fashion & Style",
        position: { relevanceScore: 0.42, x: -50, y: -270 },
        size: { communitySize: 180000, activeParticipants: 12000, normalizedScale: 0.60 },
        ecosystem: { receptivityScore: 0.48, sentiment: { positive: 0.40, neutral: 0.45, negative: 0.15 }, brandRank: 5, growthTrend: "growing" },
        topBrands: [
          { name: "New Balance", shareOfVoice: 0.32 },
          { name: "ASICS", shareOfVoice: 0.20 },
          { name: "Hoka", shareOfVoice: 0.14, isSearchedBrand: true },
          { name: "Brooks", shareOfVoice: 0.12 },
          { name: "Sketchers", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "dad shoe", frequency: 0.78, sentiment: 0.62 },
          { term: "normcore", frequency: 0.65, sentiment: 0.70 },
          { term: "comfort over style", frequency: 0.60, sentiment: 0.75 },
          { term: "chunky sole", frequency: 0.55, sentiment: 0.68 },
          { term: "work from home fits", frequency: 0.48, sentiment: 0.72 },
          { term: "weekend casual", frequency: 0.42, sentiment: 0.78 },
          { term: "anti-fashion", frequency: 0.38, sentiment: 0.65 },
          { term: "functional footwear", frequency: 0.35, sentiment: 0.80 }
        ],
        contentOpportunity: {
          summary: "Hoka is increasingly becoming a 'dad shoe' — which is both an opportunity and a risk. New Balance successfully leaned into this identity. Hoka could do the same with authenticity, or it could undermine their athletic credibility.",
          angles: [
            "Lean into the dad aesthetic with self-aware humour",
            "\"Proudly comfortable\" campaign that reframes the dad shoe label",
            "Father's Day gifting angle — the shoe that actually gets worn",
            "New Balance-style cultural rehabilitation of the comfort-first shoe"
          ],
          avoid: ["Ignoring the conversation", "Trying to be cool in a way that feels inauthentic"],
          recommendedFormats: ["self-aware social content", "seasonal campaigns", "humour-driven content"],
          bestPlatforms: ["twitter/x", "instagram", "reddit"]
        },
        sampleConversations: [
          { text: "Just got called out for wearing dad shoes by my 19-year-old. They were Hokas. I'm now embracing my identity.", sentiment: "positive", engagement: 3201 }
        ]
      },
      {
        id: "fitness-over-40",
        name: "Fitness Over 40",
        platformSource: "reddit",
        platformId: "r/FitnessOver40",
        category: "Health & Wellness",
        position: { relevanceScore: 0.68, x: -170, y: 170 },
        size: { communitySize: 210000, activeParticipants: 16000, normalizedScale: 0.65 },
        ecosystem: { receptivityScore: 0.74, sentiment: { positive: 0.62, neutral: 0.32, negative: 0.06 }, brandRank: 2, growthTrend: "growing" },
        topBrands: [
          { name: "Brooks", shareOfVoice: 0.28 },
          { name: "Hoka", shareOfVoice: 0.24, isSearchedBrand: true },
          { name: "New Balance", shareOfVoice: 0.20 },
          { name: "ASICS", shareOfVoice: 0.16 },
          { name: "Saucony", shareOfVoice: 0.08 }
        ],
        topics: [
          { term: "joint health", frequency: 0.80, sentiment: 0.72 },
          { term: "injury prevention", frequency: 0.75, sentiment: 0.70 },
          { term: "cushioning matters", frequency: 0.68, sentiment: 0.85 },
          { term: "recovery time", frequency: 0.62, sentiment: 0.65 },
          { term: "knees", frequency: 0.58, sentiment: 0.55 },
          { term: "veteran runner", frequency: 0.50, sentiment: 0.80 },
          { term: "longevity", frequency: 0.45, sentiment: 0.88 },
          { term: "foam technology", frequency: 0.40, sentiment: 0.78 }
        ],
        contentOpportunity: {
          summary: "Hoka's cushioning story resonates deeply with older active adults who are managing their bodies more carefully. This demographic is underserved by performance brands but has significant purchasing power.",
          angles: [
            "\"Run longer, age better\" — longevity-focused performance messaging",
            "Stories from runners in their 50s and 60s who attribute their continued running to Hoka",
            "Joint health partnership with orthopaedic professionals",
            "The 40+ athlete identity — active, wise, experienced",
            "Recovery technology marketing specifically targeting aging joints"
          ],
          avoid: ["Youth-focused imagery", "Extreme sport aesthetics", "Ignoring the wisdom of experience"],
          recommendedFormats: ["testimonial content", "expert partnerships", "community stories"],
          bestPlatforms: ["facebook", "youtube", "instagram"]
        },
        sampleConversations: [
          { text: "Turned 52 last year. Hoka was the difference between retiring from running and continuing. My physio agrees.", sentiment: "positive", engagement: 2891 }
        ]
      },
      {
        id: "sustainable-fashion",
        name: "Sustainable Fashion",
        platformSource: "reddit",
        platformId: "r/SustainableFashion",
        category: "Values & Identity",
        position: { relevanceScore: 0.35, x: 300, y: 100 },
        size: { communitySize: 125000, activeParticipants: 9500, normalizedScale: 0.50 },
        ecosystem: { receptivityScore: 0.30, sentiment: { positive: 0.22, neutral: 0.48, negative: 0.30 }, brandRank: 10, growthTrend: "declining" },
        topBrands: [
          { name: "Allbirds", shareOfVoice: 0.30 },
          { name: "Veja", shareOfVoice: 0.25 },
          { name: "adidas (Stan Smith)", shareOfVoice: 0.18 },
          { name: "Patagonia Footwear", shareOfVoice: 0.12 },
          { name: "Hoka", shareOfVoice: 0.02, isSearchedBrand: true }
        ],
        topics: [
          { term: "supply chain transparency", frequency: 0.72, sentiment: 0.60 },
          { term: "recycled materials", frequency: 0.68, sentiment: 0.75 },
          { term: "carbon footprint", frequency: 0.62, sentiment: 0.58 },
          { term: "B Corp", frequency: 0.55, sentiment: 0.80 },
          { term: "greenwashing", frequency: 0.52, sentiment: 0.35 },
          { term: "longevity", frequency: 0.48, sentiment: 0.70 },
          { term: "shoe lifespan", frequency: 0.42, sentiment: 0.62 },
          { term: "ethical manufacturing", frequency: 0.38, sentiment: 0.65 }
        ],
        contentOpportunity: {
          summary: "Hoka is currently viewed with suspicion in sustainability communities due to lack of transparent reporting. This is a risk territory — engaging without real progress will trigger backlash. But the opportunity is significant if Hoka can demonstrate genuine commitment.",
          angles: [
            "Only engage if Hoka has genuine sustainability credentials to share",
            "Radical transparency about current state + roadmap to improvement",
            "Partner with sustainability journalists for honest coverage",
            "Shoe lifespan and durability story (buying fewer shoes is sustainable)"
          ],
          avoid: ["Greenwashing", "Engaging without substance", "Vague sustainability claims"],
          recommendedFormats: ["transparency reports", "honest editorial", "third-party certification announcements"],
          bestPlatforms: ["linkedin", "editorial media"]
        },
        sampleConversations: [
          { text: "I love my Hokas but I wish they were more transparent about their supply chain. Every time I ask customer service I get a corporate non-answer.", sentiment: "negative", engagement: 1204 }
        ]
      }
    ]
  },

  "chanel": {
    query: "Chanel",
    islands: [
      {
        id: "luxury-fashion",
        name: "Luxury Fashion",
        platformSource: "reddit",
        platformId: "r/femalefashionadvice",
        category: "Luxury & Fashion",
        position: { relevanceScore: 0.95, x: 70, y: -70 },
        size: { communitySize: 1200000, activeParticipants: 85000, normalizedScale: 0.95 },
        ecosystem: { receptivityScore: 0.88, sentiment: { positive: 0.72, neutral: 0.22, negative: 0.06 }, brandRank: 1, growthTrend: "stable" },
        topBrands: [
          { name: "Chanel", shareOfVoice: 0.35, isSearchedBrand: true },
          { name: "Louis Vuitton", shareOfVoice: 0.22 },
          { name: "Hermès", shareOfVoice: 0.18 },
          { name: "Dior", shareOfVoice: 0.14 },
          { name: "Gucci", shareOfVoice: 0.08 }
        ],
        topics: [
          { term: "classic flap", frequency: 0.85, sentiment: 0.88 },
          { term: "price increases", frequency: 0.78, sentiment: 0.35 },
          { term: "authentication", frequency: 0.72, sentiment: 0.65 },
          { term: "tweed", frequency: 0.65, sentiment: 0.85 },
          { term: "investment piece", frequency: 0.62, sentiment: 0.78 },
          { term: "vintage Chanel", frequency: 0.58, sentiment: 0.90 },
          { term: "runway show", frequency: 0.55, sentiment: 0.85 },
          { term: "Boy bag", frequency: 0.50, sentiment: 0.80 }
        ],
        contentOpportunity: {
          summary: "Chanel's core community. Deeply brand loyal, highly aspirational, and increasingly vocal about price hikes and quality concerns. The brand's mystique needs constant protection and feeding.",
          angles: [
            "Behind-the-scenes craft and atelier content — reinforcing the Chanel promise",
            "Heritage storytelling — Coco's story, the icons, the history",
            "Authentication guides that reinforce scarcity and authenticity",
            "Limited access content for existing customers — loyalty rewards"
          ],
          avoid: ["Mass marketing aesthetics", "Discounting signals", "Overexposure"],
          recommendedFormats: ["editorial film", "heritage content", "exclusive access"],
          bestPlatforms: ["instagram", "youtube"]
        },
        sampleConversations: [
          { text: "My Classic Flap from 2019 has tripled in price. Part of me is furious, part of me is thrilled it holds value.", sentiment: "neutral", engagement: 8920 }
        ]
      },
      {
        id: "french-culture",
        name: "French Culture & Francophiles",
        platformSource: "reddit",
        platformId: "r/france",
        category: "Culture & Identity",
        position: { relevanceScore: 0.72, x: -120, y: -90 },
        size: { communitySize: 340000, activeParticipants: 22000, normalizedScale: 0.78 },
        ecosystem: { receptivityScore: 0.75, sentiment: { positive: 0.62, neutral: 0.32, negative: 0.06 }, brandRank: 1, growthTrend: "stable" },
        topBrands: [
          { name: "Chanel", shareOfVoice: 0.40, isSearchedBrand: true },
          { name: "Dior", shareOfVoice: 0.25 },
          { name: "Givenchy", shareOfVoice: 0.15 },
          { name: "Yves Saint Laurent", shareOfVoice: 0.12 },
          { name: "Lanvin", shareOfVoice: 0.05 }
        ],
        topics: [
          { term: "Coco Chanel biography", frequency: 0.68, sentiment: 0.78 },
          { term: "Parisian style", frequency: 0.75, sentiment: 0.88 },
          { term: "French luxury heritage", frequency: 0.62, sentiment: 0.85 },
          { term: "effortless chic", frequency: 0.58, sentiment: 0.90 },
          { term: "haute couture", frequency: 0.52, sentiment: 0.85 },
          { term: "Chanel No. 5", frequency: 0.65, sentiment: 0.88 },
          { term: "WWII controversy", frequency: 0.38, sentiment: 0.30 },
          { term: "French elegance", frequency: 0.70, sentiment: 0.92 }
        ],
        contentOpportunity: {
          summary: "Chanel IS French culture to much of the world. This community is a natural home, though the WWII-era controversies around Coco's history occasionally surface. Lead with craft, elegance, and cultural contribution.",
          angles: [
            "Deep heritage content about Coco's revolution of women's fashion",
            "Paris fashion week documentary content",
            "Collaboration with French cultural institutions (Louvre, Musée d'Orsay)",
            "Effortless chic editorial — make Chanel feel attainable in spirit if not in price"
          ],
          avoid: ["Addressing controversies without care", "Anything that feels un-French"],
          recommendedFormats: ["documentary", "editorial", "cultural partnerships"],
          bestPlatforms: ["youtube", "instagram"]
        },
        sampleConversations: [
          { text: "Chanel is the brand that taught the world that French women don't try too hard. That's still the most radical idea in fashion.", sentiment: "positive", engagement: 4521 }
        ]
      },
      {
        id: "beauty-skincare",
        name: "Beauty & Skincare",
        platformSource: "reddit",
        platformId: "r/SkincareAddiction",
        category: "Beauty",
        position: { relevanceScore: 0.78, x: 140, y: 80 },
        size: { communitySize: 2800000, activeParticipants: 180000, normalizedScale: 1.0 },
        ecosystem: { receptivityScore: 0.65, sentiment: { positive: 0.50, neutral: 0.38, negative: 0.12 }, brandRank: 4, growthTrend: "growing" },
        topBrands: [
          { name: "Charlotte Tilbury", shareOfVoice: 0.22 },
          { name: "Dior Beauty", shareOfVoice: 0.18 },
          { name: "MAC", shareOfVoice: 0.16 },
          { name: "Chanel Beauty", shareOfVoice: 0.14, isSearchedBrand: true },
          { name: "YSL Beauty", shareOfVoice: 0.12 }
        ],
        topics: [
          { term: "Les Beiges", frequency: 0.72, sentiment: 0.82 },
          { term: "No.5 L'Eau", frequency: 0.65, sentiment: 0.80 },
          { term: "luxury foundation", frequency: 0.58, sentiment: 0.72 },
          { term: "Chanel lipstick", frequency: 0.62, sentiment: 0.85 },
          { term: "Sublimage skincare", frequency: 0.48, sentiment: 0.78 },
          { term: "worth the price?", frequency: 0.55, sentiment: 0.58 },
          { term: "dupes", frequency: 0.45, sentiment: 0.68 },
          { term: "glass skin", frequency: 0.52, sentiment: 0.80 }
        ],
        contentOpportunity: {
          summary: "Chanel Beauty has a loyal following but faces intense value questioning in beauty communities. 'Worth it?' is the dominant conversation. The brand needs to articulate why the experience and formulation justify luxury pricing.",
          angles: [
            "Formulation transparency — what makes Chanel beauty different at the science level",
            "Beauty ritual content — the experience of using Chanel, not just the product",
            "Talent partnerships with respected beauty creators who use the products authentically",
            "Les Beiges summer campaign — photography and naturalism story"
          ],
          avoid: ["Dupe baiting (engaging with dupe content in any way)", "Value proposition conversations"],
          recommendedFormats: ["beauty tutorials", "formulation content", "artist collaborations"],
          bestPlatforms: ["youtube", "tiktok", "instagram"]
        },
        sampleConversations: [
          { text: "Chanel's Les Beiges is genuinely my desert island product. The shade range isn't perfect but the finish is unmatched.", sentiment: "positive", engagement: 3240 }
        ]
      },
      {
        id: "vintage-collectors",
        name: "Vintage Fashion Collectors",
        platformSource: "instagram",
        platformId: "#VintageChanel",
        category: "Collecting & Investment",
        position: { relevanceScore: 0.68, x: -200, y: 60 },
        size: { communitySize: 89000, activeParticipants: 7200, normalizedScale: 0.42 },
        ecosystem: { receptivityScore: 0.82, sentiment: { positive: 0.70, neutral: 0.25, negative: 0.05 }, brandRank: 1, growthTrend: "growing" },
        topBrands: [
          { name: "Chanel (vintage)", shareOfVoice: 0.55, isSearchedBrand: true },
          { name: "Hermès (vintage)", shareOfVoice: 0.22 },
          { name: "Dior (vintage)", shareOfVoice: 0.12 },
          { name: "YSL (vintage)", shareOfVoice: 0.08 }
        ],
        topics: [
          { term: "Karl Lagerfeld era", frequency: 0.78, sentiment: 0.90 },
          { term: "Coco Chanel era pieces", frequency: 0.65, sentiment: 0.95 },
          { term: "authentication", frequency: 0.72, sentiment: 0.70 },
          { term: "archive pieces", frequency: 0.68, sentiment: 0.92 },
          { term: "investment potential", frequency: 0.60, sentiment: 0.80 },
          { term: "condition grading", frequency: 0.55, sentiment: 0.65 },
          { term: "provenance", frequency: 0.48, sentiment: 0.85 },
          { term: "Virginie Viard era", frequency: 0.42, sentiment: 0.72 }
        ],
        contentOpportunity: {
          summary: "Vintage Chanel collectors are the brand's most passionate advocates and its most powerful authenticity signal. They treat Chanel like fine art. The brand rarely engages with this community but could do so powerfully.",
          angles: [
            "Archive exhibition content — rare pieces and their stories",
            "Authentication partnership — Chanel endorsing legitimate authentication processes",
            "Heritage editorial featuring archive pieces alongside current collections",
            "Collector spotlight content — who are these passionate custodians?"
          ],
          avoid: ["Discouraging secondary market engagement (it validates the primary)"],
          recommendedFormats: ["documentary", "archive editorial", "collector features"],
          bestPlatforms: ["instagram", "youtube"]
        },
        sampleConversations: [
          { text: "Just found a 1994 Karl Lagerfeld tweed suit at an estate sale. Immaculate condition. There's genuinely nothing like it in modern Chanel.", sentiment: "positive", engagement: 6741 }
        ]
      },
      {
        id: "art-world",
        name: "Art World & Galleries",
        platformSource: "instagram",
        platformId: "Art Community",
        category: "Culture & Arts",
        position: { relevanceScore: 0.55, x: -80, y: 180 },
        size: { communitySize: 180000, activeParticipants: 12000, normalizedScale: 0.60 },
        ecosystem: { receptivityScore: 0.60, sentiment: { positive: 0.48, neutral: 0.42, negative: 0.10 }, brandRank: 3, growthTrend: "stable" },
        topBrands: [
          { name: "Louis Vuitton (art)", shareOfVoice: 0.28 },
          { name: "Hermès (art)", shareOfVoice: 0.22 },
          { name: "Chanel (Nexus Labs)", shareOfVoice: 0.18, isSearchedBrand: true },
          { name: "Prada (Foundation)", shareOfVoice: 0.20 },
          { name: "Gucci (art)", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "Chanel Nexus Hall", frequency: 0.55, sentiment: 0.78 },
          { term: "fashion as art", frequency: 0.68, sentiment: 0.82 },
          { term: "couture craft", frequency: 0.62, sentiment: 0.88 },
          { term: "Palais Galliera", frequency: 0.48, sentiment: 0.80 },
          { term: "contemporary artist collabs", frequency: 0.52, sentiment: 0.75 },
          { term: "museum exhibitions", frequency: 0.58, sentiment: 0.85 },
          { term: "cultural institution", frequency: 0.45, sentiment: 0.78 },
          { term: "Virginie Viard artistic vision", frequency: 0.38, sentiment: 0.65 }
        ],
        contentOpportunity: {
          summary: "Chanel occupies a unique position between fashion and fine art. The art world respects the house's craft even if it's culturally ambivalent about luxury brands. Chanel Nexus Hall is an underutilised asset.",
          angles: [
            "Artist-in-residence program at Chanel Nexus Hall",
            "Couture as craft — artisanal process content",
            "Collaboration with emerging artists in meaningful (not tokenistic) ways",
            "Museum-quality exhibition of archive fashion"
          ],
          avoid: ["Celebrity-focused art washes", "Tokenistic collaborations"],
          recommendedFormats: ["documentary", "gallery content", "artist interviews"],
          bestPlatforms: ["instagram", "youtube", "editorial media"]
        },
        sampleConversations: [
          { text: "The Chanel Nexus Hall show in Tokyo was genuinely moving. The brand understands that couture is architecture for the body.", sentiment: "positive", engagement: 2341 }
        ]
      },
      {
        id: "sustainability-critics",
        name: "Sustainability Critics",
        platformSource: "twitter",
        platformId: "#slowfashion",
        category: "Values & Activism",
        position: { relevanceScore: 0.38, x: 260, y: -100 },
        size: { communitySize: 280000, activeParticipants: 24000, normalizedScale: 0.75 },
        ecosystem: { receptivityScore: 0.15, sentiment: { positive: 0.10, neutral: 0.35, negative: 0.55 }, brandRank: 15, growthTrend: "growing" },
        topBrands: [
          { name: "Patagonia", shareOfVoice: 0.28 },
          { name: "Veja", shareOfVoice: 0.22 },
          { name: "Stella McCartney", shareOfVoice: 0.18 },
          { name: "Chanel (as example)", shareOfVoice: 0.08, isSearchedBrand: true },
          { name: "Hermès", shareOfVoice: 0.06 }
        ],
        topics: [
          { term: "overconsumption", frequency: 0.78, sentiment: 0.35 },
          { term: "fashion industry pollution", frequency: 0.72, sentiment: 0.30 },
          { term: "greenwashing", frequency: 0.68, sentiment: 0.28 },
          { term: "slow fashion", frequency: 0.65, sentiment: 0.82 },
          { term: "secondhand market", frequency: 0.60, sentiment: 0.75 },
          { term: "luxury vs ethical", frequency: 0.55, sentiment: 0.40 },
          { term: "supply chain transparency", frequency: 0.52, sentiment: 0.42 },
          { term: "made to last", frequency: 0.48, sentiment: 0.78 }
        ],
        contentOpportunity: {
          summary: "Sustainability critics often cite luxury brands as examples of excess. However, the 'made to last' argument is Chanel's genuine differentiator here. A vintage Classic Flap lasts 40 years — that's anti-fast-fashion by definition.",
          angles: [
            "Radical honesty: This is not sustainable, but here's what we're doing",
            "Made to last campaign — the investment piece as slow fashion",
            "Artisan spotlight — the human craft behind every piece",
            "100-year warranty positioning (metaphorical — buy once, pass it down)"
          ],
          avoid: ["Greenwashing claims", "Ignoring the conversation entirely", "Defensive responses"],
          recommendedFormats: ["transparent reporting", "craft documentaries", "editorial"],
          bestPlatforms: ["editorial media", "linkedin"]
        },
        sampleConversations: [
          { text: "I actually think vintage Chanel IS slow fashion. The argument against luxury is valid for fast-luxury brands but not for things made to last 50 years.", sentiment: "neutral", engagement: 4201 }
        ]
      }
    ]
  },

  "guinness": {
    query: "Guinness",
    islands: [
      {
        id: "irish-pub-culture",
        name: "Irish Pub Culture",
        platformSource: "reddit",
        platformId: "r/ireland",
        category: "Culture & Heritage",
        position: { relevanceScore: 0.95, x: 80, y: -60 },
        size: { communitySize: 580000, activeParticipants: 42000, normalizedScale: 0.90 },
        ecosystem: { receptivityScore: 0.92, sentiment: { positive: 0.78, neutral: 0.18, negative: 0.04 }, brandRank: 1, growthTrend: "stable" },
        topBrands: [
          { name: "Guinness", shareOfVoice: 0.52, isSearchedBrand: true },
          { name: "Kilkenny", shareOfVoice: 0.18 },
          { name: "Smithwick's", shareOfVoice: 0.12 },
          { name: "Beamish", shareOfVoice: 0.10 },
          { name: "Murphy's", shareOfVoice: 0.06 }
        ],
        topics: [
          { term: "perfect pint", frequency: 0.88, sentiment: 0.90 },
          { term: "119.5 second pour", frequency: 0.75, sentiment: 0.92 },
          { term: "pub session", frequency: 0.80, sentiment: 0.85 },
          { term: "Paddy's Day", frequency: 0.72, sentiment: 0.88 },
          { term: "freshness matters", frequency: 0.65, sentiment: 0.80 },
          { term: "Storehouse", frequency: 0.58, sentiment: 0.82 },
          { term: "tap vs can", frequency: 0.62, sentiment: 0.72 },
          { term: "craic", frequency: 0.85, sentiment: 0.95 }
        ],
        contentOpportunity: {
          summary: "This is Guinness's spiritual home. The pub community is deeply proud of Guinness as cultural heritage, not just a drink. Any content here must feel genuine to the Irish pub experience.",
          angles: [
            "The ritual of the pour — celebrate the 119.5 seconds as craft",
            "Irish pub institution spotlight content",
            "Guinness as social connector — the people behind the pint",
            "Freshness certification programme — best pubs by region"
          ],
          avoid: ["Americanisation", "Corporate-feeling content", "Anything that undermines the ritual"],
          recommendedFormats: ["documentary", "pub-sourced content", "community celebration"],
          bestPlatforms: ["youtube", "instagram", "facebook"]
        },
        sampleConversations: [
          { text: "Tried a Guinness in New York. Not bad. Had one in Dublin the next day. Absolutely incomparable. The pour makes it.", sentiment: "positive", engagement: 8921 }
        ]
      },
      {
        id: "craft-beer",
        name: "Craft Beer Enthusiasts",
        platformSource: "reddit",
        platformId: "r/CraftBeer",
        category: "Food & Drink",
        position: { relevanceScore: 0.70, x: -140, y: -80 },
        size: { communitySize: 890000, activeParticipants: 62000, normalizedScale: 0.95 },
        ecosystem: { receptivityScore: 0.42, sentiment: { positive: 0.32, neutral: 0.42, negative: 0.26 }, brandRank: 8, growthTrend: "declining" },
        topBrands: [
          { name: "Dogfish Head", shareOfVoice: 0.18 },
          { name: "Stone Brewing", shareOfVoice: 0.15 },
          { name: "Founders", shareOfVoice: 0.14 },
          { name: "Guinness", shareOfVoice: 0.08, isSearchedBrand: true },
          { name: "Goose Island", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "macro vs craft", frequency: 0.75, sentiment: 0.40 },
          { term: "Guinness Open Gate", frequency: 0.55, sentiment: 0.78 },
          { term: "stout tradition", frequency: 0.68, sentiment: 0.72 },
          { term: "corporate brewery", frequency: 0.60, sentiment: 0.35 },
          { term: "heritage stout", frequency: 0.58, sentiment: 0.80 },
          { term: "Milk Stout Nitro", frequency: 0.42, sentiment: 0.75 },
          { term: "nitrogenation", frequency: 0.48, sentiment: 0.82 },
          { term: "sessionable stout", frequency: 0.45, sentiment: 0.70 }
        ],
        contentOpportunity: {
          summary: "Craft beer communities often dismiss Guinness as 'macro', but there's genuine respect for the brewing tradition and innovation. Guinness Open Gate Brewery is almost unknown outside Ireland but would be beloved by craft drinkers.",
          angles: [
            "Guinness Open Gate — the experimental brewery that craft drinkers don't know exists",
            "Brewing heritage: Guinness invented many techniques craft brewers use",
            "Patent trail content — Guinness innovations that shaped all modern brewing",
            "Nitrogenation science — a genuine craft innovation from a 'macro' brand"
          ],
          avoid: ["Defending macro status", "Comparison with craft brands on price/origin"],
          recommendedFormats: ["brewing content", "innovation stories", "brewery tours"],
          bestPlatforms: ["youtube", "reddit", "untappd"]
        },
        sampleConversations: [
          { text: "Guinness gets unfair craft hate. Nitro stout is genuinely innovative and the West Indies Porter is legitimately good. Don't dismiss it.", sentiment: "positive", engagement: 4210 }
        ]
      },
      {
        id: "sports-fans",
        name: "Sports Fans & Pub Sports",
        platformSource: "reddit",
        platformId: "r/soccer",
        category: "Sports",
        position: { relevanceScore: 0.75, x: 160, y: 50 },
        size: { communitySize: 3200000, activeParticipants: 240000, normalizedScale: 1.0 },
        ecosystem: { receptivityScore: 0.72, sentiment: { positive: 0.58, neutral: 0.35, negative: 0.07 }, brandRank: 2, growthTrend: "growing" },
        topBrands: [
          { name: "Heineken", shareOfVoice: 0.28 },
          { name: "Guinness", shareOfVoice: 0.24, isSearchedBrand: true },
          { name: "Budweiser", shareOfVoice: 0.18 },
          { name: "Carlsberg", shareOfVoice: 0.15 },
          { name: "Stella Artois", shareOfVoice: 0.12 }
        ],
        topics: [
          { term: "Six Nations", frequency: 0.72, sentiment: 0.88 },
          { term: "Champions League", frequency: 0.68, sentiment: 0.82 },
          { term: "match day beer", frequency: 0.80, sentiment: 0.85 },
          { term: "rugby and Guinness", frequency: 0.65, sentiment: 0.90 },
          { term: "pub viewing", frequency: 0.78, sentiment: 0.88 },
          { term: "Premier League", frequency: 0.72, sentiment: 0.80 },
          { term: "sports sponsorship", frequency: 0.55, sentiment: 0.70 },
          { term: "race day", frequency: 0.48, sentiment: 0.88 }
        ],
        contentOpportunity: {
          summary: "Sports + Guinness is a natural pairing, especially rugby. The Six Nations sponsorship is one of the most authentic brand-sport marriages in Europe. Football is more contested territory with Heineken dominant.",
          angles: [
            "Own the rugby narrative completely — Six Nations, Autumn Internationals",
            "Match day ritual content — the pre-match pint as ceremony",
            "'Worth the wait' — parallels between the Guinness pour and the build-up to a big match",
            "Sports pub culture documentation — the community that gathers"
          ],
          avoid: ["Football content where Heineken dominates", "Forced sports connections"],
          recommendedFormats: ["live event content", "sports documentary", "pub culture content"],
          bestPlatforms: ["twitter/x", "instagram", "youtube"]
        },
        sampleConversations: [
          { text: "Six Nations final tomorrow. The only acceptable drink in my household is already sorted. Have it no other way.", sentiment: "positive", engagement: 12401 }
        ]
      },
      {
        id: "gaming-communities",
        name: "Gaming Communities",
        platformSource: "twitch",
        platformId: "Gaming Streams",
        category: "Entertainment",
        position: { relevanceScore: 0.40, x: -60, y: 220 },
        size: { communitySize: 4500000, activeParticipants: 380000, normalizedScale: 1.0 },
        ecosystem: { receptivityScore: 0.35, sentiment: { positive: 0.28, neutral: 0.58, negative: 0.14 }, brandRank: 12, growthTrend: "growing" },
        topBrands: [
          { name: "Monster Energy", shareOfVoice: 0.32 },
          { name: "Red Bull", shareOfVoice: 0.28 },
          { name: "G Fuel", shareOfVoice: 0.18 },
          { name: "Guinness", shareOfVoice: 0.02, isSearchedBrand: true },
          { name: "Heineken (e-sports)", shareOfVoice: 0.08 }
        ],
        topics: [
          { term: "watch party", frequency: 0.72, sentiment: 0.80 },
          { term: "IRL drinking streams", frequency: 0.58, sentiment: 0.75 },
          { term: "late night sessions", frequency: 0.65, sentiment: 0.78 },
          { term: "esports bar", frequency: 0.48, sentiment: 0.82 },
          { term: "Twitch chat drinking game", frequency: 0.55, sentiment: 0.72 },
          { term: "adult gaming content", frequency: 0.42, sentiment: 0.70 },
          { term: "beer recommendation", frequency: 0.38, sentiment: 0.75 },
          { term: "Ireland gaming scene", frequency: 0.32, sentiment: 0.80 }
        ],
        contentOpportunity: {
          summary: "Gaming communities are almost untouched by Guinness. Energy drinks dominate but a generation of adult gamers drink beer during sessions. Guinness's low ABV for long sessions makes it genuinely relevant but completely invisible.",
          angles: [
            "IRL streaming partnerships — Guinness as the 'prestige casual drink' for adult gamers",
            "\"The thinking person's game night beer\" — position away from energy drinks",
            "esports bar programme — Guinness in gaming venues",
            "Limited edition Guinness x gaming collab (collectible cans/art)"
          ],
          avoid: ["Forcing gaming culture tropes", "Competing with energy drinks on energy"],
          recommendedFormats: ["stream sponsorship", "collab content", "esports venue partnerships"],
          bestPlatforms: ["twitch", "youtube", "twitter/x"]
        },
        sampleConversations: [
          { text: "Anyone else drinks Guinness during late night gaming sessions? Energy drinks give me crashes. Guinness keeps me calm and focused. Controversial.", sentiment: "positive", engagement: 3421 }
        ]
      },
      {
        id: "food-pairing",
        name: "Food Pairing Enthusiasts",
        platformSource: "reddit",
        platformId: "r/Cooking",
        category: "Food & Drink",
        position: { relevanceScore: 0.58, x: 220, y: -120 },
        size: { communitySize: 3600000, activeParticipants: 210000, normalizedScale: 1.0 },
        ecosystem: { receptivityScore: 0.55, sentiment: { positive: 0.45, neutral: 0.45, negative: 0.10 }, brandRank: 5, growthTrend: "growing" },
        topBrands: [
          { name: "Various craft stouts", shareOfVoice: 0.28 },
          { name: "Guinness", shareOfVoice: 0.22, isSearchedBrand: true },
          { name: "Chimay", shareOfVoice: 0.18 },
          { name: "Oskar Blues", shareOfVoice: 0.14 },
          { name: "Ommegang", shareOfVoice: 0.10 }
        ],
        topics: [
          { term: "Guinness stew", frequency: 0.82, sentiment: 0.90 },
          { term: "beer bread", frequency: 0.72, sentiment: 0.88 },
          { term: "oyster pairing", frequency: 0.65, sentiment: 0.85 },
          { term: "chocolate desserts", frequency: 0.68, sentiment: 0.88 },
          { term: "Sunday roast", frequency: 0.58, sentiment: 0.82 },
          { term: "beef stew", frequency: 0.75, sentiment: 0.90 },
          { term: "Irish food heritage", frequency: 0.52, sentiment: 0.85 },
          { term: "cooking with Guinness", frequency: 0.78, sentiment: 0.92 }
        ],
        contentOpportunity: {
          summary: "Guinness is a beloved cooking ingredient across global food communities. This is a completely underutilised brand asset. Cooking content would reach massive audiences with genuine, warm brand sentiment.",
          angles: [
            "Guinness recipe series — traditional and modern",
            "Oyster and Guinness pairing revival campaign",
            "Partnership with top chefs using Guinness in haute cuisine",
            "\"Ingredient, not just a drink\" brand expansion campaign",
            "Guinness cookbook collab with a respected food publisher"
          ],
          avoid: ["Prescriptive pairing rules", "Alienating non-beer drinkers who cook with it"],
          recommendedFormats: ["recipe content", "chef collaborations", "cooking videos"],
          bestPlatforms: ["youtube", "tiktok", "instagram", "pinterest"]
        },
        sampleConversations: [
          { text: "Made a Guinness and beef stew last Sunday. Used a whole can. The entire house smelled incredible. Family asked why we don't have this every week.", sentiment: "positive", engagement: 7821 }
        ]
      },
      {
        id: "whiskey-spirits",
        name: "Whiskey & Spirits",
        platformSource: "reddit",
        platformId: "r/whiskey",
        category: "Food & Drink",
        position: { relevanceScore: 0.52, x: -200, y: 120 },
        size: { communitySize: 520000, activeParticipants: 38000, normalizedScale: 0.88 },
        ecosystem: { receptivityScore: 0.62, sentiment: { positive: 0.52, neutral: 0.38, negative: 0.10 }, brandRank: 4, growthTrend: "stable" },
        topBrands: [
          { name: "Jameson", shareOfVoice: 0.30 },
          { name: "Bushmills", shareOfVoice: 0.22 },
          { name: "Powers", shareOfVoice: 0.18 },
          { name: "Guinness (Diageo)", shareOfVoice: 0.12, isSearchedBrand: true },
          { name: "Redbreast", shareOfVoice: 0.15 }
        ],
        topics: [
          { term: "Irish drinking culture", frequency: 0.75, sentiment: 0.82 },
          { term: "black and tan", frequency: 0.62, sentiment: 0.72 },
          { term: "whiskey chaser", frequency: 0.58, sentiment: 0.78 },
          { term: "Diageo portfolio", frequency: 0.48, sentiment: 0.65 },
          { term: "bar classics", frequency: 0.65, sentiment: 0.80 },
          { term: "Irish pub experience", frequency: 0.72, sentiment: 0.88 },
          { term: "depth charge", frequency: 0.42, sentiment: 0.72 },
          { term: "beer and spirit pairing", frequency: 0.38, sentiment: 0.78 }
        ],
        contentOpportunity: {
          summary: "The Guinness and Irish whiskey pairing is natural and deeply rooted in pub culture. Whiskey communities respect Guinness as part of the broader Irish drinks heritage. A natural partnership content space.",
          angles: [
            "Guinness x Jameson crossover content — the classic Irish pub pairing",
            "Bar classics series: drink combinations with heritage",
            "Irish drinks culture documentary content",
            "The Irish pub as a cultural institution — Guinness and whiskey as co-anchors"
          ],
          avoid: ["Encouraging irresponsible drinking combinations", "Overly promotional tone"],
          recommendedFormats: ["culture documentary", "heritage content", "bar content"],
          bestPlatforms: ["youtube", "instagram"]
        },
        sampleConversations: [
          { text: "Guinness and Jameson is genuinely the perfect Irish pub order. Both are institutions. Together they're something else.", sentiment: "positive", engagement: 5621 }
        ]
      }
    ]
  }
};

export function findPreset(query) {
  const normalized = query.toLowerCase().trim();
  
  // Direct match
  if (PRESET_DATA[normalized]) return PRESET_DATA[normalized];
  
  // Partial match
  for (const key of Object.keys(PRESET_DATA)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return PRESET_DATA[key];
    }
  }
  
  return null;
}
