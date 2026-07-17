import os
import re

states_dir = '_states'

def update_frontmatter_order_and_content(filename, order, is_tirol=False, is_vorarlberg=False):
    filepath = os.path.join(states_dir, filename)
    if not os.path.exists(filepath):
        # Create a stub if it doesn't exist
        with open(filepath, 'w') as f:
            title = filename.replace('.md', '').capitalize()
            f.write(f"---\ntitle: \"{title}\"\nseo_title: \"Umzug & Übersiedlung {title} | Sicher Team\"\ndescription: \"Professioneller Umzug und Übersiedlung in {title}. Sicher Team bietet Transporte zum Fixpreis.\"\nkicker: \"Bundesland\"\norder: {order}\nhero_image: /topbg.webp\n---\n## Umzug & Übersiedlung in {title}\n\nAls zuverlässiger Partner für Übersiedlungen in {title} sorgen wir für einen stressfreien Umzug. \n\n## Räumung & Entrümpelung (Zusatzleistungen)\n\nAuf Wunsch übernehmen wir nach dem Auszug auch die besenreine Räumung und Entrümpelung.")
        return

    with open(filepath, 'r') as f:
        content = f.read()

    # Update order
    if re.search(r'^order:.*$', content, re.MULTILINE):
        content = re.sub(r'^order:.*$', f'order: {order}', content, flags=re.MULTILINE)
    else:
        content = re.sub(r'---', f'---\norder: {order}', content, count=1)

    # Restructure content
    # Look for H2 headers and adjust them

    parts = content.split('---', 2)
    if len(parts) == 3:
        frontmatter = parts[1]
        body = parts[2]

        # update frontmatter seo title & description to focus on Umzug
        if re.search(r'^seo_title:.*$', frontmatter, re.MULTILINE):
            state = filename.replace('.md', '').capitalize()
            if filename == 'niederoesterreich.md': state = 'Niederösterreich'
            elif filename == 'oberoesterreich.md': state = 'Oberösterreich'
            elif filename == 'kaernten.md': state = 'Kärnten'

            frontmatter = re.sub(r'^seo_title:.*$', f'seo_title: "Umzug & Übersiedlung {state} | Sicher Team"', frontmatter, flags=re.MULTILINE)

        if re.search(r'^description:.*$', frontmatter, re.MULTILINE):
             frontmatter = re.sub(r'^description:.*$', f'description: "Professionelle Umzugs- und Übersiedlungsdienste in {state}. Wir bieten Transporte und als Zusatzleistung Räumungen an."', frontmatter, flags=re.MULTILINE)

        # restructure body
        new_body = f"\n\n## Umzug & Übersiedlung (Moving & Relocation)\n\nAls Ihr verlässlicher Partner in {state} organisieren wir Ihren Privatumzug oder Firmenumzug professionell, sicher und zum Fixpreis. Unser Team kümmert sich um den reibungslosen Möbeltransport, die sichere Verpackung und die Demontage.\n\n## Räumung & Entrümpelung (Clearing & Cleanouts) als Zusatzleistung\n\nAls ergänzende Leistung zu unserem Umzugsservice bieten wir nach dem Auszug auf Wunsch auch eine besenreine Haushaltsauflösung oder Entrümpelung an. "

        new_body += "\n\n" + re.sub(r'^## .*$', lambda m: "### " + m.group(0)[3:], body, flags=re.MULTILINE)

        content = f"---{frontmatter}---{new_body}"

    with open(filepath, 'w') as f:
        f.write(content)

states_order = [
    'tirol.md',
    'wien.md',
    'niederoesterreich.md',
    'burgenland.md',
    'oberoesterreich.md',
    'salzburg.md',
    'steiermark.md',
    'kaernten.md',
    'vorarlberg.md'
]

for i, state in enumerate(states_order):
    update_frontmatter_order_and_content(state, i+1)
