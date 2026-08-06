// Feste, geräteübergreifend synchronisierte Liste für den Tab "Schematherapie".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel sollen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann). Stand: 2026-08-05.
export const SCHEMATHERAPIE_VIDEOS = [
  { url: 'https://youtu.be/3xBJMQGY6xU', title: 'Schematherapie Kompakt Teil 1, Emotionale Grundbedürfnisse' },
  { url: 'https://youtu.be/e6Yq8zwOzUk', title: 'Schematherapie Kompakt Teil 2, Das Schemakonzept' },
  { url: 'https://youtu.be/syx5jSJJUPw', title: 'Schematherapie Kompakt Teil 3, Das Modusmodell' },
  { url: 'https://youtu.be/G4-p4La3HfA', title: 'Das Innere Team, Persönlichkeitsanteile im Gespräch' },
  // YouTube-Titel lautet nur "Infoabend GAS". Wofür GAS steht, ließ sich nicht belegen
  // (Recherche 2026-08-05 ergab keine passende österreichische Organisation dieses Namens).
  // Hier eingeordnet, weil es laut Erwin um Psychotherapie geht und die Vortragende auch
  // schematherapeutisch arbeitet. Titel bewusst sprechend gemacht statt der Abkürzung.
  { url: 'https://youtu.be/OipdiW7uTVc', title: 'Infoabend, Psychotherapie-Ausbildung (GAS)' }
];
