#!/bin/bash
set -u
T=.tmp/eom-ordinary-integration-2026-10-14
$T/build-o1v2.sh || exit 1
$T/run-o1v2.sh || exit 1
$T/run-reviewer-probe-o1v2.sh || exit 1
$T/run-default-o1v2.sh
