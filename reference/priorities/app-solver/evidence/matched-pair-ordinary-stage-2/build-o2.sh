#!/bin/bash
# Builds the O1 scratch tree into its own directory: the library, the O1
# fixture, the accepted fixtures and the CLIs used for default comparison.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-ordinary-integration-2026-10-14/build-o2
S=.tmp/eom-ordinary-integration-2026-10-14/o2-tree/src/eom
mkdir -p $B
cmake -S $S -B $B -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk > $B.configure.log 2>&1 || { echo configure-failed; exit 1; }
echo configured
cmake --build $B --parallel 2 --target eom_native eom_validated_ordinary_fixture_cli eom_validated_persistence_fixture_cli eom_equation_inspect_cli eom_provider_transport_fixture_cli eom_surface_fixture_cli eom_equation_provider_fixture_cli eom_native_fixture_cli eom_native_acceleration_fixture_cli eom_native_evolution_fixture_cli eom_matched_pair_fixture_cli eom_validated_far_step_fixture_cli eom_validated_evolution_fixture_cli eom_borg_shadow_cli > $B.build.log 2>&1 || { echo build-failed; exit 1; }
echo built
