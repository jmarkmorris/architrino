# Characteristic-Split Independence of the Recoil Pullback

## Result and verdict

**PASS — the recoil transfer is split-gauge independent on P10's certified
branch neighborhood.** For two characteristic endpoint choices
$h_+^{(1)}$ and $h_+^{(2)}$, the residual-kernel difference is a homogeneous
characteristic term
$$
K_C^{(1)}-K_C^{(2)}=H_{12}^{(\eta)}(u),
\qquad
u=g+\frac{r}{c_f}=T_1-T_{\mathrm{em}},
$$
and therefore
$$
D H_{12}^{(\eta)}(u)=0,
\qquad
D=\partial_r-\frac{1}{c_f}\partial_g.
$$
It changes neither the receiver nor the source spatial Euler coefficient.
The recoil acceleration row and all three cut-transfer rates are consequently
independent of $h_+$ under compact-interior or period-matched boundary
conventions. The momentum and angular-momentum increment differences vanish
identically. The energy increment difference is a cut-constant; for a
compactly supported mollifier with both endpoints outside the support, that
constant is zero because the two kernels are identical.

For a noncompact mollifier, the endpoint strip can leave an exponentially or
otherwise tail-suppressed $H_{12}^{(\eta)}(u)$. That term may change the
chosen zero of residual wake energy, but not its cut derivative. If a finite
history boundary intersects the strip contribution, its effect is a declared
endpoint flux rather than an interior recoil row.

**Claim grade: derived for the same retained branch tube, the same retained
ordered-pair rows, fixed characteristic endpoints, P10's regularity and
integrability assumptions, and compact-interior or period-matched cuts.**

**Falsifier:** The verdict is overturned by any admissible pair of
characteristic endpoints for which $D(K_C^{(1)}-K_C^{(2)})\ne0$, by a nonzero
spatial gradient of the difference kernel, or by a nonzero cut-derivative
difference after all declared outer-endpoint faces have been removed or
period matched. The calculations below exclude those mechanisms on the
declared neighborhood.

No numerical runs were used.

## 1. Common branch chart and difference convention

Use P10's reduced variables
$$
g=T_1-T_{\mathrm{em}}-\frac{r}{c_f},
\qquad
u=g+\frac{r}{c_f}=T_1-T_{\mathrm{em}},
\qquad
D=\partial_r-\frac{1}{c_f}\partial_g.
$$
For $a\in\{1,2\}$, let
$$
K_{\mathrm{scale}}^{(a,\eta)}(r,g)
=
\int_{-h_+^{(a)}}^g
\frac{\delta_\eta(s)}{c_f(u-s)^2}\,ds,
$$
$$
K_C^{(a,\eta)}(r,g)
=
K_0^{(\eta)}(r,g)-K_{\mathrm{scale}}^{(a,\eta)}(r,g),
\qquad
K_0^{(\eta)}(r,g)=\frac{\delta_\eta(g)}{r}.
$$
Both choices are made on the same retained branch tube $\mathfrak B$. In
particular, the active ordered-pair rows, causal ordering, separation floor,
source-normal floor, receiver-normal floor, inactive-root gap, mollifier, and
outer action boundary convention are held fixed. Only the scalar
characteristic endpoint changes.

Write
$$
\Delta_{12}F\equiv F^{(1)}-F^{(2)}.
$$
Endpoint-clear means that each $-h_+^{(a)}$ lies strictly on the negative-$s$
side of the causal surface and outside the retained causal-support tube. For
a compactly supported approximate identity this is the exact condition
$$
\operatorname{supp}\delta_\eta\cap
\left[-\max(h_+^{(1)},h_+^{(2)}),
-\min(h_+^{(1)},h_+^{(2)})\right]
=\varnothing.
$$
For a noncompact approximate identity, the corresponding statement is a
uniform tail bound on this same strip; it is not exact finite-$\eta$
clearance.

**Claim grade: definition plus P10's certified-chart assumptions.**

**Falsifier:** If the two choices alter the retained row set or any branch
floor, their difference is not a split-gauge comparison on one chart and the
argument below does not apply.

## 2. Exact two-split kernel difference

Direct subtraction gives
$$
\begin{aligned}
\Delta_{12}K_C^{(\eta)}(r,g)
&=-\Delta_{12}K_{\mathrm{scale}}^{(\eta)}(r,g)\\
&=-\left[
\int_{-h_+^{(1)}}^g-
\int_{-h_+^{(2)}}^g
\right]
\frac{\delta_\eta(s)}{c_f(u-s)^2}\,ds\\
&=
\int_{-h_+^{(2)}}^{-h_+^{(1)}}
\frac{\delta_\eta(s)}{c_f(u-s)^2}\,ds\\
&\equiv H_{12}^{(\eta)}(u).
\end{aligned}
$$
The oriented integral makes this formula valid in either ordering of the two
endpoints. The auxiliary $s$-support of the difference lies in
$$
I_{12}
=
\left[-\max(h_+^{(1)},h_+^{(2)}),
-\min(h_+^{(1)},h_+^{(2)})\right]
\subset(-\infty,0).
$$
Thus the difference is generated strictly off the causal surface $s=0$.
For a compactly supported mollifier with both endpoints clear in the exact
sense above,
$$
\boxed{H_{12}^{(\eta)}(u)=0.}
$$

For a noncompact mollifier, $H_{12}^{(\eta)}$ need not vanish at finite
$\eta$. The precise support statement is then that its generating
$s$-strip is off $s=0$ and that the result has no causal-surface delta or
delta-derivative component. It would be incorrect to claim that the ordinary
support of the resulting smooth function $H_{12}^{(\eta)}(u)$ is disjoint
from the set $g=0$: a smooth characteristic term can be evaluated there.
The Euler-relevant statement is stronger and exact:
$$
Du
=
\left(\partial_r-\frac{1}{c_f}\partial_g\right)
\left(g+\frac{r}{c_f}\right)
=0,
$$
so
$$
\boxed{
D\Delta_{12}K_C^{(\eta)}
=D H_{12}^{(\eta)}(u)
=0.
}
$$
Because $u=T_1-T_{\mathrm{em}}$ contains no worldline position,
$$
\nabla_{\mathbf X_i(T_1)}H_{12}^{(\eta)}(u)=\mathbf0,
\qquad
\nabla_{\mathbf X_j(T_{\mathrm{em}})}H_{12}^{(\eta)}(u)=\mathbf0.
$$
It follows for the full ordered-pair first variation that
$$
\boxed{
\Delta_{12}\mathbf R_{C,i}^{(\eta)}(T)=\mathbf0
}
$$
for every retained receiver and every cut in the certified neighborhood.

The sharp-limit behavior is also controlled. Put
$d=\min(h_+^{(1)},h_+^{(2)})>0$. For $u\ge0$ and $s\in I_{12}$,
$u-s\ge d$, hence
$$
\left|H_{12}^{(\eta)}(u)\right|
\le
\frac{1}{c_fd^2}
\int_{I_{12}}|\delta_\eta(s)|\,ds,
$$
and
$$
\left|\frac{dH_{12}^{(\eta)}}{du}(u)\right|
\le
\frac{2}{c_fd^3}
\int_{I_{12}}|\delta_\eta(s)|\,ds.
$$
The tail mass on $I_{12}$ tends to zero for an approximate identity centered
at $s=0$. Therefore both $H_{12}^{(\eta)}$ and its first $u$-derivative
vanish uniformly on the causal half-line in the sharp limit; for exact
compact support they already vanish once the support radius is below $d$.

**Claim grade: derived.**

**Falsifier:** A sign error is exposed by differentiating the two original
integrals and checking the oriented strip. A failure of $D H_{12}=0$ would
require the endpoint difference to depend on something other than the
characteristic invariant $u$. A nonvanishing sharp-limit term would require
nonzero approximate-identity mass to remain a fixed positive distance from
$s=0$.

## 3. Difference of the three cross-cut increments

Restore the ordered-pair weight
$$
A_{ij}\equiv
\frac{\kappa\sigma_{ij}|q_iq_j|}{c_f}.
$$
On the causal half-plane $u>0$, the weighted residual-kernel difference is
$$
\Delta_{12}\mathcal K_{C,ij}^{(\eta)}
=
A_{ij}\Theta(u)H_{12}^{(\eta)}(u).
$$
The cross-cut domain satisfies
$T_{\mathrm{em}}\le T_*<T_1$, so $u>0$ everywhere in its interior. The
coincident face $u=0$ is therefore absent, including for a self-pair under
P10's trivial-coincidence exclusion.

The momentum difference is
$$
\begin{aligned}
\Delta_{12}\mathbf P_{\mathrm{wake},C}^{(\eta)}(T_*)
&=-\frac12\sum_{i,j}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\nabla_{\mathbf X_i(T_1)}
\Delta_{12}\mathcal K_{C,ij}^{(\eta)}
\,dT_{\mathrm{em}}\,dT_1\\
&=\mathbf0.
\end{aligned}
$$
The angular-momentum difference is likewise
$$
\begin{aligned}
\Delta_{12}\mathbf J_{\mathrm{wake},C}^{(\eta)}(T_*)
&=-\frac12\sum_{i,j}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\mathbf X_i(T_1)\times
\nabla_{\mathbf X_i(T_1)}
\Delta_{12}\mathcal K_{C,ij}^{(\eta)}
\,dT_{\mathrm{em}}\,dT_1\\
&=\mathbf0.
\end{aligned}
$$

Only the energy increment can acquire a nonzero normalization shift. Since
the cross-cut interior has $u>0$,
$$
\partial_{T_1}\left[\Theta(u)H_{12}^{(\eta)}(u)\right]
=
\frac{dH_{12}^{(\eta)}}{du}(u),
$$
with
$$
\frac{dH_{12}^{(\eta)}}{du}(u)
=
-2\int_{-h_+^{(2)}}^{-h_+^{(1)}}
\frac{\delta_\eta(s)}{c_f(u-s)^3}\,ds.
$$
Therefore
$$
\boxed{
\Delta_{12}E_{\mathrm{wake},C}^{(\eta)}(T_*)
=
\frac12\sum_{i,j}A_{ij}
\int_{X_{ij}^{\mathfrak B}(T_*)}
\frac{dH_{12}^{(\eta)}}{du}(T_1-T_{\mathrm{em}})
\,dT_{\mathrm{em}}\,dT_1.
}
$$
This is a history-energy normalization term. It contains no worldline
position or velocity and supplies no recoil acceleration. Under exact
compact-support clearance, $H_{12}^{(\eta)}=0$ and all three increment
differences vanish identically.

**Claim grade: derived from P10's cross-cut definitions.**

**Falsifier:** A nonzero momentum or angular-momentum difference would require
$u$ to depend on a worldline position. It does not. An additional
$\delta(u)H_{12}(0)$ energy term would require inclusion of the excluded
coincident face; if a different chart includes that face, it must be carried
as a declared endpoint-contact term rather than an interior recoil transfer.

## 4. Cut derivatives: no interior dependence

Subtract P10's three Noether cut identities for the two residual kernels.
Because the residual acceleration row is identical for both splits,
$$
\frac{d}{dT_*}
\Delta_{12}E_{\mathrm{wake},C}^{(\eta)}
=
\Delta_{12}\mathcal B_E^{(\eta)},
$$
$$
\frac{d}{dT_*}
\Delta_{12}\mathbf P_{\mathrm{wake},C}^{(\eta)}
=
\Delta_{12}\boldsymbol{\mathcal B}_P^{(\eta)},
$$
$$
\frac{d}{dT_*}
\Delta_{12}\mathbf J_{\mathrm{wake},C}^{(\eta)}
=
\Delta_{12}\boldsymbol{\mathcal B}_J^{(\eta)}.
$$
There is no omitted interior term. At the kernel level its absence is the
pair of exact identities
$$
\left(\partial_{T_1}+\partial_{T_{\mathrm{em}}}\right)
H_{12}^{(\eta)}(T_1-T_{\mathrm{em}})=0,
\qquad
\nabla_{\mathbf X_i}H_{12}^{(\eta)}=\mathbf0.
$$
Simultaneous time translation therefore converts the energy difference into
outer faces only, while spatial translation and rotation produce no density
at all.

### Compact-interior cuts

P10's compact-interior convention keeps the mollifier support tube, both
characteristic endpoints, the transposed future reception, and every
admitted variation away from the outer action boundary. Thus each split has
$$
\mathcal B_E^{(a,\eta)}
=
\boldsymbol{\mathcal B}_P^{(a,\eta)}
=
\boldsymbol{\mathcal B}_J^{(a,\eta)}
=0.
$$
Consequently,
$$
\boxed{
\frac{d}{dT_*}
\Delta_{12}
\left(
E,\mathbf P,\mathbf J
\right)_{\mathrm{wake},C}^{(\eta)}
=
\left(0,\mathbf0,\mathbf0\right).
}
$$
On every connected compact-interior cut window,
$$
\Delta_{12}
\left(
E,\mathbf P,\mathbf J
\right)_{\mathrm{wake},C}^{(\eta)}
=
\left(C_{E,12}^{(\eta)},\mathbf0,\mathbf0\right),
$$
where $C_{E,12}^{(\eta)}$ is independent of the cut. Exact compact-support
clearance gives $C_{E,12}^{(\eta)}=0$.

### Period-matched cuts

Under P10's period-matched convention, the outgoing outer face of one period
is identified with the incoming outer face of the next period using the same
retained ordered-pair rows. The $H_{12}(u)$ density is invariant under the
simultaneous shift
$(T_1,T_{\mathrm{em}})\mapsto(T_1+P,T_{\mathrm{em}}+P)$, so its two matched
energy faces cancel. Its spatial faces vanish before matching. Hence the same
boxed zero cut-derivative identity holds on the period quotient, and the
energy difference is again only a cut-constant.

### Unmatched finite endpoints

If an outer history boundary is not compact-clear or period matched, the
same calculation yields
$$
\frac{d}{dT_*}
\Delta_{12}
\left(E,\mathbf P,\mathbf J\right)_{\mathrm{wake},C}^{(\eta)}
=
\Delta_{12}
\left(\mathcal B_E,
\boldsymbol{\mathcal B}_P,
\boldsymbol{\mathcal B}_J\right)^{(\eta)}.
$$
This is a declared endpoint flux. It is not an interior dependence and cannot
be reclassified as recoil. For the present $H_{12}(u)$ term, only the energy
entry can be nonzero.

**Claim grade: derived under P10's two admitted cut conventions; derived as
an endpoint-flux identity for unmatched finite boundaries.**

**Falsifier:** Hold the retained row set and all outer faces fixed, then
differentiate the explicit cross-cut domains. Any term not expressible as a
cut face or an outer action-boundary face would be an interior dependence and
would refute the result. The two displayed invariance identities leave no
such term.

## 5. Physical consequence for P10 and P11

The endpoint choice cannot move any part of the local residual acceleration
between the scale and recoil rows:
$$
D K_{\mathrm{scale}}^{(1,\eta)}
=
D K_{\mathrm{scale}}^{(2,\eta)}
=
-\frac{\delta_\eta(g)}{r^2},
$$
$$
D K_C^{(1,\eta)}
=
D K_C^{(2,\eta)}
=
-\frac{\delta_\eta'(g)}{c_fr}.
$$
The endpoint freedom changes only a homogeneous characteristic term in the
action split. That term fixes, at most, the additive zero of the residual
wake energy or a declared finite-window endpoint flux.

**Verdict: split-gauge independent on the certified neighborhood.** The
recoil acceleration row and its energy, momentum, and angular-momentum
transfer rates are physical properties of the pure scalar action on this
neighborhood, not artifacts of the choice of $h_+$. P10's pass remains an
action derivation of the recoil-inclusive second-order law on its stated
scope. The absolute value assigned to
$E_{\mathrm{wake},C}^{(\eta)}$ retains the ordinary freedom to choose an
additive history-energy constant; that freedom does not change a transfer.

The P10 adjudication's Darwin-order estimate is not used in this proof.
**Inferred consequence:** because the recoil row itself is endpoint
independent, a P11 recoil-inclusive Darwin-order comparison is well defined
provided it uses this same action kernel, retained branch chart, mollifier,
and cut convention. The present lemma does not perform or validate that
comparison.

**Claim grade: derived for the split-independence verdict; inferred for the
P11 workflow consequence.**

**Falsifier:** P10 would be demoted to a bookkeeping construction if two
admissible endpoints produced different $D K_C$ rows or different
compact-interior or period-matched cut derivatives. Neither occurs in the
exact difference formulas above.

## 6. Extension beyond the certified neighborhood

No additional structure is needed inside P10's certified branch
neighborhood beyond its existing endpoint-clear, fixed-row, positive-floor,
and cut-boundary assumptions. Extending the independence statement beyond
that neighborhood requires the following controls.

1. **Characteristic endpoint control.** Every continued endpoint must remain
   characteristic:
   $$
   D R_+(u)=0.
   $$
   A non-characteristic endpoint contributes an interior Euler source
   proportional to $D R_+$ and changes the acceleration law. This condition
   is necessary, not optional bookkeeping.

2. **Branch-transition control.** A continuation through root birth, root
   death, branch merger, or loss of a source-normal or receiver-normal floor
   must specify the same retained rows on both sides or expose the transition
   as a separate flux. The present proof cannot cross a branch-count change
   by continuity because its common-domain subtraction would no longer be
   defined.

3. **Global endpoint normalization.** On overlapping regular branch
   neighborhoods, the endpoint conventions must agree up to a homogeneous
   $H(u)$ term, and the additive wake-energy constants must be fixed once or
   related explicitly on overlaps. This is needed for one global absolute
   wake-energy value, though not for local transfer-rate independence.

4. **Noncompact-mollifier tail control.** Gaussian or other noncompact
   regularizations require a uniform bound on the endpoint-strip tail mass,
   justification for differentiation under the cross-cut integral, and the
   characteristic normalization that cancels any finite-endpoint boundary
   term. These bounds must survive the $\eta\to0^+$ limit on the continued
   chart.

5. **Outer-boundary ledger.** A finite history window that is neither
   compact-interior nor period matched must retain the energy endpoint flux
   generated by $H(u)$. Independence then means equality modulo that declared
   flux, not its silent deletion.

The first and fifth requirements are derived necessities: violating either
creates an interior source or hides a boundary flow. The second through
fourth are inferred requirements for a global theorem. Their sufficiency
beyond all branch transitions remains an open derivation target; this file
does not claim global split independence across an uncertified root topology.

**Claim grade: derived for the local necessity of characteristic endpoints
and declared boundary flux; inferred as a sufficient-structure program for a
global extension.**

**Falsifier:** A global extension fails wherever an endpoint ceases to be
characteristic, an overlap changes the retained row set without a transition
flux, the noncompact tail does not vanish uniformly, or two overlap
normalizations yield different cut derivatives after their declared endpoint
fluxes are included.
