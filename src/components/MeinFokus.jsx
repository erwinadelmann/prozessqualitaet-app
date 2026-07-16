import { FOKUS, SP_BADGE_LABEL } from '../data/fokus.js';

export default function MeinFokus(){
  const m = FOKUS.muster;
  return (
    <main>
      <div className="fokus-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <h2 className="fokus-sehnsucht-titel">Meine Sehnsucht</h2>
        <p className="fokus-sehnsucht-text">{FOKUS.sehnsucht}</p>
      </div>

      <p className="fokus-section-label">Mein eigenes Muster, utilisiert</p>
      <div className="muster-eigen">
        <h3>{m.titel}</h3>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.92rem', margin: 0 }}>
          Mit der Absicht, stabile, planbare Ergebnisse in Qualität zu erzeugen.
        </p>
        <div className="fokus-grid2">
          <div className="block">
            <h4>Ursprungsintention</h4>
            <p>{m.ursprungsintention}</p>
          </div>
          <div className="block">
            <h4>Schutzfunktion</h4>
            <p>{m.schutzfunktion}</p>
          </div>
          <div className="block steps">
            <h4>Utilisation, Inner Game in drei Schritten</h4>
            <ol>
              <li><strong>1 · Wahrnehmen</strong>{m.schritt1}</li>
              <li><strong>2 · Dem wahren Selbst anvertrauen, mit der Bitte, es zu erfüllen</strong>{m.schritt2}</li>
              <li><strong>3 · Lernen ohne Selbstkritik</strong>{m.schritt3}</li>
            </ol>
          </div>
        </div>
      </div>

      <p className="fokus-section-label">Meine Startpunkte, der Weg vom Angebot zum zahlenden Kunden</p>
      <div className="startpunkte-grid">
        {FOKUS.startpunkte.map((sp, i) => (
          <div className={`startpunkt-card ${sp.farbe}`} style={{ animationDelay: `${i * 0.06}s` }} key={sp.titel}>
            <span className="sp-badge">{SP_BADGE_LABEL[sp.typ] || sp.typ}</span>
            <div className="sp-titel">{sp.titel}</div>
            <div className="sp-text">
              {sp.text}
              {sp.link && (
                <> <a href={sp.link} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>Zum Buch</a></>
              )}
            </div>
          </div>
        ))}
      </div>
      <p className="fokus-add-hint">Erweiterbar: neue Startpunkte im Datenmodul <code>src/data/fokus.js</code> ergänzen.</p>
    </main>
  );
}
