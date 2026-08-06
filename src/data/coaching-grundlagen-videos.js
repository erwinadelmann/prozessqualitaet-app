// Feste, geräteübergreifend synchronisierte Liste für den Tab "Coaching-Grundlagen".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann).
//
// Sammelt methodenübergreifende Grundlagen der Coaching-Arbeit: Rollenklärung, Modelle
// und lösungsorientierte Haltung, unabhängig von einer einzelnen Methode wie NLP, ACT
// oder Schematherapie. Das Video "Trauma trifft Bühne, Sicherheit" ist erkennbar Auftakt
// einer eigenen Reihe (Trauma und Bühnenpräsenz); es liegt vorerst hier, weil eine eigene
// Sammlung für ein einzelnes Video verfrüht wäre. Sobald weitere Folgen dazukommen, sollte
// es in eine eigene Sammlung ausgelagert werden. Stand: 2026-08-05.
export const COACHING_GRUNDLAGEN_VIDEOS = [
  { url: 'https://youtu.be/inp_AEYQelU', title: 'Coaching versus Beratung' },
  { url: 'https://youtu.be/94Y7N4IHkXs', title: 'Vom Problem zum Lösungsansatz, Prof. Dr. Ulrich Clement, Kurstrailer, lifelessons.de' },
  { url: 'https://youtu.be/Dio8YyMlbN8', title: 'Das OK-OK-Modell' },
  { url: 'https://youtu.be/x6MdEVi_LxU', title: 'Das Seitenmodell' },
  { url: 'https://youtu.be/Y_fXXoEpXqc', title: 'Trauma trifft Bühne, Sicherheit' }
];
