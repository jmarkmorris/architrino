# Precision Dynamic Range Contract

Status: `closed-design-capture`

Kind: `solver-contract`

Source task: `precision_dynamic_range_contract` in [priorities.md](priorities.md)

Primary source: [precision.md](precision.md)

Implementation surfaces:

- `src/solver/app/SolverAppBridge.mjs`
- `src/solver/app/SolverAppBridgeContract.d.ts`
- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json)
- `src/solver/include/architrino/solver/RootLedger.hpp`

## Purpose

This contract converts the precision policy in [precision.md](precision.md) into the first implementation contract for dynamic-range-safe solver runs. It binds together automatic precision-path selection, scale-aware numeric charts, upward-only escalation, validation replay, stage-level error budgets, error propagation metadata, and root-ledger precision forensics.

The contract is a solver priority artifact. It does not replace the physical $\mathbb{A}\mathbb{A}\mathbb{A}$ model, change the model variables, or promote new reader-facing textbook prose.

## Contract Boundary

This contract owns:

- how a run resolves `auto` into a concrete selected precision path;
- how run and stream manifests expose numeric type, numeric chart, scale normalization, error budgets, and value authority;
- how escalation records prove that the solver moved only toward stricter precision;
- how validation replay compares a result under stricter tolerances or a stricter path;
- how stage-level error budgets propagate through root isolation, delayed-hit reconstruction, motion integration, stream encoding, stream readback, projection, and app buffers;
- how `root_ledger_detail.v1` rows expose residual scale, absolute residual, normalized residual, root tolerance, iteration count, bracket or isolation metadata, Jacobian value/sign stratum, and first-failure code.

This contract does not own:

- model identity, constants, branch policy, or unit convention, which belong to [model-contract.md](model-contract.md);
- byte-level numeric encoding, which belongs to [numeric-serialization-contract.md](numeric-serialization-contract.md);
- stream storage layout, which belongs to [path-history-stream-contract.md](path-history-stream-contract.md);
- run admission, memory, storage, and latency bounds, which belong to `simulation_envelope_contract`;
- final runtime performance acceptance, which belongs to `solver_contract`, stage-level performance records, and app migration parity tasks.

## Run Precision Metadata

Every completed run that can be replayed, exported, benchmarked, or used by an app must carry `solver-run-precision-metadata.v1`.

| Field | Requirement |
| --- | --- |
| `requestedPrecisionPath` | The caller request, including `auto` when the caller asks the solver to select. |
| `selectedPrecisionPath` | The concrete path actually used after admission, claim-level floor, model compatibility, and diagnostics. This must not remain `auto` for authoritative results. |
| `numericType` | One of the declared numeric types: `f64`, `scaled_i64`, `interval_f64_pair`, `decimal128`, or `mp_limb_block`. |
| `numericChart` | One of the declared numeric charts: `absolute_f64`, `local_frame`, `nondimensional_ratio`, `log_magnitude`, `signed_log_magnitude`, `direction_log_magnitude`, or `interval_bounds`. |
| `unitConvention` | The model unit convention used by the run. |
| `scaleNormalization` | The declared scale normalization or `none`; consumers must not infer scale from app labels. |
| `globalErrorBudget` | The run-level tolerance that downstream stages must respect. |
| `stageErrorBudgets` | Root, delayed-hit, integration, stream, readback, projection, and display tolerances. |
| `claimLevel` | The requested claim level: `interactive-preview`, `migration-parity`, `exported-dataset`, or `validation-evidence`. |
| `valueAuthority` | Whether the result is authoritative, approximate, display-only, or rejected. |

Stream descriptors and run-manifest stream entries must carry `solver-path-history-stream-metadata.v1` with compatible precision path, numeric type, numeric chart, value authority, app-buffer authority, claim level, units, coordinate frame, scale normalization, provenance, and diagnostics.

## Automatic Precision-Path Selection

The app-facing default is `auto`, but `auto` is only a selector. It must resolve to one of the concrete precision paths:

- `scaled_f64_fast`
- `scaled_f64_strict`
- `adaptive_multirate`
- `event_root_focused`
- `extended_precision`
- `validation_replay`

Selection inputs are:

| Input | Purpose |
| --- | --- |
| Requested precision path | Captures caller intent and explicit stricter override. |
| Admission or diagnostic precision path | Captures the precision demanded by the simulation envelope and conditioning diagnostics. |
| Claim-level floor | Enforces the minimum path for the requested claim. `interactive-preview` admits `scaled_f64_fast`; `migration-parity` and `exported-dataset` require at least `scaled_f64_strict`; `validation-evidence` requires `validation_replay`. |
| Model-compatible paths | Prevents a model contract from silently using an unsupported precision path. |
| Conditioning diagnostics | Includes speed regime, scale separation, minimum separation, root density, cancellation risk, path curvature, small $\lvert J_{ij} \rvert$, bracket quality, and chart suitability. |

The selector rule is:

```text
selected path = strictest compatible path required by
  caller request,
  admission diagnostics,
  claim-level floor,
  and live conditioning diagnostics
```

If the selected path is outside `model.compatiblePrecisionPaths`, the run fails closed with `precision_failed`. If no available path can satisfy the declared claim level and error budget, the solver must halt or reject rather than publish an ambiguous authoritative result.

## Scale-Aware Numeric Charts

The $\mathbb{A}\mathbb{A}\mathbb{A}$ model remains expressed in physical variables. Numeric charts are implementation coordinates used to preserve the same model through difficult scale regimes. They are not replacement laws and are not a rule that model variables become log variables.

| Numeric chart | Use | Required authority notes |
| --- | --- | --- |
| `absolute_f64` | Direct finite `f64` values when scale and conditioning are clean. | Must not claim local detail that the coordinate magnitude cannot distinguish. |
| `local_frame` | Positions, path segments, and near-collision geometry near an active origin. | Must record origin, basis, unit, transform error, and absolute-display authority. |
| `nondimensional_ratio` | Radii, distances, speed ratios, timestep ratios, and normalized residuals. | Must record reference scale, unit, valid range, and claim level. |
| `log_magnitude` | Positive scale quantities where multiplication, division, ratios, or magnitude comparison dominate. | Must record unit, zero policy, lower cutoff, and conversion error. |
| `signed_log_magnitude` | Signed scalar contributions, potentials, residual families, and cancellation diagnostics. | Must record sign, zero flag, log magnitude, and unsafe-operation diagnostics. |
| `direction_log_magnitude` | Vectors where direction and magnitude have different numeric stress. | Must record unit direction, log magnitude, zero-vector policy, and direction error. |
| `interval_bounds` | Root brackets, uncertain path segments, validation replay, and directed-rounding checks. | Must record endpoint convention, rounding mode, containment guarantee, and authority label. |

The chart system must expose unsafe operations instead of hiding them. Zero crossings, sign changes, vector cancellation, small Jacobians, failed bracket isolation, and branch transitions require a safer chart, a stricter precision path, or a halt diagnostic.

## Upward-Only Escalation

Precision escalation is strict and upward-only.

Allowed escalations include:

- smaller timesteps;
- stricter root tolerances;
- more root iterations;
- local-frame recentering;
- log-magnitude, signed-log, direction-log, or interval chart selection;
- compensated or pairwise summation;
- event-root-focused handling;
- interval-backed or extended-precision kernels;
- validation replay.

Disallowed behavior:

- silently selecting a weaker path than the claim-level floor;
- treating `auto` as a concrete selected path for authoritative output;
- downgrading claim level to keep a run alive;
- emitting an app-facing `f64` projection as though it were the authoritative stricter result;
- continuing after a precision failure without a halt, rejected authority, or explicit display-only label.

Every escalation record must include:

| Field | Meaning |
| --- | --- |
| `priorPrecisionPath` | The prior concrete path, or the diagnostic path resolved from `auto`. |
| `newPrecisionPath` | The stricter selected path. |
| `triggeringDiagnostic` | The reason for escalation, such as precision diagnostics or claim-level minimum. |
| `affectedStage` | The stage affected by the escalation. |
| `claimLevelSatisfied` | Whether the escalation preserved the requested claim level. |

## Stage-Level Error Budgets

The error budget is a run contract, not a comment. Each stage must declare a tolerance, estimated absolute error when available, tolerance ratio, value authority, and status.

| Stage | Budget field | Required propagation behavior |
| --- | --- | --- |
| `root_isolation` | `rootIsolationTolerance` | Bounds causal-root bracket isolation and retained-root residual authority. |
| `delayed_hit` | `delayedHitTolerance` | Bounds delayed-hit reconstruction from retained roots and branch geometry. |
| `motion_integration` | `integrationTolerance` | Bounds path advancement and interpolation error. |
| `stream_encoding` | `streamEncodingTolerance` | Bounds loss from storing authoritative path and event data. |
| `stream_readback` | `readbackTolerance` | Bounds replay or readback reconstruction from stream/index data. |
| `projection` | `projectionTolerance` | Bounds projection from authoritative solver data to app-facing geometry. |
| `app_buffer` | `displayTolerance` | Bounds display-only or app-buffer projections; it must not overwrite upstream authority. |

The bridge exposes this as `solver-error-budget-propagation.v1` with stages and authority levels. A rejected stage is a fail-closed condition for authoritative results. A display-only stage can remain useful for UI, but it cannot satisfy validation or migration parity by itself.

## Root-Ledger Precision Forensics

Detailed root rows use `root_ledger_detail.v1`. They are the required app-facing precision forensics for causal roots, delayed hits, validation replay, and proof or migration diagnostics.

| Field | Requirement |
| --- | --- |
| `residualScale` | Positive scale used to interpret the root residual. The bridge derives it from delay, hit-emission time span, isolation interval width, and a floor of `1`. |
| `absoluteResidual` | `abs(residual)` in the row's current chart and units. |
| `normalizedResidual` | `absoluteResidual / residualScale`; this is the scale-aware residual that comparisons should prefer. |
| `rootTolerance` | Selected root tolerance after precision-path controls and escalation. |
| `iterationCount` | Number of root iterations or the iteration count associated with the row. |
| `intervalStart` and `intervalEnd` | Search or support interval for retained roots, inactive gaps, tail boundaries, transition rows, or failures. |
| `bracketStart` and `bracketEnd` | Root bracket or isolation interval bounds for the row. |
| `jacobian` | The source-normal branch Jacobian value used for root-transversality and small-Jacobian diagnostics. |
| `jacobianSignStratum` | Sign stratum for branch diagnostics: negative, near-zero, or positive. |
| `statusCode` | Canonical solver status code for the row. |
| `stateFlags` | Row state bits, including whether the row represents a first failure. |
| `firstFailureCode` | The first canonical failure code when no retained root exists or the row records the first fail-closed condition. |

The row also carries stable ledger/source/receiver/root keys, emission time, hit time, delay, branch weight, source point, receiver point, entry kind, root kind, and sequence index. These fields let consumers distinguish active roots from inactive search gaps, finite-history tail boundaries, transition rows, and fail-closed diagnostic rows.

## Validation Replay

Validation replay is the strict replay path, not a replacement for the original run.

The replay request must:

- use a concrete `replayPrecisionPath`; `auto` is invalid for replay;
- name the app id and compare layouts;
- provide a baseline response and a candidate response;
- declare tolerance and refinement tolerance when the default is not sufficient;
- emit normalized status records, including `validation_replay_mismatch` when replay fails.

The replay result may classify a candidate as matching, refined, boundary-different, or mismatched according to the relevant validation or baseline-comparison policy. It must not silently overwrite the original result. The original result remains a result produced under its own manifest; the replay artifact states whether a stricter path supports it.

## Many-Orders-Of-Magnitude Rule

The dynamic-range contract spans many orders of magnitude by separating model authority from numerical representation:

1. Physical variables remain the model variables.
2. The solver chooses local coordinate frames, nondimensional ratios, log-magnitude charts, signed-log charts, direction-log charts, interval bounds, or stricter numeric types only as implementation coordinates.
3. Every chart records enough metadata to convert, compare, replay, or reject the represented value.
4. Operations that are unsafe in a chart trigger a safer chart, a stricter precision path, or a halt.
5. App-facing display buffers may be approximate projections from stricter authoritative data, but they must carry app-buffer authority.

This is why the solver can carry huge absolute coordinates, tiny local separations, slow assembly drift, fast orbital motion, small residuals, branch-weight amplification, and path-history replay in one contract without changing the underlying model into logarithmic model variables.

## Implemented Support

| Requirement | Current support |
| --- | --- |
| Precision-path vocabulary | Implemented in the bridge with `auto`, `scaled_f64_fast`, `scaled_f64_strict`, `adaptive_multirate`, `event_root_focused`, `extended_precision`, and `validation_replay`. |
| Claim-level floor | Implemented in the bridge: `interactive-preview` maps to at least `scaled_f64_fast`; `migration-parity` and `exported-dataset` map to at least `scaled_f64_strict`; `validation-evidence` maps to `validation_replay`. |
| Upward-only selected path | Implemented by selecting the stricter path among caller request, admission/diagnostic path, and claim-level floor. |
| Numeric chart vocabulary | Implemented in the bridge descriptors, including `direction_log_magnitude`. |
| Run precision metadata | Implemented as `solver-run-precision-metadata.v1` in run manifests. |
| Stream precision metadata | Implemented as `solver-path-history-stream-metadata.v1` in stream descriptors and manifest stream entries. |
| Stage error budgets | Implemented through the default stage list and run metadata fields for root isolation, delayed hit, integration, stream encoding, readback, projection, and display. |
| Error-budget propagation | Implemented through bridge validation and native propagation rows carrying stage, estimated absolute error, tolerance, tolerance ratio, authority, and status. |
| Escalation records | Implemented with prior path, new path, triggering diagnostic, affected stage, and claim-level status. |
| Root-ledger forensics | Implemented for `root_ledger_detail.v1`, including derived residual scale, absolute residual, normalized residual, root tolerance, bracket fields, Jacobian value, Jacobian sign stratum, iteration count, and first-failure code. |
| Validation replay validation | Implemented in the bridge by requiring a concrete replay precision path, compare layouts, baseline response, and candidate response. |

## Missing Or Intentionally Split

| Item | Status | Closeout decision |
| --- | --- | --- |
| Full arbitrary-precision runtime kernels for every solver family | Split into runtime-validation capture and solver-core tasks. | This contract defines when stricter numeric types and paths are required; runtime breadth remains owned by `solver_contract`, `minimal_causal_root_core`, and later stage-level performance acceptance. |
| Queue status in `priorities.md` | Closed in [priorities.md](priorities.md). | This contract is no longer an active queue item. |
| Corpus promotion | Not promoted. | This is operational solver contract material under `reference/priorities`, not reader-facing AAA prose. |

## Completion Judgment

`precision_dynamic_range_contract` is closed as a contract-definition task.

The contract is complete because the automatic precision selector, numeric chart vocabulary, strict upward-only escalation rule, validation replay requirement, stage-level budgets, error-propagation metadata, run/stream precision metadata, and detailed root-ledger forensics are now stated in one isolated artifact and mapped to live implementation surfaces.

Remaining work is future scoped implementation and validation breadth, not this contract definition: extend and benchmark the solver core under dependent runtime tasks, then use validation replay and migration parity to decide app migration readiness.
