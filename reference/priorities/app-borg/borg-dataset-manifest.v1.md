# Borg Dataset Manifest v1

## Workstream Metadata

- Kind: `priority`
- Status: `design-complete`
- Claim level: `priority-design`
- Schema id: `borg-dataset-manifest.v1`
- Primary requirements: [requirements-and-design](requirements-and-design.md)
- Boundary shell source packet: [boundary-shell-replay](boundary-shell-replay.md)
- Execution ledger: [work queue](work-queue.md)

## Purpose

`borg-dataset-manifest.v1` is the app-facing cover sheet for one Borg run or replay dataset. It records the EOM solver contract, simulation envelope, displayed central ball, boundary policy, path-history streams, wake-history rows, boundary-shell replay rows, error budget, diagnostic authority, deployment budget, and 4K UHD render output metadata needed by the first app screen.

The manifest is priority-design material. It does not authorize a new solver, does not make boundary replay same-record evidence, and does not include save, export, import, or load workflow design.

## EOM Solver Contract

Every manifest must identify the EOM solver contract used to produce the dataset. If a value is not EOM-solver-backed, the manifest must say whether it is a bridge/schema gap, a missing EOM solver capability, an app-facing projection, or display-only visualization.

| Field | Required content |
| --- | --- |
| `schema` | Literal `borg-dataset-manifest.v1`. |
| `manifestId` | Stable manifest id. |
| `runId` | Stable run or replay dataset id. |
| `modelContractId` | EOM solver model contract id. |
| `nativeSolverStatus` | `native-backed-now`, `manifest-gap`, `bridge-schema-gap`, `native-capability-gap`, `display-only`, or `fail-closed`. |
| `nativeSolverVersion` | EOM solver build, ABI, or commit identifier when available. |
| `bridgeSchemaVersion` | Bridge schema version consumed by the app. |
| `claimLevel` | `priority-design`, `developer-test`, `candidate-run`, or a stricter claim status with a Not advanced disposition. |
| `firstFailureCode` | Null when no condition required for advancement applies; otherwise one first-failure code from this packet. |

Required native-solver rule: the manifest may report gaps, projections, or display-only values, but it must not define an app-local production solver or promote JavaScript-only reference behavior to production behavior.

### Current EOM Capability Gaps

| Capability | Current disposition | Canonical execution owner |
| --- | --- | --- |
| Retained wake/interaction rows, row-conservation counts, boundary-shell crossing and influence rows, boundary-to-central residuals, and required acceleration-contribution rows | Not emitted as accepted Borg EOM products; affected consumers remain fail-closed or display-only. | [BORG-001](work-queue.md#borg-001--native-wake-history-and-boundary-residuals) |
| Velocity-scale-aware sampling across the declared boundary-shell range | Protocol is designed, but measured calibration and holdout evidence do not exist. | [BORG-003](work-queue.md#borg-003--velocity-scale-sampling-evidence), dependent on BORG-001 |

The former bridge audit's other rows are not open capability owners: EOM stepping, current-state frames, path-history streaming, manifest and screen-spec objects, 3D camera controls, layer visibility, and render metadata have live implementation paths. Their presence does not establish wake-history, boundary-shell, residual, or solver acceptance.

## Simulation Envelope

The manifest must separate the outer spherical envelope from the displayed central ball.

| Field | Required content |
| --- | --- |
| `kind` | Literal `sphere`. |
| `center` | Finite Cartesian center of both concentric spheres. |
| `outerRadius` | Outer spherical-envelope radius $r_{\mathrm{outer}}$. |
| `centralBallRadius` | Displayed central-ball radius $r_{\mathrm{central}}$. |
| `radialBufferMargin` | $r_{\mathrm{outer}}-r_{\mathrm{central}}>0$. |
| `scaleFactor` | Model/display or campaign scale normalization. |
| `boundaryMode` | `local-window`, `statistical-boundary-shell`, or `display-only-preview`. |
| `timeStepPolicy` | Fixed, adaptive, or EOM solver selected stepping policy. |
| `duration` | Requested simulated time span. |
| `wakeFloor` | Declared floor below which eligible wake rows route to background/noise rows. |
| `aggregationBins` | Time, boundary-shell patch, source population, receiver population, and strength bins for background/noise rows. |

Strict central-ball buffer status requires:

$$
b_{\mathrm{shell}}(\mathcal C)
\ge
\max(c_fh,\ v_{\max}T_{\mathcal C}).
$$

If the strict buffer target is not satisfied, central-ball interpretation requires a passing `R_boundary->central` residual or must not advance.

## History And Central-Volume Timing

`historyDepth` is the retained time interval. `wakeHorizon` is the corresponding causal travel length and must be computed from `fieldSpeed` and `historyDepth`.

| Field | Required content |
| --- | --- |
| `historyDepth` | Active retained causal-history time window $h$. |
| `fieldSpeed` | Causal field speed $c_f$ used by path and wake rows. |
| `wakeHorizon` | Computed value $c_f h$. |
| `centralVelocityBound` | Declared or measured $v_{\max}$ for architrinos that can affect the central ball. |
| `centralObservationInterval` | Time interval $T_{\mathcal C}$ used by the strict central-ball buffer target. |
| `centralBoundaryTolerance` | Declared tolerance $\tau_{\mathcal C}$ for central-ball boundary influence. |
| `strictCentralBufferStatus` | `passed`, `failed`, `not-measured`, or `not-applicable`. |

## Population Counts

The operator-facing count is the displayed central count. The solver-facing count is derived from the central density and buffer volume.

| Field | Required content |
| --- | --- |
| `centralArchitrinoCount` | Target count $N_{\mathcal C}$ in the displayed central ball. Default design target: `256`; conservative fallback: `128`; stress preset: `512`. |
| `architrinoCount` | Derived total target count $N_{\mathrm{calc}}$ for the outer spherical envelope. |
| `bufferArchitrinoCount` | `architrinoCount - centralArchitrinoCount`. |
| `countDerivation` | Formula id, input values, rounded value, and exact pre-ceiling value. |
| `centralNumberDensity` | $\rho_{\mathcal C}=N_{\mathcal C}/L_{\mathcal C}^3$. |

Required count formula:

$$
N_{\mathrm{calc}}
=
\left\lceil
N_{\mathcal C}
\left(
1+\frac{2b_{\mathrm{shell}}(\mathcal C)}{L_{\mathcal C}}
\right)^3
\right\rceil.
$$

`centralArchitrinoCount` must not be treated as total solver `architrinoCount` when `radialBufferMargin` is nonzero.

## Initial Conditions

The manifest must preserve the exact initial-condition provenance accepted by the EOM solver.

| Field | Required content |
| --- | --- |
| `initialConditionFamily` | `random`, `seeded-random`, `lattice`, `clustered`, `explicit`, or `imported`. |
| `initialConditionSeed` | Seed used by generated initial conditions; null only for fully explicit source rows. |
| `electrinoCount` | Requested and resolved electrino inventory. |
| `positrinoCount` | Requested and resolved positrino inventory. |
| `polarityAssignmentSource` | `generated`, `seeded-balanced`, `explicit`, or `imported`, with source id or checksum. |
| `polaritySignConvention` | Declared solver convention for charge signs; current Borg fixture uses `positrino-positive-electrino-negative`. |
| `positrinoCharge` | Native charge scalar assigned to positrino rows. |
| `electrinoCharge` | Native charge scalar assigned to electrino rows. |
| `velocityPolicy` | `zero`, `scale-mix`, `seeded-random-small-3d`, `explicit`, or `drift-v`. |
| `velocitySeed` | Seed for generated velocity vectors when applicable. |
| `randomVelocityMaxComponentMagnitude` | Maximum absolute component magnitude for `seeded-random-small-3d` initial velocities. |
| `randomVelocityMinSpeed` | Minimum accepted speed for `seeded-random-small-3d` initial velocities. |
| `velocityBoundScaleFromV1` | Scale factor relative to the first seeded-random velocity-bound profile when applicable. |
| `resolvedInitialStateId` | Native-accepted initial-state row or stream id. |
| `customEditStatus` | `not-edited`, `pending-native-acceptance`, `accepted`, `rejected`, or `fail-closed`. |

Velocity rays are off by default in the first app screen. Ray display is an app-facing projection; raw velocity values require native-backed value authority and an error budget.

## Current State And Frame Sources

| Field | Required content |
| --- | --- |
| `currentStateFrameIds` | Frame ids for current positions, velocities, accelerations, boundary-shell patch status, time, and step index. |
| `checkpointIds` | Checkpoints available for replay or inspection. |
| `frameBufferIds` | Render or playback frame-buffer handles. |
| `trajectoryFrameIds` | Sampled trajectory frame ids when durable path streams are not yet available. |
| `projectionStatus` | `authoritative-solver-output`, `app-facing-projection`, `display-only-visualization`, `missing-error-budget`, `exceeded-error-budget`, or `fail-closed-value`. |

## Path-History Sources

Path history is solver-owned. The manifest must distinguish durable path streams from sampled trajectory frames and must record explicit gap rows when a required path-history field is missing.

| Field | Required content |
| --- | --- |
| `pathHistoryStreamIds` | Durable solver-owned path-history stream ids. |
| `activePathWindowId` | Hot in-memory path range used for ongoing causal-root and wake solving. |
| `pathSpillManifestIds` | Chunk ids, path ranges, time ranges, byte offsets, checksums, units, and schema versions. |
| `pathReplayIndexIds` | Lookup indices for path id, time range, frame range, and root/wake consumers. |
| `pathHistoryGapRows` | Gap rows for missing stream ids, missing segments, missing replay indices, insufficient path depth, or checksum failure. |

Minimum path-history gap row:

| Field | Required content |
| --- | --- |
| `gapRowId` | Stable row id. |
| `pathId` | Affected path id or null for run-level gaps. |
| `timeStart` / `timeEnd` | Affected interval. |
| `affectedConsumers` | Causal roots, wake rows, selected-object diagnostics, acceleration displays, or replay views blocked by the gap. |
| `firstFailureCode` | First compatibility code for a not advanced disposition. |
| `diagnosticStatus` | Diagnostic status vocabulary value. |
| `valueAuthority` | Value authority state. |

## Wake-History Rows And Conservation Counts

The manifest must account for every candidate wake row inside the declared envelope. Silent truncation is forbidden.

| Field | Required content |
| --- | --- |
| `resolvedWakeRowIds` | Retained above-floor wake rows with same-record source and receiver path history. |
| `backgroundNoiseRowIds` | Aggregated below-floor wake rows with omitted-row counts and error bounds. |
| `boundaryGeneratedWakeRowIds` | Wake rows generated from declared boundary-shell replay source ids. |
| `failureWakeRowIds` | Wake rows with a Verification incomplete outcome. |
| `wakeHistoryGapRows` | Explicit gap rows for missing native row output, missing causal roots, insufficient history depth, missing error budget, or missing boundary-shell patch summary. |
| `rowConservationCounts` | Candidate, resolved, aggregated, boundary-generated, and failure counts. |
| `rowConservationStatus` | `passed`, `failed`, `not-measured`, or `fail-closed`. |

Required conservation relation:

$$
N_{\mathrm{candidate}}
=
N_{\mathrm{resolved}}
+
N_{\mathrm{aggregated}}
+
N_{\mathrm{boundary}}
+
N_{\mathrm{failure}}.
$$

Minimum row-conservation count object:

| Field | Required content |
| --- | --- |
| `candidateWakeRowCount` | All candidate rows inside the declared envelope. |
| `resolvedWakeRowCount` | Rows retained explicitly. |
| `aggregatedWakeRowCount` | Rows represented in background/noise rows. |
| `boundaryGeneratedWakeRowCount` | Rows generated from boundary-shell replay. |
| `failureWakeRowCount` | Rows that were not advanced. |
| `conservationResidual` | Difference between candidate count and the classified sum. |
| `firstFailureCode` | `row_conservation_failed` or null. |

## Boundary-Shell Summary And Replay

Boundary-shell replay is reduced-model boundary input. Boundary-generated inbound architrinos are new identities with reconstructed wake history, not retained same-record identity.

| Field | Required content |
| --- | --- |
| `outboundArchitrinoShellEventStreamIds` | Streams or row sets for outbound architrino crossings by shell patch and time bin. |
| `outboundWakeShellEventStreamIds` | Streams or row sets for outbound wake crossings by shell patch and time bin. |
| `shellSummarySetIds` | Sets of `borg-boundary-shell-summary.v1` rows. |
| `shellSummaryIds` | Individual boundary-shell patch summary row ids consumed by this manifest. |
| `shellReplaySourceIds` | `borg-boundary-shell-replay-source.v1` ids consumed by this manifest. |
| `boundaryShellNoisePolicyIds` | `borg-boundary-shell-noise-policy.v1` ids consumed by this manifest. |
| `shellCoverageStatus` | `boundary-shell-complete`, `missing-boundary-shell patch`, `missing-time-bin`, or `fail-closed`. |
| `shellSourceMixtureIds` | Source-boundary-shell patch and time-bin mixture rows used to generate inbound path seeds. |
| `shellSourceMixtureStatus` | `measured`, `unmeasured`, `display-only`, or `fail-closed`. |
| `timeMapPolicyIds` | Time-map policy ids mapping target replay bins to observed source boundary-shell patch bins. |
| `timeMapSourceStatus` | `observed-boundary-shell patch-input`, `observed-bin-resample`, `display-only-synthetic-preview`, `untraceable-source`, or `fail-closed-synthetic-input`. |
| `shellInputTraceabilityRowIds` | Rows linking replayed inbound samples to source shell-patch summaries, source time bins, path segments or path streams, and shell influence-model ids. |
| `shellInfluenceModelIds` | `borg-boundary-shell-influence-model.v1` ids derived from native path streams, path indices, kernels, and boundary-shell patch distribution models. |
| `shellInfluenceModelAuthority` | `path-derived-model`, `display-only`, `missing-model`, or `fail-closed`. |
| `shellInfluenceModelMappingStatus` | `same-boundary-shell patch-only`, `mapped-boundary-shell patch-ready`, `any-boundary-shell patch-ready`, `display-only`, or `fail-closed`. |
| `shellProjectionCacheIds` | Optional per-point boundary-shell patch projection caches used only for rendering or debugging. |
| `shellProjectionCacheStatus` | `absent`, `display-cache-only`, or `not-authoritative`. |
| `velocityScaleRange` | Declared minimum and maximum sampled velocity magnitudes, units, and normalization chart. |
| `velocitySamplingProtocolIds` | `borg-velocity-sampling-protocol.v1` ids used to measure candidate sampling policies. |
| `velocitySamplingResultIds` | `borg-velocity-sampling-result.v1` ids for scored candidate policies. |
| `velocitySamplingPolicyIds` | Sampling policy ids for velocity-scale-aware boundary-shell patch replay. |
| `velocitySamplingSelectedPolicyId` | Candidate sampling policy selected for the replay source, or null while research remains open. |
| `velocitySamplingResearchStatus` | `research-open`, `candidate-policy`, `measured-within-budget`, `precision-insufficient`, or `fail-closed`. |
| `velocitySamplingHoldoutStatus` | `passed`, `failed`, `not-measured`, or `fail-closed`. |
| `velocitySamplingResidualSummary` | Velocity distribution residual, tail mass residual, correlation residual, seed variance residual, boundary-shell patch replay residual, and central residual contribution. |
| `velocitySamplingErrorBudgetIds` | Error-budget rows for velocity sampling and its contribution to boundary-shell patch replay and central-ball residuals. |
| `inboundReplayRowIds` | Boundary-generated inbound architrino and wake-history rows. |
| `shellReplayValidationResultIds` | Validation result ids containing $R_{\mathrm{shell\ replay}}$ and `R_boundary->central`. |
| `benignNoiseStatus` | `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `retainedLocalEvidenceStatus` | Status for same-record local path and wake evidence. |
| `boundaryGeneratedEvidenceStatus` | Status for boundary-generated architrinos and reconstructed wake history. |

Boundary-shell replay may not replace retained local wake rows, repair missing same-record path history, or serve as branch evidence. The first time-map policy may use only observed boundary-shell patch-input samples or resampled observed bins with traceability to recorded path-derived boundary-shell patch data. Invented synthetic boundary input may be shown only as display-only visualization and must not influence receiver acceleration, wake-background diagnostics, central-ball residuals, or experimental output. Velocity-scale-aware sampling is research-open until the manifest reports a measured policy, declared velocity scale range, and replay error budget. Boundary-shell patch influence values are authoritative only through native path streams and `borg-boundary-shell-influence-model.v1`; per-point boundary-shell patch projection caches are display/debug artifacts and must not become source evidence. A boundary shell replay becomes `benign noise` only when the manifest reports `benignNoiseStatus = measured-reduced-pass`.

## Boundary-To-Central Residual

Central-ball values outside strict buffer status require a residual decision:

| Field | Required content |
| --- | --- |
| `boundaryToCentralResidualId` | Stable residual row id. |
| `residualLabel` | Literal `R_boundary->central`. |
| `residualValue` | Measured $R_{\mathrm{boundary\to central}}$ value. |
| `tolerance` | Declared $\tau_{\mathcal C}$. |
| `comparisonWindowId` | Comparison window, receiver set, norm, and excluded transient bins. |
| `referenceRunId` | Reference run used by the residual, when available. |
| `boundaryRunId` | Boundary replay run used by the residual. |
| `status` | `passed`, `failed`, `missing-reference`, `missing-bound`, `not-measured`, or `fail-closed`. |
| `firstFailureCode` | `central_boundary_residual_exceeded`, `missing_error_budget`, or another first-failure code. |
| `boundaryReplayDecisionPolicyId` | Decision policy id for strict-buffer, measured replay, display-only, and Not advanced dispositions. |
| `strictBufferStatus` | `strict-buffer-pass`, `strict-buffer-failed`, or `not-evaluated`. |
| `boundaryReplayDecisionStatus` | `strict-buffer-pass`, `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `tauSelf` | Declared $\tau_{\mathrm{self}}$; v0 default is $5\times10^{-2}$. |
| `tauShell` | Declared $\tau_{\mathrm{shell}}$; v0 default is $10^{-2}$. |
| `tauCentral` | Declared $\tau_{\mathcal C}$; v0 default is $10^{-3}$. |
| `epsilon0` | Normalization floor used in residual denominators. |
| `decisionNormId` | Norm and comparison-window definition used for residual decisions. |
| `displayOnlyReason` | Reason code when the replay can be rendered but cannot receive value authority. |
| `failClosedAffectedValueIds` | Central-ball, acceleration, wake-background, or diagnostic value ids that the decision does not advance. |

If this residual is required and does not pass, central-ball acceleration and wake-background values must use `fail-closed-value` or `missing-error-budget`.

## Error Budget And Diagnostic Status

| Field | Required content |
| --- | --- |
| `globalErrorBudgetId` | Run-level error-budget declaration. |
| `stageErrorBudgetIds` | Motion integration, causal-root solving, wake-row construction, path-history interpolation, stream readback, boundary-shell replay, and display projection budgets. |
| `precisionPathId` | Native precision path and numeric chart. |
| `tolerancePolicyId` | Tolerance policy for root, wake, replay, aggregation, and central residual tests. |
| `haltDiagnostics` | Halt state, first-failure code, affected field, exceeded bound, and claim-level downgrade. |
| `diagnosticStatusVocabulary` | The diagnostic status list below. |

Diagnostic status values:

1. `authoritative-solver-output`
2. `app-facing-projection`
3. `display-only-visualization`
4. `missing-error-budget`
5. `exceeded-error-budget`
6. `fail-closed-value`

The least-authoritative applicable status wins in this order: `fail-closed-value`, `exceeded-error-budget`, `missing-error-budget`, `display-only-visualization`, `app-facing-projection`, `authoritative-solver-output`.

## Value Authority States

| State | Admission rule | Claim limit |
| --- | --- | --- |
| `retained-local-evidence` | Same-record source and receiver path history exists, required causal roots are solved inside the error budget, and the row does not depend on statistical boundary replay. | Supports local simulation-window diagnostics only. |
| `reduced-model-boundary` | Value comes from declared boundary-shell patch statistics, replay source ids, sampling seed, replay policy, and error budget. | Supports boundary approximation only. |
| `boundary-generated-value` | Inbound architrino or reconstructed wake history is generated from boundary-shell statistics. | New identity or reconstructed history; not retained same-record evidence. |
| `authoritative-solver-output` | EOM solver value inside declared error budget with manifest and model contract metadata. | Solver value for the declared run, not a proof-level claim by itself. |
| `app-facing-projection` | Display transform, interpolation, binning, downsampling, or logarithmic view derived from a source value. | App-facing view only; source value must remain traceable. |
| `display-only-visualization` | Visual aid that does not feed solver state, receiver acceleration, branch evidence, or validation rows. | Inspection only. |
| `missing-error-budget` | Required error-budget metadata is absent. | Blocks authoritative use. |
| `exceeded-error-budget` | Reported residual, replay residual, interpolation error, or stage error exceeds the declared bound. | Blocks authoritative use. |
| `fail-closed-value` | Compatibility value for either a completed verification failure or incomplete verification caused by a missing required field. | Blocks the affected value, region, or run from authoritative display and records the narrower reason separately. |

## Deployment Budget

Deployment budget is separate from EOM solver throughput. The manifest must not advance if these budgets are collapsed into one undifferentiated value.

| Field | Required content |
| --- | --- |
| `bundleSizeBytes` | JavaScript, CSS, HTML, WASM, and app shell transfer size. |
| `staticAssetTransferBytes` | Textures, generated JSON, scene data, captures, fonts, and other static payloads. |
| `githubPagesBandwidthEstimate` | Expected Pages transfer from bundle/assets and visit count. |
| `browserHeapBudget` | Browser heap for active state, manifests, path history, wake rows, buffers, and parsed assets. |
| `gpuMemoryBudget` | GPU/WebGL/WebGPU memory for 4K UHD rendering, point buffers, line buffers, trails, wake visualization, and render targets. |
| `browserStorageBudget` | IndexedDB, Cache Storage, local replay datasets, captures, and downloaded manifests retained by the browser. |
| `actionsArtifactBudget` | CI/review artifacts, generated captures, benchmark output, and logs retained by GitHub Actions. |
| `nativeSolverThroughput` | Steps, rows, candidates, and retained records per second under the EOM solver. |
| `deploymentBudgetStatus` | `passed`, `warning`, `missing-budget`, `exceeded-budget`, or `fail-closed`. |

`borg-release-budget-manifest.v1` is retained as the historical runtime budget cover sheet measured against the deleted pre-EOM browser path. Its ceilings do not apply to the current EOM surface, and the historical file is not a runtime input. Current browser/runtime ceilings for chunk wall time, frame append rate, browser heap growth, worker memory, run frame rows, target duration, and chunk duration require both a separately authorized current EOM release budget and a calibration sweep measured from EOM chunks; measurements alone do not create ceilings. These measurements remain separate from EOM solver throughput and from the remaining unmeasured deployment budgets: bundle size, static assets, Pages bandwidth, GPU memory, browser storage, Actions artifacts, and EOM solver throughput remain separately reported fields.

## Render Manifest

Visualization resolution is not solver resolution. Every reviewed or produced app output must carry a render manifest.

| Field | Required content |
| --- | --- |
| `renderManifestId` | Stable render manifest id. |
| `viewportCssSize` | Logical viewport size used by layout. |
| `renderPixelSize` | Drawing-buffer pixel width and height. Required quality/capture value: `3840x2160`. |
| `devicePixelRatio` | Browser or shell device pixel ratio. |
| `renderScale` | App-selected multiplier used for interaction responsiveness. |
| `targetFrameRate` | Requested interactive frame-rate band. |
| `visualQualityMode` | `interactive-adaptive`, `quality-4k-uhd`, or `capture-4k-uhd`. |
| `renderStatus` | `passed-4k-uhd`, `adaptive-interaction-only`, `not-measured`, or `fail-closed`. |

Only `quality-4k-uhd` and `capture-4k-uhd` at 3840 by 2160 satisfy the required output standard. `interactive-adaptive` is an interaction fallback and does not satisfy review or production output by itself.

## Minimum Manifest Object

The first implementation artifact should emit this shape, even when some arrays contain explicit gap rows rather than native-backed rows:

```yaml
schema: borg-dataset-manifest.v1
manifestId: string
runId: string
modelContractId: string
nativeSolverStatus: native-backed-now | manifest-gap | bridge-schema-gap | native-capability-gap | display-only | fail-closed
simulationEnvelope:
  outerRadius: length
  centralBall: region
  centralBallRadius: length
  radialBufferMargin: length
  historyDepth: time
  fieldSpeed: length_per_time
  wakeHorizon: length
  centralVelocityBound: length_per_time
  centralObservationInterval: time
  centralBoundaryTolerance: dimensionless
population:
  centralArchitrinoCount: integer
  architrinoCount: integer
  bufferArchitrinoCount: integer
  countDerivation: formula_and_inputs
initialConditions:
  initialConditionFamily: random | seeded-random | lattice | clustered | explicit | imported
  initialConditionSeed: string_or_null
  electrinoCount: integer
  positrinoCount: integer
  polaritySignConvention: string
  positrinoCharge: number
  electrinoCharge: number
  velocityPolicy: zero | scale-mix | seeded-random-small-3d | explicit | drift-v
  randomVelocityMaxComponentMagnitude: number_or_null
  randomVelocityMinSpeed: number_or_null
  velocityBoundScaleFromV1: number_or_null
pathHistory:
  pathHistoryStreamIds: []
  pathHistoryGapRows: []
wakeHistory:
  resolvedWakeRowIds: []
  backgroundNoiseRowIds: []
  boundaryGeneratedWakeRowIds: []
  failureWakeRowIds: []
  wakeHistoryGapRows: []
  rowConservationCounts: object
boundaryShell:
  shellSummaryIds: []
  boundaryShellNoisePolicyIds: []
  shellInfluenceModelIds: []
  shellReplaySourceIds: []
  shellSourceMixtureIds: []
  benignNoiseStatus: display-only-insufficient-evidence | measured-reduced-pass | fail-closed-residual | fail-closed-contamination | fail-closed-missing-contract
  velocitySamplingProtocolIds: []
  velocitySamplingResultIds: []
  inboundReplayRowIds: []
  shellReplayValidationResultIds: []
boundaryToCentralResidual:
  residualLabel: R_boundary->central
  residualValue: number_or_null
  tolerance: number_or_null
  status: passed | failed | missing-reference | missing-bound | not-measured | fail-closed
diagnostics:
  globalErrorBudgetId: string_or_null
  stageErrorBudgetIds: []
  diagnosticStatusVocabulary: []
  valueAuthorityStates: []
  firstFailureCode: string_or_null
deploymentBudget:
  bundleSizeBytes: integer_or_null
  staticAssetTransferBytes: integer_or_null
  githubPagesBandwidthEstimate: object_or_null
  browserHeapBudget: object_or_null
  gpuMemoryBudget: object_or_null
  browserStorageBudget: object_or_null
  actionsArtifactBudget: object_or_null
  nativeSolverThroughput: object_or_null
renderManifests:
  - renderPixelSize: 3840x2160
    visualQualityMode: quality-4k-uhd | capture-4k-uhd
    renderStatus: passed-4k-uhd | fail-closed
```

## First-Failure Codes for Not advanced Dispositions

The manifest must report the first applicable failure before displaying affected values as authoritative.

| Code | Meaning |
| --- | --- |
| `new_production_solver_required` | The implementation path requires a production solver outside the EOM solver. |
| `native_solver_status_missing` | The manifest lacks model contract or EOM solver status. |
| `manifest_schema_missing_required_field` | A required manifest field is missing. |
| `physical_mass_input_present` | Architrino physical mass appears as an input or explanatory field. |
| `boundary_identity_retained_without_external_path_history` | Boundary-generated inbound architrinos are treated as retained identities without retained external path history. |
| `missing_boundary_source_summary` | Boundary-generated rows lack boundary-shell source summary ids. |
| `silent_wake_truncation` | Candidate wake rows are dropped without resolved, aggregated, boundary-generated, or failure accounting. |
| `row_conservation_failed` | Wake row conservation counts do not balance. |
| `path_history_gap_unclassified` | Required path-history gap is not represented by an explicit gap row. |
| `wake_history_gap_unclassified` | Required wake-history gap is not represented by an explicit gap row. |
| `history_depth_insufficient` | History depth is too short for the declared path, wake, or boundary study. |
| `history_depth_insufficient_for_authoritative_acceleration` | Receiver acceleration is displayed as authoritative despite insufficient retained history. |
| `javascript_reference_presented_as_production` | JavaScript-only reference behavior is presented as production behavior. |
| `missing_error_budget` | Required error-budget metadata is absent. |
| `error_budget_exceeded` | A declared stage or global budget is exceeded. |
| `shell_replay_residual_exceeded` | $R_{\mathrm{shell\ replay}}>\tau_{\mathrm{shell}}$. |
| `central_boundary_residual_exceeded` | $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$. |
| `missing_boundary_shell_crossing_coverage` | Reference rows lack complete boundary-shell crossing coverage. |
| `above_floor_row_replayed` | A local wake above `wakeFloor` was replaced by statistical replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed boundary input as same-record evidence. |
| `correlation_unmodeled` | Detected correlation structure is above budget but not represented in the replay policy. |
| `shell_replay_used_as_branch_evidence` | Boundary-shell replay is used as branch evidence or a retained wake substitute. |
| `residual_tolerance_policy_missing` | Required tolerance, comparison norm, or $\varepsilon_0$ residual floor is missing. |
| `required_residual_unmeasured` | A required residual is missing while a central-ball or replay diagnostic asks for value authority. |
| `time_map_source_untraceable` | A replayed inbound sample cannot be traced to observed boundary-shell patch summary bins, path rows, or the boundary-shell patch influence model. |
| `synthetic_boundary_input_used_experimentally` | An invented synthetic boundary input affects receiver acceleration, wake-background diagnostics, central-ball residuals, or experimental output. |
| `boundary_shell_influence_model_missing` | Replay needs a path-derived shell influence model but no `borg-boundary-shell-influence-model.v1` row is available. |
| `shell_projection_used_as_authority` | A per-point boundary-shell patch projection cache is used as source evidence instead of path history and a path-derived model. |
| `shell_influence_model_mapping_failed` | The path-derived boundary-shell patch influence model cannot be mapped to the target boundary-shell patch inside the declared budget. |
| `boundary_shell_policy_missing` | Replay-affected diagnostics are requested without a `borg-boundary-shell-noise-policy.v1` row. |
| `boundary_shell_coverage_incomplete` | The source summary set lacks complete boundary-shell coverage for the declared source window. |
| `shell_source_mixture_unmeasured` | Source-boundary-shell patch mixture weights are used without measured residuals and traceability. |
| `velocity_sampling_protocol_missing` | Replay-affected diagnostics are requested without a `borg-velocity-sampling-protocol.v1` row. |
| `velocity_sampling_research_open` | Velocity-scale-aware sampling has not been measured, so affected values cannot receive experimental authority. |
| `velocity_sampling_precision_insufficient` | The selected sampling policy cannot represent the declared velocity scale range inside the replay error budget. |
| `velocity_sampling_holdout_failed` | The selected sampling policy passes calibration but fails withheld source bins. |
| `velocity_sampling_tail_residual_exceeded` | Rare high-speed or wake-sensitive tail mass is outside the declared budget. |
| `velocity_sampling_seed_variance_exceeded` | Deterministic seed-set replay variation is outside the declared budget. |
| `missing_central_volume` | The run lacks a declared `centralBall` while presenting central-ball conclusions. |
| `scale_fields_collapsed` | Outer `outerRadius`, displayed `centralBallRadius`, and `radialBufferMargin` are collapsed into one visual scale. |
| `central_count_treated_as_total_count` | `centralArchitrinoCount` is treated as total `architrinoCount` after a nonzero buffer is declared. |
| `central_volume_buffer_target_failed` | Strict buffer status is claimed when $b_{\mathrm{shell}}(\mathcal C)<\max(c_fh,\ v_{\max}T_{\mathcal C})$. |
| `deployment_budget_undifferentiated` | Static transfer, browser runtime budgets, Actions artifacts, Pages bandwidth, and EOM solver throughput are not separated. |
| `render_manifest_not_4k_uhd` | Review or quality output lacks a 3840 by 2160 render manifest. |
| `proof_claim_without_same_record_evidence` | A candidate run is described as proof without same-record retained evidence. |

## Claim-Level Status

This manifest contract is `priority-design`. It does not upgrade app output beyond `candidate-run` or `developer-test` without EOM-backed rows, error budgets, residuals, row-conservation counts, and measured velocity-scale sampling results for any replay-affected diagnostic.

## Design-Owned Policy Object

The design-owned executable policy lives in [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js): the spherical simulation envelope, population sizing rule, seeded initial-condition policy, canonical normalized `fieldSpeed = 1`, diagnostic vocabulary, and explicit gap rows for wake history, boundary-shell products, velocity sampling, and `R_boundary->central`. That source object and its validator own the exact developer-test values; this packet owns their manifest meaning and authority boundary.

## Executable App Surface Contract

`borg-app-surface-design.v1` is the design-owned `BORG_APP_SURFACE_DESIGN_V1` constant in [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js). The source object and `validateBorgManifest` own its exact executable fields.

The surface design binds the displayed central ball, one dotted outer boundary shell, EOM-run current-state frames, path-history availability, simulation-envelope rail, initial-condition summary, layer strip, bottom timeline, diagnostics rail, deployment budget placeholders, and 4K UHD render manifest. The central ball remains a declared measurement region and is not rendered as a second sphere. It keeps `simulation-window`, `architrino-position`, `path-history`, and `diagnostics` visible by default, keeps `velocity-vectors` off by default, and disables `wake-streams` and `boundary-shell-status` until their required EOM rows exist. The app-facing visual convention renders architrinos as small fixed-screen points, with `electrino` rows pure blue and `positrino` rows pure red. The path-history visual rule is `displayTransform = adjacent-native-row-line-segments` and `smoothingPolicy = none`, so the page cannot imply curved interaction dynamics beyond the EOM rows it renders.

The surface design intentionally preserves authority requiring verification before advancement for wake history, boundary-shell replay, benign-noise status, and central-ball acceleration. Its valid claim is `developer-test-screen-spec`, not production UI readiness and not proof evidence.

## First Static Page Artifact

[borg.html](../../../borg.html) is the first static page consumer for the dataset manifest and surface design. It uses [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js) as the browser-safe design-owned policy object and [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js) to render the dotted outer boundary shell, EOM-run current-state positions, frame scrubber, layer controls, render/deployment placeholders, and diagnostics required for advancement.

The page is static and developer-test scoped. All displayed motion comes from the EOM run path; the page does not run a browser solver and does not grant authority to replay-affected values.

## Next Exact Build Burden

The next build burden is `build-native-wake-history-and-boundary-residual-fixture`: extend the EOM contracts and native implementation so the manifest can add retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics on top of the EOM run path. Browser surface-budget measurement remains required later, but it must not precede the EOM solver evidence needed for Borg physics interpretation.
