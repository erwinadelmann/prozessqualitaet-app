import { useState, useMemo, useEffect } from 'react';
import {
  FOCUSING_QUESTION, METHODIK_QUELLE, MOTTO_FRAGEN, THEMEN_VORSCHLAEGE, KARTEI_KATEGORIE_MAPPING,
  DEFAULT_KATEGORIEN, FOKUS_SEED, STEUERPOSITION
} from '../data/fokuskompass.js';
import MUSTER_DATA from '../data/muster.json';

const STORAGE_KEY = 'fokuskompass-manuell-v1';

function ladeZustand(){
  const leer = { thema: '', ausgewaehlt: [], gewaehlterAnteilId: null, versoehnungAntwort: '' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const geladen = JSON.parse(raw);
      return { ...leer, ...geladen };
    }
  } catch(e){}
  return leer;
}

export default function FokusKompass(){
  const [thema, setThema] = useState(() => ladeZustand().thema);
  const [ausgewaehlt, setAusgewaehlt] = useState(() => ladeZustand().ausgewaehlt);
  const [gewaehlterAnteilId, setGewaehlterAnteilId] = useState(() => ladeZustand().gewaehlterAnteilId);
  const [versoehnungAntwort, setVersoehnungAntwort] = useState(() => ladeZustand().versoehnungAntwort);
  const [neuText, setNeuText] = useState('');
  const [neuKat, setNeuKat] = useState(DEFAULT_KATEGORIEN[0]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ thema, ausgewaehlt, gewaehlterAnteilId, versoehnungAntwort }));
    } catch(e){}
  }, [thema, ausgewaehlt, gewaehlterAnteilId, versoehnungAntwort]);

  const kategorien = useMemo(() => {
    const set = new Set(DEFAULT_KATEGORIEN);
    FOKUS_SEED.forEach(i => set.add(i.kategorie));
    return Array.from(set).filter(k => FOKUS_SEED.some(i => i.kategorie === k));
  }, []);

  const ausgewaehlteIds = useMemo(() => new Set(ausgewaehlt.map(i => i.id)), [ausgewaehlt]);

  function istAusgewaehlt(item){
    return ausgewaehlteIds.has(item.id);
  }

  function toggleAuswahl(item){
    setAusgewaehlt(prev => {
      if(prev.some(i => i.id === item.id)) return prev.filter(i => i.id !== item.id);
      return [...prev, { id: item.id, text: item.text, erklaerung: item.erklaerung, kategorie: item.kategorie }];
    });
  }

  function verschieben(index, richtung){
    setAusgewaehlt(prev => {
      const neu = [...prev];
      const ziel = index + richtung;
      if(ziel < 0 || ziel >= neu.length) return prev;
      [neu[index], neu[ziel]] = [neu[ziel], neu[index]];
      return neu;
    });
  }

  function entfernenAusAuswahl(id){
    setAusgewaehlt(prev => prev.filter(i => i.id !== id));
  }

  function eigeneOptionHinzufuegen(){
    const text = neuText.trim();
    if(!text) return;
    setAusgewaehlt(prev => [...prev, { id: 'custom-' + Date.now(), text, erklaerung: '', kategorie: neuKat }]);
    setNeuText('');
  }

  function vorschlagThema(){
    if(ausgewaehlt.length > 0){
      setThema(`Umgang mit „${ausgewaehlt[0].text}“`);
    } else {
      const zufall = THEMEN_VORSCHLAEGE[Math.floor(Math.random() * THEMEN_VORSCHLAEGE.length)];
      setThema(zufall);
    }
  }

  const zielKarteiKategorie = ausgewaehlt.length > 0 ? KARTEI_KATEGORIE_MAPPING[ausgewaehlt[0].kategorie] : null;

  const anteilKandidaten = useMemo(() => {
    if(!zielKarteiKategorie) return [];
    return MUSTER_DATA.muster.filter(m => m.kategorie === zielKarteiKategorie);
  }, [zielKarteiKategorie]);

  useEffect(() => {
    if(anteilKandidaten.length === 0){
      if(gewaehlterAnteilId !== null) setGewaehlterAnteilId(null);
      return;
    }
    if(!anteilKandidaten.some(a => a.id === gewaehlterAnteilId)){
      setGewaehlterAnteilId(anteilKandidaten[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zielKarteiKategorie]);

  const gewaehlterAnteil = anteilKandidaten.find(a => a.id === gewaehlterAnteilId) || null;
  const andereVarianten = anteilKandidaten.filter(a => a.id !== gewaehlterAnteilId);

  const item1 = ausgewaehlt[0];
  const item2 = ausgewaehlt[1];

  function zuruecksetzen(){
    if(window.confirm('Wirklich alles zurücksetzen? Thema, Auswahl, Anteil-Wahl und Versöhnungs-Antwort gehen verloren.')){
      setThema('');
      setAusgewaehlt([]);
      setGewaehlterAnteilId(null);
      setVersoehnungAntwort('');
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

      <div className="fk-thema-box">
        <label htmlFor="fk-thema">Mein aktuelles Thema</label>
        <div className="fk-thema-row">
          <input
            id="fk-thema"
            type="text"
            value={thema}
            onChange={e => setThema(e.target.value)}
            placeholder="z. B. Wie gehe ich gerade mit … um?"
          />
          <button className="chip no-print" onClick={vorschlagThema}>Vorschlag</button>
        </div>
        <p className="fk-hinweis no-print">Der Vorschlag ist ein einfacher, lokaler Impuls, keine KI-generierte Analyse Ihrer Lage.</p>
      </div>

      <div className="fk-steuerposition-box">
        <p className="fokus-section-label">{STEUERPOSITION.untertitel}</p>
        <h3>{STEUERPOSITION.titel}</h3>
        <p className="fk-steuerposition-quelle">{STEUERPOSITION.quelle}</p>
        <p className="fk-steuerposition-einleitung">{STEUERPOSITION.einleitung}</p>
        <div className="fk-steuerposition-schritte">
          {STEUERPOSITION.schritte.map((schritt, i) => (
            <div className="fk-steuerposition-schritt" key={i}>
              <div className="fk-steuerposition-nr">{i + 1}</div>
              <div>
                <h4>{schritt.titel}</h4>
                <p>{schritt.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="fk-steuerposition-frage">„{STEUERPOSITION.abschlussfrage}“</p>
      </div>

      <main className="no-print">
        <p className="fokus-section-label">Elemente auswählen – anklicken, was gerade resoniert</p>
        {kategorien.map(kat => {
          const katItems = FOKUS_SEED.filter(i => i.kategorie === kat);
          if(katItems.length === 0) return null;
          return (
            <div className="kategorie-block" key={kat}>
              <span className="kategorie-titel">{kat}</span>
              <div className="fk-auswahl-grid">
                {katItems.map(item => (
                  <button
                    key={item.id}
                    className={'fk-auswahl-card' + (istAusgewaehlt(item) ? ' aktiv' : '')}
                    onClick={() => toggleAuswahl(item)}
                  >
                    <span className="fk-auswahl-check">{istAusgewaehlt(item) ? '✓' : ''}</span>
                    <span>
                      <span className="fk-auswahl-titel">{item.text}</span>
                      {item.erklaerung && <span className="fk-auswahl-erklaerung">{item.erklaerung}</span>}
                    </span>
                  </button>
                ))}
              </div>
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
                onKeyDown={e => { if(e.key === 'Enter') eigeneOptionHinzufuegen(); }} />
            </div>
            <div>
              <label>Kategorie</label>
              <select value={neuKat} onChange={e => setNeuKat(e.target.value)}>
                {kategorien.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div>
              <button className="btn-primary" onClick={eigeneOptionHinzufuegen}>Hinzufügen</button>
            </div>
          </div>
        </div>
      </main>

      <div className="fk-rangfolge">
        <p className="fokus-section-label">Ihre Reihenfolge</p>
        {ausgewaehlt.length === 0 ? (
          <p className="fk-hinweis">Noch nichts ausgewählt. Oben anklicken, was gerade zählt.</p>
        ) : (
          ausgewaehlt.map((item, idx) => (
            <div className={'fk-rang-item' + (idx === 0 ? ' top-1' : '')} key={item.id}>
              <div className="fk-rang-nr">{idx + 1}</div>
              <div className="fk-rang-text">
                {item.text}
                {item.erklaerung && <span className="fk-rang-erklaerung">{item.erklaerung}</span>}
                <span className="fk-rang-kat">{item.kategorie}</span>
              </div>
              <div className="fk-rang-buttons no-print">
                <button onClick={() => verschieben(idx, -1)} disabled={idx === 0} aria-label="Nach oben">↑</button>
                <button onClick={() => verschieben(idx, 1)} disabled={idx === ausgewaehlt.length - 1} aria-label="Nach unten">↓</button>
                <button onClick={() => entfernenAusAuswahl(item.id)} aria-label="Entfernen">×</button>
              </div>
            </div>
          ))
        )}
        {ausgewaehlt.length > 0 && (
          <p className="fk-top-frage">„Ist „{ausgewaehlt[0].text}" wirklich die EINE Sache – oder nur die lauteste gerade?"</p>
        )}
      </div>

      <div className="fk-anteil-box">
        <p className="fokus-section-label">Welcher Anteil soll gestärkt werden?</p>
        {!gewaehlterAnteil ? (
          <p className="fk-hinweis">Wählen Sie oben mindestens einen Punkt aus, dann schlägt der Kompass einen passenden Anteil aus Ihrer Kartei vor.</p>
        ) : (
          <>
            <div className="fk-anteil-card">
              <div className="fk-anteil-titel">{gewaehlterAnteil.anteil_alt} <span className="fk-anteil-pfeil">→</span> {gewaehlterAnteil.anteil_neu}</div>
              <p className="fk-anteil-feld"><strong>Ursprungsintention:</strong> {gewaehlterAnteil.ursprungsintention}</p>
              <p className="fk-anteil-feld"><strong>Würdigung:</strong> {gewaehlterAnteil.wuerdigung}</p>
              <p className="fk-anteil-feld"><strong>Embodiment-Frage:</strong> {gewaehlterAnteil.embodiment_frage}</p>
            </div>
            {andereVarianten.length > 0 && (
              <div className="no-print">
                <p className="fk-hinweis" style={{ marginTop: '0.9rem' }}>Andere Varianten in derselben Kartei-Kategorie ({zielKarteiKategorie}):</p>
                <div className="chip-grid">
                  {andereVarianten.map(a => (
                    <button key={a.id} className="chip" onClick={() => setGewaehlterAnteilId(a.id)}>
                      {a.anteil_alt} → {a.anteil_neu}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p className="fk-hinweis" style={{ marginTop: '0.7rem' }}>
              Vorschlag aus Ihrer Kartei, abgeleitet aus der Kategorie Ihres wichtigsten ausgewählten Punkts. Diese Zuordnung ist meine Einordnung, keine geprüfte Zuordnung.
            </p>
          </>
        )}
      </div>

      {item1 && item2 && (
        <div className="fk-versoehnung-box">
          <p className="fokus-section-label">Versöhnungs-Frage</p>
          <p className="fk-versoehnung-frage">
            Wie kann es gelingen, „{item1.text}" und „{item2.text}" miteinander zu versöhnen – so scheinbar unvereinbar sie gerade wirken?
          </p>
          <p className="fk-hinweis">
            Welche Pflanze fällt Ihnen ein, der es wunderbar gelingen kann, diese Anteile miteinander zu versöhnen? Welches Tier? Welche Phantasie-Figur?
          </p>
          <textarea
            className="fk-versoehnung-textarea"
            value={versoehnungAntwort}
            onChange={e => setVersoehnungAntwort(e.target.value)}
            placeholder="Ihre Antwort, Ihr Bild, Ihre Figur …"
            rows={4}
          />
        </div>
      )}

      <div className="fk-aktionen no-print">
        <button className="chip reset" onClick={zuruecksetzen}>Alles zurücksetzen</button>
        <button className="btn-primary" onClick={() => window.print()}>Als PDF drucken</button>
      </div>
      <p className="fk-hinweis no-print" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Wird automatisch auf diesem Gerät gespeichert. {METHODIK_QUELLE.split('·')[0]}
      </p>
    </>
  );
}
