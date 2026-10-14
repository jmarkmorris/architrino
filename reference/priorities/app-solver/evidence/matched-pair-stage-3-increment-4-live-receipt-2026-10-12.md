# Stage 3 Increment 4: Validated Run Records and Restoration by Replay, Live Application Receipt — 2026-10-12

The [first scratch receipt](matched-pair-stage-3-increment-4-scratch-receipt-2026-10-12.md) records what increment 4 is, and the [version 2 scratch receipt](matched-pair-stage-3-increment-4-v2-scratch-receipt-2026-10-12.md) records the correction of review findings I4-R1 and I4-R2. The independent reviewer accepted version 2 for narrow live application in the [version 2 review](../analysis/matched-pair-review-stage-3-increment-4-v2-2026-10-12.md). This receipt records the live application and qualification. The default worker count is one, grouping is off unless selected, the ordinary evolution entry points are untouched, and the checkpoint and transport units are untouched. Every instance uses $c_f=1$.

## How it was applied

**Measured before, 21:16:58Z:** `shasum -a 256 -c` of the live tree against the 91-file inventory of accepted increment 3 reports every entry unchanged.

Two new files were written and two existing files edited with the host's file-editing tools, which the host accepted. No shell command wrote into `src/eom`. The two new files, 254 and 1169 lines, each compared byte-identical with the reviewed scratch file on first write. The fixture was edited in ten hunks and `CMakeLists.txt` in one.

**Measured after, 21:21:42Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3k-tree/src/eom` reports no difference. The live 93-file inventory file is byte-identical to the scratch inventory file the reviewer verified. `git status --short src/eom` lists sixteen entries, two more than before: `ValidatedRunRecord.hpp` and `ValidatedRunRecord.cpp`. It lists no change to `Checkpoint.cpp`, `Checkpoint.hpp` or `ProviderTransport.cpp`.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after increment 4 | 93-file inventory [live-increment-4-source-inventory.sha256](matched-pair-stage-3-increment-4-v2/live-increment-4-source-inventory.sha256), equal to the reviewed scratch inventory |
| The four sources | as listed in the version 2 scratch receipt; the live files are those bytes |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-4/` | `2cfa249a30dacedc9f74c48158323caede8c05b8be31ff95f45a4c73d26d298f` |
| Live evolution fixture program | `061184e872e3a84b185247e097948e35fd9dd0abfb9837f526263d7048ca476c`, the same as the scratch program |
| Live outputs, 36 files | [live-output-identities.sha256](matched-pair-stage-3-increment-4-v2/live-output-identities.sha256), byte-identical to the scratch identity list; the files are under `.local-data/eom-matched-pair/2026-10-12/increment-4-v2/live-outputs/` |
| Reviewer's record probe, unchanged | `2a5ddb7ab916d0966ebb04600214c07712e3e7ac318ac5fc3fcb2fd141e88f44` |
| Reviewer's record replay probe, unchanged | `3bea05d84f4fed74e590eb104ba963053aafa0a62da0cc2ebd638aa378fc7c9a` |
| Checker | unchanged since the version 2 scratch receipt |

Build, fixture runs and both probe runs executed in one supervised job with exit status 0, finished at 21:24:19Z after 133 s, with no compiler warning.

## Results on the live build

| Check | Result |
| --- | --- |
| Version 2 checker | 157 of 157 assertions, exit status 0 |
| Against the reviewed scratch outputs | all 36 output files byte-identical, including the record files |
| Twelve earlier evolution fixture files against accepted increment 3 live outputs | 12 of 12 byte-identical |
| Six ordinary and four far-step fixture files against accepted live outputs | 10 of 10 byte-identical |
| Record, worker and grouping outputs at four workers against one worker | byte-identical |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

**The reviewer's two probes, compiled unchanged against the live library and run.** These are the reviewer's instruments, run here as a convenience; the independent run is the reviewer's.

- *Record probe.* Both known cases pass first. The five zero-leg changes, zero minimum step, no attempt allowance, bad charge, unrepresentable coupling and duplicate identifier, are each refused at admission with no paths, evidence or continuation. A changed request charge, a changed request identifier and stale evidence are each refused at append; a changed field speed is refused as before.
- *Record replay probe.* Its external SHA-256 known case and its genuine selected-record replay pass first. Empty, origin-only, contradictory and malformed-hash expectations are refused at the expectation stage. Resealed slack controls are refused under the full identity and under the original controls, and accepted by bare replay without a claim to the original. Controls with the original origin refuse another origin; controls alone accept another admitted origin. A genuine two-leg continuation reissues evidence and record identically. A false final claim is refused at the final stage and a false second leg at replay, each with no usable partial state. A claims-only record cannot be appended to and a rejected append preserves the record's bytes, as do three continued-append binding targets.

The detailed rows of the checker are those of the two scratch receipts, reproduced exactly: restoration under the three identity bases; a further leg and the grouped snapshot route using replay-issued evidence; the reviewer's frozen brackets inside the continued tubes; the separate corruption, resealed-change, weaker-acceptance, false-claim, malformed-record and builder families; and no usable state after any refusal.

## What this establishes and what it does not

**Claim grade: measured.** The live solver can write a run of the validated evolution driver as a record of claims and restore it by replaying the real driver, and on these cases it behaves exactly as the reviewed scratch build did, with every earlier output unchanged.

The limits are those of the scratch receipts. A record is not authenticated across processes or machines. The written file is not flushed to stable storage. Replay reruns the steps and was not timed. Populations are of three paths with at most one declared pair. Nothing is bound into the ordinary evolution request or the checkpoint identity. Byte-identity with the scratch build is one source compiled twice.

**Falsifiers.** Any live file differing from the inventory; a checker row failing on a rebuild from the inventoried sources; either reviewer probe reporting a restored or appended target on these bytes; a changed earlier output; or any change to a checkpoint or transport source.
