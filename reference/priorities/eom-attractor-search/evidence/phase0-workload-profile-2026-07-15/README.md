# Phase 0 raw timing ledgers (2026-07-15)

Raw JSON output of `scripts/eom/attractor-phase0-release-profile.cpp` backing
[the Phase 0 evidence note](../phase0-workload-profile-2026-07-15.md):
`n6/n12/n24/n48.json` (profile runs; `n48b.json` is the $N=48$ timing
repeat), `n24-t1.json`/`n24-t4.json` (thread A-B). Each file carries the full
`NativeEvolutionTiming` ledger, per-accepted-step snapshot timings with
traversal pair-route counts, and endpoint kinematics. `n12-host.json` is
reserved for the operator's native-host control run (commands in the
[work-log](../../work-log.md)).
