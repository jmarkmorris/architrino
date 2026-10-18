# Ordinary Integration of Validated Evolution, Stage O2: Persistence Design

O2 makes a run of the validated method, reached through the ordinary typed entry, persist and restart through a versioned provider checkpoint. This record is the design half of the O2 packet, released for preparation in the [O0 review](matched-pair-review-ordinary-stage-0-2026-10-14.md) while the persistence and transport runtime is held. It builds on the [O1 scratch candidate](../evidence/matched-pair-ordinary-stage-1-scratch-receipt-2026-10-14.md). Nothing here is implemented. Every instance uses $c_f=1$.

## 1. Owners, read on 2026-10-14

| Owner | What it gives O2 | Source |
| --- | --- | --- |
| `ValidatedRunRecord` | Opens only from an exact origin: no evidence, zero radii, no continuation, admitted by a zero-length driver call. Appends one leg per driver call, checking the leg against the sealed continuation and evidence the driver returned. Serializes claims only, never evidence or a continuation. Extendable only in the process that opened or restored it | `ValidatedRunRecord.hpp` |
| `restore_validated_run` | Replays every leg from the origin through the real driver, against an expectation supplied from outside: `expected_record` (the SHA-256 of the complete bytes), `expected_controls` (the complete bound control set and optionally the origin members), or none. Reports the identity basis, the identity actually read and the compared fields. A refusal returns no population, evidence or continuation | same |
| v8 provider checkpoint | Canonical JSON, a stored digest that detects corruption only, `binding` over the encoded request, resolved model and legacy numerical fingerprint, the original request as `preparation`, a 32 MiB symmetric size rule, and `providerState` per provider | `ProviderTransport.cpp:181–330` |
| Durable writer | `write_evolution_checkpoint_bytes_atomic`: exclusive temporary file, fsync, rename, directory fsync. The v2 response reports `durable: true` only after it returns, and `storageFailure` otherwise | `Checkpoint.hpp`, `ProviderTransport.cpp:336` |

The record holds per-leg accepted counts and the operational inputs of each call (requested end, accepted-step limit, the count after which it was cancelled), but **not rejected counts**. Its restore result reports replayed legs and accepted steps, not rejected attempts. This matters for §4.

## 2. Where the record lives

**Proposed: the sealed `NativeValidatedContinuation` from O1 also carries the run's record.**

- **New run from an exact origin.** When a selected request has no continuation and is an origin, the bridge opens a record. Opening repeats the driver's zero-length admission, so it adds no rule of its own.
- **Each invocation.** The bridge appends the invocation's leg to a copy of the incoming record, and the returned continuation carries the extended copy.
- **Typed callers** get persistence by passing the continuation along, with no separate record API to misuse.
- **Not an origin.** A run that started from supplied evidence or declared radii has no record. Its continuation reports that, and creating a v9 checkpoint for it is refused with `checkpoint_origin_required`.
- **Failed append.** If the record refuses a leg it should accept, the bridge does not drop that silently. The certificate reports the refusal reason, the continuation carries no record, and v9 creation is refused with that reason. The run's own result is unaffected, because the record is a transcript, not the evidence.
- **Memory halt.** A memory-budget halt appends no leg, because no driver call ran past admission. The caller keeps the continuation it already holds.

## 3. The v9 checkpoint

`eom_provider_checkpoint/v9`. v8 keeps its schema, bytes and every admission; v8 continues to refuse the validated selection (O1).

| Field | Content |
| --- | --- |
| `schema` | `eom_provider_checkpoint/v9` |
| `execution` | `{method: canonical_validated_far_step_evolution/v1, controls}`, where `controls` is the complete bound control set in the record's own encoding (pair policy and groups included). The worker count is execution metadata and is not bound |
| `executionDigest` | SHA-256 of the canonical `execution` object |
| `binding` | SHA-256 over the encoded request without interval and run identity, the resolved model, the legacy numerical fingerprint, as in v8, and `executionDigest` |
| `resolvedModel` | As v8, for the same canonical numerical model. The model digest of the same model is unchanged by the method |
| `preparation` | The caller's original request, encoded as v8 does, with `execution` beside it |
| `runId`, `acceptedTime`, `acceptedCount`, `rejectedCount`, `controllerStep` | Claims about the accepted boundary, every one confirmed against replay on resume. Counts are cumulative since the origin |
| `histories` | The published histories at the boundary, as v8, for consumers and for the post-replay comparison |
| `providerState` | `{schema: validated-run-record/v1, record: <the record's canonical bytes as a string>, recordIdentity}` |
| `digest` | As v8: SHA-256 of the canonical body. Corruption detection only, not a trust anchor |

The checkpoint holds no evidence and no continuation. The v8 size rule applies unchanged to the whole envelope: the checkpoint plus the reserved original request must fit 32 MiB. A record that does not fit is refused with `checkpoint_size_exhausted`, and the response keeps accepted coverage with `durable: false`. The durable writer is reused unchanged. The non-fsynced record helper of increment 4 is not the persistence promise.

## 4. Resume

`resume_validated_provider_checkpoint(original request, checkpoint text, end)` runs these steps in order. Any refusal returns no paths, evidence or continuation.

1. The request must select the validated method. The stored digest must match; a mismatch is reported as corruption.
2. `binding`, `resolvedModel`, `executionDigest`, `preparation` and `runId` must equal the values computed from the caller's original request. This is the v8 rule, plus the execution.
3. **Resource admission before replay.** Replay reruns every leg from the origin, so the bridge's estimate is made for the origin population over the whole span from the origin to the new end, plus the record and envelope bytes. A budget below that estimate is refused before any replay, with no usable state. As in O1, this is an estimate, not a measured bound.
4. `restore_validated_run(record, expectation, thread_count)`. The expectation is `expected_controls`: the controls translated from the caller's request, with the origin members computed from the caller's own preparation, never from the checkpoint. The result's identity basis, the identity actually read and the compared fields go into the response. The response does not claim that the controls select one original record: a different record with the same origin and controls also satisfies them, and replay establishes only that the record is a valid run of those inputs.
5. Every envelope claim is compared with replay:
   - `acceptedTime` and `controllerStep` with the replayed continuation;
   - `acceptedCount` with its cumulative count;
   - `histories` with the replayed paths, by provenance fingerprint and exact segments;
   - `rejectedCount` with the replayed rejected total. **This needs the restore to report that total; see question 1.**
6. The bridge mints the `NativeValidatedContinuation` from the replayed continuation, the replayed rejected total and the restored record. It runs the new leg through the O1 path with the restart counters equal to the replayed ones, and returns the certificate. The continuation carries the record extended by the new leg.

A caller-supplied restart counter that disagrees with replay is refused. Restart state is never taken from the checkpoint without replay.

## 5. Planned qualification, known cases first

- **Known.** A v9 round trip at zero legs restores the exact origin. The v8 default outputs and wire bytes are compared with the O0 baseline by the O1 comparison instrument.
- **Round trips.** Uninterrupted against checkpointed-and-resumed:
  - after a cancellation at a callback;
  - after a diagnostic-limit leg;
  - with a changed worker count;
  - ungrouped and grouped;
  - with rejections before and after the cut.
  
  Each is compared on content, ledger, continuation, cumulative accepted and rejected counts, attempt numbering and callbacks. The frozen three-path brackets run on the resumed tubes.
- **Separate families, each refused with no usable state:**
  - stored-digest corruption;
  - resealed operational changes: a leg's end, limit or cancellation count;
  - resealed claim changes: a step token, a final state, `acceptedCount`, `rejectedCount`, `histories`;
  - a changed model, build, execution, preparation or run identity;
  - a caller restart counter that disagrees with replay;
  - a record not from an origin;
  - an over-budget replay, refused before replay starts.
- **Selection is reported, not overclaimed.** A different complete record with the same origin and controls is reported under `expected_controls` with its own identity; it is not claimed as the original.
- **Durability.**
  - an unwritable checkpoint path gives `durable: false` with accepted coverage;
  - an over-size record gives `checkpoint_size_exhausted`;
  - a successful write is read back byte-identical.

## 6. Files

| File | Change | Shared with the Surface session |
| --- | --- | --- |
| `ValidatedOrdinaryBridge.hpp`, `.cpp` | Record carried in the continuation; record open, append and restore wiring; replay admission | no |
| `ProviderTransport.cpp` | `create_validated_provider_checkpoint` and `resume_validated_provider_checkpoint` beside the v8 functions, reusing its canonical encoding, binding and size rule. No v8 line changes | yes, guarded narrow additions |
| `ValidatedRunRecord.hpp`, `.cpp` | Only if question 1 is answered yes: one additive result field | no |
| `ProviderTransport.hpp` | Two declarations | yes |
| A focused O2 fixture and checker | new | no |

The wire operations, capabilities and consumers stay in O3. In O2, v9 is reachable only through the typed functions and is not advertised.

## 7. Questions for the reviewer

1. **The replayed rejected total.** The cumulative rejected count can be reconstructed only by replay, and the restore result does not report it. Should I add one additive field, `replayed_rejected_steps`, the sum of the replayed legs' rejected attempts, to `ValidatedRestoreResult`? It would change no existing output, byte or behaviour of the accepted record unit. The alternative is for v9 to promise only the cumulative accepted count, with `rejected_step_count` documented as counted since the last restore. That would break the ordinary cumulative promise, so I recommend the additive field.
2. **The record inside the sealed continuation**, maintained automatically, rather than a separate record API. Is this acceptable?
3. **v9 only for runs from an exact origin.** A run started from supplied evidence or radii would have no v9 checkpoint. Is this an acceptable domain statement for this slice?
4. **v9 functions in `ProviderTransport.cpp`**, to reuse its canonical encoding and binding. The alternative is a new file with those helpers exported from the shared seam, which is a larger edit there.
5. **The loose memory estimate** (O1 receipt, about $7.2\times10^{14}$ bytes for a span of 3 at minimum step $10^{-4}$). Keep the O1 shape for the replay admission and decide wire defaults in O3, or tighten it now by bounding the history copies the driver actually retains?

**Falsifiers for this design.** Any of these:

- a restore that returns usable state without complete replay agreement;
- a cumulative counter taken from the checkpoint or the caller without replay;
- an identity basis or record identity misreported;
- a v8 byte or admission that changes;
- `durable: true` before the directory fsync;
- a v9 checkpoint for a run with no origin record.
