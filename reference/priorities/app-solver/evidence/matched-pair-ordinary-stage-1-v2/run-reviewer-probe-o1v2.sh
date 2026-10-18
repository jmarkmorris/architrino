#!/bin/bash
# Compiles the reviewer's admission probe, unchanged, against the O1 v2
# scratch archive and runs it.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-ordinary-integration-2026-10-14/build-o1v2
S=.tmp/eom-ordinary-integration-2026-10-14/o1v2-tree/src/eom
O=.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o1v2-scratch
P=reference/priorities/app-solver/evidence/matched-pair-review-ordinary-o1-admission-probe.cpp
/usr/bin/c++ -O3 -DNDEBUG -std=c++20 -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -ffp-contract=off -I $S/include $P -o $B/reviewer-o1-admission-probe $B/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib /opt/homebrew/lib/libboost_json.dylib || { echo probe-compile-failed; exit 1; }
$B/reviewer-o1-admission-probe > $O/reviewer-o1-admission-probe.stdout 2> $O/reviewer-o1-admission-probe.stderr
echo "probe exit $?"
