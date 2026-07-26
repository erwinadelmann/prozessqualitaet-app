// Startbestückung für die Videothek-Sammlung "Dr. Gunther Schmidt".
// Nur die erste Ladung ohne gespeicherte Nutzerdaten greift auf diese Liste zurück,
// danach übernimmt localStorage (Titel, Reihenfolge, hinzugefügte/gelöschte Videos werden
// direkt in der App gepflegt, siehe VideoListTab.jsx).
// Titel Nr. 1–10 stammen aus den echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API,
// Kanal @ErwinAdelmann), redundante Namensnennung entfernt. Video Nr. 3 hat auf YouTube
// keinen beschreibenden Titel, daher hier bewusst leer gelassen statt erfunden.
// Titel Nr. 11–13 (ergänzt 2026-07-26) stammen von Fremdkanälen (life lessons, InKonstellation),
// die über bzw. mit Dr. Gunther Schmidt sprechen, nicht von seinem eigenen Kanal.
//
// WICHTIG: Diese Sammlung ist NICHT "synced" (siehe Videothek.jsx) – auf Geräten, die die
// Sammlung schon einmal geöffnet haben, greift ab jetzt der localStorage-Stand, nicht diese
// Seed-Datei. Neu ergänzte Videos erscheinen dort nur nach manueller Ergänzung in der App
// oder nach Zurücksetzen des lokalen Speichers.
export const GUNTHER_SCHMIDT_VIDEOS = [
  { url: 'https://youtu.be/iAjItq7W5L4', title: 'Problemtrance – gefangen, ohne es zu merken?' },
  { url: 'https://youtu.be/rOr2TvHuN_M', title: 'Wahlmöglichkeiten' },
  { url: 'https://youtu.be/kWtkHXyHFLY', title: '' },
  { url: 'https://youtu.be/ynx2L2oRtvg', title: 'Grundkurs Hypnosystemische Konzepte – Trailer' },
  { url: 'https://youtu.be/pwfDQKXerzA', title: 'Aufbaukurs Hypnosystemische Konzepte – Trailer' },
  { url: 'https://youtu.be/UQOir-4v-iM', title: 'Warum Probleme eigentlich Lösungsversuche sind' },
  { url: 'https://youtu.be/DdudAJgn-KE', title: 'Gelassenheit in Stresssituationen meistern' },
  { url: 'https://youtu.be/FQtPjpV45bY', title: 'Highlights und Verdichtungen aus seinem Lebenswerk' },
  { url: 'https://youtu.be/hlBU2iHpHa4', title: 'Reden reicht nicht' },
  { url: 'https://youtu.be/SH7ROd-auN4', title: 'Was bedeutet Hypnosystemik? Im Gespräch mit Danny Herzog-Braune' },
  { url: 'https://youtu.be/AY38RoPe-Gk', title: 'Entscheidungen – ein hypnosystemischer Blick' },
  { url: 'https://youtu.be/s615OrloMuc', title: 'Gunther Schmidts wahrscheinlich bestes "Demo Coaching" – Analyse von Timo Schlage' },
  { url: 'https://youtu.be/c-nvqEqPlhA', title: 'Was gute Coaching-Ausbildungen wirklich auszeichnet (10 Punkte)' }
];
