# Face-Boundary Replay Schema

## Purpose

This packet defines the first outbound/inbound face-boundary summary schema and validation fixture for the Borg app. The goal is to record architrino path crossings on the six faces of the simulation-window cube, reconstruct wakes from retained path history and a time index when needed, then replay a statistically similar inbound boundary population only when the run declares that approximation inside its simulation envelope and measures its effect on the central volume.

The schema is priority-design material. It is not accepted proof evidence, and it does not replace retained wake rows, causal-root rows, retained path-history rows, or same-record branch evidence.

## Operator Clarification: Six-Face Boundary Noise Target

The intended near-term boundary model is:

1. Inside the outer computed cube, the app knows the architrino state well enough to track paths. Wakes are reconstructed from those paths through a spatio-temporal index, an absolute-time index, or a later optimization scheme; wake rows are not the primitive face record.
2. Outgoing architrino paths across the cube faces are the recorded boundary data.
3. Those outbound path records become six faces of data: one statistical boundary stream for each cube face.
4. The open analysis problem is how to turn those six outbound face streams into artificial inbound inputs on all six faces.
5. The near-term target is self-similar benign reduced-model environment noise: the artificial inbound inputs should emulate the environment inside the cube well enough that the declared central volume remains inside its boundary-error budget.
6. A future large-volume run may look for a small Noether sea gradient, including a possible gravity-relevant signal, but that is not part of the first benign-noise fixture and must not be treated as current evidence.

This clarification means the row schemas in this packet are design-complete as formats. The remaining work is the six-face reconstruction policy and its native-backed validation fixture.

## Self-Similar Replay Advancement

The first six-face policy should treat the cube faces as a self-similar boundary, not as a boundary whose safety comes only from wake magnitude drop. The policy target is: for any allowed initial condition family, outbound architrino path summaries from the six faces define the statistical material that is replayed back as inbound input after a transformation that hides same-record outbound identity and prior retained history. Wake-background values are reconstructed from the replayed paths and the declared path index; they are not recorded as the primitive face stream.

The candidate transform has three jobs:

1. `facePathSummary` — record what leaves each face: outbound path ids or path-stream ranges, crossing event ids, crossing time bins, positions on the face, velocities, polarity inventory, path-index references, and correlation diagnostics across time and across faces.
2. `selfSimilarityTransform` — map the six outbound path streams into six inbound replay streams using face mapping, time mapping, scale normalization, velocity/polarity sampling, path resampling, wake-reconstruction policy, and correlation policy.
3. `historyHidingPolicy` — remove same-record identity continuity for outbound architrinos before replay. A replayed inbound architrino is a new boundary-generated identity with reconstructed wake history and reduced value authority, even when its statistical source is an outbound path from the same run.

In compact form, the replay source should be treated as a six-face operator:

$$
\mathcal I_F(t)
=
\mathsf H
\circ
\mathsf S_F
\left(
\{\mathcal P_G(t')\}_{G\in\partial\Omega_{\mathrm{calc}}}
\right),
$$

where $\mathcal P_G$ is the outbound path-summary stream on face $G$, $\mathsf S_F$ is the self-similar mapping that produces inbound path statistics for face $F$, and $\mathsf H$ is the history-hiding step that prevents replayed inbound identities from inheriting same-record evidence.

The first policy target for the transform is:

1. map each outbound path crossing into a candidate inbound crossing on a target face using a declared face map and time map;
2. normalize position, velocity, and polarity distributions so the inbound stream is self-similar to the observed six-face outbound stream at the declared scale;
3. assign new inbound architrino ids and replay seeds so no outbound path id becomes a retained inbound identity;
4. reconstruct wakes from the replayed inbound paths only through the declared path-index policy;
5. preserve measured cross-face and time-bin correlations when they are inside the error budget, and fail closed or display-only when correlation structure is detected but not represented.

The first policy target for `benign noise` is not small wake magnitude by itself. It is central-volume invisibility inside the declared residual budget. A replay is benign for the declared envelope only when reconstructed inbound paths and their reconstructed wakes do not move central-volume diagnostics outside tolerance.

For the first fixture, `benign noise` means the self-similar replay does not introduce a central-volume signal above the declared boundary-error budget:

$$
R_{\mathrm{boundary\to central}}
\le
\tau_{\mathcal C}.
$$

If the residual passes, the replay has only `reduced-model-boundary` authority for the declared envelope. If it is not measured, lacks a reference, or exceeds tolerance, the replay is `display-only` or `fail-closed` for central-volume interpretation. This applies whether the run stages a deep time-space collision, a nucleon-layout experiment, or another scale setting; self-similarity is a replay-policy requirement, not a proof that the underlying system is scale invariant.

## Envelope Inputs

Every face-boundary replay fixture must declare the simulation envelope before running:

| Field | Meaning | Units or value type |
| --- | --- | --- |
| `runId` | Source finite-window run identifier. | string |
| `modelContractId` | Native solver model contract. | string |
| `sideLength` | Outer computed cube side length $L_{\mathrm{calc}}$. | length |
| `fieldSpeed` | Causal propagation speed $c_f$. | length / time |
| `historyDepth` | Active retained causal-history window $h$. | time |
| `wakeHorizon` | Maximum represented wake travel distance $c_f h$. | length |
| `centralVolume` | Declared interior observation region $\mathcal C$. | region descriptor |
| `centralVolumeSideLength` | Displayed interior cube side length $L_{\mathcal C}$ when $\mathcal C$ is cubic. | length |
| `faceBufferMargin` | Minimum distance $b_{\mathrm{face}}(\mathcal C)$ from $\mathcal C$ to the outer computed faces. | length |
| `centralArchitrinoCount` | Target count $N_{\mathcal C}$ inside the displayed central cube. | integer |
| `architrinoCount` | Total target count $N_{\mathrm{calc}}$ inside the outer computed cube. | integer |
| `bufferArchitrinoCount` | Computed exterior count $N_{\mathrm{calc}}-N_{\mathcal C}$. | integer |
| `centralVelocityBound` | Declared or measured $v_{\max}$ for architrinos that can affect the central volume. | length / time |
| `centralObservationInterval` | Central-volume observation interval $T_{\mathcal C}$. | time |
| `centralBoundaryTolerance` | Declared tolerance $\tau_{\mathcal C}$ for boundary influence on the central volume. | dimensionless |
| `timeBinWidth` | Face-summary bin width $\Delta t$. | time |
| `wakeFloor` | Declared floor below which individual wakes route to background/noise rows. | acceleration or wake-strength unit named by the model contract |
| `errorBudgetId` | Error-budget declaration consumed by extraction and replay. | string |
| `valueAuthority` | Authority status for the fixture. | `retained-window`, `reduced-model-boundary`, or `display-only` |

The local-window regime for central-volume interpretation is declared when $b_{\mathrm{face}}(\mathcal C)\ge\max(c_fh,\ v_{\max}T_{\mathcal C})$. The face-boundary regime is declared when outbound architrino path crossings at the outer computed faces can materially affect the central volume after wake reconstruction. Face-boundary replay is meaningful only after the run declares the boundary approximation, value authority, central-volume observation region, buffer margin, and error budget.

## Face Summary Schema

An outbound face summary row records path activity crossing one face during one time bin. Wake quantities are reconstructed from retained path history and the declared path index when a replay, diagnostic, or residual test needs them.

| Field | Meaning |
| --- | --- |
| `schema` | Literal `borg-face-summary.v1`. |
| `summaryId` | Stable row identifier. |
| `sourceRunId` | Source finite-window run id. |
| `faceId` | One of `xMinus`, `xPlus`, `yMinus`, `yPlus`, `zMinus`, `zPlus`. |
| `timeStart` | Inclusive time-bin start. |
| `timeEnd` | Exclusive time-bin end. |
| `timeBinWidth` | Time-bin width $\Delta t$. |
| `sideLength` | Outer computed cube side length $L_{\mathrm{calc}}$ used by the source run. |
| `historyDepth` | Active history depth $h$. |
| `wakeHorizon` | $c_f h$. |
| `wakeFloor` | Floor used to classify subthreshold rows. |
| `outboundArchitrinoCount` | Number of architrinos crossing outward through this face during the bin. |
| `outboundPathStreamId` | Solver-owned path stream or path-summary stream for outbound crossings assigned to the face bin. |
| `outboundPathSegmentIds` | Path segment ids or segment ranges crossing the face during the bin. |
| `faceCrossingEventIds` | Stable crossing event ids. |
| `facePositionSamples` | Positions on the face at crossing, or histogram/basis coefficients for those positions. |
| `architrinoVelocityBins` | Histogram or basis coefficients for outbound architrino velocity. |
| `architrinoPolarityBins` | Counts by electrino/positrino inventory crossing this face. |
| `pathIndexPolicy` | `spatio-temporal-index`, `absolute-time-index`, `optimization-index`, or `index-unavailable`. |
| `pathIndexId` | Index id used to reconstruct wakes from path history. |
| `wakeReconstructionStatus` | `reconstructable-from-paths`, `index-missing`, `history-depth-insufficient`, `error-budget-exceeded`, or `display-only`. |
| `correlationSummary` | Time, opposite-face, adjacent-face, and recurrence diagnostics when measured. |
| `errorBudgetId` | Error budget used to extract the summary. |
| `extractionStatus` | `face-summary-ready`, `insufficient-history-depth`, `missing-face-crossing-rows`, `error-budget-exceeded`, or `display-only`. |
| `claimLevel` | `boundary-background-diagnostic` unless a stricter fail-closed status applies. |

The compact mathematical object represented by the row is

$$
\mathcal P_F(t,\Delta t)
=
\left(
N_F^{\mathrm{arch}},
X_F^{\mathrm{cross}},
V_F^{\mathrm{cross}},
Q_F,
I_F^{\mathrm{path}},
C_F,
\mathcal E_F
\right),
$$

where $X_F^{\mathrm{cross}}$ and $V_F^{\mathrm{cross}}$ are crossing-position and crossing-velocity summaries, $Q_F$ is the polarity inventory, $I_F^{\mathrm{path}}$ is the path index used for wake reconstruction, and $\mathcal E_F$ is the extraction error-budget and authority state.

## Replay Source Schema

A replay source row declares how one or more face summaries are sampled into a later run:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `borg-face-replay-source.v1`. |
| `replaySourceId` | Stable replay-source identifier. |
| `summarySetId` | Identifier for the consumed face-summary set. |
| `targetRunId` | Run id receiving the replayed boundary input. |
| `samplingSeed` | Declared seed for self-similar replay. |
| `samplingPolicy` | `matched-bin`, `stationary-face`, `correlated-face`, or `display-only-preview`. |
| `timeMapping` | Mapping from target time bins to source summary bins. |
| `faceMapping` | Mapping from target faces to source faces. |
| `selfSimilarityTransform` | Scale, face, time, velocity, polarity, path-resampling, wake-reconstruction, and correlation transform used to map the six outbound path streams into inbound replay streams. |
| `historyHidingPolicy` | Rule that prevents replayed inbound architrinos from preserving outbound same-record identity or retained outbound path history. |
| `pathSampling` | Histogram, moment, empirical-row, or optimization-selected sampling policy for inbound path seeds. |
| `wakeReconstructionPolicy` | Policy for reconstructing wake history from replayed inbound paths; not a stored wake-stream source. |
| `correlationPolicy` | `independent`, `time-correlated`, `face-correlated`, or `correlation-unavailable`. |
| `valueAuthority` | `reduced-model-boundary` or `display-only`. |
| `claimLevelDowngrade` | Required downgrade applied to target-run interpretation. |
| `errorBudgetId` | Replay error budget. |

The replay source cannot set `valueAuthority` to an authoritative retained-row status. A replayed boundary may contribute to reduced-model receiver acceleration only when the target run declares that policy. Boundary-generated inbound architrinos are new architrinos; their reconstructed wake history is derived from replayed face path statistics and the declared path index, and must not be presented as retained identity history.

## Validation Fixture

The first validation fixture is a three-stage comparison:

1. `reference_window_run` — run the native solver on a larger or higher-retention finite window to provide reference face path statistics and retained local rows.
2. `face_summary_extraction` — extract `borg-face-summary.v1` path rows from the reference run, using the declared `historyDepth`, `wakeHorizon`, path-index policy, and error budget.
3. `self_similar_replay_run` — run the target finite window with inbound boundary path rows sampled from `borg-face-replay-source.v1`, while retaining all above-floor local wake rows explicitly and reconstructing boundary wake background from replayed paths.

Required fixture records:

| Record | Required fields |
| --- | --- |
| `referenceWindowRun` | Run id, model contract, side length, field speed, history depth, wake horizon, time-bin width, retained path-row count, face-crossing coverage, path-index policy, error budget. |
| `faceSummarySet` | Summary-set id, source run id, six-face coverage, time-bin coverage, extraction status, summary row count, path-index status, error-budget status. |
| `replayRun` | Run id, replay source id, sampling seed, retained above-floor local wake-row count, replayed inbound architrino count, replayed inbound path count, wake-reconstruction status, value authority, claim-level downgrade. |
| `comparisonWindow` | Time range, central volume, receiver set, selected acceleration or wake-background channel, norm, tolerance, and excluded transient bins. |
| `validationResult` | $R_{\mathrm{face\ replay}}$, $R_{\mathrm{boundary\to central}}$, pass/fail status, first-failure code, and artifact ids. |

The validation residual is

$$
R_{\mathrm{face\ replay}}
=
\frac{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathrm{boundary}}
-
\mathbf a^{\mathrm{replay}}_{\mathrm{boundary}}
\right\|_{\mathcal W}
}{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathrm{boundary}}
\right\|_{\mathcal W}
+\varepsilon_0
},
$$

where $\mathcal W$ is the declared comparison window, receiver set, and norm.

The central-volume residual is

$$
R_{\mathrm{boundary\to central}}
=
\frac{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathcal C}
-
\mathbf a^{\mathrm{boundary}}_{\mathcal C}
\right\|_{\mathcal W_{\mathcal C}}
}{
\left\|
\mathbf a^{\mathrm{reference}}_{\mathcal C}
\right\|_{\mathcal W_{\mathcal C}}
+\varepsilon_0
}.
$$

This is the pass/fail quantity for the design question: whether the selected simulation scale makes face-boundary activity negligible for observations in the declared central volume.

## Pass/Fail Threshold

The first fixture uses declared tolerances $\tau_{\mathrm{self}}$, $\tau_{\mathrm{face}}$, and $\tau_{\mathcal C}$ supplied by the run error budget. A self-similar replay passes only when all of the following hold:

1. the transformed inbound face-path statistics are self-similar to the six-face outbound path statistics inside $\tau_{\mathrm{self}}$;
2. $R_{\mathrm{face\ replay}}\le \tau_{\mathrm{face}}$ after wake background is reconstructed from replayed paths;
3. $R_{\mathrm{boundary\to central}}\le \tau_{\mathcal C}$;
4. `face-crossing-coverage = complete` for the reference rows consumed by extraction.
5. `path-index-status = ready` for wake reconstruction from recorded and replayed paths.
6. `error-budget-status = within-budget` for extraction, path indexing, wake reconstruction, and replay.
7. above-floor local wake rows remain explicit retained rows in the replay run.
8. no selected branch row consumes replayed boundary input as same-record causal-root evidence.
9. correlation diagnostics do not report `correlation-unmodeled-above-budget`.
10. `history-hiding-status = passed`, so replayed inbound architrinos are new boundary-generated identities.

If the self-similarity residual is unavailable but the run can draw the replay visually, the replay is `display-only`. If central-volume residuals or history-hiding checks fail, the affected values are `fail-closed`.

The first-failure code must be one of:

| Code | Meaning |
| --- | --- |
| `self_similarity_residual_exceeded` | The transformed inbound face-path statistics are not self-similar to the outbound six-face path statistics inside $\tau_{\mathrm{self}}$. |
| `face_replay_residual_exceeded` | $R_{\mathrm{face\ replay}}>\tau_{\mathrm{face}}$. |
| `central_boundary_residual_exceeded` | $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$. |
| `missing_face_crossing_coverage` | The reference run lacks complete face-crossing rows. |
| `path_index_missing` | The run cannot reconstruct wake background because the required path index is missing. |
| `error_budget_exceeded` | Extraction or replay exceeds its declared budget. |
| `above_floor_row_replayed` | A local wake above `wakeFloor` was replaced by self-similar replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed boundary input as same-record evidence. |
| `correlation_unmodeled` | Correlation structure is detected but not represented in the replay policy. |
| `history_hiding_failed` | A replayed inbound architrino preserved outbound same-record identity or retained outbound path history. |
| `history_depth_insufficient` | $h$ is too short for the declared boundary study. |

A passing fixture authorizes only `reduced-model-boundary` value authority for the declared simulation envelope. It does not authorize proof-level claims, canonical breather closure, branch admissibility, or retained branch status.

## Implementation Handoff

The first implementation handoff should ask the native central solver bridge for:

1. outbound architrino face-crossing path rows;
2. per-face time-bin path summaries with path stream ids, path segment ids, face positions, velocities, polarity inventory, and correlation diagnostics;
3. a spatio-temporal, absolute-time, or optimization-backed path index for wake reconstruction;
4. self-similar replay-source sampling rows with deterministic seeds and history-hiding status;
5. explicit retained rows for all above-floor local wakes inside the active window;
6. wake-background reconstruction status from replayed inbound paths;
7. self-similarity, face-replay, and central-volume comparison residuals with first-failure codes.
