# Minimal Causal-Root Core

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closed-first-core-smoke`

Kind: `solver-core-closeout`

Source task: `minimal_causal_root_core` in [priorities.md](priorities.md)

Primary dependencies:

- [solver-contract.md](solver-contract.md)
- [cpp-clang-runtime-validation.md](cpp-clang-runtime-validation.md)
- [baseline-comparison-sandbox.md](baseline-comparison-sandbox.md)
- [geometry-centralization-inventory.md](geometry-centralization-inventory.md)

Implementation surfaces:

- `src/solver/CMakeLists.txt`
- `src/solver/README.md`
- `src/solver/include/architrino/solver/SolverCAbi.hpp`
- `src/solver/src/SolverCAbi.cpp`
- `src/solver/src/CausalRootSolver.cpp`
- `src/solver/src/CausalRootBatchSolver.cpp`
- `src/solver/src/MotionSampler.cpp`
- `src/solver/src/PrecisionPathSolver.cpp`
- `src/solver/src/RootLedger.cpp`
- `src/solver/src/RootLedgerTransition.cpp`
- `src/solver/src/PathHistoryStream.cpp`
- `src/solver/src/AssemblyGraph.cpp`
- `src/solver/src/SpaceTimeIndex.cpp`
- `src/solver/src/WorkPacket.cpp`
- `src/solver/app/SolverAppBridge.mjs`
- `src/solver/app/SolverAppAdapters.mjs`
- `scripts/build-solver-smoke.mjs`
- `scripts/benchmark-solver.mjs`

## Core Boundary

The minimal core is the first zombie-solver implementation slice that can solve
and package causal roots, delayed hits, motion/path-history rows, precision
diagnostics, root-ledger diagnostics, assembly graph rows, app bridge runs,
threading diagnostics, and benchmark cases through one shared C++/WebAssembly
and JavaScript bridge surface.

It is not the final physical model implementation, full app migration, or
production default replacement for app-local fallback logic.

## Required Surface Coverage

| Required surface | Current first-core support |
| --- | --- |
| Source histories | Fixed-layout linear, normalized, circular-source, path-history, and stream-backed source/receiver inputs are exposed through C ABI and bridge request shapes. |
| Causal roots | Native linear, circular-source, normalized, precision-routed, batch, and run-handle causal-root paths exist. |
| Delayed hits | Roots-and-hits, delayed-hit event projection, circular-source roots/hits/ledger, delayed-potential rows, and app run shapes are exposed. |
| Branch diagnostics | Root-ledger detail rows, Jacobian sign strata, branch weights, first-failure rows, inactive/failure rows, and root-transition classifications are exposed. |
| Precision diagnostics | Precision routing, dynamic-range diagnostics, selected precision paths, numeric charts, validation replay metadata, and error-budget propagation are exposed. |
| Simulation-envelope diagnostics | Admission validates model/envelope/error-budget inputs and returns admit, simplify, batch, precision-escalate, or reject decisions with stress summaries. |
| Virtual-observer path-record output | Path-history row and stream metadata preserve path id, time/frame ranges, coordinate frame, interpolation, numeric type, authority, error bounds, and replay metadata. |
| Temporal assembly graph output | Assembly state, membership, hierarchy, events, store/index/readback, and membership-change detection are exposed. |
| Streaming output | Path-history streams write/read chunked `path_segment.v1` buffers, stream indices, range selections, native-file manifests, lifecycle plans, and dynamic replay checks. |
| App bridge output | `runSimulation`, direct helper calls, worker protocol, manifest packaging, buffer descriptors, stream descriptors, cancellation, close, describe, and replay surfaces are exposed. |
| Threading diagnostics | Native bounded batch execution and app-facing threading plans report worker counts, deterministic status, fallback reasons, queue depth, contention, timings, and speedup summaries. |
| Benchmark hooks | Native benchmark cases cover causal-root batches, thread scaling, emission-shell broad phase, space-time index, stream/store IO, path-history spill/readback/deep-index/recovery, and benchmark report generation. |

## Validation Evidence

Current closeout evidence:

- `scripts/build-solver-smoke.mjs` passes the
  native C++ smoke targets, WebAssembly smoke calls, package manifest,
  app-bridge check, baseline sandbox, and migration parity.
- `scripts/check-solver-app-bridge.mjs`
  passes direct and worker bridge coverage for roots, roots/hits, circular-source
  ledgers, normalized runs, precision paths, motion/path-history, assembly graph,
  stream/readback, threading plans, work packets, admission, status taxonomy, and
  app adapters.
- `scripts/benchmark-solver.mjs` passes the
  current Release benchmark sanity suite.
- [cpp-clang-runtime-validation.md](cpp-clang-runtime-validation.md) records the
  full runtime closeout evidence from 2026-06-20.

## Future Scoped Work

Remaining work belongs to app migration and production breadth:

- remove app-local fallback geometry only after adapter-specific parity remains
  green with solver-owned rows;
- add stage-level performance thresholds before making any threaded, Wasm,
  worker, stream, or app bridge path a preferred production default;
- extend strict arbitrary-precision arithmetic kernels beyond descriptors and
  routing metadata;
- extend branch-search outputs from root-ledger rows to canonical assembly
  topological charge reports $[\mathfrak B]_{\mathrm{top}}=(N_s,M_p,c_1)$
  when a binary or three-binary retained-branch promotion claim consumes them;
- add more analytic/invariant fixtures under the completed validation plan;
- keep H39 provider-object proof schemas outside this core until explicitly
  reopened.

## Completion Judgment

`minimal_causal_root_core` is complete as a first zombie-solver core smoke
baseline. The core has source histories, root solving, delayed-hit projection,
branch diagnostics, precision diagnostics, simulation-envelope diagnostics,
virtual-observer path-record output, temporal assembly graph output, stream
output, app-bridge output, threading diagnostics, and benchmark hooks wired
together and checked.

Future scoped migration and proof-boundary work would extend this baseline; it
does not block closure of the minimal causal-root core.
