# Ordinary Integration of Validated Evolution, Stage O2: Persistence Design, Version 2

This revises the [O2 persistence design](matched-pair-ordinary-stage-2-design.md), which is preserved unchanged, under the dispositions of the [independent O1 review](matched-pair-review-ordinary-stage-1-2026-10-14.md). The base is the [O1 version 2 scratch correction](../evidence/matched-pair-ordinary-stage-1-v2-scratch-receipt-2026-10-14.md). Nothing here is implemented; O2 runtime stays held until O1 is live and accepted. Sections 1 and 3 of version 1 stand except where changed below. Every instance uses $c_f=1$.

## 1. Dispositions taken

| Review item | Version 2 |
| --- | --- |
| Rejected total from replay | Add `std::size_t replayed_rejected_steps` to `ValidatedRestoreResult`: the sum of `run.rejected_step_count` over the certificates of the legs actually replayed. Set only on `restored`. An addition that would overflow refuses at stage `replay` with no usable state. No record byte, existing result field or frozen instrument changes. The exact diff returns with the O2 packet, qualified known-first against the frozen increment 4 version 2 checker, unchanged, on rebuilt outputs |
| Record in the sealed continuation | `NativeValidatedContinuation` gains the generating record and a status (below). The certificate reports the status. Accepted coverage is never withheld because the record failed |
| Exact-origin-only v9 | Only a run whose record was opened at an exact origin can be written as v9. A run from supplied radii or evidence continues under O1 but has no persistent seed |
| Placement | Guarded typed v9 functions beside v8 in `ProviderTransport.cpp`; no v8 line changes. Unadvertised until O3 |
| Resource admission | The record, its copies and replay are added to the O1 version 2 bound (§4) |

## 2. Record status

Each selected run's continuation carries one of these record statuses:

- `recorded`: the generating record is complete through this boundary, and v9 creation is possible.
- `not_an_origin`: the run started from supplied radii or evidence. There is no record and no v9.
- `open_refused: <reason>` or `append_refused: <reason>`: the record unit refused. There is no record from then on, and v9 creation is refused with that reason.

Restartability and storage are reported separately in the transport response, as now:

- `durable: true` only after the durable writer's directory fsync;
- `storageFailure` with the reason otherwise, including `checkpoint_size_exhausted`, and with accepted coverage kept.

No response promises restartability for a run whose record was dropped.

## 3. Worker identity map

The conflict: v8-style `encode_request` writes `threadCount` into `preparation`, and `binding` hashes it, yet a changed-worker restart must work.

**Chosen rule: preserve the original preparation and binding byte for byte, and give the worker count a separate runtime override.**

- `resume_validated_provider_checkpoint(original_request, text, end, std::optional<std::size_t> worker_override)`. The caller supplies the original request unchanged, including its original `threadCount`. Preparation and binding are compared exactly as v8 compares them, so nothing is stripped or canonicalized away.
- The override, when present, sets the worker count for the replay and for the new leg. It must be at least one. Worker count changes how a step is executed and nothing it returns; that was qualified in Stage 3 increment 3 and is again by the O1 worker-identity row. The record binds no worker count.
- The v9 checkpoint written after the resumed leg keeps the original preparation, with the original `threadCount`, not the override. The response reports the worker count actually used.
- A caller who instead changes `threadCount` inside the request is refused `checkpoint_preparation_mismatch`, as v8 would refuse it.
- In O3, the wire carries the override as a separate `runtime: {threadCount}` member of the resume operation, outside `request`, under the same strict-key rules.

Tests: restart with worker counts 1→4 and 4→1 equals the uninterrupted run; changing `threadCount` in the request is refused; the written v9 preparation is byte-identical to the original's.

## 4. Resource admission

**Writing.** A record grows by one step-log entry per accepted step: three time tokens, bounded as in O1 version 2, and one 64-character chain per path. It grows by one leg per invocation. The continuation holds one record copy, and an append works on a copy. So the O1 version 2 bound adds, per reachable accepted step, $2 \times (3 \times \text{time token} + n \times \text{digest})$, and per invocation two copies of the incoming record's actual size.

**Resuming.**

- Before any replay, the bound is computed for replay as one run from the record's origin population to the new end, with the record's controls and the actual legs' limits. That replay bound covers the attempts and history versions the replay retains.
- Added to it: the record bytes, the envelope bytes, and the rebuilt record.
- Over budget, or with no finite bound: refused with no usable state, before any replay.
- Counters come from replay: accepted from the replayed continuation, rejected from `replayed_rejected_steps`. Overflow refuses.

The wire-default question raised in the O1 version 2 receipt applies here too: a long replay at a small minimum step can exceed 2 GiB under worst-case tokens.

## 5. Selection, alternatives and false claims

Three things are kept distinct in the response and in the tests:

- **Corruption detection.** The stored digest.
- **Caller selection.** `expected_controls`, with the caller's origin. This admits any complete record of a genuine run with those controls and that origin. The typed API also exposes `expected_record_identity`. When the caller supplies it, it selects exactly one complete record and refuses any other identity.
- **True-history replay.** Every leg is rerun through the driver and must agree with every claim.

Planned families, each with no usable state on refusal:

1. **A genuine alternative.** A different complete record with the same origin and controls, made by cutting the legs at different points or running to a different end, with its own envelope claims, resealed. Under `expected_controls` it restores and is reported with its own record identity and the basis `expected_controls`. It is not called the original. Under `expected_record_identity` naming the first record, it is refused.
2. **A record swapped without its claims.** The alternative record inside the first record's envelope claims, resealed. Replay agrees with the record, but `acceptedTime`, counts or `histories` disagree with the envelope, so it is refused at the claim comparison.
3. **False operational claims.** A leg's end, accepted-step limit or cancellation count edited and resealed. Replay disagrees, so it is refused.
4. **False result claims.** A step token, a chain, the final state, `acceptedCount`, `rejectedCount` or `histories` edited and resealed. Refused.
5. **Unresealed edits.** Refused as corruption.
6. **Model, build, execution, preparation or run identity changed.** Refused before replay.

Families 1 and 3 are what separate a legitimate alternative from a false claim. Both are resealed, and only the false one disagrees with its own replay.

## 6. Order of O2 work after release

1. The additive restore field, with the frozen known-first rerun.
2. The record status in the continuation, with record open and append in the bridge.
3. v9 create and resume beside v8, with the worker override.
4. The replay admission.
5. A focused fixture and checker, known cases first: a zero-leg v9 restores the exact origin; the O1 default comparison; the v8 bytes.

**Falsifiers.** Any of these:

- usable state without complete replay agreement;
- a cumulative counter taken without replay;
- a misreported identity basis or record identity;
- an alternative record called the original;
- a v8 byte or admission changed;
- `durable: true` before the directory fsync;
- a v9 written without an origin record;
- a preparation or binding that changes with the worker override.
