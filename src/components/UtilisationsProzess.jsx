import { useState } from 'react';
import DATA from '../data/utilisationsprozess.json';

function ModusCard({ modus, isOpen, onToggle }){
  return (
    <div className={'up-modus-card' + (isOpen ? ' open' : '')}>
      <button className="up-modus-head" onClick={() => onToggle(modus.id)} aria-expanded={isOpen}>
        <span className="up-modus-nr">{modus.nr}</span>
        <span className="up-modus-headtext">
          <span className="up-modus-titel">{modus.titel}</span>
          <span className="up-modus-kurz">{modus.kurz}</span>
        </span>
        <span className="toggle-icon">{isOpen ? '–' : '+'}</span>
      </button>

      {isOpen && (
        <div className="up-modus-body">
          <div className="up-modus-wann">
            <h4>Wann dieser Modus greift</h4>
            <p>{modus.wann}</p>
          </div>

          {modus.leitplanke && (
            <div className="up-modus-leitplanke">
              <h4>Leitplanke</h4>
              <p>{modus.leitplanke}</p>
            </div>
          )}

          <div className="up-modus-phasen">
            {modus.phasen.map((p, i) => (
              <div className="up-phase" key={i}>
                <div className="up-phase-nr">{i + 1}</div>
                <div className="up-phase-body">
                  <h5>{p.titel}</h5>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          {modus.abschluss && (
            <div className="up-modus-abschluss">
              <h4>Abschluss</h4>
              <p>{modus.abschluss}</p>
            </div>
          )}

          <p className="up-modus-quelle">{modus.quelle}</p>
        </div>
      )}
    </div>
  );
}

export default function UtilisationsProzess(){
  const [openId, setOpenId] = useState(DATA.modi[0].id);

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
        {DATA.modi.map(modus => (
          <ModusCard key={modus.id} modus={modus} isOpen={openId === modus.id} onToggle={toggle} />
        ))}
      </div>
    </main>
  );
}
