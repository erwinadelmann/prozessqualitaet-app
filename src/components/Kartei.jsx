import { useState, useMemo } from 'react';
import DATA from '../data/muster.json';

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.muster, item.anteil_alt, item.anteil_neu, item.ursprungsintention, item.schutzfunktion]
    .join(' ').toLowerCase().includes(q);
}

export default function Kartei(){
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const list = useMemo(() => DATA.muster.filter(m => matches(m, query)), [query]);

  function selectFromChip(item){
    setQuery(item.muster);
    setOpenId(item.id);
  }

  return (
    <>
      <div className="picker-wrap">
        <p className="picker-label">Themen-Picker · direkt zu einem Muster springen</p>
        <div className="chip-grid">
          <button className="chip reset" onClick={() => { setQuery(''); setOpenId(null); }}>Alle zeigen</button>
          {DATA.muster.map(item => (
            <button
              key={item.id}
              className={'chip' + (openId === item.id ? ' active' : '')}
              title={`${item.muster} → ${item.anteil_neu}. ${item.ursprungsintention}`}
              onClick={() => selectFromChip(item)}
            >
              {item.muster}
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
          <span className="count">{list.length} / {DATA.muster.length}</span>
        </div>
      </div>

      <main>
        {list.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen, etwa den Auslöser der Situation statt des Musternamens.</div>
        ) : (
          <div className="grid">
            {list.map(item => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={'card' + (isOpen ? ' open' : '') + (item.referenzbeispiel ? ' referenz' : '')}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setOpenId(isOpen ? null : item.id); } }}
                >
                  <div className="card-top">
                    <div className="muster-name">
                      {item.muster}
                      {item.referenzbeispiel && <span className="referenz-badge">Referenz-Beispiel</span>}
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
            })}
          </div>
        )}
      </main>
    </>
  );
}
