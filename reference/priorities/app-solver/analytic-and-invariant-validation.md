# Analytic And Invariant Validation

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closed-validation-plan`

Kind: `solver-validation-plan`

Source task: `analytic_and_invariant_validation` in [priorities.md](priorities.md)

Primary dependencies:

- [model-contract.md](model-contract.md)
- [precision.md](precision.md)
- [simulation-envelope-contract.md](simulation-envelope-contract.md)
- [path-history-stream-contract.md](path-history-stream-contract.md)
- [numeric-serialization-contract.md](numeric-serialization-contract.md)

## Purpose

The zombie-solver cannot be accepted by baseline comparison alone. App baselines
are useful regression checks, but they can preserve an old approximation, an app
boundary, or a display convention. This plan defines solver-owned analytic and
invariant validation: manufactured causal-root cases, closed-form geometry
cases, root-count invariants, residual checks, stream replay invariants,
bounded drift checks where the selected model supplies a valid invariant, and
fail-closed failure classifications.

The validation target is the architrino motion, causal-root, delayed-hit,
geometry, path-history, and app-bridge solver surface. It is not a general
numerical-methods checklist and it does not add a migration gate by itself.

## Validation Record

Every analytic or invariant fixture should emit a compact validation record so
native, WebAssembly, app-bridge, and batch checks can be compared without
rewriting the fixture logic.

| Field | Requirement |
| --- | --- |
| `fixtureId` | Stable id such as `linear_collinear_single_root` or `path_stream_round_trip`. |
| `fixtureFamily` | One of `manufactured_causal_root`, `closed_form_geometry`, `root_count_invariant`, `root_hit_invariant`, `stream_replay_invariant`, `bounded_drift`, or `failure_classification`. |
| `model` | Full model contract: model id, equation or force-law version, constants hash, causal speed policy, branch policy, unit convention, and compatible precision paths. |
| `claimLevel` | Fixture claim level: `interactive-preview`, `migration-parity`, `exported-dataset`, or `validation-evidence`. |
| `precision` | Requested and selected precision path, numeric type, numeric chart, scale normalization, and tolerance vector. |
| `inputHash` | Hash of the normalized request, source histories, stream rows, or geometry rows under test. |
| `expected` | Exact formula, closed-form reference, high-precision oracle reference, or declared invariant. |
| `observed` | Solver output rows, manifest summary, stream readback summary, invariant report, and status records. |
| `comparison` | Tolerance-scaled deltas, root-count comparison, residual comparison, stream/checksum comparison, or bounded-drift envelope. |
| `status` | Canonical solver status code and severity. A fixture that cannot satisfy its claim level must fail closed. |

Validation evidence must be reproducible from the record and its artifacts. A
fixture may use a high-precision oracle when no simple closed form exists, but
the oracle precision, tolerance, and reference generation method must be part of
the record.

## Manufactured Causal-Root Cases

Manufactured causal-root fixtures choose source and receiver histories so the
root equation is known before the solver runs. The solver must recover all
positive causal roots inside the declared source-history support, classify
missing or rejected roots explicitly, and preserve root-ledger detail.

For hit time $T$, signal speed $c_f$, source path $\mathbf{x}_s(t)$, and
receiver point $\mathbf{x}_r(T)$, the scalar root residual is:

$$R(t) = \lVert \mathbf{x}_r(T) - \mathbf{x}_s(t) \rVert - c_f (T - t)$$

An accepted root must satisfy the normalized and absolute residual tolerances,
the branch metadata rules, and the hit/ledger consistency checks below.

| Fixture id | Construction | Expected result | Required checks |
| --- | --- | --- | --- |
| `static_static_single_root` | Fixed source and fixed receiver with distance $d$ and hit time $T$. | One root at $t_e = T - d / c_f$ when $t_e$ lies inside the source support. | Root count 1, delay $d / c_f$, distance $d$, residual 0 within tolerance, positive delay, finite source-normal Jacobian, and receiver-normal branch weight computed from the same-record $D_T/D_s$ row. |
| `static_static_history_boundary` | Same geometry, but the source support starts after the analytic emission time. | No active root; ledger records an inactive gap, finite-history boundary, or first-failure row. | Root count 0, no fabricated root at the support edge, status `insufficient_history_depth` or `root_not_bracketed` as appropriate. |
| `linear_collinear_single_root` | Affine source $x_s(t)=a+v t$ on the line to a fixed receiver $R$, with $\lvert v \rvert < c_f$ and no crossing. | One root from $(R-a-vt) = c_f(T-t)$, so $t_e = (R-a-c_f T)/(v-c_f)$. | Root count 1, expected emission time, bracket contains the root, residual tolerance, Jacobian sign stratum, and branch weight. |
| `linear_collinear_no_catch_up` | Source and receiver geometry chosen so the analytic root is outside the declared history or requires a negative delay. | No retained active root. | No positive root emitted, first-failure status explains whether the issue is history depth, no bracket, or invalid time ordering. |
| `linear_oblique_quadratic_roots` | Linear source and fixed or linear receiver in 2D or 3D, solved by the quadratic form of `R(t) = 0`. | Zero, one tangent, or two candidate roots depending on the discriminant and support interval. | Root count matches discriminant/support classification; duplicate roots inside tolerance are merged or classified as small-Jacobian/tangent. |
| `circular_axis_constant_distance` | Circular source with receiver on the rotation axis, so distance is constant for all phases. | One root at $t_e = T - \sqrt{r^2 + h^2}/c_f$ when in support. | Emission time, delay, distance, residual, phase metadata, and root-ledger detail match the closed form. |
| `circular_source_known_phase` | Circular source with zero angular speed or a phase selected so the source point is fixed at the expected emission time. | One root with known emission point and delay. | Circular-source ABI and bridge paths agree on root count, hit distance, hit strength, ledger kind, bracket, and iteration count. |
| `small_jacobian_tangent` | Source speed and geometry tuned so the root is tangent or nearly tangent to the signal cone. | Root is rejected or downgraded unless the selected precision path can certify it. | Status `small_jacobian` or `transversality_floor_failed`; no ordinary receiver-normal branch strength is trusted when the source-normal denominator is below floor. |
| `normalized_coordinate_equivalence` | Same manufactured root solved once in absolute coordinates and once in an origin-normalized local frame. | Authoritative local roots match; absolute-display roots are marked display-only when scale requires it. | Root count, emission time, delay, residual, branch labels, and selected precision path are equivalent inside tolerance. |
| `batch_order_equivalence` | A set of independent manufactured root requests run singly and in a batch with shuffled input order. | Same per-request roots and statuses after deterministic merge ordering. | Per-item root counts, root ids or stable labels, residuals, and status records are invariant under batching. |

The first native smoke coverage already includes a moving-source delayed-hit
case and a constant-distance circular-source case. This plan extends that
coverage into a named fixture family with support-boundary, tangent,
normalization, and batch-order obligations.

## Closed-Form Geometry Cases

Closed-form geometry fixtures protect solver-owned geometry before app
projection or migration baselines are considered.

| Fixture id | Construction | Required checks |
| --- | --- | --- |
| `displacement_distance_direction` | Fixed source and receiver endpoint pairs with nonzero and zero-distance variants. | Displacement, distance, unit direction, zero-distance policy, finite fields, and value authority are correct. |
| `linear_path_bounds` | Linear path segments with known endpoint extrema. | Bounds include both endpoints, path key metadata is stable, time/frame bounds are ordered, and interpolation error is preserved. |
| `constant_acceleration_segment` | Constant-acceleration motion with analytic position and velocity at frame times. | Frame rows match analytic position and velocity; path segments carry the expected interpolation error bound. |
| `sphere_point_membership` | Points exactly on, inside, and outside a sphere with declared tolerance. | Spherical emission checks classify inside/on/outside without mixing display projection and authoritative geometry. |
| `path_bounds_overlap` | Pairs of boxes and segment bounds with known overlap and non-overlap. | Broad-phase geometry returns all true overlaps and rejects only certified non-overlaps. |
| `circular_self_hit_span` | Circular self-hit spans in sub-field, near-field, and super-field regimes where span endpoints have closed forms or a high-precision reference. | Span root status, endpoint ordering, delay window, and regime label match reference. |
| `delayed_potential_flight_time` | Ideal Braid-style flight-time rows with fixed source/receiver geometry. | Emission time, delay, distance, potential row status, and shared-geometry artifact hash match reference. |
| `phase_at_hit_cycle` | Hit rows with known source and receiver phases at hit. | Cycle indices, phases, phase delta, phase spread, layer/role/charge metadata, and summary ranges are consistent. |

Geometry fixtures should use the same binary row layouts exposed by the central
solver where practical: `frame_buffer.v1`, `path_segment.v1`,
`delayed_hit_events.v1`, `phase_at_hit.v1`, `root_ledger.v1`,
`root_ledger_detail.v1`, and shared-geometry buffers.

## Root-Count Invariants

Root-count validation is the guard against silent branch loss. A solver result
may refine a root, reject a root, or halt, but it must not change root
accounting without an explicit ledger explanation.

Required invariants:

1. Active roots plus inactive search gaps, tail-boundary rows, transition rows,
   and first-failure rows cover the declared source/receiver search window.
2. Root labels are stable under small input perturbations when no root crosses a
   support boundary and no Jacobian floor is crossed.
3. A root birth, death, fold, or tail assimilation is represented through the
   root-transition classifier, not as ordinary Newton drift.
4. A failure row in either compared ledger produces `ledger_rerun_required`
   when a consumer would otherwise compare incompatible root label sets.
5. Batch, worker, or stream partitioning cannot change active root counts after
   deterministic merge ordering.
6. Origin-normalized and absolute-display variants must agree on authoritative
   root count; display-only absolute rows cannot add validation authority.
7. Duplicate roots closer than the declared merge tolerance must either merge
   deterministically or be classified as a small-Jacobian/tangent case.
8. Support-boundary roots must record whether the boundary is included,
   excluded, tail-assimilated, or insufficient for the requested history depth.

Root-count fixture rows should compare:

| Metric | Acceptance rule |
| --- | --- |
| `activeRootCount` | Exact match to analytic or oracle reference for the declared support. |
| `inactiveGapCount` | Covers no-root intervals without overlapping active roots. |
| `transitionKind` | One of retained, appeared, disappeared, folded, assimilated-from-tail, or ledger-rerun-required. |
| `rootLabelSetHash` | Stable across deterministic replay when no branch transition occurs. |
| `ledgerCoverageStatus` | `ok` only when active roots, gaps, tails, and failures account for the search window. |

## Residual Checks

Residual validation must be stage-aware. A root residual, hit residual,
integration residual, stream replay residual, and projection residual have
different scales and different authority.

| Check | Acceptance rule | Failure status |
| --- | --- | --- |
| Root residual | `abs(R(t_e)) <= rootIsolationTolerance` and normalized residual is below the declared scale-aware tolerance. | `root_unresolved` or `validation_replay_mismatch` |
| Bracket containment | The final bracket contains the retained emission time and preserves a sign change or certified tangent classification when applicable. | `root_not_bracketed`, `small_jacobian`, or `transversality_floor_failed` |
| Delay consistency | `delay = hitTime - emissionTime` inside time tolerance and delay is nonnegative for retained positive roots. | `validation_replay_mismatch` |
| Distance consistency | Root and hit distances match endpoint separation inside distance tolerance. | `validation_replay_mismatch` |
| Branch weight | For ordinary roots, branch weight or hit strength is the unsigned receiver-normal factor $\lvert D_T / D_s\rvert$ inside branch-weight tolerance. | `validation_replay_mismatch`; `small_jacobian` when the source-normal denominator is below floor |
| Unit direction | Delayed-hit unit direction is normalized and points from emission point to receiver point. | `validation_replay_mismatch` |
| Residual history | Where iteration history is exposed, residuals should contract according to the declared method or else record the fallback/rebracket decision. | `root_unresolved` or `precision_failed` |
| Precision replay | A stricter replay must match root count, branch identity, residual sign, and claim boundary. | `validation_replay_mismatch` |

Residual rows must record absolute residual, residual scale, normalized
residual, selected tolerance, numeric chart, precision path, iteration count,
bracket or isolation metadata, Jacobian value, Jacobian sign stratum, and
first-failure code.

## Stream Replay Invariants

Path-history streams are validation artifacts, not only app playback data. A
stream replay fixture must prove that path records, indices, manifests, and
checksums preserve enough authority for later root solving, replay, export, and
audit.

| Invariant | Acceptance rule |
| --- | --- |
| Row round trip | Writing and reading a `path_segment.v1` stream preserves path key, frame index, time bounds, endpoint state, velocity or segment coefficients, interpolation rule, error bound, state flags, and declared numeric type. |
| Range selection | Reading by path key, time range, frame range, chunk range, or byte range returns the same rows as a full read followed by the same filter. |
| Ordering | Stream rows remain ordered by declared stream order; index rows cannot reorder path history. |
| Checksum identity | Chunk, sidecar, and manifest checksums match; corruption produces `stream_read_failed` or quarantine behavior, never a silent authoritative read. |
| Dynamic replay | `validatePathHistoryDynamicReplayF64` regenerates the declared linear or constant-acceleration stream and matches selected rows inside tolerance. |
| Root replay compatibility | Root and delayed-hit rows derived from a readback stream match the original root count and residual class when the stream claims dynamic replay authority. |
| Projection authority | Display or app-projection buffers cannot be promoted to authoritative stream rows unless their manifest carries the required error bounds and numeric metadata. |
| Lifecycle safety | Age-out, warm spill, cold archive, or native-file reopen cannot change replay rows, checksums, or range-read behavior. |

The existing stream contract fixture `stream_replay_invariants` should consume
this section as its validation definition.

## Bounded Drift Checks

Bounded drift checks are valid only when the model contract declares the
quantity being checked as an invariant or supplies an analytic bound. The
zombie-solver should not invent conservation laws for a model that has not
declared them.

| Fixture id | Valid when | Bound |
| --- | --- | --- |
| `linear_motion_no_force_drift` | The run is a linear no-force kinematic path. | Position and velocity rows match the affine path within stream encoding and readback tolerances. |
| `constant_acceleration_drift` | The run declares constant acceleration with analytic integration. | Frame position and velocity drift remain inside the known integration and interpolation bound. |
| `closed_cycle_phase_drift` | The model declares periodic phase and cycle metadata. | Phase modulo cycle length, cycle index, and phase spread remain within declared tolerance. |
| `symmetry_zero_sum_drift` | The model declares a symmetric pair or assembly configuration whose net contribution should cancel. | Signed contribution sum is bounded by the summation and branch-weight error budget. |
| `energy_or_action_drift` | A later force law declares an energy, action, or symplectic invariant with a discrete bound. | Drift remains under the model-supplied bound and reports the integration method that gives the bound. |
| `stream_replay_drift` | A stream carries dynamic replay metadata. | Regenerated path rows differ from stored rows only within the stream's declared error bound. |

When a fixture family does not have a declared invariant, the correct outcome is
`not_applicable` in the fixture metadata, not pass and not fail. A bounded drift
failure for a declared invariant is `validation_replay_mismatch` unless the
cause is a precision or envelope limit, in which case the more specific status
must be used.

## Failure Classifications

Failure classifications must be precise enough for app migration, batch
validation, and proof-side handoff. `internal_solver_error` is reserved for
violated solver invariants or impossible states. Ordinary numerical, envelope,
stream, or app-contract failures must use their specific code.

| Class | Canonical status | Meaning |
| --- | --- | --- |
| Contract invalid | `app_contract_error` | The request, fixture, schema, row layout, stream manifest, or model contract is missing required fields or uses unsupported values. |
| Envelope unsupported | `simulation_envelope_exceeded` | The declared run cannot meet entity, interaction, duration, output, memory, storage, latency, backend, or claim-level pressure. |
| Precision insufficient | `precision_failed` | No allowed precision path, numeric chart, or tolerance can satisfy the requested claim level. |
| Scale representation unsafe | `insufficient_scale_resolution` | The selected representation cannot distinguish the required local geometry, residual, or branch data at the declared scale. |
| Time resolution unsafe | `time_resolution_insufficient` | Step, event, or interpolation resolution is too coarse for the requested root, motion, or replay claim. |
| History too shallow | `insufficient_history_depth` | The retained source history cannot cover the required causal-delay search window. |
| No bracket | `root_not_bracketed` | A requested root search found no certified bracket inside the declared support. |
| Root unresolved | `root_unresolved` | Bracket or candidate exists, but the root could not be certified under the requested tolerance. |
| Small Jacobian | `small_jacobian` | The source-normal denominator is below the root-transversality authority floor; ordinary receiver-normal branch strength is not trusted. |
| Transversality floor failed | `transversality_floor_failed` | The branch crossing is tangent or too close to tangent for ordinary root classification. |
| Ledger mismatch | `ledger_rerun_required` | Root label sets, failure rows, or transition rows are incompatible for ordinary comparison. |
| Stream memory pressure | `stream_memory_pressure` | Hot active-window or stream buffer pressure prevents the requested streaming behavior. |
| Stream write failure | `stream_write_failed` | A chunk, sidecar, manifest, checksum, or durable write could not be completed. |
| Stream read failure | `stream_read_failed` | A stream, chunk, sidecar, manifest, checksum, or range read could not be validated or materialized. |
| Unsupported browser storage | `unsupported_browser_storage` | The requested browser storage path is unavailable; use a declared fallback or reject. |
| Unsupported WebAssembly threads | `unsupported_wasm_threads` | The requested thread backend is unavailable; deterministic single-thread fallback may be used if the claim allows it. |
| Validation mismatch | `validation_replay_mismatch` | Analytic, invariant, high-precision replay, root count, residual, stream, or bounded-drift comparison failed. |
| Internal invariant failure | `internal_solver_error` | Solver code produced a structurally impossible or non-finite internal state not attributable to request limits. |

Baseline classifications remain downstream comparison labels:
`baseline_within_tolerance`, `baseline_refined_result`,
`baseline_model_boundary_difference`, and
`baseline_investigation_required_mismatch`. They do not replace analytic or
invariant validation statuses.

## Fixture Matrix

| Fixture family | Minimum fixtures | Current support | Completion condition |
| --- | --- | --- | --- |
| `manufactured_causal_root` | Static/static, linear collinear, oblique quadratic, circular constant-distance, support-boundary, tangent/small-Jacobian, normalized-equivalence, batch-equivalence. | Native analytic smoke covers moving-source and circular-source roots. | All fixture ids above run through native and app-bridge paths where exposed. |
| `closed_form_geometry` | Displacement/distance/direction, path bounds, constant acceleration, sphere membership, bounds overlap, circular self-hit span, delayed-potential flight time, phase-at-hit cycle. | Shared geometry, motion, phase, and Ideal Braid bridge rows already exist. | Geometry row outputs match closed forms or high-precision references and preserve authority labels. |
| `root_count_invariant` | Ledger coverage, perturbation stability, transition classifier, batch merge, normalization equivalence, support-boundary policy. | Root-ledger detail and root-transition smoke coverage exist. | Root counts and transitions are deterministic across replay, partitioning, and supported perturbations. |
| `root_hit_invariant` | Finite fields, time order, delay/distance consistency, residual tolerance, receiver-normal branch weight or hit strength, unit direction. | Native invariant checks and app bridge `checkRootHitInvariantsF64` exist. | Valid analytic rows pass and each deliberate corruption fails with the expected status. |
| `stream_replay_invariant` | Round trip, range read, checksum fault, dynamic replay, stream-backed root replay, lifecycle-safe readback. | Native stream smoke and app bridge dynamic replay validation exist. | Caller-buffer and native-file streams preserve replay authority or fail closed. |
| `bounded_drift` | Linear no-force, constant acceleration, phase cycle, symmetry zero-sum, future energy/action invariant, stream replay drift. | Linear and constant-acceleration motion paths exist. | Each model-declared invariant has a bound; undeclared invariants report `not_applicable`. |
| `failure_classification` | One fixture per canonical failure class listed above. | Status taxonomy exists across native and app bridge. | Every class has at least one fixture that produces the expected status and severity. |

## Implementation Notes

Current relevant implementation surfaces:

- `src/solver/native/solver_analytic_smoke.cpp`
- `src/solver/native/solver_invariant_smoke.cpp`
- `src/solver/native/solver_root_transition_smoke.cpp`
- `src/solver/native/solver_stream_smoke.cpp`
- `src/solver/include/architrino/solver/InvariantChecks.hpp`
- `src/solver/src/InvariantChecks.cpp`
- `src/solver/app/SolverAppBridge.mjs`
- `scripts/check-solver-contract-fixtures.mjs`

Small implementation additions are allowed only when they keep the validation
surface isolated: a native smoke fixture, a bridge fixture assertion, or a
single-purpose script under `scripts/` or `tests/`. Do not add app-specific
logic to satisfy an analytic fixture. The fixture should exercise the shared
solver surface that the app will later consume.

## Closure Decision

`analytic_and_invariant_validation` is complete as a standalone validation plan
and closed in [priorities.md](priorities.md). Implementation coverage remains open under
the fixture families above until native, WebAssembly, app-bridge, stream, and
batch checks cover the full matrix.

The validation plan is no longer a queue blocker. Future work should add focused
fixtures or smoke coverage under the fixture families above without reopening the
definition task.
