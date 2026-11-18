"""Regenerate responsive WebP portraits from the unchanged PNG master (Pillow)."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / 'public' / 'assets'
source = assets / 'hero-cutout-halftone.png'
with Image.open(source) as image:
    for label, width in [('550', 550), ('1100', image.width)]:
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        output = assets / f'hero-cutout-halftone-{label}.webp'
        resized.save(output, 'WEBP', quality=88, method=6, exact=True)
        print(f'{output.name}: {output.stat().st_size:,} bytes ({100 * (1 - output.stat().st_size / source.stat().st_size):.1f}% smaller)')
