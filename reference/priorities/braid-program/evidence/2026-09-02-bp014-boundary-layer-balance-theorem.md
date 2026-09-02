# BP-014 First-Fold Boundary-Layer Balance Theorem

Status: order-$N^2$ cancellation question resolved; limiting boundary-layer zero and compatible-radius order derived; global branch uniqueness and parity correction open

## Result

The proved pre-phase contribution $N^2/6$ is not cancelled in the interior of the first-birth scaled-speed chamber. The complete non-pre-phase complement there is only $O(N^{4/3})$. The finite balances can nevertheless continue by approaching the first causal fold within an $N^{-2}$ speed layer, where the negative newborn pair grows to order $N^2$.

Let $\beta_{1,N}^{\mathrm{fold}}$ be the first post-zero fold, let

$$
a=\left(\frac{3\pi}{2}\right)^{1/3},
\qquad
x_1^{\mathrm{fold}}=\frac{a^2}{2},
$$

and write

$$
\beta=\beta_{1,N}^{\mathrm{fold}}+\frac d{N^2},
\qquad d>0.
$$

Uniformly for $d$ in any compact subinterval of $(0,\infty)$, the complete tangential acceleration coefficient satisfies

$$
\boxed{
\frac{S_N(d)}{N^2}
\longrightarrow
F(d)=\frac16-\frac1{3\pi\sqrt{2d}}
}.
$$

The limiting kernel is strictly increasing and has the unique zero

$$
\boxed{d_*=\frac2{\pi^2}}.
$$

Consequently, for every fixed $d_-<d_*<d_+$, all sufficiently large $N$ have at least one prescribed tangential balance in the interval

$$
\beta_{1,N}^{\mathrm{fold}}+\frac{d_-}{N^2}
<\beta_N<
\beta_{1,N}^{\mathrm{fold}}+\frac{d_+}{N^2},
$$

and any such selected zero obeys

$$
\boxed{
N^2\left(\beta_N-\beta_{1,N}^{\mathrm{fold}}\right)
\longrightarrow\frac2{\pi^2}
}.
$$

Its compatible positive radius has the derived order and leading coefficient

$$
\boxed{
\frac{R_N}{R_*}
\sim
\frac16\left(\frac{3\pi}{2}\right)^{1/3}N^{5/3}
}.
$$

Plainly: the broad first-birth chamber has no interior large-$N$ balance. A balance survives only in a much thinner layer immediately after the first root pair is born, and its compatible prescribed radius grows like $N^{5/3}$.

## Complete first-birth root-family decomposition

For transmitter $k=1,\ldots,2N-1$, the unique pre-phase root has $z=(\phi_k-\chi)/2>0$ and obeys

$$
\beta\sin z+z=\frac{k\pi}{2N}.
$$

These $2N-1$ roots include the opposite endpoint $k=2N-j$, the antipodal channel $k=N$, and the complete parity-dependent alternating background. The prior exact regularization proves, uniformly on compact scaled-speed intervals below the second fold,

$$
S_N^{\mathrm{pre}}
=\frac{N^2}{6}+O(N^{4/3}).
$$

The order-$N^2$ coefficient comes only from the fixed-$k$ endpoint lattice. At the opposite endpoint, writing $z=\pi-w$ gives

$$
w-\beta\sin w=\frac{j\pi}{2N}.
$$

For fixed $j$, $w=O(N^{-1/3})$, the root Jacobian is $O(N^{-2/3})$, and the tangential contribution is $O(N^{4/3})$. Its polarity is $(-1)^{2N-j}=(-1)^j$, independent of the parity of $N$. The antipodal term carries the explicit factor $(-1)^N$ but is only $O(1)$. All remaining parity dependence stays inside the uniform $O(N^{4/3})$ remainder.

Plainly: the far end of the pre-phase lattice is enhanced, and the antipodal sign changes with parity, but neither effect is large enough to remove the positive $N^2/6$ term.

The non-pre-phase families in the first-birth topology are exhaustive:

1. one nontrivial same-transmitter root, satisfying $\beta\sin y_0=y_0$;
2. the two newborn $k=1$ post-phase roots, satisfying $\beta\sin y-y=\pi/(2N)$.

Thus the exact roots per receiver are

$$
(2N-1)+1+2=2N+2.
$$

No $k\geq2$ post-phase root is admitted while the speed remains below the second fold. For a fixed compact subset of the open first-birth chamber, the same-transmitter root and the fold-separated newborn pair each contribute $O(N^{4/3})$ tangentially. Therefore

$$
S_N=\frac{N^2}{6}+O(N^{4/3})>0
$$

for all sufficiently large $N$ in that compact set. This proves that the non-pre-phase complement does not cancel the pre-phase $1/6$ coefficient in the chamber interior.

Plainly: the root count leaves no hidden family that could supply another interior order-$N^2$ term. The only available cancellation mechanism is the newborn pair's fold singularity.

## Boundary-layer limit

At the first fold, let $\alpha_N$ be the double-root angle. The exact threshold expansion gives

$$
N^{1/3}\alpha_N\longrightarrow a,
\qquad
a^3=\frac{3\pi}{2}.
$$

When $\Delta_N=d/N^2$, the two newborn roots split by $O(N^{-1})$ about $\alpha_N$. Their complete signed tangential contribution is

$$
S_N^{\mathrm{new}}
=-\frac{N^2}{3\pi\sqrt{2d}}+O(N^{4/3})
$$

uniformly for $d$ in a compact positive interval. The same-transmitter root is $O(N^{4/3})$. The opposite endpoint, bulk regularized lattice, and parity-dependent terms remain covered by the pre-phase $O(N^{4/3})$ remainder. Adding every family gives the boxed limit $F(d)$.

Because the complete ordinary-root ledger is continuous between the first and second folds, $F(d_-)<0<F(d_+)$ and uniform convergence imply a finite-$N$ zero by the intermediate-value theorem. Shrinking the bracket around the unique limiting zero proves the scaled-offset convergence for any selected zero retained in those brackets. This argument proves asymptotic existence and location; it does not yet prove that the finite-$N$ zero is globally unique throughout the whole topology cell.

Plainly: on the $N^{-2}$ layer, the newborn divergence and the pre-phase background are both order $N^2$. Their two explicit coefficients cross exactly once in the limit, forcing at least one nearby finite-$N$ balance.

## Compatible-radius order

For each newborn post-phase root, the exact radial-to-tangential ratio is $\tan y$. At a boundary-layer balance, both newborn roots satisfy $y=\alpha_N+O(N^{-1})$, so

$$
\tan y=aN^{-1/3}+o(N^{-1/3}).
$$

The tangential balance makes the newborn pair equal to $-N^2/6+o(N^2)$. Its radial contribution is therefore

$$
S_{r,N}^{\mathrm{new}}
=-\frac a6N^{5/3}+o(N^{5/3}).
$$

Direct endpoint bounds give at most $O(N^{4/3})$ for the radial complement, including the pre-phase lattice, the opposite endpoint, and the same-transmitter root. Since $\beta_N\to1$, the circular compatibility equation $R_N/R_*=-S_{r,N}/\beta_N^2$ gives the displayed positive radius asymptotic.

Plainly: the newborn pair supplies the leading inward radial acceleration as well as the tangential cancellation. Every older family is smaller at the radius scale, so the leading coefficient is fixed by the first-fold angle and the $1/6$ balance.

## Parity, checks, and claim boundary

Even and odd $N$ have the same limiting kernel and leading radius coefficient. Their antipodal polarity and other parity-sensitive endpoint terms enter only in the $O(N^{4/3})$ tangential remainder. They can shift the next correction to $d_*$ but cannot split the leading limit.

The tracked checker [check_bp014_boundary_layer_limit.py](../../../../scripts/equation-mapping/check_bp014_boundary_layer_limit.py) verifies the exact first-birth family count, the algebraic zero and monotonicity of $F$, and the compatible-radius coefficient. It is a consistency checker, not an independent oracle. The unchanged [regularized-shape checker](../../../../scripts/equation-mapping/check_bp014_regularized_shape.py) and the prior analytic packet supply the independent pre-phase monotonicity and uniform $O(N^{4/3})$ bound. The unchanged finite evaluator remains a same-evaluator diagnostic only.

Derived: complete first-birth family ownership, absence of an interior order-$N^2$ cancellation, the uniform boundary-layer kernel, existence and limiting location of at least one boundary-layer balance, and the compatible-radius leading order. Open: finite-$N$ uniqueness across the complete first-birth topology cell, a source-bound interval enclosure for a declared finite $N$ tail, and the first even/odd correction to $d_*$. No evolution, retention, stability, binding, physical identity, score, or scientific acceptance follows from this prescribed balance.

The result is falsified by a complete root ledger with a further admitted post-phase family below the second fold, an order-$N^2$ term in the rigorously bounded non-newborn complement, failure of $S_N/N^2$ to converge uniformly to $F$ on a declared compact $d$ interval, a certified boundary-layer balance whose scaled offset does not approach $2/\pi^2$, or an independently certified compatible radius violating the $N^{5/3}$ leading law.

Closure goal: prove finite-$N$ uniqueness on a source-bound first-birth boundary-layer cover and derive the first parity-dependent correction to the scaled offset and compatible radius.
