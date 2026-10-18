#!/bin/bash
set -u
T=.tmp/eom-ordinary-integration-2026-10-14
$T/build-o2v3.sh || exit 1
$T/run-o2v3.sh
