# Chamindu Kaushalye's portfolio

Static HTML, CSS, and JavaScript deployed to GitHub Pages. No runtime dependencies or backend.

## Content and pages

Edit `tools/build_site.py`, then run `python tools/build_site.py` to regenerate the homepage, three case studies, and web CV. Shared presentation and interaction live in `style.css` and `script.js`. Assets include actual application screenshots captured with synthetic data; provenance is documented alongside them.

The PDF is exported from `cv.html` using Chromium's A4 print output with `preferCSSPageSize: true`. Regenerate the PDF after CV content changes and verify that it is still one page with selectable text and working links.

## Verification

Serve the parent directory on port 8768 so the site runs under `/Personal-Portfolio-Website/`, matching the deployed base path. `tools/browser-check.js` is an async Playwright CLI `run-code` function. It checks five pages at widths 320, 390, 768, 1024, and 1440; local links; image loading; galleries; theme persistence; reduced motion; CV download; browser Back; and no-JavaScript navigation. It also exports the PDF and local review screenshots.

The final local browser check passed all assertions with no page errors. The PDF has one page, selectable text, and seven external links. These checks cover the portfolio, not the underlying project backends.

Publishing a commit to `main` triggers `.github/workflows/pages.yml`. It publishes only static website files, project pages, and assets.
