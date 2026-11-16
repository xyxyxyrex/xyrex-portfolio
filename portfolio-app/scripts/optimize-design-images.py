"""Create web derivatives without changing the original design artwork.

Run from portfolio-app: python scripts/optimize-design-images.py
Requires Pillow with WebP support.
"""

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/skills"
OUTPUT = SOURCE / "optimized"
MANIFEST = ROOT / "src/data/design-images.json"
FILES = {
    "blanc": "Poster1.png",
    "midsommar": "Poster4.png",
    "the-ruins": "Poster5.png",
    "bauhaus": "Bauhaus.png",
    "kanibalismo": "Poster2.png",
    "the-dooo-show": "Poster3.png",
    "cybercore": "Cybercore.png",
    "look-at-the-sky": "Porter.png",
    "neon-city": "compositing-1.png",
    "distant-ruins": "compositing-2.png",
    "alpine-world": "compositing-3.png",
    "cosmic-drift": "compositing-4.png",
    "marketplace-study": "figma-1.png",
    "conservation-study": "figma-2.png",
    "healthcare-study": "figma-3.png",
    "application-flows": "figma-4.png",
    "obsession": "Obsession.png",
    "fade": "Fade.png",
    "glass": "Glass.png",
    "08": "08.png",
    "camera": "Camera.png",
    "middle": "Middle.png",
    "russian-roulette": "Russian Roulette.png",
    "kataomoi": "Kataomoi.png",
    "past-wont-leave-my-bed": "Past Wont Leave My Bed.png",
    "poetic-justice": "Poetic Justice.png",
    "prisms": "Prisms.png",
    "ouroborus": "Ouroborus.png",
    "mirror": "Mirror.png",
    "cyberpunk": "Cyberpunk.png",
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--force", action="store_true", help="Regenerate all artwork, including unchanged images; use after changing encoder settings.")
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    previous = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    manifest = {}
    original_bytes = 0
    preview_bytes = 0
    generated = 0
    cached = 0
    for name, filename in FILES.items():
        source = SOURCE / filename
        original_bytes += source.stat().st_size
        existing = previous.get(name)
        if existing and not args.force:
            targets = [ROOT / "public" / item["src"].lstrip("/") for item in existing["variants"]]
            targets.append(ROOT / "public" / existing["viewer"].lstrip("/"))
            if all(target.exists() and target.stat().st_mtime_ns >= source.stat().st_mtime_ns for target in targets):
                manifest[name] = existing
                preview_bytes += next(item["bytes"] for item in existing["variants"] if item["width"] == min(800, existing["width"]))
                cached += 1
                continue
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            width, height = image.size
            variants = []
            for target_width in (400, 800, 1200):
                actual_width = min(target_width, width)
                target_height = round(height * actual_width / width)
                resized = image.resize((actual_width, target_height), Image.Resampling.LANCZOS)
                target = OUTPUT / f"{name}-{actual_width}.webp"
                resized.save(target, "WEBP", quality=85, method=6)
                variants.append({"width": actual_width, "src": f"/assets/skills/optimized/{target.name}", "bytes": target.stat().st_size})
                if target_width == 800:
                    preview_bytes += target.stat().st_size
            viewer_width = min(1800 if height > width else 1920, width)
            viewer = image.resize((viewer_width, round(height * viewer_width / width)), Image.Resampling.LANCZOS)
            target = OUTPUT / f"{name}-viewer.webp"
            viewer.save(target, "WEBP", quality=90, method=6)
            manifest[name] = {"width": width, "height": height, "variants": variants, "viewer": f"/assets/skills/optimized/{target.name}", "viewerBytes": target.stat().st_size}
        print(f"{name}: 800px {variants[1]['bytes'] / 1024:.0f} KiB; viewer {manifest[name]['viewerBytes'] / 1024:.0f} KiB", flush=True)
        generated += 1
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifest)} artworks: {generated} generated, {cached} reused. Originals: {original_bytes / 1024**2:.2f} MiB; all 800px previews: {preview_bytes / 1024**2:.2f} MiB")


if __name__ == "__main__":
    main()
