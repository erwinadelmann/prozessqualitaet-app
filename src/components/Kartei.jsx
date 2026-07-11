import { useState, useMemo, useEffect } from 'react';
import DATA from '../data/muster.json';
import NARRATIV_DATA from '../data/reframing-narrativ.json';

const narrativIds = new Set(NARRATIV_DATA.reframings.map(r => r.id));

const KATEGORIE_CLASS = {
  'Beziehung & Bindung': 'kk-beziehung',
  'Leistung & Kontrolle': 'kk-leistung',
  'Emotionsregulation & Schutz': 'kk-emotion',
  'Süchte & Regulationsverhalten': 'kk-sucht',
  'Verantwortung & Selbstwirksamkeit': 'kk-verantwortung'
};

const KATEGORIE_ICON = {
  'Beziehung & Bindung': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>,
  'Leistung & Kontrolle': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>,
  'Emotionsregulation & Schutz': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>,
  'Süchte & Regulationsverhalten': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l2-7 4 14 2-7h6"/></svg>,
  'Verantwortung & Selbstwirksamkeit': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
};

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [item.muster, item.anteil_alt, item.anteil_neu, item.ursprungsintention, item.schutzfunktion]
    .join(' ').toLowerCase().includes(q);
}

function MusterCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card muster-card ' + KATEGORIE_CLASS[item.kategorie] + (isOpen ? ' open' : '') + (item.referenzbeispiel ? ' referenz' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <span className="muster-glow" aria-hidden="true"></span>
      <div className="card-top">
        <div className="muster-name">
          {item.muster}
          {item.referenzbeispiel && <span className="referenz-badge">Referenz-Beispiel</span>}
          <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      {item.muster_untertitel && <p className="muster-untertitel">{item.muster_untertitel}</p>}
      <div className="anteil-line">
        <span className="anteil-alt">{item.anteil_alt}</span>
        <span className="anteil-arrow">→</span>
        <span className="anteil-neu">{item.anteil_neu}</span>
      </div>
    </div>
  );
}

function MusterModal({ item, onClose, onOpenReframing }){
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
        aria-label={item.muster}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.muster}
              {item.referenzbeispiel && <span className="referenz-badge">Referenz-Beispiel</span>}
              <span className={'kat-badge ' + KATEGORIE_CLASS[item.kategorie]}>{item.kategorie}</span>
            </div>
            {item.muster_untertitel && <p className="muster-untertitel">{item.muster_untertitel}</p>}
            <div className="anteil-line">
              <span className="anteil-alt">{item.anteil_alt}</span>
              <span>→</span>
              <span className="anteil-neu">{item.anteil_neu}</span>
            </div>
            <p className="anteil-hinweis">Vorschlag, kein feststehender Begriff. Prüfen Sie, ob ein anderes Bild für Sie stimmiger ist.</p>
            {onOpenReframing && narrativIds.has(item.id) && (
              <button
                className="reframing-link"
                onClick={() => onOpenReframing(item.id)}
              >
                Zum Reframing „{item.anteil_alt}" lesen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            )}
          </div>

          <div className="card-modal-body">
            <div className="details">
              <div className="block">
                <h4>Ursprungsintention</h4>
                <p>{item.ursprungsintention}</p>
              </div>
              <div className="block">
                <h4>Schutzfunktion</h4>
                <p>{item.schutzfunktion}</p>
              </div>
              {item.erklaerung && (
                <div className="block erklaerung-block">
                  <h4>Zum besseren Verständnis</h4>
                  <p>{item.erklaerung}</p>
                </div>
              )}
              {item.wuerdigung && (
                <div className="block wuerdigung-block">
                  <h4>Würdigung</h4>
                  <p>{item.wuerdigung}</p>
                </div>
              )}
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
              {item.embodiment_frage && (
                <div className="block embodiment-block">
                  <h4>Embodiment, somatische Marker</h4>
                  <p>{item.embodiment_frage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Kartei({ onOpenReframing, initialOpenId }){
  const [query, setQuery] = useState('');
  const [kategorie, setKategorie] = useState(null);
  const [openId, setOpenId] = useState(initialOpenId || null);

  const gefiltert = useMemo(
    () => DATA.muster.filter(m => matches(m, query) && (!kategorie || m.kategorie === kategorie)),
    [query, kategorie]
  );

  const referenz = gefiltert.find(m => m.referenzbeispiel);
  const rest = gefiltert.filter(m => !m.referenzbeispiel);
  const offenesItem = openId ? DATA.muster.find(m => m.id === openId) : null;

  const gruppen = useMemo(() => {
    const map = new Map();
    DATA.meta.kategorien.forEach(k => map.set(k, []));
    rest.forEach(item => {
      if(!map.has(item.kategorie)) map.set(item.kategorie, []);
      map.get(item.kategorie).push(item);
    });
    return [...map.entries()].filter(([, items]) => items.length > 0);
  }, [rest]);

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }

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
                <MusterCard item={referenz} isOpen={openId === referenz.id} onOpen={open} />
              </div>
            )}
            {gruppen.map(([kat, items]) => (
              <div key={kat} className="kategorie-gruppe">
                <h3 className={'muster-kategorie-titel ' + KATEGORIE_CLASS[kat]}>{KATEGORIE_ICON[kat]}{kat} <span className="kategorie-count">{items.length}</span></h3>
                <div className="grid">
                  {items.map(item => (
                    <MusterCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      {offenesItem && <MusterModal item={offenesItem} onClose={close} onOpenReframing={onOpenReframing} />}
    </>
  );
}
