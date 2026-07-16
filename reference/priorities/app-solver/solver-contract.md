# Solver Contract

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closed-contract-baseline`

Kind: `solver-contract-closeout`

Source task: `solver_contract` in [priorities.md](priorities.md)

Primary dependencies:

- [model-contract.md](model-contract.md)
- [simulation-envelope-contract.md](simulation-envelope-contract.md)
- [precision-dynamic-range-contract.md](precision-dynamic-range-contract.md)
- [numeric-serialization-contract.md](numeric-serialization-contract.md)
- [virtual-observer-path-record-contract.md](virtual-observer-path-record-contract.md)
- [temporal-assembly-graph-contract.md](temporal-assembly-graph-contract.md)
- [path-history-stream-contract.md](path-history-stream-contract.md)
- [storage-lifecycle-policy.md](storage-lifecycle-policy.md)
- [work-packet-transport-contract.md](work-packet-transport-contract.md)
- [threading-execution-policy.md](threading-execution-policy.md)
- [app-bridge-contract.md](app-bridge-contract.md)
- [cpp-clang-runtime-validation.md](cpp-clang-runtime-validation.md)
- [gpu-acceleration-deferral.md](gpu-acceleration-deferral.md)

Implementation surfaces:

- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json)
- `src/solver/app/SolverAppBridgeContract.d.ts`
- `src/solver/app/SolverAppBridge.mjs`
- `src/solver/include/architrino/solver/SolverTypes.hpp`
- `src/solver/include/architrino/solver/SolverContract.hpp`
- `src/solver/include/architrino/solver/SolverCAbi.hpp`
- `src/solver/src/SolverContract.cpp`
- `src/solver/src/SolverCAbi.cpp`
- `scripts/check-solver-contract-fixtures.mjs`
- `scripts/check-solver-app-bridge.mjs`
- `scripts/build-solver-smoke.mjs`
- `scripts/benchmark-solver.mjs`

## Contract Boundary

The solver contract is the shared schema and API baseline for architrino motion,
causal-root, delayed-hit, path-history, geometry, validation, app bridge, and
batch/runtime execution. It defines what a run request must declare, how dense
and stream-backed outputs are described, which status and halt semantics are
valid, and which artifacts prove replay, export, migration parity, or validation
authority.

This closeout does not claim final app migration, production default replacement,
stage-level performance acceptance, or proof-program backend completeness. Those
belong in future scoped tasks that consume this contract.

## Requirement Map

| Requirement from `solver_contract` | Contract baseline |
| --- | --- |
| Central inputs | `solverRunRequest`, `solverRunConfig`, run kind configs, model, claim level, simulation envelope, output request, precision route, storage policy, and threading policy are schema-defined and TypeScript-defined. |
| Central outputs | `solverRunHandle`, `solverRunResponse`, `solverRunSummary`, run descriptions, stream handles, dense buffer descriptors, diagnostics, and normalized status records are schema-defined and bridge-defined. |
| Dataset schema | Run manifests preserve buffers, streams, path-history summaries, validation artifacts, artifact hashes, admission results, threading plans, precision metadata, and provenance. |
| Model schema | [model-contract.md](model-contract.md) defines model id, equation version, force-law version, constants hash, causal speed policy, branch policy, unit convention, compatible precision paths, claim-level relation, and fail-closed behavior. |
| Simulation-envelope schema | [simulation-envelope-contract.md](simulation-envelope-contract.md) defines entity count, scale, duration, time resolution, interaction density, branch complexity, precision claim, output detail, budgets, latency, simplification, and admission decisions. |
| Virtual-observer path records | [virtual-observer-path-record-contract.md](virtual-observer-path-record-contract.md) defines the minimal segment-level path record, interpolation law, frame, numeric type, error bounds, and attachment boundary. |
| Assembly schemas | [temporal-assembly-graph-contract.md](temporal-assembly-graph-contract.md) defines assembly state, membership, hierarchy, events, identity lifecycle, nested assemblies, and interval joins. |
| Path-history stream schema | [path-history-stream-contract.md](path-history-stream-contract.md) defines stream manifests, chunk records, dictionaries, event stores, index sidecars, summaries, memory budgets, age-out, deep index, and recovery fixtures. |
| Numeric serialization schema | [numeric-serialization-contract.md](numeric-serialization-contract.md) defines byte order, signedness, scale, exponent/limb layout, interval endpoint convention, rounding, comparison, export, and validation rules for all declared numeric types. |
| App bridge schema | [app-bridge-contract.md](app-bridge-contract.md) defines the direct client, worker protocol, capabilities, run/stream/cancel/dispose methods, app request builders, and validation-check coverage. |
| Threading metadata | [threading-execution-policy.md](threading-execution-policy.md) defines policy mode, worker counts, deterministic mode, fallback reasons, scheduling diagnostics, chunk timings, and speedup summaries. |
| Diagnostics and halt statuses | The status taxonomy covers `ok`, `info`, `warning`, `halt`, and `error` severities, with normalized solver, app-contract, precision, envelope, stream, storage, worker, and threading status codes. |
| Precision metadata | Run precision metadata, precision route capabilities, error-budget propagation, value authority, numeric chart, selected precision path, and validation replay metadata are schema-defined. |
| Storage metadata | Storage lifecycle policy, stream target, native-file/caller-buffer handling, tier metadata, cleanup, quota, export, deletion, active-window, and deep-index metadata are schema-defined. |
| API boundaries | The bridge uses handles, request ids, run ids, stream ids, dataset ids, immutable dense buffers, stream handles, and normalized errors; apps do not own C++ or WebAssembly internals. |
| Root-ledger completeness rows | Root-ledger detail rows carry retained roots, inactive/failure rows, source/receiver ids, root kind, residuals, Jacobian sign strata, first-failure status, branch metadata, and forensic precision fields. |
| Phase-at-hit metadata | Phase-at-hit request, row, summary, cycle, layer, role, charge, status-count, and spread fields are schema-defined and bridge-checked. |
| Failure-code taxonomy | Failure records distinguish app contract errors, precision failure, simulation-envelope exceeded, unsupported browser storage, unsupported WebAssembly threading, insufficient history depth, unresolved roots, validation mismatch, and other normalized solver statuses. |
| Provenance artifacts | Run manifests preserve model contract hashes, simulation envelope hashes, precision hashes, threading hashes, storage/stream hashes, provenance hashes, artifact hashes, validation artifacts, and migration/baseline comparison results. |

## Validation Evidence

The contract baseline is supported by current checks:

1. `scripts/check-solver-contract-fixtures.mjs`
   verifies the app-bridge schema entrypoint, worker-message schemas, capability
   schemas, run request/response schemas, binary layouts, model contract,
   simulation envelope, manifests, validation artifacts, storage lifecycle,
   path-history stream artifacts, root ledger, phase-at-hit, threading plan,
   numeric serialization, assembly graph, space-time index, motion, geometry, and
   all fixture-backed request/response variants.
2. `scripts/check-solver-app-bridge.mjs`
   exercises direct client initialization, capabilities, app adapters, ABI sizes,
   status taxonomy, precision routing, admission, threading plans, work-packet
   helpers, assembly graph, root ledgers, phase-at-hit rows, path-history streams,
   storage lifecycle, run manifests, worker dispatch, cancellation, disposal, and
   app-contract error normalization.
3. `scripts/build-solver-smoke.mjs` validates
   the native C++/Clang smoke path, WebAssembly smoke calls, package manifest,
   app bridge, baseline sandbox, and migration parity together.
4. `scripts/benchmark-solver.mjs` provides the
   current benchmark-sanity report for causal-root, thread-scaling,
   emission-shell broad-phase, space-time index, stream/store IO, path-history
   spill, readback, deep-index, and recovery-detection cases.

## Future Scoped Work

The contract baseline intentionally leaves these items outside its closeout:

- full app migration and removal of app-local fallback or display geometry;
- stage-level performance thresholds for native, WebAssembly, worker, stream,
  storage, and app bridge workloads;
- full arbitrary-precision runtime arithmetic kernels for every solver family;
- the full analytic/invariant fixture matrix beyond the current plan and smoke
  coverage;
- H39 provider-object theorem schemas and proof-program-specific source-map
  objects;
- default replacement of Photon, Animator, or Ideal Braid app-local solver paths.

## Completion Judgment

`solver_contract` is complete as the central schema/API contract baseline. The
required input, output, dataset, model, simulation-envelope, path-record,
assembly, stream, numeric, app-bridge, threading, diagnostic, halt, precision,
storage, root-ledger, phase-at-hit, failure-taxonomy, and provenance surfaces are
defined and checked together.

Future scoped work remains implementation and migration breadth, not the absence
of a zombie-solver contract.
