#!/bin/bash
# Builds the live solver tree after increment 4 version 2, runs every fixture
# into live-outputs, and compiles and runs the reviewer's two unchanged
# record probes against the live library.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-matched-pair/build-live-increment-4
D=.local-data/eom-matched-pair/2026-10-12/increment-4-v2
mkdir -p $B $D/live-outputs $D/live-reviewer-probes
cmake -S src/eom -B $B -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk > $B.configure.log 2>&1 || { echo configure-failed; exit 1; }
cmake --build $B --parallel 2 --target eom_native eom_matched_pair_fixture_cli eom_native_fixture_cli eom_native_acceleration_fixture_cli eom_native_evolution_fixture_cli eom_validated_far_step_fixture_cli eom_validated_evolution_fixture_cli > $B.build.log 2>&1 || { echo build-failed; exit 1; }
echo live-built
.local-data/eom-matched-pair/2026-10-12/increment-4/run-increment-4.sh $B $D/live-outputs > $D/live-run.log 2>&1
echo live-ran
for probe in matched-pair-review-stage3-record-probe matched-pair-review-stage3-record-replay-probe; do
  /usr/bin/c++ -O2 -std=c++20 -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -ffp-contract=off -Isrc/eom/include -I/opt/homebrew/include reference/priorities/app-solver/evidence/$probe.cpp -o $D/live-reviewer-probes/$probe $B/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib /opt/homebrew/lib/libboost_json.dylib > $D/live-reviewer-probes/$probe.compile.log 2>&1
  echo "$probe compile exit $?"
  $D/live-reviewer-probes/$probe > $D/live-reviewer-probes/$probe.stdout 2> $D/live-reviewer-probes/$probe.stderr
  echo "$probe run exit $?"
done
