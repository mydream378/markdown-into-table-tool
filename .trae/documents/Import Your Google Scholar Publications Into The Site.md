## ✅ Goal
Replace the placeholder papers on the Publications page with your real list from Google Scholar.

## 🔄 What I’ll Do
1. Convert your Google Scholar export (BibTeX) into the site’s JSON format
2. Overwrite `src/data/publications.json` with the converted data
3. Rebuild and open the site so you can review
4. Optionally filter to journal articles only and auto-fill missing PDF links with DOI URLs

## 🔧 Inputs I Need
- Your exported BibTeX file from Google Scholar (download from your profile’s Export → BibTeX)
- Choice: include all items or journal articles only

## 🧰 Exact Commands I Will Run (bash-heavy)
- Place `scholar.bib` in the project root, then:
  - Include all items:
    - `npm run pubs:update -- scholar.bib`
  - Journal-only:
    - `JOURNAL_ONLY=1 npm run pubs:update -- scholar.bib`
- Verify and preview:
  - `npm run build && npm run preview`

## 🧪 Validation
- Open Publications page locally
- Spot-check several entries (title, authors, journal, year, DOI)
- Ensure counts and ordering look right

## ⏱️ Time
- Import + build: ~1–2 minutes after the BibTeX file is present

## ✅ After Approval
I will run the importer with your preference (all vs journal-only), rebuild the site, and show you the updated Publications page for confirmation.