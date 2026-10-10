# Do the pairs of a six-member run stay bound over a recorded window? External-acceleration integrals for one run

**Status: preregistration frozen 2026-10-09T21:51:41Z before any target evaluation; target evaluated immediately afterwards; a post hoc decomposition was added the same day; analysis by one session. Codex's interim review of 2026-10-09 reproduced the sampled-state tables with a separately authored diagnostic and accepted the leading-term algebra with qualifications, which are incorporated below. Codex then executed two dense continuations under the operator's authorization. They failed the convergence test fixed before launch, so these checks establish no converged window-integral result, and persistence over the window is unproved. The inquiry is complete at those boundaries.** This document carries out inquiry P-W-3 of the [follow-up inquiries](../../brainstorming.md#weber-follow-ups-from-the-2026-10-09-review--selected-by-the-operator-carried-out-one-at-a-time) at the operator's direction. It concerns the frozen instantaneous Section 9 comparison law only. It selects no equation, runs no search and draws no conclusion about the delayed law. The [canonical Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) remains the baseline.

## 1. Preregistration

Frozen at 2026-10-09T21:51:41Z, after the instrument's known cases passed at 2026-10-09T21:51:16Z and before the target mode was run for the first time.

- **Law.** Section 9 of the [equation-variants manuscript](../../equation-variants/manuscript.md#9-weber-inspired-relative-motion-response) with the frozen benchmark values: coefficients $-1/2$ and $1$, $K=c_f=1$, unit weights, distinct present-time partners, no self term. Unchanged.
- **Run.** The round-five survivor `survivor-free-R3-i8` of the [binding-sphere investigation](weber-binding-sphere-investigation.md), Section R5.1, chosen because Codex named it when pointing out that its trajectory is retained, and because the tracked receipts give the same classification of bound pairs at the end at both tolerances. (Wording corrected after the freeze: an earlier version said "the same end state", which is wrong, since the end states themselves differ. The selection is unchanged.) Both retained trajectories are used: relative tolerance $10^{-12}$ as primary and $10^{-10}$ as comparison. They are under `.local-data/master-equation-closure/weber-binding-sphere/r5-fate/` and are read, not modified.
- **Pairs.** $(1,2)$ and $(0,3)$, the two pairs listed as bound at the end in the tracked receipts `weber-binding-sphere-r5-fate-rtol1e-12.json` and `weber-binding-sphere-r5-fate-rtol1e-10.json`. No other pair is evaluated.
- **Window.** The second half of the run: every recorded state with $T\ge398.07716345781955$, to the final time $796.1543269156391$.
- **Quantities.** For each pair at each recorded state, with the law solved at that state: the energy-like quantity $\varepsilon$ and the angular quantity $h$ of the corrections addendum; the external differential acceleration $\mathbf f_{\mathrm{ext}}$; the rates $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$ and $\mathbf r\times\mathbf f_{\mathrm{ext}}$; the pair separation and the distance from either member to the nearest other member.
- **Four statements, kept apart.** (a) Sampled-state persistence: $\varepsilon<0$ and $h>0$ at every recorded state of the window. (b) Signed change: $\varepsilon$ and $h$ at the last state minus the first, which needs no quadrature. (c) Quadrature consistency and the sufficient bound: the trapezoid sum of $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$ over the recorded states compared with (b), and the trapezoid sums of $\lvert\mathbf w\cdot\mathbf f_{\mathrm{ext}}\rvert$ and $\lVert\mathbf r\times\mathbf f_{\mathrm{ext}}\rVert$ compared with the starting margins $-\varepsilon$ and $h$. (d) A certificate between recorded states and any statement about later times: not attempted from these data.
- **Admissibility rule for (c).** The trapezoid sums are treated as estimates of the integrals only if no recorded step in the window is longer than one eighth of the pair's local angular period $2\pi r^2/h$. If the rule fails, (c) is reported as not established from the retained data, and a rerun with denser output is specified for Codex to execute; a failed or inadmissible sufficient bound is not a failed pair.
- **Not to be done.** No other run, pair or window is chosen after seeing results. No new evolution is made in target mode.

## 2. Instrument and known cases

[weber-pair-external-diagnostic.mjs](../evidence/weber-pair-external-diagnostic.mjs) was written for this inquiry. Its law solver is its own and imports no other instrument. Known cases, all passed at 2026-10-09T21:51:16Z before the freeze above:

| Known case | Result |
| --- | --- |
| K1. Isolated pair, 200 random states: $\mathbf f_{\mathrm{ext}}=\mathbf 0$, and the solved radial acceleration equals the closed form $D\ddot r=h^2/r^3-2/r^2+\dot r^2/r^2$ | Largest $\lVert\mathbf f_{\mathrm{ext}}\rVert$ $1.3\times10^{-14}$; largest relative radial difference $4.9\times10^{-16}$ |
| K2. Three members, 12 random states: the rates of $\varepsilon$ and $\mathbf h$ measured by central differences along the instrument's own Runge–Kutta flow, against $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$ and $\mathbf r\times\mathbf f_{\mathrm{ext}}$ | Largest relative differences $7.6\times10^{-6}$ and $2.9\times10^{-6}$, consistent with the differencing error |
| K3. The recorded initial state of the run, which lies outside the window: this solver against the independently authored reference law and against the subject instrument | Largest absolute differences $5.6\times10^{-17}$ and $6.9\times10^{-17}$, at accelerations up to $0.12$ |
| K4. Isolated pair evolved by the instrument's own integrator to $T=4$: $\varepsilon$ and $h$ unchanged and the quadrature of $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$ zero | Changes $-1.4\times10^{-10}$ and $-3.0\times10^{-11}$; quadrature $-3.7\times10^{-16}$ |

K2 tests the identity of the corrections addendum by a route that does not use its algebra: it differentiates the pair quantities numerically along an evolved three-member history.

**Independent reproduction.** Codex wrote a separate diagnostic, [codex-weber-pair-external-review.mjs](../evidence/codex-weber-pair-external-review.mjs), which assembles the independently authored reference law and differentiates the energy-like quantity separately. Its analytical controls on isolated circles of radius $0.25$, $1$ and $3$ passed before its target evaluation, with largest acceleration error $4.4\times10^{-16}$. On both pairs and both retained trajectories it reproduces the sampled-state quantities and trapezoid sums of Section 3 to rounding, with largest identity residual $4.1\times10^{-14}$ as Codex reports ([receipt](../evidence/codex-weber-pair-external-review-receipt.json)). This verifies the algebra and the sampled-state diagnostics. It does not verify the accuracy of the original evolution, and it is not a certificate between recorded states.

## 3. Target results

Evaluated once, immediately after the freeze, by the instrument's `target` mode; the full output is in [the receipt](../evidence/weber-pair-external-diagnostic-receipt.json). Lengths are in units of $K/c_f^2$ and times in $K/c_f^3$. The run's sphere radius is $3$ and its hexagon period is $39.8077$, so the window covers the last ten of twenty periods. The two tolerances are two different histories by the time the window opens: they agree on the first event at $T\approx44.87$ and have separated since, so each column below describes its own trajectory.

| Quantity | Pair $(1,2)$, tolerance $10^{-12}$ | Pair $(0,3)$, tolerance $10^{-12}$ | Pair $(1,2)$, tolerance $10^{-10}$ | Pair $(0,3)$, tolerance $10^{-10}$ |
| --- | --- | --- | --- | --- |
| Recorded states in the window | 1265 | 1265 | 1012 | 1012 |
| $\varepsilon$ at the first and last state | $-1.0263$, $-1.3235$ | $-0.7156$, $-0.4189$ | $-0.9141$, $-1.0653$ | $-0.8203$, $-0.6771$ |
| Largest $\varepsilon$ at any recorded state | $-0.9015$ | $-0.3696$ | $-0.8612$ | $-0.6029$ |
| Smallest $h$ at any recorded state | $1.0990$ | $1.0936$ | $1.2698$ | $0.8823$ |
| (a) $\varepsilon<0$ and $h>0$ at every recorded state | Yes | Yes | Yes | Yes |
| (b) Signed change of $\varepsilon$ over the window | $-0.2972$ | $+0.2968$ | $-0.1512$ | $+0.1432$ |
| (b) Signed change of $h$ | $-0.1113$ | $+0.1194$ | $-0.0915$ | $+0.0808$ |
| (c) Trapezoid sum of $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$, and its difference from (b) | $-0.3203$; $-0.0232$ | $+0.2920$; $-0.0048$ | $-0.1551$; $-0.0039$ | $+0.1469$; $+0.0037$ |
| (c) Trapezoid sum of $\lvert\mathbf w\cdot\mathbf f_{\mathrm{ext}}\rvert$ against the margin $-\varepsilon$ at the start | $3.97$ against $1.03$ | $4.61$ against $0.72$ | $5.91$ against $0.91$ | $3.42$ against $0.82$ |
| (c) Trapezoid sum of $\lVert\mathbf r\times\mathbf f_{\mathrm{ext}}\rVert$ against the margin $h$ at the start | $2.71$ against $1.23$ | $14.40$ against $1.15$ | $4.24$ against $1.41$ | $7.97$ against $0.92$ |
| Longest recorded step as a fraction of the local angular period; median | $0.197$; $0.083$ | $0.197$; $0.017$ | $0.261$; $0.092$ | $0.268$; $0.037$ |
| Admissibility rule for (c), one eighth | Fails | Fails | Fails | Fails |
| Pair separation, smallest and largest | $0.446$, $1.619$ | $0.368$, $4.683$ | $0.651$, $1.403$ | $0.235$, $2.934$ |
| Distance to the nearest other member, smallest | $129.6$ | $129.6$ | $128.6$ | $128.6$ |
| Largest $\lVert\mathbf f_{\mathrm{ext}}\rVert$ | $0.278$ | $0.159$ | $0.697$ | $0.058$ |

Reading, statement by statement.

**(a) Sampled-state persistence holds.** Both pairs pass the instantaneous isolated-pair diagnostic at every recorded state of the window, on both trajectories. Grade: measured, at 1265 and 1012 recorded states. It says nothing between states.

**(b) The pair quantities change substantially, in opposite senses.** On the primary trajectory $\varepsilon$ of pair $(1,2)$ falls by $0.297$ and $\varepsilon$ of pair $(0,3)$ rises by $0.297$; the two changes cancel to within $0.0004$. For pair $(0,3)$ that is $41\%$ of its starting margin. The comparison trajectory shows the same pattern at about half the size, cancelling to within $0.008$. Grade: measured, from the first and last recorded states, with no quadrature.

**(c) The sufficient bound is not established, and by the frozen rule it could not be from these data.** The recorded steps are up to a fifth or a quarter of an angular period, longer than the one eighth fixed in advance, so the trapezoid sums are not admissible as estimates of the integrals. As recorded, the sums of absolute values exceed the starting margins by factors between two and twelve, and the signed sum reproduces (b) to within $2\%$ to $8\%$; both observations are reported and neither is relied on. A sufficient bound that is not established is not a pair that failed: (a) shows no failure.

**(d) Between recorded states, and after the window: nothing is established.** The dense continuations of Section 6 did not converge and do not change this.

## 4. Why a separation of 130 does not isolate the pairs

The size of $\mathbf f_{\mathrm{ext}}$ is the unexpected result. A member $130$ away contributes a static inverse-square acceleration of order $6\times10^{-5}$, and the difference across a pair of size one is smaller again. The measured external differential acceleration reaches $0.28$ and $0.70$.

The cause is the acceleration term of the law. The contribution of member $k$ to the acceleration of member $i$ contains $(\sigma_{ik}K/c_f^2)\,(1/d_{ik})\,\big[\mathbf e_{ik}\cdot(\mathbf A_i-\mathbf A_k)\big]\mathbf e_{ik}$, which falls off as the first power of the distance and is proportional to accelerations. Take a pair $(i,j)$ of opposite polarity and a second such pair $(k,l)$ at a distance $d$ large compared with both pair sizes, with $\mathbf e$ the unit vector from the second pair to the first. Subtracting the contributions to $j$ from those to $i$ and using $q_j=-q_i$, each source $k$ gives $q_iq_k(1/d)\,\mathbf e\,\big[\mathbf e\cdot(\mathbf A_i+\mathbf A_j)-2\,\mathbf e\cdot\mathbf A_k\big]$ in units $K=c_f=1$. Summed over the second pair, whose polarities cancel, the term in $\mathbf A_i+\mathbf A_j$ drops out, leaving

$$
\mathbf f_{\mathrm{ext}}\simeq-\frac{2q_i}{d}\,\mathbf e\,\Big[\mathbf e\cdot\big(q_k\mathbf A_k+q_l\mathbf A_l\big)\Big].
$$

The display is the contribution of the other opposite-polarity pair. When further members are present, the full external differential acceleration is this contribution plus theirs, which is computed separately. Since $q_l=-q_k$, the bracket is the internal relative acceleration of the other pair projected on the line joining the pairs. Each pair therefore feels a differential acceleration equal to twice the other pair's internal acceleration along that line, divided by the distance between them. At a pericentre the internal acceleration of a pair is of order ten to sixty in these units, which at $d\approx130$ to $150$ gives the measured values. Grade of the displayed form: derived as the leading term for states with bounded relative velocities and accelerations. The neglected terms are absolute, not relative. With $\ell$ the larger pair size, $v$ a bound on the relative speeds and $a$ a bound on the acceleration magnitudes, they are the static and velocity terms, of order $(1+v^2)/d^2$ for each source, and finite-size corrections of order $\ell a/d^2$. A relative error measured against the leading term has no meaning where the projection of the other pair's acceleration on the joining line vanishes.

A post hoc decomposition, made after the target results to test this explanation and not part of the preregistration, splits $\mathbf f_{\mathrm{ext}}$ by source member at every recorded state of the window; its root mean squares are taken over the recorded states, unweighted by step length, and its numbers are descriptive (the instrument's `decompose` mode):

| Trajectory and pair | Root-mean-square $\lVert\mathbf f_{\mathrm{ext}}\rVert$ | Part from the other bound pair | Its acceleration-coupling part | Part from the two unpaired members | Difference from the leading form |
| --- | --- | --- | --- | --- | --- |
| $10^{-12}$, pair $(1,2)$ | $0.04202$ | $0.04207$ | $0.04207$ | $0.00015$ | $0.00014$ |
| $10^{-12}$, pair $(0,3)$ | $0.03897$ | $0.03902$ | $0.03902$ | $0.00034$ | $0.00034$ |
| $10^{-10}$, pair $(1,2)$ | $0.1098$ | $0.1099$ | $0.1099$ | $0.00032$ | $0.00030$ |
| $10^{-10}$, pair $(0,3)$ | $0.01992$ | $0.01992$ | $0.01992$ | $0.00089$ | $0.00089$ |

At the state of largest $\lVert\mathbf f_{\mathrm{ext}}\rVert$ on the primary trajectory ($T=399.6$, distance between pair centres $130.5$), the other pair's internal relative acceleration is $20.3$, the leading form gives $0.2781$ and the full value is $0.2779$. Over the recorded states the difference between the full external differential acceleration and the leading form is $0.3\%$ to $4\%$ of the external term in unweighted root mean square. In these samples the difference is dominated by the two unpaired members. It is not exactly their contribution, because finite-separation and velocity terms from the other pair also remain. Grade: measured at the recorded states of this run, pairs and window; descriptive.

## 5. What this establishes and what it does not

- **Established for this run.** Over the last ten periods, two pairs that pass the bound-pair diagnostic at every recorded state, and that at the recorded states are never closer than $128$ to any other member, exchange up to $0.30$ of the energy-like pair quantity, $41\%$ of one pair's margin. At the recorded states their pair quantities are not approximately constant, so they are not isolated pairs in that sense. Measured.
- **Established in general, at leading order.** Under the instantaneous Section 9 law the internal motions of two separated opposite-polarity pairs are coupled by a term that falls off as the first power of their distance and is proportional to their internal accelerations. Derived for states with bounded velocities and accelerations, with the descriptive agreement above on one run.
- **Not established.** That either pair unbinds, or that it stays bound, between recorded states or at any later time. That the exchange grows, saturates or reverses. Anything about runs, pairs or windows other than those frozen in Section 1. Anything about the delayed law.
- **A possible obstruction for the route of the corrections addendum, conditional.** The sufficient bound of that addendum compares the time integral of $\lvert\mathbf w\cdot\mathbf f_{\mathrm{ext}}\rvert$ with a pair's margin. If the coupling does not decay, meaning that the other pair's projected internal acceleration and the relative velocity keep their size, and if the distance grows comparably with the elapsed time, that integral need not converge. Neither condition is established here as a global property: the behaviour in time of the projected acceleration and of the relative velocity matters, and growth of the distance at most linear in time was not shown. This is a possible obstruction to the absolute-integral route. It is not a finding about long-time persistence, and whether the signed exchange stays bounded was not examined.

Falsifiers. Of the measured exchange: a re-evaluation of the same recorded states that gives a signed change of $\varepsilon$ different from the table. Of the leading term: a state of two well-separated opposite-polarity pairs, with bounded velocities and accelerations and no other members, on which $\mathbf f_{\mathrm{ext}}$ differs from the displayed expression by more than a fixed multiple of the absolute scale $(1+v^2+\ell a)/d^2$. Of the reading "not isolated": a demonstration that the recorded changes of $\varepsilon$ come from integration error. The two tolerances showing the same pattern, the cancellation between the two pairs, and the agreement of the signed trapezoid sum with the state difference all speak against that. The dense continuations of Section 6 were meant to test it directly; they did not converge, so they neither support nor refute it.

## 6. Dense continuations: executed, not converged

**Design.** The retained trajectories were written at the integrator's accepted steps, which are too coarse for statement (c). The instrument's `rerun` mode continues the six members from the first recorded state of the window on the primary trajectory to the final time with the instrument's own fixed-step Runge–Kutta integrator, and carries the three integrals as additional state variables, so they have the integrator's accuracy and need no output sampling. It is a continuation of one recorded state under the unchanged law, at two step sizes, $0.002$ and $0.001$. Known case K5, the same code path on three members, had passed.

**Execution.** The author prepared the mode and did not run it. Codex ran both continuations on 2026-10-09 under the operator's authorization, through the owned-compute supervisor, after adding only a progress report to the loop and rerunning K5. They completed in $9.5$ and $19.2$ seconds (run identifiers `04801a6b-5dc3-4a65-beed-89606c444297` and `226da8bf-fd32-40c5-9093-91c8776bcb96`). Results are in [the receipt](../evidence/weber-pair-external-diagnostic-receipt.json) under `rerun`, and Codex's comparison is under `denseConvergence`.

**Acceptance test, fixed by Codex before launch.** The two step sizes must agree to $10^{-3}$ relative, on a scale of at least one, in every end-state component and every carried integral, and each signed integral must match the change of $\varepsilon$ to $10^{-6}$.

| Quantity | Pair $(1,2)$, step $0.002$ | Pair $(1,2)$, step $0.001$ | Pair $(0,3)$, step $0.002$ | Pair $(0,3)$, step $0.001$ |
| --- | --- | --- | --- | --- |
| Carried integral of $\mathbf w\cdot\mathbf f_{\mathrm{ext}}$ | $-0.29719$ | $-0.18627$ | $+0.30006$ | $+0.18885$ |
| Its difference from the change of $\varepsilon$ in the same run | $1.3\times10^{-9}$ | $3.0\times10^{-11}$ | $3.6\times10^{-9}$ | $1.6\times10^{-10}$ |
| Carried integral of $\lvert\mathbf w\cdot\mathbf f_{\mathrm{ext}}\rvert$ | $3.208$ | $3.920$ | $4.451$ | $4.502$ |
| Carried integral of $\lVert\mathbf r\times\mathbf f_{\mathrm{ext}}\rVert$ | $2.044$ | $2.450$ | $17.37$ | $12.85$ |
| Largest and smallest $\varepsilon$ at any step | $-0.966$, $-1.433$ | $-0.966$, $-1.348$ | $-0.321$, $-0.749$ | $-0.391$, $-0.749$ |
| Smallest $h$ at any step | $1.102$ | $1.115$ | $1.093$ | $1.093$ |
| Pair separation, smallest and largest | $0.457$, $1.477$ | $0.457$, $1.477$ | $0.380$, $5.504$ | $0.380$, $4.433$ |

The continued end state differs from the recorded end state by up to $3.28$ in a position component and $1.00$ in a velocity component at step $0.002$, and by $1.58$ and $0.56$ at step $0.001$.

**Verdict: the test failed.** The two step sizes disagree on the carried integrals by scaled amounts between $0.011$ and $0.26$, against the allowed $0.001$. The signed integrals are $-0.297$ against $-0.186$ and $+0.300$ against $+0.189$. The receipt as designed does not hold the end states, so the componentwise end-state comparison was not evaluated; the integral criterion alone refuses the result. No further run was made under this preregistration.

**What the continuations do and do not show.**

- Within each run the carried signed integral equals that run's change of $\varepsilon$ to a few parts in $10^{9}$. That checks the instrument's bookkeeping of the identity. It does not validate the evolution, because two evolutions that satisfy the identity equally well give different answers.
- Both continuations pass the bound-pair diagnostic at every integration step, with $\varepsilon<0$ and $h>1.09$. They are two numerical continuations that disagree with each other, so this is not a converged statement about the window and not a certificate.
- The step-$0.002$ values happen to lie close to the changes measured on the recorded primary trajectory, $-0.297$ and $+0.297$, while the step-$0.001$ values do not. No conclusion is drawn from this: two step sizes cannot decide which, if either, is close to the solution.
- The disagreement is not evidence of chaos and not evidence of a physical instability. It shows that this integrator at these two step sizes has not converged on this window.

**A limitation of the prepared launch.** The author specified two fixed step sizes and no convergence ladder, no shared-time checkpoints and no end states in the receipt. Those omissions are why the outcome is "not converged" without a diagnosis of where the two continuations part.

**Remaining scientific burden, not undertaken here.** A converged statement about this window needs a revised numerical plan fixed in advance: output at shared times so that the divergence can be located, end states retained, a ladder of step sizes or a higher-order adaptive integrator with a tolerance ladder, or a certified argument over a short window in place of a long-window integral. Until then statements (c) and (d) of Section 1 stand as not established.

## 7. Claims, grades and boundaries

| Claim | Grade | Instrument and boundary |
| --- | --- | --- |
| Both pairs pass the bound-pair diagnostic at every recorded state of the window | Measured | This instrument on the two retained trajectories; recorded states only |
| Signed changes of $\varepsilon$ of $\mp0.297$ (primary) and $-0.151$, $+0.143$ (comparison) | Measured | Difference of first and last recorded states; no quadrature |
| The sufficient bound holds or fails | Not established | Recorded steps exceed the frozen admissibility rule |
| $\mathbf f_{\mathrm{ext}}\simeq-(2q_i/d)\,\mathbf e\,[\mathbf e\cdot(q_k\mathbf A_k+q_l\mathbf A_l)]$ for two separated pairs | Derived as the leading term for states with bounded velocities and accelerations, with an absolute remainder; descriptive agreement of $0.3\%$–$4\%$ in unweighted root mean square over recorded states | Post hoc decomposition; one run, two pairs, one window |
| The sampled pair quantities are not constant, so the pairs are not isolated in that sense | Measured at the recorded states of this run and reproduced by Codex; expected from the leading term wherever the other pair's projected internal acceleration is not small | Not a statement about fate |
| A converged integral of the external terms over the window, or persistence between recorded states | Not established | Two dense continuations failed the convergence test fixed before launch (Section 6) |
| Any fate statement | Not established | — |

Sources inspected: the run script `weber-binding-sphere-r5-fate.mjs`, the subject instrument's parameter and solve functions, the independently authored reference law's solve function, the two tracked receipts, and the retained trajectory and summary files of this run. No earlier evidence or analysis file was changed. An earlier record of this inquiry said that no time series existed for these runs; that was wrong. The tracked receipts hold summaries only, but the run script also wrote every accepted state to the retained local directory, as Codex pointed out.
