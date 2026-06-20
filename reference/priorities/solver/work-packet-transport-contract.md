# Work-Packet Transport Contract

Status: `closeout-complete`

Kind: `contract-closeout`

Source task: `work_packet_transport_contract` in [solver.md](solver.md)

## Purpose

The work-packet transport contract defines the smallest solver work unit that can move across browser workers, native threads, native processes, service backends, and future GPU dispatch without changing the logical data format.

A work packet is an immutable dispatch header plus references to binary payload spans. The header states what slice of the run the worker owns, which input buffers it may read, which binary layouts it is expected to emit, and how its result must merge back into the run. The packet does not own app rendering state, JavaScript objects, C++ pointers, process-local file handles, or backend-specific scheduling state.

The live header schema is `solver-work-packet.v1`.

## Contract Objects

| Object | Live schema or type | Role |
| --- | --- | --- |
| Packet header | `workPacketHeader`, `SolverWorkPacketHeader`, `WorkPacketHeader` | Immutable dispatch declaration for one source/receiver/path/time slice. |
| Packet input or output buffer reference | `workPacketBufferRef`, `SolverWorkPacketBufferRef`, `WorkPacketBufferRef` | Binary payload span reference with layout, numeric type, row range, byte range, and checksum. |
| Packet result reference | `workPacketResultRef`, `SolverWorkPacketResultRef`, `WorkPacketResultRef` | Output reference set tied to the original `packetId`, `mergeOrder`, and `mergeKey`. |
| Result-order request and response | `workPacketResultOrderRequest`, `workPacketResultOrderResponse` | Deterministic merge-order helper over packet results. |
| Path-history packet plan | `pathHistoryWorkPacketPlanRequest`, `pathHistoryWorkPacketPlanResponse` | Deterministic source/receiver chunk-pair planner over `path_segment.v1` streams. |

## Packet Headers

Every dispatched packet header must carry these fields:

| Field | Requirement |
| --- | --- |
| `schema` | Must be `solver-work-packet.v1`. |
| `packetId` | Required non-empty id, unique inside the run plan or dispatch batch. |
| `runId` | Required non-empty run id. |
| `modelId` | Required non-empty model id matching the run's model contract. |
| `precisionPath` | Required concrete precision path. `auto` is not dispatchable because workers must receive the selected path. |
| `sourceBlock` | Half-open source ownership range with `enabled`, `start`, and `end`. |
| `receiverBlock` | Half-open receiver ownership range with `enabled`, `start`, and `end`. |
| `pathBlock` | Half-open path ownership range with `enabled`, `start`, and `end`. |
| `timeRange` | Finite ordered time interval for the packet. |
| `expectedOutputs` | Non-empty list of binary layout ids the packet is expected to publish. |
| `inputBuffers` | List of binary payload references the packet may read. |
| `mergeOrder` | Non-negative deterministic local order within equal `mergeKey` groups. |
| `mergeKey` | Required non-empty deterministic merge key. |
| `headerChecksum` | Optional on input, required on prepared headers; 16 lowercase hexadecimal characters. |

The header is canonical when serialized in the exact field order above, excluding `headerChecksum`. The live bridge and native solver both hash that canonical header with FNV-1a 64-bit hexadecimal form. The current checksum is a compact replay and drift guard, not a cryptographic trust boundary.

## Binary Payload References

Packet payloads are referenced, not embedded in the header.

Each `workPacketBufferRef` must carry:

- `bufferId`: stable id for the buffer or buffer span.
- `layout`: binary layout id such as `path_segment.v1`, `root_ledger.v1`, `delayed_hit_events.v1`, `emission_shell_candidate.v1`, or `emission_shell_narrow_phase.v1`.
- `numericType`: currently `f64` for the live app bridge work-packet schemas.
- `byteOffset` and `byteLength`: byte span in the owning buffer or durable file.
- `rowOffset` and `rowCount`: logical row span in the declared layout.
- `checksum`: required for non-empty input buffers and all result references.

The byte length must match `rowCount * rowSizeBytes(layout)` for fixed-size layouts. A packet may reference browser `ArrayBuffer` payloads, registered in-memory stream buffers, durable native-file manifest spans, or service-provided object spans, but the contract exposed to the solver stays the same buffer-reference object.

Payload bytes remain immutable after publication. A worker may produce new output buffers, but it must not mutate shared input buffers or write directly into another packet's output range.

## Checksums

The transport contract uses three checksum levels:

| Checksum | Scope | Purpose |
| --- | --- | --- |
| `headerChecksum` | Canonical packet header without the checksum field. | Detects header drift between planning, dispatch, replay, and result attribution. |
| Buffer `checksum` | Referenced binary span. | Detects payload-span drift and ties result references to the bytes they describe. |
| `planChecksum` | Path-history packet plan identity. | Ties source selections, receiver selections, chunk-pair counts, truncation state, and packet header checksums into one replay id. |

`headerChecksum` and `planChecksum` currently use the same 16-character FNV-1a-style compact hash family used by the bridge. Buffer checksums follow the producing buffer helper. Future durable export may add stronger hashes beside these fields, but it must not remove the current compact fields from app-facing packet manifests without a schema version change.

## Output Layout Declarations

`expectedOutputs` declares the output row layouts before dispatch. `packetResult.outputs` reports the produced output spans after execution.

Rules:

1. `expectedOutputs` must be non-empty and must name implemented core binary layouts.
2. Result outputs must use `workPacketBufferRef` so merged runs can keep layout, numeric type, byte range, row range, and checksum together.
3. Dense outputs are immutable after the packet result is published.
4. Packet-local output buffer ids should be scoped by `packetId` unless a merge step rewrites them into a combined buffer.
5. Merged outputs must preserve row offsets by layout so a downstream reader can map packet result rows into merged buffers.

Current work-packet output layouts include root-ledger and delayed-hit rows for root work, plus emission-shell candidate and narrow-phase rows for broad-phase path-history work. The broader binary-layout vocabulary remains available through the app bridge capability response.

## Range Ownership

Packet range fields use half-open intervals: `start` is included and `end` is excluded.

Ownership rules:

- At least one of `sourceBlock`, `receiverBlock`, or `pathBlock` must be enabled.
- Every enabled range must be non-empty: `end > start`.
- Disabled ranges use `enabled: false`; their numeric bounds carry no ownership claim.
- `timeRange.start` and `timeRange.end` must be finite, and `end >= start`.
- A packet owns only the declared source, receiver, path, and time ranges for output publication.
- A packet may read only its declared `inputBuffers`; if it needs additional chunks, the planner must issue a new packet or widen the explicit references.

For path-history plans, `planPathHistoryWorkPackets` builds source/receiver chunk-pair packets from a registered `path_segment.v1` stream or durable manifest. It may filter by `sourcePathKeys`, `receiverPathKeys`, `sourceChunkIndices`, `receiverChunkIndices`, and `timeRange`. The response records `sourceSelections`, `receiverSelections`, `chunkPairCount`, `packetCount`, `truncated`, `planChecksum`, and the prepared packet headers.

## Deterministic Merge Keys

Packet results must merge by the stable tuple:

```text
mergeKey, mergeOrder, packetId
```

`mergeKey` is the primary semantic ordering key. In path-history chunk-pair plans it currently includes the `runId`, packet time order, source chunk index, and receiver chunk index. `mergeOrder` breaks ties inside the same key family. `packetId` is the final deterministic tie-breaker.

The merge key must be derived from run data and packet-owned ranges, not from scheduler order, thread id, worker id, process id, service shard id, or GPU workgroup id. A backend may execute packets in any order, but it must publish packet results through the same deterministic merge tuple.

## Worker, Thread, Process, And Service Portability

The packet contract is portable because it avoids backend-local ownership:

- Browser workers receive JSON-compatible headers and transferable or registered binary payloads.
- Native threads receive the same logical header and buffer spans without requiring JavaScript object identity.
- Native processes can pass the header plus durable manifest paths and byte spans.
- Service backends can store payload bytes behind object ids while preserving the same `bufferId`, layout, range, and checksum fields.
- Results return as `workPacketResultRef` objects, so merge code never has to inspect backend-private execution state.

Portability requirements:

1. No packet field may depend on an in-process pointer, object identity, thread id, worker id, file descriptor, or service-local handle that cannot be represented as a stable id plus byte span.
2. All worker-visible binary data must have a declared layout and row size.
3. Every prepared packet must fail closed with normalized status records when the selected precision path, range ownership, row size, checksum, or layout declaration is invalid.
4. Cancellation may stop execution, but it must not publish a partial authoritative result without an explicit halt or cancellation status.
5. Backend-specific acceleration may add diagnostics, but it must not change the merge tuple or the meaning of a declared layout.

## Future GPU Compatibility

GPU execution is not part of the first central solver core, but the packet contract is shaped so future GPU kernels can use the same work units.

GPU compatibility requirements:

- Packet ranges must map cleanly to one or more kernel grids without changing logical ownership.
- Input and output payloads must be contiguous spans with declared byte offsets, row counts, and layout row sizes.
- Packet output must be packet-local until the deterministic merge step; GPU kernels must not race to write shared authoritative rows across packet boundaries.
- Reductions must either be packet-local or use an explicitly declared deterministic reduction stage before publication.
- Workgroup size, GPU vendor, queue id, and device-local memory choices are execution diagnostics, not packet identity.
- Future GPU-specific layouts or numeric types require new layout or numeric serialization descriptors, not ad hoc header fields.
- A GPU backend must still emit the same `packetId`, `mergeOrder`, `mergeKey`, output buffer refs, checksums, and status records as worker, thread, process, or service backends.

This preserves one transport format while allowing later WebGPU, Metal, CUDA-like service, or other GPU execution paths to specialize the kernel implementation.

## Implemented Support

| Requirement | Current support |
| --- | --- |
| Native header and result types | Implemented in [WorkPacket.hpp](../../../src/solver/include/architrino/solver/WorkPacket.hpp). |
| Native validation, canonical serialization, checksums, and deterministic ordering | Implemented in [WorkPacket.cpp](../../../src/solver/src/WorkPacket.cpp). |
| Native smoke fixture | Implemented in [solver_work_packet_smoke.cpp](../../../src/solver/native/solver_work_packet_smoke.cpp). |
| App bridge methods | Implemented as `prepareWorkPacketHeader`, `orderWorkPacketResults`, and `planPathHistoryWorkPackets` in [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Packetized solver operations | Implemented for emission-shell broad-phase candidate packets and packet-scoped emission-shell root refinement. `refineEmissionShellCandidateRootsF64` validates candidate chunk ownership against packet ranges and emits packet-scoped `root_ledger.v1` and `delayed_hit_events.v1` result references. |
| App bridge type surface | Implemented as `SolverWorkPacketHeader`, `SolverWorkPacketBufferRef`, `SolverWorkPacketResultRef`, and `SolverPathHistoryWorkPacketPlanRequest` in [SolverAppBridgeContract.d.ts](../../../src/solver/app/SolverAppBridgeContract.d.ts). |
| JSON schema | Implemented as `workPacketHeader`, `workPacketBufferRef`, `workPacketResultRef`, `workPacketResultOrderRequest`, `workPacketResultOrderResponse`, `pathHistoryWorkPacketPlanRequest`, and `pathHistoryWorkPacketPlanResponse` in [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json). |
| Capability declaration | Implemented as `solver-work-packet-capabilities.v1` with helpers, path-history filters, deterministic merge order, and row-size validation in the app bridge capability response. |
| Fixture checks | Implemented in [check-solver-contract-fixtures.mjs](../../../scripts/check-solver-contract-fixtures.mjs) and [check-solver-app-bridge.mjs](../../../scripts/check-solver-app-bridge.mjs). |
| README implementation summary | Documented in [src/solver/README.md](../../../src/solver/README.md). |

## Missing Or Intentionally Deferred

| Item | Status | Contract decision |
| --- | --- | --- |
| Strong cryptographic checksum as the only checksum | Deferred. | Keep compact `headerChecksum` and buffer checksums for app-facing drift detection; add stronger export hashes later as additional fields under a schema version. |
| Non-`f64` packet payloads | Deferred for live app bridge packet schemas. | Use `numericType: "f64"` now. Add future numeric types through the numeric serialization contract and schema versioning. |
| GPU backend | Deferred. | Keep packet fields GPU-compatible now; do not add GPU execution to the first solver core. |
| Service backend | Deferred. | The packet header is service-portable today because it uses stable ids, byte spans, row spans, checksums, and deterministic merge keys. Service-specific handles must stay outside packet identity. |
| Full scheduler contract | Split. | Scheduling policy belongs to threading, worker, process, service, or GPU execution plans. The packet contract only defines dispatch identity, ownership, payload references, output declarations, and merge semantics. |
| Administrative queue update in `solver.md` | Complete. | [solver.md](solver.md) now lists `work_packet_transport_contract` under closed task artifacts and routes downstream consumers through this document. |

## Completion Judgment

`work_packet_transport_contract` is complete as a contract artifact and closed in [solver.md](solver.md).

The live solver has packet headers, binary payload references, checksums, output layout declarations, range ownership, deterministic merge keys, worker/thread/process/service portability rules, future GPU compatibility constraints, packetized emission-shell broad-phase candidate scans, and packet-scoped exact-root refinement. The remaining work is implementation breadth: more packetized solver operations can adopt the same contract as the central solver grows, but they do not require a second transport format.
