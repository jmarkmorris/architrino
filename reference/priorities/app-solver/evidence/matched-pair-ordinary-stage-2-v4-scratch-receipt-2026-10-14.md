# Ordinary Integration, Gate O2 Version 4: Combined Corrected Persistence Scratch Packet

This is the O2 candidate returned for review before live application. It carries three corrections and one amendment, from the [preliminary O2 review and its addenda](../analysis/matched-pair-review-ordinary-stage-2-preliminary-2026-10-14.md):

| Item | What it fixes | Where introduced |
| --- | --- | --- |
| **O2-R1** | Replay-seal authentication | [Version 2](matched-pair-ordinary-stage-2-v2-scratch-receipt-2026-10-14.md) |
| **O2-R2** | The caller's controls and origin always bind | [Version 3](matched-pair-ordinary-stage-2-v3-scratch-receipt-2026-10-14.md) |
| **Replay resource amendment** | Per-leg replay bound | Version 3 |
| **O2-R3** | Creation binding | Version 4, described here |

Every finding examined **O2 version 1** (`ee38a039c71fdb78…`). Versions 1 to 3, their trees, outputs and receipts are preserved unchanged, and their receipts carry over except where stated here. Live `src/eom` remains accepted O1 (inventory equal at 12:20Z), and the Surface session's `surface.css` is untouched. Every instance uses $c_f=1$.

Evidence: [matched-pair-ordinary-stage-2-v4/](matched-pair-ordinary-stage-2-v4/). The tree is `.tmp/eom-ordinary-integration-2026-10-14/o2v4-tree/src/eom`, and raw outputs are under `…/ordinary-integration/o2v4-scratch/`.

| Diff | Lines | SHA-256 |
| --- | --- | --- |
| [Version 3 to 4](matched-pair-ordinary-stage-2-v4/o2-version-3-to-version-4.diff) | 126 | `b89022ffcaf7d7f1…` |
| [Version 1 to 4](matched-pair-ordinary-stage-2-v4/o2-version-1-to-version-4.diff) | 519 | `b4906521869a1033…` |
| [Live to version 4, library](matched-pair-ordinary-stage-2-v4/live-to-o2-v4-library.diff) | 806 | — |

## O2-R3 correction

`create_validated_provider_checkpoint` now checks two bindings before it returns any bytes.

**The original request must be the generating record's.** That covers its controls (`validated_run_controls_difference` over the complete bound set), its origin time, and its exact origin members, by identifier, charge and content chain, in order. A mismatch is refused as `checkpoint_origin_mismatch`.

**Every persisted claim is the sealed accepted boundary's.**

- `acceptedTime`, `acceptedCount`, `rejectedCount` and `controllerStep` are read from the sealed continuation, and the run identity from the original request.
- The certificate's public scalars must equal them. The record's final time, count and controller step must equal the continuation's. A mismatch is refused as `checkpoint_controller_mismatch`.
- The certificate's public `histories` must be exactly the sealed continuation's members, in order, by identifier and content digest. A mismatch is refused as `checkpoint_claim_mismatch`.

Public certificate fields therefore cannot determine any persisted claim on their own.

## Results on the version 4 build

Release, two build workers, supervisor, exit 0, no warning. Library `3ba143fbda60e84f13ff26877fa6bc3938b376eaffd9c9914ec4de46bc82ecde`.

| Check | Result |
| --- | --- |
| **Reviewer's O2 checkpoint-creation probe, unchanged** | `KNOWN genuine ordinary checkpoint creation and restart PASS` first. Then the different-origin certificate is **refused** (`checkpoint_origin_mismatch`), and the changed public histories are **refused** (`checkpoint_claim_mismatch`) |
| Reviewer's O2 replay-seal probe, unchanged | Known pass first, then both mutated results refused |
| Reviewer's O1 admission probe, unchanged | Two known passes, then six domain refusals |
| **[O2 version 4 checker](matched-pair-ordinary-stage-2-v4/o2-v4-check-output.txt)** | **52 of 52**, known cases first. It keeps all 50 version 3 rows and adds two. Five foreign genuine certificates (origin, charge, coupling, pair policy, prehistory) are refused under the caller's original request. A genuine certificate with replaced public histories, or a changed public count, is refused. Creation after a worker-changed resume works |
| O2-R2 and resource amendment rows | As in version 3: ten foreign-record restores refused before replay; the many-short-leg bound equals its exact recomputation (13, against 10 replayed and a whole-span count of 2); the worker stack term is exact |
| Frozen increment 4 v2 checker on rebuilt outputs | 157 of 157; outputs and record files byte-identical to the accepted live ones |
| Default comparison; field dispositions | 73 identical, 11 named-path, 0 different; 103 of 103 |
| Unchanged O1 v2 checker | 56 of 57. The failing row is the one-worker versus four-worker byte identity, and its only differences are `memory_estimate` and the two budgets derived from it, because of the stack allowance (version 3 receipt) |

## Resource-bound argument

This is an admission bound with stated allowances, not a measured resident-set cost.

**One ordinary invocation (bridge):**

- **Reachable steps.** At most $\lfloor \text{span}/h_{\min}\rfloor + 1$ within the invocation's accepted-step limit, because every step but the last is at least $h_{\min}$. Computed with exact scaled-integer arithmetic.
- **Attempts.** At most `min(halvings + 1, max_attempts_per_step)` per step, plus one halting step's worth, where `halvings` is the exact number of halvings of the initial step that stay at or above $h_{\min}$.
- **Per attempt:** the attempt record, its producer certificate with one segment per path, every ordered pair and group, the ledger and evidence, and three atomic-step copies. These are the attempt's, the driver run's and the ordinary view's; their history contents are shared and counted once.
- **Per accepted step and path:** one history version, which holds a copied tail block of $((s_0+j-1)\bmod 64)+1$ segments, summed exactly, and its block index.
- **Tokens.** Time tokens are bounded by exact digit counts. Number tokens are charged at the 1,076-character maximum of an exact binary64 expansion.
- **Fixed terms.** Three generating-record copies, and 8 MiB of stack for each of the `worker_count − 1` helper threads.
- **Overflow** refuses rather than saturates.

**Replay for a v9 resume (transport):**

- The record is read as claims, with no replay. For each leg, its requested end and accepted-step limit, both enforced by the driver during replay, bound that leg's steps from the origin. That counts one clipped final step per leg, which the whole-span count misses: the many-short-leg case has 10 such steps against a whole-span count of 2.
- Replay holds one leg's certificate at a time. The bound is therefore the largest leg's working set, plus the new leg's, plus the whole retained history over all legs' reachable steps, plus four copies of the record and of the envelope.
- It is computed with the admitted runtime worker count.
- It is refused before any replay when over the original's memory budget.

## Defects of my own instruments in version 4

None. The fixture ran without a FATAL row, and the checker's first run passed.

**Falsifiers.** Any of these:

- either unchanged reviewer probe issuing what it targets;
- a certificate of another origin or other controls, or with changed public claims, being checkpointed;
- any genuine creation or restore refused;
- a record byte or frozen instrument changed;
- a bound below the stated retained shapes.
