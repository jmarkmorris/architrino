# EOM Attractor Search — Work Log

Chronological agent status, run narratives, handoffs, and failed paths for
this workstream. Keep the live queue in [priorities.md](priorities.md) and
conceptual material in [brainstorming.md](brainstorming.md).

## 2026-07-15 — Workstream opened

- Bucket created from the operator session that executed the
  canonical-photon search (scoped negative, stacked + coplanar) and the
  E-B wake-pattern probe. Full context captured in
  [brainstorming.md](brainstorming.md).
- Operator inputs: Borg app (eom-backed) releases show early escapes plus
  transient couplings, including an observed 2:2 assembly (anecdotal grade,
  reproduce first); the final eom performance improvement has landed, so
  the previously planned single-enhancement decision is superseded and
  Phase 0 profiling now sizes the campaign instead of choosing an
  optimization.
- Next action: Phase 0 headless release profile at $N \in \{6,12,24,48\}$.

## 2026-07-15 — Phase 0 workload characterization complete

- New driver `scripts/eom/attractor-phase0-release-profile.cpp`
  (section-97-98 pattern; cost instrument only) released the declared
  `phase0-shell-v1` neutral family (deterministic low-discrepancy seeds,
  factory-certified circular prehistories, speeds $0.35$–$0.65\,c_f$, off
  the pin) at $N \in \{6,12,24,48\}$, step $0.01$, §86 normal policy,
  heartbeats on every accepted step.
- Rebuilt native first: last `src/eom` source change 2026-07-15 20:43:48
  UTC, build green 22:06:30 UTC. Three-suite acceptance gate green against
  the rebuilt binaries (15+12+17 OK; Borg process suite 4 OK; suites 2/4
  used a disclosed build-redirect shim to the freshly built binaries).
  One CLI-only gcc build fix: missing `<cmath>` in
  `eom_native_evolution_fixture_cli.cpp`.
- Headline measurements: per-step wall $\propto N^{1.97}$; exact-pair root
  certification $50$–$57\%$ of every step at $200$–$240$ µs per ordered
  pair per snapshot, $\approx 10$ snapshots per accepted step; zero
  traversal-excluded pairs anywhere (dispersal sheds no pair cost — the
  $O(N^2)$ tail is paid every step; escaper-culling is the only exponent
  lever); zero MPFR/rejected steps (close-encounter premium unmeasured,
  flagged); memory $\propto N^{1.99}$ per step plus ~0.5 GB/step
  certificate retention (OOM wall before wall-time wall) — Phase 2 must
  chunk via checkpoints and stream observables; 4-thread speedup
  $2.56\times$ at $N=24$; warm-root exclusion (the just-landed perf
  change) engaged, $89\%$ of cells skipped at $N=48$.
- Evidence note + campaign sizing:
  [evidence/phase0-workload-profile-2026-07-15.md](evidence/phase0-workload-profile-2026-07-15.md)
  with raw JSON ledgers in
  [evidence/phase0-workload-profile-2026-07-15/](evidence/phase0-workload-profile-2026-07-15/README.md).
  Phase 0 removed from the queue; phases renumbered.

## 2026-07-15 — Phase 2 harness core landed (same session)

- New `scripts/eom/attractor-ensemble-harness.cpp` extends the Phase 0
  profiler into the checkpoint-chunked ensemble harness. Per chunk: evolve,
  stream frame rows (JSONL) and one census row (JSONL), write the atomic
  engine checkpoint, discard the chunk certificate — memory stays bounded
  at one chunk (the Phase 0 OOM lesson). `--resume` continues from the
  checkpoint file. Heartbeats on every accepted step and chunk.
- Declared seeds: `phase0-shell-v1` with `--seed-offset` selecting distinct
  ensemble members (exact counts = (population, offset) pairs recorded in
  `run-manifest.json`); speeds stay $0.35$–$0.65\,c_f$, off the pin.
- T3 prehistory families, endpoint-matched within binary64:
  `--prehistory=circular` (provenance-bound factory) and
  `--prehistory=straight` (single exact linear segment, zero error terms —
  one segment has no interior joins, so the exact-rational continuity
  validation is satisfied by construction). **Both certify complete at
  release** (measured, $N=6$: all ordered root rows
  `certified_complete`); the release gate fails the run closed otherwise.
- Census per chunk (declared knobs in the manifest): union-find clusters at
  `--link-distance` with polarity composition and net charge in $|e|/6$
  units, per-cluster mass-free kinematic circulation ledger
  $\sum (x - \bar x) \times v$, escaper census (range beyond
  `--escape-radius` with positive radial velocity), speed histogram with
  dedicated $0.95$/$0.99$ pin-approach bins, minimum pair distance in
  chunk (collision diagnostic), engine health (halt code, MPFR pairs,
  rejected steps, chunk wall).
- Replay: `replay.borg-trajectory.json` in the
  `borg-fixture-trajectory.v1` shape (numeric times, pathKey/frameIndex
  ids), honest evidence fields
  (`executable_architecture_evidence`, `canonicalEomEvidence: false`).
  App-side import not yet exercised.
- **Validation (measured):** frames byte-identical (SHA-256
  `cca57446…`) across (i) two independent chunked runs and (ii) a run
  interrupted at $t=0.06$ and resumed to $t=0.1$, at $N=6$, chunk 3 steps
  — restart continuity holds byte-for-byte. Chunked vs one-shot differ
  only in last-ulp time tokens (18 of 66 rows) with state agreement
  $\le 6.9\times10^{-18}$ position / $3.5\times10^{-18}$ velocity against
  $2\times10^{-6}$ tolerances; exact cross-chunking identity waits on the
  engine's open split-absolute-time item. Demo artifact ($N=12$,
  $t\in[0,0.3]$, 6 chunks, root clearance green, zero MPFR/rejects):
  [evidence/phase2-harness-validation-2026-07-15/](evidence/phase2-harness-validation-2026-07-15/README.md).
- Straight-family cost note (measured, $N=6$, 3 steps): the 1-segment
  straight prehistory ran $\sim 13\times$ faster than the 400-segment
  circular one — prehistory segment count is a real cost knob for
  campaign seeding.
- **Operator handoff — $N=12$ host control** (converts the sandbox-to-host
  transfer from inferred to measured). On the native host, from the repo
  root, with the engine already built at `.tmp/eom-native-dev`:

  ```bash
  c++ -std=c++20 -O3 -DNDEBUG -Isrc/eom/include -I/opt/homebrew/include \
    scripts/eom/attractor-phase0-release-profile.cpp \
    .tmp/eom-native-dev/libeom_native.a \
    /opt/homebrew/lib/libmpfr.dylib /opt/homebrew/lib/libgmp.dylib \
    -pthread -o .tmp/attractor-phase0-release-profile
  .tmp/attractor-phase0-release-profile --population=12 --end-time=0.2 \
    --threads=4 \
    --output=reference/priorities/eom-attractor-search/evidence/phase0-workload-profile-2026-07-15/n12-host.json
  ```

  Comparison targets (sandbox, 4 threads): $0.591$ s/step, exact-root
  $49.6\%$, $10.1$ snapshots/step, $202$ µs per pair-snapshot, zero
  MPFR/rejected. The host-to-sandbox wall ratio is the transfer factor to
  apply to every Phase 0 sizing row; the percentages should move little
  (falsifier: an attribution shift $>10$ points would mean the cost
  structure, not just the clock, differs across hosts).
