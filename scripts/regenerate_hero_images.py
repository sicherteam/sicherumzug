#!/usr/bin/env python3
"""
Utility script to recreate responsive hero image variants from the canonical
desktop asset. Run this after updating the source hero image to keep all
derived files in sync.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

REPO_ROOT = Path(__file__).resolve().parents[1]
SOURCE_IMAGE = REPO_ROOT / "assets/images/hero/desktop.webp"
OUTPUT_DIR = SOURCE_IMAGE.parent

# Lower the quality aggressively so each responsive hero stays lightweight for LCP.
WEBP_QUALITY = 15
WEBP_METHOD = 6

# width in pixels, ordered from smallest to largest for stable resizing
VARIANTS = [
    ("mobile-400w.webp", 400),
    ("mobile-800w.webp", 800),
    ("mobile.webp", 1100),
    ("desktop-1200w.webp", 1200),
    ("desktop-1440w.webp", 1440),
]


def ensure_source() -> Image.Image:
    if not SOURCE_IMAGE.exists():
        raise FileNotFoundError(f"Source hero image not found: {SOURCE_IMAGE}")
    base = Image.open(SOURCE_IMAGE)
    # Apply EXIF orientation (if any) and work in RGB to avoid color profile bugs.
    return ImageOps.exif_transpose(base).convert("RGB")


def save_variant(image: Image.Image, width: int, destination: Path) -> None:
    src_width, src_height = image.size
    if width >= src_width:
        target_width, target_height = src_width, src_height
        resized = image.copy()
    else:
        target_height = round(width * src_height / src_width)
        target_width = width
        resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)

    destination.parent.mkdir(parents=True, exist_ok=True)
    resized.save(
        destination,
        format="WEBP",
        quality=WEBP_QUALITY,
        method=WEBP_METHOD,
        optimize=True,
    )
    rel = destination.relative_to(REPO_ROOT)
    print(f"Wrote {rel} ({target_width}x{target_height})")


def main() -> None:
    source = ensure_source()
    for filename, width in VARIANTS:
        save_variant(source, width, OUTPUT_DIR / filename)


if __name__ == "__main__":
    main()
