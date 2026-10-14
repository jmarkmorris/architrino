# Stage 3 Increment 1, Live Application Receipt — 2026-10-12

The [increment 1 receipt](matched-pair-stage-3-increment-1-receipt-2026-10-12.md) recorded the scratch qualification of the serial validated evolution driver and ended with the live application still to come. This receipt records that application and the live qualification. The default behaviour of every existing entry point is unchanged, evolution's ordinary entry points still refuse every grouped token and the validated evolution token, and nothing is persisted or transported. Every instance uses $c_f=1$.

## How it was applied

By the implementation writer, through the host's file-editing tools, which the host accepted: three edits to existing files and three new files. No shell command wrote into `src/eom`. The edits and files are exactly those of the scratch tree qualified in the increment 1 receipt.

**Measured before, 18:41:26Z:** the live 87-file inventory taken after the library port verifies unchanged by `shasum -a 256 -c`, and `patch --dry-run` of the three per-file pieces is clean.

**Measured after, 18:46:39Z:** `diff -rq src/eom .tmp/eom-matched-pair/stage3d-tree/src/eom` reports no difference, and `shasum -a 256 -c` of the live tree against the qualified scratch tree's 90-file inventory reports no changed entry. Each new file was compared with its prepared copy by `cmp` as it was written. `git status --short src/eom` shows six modified and seven untracked files: the library port's ten, of which `CMakeLists.txt`, `ValidatedFarStep.hpp` and `ValidatedFarStep.cpp` now also carry increment 1, plus `ValidatedEvolution.hpp`, `ValidatedEvolution.cpp` and `native/eom_validated_evolution_fixture_cli.cpp`.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after increment 1 | 90-file inventory `live-increment-1-source-inventory.sha256` under `.local-data/eom-matched-pair/2026-10-12/increment-1/` |
| `ValidatedEvolution.hpp` | `e7dffb7b6303cd297830d42a8b2c2516bc5c935b909835339de723e08424c733` |
| `ValidatedEvolution.cpp` | `a5df0690ec8671e8dfc7e61b660fc41882bd1b4789a4e11c970c7c9c4363c637` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `f7709a5decc5a6967e6e21d0db4828b871f873652f64d180d7f488a26153e4a7` |
| `ValidatedFarStep.hpp`, `.cpp` | `92513547d85fd3ccc0ec7145207a8a6b169e5c92e582f7a13853a8f5bd2a48db`, `2ef37e2c469503442ecdd5c8676ca423a695aae9bcfd716565c561eb82217526` |
| `CMakeLists.txt` | `ba725e56147a4dbe6a57c070bf414d5ca133f600744b0f3197e828be5781b02b` |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-1/` | `c708c5aa322779699792dedf3690eb3b83a14b0afe1d678f43c1399f906a597d` |
| Live evolution fixture program | `a2bfad7cb50ab0aa551c2feae1ca459cfbeae07a7455319f9023eedc7f6e0be7` |
| [matched_pair_stage_3_increment_1_check.py](matched_pair_stage_3_increment_1_check.py), unchanged since the scratch qualification | `443104ce90d93c7a247e626f9294e3aaa9f5e1ef3915e20a4066c53117ac6aff` |

The live build is CMake Release with two workers and the Command Line Tools toolchain selected per process, in its own build directory, with no compiler warning. Build and run each executed under the owned-compute supervisor with exit status 0; the run finished at 2026-10-12T18:48:49Z after 95.6 seconds with its process group closed. Raw outputs are under `.local-data/eom-matched-pair/2026-10-12/increment-1/live-outputs/`.

## Results

| Check | Result |
| --- | --- |
| Increment 1 checker on live outputs | 47 of 47 assertions, one recorded quantity, exit status 0; the eight known rows first |
| Against the qualified scratch outputs | All 15 output files byte-identical: five evolution fixture files, four far-step fixture files and six existing fixture files |
| Existing fixture outputs against the Stage 2 live outputs | 6 of 6 byte-identical |
| Far-step fixture outputs against the live-gate outputs | 4 of 4 byte-identical, so the one-field change to the producer certificate changed none of its output |
| Library-port gate checker rerun on the live outputs | 95 of 95 rows |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

The detailed rows are those of the increment 1 receipt, reproduced exactly on the live build: closed-form static brackets and the reviewer's frozen three-path brackets contained; exact decimal boundaries including the large-epoch case; every refusal's fixed disposition with nothing published; the ledger, evidence chain and callbacks; cancellation and exact resumption; and the aliasing control contained from both a resolved and an adversarial initial step.

## What this establishes and what it does not

**Claim grade: measured**, by the live build and the checker above. The live solver now contains the serial validated evolution driver as its own unit, and on these cases it behaves exactly as the qualified scratch build did, with every existing output unchanged.

The limits are those of the increment 1 receipt. No grouping, workers or persistence. The policy and its controls are not bound into the ordinary request or the checkpoint identity. Byte-identity with the scratch build is one source compiled twice. Independent review of the increment is the reviewer's. Falsifiers: any live file differing from the qualified scratch tree; a checker row failing on a rebuild from the inventoried sources; or a changed existing output.
