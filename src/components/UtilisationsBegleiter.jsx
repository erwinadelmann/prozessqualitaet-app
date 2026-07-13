import { useState, useEffect, useRef } from 'react';
import { STEPS, resolvePrompt, resolveOptions, resolveNext } from '../data/utilisationsbegleiter-flow.js';

const STORAGE_KEY = 'utilisationsbegleiter_session_v2';

function initialSession(){
  return {
    stepId: 'start',
    answers: {},
    messages: [{ role: 'assistant', content: resolvePrompt(STEPS.start, { answers: {} }) }]
  };
}

function ladeSession(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if(parsed && parsed.stepId && STEPS[parsed.stepId] && Array.isArray(parsed.messages) && parsed.messages.length > 0){
      return parsed;
    }
  }catch{ /* ignore */ }
  return initialSession();
}

export default function UtilisationsBegleiter(){
  const [session, setSession] = useState(() => ladeSession());
  const [entwurf, setEntwurf] = useState('');
  const [laedt, setLaedt] = useState(false);
  const endeRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    endeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [session]);

  const currentStep = STEPS[session.stepId];

  function weiterZu(nextId, userBubble){
    const naechsteStep = STEPS[nextId];
    if(!naechsteStep) return;
    setLaedt(true);
    const zwischenstand = userBubble
      ? { ...session, messages: [...session.messages, userBubble] }
      : session;
    if(userBubble) setSession(zwischenstand);

    setTimeout(() => {
      setSession(prev => {
        const basis = userBubble ? zwischenstand : prev;
        const neueAnswers = { ...basis.answers };
        const text = resolvePrompt(naechsteStep, { answers: neueAnswers });
        return {
          stepId: nextId,
          answers: neueAnswers,
          messages: [...basis.messages, { role: 'assistant', content: text }]
        };
      });
      setLaedt(false);
    }, 380);
  }

  function senden(){
    const text = entwurf.trim();
    if(!text || laedt || currentStep.type !== 'reflect') return;
    const antworten = { ...session.answers };
    if(currentStep.storeAs) antworten[currentStep.storeAs] = text;
    const nextId = resolveNext(currentStep, text, { answers: antworten });
    setEntwurf('');
    setSession(prev => ({ ...prev, answers: antworten }));
    weiterZu(nextId, { role: 'user', content: text });
  }

  function waehleChip(chip){
    if(laedt || currentStep.type !== 'reflect') return;
    const antworten = { ...session.answers };
    if(currentStep.storeAs) antworten[currentStep.storeAs] = chip.value;
    const nextId = resolveNext(currentStep, chip.value, { answers: antworten });
    setEntwurf('');
    setSession(prev => ({ ...prev, answers: antworten }));
    weiterZu(nextId, { role: 'user', content: chip.label });
  }

  function waehleOption(option){
    if(laedt || currentStep.type !== 'choice') return;
    const antworten = { ...session.answers };
    if(currentStep.storeAs) antworten[currentStep.storeAs] = option.value;
    setSession(prev => ({ ...prev, answers: antworten }));
    weiterZu(option.next, { role: 'user', content: option.label });
  }

  function weiter(){
    if(laedt || (currentStep.type !== 'info')) return;
    const nextId = resolveNext(currentStep, null, session);
    weiterZu(nextId, null);
  }

  function neuesThema(){
    setSession(initialSession());
    setEntwurf('');
    setLaedt(false);
  }

  function onKeyDown(e){
    if(e.key === 'Enter' && !e.shiftKey){
      e.preventDefault();
      senden();
    }
  }

  const optionen = currentStep.type === 'choice' ? resolveOptions(currentStep, session) : null;

  return (
    <main className="ub-main">
      <div className="up-hero">
        <p className="eyebrow">Utilisations-Begleiter</p>
        <h2>Ihr Thema, Schritt für Schritt utilisiert</h2>
      </div>
      <p className="up-hinweis">
        Ein Schritt nach dem anderen, in Ihrem Tempo. Dieser Begleiter läuft ohne KI-Anbindung: Er führt Sie mit den festen Fragen des Utilisations-Prozesses durch, ohne Ihre Antworten inhaltlich zu deuten oder umzuformulieren.
      </p>

      <div className="ub-chat">
        {session.messages.map((m, i) => (
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

      <div className="ub-eingabe">
        {currentStep.type === 'reflect' && (
          <>
            <textarea
              value={entwurf}
              onChange={e => setEntwurf(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ihre Antwort …"
              rows={2}
              disabled={laedt}
            />
            {currentStep.chipsHint && <p className="ub-chips-hint">{currentStep.chipsHint}</p>}
            {currentStep.chips && (
              <div className="ub-chips">
                {currentStep.chips.map((c, i) => (
                  <button key={i} className="ub-chip" onClick={() => waehleChip(c)} disabled={laedt}>{c.label}</button>
                ))}
              </div>
            )}
            <div className="ub-eingabe-buttons">
              <button className="btn-primary" onClick={senden} disabled={laedt || !entwurf.trim()}>Senden</button>
              <button className="ub-neu-btn" onClick={neuesThema} disabled={laedt}>Neues Thema beginnen</button>
            </div>
          </>
        )}

        {currentStep.type === 'choice' && (
          <>
            <div className="ub-choices">
              {optionen.map((o, i) => (
                <button key={i} className="ub-choice-btn" onClick={() => waehleOption(o)} disabled={laedt}>{o.label}</button>
              ))}
            </div>
            <div className="ub-eingabe-buttons">
              <button className="ub-neu-btn" onClick={neuesThema} disabled={laedt}>Neues Thema beginnen</button>
            </div>
          </>
        )}

        {currentStep.type === 'info' && (
          <div className="ub-eingabe-buttons">
            <button className="btn-primary" onClick={weiter} disabled={laedt}>{currentStep.buttonLabel || 'Weiter'}</button>
            <button className="ub-neu-btn" onClick={neuesThema} disabled={laedt}>Neues Thema beginnen</button>
          </div>
        )}

        {currentStep.type === 'end' && (
          <div className="ub-eingabe-buttons">
            <button className="ub-neu-btn" onClick={neuesThema}>Neues Thema beginnen</button>
          </div>
        )}
      </div>
    </main>
  );
}
