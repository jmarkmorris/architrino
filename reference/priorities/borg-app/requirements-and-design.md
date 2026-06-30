# Borg App Requirements and Design

## Purpose

The app lets the operator build, run, inspect, and replay finite simulation windows that approximate an unbounded architrino universe with controlled scale and initial conditions. The first target is a bounded 3D window whose outbound face statistics can generate statistically matched inbound architrinos and wake history. Solver diagnostics must remain explicit about what is retained, replayed, display-only, or fail-closed.

The app is a design target until native-backed runs and retained same-record evidence exist.

## Non-Negotiable Boundaries

1. The native central solver is the production solver for architrino motion, causal roots, delayed hits, path histories, wake history, simulation-window stepping, and solver-owned geometry.
2. The app must not create a new production solver, parallel solver stack, app-local solver, or alternate default engine.
3. JavaScript-only paths may exist only as explicitly named `reference`, `fallback`, `test`, fixture, or comparison code.
4. Architrino primitives do not have physical mass. If the app exposes a numerical integration scalar, it must label it as `integrationWeight` / `integrationWeights`, not physical mass.
5. The app must model architrino primitives directly. Assemblies may appear later only as derived diagnostics or corpus-bound comparison objects, not as the base entity type for this app.
6. App output is candidate-level unless the run binds same-record retained evidence for source histories, receiver histories, causal roots, branch rows, wake rows, and diagnostics.

## Simulation Window Boundary Model

The first app model is a finite cubic simulation window embedded in an unbounded-universe approximation. The native solver should calculate an outer cubic window, while the default viewport displays and interprets an interior central cube. The outer computed cube is where face-boundary rows live. The interior cube is the primary observation region.

The boundary rule is statistical: record the face statistics of outbound architrinos and wakes at the outer computed cube, characterize those statistics, and introduce statistically matched inbound architrinos and wake histories on those outer faces. This is an approximation policy for a local window inside an unbounded universe. It must be visibly distinct from exact retained path history or same-record wake evidence.

An exiting architrino contributes to an outbound face row. A later inbound architrino generated from face statistics is a boundary-generated architrino with reduced value authority unless the manifest explicitly binds it to retained external path history. Likewise, an inbound wake history generated from face statistics is background/replay input, not a retained wake row and not branch evidence.

The viewport should render the central cube as the operator-facing 3D cube of architrinos. The cube has no visible walls or filled faces; it is indicated only by a faint wireframe of the twelve cube edges. The app may expose the outer computed cube as a diagnostic overlay, but it should not be the default visual object. When an architrino crosses an outer computed face, it contributes to the face-boundary statistics. Statistically matched inbound architrinos may enter through any outer face according to the declared boundary policy, but the app must not depict that as the same identity returning through another face.

## Central Volume Observation Rule

The primary measured region is a declared `centralVolume` inside the outer computed window. The app should be designed so the operator observes the central volume while face-boundary reconstruction remains a boundary condition, not the object being interpreted.

Boundary-generated inbound architrinos are new architrinos. They may carry reconstructed wake history sampled from statistically similar outbound wake rows, but that reconstructed wake history has `boundary-generated-value` authority unless the manifest binds retained external path history. This distinction is required even when the boundary replay is numerically useful.

The simulation envelope must declare a buffer margin from the central volume to the outer computed cube faces:

$$
b_{\mathrm{face}}(\mathcal C)
=
\min_{\mathbf x\in \mathcal C}
\operatorname{dist}(\mathbf x,\partial\Omega_{\mathrm{calc}}),
$$

where $\mathcal C$ is the central volume and $\partial\Omega_{\mathrm{calc}}$ is the boundary of the outer computed cube.

The strict central-volume buffer target is:

$$
b_{\mathrm{face}}(\mathcal C)
\ge
\max\left(c_f h,\ v_{\max}T_{\mathcal C}\right),
$$

where $c_f h$ is `wakeHorizon`, $v_{\max}$ is the declared or measured velocity bound for architrinos that could affect the central volume, and $T_{\mathcal C}$ is the central-volume observation interval. If the run cannot declare or measure $v_{\max}$, it cannot claim strict central-volume buffer status. It may still use statistical boundary replay, but central-volume values require the residual test below.

Central-volume acceleration or wake-background values may be displayed as authoritative only when the face-boundary residual is inside the declared central-volume tolerance:

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
}
\le
\tau_{\mathcal C}.
$$

If no reference or bound is available, the central-volume result must carry `missing-error-budget` or `fail-closed-value`. If the residual exceeds $\tau_{\mathcal C}$, the run may still be useful for visual exploration, but it cannot claim that face-boundary activity is of no matter for the observed central volume.

## Scale Controls

The app should expose scale as a declared simulation envelope, not as cosmetic zoom.

| Control | Meaning | Solver-facing obligation |
| --- | --- | --- |
| `sideLength` | Outer computed cube side length $L_{\mathrm{calc}}$ | Enters boundary crossing, face statistics, distance, and causal-root search inside the retained window. |
| `scaleFactor` | Operator-controlled scaling from model units to display or campaign units | Recorded in the run manifest; does not change ontology by itself. |
| `centralArchitrinoCount` | Target number of primitive architrinos in the displayed central cube | Main population count for central-volume interpretation and first-screen readability. |
| `architrinoCount` | Total number of primitive architrinos in the outer computed cube | Derived from `centralArchitrinoCount`, `centralVolumeSideLength`, and `faceBufferMargin`; drives solver cost, pair pressure, path streams, and wake-history pressure. |
| `bufferArchitrinoCount` | `architrinoCount - centralArchitrinoCount` | Exterior computed population used to protect the central cube from face effects. |
| `electrinoCount` / `positrinoCount` | Requested polarity inventory for the initial condition | Must map to explicit per-architrino polarity or composition rows; native numerical encodings are implementation details. |
| `duration` | Simulated time span | Determines required path-history depth and storage. |
| `timeStepPolicy` | Fixed, adaptive, or solver-selected stepping policy | Must be part of the native solver model contract. |
| `historyDepth` | Active causal-history time window $h$ | Measured in time; must be enough to support requested wake/root queries or fail closed. |
| `wakeHorizon` | Wake travel length $c_f h$ corresponding to `historyDepth` | Measured in length; determines whether wakes can reach the simulation-window faces inside the retained history. |
| `wakeFloor` | Declared threshold below which wakes are not retained as resolved rows | Must route to background/noise rows rather than silent truncation. |
| `boundaryMode` | Local window or statistical face boundary | Must determine whether outbound/inbound face rows are required in displayed rows. |
| `centralVolume` | Declared interior observation region $\mathcal C$ | Main displayed region for interpretation; diagnostics outside it must not silently upgrade central-volume status. |
| `centralVolumeSideLength` | Side length $L_{\mathcal C}$ of the displayed interior cube when $\mathcal C$ is cubic | Must be smaller than `sideLength` unless the run intentionally has no buffer. |
| `faceBufferMargin` | Minimum distance $b_{\mathrm{face}}(\mathcal C)$ from the central volume to the outer computed faces | Must satisfy the strict central-volume buffer target or trigger boundary-to-central residual validation. |
| `centralBoundaryTolerance` | Declared tolerance $\tau_{\mathcal C}$ for face-boundary influence on the central volume | Required before central-volume values can be presented as inside the declared boundary-influence budget. |

`historyDepth` and `wakeHorizon` must not be collapsed into one UI field. `historyDepth` is the retained time window, while `wakeHorizon = c_f h` is the corresponding length scale. If `wakeHorizon` is small compared with `faceBufferMargin`, the central volume can be interpreted as local with respect to retained wakes, subject to the velocity-bound term above. If `wakeHorizon` is comparable to or larger than `faceBufferMargin`, face-boundary diagnostics, outbound face statistics, inbound replay policy, and wake-background status become relevant for central-volume interpretation.

The app may provide visual zoom independently, but visual zoom must not change `sideLength`, `centralVolumeSideLength`, causal speed, history depth, or solver precision unless the operator explicitly changes the simulation envelope.

## Initial Conditions

The app should support several initial-condition families while preserving explicit architrino identities:

| Family | Required fields | Claim limit |
| --- | --- | --- |
| `random` | Seed, count, electrino/positrino mix, position distribution, velocity policy | Exploration only until repeated under declared seeds and diagnostics. |
| `lattice` | Grid dimensions, spacing, jitter, electrino/positrino mix, velocity policy | Geometry diagnostic, not evidence for crystalline ontology. |
| `clustered` | Cluster centers, spreads, counts, electrino/positrino mix, velocity policy | Candidate stress test for wake/root density. |
| `explicit` | Per-architrino position, velocity, identity, and optional path segment input | Best first path for reproducible fixtures. |
| `imported` | Manifest id, schema version, source hash, units, and scale normalization | Must preserve source provenance and schema version. |

The first launch preset should be `random`: architrinos scattered randomly in the cube, with a 50/50 electrino/positrino mix and random velocities. The preset is an editable starting point, not evidence for a physical ensemble. With velocity rays off by default, the first design target may start at 256 architrinos in the displayed central cube. The app should still expose 32, 128, 256, and 512 as first central-count presets; 128 is the conservative fallback until native throughput is measured, 256 is the preferred first-screen central-count target, and 512 is a solver-throughput stress preset for the displayed central cube. Larger central counts are gated by measured native-solver and rendered-viewport performance.

### Population Count From Central Cube To Outer Cube

The displayed architrino count and the solver architrino count are different once the solver calculates an outer computed cube. The app should let the operator choose the central cube count first, then derive the outer computed count from the central number density and the buffer margin.

For a cubic central volume with side length $L_{\mathcal C}$ and central target count $N_{\mathcal C}$, define the central number density

$$
\rho_{\mathcal C}
=
\frac{N_{\mathcal C}}{L_{\mathcal C}^3}.
$$

If the outer computed cube has side length

$$
L_{\mathrm{calc}}
=
L_{\mathcal C}
+
2b_{\mathrm{face}}(\mathcal C),
$$

then the solver target count is

$$
N_{\mathrm{calc}}
=
\left\lceil
\rho_{\mathcal C}L_{\mathrm{calc}}^3
\right\rceil
=
\left\lceil
N_{\mathcal C}
\left(
1+\frac{2b_{\mathrm{face}}(\mathcal C)}{L_{\mathcal C}}
\right)^3
\right\rceil.
$$

The central displayed count is not the total solver count. It is the expected count inside $\mathcal C$ after the exterior buffer is excluded from interpretation. For the first design target, $N_{\mathcal C}=256$ is the preferred displayed count and $N_{\mathrm{calc}}$ is derived from the chosen buffer.

First useful buffer multipliers for $N_{\mathcal C}=256$ are:

| Buffer ratio $b_{\mathrm{face}}(\mathcal C)/L_{\mathcal C}$ | Outer side multiplier | Solver target count $N_{\mathrm{calc}}$ |
| --- | --- | --- |
| $0.25$ | $1.5$ | $864$ |
| $0.5$ | $2$ | $2048$ |
| $1$ | $3$ | $6912$ |
| $2$ | $5$ | $32000$ |

The app should display both counts:

| Count | Meaning | Claim rule |
| --- | --- | --- |
| `centralArchitrinoCount` | Architrino count targeted inside the displayed central cube. | This is the visible count for central-volume interpretation. |
| `architrinoCount` | Total architrino count requested for the outer computed cube. | This drives solver cost, path-history pressure, and wake-history pressure. |
| `bufferArchitrinoCount` | Difference `architrinoCount - centralArchitrinoCount`. | This is computed exterior population, not the primary observation set. |

Central-cube counts are interpretable only after exterior face effects are excluded by the strict central-volume buffer target or by a passing $R_{\mathrm{boundary\to central}}$ residual. If neither condition is available, the central count may still be displayed as the staged interior population, but central-volume acceleration and wake-background claims must fail closed.

No initial-condition editor should ask the operator for architrino physical mass. The initial-condition editor must expose the requested electrino/positrino inventory directly. The operator should be able to set the central architrino count, see the derived outer computed count, and set the mix as exact counts, a ratio, or a percentage view, with the manifest preserving the resolved per-architrino polarity assignment across both the central cube and the buffer population.

Velocity initialization needs first-class controls rather than a single random-speed knob:

| Velocity policy | Required behavior | Status |
| --- | --- | --- |
| `zero` | Set every initial velocity vector to zero. | Native-backed once emitted in the initial-condition manifest. |
| `scale-mix` | Assign a controlled mixture of speed scales and directions, with exact seed, scale bands, and distribution parameters recorded. | Exploration policy until the manifest records the generated vectors. |
| `explicit` | Set each architrino velocity vector directly. | Best path for reproducible fixtures. |
| `drift-v` | Assign a shared velocity vector or grouped velocity vectors to selected architrino groups. | Initial-condition editing mode, not a branch group-velocity claim. |

The launch-state editor should include a `custom` mode. In `custom` mode, the operator starts from any generated or explicit initial condition, then directly edits the staging state before running: click-drag an architrino to change its position, and click-drag the endpoint of its velocity ray to resize and reorient its initial velocity vector. These edits must update exact numeric fields and keep the run in a pending initial-condition state until the native solver accepts the run request.

## Path-History Retention

Path history means the recorded source and receiver motion needed to replay where each architrino was when a causal root, delayed hit, or wake row was formed.

| Record | Required fields |
| --- | --- |
| Current state | `architrinoId`, position, velocity, acceleration, face status, time, step index, status. |
| Segment row | Path id, segment id, time bounds, endpoint states or segment coefficients, interpolation law, numeric precision, error budget. |
| Active window | Hot in-memory path range used for ongoing root and wake solving. |
| Spill manifest | Chunk ids, path id ranges, time ranges, byte offsets, checksums, units, scale normalization, schema version. |
| Replay index | Fast lookup for path id, time range, frame range, and root/wake consumers. |

The app should render trails and playback from these records, but the authoritative data is the solver-owned path stream and manifest.

## Wake-History Retention

Wake history means the retained causal influence rows generated by source path history and consumed by receiver motion or diagnostics.

| Record | Required fields |
| --- | --- |
| Resolved wake row | Wake row id, source architrino id, receiver architrino id, source path id, receiver path id, emission time, hit time, causal-root id, residual, branch row id when applicable, wake strength, face-boundary status, status. |
| Background/noise row | Threshold, aggregation interval, source population, receiver population or region, omitted resolved-row count, aggregate magnitude, claim-level downgrade. |
| Boundary-generated row | Face id, time bin, source summary id, sampling seed, inbound source policy, inbound wake policy, value authority, error budget. |
| Failure row | Missing path history, unresolved root, insufficient history depth, missing face summary, precision failure, branch-row mismatch, or simulation-envelope overflow. |

Silent wake truncation is not allowed. If the requested scale makes individual wakes smaller than the declared `wakeFloor`, the run must record that boundary as a background/noise row with a claim-level downgrade.

### Borg Wake-History Row

The first resolved wake-history row schema is `borg-wake-history-row.v1`. It is a retained row, not a visualization shell. A displayed wake stream, acceleration contribution, face-boundary label, or selected wake diagnostic must trace back to this row or to an explicit background/noise, boundary-generated, or failure row.

| Field | Required content |
| --- | --- |
| `schema` | `borg-wake-history-row.v1`. |
| `wakeRowId` | Stable row id unique inside the run manifest. |
| `runId` | Source run id. |
| `sourceArchitrinoId` | Source architrino identity. |
| `receiverArchitrinoId` | Receiver architrino identity. |
| `sourcePathId` | Solver-owned source path-history id. |
| `receiverPathId` | Solver-owned receiver path-history id. |
| `sourceSegmentId` | Source path segment used by the causal-root solve. |
| `receiverSegmentId` | Receiver path segment used by the causal-root solve. |
| `emissionTime` | Source time $t_0$. |
| `hitTime` | Receiver time $t$. |
| `fieldSpeed` | Causal field speed $c_f$ used by the row. |
| `sideLength` | Simulation-window side length $L$ used by the row. |
| `faceBoundaryLabel` | Face label and direction when the row depends on outbound or inbound boundary statistics; null for retained local rows. |
| `sourcePositionAtEmission` | Source position at $t_0$ in the active simulation-window chart. |
| `receiverPositionAtHit` | Receiver position at $t$ in the active simulation-window chart. |
| `boundarySourceSummaryId` | Face-statistics summary id when the source is boundary-generated; null for retained local source history. |
| `causalRootId` | Root-ledger or causal-root row id. |
| `rootResidual` | Residual of the causal-root equation. |
| `wakeStrength` | Solver-owned wake strength or acceleration contribution before display transforms. |
| `receiverAccelerationContribution` | Vector contribution to receiver acceleration when the solver emits row-resolved acceleration. |
| `branchRowId` | Branch row id when a branch diagnostic depends on this wake row; otherwise null. |
| `evidenceStatus` | `retained-local-evidence`, `boundary-generated-value`, `display-only-visualization`, or `fail-closed-value`. |
| `valueAuthority` | Diagnostic status for the row value, using the app value-authority vocabulary. |
| `errorBudget` | Row-level root, wake-strength, boundary replay, and acceleration-contribution error bounds. |
| `rowStatus` | Retained, background-ineligible, boundary-generated, insufficient history depth, exceeded error budget, missing face-boundary summary, or another first-failure status. |

### Retained Local And Boundary-Generated Evidence Split

The app must separate retained local evidence from boundary-generated values.

| Evidence status | Admission rule | Claim limit |
| --- | --- | --- |
| `retained-local-evidence` | Same-record source and receiver path history exists inside the active window; the causal root is solved inside the declared `errorBudget`; and the row does not depend on statistical boundary replay. | Supports local simulation-window diagnostics only. It does not prove the external unbounded universe state. |
| `boundary-generated-value` | The value is generated from outbound/inbound face statistics with an explicit face label, summary id, sampling policy, seed, and error budget. | Supports reduced-model boundary input only. It cannot stand in for retained path history, retained wake evidence, branch evidence, or same-record causal-root proof. |
| `display-only-visualization` | The value is drawn only to preview boundary behavior and does not feed acceleration, wake rows, or diagnostics. | Helps inspect possible boundary behavior but has no solver authority. |
| `fail-closed-value` | The run needs boundary interpretation but lacks a required face summary, retained path binding, causal-root row, error budget, replay validation, or row conservation proof. | Blocks authoritative acceleration, branch evidence, retained wake evidence, and unbounded-window claims for the affected receiver, region, or run. |

## Simulation-Envelope Wake Row Rule

Every run must declare a simulation envelope before wake-history or face-boundary output can be interpreted. The envelope is a run-manifest object with at least:

| Field | Meaning |
| --- | --- |
| `sideLength` | Outer computed cube side length $L_{\mathrm{calc}}$. |
| `historyDepth` | Active causal-history time window $h$. |
| `wakeHorizon` | Wake travel length $c_f h$. |
| `wakeFloor` | Declared per-row wake-strength or acceleration-contribution floor. |
| `errorBudget` | Declared numeric error allowance for root solving, wake-strength evaluation, aggregation, and replay. |
| `boundaryMode` | Local window or statistical face boundary. |
| `centralVolume` | Interior observation region $\mathcal C$. |
| `centralVolumeSideLength` | Displayed interior cube side length $L_{\mathcal C}$ when $\mathcal C$ is cubic. |
| `faceBufferMargin` | Minimum distance $b_{\mathrm{face}}(\mathcal C)$ from $\mathcal C$ to the outer computed faces. |
| `centralArchitrinoCount` | Target count $N_{\mathcal C}$ inside the displayed central cube. |
| `architrinoCount` | Total target count $N_{\mathrm{calc}}$ inside the outer computed cube. |
| `bufferArchitrinoCount` | Computed exterior count $N_{\mathrm{calc}}-N_{\mathcal C}$. |
| `centralVelocityBound` | Declared or measured $v_{\max}$ for architrinos that can affect the central volume during the observation interval. |
| `centralObservationInterval` | Time interval $T_{\mathcal C}$ used by the strict central-volume buffer target. |
| `centralBoundaryTolerance` | Declared $\tau_{\mathcal C}$ for $R_{\mathrm{boundary\to central}}$. |
| `aggregationBins` | Time, face, source population, receiver population, and strength bins used for background/noise rows. |

The app may not display receiver acceleration as authoritative unless every candidate row inside the declared envelope is classified as exactly one of these records:

| Class | Admission condition | Required record |
| --- | --- | --- |
| Resolved wake row | Same-record source and receiver path history exists; the causal root is solved inside `errorBudget`; and the wake contribution is at or above `wakeFloor`, or the selected diagnostic/branch depends on the individual row. | A retained wake row with source id, receiver id, source path id, receiver path id, emission time, hit time, causal-root id, residual, wake strength or acceleration contribution, value authority, and status. |
| Aggregated wake-noise/background row | The individual row is below `wakeFloor`; it is not selected; no branch row, retained record, or selected-object diagnostic depends on that individual row; and the aggregate bin can be bounded inside `errorBudget`. | A background/noise row with threshold, bin definition, omitted-row count, aggregate magnitude, error bound, source population, receiver population or region, face summary when relevant, and claim-level downgrade. |
| Boundary-generated row | The value comes from a declared face-boundary replay source with face id, source summary id, sampling seed, replay policy, and error budget. | A boundary-generated row with reduced value authority and a claim-level downgrade. |
| Failure row | The run cannot prove resolved-row retention, admissible aggregation, or admissible boundary replay. | A fail-closed row with first-failure code, affected receiver or region, missing field or exceeded bound, and value-authority downgrade. |

The classification is exclusive and exhaustive inside the declared envelope:

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

Forbidden silent truncation means:

1. no candidate wake row inside the declared envelope may be dropped without increasing either a resolved-row count, an omitted-row count in a background/noise row, a boundary-generated count, or a failure-row count;
2. a below-floor row may be aggregated only when the row is not selected and is not needed by any retained branch row, same-record binding, or selected-object diagnostic;
3. a missing face-boundary summary in a boundary run is a failure row, not a background/noise row;
4. insufficient `historyDepth` is a failure row for affected receiver acceleration unless the manifest explicitly downgrades that acceleration to display-only or missing-error-budget;
5. face-boundary replay may consume background/noise rows only after its validation row passes; it may not replace retained wake rows or repair missing same-record evidence.

## Face-Boundary Replay

The app should support a candidate unbounded-window boundary experiment: characterize architrino and wake activity crossing the six faces of the simulation-window cube, then introduce statistically similar inbound architrinos and wake-background histories through the faces. This is an approximation policy for unresolved external influence, not a replacement for retained path-history rows, retained wake rows, or same-record evidence inside the active window.

The first schema and validation fixture for this experiment lives in [face-boundary-replay](face-boundary-replay.md). That packet defines `borg-face-summary.v1`, `borg-face-replay-source.v1`, face-summary extraction, statistical replay, and the $R_{\mathrm{face\ replay}}$ pass/fail threshold.

Policy ladder:

1. `retained-window` — preserve retained path-history and wake rows inside the active window; this is the only local path that can support same-record branch evidence.
2. `face-statistics-replay` — introduce statistically similar inbound architrinos and reconstructed wake history for unresolved external influence; value authority is reduced-model boundary input.
3. `display-only-preview` — show possible face noise visually without feeding receiver acceleration or diagnostics; value authority is display-only.

## Boundary-Aware Wake Interpretation

When the active causal-history horizon is small compared with $L$, most retained wakes are local to the active window. When the horizon reaches the face scale, wakes and architrinos can leave the window and external influence must be handled by retained external path history, statistically replayed face rows, or fail-closed diagnostics. The app must make this visible because boundary-generated rows are not the same diagnostic situation as retained local rows.

Required diagnostics:

1. count outbound and inbound architrino face crossings by face and time bin;
2. count resolved wake rows, background/noise rows, and boundary-generated wake rows by face and time bin;
3. show whether a selected receiver acceleration used retained local rows, boundary replay rows, background/noise rows, or a mixture;
4. report first face-crossing time for the run envelope when available;
5. mark rows whose interpretation depends on the statistical boundary policy.

## Acceleration View

The acceleration view should decompose receiver acceleration by retained wake rows, boundary-generated rows, and background/noise rows:

$$
\mathbf a_j(t)
=
\sum_{r\in\mathcal W_j^{\mathrm{resolved}}(t)}
\mathbf a_{j,r}^{\mathrm{wake}}(t)
+
\mathbf a_j^{\mathrm{boundary}}(t)
+
\mathbf a_j^{\mathrm{background}}(t)
+
\mathbf a_j^{\mathrm{unresolved}}(t).
$$

The app may display this decomposition, but it must not promote it to proof evidence unless the same record binds source histories, receiver histories, causal-root rows, wake rows, and solver diagnostics.

## User Interface Design

The app should open on the working simulation surface, not a landing page. The visual design should be minimal, elegant, contemporary, and parsimonious by default: one quiet simulation workspace with restrained controls, clear hierarchy, and no decorative chrome that competes with the simulation state.

Parsimony means the first screen should expose only the controls and statuses needed for the active run interpretation. Required solver state, value authority, error-budget status, wake-history gaps, face-boundary status, and fail-closed diagnostics must remain reachable without turning the default view into a dashboard of every possible row.

Primary regions:

1. 3D simulation-window viewport with faint cube edges, architrino positions, path trails, wake rows, face-boundary rows, and diagnostics.
2. Left control rail for scale, initial conditions, native solver envelope, run controls, and seed/import controls.
3. Bottom timeline for playback, scrubbing, checkpoint selection, and event selection.
4. Right diagnostics rail for selected architrino state, path-history metadata, wake-history rows, acceleration decomposition, face-boundary summary, and failure rows.
5. Export panel for run manifest, checkpoints, frame buffers, path-history streams, wake-history rows, boundary rows, and diagnostics.

The design should be dense and work-focused. Controls should favor exact numeric inputs, sliders for bounded values, toggles for binary flags, segmented controls for display modes, and icon buttons where the action is standard.

Minimal does not mean hiding required state. The default view should keep advanced solver diagnostics collapsed or contextual, but the app must still expose path history, wake history, face-boundary rows, acceleration decomposition, background/noise rows, and failure rows whenever those records affect interpretation.

### Launch State

The app should launch into an initial-condition staging view at the start time, before the simulation is run. The default staging state is the editable `random` preset: architrinos scattered randomly in the cubic simulation window with a 50/50 electrino/positrino mix and random velocities. The visible scene is the simulation-window cube as a faint edge-only wireframe with editable architrino positions. Velocity rays are off by default and available through the layer toggle or selected-object editing. The operator can set the number and mix of electrinos and positrinos, choose a velocity policy, and adjust initial positions, velocities, and simulation-envelope fields before starting the native solver run; those edits are pending initial-condition changes, not path history.

Velocity vectors should render economically as rays from each architrino, without arrowheads. The ray uses the architrino's stable display color, with red/blue reserved for runs that expose an explicit polarity or charge-sign display policy. The first logarithmic magnitude cue should be a lightweight floating exponent label shown on hover, selection, or endpoint drag; for a speed scale near $10^x$, the label displays `x`. The selected-object diagnostics must still show the exact velocity vector, speed, transform type, and value-authority status.

In `custom` staging mode, direct manipulation is part of the initial-condition editor: dragging the architrino point changes initial position, and dragging the velocity-ray endpoint changes initial velocity magnitude and direction. During endpoint drag, the viewport should show the floating order-of-magnitude label for the current ray length or speed scale. The viewport interaction must mirror exact numeric position and velocity inputs in the left rail.

### Visualization Resolution

Visualization resolution is display resolution, not solver resolution. Changing the canvas size, device pixel ratio, antialiasing, or render-scale policy must not change `sideLength`, `architrinoCount`, `historyDepth`, wake-row retention, central-volume diagnostics, or solver precision.

The required output standard is **4K UHD**: 3840 by 2160 pixels. Produced screenshots, captures, review output, and quality-mode app views must meet this resolution. DCI 4K is a different cinema format, 4096 by 2160; the app requirement is UHD 4K at 3840 by 2160.

The app may use adaptive internal render scaling during interactive orbit, zoom, drag, or solver playback only to preserve responsiveness. That adaptive mode is an interaction fallback, not the quality output standard. Any value or image exported, reviewed, or presented as app output must be rendered or up-rendered to 3840 by 2160 and labeled with its render manifest.

The render manifest should record:

| Field | Meaning |
| --- | --- |
| `viewportCssSize` | Logical viewport size used by layout. |
| `renderPixelSize` | Actual drawing-buffer pixel size. |
| `devicePixelRatio` | Device pixel ratio requested by the browser or shell. |
| `renderScale` | App-selected multiplier used to keep interaction responsive. |
| `targetFrameRate` | Requested interactive frame-rate band for the run view. |
| `visualQualityMode` | `interactive-adaptive`, `quality-4k-uhd`, or `capture-4k-uhd`. |

The default first-screen interaction target may be `interactive-adaptive`: keep the sparse launch view responsive with `simulation-window` and `architrino-position` visible, velocity rays off, and 256 architrinos as the preferred design target. The required review and production output target is `quality-4k-uhd` or `capture-4k-uhd` at full 3840 by 2160. Resolution quality is display output and not stronger solver evidence.

### Deployment Budget

The app must measure deployment cost separately from native solver throughput. GitHub Pages serves static files; browser runtime work such as solver playback, WebGL/WebGPU rendering, browser heap use, and browser storage pressure happens on the client device unless a future service backend is introduced.

The first deployment budget should report:

| Budget | Meaning | Must not be confused with |
| --- | --- | --- |
| `bundleSizeBytes` | JavaScript, CSS, HTML, WASM, and app shell transfer size. | Native solver step throughput. |
| `staticAssetTransferBytes` | Textures, generated JSON, scene data, captures, fonts, and other static payloads. | Browser heap after decompression or parsing. |
| `githubPagesBandwidthEstimate` | Expected monthly transfer from Pages based on bundle/assets and visit count. | Client-side compute cost. |
| `browserHeapBudget` | Expected browser heap for active state, manifests, path history, wake rows, buffers, and parsed assets. | GitHub Pages hosting cost. |
| `gpuMemoryBudget` | Expected GPU/WebGL/WebGPU memory for 4K UHD rendering, point buffers, line buffers, trails, wake visualization, and render targets. | Solver numeric authority. |
| `browserStorageBudget` | IndexedDB, Cache Storage, local replay datasets, captures, and downloaded manifests retained by the browser. | Git repository size or Pages published-site size. |
| `actionsArtifactBudget` | CI/review artifacts, generated captures, benchmark output, and logs retained by GitHub Actions. | Pages bandwidth. |
| `nativeSolverThroughput` | Steps, rows, candidates, and retained records per second under the native central solver. | Static hosting or browser rendering pressure. |

The deployment budget must fail closed when the app cannot distinguish static transfer, browser runtime memory, GPU memory, browser storage, GitHub Actions artifacts, GitHub Pages bandwidth, and native solver throughput. A beautiful 4K UHD render does not imply the deployment footprint is acceptable, and a small bundle does not imply solver or browser memory is safe.

## First-Screen Control Layout

The first screen should make camera navigation, viewport layers, and simulation-envelope scale controls physically and visually separate. The operator must not be able to confuse camera zoom with changing the simulation-window side length or solver scale.

| Region | Location | Contents | Boundary |
| --- | --- | --- | --- |
| Viewport camera cluster | Floating inside the 3D viewport, upper right or lower right. | Rotate/orbit, zoom, pan, reset view, fit window, focus selected. | Camera controls change only the rendered viewpoint. They must never edit `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, precision, or solver state. |
| Layer toggle strip | Floating inside the 3D viewport, upper left or top center. | `path-history`, `wake-streams`, `velocity-vectors`, `face-boundary-status`, and `diagnostics` toggles. | Layer toggles change visibility only. They must not create, delete, or recompute solver rows. |
| Simulation-envelope panel | Left control rail, outside the 3D viewport. | `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `centralArchitrinoCount`, derived `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, `boundaryMode`, electrino/positrino mix, velocity policy, `duration`, `timeStepPolicy`, and precision claim controls. | These controls change the requested run envelope or pending initial condition and must show pending, accepted, rejected, or fail-closed status. |
| Exact-value readout | Near the simulation-envelope panel and selected-object diagnostics. | Exact `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `centralArchitrinoCount`, `architrinoCount`, `bufferArchitrinoCount`, camera zoom ratio, `scaleFactor`, `historyDepth`, `wakeHorizon`, selected time, frame index, selected architrino velocity, selected wake strength, diagnostic status, and value-authority status. | Must keep camera zoom and physical simulation scale in separate labeled rows. |
| Timeline rail | Bottom of the screen. | Linear local scrubber, logarithmic overview, current time, frame index, checkpoint id, and playback speed. | Timeline navigation changes playback/readback position only unless the operator explicitly changes the simulation envelope duration. |
| Diagnostics rail | Right side, contextual and collapsible. | Selected architrino state, selected wake row, error budget, diagnostic status, value authority, first-failure codes, and acceleration decomposition. | Diagnostics may explain a value but must not silently upgrade claim level. |

Required separation labels:

1. Camera controls must be labeled `View`.
2. Simulation-envelope controls must be labeled `Simulation envelope`.
3. Camera zoom must be displayed as `view zoom`.
4. Physical/window scale must display outer computed `sideLength`, displayed `centralVolumeSideLength`, and `faceBufferMargin` separately.
5. Model/display scaling must be displayed as `scaleFactor`.
6. `historyDepth` must show time units.
7. `wakeHorizon = c_f h` must show length units.

Interaction rules:

1. Mouse wheel, trackpad pinch, viewport zoom buttons, and fit-view commands control `view zoom` only.
2. Editing `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `centralArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon`, `wakeFloor`, `boundaryMode`, or precision must occur only in the simulation-envelope panel.
3. A changed simulation-envelope or boundary-policy field must enter a pending state until the native solver accepts, reruns, rejects, or fails closed.
4. Layer toggles may reveal path history, wake streams, velocity rays, face-boundary status, and diagnostics without changing run data.
5. Selected-object diagnostics must show both camera-independent solver values and any display transform used by the viewport.

## Logarithmic UI Exploration

The app should explore a logarithmic UI for quantities that naturally span many orders of magnitude. This is a design direction, not a license to hide the underlying run values.

| Surface | Logarithmic use | Required exactness |
| --- | --- | --- |
| Scale | Let the operator move across outer computed side length, displayed central-volume side length, buffer margin, density, and visual scale ranges without huge sliders. | Show exact `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `scaleFactor`, and units beside the control. |
| Velocity rays | Use logarithmic ray length so slow and fast architrinos remain visible together. | Show the selected architrino's raw velocity and the ray scaling rule. |
| Wake strength | Use logarithmic opacity, shell thickness, or legend bins for resolved wake rows. | Show raw wake strength, threshold, and whether the row is resolved, boundary-generated, or background/noise. |
| History depth | Use logarithmic controls for active path-history window and replay duration. | Show exact history depth, storage estimate, and any solver admission warning. |
| Timeline | Allow logarithmic time navigation for long runs while preserving frame-accurate local scrub. | Show current time, frame index, and whether playback is linear or logarithmic. |
| Diagnostics | Group residuals, magnitudes, and event counts by order-of-magnitude bins. | Keep raw diagnostic values available on selection or hover. |

The UI must label transformed displays explicitly: `linear`, `log`, `normalized`, or `display-only`. A logarithmic control may help the operator navigate the run, but it must not change claim level, precision status, or solver diagnostics by presentation alone.

### First Logarithmic UI Prototype Rules

The first logarithmic UI prototype should test four surfaces: scale, velocity rays, wake strength, and timeline navigation. Each surface must show exact solver values beside or inside the interaction path. Logarithmic display is an app-facing projection unless the solver manifest explicitly marks the transformed value as authoritative.

| Surface | Prototype rule | Exact value requirement | Status requirement |
| --- | --- | --- | --- |
| Scale | Use a logarithmic slider or stepper for `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `scaleFactor`, `historyDepth`, and `wakeHorizon` ranges that span many orders of magnitude. The slider label should show powers or order bands, while the adjacent numeric fields hold exact values. | Always show exact `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, and units. | Values that change the simulation envelope must be marked as pending until the native solver accepts or reruns the envelope. |
| Velocity rays | Use logarithmic ray length for viewport readability, with each ray using the architrino's stable color and no arrowhead. Use a floating exponent label as the first magnitude cue during hover, selection, or endpoint drag; for a speed scale near $10^x$, the label displays `x`. | On hover, selection, or endpoint drag, show raw velocity vector, speed magnitude, exponent label, ray scale rule, and whether the ray is linear or logarithmic. | Ray geometry is `app-facing-projection`; the raw velocity remains `authoritative-solver-output` only when its error budget is valid. |
| Wake strength | Use logarithmic opacity, shell thickness, or legend bins for resolved wake rows and background/noise rows. Above-floor retained wake rows must remain visually distinguishable from boundary replay and background/noise. | Show raw wake strength or acceleration contribution, `wakeFloor`, threshold relation, row id, face-boundary status when relevant, and exact diagnostic status. | Resolved retained rows may display as solver-backed; statistical face replay and preview shells must remain reduced-model or display-only. |
| Timeline navigation | Use a dual timeline: a linear local scrubber for frame-accurate playback near the current time and a logarithmic overview for long-run navigation across sparse or dense event regions. | Always show exact time, frame index, selected checkpoint id, playback speed, and whether the active timeline interaction is linear or logarithmic. | Log overview positions are navigation aids; frame reads remain authoritative only when backed by the run manifest and stream index. |

## Viewport Layers

The 3D viewport should use optional layers that can be turned on or off without changing the solver run. Layers are display controls over solver-owned state, path-history streams, wake-history rows, face-boundary rows, and diagnostics.

| Layer | Default | Visual rule | Data dependency |
| --- | --- | --- | --- |
| `simulation-window` | On and locked | Render only the faint wireframe edges of the displayed central cube; do not render walls, panels, or filled faces. | `centralVolume`, `centralVolumeSideLength`, `sideLength`, `faceBufferMargin`, and camera projection. |
| `architrino-position` | On | Render each architrino as a stable colored point or glyph. | Current solver state. |
| `path-history` | Off | Render recent trails with fade or bounded segment count. | Path-history stream and replay index. |
| `wake-streams` | Off | Render expanding causal spheres or shells from retained wake rows; boundary-generated rows must be visually downgraded. | Wake-history rows, emission time, hit time, causal speed, face-boundary status. |
| `velocity-vectors` | Off by default; toggleable in staging and playback | Render each architrino's current velocity as a ray using the same stable color as the architrino, with no arrowhead. Ray length should use logarithmic sizing so slow and fast paths remain legible together. | Current velocity, scale normalization, timestep policy. |
| `face-boundary-status` | Contextual | Label outbound/inbound face rows without cluttering local-only views. | Face-boundary rows. |
| `diagnostics` | Contextual | Surface halt status, failure rows, background/noise rows, boundary-generated rows, unresolved rows, and claim-level downgrades near the selected object or run summary. | Solver diagnostics and run manifest. |

Velocity rays need a visual cue for magnitude beyond length alone, but persistent markings on every ray may be too busy. The first design should test a floating exponent label on the active ray only. Persistent ray markings are not part of the first app idea.

## First-Screen Layer Control Layout

The first-screen layer controls should keep the workspace minimal by default while making richer path, wake, velocity, face-boundary, and diagnostic layers one click away. The layer strip belongs inside the 3D viewport, but it must remain visually lighter than the simulation state.

| Layer | First-screen state | Control placement | Selected-object behavior |
| --- | --- | --- | --- |
| `simulation-window` | On and locked in the first prototype. | Shown as a small cube-boundary icon in the layer strip, with lock state visible; the viewport renders the central cube edges only by default, with no cube walls. | Selection reports `sideLength`, `centralVolumeSideLength`, `faceBufferMargin`, `view zoom`, `scaleFactor`, and boundary mode in the diagnostics rail. |
| `architrino-position` | On. | First visible toggle in the layer strip; cannot be hidden while no other position-bearing layer is visible. | Selecting an architrino opens a compact viewport tag with id, diagnostic status, and speed; full state appears in the diagnostics rail. |
| `path-history` | Off. | Toggle in the layer strip, with a small history-depth indicator. | Selecting a path segment shows segment time bounds and value authority in the compact tag; interpolation/error details remain in the diagnostics rail. |
| `wake-streams` | Off. | Toggle in the layer strip, with a retained/background/boundary split in the layer menu. | Selecting a wake shell shows wake row id, source/receiver ids, face-boundary status, and authority; residual and threshold details remain in the diagnostics rail. |
| `velocity-vectors` | Off by default; toggleable in staging and playback. | Toggle in the layer strip, with a logarithmic-scale marker when enabled. | Selecting a ray shows raw speed, transform type, and ray scale rule; vector components remain in the diagnostics rail. |
| `face-boundary-status` | Contextual and off for local-only runs. | Toggle is disabled or subdued when no outbound/inbound face rows exist. | Selecting a face-boundary label focuses the related wake/path row and shows whether it is retained local, boundary-generated, or display-only. |
| `diagnostics` | Contextual. | Toggle opens or pins diagnostics overlays; default state shows only selected-object tags and fail-closed alerts. | Selected-object diagnostics appear first as compact tags; detailed tables live in the right diagnostics rail. |
| `outbound-face-background` | Off. | Nested under `wake-streams` or diagnostics until a run includes outbound face summaries. | Selecting a face summary shows summary id, face id, replay authority, and $R_{\mathrm{face\ replay}}$ status when available. |

The default visible stack for launch is `simulation-window` and `architrino-position`. The default contextual stack is selected-object tags plus fail-closed alerts. Velocity rays, path history, wake streams, face-boundary status, outbound-face background, and full diagnostics start behind toggles so the first screen remains quiet.

Boundary display is part of the `architrino-position` layer: an architrino crossing an outer computed face contributes to the face-boundary rows. Inbound architrinos generated by the boundary policy enter through outer computed faces as boundary-generated rows with reduced value authority unless retained external path history is present. The central cube remains the default visible region.

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

The 3D viewport must support rotation and zoom so the operator can inspect paths, wakes, face-boundary rows, and velocity vectors from arbitrary angles.

| Control | Requirement | Boundary |
| --- | --- | --- |
| Rotate | Orbit the camera around the selected view center or selected architrino. | Rotation changes only the camera orientation, not solver state. |
| Zoom | Move the camera closer or farther, with smooth wheel, trackpad, and button controls where practical. | Zoom changes only the view scale, not `sideLength`, `scaleFactor`, causal speed, or solver precision. |
| Pan | Translate the camera target across the viewport. | Pan must not shift the simulation origin or face-boundary records. |
| Reset view | Return to the canonical cube orientation and default zoom. | Reset is a display command, not a rerun. |
| Fit window | Frame the displayed central cube and active visible layers. | Fit must respect the current layer toggles and not alter solver output. |
| Focus selected | Center the camera on a selected architrino, wake row, path segment, or diagnostic row. | Focus should expose the selected object's source data and claim level. |

The interface should make the difference between visual zoom and simulation scale explicit. Changing the outer computed side length, central-volume side length, buffer margin, scale factor, history depth, wake floor, or precision belongs in the simulation envelope controls, not the viewport camera.

## Error Budget and Value Authority

The app must make error budget visible enough that a visualization cannot be mistaken for higher-confidence evidence than the solver produced. An error budget is the declared and reported allowance for numerical error across a run or stage. Value authority states whether a value is authoritative solver output, an app-facing projection, a display-only visualization, or a halted/invalid value.

| Surface | Required fields | UI rule |
| --- | --- | --- |
| Run summary | Global error budget, selected precision path, tolerance policy, numeric chart, scale normalization, claim level, and halt status. | Always available in the run diagnostics summary. |
| Stage summary | Motion integration, causal-root solving, wake-row construction, path-history interpolation, stream readback, face-boundary replay, and display projection error states where available. | Collapsed by default, expanded from diagnostics. |
| Selected architrino | Current state authority, position/velocity/acceleration error state, path-history segment error, and relevant solver status. | Shown in selected-object diagnostics. |
| Selected wake row | Causal-root residual, hit-time error state, wake-strength error state, face-boundary status, threshold relation, and row authority. | Shown when a wake stream, shell, or acceleration contribution is selected. |
| Logarithmic display | Raw value, transformed value, transform type, and whether the transform is authoritative or display-only. | Shown in hover, legend, or selected-object panel. |
| Failure or downgrade | First-failure code, exceeded budget, unresolved field, and claim-level downgrade. | Must be visible without hunting through raw exports. |

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

Every run should produce a `borg-dataset-manifest.v1` manifest; see [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md). The manifest records:

1. model contract and native solver version;
2. simulation-window topology fields and scale envelope;
3. initial-condition source and seed/import source id;
4. path-history stream ids and spill policy;
5. wake-history row ids, face summary ids, replay source ids, and background/noise policy;
6. timestep, precision, tolerance, global error budget, stage-level error budgets, and halt diagnostics;
7. diagnostic status and value-authority status for solver outputs, app-facing projections, display-only layers, missing error budgets, exceeded error budgets, and fail-closed values;
8. frame-buffer or playback dataset handles;
9. validation status and claim level.

## Pass/Fail Conditions

The first app design pass should fail closed if any of these occur:

1. an implementation path requires a new production solver;
2. architrino physical mass is introduced as an input or explanatory field;
3. boundary-generated architrinos are treated as retained identities without retained external path history;
4. boundary-generated wake rows omit face-boundary source summaries;
5. subthreshold wakes are silently discarded instead of routed to background/noise rows;
6. path-history depth is insufficient but receiver acceleration is still displayed as authoritative;
7. JavaScript reference behavior is presented as production behavior;
8. an error budget is missing or exceeded while affected values are still displayed as authoritative;
9. face-boundary replay is used as branch evidence or as a substitute for retained wake rows;
10. the app lacks a declared `centralVolume` but presents central-volume conclusions;
11. the app collapses outer computed `sideLength`, displayed `centralVolumeSideLength`, and `faceBufferMargin` into one visual scale;
12. the app treats `centralArchitrinoCount` as the total solver `architrinoCount` after a nonzero `faceBufferMargin` is declared;
13. $b_{\mathrm{face}}(\mathcal C)<\max(c_fh,\ v_{\max}T_{\mathcal C})$ while central-volume values are still presented as satisfying the strict central-volume buffer target;
14. $R_{\mathrm{boundary\to central}}>\tau_{\mathcal C}$ while central-volume values are still displayed as inside the declared boundary-influence budget;
15. a candidate run is described as proof of AAA ontology without same-record retained evidence.

## Next Exact Proof/Build Burden

The next exact burden is `app_surface_design`: consume `borg-first-native-backed-fixture` from [build-first-native-backed-fixture.mjs](../../../scripts/borg/build-first-native-backed-fixture.mjs) in the first Borg screen or screen-spec artifact. The consumer must display the outer/central cube split, native current-state frames, path-history availability, diagnostic status vocabulary, fail-closed wake-history gaps, fail-closed face-boundary gaps, deployment budget placeholders, and the 4K UHD render manifest placeholder. It must not promote wake streams, face-boundary replay, benign-noise status, or central-volume acceleration beyond the manifest's value authority and error-budget status.
