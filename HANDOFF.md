# Übergabe-Prompt: Prozessqualität-App fertigstellen und auf Vercel deployen

Diesen Text als erste Nachricht in einer neuen Session verwenden, wenn der Ordner
`/Volumes/Externe/000_Claude/Claude/Projects/prozessqualitaet-app` verbunden ist.

---

## Kontext

Ich bin Erwin Adelmann, Coach (mentaltraining.at) mit hypnosystemischer Methodik
(Utilisation, Inner Game, Rubikon, ZRM). Ich habe bereits eine fertige, lokal
getestete React/Vite-App gebaut: **Prozessqualität-App**, Ordner
`prozessqualitaet-app` im verbundenen Projektordner.

Die App ist inhaltlich fertig und lokal gebaut (`npm run build` läuft fehlerfrei),
ein lokales Git-Repo mit Commits existiert bereits. Was fehlt: GitHub-Repo
anlegen/verbinden, Push, Vercel-Projekt verbinden, Deploy. Diese Schritte
brauchen meine eigenen Zugangsdaten/Logins — führe sie nicht selbst aus,
sondern leite mich Schritt für Schritt an bzw. bereite alles vor, was ohne
meine Credentials vorbereitbar ist (z. B. `vercel.json`, Build-Konfiguration,
README mit Deploy-Anleitung).

## Was die App inhaltlich ist

Drei Tabs in einer einzigen App:

1. **Kartei** — Themen-Picker und Suchfunktion über 32 hypnosystemische
   Verhaltensmuster ("Utilisations-Anteile"). Jedes Muster hat: Ursprungsintention,
   Schutzfunktion, eine wertschätzende Umbenennung (alt → neu), und eine
   Umlenkung nach dem Inner-Game-Dreischritt (Gallwey: Wahrnehmen /
   dem wahren Selbst anvertrauen mit der Bitte, es zu erfüllen / Lernen ohne
   Selbstkritik). Ein Muster (Imposter-Syndrom) ist als Referenz-Beispiel
   markiert. Vier Muster (People-Pleasing, Harmoniesucht und Anpassung,
   Klammern und Verlustangst-Verhalten, Opferhaltung) haben zusätzlich einen
   vorgeschalteten Zwischenschritt "Systemische Selbstintegration nach
   Langlotz" (Kontakt zum wahren Selbst und Abgrenzungsfähigkeit vor dem
   eigentlichen Inner-Game-Schritt), weil bei diesen vieren eine tiefere,
   kindheitsbezogene Prägung angenommen wird.

2. **Qualitäts-Check** — Selbstsupervisions-Tool basierend auf zehn Kriterien
   für saubere hypnosystemische Arbeit (Quelle: mein eigenes PDF "Utilisation
   prüfen"). Einträge werden lokal im Browser gespeichert (localStorage,
   kein Server), inklusive einer "Wiederkehrende Schwachstellen"-Auswertung
   über die Zeit.

3. **Mein Fokus** — persönlicher, visuell hervorgehobener Bereich mit meiner
   Kernvision ("Sehnsucht"), meinem eigenen Muster (Disziplin/Selbstkritik/
   Kontrolle) im selben Utilisations-Schema, und vier "Startpunkten"
   (Mein Quellenweg, Mein Buch, Meine Apps, Andere Produkte/Priming-Evidenz)
   mit unterschiedlichem Reifegrad-Badge (etabliert / entwicklung / evidenz).

## Technischer Stand

- React + Vite, einfaches CSS mit Marken-Variablen (`--primary: #006f6a` etc.,
  Playfair Display / Lora / Montserrat / Open Sans), kein Backend.
- Datenquelle der Wahrheit: `/Volumes/Externe/000_Claude/Claude/Projects/Utilisations-Kanon/utilisations-anteile.json`
  (aktuell Version 1.4, 32 Muster). Wird 1:1 nach `src/data/muster.json`
  kopiert. Bei jeder Änderung im Kanon muss diese Kopie aktualisiert und
  neu gebaut werden.
- Komponenten: `src/components/Kartei.jsx`, `QualitaetsCheck.jsx`,
  `MeinFokus.jsx`, gesteuert über Tab-State in `src/App.jsx`.
- `npm run build` zuletzt erfolgreich, Bundle circa 245 kB / 74 kB gzip.
- Lokales Git-Repo vorhanden, `.gitignore` für `node_modules`/`dist` gesetzt,
  zwei Commits. Kein Remote, kein Deploy bisher.

## Offene inhaltliche Punkte, die ich selbst entscheiden muss

- Standing Reminder: Ich habe eine Papier-Test-Phase für den Qualitäts-Check
  übersprungen und ausdrücklich angeordnet, bei jeder wesentlichen Änderung
  daran erinnert zu werden, bis ich das ablehne. Diese Erinnerung bleibt aktiv.
- Der SSI-Zwischenschritt bei den drei erweiterten Mustern (Harmoniesucht,
  Klammern, Opferhaltung) ist Claudes analoge Interpretation meines
  People-Pleasing-Modells, nicht von mir im Detail geprüft. Sollte ich in der
  Praxis noch validieren.
- "Box 1" (Methodenbox mit Priming, Grundhaltung, Grundannahmen etc. aus
  meinem Imposter-Utilisation-Dokument) ist als vierter Tab angedacht, aber
  noch nicht gebaut.

## Aufgabe für diese Session

1. Aktuellen Stand von `prozessqualitaet-app` prüfen (Build, Datenintegrität
   gegen den Kanon).
2. Mich durch GitHub-Repo-Erstellung und Push anleiten (ich mache die
   Authentifizierung selbst).
3. Mich durch Vercel-Projekt-Verbindung und ersten Deploy anleiten.
4. Deploy-Doku ins README schreiben, damit künftige Kanon-Updates sauber
   nachgezogen werden können (Kanon-JSON ändern → `muster.json` synchronisieren
   → build → commit → push → Vercel deployt automatisch bei verbundenem Repo).
