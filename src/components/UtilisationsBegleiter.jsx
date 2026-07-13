import { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'utilisationsbegleiter_session_v1';

const WILLKOMMEN = {
  role: 'assistant',
  content: 'Willkommen. Erzählen Sie mir, welches Muster, welche Reaktion oder welches Thema Sie gerade beschäftigt. Ich höre erst einmal einfach zu.'
};

function ladeSession(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if(Array.isArray(parsed) && parsed.length > 0) return parsed;
  }catch{ /* ignore */ }
  return [WILLKOMMEN];
}

export default function UtilisationsBegleiter(){
  const [messages, setMessages] = useState(() => ladeSession());
  const [entwurf, setEntwurf] = useState('');
  const [laedt, setLaedt] = useState(false);
  const [fehler, setFehler] = useState(null);
  const endeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    endeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  async function senden(){
    const text = entwurf.trim();
    if(!text || laedt) return;

    const naechste = [...messages, { role: 'user', content: text }];
    setMessages(naechste);
    setEntwurf('');
    setFehler(null);
    setLaedt(true);

    try{
      const response = await fetch('/api/utilisationsbegleiter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: naechste })
      });
      const data = await response.json();
      if(!response.ok){
        setFehler(data.error || 'Unbekannter Fehler bei der Anfrage.');
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      }
    }catch(err){
      setFehler('Verbindung fehlgeschlagen: ' + (err && err.message ? err.message : String(err)));
    }finally{
      setLaedt(false);
    }
  }

  function neuesThema(){
    setMessages([WILLKOMMEN]);
    setEntwurf('');
    setFehler(null);
  }

  function onKeyDown(e){
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      senden();
    }
  }

  return (
    <main className="ub-main">
      <div className="up-hero">
        <p className="eyebrow">Utilisations-Begleiter</p>
        <h2>Ihr Thema, Schritt für Schritt utilisiert</h2>
      </div>
      <p className="up-hinweis">
        Ein Schritt nach dem anderen, in Ihrem Tempo. Schreiben Sie frei, der Begleiter wartet auf Ihre Antwort, bevor es weitergeht.
      </p>

      <div className="ub-chat">
        {messages.map((m, i) => (
          <div key={i} className={'ub-bubble ub-bubble-' + m.role}>
            <div className="ub-bubble-label">{m.role === 'assistant' ? 'Begleiter' : 'Sie'}</div>
            <div className="ub-bubble-text">{m.content}</div>
          </div>
        ))}
        {laedt && (
          <div className="ub-bubble ub-bubble-assistant ub-bubble-loading">
            <div className="ub-bubble-label">Begleiter</div>
            <div className="ub-bubble-text ub-typing"><span></span><span></span><span></span></div>
          </div>
        )}
        <div ref={endeRef} />
      </div>

      {fehler && <div className="ub-fehler">{fehler}</div>}

      <div className="ub-eingabe">
        <textarea
          value={entwurf}
          onChange={e => setEntwurf(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ihre Antwort …"
          rows={2}
          disabled={laedt}
        />
        <div className="ub-eingabe-buttons">
          <button className="btn-primary" onClick={senden} disabled={laedt || !entwurf.trim()}>Senden</button>
          <button className="ub-neu-btn" onClick={neuesThema} disabled={laedt}>Neues Thema beginnen</button>
        </div>
      </div>
    </main>
  );
}
