#!/bin/bash
set -eu
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-matched-pair/build-stage3b
cmake -S .tmp/eom-matched-pair/stage3b-tree/src/eom -B $B -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk > $B.configure.log 2>&1
cmake --build $B --parallel 2 --target eom_native eom_matched_pair_fixture_cli eom_native_fixture_cli eom_native_acceleration_fixture_cli eom_native_evolution_fixture_cli > $B.build.log 2>&1
echo library-built
if [ -f .tmp/eom-matched-pair/stage3b-tree/src/eom/native/eom_validated_far_step_candidate_v2_cli.cpp ]; then
  /usr/bin/c++ -std=c++20 -O2 -ffp-contract=off -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -I .tmp/eom-matched-pair/stage3b-tree/src/eom/include -I .tmp/eom-matched-pair/stage3b-tree/src/eom/native -I /opt/homebrew/include .tmp/eom-matched-pair/stage3b-tree/src/eom/native/eom_validated_far_step_candidate_v2_cli.cpp $B/libeom_native.a -L/opt/homebrew/lib -lmpfr -lgmp -lboost_json -o $B/eom_validated_far_step_candidate_v2_cli > $B.cli.log 2>&1
  echo cli-built
fi
