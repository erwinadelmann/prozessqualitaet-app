import { useState } from 'react';
import DATA from '../data/act-defusion.json';

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

function AbschnittCard({ abschnitt, isOpen, onToggle }){
  return (
    <div className={'up-modus-card' + (isOpen ? ' open' : '')}>
      <button className="up-modus-head" onClick={() => onToggle(abschnitt.id)} aria-expanded={isOpen}>
        <span className="up-modus-headtext">
          <span className="up-modus-titel">{abschnitt.titel}</span>
          <span className="up-modus-kurz">{abschnitt.kurz}</span>
        </span>
        <span className="toggle-icon">{isOpen ? '–' : '+'}</span>
      </button>

      {isOpen && (
        <div className="up-modus-body">
          {abschnitt.text && (
            <div className="up-modus-wann">
              <p>{abschnitt.text}</p>
            </div>
          )}

          {abschnitt.vergleich && <Vergleich rows={abschnitt.vergleich} />}

          {abschnitt.zusatz && (
            <div className="up-modus-abschluss">
              <p>{abschnitt.zusatz}</p>
            </div>
          )}

          {abschnitt.punkte && (
            <div className="up-modus-phasen">
              {abschnitt.punkte.map((p, i) => (
                <div className="up-phase" key={i}>
                  <div className="up-phase-nr">{i + 1}</div>
                  <div className="up-phase-body">
                    <h5>{p.titel}</h5>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ACTDefusion(){
  const [openId, setOpenId] = useState(DATA.abschnitte[0].id);

  function toggle(id){
    setOpenId(prev => prev === id ? null : id);
  }

  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
      </div>

      <p className="up-hinweis">{DATA.meta.hinweis}</p>

      <div className="up-modi-liste">
        {DATA.abschnitte.map(abschnitt => (
          <AbschnittCard key={abschnitt.id} abschnitt={abschnitt} isOpen={openId === abschnitt.id} onToggle={toggle} />
        ))}
      </div>
    </main>
  );
}
