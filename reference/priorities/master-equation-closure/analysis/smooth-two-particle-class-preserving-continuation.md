# A class-preserving comparison toward $19/4$

## Scope and current status

**Conditional feasibility result; actual continuation to $19/4$ is not yet asserted.** This subject keeps the [preceding later continuation](smooth-two-particle-post-restart-later-continuation.md) and its earlier references frozen. It asks whether a direct complete-population comparison from $17/4$ to $19/4$ can close in the original supplied-history class, and whether sharper residual reruns of old unchanged archives are necessary. The Master Equation, $g=16$, $c_f=1$, infinite alternating lattice, stationary eight-source block sum and supplied complete past remain unchanged. No future maximum, completed excursion or class departure is assumed.

The numerical center and residual through $19/4$ are still separate certificate obligations. The conditional calculations below use frozen, independently derived error profiles as explicit inputs, not numerical agreement as a correctness reference.

## 1. Complete domains and source hypotheses

Let $h=17/4$, $H=19/4$. The first-excitation argument gives 1068 environmental identities and both original targets through $H$, 1070 histories in total, because $(H+11/8)^2=(49/8)^2$ lies between 37 and 38. The already represented incoming population through $h$ consists of 834 environmental identities and both targets. The anchor-front triangle inequality excludes generated-only first identities outside the first-old-onset set; the unit-neighbor exception is already covered by the other original pulse.

For a receiver comparison ball $B\le1/16$, the preliminary full-population range bound gives an emission time at most $H-1+2B\le31/8<h$. The newly queried sources therefore lie in already represented histories. Their complete actual position bound $1/100$ through $h$ then improves the source ceiling to $H-1+B+1/100\le3.8225<123/32$. The existing outward per-path polynomial norms at $123/32$ and the sharper independent error profile give the prospective actual bounds

$$
|U|<0.002095,\qquad |U'|<0.006806,\qquad |U''|<0.022888.
\tag{1}
$$

These numbers are conditional on the earlier complete-population residual certificates. Convenient sufficient bounds are

$$
b_s=1/400,\qquad v_s=1/128,\qquad A_s=1/40.
\tag{2}
$$

They give the sharper emission ceilings $3.8025$ for $B=1/20$ and $3.815$ for $B=1/16$, both below $123/32$. Thus no source trajectory beyond the current $17/4$ archive is needed for this step.

The initial full-population errors at $h$ are taken from the independently derived uniform-$1/25000$ residual comparison, safely rounded to

$$
e_P(h)\le0.000241,\qquad e_V(h)\le0.001078.
\tag{3}
$$

Its frozen receipt is `.tmp/mec-008-post-restart/moore/sharper-direct-error-target.json`. This replaces the deliberately looser sufficient allowances in the earlier subject only as a named input to this new calculation; it does not alter that frozen subject or any numerical archive.

## 2. Receiver-specific derivative and delayed forcing

For each of the 1070 receivers, retain all nonself generated sources whose first-onset time plus anchor distance can be at most $H+B$. There are at most 139 possible generated rows at a receiver. All squared ranges above 22 are inactive at this horizon. The source identities remain those of the 836 incoming histories. Old-pulse channels are retained separately with range floor five, since $h+9/8=43/8>5$.

For receiver $i$, let $N_{i,m}$ count its possible generated sources at squared anchor range $m$, and let $r_m=\underline{\sqrt m}-B-b_s$. Use the unchanged-law derivative and source-shift coefficients $L,C_P,C_V$ in the preceding subject. The stationary Taylor reference gives the receiver derivative coefficient

$$
D_B=6(14.3977)+\frac{39975B^2}{(1-B)^7},\qquad
\|DS_0(y)\|\le D_B\|y\|^2.
\tag{4}
$$

The complete receiver derivative is bounded by

$$
\Lambda_B=32L(A_p,\nu,3/8,5)+16D_BB^2+16\max_i\sum_mN_{i,m}L(b_s,v_s,A_s,r_m).
\tag{5}
$$

The exact integer census has 35 undominated shell-count vectors for either proposed $B$. A vector componentwise smaller than another can be removed from a maximum of nonnegative weighted sums; this is only an arithmetic simplification, not a deletion of physical channels. Known controls verify that reduction before its target use. Formula (5) gives

$$
\Lambda_{1/20}<50.413587<51,\qquad \Lambda_{1/16}<63.144931<64.
\tag{6}
$$

For source errors through $13/4$, the accepted ceilings $1.6\times10^{-6}$ and $5.7\times10^{-6}$ suffice. On $(13/4,15/4]$, use the maximum of the frozen environmental refresh and already accepted target profiles. After $15/4$, use the sharper independent direct-population profile cited above. These inputs preserve all earlier source-time shifts and staged residuals. Upper-cell lookup on their $1/2048$ time grid gives nondecreasing envelopes $F_P,F_V$.

For each reception cell of width $1/128$, the complete forcing-error bound is

$$
f(t)=\rho+16\max_i\sum_mN_{i,m}\left[C_P(v_s,A_s,r_m)F_P(t-r_m)+C_V(v_s,r_m)F_V(t-r_m)\right].
\tag{7}
$$

The maximum may select a different receiver at each time; it remains an upper bound for all of them. The exact positive propagator of $e_P'=e_V$, $e_V'=\lambda e_P+f$, with $\lambda=51$ or 64 and cell-upper forcing, then controls position, velocity and acceleration errors. Its positive hyperbolic series and geometric tail are inherited unchanged; output states are rounded upward to $10^{-15}$.

## 3. Quantified sufficient conditions

The known-controlled exact rational instrument `nineteen_error.py` gives the following whole-interval error ceilings. Each listed polynomial position threshold is the receiver radius minus the derived position error; the actual continuous numerical norm must lie strictly below it.

| Receiver ball | Full new residual budget | Position error | Velocity error | Acceleration error | Allowed continuous polynomial position norm |
|---|---:|---:|---:|---:|---:|
| $1/20$ | $10^{-3}$ | $0.009853451$ | $0.072961343$ | $0.530974403$ | $<0.040146549$ |
| $1/16$ | $10^{-3}$ | $0.013982117$ | $0.114452214$ | $0.925824189$ | $<0.048517883$ |
| $1/20$ | $10^{-2}$ | $0.012815519$ | $0.095339534$ | $0.691039873$ | $<0.037184481$ |
| $1/16$ | $10^{-2}$ | $0.017681713$ | $0.145153371$ | $1.171598285$ | $<0.044818287$ |

The $10^{-2}$ rows follow by adding the exact response to a further constant residual $9\times10^{-3}$; no new source or trajectory assumption enters. Intermediate residual budgets interpolate through that same positive response formula.

For example, the $B=1/20$, $\rho=10^{-2}$ row is a sufficient first-exit comparison if the continuous center norms obey

$$
\sup|\widetilde y|<0.037184481,\qquad
\sup|\widetilde y'|<0.4,\qquad
\sup|\widetilde y''|<1.3,
\tag{8}
$$

and the complete residual, source histories, exact joins and retained prefixes pass their own checks. The error ceilings then put actual position below $1/20<1/16$, speed below $1/2$ and acceleration below two. These auxiliary speed and acceleration bounds remain inside the original class. Cross ranges are at least $9/10$, global subunit speed retains unique simple roots and empty positive self roots, and all new source times precede $h$. With received source acceleration at most $3/8$ and speed at most $1/128$, a direct changed-row derivative bound below five, at most 141 changed rows and (4)'s stationary derivative keep jerk far below 65536. Hence the strict tube margins support an actual continuation argument rather than assuming a solution already exists at $H$.

**Conditional conclusion:** if the new continuous norm and residual fall in one of these sufficient ranges, no sharper residual rerun of the earlier unchanged archives is needed for this finite continuation. If they do not, a stronger received-time comparison or sharper old residual certificate may improve the propagated errors. The failed table inequality by itself establishes neither class departure nor failure of the Master Equation.

### 3.1. Current numerical proposal and remaining certification

The numerical contributor's frozen $19/4$ proposal has diagnostic full-population polynomial norms $0.031356841140$, $0.084380205020$ and $0.235391120218$ for position, velocity and acceleration. These are numerical proposal diagnostics, not outward accepted solution bounds. Its archive is `.local-data/master-equation-closure/post-restart/approximant/population-h19-4.npz`; the source table has 1069 paths and the right target is separate. The environmental population dominates these maxima.

If the independent continuous norm certificate encloses those norms by $0.031357$, $0.084381$, $0.235392$, and the full residual is at most $10^{-2}$, the already frozen $B=1/20$ comparison gives

$$
\sup|y_i|<0.044173<1/20,\qquad
\sup|y_i'|<0.179721<1/2,\qquad
\sup|y_i''|<0.926432<2.
\tag{9}
$$

Thus the current proposal meets the sufficient norm side with a useful strict margin. A sharper rerun of the earlier stationary-dominated residuals is not needed for this step if the pending full-law residual and compatibility checks discharge the remaining premises. No actual environmental class-exit event is indicated by this comparison.

## 4. What would certify a first exit from the original class?

The original environmental displacement ceiling is $1/16$; the two original targets have a different, larger displacement allowance. An all-path maximum, a target-only threshold or failure of an auxiliary $1/20$ comparison is therefore not automatically an environmental class-exit event.

To certify an exit, retain the complete population and stop the actual regular solution at its first environmental event

$$
\tau=\inf\{t:\exists j\notin E,\ |y_j(t)|=1/16\}.
\tag{10}
$$

A rigorous lower bracket requires continuous strict bounds for every affected environmental identity before its lower endpoint. For an upper bracket, an a posteriori comparison valid under the hypothesis of no prior exit can produce a positive lower bound for $|y_j|-1/16$ at the upper endpoint. This contradicts the no-exit hypothesis and places the first exit inside the bracket; it does not require assuming an actual path outside the original class. The comparison constants must cover the segment between the stopped actual path and the numerical center, even if that center lies outside the class. Such a larger analytic comparison domain is distinct from asserting an actual continuation in a larger history class.

A uniquely identified transversal exit additionally needs a positive bound on $y_j\cdot y_j'/|y_j|$ in the candidate event window, retained root/history regularity through the boundary, and exclusion or ordering of competing environmental events. A numerical sample beyond the ceiling, without these checks, remains only a candidate. Reaching this class boundary would delimit the present theorem family; it would not be a failure of the unchanged Master Equation. Motion after that boundary and a later upward maximum would require a separately stated continuation claim.

## Evidence and falsifiers

The conditional receipt is `.tmp/mec-008-post-restart/hale/nineteen-target.json`, preceded by `nineteen-known.json`. The instrument authenticates no new numerical archive because this stage consumes only declared geometry and frozen error profiles; new archive authentication, full residuals, norm bounds and exact joins remain acceptance obligations. The field derivative is derived from the previously checked infinite-field Taylor reference, not fitted to a trajectory.

Falsifiers include an invalid prior-profile premise, omitted receiver or causal channel, unsupported stationary derivative, uncovered source time, invalid positive-series or interval operation, residual over budget, continuous norm above the selected threshold, or a failed original history-class margin. No claim about the next maximum or actual environmental class exit follows from this feasibility table alone.
