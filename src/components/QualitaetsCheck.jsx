import { useState, useEffect, useMemo } from 'react';
import { KRITERIEN } from '../data/kriterien.js';

const STORAGE_KEY = 'utilisation_pruefungen_v1';

function heute(){
  return new Date().toISOString().slice(0, 10);
}

function ladeEintraege(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch{
    return [];
  }
}

export default function QualitaetsCheck(){
  const [datum, setDatum] = useState(heute());
  const [kuerzel, setKuerzel] = useState('');
  const [notiz, setNotiz] = useState('');
  const [antworten, setAntworten] = useState(() =>
    Object.fromEntries(KRITERIEN.map(c => [c.nr, 'ja']))
  );
  const [eintraege, setEintraege] = useState(() => ladeEintraege());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eintraege));
  }, [eintraege]);

  function speichern(){
    const eintrag = {
      id: Date.now(),
      datum: datum || heute(),
      kuerzel: kuerzel.trim(),
      notiz: notiz.trim(),
      antworten: KRITERIEN.map(c => ({ nr: c.nr, titel: c.titel, wert: antworten[c.nr] || 'ja' }))
    };
    setEintraege(prev => [eintrag, ...prev]);
    setKuerzel('');
    setNotiz('');
    setDatum(heute());
    setAntworten(Object.fromEntries(KRITERIEN.map(c => [c.nr, 'ja'])));
  }

  function loeschen(id){
    setEintraege(prev => prev.filter(e => e.id !== id));
  }

  const schwachstellen = useMemo(() => {
    if(eintraege.length === 0) return null;
    const zaehler = Object.fromEntries(KRITERIEN.map(c => [c.nr, { titel: c.titel, nein: 0, teilweise: 0 }]));
    eintraege.forEach(e => e.antworten.forEach(a => {
      if(a.wert === 'nein') zaehler[a.nr].nein++;
      if(a.wert === 'teilweise') zaehler[a.nr].teilweise++;
    }));
    return Object.values(zaehler)
      .map(z => ({ ...z, score: z.nein * 2 + z.teilweise }))
      .filter(z => z.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [eintraege]);

  return (
    <main>
      <p className="pruef-intro">Fünf Minuten nach jeder Sitzung. Der Prüfrahmen dient nicht der Bewertung des Klienten, sondern der eigenen Prozessqualität. Jede Abweichung ist ein Hinweis für die nächste Sitzung, kein Urteil über die aktuelle.</p>

      <h2 className="section-title">Neuer Eintrag</h2>

      <div className="pruef-meta">
        <div className="field">
          <label>Datum</label>
          <input type="date" value={datum} onChange={e => setDatum(e.target.value)} />
        </div>
        <div className="field">
          <label>Klient / Kontext (Kürzel)</label>
          <input type="text" value={kuerzel} onChange={e => setKuerzel(e.target.value)} placeholder="z. B. Initialen oder Themenkürzel" />
        </div>
      </div>

      {KRITERIEN.map(c => (
        <div className="criterion-row" key={c.nr}>
          <div className="criterion-top">
            <div className="criterion-nr">{String(c.nr).padStart(2, '0')}</div>
            <div style={{ flex: 1 }}>
              <p className="criterion-titel">{c.titel}</p>
              <p className="criterion-frage">{c.frage}</p>
              <p className="criterion-hinweis">{c.hinweis}</p>
              <div className="radio-row">
                {['ja', 'teilweise', 'nein'].map(opt => (
                  <label className="radio-opt" key={opt}>
                    <input
                      type="radio"
                      name={`crit_${c.nr}`}
                      value={opt}
                      checked={antworten[c.nr] === opt}
                      onChange={() => setAntworten(prev => ({ ...prev, [c.nr]: opt }))}
                    />
                    {opt === 'ja' ? 'Ja' : opt === 'teilweise' ? 'Teilweise' : 'Nein'}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="field" style={{ marginTop: '1rem' }}>
        <label>Notiz für die nächste Sitzung</label>
        <textarea rows={3} value={notiz} onChange={e => setNotiz(e.target.value)} placeholder="Was möchten Sie beim nächsten Mal anders machen?" />
      </div>

      <div className="pruef-actions">
        <button className="ghost" onClick={() => window.print()}>Drucken</button>
        <button className="primary" onClick={speichern}>Eintrag speichern</button>
      </div>

      {schwachstellen && (
        schwachstellen.length === 0 ? (
          <div className="schwachstellen">
            <h4>Wiederkehrende Schwachstellen</h4>
            Über alle gespeicherten Einträge bislang durchgängig "Ja". Kein Kriterium fällt aktuell auf.
          </div>
        ) : (
          <div className="schwachstellen">
            <h4>Wiederkehrende Schwachstellen, über alle gespeicherten Einträge</h4>
            {schwachstellen.map((s, i) => (
              <div key={i}>{s.titel} — {s.nein} mal Nein, {s.teilweise} mal Teilweise</div>
            ))}
          </div>
        )
      )}

      <h2 className="section-title">Verlauf</h2>
      {eintraege.length === 0 ? (
        <div className="empty">Noch keine gespeicherten Einträge.</div>
      ) : (
        eintraege.map(e => (
          <div className="verlauf-item" key={e.id}>
            <div className="verlauf-top">
              <div>
                <span className="verlauf-datum">{e.datum}</span>
                {e.kuerzel && <span className="verlauf-kuerzel"> · {e.kuerzel}</span>}
              </div>
              <button className="verlauf-del" onClick={() => loeschen(e.id)}>Eintrag löschen</button>
            </div>
            <div className="dots">
              {e.antworten.map(a => (
                <span className={`dot ${a.wert}`} title={`${a.titel}: ${a.wert}`} key={a.nr}></span>
              ))}
            </div>
            {e.notiz && <div className="verlauf-notiz">{e.notiz}</div>}
          </div>
        ))
      )}
    </main>
  );
}
