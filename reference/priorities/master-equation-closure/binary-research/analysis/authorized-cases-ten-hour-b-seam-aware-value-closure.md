# A seam-aware seventeenth-order value estimate

**Status: derived candidate, unreviewed.** Fix the identical member $\epsilon=2^{-200000}$, $K=c_f=1$, $R_0=2^{399998}$ and the complete [case history](authorized-cases-ten-hour-b-case.md). The actual sixth seams described in the [neutral-seam subject](authorized-cases-ten-hour-b-neutral-seam-obstruction.md) are retained. This construction uses no seventh source derivative. It gives a concrete candidate higher-order **value** estimate by a contraction of the acceleration defect, not by differentiating the actual history to order seventeen.

The stopping chart is the same fixed compact state box $1/2\le r/H^2\le4$, $|Hy'|\le8$, after a finite initial layer. The result below is conditional only on staying in that actual chart with the already admitted root and acceleration bounds. It is independent of whether the new compact signed-mode candidate is accepted. It does not select the terminal branch or claim a near-parabolic chart.

## 1. The finite comparison field and its known controls

Let $F^{[16]}(Z,V;\lambda)=\sum_{n=0}^{16}\lambda^nF_n(Z,V)$ be the finite autonomous coefficient construction obtained from the exact row, with the receiver gradient taken before autonomous source substitution. It is the same triangular construction used through sixth order in the [accepted signed subject](../../analysis/amplitude-gradient-signed-radial-mode.md#3-explicit-autonomous-coefficient-construction-and-the-improved-remainder), now stopped at sixteen. It is a comparison field on state space, not an alteration of the actual delayed equation.

The known controls are algebraic and precede the new target estimate. At zero parameter its field is $F_0=-Z/|Z|^3$. The exact affine-source cancellation makes its linear parameter coefficient zero. Its quadratic and cubic coefficients are the accepted $F_2,F_3$. If a path solves this finite comparison field, the difference between its actual second derivative and the comparison field is identically zero by substitution; the defect estimate below must then reduce to the field's own finite consistency error. None of these controls is a numerical trajectory.

For completeness, quantitative existence of the finite coefficients needs no actual high jets. Start with $F^{(0)}=F_0$. Generate formal position jets through sixteen with $\mathcal D_F=V\cdot\partial_Z+F\cdot\partial_V$, evaluate the exact row on that finite source polynomial, retain degrees through sixteen, and repeat eight times. Source acceleration enters first at degree two, so eight iterations determine all sixteen coefficients.

Use a buffered real state box $1/4\le|Z|\le8$, $|V|\le16$, with initial complex component width $2^{-10}$. Each state differentiation spends width $2^{-24}$. Fourteen differentiations per iteration and eight iterations spend less than $2^{-16}$, leaving width greater than $2^{-11}$. A field bounded by $2^{30}$ has its formal jets through sixteen bounded by $2^{1000}$: each application of $\mathcal D_F$ costs less than $2^{58}$, and $30+14\cdot58<1000$.

Start with parameter radius $2^{-5000}$ and halve it after each coefficient truncation. The polynomial displacement over its implicit delay is then below $2^{-4900}$, its velocity below 32, and its acceleration below $2^{31}$. The exact row is analytic and bounded by $2^{12}$; the truncated sum on the half disk is bounded by $2^{13}$, restoring the induction bound. After eight steps, a safe retained parameter radius is $2^{-5010}$. Thus

$$
|F_n|\le2^{30+5010n},\qquad n\le16,
\tag{1}
$$

and the state Lipschitz constant of the full field at the actual parameter is below $2^{60}$ on the inner buffered box. These are bounds on finite analytic coefficient operations. They are not assertions of analytic actual source histories.

## 2. Consistency on a local comparison flow

At an actual reception, freeze $H=a$ and put $y=a^2Z$, $s-s_*=a^3\tau$, $\delta=\epsilon/a$. Let $W$ solve the comparison initial-value problem backward from the actual current state,

$$
W''=F^{[16]}(W,W';\delta),\qquad W(0)=Z(0),\quad W'(0)=Z'(0).
\tag{2}
$$

Only its short segment of length at most $20\delta$ is used. This is a comparison attached to a reception, not a replacement supplied past. The analytic field bound gives a uniform complex flow on a time disk of radius $2^{-80}$, much larger than the implicit delay for $|\lambda|\le2^{-5010}$. The local source root remains a strict contraction on that disk.

Let $\mathcal T_\lambda[W]$ mean evaluation of the exact delayed row on this comparison segment, including its own root. Its difference from $F^{[16]}(Z(0),Z'(0);\lambda)$ is analytic in $\lambda$, bounded by $2^{31}$, and has coefficients zero through sixteen by the finite construction. Cauchy's estimate therefore gives

$$
\left|\mathcal T_\delta[W]-F^{[16]}(Z(0),Z'(0);\delta)\right|
\le2^{86000}\delta^{17}.
\tag{3}
$$

The exponent includes $17\cdot5010$ and the geometric-series and component factors. All derivatives here belong to the analytic comparison flow. No actual source derivative above six has entered.

## 3. Exact defect transport needs only two integrations

Define the actual acceleration defect on every supplied or generated time where it is needed,

$$
R(t)=Z''(t)-F^{[16]}(Z(t),Z'(t);\delta).
\tag{4}
$$

On supplied negative times this is a definition, not an equation imposed on the preparation. Let $S$ be the supremum of $|R|$ on the actual interval $[-20\delta,0]$. Both the actual and comparison segments stay in the buffered state box. Their state difference starts from zero at reception. Twice integrating

$$
(Z-W)''=F^{[16]}(Z,Z';\delta)-F^{[16]}(W,W';\delta)+R
$$

and using $2^{60}(20\delta)<1/16$ yields, for $0\le t\le10\delta$,

$$
|Z(-t)-W(-t)|\le2t^2S,
\qquad |Z'(-t)-W'(-t)|\le2tS.
\tag{5}
$$

This is the elementary integral Gronwall estimate on the short backward interval; it differentiates neither $R$ nor a source seam. The direct acceleration difference at a common source time is at most $2S$, by (4), (5) and the field Lipschitz bound.

Let $u$ and $\widetilde u$ be the actual and comparison delays. The comparison root derivative is bounded away from zero, so

$$
|u-\widetilde u|\le2\delta|Z(-u)-W(-u)|
\le400\delta^3S.
\tag{6}
$$

Moving the comparison data from $-u$ to $-\widetilde u$ uses its bounded velocity, acceleration and jerk. The jerk is bounded by $2^{100}$ from the field derivative. The resulting position, velocity and acceleration differences at their respective roots are bounded by

$$
2^9\delta^2S,\qquad 2^5\delta S,\qquad 3S.
\tag{7}
$$

The weighted value Lipschitz bound for the exact row is $2^{20}$ in source position, $\delta$ times source velocity and $\delta^2$ times source acceleration. It follows directly by treating $\delta b$ and $\delta^2 A_d$ as independent variables in the rational row on its strict range and denominator box; it is the same value bound used in the [admitted transfer](authorized-cases-ten-hour-b-majorant-addendum.md#2-exact-reception-derivative-and-its-finite-jet-lipschitz-bound). The comparison acceleration need not be assigned a high actual jet: its weighted value lies inside that box.

Combining (3) and (7) gives the actual defect inequality

$$
|R(0)|\le2^{86000}\delta^{17}
+2^{40}\delta^2\sup_{[-20\delta,0]}|R|.
\tag{8}
$$

The supremum includes reception, which is harmless because its coefficient is strictly below one. Equation (8) is an estimate for the same actual path with its complete past. It explains why the neutral term can attenuate a history defect without erasing its derivative jumps.

## 4. The original polynomial layer is sufficiently small after finite transmission

Use the original orbital coordinates for the short interval $[-20\epsilon,200\epsilon]$. The recent past is still exactly its fixed degree-five polynomial. Its coefficients differ from the central circular Taylor coefficients by at most $2^{60}\epsilon^2$, from the admitted compatibility construction. At zero parameter, subtracting the central comparison row from that degree-five circular polynomial gives an acceleration residual of order $s^4$ by direct Taylor remainder. Equation (1) bounds the noncentral comparison terms by $2^{10051}\epsilon^2$. Thus a safe supplied-past bound is

$$
M_-:=\sup_{[-20\epsilon,0]}|R|\le2^{11000}\epsilon^2.
\tag{9}
$$

This loose bound deliberately avoids using the new sixth-order signed candidate. It follows from the already admitted compatible jets, the known circular Taylor control and the finite coefficient bound.

The global actual speed bound first keeps $r$ within $2^{21}\epsilon$ of one on $[0,200\epsilon]$. The actual acceleration bound then improves the speed to below three. The comparison root intervals have length below $20\epsilon$. On this entire initial interval (8) holds with the looser constants

$$
\kappa=2^{50}\epsilon^2<1/4,
\qquad D_*=2^{86000}\epsilon^{17}.
$$

Let $M_j$ be the supremum of the actual defect on $[20j\epsilon,200\epsilon]$. First $M_0\le\kappa M_-+2D_*$. For $j\ge1$, every source window used there starts after $20(j-1)\epsilon$, and hence

$$
M_j\le\kappa M_{j-1}+D_*.
\tag{10}
$$

For $j=8$ the initial contribution is at most $\kappa^9M_-=2^{11450}\epsilon^{20}$, smaller than $D_*$. The geometric sum of consistency errors is below $4D_*$. Therefore on the whole interval $[160\epsilon,200\epsilon]$,

$$
|R|<2^{86003}\epsilon^{17}.
\tag{11}
$$

The beginning of a later bootstrap can be fixed at $s_*=200\epsilon$. No history is reset there. The full earlier segment, including all propagated sixth seams, remains the actual supplied/generated history.

## 5. Persistence in the actual compact chart

The autonomous coefficients inherit the exact orbital homogeneity of the row. In original coordinates define $R_y=y''-F^{[16]}(y,y';\epsilon)$. The normalized weighted defect is

$$
\mathcal R(s)=\frac{H(s)^{21}}{\epsilon^{17}}|R_y(s)|.
\tag{12}
$$

On a causal comparison interval of frozen length $20\delta$, the compact state and acceleration bounds give $|\Delta\log H|<2^{15}\delta$. At the selected parameter this makes the ratio of the twenty-first powers of the current and sampled scales less than two. Thus (8), restored to original coordinates, gives

$$
\mathcal R(s)\le2^{86000}
+2^{41}\delta^2\sup_{\text{sampled window}}\mathcal R.
\tag{13}
$$

The initial interval from (11) has $H^{21}<2$ and supplies $\mathcal R<2^{86004}$. Its width covers the first frozen window at $s_*=200\epsilon$. The auxiliary left endpoint of later windows is $g(s)=s-20\epsilon H(s)^2$. Since the compact bound $|b_a|=|H^3H'/H|<2^{10}$ gives $g'(s)>1-2^{16}\delta>1/2$, these windows never return to an earlier uncontrolled interval. A first exit at $2^{86020}$ contradicts (13), since $\delta\le2\epsilon$ and the second coefficient is far smaller than $1/4$. Consequently, until the first exit from the fixed compact state chart,

$$
\boxed{
|y''-F^{[16]}(y,y';\epsilon)|
\le2^{86020}\epsilon^{17}H^{-21},
\qquad s\ge200\epsilon.
}
\tag{14}
$$

This candidate bound crosses all the sixth seams. It is a value inequality, not a claim of $W^{7,\infty}$ regularity. The local comparison flows are used to estimate the exact row and are discarded after each estimate; they never replace any part of the actual path.

## 6. Attainable precision and the remaining signed obligation

Equation (14), if independently accepted, supplies an actual higher-order remainder at fixed parameter without a smoother preparation. In a signed norm calculation which retains the deterministic comparison terms, its additive contribution to $B=A/H^{3/2}$ has the power $\epsilon^{14}$, or relative power $\epsilon^{11}$ against the cubic prepared seed. The leading last-cycle sensitivity would then multiply that contribution by $\epsilon^{-9}$, leaving two powers of $\epsilon$ before constants. This identifies a plausible attainable accuracy gain; it does not prove the required correlated transport.

In particular, keeping only the old cubic cycle coefficient and bounding the fourth-through-sixteenth deterministic terms by magnitude would still leave the former $O(C\epsilon)$ relative homogeneous uncertainty. A smaller actual remainder does not remove that term. Those deterministic terms, their phase corrections, the initial layer and the near-parabolic section must be carried together with signed errors. The final account remains unresolved. No favourable phase, changed dyadic member or finite-tail verdict has been selected.

The first review obligations are the finite analytic-field norm budget, its exact consistency order, the backward integral estimates and root transport in (5)–(8), and the whole-window weighted bootstrap. A failure in any of these would withdraw (14). An actual history violating the bound within the admitted chart, or a hidden derivative of its seams in the proof, is an operator-checkable falsifier. No numerical target, new instrument, external physical premise, Python calculation, long process or Git mutation was used.
