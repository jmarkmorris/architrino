# Architrino Solver

This directory is the first C++/WebAssembly scaffold for the central architrino motion and geometry solver.

The first implementation target is a minimal causal-root and delayed-hit core behind a shared app bridge. The current files establish the toolchain, package boundary, native smoke targets, WebAssembly smoke target, app-facing TypeScript contract, first app-facing request adapters, shared geometry helpers, first shared-geometry ABI, first precision diagnostics, first precision-path execution wrapper, first error-budget propagation contract, first deterministic batch solver, first central native parallel execution policy, first motion-frame sampler, first work-packet contract, first temporal assembly graph rows, dataset packaging, durable app store, and native store, first detailed root-ledger rows, first root-transition classifier, first invariant checks, first Photon phase-diagnostics run path, first path-history run path, and first native path-history stream.

## Toolchain

Run the preflight before building:

```bash
node scripts/solver-toolchain-preflight.mjs
```

`EM_CACHE` defaults to `.tmp/solver-emcache` when it is not set. That avoids Emscripten writing into the Homebrew cellar and keeps the cache out of source control through the existing `.tmp/` ignore rule.

To override it for a shell session:

```bash
export EM_CACHE=/private/tmp/architrino-emcache
```

## Smoke Builds

Build and run the native smoke target, and build the WebAssembly smoke target:

```bash
node scripts/build-solver-smoke.mjs all
```

Native and WebAssembly build outputs live under `.tmp/solver-build/`.
The WebAssembly smoke path also writes `.tmp/solver-build/solver-package-manifest.json`.
That manifest lists the app-runtime artifacts, byte sizes, SHA-256 checksums,
API versions, build metadata, and packaging policy. It intentionally excludes
object files, static libraries, CMake scratch files, and Ninja scratch files.

The smoke command verifies:

- C++20 native build through Clang/LLVM and Ninja;
- Boost.Multiprecision availability;
- app-runtime package manifest creation and check for the WebAssembly loader,
  WebAssembly binary, app bridge modules, worker bridge module, worker runtime
  module, adapters, declarations, schema, checksums, transitive app-module
  imports, and no-intermediate-artifact policy;
- model-contract, error-budget, simulation-envelope, admission validation, and native admission stress summaries;
- app bridge admission preflight for admit, batch, precision-escalation, and reject decisions with stress diagnostics;
- app-facing run manifests with model, envelope, error-budget, precision, output, admission, provenance, buffer, stream, diagnostic, and status metadata;
- native stage-level error-budget propagation for root isolation, delayed hits, motion integration, stream encoding, stream readback, projection, and app buffers, with authoritative, approximate, display-only, and rejected value authority;
- first app-facing `runSimulation` paths for completed causal-root, phase-diagnostics, path-history, delayed-hit, shared-geometry, validation-replay, app-playback, sampled motion-frame, and constant-acceleration motion-integration datasets;
- first app-facing request adapters for Photon causal-root and phase-diagnostics runs, path-history runs, Ideal Swarm delayed-hit and shared-geometry runs, Animator motion runs, Animator playback runs, generic shared-geometry runs, validation-replay runs, path-history stream/readback requests, storage-lifecycle requests, path-history work-packet plans, and emission-shell query/packet/merge requests;
- first app-facing worker protocol, schema, and client wrapper for routing bridge requests, dense buffers, stream handles, cancellation, disposal, and normalized errors through request/response messages;
- app-bridge capability reporting for app adapters, dense buffer/stream transport, worker fallback posture, and browser storage fallback status;
- first app-facing threading-plan diagnostics for sequential execution and recoverable threaded fallback reporting;
- first app-facing run-description readback for completed run manifests, summaries, buffer metadata, stream metadata, and diagnostics without dense buffer payloads;
- first app-facing path-history stream creation with chunked `path_segment.v1` buffers, stream metadata, caller-buffer or native-file storage, binary native-file index sidecars, range readback, and memory-pressure rejection;
- row-level app bridge filtering for `path_segment.v1` stream reads by path key, time range, and frame range inside larger chunks;
- first app-facing stream-index description with path-history path key, chunk, row, time, frame, byte-range metadata, and native-file sidecar descriptors without dense payload reads;
- app-facing path-history stream metadata for precision path, units, coordinate frame, scale normalization, interpolation rule, provenance, diagnostics, and per-chunk checksums;
- first app-facing broad-phase emission-shell candidate query over path-history streams, with rejection rates, candidate rates, sampled false-positive estimates, and batched fixed-hit exact causal-root refinement for sampled-hit candidates;
- first app-facing stream-backed space-time index build path that reads registered path-history streams directly and emits `spacetime_index.v1` rows without requiring app code to materialize every path row first;
- first app-facing motion-frame sampling and constant-acceleration integration paths with `frame_buffer.v1` binary output;
- phase-at-hit diagnostics with `phase_at_hit.v1` binary output;
- shared geometry helpers and app bridge calls for vector math, path bounds, bounds overlap, and spherical emission point checks;
- assembly graph dataset packaging and durable native-file app storage with `assembly_state.v1`, `assembly_membership.v1`, `assembly_hierarchy.v1`, and `assembly_events.v1` binary output;
- assembly membership-change event detection with `assembly_events.v1` binary output;
- precision diagnostics through C++ and C ABI paths that classify ordinary and high-dynamic-range causal-root requests, including `f64` geometry and time resolution warnings for requests that need normalized coordinates or stricter input representation;
- native precision-path execution that selects or escalates root-solver controls, rejects disallowed weakening, and runs validation replay when requested;
- high-offset causal-root solving with returned distance, residual, Jacobian, and branch weight computed from the high-precision root evaluation state;
- deterministic causal-root solving over linear source and receiver path segments;
- native invariant checks for finite root and delayed-hit rows, time ordering, delay and distance consistency, residual tolerance, inverse-Jacobian branch weights, and unit-direction normalization;
- native and app-facing root-ledger transition classification for retained, appeared, disappeared, folded, assimilated-from-tail, and ledger-rerun-required root states;
- detailed root-ledger rows for active roots, inactive search gaps, and first-failure status without changing the app-facing `root_ledger.v1` ABI;
- delayed-hit event projection from retained causal roots;
- deterministic batch causal-root solving through C++ and C ABI paths, with native CPU worker fan-out through the central parallel execution policy and a WebAssembly sequential fallback;
- central parallel execution planning for native worker counts, minimum work-per-worker thresholds, and deterministic indexed result writes;
- native binary path-history stream append/read behavior with path chunks, chunk index, path/time index queries, checksummed chunk sidecar, and metadata manifest;
- native space-time index construction and query behavior for path-history segments and assembly-state intervals, with durable fixed-row sidecar write/read and overflow handling;
- native work-packet header validation, canonical serialization, checksum, and deterministic merge ordering;
- native numeric serialization descriptors for every declared solver numeric type;
- native path-history storage lifecycle decisions for active-window retention, warm spill, cold archive, delete, and deep-index preparation;
- native temporal assembly graph rows for assembly state, path membership, assembly hierarchy, and membership-change events;
- native temporal assembly graph store write/read behavior with fixed binary datasets, fixed-row index sidecar, query helpers, and metadata manifest;
- the first fixed-layout `f64` causal-root C ABI;
- WebAssembly module loading, exported smoke calls, and bridge-level causal-root readback.
- transient stream descriptors for the first root and delayed-hit buffers;
- app bridge stream open, durable native-file manifest and index-sidecar reopen, range readback, byte-range selection, max-byte pressure reporting, and stream release.
- baseline response comparison with migration status classifications.
- isolated baseline sandbox artifacts for Animator, Photon causal-root, Photon phase-diagnostics, Animator path-history, and Ideal Swarm smoke cases.
- manufactured analytic causal-root validation for a moving-source delayed-hit case with known root, Jacobian, branch weight, and unit direction.

## First ABI Surface

The first checked ABI is intentionally narrow:

- `architrino_solver_solve_causal_roots_f64`
- `architrino_solver_solve_roots_and_hits_f64`
- `architrino_solver_build_root_ledger_detail_f64`
- `architrino_solver_solve_causal_root_batch_f64`
- `architrino_solver_solve_roots_and_hits_batch_f64`
- `architrino_solver_diagnose_precision_f64`
- `architrino_solver_solve_causal_roots_precision_f64`
- `architrino_solver_solve_roots_and_hits_precision_f64`
- `architrino_solver_solve_roots_hits_ledger_precision_f64`
- `architrino_solver_propagate_error_budget_f64`
- `architrino_solver_sample_linear_motion_f64`
- `architrino_solver_integrate_constant_acceleration_motion_f64`
- `architrino_solver_integrate_constant_acceleration_path_history_f64`
- `architrino_solver_compute_phase_at_hit_f64`
- `architrino_solver_compute_path_bounds_f64`
- `architrino_solver_intersect_sphere_points_f64`
- `architrino_solver_compute_delayed_potentials_f64`
- `architrino_solver_solve_circular_self_hit_spans_f64`
- `architrino_solver_detect_assembly_membership_events_f64`
- `architrino_solver_write_assembly_graph_store_f64`
- `architrino_solver_read_assembly_graph_store_states_f64`
- `architrino_solver_read_assembly_graph_store_memberships_f64`
- `architrino_solver_read_assembly_graph_store_hierarchy_f64`
- `architrino_solver_read_assembly_graph_store_events_f64`
- `architrino_solver_read_assembly_graph_store_index`
- `architrino_solver_query_assembly_graph_store_index`
- `architrino_solver_build_spacetime_index_f64`
- `architrino_solver_query_spacetime_index_f64`
- `architrino_solver_query_emission_shell_broad_phase_f64`
- `architrino_solver_estimate_emission_shell_narrow_phase_f64`
- `architrino_solver_write_path_history_stream_f64`
- `architrino_solver_read_path_history_stream_rows_f64`
- `architrino_solver_read_path_history_stream_index`
- `architrino_solver_read_path_history_stream_chunks`
- `architrino_solver_query_path_history_stream_index`
- `architrino_solver_read_path_history_stream_query_f64`
- fixed-layout source and receiver linear path segments;
- fixed-layout root rows that correspond to the first `root_ledger.v1` fields;
- fixed-layout detailed root-ledger rows that correspond to the first `root_ledger_detail.v1` fields;
- fixed-layout batch item rows that map each request to a root offset and root count;
- fixed-layout precision diagnostic rows that report scale stress, selected precision path, and `f64` input-resolution warnings;
- fixed-layout precision-solve option and summary rows for selected path, numeric type, root controls, replay flags, residual summary, and dominant status;
- fixed-layout error-budget rows that report stage error, tolerance, tolerance ratio, status, and value authority;
- fixed-layout delayed-hit rows that correspond to the first `delayed_hit_events.v1` fields;
- fixed-layout motion-frame rows that correspond to the first `frame_buffer.v1` fields;
- fixed-layout phase diagnostic rows that correspond to the first `phase_at_hit.v1` fields;
- fixed-layout delayed-potential geometry rows that compute Ideal Swarm flight-time and potential diagnostics;
- fixed-layout circular self-hit span rows that compute Ideal Swarm super-field self-hit geometry;
- fixed-layout temporal assembly rows that correspond to `assembly_state.v1`, `assembly_membership.v1`, `assembly_hierarchy.v1`, and `assembly_events.v1`;
- fixed-layout assembly graph store index rows, index query rows, and summary rows for native file-backed assembly graph IO;
- fixed-layout path-history stream rows, stream-index rows, chunk rows, query rows, and summary rows for native file-backed stream IO;
- fixed-layout space-time index rows that correspond to `spacetime_index.v1`;
- fixed-layout emission-shell broad-phase options, candidate rows, and summary rows for path-history candidate queries;
- fixed-layout emission-shell narrow-phase request and estimate rows for sampled candidate classification;
- ABI metadata for row sizes and ABI version;
- app bridge methods `diagnosePrecisionF64`, `solveCausalRootsPrecisionF64`, `solveRootsAndHitsPrecisionF64`, `propagateErrorBudgetF64`, `checkRootHitInvariantsF64`, `classifyRootLedgerTransitionsF64`, `prepareWorkPacketHeader`, `orderWorkPacketResults`, `planPathHistoryWorkPackets`, `solveCausalRootsF64`, `solveCausalRootsNormalizedF64`, `buildRootLedgerDetailF64`, `solveCausalRootBatchF64`, `solveRootsAndHitsF64`, `sampleLinearMotionF64`, `integrateConstantAccelerationMotionF64`, `computePhaseAtHitF64`, `summarizePhaseAtHitsF64`, `computeSharedGeometryF64`, `detectAssemblyMembershipEventsF64`, `buildAssemblyGraphDatasetF64`, `createAssemblyGraphStoreF64`, `describeAssemblyGraphStoreF64`, `readAssemblyGraphStoreRangeF64`, `createPathHistoryStreamF64`, `planPathHistoryStorageLifecycleF64`, `buildSpaceTimeIndexF64`, `buildPathHistoryStreamSpaceTimeIndexF64`, `querySpaceTimeIndexF64`, `queryEmissionShellCandidatesF64`, `queryEmissionShellCandidatePacketF64`, `queryEmissionShellCandidatePacketsF64`, and `refineEmissionShellCandidateRootsF64`.

## First Shared Geometry API

`computeSharedGeometryF64` exposes the first solver-owned geometry calculations through the app bridge. The first operations batch path-segment bounds, point-on-sphere checks, delayed-potential flight-time rows, and circular self-hit spans through the WebAssembly C ABI. This keeps broad-phase bounds, spherical-emission checks, Ideal Swarm delayed-potential diagnostics, and circular self-hit span logic in the central solver surface instead of duplicating them across apps.

## First Admission API

`admitSimulationEnvelope` validates a model contract, error budget, and simulation envelope before a run starts. The first bridge implementation reports whether the request should be admitted, batched, precision-escalated, or rejected, with structured status records and a stress summary for entity count, interaction graph, memory, time-step, output-detail, and precision pressure.

## First Run API

`runSimulation` now supports the first `causalRoots`, `phaseDiagnostics`, `pathHistory`, `delayedHits`, `sharedGeometry`, `validationReplay`, `appPlayback`, and `motionSimulation` run shapes through the shared app bridge. `causalRoots` and `delayedHits` runs accept exactly one of `rootRequest` or `normalizedRootRequest`; normalized runs compute root and hit rows in authoritative local coordinates and attach a diagnostic that records `coordinateFrame: "origin-normalized"`, `coordinateOrigin`, and `absolutePointAuthority: "display-only"`. `motionSimulation` accepts exactly one of a linear sample request or a constant-acceleration integration request, and both publish `frame_buffer.v1` output through the same manifest and buffer contract. When `motionSimulation` requests `pathStream`, the bridge also emits a run-scoped `path_segment.v1` stream: linear motion uses the exact declared segment window, and constant-acceleration motion uses native solver-generated chord segments with an interpolation error bound. The direct bridge admits the request, sends causal-root and delayed-hit runs through the native precision roots-and-hits path, runs the WebAssembly phase-diagnostics, path-history, shared-geometry, validation-replay, app-playback, sampled-motion, or integrated-motion path as requested, returns a run handle with an attached completed response, registers run-scoped streams when a run emits streams, and exposes the same stream readback path used by direct root/hit calls. Root-solving run responses, manifests, and run descriptions carry the native precision solve summary as structured metadata. Root-solving responses also publish `root_ledger_detail.v1` rows and buffers generated with the selected precision root controls, so validation and migration consumers can inspect active roots, inactive gaps, and first-failure rows without a separate app-local ledger path. `SolverAppWorkerBridge.mjs` adds the first worker request/response protocol over that same client surface, with structured responses, normalized errors, dense-buffer transfer collection, stream readback, cancellation, and disposal. The JSON schema now includes `solver-app-worker/v1` request, response, and error messages with the supported bridge method set. Later native and browser-worker implementations can preserve the handle and message shape while moving more execution off the immediate call path.

`SolverAppAdapters.mjs` defines the first app-facing request builders on top of the run, stream, work-packet, assembly graph, and emission-shell query shapes. The current adapters build Photon causal-root and phase-diagnostics requests, path-history requests, Ideal Swarm delayed-hit and shared-geometry requests, Animator motion-simulation requests, Animator app-playback requests, generic shared-geometry requests, validation-replay requests, path-history stream and readback requests, assembly graph dataset/store/describe/read requests, storage-lifecycle requests, path-history work-packet plan requests, and emission-shell query, packet, batch, and merge requests. Photon causal-root and Ideal Swarm delayed-hit adapters enforce the same exact-one rule for ordinary `rootRequest` versus precision-preserving `normalizedRootRequest`. These builders centralize IDs, claim level, precision path, config version, output defaults, app labels, stream storage defaults, packet defaults, and dense-response preservation so migrating app code does not hand-roll solver request envelopes. `SolverAppWorkerRuntime.mjs` is the first packaged worker entry helper; it resolves the packaged WASM module factory, installs the worker bridge on a worker scope, and keeps app code on the same request/response protocol instead of requiring C++ or Emscripten handling in app modules.

The bridge capabilities include `solver-app-bridge-capabilities.v1`, which reports the available app adapters, dense-data transport modes, stream-query helpers, worker fallback posture, and browser storage fallback status. This lets apps negotiate bridge support before a run without knowing C++ exports, WebAssembly lifecycle details, or stream-file internals.

`solveCausalRootsNormalizedF64` is the first app-facing precision-preservation helper for large absolute coordinate regimes. The caller supplies a `coordinateOrigin` separately from a local `causalRootsF64Request`; the solver computes in the local normalized frame, returns authoritative local roots, and can attach best-effort absolute display points with `absolutePointAuthority: "display-only"`. This avoids losing small source/receiver separations that cannot survive if they are first encoded as `1e18 + 1` style JavaScript numbers.

`PrecisionPathSolver.hpp` is the first native precision-path execution wrapper. It combines precision diagnostics, claim-level minimums, caller-requested precision paths, automatic escalation, path-specific causal-root controls, and optional validation replay. It can reject a run when the caller forbids escalation from a weaker path to the required path. `architrino_solver_solve_causal_roots_precision_f64` exposes precision causal roots through a fixed C ABI summary row, `architrino_solver_solve_roots_and_hits_precision_f64` exposes the matching roots-and-delayed-hits solve, and `architrino_solver_solve_roots_hits_ledger_precision_f64` exposes roots, delayed hits, and detailed root-ledger rows from the same selected precision solve. `solveCausalRootsPrecisionF64` and `solveRootsAndHitsPrecisionF64` expose those calls through the shared app bridge and worker protocol. App `runSimulation` sends `causalRoots` and `delayedHits` runs through the native precision roots-and-hits path, so apps receive the selected precision path, root controls, numeric type, replay flags, root rows, hit rows, detailed root-ledger rows, buffers, and transient stream through one central solver authority.

`planThreadingPolicy` is the first app-facing threading diagnostic. It reports the requested worker count, active worker count, scheduling mode, backend, deterministic-reduction flag, thread capability flags, fallback reason, and status. The current WebAssembly bridge reports a recoverable sequential fallback when a caller requests fixed threads but browser or WASM thread support is unavailable; native C++ still owns the first actual task-pool execution path.

`describeRun` returns metadata for a completed run already registered with the bridge. It includes the run manifest, summary, diagnostics, buffer descriptors without dense payloads, and stream descriptors with available ranges. Apps can use it to decide whether to render, range-read, export, or validate a dataset without keeping all dense buffers in application memory.

`createPathHistoryStreamF64` publishes path-history rows as chunked `path_segment.v1` stream data through the same `openStream` and `readStreamRange` path used by root and delayed-hit streams. It supports transient `caller-buffer` storage and the first durable `native-file` storage path for Node/native runs. The native-file path writes one binary file per chunk, a compact binary `stream_index.v1` sidecar with 64-byte index rows, and a JSON stream manifest under `.tmp/solver-app-streams/` by default. The manifest records file paths and checksums in chunk descriptors, persists `solver-stream-index.v1` path-index rows plus the sidecar descriptor, and loads only selected chunks during readback, lifecycle planning, and emission-shell scans. A fresh bridge can reopen a durable native-file stream with `openStream({ manifestPath, purpose })`, validate the chunk files and binary index sidecar, load the persisted path index when present, and then use the normal `describeStream` and `readStreamRange` calls. Native package callers can use `architrino_solver_write_path_history_stream_f64`, `architrino_solver_read_path_history_stream_index`, `architrino_solver_read_path_history_stream_chunks`, `architrino_solver_query_path_history_stream_index`, and `architrino_solver_read_path_history_stream_query_f64` to write the same file-backed stream format and read it back with optional chunk-checksum verification. `closeRun({ releaseStreams: true })` removes the closed run's stream handles and deletes its native-file stream directory; `dispose()` releases all remaining stream handles and native-file directories. Browser OPFS storage remains a later backend; the bridge reports OPFS and native-file capability separately so apps can choose a visible fallback. The stream metadata records precision path, units, coordinate frame, scale normalization, interpolation rule, provenance, diagnostics, and per-chunk checksums. For `path_segment.v1` streams, `readStreamRange` can restrict reads by chunk index and compact matching rows by path key, time range, and frame range inside a larger chunk, which gives apps indexed readback behavior while preserving a compact native-file sidecar for later high-speed readers.

`describeStream` returns stream metadata without dense payloads. For `path_segment.v1` streams, it includes `solver-stream-index.v1` path-index rows with path key, chunk index, row offset, row count, time range, frame range, and byte range. This gives apps a cheap way to decide which path-history ranges to request before reading buffers.

`queryEmissionShellCandidatesF64` is the first app-facing broad-phase query over path-history streams. It uses path keys, time bounds, signal speed, and path-segment bounding boxes to find source/receiver segment pairs whose distance interval can overlap an emitted-shell radius interval. The bridge scans the stream once and applies path-key/time filters before materializing full rows, so selective source/receiver queries do not allocate every path row. The same candidate filter is exposed through `architrino_solver_query_emission_shell_broad_phase_f64`, and the sampled narrow-phase estimator is exposed through `architrino_solver_estimate_emission_shell_narrow_phase_f64`, so WebAssembly-backed apps can run both candidate rejection and false-positive estimation in the C++ solver core while retaining the JavaScript bridge fallback. It reports checked pairs, rejected pairs, rejection and candidate rates, a sampled narrow-phase false-positive estimate, object rows for simple app consumers, and dense `emission_shell_candidate.v1` plus `emission_shell_narrow_phase.v1` buffers for high-volume worker and index consumers. `refineEmissionShellCandidateRootsF64` consumes those candidate rows, reloads only the referenced path-history chunks, and uses the C++ roots-and-hits batch ABI to solve exact fixed-hit causal roots at sampled-hit times. It emits native delayed-hit rows and accepts `workerCount` so larger candidate sets can use the native batch worker path where available.

The first `validationReplay` run shape compares a baseline response against a candidate response with the migration vocabulary `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, and `baseline_investigation_required_mismatch`. It returns the comparison as part of the run response and records the same result in the run manifest and diagnostics so replay checks can flow through the normal app bridge instead of a separate side channel. The baseline comparison helper also supports shared-geometry payloads so app-local geometry helpers can be compared against solver-owned geometry rows.

The first `appPlayback` run shape accepts completed frames, causal roots, delayed hits, or shared geometry rows and republishes them under a fresh run handle and `solver-run-manifest.v1` manifest. It is an app playback and replay packaging path, not a physics execution path. This lets apps render completed solver datasets through the same manifest, diagnostics, and provenance surface used by computed runs.

Every completed run response carries a `solver-run-manifest.v1` manifest. The manifest records request/run/dataset ids, app id, run kind, claim level, config version and hash, model contract, simulation envelope, error budget, requested and selected precision paths, output request, admission result with stress summary, bridge and ABI provenance, deterministic flag, buffer summaries, stream summaries, diagnostics, status, validation artifacts, and a stable manifest hash. The validation artifact block carries the tolerance vector, precision replay status, migration parity status, config hash, buffer hashes, stream hashes, diagnostic hash, summary hash, and response-status hash. This is the first app-facing replay and migration-parity manifest; later durable storage can write the same object beside native or browser-backed stream artifacts.

## First Phase Diagnostics

`compute_phase_at_hits` in C++ and `computePhaseAtHitF64` in the app bridge compute source and receiver phase at each retained root through the WebAssembly C ABI. The first `phase_at_hit.v1` row records root id, status, source and receiver cycle indices, emission and hit time, source and receiver phase, phase delta, and phase spread.

`summarizePhaseAtHitsF64` computes the first app-facing aggregate over those phase rows. It returns `solver-phase-at-hit-summary.v1` with row count, root-id range, status-code counts, cycle-index ranges, emission/hit time ranges, source/receiver phase ranges, phase-delta range, phase-spread range, mean phase delta, mean phase spread, and maximum phase spread. This centralizes the basic Photon phase-spread summary path while preserving the row-level ABI as the authoritative diagnostic output.

The first `phaseDiagnostics` run shape packages those phase rows and their summary under the normal run manifest. This gives Photon a migration-ready phase-at-hit path with `phase_at_hit.v1` buffers, app diagnostics, selected precision path, and replay metadata rather than a one-off helper call.

This is a bootstrap ABI, not the final app migration API. It exists so the shared JavaScript bridge can call one real C++ solver function through WebAssembly while the full request, stream, and dataset contracts are still being implemented.

## First Detailed Root Ledger

`RootLedger.hpp` defines fixed-layout `root_ledger_detail.v1` rows for validation and replay, exposed through `architrino_solver_build_root_ledger_detail_f64` and `buildRootLedgerDetailF64`. The existing `root_ledger.v1` ABI remains the compact app-facing root row. The detailed ledger adds stable source, receiver, root, and ledger keys; root support intervals; bracket bounds; root kind; status code; Jacobian sign stratum; sequence index; iteration count; state flags; inactive search-gap rows; and first-failure rows. This lets validation consumers distinguish an active retained root from a search interval where no root was bracketed or from a solver halt such as insufficient history depth.

## First Motion Frames

`sample_linear_motion` in C++ and `sampleLinearMotionF64` in the app bridge sample a linear path segment into fixed-time frames through the WebAssembly C ABI. `integrate_constant_acceleration_motion` and `integrateConstantAccelerationMotionF64` add the first deterministic native motion-integration path for a declared constant-acceleration model. `integrate_constant_acceleration_path_history` and `architrino_solver_integrate_constant_acceleration_path_history_f64` emit solver-owned `path_segment.v1` rows for that model, using endpoint chords over each integration step and adding the analytic constant-acceleration interpolation bound to the row error budget. Both frame routes publish the same `frame_buffer.v1` row shape: path key, frame index, time, position, velocity, error bound, and state flags. This gives apps a stable frame-buffer shape for playback, path-history inspection, and the first narrow integration fixture before richer force-law integration is connected.

## First Work Packets

`WorkPacket.hpp` defines the first transport-ready packet header for solver work. A packet owns explicit source, receiver, path, and time ranges; declares selected precision path, expected output layouts, binary input-buffer references, checksums, merge order, and merge key; and serializes to canonical JSON-compatible bytes. `deterministic_merge_order` gives thread, worker, process, service, and future GPU backends one stable result-merge rule before those backends are implemented. The app bridge exposes the same contract through `prepareWorkPacketHeader` and `orderWorkPacketResults`, so worker dispatch code can validate packet ranges, row sizes, checksums, canonical headers, and merge order without parsing native C++ internals. `planPathHistoryWorkPackets` creates deterministic source/receiver chunk-pair packets from an already-registered `path_segment.v1` stream, which is the first packetized broad-phase dispatch plan over path-history data.

## First Numeric Serialization Contract

`NumericSerialization.hpp` defines the first canonical serialization descriptors for `f64`, `scaled_i64`, `interval_f64_pair`, `decimal128`, and `mp_limb_block`. Each descriptor records byte order, scalar size, signedness, scale-factor policy, exponent or limb layout, interval endpoint convention, rounding mode, comparison semantics, text export form, and whether the type is safe for app buffers or authoritative storage. The JSON schema mirrors this contract as `solver-numeric-serialization.v1`, and the app bridge exposes the same descriptor list through solver capabilities so apps can distinguish app-facing projected `f64` buffers from stricter stored values.

## First Error-Budget Propagation Contract

`ErrorBudget.hpp` defines the first stage-level propagation contract for root isolation, delayed hits, motion integration, stream encoding, stream readback, projection, and app buffers. Each stage reports estimated absolute error, tolerance, tolerance ratio, status, and value authority. The aggregate report classifies values as `authoritative`, `approximate`, `display-only`, or `rejected` so later solver outputs can state whether a value is fit for validation, migration parity, app projection, or display only. The app bridge exposes the same stage and authority vocabulary through solver capabilities as `solver-error-budget-propagation.v1`, and `propagateErrorBudgetF64` calls the fixed C ABI through WebAssembly so apps can evaluate the same propagation rule.

## First Invariant Checks

`InvariantChecks.hpp` defines the first native validation pass over solved causal-root and delayed-hit rows. It checks finite fields, ordered times, delay and distance consistency, residual tolerance, inverse-Jacobian branch weights, and delayed-hit unit-direction normalization. The first smoke target verifies that a valid analytic solve passes and that a deliberately corrupted delayed-hit direction fails.

The shared app bridge exposes the same first validation surface as `checkRootHitInvariantsF64`. Apps and validation tooling can submit completed root and hit rows and receive structured solver status records without duplicating invariant logic in app code. This complements baseline comparison and analytic fixtures with solver-owned invariant checks.

## First Root-Transition Classifier

`RootLedgerTransition.hpp` defines the first transition classifier over two `root_ledger_detail.v1` snapshots. It emits retained, appeared, disappeared, folded, assimilated-from-tail, and ledger-rerun-required transition rows. Failure rows in either ledger fail closed as `ledger_rerun_required` so consumers do not treat incompatible root labels as ordinary drift.

The shared app bridge exposes the same first classification surface as `classifyRootLedgerTransitionsF64`. Apps and migration checks can compare detailed root-ledger snapshots and receive stable transition keys plus structured status records without duplicating branch-transition rules in app code.

## First Temporal Assembly Graph

`AssemblyGraph.hpp` defines fixed-layout rows for assembly state intervals, path-to-assembly membership intervals, parent-child assembly hierarchy intervals, and membership-change events. The first native implementation provides stable identity keys, deterministic membership-change event detection, time-window membership lookup, and interval validation.

These rows are the first solver-owned data structure for assembly-local state attached to path history. They let later solver slices treat assembly membership as queryable temporal data instead of spreading assembly tags and lookup rules across app code.

`detectAssemblyMembershipEventsF64` exposes membership-change event detection through the WebAssembly C ABI and app bridge. Apps can submit fixed-layout membership intervals and receive deterministic `assembly_events.v1` rows plus a binary buffer descriptor.

`buildAssemblyGraphDatasetF64` packages assembly state rows, path membership rows, hierarchy rows, and events into one app-facing dataset response with fixed binary buffers and a summary. If callers omit events, the bridge derives membership-change events through the solver event detector; if callers provide events, those events are treated as the explicit event set. This gives apps one solver-owned assembly graph contract before richer durable assembly graph storage and indices are exposed through app APIs.

`createAssemblyGraphStoreF64` writes that same dataset shape into a durable native-file app store with four fixed binary files plus a `solver-assembly-graph-manifest.v1` manifest. The manifest includes a first `solver-assembly-graph-index.v1` row index keyed by path, assembly, parent assembly, child assembly, row range, byte range, and time range, with a compact `assembly_graph_index.v1` binary sidecar for native-file reopen validation and fast fixed-row scans. `describeAssemblyGraphStoreF64` reopens the manifest without dense payloads, and `readAssemblyGraphStoreRangeF64` uses the manifest index to materialize selected rows by layout, row range, byte range, path key, assembly key, and time range. Native package callers can use `architrino_solver_write_assembly_graph_store_f64`, the fixed-row store read functions, and `architrino_solver_query_assembly_graph_store_index` to write and query the same file-backed assembly graph representation without going through app-local storage code. This makes assembly-local state queryable as a solver dataset rather than an app-local tag collection.

`AssemblyGraphStore.hpp` writes those rows into separate fixed-layout binary datasets for states, memberships, hierarchy, and events, plus a fixed-layout `assembly_graph_index.v1` sidecar. The manifest records layout ids, row sizes, row counts, byte lengths, file paths, and the covered time range. The native index sidecar records source layout, key kind, key, row range, time range, byte range, and flags so readers can locate candidate assembly graph rows before loading the full dataset. Later spatial, temporal, and assembly-aware indices can replace or supplement this sidecar while preserving the row contracts.

## First Path-History Stream

`solveRootsAndHitsF64` returns:

- root rows with layout `root_ledger.v1`;
- delayed-hit rows with layout `delayed_hit_events.v1`;
- buffer descriptors with row counts, byte lengths, numeric type, layout id, and copied `ArrayBuffer` payloads;
- one transient stream descriptor using `stream_index.v1` ranges.

The native `PathHistoryStreamWriter` writes fixed-layout `path_segment.v1` rows to a binary data file, fixed-layout `stream_index.v1` chunk rows to a companion index file, optional fixed-layout `path_chunk.v1` rows to a checksummed chunk sidecar, and a metadata manifest. The manifest records run and dataset ids, engine and model provenance, precision path, units, coordinate frame, scale normalization, interpolation rule, stream and readback tolerances, checksums, and a diagnostic summary. Readback can verify chunk checksums and fail on corrupted chunk data before returning checked query rows. This is the first durable storage slice for path histories; it is intentionally narrow and will grow toward larger per-path datasets, range queries, and app-facing durable stream reads.

The app bridge can also open and range-read the first transient caller-buffer stream produced by `solveRootsAndHitsF64`. This gives apps one stable stream handle path for root and delayed-hit buffers while path-history runs can already use caller-buffer or native-file storage through `createPathHistoryStreamF64`.

Native path-history readback now includes chunk-level index queries by path key and time window. The first query helper returns matching `stream_index.v1` rows and reads the corresponding `path_segment.v1` chunks, which is the first range-query layer for larger stream-backed runs.

The first `pathHistory` run shape packages caller-supplied `path_segment.v1` rows under a normal `solver-run-manifest.v1` manifest. The run response exposes the stream descriptor, chunk metadata, stream summary, diagnostics, and stable stream handle while keeping dense path rows in the stream readback path. This lets apps treat recorded path histories as solver datasets without loading every segment into app memory.

## First Storage Lifecycle Policy

`StorageLifecycle.hpp` defines the first deterministic planner for path-history chunk retention. Given a policy and chunk rows, it marks chunks to remain active, spill to warm storage, archive cold, build a deep index, delete, or stay blocked in active memory when a chunk is pinned unsafe. `planPathHistoryStorageLifecycleF64` exposes that planner through the WebAssembly C ABI and app bridge for either app-supplied chunk metadata or an already-registered `path_segment.v1` stream, including native-file backed streams. Native-file stream directories are cleaned up by `closeRun` and `dispose`; automated tier movement, browser quota handling, and user-visible deletion workflows will use lifecycle decisions in later storage slices.

## First Space-Time Index

`SpaceTimeIndex.hpp` defines fixed-layout `spacetime_index.v1` rows for broad-phase path and assembly queries. Each row records grid cell coordinates, a time-bin coordinate, subject key, source row offset, exact space/time bounds, subject kind, source layout, and state flags.

The first builder indexes `path_segment.v1` rows and `assembly_state.v1` rows, supports merged path-plus-assembly query sets, writes a durable binary sidecar with a metadata manifest, and emits an overflow entry when a source row spans more cells than the configured cap. The first query helper returns deduplicated candidates for a space/time window; downstream exact solvers still decide whether a candidate contains a causal intersection or assembly-local event.

`buildSpaceTimeIndexF64` and `querySpaceTimeIndexF64` expose the first space-time index path through the WebAssembly C ABI and app bridge. Apps can submit path-history rows and assembly-state rows, receive fixed-layout `spacetime_index.v1` buffers, and query candidates by space/time window, subject kind, and subject key without duplicating broad-phase index code. `buildPathHistoryStreamSpaceTimeIndexF64` builds the same `spacetime_index.v1` output directly from a registered `path_segment.v1` stream with chunk, path, time, frame, and byte filters, so apps can index stream-backed path history without pulling the full stream into app memory.

## First Baseline Comparison

`SolverBaselineComparison.mjs` classifies solver response differences with the migration vocabulary: `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, and `baseline_investigation_required_mismatch`. The first smoke check compares the live WebAssembly roots-and-hits response against its fixture and verifies that a deliberate numeric mismatch is reported as an investigation-required mismatch.

`scripts/check-solver-baseline-sandbox.mjs` runs fixed app-labeled Animator, Photon, and Ideal Swarm smoke cases through the shared bridge, including causal-root, Photon phase-diagnostics, Animator path-history, and Ideal Swarm geometry artifacts. It writes artifact-only JSON output under `.tmp/solver-baseline-sandbox`, records resource caps and fixed no-randomness seed policy, preserves each `solver-run-manifest.v1` manifest and manifest hash where a case uses `runSimulation`, and verifies each case classifies as `baseline_within_tolerance`.

## First Analytic Validation

`solver_analytic_smoke.cpp` adds a manufactured moving-source case with a closed-form causal root. It verifies the root time, delay, distance, residual, Jacobian, branch weight, delayed-hit strength, and unit direction, so the native solver is checked against an analytic target in addition to app-facing baseline fixtures.

## First Runtime Benchmark

Run the native Release benchmark target with:

```bash
node scripts/benchmark-solver.mjs
```

The benchmark uses deterministic workloads for causal-root batch solving,
emission-shell broad-phase scans, space-time index build/query behavior, and
path-history plus assembly graph store IO. It reports operation counts,
observation counts, elapsed milliseconds, operations per second, and a checksum.
The benchmark checks result sanity but does not enforce machine-dependent
wall-clock thresholds.
