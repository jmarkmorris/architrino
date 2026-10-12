# Scratch C++ Candidate, Version 2: Receipt — 2026-10-12

This receipt records version 2 of the scratch candidate, described in the [version 2 record](../analysis/matched-pair-stage-3-cpp-candidate-v2.md), which answers findings CPP-P1 and CPP-P2 of the [independent review](../analysis/matched-pair-review-stage-3-cpp-candidate-2026-10-12.md) and replaces the consumer's registry by producer-issued evidence. It is a second scratch tree, `.tmp/eom-matched-pair/stage3b-tree/`; the first candidate's tree, sources, outputs and receipt are unchanged, as are all frozen Python versions and truth instruments, by `shasum -a 256 -c` of their five record lists. No file under `src/eom` was edited. Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not entered. Every instance uses $c_f=1$.

## Subject and instruments

| File | Role | SHA-256 |
| --- | --- | --- |
| [ValidatedEvidence.hpp](matched-pair-stage-3-cpp-candidate-v2/ValidatedEvidence.hpp) | Sealed evidence type and SHA-256 content chain. | `86ee8eb0a0094979e9071ec4457c365fdaeb206871c29047bca63bca9c84131e` |
| [validated_far_step_candidate_v2.hpp](matched-pair-stage-3-cpp-candidate-v2/validated_far_step_candidate_v2.hpp) | The producer. | `a16a7dfd842f873a9264b232fb10a61af5ba3b4af5f464fd7f023bf97c1bb894` |
| [eom_validated_far_step_candidate_v2_cli.cpp](matched-pair-stage-3-cpp-candidate-v2/eom_validated_far_step_candidate_v2_cli.cpp) | Fixture program. | `150b54d8b85712aef6a78aceb9a0a5cb3c595ad64cd620b6c07fae768e34b52b` |
| [solver-live-to-candidate-v2.diff](matched-pair-stage-3-cpp-candidate-v2/solver-live-to-candidate-v2.diff) | `diff -u`, live to candidate, of the five solver files that differ. | `e6f92a1065b083828f6d1a8590856070c2191f00a9c3e714e0b6bcce4bdebe61` |
| [matched_pair_stage_3_cpp_candidate_v2_check.py](matched_pair_stage_3_cpp_candidate_v2_check.py) | Checker; exact rational arithmetic; imports the frozen version 3 prototype and the unchanged qualification's truth references. | `4d2bc41631d0ab7a5d2f5c7603165d448f75febd8a5328d39c59f44ec766b6f5` |
| [build-stage3b.sh](matched-pair-stage-3-cpp-candidate-v2/build-stage3b.sh), [run-candidate-v2.sh](matched-pair-stage-3-cpp-candidate-v2/run-candidate-v2.sh) | Build and run scripts as executed. | `13605c727185311b25024752c67de95e29d977967b23a9b1ea3ed26f9898d12d`, `79c4f09497bc89ccae5737597974f4f2d4c78792c7f146b1ded248df3014349f` |

`diff -rq src/eom .tmp/eom-matched-pair/stage3b-tree/src/eom` reports five solver files differing, namely `MatchedPairEnclosure.hpp`, `MatchedPairEnclosure.cpp`, `CoupledEvolution.hpp`, `CoupledEvolution.cpp` and `CertifiedAcceleration.cpp`, and three files present only in the scratch tree. Its 86-file inventory is retained as `stage3b-tree-source-inventory.sha256` under `.local-data/eom-matched-pair/2026-10-11/stage3-cpp-candidate-v2/`. Scratch library SHA-256 prefix `1d4b8ff3affca11c`, fixture program `f7f32ea3c1de117d`. Build settings are those of the first candidate's receipt. The retained run executed under the owned-compute supervisor and finished at 2026-10-12T00:22:52Z after 64.2 seconds with exit status 0 and its process group closed. The checker ran under `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2.

## Outputs

| Output | SHA-256 |
| --- | --- |
| [candidate-producer.jsonl](matched-pair-stage-3-cpp-candidate-v2/candidate-producer.jsonl), 44 rows | `e5685073027b048e5d70d29268b98286bfcd6b8f0edd6acea59dde1e022da383` |
| [candidate-generated-source.jsonl](matched-pair-stage-3-cpp-candidate-v2/candidate-generated-source.jsonl), 8 rows | `83b412eb5eb02434a0d9b6dd0830dd876cc0d2a6126c139d1c81a312bb38a1b5` |
| [candidate-consumer.jsonl](matched-pair-stage-3-cpp-candidate-v2/candidate-consumer.jsonl), 16 rows | `20ff2ddb38c365d1eaf66379f7172b224ba3eaaae16fcca3fbe56dc99debb4da` |
| [candidate-long.jsonl](matched-pair-stage-3-cpp-candidate-v2/candidate-long.jsonl), the last of 512 steps | `0ecdb0baa337283396a1d2fe6495581022ff97295d789b2aadfa7fc445cc7111` |
| [candidate-check-output.txt](matched-pair-stage-3-cpp-candidate-v2/candidate-check-output.txt) | `66ea0c8d7169ab507ab97ea55af18150be076d78090d3eaab3d7fc01e78c2bce` |
| [candidate-check.json](matched-pair-stage-3-cpp-candidate-v2/candidate-check.json) | `efb608a4f02f8a532d89c257d8e2b8078b07c0a9e2d62a9c047885afc4d8b8b7` |

Each certified row carries what an exact recheck needs: the exact decimal coefficient and radius tokens, the inherited position and velocity sections and the acceleration box as binary values printed to seventeen digits, the start, step and end tokens, the duration bound, the growth in local-error form, and the issued evidence with both content chains for every path.

## Results

The checker exits with status 0: 94 of 94 rows pass, the first 13 being known cases that must pass before any target.

| Group | Result |
| --- | --- |
| Known | SHA-256 of `abc` is the standard vector. The exact token of the binary value nearest $0.1$ equals that value. The exact decimal sum of $10^{10}$ and $0.0002987$ is `10000000000.0002987`. Static two-path tubes contain the closed-form brackets, with exact whole-step slack nonnegative. Three-path acceleration boxes contain $-21/12100000$, $101/100000$, $-122/121000$. Snapshot totals on exact histories contain the same values under both policies and both scheduling routes. |
| CPP-P1 | 23 certified steps with published segments: every exact Bernstein coefficient of the slack polynomials is nonnegative; smallest $2.0\times10^{-323}$. The producer's own lower bounds are nonnegative in every case. A published static coefficient, for illustration: `-0.00000499999999975203913700309843459734793214011006057262420654296875`. |
| CPP-P2 | Every end token is the exact sum of start and step; the duration bound is at least the step everywhere. Reviewer's late-time case: certified, end `10000000000.0002987`, duration bound $3.03\times10^{-4}$. Exponent-form start and a start that is not the histories' end: declined, `VFS-H0-01`. |
| Evidence at the producer | Every certified step carries evidence for its whole population; declined steps carry none and no ledger entry; generating chains equal the previous step's published chains across five multi-step cases. Missing evidence, another population's, and the previous step's: each declined, `VFS-H0-01`. The current evidence: certified. |
| Small steps and ledger | Control past, $h=1/128$, two steps within $10^{-8}$ budgets; receiver growth $5.63\times10^{-12}$ and $1.44\times10^{-9}$, then $1.65\times10^{-11}$ and $1.34\times10^{-9}$, recorded per axis in local-error form; tubes contain the small-time true brackets. |
| Frozen bracket control | 512 steps of $1/256$, all certified; end velocity tube $[-1.979445531,\,-1.941684088]\times10^{-5}$, half-width $1.888\times10^{-7}$; position half-width $1.528\times10^{-7}$; both contain the frozen true brackets; separation from the aliased interval $2.060\times10^{-7}$. The adversarial step of 2 contains the bracket without a budget and declines with one. |
| Refusals | Twenty coded declines and six noted refusals, none publishing: eleven at `VFS-H0-01` for time tokens, unequal starts, evidence, ancestry, transfer, coupling, charge and identity; two at `VFS-H1-01`; one each at `VFS-H2-01`, `VFS-H3-01`, `VFS-H4-01`, `VFS-H5-01`; two at `VFS-BUDGET-01` and one at `VFS-BUDGET-02`; the reviewer's ancestor at 11 refused by the history layer; five append refusals, including a forged status without evidence and genuine evidence with other segments. |
| Generated segments, cross-language | As in the first candidate: root windows wholly on generated segments by the fourth large step; zero-coupling tubes contain the exact straight lines; C++ and Python version 3 tubes intersect at every step. |
| Consumer | After four validated steps of the three-path population, for each scheduling route: one group certified with grade `validated_far_step_tubes` and evidence bound, radius $2.010890\times10^{-6}$; exact 7 to 6 and enclosed 2 to 3 of 9; receiver width equals the one emitted width; grouped and disabled totals intersect everywhere; exact-only policy declines and reproduces the disabled totals; the two routes give identical results. |
| Independent truth | The reviewer's exact bracket of the true receiver acceleration at $t=1/32$, $[-21/12100000,\ -2100000002000000000000000000000/1210000004620000006610000004200000001]$, lies inside the grouped receiver total and inside the disabled total under both routes. |
| Consumer refusals | No evidence, stale evidence, another population's evidence, an altered member radius: no group, `MPE-EVIDENCE-01`, totals identical to the disabled route. Changed coupling, changed receiver charge: no group, exact fallback. |
| Existing routes | Six existing fixture outputs from the second scratch build are byte-identical to the retained live Stage 2 outputs. |

## Retained material from this round

The first run of the version 2 fixture, checker and builds succeeded without a failing row. One step in producing the checker failed: the script that derives it from the version 1 checker stopped on a text replacement that did not match, before writing anything; the corrected derivation script is kept as `.tmp/eom-matched-pair/make_checker_v2.py`. The first candidate's four retained failures and its outputs remain where its receipt places them.

## What this establishes and what it does not

**Claim grade: measured**, by the instruments above on the listed cases. The limits are those of the version 2 record, section 7: scratch, serial, first order, two and three paths, and evidence sealed only within one process. Falsifiers are listed there.
