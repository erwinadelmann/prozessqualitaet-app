// Feste, geräteübergreifend synchronisierte Liste für den Tab "Lama Ole Nydahl".
// Der Tab hieß bis 2026-08-07 "Buddhismus"; Dateiname, Export-Name und storageKey bleiben
// unverändert, damit bestehende Sprungpunkte und gespeicherte Zustände gültig bleiben.
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API).
//
// Stand: 2026-08-07. Die vier Mitschnitte der Reihe "Tiefsinnige Fragen" wurden auf
// Erwins Wunsch in die Sammlung "Buddhismus · Ayya Khema" verschoben, da sie inhaltlich
// dorthin gehören (siehe ayya-khema-videos.js). Die Sammlung führt seither ausschließlich
// Lama Ole Nydahl und wurde am selben Tag um zehn Videos erweitert, neun vom Kanal
// "Diamond Way Buddhism" (@BuddhismDiamondWay), das Portrait vom Kanal "108jigme".
// Die Original-Titel tragen durchgehend den Zusatz "- Lama Ole Nydahl", der hier entfällt,
// da die Sammlung ohnehin nur ihn enthält.
//
// Abgrenzung zu den benachbarten Sammlungen: "Buddha Oma" enthält ausschließlich
// Ursula Lyon, "Buddhismus · Ayya Khema" ausschließlich Ayya Khema.
export const BUDDHISMUS_VIDEOS = [
  { url: 'https://youtu.be/E898ohN7drI', title: 'Kraft der Gefühle' },
  { url: 'https://youtu.be/fpVKgMlCFQM', title: 'Meditation' },
  { url: 'https://youtu.be/Vi9IpO60cao', title: 'Funktion des Geistes' },
  { url: 'https://youtu.be/CsFDzM3Yx8A', title: 'Die höchste Sicht halten' },
  { url: 'https://youtu.be/DrTStMou5IM', title: 'Wie wirklich ist die Wirklichkeit?' },
  { url: 'https://youtu.be/7zzYC1vmQIE', title: 'Nützlich sein für andere' },
  { url: 'https://youtu.be/Ayj4pslkTdc', title: 'Glück in der Liebe' },
  { url: 'https://youtu.be/s9Y8S2zhiaw', title: 'Liebe und Partnerschaft' },
  { url: 'https://youtu.be/eVKNDpEPx9I', title: 'Sinnvolles Verhalten auf dem Weg zum Glück' },
  { url: 'https://youtu.be/E5M8SIdkdbg', title: 'Buddhism in the West, englischsprachig' },
  { url: 'https://youtu.be/cSGpEpvCRYM', title: 'Lama Ole Nydahl, ein Portrait' }
];
