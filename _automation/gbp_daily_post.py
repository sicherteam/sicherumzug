#!/usr/bin/env python3
"""
Sicher Team - Google Business Profile (GBP) Daily Post Automation
Author: Sicher Team Automation System
Execution: Daily via GitHub Actions / Local Cron
"""

import os
import sys
import json
import datetime
import requests
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

sys.stdout.reconfigure(encoding='utf-8')

ACCOUNT_ID = "110176569759844765357"
LOCATION_ID = "1285258209748978424"

# 31 Daily High-Conversion SEO Posts for Vienna (Rotated by Day of Month)
DAILY_POSTS = [
    # Day 1: Umzug Wien - Fixpreis-Garantie
    {
        "title": "Verbindliche Fixpreis-Garantie für Ihren Umzug Wien",
        "summary": (
            "🚛 Stressfreier Umzug in Wien mit Sicherteam!\n\n"
            "Planen Sie einen Privatumzug, Firmenumzug oder Wohnungsumzug in Wien? "
            "Mit unserer verbindlichen Fixpreis-Garantie erleben Sie keine bösen Überraschungen oder versteckten Zusatzkosten.\n\n"
            "⭐ Das Sicherteam-Leistungsversprechen:\n"
            "✔️ Kostenlose & unverbindliche Vor-Ort-Besichtigung\n"
            "✔️ Geschulte Wiener Möbelpacker mit Handschlagqualität\n"
            "✔️ Fachgerechte Demontage & Möbelmontage\n"
            "✔️ Voll versichert bei der Allianz bis 1 Mio. €\n"
            "✔️ Faire Stundensätze ab 49 € / Std. oder verbindliche Pauschalen\n\n"
            "📍 Wir sind in allen 23 Wiener Bezirken & Niederösterreich für Sie im Einsatz.\n\n"
            "Jetzt unverbindlich anfragen und Wunschtermin sichern!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-wien/"
    },
    # Day 2: Wohnungsumzug Wien - Altbau & Stiegenhaus
    {
        "title": "Wohnungsumzug im Wiener Altbau? Wir meistern jedes Stiegenhaus!",
        "summary": (
            "🏛️ Typisch Wien: Hohe Decken, enge Stiegenhäuser und kein Lift?\n\n"
            "Kein Problem für die erfahrenen Möbelpacker von Sicherteam! "
            "Wir kennen die architektonischen Herausforderungen der Wiener Altbauten wie unsere Westentasche.\n\n"
            "📦 Unser Service für Ihren Wohnungsumzug:\n"
            "✔️ Schonender Möbeltransport mit Tragegurten & Polsterdecken\n"
            "✔️ Professioneller Möbellift / Umzugsaufzug bei engen Treppen\n"
            "✔️ Einrichten einer behördlichen Halteverbotszone (MA 46)\n"
            "✔️ Auf Wunsch: Kompletter Pack- und Montageservice\n\n"
            "Sichern Sie sich jetzt Ihr maßgeschneidertes Fixpreis-Angebot!"
        ),
        "url": "https://sicher-umzug.at/leistungen/privatumzug/"
    },
    # Day 3: Entrümpelung Wien & Räumung
    {
        "title": "Besenreine Entrümpelung & Wohnungsräumung in Wien",
        "summary": (
            "🧹 Wohnungsauflösung, Verlassenschaft oder Kellerentrümpelung geplant?\n\n"
            "Sicherteam ist Ihr diskreter und zuverlässiger Partner für jede Räumung in Wien. "
            "Wir übergeben jede Wohnung pünktlich und besenrein an Hausverwaltung oder Vermieter (z.B. Wiener Wohnen).\n\n"
            "💡 Ihr Vorteil: Faire Wertanrechnung von verwertbaren Möbeln & Antiquitäten senkt Ihre Gesamtkosten!\n\n"
            "✔️ Fachgerechte Mülltrennung & umweltfreundliche Entsorgung (MA 48)\n"
            "✔️ Feste Pauschalpreise ohne Nachforderungen\n"
            "✔️ Express-Räumungen auch kurzfristig möglich\n\n"
            "Kontaktieren Sie uns jetzt für eine kostenfreie Besichtigung!"
        ),
        "url": "https://sicher-umzug.at/leistungen/entruempelung/"
    },
    # Day 4: Möbeltransport & Möbeltaxi Wien
    {
        "title": "Möbeltaxi Wien: Schneller Kleintransport & Einzelmöbel",
        "summary": (
            "🛋️ Neues Sofa gekauft oder Schrank privat erworben?\n\n"
            "Unser Möbeltaxi Wien transportiert Einzelmöbel, Haushaltsgeräte und Kleinfrachten schnell, sicher und günstig durch ganz Wien und Umgebung.\n\n"
            "🚚 Schnell gebucht – prompt geliefert:\n"
            "✔️ Flexible Stundensätze ab 49 € / Std. für Möbelpacker & Transporter\n"
            "✔️ Sofortige Abholung bei Möbelhäusern (IKEA, Mömax, Lutz) oder willhaben\n"
            "✔️ Transport inkl. Trageservice bis direkt in Ihre Wohnung\n"
            "✔️ Schutz durch Stretchfolie, Packdecken & Gurte\n\n"
            "Rufen Sie uns an oder schreiben Sie uns per WhatsApp für die Sofort-Buchung!"
        ),
        "url": "https://sicher-umzug.at/leistungen/moebeltransport/"
    },
    # Day 5: Büroumzug & Firmenumzug Wien
    {
        "title": "Professioneller Büroumzug & Firmenumzug in Wien",
        "summary": (
            "🏢 Standortwechsel Ihres Unternehmens ohne Stillstand im Betriebsablauf!\n\n"
            "Sicherteam plant und realisiert Firmenumzüge in Wien und ganz Österreich mit maximaler Effizienz und Diskretion.\n\n"
            "💼 Unsere B2B-Vorteile:\n"
            "✔️ Wochenend- und Abendservice: Montagmorgen wieder voll einsatzbereit\n"
            "✔️ IT- & Arbeitsplatz-Transport mit speziellem EDV-Schutz\n"
            "✔️ Fachgerechter Ab- und Wiederaufbau von Büromöbeln & Archiven\n"
            "✔️ Aktenvernichtung nach DSGVO bei Büroauflösungen\n\n"
            "Fordern Sie jetzt Ihr detailliertes B2B-Pauschalangebot an!"
        ),
        "url": "https://sicher-umzug.at/leistungen/firmenumzug-wien/"
    },
    # Day 6: Halteverbotszone Wien (MA 46)
    {
        "title": "Halteverbotszone Wien für Ihren Umzug: Rechtzeitig beantragen!",
        "summary": (
            "⛔ Parkplatznot am Umzugstag in Wien? Vermeiden Sie Strafen und lange Tragewege!\n\n"
            "Ein bewilligtes Halteverbot (MA 46) spart Zeit, Geld und Nerven. "
            "Sicherteam kümmert sich um die gesamte Abwicklung für Sie:\n\n"
            "✔️ Behördliche Antragstellung bei der MA 46\n"
            "✔️ Fristgerechte Aufstellung der Schilder (mindestens 48–72 Std. vorher)\n"
            "✔️ Protokollierung der Kennzeichen\n"
            "✔️ Reibungsloser Abbau nach erfolgreichem Umzug\n\n"
            "Fragen Sie unseren Halteverbots-Service direkt bei Ihrer Umzugsanfrage mit an!"
        ),
        "url": "https://sicher-umzug.at/ratgeber/halteverbotszone-umzug-oesterreich/"
    },
    # Day 7: Packservice & Umzugskartons
    {
        "title": "Professioneller Einpackservice: Sicher geschützt ins neue Heim",
        "summary": (
            "📦 Haben Sie keine Zeit oder Lust, wochenlang Umzugskartons zu packen?\n\n"
            "Überlassen Sie das Packen einfach den Profis von Sicherteam! "
            "Mit systematischer Beschriftung und Premium-Verpackungsmaterial ist Ihr gesamtes Hab und Gut optimal geschützt.\n\n"
            "✨ Was wir bieten:\n"
            "✔️ Stabile zweiwellige Umzugskartons, Kleiderboxen & Gläsereinsätze\n"
            "✔️ Polsterung für empfindliches Porzellan, Gläser & Deko\n"
            "✔️ Sorgfältige Raum-für-Raum Beschriftung für leichtes Auspacken\n"
            "✔️ Vollständiger Ein- und Auspackservice nach Wunsch\n\n"
            "Lehnen Sie sich entspannt zurück – wir erledigen den Rest!"
        ),
        "url": "https://sicher-umzug.at/leistungen/moebelmontage/"
    },
    # Day 8: Kunst- & Spezialtransport
    {
        "title": "Kunsttransport & empfindliche Designermöbel in Wien",
        "summary": (
            "🎨 Manche Schätze verlangen besondere Aufmerksamkeit und Fingerspitzengefühl.\n\n"
            "Ob wertvolle Ölgemälde, Skulpturen, historische Kommoden oder empfindliche Designerstücke: "
            "Unser Spezialtransport-Team schützt empfindliche Oberflächen und Unikate mit maßgeschneiderten Verpackungslösungen.\n\n"
            "🛡️ Maximaler Schutz:\n"
            "✔️ Spezialpolsterung & Kantenschutz für Rahmen und Glas\n"
            "✔️ Erschütterungsfreier Transport in gepolsterten Transportern\n"
            "✔️ Vollkasko-Versicherungsschutz bei der Allianz\n\n"
            "Vertrauen Sie auf Wiener Handschlagqualität und langjährige Erfahrung."
        ),
        "url": "https://sicher-umzug.at/leistungen/spezialtransporte/"
    },
    # Day 9: Seniorenumzug Wien
    {
        "title": "Seniorenumzug Wien: Behutsam, geduldig & mit Herz",
        "summary": (
            "👵 Ein Wohnungswechsel im Alter erfordert Verständnis, Geduld und tatkräftige Unterstützung.\n\n"
            "Sicherteam begleitet Seniorinnen und Senioren sowie deren Angehörige einfühlsam beim Umzug in eine barrierefreie Wohnung oder ein Seniorenheim.\n\n"
            "🤍 Unser Rundum-Sorglos-Paket:\n"
            "✔️ Vollständiger Ein- und Auspackservice\n"
            "✔️ Möbelabbau & millimetergenauer Wiederaufbau\n"
            "✔️ Entrümpelung nicht mehr benötigter Einrichtungsgegenstände mit Wertanrechnung\n"
            "✔️ Besenreine Übergabe der alten Wohnung\n\n"
            "Vereinbaren Sie noch heute ein persönliches Beratungsgespräch bei Ihnen vor Ort!"
        ),
        "url": "https://sicher-umzug.at/leistungen/seniorenumzug/"
    },
    # Day 10: Studentenumzug Wien - Günstig & flexibel
    {
        "title": "Studentenumzug Wien: Günstige Stundensätze ab 49 €",
        "summary": (
            "🎓 Umzug ins neue WG-Zimmer, Wohnheim oder die erste eigene Wohnung in Wien?\n\n"
            "Sicherteam bietet faire, transparente Stundensätze ab 49 € / Std. für flexible Umzugshelfer mit Transporter – ideal für studentische Budgets!\n\n"
            "🚀 Ihre Vorteile:\n"
            "✔️ Keine teuren Mindestbuchungszeiten\n"
            "✔️ Flexible Termine auch am Monatsende und am Wochenende\n"
            "✔️ Kräftige Unterstützung beim Tragen und sicheren Verstauen\n"
            "✔️ Schutzdecken und Spanngurte inklusive\n\n"
            "Jetzt online berechnen oder kurz per WhatsApp anfragen!"
        ),
        "url": "https://sicher-umzug.at/leistungen/studentenumzug/"
    },
    # Day 11: Möbelmontage & Tischlerarbeiten
    {
        "title": "Fachgerechte Möbelmontage in Wien: Schnell & passgenau",
        "summary": (
            "🔧 Schränke zerlegen, Betten aufbauen oder Küchenteile anpassen?\n\n"
            "Unsere handwerklich versierten Möbelmonteure sorgen dafür, dass nach dem Umzug alles sofort wieder stabil und einsatzbereit steht.\n\n"
            "🪚 Montageservice von Sicherteam:\n"
            "✔️ Fachgerechte Demontage vor dem Transport & Wiederaufbau\n"
            "✔️ Montage aller Möbelsysteme (PAX, Schiebetüren, Boxspringbetten)\n"
            "✔️ Dübelarbeiten für Spiegel, Lampen & Wandregale\n"
            "✔️ Werkzeug und Montagematerial haben wir immer mit an Bord\n\n"
            "Buchen Sie Ihren Montageservice einfach direkt zum Umzug dazu!"
        ),
        "url": "https://sicher-umzug.at/leistungen/moebelmontage/"
    },
    # Day 12: Fernumzug Österreich (Wien nach Graz, Linz, Salzburg)
    {
        "title": "Fernumzug Österreich: Zuverlässig zwischen allen Bundesländern",
        "summary": (
            "🇦🇹 Übersiedlung von Wien in die Steiermark, nach Oberösterreich, Salzburg oder Tirol?\n\n"
            "Sicherteam verbindet ganz Österreich mit pünktlichen und perfekt organisierten Fernumzügen.\n\n"
            "🛣️ Highlights für Ihren Bundesländer-Umzug:\n"
            "✔️ Garantierte Fixpreise für die gesamte Strecke inkl. Maut & LKW\n"
            "✔️ Pünktliche Be- und Entladung am selben oder Folgetag\n"
            "✔️ Lückenloser Versicherungsschutz während der gesamten Fahrt\n"
            "✔️ Kombinationsfahrten & Beiladungen für günstige Konditionen\n\n"
            "Holen Sie sich jetzt Ihr verbindliches Festpreisangebot für ganz Österreich!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-oesterreich/"
    },
    # Day 13: 1010 Wien Innere Stadt - Umzugsprofi
    {
        "title": "Umzug in 1010 Wien Innere Stadt: Engpässe & Zonen meistern",
        "summary": (
            "🏛️ Umziehen im 1. Wiener Bezirk verlangt exakte Planung und Zufahrtsgenehmigungen.\n\n"
            "Sicherteam kennt die Fußgängerzonen, Ladezonen und Durchfahrtshöhen in 1010 Wien genau. "
            "Wir sorgen für einen reibungslosen Ablauf vom Graben bis zur Ringstraße.\n\n"
            "✔️ Organisation aller Ausnahmegenehmigungen & Halteverbote\n"
            "✔️ Kompakte Transporter für enge historische Gassen\n"
            "✔️ Schutzkanten für Stuck, Portale und historische Böden\n\n"
            "Vertrauen Sie auf den Umzugsexperten für den 1. Bezirk!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-1010-wien/"
    },
    # Day 14: Kellerentrümpelung Wien
    {
        "title": "Kellerentrümpelung Wien: Schaffen Sie endlich wieder Platz!",
        "summary": (
            "🚪 Ist Ihr Kellerabteil in Wien bis unter die Decke vollgestellt?\n\n"
            "Sicherteam befreit Ihren Keller schnell, gründlich und kostengünstig von altem Gerümpel, defekten Geräten und Kisten.\n\n"
            "📦 Schneller Ablauf:\n"
            "✔️ Rasche Besichtigung & verbindlicher Fixpreis\n"
            "✔️ Tragen über enge Kellertreppen übernehmen komplett unsere Packer\n"
            "✔️ Umweltgerechte Trennung & Entsorgung\n"
            "✔️ Besenreine Übergabe des Abteils\n\n"
            "Jetzt anfragen und noch diese Woche mehr Freiraum genießen!"
        ),
        "url": "https://sicher-umzug.at/leistungen/kellerraeumung/"
    },
    # Day 15: Umzugskosten-Rechner
    {
        "title": "Transparente Umzugskosten in Wien: Jetzt online berechnen!",
        "summary": (
            "💰 Was kostet ein Umzug in Wien wirklich?\n\n"
            "Vermeiden Sie unseriöse Lockangebote. Nutzen Sie unseren kostenlosen Umzugskosten-Rechner auf unserer Website und erhalten Sie eine realistische Einschätzung nach Zimmeranzahl, Stockwerk und Zusatzleistungen.\n\n"
            "📊 Volle Kostentransparenz:\n"
            "✔️ Stundensätze ab 49 € / Std. für flexible Umzugshelfer\n"
            "✔️ Pauschalangebote ab 290 € für 1–2 Zimmer Wohnungen\n"
            "✔️ 100% verbindliche Festpreisgarantie nach Besichtigung\n\n"
            "Probieren Sie unseren Online-Rechner jetzt aus!"
        ),
        "url": "https://sicher-umzug.at/umzugskosten-rechner/"
    },
    # Day 16: Auslandsumzug Wien nach Deutschland & EU
    {
        "title": "Auslandsumzug Wien nach Deutschland & Europa",
        "summary": (
            "🌍 Sie ziehen von Wien nach Deutschland oder in ein anderes EU-Land?\n\n"
            "Sicherteam ist Ihr kompetenter Partner für internationale Übersiedlungen mit voller Zoll- und Routenkompetenz.\n\n"
            "✈️ Internationaler Umzugsservice:\n"
            "✔️ Tür-zu-Tür Transport mit eigenem Fuhrpark\n"
            "✔️ Sichere Ladesicherung für weite Autobahnstrecken\n"
            "✔️ Beistellung aller Ausfuhr- und Zolldokumente (z.B. Schweiz)\n"
            "✔️ Terminierte Anlieferung direkt an Ihre neue Auslandsadresse\n\n"
            "Fordern Sie jetzt Ihr unverbindliches Auslandsumzug-Angebot an!"
        ),
        "url": "https://sicher-umzug.at/leistungen/auslandsumzug/"
    },
    # Day 17: Dachbodenräumung Wien
    {
        "title": "Dachbodenräumung in Wien: Fachgerecht & sicher entsorgt",
        "summary": (
            "🏠 Alter Staub, schwere Möbel und steile Stiegen? Dachböden sind echte Herausforderungen.\n\n"
            "Das Entrümpelungsteam von Sicherteam räumt Dachböden und Speicher in ganz Wien sicher, sauber und vorschriftsmäßig leer.\n\n"
            "✔️ Trageservice auch bei fehlendem Aufzug\n"
            "✔️ Überprüfung auf verwertbare Antiquitäten & Wertanrechnung\n"
            "✔️ Besenreine Endreinigung des Dachbodens\n\n"
            "Jetzt unverbindlichen Besichtigungstermin vereinbaren!"
        ),
        "url": "https://sicher-umzug.at/leistungen/dachbodenraeumung/"
    },
    # Day 18: Umzug 1020 & 1030 Wien
    {
        "title": "Umzug in 1020 & 1030 Wien: Leopoldstadt & Landstraße",
        "summary": (
            "🌳 Zwischen Augarten, Prater und Schloss Belvedere ziehen täglich Wiener um.\n\n"
            "Sicherteam ist täglich im 2. und 3. Wiener Gemeindebezirk im Einsatz. Ob Gründerzeithaus oder moderne Wohnhausanlage am Donaukanal – wir sorgen für einen reibungslosen Ablauf.\n\n"
            "✔️ Feste Pauschalpreise ohne Zusatzkosten\n"
            "✔️ Halteverbotszonen vor Ihrer Haustür\n"
            "✔️ Schneller Möbeltransport mit geschultem Personal\n\n"
            "Fragen Sie jetzt für Ihren Bezirkstermin an!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-1020-wien/"
    },
    # Day 19: Checkliste für den Umzug
    {
        "title": "Stressfrei umziehen mit der Sicherteam Umzugscheckliste",
        "summary": (
            "📋 Eine gute Vorbereitung ist die halbe Miete für einen entspannten Umzugstag.\n\n"
            "Wann muss der Mietvertrag gekündigt werden? Ab wann richtet man das Halteverbot ein? "
            "Auf unserem Ratgeber-Portal finden Sie kostenlose Checklisten und Vorlagen für Ihren Umzug in Österreich.\n\n"
            "📌 Top-Tipps für die Planung:\n"
            "✔️ 4 Wochen vorher: Umzugsfirma buchen & Kartons besorgen\n"
            "✔️ 2 Wochen vorher: Halteverbotszone MA 46 anmelden\n"
            "✔️ 1 Woche vorher: Nachsendeauftrag bei der Post einrichten\n\n"
            "Erfahren Sie mehr in unserem Ratgeber!"
        ),
        "url": "https://sicher-umzug.at/ratgeber/umzugscheckliste-oesterreich/"
    },
    # Day 20: Express Notumzug Wien
    {
        "title": "Express Notumzug & kurzfristige Termine in Wien",
        "summary": (
            "⚡ Plötzliche Kündigung, Trennung oder ein Umzugshelfer ist kurzfristig abgesprungen?\n\n"
            "Keine Panik! Sicherteam bietet flexible Notumzüge und kurzfristige Kapazitäten in ganz Wien und Niederösterreich – oft noch am selben oder nächsten Tag.\n\n"
            "🚨 Soforthilfe bei Notumzügen:\n"
            "✔️ Schnelle Zusage per Telefon oder WhatsApp\n"
            "✔️ Sofortige Bereitstellung von Transporter & kräftigen Möbelpackern\n"
            "✔️ Zuverlässige Abwicklung ohne Hektik\n\n"
            "Rufen Sie unsere Hotline an: Wir finden sofort eine Lösung für Sie!"
        ),
        "url": "https://sicher-umzug.at/leistungen/express-notdienst/"
    },
    # Day 21: Umzug 1100 & 1110 Wien
    {
        "title": "Umzugsfirma für Favoriten (1100) & Simmering (1110 Wien)",
        "summary": (
            "🏢 Ob Sonnwendviertel, Reumannplatz oder Simmeringer Hauptstraße: "
            "Sicherteam ist Ihr verlässlicher Umzugspartner im Süden Wiens.\n\n"
            "Wir bieten Ihnen maßgeschneiderte Umzugspakete mit Fixpreis-Garantie, professionellem Packservice und Möbelmontage.\n\n"
            "✔️ Pünktlich & flexibel\n"
            "✔️ Keine Wochenend- oder Feiertagszuschläge\n"
            "✔️ Allianz-Versicherungsschutz bis 1.000.000 € inklusive\n\n"
            "Jetzt unverbindliches Angebot anfordern!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-1100-wien/"
    },
    # Day 22: Gratis Besichtigung & Fixpreisangebot
    {
        "title": "Kostenlose Vor-Ort-Besichtigung in ganz Wien & NÖ",
        "summary": (
            "🔍 Wir schätzen den Aufwand nicht ins Blaue hinein – wir kommen persönlich vorbei!\n\n"
            "Bei Sicherteam ist die Vor-Ort-Besichtigung in allen 23 Wiener Bezirken und im Umland zu 100 % kostenlos und unverbindlich.\n\n"
            "🎯 Ihr Vorteil:\n"
            "✔️ Exakte Einschätzung von LKW-Größe und Personalbedarf\n"
            "✔️ Erkennung von engen Treppen oder Zufahrtsbesonderheiten\n"
            "✔️ Schriftliches, verbindliches Festpreisangebot innerhalb von 24 Stunden\n\n"
            "Buchen Sie Ihren kostenlosen Besichtigungstermin noch heute!"
        ),
        "url": "https://sicher-umzug.at/angebot/"
    },
    # Day 23: Firmenauflösung & Geschäftsräumung
    {
        "title": "Diskrete Firmenauflösung & Geschäftsräumung in Wien",
        "summary": (
            "🏢 Schließung einer Filiale, Praxisaufgabe oder Büroräumung?\n\n"
            "Sicherteam kümmert sich um die vollständige und termingerechte Auflösung Ihrer Gewerbeimmobilie in Wien.\n\n"
            "💼 Professioneller Ablauf:\n"
            "✔️ Schnelle Räumung von Inventar, Regalen & Büromöbeln\n"
            "✔️ DSGVO-konforme Vernichtung sensibler Akten\n"
            "✔️ Wertanrechnung moderner Büromöbel\n"
            "✔️ Besenreine Übergabe an den Vermieter\n\n"
            "Kontaktieren Sie unsere Firmenkunden-Betreuung für ein individuelles Angebot."
        ),
        "url": "https://sicher-umzug.at/leistungen/firmenaufloesung/"
    },
    # Day 24: Umzug 1180 & 1190 Wien (Währing & Döbling)
    {
        "title": "Umzug in Wien 1180 Währing & 1190 Döbling",
        "summary": (
            "🏡 Villengegend, Cottage-Viertel oder historische Weinbauorte: "
            "In Döbling und Währing erfordert der Umzug oft das Rangieren in engen Gassen und Hanglagen.\n\n"
            "Sicherteam ist mit den Gegebenheiten im 18. und 19. Bezirk bestens vertraut.\n\n"
            "✔️ Schonender Transport hochwertiger Einrichtungsgegenstände\n"
            "✔️ Halteverbotszonen in engen Straßen\n"
            "✔️ Geschulte Packer mit höchster Sorgfalt\n\n"
            "Fragen Sie jetzt für Ihren Umzugstermin in Döbling & Währing an!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-1190-wien/"
    },
    # Day 25: Umzugskartons kaufen & liefern lassen
    {
        "title": "Stabile Umzugskartons & Verpackungsmaterial in Wien",
        "summary": (
            "📦 Sparen Sie nicht an der falschen Stelle: Dünne Baumarkt-Kartons reißen leicht und gefährden Ihr Porzellan!\n\n"
            "Sicherteam liefert Ihnen professionelle, zweiwellige Speditionskartons direkt vor Ihre Haustür in Wien.\n\n"
            "🛒 Unser Sortiment:\n"
            "✔️ Standard-Umzugskartons (extra tragfähig)\n"
            "✔️ Bücher- und Geschirrkartons mit Verstärkung\n"
            "✔️ Kleiderboxen mit Kleiderstange für knitterfreie Kleidung\n"
            "✔️ Luftpolsterfolie, Seidenpapier & Packklebeband\n\n"
            "Bestellen Sie Ihr Verpackungspaket bequem zu Ihrem Umzug dazu!"
        ),
        "url": "https://sicher-umzug.at/ratgeber/2026-08-22-umzugskartons-verpackungsmaterial-berechnen/"
    },
    # Day 26: Umzug 1210 & 1220 Wien (Floridsdorf & Donaustadt)
    {
        "title": "Umzugsfirma für Floridsdorf (1210) & Donaustadt (1220 Wien)",
        "summary": (
            "🏙️ Transdanubien wächst rasant! Von der Seestadt Aspern bis nach Floridsdorf ziehen täglich Familien und Singles in moderne Neubauten.\n\n"
            "Sicherteam ist Ihr starker Partner nördlich der Donau mit schnellen Anfahrtswegen und bester Ortskenntnis.\n\n"
            "✔️ Große LKW-Flotte für jeden Bedarf\n"
            "✔️ Möbelmontage & Küchenabbau\n"
            "✔️ Feste Pauschalpreise ohne Überraschungen\n\n"
            "Jetzt unverbindlich anfragen und Wunschtermin sichern!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-wien/"
    },
    # Day 27: Sperrmüllentsorgung Wien
    {
        "title": "Sperrmüllentsorgung Wien: Schnell, sauber & umweltgerecht",
        "summary": (
            "🛋️ Alte Möbel, kaputte Betten oder ausrangierte Matratzen loswerden?\n\n"
            "Bevor der Sperrmüll wertvollen Platz im Hof oder Keller blockiert: Sicherteam holt Ihren Sperrmüll direkt aus der Wohnung ab!\n\n"
            "♻️ Unser Entsorgungsservice:\n"
            "✔️ Wir tragen alles selbst heraus – kein Schleppen für Sie\n"
            "✔️ Zertifizierte Entsorgung nach den strengen Richtlinien der MA 48\n"
            "✔️ Transparente Pauschalpreise\n\n"
            "Gönnen Sie sich einen aufgeräumten Wohnraum – kontaktieren Sie uns jetzt!"
        ),
        "url": "https://sicher-umzug.at/ratgeber/sperrmuell-abholung-wien/"
    },
    # Day 28: Verlassenschaften & Wohnungsauflösung
    {
        "title": "Verlassenschaftsräumung Wien: Feinfühlig & mit Wertanrechnung",
        "summary": (
            "🕯️ Nach einem Todesfall stehen Hinterbliebene vor der emotionalen und organisatorischen Aufgabe, eine Wohnung aufzulösen.\n\n"
            "Sicherteam unterstützt Sie mit Respekt, Einfühlungsvermögen und professioneller Abwicklung.\n\n"
            "⚖️ Unser Service für Verlassenschaften:\n"
            "✔️ Faire Schätzung von Antiquitäten, Sammlungen & Altwaren\n"
            "✔️ Sofortige Wertanrechnung direkt auf der Rechnung\n"
            "✔️ Besenreine Räumung und termingerechte Schlüsselübergabe\n\n"
            "Wir entlasten Sie zuverlässig. Rufen Sie uns für eine diskrete Beratung an."
        ),
        "url": "https://sicher-umzug.at/leistungen/verlassenschaften-wien/"
    },
    # Day 29: Umzug Niederösterreich & Umland
    {
        "title": "Umzug Niederösterreich & Wien-Umgebung: Täglich für Sie da",
        "summary": (
            "🏡 Umzug ins Grüne? Ob Mödling, Baden, Klosterneuburg, Schwechat, Tulln oder Korneuburg:\n\n"
            "Sicherteam ist nicht nur in Wien, sondern auch im gesamten Wiener Umland und in Niederösterreich Ihr erfahrener Speditionspartner.\n\n"
            "🌳 Highlights:\n"
            "✔️ Gleiche günstige Konditionen wie in Wien\n"
            "✔️ Schnelle Anfahrt ohne überhöhte Wegpauschalen\n"
            "✔️ Sichere LKW für den Transport über die Autobahn & Bundesstraßen\n\n"
            "Fordern Sie jetzt Ihr Angebot für Niederösterreich an!"
        ),
        "url": "https://sicher-umzug.at/bundesland/niederoesterreich/"
    },
    # Day 30: Warum Sicherteam Wien?
    {
        "title": "Warum Sicherteam? Wiener Qualität, auf die Sie zählen können!",
        "summary": (
            "🏆 Über 460 zufriedene Kunden und 4.9 Sterne auf Google sprechen für sich!\n\n"
            "Wenn Sie eine seriöse, pünktliche und kundenorientierte Umzugsfirma in Wien suchen, sind Sie bei Sicherteam goldrichtig.\n\n"
            "✅ Ihre 5 Sicherteam-Garantien:\n"
            "1. 100% verbindliche Fixpreis-Garantie\n"
            "2. Keine versteckten Kosten oder böse Überraschungen\n"
            "3. Pünktlichkeit auf die Minute\n"
            "4. Allianz Haftpflichtversicherung bis 1 Mio. €\n"
            "5. Erfahrene, freundliche Möbelpacker mit Handschlagqualität\n\n"
            "Starten Sie Ihren stressfreien Umzug noch heute mit Sicherteam!"
        ),
        "url": "https://sicher-umzug.at/"
    },
    # Day 31: Monatsabschluss & Wochenend-Umzug
    {
        "title": "Wochenend-Umzug in Wien ohne Aufpreis: Sicherteam ist für Sie da!",
        "summary": (
            "📅 Sie können unter der Woche keinen Urlaub für Ihren Umzug nehmen?\n\n"
            "Kein Problem: Bei Sicherteam arbeiten wir 7 Tage die Woche von 06:00 bis 23:00 Uhr – und das ohne unfaire Wochenend- oder Feiertagszuschläge!\n\n"
            "⏰ Unser Wochenend-Vorteil:\n"
            "✔️ Umziehen am Samstag oder Sonntag zu regulären Fixpreisen\n"
            "✔️ Völlig entspannt am Montag im neuen Zuhause aufwachen\n"
            "✔️ Halteverbotszonen für das gesamte Wochenende bewilligt\n\n"
            "Sichern Sie sich frühzeitig Ihren Wunschtermin am Wochenende!"
        ),
        "url": "https://sicher-umzug.at/leistungen/umzug-wien/"
    }
]


def get_credentials():
    """Load and refresh credentials from environment or local file."""
    token_json_str = os.environ.get("GBP_TOKEN_JSON")
    token_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        ".credentials",
        "gbp_token.json"
    )

    if token_json_str:
        print("[INFO] Using GBP credentials from environment variable GBP_TOKEN_JSON.")
        data = json.loads(token_json_str)
        creds = Credentials.from_authorized_user_info(data)
    elif os.path.exists(token_path):
        print(f"[INFO] Using local GBP credentials from {token_path}.")
        creds = Credentials.from_authorized_user_file(token_path)
    else:
        raise RuntimeError("No GBP credentials found! Set GBP_TOKEN_JSON env var or place .credentials/gbp_token.json.")

    if creds.expired:
        print("[INFO] Credentials expired. Refreshing token...")
        creds.refresh(Request())
        if os.path.exists(token_path) and not token_json_str:
            try:
                with open(token_path, "w", encoding="utf-8") as f:
                    f.write(creds.to_json())
                print("[INFO] Updated local token file.")
            except Exception as e:
                print(f"[WARN] Could not update local file: {e}")

    return creds


def validate_post_rules(summary):
    """Enforce strict business rules before publishing."""
    lower = summary.lower()
    assert "klavier" not in lower, "VIOLATION: Klavier found in GBP post!"
    assert "tresor" not in lower, "VIOLATION: Tresor found in GBP post!"
    assert "schwerlast" not in lower, "VIOLATION: Schwerlast found in GBP post!"
    
    # Strictly forbid deceptive low-ball prices ab 29 and ab 59
    import re
    assert not re.search(r'(?<!\d)(?:ab\s*29(?!\d)|29\s*€|29\s*Euro)', summary, re.IGNORECASE), "VIOLATION: 29 € or ab 29 found in GBP post!"
    assert not re.search(r'(?<!\d)(?:ab\s*59(?!\d)|59\s*€|59\s*Euro)', summary, re.IGNORECASE), "VIOLATION: 59 € or ab 59 found in GBP post!"


def publish_daily_post():
    """Publish today's post to Google Business Profile."""
    now = datetime.datetime.now()
    day_idx = (now.day - 1) % len(DAILY_POSTS)
    post_item = DAILY_POSTS[day_idx]

    summary = post_item["summary"]
    url = post_item["url"]

    # Validate rules
    validate_post_rules(summary)

    print(f"\n=======================================================")
    print(f"[GBP POST] Date: {now.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"[GBP POST] Day index: {day_idx + 1} / {len(DAILY_POSTS)}")
    print(f"[GBP POST] Title: {post_item['title']}")
    print(f"[GBP POST] Target URL: {url}")
    print(f"=======================================================\n")

    creds = get_credentials()
    headers = {
        "Authorization": f"Bearer {creds.token}",
        "Content-Type": "application/json"
    }

    payload = {
        "languageCode": "de",
        "summary": summary,
        "callToAction": {
            "actionType": "LEARN_MORE",
            "url": url
        },
        "topicType": "STANDARD"
    }

    api_url = f"https://mybusiness.googleapis.com/v4/accounts/{ACCOUNT_ID}/locations/{LOCATION_ID}/localPosts"
    res = requests.post(api_url, headers=headers, json=payload, timeout=20)

    print(f"[RESPONSE] HTTP Status: {res.status_code}")
    if res.status_code in (200, 201):
        resp_data = res.json()
        print(f"[SUCCESS] Post published live on GBP! Name: {resp_data.get('name')}")
        return True
    else:
        print(f"[ERROR] Failed to post: {res.text}")
        sys.exit(1)


if __name__ == "__main__":
    publish_daily_post()
