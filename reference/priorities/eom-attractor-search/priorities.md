# EOM Attractor Search — Priorities

Current: workstream opened 2026-07-15 by operator direction; the final eom
performance improvement has landed. Phase 0 workload characterization is COMPLETE
(2026-07-15): per-step wall $\propto N^{1.97}$, exact-pair root
certification owns $50$–$57\%$ of the step, zero traversal-excluded pairs
(dispersal sheds no pair cost), memory $\propto N^2$ per step plus
~0.5 GB/step certificate retention at $N=24$ — see
[evidence/phase0-workload-profile-2026-07-15.md](evidence/phase0-workload-profile-2026-07-15.md).

Objective: determine whether the coupled delayed-history dynamics of small
neutral architrino populations produce persistent bound structures
(attractors / limit cycles) without any rigid-shape or force-balance
ansatz, under the endpoint-matched prehistory collapse protocol.

1. Phase 2 residuals — the harness core LANDED 2026-07-15
   ([attractor-ensemble-harness.cpp](../../../scripts/eom/attractor-ensemble-harness.cpp):
   checkpoint-chunked with streamed census + frames, byte-identical
   rerun/resume, release root-clearance gate, endpoint-matched
   circular|straight prehistory families, Borg-shaped replay output;
   validation artifacts in
   [evidence/phase2-harness-validation-2026-07-15/](evidence/phase2-harness-validation-2026-07-15/README.md)).
   Remaining: (a) operator runs the $N=12$ host control (exact commands in
   the [work-log](work-log.md)) to convert sandbox-to-host timing transfer
   from inferred to measured; (b) load one `replay.borg-trajectory.json`
   in the Borg app to confirm visualization (schema-shaped, app import
   not yet exercised); (c) cross-chunking bit-identity is blocked on the
   engine's open split-absolute-time item — chunked vs one-shot agree to
   $\le 7\times10^{-18}$ (measured), identical within any one chunking.
2. Phase 3 — first declared campaign: exact-count seed grids; persistence
   criterion fixed before scoring; targeted 2:2-neighborhood sub-campaign
   first ($N \in \{4,6,8\}$ is minutes per period — the cheap statistical
   power); size $N = 24$–$48$ ensembles in tens of seeds; escaper-culling
   only with certified back-reaction bound and operator ratification
   (Phase 0 measured zero traversal-excluded pairs — culling is the only
   lever on the $N^2$ tail).
3. Phase 4 — collapse-protocol adjudication of any persistent cluster;
   promotion routing to the claims queue.

Support: [brainstorming.md](brainstorming.md) (diagnosis, plan rationale,
observables, constraints, open questions), [work-log.md](work-log.md).
