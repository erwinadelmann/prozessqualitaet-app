import { useState, useMemo, useEffect } from 'react';
import MUSTER_DATA from '../data/muster.json';
import NARRATIV_DATA from '../data/reframing-narrativ.json';

const KATEGORIE_CLASS = {
  'Beziehung & Bindung': 'kk-beziehung',
  'Leistung & Kontrolle': 'kk-leistung',
  'Emotionsregulation & Schutz': 'kk-emotion',
  'Süchte & Regulationsverhalten': 'kk-sucht',
  'Verantwortung & Selbstwirksamkeit': 'kk-verantwortung'
};

const narrativById = new Map(NARRATIV_DATA.reframings.map(r => [r.id, r]));

const COMBINED = MUSTER_DATA.muster
  .map(m => ({ ...m, narrativ: narrativById.get(m.id) }))
  .filter(m => m.narrativ);

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.muster, item.anteil_alt, item.anteil_neu, item.narrativ.einstieg, item.narrativ.kernfunktion]
    .join(' ').toLowerCase().includes(q);
}

function ReframingCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          {item.muster}
          <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span className="anteil-alt">{item.anteil_alt}</span>
        <span>→</span>
        <span className="anteil-neu">{item.anteil_neu}</span>
      </div>
      <p className="narrativ-teaser">{item.narrativ.einstieg}</p>
    </div>
  );
}

function ReframingModal({ item, onClose }){
  useEffect(() => {
    const onKey = e => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if(!item) return null;
  const n = item.narrativ;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        role="dialog"
        aria-modal="true"
        aria-label={item.muster}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {n.titel}
              <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
            </div>
            <div className="anteil-line">
              <span className="anteil-alt">{item.anteil_alt}</span>
              <span>→</span>
              <span className="anteil-neu">{item.anteil_neu}</span>
            </div>
            <p className="narrativ-untertitel">{NARRATIV_DATA.meta.untertitel_standard}</p>
          </div>

          <div className="card-modal-body">
            <div className="details">
              <p className="narrativ-einstieg">{n.einstieg}</p>

              <div className="block kernfunktion-block">
                <h4>Kernfunktion</h4>
                <p>{n.kernfunktion}</p>
              </div>

              <div className="block">
                <h4>Was sich dahinter verbirgt</h4>
                <ol className="funktionen-list">
                  {n.funktionen.map((f, i) => <li key={i}>{f}</li>)}
                </ol>
              </div>

              <div className="block wofuer-block">
                <h4>Die Frage, die weiterführt</h4>
                <p>{n.wofuer_frage}</p>
              </div>

              <div className="block einladung-block">
                <p className="einladung-frage">{NARRATIV_DATA.meta.einladung_frage}</p>
                <ol className="einladung-schritte">
                  {NARRATIV_DATA.meta.einladung_schritte.map((s, i) => (
                    <li key={i}><strong>{i + 1} · </strong>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reframing({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [kategorie, setKategorie] = useState(null);
  const [openId, setOpenId] = useState(initialOpenId || null);

  const gefiltert = useMemo(
    () => COMBINED.filter(m => matches(m, query) && (!kategorie || m.kategorie === kategorie)),
    [query, kategorie]
  );

  const offenesItem = openId ? COMBINED.find(m => m.id === openId) : null;

  const gruppen = useMemo(() => {
    const map = new Map();
    MUSTER_DATA.meta.kategorien.forEach(k => map.set(k, []));
    gefiltert.forEach(item => {
      if(!map.has(item.kategorie)) map.set(item.kategorie, []);
      map.get(item.kategorie).push(item);
    });
    return [...map.entries()].filter(([, items]) => items.length > 0);
  }, [gefiltert]);

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }

  return (
    <>
      <div className="picker-wrap">
        <p className="picker-label">Reframing · nach Kategorie filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!kategorie ? ' active' : '')} onClick={() => { setKategorie(null); setOpenId(null); }}>Alle zeigen</button>
          {MUSTER_DATA.meta.kategorien.map(kat => (
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
            placeholder="Muster oder Anteil suchen …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{gefiltert.length} / {COMBINED.length}</span>
        </div>
      </div>

      <main>
        {gefiltert.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen.</div>
        ) : (
          gruppen.map(([kat, items]) => (
            <div key={kat} className="kategorie-gruppe">
              <h3 className={'kategorie-titel ' + KATEGORIE_CLASS[kat]}>{kat} <span className="kategorie-count">{items.length}</span></h3>
              <div className="grid">
                {items.map(item => (
                  <ReframingCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {offenesItem && <ReframingModal item={offenesItem} onClose={close} />}
    </>
  );
}
