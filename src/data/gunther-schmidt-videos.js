// Startbestückung für die Videothek-Sammlung "Dr. Gunther Schmidt".
// Nur die erste Ladung ohne gespeicherte Nutzerdaten greift auf diese Liste zurück,
// danach übernimmt localStorage (Titel, Reihenfolge, hinzugefügte/gelöschte Videos werden
// direkt in der App gepflegt, siehe VideoListTab.jsx).
// Titel stammen aus den echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API, Kanal
// @ErwinAdelmann), redundante Namensnennung entfernt. Video Nr. 3 hat auf YouTube keinen
// beschreibenden Titel, daher hier bewusst leer gelassen statt erfunden.
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
  { url: 'https://youtu.be/SH7ROd-auN4', title: 'Was bedeutet Hypnosystemik? Im Gespräch mit Danny Herzog-Braune' }
];
