import { useState, useRef, useEffect } from 'react';
import DATA from '../data/langlotz-ssi.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// Eigens gezeichnetes, ruhiges Segel-Motiv als Kopf-Illustration. Kein fremdes Bild,
// keine Nachbildung des Buchcovers. Aufgegriffen aus dem Kernsatz "Kapitän auf meinem
// Schiff": ein Segel plus Horizontlinie, in Markenfarben, bewusst schlicht.
function LanglotzHero(){
  return (
    <svg className="nlp-hero-svg" viewBox="0 0 100 100" aria-hidden="true">
      <line x1="10" y1="78" x2="90" y2="78" stroke="var(--muted)" strokeWidth="1.4" opacity="0.5"/>
      <line x1="50" y1="14" x2="50" y2="78" stroke="var(--ink)" strokeWidth="2.2" opacity="0.75"/>
      <path d="M50 18 C 32 30, 28 52, 50 68 Z" fill="var(--primary)" opacity="0.85"/>
      <path d="M50 26 C 62 36, 64 54, 50 68 Z" fill="var(--terracotta)" opacity="0.8"/>
      <path d="M28 78 C 40 84, 60 84, 72 78" fill="none" stroke="var(--secondary)" strokeWidth="2" opacity="0.8"/>
    </svg>
  );
}

const KAPITEL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4.5c3-1.2 6-1.2 8 0v15c-2-1.2-5-1.2-8 0z"/>
    <path d="M20 4.5c-3-1.2-6-1.2-8 0v15c2-1.2 5-1.2 8 0z"/>
  </svg>
);

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [
    item.titel, item.kapitel, item.kernaussage,
    ...(item.textbloecke || []).map(b => (b.titel || '') + ' ' + b.text)
  ].filter(Boolean).join(' ').toLowerCase().includes(q);
}

function LanglotzCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card langlotz-element-card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="nlp-technik-titelzeile">
          <span className="nlp-technik-icon langlotz-kapitel-icon" aria-hidden="true">{KAPITEL_ICON}</span>
          <div className="muster-name">
            {item.titel}
            <span className="kat-badge langlotz-kapitel-badge">{item.kapitel}</span>
          </div>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.kernaussage}</span>
      </div>
    </div>
  );
}

function LanglotzModal({ item, onClose, onPrev, onNext, positionLabel }){
  const modalRef = useRef(null);

  useEffect(() => {
    const onKey = e => {
      if(e.key === 'Escape') onClose();
      if(e.key === 'ArrowLeft' && onPrev) onPrev();
      if(e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if(!item) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Voriges Element">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächstes Element">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.titel}
              <span className="kat-badge langlotz-kapitel-badge">{item.kapitel}</span>
            </div>
            <div className="anteil-line">
              <span>{item.kernaussage}</span>
            </div>
          </div>

          <div className="card-modal-body">
            <div className="details">
              {(item.textbloecke || []).map((block, i) => (
                block.typ === 'kasten' ? (
                  <div className="langlotz-kasten" key={i}>
                    {block.titel && <p className="langlotz-kasten-titel">{block.titel}</p>}
                    <p>{block.text}</p>
                  </div>
                ) : (
                  <div className="block" key={i}>
                    <p>{block.text}</p>
                  </div>
                )
              ))}
              <div className="block steps">
                <h4>Quelle</h4>
                <p className="method-quelle">{item.quelle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LanglotzSSI({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(() =>
    initialOpenId && DATA.elemente.some(e => e.id === initialOpenId) ? initialOpenId : null
  );

  const list = DATA.elemente.filter(item => matches(item, query));
  const offenesItem = openId ? DATA.elemente.find(i => i.id === openId) : null;
  const itemIndex = offenesItem ? list.findIndex(i => i.id === offenesItem.id) : -1;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }
  function itemBlaettern(richtung){
    if(list.length === 0 || itemIndex === -1) return;
    const naechster = (itemIndex + richtung + list.length) % list.length;
    setOpenId(list[naechster].id);
  }

  return (
    <>
      <div className="nlp-hero-wrap">
        <span className="nlp-hero-icon-wrap"><LanglotzHero /></span>
        <div className="nlp-hero-text">
          <p className="nlp-hero-kicker">Rubrik · {DATA.meta.institut}</p>
          <h2 className="nlp-hero-titel">{DATA.meta.titel}</h2>
          <p className="nlp-hero-sub">{DATA.meta.untertitel} · aus {DATA.meta.buchquelle}</p>
        </div>
      </div>

      {DATA.kernsaetze && DATA.kernsaetze.length > 0 && (
        <div className="langlotz-kernsaetze-wrap">
          <p className="picker-label">Kernsätze</p>
          <div className="langlotz-kernsaetze-grid">
            {DATA.kernsaetze.map(k => (
              <div className="langlotz-kernsatz-card" key={k.id}>
                <p className="langlotz-kernsatz-text">„{k.text}“</p>
                <p className="langlotz-kernsatz-quelle">{k.quelle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="search-wrap">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buchauszug suchen …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{list.length} / {DATA.elemente.length}</span>
        </div>
      </div>

      <div className="methodenbox-hinweis">{DATA.meta.hinweis}</div>

      <main>
        {list.length === 0 ? (
          <div className="empty">
            {DATA.elemente.length === 0
              ? 'Noch keine Einträge. Werden ergänzt, sobald Quellmaterial eintrifft.'
              : 'Keine Treffer. Anderen Begriff versuchen.'}
          </div>
        ) : (
          <div className="grid">
            {list.map(item => (
              <LanglotzCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
            ))}
          </div>
        )}
      </main>

      {offenesItem && (
        <LanglotzModal
          key={offenesItem.id}
          item={offenesItem}
          onClose={close}
          onPrev={() => itemBlaettern(-1)}
          onNext={() => itemBlaettern(1)}
          positionLabel={itemIndex !== -1 ? `${itemIndex + 1} / ${list.length}` : null}
        />
      )}
    </>
  );
}
