# Solver

## Changes Wanted First

1. `sim2` is likely approaching retirement. Treat it as a reference prototype for field-shell and delayed-hit visual language, not as a migration target or long-term solver destination.
2. This workstream is not about every general-purpose tool with `solve` or `solver` in its name. Its scope is tools that solve architrino motion, causal roots, delayed hits, and geometry.
3. The solver must be high-speed and efficient enough to support interactive apps, batch simulations, and reusable diagnostics. The implementation language and runtime are therefore first-order design decisions, not afterthoughts.
4. The solver must offer excellent precision across many orders of magnitude. Orbital speed and assembly speed may span many orders of magnitude, so dynamic range, numerical conditioning, precision paths, and explicit error budgets are core design requirements.
5. Path histories can consume memory quickly. The solver needs per-path data streams that keep only a bounded active window in memory, spill high-speed path data to files, and read those files back at high speed.
6. Path-history streams need explicit indices and metadata: path id, time range, frame range, byte offsets, precision path, units, scale normalization, schema version, checksums, provenance, and diagnostic summaries.
7. The solver needs an explicit capability and API list before implementation: motion solving, causal-root solving, delayed-hit solving, geometry calculations, dataset output, diagnostics, worker or batch execution, path-history streaming, file-backed storage, indexed readback, and app adapters.
8. The solver should use multithreading where it improves performance and makes engineering sense. Threading must be benchmark-driven, deterministic where the result requires it, and optional where single-threaded execution is safer or sufficient.
9. Apps must be able to communicate with the solver through one shared app bridge. App code should call a stable JavaScript or TypeScript request/response API and should not need app-specific C++ or WebAssembly handling.
10. Geometry calculations should be centralized around solver-owned simulation and geometry routines for Photon, Ideal Swarm, Animator, and the new central solver. `sim2` and legacy solver families should remain reference, archive, or separate surfaces unless a future decision explicitly reopens them.
11. Once the solver design and first implementation exist, the repo needs a migration plan for the current app-facing migration targets: Photon, Ideal Swarm, and Animator.

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
| `sim2` | hit-detection causal simulation in [orbits.py](../../../src/apps/sim2/orbits.py#L1123) | Reference prototype and retirement/archive surface, not a migration target. |

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

Only Photon, Ideal Swarm, and Animator through the assembly-dynamics path are current migration targets. `sim2` and the non-app legacy solver families are inventory, reference, archive, or separate-maintenance surfaces, not migration targets for the central solver.

## Cross-Priority Requirements Extracted

Status: the current cross-priority extraction pass is complete. It covers the known app priorities, simulation priorities, geometry bridge, swarm, mass-map, photon closure, master-equation closure, and proof-program sources that currently request solver-like behavior.

Classification rule:

| Class | Meaning |
| --- | --- |
| `central solver contract` | Must shape the first central solver contract or its stable schema. |
| `app migration requirement` | Needed to migrate Photon, Ideal Swarm, or Animator through the shared solver bridge. |
| `diagnostic or validation requirement` | Required for parity, replay, claim level, proof handoff, or branch-audit evidence, but not necessarily a first app UI feature. |
| `reference-only requirement` | Preserved as a boundary, archive, or future interface signal; not a first central-solver implementation target. |
| `out of scope` | Solver-like wording that does not solve architrino motion, causal roots, delayed hits, or geometry. |

Extracted requirements:

| Source | Class | Extracted solver-facing requirements |
| --- | --- | --- |
| [animator-merge](../animator-merge/animator-merge.md) | `app migration requirement`, `central solver contract` | Animator needs solver-derived motion datasets, not authored-path substitutions. The solver must emit frames, field shells, delayed-hit events, solid and dotted path data, provenance, input config, precision settings, timestep policy, diagnostics, halt status, and cacheable offline/batch outputs. Animator should be able to render a completed dataset without requiring the solver to run at display frame rate. |
| [photon-app](../photon-app/photon-app.md) | `app migration requirement`, `central solver contract` | Photon needs absolute source and receiver histories, moving-apparatus support, declared photon-channel and branch signal speeds, all positive causal roots, same-source self-hit roots when enabled, no-catch-up and old-root diagnostics, residuals, Jacobians, transversality or small-Jacobian rejection reasons, source phase-at-hit, receiver phase-at-hit, layer/role/charge/cycle metadata, phase-spread summaries, Jacobian-weighted hit sums, reconstructed receiver acceleration, and observer-level transverse-field outputs. |
| [simulations](../simulations/simulations.md) | `diagnostic or validation requirement`, `central solver contract` | Simulation campaigns require explicit state-history class, mesh, interpolation policy, causal-root ledger, transition or jump ledger, branch residual vector, tolerance vector, normalized root residuals, provenance log, convergence vector, finite failure-code set, promotion status, artifact hashes, and run artifacts such as manifests, root ledgers, residual tables, candidate rows, failure reports, and validation replay records. |
| [assembly-dynamics solver](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs) | `central solver contract`, `app migration requirement` | The closest reusable engine already demonstrates the central shape: source histories, finite-history causal-root search, self and partner hits, branch-resolved delayed-hit records, $1/|J_{ij}|$ weighting where required, Jacobian diagnostics, unresolved-root halt reporting, and an Animator dataset bridge. The C++ solver should preserve those successful surfaces while replacing toy-solver limitations. |
| [mass-map](../mass-map/mass-map.md) | `diagnostic or validation requirement`, `reference-only requirement` | Mass-map work requires $A_0$ path-history depth long enough to resolve active causal roots over a closed cycle, state/root/phase ledgers on a common period, scale separation across many orders of magnitude, branch residual rows, energy and shielding ledgers, branch metadata, active-root inventories, and failure notes. Numerical insufficiency from time resolution, history depth, or scale separation should be a solver failure code, not a branch rejection. |
| [swarm](../swarm/swarm.md) and [all-pairs root ledger](../swarm/neutral-swarm/all-pairs-root-ledger.md) | `diagnostic or validation requirement`, `reference-only requirement` | Swarm packets require all ordered source-pair root ledgers, active and inactive root accounting, support-complete memory depth, tail exclusion or assimilation, Jacobian sign strata and floors, root continuation data, force rows tied to the same active root set, and `ledger-rerun-required` when a consumer evaluates against a different root label set. |
| [bounded-speed all-pairs ledger handoff](../swarm/shell-swarm/bounded-speed-factor-all-pairs-ledger-handoff-contract.md) | `diagnostic or validation requirement`, `reference-only requirement` | Bounded-speed work requires explicit clock maps, inverse-clock maps, live-ledger identity, root label handoff, bounded-speed root equations, inactive-gap covers, tail interfaces, root derivative columns, force checksums, consumer checksums, Schur derivative data when roots are eliminated, and first-failure statuses. These inform diagnostics and future proof handoff, not the first app migration scope. |
| [geometry-bridge](../geometry-bridge/geometry-bridge.md) | `diagnostic or validation requirement`, `reference-only requirement` | Geometry bridge needs branch-local response objects, root-sensitive linearization, derivative rows for $\eta$, $J$, delayed force, support, speed factors, and event endpoints, quotient or bordered inverse metadata, geometry-export packets, ledger-mismatch residuals, interval or directed-rounded certificates, and response pass/open/reject statuses. These shape solver-owned geometry diagnostics and future export packets. |
| [photon planar-pair ledger substrate packet](../angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md) | `diagnostic or validation requirement`, `reference-only requirement` | Photon closure needs delayed branch geometry to supply retained-root phase ledgers, planar-pair rows, root kind, cycle index, source phase-at-hit, receiver phase-at-hit where modeled, phase-spread summaries, local-$c$ same-source root solving, Jacobian and transversality floors, and event-window consistency. App fits may nominate regimes but cannot replace the root ledger. |
| [master-equation-closure](../master-equation-closure/master-equation-closure.md) | `diagnostic or validation requirement`, `reference-only requirement` | Master-equation work requires retained branch charts, partner and self roots, inactive gaps, Jacobian floors, finite memory depth, root-transport residuals, finite-band branch tables, interval support, tail constants, variational backend diagnostics, and explicit classification of numerical finite-difference artifacts versus repair-grade tangent data. |
| [proof-programs](../proof-programs/proof-programs.md) | `diagnostic or validation requirement`, `reference-only requirement` | Proof programs require certificate artifact discipline: preledger status, live-ledger update status, branch-chart authorization status, interval boxes, residual functions, endpoint maps, no-switch and uniqueness certificates, row consumption records, source-hash locks, and fail-closed external-input obligations. The central solver may emit artifacts for these consumers later, but proof-program solvers are not migration targets. |
| General `solve` or `solver` hits outside these surfaces | `out of scope` | Fit helpers, layout utilities, checkers, proof sidecars, generated certificate files, and unrelated scripts remain outside the central solver unless a later priority explicitly ties them to architrino motion, causal roots, delayed hits, or geometry. |

Direct contract additions from the extraction:

- Add root-ledger completeness to the central schema: active roots, inactive gaps, tail interface, separator or transition rows, root labels, source/receiver ids, root kind, delay, residual, Jacobian, sign stratum, and first-failure status.
- Add phase-at-hit and cycle metadata for Photon and photon-closure consumers: source phase, receiver phase when modeled, layer, role, charge sign, root kind, cycle index, and phase-spread summaries.
- Add branch-transition and jump metadata so disappearing, appearing, folded, or assimilated roots are not treated as ordinary Newton drift.
- Add explicit failure-code taxonomy for insufficient history depth, insufficient scale separation, inadequate time resolution, unresolved roots, small Jacobian, transversality-floor failure, stream pressure, unsupported browser capability, and validation replay mismatch.
- Add artifact and provenance discipline: config hash, schema version, engine version, precision path, tolerance vector, interpolation policy, stream/index hashes, artifact hashes, run claim level, and promotion or migration parity status.
- Keep first implementation scope disciplined: Photon, Ideal Swarm, and Animator are migration targets; `sim2`, mass-map, swarm, geometry-bridge, master-equation, and proof-program families are reference, validation, or future artifact consumers unless a later priority explicitly changes scope.

## Decision Summary

| Decision point | Decision |
| --- | --- |
| Production language | Use C++ with Clang/LLVM only. Rust remains comparison-only and is not a fallback implementation path. |
| C++ standard and build | Use C++20, Clang/LLVM, CMake presets, Ninja, one native CLI target, and one WebAssembly worker target. |
| App bridge | Use one shared JavaScript adapter with TypeScript declarations, backed by a WebAssembly worker. Apps do not handle C++ or WebAssembly directly. |
| Migration scope | Migrate Photon, Ideal Swarm, and Animator only. `sim2` and legacy solver families are reference/archive/separate surfaces. |
| Requirement extraction | Current cross-priority solver-requirements extraction is complete. Keep the extraction ledger current before changing central solver scope. |
| First solver core | Build the causal-root, delayed-hit, source-history, diagnostics, stream, and index core first; expand motion integration after that core is stable. |
| Precision behavior | Use an automatic precision-path selector with explicit caller override to stricter paths only. Never silently downgrade precision or claim level. |
| Threading | Use a bounded native task pool for independent root, stream, index, batch, and replay work; use WebAssembly threads only when browser capability and determinism requirements allow. |
| GPU acceleration | Defer GPU acceleration. Do not make Metal, WebGPU, or any GPU compute path part of the first solver core or migration plan. |
| Geometry boundary | The solver owns causal and path-dependent geometry. Apps own visual layout, controls, styling, and renderer-specific presentation. |
| Storage | Use logical per-path streams backed by a run-level chunked binary store, JSON manifest, binary index sidecar, event store, and summary record. |
| Validation | Require golden parity, precision replay, stream round-trip, threading determinism, and app-bridge contract tests before migrating an app. |

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
6. Scale-aware numerical precision across many orders of magnitude, including declared precision paths, conditioning diagnostics, residual error budgets, and nondimensionalized or rescaled variables where needed.
7. Per-path history streams that append path samples without keeping entire long trajectories in memory.
8. High-speed spill-to-file and high-speed readback for long runs, including chunked binary path data and compact metadata manifests.
9. Indices for path id, time range, frame range, chunk offsets, delayed-hit events, causal-root events, and diagnostics so apps can scan or seek without loading the whole run.
10. Simulation dataset output for app playback, scrubbing, diagnostics, export, and comparison runs.
11. Deterministic diagnostics: engine id, version, input config, timestep policy, selected precision path, precision settings, dynamic-range assumptions, stream storage format, root tolerances, halt status, root failure counts, and aggregate branch statistics.
12. Worker, batch, and offline execution modes so apps can stay responsive while long or high-precision runs produce cached datasets.
13. Multithreaded execution where benchmarked gains justify it, especially for independent source-receiver root solves, path-stream chunk work, batch parameter sweeps, and offline replay; single-threaded fallback must remain available.
14. Threading diagnostics: configured thread count, active worker count, scheduling mode, contention indicators, deterministic-reduction mode, and speedup versus single-thread baseline.
15. A shared app-communication bridge that lets browser apps and app workers initialize the solver, submit requests, receive typed outputs, handle errors, and read stream-backed datasets without app-specific C++ handling.
16. App adapters for Photon, Ideal Swarm, and Animator during migration.
17. Test fixtures or benchmark scenarios that compare old app-local behavior against solver-derived behavior before app code is simplified.
18. Complete root-ledger outputs for retained roots, inactive gaps, tail or separator rows, transition rows, root labels, Jacobian sign strata, residuals, and first-failure statuses.
19. Phase-at-hit and cycle metadata for Photon and photon-closure consumers, including source phase, receiver phase when modeled, layer, role, charge sign, root kind, and phase-spread summaries.
20. Branch-transition diagnostics for roots that appear, disappear, fold, become assimilated from a tail region, or require a ledger rerun.
21. Validation and handoff artifacts for reference-only consumers, including artifact hashes, provenance records, tolerance vectors, convergence summaries, and promotion or parity status.

## Chosen API Surface

The central API should be versioned and handle-based. Small configs, manifests, summaries, and diagnostics should move as structured JSON-compatible records. Dense path, frame, root, hit, and geometry data should move as typed binary buffers or stream handles.

| API responsibility | Required output |
| --- | --- |
| Run an architrino motion simulation | Frames with positions, velocities, phases, diagnostics, and halt status. |
| Solve causal roots for a source-receiver history pair | Root list with emission time, delay, residual, branch metadata, and unresolved-root diagnostics. |
| Solve delayed hits | Hit records with emitter, receiver, emission point, receiver point, $J_{ij}$, strength, and source branch. |
| Emit a root ledger | Active roots, inactive gaps, tail or separator rows, transition rows, root labels, root kind, residuals, Jacobian sign strata, and first-failure statuses. |
| Report phase-at-hit diagnostics | Source phase, receiver phase when modeled, layer, role, charge sign, cycle index, phase-spread summaries, and event-window consistency flags. |
| Select precision path | Regime classification, selected simulation technique, numeric type, tolerance policy, scale normalization, error budget, and conditioning diagnostics. |
| Report precision path diagnostics | Orbital speed scale, assembly speed scale, timestep policy, root residuals, accumulated error estimates, fallback reason, and validation status. |
| Open a path-history stream | Stream id, path id mapping, declared columns, sample stride, precision metadata, and storage policy. |
| Append path samples | Chunked path data written with bounded memory, backpressure reporting, and spill-to-file status. |
| Read path samples | High-speed range scans and random access by path id, time range, frame range, or chunk id. |
| Read path indices and metadata | Manifest, index tables, byte offsets, time ranges, checksums, units, scale normalization, provenance, and diagnostics. |
| Configure threading policy | Thread count, scheduling mode, deterministic reduction mode, browser/native support flags, fallback policy, and expected workload class. |
| Report threading diagnostics | Active workers, queue depth, contention, chunk timings, per-stage speedup, determinism status, and fallback reason. |
| Initialize app solver bridge | Version, capabilities, selected precision path, stream support, worker status, and ready state. |
| Submit app solver request | Request id, normalized config, cancellation handle, optional stream target, and expected output contract. |
| Receive app solver response | Dataset summary, typed buffers or stream handles, diagnostics, halt status, and normalized error records. |
| Produce app playback data | A dataset compatible with Animator-style frame buffers and app diagnostics. |
| Compute shared geometry | Centralized geometry outputs for paths, distances, intersections, shell surfaces, and projection views. |
| Run in a browser worker | Request and response messages with typed data where profiling justifies it. |
| Run offline or in batch | CLI or script entrypoint with reproducible input, output, diagnostics, and benchmark metadata. |
| Produce validation or handoff artifacts | Provenance records, artifact hashes, convergence summaries, tolerance vectors, failure-code reports, replay status, and migration parity status. |
| Compare migration targets and reference paths | Parity reports for Photon, Ideal Swarm, and Animator, with optional reference-only notes for `sim2` or legacy families when they clarify behavior. |

API contract decisions:

- use `runId`, `requestId`, `streamId`, and `datasetId` handles rather than exposing C++ object ownership to apps;
- version every config, response, stream manifest, and binary layout;
- standardize halt and error records across precision failures, root failures, IO failures, cancellation, unsupported browser features, and worker failures;
- treat all dense solver outputs as immutable after publication to the app bridge;
- keep app-facing schema stable even if internal C++ modules are reorganized;
- require replay metadata for every result that may be used as a benchmark, migration parity case, or exported dataset.

## Precision Path Strategy

Orbital speed, assembly speed, geometry scale, delay scale, branch count, and residual scale may span many orders of magnitude. The solver therefore needs precision paths: declared simulation methods chosen by regime, not one universal numerical path.

Decision: use an automatic precision-path selector that classifies the run before and during simulation. The selector considers orbital speed, assembly speed, field speed, relative speed ratios, path curvature, minimum separation, delayed-root density, Jacobian conditioning, target runtime, and requested claim level.

Chosen precision paths:

| Precision path | Use when | Required controls |
| --- | --- | --- |
| `scaled_f64_fast` | Interactive app runs where scales are moderate and conditioning is clean. | Nondimensionalized variables, explicit tolerances, residual checks, and fast failure when conditioning leaves the accepted range. |
| `scaled_f64_strict` | App or batch runs where `f64` is acceptable but cancellation, root bracketing, or dynamic range is tighter. | Local coordinate frames, compensated or pairwise summation, stricter root tolerances, deterministic reductions, and tighter diagnostics. |
| `adaptive_multirate` | Orbital and assembly speeds differ by large factors, or fast orbital motion rides on slower assembly drift. | Separate clock policies, substeps or event steps for fast motion, interpolation error bounds, and synchronization diagnostics. |
| `event_root_focused` | Causal roots, delayed hits, or branch transitions dominate accuracy. | Robust bracketing, root isolation, branch deduplication, residual certificates, and explicit unresolved-root halt behavior. |
| `extended_precision` | Scale separation, near-collision geometry, small $|J_{ij}|$, or cancellation makes ordinary scaled `f64` insufficient. | Arbitrary precision or interval-backed kernels, directed rounding where needed, strict error budgets, and lower-throughput batch/offline expectation. |
| `validation_replay` | A production result needs an independent precision check. | Replay with stricter tolerances or a higher precision path, compare residuals and path samples, and emit a parity report. |

The app-facing default is `auto`, not a fixed path. `auto` may select `scaled_f64_fast` only when conditioning is clean and the requested claim level is interactive. Saved runs, exported runs, migration parity runs, and benchmark runs should use at least `scaled_f64_strict` or `validation_replay`.

The precision path must be visible in every dataset and stream manifest. It should be possible to reproduce a run from its selected path, numeric type, scale normalization, tolerance policy, timestep policy, root policy, and error budget.

The solver should support automatic escalation when a run leaves the accepted conditioning envelope. Escalation options include shrinking timesteps, switching to a local coordinate frame, increasing root iterations, changing summation strategy, switching to a stricter precision path, or halting with a precise diagnostic if the requested output claim level cannot be met.

Automatic escalation may only move toward a stricter or more expensive precision path. A caller may request a stricter path directly, but the solver should reject requests that would weaken the selected claim level. If no available precision path can meet the declared error budget, the solver must halt with a precision diagnostic rather than producing an ambiguous result.

## Application Bridge Requirement

The selected C++ solver must be usable from the apps through a shared bridge layer. The app should not know the solver's C++ internals. Each app should call a JavaScript or TypeScript adapter that exposes stable request, response, cancellation, dataset, stream, metadata, and diagnostic contracts.

The expected browser path is:

1. Compile the C++ core to WebAssembly through the selected Clang/LLVM-centered toolchain.
2. Load the WebAssembly module from a shared solver worker.
3. Expose a narrow JavaScript or TypeScript adapter with typed request and response messages.
4. Move dense data through typed arrays, transferable buffers, or stream handles rather than object-heavy JSON.
5. Keep long-running solves off the UI thread.
6. Normalize solver halt reasons, precision failures, IO failures, and app-facing errors into one app-readable status format.
7. Keep app-specific code limited to translating UI state into solver configs and rendering solver datasets.

This requirement does add a deliberate bridge layer. It should not add special handling in each app. The correct abstraction is one shared app bridge plus focused app adapters for Photon, Ideal Swarm, and Animator.

### Chosen App Bridge Contract

Decision: use one shared JavaScript adapter with TypeScript declarations, backed by a dedicated WebAssembly worker built from the C++ core. Apps call the adapter. The adapter owns worker creation, capability negotiation, typed-buffer transfer, stream handles, cancellation, and normalized errors.

| Layer | Owner | Decision |
| --- | --- | --- |
| C++ solver core | Central solver package | Expose a narrow C-compatible boundary for WebAssembly and native bindings. Keep allocation, stream ownership, and solver lifecycle behind explicit handles. |
| Solver worker | Shared app bridge | Load the WebAssembly module, hold solver state off the UI thread, route requests by `requestId`, and publish progress, diagnostics, completion, halt, and error messages. |
| JavaScript adapter with TypeScript declarations | Shared app bridge | Provide the stable app-facing client API. Use structured metadata messages and transferable `ArrayBuffer` payloads for dense data. |
| App adapter | Photon, Ideal Swarm, and Animator | Translate app UI state into solver configs and render solver datasets. Do not contain C++ or WebAssembly-specific logic. |

Required message families:

| Message family | Purpose |
| --- | --- |
| `init` and `capabilities` | Load the worker, report solver version, precision paths, stream support, threading support, and storage support. |
| `runSimulation` | Start a motion, causal-root, delayed-hit, or geometry run from a normalized solver config. |
| `cancelRun` | Cancel a pending or active run by `runId` or `requestId` and return a normalized cancellation status. |
| `openStream` and `readStreamRange` | Open a stream-backed dataset and read path, frame, time, event, or diagnostic ranges without loading the whole run. |
| `closeRun` and `dispose` | Release worker-side handles, stream buffers, and file-backed resources. |
| `progress`, `diagnostic`, `halt`, and `error` | Report current stage, precision path, memory pressure, stream write/read status, unresolved roots, threading diagnostics, and normalized failure reasons. |

Browser file-backed streaming should use Origin Private File System storage when available because it is the strongest browser fit for high-throughput worker-owned files. The bridge must report storage capability explicitly. If durable browser file streaming is unavailable, long runs should either use a native or batch path, or run with a bounded transient store and a visible capability warning.

## Threading Execution Policy

Decision: use multithreading as an execution policy, not as a semantic dependency. A correct single-thread execution must exist for every solver operation. Multithreaded execution is enabled only for stages where the work is naturally independent, the result can remain deterministic when required, and benchmarks show useful speedup.

| Workload | Threading decision |
| --- | --- |
| Source-receiver causal-root batches | Parallelize across independent source-receiver pairs and time windows. |
| Delayed-hit event extraction | Parallelize candidate event scans, then merge events in deterministic order. |
| Path chunk write, checksum, and index preparation | Parallelize chunk preparation and checksums; serialize final manifest and index commits. |
| Batch parameter sweeps | Parallelize independent runs through the native CLI and batch runner. |
| Validation replay | Parallelize independent replay cases, but keep each replay deterministic by default. |
| App UI execution | Keep solver work off the UI thread through the shared worker; enable WebAssembly internal threads only when browser capability and app security headers support them. |

Native execution should use a bounded C++ task pool with explicit thread-count configuration. Browser execution should start with one solver worker as the required baseline. WebAssembly threads are an optimization path, gated by capability detection, cross-origin isolation requirements, deterministic-reduction needs, and measured benefit.

Deterministic mode is required for parity tests, validation replay, exported datasets, and any result used as evidence. Deterministic mode should use stable merge order, deterministic reductions, fixed chunk commit order, and explicit random seeds if randomized sampling is ever introduced. Interactive preview mode may relax deterministic scheduling only when the manifest states that the result is preview-grade.

## GPU Acceleration Deferral

Decision: defer GPU acceleration. macOS Metal, browser WebGPU, and any other GPU compute path should stay out of the first central solver core, first app migration, and initial validation gates.

The first performance focus is CPU-side: C++ data layout, cache locality, SIMD-friendly kernels, bounded multithreading, path-history streaming, indexed readback, and precision-path selection. GPU work should be reconsidered only after the CPU solver contract is stable and benchmark profiles show a regular, massively parallel hotspot that is worth isolating.

Potential future GPU candidates include bulk field/grid sampling, display-oriented geometry projection, path downsampling, broad residual scans, and regular first-pass causal-root bracketing. GPU acceleration is not currently assigned to high-precision paths, arbitrary precision or interval-backed kernels, branch-heavy root isolation, deterministic validation replay, stream/index IO, or small $|J_{ij}|$ edge-case handling.

If GPU acceleration is reopened later, it should enter as an optional acceleration tier behind the same solver API, with CPU parity tests, explicit precision limits, deterministic fallback, and stage-level benchmarks. The native macOS path would be Metal compute; the browser path would be WebGPU only after app deployment constraints and precision behavior are validated.

## Path-History Streaming And Storage

Long solver runs should not accumulate every path sample in application memory. The storage model should use path-history streams: append-only per-path or per-run streams that keep a short active window in memory while older samples spill to a file-backed store.

The dense path data should use a high-throughput binary layout rather than dense JSON. JSON remains appropriate for manifests, summaries, and small diagnostic records. The binary stream should be chunked so writers can append quickly, readers can seek directly to a time or frame window, and corrupted or incomplete chunks can be detected.

### Chosen Path-History Stream Contract

Decision: expose logical per-path streams, but store them in a run-level chunked binary store rather than creating one operating-system file per path by default. This preserves the per-path API the solver needs while keeping file handles, frame playback, indexing, and app readback under control.

| Artifact | Format | Purpose |
| --- | --- | --- |
| Manifest | JSON | Human-readable run contract: schema version, solver version, app source, precision path, scale normalization, units, stream layout, and compatibility notes. |
| Path chunk store | Binary, little-endian, structure-of-arrays chunks | Dense path samples for positions, velocities, phases, branch-local values, and declared optional columns. |
| Event chunk store | Binary or compact JSON by event volume | Causal roots, delayed hits, halt records, precision escalations, and diagnostic threshold crossings. |
| Index sidecar | Binary index plus manifest summary | Path id, frame, time, chunk, event, and provenance lookup tables for high-speed seeking. |
| Summary | JSON | Small app-readable run summary, aggregate diagnostics, min/max ranges, stream sizes, and validation replay status. |

Chunk layout decision:

- use time-window chunks that may contain one path or a bounded path bundle;
- store columns in structure-of-arrays form inside each chunk for fast projection, range reads, and SIMD-friendly native scans;
- include chunk headers and trailers with schema id, row count, time bounds, frame bounds, byte length, and fast checksums;
- keep hot-path chunks uncompressed by default, with optional offline compression or export after the run;
- checkpoint indices during long runs and finalize them at completion so interrupted runs can recover committed chunks.

Memory decision: each run must declare a stream memory budget. The initial interactive target should be a bounded active stream window on the order of hundreds of MiB, with a stricter app default and a larger explicit batch budget. When the active window reaches the budget, the writer must spill, apply backpressure, reduce output stride if configured, or halt with a precise memory-pressure diagnostic.

Precision-storage decision: stream column metadata must declare the stored numeric type and the authoritative precision path. App visualization may receive downsampled or projected `f64` buffers, but the stream manifest must identify whether those buffers are authoritative results or app-facing projections from a stricter path.

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
| Provenance index | Connects chunks to solver config, precision path, scale normalization, and app adapter. |

Required metadata:

- schema version and stream format version;
- solver engine id, engine version, and API version;
- source app or script, run id, and input config hash;
- path id map and path role map;
- units, coordinate convention, time convention, and scale normalization;
- selected precision path, stored numeric type, tolerance policy, and residual error budget;
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
| Precision and dynamic range | 16 | The solver must stay accurate when orbital speed, assembly speed, geometry, delay, and residual scales span many orders of magnitude. |
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
| 1 | C++ with Clang/LLVM | 5.0 | 5.0 | 5.0 | 4.5 | 4.5 | 5.0 | 5.0 | 3.0 | 4.5 | 5.0 | `477.0 / 500` | Selected production-core language because precision libraries and numeric control dominate. |
| 2 | Rust | 5.0 | 4.5 | 5.0 | 4.5 | 5.0 | 5.0 | 4.0 | 3.0 | 4.5 | 4.5 | `464.5 / 500` | Comparison-only row. Rust is not a planned implementation path. |

Detailed Rust versus C++ comparison:

| Decision area | Rust | C++ with Clang/LLVM |
| --- | --- | --- |
| Default role | Comparison-only reference for evaluating language tradeoffs. Rust is not a planned implementation path. | Selected production-core language because raw numeric control and mature precision libraries are decisive. |
| Speed ceiling | Very high. LLVM-backed optimization, zero-cost abstractions, predictable value types, and explicit ownership make fast kernels realistic. | Highest possible ceiling. C++ still has the deepest low-level optimization, SIMD, intrinsics, and HPC tradition. |
| Precision strategy | Strong for carefully designed `f64` kernels, fixed-point-like scaled values, explicit tolerance types, and optional crate-backed high precision. | Strongest for mature arbitrary precision, interval arithmetic, directed rounding, specialized numeric libraries, and multiple solver precision paths. |
| Memory safety | Strong language-level guardrails from ownership and borrowing. | Must be designed with explicit ownership boundaries, RAII, value types, narrow spans/views, sanitizer gates, fuzz tests, and no unchecked pointer-style stream API. |
| Path-history streaming | Strong fit. Ownership, slices, iterators, and explicit buffer lifetimes are good for bounded memory and append-only chunk writers. | Strong raw control for custom binary layouts, memory mapping, and zero-copy reads. The implementation must make stream ownership and buffer lifetimes part of the API contract. |
| File-backed read/write performance | High. Rust can write tight binary IO and memory-mapped readers while keeping APIs safer. | Very high. Mature IO, memory mapping, and profiling paths exist across platforms. |
| Browser/WASM app bridge | Strong. Rust-to-WASM is a common production path, and Rust can also build native CLI tools. | Strong with an explicit binding plan. Clang/LLVM and Emscripten/WASI paths are capable, and the project must keep app bindings thin and generated or tightly tested. |
| App communication requirement | Strong. Apps would call a Rust/WASM wrapper through JavaScript or TypeScript. | Strong enough for selection, but not automatic. The C++ choice requires one shared WebAssembly worker bridge and typed JavaScript or TypeScript adapter so apps never handle C++ details directly. |
| Multithreading | Strong native and browser-worker options. Rust ownership can help keep worker boundaries clear. | Strong native threading and high-performance scheduling options. Browser-threading support must be validated through the app bridge; use single-thread fallback when WebAssembly threading is unavailable or when deterministic reduction is more important than speed. |
| Native CLI and batch mode | Strong. Cargo, cross compilation, and static binaries make repeatable batch tools practical. | Strong. Native performance and mature build systems are proven; the solver must define one canonical build path instead of accepting build-system sprawl. |
| Cody implementation quality | Strong. The type system and compiler diagnostics help keep invariants explicit. | Strong when held to the project standard. Cody is expected to implement expert-level C++ with strict invariants, tests, benchmarks, sanitizers, and small ownership-focused modules. |
| Error handling | Strong. `Result`, typed errors, and exhaustive matching fit solver halt reasons and diagnostics. | Strong if standardized. The project should use explicit status/result types for solver halts, IO failures, precision failures, and branch diagnostics instead of mixed ad hoc conventions. |
| API design clarity | Strong. Rust structs, enums, traits, and modules encourage narrow contracts for solver, stream, index, and metadata boundaries. | Strong if designed up front. C++ interfaces must be narrow, value-oriented, and separated into solver core, stream writer, index reader, metadata, and app-binding layers. |
| Numerical ecosystem | Good and improving, but not as deep as C++ for some precision and interval niches. | Best. Broadest access to established numerical, interval, linear algebra, SIMD, and scientific computing libraries. |
| Build and dependency management | Strong. Cargo is a major advantage for repeatable package, test, and benchmark workflows. | Strong if constrained. Use one explicit Clang/LLVM-centered build path with pinned dependencies, reproducible benchmarks, and CI checks. |
| Open-source compiler posture | Strong. Rust compiler and official projects are open-source, and the backend can use LLVM. | Strong with Clang/LLVM. The compiler stack is open-source and mature. |
| Repo integration cost | Medium. Needs JS/WASM bindings plus a native CLI boundary. | Higher than Rust, but acceptable because precision is decisive. Binding code must stay thin, typed, and tested against golden datasets. |
| Long-term maintainability | Strong. Safer refactors and explicit invariants should help the solver stay coherent as the API grows. | Strong when the architecture forbids broad mutable ownership, hidden globals, ad hoc buffers, and mixed error styles. |
| Main risk | Useful comparison points should not be mistaken for an alternate build plan. | The main risk is unmanaged implementation surface area, not Cody's coding ability. Control it through small modules, strict ownership policy, sanitizer/fuzz gates, and benchmark-driven acceptance. |
| Best use in this repo | Decision-audit reference only, especially for checking whether C++ bridge, streaming, and ownership plans remain disciplined. | Selected production solver core, precision kernels, path-history stream/index implementation, WASM bridge, and native batch runner. |

Decision posture:

1. Use C++ with Clang/LLVM as the selected production-core language because precision capabilities are the deciding requirement.
2. Do not plan a Rust fallback. If C++ fails build reproducibility, browser binding, memory-control, or maintainability gates, fix the C++ design, toolchain, or implementation boundary rather than switching languages.

The decision should be benchmark-driven. Minimal benchmark targets should include causal-root throughput, branch count scaling, memory use for source histories, path-stream write throughput, path-stream read throughput, index seek latency, worker transfer cost, app-frame latency, thread-scaling efficiency, deterministic-reduction overhead, residual stability, branch-weight stability near small $|J_{ij}|$, precision-path selection correctness, and accuracy across orbital-speed and assembly-speed scale sweeps spanning many orders of magnitude under Photon, Ideal Swarm, and Animator-like workloads.

## C++ Runtime And Build Contract

Decision: implement the solver core in C++20 with Clang/LLVM. Use one constrained build family rather than multiple competing build systems.

| Area | Decision |
| --- | --- |
| Native build | CMake presets with Ninja, Clang/LLVM, warnings-as-errors for solver code, sanitizer targets, and benchmark targets. |
| Browser build | WebAssembly worker target built from the same C++ core through the Clang/LLVM-centered WebAssembly toolchain. |
| Public boundary | Narrow C-compatible exported boundary for WebAssembly and native harnesses; typed app APIs stay in JavaScript with TypeScript declarations. |
| Internal modules | Separate solver core, precision paths, geometry kernels, stream writer, index reader, metadata, threading, diagnostics, and bridge bindings. |
| Dependency posture | Prefer small, explicit, open-source dependencies. Add arbitrary-precision, interval, or geometry libraries only behind narrow numeric-kernel interfaces. |
| Quality gates | Native unit tests, golden parity tests, fuzz/property tests for stream/index parsing, sanitizer runs, benchmark runs, and WebAssembly bridge contract tests. |

The build decision does not include a Rust backup. C++ build or binding problems are treated as C++ architecture, toolchain, or boundary problems to fix directly.

## Geometry Centralization Target

The central solver is the preferred home for geometry calculations that are currently duplicated or implied in app-local code. The target is not a generic geometry library. The target is solver-owned geometry for architrino motion and causal interaction:

- source and receiver history sampling;
- branch-local displacement, distance, direction, and velocity projection;
- circular and helical orbit geometry used by swarm candidates;
- field-shell and delayed-hit geometry;
- planar and 3-D projection data for rendering;
- photon pair source-history geometry;
- self-hit span and branch-window calculations;
- dataset geometry for paths, trails, shells, delayed-hit connectors, and diagnostic tables.

Apps should request solver-derived geometry outputs instead of recomputing solver-adjacent geometry in separate local helpers.

Chosen boundary:

- solver owns source-history sampling, receiver-history sampling, causal-root branch geometry, delayed-hit geometry, Jacobian-local vectors, path-frame transforms, and dataset geometry needed for parity;
- solver owns canonical numeric geometry used by Photon, Ideal Swarm, and Animator migration targets;
- apps own UI controls, camera choice, color, trail styling, visual filtering, labels, panels, and renderer-specific layout;
- app adapters may request lighter projected geometry for display, but projection buffers must be labeled as app-facing projections when they are not authoritative solver data;
- `sim2` visual ideas may be referenced, but `sim2` geometry code is not migrated into the central solver.

## Solver Contract And Validation Policy

Decision: the minimal central solver contract should be accepted only after it passes schema, precision, streaming, threading, app-bridge, and migration-parity tests. The first implementation should prioritize the causal-root and delayed-hit core because that is the shared behavior behind Photon, Ideal Swarm, and Animator.

Acceptance gates:

| Gate | Required evidence |
| --- | --- |
| Schema contract | Versioned configs, responses, stream manifests, binary chunks, indices, diagnostics, and error records. |
| Precision contract | Scale sweeps over orbital speed, assembly speed, geometry scale, residual scale, and small $|J_{ij}|$ cases. |
| Stream contract | Round-trip write/read tests, bounded-memory tests, interrupted-run recovery, index seek tests, and checksum failure tests. |
| Ledger and provenance contract | Root-ledger completeness tests, phase-at-hit metadata tests, failure-code coverage, artifact hash checks, and validation replay provenance. |
| Threading contract | Single-thread baseline, multithread speedup cases, deterministic replay cases, and browser capability fallback tests. |
| App bridge contract | Worker initialization, cancellation, typed-buffer transfer, stream-range readback, error normalization, and unsupported-feature reporting. |
| Migration parity | Animator first, then Photon, then Ideal Swarm, each with focused parity fixtures before app-local solver code is simplified. |

The first central core should expose source histories, branch-resolved causal roots, delayed-hit records, $1/|J_{ij}|$ branch weighting where required, diagnostics, and stream-backed output. Full motion integration can grow after the root, event, precision, stream, and app-bridge contracts are stable.

## Migration Plan Needed

After the first solver design lands, create a migration plan for Photon, Ideal Swarm, and Animator with these steps. `sim2` and legacy solver families are excluded from migration; they may be compared, archived, or documented only where that clarifies the new solver boundary.

1. Inventory Photon, Ideal Swarm, Animator, and the assembly-dynamics path for current uses of architrino motion, causal roots, delayed hits, or solver-adjacent geometry.
2. Define the central solver contract, precision-path contract, and minimum stable dataset schema.
3. Adopt the logical per-path stream API backed by a run-level chunked binary store, JSON manifest, binary index sidecar, event store, and summary record.
4. Adopt the shared JavaScript adapter with TypeScript declarations, backed by a WebAssembly worker that owns C++ solver lifecycle, typed-buffer transfer, stream handles, cancellation, diagnostics, and normalized errors.
5. Adopt the threading policy: native bounded task pool, browser worker baseline, WebAssembly internal threads only when capability and determinism requirements allow, and deterministic mode for parity or exported runs.
6. Defer GPU acceleration; do not include Metal, WebGPU, or other GPU compute paths in the first solver core or first app migration.
7. Build a minimal benchmarked C++/Clang solver core and compare it against Photon, Ideal Swarm, and Animator paths across ordinary and many-orders-of-magnitude orbital-speed and assembly-speed scale sweeps.
8. Verify that long path runs stay inside the declared memory budget while spilling and reading path streams at target speed.
9. Verify that multithreading improves the selected workloads enough to justify the complexity, and keep a correct single-thread execution path where threading is unavailable or not worth using.
10. Verify that apps can use the solver through the shared bridge without app-specific C++ or WebAssembly handling.
11. Migrate Animator first where the dataset bridge already exists.
12. Migrate Photon causal-root diagnostics to the shared causal-root and source-history APIs.
13. Migrate Ideal Swarm delayed-potential and self-hit calculations to shared geometry and causal-delay routines.
14. Archive or keep `sim2` as a reference prototype only; do not build a central-solver adapter for it.
15. Document the legacy solver-family boundary: proof-program, mass-map, neutral-swarm, nested-shell, cosmology, and related families are not migration targets.
16. Remove or simplify app-local solver and geometry code after parity tests confirm the new solver path.
17. Keep any future contact with proof-program, mass-map, neutral-swarm, nested-shell, and cosmology solver families limited to artifacts, diagnostics, or independently maintained contracts unless a later priority explicitly changes scope.

## Task Queue

1. `precision_dynamic_range_contract` - Convert the chosen `auto` precision-path selector, strict escalation rule, validation replay rule, and error-budget metadata into the first implementation contract. Status: `active`. Depends on: none.
2. `path_history_stream_contract` - Convert the chosen logical per-path stream API backed by a run-level chunked binary store, JSON manifest, event store, binary index sidecar, summary record, memory budget, fast spill, and high-speed readback into a versioned schema. Status: `active`. Depends on: `precision_dynamic_range_contract`.
3. `app_bridge_contract` - Convert the chosen shared JavaScript adapter with TypeScript declarations and WebAssembly worker into a typed request/response, cancellation, stream-handle, diagnostics, and normalized-error contract. Status: `active`. Depends on: `precision_dynamic_range_contract`, `path_history_stream_contract`.
4. `threading_execution_policy` - Implement the chosen native bounded task pool, browser worker baseline, deterministic mode, WebAssembly-thread gating, thread-count controls, and diagnostics. Status: `active`. Depends on: `app_bridge_contract`.
5. `cpp_clang_runtime_validation` - Build and benchmark the selected C++20/Clang path against representative causal-root, source-history, precision, dynamic-range, streaming-write, indexed-read, app-bridge, and thread-scaling workloads. Status: `active`. Depends on: `threading_execution_policy`.
6. `solver_contract` - Implement the central solver inputs, outputs, dataset schema, path-history stream schema, app bridge schema, threading metadata, diagnostics, halt statuses, precision-path metadata, storage metadata, API boundaries, root-ledger completeness rows, phase-at-hit metadata, failure-code taxonomy, and provenance artifacts. Status: `active`. Depends on: `cpp_clang_runtime_validation`.
7. `gpu_acceleration_deferral` - Keep Metal, WebGPU, and other GPU compute paths out of the first solver core and migration plan; reconsider only after CPU benchmarks identify a suitable regular hotspot. Status: `pending`. Depends on: `cpp_clang_runtime_validation`.
8. `geometry_centralization_inventory` - Identify duplicated or app-local solver geometry in Photon, Ideal Swarm, Animator, and the assembly-dynamics path. Exclude `sim2` and legacy solver families from migration scope. Status: `next`. Depends on: `solver_contract`.
9. `minimal_causal_root_core` - Implement or extract the first central causal-root core with source histories, branch diagnostics, precision diagnostics, streaming output, app-bridge output, threading diagnostics, and benchmark hooks. Status: `next`. Depends on: `solver_contract`.
10. `animator_adapter` - Route Animator simulation runs through the central solver contract while preserving the existing dataset playback surface. Status: `pending`. Depends on: `minimal_causal_root_core`.
11. `photon_adapter` - Replace Photon-local causal-root diagnostics with shared source-history and causal-root calls. Status: `pending`. Depends on: `minimal_causal_root_core`.
12. `ideal_swarm_adapter` - Replace Ideal Swarm delayed-potential and self-hit calculations with shared solver geometry. Status: `pending`. Depends on: `minimal_causal_root_core`.
13. `sim2_reference_archive_plan` - Document `sim2` as a reference/archive surface only, with no central-solver adapter and no migration path. Status: `pending`. Depends on: `solver_contract`.
14. `legacy_solver_boundary` - Document that non-app legacy solver families stay outside central-solver migration and may only exchange artifacts, diagnostics, or independently maintained contracts. Status: `pending`. Depends on: `solver_contract`.

## Related Priorities

- [animator-merge](../animator-merge/animator-merge.md)
- [simulations](../simulations/simulations.md)
- [photon-app](../photon-app/photon-app.md)
