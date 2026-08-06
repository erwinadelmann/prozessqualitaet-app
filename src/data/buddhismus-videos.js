// Feste, geräteübergreifend synchronisierte Liste für den Tab "Buddhismus".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann).
//
// Abgrenzung zur Sammlung "Buddha Oma": dort ausschließlich Ursula Lyon. Hier die Reihe
// "Tiefsinnige Fragen" zum edlen achtfachen Pfad sowie Vorträge von Lama Ole Nydahl.
// Reihenfolge der Pfad-Reihe inhaltlich gesetzt: erst der Überblick, dann die einzelnen
// Pfadglieder. Stand: 2026-08-05.
export const BUDDHISMUS_VIDEOS = [
  { url: 'https://youtu.be/zLHqX2p_f3w', title: 'Der edle achtfache Pfad, Tiefsinnige Fragen' },
  { url: 'https://youtu.be/DT1YfBGn_wQ', title: 'Achtfacher Pfad, Tugend, Tiefsinnige Fragen' },
  { url: 'https://youtu.be/qsGivFvxTI4', title: 'Rechte Rede, rechter Lebenserwerb, Tiefsinnige Fragen' },
  { url: 'https://youtu.be/Si8TLApX8vQ', title: 'Bewusstsein regiert die Welt, Tiefsinnige Fragen' },
  { url: 'https://youtu.be/E898ohN7drI', title: 'Kraft der Gefühle, Lama Ole Nydahl' }
];
