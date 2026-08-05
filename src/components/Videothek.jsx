import { useState } from 'react';
import VideoListTab from './VideoListTab.jsx';
import { GUNTHER_SCHMIDT_VIDEOS } from '../data/gunther-schmidt-videos.js';
import { BUDDHA_OMA_VIDEOS } from '../data/buddha-oma-videos.js';
import { BOUNDLESS_MOVEMENT_VIDEOS } from '../data/boundless-movement-videos.js';
import { ERO_LANGLOTZ_VIDEOS } from '../data/ero-langlotz-videos.js';
import { JULIA_BELKE_VIDEOS } from '../data/julia-belke-videos.js';
import { ALEXANDER_HARTMANN_VIDEOS } from '../data/alexander-hartmann-videos.js';
import { VERENA_KOENIG_VIDEOS } from '../data/verena-koenig-videos.js';

// Bündelt die Video-Sammlungen unter einem Tab, damit die Tab-Leiste bei zwei
// übersichtlichen Zeilen bleibt statt mit jeder neuen Sammlung eine weitere Spalte zu
// beanspruchen.
//
// Buddha Oma, Boundless Movement, Dr. Ero Langlotz, Dr. Julia Belke, Alexander Hartmann
// und Verena König sind "synced": true,
// laden also ausschließlich aus der jeweiligen Seed-Datei (fest im Code, gleich auf jedem
// Gerät) statt aus localStorage. So bleiben Titel und Reihenfolge auf allen Endgeräten
// identisch und stabil, bis die Seed-Datei geändert und neu deployt wird. Grund:
// localStorage ist pro Browser/Gerät, zwei Geräte würden sonst unterschiedliche Stände
// zeigen (siehe VideoListTab.jsx).
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
  },
  {
    id: 'erolanglotz',
    label: 'Dr. Ero Langlotz',
    storageKey: 'ero_langlotz_videos_v1',
    seed: ERO_LANGLOTZ_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Dr. Ero Langlotz',
    titel: 'Dr. Ero Langlotz',
    hinweis: 'Vorträge und Sessions von Dr. Ero Langlotz zu Autonomie, Resilienz und Beziehungsklärung. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'juliabelke',
    label: 'Dr. Julia Belke',
    storageKey: 'julia_belke_videos_v1',
    seed: JULIA_BELKE_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Dr. Julia Belke',
    titel: 'Dr. Julia Belke',
    hinweis: 'Impulse von Dr. Julia Belke zu Traumatherapie, Aufstellungen und Beziehungsmustern. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'alexanderhartmann',
    label: 'Alexander Hartmann',
    storageKey: 'alexander_hartmann_videos_v1',
    seed: ALEXANDER_HARTMANN_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Alexander Hartmann',
    titel: 'Alexander Hartmann',
    hinweis: 'Videos von Alexander Hartmann zu Hypnose und Trancearbeit. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'verenakoenig',
    label: 'Verena König',
    storageKey: 'verena_koenig_videos_v1',
    seed: VERENA_KOENIG_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Verena König',
    titel: 'Verena König',
    hinweis: 'Podcast-Folgen von Verena König zu Entwicklungstrauma und Abgrenzung. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
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
          className={'chip vs-' + s.id + (s.id === aktivId ? ' active' : '')}
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
