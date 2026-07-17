# Native Bridge Audit and First Screen

## Purpose

This packet audits the current EOM solver bridge against the Borg app requirements and identifies the smallest elegant first-screen design that still exposes scale, initial conditions, path history, wake history, boundary-shell status, and fail-closed diagnostics.

The audit is priority-design material. It does not promote app output to proof evidence, and it does not authorize a new solver.

## Sources Inspected

| Source | Audit use |
| --- | --- |
| [requirements-and-design](requirements-and-design.md) | Borg app requirements, first-screen layout, layer defaults, logarithmic UI, diagnostic status vocabulary. |
| [boundary-shell-replay](boundary-shell-replay.md) | Outbound/inbound boundary-shell summary and replay fixture requirements. |
| EOM solver boundary | Production solver boundary for stepping, state frames, and row products. |
| Existing simulation runtime surfaces | Current state, trajectory frames, bounded trails, and visualization-frame evidence. |
| Design-owned manifest and screen-spec objects in `src/apps/borg/BorgAppManifest.js` | Bind `borg-dataset-manifest.v1` and `borg-app-surface-design.v1` policy into checkable constants. |

## Capability Classification

| Requirement area | Status | Current evidence | Gap or design consequence |
| --- | --- | --- | --- |
| Compiled EOM solver only | `native-backed-now` | Production stepping routes through the EOM solver. | Keep app implementation on the EOM contracts. Do not add app-local solver logic. |
| Finite simulation-window state | `native-backed-now` for positions and velocities; `manifest-gap` for app authority | Current state and trajectory frames carry ids, positions, velocities, accelerations, time, and step index. | First screen can show architrino positions and velocity rays, but authoritative status needs the dataset manifest. |
| Scale controls | `manifest-gap` | Existing configs carry outer radius and scale-like fields. | Manifest must record outer computed `outerRadius`, displayed `centralBallRadius`, `radialBufferMargin`, `centralArchitrinoCount`, derived outer `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`, `wakeFloor`, `boundaryMode`, and error budget. |
| Initial conditions | `native-backed-now` for random/lattice/clustered/explicit families; `manifest-gap` for app-facing provenance | Current setup supports generated and explicit state families plus polarity/composition encoding. | First screen can expose random 50/50 launch state, central-count presets, derived outer computed count, and velocity policies; manifest must preserve exact resolved assignments. |
| No physical mass input | `native-backed-now` for app contract policy | The app requirement labels numerical scalars as `integrationWeight` / `integrationWeights`. | UI, bridge schema, and manifest language must keep preventing physical-mass wording. |
| Path history | `native-backed-now` for the EOM path-history stream contract | EOM runs carry `pathHistoryStreamIds`, replay-index ids, and adjacent path rows. | First screen can show row-segment trails with EOM authority for path rows; wake and boundary consumers still fail closed until their row products exist. |
| Wake history rows | `native-capability-gap` | Resolved row-bound wake-history output is not yet available as an app manifest product. | Wake streams must remain disabled/display-only until retained wake rows exist. |
| Boundary-shell rows | `native-capability-gap` | No bridge rows currently emit `borg-boundary-shell-summary.v1`, `borg-boundary-shell-replay-source.v1`, outbound wake summaries, inbound replay rows, or $R_{\mathrm{shell\ replay}}$. | Boundary layer starts disabled or display-only until boundary-shell rows exist. |
| Path-derived boundary-shell patch influence model | `native-capability-gap` | No current bridge product emits `borg-boundary-shell-influence-model.v1` from native path streams, path indices, kernels, and boundary-shell patch distribution models. | Per-point boundary-shell patch projection caches remain display/debug only; the first fixture emits fail-closed gap rows for `shellInfluenceModelIds`. |
| Boundary-shell noise policy | `developer-test` gap rows for placeholders; `native-capability-gap` for measured replay output | The design defines `borg-boundary-shell-noise-policy.v1`, but no EOM row emits shell-source mixtures, boundary-shell policy status, history-hiding status, or `benignNoiseStatus`. | Replay-affected values remain display-only or fail-closed until complete boundary-shell coverage, source traceability, measured velocity sampling, wake reconstruction, and central residuals pass. |
| Velocity-scale sampling rows | `native-capability-gap` | No native-backed `borg-velocity-sampling-protocol.v1` or `borg-velocity-sampling-result.v1` rows are measured for the Borg fixture yet. | Velocity-scale sampling remains `research-open`; the first fixture emits fail-closed velocity sampling gap rows. |
| Receiver acceleration decomposition | `native-capability-gap` | Current output can expose total acceleration but not row-bound local/background/boundary contributions. | Show only total acceleration until decomposition rows exist. |
| Error budget and diagnostic status vocabulary | `manifest-gap` | General bridge has precision/value-authority concepts, but the app manifest does not yet attach the vocabulary to each displayed value. | First screen must show `missing-error-budget` or `fail-closed-value` for values without manifest-backed error budget. |
| 3-D rotate and zoom | `display-only` | Existing 2D or projection renderers are not the final app surface. | First screen should target a 3D viewport; camera controls are display-only and separate from simulation scale. |
| Visualization resolution | `display-only` | The EOM solver owns simulation values, not canvas pixel density. | Produced screenshots, captures, review output, and quality-mode views must be 4K UHD, 3840 by 2160; lower adaptive internal render scale is only an interaction fallback. |
| Layer toggles | `display-only` | Existing visualization flags can inform, but not define, the app layer controller. | New app-surface layer controller should keep solver data immutable. |
| Logarithmic UI | `display-only` | Velocity display transforms are app projections. | Use floating exponent labels on active velocity rays; exact solver values remain in diagnostics. |
| Dataset manifest and first-screen consumer | `developer-test` screen-spec and static page consumer complete | The design-owned manifest and screen-spec objects live in `src/apps/borg/BorgAppManifest.js`; [borg.html](../../../borg.html) renders the static developer-test surface from the EOM run path. | The next implementation artifact should add native wake-history rows, boundary residual rows, and required acceleration-contribution diagnostics while keeping missing replay authority fail-closed. |

## Smallest Elegant First Screen

The smallest first screen should be a quiet simulation workspace with one 3D simulation-window viewport, one left simulation-envelope rail, one top layer strip, one camera cluster, one bottom timeline, and one right diagnostics rail. It should not start with every diagnostic visible.

### Default View

| Surface | Default state | Data source | Status |
| --- | --- | --- | --- |
| Simulation-window sphere | Visible and locked as one faint dotted outer boundary shell. The central ball remains a declared region, not a second rendered sphere. | `center`, `centralBallRadius`, `outerRadius`, `radialBufferMargin`; display projection. | `app-facing-projection`; adaptive render resolution must not alter solver state. |
| Architrino positions | Visible. | Current solver state or trajectory frame positions. | `authoritative-solver-output` only when native run manifest and error budget support it; otherwise `missing-error-budget`. |
| Velocity rays | Off by default; available from the layer toggle or selected-object editing. | Current velocity vectors. | Ray geometry is `app-facing-projection`; raw velocity authority depends on manifest/error budget. |
| Camera controls | Visible as `View`: rotate, zoom, pan, reset, fit window, focus selected. | View state only. | `display-only-visualization`. |
| Scale readout | Visible in left rail: outer computed `outerRadius`, displayed `centralBallRadius`, `radialBufferMargin`, `centralArchitrinoCount`, derived outer `architrinoCount`, `bufferArchitrinoCount`, `scaleFactor`, `historyDepth`, `wakeHorizon = c_f h`. | Config for existing fields; manifest-needed fields for central ball, buffer, counts, history, and wake horizon. | Mixed until manifest-backed. |
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
| `boundary-shell-status` | Contextual. | Boundary rows do not exist yet, but the app must reserve the diagnostic lane. |
| `diagnostics` | Contextual. | Show compact tags and fail-closed alerts by default; full rail on selection. |

### Left Simulation-Envelope Rail

Minimum controls:

1. Outer computed `outerRadius` exact numeric input and optional logarithmic stepper.
2. Displayed `centralBallRadius` exact numeric input and optional logarithmic stepper.
3. `radialBufferMargin` readout or input, with fail-closed status when it does not satisfy the central-ball buffer rule.
4. `centralArchitrinoCount` exact input or preset selector, with 3 as the default.
5. Derived outer `architrinoCount` readout.
6. Derived `bufferArchitrinoCount` readout.
7. `scaleFactor` exact numeric input and optional logarithmic stepper.
8. `historyDepth` exact time input, initially marked `manifest-gap` until the run manifest owns it.
9. `wakeHorizon = c_f h` read-only computed length field until `fieldSpeed` and `historyDepth` are manifest-backed.
10. `wakeFloor` input, initially disabled or pending until wake/background rows exist.
11. `boundaryMode` segmented control: `local window`, `statistical boundary shell`.
12. Initial-condition controls: family, seed, electrino/positrino mix, velocity family, explicit/imported source.
13. Solver status: native bridge status, error-budget status, and first-failure code if present.

This rail is the only place that can change physical simulation scale. Viewport zoom never edits these fields.

### Right Diagnostics Rail

| Selection | Compact tag | Rail details |
| --- | --- | --- |
| Architrino | id, speed, diagnostic status. | position, velocity, acceleration, boundary-shell patch status, time, step, error budget status, value authority. |
| Path segment | segment time range, value authority. | trajectory/trail source, interpolation status, history depth relation, missing stream fields. |
| Wake row | disabled or display-only until native rows exist. | missing fields: wake row id, causal-root id, wake strength, threshold relation, boundary-shell status. |
| Boundary-shell row | boundary-shell patch id and authority. | outbound/inbound counts, summary id, sampling policy, error budget, replay status. |
| Fail-closed value | first-failure code. | missing error budget, exceeded budget, missing retained wake row, missing boundary-shell summary, missing manifest field, or branch evidence contamination. |

### Bottom Timeline

Minimum timeline:

1. Linear local scrubber over loaded trajectory frames.
2. Logarithmic overview placeholder for long-run navigation.
3. Exact time, frame index, checkpoint id, and playback speed.
4. Status badge when trajectory frames are app-facing projection rather than durable path-history stream output.

## Implementation Order

1. Use the design-owned `borg-dataset-manifest.v1` policy object in `src/apps/borg/BorgAppManifest.js` as the manifest source. It distinguishes design-owned envelope/initial-condition policy from explicit wake, boundary-shell, boundary-shell patch influence, boundary-shell policy, velocity sampling, and residual fail-closed vocabulary.
2. Use the design-owned `borg-app-surface-design.v1` constant in the same module as the first-screen contract.
3. Add a 3D viewport surface that consumes current visualization frames without changing solver behavior.
4. Add the layer controller with default-visible `simulation-window` and `architrino-position`; keep velocity rays behind the layer toggle and selected-object editing.
5. Add selected-object diagnostics using current state, run summary, and diagnostic status vocabulary.
6. Keep wake streams, boundary-shell replay, boundary-shell benign-noise status, velocity-sampling promotion, and acceleration decomposition disabled or fail-closed until native and manifest support exists.

## Manifest Policy Artifact

The design-owned policy — envelope split, seeded initial-condition contract, canonical `fieldSpeed = 1`, and the explicit fail-closed gap-row vocabulary for wake history, boundary-shell rows, boundary-shell patch influence, boundary shell noise, velocity sampling, and `R_boundary->central` — lives in `src/apps/borg/BorgAppManifest.js`.

## First App Surface Design Artifact

`borg-app-surface-design.v1` is the design-owned constant `BORG_APP_SURFACE_DESIGN_V1` in `src/apps/borg/BorgAppManifest.js`. `validateBorgManifest` pins these screen-spec facts:

1. `schema = borg-app-surface-design.v1`;
2. the surface's source manifest id matches the app manifest;
3. `simulation-window` is `on-locked` and `architrino-position` is `on`;
4. `path-history` is on by default and `velocity-vectors` are off by default;
5. `wake-streams` and `boundary-shell-status` remain disabled or contextual-disabled;
6. render manifest uses 3840 by 2160 pixels;
7. central-ball acceleration remains `fail-closed-value`.

The surface design is a `developer-test-screen-spec` artifact. It does not implement the production browser page and does not upgrade replay-affected diagnostics beyond the source manifest.

## First Static Page Artifact

[borg.html](../../../borg.html) implements the first static browser consumer for `borg-app-surface-design.v1`. It uses [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js), [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js), and [main.js](../../../src/apps/borg/main.js). The page renders one dotted outer boundary shell with Three.js, consumes EOM-run frame rows, exposes path-history and velocity-vector layers as visibility controls, and keeps wake streams, boundary-shell status, benign-noise status, and central-ball acceleration fail-closed.

The page is an app-surface developer test. Its frame rows come from the local EOM run path; no stored trajectory ships with the page.

## Next Exact Build Burden

Build `build-native-wake-history-and-boundary-residual-fixture`. The next artifact must extend the EOM contracts and native implementation so Borg can emit retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics without adding an app-local solver or visual tuning.
