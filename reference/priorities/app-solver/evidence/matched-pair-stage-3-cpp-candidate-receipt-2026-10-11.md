# Scratch C++ Candidate Receipt: Validated Far-Step Producer and Tube Consumer — 2026-10-11

This receipt records the scratch candidate described in the [candidate record](../analysis/matched-pair-stage-3-cpp-candidate.md). The candidate is a copy of the solver tree under `.tmp/eom-matched-pair/stage3-tree/` with two module files changed and two files added. No file under `src/eom` was edited, no frozen instrument was changed, and Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not entered. Every instance uses $c_f=1$.

## Subject and instruments

| File | Role | SHA-256 |
| --- | --- | --- |
| [validated_far_step_candidate.hpp](matched-pair-stage-3-cpp-candidate/validated_far_step_candidate.hpp) | The producer. | `4c2335cf5d86f1784d2b7967ee6ee363c59c108167bd1399f19c6ea7d5f43325` |
| [eom_validated_far_step_candidate_cli.cpp](matched-pair-stage-3-cpp-candidate/eom_validated_far_step_candidate_cli.cpp) | Fixture program: `producer`, `generated-source`, `consumer`, `long`. | `d611e9c645d473e0c529fa70fe731f86ba37a8133cfa3085b198a52d150adef1` |
| [matched-pair-module-live-to-candidate.diff](matched-pair-stage-3-cpp-candidate/matched-pair-module-live-to-candidate.diff) | The whole consumer change: `diff -u` of the two matched-pair module files, live to candidate. | `18c6f462632d128524cf0ad6e21356199219e114d9bc533475a56aae59f3d6ed` |
| [matched_pair_stage_3_cpp_candidate_check.py](matched_pair_stage_3_cpp_candidate_check.py) | Checker and truth comparison; imports the frozen version 3 prototype and the unchanged qualification's truth references. | `442b225ac9eeb647ebc224db7671dca950d235a320c7e13c405614fe8ab88f8d` |
| [rebuild-stage3.sh](matched-pair-stage-3-cpp-candidate/rebuild-stage3.sh), [run-candidate.sh](matched-pair-stage-3-cpp-candidate/run-candidate.sh) | Build and run scripts as executed. | `a9b75986409f470e1c050d2b90ad39fb7d2912b366b7cb4055480b748f840d03`, `336d3c5d19480a3c392ee25bd9449d81973381ab47770d0e9d3f12923cc5598b` |

`diff -rq src/eom .tmp/eom-matched-pair/stage3-tree/src/eom` reports exactly four differences: the two module files differ and the two candidate files exist only in the scratch tree. The scratch tree's 85-file inventory is retained as `stage3-tree-source-inventory.sha256` under `.local-data/eom-matched-pair/2026-10-11/stage3-cpp-candidate/`. The scratch library has SHA-256 prefix `f73bbab269c3887e` and the fixture program `0bfaf1042f92bc9d`.

The build used CMake's Release configuration with two workers, `DEVELOPER_DIR=/Library/Developer/CommandLineTools` and the `MacOSX26.5.sdk` system root, for the library and the four existing fixture programs; the candidate fixture was compiled with `/usr/bin/c++ -std=c++20 -O2 -ffp-contract=off -arch arm64` and linked against that library. Build and run each executed under the owned-compute supervisor. The retained run finished at 2026-10-11T23:59:24Z after 48.6 seconds with exit status 0 and its process group closed. The checker ran under `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2.

## Outputs

| Output | SHA-256 |
| --- | --- |
| [candidate-producer.jsonl](matched-pair-stage-3-cpp-candidate/candidate-producer.jsonl), 33 rows | `1c6cf9ac06602bef4b93ca14741dfb6df7f9dced1f50c673a965a8486a28842d` |
| [candidate-generated-source.jsonl](matched-pair-stage-3-cpp-candidate/candidate-generated-source.jsonl), 8 rows | `bb4ab4a8610d75009857d201354e18fcd62e66097fe4626ab4a148cfa45a8759` |
| [candidate-consumer.jsonl](matched-pair-stage-3-cpp-candidate/candidate-consumer.jsonl), 14 rows | `f8bc4f554d1b2ec6b2c42443c18359305c4945339dff105e5a622ec285a53a7e` |
| [candidate-long.jsonl](matched-pair-stage-3-cpp-candidate/candidate-long.jsonl), the last of 512 steps | `fde859c1569a712814b692328cfad95926044aa4525d7632cf620a127f11ad2a` |
| [candidate-check-output.txt](matched-pair-stage-3-cpp-candidate/candidate-check-output.txt) | `4e14fe0f3abb26212c32d5f6ea02ddd68d11866e516439e5def2c0d1a01fe25f` |
| [candidate-check.json](matched-pair-stage-3-cpp-candidate/candidate-check.json) | `e6271ecdd0296a5f054993925ab005aa01cbb6b0ff4b6be1f0699dd19b6875f1` |

Every interval in the outputs is printed with seventeen significant digits, which determines the binary value exactly, and every published coefficient and radius is printed as the decimal token the history layer received. The checker converts both to exact rationals and rebuilds each end tube from the tokens.

## Results

The checker exits with status 0: 68 of 68 rows pass, 9 of them the known cases that must pass before any target is evaluated.

| Group | Result |
| --- | --- |
| Known | Static two-path step: receiver and source tubes contain the closed-form brackets; the history layer's end interval contains the rebuilt tube. Three-path step: acceleration boxes contain $-21/12100000$, $101/100000$, $-122/121000$. Snapshot totals on exact histories contain the same values under the disabled and validated policies and both scheduling routes. |
| Small steps | Control past, $h=1/128$, two steps, budgets $10^{-8}$: certified; velocity radius growth $1.44\times10^{-9}$ and $1.34\times10^{-9}$; tubes contain the small-time true brackets. |
| Adversarial step | $h=2$: without a budget certified, tube contains the frozen bracket; with budgets declined, `VFS-BUDGET-01`. |
| Long run | 512 steps of $1/256$, all certified. End velocity tube $[-1.979445531,\,-1.941684088]\times10^{-5}$, half-width $1.888\times10^{-7}$; end position half-width $1.528\times10^{-7}$. Both contain the frozen true brackets. Separation from the aliased interval $2.060\times10^{-7}$. |
| Refusals | Fifteen coded declines and five noted refusals, each publishing nothing: unequal starts, an altered ancestor with intact joins, a segment transferred between populations, changed coupling, changed charge and a renamed path at `VFS-H0-01`; two speed-arch cases at `VFS-H1-01`; `VFS-H2-01`, `VFS-H3-01`, `VFS-H4-01`, `VFS-H5-01`; two cases at `VFS-BUDGET-01` and one at `VFS-BUDGET-02`; the reviewer's ancestor at 11 refused by the history layer as discontinuous; four append refusals. |
| Controls | A genuine second step, the same population under the same scalars, the first step under a total budget, and equal shallow starts with both pairs absent and exactly zero acceleration all certify. The reviewer's fast affine source certifies without a budget and its acceleration box contains $-199/10000000$. |
| Generated segments | Steps of 4 from a static start: four certified, and at the fourth every root window lies on generated segments. Zero coupling with a uniformly moving source: four certified, tubes contain the exact straight lines, source position radius $2.4\times10^{-14}$ at the end. |
| Cross-language | Three-path and large-step static cases: C++ and Python version 3 tubes intersect at every step; largest velocity radius ratio 1.112 and 1.111. |
| Consumer | After four validated steps of the three-path population, for each scheduling route: one group certified with grade `validated_far_step_tubes`, radius $2.010890\times10^{-6}$ from declared member radii $9.9\times10^{-14}$ in position and $7.2\times10^{-12}$ in velocity and a join term $9.7\times10^{-20}$; exact relationships 7 to 6 and enclosed 2 to 3 of 9; receiver width equals the one emitted width $4.021779\times10^{-6}$; grouped and disabled totals intersect on every receiver and axis; the exact-only policy declines with `MPE-HISTORY-01` and reproduces the disabled totals. The two routes give identical totals and groups. |
| Consumer refusals | Changed coupling, changed receiver charge, an altered member radius and a cleared registry: no group, `MPE-EVIDENCE-01`, exact fallback; with the registry cleared the totals equal the disabled route's. |
| Unchanged routes | From the scratch build, `cmp` finds the native, acceleration and evolution fixture outputs and the matched-pair module, piecewise and evolution-guard outputs byte-identical to the retained live Stage 2 outputs: 6 of 6. |

## Retained failures

Each is kept under `.local-data/eom-matched-pair/2026-10-11/stage3-cpp-candidate/`.

1. `first-run-exact-piecewise-ulp-difference/`. The exact piecewise fixture output differed from live in the last digit: zero radius tokens were widened by their padded enclosure. Corrected by treating an exactly zero token as zero.
2. `second-run-root-window-stalled-at-step-25/`, with the producer of that run. The long run declined at step 25 with `VFS-BUDGET-01` and a root window one unit wide. Corrected by taking hulls over subdivided windows.
3. `third-run-fast-affine-no-longer-h4/`. One checker row failed: the reviewer's fast affine source no longer triggered `VFS-H4-01`. The case became a positive check against its exact acceleration and a different input now exercises the code.
4. `fourth-run-per-cell-velocity-allowance/`, with the module of that run. Not a failed row: a defect found by reading. The retained tube code bounded relative velocity with per-cell radii. Corrected to nominal relative velocity plus window maxima of both declared velocity radii. The displayed group radius did not change at seven digits in this configuration.

One command was refused by the host's safety check because it wrapped two scripts in a shell string the check could not inspect. Neither script removes anything; the same two scripts were then run as direct supervised invocations.

## What this establishes and what it does not

**Claim grade: measured**, by the instruments above on the listed cases. The limits are those of the candidate record, section 7: scratch, serial, two and three paths, first order, an in-process record over a sixty-four-bit fingerprint, no independent truth for the grouped tube interval beyond intersection with the exact route, and no review yet of the corrected consumer radius. Falsifiers are listed there.
