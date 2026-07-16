import { useState, useRef, useEffect } from 'react';
import DATA from '../data/emdr.json';
import ScrollTopButton from './ScrollTopButton.jsx';

// EMDR, acht Phasen. Gleiches Muster wie Kartei/Methodenbox/Schema-Therapie: flaches
// Karten-Raster, Klick öffnet die bekannte bildschirmfüllende Detailansicht an derselben
// Stelle, mit Blättern (rotierend) und Zurück-nach-oben.

function PhaseCard({ phase, isOpen, onOpen }){
  return (
    <div
      className={'card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(phase.nr)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(phase.nr); } }}
    >
      <div className="card-top">
        <div className="muster-name">Phase {phase.nr} · {phase.titel}</div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{phase.kurz}</span>
      </div>
    </div>
  );
}

function PhaseModal({ phase, onClose, onPrev, onNext, positionLabel }){
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

  if(!phase) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={phase.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Vorige Phase">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächste Phase">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">Phase {phase.nr} · {phase.titel}</div>
            <div className="anteil-line"><span>{phase.kurz}</span></div>
          </div>
          <div className="card-modal-body">
            <div className="details">
              <div className="block">
                <h4>Inhalt &amp; Ziel</h4>
                <p>{phase.inhalt}</p>
              </div>
              <div className="block">
                <h4>Funktion im Prozess</h4>
                <p>{phase.funktion}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ data, className }){
  return (
    <div className="details" style={{ marginTop: '1.6rem' }}>
      <div className={'block steps ' + className}>
        <h4>{data.titel}</h4>
        <p>{data.einleitung}</p>
        <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem' }}>
          {data.punkte.map((punkt, i) => (
            <li key={i} style={{ marginBottom: '0.6rem' }}>
              <strong style={{ display: 'block', fontFamily: "'Montserrat', sans-serif", fontSize: '0.82rem' }}>{punkt.titel}</strong>
              {punkt.text}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '0.6rem', fontStyle: 'italic' }}>{data.zusammenfassung}</p>
      </div>
    </div>
  );
}

export default function EMDR({ initialOpenNr }){
  const [openNr, setOpenNr] = useState(initialOpenNr || null);

  const offenePhase = openNr ? DATA.phasen.find(p => p.nr === openNr) : null;
  const navIndex = offenePhase ? DATA.phasen.findIndex(p => p.nr === offenePhase.nr) : -1;

  function open(nr){ setOpenNr(nr); }
  function close(){ setOpenNr(null); }
  function blaettern(richtung){
    if(DATA.phasen.length === 0 || navIndex === -1) return;
    const naechste = (navIndex + richtung + DATA.phasen.length) % DATA.phasen.length;
    setOpenNr(DATA.phasen[naechste].nr);
  }

  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
        {DATA.meta.untertitel_klein && <p className="up-hero-sub">{DATA.meta.untertitel_klein}</p>}
      </div>

      <div className="grid" style={{ marginTop: '1.2rem' }}>
        {DATA.phasen.map(phase => (
          <PhaseCard key={phase.nr} phase={phase} isOpen={openNr === phase.nr} onOpen={open} />
        ))}
      </div>

      {DATA.mechanismus && <InfoBlock data={DATA.mechanismus} className="erklaerung-block" />}
      {DATA.beiPersistenz && <InfoBlock data={DATA.beiPersistenz} className="wuerdigung-block" />}

      {offenePhase && (
        <PhaseModal
          key={offenePhase.nr}
          phase={offenePhase}
          onClose={close}
          onPrev={() => blaettern(-1)}
          onNext={() => blaettern(1)}
          positionLabel={navIndex !== -1 ? `${navIndex + 1} / ${DATA.phasen.length}` : null}
        />
      )}
    </main>
  );
}
