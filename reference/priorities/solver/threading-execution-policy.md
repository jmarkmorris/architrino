# Threading Execution Policy

Status: `ready-to-close`

Kind: `solver-execution-policy`

Source task: `threading_execution_policy` in [solver.md](solver.md)

Primary dependencies:

- [simulation-envelope-contract.md](simulation-envelope-contract.md)
- [precision.md](precision.md)
- [path-history-stream-contract.md](path-history-stream-contract.md)
- [numeric-serialization-contract.md](numeric-serialization-contract.md)

Implementation surfaces:

- [SolverAppBridgeContract.d.ts](../../../src/solver/app/SolverAppBridgeContract.d.ts)
- [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs)
- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json)
- [ParallelExecution.hpp](../../../src/solver/include/architrino/solver/ParallelExecution.hpp)
- [CausalRootBatchSolver.hpp](../../../src/solver/include/architrino/solver/CausalRootBatchSolver.hpp)
- [solver_benchmark.cpp](../../../src/solver/native/solver_benchmark.cpp)

## Purpose

This policy defines how the central solver chooses single-threaded execution,
browser-worker execution, native thread-pool execution, WebAssembly-thread
execution, and future GPU-ready work partitions. It is an execution contract
for architrino motion, causal-root, delayed-hit, path-history, index, replay,
and batch work. It is not a request to edit runtime code and it does not make a
GPU backend part of the first solver core.

Threading is useful only when it preserves the solver's claim level. A faster
run that changes retained roots, root labels, path-history rows, stream
checksums, precision status, or validation artifacts is a failed threaded run,
not a successful optimization.

## Policy Boundary

The execution policy owns:

- selecting a backend from the run envelope and available capabilities;
- bounding worker counts before work begins;
- partitioning independent work into deterministic packets;
- preserving deterministic reduction when the run requires it;
- reporting active workers, queue depth, contention, chunk timings, speedup,
  fallback reasons, and unsupported capability diagnostics;
- keeping CPU packets compatible with later GPU or service execution where
  that improves present CPU structure.

The execution policy does not own:

- the physical model, force law, precision path, or error budget;
- app visual layout, renderer behavior, or app-specific C++ and WebAssembly
  handling;
- GPU kernel implementation;
- promotion of a threaded path to default status without benchmark evidence.

## Execution Classes

| Class | Use | Required behavior |
| --- | --- | --- |
| `single-thread` | Baseline, deterministic fallback, small workloads, unsupported browser capabilities, and validation replay. | Execute in stable item order and emit a complete threading plan with one active worker when work exists. |
| `browser-worker` | App responsiveness baseline. The shared bridge runs off the UI thread and owns WebAssembly lifecycle. | Use typed transferables or stream handles where practical; do not treat one browser worker as internal solver parallelism. |
| `native-threads` | Native CLI, native batch, and native smoke or benchmark runs where independent work items can scale. | Use a bounded task pool, fixed output slots, deterministic merge, and benchmark-backed promotion. |
| `wasm-threads` | Browser or worker execution only when capability, isolation, determinism, and benchmarks allow. | Gate on capability detection; fall back with diagnostics when unavailable or unsafe. |
| future GPU or service backend | Deferred acceleration path. | Preserve packet, stream, and reduction contracts so the app-facing schema does not depend on a device vendor or execution device. |

The first app-facing baseline is a browser worker running the shared solver
bridge. It keeps apps responsive and avoids app-specific WebAssembly handling.
It is not by itself a speedup claim. Internal solver parallelism begins only
when the selected backend reports native or WebAssembly thread capability and
the workload admits safe partitioning.

## Native Bounded Task Pool

Native threaded execution uses bounded independent work packets. The worker
count is capped by:

1. the requested `maxThreads` or requested batch worker count;
2. available native hardware concurrency;
3. the number of work items;
4. the `minItemsPerWorker` floor;
5. any memory, storage, precision, or determinism limit declared by the
   simulation envelope.

The task pool must not spawn one thread per root, branch, path, event, or app
object. Work is divided into coarse packets such as:

- source-receiver causal-root solves;
- delayed-hit or same-source root batches;
- path-history chunk encoding;
- stream index rows or deep-index blocks;
- broad-phase geometry blocks;
- offline replay chunks;
- benchmark parameter rows.

Each packet must have a stable item id, stable input slice, stable output slot,
and declared stage. Workers may execute packets dynamically, but outputs are
merged by item id or declared chunk order. Exceptions, root failures, precision
failures, and stream failures are converted into status records on the
affected item or stage instead of escaping as partial authoritative output.

## Browser Worker Baseline

Browser execution has two separate layers:

1. A browser worker keeps long solver work off the UI thread.
2. WebAssembly threads provide internal parallel execution only when supported
   and selected.

The baseline app path is the first layer. Apps should call the shared bridge
through the JavaScript or TypeScript request and response API. The bridge owns
the WebAssembly module lifecycle, request normalization, stream handles,
typed-buffer transfer, cancellation, and normalized error records. Apps do not
need app-specific C++ or WebAssembly handling.

Long browser runs should prefer stream-backed output and bounded in-worker
memory. If the browser cannot supply durable storage, internal threads, or
enough memory for the requested claim level, the bridge must choose a
single-worker or batch fallback, or reject the run through the simulation
envelope.

## Deterministic Mode

Deterministic mode is required for:

- migration-parity runs;
- exported datasets;
- validation-evidence runs;
- benchmark runs;
- any run whose output becomes a root ledger, path-history authority,
  precision artifact, or app migration comparison.

Interactive preview may request relaxed mode only when the manifest labels the
result as preview or display-only. Relaxed mode cannot publish authoritative
roots, path-history chunks, stream checksums, validation parity, or migration
parity.

Deterministic execution requires:

- stable item ids and packet boundaries;
- stable output ordering independent of worker completion order;
- deterministic reduction order for sums, branch weights, checksums, and
  aggregate diagnostics;
- fixed tie policies for partition boundaries and root deduplication;
- no nondeterministic atomic accumulation into authoritative values;
- replayable chunk, stream, and manifest hashes;
- comparison against the single-thread baseline when a threaded path is first
  promoted for a stage.

If a workload declares `deterministicRequired` and the request does not select
deterministic threading, the plan must report `required-but-not-requested` and
an `app_contract_error` status. The solver must not silently downgrade a
deterministic claim to relaxed execution.

## WebAssembly-Thread Gating

WebAssembly threads are allowed only when all of these are true:

- the bridge capability report says WebAssembly threads are available;
- browser-worker execution is available for long-running app work;
- required cross-origin isolation and SharedArrayBuffer conditions are
  satisfied by the host page;
- the selected workload can preserve deterministic reduction when the claim
  level requires it;
- the requested output can fit the browser memory and storage envelope;
- a benchmark or observed workload report shows material speedup for the
  selected stage.

If any gate fails, the bridge must fall back to `single-thread` or a
single-solver-worker or batch path and report the reason. The normalized
fallback reason for missing WebAssembly-thread support is
`wasm_threads_unavailable`; unsupported capability diagnostics should include
the stage and requested worker count when available.

Current native helper behavior treats Emscripten builds as sequential unless a
future WebAssembly-thread path is explicitly wired and benchmarked. That is the
correct fail-closed default.

## Thread-Count Controls

App-facing policy uses:

```text
threadingPolicy:
  mode: single-thread | auto | fixed
  maxThreads: optional positive integer
  deterministic: boolean
```

Workload planning uses:

```text
workload:
  stage: string
  itemCount: nonnegative integer
  minItemsPerWorker: optional positive integer
  deterministicRequired: optional boolean
  observations:
    chunkDurationsMs: optional number list
    singleThreadElapsedMs: optional number
    activeElapsedMs: optional number
    contentionWaitMs: optional number
```

Control rules:

- `single-thread` selects one worker for nonempty workloads and zero workers
  for empty workloads.
- `auto` may use more than one worker only when capability, item count,
  `minItemsPerWorker`, determinism, and envelope pressure allow it.
- `fixed` is a capped request, not an entitlement; the solver still caps by
  items, hardware, capability, and budgets.
- `maxThreads` is an upper bound. It must not force oversubscription when the
  workload has too few packets.
- `minItemsPerWorker` protects small workloads from thread overhead.
- The selected active worker count and scheduling mode are part of the run
  manifest and diagnostics.

## Diagnostics

Every planned run or explicit threading-plan request must emit
`solver-threading-plan.v1` or a compatible successor with:

| Field | Required meaning |
| --- | --- |
| `stage` | Workload stage, such as causal-root batch, path-history stream write, index build, replay, or app run kind. |
| `itemCount` | Number of independent items considered by the planner. |
| `requestedWorkerCount` | Worker count requested by policy after item-count and `maxThreads` normalization. |
| `activeWorkerCount` | Worker count actually selected. |
| `schedulingMode` | `idle`, `sequential`, `native-thread-pool`, or `wasm-thread-pool`. |
| `backend` | `single-thread`, `native-threads`, or `wasm-threads`. |
| `deterministicReduction` | Whether reduction and output merge use deterministic order. |
| `browserWorkerAvailable` | Whether a browser worker is available for off-UI-thread app execution. |
| `wasmThreadsAvailable` | Whether internal WebAssembly threads are available. |
| `nativeThreadsAvailable` | Whether native threads are available. |
| `fallbackReason` | Normalized reason such as `wasm_threads_unavailable`, or `null`. |
| `plannedChunkCount` | Number of planned work chunks. |
| `plannedChunkItemCount` | Normal chunk size. |
| `tailChunkItemCount` | Tail chunk size. |
| `queueDepth` | Planned chunks beyond immediately active workers. |
| `determinismStatus` | `deterministic`, `relaxed`, or `required-but-not-requested`. |
| `contention` | Queue, oversubscription, and observed wait diagnostics. |
| `chunkTimings` | Observed chunk timing summary when the caller supplies observations. |
| `stageSpeedup` | Observed speedup summary against a single-thread baseline when measured. |
| `statuses` | Capability, fallback, contract, warning, or error records. |

Run manifests should preserve a hash of the threading plan so exported
datasets and benchmark artifacts can prove which execution policy produced
them.

## Speedup Criteria

A threaded path is allowed to exist before it is preferred. It becomes the
preferred path for a stage only after benchmark evidence satisfies all of
these criteria:

1. Correctness parity: single-thread and threaded runs produce the same root
   count, retained-root labels, first-failure statuses, stream row counts, and
   checksum within the stage's declared tolerance.
2. Determinism parity: repeated deterministic threaded runs produce stable
   manifest, stream, and diagnostic hashes, except for declared timing fields.
3. Material speedup: median `speedupRatio` is at least `1.25` for the target
   stage, or the stage-specific benchmark file declares and justifies a
   stricter or looser threshold.
4. Parallel efficiency: `parallelEfficiency` is at least `0.35` for the chosen
   worker count, unless the stage is explicitly batch-throughput oriented and
   the benchmark records why lower efficiency still improves total throughput.
5. Resource safety: memory high-water, storage pressure, contention wait, and
   queue depth remain inside the simulation envelope.
6. Claim preservation: the selected precision path, error budget, and claim
   level are unchanged or escalated only to a stricter path.

If a workload fails the speedup criteria but passes correctness, it remains a
supported fallback or experimental path. If it fails correctness or
determinism, it must not be used for authoritative output.

The existing benchmark family should keep at least one
single-worker-versus-bounded-worker causal-root batch comparison and must fail
when threading changes root counts or checksums outside tolerance. Additional
benchmarks should cover path-history chunk work, stream index builds, broad
phase geometry, and app-scale replay before those stages are promoted to
threaded defaults.

## Fallback Behavior

Fallback is normal, not exceptional. The solver must downshift when capability,
envelope, determinism, precision, memory, storage, or benchmark criteria do not
support threaded execution.

Required fallback rules:

- missing WebAssembly threads -> single solver worker or batch path with
  `wasm_threads_unavailable`;
- missing browser worker for long app runs -> reject, batch natively, or use a
  caller-provided client; do not block the UI with long authoritative work;
- deterministic requirement not satisfiable by the selected threaded backend
  -> deterministic single-thread or reject;
- memory or storage pressure from parallel chunks -> lower active worker count,
  stream earlier, batch offline, or halt with envelope diagnostics;
- precision escalation that makes threaded kernels unsafe -> stricter
  single-thread or batch execution;
- worker failure -> cancel the affected run, preserve recoverable artifacts
  only when checksums and manifests are complete, and emit normalized status
  records.

Fallback must not weaken claim level. A caller may submit a separate preview or
reduced-model request, but the solver cannot silently turn validation evidence
into display-only output.

## GPU-Ready CPU Partitioning

GPU acceleration remains deferred. The present policy still benefits CPU
execution by using GPU-ready partitioning principles where they make CPU work
clearer and faster:

- structure dense work as arrays of packets rather than object graphs;
- use structure-of-arrays layouts for hot numeric columns when practical;
- keep packet inputs immutable during execution;
- write packet outputs to stable slots and merge in declared order;
- separate broad-phase candidate generation from exact root or hit solving;
- keep reductions explicit, typed, and reproducible;
- preserve chunk ids, stream ids, row counts, numeric encodings, and checksums
  at packet boundaries;
- keep app-facing schemas independent of native, WebAssembly, service, or GPU
  device details.

These rules help native CPU threads today. They also make later Metal, WebGPU,
CUDA, service, or other accelerator experiments possible without rewriting the
app bridge or solver artifact vocabulary.

## Bridge V1 Alignment

| Policy area | Current alignment | Remaining pressure |
| --- | --- | --- |
| App policy shape | `SolverThreadingPolicy` exposes `mode`, `maxThreads`, and `deterministic`. | No new runtime field is required for this policy closeout. |
| Workload plan shape | `SolverThreadingPlanRequest` carries stage, item count, `minItemsPerWorker`, determinism requirement, and optional timing observations. | More stage-specific workload estimators can be added as app migration expands. |
| Diagnostics | `solver-threading-plan.v1` carries active workers, scheduling mode, backend, capability flags, fallback reason, chunk plan, contention, timing, speedup, and statuses. | Stage-level benchmark artifacts should be attached before making threaded execution the default for a stage. |
| Native bounded execution | Native helpers cap workers by request, item count, hardware, and `minItemsPerWorker`, and batch causal-root results merge by indexed output slots. | Additional stages should reuse the same bounded-packet pattern rather than adding ad hoc thread loops. |
| Browser baseline | The shared app bridge and worker runtime let apps run through a solver worker while the bridge owns WebAssembly lifecycle. | App migrations should continue using the bridge instead of app-specific C++ or WebAssembly handling. |
| WebAssembly threads | Capability and fallback diagnostics exist; unsupported threads fall back to sequential bridge execution. | Internal WebAssembly-thread execution remains gated until browser support, isolation, determinism, and benchmarks justify it. |
| Benchmark hook | The native benchmark suite includes a deterministic single-worker versus bounded-worker causal-root comparison. | Performance closure for each promoted stage still needs target-machine and target-workload benchmark evidence. |

## Closure Decision

`threading_execution_policy` can close as a policy-definition task when
[solver.md](solver.md) is open for administrative queue edits. This file
defines the native bounded task pool policy, browser worker baseline,
deterministic mode, WebAssembly-thread gating, thread-count controls,
diagnostics, speedup criteria, fallback behavior, and GPU-ready partitioning.

It should not be closed as a performance-acceptance task. Stage-level threaded
defaults still need benchmark reports before the solver claims material speedup
for causal-root batches, path-history chunks, stream index builds, broad-phase
geometry, replay, or app migration workloads.
