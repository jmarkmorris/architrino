# Explicit compact containing domain for exact subfield three-binary circles

## Assumptions and result

Claim grade: derived, pending independent reconstruction. Preserve the complete circular histories, unit fixed polarities, three neutral antipodal pairs, logarithmic coefficient $K_{\log}=1$, wake speed $c_f=1$ and unchanged source factor. Normalize the smallest radius to one, assume every radius is at most $R\ge1$, require distinct member positions, and take strictly subfield angular rate $u>0$. Let $0<\delta\le1$ be a proven uniform lower bound on every present distinct-member separation of any exact configuration in this class.

Then every exact configuration satisfies the explicit angular-rate restriction

$$
u>\frac{\delta}{100R^2}.
$$

Combined with the [explicit separation constant](overnight2-c-explicit-global-separation.md) at $R=35$, the restriction gives an explicit compact containing domain for the closure of all exact configurations in C's selected strictly ordered subfield class. Neither this reduction nor compactness proves that an exact configuration exists or that the containing domain can be excluded at a feasible computational cost.

## Comparing each causal row with its static row

At reception let $x$ be the receiver, $y$ the source's present position, $z=R(-u\tau)y$ its emission position, and $d=|x-y|\ge\delta$. For this comparison additionally suppose $s=uR<1$, as will hold throughout the hypothetical slow-rotation interval below. This extra bound is not inferred from subfield speeds when $R$ is merely an upper bound on the actual radii. Let $D=1-n\cdot uJz$, where $n=(x-z)/\tau$ at a causal root. The source's path length during the delay bounds its displacement by

$$
|z-y|\le s\tau,\qquad D\ge1-s,\qquad |1-D|\le s.
$$

The elementary Euclidean inversion identity

$$
\left|\frac{p}{|p|^2}-\frac{q}{|q|^2}\right|=
\frac{|p-q|}{|p|\,|q|}
$$

holds for all nonzero vectors $p,q$, by squaring both sides. Use $p=x-z$, $q=x-y$, so $|p|=\tau$ and $|q|=d$. The actual unsigned logarithmic row is $A=p/(\tau^2D)$, while the static unsigned row at the same present geometry is $A^0=q/d^2$. Thus

$$
|A-A^0|\le\frac1D\left|\frac p{\tau^2}-\frac q{d^2}\right|
+\left|\frac1D-1\right|\frac1d
\le\frac{2s}{d(1-s)}\le\frac{2s}{\delta(1-s)}.
$$

Multiplication by the fixed unit polarity product does not change this error bound. It compares the full selected delayed row to a static reference for the same positions; it does not replace the selected equation with a static one.

## The six-member static scalar identity

For the six positions $x_i$ and polarities $q_i\in\{-1,+1\}$, define the complete static acceleration

$$
A_i^0=\sum_{j\ne i}q_iq_j\frac{x_i-x_j}{|x_i-x_j|^2}.
$$

Pair the two directed terms for each unordered pair. Their contribution to $\sum_i x_i\cdot A_i^0$ equals $q_iq_j$. Neutrality gives $\sum_iq_i=0$ and $\sum_iq_i^2=6$, hence

$$
\sum_i x_i\cdot A_i^0=\sum_{i<j}q_iq_j=-3.
$$

An exact circular configuration instead has $A_i=-u^2x_i$ and therefore $\sum_i x_i\cdot A_i=-u^2S$, where $S=\sum_i|x_i|^2\le6R^2$. There are thirty directed partner rows and no positive self rows. Summing their error bounds, with each receiver radius at most $R$, gives, on the comparison domain $uR<1$, the necessary scalar inequality

$$
|3-u^2S|\le\frac{60Rs}{\delta(1-s)}=
\frac{60uR^2}{\delta(1-uR)}.
$$

This combines the complete vector equations through a scalar identity derived from the selected geometry and polarity bookkeeping. It imports no mass, momentum or standard-physics law.

## An explicit forbidden slow-rotation interval

Suppose $0<u\le\delta/(100R^2)$. Since $\delta\le1$ and $R\ge1$, one has $s=uR\le1/100<1/2$. Consequently

$$
\frac{60uR^2}{\delta(1-uR)}\le\frac{120uR^2}{\delta}\le\frac65,
\qquad
u^2S\le6u^2R^2\le\frac{3}{5000}.
$$

Thus $|3-u^2S|\ge3-3/5000>6/5$, contradicting the necessary scalar inequality. This proves the strict lower bound $u>\delta/(100R^2)$. The estimate is conservative and is not an optimal angular-rate cutoff. The zero-angular-rate case separately contradicts the exact static identity immediately.

## Compact reduction with complete roots

Set $R=35$, use the explicit $\delta$ from the independently reviewable separation proof, and write $u_0=\delta/(100R^2)$. After fixing simultaneous rotation, use two phases in the compact torus $(\mathbb R/2\pi\mathbb Z)^2$. The closure of the exact strictly ordered subfield class is contained in

$$
\mathcal C=\left\{(r_2,r_3,u,\phi_2,\phi_3):
1\le r_2\le r_3\le35,\quad
u_0\le u\le1/r_3,\quad
|x_i-x_j|\ge\delta\ \text{for every }i\ne j\right\}.
$$

This is a closed subset of a bounded radius/rate domain times a compact phase torus, hence compact. The [closed-subfield root bounds](overnight2-c-closed-subfield-root-bound.md) establish exactly thirty positive partner roots and no positive self roots at every point of $\mathcal C$, with

$$
\delta/2\le\tau\le70,\qquad
D\ge\frac{\delta^2}{128\cdot35^2}>0.
$$

Each complete partner sum varies continuously there. Therefore any limit of exact configurations inside this containing domain satisfies the limiting partner equations. Equal pair radii remain permitted when member positions are distinct, and the outer speed may equal one; neither boundary is discarded. The theorem is a reduction to a compact regular containing domain, not a conclusion about its zero set.

The complete acceleration is not asserted to continue smoothly through the speed boundary into a superfield neighborhood. Positive self roots appear on that side. A future interval argument that extends partner formulas across a box must retain this distinction and use those formulas only as a necessary extension for the original subfield points, or establish the new complete census explicitly. No such numerical cover is launched here.

## Verification boundary

The independent review must reconstruct the Euclidean inversion identity, the per-row comparison, the thirty-row factor, the neutral scalar contraction, the strict cutoff arithmetic and the closed-domain root census. A wrong factor, an omitted root, a separation constant outside its proven scope, or an exact configuration with $u\le\delta/(100R^2)$ would falsify the conclusion. This note relies on the separation proof and root bounds at their independently verified grades; it cannot promote an unchecked dependency by restating it.

No calculation cost is inferred from compactness. The explicit constants are small, and their practical usefulness requires a separately bounded assessment. The next selected assessment remains the frozen thirty-two-leaf phase-sector test, followed by a stronger inequality or an explicit obstruction rather than a blind expansion of the old cover.
