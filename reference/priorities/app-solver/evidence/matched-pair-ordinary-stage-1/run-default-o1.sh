#!/bin/bash
# Runs the frozen baseline commands and wire envelopes on the O1 scratch
# build, into the O1 scratch evidence directory.
set -u
B=.tmp/eom-ordinary-integration-2026-10-14/build-o1
O=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1-scratch/default-outputs
W=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1-scratch/wire-outputs
E=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-envelopes
mkdir -p $O/records $W
run() { local name="$1"; shift; "$@" > "$O/$name.stdout" 2> "$O/$name.stderr"; echo "$name exit $?"; }
run native-all $B/eom_native_fixture_cli all
run acceleration-all $B/eom_native_acceleration_fixture_cli all
run evolution-all $B/eom_native_evolution_fixture_cli all
run matched-pair-all $B/eom_matched_pair_fixture_cli all
run matched-pair-piecewise $B/eom_matched_pair_fixture_cli piecewise
run matched-pair-evolution-guard $B/eom_matched_pair_fixture_cli evolution-guard
run provider-transport $B/eom_provider_transport_fixture_cli
run surface $B/eom_surface_fixture_cli
run equation-provider $B/eom_equation_provider_fixture_cli
run inspect-capabilities $B/eom_equation_inspect_cli capabilities
run borg-protocol-version $B/eom_borg_shadow_cli print-protocol-version
for c in known controller refusals cancellation aliasing continuation budgets admission ledger admission-b grouping workers; do
  run validated-$c $B/eom_validated_evolution_fixture_cli $c 1
done
run validated-record $B/eom_validated_evolution_fixture_cli record 1 $O/records
for c in producer generated-source consumer long; do
  run far-step-$c $B/eom_validated_far_step_fixture_cli $c
done
.tmp/eom-ordinary-integration-2026-10-14/wire/run-wire-baseline.sh $B/eom_borg_shadow_cli $E $W
echo default-done
