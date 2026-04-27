import React, { useMemo, useState } from 'react';

function normaliseIntel(rawIntel) {
  if (!rawIntel) return [];
  if (Array.isArray(rawIntel)) {
    return rawIntel.map((item, index) => ({
      ...item,
      id: item.id || item.title || item.name || `intel-${index + 1}`,
    }));
  }
  return Object.entries(rawIntel).map(([id, value]) => (
    typeof value === 'string'
      ? { id, title: id, body: value }
      : { id, ...value }
  ));
}

function labelForIntel(item, index) {
  return item.title || item.name || item.agent || item.id || `Intel ${index + 1}`;
}

function InlineText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function MarkdownIntelBody({ text }) {
  const lines = String(text || '').split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length > 0) {
      blocks.push({ type: 'list', items: list });
      list = [];
    }
  }

  lines.forEach(rawLine => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: 'heading',
        level: Math.min(heading[1].length, 4),
        text: heading[2],
      });
      return;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (bullet || numbered) {
      flushParagraph();
      list.push((bullet || numbered)[1]);
      return;
    }

    if (line.startsWith('>')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'quote', text: line.replace(/^>\s?/, '') });
      return;
    }

    paragraph.push(line);
  });

  flushParagraph();
  flushList();

  if (blocks.length === 0) {
    return <p className="intel-paragraph">No content available.</p>;
  }

  return (
    <div className="intel-markdown">
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          const Tag = block.level <= 2 ? 'h3' : 'h4';
          return <Tag key={index}><InlineText text={block.text} /></Tag>;
        }

        if (block.type === 'list') {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}><InlineText text={item} /></li>
              ))}
            </ul>
          );
        }

        if (block.type === 'quote') {
          return <blockquote key={index}><InlineText text={block.text} /></blockquote>;
        }

        return <p key={index}><InlineText text={block.text} /></p>;
      })}
    </div>
  );
}

export default function FullIntelView({ brandData }) {
  const intelItems = useMemo(
    () => normaliseIntel(brandData.fullIntel || brandData.agentOutputs || brandData.stageOutputs),
    [brandData]
  );
  const [activeId, setActiveId] = useState(intelItems[0]?.id || 'empty');

  const activeItem = intelItems.find(item => item.id === activeId) || intelItems[0];

  if (intelItems.length === 0) {
    return (
      <div className="full-intel-view">
        <div className="full-intel-inner empty">
          <h1>Full Intel</h1>
          <p>No stage agent outputs have been attached to this brand yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-intel-view">
      <div className="full-intel-inner">
        <header className="full-intel-header">
          <div>
            <div className="full-intel-kicker">{brandData.meta?.brand || 'Brand'} Research Archive</div>
            <h1>Full Intel</h1>
            <p>Raw output from each stage agent, available as selectable source material.</p>
          </div>
          <select
            className="intel-select"
            value={activeItem?.id}
            onChange={event => setActiveId(event.target.value)}
            aria-label="Select agent output"
          >
            {intelItems.map((item, index) => (
              <option key={item.id || index} value={item.id}>
                {labelForIntel(item, index)}
              </option>
            ))}
          </select>
        </header>

        <div className="intel-tabs" role="tablist" aria-label="Agent outputs">
          {intelItems.map((item, index) => (
            <button
              key={item.id || index}
              type="button"
              className={`intel-tab ${activeItem?.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveId(item.id)}
              role="tab"
              aria-selected={activeItem?.id === item.id}
            >
              <span>{item.stage || item.phase || 'Agent'}</span>
              {labelForIntel(item, index)}
            </button>
          ))}
        </div>

        <article className="intel-reader">
          <div className="intel-reader-meta">
            <span>{activeItem.stage || activeItem.phase || 'Stage output'}</span>
            {activeItem.agent && <span>{activeItem.agent}</span>}
            {activeItem.date && <span>{activeItem.date}</span>}
          </div>
          <h2>{labelForIntel(activeItem, 0)}</h2>
          {activeItem.summary && <p className="intel-summary">{activeItem.summary}</p>}
          <MarkdownIntelBody text={activeItem.body || activeItem.content || activeItem.output || ''} />
        </article>
      </div>
    </div>
  );
}
