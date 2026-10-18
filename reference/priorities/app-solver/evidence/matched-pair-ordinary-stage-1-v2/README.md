# Ordinary integration gate O1 version 2, scratch correction evidence

Source snapshots, instruments and recorded outputs for the [O1 version 2 scratch receipt](../matched-pair-ordinary-stage-1-v2-scratch-receipt-2026-10-14.md). Read the receipt for what was tested and what it establishes; this page adds no claim. Version 1 evidence is in [matched-pair-ordinary-stage-1/](../matched-pair-ordinary-stage-1/), unchanged.

- `ValidatedOrdinaryBridge.hpp`, `ValidatedOrdinaryBridge.cpp`, `eom_validated_ordinary_fixture_cli.cpp`: version 2 sources.
- `o1-version-1-to-version-2.diff`, `live-to-o1-v2-library.diff`: the correction, and the whole library change against live.
- `matched_pair_ordinary_o1_v2_check.py` with `make_o1v2_checker.py`, which derives it from the unchanged version 1 checker. Outputs: `o1-v2-check-output.txt`, `o1-v2-check.json`, and the preserved first run, `o1-v2-check-output-first-run-selector-defect.txt`.
- `reviewer-o1-admission-probe.stdout`: the reviewer's probe, unchanged, compiled against this archive by `run-reviewer-probe-o1v2.sh`.
- `default-comparison.txt`, `field-dispositions.txt`: from the version 1 instruments, unchanged.
- `build-o1v2.sh`, `run-o1v2.sh`, `run-default-o1v2.sh`, `o1v2-all.sh`: run from the checkout root under the owned-compute supervisor.
- `scratch-o1-v2-source-inventory.sha256`, `scratch-o1-v2-output-identities.sha256`.
