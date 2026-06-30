# T3 App Requirements and Design

## Purpose

The T3 app should let the operator build, run, inspect, and replay periodic T3 simulation universes with controlled scale and initial conditions. Its purpose is to make architrino motion, path history, wake history, winding labels, and solver diagnostics inspectable without turning a bounded simulation sandbox into a proof of the full $\mathbb{A}\mathbb{A}\mathbb{A}$ universe.

The app is a design target until native-backed runs and retained same-record evidence exist.

## Non-Negotiable Boundaries

1. The native central solver is the production solver for architrino motion, causal roots, delayed hits, path histories, wake history, T3 stepping, and solver-owned geometry.
2. The app must not create a new production solver, parallel solver stack, app-local solver, or alternate default engine.
3. JavaScript-only paths may exist only as explicitly named `reference`, `fallback`, `test`, fixture, or comparison code.
4. Architrino primitives do not have physical mass. In the T3 native/bridge contract, `integrationWeight` / `integrationWeights` is a numerical integration scalar, not architrino ontology; any remaining `mass` or mass-like field outside that T3 contract is a comparison-kernel parameter or legacy/toy interaction coefficient.
5. The app must model architrino primitives directly. Assemblies may appear later only as derived diagnostics or corpus-bound comparison objects, not as the base entity type for this app.
6. T3 output is candidate-level unless the run binds same-record retained evidence for source histories, receiver histories, causal roots, branch rows, wake rows, and diagnostics.

## Topology Model

The app's T3 topology is a periodic cube. The displayed cube is the fundamental domain. Neighboring cubes in a 3 by 3 by 3 cover are image views of the same architrino identities, not independent copies.

For a source architrino `i`, receiver architrino `j`, side length $L$, and winding vector $\mathbf n\in\mathbb Z^3$, causal contact in the universal cover has the form

$$
\left\|
\mathbf x_j(t)
-
\left(\mathbf x_i(t_0)+L\mathbf n\right)
\right\|
=
c_f(t-t_0).
$$

The retained row must record the winding vector or image label that made the root true. Without that label, a wrapped wake cannot be distinguished from an unwrapped local wake.

## Scale Controls

The app should expose scale as a declared simulation envelope, not as a cosmetic zoom.

Required controls:

| Control | Meaning | Solver-facing obligation |
| --- | --- | --- |
| `sideLength` | T3 fundamental-domain side length $L$ | Enters topology, image wrapping, distance, and causal-root search. |
| `scaleFactor` | Operator-controlled scaling from model units to display or campaign units | Recorded in the run manifest; does not change ontology by itself. |
| `architrinoCount` | Number of primitive architrinos in the run | Drives state size, pair pressure, path streams, and wake-history pressure. |
| `duration` | Simulated time span | Determines required path-history depth and storage. |
| `timeStepPolicy` | Fixed, adaptive, or solver-selected stepping policy | Must be part of the native solver model contract. |
| `historyDepth` | Active causal-history time window $h$ | Measured in time; must be enough to support requested wake/root queries or fail closed. |
| `wakeHorizon` | Wake travel length $c_f h$ corresponding to `historyDepth` | Measured in length; determines whether wakes can reach or wrap across T3 faces inside the retained history. |
| `wakeFloor` | Declared threshold below which wakes are not retained as resolved rows | Must route to background/noise rows rather than silent truncation. |
| `wrapMode` | Local, wrap-aware, or diagnostic cover view | Must determine whether winding labels are required in displayed rows. |

`historyDepth` and `wakeHorizon` must not be collapsed into one UI field. `historyDepth` is the retained time window, while `wakeHorizon = c_f h` is the corresponding length scale. If `wakeHorizon` is small compared with `sideLength`, the run is in the local-sandbox regime. If `wakeHorizon` is comparable to or larger than `sideLength`, wrap-aware diagnostics, winding labels, and outbound-face replay policy become relevant.

The app may provide visual zoom independently, but visual zoom must not change `sideLength`, causal speed, history depth, or solver precision unless the operator explicitly changes the simulation envelope.

## Initial Conditions

The app should support several initial-condition families while preserving explicit architrino identities:

| Family | Required fields | Claim limit |
| --- | --- | --- |
| `random` | Seed, count, position distribution, velocity distribution, polarity or charge-sign policy when applicable | Exploration only until repeated under declared seeds and diagnostics. |
| `lattice` | Grid dimensions, spacing, jitter, velocity policy, polarity or charge-sign policy when applicable | Geometry diagnostic, not evidence for crystalline ontology. |
| `clustered` | Cluster centers, spreads, counts, velocity policy, polarity or charge-sign policy when applicable | Candidate stress test for wake/root density. |
| `explicit` | Per-architrino position, velocity, identity, and optional path segment input | Best first path for reproducible fixtures. |
| `imported` | Manifest id, schema version, source hash, units, and scale normalization | Must preserve source provenance and schema version. |

No initial-condition editor should ask the operator for architrino physical mass. If the T3 app exposes the numerical integration scalar, it must label it as `integrationWeight` and must keep the physical-mass interpretation forbidden.

## Path-History Retention

Path history means the recorded source and receiver motion needed to replay where each architrino was when a causal root, delayed hit, or wake row was formed.

Required path-history records:

| Record | Required fields |
| --- | --- |
| Current state | `architrinoId`, position, velocity, acceleration, image offset, time, step index, status. |
| Segment row | Path id, segment id, time bounds, endpoint states or segment coefficients, interpolation law, numeric precision, error budget. |
| Active window | Hot in-memory path range used for ongoing root and wake solving. |
| Spill manifest | Chunk ids, path id ranges, time ranges, byte offsets, checksums, units, scale normalization, schema version. |
| Replay index | Fast lookup for path id, time range, frame range, and root/wake consumers. |

The app should render trails and playback from these records, but the authoritative data is the solver-owned path stream and manifest.

## Wake-History Retention

Wake history means the retained causal influence rows generated by source path history and consumed by receiver motion or diagnostics.

Required wake-history records:

| Record | Required fields |
| --- | --- |
| Resolved wake row | Wake row id, source architrino id, receiver architrino id, source path id, receiver path id, emission time, hit time, winding vector, causal-root id, residual, branch row id when applicable, wake strength, status. |
| Background/noise row | Threshold, aggregation interval, source population, receiver population or region, omitted resolved-row count, aggregate magnitude, claim-level downgrade. |
| Failure row | Missing path history, unresolved root, insufficient history depth, missing winding label, precision failure, branch-row mismatch, or simulation-envelope overflow. |

Silent wake truncation is not allowed. If the requested scale makes individual wakes smaller than the declared `wakeFloor`, the run must record that boundary as a background/noise row with a claim-level downgrade.

### T3 Wake-History Row

The first resolved wake-history row schema is `t3-wake-history-row.v1`. It is a retained row, not a visualization shell. A displayed wake stream, acceleration contribution, winding label, or selected wake diagnostic must trace back to this row or to an explicit background/noise or failure row.

| Field | Required content |
| --- | --- |
| `schema` | `t3-wake-history-row.v1`. |
| `wakeRowId` | Stable row id unique inside the run manifest. |
| `runId` | Source T3 run id. |
| `sourceArchitrinoId` | Source architrino identity. |
| `receiverArchitrinoId` | Receiver architrino identity. |
| `sourcePathId` | Solver-owned source path-history id. |
| `receiverPathId` | Solver-owned receiver path-history id. |
| `sourceSegmentId` | Source path segment used by the causal-root solve. |
| `receiverSegmentId` | Receiver path segment used by the causal-root solve. |
| `emissionTime` | Source time $t_0$. |
| `hitTime` | Receiver time $t$. |
| `fieldSpeed` | Causal field speed $c_f$ used by the row. |
| `sideLength` | T3 side length $L$ used by the row. |
| `windingLabel` | Integer triple $\mathbf n=(n_x,n_y,n_z)\in\mathbb Z^3$ used in the universal-cover root. The local label is `(0, 0, 0)`. |
| `sourcePositionAtEmission` | Source position at $t_0$ in the fundamental-domain chart plus any source image offset required by the path-history stream. |
| `receiverPositionAtHit` | Receiver position at $t$ in the fundamental-domain chart plus any receiver image offset required by the path-history stream. |
| `coverSourcePosition` | $\mathbf x_i(t_0)+L\mathbf n$, the source position used by the universal-cover causal-root equation. |
| `causalRootId` | Root-ledger or causal-root row id. |
| `rootResidual` | Residual of the causal-root equation. |
| `wakeStrength` | Solver-owned wake strength or acceleration contribution before display transforms. |
| `receiverAccelerationContribution` | Vector contribution to receiver acceleration when the solver emits row-resolved acceleration. |
| `branchRowId` | Branch row id when a branch diagnostic depends on this wake row; otherwise null. |
| `evidenceStatus` | `local-pre-wrap-evidence`, `global-periodic-wrap-evidence`, or `fail-closed-value`. |
| `valueAuthority` | Diagnostic status for the row value, using the app value-authority vocabulary. |
| `errorBudget` | Row-level root, wake-strength, and acceleration-contribution error bounds. |
| `rowStatus` | Retained, background-ineligible, missing winding label, insufficient history depth, exceeded error budget, or another first-failure status. |

The row is valid only if the stored `windingLabel` is the same integer vector used in the causal-root equation:

$$
\left\|
\mathbf x_j(t)
-
\left(\mathbf x_i(t_0)+L\mathbf n\right)
\right\|
=
c_f(t-t_0).
$$

A row that omits `windingLabel` is not a weaker local row. It is a failure row for wrap-aware diagnostics because the app cannot distinguish an unwrapped local hit from a wrapped hit whose image label was lost.

### Local and Periodic-Wrap Evidence Split

The app must separate local pre-wrap evidence from global periodic-wrap evidence.

| Evidence status | Admission rule | Claim limit |
| --- | --- | --- |
| `local-pre-wrap-evidence` | `windingLabel = (0, 0, 0)`; the row is inside the declared `historyDepth`; no selected diagnostic requires nonzero winding rows; and the manifest records either `wakeHorizon < sideLength` for the accepted envelope or a local-only `wrapMode` that marks nonzero winding rows out of scope. | Supports local T3 sandbox diagnostics only. It does not prove global periodic-wrap behavior and cannot stand in for explicit-wrap evidence. |
| `global-periodic-wrap-evidence` | The run is wrap-aware; every retained wrapped row records an explicit `windingLabel`; nonzero labels are counted by winding vector; zero-label rows are retained alongside nonzero rows in the same manifest; and receiver acceleration records whether it used local rows, wrapped rows, background/noise rows, or a mixture. | Supports periodic-wrap diagnostics inside the declared envelope. It remains candidate-level unless same-record retained evidence binds the relevant source histories, receiver histories, causal roots, branch rows, wake rows, and diagnostics. |
| `fail-closed-value` | The run needs wrap-aware interpretation but any required wake row has a missing winding label, insufficient `historyDepth`, unresolved causal root, missing same-record path binding, exceeded error budget, or silent-truncation violation. | Blocks authoritative acceleration, branch evidence, retained wake evidence, and periodic-wrap claims for the affected receiver, region, or run. |

The zero winding label is data, not absence of data. A local pre-wrap row must still store `windingLabel = (0, 0, 0)` so that later tooling can count it separately from nonzero periodic-wrap rows. Conversely, a nonzero `windingLabel` is required but not sufficient for global periodic-wrap evidence; the manifest must also prove that the row was solved, retained, error-bounded, and not substituted by display-only visualization or outbound face replay.

## Simulation-Envelope Wake Row Rule

Every T3 run must declare a simulation envelope before wake-history output can be interpreted. The envelope is a run-manifest object with at least:

| Field | Meaning |
| --- | --- |
| `sideLength` | T3 fundamental-domain side length $L$. |
| `historyDepth` | Active causal-history time window $h$. |
| `wakeHorizon` | Wake travel length $c_f h$. |
| `wakeFloor` | Declared per-row wake-strength or acceleration-contribution floor. |
| `errorBudget` | Declared numeric error allowance for root solving, wake-strength evaluation, aggregation, and replay. |
| `wrapMode` | Local, wrap-aware, or diagnostic-cover interpretation policy. |
| `aggregationBins` | Time, winding, face, source population, receiver population, and strength bins used for background/noise rows. |

For a receiver `j` at time $t$, the solver-facing candidate wake set is

$$
\mathcal C_j(t;E)
=
\left\{
r :
0 \le t-t_0 \le h,\quad
\left\|
\mathbf x_j(t)
-
\left(\mathbf x_i(t_0)+L\mathbf n\right)
\right\|
=
c_f(t-t_0)
\right\},
$$

where $E$ is the declared simulation envelope. The app may not display receiver acceleration as authoritative unless every candidate row in $\mathcal C_j(t;E)$ is classified as exactly one of these records:

| Class | Admission condition | Required record |
| --- | --- | --- |
| Resolved wake row | Same-record source and receiver path history exists; the causal root is solved inside `errorBudget`; the row has the required winding vector or image label; the wake contribution is at or above `wakeFloor`, or the selected diagnostic/branch depends on the individual row. | A retained wake row with source id, receiver id, source path id, receiver path id, emission time, hit time, winding vector, causal-root id, residual, wake strength or acceleration contribution, value authority, and status. |
| Aggregated wake-noise/background row | The individual row is below `wakeFloor`; it is not selected; no branch row, retained record, or selected-object diagnostic depends on that individual row; and the aggregate bin can be bounded inside `errorBudget`. | A background/noise row with threshold, bin definition, omitted-row count, aggregate magnitude, error bound, source population, receiver population or region, winding/face summary when relevant, and claim-level downgrade. |
| Failure row | The run cannot prove either resolved-row retention or admissible aggregation. This includes missing path history, unresolved root, insufficient `historyDepth`, missing winding label in a wrap-aware run, precision failure, branch-row mismatch, selected-row dependence, exceeded `errorBudget`, or simulation-envelope overflow. | A fail-closed row with first-failure code, affected receiver or region, missing field or exceeded bound, and value-authority downgrade. |

The classification is exclusive and exhaustive inside the declared envelope:

$$
\mathcal C_j(t;E)
=
\mathcal W_j^{\mathrm{resolved}}(t)
\;\dot\cup\;
\mathcal W_j^{\mathrm{background}}(t)
\;\dot\cup\;
\mathcal W_j^{\mathrm{failure}}(t).
$$

Receiver acceleration may be displayed as authoritative only when $\mathcal W_j^{\mathrm{failure}}(t)$ is empty and the manifest records the decomposition

$$
\mathbf a_j(t)
=
\sum_{r\in\mathcal W_j^{\mathrm{resolved}}(t)}
\mathbf a_{j,r}^{\mathrm{wake}}(t)
+
\mathbf a_j^{\mathrm{background}}(t)
+
\mathbf a_j^{\mathrm{unresolved}}(t),
$$

with $\mathbf a_j^{\mathrm{unresolved}}(t)=0$ inside the accepted envelope. If any failure row exists, the affected acceleration value must be `fail-closed-value` or `missing-error-budget`, not `authoritative-solver-output`.

Forbidden silent truncation means:

1. no candidate wake row inside $\mathcal C_j(t;E)$ may be dropped without increasing either a resolved-row count, an omitted-row count in a background/noise row, or a failure-row count;
2. a below-floor row may be aggregated only when the row is not selected and is not needed by any retained branch row, same-record binding, or selected-object diagnostic;
3. a missing winding label in a wrap-aware envelope is a failure row, not a background/noise row;
4. insufficient `historyDepth` is a failure row for affected receiver acceleration unless the manifest explicitly downgrades that acceleration to display-only or missing-error-budget;
5. outbound face replay may consume background/noise rows only after its validation row passes; it may not replace retained wake rows or repair missing same-record evidence.

The first build target for this rule is a manifest check that proves row conservation:

$$
N_{\mathrm{candidate}}
=
N_{\mathrm{resolved}}
+
N_{\mathrm{aggregated}}
+
N_{\mathrm{failure}},
$$

where $N_{\mathrm{aggregated}}$ is the omitted-row count carried by background/noise rows, not merely the number of aggregate records.

## Outbound Face Background/Noise Replay

The app should support a candidate boundary-background experiment: characterize wake activity crossing the six faces of the T3 fundamental-domain cube, then replay a statistically similar background/noise contribution in later runs. This is an approximation policy for unresolved or subthreshold wakes, not a replacement for retained wake rows.

The first schema and validation fixture for this experiment lives in [outbound-face-wake-replay](outbound-face-wake-replay.md). That packet defines `t3-outbound-face-summary.v1`, `t3-face-background-replay-source.v1`, the explicit-wrap reference run, the face-summary extraction step, the statistical replay run, and the $R_{\mathrm{face\ replay}}$ pass/fail threshold.

For a face $F$ and time bin $[t,t+\Delta t]$, an outbound face summary may be recorded as

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
C_F
\right),
$$

where $N_F$ is the counted outbound wake-row population, $\mu_F$ and $\Sigma_F$ summarize the retained acceleration or wake-strength contribution, $H_F^{\mathrm{strength}}$, $H_F^{\mathrm{direction}}$, and $H_F^{\mathrm{winding}}$ are binned summaries, and $C_F$ records correlation diagnostics such as time correlation, face-to-face correlation, or phase-like recurrence where the run can measure it.

Required outbound face records:

| Record | Required fields | Claim limit |
| --- | --- | --- |
| Face summary row | Face id, time bin, source run id, wake-floor policy, count, strength bins, direction bins, winding bins, aggregate contribution, correlation summary, error budget. | Background/noise diagnostic. |
| Replay source row | Source summary id, sampling seed, replay policy, target run id, value-authority status, and claim-level downgrade. | Display or reduced-model input only. |
| Validation row | Explicit-wrap comparison run id, replay run id, residual, tolerance, accepted range, and first-failure code. | Required before replay can be trusted for a declared envelope. |

The replay residual should compare receiver acceleration or wake-background contribution from an explicit retained-row run against the statistical replay:

$$
R_{\mathrm{face\ replay}}
=
\frac{
\left\|
\mathbf a^{\mathrm{explicit}}_{\mathrm{background}}
-
\mathbf a^{\mathrm{replay}}_{\mathrm{background}}
\right\|
}{
\left\|
\mathbf a^{\mathrm{explicit}}_{\mathrm{background}}
\right\|+\varepsilon_0
}.
$$

The replay is admissible only inside a declared simulation envelope and only when $R_{\mathrm{face\ replay}}$ stays within the declared error budget. If the residual fails, if correlations phase-lock, or if a selected branch depends on an individual subthreshold wake, the run must fall back to explicit retained wake rows or fail closed.

Policy ladder:

1. `explicit-wrap` — preserve retained wake rows with winding labels; this is the only path that can support same-record branch evidence.
2. `face-background-replay` — replay statistically similar outbound face background/noise for unresolved or subthreshold wakes; value authority is reduced-model background.
3. `display-only-preview` — show possible face noise visually without feeding receiver acceleration or diagnostics; value authority is display-only.

## Wrap-Aware Wake Interpretation

When the active causal-history horizon is small compared with $L$, most retained wakes are local and the T3 behaves like a local patch. When the horizon reaches the wrap scale, wakes can return through nonzero winding vectors. The app must make this visible because wrapped wakes are not the same diagnostic situation as ordinary unwrapped neighbor wakes.

Required diagnostics:

1. count resolved wake rows by winding vector;
2. show whether a selected receiver acceleration used local rows, wrapped rows, background/noise rows, or a mixture;
3. report first wrap time for the run envelope when available;
4. mark rows whose interpretation depends on the periodic boundary condition.

## Acceleration View

The acceleration view should decompose receiver acceleration by retained wake rows and background/noise rows:

$$
\mathbf a_j(t)
=
\sum_{r\in\mathcal W_j^{\mathrm{resolved}}(t)}
\mathbf a_{j,r}^{\mathrm{wake}}(t)
+
\mathbf a_j^{\mathrm{background}}(t)
+
\mathbf a_j^{\mathrm{unresolved}}(t).
$$

The app may display this decomposition, but it must not promote it to proof evidence unless the same record binds source histories, receiver histories, causal-root rows, wake rows, and solver diagnostics.

## User Interface Design

The app should open on the working simulation surface, not a landing page. The visual design should be minimal, elegant, and contemporary by default: a quiet simulation workspace with restrained controls, clear hierarchy, and no decorative chrome that competes with the T3 state.

Primary regions:

1. T3 viewport with fundamental-domain cube, optional cover images, architrino positions, path trails, wake rows, and winding labels.
2. Left control rail for scale, initial conditions, native solver envelope, run controls, and seed/import controls.
3. Bottom timeline for playback, scrubbing, checkpoint selection, and event selection.
4. Right diagnostics rail for selected architrino state, path-history metadata, wake-history rows, acceleration decomposition, winding summary, and failure rows.
5. Export panel for run manifest, checkpoints, frame buffers, path-history streams, wake-history rows, and diagnostics.

The design should be dense and work-focused. Controls should favor exact numeric inputs, sliders for bounded values, toggles for binary flags, segmented controls for display modes, and icon buttons where the action is standard.

Minimal does not mean hiding required state. The default view should keep advanced solver diagnostics collapsed or contextual, but the app must still expose path history, wake history, winding labels, acceleration decomposition, background/noise rows, and failure rows whenever those records affect interpretation.

## First-Screen Control Layout

The first screen should make camera navigation, viewport layers, and simulation-envelope scale controls physically and visually separate. The operator must not be able to confuse camera zoom with changing the T3 side length or solver scale.

Required first-screen regions:

| Region | Location | Contents | Boundary |
| --- | --- | --- | --- |
| Viewport camera cluster | Floating inside the T3 viewport, upper right or lower right. | Rotate/orbit, zoom, pan, reset view, fit T3, focus selected. | Camera controls change only the rendered viewpoint. They must never edit `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, precision, or solver state. |
| Layer toggle strip | Floating inside the T3 viewport, upper left or top center. | `path-history`, `wake-streams`, `velocity-vectors`, `winding-labels`, and `diagnostics` toggles. | Layer toggles change visibility only. They must not create, delete, or recompute solver rows. |
| Simulation-envelope panel | Left control rail, outside the T3 viewport. | `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, `wrapMode`, `architrinoCount`, `duration`, `timeStepPolicy`, and precision claim controls. | These controls change the requested run envelope and must show pending, accepted, rejected, or fail-closed status. |
| Exact-value readout | Near the simulation-envelope panel and selected-object diagnostics. | Exact `sideLength`, camera zoom ratio, `scaleFactor`, `historyDepth`, `wakeHorizon`, selected time, frame index, selected architrino velocity, selected wake strength, diagnostic status, and value-authority status. | Must keep camera zoom and physical T3 scale in separate labeled rows. |
| Timeline rail | Bottom of the screen. | Linear local scrubber, logarithmic overview, current time, frame index, checkpoint id, and playback speed. | Timeline navigation changes playback/readback position only unless the operator explicitly changes the simulation envelope duration. |
| Diagnostics rail | Right side, contextual and collapsible. | Selected architrino state, selected wake row, error budget, diagnostic status, value authority, first-failure codes, and acceleration decomposition. | Diagnostics may explain a value but must not silently upgrade claim level. |

Required separation labels:

1. Camera controls must be labeled `View`.
2. Simulation-envelope controls must be labeled `Simulation envelope`.
3. Camera zoom must be displayed as `view zoom`.
4. T3 physical/domain scale must be displayed as `sideLength`.
5. Model/display scaling must be displayed as `scaleFactor`.
6. `historyDepth` must show time units.
7. `wakeHorizon = c_f h` must show length units.

Interaction rules:

1. Mouse wheel, trackpad pinch, viewport zoom buttons, and fit-view commands control `view zoom` only.
2. Editing `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, `wrapMode`, or precision must occur only in the simulation-envelope panel.
3. A changed simulation-envelope field must enter a pending state until the native solver accepts, reruns, rejects, or fails closed.
4. Layer toggles may reveal path history, wake streams, velocity arrows, winding labels, and diagnostics without changing run data.
5. Selected-object diagnostics must show both camera-independent solver values and any display transform used by the viewport.

## Logarithmic UI Exploration

The app should explore a logarithmic UI for quantities that naturally span many orders of magnitude. This is a design direction, not a license to hide the underlying run values.

Candidate logarithmic controls and displays:

| Surface | Logarithmic use | Required exactness |
| --- | --- | --- |
| T3 scale | Let the operator move across side length, density, and visual scale ranges without huge sliders. | Show exact `sideLength`, `scaleFactor`, and units beside the control. |
| Velocity vectors | Use logarithmic arrow length so slow and fast architrinos remain visible together. | Show the selected architrino's raw velocity and the arrow scaling rule. |
| Wake strength | Use logarithmic opacity, radius emphasis, or legend bins for resolved wake rows. | Show raw wake strength, threshold, and whether the row is resolved or background/noise. |
| History depth | Use logarithmic controls for active path-history window and replay duration. | Show exact history depth, storage estimate, and any solver admission warning. |
| Timeline | Allow logarithmic time navigation for long runs while preserving frame-accurate local scrub. | Show current time, frame index, and whether playback is linear or logarithmic. |
| Diagnostics | Group residuals, magnitudes, and event counts by order-of-magnitude bins. | Keep raw diagnostic values available on selection or hover. |

The UI must label transformed displays explicitly: `linear`, `log`, `normalized`, or `display-only`. A logarithmic control may help the operator navigate the run, but it must not change claim level, precision status, or solver diagnostics by presentation alone.

## First Logarithmic UI Prototype Rules

The first logarithmic UI prototype should test four surfaces: scale, velocity arrows, wake strength, and timeline navigation. Each surface must show exact solver values beside or inside the interaction path. Logarithmic display is an app-facing projection unless the solver manifest explicitly marks the transformed value as authoritative.

| Surface | Prototype rule | Exact value requirement | Status requirement |
| --- | --- | --- | --- |
| Scale | Use a logarithmic slider or stepper for `sideLength`, `scaleFactor`, `historyDepth`, and `wakeHorizon` ranges that span many orders of magnitude. The slider label should show powers or order bands, while the adjacent numeric fields hold exact values. | Always show exact `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, and units. | Values that change the simulation envelope must be marked as pending until the native solver accepts or reruns the envelope. |
| Velocity arrows | Use logarithmic arrow length for viewport readability, with each arrow using the architrino's stable color. Use shaft hash marks or segmented shafts as the first magnitude cue; hash spacing or segment count may encode order-of-magnitude bins. | On hover or selection, show raw velocity vector, speed magnitude, arrow scale rule, and whether the arrow is linear or logarithmic. | Arrow geometry is `app-facing-projection`; the raw velocity remains `authoritative-solver-output` only when its error budget is valid. |
| Wake strength | Use logarithmic opacity, shell thickness, or legend bins for resolved wake rows and background/noise rows. Above-floor retained wake rows must remain visually distinguishable from replayed background/noise. | Show raw wake strength or acceleration contribution, `wakeFloor`, threshold relation, row id, winding vector when relevant, and exact diagnostic status. | Resolved retained rows may display as solver-backed; statistical face replay and preview shells must remain reduced-model or display-only. |
| Timeline navigation | Use a dual timeline: a linear local scrubber for frame-accurate playback near the current time and a logarithmic overview for long-run navigation across sparse or dense event regions. | Always show exact time, frame index, selected checkpoint id, playback speed, and whether the active timeline interaction is linear or logarithmic. | Log overview positions are navigation aids; frame reads remain authoritative only when backed by the run manifest and stream index. |

Prototype guardrails:

1. Every logarithmic control must have a direct numeric input for the exact value.
2. Every logarithmic legend must state the transform, bin boundaries, and units.
3. Logarithmic display must not hide `missing-error-budget`, `exceeded-error-budget`, or `fail-closed-value` statuses.
4. A logarithmic UI may change a requested simulation envelope only through explicit envelope controls, not by camera zoom or display scaling.
5. The selected-object panel must always show the raw solver value, transformed display value, transform type, diagnostic status, and value-authority status.

## Viewport Layers

The T3 viewport should use optional layers that can be turned on or off without changing the solver run. Layers are display controls over solver-owned state, path-history streams, wake-history rows, and diagnostics.

Required first-layer set:

| Layer | Default | Visual rule | Data dependency |
| --- | --- | --- | --- |
| `architrino-position` | On | Render each architrino as a stable colored point or glyph. | Current solver state. |
| `path-history` | Off | Render recent trails with fade or bounded segment count. | Path-history stream and replay index. |
| `wake-streams` | Off | Render expanding causal spheres or shells from retained wake rows; wrapped rows should indicate their winding label. | Wake-history rows, emission time, hit time, causal speed, winding vector. |
| `velocity-vectors` | Off | Render each architrino's current velocity as an arrow using the same stable color as the architrino. Arrow length should use logarithmic sizing so slow and fast paths remain legible together. | Current velocity, scale normalization, timestep policy. |
| `winding-labels` | Contextual | Label nonzero image/winding rows without cluttering local-only views. | Image offset and winding vector rows. |
| `diagnostics` | Contextual | Surface halt status, failure rows, background/noise rows, unresolved rows, and claim-level downgrades near the selected object or run summary. | Solver diagnostics and run manifest. |

Velocity arrows need a visual cue for magnitude beyond length alone. The first design should test shaft hash marks, segmented shafts, or another low-clutter encoding that survives logarithmic length scaling. The cue must not imply acceleration unless the acceleration layer is explicitly enabled.

Expanding wake streams are visualization layers, not independent physics objects. A sphere or shell shown in the viewport must be traceable to a retained wake-history row or clearly marked as display-only preview.

## First-Screen Layer Control Layout

The first-screen layer controls should keep the workspace minimal by default while making richer path, wake, velocity, winding, and diagnostic layers one click away. The layer strip belongs inside the T3 viewport, but it must remain visually lighter than the simulation state.

Layer default policy:

| Layer | First-screen state | Control placement | Selected-object behavior |
| --- | --- | --- | --- |
| `fundamental-domain` | On and locked in the first prototype. | Shown as a small cube-boundary icon in the layer strip, with lock state visible. | Selection reports `sideLength`, `view zoom`, `scaleFactor`, and wrap regime in the diagnostics rail. |
| `architrino-position` | On. | First visible toggle in the layer strip; cannot be hidden while no other position-bearing layer is visible. | Selecting an architrino opens a compact viewport tag with id, diagnostic status, and speed; full state appears in the diagnostics rail. |
| `path-history` | Off. | Toggle in the layer strip, with a small history-depth indicator. | Selecting a path segment shows segment time bounds and value authority in the compact tag; interpolation/error details remain in the diagnostics rail. |
| `wake-streams` | Off. | Toggle in the layer strip, with a resolved/background split in the layer menu. | Selecting a wake shell shows wake row id, source/receiver ids, winding vector, and status; residual and threshold details remain in the diagnostics rail. |
| `velocity-vectors` | Off. | Toggle in the layer strip, with a logarithmic-scale marker when enabled. | Selecting an arrow shows raw speed, transform type, and arrow scale rule; vector components remain in the diagnostics rail. |
| `winding-labels` | Contextual and off for local-only runs. | Toggle is disabled or subdued when no nonzero winding rows exist. | Selecting a winding label focuses the related wake/path row and shows whether it is local, wrapped, or display-only. |
| `diagnostics` | Contextual. | Toggle opens or pins diagnostics overlays; default state shows only selected-object tags and fail-closed alerts. | Selected-object diagnostics appear first as compact tags; detailed tables live in the right diagnostics rail. |
| `outbound-face-background` | Off. | Nested under `wake-streams` or diagnostics until a run includes outbound face summaries. | Selecting a face summary shows summary id, face id, replay authority, and $R_{\mathrm{face\ replay}}$ status when available. |

The default visible stack is `fundamental-domain` plus `architrino-position`. The default contextual stack is selected-object tags plus fail-closed alerts. Everything else starts behind toggles so the first screen remains quiet.

Layer strip rules:

1. Use icon toggles with tooltips for each layer, plus a single overflow menu for layer-specific options.
2. Keep the strip to one row on desktop; collapse into a compact layer button on narrow screens.
3. Show an active-count or warning mark on a layer only when it helps interpretation, such as unresolved wake rows, missing error budget, or exceeded error budget.
4. Never use a layer toggle to change the solver run, simulation envelope, or value authority.
5. If enabling a layer would show only display-only projections, label that state before rendering the layer.

Selected-object diagnostics should not clutter the viewport:

1. A selected object may show one compact viewport tag anchored near the object.
2. The tag should contain only object id, diagnostic status, one primary value, and value-authority mark.
3. Full details must appear in the right diagnostics rail, not as large floating cards over the 3D scene.
4. Multiple selected objects should route to a compact list in the diagnostics rail; the viewport should highlight selected objects without opening multiple large tags.
5. Fail-closed values may show a stronger inline alert, but the alert must link to the diagnostics rail rather than covering the simulation.

## Viewport Navigation

The T3 viewport must support 3D rotation and zoom so the operator can inspect paths, wakes, winding labels, and velocity vectors from arbitrary angles.

Required navigation controls:

| Control | Requirement | Boundary |
| --- | --- | --- |
| Rotate | Orbit the camera around the selected view center or selected architrino. | Rotation changes only the camera orientation, not the T3 state. |
| Zoom | Move the camera closer or farther, with smooth wheel, trackpad, and button controls where practical. | Zoom changes only the view scale, not `sideLength`, `scaleFactor`, causal speed, or solver precision. |
| Pan | Translate the camera target across the viewport. | Pan must not shift the simulation origin or image offsets. |
| Reset view | Return to the canonical T3 orientation and default zoom. | Reset is a display command, not a rerun. |
| Fit T3 | Frame the full fundamental-domain cube and active visible layers. | Fit must respect the current layer toggles and not alter solver output. |
| Focus selected | Center the camera on a selected architrino, wake row, path segment, or diagnostic row. | Focus should expose the selected object's source data and claim level. |

The interface should make the difference between visual zoom and simulation scale explicit. Changing the T3 side length, scale factor, history depth, wake floor, or precision belongs in the simulation envelope controls, not the viewport camera.

## Error Budget and Value Authority

The app must make error budget visible enough that a beautiful visualization cannot be mistaken for higher-confidence evidence than the solver produced. An error budget is the declared and reported allowance for numerical error across a run or stage. Value authority states whether a value is authoritative solver output, an app-facing projection, a display-only visualization, or a halted/invalid value.

Required error-budget surfaces:

| Surface | Required fields | UI rule |
| --- | --- | --- |
| Run summary | Global error budget, selected precision path, tolerance policy, numeric chart, scale normalization, claim level, and halt status. | Always available in the run diagnostics summary. |
| Stage summary | Motion integration, causal-root solving, wake-row construction, path-history interpolation, stream readback, and display projection error states where available. | Collapsed by default, expanded from diagnostics. |
| Selected architrino | Current state authority, position/velocity/acceleration error state, path-history segment error, and relevant solver status. | Shown in selected-object diagnostics. |
| Selected wake row | Causal-root residual, hit-time error state, wake-strength error state, winding-label status, threshold relation, and row authority. | Shown when a wake stream, shell, or acceleration contribution is selected. |
| Logarithmic display | Raw value, transformed value, transform type, and whether the transform is authoritative or display-only. | Shown in hover, legend, or selected-object panel. |
| Failure or downgrade | First-failure code, exceeded budget, unresolved field, and claim-level downgrade. | Must be visible without hunting through raw exports. |

The app should use concise visual status marks for error-budget state, but exact values must remain available. A value whose error budget is missing, exceeded, or display-only must not be styled the same as an authoritative solver value.

## Diagnostic Status Vocabulary

The app should use a small diagnostic status vocabulary for every displayed solver-derived or visualization-derived value. These statuses are UI-facing labels over solver and manifest metadata; they do not change the underlying solver result.

| Status | Meaning | UI obligation |
| --- | --- | --- |
| `authoritative-solver-output` | The value comes from the native central solver, is inside the declared error budget, and has the required run manifest, model contract, precision path, and value-authority metadata. | May be styled as authoritative; exact value, units, precision path, and error-budget state must be available. |
| `app-facing-projection` | The value is derived from authoritative solver output for rendering, downsampling, interpolation, binning, or logarithmic display. | Must identify the source authoritative value and the projection rule; must not be styled as raw solver output. |
| `display-only-visualization` | The value or geometry is drawn only to help the operator inspect the run, such as preview wake shells, visual trails, camera overlays, or non-authoritative layer effects. | Must be visually distinct from solver authority; must not feed receiver acceleration, branch evidence, or validation rows. |
| `missing-error-budget` | The value lacks the error-budget metadata required for its claimed use. | Must be shown as unavailable, warning, or fail-closed; must not be styled as authoritative. |
| `exceeded-error-budget` | The value has an error budget, but the reported residual, precision status, replay residual, interpolation error, or stage error exceeds the declared bound. | Must show the exceeded budget and first-failure code; affected values lose authoritative styling. |
| `fail-closed-value` | The value is present only as a halted, invalid, or rejected result because a required condition failed. | Must show the failure reason and block use in branch evidence, retained wake evidence, or authoritative acceleration displays. |

The status order is fail-closed by construction. If a value could match more than one status, the app must choose the least-authoritative applicable status in this order: `fail-closed-value`, `exceeded-error-budget`, `missing-error-budget`, `display-only-visualization`, `app-facing-projection`, `authoritative-solver-output`.

## Data Products

Every run should produce a manifest that records:

1. model contract and native solver version;
2. T3 topology fields and scale envelope;
3. initial-condition source and seed/import hash;
4. path-history stream ids and spill policy;
5. wake-history row ids, outbound face summary ids, replay source ids, and background/noise policy;
6. timestep, precision, tolerance, global error budget, stage-level error budgets, and halt diagnostics;
7. diagnostic status and value-authority status for solver outputs, app-facing projections, display-only layers, missing error budgets, exceeded error budgets, and fail-closed values;
8. frame-buffer or playback dataset handles;
9. validation status and claim level.

## Pass/Fail Conditions

The first app design pass should fail closed if any of these occur:

1. an implementation path requires a new production solver;
2. architrino physical mass is introduced as an input or explanatory field;
3. T3 image cubes are treated as duplicate architrino populations;
4. wrapped wake rows omit winding labels;
5. subthreshold wakes are silently discarded instead of routed to background/noise rows;
6. path-history depth is insufficient but receiver acceleration is still displayed as authoritative;
7. JavaScript reference behavior is presented as production behavior;
8. an error budget is missing or exceeded while affected values are still displayed as authoritative;
9. outbound face replay is used as branch evidence or as a substitute for retained wake rows;
10. a candidate T3 run is described as proof of AAA ontology without same-record retained evidence.

## Next Exact Proof/Build Burden

The next exact burden is to define `t3-app-dataset-manifest.v1` so app-facing runs can record topology, simulation envelope, initial conditions, current-state frames, trajectory/path-history sources, native bridge status, diagnostic status, value authority, explicit wake-history gap rows, winding-label status, outbound-face replay status, error budget, wake-row conservation status, and local-pre-wrap versus global-periodic-wrap evidence status.

The manifest must use this requirement classification vocabulary when a value is not yet fully native-backed:

| Status | Meaning |
| --- | --- |
| `native-backed-now` | Existing native central solver path can emit the required data. |
| `bridge-schema-gap` | Native behavior may exist or be feasible, but the app bridge lacks the field or handle. |
| `native-capability-gap` | The native central solver needs a new capability. |
| `manifest-gap` | The run can execute, but the app-readable manifest or dataset contract is missing. |
| `display-only` | The app may visualize it, but it is not solver authority or proof evidence. |

Only after that audit should implementation move into app code.
