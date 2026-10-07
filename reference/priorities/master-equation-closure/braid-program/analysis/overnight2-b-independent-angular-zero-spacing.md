# Independent angular zero-spacing review

## Verdict and scope

**Derived and independently accepted, without repair.** The [frozen angular zero-spacing theorem](overnight2-b-angular-zero-spacing.md) correctly rewrites the normalized simultaneous limiting equation and proves the strict gap bound
$$
\theta_b-\theta_a<\pi\sqrt{2/3}
$$
between consecutive axial zeros of any regular nonplanar radial/axial periodic orbit with $\ell>0$. Its cyclic count and winding consequences are valid. The comparison calculation establishes the stronger intermediate coefficient bound $q>59/38>3/2$, although the stated weaker spacing estimate is sufficient and correct.

The scenario is the already derived normalized limiting equation with $K=c_f=1$. This review uses its canonical simultaneous acceleration and the [independently accepted height/radius bounds](overnight2-b-independent-height-confinement.md). It does not introduce an external dynamical law, use a numerical shooting output, or extend the result to arbitrary finite-speed causal-delay histories. The frozen subject SHA-256, measured by native `shasum -a 256`, is `eec69917d80e311c09f91614a3d15b145fefbac8b81822a2c82af40f93f9c867`.

## Independent angular differentiation

Let $r>0$, $\dot\theta=\ell/r^2$ and $\ell>0$ on the regular normalized orbit. Put $s=1/r$ and $h=z/r$. The angular change of variable is legitimate because $\theta$ is strictly increasing. Its derivative operator is
$$
\frac d{d\chi}=\ell s^2\frac d{d\theta},
$$
where dots below mean $\chi$ derivatives. Differentiating $r=1/s$ and $z=h/s$ gives
$$
\dot r=-\ell s_\theta,\qquad\ddot r=-\ell^2s^2s_{\theta\theta},
$$
$$
\dot z=\ell(sh_\theta-hs_\theta),\qquad
\ddot z=\ell^2s^2(sh_{\theta\theta}-hs_{\theta\theta}).
$$
The mixed terms cancel on the second differentiation of $z$. There is no omitted derivative of $\ell$, since it is constant in the limiting equation.

Write $A_r^{(0)}=a_r(h)s^2$, $A_z^{(0)}=a_z(h)s^2$. Substitution into $\ddot r=\ell^2s^3+a_rs^2$ yields $s_{\theta\theta}+s=-a_r/\ell^2$. Substitution into $\ddot z=a_zs^2$ and elimination of $s_{\theta\theta}$ then gives
$$
\ell^2s(h_{\theta\theta}+h)=a_z-ha_r.
$$
For the canonical coefficient functions,
$$
a_z-ha_r=
-\frac{4h}{(1+4h^2)^{3/2}}-\frac h{4(1+h^2)^{3/2}}
-\frac h{\sqrt3}+\frac h{(1+4h^2)^{3/2}}+\frac h{4(1+h^2)^{3/2}}
=-h\left[\frac1{\sqrt3}+\frac3{(1+4h^2)^{3/2}}\right].
$$
The two diametric terms cancel and the neighbor terms retain coefficient $-3h$. Thus
$$
h_{\theta\theta}+q(\theta)h=0,\qquad
q=1+\frac r{\ell^2}\left[\frac1{\sqrt3}+\frac3{(1+4h^2)^{3/2}}\right].
$$
This derivation does not divide by $h$, so the equation remains valid at its zeros. The coefficient $q$ is continuous along the whole regular orbit.

## Strict coefficient comparison

The accepted negative-first-integral theorem supplies $|h|<h_U<9/8$ and $r>\ell^2/(2c_0)$, with $c_0=5/4-1/\sqrt3>0$. Since $3<49/16$, one has $\sqrt3<7/4$, so $1/\sqrt3>4/7$ and
$$
0<2c_0=\frac52-\frac2{\sqrt3}<\frac52-\frac87=\frac{19}{14}.
$$
It follows that $r/\ell^2>1/(2c_0)>14/19$. Meanwhile $1+4h^2<97/16$ and $97<100$ give
$$
(1+4h^2)^{3/2}<\frac{97\sqrt{97}}{64}<\frac{485}{32},\qquad
\frac3{(1+4h^2)^{3/2}}>\frac{96}{485}.
$$
The remaining rational comparison is exact:
$$
\frac47+\frac{96}{485}-\frac34
=\frac{7760+2688-10185}{13580}=\frac{263}{13580}>0.
$$
Therefore
$$
q>1+\frac{14}{19}\frac34=\frac{59}{38}=\frac32+\frac1{19}>\frac32.
$$
The reciprocal inequality directions are correct because all compared quantities are positive. This is an analytical bound on every phase, not a sampled coefficient estimate or an approximate scalar-root calculation.

## Simple zeros and the direct comparison proof

The normalized axial equation can be written $\ddot z=-a(r,z)z$, with $a$ continuous and positive on each regular periodic orbit. A nonzero solution cannot remain nonnegative throughout a period, since then $\int a(r,z)z\,d\chi>0$ would contradict the zero period integral of $\ddot z$. The nonpositive case is analogous. Hence every nonplanar periodic orbit has both positive and negative heights.

If a zero also had $\dot z=0$, smooth uniqueness of the full normalized system on $r>0$ would identify the solution with its planar continuation having the same radial data and angular constant. It would be planar on its entire connected regular continuation, contrary to the hypothesis. Thus every height zero is simple. At a zero,
$$
h_\theta=\frac{r\dot z-z\dot r}{\ell}=\frac{r\dot z}{\ell}\ne0.
$$
Consequently the corresponding angular zero is simple as well.

Choose consecutive angular zeros $a<b$. Replacing the scalar solution by its negative if needed, it is positive on $(a,b)$. Let $\alpha=\sqrt{3/2}$ and $v(\theta)=\sin(\alpha(\theta-a))$. If $b-a\ge\pi/\alpha$, both $h$ and $v$ are strictly positive on $(a,L)$, where $L=a+\pi/\alpha$. Direct differentiation of $\mathcal W=h_\theta v-hv_\theta$ gives
$$
\mathcal W_\theta=h_{\theta\theta}v-hv_{\theta\theta}=(\alpha^2-q)hv<0.
$$
At $a$, both $h$ and $v$ vanish, so $\mathcal W(a)=0$. The continuous strictly negative integrand has negative integral, hence $\mathcal W(L)<0$. But $v(L)=0$, $v_\theta(L)=-\alpha$ and $h(L)\ge0$, giving $\mathcal W(L)=\alpha h(L)\ge0$. This contradiction handles both $b>L$ and the equality case $b=L$. Therefore $b-a<\pi\sqrt{2/3}$ strictly.

Only the continuous coefficient equation and the stated strict comparison were used; no external oscillation theorem or unexamined physical frequency law was imported.

## Finite cyclic count and winding

Count zeros once on a half-open time period $[\chi_0,\chi_0+T)$, or equivalently on the phase circle. Infinite zeros on that compact circle would have an accumulation point. Continuity would make the value zero there, and the difference quotient along accumulating zeros would make the derivative zero, contradicting simplicity. Periodic extension handles accumulation at a chosen endpoint. Hence the count is finite.

Each simple zero reverses sign. Periodicity requires return to the starting sign, so the count is even, $2N$, with $N\ge1$ for a nonplanar orbit. This definition of $N$ as half the simple-zero count is sufficient even when the individual positive and negative excursions have different sizes or durations.

Since $r$ is $T$-periodic, $\dot\theta=\ell/r^2$ is periodic and positive, and $\theta(\chi+T)-\theta(\chi)=\Delta\theta$ is a positive constant. Thus $h$ as an angular function is periodic with angular period $\Delta\theta$. Sum the strict gap estimate over all $2N$ consecutive pairs, including the last zero paired with the first zero translated by $\Delta\theta$. Those gaps sum exactly to $\Delta\theta$, yielding
$$
\Delta\theta<2\pi N\sqrt{2/3}.
$$
The chosen radial/axial period need not be minimal; using a multiple multiplies both the zero count and the angle advance consistently. In the real periodic phase convention of the six paths, $\theta=(b/k)\phi+p(\phi)$ up to a constant. A full phase period gives $\Delta\theta=2\pi b/k$, and therefore $b/k<N\sqrt{2/3}$.

If an individual labeled spatial path returns to its position after this same period, $r>0$ requires $\Delta\theta=2\pi m$ for an integer $m$. Positivity of $\dot\theta$ gives $m\ge1$. Thus
$$
N>m\sqrt{3/2}.
$$
For $m=1$, integer $N$ must be at least two. Relative periodicity alone does not give an integer $m$, and return of an unlabeled configuration through a member permutation is not the individual positional closure used here. If individual closure occurs only after several radial/axial periods, use that combined period and its corresponding combined count. These distinctions leave the real-valued angle inequality valid in every stated radial/axial period.

## Falsifiers, preservation and verification boundary

A wrong angular differentiation, a noncancelling diametric coefficient, an invalid use of the height/radius bounds, a reversed positive reciprocal inequality, a failure of the Wronskian derivative or endpoint sign, or omission of the cyclic final gap would overturn the corresponding step. A regular nonplanar periodic normalized limiting orbit with $\ell>0$ and a consecutive angular gap at least $\pi\sqrt{2/3}$ would falsify the theorem. The report displays each derivative, rational comparison and boundary term needed to check these obligations.

The theorem applies to normalized limiting orbits, including relative periodic ones. Through the accepted compact exact-family reduction it restricts their possible limits, but it does not assert this spacing for arbitrary finite-speed causal-delay trajectories. Tracking the same zero count along a sequence requires the relevant convergence and simple-zero preservation; no numerical proposal's count is certified here. The planar case, $\ell=0$, singular radius and nonperiodic motion are outside the assertion.

The complete evidence is this independently reconstructed analytical proof. No new arithmetic companion, numerical target, runtime receipt or background process was required; the finite rational calculations are displayed directly. This file is the sole authored deliverable. The frozen subject, previous independent reports, parent account, numerical evidence and shared owners were not edited. No recursive delegation, production run, regular tests, generator or Git mutation was used. No retained evidence was moved, removed or replaced, and no remote-backup or replay claim is made. Parent integration is the remaining disposition step for this bounded review.

## Separately adjudicated coefficient-box corollary

**Derived and independently accepted.** The parent additionally requested review of “Angular zero spacing and a coefficient-box corollary” in the [receiving research account](overnight2-b-followup-and-research-2026-10-07.md). Its zero count and uniform existential exclusion are correct. This extension is recorded separately from the frozen angular theorem; neither subject nor receiving account was edited.

Use the slow scaling $\beta=\epsilon b_0$, $\kappa=\epsilon k_0$ and the profiles
$$
\rho=1+a\cos2\phi+b\sin2\phi,\quad p=c\cos2\phi+d\sin2\phi,\quad
\zeta=H\cos\phi+e\cos3\phi+f\sin3\phi.
$$
Here the coefficient $b$ in $\rho$ is distinct from the positive base rotation rate $b_0$. The closed box is
$$
|a|,|b|\le\frac3{50},\quad |c|,|d|\le\frac1{10},\quad |e|,|f|\le\frac1{25},\quad
\frac14\le H\le\frac34,
$$
$$
\frac3{20}\le b_0\le\frac12,\qquad \frac2{25}\le k_0\le\frac7{20}.
$$
The restrictions on base rates refer to this slow scaling, not to a lower bound on the actual rates $\epsilon b_0$ and $\epsilon k_0$.

Write $d_3=e\cos3\phi+f\sin3\phi$ and $g=\sqrt{e^2+f^2}\le\sqrt2/25$. Direct trigonometric Cauchy–Schwarz gives $|d_3|\le g$ and $|d_3'|\le3g$. Outside the two closed intervals
$$
I_1=[\pi/3,2\pi/3],\qquad I_2=[4\pi/3,5\pi/3],
$$
the cosine has absolute value at least $1/2$; the same endpoint estimate holds on their boundaries. The fundamental term therefore has magnitude at least $H/2\ge1/8>\sqrt2/25\ge g$. The strict comparison follows from $1/64>2/625$, or $625>128$. Thus $\zeta$ has the cosine's sign there, including all four interval endpoints.

On $I_1$, $\sin\phi\ge\sqrt3/2$, so $\zeta'\le-H\sqrt3/2+3g$. On $I_2$, $\sin\phi\le-\sqrt3/2$, so $\zeta'\ge H\sqrt3/2-3g$. These inequalities have a uniform strict margin because
$$
H\sqrt3/2\ge\sqrt3/8>3\sqrt2/25\ge3g,
$$
$$
(\sqrt3/8)^2-(3\sqrt2/25)^2
=\frac3{64}-\frac{18}{625}=\frac{723}{40000}>0.
$$
Every number being squared is nonnegative. Hence $\zeta$ is strictly decreasing on $I_1$ and strictly increasing on $I_2$, with opposite signs at each interval's two endpoints. Continuity gives one zero in each interval; strict monotonicity gives uniqueness, and the derivative margin makes each zero simple. There are no zeros elsewhere. This proves exactly two simple zeros per full phase period throughout the entire closed coefficient box, not merely near its center or for generic coefficients.

The coefficient and base-rate box is compact, and imposing $b_0/k_0\ge\sqrt{2/3}$ leaves a closed compact subset because $k_0$ has a positive lower bound. The profiles have uniform bounds of every fixed derivative order. In particular
$$
\rho\ge1-|a|-|b|\ge\frac{22}{25}>0,\qquad
\rho\le\frac{28}{25},\qquad |\zeta|\le\frac34+\frac2{25}=\frac{83}{100}.
$$
Thus all the common bounds required by the independently accepted compact exact-family reduction hold uniformly on this restricted box.

Suppose a sequence of exact canonical members existed with $\epsilon_n\to0^+$, parameters in that closed restricted box and arbitrary positive scales $R_n$. The compact-family result bounds $R_n\epsilon_n^2$ above and away from zero; its exact-balance argument gives a subsequence converging in $C^2$ to a regular normalized periodic limiting orbit. In this finite Fourier family one can also extract the coefficient limits directly, so the limit remains in the same closed box. The rate limits retain $b_0/k_0\ge\sqrt{2/3}$. The direct zero-count proof above applies to the limit itself and gives $N=1$; no numerical continuation of individual zeros is required. Positive base rotation gives $\ell>0$, and the angular theorem would require
$$
\frac{b_0}{k_0}<N\sqrt{2/3}=\sqrt{2/3},
$$
a contradiction. The equality boundary of the imposed rate restriction is excluded because the angular bound is strict.

This sequence contradiction gives the stated uniform quantifiers: there exists $\epsilon_0>0$, depending on the fixed box, such that for every $0<\epsilon<\epsilon_0$, every parameter choice in the closed rate-restricted box and every $R>0$, the prescribed six-member histories fail exact canonical balance. If that statement failed, choosing one exact member with $0<\epsilon_n<1/n$ for each $n$ would supply the prohibited sequence. The scale is not assumed bounded beforehand; compactness of $R_n\epsilon_n^2$ is a consequence of exactness.

The threshold is existential and no numerical value is provided. This is a uniform sufficiently-small-speed exclusion for the specified rate-restricted Fourier family; it is not an all-speed exclusion, a result for the complementary rate region, or a theorem about arbitrary profile families. A wrong uniform zero-count margin, nonclosed limiting parameter restriction, failure of the compact exact-family reduction, or an exact sequence within this box approaching zero speed would falsify the corresponding implication. No optimizer failure, shooting count or numerical proposal is evidence for the corollary. Its proof is entirely analytical, and no additional computation or evidence replacement was introduced.

Final scoped verification: native `shasum -a 256` reproduced the frozen angular subject identity above after both reviews. Native `git diff --no-index --check /dev/null` emitted no whitespace diagnostic for this report; exit one denotes the new-file difference. The exact algebra, rational margins, cyclic count and compactness contradiction are displayed for direct checking. No program or numerical target was needed, so there is no new arithmetic-control sequence, local runtime receipt or resource estimate to report. The subject, all prior evidence and shared owners remain unchanged by this review.
