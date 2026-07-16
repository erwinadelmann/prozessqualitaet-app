import { useState } from 'react';
import EMDR from './EMDR.jsx';
import ACTDefusion from './ACTDefusion.jsx';
import InnerGame from './InnerGame.jsx';

// Bündelt EMDR, ACT/Defusion und Inner Game unter einem Tab mit Themen-Umschalter, nach
// demselben Muster wie die Videothek. Vorher drei eigene Tabs, gleiche Inhalte, jetzt ein
// Tab weniger in der Leiste. Jedes Thema behält seine eigene Komponente/Datei unverändert,
// nur die Tab-Ebene wird hier zusammengeführt.
const THEMEN = [
  { id: 'emdr', label: 'EMDR' },
  { id: 'act', label: 'ACT, Defusion' },
  { id: 'innergame', label: 'Inner Game' }
];

export default function Modelle({ initialThemaId, initialOpenId, initialOpenNr }){
  const [aktivId, setAktivId] = useState(() =>
    THEMEN.some(t => t.id === initialThemaId) ? initialThemaId : THEMEN[0].id
  );

  const switcher = (
    <div className="picker-wrap" style={{ paddingBottom: 0 }}>
      <div className="chip-grid">
        {THEMEN.map(t => (
          <button
            key={t.id}
            className={'chip' + (t.id === aktivId ? ' active' : '')}
            onClick={() => setAktivId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {switcher}
      {aktivId === 'emdr' && (
        <EMDR key="emdr" initialOpenNr={initialThemaId === 'emdr' ? initialOpenNr : undefined} />
      )}
      {aktivId === 'act' && (
        <ACTDefusion key="act" initialOpenId={initialThemaId === 'act' ? initialOpenId : undefined} />
      )}
      {aktivId === 'innergame' && <InnerGame key="innergame" />}
    </>
  );
}
