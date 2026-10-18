# Six-pole correlated continuation review: adjudication 8 (the support's C13 sub-interval claim; control chronology; an independent whole-step proof from my frozen records through step 380)

Written 2026-10-14T12:33:05Z by the review role. No code was run; every number below is read from frozen records and combined by hand arithmetic (outward where it matters; every margin is at least .8\times10^{-5}$ against hand-rounding below 0^{-9}$).

**Read.**
- The support's [receval v2](../evidence/spherical-six-pole-correlated-continuation-claude-support-receval-iv-v2.py), sha256 d36a4a494545ac57… (whole file).
- Its C13 records:
  - [371-403](../evidence/spherical-six-pole-correlated-continuation-claude-support-C13-receval-frozen-371-403-r1.json), sha256 e814c131016060d8…;
  - [404-436](../evidence/spherical-six-pole-correlated-continuation-claude-support-C13-receval-frozen-404-436-r1.json), sha256 18ce3ae3243ba088…;
  - rows for steps 371 to 378.
- The support's [receipt](../evidence/spherical-six-pole-correlated-continuation-claude-support-commands.txt), lines 56 to 89 (C12 PIDs 45436 and 46031; C13 PIDs 48100 and 48801, exit 0).
- My frozen turning-point records:
  - [audit9 v3 p5-p7](../evidence/spherical-six-pole-turning-point-claude-review-audit9-v3-p5-p7.json), sha256 bcf670cd3638c5ef2472859bd8d6bf00b865308f02172da47607ad7f15209e02 (my step-end $\dot l$ enclosures);
  - [ddl-refine p6-p7](../evidence/spherical-six-pole-turning-point-claude-review-ddl-refine-p6-p7.json), sha256 828ef0e038de86cb003b5e4e395bc23422cb4ce511aa387eb53c7b607bf75196 (my refined whole-step $\ddot l$ enclosures; all 16 controls pass, R1 to R3 included; admitted in my turning-point [adjudication 5](spherical-six-pole-turning-point-claude-review-adjudication-5.md), item 4).

## 1. The support's sub-interval construction (derived; read from lines 103 to 118)

**(a) The union is the whole step.**
- Sub-interval $i$ of $n$ uses the time set $\tau_i = [\,\underline{T_0} + i\Delta/n,\ \overline{T_0} + (i+1)\Delta/n\,]$, where $T_0$ is the step's start-time interval.
- The union over $i$ is $[\underline{T_0},\ \overline{T_0} + \Delta]$, which contains the true step $[t_0, t_0 + \Delta]$ for every $t_0 \in T_0$.
- The elapsed-time set $S_g = [\max(0, \underline{\tau_i} - \overline{T_0} - \text{PAD}),\ \min(\Delta, \overline{\tau_i} - \underline{T_0} + \text{PAD})]$ contains $t - t_0$ for every $t \in \tau_i$ and every $t_0 \in T_0$. It is outer, because it counts the origin width twice, which is safe.

**(b) The state boxes come validly from the record's Taylor form.**
- $q(s) = Q_0 + V_0 s + A_0 s^2/2 + \int_0^s (s-\sigma)^2/2\ \dot a(\sigma)\,d\sigma$, and the integral lies in $A_P\,s^3/6$ whenever $\dot a \in A_P$ almost everywhere on the step (the stored-rate premise), since the weight is nonnegative. The same holds for $w$ with $A_P s^2/2$.
- Evaluating this form over $S_g$ in interval arithmetic therefore contains the true $(q, w)$ at every instant of the sub-interval.
- It is the same slab form that the admitted lookup uses for history reads.
- Intersecting with the record's whole-step boxes S and VS is valid, because both are proved enclosures of the same true state at the same instants.

**(c) The root-containment check is sound.** For each class, $F(s) = (t - s) - r(q, q'(s))$, with the receiver $(t, q)$ ranging over $\tau_i \times q_2$ and the source read from the frozen lookup at the point $s$.
- Requiring $F(\underline{S_0}) \ge 0$ and $F(\overline{S_0}) \le 0$ for all of these gives a root in $S_0$ for every instant, by the intermediate value theorem; $F$ is continuous because the history is.
- Uniqueness of the causal root is the frozen sub-wake property, which the frozen records certify.
- The contraction $S \leftarrow (t - r(q, q'(S))) \cap S$ keeps every such root.
- The 0.03 widening (v2) only enlarges the candidate interval before the same check. A request outside guaranteed history refuses in the lookup.

**(d) The law evaluation.** It is the frozen `contributions` law on the sub-interval boxes and the contracted source boxes, with the receiver acceleration taken from the law itself. It is the same evaluation as the whole-step one.

**Ruling on the construction:** each of (a) to (d) is VALID as a derivation. The C13 numbers are also consistent:
- every sub-interval hull lies inside the whole-step enclosure and meets it;
- at step 375 the sub hull is $[-0.010828, -0.0000188]$ inside the whole-step $[-0.011539, +0.000633]$.

## 2. Control chronology and provenance: the C12 and C13 sub-interval results are PROVISIONAL (measured from the records and the receipt)

**Controls before the target.** In frozen-only mode, v1 and v2 run only two controls before the target:
- P3: whole-step replay on frozen steps 360 to 370, which is same-chain consistency;
- P5: a wrong-origin refusal, which is structural; it refuses because $S_g$ falls outside $[0,\Delta]$.

P1, P2 and P4 are skipped without a reconstruction. So `sub_steps` had NO positive known-case control: no known truth was shown to lie in its sub-interval boxes, contracted roots or law values. The coordinator is right.

**Status by run.**
- C12 (v1 27863dfe…): the sub-interval route refused on every step, so it claims nothing. Its whole-step and end-instant parts are covered only by P3's replay.
- C13 (v2 d36a4a49…): PROVISIONAL for every sub-interval result, including "whole-step $\dot l<0$ on 371 to 375".

**Provenance gap (measured).**
- The C13 launches ran the generic file name `…-support-receval-iv.py`. Neither the receipt nor the JSON records a script hash at launch.
- The generic file has since been rewritten: it is now 23b4689e….
- That C13 ran d36a4a49 therefore rests on the grant and the retained -v2.py copy. It is inferred, not measured.

**What a requalifying rerun must show:**
- (i) the script sha256 written at launch in the receipt, and in the JSON;
- (ii) BEFORE any target, positive controls with a known receiver cubic and stationary sources, where the exact causal root is known:
  - every sub-interval state box contains the truth for every admissible origin;
  - every contracted source interval contains the exact root for every instant;
  - the sub-interval $\dot l$ enclosure contains the exact $\dot l$ over the whole sub-interval;
  - the union of the $\tau_i$ equals $[\underline{T_0}, \overline{T_0}+\Delta]$, with slab joins and history coverage checked;
- (iii) three negatives that must refuse or exclude the truth: a point origin, a dropped remainder ($A_P = 0$), and a start interval shrunk so that it misses the root;
- (iv) the reruns of 371 to 403 under new run-specific names, each sub hull meeting the whole-step and end enclosures. Steps 371 to 375 then requalify if they are again all negative.

## 3. Independent confirmation, and more: $\dot l < 0$ over EVERY whole step 371 to 380 from my frozen records (derived from measured enclosures)

**Lemma (derived).** Suppose $\dot l$ is Lipschitz on the true step $[t_0, t_0+\Delta]$, with $\ddot l \in [L, U]$ almost everywhere. Let $A \ge \dot l(t_0)$ and $B \ge \dot l(t_0+\Delta)$. Then for $s = t - t_0$:

$$\dot l(t) \le \min\big(A + U s,\ B + |L|(\Delta - s)\big) \le \frac{A|L| + BU + U|L|\Delta}{U + |L|}\quad (L<0<U).$$

The start-only form is $\dot l \le A + U\Delta$.

**Why $\dot l$ is Lipschitz.** $\dot l = -2wa - \dot a_r$ involves the receiver acceleration and the source accelerations through the delay derivative. Both are continuous. Only jerks, which enter $\ddot l$, may jump at seams, and my $\ddot l$ enclosure uses the hull of the stored rate bounds of every record met (turning-point adjudication 5, item 4).

**Inputs (measured, frozen).**
- $A$ for step $k$ is the larger of my two end enclosures' upper bounds at the end of step $k-1$. The true start of step $k$ is the true end of step $k-1$, and my end evaluation encloses $\dot l$ there for the guaranteed end time and the end box.
- $[L, U]$ is my refined whole-step hull for step $k$. It covers the step with its uncertain origin.
- $\Delta = 0.01$ exactly.

**Results.**

| step $k$ | $A$ (end of $k-1$) | $U$ | $A + U\Delta$ |
|---|---|---|---|
| 371 | $-0.00156809896$ | $0.0227345422$ | $-0.00134075$ |
| 372 | $-0.00144384909$ | $0.0233105824$ | $-0.00121074$ |
| 373 | $-0.00131021783$ | $0.0238556057$ | $-0.00107166$ |
| 374 | $-0.00116992747$ | $0.0244531689$ | $-0.00092540$ |
| 375 | $-0.00103475287$ | $0.0250728859$ | $-0.00078402$ |
| 376 | $-0.00088864133$ | $0.0256145420$ | $-0.00063250$ |
| 377 | $-0.00074252402$ | $0.0262818040$ | $-0.00047971$ |
| 378 | $-0.00058872108$ | $0.0269432251$ | $-0.00031929$ |
| 379 | $-0.00042922379$ | $0.0275100975$ | $-0.00015412$ |

**Step 380.** The start-only form gives $+0.0000099$ and fails. The two-sided form uses:
- $A = -0.000272117914$;
- $B = -0.000102635532$ (end of 380);
- $U = 0.0282055925$ and $|L| = 0.0123778369$.

The crossing is at $s^* \approx 0.00723 \in [0, \Delta]$. The bound is $(A|L| + BU + U|L|\Delta)/(U+|L|) = (-3.3682 - 2.8949 + 3.4912)\times10^{-6}/0.0405834 = -6.83\times10^{-5} < 0$.

**Step 381.** My end enclosure at 381 straddles zero (upper $+6.39\times10^{-5}$) and $A + U\Delta > 0$, so nothing is proved there.

**Ruling.** $\dot l < 0$ is PROVED (derived from my measured frozen enclosures) over every instant of steps 371 to 380. Together with the whole-step proofs to 370 (turning-point adjudication 12), continuous exclusion of a support turn now holds from step 275 to the step-380 end, $t \le 5.666684709182828044891357$. This confirms the support's step-375 sign independently: my bound on step 375 is $-0.000784$, against its sub hull's $-0.0000188$.

**Independence.** The proof shares the frozen subject records and the stored-rate premise with the support's route. It does not share code (my audit9 and ddl-refine against the support's receval), and its method differs: end values plus an $\ddot l$ bound, against direct sub-interval evaluation. Agreement is therefore a cross-code check on the same premises, not independent evidence of those premises.

**Falsifiers:** a step $k \in [371, 380]$ whose frozen end enclosure at $k-1$ or $k$, or whose $\ddot l$ hull, does not contain the true value; an arithmetic error in the table above (each row is one addition: $A + U \times 0.01$); a jump of $\dot l$ itself inside a step.

## 4. Consequence for the first-turn condition (ruling)

A first support turn needs a sign change of $\dot l$ within some whole step. Every step through 380 is now excluded.
- From step 381 on, the step ends are undecided (turning-point adjudication 12), so a turn there remains UNDECIDED, neither certified nor excluded.
- The undecided band after $t \approx 5.5667$ is re-decided to begin at the step-380 end, $t = 5.666684709182828044891357$.
- The support's requalified sub-interval reruns are no longer on the critical path for steps 371 to 380. They remain useful as a second method there, and as the only direct method beyond 380, where my ends are undecided.
