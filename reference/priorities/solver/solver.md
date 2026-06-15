# Solver

## Changes Wanted First

1. `sim2` is likely approaching retirement. Treat it as a reference prototype for field-shell and delayed-hit visual language, not as the long-term solver destination.
2. This workstream is not about every general-purpose tool with `solve` or `solver` in its name. Its scope is tools that solve architrino motion, causal roots, delayed hits, and geometry.
3. The solver must be high-speed and efficient enough to support interactive apps, batch simulations, and reusable diagnostics. The implementation language and runtime are therefore first-order design decisions, not afterthoughts.
4. The solver must offer excellent precision across many orders of magnitude. Dynamic range, numerical conditioning, precision modes, and explicit error budgets are core design requirements.
5. Path histories can consume memory quickly. The solver needs per-path data streams that keep only a bounded active window in memory, spill high-speed path data to files, and read those files back at high speed.
6. Path-history streams need explicit indices and metadata: path id, time range, frame range, byte offsets, precision mode, units, scale normalization, schema version, checksums, provenance, and diagnostic summaries.
7. The solver needs an explicit capability and API list before implementation: motion solving, causal-root solving, delayed-hit solving, geometry calculations, dataset output, diagnostics, worker or batch execution, path-history streaming, file-backed storage, indexed readback, and app adapters.
8. Geometry calculations should be centralized around solver-owned simulation and geometry routines instead of being scattered across Photon, Ideal Swarm, Animator, `sim2`, and proof scripts.
9. Once the solver design and first implementation exist, the repo needs a migration plan for existing solver use cases.

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

The reusable solver target is an architrino motion and geometry solver. It should solve source histories, causal roots, branch-resolved delayed hits, Jacobian-weighted interaction terms, and app-ready simulation datasets. It must be precise over very small and very large geometry, time, velocity, residual, and branch-weight scales. It must also treat long path histories as streamable data, not as unbounded in-memory arrays. General checkers, fit helpers, layout utilities, proof sidecars, and unrelated helper functions are out of scope unless they directly consume or validate architrino motion and geometry.

## App-Facing Solver Paths

| App | Current solver path | Notes |
| --- | --- | --- |
| Photon | `solvePhotonCausalRoots` in [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js#L198) | Photon-local causal-root scan for observer-field diagnostics. |
| Ideal Swarm | `solveFlightTime` in [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js#L421) and `solveCircularSelfHitSpan` in [IdealSwarmPathPotentialProfile.js](../../../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js#L53) | Delayed-potential iteration plus circular self-hit span logic. |
| Animator | `runAnimatorSimulationWorkerRequest` in [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js#L21), backed by [assembly-dynamics-solver.mjs](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs#L323) through [assembly-dynamics-engine.mjs](../../../scripts/simulations/lib/assembly-dynamics-engine.mjs) | Closest current app bridge to solver-derived datasets. |
| `sim2` | hit-detection causal simulation in [orbits.py](../../../src/apps/sim2/orbits.py#L1123) | Reference prototype and likely retirement candidate after migration. |

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

It already has source histories, finite-history causal-root search, self and partner hits, Jacobian weighting, Jacobian diagnostics, unresolved-root halt reporting, and an Animator dataset bridge. It is still a toy solver and does not yet provide the full geometry, API, performance, or branch-certification contract needed for a central solver.

## Solver Responsibilities

The central solver should provide these capabilities:

1. Motion solving for architrino assemblies, including positions, velocities, polarity bookkeeping, phase diagnostics, and integration status.
2. Causal-root solving over source and receiver histories, including all retained branches, residuals, bracket data, and unresolved-root diagnostics.
3. Delayed-hit solving for self and partner interactions, with emission time, hit time, emitter, receiver, distance, causal-delay Jacobian, strength, and halt reason when relevant.
4. Jacobian-weighted interaction terms using branch weights based on $1/|J_{ij}|$ where the current model requires that branch factor.
5. Geometry calculations used by apps and simulations: source positions, receiver positions, distances, directions, circular self-hit spans, shell intersections, branch-local vectors, frame transforms, and planar or 3-D projection data.
6. Scale-aware numerical precision across many orders of magnitude, including declared precision modes, conditioning diagnostics, residual error budgets, and nondimensionalized or rescaled variables where needed.
7. Per-path history streams that append path samples without keeping entire long trajectories in memory.
8. High-speed spill-to-file and high-speed readback for long runs, including chunked binary path data and compact metadata manifests.
9. Indices for path id, time range, frame range, chunk offsets, delayed-hit events, causal-root events, and diagnostics so apps can scan or seek without loading the whole run.
10. Simulation dataset output for app playback, scrubbing, diagnostics, export, and comparison runs.
11. Deterministic diagnostics: engine id, version, input config, timestep policy, precision settings, dynamic-range assumptions, stream storage format, root tolerances, halt status, root failure counts, and aggregate branch statistics.
12. Worker, batch, and offline execution modes so apps can stay responsive while long or high-precision runs produce cached datasets.
13. App adapters for Photon, Ideal Swarm, Animator, and any remaining `sim2` use cases during migration.
14. Test fixtures or benchmark scenarios that compare old app-local behavior against solver-derived behavior before app code is simplified.

## API Surface To Design

The first design pass should specify these API responsibilities before names are locked:

| API responsibility | Required output |
| --- | --- |
| Run an architrino motion simulation | Frames with positions, velocities, phases, diagnostics, and halt status. |
| Solve causal roots for a source-receiver history pair | Root list with emission time, delay, residual, branch metadata, and unresolved-root diagnostics. |
| Solve delayed hits | Hit records with emitter, receiver, emission point, receiver point, $J_{ij}$, strength, and source branch. |
| Control precision and dynamic range | Precision mode, scale normalization, tolerance policy, error budget, and conditioning diagnostics. |
| Open a path-history stream | Stream id, path id mapping, declared columns, sample stride, precision metadata, and storage policy. |
| Append path samples | Chunked path data written with bounded memory, backpressure reporting, and spill-to-file status. |
| Read path samples | High-speed range scans and random access by path id, time range, frame range, or chunk id. |
| Read path indices and metadata | Manifest, index tables, byte offsets, time ranges, checksums, units, scale normalization, provenance, and diagnostics. |
| Produce app playback data | A dataset compatible with Animator-style frame buffers and app diagnostics. |
| Compute shared geometry | Centralized geometry outputs for paths, distances, intersections, shell surfaces, and projection views. |
| Run in a browser worker | Request and response messages with typed data where profiling justifies it. |
| Run offline or in batch | CLI or script entrypoint with reproducible input, output, diagnostics, and benchmark metadata. |
| Compare legacy paths | Parity reports that show where Photon, Ideal Swarm, Animator, and `sim2` behavior matches or diverges. |

## Path-History Streaming And Storage

Long solver runs should not accumulate every path sample in application memory. The storage model should use path-history streams: append-only per-path or per-run streams that keep a short active window in memory while older samples spill to a file-backed store.

The dense path data should use a high-throughput binary layout rather than dense JSON. JSON remains appropriate for manifests, summaries, and small diagnostic records. The binary stream should be chunked so writers can append quickly, readers can seek directly to a time or frame window, and corrupted or incomplete chunks can be detected.

Each path-history stream should support:

- append-only writes from the solver loop;
- bounded in-memory buffers with explicit backpressure when file writes fall behind;
- fast spill-to-file during batch and long interactive runs;
- fast readback for app playback, scrubbing, comparison, export, and diagnostics;
- contiguous range scans by path id and time;
- random access by path id, frame index, time range, or chunk id;
- optional event streams for causal roots, delayed hits, halts, and diagnostic threshold crossings;
- clear separation between dense sample data and metadata manifests.

Required indices:

| Index | Purpose |
| --- | --- |
| Path id index | Maps architrino, receiver, source, assembly, or app path ids to stream chunks. |
| Time index | Maps time ranges to chunk offsets for range reads and scrubbing. |
| Frame index | Maps solver frame or sample numbers to chunk offsets. |
| Chunk index | Records byte offsets, row counts, time bounds, checksums, and column layout per chunk. |
| Event index | Locates delayed hits, causal roots, halt events, and diagnostic threshold crossings. |
| Provenance index | Connects chunks to solver config, precision mode, scale normalization, and app adapter. |

Required metadata:

- schema version and stream format version;
- solver engine id, engine version, and API version;
- source app or script, run id, and input config hash;
- path id map and path role map;
- units, coordinate convention, time convention, and scale normalization;
- precision mode, stored numeric type, tolerance policy, and residual error budget;
- chunk duration, sample stride, column layout, byte order, compression choice if any, and checksum method;
- global and per-path time bounds, frame bounds, sample counts, and min/max ranges;
- root, delayed-hit, halt, and diagnostic aggregate summaries;
- compatibility notes for app playback and migration.

## Language, Precision, And Runtime Priority

The solver language decision should be made early because speed, precision, memory layout, path-history streaming, browser execution, and offline batch execution all depend on it.

The selected production-core language is C++ with Clang/LLVM because the solver's precision and dynamic-range requirements are decisive. The scorecard remains as a decision audit and benchmark guide. Use a `1` to `5` score for each characteristic, multiply by the weight, and compare the weighted total out of `500`.

| Characteristic | Weight | Why it matters |
| --- | ---: | --- |
| Speed and throughput | 20 | Causal roots, delayed hits, geometry, and stream writes must run fast enough for interactive and batch workloads. |
| Precision and dynamic range | 16 | The solver must stay accurate across many orders of magnitude. |
| Memory and streaming control | 14 | Long path histories need bounded memory, file-backed streaming, and predictable buffer ownership. |
| Cody implementation quality leverage | 12 | The chosen language should let Cody produce extremely high quality, reviewable, testable, maintainable solver code. |
| Browser/WASM plus native CLI portability | 10 | The same core should support app workers and offline/batch runs. |
| Open-source compiler/toolchain | 8 | The solver should not depend on a proprietary compiler lock-in. |
| Numerical and geometry ecosystem | 8 | Root finding, precision tooling, SIMD, interval methods, and geometry helpers can reduce risk. |
| Existing repo integration cost | 5 | The current app stack is JavaScript-first, so bridge cost matters. |
| Build, test, and profiling tooling | 4 | The solver needs repeatable benchmarks, correctness tests, and performance traces. |
| Maturity and long-term maintainability | 3 | The core should remain maintainable as the project grows. |

| Rank | Language | Speed 20 | Precision 16 | Memory/streaming 14 | Cody quality 12 | Browser/CLI 10 | Open compiler 8 | Numeric ecosystem 8 | Repo fit 5 | Tooling 4 | Maturity 3 | Weighted total | Current read |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 1 | C++ with Clang/LLVM | 5.0 | 5.0 | 5.0 | 4.5 | 4.5 | 5.0 | 5.0 | 3.0 | 4.5 | 5.0 | `477.0 / 500` | Selected production-core candidate because precision libraries and numeric control dominate. |
| 2 | Rust | 5.0 | 4.5 | 5.0 | 4.5 | 5.0 | 5.0 | 4.0 | 3.0 | 4.5 | 4.5 | `464.5 / 500` | Strong fallback candidate if C++ build, binding, or safety controls fail benchmarks. |

Detailed Rust versus option 2 comparison:

| Decision area | Rust | C++ with Clang/LLVM |
| --- | --- | --- |
| Default role | Strong fallback production-core candidate if C++ fails build, binding, or implementation-control gates. | Selected production-core candidate because raw numeric control and mature precision libraries are decisive. |
| Speed ceiling | Very high. LLVM-backed optimization, zero-cost abstractions, predictable value types, and explicit ownership make fast kernels realistic. | Highest possible ceiling. C++ still has the deepest low-level optimization, SIMD, intrinsics, and HPC tradition. |
| Precision strategy | Strong for carefully designed `f64` kernels, fixed-point-like scaled values, explicit tolerance types, and optional crate-backed high precision. | Strongest for mature arbitrary precision, interval arithmetic, directed rounding, and specialized numeric libraries. |
| Memory safety | Strong language-level guardrails from ownership and borrowing. | Must be designed with explicit ownership boundaries, RAII, value types, narrow spans/views, sanitizer gates, fuzz tests, and no unchecked pointer-style stream API. |
| Path-history streaming | Strong fit. Ownership, slices, iterators, and explicit buffer lifetimes are good for bounded memory and append-only chunk writers. | Strong raw control for custom binary layouts, memory mapping, and zero-copy reads. The implementation must make stream ownership and buffer lifetimes part of the API contract. |
| File-backed read/write performance | High. Rust can write tight binary IO and memory-mapped readers while keeping APIs safer. | Very high. Mature IO, memory mapping, and profiling paths exist across platforms. |
| Browser/WASM app bridge | Strong. Rust-to-WASM is a common production path, and Rust can also build native CLI tools. | Strong with an explicit binding plan. Clang/LLVM and Emscripten/WASI paths are capable, and the project must keep app bindings thin and generated or tightly tested. |
| Native CLI and batch mode | Strong. Cargo, cross compilation, and static binaries make repeatable batch tools practical. | Strong. Native performance and mature build systems are proven; the solver must define one canonical build path instead of accepting build-system sprawl. |
| Cody implementation quality | Strong. The type system and compiler diagnostics help keep invariants explicit. | Strong when held to the project standard. Cody is expected to implement expert-level C++ with strict invariants, tests, benchmarks, sanitizers, and small ownership-focused modules. |
| Error handling | Strong. `Result`, typed errors, and exhaustive matching fit solver halt reasons and diagnostics. | Strong if standardized. The project should use explicit status/result types for solver halts, IO failures, precision failures, and branch diagnostics instead of mixed ad hoc conventions. |
| API design clarity | Strong. Rust structs, enums, traits, and modules encourage narrow contracts for solver, stream, index, and metadata boundaries. | Strong if designed up front. C++ interfaces must be narrow, value-oriented, and separated into solver core, stream writer, index reader, metadata, and app-binding layers. |
| Numerical ecosystem | Good and improving, but not as deep as C++ for some precision and interval niches. | Best. Broadest access to established numerical, interval, linear algebra, SIMD, and scientific computing libraries. |
| Build and dependency management | Strong. Cargo is a major advantage for repeatable package, test, and benchmark workflows. | Strong if constrained. Use one explicit Clang/LLVM-centered build path with pinned dependencies, reproducible benchmarks, and CI checks. |
| Open-source compiler posture | Strong. Rust compiler and official projects are open-source, and the backend can use LLVM. | Strong with Clang/LLVM. The compiler stack is open-source and mature. |
| Repo integration cost | Medium. Needs JS/WASM bindings plus a native CLI boundary. | Higher than Rust, but acceptable because precision is decisive. Binding code must stay thin, typed, and tested against golden datasets. |
| Long-term maintainability | Strong. Safer refactors and explicit invariants should help the solver stay coherent as the API grows. | Strong when the architecture forbids broad mutable ownership, hidden globals, ad hoc buffers, and mixed error styles. |
| Main risk | Some high-precision or interval needs may require custom work or thinner ecosystem support than C++. | The main risk is unmanaged implementation surface area, not Cody's coding ability. Control it through small modules, strict ownership policy, sanitizer/fuzz gates, and benchmark-driven acceptance. |
| Best use in this repo | Fallback production core or comparison implementation if C++ controls fail. | Selected production solver core, precision kernels, path-history stream/index implementation, WASM bridge, and native batch runner. |

Decision posture:

1. Use C++ with Clang/LLVM as the selected production-core language because precision capabilities are the deciding requirement.
2. Keep Rust as the fallback if C++ fails build reproducibility, browser binding, memory-control, or maintainability gates.

The decision should be benchmark-driven. Minimal benchmark targets should include causal-root throughput, branch count scaling, memory use for source histories, path-stream write throughput, path-stream read throughput, index seek latency, worker transfer cost, app-frame latency, residual stability, branch-weight stability near small $|J_{ij}|$, and accuracy across scale sweeps spanning many orders of magnitude under Photon, Ideal Swarm, and Animator-like workloads.

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
2. Define the central solver contract, precision contract, and minimum stable dataset schema.
3. Define the path-history stream contract, file-backed storage format, readback APIs, indices, and metadata manifest.
4. Build a minimal benchmarked solver core and compare it against the Photon, Ideal Swarm, Animator, and `sim2` paths across ordinary and many-orders-of-magnitude scale sweeps.
5. Verify that long path runs stay inside the declared memory budget while spilling and reading path streams at target speed.
6. Migrate Animator first where the dataset bridge already exists.
7. Migrate Photon causal-root diagnostics to the shared causal-root and source-history APIs.
8. Migrate Ideal Swarm delayed-potential and self-hit calculations to shared geometry and causal-delay routines.
9. Preserve unique `sim2` visual semantics only until Animator or the central solver owns the equivalent field-shell and delayed-hit outputs.
10. Decide whether `sim2` is archived as a reference prototype or removed once parity and migration are complete.
11. Remove or simplify app-local solver and geometry code after parity tests confirm the new solver path.
12. Keep proof-program, mass-map, neutral-swarm, nested-shell, and cosmology solver families connected only where they share genuine architrino motion, branch geometry, or diagnostic contracts.

## Task Queue

1. `precision_dynamic_range_contract` - Define required scale ranges, tolerance policy, residual error budgets, conditioning diagnostics, and precision modes for many-orders-of-magnitude solver runs. Status: `active`. Depends on: none.
2. `path_history_stream_contract` - Define per-path streams, file-backed spill, high-speed readback, chunk layout, indices, metadata, and memory budgets for long path histories. Status: `active`. Depends on: `precision_dynamic_range_contract`.
3. `language_runtime_decision` - Benchmark Rust/WASM, TypeScript typed arrays with workers, and any justified C++/WASM path against representative causal-root, source-history, precision, dynamic-range, streaming-write, and indexed-read workloads. Status: `active`. Depends on: `precision_dynamic_range_contract`, `path_history_stream_contract`.
4. `solver_contract` - Define the central solver inputs, outputs, dataset schema, path-history stream schema, diagnostics, halt statuses, precision metadata, storage metadata, and API boundaries. Status: `active`. Depends on: `language_runtime_decision`.
5. `geometry_centralization_inventory` - Identify duplicated or app-local solver geometry in Photon, Ideal Swarm, Animator, `sim2`, and scripts. Status: `next`. Depends on: `solver_contract`.
6. `minimal_causal_root_core` - Implement or extract the first central causal-root core with source histories, branch diagnostics, precision diagnostics, streaming output, and benchmark hooks. Status: `next`. Depends on: `solver_contract`.
7. `animator_adapter` - Route Animator simulation runs through the central solver contract while preserving the existing dataset playback surface. Status: `pending`. Depends on: `minimal_causal_root_core`.
8. `photon_adapter` - Replace Photon-local causal-root diagnostics with shared source-history and causal-root calls. Status: `pending`. Depends on: `minimal_causal_root_core`.
9. `ideal_swarm_adapter` - Replace Ideal Swarm delayed-potential and self-hit calculations with shared solver geometry. Status: `pending`. Depends on: `minimal_causal_root_core`.
10. `sim2_retirement_plan` - Compare remaining `sim2` semantics against central solver and Animator coverage, then archive or remove `sim2` after parity. Status: `pending`. Depends on: `animator_adapter`.
11. `legacy_solver_family_map` - Decide which non-app solver families should consume the central solver contract, which should stay separate, and which should only exchange artifacts or diagnostics. Status: `pending`. Depends on: `geometry_centralization_inventory`.

## Related Priorities

- [animator-merge](../animator-merge/animator-merge.md)
- [simulations](../simulations/simulations.md)
- [photon-app](../photon-app/photon-app.md)
