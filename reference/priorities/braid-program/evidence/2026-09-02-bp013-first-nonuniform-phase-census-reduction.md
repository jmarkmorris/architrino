# BP-013 First Nonuniform-Phase Census Reduction

Status: derived quotient and certificate specification; measured local Jacobian diagnostic

## Scope

The first nonduplicative BP-013 target is the complete equal-radius alternating $2{:}2$ phase census, not another neighborhood of the already certified six-member T04 solution. The declared compact domain uses $c_f=1$, speed $0.05\leq\beta_f\leq20$, and minimum cyclic gap $\eta=0.01$. This packet defines the quotient, full-vector obligation, and first interval-Newton target. It does not prove a continuous zero census.

## Collision-free quotient

Write the ordered cyclic gaps as

$$
g_0,g_1,g_2,g_3\geq\eta,
\qquad
g_0+g_1+g_2+g_3=2\pi,
$$

and fix the global phase by

$$
\phi=(0,g_0,g_0+g_1,g_0+g_1+g_2).
$$

For the alternating word `+-+-`, cyclic relabeling by one site differs only by global polarity conjugation, which preserves every polarity product. Together with the checked reflection-with-circulation action, these transformations generate the exact $D_4$ action on the gap vector. One closed fundamental chamber is

$$
g_0\leq g_1,
\qquad
g_0\leq g_2,
\qquad
g_0\leq g_3,
\qquad
g_1\leq g_3.
$$

Every collision-free orbit meets this chamber. A generic orbit meets its interior once; equality boundaries may duplicate representatives but leave no quotient gap.

Plainly: rotate the shortest gap into the first position, then use the proved reflection action to order its two neighbors. This removes only configurations known to be equivalent.

## Full-vector balance rows

Let $t_i$ and $r_i$ be the tangential and radial acceleration projections of receiver $i$. Planarity makes the axial rows identically zero. A common-rate circular balance is exactly

$$
t_0=t_1=t_2=t_3=0,
$$

$$
r_1-r_0=r_2-r_0=r_3-r_0=0,
$$

with

$$
\bar r=\frac14\sum_{i=0}^3r_i<0,
\qquad
\frac{R}{R_*}=-\frac{\bar r}{\beta_f^2}>0.
$$

The continuous certificate must therefore cover seven residual rows in the four independent coordinates $(g_0,g_1,g_2,\beta_f)$, with $g_3=2\pi-g_0-g_1-g_2$.

At the accepted regular square, a measured finite-difference diagnostic gives

$$
\det D(t_0,r_1-r_0,r_2-r_0,r_3-r_0)
\approx-1.60005222148\times10^5.
$$

The analogous subsystems obtained by choosing another single tangential row have the same determinant magnitude to numerical precision. This nominates a well-conditioned interval-Newton subsystem; it is discovery evidence, not proof that the Jacobian is nonsingular on a box. Exact square covariance discharges the other tangential rows only after the isolated zero is proved to be the regular square.

Plainly: the known square is locally sharp enough to be a useful interval-Newton target, but a finite-difference determinant does not exclude another solution elsewhere in the four-dimensional chamber.

## Source-bound certificate target

An independent outward-rounded oracle must:

1. reimplement the circular causal equation and its implicit derivatives without importing the subject evaluator;
2. partition the quotient domain at every analytic causal-fold hypersurface;
3. certify complete root ownership and exclude every complementary delay interval inside each topology cell;
4. reject any state box on which one of the seven full-vector rows excludes zero;
5. apply interval Newton or Krawczyk to the selected four-row subsystem on surviving boxes;
6. isolate the regular square at $\beta_f=2.1472456589006224\ldots$, discharge the remaining rows by exact covariance, and prove $\bar r<0$;
7. isolate and test every other selected-row zero or prove that none exists.

The resulting claim is either uniqueness of the regular square or an explicit additional nonregular full-vector zero on the declared compact `+-+-` quotient. The second balanced four-member orbit, `++--`, remains a separate later cover. Its existing best sampled residual near $0.7185$ is discovery evidence only.

## Boundary and falsifier

The quotient and residual reduction are derived. The determinant and retained optimizer rows are measured. No continuous zero census is claimed. A missed $D_4$ orbit, an invalid symmetry action, a gap vector absent from the chamber, a missed or misowned causal root, a continuation box crossing a fold, a singular Jacobian member in the proposed inclusion box, a nonzero unselected residual at the isolated point, or an independently certified nonregular zero falsifies the corresponding reduction or future certificate.

Closure goal: certify or falsify uniqueness of the regular alternating $2{:}2$ square on the complete compact collision-free quotient before advancing to `++--` or larger inventories.
