# Prototype Validated Far-Step Carrier, Version 2: Correction and Qualification Receipt — 2026-10-11

The [independent review](../analysis/matched-pair-review-stage-3-addendum-2-2026-10-11.md) of the version 1 prototype found two admission defects, VFS-R1 and VFS-R2, and reproduced both with its own [probes](matched-pair-review-stage3-carrier-probes.py). This receipt records the corrected carrier, written under a new path, and its qualification. The version 1 carrier, runner, outputs and receipt, the frozen truth instruments and all solver source are unchanged; `shasum -a 256 -c` of the two earlier record lists reports every entry unchanged after the version 2 runs. The discussion is in [addendum 3](../analysis/matched-pair-stage-3-addendum-3.md). The prototype is scratch evidence outside the solver; Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not released. Every instance uses $c_f=1$.

## Instruments

| Instrument | Role | SHA-256 |
| --- | --- | --- |
| [matched_pair_stage_3_validated_far_step_carrier_v2.py](matched_pair_stage_3_validated_far_step_carrier_v2.py) | The corrected subject. | `69730ca049fda557635051958193e0f11235c8e503932d84eea68eab3f4963e2` |
| [matched_pair_stage_3_validated_far_step_qualification_v2_adapter.py](matched_pair_stage_3_validated_far_step_qualification_v2_adapter.py) | Runs the unchanged version 1 qualification against version 2 through a recording proxy; replaces only the module's carrier reference. | `e255324cfcb4bc3d8de41d29226c00ad43e077dca82d2f81f683604aff0bb99f` |
| [matched_pair_stage_3_validated_far_step_qualification.py](matched_pair_stage_3_validated_far_step_qualification.py) | The unchanged scientific qualification and truth references. | `21a9f92624e174c3…`, as in the version 1 record list |
| [matched_pair_stage_3_validated_far_step_admission_probes_v2.py](matched_pair_stage_3_validated_far_step_admission_probes_v2.py) | New admission probes, separate from the qualification. | `b25e933e57cdd9f26f7e7ef7f01fb62a0f43316c58ef19532ce445c31bfbf845` |

Both programs ran in one supervised invocation of `run-v2.sh`, retained under `.local-data/eom-matched-pair/2026-10-11/validated-far-step-v2/`, which finished at 2026-10-11T23:24:46Z after 90.6 seconds with exit status 0 and its process group closed, under `/Users/markmorris/vibe/.venv/bin/python` version 3.13.2. The static known cases run first in each program, and each exits with status 2 before any target if one fails.

## Outputs

| Output | SHA-256 |
| --- | --- |
| [matched-pair-stage-3-validated-far-step-v2-qualification-output.txt](matched-pair-stage-3-validated-far-step-v2-qualification-output.txt) | `e9bcf44355b5663608c793d52313c8de99c4f1c6d3ca51fb529f6461223be7d2` |
| [matched-pair-stage-3-validated-far-step-v2-qualification.json](matched-pair-stage-3-validated-far-step-v2-qualification.json) | `756c6b1430f278fce963c7ad99f40698184a2f076be29d87688404975bb2c718` |
| [matched-pair-stage-3-validated-far-step-v2-receipts.json](matched-pair-stage-3-validated-far-step-v2-receipts.json): exact rational receipts | `abb93507e005c1a3a1c2db112e1101dcbea6822a013cdefb63c57cbbc45ce922` |
| [matched-pair-stage-3-validated-far-step-v2-admission-probes-output.txt](matched-pair-stage-3-validated-far-step-v2-admission-probes-output.txt) | `f3d58efe6473f5d6e6d00b428ab2b40f3c19db468073ef8433f17fbaf31c23a4` |
| [matched-pair-stage-3-validated-far-step-v2-admission-probes.json](matched-pair-stage-3-validated-far-step-v2-admission-probes.json) | `4fbc4b7e69a6d6df6c26ebcf5ff9645c592d9696625d6ab4ddad969f32c363f5` |
| `qualification-full-receipts.jsonl`, local, 528 step receipts | `d56b2fdcdb5940bede1901029c7bf583bad058aad3a5e4293f679bb4a99c1bf7` |
| `probes-long-run-receipts.jsonl`, local, 512 step receipts | `3a8d6e4c7290ebed6fb4cb5cbe11fcda83f3d20448e6dbb332989e56f13ec9e1` |

**Exact receipts.** Every step taken by the qualification has a receipt in which each quantity is an exact rational written as `p/q`: step start, length, coupling, common history start, speed bounds, per-pair lower-sign distances, root window, distance and transmitter-factor ranges, step position boxes, acceleration boxes, increment and total budgets, radius growth and total radius, whole-step slack, the published coefficients and radii, the end position and velocity intervals, the provenance label, and three digests: of the inputs, of each published segment, and of the certificate. Declined steps have a receipt with their code and no published part. The tracked receipts file holds all sixteen receipts outside the long run and the long run's first and last steps; the full sets are the two local files above.

## Scientific qualification, unchanged, against version 2

All 45 rows pass, and the 45 result lines are textually identical to the version 1 output: the corrections changed admission and nothing numerical. Of the 45, 40 are assertions and 5 are recorded quantities with a fixed pass mark, namely the two radius-growth rows and the long run's whole-bracket, alias-separation and largest-growth rows. The probes below assert the whole-bracket and alias-separation statements.

## Admission probes

All 29 rows pass: 26 assertions on version 2 and 3 rows that record version 1's behaviour on the same inputs.

| Group | Row | Result |
| --- | --- | --- |
| Known | Static kernel box contains $-1/100$; the speed arch's exact range is $[0,2]$; a genuine static step certifies; its velocity tube contains the closed-form bracket; its acceleration box contains $-1/100000$. | 5 pass |
| VFS-R1 | Reviewer's case: receiver history $[-5,0]$, source history $[-20,0]$. Version 1 certifies zero acceleration although the retained root at $-10$ gives exactly $-1/100000$. | reproduced |
| VFS-R1 | Version 2 on the same input, and with the roles swapped. | Declined, `VFS-H0-01`, nothing published, both orders |
| VFS-R1 | Equal shallow starts $[-5,0]$ for both paths. | Certified with both pairs absent: a finite retained domain, stated as such |
| VFS-R1 | Same geometry with the full common history. | Certified; acceleration box contains $-1/100000$ |
| VFS-R2 | Reviewer's case: after a genuine static step, the source cubic about $-20$ is changed in place to $(10,0,1/5,-1/150)$, peak speed $2$. Version 1 certifies without a budget. | reproduced |
| VFS-R2 | Version 2 on the same sequence, with and without a budget. | Declined, `VFS-H1-01`; past speed bound $2$ |
| VFS-R2 | A caller-supplied `_speed_bound` of zero on the arch. | Ignored; declined, `VFS-H1-01` |
| VFS-R2 | Segment keys after a version 2 step. | Unchanged; version 2 writes nothing into caller data |
| VFS-R2 | Arch first, then the static data restored in place. | Certified; no stale refusal |
| VFS-R2 | A velocity radius written onto prescribed data. | Declined, `VFS-H0-01` |
| Label | A genuine published segment as the next step's past. | Admitted |
| Label | The same segment with its velocity radius divided by 1000; with its quadratic coefficient halved. | Each declined, `VFS-H0-01` |
| Label | Invented segments carrying the validated label. Version 1 certifies from them. | Version 2 declined, `VFS-H0-01`; version 1 behaviour recorded |
| H4 | Reviewer's fast affine source, $z=-188+0.99(S+200)$, common start $-200$. | Declined, `VFS-H4-01`; conservative, the real root is regular |
| Budgets | Total velocity budget $2\times10^{-9}$ with increment budgets $10^{-8}$. | First step certified; second meets the increment budget with growth $1.34\times10^{-9}$ and is declined, `VFS-BUDGET-02`, at total $2.76\times10^{-9}$ |
| Long run | $512$ steps of $1/256$ on the control's past. | All certified within the increment budgets |
| Long run | End velocity tube contains the whole frozen true bracket; end position tube likewise. | Asserted, pass; half-widths $2.081454\times10^{-7}$ and $1.670257\times10^{-7}$ |
| Long run | End velocity tube is disjoint from the solver's aliased interval. | Asserted, pass; separation $1.760351\times10^{-7}$ |
| Long run | Every generated receiver segment is bound to a certificate. | $512$ of $512$ |

The exact end velocity interval of the long run is $[-2537526394061950184251777436107951/128\times10^{36},\ -496848234819048277893103897569571/256\times10^{35}]$, with published velocity radius $208145390494956229633820110391/10^{36}$; these and every other exact value are in the receipts file.

## Retained failure

One trial of the probes failed before the retained run. The row meant to alter a published segment's coefficients doubled its linear coefficient, which is zero for the receiver's first step, so the payload did not change and the carrier correctly admitted it. The probe was wrong, not the carrier. The trial's probe source and a note are kept as `probes-before-noop-mutation-fix.py` and `trial-noop-mutation-failure.txt`; the retained probe halves the nonzero quadratic coefficient and asserts that the payload changed.

## What this establishes and what it does not

**Claim grade: measured**, by the instruments above. Version 2 declines the reviewer's two reproduced cases at the history and speed obligations, does not read or write cache fields in caller data, admits a validated label only for a payload it published in the same process, distinguishes the increment budget from a total-radius budget, and reproduces every scientific qualification result of version 1 exactly.

It is still a prototype outside the solver, first order, exercised on two-path far configurations. Label binding is in-process: a digest registry held in the module's memory. It does not survive a process boundary and is not a certificate chain; a production carrier must bind each segment to its generating certificate in the solver's own evidence. Unequal retained starts are refused outright, which excludes legitimate populations whose histories begin at different times until a per-member prefix proof exists. The total-radius budget is a prototype parameter; mapping inherited total uncertainty to the solver's accepted-state ledger is not done. The qualification's truth references and both carriers have one author; the reproductions of VFS-R1, VFS-R2 and the H4 case follow the reviewer's constructions, and the reviewer's own probe remains the independent instrument. Falsifiers: an input on which version 2 certifies while a retained emission is ignored; a mutation of history data after which version 2 reports a speed bound for the old data; a segment not published by the module that is admitted under the validated label; or a difference between a receipt's exact values and the published segment.
