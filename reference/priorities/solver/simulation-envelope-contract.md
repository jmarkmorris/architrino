# Simulation Envelope Contract

## Status

- Kind: `priority-detail`
- Workstream: `solver`
- Task id: `simulation_envelope_contract`
- Status: `closed-as-standalone-contract`
- Depends on: `model_contract`, `precision_dynamic_range_contract`
- Promotion decision: `priority-only`

This note defines the run-admission envelope for the central solver. It is a
solver contract, not a reader-facing corpus claim. The main solver queue can
mark `simulation_envelope_contract` closed once queue editing is allowed; this
file carries the standalone contract substance.

The simulation envelope is the declaration of what a run asks the solver to
support before expensive work begins. It records the requested physical scale,
runtime scale, output scale, precision claim, storage pressure, backend, and
allowed simplification. The solver then admits, simplifies, batches, escalates,
or rejects the run with diagnostics instead of silently accepting a request it
cannot support accurately.

## Contract Definition

Every solver request that can produce motion, causal roots, delayed hits,
geometry buffers, path-history streams, app playback, export data, or
validation artifacts must carry a simulation envelope. The envelope is part of
the run manifest and remains attached to exported datasets, replay artifacts,
and app diagnostics.

The envelope must be evaluated together with:

- the model contract: model id, equation or force-law version, constants hash,
  causal speed policy, branch policy, unit convention, and compatible precision
  paths;
- the error budget: global tolerance and stage tolerances for root isolation,
  delayed-hit reconstruction, integration, stream encoding, readback,
  projection, and display;
- the precision path: selected numeric chart, numeric type, scale
  normalization, value authority, and escalation rule.

The solver may widen the admitted envelope only after benchmarks, validation
fixtures, and bridge schema coverage show that the wider case is supported.

## Required Dimensions

| Dimension | Required envelope record | Admission use |
| --- | --- | --- |
| Entity count | Active architrino count, inactive/reference count when relevant, active subset policy, and literal-versus-reduced flag. | Estimates state size, pair count, path samples, root candidates, memory, and work-packet count. |
| Assembly complexity | Assembly count, member counts, hierarchy depth, internal degrees of freedom, phase/cycle state, membership-change expectation, and requested assembly diagnostics. | Separates raw path count from internal assembly bookkeeping and temporal assembly graph pressure. |
| Physical scale | Spatial bounds, unit convention, boundary policy, representative separation scales, and local-frame or scale-normalization plan. | Selects spatial indexing, numeric charts, local frames, and broad-phase geometry strategy. |
| Density | Average density, local peak density, density bands when known, and whether the active subset is density-representative. | Estimates interaction candidates, collision/near-collision pressure, and index selectivity. |
| Duration | Time window, cycle count when meaningful, history depth, active-window length, and archival policy. | Estimates path-history size, causal search depth, stream volume, and replay cost. |
| Time resolution | Step policy, event-step policy, interpolation policy, time-resolution hint, output stride, and maximum accepted interpolation error. | Estimates timestep count, root brackets, event rows, integration error, and stream row count. |
| Speed regimes | Sub-field-speed, near-field-speed, super-field-speed, and field-speed crossing summaries; speed ratio ranges such as $v / c_f$; threshold-event policy. | Selects precision path, branch-transition handling, multirate integration, and unresolved-root policy. |
| Interaction density | Pair policy, same-source policy, all-to-all or neighbor-pruned mode, pruning rule, broad-phase index plan, and estimated pair count. | Determines whether the run is interactive, batchable, or too dense for the supported interaction graph. |
| Branch/root density | Expected branch complexity, root count estimates, roots per pair per time window, small-$\lvert J_{ij} \rvert$ risk, branch birth/death expectation, and unresolved-root policy. | Protects correctness for branch-resolved causal roots, delayed hits, and Jacobian-weighted contributions. |
| Geometry complexity | Requested geometry outputs, curved-path or swept-segment handling, shell intersections, local frames, projection buffers, and authoritative-versus-display projection flags. | Controls geometry CPU cost, output volume, and whether geometry buffers are authoritative or display-only. |
| Precision claim | Claim level, requested and compatible precision paths, numeric type, numeric chart, scale normalization, global error budget, and stage error budgets. | Allows upward-only precision escalation and rejects requests whose claim level cannot be satisfied. |
| Output detail | Output detail class, requested output kinds, sample stride, derived-column inventory, replay requirement, and compression/export policy. | Estimates stream and buffer volume, determines whether data must be path-streamed, and classifies output pressure. |
| Memory budget | Hot active-window budget, work-packet budget, buffer budget, stream writer budget, and failure behavior under memory pressure. | Prevents unbounded in-memory path histories and drives batching or rejection. |
| Storage budget | Storage target, non-volatile storage availability, chunk budget, index budget, deep-index policy, retention policy, and export requirement. | Decides whether a long run can stream safely or must use native/batch execution. |
| Latency target | Interactive, background, batch, or validation target; expected completion window; cancellation policy; progress-report cadence. | Separates app preview from offline evidence and prevents validation workloads from blocking interactive paths. |
| Backend | Single-thread, native-thread-pool, WebAssembly-thread-pool, browser-worker, native CLI, or future service/GPU capability; deterministic reduction requirement; fallback policy. | Chooses execution mode and records unsupported backend diagnostics before a run starts. |
| Simplification policy | `none` or `explicit-reduced-model`; active subset, omitted interactions, coarse summaries, claim limits, and validation obligations when reduced. | Allows reduced models only when the caller requested them and records what the solver did not claim. |

## Minimum Logical Record

The standalone contract requires this logical payload. Bridge and native
encodings may split it across JSON metadata, typed buffers, and ABI rows, but
the run manifest must preserve the same information.

```text
simulationEnvelope:
  schema: solver-simulation-envelope-contract.v1
  entityCount: integer
  assemblyComplexity:
    assemblyCount: integer
    memberCountSummary: record
    hierarchyDepth: integer
    internalDegreeCount: integer
    membershipChangePolicy: string
  physicalScale:
    spatialBounds: record
    unitConvention: string
    boundaryPolicy: string
    scaleNormalization: string
  density:
    averageDensity: number
    peakDensity: number
    activeSubsetPolicy: string
  duration:
    timeWindow: record
    historyDepth: number
    activeWindowPolicy: string
    archivalPolicy: string
  timeResolution:
    stepPolicy: string
    eventStepPolicy: string
    interpolationPolicy: string
    timeResolutionHint: number
    outputStride: number
  speedRegimes:
    speedRatioSummary: record
    fieldSpeedCrossings: record
    thresholdEventPolicy: string
  interactionDensity:
    interactionPolicy: string
    sameSourcePolicy: string
    estimatedPairCount: integer
    broadPhaseIndexPlan: string
  branchRootDensity:
    expectedBranchComplexity: string
    estimatedRootCount: integer
    smallJacobianRisk: string
    unresolvedRootPolicy: string
  geometryComplexity:
    requestedGeometryOutputs: list
    shellIntersectionPolicy: string
    projectionAuthority: string
  precisionClaim:
    claimLevel: string
    requestedPrecisionPath: string
    selectedPrecisionPath: string
    numericChart: string
    numericType: string
    errorBudget: record
  outputDetail:
    outputDetail: string
    requestedOutputs: list
    replayRequirement: string
    compressionExportPolicy: string
  budgets:
    memoryBudgetBytes: integer
    storageBudgetBytes: integer
  latencyTarget: string
  backend:
    executionBackend: string
    threadingMode: string
    deterministicReduction: boolean
    fallbackPolicy: string
  simplificationPolicy:
    mode: string
    activeSubset: record
    omittedInteractions: list
    validationObligations: list
```

## Bridge V1 Alignment

The current bridge already carries the admission spine, but the standalone
contract is intentionally fuller than the first ABI row.

| Contract area | Bridge v1 alignment | Remaining implementation pressure |
| --- | --- | --- |
| Core admission fields | `solverSimulationEnvelope` requires `entityCount`, `timeWindow`, `interactionPolicy`, `expectedBranchComplexity`, `outputDetail`, `memoryBudgetBytes`, `storageBudgetBytes`, `latencyTarget`, and `simplificationPolicy`; `assemblyCount` and `timeResolutionHint` are available. | The richer assembly-complexity record is still a logical contract item rather than a fully enforced native admission input. |
| Physical scale and density | The app-facing draft already names `spatialBounds` and `densityEstimate`, and the schema allows additional envelope properties. | Native admission must consume physical scale and density directly before they can affect stress scoring. |
| Speed regimes | Precision policy already treats speed ratios and field-speed crossings as precision-path selectors. | Admission should record speed-regime summaries explicitly instead of inferring them only through precision diagnostics. |
| Interaction density | `interactionPolicy` and stress summaries cover sparse, neighbor-pruned, all-to-all, and same-source-enabled cases. | The contract still needs richer pair-policy and broad-phase index metadata for dense app and batch workloads. |
| Branch/root density | `expectedBranchComplexity` covers low, moderate, high, and unknown cases. | Root count estimates, roots-per-pair density, small-Jacobian risk, and unresolved-root policy should become explicit schema fields. |
| Geometry complexity | Output kinds and geometry buffers exist in the bridge contract. | Geometry output lists need explicit authority labels so display projections do not masquerade as solver authority. |
| Precision claim | Claim level, selected precision path, precision metadata, numeric chart, and error budget already exist across the bridge and precision contract. | Admission must reject or escalate when requested precision and envelope pressure conflict. |
| Memory, storage, and latency | Admission stress summaries include memory, storage, time-step, output, and precision pressures. | Storage target and backend capability should be declared before long stream-backed runs. |
| Backend | Threading plans already report `single-thread`, `native-threads`, or `wasm-threads`. | Backend should be an envelope input as well as a threading-plan output. |
| Admission decisions | Admission responses already use `admit`, `batch`, `escalate_precision`, `reject`, and `simplify`. | Tests should keep every decision covered by representative envelope fixtures. |

## Admission Stress Summary

Admission must emit `solver-admission-stress-summary.v1` or a compatible
successor. The summary must include these stress dimensions:

| Stress dimension | Meaning |
| --- | --- |
| `entity_count` | Entity count or active subset size dominates the supported envelope. |
| `interaction_graph` | Pair policy, same-source policy, or dense graph pressure dominates runtime. |
| `memory` | Hot active-window or buffer pressure exceeds the available memory budget. |
| `storage` | Stream, chunk, index, or export pressure exceeds the storage budget or available backend capability. |
| `time_steps` | Duration and time resolution produce too many integration, root, or event steps for the selected target. |
| `output_detail` | Requested buffers, streams, diagnostics, or validation artifacts dominate cost. |
| `precision` | Error budget, dynamic range, small Jacobian, cancellation, or chart suitability requires stricter precision. |

`dominantStress` is diagnostic, not the whole decision. A run can be rejected
because several pressures combine even when each single pressure looks
moderate.

## Admission Decisions

| Decision | `admitted` | Required condition | Required diagnostic record |
| --- | --- | --- | --- |
| `admit` | `true` | The literal requested envelope fits the selected backend, precision path, budgets, and latency target. | Stress summary, selected precision path, backend, run manifest, and `ok` status. |
| `simplify` | `true` | The requested run is otherwise supported only because `simplificationPolicy` is `explicit-reduced-model`. | Reduced active subset, omitted interactions, claim limits, validation obligations, and selected precision path. |
| `batch` | `true` | The model and precision claim are supported, but the latency target or output volume requires background, batch, or offline execution. | Execution mode, expected latency class, storage plan, progress/cancellation plan, and stream policy. |
| `escalate_precision` | `true` | The run can satisfy its claim level only by moving to a stricter precision path or numeric chart. | Prior requested path, selected stricter path, triggering stress dimension, affected stage, and claim-level status. |
| `reject` | `false` | No supported backend, precision path, budget, or simplification path can satisfy the requested claim. | `simulation_envelope_exceeded` or more specific halt status, dominant stress, first failing pressure, and nonrecoverable/recoverable flag. |

The solver must reject rather than weaken a claim level silently. A caller can
submit a separate lower-claim or reduced-model request, but the solver cannot
convert a literal validation request into a display-only preview behind the
same envelope.

## Simplification Policy

`simplificationPolicy: "none"` means the run is literal at the declared model
and claim level. If the literal envelope does not fit, the solver can batch,
escalate precision, or reject, but it cannot drop entities, omit interactions,
coarsen assemblies, lower output detail, or downgrade claim level.

`simplificationPolicy: "explicit-reduced-model"` allows the solver to admit a
reduced run only when the reduced model is recorded. The run manifest must name:

- the active subset and how it was chosen;
- omitted entities, assemblies, interactions, branches, roots, or geometry
  outputs;
- any coarse-grained assembly or density summary;
- the claim limit created by the reduction;
- validation obligations needed before the reduced result can stand in for a
  literal run.

A simplified run may be useful for preview, playback, or a scoped diagnostic.
It is not validation evidence for the omitted literal system unless a separate
validation replay or equivalence argument is attached.

## Backend Policy

The envelope must name the intended backend before admission. Current backend
classes are:

- `single-thread`;
- `native-threads`;
- `wasm-threads`;
- browser-worker execution with or without durable file-backed storage;
- native CLI or native batch execution.

Future service or GPU backends may be added only behind the same envelope and
manifest contract. They must report precision limits, deterministic fallback,
parity obligations, and unsupported-backend diagnostics. The app-facing schema
must not depend on one vendor or one execution device.

## Validation Fixture

The focused fixture family for this contract is
`simulation_envelope_admission`. It must vary at least:

- entity count and assembly complexity;
- physical scale and density;
- duration and time resolution;
- speed regimes and field-speed crossings;
- interaction density;
- branch/root density and small-Jacobian pressure;
- geometry complexity;
- precision claim;
- output detail;
- memory and storage budgets;
- latency target;
- backend capability;
- simplification policy.

Passing behavior:

1. Runs inside the supported envelope return `admit`.
2. Literal runs that fit only outside the interactive target return `batch`.
3. Runs that need stricter precision return `escalate_precision`.
4. Runs that fit only as a declared reduced model return `simplify`.
5. Unsupported runs return `reject` with `simulation_envelope_exceeded` or a
   more specific halt status.

## Closure Decision

`simulation_envelope_contract` can be closed as a standalone priority artifact
because this file defines every requested contract dimension, binds the
dimension list to bridge-admission behavior, defines the admission decisions,
and separates simplification from silent claim weakening.

Implementation breadth belongs in future scoped work that consumes this
contract, path-history streaming, work-packet transport, app bridge behavior,
and `simulation_envelope_admission` fixture coverage. Those tasks decide how
much of the full logical envelope is enforced by native ABI rows, bridge JSON,
runtime stress scoring, and future validation fixtures.
