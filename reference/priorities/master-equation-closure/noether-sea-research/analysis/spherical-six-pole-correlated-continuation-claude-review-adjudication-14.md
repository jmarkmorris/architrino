# Six-pole correlated continuation review: adjudication 14 (K = 8 refinement; the support's C24 end evaluations; the narrowed bracket of the first support turn)

Written 2026-10-14T13:10:19Z by the review role.

## 1. My C25 refinement (measured)

**Run.** ddl10 (67a82d34…, hash written at launch). PID 65498, exit 0, 9.55 s. Census before launch: no Python. Outputs:
- [band record](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C25-k8.json.ddl10.json), sha256 db2840c02e493ea982a1d38dc1140017aac7f3e03843dcd1e1056f45cc02263e;
- [out](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C25-k8.out) a4f7daab…;
- the audit9 control-only json c898a326…, byte-identical to C23's, as expected for the same controls with no targets.

**Controls.** R1 to R3 and I1 to I4 all pass. The history read is reconstructed only.

**Refined $\ddot l$ at $K = 8$ is positive on each step:**

| step | $\ddot l$ |
|---|---|
| 435 | $[0.001294,\ 0.03279]$ |
| 436 | $[0.001027,\ 0.03321]$ |
| 437 | $[0.000870,\ 0.03358]$ |

Together with C23 ($K = 4$ on 374 to 435), $\ddot l > 0$ is proved on every whole step from 374 to 437 (derived). $\dot l$ is therefore strictly increasing there, and the crossing certified in adjudication 13 is STRICT and UNIQUE on its whole bracket $(5.956684593623649597167969,\ 6.236684709182828044891357)$.

## 2. The support's C24 end evaluations (read; derived for soundness)

**Subjects.**
- [receval v4](../evidence/spherical-six-pole-correlated-continuation-claude-support-receval-iv.py), sha256 094cd08243d65bca…. Its diff against v3 (23b4689e…, qualified in adjudication 10) only declines to append a reconstructed record that lacks end strings.
- Records:
  - [405-422](../evidence/spherical-six-pole-correlated-continuation-claude-support-C24-receval-recon-405-422-r1.json), sha256 477cc6bb…; PID 64039, alarm at 110 s, exit 142, rows 405 to 421 saved;
  - [423-431](../evidence/spherical-six-pole-correlated-continuation-claude-support-C24-receval-recon-423-431-r1.json), sha256 ebe8f53b…; PID 64693, exit 0;
  - [432-440](../evidence/spherical-six-pole-correlated-continuation-claude-support-C24-receval-recon-432-440-r1.json), sha256 e782d215…; PID 64987, exit 0.
- All three parse, and all nine controls P1 to P9 pass in each before its targets.

**Route soundness.**
- **(a) End-instant route.** It uses the end time $[t_{lo} + \Delta,\ t_{hi}]$ and the reconstructed end box. For each class, it runs the residual-sign containment check on the recorded source range and then the contraction; this is the same component that P6 and P9 qualify. It then contracts again on $3\times3$ sub-boxes from the whole-box root range, which is valid because that range contains the roots for every sub-box. Last, it evaluates the frozen interval law and takes the hull. Each step is an outer enclosure (derived).
  - **Minor gap.** The last sub-box edge is computed as $\underline{x} + \mathrm{wid}(x)$, which may fall short of $\overline{x}$ by about one unit of the 30-digit rounding. That leaves a sliver of about $10^{-30}$ uncovered. By continuity, the value of $\dot l$ there differs from the adjacent sub-box's enclosure by about $10^{-30}$ times a Lipschitz constant of order one (inferred). That is far below every margin used below, the smallest being $8.8\times10^{-5}$. The gap does not affect the signs; it should be fixed by using $\overline{x}$ as the last edge.
- **(b) Intersection premise.** The route reads history from both the frozen and the reconstructed records and intersects the two lookups. Both are proved enclosures of the same true history over the same source-time set: the frozen records by acceptance, the reconstructed ones by adjudications 11 to 13. The intersection is therefore valid, and an empty intersection refuses. P1, P2 and P4 ran with the reconstruction present and passed.
- **(c) Partial record.** Run 1 rewrote its JSON after every row. The file parses, and rows 405 to 421 are complete. Step 422 was not evaluated, and nothing is claimed for it. Accepting completed rows from a record cut off by the alarm is sound, because each row's evaluation is self-contained and the controls preceded all rows.

**Results (measured, subject's evaluation).**
- End $\dot l$ is negative at 405 to 412; at 412 it is $[-0.0024918,\ -0.0000899]$.
- It is undecided at 413 to 430.
- It is POSITIVE at 431, $[0.0000876,\ 0.0032853]$, and at every end from 432 to 440.

**Consistency with mine.**
- At 412 my end enclosure is $[-0.00302, 0.000443]$ and at 437 it is $[0.000136, 0.005267]$. Both meet the support's, and both are wider, because the support subdivides the end box.
- No sign disagreement: wherever both decide, the signs agree.

**Ruling.** The support's end-412 negative and end-431 positive are ADMITTED as proved enclosures (derived soundness, cross-code). They are not independent of my evaluation's premises.

## 3. Narrowed bracket of the FIRST support turn (derived)

- $\dot l(t_{412}) < 0$, and $\dot l$ is strictly increasing on 374 to 437. So $\dot l < 0$ on $[t_{374}, t_{412}]$, and earlier exclusion covers everything before.
- $\dot l(t_{431}) > 0$.
- The unique, strict, first crossing $t_c$ therefore lies in $(5.986684593623649597167969,\ 6.176684709182828044891357)$: from the lower end of the 412-end time to the upper end of the 431-end time, with the full origin uncertainty included.

**FINAL RULING.** SIGNED-SUPPORT TURNING POINT (the first; a strict minimum of $l$, with $l<0$): CERTIFIED, UNIQUE in $(5.986684593623649597167969,\ 6.176684709182828044891357)$. Its time is in the units $t = T/10$, so $T \in (59.866845936, 61.766847092)$.
- On my own evaluations alone, the bracket is $(5.956684593623649597167969,\ 6.236684709182828044891357)$.
- The narrowing rests on the support's end evaluations.

**Falsifiers:** any of the enclosures in adjudications 12 to 14 missing its true value; a reconstructed record not containing the true state; a jump of $\dot l$ inside a step.
