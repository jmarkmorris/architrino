# Borg Dataset Manifest v1

## Workstream Metadata

- Kind: `priority`
- Status: `design-complete`
- Claim level: `priority-design`
- Schema id: `borg-dataset-manifest.v1`
- Primary requirements: [requirements-and-design](requirements-and-design.md)
- Face boundary source packet: [face-boundary-replay](face-boundary-replay.md)
- Native bridge source packet: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md)
- First screen consumer: [borg-app-surface-design.v1](borg-app-surface-design.v1.md)

## Purpose

`borg-dataset-manifest.v1` is the app-facing cover sheet for one Borg run or replay dataset. It records the native solver contract, simulation envelope, displayed central volume, boundary policy, path-history streams, wake-history rows, face-boundary replay rows, error budget, diagnostic authority, deployment budget, and 4K UHD render output metadata needed by the first app screen.

The manifest is priority-design material. It does not authorize a new solver, does not make boundary replay same-record evidence, and does not include save, export, import, or load workflow design.

## Native Solver Contract

Every manifest must identify the native central solver contract used to produce the dataset. If a value is not native-backed, the manifest must say whether it is a bridge/schema gap, a missing native capability, an app-facing projection, or display-only visualization.

| Field | Required content |
| --- | --- |
| `schema` | Literal `borg-dataset-manifest.v1`. |
| `manifestId` | Stable manifest id. |
| `runId` | Stable run or replay dataset id. |
| `modelContractId` | Native central solver model contract id. |
| `nativeSolverStatus` | `native-backed-now`, `manifest-gap`, `bridge-schema-gap`, `native-capability-gap`, `display-only`, or `fail-closed`. |
| `nativeSolverVersion` | Native solver build, ABI, or commit identifier when available. |
| `bridgeSchemaVersion` | Bridge schema version consumed by the app. |
| `claimLevel` | `priority-design`, `developer-test`, `candidate-run`, or stricter fail-closed status. |
| `firstFailureCode` | Null when no fail-closed condition applies; otherwise one first-failure code from this packet. |

Required native-solver rule: the manifest may report gaps, projections, or display-only values, but it must not define an app-local production solver or promote JavaScript-only reference behavior to production behavior.

## Simulation Envelope

The manifest must separate the outer computed cube from the displayed central cube.

| Field | Required content |
| --- | --- |
| `sideLength` | Outer computed cube side length $L_{\mathrm{calc}}$. |
| `centralVolume` | Displayed interior observation region $\mathcal C$, including shape, center, bounds, and coordinate chart. |
| `centralVolumeSideLength` | Displayed central cube side length $L_{\mathcal C}$ when $\mathcal C$ is cubic. |
| `faceBufferMargin` | Minimum distance $b_{\mathrm{face}}(\mathcal C)$ from the displayed central volume to the outer computed cube faces. |
| `scaleFactor` | Model/display or campaign scale normalization. |
| `boundaryMode` | `local-window`, `statistical-face-boundary`, or `display-only-preview`. |
| `timeStepPolicy` | Fixed, adaptive, or native solver selected stepping policy. |
| `duration` | Requested simulated time span. |
| `wakeFloor` | Declared floor below which eligible wake rows route to background/noise rows. |
| `aggregationBins` | Time, face, source population, receiver population, and strength bins for background/noise rows. |

Strict central-volume buffer status requires:

$$
b_{\mathrm{face}}(\mathcal C)
\ge
\max(c_fh,\ v_{\max}T_{\mathcal C}).
$$

If the strict buffer target is not satisfied, central-volume interpretation requires a passing `R_boundary->central` residual or must fail closed.

## History And Central-Volume Timing

`historyDepth` is the retained time interval. `wakeHorizon` is the corresponding causal travel length and must be computed from `fieldSpeed` and `historyDepth`.

| Field | Required content |
| --- | --- |
| `historyDepth` | Active retained causal-history time window $h$. |
| `fieldSpeed` | Causal field speed $c_f$ used by path and wake rows. |
| `wakeHorizon` | Computed value $c_f h$. |
| `centralVelocityBound` | Declared or measured $v_{\max}$ for architrinos that can affect the central volume. |
| `centralObservationInterval` | Time interval $T_{\mathcal C}$ used by the strict central-volume buffer target. |
| `centralBoundaryTolerance` | Declared tolerance $\tau_{\mathcal C}$ for central-volume boundary influence. |
| `strictCentralBufferStatus` | `passed`, `failed`, `not-measured`, or `not-applicable`. |

## Population Counts

The operator-facing count is the displayed central count. The solver-facing count is derived from the central density and buffer volume.

| Field | Required content |
| --- | --- |
| `centralArchitrinoCount` | Target count $N_{\mathcal C}$ in the displayed central cube. Default design target: `256`; conservative fallback: `128`; stress preset: `512`. |
| `architrinoCount` | Derived total target count $N_{\mathrm{calc}}$ for the outer computed cube. |
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
1+\frac{2b_{\mathrm{face}}(\mathcal C)}{L_{\mathcal C}}
\right)^3
\right\rceil.
$$

`centralArchitrinoCount` must not be treated as total solver `architrinoCount` when `faceBufferMargin` is nonzero.

## Initial Conditions

The manifest must preserve the exact initial-condition provenance accepted by the native solver.

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
| `currentStateFrameIds` | Frame ids for current positions, velocities, accelerations, face status, time, and step index. |
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
| `firstFailureCode` | First fail-closed code. |
| `diagnosticStatus` | Diagnostic status vocabulary value. |
| `valueAuthority` | Value authority state. |

## Wake-History Rows And Conservation Counts

The manifest must account for every candidate wake row inside the declared envelope. Silent truncation is forbidden.

| Field | Required content |
| --- | --- |
| `resolvedWakeRowIds` | Retained above-floor wake rows with same-record source and receiver path history. |
| `backgroundNoiseRowIds` | Aggregated below-floor wake rows with omitted-row counts and error bounds. |
| `boundaryGeneratedWakeRowIds` | Wake rows generated from declared face-boundary replay source ids. |
| `failureWakeRowIds` | Fail-closed wake rows. |
| `wakeHistoryGapRows` | Explicit gap rows for missing native row output, missing causal roots, insufficient history depth, missing error budget, or missing face summary. |
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
| `boundaryGeneratedWakeRowCount` | Rows generated from face-boundary replay. |
| `failureWakeRowCount` | Rows that failed closed. |
| `conservationResidual` | Difference between candidate count and the classified sum. |
| `firstFailureCode` | `row_conservation_failed` or null. |

## Face-Boundary Summary And Replay

Face-boundary replay is reduced-model boundary input. Boundary-generated inbound architrinos are new identities with reconstructed wake history, not retained same-record identity.

| Field | Required content |
| --- | --- |
| `outboundArchitrinoFaceEventStreamIds` | Streams or row sets for outbound architrino crossings by face and time bin. |
| `outboundWakeFaceEventStreamIds` | Streams or row sets for outbound wake crossings by face and time bin. |
| `faceSummarySetIds` | Sets of `borg-face-summary.v1` rows. |
| `faceSummaryIds` | Individual face summary row ids consumed by this manifest. |
| `faceReplaySourceIds` | `borg-face-replay-source.v1` ids consumed by this manifest. |
| `sixFaceBoundaryNoisePolicyIds` | `borg-six-face-boundary-noise-policy.v1` ids consumed by this manifest. |
| `faceCoverageStatus` | `six-face-complete`, `missing-face`, `missing-time-bin`, or `fail-closed`. |
| `faceSourceMixtureIds` | Source-face and time-bin mixture rows used to generate inbound path seeds. |
| `faceSourceMixtureStatus` | `measured`, `unmeasured`, `display-only`, or `fail-closed`. |
| `timeMapPolicyIds` | Time-map policy ids mapping target replay bins to observed source face bins. |
| `timeMapSourceStatus` | `observed-face-input`, `observed-bin-resample`, `display-only-synthetic-preview`, `untraceable-source`, or `fail-closed-synthetic-input`. |
| `faceInputTraceabilityRowIds` | Rows linking replayed inbound samples to source face summaries, source time bins, path segments or path streams, and face influence model ids. |
| `faceInfluenceModelIds` | `borg-face-influence-model.v1` ids derived from native path streams, path indices, kernels, and face distribution models. |
| `faceInfluenceModelAuthority` | `path-derived-model`, `display-only`, `missing-model`, or `fail-closed`. |
| `faceInfluenceModelMappingStatus` | `same-face-only`, `mapped-face-ready`, `any-face-ready`, `display-only`, or `fail-closed`. |
| `faceProjectionCacheIds` | Optional per-point face projection caches used only for rendering or debugging. |
| `faceProjectionCacheStatus` | `absent`, `display-cache-only`, or `not-authoritative`. |
| `velocityScaleRange` | Declared minimum and maximum sampled velocity magnitudes, units, and normalization chart. |
| `velocitySamplingProtocolIds` | `borg-velocity-sampling-protocol.v1` ids used to measure candidate sampling policies. |
| `velocitySamplingResultIds` | `borg-velocity-sampling-result.v1` ids for scored candidate policies. |
| `velocitySamplingPolicyIds` | Sampling policy ids for velocity-scale-aware face replay. |
| `velocitySamplingSelectedPolicyId` | Candidate sampling policy selected for the replay source, or null while research remains open. |
| `velocitySamplingResearchStatus` | `research-open`, `candidate-policy`, `measured-within-budget`, `precision-insufficient`, or `fail-closed`. |
| `velocitySamplingHoldoutStatus` | `passed`, `failed`, `not-measured`, or `fail-closed`. |
| `velocitySamplingResidualSummary` | Velocity distribution residual, tail mass residual, correlation residual, seed variance residual, face replay residual, and central residual contribution. |
| `velocitySamplingErrorBudgetIds` | Error-budget rows for velocity sampling and its contribution to face replay and central-volume residuals. |
| `inboundReplayRowIds` | Boundary-generated inbound architrino and wake-history rows. |
| `faceReplayValidationResultIds` | Validation result ids containing $R_{\mathrm{face\ replay}}$ and `R_boundary->central`. |
| `benignNoiseStatus` | `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `retainedLocalEvidenceStatus` | Status for same-record local path and wake evidence. |
| `boundaryGeneratedEvidenceStatus` | Status for boundary-generated architrinos and reconstructed wake history. |

Face-boundary replay may not replace retained local wake rows, repair missing same-record path history, or serve as branch evidence. The first time-map policy may use only observed face-input samples or resampled observed bins with traceability to recorded path-derived face data. Invented synthetic boundary input may be shown only as display-only visualization and must not influence receiver acceleration, wake-background diagnostics, central-volume residuals, or experimental output. Velocity-scale-aware sampling is research-open until the manifest reports a measured policy, declared velocity scale range, and replay error budget. Face influence values are authoritative only through native path streams and `borg-face-influence-model.v1`; per-point face projection caches are display/debug artifacts and must not become source evidence. A six-face boundary replay becomes `benign noise` only when the manifest reports `benignNoiseStatus = measured-reduced-pass`.

## Boundary-To-Central Residual

Central-volume values outside strict buffer status require a residual decision:

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
| `boundaryReplayDecisionPolicyId` | Decision policy id for strict-buffer, measured replay, display-only, and fail-closed outcomes. |
| `strictBufferStatus` | `strict-buffer-pass`, `strict-buffer-failed`, or `not-evaluated`. |
| `boundaryReplayDecisionStatus` | `strict-buffer-pass`, `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `tauSelf` | Declared $\tau_{\mathrm{self}}$; v0 default is $5\times10^{-2}$. |
| `tauFace` | Declared $\tau_{\mathrm{face}}$; v0 default is $10^{-2}$. |
| `tauCentral` | Declared $\tau_{\mathcal C}$; v0 default is $10^{-3}$. |
| `epsilon0` | Normalization floor used in residual denominators. |
| `decisionNormId` | Norm and comparison-window definition used for residual decisions. |
| `displayOnlyReason` | Reason code when the replay can be rendered but cannot receive value authority. |
| `failClosedAffectedValueIds` | Central-volume, acceleration, wake-background, or diagnostic value ids forced closed by the decision. |

If this residual is required and does not pass, central-volume acceleration and wake-background values must use `fail-closed-value` or `missing-error-budget`.

## Error Budget And Diagnostic Status

| Field | Required content |
| --- | --- |
| `globalErrorBudgetId` | Run-level error-budget declaration. |
| `stageErrorBudgetIds` | Motion integration, causal-root solving, wake-row construction, path-history interpolation, stream readback, face-boundary replay, and display projection budgets. |
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
| `reduced-model-boundary` | Value comes from declared face statistics, replay source ids, sampling seed, replay policy, and error budget. | Supports boundary approximation only. |
| `boundary-generated-value` | Inbound architrino or reconstructed wake history is generated from face-boundary statistics. | New identity or reconstructed history; not retained same-record evidence. |
| `authoritative-solver-output` | Native central solver value inside declared error budget with manifest and model contract metadata. | Solver value for the declared run, not a proof-level claim by itself. |
| `app-facing-projection` | Display transform, interpolation, binning, downsampling, or logarithmic view derived from a source value. | App-facing view only; source value must remain traceable. |
| `display-only-visualization` | Visual aid that does not feed solver state, receiver acceleration, branch evidence, or validation rows. | Inspection only. |
| `missing-error-budget` | Required error-budget metadata is absent. | Blocks authoritative use. |
| `exceeded-error-budget` | Reported residual, replay residual, interpolation error, or stage error exceeds the declared bound. | Blocks authoritative use. |
| `fail-closed-value` | Required condition failed or required field is missing. | Blocks affected value, region, or run from authoritative display. |

## Deployment Budget

Deployment budget is separate from native solver throughput. The manifest must fail closed if these budgets are collapsed into one undifferentiated value.

| Field | Required content |
| --- | --- |
| `bundleSizeBytes` | JavaScript, CSS, HTML, WASM, and app shell transfer size. |
| `staticAssetTransferBytes` | Textures, generated JSON, scene data, captures, fonts, and other static payloads. |
| `githubPagesBandwidthEstimate` | Expected Pages transfer from bundle/assets and visit count. |
| `browserHeapBudget` | Browser heap for active state, manifests, path history, wake rows, buffers, and parsed assets. |
| `gpuMemoryBudget` | GPU/WebGL/WebGPU memory for 4K UHD rendering, point buffers, line buffers, trails, wake visualization, and render targets. |
| `browserStorageBudget` | IndexedDB, Cache Storage, local replay datasets, captures, and downloaded manifests retained by the browser. |
| `actionsArtifactBudget` | CI/review artifacts, generated captures, benchmark output, and logs retained by GitHub Actions. |
| `nativeSolverThroughput` | Steps, rows, candidates, and retained records per second under the native central solver. |
| `deploymentBudgetStatus` | `passed`, `warning`, `missing-budget`, `exceeded-budget`, or `fail-closed`. |

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
  sideLength: length
  centralVolume: region
  centralVolumeSideLength: length
  faceBufferMargin: length
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
faceBoundary:
  faceSummaryIds: []
  sixFaceBoundaryNoisePolicyIds: []
  faceInfluenceModelIds: []
  faceReplaySourceIds: []
  faceSourceMixtureIds: []
  benignNoiseStatus: display-only-insufficient-evidence | measured-reduced-pass | fail-closed-residual | fail-closed-contamination | fail-closed-missing-contract
  velocitySamplingProtocolIds: []
  velocitySamplingResultIds: []
  inboundReplayRowIds: []
  faceReplayValidationResultIds: []
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

## Fail-Closed First-Failure Codes

The manifest must report the first applicable failure before displaying affected values as authoritative.

| Code | Meaning |
| --- | --- |
| `new_production_solver_required` | The implementation path requires a production solver outside the native central solver. |
| `native_solver_status_missing` | The manifest lacks model contract or native solver status. |
| `manifest_schema_missing_required_field` | A required manifest field is missing. |
| `physical_mass_input_present` | Architrino physical mass appears as an input or explanatory field. |
| `boundary_identity_retained_without_external_path_history` | Boundary-generated inbound architrinos are treated as retained identities without retained external path history. |
| `missing_boundary_source_summary` | Boundary-generated rows lack face-boundary source summary ids. |
| `silent_wake_truncation` | Candidate wake rows are dropped without resolved, aggregated, boundary-generated, or failure accounting. |
| `row_conservation_failed` | Wake row conservation counts do not balance. |
| `path_history_gap_unclassified` | Required path-history gap is not represented by an explicit gap row. |
| `wake_history_gap_unclassified` | Required wake-history gap is not represented by an explicit gap row. |
| `history_depth_insufficient` | History depth is too short for the declared path, wake, or boundary study. |
| `history_depth_insufficient_for_authoritative_acceleration` | Receiver acceleration is displayed as authoritative despite insufficient retained history. |
| `javascript_reference_presented_as_production` | JavaScript-only reference behavior is presented as production behavior. |
| `missing_error_budget` | Required error-budget metadata is absent. |
| `error_budget_exceeded` | A declared stage or global budget is exceeded. |
| `face_replay_residual_exceeded` | $R_{\mathrm{face\ replay}}>\tau_{\mathrm{face}}$. |
| `central_boundary_residual_exceeded` | $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$. |
| `missing_face_crossing_coverage` | Reference rows lack complete face-crossing coverage. |
| `above_floor_row_replayed` | A local wake above `wakeFloor` was replaced by statistical replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed boundary input as same-record evidence. |
| `correlation_unmodeled` | Detected correlation structure is above budget but not represented in the replay policy. |
| `face_replay_used_as_branch_evidence` | Face-boundary replay is used as branch evidence or a retained wake substitute. |
| `residual_tolerance_policy_missing` | Required tolerance, comparison norm, or $\varepsilon_0$ residual floor is missing. |
| `required_residual_unmeasured` | A required residual is missing while a central-volume or replay diagnostic asks for value authority. |
| `time_map_source_untraceable` | A replayed inbound sample cannot be traced to observed face summary bins, path rows, or the face influence model. |
| `synthetic_boundary_input_used_experimentally` | An invented synthetic boundary input affects receiver acceleration, wake-background diagnostics, central-volume residuals, or experimental output. |
| `face_influence_model_missing` | Replay needs a path-derived face influence model but no `borg-face-influence-model.v1` row is available. |
| `face_projection_used_as_authority` | A per-point face projection cache is used as source evidence instead of path history and a path-derived model. |
| `face_influence_model_mapping_failed` | The path-derived face influence model cannot be mapped to the target face inside the declared budget. |
| `six_face_boundary_policy_missing` | Replay-affected diagnostics are requested without a `borg-six-face-boundary-noise-policy.v1` row. |
| `six_face_coverage_incomplete` | The source summary set lacks complete six-face coverage for the declared source window. |
| `face_source_mixture_unmeasured` | Source-face mixture weights are used without measured residuals and traceability. |
| `velocity_sampling_protocol_missing` | Replay-affected diagnostics are requested without a `borg-velocity-sampling-protocol.v1` row. |
| `velocity_sampling_research_open` | Velocity-scale-aware sampling has not been measured, so affected values cannot receive experimental authority. |
| `velocity_sampling_precision_insufficient` | The selected sampling policy cannot represent the declared velocity scale range inside the replay error budget. |
| `velocity_sampling_holdout_failed` | The selected sampling policy passes calibration but fails withheld source bins. |
| `velocity_sampling_tail_residual_exceeded` | Rare high-speed or wake-sensitive tail mass is outside the declared budget. |
| `velocity_sampling_seed_variance_exceeded` | Deterministic seed-set replay variation is outside the declared budget. |
| `missing_central_volume` | The run lacks a declared `centralVolume` while presenting central-volume conclusions. |
| `scale_fields_collapsed` | Outer `sideLength`, displayed `centralVolumeSideLength`, and `faceBufferMargin` are collapsed into one visual scale. |
| `central_count_treated_as_total_count` | `centralArchitrinoCount` is treated as total `architrinoCount` after a nonzero buffer is declared. |
| `central_volume_buffer_target_failed` | Strict buffer status is claimed when $b_{\mathrm{face}}(\mathcal C)<\max(c_fh,\ v_{\max}T_{\mathcal C})$. |
| `deployment_budget_undifferentiated` | Static transfer, browser runtime budgets, Actions artifacts, Pages bandwidth, and native solver throughput are not separated. |
| `render_manifest_not_4k_uhd` | Review or quality output lacks a 3840 by 2160 render manifest. |
| `proof_claim_without_same_record_evidence` | A candidate run is described as proof without same-record retained evidence. |

## Claim-Level Status

This manifest contract is `priority-design` and now has a first longer native-backed `developer-test` fixture. It does not upgrade app output beyond `candidate-run` or `developer-test` without native-backed rows, error budgets, residuals, row-conservation counts, and measured velocity-scale sampling results for any replay-affected diagnostic.

## First Native-Backed Fixture Artifact

`borg-first-native-backed-fixture` is implemented by [build-first-native-backed-fixture.mjs](../../../scripts/borg/build-first-native-backed-fixture.mjs). It emits a live `borg-dataset-manifest.v1` object from the existing native central bridge rather than from a static JSON hand sketch.

The fixture submits a fixed-parameter native central-bridge `masterEquation` run. The manifest records that probe as `nativeMasterEquationProbe.statusCode = ok`, `firstFailureCode = none`, `requiredNativeExport = architrino_solver_integrate_master_equation_motion_f64`, and `fallbackDecision = native-master-equation-selected`. The selected source uses `fixtureProfileId = borg-first-native-default-motion-fixture.v1`, `runKind = masterEquation`, `solverMode = native-fixed-parameter-master-equation`, `motionLaw = architrino-master-equation-v1`, `fixedPhysicalParameterSetId = borg-fixed-physical-parameters.v1`, `fixedPhysicalParameterAuthority = manifest-declared-fixed-parameter-contract`, `visualTuningStatus = not-visual-tuned`, `visualBehaviorAuthority = native-output-only`, outer `sideLength = 100`, displayed `centralVolumeSideLength = 80`, `faceBufferMargin = 10`, `duration = 300`, and `sampleInterval = 0.2`. The initial placement uses `initialLinePolicy = seeded-random-interior-cube` with `initialConditionSeed = borg-sixteen-random-interior-position-seed.v1`; the initial polarity contract uses `polaritySignConvention = positrino-positive-electrino-negative`, `positrinoCharge = 1`, and `electrinoCharge = -1`; the initial velocity uses `velocityPolicy = seeded-random-small-3d`, `velocitySeed = borg-sixteen-random-small-3d-velocity-seed.v1`, `randomVelocityMaxComponentMagnitude = 0.042`, `randomVelocityMinSpeed = 0.0144`, and `velocityBoundScaleFromV1 = 1.2`. The manifest records `executionPath = native_c_abi`, `playbackFrameSource = native-keyframes`, `interpolationAuthority = display-only-between-native-keyframes`, `nativeKeyframeCount = 1501`, `frameCount = 24016` native current-state rows, `pathRowCount = 24000` native path-history rows, path-history stream ids, the outer/central cube split, derived `architrinoCount = 16`, `bufferArchitrinoCount = 8`, path bounds that stay inside the outer computed cube, deployment budget placeholders, and a 4K UHD render manifest placeholder. It does not expose a tuned pair action scale; `nativeMasterEquationStatus = native-fixed-parameter-master-equation`, `canonicalEomEvidence = true`, and `eomEvidenceStatus = native_master_equation_fixed_parameter_evidence` for the fixed-parameter current-state frame rows and adjacent path-history rows.

The fixture intentionally fails closed for replay authority. It emits explicit gap rows for retained wake rows, face-boundary summaries, `borg-face-influence-model.v1`, `borg-six-face-boundary-noise-policy.v1`, velocity sampling, and `R_boundary->central`. Its valid claim is `developer-test`, not proof evidence and not measured benign-noise authority.

## First App Surface Design Artifact

`borg-app-surface-design.v1` is implemented by [build-app-surface-design.mjs](../../../scripts/borg/build-app-surface-design.mjs). It consumes the live dataset manifest and emits the first Borg screen-spec object from the native-backed fixture.

The surface design binds the displayed central cube, optional outer computed cube overlay, native current-state frames, native path-history availability, simulation-envelope rail, initial-condition summary, layer strip, bottom timeline, diagnostics rail, deployment budget placeholders, and 4K UHD render manifest. It keeps `simulation-window`, `architrino-position`, and `diagnostics` visible by default, keeps `path-history` and `velocity-vectors` off by default, and disables `wake-streams`, `face-boundary-status`, and `outbound-face-background` until their required native-backed rows exist. The app-facing visual convention renders architrinos as small fixed-screen points, with `electrino` rows pure blue and `positrino` rows pure red. The path-history visual rule is `displayTransform = adjacent-native-row-line-segments` and `smoothingPolicy = none`, so the first page cannot imply curved interaction dynamics before native master-equation rows exist.

The surface design intentionally preserves fail-closed authority for wake history, face-boundary replay, benign-noise status, and central-volume acceleration. Its valid claim is `developer-test-screen-spec`, not production UI readiness and not proof evidence.

## First Static Page Artifact

[borg.html](../../../borg.html) is the first static page consumer for the dataset manifest and surface design. It uses [BorgFixtureData.js](../../../src/apps/borg/BorgFixtureData.js) as a browser-safe snapshot of the native-backed fixture summary and [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js) to render the central cube, current-state positions, frame scrubber, layer controls, render/deployment placeholders, and fail-closed diagnostics.

The page is static and developer-test scoped. It does not replace [build-first-native-backed-fixture.mjs](../../../scripts/borg/build-first-native-backed-fixture.mjs) as the native-backed fixture source, does not run a browser solver, and does not grant authority to replay-affected values.

## Next Exact Build Burden

The next build burden is `build-native-wake-history-and-boundary-residual-fixture`: extend the native central solver contract and bridge so the manifest can add retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics on top of the current fixed-parameter master-equation frame/path evidence. Browser surface-budget measurement remains required later, but it must not precede the native solver evidence needed for Borg physics interpretation.
