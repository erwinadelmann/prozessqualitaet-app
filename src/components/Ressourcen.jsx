import { useState, useMemo, useEffect } from 'react';
import { RESSOURCEN_REMINDER, BILDER_KATEGORIEN, VIDEOS, VIDEO_THEMEN } from '../data/ressourcen.js';

function Lightbox({ bild, onClose }){
  useEffect(() => {
    const onKey = e => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if(!bild) return null;

  return (
    <div className="card-modal-backdrop lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        <img src={bild.src} alt={bild.alt} />
        <p className="lightbox-caption">{bild.alt}</p>
      </div>
    </div>
  );
}

export default function Ressourcen(){
  const [kategorie, setKategorie] = useState(null);
  const [query, setQuery] = useState('');
  const [openBild, setOpenBild] = useState(null);
  const [videoThema, setVideoThema] = useState(null);

  const kategorien = BILDER_KATEGORIEN.map(k => k.kategorie);

  const bilder = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BILDER_KATEGORIEN
      .filter(k => !kategorie || k.kategorie === kategorie)
      .flatMap(k => k.bilder.map(b => ({ ...b, kategorie: k.kategorie })))
      .filter(b => !q || b.alt.toLowerCase().includes(q) || b.kategorie.toLowerCase().includes(q));
  }, [kategorie, query]);

  const gesamtAnzahl = useMemo(() => BILDER_KATEGORIEN.reduce((a, k) => a + k.bilder.length, 0), []);

  const videoListe = useMemo(() =>
    VIDEOS.filter(v => !videoThema || v.thema === videoThema),
  [videoThema]);

  return (
    <>
      <div className="ig-reminder">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <p>{RESSOURCEN_REMINDER}</p>
      </div>

      <div className="picker-wrap">
        <p className="picker-label">Bilder · nach Kategorie filtern</p>
        <div className="chip-grid">
          <button className={'chip reset' + (!kategorie ? ' active' : '')} onClick={() => setKategorie(null)}>Alle zeigen</button>
          {kategorien.map(kat => (
            <button
              key={kat}
              className={'chip' + (kategorie === kat ? ' active' : '')}
              onClick={() => setKategorie(kategorie === kat ? null : kat)}
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
            placeholder="Bild suchen, z. B. Grenze, Zitat, Reiche Ernte …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{bilder.length} / {gesamtAnzahl}</span>
        </div>
      </div>

      <main>
        {bilder.length === 0 ? (
          <div className="empty">Keine Treffer. Anderen Begriff versuchen oder Kategorie-Filter zurücksetzen.</div>
        ) : (
          <div className="bild-grid">
            {bilder.map((b, i) => (
              <button className="bild-thumb" key={b.src + i} onClick={() => setOpenBild(b)} title={b.alt}>
                <img src={b.src} alt={b.alt} loading="lazy" />
                <span className="bild-thumb-label">{b.alt}</span>
              </button>
            ))}
          </div>
        )}
      </main>

      <p className="fokus-section-label" style={{ marginTop: '2.2rem' }}>Videos · Impulse und Vertiefung</p>
      <div className="picker-wrap" style={{ paddingTop: 0 }}>
        <div className="chip-grid">
          <button className={'chip reset' + (!videoThema ? ' active' : '')} onClick={() => setVideoThema(null)}>Alle zeigen</button>
          {VIDEO_THEMEN.map(t => (
            <button
              key={t}
              className={'chip' + (videoThema === t ? ' active' : '')}
              onClick={() => setVideoThema(videoThema === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <main>
        <div className="video-grid">
          {videoListe.map(v => (
            <div className="video-card" key={v.id}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.titel}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="video-titel">{v.titel}</p>
              <span className="video-thema">{v.thema}</span>
            </div>
          ))}
        </div>
      </main>

      {openBild && <Lightbox bild={openBild} onClose={() => setOpenBild(null)} />}
    </>
  );
}
