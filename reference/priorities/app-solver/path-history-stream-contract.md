# Path-History Stream Contract

Historical naming: **zombie-solver (then called the central solver)**.

Status: `closed-schema-fixture-benchmark-baseline`

Kind: `solver-storage-contract`

Source task: `path_history_stream_contract` in [priorities.md](priorities.md)

Primary dependencies:

- [precision.md](precision.md)
- [simulation-envelope-contract](simulation-envelope-contract.md)
- [virtual-observer-path-record-contract](virtual-observer-path-record-contract.md)
- [temporal-assembly-graph-contract](temporal-assembly-graph-contract.md)
- [numeric-serialization-contract](numeric-serialization-contract.md)

## Purpose

The zombie-solver needs long path histories without turning every run into an unbounded in-memory array. This contract defines the storage and replay boundary for path-history output: logical per-path streams backed by a run-level chunked binary store, manifest, encoding dictionary, event store, binary index sidecar, summary record, checksums, and optional deep-index store.

The contract is storage and replay infrastructure for solver-owned path histories. It is not an app migration step. App adapters may consume the streams later, but this note does not change app migration order, app runtime ownership, or app source files.

## Contract Boundary

The path-history stream layer owns these obligations:

- preserve authoritative path records and their declared error bounds;
- keep memory bounded by active-window policy instead of full-run retention;
- spill committed chunks to non-volatile storage fast enough for long runs;
- read selected path, time, frame, or event ranges without full-run scans;
- preserve precision-path, numeric-chart, unit, and encoding metadata;
- detect corruption, partial writes, stale indices, and manifest mismatch;
- make warm and cold history available for replay, export, validation, and optional deep indexing.

The layer does not own:

- the physical model or force law;
- causal-root solving itself;
- temporal assembly graph semantics beyond storing references and events supplied by that contract;
- numeric byte layout details that belong to [numeric-serialization-contract](numeric-serialization-contract.md);
- storage lifecycle decisions that belong to `storage_lifecycle_policy`, except for the fields this stream contract must expose.

## Required Artifacts

| Artifact | Version id | Authority | Required content |
| --- | --- | --- | --- |
| Run manifest | `path_history_stream_manifest.v1` | Required | Run id, model id, stream set, chunk store references, encoding dictionary reference, event store reference, index sidecar reference, summary record reference, precision metadata, memory and storage budgets, checksum policy, and lifecycle status. |
| Logical stream table | `path_stream_table.v1` | Required | One row per logical path stream, including stream id, path id, path role, entity id, time bounds, frame bounds, chunk list, stored columns, claim level, and replay status. |
| Chunked binary store | `path_chunk_store.v1` | Required | Sequential binary chunks keyed by chunk id; each chunk contains one time window and bounded path bundle. |
| Chunk record | `path_chunk.v1` | Required | Header, stream span, time bounds, frame bounds, row count, column layout id, numeric encoding ids, payload bytes, and checksum trailer. |
| Encoding dictionary | `path_encoding_dictionary.v1` | Required | Shared ids for column layouts, numeric encodings, units, coordinate frames, compression choices, event codes, status codes, and checksum algorithms. |
| Event store | `path_event_store.v1` | Required | Append-only records for stream lifecycle, chunk commits, precision escalation, age-out decisions, membership references, root or replay markers, errors, and recovery actions. |
| Binary index sidecar | `stream_index.v1` | Required | Binary lookup rows from stream/time/frame/chunk/event ranges to byte offsets, lengths, row counts, checksum ids, and tier flags. |
| Summary record | `path_history_summary.v1` | Required | Final or partial run totals, byte counts, path counts, chunk counts, tier counts, memory high-water marks, write/read throughput notes, checksum summary, and unresolved diagnostics. |
| Deep-index store | `path_history_deep_index.v1` | Optional | Offline acceleration indices for broad-phase and research queries; never replaces authoritative chunk replay. |

## Logical Per-Path Streams

A logical stream represents the ordered path history for one path identity. The physical store may pack multiple logical streams into one chunk when that improves throughput, but every packed row must still be recoverable by logical stream id.

Required stream identity fields:

| Field | Meaning |
| --- | --- |
| `runId` | Stable id for the solver run that produced the stream. |
| `streamId` | Stable logical stream id, unique inside `runId`. |
| `pathId` | Stable path identity from the virtual-observer path record. |
| `entityId` | Source entity or assembly member id when the stream represents a modeled entity. |
| `pathRole` | Role such as source history, receiver history, virtual-observer path record, replay projection, or validation path. |
| `claimLevel` | Authority label: authoritative, approximate, broad-phase-only, projection, display-only, or validation-only. |
| `precisionPathId` | Selected precision path inherited from the run or escalated for this stream. |
| `numericChartId` | Numeric chart used for stored values, with dictionary metadata for local frame, log magnitude, signed log magnitude, direction plus log magnitude, interval bounds, or direct scaled values. |

Logical streams must be append-only while a run is active. Corrections are represented as events or replacement chunks with explicit supersession metadata, not as silent mutation of already committed bytes.

## Chunked Binary Store

The chunked store is the authoritative dense storage layer. It is optimized for sequential write, bounded memory, and indexed readback.

Each `path_chunk.v1` record has this minimum structure:

```text
chunk header
  magic
  schema version
  run id hash
  chunk id
  chunk sequence number
  stream span descriptor
  time bounds
  frame bounds
  row count
  column layout id
  numeric encoding id set
  payload byte length
  previous chunk checksum id, when chained

payload
  structure-of-arrays column bytes
  optional chunk-local delta blocks
  optional compression block declared by dictionary id

trailer
  payload checksum
  header checksum
  chunk checksum
  commit marker
```

Chunk constraints:

- a chunk must contain a bounded time window, frame window, byte size, and path bundle;
- a chunk must be readable without loading the whole run;
- a chunk must declare whether its rows are authoritative path data, replay projection, broad-phase metadata, or display-only projection;
- chunk-local compression is allowed only when the dictionary states the exact compression id, block size, and checksum scope;
- heavy compression is post-run or export by default unless the run explicitly selects a streaming-safe compression mode;
- a committed chunk must be immutable except for sidecar index construction and lifecycle metadata stored outside the chunk bytes.

## Manifest

The manifest is the top-level replay and validation entrypoint. It must be small enough to load before reading chunk payloads and complete enough to reject incompatible readers.

Required manifest groups:

| Group | Required fields |
| --- | --- |
| Identity | Manifest version, run id, model id, solver engine id, producer version, source request id, creation time, and completion state. |
| Simulation envelope | Entity count, duration, time resolution, output detail, declared memory budget, declared storage budget, latency target, backend, and simplification policy. |
| Precision | Precision path, numeric chart set, numeric type set, unit convention, scale normalization, global error budget, stage error budgets, and claim level. |
| Streams | Logical stream table reference, path counts, stream groups, stream id namespace, and claim-level summary. |
| Storage | Chunk store URI or handle, chunk count, byte count, tier map, active-window policy, warm/cold storage target, and cleanup status. |
| Dictionary | Encoding dictionary reference, dictionary checksum, and compatibility version. |
| Events | Event store reference, event count, event time bounds, error count, and recovery status. |
| Indices | Binary index sidecar reference, sidecar checksum, sidecar build status, and optional deep-index references. |
| Checksums | Algorithm ids, per-chunk checksum policy, chain checksum policy, manifest checksum, and exported artifact hash policy. |
| Summary | Summary record reference, summary checksum, and unresolved diagnostic count. |

The manifest must fail closed when a reader does not understand a required schema version, numeric encoding, compression id, checksum algorithm, or claim-level authority.

## Encoding Dictionary

The encoding dictionary prevents repeated metadata from bloating every chunk and lets streams remain compact without becoming opaque.

The dictionary must assign stable ids for:

- column layouts, including position, velocity, acceleration, frame id, interpolation bound, path-segment id, and optional replay columns;
- numeric encoding rules from [numeric-serialization-contract](numeric-serialization-contract.md);
- unit and coordinate-frame records;
- precision path and numeric chart descriptors;
- local-frame origin and basis records;
- interval endpoint conventions and rounding modes;
- compression ids and block options;
- event code ids and status code ids;
- checksum algorithms and checksum scope ids;
- stream group names and path roles.

Dictionary ids are run-local unless explicitly promoted by a future schema. A manifest must carry the dictionary checksum so a chunk cannot be decoded with the wrong dictionary.

## Event Store

The event store is an append-only control ledger for the stream system. It keeps lifecycle and replay events out of hot path payload columns while preserving the history needed for validation.

Required event classes:

| Event class | Required meaning |
| --- | --- |
| `stream_opened` | Logical stream declared and ready for chunk commits. |
| `chunk_committed` | Chunk became immutable and checksum-valid. |
| `chunk_superseded` | Replacement chunk or correction event exists; reader must follow supersession metadata. |
| `precision_escalated` | Stream or run moved to stricter precision path or chart. |
| `active_window_aged_out` | Chunk left hot memory and entered warm or cold storage. |
| `age_out_blocked` | Chunk could not leave hot memory because a declared dependency remained active. |
| `index_built` | Sidecar or deep index was built or refreshed. |
| `checksum_fault` | Checksum mismatch, missing trailer, partial write, or manifest mismatch was detected. |
| `recovery_action` | Reader or writer repaired, quarantined, or rejected a partial artifact. |
| `run_finalized` | No more authoritative chunks will be appended for this run. |

Events must carry monotone sequence numbers, event time or frame when available, producer stage, affected stream or chunk ids, severity, recoverability default, and checksum coverage when relevant.

## Binary Index Sidecar

The binary index sidecar is required for high-speed readback. It maps logical queries to chunk offsets without scanning the full chunk store.

Minimum index rows:

| Row family | Lookup key | Target |
| --- | --- | --- |
| Chunk offset | `chunkId` | Byte offset, byte length, checksum, row count, and tier. |
| Stream range | `streamId`, time bounds, frame bounds | Chunk ids and row spans. |
| Path id | `pathId` | Logical stream id and chunk span. |
| Event range | Event class, sequence range, time or frame bounds | Event store offsets. |
| Tier map | Hot, warm, cold, exported, quarantined | Storage handle and lifecycle flags. |
| Supersession | Superseded chunk id | Replacement or correction event id. |

The sidecar must be rebuilt deterministically from the manifest, chunk headers, and event store. A stale sidecar cannot invalidate authoritative chunks, but it must block high-speed readback until rebuilt or explicitly bypassed with a full validation scan.

## Summary Record

The summary record is the compact run-level report for dashboards, validation logs, and operator review.

It must include:

- stream count, path count, chunk count, row count, and byte count;
- bytes by tier: hot, warm, cold, exported, and quarantined;
- active-window maximum memory use and memory-budget status;
- spill throughput, readback throughput, and index-build throughput when measured;
- checksum counts: clean, missing, mismatched, repaired, quarantined;
- precision-path counts and escalation counts;
- unsafe-to-age-out chunk ids and reasons;
- deep-index build status and queued work;
- final replay status: complete, partial, interrupted-recoverable, interrupted-quarantined, or invalid.

The summary is not an authority substitute. A reader must still validate the manifest, dictionary, indices, chunks, and checksums when replay authority matters.

## Memory Budget

Every run must declare a path-history memory budget before stream writing begins.

Budget fields:

| Field | Meaning |
| --- | --- |
| `activeWindowBytes` | Maximum bytes retained in hot memory for path-history rows and active indices. |
| `activeWindowTimeDepth` | Simulated time span that must remain hot for the next precise action/root window. |
| `activeWindowFrameDepth` | Frame or sample span that must remain hot for replay, interpolation, and root work. |
| `spillBufferBytes` | Writer buffer allowed before mandatory spill or backpressure. |
| `indexMemoryBytes` | Hot memory allocated to active-window indices. |
| `deepIndexMemoryBytes` | Optional background budget for offline index construction. |
| `onBudgetPressure` | Required behavior: spill, reduce optional output, simplify by policy, or halt. |

The writer must emit diagnostics before exceeding the budget. If the stream cannot stay inside the declared budget without weakening the requested claim level, the run must halt or request an explicit simplification policy from the simulation envelope.

## Active-Window Age-Out

Hot active history keeps only what the next solver window needs for precise action, causal-root, delayed-hit, interpolation, and validation obligations. A chunk may age out only when all of these checks pass:

- no active root, delayed-hit, interpolation, or assembly-membership query still needs its rows in hot memory;
- all chunk checksums are committed and the sidecar has a row for the chunk;
- the event store records the chunk commit and age-out decision;
- any required warm or cold storage write has completed and verified;
- the age-out decision preserves the declared replay and error-bound authority.

If a chunk fails any check, the writer emits `age_out_blocked` and either keeps it hot, spills another safe chunk first, reduces optional output if policy allows, or halts with a memory-budget diagnostic.

Age-out is a tier transition, not data deletion. Deletion belongs to `storage_lifecycle_policy`.

## Optional Deep-Index Store

The deep-index store is optional acceleration metadata for large replay, broad-phase queries, high-accuracy audits, and research sweeps.

Allowed deep-index families:

- spacetime block indices;
- path-vs-emission-shell candidate indices;
- path-vs-path candidate indices;
- same-source and all-to-all candidate summaries;
- speed-regime transition maps;
- frame or time decimation ladders for visualization mining;
- branch-transition and event-density summaries.

Deep indices may be built after chunks reach warm or cold storage. They must never become the authoritative path record. A deep-index miss can reject a fast query path only when the index declares a complete coverage guarantee for that query family; otherwise it must fall back to authoritative chunk replay.

Visualization output should be a projection of the path-history stream, not a second source of truth. A display packet may contain path trails, causal wake segments, speed-regime color bands, reaction labels, logarithmic radius labels, and event-density overlays, but it must keep references to authoritative stream rows:
$$
\mathcal{V}_{\mathrm{path}}
=
\Pi_{\mathrm{viz}}
\left(
\mathcal{H}_{\mathrm{path}},
\mathcal{H}_{\mathrm{wake}},
\mathcal{E}_{\mathrm{event}},
\mathcal{S}_{\mathrm{speed}},
\mathcal{L}_{\mathrm{label}}
\right).
$$
Here $\Pi_{\mathrm{viz}}$ is a lossy projection for human inspection. It may support mining, debugging, and animation, but replay, conservation checks, and promotion evidence must still point back to $\mathcal{H}_{\mathrm{path}}$ and the committed chunk ids.

## Fast Spill

Fast spill is the write path from hot active history to durable chunk bytes. It must support long runs without blocking the solver on per-row JSON, per-row allocation, or full-run rewrites.

Required spill behavior:

- write dense payloads in structure-of-arrays columns;
- batch path rows by chunk window and stream group;
- assign chunk ids before payload write and commit them only after checksums pass;
- keep manifest updates atomic at the chunk-reference level;
- use append-only event records for lifecycle state;
- avoid rewriting existing committed chunks during normal operation;
- apply backpressure when spill buffers approach the declared budget;
- record measured spill throughput in the summary when instrumentation is enabled.

The first implementation may use a conservative local-file or browser storage backend. The contract requires the same logical artifacts regardless of backend.

## High-Speed Readback

High-speed readback means a reader can retrieve selected ranges without scanning the whole run.

Required readback modes:

| Mode | Required behavior |
| --- | --- |
| Stream range | Return rows for one logical stream over time, frame, or row bounds. |
| Path bundle range | Return rows for a bounded set of stream ids over a shared window. |
| Chunk replay | Return full chunks for validation or export. |
| Projection readback | Return declared projection buffers while preserving reference to authoritative rows and error bounds. |
| Event readback | Return lifecycle, error, precision, and recovery events by class or range. |
| Index bypass | Fall back to validated chunk scan when the sidecar is missing or stale, with explicit slow-path diagnostics. |

Readback must preserve row ordering, stream identity, numeric encoding metadata, and claim-level authority. A projection read must not masquerade as authoritative path replay.

## Checksums And Recovery

Checksums are required at multiple scopes because path histories may be long, partially written, exported, indexed, and replayed on different machines.

Required checksum scopes:

| Scope | Purpose |
| --- | --- |
| Chunk header | Detect wrong schema, run id, row count, layout id, or declared byte length. |
| Chunk payload | Detect payload corruption. |
| Chunk trailer | Detect partial commit or truncated write. |
| Chain checksum | Detect missing, reordered, or substituted chunks in a stream. |
| Dictionary checksum | Detect decoding with the wrong encoding dictionary. |
| Sidecar checksum | Detect stale or corrupt index rows. |
| Event-store checksum | Detect lifecycle or recovery ledger corruption. |
| Manifest checksum | Detect top-level replay mismatch. |
| Export artifact hash | Support archived or transferred artifact integrity. |

Recovery policy:

- missing uncommitted chunks may be discarded if no manifest reference points to them;
- committed chunks with checksum faults must be quarantined, not silently repaired;
- stale sidecars may be rebuilt from authoritative chunks and event records;
- manifest/dictionary mismatch invalidates replay until the correct pair is supplied;
- chain checksum mismatch blocks authoritative stream replay for the affected range;
- every recovery action must append a `recovery_action` event.

## Validation Fixtures

The contract should be accepted only after these fixtures pass:

| Fixture | Status | Required proof |
| --- | --- | --- |
| `path_stream_round_trip` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Deterministic multi-path run writes chunks, reads the same ranges, preserves byte-stable fields where declared, and detects checksum faults. |
| `stream_replay_invariants` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Path, root, and replay invariants survive write/read/projection with declared error bounds and ordering. |
| `history_age_out_and_deep_index` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Safe chunks age out, unsafe chunks remain hot or halt, and optional deep indices build without replacing authoritative replay. |
| `interrupted_stream_recovery` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Partial writes, missing trailers, stale sidecars, and manifest mismatch produce deterministic recovery or quarantine events. |
| `high_speed_readback_budget` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Indexed readback meets the declared range-read behavior without full-run scans under the test memory budget. |
| `fast_spill_budget` | Implemented in `scripts/check-solver-contract-fixtures.mjs`. | Long synthetic histories stay inside active-window memory by chunking, spilling, backpressure, or explicit halt. |

## Close And Remaining Status

`path_history_stream_contract` is closed at the design-capture, schema-fixture, and runtime-benchmark-baseline level. The required storage artifacts, logical per-path stream model, chunk format obligations, manifest groups, dictionary, event store, binary index sidecar, summary record, memory budget, active-window age-out, optional deep-index store, fast spill, high-speed readback, checksums, recovery policy, and validation fixtures are specified here. The solver app-bridge schema now carries `solver-path-history-stream-contract-artifacts.v1`, and the contract fixture checker validates all six acceptance fixtures: `path_stream_round_trip`, `stream_replay_invariants`, `history_age_out_and_deep_index`, `interrupted_stream_recovery`, `high_speed_readback_budget`, and `fast_spill_budget`.

The remaining runtime validation work is outside this contract artifact:

1. [storage-lifecycle-policy](storage-lifecycle-policy.md) already consumes the tier, quota, cleanup, export, deletion, active-window, and deep-index fields.
2. [work-packet-transport-contract](work-packet-transport-contract.md) already references path-history chunk handles, byte spans, checksums, and deterministic merge keys without duplicating this storage model.
3. `scripts/benchmark-solver.mjs` now runs the native `path-history-fast-spill-budget`, `path-history-high-speed-readback-budget`, `path-history-deep-index-build-budget`, and `path-history-recovery-detection-budget` cases, in addition to the broader `stream-and-assembly-store-io` case. These provide baseline measurements for chunked spill, selected indexed readback, optional deep-index construction, and checksum/partial-write/stale-sidecar detection. Later stage-level performance acceptance can add release thresholds and larger stress scales, but no further benchmark split is required to close this contract artifact.
