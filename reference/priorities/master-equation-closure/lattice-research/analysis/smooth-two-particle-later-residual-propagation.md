# Residual propagation for the unchanged later evolution

## Result and claim boundary

This theorem turns certified residual bounds for piecewise-polynomial environmental source paths and target paths into error bounds against the **unmodified Master Equation**, including its complete stationary block field at both stages. It uses the [accepted continuation through $T=2\ell$](smooth-two-particle-later-independent-adjudication.md), the identical supplied histories, $g=16$, and $c_f=1$. The source census and root domain remain those of that accepted theorem.

Claim grade: **derived conditional theorem, awaiting independent reconstruction**. The conditions concern continuous polynomial approximants, their exact joins and initial data, and certified residual enclosures throughout their cells. This document checks the propagation arithmetic. It does not assert that a particular numerical approximant has already passed those conditions or that its measured extrema are exact.

Two sufficient residual budgets are:

| Profile | Source residual norm through $33/32$ | Target residual norm through $2$ | Target position error | Target velocity error | Target acceleration error on polynomial cells |
| --- | ---: | ---: | ---: | ---: | ---: |
| Looser | $10^{-10}$ | $10^{-9}$ | $<6\times10^{-8}$ | $<1.2\times10^{-7}$ | $<2\times10^{-7}$ |
| Tighter | $10^{-11}$ | $10^{-9}$ | $<6\times10^{-9}$ | $<1.3\times10^{-8}$ | $<2\times10^{-8}$ |

Every norm in this document is Euclidean. An interval bound for each Cartesian component must therefore be combined with an outward enclosure of the square root of the sum of squared component bounds, or with the conservative sum of those bounds. A componentwise maximum alone is not the stated vector residual norm.

These bounds support actual vertical-velocity sign brackets, acceleration-sign certificates inside turning windows, and enclosed height comparisons. They do not establish eventual settling, an asymptotic damping law, or the absence of later growing motion.

## 1. Exact equation and the two-stage reduction

Write $t=T/\ell$, $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$, $i\in\mathbb Z^3$, $E=\{0,e_1\}$ and $\sigma_i=(-1)^{i_1+i_2+i_3}$. The two targets have identical supplied pulse histories

$$
\mathbf y_c(s)=p(s+11/8)e_3,\qquad c\in E,\qquad
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
$$

with $p=0$ outside that support. All environmental supplied pasts are stationary. Forward position and velocity at $t=0$ are zero for every label. These complete pasts are the fixed input, whose separate preparation obstruction remains unchanged.

The stationary block field and changed source row are

$$
\begin{gathered}
\|\mathbf S_0(\mathbf y)\|\le C\|\mathbf y\|^3,
\qquad\|D\mathbf S_0(\mathbf y)\|\le3C\|\mathbf y\|^2,
\qquad C=1400,\\
\mathbf Q(t,\mathbf y;\mathbf U)=\frac{\mathbf K(\mathbf k+\mathbf y-\mathbf U(s))}{1-\mathbf n\cdot\mathbf U'(s)}-\mathbf K(\mathbf k+\mathbf y),
\quad \mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\\
t-s=\|\mathbf k+\mathbf y-\mathbf U(s)\|.
\end{gathered}
\tag{1}
$$

The field bounds apply inside radius $1/128$. Equation (1) retains the canonical transmitter factor. There is no receiver-velocity acceleration multiplier, force law, mass parameter, damping term or changed polarity rule.

The accepted continuation supplies

$$
a=33/32,\qquad b_s=1/60000,\qquad v_s=1/16000,
\qquad A_s=1/400.
\tag{2}
$$

Every received generated source through target time $2$ lies in the 76-label old-pulse source set and is sampled below $a$. Through $a$ the actual environmental equations contain only the two supplied target-history corrections:

$$
\mathbf y_j''=F_j^{\rm src}(t,\mathbf y_j)
=g\mathbf S_0(\mathbf y_j)+g\sum_{c\in E}\sigma_j\sigma_c\mathbf Q_{jc}^{\rm old}(t,\mathbf y_j).
\tag{3}
$$

The source histories satisfy the displacement, speed and acceleration bounds (2). The target futures remain exactly stationary on this prefix. At target reception times through $2$, the exact equation is

$$
\mathbf y_i''=F_i^{\rm tgt}(t,\mathbf y_i;\{\mathbf y_j\})
=g\mathbf S_0(\mathbf y_i)+g\sum_{j\in J_i}\sigma_i\sigma_j\mathbf Q_{ij}(t,\mathbf y_i;\mathbf y_j),
\quad i\in E.
\tag{4}
$$

There are 21 distinct environmental identities in $J_i$: five at unit anchor distance, twelve at distance $\sqrt2$, and four at distance $\sqrt3$. Four reused sources contain a second received original pulse, so their complete histories must be preserved. The 21 identities represent 25 two-leg pulse paths. All other changed target-received rows vanish by the accepted causal census; their stationary source rows remain part of $\mathbf S_0$.

Equations (3) and (4) are exact reductions of the same unmodified equation on this accepted interval. They do not prescribe an environmental future, truncate a moving population to a bare finite lattice, or replace the stationary block field.

## 2. Conditions on the polynomial paths and residual certificate

Let $\mathbf P_j$ approximate every required environmental source on $[0,a]$ and let $\mathbf Z_i$ approximate a target on $[0,2]$. It suffices to certify the following conditions.

1. **Exact history and joins.** Source approximants use the exact zero environmental supplied past for $s\le0$, have $\mathbf P_j(0)=\mathbf P_j'(0)=0$, and are continuously differentiable, piecewise polynomial on a finite partition. Their first derivative is absolutely continuous. Target approximants satisfy the same regularity and are exactly zero on $[0,1]$. A common nodal Hermite definition over exact binary rational nodal data can give exact joins, but the defining coefficients and identities must actually be checked. Independently rounded cell coefficients cannot be presumed to have exact joins.
2. **Source tubes.** On every cell, including one-sided endpoint limits, certify

   $$
   \|\mathbf P_j\|\le b_s,\qquad
   \|\mathbf P_j'\|\le v_s,\qquad
   \|\mathbf P_j''\|\le A_s.
   \tag{5}
   $$

3. **Exact early zero intervals.** If $m_j\in\{2,3,4,5\}$ is the source's first-excitation squared distance in the accepted census, require $\mathbf P_j=0$ through the following conservative cuts:

   $$
   \theta_2=1/32,\qquad \theta_3=11/32,\qquad
   \theta_4=39/64,\qquad \theta_5=27/32.
   \tag{6}
   $$

   These cuts precede the corresponding actual first old-pulse onsets. They ensure that a trial interpolant does not create a premature target row outside the 21-source set. Exact zero values and first derivatives are included in this requirement.
4. **Target tube.** Certify $\|\mathbf Z_i(t)\|\le9\times10^{-6}$ throughout $[0,2]$, by a continuous polynomial bound rather than a sampled maximum.
5. **Full residuals.** On every open polynomial cell, certify

   $$
   \begin{aligned}
   \|\mathbf P_j''-F_j^{\rm src}(t,\mathbf P_j)\|&\le\rho_s,\\
   \|\mathbf Z_i''-F_i^{\rm tgt}(t,\mathbf Z_i;\{\mathbf P_j\})\|&\le\rho_t.
   \end{aligned}
   \tag{7}
   $$

   The source residual uses the exact supplied target pulses. The target residual uses the same continuous source polynomials for positions and their derivatives for velocities. Every source root is enclosed as a root of its exact implicit equation, including source-cell crossings. Complete unique roots, positive denominators, endpoint signs and source-history coverage must be verified; a small floating-point Newton residual alone is insufficient.

The complete $g\mathbf S_0$ term belongs in both residuals (7). A valid way to enclose it is to retain its rigorous vector-norm ball $gC\|\mathbf P_j\|^3$ or $gC\|\mathbf Z_i\|^3$ at each cell, together with the finite changed-row residual. This encloses the unmodified law even when the center of that ball is zero. It does not assert that the exact stationary contribution vanishes. The cell's validated polynomial norm, rather than the coarse global source radius, can make that enclosure substantially sharper.

### 2.1. Required smoothness at joins

Exact $C^1$ joins suffice for the propagation theorem: bounded piecewise second derivatives make the first derivative globally Lipschitz, and the residual integral formula holds across all cells. $C^2$ joins are convenient and satisfy the requirement. A jump in the second derivative does not insert an impulse into a $C^1$ path and is harmless when both one-sided residual bounds are included. An actual velocity jump would insert an impulse; it is not covered by a residual bound only on the open cells. A position jump would also invalidate the present continuous-source root argument. Such jumps must be eliminated or treated by a separate explicit theorem; they must not be hidden as measure-zero samples.

If a residual checker uses a Taylor enclosure, it must split at any knot where the required derivative is discontinuous. A $C^2$ source path has continuous velocity and acceleration, although its third derivative may jump. Enclosing both neighboring third derivatives is sufficient for a piecewise almost-everywhere bound used in a Taylor remainder. This does not make a discontinuous target residual derivative continuous across a target polynomial knot.

## 3. Source error against the full equation

The accepted changed-row receiver Lipschitz bound is

$$
\mathcal L(P,V,A,r)=\frac{24P}{r^4}
+\frac2{r^3}\big[(1-V)^{-2}-1\big]
+\frac{Vr^{-3}+Ar^{-2}}{(1-V)^3}.
\tag{8}
$$

It follows by differentiating the implicit source time, subtracting the stationary-source derivative before bounding, and retaining source acceleration in the velocity-at-shifted-time derivative. On the segment joining an actual source receiver to its approximant, both positions lie within $b_s$, and each old-pulse range exceeds $7/5$. The fixed pulse bounds are $A_p=1/314928$, $\nu=1/8192$, and acceleration $3/8$. Including the stationary-field derivative gives

$$
L_s=2g\mathcal L(A_p,\nu,3/8,7/5)+3gCb_s^2
<6.132465<7.
\tag{9}
$$

Let $\mathbf e_j=\mathbf y_j-\mathbf P_j$. Exact initial position and velocity and (7) give

$$
\|\mathbf e_j(t)\|\le\int_0^t(t-s)\big[7\|\mathbf e_j(s)\|+\rho_s\big]ds.
$$

Iteration of this positive integral operator gives the scalar comparison

$$
\begin{aligned}
\|\mathbf e_j(t)\|&\le\frac{\rho_s}{7}\big[\cosh(\sqrt7t)-1\big],\\
\|\mathbf e_j'(t)\|&\le\frac{\rho_s}{\sqrt7}\sinh(\sqrt7t).
\end{aligned}
\tag{10}
$$

At $a=33/32$, the two gain factors are below $0.955298<1$ and $2.880757<3$. Consequently uniform bounds valid at every received source time are

$$
E_P=\rho_s,\qquad E_V=3\rho_s.
\tag{11}
$$

They hold on the supplied environmental past as well, because the error there is exactly zero. Equation (10) measures error directly against the full actual source dynamics. There is no intermediate exact evolution with its background removed.

## 4. Source-time displacement in the target error

Temporarily assume the actual target lies within $B_t=10^{-5}$. Source and trial-source roots at a fixed receiver position differ by at most $E_P/(1-v_s)$, since both source paths have speed at most $v_s$. Their received source positions and velocities therefore differ by at most

$$
\Delta_U\le\frac{E_P}{1-v_s},\qquad
\Delta_W\le E_V+\frac{A_sE_P}{1-v_s}.
$$

For a common range floor $r$, the source-history contribution to a row difference is bounded by

$$
C_P(r)E_P+C_V(r)E_V,
\tag{12}
$$

where

$$
C_P(r)=\frac{2r^{-3}}{(1-v_s)^2}
+\frac{v_sr^{-3}+A_sr^{-2}}{(1-v_s)^3},
\qquad
C_V(r)=\frac{r^{-2}}{(1-v_s)^2}.
\tag{13}
$$

This follows by bounding the change in $K(R)$, the change in the unit range vector, and the change in the denominator separately. The term containing $A_sE_P$ is necessary: the two source velocities are evaluated at different emission times.

In this tube, set

$$
(r_1,r_2,r_3)=(99/100,7/5,12/7),\qquad
(n_1,n_2,n_3)=(5,12,4).
$$

The smallest actual subtraction range exceeds $1-B_t-b_s>99/100$. Every source root lies below $1+B_t+b_s<a$. The same statements hold on the segment between receiver paths and for the trial source histories.

The early zeros (6) retain the complete target census for the trial paths. A source with first excitation $m=2$ at target distance at least two can only be sampled before $B_t+b_s<\theta_2$. A source with $m=3$ at distance at least $\sqrt3$ is sampled before $2+B_t+b_s-12/7<\theta_3$. Sources with $m=4$ or $5$ at distance at least $\sqrt2$ are sampled before $2+B_t+b_s-7/5<\theta_4,\theta_5$. Those trial rows are exactly stationary there. These cases include both tied nearest excluded families identified in the accepted adjudication. No uncounted premature interpolation row is discarded.

## 5. Target error and closure of its small tube

The receiver Lipschitz constant, including the full stationary-field derivative, is

$$
L_t=g\sum_{j=1}^3n_j\mathcal L(b_s,v_s,A_s,r_j)+3gCB_t^2
<0.611381<1.
\tag{14}
$$

Let

$$
H_P=g\sum_{j=1}^3n_jC_P(r_j),\qquad
H_V=g\sum_{j=1}^3n_jC_V(r_j).
$$

Exact rational evaluation gives $H_P+3H_V<934.962<940$. Combining (7), (11) and (12), the target acceleration error on every open cell satisfies

$$
\|\mathbf y_i''-\mathbf Z_i''\|
\le\|\mathbf y_i-\mathbf Z_i\|+q,
\qquad
q=\rho_t+(H_P+3H_V)\rho_s.
\tag{15}
$$

Both target paths are at rest through $t=1$. With $w=(t-1)_+\le1$, the zero-data Volterra comparison gives

$$
\|\mathbf y_i-\mathbf Z_i\|\le q(\cosh w-1),
\qquad
\|\mathbf y_i'-\mathbf Z_i'\|\le q\sinh w.
\tag{16}
$$

For the looser budget, $q<9.450\times10^{-8}<10^{-7}$. For the tighter budget, $q<1.0350\times10^{-8}<1.1\times10^{-8}$. Substitution in (16) gives the position and velocity bounds in the opening table. Equation (15) then gives acceleration error below $1.6\times10^{-7}<2\times10^{-7}$ for the looser profile and below $1.7\times10^{-8}<2\times10^{-8}$ for the tighter profile.

The certified polynomial radius and even the looser position error satisfy

$$
9\times10^{-6}+6\times10^{-8}=9.06\times10^{-6}<B_t.
$$

This strict comparison excludes a first actual target exit and completes the error theorem through $t=2$. Unlike the earlier background-only comparison, the small-tube premise here is a finite, checkable polynomial condition. Its proof is part of the required approximation certificate.

### 5.1. Nonuniform residuals or nonzero initial enclosures

Uniform maxima are sufficient, not necessary. If a checker provides nonnegative source residual envelopes $r_s(t)$, replace (10) by

$$
E_P(t)=\int_0^t\frac{\sinh(\sqrt7(t-s))}{\sqrt7}r_s(s)ds,
\qquad
E_V(t)=\int_0^t\cosh(\sqrt7(t-s))r_s(s)ds.
$$

At each target cell use their suprema over its received source-time intervals in (12), add the target residual envelope, and propagate with the unit-Lipschitz kernels $\sinh(t-s)$ and $\cosh(t-s)$. This can preserve more information when the largest residual occupies a short interval.

If exact zero initial data are unavailable, initial position and velocity bounds $e_0,v_0$ add $e_0\cosh(\sqrt L t)+v_0\sinh(\sqrt L t)/\sqrt L$ to the position majorant, and $e_0\sqrt L\sinh(\sqrt L t)+v_0\cosh(\sqrt L t)$ to its velocity majorant, with the appropriate stage constant $L$. The numerical budgets in the table assume those initial errors are zero and cannot be reused unchanged after adding such terms.

## 6. Certifying three reversals and the smaller subsequent excursion

Let $Z(t)=e_3\cdot\mathbf Z_{e_1}(t)$, and let $\varepsilon_P,\varepsilon_V,\varepsilon_A$ be a verified row from the opening table. Reflection symmetry of the unchanged equation and fixed past makes the other target's vertical coordinate equal to the first; no separate numerical symmetry assumption is needed for the actual paths.

The previously measured turn locations suggest three rational windows

$$
I_1=[149/100,153/100],\qquad
I_2=[91/50,37/20],\qquad
I_3=[49/25,199/100].
\tag{17}
$$

These are proposed certificate windows, not new measured or accepted turning intervals. A continuous polynomial certificate can establish the following sufficient tests:

| Window | Left endpoint | Right endpoint | Polynomial acceleration throughout the window |
| --- | --- | --- | --- |
| $I_1$ | $Z'>\varepsilon_V$ | $Z'<-\varepsilon_V$ | $Z''<-\varepsilon_A$ |
| $I_2$ | $Z'<-\varepsilon_V$ | $Z'>\varepsilon_V$ | $Z''>\varepsilon_A$ |
| $I_3$ | $Z'>\varepsilon_V$ | $Z'<-\varepsilon_V$ | $Z''<-\varepsilon_A$ |

The velocity errors preserve the endpoint signs. The acceleration errors make actual velocity strictly monotone in each window, so each contains exactly one actual turning time: maximum, minimum, maximum. The acceleration condition can be checked separately on every intersecting polynomial cell; at knots use the one-sided limiting inequalities and continuity of the actual acceleration. Without that acceleration test, endpoint signs still establish at least one reversal in each window, but not uniqueness there.

To establish that these are consecutive turns over the relevant portion of the trajectory, additionally certify $Z'<-\varepsilon_V$ between $I_1$ and $I_2$ and $Z'>\varepsilon_V$ between $I_2$ and $I_3$. Claims excluding any additional turns before the first window or after the third need the corresponding sign coverage of those intervals. The theorem does not infer complete sign coverage from a grid of sample signs.

Let the three actual extremal heights be $M_1,m_2,M_3$. An outward range enclosure $Z(I_k)\subset[\ell_k,u_k]$ gives

$$
M_1\in[\ell_1-\varepsilon_P,u_1+\varepsilon_P],\quad
m_2\in[\ell_2-\varepsilon_P,u_2+\varepsilon_P],\quad
M_3\in[\ell_3-\varepsilon_P,u_3+\varepsilon_P].
\tag{18}
$$

Sharper bounds use a fixed-time interior sample as a lower bound for a maximum or an upper bound for a minimum, while retaining the full continuous-window enclosure on the other side. No numerical turning time is treated as exact.

The first downward excursion is $D=M_1-m_2$ and the next upward excursion is $U=M_3-m_2$. Once both are positive, the single strict inequality

$$
u_3+\varepsilon_P<\ell_1-\varepsilon_P
\tag{19}
$$

proves $U<D$, because the same trough cancels. For a quantitative ratio, let the accepted height intervals be $M_1\in[A_-,A_+]$, $m_2\in[B_-,B_+]$, $M_3\in[C_-,C_+]$, with $A_->C_+>B_+$ and $C_->B_+$. Monotonicity of $(C-B)/(A-B)$ in its three variables gives

$$
\frac{C_--B_+}{A_+-B_+}\le\frac UD\le\frac{C_+-B_-}{A_--B_-}.
\tag{20}
$$

This uses the common trough consistently. Passing (17)–(20) establishes a finite-interval pattern of repeated turns with a smaller following excursion for the fixed input. It supplies no conclusion about the next unreceived pulse endpoints or long-time damping.

## Development evidence and falsifiers

This analysis uses the accepted later continuation and adjudicated background derivative estimates as unchanged inputs. It changes the comparison method by including the complete stationary field inside both actual-law residuals; no prior subject, adjudication or instrument was edited.

The new arithmetic instrument `.tmp/mec-008-later-certification/hale/propagation.py` passed `known` mode before target execution. Controls covered signed fractions, zero-argument series, exact low-order hyperbolic-series coefficients, positive rational enclosures, and the independently integrated constant-residual case $x''=2$, $x(0)=x'(0)=0$. The successful receipt is bound to the script hash. Target mode then checked the complete-field Lipschitz constants, the source gains, root-prefix and excluded-channel margins, both residual-budget consequences and the target-tube closure. Positive hyperbolic series were enclosed by an exact finite sum plus a geometric bound on their decreasing-ratio tail. These are arithmetic checks of the displayed propagation theorem; they do not run a path residual checker or accept a trajectory.

Reproduction uses the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/hale/propagation.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-later-certification/hale/propagation.py target
```

An incorrect source-time derivative, omitted received pulse, false root enclosure, missed polynomial join defect, failed source or target tube, an uncertified early zero, missing stationary contribution in a residual, or a failed strict arithmetic inequality would invalidate the corresponding conclusion. Until an actual approximant passes all required interval conditions and a separate assessment reconstructs that certificate, the later turns remain measured comparison results. Failure of these sufficient budgets would not prove failure of the underlying evolution; tighter residual propagation or different certificate windows could still succeed.
