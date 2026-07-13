# Prozessqualität-App

Interne Arbeits-App für Erwin Adelmann (mentaltraining.at). Drei Tabs in einer React/Vite-App:

1. **Kartei** — Themen-Picker über 32 hypnosystemische Verhaltensmuster ("Utilisations-Anteile"): Ursprungsintention, Schutzfunktion, wertschätzende Umbenennung, Umlenkung nach dem Inner-Game-Dreischritt. Vier Muster (People-Pleasing, Harmoniesucht und Anpassung, Klammern und Verlustangst-Verhalten, Opferhaltung) haben zusätzlich einen SSI-Zwischenschritt nach Langlotz. Imposter-Syndrom ist als Referenzbeispiel markiert.
2. **Qualitäts-Check** — Selbstsupervisions-Tool nach zehn Kriterien für saubere hypnosystemische Arbeit. Einträge werden lokal im Browser gespeichert (localStorage, kein Server).
3. **Mein Fokus** — persönlicher Bereich mit Kernvision, eigenem Muster und vier Startpunkten.

Kein Backend, kein Server-State. Alle Daten außer der Muster-Bibliothek sind statisch im Code, Nutzereinträge bleiben lokal im Browser.

## Tech-Stack

React + Vite, reines CSS mit Marken-Variablen (`--primary: #006f6a` etc.), Playfair Display / Lora / Montserrat / Open Sans.

## Datenquelle der Wahrheit

Die Muster-Bibliothek in `src/data/muster.json` ist eine **Kopie** von:

```
/Volumes/Externe/000_Claude/Claude/Projects/Utilisations-Kanon/utilisations-anteile.json
```

Der Kanon dort ist maßgeblich, nicht die Kopie hier. Bei jeder inhaltlichen Änderung im Kanon muss diese Kopie manuell nachgezogen werden.

## Workflow bei Kanon-Updates

1. Kanon-JSON ändern (`utilisations-anteile.json`, Version hochzählen).
2. Datei 1:1 nach `src/data/muster.json` kopieren.
3. `npm run build` lokal ausführen und auf Fehler prüfen.
4. Änderungen committen (`git add -A && git commit -m "..."`).
5. `git push` — Vercel deployt bei verbundenem Repo automatisch bei jedem Push auf den Hauptbranch.

**Standing Reminder:** Die Papier-Test-Phase für den Qualitäts-Check wurde übersprungen (ausdrückliche Anordnung von Erwin). Bei jeder wesentlichen Änderung am Qualitäts-Check-Tool muss aktiv daran erinnert werden, bis Erwin das ablehnt.

## Lokale Entwicklung

```bash
npm install
npm run dev       # Dev-Server mit HMR
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal ansehen
npm run lint      # Oxlint
```

## Deploy (Vercel)

Voraussetzung: GitHub-Repo mit diesem Code, Vercel-Account.

1. Auf [github.com/new](https://github.com/new) ein neues Repo anlegen (z. B. `prozessqualitaet-app`), leer lassen (kein README/gitignore, existiert schon lokal).
2. Im Projektordner:
   ```bash
   git remote add origin https://github.com/DEIN-USERNAME/prozessqualitaet-app.git
   git branch -M main
   git push -u origin main
   ```
3. Auf [vercel.com](https://vercel.com) mit GitHub einloggen, "Add New Project", das Repo auswählen.
4. Vercel erkennt Vite automatisch (Framework Preset: Vite, Build Command: `npm run build`, Output: `dist`) — abgesichert zusätzlich über `vercel.json` in diesem Repo.
5. "Deploy" klicken. Danach deployt Vercel automatisch bei jedem Push auf den verbundenen Branch.

## Offene Punkte

- SSI-Zwischenschritt bei Harmoniesucht, Klammern, Opferhaltung ist Claudes analoge Interpretation des People-Pleasing-Modells — von Erwin in der Praxis noch zu validieren.
- "Box 1" (Methodenbox: Priming, Grundhaltung, Grundannahmen aus dem Imposter-Utilisation-Dokument) als vierter Tab angedacht, noch nicht gebaut.
- Dieses README beschreibt nur die ursprünglichen drei Tabs. Die App hat inzwischen deutlich mehr Tabs (Steuerposition üben, Utilisationsprozess, Utilisations-Begleiter, Methodenbox, Reframing, Inner Game, EMDR, ACT/Defusion, Ressourcen, Fokus-Kompass). Volle Beschreibung noch nachzuziehen.

## Utilisations-Begleiter (neu, 2026-07-13)

Einziger Tab mit echtem Backend-Bedarf. Anders als alle anderen Tabs (statische Referenzkarten) ist das eine live Konversation: Sie schreiben ein Thema, der Begleiter antwortet über die Anthropic-API und führt Sie Schritt für Schritt durch den sechsphasigen Utilisations-Prozess (Modus 1), erkennt aber auch Anteilskonflikte (Modus 3) und bedrohtes Selbst (Modus 4) und wechselt dann automatisch.

**Neue Dateien:**
- `api/utilisationsbegleiter.js` — Vercel-Serverless-Funktion, hält den API-Key serverseitig.
- `src/components/UtilisationsBegleiter.jsx` — Chat-Oberfläche, Konversation wird lokal im Browser gespeichert (localStorage), damit sie einen Reload übersteht. Kein Journal, keine Überführung nach `muster.json` bisher — das ist eine bewusst offene Entscheidung, erst nach einem ersten echten Testlauf zu treffen.

**Vor dem ersten Test nötig, in den Vercel-Projekteinstellungen (Settings → Environment Variables):**
- `ANTHROPIC_API_KEY` — Pflicht. Aus platform.claude.com, eigener Account, getrennt vom Claude-Abo, Prepaid-Guthaben nötig.
- `ANTHROPIC_MODEL` — optional, Standard ist `claude-sonnet-5`. Für geringere Kosten auf `claude-haiku-4-5-20251001` umstellen.

Nach dem Setzen der Variable: Redeploy nötig, damit die Funktion sie sieht.

Geschätzte Kosten pro Sitzung: 0,10–0,15 $ mit Sonnet, 0,03–0,05 $ mit Haiku (Stand Juli 2026, siehe Anthropic-Pricing).
