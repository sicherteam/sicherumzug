import os

GUIDE_MAPPING = {
    "ablauf-entruempelung-wertanrechnung-wiener-altbau.md": "entruempelung",
    "checkliste-haushaltsaufloesung.md": "haushaltsaufloesung",
    "checkliste-wohnungsraeumung-7-schritte.md": "wohnungsaufloesung",
    "haushaltsaufloesung-todesfall.md": "verlassenschaft",
    "kellerraeumung-wien-checkliste.md": "kellerraeumung",
    "kellerraeumung-wien-kosten-feuchtigkeit.md": "kellerraeumung",
    "messie-wohnung-aufloesen.md": "messie",
    "raeumung-wien-uebergabeprotokoll.md": "wohnungsaufloesung",
    "verlassenschaften-wien-schaetzen-wertanrechnung.md": "verlassenschaft",
    "verlassenschaftsankauf-notar-wien.md": "verlassenschaft",
    "was-kostet-eine-haushaltsaufloesung.md": "haushaltsaufloesung",
    "wohnungsuebergabeprotokoll-oesterreich-muster.md": "wohnungsaufloesung",
    "wohnungsentruempelung-wien-guide.md": "entruempelung",
    "gratis-entruempelung-wien.md": "gratis_raeumung",
    "gratis-raeumung-wertanrechnung.md": "gratis_raeumung",
    "ma48-wertausgleich-entrumpelung-wien.md": "entruempelung",
    "delogierung-zwangsraeumung-wien-vermieter.md": "wohnungsaufloesung",
    "firmenauflesung-bueroraeumung-wien-dsgvo.md": "firmenaufloesung",
}

guides_dir = r"C:\Users\Yasin CELIK\Downloads\sicher-team-site\_guides"

for filename, ref_key in GUIDE_MAPPING.items():
    file_path = os.path.join(guides_dir, filename)
    if not os.path.exists(file_path):
        print(f"Skipping {filename} (not found)")
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "partner_reference:" in content:
        print(f"Already has partner_reference: {filename}")
        continue
    
    if content.startswith("---"):
        new_content = "---\npartner_reference: " + ref_key + content[3:]
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Injected {ref_key} into {filename}")
