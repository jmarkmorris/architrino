# Six-pole post-turn campaign, review: adjudication 9 (P4: step 571 refused by an EMPTY intersection; what it threatens and what it does not)

Written 2026-10-21 by the review role. Record reading only; no Python run.

## 1. Record (measured)

**Subject.** [P4](../evidence/spherical-six-pole-post-turn-claude-continuation-steps10-cm48-P4.json), sha256 `7a0916774b14bf5a1617370e74edcb1a9b3f8fe92bb090c3555381a987a9c59e`, run with cm48 in 45.21 s real.

- **Controls.** They passed before the steps.
- **Resume.** It resumed from P3 (`e6b7fbb6…`) after step 570. The start matches P3's step-570 end strings, and the reader holds 620 records.
- **Result.** It produced no certified step. Step 571 was refused: "EMPTY intersection of the reconstructed (affine) end and the frozen-step end". The refused row carries no `corr` data, so the two disjoint enclosures are not recorded.

**What the refused row does record (measured).** It keeps the FROZEN step's own padded end box, \in[1.8062649,\,1.8143026] \in[-0.0612813,\,-0.0521861] together with its whole-step boxes \in[1.8062649,1.8148051] \in[-0.0612813,-0.0483198] the start acceleration and rate boxes \in[-0.44173,-0.38663] '\in[-0.20944,+0.02312] and `w_sign_over_step` negative. The affine end is not recorded, so which coordinate is disjoint,   and by how much, cannot be read from the record.

**Hand check of the frozen side (derived).** From P3's step-570 frozen box, \in[1.8068536,1.8148069] \in[-0.0570724,-0.0481149] with \in[-0.44383,-0.38640] the step, the crude bounds are \ge1.8068536-0.0005707-0.0000222=1.8062607 \in[-0.0615104,\,-0.0519789]1 The frozen box lies inside these crude bounds and is consistent with them, so nothing in the frozen side looks anomalous. The stored-rate box ' straddles zero, which the remainders allow: the remainders use interval products and carry no sign assumption. The turn itself, <0 558–570, passed 13 certified steps under cm471 without any contradiction. So a premise newly violated by <0 unlikely (inferred). What is new at 571 is the instrument (cm48) and the resume.

## 2. What an empty intersection means (derived)

Each certified step is cut to the intersection of two claimed outer enclosures of the same true end state:
- the frozen step's box, run from the start box;
- the affine form propagated from P3's `affine_last`.

If both enclosures were valid, the intersection would contain the true state and could not be empty. An empty intersection therefore PROVES that at least one of the following fails at step 571:
- (i) the frozen step's enclosure;
- (ii) the affine inclusion, from its theorem or its premises;
- (iii) the resume: the affine form restored from `affine_last` must enclose the same state as the restored end strings, with the same symbols and the same time origin.

This is a contradiction, not an instrument limit. No step after 570 may be certified until it is diagnosed.

## 3. Does it reach back to the certified events? (derived from P3's own records)

Because every certified end is an INTERSECTION, a defect in one component could make an earlier intersection exclude the true state. So I checked P3's two enclosures SEPARATELY at the path-turn ends (P3 `corr`, measured):

| end | affine $w$ | frozen-box $w$ |
|---|---|---|
| 556 | $[+0.0005506,\,+0.0074357]$ | $[+0.0003644,\,+0.0076188]$ |
| 558 | $[-0.0074382,\,-0.0003443]$ | $[-0.0076295,\,-0.0001579]$ |

Each enclosure ALONE gives $w>0$ at 556 and $w<0$ at 558. On every end 555–570 the affine box lies inside the frozen box. So the path-turn certificate (path-continuation adjudication 11) holds under the weaker premise "at least one of the two enclosures is valid at 556 and 558", and the 571 contradiction cannot overturn it unless both fail there.

The second support turn uses end values at 541 and 556 and $l''$ on 532–557. Those depend on the reconstructed boxes in the same way. They are secure under the same weaker premise only if the evaluations would keep their signs on the frozen boxes alone. That was not checked.

Before 571 the two enclosures always met, with the affine box inside the frozen one. A sudden disjointness at the first step after a resume under a new instrument version points to (iii), the resume, or to something cm48-specific, rather than to the law (inferred).

## 4. Diagnosis required (proposal; continuation's lane, on grants)

1. **Record both enclosures.** Rerun step 571 with the two enclosures written out before refusing: the affine end, the frozen-box end and the separation. This measures the gap.
2. **Same step under cm471.** Run step 571 from P3 with cm471 (old box), with the same resume. If cm471 also refuses, the chart change is cleared; if it certifies, cm48 is implicated.
3. **Resume consistency.** At the resume, check that `aff_hull(affine_last)` lies inside the restored end strings (P3 step 570), and that the latent symbol set and the time origin are the ones P3 used.
4. **Back-check.** At 556 and 558, recompute $l'$ on the frozen boxes ALONE, using the support's v7. This makes the second-support-turn signs robust to the weaker premise.

## 5. Ruling

- **P4:** no certified step.
- **CONTRADICTION at step 571.** Q3 is BLOCKED at the step-570 end until §4 items 1–3 are ruled on.
- **Path turn:** stands, under the weaker premise shown in §3.
- **Second support turn (adjudication 8):** stands as ruled, with the added caveat of §3. Its robustness to the 571 contradiction needs §4 item 4, or an equivalent check.

**Falsifiers of this ruling.**
- A diagnostic showing the frozen box itself is invalid at an earlier step: then the intersection premise fails and every reconstructed end must be re-examined.
- A cm471 rerun of step 571 that also refuses with a gap larger than the rounding.
