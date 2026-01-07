## ✅ Goal
Update the Publications page using your Google Scholar list so it stays accurate, complete, and automatically maintainable.

## 🔄 Approach Overview
- Pull publications from your Google Scholar profile
- Convert to a standard JSON format
- Map into the site's `src/data/publications.json` schema
- Optionally enrich with DOI and PDF links
- Rebuild and visually verify

## 📦 Data Source → JSON Pipeline
1. Export BibTeX from Google Scholar
   - Open your profile → select all publications (per page) → Export → BibTeX → save as `scholar.bib`
2. Convert BibTeX → CSL-JSON
   - Bash-friendly one-liner using Node CLI:
   - `npx citation-js -i scholar.bib -o .tmp/csl.json -f bibtex`
3. Transform CSL-JSON → site schema with jq
   - Map to: `id, title, authors[], journal, year, volume, issue, pages, doi, pdfUrl`
   - Bash + jq example:
   - `jq '[.[] | { id: ( .title | ascii_downcase | gsub("[^a-z0-9]+";"-") | gsub("(^-|-$)";"") ), title: .title, authors: (.author // [] | map(select(.family != null) | (.family + " " + (.given // "")))) , journal: .["container-title"], year: ( .issued["date-parts"][0][0] // .issued.year // .year // 0 ), volume: .volume, issue: .issue, pages: .page, doi: .DOI, pdfUrl: (.URL // null) } ]' .tmp/csl.json > src/data/publications.json`

## 🧠 Enrichment (Optional but Recommended)
- DOIs: Fill missing DOIs via Crossref by title+year lookup
- PDF links: Prefer publisher/PMC links if available; fall back to DOI URL
- Keywords: Add curated keywords per paper for better filtering later

## 🗂️ Target File In This Project
- `src/data/publications.json`

## 🧩 Data Model Mapping
- title → title
- authors (family + given) → authors[] strings
- container-title → journal
- issued.date-parts → year
- volume/issue/page → volume/issue/pages
- DOI → doi
- URL/Full text → pdfUrl (if direct/open link; else use `https://doi.org/<DOI>`)
- id → slugified title (lowercase, alphanumeric + dashes)

## 🧪 Validation
- Build locally: `npm run build`
- Open preview: `npm run preview` → check Publications page renders
- Spot-check 3–5 entries against Google Scholar for correctness

## 🗒️ Preview (sample entries to be included)
- Disentangling the effects of Alzheimer’s and small vessel disease on white matter fibre tracts — Brain (2023)
- Perivascular spaces, diffusivity along perivascular spaces, and free water in cerebral small vessel disease — Neurology (2024)
- Cerebral small vessel disease progression and the risk of dementia — American Journal of Psychiatry (2023)
- Determinants and temporal dynamics of cerebral small vessel disease — Stroke (2022)
- Cognition mediates the relation between structural network efficiency and gait in small vessel disease — NeuroImage: Clinical (2021)

## 🧭 Step-by-Step Plan (with bash-friendly commands)
1. Save Scholar export
   - `scholar.bib` placed in project root or `data/`
2. Convert bib → CSL JSON
   - `npx citation-js -i scholar.bib -o .tmp/csl.json -f bibtex`
3. Transform CSL → site JSON
   - `jq '[mapping shown above]' .tmp/csl.json > src/data/publications.json`
4. Optional DOI enrichment
   - Use a small script to query Crossref by title; update `doi` where missing
5. Verify locally
   - `npm run build && npm run preview`
6. Deploy
   - Push to main; GitHub Actions deploys to Pages automatically

## 📣 What I’ll Deliver After Approval
- Parsed and cleaned `src/data/publications.json` generated from your Scholar profile
- Optional enrichment pass for DOI/PDF links
- Visual validation screenshots/notes for the Publications page

## 📝 Your Inputs
- Confirm if you want me to include only journal articles, or also reviews/chapters/conferences
- Provide any preferred PDF links (e.g., institutional repository/OSF/PMC) if you have them
- Confirm if you want keyword tags auto-generated or skipped for now

If you approve, I’ll run the pipeline, update the JSON, rebuild, and show you the updated Publications page. 🎯