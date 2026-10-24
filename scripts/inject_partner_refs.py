import os
import re

MAPPING = {
    "haushaltsaufloesung.md": "haushaltsaufloesung",
    "haushaltsaufloesung-ueberblick.md": "haushaltsaufloesung",
    "wohnungsaufloesung.md": "wohnungsaufloesung",
    "verlassenschaft.md": "verlassenschaft",
    "kellerraeumung.md": "kellerraeumung",
    "messie-entruempelung.md": "messie",
    "firmenaufloesung.md": "firmenaufloesung",
    "gratis-raeumung.md": "gratis_raeumung",
    "gratis-entruempelung.md": "gratis_raeumung",
    "dachbodenraeumung.md": "kellerraeumung",
    "garagenraeumung.md": "kellerraeumung",
    "gastronomie-raeumung.md": "firmenaufloesung",
}

services_dir = r"C:\Users\Yasin CELIK\Downloads\sicher-team-site\_services"

for filename, ref_key in MAPPING.items():
    file_path = os.path.join(services_dir, filename)
    if not os.path.exists(file_path):
        print(f"Skipping {filename} (not found)")
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "partner_reference:" in content:
        print(f"Already has partner_reference: {filename}")
        continue
    
    # Inject after first ---
    if content.startswith("---"):
        new_content = "---\npartner_reference: " + ref_key + content[3:]
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Injected {ref_key} into {filename}")
    else:
        print(f"No frontmatter in {filename}")
