# What the nonmirror scalar account controls before an outward exit

**Grade: derived candidate, awaiting independent assessment.** This note tests actual region admission for the [anisotropic scalar account](authorized-cases-ten-hour-d-primary-anisotropic-account.md). A nonpositive account supplies its own transverse-motion bound and a quantitative lower separation barrier. Neither bound closes the all-future midpoint-speed estimate. The latter is a precise gap in this proof route, not a coupled counterexample or evidence that dispersal fails.

## Explicit complete-history class

Fix one member of the accepted [slow mirror class](slow-binary-wider-regime.md), its $R_0>0$, $v_0=\epsilon$, source-fixed $K=4\epsilon^2R_0$, and $c_f=1$. Write its complete supplied pair as $\bar X_\pm:(-\infty,0]\to\mathbb R^3$. The reference plane is embedded in three-dimensional Euclidean space; perturbations may leave that plane and may change both members independently. Fix the common present position origin. For $\delta X_i=X_i-\bar X_i$, use the dimensionless norm

$$
\|\delta X\|_{\mathcal H}
=\max_{i\in\{+,-\}}\left\{
\frac{|\delta X_i(0)|}{R_0}
+\frac{\|\delta X_i'\|_{L^\infty(-\infty,0]}}{\epsilon}
+\frac{R_0}{\epsilon^2}
\|\delta X_i''\|_{L^\infty([-7R_0,0])}
\right\}.
\tag{1}
$$

The supplied positions and velocities are continuous, velocities are locally Lipschitz on the recent interval, and the complete velocity supremum is finite. The remote past need not have a bounded acceleration. The factor $[-7R_0,0]$ is the physical-time form of the accepted scaled interval $[-7\epsilon,0]$. The norm controls every past position difference through

$$
|\delta X_i(s)|\le |\delta X_i(0)|+|s|\|\delta X_i'\|_{L^\infty(-\infty,0]},\qquad s\le0.
\tag{2}
$$

Thus (1) does not truncate history. Small norm preserves a complete strict subfield speed bound and the ordinary partner/self census. Constant common spatial translation is fixed by the origin convention. A common velocity perturbation is allowed: its unbounded remote position drift is controlled by (2).

For every fixed finite time on the reference ordinary continuation, the usual local integral contraction gives a neighborhood in (1) whose actual continuation stays close on that finite interval. The roots remain in a finite sampled past interval; complete speed bounds keep their slope positive, and the local acceleration bound controls the change in sampled source velocity when a clock moves. This finite-time dependence uses neither a global jerk nor acceleration continuity at release. Both source clocks increase, since their derivatives are ratios of positive receiver and transmitter factors. The recent supplied interval is therefore enough for the release layer; later sampled times do not move farther into the remote past.

This statement gives finite-time neighborhoods only. No quantitative all-future radius is asserted. In particular the exact historical phase tokens have not been relabeled as the mirror reference or admitted into an unnamed neighborhood.

## Automatic bounds while the account is nonpositive

Adopt the notation of the account note:

$$
\mathcal J=\frac{u^2+|v|^2}{2}-\frac{2Kg}{d}-\frac{Ku}{d},
\quad \chi=\frac Kd,\quad \Lambda=\frac{d|v|^2}{K},
\quad g=\sqrt{1-|W-(N\cdot W)N|^2}.
\tag{3}
$$

Work on an actual generated interval where the complete member speed is at most $\beta=1/100$ and $\chi\le1/100$. If $\mathcal J\le0$, its definition gives

$$
|U|^2\le(4g+2u)\chi\le C\chi,
\qquad C=4+4\beta=\frac{101}{25},
\tag{4}
$$

because $u\le|U|\le2\beta$. Consequently

$$
\Lambda\le C<8.
\tag{5}
$$

The transverse boundary of the account region cannot be the first boundary reached while $\mathcal J\le0$. The account theorem then gives $\mathcal J'\ge(3/2)K^2/d^3$ on this interval.

Define $A=C^{-1/2}$ and

$$
\mathcal B=\mathcal J-A\chi^{3/2}.
\tag{6}
$$

Since $\chi'=-Ku/d^2$, differentiation and (4) give

$$
\mathcal B'
=\mathcal J'+\frac{3A}{2}\frac{K^{3/2}u}{d^{5/2}}
\ge\frac32\frac{K^2}{d^3}(1-A\sqrt C)=0.
\tag{7}
$$

Thus if $\mathcal J(T)\le0$, then until a speed boundary or a positive-account crossing,

$$
\chi(t)^{3/2}\le\chi(T)^{3/2}-\sqrt C\,\mathcal J(T),
\qquad
\chi(t)\le\left[\chi(T)^{3/2}-\sqrt C\,\mathcal J(T)\right]^{2/3}.
\tag{8}
$$

Whenever the right-hand side is strictly below $1/100$, the separation boundary $d=100K$ cannot occur first. This is a separation barrier derived without an angular-motion lower bound or a pointwise outward sign.

At the ideal circular release values $d=2R_0$, $|U|=2\epsilon$, $u=W=0$, one has $\chi=2\epsilon^2$ and $\mathcal J=-2\epsilon^2$. Substitution into (8) gives a scale $O(\epsilon^{4/3})$. This is an algebraic control of the barrier formula at the known circular state, not its application across the actual release interval. The actual account theorem requires generated source windows or a separately checked supplied-acceleration bound. Finite-time continuity supplies a route to such an entry time, but the exact entry constants must be retained when applying (8).

## Why the midpoint estimate still does not close

If the speed bound were known for all future time and the account stayed nonpositive, (5) and (8) would complete the account region and give $d(t)\to\infty$. The unresolved hypothesis is the common component of member velocity. Bound (4) controls only the relative component. The earlier [nonlinear midpoint estimate](authorized-cases-ten-hour-d-primary-nonlinear-center.md) has the form

$$
|W'(t)|\le B(t)\frac K{d(t)^2}
\sup_{s\in[t-d(t)/(1-\beta),t]}|W(s)|,
\tag{9}
$$

with bounded $B$ on this slow generated region. Its absolute integrating-factor bound asks for an upper bound on $\int K/d^2$. The signed account gives only $\int K^2/d^3<\infty$ if it remains bounded above.

The implication from the latter integral to the former is false. For the elementary comparison function $d(t)=D\sqrt{1+t/T_0}$, the cubic reciprocal is integrable and the square reciprocal is not; $D,T_0>0$ can make its speed as small as desired. This is a counterexample to an implication between scalar estimates, not an actual canonical solution. In fact its fixed-direction version generally violates the actual radial equation. It cannot be used to claim failure of physical dispersal or failure of a future proof that exploits that radial equation and the signed midpoint matrix together.

On every bounded-distance interval, an upper distance bound $d\le D_*$ converts the signed account into a finite midpoint amplification bound, since

$$
\int\frac K{d^2}\,dt\le\frac{D_*}{K}\int\frac{K^2}{d^3}\,dt.
\tag{10}
$$

The factor $D_*/K$ prevents taking an all-future distance limit in that argument. The [signed center first-variation calculation](authorized-cases-ten-hour-d-followup-signed-center.md) instead exploits cancellation along the actual mirror reference and avoids the large absolute exponent at linear grade. Its rotating matrix depends on the reference orbital angle and positive mirror angular motion. Applying that cancellation to a finite nonmirror trajectory requires its own control of the changing relative plane, angular rate, nonlinear coefficients, and both source windows. The scalar barriers above do not supply those controls.

## Positive-account crossing is a second distinct issue

At $\mathcal J=0$, equation (3) does not force $u\ge0$. The sign of radial motion at the crossing therefore cannot be inferred from the scalar sign. If one eventually proves a suitable outward state with positive margin, the independently accepted outgoing criterion can give an open dispersal neighborhood. No such finite state has been established here for the selected slow or literal historical member.

The possibility of an inward positive-account crossing is not itself a collision claim. An actual trajectory may turn outward. Proving that turn without loss of the ordinary chart requires control of the transverse dynamics or another separation argument beyond (8), whose premise is $\mathcal J\le0$. Conversely an inward crossing does not authorize modifying the law, suppressing roots, or replacing its past.

## Disposition of this bounded route

The account removes the leading anisotropy from the scalar derivative and supplies an automatic transverse bound and a lower-separation barrier on the nonpositive interval. The remaining global admission obligations are precise: a uniform nonlinear midpoint-speed bound over that interval, and a controlled transition after any positive-account crossing. No explicit all-future neighborhood in (1), exact coupled counterexample, or literal historical-source dispersal certificate follows from the current bounds.

Falsifiers are a missing term in differentiating (6), failure of the finite-history dependence while its strict root and Lipschitz margins hold, an actual nonpositive-account state violating (4)–(8), or an argument purporting to obtain a uniform midpoint bound from (10) without a uniform distance bound. The norm, root census, release regularity and scope of the elementary comparison function are part of the claim. No new numerical target or external physical premise was used.
