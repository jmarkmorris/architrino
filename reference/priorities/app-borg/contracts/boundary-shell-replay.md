# Borg Boundary-Shell Replay

## Status

- Kind: `priority`
- Status: `implemented`
- Claim level: `reduced-model-software-contract`
- Source requirements: [requirements-and-design](requirements-and-design.md)
- Source manifest: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md)

## Purpose

This packet defines the boundary-shell records needed to approximate an unbounded population around Borg's spherical simulation envelope. The shell is app-layer bookkeeping. It does not confine architrinos and it does not change the EOM solver.

An outbound architrino is recorded when its path crosses the sphere of radius $r_{\mathrm{outer}}$ centered at $\mathbf c$. An inbound replay row is a new boundary-generated identity sampled from observed outbound shell records. It is never retained same-record history and never branch evidence.

## Spherical Envelope

Every run that uses shell records declares:

| Field | Meaning |
| --- | --- |
| `center` | Finite Cartesian center $\mathbf c$. |
| `outerRadius` | Radius $r_{\mathrm{outer}}$ of the boundary shell. |
| `centralBallRadius` | Radius $r_{\mathrm{central}}$ of the displayed central ball. |
| `radialBufferMargin` | $b_{\mathrm{radial}}=r_{\mathrm{outer}}-r_{\mathrm{central}}>0$. |
| `historyDepth` | Retained causal-history time window $h$. |
| `wakeHorizon` | $c_fh$. |
| `centralBoundaryTolerance` | Declared boundary-to-central residual tolerance $\tau_{\mathcal C}$. |

The outward unit normal at a shell crossing $\mathbf x$ is derived, not stored as an independent direction:

$$
\mathbf n(\mathbf x)=\frac{\mathbf x-\mathbf c}{r_{\mathrm{outer}}}.
$$

A crossing is outbound when $(\mathbf v\cdot\mathbf n)>0$ and inbound when $(\mathbf v\cdot\mathbf n)<0$. A zero or interval-indeterminate projection is unresolved and does not advance for replay authority.

## Surface Partition

The continuous shell is partitioned only for bounded summaries. A partition declares a stable `surfacePartitionId`, covers the whole sphere without overlap except shared edges, and supplies an area bound for every patch. The partition may be equal-area, hierarchical, or adaptive, but its resolution and uncovered-area bound belong to the error budget. No fixed Cartesian directional partition is part of the contract.

## Boundary-Shell Summary

The summary schema is `borg-boundary-shell-summary.v1`:

| Field | Meaning |
| --- | --- |
| `summaryId` | Stable row id. |
| `sourceRunId` | EOM run that produced the path crossings. |
| `surfacePartitionId` / `surfacePatchId` | Declared spherical partition and patch. |
| `timeStart` / `timeEnd` | Half-open time bin. |
| `shellCrossingEventIds` | Traceable path-crossing events. |
| `outboundPathSegmentIds` | Retained path segments containing the crossings. |
| `shellPositionSamples` | Crossing positions or bounded patch statistics. |
| `velocitySummary` | Normal and tangential velocity summaries. |
| `polaritySummary` | Electrino/positrino counts and correlations. |
| `shellInfluenceModelId` | Path-derived influence model used by replay diagnostics. |
| `errorBudgetId` | Extraction, partition, and sampling budget. |
| `extractionStatus` | `shell-summary-ready`, `incomplete-shell-coverage`, `insufficient-history-depth`, `error-budget-exceeded`, or `display-only`. |

Complete shell coverage means every declared patch and time bin is either represented by an accepted summary row or explicitly certified empty. Silence is not coverage.

## Path-Only Influence Model

The influence schema is `borg-boundary-shell-influence-model.v1`. Its authority comes from retained path histories, a path index, the EOM interaction kernel id, the surface partition, and a declared compression or quadrature error. Cached values at display points are visualization aids only.

The model must reconstruct the bounded shell contribution at requested shell points and times. It carries the complete error line into replay and central-ball residuals. A model that cannot map between source and target shell patches inside that budget is display-only or not advanced.

## Replay Source

The replay schema is `borg-boundary-shell-replay-source.v1`:

| Field | Meaning |
| --- | --- |
| `replaySourceId` | Stable source id. |
| `summarySetId` | Complete observed shell-summary set. |
| `targetRunId` | Run receiving boundary-generated paths. |
| `samplingSeed` | Deterministic replay seed. |
| `surfaceMappingPolicy` | Rotation/tangent-chart mapping on the sphere. |
| `timeMapping` | Traceable mapping to observed source bins. |
| `velocitySamplingResultId` | Measured velocity-sampling row. |
| `polaritySamplingPolicy` | Policy preserving the observed polarity inventory. |
| `historyHidingPolicy` | Assigns new inbound identities and forbids same-record identity reuse. |
| `wakeReconstructionPolicy` | Reconstructs wake effects from generated paths through the declared path index. |
| `valueAuthority` | `reduced-model-boundary`, `display-only`, or `fail-closed`. |

The first policy pools the complete shell and uses rotations of the radial normal plus a declared tangent basis. It does not privilege Cartesian axes. Patch weights are proportional to measured outbound population and patch area, with residuals for time, velocity, polarity, and correlation mismatch.

## Error Budgets And Decision

The reduced-model comparison carries three declared rows:

| Row | Obligation |
| --- | --- |
| `shell_self_similarity` | Transformed inbound shell statistics are within $\tau_{\mathrm{self}}$ of observed outbound statistics. |
| `shell_replay_residual` | $R_{\mathrm{shell\ replay}}\le\tau_{\mathrm{shell}}$. |
| `boundary_to_central_residual` | $R_{\mathrm{boundary\to central}}\le\tau_{\mathcal C}$. |

The v0 thresholds remain $\tau_{\mathrm{self}}=5\times10^{-2}$, $\tau_{\mathrm{shell}}=10^{-2}$, and $\tau_{\mathcal C}=10^{-3}$. Missing observed input, incomplete shell coverage, an unmeasured velocity policy, an untraceable time map, or an exceeded residual requires verification for advancement whenever replay would affect a value-authority claim. Display-only preview is allowed only when no replay value is consumed by the run.

## EOM V11 Input And Output Contract

`EOM_BORG_NATIVE_V11` retains the exact 60-field evolution row and adds optional typed records before `END`. `BORG_SHELL_ENVELOPE` carries the shell and central radii, extraction and observation windows, history and wake bounds, and comparison-set identity. `BORG_SHELL_PARTITION` carries an oriented `equal-area-zphi/v1` partition with zero uncovered area. `BORG_SHELL_TIME_BIN` rows cover the extraction window contiguously. `BORG_REPLAY_SOURCE` carries the new inbound identity, mapping, sampling, polarity, history-hiding, and wake-reconstruction policies. Exactly three `BORG_RESIDUAL_SPEC` rows bind the required labels to distinct reference and boundary runs, and `BORG_RESIDUAL_SAMPLE` rows carry paired scalar intervals, positive interval weights, source-row identities, and their shell or central receiver domain.

Plainly: the app supplies identities, windows, and already-produced reference-versus-boundary values. The EOM process extracts crossings and makes the interval decisions; the app does not recreate boundary physics.

For reference interval $A_i$, boundary interval $B_i$, and positive weight interval $W_i$, the declared `relative-weighted-l2/v1` decision is

$$
R=\frac{\sqrt{\sum_i W_i(B_i-A_i)^2}}{\sqrt{\sum_i W_iA_i^2}+\epsilon_0}.
$$

The EOM process returns the complete residual interval and uses its upper bound as `residualValue`. A row passes only when the interval upper bound does not exceed its tolerance. A lower bound above tolerance fails; a tolerance-overlapping interval remains fail-closed.

Plainly: uncertainty can only make the decision more cautious. An interval that straddles the threshold is not rounded into a pass.

The output bundle preserves retained wake and acceleration-contribution rows, brackets each certified shell crossing, derives the normal projection and direction, emits every declared patch/time cell as `accepted` or `certified-empty`, links every crossing influence to accepted acceleration-contribution identities, preserves the replay source, and returns all three residual decisions. Any unresolved segment, silent patch/time cell, missing influence identity, missing replay carrier, unbound comparison row, or non-passing required residual keeps replay-affected values fail-closed.

Plainly: complete coverage includes explicit empty cells. No output silence is interpreted as an empty part of the shell.

## First-Failure Codes

| Code | Meaning |
| --- | --- |
| `missing_boundary_shell_crossing_coverage` | The observed source lacks complete shell and time-bin coverage. |
| `boundary_shell_influence_model_missing` | No path-derived shell influence model is available. |
| `boundary_shell_influence_model_mapping_failed` | Shell mapping exceeds its declared budget. |
| `boundary_shell_policy_missing` | Replay is requested without an accepted shell policy row. |
| `velocity_sampling_protocol_missing` | Velocity sampling has no measured result. |
| `shell_replay_residual_exceeded` | $R_{\mathrm{shell\ replay}}>\tau_{\mathrm{shell}}$. |
| `residual_tolerance_exceeded` | A measured required residual interval lies wholly above its declared tolerance. |
| `residual_decision_indeterminate` | A measured residual interval overlaps its declared tolerance. |
| `required_residual_unmeasured` | A required replay or central-ball residual is absent. |

## Evidence Boundary

Boundary-generated rows may support only the declared reduced-model grade. They cannot replace retained local wake rows, repair missing retained history, certify causal roots, or become canonical EOM evidence. Producer-asserted evidence flags are not consumed.

## Implementation Burden

[BORG-001](../work-queue.md#borg-001--native-wake-history-and-boundary-residuals) verified the executable V11 contract: shell-crossing rows, exhaustive patch/time accounting, retained wake and acceleration-contribution rows, path-derived influence rows, replay-source rows, row conservation, and all three residual decisions pass the focused fixture without app-local dynamics. The [velocity-sampling campaign](velocity-sampling-protocol.md) then completed five EOM runs over the declared range with disjoint calibration and holdout seeds. Four frozen checks passed; the velocity-distribution residual was $0.32444284226089354>0.20$ and the central-contribution residual was $0.03802281448384705>10^{-3}$. The candidate policy is therefore unselected and replay-affected output remains fail-closed. The [receipt](../evidence/borg-velocity-sampling-result.2026-09-01.json) is bounded evidence about this policy and fixture range, not an independent EOM-correctness oracle or a physical benign-noise result.

Plainly: the measurement exists, and it says the first sampler is not accurate enough. Borg keeps its replay-derived values off rather than treating a partial pass as adequate.
