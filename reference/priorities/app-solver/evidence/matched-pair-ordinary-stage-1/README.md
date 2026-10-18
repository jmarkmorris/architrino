# Ordinary integration gate O1, scratch candidate evidence

Source snapshots, instruments and recorded outputs for the [O1 scratch receipt](../matched-pair-ordinary-stage-1-scratch-receipt-2026-10-14.md). Read the receipt for what was tested and what it establishes; this page adds no claim.

- `ValidatedOrdinaryBridge.hpp`, `ValidatedOrdinaryBridge.cpp`: the new bridge sources.
- `live-to-o1-library.diff`: the whole library change against live `src/eom`, excluding `native/`.
- `eom_validated_ordinary_fixture_cli.cpp`: the focused fixture.
- `matched_pair_ordinary_o1_check.py`: the checker; it imports the accepted increment 4 version 2 checker unchanged. Output: `o1-check-output.txt`, `o1-check.json`.
- `compare-default-outputs.mjs`: default-output comparison against the O0 baseline. Output: `default-comparison.txt`.
- `field-dispositions.mjs`: per-field disposition of the ordinary request. Output: `field-dispositions.txt`.
- `build-o1.sh`, `run-o1.sh`, `run-default-o1.sh`: build and run scripts, run from the checkout root under the owned-compute supervisor.
- `scratch-o1-source-inventory.sha256`, `scratch-o1-output-identities.sha256`: identities of the scratch tree and the fixture outputs.
