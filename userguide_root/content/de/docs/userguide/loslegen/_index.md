---
title: Loslegen
weight: 100
description: Erfahren Sie, wie Sie mit dem Doku beginnen, einschließlich der verfügbaren Optionen zum Installieren und Verwenden des Doku-Themes.
---

Wie Sie in unserer Einführung gesehen haben, handelt es sich bei doku um ein Hugo-Theme. Wenn Sie doku verwenden möchten, müssen Sie Ihren Website-Quellcode so einrichten, dass der statische Site-Generator von Hugo die Doku-Theme-Dateien beim Erstellen Ihrer Website finden und verwenden kann. Am einfachsten geht das, indem Sie unsere Beispiel-Website kopieren und bearbeiten. Wir bieten jedoch auch Anleitungen zum manuellen Hinzufügen des Doku-Themes zu neuen oder bestehenden Websites.


## Installation options
Hugo bietet verschiedene Optionen für die Verwendung von Themes, folgende Einbindungen werden von Doku unterstützt:

- Theme als Git-Submodul hinzufügen: Das Hinzufügen des Themes als Git-Submodul ermöglicht Hugo ebenfalls die Verwendung der Theme-Dateien aus dem eigenen Repo. Die Wartung ist jedoch aufwändiger als bei der Verwendung von Hugo-Modulen. Dieser Ansatz wurde bereits in älteren Versionen der Doku-Beispielseite verwendet und wird weiterhin unterstützt.
- Theme-Dateien klonen: Wenn Hugo die Theme-Dateien nicht aus einem externen Repo beziehen muss (z. B. wenn Sie Ihre eigene Kopie des Themes direkt anpassen und pflegen möchten oder Ihre Bereitstellungsoption eine Kopie des Themes in Ihrem Repository erfordert), können Sie die Dateien direkt in den Quellcode Ihrer Website klonen.

