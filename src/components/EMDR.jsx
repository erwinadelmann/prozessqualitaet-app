import { useState } from 'react';
import DATA from '../data/emdr.json';

function PhaseCard({ phase, isOpen, onToggle }){
  return (
    <div className={'up-modus-card' + (isOpen ? ' open' : '')}>
      <button className="up-modus-head" onClick={() => onToggle(phase.nr)} aria-expanded={isOpen}>
        <span className="up-modus-nr">{phase.nr}</span>
        <span className="up-modus-headtext">
          <span className="up-modus-titel">{phase.titel}</span>
          <span className="up-modus-kurz">{phase.kurz}</span>
        </span>
        <span className="toggle-icon">{isOpen ? '–' : '+'}</span>
      </button>

      {isOpen && (
        <div className="up-modus-body">
          <div className="up-modus-wann">
            <h4>Inhalt &amp; Ziel</h4>
            <p>{phase.inhalt}</p>
          </div>
          <div className="up-modus-abschluss">
            <h4>Funktion im Prozess</h4>
            <p>{phase.funktion}</p>
          </div>
        </div>
      )}
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
  const [openNr, setOpenNr] = useState(initialOpenNr || DATA.phasen[0].nr);

  function toggle(nr){
    setOpenNr(prev => prev === nr ? null : nr);
  }

  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
        {DATA.meta.untertitel_klein && <p className="up-hero-sub">{DATA.meta.untertitel_klein}</p>}
      </div>

      <div className="up-modi-liste">
        {DATA.phasen.map(phase => (
          <PhaseCard key={phase.nr} phase={phase} isOpen={openNr === phase.nr} onToggle={toggle} />
        ))}
      </div>

      {DATA.mechanismus && <InfoBlock data={DATA.mechanismus} className="erklaerung-block" />}
      {DATA.beiPersistenz && <InfoBlock data={DATA.beiPersistenz} className="wuerdigung-block" />}
    </main>
  );
}
