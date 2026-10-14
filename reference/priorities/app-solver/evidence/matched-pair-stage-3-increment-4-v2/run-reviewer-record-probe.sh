#!/bin/bash
# Compiles the reviewer's unchanged record probe against the version 2
# scratch library and runs it.
set -u
export DEVELOPER_DIR=/Library/Developer/CommandLineTools
B=.tmp/eom-matched-pair/build-stage3k
O=.local-data/eom-matched-pair/2026-10-12/increment-4-v2/reviewer-probe
mkdir -p $O
/usr/bin/c++ -O2 -std=c++20 -arch arm64 -isysroot /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk -ffp-contract=off -I.tmp/eom-matched-pair/stage3k-tree/src/eom/include -I/opt/homebrew/include reference/priorities/app-solver/evidence/matched-pair-review-stage3-record-probe.cpp -o $O/record-probe $B/libeom_native.a /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib /opt/homebrew/lib/libboost_json.dylib > $O/compile.log 2>&1
echo "compile exit $?"
$O/record-probe > $O/record-probe.stdout 2> $O/record-probe.stderr
echo "probe exit $?"
