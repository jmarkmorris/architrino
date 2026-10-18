#!/bin/bash
set -u
B=.tmp/eom-ordinary-integration-2026-10-14/build-o1
O=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1-scratch
for w in 1 4; do
  $B/eom_validated_ordinary_fixture_cli $w > $O/ordinary-w$w.jsonl 2> $O/ordinary-w$w.stderr
  echo "workers $w exit $?"
done
