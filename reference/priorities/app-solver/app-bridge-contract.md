# App Bridge Contract

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closeout-complete`

Kind: `contract-closeout`

Source task: `app_bridge_contract` in [priorities.md](priorities.md)

Primary dependencies:

- [precision-dynamic-range-contract](precision-dynamic-range-contract.md)
- [simulation-envelope-contract](simulation-envelope-contract.md)
- [path-history-stream-contract](path-history-stream-contract.md)
- [work-packet-transport-contract](work-packet-transport-contract.md)

Implementation surfaces:

- `src/solver/app/SolverAppBridge.mjs`
- `src/solver/app/SolverAppWorkerBridge.mjs`
- `src/solver/app/SolverAppBridgeContract.d.ts`
- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json)
- `scripts/check-solver-app-bridge.mjs`
- `scripts/check-solver-contract-fixtures.mjs`

## Purpose

The app bridge is the single app-facing contract for zombie-solver use. Apps submit structured JavaScript or TypeScript requests, receive normalized responses, and consume dense buffers or stream handles without knowing C++ object ownership, WebAssembly lifecycle details, native-file stream internals, or app-specific solver glue.

The contract covers both the direct bridge client and the worker protocol. The worker protocol preserves the same method names and request/response shapes while moving execution off the app caller's immediate thread. Current app ids are `animator`, `photon`, `ideal-braid`, and `causal-delay-feedback`.

## Contract Boundary

The app bridge owns:

- bridge initialization and capability discovery;
- typed request and response envelopes;
- run handles, run descriptions, cancellation, close, and disposal;
- stream handles, stream descriptions, range readback, and manifest-path readback;
- normalized status records and bridge errors;
- dense buffer descriptors and transferable payload collection;
- worker request/response messages under `solver-app-worker/v1`;
- shared app request builders and resolver paths that keep app code away from C++ and WebAssembly details.

The app bridge does not own:

- the physical model, force law, constants, or branch policy;
- numeric byte layout, which belongs to [numeric-serialization-contract](numeric-serialization-contract.md);
- precision-path semantics, which belong to [precision-dynamic-range-contract](precision-dynamic-range-contract.md);
- path-history storage layout, which belongs to [path-history-stream-contract](path-history-stream-contract.md);
- work-packet ownership and merge semantics, which belong to [work-packet-transport-contract](work-packet-transport-contract.md);
- app migration acceptance, baseline parity, or removing app-local code.

## Required Client Surface

The direct `SolverClient` and worker client must expose these stable method groups:

| Group | Required methods |
| --- | --- |
| Lifecycle | `init`, `capabilities`, `dispose` |
| Admission and run control | `admitSimulationEnvelope`, `runSimulation`, `describeRun`, `cancelRun`, `closeRun` |
| Stream control | `describeStream`, `openStream`, `readStreamRange`, `validatePathHistoryDynamicReplayF64` |
| Precision and validation helpers | `diagnosePrecisionF64`, `solveCausalRootsPrecisionF64`, `solveRootsAndHitsPrecisionF64`, `propagateErrorBudgetF64`, `checkRootHitInvariantsF64`, `classifyRootLedgerTransitionsF64` |
| Solver kernels exposed to apps | causal-root, circular-source, delayed-hit, phase, motion, shared-geometry, assembly graph, spacetime-index, emission-shell, and root-refinement helpers |
| Work and storage helpers | `prepareWorkPacketHeader`, `orderWorkPacketResults`, `planPathHistoryWorkPackets`, `planPathHistoryStorageLifecycleF64`, `applyPathHistoryStorageLifecycleF64` |

Adding a method requires updating the TypeScript client, worker method list, JSON schema envelope when the method crosses the worker or request-envelope boundary, bridge implementation, capabilities if discoverable, fixture generator, and app bridge check together.

## Run Contract

`runSimulation` is the primary app-facing execution surface. It must return a run handle with:

- `requestId`, `runId`, and `datasetId`;
- normalized status;
- accepted or selected precision path when the run performs solver work;
- response payload or completed dataset summary;
- run manifest metadata;
- diagnostics;
- dense buffer descriptors when dense data is returned;
- stream descriptors when the run emits stream-backed data.

Supported `SolverRunKind` values are:

- `motionSimulation`
- `pathHistory`
- `causalRoots`
- `phaseDiagnostics`
- `delayedHits`
- `sharedGeometry`
- `appPlayback`
- `pairInteraction`
- `validationReplay`

Root-solving and delayed-hit run requests must preserve exact-one request discipline for ordinary, normalized, circular-source, or normalized circular-source inputs. Normalized runs must label local-coordinate results as authoritative and absolute-display projections as display-only.

## Stream Contract

Streams are bridge-owned handles over path, root, hit, geometry, index, or derived datasets. App readers must be able to:

- open a registered stream id or durable manifest path;
- describe stream metadata without reading dense payloads;
- read selected ranges by stream id, time range, frame range, byte range, row range, chunk index, path key, or layout-specific filters where supported;
- preserve stream value authority, app-buffer authority, precision metadata, checksums, and range metadata;
- release stream handles with `closeRun` or `dispose`.

`readStreamRange` must reject invalid ranges with normalized app-contract errors, not partial ambiguous data. A projection read cannot satisfy authoritative replay unless the stream metadata points back to the authoritative rows and error bounds.

## Worker Protocol

The worker bridge uses `solver-app-worker/v1` messages:

```text
request
  schema: "solver-app-worker/v1"
  type: "request"
  requestId
  method
  request

response
  schema: "solver-app-worker/v1"
  type: "response" | "error"
  requestId
  method
  response or status
```

The worker handler must validate method names, normalize errors into solver status records, transfer dense buffers where possible, reject requests after disposal, and expose the same method set as the direct app bridge for supported calls.

## Capabilities

`capabilities()` must expose enough metadata for an app to choose a supported path before starting a run:

- API version and solver version;
- app ids and available app adapters;
- supported run kinds;
- precision paths and precision-routing capabilities;
- binary layout catalog;
- numeric serialization contract;
- error-budget propagation contract;
- status taxonomy;
- stream query capabilities;
- work-packet capabilities;
- storage support and browser/native fallback posture;
- worker model and threading support flags.

Capabilities are discovery metadata, not permission to weaken a run's model, precision, storage, or claim-level obligations.

## Implemented Support

| Requirement | Current support |
| --- | --- |
| Direct shared client | Implemented by `createSolverAppBridgeClient` in `src/solver/app/SolverAppBridge.mjs`. |
| Worker protocol | Implemented as `solver-app-worker/v1` in `src/solver/app/SolverAppWorkerBridge.mjs`. |
| TypeScript declaration surface | Implemented as `SolverClient`, run, stream, status, capability, storage, work-packet, and lifecycle declarations in `src/solver/app/SolverAppBridgeContract.d.ts`. |
| JSON schema | Implemented in [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json), including worker methods, request/response envelopes, status records, capabilities, storage policy, run outputs, stream readback, storage lifecycle, and work-packet helpers. |
| App request builders | Implemented in `src/solver/app/SolverAppAdapters.mjs` for shared run requests, Photon, Ideal Braid, Animator, Causal Delay Feedback, path-history streams, storage lifecycle, work packets, emission-shell queries, and validation replay. |
| Capability declaration | Implemented as `solver-app-bridge-capabilities.v1`, with app adapters, dense transport, worker model, browser/native storage fallback, precision routing, status taxonomy, stream-query helpers, and work-packet helpers. |
| Direct and worker smoke coverage | Implemented in `scripts/check-solver-app-bridge.mjs`, including direct client calls, worker dispatch, stream reads, manifest-path reads, cancellation, close, dispose, lifecycle application, native-file streams, packetized emission-shell queries, `native_c_abi_indexed_v0` index-option execution, and normalized contract errors. |
| Schema and fixture drift guard | Implemented in `scripts/check-solver-contract-fixtures.mjs`, which checks schema/runtime method parity, contract fixtures, nested stream and lifecycle artifacts, work-packet fixtures, app bridge capabilities, and fixture-backed request/response schemas. |

## Validation Obligations

1. JSON schema validation must cover capabilities, run simulation, cancellation, close, stream open/read, worker messages, and all fixture-backed request/response variants.
2. TypeScript declarations must expose the same method names and schema shapes as the bridge implementation.
3. The app bridge check must exercise direct client initialization, capabilities, run shapes, cancellation, close/dispose behavior, stream open/read/manifest-path readback, worker client dispatch, worker disposal, and app-contract error normalization.
4. Capability checks must prove that app bridge, status taxonomy, stream query, binary layout, numeric serialization, precision routing, and work-packet capability blocks are present.
5. Worker tests must prove `solver-app-worker/v1` request/response/error messages preserve `requestId`, method, response, status, and transferables.
6. Run fixtures must prove `runSimulation` preserves manifests, diagnostics, dense buffers, stream descriptors, precision metadata, and status records for supported run kinds.
7. Invalid app requests must fail closed with `app_contract_error` or the more specific normalized solver status.

## Completion Judgment

`app_bridge_contract` is complete as a contract artifact and closed in [priorities.md](priorities.md). The shared direct client, worker protocol, TypeScript declarations, JSON schema, capabilities surface, run/stream/cancel/dispose methods, app request builders, and validation checks are defined enough for solver work to consume one bridge contract.

Future scoped work may extend implementation breadth and migration evidence: keep performance thresholds in stage-level acceptance records, keep app migration decisions tied to baseline parity evidence, and extend solver-core coverage through new focused tasks.
