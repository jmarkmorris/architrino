#!/bin/bash
# Runs the scratch C++ candidate's fixture commands and the unchanged solver
# fixtures of the scratch build. Known cases come first inside each command.
set -u
B=.tmp/eom-matched-pair/build-stage3
O=.local-data/eom-matched-pair/2026-10-11/stage3-cpp-candidate/outputs
for c in producer generated-source consumer long; do
  $B/eom_validated_far_step_candidate_cli $c > $O/candidate-$c.jsonl 2> $O/candidate-$c.stderr
  echo "candidate $c exit $?"
done
$B/eom_native_fixture_cli all > $O/eom_native_fixture_cli-all.stdout 2>/dev/null; echo "native exit $?"
$B/eom_native_acceleration_fixture_cli all > $O/eom_native_acceleration_fixture_cli-all.stdout 2>/dev/null; echo "acceleration exit $?"
$B/eom_native_evolution_fixture_cli all > $O/eom_native_evolution_fixture_cli-all.stdout 2>/dev/null; echo "evolution exit $?"
$B/eom_matched_pair_fixture_cli all > $O/matched-pair-module.jsonl 2>/dev/null; echo "matched-pair all exit $?"
$B/eom_matched_pair_fixture_cli piecewise > $O/matched-pair-piecewise.jsonl 2>/dev/null; echo "matched-pair piecewise exit $?"
$B/eom_matched_pair_fixture_cli evolution-guard > $O/matched-pair-evolution-guard.jsonl 2>/dev/null; echo "evolution-guard exit $?"
