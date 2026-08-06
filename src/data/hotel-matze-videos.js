// Feste, geräteübergreifend synchronisierte Liste für den Tab "Hotel Matze".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel sollen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann), Inhalt sind Folgen des Podcasts Hotel Matze.
// Stand: 2026-08-05.
export const HOTEL_MATZE_VIDEOS = [
  { url: 'https://youtu.be/FcCVwRaViRo', title: 'Scham-Experte, Warum wir uns schämen, und niemand darüber spricht, Stephan Marks' }
];
