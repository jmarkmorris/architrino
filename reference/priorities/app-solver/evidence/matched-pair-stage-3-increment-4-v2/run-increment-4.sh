#!/bin/bash
# Usage: run-increment-4.sh <build directory> <output directory>
# Runs every evolution fixture command with one worker, writing record files
# into <output>/w1/records; the record, worker and grouping commands again
# with four workers; and the far-step and unchanged solver fixtures once.
set -u
B="$1"
O="$2"
mkdir -p "$O/w1/records" "$O/w4/records" "$O/other"
for c in known controller refusals cancellation aliasing continuation budgets admission ledger admission-b grouping workers record; do
  $B/eom_validated_evolution_fixture_cli $c 1 $O/w1/records > $O/w1/$c.jsonl 2> $O/w1/$c.stderr
  echo "w1 $c exit $?"
done
for c in grouping workers record; do
  $B/eom_validated_evolution_fixture_cli $c 4 $O/w4/records > $O/w4/$c.jsonl 2> $O/w4/$c.stderr
  echo "w4 $c exit $?"
done
for c in producer generated-source consumer long; do
  $B/eom_validated_far_step_fixture_cli $c > $O/other/candidate-$c.jsonl 2> $O/other/candidate-$c.stderr
  echo "far-step fixture $c exit $?"
done
$B/eom_native_fixture_cli all > $O/other/eom_native_fixture_cli-all.stdout 2>/dev/null; echo "native exit $?"
$B/eom_native_acceleration_fixture_cli all > $O/other/eom_native_acceleration_fixture_cli-all.stdout 2>/dev/null; echo "acceleration exit $?"
$B/eom_native_evolution_fixture_cli all > $O/other/eom_native_evolution_fixture_cli-all.stdout 2>/dev/null; echo "evolution exit $?"
$B/eom_matched_pair_fixture_cli all > $O/other/matched-pair-module.jsonl 2>/dev/null; echo "matched-pair all exit $?"
$B/eom_matched_pair_fixture_cli piecewise > $O/other/matched-pair-piecewise.jsonl 2>/dev/null; echo "matched-pair piecewise exit $?"
$B/eom_matched_pair_fixture_cli evolution-guard > $O/other/matched-pair-evolution-guard.jsonl 2>/dev/null; echo "evolution-guard exit $?"
