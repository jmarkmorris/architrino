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
| 3 by 3 by 3 cover identity semantics | `app-facing-projection` | Topology treats images through wrapping and image offsets, not duplicate particles. | The cover view is a display projection over one identity set, not a second simulated population. |
| Scale controls | `native-backed-now` for `sideLength` and `scaleFactor`; `manifest-gap` for `historyDepth` and `wakeHorizon` | Config accepts `sideLength`, `baseUnitLength`, and `scaleFactor`. Solver request sends `sideLength`, timestep, signal speed, and root tolerance. | First screen can show `sideLength` and `scaleFactor` as accepted envelope fields. `historyDepth` and `wakeHorizon = c_f h` need manifest fields before they can be authoritative. |
| Initial conditions | `native-backed-now` with terminology caveat | Current code supports random, lattice, clustered, explicit particles, imported state, seed, stationary/random/gaussian/explicit velocities, ids, and electrine fraction. | First screen can expose these controls. It must not expose architrino physical mass; legacy `mass` fields are numerical weights only and should stay hidden or labeled as integration weight in diagnostics. |
| Current architrino state | `native-backed-now` | State carries ids, positions, velocities, accelerations, image offsets, time, and step index. Native rows return position, velocity, acceleration, and image delta. | First screen can show architrino positions, velocity arrows, selected current state, and image-offset diagnostics. |
| Path history | `native-backed-now` for bounded trajectory/trail frames; `bridge-schema-gap` for solver-owned durable streams in T3 simulator | `T3Visualization` can keep bounded trails; `T3Serialization` emits trajectory frames with positions, velocities, image offsets; shared bridge has path-history stream methods. | First screen can show recent trails and trajectory playback as app-facing projection. Durable path-history stream handles, active window metadata, spill manifests, and replay indices are not integrated into the T3 simulator manifest yet. |
| Wake history rows | `native-capability-gap` | Native T3 can emit unresolved-root segment sidecar rows and retained replay placeholder rows, but row status is candidate shape evidence and retained replay source fields are missing. | First screen may show wake controls disabled or display-only until resolved wake rows exist. It must not show wake streams as authoritative. |
| Winding labels for wake rows | `native-capability-gap` | Particle image deltas exist; wake-row winding vectors do not. The unresolved-root sidecar does not carry `windingLabel` or accepted retained causal-root fields. | First screen may show particle image offsets now. Winding labels for wake rows must remain disabled, contextual, or fail-closed until bridge rows carry them. |
| Receiver acceleration decomposition by wake rows | `native-capability-gap` | Native step returns total acceleration and soft-sphere neighbor summary, not acceleration contributions bound to retained wake rows/background rows. | First screen can show total acceleration for selected architrinos. Wake/background decomposition must be marked unavailable. |
| Outbound face wake replay | `native-capability-gap` and `manifest-gap` | No native or bridge rows currently emit `t3-outbound-face-summary.v1`, replay source rows, or $R_{\mathrm{face\ replay}}$. | First screen can reserve the outbound-face background layer, but it starts off and disabled unless a later manifest includes face summaries. |
| Error budget and diagnostic status vocabulary | `manifest-gap` | Native rows expose tolerance and some error bounds on unresolved-root segment rows; general bridge has precision/value-authority concepts; T3 run summary does not yet emit the app diagnostic status vocabulary. | First screen must show `missing-error-budget` or `fail-closed-value` for values without manifest-backed error budget. |
| 3-D rotate and zoom | `display-only` implementation gap | Current T3 canvas renderer is 2-D projection-based. | First screen design should target a 3-D viewport, but the current renderer is not that app. Camera controls are display-only and separate from simulation scale. |
| Layer toggles | `display-only` partial support | Current canvas renderer has booleans for velocity vectors, density map, trails, and statistics. It does not implement the first-screen layer strip or diagnostic status rules. | First screen can reuse the idea but needs a new app-surface layer controller. |
| Logarithmic UI | `display-only` app-surface gap | Current velocity vectors use a linear `velocityScale`; no logarithmic controls or legends are present. | Logarithmic scale, velocity, wake, and timeline controls are first-screen design requirements, not current runtime behavior. |
| Dataset manifest | `manifest-gap` | CLI writes config, metadata, statistics, checkpoint, and trajectory JSON/JSONL. It does not emit app-readable dataset handles for path-history streams, wake rows, outbound-face summaries, diagnostic status, or value authority. | The next implementation artifact should be the dataset manifest contract. |

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

