// Feste, geräteübergreifend synchronisierte Liste für den Tab "Buddhismus · Ayya Khema".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced").
//
// Quelle: YouTube-Playlist "Ayya Khema (Vorträge deutsch)" des Kanals "Buddhas Lehre"
// (list=PLnDHJJhxnunHEMmX7Bm4r_pOw-TjLKY4V), ausgelesen am 2026-08-07. Die Playlist
// weist 82 Einträge aus, öffentlich abrufbar waren 81; ein Eintrag ist vermutlich nicht
// mehr verfügbar oder nicht öffentlich. Reihenfolge entspricht der Playlist.
//
// Die Original-Videotitel tragen durchgehend den Zusatz "- Ayya Khema", der hier entfällt,
// da die Sammlung ohnehin nur Ayya Khema enthält. Bindestrich-Trenner innerhalb der Titel
// wurden zu Kommata normalisiert, wie in den übrigen Sammlungen dieser App. Inhaltlich
// wurde nichts verändert.
//
// Abgrenzung: Die Sammlung "Buddhismus" enthält die Reihe "Tiefsinnige Fragen" in
// Erwin Adelmanns eigenen Mitschnitten sowie Lama Ole Nydahl. Hier liegen die Aufnahmen
// des Kanals "Buddhas Lehre", teils mit inhaltlich gleichen Themen, aber anderen
// Video-Kennungen, also andere Aufnahmen derselben Reihe.
export const AYYA_KHEMA_VIDEOS = [
  { url: 'https://youtu.be/scdUcDWeMJE', title: 'Die drei guten und die drei bösen Wurzeln' },
  { url: 'https://youtu.be/_CEbZkQ_FV8', title: 'Karma und Gebefreudigkeit' },
  { url: 'https://youtu.be/bWafc-2oG3E', title: 'Vier Elemente, Kontemplation' },
  { url: 'https://youtu.be/AcbX5vD_px0', title: 'Achtsamkeit auf Körper und Gefühl, Wissensklarheit' },
  { url: 'https://youtu.be/zP3DHNDjysc', title: 'Ayya Khema, Leben und Lebenswerk, Prasadavati' },
  { url: 'https://youtu.be/9DIeP4uqbQ4', title: 'Die Vertiefungen in der Ruhemeditation' },
  { url: 'https://youtu.be/B6cP4JPq0RM', title: 'Die Notwendigkeit des spirituellen Weges' },
  { url: 'https://youtu.be/EbbGkdERfK8', title: 'Mystisches Erleben' },
  { url: 'https://youtu.be/bF7fXCYmueE', title: 'Die relative Ebene unseres Seins' },
  { url: 'https://youtu.be/uCIjY-sxgj4', title: 'Anders denken, anders sein' },
  { url: 'https://youtu.be/EMk_ptX3hUY', title: 'Bedingungen des Fortschritts' },
  { url: 'https://youtu.be/RTgMo9y8vzQ', title: 'Achtsamkeit auf Stimmung und Gedankeninhalt' },
  { url: 'https://youtu.be/gpeToshrJFo', title: 'Acht Helfer im Alltag' },
  { url: 'https://youtu.be/fdceSb32eTQ', title: 'Ohne (m)ich ist das Leben ganz einfach' },
  { url: 'https://youtu.be/VgoNqt0gxTE', title: 'Komm und sieh selbst' },
  { url: 'https://youtu.be/kPgx368N6tE', title: 'Praxis im Alltag' },
  { url: 'https://youtu.be/a5Kq7kqn-Gc', title: 'Sei dir selbst eine Insel' },
  { url: 'https://youtu.be/eFICwh5TVvs', title: 'Meditation versus Methode' },
  { url: 'https://youtu.be/VwTpmqv92UI', title: 'Anicca, Vergänglichkeit' },
  { url: 'https://youtu.be/dZYa7Kqgers', title: 'Einführung in die Meditation' },
  { url: 'https://youtu.be/YS9vqsVyrNw', title: 'Zur „Stück-für-Stück"-Methode, Teil 1 von 3' },
  { url: 'https://youtu.be/of_AiKFmBGA', title: 'Meditationsmethode „Stück für Stück", Teil 2 von 3' },
  { url: 'https://youtu.be/lel_4_v8p40', title: 'Einsichten aus der „Stück-für-Stück"-Methode, Teil 3 von 3' },
  { url: 'https://youtu.be/5-9_Qu2aiXM', title: 'Dukkha, der Lehrmeister' },
  { url: 'https://youtu.be/8ygA9rvEKKw', title: 'Spiritueller Alltag' },
  { url: 'https://youtu.be/Bv6B16VzJoc', title: 'Karma, Tod und Wiedergeburt' },
  { url: 'https://youtu.be/CtyKw9bXLIo', title: 'Tiefsinnige Fragen 1, Bewusstsein regiert die Welt 1' },
  { url: 'https://youtu.be/FD3BNfaNCNI', title: 'Tiefsinnige Fragen 2, Bewusstsein regiert die Welt 2' },
  { url: 'https://youtu.be/AEEi_1iFPTM', title: 'Tiefsinnige Fragen 3, Der edle achtfache Pfad 1' },
  { url: 'https://youtu.be/hCQQAoTIFts', title: 'Tiefsinnige Fragen 4, Der edle achtfache Pfad 2' },
  { url: 'https://youtu.be/27b6dawj9Y0', title: 'Tiefsinnige Fragen 6, Rechte Anstrengung' },
  { url: 'https://youtu.be/ojWZr93RCHY', title: 'Tiefsinnige Fragen 7, Wissensklarheit' },
  { url: 'https://youtu.be/kvOSKbc5TZ4', title: 'Tiefsinnige Fragen 8, Rechte Konzentration' },
  { url: 'https://youtu.be/xsOIJS4aZs0', title: 'Tiefsinnige Fragen 9, Rechte Sammlung' },
  { url: 'https://youtu.be/y5pqBgPVaeo', title: 'Tiefsinnige Fragen 10, Rechte Erkenntnis, rechte Gesinnung' },
  { url: 'https://youtu.be/YQQeIyFnH6Y', title: 'Ruhe und Einsicht' },
  { url: 'https://youtu.be/uDvhT8yF82c', title: 'Dukkha, das zweite Daseinsmerkmal' },
  { url: 'https://youtu.be/Oq9kd4m6kTU', title: 'Die Läuterung der Emotionen' },
  { url: 'https://youtu.be/d3P3ta64ODI', title: 'Kontemplation als inneres Spüren' },
  { url: 'https://youtu.be/i_Kd2mT0H-8', title: 'Kontemplation über Liebende Güte, Erklärung und Übung' },
  { url: 'https://youtu.be/9-r8nyfRw1k', title: 'Anweisungen zur Praxis, Sinn der Kontemplation' },
  { url: 'https://youtu.be/l8Am8WK_2vA', title: 'Kontemplation, „Denken"' },
  { url: 'https://youtu.be/vP7ZsZWv5Bs', title: 'Ayya Khema 01, Achtsamkeit' },
  { url: 'https://youtu.be/9C4ZN0sG-yA', title: 'Ayya Khema 02, Die vier rechten Anstrengungen' },
  { url: 'https://youtu.be/FhrRLBcTkPA', title: 'Ayya Khema 03, Die vier „Machtgefährten"' },
  { url: 'https://youtu.be/uMPkcacV69Q', title: 'Ayya Khema 04, Die fünf geistigen Fähigkeiten 1, Achtsamkeit, Weisheit, Vertrauen' },
  { url: 'https://youtu.be/CTmTXgZdAgs', title: 'Ayya Khema 05, Die fünf geistigen Fähigkeiten 2, Willenskraft, Konzentration' },
  { url: 'https://youtu.be/aO619_3T3Qc', title: 'Ayya Khema 06, Ergründung der drei Daseinsmerkmale 1, Vergänglichkeit' },
  { url: 'https://youtu.be/-8u1E0jTEc0', title: 'Ayya Khema 07, Ergründung der drei Daseinsmerkmale 2, Dukkha, das Problem' },
  { url: 'https://youtu.be/mx_q0Hgp3ls', title: 'Ayya Khema 08, Ergründung der drei Daseinsmerkmale 3, Substanzlosigkeit' },
  { url: 'https://youtu.be/CvNpVhqTooc', title: 'Ayya Khema 09, Die erste meditative Versenkung' },
  { url: 'https://youtu.be/ZzSAAnJfnj4', title: 'Ayya Khema 10, Die zweite meditative Versenkung, drei Arten von Freude' },
  { url: 'https://youtu.be/eCJ6PGFhZnw', title: 'Ayya Khema 11, Der edle achtfache Pfad 1, Rechte Ansicht, rechte Absicht' },
  { url: 'https://youtu.be/byFO4lopn8A', title: 'Ayya Khema 12, Der edle achtfache Pfad 2, Tugend' },
  { url: 'https://youtu.be/vR3huRcMHTE', title: 'Ayya Khema 13, Der edle achtfache Pfad 3, Rechte Anstrengung, rechte Achtsamkeit, rechte Konzentration' },
  { url: 'https://youtu.be/94cSppCRuls', title: 'Ayya Khema 14, Der edle achtfache Pfad 4, Rechte Konzentration' },
  { url: 'https://youtu.be/_LlHMbZwvOI', title: 'Vom Spreeufer zum Nirwana, Berliner Lektionen' },
  { url: 'https://youtu.be/cBy9oSbNRSw', title: 'Kontemplation, fünf tägliche Betrachtungen' },
  { url: 'https://youtu.be/G1pn2oKVwT4', title: 'Das Geheimnis von Leben und Tod, 1. Vortrag' },
  { url: 'https://youtu.be/hIwj2KQAi_U', title: 'Das Geheimnis von Leben und Tod, 2. Kontemplation' },
  { url: 'https://youtu.be/n-yLKsXT6J8', title: 'Die acht Weltgesetze' },
  { url: 'https://youtu.be/6dQ6xxTFKWE', title: 'Metta-Meditation, „Goldene Regentropfen"' },
  { url: 'https://youtu.be/PYA1gcZZvAY', title: 'Innerer Frieden im Alltag und Meditation „Lotusblüte"' },
  { url: 'https://youtu.be/EKqvOmBEmnE', title: 'Einsicht durch Achtsamkeit nach innen und außen' },
  { url: 'https://youtu.be/0gN_Y4ct9i4', title: 'Vier Wege des Verhaltens, Geduld, Ungeduld, Bezähmung, Stillung' },
  { url: 'https://youtu.be/7Xu2v7qtL0I', title: 'Stille-Meditation, „Kerze im Herzen"' },
  { url: 'https://youtu.be/cTT5ooGo9PM', title: 'Die Lehrrede von der Elefantenspur' },
  { url: 'https://youtu.be/MxibZ6lpxAE', title: 'Getanes und Ungetanes' },
  { url: 'https://youtu.be/6Z4CJjV6fhs', title: 'Meditation, „Unser höchstes Glück verschenken"' },
  { url: 'https://youtu.be/DIz0g4303aw', title: 'Sinnestrieb, Daseinstrieb, Unwissenheitstrieb' },
  { url: 'https://youtu.be/jICAGR8reN4', title: 'Das Buch des eigenen Lebens lesen, Behütet führt der Geist zum Glück, 1997' },
  { url: 'https://youtu.be/G_MI4IrDVPM', title: 'Die Lehrrede von der Elefantenspur, zweite Aufnahme' },
  { url: 'https://youtu.be/T8LfVh1HWIM', title: 'Getanes und Ungetanes, zweite Aufnahme' },
  { url: 'https://youtu.be/Sh4v0VVhyCY', title: 'Einsicht durch Achtsamkeit nach innen und außen, zweite Aufnahme' },
  { url: 'https://youtu.be/0gDqh_CsccE', title: 'Innerer Frieden im Alltag, zweite Aufnahme' },
  { url: 'https://youtu.be/jrk6PDL6Ua0', title: '„Mitgefühl", geleitete Metta-Meditation' },
  { url: 'https://youtu.be/ZuACzas_0dQ', title: 'Bedingungen des Fortschritts, zweite Aufnahme' },
  { url: 'https://youtu.be/bj_5s3eebSs', title: 'Die erste Vertiefung in der Meditation' },
  { url: 'https://youtu.be/RjVAL_XTbXc', title: 'Tiefsinnige Fragen 5, Rechte Rede, rechter Lebenserwerb' },
  { url: 'https://youtu.be/c5aCLSmiaJA', title: 'Karma für Leben und Tod' },
  { url: 'https://youtu.be/cX1JCKCOIRg', title: 'Gönne dich dir selbst, Teil 1' }
];
