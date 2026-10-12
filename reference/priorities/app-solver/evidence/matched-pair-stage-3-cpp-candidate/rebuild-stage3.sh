#!/bin/bash
set -eu
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-matched-pair/build-stage3
cmake --build $B --parallel 2 --target eom_native eom_matched_pair_fixture_cli eom_native_fixture_cli eom_native_acceleration_fixture_cli eom_native_evolution_fixture_cli > $B.rebuild.log 2>&1
/usr/bin/c++ -std=c++20 -O2 -ffp-contract=off -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -I .tmp/eom-matched-pair/stage3-tree/src/eom/include -I .tmp/eom-matched-pair/stage3-tree/src/eom/native -I /opt/homebrew/include .tmp/eom-matched-pair/stage3-tree/src/eom/native/eom_validated_far_step_candidate_cli.cpp $B/libeom_native.a -L/opt/homebrew/lib -lmpfr -lgmp -lboost_json -o $B/eom_validated_far_step_candidate_cli >> $B.rebuild.log 2>&1
echo rebuild-done
