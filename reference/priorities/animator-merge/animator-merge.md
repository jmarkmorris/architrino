# Animator Merge Direction

This note records the current direction for merging the useful parts of `src/apps/sim2/` and `scripts/simulations/` toward `src/apps/animator/`. The target is not a sim2 rewrite. The target is an evolved animator that keeps its 3-D authoring and visualization surface while gaining a master-equation simulation mode.

## Direction

Animator is the destination application. Its current 3-D scene, authoring, camera, timeline, path, save, and playback capabilities remain baseline requirements. The simulation work should extend animator rather than creating another standalone runtime.

`scripts/simulations/` is the best current source for solver discipline. It should guide the reusable simulation engine: delayed causal-root solving, exact branch-resolved finite-history sums where the branch chart stays simple, Jacobian diagnostics, halt reasons, convergence checks, and batch output.

`src/apps/sim2/` is the best current source for field-shell and delayed-hit visual language. Its Python/PyGame/ModernGL runtime should be treated as a reference prototype, not the target implementation.

## Core Requirements

0. Preserve everything useful in animator, while allowing animator to evolve.
1. Add a simulation mode whose particle positions, velocities, field shells, and delayed hits are derived from the Master EOM and not from authored path shortcuts.
2. Keep the visualization beautiful and 3-D, based on animator's Three.js renderer and authoring surface.
3. Add a 2-D planar mode for planar simulations, with the same solver-derived provenance rules and with a view that can sit beside or replace the 3-D view when the simulation target is intrinsically planar.
4. Render field shells, delayed hits, and path animation with fadeable trails. Trails may be solid or dotted, with visual controls for opacity, lifetime, and diagnostic emphasis.
5. Keep optional authored paths for imagineering, animation, and explanatory scenes.
6. Support offline or batch simulation when precision needs it. The runtime does not have to solve in real time, but it should avoid slow simulation technologies and should be built for profiling, caching, and later acceleration.
7. Keep authoring UI as a first-class feature: scene setup, particle setup, authored path editing, simulation controls, playback, camera waypoints, and export.

## Technology Choices By Category

| Category | Best current source | Target technology |
|---|---|---|
| Product shell | `src/apps/animator/` | Continue with animator as the app surface. |
| 3-D rendering | `src/apps/animator/` | Three.js scene graph, camera controls, lines, meshes, sprites, labels, and timeline rendering. |
| 2-D planar mode | `src/apps/sim2/` for planar visual semantics; `src/apps/animator/` for UI integration | Add an animator view mode that constrains or projects solver data onto a planar surface while retaining animator playback, trails, and diagnostics. |
| Authoring UI | `src/apps/animator/` | Extend the existing document workspace, path editor, timeline, library/save flow, and camera waypoint tools. |
| Solver semantics | `scripts/simulations/` | Extract a focused JavaScript or TypeScript solver module, with Web Worker execution and typed-array frame buffers. |
| Delayed causal roots | `scripts/simulations/` | Keep branch-root search, causal residual checks, Jacobian diagnostics, and fail-closed halt reporting. |
| Field shells | `src/apps/sim2/` | Rebuild as Three.js shell geometry or shader-assisted shell rendering. |
| Delayed hit visuals | `src/apps/sim2/` for visuals; `scripts/simulations/` for correctness | Render solver-derived hits using sim2-inspired connectors, emission points, shell intersections, and hit tables. |
| Path animation | `src/apps/animator/` | Keep authored spline/polyline paths and add solver-derived trails as a separate motion source. |
| Offline playback | `scripts/simulations/` | Produce cached simulation datasets for animator scrubbing, inspection, and video export. |
| Performance path | `src/apps/animator/` plus extracted solver | Start with Web Workers and typed arrays; consider WASM, WebGPU, or shader kernels only after profiling identifies the bottleneck. |

## Required Separation

Animator should distinguish two motion sources:

- **Solver-derived motion**: positions, velocities, field shells, and delayed hits produced by the Master EOM simulation engine.
- **Authored motion**: user-authored paths used for imagineering, explanatory animation, camera staging, and non-certifying demonstrations.

The UI may display both, but it must not silently treat authored paths as simulation output. Solver-derived scenes should carry simulation provenance, configuration, diagnostics, and halt status.

## Simulation Dataset Contract

The bridge from solver to animator should use a durable dataset format rather than coupling renderer code directly to solver internals.

Each simulation dataset should include:

- Simulation provenance: engine id, version, input config, timestep policy, precision settings, and claim level.
- Frame samples: time, particle ids, positions, velocities, polarity, phase or radial diagnostics when available.
- Field-shell samples: emitter id, emission time, emission position, shell radius, sign, display strength, and optional branch id.
- Delayed-hit samples: receiver id, emitter id, hit time, emission time, receiver position, emitter emission position, strength, branch/Jacobian diagnostics, and failure or halt reasons when relevant.
- Aggregate diagnostics: root failures, unresolved roots, max roots per pair, max acceleration, conserved-quantity proxies, and convergence metadata when available.

Animator can then render the dataset with scrub/play controls without requiring the solver to run at display frame rate.

## Working Loop

Each implementation step should follow the same loop:

1. Refresh the current behavior in `src/apps/sim2/`, `scripts/simulations/`, or `src/apps/animator/` for the function being moved or extended.
2. Implement the next animator-centered change.
3. Report exactly how the operator/developer can test it.
4. Collect operator/developer feedback.
5. Revise and repeat until that step is accepted.

## Implementation Roadmap

1. **Complete: dataset contract and fixture**: define the animator simulation dataset schema, including frames, particles, shells, delayed hits, diagnostics, halt status, and provenance. Add one static fixture that animator can load and display without running a solver.
2. **Complete: playback bridge**: add a dataset playback path in animator so sampled solver frames can drive particle positions, trails, timeline scrubbing, and diagnostics without touching authored-path behavior.
3. **Current: motion-source separation**: add explicit UI/state separation between solver-derived motion and authored motion, including visible provenance and mode labels.
4. **2-D planar mode**: add an animator view mode for planar simulations, preserving solver-derived diagnostics while allowing a flat 2-D view for cases where the simulation target is planar.
5. **Solver module extraction**: refactor the useful `scripts/simulations/` behavior behind a reusable module interface while preserving the existing command-line scripts and outputs.
6. **Worker simulation runner**: add a Web Worker runner that can generate or stream simulation frames into animator using typed arrays or another profiled frame-buffer format.
7. **Field-shell rendering**: port sim2 shell semantics into animator, including expanding emission shells, shell visibility controls, opacity controls, and white zero-field semantics where appropriate.
8. **Delayed-hit rendering**: render solver-derived delayed hits with emission points, receiver points, branch/Jacobian diagnostics, hit connectors, and hit-table data.
9. **Fadeable trails**: add solid and dotted trail rendering for solver-derived paths, with lifetime, opacity, and diagnostic emphasis controls.
10. **Simulation authoring UI**: add scene setup, particle setup, solver parameters, run/cache controls, and diagnostic panels to the animator authoring surface.
11. **Offline/cache workflow**: support long-running or high-precision simulations that bake datasets for animator playback, inspection, and export.
12. **Parity and retirement decision**: compare animator against sim2 and `scripts/simulations/` for the covered functions, close remaining visual or solver gaps, then decide whether sim2 stays archived as reference or is removed.

## Non-Goals

- Do not make sim2 the destination application.
- Do not preserve the Python/PyGame runtime for long-term production use unless a concrete benchmark or workflow requires it.
- Do not mix authored paths with solver-derived motion without a visible mode/provenance distinction.
- Do not add new validation infrastructure unless it directly protects the Master EOM simulation path or the animator playback contract.

## Related Priorities

- [simulations](../simulations/simulations.md)
- [animator](../animator/animator.md)

## Related AAA Notes

- [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [architrino](../../../content/markdown/aaa/validation/simulations/architrino.md)
- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../../content/markdown/aaa/archie/scene-taxonomy.md)
