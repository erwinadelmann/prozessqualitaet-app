// Feste, KI-freie Ablauflogik für den Tab "Utilisations-Begleiter".
// Quelle der Wortwahl und Reihenfolge: Steuerposition_Description.md (Projekt Prozessqualität)
// und die darauf abgestimmte Feinjustierung vom 2026-07-13 (Memory "prozessqualitaet_utilisationscoach_spec").
//
// Wichtiger Unterschied zur ursprünglich geplanten AI-Version: Es gibt keine automatische
// Moduserkennung aus freiem Text und keine personalisierte Paraphrasierung der Antworten.
// Die Person wählt nach der Themenbeschreibung selbst, welche der drei Situationsbeschreibungen
// am ehesten passt (Schritt "modus_wahl"). Verzweigungen, die eine Einschätzung freien Textes
// gebraucht hätten (z. B. "zeigt sich Selbstabwertung?"), sind als direkte Ja/Nein-Fragen an die
// Person selbst gestellt statt aus ihrer Antwort interpretiert.

export function kuerzen(text, max = 90) {
  if (!text) return '';
  const t = text.trim();
  return t.length > max ? t.slice(0, max).trim() + '…' : t;
}

export const WILLKOMMEN_TEXT =
  'Willkommen. Erzählen Sie mir, welches Muster, welche Reaktion oder welches Thema Sie gerade beschäftigt. Ich höre erst einmal einfach zu.';

const COMMON = {
  start: {
    type: 'reflect',
    prompt: WILLKOMMEN_TEXT,
    storeAs: 'thema',
    next: 'modus_wahl'
  },
  modus_wahl: {
    type: 'choice',
    prompt: 'Welche Beschreibung passt gerade am ehesten?',
    storeAs: 'modus',
    options: [
      { label: 'Ein einzelnes Muster oder eine Reaktion beschäftigt mich', value: 'm1', next: 'm1_ankommen' },
      { label: 'Zwei Seiten in mir wollen gerade Widersprüchliches', value: 'm3', next: 'm3_ankommen' },
      { label: 'Ein starker Impuls nach Vergeltung oder Kontrolle, nach einer Kränkung', value: 'm4', next: 'm4_ankommen' },
      { label: 'Ich bin nicht sicher', value: 'm1', next: 'm1_ankommen' }
    ]
  }
};

const MODUS1 = {
  m1_ankommen: {
    type: 'info',
    prompt:
      'Das klingt, als würde da in Ihnen schon länger etwas mitlaufen, das Energie kostet. Ich habe gehört, was Sie beschrieben haben.',
    next: 'm1_selbstbewertung_frage'
  },
  m1_selbstbewertung_frage: {
    type: 'choice',
    prompt: 'Wie finden Sie das eigentlich von sich, dass Sie das so machen? Werten Sie sich dafür ab?',
    storeAs: 'selbstbewertung',
    options: [
      { label: 'Ja, ich werte mich dafür ab', value: 'ja', next: 'm1_spaltung' },
      { label: 'Nein, eher nicht', value: 'nein', next: 'm1_wohlwollend' }
    ]
  },
  m1_spaltung: {
    type: 'info',
    prompt:
      'Ein Teil in Ihnen scheint das gerade hart zu bewerten. Ein anderer Teil, der aber tatsächlich handelt, wirkt davon unbeeindruckt. Verändert diese Bewertung eigentlich etwas am Verhalten, oder bleibt das Verhalten trotzdem gleich? In der Regel verändert die Abwertung das Verhalten nicht, meistens verschlimmert sie es sogar, weil sie zusätzlich Druck und Scham erzeugt, ohne mehr Handlungsfähigkeit zu erzeugen.',
    next: 'm1_wofuer'
  },
  m1_wohlwollend: {
    type: 'info',
    prompt: 'Schön, dass Sie da bereits wohlwollend mit sich umgehen.',
    next: 'm1_wofuer'
  },
  m1_wofuer: {
    type: 'reflect',
    prompt: 'Wofür sorgt dieser Teil in Ihrem System gerade?',
    storeAs: 'wofuer',
    chips: [
      { label: 'Schutz des Selbstwerts', value: 'Schutz des Selbstwerts' },
      { label: 'Sicherheit', value: 'Sicherheit' },
      { label: 'Verbundenheit', value: 'Verbundenheit' },
      { label: 'Regulation von Anspannung', value: 'Regulation von Anspannung' },
      { label: 'Wirksamkeit', value: 'Wirksamkeit' }
    ],
    chipsHint:
      'Falls gerade keine eigene Antwort kommt, als Angebot: Vielleicht geht es um den Schutz Ihres Selbstwerts, um Sicherheit, um Verbundenheit, um eine rasche Regulation von Anspannung, oder um Wirksamkeit.',
    next: 'm1_sehnsucht'
  },
  m1_sehnsucht: {
    type: 'reflect',
    prompt: 'Was wäre denn die Sehnsucht dahinter? Dass Sie sagen: Herrlich 😊, genau, so ist es richtig / perfekt!',
    storeAs: 'sehnsucht',
    next: 'm1_meta'
  },
  m1_meta: {
    type: 'info',
    prompt: (s) =>
      `Ein Teil in Ihnen möchte gerade das erreichen, was Sie eben als Sehnsucht beschrieben haben${
        s.answers.sehnsucht ? ' — „' + kuerzen(s.answers.sehnsucht) + '“' : ''
      }. Gleichzeitig verfolgt ein anderer Teil gerade ein anderes, genauso berechtigtes Ziel.`,
    next: 'm1_kernsatz'
  },
  m1_kernsatz: {
    type: 'info',
    prompt:
      'Ich bin verbunden mit Schutz, Sicherheit, Verbundenheit und Wirksamkeit. Ich bin der Konferenzleiter, alle Impulse sind nur Anträge. Ich kann jederzeit Anträge ablehnen oder verhandeln.',
    next: 'm1_prioritaet'
  },
  m1_prioritaet: {
    type: 'reflect',
    prompt: 'Welcher der beiden Teile bekommt gerade den Vortritt?',
    storeAs: 'prioritaet',
    next: 'm1_wuerdigung_zurueckstehend'
  },
  m1_wuerdigung_zurueckstehend: {
    type: 'info',
    prompt: 'Ich verstehe dich so gut, dass du das jetzt willst. Gerade hat aber etwas anderes Vorrang. Danke, dass du jetzt zurückstehst.',
    next: 'm1_wunsch'
  },
  m1_wunsch: {
    type: 'reflect',
    prompt: 'Was würde dieser Teil Ihres Systems wirklich wollen, wenn ihm alles zur Verfügung stünde?',
    storeAs: 'wunsch',
    next: 'm1_wunsch_wuerdigung'
  },
  m1_wunsch_wuerdigung: {
    type: 'info',
    prompt: 'Verständlicherweise ist das im Moment so noch nicht möglich, das macht vollkommen Sinn.',
    next: 'm1_ausnahme'
  },
  m1_ausnahme: {
    type: 'reflect',
    prompt: 'Gab es schon einmal einen Moment, und sei er noch so klein, wo es ein bisschen anders war?',
    storeAs: 'ausnahme',
    chips: [{ label: 'Fällt mir gerade nichts ein', value: '—' }],
    next: (antwort) => (antwort === '—' ? 'm1_innergame' : 'm1_ausnahme_detail')
  },
  m1_ausnahme_detail: {
    type: 'reflect',
    prompt: 'Wie war das genau?',
    storeAs: 'ausnahme_detail',
    next: 'm1_ausnahme_wuerdigung'
  },
  m1_ausnahme_wuerdigung: {
    type: 'info',
    prompt: 'Schön, dass es das schon einmal gab.',
    next: 'm1_innergame'
  },
  m1_innergame: {
    type: 'info',
    prompt:
      'Bisher haben Sie versucht, dahin zu kommen über Druck, Kontrolle und Abwertung. Sie können sich jetzt für einen anderen Weg entscheiden.\n\n1. Nicht wertend wahrnehmen: der Ist-Zustand wird beobachtet, ohne ihn zu bewerten.\n2. Dem wahren Selbst vertrauen: das gewünschte Bild übergeben, dann bewusst loslassen, ohne im Detail zu kontrollieren.\n3. Ohne Selbstkritik aus dem Ergebnis lernen: die Differenz wird zur nächsten Feinjustierung, nicht zum Urteil.',
    next: 'm1_bild'
  },
  m1_bild: {
    type: 'reflect',
    prompt: 'Welches Bild trägt bereits die Kraft und Kompetenz in sich, die Sie brauchen, um das erfolgreich umzusetzen?',
    storeAs: 'bild',
    next: 'm1_marker'
  },
  m1_marker: {
    type: 'choice',
    prompt: 'Wenn Sie sich dieses Bild jetzt vorstellen, wie fühlt sich das im Körper an? Ist das zu mehr als siebzig Prozent ein gutes, stimmiges Gefühl?',
    options: [
      { label: 'Ja, das stimmt', value: 'ja', next: 'm1_haltung' },
      { label: 'Eher nicht', value: 'nein', next: 'm1_bild_neu' }
    ]
  },
  m1_bild_neu: {
    type: 'info',
    prompt: 'Dann verändern Sie das Bild, oder suchen sich ein neues, bis der Marker stimmt.',
    next: 'm1_bild'
  },
  m1_haltung: {
    type: 'info',
    prompt: 'Finden Sie die Körperhaltung, die zu diesem Bild passt, und nehmen Sie sie jetzt für zwei bis drei Minuten wirklich ein.',
    buttonLabel: 'Habe ich gemacht, weiter',
    next: 'm1_sound'
  },
  m1_sound: {
    type: 'reflect',
    prompt: 'Gibt es einen Sound oder Song, der zum Bild passt?',
    storeAs: 'sound',
    chips: [{ label: 'Kein Sound dabei', value: '—' }],
    next: 'm1_geruch'
  },
  m1_geruch: {
    type: 'reflect',
    prompt: 'Gehört ein Geruch zu diesem Bild?',
    storeAs: 'geruch',
    chips: [{ label: 'Kein Geruch dabei', value: '—' }],
    next: 'm1_blickfeld'
  },
  m1_blickfeld: {
    type: 'reflect',
    prompt: 'Wie ist dabei Ihr inneres Blickfeld — weit, hell, eng, offen?',
    storeAs: 'blickfeld',
    next: 'm1_anker'
  },
  m1_anker: {
    type: 'reflect',
    prompt:
      'Wie bauen Sie eine kurze Erinnerungshilfe — und sei es nur die Haltung für drei Atemzüge oder ein paar Takte des Klangs — möglichst oft in entscheidende Momente Ihres Alltags ein?',
    storeAs: 'anker',
    next: 'm1_futurepace1'
  },
  m1_futurepace1: {
    type: 'reflect',
    prompt: 'Wenn Sie in einer entscheidenden Situation genau diese Haltung, diesen Klang einsetzen, was verändert sich?',
    storeAs: 'futurepace1',
    next: 'm1_futurepace2'
  },
  m1_futurepace2: {
    type: 'reflect',
    prompt: 'Wie würden Sie dieser Situation morgen begegnen, in einer Woche?',
    storeAs: 'futurepace2',
    next: 'm1_abschluss'
  },
  m1_abschluss: {
    type: 'end',
    prompt: 'Danke, dass Sie sich auf diesen Prozess eingelassen haben. Diese Sitzung bleibt hier gespeichert, bis Sie ein neues Thema beginnen.'
  }
};

const MODUS3 = {
  m3_ankommen: {
    type: 'info',
    prompt: 'Ich höre, dass da gerade zwei Seiten in Ihnen etwas Widersprüchliches wollen. Beide haben ihre Berechtigung.',
    next: 'm3_seite_a'
  },
  m3_seite_a: {
    type: 'reflect',
    prompt: 'Wie würden Sie die eine Seite in sich benennen, klar und wertfrei — zum Beispiel „der Teil, der Sicherheit sucht"?',
    storeAs: 'seite_a',
    next: 'm3_seite_b'
  },
  m3_seite_b: {
    type: 'reflect',
    prompt: 'Und wie würden Sie die andere Seite benennen?',
    storeAs: 'seite_b',
    next: 'm3_wuerdigung_a'
  },
  m3_wuerdigung_a: {
    type: 'reflect',
    prompt: (s) => `Wofür war "${s.answers.seite_a || 'diese Seite'}" einmal wichtig, welchen Beitrag hat sie geleistet?`,
    storeAs: 'wuerdigung_a',
    next: 'm3_wuerdigung_b'
  },
  m3_wuerdigung_b: {
    type: 'reflect',
    prompt: (s) => `Und wofür war "${s.answers.seite_b || 'die andere Seite'}" einmal wichtig, welchen Beitrag hat sie geleistet?`,
    storeAs: 'wuerdigung_b',
    next: 'm3_schwaechere'
  },
  m3_schwaechere: {
    type: 'choice',
    prompt: 'Welche der beiden Seiten hat gerade weniger Raum oder Stimme?',
    storeAs: 'schwaechere',
    options: (s) => [
      { label: s.answers.seite_a || 'Seite A', value: 'a', next: 'm3_staerkung' },
      { label: s.answers.seite_b || 'Seite B', value: 'b', next: 'm3_staerkung' }
    ]
  },
  m3_staerkung: {
    type: 'info',
    prompt:
      'Diese Seite bekommt jetzt bewusst mehr Ihrer Aufmerksamkeit, mehr Raum. Vielleicht hilft dabei ein kleiner Sprachwechsel: innerlich von „einem Teil in mir" zu sprechen statt von „ich". Das schafft von selbst etwas Abstand und damit Raum. Beide Seiten sind Leistungen Ihres Systems, mit eigenem Sinn.',
    next: 'm3_kooperation'
  },
  m3_kooperation: {
    type: 'reflect',
    prompt: 'Wie können beide Seiten jetzt gemeinsam zu einer neuen Lösung beitragen, einer, die über beide Ausgangspositionen hinausgeht?',
    storeAs: 'kooperation',
    next: 'm3_versoehner_bild'
  },
  m3_versoehner_bild: {
    type: 'reflect',
    prompt: 'Stellen Sie sich vor, es gäbe eine Pflanze, ein Tier oder eine Fantasiefigur, die genau die Möglichkeit hätte, diese beiden Seiten miteinander zu versöhnen. Welche wäre das?',
    storeAs: 'versoehner',
    next: 'm3_versoehner_merkmale'
  },
  m3_versoehner_merkmale: {
    type: 'reflect',
    prompt: 'Hat diese Figur bestimmte Farben oder Formen, einen Klang oder Song, vielleicht einen Duft, der dabei unterstützt?',
    storeAs: 'versoehner_merkmale',
    next: 'm3_versoehner_anker'
  },
  m3_versoehner_anker: {
    type: 'reflect',
    prompt: 'Wie bauen Sie genau diese Bewegungen, Farben, Klänge oder diesen Song, den Duft, die Körperhaltung dieser Figur in passende Alltagssituationen ein, dort wo beide Seiten häufig aufeinandertreffen? Jede kurze Erinnerung daran aktiviert erneut dieses neue Zusammenspiel.',
    storeAs: 'versoehner_alltag',
    next: 'm3_abschluss'
  },
  m3_abschluss: {
    type: 'end',
    prompt: 'Augenhöhe ist die Voraussetzung für Kooperation, nicht deren Ergebnis. Danke, dass Sie sich auf diesen Prozess eingelassen haben.'
  }
};

const MODUS4 = {
  m4_ankommen: {
    type: 'info',
    prompt: 'Das klingt, als wäre gerade etwas in Ihnen verletzt worden, das Ihnen wirklich wichtig ist.',
    next: 'm4_selbstbewertung'
  },
  m4_selbstbewertung: {
    type: 'choice',
    prompt: 'Wie finden Sie das eigentlich von sich, solche Gedanken zu haben? Rache- und Machtfantasien sind oft zusätzlich mit Scham belegt.',
    storeAs: 'selbstbewertung',
    options: [
      { label: 'Ich werte mich dafür ab', value: 'ja', next: 'm4_spaltung' },
      { label: 'Nein, eher nicht', value: 'nein', next: 'm4_wofuer' }
    ]
  },
  m4_spaltung: {
    type: 'info',
    prompt:
      'Ein Teil in Ihnen scheint das gerade hart zu bewerten. Ein anderer Teil, der aber tatsächlich handelt, wirkt davon unbeeindruckt. Diese Bewertung verändert meist nichts am Verhalten, sie erzeugt nur zusätzlich Druck und Scham.',
    next: 'm4_wofuer'
  },
  m4_wofuer: {
    type: 'reflect',
    prompt: 'Wofür sorgt dieser Teil gerade — wofür ist dieser Impuls gerade ein kluger Versuch?',
    storeAs: 'wofuer',
    next: 'm4_sehnsucht'
  },
  m4_sehnsucht: {
    type: 'reflect',
    prompt: 'Was wäre denn die Sehnsucht dahinter? Dass Sie sagen: Herrlich 😊, genau, so ist es richtig / perfekt!',
    storeAs: 'sehnsucht',
    next: 'm4_wunsch'
  },
  m4_wunsch: {
    type: 'reflect',
    prompt: 'Was würde dieser Anteil wirklich wollen, wenn ihm alles zur Verfügung stünde?',
    storeAs: 'wunsch',
    next: 'm4_wunsch_wuerdigung'
  },
  m4_wunsch_wuerdigung: {
    type: 'info',
    prompt:
      'Verständlicherweise ist das im Moment so noch nicht möglich, das macht vollkommen Sinn. Oft zeigt sich hier: gesehen werden, ernst genommen werden, Würde zurückerhalten, wieder wirksam sein — die Handlung selbst ist dabei austauschbar, tragend ist das Anliegen dahinter.',
    next: 'm4_ausnahme'
  },
  m4_ausnahme: {
    type: 'reflect',
    prompt: 'Gab es schon einmal einen Moment, und sei er noch so klein, in dem Sie Ihre Würde oder Kontrolle zurückgewonnen haben, ohne dass jemand dafür büßen musste?',
    storeAs: 'ausnahme',
    next: 'm4_embodiment'
  },
  m4_embodiment: {
    type: 'reflect',
    prompt: 'Wie würde dieser Anteil atmen, wenn er seine Wirksamkeit bereits zurückgewonnen hätte, ganz ohne Vergeltung? Welche Körperhaltung hätte er, wo im Körper spüren Sie das?',
    storeAs: 'embodiment',
    next: 'm4_haltung'
  },
  m4_haltung: {
    type: 'info',
    prompt: 'Nehmen Sie diese Haltung jetzt für zwei bis drei Minuten wirklich ein.',
    buttonLabel: 'Habe ich gemacht, weiter',
    next: 'm4_blickfeld'
  },
  m4_blickfeld: {
    type: 'reflect',
    prompt: 'Wie ist dabei Ihr inneres Blickfeld — weit, hell, eng, offen?',
    storeAs: 'blickfeld',
    next: 'm4_futurepace1'
  },
  m4_futurepace1: {
    type: 'reflect',
    prompt: 'Wenn Sie aus dieser Haltung heraus auf die Situation schauen, was verändert sich?',
    storeAs: 'futurepace1',
    next: 'm4_futurepace2'
  },
  m4_futurepace2: {
    type: 'reflect',
    prompt: 'Wie würden Sie einer ähnlichen Kränkung morgen begegnen, in einer Woche?',
    storeAs: 'futurepace2',
    next: 'm4_abschluss'
  },
  m4_abschluss: {
    type: 'end',
    prompt: (s) =>
      `Zahlt dieser neue Umgang erkennbar auf das ein, was Sie sich vorhin als Sehnsucht gewünscht haben${
        s.answers.sehnsucht ? ' — „' + kuerzen(s.answers.sehnsucht) + '“' : ''
      }? Danke, dass Sie sich auf diesen Prozess eingelassen haben.`
  }
};

export const STEPS = { ...COMMON, ...MODUS1, ...MODUS3, ...MODUS4 };

export function resolvePrompt(step, state) {
  return typeof step.prompt === 'function' ? step.prompt(state) : step.prompt;
}

export function resolveOptions(step, state) {
  return typeof step.options === 'function' ? step.options(state) : step.options;
}

export function resolveNext(step, antwort, state) {
  return typeof step.next === 'function' ? step.next(antwort, state) : step.next;
}
