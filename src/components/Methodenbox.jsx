import { useState, useMemo } from 'react';
import DATA from '../data/methodenbox.json';

const KATEGORIE_CLASS = {
  'Grundannahme': 'kat-grundannahme',
  'Haltung & Prinzip': 'kat-haltung',
  'Prozessformat': 'kat-prozess',
  'Frage-Technik': 'kat-frage',
  'Werkzeug & Modell': 'kat-werkzeug'
};

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.titel, item.kernaussage, item.zitat, item.einsatzkontext, item.ziel]
    .filter(Boolean).join(' ').toLowerCase().includes(q);
}

export default function Methodenbox(){
  const [query, setQuery] = useState('');
  const [kategorie, setKategorie] = useState(null);
  const [openId, setOpenId] = useState(null);

  const list = useMemo(() => DATA.elemente.filter(item =>
    matches(item, query) && (!kategorie || item.kategorie === kategorie)
  ), [query, kategorie]);

  return (
    <>
      <div className="picker-wrap">
        <p className="picker-label">Methodenbox · nach Kategorie filtern</p>
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
            placeholder="Element suchen, z. B. Widerstand, Steuerposition, Reframing …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{list.length} / {DATA.elemente.length}</span>
        </div>
      </div>

      <div className="methodenbox-hinweis">{DATA.meta.hinweis}</div>

      <main>
        {list.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen oder Kategorie-Filter zurücksetzen.</div>
        ) : (
          <div className="grid">
            {list.map(item => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={'card method-card' + (isOpen ? ' open' : '')}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setOpenId(isOpen ? null : item.id); } }}
                >
                  <div className="card-top">
                    <div className="muster-name">
                      {item.titel}
                      <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
                    </div>
                    <div className="toggle-icon">{isOpen ? '−' : '+'}</div>
                  </div>
                  <div className="anteil-line">
                    <span>{item.kernaussage}</span>
                  </div>
                  {isOpen && (
                    <div className="details">
                      <div className="block">
                        <h4>Einsatzkontext</h4>
                        <p>{item.einsatzkontext}</p>
                      </div>
                      <div className="block">
                        <h4>Ziel</h4>
                        <p>{item.ziel}</p>
                      </div>
                      {item.zitat && (
                        <div className="block steps">
                          <h4>Formulierung</h4>
                          <p className="method-zitat">„{item.zitat}"</p>
                        </div>
                      )}
                      <div className="block steps">
                        <h4>Quelle</h4>
                        <p className="method-quelle">{item.quelle}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
