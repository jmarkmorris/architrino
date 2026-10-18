# Ordinary Integration, Gate O2: Persistence Scratch Candidate Receipt

O2 implements [persistence design version 2](../analysis/matched-pair-ordinary-stage-2-design-v2.md) in scratch, as released in the [O1 live review](../analysis/matched-pair-review-ordinary-stage-1-live-2026-10-14.md). It is a scratch candidate. Live `src/eom` is the accepted O1 tree, unchanged: its 96-file inventory equals [live-o1-source-inventory.sha256](matched-pair-ordinary-stage-1-live/live-o1-source-inventory.sha256), observed at 11:46Z. Every instance uses $c_f=1$.

Evidence:

- [matched-pair-ordinary-stage-2/](matched-pair-ordinary-stage-2/): sources, the [whole library change against live](matched-pair-ordinary-stage-2/live-to-o2-library.diff) (596 lines), the fixture, the checker, scripts, outputs and identities.
- Scratch tree: `.tmp/eom-ordinary-integration-2026-10-14/o2-tree/src/eom`, [inventory](matched-pair-ordinary-stage-2/scratch-o2-source-inventory.sha256) of 97 files.
- Raw outputs: `.local-data/eom-matched-pair/2026-10-14/ordinary-integration/o2-scratch/`.

## The change

It is made from fresh live bytes equal to accepted O1. Every line removed from an existing file is in the O1 bridge. The record, transport and CMake changes add lines only, so no v8 line and no existing record line changes.

| File | Change |
| --- | --- |
| `ValidatedRunRecord.hpp`, `.cpp` | Additive `replayed_rejected_steps` in `ValidatedRestoreResult`. It is summed from the `run.rejected_step_count` of each leg certificate the replay actually issued, refuses at stage `replay` if the sum would overflow, and is assigned only on `restored`. No record byte, existing field or existing check changes |
| `ValidatedOrdinaryBridge.hpp`, `.cpp` | The sealed `NativeValidatedContinuation` carries the generating record and its status: `recorded`, `not_an_origin`, `open_refused: …` or `append_refused: …`. A run with no continuation opens a record only at an exact origin (no evidence, no analytic carrier, no declared radius) through `ValidatedRunRecord::open`, which repeats the driver's zero-length admission. Each invocation's leg is appended to a copy, and a refused append drops the record and reports why. `native_validated_continuation_from_replay` issues a continuation only from a `restored` result with continuation and record. The working-set bound adds three record copies |
| `ProviderTransport.hpp`, `.cpp` | Typed `create_validated_provider_checkpoint` and `resume_validated_provider_checkpoint`, with result `ValidatedProviderResume`, added beside v8. No wire operation, capabilities entry or advertisement |
| `CMakeLists.txt` | The O2 fixture target, with the Boost include path the fixture needs for its JSON edits |

**The v9 envelope:**

- `execution`: the method and the bound controls the v2 encoding does not carry. These are the increment budgets, the total budget, attempts, retries, cooldown, pair policy and groups. Worker count and the diagnostic limit are not part of it.
- `executionDigest`.
- `binding`: v8's, plus the execution digest.
- `resolvedModel`.
- `preparation`: `{request: v2 encoding of the original request, execution}`, so the original `threadCount` is bound.
- Claims: `acceptedTime`, `acceptedCount`, `rejectedCount`, `controllerStep` and `histories`.
- `providerState`: `{schema: validated-run-record/v1, record, recordIdentity}`.
- `digest`, which detects corruption only.
- The v8 32 MiB symmetric size rule applies.

No evidence or continuation key appears in any written checkpoint.

**Resume order.** Every failure throws `EquationAdmissionError`, so no partial state is ever returned.

1. The original request: the validated selection, its controls, and no continuation or restart counters.
2. Envelope keys, schema and stored digest.
3. Execution, binding, resolved model, preparation and run identity, all against the caller's original request.
4. The runtime worker count: the override or the original's, from 1 to 32.
5. The requested end after the claimed accepted time.
6. **Resources before any replay:** the bound for one run from the origin to the requested end, plus four copies of the envelope, against the original's memory budget.
7. `restore_validated_run` under `expected_controls` (the caller's controls and its own origin members), or `expected_record` when the caller names a complete record identity.
8. Every claim against replay.
9. Only then is the continuation issued, and the resumed invocation runs through the ordinary entry with replayed counters.

**Worker map.** As designed, `preparation` and `binding` bind the original `threadCount` byte for byte, and the override is runtime-only. The next v9 written after a resumed leg keeps the original preparation.

## Results

**Build.** Release, two build workers, owned-compute supervisor, exit 0, no compiler warning or error. Library `ee38a039c71fdb7896ec8f92340dad6f10372fb9694d590274d07420ef347f43`; persistence fixture `34e1e233092a46601a79256e5436d32c868d452e206d1bcd7493a011614f1763`.

**[O2 checker](matched-pair-ordinary-stage-2/o2-check-output.txt): 47 of 47, known cases first.** It imports the O1 version 2 checker and, through it, the accepted increment 4 version 2 checker, both unchanged. The known cases are:

- the accepted exact-decimal, static-bracket and frozen three-path known cases;
- the ordinary controller's own row under the ordinary-view predicates;
- the fixture's reseal routine reproducing a written v9 byte for byte, so every resealed target below is a genuine reseal;
- 13 written checkpoints that reseal to themselves and hold no evidence or continuation key;
- durable write and read-back.

| Target | Result |
| --- | --- |
| Accepted bookkeeping over every run, including every leg resumed from v9 | Exact time, atomic shape, whole-step slack, ledger and debit, chains, continuation: all pass |
| Ordinary view, 27 runs | Cumulative counts, attempt numbering, callbacks (3…8 after a resume from 2, 6…8 from 5), status, halt codes, continuation counters |
| Frozen three-path brackets | Inside the uninterrupted run, the resumed-from-zero run, the resumed-from-two leg, the genuine alternate's resumed leg, and the $h=1/256$ resumed leg |
| Round trips equal to the uninterrupted run | Ten: from zero accepted steps; from two; from two with 4 workers; from two again (a stale but genuine checkpoint); from five (a two-leg record); a three-leg record continued in process after a partial resume; the diagnostic chain 3, 6, 8; the alternate under `expected_controls`; the original under `expected_record`; and the alternate record inside the original's envelope. Each matches on content chains, ledger, sealed continuation, end states and cumulative counts |
| Finer grouped round trip | Equal to the O1 fixture's uninterrupted run at $h=1/256$ |
| Rejection chain | Cut after 3 accepted and 7 rejected; replay confirms 7 rejections; the resumed run equals the uninterrupted 214 accepted, 42 rejected |
| Identity | Every resume reports the identity of the record it read. The basis is `expected_record` only where the caller named one, `expected_controls` otherwise. A **genuine alternate record** (same origin and controls, two one-step legs) restores under `expected_controls` and is reported as itself, also when placed in the original's resealed envelope with consistent claims. Under `expected_record` naming the original, it is **refused** |
| Record status | `recorded` for exact origins. A run seeded with evidence is `not_an_origin`, and its v9 is refused `checkpoint_origin_required` |
| 28 refusals, each with its expected code | Foreign execution, population, run identity, coupling; `threadCount` changed inside the request; a request carrying a continuation; a v8 document; end not after the accepted time; worker override 0 and 33; corruption without reseal; resealed accepted count, rejected count, accepted time, controller step, histories and record-identity claim; a resealed record with a changed leg cancellation or step end (refused by replay, not by the digest); a record edited without reseal; a genuine three-step record in the two-step envelope; a changed memory budget (bound in the preparation); the replay bound over budget; a 17 MiB run identity (`checkpoint_size_exhausted`); a preflight-refused origin |
| Resources before replay | A run whose budget equals its own admitted estimate (5,125,541 bytes) runs and is checkpointed. Its resume is refused `checkpoint_resource_refused`: the replay bound of 5,040,596 bytes plus 309,852 bytes of copies exceeds the budget. With a resealed false record under the same budget, the resource refusal is still the one reported, so it precedes replay |
| No usable partial state | Refused restores at the record layer, under the `expectation` and `replay` stages, hold no paths, evidence, continuation or record, and no replayed rejected count. Every v9 refusal is an exception |
| Storage | The shared durable writer's file reads back byte-identical. A write into a missing directory fails and is reported not durable |
| Workers | One and four workers agree on all 742 rows except two fields. Each resume reports its runtime worker count. Each checkpoint's whole-file SHA-256 differs because the bound original `threadCount` differs, and the durable note prints that hash. The two written v9 files differ structurally only at `/preparation/request/numerics/threadCount`, `/binding` and `/digest`; record identities are equal |

**Regression on the O2 build:**

- **Frozen increment 4 version 2 checker, unchanged, on rebuilt outputs:** [157 of 157](matched-pair-ordinary-stage-2/increment-4-v2-check-output.txt), the accepted count. The rebuilt increment 4 outputs, including every record file, are byte-identical to the accepted live increment 4 outputs by `diff -rq`. The additive restore field changes no record byte.
- **O1 version 2 checker, unchanged:** [57 of 57](matched-pair-ordinary-stage-2/o1-v2-check-output.txt).
- **Reviewer's admission probe, unchanged:** two supported known passes first, then six explicit domain refusals.
- **O1 fixture against live O1:** of 714 rows, 26 differ, only in `memory_estimate`, plus `memory_budget` in the two cases whose budget is set from the estimate. That is the record-copy term added to the bound.
- **[Default comparison](matched-pair-ordinary-stage-2/default-comparison.txt):** 73 identical, 11 equal after the named build-identity and binding paths, 0 different.
- **[Field dispositions](matched-pair-ordinary-stage-2/field-dispositions.txt):** 103 of 103.

## Defects of my own instruments, preserved

1. **The fixture's first run** stopped with a FATAL row. A case continued in process from a run already at its end, and the ordinary admission correctly refused the zero-length invocation. The output is kept in `o2-scratch/first-run-fixture-error/`. I replaced the case with continuation from the two-step cut, plus continuation after a partial resume.
2. **My first resource case changed the memory budget on resume.** It was refused as a binding mismatch, because the budget is in the bound preparation. That is correct behaviour, but it was not a resource test. The output is kept in `o2-scratch/second-run-resource-case/`. The case now runs under its honest name, and the genuine resource case was added.
3. **The checker's worker-identity row** first compared whole checkpoint hashes, then the durable note's hash. Both depend on the bound original `threadCount` by design. Both runs are preserved as `o2-check-output-first-run-worker-row.txt` and `o2-check-output-second-run-durable-detail.txt`. The row now excludes only those fields, and a separate row proves structurally which fields of the written files differ.

None of these changed the subject.

## Limits

- **Scope.** v9 is typed only; the wire, advertisement and consumers belong to O3. Persistence exists only for runs from exact origins.
- **Identity.** `expected_controls` admits any genuine record of that origin and those controls. It is not an original-record selection, and the response says which record was read.
- **Resource bound.** It is an admission bound with stated allowances, not a measured resident-set cost. The replay bound uses one run from the origin to the requested end.
- **Independence.** The fixture, checker and code are mine. The independent elements are the frozen brackets, the accepted increment 4 checker, the frozen O0 baseline and the reviewer's probe, all unchanged.

**Proposed live application, on release:**

1. Re-observe the live preimages, including the Surface state.
2. Apply the seven library files and the fixture with the file-edit tools.
3. Confirm `diff -rq` is empty.
4. Build into a separate live directory.
5. Rerun everything above.

**Falsifiers.** Any of these:

- usable state from any failed or partial restore;
- a cumulative counter not equal to replay;
- a misreported identity basis or record identity;
- an alternate record called the original;
- a v8 byte or admission changed;
- `durable` reported after a writer failure;
- a v9 written for a run without an origin record;
- a preparation that changes with the worker override.
