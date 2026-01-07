#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   bash tools/update-publications.sh path/to/scholar.bib
#
# Requirements:
#   - npx (Node/npm installed)
#   - jq (command-line JSON processor)
#
# Output:
#   - Writes transformed JSON to src/data/publications.json

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INPUT_BIB="${1-}"

if [[ -z "${INPUT_BIB}" ]]; then
  echo "❌ Please provide the path to your Google Scholar BibTeX file (scholar.bib)" >&2
  echo "   Example: bash tools/update-publications.sh scholar.bib" >&2
  exit 1
fi

if [[ ! -f "${INPUT_BIB}" ]]; then
  echo "❌ BibTeX file not found: ${INPUT_BIB}" >&2
  exit 1
fi

TMP_DIR="${ROOT_DIR}/.tmp"
OUT_JSON="${ROOT_DIR}/src/data/publications.json"
CSL_JSON="${TMP_DIR}/csl.json"

mkdir -p "${TMP_DIR}"

echo "📚 Converting BibTeX → CSL-JSON (via citation-js) ..."
npx --yes citation-js -i "${INPUT_BIB}" -o "${CSL_JSON}" -f bibtex >/dev/null

echo "🔁 Mapping CSL-JSON → site schema ..."
jq --arg journal_only "${JOURNAL_ONLY:-}" '
  [ .[]
    | select($journal_only == "" or .type == "article-journal")
    | {
        id: ( .title
              | ascii_downcase
              | gsub("[^a-z0-9]+"; "-")
              | gsub("(^-|-$)"; "")
            ),
        title: .title,
        authors: (.author // [] | map(select(.family != null) | (.family + " " + (.given // "")) ) ),
        authorsFull: (.author // [] | map({family: (.family // ""), given: (.given // "")})),
        journal: .["container-title"],
        year: ( .issued["date-parts"][0][0] // .issued.year // .year // 0 ),
        volume: .volume,
        issue: .issue,
        pages: .page,
        doi: .DOI,
        pdfUrl: (.URL // (if .DOI then ("https://doi.org/" + .DOI) else null end))
      }
  ]
' "${CSL_JSON}" > "${OUT_JSON}"

COUNT=$(jq 'length' "${OUT_JSON}")
echo "✅ Wrote ${COUNT} publications → ${OUT_JSON}"

echo "🧪 Tip: run 'npm run build && npm run preview' to verify the Publications page"
