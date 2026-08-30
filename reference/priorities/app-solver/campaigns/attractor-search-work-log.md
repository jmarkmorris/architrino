# EOM Attractor-Search Instrument Work Log

Chronological status, run narratives, handoffs, and failed paths for the EOM-owned profiler and checkpoint-chunked ensemble harness. Keep the live instrument state in [Attractor-Search Execution Instrument](./attractor-search-instrument.md). Scientific campaign design and fate classification remain with the relevant scientific owner.

## 2026-07-27 — Corrected resume accounting and G3/G4 reaccepted

- Commit `287dd735b67e2f3e9407a7ca4ec2bc443c9b5cbc` repaired cumulative checkpoint/resume accounting, bound resume to the checkpoint, manifest, and requested configuration, retained certified release-root clearance, made manifest replacement atomic, repaired the public checkpoint dumper, and added a bounded parity checker.
- A later evidence-only change crossed the instrument gate's separate-change boundary. Fresh release and sanitizer builds each passed all 6 compiled fixtures and an interrupted-versus-uninterrupted two-chunk comparison. Checkpoints, frame streams, evolved records, and replay records were byte-identical; deterministic census fields and exact checkpoint-to-record tokens matched; cumulative counters advanced; and both manifests retained `releaseRootClearance: certified_complete`.
- G3 and G4 are accepted for bounded campaign execution. The comparison proves determinism, accounting, release-ledger propagation, and serialization identity only. It does not supply independent numerical correctness or any campaign outcome. See the [acceptance packet](../evidence/attractor-resume-g3-g4-reacceptance-2026-07-27.md).

## 2026-07-26 — Focused packet distributed to canonical owners

- Moved the reusable execution-instrument state and this chronological log under EOM.
- Removed the redundant `eom-attractor-search` routing directory. This changes no instrument acceptance, campaign gate, or physical claim.

## 2026-07-24 — Historical simulation outputs removed

- Operator directed a clean start after the EOM solver review.
- Removed the seven Phase 0 workload run ledgers and the Phase 2 harness demo bundle from tracked evidence.
- Removed local Campaign 1 run bundles and scratch EOM, Borg, finite-width, affine, verification, checkpoint, and legacy braid-ideal simulation outputs.
- The measurements below are retained only as chronological narrative. Their raw artifacts are gone, they are not current evidence, and none may be reused as a baseline or campaign-acceptance basis.
- The next run must begin from a fresh build and establish new independent, sanitizer, checkpoint, and replay evidence.

## 2026-07-16 — Ownership consolidated

- This directory ceased to be an independently ranked workstream.
- Scientific campaign owners retain their seed definitions, persistence criteria, fate classifications, and collapse adjudications.
- EOM owns the reusable checkpointed harness, deterministic replay, campaign-driver behavior, performance attribution, and cost instrument.
- At that time, existing evidence, validation artifacts, host-control instructions, and chronological notes remained here as a focused packet. The 2026-07-24 reset above supersedes that artifact-retention decision.

## 2026-07-15 — Workstream opened

- Bucket created by operator direction to characterize population-release workload. The final EOM performance improvement had already landed, so Phase 0 profiling sized the reusable harness rather than choosing another optimization.
- Next action: Phase 0 headless release profile at $N \in \{6,12,24,48\}$.

## 2026-07-15 — Phase 0 workload characterization complete

- New driver `scripts/eom/attractor-phase0-release-profile.cpp` (cost instrument only) released the declared `phase0-shell-v1` neutral family (deterministic low-discrepancy seeds, factory-certified circular prehistories, speeds $0.35$–$0.65\,c_f$, off the pin) at $N \in \{6,12,24,48\}$, step $0.01$, the engine normal policy, heartbeats on every accepted step.
- Rebuilt native first: last `src/eom` source change 2026-07-15 20:43:48 UTC, build green 22:06:30 UTC. Three-suite acceptance gate green against the rebuilt binaries (15+12+17 OK; Borg process suite 4 OK; suites 2/4 used a disclosed build-redirect shim to the freshly built binaries). One CLI-only gcc build fix: missing `<cmath>` in `eom_native_evolution_fixture_cli.cpp`.
- Headline measurements: per-step wall $\propto N^{1.97}$; exact-pair root certification $50$–$57\%$ of every step at $200$–$240$ µs per ordered pair per snapshot, $\approx 10$ snapshots per accepted step; zero traversal-excluded pairs anywhere (dispersal sheds no pair cost — the $O(N^2)$ tail is paid every step; escaper-culling is the only exponent lever); zero MPFR/rejected steps (close-encounter premium unmeasured, flagged); memory $\propto N^{1.99}$ per step plus ~0.5 GB/step certificate retention (OOM wall before wall-time wall) — Phase 2 must chunk via checkpoints and stream observables; 4-thread speedup $2.56\times$ at $N=24$; warm-root exclusion (the just-landed perf change) engaged, $89\%$ of cells skipped at $N=48$.
- The evidence note and raw JSON ledgers described here were intentionally removed on 2026-07-24. Phase 0 must be rerun before any of these measurements are reused.

## 2026-07-15 — Phase 2 harness core landed (same session)

- New `scripts/eom/attractor-ensemble-harness.cpp` extends the Phase 0 profiler into the checkpoint-chunked ensemble harness. Per chunk: evolve, stream frame rows (JSONL) and one census row (JSONL), write the atomic engine checkpoint, discard the chunk certificate — memory stays bounded at one chunk (the Phase 0 OOM lesson). `--resume` continues from the checkpoint file. Heartbeats on every accepted step and chunk.
- Declared seeds: `phase0-shell-v1` with `--seed-offset` selecting distinct ensemble members (exact counts = (population, offset) pairs recorded in `run-manifest.json`); speeds stay $0.35$–$0.65\,c_f$, off the pin.
- Prehistory families endpoint-matched within binary64: `--prehistory=circular` (provenance-bound factory) and `--prehistory=straight` (single exact linear segment, zero error terms — one segment has no interior joins, so the exact-rational continuity validation is satisfied by construction). **Both certify complete at release** (measured, $N=6$: all ordered root rows `certified_complete`); the release gate fails the run closed otherwise.
- Census per chunk (declared knobs in the manifest): union-find clusters at `--link-distance` with polarity composition and net charge in $|e|/6$ units, per-cluster mass-free kinematic circulation ledger $\sum (x - \bar x) \times v$, escaper census (range beyond `--escape-radius` with positive radial velocity), speed histogram with dedicated $0.95$/$0.99$ pin-approach bins, minimum pair distance in chunk (collision diagnostic), engine health (halt code, MPFR pairs, rejected steps, chunk wall).
- Replay: `replay.borg-trajectory.json` in the `borg-fixture-trajectory.v1` shape (numeric times, pathKey/frameIndex ids), honest evidence fields (`executable_architecture_evidence`, `canonicalEomEvidence: false`). App-side import not yet exercised.
- **Validation (measured):** frames byte-identical (SHA-256 `cca57446…`) across (i) two independent chunked runs and (ii) a run interrupted at $t=0.06$ and resumed to $t=0.1$, at $N=6$, chunk 3 steps — restart continuity holds byte-for-byte. Chunked vs one-shot differ only in last-ulp time tokens (18 of 66 rows) with state agreement $\le 6.9\times10^{-18}$ position / $3.5\times10^{-18}$ velocity against $2\times10^{-6}$ tolerances; exact cross-chunking identity waits on the engine's open split-absolute-time item. Demo artifact ($N=12$, $t\in[0,0.3]$, 6 chunks, root clearance green, zero MPFR/rejects). The demo artifact was intentionally removed on 2026-07-24 and no longer supports current harness acceptance.
- Straight-family cost note (measured, $N=6$, 3 steps): the 1-segment straight prehistory ran $\sim 13\times$ faster than the 400-segment circular one — prehistory segment count is a real cost knob for campaign seeding.
- The former host-control handoff and comparison targets were retired with the old run artifacts on 2026-07-24. A replacement baseline must declare new output paths and must not compare against the removed timing measurements.
