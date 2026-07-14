# EOM Native Engine

This directory is the C++20 host implementation for the new Equation of Motion
engine. It is separate from `src/solver`; the existing central solver and all
of its current dependencies remain unchanged during EOM construction.

The executable layer currently contains:

- piecewise-cubic continuous retained histories with reconstruction-error
  enclosures and continuity checks;
- outward-rounded binary64 interval arithmetic for regular rows;
- a general moving-history receiver-source-time block certificate that either
  excludes every ordered pair in the declared memberships or sends the entire
  block to exact fallback;
- a deterministic hierarchical moving-history traversal with disjoint full
  pair coverage, bounded node work, compact exact tiles, and a bounded native
  exact-pair fallback;
- a deterministic multithreaded exact-pair retained-history/root batch;
- complete simple-root brackets with source-normal and receiver-normal
  enclosures, retained-history provenance fingerprints, segment identity,
  memory-boundary status, and the canonical coincident self-endpoint rule;
- local difficult-row replay using MPFR/GMP directed interval arithmetic; and
- fail-closed caustic/rail and precision-ceiling outcomes;
- certified sharp-law acceleration reconstruction that consumes only complete
  root certificates covering the full emission domain through reception;
- one auditable acceleration row per admitted root, including source normal,
  receiver normal, branch orientation, receiver strength, polarity, root
  precision route, and interval-vector contribution; and
- complete ordered receiver-source matrices, including self-pairs, with a
  fixed pairwise interval reduction tree whose result is independent of worker
  scheduling;
- correctness-first coupled cubic acceleration correction in which every path
  advances from one immutable accepted-history view;
- full-step versus two-half-step local position and velocity error estimates,
  exact step halving after rejection, and root-topology subdivision controls;
  and
- atomic in-memory publication that exposes either every recertified fine
  history or the unchanged input histories, never a partially advanced path
  set;
- tamper-evident checkpoint serialization, atomic durable file publication,
  and restart continuity that reproduces uninterrupted history fingerprints;
  and
- a Borg shadow process protocol that accepts continuous cubic histories and
  returns only atomically published history extensions.

The native fixtures are independently checked against the Python
90-decimal-digit oracle by `tests/test_eom_native_history_layer.py` and
`tests/test_eom_native_acceleration.py`. Coupled evolution and atomic
publication are checked against the same oracle by
`tests/test_eom_native_coupled_evolution.py`.

This is not yet the complete production EOM application. It accepts and
publishes correctness-first coupled sharp and finite-width steps, persists
single-host atomic checkpoints, and can drive an opt-in Borg shadow run. The
hierarchical traversal is not yet connected to coupled acceleration snapshots;
the coupled path still performs exhaustive ordered-pair reconstruction. GPU,
multi-GPU, distributed histories, split absolute time, multirate scheduling,
and production million-path traversal remain open. Borg shadow output remains
noncanonical until its convergence and performance gates pass.

Build and run the native fixture:

```bash
cmake -S src/eom -B /tmp/architrino-eom-build -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/architrino-eom-build --parallel 8
/tmp/architrino-eom-build/eom_native_fixture_cli all
/tmp/architrino-eom-build/eom_native_acceleration_fixture_cli all
/tmp/architrino-eom-build/eom_native_evolution_fixture_cli all
/tmp/architrino-eom-build/eom_borg_shadow_cli borg-shadow-v0
```

Run the independent parity test:

```bash
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_history_layer.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_acceleration.py -v
PYTHONPATH=. "${AAA_VENV:-../.venv}/bin/python" tests/test_eom_native_coupled_evolution.py -v
```
