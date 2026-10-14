# Stage 3 Increment 1 Receipt: Serial Validated Evolution Driver — 2026-10-12

This receipt records increment 1 of the [Stage 3 design](../analysis/matched-pair-stage-3-evolution-design.md), as corrected by its [addendum 1](../analysis/matched-pair-stage-3-evolution-design-addendum-1.md): a serial controller that advances a population by validated far steps only, with no matched-pair grouping, no workers and no persistence. It records the qualification in a scratch tree taken from a fresh observation of the live solver. Whether and when the same bytes were applied to the live solver is recorded in the last section. Every instance uses $c_f=1$.

## Subject

A scratch copy of the live solver, `.tmp/eom-matched-pair/stage3d-tree/src/eom`, taken at 2026-10-12T18:32:18Z when `diff -rq` against `src/eom` reported no difference, plus the changes below. Its 90-file inventory is `stage3d-tree-source-inventory.sha256` under `.local-data/eom-matched-pair/2026-10-12/increment-1/`.

| File | Change | SHA-256 |
| --- | --- | --- |
| [ValidatedEvolution.hpp](matched-pair-stage-3-increment-1/ValidatedEvolution.hpp) | New: request, ledger, attempt and run types; the entry point; the refusal map in its header | `e7dffb7b6303cd297830d42a8b2c2516bc5c935b909835339de723e08424c733` |
| [ValidatedEvolution.cpp](matched-pair-stage-3-increment-1/ValidatedEvolution.cpp) | New: the controller | `a5df0690ec8671e8dfc7e61b660fc41882bd1b4789a4e11c970c7c9c4363c637` |
| [eom_validated_evolution_fixture_cli.cpp](matched-pair-stage-3-increment-1/eom_validated_evolution_fixture_cli.cpp) | New: manual fixture, five commands | `f7709a5decc5a6967e6e21d0db4828b871f873652f64d180d7f488a26153e4a7` |
| [three-file-live-to-increment-1.diff](matched-pair-stage-3-increment-1/three-file-live-to-increment-1.diff) | `CMakeLists.txt`: one source and one fixture target. `ValidatedFarStep.hpp`: one field, `cause`. `ValidatedFarStep.cpp`: that field set at the two `VFS-H1-01` sites | `28deaaa656c83a215bcd982fe338c50a62753698bf817c5377ea7c78f658ec02` |
| [matched_pair_stage_3_increment_1_check.py](matched_pair_stage_3_increment_1_check.py) | Checker | `443104ce90d93c7a247e626f9294e3aaa9f5e1ef3915e20a4066c53117ac6aff` |

No other solver file differs. The ordinary request, the checkpoint unit, the matched-pair module and every evolution entry point are untouched. The build is CMake Release with two workers and the Command Line Tools toolchain selected per process, with no compiler warning. Build and run each executed under the owned-compute supervisor; the run finished at 2026-10-12T18:40:43Z after 92.7 seconds with exit status 0 and its process group closed. The checker ran under `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2.

## Outputs

[scratch-known.jsonl](matched-pair-stage-3-increment-1/scratch-known.jsonl), [scratch-controller.jsonl](matched-pair-stage-3-increment-1/scratch-controller.jsonl), [scratch-refusals.jsonl](matched-pair-stage-3-increment-1/scratch-refusals.jsonl), [scratch-cancellation.jsonl](matched-pair-stage-3-increment-1/scratch-cancellation.jsonl), [scratch-aliasing.jsonl](matched-pair-stage-3-increment-1/scratch-aliasing.jsonl), and the checker's [output](matched-pair-stage-3-increment-1/scratch-check-output.txt). Every attempt row carries the producer's certificate with exact decimal tokens, the attempt in the existing accepted-step shape, the controller's disposition and cause, and the per-axis ledger. Every run has a summary row with its status, halt code, complete attempt log, issued evidence, ledger, content chains of the returned and the input histories, end states and callback log. The two long aliasing runs emit their last accepted attempt and the summary.

## Results

The checker exits with status 0: 47 of 47 assertions pass and one quantity is recorded. The first eight rows are known cases that must pass before any target.

| Group | Result |
| --- | --- |
| Known | Exact halving and exact difference of decimal tokens. Static two-path run of two steps: both paths' tubes contain the closed-form brackets at both steps. Three-path run of four steps: the reviewer's frozen position and velocity brackets for all three paths, read unchanged, are inside the tubes at $t=1/128$, $1/64$ and $1/32$ |
| Exact time | Across 24 runs, accepted steps sum exactly to the accepted end and completed runs end at exactly the requested end. A final step is shortened to $0.004375$ to end at $0.02$. From exactly $10^{10}$, three steps of $0.0002987$ give the boundaries `10000000000.0002987`, `10000000000.0005974`, `10000000000.0008961`. A zero-length run completes with no attempt |
| Step shape and atomicity | All 57 emitted attempts carry the validated step schema with no substeps and no snapshot. Every refusal publishes its inputs, issues no evidence and records no ledger entry. In every run the returned histories, evidence and ledger are one accepted boundary, or all equal the inputs when nothing was accepted |
| Ledger | Per path and per axis: the total equals the published radius token, is never below the inherited radius, and each step's inherited radius equals the previous step's total |
| Whole-step coverage | Every published segment's exact slack polynomials are nonnegative over the whole step |
| Evidence | Each accepted step starts at the previous end and its generating content chains equal the previous step's published chains |
| Callbacks | One per accepted step, in order, with the accepted time |
| Halting refusals | Unequal starts, missing evidence, another population's evidence, changed coupling: `VFS-H0-01`, one attempt, halt. Retained past above field speed: `VFS-H1-01` with cause `retained_past_speed`, one attempt, halt. Inherited total above the total budget: `VFS-BUDGET-02` with cause `inherited_total`, one attempt, halt |
| Bounded retries that end in a halt | Undecided lower sign: five attempts, each half the last, halt `lower_sign_unresolved`. Chart refusal and an impossible increment budget: four attempts each down to the minimum step, halt `minimum_step_exhausted`. An attempt limit of three: halt `attempt_limit_exhausted`. Nothing published in any |
| Retries that succeed | Step velocity box at field speed: `VFS-H1-01` with cause `step_velocity_box` at step $0.5$, accepted at $0.25$. Step longer than the separation: `VFS-H2-01` at $12$, accepted at $6$. New growth over the total budget: `VFS-BUDGET-02` with cause `new_growth` at $1/128$, accepted at $1/256$, and every accepted total stays within the total budget |
| Request refusals | Wrong policy token, field speed $2$, an exponent-form time token and a zero budget are refused with `unsupported_execution_policy`. The ordinary evolution entry point refuses the validated evolution token |
| Cancellation | Cancelled after two accepted steps at $0.015625$; resumed from the returned histories and evidence, the run reproduces the uninterrupted run's content chains, end states and ledger exactly. Cancellation before the first attempt returns the inputs |
| Aliasing control, resolved | 512 steps of $1/256$ to exactly $t=2$: end tubes contain the frozen true brackets, velocity half-width $1.888\times10^{-7}$, disjoint from the aliased interval by $2.060\times10^{-7}$ |
| Aliasing control, from the adversarial step | Initial step $2$: refused on the increment budget seven times, first accepted at $1/64$; 142 accepted and 33 refused to exactly $t=2$; end tubes contain the frozen true brackets, velocity half-width $5.853\times10^{-7}$. Recorded, not asserted: this wider tube overlaps the aliased interval by $2.14\times10^{-7}$ |
| Default compatibility | From the same scratch build, the six existing fixture outputs and the four validated far-step fixture outputs are byte-identical to the live outputs retained before increment 1: 10 of 10 |

## Retained failures

1. The first scratch build failed at configuration: a temporary edit of the scratch build file removed half of a target definition. The scratch build file was rebuilt from the live one with the two intended additions.
2. The first checker run failed one row. It asserted that the run started from the adversarial step ends with a tube disjoint from the aliased interval. That run's tube is valid and wider, and overlaps. Disjointness is asserted only for the resolved run; for the other it is a recorded quantity. The failed output and the checker of that run are kept under `.local-data/eom-matched-pair/2026-10-12/increment-1/first-check-disjointness-expectation/`.

## What this establishes and what it does not

**Claim grade: measured**, by the scratch build and the checker above on the listed cases. A separate serial controller can advance these populations by validated steps with exact decimal time, publish histories, evidence and ledger atomically, respond to each refusal as the reviewed map requires, stop and resume at accepted boundaries, and leave every existing output unchanged.

It does not establish grouping, workers, persistence or a cost. The policy and its controls are not bound into the ordinary request or the checkpoint identity. The driver has one thread and was exercised on two and three paths in the validated far domain only. The truth references are the closed-form static brackets, the reviewer's frozen three-path brackets and the frozen aliasing bracket; the checker and the driver share an author. Falsifiers: an accepted step whose exact slack is negative or whose tube misses a correct bracket; a refusal that changes the returned histories, evidence or ledger; a boundary that is not the exact decimal sum; a resumed run differing from the uninterrupted one; or a changed existing output.

## Live application

Not applied at the time this receipt was written. The three new files and the three-file difference are prepared under `.local-data/eom-matched-pair/2026-10-12/increment-1/` with a guarded script, `apply-increment-1.sh`, and `patch --dry-run` of each piece against the live files is clean. A later record states the live outcome.
