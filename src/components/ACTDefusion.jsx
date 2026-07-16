import { useState, useRef, useEffect } from 'react';
import DATA from '../data/act-defusion.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// ACT, Kognitive Defusion, sechs Abschnitte. Gleiches Muster wie Kartei/Methodenbox/
// Schema-Therapie/EMDR: flaches Karten-Raster, Klick öffnet die bekannte bildschirmfüllende
// Detailansicht an derselben Stelle, mit Blättern (rotierend) und Zurück-nach-oben.

function Vergleich({ rows }){
  return (
    <div className="act-vergleich">
      <div className="act-vergleich-row act-vergleich-head">
        <div>Merkmal</div>
        <div>Kognitive Umstrukturierung</div>
        <div>Kognitive Defusion</div>
      </div>
      {rows.map((r, i) => (
        <div className="act-vergleich-row" key={i}>
          <div className="act-vergleich-merkmal">{r.merkmal}</div>
          <div>{r.umstrukturierung}</div>
          <div>{r.defusion}</div>
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
              {abschnitt.text && (
                <div className="block">
                  <p>{abschnitt.text}</p>
                </div>
              )}
              {abschnitt.vergleich && (
                <div className="block">
                  <Vergleich rows={abschnitt.vergleich} />
                </div>
              )}
              {abschnitt.zusatz && (
                <div className="block">
                  <p style={{ fontStyle: 'italic' }}>{abschnitt.zusatz}</p>
                </div>
              )}
              {abschnitt.punkte && (
                <div className="block">
                  <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                    {abschnitt.punkte.map((p, i) => (
                      <li key={i} style={{ marginBottom: '0.6rem' }}>
                        <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem' }}>{p.titel}</strong>
                        {p.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ACTDefusion({ initialOpenId }){
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
