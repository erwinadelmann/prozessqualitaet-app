// Fokus-Kompass: Priorisierungs-Werkzeug gegen "auf 100 Hochzeiten gleichzeitig tanzen".
// Methodik: Hebelwirkung (Focusing Question nach Gary Keller, "The ONE Thing"),
// Aufwand bis spürbare Wirkung (angelehnt an Pareto-Prinzip / Eisenhower-Logik),
// Kosten des Aufschiebens (macht Opportunitätskosten explizit, gegen "opportunity cost neglect").
// Score = (Hebelwirkung × 2) + (Kosten des Aufschiebens × 1,5) − Aufwand.

export const FOCUSING_QUESTION = "Welche EINE Sache würde mich tatsächlich maximal weiterbringen?";

export const METHODIK_TEXT = "Score = (Hebelwirkung × 2) + (Kosten des Aufschiebens × 1,5) − Aufwand. Die Rangfolge ist ein Vorschlag zum Nachdenken, keine Entscheidung – die triffst du selbst.";

export const METHODIK_QUELLE = "Quellen: Gary Keller, „The ONE Thing“ (Focusing Question) · Eisenhower-Matrix & Pareto-Prinzip (Priorisierungsliteratur) · Forschung zu „opportunity cost neglect“ in der Entscheidungspsychologie.";

// Motto-Fragen, zentral im Kompass sichtbar (von Erwin vorgegeben).
export const MOTTO_FRAGEN = [
  "Als wer gehe ich auf das Thema zu?",
  "Welche Sehnsucht steht eigentlich hinter dem aktuellen Thema?",
  "Wann würde ich sagen können: Mein Gott, ist das toll, dass ich mich in dem Kontext so verhalten habe!"
];

// Kategorien neu geordnet (statt einer überfüllten Sammelkategorie "Inneres Wachstum"):
// die vier inneren Kategorien folgen deinen eigenen thematischen Achsen Wert, Würde, Wirksamkeit.
// Diese Zuordnung ist meine Einordnung zur besseren Übersicht, keine von dir vorgegebene Struktur.
export const DEFAULT_KATEGORIEN = [
  "Business & Struktur",
  "Vertrieb & Sichtbarkeit",
  "Fachliche Vertiefung",
  "Musik",
  "Verbindung & Beziehung",
  "Würde & Grenzen",
  "Wert & Anteile",
  "Wirksamkeit: Zustand aktivieren",
  "Wirksamkeit: Denken & Handeln",
  "Sonstiges"
];

// Hinweis: Die Hebelwirkung-/Aufwand-/Opportunitätskosten-Werte UND die Kurz-Erklärungen unten
// sind erste Einordnungen von mir, keine geprüften Fakten über deine Prioritäten oder Absichten.
// Regler und Texte nach eigenem Ermessen anpassen.
export const FOKUS_SEED = [
  // Business & Struktur
  { id: "gewerbeanmeldung", text: "Gewerbeanmeldung", erklaerung: "Der bürokratische Schritt, der alles Weitere rechtlich erst ermöglicht.", kategorie: "Business & Struktur", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "strukturen-ueben", text: "Strukturen üben", erklaerung: "Wiederkehrende Abläufe bewusst einüben, bis sie ohne Kraftaufwand laufen.", kategorie: "Business & Struktur", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "ordnung-schaffen", text: "Ordnung und Struktur schaffen", erklaerung: "Äußere Ordnung schaffen, die innerlich Klarheit und Ruhe spiegelt.", kategorie: "Business & Struktur", hebelwirkung: 2, aufwand: 2, opportunitaet: 2 },
  { id: "verantwortung-fuer-prozesse-uebernehmen", text: "Verantwortung für Ablauf und Prozesse selbst in die Hand nehmen – nicht hinnehmen, nur weil es bequem ist", erklaerung: "Abläufe aktiv gestalten statt sie treiben zu lassen, nur weil das bequemer wäre.", kategorie: "Business & Struktur", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },

  // Vertrieb & Sichtbarkeit – Einschätzungen meinerseits, angelehnt an deine dokumentierte B2B-Struktur (mentaltraining.at)
  { id: "vertriebswege-aktivieren", text: "Vertriebswege aktivieren (WKO-Netzwerk, Stammtische, HR-Netzwerke)", erklaerung: "Bestehende Netzwerke gezielt für Sichtbarkeit und Kontakte nutzen, statt nur Mitglied zu sein.", kategorie: "Vertrieb & Sichtbarkeit", hebelwirkung: 4, aufwand: 3, opportunitaet: 4 },
  { id: "impulsvortrag-terminieren", text: "Kostenlosen Impulsvortrag anbieten und terminieren", erklaerung: "Den 60-Minuten-Vortrag „Was Pferde über Führung wissen“ als Türöffner tatsächlich in Kalender bringen.", kategorie: "Vertrieb & Sichtbarkeit", hebelwirkung: 4, aufwand: 2, opportunitaet: 3 },
  // Auf Nachfrage präzisiert: gemeint ist ein realer Testlauf, kein reiner Verkauf – siehe Erklärung im Chat.
  { id: "produkt-pilotieren", text: "Produkt „Führung, die wirkt“ bei einem Erstkunden pilotieren", erklaerung: "Den Halbtagsworkshop einmal real mit einem ersten Unternehmen durchführen – als Testlauf für Ablauf und Wirkung, nicht als fertiges Verkaufsprodukt.", kategorie: "Vertrieb & Sichtbarkeit", hebelwirkung: 5, aufwand: 3, opportunitaet: 4 },

  // Fachliche Vertiefung
  { id: "ausbildung-schmidt", text: "Ausbildung bei Dr. Gunther Schmidt", erklaerung: "Fachliche Vertiefung als Investition in die eigene Methodenkompetenz (Hypnosystemik).", kategorie: "Fachliche Vertiefung", hebelwirkung: 4, aufwand: 4, opportunitaet: 3 },
  { id: "wissensdokumente-fertigstellen", text: "NotebookLM-Wissensdokumente für ein Projekt fertigstellen", erklaerung: "Die Destillate (Kern-Extrakt, FAQ, Sprachstil-Referenz …) zu einem Projekt abschließen.", kategorie: "Fachliche Vertiefung", hebelwirkung: 3, aufwand: 3, opportunitaet: 2 },
  { id: "referenzen-aufbereiten", text: "Referenzen aus der Burnout-Klinik-Zeit als Glaubwürdigkeitsanker aufbereiten", erklaerung: "Die drei Jahre pferdegestützte Therapie als belastbaren Beleg der eigenen Expertise sichtbar machen.", kategorie: "Fachliche Vertiefung", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 },

  // Musik
  { id: "musik-training", text: "Musik-Training", erklaerung: "Stimme, Atem und Körperpräsenz als Instrument regelmäßig trainieren.", kategorie: "Musik", hebelwirkung: 3, aufwand: 3, opportunitaet: 3 },
  { id: "konzerttermine-akquirieren", text: "Konzert- und Auftrittstermine akquirieren", erklaerung: "Aktiv Auftrittsmöglichkeiten suchen und ansprechen, statt auf Anfragen zu warten.", kategorie: "Musik", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "combo-eigene-konzerte", text: "Eigene Konzerte mit der Combo veranstalten", erklaerung: "Selbst ein Konzert organisieren, statt nur auf Bucher-Anfragen zu reagieren.", kategorie: "Musik", hebelwirkung: 4, aufwand: 4, opportunitaet: 3 },

  // Verbindung & Beziehung
  { id: "verbindung-pflegen", text: "Verbindung pflegen mit zieldienlichen Menschen", erklaerung: "Kontakt zu Menschen halten, die das eigene Vorhaben tatsächlich stützen.", kategorie: "Verbindung & Beziehung", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "gemeinschaft-verbundenheit-leben", text: "Gemeinschaft und Verbundenheit leben", erklaerung: "Zugehörigkeit aktiv suchen, statt sie nur nebenbei entstehen zu lassen.", kategorie: "Verbindung & Beziehung", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 },

  // Würde & Grenzen – Raum, Respekt, Abgrenzung
  { id: "abgrenzen", text: "Abgrenzen", erklaerung: "Klar sagen, wo die eigene Grenze verläuft, ohne Rechtfertigung.", kategorie: "Würde & Grenzen", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "abgrenzungs-verbot-ueberschreiben", text: "Altes Abgrenzungs-Verbot überschreiben: „Das ist MEIN Raum!“", erklaerung: "Ein altes inneres Verbot, sich abzugrenzen, bewusst außer Kraft setzen.", kategorie: "Würde & Grenzen", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "innere-zustaendigkeit-eigenes-schiff", text: "Innere Zuständigkeit klären: Im eigenen Raum nur das wahre Selbst am Steuer, andere respektvoll von Bord begleiten – und den Raum der anderen ebenso respektieren, statt sich dort als besserer Kapitän aufzuspielen. Wert und Würde sind unverlierbar, aber nur im eigenen Raum verfügbar", erklaerung: "Klären, wer im eigenen Raum das Steuer hält – und fremde Räume ebenso respektieren.", kategorie: "Würde & Grenzen", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "kleider-des-ueberangepassten-ausziehen", text: "Dem inneren Kind die 'Kleider' des Überangepassten ausziehen, Bedrohung sicher aus dem Raum entfernen und im kosmischen Wertstofflager der Frau Holle zum Recycling anbieten", erklaerung: "Die übernommene Rolle des Überangepassten ablegen und die alte Bedrohung sicher entlassen.", kategorie: "Würde & Grenzen", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "vor-wahrem-selbst-verbeugen", text: "Vor dem wahren Selbst verbeugen", erklaerung: "Kurz innehalten und dem eigenen wahren Selbst bewusst Respekt erweisen.", kategorie: "Würde & Grenzen", hebelwirkung: 2, aufwand: 1, opportunitaet: 2 },

  // Wert & Anteile – innere Anteile, Modus-Arbeit, Selbstwert
  { id: "anteile-staerken", text: "Anteile stärken", erklaerung: "Innere Anteile gezielt stärken, statt sie nur zu verwalten.", kategorie: "Wert & Anteile", hebelwirkung: 3, aufwand: 3, opportunitaet: 3 },
  // Ausnahme-Erleben aktivieren und verankern (von Erwin beschrieben, Name vorgeschlagen).
  { id: "anteile-arbeit-ausnahme-ressource", text: "Anteile-Arbeit: Ausnahme-Erleben aktivieren und verankern – „Wie würde DIESER Anteil jetzt auf die Situation schauen?“", erklaerung: "Eine Situation suchen, in der ein Muster schon einmal anders war, und dieses Erleben verankern.", kategorie: "Wert & Anteile", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 },
  { id: "inneres-kind-bereichern", text: "Dem inneren Kind die Verantwortung abnehmen und selbst aktiv werden (inneres Kind bitten, das Vorhaben mit Lebendigkeit, Begeisterung und Freude zu bereichern)", erklaerung: "Das innere Kind einladen, mit Lebendigkeit und Freude beizutragen, statt Verantwortung zu tragen.", kategorie: "Wert & Anteile", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  // Coaching-Dreieck (von Erwin beschrieben) und Schema-Therapie-Modus-Modell (Jeffrey Young) zeigen
  // dieselbe Grundstruktur: gesundes Erwachsenen-Ich, Kind-Modus, strafender/fordernder innerer Kritiker.
  // Diese Verknüpfung ist meine Einordnung, keine Aussage, die Erwin selbst so getroffen hat.
  { id: "coaching-dreieck-modus-arbeit", text: "Coaching-Dreieck erkennen und steuern: aus welchem Ich spreche ich gerade – ausbalanciertes Erwachsenen-Ich, Kind-Ich (ohnmächtig oder rebellisch) oder strenges Lehrer-Ich – und bewusst ins Erwachsenen-Ich zurückkehren", erklaerung: "Erkennen, aus welchem der drei Ich-Zustände heraus man gerade handelt, und bewusst zurückkehren.", kategorie: "Wert & Anteile", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },

  // Wirksamkeit: Zustand aktivieren – körperbezogene Zustandsregulation
  { id: "vorgefuehlter-erfolg", text: "„Vorgefühlter Erfolg“ üben (Mini-Intervention)", erklaerung: "Das Ergebnis vorab lebendig sehen und fühlen, dann mit diesem Gefühl handeln.", kategorie: "Wirksamkeit: Zustand aktivieren", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "tiger-energie-aktivieren", text: "Tiger-Energie bewusst und gezielt aktivieren", erklaerung: "Die eigene kraftvolle, wache Energie bewusst anzapfen, wenn sie gebraucht wird.", kategorie: "Wirksamkeit: Zustand aktivieren", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "embodiment-10-minuten", text: "Embodiment: 10 Minuten gehen, atmen, fühlen, lächeln – wie die Version von mir, der es richtig gut geht", erklaerung: "Zehn Minuten körperlich in den Zustand gehen, der schon gelingt.", kategorie: "Wirksamkeit: Zustand aktivieren", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },

  // Wirksamkeit: Denken & Handeln – mentale Frames und Handlungsmuster
  { id: "mit-dem-ziel-beginnen", text: "Mit dem Ziel beginnen („Erst gewinnen, dann beginnen“)", erklaerung: "Innerlich vom bereits erreichten Ziel aus starten, nicht vom Mangel.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "wort-ereignis-formel", text: "Wort-Ereignis-Formel anwenden", erklaerung: "Bewusst wählen, welche Worte man einem Ereignis gibt – Worte formen die Wirkung.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "utilisieren", text: "Utilisieren: alles, was sich zeigt, wertschätzen und zieldienlich nutzbar machen", erklaerung: "Alles, was auftaucht, als nutzbar betrachten statt als Störung.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "rubikon-prozess", text: "Rubikon-Prozess: mit welcher Haltung komme ich stabil über die Brücke", erklaerung: "Klären, mit welcher inneren Haltung man einen Schritt tatsächlich vollzieht, nicht nur plant.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 2, opportunitaet: 3 },
  { id: "act-defusion", text: "ACT-Defusion üben: „Ich bin nicht meine Gedanken“, beobachten statt verschmelzen, dann begeistert den eigenen Werten zuwenden", erklaerung: "Gedanken beobachten statt sich mit ihnen zu verschmelzen, dann den eigenen Werten zuwenden.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },
  { id: "veraenderung-kreativitaet-leben", text: "Veränderung und Kreativität leben", erklaerung: "Veränderung als Ausdrucksraum nutzen statt als Bedrohung.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 },
  { id: "selbstbestimmung-leben", text: "Selbstbestimmung leben", erklaerung: "Entscheidungen bewusst selbst treffen, statt sie geschehen zu lassen.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 },
  { id: "stille-als-basis", text: "Stille als Basis: Nichtwissen als wunderbare Ausgangssituation schätzen, um neugierig (gemeinsam) zu entdecken, wie es ideal gestaltet werden kann", erklaerung: "Nicht-Wissen als offenen, neugierigen Ausgangspunkt schätzen statt als Mangel.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 1, opportunitaet: 2 },

  // Logische Ebenen nach Robert Dilts (NLP): Umgebung, Verhalten, Fähigkeiten, Werte/Glaubenssätze,
  // Identität, Zugehörigkeit/Vision. Ein Thema auf der richtigen Ebene bearbeiten statt z. B. auf
  // Verhaltensebene zu üben, wenn eigentlich eine Glaubenssatz- oder Identitätsfrage dahintersteckt.
  { id: "logische-ebenen-dilts", text: "Logische Ebenen (Dilts) prüfen: Auf welcher Ebene liegt das Thema wirklich – Umgebung, Verhalten, Fähigkeiten, Werte/Glaubenssätze, Identität oder Zugehörigkeit?", erklaerung: "Ein Thema auf der Ebene bearbeiten, auf der es wirklich sitzt, statt z. B. nur Verhalten zu ändern, wenn ein Glaubenssatz dahintersteckt.", kategorie: "Wirksamkeit: Denken & Handeln", hebelwirkung: 3, aufwand: 2, opportunitaet: 2 }
];

export function scoreOf(item){
  return (item.hebelwirkung * 2) + (item.opportunitaet * 1.5) - item.aufwand;
}
