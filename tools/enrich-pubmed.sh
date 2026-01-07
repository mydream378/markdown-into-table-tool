#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IN_JSON="${1:-${ROOT_DIR}/src/data/publications.json}"
OUT_JSON="${ROOT_DIR}/src/data/publications.json"

if [[ ! -f "$IN_JSON" ]]; then
  echo "❌ Input JSON not found: $IN_JSON" >&2
  exit 1
fi

TMP_JSON="$ROOT_DIR/.tmp/pubmed_work.json"
mkdir -p "$(dirname "$TMP_JSON")"
cp "$IN_JSON" "$TMP_JSON"

mapfile -t ROWS < <(jq -r 'to_entries[] | @base64' "$TMP_JSON")

for row in "${ROWS[@]}"; do
  _jq() { echo "$row" | base64 --decode | jq -r "$1"; }
  IDX=$(_jq '.key')
  TITLE=$(_jq '.value.title')
  YEAR=$(_jq '.value.year // empty')
  DOI=$(_jq '.value.doi // empty')

  PMID=""
  if [[ -n "$DOI" ]]; then
    Q=$(printf '"%s"[AID]' "$DOI")
    RESP=$(curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=${Q}")
    PMID=$(echo "$RESP" | jq -r '.esearchresult.idlist[0] // empty') || true
  fi

  if [[ -z "$PMID" ]]; then
    QT=$(printf '"%s"[Title]' "$TITLE")
    TERM="$QT"
    if [[ -n "$YEAR" ]]; then
      TERM="$TERM AND ${YEAR}[PDAT]"
    fi
    RESP=$(curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=${TERM}")
    PMID=$(echo "$RESP" | jq -r '.esearchresult.idlist[0] // empty') || true
  fi

  if [[ -n "$PMID" ]]; then
    URL="https://pubmed.ncbi.nlm.nih.gov/${PMID}/"
    jq \
      --arg idx "$IDX" \
      --arg pmid "$PMID" \
      --arg url "$URL" \
      '(.[$idx|tonumber].pmid) = $pmid | (.[$idx|tonumber].pubmedUrl) = $url' \
      "$TMP_JSON" > "$TMP_JSON.tmp" && mv "$TMP_JSON.tmp" "$TMP_JSON"
  fi

  sleep 0.2
done

jq '[ .[] | select(.pubmedUrl != null and .pubmedUrl != "") ]' "$TMP_JSON" > "$OUT_JSON"

COUNT=$(jq 'length' "$OUT_JSON")
echo "✅ PubMed-enriched publications: $COUNT → $OUT_JSON"

