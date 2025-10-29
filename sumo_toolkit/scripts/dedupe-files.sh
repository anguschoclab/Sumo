#!/usr/bin/env bash
set -euo pipefail

PROJECT="${1:-}"
if [[ -z "${PROJECT}" ]]; then
  echo "Usage: bash sumo_toolkit/scripts/dedupe-files.sh /abs/path/to/project"
  exit 1
fi

if [[ ! -d "${PROJECT}" ]]; then
  echo "Project directory not found: ${PROJECT}"
  exit 1
fi

DUP_DIR="${PROJECT}/.duplicates"
REPORT="${DUP_DIR}/duplicates.csv"

mkdir -p "${DUP_DIR}"
: > "${REPORT}"

# temp file to track hashes we've seen
SEEN="$(mktemp)"
trap 'rm -f "${SEEN}"' EXIT

echo "hash,path" >> "${REPORT}"

# find all regular files excluding common build/vendor folders
# macOS compatible 'find' usage
while IFS= read -r -d '' file; do
  # calculate sha256 hash (macOS ships 'shasum')
  hash="$(shasum -a 256 "${file}" | awk '{print $1}')"

  if grep -q "^${hash} " "${SEEN}"; then
    # duplicate – move it aside preserving relative name
    rel="${file#"${PROJECT}/"}"
    dest_dir="${DUP_DIR}/$(dirname "${rel}")"
    mkdir -p "${dest_dir}"
    mv "${file}" "${dest_dir}/"
    echo "${hash},${file}" >> "${REPORT}"
    echo "• moved duplicate: ${rel}"
  else
    echo "${hash} ${file}" >> "${SEEN}"
  fi
done < <(find "${PROJECT}" -type d \
            \( -name node_modules -o -name .git -o -name .duplicates -o -name dist -o -name build \) -prune -false -o \
          -type f -print0)

echo "Done. Report: ${REPORT}"
