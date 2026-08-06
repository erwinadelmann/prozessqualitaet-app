// Feste, geräteübergreifend synchronisierte Liste für den Tab "ACT".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel sollen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann). Stand: 2026-08-05.
// Reihenfolge bewusst gesetzt: zuerst die durchnummerierte ACT-Reihe (ACT 1 bis ACT 6,
// Nr. 2 und 3 lagen bisher nicht vor), danach Einzelvideos zu Grundlagen, Werten,
// Metaphern und Akuthilfe.
export const ACT_VIDEOS = [
  { url: 'https://youtu.be/0901Hv0UzsI', title: 'ACT 1, Freiheit inmitten belastender Gedanken' },
  { url: 'https://youtu.be/C0G6XsuwC_A', title: 'ACT 4, Kompass für Sinn, Inspiration und Motivation' },
  { url: 'https://youtu.be/_Jyz9kcaCtY', title: 'ACT 5, Probleme lösen, Ziele setzen, Aktionen planen' },
  { url: 'https://youtu.be/_DMSYvC2q9I', title: 'ACT 6, Perspektivwechsel zum Beobachterselbst' },
  { url: 'https://youtu.be/IgPhXfwjBVk', title: 'ACT, psychische Flexibilität in der modernen Verhaltenstherapie' },
  { url: 'https://youtu.be/41P-Yef58DA', title: 'ACT, Dein Diamantweg zu psychischer Gesundheit' },
  { url: 'https://youtu.be/lL5RgcHtXoQ', title: 'Akzeptanz- und Commitmenttherapie, Beltz Video Learning' },
  { url: 'https://youtu.be/bmUOp1Lz_pw', title: 'Akzeptanz statt Kampf, Wie ACT Dir hilft, Ängste und negative Gedanken zu lösen' },
  { url: 'https://youtu.be/eZgF-Jf4aj8', title: 'Ängste, Unsicherheiten und Depressionen mit der Akzeptanz- und Commitment-Therapie bewältigen' },
  { url: 'https://youtu.be/XB7jMaJEMAM', title: 'Vermeidungsleid, Warum es sich lohnt Vermeidungsverhalten zu überwinden, ACT Metapher, 2023' },
  { url: 'https://youtu.be/-v6O5JP0Yic', title: 'Radikale Akzeptanz, Schmerz annehmen, Leid vermeiden' },
  { url: 'https://youtu.be/F_d_oOVDJAA', title: 'Was sind Werte, ACT und die Wertearbeit' },
  { url: 'https://youtu.be/dACfiEdYk1g', title: 'ACT, Entscheidungshilfe für ein werteorientiertes Leben' },
  { url: 'https://youtu.be/2mUe6qI2R84', title: 'ACT, Wenn Dir etwas wirklich wichtig ist, dann bist Du bereit es eher anzunehmen' },
  { url: 'https://youtu.be/1vc9yQH2foE', title: 'ACT und die kognitive Defusion, was hat es auf sich' },
  { url: 'https://youtu.be/jbJINQnM6aY', title: 'Wie geht ACT mit Emotionen um, Die Emotions-Exposition' },
  { url: 'https://youtu.be/Ci4I6uMutRU', title: 'ACT, Ankern im Sturm, Akuthilfe in Krisenzeiten' }
];
