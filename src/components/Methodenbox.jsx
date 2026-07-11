import { useState, useMemo, useEffect } from 'react';
import DATA from '../data/methodenbox.json';
import UP_DATA from '../data/utilisationsprozess.json';

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
  return [item.titel, item.kernaussage, item.erklaerung, item.zitat, item.einsatzkontext, item.ziel]
    .filter(Boolean).join(' ').toLowerCase().includes(q);
}

function MethodCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card method-card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          {item.titel}
          <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.kernaussage}</span>
      </div>
    </div>
  );
}

function KernprozessCard({ modus, onOpen }){
  return (
    <div
      className="card kernprozess-card"
      tabIndex={0}
      role="button"
      onClick={() => onOpen(modus.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(modus.id); } }}
    >
      <div className="card-top">
        <div className="muster-name">
          <span className="kernprozess-badge">Modus {modus.nr}</span>
          {modus.titel}
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line kernprozess-kurz">
        <span>{modus.kurz}</span>
      </div>
    </div>
  );
}

function KernprozessModal({ modus, onClose }){
  useEffect(() => {
    const onKey = e => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if(!modus) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        role="dialog"
        aria-modal="true"
        aria-label={modus.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              <span className="kernprozess-badge">Modus {modus.nr}</span>
              {modus.titel}
            </div>
            <div className="anteil-line">
              <span>{modus.kurz}</span>
            </div>
          </div>

          <div className="card-modal-body">
            <div className="details up-modus-body" style={{ padding: 0 }}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

function MethodModal({ item, onClose }){
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

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        role="dialog"
        aria-modal="true"
        aria-label={item.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.titel}
              <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
            </div>
            <div className="anteil-line">
              <span>{item.kernaussage}</span>
            </div>
          </div>

          <div className="card-modal-body">
            <div className="details">
              {item.erklaerung && (
                <div className="block">
                  <h4>Erklärung</h4>
                  <p>{item.erklaerung}</p>
                </div>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Methodenbox(){
  const [query, setQuery] = useState('');
  const [kategorie, setKategorie] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [openModusId, setOpenModusId] = useState(null);

  const list = useMemo(() => DATA.elemente.filter(item =>
    matches(item, query) && (!kategorie || item.kategorie === kategorie)
  ), [query, kategorie]);

  const offenesItem = openId ? DATA.elemente.find(i => i.id === openId) : null;
  const offenerModus = openModusId ? UP_DATA.modi.find(m => m.id === openModusId) : null;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }

  return (
    <>
      <div className="kernprozess-wrap">
        <p className="picker-label">{UP_DATA.meta.titel} · {UP_DATA.meta.untertitel}</p>
        <div className="kernprozess-grid">
          {UP_DATA.modi.map(modus => (
            <KernprozessCard key={modus.id} modus={modus} onOpen={setOpenModusId} />
          ))}
        </div>
      </div>

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
            {list.map(item => (
              <MethodCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
            ))}
          </div>
        )}
      </main>

      {offenesItem && <MethodModal item={offenesItem} onClose={close} />}
      {offenerModus && <KernprozessModal modus={offenerModus} onClose={() => setOpenModusId(null)} />}
    </>
  );
}
