# Ordinary Integration, Gate O2 Version 2: Replay-Seal Correction Receipt

This corrects the [O2 scratch candidate](matched-pair-ordinary-stage-2-scratch-receipt-2026-10-14.md) for finding O2-R1 of the [preliminary O2 review](../analysis/matched-pair-review-ordinary-stage-2-preliminary-2026-10-14.md). **The subject examined by that review is O2 version 1:** archive `ee38a039c71fdb78…`, the bytes my O2 packet bound. Version 1, its tree, outputs and receipt are preserved unchanged, and everything in that receipt carries over except where stated here. Live `src/eom` remains accepted O1 (inventory equal at 11:58Z). Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-2-v2/](matched-pair-ordinary-stage-2-v2/). The tree is `.tmp/eom-ordinary-integration-2026-10-14/o2v2-tree/src/eom`, and raw outputs are under `…/ordinary-integration/o2v2-scratch/`.

## O2-R1 and the correction

The finding is correct. In version 1, `native_validated_continuation_from_replay` took a public, mutable `ValidatedRestoreResult`. It checked only the `status` label and that a continuation and record were present, and then copied the result's rejected total and record into a sealed ordinary continuation. So an edited counter or a swapped record could be given continuation authority.

**The whole correction** is [o2-version-1-to-version-2.diff](matched-pair-ordinary-stage-2-v2/o2-version-1-to-version-2.diff), 149 lines, SHA-256 `b673b14ab6417ad8fe7e36a74d042209f05f701327390890656fa815485cffc8`.

- **`ValidatedRunRecord.hpp`, `.cpp`: a sealed `ValidatedReplayBoundary`.** Its constructor is private, and only the record unit's internal access seam calls it, at the end of a complete replay. It holds exactly that replay's driver continuation, rejected-step total, a copy of the rebuilt record, and the record identity. `ValidatedRestoreResult` gains `boundary`, which is set only on `restored`. Every existing field, record byte and rule is unchanged.
- **`ValidatedOrdinaryBridge.hpp`, `.cpp`: the factory now authenticates.** Its name and signature are unchanged. It refuses unless the result carries a boundary and every public field it reports equals the boundary's: the status, the continuation pointer, the rejected total, the record identity, and the record's serialized bytes. It also checks that the boundary's continuation and record agree on accepted time, count and controller step. It then builds the ordinary continuation from the boundary alone, never from the result's public fields.

Copying a result copies the shared, immutable boundary. Editing any reported field, or attaching another replay's boundary to a result whose fields differ, is therefore refused. A result whose fields equal its own boundary is just that replay.

## Results on the version 2 build

Release, two build workers, supervisor, exit 0, no warning. Library `57bf85ef55b9418d9563684ba15630c1f070598546fba1897c42e888e33db39a`.

| Check | Result |
| --- | --- |
| **Reviewer's replay-seal probe, unchanged**, compiled against this archive | `KNOWN static one-step complete replay and genuine sealed boundary PASS` first. Then the changed public replay counter is **refused**, and the unrelated zero-leg record is **refused**: "the restore result differs from the replay that issued it". No continuation is issued |
| O2 checker, unchanged | 47 of 47, known cases first. It includes the genuine **rejected-leg** restore (7 replayed, 214 accepted and 42 rejected), **multi-leg** restores (two- and three-leg records, the diagnostic chain), the **worker-changing** restore, and the genuine alternate record |
| O1 version 2 checker; reviewer's O1 admission probe | 57 of 57; two known passes, then six domain refusals |
| Frozen increment 4 v2 checker on rebuilt outputs | 157 of 157. The rebuilt increment 4 outputs and record files are byte-identical to the accepted live outputs; the boundary changes no record byte |
| Default comparison; field dispositions | 73 identical, 11 named-path, 0 different; 103 of 103 |
| Against O2 version 1 | O1 fixture outputs byte-identical. The persistence fixture output differs only in the 13 whole-checkpoint SHA-256 values and the durable note's hash. Those follow from the build's source digest, which changes the resolved model and binding. Record identities and every other row are unchanged |

**Falsifiers:**

- the unchanged probe issuing a continuation for either mutation;
- any genuine restore refused;
- a record byte or frozen instrument changed;
- any edited, recombined or refused result producing a continuation.
