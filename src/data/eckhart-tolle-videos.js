// Feste, geräteübergreifend synchronisierte Liste für den Tab "Eckhart Tolle".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel stammen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API), hier ins Deutsche übertragen,
// da die Originaltitel durchgehend englisch sind. Die ersten drei Videos liegen als
// Mitschnitte auf Erwin Adelmanns eigenem Kanal (@ErwinAdelmann), die übrigen stammen vom
// offiziellen Kanal @EckhartTolle. Das zuletzt ergänzte Gespräch zu "A New Earth"
// stammt vom Kanal @Oprah (Oprah's Book Club), inhaltlich eindeutig Eckhart Tolle,
// am 2026-08-07 von Erwin ausdrücklich für diese Sammlung bestätigt.
// Stand: 2026-08-07.
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
  { url: 'https://youtu.be/-GxAHdzsJYQ', title: 'Erwachen jenseits der Zeit, vollständiger Vortrag' },
  { url: 'https://youtu.be/OmYUG7oLdc0', title: 'Spirituelles Erwachen und Transzendenz, Eckhart Tolle in Boston' },
  { url: 'https://youtu.be/Dbz8BD7-L6s', title: 'Den Verstand transzendieren, Eckhart Tolle in Sydney' },
  { url: 'https://youtu.be/NFWz4iKLrG4', title: 'Von Vancouver in die Welt, Eckhart Tolles Weg ins Jetzt' },
  { url: 'https://youtu.be/CpYT__ZRuuY', title: 'Den Zauber des gegenwärtigen Augenblicks annehmen' },
  { url: 'https://youtu.be/iQjtlcQsLJQ', title: 'Der Weg zur Erleuchtung, das Ego transzendieren' },
  { url: 'https://youtu.be/oA1-w4bi9KM', title: 'Die Illusion der Zeit und die Kraft der Gegenwart' },
  { url: 'https://youtu.be/vc7r97ukwUM', title: 'Die verlorene Kunst, Wirklichkeit zu spüren' },
  { url: 'https://youtu.be/OfvovzMMxLI', title: 'Die kraftvollste spirituelle Praxis für den Alltag' },
  { url: 'https://youtu.be/Jz80vrlaXjM', title: 'In Resonanz mit der Frequenz des Erwachens' },
  { url: 'https://youtu.be/Zb0JUqiG_NM', title: 'Präsenz ist ansteckend' },
  { url: 'https://youtu.be/THscy3-FmaI', title: 'Herausforderungen als spirituelle Praxis annehmen' },
  { url: 'https://youtu.be/o7RaG8B57KM', title: 'Aus dem Strom der Gedanken heraustreten' },
  { url: 'https://youtu.be/ugskIyEHKWU', title: 'Wie Sie mentalen Erzählungen und Leiden entkommen' },
  { url: 'https://youtu.be/s0RREXgw48c', title: 'Von der Angst zum Gewahrsein, der Weg zur inneren Stille' },
  { url: 'https://youtu.be/QOo_TWXENKY', title: 'Den Verstand missbrauchen' },
  { url: 'https://youtu.be/v9FJq2u2V9g', title: 'Für das Ego ist Drama gut' },
  { url: 'https://youtu.be/UHpyLZXN8Y8', title: 'Die Last loslassen' },
  { url: 'https://youtu.be/RFZ2kdCD1jw', title: 'Warum menschliches Bewusstsein nichts mit künstlicher Intelligenz zu tun hat' },
  { url: 'https://youtu.be/EFyMXM398YI', title: 'Eckhart Tolle, „Eine neue Erde", Oprahs Buchclub' }
];
