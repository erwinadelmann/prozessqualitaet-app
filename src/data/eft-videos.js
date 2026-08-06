// Feste, geräteübergreifend synchronisierte Liste für den Tab "EFT".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann). EFT hier = Emotionsfokussierte Therapie, nicht
// zu verwechseln mit Klopf-EFT (Emotional Freedom Techniques). Stand: 2026-08-05.
export const EFT_VIDEOS = [
  { url: 'https://youtu.be/Lu5meWI20-U', title: 'Primäre oder maladaptive Emotionen, Emotionsfokussierte Therapie EFT verstehen' },
  { url: 'https://youtu.be/bVOK2l2F9SU', title: 'EFT, moderne Verhaltenstherapie, Emotionsfokussierte Therapie EFT verstehen' },
  { url: 'https://youtu.be/H0_3t3OTNJ4', title: 'Heilung im zwischenmenschlichen Kontext, Emotionsfokussierte Therapie EFT verstehen' },
  // YouTube-Titel lautet nur "Infoabend GAS". Wofür GAS steht, ließ sich nicht belegen
  // (Recherche 2026-08-05 ergab keine passende österreichische Organisation dieses Namens).
  // Von Erwin ausdrücklich der EFT-Sammlung zugeordnet.
  { url: 'https://youtu.be/OipdiW7uTVc', title: 'Infoabend, Psychotherapie-Ausbildung (GAS)' }
];
