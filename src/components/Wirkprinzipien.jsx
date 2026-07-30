import { useState } from 'react';
import TheoretischeGrundlagen from './TheoretischeGrundlagen.jsx';

// Eigener Tab "Wirkprinzipien", bewusst getrennt von "Weitere Modelle": hier geht es um die
// wissenschaftliche und methodische Grundlage selbst (wie Erleben entsteht, Schmidt,
// Erickson), nicht um einzelne Interventionsmodelle wie EMDR oder ACT. Gleiches
// Container-Muster wie Modelle.jsx/Videothek.jsx, mit Themen-Umschalter, damit künftige
// weitere Wirkprinzip-Themen einfach als zusätzlicher Eintrag in THEMEN ergänzt werden
// können, ohne die Tab-Struktur erneut anzufassen.
const THEMEN = [
  { id: 'grundlagen', label: 'Wie Erleben entsteht' }
];

export default function Wirkprinzipien({ initialThemaId, initialOpenId, initialOpenNr: _initialOpenNr }){
  const [aktivId, setAktivId] = useState(() =>
    THEMEN.some(t => t.id === initialThemaId) ? initialThemaId : THEMEN[0].id
  );

  const switcher = THEMEN.length > 1 && (
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
      {aktivId === 'grundlagen' && (
        <TheoretischeGrundlagen key="grundlagen" initialOpenId={initialThemaId === 'grundlagen' ? initialOpenId : undefined} />
      )}
    </>
  );
}
