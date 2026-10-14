# Stage 3 Increment 3: Worker Threads in the Validated Step, Live Application Receipt — 2026-10-12

The [scratch receipt](matched-pair-stage-3-increment-3-scratch-receipt-2026-10-12.md) records what increment 3 is and how it was qualified in scratch. The independent reviewer accepted that candidate for narrow live application in the [increment 3 review](../analysis/matched-pair-review-stage-3-increment-3-2026-10-12.md). This receipt records the live application and qualification. The default worker count is one, grouping is off unless selected, the ordinary evolution entry points are untouched, and nothing is persisted or transported. Every instance uses $c_f=1$.

## How it was applied

**Measured before, 20:35:47Z:** `shasum -a 256 -c` of the live tree against the 90-file inventory of accepted increment 2 reports every entry unchanged.

One new header was written and five files were edited with the host's file-editing tools, which the host accepted. No shell command wrote into `src/eom`. Each edit is one hunk of the reviewed difference.

**Measured after, 20:37:13Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3i-tree/src/eom` reports no difference. The live 91-file inventory file is byte-identical to the scratch inventory file the reviewer verified. `git status --short src/eom` lists fourteen entries, one more than before: the new header `ValidatedWorkers.hpp`. `CMakeLists.txt` is unchanged by this increment.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after increment 3 | 91-file inventory [live-increment-3-source-inventory.sha256](matched-pair-stage-3-increment-3/live-increment-3-source-inventory.sha256), equal to the reviewed scratch inventory |
| The six sources | as listed in the scratch receipt; the live files are those bytes |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-3/` | `8f2ba1b7ff1896895ca5753208692f6595fbe07f10bec0e643927639122cbc23` |
| Live evolution fixture program | `96f6db99f51bbeabd4ff924f14689f5ac1fad47e8bf8c1b4dfa5bd30310bbe4b`, the same as the scratch program |
| Live race-detector build library, `.tmp/eom-matched-pair/build-live-increment-3-tsan/` | `f2b5033fae816771c1a52d489d5380f97918612a2d7b34a06c075b3bea2ef3f9` |
| Live outputs, 118 files | [live-output-identities.sha256](matched-pair-stage-3-increment-3/live-output-identities.sha256), byte-identical to the scratch identity list; the files are under `.local-data/eom-matched-pair/2026-10-12/increment-3/live-outputs/` |
| Checker and race-detector known case | unchanged since the scratch receipt |

Build, fixture runs and race-detector runs executed in one supervised job with exit status 0, finished at 20:43:32Z after 364 s. The release build has no compiler warning.

## Results on the live build

| Check | Result |
| --- | --- |
| Increment 3 checker | 12 of 12 assertions, exit status 0, the three known rows first |
| One worker against accepted increment 2 live outputs | 11 evolution fixture files and the 10 ordinary and far-step fixture files byte-identical |
| 2, 3, 4 and 8 workers and two repeats each of 4 and 8, against one worker | 96 of 96 files byte-identical |
| Against the reviewed scratch outputs | all 118 files byte-identical |
| Increment 2 checker on the one-worker and eight-worker outputs | 133 of 133 on each |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

**Race detector, on a sanitizer build of the live tree, known cases first.** The planted race is reported and the safe variant is not. Then twelve runs, the worker, grouping, continuation and controller cases at 1, 2 and 8 workers: no report, every error stream empty, and every output byte-identical to the live one-worker output.

## What this establishes and what it does not

**Claim grade: measured.** The live solver's validated step evaluates its receivers on a requested number of threads, and on these cases every output byte is the same at every worker count tried, one worker reproduces the accepted outputs exactly, and the result equals the reviewed scratch build's.

The limits are those of the scratch receipt: a clean sanitizer report covers the paths exercised on small in-memory histories and is not general race freedom; byte-identity across counts is determinism and not correctness; no speed-up was measured; exception-against-refusal ordering was tested on the runner with synthetic tasks. No persistence, and nothing bound into the ordinary request or the checkpoint identity.

**Falsifiers.** Any live file differing from the inventory; an output byte differing between worker counts or repeats on a rebuild from the inventoried sources; a sanitizer report on those runs; or a one-worker output differing from the accepted increment 2 output.
