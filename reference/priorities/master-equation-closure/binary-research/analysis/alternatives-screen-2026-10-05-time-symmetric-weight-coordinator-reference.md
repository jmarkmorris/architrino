# Unequal past/future weights exclude nearby periodic binaries

Prospective independently derived reference, 2026-10-05. This is a sensitivity theorem for the Section 14 mathematical family, not a new causal preparation or adoption of an equation. The independently assigned weight analysis has not been read. Fix equal coupling $K>0$, opposite polarities, $c_f=1$, and one common past/future mixing parameter $\alpha$. Every complete partner source is retained; strict uniform subfield speed excludes nonzero-age self sources.

## Complete periodic histories and the two torque integrals

Let $X_i(T)$ be a separated complete $C^2$ pair with period $P>0$ and $\sup_T|V_i(T)|<1$. Denote the pure past and pure future canonical radial accelerations by $A_i^-$ and $A_i^+$. The selected mixed equation is

$$
X_i''=(1-\alpha)A_i^-+\alpha A_i^+.
$$

All partner roots are unique in their respective time directions, with positive denominator floors. On a compact neighborhood of a separated periodic pair their ages and source ranges also have positive lower bounds and finite upper bounds. Define the integrated total torque vectors

$$
J_\pm=\sum_{i=1}^2\int_0^P X_i(T)\times A_i^\pm(T)\,dT.
$$

These are purely mathematical integrals of acceleration; no primitive mass, force, conserved angular momentum or physical account is assumed.

Write $r=X_i(T)-X_j(S)$ and $R=|r|$. The exact root sums have the integral representations

$$
A_i^-(T)=-K\int_{\mathbb R}\delta(T-S-R)\frac r{R^3}\,dS,
\qquad
A_i^+(T)=-K\int_{\mathbb R}\delta(S-T-R)\frac r{R^3}\,dS,
\quad j\ne i.
$$

Here $\delta$ is only an auxiliary mathematical notation for the root evaluation identity: differentiating the two scalar root functions in $S$ gives absolute derivatives $1-n\cdot V_j$ and $1+n\cdot V_j$, respectively. Thus these integrals reproduce exactly $-K n/(R^2D_\pm)$. The positive simple-root bounds justify the identity without a singular physical source or event rule. Alternatively each integral may be defined directly by its one-dimensional coarea formula.

For jointly periodic integrands in $(T,S)$ under simultaneous translation by $P$, supported in a bounded strip $|T-S|\le C$, the fundamental cell may be transferred from $T$ to $S$:

$$
\int_{0\le T<P}\int_{S\in\mathbb R}f(T,S)\,dS\,dT
=
\int_{0\le S<P}\int_{T\in\mathbb R}f(T,S)\,dT\,dS.
$$

To prove this, partition the unrestricted variable into intervals $[nP,(n+1)P)$, translate both variables by $-nP$, and regroup the resulting partition of the other unrestricted variable. Only finitely many strips contribute for each point because $|T-S|$ is bounded. The same argument applies to the above simple-root measures by approximation or coarea. Periodic positions are bounded, so their root support indeed has bounded age.

Apply this identity to $J_+$, then exchange $i,j$ and $T,S$. The future root becomes the past root and $r$ changes sign. Consequently

$$
J_+=K\sum_{i\ne j}\int_{0\le T<P}\int_{\mathbb R}
\delta(T-S-R)\frac{X_j(S)\times r}{R^3}\,dS\,dT.
$$

Adding the original $J_-$ gives

$$
J_-+J_+=-K\sum_{i\ne j}\int\int
\delta(T-S-R)\frac{(X_i(T)-X_j(S))\times r}{R^3}\,dS\,dT=0.
$$

This identity holds for arbitrary complete separated uniformly subfield periodic Cartesian pair profiles, without planarity, antipodality, a chosen center or an equation-of-motion premise.

## Necessary periodic balance

For any actual periodic solution,

$$
\sum_i\int_0^P X_i\times X_i''\,dT
=\left[\sum_i X_i\times X_i'\right]_0^P=0.
$$

Combining this kinematic identity with the complete root identity yields the necessary condition

$$
(1-2\alpha)J_-=0.
$$

For $\alpha\ne1/2$, a periodic solution must therefore have $J_-=0$. The condition is necessary, not sufficient, and does not exclude arbitrary distant periodic profiles with zero pure-past integrated torque.

## Strict exclusion near every subfield balanced circle

At an equal-half circle write $x=\beta\cos x$, $c=\cos x$, $s_x=\sin x$, $D=1+\beta s_x$, radius $R>0$ and $0<\beta<1$. At reception on the first positive radial ray, the past partner direction is $(c,-s_x)$ and its acceleration is $K(-c,s_x)/(4R^2c^2D)$. Both labels contribute the same positive axial torque. Hence for any nominated integer multiple $P$ of the circle period,

$$
(J_-)_z=\frac{PKs_x}{2Rc^2D}>0.
$$

The complete source map and its acceleration are continuous in periodic $C^1$ profiles and positive period on the separated uniformly subfield chart. Therefore this strict axial inequality persists in an open full Cartesian neighborhood of that circle and its nominated period. Throughout this neighborhood every periodic solution of the mixed equation must have exactly $\alpha=1/2$. The statement covers nonmirror, nonplanar and moving-center periodic perturbations, and all sufficiently nearby nominated periods. Its neighborhood depends on the fixed positive base speed and period multiple; no uniform neighborhood at zero speed or as the multiple tends to infinity is claimed.

In particular, the independently established noncircular periodic branch near a simple resonance exists only on the exactly equal-weight slice in this local family of equations. It does not continue to a nearby unequal weight while remaining in the same full periodic neighborhood. This conclusion is stronger than checking circle tangential balance alone because it applies to every nearby complete Cartesian periodic profile.

No causal initial-value, nonlinear stability, attraction or general nonperiodic fate theorem follows. Quasiperiodic or distant periodic profiles require their own argument. The equation parameter is fixed within each case; the theorem compares cases and does not permit time-varying weights.

Falsifiers are an omitted complete root, a wrong source Jacobian in the integral representation, unequal directional pair coupling, failure of the periodic cell-transfer identity, a missing source-position factor after exchanging labels, or a nearby periodic profile with vanishing $J_-$ despite the strict continuity neighborhood. The proof uses no external physical conservation law and no numerical target.
