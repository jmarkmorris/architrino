# Six-pole post-turn campaign: Claude PI synthesis

*Living document of the Claude PI until closeout. Its earlier states are snapshots; dated corrections are made in place.*

## 1. Launch receipt

- **Selection.** On 2026-10-21 the operator replied "do 1 2 3 4" to the closing list of the [path-continuation campaign](spherical-six-pole-path-continuation-claude-synthesis.md). The reading is in [plan section 1](spherical-six-pole-post-turn-plan.md#1-selection-and-its-reading).
- **Plan.** [spherical-six-pole-post-turn-plan.md](spherical-six-pole-post-turn-plan.md), sha256 `b03917315cde3e9c…` at launch.
- **Clock.** Start 02:26:53 UTC; stop new exploration 04:41:53; hard closeout 04:56:53 (2026-10-21); never extended.
- **Roles.** The continuation, support and review agents of the path-continuation campaign were resumed with their context, by PI messages sent just after 02:26:53 UTC.

## 2. Item 1 (commit): blocked, awaiting an operator decision

The commit is a publication action under [pr-lifecycle](../../../../op/git/pr-lifecycle.md). No file was staged.

- **Why it is blocked.** The pre-commit hook runs `scripts/pr-validation-receipt.mjs`. By code reading (line 196, and its index-alignment check), that script refuses whenever:
  - a non-ignored untracked file lies outside the indexed candidate; or
  - a tracked file's working bytes differ from the index.

  It has no scoped mode.
- **Measured state.** At 02:23:42 UTC (clock read in the same command), `git status --porcelain` shows 242 entries: 55 modified and 187 untracked. They come mostly from other sessions' work: lattice, rotating ladder, binary, braid, EOM solver, Surface and operations trackers. The PI's own candidate is 124 paths: every `spherical-six-pole-path-continuation-*` file plus four noether-sea-research trackers. Its diff to those trackers was checked to contain only the PI's edits.
- **Coordination.** The Staggered lattice session (Residuals) also intends a scoped commit of its own lattice-research files. Both sessions agreed:
  - to serialize use of the shared index;
  - that neither will bypass the hook without the operator's approval;
  - that the index stays empty meanwhile.
- **The decision needed from the operator.** One of:
  - a combined commit once all writers stop, under the interim workflow;
  - an explicitly authorized hook bypass for scoped commits;
  - another route.

## 3. Findings

### F1. Q4: the second-support-turn bracket is narrowed from below to the step-539 end (SUSPENDED 03:03 UTC; see F3)

Every local maximum of the signed support $l=-w^2-r$ after the first support turn, up to the step-556 end, lies in

$$
(7.256684593623649597167959,\,7.426684709182828044891367),\qquad T\in(72.567,\,74.267),
$$

and at least one exists. Previously the bracket began at $7.1767$. The ruling is review post-turn [adjudication 2](spherical-six-pole-post-turn-claude-review-adjudication-2.md) (`3fd79b6b…`).

**How.** The support's admitted end-instant evaluator (receval v7, $6\times24$ cover, end instant only) proves $l'>0$ at every consecutive step end from 531 to 541 (S9 and S11, all controls passing first). The review's whole-step lower bounds $L$ on $l''$ (ddl10, K = 4; runs G4b′ and GP1) supply the lemma $l'(t)\ge A_{k-1}+\min(L_k,0)\Delta$ inside each step. Chained from the 531 end, the lemma keeps $l'>0$ at every instant through the 539 end, with margins from 0.00458 down to 0.00063. It fails on step 540 by $2.9\times10^{-5}$, so later ends cannot extend it: $A_{540}=0.000985<|L_{541}|\Delta=0.00174$.

**Grade and independence.** The end values come from the support's code and the $l''$ bounds from the review's. Both rest on the same stored-rate, step-instrument, inclusion and intersection premises, so their agreement is a cross-check between codes, not independent evidence.

**Falsifier.** A proved $l'\le0$ at any instant before the step-539 end, or an end or $l''$ enclosure that misses its true value.

**Not pursued.** A run to reach the 540 end (a finer cover at end 539, or K = 8 on step 540) would move the bracket by 0.01; it is optional.

### F2. Q2: the second support turn is UNIQUE and STRICT (SUSPENDED 03:03 UTC; see F3)

The signed support $l=-w^2-r$ has exactly one local maximum between the first support turn and the step-557 end, a strict sign change of $l'$ from positive to negative, in

$$
t_{s2}\in(7.276684593623649597167959,\,7.426684709182828044891367),\qquad T\in(72.767,\,74.267),
$$

strictly before the path turn. The ruling is review post-turn [adjudication 8](spherical-six-pole-post-turn-claude-review-adjudication-8.md) (`8a55627c…`). It also settles Q4, since this unique bracket is now the bracket for every maximum; F1's lower end at the 539 end is superseded by the 541 end.

**The new instrument.** The second rate is $l''=-2a^2-2wa'-r''$. Earlier evaluations treated $a$, $a'$ and $r''$ as independent boxes, although all three are functions of the same state and delayed source readings, so their uncertainties added. The continuation's ddl-jet evaluates them together:
- it carries order-2 Taylor expansions in time;
- each coefficient has an interval gradient with respect to fourteen primitives: the receiver's $q,w$, and each class's delayed source position, speed, acceleration and jerk;
- each delay expansion is solved exactly from the causal-delay condition, with coefficient $\tau_k=T_k/(1+B)$, $B=r_{q'}v'$;
- the enclosure is a mean-value form $F(\hat x)+\sum_j G_j(X)(X_j-\hat x_j)$, intersected with the natural extension, so the shared dependence cancels.

Controls ran first (71 of 71): an independent 40-digit oracle on a constructed cubic history, a 6.3-fold measured gain on a correlated box, three negatives, consistency with the frozen formulas, and refusals. The review admitted the instrument (adjudications 4 and 7).

**Result (measured).** $l''$ is negative on every whole step 532–557, with every one of four time sub-intervals per step negative (J2, `27170902…`). The hulls run from $[-0.0604,-0.0178]$ at 532 to $[-0.1513,-0.0872]$ at 557. On the shared steps 532–541 each hull lies inside the review's own ddl10 hull. The largest width term throughout is the like source's stored jerk box.

**Certificate (derived).**
- $l'$ decreases strictly on $[t_{531},t_{557}]$.
- With $l'(t_{541})>0$ (S9) and $l'(t_{556})<0$ (S8), it has exactly one zero.

**Grade and independence.** Derived, but cross-code. The $l''$ signs come from the continuation's instrument and the end signs from the support's. The review's own K = 4 evaluation could not decide $l''$, so uniqueness rests on the subject-side instrument, checked against the review's for consistency. All share the stored-rate premise, which supplies the source jerk.

**Falsifier.** A proved $l''\ge0$ anywhere on steps 532–557; a proved $l'\le0$ at the 541 end or $l'\ge0$ at the 556 end; or a true value outside any enclosure.

### F3. SOUNDNESS DEFECT: the reconstruction slice-resume serializer drops every sign (measured; independently confirmed)

**What was found.** v4.4 line 390 writes each number of the saved affine state as `[str(int(x.man)), int(x.exp)]`. In this mpmath, `.man` is the unsigned mantissa, and the sign lives in `_mpf_[0]`, which is never stored. Every saved `affine_last` contains no negative entry in its centre or coefficients: r1 212 symbols, r2 422, r5 1016, P1 1085, P2 1190, P3 1250. This was measured by the review with jq and confirmed by the continuation.

**How it was found.** The step at 571 was refused because the affine end and the box end were disjoint. A recording diagnostic (D1), whose known case reproduced the resumed step 551 exactly, showed the resumed state's $w$ hull mirrored in sign against the recorded end, $[+0.0483,+0.0569]$ against $[-0.0569,-0.0483]$. Before the turn, the stripped coefficient signs did not show up as a disjointness: the hulls still met.

**Consequence (derived; review post-turn [adjudication 10](spherical-six-pole-post-turn-claude-review-adjudication-10.md)).** The restored set is the entrywise-absolute-value parallelotope, with the same hull but a different set, so it need not contain the true state. Propagation from it is not a proof. Each certified end is that affine hull intersected with a box step that itself starts from the previous intersected end, so the reconstructed records from step 225 to 570 are NO LONGER PROVED enclosures. Sound: the in-run r1 (155–224) and the box-step records 275–436. Every event resting on post-resume records is SUSPENDED, though none is shown false:
- the October first support turn (both brackets);
- the path turn;
- the second support turn (F1, F2);
- the canonical-radial maximum.

**Repair.** A signed serializer in a new step version (cm49), with controls first: a mixed-sign round trip, an old-serializer negative, and an uninterrupted-versus-split resume case. Then a recomputation from the step-154 anchor, re-audits, and re-derivation of the events in dependence order.

### F4. The rebuild with a signed serializer, and the path turn RE-CERTIFIED on the sound chain (derived from measured enclosures; independently adjudicated)

**Rebuild.** The continuation's step version cm49 (`a0880ac6…`) writes and reads each saved affine number with its sign. Its controls ran first (K49b, 70 of 70): exact round trips of a mixed-sign form, the old writer failing, legacy files refused, and an uninterrupted-versus-resumed known case identical string for string. Review post-turn adjudications 12 and 13 admitted it. It recomputed the identical history from the step-154 anchor in six tagged slices, R1′–R6′ (steps 155–570), with no refusal; every end through 436 meets its frozen accepted record.
- R1′ is string-identical to the old in-run r1, as expected.
- Every later slice differs from the old chain from step 225 on, the first step after the old stripped resume.
- At step 225 the old enclosure was narrower and did not contain the new one, which is direct evidence that the defect changed the old results.
- The rebuilt widths are slightly narrower than the old ones.

The review audited all slices with its own instrument: 0 fails and 0 sign disagreements, accepting R1′–R6′ ([adjudication 14](spherical-six-pole-post-turn-claude-review-adjudication-14.md); [adjudication 15](spherical-six-pole-post-turn-claude-review-adjudication-15.md), `342062ff…`).

**Path turn, re-certified on the rebuilt chain:**

$$
t^*\in(7.426684593623649597167959,\,7.446684709182828044891367),\qquad T^*\in(74.2668459,\,74.4668471),
$$

unique, strict, and the first since release, with $q(t^*)\in[1.8109107,\,1.8175687]$. The evidence:
- whole-step $w>0$ on every step 155–556;
- $w(556)\in[+0.00042473,+0.00756460]$ and $w(558)\in[-0.00761927,-0.00015978]$;
- $a<0$ on every whole step 386–570 on both of the review's readings.

The bracket is unchanged from the suspended certificate; the proof now rests on sound records.

**Still to re-derive on the rebuilt chain:** the second support turn (Q2/Q4) and the first support turn with its narrower bracket.

### F5. The second support turn RE-CERTIFIED, unique and strict, on the rebuilt chain (derived from measured enclosures; independently adjudicated, cross-code)

Review post-turn [adjudication 16](spherical-six-pole-post-turn-claude-review-adjudication-16.md) (`fcfcd0a7…`) re-certifies the second support turn on the rebuilt records R1′–R6′. The signed support $l=-w^2-r$ has exactly one local maximum, a strict sign change of $l'$ from positive to negative, and it is the only zero of $l'$ on $[t_{437},t_{557}]$:

$$
t_{s2}\in(7.276684593623649597167959,\,7.426684709182828044891367),\qquad T\in(72.767,\,74.267).
$$

It lies strictly before the path turn ($t_{s2}<t_{556}<t^*$). The bracket is the same as F2's; the proof now rests on the sound chain. The derivation has four parts:
1. **$l'>0$ at every instant from the 437 end to the 531 end.** The review's lemma uses its own 437-end value and its ddl10 rows on 438–531 (GP4a, GP4b); every margin is positive, the smallest 0.000169 at 438.
2. **$l''<0$ on every whole step 532–557.** From ddl-jet-v2 on the rebuilt chain (J3).
3. **End signs.** $l'(541)>0$ (lower bound 0.000436) and $l'(556)<0$, from receval v7 on the rebuilt chain (S14).
4. **Conclusion.** $l'$ decreases strictly on 532–557 and changes sign once.

**Grade.** Derived. The $l''$ sign and the end signs come from the subject-side codes, so those parts are cross-code; the positive side is the review's own. All share the stored-rate premise for the source jerk.

**Open.** Whether this is the turn immediately after the first support turn depends on the first turn's re-certification (GP5, S16).

### F6. The first support turn RE-CERTIFIED, unique and strict, on the rebuilt chain, in a slightly narrower bracket (derived from measured enclosures; independently adjudicated)

Review post-turn [adjudication 17](spherical-six-pole-post-turn-claude-review-adjudication-17.md) (`4c7ecb77…`) re-certifies the first support turn: the first minimum of $l$, which is the moment of strongest inward support. It does so on the review's own evaluations of the rebuilt chain:

$$
t_{s1}\in(5.956684593623649597167959,\,6.226684709182828044891367),\qquad T\in(59.567,\,62.267).
$$

This is one step narrower at the top than the suspended October bracket, which ended at the 437 end. The derivation:
- **Negative side.** $l'<0$ at every instant from step 275 to the 409 end. On 371–409 this is the review's upper lemma (GP5a, GP5b). On 275–370 it is the earlier turning-point campaign's exclusion from frozen box records, which carry no affine form and are unaffected by the defect.
- **Positive end.** $l'(t_{436})\in[+0.0000354,\,+0.0050077]>0$.
- **Uniqueness and strictness.** $l''>0$ on every whole step 410–436.

**Link to the second turn (derived).** $l'>0$ at every instant from $t_{s1}$ to the 531 end: strict increase to 436, the lemma on step 437, and GP4a and GP4b on 438–531. So the second support turn (F5) is the next zero of $l'$ after the first.

**The narrower bracket (Q3 of the path-continuation campaign)** awaits the support's S16 at ends 412 and 431 on the rebuilt chain. $l''>0$ on 413–431 is already in hand.

### F7. The narrower first-support-turn bracket RE-CERTIFIED on the rebuilt chain (derived from measured enclosures; independently adjudicated, cross-code)

Review post-turn [adjudication 18](spherical-six-pole-post-turn-claude-review-adjudication-18.md) (`28cb55dc…`). On the rebuilt chain the support's receval v7 at a $6\times24$ cover (S16, `8fb030ba…`, 17 of 17 controls) gives:
- $l'(412)\in[-0.0023273,-0.0002549]<0$;
- $l'(431)\in[+0.0003032,+0.0030700]>0$.

The margins are larger than on the suspended chain. With the review's $l''>0$ on every whole step 410–436 (GP5b), the first support turn is the unique strict zero in

$$
t_{s1}\in(5.986684593623649597167959,\,6.176684709182828044891367),\qquad T\in(59.8668459,\,61.7668471).
$$

This restores the bracket of path-continuation adjudication 7 on new evidence. The coincidence with the suspended bracket is consistency only.

**Still suspended (not re-derived):**
- the speed maximum near $t\approx4.25$ as re-found on the October reconstruction (the original speed-maximum campaign's box-record result is unaffected);
- the canonical-radial zero near 5.69;
- the canonical-radial maximum after the path turn.

### F8. The earlier reconstruction events re-derived on the rebuilt chain (derived from measured enclosures; independently adjudicated; no new compute)

Review post-turn [adjudication 19](spherical-six-pole-post-turn-claude-review-adjudication-19.md) (`1c10a6ad…`) re-derives three events from its existing audit outputs on R1′–R6′:
- **Speed maximum, RE-CERTIFIED and unique,** $t\in(4.246684593623649597167959,\,4.266684709182828044891367)$. $w>0$ throughout; $a>0$ at the 238 end and $a<0$ at the 240 end; whole-step jerk negative on 226–250.
- **Canonical-radial zero, RE-CERTIFIED and unique,** $t\in(5.686684593623649597167959,\,5.706684709182828044891367)$. $r<0$ at the 382 end and $r>0$ at the 384 end; whole-step $r'=-l'-2wa>0$ on 355–385.
- **Canonical-radial maximum after the path turn: existence only,** in $(7.436684593623649597167959,\,7.526684709182828044891367)$. Its uniqueness, and its order relative to the path turn, are open on the rebuilt chain.

**A limitation for the return path.** The review's audit laws are signed general forms, so with $M<0$ each transmitter factor's side of 1 flips with the sign of the source speed. But none of the audit's own known controls has a negative source speed. Rulings on steps where a delayed source speed is negative, from about step 626 on for the like class, rest on the signed forms (inferred correctness) plus cross-code agreement. The subject's chart controls (geomx X2 and X4, cm49 E10) do cover $w'\in[-0.20,-0.10]$.

### F9. Q3: the return path from step 571 to step 688 (measured; independently audited)

The identical history was continued from the rebuilt step-570 strings under cm49 in three slices: P4′ (571–615), P5′ (616–660) and P6′ (661–688). Every step was certified with no refusal, reaching $t\in[8.746684593623649597167969,\,8.746684709182828044891357]$ ($T\approx87.47$). The review accepted 571–660 ([adjudication 20](spherical-six-pole-post-turn-claude-review-adjudication-20.md), `5dd97ef5…`) and 661–688 with no event ([adjudication 21](spherical-six-pole-post-turn-claude-review-adjudication-21.md), `6e7882a5…`).

**What happens on the return path.**
- **Speed.** The poles move back with growing speed: $w<0$ at every end, from $-0.05$ at 571 to $[-0.4550,-0.4290]$ at 688. The tangent acceleration stays negative on every whole step but shrinks in magnitude, to $[-0.2301,-0.1757]$ at 688. So $|w|$ increases strictly, and no speed extremum occurs through 688. A maximum of $|w|$, where $a$ reaches zero, is inferred beyond about step 700.
- **Support.** It strengthens inward throughout: $l'<0$ on every whole step. With $w<0$ and $a<0$, the geometric term $-2wa$ is now negative, so it FAVOURS stronger inward support; this is the reverse of its role before the turn. The canonical radial acceleration keeps falling, with $r'<0$ at every end.
- **The like partner sees the path turn one delay later (derived).** The like partner's delayed source speed changes sign exactly once, in $t\in(8.1167,\,8.1867)$, between the 625 and 632 ends. Because $M<0$ on the admitted chart, the like transmitter factor $D_L=1+v'M/r$ crosses 1 there, from below to above.
- **The antipode's tangent contribution changes sign** from positive to negative, in $t\in(8.3467,\,8.3867)$, between the 648 and 652 ends; existence only. The inferred mechanism: $N=\sin(q-q')$ for the antipode changes sign as its delayed source position passes the returning receiver's position near $q\approx1.66$.

**Where it stops, and why.** The like delayed source speed reaches $w'\ge-0.1764$ at 688 and falls about 0.006 per step, so it would cross the admitted chart edge $w'=-0.20$ near step 692–697 (inferred). A further slice would correctly refuse at the chart. Continuing needs a chart extension below $w'=-0.20$, with its own controls and admission. The receiver is at $q\ge1.4786$, close to the 1.45 floor of the $M$-sign certification.

**Limitation.** The review's audit laws are signed general forms, but its own known controls do not include a negative source speed. Its rulings on steps 632–688, where the like source speed is negative, rest on those signed forms plus cross-code agreement (inferred correctness). The subject's chart controls do cover $w'\in[-0.20,-0.10]$.

## 4. Oversight record
- 02:27:31 UTC (actual save): Launch: plan published (`b0391731…`); the continuation, support and review were resumed with messages stating questions Q3/Q2, Q4 plus the chart extension, and the reference addendum respectively. The staggered-lattice coordination is recorded in section 2.
- 02:28:16 UTC (actual save): The Staggered lattice session (Residuals) reports: it has finished editing, committed nothing, and left the index empty. It confirmed the line-196 reading and counted 472 untracked non-ignored files (counting files, not directories). Its ready scope is about 10 lattice-research paths plus its chat file, with no overlap with the PI's. Both sessions are asking the operator for the route; whichever touches the index first will tell the other.
- 02:28:28 UTC (actual save): **SLOT GRANT S9** to the support (census 02:28:21 UTC; only 69731, class (a), present): receval v7 unchanged, ends 539 and 541 at 6×24, `--end-only`; commands file `82f591b7…`, line 8. The choice of ends is inferred from the subject's end-$l'$ centres, about 0.0080 and 0.0067, against the 6×24 width of about 0.013.
- 02:29:23 UTC (actual save): The review's reference addendum is frozen (`09e6130e…`, 02:28:59 UTC); no Python was run and no subject file was opened.
- **(1) Chart extension (derived).** Every source is the same history, and $q$ falls while $w<0$, so $q'\le q(t^*)\le1.817731$. The extension needed is only about $[1.80,\,1.83]$. Since $w'\ge w(t)$ while $a<0$, source $w'<-0.10$ is needed only about one delay after $w$ itself passes $-0.10$, near step 650 (inferred).
- **Obligations on every new cell:** $M<0$ (or listed and refused), an $N$ map, chord floors, $D_c$ enclosures and root uniqueness. Controls: a direct-vector check, the $\pi/2$ oracle, negatives, and the old box refusing what the new one accepts.
- **(2) $l''$ route.** The K = 4 width comes from the input boxes, not from K. Budget: $l''\approx-2a^2$ (about $-0.23$ to $-0.33$) plus the small $-2wa'-r''$ (about $+0.15$ to $+0.2$). The review's route uses Q4's end values and the ddl10 lemmas to confine the sign change to 2–4 steps, then a sharper $l''$ (giving uniqueness) or sub-interval $l'$ signs (a delimitation only). A sharper instrument needs a containment theorem first.
- **(3) Return-path events.** With $w<0$: a speed MAXIMUM is a $-\to+$ change of $a$; a speed MINIMUM is a $+\to-$ change. The old audit detectors assume $\dot q>0$ and will not be used. With $w<0$ and $a<0$, $-2wa<0$ now FAVOURS stronger inward support, so the October mechanism is reversed.
- 02:30:00 UTC (actual save): **S9 returned by the support.** PID 70638, 02:29:00–02:29:12Z, exit 0, 12.10 s (light load). Record `ba6dd05c…` (verified). All controls pass, and the cover passes at 6×24.
- **End 539:** $l'\in[0.00167,0.01444]>0$.
- **End 541:** $l'\in[0.000304,0.01327]>0$.
- The subject's own evaluations span zero at both ends.
- If admitted, the lower end of the second-support-turn bracket moves to the step-541 end.

**S10 requested:** ends 542 and 543 at 8×48.
- 02:30:07 UTC (actual save): **SLOT GRANT S10** to the support (census 02:30:00 UTC; class (a) 69731, class (d) 70365, 70368, 71173–71176): v7 at ends 542 and 543, 8×48, launch no earlier than 02:30:42 UTC.
- 02:30:20 UTC (actual save): Review post-turn adjudication 1 (`e91ee3cc…`, 02:29:54 UTC) ADMITS S9. A local maximum of $l$ exists in $(t_{541},t_{556})$, padded $(7.276684593623649597167959,\,7.426684709182828044891367)$, before the path turn. End signs alone do not exclude maxima in $(t_{531},t_{541})$, so the bracket containing EVERY local maximum after the first support turn is unchanged.

**Route to narrow it from below (Q4 proper).** Instant-wise positivity by the lower lemma, chained from the 531 end. It needs refined v7 ends at EVERY end 531–540 (support, about 30 s) and the review's ddl10 $L$ rows on 534–541 (GP1, about 20 s); it is expected to reach about the 540 end.

**Q2.** The mirror upper lemma reaches the negative-at-every-instant region only near 557–558. About 541–557 remains for a sharper $l''$ or a sub-interval delimitation.

**PI queue:** S10 (granted) → GP1 → S11 (ends 531–540).
- 02:30:41 UTC (actual save): **S10 incident (support), no Python executed.** At 02:30:16 UTC the support evaluated line 22 of its commands file, which is the request header, not the command, and bash rejected it with a syntax error (exit 2). That was also before the 02:30:42 floor. No outputs and no process resulted. The support will run commands by exact text and check the floor first. S10 is re-granted on line 23.
- 02:31:40 UTC (actual save): Continuation design checkpoint 1 (`00d63f54…`, 02:31:04 UTC). Nothing has run.
- **Q2 diagnosis** (inferred from stored strings). The hull width at 540 comes from independent boxes: the rate box $a_p$ (width 0.19) gives $-2wa'$ about 0.025 of width, and $a_0$ (width 0.035) gives $-2a^2$ about 0.05. A sign proof needs a total width below about 0.06.
- **Q2 design.** Order-2 Taylor jets with interval gradients over 14 primitives: receiver $q,w$ plus each class's delayed $q',v',a',j'$. Each delay jet is solved from the fixed point. The enclosure is a mean-value form, so the shared dependence of $a$, $a'$ and $r''$ on the primitives cancels.
- **Q2 controls.** A cubic-history oracle via direct-vector findroot at 40 digits; a correlated box; negatives (zero jerk, sign flip, dropped $\ddot s$); consistency with the frozen formulas; refusals.
- **Q2 cost.** About 50 s for controls and two target runs of about 75 s. Gain odds 1.5–4× against 3× needed (guessed). Implementation 60–75 min.
- **Q3 (code reading).** The like ladder lowers $a_k=\mathrm{lo}(\mathrm{chord}_L)-0.90-0.15k$, with at most about 6 usable rungs; rung 3 is expected near steps 585–595. cm471's chart is the v4.4 box with $q'\le1.80$, so slices beyond it need a new instrument version that adopts the admitted chart extension.

**PI direction:** build the small chart-adopting step version (cm48) first, so slices can run while the $l''$ instrument is coded.
- 02:32:23 UTC (actual save): **S10 returned by the support.** PID 72238, 02:31:18–02:31:34Z, exit 0, 15.62 s. Record `4fba80c1…` (verified). Controls pass at 8×48.
- $l'(542)\in[-0.000203,0.012368]$ and $l'(543)\in[-0.000974,0.011695]$: both UNDECIDED.
- So 541 remains the latest end with $l'$ proved positive. The support infers that most of the 0.0126 width is real variation of $l'$ across the subject's end box, not cover pessimism.

**SLOT GRANT GP1** to the review: ddl10 on 534–541. S11 (ends 531–540) follows.
- 02:34:47 UTC (actual save): **GP1 returned by the review.** PID 73596, 02:33:53–02:34:12Z, exit 0, 19.24 s. Band record `3564273e…`; all controls pass.
- **Measured.** $L_k$ on whole steps 534–541 runs from $-0.14580$ to $-0.17417$ and $U$ from $+0.0574$ to $+0.0437$; every hull straddles zero. The lemma needs $|L|\Delta$ of 0.00146–0.00174 per step.
- **Inferred.** S9's $A_{539}=0.0016699$ falls just below $|L_{540}|\Delta=0.0016990$, so the chain would break at 540 unless S11 is tighter. The expected reach is the 539 end.

**SLOT GRANT S11** to the support (census 02:34:37 UTC; classes (a), (d)): v7 at ends 531–540, 6×24, launch no earlier than 02:35:42 UTC.
- 02:35:00 UTC (actual save): Support Q3 chart design received: `geomx-iv.py` (`8e95b77a…`), with diff from the frozen geomv (`ef90ec0e…`).
- **Extension.** Source $q'\in[0,1.83]$ and $w'\in[-0.20,0.45]$; the receiver box is unchanged at $[1.45,2.10]$.
- **Sizing (inferred).** The like source reads post-turn history only from about step 624, and $w'<-0.10$ starts near step 648, so the $-0.20$ bound covers up to about step 672.
- **Controls.** X2 closed forms against direct vectors on the strips; X3 swapped-sign negatives; X4 a prescribed turning history against Richardson differences, with negatives. The target grid uses exact shared edges.
- **Queue.** G1x is queued after S11. The diff goes to the review, whose addendum (frozen 02:28:59) already covers the chart requirements.
- 02:35:17 UTC (actual save): Continuation cm48 (`5e67e4b0…`, diff `ffcc89d7…`): the only change is one asserted replacement of the v4.4 BOX line, source $q'\le1.83$ and $w'\ge-0.20$. The receiver range stays $[0.55,2.10]$, because the inherited anchor controls need it. The inherited E10 re-verifies the whole new box (closed forms against direct vectors; a 30×30 census with $r>0.35$; inferred risk: like $r_{\min}$ near the floor). New control B9 tests acceptance and refusal at each new edge.

The PI noted that the continuation cited geomx as `12f75285…`, but the file now hashes `8e95b77a…`. The continuation was asked to re-read it and correct the citation.

Queue: S11 → G1x → Kc48 → P4, the last after the review admits geomx and cm48.
- 02:37:07 UTC (actual save): **S11 returned by the support.** PID 74616, 02:35:52–02:36:27Z, exit 0, 34.58 s. Record `8108121c…` (verified). All controls pass and every cover check passes.
- $l'$ is proved POSITIVE at every end 531–540; the lower ends fall from 0.00597 at 531 to 0.00099 at 540. With S9, every consecutive end 531–541 is positive.
- **Inferred, for the review.** Against GP1's $|L|\Delta$ the chain holds through step 539 ($A_{538}=0.00229>0.00166$) but breaks on step 540 ($A_{539}=0.00167<0.00170$). The instant-wise reach is therefore the 539 end.

**SLOT GRANT G1x** to the support: geomx controls, then target.
- 02:37:58 UTC (actual save): Review post-turn adjudication 2 (`3fd79b6b…`, 02:37:29 UTC):
- **Q4 narrowed (derived).** $l'>0$ at every instant through the 539 end. The all-maxima bracket is $(7.256684593623649597167959,\,7.426684709182828044891367)$; finding F1 recorded.
- **geomx design ADMITTED** against reference section 1. The "old box refuses $q'=1.81$" control belongs in cm48. G1x will be admitted if all controls pass and the census shows $M<0$ on all cells (or exceptions listed), positive chord floors, D positivity proved, and the $N$ map.
- 02:38:40 UTC (actual save): Review post-turn adjudication 3 (`979dd679…`, 02:38:20 UTC) ADMITS the cm48 design on conditions. The only change is the asserted BOX replacement; B9 includes the old-box-refuses-1.81 control; E10 re-censuses the new box. Findings:
- (a) **Provenance mismatch (measured).** cm48's header cites geomx `12f75285…`; the file on disk is `8e95b77a…`. The box values match, so the computation is unaffected. The continuation must correct the citation with a dated note in its report, not in cm48.
- (b) **Inferred risk.** E10's like chord floor of 0.35 might fail at the far corner. That would be a correct refusal, and the remedy is a narrower box or a finer grid.
- (c) **Receiver range.** A receiver $q<1.45$ lies outside the geomx sign maps and will be flagged per slice.

Conditions: the cm48 controls record, the corrected citation, slices from the P3 strings, and a positive G1x.
- 02:41:16 UTC (actual save): Continuation (02:41 UTC):
- **geomx citation.** Confirms the geomx hash `8e95b77a…` and unchanged source bounds. cm48 is not edited; its stale citation comment will be corrected in the report.
- **B9.** Confirmed to be the review's old-box-refusal control.
- **Q2 jet instrument ready.** `ddl-jet.py` (`c0756833…`). The delay-jet coefficients are solved exactly as $T_k/(1+B)$, $B=r_{q'}v'$ (derived during coding; the planned iteration converges only at rate about 0.3); the source jerk comes from the padded stored rate boxes; all inherited controls run first, then C1–C5.
- **J1 requested** (jet controls, 50–70 s).

G1x had not launched by 02:41:01 UTC, so the grant was repeated. Queue: G1x → Kc48 → J1 → P4.
- 02:43:19 UTC (actual save): **G1x returned by the support.** PID 79111, 02:42:15–02:42:32Z, exit 0, 16.43 s. Its launch slipped about 4 minutes because the support was in a 5-minute foreground wait; it will use shorter waits. Record `fbd03cb3…` (verified).

**Controls (all pass).** K1 (400 points), X2 (strips, worst error $2\times10^{-39}$), X3 negatives with clear differences, all inherited controls, and X4 (a prescribed turning history: reads beyond 1.80 and $w'=-0.11$; closed forms against Richardson differences to $10^{-30}$; negatives rejected).

**Target census** (measured, 11,895 cells with exact edges):
- $M<0$ on every cell, $M\in[-1.00183,-0.38723]$.
- $N$ has the same structure as G1: 57 positive, 11,813 negative, 25 undecided on the known zero locus.
- Chord floors: unlike 0.765, like 0.394, antipode 0.995.
- $D>0$ proved for all classes: like $D\ge0.541$.

**SLOT GRANT Kc48** to the continuation follows.
- 02:43:43 UTC (actual save): Review post-turn adjudication 4 (`2de7e71d…`, 02:43:22 UTC) ADMITS the ddl-jet v1 design for Q2 on the $w>0$ band.
- **Derived from the code:**
  - the mean-value containment over the primitive boxes is outer;
  - $\tau_k=T_k/(1+B)$ was hand-checked;
  - C1 is an independent reference;
  - the time sub-intervals overlap by the origin width.
- **Rule.** A step counts as negative only if every sub-interval is. Each hull must intersect the review's ddl10 hull. The signs are cross-code.
- **Condition.** A J1 controls record before targets.
- **What would settle Q2.** If ddl-jet proves $l''<0$ on every whole step from 540 to 556, then with $l'>0$ through the 539 end and $l'(556)<0$, the second support turn is unique and strict.
- 02:44:53 UTC (actual save): Review post-turn adjudication 5 (`1018a55d…`, 02:44:38 UTC) ADMITS G1x. The qualified chart is now receiver $[1.45,2.10]$, source $q'\in[0,1.83]$, source $w'\in[-0.20,0.45]$. $M<0$ on every cell, so each transmitter factor's side of 1 follows the sign of its source speed. The review will check slice tangent signs against the $N$ map. Kc48's E10 (coarse cells, like chord threshold 0.35) is the check to watch.
- 02:45:22 UTC (actual save): **Kc48 returned by the continuation.** PID 80237, 02:44:12–02:44:55Z, exit 0, 43.41 s. Record `47396075…` (verified): 69 of 69 controls pass.
- **E10 on the new box passes:** like $r_{\min}=0.355322$ against the 0.35 threshold, a margin of 0.0053; $D>0$ on every cell.
- **B9 passes**, along with B1–B8.

**SLOT GRANT J1** follows: the jet controls.
- 02:45:40 UTC (actual save): Standing foreign class (e) is added at 02:45:26 UTC: any Python with cwd or script under `.tmp/saturday-agents-2026-10-21/` (PID 80782, `lattice/explore2.py`, another session). **SLOT GRANT J1** to the continuation (census 02:45:26 UTC): the jet controls, launch no earlier than 02:46:25 UTC. Kc48 was sent to the review for a ruling before P4.
- 02:45:46 UTC (actual save): Review post-turn adjudication 6 (`e3528bf7…`, 02:45:29 UTC) ADMITS cm48 for slices. E10 provably ran on the new box: the like $r_{\min}$ moved from 0.38975 to 0.355322, passing the floor by 0.0053. Its whole-box census shows $M$ up to $+0.342$ for receivers below 1.45, so $M<0$ holds only for receivers at or above 1.45, and slices that go lower will be flagged. The citation correction is in the continuation report. P4 follows J1.
- 02:48:16 UTC (actual save): **J1 returned by the continuation.** PID 81560, 02:46:34–02:47:16Z, exit 0, 41.68 s. Record `440c75a9…` (verified): 71 of 71 controls pass.
- C1 matches an independent 40-digit reference to 12 or more digits on eight outputs.
- C2 shows a mean-value gain of 6.34 on a correlated box.
- C3 negatives and C5 refusals hold.
- C4 (consistency): at the 540 end, $l''\in[-0.085842,-0.041884]$ is NEGATIVE, width 0.044 against 0.151 natural. The width budget is led by the like source's stored jerk (0.0189).

**Review post-turn adjudication 7** (`cb24003e…`, 02:47:44 UTC) ADMITS ddl-jet for targets.

**SLOT GRANT J2** to the continuation (census 02:48:05 UTC; classes (a), (c), (d)): the jet band over steps 532–557 at K = 4, launch no earlier than 02:48:46 UTC. P4 follows.
- 02:50:50 UTC (actual save): **J2 returned by the continuation.** PID 83178, 02:48:52–02:50:09Z, exit 0, 76.79 s. Record `27170902…` (verified; partial false; controls pass).
- **Measured.** $l''$ is proved NEGATIVE on every whole step 532–557 (26 of 26), every sub-interval, with no undecided steps. The hulls run from $[-0.0604,-0.0178]$ at 532 to $[-0.1513,-0.0872]$ at 557. The smallest margin is $-0.0178$ at 532. The width budget is led throughout by the like source's stored jerk box.
- **Derived by the subject, for the review.** $l'$ decreases strictly from the 531 end to the 557 end, so it has exactly ONE zero in the bracket. The second support turn is unique and strict.

**SLOT GRANT P4** follows.
- 02:51:03 UTC (actual save): **SLOT GRANT P4** to the continuation (census 02:50:50 UTC; class (d) only): cm48, resuming P3 through step 590, launch no earlier than 02:51:39 UTC. J2 was sent to the review for the Q2 ruling.
- 02:51:19 UTC (actual save): Review post-turn adjudication 8 (`8a55627c…`, 02:50:50 UTC): **Q2 CERTIFIED.** The second support turn is unique and strict in $(7.276684593623649597167959,\,7.426684709182828044891367)$. Q4 is subsumed. Finding F2 recorded.
- 02:54:01 UTC (actual save): P4 output was written at 02:52:41 UTC (the continuation's receipt is pending). The PI read the record with node: controls_all_pass is true, and the run STOPPED at its first step. "step 571 refused: EMPTY intersection of the reconstructed (affine) end and the frozen-step end".

Both are meant to be proved enclosures of the same true state, so an empty intersection means at least one enclosure, or one of its premises, fails at step 571. A candidate is the stored-rate premise just after the path turn (inferred, unverified). The instrument refused as designed. This is a potential soundness signal, not a quirk to override. It goes to the review and the continuation for diagnosis, by code and record reading only, before any further compute.
- 02:55:35 UTC (actual save): Review post-turn adjudication 9 (`29649d2c…`, 02:55:01 UTC): step 571 is a CONTRADICTION, and Q3 is blocked at the 570 end.
- **Read from the record.** Only the frozen-step end box is kept: $q\in[1.80626,1.81430]$, $w\in[-0.06128,-0.05219]$. The affine end is not recorded, because it is written only on success.
- **Checks.** A hand kinematic check from the 570 box contains the frozen box (derived). A newly violated premise is unlikely (inferred): the remainders carry no sign assumption, and $w<0$ held through 13 certified cm471 steps. The suspects are the resume (affine_last against the restored strings, the symbol set, $t_0$) or something specific to cm48.
- **Earlier results stand.** Each enclosure alone gives $w>0$ at 556 and $w<0$ at 558, so the path turn stands. The second support turn stands as ruled. For robustness, $l'$ at 541 and 556 should be rechecked on the frozen boxes alone.
- **Diagnostics proposed:**
  - rerun 571 recording both enclosures;
  - rerun 571 under cm471 with the same resume;
  - a no-Python check of affine_last against P3's strings;
  - the support's $l'$ at 541 and 556 on frozen boxes.

**Review COMPUTE INCIDENT (self-reported).** At about 02:54:58 UTC the review ran an ungranted `python3 - 2>/dev/null`: system Python with empty input, inside a file-editing shell command. It executed no code and wrote nothing. It breaks both the venv rule and the grant rule, and is disclosed.
- 02:56:15 UTC (actual save): **P4 receipt (continuation).** 02:51:56–02:52:42Z, exit 0, 45.21 s. Record `7a091677…` (the PI's earlier node reading was of this file).
- **Not in the record.** The two end boxes, because the refusal path returns before writing them.
- **In the record.** The box step closed; $a_p=[-0.2094,+0.0231]$ spans zero, as it did at 570; the delayed reads lie inside the OLD box too.
- **Derived from the cm48 diff.** BOX is read only by refusal predicates, so cm471 would compute the same numbers and refuse the same way. The chart change is NOT the cause.
- **Inferred suspects:** (1) the integral remainder with $a_p$ spanning zero, never exercised past a turn in $a'$; (2) the affine acceleration model, which takes the centre-root reads plus a mean-value correction. The review adds (3) the resume itself.
- **Proposed diagnostic.** D1, `diag571.py` (`ad57ef20…`, recording only), computes at 571 the box step, the affine update with the integral remainder and with the sub-range remainder, and the centre with the box acceleration, and reports both ends and the gaps.
- **PI condition before granting.** D1 needs a known case: the same diagnostic must reproduce a step known to succeed (step 570 from the P3 records) before its 571 result is read.
- 02:56:28 UTC (actual save): The continuation corrected its own P4 receipt: the PID is 84834, read from the first line of P4.out. The support was asked to prepare, without compute, the frozen-box robustness check of $l'$ at 541 and 556.
- 02:58:38 UTC (actual save): **SLOT GRANT D1** to the continuation (census 02:58:30 UTC: no Python present): diag571-v2 (`133bef1f…`), which runs the known case first (exact reproduction of P3 step 551, the first step after a resume), then the resume checks, then the four step-571 computations. Recording only.
- 02:59:39 UTC (actual save): Support robustness design received: receval v8 (`661ac635…`; diff `51c03afe…`; commands `74173cab…`). The flag `--end-box=frozen-step` evaluates the end instant on the recorded `corr.box_end_q/w`; the history chain still uses the intersected strings. A new control V5 covers the corr-box route, with a negative.
- **Frozen-step boxes** (read with jq): at 556, $w\in[0.000364,0.007619]$; at 541, $w\in[0.057551,0.062856]$.
- **Inferred effect.** The margins shrink but should hold.
- **Requested.** S12 (v8 controls) and S13 (ends 541 and 556 at 8×48).
- **PI note for the review.** This rechecks the END box only. The delayed history it reads is still the intersected chain. A full robustness check would need a chain built from frozen boxes alone.
- 03:01:33 UTC (actual save): **D1 output** (written 22:59:48 local, which is 02:59:48 UTC; the PI read it with node): the known case passes, with step 551, the first step after a resume, reproduced exactly.
- **Resume check (measured).** The hull of the resumed affine form at the 570 end has $w\in[+0.04832,+0.05685]$, while P3's recorded step-570 end string has $w\in[-0.05685,-0.04832]$: the same magnitudes with the OPPOSITE SIGN. $q$ agrees.
- **Step 571.** The affine update gives $w\in[+0.0441,+0.0528]$ against the frozen box $[-0.0613,-0.0522]$, a gap of 0.096. The integral-remainder and sub-range-remainder versions are identical, so the remainder is NOT implicated. $A_{\rm centre}$ meets $a_0$.
- **Inferred cause.** The sign of the affine $w$ component is lost in serializing or deserializing `affine_last` at a slice boundary. It surfaces only now because P4 is the first resume with $w<0$; P1–P3 resumed with $w>0$, and steps 558–570 ran within one invocation.
- **Inferred consequence.** The certified events (path turn; second support turn; known case 551 exact) are unaffected, because no resume took place while $w<0$. To be confirmed by the review.

The exact defect is to be found by code reading. The repair would be a new version with a corrected reader and a negative-$w$ round-trip control.
- 03:02:30 UTC (actual save): **SOUNDNESS DEFECT FOUND** (continuation D1 receipt: PID 88035, 02:59:21–02:59:48Z, exit 0; record `2cb2993f…`).
- **The defect (measured by code reading).** v4.4 line 390 serializes with `ser(x) = [str(int(x.man)), int(x.exp)]`. In this mpmath, `.man` is the UNSIGNED mantissa, so every number written to `affine_last` at a slice boundary is stored as its absolute value. Measured with jq on P3's affine_last: 0 of 1250 symbol columns has any negative component, and $c_w\approx+0.0526$ where $w\approx-0.0526$.
- **Consequence (derived).** After every resume the affine form is a component-wise $|\cdot|$ reflection. It has the same hull at the resume instant but is a different zonotope, so it need not contain the true state, and its propagation is not a proof. Every certified end string is the intersection of that affine hull with the frozen-step box. So soundness is NOT established for any record after a resume:
  - October r2–r5 (resumes after steps 224, 294, 364 and 434);
  - this campaign's predecessor P1–P3.
  - r1 (continuous from the anchor) and the frozen pre-reconstruction records are unaffected.
- **Immediate PI disposition.** Every certified event that rests on post-resume records is SUSPENDED pending a rebuild, though none is shown false:
  - the October first support turn and its narrower bracket;
  - the path turn;
  - the second support turn;
  - F1 and F2 of this synthesis;
  - manuscript 5.13–5.15.
- **Repair route chosen:** a signed serializer in a new version (cm49) with round-trip controls; a rebuild from the step-154 anchor in slices; then re-verification of the events in priority order.
- 03:02:47 UTC (actual save): Review post-turn adjudication 10 (`9eead36a…`, 03:01:58 UTC) CONFIRMS the defect and is stronger than the PI's reading.
- **Measured.** Every saved affine_last has zero negative entries in centre AND coefficients: r1 212 symbols, r2 422, r5 1016, P1 1085, P2 1190, P3 1250. So the COEFFICIENT signs were stripped at every resume since r2 (step 225), even while $w>0$. The restored set is the entrywise-$|M|$ parallelotope, a different set.
- **Steps 225–570 are no longer PROVED.** Its earlier "each enclosure alone" back-up does not rescue this, because the frozen box starts from the intersected predecessor.
- **Sound:** r1 in-run (155–224), and the frozen turning-point box records (275–436).
- **SUSPENDED:** the October first-support-turn certificate (both brackets), the path turn, the second support turn, the radial maximum, and the Q4 brackets. Each is a live falsifier, not proof that any event is wrong.
- **Repair requirements:** a signed serializer; controls first, including a mixed-sign round trip, an old-ser negative, and an uninterrupted-versus-split known resume, string for string; a recompute from a sound state; re-audits; then re-derivation of the events in dependence order.
- **Note.** r1's saved affine_last is itself stripped, so the recompute must start from the step-154 anchor.
- 03:04:08 UTC (actual save): Review post-turn adjudication 11 (`dde768ba…`, 03:03:43 UTC): the defect is CONFIRMED by the review's own count, and the rebuild must start in memory from the step-154 anchor. The review's ruling-by-ruling split:
- **STANDS:**
  - October 11 (r1);
  - path-continuation 1, 2, 4, 5, 6 (designs), 8 (K2 and the endpoint rule) and 14;
  - post-turn reference, the design part of 2, 3 (design), 4, 5, 6 and 7.
- **SUSPENDED:**
  - October 12–15;
  - path-continuation 3 (its values), 7, the step-492 values in 8, 9–13 and 15;
  - post-turn 1, Q4 in 2, and 8.
- **WITHDRAWN:** post-turn adjudication 9 §3.
- **Sound evidence:** the frozen records through 436, r1, and the geometric and instrument results.
- **Re-derivation criteria, by event:**
  - path turn: whole-step $a<0$ on the new chain plus end signs;
  - second support turn: refined v7 ends, ddl-jet, and the ddl10 lemma;
  - first support turn: the negative side 275–409 plus end signs plus ddl10 on 374–437.

  Nothing is carried over unless the new strings equal the old ones exactly.
- **Cost (inferred).** 10–12 invocations and 35–45 min before re-audits. The path turn is reachable by 04:41; the support turns only partly.
- 03:04:54 UTC (actual save): Review post-turn adjudication 12 (`e9943fa6…`, 03:04:37 UTC) ADMITS the cm49 design (`0ece73d4…`). ser49 writes the signed mantissa and deser49 is its exact inverse. The resume refuses any untagged (legacy) file, which forces the start from the anchor. S-ser covers a mixed-sign exact round trip, the old writer failing, and a known resume case from the anchor. Conditions: a controls record first; tagged slices from 154; audit10 per slice; events re-derived under adjudication 11(c). The old records stay suspended and are not to be resumed or cited.
- 03:05:13 UTC (actual save): The continuation's cm49 (`0ece73d4…`; diff `49bed635…`, 69 lines) has three asserted replacements: the signed writer ser49, the reader deser49, and a resume that refuses untagged files.
- **S-ser controls:** (i) exact round trips of signed numbers and of a mixed-sign form; (ii) the old writer failing, and legacy-file refusal; (iii) a known save/resume from the anchor that must be identical string for string.
- **Rebuild plan:** R1′–R8′ (154→220→284→346→406→464→520→560→570).
- **Disclosed by the role.** An aborted draft build left an empty diff file, which the role deleted. It held no evidence content, but the deletion is noted under the no-deletion rule.
- 03:05:22 UTC (actual save): **SLOT GRANT K49** to the continuation (census 03:05:12 UTC: no Python present): the cm49 controls. **CONDITIONAL GRANT R1′**: one invocation, 154→220, only if K49 passes every control including S-ser (i)–(iii), launched at least 90 s after K49 ends. This is one named invocation, not a multi-run grant.
- 03:06:39 UTC (actual save): **K49 FAILED** (reported by the review from the out files, 24.92 s): `NameError: aff_deser` in `_resume_form_49` at control time, because v4.4 defines `aff_deser` after the controls exit. No controls record was written. The conditional R1′ grant is VOID. Next is cm491, a new file whose only change is a helper defined before use, then a fresh controls run.
- 03:06:51 UTC (actual save): The review accepts the cm49 fix. The continuation copied the run version to `cm49-v1.py` (`0ece73d4…`) and edited `cm49.py` (now `a0880ac6…`), under the copy-before-edit rule; the diff (`1912faa2…`) has one functional line. Adjudication 12 carries over. A fresh controls record is required before the rebuild, and the crashed K49 is to be receipted as an incident.
- 03:07:05 UTC (actual save): **K49 receipt** (continuation): PID 90745, 03:05:47–03:06:12Z, exit 1, no JSON; outputs .out `60398858…` and .out.time `66b594c9…`; a compute incident. **SLOT GRANT K49b** (census 03:06:56 UTC: no Python present): cm49 `a0880ac6…` controls under new names. **Conditional R1′** is re-issued for this hash, with the same conditions.
- 03:08:25 UTC (actual save): **K49b returned by the continuation.** PID 91406, 03:07:33–03:07:59Z, exit 0, 25.48 s. Record `4bf99f0b…` (verified): 70 of 70 controls pass. S-ser (i) gives exact signed round trips; (ii) the old writer fails (it reads $c_w$ back as $+0.0526$) and legacy files are refused; (iii) the resumed form is identical and step 2 is string-identical. The conditional R1′ grant therefore applies, from no earlier than 03:09:29 UTC.
- 03:08:41 UTC (actual save): Review post-turn adjudication 13 (`e6139c99…`, 03:08:27 UTC) ADMITS cm49 `a0880ac6…` for the rebuild from the 154 anchor. Every R′ file must carry the signed-v49 tag. Audits run in pairs, with `--own` set to the R′ files only; the frozen meet through 436 counts as consistency.
- 03:11:17 UTC (actual save): **R1′ returned by the continuation.** PID 91984, 03:09:40–03:10:41Z, exit 0, 60.78 s. Record `f81012da…` (verified; signed-v49 tag). Steps 155–220 are certified, and each meets its frozen record. All 66 end strings are IDENTICAL to the old r1 (expected, since r1 ran continuously; consistency only). The saved form now has 66 columns with a negative component, against 0 before.
- 03:11:27 UTC (actual save): **SLOT GRANT R2′** (census 03:11:17 UTC: no Python present): steps 220→295, launch no earlier than 03:12:11 UTC. **Conditional R3′**: only if R2′ is complete, certified and meets the frozen records, sized from measured rates to stay under about 95 s.
- 03:13:59 UTC (actual save): R2′ output was written at 03:13:22 UTC: record `93eb668c…`, steps 221–295, 75 of 75 certified and tagged (as reported by the review). The continuation's receipt is pending.

**Review consistency finding (measured with node).** R2′ equals the old chain on 221–224 (in-run in old r1) and DIFFERS from step 225, the first step after the old stripped resume, on 71 of 75 steps. At 225 the old $w$ enclosure was NARROWER than the new one and did not contain it. The stripped resume therefore changed the result, and the old end excluded part of what is now the proved set. This is direct evidence that the defect mattered, though not by itself proof that any event is wrong.

GP2 (the review's audit of R1′+R2′) is queued behind the conditional R3′ to avoid overlap.
- 03:16:56 UTC (actual save): **R3′ returned by the continuation.** PID 93331, 03:15:04–03:16:19Z, exit 0, 75.02 s. Record `034afdb7…`: 90 of 90 steps (296–385) certified, each meeting its frozen record; 0 of 90 identical to the old chain; slightly narrower. **SLOT GRANT GP2** to the review (census 03:16:42 UTC: no Python present): audit10 on R1′–R3′, launch no earlier than 03:17:49 UTC. R4′ (385→475) is granted to follow GP2 by 90 s, with the floor to be named.
- 03:19:26 UTC (actual save): **GP2 returned by the review.** PID 94690, 03:18:13–03:18:50Z, exit 0, 37.40 s. Record `47f11448…` (verified). With 68 controls passing per target, R1′, R2′ and R3′ (66, 75 and 90 steps) are audited with 0 fails and 0 sign disagreements, and all 231 ends through 385 meet their frozen records. **R1′–R3′ (155–385) are ACCEPTED.**

**SLOT GRANT R4′** (census 03:19:13 UTC): 385→475, launch no earlier than 03:20:20 UTC. A foreign process is NAMED for this grant: PID 94810, started 03:19:03 UTC, `python -B -` stdin heredoc through `${AAA_VENV:-../.venv}`, cwd checkout root, parent bash 94809. It is not one of this campaign's roles.
- 03:19:49 UTC (actual save): Review post-turn adjudication 14 (`12800117…`, 03:19:27 UTC) ACCEPTS R1′–R3′ (155–385). Re-derivation order once the chain reaches 570:
1. **Path turn:** audit10 on R4′–R6′.
2. **Second support turn:** the support's v7 at ends 531–541 and 556; ddl-jet on 532–557; ddl10 on 494–541.
3. **First support turn:** ddl10 on 371–437 at K = 4; the review's end values at 409 and 437; the support's values at 412 and 431.

The PI accepts this order. Estimated compute, with idle gaps, is about 35 minutes (inferred), within the 04:41:53 stop.
- 03:19:58 UTC (actual save): The support proposed running S16 (ends 412 and 431) early, after R4′. The PI declined, because the slot is continuously occupied by the rebuild slices, and inserting it would only delay the path-turn chain, which is priority 1.
- 03:22:37 UTC (actual save): **R4′ returned by the continuation.** PID 95210, 03:20:30–03:21:47Z, exit 0, 77.60 s. Record `051f2252…` (verified).
- Steps 386–475: 90 of 90 certified, and ends 386–436 meet their frozen records.
- 0 of 90 are identical to the old chain.
- On the rebuilt chain (subject end signs, the same pattern as before): $l'<0$ at every end through 409, spanning zero at 410–436, and positive from 437.

**SLOT GRANT R5′** (census 03:22:22 UTC): steps 475→550, shortened from 560 for alarm margin, launch no earlier than 03:23:17 UTC.
- 03:25:06 UTC (actual save): R5′ output was written at 03:24:38 UTC: record `acbafff3…`, steps 476–550, 75 of 75, tagged (reported by the review). The review's first look gives the rebuilt step-550 $w\in[0.0240224,0.0302531]$, inside the suspended old value. **SLOT GRANT R6′** (census 03:24:56 UTC: no Python present): steps 550→570, launch no earlier than 03:26:08 UTC. GP3 is to audit R4′–R6′ in one run after R6′.
- 03:25:14 UTC (actual save): **R5′ receipt (continuation).** PID 96133, 03:23:28–03:24:38Z, exit 0, 69.74 s: 75 of 75 certified with no refusal, 0 of 75 identical to the old chain, narrower widths. On the rebuilt chain: $w>0$ at every end 476–550; $a<0$ on every whole step; $l'>0$ at every end through 531, spanning zero from 532 (the same pattern as the old chain). The continuation is to write ddl-jet-v2, whose only change is the record list (R1′–R6′), for J3.
- 03:27:16 UTC (actual save): R6′ output was written at 03:26:51 UTC: record `c1454e39…`, steps 551–570, 20 of 20 certified and tagged. The rebuild 155–570 is complete. **Review first look** (subject values, not yet audited): $w>0$ at the 556 end $[+0.00042473,+0.00756460]$, straddling at 557, and $w<0$ at the 558 end $[-0.00761927,-0.00015977]$; the stored whole-step $a<0$ on 557–558. **SLOT GRANT GP3** (census 03:27:08 UTC: no Python present): audit10 on R4′–R6′, launch no earlier than 03:28:21 UTC.
- 03:28:00 UTC (actual save): **R6′ receipt (continuation).** PID 96708, 03:26:15–03:26:51Z, exit 0, 35.86 s.
- **Speed (measured on the rebuilt chain).** The last $w>0$ end is 556, $[0.0004247,0.0075646]$; 557 straddles; the first $w<0$ end is 558, $[-0.0076193,-0.0001598]$. Whole-step $a<0$ on every step 551–570.
- **Support rate.** $l'$ is positive at ends through 531, spans zero at 532–561, and is first negative at 562. This is the same end pattern as the old chain.

ddl-jet-v2 (`aa51eb79…`; diff `9fd54044…`) changes only the record list to R1′–R6′ and requires the signed tag. J3 runs every control before its target in the same invocation, as J2 did, so a separate J3c is not needed. J3 is queued after GP3.
- 03:30:02 UTC (actual save): GP3 (the review audit of R4′–R6′) output was written at 03:29:29 UTC; the receipt and path-turn ruling are pending. **SLOT GRANT J3** to the continuation (census 03:29:55 UTC: no Python present): ddl-jet-v2 on 532–557, launch no earlier than 03:30:59 UTC.
- 03:30:46 UTC (actual save): **GP3 returned by the review.** PID 97243, 03:28:51–03:29:29Z, exit 0, 37.49 s. Record `89f6e7a0…`: all 185 steps pass with 0 fails and 0 disagreements. **Review post-turn adjudication 15** (`342062ff…`, 03:30:12 UTC) ACCEPTS R4′–R6′ and RE-CERTIFIES the PATH TURN on the rebuilt chain in the same bracket; finding F4 is recorded. ddl-jet-v2 is admitted without a separate controls run.
- 03:31:55 UTC (actual save): The review prepared four ddl10 runs on the rebuilt chain (`--own` R1′–R6′ only, K = 4):
- GP4a, 438–493: the positive-side lemma from the first turn, which October adjudication 15 had rested on suspended records;
- GP4b, 494–541;
- GP5a, 371–405, and GP5b, 406–437: the first support turn.

Steps at or before 370 rest on the frozen records, which are unaffected.

**PI schedule** (each run with 90 s gaps): J3 → S14 → GP4b → GP4a → GP5b → GP5a → S16, expected to finish by about 03:50 UTC (inferred).
- 03:32:23 UTC (actual save): **J3 returned by the continuation.** PID 98125, 03:31:10–03:31:49Z, exit 0, 39.09 s. Record `5767cf81…` (verified); all controls pass on the chain R1′–R6′. On the rebuilt chain $l''$ is proved NEGATIVE on every whole step 532–557 (26 of 26), from $[-0.0599,-0.0183]$ at 532 to $[-0.1505,-0.0880]$ at 557.

The subject's own end evaluation leaves 557 spanning zero; its first negative end is 562. J4 (558–562) is proposed to bridge the gap. It is held until S14's refined end at 556 is known, since a negative refined 556 makes J4 unnecessary.
- 03:32:30 UTC (actual save): The support reports joincheck2 PASS on all five joins R1→…→R6, and the hashes match. **SLOT GRANT S14** (census 03:32:23 UTC: no Python present): v7 at ends 531–541 and 556 on R1′–R6′, launch no earlier than 03:33:19 UTC.
- 03:34:53 UTC (actual save): S14 output was written at 03:34:29 UTC: record `2fc67b89…`, controls pass; the PI read it with node; the support receipt is pending. On the rebuilt chain:
- $l'>0$ at every end 531–541; the lower end falls from 0.00609 at 531 to 0.000436 at 541;
- $l'(556)\in[-0.013508,-0.000710]<0$.

The signs are the same as on the old chain. J4 is not needed. **SLOT GRANT GP4b** to the review (census 03:34:42 UTC: no Python present): ddl10 on 494–541, launch no earlier than 03:35:59 UTC.
- 03:35:44 UTC (actual save): **S14 receipt (support).** PID 98720, 03:34:04–03:34:29Z, exit 0, 25.08 s; this confirms the PI's reading. The margins grew slightly on the rebuilt chain, to 541: $4.4\times10^{-4}$ and 556: $7.1\times10^{-4}$.

**Continuation report finalized** (`94c73951…`; manifest of 53 files, 14,578,360 bytes; scratch 92 KiB). The continuation is kept open for Q3: P4′ (cm49 from R6′, about 570→615) is to run after S16.
- 03:38:11 UTC (actual save): **GP4b returned by the review.** PID 99724, 03:36:57–03:37:43Z, exit 0, 46.50 s. Band record `b54018aa…`; all controls pass; it reads the R′ chain only.
- **Lemma (derived, rebuilt chain).** The margins are positive on every step 495–531, falling from 0.00655 to 0.00043, and the lemma fails at 532.
- **The rest of the band.** With J3's $l''<0$ on 532–557 and S14's $l'(541)>0$, $l'>0$ holds on $[t_{531},t_{541}]$ without the lemma.
- **Remaining for the second turn:** GP4a (438–493).

**SLOT GRANT GP4a** (census 03:38:02 UTC: no Python present): launch no earlier than 03:39:13 UTC.
- 03:41:31 UTC (actual save): GP4a (ddl10 438–493) output was written at 03:40:45 UTC; the receipt is pending. **SLOT GRANT GP5b** (census 03:41:24 UTC: no Python present): ddl10 on 406–437, launch no earlier than 03:42:15 UTC.
- 03:41:52 UTC (actual save): **GP4a returned by the review.** PID 227, 03:39:49–03:40:45Z, exit 0, 55.21 s; band record `bcce5588…`. **Review post-turn adjudication 16** (`fcfcd0a7…`, 03:41:28 UTC) RE-CERTIFIES the second support turn, unique and strict, on the rebuilt chain; finding F5 is recorded. The review's own $l'$ at the 436 end is now positive on the rebuilt chain, $[+0.0000354,+0.00501]$, where it had been undecided, which may narrow the first turn's broader bracket.
- 03:44:12 UTC (actual save): GP5b (ddl10 406–437) output was written at 03:44:03 UTC. **SLOT GRANT GP5a** (census 03:44:05 UTC: no Python present): ddl10 on 371–405, launch no earlier than 03:45:33 UTC. S16 follows.
- 03:44:31 UTC (actual save): **GP5b returned by the review.** PID 762, 03:43:28–03:44:03Z, exit 0, 34.43 s; band record `2faa0c4d…`. On the rebuilt chain (the review's own evaluations):
- $l''>0$ on every whole step 406–436 (lower bound at least $+0.000091$); step 437 is undecided.
- $l'<0$ at the ends through 409; $l'>0$ at the ends 436 and 437.
- The upper lemma gives $l'<0$ at every instant on 406–409.

**Preview (derived).** The first support turn is unique and strict in (409 end, 436 end), one step narrower than the suspended bracket. It still awaits GP5a for the negative side 371–405, and S16 for the narrower bracket.
- 03:46:54 UTC (actual save): GP5a (ddl10 371–405) output was written at 03:46:46 UTC. **SLOT GRANT S16** to the support (census 03:46:47 UTC: no Python present): v7 at ends 412 and 431 on R1′–R6′, launch no earlier than 03:48:16 UTC.
- 03:47:51 UTC (actual save): **GP5a returned by the review.** PID 1101, 03:46:11–03:46:46Z, exit 0, 35.70 s; band record `d1d583ae…`. **Review post-turn adjudication 17** (`4c7ecb77…`, 03:47:21 UTC) RE-CERTIFIES the first support turn, unique and strict, in (5.9567, 6.2267). That is narrower than the suspended October bracket, and the second turn is confirmed as the next zero. Finding F6 is recorded. The narrower bracket awaits S16.
- 03:49:12 UTC (actual save): S16 output was written at 03:48:31 UTC (controls pass; read with node). On the rebuilt chain: $l'(412)\in[-0.002327,-0.000255]<0$ and $l'(431)\in[+0.000303,+0.003070]>0$, the same signs with larger margins. The narrower-bracket ruling was requested from the review.

**SLOT GRANT P4′** to the continuation (census 03:49:00 UTC: no Python present): cm49 resuming R6′, 570→615, launch no earlier than 03:50:01 UTC.
- 03:49:34 UTC (actual save): **S16 returned by the support.** PID 1459, 03:48:18–03:48:31Z, exit 0, 12.99 s; record `8fb030ba…`. **Review post-turn adjudication 18** (`28cb55dc…`, 03:48:52 UTC) RE-CERTIFIES the narrower first-support-turn bracket; finding F7 is recorded.

All four suspended event certificates are now restored on the rebuilt chain: the path turn, the second support turn, and both first-support-turn brackets. Still suspended: the reconstructed speed-maximum re-finding, the radial zero and the radial maximum. Q3 continues with P4′.
- 03:51:34 UTC (actual save): The support finalized its report (`593c722d…`) and its self-excluded manifest (`d0463a73…`: 39 files, 414,381 bytes, every row re-verified). Its scratch is 172 KiB, plus 1,280 KiB of reused path-continuation tools. No processes are running, and its single backgrounded shell wait ended at 02:53:57. It is holding for the close.
- 03:52:07 UTC (actual save): **P4′ returned by the continuation.** PID 1763, 03:50:10–03:51:01Z, exit 0, 51.42 s. Record `4fc26137…`: steps 571–615 certified (45 of 45) with no refusal, reaching $t\approx8.0167$ ($T\approx80.17$). Measured, on the return path:
- **Signs.** $w<0$ at every end, from $-0.052$ to about $-0.235$. $a<0$ on every whole step, with $|a|$ shrinking (upper bound from $-0.388$ to $-0.344$), so there is no speed extremum yet. $l'<0$ and $r'<0$ at every end. The per-class signs are constant, and every delayed source $w'>0$.
- **Brackets.** The like root turned and is rising; the ladder handled it statelessly.
- **Chart.** Source $q'\le1.8155$, against the 1.83 edge. The source $w'$ minimum is 0.034, with the like delayed read crossing the path turn near step 626.

**SLOT GRANT P5′** (census 03:51:53 UTC: no Python present): steps 615→660, launch no earlier than 03:52:31 UTC. GP6 is to audit P4′ and P5′ together.
- 03:53:17 UTC (actual save): Review post-turn adjudication 19 (`1c10a6ad…`, 03:52:48 UTC) re-certifies the speed maximum and the radial zero on the rebuilt chain, from existing outputs; the radial maximum is existence only. It flags that its audit has no known control with a negative source speed. Finding F8 is recorded.
- 03:54:16 UTC (actual save): P5′ output was written at 03:53:47 UTC: record `22629d11…`, steps 616–660, 45 of 45, tagged. **Review preview** (subject values, not yet audited):
- $w<0$, growing to $[-0.3895,-0.3661]$ at 660.
- $a<0$ but shrinking, to $[-0.2886,-0.2320]$; no speed maximum yet.
- $l'<0$ and $r'<0$ throughout.
- **The like delayed source speed CHANGES SIGN:** $[+0.0147,+0.0335]$ at 621, straddling at 626 and 631, $[-0.0324,-0.0101]$ at 636, and $[-0.1029,-0.0764]$ at 660, inside the $-0.20$ edge.

**SLOT GRANT GP6** (census 03:54:07 UTC: no Python present): audit10 on P4′ and P5′, launch no earlier than 03:55:17 UTC.
- 03:55:08 UTC (actual save): **P5′ receipt (continuation).** PID 2621, 03:52:55–03:53:47Z, exit 0, 51.79 s. Steps 616–660 certified (45 of 45) with no refusal, reaching $t\approx8.4667$ ($T\approx84.67$).
- **Signs.** $w<0$ ($[-0.3895,-0.3661]$ at 660) and $a<0$ on every whole step, with $|a|$ shrinking; a speed extremum is inferred beyond about step 700. $l'$ and $r'$ are negative.
- **Event 1 (measured).** The like delayed source speed turns negative: the first proved-negative end is 632, with spanning ends 626–631. With $M<0$, the like transmitter factor $D$ moves from below 1 to above 1 (from 635).
- **Event 2 (measured).** The antipode tangent contribution changes sign: positive through 648, spanning 649–651, negative from 652. Inferred mechanism: the antipode $N=\sin(q-q')$ changes sign as the delayed antipode source passes the returning receiver's $q$ near 1.66.
- **Margins.** The like ladder's lower margin was as small as $1.3\times10^{-5}$ at 659, still proved. Source $q'$ peaked at 1.81757 near step 630.
- **Projections (inferred).** Source $w'$ reaches $-0.103$ at 660 and should hit the $-0.20$ edge near step 690. The receiver crosses 1.45 near step 698.
- **Proposed.** P6′, steps 660→688, stopping before the edge.
- 03:56:50 UTC (actual save): GP6 (the review audit of P4′ and P5′) output was written at 03:56:19 UTC; the ruling is pending. **SLOT GRANT P6′** to the continuation (census 03:56:43 UTC: no Python present): steps 660→688, launch no earlier than 03:57:49 UTC. It is the last slice of the campaign.
- 04:00:09 UTC (actual save): **Review post-turn adjudication 20** (`5dd97ef5…`, 03:57:29 UTC) ACCEPTS P4′ and P5′ (571–660), judged on return-path criteria.
- No speed extremum, because $w<0$ and $a<0$ on every whole step, so $|w|$ increases strictly.
- No support turn, because $l'<0$ on every whole step, so the inward magnitude grows. This is consistent with the reversed mechanism.
- No radial turn on 581–660.
- **Like partner (derived).** Its delayed source speed changes sign exactly once in $(8.1167,8.1867)$, and $D_L$ crosses 1 from below to above: the path turn seen by the like partner one delay later.
- **Antipode.** Its tangent contribution changes sign $+\to-$; existence only, in $(8.3467,8.3867)$.
- **Limitation.** Steps 632–660 rest on signed forms without a known negative-$v'$ control.

**P6′ returned by the continuation.** PID 3260, 03:57:59–03:58:40Z, exit 0; record `0bd10847…`. Steps 661–688 are certified with no new event. Margins: source $w'\ge-0.1764$ against the $-0.20$ edge; receiver $q\ge1.4786$.

**The continuation handed back its final report** (`d0d574d7…`; manifest of 62 files, 18,975,487 bytes; scratch 236 KiB).

**SLOT GRANT GP7** to the review (census 03:59:58 UTC: no Python present): audit10 on P6′, launch no earlier than 04:00:10 UTC. This is the last compute of the campaign.

The PI's stuck shell command (an empty `cat >` waiting on stdin) was stopped. It had created an empty `/tmp/x.mjs` file, which the PI removed.
- 04:03:51 UTC (actual save): Review post-turn adjudication 21 (`6e7882a5…`; GP7 PID 4178, 04:02:06–04:02:13Z, exit 0, 7.31 s) ACCEPTS P6′ (661–688) with no event. Inferred outlook: a canonical-radial zero about 15–20 steps past 688. This was the last compute of the campaign. Section 5 (Account) is written.

## 5. Account (written at closeout)

### 5.1 The answer in plain words

- **Item 1 (commit)** is not done. The repository's pre-commit check refuses while other sessions' untracked and unstaged files are present (section 2). It awaits the operator's choice of route.
- **Item 2 (uniqueness of the second support turn): done.** A correlated evaluation of the second rate of the support (ddl-jet) proves $l''<0$ on every whole step 532–557. So the inward support weakens to a single minimum, once, strictly, in $t\in(7.2767,\,7.4267)$, before the path turn (F2, F5).
- **Item 4 (lower end of that bracket): done, then subsumed.** The bracket first narrowed from below (F1). Uniqueness then made the bracket for every maximum equal the unique bracket.
- **Item 3 (continuation past step 570): done to step 688, and it uncovered a soundness defect.** The first slice past 570 was refused because its two enclosures were disjoint. Diagnosis showed that the reconstruction's slice-resume writer had dropped the sign of every saved number since October (F3). Every result resting on records after a resume was suspended. The serializer was repaired, and the history recomputed from the step-154 anchor and audited. Every event was then re-derived on the sound records (F4–F8):
  - path turn;
  - both support turns;
  - both first-turn brackets;
  - speed maximum;
  - canonical-radial zero.

  The brackets came out the same, or slightly narrower. The history was then continued to step 688 (F9). The return path shows a growing backward speed, strengthening inward support, the like partner registering the turn one causal delay later, and a sign change in the antipode's tangent contribution. It stops before the next chart edge.
- **Grade.** Derived from measured interval enclosures (mpmath intervals at 30 digits, method of steps with $N=4000$, $\Delta=0.01$, on the recomputed history from the step-154 anchor to step 688). Rulings come from the independent review. Some signs (the $l''$ band and several end values) come from subject-side codes, so the agreement there is cross-code, not independent. All results share the stored-rate premise.

### 5.2 Settled account (all on the recomputed history R1′–R6′, P4′–P6′)

| event | status | interval in $t$ | ruling |
| --- | --- | --- | --- |
| Speed maximum | certified, unique | $(4.246684593623649597167959,\,4.266684709182828044891367)$ | post-turn 19 |
| Canonical-radial zero | certified, unique | $(5.686684593623649597167959,\,5.706684709182828044891367)$ | post-turn 19 |
| First support turn, broader bracket (review's own) | certified, unique, strict | $(5.956684593623649597167959,\,6.226684709182828044891367)$ | post-turn 17 |
| First support turn, narrower bracket | certified, unique, strict (cross-code ends) | $(5.986684593623649597167959,\,6.176684709182828044891367)$ | post-turn 18 |
| Second support turn (max of $l$) | certified, unique, strict (cross-code $l''$ and ends); next zero after the first | $(7.276684593623649597167959,\,7.426684709182828044891367)$ | post-turn 16 |
| Path turn (max of $q$) | certified, unique, strict; first since release | $(7.426684593623649597167959,\,7.446684709182828044891367)$ | post-turn 15 |
| Canonical-radial maximum | existence only | $(7.436684593623649597167959,\,7.526684709182828044891367)$ | post-turn 19 |
| Like delayed source speed changes sign ($D_L$ crosses 1) | certified, unique | $(8.116684593623649597167959,\,8.186684709182828044891367)$ | post-turn 20 |
| Antipode tangent sign change $+\to-$ | existence only | $(8.346684593623649597167959,\,8.386684709182828044891367)$ | post-turn 20 |
| Return path 571–688 | no speed extremum, no support or radial turn; $|w|$ increasing | to $t\approx8.7467$ | post-turn 20 (571–660), 21 (661–688) |

### 5.3 The defect and what it teaches

- **What went wrong.** The October writer `ser(x) = [str(int(x.man)), int(x.exp)]` used mpmath's unsigned mantissa. It passed every control because no control saved and restored a form with negative entries. Before the turn, the stripped signs only reshaped the resumed set (same hull), and every hull check still met.
- **How it was caught.** The failure became visible only when a centre itself changed sign. The refusal rule (intersect only two proved enclosures; refuse on empty) caught it at the first resume after the turn.
- **The repair.**
  - a signed writer and a tagged format;
  - a mixed-sign round-trip control;
  - an uninterrupted-versus-resumed known case;
  - a recomputation from the last state that never passed through the writer.
- **Lesson (for every instrument that saves state between invocations).** A save/resume path is part of the instrument and needs its own known case: split execution must equal uninterrupted execution, string for string.

### 5.4 Falsifiers

- A recomputed end that misses its frozen accepted record through 436, or any true value outside a listed enclosure.
- A cm49 save/resume that fails to reproduce an in-run step.
- For each event: a proved sign contrary to its stated side, at or between the stated ends.
- For the uniqueness claims: a proved $l''\ge0$ on 532–557, a proved $l''\le0$ on 410–436, or a proved $a\ge0$ on 557–558.

### 5.5 Incidents and process findings

- **Q2/Q3 work.**
  - The S10 command-line slip, with no execution.
  - The K49 NameError, caught by controls before any target.
  - The P4 refusal that exposed the defect.
  - The continuation's PID mis-statement, corrected.
- **Ungranted Python.** The review ran an ungranted system `python3 -` (empty input, no effect; self-reported). The PI ran no ungranted Python in this campaign.
- **A stuck PI command.** One PI shell command left a `cat >` waiting on stdin and was stopped; it created an empty `/tmp` file, which was removed. No evidence was affected.
- **Foreign processes.** From four other sessions, handled by standing foreign classes (a)–(e) and one named PID (94810). None was touched.

### 5.6 Grant ledger (post-turn campaign)

The support ran S9–S11, S14 and S16; S10 was re-granted, S12 and S13 were cancelled, and S7 and S8 belonged to the predecessor campaign. G1x ran geomx. The continuation ran Kc48, J1, J2, P4 (refused), D1, K49 (failed), K49b, R1′–R6′, J3 and P4′–P6′. The review ran GP1–GP7, including GP4a, GP4b, GP5a and GP5b. Every receipt (PID, times, exit, hashes) is in section 4.

### 5.7 Open and next

- **Past step 688.** A controlled chart extension below source $w'=-0.20$, and below receiver 1.45 for the $M$-sign certification.
- **A negative-$v'$ known control** in the independent audit.
- **The radial maximum.** Its uniqueness, and its order relative to the path turn.
- **A law-derived source jerk**, to replace the stored-rate box in $l''$.
- **The commit route** (item 1).

## 6. Closeout (written 04:05:03 UTC, clock-read; early, before the 04:41:53 stop; no clock extended)

- **Closing conditions.**
  - Q2 has a ruling (unique and strict, adjudications 8 and 16).
  - Q4 is subsumed.
  - Q3 stops at an adjudicated chart edge after continuing to step 688.
  - The soundness defect was found, repaired, and the history recomputed and re-audited.
  - Item 1 (commit) awaits the operator's route decision.
- **Last compute.** GP7, which ended at 04:02:13 UTC.
- **Roles.** All three handed back with return contracts:
  - Continuation: `d0d574d7…`, manifest of 62 files.
  - Support: `593c722d…`, with manifest `…-support-manifest-20261021T035120Z.txt` (`d0463a73…`).
  - Review: `b389a2b6…`.

  The support agent, which was holding after its hand-back, was stopped with TaskStop at 04:04 UTC; its report hash was unchanged afterwards. The PI timer was stopped.
- **Final census** (04:04:38 UTC). No Python process is running, and no campaign-named process.
- **Storage** (`du -sk`, 04:04 UTC):
  - evidence `*post-turn*`: 41,612 KiB in 135 files;
  - analysis: 328 KiB in 29 files;
  - scratch `.tmp/six-pole-post-turn`: 520 KiB;
  - the support's reused tools under the path-continuation scratch: about 1,280 KiB;
  - no `.local-data`.

  The total, about 42.7 MiB, is within the 50 MiB budget. Storage is local only, and nothing is committed.
- **Integration.**
  - Manuscript 5.13: a suspension notice, then a restoration notice.
  - Manuscript 5.16: the return path (new).
  - priorities.md and work-queue.md: closed status.
  - work-log.md: the 2026-10-21 entry.
- **Manifest.** A dated, self-excluded final manifest of every `spherical-six-pole-post-turn-*` file in analysis and evidence, generated to scratch, copied under its dated name, and verified row by row.
- **Mutable at manifest time:** this synthesis and the plan.
