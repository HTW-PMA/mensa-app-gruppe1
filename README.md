﻿# mensa-app-gruppe1

 Beschreibung: 
 Die Mensa Marvel App ist eine benutzerfreundliche Anwendung, die entwickelt wurde, um Studenten und anderen Mensa-Besuchern das Auffinden und Erkunden von nahegelegenen Mensen zu erleichtern. Mit der App können Benutzer schnell und einfach das Tagesmenü, spezielle Angebote und die Öffnungszeiten der nächstgelegenen Mensa anzeigen lassen.

Hauptfunktionen:
Standortbasiertes Suchen: Automatische Erkennung und Anzeige der nächstgelegenen Mensa basierend auf dem aktuellen Standort des Benutzers.
Sortierbare Mensaliste: Möglichkeit, Mensen nach Name, Postleitzahl, Bezirk und Öffnungszeiten zu sortieren.
Statusanzeige: Anzeigen, ob eine Mensa geöffnet, demnächst schließt oder geschlossen ist, um die Besuchsplanung zu erleichtern.
Lokale Speicherung von Positionsdaten: Optimierung der Berechnungszeit und Verbesserung der Privatsphäre durch lokale Speicherung der Positionsdaten.
API-Integration: Abrufen von Gerichten von einer API, während Mensanamen lokal in IndexedDB gespeichert werden.
Fallback-Mechanismus: Nahtloser Übergang zu API oder temporären Daten bei Problemen mit IndexedDB.

 Anweisungen:
Abhängigkeiten installieren:
npm install

Entwicklungsserver starten:
npm run dev

Weitere nützliche Anweisungen:

Erstellt eine Produktionsversion der Anwendung im dist-Verzeichnis:
npm run build

Führt die Produktionsversion der Anwendung lokal aus:
npm run preview

Formatiert den gesamten Code gemäß den Prettier-Regeln in der .prettierrc Datei:
npm run format

Führt eine statische Code-Analyse durch, um Fehler, Stilprobleme und Verstöße gegen die in der .eslintrc.cjs definierten ESLint-Regeln, einschließlich der Prettier-Regeln, zu identifizieren und zu beheben.
npm run lint

