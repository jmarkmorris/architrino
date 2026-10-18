# Six-pole correlated continuation review: adjudication 10 (the support's C17 requalification of the sub-interval route)

Written 2026-10-14T12:36:29Z by the review role. No code was run.

**Read.**
- The diff of the support's receval v2 (d36a4a49…) against v3, [receval-iv.py](../evidence/spherical-six-pole-correlated-continuation-claude-support-receval-iv.py), sha256 23b4689eb300119f13dc0dea2c3f5319e1022bc0253b38951985c34b20614531. The diff adds controls P6 to P9 and makes the route return its boxes; nothing else in the route changed.
- The C17 records:
  - [371-375, n = 2](../evidence/spherical-six-pole-correlated-continuation-claude-support-C17-receval-frozen-371-375-n2-r1.json), sha256 8e18936cff81b5899ed44161ea3b08a1fd2e940dd277186717a0ef23c7d664c1, PID 53043, exit 0;
  - [376-395, n = 4](../evidence/spherical-six-pole-correlated-continuation-claude-support-C17-receval-frozen-376-395-n4-r1.json), sha256 2acc30163d17f432bbbc727d11b8db2dcbb697014bbb6ae5574373e2b9be8b5c, PID 53273, exit 0.
- The support's receipt, lines 91 to 101.

1. **The new controls meet the requalification of adjudication 8, section 2 (derived from the code; measured as passed in both records).**
   - **P6 positive.** The known case is a receiver cubic with $\dot a = 2000$, an uncertain origin of width $10^{-3}$, and stationary partners at $q' = 0$, so the exact causal root is $s^*(t) = t - r_c(q(t), 0)$. That root is increasing, because $|dr/dt| < 1$ there.
     - The ranges of $q$, $w$ and $s^*$ over each sub-interval's true instants are exact endpoint values by monotonicity, with $w, a > 0$ for $u \ge 0$.
     - Each must lie inside the route's boxes.
     - The sub-intervals must cover $[\underline T, \overline T + \Delta]$ without a gap.
     - The hull of the $q$ boxes must contain the exact whole-step range and lie inside the whole-step box.
     - The history is a chain of static slabs, so source reads cross slab joins.
   - **Negatives.**
     - P7: rate bound set to 0. The true remainder of $2000\,\Delta^3/6 \approx 3.3\times10^{-4}$ must then be missed.
     - P8: origin given as a point while the truth is offset by $10^{-3}$.
     - P9: bracket shifted by 0.1, beyond the 0.03 widening, which must be refused by the residual-sign check.
   - **Not tested directly.** P6 does not test the $\dot l$ law value against an exact one. The law is the admitted frozen interval evaluation, and P6 establishes that its inputs (state boxes and root ranges) contain the truth, so containment of $\dot l$ follows (derived).
   - **Ruling:** the sub-interval route is QUALIFIED from C17 on.

2. **C17 results (measured).**
   - Steps 371 to 375 at $n = 2$: every sub-interval negative. The hulls are identical to C13's, digit for digit, as expected from the unchanged route. Step 375's hull is $[-0.0108276,\ -0.0000188]$.
   - Steps 376 and 377 at $n = 4$: all negative, with hulls $[-0.010418, -0.000271]$ and $[-0.010435, -0.000114]$.
   - Step 378 and later: undecided (upper $+4.7\times10^{-5}$ at 378, rising to $+1.09\times10^{-3}$ at 384).
   - **Ruling:** whole-step $\dot l < 0$ on 371 to 377 is REQUALIFIED by the support's route. The C12 and C13 sub-interval records stay provisional as records; C17 supersedes them.

3. **Provenance (measured; inferred identity).** The launches again used the generic file name, with no hash in the receipt or the JSON. The file's modification time (12:27 UTC) precedes C17 (12:33), and its hash now is the granted 23b4689e…, so the bytes run are inferred to be the granted ones. The recommendation to write the script hash into every output stands.

4. **Relation to adjudication 8.** My bound from end values plus $\ddot l$ proves 371 to 380. The support's direct route proves 371 to 377. The two agree wherever both decide: on step 375 mine gives at most $-0.000784$, the support's $-0.0000188$; on step 377, at most $-0.000480$ against $-0.000114$. They are different codes and methods on the same frozen records and premise, so this is cross-code agreement, not independent evidence. The continuous exclusion of a support turn stands to the step-380 end, $t \le 5.666684709182828044891357$, on my derivation; the support's route independently reaches the step-377 end. **Falsifier:** any step in 371 to 377 where the two disagree in sign.
