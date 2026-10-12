# Prototype Validated Far-Step Carrier, Version 3: Ancestry Correction and Qualification Receipt — 2026-10-11

The [independent review](../analysis/matched-pair-review-stage-3-addendum-3-2026-10-11.md) of version 2 closed VFS-R1 and VFS-R2 and found VFS-R3: a generated segment was admitted on a history other than the one that generated it. This receipt records version 3, written under new paths, and its qualification. Versions 1 and 2, their outputs and receipts, the frozen truth instruments and all solver source are unchanged; `shasum -a 256 -c` of the three earlier record lists reports every entry unchanged after the version 3 runs. The discussion is in [addendum 4](../analysis/matched-pair-stage-3-addendum-4.md). The prototype is scratch evidence outside the solver; Stage 3 of the [integration scope](../contracts/matched-pair-enclosure-integration-scope.md) is not released. Every instance uses $c_f=1$.

## Instruments

| Instrument | Role | SHA-256 |
| --- | --- | --- |
| [matched_pair_stage_3_validated_far_step_carrier_v3.py](matched_pair_stage_3_validated_far_step_carrier_v3.py) | The corrected subject. | `cd08c545320b43995e8e18dd0dde0a918eaed27816e5acb45d786a585ce1c6ed` |
| [matched_pair_stage_3_validated_far_step_qualification_v3_adapter.py](matched_pair_stage_3_validated_far_step_qualification_v3_adapter.py) | Runs the unchanged qualification against version 3 through a recording proxy. It differs from the version 2 adapter only in the subject import, the output names and the schema labels. | `6904b1b426461e9c7f99b4a2a64b83c4207d2e3ba0fb95669fd4c6780252718f` |
| [matched_pair_stage_3_validated_far_step_qualification.py](matched_pair_stage_3_validated_far_step_qualification.py) | The unchanged scientific qualification and truth references. | as in the version 1 record list |
| [matched_pair_stage_3_validated_far_step_admission_probes_v3.py](matched_pair_stage_3_validated_far_step_admission_probes_v3.py) | New admission probes. | `05828cf3a35743a49453da515b8bd111acb7632feee2815f2cf96aaad8d47842` |

The adapter ran under the owned-compute supervisor in `run-v3.sh`, finishing at 2026-10-11T23:34:22Z with exit status 0. The retained probe run is a second supervised invocation that finished at 23:35:27Z after 47.9 seconds with exit status 0 and its process group closed. Interpreter: `/Users/markmorris/vibe/.venv/bin/python`, version 3.13.2. Static known cases run first in each program, which exits with status 2 before any target if one fails.

## What version 3 binds

When a step is certified, the module keeps an internal record, keyed by the certificate's digest, of: the step start and length; the coupling; for every path, its identifier, its charge and a chained digest of its complete history up to the step start, prescribed and generated segments alike; and the digest of each path's published segment. A segment digest covers both times, all twelve coefficients, both radius triples and the label.

At admission, each path's history must be prescribed segments followed by generated ones, with the same number of generated layers on every path. For each layer, in order, the segments of all paths over that step must be one set that the module published together, under the coupling of the present step, from a population with these identifiers and charges whose histories up to that layer have exactly the digests recorded. Any failure declines with `VFS-H0-01`. Appending a continuation applies the same test: the certificate must be one the module issued, its published segments must be unaltered, and the base history must be the one it was issued for.

The record is held in the memory of one process. It is not persisted, not signed and not recheckable by another program.

## Outputs

| Output | SHA-256 |
| --- | --- |
| [matched-pair-stage-3-validated-far-step-v3-qualification-output.txt](matched-pair-stage-3-validated-far-step-v3-qualification-output.txt) | `a98898ff4790af5dda0b6a91de54d9fe7b26f6f41feb275957f90d3e710037b3` |
| [matched-pair-stage-3-validated-far-step-v3-qualification.json](matched-pair-stage-3-validated-far-step-v3-qualification.json) | `1e9c3cc181975b4d76f01e8e898e8eb61f652bc0260e27fcb2a8af85f0017cda` |
| [matched-pair-stage-3-validated-far-step-v3-receipts.json](matched-pair-stage-3-validated-far-step-v3-receipts.json): exact rational receipts | `24645527d6e20c182b2cb866c33024242a806916853a5e5c69f5eacaf4c2b1ad` |
| [matched-pair-stage-3-validated-far-step-v3-admission-probes-output.txt](matched-pair-stage-3-validated-far-step-v3-admission-probes-output.txt) | `59915b5fd470accc7a32cb7affaf912f80017a1b5ee94b0443291c51a2a378b3` |
| [matched-pair-stage-3-validated-far-step-v3-admission-probes.json](matched-pair-stage-3-validated-far-step-v3-admission-probes.json) | `05484df113d1bd175f848c78a83a01e530ba205c15f6d134ef154de2f1785a72` |
| `qualification-full-receipts.jsonl`, local, 528 step receipts | `e6b5f338e5e01a2892822d66641d2c45f81220ff9b33a626e40824e76956a992` |
| `probes-long-run-receipts.jsonl`, local, 512 step receipts | `c85ef2b0c52906ef377d1e21bdfe401c90fb4dda7affcf53e48d3822224afd2e` |

The receipts have the version 2 layout, every quantity an exact rational written as `p/q`, and each certified receipt now also records the coupling and, per path, the charge and history digest it was generated from. The tracked file holds the sixteen receipts outside the long run and the long run's first and last steps.

## Scientific qualification, unchanged, against version 3

All 45 rows pass, and the 45 result lines are textually identical to the version 1 output. As before, 40 are assertions and 5 are recorded quantities.

## Admission probes

All 45 rows pass: 44 assertions on version 3 and one row recording version 2's behaviour.

| Group | Rows | Result |
| --- | --- | --- |
| Known | Static kernel box contains $-1/100$; exact speed-arch range $[0,2]$; genuine static step certifies; velocity tube contains the closed-form bracket; acceleration box contains $-1/100000$. | 5 pass |
| Genuine inheritance | Three static steps chain; radii are inherited and do not shrink; the three-step tube contains the analytic bracket; two steps on the oscillating past contain the true bracket; an unaltered deep copy of a genuine history is admitted. | 5 pass |
| VFS-R1, VFS-R2 | Reviewer's unequal starts, both orders: `VFS-H0-01`. Reviewer's in-place speed-2 arch after a genuine step: `VFS-H1-01` with and without a budget. Planted cache field ignored. Nothing written into caller segments. | 5 pass |
| VFS-R3 | Reviewer's case: after a genuine step, the source's prescribed past is moved from $10$ to $11$ under its generated segment. Version 2 certifies. | reproduced |
| VFS-R3 | Version 3 on the same input. | Declined, `VFS-H0-01`: published from a different preceding history |
| VFS-R3 variants | The other path's prescribed past altered; an earlier generated layer altered; a genuine later layer placed on a different genuine first layer; a generated layer removed from one path. | Each declined, `VFS-H0-01` |
| Transfers | Generated segments swapped between the two paths; a path renamed; a genuine segment transplanted into another genuine population; a third path added with an invented generated segment. | Each declined, `VFS-H0-01` |
| Scalars | Continuing under twice the coupling; with the source charge changed to $-1$; with the receiver charge changed to $2$. The same history under the same scalars. | Three declined, `VFS-H0-01`; the control certified |
| Certificates | A genuine certificate appends to its own history. Refused at append: altered published segment; a different base history; a declined certificate edited to look certified; a genuine digest with substituted segments; a declined certificate. Hand-appending altered segments is refused at the next admission. | 7 pass |
| H4 and total budget | Reviewer's fast affine source: `VFS-H4-01`. Increment budget met, total budget refused: `VFS-BUDGET-02`. | 2 pass |
| Long run | $512$ steps of $1/256$, each admitting every earlier layer. End velocity and position tubes contain the whole frozen true brackets, half-widths $2.081454\times10^{-7}$ and $1.670257\times10^{-7}$. Velocity tube disjoint from the aliased interval by $1.760351\times10^{-7}$. | 4 pass |
| Long run, depth | After $512$ layers: the receiver's prescribed past shifted by $10^{-9}$ declines on ancestry; one prescribed source segment changed by $10^{-9}$ declines on its join; the unaltered history is admitted for step $513$. | 3 pass |

## Retained failure

The first supervised probe run passed all its rows, but its deepest probe did not test what its name said. Changing one prescribed source segment by $10^{-9}$ broke an exact prescribed join, so the step declined for that reason and never reached the ancestry check. The probe was replaced by a shift of the receiver's single prescribed segment, which has no prescribed join and is refused on ancestry, with the join case and an admitted control kept beside it. The first output, the probe source of that run and its long-run receipts are retained as `first-probes-output-deep-change-declined-on-join-not-ancestry.txt`, `probes-before-deep-ancestry-fix.py` and `first-probes-long-run-receipts.jsonl`; the long-run receipts of the two runs are byte-identical.

## What this establishes and what it does not

**Claim grade: measured**, by the instruments above. Version 3 refuses the reviewer's altered-ancestor case and every variant tried here, refuses transferred and invented segments, refuses a change of coupling or charge, refuses altered, forged and misapplied certificates at append, still admits genuine continuations including a content-identical copy and a 512-layer history, and reproduces every scientific qualification result exactly.

It does not establish a production provenance mechanism. The binding is an in-process record: it cannot be rechecked by a separate consumer and is lost when the process ends. The digests detect change; they are not a proof that the bound history is true, which rests on the theorem and on the prescribed data being what the caller says. The prototype is still outside the solver, first order, restricted to common-start far configurations and exercised on two paths. The probes and the carrier have one author; the reproductions follow the reviewer's constructions and the reviewer's instruments remain the independent check. Falsifiers: any history that differs from a certificate's recorded ancestry, population, charges or coupling and is nevertheless admitted or appended; a genuine continuation that is refused; or a receipt whose exact values disagree with the published segment.
