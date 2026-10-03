# Radial exponent thresholds and the logarithmic obstruction

## Equation and comparison scope

The inverse-distance reception candidate lies at an obstruction threshold. This statement has a proved negative half and an open positive half. The [existing logarithmic proof](logarithmic-causal-continuation-obstruction.md) excludes finite continuous collinear velocity after the first wake-speed event. Changing the radial exponent may remove its particular lower bound, but removing that bound is not an existence theorem.

**Claim grade: derived for the conditional obstruction and passage criterion below; inferred for the outgoing dominant balance.** These are mathematical comparisons of postulated kernels, not selection of an additional authorized equation variation. Set $c_f=1$, retain all simple positive-delay roots and absolute transmitter weighting, and write a radial contribution as

$$
\mathbf A=\sigma K_n r^n\frac{\mathbf n}{|D_t|},
\qquad [K_n]=L^{1-n}T^{-2}.
$$

Here $\mathbf n$ is the emission-to-receiver unit vector; its bold symbol is distinct from the exponent $n$. Comparing exponents with one inverse-square coefficient $G$ requires an explicit calibration length $L_*>0$: $K_n=G/L_*^{n+2}$. Thus $n=-2$ recovers the inverse-square law and $n=-1$ the logarithmic candidate. The latter coefficient has units of squared speed. No cap, self suppression, impulse or contact update is supplied.

## What the self-root measure proves

Assume two equal-magnitude opposite labels have mirror incoming histories and reach inward speed one together at positive separation. On each retained incoming history require positive distance from the original midpoint, $0\le u<1$ before the event, and $P(S)=S+y(S)\to-\infty$ in the remote past, as in the existing prepared histories. There is a simple persistent attractive partner root and no earlier self root. Match velocities continuously, allow the outgoing paths to differ, and require velocity to be absolutely continuous on compact intervals strictly after the event and to satisfy the ordinary-root equation almost everywhere there. As in the existing proof, continuity preserves the inward signs, and the positive partner contribution has a lower bound $m>0$ for each label. The equation would force $u(T)\ge1+m(T-T_*)$.

For each label let $P(T)=T+y(T)$, with $y$ its positive distance on its original side and $u=-y'$. The incoming $P$ increases and the forced outgoing $P$ decreases. Exactly one incoming self source $\tau<T_*$ solves $P(\tau)=P(T)$. Put $\rho=T-\tau$, $w_-=1-u(\tau)>0$, and $w_+=u(T)-1>0$. Root differentiation yields

$$
\rho'=\frac{w_-+w_+}{w_-},
\qquad
A_s=\frac{K_n\rho^n}{w_-},
\qquad
A_s\,dT=\frac{K_n\rho^n}{w_-+w_+}\,d\rho.
$$

Finite continuous velocity bounds $w_-+w_+$ above by $B<\infty$. Since $\rho\downarrow0$ at birth,

$$
\int_{T_*}^{T_0} A_s\,dT
\ge\frac{K_n}{B}\int_0^{\rho(T_0)}\rho^n\,d\rho
=+\infty\qquad(n\le-1).
$$

This contradicts a finite matching velocity. At $n=-1$ the lower bound diverges logarithmically; the denominator actually tends to zero and can strengthen the divergence. The result is conditional on the stated incoming history and root/sign hypotheses; it does not prove that every exponent or preparation reaches such an event. A finite nonnegative acceleration measure up to birth fails by the same lower bound.

For $n>-1$, the displayed lower bound is finite, but the exact integrand still contains the vanishing denominator $w_-+w_+$. Consequently this calculation proves no sufficiency direction. A proposed theorem asserting continuation for every $n>-1$ needs a construction and estimates for that denominator.

## What dominant balance suggests

Suppose additionally that the incoming speed approaches one with finite positive slope $a_*$, so $1-u(T_* -\delta)\sim a_*\delta$, and hypothesize an outgoing excess $w_+\sim b t^p$, where $t=T-T_*>0$ and $b,p>0$. The root identity equates the two accumulated gaps:

$$
\frac{a_*\delta^2}{2}\sim\frac{b t^{p+1}}{p+1}.
$$

In the regime $0<p<1$, one has $\rho\sim\delta\propto t^{(p+1)/2}$, and the self acceleration dominates the bounded partner input. Matching $w_+'$ with $A_s$ then gives

$$
p-1=\frac{(p+1)(n-1)}{2},
\qquad p=\frac{n+1}{3-n}.
$$

This regime is consistent only for $-1<n<1$. At $n=1$, self and partner terms can both contribute at order one; the linear-numerator construction supplies a separate worked case. For $n>1$, a regular partner-driven birth instead suggests $p=1$ and $A_s=O(t^{n-1})$; extending the self-dominated formula there is unjustified. At and below $n=-1$ the proposed continuous power balance fails, consistently with the proved obstruction. These balances are inferred asymptotics, not existence, uniqueness or branch-selection results.

## The other two comparisons

For passage on a simple root chart, write $b=\mathbf n\cdot(\mathbf V_i-\mathbf V_j)$. Exact root playback gives $dr/dT=b/D_t$. If $|b|$ stays bounded above and away from zero as $r\to0$, changing variables cancels the source denominator in the absolute accumulated contribution:

$$
|\mathbf A|\,dT=\frac{K_n r^n}{|b|}\,|dr|.
$$

Under these additional nondegeneracy assumptions, passage integrability is equivalent to $n>-1$. It is not a criterion for a stalled passage or an arbitrary singular root family.

On a slow one-root mirror chart, the first-order radial delay comparison has balance coefficient $n+1$. The [binary expansion](../../binary-research/analysis/logarithmic-first-order-circle-response.md) explains why: source displacement and transmitter weighting combine into $\mathbf n_0+\mathbf v_j+n(\mathbf n_0\cdot\mathbf v_j)\mathbf n_0$ in $c_f=1$ units. For radial source motion the correction vanishes at $n=-1$. This is a first-order statement with small source acceleration over the delay; it supplies no all-order energy invariant. Passage integrability and the sign change are proved under their own assumptions; a universal self-birth existence threshold remains open.

## Decision consequence and falsifiers

The inverse-distance candidate does not cure the existing collinear continuation obstruction. Parking that encounter route need not close other exponents or other geometries. Revising the exponent would be a named new hypothesis requiring operator selection and its own incoming and outgoing proofs. The present comparison does not change the deferred [LPR-006 disposition](../work-queue.md#lpr-006--research-disposition).

A matching finite-velocity continuation with complete retained roots and the stated regularity for $n\le-1$ would refute the obstruction. For $-1<n<1$, a rigorous construction with a different leading exponent would refute the proposed dominant balance while leaving the negative theorem intact. A vanishing $b$ invalidates the passage comparison's assumptions rather than falsifying its conditional conclusion.
