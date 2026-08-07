import { useState } from 'react';
import VideoListTab from './VideoListTab.jsx';
import { GUNTHER_SCHMIDT_VIDEOS } from '../data/gunther-schmidt-videos.js';
import { BUDDHA_OMA_VIDEOS } from '../data/buddha-oma-videos.js';
import { BOUNDLESS_MOVEMENT_VIDEOS } from '../data/boundless-movement-videos.js';
import { ERO_LANGLOTZ_VIDEOS } from '../data/ero-langlotz-videos.js';
import { JULIA_BELKE_VIDEOS } from '../data/julia-belke-videos.js';
import { ALEXANDER_HARTMANN_VIDEOS } from '../data/alexander-hartmann-videos.js';
import { VERENA_KOENIG_VIDEOS } from '../data/verena-koenig-videos.js';
import { AKRAM_VIGNAN_VIDEOS } from '../data/akram-vignan-videos.js';
import { ACT_VIDEOS } from '../data/act-videos.js';
import { SCHEMATHERAPIE_VIDEOS } from '../data/schematherapie-videos.js';
import { NLP_VIDEOS } from '../data/nlp-videos.js';
import { TEPPERWEIN_VIDEOS } from '../data/tepperwein-videos.js';
import { HOTEL_MATZE_VIDEOS } from '../data/hotel-matze-videos.js';
import { EFT_VIDEOS } from '../data/eft-videos.js';
import { LEBENSWEISHEITEN_VIDEOS } from '../data/lebensweisheiten-videos.js';
import { ECKHART_TOLLE_VIDEOS } from '../data/eckhart-tolle-videos.js';
import { ECKHART_TOLLE_MEMBER_VIDEOS } from '../data/eckhart-tolle-member-videos.js';
import { BUDDHISMUS_VIDEOS } from '../data/buddhismus-videos.js';
import { AYYA_KHEMA_VIDEOS } from '../data/ayya-khema-videos.js';
import { COACHING_GRUNDLAGEN_VIDEOS } from '../data/coaching-grundlagen-videos.js';

// Bündelt die Video-Sammlungen unter einem Tab, damit die Tab-Leiste bei zwei
// übersichtlichen Zeilen bleibt statt mit jeder neuen Sammlung eine weitere Spalte zu
// beanspruchen.
//
// ALLE Sammlungen sind "synced": true, laden also ausschließlich aus der jeweiligen
// Seed-Datei (fest im Code, gleich auf jedem Gerät) statt aus localStorage. So bleiben
// Titel und Reihenfolge auf allen Endgeräten identisch und stabil, bis die Seed-Datei
// geändert und neu deployt wird. Grund: localStorage ist pro Browser/Gerät, zwei Geräte
// würden sonst unterschiedliche Stände zeigen (siehe VideoListTab.jsx).
//
// Dr. Gunther Schmidt war bis 2026-08-05 als einzige Sammlung frei editierbar/lokal
// gespeichert und wurde auf Wunsch ebenfalls auf synced umgestellt. Damit entfällt dort
// das manuelle Hinzufügen, Umsortieren und Löschen von Videos in der App; Änderungen
// laufen jetzt wie überall über src/data/gunther-schmidt-videos.js und einen Deploy.
const SAMMLUNGEN = [
  {
    id: 'guntherschmidt',
    label: 'Dr. Gunther Schmidt',
    storageKey: 'gunther_schmidt_videos_v1',
    seed: GUNTHER_SCHMIDT_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Hypnosystemik',
    titel: 'Dr. Gunther Schmidt',
    hinweis: 'Vorträge und Gespräche von und mit Dr. Gunther Schmidt zur Hypnosystemik. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
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
  },
  {
    id: 'akramvignan',
    label: 'Akram Vignan',
    storageKey: 'akram_vignan_videos_v1',
    seed: AKRAM_VIGNAN_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Akram Vignan',
    titel: 'Akram Vignan',
    hinweis: 'Videos zur spirituellen Lehre des Akram Vignan. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'act',
    label: 'ACT',
    storageKey: 'act_videos_v1',
    seed: ACT_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · ACT',
    titel: 'Akzeptanz- und Commitment-Therapie',
    hinweis: 'Videos zu ACT, Defusion und Werteklärung. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'schematherapie',
    label: 'Schematherapie',
    storageKey: 'schematherapie_videos_v1',
    seed: SCHEMATHERAPIE_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Schematherapie',
    titel: 'Schematherapie',
    hinweis: 'Videos zu Schematherapie und Modusarbeit. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'nlp',
    label: 'NLP',
    storageKey: 'nlp_videos_v1',
    seed: NLP_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · NLP',
    titel: 'NLP',
    hinweis: 'Eigene Videos zu NLP-Techniken: Zielarbeit, Ankern, systemisches Coaching, Ressourcenarbeit. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'tepperwein',
    label: 'Tepperwein',
    storageKey: 'tepperwein_videos_v1',
    seed: TEPPERWEIN_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Tepperwein',
    titel: 'Tepperwein Lebensseminar',
    hinweis: 'Mitschnitte des Tepperwein-Lebensseminars (Kurt Tepperwein). Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'hotelmatze',
    label: 'Hotel Matze',
    storageKey: 'hotel_matze_videos_v1',
    seed: HOTEL_MATZE_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Hotel Matze',
    titel: 'Hotel Matze',
    hinweis: 'Folgen des Podcasts Hotel Matze (Matze Hielscher). Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'eft',
    label: 'EFT',
    storageKey: 'eft_videos_v1',
    seed: EFT_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · EFT',
    titel: 'Emotionsfokussierte Therapie (EFT)',
    hinweis: 'Videos zur Emotionsfokussierten Therapie (EFT). Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'lebensweisheiten',
    label: 'Lebensweisheiten',
    storageKey: 'lebensweisheiten_videos_v1',
    seed: LEBENSWEISHEITEN_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Lebensweisheiten',
    titel: 'Lebensweisheiten',
    hinweis: 'Reflexionen zu Haltung, Werten und Lebensperspektive. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'eckharttolle',
    label: 'Eckhart Tolle',
    storageKey: 'eckhart_tolle_videos_v1',
    seed: ECKHART_TOLLE_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Eckhart Tolle',
    titel: 'Eckhart Tolle',
    hinweis: 'Impulse von Eckhart Tolle zu Präsenz, Bewusstsein und Gegenwärtigkeit. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'eckharttollemember',
    label: 'Eckhart Tolle · Member',
    storageKey: 'eckhart_tolle_member_videos_v1',
    seed: ECKHART_TOLLE_MEMBER_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Eckhart Tolle, Mitgliederbereich',
    titel: 'Eckhart Tolle, Mitgliederbereich',
    hinweis: 'Videos, die ohne Anmeldung bei YouTube nicht abrufbar sind, sehr wahrscheinlich Inhalte aus dem Mitgliederbereich des Kanals. Sie lassen sich hier voraussichtlich nicht abspielen und dienen vorerst als Merkliste. Die echten Titel liegen noch nicht vor, angezeigt wird die Video-Kennung.'
  },
  {
    id: 'buddhismus',
    label: 'Buddhismus',
    storageKey: 'buddhismus_videos_v1',
    seed: BUDDHISMUS_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Buddhismus',
    titel: 'Buddhismus',
    hinweis: 'Die Reihe „Tiefsinnige Fragen" zum edlen achtfachen Pfad sowie Vorträge von Lama Ole Nydahl. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'ayyakhema',
    label: 'Buddhismus · Ayya Khema',
    storageKey: 'ayya_khema_videos_v1',
    seed: AYYA_KHEMA_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Buddhismus, Ayya Khema',
    titel: 'Ayya Khema, Vorträge und geleitete Meditationen',
    hinweis: 'Unterkategorie zu Buddhismus. Vollständige deutschsprachige Vortragsreihe von Ayya Khema, Quelle ist die Playlist des Kanals „Buddhas Lehre". Enthält die Reihe „Tiefsinnige Fragen" in anderen Aufnahmen als der Tab Buddhismus. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
  },
  {
    id: 'coachinggrundlagen',
    label: 'Coaching-Grundlagen',
    storageKey: 'coaching_grundlagen_videos_v1',
    seed: COACHING_GRUNDLAGEN_VIDEOS,
    synced: true,
    eyebrow: 'Videothek · Coaching-Grundlagen',
    titel: 'Coaching-Grundlagen',
    hinweis: 'Methodenübergreifende Grundlagen: Rollenklärung, Modelle und lösungsorientierte Haltung. Reihenfolge und Titel sind fest hinterlegt und auf allen Geräten identisch.'
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
