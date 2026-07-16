import { useState, useEffect } from 'react';

// Wiederverwendbare Video-Liste, zwei Betriebsarten je nach Prop "synced":
//
// synced=false (Standard, z. B. Dr. Gunther Schmidt): frei editierbar, YouTube-Link +
// Titel hinzufügen, Titel bearbeiten, Video löschen, Reihenfolge per Auf/Ab-Pfeil ändern.
// Wird automatisch in localStorage gespeichert, gilt also nur für dieses eine Gerät.
//
// synced=true (Buddha Oma, Boundless Movement): Titel und Reihenfolge kommen ausschließlich
// aus der seed-Liste (src/data/buddha-oma-videos.js, src/data/boundless-movement-videos.js),
// localStorage wird hier bewusst nicht verwendet. So zeigen alle Geräte garantiert denselben
// Stand. Änderungswunsch: Titel/Reihenfolge/Auswahl in der jeweiligen Seed-Datei anpassen
// lassen, das geht anschließend über den normalen Deploy live.

function parseYouTubeId(url){
  if(!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function ladeSeed(seed){
  return seed.map((v, i) => ({ id: 'seed-' + i, url: v.url, title: v.title || '' }));
}

function ladeVideos(storageKey, seed){
  try{
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : null;
    if(Array.isArray(parsed) && parsed.length > 0) return parsed;
  }catch{ /* ignore */ }
  return ladeSeed(seed);
}

export default function VideoListTab({ storageKey, seed, synced, eyebrow, titel, hinweis, extraTop }){
  const [videos, setVideos] = useState(() => synced ? ladeSeed(seed) : ladeVideos(storageKey, seed));
  const [neuUrl, setNeuUrl] = useState('');
  const [neuTitel, setNeuTitel] = useState('');
  const [fehler, setFehler] = useState(null);

  useEffect(() => {
    if(synced) return;
    localStorage.setItem(storageKey, JSON.stringify(videos));
  }, [storageKey, videos, synced]);

  function hinzufuegen(){
    const url = neuUrl.trim();
    if(!url) return;
    if(!parseYouTubeId(url)){
      setFehler('Kein gültiger YouTube-Link erkannt. Bitte einen Link wie https://youtu.be/… oder https://www.youtube.com/watch?v=… einfügen.');
      return;
    }
    setVideos(prev => [...prev, { id: 'v-' + Date.now(), url, title: neuTitel.trim() }]);
    setNeuUrl('');
    setNeuTitel('');
    setFehler(null);
  }

  function titelAendern(id, title){
    setVideos(prev => prev.map(v => v.id === id ? { ...v, title } : v));
  }

  function loeschen(id){
    setVideos(prev => prev.filter(v => v.id !== id));
  }

  function rauf(index){
    if(index === 0) return;
    setVideos(prev => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function runter(index){
    setVideos(prev => {
      if(index === prev.length - 1) return prev;
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  return (
    <main>
      {extraTop}
      <div className="up-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{titel}</h2>
      </div>
      <p className="up-hinweis">{hinweis}</p>

      {!synced && (
        <>
          <div className="vlt-add">
            <input
              type="text"
              value={neuUrl}
              onChange={e => { setNeuUrl(e.target.value); setFehler(null); }}
              placeholder="YouTube-Link einfügen …"
            />
            <input
              type="text"
              value={neuTitel}
              onChange={e => setNeuTitel(e.target.value)}
              placeholder="Titel (optional, später jederzeit änderbar)"
            />
            <button className="btn-primary" onClick={hinzufuegen} disabled={!neuUrl.trim()}>Video hinzufügen</button>
          </div>
          {fehler && <p className="vlt-fehler">{fehler}</p>}
        </>
      )}

      {videos.length === 0 ? (
        <div className="empty">Noch keine Videos. Oben einen YouTube-Link einfügen.</div>
      ) : (
        <div className="video-grid">
          {videos.map((v, i) => {
            const videoId = parseYouTubeId(v.url);
            return (
              <div className="video-card vlt-card" key={v.id}>
                <div className="video-frame">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                      title={v.title || v.url}
                      loading="lazy"
                      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="vlt-broken">Link nicht erkannt: {v.url}</div>
                  )}
                </div>
                {synced ? (
                  <p className="vlt-titel-fest">{v.title || 'Ohne Titel'}</p>
                ) : (
                  <>
                    <input
                      type="text"
                      className="vlt-titel-input"
                      value={v.title}
                      onChange={e => titelAendern(v.id, e.target.value)}
                      placeholder="Titel eingeben …"
                    />
                    <div className="vlt-card-actions">
                      <button onClick={() => rauf(i)} disabled={i === 0} aria-label="Nach oben">↑</button>
                      <button onClick={() => runter(i)} disabled={i === videos.length - 1} aria-label="Nach unten">↓</button>
                      <button className="vlt-del" onClick={() => loeschen(v.id)}>Löschen</button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
