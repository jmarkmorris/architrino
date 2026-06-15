# Solver

## Changes Wanted First

1. `sim2` is likely approaching retirement. Treat it as a reference prototype for field-shell and delayed-hit visual language, not as the long-term solver destination.
2. This workstream is not about every general-purpose tool with `solve` or `solver` in its name. Its scope is tools that solve architrino motion, causal roots, delayed hits, and geometry.
3. The solver must be high-speed and efficient enough to support interactive apps, batch simulations, and reusable diagnostics. The implementation language and runtime are therefore first-order design decisions, not afterthoughts.
4. The solver needs an explicit capability and API list before implementation: motion solving, causal-root solving, delayed-hit solving, geometry calculations, dataset output, diagnostics, worker or batch execution, and app adapters.
5. Geometry calculations should be centralized around solver-owned simulation and geometry routines instead of being scattered across Photon, Ideal Swarm, Animator, `sim2`, and proof scripts.
6. Once the solver design and first implementation exist, the repo needs a migration plan for existing solver use cases.

## Workstream Metadata

- Kind: `priority`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Current

The repo currently has multiple solver-like paths that grew around different app and proof needs. The working count is 4 app-facing solver paths and about 10 meaningful solver families overall.

Raw grep counts are misleading. A narrower inventory pass found 90 executable source files with solver-like terms under `src/apps`, `scripts`, and `pdgsolve.py`; a broader live `solve|solver` pass is even noisier. Those counts are evidence of scattered responsibilities, not the target scope for this workstream.

The reusable solver target is an architrino motion and geometry solver. It should solve source histories, causal roots, branch-resolved delayed hits, Jacobian-weighted interaction terms, and app-ready simulation datasets. General checkers, fit helpers, layout utilities, proof sidecars, and unrelated helper functions are out of scope unless they directly consume or validate architrino motion and geometry.

## App-Facing Solver Paths

| App | Current solver path | Notes |
| --- | --- | --- |
| Photon | `solvePhotonCausalRoots` in [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js) | Photon-local causal-root scan for observer-field diagnostics. |
| Ideal Swarm | `solveFlightTime` in [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js) and `solveCircularSelfHitSpan` in [IdealSwarmPathPotentialProfile.js](../../../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js) | Delayed-potential iteration plus circular self-hit span logic. |
| Animator | `runAnimatorSimulationWorkerRequest` in [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js), backed by [assembly-dynamics-solver.mjs](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs) through [assembly-dynamics-engine.mjs](../../../scripts/simulations/lib/assembly-dynamics-engine.mjs) | Closest current app bridge to solver-derived datasets. |
| `sim2` | hit-detection causal simulation in [orbits.py](../../../src/apps/sim2/orbits.py) | Reference prototype and likely retirement candidate after migration. |

## Meaningful Solver Families

1. Photon causal-root field solver.
2. Assembly dynamics causal-root solver, reused by Animator.
3. Ideal Swarm delayed-potential and self-hit solver.
4. `sim2` causal hit detector.
5. `pdgsolve` reaction and assembly closure solver, with the delegating entrypoint at [pdgsolve.py](../../../pdgsolve.py).
6. Neutral-swarm geometry and root solver family.
7. Mass-map $A_0$ branch and residual solver family.
8. Nested-shell swarm toy solvers.
9. Proof-program LP and collocation screen solvers.
10. Cosmology residual-fit linear solver.

## Closest Existing Reusable Engine

For reusable photon and app-facing solver work, the closest existing reusable engine is the assembly-dynamics causal-root solver in [assembly-dynamics-solver.mjs](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs), exposed to app datasets through [assembly-dynamics-engine.mjs](../../../scripts/simulations/lib/assembly-dynamics-engine.mjs).

It already has source histories, finite-history causal-root search, self and partner hits, Jacobian diagnostics, unresolved-root halt reporting, and an Animator dataset bridge. It is still a toy solver and does not yet provide the full geometry, API, performance, or branch-certification contract needed for a central solver.

## Solver Responsibilities

The central solver should provide these capabilities:

1. Motion solving for architrino assemblies, including positions, velocities, polarity bookkeeping, phase diagnostics, and integration status.
2. Causal-root solving over source and receiver histories, including all retained branches, residuals, bracket data, and unresolved-root diagnostics.
3. Delayed-hit solving for self and partner interactions, with emission time, hit time, emitter, receiver, distance, causal-delay Jacobian, strength, and halt reason when relevant.
4. Jacobian-weighted interaction terms using branch weights based on $1/|J_{ij}|$ where the current model requires that branch factor.
5. Geometry calculations used by apps and simulations: source positions, receiver positions, distances, directions, circular self-hit spans, shell intersections, branch-local vectors, frame transforms, and planar or 3-D projection data.
6. Simulation dataset output for app playback, scrubbing, diagnostics, export, and comparison runs.
7. Deterministic diagnostics: engine id, version, input config, timestep policy, precision settings, root tolerances, halt status, root failure counts, and aggregate branch statistics.
8. Worker, batch, and offline execution modes so apps can stay responsive while long or high-precision runs produce cached datasets.
9. App adapters for Photon, Ideal Swarm, Animator, and any remaining `sim2` use cases during migration.
10. Test fixtures or benchmark scenarios that compare old app-local behavior against solver-derived behavior before app code is simplified.

## API Surface To Design

The first design pass should specify these API responsibilities before names are locked:

| API responsibility | Required output |
| --- | --- |
| Run an architrino motion simulation | Frames with positions, velocities, phases, diagnostics, and halt status. |
| Solve causal roots for a source-receiver history pair | Root list with emission time, delay, residual, branch metadata, and unresolved-root diagnostics. |
| Solve delayed hits | Hit records with emitter, receiver, emission point, receiver point, $J_{ij}$, strength, and source branch. |
| Produce app playback data | A dataset compatible with Animator-style frame buffers and app diagnostics. |
| Compute shared geometry | Centralized geometry outputs for paths, distances, intersections, shell surfaces, and projection views. |
| Run in a browser worker | Request and response messages with typed data where profiling justifies it. |
| Run offline or in batch | CLI or script entrypoint with reproducible input, output, diagnostics, and benchmark metadata. |
| Compare legacy paths | Parity reports that show where Photon, Ideal Swarm, Animator, and `sim2` behavior matches or diverges. |

## Language And Runtime Priority

The solver language decision should be made early because speed, memory layout, browser execution, and offline batch execution all depend on it.

Priority candidates:

1. Rust compiled to WebAssembly for a high-speed core with browser and CLI bindings.
2. TypeScript or JavaScript with typed arrays and Web Workers for the shortest path from the current app code.
3. C++ compiled to WebAssembly only if a concrete numeric library or benchmark justifies the added maintenance cost.
4. Python remains useful for reference prototypes and research scripts, but should not be the default production app solver path unless a measured workflow requires it.

The decision should be benchmark-driven. Minimal benchmark targets should include causal-root throughput, branch count scaling, memory use for source histories, worker transfer cost, and app-frame latency under Photon, Ideal Swarm, and Animator-like workloads.

## Geometry Centralization Target

The central solver should become the preferred home for geometry calculations that are currently duplicated or implied in app-local code. The target is not a generic geometry library. The target is solver-owned geometry for architrino motion and causal interaction:

- source and receiver history sampling;
- branch-local displacement, distance, direction, and velocity projection;
- circular and helical orbit geometry used by swarm candidates;
- field-shell and delayed-hit geometry;
- planar and 3-D projection data for rendering;
- photon pair source-history geometry;
- self-hit span and branch-window calculations;
- dataset geometry for paths, trails, shells, delayed-hit connectors, and diagnostic tables.

Apps should request solver-derived geometry outputs instead of recomputing solver-adjacent geometry in separate local helpers.

## Migration Plan Needed

After the first solver design lands, create a migration plan with these steps:

1. Inventory every app-facing and script-facing use case that currently computes architrino motion, causal roots, delayed hits, or solver-adjacent geometry.
2. Define the central solver contract and the minimum stable dataset schema.
3. Build a minimal benchmarked solver core and compare it against the Photon, Ideal Swarm, Animator, and `sim2` paths.
4. Migrate Animator first where the dataset bridge already exists.
5. Migrate Photon causal-root diagnostics to the shared causal-root and source-history APIs.
6. Migrate Ideal Swarm delayed-potential and self-hit calculations to shared geometry and causal-delay routines.
7. Preserve unique `sim2` visual semantics only until Animator or the central solver owns the equivalent field-shell and delayed-hit outputs.
8. Decide whether `sim2` is archived as a reference prototype or removed once parity and migration are complete.
9. Remove or simplify app-local solver and geometry code after parity tests confirm the new solver path.
10. Keep proof-program, mass-map, neutral-swarm, nested-shell, and cosmology solver families connected only where they share genuine architrino motion, branch geometry, or diagnostic contracts.

## Task Queue

1. `language_runtime_decision` - Benchmark Rust/WASM, TypeScript typed arrays with workers, and any justified C++/WASM path against representative causal-root and source-history workloads. Status: `active`. Depends on: none.
2. `solver_contract` - Define the central solver inputs, outputs, dataset schema, diagnostics, halt statuses, and API boundaries. Status: `active`. Depends on: `language_runtime_decision`.
3. `geometry_centralization_inventory` - Identify duplicated or app-local solver geometry in Photon, Ideal Swarm, Animator, `sim2`, and scripts. Status: `next`. Depends on: `solver_contract`.
4. `minimal_causal_root_core` - Implement or extract the first central causal-root core with source histories, branch diagnostics, and benchmark hooks. Status: `next`. Depends on: `solver_contract`.
5. `animator_adapter` - Route Animator simulation runs through the central solver contract while preserving the existing dataset playback surface. Status: `pending`. Depends on: `minimal_causal_root_core`.
6. `photon_adapter` - Replace Photon-local causal-root diagnostics with shared source-history and causal-root calls. Status: `pending`. Depends on: `minimal_causal_root_core`.
7. `ideal_swarm_adapter` - Replace Ideal Swarm delayed-potential and self-hit calculations with shared solver geometry. Status: `pending`. Depends on: `minimal_causal_root_core`.
8. `sim2_retirement_plan` - Compare remaining `sim2` semantics against central solver and Animator coverage, then archive or remove `sim2` after parity. Status: `pending`. Depends on: `animator_adapter`.
9. `legacy_solver_family_map` - Decide which non-app solver families should consume the central solver contract, which should stay separate, and which should only exchange artifacts or diagnostics. Status: `pending`. Depends on: `geometry_centralization_inventory`.

## Related Priorities

- [animator-merge](../animator-merge/animator-merge.md)
- [simulations](../simulations/simulations.md)
- [photon-app](../photon-app/photon-app.md)
