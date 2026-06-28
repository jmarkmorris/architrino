#!/usr/bin/env bash
set -euo pipefail

mode="${1:-check}"

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ -n "${AAA_PYTHON:-}" ]]; then
  python_bin="$AAA_PYTHON"
elif [[ -n "${VIRTUAL_ENV:-}" && -x "${VIRTUAL_ENV}/bin/python" ]]; then
  python_bin="${VIRTUAL_ENV}/bin/python"
elif [[ -x "${repo_root}/../.venv/bin/python" ]]; then
  python_bin="${repo_root}/../.venv/bin/python"
else
  python_bin="python3"
fi

tracked_generated_paths=(
  "stats/pdgfeed.list.pdg_reactions.md"
  "stats/pdgfeed.supported.pdg_reactions.md"
  "stats/pdgfeed.summary.pdg_reactions.md"
  "content/contracts/examples/pdg/v1/generated/supported_reaction_primitive_deltas.v1.csv"
)

relevant_source_paths=(
  "pdgfeed.py"
  "pdgsolve.py"
  "scripts/pdg"
  "src/apps/pdgedit"
  "${tracked_generated_paths[@]}"
)

should_refresh=0
if [[ "$mode" == "always" ]]; then
  should_refresh=1
elif ! git diff --quiet -- "${relevant_source_paths[@]}"; then
  should_refresh=1
elif ! git diff --cached --quiet -- "${relevant_source_paths[@]}"; then
  should_refresh=1
fi

if [[ "$should_refresh" -eq 0 ]]; then
  exit 0
fi

echo "[pdg] refreshing live report/tool artifacts..."
"$python_bin" scripts/pdg/pdg_refresh_live_artifacts.py >/dev/null

if [[ "$mode" == "stage" ]]; then
  git add "${tracked_generated_paths[@]}"
fi

if ! git diff --quiet -- "${tracked_generated_paths[@]}"; then
  echo "[pdg] live report/tool artifacts changed after refresh."
  echo "[pdg] stage the regenerated files and retry."
  exit 1
fi
