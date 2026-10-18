#!/bin/bash
set -u
T=.tmp/eom-ordinary-integration-2026-10-14
$T/build-live-o1.sh || exit 1
$T/run-live-o1.sh || exit 1
$T/run-reviewer-probe-live-o1.sh || exit 1
$T/run-default-live-o1.sh
