#!/bin/bash
set -u
node .tmp/eom-ordinary-integration-2026-10-14/o3v2-js/run-end-to-end.mjs .tmp/eom-ordinary-integration-2026-10-14/build-o3/eom_borg_shadow_cli .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3v2-scratch/end-to-end > .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3v2-scratch/end-to-end-output.txt 2>&1
echo "e2e exit $?"
