# Portfolio search setup

Production: https://xyrex-portfolio.vercel.app/

The homepage represents Xyrex Kyle Salazar (Xyrex / Xyrex Dev), a web developer and creative based in Bacolod, Philippines. Keep the page title, visible identity, description, and structured data accurate and consistent. Avoid keyword lists or invented credentials.

`npm run build` builds the browser bundle, pre-renders the actual React app into `build/index.html`, and validates the generated SEO assets. The browser hydrates that same content. The floating dock gains its liquid-glass effect after hydration; the hero and sections stay visible before JavaScript loads.

`public/index.html` owns the title, canonical, social tags, portrait preload, and WebSite / Person / ProfilePage structured data. `public/robots.txt` advertises the single canonical homepage in `public/sitemap.xml`. Navigation uses homepage fragments; these are not separate indexable pages. Vercel serves a real HTTP 404 for missing paths and redirects `/index.html` to `/`.

If the production domain changes, update the absolute URLs in those three public files and `scripts/check-seo.cjs`. Also regenerate the social card with the new URL in `scripts/generate-brand-assets.cjs`.

Asset maintenance:

- `npm run assets:brand` regenerates the portfolio icons and the 1200 × 630 social card from code-native SVG artwork and the existing bundled font.
- `python scripts/optimize-hero.py` regenerates the responsive transparent WebP portraits from the PNG master (requires Pillow). The master is retained; the page only requests WebP.
- `npm run check:seo` validates an existing build without rebuilding it.
- `npm test -- --watchAll=false --runInBand` covers the interactive UI and hydration.

After publishing, use the owner’s [Google Search Console](https://search.google.com/search-console) property to submit `https://xyrex-portfolio.vercel.app/sitemap.xml` and request indexing of the homepage with URL Inspection. These are account-level actions, separate from deployment. Review search impressions and queries over time; metadata and structured data indicate preferences but do not guarantee rankings, wording, or rich results.
