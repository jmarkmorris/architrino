# Ordinary integration gate O2, persistence scratch evidence

Sources, instruments and recorded outputs for the [O2 scratch receipt](../matched-pair-ordinary-stage-2-scratch-receipt-2026-10-14.md). Read the receipt for what was tested and what it establishes; this page adds no claim.

- `live-to-o2-library.diff`: the whole library change against accepted live O1, excluding `native/`.
- `ValidatedOrdinaryBridge.hpp`, `ValidatedOrdinaryBridge.cpp`, `eom_validated_persistence_fixture_cli.cpp`: the bridge and the O2 fixture as built.
- `matched_pair_ordinary_o2_check.py`: the O2 checker; it imports the unchanged O1 version 2 checker. Outputs: `o2-check-output.txt`, `o2-check.json`, and two preserved earlier runs of its worker-identity row.
- Regression outputs on the O2 build: `o1-v2-check-output.txt`, `increment-4-v2-check-output.txt`, `reviewer-o1-admission-probe.stdout`, `default-comparison.txt`, `field-dispositions.txt`.
- `build-o2.sh`, `run-o2.sh`, `run-default-o2.sh`: run from the checkout root under the owned-compute supervisor.
- `scratch-o2-source-inventory.sha256`, `scratch-o2-build-identities.sha256`, `scratch-o2-output-identities.sha256`.
