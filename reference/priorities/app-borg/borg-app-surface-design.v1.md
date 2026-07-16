# Borg App Surface Design v1

## Workstream Metadata

- Kind: `priority`
- Status: `design-complete`
- Claim level: `developer-test-screen-spec`
- Schema id: `borg-app-surface-design.v1`
- Source fixture: removed 2026-07-16
- Surface artifact: design-owned constant in `src/apps/borg/BorgAppManifest.js` (its generator was removed 2026-07-16)
- Source manifest: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md)
- Requirements source: [requirements-and-design](requirements-and-design.md)
- Native bridge source: [native-bridge-audit-and-first-screen](native-bridge-audit-and-first-screen.md)

## Purpose

`borg-app-surface-design.v1` is the first concrete first-screen contract for the Borg app. It binds the design-owned `borg-dataset-manifest.v1` policy object to a screen-spec object that a static Borg page can render without reinterpreting the design prose.

The artifact is a manifest consumer, not a new solver and not a production browser screen. It keeps native current-state frames and native path-history rows visible, while wake streams, face-boundary status, outbound-face background, benign-noise status, and central-volume acceleration remain fail-closed until native-backed rows and residuals exist.

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
| `authorityMap` | Screen-level authority for EOM-run frame rows, path history, display projections, fail-closed wake/face values, deployment budgets, and render quality. The EOM solver is the only production solver. |
| `failClosedFirstFailureCodes` | First-failure codes surfaced by the screen spec. |
| `validation` | Screen-spec validation status and proof-claim status. |

## First Developer-Test Values

The current `borg-eom-first-screen` surface contract binds these checked values (all design-owned policy; run-derived values were removed 2026-07-16):

| Field | Value |
| --- | --- |
| `fieldSpeed` | `1`, the canonical normalized $c_f$ |
| `wakeHorizon` | computed as $c_f h$ from the run's declared history depth |
| `initialLinePolicy` | `seeded-random-interior-cube` |
| `polaritySignConvention` | `positrino-positive-electrino-negative`, with positrino charge `1` and electrino charge `-1` |
| `velocityPolicy` | `seeded-random-small-3d`, with `randomVelocityMaxComponentMagnitude = 0.042`, `randomVelocityMinSpeed = 0.0144`, and `velocityBoundScaleFromV1 = 1.2` |
| `renderPixelSize` | `3840x2160` |
| `centralArchitrinoCount` | `8` |
| `architrinoCount` | `16` |
| `bufferArchitrinoCount` | `8` |

These values are valid only as a developer-test screen contract. They do not establish proof evidence, production rendering performance, benign-noise authority, or central-volume acceleration authority.

The browser surface also provides exact runtime controls for electrino count, positrino count, maximum random velocity-component magnitude, and minimum random speed. Applying them replaces the staged population, rebuilds particle and path objects, and starts a new EOM run from a certified artificial retained history. These controls do not change the design values in the table and do not promote the resulting trajectory to canonical equation-of-motion evidence.

## First-Screen Layer Contract

| Layer | State | Authority |
| --- | --- | --- |
| `simulation-window` | `on-locked` | `app-facing-projection` |
| `architrino-position` | `on` | `authoritative-solver-output` |
| `path-history` | `on` | `authoritative-solver-output` |
| `velocity-vectors` | `off` | raw values are `authoritative-solver-output`; ray geometry is `app-facing-projection` |
| `wake-streams` | `disabled` | `fail-closed-value` |
| `face-boundary-status` | `contextual-disabled` | `fail-closed-value` |
| `diagnostics` | `on-locked` | exposes fail-closed diagnostics without upgrading values |
| `outbound-face-background` | `disabled` | `fail-closed-value` |

The visible default is `simulation-window`, `architrino-position`, `path-history`, and `diagnostics`. The first static page does not expose `simulation-window` or `architrino-position` as buttons because those core layers are not useful toggles in the first-screen workflow. Path history starts on and velocity vectors remain available but off. Wake streams, face-boundary status, and outbound-face background are disabled because their source rows do not yet exist in the native-backed manifest.

The `architrino-position` layer renders architrinos as small fixed-screen points, not shaded 3D spheres. `electrino` rows render pure blue and `positrino` rows render pure red until a later Borg visual convention changes that polarity map.

The `path-history` layer renders adjacent native path rows as straight line segments with `smoothingPolicy = none`. Trail color and thickness are app-facing visualization only; the path authority still comes from the native path-history rows. The first static page must not spline, tube-smooth, or otherwise curve native rows beyond the solver-emitted frame sequence.

The first static page uses the native fixture frame sets as keyframes and may interpolate between adjacent keyframes for smoother display playback. Interpolated playback frames are display-only visualization and must not be counted as additional EOM solver output, path-history evidence, wake rows, face-boundary evidence, or proof evidence.

## Simulation-Envelope Rail Contract

The left rail must display separate exact fields for:

1. outer computed `sideLength`;
2. displayed `centralVolumeSideLength`;
3. `faceBufferMargin` and `strictCentralBufferStatus`;
4. `historyDepth`;
5. `fieldSpeed`;
6. computed `wakeHorizon = c_f h`;
7. `centralVelocityBound`;
8. `centralObservationInterval`;
9. `centralArchitrinoCount`;
10. derived outer `architrinoCount`;
11. derived `bufferArchitrinoCount`.

The rail is the only place where simulation-envelope edits may occur. View camera controls may rotate, zoom, pan, reset, fit, or focus, but they may not edit these fields.

## Fail-Closed Rows Surfaced

The current screen spec surfaces these first-failure codes from the source manifest:

| Code | Surface consequence |
| --- | --- |
| `wake_history_gap_unclassified` | `wake-streams` remains disabled and central wake-background authority remains closed. |
| `missing_face_crossing_coverage` | `face-boundary-status` remains contextual-disabled because this long fixture keeps the pair inside the outer cube and emits no native face-crossing event rows. |
| `face_influence_model_missing` | `outbound-face-background` remains disabled and no face influence model can drive replay. |
| `six_face_boundary_policy_missing` | Six-face benign-noise status cannot receive reduced-model authority. |
| `velocity_sampling_protocol_missing` | Velocity-scale replay sampling remains research-open. |
| `required_residual_unmeasured` | `R_boundary->central` is not measured, so central-volume acceleration and replay-affected diagnostics remain fail-closed. |

## Validation Command

Removed 2026-07-16. The generator, the stored fixture module, and the trajectory asset are deleted. The surviving design-owned surface object lives in `src/apps/borg/BorgAppManifest.js` and is validated by `validateBorgManifest`, pinned by `tests/borg-eom-runtime-contract.test.js`.

## First Static Page Artifact

The first browser consumer is [borg.html](../../../borg.html). It uses [BorgAppManifest.js](../../../src/apps/borg/BorgAppManifest.js) as the browser-safe design-owned policy object, [BorgAppRuntime.js](../../../src/apps/borg/BorgAppRuntime.js) as the Three.js app runtime, and [main.js](../../../src/apps/borg/main.js) as the page entrypoint.

The page renders the displayed central cube, EOM-run current-state positions, path-history trails when toggled on, velocity vectors when toggled on, the simulation-envelope rail, collapsed provenance drawer, timeline scrubber, render/deployment placeholders, value-authority rows, and fail-closed diagnostics. It remains a static developer-test page. It does not run the EOM solver in the browser, does not generate boundary input, and does not upgrade wake streams, face-boundary replay, benign-noise status, or central-volume acceleration beyond the source manifest.

The first screen must show the simulation before manifest details. Source manifest id, model contract id, bridge path, raw frame-row count, and raw path-row count belong in the collapsed provenance drawer unless the app is in a dedicated audit/debug view.

## Next Exact Build Burden

Build `build-native-wake-history-and-boundary-residual-fixture`. The next artifact should extend the EOM contracts and native implementation so Borg can add retained wake/interaction rows, row-conservation counts, boundary-to-central residual rows, and required acceleration-contribution diagnostics on top of the EOM run path. Browser surface-budget measurement remains required later, but this surface design now advertises the missing wake-history and residual fixture as the next implementation handoff.
