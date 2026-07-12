import { useState } from 'react';
import DATA from '../data/steuerposition-ueben.json';

export default function SteuerpositionUeben(){
  const [zeigeOriginal, setZeigeOriginal] = useState(false);

  return (
    <main className="up-main">
      <div className="up-hero">
        <p className="eyebrow">{DATA.meta.titel}</p>
        <h2>{DATA.meta.untertitel}</h2>
      </div>

      <p className="up-hero-sub">{DATA.meta.intro}</p>

      <div className="up-modus-wann">
        <h4>{DATA.rahmen.titel}</h4>
        <p>{DATA.rahmen.text}</p>
      </div>

      <div className="up-modus-leitplanke" style={{ margin: '1.1rem 0' }}>
        <h4>{DATA.kernsatz.titel}</h4>
        <p>„{DATA.kernsatz.text}"</p>
      </div>

      <div className="up-modus-phasen">
        {DATA.schritte.map((s, i) => (
          <div className="up-phase" key={i}>
            <div className="up-phase-nr">{i + 1}</div>
            <div className="up-phase-body">
              <h5>{s.titel}</h5>
              <p>{s.text}</p>
              <div className="sp-formulierung">„{s.formulierung}"</div>
            </div>
          </div>
        ))}
      </div>

      <p className="up-modus-quelle" style={{ marginTop: '1.2rem' }}>{DATA.quelle}</p>

      <div className="up-modus-wann" style={{ marginTop: '1.2rem' }}>
        <h4>Original-Referenz</h4>
        <p>{DATA.original.hinweis}</p>
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginTop: '0.7rem' }}>
          <a className="btn-primary" href={DATA.original.pdfDatei} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'inline-block' }}>
            {DATA.original.pdfLabel}
          </a>
          <button className="btn-primary" onClick={() => setZeigeOriginal(v => !v)}>
            {zeigeOriginal ? 'Originaltext ausblenden' : 'Originaltext 1:1 anzeigen'}
          </button>
        </div>

        {zeigeOriginal && (
          <div style={{ marginTop: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <h5 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: 'var(--primary)', margin: 0 }}>{DATA.original.titel}</h5>
            {DATA.original.text.map((absatz, i) => (
              <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>{absatz}</p>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
