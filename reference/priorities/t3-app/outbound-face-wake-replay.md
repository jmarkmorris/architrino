# Outbound Face Wake Replay Schema

## Purpose

This packet defines the first outbound-face wake summary schema and validation fixture for the T3 app. The goal is to characterize wake activity crossing the six faces of the T3 fundamental-domain cube, then replay a statistically similar background/noise field only when the run declares that approximation inside its simulation envelope.

The schema is priority-design material. It is not accepted proof evidence, and it does not replace retained wake rows, winding labels, causal-root rows, or same-record branch evidence.

## Envelope Inputs

Every outbound-face replay fixture must declare the simulation envelope before running:

| Field | Meaning | Units or value type |
| --- | --- | --- |
| `runId` | Source explicit-wrap run identifier. | string |
| `modelContractId` | Native solver model contract. | string |
| `sideLength` | T3 fundamental-domain side length $L$. | length |
| `fieldSpeed` | Causal propagation speed $c_f$. | length / time |
| `historyDepth` | Active retained causal-history window $h$. | time |
| `wakeHorizon` | Maximum represented wake travel distance $c_f h$. | length |
| `timeBinWidth` | Face-summary bin width $\Delta t$. | time |
| `wakeFloor` | Declared floor below which individual wakes route to background/noise rows. | acceleration or wake-strength unit named by the model contract |
| `errorBudgetId` | Error-budget declaration consumed by extraction and replay. | string |
| `valueAuthority` | Authority status for the fixture. | `explicit-wrap`, `reduced-model-background`, or `display-only` |

The local-sandbox regime is declared when $c_f h \ll L$. The wrap-aware regime is declared when $c_f h$ is comparable to or larger than $L$. Outbound-face replay is only meaningful in wrap-aware or boundary-study runs; local-sandbox runs may still emit zero-count or diagnostic-only face summaries.

## Face Summary Schema

An outbound face summary row records the aggregate activity crossing one face during one time bin:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `t3-outbound-face-summary.v1`. |
| `summaryId` | Stable row identifier. |
| `sourceRunId` | Explicit-wrap source run id. |
| `faceId` | One of `xMinus`, `xPlus`, `yMinus`, `yPlus`, `zMinus`, `zPlus`. |
| `timeStart` | Inclusive time-bin start. |
| `timeEnd` | Exclusive time-bin end. |
| `timeBinWidth` | Time-bin width $\Delta t$. |
| `sideLength` | T3 side length $L$ used by the source run. |
| `historyDepth` | Active history depth $h$. |
| `wakeHorizon` | $c_f h$. |
| `wakeFloor` | Floor used to classify subthreshold rows. |
| `outboundWakeCount` | Number of retained or candidate wake crossings assigned to the face bin. |
| `resolvedWakeCount` | Count above the declared floor. |
| `subthresholdWakeCount` | Count below the declared floor and eligible for background/noise aggregation. |
| `strengthBins` | Histogram of wake strength or acceleration contribution magnitudes. |
| `directionBins` | Histogram or basis coefficients for outward direction distribution. |
| `windingBins` | Counts by winding vector or winding-vector class. |
| `meanContribution` | Mean background acceleration or wake-strength vector contribution for the bin. |
| `covarianceContribution` | Covariance of the vector contribution for the bin. |
| `aggregateMagnitude` | Aggregate background/noise magnitude for the bin. |
| `correlationSummary` | Time, opposite-face, adjacent-face, and winding recurrence diagnostics when measured. |
| `errorBudgetId` | Error budget used to extract the summary. |
| `extractionStatus` | `face-summary-ready`, `insufficient-history-depth`, `missing-winding-labels`, `error-budget-exceeded`, or `display-only`. |
| `claimLevel` | `background-noise-diagnostic` unless a stricter fail-closed status applies. |

The compact mathematical object represented by the row is

$$
\mathcal B_F(t,\Delta t)
=
\left(
N_F,
\mu_F,
\Sigma_F,
H_F^{\mathrm{strength}},
H_F^{\mathrm{direction}},
H_F^{\mathrm{winding}},
C_F,
\mathcal E_F
\right),
$$

where $\mathcal E_F$ is the extraction error-budget and authority state.

## Replay Source Schema

A replay source row declares how one or more face summaries are sampled into a later run:

| Field | Meaning |
| --- | --- |
| `schema` | Literal `t3-face-background-replay-source.v1`. |
| `replaySourceId` | Stable replay-source identifier. |
| `summarySetId` | Identifier for the consumed face-summary set. |
| `targetRunId` | Run id receiving the replayed background. |
| `samplingSeed` | Declared seed for statistical replay. |
| `samplingPolicy` | `matched-bin`, `stationary-face`, `wrapped-phase-binned`, or `display-only-preview`. |
| `timeMapping` | Mapping from target time bins to source summary bins. |
| `faceMapping` | Mapping from target faces to source faces. |
| `strengthSampling` | Histogram, moment, or empirical-row sampling policy. |
| `directionSampling` | Direction-bin or covariance sampling policy. |
| `windingSampling` | Winding-bin sampling policy. |
| `correlationPolicy` | `independent`, `time-correlated`, `face-correlated`, or `correlation-unavailable`. |
| `valueAuthority` | `reduced-model-background` or `display-only`. |
| `claimLevelDowngrade` | Required downgrade applied to target-run interpretation. |
| `errorBudgetId` | Replay error budget. |

The replay source cannot set `valueAuthority` to an authoritative retained-row status. A replayed background may contribute to reduced-model receiver acceleration only when the target run declares that policy.

## Validation Fixture

The first validation fixture is a three-run comparison:

1. `explicit_wrap_reference` — run the native T3 solver with retained wake rows, winding labels, and no face replay. This run supplies the reference background contribution.
2. `face_summary_extraction` — extract `t3-outbound-face-summary.v1` rows from the explicit-wrap run, using the declared `wakeFloor`, `historyDepth`, `wakeHorizon`, and error budget.
3. `statistical_replay_run` — run the same envelope with subthreshold face background sampled from `t3-face-background-replay-source.v1`, while retaining all above-floor wake rows explicitly.

Required fixture records:

| Record | Required fields |
| --- | --- |
| `explicitWrapRun` | Run id, model contract, side length, field speed, history depth, wake horizon, time-bin width, retained wake-row count, winding-label coverage, error budget. |
| `faceSummarySet` | Summary-set id, source run id, six-face coverage, time-bin coverage, extraction status, summary row count, aggregate subthreshold count, error-budget status. |
| `replayRun` | Run id, replay source id, sampling seed, retained above-floor wake-row count, replayed background count, value authority, claim-level downgrade. |
| `comparisonWindow` | Time range, receiver set, selected acceleration or wake-background channel, norm, tolerance, and excluded transient bins. |
| `validationResult` | $R_{\mathrm{face\ replay}}$, pass/fail status, first-failure code, and artifact ids. |

The validation residual is

$$
R_{\mathrm{face\ replay}}
=
\frac{
\left\|
\mathbf a^{\mathrm{explicit}}_{\mathrm{background}}
-
\mathbf a^{\mathrm{replay}}_{\mathrm{background}}
\right\|_{\mathcal W}
}{
\left\|
\mathbf a^{\mathrm{explicit}}_{\mathrm{background}}
\right\|_{\mathcal W}
+\varepsilon_0
},
$$

where $\mathcal W$ is the declared comparison window, receiver set, and norm.

## Pass/Fail Threshold

The first fixture uses a declared tolerance $\tau_{\mathrm{face}}$ supplied by the run error budget. A statistical replay passes only when all of the following hold:

1. $R_{\mathrm{face\ replay}}\le \tau_{\mathrm{face}}$.
2. `winding-label-coverage = complete` for the explicit-wrap reference rows consumed by extraction.
3. `error-budget-status = within-budget` for extraction and replay.
4. Above-floor wake rows remain explicit retained rows in the replay run.
5. No selected branch row consumes replayed background as same-record causal-root evidence.
6. Correlation diagnostics do not report `phase-lock-detected` or `correlation-unmodeled-above-budget`.

The first-failure code must be one of:

| Code | Meaning |
| --- | --- |
| `face_replay_residual_exceeded` | $R_{\mathrm{face\ replay}}>\tau_{\mathrm{face}}$. |
| `missing_winding_label_coverage` | The explicit-wrap reference lacks complete winding labels. |
| `error_budget_exceeded` | Extraction or replay exceeds its declared budget. |
| `above_floor_row_replayed` | A wake above `wakeFloor` was replaced by statistical replay. |
| `branch_evidence_contaminated` | A retained branch row used replayed background as same-record evidence. |
| `correlation_unmodeled` | Correlation structure is detected but not represented in the replay policy. |
| `history_depth_insufficient` | $h$ is too short for the declared wrap or boundary study. |

A passing fixture authorizes only `reduced-model-background` value authority for the declared simulation envelope. It does not authorize proof-level claims, canonical breather closure, branch admissibility, or retained branch status.

## Implementation Handoff

The first implementation handoff should ask the native central solver bridge for:

1. retained wake rows with face crossing classification;
2. winding vectors for every wrap-aware retained row;
3. per-face time-bin aggregation over subthreshold wake rows;
4. explicit retained rows for all above-floor wakes;
5. replay-source sampling rows with deterministic seeds;
6. comparison-window residuals and first-failure codes.

