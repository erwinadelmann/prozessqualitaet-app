// Globaler Such-Index: fasst durchsuchbare Inhalte aus allen Tabs in einer flachen Liste
// zusammen. Jeder Eintrag weiß, welchen Tab er öffnet und, falls vorhanden, welches Element
// dort per initialOpenId/initialOpenNr direkt geöffnet werden soll (kein Deep-Link nötig
// bedeutet: es wird nur auf den Tab gesprungen, ohne ein bestimmtes Element zu öffnen).

import MUSTER_DATA from './data/muster.json';
import NARRATIV_DATA from './data/reframing-narrativ.json';
import UP_DATA from './data/utilisationsprozess.json';
import METHODEN_DATA from './data/methodenbox.json';
import ACT_DATA from './data/act-defusion.json';
import EMDR_DATA from './data/emdr.json';
import { BILDER_KATEGORIEN, VIDEOS } from './data/ressourcen.js';
import { INNER_GAME } from './data/innergame.js';
import { KRITERIEN } from './data/kriterien.js';
import { FOKUS } from './data/fokus.js';
import { FOCUSING_QUESTION, MOTTO_FRAGEN, THEMEN_VORSCHLAEGE } from './data/fokuskompass.js';

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

  // Reframing
  NARRATIV_DATA.reframings.forEach(r => {
    const m = MUSTER_DATA.muster.find(x => x.id === r.id);
    entries.push({
      key: 'reframing-' + r.id,
      tab: 'reframing',
      openId: r.id,
      titel: r.titel,
      kontext: m ? m.kategorie : 'Reframing',
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

  // Utilisationsprozess, die drei Modi
  UP_DATA.modi.forEach(modus => {
    entries.push({
      key: 'utilisationsprozess-' + modus.id,
      tab: 'utilisationsprozess',
      openId: modus.id,
      titel: 'Modus ' + modus.nr + ' · ' + modus.titel,
      kontext: 'Utilisationsprozess',
      snippet: modus.kurz,
      matchText: [modus.titel, modus.kurz, modus.wann, ...(modus.phasen || []).map(p => p.titel + ' ' + p.text)].join(' ')
    });
  });

  // EMDR, acht Phasen
  EMDR_DATA.phasen.forEach(phase => {
    entries.push({
      key: 'emdr-' + phase.nr,
      tab: 'emdr',
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
      tab: 'act',
      openId: abschnitt.id,
      titel: abschnitt.titel,
      kontext: 'ACT, Kognitive Defusion',
      snippet: abschnitt.kurz,
      matchText: [abschnitt.titel, abschnitt.kurz, abschnitt.text, abschnitt.zusatz, ...(abschnitt.punkte || []).map(p => p.titel + ' ' + p.text)].filter(Boolean).join(' ')
    });
  });

  // Inner Game, ein Eintrag, kein Deep-Link, springt nur auf den Tab
  entries.push({
    key: 'innergame',
    tab: 'innergame',
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
