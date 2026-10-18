#!/bin/bash
set -u
node .tmp/eom-ordinary-integration-2026-10-14/o3-wire/run-v3-wire.mjs .tmp/eom-ordinary-integration-2026-10-14/build-o3/eom_borg_shadow_cli .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-v3 > .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-v3.jsonl 2> .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-v3.err
echo "wire exit $?"
mkdir -p .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-outputs
.tmp/eom-ordinary-integration-2026-10-14/wire/run-wire-baseline.sh .tmp/eom-ordinary-integration-2026-10-14/build-o3/eom_borg_shadow_cli .local-data/eom-matched-pair/2026-10-14/ordinary-integration/baseline/wire-envelopes .local-data/eom-matched-pair/2026-10-14/ordinary-integration/o3-scratch/wire-outputs
