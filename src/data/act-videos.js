// Feste, geräteübergreifend synchronisierte Liste für den Tab "ACT".
// Titel und Reihenfolge sind absichtlich fest im Code hinterlegt statt in localStorage,
// damit sie auf jedem Gerät identisch sind und stabil bleiben, bis diese Datei geändert
// und neu deployt wird (siehe VideoListTab.jsx, Prop "synced"). Titel sollen aus den
// echten YouTube-Video-Titeln (Quelle: YouTube-oEmbed-API). Kanal ist Erwin Adelmanns
// eigener YouTube-Kanal (@ErwinAdelmann). Stand: 2026-08-05.
export const ACT_VIDEOS = [
  { url: 'https://youtu.be/bmUOp1Lz_pw', title: 'Akzeptanz statt Kampf, Wie ACT Dir hilft, Ängste und negative Gedanken zu lösen' },
  { url: 'https://youtu.be/XB7jMaJEMAM', title: 'Vermeidungsleid, Warum es sich lohnt Vermeidungsverhalten zu überwinden, ACT Metapher, 2023' },
  { url: 'https://youtu.be/_Jyz9kcaCtY', title: 'ACT 5, Probleme lösen, Ziele setzen, Aktionen planen' },
  { url: 'https://youtu.be/-v6O5JP0Yic', title: 'Radikale Akzeptanz, Schmerz annehmen, Leid vermeiden' },
  { url: 'https://youtu.be/F_d_oOVDJAA', title: 'Was sind Werte, ACT und die Wertearbeit' },
  { url: 'https://youtu.be/2mUe6qI2R84', title: 'ACT, Wenn Dir etwas wirklich wichtig ist, dann bist Du bereit es eher anzunehmen' },
  { url: 'https://youtu.be/1vc9yQH2foE', title: 'ACT und die kognitive Defusion, was hat es auf sich' },
  { url: 'https://youtu.be/IgPhXfwjBVk', title: 'ACT, psychische Flexibilität in der modernen Verhaltenstherapie' },
  { url: 'https://youtu.be/jbJINQnM6aY', title: 'Wie geht ACT mit Emotionen um, Die Emotions-Exposition' }
];
