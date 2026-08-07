// Feste, geräteübergreifend synchronisierte Liste für den Tab "Buddhismus".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API).
//
// Stand: 2026-08-07. Die vier Mitschnitte der Reihe "Tiefsinnige Fragen" wurden auf
// Erwins Wunsch in die Sammlung "Buddhismus · Ayya Khema" verschoben, da sie inhaltlich
// dorthin gehören (siehe ayya-khema-videos.js). Hier verbleibt damit nur Lama Ole Nydahl.
//
// Abgrenzung zu den benachbarten Sammlungen: "Buddha Oma" enthält ausschließlich
// Ursula Lyon, "Buddhismus · Ayya Khema" ausschließlich Ayya Khema.
export const BUDDHISMUS_VIDEOS = [
  { url: 'https://youtu.be/E898ohN7drI', title: 'Kraft der Gefühle, Lama Ole Nydahl' }
];
