# Stage 3 Increment 4: Validated Run Records and Restoration by Replay, Scratch Qualification Receipt — 2026-10-12

Increment 4 lets a run of the validated evolution driver be written to a file and restored. The independent reviewer released it in the [increment 3 live review](../analysis/matched-pair-review-stage-3-increment-3-live-and-persistence-release-2026-10-12.md), under the design of addenda [4](../analysis/matched-pair-stage-3-evolution-design-addendum-4.md), [5](../analysis/matched-pair-stage-3-evolution-design-addendum-5.md) and [6](../analysis/matched-pair-stage-3-evolution-design-addendum-6.md). This receipt is the scratch packet. **Nothing here is applied to the live solver:** `diff -rq src/eom .tmp/eom-matched-pair/stage3i-tree/src/eom` reports no difference at 20:59:15Z, so the live tree is exactly accepted increment 3. Every instance uses $c_f=1$.

## What was built

A new unit, `ValidatedRunRecord`, in its own header and source file, with one line added to the solver's build list. The checkpoint unit, its format and the transport unit are not used or changed; `git status` shows no change to `Checkpoint.cpp`, `Checkpoint.hpp` or `ProviderTransport.cpp`.

- **The record.** A canonical text document with a format token, a digest of its body, and the body: scalars; both policy tokens and the declared pairs; the bound controls with budgets as exact decimal expansions; the origin time and an exact origin population, every segment's tokens; the legs, one per call of the driver, with that call's requested end, accepted-step limit, the count at which it was cancelled, and its claimed outcome; a step log of each accepted step's tokens and every path's content chain after it; and the claimed final controller state and ledger. It contains no evidence and no continuation. A record is read only if it is byte-for-byte the canonical form of what it contains.
- **The record builder.** A record is opened from an origin request and extended by one leg per returned certificate. Before a leg is appended, the fields of the accepted boundary are compared with the sealed continuation and evidence the driver returned, and each returned history's chain is recomputed. The accepted steps must also lead from the record's last population to the certificate's, through the sealed evidence each accepted step carries. The rest of the transcript is carried as claims.
- **Restore by replay.** The real entry point is called leg by leg from the exact origin, carrying only the continuation and evidence each leg returns. Each leg's outcome and each step's tokens and chains are compared with the claims, then the final state and ledger, and finally the record rebuilt by replay must serialize to exactly the bytes read. Only then are the replayed population, evidence, continuation and an extendable record returned.
- **Three identity bases**, reported in every result with the actual identity of the bytes read and the fields compared: `expected_record`, `expected_controls`, `record_only`. An empty expectation, an origin without controls, an identity combined with controls, and an identity that is not a SHA-256 value are refused before any replay.
- **Read without replay** returns the parsed record as claims. It has no evidence or continuation to give, and the record it returns cannot be extended.
- **File publication.** A record is written to a temporary file beside its destination and renamed over it. It is not flushed to stable storage.
- **`reseal`.** A function that recomputes the stored digest of an edited record. It exists so that the digest is visibly not a trust anchor, and the mutation tests use it.

## Identities

| Item | SHA-256 |
| --- | --- |
| Scratch tree `.tmp/eom-matched-pair/stage3j-tree/src/eom`, copied from live increment 3 | 93-file inventory [scratch-increment-4-source-inventory.sha256](matched-pair-stage-3-increment-4/scratch-increment-4-source-inventory.sha256); two files added and two changed |
| `ValidatedRunRecord.hpp`, new, 248 lines | `ce873211bc7fff39f4a03c60eda6e0f727c15f16ac81eff21490114232952516` |
| `ValidatedRunRecord.cpp`, new, 1117 lines | `a94ca7a6483cab46be9e79a8f301081ed6b37661bd36c2bfbcbaf52f621082e7` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `8cc77665f3fe5703a21032e4d9acdbaae8f6e849300385dcc87f58606b02fe49` |
| `CMakeLists.txt`, one line added | `cfcaa1bb0330101fdd212dc0f55ce4a4af8eb94dbcf67a79cd6799d9f724c6bd` |
| Scratch build library, `.tmp/eom-matched-pair/build-stage3j/` | `e4d085eb80cd30dc7a3c7e7d39c2083483d1c6032bc78e8ede137e930304faed` |
| Scratch evolution fixture program | `8f3c06e4c58280e8fab7c4bc366ec86e10e5088abe19476d07118620f2a0d3ad` |
| [matched_pair_stage_3_increment_4_check.py](matched_pair_stage_3_increment_4_check.py) | `88353752c3a582b6e50f395325a9198acbee3c1ac199d81c5b0b99cf7478f77a` |
| Scratch outputs, 34 files including the record files | [scratch-output-identities.sha256](matched-pair-stage-3-increment-4/scratch-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-4/scratch-outputs/` |

The evidence directory [matched-pair-stage-3-increment-4/](matched-pair-stage-3-increment-4/) holds the four sources, [increment-3-to-increment-4.diff](matched-pair-stage-3-increment-4/increment-3-to-increment-4.diff), which is the whole change, the run script, the checker output, and three record files as written by the fixture. The build is CMake Release, two build workers, no compiler warning, under the owned-compute supervisor with exit status 0. No fixture run wrote to its error stream.

## Instruments

The checker is the increment 2 checker with a section added; no earlier checker was modified. Its general rows, exact time, atomic shape, whole-step publication slack, ledger and debit, evidence chains, continuation and accounting, now also run over every run of the worker and record fixture commands, including the leg continued from a restored state. It recomputes the record file's identity and stored digest with Python's own SHA-256, which is independent of the solver's.

The fixture and checker are the implementation writer's. The independent element in this packet is the reviewer's frozen three-path bracket file, read unchanged.

## Results on the scratch build

| Check | Result |
| --- | --- |
| Increment 4 checker | 153 of 153 assertions, five recorded quantities, exit status 0 |
| Twelve earlier evolution fixture files, one worker, against accepted increment 3 live outputs | 12 of 12 byte-identical |
| Six ordinary and four far-step fixture files against accepted live outputs | 10 of 10 byte-identical |
| Record, worker and grouping fixture outputs at four workers against one worker | byte-identical |
| The four record files at four workers against one worker | byte-identical |

### Known cases first

| Case | Measured |
| --- | --- |
| Record file identity and stored digest | recomputed by the checker and equal; 70567 bytes for the one-leg record; no key named for evidence or continuation anywhere in it; origin radii all zero |
| Reseal of a sound record | changes nothing, by the library and by the text alone |
| One leg, individual route, restored under each basis | restored with the original's content chains, ledger and continuation: by record identity, by controls with origin, by controls alone, record only, and record only with another worker count |
| A further leg from the restored state | equals the same leg from the original state in chains, end states, ledger and continuation; the restored record accepts it |
| Reviewer's frozen brackets at $t=1/32$ | inside the tubes of the leg continued from the restored state, all three paths, position and velocity |
| Grouped snapshot route with the replayed evidence | the receiver's pair is `certified_enclosed` at grade `validated_far_step_tubes` with the evidence bound; the same histories without evidence are refused with `MPE-EVIDENCE-01` |
| Three legs, grouped, cancelled after two steps, resumed under another worker count | restored to its own accepted state, three legs and six steps; equal to the uninterrupted run |
| Adaptive run whose first leg's requested end clamps its step | restored from its two legs; the same record with the first leg's end changed is refused at replay |
| File write | replaces an existing record, leaves no temporary file, and refuses a path it cannot write |

### Mutation families, kept apart

Across 107 restore results, 88 refuse and 19 restore. **No refusal returns usable state:** no paths, evidence, continuation, ledger or record. Every result reports the identity of the bytes it read.

- **Expectation admission, 5 cases:** empty, origin only, identity with controls, identity that is not a hash, identity in upper case. Each refused before any replay; none treated as a record-only replay.
- **Raw corruption:** one character changed with the stored digest left alone. Refused on the digest under controls and record-only bases and under the corrupt bytes' own identity; refused on the bytes under the original's identity.
- **Resealed selected-record changes, 16 changes under four bases each.** The original's record identity refuses every one. Expected controls refuse every changed control, and with an origin every changed origin. A false step chain, step end, leg status or leg count is refused at replay. A false final controller step, cooldown or ledger is refused at the final comparison.
- **Weaker bases accept what they cannot distinguish, 11 results:** a slack increment budget, cooldown length and attempt limit under record-only; a slack accepted-step limit under both controls bases and record-only; a different origin under controls without origin and record-only; different legs under both controls bases and record-only. Each reports its basis, the fields compared, and an identity that is not the original's.
- **Malformed records, 15:** field speed 2, unknown evolution policy, pair policy without pairs, coupling not a number, budget not a number, negative, zero, or beyond binary64, a step not a plain decimal, an origin that declares a radius, a missing part, another format version, not a document, not canonical, and zero workers. Each refused at read for its content, with the digest recomputed so that the digest is not the reason.
- **Record builder, 13 cases:** a genuine certificate is appended. Refused: altered ledger, accepted time or controller step; swapped population; swapped evidence; a genuine certificate of another run; no continuation; a request with another control or start; a second leg without the first's continuation; opening at a population that is not an origin. A transcript field altered after the driver returned is appended as a claim and then refused at replay.
- **Read without replay:** returns three legs, six steps and the origin as claims; the returned record cannot be extended; a corrupt record returns nothing.

### A defect the fixture found

On its first trial the record builder accepted a genuine certificate of a different run, because it compared the certificate with its own seals but not with the record's last population. The builder now walks the sealed evidence of each accepted step from the record's last chains to the certificate's. The trial output is retained under `.local-data/eom-matched-pair/2026-10-12/increment-4/first-trial-append-accepted-another-run/`.

## What this establishes and what it does not

**Claim grade: measured**, on the scratch build, for the cases listed.

Established on these cases: a restored run's evidence and continuation are issued by replay and behave as the original's do, in a further leg and in the grouped snapshot route; nothing read from a file becomes evidence or a continuation; every false claim tried is refused with no usable state; the three bases claim exactly what they select; and requests that use no record are unchanged.

Not established: authentication of a record across processes or machines, which is not provided; durability of the written file against power loss; any timing of replay, which reruns the steps and inherits the measured growth of step cost with history length; records of populations larger than three paths or with more than one declared pair; and binding of any of this into the ordinary evolution request or the checkpoint identity. The race detector was not rerun for this increment, whose own code is single-threaded. Live qualification has not been attempted.

**Falsifiers.** A restore under `expected_record` that accepts bytes other than those named; a result under a weaker basis that claims a particular original; evidence or a continuation constructed from file contents; usable state after a failed comparison; a restored or continued tube that excludes an independently known true state; or any change to a checkpoint or transport source or output.
