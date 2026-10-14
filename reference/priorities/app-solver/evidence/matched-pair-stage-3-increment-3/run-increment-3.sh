#!/bin/bash
# Usage: run-increment-3.sh <build directory> <output directory>
# Runs every evolution fixture command at worker counts 1, 2, 3, 4 and 8,
# with counts 4 and 8 repeated twice more, each into its own subdirectory,
# and the far-step and unchanged solver fixtures once.
set -u
B="$1"
O="$2"
run_evolution() {
  mkdir -p "$O/$1"
  for c in known controller refusals cancellation aliasing continuation budgets admission ledger admission-b grouping workers; do
    $B/eom_validated_evolution_fixture_cli $c $2 > $O/$1/$c.jsonl 2> $O/$1/$c.stderr
    echo "$1 $c exit $?"
  done
}
run_evolution w1 1
run_evolution w2 2
run_evolution w3 3
run_evolution w4 4
run_evolution w8 8
run_evolution w4-repeat-2 4
run_evolution w4-repeat-3 4
run_evolution w8-repeat-2 8
run_evolution w8-repeat-3 8
mkdir -p "$O/other"
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
