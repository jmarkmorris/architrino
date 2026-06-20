# Geometry Centralization Inventory

## Status

- Kind: `priority-detail`
- Workstream: `solver`
- Scope: Photon, Ideal Swarm, Animator
- Status: `closed-inventory-capture`
- Source inspection date: 2026-06-20
- Edit boundary: source inspection only; app source files were not edited. [solver.md](solver.md) records the inventory closeout.

## Purpose

This inventory records app-side geometry calculations that should be owned by the central solver, identifies duplicated geometry across Photon, Ideal Swarm, and Animator, classifies the current migration state, and recommends safe removals.

The existing solver inventory checker, [check-solver-geometry-inventory.mjs](../../../scripts/check-solver-geometry-inventory.mjs), already names the bridge-facing migration targets. This document records the remaining app-local geometry around those targets so removals can be sequenced without deleting display-only renderer work.

## Classification

| Classification | Meaning |
| --- | --- |
| `migrated` | The solver bridge owns the authoritative geometry calculation. The app may still construct requests, render solver output, or rank results. |
| `partially migrated` | A central solver row, stream, or ledger exists, but the app still reconstructs causal, path-dependent, or branch-local geometry needed for diagnostics or summaries. |
| `still app-local` | The app still performs geometry that should become solver-owned before it is used as authoritative physics, diagnostics, or proof-program data. |

Display-only geometry is classified by where it currently runs, but it is not a removal target unless it feeds authoritative diagnostics, solver inputs, or claimed geometry summaries.

## Executive Inventory

| App | Geometry area | Classification | Current solver-owned part | App-local remainder | Safe removal recommendation |
| --- | --- | --- | --- | --- | --- |
| Photon | Causal roots and circular-source roots/hits ledger | `partially migrated` | Causal-root requests, circular-source roots, delayed-hit ledger rows, normalized circular-source request handling. | Photon formula code still reconstructs circular-source kinematics, delayed direction, distance, Jacobian weight, contribution vectors, observer field summaries, and polarization diagnostics. | Remove app-local kinematic reconstruction only after solver rows expose the source point, velocity, acceleration, distance, direction, phase-at-hit, branch weight, and field contribution used by Photon summaries. |
| Photon | Circular orbit display and canvas trail geometry | `still app-local` | None required for display. | Visual runtime repeats angle, radius, trigonometric trail, marker, and analyzer-layout geometry. | Do not remove as part of solver centralization unless a renderer consumes solver trace buffers directly. Keep display transforms app-side. |
| Ideal Swarm | Delayed potentials and flight-time rows | `partially migrated` | Shared-geometry delayed-potential rows and potential sample buffers. | Runtime still linearizes circular source histories into source segments and retains single-row flight-time wrappers and local orbit kinematics. | Move source-history construction into the solver bridge or a shared solver adapter before deleting app-local segment linearization. Keep mesh aggregation and coloring app-side. |
| Ideal Swarm | Circular self-hit spans | `partially migrated` | Circular self-hit span rows and field-speed regime output are solver-backed. | Path-tint profile code still supplies fallback span profiles and pending-solver display rows. | Delete fallback span authority only after every rendered binary receives either a solver span row or an explicit solver failure row. Keep color and width mapping app-side. |
| Ideal Swarm | Lorentz-state, orbit ribbons, and potential-surface mesh | `still app-local` | Delayed-potential samples can feed the surface. | Orbit basis, return-cycle chart state, ribbon points, surface vertices, color stops, and viewport transforms remain local. | Do not remove renderer geometry. Only migrate orbit/source kinematics if they become the authoritative source history for solver rows. |
| Animator | Motion dataset and path-history stream | `migrated` for motion frames; `partially migrated` for full geometry | Motion simulation, path-history output, dataset manifest, and playback-facing frame buffers are bridge-owned. | Worker adapter still builds a linear fallback request from app config, and dataset conversion currently leaves `fieldShells` and `delayedHits` empty. | Keep dataset conversion. Remove the app-side linear fallback only after authoring emits an explicit solver motion request for every dataset path. |
| Animator | Delayed-hit shell/path intersections | `still app-local` | Shared-geometry has sphere/point and path-history primitives, but Animator delayed-hit events are not yet emitted as solver rows. | Delayed-hit runtime scans emitted shells against receiver path samples, brackets residual sign changes, bisects intersections, and assigns placeholder Jacobian values. | Replace app shell/path scans with solver delayed-hit rows; then delete the local intersection solver and the `jacobian: 1` placeholder path. |
| Animator | Field-shell expansion, emission cadence, and path sampling | `still app-local` | Motion path-history can supply frame buffers. | Scene runtime still samples assembly/core/member paths, creates field shells, advances shell radius from field speed, and feeds app-local delayed-hit generation. | Keep radius and opacity calculation for rendering, but move emission events and shell-hit geometry into solver-owned event rows before using them as diagnostics. |
| Animator | Playback interpolation, camera bounds, and authoring preview geometry | `still app-local` | Solver frames provide authoritative sample rows. | Playback interpolation, bounds, viewport autoscale, curve previews, and authoring transforms remain renderer responsibilities. | Do not remove; this is presentation geometry, not solver-owned physics geometry. |

## Duplicated Geometry

### Circular Source And Orbit Kinematics

Photon, Ideal Swarm, and Animator each compute circular or orbit-like positions from local angle, radius, basis, or phase state:

- Photon state/formula/visual code computes layer radius, layer angle, source center, source position, velocity, and acceleration for circular-source diagnostics and visuals.
- Ideal Swarm runtime computes motion angle, circular source positions, velocities, orbit basis, path-speed ratios, and Lorentz-aligned orbit transforms.
- Animator structure and scene runtime compute orbit basis offsets, member endpoint positions, assembly fallback positions, and path samples for field shells and delayed hits.

Centralization target: solver-owned path descriptors or path-history buffers should supply source/receiver position, velocity, and acceleration wherever those values feed causal roots, delayed potentials, branch ledgers, or hit diagnostics. App-local circular geometry can remain for previews, labels, trails, and visual layout.

### Delayed Direction, Distance, And Branch Weight

Photon formula code reconstructs delayed emission point, receiver displacement, distance, direction, source radial speed, Jacobian denominator, and contribution vectors after solver root discovery. Ideal Swarm delayed potentials already expose distance, displacement, denominator, and potential rows through shared geometry, while Animator delayed hits still compute shell residuals and distance-based strength locally.

Centralization target: delayed direction, distance, residual, branch weight, and contribution terms should be solver-owned row fields for causal-root, delayed-potential, circular-source, and path-history hit calculations. App code should render or rank those rows, not recompute their geometry.

### Source-Segment Normalization And Linearization

Ideal Swarm builds solver requests by linearizing circular source histories into source segments. Photon builds circular-source request structures from app state. Animator builds a linear motion fallback request from app drift configuration.

Centralization target: apps may translate UI state into a solver request, but source-history normalization, large-coordinate handling, path descriptor interpretation, and segment geometry should live in the solver bridge or a solver-owned adapter.

### Shell And Sphere Intersections

Animator delayed-hit generation locally computes shell/path intersections. The solver bridge already contains shared-geometry request and response surfaces for sphere/point intersections and path-history-style output.

Centralization target: field shell, receiver path, residual, bracket, root, and hit-strength rows should be emitted by the solver. Animator should keep render fading and label placement, but should not own the hit solve.

### Field-Speed Regime And Self-Hit Spans

Ideal Swarm circular self-hit spans are now solver-backed, but app profile code still carries fallback visual regimes for sub-field-speed, field-speed, and super-field-speed cases.

Centralization target: the solver should remain the source of field-speed regime, span kind, root bracket, residual, and failure classification. App profile code should map those rows to tint, width, or label presentation only.

### Observer Field And Polarization Summary

Photon formula code samples solver-backed delayed emissions and then computes local analyzer projection, fitted amplitudes, Stokes-like values, phase spread, field ratio, and search scores. Search and diagnostic ranking can remain app-owned, but the physical observer-field samples and phase-at-hit summary are solver-centralization candidates.

Centralization target: solver-owned observer-field sample buffers should expose branch contributions, phase-at-hit diagnostics, and fit-ready field components. Photon search can continue to rank and filter the resulting summaries.

## App Details

### Photon

| Calculation | Current files | Duplicated with | Classification | Safe removal |
| --- | --- | --- | --- | --- |
| Circular-source root request and hits ledger bridge calls | [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js) | Solver bridge circular-source roots and normalized circular-source ledger paths. | `migrated` for the root solve; `partially migrated` for the surrounding summary. | Keep request construction until the bridge accepts a direct Photon source-history descriptor. |
| Circular-source kinematics after roots | [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js), [PhotonStateRuntime.js](../../../src/apps/photon/PhotonStateRuntime.js) | Photon visual circular orbit math; Ideal Swarm and Animator orbit/path kinematics. | `partially migrated` | Remove local fallback kinematic reconstruction after solver rows carry authoritative emission point, source velocity, source acceleration, receiver direction, distance, and phase-at-hit. |
| Jacobian-weighted delayed contribution | [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js) | Ideal Swarm delayed-potential denominator rows; Animator delayed-hit strength placeholders. | `still app-local` | Move branch contribution and Jacobian-weighted field vectors into solver output before deleting local contribution code. |
| Observer projection, polarization fit, and formula summary | [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js), [PhotonRuntime.js](../../../src/apps/photon/PhotonRuntime.js), [PhotonDiagnosticsRuntime.js](../../../src/apps/photon/PhotonDiagnosticsRuntime.js), [PhotonSearchRuntime.js](../../../src/apps/photon/PhotonSearchRuntime.js) | Solver phase diagnostics and future observer-field sample buffers. | `partially migrated` | Preserve search scoring and UI ranking. Move physical observer-field samples and phase summaries behind the solver before deleting fitted-field fallbacks. |
| Canvas trail, analyzer marker, and plot layout geometry | [PhotonSwarmVisualRuntime.js](../../../src/apps/photon/PhotonSwarmVisualRuntime.js), [PhotonRuntime.js](../../../src/apps/photon/PhotonRuntime.js) | Photon state/formula circular orbit math. | `still app-local` | Keep as display geometry unless it starts feeding solver diagnostics. |

### Ideal Swarm

| Calculation | Current files | Duplicated with | Classification | Safe removal |
| --- | --- | --- | --- | --- |
| Delayed-potential and flight-time rows | [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) | Solver shared-geometry delayed-potential rows. | `migrated` for row solving; `partially migrated` for source-history construction. | Remove app-local single-row and segment-linearization wrappers after solver-owned path descriptors replace app-built linear segments. |
| Circular source segment creation | [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) | Photon circular-source descriptors; Animator motion request fallback. | `still app-local` | Move source-history normalization and circular-to-segment conversion into the solver bridge or a shared solver adapter. |
| Circular self-hit spans | [IdealSwarmPathPotentialProfile.js](../../../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js), [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) | Solver shared-geometry circular self-hit span rows. | `migrated` for solver rows; `partially migrated` for fallback profiles. | Remove fallback span authority after solver returns span or fail-closed rows for every rendered binary. |
| Orbit basis, Lorentz state, path-speed ratio, and return-cycle chart geometry | [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) | Photon and Animator orbit/source geometry. | `still app-local` | Keep chart and visual transforms. Migrate only the source/receiver path geometry used to create solver rows. |
| Potential surface mesh, ribbon geometry, and color mapping | [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) | Renderer-only geometry. | `still app-local` | Keep app-side. The solver should supply scalar/vector rows; the app should own mesh construction and color presentation. |

### Animator

| Calculation | Current files | Duplicated with | Classification | Safe removal |
| --- | --- | --- | --- | --- |
| Motion simulation and dataset frame buffers | [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js), [AnimatorSolverBridgeWorkerRuntime.js](../../../src/apps/animator/AnimatorSolverBridgeWorkerRuntime.js) | Solver app bridge motion simulation and path-history output. | `migrated` for motion frames; `partially migrated` for derived event geometry. | Keep dataset conversion. Remove only legacy or fallback app motion generation after every authoring path emits explicit solver requests. |
| Linear motion fallback request | [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js) | Ideal Swarm source-segment construction and Photon app request descriptors. | `partially migrated` | Delete the fallback after the authoring runtime provides a solver-owned motion request for each dataset mode. |
| Field-shell radius, emission center, and emission cadence | [AnimatorFieldShellRuntime.js](../../../src/apps/animator/AnimatorFieldShellRuntime.js), [ArchitrinoSceneAppRuntime.js](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js) | Animator delayed-hit shell intersection and solver shared-geometry sphere/point requests. | `still app-local` | Keep radius and opacity for rendering. Move emission event rows and shell geometry used for delayed-hit detection into the solver. |
| Delayed-hit shell/path intersection | [AnimatorDelayedHitRuntime.js](../../../src/apps/animator/AnimatorDelayedHitRuntime.js), [ArchitrinoSceneAppRuntime.js](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js) | Solver shared geometry, Photon delayed-hit ledgers, Ideal Swarm delayed-potential roots. | `still app-local` | Replace local residual bracketing and bisection with solver delayed-hit rows, then remove the local hit solver and placeholder Jacobian path. |
| Structure orbit basis, member endpoint positions, and path sample generation | [AnimatorStructureGeometryRuntime.js](../../../src/apps/animator/AnimatorStructureGeometryRuntime.js), [ArchitrinoSceneAppRuntime.js](../../../src/apps/architrino/ArchitrinoSceneAppRuntime.js) | Photon and Ideal Swarm circular source/path kinematics. | `still app-local` | Keep authoring previews and labels. Migrate only path samples that feed causal field shells, delayed hits, or solver diagnostics. |
| Playback interpolation, bounds, camera scale, and renderer transforms | [AnimatorSimulationPlaybackRuntime.js](../../../src/apps/animator/AnimatorSimulationPlaybackRuntime.js), [AnimatorStructureGeometryRuntime.js](../../../src/apps/animator/AnimatorStructureGeometryRuntime.js) | Renderer-only geometry. | `still app-local` | Keep app-side. These transforms present solver frames and do not need solver ownership. |

## Recommended Safe Removal Sequence

1. Keep the current bridge targets as the migration spine: Photon causal roots, Photon circular-source roots/hits ledger, Ideal Swarm delayed potentials, Ideal Swarm circular self-hit spans, and Animator motion datasets.
2. Add solver output fields before deleting app geometry. Required fields include source point, receiver point, velocity, acceleration, delayed direction, distance, residual, denominator or branch weight, phase-at-hit, hit kind, and failure classification where applicable.
3. Photon first safe removal: replace `PhotonFormulaRuntime.js` delayed-emission reconstruction with solver-emitted contribution rows, then remove the local kinematic fallback and Jacobian contribution path after parity baselines cover observer-field summaries.
4. Ideal Swarm first safe removal: move circular source-history construction out of `IdealSwarmRuntime.js`, then remove the single-row flight-time wrapper and fallback span authority after batched solver rows are complete.
5. Animator first safe removal: introduce solver delayed-hit rows from path-history streams, compare them against the current shell/path intersection output, then remove `findShellPathIntersection`, local delayed-hit bracketing, and placeholder Jacobian generation.
6. Do not remove display-only geometry during solver centralization. Photon canvas trails, Ideal Swarm surface meshes and ribbons, Animator playback interpolation, camera bounds, opacity, labels, and authoring previews remain app responsibilities.

## Removal Guardrails

- Do not delete app geometry that only renders solver output.
- Do not delete request-building code until the bridge accepts the app's state through a solver-owned descriptor or adapter.
- Do not delete fallback profile code until solver failure rows are explicit enough for the UI to distinguish no-hit, pending-data, out-of-envelope, and numerical-failure cases.
- Do not treat app search ranking as solver geometry. Ranking may stay app-owned as long as the physical inputs being ranked are solver-owned rows or summaries.
- Do not claim full geometry centralization while Animator delayed hits are still generated by app-local shell/path intersection.

## Completion Judgment

`geometry_centralization_inventory` is complete as an inventory task and closed
in [solver.md](solver.md). The duplicated and app-local solver geometry in
Photon, Ideal Swarm, and Animator is identified, classified, and sequenced for
safe removal.

The remaining work is migration implementation: add solver-owned row fields and
adapter paths before deleting the app-local geometry named above.
