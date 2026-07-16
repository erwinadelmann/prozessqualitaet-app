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

const MM = DATA.modusmodell;
const G = id => MM.gruppen.find(g => g.id === id);

// Kreisdiagramm des Schema-Modus-Modells: belastete Kindmodi und der gesunde Kindmodus
// deutlich getrennt (unterschiedliche Farbe, eigene Beschriftung), Bewältigungsmodi und
// Elternmodi als weitere Cluster, alle um den gesunden Erwachsenenmodus in der Mitte, mit
// eigenen Eigenschaften darunter. Text durchgehend hell für Lesbarkeit auf dem dunklen
// Hero-Hintergrund. Klick auf einen Modus hebt ihn samt zugehörigem Pfeil hervor und zeigt
// die Kurzbeschreibung darunter, alle anderen Elemente treten zurück, so werden einzelne
// Konstellationen sofort sichtbar.
function ModusModellGrafik(){
  const [aktiv, setAktiv] = useState(null);

  function waehle(modus, gruppeId){
    setAktiv(prev => (prev && prev.id === modus.id) ? null : { ...modus, gruppeId });
  }

  function pillProps(modus, gruppeId){
    const istAktiv = aktiv && aktiv.id === modus.id;
    const gedimmt = aktiv && !istAktiv;
    return {
      role: 'button',
      tabIndex: 0,
      onClick: () => waehle(modus, gruppeId),
      onKeyDown: e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); waehle(modus, gruppeId); } },
      style: {
        cursor: 'pointer',
        opacity: gedimmt ? 0.3 : 1,
        transform: istAktiv ? 'scale(1.06)' : 'scale(1)',
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transition: 'opacity 0.25s ease, transform 0.25s ease'
      }
    };
  }

  function arrowProps(gruppeId, farbe){
    const istAktiv = aktiv && aktiv.gruppeId === gruppeId;
    const gedimmt = aktiv && !istAktiv;
    return {
      className: 'st-arrow',
      stroke: farbe,
      strokeWidth: istAktiv ? 4 : 2.5,
      opacity: gedimmt ? 0.2 : 1,
      style: { transition: 'opacity 0.25s ease, stroke-width 0.25s ease' }
    };
  }

  const belastet = G('kindmodi_belastet').modi;
  const gesundKind = G('kindmodus_gesund').modi[0];
  const bewaeltigung = G('bewaeltigungsmodi').modi;
  const eltern = G('elternmodi').modi;
  const erwachsenerGruppe = G('gesunder_erwachsener');
  const erwachsener = erwachsenerGruppe.modi[0];
  const eigenschaften = erwachsenerGruppe.eigenschaften;

  const belastetPos = [45, 175, 305];
  const bewaeltigungPos = [414, 448, 482];
  const elternPos = [414, 448];
  const eigenschaftenPos = [40, 212, 384, 556];

  return (
    <>
      <svg viewBox="0 0 760 610" role="img" aria-label="Schema-Modus-Modell: belastete Kindmodi, gesunder Kindmodus, Bewältigungsmodi und Elternmodi um den gesunden Erwachsenenmodus, mit dessen Eigenschaften darunter. Klickbar für Details.">
        <title>Schema-Modus-Modell, interaktiv</title>
        <defs>
          <marker id="stArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--muted-text)" />
          </marker>
        </defs>

        <line {...arrowProps('kindmodi_belastet', 'var(--terracotta)')} x1="220" y1="82" x2="345" y2="248" markerEnd="url(#stArrow)" />
        <line {...arrowProps('kindmodus_gesund', 'var(--sage)')} x1="560" y1="82" x2="418" y2="248" markerEnd="url(#stArrow)" />
        <line {...arrowProps('bewaeltigungsmodi', 'var(--muted)')} x1="230" y1="405" x2="332" y2="352" markerEnd="url(#stArrow)" />
        <line {...arrowProps('elternmodi', 'var(--accent)')} x1="570" y1="405" x2="430" y2="352" markerEnd="url(#stArrow)" />
        <line className="st-arrow" stroke="var(--primary)" strokeWidth="2" strokeDasharray="3 5" opacity="0.6" x1="380" y1="364" x2="380" y2="522" />

        <g className="st-center-enter">
          <circle className="st-pulse-ring" cx="380" cy="300" r="60" />
          <circle className="st-pulse-ring st-delay-1" cx="380" cy="300" r="60" />
          <circle className="st-pulse-ring st-delay-2" cx="380" cy="300" r="60" />
          <circle
            {...pillProps(erwachsener, 'gesunder_erwachsener')}
            cx="380" cy="300" r="64" fill="var(--primary)"
            stroke={aktiv && aktiv.id === erwachsener.id ? '#fff' : 'none'} strokeWidth="3"
          />
          <text x="380" y="295" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="15" fill="#fff" style={{ pointerEvents: 'none' }}>Gesunder</text>
          <text x="380" y="314" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="700" fontSize="15" fill="#fff" style={{ pointerEvents: 'none' }}>Erwachsener</text>
        </g>

        <g className="st-enter" style={{ animationDelay: '0.05s' }}>
          <text x="220" y="24" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--terracotta)">BELASTETE KINDMODI</text>
          {belastet.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'kindmodi_belastet')}>
              <rect x={belastetPos[i]} y="40" width="120" height="34" rx="17" fill="var(--terracotta)" opacity="0.28" stroke="var(--terracotta)" strokeWidth="1.5" />
              <text x={belastetPos[i] + 60} y="62" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12.5" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.1s' }}>
          <text x="560" y="24" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--sage)">GESUNDER KINDMODUS</text>
          <g {...pillProps(gesundKind, 'kindmodus_gesund')}>
            <rect x="460" y="40" width="200" height="34" rx="17" fill="var(--sage)" opacity="0.32" stroke="var(--sage)" strokeWidth="1.5" />
            <text x="560" y="62" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12.5" fill="#fff">{gesundKind.name}</text>
          </g>
        </g>

        <g className="st-enter" style={{ animationDelay: '0.16s' }}>
          <text x="175" y="400" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--muted)">BEWÄLTIGUNGSMODI</text>
          {bewaeltigung.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'bewaeltigungsmodi')}>
              <rect x="40" y={bewaeltigungPos[i]} width="270" height="28" rx="14" fill="var(--muted)" opacity="0.32" stroke="var(--muted)" strokeWidth="1.5" />
              <text x="175" y={bewaeltigungPos[i] + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.22s' }}>
          <text x="585" y="400" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="13" letterSpacing="0.04em" fill="var(--accent)">ELTERNMODI</text>
          {eltern.map((m, i) => (
            <g key={m.id} {...pillProps(m, 'elternmodi')}>
              <rect x="450" y={elternPos[i]} width="270" height="28" rx="14" fill="var(--accent)" opacity="0.34" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="585" y={elternPos[i] + 19} textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight="600" fontSize="12" fill="#fff">{m.name}</text>
            </g>
          ))}
        </g>

        <g className="st-enter" style={{ animationDelay: '0.3s' }}>
          <text x="380" y="510" textAnchor="middle" fontFamily="'Montserrat', sans-serif" fontWeight="600" fontSize="12.5" letterSpacing="0.04em" fill="var(--secondary)">GESUNDER ERWACHSENER, GESTÄRKT DURCH</text>
          {eigenschaften.map((e, i) => {
            const istTurbo = e.id === 'turbo';
            return (
              <g key={e.id} {...pillProps(e, 'gesunder_erwachsener')}>
                <rect
                  x={eigenschaftenPos[i]} y="522" width="158" height="36" rx="18"
                  fill={istTurbo ? 'var(--secondary)' : 'var(--primary)'} opacity={istTurbo ? 0.4 : 0.3}
                  stroke={istTurbo ? 'var(--secondary)' : 'var(--primary)'} strokeWidth={istTurbo ? 2 : 1.5}
                />
                <text x={eigenschaftenPos[i] + 79} y="545" textAnchor="middle" fontFamily="'Open Sans', sans-serif" fontWeight={istTurbo ? 700 : 600} fontSize="12" fill="#fff">
                  {istTurbo ? '✦ ' + e.name : e.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{ minHeight: '2.6rem', padding: '0.7rem 1rem 0', textAlign: 'center' }}>
        {aktiv ? (
          <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.92rem', color: '#fff', margin: 0, maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
            <strong style={{ fontStyle: 'normal' }}>{aktiv.name}:</strong> {aktiv.beschreibung}
          </p>
        ) : (
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '0.76rem', color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            Auf einen Modus klicken für die Kurzbeschreibung.
          </p>
        )}
      </div>
    </>
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
        <div style={{ maxWidth: '1080px', width: '100%', margin: '1.4rem auto 0' }}>
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
