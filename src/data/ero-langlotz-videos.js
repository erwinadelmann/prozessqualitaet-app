// Feste, geräteübergreifend synchronisierte Liste für den Tab "Dr. Ero Langlotz".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API, Kanal @erolanglotz).
// Stand: 2026-07-26. Videos Nr. 6–10 (ergänzt 2026-08-05) stammen von Erwin Adelmanns
// eigenem Kanal (@ErwinAdelmann), nicht von @erolanglotz, gehören inhaltlich aber zu
// Langlotz: Autonomie-Training-Aufnahmen sowie die beiden Vorträge zur eigenen
// Lebensperspektive (Juni 2025), von Erwin ausdrücklich als Langlotz-Material bestätigt.
export const ERO_LANGLOTZ_VIDEOS = [
  { url: 'https://youtu.be/1Qd7SEfmW5g', title: 'Autonomie - Einführung' },
  { url: 'https://youtu.be/fq8hHcII2kM', title: 'Resilienztraining 13.9.25 Anton (11 Jahre): mein Lehrer schreit plötzlich, das macht mir Angst' },
  { url: 'https://youtu.be/kUtkIbK2-2s', title: 'Vollständige Anleitung Beziehungsklärung als "Do it Yourself" Online' },
  { url: 'https://www.youtube.com/watch?v=e9oSL8VvCkI', title: 'Selbst-Ermächtigung statt Selbst-Domestikation: zurück zum intrinsischen Energie-Programm' },
  { url: 'https://www.youtube.com/watch?v=D3-NqjtEeGc', title: 'SELBST-integrierende Trauma-Auflösung – Interview Silvana Schmitt mit Ero Langlotz, 14.9.24' },
  { url: 'https://youtu.be/a2G69mGx1nY', title: 'Autonomie Training Schule' },
  { url: 'https://youtu.be/1jONv6MmIrc', title: 'Autonomie Training für gelungene Partnerschaft' },
  { url: 'https://youtu.be/y-q3peB0g7Q', title: 'Glaubenssatz, Langlotz, Struktur, Aufstellung' },
  { url: 'https://youtu.be/YsIFES1v_vQ', title: 'Das Recht auf eine eigene Lebensperspektive, 15.6.25' },
  { url: 'https://youtu.be/apCOWgrYCkE', title: 'Normopathisch verwirrte Gesellschaft, Deviantes Verhalten und die eigene Lebensperspektive, 17.6.25' }
];
