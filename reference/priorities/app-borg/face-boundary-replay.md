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

### First Time-Map Rule: Observed Face Input Only

The first `timeMapping` policy must start with benign face-input architrinos and their reconstructed wake patterns. It must not invent synthetic boundary input and then allow that input to influence an experiment. For this first policy, a replayed inbound architrino is admissible only when its sample can be traced to recorded outbound face-path summaries, the absolute-time face influence model, and the declared path-index policy.

The rule is:

1. source bins must come from recorded `borg-face-summary.v1` path rows or a face influence model derived from those rows;
2. target time bins may resample observed absolute-time bins, but they must not create unobserved time structure with experimental authority;
3. wake patterns must be reconstructed from sampled inbound paths through `wakeReconstructionPolicy`, not imported as dreamed-up wake rows;
4. every replayed inbound sample must carry traceability to source face summary ids, source time bins, path segment ids or path-stream ranges, and `faceInfluenceModelId`;
5. if traceability is missing, or if the time map requires an invented synthetic driver, the result is `display-only` or `fail-closed` for central-volume diagnostics.

Synthetic preview rows may exist only as explicitly labeled visualization material. They must not affect receiver acceleration, wake-background diagnostics, central-volume residuals, or any value presented as experimental output.

### Sampling Research Burden: Many-Scale Velocity

Sampling is the key open problem for the first face-boundary replay policy. The architrino velocity scale can span many orders of magnitude, so naive uniform sampling over velocity, time, or face bins may be too imprecise to represent both dense slow populations and rare fast populations. This is a research burden, not a settled fixture rule.

The first research pass should compare candidate techniques before any replayed boundary input receives experimental authority:

1. logarithmic velocity bins or other scale-aware velocity coordinates;
2. stratified sampling across velocity magnitude, polarity, face, and time bins;
3. importance sampling for rare high-velocity crossings that may dominate wake-background effects;
4. quantile sketches or streaming summaries that preserve tails without storing every path row in memory;
5. adaptive time bins tied to crossing density and wake-horizon sensitivity;
6. deterministic or low-discrepancy resampling so replay differences can be debugged against the same native source rows;
7. error-controlled moment matching for velocity, polarity, cross-face correlation, and central-volume residual contribution.

Until this research burden is measured, the replay source must report `velocitySamplingResearchStatus = research-open` and any affected central-volume value remains `display-only` or `fail-closed`. A future policy can promote a sampling technique only by declaring its velocity scale range, error budget, source traceability, and residual effect on $R_{\mathrm{boundary\to central}}$.

### Velocity-Scale Sampling Measurement Protocol v0

The first measurable protocol is `borg-velocity-sampling-protocol.v1`. Its job is to compare velocity-scale-aware sampling policies against the same native source rows before any replayed boundary input receives experimental authority. It is a measurement protocol, not a new solver and not a settled choice of sampling technique.

The protocol uses only observed native rows:

| Field | Meaning |
| --- | --- |
| `velocitySamplingProtocolId` | Stable protocol id. |
| `sourceRunId` | Native reference run that produced the path rows and face summaries. |
| `summarySetId` | `borg-face-summary.v1` set used as the source population. |
| `pathHistoryStreamIds` | Native path-history streams consumed by the sampling study. |
| `faceInfluenceModelIds` | Face influence models derived from observed path rows. |
| `velocityScaleRange` | Minimum positive speed, maximum speed, zero/near-zero bucket, units, and field-speed ratio range. |
| `numericChartPolicy` | `direction_log_magnitude`, `log_magnitude`, `signed_log_magnitude`, local-frame ratio chart, or declared equivalent chart from the native precision contract. |
| `candidateSamplingPolicyIds` | Candidate policy ids compared under the same source rows and seeds. |
| `samplingBudgetSchedule` | Sample counts or compression budgets tested per face, time bin, velocity stratum, and candidate policy. |
| `calibrationWindowIds` | Source bins used to tune candidate policies. |
| `holdoutWindowIds` | Source bins withheld until scoring. |
| `measurementSeedSet` | Deterministic seed set used for repeatability and variance measurement. |

The first candidate set should include:

1. `log-binned-baseline` — logarithmic speed bins with explicit zero/near-zero handling;
2. `stratified-log-velocity` — stratified samples across face, time bin, polarity, and logarithmic speed band;
3. `importance-sampled-tail` — boosted sampling for rare high-speed crossings and wake-sensitive bins;
4. `quantile-sketch-tail` — streaming quantile summaries that preserve velocity tails;
5. `adaptive-time-log-velocity` — time bins refined where crossing density or wake-horizon sensitivity is high;
6. `low-discrepancy-log-velocity` — deterministic low-discrepancy samples in the declared velocity chart;
7. `moment-matched-replay` — samples selected to match velocity, polarity, cross-face correlation, and central-residual moments.

The scoring row is `borg-velocity-sampling-result.v1`:

| Field | Meaning |
| --- | --- |
| `velocitySamplingResultId` | Stable result id. |
| `velocitySamplingProtocolId` | Protocol id being scored. |
| `candidateSamplingPolicyId` | Candidate policy under test. |
| `samplingBudget` | Budget point used for this result row. |
| `sourceTraceabilityStatus` | `passed`, `missing-source-row`, `missing-time-bin`, `missing-path-stream`, or `fail-closed`. |
| `velocityDistributionResidual` | Residual between full observed velocity distribution and sampled replay distribution. |
| `tailMassResidual` | Residual for rare high-speed and wake-sensitive tails. |
| `correlationResidual` | Residual for time, opposite-face, adjacent-face, polarity, and velocity-band correlations. |
| `seedVarianceResidual` | Replay variation across the deterministic seed set. |
| `faceReplayResidual` | $R_{\mathrm{face\ replay}}$ produced by this candidate when wake background is reconstructed from sampled paths. |
| `centralResidualContribution` | Candidate contribution to $R_{\mathrm{boundary\to central}}$. |
| `precisionPathStatus` | Native precision path and chart status for the candidate. |
| `holdoutStatus` | `passed`, `failed`, `not-measured`, or `fail-closed`. |
| `promotionStatus` | `research-open`, `candidate-policy`, `measured-within-budget`, `precision-insufficient`, or `fail-closed`. |

The v0 acceptance rule for `measured-within-budget` is:

1. source traceability passes for all consumed samples;
2. the candidate uses a declared numeric chart and precision path from the native contract;
3. calibration and holdout windows both pass;
4. `velocityDistributionResidual <= 2e-2`;
5. `tailMassResidual <= 5e-2`;
6. `correlationResidual <= 5e-2`;
7. `seedVarianceResidual <= 1e-2`;
8. $R_{\mathrm{face\ replay}}\le\tau_{\mathrm{face}}$ and $R_{\mathrm{boundary\to central}}\le\tau_{\mathcal C}$ when the candidate is used for replay-affected diagnostics.

If any required score is missing, the policy remains `research-open` or `display-only`. If a candidate fails the holdout window, loses traceability, or requires a chart that cannot represent the declared velocity scale range, the candidate is `precision-insufficient` or `fail-closed`.

The first policy target for `benign noise` is not small wake magnitude by itself. It is central-volume invisibility inside the declared residual budget. A replay is benign for the declared envelope only when reconstructed inbound paths and their reconstructed wakes do not move central-volume diagnostics outside tolerance.

For the first fixture, `benign noise` means the self-similar replay does not introduce a central-volume signal above the declared boundary-error budget:

$$
R_{\mathrm{boundary\to central}}
\le
\tau_{\mathcal C}.
$$

If the residual passes, the replay has only `reduced-model-boundary` authority for the declared envelope. If it is not measured, lacks a reference, or exceeds tolerance, the replay is `display-only` or `fail-closed` for central-volume interpretation. This applies whether the run stages a deep time-space collision, a nucleon-layout experiment, or another scale setting; self-similarity is a replay-policy requirement, not a proof that the underlying system is scale invariant.

## Absolute-Time Face Influence Model

The first self-similar transform should build a model of the outgoing paths and reconstruct the face wake/influence field by absolute time. The face record stays path-only, but the replay sampler may derive a face influence model from those paths when it needs wake-background or acceleration-effect statistics.

At a face point $\mathbf u\in F$ and absolute time $t$, the candidate face influence model is the accumulated set of vector-potential contributions whose emission points can reach that face point at that time:

$$
\mathbf A_F(\mathbf u,t)
=
\sum_i
\int_{t-h}^{t}
\mathbf K_F
\left(
\mathbf u,t;\ \mathbf x_i(\tau),\mathbf v_i(\tau),q_i
\right)
\delta\!\left(
t-\tau-\frac{\|\mathbf u-\mathbf x_i(\tau)\|}{c_f}
\right)
d\tau.
$$

Here $\mathbf x_i(\tau)$, $\mathbf v_i(\tau)$, and $q_i$ come from retained path history, $h$ is `historyDepth`, $c_f$ is `fieldSpeed`, and $\mathbf K_F$ is the run-declared vector-potential contribution kernel. This equation is a candidate bookkeeping target for the Borg app, not a new solver or a proof-level field equation.

### Path-Only Face Influence Model

The face influence artifact must be path-based. It is uneconomical to store authoritative projections of the path onto every face point. The stored source of authority is the path history, path index, kernel id, and a compact model of the distribution pattern produced by the superposition of all path-derived vector-potential contributions at face points.

In compact form, the model is:

$$
\mathcal M_F
=
\mathsf C_F
\left[
\sum_i
\int
\mathbf K_F
\left(
\mathbf u,t;\ \mathbf x_i(\tau),\mathbf v_i(\tau),q_i
\right)
d\tau
\right],
$$

where $\mathsf C_F$ is the declared compression, sampling, basis, or sketch policy for the face distribution. $\mathcal M_F$ is not a retained wake stream and not a new solver. It is a path-derived replay model whose source rows remain the native path-history streams.

The first schema is `borg-face-influence-model.v1`:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `borg-face-influence-model.v1`. |
| `faceInfluenceModelId` | Stable model id. |
| `sourceRunId` | Native source run that emitted the path rows. |
| `sourcePathHistoryStreamIds` | Path-history streams consumed by the model. |
| `pathIndexId` | Index used to query contributing path segments by absolute time and face point. |
| `kernelId` | Declared vector-potential contribution kernel. |
| `faceCoordinateChart` | Coordinate chart for evaluating points on a source or target face. |
| `timeBinIds` | Absolute-time bins covered by the model. |
| `evaluationPointPolicy` | Grid, quadrature, basis, adaptive sample, or query-on-demand policy for face points. |
| `superpositionPolicy` | Native exact evaluation, sampled evaluation, compressed basis, empirical distribution, or display-only approximation. |
| `distributionModelType` | Basis coefficients, quantile sketch, mixture samples, low-rank representation, empirical rows, or declared equivalent. |
| `compressionBudget` | Row, byte, sample, or coefficient budget for the model. |
| `errorBudgetId` | Error budget carried into face replay and central-volume residuals. |
| `projectionCacheStatus` | `absent`, `display-cache-only`, or `not-authoritative`. |
| `portabilityStatus` | `same-face-only`, `mapped-face-ready`, `any-face-ready`, `display-only`, or `fail-closed`. |
| `valueAuthority` | `path-derived-model`, `display-only`, or `fail-closed`. |

Per-point face projections may be cached for rendering or debugging, but they must not become source evidence. Replay on another face must consume the path-derived model through `faceMapping`, the target face coordinate chart, and the declared error budget. If the model cannot be mapped to a target face without exceeding budget, replay is `display-only` or `fail-closed`.

## Six-Face Boundary Noise Policy v1

The first concrete six-face policy is `borg-six-face-boundary-noise-policy.v1`. Its job is to turn observed outbound path material from all six cube faces into boundary-generated inbound path seeds while preserving the path-only authority rule. It does not store or replay per-point face projections as evidence, does not create a new solver, and does not allow synthetic input to affect experimental diagnostics.

The policy treats the six faces as one observed boundary population with per-face labels, face-local coordinate charts, and time-bin structure. A target face may draw from the pooled six-face source population only through declared face maps and error budgets. The policy is self-similar in the reduced-model sense: the inbound boundary population must remain statistically similar to the observed outbound six-face population after history hiding, coordinate mapping, velocity sampling, polarity sampling, and wake reconstruction from paths.

The policy row is:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `borg-six-face-boundary-noise-policy.v1`. |
| `sixFaceBoundaryNoisePolicyId` | Stable policy id. |
| `sourceRunId` | Native source run that produced the outbound path rows. |
| `summarySetId` | Six-face `borg-face-summary.v1` set consumed by the policy. |
| `faceCoverageStatus` | `six-face-complete`, `missing-face`, `missing-time-bin`, or `fail-closed`. |
| `faceInfluenceModelIds` | Path-derived `borg-face-influence-model.v1` rows consumed by the policy. |
| `faceInfluenceModelAuthority` | `path-derived-model`, `display-only`, `missing-model`, or `fail-closed`. |
| `sourcePopulationPolicy` | `observed-six-face-pool`; no synthetic source population is allowed for value authority. |
| `targetFaceSet` | Target face ids receiving boundary-generated inbound path seeds. |
| `faceSourceMixture` | Per-target-face weights over observed source faces and time bins. |
| `faceMappingPolicy` | Face-local coordinate and orientation mapping from source face charts to target face charts. |
| `timeMappingPolicyId` | Observed-bin time map used by the policy. |
| `timeMapSourceStatus` | `observed-face-input`, `observed-bin-resample`, `untraceable-source`, or `fail-closed-synthetic-input`. |
| `velocitySamplingResultId` | `borg-velocity-sampling-result.v1` row used for velocity-scale sampling. |
| `polaritySamplingPolicy` | Policy preserving electrino/positrino inventory and polarity correlations. |
| `pathSeedPolicy` | Policy for generating inbound path seeds from observed face summaries and face influence models. |
| `historyHidingPolicy` | Rule assigning new inbound architrino ids and stripping outbound same-record identity. |
| `wakeReconstructionPolicy` | Reconstruct wakes from boundary-generated inbound paths through the declared path index. |
| `correlationPolicy` | Time, opposite-face, adjacent-face, polarity, velocity-band, and recurrence correlation policy. |
| `projectionCacheAuthority` | Must be `not-authoritative` when projection caches exist. |
| `boundaryReplayDecisionPolicyId` | Decision policy used for pass, display-only, or fail-closed status. |
| `benignNoiseStatus` | `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `valueAuthority` | `reduced-model-boundary`, `display-only`, or `fail-closed`. |
| `firstFailureCode` | First fail-closed code, or null when the policy passes for the declared envelope. |

The v1 policy steps are:

1. require complete six-face source coverage for the declared source window, or fail closed for replay authority;
2. consume only native path streams, face summaries, path indices, and `borg-face-influence-model.v1` rows;
3. build target-face inbound path seeds from the observed six-face pool using declared source-face weights, source time bins, target face charts, and deterministic replay seeds;
4. preserve measured source correlations when they are inside budget, and fail closed when a detected correlation is above budget but unavailable to the replay policy;
5. preserve electrino/positrino inventory, velocity-scale distribution, rare high-speed tails, and face/time-bin structure according to the measured velocity-sampling result;
6. assign new inbound architrino identities with `historyHidingPolicy`; source traceability is retained for audit, but same-record outbound identity is not retained;
7. reconstruct wake-background effects from the generated inbound paths through the declared path index and wake reconstruction policy;
8. evaluate self-similarity, face replay, and central-volume residuals before any replay-affected diagnostic receives value authority.

The first `faceSourceMixture` default is `six-face-uniform-observed`: every target face draws from all six observed source faces with equal starting weights, then records measured deviations and correlation errors. A later policy may use empirical weights by face, time bin, polarity, or velocity band only after the corresponding residuals are measured. If the uniform policy fails the declared residual budget, the run remains display-only or fail-closed; the app must not tune an unmeasured synthetic driver to force a pass.

`benign noise` means `measured-reduced-pass` for the declared simulation envelope. It does not mean visually random input, small wake magnitude, or invented environmental texture. The policy is benign only when source traceability, path-derived face influence models, velocity sampling, history hiding, wake reconstruction, and $R_{\mathrm{boundary\to central}}$ all pass under the declared error budget.

The hard computational part is that each face is pierced by many such vector-potential contributions from many emission points. The first policy should therefore avoid storing those contributions as primitive face rows. It should:

1. use an `absolute-time-index` or equivalent optimized path index to find path segments that can contribute to each face time bin;
2. aggregate or sample the induced face influence model into bounded face-path statistics;
3. draw inbound path seeds from that sampled model through `selfSimilarityTransform`;
4. reconstruct wake-background effects from replayed paths only after `historyHidingPolicy` assigns new inbound identities;
5. carry the approximation error into $\tau_{\mathrm{self}}$, $\tau_{\mathrm{face}}$, and $\tau_{\mathcal C}$ rather than silently promoting the replay to retained evidence.

## Envelope Inputs

Every face-boundary replay fixture must declare the simulation envelope before running:

| Field | Meaning | Units or value type |
| --- | --- | --- |
| `runId` | Source finite-window run identifier. | string |
| `modelContractId` | EOM solver model contract. | string |
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
| `faceInfluenceModelId` | Absolute-time face influence model used to sample reconstructed wake-background or acceleration-effect statistics. |
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
| `sixFaceBoundaryNoisePolicyId` | `borg-six-face-boundary-noise-policy.v1` id used to generate this replay source. |
| `samplingSeed` | Declared seed for self-similar replay. |
| `samplingPolicy` | `matched-bin`, `stationary-face`, `correlated-face`, or `display-only-preview`. |
| `timeMapping` | Mapping from target time bins to observed source summary bins; the first policy is observed face-input only. |
| `timeMapSourceStatus` | `observed-face-input`, `observed-bin-resample`, `display-only-synthetic-preview`, `untraceable-source`, or `fail-closed-synthetic-input`. |
| `inputTraceabilityRowIds` | Rows linking replayed inbound samples to source face summaries, source time bins, path segments or path streams, and `faceInfluenceModelId`. |
| `faceMapping` | Mapping from target faces to source faces. |
| `faceSourceMixture` | Per-target-face source-face and time-bin weights consumed by the replay source. |
| `faceInfluenceModelIds` | Path-derived `borg-face-influence-model.v1` ids used to bottle the face superposition pattern. |
| `faceInfluenceModelReplayPolicy` | `same-face`, `mapped-face`, `any-face`, `display-only`, or `fail-closed`. |
| `velocityScaleRange` | Declared minimum and maximum sampled velocity magnitudes, units, and normalization chart. |
| `velocitySamplingProtocolId` | `borg-velocity-sampling-protocol.v1` id used to measure candidate policies. |
| `velocitySamplingResultId` | `borg-velocity-sampling-result.v1` id for the selected replay policy. |
| `velocitySamplingPolicy` | `research-open`, `log-binned`, `stratified`, `importance-sampled`, `quantile-sketch`, `adaptive-time-binned`, `low-discrepancy`, `moment-matched`, or `display-only`. |
| `velocitySamplingErrorBudgetId` | Error budget for velocity-scale sampling and replay contribution to central-volume residuals. |
| `velocitySamplingResearchStatus` | `research-open`, `candidate-policy`, `measured-within-budget`, `precision-insufficient`, or `fail-closed`. |
| `selfSimilarityTransform` | Scale, face, time, velocity, polarity, path-resampling, wake-reconstruction, and correlation transform used to map the six outbound path streams into inbound replay streams. |
| `historyHidingPolicy` | Rule that prevents replayed inbound architrinos from preserving outbound same-record identity or retained outbound path history. |
| `absoluteTimeInfluenceSampling` | Sampling policy for the face influence model $\mathbf A_F(\mathbf u,t)$ built from retained paths and absolute face time bins. |
| `pathSampling` | Histogram, moment, empirical-row, or optimization-selected sampling policy for inbound path seeds. |
| `wakeReconstructionPolicy` | Policy for reconstructing wake history from replayed inbound paths; not a stored wake-stream source. |
| `correlationPolicy` | `independent`, `time-correlated`, `face-correlated`, or `correlation-unavailable`. |
| `valueAuthority` | `reduced-model-boundary` or `display-only`. |
| `benignNoiseStatus` | `measured-reduced-pass`, `display-only-insufficient-evidence`, `fail-closed-residual`, `fail-closed-contamination`, or `fail-closed-missing-contract`. |
| `claimLevelDowngrade` | Required downgrade applied to target-run interpretation. |
| `errorBudgetId` | Replay error budget. |

The replay source cannot set `valueAuthority` to an authoritative retained-row status. A replayed boundary may contribute to reduced-model receiver acceleration only when the target run declares that policy. Boundary-generated inbound architrinos are new architrinos; their reconstructed wake history is derived from replayed face path statistics and the declared path index, and must not be presented as retained identity history.

## Validation Fixture

The first validation fixture is a three-stage comparison:

1. `reference_window_run` — run the EOM solver on a larger or higher-retention finite window to provide reference face path statistics and retained local rows.
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

## Boundary Replay Decision Policy

The first Borg app decision policy should be conservative and explicit. It is not enough to compute a residual; the manifest must say whether the affected value is allowed to pass, must stay display-only, or must fail closed.

The v0 default tolerances are:

| Tolerance | Default | Meaning |
| --- | --- | --- |
| $\tau_{\mathrm{self}}$ | $5\times10^{-2}$ | Maximum distribution-level self-similarity residual between outbound six-face path statistics and transformed inbound path statistics. |
| $\tau_{\mathrm{face}}$ | $10^{-2}$ | Maximum replay residual for reconstructed face-boundary acceleration or wake-background contribution. |
| $\tau_{\mathcal C}$ | $10^{-3}$ | Maximum residual allowed in the displayed central volume. |

These numbers are design defaults for the first native-backed fixture, not proof-level constants. A run may tighten or replace them only by declaring its tolerance policy, comparison norm, $\varepsilon_0$ floor, source rows, and residual artifacts.

The v0 decision ladder is:

| Decision step | Pass condition | Otherwise |
| --- | --- | --- |
| Native contract | Native EOM solver contract, model contract id, units, and central volume are present. | `fail-closed` with `native_solver_status_missing`, `manifest_schema_missing_required_field`, or `missing_central_volume`. |
| Strict buffer | $b_{\mathrm{face}}(\mathcal C)\ge\max(c_fh,\ v_{\max}T_{\mathcal C})$. | Continue to measured boundary residuals. |
| Observed input | Replay rows trace to observed face summaries, source bins, path rows, and the face influence model. | `display-only` if visual only; `fail-closed` if used for experimental diagnostics. |
| Velocity sampling | Velocity sampling is measured inside budget for the declared velocity scale range. | `display-only` or `fail-closed` for replay-affected central diagnostics. |
| Self-similarity | Self-similarity residual is measured and $\le\tau_{\mathrm{self}}$. | `display-only` if unmeasured; `fail-closed` if measured above tolerance. |
| Face replay | $R_{\mathrm{face\ replay}}$ is measured and $\le\tau_{\mathrm{face}}$. | `display-only` if unmeasured; `fail-closed` if measured above tolerance. |
| Central residual | $R_{\mathrm{boundary\to central}}$ is measured and $\le\tau_{\mathcal C}$. | `fail-closed` for central-volume values. |

The allowed decision statuses are:

| Status | Meaning |
| --- | --- |
| `strict-buffer-pass` | The central volume is causally protected for the declared interval by the buffer inequality. |
| `measured-reduced-pass` | All required replay, sampling, traceability, and residual checks pass; authority remains `reduced-model-boundary`. |
| `display-only-insufficient-evidence` | The app may render the replay, but one or more required checks are unmeasured or missing. |
| `fail-closed-residual` | A required residual exceeds tolerance or a required central residual is missing. |
| `fail-closed-contamination` | Synthetic input, branch evidence contamination, retained identity leakage, or above-floor row replacement is detected. |
| `fail-closed-missing-contract` | The native model contract, manifest field, central volume, units, or tolerance policy is missing. |

Display-only is allowed only when the app withholds experimental value authority. If a missing or unmeasured value is consumed by central-volume diagnostics, receiver acceleration, wake-background diagnostics, or retained evidence, the decision must be fail-closed.

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
11. `timeMapSourceStatus` is `observed-face-input` or `observed-bin-resample`, and replayed inbound rows carry source traceability.
12. `velocitySamplingResearchStatus = measured-within-budget` for any replayed boundary input that affects experimental diagnostics.

If the self-similarity residual is unavailable but the run can draw the replay visually, the replay is `display-only`. If central-volume residuals or history-hiding checks fail, the affected values are `fail-closed`.

The first-failure code must be one of:

| Code | Meaning |
| --- | --- |
| `self_similarity_residual_exceeded` | The transformed inbound face-path statistics are not self-similar to the outbound six-face path statistics inside $\tau_{\mathrm{self}}$. |
| `face_replay_residual_exceeded` | $R_{\mathrm{face\ replay}}>\tau_{\mathrm{face}}$. |
| `central_boundary_residual_exceeded` | $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$. |
| `missing_face_crossing_coverage` | The reference run lacks complete face-crossing rows. |
| `path_index_missing` | The run cannot reconstruct wake background because the required path index is missing. |
| `residual_tolerance_policy_missing` | The run lacks $\tau_{\mathrm{self}}$, $\tau_{\mathrm{face}}$, $\tau_{\mathcal C}$, comparison norm, or $\varepsilon_0$. |
| `required_residual_unmeasured` | A required residual is missing while a central-volume or replay diagnostic asks for value authority. |
| `error_budget_exceeded` | Extraction or replay exceeds its declared budget. |
| `above_floor_row_replayed` | A local wake above `wakeFloor` was replaced by self-similar replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed boundary input as same-record evidence. |
| `correlation_unmodeled` | Correlation structure is detected but not represented in the replay policy. |
| `history_hiding_failed` | A replayed inbound architrino preserved outbound same-record identity or retained outbound path history. |
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
| `history_depth_insufficient` | $h$ is too short for the declared boundary study. |

A passing fixture authorizes only `reduced-model-boundary` value authority for the declared simulation envelope. It does not authorize proof-level claims, canonical breather closure, branch admissibility, or retained branch status.

## Implementation Handoff

The first implementation handoff should ask the native EOM solver for:

1. outbound architrino face-crossing path rows;
2. per-face time-bin path summaries with path stream ids, path segment ids, face positions, velocities, polarity inventory, and correlation diagnostics;
3. an absolute-time face influence model, or a declared spatio-temporal/optimization-backed equivalent, for reconstructing wake-background effects from paths;
4. self-similar replay-source sampling rows with deterministic seeds, observed-face time-map traceability, and history-hiding status;
5. explicit retained rows for all above-floor local wakes inside the active window;
6. wake-background reconstruction status from replayed inbound paths;
7. self-similarity, face-replay, and central-volume comparison residuals with first-failure codes.
