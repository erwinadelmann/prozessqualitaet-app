// Feste, geräteübergreifend synchronisierte Liste für den Tab "Hotel Matze".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel sollen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Videos Nr. 2–5 stammen vom
// Original-Kanal @HotelMatze, Nr. 1 (Stephan Marks) liegt als Mitschnitt auf Erwin
// Adelmanns eigenem Kanal (@ErwinAdelmann), ist inhaltlich aber dieselbe Podcast-Reihe.
// Stand: 2026-08-05.
export const HOTEL_MATZE_VIDEOS = [
  { url: 'https://youtu.be/FcCVwRaViRo', title: 'Scham-Experte, Warum wir uns schämen, und niemand darüber spricht, Stephan Marks' },
  { url: 'https://youtu.be/pOf5pIXUOuQ', title: 'Warum Burnout deine größte Kompetenz ist und wie du sie nutzt, Dr. Gunther Schmidt' },
  { url: 'https://youtu.be/of4WNxLg_6w', title: 'Hirnforscher erklärt, was mit uns los ist, Gerald Hüther' },
  { url: 'https://youtu.be/vD75g5_5Bq4', title: 'Wolf-Dieter Storl über Natur, Wahrnehmung und das Wissen, das wir verloren haben' },
  { url: 'https://youtu.be/1-aYAvWKruU', title: 'Jan Josef Liefers stellt sich selbst infrage' }
];
