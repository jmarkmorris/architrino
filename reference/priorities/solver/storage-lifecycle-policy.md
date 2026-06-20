# Solver Storage Lifecycle Policy

Status: `closeout-complete`

Kind: `storage-lifecycle-policy-closeout`

Source task: `storage_lifecycle_policy` in [solver.md](solver.md)

## Purpose

The storage lifecycle policy defines how solver path-history streams and related artifacts move through active memory, non-volatile storage, export packages, cleanup, and deletion. It exists so long path histories can stay bounded in memory without losing the records needed for precise action, causal-root solving, delayed-hit reconstruction, geometry queries, replay, export, or validation.

The policy applies to solver-owned dense artifacts:

- `path_chunk.v1` path-history chunks;
- `stream_index.v1` index sidecars;
- run manifests, summaries, lifecycle metadata, and diagnostics;
- event stores for causal roots, delayed hits, halts, and threshold diagnostics;
- optional `solver-path-history-deep-index.v1` cold-history indices.

It does not make generated chunks authoritative by themselves. A chunk is authoritative only when its manifest, schema version, precision metadata, checksum, stream index row, and lifecycle state agree.

## Storage Targets

| Target | Retention policy | Cleanup policy |
| --- | --- | --- |
| `caller-buffer` | Transient. The stream lives only while the bridge process owns the buffer and stream handle. | `closeRun`, `dispose`, or lifecycle deletion releases the stream handle. After deletion, `describeStream` and range reads must fail with a stream read status rather than returning stale data. |
| `worker-memory` | Browser transient memory for short previews only. It is not durable and is constrained by the active memory budget. | Release on `closeRun`, `dispose`, cancellation with release, failed-run cleanup, or user deletion. If a requested durable stream only has worker memory available, report `unsupported_browser_storage` or a visible capability warning. |
| `opfs` | Browser durable storage when available. Retention is origin-scoped, subject to browser quota and user/site data controls. OPFS streams must keep manifest, chunk store, index sidecar, lifecycle metadata, and checksum records together. | Cleanup must remove manifest, index, chunk, deep-index, and summary records for the deleted stream. Quota pressure must prefer deleting safe warm or cold non-export chunks before active chunks. |
| `native-file` | Durable native or batch storage. The manifest, stream chunks, index sidecar, and lifecycle metadata are retained under the declared stream path until close, deletion, export handoff, or an explicit retention policy removes them. | `closeRun` with `releaseStreams`, lifecycle deletion, or failed-run cleanup removes the stream directory when all chunks are planned for deletion. Native manifest rewrites must persist lifecycle metadata before reporting success unless the stream itself is deleted. |

Browser storage capability is explicit. A browser app may ask for OPFS, but the bridge must report whether OPFS is supported and must not silently turn a durable requested stream into transient memory. Native storage capability is also explicit: if file modules are unavailable, native-file requests halt with `unsupported_browser_storage`.

## Lifecycle Tiers

| Tier | Meaning | Required behavior |
| --- | --- | --- |
| `active` | The chunk is still needed for the next action, causal-root, delayed-hit, branch-transition, geometry, or validation window. It may be in memory, in the current spill buffer, or pinned as active even if a copy exists on disk. | Keep minimal precise indices in memory. Do not delete or archive as cold. If the active memory budget is exceeded and the chunk cannot leave active memory, emit a blocking diagnostic. |
| `warm` | The chunk has aged out of the active dynamics window but remains likely to be read soon for playback, scrubbing, diagnostics, or near-term replay. | Spill to non-volatile storage when available, keep normal manifest and index sidecar rows, and allow high-speed range reads. |
| `cold` | The chunk is retained for export, validation, long runs, archival replay, or later research queries. | Preserve manifest, checksums, provenance, precision metadata, and stream index rows. Optional deep indices may be built after the chunk reaches cold storage. |
| `deleted` | The chunk is no longer retained by the solver lifecycle. | Remove or release the dense chunk and its stream references. Whole-stream cleanup is allowed only when every chunk in the plan is marked `delete`. |

The lifecycle action vocabulary is:

| Action | Meaning |
| --- | --- |
| `keep_active` | Keep the chunk active because it overlaps the active window or remains necessary for current dynamics. |
| `spill_warm` | Move an aged safe chunk to warm storage without building a deep index. |
| `archive_cold` | Retain a safe aged chunk as cold history, usually because export retention is active or a deep index already exists. |
| `build_deep_index` | Build the optional cold-history deep index before final archival use. |
| `delete` | Delete or release a chunk because deletion was requested, a failed run has no export request, or storage pressure requires removal of safe non-export chunks. |
| `blocked_unsafe` | Keep the chunk active because it cannot safely age out. |

## Age-Out Rules

A chunk may leave active memory only when all of these conditions hold:

1. It does not overlap the declared `activeWindow`.
2. It is not pinned active by unresolved roots, branch transitions, tail interfaces, same-source root policy, validation replay needs, app playback authority, or another current consumer.
3. Its manifest, stream index row, byte range, checksum, schema id, precision metadata, units, and scale normalization have been committed.
4. Its path segment representation preserves the declared interpolation error bound, or the required replay dependency is retained.
5. Any required event rows, root-ledger rows, delayed-hit rows, branch-transition rows, and diagnostics for the chunk are committed or explicitly not requested by the run contract.
6. If `deepIndexEnabled` is true and the chunk lacks a deep index, the next action is `build_deep_index`, not silent archival.
7. If export retention is requested, the chunk is retained as cold history until the export package verifies manifest and checksum identity.
8. If storage pressure exists and no export retention is requested, only chunks already safe to age out may be deleted.

When any safety condition is undecidable, the solver must keep the chunk active or return `blocked_unsafe`. It may spill a copy to storage, lower output stride if the run allowed that, or halt with a precise status, but it must not make the only authoritative copy leave active memory.

## Quota And Pressure

The lifecycle policy carries both `activeMemoryBudgetBytes` and `storageBudgetBytes`.

Active memory pressure is handled in this order:

1. Age out safe chunks according to the active-window rules.
2. Spill safe aged chunks to warm or cold storage.
3. Build required deep indices only outside the hot solver loop unless the caller explicitly requested lifecycle application.
4. Apply backpressure to the stream writer when storage writes lag.
5. Reduce output stride only when the request permits reduced output.
6. Halt with `stream_memory_pressure`, `insufficient_history_depth`, or a more specific root/history status when the requested claim level cannot be met.

Storage pressure is handled after safety gates. If total retained chunk bytes exceed `storageBudgetBytes` and `exportRequested` is false, safe aged non-export chunks may be planned for `delete`. Chunks that overlap the active window or are pinned active remain `active` or `blocked_unsafe`; pressure does not override correctness.

Quota pressure diagnostics must include the active memory budget, storage budget, total bytes, bytes by tier, planned delete count, unsafe-to-age-out count, and the chunk indices that blocked cleanup.

## Failed Runs And Cancellation

A failed or cancelled run may leave only declared recovery artifacts. It must not leave unindexed chunks that look authoritative.

Policy rules:

- `failedRun: true` without `exportRequested` plans safe cleanup by marking chunks `delete` with reason `failed_run_cleanup`.
- `failedRun: true` with `exportRequested` preserves only the export or recovery artifacts that have manifest, index, checksum, provenance, and lifecycle metadata.
- Cancelled interactive previews should release transient buffers unless the caller explicitly requests stream retention for diagnostics.
- Failed native-file streams should remove their stream directory when every chunk is planned for deletion.
- Failed browser streams should remove OPFS records when durable browser storage is present, or release worker-memory and caller-buffer streams otherwise.

Recovery artifacts are not validation evidence unless their manifest says so through claim level, precision metadata, error budget, and validation status.

## Export Handoff

Export handoff is two-phase.

First, `exportRequested: true` protects safe aged chunks from storage-pressure deletion and sends them to `archive_cold` unless a required deep index must be built. The cold artifact set must include:

- run manifest and lifecycle metadata;
- path chunk store;
- stream index sidecar;
- encoding dictionary;
- event and diagnostic stores when requested;
- deep-index metadata when built;
- checksums and provenance for every retained artifact.

Second, after the exported package verifies manifest identity, chunk checksums, index checksums, schema versions, precision metadata, and run claim level, the source stream may be deleted only through an explicit delete request or an external retention policy. Export success alone does not silently remove the source stream.

The deep index is acceleration metadata for cold-history queries. It does not replace authoritative path replay, root ledgers, event rows, or the original chunk checksums.

## User Deletion

User-visible deletion maps to `deleteRequested: true`.

Deletion rules:

- A delete request marks every targeted chunk as `delete` unless the request is invalid.
- Whole-stream cleanup requires `deleteStreamWhenAllChunksDeleted: true` and every chunk in the lifecycle plan must be marked `delete`.
- Partial delete plans persist lifecycle metadata but keep the stream available with `deletedStream: false` and `skippedReason: "not_all_chunks_planned_delete"`.
- Native deletion removes manifest, index, chunk, and stream-directory records.
- Caller-buffer and worker-memory deletion releases the stream handle.
- Browser OPFS deletion must remove all records needed to reopen the stream, including deep-index and summary records.

After deletion, reads, stream description, and export attempts must fail closed. The bridge should report `stream_read_failed` for unavailable deleted streams, not return empty authoritative data.

## Deep-Index Creation

Deep indices are optional cold-history accelerators. When `deepIndexEnabled` is true and a safe aged chunk lacks a deep index, lifecycle planning returns:

- tier: `cold`;
- action: `build_deep_index`;
- `safeToAgeOut: true`;
- `requiresDeepIndex: true`;
- reason: `aged_chunk_requires_deep_index`.

Lifecycle application builds `solver-path-history-deep-index.v1` metadata with:

- `indexKind: "spacetime"`;
- `indexLayout: "spacetime_index.v1"`;
- source stream id;
- built chunk indices;
- row count;
- overflow entry count;
- byte length;
- checksum;
- index options.

Once the deep index exists, later lifecycle plans may mark the chunk `archive_cold` with reason `deep_index_already_built`.

Deep-index rows are broad-phase or offline-query aids. If a deep-index query nominates candidates, authoritative causal-root, delayed-hit, and geometry decisions still come from the solver's narrow-phase and validation records.

## Diagnostics

Every lifecycle plan must produce `solver-path-history-storage-lifecycle-summary.v1` with:

- total chunk count and total bytes;
- tier counts for `active`, `warm`, `cold`, `deleted`, and `unknown`;
- action counts for every lifecycle action;
- bytes by tier;
- safe and unsafe age-out counts;
- deep-index queue chunk indices;
- unsafe-to-age-out chunk indices.

When a chunk cannot safely leave active memory, the diagnostic record must identify:

- `chunkIndex`;
- action `blocked_unsafe` or `keep_active`;
- reason such as `chunk_is_pinned_active` or `overlaps_active_window`;
- active time window and chunk time range;
- storage target and durability;
- active memory and storage budgets;
- pinned or unresolved consumer class, such as unresolved roots, branch transitions, tail interface, same-source policy, validation replay, or app playback authority;
- whether the solver retained an active copy, spilled a non-authoritative copy, reduced output by request, or halted.

If active-memory pressure remains after all safe age-out decisions are applied, the run must halt or apply declared backpressure with `stream_memory_pressure` or a more specific status. `internal_solver_error` is reserved for invariant failures, not ordinary lifecycle pressure.

## Implemented Support

| Requirement | Current support |
| --- | --- |
| Native lifecycle planner | Implemented as `StorageLifecyclePolicy`, `StorageLifecycleTier`, `StorageLifecycleAction`, `PathHistoryChunkLifecycleDecision`, and `plan_path_history_storage_lifecycle`. See [StorageLifecycle.hpp](../../../src/solver/include/architrino/solver/StorageLifecycle.hpp) and [StorageLifecycle.cpp](../../../src/solver/src/StorageLifecycle.cpp). |
| App bridge request and response types | Implemented in `SolverPathHistoryStorageLifecyclePolicy`, lifecycle request/response records, cleanup records, summary records, and deep-index metadata. See [SolverAppBridgeContract.d.ts](../../../src/solver/app/SolverAppBridgeContract.d.ts). |
| Browser capability failure | `opfs` and `worker-memory` targets are currently reported through `unsupported_browser_storage` in this bridge when unsupported. The policy still defines their required durable/transient behavior for browser implementations. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Native-file retention and cleanup | Native-file streams write manifest, chunk, and index records; lifecycle application persists lifecycle metadata to native manifests; deletion removes stream files when every chunk is planned for deletion. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Whole-stream deletion guard | Implemented through `deleteStreamWhenAllChunksDeleted` and `solver-path-history-storage-lifecycle-cleanup.v1`. Partial delete plans do not release the stream. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Deep-index creation | Lifecycle application builds `solver-path-history-deep-index.v1` backed by `spacetime_index.v1` rows for queued chunks. See [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs). |
| Fixture coverage | `scripts/check-solver-app-bridge.mjs` checks lifecycle planning, summary counts, unsafe chunk reporting, lifecycle application, caller-buffer deletion, partial delete guards, native-file manifest persistence, native-file deletion, and deep-index metadata. |
| Native smoke coverage | The native storage lifecycle smoke verifies active-window retention, pinned-active blocking, cold archival, export retention, failed-run deletion, and action/tier string mappings. See [solver_storage_lifecycle_smoke.cpp](../../../src/solver/native/solver_storage_lifecycle_smoke.cpp). |

## Completion Judgment

`storage_lifecycle_policy` can be marked complete once [solver.md](solver.md) is open for queue-status edits.

The policy is complete because browser and native retention behavior, cleanup, quota pressure, failed-run cleanup, export handoff, user-visible deletion, active/warm/cold tiers, age-out conditions, deep-index creation, and unsafe active-memory diagnostics are now defined here and mapped to the live lifecycle schema and bridge/native support.

What remains is administrative: update the task queue entry in [solver.md](solver.md) from `active` to complete when that file is allowed to change. No `solver.md` edit is required for the policy itself.
