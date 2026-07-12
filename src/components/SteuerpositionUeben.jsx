import DATA from '../data/steuerposition-ueben.json';

export default function SteuerpositionUeben(){
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
    </main>
  );
}
