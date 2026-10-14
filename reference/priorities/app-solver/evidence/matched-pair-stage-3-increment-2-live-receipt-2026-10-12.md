# Stage 3 Increment 2: Whole-Step Matched Pairs, Live Application Receipt — 2026-10-12

The [scratch receipt](matched-pair-stage-3-increment-2-scratch-receipt-2026-10-12.md) records what increment 2 is and how it was qualified in scratch. The independent reviewer accepted that candidate for narrow live integration in the [increment 2 review](../analysis/matched-pair-review-stage-3-increment-2-2026-10-12.md). This receipt records the live application and the live qualification. Grouping is off unless a request selects the pair policy and declares pairs. The ordinary evolution entry points are untouched and still refuse every grouped token. Nothing is persisted or transported. Every instance uses $c_f=1$.

## How it was applied

**Measured before, 20:02:44Z:** `shasum -a 256 -c` of the live tree against the 90-file inventory of accepted increment 1 version 4 reports every entry unchanged, so no concurrent change had reached `src/eom`.

The seven changed files were edited with the host's file-editing tools, which the host accepted. No shell command wrote into `src/eom`. Each edit is one hunk of the reviewed difference.

**Measured after, 20:05:12Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3h-tree/src/eom` reports no difference, and `shasum -a 256 -c` of the live tree against the reviewed scratch inventory reports no changed entry. The live inventory file is byte-identical to the scratch inventory file. `git status --short src/eom` lists the same six modified and seven untracked files as before; increment 2 adds no file.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after increment 2 | 90-file inventory [live-increment-2-source-inventory.sha256](matched-pair-stage-3-increment-2/live-increment-2-source-inventory.sha256), equal to the reviewed scratch inventory |
| The seven changed sources | as listed in the scratch receipt; the live files are those bytes |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-2/` | `9740320e476a2c93c9e635f631167015f995ca7047233262f4a70c4b187dfe85` |
| Live evolution fixture program | `1c8dcc85a5a117f617aa95d65c85e0b731a65a09c796d4e0c2591c60658eb60d`, the same as the scratch program |
| Live outputs, 21 files | [live-output-identities.sha256](matched-pair-stage-3-increment-2/live-output-identities.sha256), byte-identical to the scratch identity list; the files are under `.local-data/eom-matched-pair/2026-10-12/increment-2/live-outputs/` |
| Checker, truth reference and delta instrument | unchanged since the scratch receipt |

The live build is CMake Release with two workers and the Command Line Tools toolchain, in its own build directory, with no compiler warning. Build and run executed under the owned-compute supervisor with exit status 0 and finished at 20:07:11Z after 119.5 s. The archive library's hash differs from the scratch library's although the sources are identical; the fixture program linked from it is byte-identical to the scratch program.

## Results on the live build

| Check | Result |
| --- | --- |
| Increment 2 checker | 133 of 133 assertions, five recorded quantities, exit status 0 |
| Increment 1 version 4 checker, unchanged | 100 of 100 |
| Against the reviewed scratch outputs | all 21 output files byte-identical |
| Requests that declare no pair, against accepted increment 1 live outputs | six ordinary and four far-step fixture files byte-identical; ten evolution fixture files agree on every existing field over 260 rows, with only the accounting, group list and pairing fields added |
| Library-port gate checker | 95 of 95 rows |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

The detailed rows are those of the scratch receipt, reproduced exactly.

## What this establishes and what it does not

**Claim grade: measured.** The live solver contains the whole-step pair bound and declared grouping in the serial validated driver, and on these cases behaves exactly as the reviewed scratch build did, with every output of a request that declares no pair unchanged.

The limits are those of the scratch receipt. Byte-identity with the scratch build is one source compiled twice and is not independent evidence. Grouping widens the receiver's tube by about nine orders of magnitude on the population measured and is selected only by explicit request. No workers, no persistence, and nothing bound into the ordinary request or the checkpoint identity.

**Falsifiers.** Any live file differing from the inventory; a checker row failing on a rebuild from the inventoried sources; or a changed output of a request that declares no pair.
