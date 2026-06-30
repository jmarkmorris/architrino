# Face-Boundary Replay Schema

## Purpose

This packet defines the first outbound/inbound face-boundary summary schema and validation fixture for the boundary-window app. The goal is to characterize architrino and wake activity crossing the six faces of the simulation-window cube, then replay a statistically similar inbound boundary population with reconstructed wake history only when the run declares that approximation inside its simulation envelope and measures its effect on the central volume.

The schema is priority-design material. It is not accepted proof evidence, and it does not replace retained wake rows, causal-root rows, retained path-history rows, or same-record branch evidence.

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

The local-window regime for central-volume interpretation is declared when $b_{\mathrm{face}}(\mathcal C)\ge\max(c_fh,\ v_{\max}T_{\mathcal C})$. The face-boundary regime is declared when outbound architrino or wake crossings at the outer computed faces can materially affect the central volume. Face-boundary replay is meaningful only after the run declares the boundary approximation, value authority, central-volume observation region, buffer margin, and error budget.

## Face Summary Schema

An outbound face summary row records aggregate activity crossing one face during one time bin:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `boundary-window-face-summary.v1`. |
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
| `outboundWakeCount` | Number of retained or candidate wake crossings assigned to the face bin. |
| `resolvedWakeCount` | Count above the declared floor. |
| `subthresholdWakeCount` | Count below the declared floor and eligible for background/noise aggregation. |
| `architrinoVelocityBins` | Histogram or basis coefficients for outbound architrino velocity. |
| `architrinoPolarityBins` | Counts by electrino/positrino inventory crossing this face. |
| `wakeStrengthBins` | Histogram of wake strength or acceleration contribution magnitudes. |
| `wakeDirectionBins` | Histogram or basis coefficients for outward wake direction distribution. |
| `meanContribution` | Mean background acceleration or wake-strength vector contribution for the bin. |
| `covarianceContribution` | Covariance of the vector contribution for the bin. |
| `aggregateMagnitude` | Aggregate background/noise magnitude for the bin. |
| `correlationSummary` | Time, opposite-face, adjacent-face, and recurrence diagnostics when measured. |
| `errorBudgetId` | Error budget used to extract the summary. |
| `extractionStatus` | `face-summary-ready`, `insufficient-history-depth`, `missing-face-crossing-rows`, `error-budget-exceeded`, or `display-only`. |
| `claimLevel` | `boundary-background-diagnostic` unless a stricter fail-closed status applies. |

The compact mathematical object represented by the row is

$$
\mathcal B_F(t,\Delta t)
=
\left(
N_F^{\mathrm{arch}},
N_F^{\mathrm{wake}},
\mu_F,
\Sigma_F,
H_F^{\mathrm{arch}},
H_F^{\mathrm{wake}},
C_F,
\mathcal E_F
\right),
$$

where $\mathcal E_F$ is the extraction error-budget and authority state.

## Replay Source Schema

A replay source row declares how one or more face summaries are sampled into a later run:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `boundary-window-face-replay-source.v1`. |
| `replaySourceId` | Stable replay-source identifier. |
| `summarySetId` | Identifier for the consumed face-summary set. |
| `targetRunId` | Run id receiving the replayed boundary input. |
| `samplingSeed` | Declared seed for statistical replay. |
| `samplingPolicy` | `matched-bin`, `stationary-face`, `correlated-face`, or `display-only-preview`. |
| `timeMapping` | Mapping from target time bins to source summary bins. |
| `faceMapping` | Mapping from target faces to source faces. |
| `architrinoSampling` | Histogram, moment, or empirical-row sampling policy for inbound architrinos. |
| `wakeSampling` | Histogram, moment, or empirical-row sampling policy for reconstructed inbound wake history and wake background. |
| `correlationPolicy` | `independent`, `time-correlated`, `face-correlated`, or `correlation-unavailable`. |
| `valueAuthority` | `reduced-model-boundary` or `display-only`. |
| `claimLevelDowngrade` | Required downgrade applied to target-run interpretation. |
| `errorBudgetId` | Replay error budget. |

The replay source cannot set `valueAuthority` to an authoritative retained-row status. A replayed boundary may contribute to reduced-model receiver acceleration only when the target run declares that policy. Boundary-generated inbound architrinos are new architrinos; their reconstructed wake history is sampled from face statistics and must not be presented as retained identity history.

## Validation Fixture

The first validation fixture is a three-stage comparison:

1. `reference_window_run` — run the native solver on a larger or higher-retention finite window to provide reference face statistics and retained local rows.
2. `face_summary_extraction` — extract `boundary-window-face-summary.v1` rows from the reference run, using the declared `wakeFloor`, `historyDepth`, `wakeHorizon`, and error budget.
3. `statistical_replay_run` — run the target finite window with inbound boundary rows sampled from `boundary-window-face-replay-source.v1`, while retaining all above-floor local wake rows explicitly.

Required fixture records:

| Record | Required fields |
| --- | --- |
| `referenceWindowRun` | Run id, model contract, side length, field speed, history depth, wake horizon, time-bin width, retained wake-row count, face-crossing coverage, error budget. |
| `faceSummarySet` | Summary-set id, source run id, six-face coverage, time-bin coverage, extraction status, summary row count, aggregate subthreshold count, error-budget status. |
| `replayRun` | Run id, replay source id, sampling seed, retained above-floor wake-row count, replayed inbound architrino count, replayed reconstructed wake-history count, replayed wake-background count, value authority, claim-level downgrade. |
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

The first fixture uses a declared tolerance $\tau_{\mathrm{face}}$ supplied by the run error budget. A statistical replay passes only when all of the following hold:

1. $R_{\mathrm{face\ replay}}\le \tau_{\mathrm{face}}$.
2. $R_{\mathrm{boundary\to central}}\le \tau_{\mathcal C}$.
3. `face-crossing-coverage = complete` for the reference rows consumed by extraction.
4. `error-budget-status = within-budget` for extraction and replay.
5. Above-floor local wake rows remain explicit retained rows in the replay run.
6. No selected branch row consumes replayed boundary input as same-record causal-root evidence.
7. Correlation diagnostics do not report `correlation-unmodeled-above-budget`.

The first-failure code must be one of:

| Code | Meaning |
| --- | --- |
| `face_replay_residual_exceeded` | $R_{\mathrm{face\ replay}}>\tau_{\mathrm{face}}$. |
| `central_boundary_residual_exceeded` | $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$. |
| `missing_face_crossing_coverage` | The reference run lacks complete face-crossing rows. |
| `error_budget_exceeded` | Extraction or replay exceeds its declared budget. |
| `above_floor_row_replayed` | A local wake above `wakeFloor` was replaced by statistical replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed boundary input as same-record evidence. |
| `correlation_unmodeled` | Correlation structure is detected but not represented in the replay policy. |
| `history_depth_insufficient` | $h$ is too short for the declared boundary study. |

A passing fixture authorizes only `reduced-model-boundary` value authority for the declared simulation envelope. It does not authorize proof-level claims, canonical breather closure, branch admissibility, or retained branch status.

## Implementation Handoff

The first implementation handoff should ask the native central solver bridge for:

1. outbound architrino face-crossing rows;
2. outbound wake face-crossing rows;
3. per-face time-bin aggregation over subthreshold wake rows;
4. explicit retained rows for all above-floor local wakes;
5. replay-source sampling rows with deterministic seeds;
6. comparison-window residuals and first-failure codes.
