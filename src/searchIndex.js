// Globaler Such-Index: fasst durchsuchbare Inhalte aus allen Tabs in einer flachen Liste
// zusammen. Jeder Eintrag weiß, welchen Tab er öffnet und, falls vorhanden, welches Element
// dort per initialOpenId/initialOpenNr direkt geöffnet werden soll (kein Deep-Link nötig
// bedeutet: es wird nur auf den Tab gesprungen, ohne ein bestimmtes Element zu öffnen).

import MUSTER_DATA from './data/muster.json';
import NARRATIV_DATA from './data/reframing-narrativ.json';
import UP_DATA from './data/utilisationsprozess.json';
import METHODEN_DATA from './data/methodenbox.json';
import NLP_DATA from './data/nlp-glossar.json';
import ACT_DATA from './data/act-defusion.json';
import EMDR_DATA from './data/emdr.json';
import SCHEMA_DATA from './data/schema-therapie.json';
import { BILDER_KATEGORIEN, VIDEOS } from './data/ressourcen.js';
import { INNER_GAME } from './data/innergame.js';
import { KRITERIEN } from './data/kriterien.js';
import { FOKUS } from './data/fokus.js';
import { FOCUSING_QUESTION, MOTTO_FRAGEN, THEMEN_VORSCHLAEGE } from './data/fokuskompass.js';
import { GUNTHER_SCHMIDT_VIDEOS } from './data/gunther-schmidt-videos.js';
import { BUDDHA_OMA_VIDEOS } from './data/buddha-oma-videos.js';
import { BOUNDLESS_MOVEMENT_VIDEOS } from './data/boundless-movement-videos.js';

function buildIndex(){
  const entries = [];

  // Kartei
  MUSTER_DATA.muster.forEach(m => {
    entries.push({
      key: 'kartei-' + m.id,
      tab: 'kartei',
      openId: m.id,
      titel: m.muster,
      kontext: m.kategorie,
      snippet: m.anteil_alt + ' → ' + m.anteil_neu,
      matchText: [m.muster, m.anteil_alt, m.anteil_neu, m.kategorie, m.ursprungsintention, m.schutzfunktion].join(' ')
    });
  });

  // Reframing, Erzählform. Kein eigener Tab mehr, liegt als Umschalter direkt in der
  // Kartei-Detailansicht desselben Musters (gleiche id), springt dorthin und öffnet
  // gleich die Erzählform statt der sachlichen Ansicht.
  NARRATIV_DATA.reframings.forEach(r => {
    const m = MUSTER_DATA.muster.find(x => x.id === r.id);
    entries.push({
      key: 'reframing-' + r.id,
      tab: 'kartei',
      openId: r.id,
      openView: 'erzaehlform',
      titel: r.titel,
      kontext: m ? m.kategorie + ' · Erzählform' : 'Kartei · Erzählform',
      snippet: r.einstieg,
      matchText: [r.titel, r.einstieg, r.kernfunktion, ...(r.funktionen || [])].join(' ')
    });
  });

  // Methodenbox
  METHODEN_DATA.elemente.forEach(e => {
    entries.push({
      key: 'methodenbox-' + e.id,
      tab: 'methodenbox',
      openId: e.id,
      titel: e.titel,
      kontext: e.kategorie,
      snippet: e.kernaussage,
      matchText: [e.titel, e.kernaussage, e.erklaerung, e.einsatzkontext, e.ziel, e.zitat].filter(Boolean).join(' ')
    });
  });

  // Die besten NLP-Techniken, Glossar-Einträge nach Autor:in
  NLP_DATA.elemente.forEach(e => {
    entries.push({
      key: 'nlp-' + e.id,
      tab: 'nlp',
      openId: e.id,
      titel: e.titel,
      kontext: 'NLP-Techniken · ' + e.autor,
      snippet: e.kernaussage,
      matchText: [e.titel, e.autor, e.kernaussage, e.erklaerung, e.ziel, e.einsatzkontext, ...(e.schritte || []).map(s => s.text)].filter(Boolean).join(' ')
    });
  });
  // Grundbegriffe der NLP-Techniken, kein Deep-Link, springt nur auf den Tab
  (NLP_DATA.grundbegriffe || []).forEach(g => {
    entries.push({
      key: 'nlp-grundbegriff-' + g.id,
      tab: 'nlp',
      titel: g.begriff,
      kontext: 'NLP-Techniken · Grundbegriff',
      snippet: g.erklaerung,
      matchText: [g.begriff, g.erklaerung].join(' ')
    });
  });

  // Utilisationsprozess, die Kernprozess-Modi. Kein eigener Tab mehr, liegen jetzt als
  // Kacheln oben in der Methodenbox (dieselbe Datenquelle, siehe Methodenbox.jsx).
  UP_DATA.modi.forEach(modus => {
    entries.push({
      key: 'utilisationsprozess-' + modus.id,
      tab: 'methodenbox',
      openId: modus.id,
      titel: 'Modus ' + modus.nr + ' · ' + modus.titel,
      kontext: 'Methodenbox · Kernprozess',
      snippet: modus.kurz,
      matchText: [modus.titel, modus.kurz, modus.wann, ...(modus.phasen || []).map(p => p.titel + ' ' + p.text)].join(' ')
    });
  });

  // EMDR, acht Phasen. Kein eigener Tab mehr, liegt zusammen mit ACT und Inner Game
  // unter dem Tab "Modelle" (Themen-Umschalter), siehe Modelle.jsx.
  EMDR_DATA.phasen.forEach(phase => {
    entries.push({
      key: 'emdr-' + phase.nr,
      tab: 'modelle',
      openThemaId: 'emdr',
      openNr: phase.nr,
      titel: 'EMDR, Phase ' + phase.nr + ' · ' + phase.titel,
      kontext: 'EMDR',
      snippet: phase.kurz,
      matchText: [phase.titel, phase.kurz, phase.inhalt, phase.funktion].join(' ')
    });
  });

  // ACT, Kognitive Defusion, Abschnitte
  ACT_DATA.abschnitte.forEach(abschnitt => {
    entries.push({
      key: 'act-' + abschnitt.id,
      tab: 'modelle',
      openThemaId: 'act',
      openId: abschnitt.id,
      titel: abschnitt.titel,
      kontext: 'ACT, Kognitive Defusion',
      snippet: abschnitt.kurz,
      matchText: [abschnitt.titel, abschnitt.kurz, abschnitt.text, abschnitt.zusatz, ...(abschnitt.punkte || []).map(p => p.titel + ' ' + p.text)].filter(Boolean).join(' ')
    });
  });

  // Schema-Therapie, 18 Schemata
  SCHEMA_DATA.schemata.forEach(s => {
    entries.push({
      key: 'schema-' + s.id,
      tab: 'modelle',
      openThemaId: 'schema',
      openId: s.id,
      titel: s.name,
      kontext: 'Schema-Therapie · ' + s.domaene,
      snippet: s.beschreibung,
      matchText: [s.name, s.domaene, s.beschreibung].join(' ')
    });
  });

  // Inner Game, ein Eintrag, kein Deep-Link, springt nur auf den Tab
  entries.push({
    key: 'innergame',
    tab: 'modelle',
    openThemaId: 'innergame',
    titel: 'Inner Game, Umlenkung in drei Schritten',
    kontext: 'Inner Game',
    snippet: INNER_GAME.reminder,
    matchText: [INNER_GAME.reminder, INNER_GAME.sehnsuchtsfrage.frage, INNER_GAME.methode.titel, INNER_GAME.methode.text, ...INNER_GAME.schritte.map(s => s.titel + ' ' + s.text)].join(' ')
  });

  // Qualitäts-Check, zehn Kriterien
  KRITERIEN.forEach(k => {
    entries.push({
      key: 'pruefung-' + k.nr,
      tab: 'pruefung',
      titel: 'Kriterium ' + k.nr + ' · ' + k.titel,
      kontext: 'Qualitäts-Check',
      snippet: k.frage,
      matchText: [k.titel, k.frage, k.hinweis].join(' ')
    });
  });

  // Ressourcen, Bild-Kategorien und Videos
  BILDER_KATEGORIEN.forEach(k => {
    entries.push({
      key: 'ressourcen-kat-' + k.kategorie,
      tab: 'ressourcen',
      titel: k.kategorie,
      kontext: 'Ressourcen · Bilder',
      snippet: k.bilder.length + ' Bilder',
      matchText: k.kategorie
    });
  });
  VIDEOS.forEach(v => {
    entries.push({
      key: 'ressourcen-video-' + v.id,
      tab: 'ressourcen',
      titel: v.titel,
      kontext: 'Ressourcen · ' + v.thema,
      snippet: v.thema,
      matchText: [v.titel, v.thema].join(' ')
    });
  });

  // Mein Fokus
  entries.push({
    key: 'fokus',
    tab: 'fokus',
    titel: 'Mein Fokus, Sehnsucht und Startpunkte',
    kontext: 'Mein Fokus',
    snippet: FOKUS.muster.titel,
    matchText: [FOKUS.sehnsucht, FOKUS.muster.titel, FOKUS.muster.ursprungsintention, FOKUS.muster.schutzfunktion, ...FOKUS.startpunkte.map(s => s.titel + ' ' + s.text)].join(' ')
  });

  // Fokus-Kompass
  entries.push({
    key: 'fokuskompass',
    tab: 'fokuskompass',
    titel: 'Fokus-Kompass, Priorisierung',
    kontext: 'Fokus-Kompass',
    snippet: FOCUSING_QUESTION,
    matchText: [FOCUSING_QUESTION, ...MOTTO_FRAGEN, ...THEMEN_VORSCHLAEGE].join(' ')
  });

  // Videothek, drei Sammlungen, je ein Sprungpunkt (kein Deep-Link auf einzelne Videos)
  entries.push({
    key: 'videothek-guntherschmidt',
    tab: 'videothek',
    openId: 'guntherschmidt',
    titel: 'Videothek · Dr. Gunther Schmidt',
    kontext: 'Videothek',
    snippet: 'Vorträge und Gespräche zur Hypnosystemik',
    matchText: ['Dr. Gunther Schmidt', 'Hypnosystemik', 'Problemtrance', 'Wahlmöglichkeiten', 'Lösungsversuche', 'Grundkurs', 'Aufbaukurs', ...GUNTHER_SCHMIDT_VIDEOS.map(v => v.title)].join(' ')
  });
  entries.push({
    key: 'videothek-buddhaoma',
    tab: 'videothek',
    openId: 'buddhaoma',
    titel: 'Videothek · Buddha Oma',
    kontext: 'Videothek',
    snippet: 'Ursula Lyon, Impulse aus buddhistischer Sicht',
    matchText: ['Buddha Oma', 'Ursula Lyon', 'Buddhismus', 'Meditation', 'Yoga'].join(' ')
  });
  entries.push({
    key: 'videothek-boundlessmovement',
    tab: 'videothek',
    openId: 'boundlessmovement',
    titel: 'Videothek · Boundless Movement',
    kontext: 'Videothek',
    snippet: 'Natürliche, bewusste Bewegung',
    matchText: ['Boundless Movement', 'Bewegung', 'Körper', 'natürlich', 'bewusst'].join(' ')
  });

  return entries;
}

export const SEARCH_INDEX = buildIndex();

export function searchGlobal(query, limit = 8){
  const q = query.trim().toLowerCase();
  if(!q) return [];
  return SEARCH_INDEX
    .filter(entry => entry.matchText.toLowerCase().includes(q))
    .slice(0, limit);
}
