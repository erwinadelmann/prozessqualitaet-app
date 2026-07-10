import { useState, useMemo, useEffect } from 'react';
import {
  FOCUSING_QUESTION, METHODIK_TEXT, METHODIK_QUELLE, MOTTO_FRAGEN,
  DEFAULT_KATEGORIEN, FOKUS_SEED, scoreOf
} from '../data/fokuskompass.js';

const STORAGE_KEY = 'fokuskompass-state-v1';
const TOP_N = 3;

function loadState(){
  let stored = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) stored = JSON.parse(raw);
  } catch(e){}
  if(!stored) return JSON.parse(JSON.stringify(FOKUS_SEED));
  // Text/Kategorie/Erklärung aus dem aktuellen SEED übernehmen (Struktur), Regler-Werte des Nutzers
  // beibehalten – so wirken Neukategorisierung und neue Erklärungen auch bei bereits gespeicherten
  // Daten, ohne eigene Bewertungen zu verlieren.
  const seedById = new Map(FOKUS_SEED.map(s => [s.id, s]));
  const aktualisiert = stored.map(item => {
    const seed = seedById.get(item.id);
    return seed ? { ...item, text: seed.text, kategorie: seed.kategorie, erklaerung: seed.erklaerung } : item;
  });
  const bekannteIds = new Set(stored.map(i => i.id));
  const neue = FOKUS_SEED.filter(s => !bekannteIds.has(s.id));
  return neue.length ? [...aktualisiert, ...JSON.parse(JSON.stringify(neue))] : aktualisiert;
}

export default function FokusKompass(){
  const [items, setItems] = useState(loadState);
  const [neuText, setNeuText] = useState('');
  const [neuKat, setNeuKat] = useState(DEFAULT_KATEGORIEN[0]);
  const [zeigeAlleRang, setZeigeAlleRang] = useState(false);
  const [bearbeitenOffen, setBearbeitenOffen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch(e){}
  }, [items]);

  const kategorien = useMemo(() => {
    const set = new Set(DEFAULT_KATEGORIEN);
    items.forEach(i => set.add(i.kategorie));
    return Array.from(set);
  }, [items]);

  const sorted = useMemo(() => [...items].sort((a, b) => scoreOf(b) - scoreOf(a)), [items]);

  function updateFeld(id, feld, wert){
    setItems(prev => prev.map(i => i.id === id ? { ...i, [feld]: wert } : i));
  }

  function entfernen(id){
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function hinzufuegen(){
    const text = neuText.trim();
    if(!text) return;
    setItems(prev => [...prev, {
      id: 'custom-' + Date.now(), text, kategorie: neuKat,
      hebelwirkung: 3, aufwand: 3, opportunitaet: 3
    }]);
    setNeuText('');
  }

  function zuruecksetzen(){
    if(window.confirm('Wirklich auf die Ausgangsliste zurücksetzen? Eigene Ergänzungen und Bewertungen gehen verloren.')){
      setItems(JSON.parse(JSON.stringify(FOKUS_SEED)));
    }
  }

  return (
    <>
      <div className="fokus-hero">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <p className="eyebrow">Fokus-Kompass</p>
        <h2>Nicht auf hundert Hochzeiten gleichzeitig tanzen</h2>
        <p className="ig-zielsatz">„{FOCUSING_QUESTION}"</p>
        <div className="fk-motto">
          {MOTTO_FRAGEN.map((frage, i) => (
            <p key={i}>„{frage}"</p>
          ))}
        </div>
      </div>

      <div className="methodenbox-hinweis" style={{ maxWidth: 'var(--content-max)', margin: '1.4rem auto 0' }}>
        <strong>Wie die Bewertung funktioniert:</strong> Hebelwirkung (macht diese Sache andere leichter oder überflüssig, nach Gary Kellers Focusing Question), Aufwand bis spürbare Wirkung, Kosten des Aufschiebens (Opportunitätskosten explizit gemacht). {METHODIK_TEXT}
        <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--muted)' }}>{METHODIK_QUELLE}</div>
      </div>

      <main>
        <div className="fk-rangfolge">
          <p className="fokus-section-label">
            {zeigeAlleRang ? `Alle ${sorted.length} Optionen, sortiert` : `Ihre Top ${Math.min(TOP_N, sorted.length)}`}
          </p>
          {(zeigeAlleRang ? sorted : sorted.slice(0, TOP_N)).map((item, idx) => (
            <div className={'fk-rang-item' + (idx === 0 ? ' top-1' : '')} key={item.id}>
              <div className="fk-rang-nr">{idx + 1}</div>
              <div className="fk-rang-text">
                {item.text}
                {item.erklaerung && <span className="fk-rang-erklaerung">{item.erklaerung}</span>}
                <span className="fk-rang-kat">{item.kategorie}</span>
              </div>
              <div className="fk-rang-score">{scoreOf(item).toFixed(1)}</div>
            </div>
          ))}
          {sorted.length > 0 && (
            <p className="fk-top-frage">„Ist „{sorted[0].text}" wirklich die EINE Sache – oder nur die lauteste gerade?"</p>
          )}
          {sorted.length > TOP_N && (
            <button className="chip" style={{ marginTop: '0.8rem' }} onClick={() => setZeigeAlleRang(v => !v)}>
              {zeigeAlleRang ? `Nur Top ${TOP_N} anzeigen` : `Alle ${sorted.length} Optionen anzeigen`}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '1.4rem 0' }}>
          <button className="btn-primary" onClick={() => setBearbeitenOffen(v => !v)}>
            {bearbeitenOffen ? 'Bearbeiten schließen' : `Bewertungen anpassen & Optionen verwalten (${items.length})`}
          </button>
        </div>

        {bearbeitenOffen && (
          <>
            <p style={{ maxWidth: 'var(--content-max)', margin: '0 auto 1rem', fontSize: '0.8rem', color: 'var(--muted)', fontFamily: "'Open Sans', sans-serif" }}>
              Absichtlich eingeklappt: Der Kompass soll auf die EINE Sache zeigen, nicht alle {items.length} Möglichkeiten gleichzeitig vor Augen halten. Hier stellen Sie die Regler ein oder ergänzen Neues – die Rangfolge oben bleibt bewusst knapp.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0' }}>
              <button className="chip reset" onClick={zuruecksetzen}>Auf Ausgangspunkt zurücksetzen</button>
            </div>

            {kategorien.map(kat => {
              const katItems = items.filter(i => i.kategorie === kat);
              if(katItems.length === 0) return null;
              return (
                <div className="kategorie-block" key={kat}>
                  <span className="kategorie-titel">{kat}</span>
                  {katItems.map(item => (
                    <div className="fk-option-card" key={item.id}>
                      <div className="fk-option-top">
                        <div>
                          <div className="fk-option-titel">{item.text}</div>
                          {item.erklaerung && <div className="fk-option-erklaerung">{item.erklaerung}</div>}
                        </div>
                        <button className="fk-option-remove" onClick={() => entfernen(item.id)}>entfernen</button>
                      </div>
                      <div className="fk-sliders">
                        <div className="fk-slider-block">
                          <label>Hebelwirkung <span className="fk-val">{item.hebelwirkung}</span></label>
                          <input type="range" min="1" max="5" step="1" value={item.hebelwirkung}
                            onChange={e => updateFeld(item.id, 'hebelwirkung', Number(e.target.value))} />
                        </div>
                        <div className="fk-slider-block">
                          <label>Aufwand <span className="fk-val">{item.aufwand}</span></label>
                          <input type="range" min="1" max="5" step="1" value={item.aufwand}
                            onChange={e => updateFeld(item.id, 'aufwand', Number(e.target.value))} />
                        </div>
                        <div className="fk-slider-block">
                          <label>Kosten des Aufschiebens <span className="fk-val">{item.opportunitaet}</span></label>
                          <input type="range" min="1" max="5" step="1" value={item.opportunitaet}
                            onChange={e => updateFeld(item.id, 'opportunitaet', Number(e.target.value))} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="fk-neue-option">
              <h3>Eigene Option ergänzen – jederzeit erweiterbar</h3>
              <div className="fk-neue-option-grid">
                <div>
                  <label>Was steht noch zur Auswahl?</label>
                  <input type="text" value={neuText} onChange={e => setNeuText(e.target.value)}
                    placeholder="z. B. Website überarbeiten"
                    onKeyDown={e => { if(e.key === 'Enter') hinzufuegen(); }} />
                </div>
                <div>
                  <label>Kategorie</label>
                  <select value={neuKat} onChange={e => setNeuKat(e.target.value)}>
                    {kategorien.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <button className="btn-primary" onClick={hinzufuegen}>Hinzufügen</button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}
