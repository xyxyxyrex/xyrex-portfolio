# Project directory source review

The grid is implemented with HTML/CSS, project assets, and source-derived typography. Default colors use the user's requested, less-saturated project palettes.

## Repository references

- **Parity:** `xyxyxyrex/full-force-qa` (private, read with the existing authenticated GitHub CLI account). Reviewed README, package metadata, `src/renderer/src/App.css`, `theme/themes.css`, `theme/typography.css`, `components/HomeWorkspace.css`, and the bundled font declaration. The Parity theme uses `#151a18`, `#edefee`, and `#1d9e75`; its UI uses Geist. Its project sign is the largest.
- **lune:** [source](https://github.com/xyxyxyrex/lune). It has no CSS frontend. Reviewed README, Cargo.toml, `src/app.rs`, `src/theme.rs`, `src/fonts.rs`, and `src/controls.rs`. The Rust/egui UI uses dark surfaces, Geist Sans, and Doto for its title and clock. Read-only demo captures were available in the existing local `Desktop/docky/docky/target` directory.
- **SpotiTauri:** [source](https://github.com/xyxyxyrex/spotify-downloader). Reviewed `tauri-gui/README.md`, `src/styles.css`, package metadata, and Cargo.toml. Styles use charcoal `#121212`, green `#1db954`, and Consolas/monospace. This is a custom desktop frontend of spotDL. The repository contains application artwork, but no Tauri desktop screenshots; its preview is honestly labeled Artwork.
- **NMCG:** [admin.css](https://github.com/xyxyxyrex/negros-mangrove-conservation-app/blob/master/app/api/web/styles/admin.css): green `#2e7d32`, pale surfaces, Segoe UI. Reused the repository's logo and existing portfolio screenshots.
- **Memora-AI:** [index.css](https://github.com/xyxyxyrex/memora/blob/master/frontend/src/index.css): Inter, dark violet `#0f0e17`, primary `#6c63ff`, cyan accent. Reused existing screenshots.
- **CET E-Bulletin:** [edit_screen.css](https://github.com/xyxyxyrex/cet-e-bulletin-board/blob/master/styles/edit_screen.css): Roboto/Arial, neutral surfaces, blue `#3498db`. Reused existing screenshots.
- **Tono:** [App.css](https://github.com/xyxyxyrex/wyd-wya/blob/main/src/App.css) and README: beige/black themes, system sans typography, React + Leaflet + Firebase. Corrected the previous portfolio's Python stack entry to match the source.
- **CareFind and Thriftly:** retained the existing portfolio descriptions and galleries. CareFind's original logo is in `carefind-final` on its `master` branch (`app/src/main/res/drawable/logo.png`); its default branch only contains backend assets. Thriftly's logo is the original `app/src/main/res/drawable/icon.png`.

- **Caltris:** [source](https://github.com/xyxyxyrex/quick-maths). Reviewed README, package metadata, `src/index.css`, `src/App.tsx`, and the PixiJS renderer. The game uses Chakra Petch, dark navy `#0b0d15`, cyan `#36d3ff`, and pink `#ff5c8a`. AI battles, solo Zen mode, live ranked matches, profiles, and Elo-MMR ratings are implemented in the source. The README links to `https://caltris.pages.dev`. No gameplay captures are bundled; the favicon and hero image are unused starter assets, so the portfolio uses explicitly labeled title artwork, following its original CAL/TRIS colors and display font.

- **Cl?a:** private `xyxyxyrex/clea`, read through the existing authenticated GitHub CLI account. Reviewed README, package metadata, `src/style.css`, `src/App.tsx`, favicon, and evidence manifest. Local checkout: `Desktop/sciel`. React/TypeScript, Tone.js, Meyda, and PixiJS; 60 selectable audio/MIDI looks, local file inputs, seeded variations, composed layouts, and SVG print export. The card follows its dark olive `#11120f`, paper `#d0d2c5`, orange `#e86a3b`, and Arial wordmark. Source access is labeled private.

## Added assets

- `public/assets/projects/parity-home.png`: Parity `docs/assets/home-revamp-parity.png`.
- `public/assets/projects/parity-crawl.png`: Parity `docs/assets/crawl-finding-priorities/overview-compact-parity.png`.
- `public/assets/projects/parity-graph.png`: Parity `docs/assets/crawl-graphs-directory-light.png`.
- `public/assets/projects/parity-mark.svg`: Parity favicon, retained as a source brand asset.
- `public/assets/projects/lune-desktop.png`: local `target/lune-layout-default.png`.
- `public/assets/projects/lune-widgets.png`: local `target/lune-layout-theme-iris-final.png`.
- `public/assets/projects/lune-editor.png`: local `target/lune-editor.png`.
- `public/assets/projects/spotitauri.png`: repository `spoti-tauri.png` application artwork.
- `public/assets/projects/nmcg-logo.png`: repository `app/api/web/logo/NMCG Logo.png`.
- `public/assets/projects/carefind-logo.png`: original Android drawable from `carefind-final`'s `master` branch.
- `public/assets/projects/tono-logo.png`: `wyd-wya/main/logo.png`.
- `public/assets/projects/thriftly-logo.png`: `Thriftlyapp/master/app/src/main/res/drawable/icon.png`.
- `public/assets/projects/cet-logo.png`: `cet-e-bulletin-board/master/assets/logo.png`.
- `public/assets/projects/caltris-title.svg`: source-inspired Caltris title artwork with Chakra Petch outlines, labeled Artwork instead of Screenshot.
- `src/assets/fonts/caltris-chakra-bold.ttf`: original Chakra Petch display font from Google Fonts, with its OFL license included.
- `src/assets/fonts/project-geist.woff2` and `lune-doto.ttf`: existing project typefaces; their accompanying OFL notices are included alongside them. Webpack bundles the fonts with content hashes.

- `public/assets/projects/clea/`: four optimized WebP proofs from the original local renderer outputs, explicitly labeled Render. The total is 46,386 bytes. New scribble SVG marks and favicon SVG/PNG/ICO exports follow the supplied Desktop/Untitled.png reference; see [Cl?a brand notes](clea-brand/README.md).

## Interaction

Eleven signs form a compact mosaic. Every sign and detail card displays its project palette at reduced saturation by default, restoring richer colors on hover or keyboard focus, including logos and screenshots. Project titles, descriptions, notes, features, and stack labels use a staggered character reveal aligned to panel entry that finishes within about 850 ms of mounting, preserving full text layout and immediate screen reader access. Reduced-motion preferences skip the typing effect. Gallery changes do not restart the reveal. The grid uses narrow paper-colored gutters without a dark outer border or dark dividers. Hovering a sign fills it from left to right over 700 ms using a translucent brand-accent sweep. Sweep completion starts a sequential slide-up transition. The eleven directory signs slide upward out of clipped grid slots (280 ms each, 18 ms stagger); five detail panels slide upward into their own slots (360 ms each, 32 ms stagger, 80 ms lead). Both grids overlap briefly, so there is no whole-board fade or empty frame. The incoming layout keeps the same dimensions and presents the project information, stack, main preview, and gallery without stealing focus for hover navigation. Leaving a sign cancels and removes its sweep; entering another sign starts a fresh sweep. Reduced-motion users retain the 700 ms delay with no sweep or panel animation. Animation events normally finish each phase; short safety timers prevent stuck previews if those events are suppressed. Leaving the project grid starts a matching slide-down exit: detail panels leave in reverse order and project signs return from above. The directory becomes interactive and focus is restored to its project sign, when needed, after the exit finishes. An open image viewer stays available. All projects / Escape also returns. Click / keyboard activation remains available for touch and keyboard users. A shared responsive wrapper fixes both states to the same height, independently of project content. Screenshot previews fill their cells with cover cropping; the native image dialog retains an uncropped view and arrow-key navigation. Hovering or focusing gallery items changes the main preview. Parity links to its public site and releases, with its source correctly labeled private.

The browser automation host was unavailable during implementation. Validation uses the production build, React interaction tests, and local asset verification; visual browser verification remains outstanding.


## Slide transition implementation

- The selected detail view mounts once. Its DOM is retained after the slide finishes, preserving the typing reveal and loaded images.
- The outgoing directory is retained only during the transition and then unmounted. Its logo assets remain browser-cacheable.
- Movement uses CSS translateY transforms. Grid areas, widths, and heights are not animated; there are no animation-frame loops or repeated layout measurements.
- The incoming sequence finishes at 568 ms after sweep completion, with a 648 ms safety completion. Temporary will-change hints are removed at completion.
- Animated filters are suspended during movement, and the selected outgoing sign retains its saturated state.
- Both transition layers are inert and hidden from accessibility navigation while the preview group reports busy. Keyboard activation temporarily focuses the group and then the detail heading; hovering preserves the user's existing keyboard focus.
- Leaving the container, pressing Escape, or choosing All projects starts the reverse exit. Detail panels slide downward over 260 ms with a reversed 24 ms stagger. The eleven directory signs return downward from above over 300 ms with a reversed 16 ms stagger and 80 ms lead. With eleven signs the exit completes in 540 ms, with a 620 ms safety completion; both derive from project count. Reduced motion returns immediately.
- If exit interrupts entry, current transform values are read in one batch and written to per-card CSS variables before reversing. This preserves the current positions without layout measurements or animation-frame loops.
- Pending preview and phase timers are cleared on phase changes/unmount. New hovers are ignored until exit finishes, and late entry animation events cannot complete an exit. Focus returns to the project sign when appropriate.
- Tests cover overlapped layers, ignored descendant/late animation events, stable incoming DOM, interrupted-position reversal, exit completion, rapid pointer re-entry, keyboard focus, missing-animation-event recovery, reduced motion, every project's details, gallery navigation, and the image viewer. Browser visual/performance inspection remains unavailable in this environment.
