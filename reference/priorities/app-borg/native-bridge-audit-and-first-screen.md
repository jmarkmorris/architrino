# Native Bridge Audit and First Screen

## Purpose

This packet audits the current EOM solver bridge against the Borg app requirements and identifies the smallest elegant first-screen design that still exposes scale, initial conditions, path history, wake history, face-boundary status, and fail-closed diagnostics.

The audit is priority-design material. It does not promote app output to proof evidence, and it does not authorize a new solver.

## Sources Inspected

| Source | Audit use |
| --- | --- |
| [requirements-and-design](requirements-and-design.md) | Borg app requirements, first-screen layout, layer defaults, logarithmic UI, diagnostic status vocabulary. |
| [face-boundary-replay](face-boundary-replay.md) | Outbound/inbound face-boundary summary and replay fixture requirements. |
| Pre-EOM evaluator bridge (removed 2026-07-16 — see [pre-eom-evaluator-removal](../operations/pre-eom-evaluator-removal.md)) | Production solver boundary at audit time; the EOM solver now holds this boundary. |
| Existing simulation runtime surfaces | Current state, trajectory frames, bounded trails, and visualization-frame evidence. |
| First fixture + screen-spec generators (removed 2026-07-16 — see [pre-eom-evaluator-removal](../operations/pre-eom-evaluator-removal.md)) | Bound bridge output into `borg-dataset-manifest.v1` and `borg-app-surface-design.v1` at audit time; the surviving design objects live in `src/apps/borg/BorgAppManifest.js`. |

## Capability Classification

| Requirement area | Status | Current evidence | Gap or design consequence |
| --- | --- | --- | --- |
| Compiled EOM solver only | `native-backed-now` | Production stepping routes through the EOM solver. | Keep app implementation on the EOM contracts. Do not add app-local solver logic. |
| Finite simulation-window state | `native-backed-now` for positions and velocities; `manifest-gap` for app authority | Current state and trajectory frames carry ids, positions, velocities, accelerations, time, and step index. | First screen can show architrino positions and velocity rays, but authoritative status needs the dataset manifest. |
| Scale controls | `manifest-gap` | Existing configs carry side length and scale-like fields. | Manifest must record outer computed `sideLength`, displayed `centralVolumeSideLength`, `faceBufferMargin`, `centralArchitrinoCount`, derived outer `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, `boundaryMode`, and error budget. |
| Initial conditions | `native-backed-now` for random/lattice/clustered/explicit families; `manifest-gap` for app-facing provenance | Current setup supports generated and explicit state families plus polarity/composition encoding. | First screen can expose random 50/50 launch state, central-count presets, derived outer computed count, and velocity policies; manifest must preserve exact resolved assignments. |
| No physical mass input | `native-backed-now` for app contract policy | The app requirement labels numerical scalars as `integrationWeight` / `integrationWeights`. | UI, bridge schema, and manifest language must keep preventing physical-mass wording. |
| Path history | `native-backed-now` for fixed-parameter master-equation path rows and the bridge-level path-history stream contract | The Borg fixture binds `pathHistoryStreamIds`, replay-index ids, and adjacent native path rows from `architrino_solver_integrate_master_equation_motion_f64`. | First screen can show native row-segment trails with solver authority for path rows; wake and boundary consumers still fail closed until their row products exist. |
| Wake history rows | `native-capability-gap` | Resolved row-bound wake-history output is not yet available as an app manifest product. | Wake streams must remain disabled/display-only until retained wake rows exist. |
| Face-boundary rows | `native-capability-gap` | No bridge rows currently emit `borg-face-summary.v1`, `borg-face-replay-source.v1`, outbound wake summaries, inbound replay rows, or $R_{\mathrm{face\ replay}}$. | Boundary layer starts disabled or display-only until face-boundary rows exist. |
| Path-derived face influence model | `native-capability-gap` | No current bridge product emits `borg-face-influence-model.v1` from native path streams, path indices, kernels, and face distribution models. | Per-point face projection caches remain display/debug only; the first fixture emits fail-closed gap rows for `faceInfluenceModelIds`. |
| Six-face boundary noise policy | `developer-test` gap rows for placeholders; `native-capability-gap` for measured replay output | The design defines `borg-six-face-boundary-noise-policy.v1`, but no native-backed row emits face-source mixtures, six-face policy status, history-hiding status, or `benignNoiseStatus`. | Replay-affected values remain display-only or fail-closed until complete six-face coverage, source traceability, measured velocity sampling, wake reconstruction, and central residuals pass. |
| Velocity-scale sampling rows | `native-capability-gap` | No native-backed `borg-velocity-sampling-protocol.v1` or `borg-velocity-sampling-result.v1` rows are measured for the Borg fixture yet. | Velocity-scale sampling remains `research-open`; the first fixture emits fail-closed velocity sampling gap rows. |
| Receiver acceleration decomposition | `native-capability-gap` | Current output can expose total acceleration but not row-bound local/background/boundary contributions. | Show only total acceleration until decomposition rows exist. |
| Error budget and diagnostic status vocabulary | `manifest-gap` | General bridge has precision/value-authority concepts, but the app manifest does not yet attach the vocabulary to each displayed value. | First screen must show `missing-error-budget` or `fail-closed-value` for values without manifest-backed error budget. |
| 3-D rotate and zoom | `display-only` | Existing 2D or projection renderers are not the final app surface. | First screen should target a 3D viewport; camera controls are display-only and separate from simulation scale. |
| Visualization resolution | `display-only` | The EOM solver owns simulation values, not canvas pixel density. | Produced screenshots, captures, review output, and quality-mode views must be 4K UHD, 3840 by 2160; lower adaptive internal render scale is only an interaction fallback. |
| Layer toggles | `display-only` | Existing visualization flags can inform, but not define, the app layer controller. | New app-surface layer controller should keep solver data immutable. |
| Logarithmic UI | `display-only` | Velocity display transforms are app projections. | Use floating exponent labels on active velocity rays; exact solver values remain in diagnostics. |
| Dataset manifest and first-screen consumer | `developer-test` screen-spec and static page consumer complete | The design-owned manifest and screen-spec objects live in `src/apps/borg/BorgAppManifest.js` (their generators were removed 2026-07-16 — see [pre-eom-evaluator-removal](../operations/pre-eom-evaluator-removal.md)); [borg.html](../../../borg.html) renders the static developer-test surface from the EOM run path. | The next implementation artifact should add native wake-history rows, boundary residual rows, and required acceleration-contribution diagnostics while keeping missing replay authority fail-closed. |

## Smallest Elegant First Screen

The smallest first screen should be a quiet simulation workspace with one 3D simulation-window viewport, one left simulation-envelope rail, one top layer strip, one camera cluster, one bottom timeline, and one right diagnostics rail. It should not start with every diagnostic visible.

### Default View

| Surface | Default state | Data source | Status |
| --- | --- | --- | --- |
| Simulation-window cube | Visible and locked as faint edge-only wireframe for the displayed central cube. | `centralVolume`, `centralVolumeSideLength`, outer computed `sideLength`, `faceBufferMargin`; display projection. | `app-facing-projection` until the manifest gives authority; adaptive render resolution must not alter solver state. |
| Architrino positions | Visible. | Current solver state or trajectory frame positions. | `authoritative-solver-output` only when native run manifest and error budget support it; otherwise `missing-error-budget`. |
| Velocity rays | Off by default; available from the layer toggle or selected-object editing. | Current velocity vectors. | Ray geometry is `app-facing-projection`; raw velocity authority depends on manifest/error budget. |
| Camera controls | Visible as `View`: rotate, zoom, pan, reset, fit window, focus selected. | View state only. | `display-only-visualization`. |
| Scale readout | Visible in left rail: outer computed `sideLength`, displayed `centralVolumeSideLength`, `faceBufferMargin`, `centralArchitrinoCount`, derived outer `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`. | Config for existing fields; manifest-needed fields for central volume, buffer, counts, history, and wake horizon. | Mixed until manifest-backed. |
| Initial-condition summary | Visible in left rail. | Config: distribution, seed, central count, derived outer computed count, buffer count, electrino/positrino mix, velocity policy, explicit/imported source. | Solver-backed for supported families; imported rows need provenance before stronger status. |
| Diagnostics | Collapsed except compact selected-object tag and fail-closed alerts. | Run summary and selected row metadata. | Uses diagnostic status vocabulary. |

### Layer Strip

| Layer | First-screen state | Reason |
| --- | --- | --- |
| `simulation-window` | On and locked. | Provides orientation and prevents scale confusion. |
| `architrino-position` | On. | The app is unusable without visible architrino positions. |
| `velocity-vectors` | Off by default; toggleable in staging and playback. | The launch state should stay visually sparse while selected-object editing still exposes exact velocity. |
| `path-history` | On. | Bounded trails and trajectory frames exist; show native history by default. |
| `wake-streams` | Off and disabled or display-only until wake rows exist. | No retained wake-history row authority yet. |
| `face-boundary-status` | Contextual. | Boundary rows do not exist yet, but the app must reserve the diagnostic lane. |
| `diagnostics` | Contextual. | Show compact tags and fail-closed alerts by default; full rail on selection. |
| `outbound-face-background` | Off and disabled until face summaries exist. | No native or manifest support yet. |

### Left Simulation-Envelope Rail

Minimum controls:

1. Outer computed `sideLength` exact numeric input and optional logarithmic stepper.
2. Displayed `centralVolumeSideLength` exact numeric input and optional logarithmic stepper.
3. `faceBufferMargin` readout or input, with fail-closed status when it does not satisfy the central-volume buffer rule.
4. `centralArchitrinoCount` exact input or preset selector, with 256 as the preferred first-screen design target until measured otherwise.
5. Derived outer `architrinoCount` readout.
6. Derived `bufferArchitrinoCount` readout.
7. `scaleFactor` exact numeric input and optional logarithmic stepper.
8. `historyDepth` exact time input, initially marked `manifest-gap` until the run manifest owns it.
9. `wakeHorizon = c_f h` read-only computed length field until `fieldSpeed` and `historyDepth` are manifest-backed.
10. `wakeFloor` input, initially disabled or pending until wake/background rows exist.
11. `boundaryMode` segmented control: `local window`, `statistical face boundary`.
12. Initial-condition controls: family, seed, electrino/positrino mix, velocity family, explicit/imported source.
13. Solver status: native bridge status, error-budget status, and first-failure code if present.

This rail is the only place that can change physical simulation scale. Viewport zoom never edits these fields.

### Right Diagnostics Rail

| Selection | Compact tag | Rail details |
| --- | --- | --- |
| Architrino | id, speed, diagnostic status. | position, velocity, acceleration, face status, time, step, error budget status, value authority. |
| Path segment | segment time range, value authority. | trajectory/trail source, interpolation status, history depth relation, missing stream fields. |
| Wake row | disabled or display-only until native rows exist. | missing fields: wake row id, causal-root id, wake strength, threshold relation, face-boundary status. |
| Face-boundary row | face id and authority. | outbound/inbound counts, summary id, sampling policy, error budget, replay status. |
| Fail-closed value | first-failure code. | missing error budget, exceeded budget, missing retained wake row, missing face-boundary summary, missing manifest field, or branch evidence contamination. |

### Bottom Timeline

Minimum timeline:

1. Linear local scrubber over loaded trajectory frames.
2. Logarithmic overview placeholder for long-run navigation.
3. Exact time, frame index, checkpoint id, and playback speed.
4. Status badge when trajectory frames are app-facing projection rather than durable path-history stream output.

## Implementation Order

1. Use the design-owned `borg-dataset-manifest.v1` policy object in `src/apps/borg/BorgAppManifest.js` as the manifest source. It distinguishes design-owned envelope/initial-condition policy from explicit wake, face-boundary, face influence, six-face policy, velocity sampling, and residual fail-closed vocabulary.
2. Use the design-owned `borg-app-surface-design.v1` constant in the same module as the first-screen contract.
3. Add a 3D viewport surface that consumes current visualization frames without changing solver behavior.
4. Add the layer controller with default-visible `simulation-window` and `architrino-position`; keep velocity rays behind the layer toggle and selected-object editing.
5. Add selected-object diagnostics using current state, run summary, and diagnostic status vocabulary.
6. Keep wake streams, face-boundary replay, six-face benign-noise status, velocity-sampling promotion, and acceleration decomposition disabled or fail-closed until native and manifest support exists.

## First Native-Backed Fixture Artifact

Removed 2026-07-16 — see [pre-eom-evaluator-removal](../operations/pre-eom-evaluator-removal.md). The generator script and every run value it recorded were deleted with the pre-EOM evaluator. The design-owned policy it validated (envelope split, seeded initial-condition contract, canonical `fieldSpeed = 1`, and the explicit fail-closed gap-row vocabulary for wake history, face-boundary rows, face influence, six-face boundary noise, velocity sampling, and `R_boundary->central`) survives in `src/apps/borg/BorgAppManifest.js`.

## First App Surface Design Artifact

`borg-app-surface-design.v1` is now the design-owned constant `BORG_APP_SURFACE_DESIGN_V1` in `src/apps/borg/BorgAppManifest.js` (its generator was removed 2026-07-16 — see [pre-eom-evaluator-removal](../operations/pre-eom-evaluator-removal.md)). `validateBorgManifest` pins these screen-spec facts:

1. `schema = borg-app-surface-design.v1`;
2. the surface's source manifest id matches the app manifest;
3. `simulation-window` is `on-locked` and `architrino-position` is `on`;
4. `path-history` is on by default and `velocity-vectors` are off by default;
5. `wake-streams`, `face-boundary-status`, and `outbound-face-background` remain disabled or contextual-disabled;
6. render manifest uses 3840 by 2160 pixels;
7. central-volume acceleration remains `fail-closed-value`.

The surface design is a `developer-test-screen-spec` artifact. It does not implement the production browser page and does not upgrade replay-affected diagnostics beyond the source manifest.

## First Static Page Artifact

[borg.html](../../../borg.html) implements the first static browser consumer for `borg-app-surface-design.v1`. It uses [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js), [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js), and [main.js](../../../src/apps/borg/main.js). The page renders the displayed central cube with Three.js, consumes EOM-run frame rows, exposes path-history and velocity-vector layers as visibility controls, and keeps wake streams, face-boundary status, outbound-face background, benign-noise status, and central-volume acceleration fail-closed.

The page is an app-surface developer test. Its frame rows come from the local EOM run path; no stored trajectory ships with the page.

## Next Exact Build Burden

Build `build-native-wake-history-and-boundary-residual-fixture`. The next artifact must extend the EOM contracts and native implementation so Borg can emit retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics without adding an app-local solver or visual tuning.
