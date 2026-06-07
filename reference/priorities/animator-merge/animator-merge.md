# Animator Merge Direction

Status: deferred priority note.

This note records the current direction for merging the useful parts of `src/apps/sim2/` and `scripts/simulations/` toward `src/apps/animator/`. The target is not a sim2 rewrite. The target is an evolved animator that keeps its 3-D authoring and visualization surface while gaining a master-equation simulation mode.

## Direction

Animator is the destination application. Its current 3-D scene, authoring, camera, timeline, path, save, and playback capabilities remain baseline requirements. The simulation work should extend animator rather than creating another standalone runtime.

`scripts/simulations/` is the best current source for solver discipline. It should guide the reusable simulation engine: delayed causal-root solving, exact branch-resolved finite-history sums where the branch chart stays simple, Jacobian diagnostics, halt reasons, convergence checks, and batch output.

`src/apps/sim2/` is the best current source for field-shell and delayed-hit visual language. Its Python/PyGame/ModernGL runtime should be treated as a reference prototype, not the target implementation.

## Core Requirements

0. Preserve everything useful in animator, while allowing animator to evolve.
1. Add a simulation mode whose particle positions, velocities, field shells, and delayed hits are derived from the Master EOM and not from authored path shortcuts.
2. Keep the visualization beautiful and 3-D, based on animator's Three.js renderer and authoring surface.
3. Render field shells, delayed hits, and path animation with fadeable trails. Trails may be solid or dotted, with visual controls for opacity, lifetime, and diagnostic emphasis.
4. Keep optional authored paths for imagineering, animation, and explanatory scenes.
5. Support offline or batch simulation when precision needs it. The runtime does not have to solve in real time, but it should avoid slow simulation technologies and should be built for profiling, caching, and later acceleration.
6. Keep authoring UI as a first-class feature: scene setup, particle setup, authored path editing, simulation controls, playback, camera waypoints, and export.

## Technology Choices By Category

| Category | Best current source | Target technology |
|---|---|---|
| Product shell | `src/apps/animator/` | Continue with animator as the app surface. |
| 3-D rendering | `src/apps/animator/` | Three.js scene graph, camera controls, lines, meshes, sprites, labels, and timeline rendering. |
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

## Implementation Phases

1. Define the animator simulation dataset schema and add a small static fixture rendered inside animator.
2. Extract the useful `scripts/simulations/` solver behavior behind a reusable module interface while preserving command-line output.
3. Add a Web Worker runner that can generate or stream simulation frames into animator.
4. Port sim2 visual semantics into animator: white zero-field background where appropriate, expanding shells, emission points, delayed hit connectors, and fadeable trails.
5. Add UI controls for simulation setup, run/cache status, diagnostics, shell visibility, hit visibility, trail style, and authored-vs-solver motion source.
6. Keep sim2 available as a reference until animator reaches visual parity for shells, hits, and trails; then decide whether to archive or delete the Python runtime.

## Non-Goals

- Do not make sim2 the destination application.
- Do not preserve the Python/PyGame runtime for long-term production use unless a concrete benchmark or workflow requires it.
- Do not mix authored paths with solver-derived motion without a visible mode/provenance distinction.
- Do not add new validation infrastructure unless it directly protects the Master EOM simulation path or the animator playback contract.

## Related Priorities

- [simulations](../simulations/simulations.md)
- [animator-reaction](../deferred/pdg/pdg.md)
- [animator](../animator/animator.md)

## Related AAA Notes

- [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md)
- [architrino](../../../content/markdown/aaa/validation/simulations/architrino.md)
- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../../content/markdown/aaa/archie/scene-taxonomy.md)
