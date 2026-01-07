## ✅ What You Want

* Show ALL papers from your Google Scholar profile

* Render citations in APA 7th style with ALL co-authors

* Underline your name “Mengfei Cai” wherever it appears

* Order newest → oldest (oldest at the bottom)

## 🔧 Implementation Plan

1. Import Full Publication List

* Export BibTeX from Google Scholar

* Use existing importer to convert into `src/data/publications.json`

* Enhance importer to preserve structured authors:

  * Add `authorsFull: [{ family, given }]` in JSON

  * Keep `doi`, `url` (as `pdfUrl` fallback), `year`, `volume`, `issue`, `pages`

1. Data Model Update

* Extend `Publication` type to include `authorsFull?: { family: string; given: string }[]`

* Keep `authors: string[]` as fallback

1. APA 7 Rendering

* Build a formatter that:

  * Formats authors as: `Family, F. M., Family, F. M., ... & Family, F. M.`

  * Uses APA limits (≤20 authors: list all; >20: first 19 + … + last)

  * Year: `(2025).` or `(n.d.).`

  * Title in sentence case; journal and volume italicized; issue in parentheses; pages; DOI link

  * Underline “Mengfei Cai” (`Cai, M.` or `Cai, Mengfei`) using a span with `underline`

1. Page Behavior

* Sort publications by `year` desc so newest at the top and oldest at the bottom

* Primary display is the APA citation; keep “View Paper” linking to DOI/URL

1. Bash-first Workflow

* Place exported file in project root as `scholar.bib`

* Import all items (journal-only optional):

  * All items: `npm run pubs:update -- scholar.bib`

  * Journals only: `JOURNAL_ONLY=1 npm run pubs:update -- scholar.bib`

* Rebuild and preview:

  * `npm run build && npm run preview`

## 🔍 Validation

* Visually verify several citations match APA 7

* Confirm underline appears for every occurrence of your name

* Confirm newest → oldest order

## ⏱️ After Your Go-Ahead

* I will update the importer and UI, then run the import, rebuild, and show you the fully updated Publications page.

