# Architrino Solver

This directory is the first C++/WebAssembly scaffold for the central architrino motion and geometry solver.

The first implementation target is a minimal causal-root and delayed-hit core behind a shared app bridge. The current files establish the toolchain, package boundary, native smoke targets, WebAssembly smoke target, app-facing TypeScript contract, shared geometry helpers, first shared-geometry ABI, first precision diagnostics, first deterministic batch solver, first central native parallel execution policy, first motion-frame sampler, first work-packet contract, first temporal assembly graph rows and store, first detailed root-ledger rows, and first native path-history stream.

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

The smoke command verifies:

- C++20 native build through Clang/LLVM and Ninja;
- Boost.Multiprecision availability;
- model-contract, error-budget, simulation-envelope, and admission validation;
- app bridge admission preflight for admit, batch, precision-escalation, and reject decisions;
- first app-facing `runSimulation` path for completed causal-root datasets;
- first app-facing motion-frame sampling path with `frame_buffer.v1` binary output;
- phase-at-hit diagnostics with `phase_at_hit.v1` binary output;
- shared geometry helpers and app bridge calls for vector math, path bounds, bounds overlap, and spherical emission point checks;
- assembly membership-change event detection with `assembly_events.v1` binary output;
- precision diagnostics through C++ and C ABI paths that classify ordinary and high-dynamic-range causal-root requests, including `f64` geometry and time resolution warnings for requests that need normalized coordinates or stricter input representation;
- high-offset causal-root solving with returned distance, residual, Jacobian, and branch weight computed from the high-precision root evaluation state;
- deterministic causal-root solving over linear source and receiver path segments;
- detailed root-ledger rows for active roots, inactive search gaps, and first-failure status without changing the app-facing `root_ledger.v1` ABI;
- delayed-hit event projection from retained causal roots;
- deterministic batch causal-root solving through C++ and C ABI paths, with native CPU worker fan-out through the central parallel execution policy and a WebAssembly sequential fallback;
- central parallel execution planning for native worker counts, minimum work-per-worker thresholds, and deterministic indexed result writes;
- native binary path-history stream append/read behavior with path chunks, chunk index, path/time index queries, checksummed chunk sidecar, and metadata manifest;
- native space-time index construction and query behavior for path-history segments and assembly-state intervals, with durable fixed-row sidecar write/read and overflow handling;
- native work-packet header validation, canonical serialization, checksum, and deterministic merge ordering;
- native numeric serialization descriptors for every declared solver numeric type;
- native temporal assembly graph rows for assembly state, path membership, assembly hierarchy, and membership-change events;
- native temporal assembly graph store write/read behavior with fixed binary datasets, query helpers, and metadata manifest;
- the first fixed-layout `f64` causal-root C ABI;
- WebAssembly module loading, exported smoke calls, and bridge-level causal-root readback.
- transient stream descriptors for the first root and delayed-hit buffers;
- app bridge stream open, range readback, byte-range selection, max-byte pressure reporting, and stream release.
- baseline response comparison with migration status classifications.
- isolated app-labeled baseline sandbox artifacts for Animator, Photon, and Ideal Swarm smoke cases.
- manufactured analytic causal-root validation for a moving-source delayed-hit case with known root, Jacobian, branch weight, and unit direction.

## First ABI Surface

The first checked ABI is intentionally narrow:

- `architrino_solver_solve_causal_roots_f64`
- `architrino_solver_solve_roots_and_hits_f64`
- `architrino_solver_build_root_ledger_detail_f64`
- `architrino_solver_solve_causal_root_batch_f64`
- `architrino_solver_diagnose_precision_f64`
- `architrino_solver_sample_linear_motion_f64`
- `architrino_solver_compute_phase_at_hit_f64`
- `architrino_solver_compute_path_bounds_f64`
- `architrino_solver_intersect_sphere_points_f64`
- `architrino_solver_detect_assembly_membership_events_f64`
- `architrino_solver_build_spacetime_index_f64`
- `architrino_solver_query_spacetime_index_f64`
- fixed-layout source and receiver linear path segments;
- fixed-layout root rows that correspond to the first `root_ledger.v1` fields;
- fixed-layout detailed root-ledger rows that correspond to the first `root_ledger_detail.v1` fields;
- fixed-layout batch item rows that map each request to a root offset and root count;
- fixed-layout precision diagnostic rows that report scale stress, selected precision path, and `f64` input-resolution warnings;
- fixed-layout delayed-hit rows that correspond to the first `delayed_hit_events.v1` fields;
- fixed-layout motion-frame rows that correspond to the first `frame_buffer.v1` fields;
- fixed-layout phase diagnostic rows that correspond to the first `phase_at_hit.v1` fields;
- fixed-layout temporal assembly rows that correspond to `assembly_state.v1`, `assembly_membership.v1`, `assembly_hierarchy.v1`, and `assembly_events.v1`;
- fixed-layout space-time index rows that correspond to `spacetime_index.v1`;
- ABI metadata for row sizes and ABI version;
- app bridge methods `diagnosePrecisionF64`, `solveCausalRootsF64`, `buildRootLedgerDetailF64`, `solveCausalRootBatchF64`, `solveRootsAndHitsF64`, `sampleLinearMotionF64`, `computePhaseAtHitF64`, `computeSharedGeometryF64`, `detectAssemblyMembershipEventsF64`, `buildSpaceTimeIndexF64`, and `querySpaceTimeIndexF64`.

## First Shared Geometry API

`computeSharedGeometryF64` exposes the first solver-owned geometry calculations through the app bridge. The first operations batch path-segment bounds and point-on-sphere checks through the WebAssembly C ABI. This keeps broad-phase bounds and spherical-emission checks in the central solver instead of duplicating them across apps.

## First Admission API

`admitSimulationEnvelope` validates a model contract, error budget, and simulation envelope before a run starts. The first bridge implementation reports whether the request should be admitted, batched, precision-escalated, or rejected, with structured status records for apps and diagnostics.

## First Run API

`runSimulation` now supports the first `causalRoots` and `motionSimulation` run shapes through the shared app bridge. The first implementation is synchronous: it admits the request, runs the WebAssembly causal-root, delayed-hit, or motion-frame ABI path, returns a run handle with an attached completed response, registers run-scoped streams when a run emits streams, and exposes the same stream readback path used by direct root/hit calls. Later worker/native implementations can preserve the handle shape while moving execution off the immediate call path.

## First Phase Diagnostics

`compute_phase_at_hits` in C++ and `computePhaseAtHitF64` in the app bridge compute source and receiver phase at each retained root through the WebAssembly C ABI. The first `phase_at_hit.v1` row records root id, status, source and receiver cycle indices, emission and hit time, source and receiver phase, phase delta, and phase spread.

This is a bootstrap ABI, not the final app migration API. It exists so the shared JavaScript bridge can call one real C++ solver function through WebAssembly while the full request, stream, and dataset contracts are still being implemented.

## First Detailed Root Ledger

`RootLedger.hpp` defines fixed-layout `root_ledger_detail.v1` rows for validation and replay, exposed through `architrino_solver_build_root_ledger_detail_f64` and `buildRootLedgerDetailF64`. The existing `root_ledger.v1` ABI remains the compact app-facing root row. The detailed ledger adds stable source, receiver, root, and ledger keys; root support intervals; bracket bounds; root kind; status code; Jacobian sign stratum; sequence index; iteration count; state flags; inactive search-gap rows; and first-failure rows. This lets validation consumers distinguish an active retained root from a search interval where no root was bracketed or from a solver halt such as insufficient history depth.

## First Motion Frames

`sample_linear_motion` in C++ and `sampleLinearMotionF64` in the app bridge sample a linear path segment into fixed-time frames through the WebAssembly C ABI. The first `frame_buffer.v1` row records path key, frame index, time, position, velocity, error bound, and state flags. This gives apps a stable frame-buffer shape for playback and path-history inspection before richer motion models are connected.

## First Work Packets

`WorkPacket.hpp` defines the first transport-ready packet header for solver work. A packet owns explicit source, receiver, path, and time ranges; declares selected precision path, expected output layouts, binary input-buffer references, checksums, merge order, and merge key; and serializes to canonical JSON-compatible bytes. `deterministic_merge_order` gives thread, worker, process, service, and future GPU backends one stable result-merge rule before those backends are implemented.

## First Numeric Serialization Contract

`NumericSerialization.hpp` defines the first canonical serialization descriptors for `f64`, `scaled_i64`, `interval_f64_pair`, `decimal128`, and `mp_limb_block`. Each descriptor records byte order, scalar size, signedness, scale-factor policy, exponent or limb layout, interval endpoint convention, rounding mode, comparison semantics, text export form, and whether the type is safe for app buffers or authoritative storage. The JSON schema mirrors this contract as `solver-numeric-serialization.v1` so manifests can distinguish app-facing projected `f64` buffers from stricter stored values.

## First Temporal Assembly Graph

`AssemblyGraph.hpp` defines fixed-layout rows for assembly state intervals, path-to-assembly membership intervals, parent-child assembly hierarchy intervals, and membership-change events. The first native implementation provides stable identity keys, deterministic membership-change event detection, time-window membership lookup, and interval validation.

These rows are the first solver-owned data structure for assembly-local state attached to path history. They let later solver slices treat assembly membership as queryable temporal data instead of spreading assembly tags and lookup rules across app code.

`detectAssemblyMembershipEventsF64` exposes membership-change event detection through the WebAssembly C ABI and app bridge. Apps can submit fixed-layout membership intervals and receive deterministic `assembly_events.v1` rows plus a binary buffer descriptor.

`AssemblyGraphStore.hpp` writes those rows into separate fixed-layout binary datasets for states, memberships, hierarchy, and events, then emits a small manifest with layout ids, row sizes, row counts, byte lengths, file paths, and the covered time range. The first query helpers operate on loaded rows by path, assembly, and time window. Later spatial, temporal, and assembly-aware indices can replace the scan path while preserving the row contracts.

## First Path-History Stream

`solveRootsAndHitsF64` returns:

- root rows with layout `root_ledger.v1`;
- delayed-hit rows with layout `delayed_hit_events.v1`;
- buffer descriptors with row counts, byte lengths, numeric type, layout id, and copied `ArrayBuffer` payloads;
- one transient stream descriptor using `stream_index.v1` ranges.

The native `PathHistoryStreamWriter` writes fixed-layout `path_segment.v1` rows to a binary data file, fixed-layout `stream_index.v1` chunk rows to a companion index file, optional fixed-layout `path_chunk.v1` rows to a checksummed chunk sidecar, and a metadata manifest. The manifest records run and dataset ids, engine and model provenance, precision path, units, coordinate frame, scale normalization, interpolation rule, stream and readback tolerances, checksums, and a diagnostic summary. It is the first durable storage slice for path histories; it is intentionally narrow and will grow toward larger per-path datasets, range queries, and app-facing durable stream reads.

The app bridge can also open and range-read the first transient caller-buffer stream produced by `solveRootsAndHitsF64`. This gives apps one stable stream handle path for root and delayed-hit buffers before OPFS or native-file stream storage is exposed through the bridge.

Native path-history readback now includes chunk-level index queries by path key and time window. The first query helper returns matching `stream_index.v1` rows and reads the corresponding `path_segment.v1` chunks, which is the first range-query layer for larger stream-backed runs.

## First Space-Time Index

`SpaceTimeIndex.hpp` defines fixed-layout `spacetime_index.v1` rows for broad-phase path and assembly queries. Each row records grid cell coordinates, a time-bin coordinate, subject key, source row offset, exact space/time bounds, subject kind, source layout, and state flags.

The first builder indexes `path_segment.v1` rows and `assembly_state.v1` rows, supports merged path-plus-assembly query sets, writes a durable binary sidecar with a metadata manifest, and emits an overflow entry when a source row spans more cells than the configured cap. The first query helper returns deduplicated candidates for a space/time window; downstream exact solvers still decide whether a candidate contains a causal intersection or assembly-local event.

`buildSpaceTimeIndexF64` and `querySpaceTimeIndexF64` expose the first space-time index path through the WebAssembly C ABI and app bridge. Apps can submit path-history rows and assembly-state rows, receive fixed-layout `spacetime_index.v1` buffers, and query candidates by space/time window, subject kind, and subject key without duplicating broad-phase index code.

## First Baseline Comparison

`SolverBaselineComparison.mjs` classifies solver response differences with the migration vocabulary: `baseline_within_tolerance`, `baseline_refined_result`, `baseline_model_boundary_difference`, and `baseline_investigation_required_mismatch`. The first smoke check compares the live WebAssembly roots-and-hits response against its fixture and verifies that a deliberate numeric mismatch is reported as an investigation-required mismatch.

`scripts/check-solver-baseline-sandbox.mjs` runs fixed app-labeled Animator, Photon, and Ideal Swarm smoke cases through the shared bridge. It writes artifact-only JSON output under `.tmp/solver-baseline-sandbox`, records resource caps and fixed no-randomness seed policy, and verifies each case classifies as `baseline_within_tolerance`.

## First Analytic Validation

`solver_analytic_smoke.cpp` adds a manufactured moving-source case with a closed-form causal root. It verifies the root time, delay, distance, residual, Jacobian, branch weight, delayed-hit strength, and unit direction, so the native solver is checked against an analytic target in addition to app-facing baseline fixtures.
