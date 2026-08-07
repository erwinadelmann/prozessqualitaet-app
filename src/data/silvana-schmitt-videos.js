// Feste, geräteübergreifend synchronisierte Liste für den Tab "Silvana Schmitt".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln, Quelle ist der Kanal @SilvanaSchmitt, ausgelesen am
// 2026-08-07.
//
// Der Kanal führt die Podcast-Reihe "Trauma trifft Bühne" (14 Folgen, Playlist
// PLj6sITF5oZb_Ji5PHwE6IQvzACJXiqL-R) sowie einzelne Videos. Die Folgen sind hier
// aufsteigend nach Foldennummer sortiert, nicht wie auf YouTube absteigend, damit die
// Reihe von vorne gehört werden kann. Die Original-Titel stehen durchgehend in
// Großbuchstaben und tragen den Reihennamen im Titel; beides ist hier auf die in dieser
// App übliche Schreibweise gebracht, inhaltlich unverändert.
//
// Das Video "Trauma trifft Bühne, Sicherheit" (Y_fXXoEpXqc) lag bis 2026-08-07 in
// coaching-grundlagen-videos.js, ausdrücklich mit dem dortigen Vermerk, es auszulagern,
// sobald weitere Folgen dazukommen. Genau das ist jetzt der Fall. Es ist eine andere
// Aufnahme als Folge 002 und steht deshalb zusätzlich am Ende.
export const SILVANA_SCHMITT_VIDEOS = [
  { url: 'https://youtu.be/QhzU9KpuULY', title: 'Trauma trifft Bühne 001, Die Blockadenlöserin' },
  { url: 'https://youtu.be/pmn2fdOA8Fc', title: 'Trauma trifft Bühne 002, Sicherheit' },
  { url: 'https://youtu.be/kzSKp-bOC8A', title: 'Trauma trifft Bühne 003, Körper' },
  { url: 'https://youtu.be/iwrEb0dSeEc', title: 'Trauma trifft Bühne 004, Präsenz' },
  { url: 'https://youtu.be/a7ObWUyrmpk', title: 'Trauma trifft Bühne 005, Bühne' },
  { url: 'https://youtu.be/GxTZhaVpvCg', title: 'Trauma trifft Bühne 006, Stimme' },
  { url: 'https://youtu.be/rxSM9nBn4vI', title: 'Trauma trifft Bühne 007, Schutz' },
  { url: 'https://youtu.be/EFV0rsB9TJM', title: 'Trauma trifft Bühne 008, Regulation' },
  { url: 'https://youtu.be/72lKRYn-lbc', title: 'Trauma trifft Bühne 009, Ausdruck' },
  { url: 'https://youtu.be/rwliTFPLn9k', title: 'Trauma trifft Bühne 010, Warum du immer wieder zurückfällst' },
  { url: 'https://youtu.be/H25KsVvQPSQ', title: 'Trauma trifft Bühne 011, Warum du nicht losgehst' },
  { url: 'https://youtu.be/TyUilnjTQgQ', title: 'Trauma trifft Bühne 012, Warum du dich kleiner machst' },
  { url: 'https://youtu.be/tHZ4BABSs2I', title: 'Trauma trifft Bühne 013, Warum du dich ständig anpasst' },
  { url: 'https://youtu.be/Rh8nODbuWKo', title: 'Trauma trifft Bühne 014, Warum Erfolg dich nicht frei macht' },
  { url: 'https://youtu.be/2kVz7E38qio', title: 'Was Autonomie wirklich ist' },
  { url: 'https://youtu.be/Y_fXXoEpXqc', title: 'Trauma trifft Bühne, Sicherheit, eigener Mitschnitt' }
];
