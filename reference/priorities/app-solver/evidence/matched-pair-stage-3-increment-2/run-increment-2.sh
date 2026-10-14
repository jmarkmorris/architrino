#!/bin/bash
# Usage: run-increment-1.sh <build directory> <output directory>
# Runs the validated evolution fixture, the validated far-step fixture and
# the unchanged solver fixtures.
set -u
B="$1"
O="$2"
for c in known controller refusals cancellation aliasing continuation budgets admission ledger admission-b grouping; do
  $B/eom_validated_evolution_fixture_cli $c > $O/$c.jsonl 2> $O/$c.stderr
  echo "evolution fixture $c exit $?"
done
for c in producer generated-source consumer long; do
  $B/eom_validated_far_step_fixture_cli $c > $O/candidate-$c.jsonl 2> $O/candidate-$c.stderr
  echo "far-step fixture $c exit $?"
done
$B/eom_native_fixture_cli all > $O/eom_native_fixture_cli-all.stdout 2>/dev/null; echo "native exit $?"
$B/eom_native_acceleration_fixture_cli all > $O/eom_native_acceleration_fixture_cli-all.stdout 2>/dev/null; echo "acceleration exit $?"
$B/eom_native_evolution_fixture_cli all > $O/eom_native_evolution_fixture_cli-all.stdout 2>/dev/null; echo "evolution exit $?"
$B/eom_matched_pair_fixture_cli all > $O/matched-pair-module.jsonl 2>/dev/null; echo "matched-pair all exit $?"
$B/eom_matched_pair_fixture_cli piecewise > $O/matched-pair-piecewise.jsonl 2>/dev/null; echo "matched-pair piecewise exit $?"
$B/eom_matched_pair_fixture_cli evolution-guard > $O/matched-pair-evolution-guard.jsonl 2>/dev/null; echo "evolution-guard exit $?"
