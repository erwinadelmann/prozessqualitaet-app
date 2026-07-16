import { useState, useMemo, useEffect, useRef } from 'react';
import DATA from '../data/schema-therapie.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// Sachliche Referenz zu den 18 frühen maladaptiven Schemata nach Jeffrey Young, siehe
// schema-therapie.json für Quelle und Hinweis. Bewusst ohne hypnosystemische
// Ursprungsintention/Schutzfunktion-Reframe-Ebene, das wäre ein eigener, späterer Schritt.
// UI-Muster wie Methodenbox: flaches Karten-Raster, per Domäne filterbar, Klick öffnet das
// bekannte Fullscreen-Detailfenster mit Blättern und Zurück-nach-oben.

const DOMAENEN_CLASS = {
  'Abgetrenntheit & Ablehnung': 'st-domain-1',
  'Beeinträchtigte Autonomie & Leistung': 'st-domain-2',
  'Beeinträchtigte Grenzen': 'st-domain-3',
  'Fremdausrichtung': 'st-domain-4',
  'Übermäßige Wachsamkeit & Gehemmtheit': 'st-domain-5'
};

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.name, item.domaene, item.beschreibung].join(' ').toLowerCase().includes(q);
}

// Kreisdiagramm des Schema-Modus-Modells: Kindmodi, Bewältigungsmodi und Elternmodi als
// drei Cluster um den gesunden Erwachsenenmodus in der Mitte, mit Pfeilen, die die
// therapeutische Richtung andeuten (Kindanteile würdigen, Eltern-/Bewältigungsmodi
// beruhigen bzw. begrenzen, zugunsten des gesunden Erwachsenen).
function ModusModellGrafik(){
  return (
    <svg viewBox="0 0 640 460" role="img" aria-label="Schema-Modus-Modell: Kindmodi, Bewältigungsmodi und Elternmodi um den gesunden Erwachsenenmodus">
      <title>Schema-Modus-Modell</title>
      <defs>
        <marker id="stArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-text)" />
        </marker>
      </defs>

      <line x1="320" y1="92" x2="320" y2="184" stroke="var(--terracotta)" strokeWidth="2.5" markerEnd="url(#stArrow)" />
      <line x1="175" y1="336" x2="272" y2="288" stroke="var(--sage)" strokeWidth="2.5" markerEnd="url(#stArrow)" />
      <line x1="495" y1="336" x2="392" y2="288" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#stArrow)" />

      <circle cx="320" cy="250" r="62" fill="var(--primary)" />
      <text x="320" y="245" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="14" fill="#fff">Gesunder</text>
      <text x="320" y="263" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="14" fill="#fff">Erwachsener</text>

      <text x="320" y="26" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--terracotta)">KINDMODI</text>
      {[
        { x: 45, label: 'Verletzlich' },
        { x: 185, label: 'Wütend' },
        { x: 325, label: 'Impulsiv' },
        { x: 465, label: 'Fröhlich' }
      ].map(p => (
        <g key={p.label}>
          <rect x={p.x} y="46" width="130" height="32" rx="16" fill="var(--terracotta)" opacity="0.14" stroke="var(--terracotta)" />
          <text x={p.x + 65} y="67" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontSize="12" fill="var(--terracotta)">{p.label}</text>
        </g>
      ))}

      <text x="150" y="322" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--sage)">BEWÄLTIGUNGSMODI</text>
      {[
        { y: 336, label: 'Unterwerfung' },
        { y: 371, label: 'Vermeidung / Rückzug' },
        { y: 406, label: 'Überkompensation' }
      ].map(p => (
        <g key={p.label}>
          <rect x="20" y={p.y} width="260" height="28" rx="14" fill="var(--sage)" opacity="0.18" stroke="var(--sage)" />
          <text x="150" y={p.y + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontSize="12" fill="var(--muted-text)">{p.label}</text>
        </g>
      ))}

      <text x="520" y="322" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--accent)">ELTERNMODI</text>
      {[
        { y: 336, label: 'Strafender Elternteil' },
        { y: 371, label: 'Fordernder Elternteil' }
      ].map(p => (
        <g key={p.label}>
          <rect x="390" y={p.y} width="260" height="28" rx="14" fill="var(--accent)" opacity="0.22" stroke="var(--accent)" />
          <text x="520" y={p.y + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontSize="12" fill="var(--muted-text)">{p.label}</text>
        </g>
      ))}
    </svg>
  );
}

function SchemaCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card ' + DOMAENEN_CLASS[item.domaene] + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          {item.name}
          <span className={'kat-badge ' + DOMAENEN_CLASS[item.domaene]}>{item.domaene}</span>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.beschreibung}</span>
      </div>
    </div>
  );
}

function SchemaModal({ item, onClose, onPrev, onNext, positionLabel }){
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
        aria-label={item.name}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Voriges Schema">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächstes Schema">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.name}
              <span className={'kat-badge ' + DOMAENEN_CLASS[item.domaene]}>{item.domaene}</span>
            </div>
          </div>
          <div className="card-modal-body">
            <div className="details">
              <div className="block">
                <h4>Kurzbeschreibung</h4>
                <p>{item.beschreibung}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchemaTherapie({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [domaene, setDomaene] = useState(null);
  const [openId, setOpenId] = useState(initialOpenId || null);

  const gefiltert = useMemo(
    () => DATA.schemata.filter(s => matches(s, query) && (!domaene || s.domaene === domaene)),
    [query, domaene]
  );

  const offenesItem = openId ? DATA.schemata.find(s => s.id === openId) : null;
  const navIndex = offenesItem ? gefiltert.findIndex(s => s.id === offenesItem.id) : -1;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }
  function blaettern(richtung){
    if(gefiltert.length === 0 || navIndex === -1) return;
    const naechster = (navIndex + richtung + gefiltert.length) % gefiltert.length;
    setOpenId(gefiltert[naechster].id);
  }

  return (
    <>
      <div className="fokus-hero" style={{ padding: '1.6rem 1.4rem' }}>
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2 style={{ fontSize: '1.35rem' }}>{DATA.meta.untertitel}</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.88rem', lineHeight: 1.6, margin: '0.6rem 0 0', maxWidth: '760px', opacity: 0.92 }}>
          {DATA.meta.hinweis}
        </p>
        <div style={{ maxWidth: '640px', margin: '1.2rem auto 0' }}>
          <ModusModellGrafik />
        </div>
        <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.76rem', textAlign: 'center', margin: '0.6rem 0 0', opacity: 0.85 }}>
          Modus-Modell, vereinfacht. Ziel ist ein gestärkter gesunder Erwachsener, der Kindanteile würdigt und Eltern-/Bewältigungsmodi beruhigt statt sie auszuspielen.
        </p>
      </div>

      <div className="picker-wrap">
        <p className="picker-label">Schema-Therapie · nach Domäne filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!domaene ? ' active' : '')} onClick={() => { setDomaene(null); setOpenId(null); }}>Alle zeigen</button>
          {DATA.meta.domaenen.map(d => (
            <button
              key={d}
              className={'chip kat-chip ' + DOMAENEN_CLASS[d] + (domaene === d ? ' active' : '')}
              onClick={() => { setDomaene(domaene === d ? null : d); setOpenId(null); }}
            >
              {d}
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
            placeholder="Schema suchen, z. B. Verlassenheit, Perfektionismus …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{gefiltert.length} / {DATA.schemata.length}</span>
        </div>
      </div>

      <main>
        {gefiltert.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen oder Domäne zurücksetzen.</div>
        ) : (
          <div className="grid">
            {gefiltert.map(item => (
              <SchemaCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
            ))}
          </div>
        )}
      </main>

      {offenesItem && (
        <SchemaModal
          key={offenesItem.id}
          item={offenesItem}
          onClose={close}
          onPrev={() => blaettern(-1)}
          onNext={() => blaettern(1)}
          positionLabel={navIndex !== -1 ? `${navIndex + 1} / ${gefiltert.length}` : null}
        />
      )}
    </>
  );
}
