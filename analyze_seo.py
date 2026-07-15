import os
import re
from collections import defaultdict

import frontmatter
import yaml


def has_front_matter(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.readline().strip() == "---"
    except OSError:
        return False


def iter_content_files(root_dir):
    collection_dirs = ["_services", "_districts", "_guides", "_states"]
    for collection in collection_dirs:
        dir_path = os.path.join(root_dir, collection)
        if not os.path.isdir(dir_path):
            continue
        for file_name in os.listdir(dir_path):
            if not file_name.endswith(".md"):
                continue
            rel = os.path.join(collection, file_name)
            abs_path = os.path.join(root_dir, rel)
            if os.path.isfile(abs_path):
                yield rel, abs_path

    for file_name in os.listdir(root_dir):
        if not file_name.endswith(".md"):
            continue
        abs_path = os.path.join(root_dir, file_name)
        if os.path.isfile(abs_path):
            yield file_name, abs_path


def analyze_seo(root_dir):
    top_transactional_guides = {
        "_guides/was-kostet-eine-haushaltsaufloesung.md",
        "_guides/ma48-vs-firma.md",
        "_guides/ma48-mistplatz-checkliste.md",
        "_guides/ma48-entruempelung-kosten-ablauf.md",
        "_guides/entruempelungsangebot-wien-ma48.md",
        "_guides/wohnungsaufloesung-nach-todesfall.md",
        "_guides/nachlassverbindlichkeiten-wohnungsaufloesung.md",
        "_guides/entruempelung-steuer-absetzen-wien.md",
        "_guides/wertanrechnung-guide.md",
        "_guides/wertausgleich-raeumung-wien.md",
        "_guides/gebrauchte-moebel-verkaufen-wien.md",
        "_guides/entruempelungsdienst-oder-entruempelungsfirma.md",
        "_guides/raeumungsfirma-wien-checkliste.md",
        "_guides/wohnungsentruempelung-wien-guide.md",
        "_guides/raeumung-wien-uebergabeprotokoll.md",
        "_guides/express-entruempelung-container-logistik.md",
        "_guides/halteverbot-entrumpelung-wien.md",
        "_guides/hausraeumung-wien-checkliste.md",
        "_guides/kellerraeumung-wien-checkliste.md",
        "_guides/dachboden-raeumung-wien-checkliste.md",
    }
    regional_index_guides = {
        "_guides/burgenland-nord-standorte.md",
        "_guides/niederoesterreich-umland-standorte.md",
        "_guides/entruempelung-oesterreich-standorte.md",
    }

    description_to_files = defaultdict(list)
    title_to_files = defaultdict(list)
    permalink_to_files = defaultdict(list)
    missing_descriptions = []
    short_descriptions = []
    missing_guide_dates = []
    guide_primary_queries = defaultdict(list)
    target_guide_low_words = []
    target_guide_low_links = []
    target_guide_missing_offer_link = []
    guide_low_word_target = []
    guide_high_word_target = []
    guide_question_heading_gaps = []
    guide_low_faq_count = []
    guide_link_target_mismatch = []
    district_thin_content = []
    district_low_internal_links = []
    district_missing_offer_link = []
    district_low_word_target = []
    district_high_word_target = []
    district_question_heading_gaps = []
    district_low_faq_count = []
    district_link_target_mismatch = []
    scanned_files = 0
    target_guides = {
        "_guides/wohnungsaufloesung-nach-todesfall.md",
        "_guides/nachlassverbindlichkeiten-wohnungsaufloesung.md",
        "_guides/entruempelung-steuer-absetzen-wien.md",
        "_guides/ma48-mistplatz-checkliste.md",
        "_guides/gebrauchte-moebel-verkaufen-wien.md",
        "_guides/ma48-vs-firma.md",
        "_guides/was-kostet-eine-haushaltsaufloesung.md",
    }

    for rel_path, abs_path in iter_content_files(root_dir):
        if not has_front_matter(abs_path):
            continue

        try:
            post = frontmatter.load(abs_path)
        except (OSError, ValueError, yaml.YAMLError) as exc:
            print(f"Error processing {rel_path}: {exc}")
            continue

        scanned_files += 1

        description = post.get("description")
        title = post.get("title")
        permalink = post.get("permalink")

        if not description:
            missing_descriptions.append(rel_path)
        else:
            normalized_desc = " ".join(str(description).split())
            description_to_files[normalized_desc].append(rel_path)
            if len(normalized_desc) < 50:
                short_descriptions.append((rel_path, normalized_desc))

        if title:
            normalized_title = " ".join(str(title).split()).casefold()
            title_to_files[normalized_title].append((rel_path, str(title)))

        if permalink:
            normalized_permalink = str(permalink).strip()
            permalink_to_files[normalized_permalink].append(rel_path)

        if rel_path.startswith("_guides/") and not post.get("date"):
            missing_guide_dates.append(rel_path)

        if rel_path.startswith("_guides/"):
            content = post.content or ""
            faq_items = post.get("faqs") or []
            primary_query = post.get("primary_query")
            word_count = len(re.findall(r"\b\w[\w-]*\b", content, flags=re.UNICODE))
            link_count = len(re.findall(r"\[[^\]]+\]\([^)]+\)", content))
            question_heading_count = len(
                re.findall(r"^(##|###)\s+.+\?\s*$", content, flags=re.MULTILINE)
            )
            if primary_query:
                normalized_query = " ".join(str(primary_query).split()).casefold()
                guide_primary_queries[normalized_query].append(rel_path)

            if rel_path in target_guides:
                has_offer_link = "/angebot/" in content

                if word_count < 900:
                    target_guide_low_words.append((rel_path, word_count))
                if link_count < 3:
                    target_guide_low_links.append((rel_path, link_count))
                if not has_offer_link:
                    target_guide_missing_offer_link.append(rel_path)

            if rel_path in top_transactional_guides:
                min_words = 900
                max_words = 1200
                min_question_headings = 3
                exact_link_count = 7
            else:
                min_words = 300 if rel_path in regional_index_guides else 500
                max_words = 600 if rel_path in regional_index_guides else 800
                min_question_headings = 1
                exact_link_count = 5

            if word_count < min_words:
                guide_low_word_target.append((rel_path, word_count, min_words))
            if word_count > max_words:
                guide_high_word_target.append((rel_path, word_count, max_words))
            if question_heading_count < min_question_headings:
                guide_question_heading_gaps.append(
                    (rel_path, question_heading_count, min_question_headings)
                )
            if len(faq_items) < 4:
                guide_low_faq_count.append((rel_path, len(faq_items)))
            if link_count != exact_link_count:
                guide_link_target_mismatch.append((rel_path, link_count, exact_link_count))

        if rel_path.startswith("_districts/"):
            content = post.content or ""
            state = str(post.get("state") or "").strip()
            faq_items = post.get("faqs") or []
            word_count = len(re.findall(r"\b\w[\w-]*\b", content, flags=re.UNICODE))
            link_count = len(re.findall(r"\[[^\]]+\]\([^)]+\)", content))
            has_offer_link = "/angebot/" in content
            question_heading_count = len(
                re.findall(r"^###\s+.+\?\s*$", content, flags=re.MULTILINE)
            )

            if word_count < 120:
                district_thin_content.append((rel_path, word_count))
            if link_count < 3:
                district_low_internal_links.append((rel_path, link_count))
            if not has_offer_link:
                district_missing_offer_link.append(rel_path)

            min_words = 260 if state == "wien" else 230
            max_words = 360 if state == "wien" else 330
            if word_count < min_words:
                district_low_word_target.append((rel_path, word_count, min_words))
            if word_count > max_words:
                district_high_word_target.append((rel_path, word_count, max_words))
            if question_heading_count < 2:
                district_question_heading_gaps.append((rel_path, question_heading_count))
            if len(faq_items) < 4:
                district_low_faq_count.append((rel_path, len(faq_items)))
            if link_count != 6:
                district_link_target_mismatch.append((rel_path, link_count))

    duplicate_descriptions = {
        text: paths for text, paths in description_to_files.items() if len(paths) > 1
    }
    duplicate_titles = {
        key: paths for key, paths in title_to_files.items() if len(paths) > 1
    }
    duplicate_permalinks = {
        url: paths for url, paths in permalink_to_files.items() if len(paths) > 1
    }
    duplicate_guide_primary_queries = {
        query: paths for query, paths in guide_primary_queries.items() if len(paths) > 1
    }

    print("=== SEO Analysis Report ===")
    print(f"Total content files scanned: {scanned_files}")

    if missing_descriptions:
        print("\n[MISSING DESCRIPTIONS]")
        for rel in sorted(missing_descriptions):
            print(f"- {rel}")

    if missing_guide_dates:
        print("\n[MISSING GUIDE DATES]")
        for rel in sorted(missing_guide_dates):
            print(f"- {rel}")

    if duplicate_guide_primary_queries:
        print("\n[DUPLICATE GUIDE PRIMARY QUERIES]")
        for query, paths in sorted(duplicate_guide_primary_queries.items()):
            print(f"\nPrimary query: '{query}'")
            for rel in sorted(paths):
                print(f"- {rel}")

    if target_guide_low_words:
        print("\n[TARGET GUIDE THIN CONTENT (< 900 words)]")
        for rel, count in sorted(target_guide_low_words):
            print(f"- {rel}: {count} words")

    if target_guide_low_links:
        print("\n[TARGET GUIDE LOW INTERNAL LINKS (< 3 markdown links)]")
        for rel, count in sorted(target_guide_low_links):
            print(f"- {rel}: {count} links")

    if target_guide_missing_offer_link:
        print("\n[TARGET GUIDE MISSING OFFER LINK]")
        for rel in sorted(target_guide_missing_offer_link):
            print(f"- {rel}")

    if guide_low_word_target:
        print("\n[GUIDE BELOW WORD TARGET]")
        for rel, count, minimum in sorted(guide_low_word_target):
            print(f"- {rel}: {count} words (target >= {minimum})")

    if guide_high_word_target:
        print("\n[GUIDE ABOVE WORD TARGET]")
        for rel, count, maximum in sorted(guide_high_word_target):
            print(f"- {rel}: {count} words (target <= {maximum})")

    if guide_question_heading_gaps:
        print("\n[GUIDE LOW QUESTION HEADINGS]")
        for rel, count, minimum in sorted(guide_question_heading_gaps):
            print(f"- {rel}: {count} headings (target >= {minimum})")

    if guide_low_faq_count:
        print("\n[GUIDE LOW FAQ COUNT (< 4)]")
        for rel, count in sorted(guide_low_faq_count):
            print(f"- {rel}: {count} FAQs")

    if guide_link_target_mismatch:
        print("\n[GUIDE LINK COUNT MISMATCH]")
        for rel, count, expected in sorted(guide_link_target_mismatch):
            print(f"- {rel}: {count} links (target = {expected})")

    if district_thin_content:
        print("\n[DISTRICT THIN CONTENT (< 120 words)]")
        for rel, count in sorted(district_thin_content):
            print(f"- {rel}: {count} words")

    if district_low_internal_links:
        print("\n[DISTRICT LOW INTERNAL LINKS (< 3 markdown links)]")
        for rel, count in sorted(district_low_internal_links):
            print(f"- {rel}: {count} links")

    if district_missing_offer_link:
        print("\n[DISTRICT MISSING OFFER LINK]")
        for rel in sorted(district_missing_offer_link):
            print(f"- {rel}")

    if district_low_word_target:
        print("\n[DISTRICT BELOW WORD TARGET]")
        for rel, count, minimum in sorted(district_low_word_target):
            print(f"- {rel}: {count} words (target >= {minimum})")

    if district_high_word_target:
        print("\n[DISTRICT ABOVE WORD TARGET]")
        for rel, count, maximum in sorted(district_high_word_target):
            print(f"- {rel}: {count} words (target <= {maximum})")

    if district_question_heading_gaps:
        print("\n[DISTRICT LOW QUESTION HEADINGS (< 2)]")
        for rel, count in sorted(district_question_heading_gaps):
            print(f"- {rel}: {count} headings")

    if district_low_faq_count:
        print("\n[DISTRICT LOW FAQ COUNT (< 4)]")
        for rel, count in sorted(district_low_faq_count):
            print(f"- {rel}: {count} FAQs")

    if district_link_target_mismatch:
        print("\n[DISTRICT LINK COUNT MISMATCH (!= 6)]")
        for rel, count in sorted(district_link_target_mismatch):
            print(f"- {rel}: {count} links")

    if duplicate_descriptions:
        print("\n[DUPLICATE DESCRIPTIONS]")
        for text, paths in sorted(duplicate_descriptions.items()):
            print(f"\nDescription: '{text}'")
            for rel in sorted(paths):
                print(f"- {rel}")

    if duplicate_titles:
        print("\n[DUPLICATE TITLES]")
        for _, records in sorted(duplicate_titles.items(), key=lambda item: item[0]):
            title_label = records[0][1]
            print(f"\nTitle: '{title_label}'")
            for rel, _ in sorted(records):
                print(f"- {rel}")

    if duplicate_permalinks:
        print("\n[DUPLICATE PERMALINKS]")
        for permalink, paths in sorted(duplicate_permalinks.items()):
            print(f"\nPermalink: '{permalink}'")
            for rel in sorted(paths):
                print(f"- {rel}")

    if short_descriptions:
        print("\n[SHORT DESCRIPTIONS (< 50 chars)]")
        for rel, text in sorted(short_descriptions):
            print(f"- {rel}: '{text}'")

    if (
        not missing_descriptions
        and not missing_guide_dates
        and not duplicate_guide_primary_queries
        and not target_guide_low_words
        and not target_guide_low_links
        and not target_guide_missing_offer_link
        and not guide_low_word_target
        and not guide_high_word_target
        and not guide_question_heading_gaps
        and not guide_low_faq_count
        and not guide_link_target_mismatch
        and not district_thin_content
        and not district_low_internal_links
        and not district_missing_offer_link
        and not district_low_word_target
        and not district_high_word_target
        and not district_question_heading_gaps
        and not district_low_faq_count
        and not district_link_target_mismatch
        and not duplicate_descriptions
        and not duplicate_titles
        and not duplicate_permalinks
        and not short_descriptions
    ):
        print(
            "\n✅ All checks passed! No missing descriptions/date fields, and no critical duplicates."
        )


if __name__ == "__main__":
    analyze_seo(os.getcwd())
