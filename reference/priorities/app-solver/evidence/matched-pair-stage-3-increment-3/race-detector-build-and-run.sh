#!/bin/bash
# ThreadSanitizer build of the stage3i scratch tree and a run of the
# multi-worker fixture commands under it.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-matched-pair/build-stage3i-tsan
O=.local-data/eom-matched-pair/2026-10-12/increment-3/scratch-tsan
mkdir -p $B $O
cmake -S .tmp/eom-matched-pair/stage3i-tree/src/eom -B $B -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=/Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk "-DCMAKE_CXX_FLAGS=-fsanitize=thread -g" "-DCMAKE_EXE_LINKER_FLAGS=-fsanitize=thread" > $B.configure.log 2>&1 || { echo configure-failed; exit 1; }
cmake --build $B --parallel 2 --target eom_native eom_validated_evolution_fixture_cli > $B.build.log 2>&1 || { echo build-failed; exit 1; }
echo tsan-built
for c in workers grouping continuation; do
  for w in 1 8; do
    $B/eom_validated_evolution_fixture_cli $c $w > $O/$c-w$w.jsonl 2> $O/$c-w$w.stderr
    echo "$c w$w exit $?"
  done
done
