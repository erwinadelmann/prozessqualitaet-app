// Feste, geräteübergreifend synchronisierte Liste für den Tab "Lebensweisheiten".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann).
//
// Sammelkategorie für Reflexionen ohne klar zuordenbare Methode: Lebensweisheit, Haltung,
// Werte, Lebensperspektive. Die beiden englischsprachigen Manifestations-Videos (Eckhart
// Tolle, "vibrationally") liegen bewusst hier mit drin statt in einer eigenen Sammlung,
// um die Zahl der Kategoriefarben nicht weiter aufzublähen. Bei Bedarf jederzeit in eine
// eigene Sammlung "Manifestation" auslagerbar. Stand: 2026-08-05.
export const LEBENSWEISHEITEN_VIDEOS = [
  { url: 'https://youtu.be/8R5LnfAhhtI', title: 'Lebensweisheiten einer 97-Jährigen, Gesundheit, Liebe, der Weg zum inneren Frieden' },
  { url: 'https://youtu.be/py3SIQNt1WQ', title: 'Die wichtigste Erkenntnis im Leben, Du kannst niemanden ändern' },
  { url: 'https://youtu.be/yYFu-XtL_XQ', title: 'Gefangen durch Regeln, so machen Dich Werte unfrei' },
  { url: 'https://youtu.be/GRmlwH7KgDQ', title: 'Innere Haltung' },
  { url: 'https://youtu.be/AvAigzGWOQ0', title: 'Befreiung der männlichen Energie, um den Fokus zu halten und Vorhaben tatsächlich umzusetzen' },
  { url: 'https://youtu.be/kuOcqKJO5zw', title: 'You have to become vibrationally what you want to have' },
  { url: 'https://youtu.be/47LqriSB1iY', title: 'Warum du dich nicht zeigst, obwohl du mutig bist' },
  { url: 'https://youtu.be/gLyfjyad-K4', title: 'Verletztes Selbstwertgefühl, Ursachen und Auswirkungen' },
  { url: 'https://youtu.be/0ztYMP-YmHg', title: 'Die Sache mit den guten Vorsätzen' },
  { url: 'https://youtu.be/_NRqX_rXYsk', title: 'Die 10 wichtigsten Regeln fürs Leben, aus 5 Jahren Psychologiestudium' }
];
