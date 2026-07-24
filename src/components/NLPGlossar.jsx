import { useState, useMemo, useEffect, useRef } from 'react';
import DATA from '../data/nlp-glossar.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// Zyklische Farbklassen für Autor:innen-Badges, wiederholt sich nach 5 Autor:innen.
// Siehe App.css, Abschnitt "NLP-Glossar, Autoren-Farben". Dieselben 5 Klassen werden
// auch für die Icon-Kreise der Grundbegriffe wiederverwendet (eigener Wortlaut weiter unten).
const AUTOR_CLASSES = ['nlp-autor-1', 'nlp-autor-2', 'nlp-autor-3', 'nlp-autor-4', 'nlp-autor-5'];

function autorClass(autor){
  const idx = DATA.meta.autoren.indexOf(autor);
  return AUTOR_CLASSES[(idx < 0 ? 0 : idx) % AUTOR_CLASSES.length];
}

// Kleine, eigens gezeichnete Linien-Icons je Grundbegriff. Rein dekorativ/illustrativ,
// bewusst abstrakt statt wörtlich, damit nichts Falsches suggeriert wird. Fällt ein
// künftiger Grundbegriff nicht in diese Liste, greift ICON_FALLBACK.
const GRUNDBEGRIFF_ICONS = {
  submodalitaeten: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <line x1="5" y1="21" x2="5" y2="3"/><circle cx="5" cy="9" r="1.8" fill="currentColor" stroke="none"/>
      <line x1="12" y1="21" x2="12" y2="3"/><circle cx="12" cy="15" r="1.8" fill="currentColor" stroke="none"/>
      <line x1="19" y1="21" x2="19" y2="3"/><circle cx="19" cy="6" r="1.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  future_pace: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17c4.5-1 7.5-4.5 8.5-10.5"/><path d="M10.5 7.5l2.6-1 -0.7 2.7"/>
      <circle cx="19.5" cy="5" r="2.3"/>
    </svg>
  ),
  oekologieueberpruefung: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 19.5c0-9 5.5-14.5 15-14.5-1 9.5-5.5 14.5-15 14.5z"/>
      <path d="M8.3 15.7c2-2.7 4.6-4.4 7.4-5.3"/>
    </svg>
  ),
  zeitlinie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <line x1="2.5" y1="12" x2="19" y2="12"/><path d="M16.3 9l3 3-3 3"/>
      <circle cx="5.5" cy="12" r="1.6" fill="currentColor" stroke="none"/>
      <circle cx="11" cy="12" r="1.6" fill="currentColor" stroke="none"/>
    </svg>
  ),
  vakog: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none"/>
      <line x1="12" y1="12" x2="12" y2="3.3"/><line x1="12" y1="12" x2="19.4" y2="7.6"/>
      <line x1="12" y1="12" x2="18.8" y2="16.9"/><line x1="12" y1="12" x2="8.3" y2="20.3"/>
      <line x1="12" y1="12" x2="3.7" y2="14"/>
    </svg>
  ),
  anker: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="21"/>
      <line x1="7" y1="11" x2="17" y2="11"/><path d="M5 15c0 4 3 6 7 6s7-2 7-6"/>
    </svg>
  ),
  assoziiert_dissoziiert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="4" width="13" height="10" rx="1.5"/>
      <circle cx="15.5" cy="9" r="1.5" fill="currentColor" stroke="none"/>
      <path d="M2 19c1.2-2.1 2.8-3.1 4.6-3.1s3.4 1 4.6 3.1c-1.2 2.1-2.8 3.1-4.6 3.1S3.2 21.1 2 19z"/>
      <circle cx="6.6" cy="19" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  ),
  rapport: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="9" cy="12" r="6.8"/><circle cx="15" cy="12" r="6.8"/>
    </svg>
  ),
  pacing_leading: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12h7.5"/><path d="M7 8.3l3.2 3.7-3.2 3.7"/>
      <path d="M12.5 12h7" strokeDasharray="1 3.2"/><path d="M17 8.3l3.2 3.7-3.2 3.7"/>
    </svg>
  )
};
const ICON_FALLBACK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M9.2 9.5a2.8 2.8 0 1 1 3.9 2.6c-1 .5-1.4 1-1.4 2"/>
    <circle cx="12" cy="17" r="0.15" fill="currentColor"/>
  </svg>
);

// Kompass-Icon für Technik-Karten (steht sinnbildlich für "Schritt-für-Schritt-Vorgehen").
const TECHNIK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M15.3 8.7l-2.1 5.3-5.3 2.1 2.1-5.3z"/>
  </svg>
);
const CLOCK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.2 2"/>
  </svg>
);
const PEOPLE_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8.3" cy="8" r="3"/><path d="M2.3 20c0-4 2.7-6.2 6-6.2s6 2.2 6 6.2"/>
    <circle cx="17" cy="8.8" r="2.3"/><path d="M15.2 13.7c2.6.2 4.6 2 4.6 5.3"/>
  </svg>
);

// Dekorative Kopf-Illustration für den Tab: ein ruhiges Kompass-Motiv, das dasselbe
// Formprinzip wie das Kompass-Icon auf jeder Technik-Karte aufgreift (Wiedererkennung
// statt neuer Bildsprache). Klassische Kompassnadel, zwei Ringe, vier Himmelsrichtungs-
// Striche, in Markenfarben, bewusst ruhig statt verspielt.
function NLPHero(){
  return (
    <svg className="nlp-hero-svg" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.32"/>
      <circle cx="50" cy="50" r="33" fill="none" stroke="var(--secondary)" strokeWidth="1" opacity="0.35"/>
      <line x1="50" y1="4" x2="50" y2="13" stroke="var(--muted)" strokeWidth="1.4" opacity="0.55"/>
      <line x1="50" y1="87" x2="50" y2="96" stroke="var(--muted)" strokeWidth="1.4" opacity="0.55"/>
      <line x1="4" y1="50" x2="13" y2="50" stroke="var(--muted)" strokeWidth="1.4" opacity="0.55"/>
      <line x1="87" y1="50" x2="96" y2="50" stroke="var(--muted)" strokeWidth="1.4" opacity="0.55"/>
      <polygon points="50,21 58,50 50,50" fill="var(--terracotta)"/>
      <polygon points="50,21 42,50 50,50" fill="var(--terracotta)" opacity="0.55"/>
      <polygon points="50,79 58,50 50,50" fill="var(--sage)" opacity="0.55"/>
      <polygon points="50,79 42,50 50,50" fill="var(--sage)"/>
      <circle cx="50" cy="50" r="3.4" fill="var(--primary)"/>
    </svg>
  );
}

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [
    item.titel, item.autor, item.kernaussage, item.erklaerung, item.ziel,
    item.einsatzkontext, item.auswertung,
    ...(item.schritte || []).map(s => s.text)
  ].filter(Boolean).join(' ').toLowerCase().includes(q);
}

function NLPCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card method-card nlp-technik-card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="nlp-technik-titelzeile">
          <span className="nlp-technik-icon" aria-hidden="true">{TECHNIK_ICON}</span>
          <div className="muster-name">
            {item.titel}
            <span className={'kat-badge ' + autorClass(item.autor)}>{item.autor}</span>
          </div>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.kernaussage}</span>
      </div>
      {(item.uebungsdauer || item.gruppengroesse) && (
        <div className="nlp-meta-row">
          {item.uebungsdauer && <span className="nlp-meta-chip">{CLOCK_ICON}{item.uebungsdauer}</span>}
          {item.gruppengroesse && <span className="nlp-meta-chip">{PEOPLE_ICON}{item.gruppengroesse}</span>}
        </div>
      )}
    </div>
  );
}

function NLPModal({ item, onClose, onPrev, onNext, positionLabel }){
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
              <span className={'kat-badge ' + autorClass(item.autor)}>{item.autor}</span>
            </div>
            <div className="anteil-line">
              <span>{item.kernaussage}</span>
            </div>
            {(item.uebungsdauer || item.gruppengroesse) && (
              <div className="nlp-meta-row nlp-meta-row-modal">
                {item.uebungsdauer && <span className="nlp-meta-chip">{CLOCK_ICON}{item.uebungsdauer}</span>}
                {item.gruppengroesse && <span className="nlp-meta-chip">{PEOPLE_ICON}{item.gruppengroesse}</span>}
              </div>
            )}
          </div>

          <div className="card-modal-body">
            <div className="details">
              {item.erklaerung && (
                <div className="block">
                  <h4>Hintergrund</h4>
                  <p>{item.erklaerung}</p>
                </div>
              )}
              {item.ziel && (
                <div className="block">
                  <h4>Ziel</h4>
                  <p>{item.ziel}</p>
                </div>
              )}
              {item.schritte && item.schritte.length > 0 && (
                <div className="block steps">
                  <h4>Übungsablauf</h4>
                  <ol className="up-phase-schritte">
                    {item.schritte.map((s, i) => <li key={i}>{s.text}</li>)}
                  </ol>
                </div>
              )}
              {item.auswertung && (
                <div className="block">
                  <h4>Auswertung</h4>
                  <p>{item.auswertung}</p>
                </div>
              )}
              {item.einsatzkontext && (
                <div className="block">
                  <h4>Anwendungsmöglichkeiten</h4>
                  <p>{item.einsatzkontext}</p>
                </div>
              )}
              {item.zitat && (
                <div className="block steps">
                  <h4>Formulierung</h4>
                  <p className="method-zitat">„{item.zitat}"</p>
                </div>
              )}
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

export default function NLPGlossar({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [autor, setAutor] = useState(null);
  const [openId, setOpenId] = useState(() =>
    initialOpenId && DATA.elemente.some(e => e.id === initialOpenId) ? initialOpenId : null
  );

  const list = useMemo(() => DATA.elemente.filter(item =>
    matches(item, query) && (!autor || item.autor === autor)
  ), [query, autor]);

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
        <span className="nlp-hero-icon-wrap"><NLPHero /></span>
        <div className="nlp-hero-text">
          <p className="nlp-hero-kicker">Glossar · Nachschlagewerk</p>
          <h2 className="nlp-hero-titel">{DATA.meta.titel}</h2>
          <p className="nlp-hero-sub">Übungen nach Autor:in gegliedert, mit gemeinsamer Grundbegriffe-Übersicht für wiederkehrende NLP-Fachbegriffe.</p>
        </div>
      </div>

      {DATA.grundbegriffe && DATA.grundbegriffe.length > 0 && (
        <div className="kernprozess-wrap">
          <p className="picker-label">Glossar-Grundbegriffe · autorenübergreifend</p>
          <div className="kernprozess-grid nlp-grundbegriffe-grid">
            {DATA.grundbegriffe.map((g, i) => (
              <div className="card kernprozess-card nlp-grundbegriff-card" key={g.id}>
                <span className={'nlp-grundbegriff-icon ' + AUTOR_CLASSES[i % AUTOR_CLASSES.length]}>
                  {GRUNDBEGRIFF_ICONS[g.id] || ICON_FALLBACK}
                </span>
                <div className="nlp-grundbegriff-body">
                  <div className="muster-name">{g.begriff}</div>
                  <div className="anteil-line kernprozess-kurz">
                    <span>{g.erklaerung}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="picker-wrap">
        <p className="picker-label">{DATA.meta.titel} · nach Autor:in filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!autor ? ' active' : '')} onClick={() => { setAutor(null); setOpenId(null); }}>Alle zeigen</button>
          {DATA.meta.autoren.map(a => (
            <button
              key={a}
              className={'chip kat-chip ' + autorClass(a) + (autor === a ? ' active' : '')}
              onClick={() => { setAutor(autor === a ? null : a); setOpenId(null); }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Technik suchen, z. B. Submodalitäten, Future-Pace …"
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
              : 'Keine Treffer. Anderen Begriff versuchen oder Autoren-Filter zurücksetzen.'}
          </div>
        ) : (
          <div className="grid">
            {list.map(item => (
              <NLPCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
            ))}
          </div>
        )}
      </main>

      {offenesItem && (
        <NLPModal
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
