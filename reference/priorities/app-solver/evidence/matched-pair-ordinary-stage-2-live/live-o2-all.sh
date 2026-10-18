#!/bin/bash
set -u
T=.tmp/eom-ordinary-integration-2026-10-14
$T/build-live-o2.sh || exit 1
$T/run-live-o2.sh
