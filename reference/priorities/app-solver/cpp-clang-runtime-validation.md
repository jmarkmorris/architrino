# C++/Clang Runtime Validation

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closed-validation-capture`

Kind: `runtime-validation-status`

Source task: `cpp_clang_runtime_validation` in [priorities.md](priorities.md)

Audit date: 2026-06-20

Write boundary: this closure pass updated this audit and [priorities.md](priorities.md),
then refreshed build and report artifacts under `.tmp/`. It did not edit C++
source, CMake files, JavaScript runtime files, TypeScript declarations, or JSON
schemas.

## Closure Decision

`cpp_clang_runtime_validation` is closed as a build, smoke, bridge, parity, and
benchmark-sanity validation capture.

The live tree now passes the end-to-end runtime validation gate:

- `node scripts/build-solver-smoke.mjs all` exits 0 and reaches `solver smoke build complete: all`;
- native motion validation passes with `solver motion=ok frames=3`;
- the app bridge validation passes, including the pair-interaction manifest path
  that previously blocked closure;
- baseline sandbox and migration parity checks pass inside the full smoke
  wrapper;
- the Release benchmark runner passes all ten current benchmark cases and the
  `emission-shell-broad-phase-v0` non-wall-clock acceptance threshold gate.

This is not a claim that threaded stages, browser-worker execution, WebAssembly
execution, path-history IO, or app bridge requests have met a final production
performance budget. It closes the runtime validation task because the declared
toolchain, native smoke, WebAssembly smoke, bridge contract, baseline parity,
migration parity, and benchmark-sanity gates are green on the live tree.

## Current Setup

### Native CMake And Clang

The compiled zombie-solver is configured under
[src/solver/CMakeLists.txt](../../../src/solver/CMakeLists.txt):

- project language: C++ only;
- standard: C++20, required, no compiler extensions;
- core artifact: `architrino_solver_core` static library;
- compiler warning policy for Clang/GNU: `-Wall -Wextra -Wpedantic -Werror`;
- Boost.Multiprecision headers are required through
  `ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR`;
- native executable targets include assembly graph, analytic roots, contract,
  geometry, invariants, motion, numeric serialization, parallel execution,
  phase, precision, precision dynamic range, root ledger, root transition,
  space-time index, storage lifecycle, stream, work packet, and benchmark
  targets.

[src/solver/CMakePresets.json](../../../src/solver/CMakePresets.json) defines:

- `native-debug`: Ninja, Debug, `/opt/homebrew/opt/llvm/bin/clang++`, build dir
  `.tmp/solver-build/native`;
- `native-release`: Ninja, Release, `/opt/homebrew/opt/llvm/bin/clang++`, build
  dir `.tmp/solver-build/native-release`.

There is no CMake preset at the repository root. Run preset-based solver builds
from `src/solver`, or use the explicit `-S src/solver -B .tmp/...` form used by
[scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs).

### WebAssembly Setup

The WebAssembly smoke target is gated by `ARCHITRINO_SOLVER_BUILD_WASM=ON` in
[src/solver/CMakeLists.txt](../../../src/solver/CMakeLists.txt). The target:

- builds `architrino_solver_wasm_smoke.mjs` and `.wasm`;
- uses Emscripten `MODULARIZE`, `EXPORT_ES6`, and `ENVIRONMENT=web,worker,node`;
- exports allocator/runtime helpers and solver C ABI functions, including causal
  roots, circular roots/hits/ledger, precision diagnostics, motion sampling,
  constant-acceleration integration, pair interaction, geometry, assembly graph
  store, space-time index, emission-shell queries, path-history stream IO, and
  storage lifecycle.

[scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs)
verifies the generated ES module by importing it in Node and calling:

- `architrino_solver_smoke`;
- `architrino_solver_contract_smoke`;
- `architrino_solver_root_smoke`.

### Test And Check Setup

There is no root `package.json`; checks are direct script or `node --test`
invocations.

Primary runtime checks covered by this validation capture:

- [scripts/solver-toolchain-preflight.mjs](../../../scripts/solver-toolchain-preflight.mjs)
- [scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs)
- [scripts/benchmark-solver.mjs](../../../scripts/benchmark-solver.mjs)
- [scripts/check-solver-contract-fixtures.mjs](../../../scripts/check-solver-contract-fixtures.mjs)
- [scripts/check-solver-geometry-inventory.mjs](../../../scripts/check-solver-geometry-inventory.mjs)
- [scripts/check-solver-app-bridge.mjs](../../../scripts/check-solver-app-bridge.mjs)
- [scripts/check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
- [scripts/check-solver-migration-parity.mjs](../../../scripts/check-solver-migration-parity.mjs)

## Commands Run

| Command | Result | Evidence |
| --- | --- | --- |
| `cmake --build --preset native-debug --target architrino_solver_parallel_smoke` from `src/solver` | Pass | `ninja: no work to do.` |
| `.tmp/solver-build/native/architrino_solver_parallel_smoke` | Pass | `solver parallel=ok hardware=8 requested-workers=2`. |
| `.tmp/solver-build/native/architrino_solver_motion_smoke` | Pass | `solver motion=ok frames=3`. |
| `node scripts/check-solver-app-bridge.mjs` | Pass | `solver app bridge check passed.` |
| `node scripts/check-solver-contract-fixtures.mjs` | Pass | `solver contract fixtures check passed.` |
| `node scripts/build-solver-smoke.mjs all` | Pass | Preflight, contract fixtures, geometry inventory, native configure/build, all native smoke executables, WebAssembly configure/build and smoke calls, solver package manifest write/check, app bridge, baseline sandbox, and migration parity all passed; final line `solver smoke build complete: all`. |
| `node scripts/benchmark-solver.mjs --skip-preflight` | Pass | Release benchmark built and ran ten cases; final line `solver benchmark=ok cases=10`, report written to `.tmp/solver-build/benchmark/solver-benchmark-report.json`, and `emission-shell-broad-phase-v0` threshold acceptance passed. |

## Validated Workloads

### Native Runtime Workloads

Validated native C++ workloads in this audit:

- toolchain resolution, Homebrew package resolution, and writable repo-local
  `EM_CACHE`;
- core C++20 Clang/Ninja build with warnings as errors;
- assembly state, membership, hierarchy, and event row validation;
- durable assembly graph store write/read/index query;
- manufactured analytic moving-source and circular-source causal-root cases;
- first ABI and contract smoke path, including causal-root fixture behavior;
- stage-level error-budget propagation;
- deterministic causal-root batch solving with native worker fan-out;
- shared geometry helpers: vector math, path bounds, sphere intersection,
  delayed-potential rows, circular self-hit spans, emission-shell broad/narrow
  phase checks;
- root/hit invariant validation;
- motion sampling, path-history sampling, constant-acceleration integration,
  pair-interaction integration, pair-interaction C ABI, retained-knot path
  constraints, and pair-interaction summary rows;
- native numeric serialization descriptors for five declared numeric types;
- native parallel execution policy diagnostics;
- phase-at-hit diagnostics;
- precision diagnostics and precision-path selection;
- root-ledger detail rows and root-transition classification;
- space-time index build/query;
- storage lifecycle planning;
- path-history stream append/read/index behavior;
- work-packet header/checksum/merge-order behavior.

The `architrino_solver_precision_dynamic_range_smoke` target is intentionally
validated as a focused precision-contract smoke rather than as part of the
all-target wrapper. It was green in the current solver-contract closure pass with
`solver precision-dynamic-range=ok charts=log_magnitude,local_frame,interval_bounds`.

### WebAssembly And Bridge Workloads

Validated WebAssembly and bridge pieces:

- Emscripten configure and build path;
- generated `architrino_solver_wasm_smoke.mjs` / `.wasm` artifacts;
- imported ES module smoke execution in Node;
- exported smoke C ABI calls for solver, contract, and root smoke;
- package manifest write/check after WebAssembly build;
- app bridge direct client and worker-facing contract checks;
- app bridge `native_c_abi_indexed_v0` emission-shell candidate query over `emission_shell_broad_phase_v0` index options;
- Causal Delay Feedback pair-interaction app bridge manifest coverage;
- baseline sandbox for 17 fixed cases;
- migration parity for Photon, Ideal Braid, and Animator across 17 cases.

### Benchmarked Workloads

`node scripts/benchmark-solver.mjs --skip-preflight` passed these Release native
benchmark cases:

| Benchmark | Operations | Observations | Notes |
| --- | ---: | ---: | --- |
| `causal-root-batch` | 512 | 512 | deterministic indexed batch, 2 workers used |
| `causal-root-thread-scaling` | 1536 | 768 | single-worker vs bounded-worker checksum stable, speedup ratio recorded |
| `emission-shell-broad-phase` | 36864 | 1054 | all-pairs AABB radius interval broad phase |
| `emission-shell-broad-phase-v0` | 5312768 | 24625 | solver-owned interval-time-slab / spatial-hash / emission-shell-annulus prototype, 2048-path stress case, 0 missed oracle candidates, 0 packet replay deltas |
| `spacetime-index-build-query` | 11238 | 608 | combined spacetime cell index |
| `stream-and-assembly-store-io` | 5120 | 132 | path-history and assembly-store IO sanity |
| `path-history-fast-spill-budget` | 8192 | 64 | bounded chunk spill behavior |
| `path-history-high-speed-readback-budget` | 256 | 2 | indexed selected range readback |
| `path-history-deep-index-build-budget` | 8192 | 31944 | path-history spacetime deep-index build/query |
| `path-history-recovery-detection-budget` | 64 | 3 | checksum fault, partial write, and stale sidecar detection |

The benchmark runner checks result sanity, report consistency, and
non-wall-clock acceptance thresholds for `emission-shell-broad-phase-v0`. It
does not enforce wall-clock thresholds.

## Remaining Runtime Boundaries

These are not blockers for closing `cpp_clang_runtime_validation`, but they
remain future scoped obligations for app migration and later performance
acceptance:

- the runtime remains `f64`-first for dense app buffers and the first ABI paths,
  even though numeric serialization descriptors cover stricter types;
- stricter numeric paths such as `decimal128`, `mp_limb_block`, and interval
  authoritative arithmetic are not yet benchmarked as runtime arithmetic engines;
- WebAssembly is smoke-tested, but not performance-budgeted;
- browser worker lifecycle, transferable-buffer cost, and cancellation latency
  are contract-checked but not benchmark-thresholded;
- sustained large path-history stream throughput, warm/cold tier movement, and
  storage pressure have sanity cases but no production threshold table;
- benchmark success now includes a structural acceptance gate for
  `emission-shell-broad-phase-v0`, but it is still not runtime acceptance
  against a declared wall-clock production performance budget.

## Closure Boundary

The task is complete at the priority-queue level because the selected C++20 /
Clang runtime, WebAssembly smoke path, shared app bridge, baseline sandbox,
migration parity checks, and benchmark sanity cases are green together.

Stage-specific promotion still requires separate acceptance records when a
threaded path, WebAssembly path, app bridge request class, or stream/index IO
path is proposed as a preferred production default.
