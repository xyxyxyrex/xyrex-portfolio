# Design gallery references and implementation requirements

Status: the first reference is implemented in the existing React portfolio, with the heading Design Projects. Work is grouped by visual mood. The original PNG masters remain unchanged.

## References

Created with the built-in image generation tool using the portfolio's existing BLANC, Midsommar, The Ruins, and Bauhaus poster files as supporting inputs. These are visual concepts; implementation must display the original artwork from optimized derivatives, preserving its content and proportions.

1. [Staggered poster wall](mockups/poster-gallery-references/01-staggered-wall.png): recommended main gallery. Featured print, differing sheet sizes and vertical offsets, beige page, square artwork corners, restrained shadows, small numbered captions.
2. [Poster archive](mockups/poster-gallery-references/02-poster-archive.png): an alternative with four equal portrait columns and aligned captions.
3. [Expanded viewer](mockups/poster-gallery-references/03-expanded-viewer.png): companion to either gallery, with full poster, title/caption, previous/next controls, and secondary thumbnails.

The implemented wall uses the established beige/charcoal UI, bold editorial heading Design Projects, small monospace metadata, square poster corners, restrained shadows, and the existing floating icon navbar. Filters: Posters / Composites / Interfaces. Portrait sheets are staggered in four desktop columns and two mobile columns; landscape works use two desktop columns and one mobile column. Hover restores color, lifts the sheet slightly, and adds a 0.7-second translucent sweep. Clicking opens a native dialog with the complete artwork and keyboard/button navigation. The expanded split layout in reference 3 remains an alternative concept.

The exact generation prompts are saved in [poster-gallery-prompts.json](poster-gallery-prompts.json).

## Implemented mood groups

Posters now contains 22 works, including all 14 newly supplied images:

- Paper & form: BLANC, Midsommar, The Ruins, Bauhaus.
- Quiet details: Camera, Middle, Kataomoi, Mirror.
- Noise & sound: The Dooo Show, Pag-ibig ay Kanibalismo, Russian Roulette, Obsession.
- Green frequencies: Fade, Ouroborus, Look at the sky, Cyberpunk.
- Cold light: Glass, Cybercore, 08.
- Dark fragments: Prisms, Past Wont Leave My Bed, Poetic Justice.

Three-item groups use a responsive three-column staggered wall; four-item groups retain the first reference's four columns. Mobile uses two columns. Square Mirror and Cyberpunk artwork preserves its native proportions. Titles follow the supplied filenames.

Composites: After dark (Neon city, Cosmic drift); Distant terrain (Distant ruins, Alpine world).
Interfaces: Product & flow (Marketplace study, Application flows); Care & conservation (Conservation study, Healthcare study).

## Image rendering requirements requested by the user

Optimize and compress assets when implementing this section. Do not ship original print-resolution PNGs as gallery thumbnails.

Read-only audit: current Design assets total about 70.3 MiB. The eight original portrait posters total about 56.9 MiB. Porter.png alone is about 15.7 MiB. Originals are mostly 2480 x 3508 pixels. The current section duplicates each image list four times for scrolling and runs animation loops; the redesign should avoid this duplication and unnecessary ongoing work.

Implementation requirements:

- Keep original files as masters and generate separate reusable web derivatives.
- Generate responsive WebP previews at roughly 400, 800, and 1200 pixels wide; optionally add AVIF where the available encoder and visual results justify it. Choose final widths and quality from rendered card sizes.
- Use picture / srcset / sizes so mobile and small cards load appropriate dimensions. Preserve poster aspect ratios and readable type.
- Reserve space with width / height or aspect-ratio to prevent layout shifts.
- Load only initially visible images eagerly; lazy-load offscreen images and decode asynchronously.
- Load a larger optimized viewing copy only when a poster is opened. Do not pre-download every master file or full-resolution gallery image.
- Keep the gallery mostly static. Remove the duplicated marquee DOM if this direction is implemented. Stop or clean up any requestAnimationFrame work and pause offscreen animations.
- Use restrained transform/opacity effects and honor reduced-motion preferences.
- Retain keyboard navigation, descriptive alt text, focus restoration, and an uncropped enlarged view.
- Aim for an initial visible gallery image transfer around 1-2 MiB or less, subject to image count and visual quality. This is a target to measure during implementation, not an achieved result.
- Verify small typography, grain, and color after compression. Check mobile network behavior, layout stability, and loading during the implementation pass.

## Implementation and measured assets

- `scripts/optimize-design-images.py` creates derivatives using Pillow; run it from portfolio-app. It never changes the masters. It reuses up-to-date derivatives; use --force after changing encoder settings.
- Each of the 30 artworks has WebP previews at 400, 800, and 1200 pixels wide (quality 85), plus an optimized viewer copy capped at 1800 pixels for portraits or 1920 pixels for landscape work (quality 90).
- `src/data/design-images.json` records original dimensions, preview URLs, widths, byte sizes, and viewer URLs. `src/data/design.js` defines the visual groupings.
- Gallery img elements use srcset/sizes, width/height, native lazy loading, and asynchronous decoding. The viewer image is not mounted until artwork is opened. Filters mount only their selected category.
- The old duplicated image strips, permanent animation-frame loops, parallax listeners, and per-image Framer animations are removed. The site navigation's existing scroll behavior is retained.
- All 30 original artwork files total 142.07 MiB. All 30 800px previews together total 3.47 MiB (about 97.6% less). The 14 new originals total 71.99 MiB; their 800px previews total 1.66 MiB. This compares static file sizes, not measured browser traffic.
- The first four beige posters total 177 KiB at 400px, 549 KiB at 800px, or 1047 KiB at 1200px. Responsive selection determines the actual transfer per device.
- All 120 derivatives were decoded and verified, with dimensions checked against the originals. Compressed Midsommar and Glass previews were visually inspected for typography, grain, and image detail. All new PNG files were checked for transparency; none require alpha preservation.
- Production build and all 20 React tests passed, including the sequential project-card transition checks. Browser/native preview access was unavailable, so browser network, layout, and performance measurements remain unverified.



## Scroll-triggered heading selection

The Design Projects heading uses the same #0d99ff editor-selection styling as the About Design title: a thin rectangle and eight square handles. IntersectionObserver watches the heading within the site scroll container and reveals the frame when at least 60% of the heading is visible. It resets when the heading leaves view, allowing the reveal to replay on return. The decoration is aria-hidden, does not change heading dimensions, follows text wrapping and responsive sizing, and skips motion for reduced-motion preferences. The observer is disconnected on unmount.
