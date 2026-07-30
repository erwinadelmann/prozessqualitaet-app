import { useState, useRef, useEffect } from 'react';
import DATA from '../data/theoretische-grundlagen.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// Theoretische Grundlagen: wie Erleben entsteht und wirksam beeinflusst wird, dazu die
// Modelle von Gunther Schmidt (Hypnosystemik) und Milton Erickson (Utilisation). Gleiches
// Muster wie ACTDefusion/Kartei/Methodenbox: flaches Karten-Raster, Klick öffnet die
// bekannte bildschirmfüllende Detailansicht, mit Blättern (rotierend) und Zurück-nach-oben.
// Anders als ACTDefusion: der Vergleich-Block liest Spalten/Zeilen aus den Daten, statt
// Spaltentitel hart zu codieren, damit die Tabelle beliebige Vergleiche abbilden kann.

function Vergleich({ vergleich }){
  const { spalten, zeilen } = vergleich;
  return (
    <div className="act-vergleich">
      <div className="act-vergleich-row act-vergleich-head" style={{ gridTemplateColumns: `1fr ${'1.4fr '.repeat(spalten.length - 1)}` }}>
        {spalten.map((s, i) => <div key={i}>{s}</div>)}
      </div>
      {zeilen.map((z, i) => (
        <div
          className="act-vergleich-row"
          style={{ gridTemplateColumns: `1fr ${'1.4fr '.repeat(z.werte.length)}` }}
          key={i}
        >
          <div className="act-vergleich-merkmal">{z.merkmal}</div>
          {z.werte.map((w, j) => <div key={j}>{w}</div>)}
        </div>
      ))}
    </div>
  );
}

function AbschnittCard({ abschnitt, isOpen, onOpen }){
  return (
    <div
      className={'card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(abschnitt.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(abschnitt.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">{abschnitt.titel}</div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{abschnitt.kurz}</span>
      </div>
    </div>
  );
}

function AbschnittModal({ abschnitt, onClose, onPrev, onNext, positionLabel }){
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

  if(!abschnitt) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={abschnitt.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Voriger Abschnitt">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächster Abschnitt">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">{abschnitt.titel}</div>
            <div className="anteil-line"><span>{abschnitt.kurz}</span></div>
          </div>
          <div className="card-modal-body">
            <div className="details">
              {abschnitt.text && abschnitt.text.split('\n\n').map((absatz, i) => (
                <div className="block" key={i}>
                  <p>{absatz}</p>
                </div>
              ))}
              {abschnitt.punkte && (
                <div className="block">
                  <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                    {abschnitt.punkte.map((p, i) => (
                      <li key={i} style={{ marginBottom: '0.9rem' }}>
                        <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem' }}>{p.titel}</strong>
                        {p.text}
                        {p.praxis && (
                          <div style={{ marginTop: '0.4rem', paddingLeft: '0.7rem', borderLeft: '2px solid var(--terracotta, #b65c43)' }}>
                            <span style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--terracotta, #b65c43)', fontWeight: 700, marginBottom: '0.15rem' }}>Für die Praxis</span>
                            {p.praxis.split('\n\n').map((absatz, j) => (
                              <p key={j} style={{ margin: j === 0 ? '0 0 0.4rem' : 0, fontStyle: j === 0 ? 'italic' : 'normal', fontSize: j === 0 ? undefined : '0.9em', opacity: j === 0 ? 1 : 0.85 }}>{absatz}</p>
                            ))}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {abschnitt.vergleich && (
                <div className="block">
                  <Vergleich vergleich={abschnitt.vergleich} />
                </div>
              )}
              {abschnitt.praxis && (
                <div className="block" style={{ paddingLeft: '0.9rem', borderLeft: '2px solid var(--terracotta, #b65c43)' }}>
                  <span style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--terracotta, #b65c43)', fontWeight: 700, marginBottom: '0.3rem' }}>Für die Praxis</span>
                  {abschnitt.praxis.split('\n\n').map((absatz, j) => (
                    <p key={j} style={{ margin: j === 0 ? '0 0 0.4rem' : 0, fontStyle: j === 0 ? 'italic' : 'normal', fontSize: j === 0 ? undefined : '0.9em', opacity: j === 0 ? 1 : 0.85 }}>{absatz}</p>
                  ))}
                </div>
              )}
              {abschnitt.zusatz && (
                <div className="block">
                  <span style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.7rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted, #8e9d9a)', fontWeight: 700, marginBottom: '0.3rem' }}>Wissenschaftliche Einordnung</span>
                  <p style={{ fontStyle: 'italic' }}>{abschnitt.zusatz}</p>
                </div>
              )}
              {abschnitt.quelle && (
                <div className="block">
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted, #8e9d9a)' }}>Quellen: {abschnitt.quelle}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TheoretischeGrundlagen({ initialOpenId }){
  const [openId, setOpenId] = useState(initialOpenId || null);

  const offenerAbschnitt = openId ? DATA.abschnitte.find(a => a.id === openId) : null;
  const navIndex = offenerAbschnitt ? DATA.abschnitte.findIndex(a => a.id === offenerAbschnitt.id) : -1;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }
  function blaettern(richtung){
    if(DATA.abschnitte.length === 0 || navIndex === -1) return;
    const naechster = (navIndex + richtung + DATA.abschnitte.length) % DATA.abschnitte.length;
    setOpenId(DATA.abschnitte[naechster].id);
  }

  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
        {DATA.meta.untertitel_klein && <p className="up-hero-sub">{DATA.meta.untertitel_klein}</p>}
      </div>

      <div className="grid" style={{ marginTop: '1.2rem' }}>
        {DATA.abschnitte.map(abschnitt => (
          <AbschnittCard key={abschnitt.id} abschnitt={abschnitt} isOpen={openId === abschnitt.id} onOpen={open} />
        ))}
      </div>

      {offenerAbschnitt && (
        <AbschnittModal
          key={offenerAbschnitt.id}
          abschnitt={offenerAbschnitt}
          onClose={close}
          onPrev={() => blaettern(-1)}
          onNext={() => blaettern(1)}
          positionLabel={navIndex !== -1 ? `${navIndex + 1} / ${DATA.abschnitte.length}` : null}
        />
      )}
    </main>
  );
}
