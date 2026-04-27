import React, { useState, useEffect, useRef } from 'react';
import { brands } from '../data/index.js';

const vanillaCollisions = [
  { collision: "Funeral Parlour × Street Wear", prompt: "What if a brand associated with endings became obsessed with beginnings? Take the rituals of finality and transform them into acts of identity.", tension: "Gravity meets swagger" },
  { collision: "Monastery × Nightclub", prompt: "Silence and ecstasy are closer than we think. Create a space between contemplation and release — where people go to lose themselves and find themselves.", tension: "Discipline meets abandon" },
  { collision: "Hospital Waiting Room × Music Festival", prompt: "Uncertainty and euphoria share the same body. What territory lives in the space between dreading news and dancing in a field?", tension: "Dread meets joy" },
  { collision: "Grandmother's Kitchen × Techno Rave", prompt: "Memory is a drug. Nostalgia has a BPM. Take something deeply familiar and run it through a system that makes it feel new and slightly dangerous.", tension: "Comfort meets provocation" },
  { collision: "Operating Theatre × Art Gallery", prompt: "Precision and beauty share the same hands. Make the clinical feel sacred — and the aesthetic feel urgent. Where does care become craft?", tension: "Function meets transcendence" },
  { collision: "Prison Yard × Fashion Week", prompt: "Constraint is a creative force. What emerges when expression is limited to what you carry on your body? Speak to people who define themselves through restriction.", tension: "Confinement meets expression" },
  { collision: "Laundromat × Fine Dining", prompt: "The mundane and the elevated are separated by a single decision. What do you say to people who are truly waiting while the world spins around them?", tension: "Ordinary meets extraordinary" },
  { collision: "Archaeological Dig × Pop-Up Shop", prompt: "Everything ancient was once contemporary. What if you positioned yourself as the thing future generations dig up and call significant?", tension: "Permanence meets fleeting" },
  { collision: "Courtroom × Comedy Club", prompt: "Judgement and laughter both require an audience. Put something on trial — and make the verdict funny. What truth are you exposing that people would rather not admit?", tension: "Authority meets absurdity" },
  { collision: "Nuclear Bunker × Spa", prompt: "Preparation and relaxation are both acts of love for the future self. What territory exists for a brand that helps people feel safe enough to be completely soft?", tension: "Fear meets surrender" },
  { collision: "Circus × Boardroom", prompt: "The best performers know that business is theatre. Collapse the distance between spectacle and strategy — make serious decisions feel like controlled chaos.", tension: "Performance meets power" },
  { collision: "Mortuary × Toy Store", prompt: "Children know something adults forget: death is just another story. Talk about endings in a way that feels playful, honest, and somehow liberating.", tension: "Innocence meets inevitability" },
];

const getBrandCollisions = (brand, territory, essence) => [
  { collision: `${brand} × Anti-${territory}`, prompt: `What is the direct opposite of where ${brand} lives? Enter that territory for exactly one season — and return changed. What does ${brand} learn by visiting its own shadow?`, tension: "Identity meets its opposite" },
  { collision: `${brand} × Subculture It Would Never Touch`, prompt: `Find the community ${brand} would never target. Skateboarders. Morticians. Truckers. Make something just for them — without changing who ${brand} is. What does that look like?`, tension: "Essence meets friction" },
  { collision: `${brand} × The Moment Before`, prompt: `${brand} owns a specific moment. What's the moment just before — the one nobody talks about? Design a campaign that lives in the 10 minutes before that feeling arrives.`, tension: "Anticipation meets arrival" },
  { collision: `${brand} × Complete Silence`, prompt: `What if ${brand} said nothing for 30 days? No ads, no posts, no content. Just presence. How does absence communicate what words couldn't?`, tension: "Voice meets void" },
  { collision: `${brand} × The Wrong Generation`, prompt: `${brand} is built for a specific life moment. What if it was for 30 years earlier — or 30 years later? Design for an 80-year-old. Or an 8-year-old.`, tension: "Timelessness meets displacement" },
  { collision: `${brand} × Failure`, prompt: `What happens when ${brand} doesn't work? Build a campaign around the moments it wasn't enough. ${essence ? essence + '.' : ''} What does honest imperfection look like?`, tension: "Aspiration meets reality" },
];

// Animation phases: idle → shuffle-out → shuffle-in → flip → revealed
function CardFace({ card, flipped, count, animPhase, isIncoming }) {
  const getTransform = () => {
    if (isIncoming) {
      if (animPhase === 'shuffle-in') return 'translateY(18px) scale(0.96)';
      if (animPhase === 'flip' || animPhase === 'revealed') return 'translateY(0) scale(1)';
      return 'translateY(28px) scale(0.93)'; // behind
    }
    if (animPhase === 'shuffle-out') return 'translateY(-20px) scale(0.95) rotate(-2deg)';
    return 'translateY(0) scale(1)';
  };

  const getOpacity = () => {
    if (isIncoming) {
      if (animPhase === 'shuffle-in' || animPhase === 'flip' || animPhase === 'revealed') return 1;
      return 0.4;
    }
    if (animPhase === 'shuffle-out') return 0;
    return 1;
  };

  const getZIndex = () => isIncoming ? 2 : 1;

  const innerTransform = () => {
    if (!isIncoming) return 'rotateY(0deg)';
    if (animPhase === 'flip' || animPhase === 'revealed') return 'rotateY(180deg)';
    return 'rotateY(0deg)';
  };

  return (
    <div style={{
      position: 'absolute', width: '100%', height: '100%',
      perspective: 1000,
      transform: getTransform(),
      opacity: getOpacity(),
      zIndex: getZIndex(),
      transition: isIncoming
        ? (animPhase === 'flip' ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s' : 'transform 0.35s ease, opacity 0.35s')
        : 'transform 0.3s ease, opacity 0.25s',
    }}>
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease',
        transform: innerTransform(),
      }}>
        {/* Front (face down) */}
        <div style={{ ...faceStyle, background: 'linear-gradient(135deg, #0f1e35 0%, #162035 100%)', border: '1px solid #1e3a5f', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>⚡</div>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a4a6a' }}>Collision #{count}</div>
        </div>
        {/* Back (revealed) */}
        <div style={{ ...faceStyle, background: 'linear-gradient(135deg, #0a1628 0%, #0f1e35 100%)', border: '1px solid #1e3a5f', transform: 'rotateY(180deg)', flexDirection: 'column', padding: 26, overflow: 'hidden' }}>
          <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a4a6a', marginBottom: 10, flexShrink: 0 }}>
            Collision #{count}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#4a9eff', lineHeight: 1.3, marginBottom: 12, flexShrink: 0 }}>
            {card?.collision}
          </div>
          <div style={{ height: 1, background: '#1e3a5f', marginBottom: 14, flexShrink: 0 }} />
          <div style={{ fontSize: '0.82rem', color: '#8ab4d4', lineHeight: 1.7, flex: 1, overflowY: 'auto' }}>
            {card?.prompt}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #1e3a5f', fontSize: '0.68rem', color: '#2a4a6a', flexShrink: 0 }}>
            <span style={{ color: '#4a9eff' }}>Tension: </span>{card?.tension}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollisionCards({ brandData }) {
  const [mode, setMode] = useState('vanilla');

  const brandKeys = Object.keys(brands);
  const [selectedBrandKey, setSelectedBrandKey] = useState(
    brandKeys.find(k => brands[k]?.meta?.brand === brandData?.meta?.brand) || brandKeys[0]
  );
  const [selectedIslandId, setSelectedIslandId] = useState('');

  const activeBrand = brands[selectedBrandKey];
  const islands = activeBrand?.islands || [];
  const selectedIsland = islands.find(i => i.id === selectedIslandId) || null;
  const brandName = activeBrand?.meta?.brand || 'Your Brand';
  const territory = selectedIsland?.name || 'Home Territory';
  const essence = activeBrand?.meta?.tagline || activeBrand?.meta?.narrative || '';

  useEffect(() => {
    if (islands.length > 0) setSelectedIslandId(islands[0].id);
  }, [selectedBrandKey]);

  // Deck state
  const [currentCard, setCurrentCard] = useState(null);
  const [currentCount, setCurrentCount] = useState(0);
  const [incomingCard, setIncomingCard] = useState(null);
  const [incomingCount, setIncomingCount] = useState(0);
  const [animPhase, setAnimPhase] = useState('idle'); // idle | shuffle-out | shuffle-in | flip | revealed
  const [savedCards, setSavedCards] = useState([]);
  const totalCount = useRef(0);
  const animating = useRef(false);

  function getPool() {
    return mode === 'brand'
      ? getBrandCollisions(brandName, territory, essence)
      : vanillaCollisions;
  }

  function generateCard() {
    if (animating.current) return;
    animating.current = true;
    totalCount.current += 1;
    const pool = getPool();
    const card = pool[Math.floor(Math.random() * pool.length)];
    const count = totalCount.current;

    setIncomingCard(card);
    setIncomingCount(count);
    setAnimPhase('shuffle-out');

    // Step 1: old card exits (300ms)
    setTimeout(() => {
      setAnimPhase('shuffle-in');
      // Step 2: new card slides in (350ms)
      setTimeout(() => {
        setAnimPhase('flip');
        // Step 3: new card flips (500ms)
        setTimeout(() => {
          setAnimPhase('revealed');
          setCurrentCard(card);
          setCurrentCount(count);
          setIncomingCard(null);
          animating.current = false;
        }, 520);
      }, 350);
    }, 280);
  }

  // First card on mount
  useEffect(() => {
    totalCount.current = 1;
    const pool = getPool();
    const card = pool[Math.floor(Math.random() * pool.length)];
    setIncomingCard(card);
    setIncomingCount(1);
    setAnimPhase('shuffle-in');
    setTimeout(() => {
      setAnimPhase('flip');
      setTimeout(() => {
        setAnimPhase('revealed');
        setCurrentCard(card);
        setCurrentCount(1);
        setIncomingCard(null);
      }, 520);
    }, 350);
  }, []);

  function saveCard() {
    if (!currentCard) return;
    setSavedCards(s => [...s, { ...currentCard, id: Date.now() }]);
  }

  const isAnimating = animPhase !== 'idle' && animPhase !== 'revealed';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px 60px', overflowY: 'auto', height: '100%' }}>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {['vanilla', 'brand'].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '7px 18px', borderRadius: 24,
            border: `1px solid ${mode === m ? '#4a9eff' : '#1e3a5f'}`,
            background: mode === m ? '#4a9eff' : 'transparent',
            color: mode === m ? '#0a1628' : '#4a6fa5',
            fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
            fontWeight: mode === m ? 'bold' : 'normal'
          }}>{m === 'vanilla' ? 'Vanilla' : 'Brand Mode'}</button>
        ))}
      </div>

      {/* Brand dropdowns */}
      {mode === 'brand' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 460, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>Brand</label>
            <select value={selectedBrandKey} onChange={e => setSelectedBrandKey(e.target.value)} style={selectStyle}>
              {brandKeys.map(k => <option key={k} value={k}>{brands[k]?.meta?.brand || k}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Territory to Collide</label>
            <select value={selectedIslandId} onChange={e => setSelectedIslandId(e.target.value)} style={selectStyle}>
              {islands.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>
          {essence && (
            <div style={{ background: '#0f1e35', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: '0.8rem', color: '#4a6fa5', lineHeight: 1.5 }}>
              <span style={{ color: '#2a4a6a', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Essence: </span>{essence}
            </div>
          )}
        </div>
      )}

      {/* Card deck */}
      <div style={{ position: 'relative', width: 340, height: 460, marginBottom: 24, flexShrink: 0 }}>
        {/* Ghost card behind for depth */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          background: '#0a1420', border: '1px solid #162030',
          borderRadius: 14, transform: 'translateY(6px) scale(0.97)', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          background: '#09131e', border: '1px solid #111d2a',
          borderRadius: 14, transform: 'translateY(11px) scale(0.94)', zIndex: 0
        }} />

        {/* Current card (exiting) */}
        {currentCard && animPhase !== 'revealed' && (
          <CardFace
            card={currentCard}
            count={currentCount}
            animPhase={animPhase}
            isIncoming={false}
          />
        )}

        {/* Revealed / stable card */}
        {animPhase === 'revealed' && currentCard && (
          <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transform: 'rotateY(180deg)' }}>
              <div style={{ ...faceStyle, background: 'linear-gradient(135deg, #0f1e35 0%, #162035 100%)', border: '1px solid #1e3a5f', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: 12 }}>⚡</div>
              </div>
              <div style={{ ...faceStyle, background: 'linear-gradient(135deg, #0a1628 0%, #0f1e35 100%)', border: '1px solid #1e3a5f', transform: 'rotateY(180deg)', flexDirection: 'column', padding: 26, overflow: 'hidden' }}>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a4a6a', marginBottom: 10, flexShrink: 0 }}>Collision #{currentCount}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#4a9eff', lineHeight: 1.3, marginBottom: 12, flexShrink: 0 }}>{currentCard.collision}</div>
                <div style={{ height: 1, background: '#1e3a5f', marginBottom: 14, flexShrink: 0 }} />
                <div style={{ fontSize: '0.82rem', color: '#8ab4d4', lineHeight: 1.7, flex: 1, overflowY: 'auto' }}>{currentCard.prompt}</div>
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid #1e3a5f', fontSize: '0.68rem', color: '#2a4a6a', flexShrink: 0 }}>
                  <span style={{ color: '#4a9eff' }}>Tension: </span>{currentCard.tension}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Incoming card (animating in) */}
        {incomingCard && (
          <CardFace
            card={incomingCard}
            count={incomingCount}
            animPhase={animPhase}
            isIncoming={true}
          />
        )}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
        <button onClick={generateCard} disabled={isAnimating} style={{
          padding: '11px 26px', background: isAnimating ? '#2a4a6a' : '#4a9eff',
          color: '#0a1628', border: 'none', borderRadius: 8, fontSize: '0.78rem',
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: isAnimating ? 'default' : 'pointer',
          fontFamily: 'inherit', fontWeight: 'bold', transition: 'background 0.2s'
        }}>New Collision</button>
        <button onClick={saveCard} style={{
          padding: '11px 16px', background: 'transparent', color: '#4a6fa5',
          border: '1px solid #1e3a5f', borderRadius: 8, fontSize: '0.78rem',
          cursor: 'pointer', fontFamily: 'inherit'
        }}>Save ★</button>
      </div>
      <div style={{ fontSize: '0.67rem', color: '#1e3a5f', letterSpacing: '0.05em', marginBottom: 36 }}>
        Hit New Collision to deal a fresh card · Save the ones that spark something
      </div>

      {/* Saved cards */}
      {savedCards.length > 0 && (
        <div style={{ width: '100%', maxWidth: 680 }}>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a4a6a', textAlign: 'center', marginBottom: 14 }}>Saved Collisions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(195px, 1fr))', gap: 10 }}>
            {savedCards.map(c => (
              <div key={c.id} style={{ background: '#0f1e35', border: '1px solid #1e3a5f', borderRadius: 10, padding: 14, fontSize: '0.78rem', color: '#4a6fa5', lineHeight: 1.5, position: 'relative' }}>
                <button onClick={() => setSavedCards(s => s.filter(x => x.id !== c.id))} style={{ position: 'absolute', top: 8, right: 10, background: 'none', border: 'none', color: '#1e3a5f', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                <div style={{ color: '#4a9eff', fontSize: '0.7rem', marginBottom: 6, fontWeight: 'bold', paddingRight: 16 }}>{c.collision}</div>
                <div>{c.prompt.substring(0, 100)}…</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const faceStyle = {
  position: 'absolute', width: '100%', height: '100%',
  backfaceVisibility: 'hidden', borderRadius: 14, display: 'flex',
};
const labelStyle = {
  display: 'block', fontSize: '0.62rem', letterSpacing: '0.15em',
  textTransform: 'uppercase', color: '#2a4a6a', marginBottom: 6
};
const selectStyle = {
  width: '100%', background: '#0f1e35', border: '1px solid #1e3a5f',
  color: '#8ab4d4', padding: '10px 14px', borderRadius: 8,
  fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer'
};
