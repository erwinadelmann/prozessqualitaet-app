// Feste, geräteübergreifend synchronisierte Liste für den Tab "Boundless Movement".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Stand dieser Liste:
// aus dem localStorage des Mac-Browsers übernommen, 2026-07-16 (2 Videos waren dort
// bereits gelöscht worden, die Reihenfolge war bereits umsortiert).
export const BOUNDLESS_MOVEMENT_VIDEOS = [
  { url: 'https://youtu.be/40IkZXmUUzg', title: 'Einfache 10 Minuten Morgenroutine' },
  { url: 'https://youtu.be/x23X8VWmnqY', title: '3 Bewegungen für jeden über 40' },
  { url: 'https://youtu.be/fSxEM5PRBtw', title: '16 Minuten Movement' },
  { url: 'https://youtu.be/UBIOq4Sv3Xg', title: '20 Minuten Movement' },
  { url: 'https://youtu.be/dKlYuOyIJOY', title: '30 Minuten Movement' },
  { url: 'https://youtu.be/M0xucDHRAFk', title: 'Drei Übungen die besser sind als Hanteltraining' },
  { url: 'https://youtu.be/czKbCi7lcGg', title: 'Inner Peace, eine Session für die Verbindung von Körper, Geist und Seele' }
];
