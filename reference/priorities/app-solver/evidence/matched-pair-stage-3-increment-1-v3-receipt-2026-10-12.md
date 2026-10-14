# Stage 3 Increment 1, Versions 2 and 3: Corrections Receipt — 2026-10-12

The independent review of the first increment 1 subject found four defects, I1-R1 to I1-R4. This receipt records their correction, in scratch and then on the live solver bytes. Version 2 corrects I1-R1 to I1-R3; version 3 adds I1-R4. What each correction does is stated in [design addendum 2](../analysis/matched-pair-stage-3-evolution-design-addendum-2.md). The first subject, its outputs and its retained failures are preserved unchanged under [matched-pair-stage-3-increment-1/](matched-pair-stage-3-increment-1/) and in its [scratch](matched-pair-stage-3-increment-1-receipt-2026-10-12.md) and [live](matched-pair-stage-3-increment-1-live-receipt-2026-10-12.md) receipts. The reviewer's instruments and frozen references were read and not modified. Every instance uses $c_f=1$.

The default behaviour of every existing entry point is unchanged. The ordinary evolution entry points still refuse every grouped token and the validated evolution token. Nothing is persisted or transported. The checkpoint unit is untouched.

## How it was prepared and applied

Each version was made in a fresh scratch tree copied from the live bytes of the moment, qualified there, and then applied to `src/eom` through the host's file-editing tools. No shell command wrote into `src/eom`.

| Step | Measured |
| --- | --- |
| Version 2 scratch tree `stage3e-tree`, from live version 1 | 76 of 76 assertions by the version 2 checker |
| Version 2 applied live | 19:03:02Z: `diff -rq src/eom .tmp/eom-matched-pair/stage3e-tree/src/eom` reports no difference |
| Version 2 live build and run | supervised, exit status 0, finished 19:05:09Z after 119.3 s; version 2 checker 76 of 76; all fixture outputs byte-identical to the scratch outputs |
| Version 3 scratch tree `stage3f-tree`, from live version 2 | 86 of 86 assertions by the version 3 checker |
| Version 3 applied live | `diff -rq src/eom .tmp/eom-matched-pair/stage3f-tree/src/eom` reports no difference, and the 90-file live inventory equals the scratch tree's inventory |
| Version 3 live build and run | supervised, exit status 0, finished 19:15:25Z after 118.1 s, no compiler warning |

Six files differ from the first subject: `ValidatedEvolution.hpp`, `ValidatedEvolution.cpp`, `ValidatedFarStep.hpp`, `ValidatedFarStep.cpp` and the two fixture programs. `CMakeLists.txt` and every other file of `src/eom` are unchanged since the first subject.

## Identities

| Item | SHA-256 |
| --- | --- |
| Live `src/eom` after version 3 | 90-file inventory [live-increment-1-v3-source-inventory.sha256](matched-pair-stage-3-increment-1-v3/live-increment-1-v3-source-inventory.sha256) |
| `ValidatedEvolution.hpp` | `88d4bd4113057728013ae9190b449e8d3637d4d127fa1739edbcefaa4cb3e4b4` |
| `ValidatedEvolution.cpp` | `7208f03caaf2d70fbde3b295fdbafe7747f86e07fd6b6ff6f14cb5b6af30acfd` |
| `native/eom_validated_evolution_fixture_cli.cpp` | `d01b143022851e5c40feb36f1afa734ece7488a4bb6f89c25fb7e3afd7e1254d` |
| `ValidatedFarStep.hpp` | `d4527d74a351daf21cdcfe1ea2eabfd033f26a4b8c65cbc809620bab942baa06` |
| `ValidatedFarStep.cpp` | `6694f0e18e607278f710eb603db9b1cc4a8eb00151ef9fd3b9649a010d42a6d9` |
| `native/eom_validated_far_step_fixture_cli.cpp` | `4709347aff45a6c7843842bddd541e468c43f4d8422c895f073c69990818b536` |
| Live build library, `.tmp/eom-matched-pair/build-live-increment-1-v3/` | `ff9207c0f7053da39eb4f0736d2639e226a77be4d0f2f425ec88e8a62f082509` |
| Live evolution fixture program | `c41eb1b4f8e5ba7e4c7a867de6125a2d9a08270825eb067ca737dc9084aab4ef` |
| [matched_pair_stage_3_increment_1_v2_check.py](matched_pair_stage_3_increment_1_v2_check.py) | `d3dbb9507704c2f897d32bb79101e25c9162168fd0b96c2b47bc0c75445c95a0` |
| [matched_pair_stage_3_increment_1_v3_check.py](matched_pair_stage_3_increment_1_v3_check.py) | `b06350258bba79bc05041de66e319dae9d8ba57a0779ff688ba6b5019123e497` |
| [matched_pair_stage_3_increment_1_v3_delta.py](matched_pair_stage_3_increment_1_v3_delta.py) | `45b7cececc2d4c0e93f1a15f4cafc9259cbd74e516c7bbdf8b79ff46992136cd` |
| Live outputs, 19 files | [live-output-identities.sha256](matched-pair-stage-3-increment-1-v3/live-output-identities.sha256); the files are under `.local-data/eom-matched-pair/2026-10-12/increment-1-v3/live-outputs/` |

The evidence directory [matched-pair-stage-3-increment-1-v3/](matched-pair-stage-3-increment-1-v3/) holds the six live sources, the two diffs between versions, the run script, the checker outputs, and the ledger fixture output. The other raw outputs are large and stay in the local directory named above, bound by the identity list.

## Instruments

The version 3 checker is the version 2 checker with rows added; the version 2 checker is the version 1 checker with rows added; no earlier checker was modified. Each reads the fixture's JSON-lines output, converts every binary64 value and decimal token to an exact rational, and uses no driver or producer code. Known cases run first, and a failed known case stops the run with exit status 2 before any target. The delta instrument compares the version 2 and version 3 outputs row by row and has its own known cases.

The checkers and the fixture were written by the implementation writer. Their agreement with the subject is not independent evidence. The independent elements are the reviewer's frozen three-path and aliasing brackets, which the checker reads unchanged, and the reviewer's own probes and exact checker, which are the reviewer's to run on these bytes.

## Results on the live build

| Check | Result |
| --- | --- |
| Version 3 checker | 86 of 86 assertions, three recorded quantities, exit status 0 |
| Version 2 checker, unchanged, on the version 3 outputs | 76 of 76 |
| Against the version 3 scratch outputs | every fixture output byte-identical |
| Six existing solver fixture outputs against the version 2 live outputs, which equalled the Stage 2 live outputs | 6 of 6 byte-identical |
| Library-port gate checker on the version 3 far-step outputs | 95 of 95 rows |
| Output changes from version 2 to version 3 | 276 corresponding rows; the only changed fields are the charge fields, none below its former value; the only new fields are the declared radius, the two parts of the charge and the run's budgets; no other difference |
| `scripts/check-transmitter-factor-clean-slate.mjs` | passes |

### I1-R1, resumption

| Case | Measured |
| --- | --- |
| Reviewer's adaptive case, uninterrupted | four accepted steps of $0.75$ |
| Cancelled after two accepted steps at $1.5$ | controller step $0.75$, cooldown $3$, ordinal $2$ retained in the continuation |
| Resumed with the continuation | two steps of $0.75$; content chains, end states, ledger and continuation identical to the uninterrupted run |
| Same population and evidence without the continuation | a new run: one step of $1.5$, ordinal from zero, content chains differ from the uninterrupted run. Recorded, not asserted to be anything else |
| Immediate cancellation after resume | no attempt; prior ledger and the same continuation returned |
| Cancelled during a cooldown that followed retries, then resumed | identical to the uninterrupted run; cooldown $2$ at the cut, 11 accepted and 1 refused after it |
| Run halted on the total budget, then resumed | halts again at once with its ledger intact, ordinal $6$ |
| Eight continuations that do not bind | each refused with its reason and nothing published: changed initial step, increment budget, total budget added, cooldown length, attempt limit, stale state, another population's state, changed coupling |

### I1-R2, budgets

A finite positive total budget is admitted first. Then the driver refuses 12 requests before any attempt: each field in turn as not-a-number, positive infinity, negative infinity, zero and a negative value, and both fields together as not-a-number and as infinity. The producer declines 20 steps with `VFS-H0-01` and publishes nothing: the same five values in each field of the increment budget and of the total budget.

### I1-R3, admission

Known first: a zero-length run at the histories' end completes with no attempt; a zero-length run on a generated population with its own evidence completes and keeps it; a step limit of zero at a valid start halts as a limit. Then six refusals, each returning no accepted time, evidence, ledger or continuation: the reviewer's zero-length case with start and end at $1$ on histories ending at $0$, the same start under immediate cancellation and under a step limit of zero, a generated population with no evidence, and a generated population with another population's evidence at zero length and under immediate cancellation.

### I1-R4, the debit

| Case | Measured |
| --- | --- |
| Every accepted step in the packet | 972 path-axis records: inherited plus increment is never below the published total, by exact rational comparison; every increment is within the run's increment budget; the driver's ledger equals the producer's record |
| Reviewer's static case, large budget | accepted. Source position on the third axis: declared $0$, published $5.3290705182007545\times10^{-15}$, charged $5.3290705182007553\times10^{-15}$ |
| The part the first subject charged | $2.3665827156630358\times10^{-30}$, below the published radius by a factor $2.3\times10^{15}$. Recorded |
| Reviewer's tiny-budget target, budgets $10^{-25}$ | halted, `VFS-BUDGET-01`, one attempt, nothing published, inputs returned |
| Position budget $6\times10^{-15}$ | accepted, charging the whole published radius |
| Position budget $5\times10^{-15}$ | refused; this budget lies between the first subject's charge and the published radius, so the first subject would have accepted it |
| Public producer, same four budgets | two certified, two declined `VFS-BUDGET-01` without publication |
| Second step on the generated layer | inherits the first step's declared total $5.3290705182007545\times10^{-15}$, charges $5.329070518200755\times10^{-15}$, publishes $1.0658141036401509\times10^{-14}$ |

The driver halts the tiny-budget target as `minimum_step_exhausted` after one attempt, because the request sets the minimum step equal to the initial step. The refusal is the producer's `VFS-BUDGET-01`.

## What was not rerun

The separate three-path four-step program of the library-port receipt was not rebuilt. The delta instrument shows that no published coefficient, radius or evidence chain changed, and the version 1 rows that test the reviewer's three-path brackets through the driver are among the 86 that pass.

## What this establishes and what it does not

**Claim grade: measured**, by the live build, the three checkers and the delta instrument, on the cases listed. The live solver's validated evolution driver now resumes exactly from a sealed continuation, refuses malformed budgets, admits the initial population before any return, and charges the whole growth of the declared radius against the increment budget.

It does not establish acceptance of increment 1; that is the independent reviewer's. It adds no grouping, workers or persistence. The continuation and the evidence are sealed within one process only, and the policy, controls and continuation are not bound into the ordinary request or the checkpoint identity. The debit correction was exercised on two-path and three-path populations already in the packet and on one new static configuration. Byte-identity between scratch and live is one source compiled twice.

**Falsifiers.** Any live file differing from the inventory; a checker row failing on a rebuild from the inventoried sources; a changed existing fixture output; the reviewer's unchanged tiny-budget probe publishing a segment on these bytes; the reviewer's exact ledger comparison finding a record with inherited plus increment below total; or a resumed run differing from its uninterrupted run.
