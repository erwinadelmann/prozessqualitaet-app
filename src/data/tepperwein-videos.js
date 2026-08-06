// Feste, geräteübergreifend synchronisierte Liste für den Tab "Tepperwein".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann), Inhalt sind Mitschnitte des Tepperwein-
// Lebensseminars (Kurt Tepperwein). Stand: 2026-08-05.
export const TEPPERWEIN_VIDEOS = [
  { url: 'https://youtu.be/7h1GTYYkby4', title: 'Das Tepperwein Lebensseminar, Wenn Wünsche in Erfüllung gehen' },
  { url: 'https://youtu.be/1J-PvKZj7A8', title: 'Das Tepperwein Lebensseminar, Das Leben als Sprungbrett zum Erwachen' },
  { url: 'https://youtu.be/RUUwnn-BreY', title: 'Das Tepperwein Lebensseminar, Sich einfach neu erfinden' }
];
