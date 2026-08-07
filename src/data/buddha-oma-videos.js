// Feste, geräteübergreifend synchronisierte Liste für den Tab "Buddha Oma" (Ursula Lyon).
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Stand dieser Liste:
// aus dem localStorage des Mac-Browsers übernommen, 2026-07-16 (2 Videos waren dort
// bereits gelöscht worden, die Reihenfolge war bereits umsortiert).
//
// Ergänzt am 2026-08-07: die drei Videos des offiziellen Kanals
// @ursulalyondiebuddhaoma413. Mehr enthält der Videos-Tab dieses Kanals nicht, Playlists
// gibt es dort keine. Die zwölf älteren Einträge oben stammen also von anderen Kanälen.
// "Vier Pfeiler für ein glücklich erfülltes Leben" trägt fast denselben Titel wie
// "4 Pfeiler für ein glückliches Leben" weiter oben, ist aber eine andere Video-Kennung,
// also eine andere Aufnahme.
export const BUDDHA_OMA_VIDEOS = [
  { url: 'https://youtu.be/_PbrrJYRUGw', title: 'Zu seinen Extremitäten finden, Die Buddha Oma zeigt vor' },
  { url: 'https://youtu.be/OT7erhClOkg', title: 'Wie geht verzeihen, Die Buddha Oma Ursula Lyon erklärt' },
  { url: 'https://youtu.be/jYcpUhUla3Y', title: 'Angst vor Entscheidungen, Buddha Oma Ursula Lyon beleuchtet das Thema' },
  { url: 'https://youtu.be/Vi9R1d22eAY', title: 'Die 5 guten Kräfte' },
  { url: 'https://youtu.be/JpDA4PYL6Ac?si=TqMoH-J9-let_OaU', title: 'Die fünf Hemmungen' },
  { url: 'https://youtu.be/QJO0WCSZRd8', title: 'Die 4 edlen Wahrheiten' },
  { url: 'https://youtu.be/AO-hcceKU-Y', title: 'Die Chi Atmung' },
  { url: 'https://youtu.be/W6SqoTk5MIM', title: 'Drei Minuten Meditation' },
  { url: 'https://youtu.be/tI9uaTzkt9I', title: 'Angst vor Entscheidungen' },
  { url: 'https://youtu.be/RdXS8G71Jig', title: 'Metta Meditation' },
  { url: 'https://youtu.be/POOS1ZPUKX4', title: 'Schutzglocke' },
  { url: 'https://youtu.be/lxkyNJmqxSE', title: '4 Pfeiler für ein glückliches Leben' },
  { url: 'https://youtu.be/djE2Ji2at9Q', title: 'Vier Pfeiler für ein glücklich erfülltes Leben' },
  { url: 'https://youtu.be/zd6mOERwxvY', title: 'Bewusst und glücklich altern' },
  { url: 'https://youtu.be/I1K5uyP9ayY', title: 'Danke an meine Lieben, Ursula Lyon bedankt sich' }
];
