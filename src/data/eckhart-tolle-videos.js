// Feste, geräteübergreifend synchronisierte Liste für den Tab "Eckhart Tolle".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API), hier von Erwin ins Deutsche
// übertragen. Kanal ist Erwin Adelmanns eigener YouTube-Kanal (@ErwinAdelmann).
// Stand: 2026-08-05.
export const ECKHART_TOLLE_VIDEOS = [
  { url: 'https://youtu.be/YkPTspJjJRg', title: 'Das Paradoxon der bewussten Manifestation, Eckhart Tolle' }
];
