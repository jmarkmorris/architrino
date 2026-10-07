# A full affine comparison control for the account-sign limitation

**Derived blind reference.** This separate control was reconstructed before reading any new account subject. It supplements the [actual negative-branch continuation](authorized-cases-account-d-reference-negative-extension.md). Its purpose is logical: the complete current-affine row identities together with unsigned actual-minus-affine error allowances do not force a finite zero of the account on an outgoing slow tail, even with nonzero angular motion bounded away from zero. This is not a new physical history, a solution of the delayed canonical equation, or a counterexample to nominal dispersal.

## Preserve the full affine rows

Keep the same $K>0$ and $c_f=1$. Only for this mathematical comparison set $W=0$ and let $Z=dN$ move in a plane. Define $u=d'$, $H=|Z\times Z'|$, $v=H/d$ and

$$
g_v=\sqrt{1-H^2/(4d^2)}.
$$

The exact [current-affine identities](authorized-cases-ten-hour-d-primary-anisotropic-account.md), evaluated at current source velocities $\mp U/2$, give the following comparison differential equations with zero error vector:

$$
u'=\frac{H^2}{d^3}-\frac K{d^2}(2g_v+u),\qquad
H'=\frac K{d^2}H\left(1+\frac{u}{2g_v}\right),\qquad
\theta'=H/d^2.
\tag{1}
$$

The midpoint row vanishes exactly. Thus both radial and tangential affine rows are retained; this is stronger than assigning a scalar comparison radius which violates the radial equation. It still replaces actual sampled velocities by affine evaluations and therefore is not an allowed substitute for the physical dynamics. Setting the comparison errors to zero satisfies any of the accepted unsigned error upper bounds, but says nothing about their actual signed values.

## A parabolic outgoing comparison with negative account forever

Put $z=\sqrt{K/d}$, $h=H/K$, $P=(u/z)^2$ and select the positive branch $u=z\sqrt P$. In the variable $z$, equations (1) become

$$
zP'=8g_v-2P+4z\sqrt P-4h^2z^2,
\qquad
h'=-\frac{2h}{\sqrt P}-\frac{hz}{g_v},
\qquad
g_v=\sqrt{1-h^2z^4/4}.
\tag{2}
$$

For any chosen constant $h_\infty\ge1$, these equations have a regular solution on a sufficiently short interval $[0,z_0]$ with $P(0)=4$, $h(0)=h_\infty$. A direct integral construction avoids an unproved singular initial-value assertion:

$$
P(z)=4+z^{-2}\int_0^z
\left[8s(g_v(s)-1)+4s^2\sqrt{P(s)}-4h(s)^2s^3\right]ds,
\tag{3}
$$

$$
h(z)=h_\infty\exp\left[-\int_0^z
\left(\frac2{\sqrt{P(s)}}+\frac{s}{g_v(s)}\right)ds\right].
\tag{4}
$$

One may take $0<z_0\le[100(1+h_\infty^2)]^{-1}$. On the closed continuous-function rectangle $3\le P\le5$, $h_\infty/2\le h\le3h_\infty/2$, one has $g_v>.99$. The deviation of the right side of (3) from four is bounded by

$$
\frac{4\sqrt5}{3}z_0+\frac94h_\infty^2z_0^2+\frac34h_\infty^2z_0^4<.04.
$$

The exponent magnitude in (4) is below $2z_0$, so (4) also stays in the rectangle. In the norm $\max\{\|\delta P\|_\infty,\|\delta h\|_\infty/h_\infty\}$, the integral map is a contraction with constant below $1/10$. To check this directly, the $P$ derivative of the square-root term in (3) contributes at most $2z_0/(3\sqrt3)$; its $h$ terms contribute at most $3h_\infty^2z_0^2$ plus $h_\infty^2z_0^4$. Equation (4), divided by $h_\infty$, has $P$ coefficient at most $z_0/(3\sqrt3)$ and $h$ coefficient at most $h_\infty^2z_0^6$, since its exponential factor is at most one. Their row sums are far below $1/10$. These are conservative bounds, not target computations.

The fixed point is differentiable for $z>0$ and satisfies (2). Expansion of the integral equations at zero gives

$$
P=4+\frac83z+O(z^2),\quad
u=2z+\frac23z^2+O(z^3),\quad
h=h_\infty-h_\infty z+O(z^2).
\tag{5}
$$

Recover physical comparison time by

$$
\frac{dz}{dt}=-\frac{z^4\sqrt P}{2K}<0.
$$

The integral to $z=0$ takes infinite time. Therefore $d\to\infty$, $u>0$, $U\to0$, $H\to Kh_\infty>0$, and $d(t)\sim(3\sqrt K\,t)^{2/3}$ after a harmless finite origin shift.

For this comparison, the account has $g(W)=1$, which must not be confused with $g_v$ in the affine source rows. Hence

$$
J=\frac12(u^2+H^2/d^2)-(2+u)K/d
=-\frac23z^3+O(z^4).
\tag{6}
$$

After restricting $z_0$ further if necessary, $J<0$ for every finite future time and $J\to0$ from below. Alternatively its strict increase follows from the accepted exact account identity with zero comparison errors. On this small interval, member speeds are below $.01$, $\chi=z^2<.01$, and $\Lambda=h^2z^2<8$, so the same account lower bound $J'\ge(3/2)K^2/d^3$ applies. Nonzero angular motion may be made larger than any specified fixed floor by choosing $Kh_\infty/2$ above that floor and shortening the interval. This does not select a physical tail.

## What the control proves and what it cannot prove

The comparison satisfies the full affine radial and tangential identities, their algebraic account identity, the slow-region and angular-floor inequalities, and every unsigned actual-delay error allowance with error zero. Yet its account never crosses zero. Therefore those identities and error allowances alone cannot prove that every such outgoing tail has a finite account zero. A signed property of the actual delayed errors, a preparation-specific invariant/seed estimate, or some other actual-history restriction is needed to exclude this comparison mechanism from an attempted nominal sign proof.

This is a stronger logical control than the old $d\propto\sqrt t$ scalar example, because it respects the full comparison radial equation and angular equation. It does not establish compatibility with the original nominal prefix, complete actual delayed source windows, or any single physical supplied history. It does not show that the nominal branch remains negative, that dispersal fails, or that an all-future negative branch is impossible to handle without crossing zero. In fact the comparison itself disperses.

No new scientific instrument or target was run. The construction uses analytically known integral-map and asymptotic controls. Its falsifiers are a mistaken affine row, a failed contraction bound, a sign error in (2)–(6), or treating separately evaluated affine source histories as one actual coupled history. The companion actual continuation theorem preserves the true clocks; this deliberately labeled logical control does not replace it.
