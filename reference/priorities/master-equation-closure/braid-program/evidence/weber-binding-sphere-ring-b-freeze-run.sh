#!/bin/bash
# Lane B frozen sequence: known cases first, then targets. Every step is stamped in UTC.
set -u
cd /Users/markmorris/vibe/architrino
EV=reference/priorities/master-equation-closure/braid-program/evidence
E=$EV/weber-binding-sphere-ring-b-certify.mjs
OUT=.local-data/master-equation-closure/weber-binding-sphere/ring-b
PY=../.venv/bin/python
step() { echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) STEP $*"; }
step sha256; shasum -a 256 $EV/weber-binding-sphere-ring-b-*
step KB1; node $E kb1
step KB2-export-wide; node $E kb2export 100000
step KB2-export-tiny; node $E kb2export 100000 tiny
step KB2-check-both-in-parallel
$PY $EV/weber-binding-sphere-ring-b-kb2-check.py $OUT/kb2-enclosures.jsonl > $OUT/kb2-check-wide.log 2>&1 &
P1=$!
$PY $EV/weber-binding-sphere-ring-b-kb2-check.py $OUT/kb2-enclosures-tiny.jsonl > $OUT/kb2-check-tiny.log 2>&1 &
P2=$!
while kill -0 $P1 2>/dev/null || kill -0 $P2 2>/dev/null; do sleep 10; echo "[heartbeat $(date -u +%H:%M:%SZ)] kb2 wide: $(tail -n 1 $OUT/kb2-check-wide.log | cut -c1-90) | tiny: $(tail -n 1 $OUT/kb2-check-tiny.log | cut -c1-90)"; done
step KB2-result-wide; tail -n 1 $OUT/kb2-check-wide.log
step KB2-result-tiny; tail -n 1 $OUT/kb2-check-tiny.log
step lemma-checks; $PY $EV/weber-binding-sphere-ring-b-lemma-checks.py $OUT/lemma-checks.json | tr -d '\n'; echo
step KB4; node $E kb4 | cut -c1-200
step KB2-two-member-unlike; node $E run n2unlike | tail -n 1
step KB2-two-member-like; node $E run n2like | tail -n 1
step KB3-four-member-alternating; node $E run n4alt | tail -n 1
step KB3-four-member-alternating-tangential-only; node $E run n4altTonly | tail -n 1
step KB3-four-member-block-margin-0.01; node $E run generic ++-- 0.01 | tail -n 1
step KB3-four-member-alternating-lemma-free-margin-0.01; node $E run generic +-+- 0.01 50000000 --polygon-box 0.02 | tail -n 1
step KB3-mpmath-iv-and-TARGET-mpmath-iv; $PY $EV/weber-binding-sphere-ring-b-ivcheck.py $OUT/ivcheck-receipt.json | cut -c1-600
step TARGET-six-member-alternating; node $E run n6alt | tail -n 1
step TARGET-six-member-alternating-tangential-only; node $E run n6altTonly | tail -n 1
step TARGET-mpmath-iv-tangential-only; $PY $EV/weber-binding-sphere-ring-b-ivcheck.py $OUT/ivcheck-tangential-only-receipt.json tangential-only | cut -c1-600
step CROSSCHECK-nonalternating-2112-margin-0.01; node $E run generic ++-+-- 0.01 | tail -n 1
step CROSSCHECK-nonalternating-block-margin-0.01; node $E run generic +++--- 0.01 | tail -n 1
step CROSSCHECK-alternating-lemma-free-margin-0.01; node $E run generic +-+-+- 0.01 200000000 --polygon-box 0.005 | tail -n 1
step CROSSCHECK-tangential-only-lemma-free-margin-0.01-2112; node $E run generic ++-+-- 0.01 200000000 --tangential-only | tail -n 1
step CROSSCHECK-tangential-only-lemma-free-margin-0.01-block; node $E run generic +++--- 0.01 200000000 --tangential-only | tail -n 1
step CROSSCHECK-tangential-only-lemma-free-margin-0.01-alternating; node $E run generic +-+-+- 0.01 200000000 --polygon-box 0.005 --tangential-only | tail -n 1
step done
