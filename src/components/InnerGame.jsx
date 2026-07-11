import { INNER_GAME } from '../data/innergame.js';

export default function InnerGame(){
  return (
    <main>
      <div className="ig-reminder">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p>{INNER_GAME.reminder}</p>
      </div>

      <div className="ig-abwertung">
        <p className="eyebrow">{INNER_GAME.abwertungsfrage.eyebrow}</p>
        <h3>{INNER_GAME.abwertungsfrage.frage}</h3>
        <p className="ig-abwertung-hinweis">{INNER_GAME.abwertungsfrage.hinweis}</p>
        <p className="ig-abwertung-text">{INNER_GAME.abwertungsfrage.erklaerung}</p>
      </div>

      <div className="fokus-hero ig-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <p className="eyebrow">{INNER_GAME.sehnsuchtsfrage.eyebrow}</p>
        <h2>{INNER_GAME.sehnsuchtsfrage.frage}</h2>
        <p className="ig-zielsatz">„{INNER_GAME.sehnsuchtsfrage.zielsatz}"</p>
      </div>

      <div className="ig-methode">
        <p className="ig-methode-titel">{INNER_GAME.methode.titel} <span>{INNER_GAME.methode.untertitel}</span></p>
        <p className="ig-methode-text">{INNER_GAME.methode.text}</p>
      </div>

      <p className="fokus-section-label">Die drei Schritte</p>
      <div className="ig-schritte">
        {INNER_GAME.schritte.map((s, i) => (
          <div className="ig-schritt-card" style={{ animationDelay: `${i * 0.08}s` }} key={s.nr}>
            <div className="ig-schritt-nr">{s.nr}</div>
            <div className="ig-schritt-body">
              <h3>{s.titel}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
