# Six-pole post-turn campaign, review: adjudication 4 (design of the continuation's correlated $l''$ instrument, ddl-jet v1)

Written 2026-10-21 by the review role. Code reading only; no Python run. Rules against my [post-turn reference](spherical-six-pole-post-turn-claude-review-reference.md) (`09e6130e…`), section 2.3.

**Subjects.**
- [ddl-jet](../evidence/spherical-six-pole-post-turn-claude-continuation-ddl-jet.py), sha256 `c0756833a6d8e3fe6fc3fedbea145fc456ba1ca725b53648db2995164c51f444`.
- [Design note](spherical-six-pole-post-turn-claude-continuation-ddl-design.md), sha256 `00d63f5495b66645b4821300d4964f571b0466c802ea2b496f0b28d3b325d17d`.

I read the law, primitive, mean-value, control and target code.

## 1. Against reference 2.3 (derived from the code)

**(a) Containment.** The instrument evaluates $l''(t)=F(x(t))$, where $x(t)$ collects 14 instantaneous primitives: receiver $q$ and $w$, and for each class the delayed source $q'$, $v'$, $a'$ and jerk $j'$. For every $t$ in a time sub-interval $T_s$, $x(t)$ lies in the boxes read over $T_s$:
- the receiver from its own record's sub-range;
- the sources over $s_c=T_s-\tau_c$, with $\tau_c$ the admitted cm471 root over $(T_s,Q)$;
- the jerk from the padded stored `ap` boxes of every record met. This is the stored-rate premise, named as such.

Then $l''(t)\in F(X)$, which is enclosed by $F(\hat x)+\sum_jG_j(X)(X_j-\hat x_j)$. Here $G_j$ is the interval gradient of $F$ over the whole box $X$, from forward-mode automatic differentiation over intervals, and the result is intersected with the natural extension. This is the mean-value theorem for a $C^1$ function on the box. $F$ is smooth wherever $P_c=r_cD_c>0$ and $1+B=D_t>0$; a division by an interval containing 0 cannot give a finite enclosure, so it fails safe.

The receiver time box $T_s$ carries the origin uncertainty, so no origin column is needed: nothing is correlated across the origin. The primitives are treated as INDEPENDENT boxes (stated loss), so the enclosure is outer. **Met.**

**(b) Law.** $l''=-2a_0^2-2wa_1-2r_2$, built from order-2 jets:
- The receiver jet is $q+w\theta+\tfrac12a\theta^2$, with $a$ from the law.
- The source jets are composed with $\sigma=\theta-(\tau(t)-\tau_0)$.
- The delay jets satisfy $\tau_k=T_k/(1+B)$ with $B=r_{q'}v'$. This is derived: the order-$k$ coefficient of $\sqrt{r^2}$ depends on $\tau_k$ only through $r_{q'}v'\sigma_k$ with $\sigma_k=-\tau_k$. I checked it by hand for $k=1$, where it reduces to the frozen $\dot\tau=(r_qw+r_{q'}v')/(1+r_{q'}v')$, and for $k=2$, where $\tau_2$ enters the composite source coordinate only through $v'\sigma_2$. A third pass records the residual.
- $P=\tau-kv'M$, the radial term is $\sigma_c/(2P)$, and multiplicities and $g$ are included.

**Met.**

**(c) Known cases.** C1 is a constructed cubic history. Its reference delay roots come from `findroot` on the INDEPENDENT direct-vector chord, and its second derivatives from `mp.diff` at 40 digits. The jet must contain $a'$, $r''$, $l''$ and $\tau''$ to $10^{-12}$ for all three classes. C2 runs the same history on a box of half-width $10^{-3}$: it must contain the reference at 9 points, and it reports the mean-value and natural widths, which is the measured gain. Two cases from my list are missing:
- an exact source-at-rest closed form, which C1's independent reference subsumes;
- a turning history with $w<0$, which is not needed while the instrument is used only on the $w>0$ band 531–557.

**Met for the Q2 band.** Use with $w\le0$ would need a C1 variant with $w$ crossing zero first.

**(d) Negatives.** C3 covers jerk set to zero, the class sign $k$ flipped, and $\ddot s$ dropped; each must exclude the C1 reference. A dropped $-2a^2$ is not among them. C1's $10^{-12}$ tolerance would catch any formula slip of that size, so I accept the three. **Met.**

**(e) Independence.** ddl-jet runs on the subject's frozen cm471 reader and roots and is written by the continuation. Its $l''$ signs are therefore the SUBJECT's evaluation: cross-code consistency with my ddl10, not independent evidence. Every ddl-jet hull must INTERSECT my ddl10 hull on the same step. A disjoint pair falsifies one of the two.

**(f) Coverage.** The sub-intervals are $T_i=[t_l+i\Delta/K,\;t_h-(K-1-i)\Delta/K]$. The first lower edge is $t_l$, the last upper edge is $t_h$, and consecutive sub-intervals overlap by the origin width $\varepsilon\approx1.2\times10^{-7}$. For a true origin $t_0\in[t_l,t_l+\varepsilon]$ and $\theta\in[i\Delta/K,(i+1)\Delta/K]$, $t_0+\theta\in T_i$. So every true instant of the step lies in some $T_i$ (derived). The two edges are computed separately with rounding, but the overlap $\varepsilon$ exceeds any rounding by about 20 orders of magnitude. **Met.**

**(g) Sign rule.** A step is "negative" only if every sub-interval's upper bound is $<0$. A refusal, or a step whose `derivative_seam_inside_step` flag is set, makes the step "refused". **Met.**

**Validity guards.**
- Reads past guaranteed coverage refuse.
- Rate-jump records refuse in the jerk reader.
- The source speed must be sub-wake.
- The roots come from the admitted cm471 ladder.
- C5 checks the first two refusals.

## 2. Ruling

**ddl-jet v1 DESIGN ADMITTED** for whole-step signs of $l''$ on the $w>0$ band (Q2), on these conditions:
1. a controls record J1 in which every inherited cm471 control and C1–C5 pass before any target;
2. each target row reports the per-sub-interval hulls, widths and budgets;
3. I compare its hulls with my ddl10 hulls on shared steps, for consistency only.

A whole-step $l''<0$ from ddl-jet on steps $540$–$557$, together with the refined end signs, would make the second support turn unique and strict. That certificate would be graded "derived from measured enclosures, the $l''$ sign by the subject's instrument (cross-code)".

**Falsifiers.**
- A J1 record with any failure.
- A ddl-jet hull disjoint from my ddl10 hull on the same step.
- A C1 tolerance that is met only after loosening it.
