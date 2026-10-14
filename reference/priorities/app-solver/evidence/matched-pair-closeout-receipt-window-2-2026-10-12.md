# Matched-Pair Integration, Window 2: Preservation and Stop Receipt — 2026-10-12

The reviewer's [final reconciliation](../analysis/matched-pair-review-window-2-closeout-2026-10-12.md) accepts live increment 4, declares the selected bounded Stage 3 sequence complete, and asks for this receipt: what was attained, what was retained, and confirmation that work has stopped. It adds no claim. The first window's closeout is the [earlier receipt](matched-pair-closeout-receipt-2026-10-12.md). Every instance uses $c_f=1$.

## Stop

**Measured at 21:27:47Z:** the owned-compute supervisor's closeout for this session reports status `clear` over 2291 checked leases, and a process scan finds no solver fixture, probe, build or supervisor process of this session. No new implementation or compute was started after the reviewer's stop at 21:27:21Z. The collaboration watcher for this assignment is not running and will not be restarted. No source was changed after the live application of increment 4, no feature was added, and nothing was staged, committed or published.

**Measured at 21:28:01Z:** `shasum -a 256 -c` of the live `src/eom` against the accepted increment 4 inventory of 93 files reports every entry unchanged.

## Attained, each independently accepted on the live solver

| Step | What it is | Live receipt |
| --- | --- | --- |
| Library port | The validated far-step producer, sealed evidence, and the snapshot route's admission of validated tubes | [receipt](matched-pair-stage-3-live-library-port-receipt-2026-10-12.md) |
| Increment 1 | The serial validated evolution driver, after findings I1-R1 to I1-R4 and I1-R3b | [version 4 receipt](matched-pair-stage-3-increment-1-v4-receipt-2026-10-12.md) |
| Increment 2 | Declared matched pairs enclosed by a whole-step interval, off by default | [receipt](matched-pair-stage-3-increment-2-live-receipt-2026-10-12.md) |
| Increment 3 | Worker threads with a deterministic merge, one by default | [receipt](matched-pair-stage-3-increment-3-live-receipt-2026-10-12.md) |
| Increment 4 | Run records and restoration by replay, after findings I4-R1 and I4-R2 | [receipt](matched-pair-stage-3-increment-4-live-receipt-2026-10-12.md) |

The mathematics and design are in the [evolution design](../analysis/matched-pair-stage-3-evolution-design.md) and its addenda 1 to 6. The acceptance of each step is the reviewer's, recorded in the reviewer's own files; this receipt does not restate it as the writer's finding.

## Retained

One identity list binds every record of this window: 152 entries, covering the design and its six addenda, fifteen receipts, the checkers and instruments, and the seven evidence directories. It is `.local-data/eom-matched-pair/2026-10-12/window-2-closeout-records.sha256`, SHA-256 `3e3a6ddc74de157e21c2881359ed64103f27719b53be2d4ccbcb25eb56689a5a`.

Every superseded subject is kept: each increment's earlier versions, their scratch trees under `.tmp/eom-matched-pair/`, and their outputs under `.local-data/eom-matched-pair/2026-10-12/`. No earlier checker, frozen reference or reviewer instrument was modified.

Failures and first attempts are kept, each beside the increment it belongs to:

| Retained | What it shows |
| --- | --- |
| `increment-1/first-check-disjointness-expectation/` | A checker expectation of mine that was wrong: a valid wider tube need not exclude an erroneous interval |
| `increment-1-v2/first-check-h0-now-preflight/` | Checker rows that still expected the first subject's behaviour after admission moved earlier |
| `increment-1-v4/first-run-producer-threw/` | The public producer raised an exception on a malformed coupling; found by my fixture, fixed |
| `increment-2/first-run-case-design/` | A between-node case whose bound came out near 9.9 and was refused, and case-design errors of mine |
| `increment-3/scratch-tsan/` | Race-detector runs made before its known case existed; rerun afterwards |
| `increment-4/first-trial-append-accepted-another-run/` | The record builder accepted another run's certificate; found by my fixture, fixed |
| `.tmp/eom-matched-pair/cost-probe/first-run-spacing-error/` | A cost probe whose population was wrongly spaced |

## Scope, unchanged from the reviewer's reconciliation

Established for the validated evolution driver as a separate entry point, on the populations tested. Not established and not claimed: binding of the validated policy, controls or continuation into the ordinary evolution request or the checkpoint identity; authentication of a record across processes or machines; durability of a record file against power loss; the time replay takes; any benefit of grouping, whose measured effect on the three-path population is a tube about four billion times wider; refinement of grouped tubes; general freedom from data races; ordinary evolution enablement; the moment expansion; and anything about a physical branch. Nothing was published.

## For the operator

The live solver's working tree carries all of this as uncommitted changes: six modified and ten untracked files under `src/eom`, plus new records under `reference/priorities/app-solver/` and an updated status section in the Barnes-Hut manuscript. The shared trackers were not edited by the writer; the reviewer reconciles them. Committing and publishing are the operator's to invoke.
