# Matched-Pair Integration Window: Closeout and Preservation Receipt — 2026-10-12

This receipt closes the implementation writer's part of the six-hour window recorded in the [integration conversation](../../../op/agent-chats/2026-10-11-eom-matched-pair-integration/chat.md), under the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md). It records what was applied to the live solver, what exists only in scratch, the retained identities, the host rejection that stopped the last step, and what remains open. It reports no new result. Every numerical instance in the referenced work uses $c_f=1$.

## Applied to the live solver

Stage 1 and the exact piecewise part of Stage 2 only, both applied earlier in the window under the operator's direct authorization and both independently accepted: the default-disabled grouped policy for single-time snapshots on exact histories. Their receipts are the [Stage 1 receipt](matched-pair-stage-1-live-integration-receipt-2026-10-11.md) and the [Stage 2 receipt](matched-pair-stage-2-live-integration-receipt-2026-10-11.md).

**Measured at 2026-10-12T01:52:32Z:** `shasum -a 256 -c` of the 82-file live inventory taken after Stage 2, run from `src/eom`, reports 81 files unchanged and one changed, `native/eom_stationary_joint_frontier_fixture_cli.cpp`, which another session modified at 2026-10-11T22:57:46Z and which this work never touched. `ls` finds none of the four library-port files in `src/eom`. Nothing from Stage 3 preparation is in the live tree.

## Scratch only, not applied

| Work | Where | Review state |
| --- | --- | --- |
| Aliasing control and exact true-state bracket | evidence files `matched-pair-stage-3-aliasing-control-*` | Accepted at its two tiers |
| Validated far-step theorem and Python prototype, versions 1 to 3 | addenda 1 to 4 and evidence files `matched_pair_stage_3_validated_far_step_*` | Version 3 accepted as bounded in-process predecessor evidence |
| C++ candidate, versions 1 and 2 | `evidence/matched-pair-stage-3-cpp-candidate/` and `-v2/` | Version 2 accepted for its bounded in-process producer and tube-snapshot domain |
| Library port of the producer, evidence header, five-file snapshot seam, build wiring and fixture | `.tmp/eom-matched-pair/stage3c-tree/`; copies of the four new files and the six-file difference from live under `.local-data/eom-matched-pair/2026-10-11/stage3-live-gate/prepared-not-applied/` | Preliminary reviewer read only; not applied, not qualified live |

The library port passed its scratch qualification before the live step was attempted: 95 of 95 checker rows, the producer, generated-source and long-run outputs byte-identical to the accepted version 2 candidate, six existing fixture outputs byte-identical to the retained live outputs, and the evolution entry point refusing the validated-tube policy. That is scratch evidence. It is not a live qualification.

## The host rejection

At about 2026-10-12T00:41Z one command that would have saved the six pre-change live files, written the difference, and copied six changed and four new files into `src/eom` was refused by the host's automatic permission check with the reason "Modify Shared Resources". The command did not run. A following read-only verification command was refused with the same reason, a third read-only command was declined, and the turn was stopped. No workaround was attempted and no other agent was asked to perform the write. The reviewer's cutoff entry then directed that the patch not be applied in this window even if permission were later granted.

## Retained identities

Record lists under `.local-data/eom-matched-pair/2026-10-11/`, each a `shasum -a 256` list; the first six verify with no changed entry at 01:52:32Z.

| List | Covers |
| --- | --- |
| `stage3-control-records.sha256` | Addendum 1, aliasing control, refinement and validated-step instance |
| `stage3-validated-far-step-records.sha256`, `-v2-`, `-v3-` | Python prototype versions 1 to 3 with their receipts and outputs |
| `stage3-cpp-candidate-records.sha256`, `-v2-` | C++ candidate versions 1 and 2 |
| `stage3-library-port-prepared-records.sha256` | The gate checker, the four prepared files, the six-file difference, the scratch outputs and the scratch tree inventory; 14 entries, written at closeout |
| `live-stage2-source-inventory.sha256` | The live solver after Stage 2 |

Retained failures stay where their receipts place them: the control's three, the prototype's four, the first C++ candidate's four, and the checker derivation script that stopped once. Nothing was removed. `.tmp` holds the scratch trees and builds and is disposable; the prepared files and difference were copied to `.local-data` for that reason. Local retention is not backup.

## Outstanding

- **Live application of the library port** needs the operator's direct authorization in the implementation writer's own session, naming `src/eom/CMakeLists.txt`, `MatchedPairEnclosure.hpp`, `MatchedPairEnclosure.cpp`, `CoupledEvolution.hpp`, `CoupledEvolution.cpp`, `CertifiedAcceleration.cpp` and four new files. Before applying, the six live files must be reobserved against the inventory, because the difference was taken against those bytes.
- **Live qualification** after application: rebuild, rerun the fixture and the gate checker, compare the six existing fixture outputs, and return identities for independent review.
- **Stage 3** is not entered. Accepted-state propagation, the accepted-step ledger and evidence and policy identity, atomic cancellation, worker replay, restart and persistence, and independent evolution acceptance are all open. The requested Stage 3 design note was not written.
- **Unchanged obligations:** the generated reference surface is stale from the Stage 0 contract correction and belongs to the publication procedure; the Xcode license is the operator's to accept; no cost measurement exists and no cost claim is made.

## Compute

`owned-compute-supervisor closeout` for this session reports status `clear` at closeout. No job was started after the cutoff.
