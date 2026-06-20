# C++/Clang Runtime Validation

Status: `open-validation`

Kind: `runtime-validation-status`

Source task: `cpp_clang_runtime_validation` in [solver.md](solver.md)

Audit date: 2026-06-20

Write boundary: this pass did not edit C++ source, CMake files, JavaScript runtime files, or [solver.md](solver.md). Existing checks refreshed build and report artifacts under `.tmp/`.

## Closure Decision

`cpp_clang_runtime_validation` cannot be closed yet.

The C++/Clang runtime is buildable, the toolchain preflight is green, most native smoke workloads pass, the WebAssembly smoke module loads and passes its exported smoke calls, baseline sandbox and migration parity pass, and the current native benchmark suite passes all five cases. The closure blocker is that the end-to-end runtime validation gate is not green:

- `node scripts/build-solver-smoke.mjs all` fails at the native `architrino_solver_motion_smoke` executable.
- `node scripts/build-solver-smoke.mjs wasm` reaches WebAssembly smoke success but then fails in `node scripts/check-solver-app-bridge.mjs`.
- `node scripts/check-solver-app-bridge.mjs` fails standalone with `expected causal-delay pair run manifest`.

The failing surfaces are concentrated around the motion / pair-interaction runtime path. Until those pass through the native smoke and app-bridge checks, this task remains open.

## Current Setup

### Native CMake And Clang

The native solver is configured under [src/solver/CMakeLists.txt](../../../src/solver/CMakeLists.txt):

- project language: C++ only;
- standard: C++20, required, no compiler extensions;
- core artifact: `architrino_solver_core` static library;
- compiler warning policy for Clang/GNU: `-Wall -Wextra -Wpedantic -Werror`;
- Boost.Multiprecision headers are required through `ARCHITRINO_SOLVER_BOOST_INCLUDE_DIR`;
- native executable targets include assembly graph, analytic roots, contract, geometry, invariants, motion, numeric serialization, parallel execution, phase, precision, precision dynamic range, root ledger, root transition, space-time index, storage lifecycle, stream, work packet, and benchmark targets.

[src/solver/CMakePresets.json](../../../src/solver/CMakePresets.json) defines:

- `native-debug`: Ninja, Debug, `/opt/homebrew/opt/llvm/bin/clang++`, build dir `.tmp/solver-build/native`;
- `native-release`: Ninja, Release, `/opt/homebrew/opt/llvm/bin/clang++`, build dir `.tmp/solver-build/native-release`.

There is no CMake preset for WebAssembly. The WebAssembly configure path is owned by [scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs) through `emcmake`.

### WebAssembly Setup

The WebAssembly smoke target is gated by `ARCHITRINO_SOLVER_BUILD_WASM=ON` in [src/solver/CMakeLists.txt](../../../src/solver/CMakeLists.txt). The target:

- builds `architrino_solver_wasm_smoke.mjs` and `.wasm`;
- uses Emscripten `MODULARIZE`, `EXPORT_ES6`, and `ENVIRONMENT=web,worker,node`;
- exports allocator/runtime helpers and solver C ABI functions, including causal roots, circular roots/hits/ledger, precision diagnostics, motion sampling, constant-acceleration integration, pair interaction, geometry, assembly graph store, space-time index, emission-shell queries, path-history stream IO, and storage lifecycle.

The existing wrapper [scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs) verifies the Wasm module by importing the generated ES module and calling:

- `architrino_solver_smoke`;
- `architrino_solver_contract_smoke`;
- `architrino_solver_root_smoke`.

### Test And Check Setup

There is no root `package.json`; checks are direct script or `node --test` invocations.

Primary runtime checks inspected:

- [scripts/solver-toolchain-preflight.mjs](../../../scripts/solver-toolchain-preflight.mjs)
- [scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs)
- [scripts/benchmark-solver.mjs](../../../scripts/benchmark-solver.mjs)
- [scripts/check-solver-contract-fixtures.mjs](../../../scripts/check-solver-contract-fixtures.mjs)
- [scripts/check-solver-geometry-inventory.mjs](../../../scripts/check-solver-geometry-inventory.mjs)
- [scripts/check-solver-app-bridge.mjs](../../../scripts/check-solver-app-bridge.mjs)
- [scripts/check-solver-baseline-sandbox.mjs](../../../scripts/check-solver-baseline-sandbox.mjs)
- [scripts/check-solver-migration-parity.mjs](../../../scripts/check-solver-migration-parity.mjs)

Solver-adjacent Node tests run in this audit:

- [solver-work-packet-transport-contract.test.js](../../../tests/solver-work-packet-transport-contract.test.js)
- [solver-h39-shared-domain-primitive-replay.test.js](../../../tests/solver-h39-shared-domain-primitive-replay.test.js)

## Commands Run

| Command | Result | Evidence |
| --- | --- | --- |
| `node scripts/solver-toolchain-preflight.mjs --json` | Pass | Toolchain summary `ok: true`; Clang 22.1.7, CMake 4.3.3, Ninja 1.13.2, Emscripten 5.0.7, Boost 1.90.0_1, GMP 6.3.0, MPFR 4.2.2, libomp 22.1.0, LLVM 22.1.7_1. |
| `node --test tests/solver-work-packet-transport-contract.test.js tests/solver-h39-shared-domain-primitive-replay.test.js` | Pass | 5 tests passed, 0 failed. |
| `node scripts/build-solver-smoke.mjs all` | Fail | Preflight, contract fixtures, geometry inventory, native configure/build, assembly graph, assembly graph store, analytic, ABI smoke, contract, error budget, batch, geometry, and invariant checks passed; then `architrino_solver_motion_smoke` printed `solver motion smoke failed` and exited nonzero. |
| `.tmp/solver-build/native/architrino_solver_numeric_serialization_smoke` | Pass | `solver numeric-serialization=ok types=5`. |
| `.tmp/solver-build/native/architrino_solver_parallel_smoke` | Pass | `solver parallel=ok hardware=8 requested-workers=2`. |
| `.tmp/solver-build/native/architrino_solver_phase_smoke` | Pass | `solver phase=ok`. |
| `.tmp/solver-build/native/architrino_solver_precision_smoke` | Pass | `solver precision=ok ordinary=scaled_f64_fast large=extended_precision selected=extended_precision replay=1`. |
| `cmake --build .tmp/solver-build/native --target architrino_solver_precision_dynamic_range_smoke` | Pass | Explicit target built successfully. |
| `.tmp/solver-build/native/architrino_solver_precision_dynamic_range_smoke` | Pass | `solver precision-dynamic-range=ok charts=log_magnitude,local_frame,interval_bounds`. |
| `.tmp/solver-build/native/architrino_solver_root_ledger_smoke` | Pass | `solver root-ledger=ok rows=3 no-root=2 failure=3`. |
| `.tmp/solver-build/native/architrino_solver_root_transition_smoke` | Pass | `solver root-transition=ok retained=1 appeared=1 rerun=1`. |
| `.tmp/solver-build/native/architrino_solver_spacetime_index_smoke` | Pass | `solver spacetime-index=ok rows=24 overflow=1`. |
| `.tmp/solver-build/native/architrino_solver_storage_lifecycle_smoke` | Pass | `solver storage-lifecycle=ok`. |
| `.tmp/solver-build/native/architrino_solver_stream_smoke` | Pass | `path-history stream=ok rows=4 chunks=3 bytes=384`. |
| `.tmp/solver-build/native/architrino_solver_work_packet_smoke` | Pass | `solver work-packet=ok checksum=e07f70a306f02a64`. |
| `node scripts/build-solver-smoke.mjs wasm` | Fail | Preflight, contract fixtures, geometry inventory, Emscripten configure, Wasm build, WebAssembly smoke calls, package-manifest write, and package-manifest check passed; failed at `node scripts/check-solver-app-bridge.mjs` with `expected causal-delay pair run manifest`. |
| `node scripts/check-solver-app-bridge.mjs` | Fail | `expected causal-delay pair run manifest`. |
| `node scripts/check-solver-baseline-sandbox.mjs` | Pass | `solver baseline sandbox check passed: 17 case(s)`. |
| `node scripts/check-solver-migration-parity.mjs` | Pass | `solver migration parity check passed: 3 app(s), 17 case(s)`, report written under `.tmp/solver-migration-parity/`. |
| `node scripts/benchmark-solver.mjs` | Pass | Release benchmark built and ran 5 cases; report written to `.tmp/solver-build/benchmark/solver-benchmark-report.json`. |

## Validated Workloads

### Native Runtime Workloads

Validated native C++ workloads in this audit:

- toolchain resolution, Homebrew package resolution, and writable repo-local `EM_CACHE`;
- core C++20 Clang/Ninja build with warnings as errors;
- assembly state, membership, hierarchy, and event row validation;
- durable assembly graph store write/read/index query;
- manufactured analytic moving-source and circular-source causal-root cases;
- first ABI and contract smoke path, including causal-root fixture behavior;
- stage-level error-budget propagation;
- deterministic causal-root batch solving with native worker fan-out;
- shared geometry helpers: vector math, path bounds, sphere intersection, delayed-potential rows, circular self-hit spans, emission-shell broad/narrow phase checks;
- root/hit invariant validation;
- native numeric serialization descriptors for five declared numeric types;
- native parallel execution policy diagnostics;
- phase-at-hit diagnostics;
- precision diagnostics and precision-path selection;
- precision dynamic-range chart smoke for `log_magnitude`, `local_frame`, and `interval_bounds`;
- root-ledger detail rows and root-transition classification;
- space-time index build/query;
- storage lifecycle planning;
- path-history stream append/read/index behavior;
- work-packet header/checksum/merge-order behavior.

The native workload not validated is the motion smoke target. The failure message is not granular; the assertion block covers linear motion sampling, linear path-history sampling, constant-acceleration integration, pair-interaction integration, pair-interaction C ABI, retained-knot path constraints, and pair-interaction summary rows. Given the parallel app-bridge failure, the current live suspect is the pair-interaction motion path, but the smoke executable itself only reports the aggregate failure.

### WebAssembly And Bridge Workloads

Validated WebAssembly pieces:

- Emscripten configure and build path;
- generated `architrino_solver_wasm_smoke.mjs` / `.wasm` artifacts;
- imported ES module smoke execution in Node;
- exported smoke C ABI calls for solver, contract, and root smoke;
- package manifest write/check after Wasm build.

Not validated end-to-end:

- `check-solver-app-bridge.mjs` fails on the Causal Delay Feedback `pairInteraction` run manifest expectation;
- the Wasm wrapper therefore does not finish as a green runtime gate even though the lower-level Wasm smoke calls pass.

### Benchmarked Workloads

`node scripts/benchmark-solver.mjs` passed these Release native benchmark cases:

| Benchmark | Operations | Observations | Elapsed ms | Notes |
| --- | ---: | ---: | ---: | --- |
| `causal-root-batch` | 512 | 512 | 120.714 | deterministic indexed batch, 2 workers used |
| `causal-root-thread-scaling` | 1536 | 768 | 550.327 | 1-worker vs 4-worker checksum stable, speedup ratio 3.831322 |
| `emission-shell-broad-phase` | 36864 | 1054 | 0.764 | 35,810 rejected pairs, 1,054 candidates |
| `spacetime-index-build-query` | 11238 | 608 | 1.535 | 2,048 path rows, 512 assembly rows, 608 query matches |
| `stream-and-assembly-store-io` | 5120 | 132 | 13.686 | path-history and assembly-store IO sanity passed |

The benchmark runner checks result sanity and report consistency. It does not enforce wall-clock thresholds.

## Missing Benchmarks

The current benchmark surface is useful but not enough for closure:

- no benchmark for the failing motion / pair-interaction path;
- no benchmark for Causal Delay Feedback `pairInteraction` run manifests or dynamic replay validation;
- no WebAssembly performance benchmark, only Wasm smoke calls;
- no browser worker, transferable-buffer, or worker lifecycle benchmark;
- no sustained path-history stream benchmark with high row counts, bounded memory pressure, warm spill, cold archive, and indexed readback throughput targets;
- no benchmark with acceptance thresholds for throughput, latency, memory ceiling, or speedup regression;
- no benchmark that compares native, Wasm, and JavaScript fallback paths on the same request set;
- no benchmark that exercises `decimal128`, `mp_limb_block`, or interval-authoritative arithmetic as runtime numeric engines rather than descriptors or precision-route metadata;
- no benchmark for app bridge storage fallback behavior across caller-buffer, native-file, and future browser-backed storage.

## Precision And Runtime Gaps

Current precision/runtime gaps:

- the runtime remains `f64`-first for dense app buffers and the first ABI paths, even though numeric serialization descriptors cover stricter types;
- precision chart support is partially validated by diagnostics and dynamic-range smoke, but full encode/decode arithmetic for stricter numeric paths is not benchmarked as an authoritative runtime path;
- `architrino_solver_precision_dynamic_range_smoke` exists as a CMake target and passes when built/run explicitly, but [scripts/build-solver-smoke.mjs](../../../scripts/build-solver-smoke.mjs) does not invoke it in the native/all smoke sequence;
- native motion / pair-interaction validation is not green;
- Wasm lower-level smoke is green, but app bridge `pairInteraction` manifest validation is not green;
- app bridge failure means the central solver cannot yet be described as validated for the new Causal Delay Feedback pair-interaction runtime path;
- the benchmark suite has no explicit pass/fail performance thresholds, so benchmark success means sanity, not runtime acceptance against a declared performance budget.

## Required Before Closure

`cpp_clang_runtime_validation` can close only after:

1. `node scripts/build-solver-smoke.mjs all` exits 0 on the live tree.
2. `node scripts/check-solver-app-bridge.mjs` exits 0, including the Causal Delay Feedback `pairInteraction` manifest and dynamic replay assertions.
3. The native motion smoke failure is made granular enough to identify which motion or pair-interaction invariant failed, or the smoke is fixed and rerun green.
4. The smoke wrapper includes every intended native smoke target, including `architrino_solver_precision_dynamic_range_smoke`, or this target is explicitly documented as a separate optional check.
5. A benchmark or smoke target covers pair-interaction runtime behavior and records native/Wasm execution path expectations.
6. The benchmark acceptance boundary is declared: sanity-only, performance-budgeted, or regression-thresholded.

Until then, the status is: buildable and partially validated, benchmark-sanity green, but not closure-ready.
