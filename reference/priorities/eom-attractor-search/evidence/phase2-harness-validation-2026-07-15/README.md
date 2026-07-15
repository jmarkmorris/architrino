# Phase 2 harness validation demo artifacts (2026-07-15)

Output of `scripts/eom/attractor-ensemble-harness.cpp` for the demo release
($N=12$, `phase0-shell-v1` offset 0, circular prehistories, $t\in[0,0.3]$,
6 chunks of 5 steps, sample every 2 steps): `run-manifest.json` (declared
knobs, seed table, release root-clearance result, progress),
`census.jsonl` (one cluster/escape census row per chunk), and
`replay.borg-trajectory.json` (`borg-fixture-trajectory.v1`-shaped replay,
`executable_architecture_evidence`, noncanonical). Validation narrative:
[work-log](../../work-log.md), 2026-07-15 Phase 2 entry.
