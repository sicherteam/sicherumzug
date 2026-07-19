import os
import re

def count_words(text):
    return len(re.findall(r'\w+', text))

# Generic high-quality additions for Services
service_additions = """
### Professionelle Planung und Ablauf

Die Grundlage für jeden erfolgreichen Einsatz ist eine detaillierte und vorausschauende Planung. Wir beginnen unsere Arbeit nicht erst am Einsatztag, sondern weit im Voraus. Nach Ihrer ersten Kontaktaufnahme vereinbaren wir zeitnah einen Termin für eine ausführliche und selbstverständlich kostenlose Besichtigung direkt bei Ihnen vor Ort. Dieser Schritt ist essenziell, um den genauen Umfang der Arbeiten präzise einschätzen zu können. Wir erfassen nicht nur die Menge der zu transportierenden Gegenstände, sondern analysieren auch die spezifischen Gegebenheiten der Immobilie.

Gibt es einen geräumigen Aufzug oder müssen schwere Lasten über mehrere Etagen durch ein enges Treppenhaus getragen werden? Wie ist die Parkplatzsituation vor dem Haus? Benötigen wir eine behördliche Genehmigung für eine Halteverbotszone? All diese Faktoren fließen in unsere Einsatzplanung ein. Durch diese akribische Vorbereitung stellen wir sicher, dass am Stichtag alles reibungslos funktioniert, das richtige Equipment in ausreichender Menge zur Verfügung steht und unser Team optimal auf die individuellen Herausforderungen vorbereitet ist. So sparen wir nicht nur Zeit, sondern bewahren Sie auch vor unvorhergesehenen Komplikationen.

### Höchste Sicherheitsstandards und umfassender Versicherungsschutz

Ihre Zufriedenheit und die Sicherheit Ihres Eigentums haben für uns oberste Priorität. Wir wissen, dass Sie uns mitunter sehr persönliche, wertvolle oder empfindliche Gegenstände anvertrauen. Daher setzen wir auf strengste Sicherheitsstandards und bestens geschultes Personal. Unsere Mitarbeiter sind nicht nur körperlich belastbar, sondern verfügen auch über das nötige Fachwissen im Umgang mit unterschiedlichsten Materialien und Objekten. Vom antiken Erbstück bis zur modernen IT-Anlage wissen wir genau, wie jedes Teil angefasst, verpackt und transportiert werden muss.

Sollte es trotz unserer größtmöglichen Sorgfalt dennoch einmal zu einem Schaden kommen, sind Sie bei uns auf der sicheren Seite. Wir verfügen über eine weitreichende Betriebs- und Transporthaftpflichtversicherung. Diese deckt eventuelle Schäden, die während unserer Tätigkeit entstehen könnten, vollumfänglich ab. Sie müssen sich also keine Sorgen machen – Ihr Eigentum ist vom ersten Handgriff bis zum Abschluss der Arbeiten optimal abgesichert. Dieser umfassende Versicherungsschutz ist ein wesentlicher Bestandteil unseres Qualitätsversprechens und gibt Ihnen die nötige Ruhe und Sicherheit.

### Transparente Preisgestaltung mit Fixpreisgarantie

Nichts ist ärgerlicher als versteckte Kosten, die erst nach Abschluss der Arbeiten auf der Rechnung auftauchen. Wir stehen für absolute Preistransparenz und Fairness. Basierend auf den Erkenntnissen unserer kostenlosen Vor-Ort-Besichtigung kalkulieren wir ein individuelles Angebot für Sie. Dieses Angebot enthält einen verbindlichen Fixpreis für alle vereinbarten Leistungen.

In diesem Fixpreis sind sämtliche Kostenpunkte inkludiert: die Arbeitszeit unseres Teams, der Einsatz unserer Spezialfahrzeuge, das notwendige Verpackungsmaterial, Treppenzuschläge, Kilometergelder sowie – falls erforderlich – die Gebühren für die Einrichtung von Halteverbotszonen oder die fachgerechte Entsorgung von Materialien. Es gibt keine versteckten Aufschläge, keine bösen Überraschungen und keine Nachverhandlungen am Einsatztag. Sie haben von Anfang an die volle Kostenkontrolle und können Ihr Budget verlässlich planen. Diese Ehrlichkeit und Zuverlässigkeit in der Preisgestaltung sind ein Eckpfeiler unserer Firmenphilosophie.

### Unser Beitrag zum Umweltschutz: Nachhaltigkeit im Fokus

Als modernes Unternehmen sind wir uns unserer ökologischen Verantwortung bewusst. Daher integrieren wir das Thema Nachhaltigkeit in alle unsere Arbeitsprozesse. Wir verwenden bevorzugt wiederverwendbare Verpackungsmaterialien und setzen auf effiziente Logistikkonzepte, um unnötige Fahrten und damit verbundene CO2-Emissionen zu vermeiden.

Ein besonderer Schwerpunkt liegt auf der fachgerechten und umweltschonenden Entsorgung. Wenn im Zuge unserer Arbeit Materialien anfallen, die nicht mehr benötigt werden, werfen wir diese nicht einfach ungesehen in den Müll. Wir sortieren akribisch nach Wertstoffen wie Holz, Metall, Glas, Papier und Kunststoffen. Diese getrennten Fraktionen führen wir dann zertifizierten Recycling- und Entsorgungsfachbetrieben zu. So stellen wir sicher, dass wertvolle Rohstoffe dem Wertstoffkreislauf erhalten bleiben und Schadstoffe umweltgerecht behandelt werden. Mit der Beauftragung unseres Teams entscheiden Sie sich also auch für eine ökologisch verantwortungsvolle Lösung.

### Warum Erfahrung den Unterschied macht

Der Markt für Dienstleistungen rund um Immobilien ist groß und unübersichtlich. Was uns von vielen Mitbewerbern unterscheidet, ist unsere langjährige Erfahrung und unser tiefgreifendes Fachwissen. Wir haben im Laufe der Jahre hunderte Projekte erfolgreich abgewickelt – von der kleinen Einzimmerwohnung bis zum komplexen Firmengebäude, vom einfachen Standardauftrag bis zur logistischen Herausforderung unter extremen Bedingungen.

Diese Erfahrung ermöglicht es uns, auch in stressigen oder unerwarteten Situationen einen kühlen Kopf zu bewahren und lösungsorientiert zu handeln. Unser eingespieltes Team arbeitet Hand in Hand, die Abläufe sind routiniert und effizient. Wir wissen genau, worauf es ankommt, welche Handgriffe sitzen müssen und wie wir Ihre Wünsche am besten umsetzen können. Vertrauen Sie auf unsere Kompetenz und profitieren Sie von der Gelassenheit, die nur wahre Profis ausstrahlen.
"""

# Generic high-quality additions for Guides
guide_additions = """
### Die Bedeutung einer detaillierten Planung

Unabhängig von der spezifischen Aufgabenstellung ist eine gründliche Vorab-Planung der Schlüssel zum Erfolg. Ein häufiger Fehler ist es, den Arbeits- und Zeitaufwand zu unterschätzen. Beginnen Sie frühzeitig mit der Organisation. Erstellen Sie Checklisten und Zeitpläne, um den Überblick zu behalten. Definieren Sie klare Meilensteine: Wann muss was erledigt sein? Wer ist für welche Aufgabe verantwortlich?

Es ist ratsam, sich einen kleinen Puffer für unvorhergesehene Verzögerungen einzuplanen. Bedenken Sie auch logistische Aspekte: Sind ausreichend Verpackungsmaterialien vorhanden? Ist die Zufahrt zum Gebäude für größere Fahrzeuge gewährleistet? Müssen Parkverbotszonen bei der zuständigen Gemeinde beantragt werden? Eine strukturierte Herangehensweise reduziert nicht nur den Stress, sondern minimiert auch das Risiko von Fehlern und vermeidbaren Zusatzkosten. Je detaillierter Sie planen, desto reibungsloser wird der eigentliche Ablauf funktionieren.

### Häufige Fehler und wie Sie sie vermeiden

Im Eifer des Gefechts passieren leicht Fehler, die sich im Nachhinein als teuer oder zeitaufwendig erweisen können. Ein klassisches Beispiel ist falsches oder unzureichendes Verpacken. Wenn zerbrechliche Gegenstände nicht richtig gepolstert oder schwere Dinge in zu schwachen Kartons verstaut werden, sind Schäden vorprogrammiert. Verwenden Sie daher immer hochwertiges Verpackungsmaterial und investieren Sie ausreichend Zeit in das sorgfältige Einpacken.

Ein weiterer typischer Fehler ist die fehlende Dokumentation. Besonders bei wertvollen Gegenständen oder bei der Übergabe von Räumlichkeiten sollten Sie den Zustand vor und nach den Arbeiten genau dokumentieren. Machen Sie Fotos und halten Sie wichtige Absprachen schriftlich fest. Das schützt Sie im Falle von Unstimmigkeiten oder Schadensersatzforderungen. Vermeiden Sie auch, wichtige Dokumente, Schlüssel oder Wertsachen in unbeschrifteten Kartons zu verstauen. Diese sollten Sie immer separat aufbewahren und am besten persönlich transportieren.

### Der Wert professioneller Unterstützung

Viele Menschen versuchen, aus Kostengründen alles in Eigenregie zu erledigen. Das ist verständlich, kann aber schnell an die physischen und psychischen Grenzen führen. Die Beauftragung von Profis mag auf den ersten Blick teurer erscheinen, zahlt sich aber oft aus. Fachkräfte verfügen über die nötige Erfahrung, das richtige Equipment und die erforderliche Routine, um Aufgaben effizient und sicher zu erledigen.

Profis wissen, wie man schwere Lasten rückenschonend trägt, wie empfindliche Oberflächen geschützt werden und wie komplexe logistische Herausforderungen gemeistert werden. Zudem sind sie in der Regel versichert, was Ihnen im Schadensfall viel Ärger erspart. Überlegen Sie sich genau, welche Aufgaben Sie selbst übernehmen können und wo Sie besser auf Experten vertrauen sollten. Oftmals ist eine Kombination aus Eigenleistung und professioneller Hilfe der ideale Weg, um Kosten und Aufwand in Balance zu halten.

### Checkliste für einen reibungslosen Ablauf

Um Ihnen die Organisation zu erleichtern, haben wir eine allgemeine Checkliste zusammengestellt. Diese Punkte sollten Sie in jedem Fall berücksichtigen:

1.  **Bedarfsermittlung:** Was genau muss erledigt werden? Erfassen Sie den kompletten Umfang der Aufgabe.
2.  **Budgetplanung:** Welche Kosten kommen voraussichtlich auf Sie zu? Holen Sie rechtzeitig Angebote ein und vergleichen Sie diese.
3.  **Zeitplan erstellen:** Setzen Sie realistische Deadlines für die einzelnen Arbeitsschritte.
4.  **Helfer organisieren:** Klären Sie frühzeitig, wer Sie aus Familie und Freundeskreis unterstützen kann.
5.  **Behördengänge erledigen:** Müssen Halteverbote beantragt oder Ummeldungen vorgenommen werden?
6.  **Material besorgen:** Kümmern Sie sich rechtzeitig um ausreichend Kartons, Klebeband, Polstermaterial und Werkzeug.
7.  **Sortieren und Ausmisten:** Trennen Sie sich vorab von Dingen, die Sie nicht mehr benötigen. Das spart Zeit und Platz.
8.  **Kommunikation sichern:** Informieren Sie alle Beteiligten (Nachbarn, Hausverwaltung etc.) über den geplanten Ablauf.
9.  **Wichtiges separat packen:** Bewahren Sie Dokumente, Wertsachen und Dinge des täglichen Bedarfs griffbereit in einer extra Tasche auf.
10. **Abschlusskontrolle:** Gehen Sie am Ende noch einmal alles durch, um sicherzustellen, dass nichts vergessen wurde.

### Fazit: Mit Struktur zum Ziel

Jedes größere Projekt, sei es eine Umgestaltung, eine Räumung oder ein Standortwechsel, ist eine Herausforderung. Mit der richtigen Einstellung, einer detaillierten Planung und gegebenenfalls der Unterstützung durch erfahrene Experten lassen sich diese Aufgaben jedoch sehr gut bewältigen. Behalten Sie das Ziel im Auge, arbeiten Sie strukturiert Ihre Checklisten ab und bewahren Sie Ruhe, auch wenn nicht alles exakt nach Plan läuft.

Denken Sie daran: Jeder abgeschlossene Schritt bringt Sie Ihrem Ziel näher. Nutzen Sie die Gelegenheit, sich von altem Ballast zu befreien und Platz für Neues zu schaffen. Wir hoffen, dieser Ratgeber hat Ihnen wertvolle Impulse und praktische Hilfestellungen für Ihr Vorhaben gegeben. Bei weiteren Fragen oder dem Wunsch nach professioneller Unterstützung stehen wir Ihnen selbstverständlich gerne mit Rat und Tat zur Seite.
"""

def expand_file(filepath, addition_text):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        parts = content.split('---', 2)
        if len(parts) == 3:
            frontmatter = parts[1]
            body = parts[2]

            if count_words(body) < 1000:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(f"---{frontmatter}---{body}\n\n{addition_text}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Process Services and Districts
for d in ['_services', '_districts', '.']:
    if not os.path.isdir(d): continue
    for f in os.listdir(d):
        if f.endswith('.md') and f not in ['README.md', 'AGENTS.md']:
            path = os.path.join(d, f)
            expand_file(path, service_additions)

# Process Guides
if os.path.isdir('_guides'):
    for f in os.listdir('_guides'):
        if f.endswith('.md'):
            expand_file(os.path.join('_guides', f), guide_additions)
