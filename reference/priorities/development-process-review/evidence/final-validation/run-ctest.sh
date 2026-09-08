#!/bin/bash
set -eu
build_dir=$(mktemp -d /private/tmp/architrino-recovery-ctest.XXXXXX)
echo "BUILD_DIRECTORY=$build_dir"
date -u
cmake -S src/eom -B "$build_dir" -DCMAKE_BUILD_TYPE=Release
cmake --build "$build_dir" --parallel 4
date -u
ctest --test-dir "$build_dir" --show-only
ctest --test-dir "$build_dir" --output-on-failure --timeout 300
