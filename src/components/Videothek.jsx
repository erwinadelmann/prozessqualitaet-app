import { useState } from 'react';
import VideoListTab from './VideoListTab.jsx';
import { GUNTHER_SCHMIDT_VIDEOS } from '../data/gunther-schmidt-videos.js';
import { BUDDHA_OMA_VIDEOS } from '../data/buddha-oma-videos.js';
import { BOUNDLESS_MOVEMENT_VIDEOS } from '../data/boundless-movement-videos.js';

// Bündelt die drei Video-Sammlungen unter einem Tab, damit die Tab-Leiste bei zwei
// übersichtlichen Zeilen bleibt statt mit jeder neuen Sammlung eine weitere Spalte zu
// beanspruchen.
//
// Buddha Oma und Boundless Movement sind "synced": true, laden also ausschließlich aus
// der jeweiligen Seed-Datei (fest im Code, gleich auf jedem Gerät) statt aus localStorage.
// So bleiben Titel und Reihenfolge auf allen Endgeräten identisch und stabil, bis die
// Seed-Datei geändert und neu deployt wird. Grund: localStorage ist pro Browser/Gerät,
// zwei Geräte würden sonst unterschiedliche Stände zeigen (siehe VideoListTab.jsx).
// Dr. Gunther Schmidt ist bewusst weiterhin frei editierbar/lokal gespeichert, da diese
// Sammlung noch nicht befüllt und nicht von der Sync-Anforderung betroffen war.
const SAMMLUNGEN = [
  {
    id: 'guntherschmidt',
    label: 'Dr. Gunther Schmidt',
    storageKey: 'gunther_schmidt_videos_v1',
    seed: GUNTHER_SCHMIDT_VIDEOS,
    synced: false,
    eyebrow: 'Videothek · Hypnosystemik',
    titel: 'Dr. Gunther Schmidt',
    hinweis: 'Vorträge und Gespräche von und mit Dr. Gunther Schmidt zur Hypnosystemik. Reihenfolge, Titel und Auswahl sind hier frei editierbar, alles wird automatisch auf diesem Gerät gespeichert.'
  },
  {
    id: 'buddhaoma',
    label: 'Buddha Oma',
    storageKey: 'buddha_oma_videos_v1',
    seed: BUDDHA_OMA_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Buddha Oma',
    titel: 'Ursula Lyon, Impulse aus buddhistischer Sicht',
    hinweis: 'Kurze, alltagsnahe Impulse der buddhistischen Yoga- und Meditationslehrerin Ursula Lyon. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'boundlessmovement',
    label: 'Boundless Movement',
    storageKey: 'boundless_movement_videos_v1',
    seed: BOUNDLESS_MOVEMENT_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Boundless Movement',
    titel: 'Natürliche, bewusste Bewegung',
    hinweis: 'Videos zur Boundless-Movement-Methode. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  }
];

export default function Videothek({ initialSammlungId }){
  const [aktivId, setAktivId] = useState(() =>
    SAMMLUNGEN.some(s => s.id === initialSammlungId) ? initialSammlungId : SAMMLUNGEN[0].id
  );
  const sammlung = SAMMLUNGEN.find(s => s.id === aktivId) || SAMMLUNGEN[0];

  const switcher = (
    <div className="chip-grid videothek-switch">
      {SAMMLUNGEN.map(s => (
        <button
          key={s.id}
          className={'chip' + (s.id === aktivId ? ' active' : '')}
          onClick={() => setAktivId(s.id)}
        >
          {s.label}
        </button>
      ))}
    </div>
  );

  return (
    <VideoListTab
      key={sammlung.id}
      storageKey={sammlung.storageKey}
      seed={sammlung.seed}
      synced={sammlung.synced}
      eyebrow={sammlung.eyebrow}
      titel={sammlung.titel}
      hinweis={sammlung.hinweis}
      extraTop={switcher}
    />
  );
}
