// Feste, geräteübergreifend synchronisierte Liste für den Tab "Eckhart Tolle, Member".
// Titel und Reihenfolge sind fest im Code hinterlegt statt in localStorage (siehe
// VideoListTab.jsx, Prop "synced").
//
// WICHTIG, Befund vom 2026-08-07: Diese Videos liefern über die öffentliche
// YouTube-oEmbed-Schnittstelle KEINE Daten, während parallel abgerufene Videos desselben
// Kanals (@EckhartTolle) sofort antworten. Ein Rate-Limit ist damit ausgeschlossen, der
// Unterschied liegt an den Videos selbst: Sie sind ohne Anmeldung nicht abrufbar. Die
// wahrscheinlichste Erklärung ist der Mitgliederbereich des Kanals; ebenfalls möglich, aber
// weniger wahrscheinlich, sind private, gelöschte oder regional gesperrte Videos. Das ist
// eine begründete Interpretation, kein von YouTube bestätigter Status.
//
// FOLGE FÜR DIE APP: Es ist zu erwarten, dass sich diese Videos in der Videothek NICHT
// abspielen lassen, weil YouTube das Einbetten nicht-öffentlicher Inhalte unterbindet. Die
// Sammlung dient daher vorerst als gekennzeichnete Merkliste, nicht als Abspielliste.
//
// TITEL: bewusst leer gelassen und stattdessen die Video-ID als Platzhalter gesetzt, weil
// die echten Titel nicht abrufbar waren. Erfundene Titel wären hier ein Fehler. Sobald
// Erwin die echten Titel liefert (z. B. aus seiner angemeldeten YouTube-Ansicht), können
// sie hier eingetragen werden.
export const ECKHART_TOLLE_MEMBER_VIDEOS = [
  { url: 'https://youtu.be/obvueW8p6N4', title: 'Member-Video, Titel noch offen (obvueW8p6N4)' },
  { url: 'https://youtu.be/pSAt7LFBthk', title: 'Member-Video, Titel noch offen (pSAt7LFBthk)' },
  { url: 'https://youtu.be/sSeRhCX0mjM', title: 'Member-Video, Titel noch offen (sSeRhCX0mjM)' },
  { url: 'https://youtu.be/j1KfD3-SsQs', title: 'Member-Video, Titel noch offen (j1KfD3-SsQs)' },
  { url: 'https://youtu.be/sxiMAP2u3Go', title: 'Member-Video, Titel noch offen (sxiMAP2u3Go)' },
  { url: 'https://youtu.be/-nQtWlOkumQ', title: 'Member-Video, Titel noch offen (-nQtWlOkumQ)' },
  { url: 'https://youtu.be/87qWSiuhhd0', title: 'Member-Video, Titel noch offen (87qWSiuhhd0)' },
  { url: 'https://youtu.be/6iDGpjTJZks', title: 'Member-Video, Titel noch offen (6iDGpjTJZks)' },
  { url: 'https://youtu.be/kvuxpSC3aCI', title: 'Member-Video, Titel noch offen (kvuxpSC3aCI)' },
  { url: 'https://youtu.be/19RwKN_X2-Q', title: 'Member-Video, Titel noch offen (19RwKN_X2-Q)' },
  { url: 'https://youtu.be/wVEMXv1IBlk', title: 'Member-Video, Titel noch offen (wVEMXv1IBlk)' },
  { url: 'https://youtu.be/-pt3bzPAq-g', title: 'Member-Video, Titel noch offen (-pt3bzPAq-g)' },
  { url: 'https://youtu.be/Uy8p4Xc8dYE', title: 'Member-Video, Titel noch offen (Uy8p4Xc8dYE)' },
  { url: 'https://youtu.be/Th3D6r2WZIE', title: 'Member-Video, Titel noch offen (Th3D6r2WZIE)' },
  { url: 'https://youtu.be/idefb4JClbg', title: 'Member-Video, Titel noch offen (idefb4JClbg)' },
  { url: 'https://youtu.be/_P13xPk6qrE', title: 'Member-Video, Titel noch offen (_P13xPk6qrE)' },
  { url: 'https://youtu.be/PGDLuOPnvhk', title: 'Member-Video, Titel noch offen (PGDLuOPnvhk)' },
  { url: 'https://youtu.be/6HBs8qWUip0', title: 'Member-Video, Titel noch offen (6HBs8qWUip0)' },
  { url: 'https://youtu.be/3kZs0x5u_Ig', title: 'Member-Video, Titel noch offen (3kZs0x5u_Ig)' },
  { url: 'https://youtu.be/ZPlqDt_lMgk', title: 'Member-Video, Titel noch offen (ZPlqDt_lMgk)' },
  { url: 'https://youtu.be/ZV4VoV3GWxI', title: 'Member-Video, Titel noch offen (ZV4VoV3GWxI)' },
  { url: 'https://youtu.be/-d6BWI4kM3w', title: 'Member-Video, Titel noch offen (-d6BWI4kM3w)' },
  { url: 'https://youtu.be/_C-b9257KBo', title: 'Member-Video, Titel noch offen (_C-b9257KBo)' },
  { url: 'https://youtu.be/RNO5EEJG9MQ', title: 'Member-Video, Titel noch offen (RNO5EEJG9MQ)' },
  { url: 'https://youtu.be/lbsqgTXm424', title: 'Member-Video, Titel noch offen (lbsqgTXm424)' },
  { url: 'https://youtu.be/aCqla4thlvY', title: 'Member-Video, Titel noch offen (aCqla4thlvY)' },
  { url: 'https://youtu.be/aEjaTzS2uZI', title: 'Member-Video, Titel noch offen (aEjaTzS2uZI)' },
  { url: 'https://youtu.be/Sn9GQDhpet0', title: 'Member-Video, Titel noch offen (Sn9GQDhpet0)' },
  { url: 'https://youtu.be/1aB1aBjJgPI', title: 'Member-Video, Titel noch offen (1aB1aBjJgPI)' },
  { url: 'https://youtu.be/arTpp4vkluM', title: 'Member-Video, Titel noch offen (arTpp4vkluM)' },
  { url: 'https://youtu.be/9iQulmU2QD0', title: 'Member-Video, Titel noch offen (9iQulmU2QD0)' },
  { url: 'https://youtu.be/g7puNCPWC7Y', title: 'Member-Video, Titel noch offen (g7puNCPWC7Y)' },
  { url: 'https://youtu.be/y_cxAkP3iL4', title: 'Member-Video, Titel noch offen (y_cxAkP3iL4)' },
  { url: 'https://youtu.be/sTvv1T9XARU', title: 'Member-Video, Titel noch offen (sTvv1T9XARU)' }
];
