# A sharper configuration-distance observable for the fixed four-member case

**Status: derived candidate, awaiting independent assessment before target use.** This is an optional proof-method refinement for the unchanged E+M positive-offset four-member preparation and retained trial fixed in [the method](authorized-cases-ten-hour-e-method.md). It changes neither physical history nor equation nor horizon. It measures instantaneous spatial departure from the exact translated/rotated square. It does not measure distance in a uniform complete-history norm or establish a new instability theorem.

The original diagonal-dot-product bound is valid but need not use all the available deformation. The present observable uses the best root-mean-square spatial fit to an exact square. Its error transfer is particularly simple: a maximum position error of $e$ lowers the resulting rigorous departure bound by at most $e$.

## Exact finite-dimensional formula

Let $X_0,X_1,X_2,X_3\in\mathbb R^3$ be the four labeled positions. Put

$$
\bar X=\frac{X_0+X_1+X_2+X_3}{4},\qquad
 a=\frac{X_0-X_2}{2},\qquad
 b=\frac{X_1-X_3}{2},\qquad
 c=\frac{X_0+X_2-X_1-X_3}{4}.
\tag{1}
$$

Then the centered positions are $a+c$, $b-c$, $-a+c$ and $-b-c$. An exact square of the independently certified radius $r_*$ has corresponding positions $r_*e_1,r_*e_2,-r_*e_1,-r_*e_2$ for an orthonormal pair $e_1,e_2$. Arbitrary translations have already been minimized by subtracting the mean. Its mean squared discrepancy is exactly

$$
\frac{|a-r_*e_1|^2+|b-r_*e_2|^2}{2}+|c|^2.
\tag{2}
$$

This follows by expanding the four squares: all terms linear in $c$ cancel. The identity retains normal as well as in-plane components.

Let $\sigma_1,\sigma_2\ge0$ be the singular values of the real $3\times2$ matrix with columns $a,b$. The maximum of $a\cdot e_1+b\cdot e_2$ over orthonormal pairs is $\sigma_1+\sigma_2$. One direct proof rotates the two-column coordinates to diagonalize their Gram matrix. Its two orthogonal columns then have lengths $\sigma_1,\sigma_2$; the Cauchy inequality bounds each respective projection by that length, and choosing their normalized directions attains both bounds. If a column vanishes, complete its direction by any perpendicular unit vector. Every such frame extends to a proper three-dimensional rotation, so no reflection or label permutation must be added.

The exact least root-mean-square discrepancy is therefore

$$
L(X;r_*)=
\sqrt{\frac{(\sigma_1-r_*)^2+(\sigma_2-r_*)^2}{2}+|c|^2}.
\tag{3}
$$

If $d_\infty(X;r_*)$ is the least maximum member discrepancy from a translated/rotated exact square, then

$$
d_\infty(X;r_*)\ge L(X;r_*).
\tag{4}
$$

The two singular values require only a $2\times2$ symmetric eigenvalue calculation. With $A=|a|^2$, $B=|b|^2$ and $C=a\cdot b$,

$$
\sigma_{1,2}^2=
\frac{A+B\pm\sqrt{(A-B)^2+4C^2}}{2}.
\tag{5}
$$

These expressions are evaluated with directed arithmetic and the known nonnegativity of the Gram eigenvalues. A roundoff interval with a negative lower face is intersected with $[0,\infty)$ before its square root; that intersection uses a proved matrix property, not an assumed target sign.

## Error propagation and radius uncertainty

For any two configurations $X,Y$, the distance to the same set of exact squares is one-Lipschitz in the root-mean-square norm, by the triangle inequality followed by the infimum over that set. Hence

$$
|L(X;r_*)-L(Y;r_*)|
\le\sqrt{\frac14\sum_{j=0}^3|X_j-Y_j|^2}
\le\max_j|X_j-Y_j|.
\tag{6}
$$

No factor from recentering is needed: translation was already optimized inside the distance, and (6) holds in the original four-position norm. If the actual solution is within maximum position error $e$ of the retained trial,

$$
d_\infty(X_{\rm actual};r_*)
\ge L(X_{\rm trial};r_*)-e.
\tag{7}
$$

The independent exact-circle radius is an interval, not its printed midpoint. Formula (3) can be evaluated directly over that interval. Alternatively, $L$ is one-Lipschitz in the radius, since changing the square radius by $\Delta r$ changes every member by exactly $|\Delta r|$. A radius interval with midpoint $r_m$ and half-width $q$ gives the safe lower bound $L(X;r_m)-q$.

For the existing declared initial-reception upper distance $d_0$, a sufficient twofold spatial-departure condition is a directed lower bound $L(X_{\rm trial};r_*)>2d_0+e$. This concerns instantaneous configurations. The rounded old angular frequency and exact-circle frequency differ, so no uniform closeness of their arbitrary-old histories to one fixed reference phase follows from this inequality. The compatible complete preparation and its patch remain part of the actual-solution certificate independently of this observable.

## Known analytical controls before a retained-trial target

The following controls have exact answers and precede target use by any implementation:

1. An exact square of radius $r_*$ at any translation and proper rotation has $L=0$.
2. A square uniformly scaled to radius $r_*+q>0$ has $L=|q|$.
3. Orthogonal diagonals of half-lengths $r_*+q$ and $r_*-q$, with $|q|<r_*$ and $c=0$, have $L=|q|$.
4. Keep exact orthogonal half-diagonals and add alternating opposite normal offsets $c=z e_3$. Then $L=|z|$; the normal deformation is retained.
5. At zero diagonal matrix $a=b=0$, the value is $\sqrt{r_*^2+|c|^2}$. This controls the zero-eigenvalue branch and prevents a division by a vanishing singular value.
6. Moving only one label by $e$ changes the distance by at most $|e|/2$ in the root-mean-square metric, so the weaker maximum-error bound (6) must also pass.

These are prescribed geometry controls, not coupled E+M solutions. No retained-trial numerical target has been evaluated for this candidate. A failed Gram identity, incorrect label convention, missing radius enclosure, false directed square root, or confusion between maximum and mean-square distance would invalidate its use. A successful observable evaluation still needs the independently certified actual position-error bound before it yields physical departure.
