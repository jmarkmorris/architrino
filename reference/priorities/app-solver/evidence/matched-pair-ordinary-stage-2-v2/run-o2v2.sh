#!/bin/bash
# Runs the O2 scratch qualification: the persistence fixture with one and
# four workers, the O1 fixture, the reviewer's O1 admission probe, the frozen
# O0 default commands and wire envelopes, and the accepted increment 4 run
# script for the frozen record checker.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-ordinary-integration-2026-10-14/build-o2v2
S=.tmp/eom-ordinary-integration-2026-10-14/o2v2-tree/src/eom
O=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o2v2-scratch
for w in 1 4; do
  $B/eom_validated_persistence_fixture_cli $w $O/w$w-files > $O/persistence-w$w.jsonl 2> $O/persistence-w$w.stderr
  echo "persistence workers $w exit $?"
  $B/eom_validated_ordinary_fixture_cli $w > $O/ordinary-w$w.jsonl 2> $O/ordinary-w$w.stderr
  echo "ordinary workers $w exit $?"
done
P=reference/priorities/app-solver/evidence/matched-pair-review-ordinary-o1-admission-probe.cpp
/usr/bin/c++ -O3 -DNDEBUG -std=c++20 -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -ffp-contract=off -I $S/include $P -o $B/reviewer-o1-admission-probe $B/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib /opt/homebrew/lib/libboost_json.dylib || { echo probe-compile-failed; exit 1; }
$B/reviewer-o1-admission-probe > $O/reviewer-o1-admission-probe.stdout 2> $O/reviewer-o1-admission-probe.stderr
echo "probe exit $?"
reference/priorities/app-solver/evidence/matched-pair-stage-3-increment-4-v2/run-increment-4.sh $B $O/increment-4
sed -e 's#build-o1v2#build-o2v2#g; s#o1v2-scratch#o2v2-scratch#g' .tmp/eom-ordinary-integration-2026-10-14/run-default-o1v2.sh > .tmp/eom-ordinary-integration-2026-10-14/run-default-o2v2.sh
bash .tmp/eom-ordinary-integration-2026-10-14/run-default-o2v2.sh
echo o2-run-done
P2=reference/priorities/app-solver/evidence/matched-pair-review-ordinary-o2-replay-seal-probe.cpp
/usr/bin/c++ -O3 -DNDEBUG -std=c++20 -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -ffp-contract=off -I $S/include $P2 -o $B/reviewer-o2-replay-seal-probe $B/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib /opt/homebrew/lib/libboost_json.dylib || { echo seal-probe-compile-failed; exit 1; }
$B/reviewer-o2-replay-seal-probe > $O/reviewer-o2-replay-seal-probe.stdout 2> $O/reviewer-o2-replay-seal-probe.stderr
echo "seal probe exit $?"
