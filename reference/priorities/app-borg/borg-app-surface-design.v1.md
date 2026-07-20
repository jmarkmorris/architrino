# Borg App Surface Design v1

## Workstream Metadata

- Kind: `priority`
- Status: `design-complete`
- Claim level: `developer-test-screen-spec`
- Schema id: `borg-app-surface-design.v1`
- Surface artifact: design-owned constant in `src/apps/borg/BorgAppManifest.js`
- Source manifest: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md)
- Requirements source: [requirements-and-design](requirements-and-design.md)
- Native bridge source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md)

## Purpose

`borg-app-surface-design.v1` is the first concrete first-screen contract for the Borg app. It binds the design-owned `borg-dataset-manifest.v1` policy object to a screen-spec object that a static Borg page can render without reinterpreting the design prose.

The artifact is a manifest consumer, not a new solver and not a production browser screen. It keeps native current-state frames and native path-history rows visible, while wake streams, boundary-shell status, outbound-shell background, and benign-noise status remain fail-closed until native-backed rows and residuals exist.

## Minimum Surface Object

The surface object (the design-owned constant `BORG_APP_SURFACE_DESIGN_V1` in `src/apps/borg/BorgAppManifest.js`) must include:

| Field | Required content |
| --- | --- |
| `schema` | Literal `borg-app-surface-design.v1`. |
| `screenSpecId` | Stable first-screen spec id. |
| `appId` | Literal `borg-app`. |
| `claimLevel` | `developer-test-screen-spec` for the current artifact. |
| `sourceManifest` | Manifest schema, manifest id, and source claim level; must match the app manifest. |
| `firstViewport` | Workspace layout regions, required 4K UHD render size, visible layers, hidden layers, disabled layers, and authority promotion rule. |
| `layerStrip` | First-screen layer states and source fields. |
| `authorityMap` | Screen-level authority for EOM-run frame rows, path history, display projections, fail-closed wake/boundary-shell patch values, deployment budgets, and render quality. The EOM solver is the only production solver. |
| `failClosedFirstFailureCodes` | First-failure codes surfaced by the screen spec. |
| `validation` | Screen-spec validation status and proof-claim status. |

## First Developer-Test Values

The current `borg-eom-first-screen` surface contract binds these checked values (all design-owned policy):

| Field | Value |
| --- | --- |
| `fieldSpeed` | `1`, the canonical normalized $c_f$ |
| `wakeHorizon` | computed as $c_f h_{\mathrm{seed}}$ from the run's causal seed-history depth |
| `initialLinePolicy` | `seeded-random-simulation-envelope` |
| `polaritySignConvention` | `positrino-positive-electrino-negative`, with positrino charge `1` and electrino charge `-1` |
| `velocityPolicy` | `seeded-random-small-3d` |
| `randomVelocityMaxComponentMagnitude` | `0.01` |
| `coupling` | `0.05` |
| `stepHeight` | `0.025`, the initial and adaptive maximum height |
| `adaptiveMinimumStep` | `0.0001` |
| `outerRadius` | `0.5` |
| `renderPixelSize` | `3840x2160` |
| `architrinoCount` | `6` |

These values are valid only as a developer-test screen contract. They do not establish proof evidence, production rendering performance, or benign-noise authority.

The browser surface also provides exact runtime controls for electrino count, positrino count, coupling, nominal step height, adaptive minimum step, maximum random velocity-component magnitude, and minimum random speed. The nominal height is both the first attempted height and the ceiling to which adaptive growth may return; the minimum is the fail-closed floor. Applying the controls replaces the staged population, rebuilds particle and path objects, and starts a new EOM run from a certified causal seed history. That prescribed stationary or inertial seed covers only the delay needed at $T=0$; computed EOM segments after $T=0$ are appended as the separately evolving retained history. These controls do not change the design values in the table and do not promote the resulting trajectory to canonical equation-of-motion evidence.

## First-Screen Layer Contract

| Layer | State | Authority |
| --- | --- | --- |
| `simulation-window` | `on-locked` | `app-facing-projection` |
| `architrino-position` | `on` | `authoritative-solver-output` |
| `path-history` | `on` | `authoritative-solver-output` |
| `velocity-vectors` | `off` | raw values are `authoritative-solver-output`; ray geometry is `app-facing-projection` |
| `wake-streams` | `disabled` | `fail-closed-value` |
| `boundary-shell-status` | `contextual-disabled` | `fail-closed-value` |
| `diagnostics` | `on-locked` | exposes fail-closed diagnostics without upgrading values |

The visible default is `simulation-window`, `architrino-position`, `path-history`, and `diagnostics`. The first static page does not expose `simulation-window` or `architrino-position` as buttons because those core layers are not useful toggles in the first-screen workflow. Path history starts on and velocity vectors remain available but off. Wake streams and boundary-shell status are disabled because their source rows do not yet exist in the manifest.

The `architrino-position` layer renders architrinos as small fixed-screen points, not shaded 3D spheres. `electrino` rows render pure blue and `positrino` rows render pure red until a later Borg visual convention changes that polarity map.

The `path-history` layer renders adjacent native path rows as straight line segments with `smoothingPolicy = none`. Trail color and thickness are app-facing visualization only; the path authority still comes from the native path-history rows. The first static page must not spline, tube-smooth, or otherwise curve native rows beyond the solver-emitted frame sequence.

The first static page uses the EOM-run frame sets as keyframes and may interpolate between adjacent keyframes for smoother display playback. Interpolated playback frames are display-only visualization and must not be counted as additional EOM solver output, path-history evidence, wake rows, boundary-shell evidence, or proof evidence.

## Polarity Diagnostics

The collapsed diagnostics rail reports polarity-resolved counts from raw EOM keyframe positions before any display-only off-screen replacement is applied. `outside sphere now` counts paths outside the declared outer radius at the selected keyframe, while `escaped by time` counts each path once at its first raw-keyframe crossing. The close-pair threshold is named `close-pair threshold εc` and is exactly the display evaluator's finite-width core scale $\epsilon_c$, not a separate fraction of the sphere radius. The rail reports the fraction of electrino-electrino, positrino-positrino, all same-polarity, and opposite-polarity unordered pairs within that threshold, together with same/opposite mean separation and the normalized same-to-opposite close-fraction ratio. It also reports $\lVert\mathbf{x}_s(T)-\mathbf{x}_s(S^*)\rVert/\lVert\mathbf{x}_r(T)-\mathbf{x}_s(S^*)\rVert$ over solved delayed roots, so an unusual run exposes source motion between emission and reception relative to the delayed receiver-source separation. These are display diagnostics, not force measurements or evidence of binding. A persistent excess can be checked by scrubbing successive raw keyframes; one keyframe alone can show only an instantaneous charge domain.

Display evaluation solves and evaluates every ordered pair; it does not replace a distant pair by a zero-force enclosure. The legacy far-field fraction remains a certified-route compatibility control only.

## Simulation-Envelope Rail Contract

The left rail must display separate exact fields for:

1. outer `outerRadius`;
2. causal `seedHistoryDepth`, separately from the evolving retained-history start and end;
3. `fieldSpeed`;
4. computed `wakeHorizon = c_f h`;
5. total `architrinoCount`.

The rail is the only place where simulation-envelope edits may occur. View camera controls may rotate, zoom, pan, reset, fit, or focus, but they may not edit these fields.

## Fail-Closed Rows Surfaced

The current screen spec surfaces these first-failure codes from the source manifest:

| Code | Surface consequence |
| --- | --- |
| `wake_history_gap_unclassified` | `wake-streams` remains disabled and central wake-background authority remains closed. |
| `missing_boundary_shell_crossing_coverage` | `boundary-shell-status` remains contextual-disabled because EOM runs do not yet emit boundary-shell crossing event rows. |
| `boundary_shell_influence_model_missing` | No boundary-shell influence model can drive replay. |
| `boundary_shell_policy_missing` | Boundary-shell benign-noise status cannot receive reduced-model authority. |
| `velocity_sampling_protocol_missing` | Velocity-scale replay sampling remains research-open. |

## Validation

The design-owned surface object lives in `src/apps/borg/BorgAppManifest.js` and is validated by `validateBorgManifest`, pinned by `tests/borg-eom-runtime-contract.test.js`.

## First Static Page Artifact

The first browser consumer is [borg.html](../../../borg.html). It uses [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js) as the browser-safe design-owned policy object, [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js) as the Three.js app runtime, and [main.js](../../../src/apps/borg/main.js) as the page entrypoint.

The page renders one dotted outer boundary shell, EOM-run current-state positions, path-history trails when toggled on, velocity vectors when toggled on, the simulation-envelope rail, collapsed provenance drawer, timeline scrubber, render/deployment placeholders, value-authority rows, and fail-closed diagnostics. There is no separate central ball or radial buffer. In simulation-workspace mode, explicit Start may invoke the EOM solver through the local bridge; the browser contains no evolution substitute. In assembly-view replay, the page consumes sealed `assembly-view-record.v0` files only, hides workspace-only envelope fields, disables run and initial-condition controls, and cannot construct the live EOM client. Neither mode generates boundary input or upgrades wake streams, boundary-shell replay, benign-noise status, or record evidence beyond its source authority.

The first screen must show the simulation before manifest details. Source manifest id, model contract id, bridge path, raw frame-row count, and raw path-row count belong in the collapsed provenance drawer unless the app is in a dedicated audit/debug view.

## Next Exact Build Burden

Build `build-native-wake-history-and-boundary-residual-fixture`. The next artifact should extend the EOM contracts and native implementation so Borg can add retained wake/interaction rows, row-conservation counts, boundary-shell residual rows, and required acceleration-contribution diagnostics on top of the EOM run path. Browser surface-budget measurement remains required later, but this surface design now advertises the missing wake-history and residual fixture as the next implementation handoff.
