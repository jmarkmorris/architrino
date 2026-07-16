# EOM Solver

This directory is the C++20 host implementation for EOM, the endorsed solver
and sole forward production target. It is separate from `src/solver`; the
existing zombie-solver remains available only as temporary compatibility for
current dependencies during consumer-by-consumer migration.

The executable layer currently contains:

- piecewise-cubic continuous retained histories with reconstruction-error
  enclosures and continuity checks;
- outward-rounded binary64 interval arithmetic for regular rows;
- a general moving-history receiver-source-time block certificate that either
  excludes every ordered pair in the declared memberships or sends the entire
  block to exact fallback;
- a deterministic hierarchical moving-history traversal with disjoint full
  pair coverage, bounded node work, compact exact tiles, and a bounded native
  exact-pair fallback that now supplies coupled acceleration snapshots;
- a deterministic multithreaded exact-pair retained-history/root batch;
- complete simple-root brackets with source-normal and receiver-normal
  enclosures, retained-history provenance fingerprints, segment identity,
  memory-boundary status, an inward-rounded MPFR tolerance-edge probe, and the
  canonical coincident self-endpoint rule;
- a provenance-bound uniform-circular history factory whose strict chord
  certificate excludes the complete open self-search interval at
  $0<v\le c_f$, while arbitrary straight $v=c_f$ histories remain
  fail-closed;
- local difficult-row replay using MPFR/GMP directed interval arithmetic; and
- fail-closed caustic/rail and precision-ceiling outcomes;
- certified sharp-law acceleration reconstruction that consumes only complete
  root certificates covering the full emission domain through reception;
- certified binary64 finite-width acceleration reconstruction that budgets
  error on the globally summed interval integral and refines the active time
  cell with the largest enclosure-width contribution, while retaining
  caller-bounded depth and cell exhaustion;
- a provenance-gated analytic pinned-fold specialization for self-pairs whose
  factory-certified circular-prefix speed equals $c_f$: a second-order Taylor
  enclosure preserves the vanishing causal-residual derivative, and a
  midpoint integral with a certified first-derivative remainder encloses the
  unchanged finite-width master-equation integral; arbitrary histories retain
  the generic finite-width route;
- a provenance-gated pinned-fold temporal onset step for the same exact
  $v=c_f$ circular endpoint: the certified sharp-chart value at the single
  onset instant is excluded from the positive-duration acceleration integral,
  the implicit right-endpoint acceleration advances the eligible path, and a
  certificate binds the history fingerprint, root-free open search,
  coincident-endpoint exclusion, memory boundary, start chart, and temporal
  rule;
- one auditable acceleration row per admitted root, including source normal,
  receiver normal, branch orientation, receiver strength, polarity, root
  precision route, and interval-vector contribution; and
- complete ordered receiver-source matrices, including self-pairs, with a
  fixed pairwise interval reduction tree whose result is independent of worker
  scheduling;
- correctness-first coupled cubic acceleration correction in which every path
  advances from one immutable accepted-history view;
- full-step versus two-half-step local position and velocity error estimates,
  with the pinned-fold onset rule applied consistently to the full step and
  first half-step, exact step halving after rejection, and root-topology
  subdivision controls;
  and
- atomic in-memory publication that exposes either every recertified fine
  history or the unchanged input histories, never a partially advanced path
  set, with corrected endpoint accelerations required to lie within the
  recertified inflated-history intervals up to the declared correction
  tolerance;
- tamper-evident checkpoint serialization, including factory revalidation of
  circular-prefix certificates, atomic durable file publication, and restart
  continuity that reproduces uninterrupted history fingerprints;
  and
- a persistent Borg shadow worker protocol that accepts continuous cubic
  histories and returns only atomically published history extensions; and
- Borg controls for retained-history population count, requested duration,
  automatic fixed-size chunks, progress, cancellation, and clean restart; and
- binary64 scheduling-tail detection that preserves the explicitly requested
  decimal endpoint when absolute-time subtraction leaves only a rounding-scale
  remainder. This is not the still-open split-absolute-time implementation.

The native fixtures are independently checked against the Python
90-decimal-digit oracle by `tests/test_eom_native_history_layer.py` and
`tests/test_eom_native_acceleration.py`. Coupled evolution and atomic
publication are checked against the same oracle by
`tests/test_eom_native_coupled_evolution.py`.

This is not yet the complete production EOM application. It accepts and
publishes correctness-first coupled sharp and finite-width steps, persists
single-host atomic checkpoints, and can drive an opt-in Borg shadow run. The
hierarchical traversal now drives coupled acceleration snapshots and records
certified exclusions versus exact fallback. Excluded pairs are still
materialized for the existing deterministic receiver reducer, so compressed
million-path reduction remains open. The persistent worker still receives the
full retained-history request at each atomic chunk. GPU, multi-GPU,
distributed histories, split absolute time, multirate scheduling, and the
production million-path run remain open. Borg shadow output remains
noncanonical. The strict one-path Borg refinement control passes, but the
eight-path strict seed control passes, and strict burn-in now continues beyond
the former `1003<-1004` tolerance-edge root wall at $T=32.48$. A seed-free
$T=90$ checkpoint, its post-burn-in convergence ladder, and the performance
gates must still pass before migration.

Build and run the native fixture:

```bash
cmake -S src/eom -B /tmp/architrino-eom-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-build --parallel 8
/tmp/architrino-eom-build/eom_native_fixture_cli all
/tmp/architrino-eom-build/eom_native_acceleration_fixture_cli all
/tmp/architrino-eom-build/eom_native_evolution_fixture_cli all
/tmp/architrino-eom-build/eom_borg_shadow_cli borg-shadow-v0
/tmp/architrino-eom-build/eom_borg_shadow_cli borg-shadow-server-v0
node scripts/eom/run-borg-eom-refinement-ladder.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli
node scripts/eom/run-borg-eom-refinement-ladder.mjs \
  /tmp/architrino-eom-build/eom_borg_shadow_cli 16
```

Run the independent parity test:

```bash
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_history_layer.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_acceleration.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_coupled_evolution.py -v
```
