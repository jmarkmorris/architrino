# Six-pole post-turn campaign, continuation role: design of a correlated whole-step $l''$ evaluation (Q2) and the like-ladder statement (Q3)

*Written 2026-10-21 from 02:30 UTC (clock-read) under the [post-turn plan](spherical-six-pole-post-turn-plan.md) (sha256 `b03917315cde3e9c04c4aefbdb9780b3a52029110da9961ce25a51e70c43be0a`). Design only: no Python has run. The instrument file and its controls follow under the prefix `spherical-six-pole-post-turn-claude-continuation-*`.*

## 1. Why the current $l''$ hulls are wide (inferred from measured records)

$l''=-2a^2-2wa'-r''$, where $a$ is the tangent acceleration, $a'$ its rate, and $r$ the canonical radial acceleration. On the band the terms nearly cancel: at step 530 the review's $K=4$ hull is $[-0.1306,+0.0629]$, centre about $-0.034$ (path-continuation adjudication 12). A hull of about 0.19 cannot prove a sign whose size is about 0.03. Its sign would need a total width below about 0.06.

Three sources of width can be read from the P2 record at step 540 (measured from the stored strings):

- **The rate premise.** The stored whole-step rate box is `ap` $=[-0.3884,-0.1941]$, width about 0.19. Its use for $a'$ gives $-2wa'$ a width of $2w\times0.19$, about 0.025 at $w=0.065$. The same kind of box enters $r''$ as the source jerk.
- **The acceleration from state boxes.** The start acceleration box at 540 is `a0` $=[-0.3674,-0.3324]$, width 0.035, from a $q$ width of about 0.006. $-2a^2$ alone then carries width about $4|a|\cdot0.035\approx0.05$.
- **Dependency.** The natural interval extension of $r''=\sum$ of $\sigma(2P'^2-PP'')/(2P^3)$ terms repeats each variable many times, and $a$, $a'$ and $r''$ are evaluated as independent boxes although they are functions of the SAME primitive state.

## 2. Design: Taylor jets in time with a first-order mean-value form over the primitive state (derived construction)

**Primitive variables at one receiver time box.** These are the receiver $q$ and $w$, and per class $c$ the delayed source values $q'_c$, $v'_c$, $a'_c$ and $j'_c$ (source jerk): 14 variables. Each is read as a box from the certified records:

- $q$ and $w$ from the receiver's own record over the sub-interval (sub-range reader);
- $q'_c$, $v'_c$ and $a'_c$ from the sub-range reader over the delayed time box $s_c=t-\tau_c$, with $\tau_c$ the v4.7 root enclosure over the (time, $q$) box;
- $j'_c$ from the stored rate box `ap` of every record met by $s_c$ (the stored-rate premise, as the admitted instruments use it).

**Jets.** Every function of time is carried as an order-2 Taylor jet $f_0+f_1\theta+f_2\theta^2$ about the sub-interval point, with $f''=2f_2$. Jet arithmetic is exact for $+,-,\times,/$, $\sin$, $\cos$ and $\sqrt{\ }$ (standard recurrences). Every coefficient is a "gradient number": an interval value together with interval partial derivatives with respect to the 14 primitives (forward-mode automatic differentiation over intervals).

**Construction at one point (all derived from the fixed law).**

1. Tangent acceleration: $a=g\sum_c m_c\,N_c/(r_c^2P_c)$ at order 0, with $P_c=r_c-k_cv'_cM_c$ (so that $r_cD_c=P_c$), the frozen class geometry, and $\tau_c=r_c$.
2. Receiver jet: $q(t)=q+w\theta+\tfrac12a\theta^2$.
3. Delay jets: $\tau_c(t)$ solves $\tau=r_c(q(t),q'_c(t-\tau))$ order by order. The source jets are $q'_c(\sigma)=q'_c+v'_c\sigma+\tfrac12a'_c\sigma^2$ and $v'_c(\sigma)=v'_c+a'_c\sigma+\tfrac12j'_c\sigma^2$, composed with $\sigma=\theta-(\tau_c(t)-\tau_{c,0})$. Three fixed-point passes give exact order-2 coefficients (each pass fixes one order). The derived check is $\tau_1=(r_qw+r_{q'}v')/(1+r_{q'}v')$, the frozen `taudot`.
4. Then $a(t)$ and $r(t)=g\sum_cm_c\sigma_c/(2P_c(t))$ are formed as jets.
5. Finally $l''=-2a_0^2-2w\,a_1-2r_2$, using $a'=a_1$ and $r''=2r_2$.

**Enclosure.** The mean-value form is $l''(X)\subseteq l''(\hat x)+\sum_j G_j(X)\,(X_j-\hat x_j)$, where $G_j(X)$ is the interval gradient over the whole box and $\hat x$ is the midpoint. Each value is reported with its per-variable budget $|G_j|\,\mathrm{wid}(X_j)$. Because $a$, $a'$ and $r''$ come from the same primitives, their correlated dependence on $q$, $w$ and each source state cancels inside $G_j$ (derived); this is the "correlated evaluation".

**Subdivision.** The step is split into $K$ time sub-intervals. Each sub-interval reads its own sub-range boxes. The whole-step sign needs every sub-interval upper bound below 0.

**What is NOT correlated (stated loss).** The receiver state and the delayed source states are independent boxes, although they are one trajectory. The source jerk is the stored-rate premise box. If the budget shows $j'$ or the source-state widths dominate, the next refinement is a law-derived source jerk (the same jet evaluated at the source time with second-generation reads). That refinement is not in version 1.

**Validity conditions.** These are carried from the admitted instruments:

- Sub-wake motion, $\sup|w|<1$.
- Every read lies inside guaranteed coverage.
- No first-reading seam inside a read range (the record flag `rate_jump_records_read_over_step` must be empty; otherwise refuse).
- $P_c>0$ proved.
- Roots from tau_point46 (cm471).

## 3. Controls (before any target; separate record)

- **C1, known (independent reference).** A constructed analytic history: receiver $q(t)$ and source paths $q'_c(s)$ given as cubic polynomials, with chosen coefficients. The reference $l''$ is computed independently: the delay roots by `mp.findroot` on the direct-vector chord (the frozen (0b) embedding, not `geom`), $a(t)$ and $r(t)$ from direct vectors, and the second derivatives by `mp.diff` at 40 digits. The jet enclosure, evaluated on point primitives from the same polynomials, must contain the reference $a'$, $r''$, $l''$ and $\tau''$ to $10^{-12}$ for all three classes.
- **C2, known correlated case.** The same constructed history on a box of half-width $10^{-3}$ in $q$ and $q'_c$. The mean-value enclosure must contain the reference at 9 sample points of the box, and must be narrower than the natural interval extension of the same formulas. Both widths are reported (measured gain).
- **C3, negatives.** Each of the following must EXCLUDE the C1 reference:
  - the jet with the source jerk set to 0;
  - the jet with the class sign $k$ flipped;
  - the jet with the $\ddot s=-\tau''$ term dropped.
- **C4, frozen agreement (consistency).** At the step-540 end state, the jet's order-0 and order-1 coefficients must intersect the frozen tangent sum, the frozen `dhit_dt`-based rate, the frozen radial sum and `drad_dt`, evaluated on the same boxes.
- **C5, refusals.** A read range containing a first-reading record refuses. A read past guaranteed coverage refuses.

## 4. Cost (inferred from the measured cm471 timings)

- **Setup.** cm471 setup and records through 570 take about 45 s at the current load: about 30 s of frozen setup and controls, plus about 15 s to append r1–r5 and P1–P3.
- **Per sub-interval.** Four sub-range reads, three root enclosures, and jets with 15-entry gradients take about 0.2–0.3 s.
- **Per whole step.** At $K=4$ a step takes about 1–1.2 s.
- **Total.** The band 531–557 (27 steps) needs two target invocations of about 13–14 steps each, about 75 s each, plus one controls invocation of about 50 s. A $K=8$ follow-up on any undecided step costs about 2.5 s per step.

## 5. Odds (guessed) and decision rule

A gain of 3× in width over the review's hulls is needed. The cancellation inside $G_j$ and the removal of the stored $a'$ premise are expected to give part of it (guessed: 1.5–4×). The first target run reports the per-variable budget at steps 531, 545 and 556 before the whole band is run. If $\sum_jG_j\,\mathrm{wid}(X_j)$ stays above about 0.06, I will report the dominant variable and propose the second-generation source jerk, or a correlated source state, as the next step.

## 6. Q3 statement from cm471's code (measured by reading cm471 `05abecc0…` PART1)

`_ladder46(enc, t0, Q0, c, half_up, kmax)` runs `for k in range(0, kmax + 1)` with `kmax = KMAX46 = 12`. Each rung sets `half = LOWER9[c] + k*0.15` and `a_ = lo(guess) - half`. For the like class, `LOWER9[-1] = 0.90`, so $a_k=\underline{\mathrm{chord}_L}-0.90-0.15k$. A rung is skipped when $\sup h(a_k)<0$ is not proved. The ladder REFUSES at the first rung with $a_k\le\max(0,\overline{t_0}-t_G)$, the "minimum admissible delay" message.

**History bound.** With $\mathrm{chord}_L\approx1.83$ near $q\approx1.81$, the rungs are:

| rung | lower end |
| --- | --- |
| 3 | 0.48 |
| 4 | 0.33 |
| 5 | 0.18 |
| 6 | 0.03 |

So no more than about 6 rungs are usable; rung 7 would fall below 0.

**The rung-3 transition.** At step 570, P3 shows the like root on rung 2 with lower margin 0.0307 (measured). The margin fell about 0.0015 per step on 560–570, so rung 3 should engage near steps 585–595 (inferred). When it does, the record shows `k_max` 3 in `v46_bracket` with lower end $\underline{\mathrm{chord}}-1.35$. The upper end stays $\overline{\mathrm{chord}_L}+0.90$, because $2.05-\mathrm{chord}_L<0.90$.

**Rising root.** After the turn the receiver moves back, so the like root may stop falling and rise. The ladder is stateless: it always tries the frozen bracket first, then rungs from 0. A rising root therefore returns to lower rungs automatically. Path-continuation adjudication 4 checked this against its rising-root requirement.

**Chart.** cm471 takes its chart from v4.4: `BOX` with $q'\in[0,1.80]$ and $w'\in[-0.10,0.45]$, checked per step by the frozen check and `accel_parts`. A slice beyond $q'=1.80$ needs a NEW instrument version that adopts the support's admitted chart extension, with its own controls. cm471 itself must not be edited.

**Slice plan (after the chart extension is admitted).** Run 20-step slices P4, P5, … from P3's step-570 strings, each with its own grant and run-specific names. Stop and report at once on a refusal, an event, or a chart edge.
