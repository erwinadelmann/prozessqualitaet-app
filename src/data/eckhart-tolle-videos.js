// Feste, geräteübergreifend synchronisierte Liste für den Tab "Eckhart Tolle".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API), hier ins Deutsche übertragen,
// da die Originaltitel durchgehend englisch sind. Die ersten drei Videos liegen als
// Mitschnitte auf Erwin Adelmanns eigenem Kanal (@ErwinAdelmann), die übrigen stammen vom
// offiziellen Kanal @EckhartTolle. Stand: 2026-08-05.
export const ECKHART_TOLLE_VIDEOS = [
  { url: 'https://youtu.be/YkPTspJjJRg', title: 'Das Paradoxon der bewussten Manifestation' },
  { url: 'https://youtu.be/FsqOGv8HOkg', title: 'Wie man mit negativen Emotionen umgeht' },
  { url: 'https://youtu.be/rc7SsNmBeR0', title: 'Stress und Angst beenden, Frieden, Präsenz und innere Freiheit, Teil 3' },
  { url: 'https://youtu.be/FRa7QH6L68I', title: 'Präsenz zur zweiten Natur machen' },
  { url: 'https://youtu.be/XQFrYuk0tIo', title: 'Den erwachten Zustand wählen' },
  { url: 'https://youtu.be/qqYXVkjAMcs', title: 'Der Wandel von Angst zum Erwachen' },
  { url: 'https://youtu.be/Hsb-eDfDr0Q', title: 'Leiden als Türöffner nutzen' },
  { url: 'https://youtu.be/twaftJiGin0', title: 'Herausforderung und das Wachsen der Präsenz, vollständiger Vortrag' },
  { url: 'https://youtu.be/HYNXxRxRMOQ', title: 'Die Einheit von Denken, Tun und Sein, vollständiger Vortrag' },
  { url: 'https://youtu.be/t2jVRLyEoj4', title: 'Ruhen in der heiligen Intelligenz aller Wirklichkeit, vollständiger Vortrag' },
  { url: 'https://youtu.be/wY8o6di9Lto', title: 'Spirituelles Erwachen, das göttliche Selbst im Inneren finden' },
  { url: 'https://youtu.be/KGvAHUA1D0k', title: 'Den Weg genießen, während man seine Ziele verfolgt' },
  { url: 'https://youtu.be/_ODCdQKXIXs', title: 'Warum der menschliche Geist immer sonderbarer zu werden scheint' },
  { url: 'https://youtu.be/VrsIL6pVu6M', title: 'Die „mentale Pandemie" durch erwachtes Bewusstsein überwinden' },
  { url: 'https://youtu.be/qPRqp5WYMZk', title: 'Vom Selbstbild zur Selbstverwirklichung' },
  { url: 'https://youtu.be/yJSJA8PFRNI', title: 'Wie Sie Ihre Herausforderungen zum Erwachen nutzen, vollständiger Vortrag' },
  { url: 'https://youtu.be/-GxAHdzsJYQ', title: 'Erwachen jenseits der Zeit, vollständiger Vortrag' }
];
