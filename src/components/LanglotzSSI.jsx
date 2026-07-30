import { useState, useRef, useEffect } from 'react';
import DATA from '../data/langlotz-ssi.json';
import ScrollTopButton from './ScrollTopButton.jsx';
import buchcover from '../assets/langlotz-buchcover.webp';

const KAPITEL_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4.5c3-1.2 6-1.2 8 0v15c-2-1.2-5-1.2-8 0z"/>
    <path d="M20 4.5c-3-1.2-6-1.2-8 0v15c2-1.2 5-1.2 8 0z"/>
  </svg>
);

// Einfache Lightbox: Klick auf ein Bild (Cover oder eingebettetes Foto) vergrößert es
// bildschirmfüllend, Klick daneben oder Escape schließt wieder. Eigenständig von den
// Karten-Modalen, damit sie sich nicht gegenseitig blockieren.
function Lightbox({ src, alt, onClose }){
  useEffect(() => {
    const onKey = e => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <button className="card-modal-close lightbox-close" onClick={onClose} aria-label="Schließen">×</button>
      <img src={src} alt={alt || ''} className="lightbox-img" onClick={e => e.stopPropagation()} />
    </div>
  );
}

function matches(item, query){
  if(!query) return true;
  const q = query.toLowerCase();
  return [
    item.titel, item.kapitel, item.kernaussage, item.teil,
    ...(item.textbloecke || []).map(b => (b.titel || '') + ' ' + b.text)
  ].filter(Boolean).join(' ').toLowerCase().includes(q);
}

// Gruppiert die (bereits gefilterte) Liste nach Buchteil (A/B/I/II/III), in der Reihenfolge,
// in der die Teile zuerst auftreten – nicht alphabetisch, damit die Buch-Chronologie erhalten bleibt.
function gruppiereNachTeil(list){
  const gruppen = [];
  const index = new Map();
  list.forEach(item => {
    const teil = item.teil || 'Weitere Auszüge';
    if(!index.has(teil)){
      index.set(teil, gruppen.length);
      gruppen.push([teil, []]);
    }
    gruppen[index.get(teil)][1].push(item);
  });
  return gruppen;
}

function LanglotzCard({ item, isOpen, onOpen }){
  return (
    <div
      className={'card langlotz-element-card' + (isOpen ? ' open' : '')}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
      onClick={() => onOpen(item.id)}
      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); onOpen(item.id); } }}
    >
      <div className="card-top">
        <div className="nlp-technik-titelzeile">
          <span className="nlp-technik-icon langlotz-kapitel-icon" aria-hidden="true">{KAPITEL_ICON}</span>
          <div className="muster-name">
            {item.titel}
            <span className="kat-badge langlotz-kapitel-badge">{item.kapitel}</span>
          </div>
        </div>
        <div className="toggle-icon">+</div>
      </div>
      <div className="anteil-line">
        <span>{item.kernaussage}</span>
      </div>
    </div>
  );
}

function LanglotzModal({ item, onClose, onPrev, onNext, positionLabel }){
  const modalRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onKey = e => {
      if(e.key === 'Escape'){ if(lightbox){ setLightbox(null); } else { onClose(); } return; }
      if(lightbox) return;
      if(e.key === 'ArrowLeft' && onPrev) onPrev();
      if(e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext, lightbox]);

  if(!item) return null;

  return (
    <div className="card-modal-backdrop" onClick={onClose}>
      <div
        className="card-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.titel}
        onClick={e => e.stopPropagation()}
      >
        <div className="card-modal-topbar">
          <div className="card-modal-nav">
            <button className="card-modal-nav-btn" onClick={onPrev} aria-label="Voriges Element">‹</button>
            {positionLabel && <span className="card-modal-position">{positionLabel}</span>}
            <button className="card-modal-nav-btn" onClick={onNext} aria-label="Nächstes Element">›</button>
          </div>
          <button className="card-modal-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>
        <ScrollTopButton containerRef={modalRef} />

        <div className="card-modal-inner">
          <div className="card-modal-header">
            <div className="muster-name">
              {item.titel}
              <span className="kat-badge langlotz-kapitel-badge">{item.kapitel}</span>
            </div>
            <div className="anteil-line">
              <span>{item.kernaussage}</span>
            </div>
          </div>

          <div className="card-modal-body">
            <div className="details">
              {(item.textbloecke || []).map((block, i) => (
                block.typ === 'kasten' ? (
                  <div className="langlotz-kasten" key={i}>
                    {block.titel && <p className="langlotz-kasten-titel">{block.titel}</p>}
                    <p>{block.text}</p>
                  </div>
                ) : block.typ === 'liste' ? (
                  <div className="block" key={i}>
                    {block.intro && <p>{block.intro}</p>}
                    <ol className="langlotz-liste">
                      {(block.punkte || []).map((p, j) => <li key={j}>{p}</li>)}
                    </ol>
                  </div>
                ) : block.typ === 'vers' ? (
                  <div className="block langlotz-vers" key={i}>
                    <p>{block.text}</p>
                  </div>
                ) : block.typ === 'bild' ? (
                  <figure className="langlotz-bild-block" key={i}>
                    <img
                      src={block.src}
                      alt={block.alt || ''}
                      tabIndex={0}
                      role="button"
                      aria-label="Bild vergrößern"
                      onClick={() => setLightbox({ src: block.src, alt: block.alt })}
                      onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setLightbox({ src: block.src, alt: block.alt }); } }}
                    />
                    {block.caption && <figcaption>{block.caption}</figcaption>}
                  </figure>
                ) : (
                  <div className="block" key={i}>
                    <p>{block.text}</p>
                  </div>
                )
              ))}
              <div className="block steps">
                <h4>Quelle</h4>
                <p className="method-quelle">{item.quelle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

export default function LanglotzSSI({ initialOpenId }){
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(() =>
    initialOpenId && DATA.elemente.some(e => e.id === initialOpenId) ? initialOpenId : null
  );
  const [coverLightbox, setCoverLightbox] = useState(false);

  const list = DATA.elemente.filter(item => matches(item, query));
  const offenesItem = openId ? DATA.elemente.find(i => i.id === openId) : null;
  const itemIndex = offenesItem ? list.findIndex(i => i.id === offenesItem.id) : -1;

  function open(id){ setOpenId(id); }
  function close(){ setOpenId(null); }
  function itemBlaettern(richtung){
    if(list.length === 0 || itemIndex === -1) return;
    const naechster = (itemIndex + richtung + list.length) % list.length;
    setOpenId(list[naechster].id);
  }

  return (
    <>
      <div className="nlp-hero-wrap langlotz-hero-wrap">
        <span
          className="langlotz-cover-wrap"
          tabIndex={0}
          role="button"
          aria-label="Buchcover vergrößern"
          onClick={() => setCoverLightbox(true)}
          onKeyDown={e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); setCoverLightbox(true); } }}
        >
          <img src={buchcover} alt={'Buchcover: ' + DATA.meta.buchquelle} className="langlotz-cover-img" />
        </span>
        <div className="nlp-hero-text">
          <p className="nlp-hero-kicker">Rubrik · {DATA.meta.institut}</p>
          <h2 className="nlp-hero-titel">{DATA.meta.titel}</h2>
          <p className="nlp-hero-sub">{DATA.meta.untertitel} · aus {DATA.meta.buchquelle}</p>
        </div>
      </div>

      {DATA.kernsaetze && DATA.kernsaetze.length > 0 && (
        <div className="langlotz-kernsaetze-wrap">
          <p className="picker-label">Kernsätze</p>
          <div className="langlotz-kernsaetze-grid">
            {DATA.kernsaetze.map(k => (
              <div className="langlotz-kernsatz-card" key={k.id}>
                <p className="langlotz-kernsatz-text">„{k.text}“</p>
                <p className="langlotz-kernsatz-quelle">{k.quelle}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="search-wrap">
        <div className="search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Buchauszug suchen …"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="count">{list.length} / {DATA.elemente.length}</span>
        </div>
      </div>

      <div className="methodenbox-hinweis">{DATA.meta.hinweis}</div>

      <main>
        {list.length === 0 ? (
          <div className="empty">
            {DATA.elemente.length === 0
              ? 'Noch keine Einträge. Werden ergänzt, sobald Quellmaterial eintrifft.'
              : 'Keine Treffer. Anderen Begriff versuchen.'}
          </div>
        ) : (
          gruppiereNachTeil(list).map(([teil, items]) => (
            <div key={teil} className="kategorie-gruppe">
              <h3 className="muster-kategorie-titel langlotz-teil-titel">{teil}</h3>
              <div className="grid">
                {items.map(item => (
                  <LanglotzCard key={item.id} item={item} isOpen={openId === item.id} onOpen={open} />
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {offenesItem && (
        <LanglotzModal
          key={offenesItem.id}
          item={offenesItem}
          onClose={close}
          onPrev={() => itemBlaettern(-1)}
          onNext={() => itemBlaettern(1)}
          positionLabel={itemIndex !== -1 ? `${itemIndex + 1} / ${list.length}` : null}
        />
      )}

      {coverLightbox && (
        <Lightbox src={buchcover} alt={'Buchcover: ' + DATA.meta.buchquelle} onClose={() => setCoverLightbox(false)} />
      )}
    </>
  );
}
