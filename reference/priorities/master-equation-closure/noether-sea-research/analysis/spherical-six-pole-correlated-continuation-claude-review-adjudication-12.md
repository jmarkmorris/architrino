# Six-pole correlated continuation review: adjudication 12 (slices r2 to r4; the re-decided band after t = 5.5667; event rulings)

Written 2026-10-14T12:56:55Z by the review role, after my granted invocations C21 (1) and C21 (2).

**Subjects.** The continuation's slices:
- [r2](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r2.json), sha256 7b1470e81409f6a9361b8f932e5974895698f373e6b0d2dc8d340e53d5aec3c1, steps 225 to 294;
- [r3](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r3.json), sha256 e2dc6540a21e0682a14fce9a5d848785c06839f4c688f64f94ce8606c4cf6cb8, steps 295 to 364;
- [r4](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm-v44-C20-r4.json), sha256 8182cb08f20b4409e61b3149c800a0a022572d2e23fb0b2ec9f77f3acd55d8d6, steps 365 to 434.

Each slice has `controls_all_pass` true, `partial` false, 70 certified steps and no uncertified step; the last run (r4) is PID 59607, exit 0.

**My runs.**
- C21 (1): [audit10](../evidence/spherical-six-pole-correlated-continuation-claude-review-audit10-C21-r2r4.json), sha256 f8c1ce689fa5c18f9fdc58563480349d345afa8e5c44ba5e3e1aececc0c26058; [consistency](../evidence/spherical-six-pole-correlated-continuation-claude-review-audit10-C21-r2r4.json.consistency.json) 56552abd…; [out](../evidence/spherical-six-pole-correlated-continuation-claude-review-audit10-C21-r2r4.out) 5db47a28…. PID 60445, exit 0.
- C21 (2): [ddl10](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10.py), sha256 67a82d348edff01ebdbf0219d213c80910693f57d0aa92f1553161e34a3fc396, written into its own output at launch; [band record](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C21-band.json.ddl10.json) fe3b259c…; [out](../evidence/spherical-six-pole-correlated-continuation-claude-review-ddl10-C21-band.out) d68770f7…. PID 60556, exit 0.

## 1. Slices r2 to r4: ACCEPTED (measured)

- All of my frozen audit9 v5 controls pass.
- The table was cut to step 154, and r1 to r4 were appended through my alignment and continuity checks: no failure in 280 records.
- My own end evaluation agrees with the subject's signs on every step of r2 to r4. One $\ddot q$ end is undecided, at step 239 (item 4).
- All 280 reconstructed ends meet their frozen accepted records.
- At step 434 the reconstructed widths are $3.51\times10^{-3}$ in $q$ and $1.59\times10^{-3}$ in $w$: 0.1425 and 0.0521 of the frozen widths.
- Under adjudication 9's conditions, r2, r3 and r4 are ACCEPTED as proved reconstructions of steps 225 to 434.

## 2. The re-decided band after $t \approx 5.5667$ (measured enclosures; derived bound)

**Controls.** ddl10 first ran my frozen ddl-refine controls R1 to R3 on the full frozen table (pass), then the insertion controls (pass):
- I1: the truncated table reproduces the step-154 strings that r1 starts from;
- I2: a known append is accepted;
- I3: a gap is refused;
- I4: a record that does not meet its frozen counterpart is refused.

**History.** Every band step from 371 to 434 read ONLY reconstructed records, as listed per step.

**Refined $\ddot l$ (measured).** The lower end of my refined whole-step hull ($K = 4$) is POSITIVE on every step from 374 to 434. For example: step 374 $[0.000104,\ 0.0128]$; step 400 $[0.00336,\ 0.0218]$; step 409 $[0.00336,\ 0.0250]$; step 434 $[0.00033,\ 0.0335]$. Steps 371 to 373 have small negative lower ends. Hence $\dot l$ is strictly increasing on steps 374 to 434 (derived).

**End $\dot l$ (measured, my own evaluation on the reconstructed end boxes).** It is negative at every end from 155 to 409; step 409's end is $[-0.00337,\ -0.0000681]$. It straddles zero at every end from 410 to 434: the upper end runs from $+0.000105$ to $+0.00462$, while the lower end stays negative. No end is proved positive. This confirms the subject's end claims.

**Lemma of adjudication 8 (derived from the above).** The bound for step $k$ is the minimum of $A + U\Delta$, $B + |L|\Delta$ and the crossing value, in outward interval arithmetic. It is negative on EVERY whole step from 371 to 409, so $\dot l < 0$ holds at every instant through the step-409 end, $t \le 5.956684709182828044891357$. Where $\ddot l \ge 0$ the bound equals the end's upper value, so the whole-step sign follows the end sign. From 410 on, every bound is positive, so those steps are UNDECIDED. The subject proved negativity over each step through 393; I prove it through 409.

**Falsifiers:**
- a reconstructed record that does not contain the true state (checked against the frozen records: all meet);
- a refined $\ddot l$ hull or end enclosure that misses the true value;
- a jump of $\dot l$ inside a step.

## 3. First-turn condition and support-turn ruling

- Whole-step $\dot l < 0$ holds on steps 275 to 370 (turning-point adjudication 12), on steps 371 to 380 from the frozen records (adjudication 8), and on steps 371 to 409 from the reconstruction (section 2). The first-turn condition is therefore met through the step-409 end.
- On steps 374 to 434, $\dot l$ is strictly increasing. So $\dot l$ has AT MOST ONE zero in $[t_{409}, t_{434}]$, where $t_{409} = 5.956684593623649597167969$ (lower end) and $t_{434} = 6.206684709182828044891357$ (upper end). If that zero exists, $\dot l$ changes from negative to positive there: it is a minimum of $l$, and it is the FIRST support turn.
- **Ruling.** SIGNED-SUPPORT TURNING POINT: NOT CERTIFIED to $t = 6.206684709182828044891357$. Its existence in the window is UNDECIDED, because no end enclosure is positive. Its uniqueness, if it exists, is PROVED (derived). There is no stationary extrapolation and no midpoint substitution. The subject's "midpoint crossing near 421" is guessed and is not admitted as a crossing.
- **Falsifier.** A later proved positive end before step 434 would certify the turn in the window between the last negative end and that end. A proved negative end after 409 would move the window.

## 4. Other events in the reconstruction (measured; uniqueness derived)

**Speed maximum.** My end $\ddot q$ is $[0.000845, 0.001172]$ at the step-238 end, $[-0.000136, 0.000194]$ (undecided) at the 239 end, and $[-0.001108, -0.000774]$ at the 240 end. The jerk is proved negative on these steps, from $-0.1010$ to $-0.0950$. So $a$ crosses zero exactly once, from positive to negative, in $(4.246684593623649597167969,\ 4.266684709182828044891357)$. This is the speed maximum of the earlier campaign, re-found on the reconstruction and consistent with the frozen records, which all meet.

**Radial acceleration sign change.**
- My end $a_r$ is $[-0.000515, -0.0000115]$ at the 382 end, $[-0.0000187, 0.000491]$ at the 383 end, and $[0.000479, 0.000994]$ at the 384 end.
- On steps 383 and 384, $a_r' = -\dot l - 2wa > 0$ (derived), because:
  - $\dot l < 0$ over those whole steps (section 2);
  - $w > 0$ and $a < 0$ there, from the turning-point campaign's proofs on the frozen records, which hold for the true path.
- So $a_r$ crosses zero exactly once, increasing, in $(5.686684593623649597167969,\ 5.706684709182828044891357)$. This confirms the subject's "near 382 to 383" claim, with uniqueness proved.

**Path turn.** $w > 0$ at every reconstructed end. NOT REACHED.

**Passage of $q$ through $\pi/2$.** The reconstructed ends are consistent with the frozen certification (turning-point adjudication 12, item 2), since all meet. No new ruling.

## 5. Completion ruling (to $t = 6.206684709182828044891357$, the step-434 end)

- PATH TURN: not reached.
- SPEED MAXIMUM: certified, unique, re-found in the reconstruction.
- SIGNED-SUPPORT TURNING POINT: not certified. It is excluded on $[\,\cdot\,,\ 5.956684709182828044891357]$. It is undecided on $(5.9567, 6.2067]$, with at most one crossing there.
- RADIAL ACCELERATION ZERO: certified, unique, in $(5.6867, 5.7067)$.

Every claim above rests on the stored-rate premise, the frozen step instrument and the admitted correlated inclusion. The two codes involved (the subject's and mine) share those premises and records, so their agreement is cross-code, not independent evidence.
