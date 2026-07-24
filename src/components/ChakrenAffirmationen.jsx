import DATA from '../data/chakren-affirmationen.json';

// Eigens gezeichnete, ruhige Sitzfigur-Silhouette, kein fremdes Bild. Die sieben
// Chakren-Punkte sitzen entlang der Körperachse, von oben (Krone) nach unten (Wurzel),
// in derselben Reihenfolge wie DATA.chakren (Feld "reihenfolge").
function SitzfigurSilhouette(){
  return (
    <svg viewBox="0 0 200 320" className="chakren-figur-svg" aria-hidden="true">
      <circle cx="100" cy="38" r="24" fill="var(--ink)" opacity="0.88"/>
      <path
        d="M100 60
           C 60 66, 40 100, 42 140
           C 20 160, 8 200, 14 230
           C 40 220, 55 210, 60 195
           C 55 230, 70 250, 100 255
           C 130 250, 145 230, 140 195
           C 145 210, 160 220, 186 230
           C 192 200, 180 160, 158 140
           C 160 100, 140 66, 100 60 Z"
        fill="var(--ink)" opacity="0.88"
      />
      <ellipse cx="100" cy="270" rx="90" ry="26" fill="var(--ink)" opacity="0.88"/>
      {DATA.chakren.map(c => (
        <circle key={c.id} cx="100" cy={CHAKRA_Y[c.id]} r="8" fill={c.farbe} stroke="#fff" strokeWidth="2"/>
      ))}
    </svg>
  );
}

// Y-Positionen entlang der Körperachse, von der Kopfmitte (Krone) bis zur Sitzbasis (Wurzel).
const CHAKRA_Y = {
  krone: 14,
  drittes_auge: 34,
  hals: 62,
  herz: 108,
  solarplexus: 155,
  sakral: 195,
  wurzel: 248
};

export default function ChakrenAffirmationen(){
  const chakren = [...DATA.chakren].sort((a, b) => a.reihenfolge - b.reihenfolge);

  return (
    <>
      <div className="chakren-hero-wrap">
        <p className="nlp-hero-kicker">Rubrik · Energiearbeit</p>
        <h2 className="nlp-hero-titel">{DATA.meta.titel}</h2>
        <p className="nlp-hero-sub">{DATA.meta.untertitel}</p>
      </div>

      <div className="chakren-visual-wrap">
        <SitzfigurSilhouette />
        <ol className="chakren-liste">
          {chakren.map(c => (
            <li key={c.id} className="chakren-liste-item">
              <span className="chakren-punkt" style={{ background: c.farbe }} aria-hidden="true"></span>
              <span className="chakren-liste-text">
                <span className="chakren-affirmation-en">„{c.affirmation_en}"</span>
                <span className="chakren-affirmation-de">{c.affirmation_de}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="methodenbox-hinweis chakren-wirkaussage">{DATA.meta.wirkaussage}</div>
      <div className="methodenbox-hinweis">{DATA.meta.hinweis}</div>

      <main>
        <div className="grid">
          {chakren.map(c => (
            <div className="card chakren-card" key={c.id} style={{ borderLeftColor: c.farbe }}>
              <div className="card-top">
                <div className="muster-name">
                  {c.name_deutsch}
                  <span className="kat-badge" style={{ background: c.farbe }}>{c.name_sanskrit}</span>
                </div>
              </div>
              <div className="anteil-line">
                <span>{c.koerperregion}</span>
              </div>
              <div className="block" style={{ marginTop: '0.7rem' }}>
                <p className="method-zitat">„{c.affirmation_en}" · {c.affirmation_de}</p>
              </div>
              <div className="block">
                <p>{c.kurzbeschreibung}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
