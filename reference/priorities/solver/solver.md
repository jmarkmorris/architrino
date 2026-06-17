# Solver

## Requirements

1. This workstream is not about every general-purpose tool with `solve` or `solver` in its name. Its scope is tools that solve architrino motion, causal roots, delayed hits, and geometry.
2. The new central solver is a complete redesign. It should not be framed as a small upgrade to `sim2`, the current assembly-dynamics toy solver, or any app-local helper.
3. The solver needs an explicit capability and API list before implementation: motion solving, causal-root solving, delayed-hit solving, geometry calculations, dataset output, diagnostics, worker or batch execution, path-history streaming, non-volatile storage, indexed readback, and app adapters.
4. Every run must declare its model contract: model id, equation or force-law version, constants, causal speed policy, branch policy, unit convention, and compatibility with the selected precision path.
5. Geometry calculations should be centralized around solver-owned simulation and geometry routines for Photon, Ideal Swarm, Animator, and the new central solver.
6. The solver must offer excellent precision across many orders of magnitude. Orbital speed and assembly speed may span many orders of magnitude, so dynamic range, numerical conditioning, precision paths, and explicit error budgets are core design requirements.
7. Every run should declare a simulation envelope: entity count, physical scale, simulated duration, time resolution, interaction density, branch complexity, precision claim, output detail, memory budget, storage budget, and expected latency. The solver should admit, simplify, batch, escalate, or reject a run based on that envelope instead of quietly accepting a request it cannot support accurately.
8. Error budgets must propagate through root solving, motion integration, stream encoding, readback, projection, and app-facing buffers so every consumer knows whether a value is authoritative, approximate, or display-only.
9. The solver must be high-speed and efficient enough to support interactive apps, batch simulations, and reusable diagnostics. The implementation language and runtime are therefore first-order design decisions, not afterthoughts.
10. The solver should be highly parallelizable where it improves performance and makes engineering sense. Threading must be benchmark-driven, deterministic where the result requires it, and optional where single-threaded execution is safer or sufficient. Even while GPU execution is deferred, work units, data layout, and reduction rules should be designed so future GPU kernels can map onto mainstream laptop, desktop, and service GPU hardware.
11. Solver work and dense data should be organized into transport-ready packets where practical. A packet should be able to move across browser workers, native threads, native processes, network services, and future GPU or service backends without inventing a second data format.
12. Path histories can consume memory quickly. The solver needs per-path data streams that keep only a bounded active window in memory, spill high-speed path data to non-volatile storage, and read those records back at high speed.
13. Path-history streams need explicit indices and metadata: path id, time range, frame range, byte offsets, precision path, units, scale normalization, schema version, checksums, provenance, and diagnostic summaries. They should also capture inexpensive derived geometry and frame data when it is cheap to gather, because future solver speedups will likely come from fast spatial and causal queries over this recorded history.
14. Path-history indexing should be tiered. The hot active window should keep only the indices needed to continue precise action, root, and geometry modeling over the next simulation window. Aged-out records should spill to non-volatile storage, where deeper offline indices can be built later for long-term studies, huge simulations, replay, and research.
15. Hot-path data structures should use compact canonical encodings that are straightforward to implement and verify. Compression should usually happen after a run or during export; the solver loop should write efficient canonical chunks first and add hot-path compression only when benchmarks prove it helps.
16. Apps must be able to communicate with the solver through one shared app bridge. App code should call a stable JavaScript or TypeScript request/response API and should not need app-specific C++ or WebAssembly handling.
17. The repo needs an isolated baseline-comparison sandbox for the current app-facing solver paths. The sandbox must run fixed Photon, Ideal Swarm, and Animator baseline cases with resource caps, no network access, fixed seeds, controlled working directories, artifact-only output, and no writes back into app source paths. Differences are classified as `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, or `baseline_investigation_required_mismatch`.
18. New solver validation must include analytic fixtures, manufactured solutions, and invariant checks in addition to existing-baseline comparisons.
19. Once the solver design and first implementation exist, the repo needs a migration plan for the current app-facing migration targets: Photon, Ideal Swarm, and Animator.

## Workstream Metadata

- Kind: `priority`
- Rank: `proposed`
- Value: `high`
- Cost: `unscored`
- ROI: `unscored`
- Status: `active`

## Repo Inventory

The repo has multiple solver-like paths that grew around different app and proof needs. The solver inventory contains 4 app-facing solver paths and about 10 meaningful solver families overall.

Solver-like terms also appear in checkers, fit helpers, layout utilities, proof sidecars, and unrelated helper functions. Those files reflect scattered responsibilities, not the target scope for this workstream.

The reusable solver target is a new architrino motion and geometry solver. It should solve source histories, causal roots, branch-resolved delayed hits, Jacobian-weighted interaction terms, and app-ready simulation datasets. It must be precise over very small and very large geometry, time, velocity, residual, and branch-weight scales. It must also treat long path histories as streamable data, not as unbounded in-memory arrays. This is a complete redesign, not an incremental hardening of `sim2`, the assembly-dynamics toy solver, or an app-local helper. General checkers, fit helpers, layout utilities, proof sidecars, and unrelated helper functions are out of scope unless they directly consume or validate architrino motion and geometry.

## App-Facing Solver Paths

| App | Current solver path | Notes |
| --- | --- | --- |
| Photon | `solvePhotonCausalRoots` in [PhotonFormulaRuntime.js](../../../src/apps/photon/PhotonFormulaRuntime.js#L198) | Photon-local causal-root scan for observer-field diagnostics. |
| Ideal Swarm | `solveFlightTime` in [IdealSwarmRuntime.js](../../../src/apps/ideal-swarm/IdealSwarmRuntime.js#L421) and `solveCircularSelfHitSpan` in [IdealSwarmPathPotentialProfile.js](../../../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js#L53) | Delayed-potential iteration plus circular self-hit span logic. |
| Animator | `runAnimatorSimulationWorkerRequest` in [AnimatorSimulationWorkerCoreRuntime.js](../../../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js#L21), backed by [assembly-dynamics-solver.mjs](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs#L323) through [assembly-dynamics-engine.mjs](../../../scripts/simulations/lib/assembly-dynamics-engine.mjs) | Closest current app bridge to solver-derived datasets. |
| `sim2` | hit-detection causal simulation in [orbits.py](../../../src/apps/sim2/orbits.py#L1123) | Early primitive prototype. Preserve only the intended animation ideas where useful; do not migrate its solver code or treat it as a parity target. |

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

Only Photon, Ideal Swarm, and Animator through the assembly-dynamics path are current migration targets. `sim2` is an animation-intent reference and archive surface only. The non-app legacy solver families are inventory, reference, archive, or separate-maintenance surfaces, not migration targets for the central solver.

## Cross-Priority Requirements Extracted

The cross-priority solver requirements come from known app priorities, simulation priorities, geometry bridge, swarm, mass-map, photon closure, master-equation closure, and proof-program sources that request solver-like behavior.

Classification rule:

| Class | Meaning |
| --- | --- |
| `central solver contract` | Must define the first central solver contract or its stable schema. |
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
| [assembly-dynamics solver](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs) | `central solver contract`, `app migration requirement` | The closest reusable engine already demonstrates the central solver pattern: source histories, finite-history causal-root search, self and partner hits, branch-resolved delayed-hit records, $\lvert J_{ij} \rvert^{-1}$ weighting where required, Jacobian diagnostics, unresolved-root halt reporting, and an Animator dataset bridge. The C++ solver should preserve those successful surfaces while replacing toy-solver limitations. |
| [mass-map](../mass-map/mass-map.md) | `diagnostic or validation requirement`, `reference-only requirement` | Mass-map work requires $A_0$ path-history depth long enough to resolve active causal roots over a closed cycle, state/root/phase ledgers on a common period, scale separation across many orders of magnitude, branch residual rows, energy and shielding ledgers, branch metadata, active-root inventories, and failure notes. Numerical insufficiency from time resolution, history depth, or scale separation should be a solver failure code, not a branch rejection. |
| [swarm](../swarm/swarm.md) and [all-pairs root ledger](../swarm/neutral-swarm/all-pairs-root-ledger.md) | `diagnostic or validation requirement`, `reference-only requirement` | Swarm packets require all ordered source-pair root ledgers, active and inactive root accounting, support-complete memory depth, tail exclusion or assimilation, Jacobian sign strata and floors, root continuation data, force rows tied to the same active root set, and `ledger-rerun-required` when a consumer evaluates against a different root label set. |
| [bounded-speed all-pairs ledger handoff](../swarm/shell-swarm/bounded-speed-factor-all-pairs-ledger-handoff-contract.md) | `diagnostic or validation requirement`, `reference-only requirement` | Bounded-speed work requires explicit clock maps, inverse-clock maps, live-ledger identity, root label handoff, bounded-speed root equations, inactive-gap covers, tail interfaces, root derivative columns, force checksums, consumer checksums, Schur derivative data when roots are eliminated, and first-failure statuses. These inform diagnostics and future proof handoff, not the first app migration scope. |
| [geometry-bridge](../geometry-bridge/geometry-bridge.md) | `diagnostic or validation requirement`, `reference-only requirement` | Geometry bridge needs branch-local response objects, root-sensitive linearization, derivative rows for $\eta$, $J$, delayed force, support, speed factors, and event endpoints, quotient or bordered inverse metadata, geometry-export packets, ledger-mismatch residuals, interval or directed-rounded certificates, and response pass/open/reject statuses. These inform solver-owned geometry diagnostics and future export packets. |
| [photon planar-pair ledger substrate packet](../angular-momentum-spin/photon-planar-pair-ledger-substrate-packet.md) | `diagnostic or validation requirement`, `reference-only requirement` | Photon closure needs delayed branch geometry to supply retained-root phase ledgers, planar-pair rows, root kind, cycle index, source phase-at-hit, receiver phase-at-hit where modeled, phase-spread summaries, local $c$ same-source root solving, Jacobian and transversality floors, and event-window consistency. App fits may nominate regimes but cannot replace the root ledger. |
| [master-equation-closure](../master-equation-closure/master-equation-closure.md) | `diagnostic or validation requirement`, `reference-only requirement` | Master-equation work requires retained branch charts, partner and self roots, inactive gaps, Jacobian floors, finite memory depth, root-transport residuals, finite-band branch tables, interval support, tail constants, variational backend diagnostics, and explicit classification of numerical finite-difference artifacts versus repair-grade tangent data. |
| [proof-programs](../proof-programs/proof-programs.md) | `diagnostic or validation requirement`, `reference-only requirement` | Proof programs require certificate artifact discipline: preledger status, live-ledger update status, branch-chart authorization status, interval boxes, residual functions, endpoint maps, no-switch and uniqueness certificates, row consumption records, source-hash locks, and fail-closed external-input obligations. The central solver may emit artifacts for these consumers later, but proof-program solvers are not migration targets. |
| General `solve` or `solver` hits outside these surfaces | `out of scope` | Fit helpers, layout utilities, checkers, proof sidecars, generated certificate files, and unrelated scripts remain outside the central solver unless a later priority explicitly ties them to architrino motion, causal roots, delayed hits, or geometry. |

Direct contract additions from the extraction:

- Add root-ledger completeness to the central schema: active roots, inactive gaps, tail interface, separator or transition rows, root labels, source/receiver ids, root kind, delay, residual, Jacobian, sign stratum, and first-failure status.
- Add phase-at-hit and cycle metadata for Photon and photon-closure consumers: source phase, receiver phase when modeled, layer, role, charge sign, root kind, cycle index, and phase-spread summaries.
- Add branch-transition and jump metadata so disappearing, appearing, folded, or assimilated roots are not treated as ordinary Newton drift.
- Add explicit failure-code taxonomy for insufficient history depth, insufficient scale separation, inadequate time resolution, unresolved roots, small Jacobian, transversality-floor failure, stream pressure, unsupported browser capability, and validation replay mismatch.
- Add simulation-envelope discipline: entity count, assembly complexity, volume, density, duration, time resolution, interaction density, branch complexity, output detail, memory budget, storage budget, latency target, simplification policy, and admission status.
- Add virtual-observer path-record discipline: segment time bounds, endpoint state or segment coefficients, interpolation law, coordinate frame, numeric type, error bounds, and optional dynamic replay or potential audit references.
- Add artifact and provenance discipline: config hash, schema version, engine version, precision path, tolerance vector, interpolation policy, stream/index hashes, artifact hashes, run claim level, and promotion or migration parity status.
- Keep first implementation scope disciplined: Photon, Ideal Swarm, and Animator are migration targets; `sim2` is animation-intent reference only; mass-map, swarm, geometry-bridge, master-equation, and proof-program families are reference, validation, or future artifact consumers unless a later priority explicitly changes scope.

## Decision Summary

| Decision point | Decision |
| --- | --- |
| Production language | Use C++ with Clang/LLVM only. Rust remains comparison-only and is not a fallback implementation path. |
| C++ standard and build | Use C++20, Clang/LLVM, CMake presets, Ninja, one native CLI target, and one WebAssembly worker target. |
| App bridge | Use one shared JavaScript adapter with TypeScript declarations, backed by a WebAssembly worker. Apps do not handle C++ or WebAssembly directly. |
| Migration scope | Migrate Photon, Ideal Swarm, and Animator only. `sim2` is animation-intent archive only; legacy solver families are reference/archive/separate surfaces. |
| Requirement extraction | Maintain the cross-priority solver-requirements ledger before changing central solver scope. |
| Model contract | Every run declares model id, equation or force-law version, constants, causal speed policy, branch policy, units, and precision compatibility. |
| First solver core | Build the causal-root, delayed-hit, source-history, diagnostics, stream, and index core first; expand motion integration after that core is stable. |
| Simulation envelope | Every run declares its scale and stress dimensions before execution. The solver admits, simplifies, batches, escalates, or rejects the run with diagnostics when the request exceeds the supported envelope. |
| Precision behavior | Use an automatic precision-path selector with explicit caller override to stricter paths only. Never silently downgrade precision or claim level. |
| Threading | Use a bounded native task pool for independent root, stream, index, batch, and replay work; use WebAssembly threads only when browser capability and determinism requirements allow. |
| GPU acceleration | Defer GPU acceleration. Do not make Metal, WebGPU, or any GPU compute path part of the first solver core or migration plan. |
| Geometry boundary | The solver owns causal and path-dependent geometry. Apps own visual layout, controls, styling, and renderer-specific presentation. |
| Storage | Use logical per-path streams backed by a run-level chunked binary store, JSON manifest, encoding dictionary, binary index sidecar, event store, deep-index store, and summary record. |
| Validation | Require analytic fixtures, manufactured solutions, invariant checks, isolated baseline comparisons, golden parity, precision replay, stream round-trip, threading determinism, and app-bridge contract tests before migrating an app. |

## Closest Existing Reusable Engine

For reusable photon and app-facing solver work, the closest existing reusable engine is the assembly-dynamics causal-root solver in [assembly-dynamics-solver.mjs](../../../scripts/simulations/lib/assembly-dynamics-solver.mjs), exposed to app datasets through [assembly-dynamics-engine.mjs](../../../scripts/simulations/lib/assembly-dynamics-engine.mjs).

It already has source histories, finite-history causal-root search, self and partner hits, Jacobian weighting, Jacobian diagnostics, unresolved-root halt reporting, and an Animator dataset bridge. It is still a toy solver and does not yet provide the full geometry, API, performance, or branch-certification contract needed for a central solver. Treat it as a concept and bridge-contract reference, not as the implementation architecture to harden into the final solver.

## Solver Responsibilities

The central solver should provide these capabilities:

1. Motion solving for architrino assemblies, including positions, velocities, polarity bookkeeping, phase diagnostics, and integration status.
2. Causal-root solving over source and receiver histories, including all retained branches, residuals, bracket data, and unresolved-root diagnostics.
3. Delayed-hit solving for self and partner interactions, with emission time, hit time, emitter, receiver, distance, causal-delay Jacobian, strength, and halt reason when relevant.
4. Jacobian-weighted interaction terms using branch weights based on $\lvert J_{ij} \rvert^{-1}$ where the current model requires that branch factor.
5. Geometry calculations used by apps and simulations: source positions, receiver positions, distances, directions, circular self-hit spans, shell intersections, branch-local vectors, frame transforms, and planar or 3-D projection data.
6. Scale-aware numerical precision across many orders of magnitude, including declared precision paths, conditioning diagnostics, residual error budgets, and nondimensionalized or rescaled variables where needed.
7. Simulation envelope admission that evaluates requested scale, runtime, memory, precision, output detail, and algorithmic stress before the solver commits to a run.
8. A minimal virtual-observer path record that separates path definition from dynamic replay and diagnostic audit data.
9. Per-path history streams that append path samples without keeping entire long trajectories in memory.
10. High-speed spill to non-volatile storage and high-speed readback for long runs, including chunked binary path data and compact metadata manifests.
11. Indices for path id, time range, frame range, chunk offsets, delayed-hit events, causal-root events, and diagnostics so apps can scan or seek without loading the whole run.
12. Simulation dataset output for app playback, scrubbing, diagnostics, export, and comparison runs.
13. Deterministic diagnostics: engine id, version, input config, timestep policy, selected precision path, precision settings, simulation envelope, dynamic-range assumptions, stream storage format, root tolerances, halt status, root failure counts, and aggregate branch statistics.
14. Worker, batch, and offline execution modes so apps can stay responsive while long or high-precision runs produce cached datasets.
15. Multithreaded execution where benchmarked gains justify it, especially for independent source-receiver root solves, path-stream chunk work, batch parameter sweeps, and offline replay; single-threaded fallback must remain available.
16. Threading diagnostics: configured thread count, active worker count, scheduling mode, contention indicators, deterministic-reduction mode, and speedup versus single-thread baseline.
17. A shared app-communication bridge that lets browser apps and app workers initialize the solver, submit requests, receive typed outputs, handle errors, and read stream-backed datasets without app-specific C++ handling.
18. App adapters for Photon, Ideal Swarm, and Animator during migration.
19. Test fixtures or benchmark scenarios that compare old app-local behavior against solver-derived behavior before app code is simplified.
20. Complete root-ledger outputs for retained roots, inactive gaps, tail or separator rows, transition rows, root labels, Jacobian sign strata, residuals, and first-failure statuses.
21. Phase-at-hit and cycle metadata for Photon and photon-closure consumers, including source phase, receiver phase when modeled, layer, role, charge sign, root kind, and phase-spread summaries.
22. Branch-transition diagnostics for roots that appear, disappear, fold, become assimilated from a tail region, or require a ledger rerun.
23. Validation and handoff artifacts for reference-only consumers, including artifact hashes, provenance records, tolerance vectors, convergence summaries, and promotion or parity status.

## Chosen API Surface

The central API should be versioned and handle-based. Small configs, manifests, summaries, and diagnostics should move as structured JSON-compatible records. Dense path, frame, root, hit, and geometry data should move as typed binary buffers or stream handles.

| API responsibility | Required output |
| --- | --- |
| Estimate and admit a simulation envelope | Envelope classification, stress dimensions, expected resource pressure, precision path candidates, simplification options, and rejection or escalation diagnostics. |
| Declare model contract | Model id, equation or force-law version, constants, causal speed policy, branch policy, units, and precision compatibility. |
| Run an architrino motion simulation | Frames with positions, velocities, phases, diagnostics, and halt status. |
| Record a minimal virtual-observer path segment | Time bounds, path id, coordinate frame, endpoint state or segment coefficients, interpolation law, numeric type, and error bounds. |
| Solve causal roots for a source-receiver history pair | Root list with emission time, delay, residual, branch metadata, and unresolved-root diagnostics. |
| Solve delayed hits | Hit records with emitter, receiver, emission point, receiver point, $J_{ij}$, strength, and source branch. |
| Emit a root ledger | Active roots, inactive gaps, tail or separator rows, transition rows, root labels, root kind, residuals, Jacobian sign strata, and first-failure statuses. |
| Report phase-at-hit diagnostics | Source phase, receiver phase when modeled, layer, role, charge sign, cycle index, phase-spread summaries, and event-window consistency flags. |
| Select precision path | Regime classification, selected simulation technique, numeric type, tolerance policy, scale normalization, error budget, and conditioning diagnostics. |
| Report precision path diagnostics | Orbital speed scale, assembly speed scale, timestep policy, root residuals, accumulated error estimates, fallback reason, and validation status. |
| Open a path-history stream | Stream id, path id mapping, declared columns, sample stride, precision metadata, and storage policy. |
| Append path samples | Chunked path data written with bounded memory, backpressure reporting, and spill status. |
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
| Run baseline comparisons | Isolated baseline sandbox runs for Photon, Ideal Swarm, and Animator, with diff reports that classify differences as `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, or `baseline_investigation_required_mismatch`. Optional `sim2` or legacy notes may clarify the boundary, but they do not create migration parity gates. |

API contract decisions:

- use `runId`, `requestId`, `streamId`, and `datasetId` handles rather than exposing C++ object ownership to apps;
- version every config, response, stream manifest, and binary layout;
- standardize halt and error records across precision failures, root failures, IO failures, cancellation, unsupported browser features, and worker failures;
- treat all dense solver outputs as immutable after publication to the app bridge;
- keep app-facing schema stable even if internal C++ modules are reorganized;
- require the model contract and error-budget state in every run manifest;
- require replay metadata for every result that may be used as a benchmark, migration parity case, or exported dataset.

## Simulation Capability Envelope

A requested simulation has a stress profile across many resource and accuracy dimensions. The solver should describe that profile as a simulation envelope before it starts expensive work. A small-looking physical setup can still be impossible to model literally if it implies an enormous architrino count, dense all-to-all interactions, long history depth, strict precision, or high-output replay data. For example, a 1 cm spacetime volume with air and passing nutrients may require reduced modeling unless the run is intentionally scoped to a much smaller active subset or a carefully defined diagnostic slice.

The envelope is not a single limit. It is a vector of pressures on the algorithm and implementation:

| Dimension | Why it stresses the solver | Required envelope record |
| --- | --- | --- |
| Model contract | Different force laws, causal speed policies, branch policies, constants, and units change both correctness and cost. | Model id, equation or force-law version, constants hash, causal speed policy, branch policy, units, and compatibility constraints. |
| Architrino count | State size, pair counts, path samples, root candidates, and memory scale with entity count. | Entity count, active subset policy, assembly grouping, and whether the run is literal or reduced. |
| Assembly count and internal complexity | Assemblies may add internal phase, polarity, branch, and geometry structure beyond raw path count. | Assembly ids, member counts, internal degrees of freedom, and requested assembly diagnostics. |
| Physical volume and density | Volume changes spatial separation, candidate locality, path length, and index selectivity; density drives interaction pressure. | Spatial bounds, density summary, boundary policy, and spatial-index strategy. |
| Simulated duration | Longer runs deepen histories, increase storage, and enlarge the possible causal search window. | Time window, cycle count, history depth, active-window policy, and archival policy. |
| Time resolution and event resolution | Fine steps improve accuracy but increase samples, root brackets, event rows, and stream volume. | Step policy, event-step policy, interpolation policy, and maximum output stride. |
| Speed regimes | Sub-field-speed, near-field-speed, super-field-speed, and threshold crossings stress root counts and branch transitions. | Speed-regime summary, field-speed crossing rows, precision path, and branch-transition policy. |
| Interaction graph density | All-to-all, same-source, dense neighbor sets, and long-range scans can dominate runtime. | Pair policy, same-source policy, pruning policy, work-packet partitioning, and broad-phase index plan. |
| Branch and root density | Multiple roots, folded roots, small $\lvert J_{ij} \rvert$, births, deaths, and unresolved roots can dominate correctness. | Root count estimates, branch complexity flags, Jacobian floors, unresolved-root policy, and first-failure status. |
| Geometry complexity | Curved paths, shell intersections, swept segments, local frames, and projection geometry increase both CPU and output costs. | Geometry output list, authoritative versus display projection flag, and broad-phase geometry metadata. |
| Precision and dynamic range | Many-orders-of-magnitude scales, near-collision geometry, and cancellation require stricter methods. | Claim level, error budget, scale normalization, numeric type, and precision-path candidates. |
| Output detail | Recording every path sample, event, local frame, and diagnostic row can exceed compute or storage budgets. | Requested outputs, sample stride, derived-column inventory, compression/export policy, and replay requirement. |
| Memory and storage budget | Hot active windows, warm chunks, deep indices, and replay artifacts compete for bounded resources. | Memory budget, storage target, active-window size, age-out policy, and deep-index policy. |
| Latency target | Interactive preview, app playback, batch export, and validation evidence have different acceptable runtimes. | Claim level, expected latency, execution mode, threading policy, and fallback path. |
| Parallelism and backend | Work that partitions cleanly can scale; branch-heavy or precision-heavy work may not. | Threading mode, work-packet layout, deterministic reduction mode, and unsupported backend diagnostics. |
| Simplification policy | Literal simulations may be too large; reduced models need explicit scope and claim limits. | Reduction method, omitted interactions, active subset, claim-level downgrade if requested, and validation obligations. |

Envelope handling rules:

- Admit the run when the requested envelope fits the current solver capability and declared budgets.
- Simplify only when the caller explicitly requests a reduced model, and record what was reduced or omitted.
- Batch or stream the run when the algorithm fits but the data volume does not fit interactive memory.
- Escalate to stricter precision, smaller timesteps, deeper history, or offline execution when correctness requires it.
- Reject or halt with `simulation_envelope_exceeded` when the run cannot meet the requested claim level inside the supported envelope.
- Treat envelope expansion as normal solver evolution: add better indices, better partitioning, better precision paths, better storage, or better algorithms over time, then widen the admitted envelope with benchmarks and validation fixtures.

The simulation envelope should be part of the run manifest. It should be visible to apps before a run starts, included in diagnostics during execution, and preserved in exported datasets so later readers know what was simulated, what was reduced, and what the solver did not claim.

## Virtual Observer Path Record

An architrino should not be treated as a human-like observer. At absolute time $t_{\mathrm{now}}$, the dynamics for one architrino are determined by its own state plus the causal-delay interaction data that reaches it from retained source histories. The virtual observer is solver instrumentation: it records enough state to define, replay, and audit the path.

For one architrino at $t_{\mathrm{now}}$ with position $\mathbf{x}_i(t_{\mathrm{now}})$ and velocity $\mathbf{v}_i(t_{\mathrm{now}})$, the local dynamic inputs are:

| Input class | Minimal record | Purpose |
| --- | --- | --- |
| Identity and role | `pathId`, architrino type or polarity, assembly id when any, role code, and active status flags. | Ties the path to charge/polarity rules, assembly bookkeeping, and app rendering. |
| Current kinematic state | Absolute time, position, velocity, coordinate frame, units, scale normalization, and numeric type. | Defines where the architrino is and how its path is moving at the sample. |
| Assigned assembly state when modeled | Assembly-state reference, phase, cycle index, assembly-local coordinates, and declared internal degrees of freedom for the active assembly model. | Required when the force law depends on phase, assembly structure, or internal resonance. Store compact values or references, not full assembly copies per sample. |
| Active causal roots | Source id, receiver id, root id, root kind, emission time, hit time, delay, residual, and branch status. | Identifies which past source-history events can affect the architrino now. |
| Branch geometry | Source point at emission, receiver point at hit, displacement, distance, direction, source velocity when needed, and local frame. | Supplies the geometry used for delayed hits, potential terms, and Jacobian evaluation. |
| Jacobian and weighting | $J_{ij}$, sign stratum, branch weight such as $\lvert J_{ij} \rvert^{-1}$ where required, floors, and rejection reason when any. | Keeps branch strength and near-singular behavior explicit. |
| Potential summary | Net potential or force/acceleration contribution required by the current model, plus optional per-source contribution references. | Lets the integrator advance the path and lets diagnostics explain the perceived potential. |
| Error and validity state | Tolerances, residual error estimate, interpolation error estimate, precision path, and status code. | States whether the sample is authoritative for replay, preview only, or halted. |

The minimum virtual-observer record depends on the requested use:

| Record level | Minimum data | What it can prove |
| --- | --- | --- |
| Kinematic path definition | `pathId`, time or time interval, coordinate frame, numeric type, position, velocity or segment coefficients, interpolation law, and error bounds. | Defines the path geometry precisely enough for playback, root searches, and geometry queries over the declared interval. |
| Dynamic replay | Kinematic path definition plus integration method, timestep policy, tolerance policy, selected precision path, and either force/acceleration segment data or references to the causal-root and delayed-hit records that generated it. | Reproduces how the solver advanced the path under the declared model. |
| Potential audit | Dynamic replay plus retained causal-root rows, delayed-hit rows, branch geometry, Jacobian rows, per-branch contribution summaries, and rejection or halt reasons. | Explains the perceived potential and lets a validation replay check branch accounting. |
| Full validation record | Potential audit plus provenance, config hash, stream/index hashes, artifact hashes, thread policy, storage policy, and simulation envelope. | Supports migration parity, exported evidence, and long-term replay. |

For path storage, the strict minimum to define a precise path is the kinematic path definition. Potential values and causal-hit ledgers are not strictly required if the path has already been recorded with a valid interpolation law and error bound. They are required when the solver must replay, audit, validate, or continue the dynamics without trusting the recorded path as an opaque curve.

The preferred path segment representation is therefore segment-based, not just point samples. Each authoritative segment should declare its time bounds, endpoint state or polynomial coefficients, interpolation rule, local coordinate frame, numeric type, and maximum interpolation error. If the solver uses endpoint position and velocity, the manifest must state whether the segment is reconstructed with Hermite interpolation, another declared polynomial, or a stricter model-specific interpolant. If the required precision cannot be met by the stored segment representation, the stream must preserve denser samples, stricter coefficients, or a replay dependency on the original causal-root ledger.

## Temporal Assembly Graph

Assembly data should be normalized rather than copied into every architrino path row. The architrino path record should carry compact keys such as `assemblyId`, `assemblyStateId`, local role, membership interval, and membership version when those are relevant. The larger assembly state should live in an assembly-history stream or table keyed by assembly id and time interval. A path reader can join those records when a run needs assembly context; playback-only reads can skip them.

The solver should emit an `assembly_membership_change` event when an architrino enters an assembly, leaves an assembly, changes assembly id, changes local role, changes binding state, or changes the mapping between architrino-local coordinates and assembly-local coordinates. This is the relational-database analogy applied to path histories: architrinos have histories, assemblies have histories, membership has its own time-indexed history, and indices can be added or optimized later as long as replay and validation fixtures preserve testable fidelity for the declared use case.

The natural database structure is a temporal assembly graph. It should be implemented as solver-owned streams and indices, not as one object tree copied into every sample. An assembly, subassembly, molecule, or larger structure is a time-indexed entity with hierarchy edges and membership intervals. Stable structures can occupy very long intervals; unstable or exchanging structures can produce short membership intervals and change events. The solver should allow this hierarchy to extend only as far as the declared simulation envelope and use case require.

Identity lifecycle rules are part of the temporal assembly graph contract. Assembly ids, assembly-state ids, membership ids, and hierarchy ids must be stable across a run and versioned across schema changes. Splits, merges, exchanges, ambiguous membership, and unresolved membership must be represented as explicit interval or event records rather than hidden mutation of prior rows. If membership is inferred rather than authoritative, the record must carry confidence, source, and validation status.

Core temporal assembly graph record families:

| Record family | Minimal keys | Purpose |
| --- | --- | --- |
| Architrino path history | `pathId`, time interval, path segment id, optional `assemblyId`, optional local role. | Defines the elementary path geometry and optional current assembly reference. |
| Assembly state history | `assemblyId`, `assemblyStateId`, time interval, center or frame state, phase/cycle state when modeled, model version, status flags. | Stores assembly-level state once per interval instead of copying it to every member architrino. |
| Assembly membership history | `pathId`, `assemblyId`, membership interval, local role, binding state, membership version. | Records which architrinos belong to which assembly over which interval. |
| Assembly hierarchy history | parent `assemblyId`, child `assemblyId`, relation type, time interval, hierarchy version. | Represents assemblies, subassemblies, and larger containing structures without flattening the whole hierarchy into path rows. |
| Assembly event ledger | event id, event kind, affected ids, time, prior state reference, next state reference, status. | Captures membership changes, binding changes, hierarchy changes, assembly splits/merges, threshold crossings, and instability events. |
| Threshold and self-action ledger | affected path or assembly id, speed regime, field-speed threshold row, self-action flag, branch-transition reference. | Preserves knife-edge regimes where a small shove can change later evolution through self action or branch structure. |

The graph should not assume that a proton-like or other highly stable assembly is impossible to exchange or rearrange unless the theory and fixture for that regime say so. If a run treats a stable proton-like assembly as long-lived, represent that as a long membership interval with a model version and fidelity claim, not as a hardcoded permanent containment rule. If later simulations or theory require exchange, splits, merges, or nested subassembly changes, the same event and interval model can express them.

This model is intended to support many solver questions over the same data: replay a path, reconstruct an assembly, ask which assembly contained an architrino at a time, find all architrinos inside a hierarchy, trace a membership change, or re-run causal-root queries with stricter precision. It cannot make every future question free, but it keeps the data normalized and indexable so new query plans can be added without corrupting the authoritative path and event records.

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
| `extended_precision` | Scale separation, near-collision geometry, small $\lvert J_{ij} \rvert$, or cancellation makes ordinary scaled `f64` insufficient. | Arbitrary precision or interval-backed kernels, directed rounding where needed, strict error budgets, and lower-throughput batch/offline expectation. |
| `validation_replay` | A production result needs an independent precision check. | Replay with stricter tolerances or a higher precision path, compare residuals and path samples, and emit a parity report. |

The app-facing default is `auto`, not a fixed path. `auto` may select `scaled_f64_fast` only when conditioning is clean and the requested claim level is interactive. Saved runs, exported runs, migration parity runs, and benchmark runs should use at least `scaled_f64_strict` or `validation_replay`.

The precision path must be visible in every dataset and stream manifest. It should be possible to reproduce a run from its selected path, numeric type, scale normalization, tolerance policy, timestep policy, root policy, and error budget.

Error-budget propagation is part of the precision path. The run manifest must state the global error budget and the stage budgets for root isolation, delayed-hit reconstruction, motion integration, stream encoding, indexed readback, projection, and app-facing display buffers. Each stage must declare whether its output is authoritative, approximate, broad-phase-only, or display-only. A downstream projection must not erase the stricter error bound or numeric type of the authoritative upstream result.

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

Storage lifecycle is part of the app bridge contract. Browser and native paths must define retention, cleanup, quota-pressure behavior, failed-run cleanup, export handoff, and user-visible deletion semantics. A failed or cancelled run may leave only declared recovery artifacts; it must not leave unindexed chunks that look authoritative.

### App-Facing TypeScript Contract Draft

The shared adapter should expose a small TypeScript surface. Apps import this adapter; they do not call the WebAssembly module, C++ exports, stream files, or worker protocol directly.

```ts
export type SolverAppId = "animator" | "photon" | "ideal-swarm";

export type SolverRunKind =
  | "motionSimulation"
  | "causalRoots"
  | "delayedHits"
  | "sharedGeometry"
  | "appPlayback"
  | "validationReplay";

export type SolverPrecisionPath =
  | "auto"
  | "scaled_f64_fast"
  | "scaled_f64_strict"
  | "adaptive_multirate"
  | "event_root_focused"
  | "extended_precision"
  | "validation_replay";

export type SolverClaimLevel =
  | "interactive-preview"
  | "migration-parity"
  | "exported-dataset"
  | "validation-evidence";

export interface SolverClient {
  init(request: SolverInitRequest): Promise<SolverInitResponse>;
  capabilities(): Promise<SolverCapabilities>;
  runSimulation(request: SolverRunRequest): Promise<SolverRunHandle>;
  cancelRun(request: SolverCancelRequest): Promise<SolverStatusRecord>;
  openStream(request: SolverOpenStreamRequest): Promise<SolverStreamHandle>;
  readStreamRange(request: SolverReadStreamRangeRequest): Promise<SolverStreamRangeResponse>;
  closeRun(request: SolverCloseRunRequest): Promise<SolverStatusRecord>;
  dispose(): Promise<void>;
}

export interface SolverInitRequest {
  appId: SolverAppId;
  apiVersion: string;
  requestedCapabilities: string[];
  storagePolicy: SolverStoragePolicy;
  threadingPolicy: SolverThreadingPolicy;
}

export interface SolverRunRequest {
  appId: SolverAppId;
  runKind: SolverRunKind;
  claimLevel: SolverClaimLevel;
  precisionPath: SolverPrecisionPath;
  configVersion: string;
  configHash?: string;
  model: SolverModelContract;
  envelope: SolverSimulationEnvelope;
  errorBudget: SolverErrorBudget;
  config: SolverRunConfig;
  output: SolverOutputRequest;
}

export interface SolverModelContract {
  modelId: string;
  equationVersion: string;
  forceLawVersion?: string;
  constantsHash: string;
  causalSpeedPolicy: string;
  branchPolicy: string;
  unitConvention: string;
  compatiblePrecisionPaths: SolverPrecisionPath[];
}

export interface SolverErrorBudget {
  globalTolerance: number;
  rootIsolationTolerance: number;
  delayedHitTolerance: number;
  integrationTolerance: number;
  streamEncodingTolerance: number;
  readbackTolerance: number;
  projectionTolerance?: number;
  displayTolerance?: number;
}

export type SolverRunConfig =
  | AnimatorSolverConfig
  | PhotonSolverConfig
  | IdealSwarmSolverConfig
  | ValidationReplayConfig;

export interface SolverRunHandle {
  requestId: string;
  runId: string;
  datasetId?: string;
  cancellationToken: string;
  acceptedPrecisionPath: SolverPrecisionPath;
  expectedOutputs: SolverOutputKind[];
}

export type SolverOutputKind =
  | "summary"
  | "frameBuffer"
  | "pathSegmentBuffer"
  | "pathStream"
  | "assemblyMembership"
  | "assemblyGraph"
  | "rootLedger"
  | "delayedHitEvents"
  | "phaseAtHit"
  | "geometryBuffer"
  | "diagnostics"
  | "validationArtifacts";

export interface SolverOutputRequest {
  outputs: SolverOutputKind[];
  streamTarget?: "worker-memory" | "opfs" | "native-file" | "caller-buffer";
  memoryBudgetBytes: number;
  sampleStride?: number;
  deterministic: boolean;
}

export interface SolverSimulationEnvelope {
  entityCount: number;
  assemblyCount?: number;
  spatialBounds?: SolverSpatialBounds;
  densityEstimate?: number;
  timeWindow: SolverTimeWindow;
  timeResolutionHint?: number;
  interactionPolicy: "sparse" | "neighbor-pruned" | "all-to-all" | "same-source-enabled";
  expectedBranchComplexity: "low" | "moderate" | "high" | "unknown";
  outputDetail: "preview" | "playback" | "export" | "validation";
  memoryBudgetBytes: number;
  storageBudgetBytes: number;
  latencyTarget: "interactive" | "background" | "batch" | "validation";
  simplificationPolicy: "none" | "explicit-reduced-model";
}

export interface SolverSpatialBounds {
  x: SolverRange;
  y: SolverRange;
  z: SolverRange;
  units: string;
}
```

Response messages should be normalized by the shared adapter:

```ts
export type SolverWorkerMessage =
  | { type: "progress"; runId: string; stage: string; fraction?: number }
  | { type: "diagnostic"; runId: string; diagnostic: SolverDiagnosticRecord }
  | { type: "completed"; runId: string; response: SolverRunResponse }
  | { type: "halt"; runId: string; status: SolverStatusRecord }
  | { type: "error"; requestId: string; status: SolverStatusRecord };

export interface SolverRunResponse {
  runId: string;
  datasetId?: string;
  summary: SolverRunSummary;
  buffers: SolverBufferDescriptor[];
  streams: SolverStreamDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverBufferDescriptor {
  bufferId: string;
  layout: SolverBinaryLayoutId;
  byteOffset: number;
  byteLength: number;
  rowCount: number;
  numericType: SolverNumericType;
  buffer: ArrayBuffer;
}

export interface SolverStreamDescriptor {
  streamId: string;
  manifestVersion: string;
  indexLayout: SolverBinaryLayoutId;
  availableRanges: SolverStreamRange[];
  storagePolicy: SolverStoragePolicy;
}
```

Required shared support types:

```ts
export type SolverBinaryLayoutId =
  | "frame_buffer.v1"
  | "path_segment.v1"
  | "assembly_state.v1"
  | "assembly_membership.v1"
  | "assembly_hierarchy.v1"
  | "assembly_events.v1"
  | "path_chunk.v1"
  | "root_ledger.v1"
  | "delayed_hit_events.v1"
  | "phase_at_hit.v1"
  | "geometry_buffer.v1"
  | "stream_index.v1";

export type SolverNumericType =
  | "f64"
  | "scaled_i64"
  | "interval_f64_pair"
  | "decimal128"
  | "mp_limb_block";

export interface SolverInitResponse {
  apiVersion: string;
  solverVersion: string;
  capabilities: SolverCapabilities;
  status: SolverStatusRecord;
}

export interface SolverCapabilities {
  precisionPaths: SolverPrecisionPath[];
  outputLayouts: SolverBinaryLayoutId[];
  storage: SolverStorageCapability;
  threading: SolverThreadingCapability;
  maxTransferBytes: number;
}

export interface SolverStoragePolicy {
  target: "worker-memory" | "opfs" | "native-file" | "caller-buffer";
  durable: boolean;
  maxBytes: number;
}

export interface SolverStorageCapability {
  supportsOpfs: boolean;
  supportsNativeFile: boolean;
  supportsCallerBuffer: boolean;
  maxRecommendedBytes: number;
}

export interface SolverThreadingPolicy {
  mode: "single-thread" | "auto" | "fixed";
  maxThreads?: number;
  deterministic: boolean;
}

export interface SolverThreadingCapability {
  nativeThreads: boolean;
  wasmThreads: boolean;
  browserWorker: boolean;
  crossOriginIsolationRequired: boolean;
}

export interface SolverCancelRequest {
  requestId?: string;
  runId?: string;
  reason?: string;
}

export interface SolverCloseRunRequest {
  runId: string;
  releaseStreams: boolean;
}

export interface SolverOpenStreamRequest {
  runId: string;
  datasetId?: string;
  streamId?: string;
  purpose: "playback" | "diagnostics" | "export" | "validation";
}

export interface SolverStreamHandle {
  streamId: string;
  manifestVersion: string;
  readableLayouts: SolverBinaryLayoutId[];
  availableRanges: SolverStreamRange[];
}

export interface SolverReadStreamRangeRequest {
  streamId: string;
  pathIds?: string[];
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  eventKinds?: string[];
  maxBytes?: number;
}

export interface SolverStreamRangeResponse {
  streamId: string;
  ranges: SolverStreamRange[];
  buffers: SolverBufferDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverRange {
  start: number;
  end: number;
}

export interface SolverStreamRange {
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange: SolverRange;
}
```

Required app config records:

```ts
export interface SolverTimeWindow {
  start: number;
  end: number;
  stepHint?: number;
  units: "solver-time" | "seconds" | "cycles";
}

export interface SolverHistoryRef {
  pathId: string;
  role: "source" | "receiver" | "architrino" | "assembly" | "observer";
  source: "inlineSamples" | "streamRef" | "proceduralOrbit" | "appState";
  streamId?: string;
  layout?: SolverBinaryLayoutId;
  numericType?: SolverNumericType;
  parameters?: Record<string, number>;
}

export interface SolverPairSpec {
  receiverId: string;
  sourceId: string;
  includeSameSource: boolean;
  rootKinds: ("partner" | "same-source" | "tail" | "separator")[];
}

export interface AnimatorSolverConfig {
  appId: "animator";
  timeWindow: SolverTimeWindow;
  histories: SolverHistoryRef[];
  pairs: SolverPairSpec[];
  requestedGeometry: ("fieldShells" | "delayedHitConnectors" | "pathTrails")[];
}

export interface PhotonSolverConfig {
  appId: "photon";
  timeWindow: SolverTimeWindow;
  photonChannelSpeed: number;
  branchSignalSpeed: number;
  sourceHistories: SolverHistoryRef[];
  receiverHistory: SolverHistoryRef;
  pairs: SolverPairSpec[];
  phaseLedger: "disabled" | "source" | "source-and-receiver";
}

export interface IdealSwarmSolverConfig {
  appId: "ideal-swarm";
  timeWindow: SolverTimeWindow;
  histories: SolverHistoryRef[];
  pairs: SolverPairSpec[];
  requestedGeometry: ("flightTime" | "delayedPotential" | "circularSelfHitSpan")[];
}

export interface ValidationReplayConfig {
  appId: SolverAppId;
  baselineRunId?: string;
  baselineArtifactHash?: string;
  replayPrecisionPath: Exclude<SolverPrecisionPath, "auto">;
  compareLayouts: SolverBinaryLayoutId[];
}
```

### Per-App Adapter Contracts

| App adapter | Request mapping | Required solver outputs | Migration acceptance |
| --- | --- | --- | --- |
| Animator | Convert simulation-authoring state and assembly initial conditions into `motionSimulation` or `appPlayback` requests. | Frame buffers, path streams, field-shell geometry, delayed-hit events, root ledger, run summary, halt status, and diagnostics compatible with the existing Animator dataset playback surface. | Existing Animator playback can render solver datasets without per-frame solver execution, and parity fixtures match the current assembly-dynamics-backed path within declared tolerances. |
| Photon | Convert photon layer parameters, source histories, receiver history, local speed parameters, and observer-field settings into `causalRoots`, `delayedHits`, and `sharedGeometry` requests. | All positive causal roots, same-source roots when enabled, phase-at-hit rows, phase-spread summaries, Jacobian diagnostics, rejected-root reasons, reconstructed receiver acceleration, and transverse-field buffers. | Photon-local causal-root diagnostics can be replaced by the shared root and phase APIs while preserving visible diagnostic behavior and exposing stronger precision/status records. |
| Ideal Swarm | Convert flight-time, delayed-potential, circular self-hit, and path-potential settings into `causalRoots`, `delayedHits`, and `sharedGeometry` requests. | Flight-time roots, circular self-hit spans, delayed-potential geometry, root ledger rows, delayed-hit events, precision diagnostics, and geometry buffers usable by the existing profile views. | Existing `solveFlightTime` and `solveCircularSelfHitSpan` fixtures match shared-solver outputs within declared root residual and geometry tolerances. |

App adapters may contain UI-to-solver normalization and solver-to-renderer formatting. They may not contain app-specific C++ handling, WebAssembly lifecycle code, stream-file parsing, or private status-code interpretation.

### Status And Error Vocabulary

Every halt, error, warning, or validation result should use one shared status record:

```ts
export type SolverStatusSeverity = "ok" | "info" | "warning" | "halt" | "error";

export type SolverStatusCode =
  | "ok"
  | "cancelled"
  | "baseline_within_tolerance"
  | "baseline_refined_result"
  | "baseline_model_boundary_difference"
  | "baseline_investigation_required_mismatch"
  | "precision_escalated"
  | "precision_failed"
  | "simulation_envelope_exceeded"
  | "insufficient_history_depth"
  | "insufficient_scale_resolution"
  | "time_resolution_insufficient"
  | "root_not_bracketed"
  | "root_unresolved"
  | "small_jacobian"
  | "transversality_floor_failed"
  | "ledger_rerun_required"
  | "stream_memory_pressure"
  | "stream_write_failed"
  | "stream_read_failed"
  | "unsupported_browser_storage"
  | "unsupported_wasm_threads"
  | "validation_replay_mismatch"
  | "app_contract_error"
  | "internal_solver_error";

export interface SolverStatusRecord {
  code: SolverStatusCode;
  severity: SolverStatusSeverity;
  message: string;
  runId?: string;
  requestId?: string;
  stage?: string;
  recoverable: boolean;
  details?: Record<string, unknown>;
}
```

Status rules:

- `precision_escalated` is informational only when the solver moves to a stricter path and still satisfies the requested claim level.
- `baseline_within_tolerance` means the new solver result matches the existing baseline inside the declared tolerance file.
- `baseline_refined_result` is allowed only under the same declared model contract when the new solver preserves the branch/root/event structure and improves a measured quantity such as residual, error bound, conditioning, or replay consistency.
- `baseline_model_boundary_difference` means the difference is explained by a declared model, equation, force-law, constant, unit, causal speed, or branch-policy change.
- `baseline_investigation_required_mismatch` blocks migration simplification until the mismatch is explained, fixed, or reclassified with evidence.
- `precision_failed` is a halt when no available stricter path can satisfy the declared error budget.
- `simulation_envelope_exceeded` is a halt when the requested entity count, duration, interaction density, precision claim, output detail, memory budget, storage budget, or latency target cannot be satisfied by the current solver capability.
- `ledger_rerun_required` is a halt for proof or validation consumers and a warning for interactive previews only when the manifest marks the result as preview-grade.
- `unsupported_browser_storage` and `unsupported_wasm_threads` must not be hidden; the app bridge reports the missing capability and selects a declared fallback or halts.
- `internal_solver_error` is reserved for invariant failures. Root failures, precision failures, and IO failures must use their specific status codes.

### Binary Buffer Layouts

All dense app-facing buffers should use versioned, little-endian, structure-of-arrays layouts. Every buffer descriptor declares `layout`, `numericType`, `rowCount`, byte length, coordinate convention, time convention, precision path, and whether the buffer is authoritative or an app-facing projection.

| Layout id | Rows | Required columns | Primary consumers |
| --- | --- | --- | --- |
| `frame_buffer.v1` | One row per frame/path sample. | `frameIndex`, `time`, `pathId`, `x`, `y`, `z`, `vx`, `vy`, `vz`, `phase`, `roleCode`, `statusFlags`. | Animator playback, app previews, export. |
| `path_segment.v1` | One row per authoritative interpolation segment. | `segmentId`, `pathId`, time bounds, endpoint position, endpoint velocity or coefficient offset, interpolation law, numeric type, local frame id, error bound, status flags. | Precise path definition, causal-root search, geometry queries, validation replay. |
| `assembly_state.v1` | One row per assembly-state interval. | `assemblyId`, `assemblyStateId`, time bounds, model version, center or frame state, phase/cycle fields when modeled, stability/fidelity flags. | Assembly-aware replay, long-lived assemblies, subassembly joins, model-version audits. |
| `assembly_membership.v1` | One row per membership interval or membership-change event. | `pathId`, `assemblyId`, `assemblyStateId`, local role, time bounds, membership version, binding state, transform reference, event kind, status flags. | Assembly-aware replay, joins from architrino histories to assembly histories, membership-change diagnostics. |
| `assembly_hierarchy.v1` | One row per parent-child assembly interval. | Parent assembly id, child assembly id, relation type, time bounds, hierarchy version, status flags. | Nested assemblies, subassemblies, molecular or larger hierarchy queries. |
| `assembly_events.v1` | One row per assembly, hierarchy, threshold, or self-action event. | `eventId`, event kind, affected ids, event time, prior state reference, next state reference, speed regime, branch-transition reference, status flags. | Assembly splits/merges, containment changes, field-speed threshold rows, self-action diagnostics. |
| `path_chunk.v1` | One chunk per time window and bounded path bundle. | Chunk header, time bounds, frame bounds, path id range, declared sample columns, checksum trailer. | Path-history streams, indexed readback, scrubbing. |
| `root_ledger.v1` | One row per retained, inactive, separator, or transition root row. | `receiverId`, `sourceId`, `rootId`, `rootKind`, `hitTime`, `emissionTime`, `delay`, `distance`, `residual`, `jacobian`, `jacobianSign`, `statusCode`, `firstFailureCode`. | Photon diagnostics, validation replay, proof handoff, delayed-hit reconstruction. |
| `delayed_hit_events.v1` | One row per delayed-hit event. | `eventId`, `rootId`, `emitterId`, `receiverId`, emission point, receiver point, unit direction, `jacobian`, `strength`, `statusCode`. | Animator delayed-hit rendering, Photon hit sums, Ideal Swarm potential views. |
| `phase_at_hit.v1` | One row per source/receiver phase record attached to a root. | `rootId`, `pathId`, `layerCode`, `roleCode`, `chargeSign`, `rootKind`, `cycleIndex`, `sourcePhase`, `receiverPhase`, `phaseSpreadGroup`. | Photon and photon-closure diagnostics. |
| `geometry_buffer.v1` | One row per geometry primitive. | `primitiveId`, `primitiveKind`, path/source/receiver ids, points or vector payload, scalar payload, projection status. | Shells, spans, intersections, connectors, display projections. |
| `stream_index.v1` | One row per committed chunk or event range. | `streamId`, `chunkId`, byte offset, byte length, time bounds, frame bounds, row count, checksum, index flags. | High-speed readback, recovery after interrupted runs. |

`numericType` should include at least `f64`, `scaled_i64`, `interval_f64_pair`, `decimal128`, and `mp_limb_block`. Browser visual buffers may use projected `f64`, but the manifest must state when stricter authoritative data exists in stream storage or native batch artifacts.

Numeric serialization rules are required for every `numericType`. The schema must define byte order, signedness, scale factors, exponent layout, limb order, interval endpoint convention, rounding mode, NaN and infinity policy where applicable, comparison semantics, and text export representation. `decimal128` and `mp_limb_block` are not acceptable as labels alone.

## Threading Execution Policy

Decision: use multithreading as an execution policy, not as a semantic dependency. A correct single-thread execution must exist for every solver operation. Multithreaded execution is enabled only for stages where the work is naturally independent, the result can remain deterministic when required, and benchmarks show useful speedup.

| Workload | Threading decision |
| --- | --- |
| Source-receiver causal-root batches | Parallelize across independent source-receiver pairs and time windows. |
| All-to-all and same-source candidate scans | Parallelize across receiver blocks, source blocks, time slabs, spatial blocks, and emitted-shell batches; merge candidates deterministically before narrow root solving. |
| Delayed-hit event extraction | Parallelize candidate event scans, then merge events in deterministic order. |
| Path chunk write, checksum, and index preparation | Parallelize chunk preparation and checksums; serialize final manifest and index commits. |
| Batch parameter sweeps | Parallelize independent runs through the native CLI and batch runner. |
| Validation replay | Parallelize independent replay cases, but keep each replay deterministic by default. |
| App UI execution | Keep solver work off the UI thread through the shared worker; enable WebAssembly internal threads only when browser capability and app security headers support them. |

Native execution should use a bounded C++ task pool with explicit thread-count configuration. Browser execution should start with one solver worker as the required baseline. WebAssembly threads are an optimization path, gated by capability detection, cross-origin isolation requirements, deterministic-reduction needs, and measured benefit.

Deterministic mode is required for parity tests, validation replay, exported datasets, and any result used as evidence. Deterministic mode should use stable merge order, deterministic reductions, fixed chunk commit order, and explicit random seeds if randomized sampling is ever introduced. Interactive preview mode may relax deterministic scheduling only when the manifest states that the result is preview-grade.

Parallel query execution must preserve correctness under branch complexity. Candidate broad-phase tasks can run independently, but final root ledgers, delayed-hit events, branch-transition rows, and rejection reasons must be merged in a stable order. The thread scheduler must not make all-to-all, same-source, field-speed-threshold, or branch-birth/death cases disappear because a work partition used an overly local assumption.

## GPU Acceleration Deferral

Decision: defer GPU acceleration. macOS Metal, browser WebGPU, and any other GPU compute path should stay out of the first central solver core, first app migration, and initial validation gates.

Deferral does not mean ignoring GPU data and work layout. The first solver should be GPU-ready in the parts where that is natural: structure-of-arrays buffers, chunked path streams, independent source-receiver batches, time-slab batches, spatial-block batches, emission-shell batches, explicit work ids, stable merge order, and deterministic reduction options. Those choices help CPU SIMD and multithreading immediately, and they also make later GPU kernels more practical on standard laptop, desktop, and service hardware.

The same design should avoid painting the data model into a single-machine corner. Work should be divisible into transport packets with explicit input ranges, source and receiver blocks, time slabs, spatial blocks, precision path, buffer offsets, expected output layouts, checksum, and merge key. A packet should be usable inside one browser worker, one native task pool, one service process, or a future distributed/GPU backend without changing the app-facing schema.

The first performance focus is CPU-side: C++ data layout, cache locality, SIMD-friendly kernels, bounded multithreading, path-history streaming, indexed readback, and precision-path selection. GPU work should be reconsidered only after the CPU solver contract is stable and benchmark profiles show a regular, massively parallel hotspot that is worth isolating.

Potential future GPU candidates include bulk field/grid sampling, display-oriented geometry projection, path downsampling, broad residual scans, and regular first-pass causal-root bracketing. GPU acceleration is not currently assigned to high-precision paths, arbitrary precision or interval-backed kernels, branch-heavy root isolation, deterministic validation replay, stream/index IO, or small $\lvert J_{ij} \rvert$ edge-case handling.

If GPU acceleration is reopened later, it should enter as an optional acceleration tier behind the same solver API, with CPU parity tests, explicit precision limits, deterministic fallback, and stage-level benchmarks. The native macOS path would be Metal compute; the browser path would be WebGPU only after app deployment constraints and precision behavior are validated. A service-side backend may be selected later only behind the same API and parity rules, so the app contract does not depend on one vendor GPU stack.

## Path-History Streaming And Storage

Long solver runs should not accumulate every path sample in application memory. The storage model should use path-history streams: append-only per-path or per-run streams that keep a short active window in memory while older samples spill to non-volatile storage such as OPFS in the browser or native files in batch runs.

The dense path data should use a high-throughput binary layout rather than dense JSON. JSON remains appropriate for manifests, summaries, and small diagnostic records. The binary stream should be chunked so writers can append quickly, readers can seek directly to a time or frame window, and corrupted or incomplete chunks can be detected.

The storage contract should prefer compact canonical data structures over ad hoc app-specific records. A canonical encoding means one stable representation for each repeated concept: path ids, source and receiver ids, root kinds, role codes, charge signs, status flags, time samples, frame samples, local frames, bounding boxes, shell events, and branch-transition markers. Canonical encodings make hot-path C++ code simpler, make JavaScript typed-buffer reads predictable, and make later compression or export safer because repeated patterns are already normalized.

Compression policy: write the hot stream in an efficient canonical chunk layout first. Do not put heavyweight compression into the solver loop unless benchmarks show that IO savings beat CPU cost and do not damage deterministic replay. After a run is finalized, chunks may be compressed, archived, exported, or re-packed into a smaller sharing format while preserving the original manifest, checksums, schema version, and replay metadata.

Indexing policy: not every useful index has to exist in the hot solver loop. The solver should separate active-window indexing from finalized-history indexing. The active window needs just enough indexing to continue precise action, causal-root, delayed-hit, and geometry modeling over the next simulation window. Once a chunk is no longer needed for active dynamics, it can age out to non-volatile storage. At that point, the system may build deeper offline indices for long-term studies, very large simulations, high-accuracy replay, visualization mining, or research sweeps.

Age-out must be conservative. A history chunk may leave the active window only when the solver can show that active consumers no longer need it for the next window's action, root, delayed-hit, branch-transition, or validation work. The age-out decision should consider declared memory depth, possible causal reach, unresolved roots, tail interfaces, same-source policy, speed-regime transitions, small-Jacobian neighborhoods, app playback requirements, and validation replay requirements. If the solver cannot decide safely, it should keep the chunk active, lower output stride if configured, spill a copy while retaining the needed active summary, or halt with a memory-pressure or unresolved-history diagnostic.

Index tiers:

| Tier | Storage state | Required index depth | Purpose |
| --- | --- | --- | --- |
| Hot active window | In memory plus current spill buffer. | Minimal precise indices for next-window action, root, delayed-hit, branch-transition, and geometry evaluation. | Keep simulation correct and fast while avoiding unnecessary hot-path indexing. |
| Warm finalized chunks | Recently spilled to non-volatile storage and still likely to be read for playback, scrubbing, or near-term diagnostics. | Chunk, time, frame, path id, event, provenance, and selected broad-phase summaries. | Support app readback and near-term analysis without rebuilding every deep index. |
| Cold archival history | Non-volatile storage for long runs, validation, export, or later research. | Optional deep indices built asynchronously or after finalization. | Enable large accurate studies, offline search, compression, replay, and new spatial/causal query experiments. |

Candidate compact encodings to evaluate:

| Encoding | Use when | Notes |
| --- | --- | --- |
| Integer dictionaries | Repeated ids, role names, root kinds, status codes, units, and app/source labels. | Keeps dense rows small and avoids repeated strings in chunk data. |
| Structure-of-arrays columns | Hot path samples, roots, hits, phases, and geometry rows. | Supports SIMD, typed-buffer reads, GPU-ready buffers, and fast column projection. |
| Chunk-local origin plus deltas | Time, frame, path-local coordinates, shell radii, and monotonically increasing indices. | Stores repeated local offsets cheaply while retaining absolute reconstruction through metadata. |
| Bitsets and flag masks | Root status, candidate class, speed regime, event kind, and diagnostic thresholds. | Compact and fast when flags are stable and documented. |
| Run-length or span rows | Long regions with unchanged status, speed regime, source-receiver admissibility, or inactive gaps. | Better as a finalized chunk or index representation unless hot-path updates are cheap. |
| Broad-phase quantized bounds | Approximate spatial blocks, time slabs, bounding spheres, and emission-shell candidate bins. | Mark as broad-phase-only; never replace authoritative root or geometry values. |
| Post-run compression | Archived chunks, exported datasets, or large validation artifacts. | Apply after finalization unless a benchmark proves hot compression is beneficial. |

The reason to collect rich path-history data is not only replay. It is also future acceleration. If the solver already records low-cost positions, velocities, local frames, bounding ranges, emission-shell events, time ranges, and branch-local geometry, later kernels can ask much faster questions: whether one architrino's location or swept path segment can intersect the spherical emission shell from another architrino, which source-receiver pairs can possibly produce a causal root inside a time slab, or which path chunks can be skipped before expensive root isolation begins. The capture rule is therefore: gather inexpensive derived data while the solver is already touching the state, but do not add expensive diagnostic columns unless a current consumer or benchmark justifies them.

This belongs to the family of computational geometry, spatiotemporal indexing, event detection, and broad-phase / narrow-phase query algorithms. Candidate techniques to investigate include bounding-volume hierarchies, space-time slabs, interval trees, spatial hashing, k-d trees, R-trees, sweep-and-prune, time-windowed nearest-neighbor search, and special-purpose light-shell or emission-shell intersection indices.

The index design should not assume that either time or space alone is the right primary key. The solver should support spatial blocks, time blocks, and combined spacetime blocks, then benchmark which layout best rejects impossible candidates before narrow root solving. For example, a time-slab-first index may be best when histories are long and dense, while a spatial-block-first or bounding-volume index may be best when the local geometry is sparse. A combined spacetime-cell index may be best for emission-shell queries where both source emission time and receiver location bounds matter.

The query design must also respect the many-to-many structure of the physics. Each architrino may need candidate checks against every other architrino, and same-source roots may be enabled for some runs. The number of possible source-receiver links grows quickly, so index construction and candidate filtering should be highly parallelizable across source ids, receiver ids, time slabs, spatial blocks, and emitted-shell batches. Parallel broad-phase work may over-generate candidates, but it must not lose true candidates before the narrow-phase root solver has a chance to classify them.

The broad-phase layer must not assume away difficult regimes before they are mathematically excluded. Source histories may cross above or below the field-speed threshold, cross back again, produce temporary self-hit candidates, change root count, enter small-Jacobian regions, or create branch births/deaths. Until a proof, validation fixture, or declared admissibility policy excludes one of those cases, the index should preserve enough metadata to route it to a stricter root, precision, or branch-transition path rather than silently dropping it.

### Chosen Path-History Stream Contract

Decision: expose logical per-path streams, but store them in a run-level chunked binary store rather than creating one operating-system file per path by default. This preserves the per-path API the solver needs while keeping file handles, frame playback, indexing, and app readback under control.

| Artifact | Format | Purpose |
| --- | --- | --- |
| Manifest | JSON | Human-readable run contract: schema version, solver version, app source, precision path, scale normalization, units, stream layout, and compatibility notes. |
| Path chunk store | Binary, little-endian, structure-of-arrays chunks | Dense path samples, authoritative path segments, positions, velocities, phases, branch-local values, and declared optional columns. |
| Assembly graph store | Binary state, membership, hierarchy, and event chunks | Assembly states, membership intervals, parent-child intervals, threshold events, and self-action events keyed by ids and time intervals. |
| Event chunk store | Binary or compact JSON by event volume | Causal roots, delayed hits, halt records, precision escalations, and diagnostic threshold crossings. |
| Encoding dictionary | JSON manifest section plus optional binary table | Canonical ids, enum codes, role maps, root-kind maps, status-code maps, unit codes, and schema constants shared by chunks. |
| Work packet | Small JSON-compatible header plus typed binary payload references | Transport unit for source blocks, receiver blocks, time slabs, spatial blocks, precision path, input buffers, expected output layouts, checksums, and deterministic merge keys. |
| Index sidecar | Binary index plus manifest summary | Path id, frame, time, chunk, event, spatial, emission-shell, and provenance lookup tables for high-speed seeking. |
| Deep index store | Binary index family plus manifest rows | Optional offline indices for cold history, large studies, archived runs, replay, and research queries. |
| Summary | JSON | Small app-readable run summary, aggregate diagnostics, min/max ranges, stream sizes, and validation replay status. |

Chunk layout decision:

- use time-window chunks that may contain one path or a bounded path bundle;
- store columns in structure-of-arrays form inside each chunk for fast projection, range reads, and SIMD-friendly native scans;
- use canonical dictionaries and compact enum codes for repeated ids, roles, root kinds, status flags, units, and event kinds;
- define packet headers so chunks can be assigned to threads, workers, service processes, or future GPU command queues without changing the app-facing schema;
- include chunk headers and trailers with schema id, row count, time bounds, frame bounds, byte length, and fast checksums;
- keep hot-path chunks uncompressed by default, with optional offline compression or export after the run;
- checkpoint indices during long runs and finalize them at completion so interrupted runs can recover committed chunks.

Memory decision: each run must declare a stream memory budget. The initial interactive target should be a bounded active stream window on the order of hundreds of MiB, with a stricter app default and a larger explicit batch budget. When the active window reaches the budget, the writer must spill, apply backpressure, reduce output stride if configured, or halt with a precise memory-pressure diagnostic.

Precision-storage decision: stream column metadata must declare the stored numeric type and the authoritative precision path. App visualization may receive downsampled or projected `f64` buffers, but the stream manifest must identify whether those buffers are authoritative results or app-facing projections from a stricter path.

Each path-history stream should support:

- append-only writes from the solver loop;
- bounded in-memory buffers with explicit backpressure when storage writes fall behind;
- fast spill to non-volatile storage during batch and long interactive runs;
- fast readback for app playback, scrubbing, comparison, export, and diagnostics;
- contiguous range scans by path id and time;
- random access by path id, frame index, time range, or chunk id;
- broad-phase query support for path-vs-emission-shell, path-vs-path, path-vs-time-slab, and candidate causal-root searches;
- active-window age-out decisions with conservative diagnostics when a chunk cannot safely leave hot memory;
- optional offline deep-index construction after chunks reach non-volatile storage;
- optional event streams for causal roots, delayed hits, halts, and diagnostic threshold crossings;
- clear separation between dense sample data and metadata manifests.

Required indices:

| Index | Purpose |
| --- | --- |
| Path id index | Maps architrino, receiver, source, assembly, or app path ids to stream chunks. |
| Assembly membership index | Maps architrino path ids, assembly ids, membership intervals, assembly-state ids, and membership-change events. |
| Assembly hierarchy index | Maps parent assembly ids, child assembly ids, hierarchy intervals, relation types, hierarchy versions, and split/merge events. |
| Time index | Maps time ranges to chunk offsets for range reads and scrubbing. |
| Frame index | Maps solver frame or sample numbers to chunk offsets. |
| Chunk index | Records byte offsets, row counts, time bounds, checksums, and column layout per chunk. |
| Event index | Locates delayed hits, causal roots, halt events, and diagnostic threshold crossings. |
| Spatiotemporal index | Locates path chunks by time slab, spatial block, combined spacetime cell, bounding box, bounding sphere, swept segment bounds, or local-frame bounds for fast broad-phase geometry queries. |
| Emission-shell index | Locates spherical emission-shell events by emitter id, emission time, shell radius or radius range, time slab, and candidate receiver/path bounds. |
| Speed-regime index | Locates path segments by sub-field-speed, near-field-speed, super-field-speed, and threshold-crossing regions when a run requests those diagnostics. |
| Active-window index | Locates only the history needed for the next action, root, delayed-hit, branch-transition, and geometry window. |
| Deep archival index | Optional cold-history index for large simulations, long-term studies, replay, export, spatial mining, and later algorithm experiments. |
| Provenance index | Connects chunks to solver config, precision path, scale normalization, and app adapter. |

Required metadata:

- schema version and stream format version;
- solver engine id, engine version, and API version;
- source app or script, run id, and input config hash;
- model id, equation or force-law version, constants hash, causal speed policy, branch policy, unit convention, and model compatibility flags;
- path id map and path role map;
- assembly id map, assembly-state id map, assembly-membership schema version, assembly-hierarchy schema version, relation type dictionary, hierarchy-depth policy, and membership-change event policy;
- units, coordinate convention, time convention, and scale normalization;
- simulation envelope: entity count, assembly complexity, volume, density, duration, time resolution, interaction policy, output detail, resource budgets, latency target, simplification policy, and admission status;
- selected precision path, stored numeric type, tolerance policy, global error budget, and stage-level error budgets;
- chunk duration, sample stride, column layout, byte order, compression choice if any, and checksum method;
- path-segment interpolation law, coefficient layout when any, endpoint-state convention, local frame convention, and maximum interpolation error;
- history tier, age-out policy, active-window memory depth, archival storage target, and deep-index build status;
- derived-column inventory, query-index version, and whether each derived column is authoritative, approximate, or broad-phase-only;
- speed-regime summaries, field-speed threshold crossings, self-hit candidate flags, and branch-transition candidate flags when cheap to gather;
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
| Memory and streaming control | 14 | Long path histories need bounded memory, non-volatile streaming, and predictable buffer ownership. |
| Implementation quality and reviewability | 12 | The chosen language should support high quality, reviewable, testable, maintainable solver code. |
| Browser/WASM plus native CLI portability | 10 | The same core should support app workers and offline/batch runs. |
| Open-source compiler/toolchain | 8 | The solver should not depend on a proprietary compiler lock-in. |
| Numerical and geometry ecosystem | 8 | Root finding, precision tooling, SIMD, interval methods, and geometry helpers can reduce risk. |
| Existing repo integration cost | 5 | The current app stack is JavaScript-first, so bridge cost matters. |
| Build, test, and profiling tooling | 4 | The solver needs repeatable benchmarks, correctness tests, and performance traces. |
| Maturity and long-term maintainability | 3 | The core should remain maintainable as the project grows. |

| Rank | Language | Speed 20 | Precision 16 | Memory/streaming 14 | Implementation quality 12 | Browser/CLI 10 | Open compiler 8 | Numeric ecosystem 8 | Repo fit 5 | Tooling 4 | Maturity 3 | Weighted total | Decision note |
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
| Implementation quality | Strong. The type system and compiler diagnostics help keep invariants explicit. | Strong when held to the project standard through strict invariants, tests, benchmarks, sanitizers, and small ownership-focused modules. |
| Error handling | Strong. `Result`, typed errors, and exhaustive matching fit solver halt reasons and diagnostics. | Strong if standardized. The project should use explicit status/result types for solver halts, IO failures, precision failures, and branch diagnostics instead of mixed ad hoc conventions. |
| API design clarity | Strong. Rust structs, enums, traits, and modules encourage narrow contracts for solver, stream, index, and metadata boundaries. | Strong if designed up front. C++ interfaces must be narrow, value-oriented, and separated into solver core, stream writer, index reader, metadata, and app-binding layers. |
| Numerical ecosystem | Good and improving, but not as deep as C++ for some precision and interval niches. | Best. Broadest access to established numerical, interval, linear algebra, SIMD, and scientific computing libraries. |
| Build and dependency management | Strong. Cargo is a major advantage for repeatable package, test, and benchmark workflows. | Strong if constrained. Use one explicit Clang/LLVM-centered build path with pinned dependencies, reproducible benchmarks, and CI checks. |
| Open-source compiler posture | Strong. Rust compiler and official projects are open-source, and the backend can use LLVM. | Strong with Clang/LLVM. The compiler stack is open-source and mature. |
| Repo integration cost | Medium. Needs JS/WASM bindings plus a native CLI boundary. | Higher than Rust, but acceptable because precision is decisive. Binding code must stay thin, typed, and tested against golden datasets. |
| Long-term maintainability | Strong. Safer refactors and explicit invariants should help the solver stay coherent as the API grows. | Strong when the architecture forbids broad mutable ownership, hidden globals, ad hoc buffers, and mixed error styles. |
| Main risk | Useful comparison points should not be mistaken for an alternate build plan. | The main risk is unmanaged implementation surface area. Control it through small modules, strict ownership policy, sanitizer/fuzz gates, and benchmark-driven acceptance. |
| Best use in this repo | Decision-audit reference only, especially for checking whether C++ bridge, streaming, and ownership plans remain disciplined. | Selected production solver core, precision kernels, path-history stream/index implementation, WASM bridge, and native batch runner. |

Decision posture:

1. Use C++ with Clang/LLVM as the selected production-core language because precision capabilities are the deciding requirement.
2. Do not plan a Rust fallback. If C++ fails build reproducibility, browser binding, memory-control, or maintainability gates, fix the C++ design, toolchain, or implementation boundary rather than switching languages.

The decision should be benchmark-driven. Minimal benchmark targets should include causal-root throughput, branch count scaling, memory use for source histories, path-stream write throughput, path-stream read throughput, index seek latency, worker transfer cost, app-frame latency, thread-scaling efficiency, deterministic-reduction overhead, residual stability, branch-weight stability near small $\lvert J_{ij} \rvert$, precision-path selection correctness, and accuracy across orbital-speed and assembly-speed scale sweeps spanning many orders of magnitude under Photon, Ideal Swarm, and Animator-like workloads.

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

### Toolchain Setup Decision

Decision: keep the first solver implementation on the C++20, Clang/LLVM, CMake, Ninja, and WebAssembly-worker path. The setup issue is missing local tooling, not a language-decision reopening.

Required setup outcomes:

| Setup outcome | Requirement |
| --- | --- |
| Tool discovery | A build script or documented command must find `clang++`, `cmake`, `ninja`, and the selected WebAssembly compiler path before building. |
| Version recording | Native and browser builds must record compiler, CMake, Ninja, WebAssembly toolchain, solver git revision, and build flags in the run manifest. |
| Pinned browser toolchain | The browser build should use Emscripten or another explicit open-source LLVM WebAssembly toolchain, with the selected version recorded. |
| No hidden fallback | If the WebAssembly toolchain is missing, the browser build fails with a clear setup error rather than silently producing a native-only result. |
| Native-first smoke | A native smoke target may precede the browser worker target, but the solver contract is not complete until the WebAssembly worker smoke passes. |

### Packaging And Build Artifact Policy

Compiled object files are intermediate build artifacts. They should not be packaged for apps or checked into source control.

| Artifact class | Package decision |
| --- | --- |
| Browser app runtime | Package `solver.wasm`, `solver-worker.js`, shared JavaScript adapter, TypeScript declarations, schema files, and an artifact manifest. |
| Native batch runtime | Package the final native CLI binary, schema files, benchmark fixtures needed for smoke tests, and an artifact manifest. |
| Debug artifacts | Keep source maps, debug symbols, traces, and benchmark profiles separate from the app runtime package unless a debug package is explicitly requested. |
| Intermediate build files | Do not package `.o`, `.obj`, `.bc`, temporary `.wasm.o`, CMake scratch files, Ninja scratch files, or linker temporary files. |
| Developer SDK | Package headers and a static or shared library only if a future native developer SDK is explicitly created. Do not package loose `.o` files. |
| Stream/runtime data | Package no generated path-history chunks by default. Test fixtures may include small checked fixture files only when they are intentionally part of validation. |

Every packaged solver build should include a small manifest with solver version, API version, binary schema version, build target, compiler/toolchain versions, enabled precision paths, threading support, storage support, and checksums for packaged artifacts.

Current implementation note: the app-runtime package manifest records artifact checksums, API versions, schema versions, toolchain versions, build-host runtime capability probes, enabled precision paths, output layouts, threading support, storage support, numeric types, status taxonomy summary, and the no-intermediate-artifact policy. Run validation artifacts also hash schema-version, status-taxonomy, and binary-layout surfaces for replay and migration review.

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

Decision: the minimal central solver contract should be accepted only after it passes schema, precision, streaming, threading, app-bridge, isolated baseline-comparison, and migration-parity tests. The first implementation should prioritize the causal-root and delayed-hit core because that is the shared behavior behind Photon, Ideal Swarm, and Animator.

Acceptance gates:

| Gate | Required evidence |
| --- | --- |
| Schema contract | Versioned configs, responses, stream manifests, binary chunks, indices, diagnostics, and error records. |
| Simulation envelope contract | Admission tests for entity count, volume, duration, time resolution, interaction density, branch complexity, output detail, memory budget, storage budget, latency target, simplification policy, and `simulation_envelope_exceeded` halts. |
| Virtual-observer path record contract | Segment-level tests proving that the minimal kinematic record reconstructs path geometry within its error bound, while dynamic replay and potential audit data remain separate optional layers. |
| Temporal assembly graph contract | Assembly-state, membership, hierarchy, event, threshold, and self-action records can reconstruct declared nested assemblies at selected times without duplicating assembly state into every path row. |
| Precision contract | Scale sweeps over orbital speed, assembly speed, geometry scale, residual scale, and small $\lvert J_{ij} \rvert$ cases. |
| Stream contract | Round-trip write/read tests, bounded-memory tests, interrupted-run recovery, index seek tests, and checksum failure tests. |
| Ledger and provenance contract | Root-ledger completeness tests, phase-at-hit metadata tests, failure-code coverage, artifact hash checks, and validation replay provenance. |
| Analytic and invariant validation | Manufactured causal-root cases, closed-form geometry cases, root-count invariants, residual monotonicity checks, conservation or bounded-drift checks where the model provides them, and stream replay invariants. |
| Threading contract | Single-thread baseline, multithread speedup cases, deterministic replay cases, and browser capability fallback tests. |
| App bridge contract | Worker initialization, cancellation, typed-buffer transfer, stream-range readback, error normalization, and unsupported-feature reporting. |
| Baseline-comparison sandbox | Isolated baseline harnesses for Photon, Ideal Swarm, and Animator preserve fixed input cases, baseline artifacts, new solver artifacts, tolerance rules, sandbox isolation rules, and divergence classifications. Large divergences must be investigated before app-local solver code is simplified. |
| Migration parity | Animator first, then Photon, then Ideal Swarm, each with focused parity fixtures before app-local solver code is simplified. |

The first central core should expose source histories, branch-resolved causal roots, delayed-hit records, $\lvert J_{ij} \rvert^{-1}$ branch weighting where required, diagnostics, and stream-backed output. Full motion integration can grow after the root, event, precision, stream, and app-bridge contracts are stable.

Baseline harnesses are comparison tools, not trusted oracles. Each harness must run without network access, inside a controlled working directory, with fixed seeds, resource caps, artifact-only output, and no writes back into app source paths. A baseline comparison can approve migration only when analytic fixtures, invariant checks, and tolerance rules also support the result.

### Initial Validation Fixtures

Before app migration, build these focused fixtures and keep each one small enough to run in local CI:

| Fixture | Source baseline | Solver output under test | Acceptance signal |
| --- | --- | --- | --- |
| `analytic_causal_root_cases` | Manufactured source/receiver histories with closed-form or high-precision reference roots. | `root_ledger.v1`, residuals, branch labels, precision diagnostics. | Roots, residuals, and branch counts match the analytic or high-precision reference before baseline parity is considered. |
| `stream_replay_invariants` | Synthetic path and root streams with known invariants. | `path_segment.v1`, `path_chunk.v1`, `stream_index.v1`, replay diagnostics. | Stream write/read/projection preserves declared path error bounds, root counts, time ordering, and checksum identity. |
| `baseline_comparison_sandbox_smoke` | Fixed Photon, Ideal Swarm, and Animator baseline cases in isolated harnesses. | Baseline artifact, new solver artifact, tolerance file, divergence report, provenance record. | Differences are classified as `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, or `baseline_investigation_required_mismatch`; `baseline_investigation_required_mismatch` blocks migration simplification. |
| `animator_assembly_dynamics_smoke` | Assembly-dynamics-backed Animator dataset path. | `frame_buffer.v1`, `delayed_hit_events.v1`, `root_ledger.v1`, summary diagnostics. | Existing Animator playback can render the dataset, root/hit counts match the baseline, and frame positions stay inside the declared tolerance. |
| `photon_causal_roots_static_observer` | Photon-local `solvePhotonCausalRoots` diagnostic case. | `root_ledger.v1`, `phase_at_hit.v1`, rejected-root diagnostics, transverse-field summary. | Positive roots, no-root reasons, Jacobian diagnostics, and field summaries match the baseline within declared residual tolerances. |
| `ideal_swarm_flight_time` | Ideal Swarm `solveFlightTime` case. | Root list, delay values, residuals, and status records. | Flight times and root residuals match the app-local baseline, including failure behavior for no-root cases. |
| `ideal_swarm_circular_self_hit_span` | Ideal Swarm `solveCircularSelfHitSpan` case. | Self-hit span geometry and root diagnostics. | Span endpoints, delay windows, and root status match the app-local baseline within declared geometry tolerance. |
| `path_stream_round_trip` | Synthetic multi-path run with deterministic samples. | `path_chunk.v1`, `stream_index.v1`, manifest, checksums. | Write/read round trip is byte-stable where expected, index seeks return the requested time/frame ranges, and checksum faults are detected. |
| `virtual_observer_minimal_path_record` | Synthetic path segments with known interpolation and error bounds. | `path_segment.v1`, manifest metadata, optional dynamic replay references, and optional potential audit references. | The kinematic record reconstructs the path within declared error, dynamic replay can be attached without changing the path definition, and potential audit rows can be omitted from playback-only datasets. |
| `assembly_membership_change_trigger` | Synthetic architrino paths that enter, leave, and change roles inside declared assemblies. | `assembly_membership.v1`, path segments, assembly-state references, membership indices, and manifest metadata. | Membership changes emit deterministic events, path rows keep compact references rather than duplicated assembly state, and assembly-aware replay joins records without changing kinematic path fidelity. |
| `temporal_assembly_hierarchy_replay` | Synthetic nested assemblies with stable intervals, subassembly changes, split/merge events, and field-speed threshold events. | `assembly_state.v1`, `assembly_membership.v1`, `assembly_hierarchy.v1`, `assembly_events.v1`, hierarchy indices, and path joins. | Queries reconstruct assembly membership and hierarchy at selected times, stable intervals remain compact, changes produce deterministic events, and replay fidelity is unchanged by adding hierarchy indices. |
| `history_age_out_and_deep_index` | Synthetic run with chunks that become safe, unsafe, and conditionally safe to age out. | Active-window index, age-out decisions, warm/cold storage metadata, deep-index status, and diagnostics. | Safe chunks age out to non-volatile storage, unsafe chunks remain active or halt with diagnostics, and cold chunks can build optional deep indices without changing authoritative replay. |
| `work_packet_round_trip` | Synthetic all-to-all work split into source blocks, receiver blocks, time slabs, and spatial blocks. | Work packet headers, binary payload references, checksums, output layout declarations, and merge keys. | Packets serialize, deserialize, dispatch, and merge deterministically across single-thread, multithread, worker, and service-simulated execution modes. |
| `emission_shell_broad_phase_query` | Synthetic emitter/receiver paths with known shell intersection and non-intersection cases. | Spatiotemporal index rows, emission-shell index rows, candidate pair lists, and final narrow-phase roots. | Broad-phase query finds every true path-vs-emission-shell candidate, rejects cheap non-candidates, and records false-positive rate for benchmark comparison. |
| `all_pairs_speed_regime_transition_query` | Synthetic all-to-all and same-source paths that cross below, near, and above field speed. | Spatiotemporal index rows, speed-regime summaries, candidate pair lists, branch-transition flags, and final root ledger. | Parallel broad-phase work preserves every true candidate through speed-regime transitions and produces deterministic merged ledgers. |
| `precision_scale_sweep` | Synthetic source/receiver histories spanning ordinary and many-orders-of-magnitude speed/geometry scales. | Precision-path selection, root residuals, escalation records, halt records. | `auto` selects the expected path, escalates only toward stricter paths, and halts rather than silently weakening claim level. |
| `simulation_envelope_admission` | Synthetic runs that vary entity count, spatial volume, density, duration, time resolution, interaction policy, output detail, and budgets. | Envelope classification, resource-pressure estimates, simplification options, accepted execution mode, and halt records. | Runs inside the supported envelope are admitted, reducible runs require explicit simplification, and unsupported runs halt with `simulation_envelope_exceeded`. |
| `threading_determinism` | Independent root batches with stable input ordering. | Single-thread and multithread root ledgers. | Deterministic mode produces identical ordered ledgers and reductions; preview mode records any relaxed scheduling. |
| `app_bridge_worker_smoke` | Minimal shared-worker request from a browser app harness. | `init`, `capabilities`, `runSimulation`, `cancelRun`, `openStream`, `readStreamRange`, `dispose`. | The app uses only the shared adapter, receives normalized status records, and transfers dense buffers without app-specific WebAssembly handling. |

## Settled Decisions

The following decisions define the current design contract:

| Area | Settled decision |
| --- | --- |
| Scope | Central solver focuses on architrino motion, causal roots, delayed hits, path histories, and solver-owned geometry. General solver-like helpers stay out of scope. |
| Migration targets | Photon, Ideal Swarm, and Animator are migration targets. `sim2` is animation-intent archive only; legacy solver families are reference, archive, validation, or separate-maintenance surfaces. |
| Language | C++20 with Clang/LLVM is the production-core path. Rust is comparison-only, not a fallback. |
| Model contract | Every run declares model id, equation or force-law version, constants, causal speed policy, branch policy, unit convention, and precision compatibility. |
| Simulation envelope | Every run declares the dimensions that stress the solver. The solver must admit, simplify, batch, escalate, or reject based on the declared envelope and must preserve the envelope in the manifest. |
| Virtual observer | The virtual observer is solver instrumentation. Its minimal path record is segment-level kinematic data with interpolation and error bounds; dynamic replay and potential audit data are normalized extra layers. |
| Temporal assembly graph | Assembly state, membership, hierarchy, threshold events, and self-action events live in normalized graph streams keyed by ids and time intervals, with explicit identity lifecycle, split/merge, ambiguity, and versioning rules. |
| App communication | Apps call one shared JavaScript or TypeScript adapter backed by a WebAssembly worker. Apps do not handle C++ or WebAssembly directly. |
| Status taxonomy | Apps discover canonical solver status codes through the bridge, including category, default severity, recoverability default, stage hints, and description. |
| Data movement | Metadata uses structured records; dense path, frame, root, hit, phase, geometry, and index outputs use typed buffers or stream handles. Inexpensive derived geometry should be captured when it can feed future fast queries. |
| Work packets | Solver work should be divisible into transport-ready packets with explicit ranges, buffer references, checksums, expected outputs, and deterministic merge keys. The same packet layout should serve workers, threads, services, and future GPU backends. |
| Canonical encodings | Hot-path data structures use compact canonical encodings, dictionaries, structure-of-arrays columns, flags, span rows, and chunk-local deltas where they simplify implementation and reduce storage. Heavy compression is post-run/export by default. |
| Numeric serialization | Every numeric type has explicit byte order, scale, exponent or limb layout, interval convention, rounding mode, comparison semantics, and export representation. |
| Storage | Logical per-path streams are backed by a run-level chunked binary store, manifest, event store, encoding dictionary, binary index sidecar, deep-index store, and summary record. Browser and native storage define retention, cleanup, quota pressure, failed-run cleanup, export, and deletion behavior. |
| History tiers | Hot active history keeps just enough indices for the next precise action/root window. Warm and cold history can live on non-volatile storage and receive deeper offline indices later. |
| Query acceleration | Path-history design should support future computational-geometry and spatiotemporal-index algorithms for space blocks, time blocks, combined spacetime blocks, path-vs-emission-shell, path-vs-path, speed-regime transition, same-source, all-to-all, and candidate causal-root searches. |
| Precision | The default is `auto` with strict upward-only escalation, explicit precision paths, stage-level error budgets, visible propagation of error bounds, and no silent claim-level downgrade. |
| Parallelism | Multithreading is an optimization policy with deterministic mode, single-thread fallback, explicit diagnostics, and browser capability gating. Work units and data layouts should be GPU-ready where practical. |
| GPU | GPU execution is deferred and is not part of the first central solver core or first app migration, but the design should preserve a future optional path to standard laptop, desktop, browser, and service GPU hardware behind the same solver API. |
| Baseline comparison | Current app-facing solver paths run only inside isolated comparison harnesses. Divergences are classified before migration as `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, or `baseline_investigation_required_mismatch`. |
| Analytic validation | Analytic fixtures, manufactured solutions, and invariant checks are required in addition to existing-baseline comparisons. |
| Packaging | Apps package final runtime artifacts such as `solver.wasm`, worker, adapter, declarations, schemas, and manifests; `.o` and other intermediate build files are not packaged. |

Implementation order:

1. Define the model contract, simulation envelope contract, and admission fixture.
2. Define the precision/error-budget propagation contract.
3. Define the virtual-observer minimal path record contract and fixture.
4. Define the temporal assembly graph identity lifecycle, hierarchy replay, and ambiguity contract.
5. Implement schema validation for requests, responses, manifests, binary layouts, statuses, and stream indices.
6. Define the numeric serialization rules for every declared numeric type.
7. Define storage retention, cleanup, quota pressure, failed-run cleanup, export, deletion, active-window age-out, and deep-index policy.
8. Define the work-packet transport contract and round-trip fixture.
9. Prototype and benchmark spatiotemporal query algorithms against the emission-shell broad-phase fixture.
10. Define the baseline-comparison sandbox and divergence classification report.
11. Build the analytic, manufactured, invariant, and baseline fixtures listed above.
12. Implement the minimal causal-root and delayed-hit core behind the shared app bridge.
13. Run migration parity in order: Animator, Photon, then Ideal Swarm.

## Migration Plan Needed

After the first solver design lands, create a migration plan for Photon, Ideal Swarm, and Animator with these steps. `sim2` and legacy solver families are excluded from migration. `sim2` may be archived or mined for animation intent only; legacy families may be documented only where that clarifies the new solver boundary.

1. Inventory Photon, Ideal Swarm, Animator, and the assembly-dynamics path for current uses of architrino motion, causal roots, delayed hits, or solver-adjacent geometry.
2. Define the central solver contract, model contract, simulation-envelope contract, precision-path contract, error-budget propagation contract, and minimum stable dataset schema.
3. Adopt simulation-envelope admission so each app request declares model version, scale, duration, interaction policy, precision claim, output detail, memory budget, storage budget, latency target, and simplification policy before execution.
4. Adopt the virtual-observer path record and temporal assembly graph so architrino paths, assembly states, memberships, hierarchy intervals, threshold events, self-action events, identity lifecycle events, split/merge events, and ambiguous membership states are normalized and joined by id and time interval.
5. Adopt the logical per-path stream API backed by a run-level chunked binary store, JSON manifest, encoding dictionary, numeric serialization rules, work packets, binary index sidecar, event store, storage lifecycle policy, active-window age-out policy, deep-index store, and summary record.
6. Adopt the shared JavaScript adapter with TypeScript declarations, backed by a WebAssembly worker that owns C++ solver lifecycle, typed-buffer transfer, stream handles, cancellation, diagnostics, and normalized errors.
7. Adopt the threading policy: native bounded task pool, browser worker baseline, WebAssembly internal threads only when capability and determinism requirements allow, and deterministic mode for parity or exported runs.
8. Defer GPU acceleration; do not include Metal, WebGPU, or other GPU compute paths in the first solver core or first app migration.
9. Build a minimal benchmarked C++/Clang solver core and compare it against Photon, Ideal Swarm, and Animator paths across ordinary and many-orders-of-magnitude orbital-speed and assembly-speed scale sweeps.
10. Verify that requested simulation envelopes are admitted, simplified, batched, escalated, or rejected with explicit diagnostics.
11. Verify that long path runs stay inside the declared memory budget while spilling and reading path streams at target speed.
12. Verify that multithreading improves the selected workloads enough to justify the complexity, and keep a correct single-thread execution path where threading is unavailable or not worth using.
13. Verify that apps can use the solver through the shared bridge without app-specific C++ or WebAssembly handling.
14. Run analytic fixtures, manufactured solutions, and invariant checks before treating existing-baseline comparisons as migration evidence.
15. Run the baseline-comparison sandbox against fixed Photon, Ideal Swarm, and Animator cases, and classify each difference as `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, or `baseline_investigation_required_mismatch`.
16. Investigate all `baseline_investigation_required_mismatch` cases before simplifying app-local solver code.
17. Migrate Animator first where the dataset bridge already exists.
18. Migrate Photon causal-root diagnostics to the shared causal-root and source-history APIs.
19. Migrate Ideal Swarm delayed-potential and self-hit calculations to shared geometry and causal-delay routines.
20. Archive or keep `sim2` as an animation-intent prototype only; do not build a central-solver adapter for it and do not use it as a parity target.
21. Document the legacy solver-family boundary: proof-program, mass-map, neutral-swarm, nested-shell, cosmology, and related families are not migration targets.
22. Remove or simplify app-local solver and geometry code after parity tests confirm the new solver path.
23. Keep any future contact with proof-program, mass-map, neutral-swarm, nested-shell, and cosmology solver families limited to artifacts, diagnostics, or independently maintained contracts unless a later priority explicitly changes scope.

## Task Queue

1. `model_contract` - Define model id, equation or force-law version, constants hash, causal speed policy, branch policy, unit convention, and precision compatibility. Status: `active`. Depends on: none.
2. `precision_dynamic_range_contract` - Convert the chosen `auto` precision-path selector, strict escalation rule, validation replay rule, stage-level error budgets, and error propagation metadata into the first implementation contract. Status: `active`. Depends on: `model_contract`.
3. `simulation_envelope_contract` - Define the run-admission envelope for entity count, assembly complexity, physical volume, density, simulated duration, time resolution, speed regimes, interaction graph density, branch/root density, geometry complexity, precision claim, output detail, memory budget, storage budget, latency target, backend, and simplification policy. Status: `active`. Depends on: `model_contract`, `precision_dynamic_range_contract`.
4. `virtual_observer_path_record_contract` - Define the minimal segment-level path record, interpolation policy, error-bound metadata, normalized assembly-membership references, membership-change events, dynamic replay attachment, and potential audit attachment. Status: `active`. Depends on: `precision_dynamic_range_contract`, `simulation_envelope_contract`.
5. `temporal_assembly_graph_contract` - Define assembly-state history, membership intervals, parent-child hierarchy intervals, assembly events, split/merge events, ambiguous membership records, threshold/self-action events, stable ids, graph indices, and hierarchy replay rules. Status: `active`. Depends on: `virtual_observer_path_record_contract`.
6. `numeric_serialization_contract` - Define byte order, signedness, scale factors, exponent layout, limb order, interval endpoint convention, rounding mode, comparison semantics, and text export representation for every numeric type. Status: `active`. Depends on: `precision_dynamic_range_contract`.
7. `path_history_stream_contract` - Convert the chosen logical per-path stream API backed by a run-level chunked binary store, JSON manifest, encoding dictionary, event store, binary index sidecar, summary record, memory budget, canonical compact encodings, post-run compression/export policy, active-window age-out, optional deep-index store, fast spill, and high-speed readback into a versioned schema. Status: `active`. Depends on: `precision_dynamic_range_contract`, `simulation_envelope_contract`, `virtual_observer_path_record_contract`, `temporal_assembly_graph_contract`, `numeric_serialization_contract`.
8. `storage_lifecycle_policy` - Define browser/native retention, cleanup, quota pressure, failed-run cleanup, export handoff, user-visible deletion, active-window age-out, warm/cold history, optional offline deep indices, and diagnostics when a chunk cannot safely leave active memory. Status: `active`. Depends on: `path_history_stream_contract`.
9. `work_packet_transport_contract` - Define transport-ready packet headers, binary payload references, checksums, output layout declarations, range ownership, and deterministic merge keys so solver work can move across workers, threads, processes, future services, and future GPU backends without a second data model. Status: `active`. Depends on: `path_history_stream_contract`, `simulation_envelope_contract`.
10. `spatiotemporal_query_algorithm_survey` - Prototype and benchmark broad-phase / narrow-phase query approaches for space blocks, time blocks, combined spacetime blocks, path-vs-emission-shell, path-vs-path, all-to-all, same-source, speed-regime transition, and candidate causal-root searches. Candidate families include bounding-volume hierarchies, interval trees, spatial hashing, k-d trees, R-trees, sweep-and-prune, and special-purpose emission-shell indices. Status: `active`. Depends on: `path_history_stream_contract`, `work_packet_transport_contract`, `storage_lifecycle_policy`, `simulation_envelope_contract`.
11. `app_bridge_contract` - Convert the chosen shared JavaScript adapter with TypeScript declarations and WebAssembly worker into a typed request/response, cancellation, stream-handle, diagnostics, normalized-error, model-contract, and error-budget contract. Status: `active`. Depends on: `precision_dynamic_range_contract`, `path_history_stream_contract`, `simulation_envelope_contract`.
12. `threading_execution_policy` - Implement the chosen native bounded task pool, browser worker baseline, deterministic mode, WebAssembly-thread gating, thread-count controls, diagnostics, and GPU-ready work partitioning where it also benefits CPU execution. Status: `active-first-plan-diagnostics`. Depends on: `app_bridge_contract`, `work_packet_transport_contract`.
13. `cpp_clang_runtime_validation` - Build and benchmark the selected C++20/Clang path against representative causal-root, source-history, precision, dynamic-range, simulation-envelope, virtual-observer path-record, temporal-assembly-graph, streaming-write, indexed-read, app-bridge, and thread-scaling workloads. Status: `active-toolchain-setup-needed`. Depends on: `threading_execution_policy`.
14. `solver_contract` - Implement the central solver inputs, outputs, dataset schema, model schema, simulation-envelope schema, virtual-observer path-record schema, assembly-state schema, assembly-membership schema, assembly-hierarchy schema, path-history stream schema, numeric serialization schema, app bridge schema, threading metadata, diagnostics, halt statuses, precision-path metadata, storage metadata, API boundaries, root-ledger completeness rows, phase-at-hit metadata, failure-code taxonomy, and provenance artifacts. Status: `active`. Depends on: `cpp_clang_runtime_validation`.
15. `analytic_and_invariant_validation` - Define manufactured causal-root cases, closed-form geometry cases, root-count invariants, residual checks, conservation or bounded-drift checks where the model provides them, and stream replay invariants. Status: `active`. Depends on: `solver_contract`.
16. `baseline_comparison_sandbox` - Define isolated baseline harnesses for Photon, Ideal Swarm, and Animator, fixed input cases, resource caps, no-network execution, fixed seeds, controlled working directories, artifact-only output, tolerance files, provenance records, and divergence reports. Status: `active`. Depends on: `app_bridge_contract`, `solver_contract`, `analytic_and_invariant_validation`.
17. `gpu_acceleration_deferral` - Keep Metal, WebGPU, service GPU, and other GPU compute paths out of the first solver core and migration plan; preserve GPU-ready data layout and work partitioning, then reconsider GPU execution only after CPU benchmarks identify a suitable regular hotspot. Status: `pending`. Depends on: `cpp_clang_runtime_validation`.
18. `geometry_centralization_inventory` - Identify duplicated or app-local solver geometry in Photon, Ideal Swarm, Animator, and the assembly-dynamics path. Exclude `sim2` and legacy solver families from migration scope. Status: `next`. Depends on: `solver_contract`.
19. `minimal_causal_root_core` - Implement or extract the first central causal-root core with source histories, branch diagnostics, precision diagnostics, simulation-envelope diagnostics, virtual-observer path-record output, temporal-assembly-graph output, streaming output, app-bridge output, threading diagnostics, and benchmark hooks. Status: `next`. Depends on: `solver_contract`.
20. `animator_adapter` - Route Animator simulation runs through the central solver contract while preserving the existing dataset playback surface. Status: `pending`. Depends on: `minimal_causal_root_core`, `baseline_comparison_sandbox`.
21. `photon_adapter` - Replace Photon-local causal-root diagnostics with shared source-history and causal-root calls. Status: `pending`. Depends on: `minimal_causal_root_core`, `baseline_comparison_sandbox`.
22. `ideal_swarm_adapter` - Replace Ideal Swarm delayed-potential and self-hit calculations with shared solver geometry. Status: `pending`. Depends on: `minimal_causal_root_core`, `baseline_comparison_sandbox`.
23. `sim2_reference_archive_plan` - Document `sim2` as an animation-intent archive surface only, with no central-solver adapter, no migration path, and no solver parity obligation. Status: `pending`. Depends on: `solver_contract`.
24. `legacy_solver_boundary` - Document that non-app legacy solver families stay outside central-solver migration and may only exchange artifacts, diagnostics, or independently maintained contracts. Status: `pending`. Depends on: `solver_contract`.

## Related Priorities

- [animator-merge](../animator-merge/animator-merge.md)
- [simulations](../simulations/simulations.md)
- [photon-app](../photon-app/photon-app.md)
