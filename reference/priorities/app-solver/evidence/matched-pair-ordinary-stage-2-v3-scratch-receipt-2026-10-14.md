# Ordinary Integration, Gate O2 Version 3: Corrected Persistence Scratch Packet

This is the corrected O2 scratch candidate. It covers:

- **O2-R1:** replay-seal authentication, first made in [version 2](matched-pair-ordinary-stage-2-v2-scratch-receipt-2026-10-14.md) and carried unchanged into version 3;
- **O2-R2:** the caller's controls and origin always bind;
- **the per-leg replay resource amendment**, which the [preliminary O2 review and its addendum](../analysis/matched-pair-review-ordinary-stage-2-preliminary-2026-10-14.md) required now, in O2.

The subject both findings examined is **O2 version 1**, archive `ee38a039c71fdb78…`. Versions 1 and 2, with their trees, outputs and receipts, are preserved unchanged. Everything in the [version 1 receipt](matched-pair-ordinary-stage-2-scratch-receipt-2026-10-14.md) carries over except where stated here. Live `src/eom` remains accepted O1 (inventory equal at 12:12Z), and the Surface session's `surface.css` is untouched. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-2-v3/](matched-pair-ordinary-stage-2-v3/).

| Diff | Lines | SHA-256 |
| --- | --- | --- |
| [Version 2 to 3](matched-pair-ordinary-stage-2-v3/o2-version-2-to-version-3.diff) | 271 | `4a5da02bc53b3ef9…` |
| [Version 1 to 3](matched-pair-ordinary-stage-2-v3/o2-version-1-to-version-3.diff) | 416 | `646fac7e0306b2cb…` |
| [Live to version 3, library](matched-pair-ordinary-stage-2-v3/live-to-o2-v3-library.diff) | 776 | — |

The tree is `.tmp/eom-ordinary-integration-2026-10-14/o2v3-tree/src/eom`, and raw outputs are under `…/ordinary-integration/o2v3-scratch/`.

## Corrections

**O2-R1 (from version 2).**

- A sealed `ValidatedReplayBoundary` is issued only by a complete replay, through the record unit's internal access seam. It holds that replay's continuation, rejected total, rebuilt record and identity, and `ValidatedRestoreResult.boundary` is set only on `restored`.
- `native_validated_continuation_from_replay` keeps its name and signature. It refuses unless every public field (status, continuation, rejected total, identity, record bytes) equals the boundary's, and the boundary's continuation and record agree. It builds only from the boundary.

**O2-R2.** `resume_validated_provider_checkpoint` always restores under the caller's complete controls and exact origin members. A named complete record identity is checked first, against the record's bytes, as an additional, stricter selection. The reported basis is:

- `expected_record` when an identity was named, with `record_identity` added to the compared fields (14);
- `expected_controls` otherwise (13 fields).

The lower-level record API is unchanged.

**Replay resource amendment.**

- The record is first read as plain claims (`read_validated_run_record`), with no replay.
- For each leg, the bound uses that leg's requested end and accepted-step limit. Replay passes both to the driver, which enforces them. Each leg is bounded from the origin, so one clipped final step per leg is counted.
- The bound is the largest leg's working set (replay holds one leg's certificate at a time), plus the new leg's, plus the whole retained history for every leg's reachable steps, plus four copies each of the record and the envelope.
- It is computed with the admitted runtime worker count. The bridge's bound now also charges 8 MiB of stack for each of the `worker_count − 1` helper threads.
- It is refused before replay when over the original's budget, and refused as `validated_resource_bound_unavailable` if it cannot be held in 64 bits. The resume result reports `replay_step_bound` and `replay_bound_bytes`.
- **It is an admission bound with stated allowances, not a measured resident-set cost.**

The bridge's bound function is factored to expose its reachable steps, attempts and per-segment allowance as `NativeValidatedBound`. The arithmetic is unchanged apart from the added stack term.

## Results on the version 3 build

Release, two build workers, supervisor, exit 0, no warning. Library `fe5fda44f8c60e5e4a390dde2d520120ad6b9d6ddd9824f29745b5fa3116a98e`.

| Check | Result |
| --- | --- |
| **Reviewer's O2 replay-seal probe, unchanged** | The known genuine boundary passes first. Then the changed public counter and the unrelated zero-leg record are both **refused**, and no continuation is issued |
| Reviewer's O1 admission probe, unchanged | Two known passes, then six domain refusals |
| **[O2 version 3 checker](matched-pair-ordinary-stage-2-v3/o2-v3-check-output.txt)** | **50 of 50**, known cases first. It keeps every version 1 row (all 47 pass on these outputs) and adds three |
| O2-R2 targets | Genuine foreign records, each with its own consistent claims and resealed into the caller's envelope, are **refused at the expectation stage, before replay**. They differ by origin position, charge, coupling, pair policy, or prehistory start. Each is refused both under its own named complete identity and under the default: 10 requests, naming `origin` or the differing control |
| Same-origin alternatives | The genuine alternate record still restores under `expected_controls`, reported as itself, and is refused against the original's named identity. The original restores under its own named identity |
| **Many short legs** (known) | Ten invocations of a two-path run, each ending at a clipped step of 0.001 against a minimum step of 1/128, are checkpointed and resumed to 0.011. Replay passes 10 steps, more than the whole-span count $\lfloor 0.010/(1/128)\rfloor+1 = 2$. The reported per-leg step bound, 13, equals the checker's independent exact recomputation from the record's leg ends and limits, and covers the 10 |
| Worker override in the bound | One versus four workers changes the replay bound by exactly $2\times3\times8$ MiB (11,864,860 against 62,196,508 bytes): three helper stacks in the replayed leg and in the new leg |
| Genuine restores | Rejected-leg (7 replayed, 214 and 42), multi-leg (two- and three-leg records, the diagnostic chain), worker-changing and zero-step restores all still equal the uninterrupted runs |
| Frozen increment 4 v2 checker on rebuilt outputs | 157 of 157. Outputs and record files byte-identical to the accepted live ones |
| Default comparison; field dispositions | 73 identical, 11 named-path, 0 different; 103 of 103 |

## Worker-dependent fields, by design

The added stack allowance makes every reported memory estimate depend on the worker count. Two consequences follow, and I state them rather than hide them:

1. **The unchanged O1 version 2 checker** gives [56 of 57](matched-pair-ordinary-stage-2-v3/o1-v2-check-output.txt) on this build. Its one failing row is its one-worker versus four-worker byte identity. I verified that all 26 differing rows differ only in `memory_estimate` and, in the two cases whose budget is set from the estimate, `memory_budget`.
2. **The O2 version 3 checker's worker row** excludes exactly these fields: the reported runtime worker count and replay bound; checkpoint file hashes, which bind the original `threadCount`; ordinary-row memory estimates and derived budgets; and the tight-budget case's checkpoint size and the two refusal messages that quote its bound. The excluded quantities are checked by their own rows. The three earlier runs of that row are preserved as `o2-v3-check-output-first-run-worker-row.txt`, `-second-run-memory-estimate.txt` and `-third-run-tight-budget.txt`.

If the reviewer prefers a worker-independent per-invocation estimate, the stack term could be kept in the replay bound only. I recommend keeping it in both, so that admission never undercounts thread stacks.

## Defects of my own instruments in this version, preserved

1. The first changed-ancestry target moved only one path's prehistory start. The producer correctly refused it, because all histories must start at one common time, and the fixture stopped with a FATAL row. That output is kept in `o2v3-scratch/first-run-ancestry-common-start/`. The target now moves every path's start to −30.
2. The worker row was narrowed three times, as described above.

None of these changed the subject.

**Falsifiers.** Any of these:

- the unchanged replay-seal probe issuing a continuation;
- a foreign-origin or foreign-control record restoring under any basis;
- a reported per-leg step bound below the replayed steps or different from the exact recomputation;
- a bound that ignores the admitted worker count;
- any genuine restore refused;
- a record byte or frozen instrument changed.
