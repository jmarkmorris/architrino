# Native T3 Bridge Audit and First Screen

## Purpose

This packet audits the current native T3 bridge against the T3 app requirements and identifies the smallest elegant first-screen design that still exposes scale, initial conditions, path history, wake history, winding labels, and fail-closed diagnostics.

The audit is priority-design material. It does not promote T3 app output to proof evidence, and it does not authorize a new solver.

## Sources Inspected

| Source | Audit use |
| --- | --- |
| [requirements-and-design](requirements-and-design.md) | T3 app requirements, first-screen layout, layer defaults, logarithmic UI, diagnostic status vocabulary. |
| [outbound-face-wake-replay](outbound-face-wake-replay.md) | Outbound face wake summary and replay fixture requirements. |
| [T3CentralSolverEngine](../../../src/solver/t3/T3CentralSolverEngine.mjs) | Current app-side T3 central solver request/response shape. |
| [T3UniverseSimulator](../../../src/solver/t3/T3UniverseSimulator.mjs) | Current T3 simulator config, run summary, checkpoint, trajectory frame, and solver integration. |
| [T3Topology](../../../src/solver/t3/T3Topology.mjs) | Periodic cube topology, side length, scale factor, nearest-image geometry, image offsets. |
| [T3InitialConditions](../../../src/solver/t3/T3InitialConditions.mjs) | Current random, lattice, clustered, explicit, and imported initial-condition support. |
| [T3Visualization](../../../src/solver/t3/T3Visualization.mjs) and [T3CanvasVisualizationRuntime](../../../src/solver/t3/T3CanvasVisualizationRuntime.mjs) | Current 2-D visualization frame, trail, velocity-vector, density, and statistics support. |
| [T3BulkStep.hpp](../../../src/solver/include/architrino/solver/T3BulkStep.hpp), [T3BulkStep.cpp](../../../src/solver/src/T3BulkStep.cpp), and [SolverAppBridge](../../../src/solver/app/SolverAppBridge.mjs) | Native C++ T3 step rows, unresolved-root candidate rows, retained replay placeholder rows, and bridge readback. |
| [run-t3-universe-simulator](../../../scripts/solver/run-t3-universe-simulator.mjs) | Current CLI run surface and output artifacts. |
| [t3-universe-simulator.test](../../../tests/t3-universe-simulator.test.js) and [check-solver-app-bridge](../../../scripts/check-solver-app-bridge.mjs) | Existing evidence for periodic wrapping, native bridge stepping, and fail-closed unresolved-root sidecar behavior. |

## Capability Classification

| Requirement area | Status | Current evidence | Gap or design consequence |
| --- | --- | --- | --- |
| Native central solver only | `native-backed-now` | `T3UniverseSimulator` defaults `solver.engine` to `solver`; `T3CentralSolverEngine` requires `solverClient.stepT3UniverseF64`; CLI requires an existing WASM loader for solver mode. | Keep app implementation on the existing central bridge. Do not add app-local solver logic. |
| Periodic T3 topology | `native-backed-now` | `T3Topology` supplies `baseUnitLength`, `scaleFactor`, `sideLength`, wrapping, image offsets, nearest-image displacement, and nearest-image distance. Native step wraps output positions and emits `imageDelta`. | The app can show the fundamental-domain cube, image offsets, and local nearest-image wrap status now. |
| 3 by 3 by 3 cover identity semantics | `display-only` | Topology treats images through wrapping and image offsets, not duplicate particles. | The cover view is a display projection over one identity set, not a second simulated population. |
| Scale controls | `manifest-gap` | Config accepts `sideLength`, `baseUnitLength`, and `scaleFactor`. Solver request sends `sideLength`, timestep, signal speed, and root tolerance. | `sideLength` and `scaleFactor` are native-backed fields, but the complete scale-control requirement also needs manifest-owned `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, and `wrapMode`. |
| Initial conditions | `native-backed-now` | Current code supports random, lattice, clustered, explicit particles, imported state, seed, stationary/random/gaussian/explicit velocities, ids, electrine fraction, and T3 `integrationWeight` / `integrationWeights` as numerical integration scalars. | First screen can expose these controls. It must not expose architrino physical mass; any numerical integration scalar must stay labeled as `integrationWeight`. |
| Current architrino state | `native-backed-now` | State carries ids, positions, velocities, accelerations, image offsets, time, and step index. Native rows return position, velocity, acceleration, and image delta. | First screen can show architrino positions, velocity arrows, selected current state, and image-offset diagnostics. |
| Path history | `native-backed-now` for bounded trajectory/trail frames; `bridge-schema-gap` for solver-owned durable streams in T3 simulator | `T3Visualization` can keep bounded trails; `T3Serialization` emits trajectory frames with positions, velocities, image offsets; shared bridge has path-history stream methods. | First screen can show recent trails and trajectory playback as app-facing projection. Durable path-history stream handles, active window metadata, spill manifests, and replay indices are not integrated into the T3 simulator manifest yet. |
| Wake history rows | `native-capability-gap` | Native T3 can emit unresolved-root segment sidecar rows and retained replay placeholder rows, but row status is candidate shape evidence and retained replay source fields are missing. | First screen may show wake controls disabled or display-only until resolved wake rows exist. It must not show wake streams as authoritative. |
| Winding labels for wake rows | `native-capability-gap` | Particle image deltas exist; wake-row winding vectors do not. The unresolved-root sidecar does not carry `windingLabel` or accepted retained causal-root fields. | First screen may show particle image offsets now. Winding labels for wake rows must remain disabled, contextual, or fail-closed until bridge rows carry them. |
| Receiver acceleration decomposition by wake rows | `native-capability-gap` | Native step returns total acceleration and soft-sphere neighbor summary, not acceleration contributions bound to retained wake rows/background rows. | First screen can show total acceleration for selected architrinos. Wake/background decomposition must be marked unavailable. |
| Outbound face wake replay | `native-capability-gap` and `manifest-gap` | No native or bridge rows currently emit `t3-outbound-face-summary.v1`, replay source rows, or $R_{\mathrm{face\ replay}}$. | First screen can reserve the outbound-face background layer, but it starts off and disabled unless a later manifest includes face summaries. |
| Error budget and diagnostic status vocabulary | `manifest-gap` | Native rows expose tolerance and some error bounds on unresolved-root segment rows; general bridge has precision/value-authority concepts; T3 run summary does not yet emit the app diagnostic status vocabulary. | First screen must show `missing-error-budget` or `fail-closed-value` for values without manifest-backed error budget. |
| 3-D rotate and zoom | `display-only` | Current T3 canvas renderer is 2-D projection-based. | First screen design should target a 3-D viewport, but the current renderer is not that app. Camera controls are display-only and separate from simulation scale. |
| Layer toggles | `display-only` | Current canvas renderer has booleans for velocity vectors, density map, trails, and statistics. It does not implement the first-screen layer strip or diagnostic status rules. | First screen can reuse the idea but needs a new app-surface layer controller. |
| Logarithmic UI | `display-only` | Current velocity vectors use a linear `velocityScale`; no logarithmic controls or legends are present. | Logarithmic scale, velocity, wake, and timeline controls are first-screen design requirements, not current runtime behavior. |
| Dataset manifest | `manifest-gap` | CLI writes config, metadata, statistics, checkpoint, and trajectory JSON/JSONL. It does not emit app-readable dataset handles for path-history streams, wake rows, outbound-face summaries, diagnostic status, or value authority. | The next implementation artifact should be the dataset manifest contract. |

## Requirement-by-Requirement Classification

This matrix classifies the requirements in [requirements-and-design](requirements-and-design.md) using only the requested audit statuses: `native-backed-now`, `bridge-schema-gap`, `native-capability-gap`, `manifest-gap`, and `display-only`.

| Requirement | Classification | Native bridge evidence | Required consequence |
| --- | --- | --- | --- |
| Native central solver is the production path. | `native-backed-now` | `T3UniverseSimulator` defaults `solver.engine` to `solver`; `T3CentralSolverEngine` rejects missing `solverClient.stepT3UniverseF64`. | Keep all production stepping on the existing central solver bridge. |
| No new production solver or app-local solver. | `native-backed-now` | Solver mode calls `stepT3UniverseF64`; JavaScript `reference` engine is explicit and separate. | App implementation must consume native results or fail closed. |
| JavaScript-only paths named reference, fallback, test, fixture, or comparison. | `native-backed-now` | `referenceActionSolver` is selected only by `solver.engine === "reference"`; tests use fake clients and fixtures. | Do not use reference behavior as production authority. |
| No architrino physical mass input. | `native-backed-now` | T3 state, native structs, bridge request rows, bridge output rows, serialization, and tests use `integrationWeight` / `integrationWeights` for the numerical integration scalar. | App bridge and manifest language must keep this scalar labeled as `integrationWeight` and must not present it as architrino physical mass. |
| Model architrino primitives directly. | `native-backed-now` | T3 state is particle/architrino-position based and does not require assembly graph rows. | Keep assembly objects out of the first app entity model. |
| Candidate-level T3 output unless same-record retained evidence exists. | `manifest-gap` | Retained causal-root replay rows are present only as missing-source/candidate sidecar rows. | Run manifest must record claim level and block proof-status promotion. |
| Periodic cube fundamental domain. | `native-backed-now` | `T3Topology` owns `sideLength`, wrapping, nearest-image displacement, and image offsets; native rows emit `imageDelta`. | First screen can show the fundamental-domain cube and particle image offsets. |
| 3 by 3 by 3 neighboring cubes as image views, not duplicate populations. | `display-only` | Native state stores one identity set plus image offsets; no duplicated image-particle population exists. | Cover view must be rendered as a projection over one identity set. |
| Retained causal row records winding vector or image label. | `native-capability-gap` | Particle `imageDelta` exists, but unresolved-root and retained replay rows do not carry wake winding vectors. | Wrapped wake rows must remain unavailable/fail-closed until native rows carry winding labels. |
| `sideLength`. | `native-backed-now` | Config and solver request carry topology `sideLength`; native step validates and wraps by side length. | Expose as solver-backed simulation-envelope scale. |
| `scaleFactor`. | `manifest-gap` | Config normalizes `scaleFactor`; solver request only sends `sideLength`. | Manifest must record scale normalization and display/campaign meaning. |
| `architrinoCount`. | `native-backed-now` | Config and state creation support count or density-derived count; run summary carries `particleCount`. | Expose count as solver-backed setup input. |
| `duration`. | `native-backed-now` | `runT3Simulation` accepts duration and reports start/end/duration in run summary. | Expose duration as run envelope, with claim level tied to manifest status. |
| `timeStepPolicy`. | `bridge-schema-gap` | Config has solver `mode`, `timestep`, `minTimestep`, and `maxTimestep`; native request uses fixed `timestep` and `integrationMethod = 1`. | Bridge contract needs a real solver-owned policy before adaptive or solver-selected stepping can be authoritative. |
| `historyDepth`. | `manifest-gap` | No T3 run manifest field owns active causal-history window $h$. | Expose only as pending/missing until the dataset manifest records it. |
| `wakeHorizon`. | `manifest-gap` | Solver request carries `signalSpeed`, but no manifest binds `wakeHorizon = c_f h`. | Compute only after `fieldSpeed` and `historyDepth` are manifest-backed. |
| `wakeFloor`. | `native-capability-gap` | No resolved/subthreshold wake-row retention or background/noise row emission exists. | Disable or fail-close wake-floor controls until wake rows and background rows exist. |
| `wrapMode`. | `manifest-gap` | Native topology always wraps; no app/run manifest records local, wrap-aware, or diagnostic-cover policy. | Add manifest field before UI can treat wrap policy as accepted run metadata. |
| Visual zoom independent from simulation scale. | `display-only` | Current canvas renderer has projection scale, not 3-D camera scale; solver fields are separate. | First screen must label `view zoom` separately from `sideLength` and `scaleFactor`. |
| Random initial conditions. | `native-backed-now` | `T3InitialConditions` supports `distribution: "random"` with seed and velocity policy. | Expose as exploration input with seed visible. |
| Lattice initial conditions. | `native-backed-now` | `T3InitialConditions` supports `distribution: "lattice"`. | Expose as geometry diagnostic, not ontology evidence. |
| Clustered initial conditions. | `native-backed-now` | `T3InitialConditions` supports `distribution: "clustered"` / `"clusters"`. | Expose as wake/root density stress test. |
| Explicit initial conditions. | `native-backed-now` | `initialConditions.particles` / `particles.items` accept per-particle position, velocity, id, and electrine fraction. | Prefer for reproducible fixtures. |
| Imported initial conditions. | `manifest-gap` | Imported state can be restored, but manifest id, schema version, source hash, units, and scale normalization are not required by the T3 run contract. | Imported runs need provenance fields before stronger status. |
| Initial-condition polarity or charge-sign policy. | `manifest-gap` | State has `electrineFractions`; no explicit polarity/charge-sign policy manifest exists. | Record policy in manifest before treating it as a designed initial-condition dimension. |
| Current path-history state row. | `manifest-gap` | State and checkpoints contain ids, positions, velocities, accelerations, image offsets, time, and step index; trajectory frames contain sampled position, velocity, and image-offset fields. | The required status/value-authority field is missing, so display current state as solver-backed only after manifest support exists. |
| Path-history segment row. | `bridge-schema-gap` | General bridge has path-history stream methods, but T3 simulator emits sampled trajectory frames and trail snapshots rather than solver-owned segment rows. | Add T3 path stream handles and segment schema before authoritative segment playback. |
| Active path-history window. | `manifest-gap` | No T3 manifest records the hot in-memory path range used for roots/wakes. | Add active-window metadata to `t3-app-dataset-manifest.v1`. |
| Path-history spill manifest. | `manifest-gap` | T3 serialization writes trajectory JSONL but not chunk ids, byte offsets, checksums, units, or schema-versioned stream chunks. | Add spill manifest fields before long-run playback authority. |
| Path-history replay index. | `manifest-gap` | No T3 replay index maps path id, time range, frame range, and root/wake consumers. | Add replay-index handles before authoritative selected path diagnostics. |
| Resolved wake row. | `native-capability-gap` | Native T3 emits unresolved-root candidate sidecar rows and missing-source replay placeholders, not retained wake rows. | `wake-streams` must remain disabled/display-only until retained wake rows exist. |
| Background/noise wake row. | `native-capability-gap` | No threshold aggregation or omitted-row background record is emitted. | Subthreshold wakes cannot be silently truncated; feature remains fail-closed. |
| Wake failure row. | `native-capability-gap` | Unresolved-root sidecar has candidate status, but no wake-history failure row schema covers missing history, missing winding label, branch mismatch, or envelope overflow. | Add native/bridge failure rows before wake diagnostics become authoritative. |
| Outbound face summary row. | `native-capability-gap` | No native or bridge output emits `t3-outbound-face-summary.v1`. | Keep outbound-face background layer disabled. |
| Outbound replay source row. | `native-capability-gap` | No replay source rows or reduced-model background rows exist for T3 face replay. | Replay cannot feed acceleration or diagnostics. |
| Outbound validation row and $R_{\mathrm{face\ replay}}$. | `native-capability-gap` | No explicit-wrap comparison, replay residual, tolerance, or first-failure row is emitted. | Treat replay as design-only until the fixture exists. |
| Count resolved wake rows by winding vector. | `native-capability-gap` | Particle image offsets exist, but wake rows and wake winding vectors do not. | Wrap-aware wake summary must be fail-closed. |
| Selected acceleration local/wrapped/background mixture. | `native-capability-gap` | Native step returns total acceleration and neighbor-pair summary, not row-bound acceleration contributions. | Show only total acceleration until decomposition rows exist. |
| First wrap time for run envelope. | `manifest-gap` | Run summary aggregates image deltas per step, but no envelope-level first wrap time field is defined. | Add first-wrap-time field to manifest/run summary if needed. |
| Mark rows dependent on periodic boundary condition. | `bridge-schema-gap` | Native uses nearest-image periodic interactions, but particle rows do not mark which pair/row depended on wrapping. | Bridge/native row metadata must identify periodic-boundary dependence. |
| Acceleration decomposition equation. | `native-capability-gap` | Native rows return total acceleration only. | Decomposition view must be unavailable or display-only. |
| Working simulation surface rather than landing page. | `display-only` | Current T3 canvas renderer is a rendering helper, not the app shell. | First app surface should open directly on the simulation workspace. |
| Primary UI regions. | `display-only` | Current renderer does not provide left rail, bottom timeline, right diagnostics rail, export panel, or 3-D viewport shell. | Implement as app surface over solver data, not solver behavior. |
| Dense work-focused controls. | `display-only` | No current T3 app UI control system exists. | Use exact inputs, toggles, segmented controls, sliders, and icon buttons in the app surface. |
| Required first-screen regions and separation labels. | `display-only` | Current renderer lacks camera cluster, layer strip, simulation-envelope panel, exact readout, timeline rail, and diagnostics rail. | Implement UI layout with `View`, `Simulation envelope`, `view zoom`, `sideLength`, and `scaleFactor` separation. |
| Simulation-envelope pending/accepted/rejected/fail-closed state. | `manifest-gap` | Run summary has execution/status fragments but no app diagnostic status field per envelope value. | Manifest must own envelope admission status. |
| Layer toggles do not mutate solver rows. | `display-only` | Current canvas booleans affect rendering only. | Preserve this boundary in the new layer controller. |
| Logarithmic scale controls. | `display-only` | No logarithmic UI control exists; only exact config fields exist. | Log control is an app projection with exact value input beside it. |
| Logarithmic velocity arrows. | `display-only` | Current canvas velocity vectors use linear `velocityScale`. | Implement log arrow length and shaft cue as display projection. |
| Logarithmic wake strength display. | `native-capability-gap` | No resolved wake strength rows exist. | Keep disabled until wake rows exist; preview only as display-only. |
| Logarithmic history-depth control. | `manifest-gap` | `historyDepth` is not a T3 manifest field. | Add manifest field before controlling authoritative history depth. |
| Logarithmic timeline navigation. | `display-only` | Current run returns trajectory frames, but no UI timeline exists. | Implement local scrubber and log overview over manifest-backed frames. |
| Viewport `architrino-position` layer. | `native-backed-now` | Visualization frames contain positions. | Default on. |
| Viewport `path-history` layer. | `bridge-schema-gap` | Trails and trajectory frames exist, but solver-owned path stream/replay index is not integrated. | Use bounded trails as projection; fail closed for authoritative stream claims. |
| Viewport `wake-streams` layer. | `native-capability-gap` | No retained wake-history rows exist. | Default off and disabled/display-only. |
| Viewport `velocity-vectors` layer. | `display-only` | Current velocities exist; arrow rendering is display projection. | Default off with exact raw velocity in diagnostics when selected. |
| Viewport `winding-labels` layer. | `native-capability-gap` | Particle image offsets exist; wake winding labels do not. | Contextual particle image-offset labels only; wake labels fail closed. |
| Viewport `diagnostics` layer. | `manifest-gap` | Some run summaries exist, but required diagnostic status/value authority vocabulary is not manifest-backed. | Show fail-closed alerts for missing diagnostic metadata. |
| Viewport navigation: rotate, zoom, pan, reset, fit T3, focus selected. | `display-only` | Current renderer is 2-D projection; camera commands would be app surface state only. | Implement as 3-D app navigation without changing solver state. |
| Run-summary error budget. | `manifest-gap` | Native request carries tolerances; T3 run summary does not carry global/stage error-budget surfaces. | Add global and stage error-budget metadata. |
| Stage-level error-budget summaries. | `manifest-gap` | Native validation and tolerances exist, but stage-level budgets for motion, roots, wake rows, streams, and display are not emitted. | Add stage summaries to manifest. |
| Selected architrino error-budget/status. | `manifest-gap` | Current state values exist, but per-value authority/error status is not attached. | Diagnostics must mark as missing until manifest-backed. |
| Selected wake-row error-budget/status. | `native-capability-gap` | Selected wake rows do not exist. | Wake diagnostics fail closed. |
| Diagnostic status vocabulary for displayed values. | `manifest-gap` | Vocabulary exists in design packet, not in native T3 run output. | Add per-value status fields in dataset manifest. |
| Data products manifest. | `manifest-gap` | CLI writes config, metadata, statistics, checkpoint, and trajectory JSONL. | Define `t3-app-dataset-manifest.v1`. |
| Pass/fail condition: implementation requires new solver. | `native-backed-now` | Current bridge supports native T3 stepping through `stepT3UniverseF64`. | App must fail closed rather than add solver logic. |
| Pass/fail condition: physical mass introduced. | `native-backed-now` | Current T3 native/bridge code uses `integrationWeight` / `integrationWeights` for the numerical scalar; non-T3 pair-interaction `mass` fields are outside the T3 app contract. | UI, bridge schema, and manifest language must keep preventing ontology wording and physical mass input. |
| Pass/fail condition: duplicate image populations. | `display-only` | Native state uses one particle set plus image offsets. | Cover rendering must not duplicate identity authority. |
| Pass/fail condition: wrapped wake rows omit winding labels. | `native-capability-gap` | Wake rows and wake winding labels are absent. | Wrapped wake authority remains fail-closed. |
| Pass/fail condition: silent subthreshold truncation. | `native-capability-gap` | No `wakeFloor` or background/noise rows exist. | Do not enable wake truncation as solver behavior. |
| Pass/fail condition: insufficient history displays authoritative acceleration. | `manifest-gap` | No `historyDepth` or value-authority manifest exists. | Acceleration authority must be downgraded when history metadata is missing. |
| Pass/fail condition: JS reference presented as production. | `native-backed-now` | Engine id separates `solver` and `reference`. | Keep production UI status tied to native bridge execution path. |
| Pass/fail condition: missing/exceeded error budget styled authoritative. | `manifest-gap` | Required error-budget vocabulary is not in T3 output. | Default to missing-error-budget/fail-closed where metadata is absent. |
| Pass/fail condition: outbound replay substitutes for retained wake rows. | `native-capability-gap` | Outbound replay rows do not exist. | Keep replay layer disabled until explicit fixture passes. |
| Pass/fail condition: candidate run described as proof. | `manifest-gap` | Retained same-record proof evidence is absent; run summary labels replay rows as candidate/missing. | Claim level must stay candidate-level in manifests and UI. |

## Smallest Elegant First Screen

The smallest first screen should be a quiet simulation workspace with one 3-D T3 viewport, one left simulation-envelope rail, one top layer strip, one camera cluster, one bottom timeline, and one right diagnostics rail. It should not start with every diagnostic visible.

### Default View

| Surface | Default state | Data source | Status |
| --- | --- | --- | --- |
| Fundamental-domain cube | Visible and locked. | `topology.sideLength`; display projection. | `app-facing-projection` until 3-D app surface exists. |
| Architrino positions | Visible. | Current solver state or trajectory frame positions. | `authoritative-solver-output` only when native run manifest and error budget support it; otherwise `missing-error-budget`. |
| Camera controls | Visible as `View`: rotate, zoom, pan, reset, fit T3, focus selected. | View state only. | `display-only-visualization`. |
| Scale readout | Visible in left rail: `sideLength`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`. | Config for existing fields; manifest-needed fields for history and wake horizon. | Mixed: current scale fields are solver-backed; history/wake horizon are pending manifest fields. |
| Initial-condition summary | Visible in left rail. | Config: distribution, seed, count, velocity distribution, explicit/imported source. | Solver-backed for supported families; imported rows need provenance hash before stronger status. |
| Diagnostics | Collapsed except compact selected-object tag and fail-closed alerts. | Run summary and selected row metadata. | Uses diagnostic status vocabulary. |

### Layer Strip

| Layer | First-screen state | Reason |
| --- | --- | --- |
| `fundamental-domain` | On and locked. | Provides orientation and prevents scale confusion. |
| `architrino-position` | On. | The app is unusable without visible architrino positions. |
| `path-history` | Off but available. | Bounded trails and trajectory frames exist; keep off by default for minimal screen. |
| `velocity-vectors` | Off but available. | Current velocity data exists; logarithmic arrow scaling and hash marks are app-surface work. |
| `wake-streams` | Off and disabled or display-only until wake rows exist. | No retained wake-history row authority yet. |
| `winding-labels` | Contextual. | Particle image offsets exist, but wake winding labels do not. |
| `diagnostics` | Contextual. | Show compact tags and fail-closed alerts by default; full rail on selection. |
| `outbound-face-background` | Off and disabled until face summaries exist. | No native or manifest support yet. |

### Left Simulation-Envelope Rail

Minimum controls:

1. `sideLength` exact numeric input and optional logarithmic stepper.
2. `scaleFactor` exact numeric input and optional logarithmic stepper.
3. `historyDepth` exact time input, initially marked `manifest-gap` until the T3 run manifest owns it.
4. `wakeHorizon = c_f h` read-only computed length field until `fieldSpeed` and `historyDepth` are manifest-backed.
5. `wakeFloor` input, initially disabled or pending until wake/background rows exist.
6. `wrapMode` segmented control: `local`, `wrap-aware`, `diagnostic cover`.
7. Initial-condition controls: family, seed, count, velocity family, explicit/imported source.
8. Solver status: `solver`, native bridge status, error-budget status, and first-failure code if present.

This rail is the only place that can change physical T3 scale. Viewport zoom never edits these fields.

### Right Diagnostics Rail

Minimum selected-object diagnostics:

| Selection | Compact tag | Rail details |
| --- | --- | --- |
| Architrino | id, speed, diagnostic status. | position, velocity, acceleration, image offset, time, step, error budget status, value authority. |
| Path segment | segment time range, value authority. | trajectory/trail source, interpolation status, history depth relation, missing stream fields. |
| Wake row | disabled or display-only until native rows exist. | missing fields: wake row id, winding vector, causal-root id, wake strength, threshold relation. |
| Winding/image offset | image offset vector and local/wrapped label. | particle image-offset evidence and missing wake-winding distinction. |
| Fail-closed value | first-failure code. | missing error budget, exceeded budget, missing retained wake row, missing winding label, missing manifest field, or branch evidence contamination. |

### Bottom Timeline

Minimum timeline:

1. Linear local scrubber over loaded trajectory frames.
2. Logarithmic overview placeholder for long-run navigation.
3. Exact time, frame index, checkpoint id, and playback speed.
4. Status badge when trajectory frames are app-facing projection rather than durable path-history stream output.

## Implementation Order

1. Define the T3 app dataset manifest so the first screen can distinguish solver-backed values from projections and gaps.
2. Add a 3-D viewport surface that consumes current T3 visualization frames without changing solver behavior.
3. Add the layer controller with default-visible `fundamental-domain` and `architrino-position`.
4. Add selected-object diagnostics using current state, image offsets, run summary, and diagnostic status vocabulary.
5. Keep wake streams, wake winding labels, outbound-face background, and acceleration decomposition disabled or fail-closed until native and manifest support exists.

## Next Exact Build Burden

Define `t3-app-dataset-manifest.v1` with fields for topology, simulation envelope, initial conditions, current state frames, trajectory/path-history sources, native bridge status, diagnostic status, value authority, and explicit gap rows for wake history, winding labels, outbound-face replay, and error budget.
