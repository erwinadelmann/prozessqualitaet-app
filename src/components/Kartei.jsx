import { useState, useMemo } from 'react';
import DATA from '../data/muster.json';

const KATEGORIE_CLASS = {
  'Beziehung & Bindung': 'kk-beziehung',
  'Leistung & Kontrolle': 'kk-leistung',
  'Emotionsregulation & Schutz': 'kk-emotion',
  'Süchte & Regulationsverhalten': 'kk-sucht',
  'Verantwortung & Selbstwirksamkeit': 'kk-verantwortung'
};

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.muster, item.anteil_alt, item.anteil_neu, item.ursprungsintention, item.schutzfunktion]
    .join(' ').toLowerCase().includes(q);
}

function MusterCard({ item, isOpen, onToggle }){
  return (
    <div
      className={'card' + (isOpen ? ' open' : '') + (item.referenzbeispiel ? ' referenz' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={onToggle}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onToggle(); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          {item.muster}
          {item.referenzbeispiel && <span className="referenz-badge">Referenz-Beispiel</span>}
          <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
        </div>
        <div className="toggle-icon">{isOpen ? '−' : '+'}</div>
      </div>
      <div className="anteil-line">
        <span className="anteil-alt">{item.anteil_alt}</span>
        <span>→</span>
        <span className="anteil-neu">{item.anteil_neu}</span>
      </div>
      {isOpen && (
        <div className="details">
          <div className="block">
            <h4>Ursprungsintention</h4>
            <p>{item.ursprungsintention}</p>
          </div>
          <div className="block">
            <h4>Schutzfunktion</h4>
            <p>{item.schutzfunktion}</p>
          </div>
          {item.ssi_zwischenschritt && (
            <div className="block steps">
              <h4>Zwischenschritt, Systemische Selbstintegration nach Langlotz</h4>
              <p>{item.ssi_zwischenschritt}</p>
            </div>
          )}
          <div className="block steps">
            <h4>Umlenkung als {item.anteil_neu}, Inner Game in drei Schritten</h4>
            <ol>
              <li><strong>1 · Wahrnehmen</strong>{item.schritt1}</li>
              <li><strong>2 · Dem wahren Selbst anvertrauen, mit der Bitte, es zu erfüllen</strong>{item.schritt2}</li>
              <li><strong>3 · Lernen ohne Selbstkritik</strong>{item.schritt3}</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Kartei(){
  const [query, setQuery] = useState('');
  const [kategorie, setKategorie] = useState(null);
  const [openId, setOpenId] = useState(null);

  const gefiltert = useMemo(
    () => DATA.muster.filter(m => matches(m, query) && (!kategorie || m.kategorie === kategorie)),
    [query, kategorie]
  );

  const referenz = gefiltert.find(m => m.referenzbeispiel);
  const rest = gefiltert.filter(m => !m.referenzbeispiel);

  const gruppen = useMemo(() => {
    const map = new Map();
    DATA.meta.kategorien.forEach(k => map.set(k, []));
    rest.forEach(item => {
      if(!map.has(item.kategorie)) map.set(item.kategorie, []);
      map.get(item.kategorie).push(item);
    });
    return [...map.entries()].filter(([, items]) => items.length > 0);
  }, [rest]);

  function toggle(id){ setOpenId(openId === id ? null : id); }

  return (
    <>
      <div className="picker-wrap">
        <p className="picker-label">Kartei · nach Kategorie filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!kategorie ? ' active' : '')} onClick={() => { setKategorie(null); setOpenId(null); }}>Alle zeigen</button>
          {DATA.meta.kategorien.map(kat => (
            <button
              key={kat}
              className={'chip kat-chip ' + KATEGORIE_CLASS[kat] + (kategorie === kat ? ' active' : '')}
              onClick={() => { setKategorie(kategorie === kat ? null : kat); setOpenId(null); }}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Muster oder Anteil suchen, z. B. Kontrolle, Rückzug, Wächter …"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <span className="count">{gefiltert.length} / {DATA.muster.length}</span>
        </div>
      </div>

      <main>
        {gefiltert.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen, etwa den Auslöser der Situation statt des Musternamens.</div>
        ) : (
          <>
            {referenz && (
              <div className="grid" style={{ marginBottom: '1.4rem' }}>
                <MusterCard item={referenz} isOpen={openId === referenz.id} onToggle={() => toggle(referenz.id)} />
              </div>
            )}
            {gruppen.map(([kat, items]) => (
              <div key={kat} className="kategorie-gruppe">
                <h3 className={'kategorie-titel ' + KATEGORIE_CLASS[kat]}>{kat} <span className="kategorie-count">{items.length}</span></h3>
                <div className="grid">
                  {items.map(item => (
                    <MusterCard key={item.id} item={item} isOpen={openId === item.id} onToggle={() => toggle(item.id)} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </>
  );
}
