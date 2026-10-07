# A finite certificate for the complete shifted-seam layer residual

**Grade: derived conditional candidate, awaiting independent assessment and coefficient audit.** Retain the exact [selected preparation](authorized-cases-ten-hour-b-case.md), $\epsilon=2^{-200000}$, $K=c_f=1$, and its original compatible degree-five supplied polynomial. The [structurally admitted recurrence](authorized-cases-ten-hour-reference-b-degree14-adjudication.md) defines a finite comparison $Y^{[14]}$. The [construction record](authorized-cases-ten-hour-b-layer-construction-record.md) reports its producer output; that output is not yet an independently accepted premise. This argument states the finite certificate sufficient to prove the previously missing uniform residual. It does not evaluate a terminal phase or change any physical history.

## Finite premises to audit

Write $Y^{[14]}(\sigma;\epsilon)=\sum_{j=0}^{14}\epsilon^jY_j(\sigma)$ on the fixed pieces with knots $0,2,4,6,8$. The final piece extends through 203 for estimates. The negative piece is the original compatible polynomial's parameter truncation. Require the following exact finite facts:

1. $Y_0=e_1$, $Y_1=\sigma e_2$, and each component of $Y_j$ is a polynomial of degree at most fourteen on every piece. Each piece and every derivative through fourteen has modulus at most $B=2^{256}$ for real $-3\le\sigma\le203$; the same piecewise polynomial bound holds at complex arguments of modulus at most 203.
2. For $d=0,1,2$ and $0\le j\le12$, put $k_j=\lfloor(12-j)/2\rfloor$. Each function $Y_j^{(d)}$ has continuous derivatives through $k_j$ across every knot and a piecewise bounded next derivative, or its polynomial degree is already below $k_j+1$. Thus its degree-$k_j$ Taylor formula has a global integral remainder with bound $B|\delta|^{k_j+1}/(k_j+1)!$. This is a coefficient regularity statement, not added regularity of the actual physical history.
3. The exact rational coefficient identities of the implicit root and complete scaled row vanish through scaled degree fourteen. Release value and velocity coefficients have their prescribed values; the negative and positive release traces match through order five.

For the second premise, the relevant worst case is $j=6,d=2,k_j=3$: $Y_6''$ has three continuous derivatives and a Lipschitz third derivative. No pointwise fourth derivative at its jump is required. The later $j=8,10,12$ acceleration coefficients require respectively two, one and zero argument derivatives. The finite audit must check the actual traces rather than merely assume these orders from a formal label.

One convenient norm certificate is a rational coefficient one-norm at complex radius 256. If it is below $2^{100}$, Cauchy's polynomial derivative estimate on radius 53 about any point of modulus at most 203 gives

$$
|Y_j^{(d)}|\le 2^{100}\frac{d!}{53^d}\le2^{100}<B,
\qquad 0\le d\le14.
\tag{1}
$$

The producer reports a smaller norm, but only an independent exact coefficient/trace check can admit these premises. A coefficient norm is not by itself the residual conclusion below.

## A finite analytic proxy keeps the seams in its error

Fix a real reception $\sigma\in[0,200]$. Let $\lambda$ be an auxiliary complex parameter, not a new physical coupling, and put $L=2+\delta$. Define finite source proxies for $d=0,1,2$ by

$$
S_d(\lambda,\delta)=
\sum_{j=0}^{12}\lambda^j
\sum_{k=0}^{k_j}\frac{(-\delta)^k}{k!}
Y_j^{(d+k)}(\sigma-2).
\tag{2}
$$

Use $Q(\lambda)=\sum_{j=0}^{12}\lambda^jY_j(\sigma)$ for the current position. At a knot, every derivative used in (2) has the continuous trace asserted in the finite premises. These are finite polynomials in $(\lambda,\delta)$ for each fixed reception, regardless of which side of a physical seam the exact source later occupies. They do not assert analytic dependence of the actual delayed solution.

Take

$$
\rho=2^{-2048},\qquad |\lambda|\le\rho,
\qquad |\delta|\le\frac1{16}.
\tag{3}
$$

The exact first two coefficients give

$$
Q+S_0=2e_1+\lambda(2\sigma-2-\delta)e_2+E,
\qquad |E|\le2^9B|\lambda|^2.
\tag{4}
$$

The factor covers both Cartesian components, thirteen coefficient indices and the finite exponential sum in $\delta$. The first-order term is perpendicular to $e_1$ with the complex bilinear dot product used to continue the real squared range. Consequently its analytic square-root branch satisfies

$$
\left|\sqrt{(Q+S_0)\cdot(Q+S_0)}-2\right|
\le2^{12}B|\lambda|^2.
\tag{5}
$$

Indeed the squared-range change is bounded by $4|E|+|\lambda|^2(402)^2+2(402)|\lambda||E|+|E|^2$, below $2^{12}B|\lambda|^2$ up to the harmless square-root denominator greater than three. The deliberately larger coefficient in (5) covers these terms. On (3), it is far below $1/16$. Differentiating this finite proxy with respect to $\delta$ gives a contraction constant below $1/4$: the leading source derivative has size $|\lambda|$, and the higher terms are bounded by $2^{10}B|\lambda|^2$. Thus the unique analytic root $\delta_*(\lambda)$ exists on the whole disk, with the stronger bound (5). The source proxies and their first $\delta$ derivatives are bounded there, and the range and transmitter factors remain separated from zero.

With $n_*=(Q+S_0)/(2+\delta_*)$ and $D_*=1+n_*\cdot S_1$, evaluate the unchanged scaled response without its outer $\lambda^2$:

$$
\Psi_*(\lambda)=-\frac4{(2+\delta_*)^2D_*^3}
\left\{(1-S_1\cdot S_1)n_*+D_*S_1
-(2+\delta_*)n_*(n_*\cdot S_2)\right\}.
\tag{6}
$$

The leading source velocity is $\lambda e_2$, source acceleration begins at degree two, and all higher sums are at most $2^{10}B\rho^2$. Direct norm bounds therefore give $|\Psi_*|<16$ on (3). Cauchy's estimate and a geometric tail give

$$
\left|\Psi_*(\epsilon)-\sum_{j=0}^{12}
[\lambda^j]\Psi_*\,\epsilon^j\right|
\le2^{26630}\epsilon^{13}.
\tag{7}
$$

Here $13\cdot2048=26624$; the remaining six powers cover the bound sixteen, both components and the tail denominator. The coefficient identities in premise 3 identify the polynomial in (7), multiplied by $\epsilon^2$, with $Y^{[14]}_{\sigma\sigma}$. No coefficient of the actual solution beyond fourteen is used.

## Transport the exact root across either side of every seam

At the actual fixed positive parameter, the finite comparison itself has position within $1/16$ of $e_1$, scaled velocity and acceleration below $1/16$, and acceleration Lipschitz constant below one. These follow directly from premise 1, its exact first coefficients, and the factors $\epsilon^j$; for example every higher sum is at most $2B\epsilon^2$. Its local source equation has a unique root with $|L-2|\le2^{12}B\epsilon^2$ and $L<3$. It samples only $[-3,200]$. The complete actual history has already admitted unique ordinary roots; this local comparison estimates that chart and supplies no replacement remote past.

For each source coefficient in (2), its global Taylor remainder remains valid even if the shift $-\delta$ crosses one or more fixed knots. Since $j+2(k_j+1)\ge13$, the finite-premise bounds and (5) imply, for $d=0,1,2$,

$$
\left|Y^{[14](d)}(\sigma-2-\delta;\epsilon)
-S_d(\epsilon,\delta)\right|
\le2^{4096}\epsilon^{13}.
\tag{8}
$$

To check the constant explicitly, each retained-index remainder is at most $B(2^{12}B)^{k_j+1}\epsilon^{j+2(k_j+1)}$, with $k_j+1\le7$. Its binary exponent is at most $256+7(268)=2132$. Summing thirteen indices, two components and the omitted indices thirteen and fourteen remains below $2^{2140}\epsilon^{13}$; (8) has substantial slack. For the low polynomial indices whose nominal derivative order exceeds their degree, the corresponding remainder is exactly zero. No discontinuous pointwise derivative is used.

The source-root contraction or its residual derivative lower bound now gives a difference between the exact comparison root and the proxy root at most $2^{4098}\epsilon^{13}$. Transporting the proxy source position, velocity and acceleration between those roots uses their finite $\delta$ derivatives, bounded below one on this disk by the exact low orders and small higher sums. The rational response on the shared strict range/transmitter box has a value Lipschitz bound below $2^{20}$ in these data and the range. Therefore

$$
\left|\mathcal T_\epsilon[Y^{[14]}]
-\epsilon^2\Psi_*(\epsilon)\right|
\le2^{4123}\epsilon^{15}.
\tag{9}
$$

The neutral source acceleration is retained as an independent value throughout this comparison. Only the proxy's finite derivatives are used to move its argument. The comparison's limited seam regularity is carried by (8), so neither a seventh actual derivative nor an analytic actual past has entered.

Combining (7) and (9) proves the conditional uniform residual

$$
\boxed{\left|Y^{[14]}_{\sigma\sigma}
-\mathcal T_\epsilon[Y^{[14]}]\right|
\le2^{26632}\epsilon^{15}
<2^{45000}\epsilon^{15},\qquad 0\le\sigma\le200.}
\tag{10}
$$

The [independently accepted conditional state-transfer theorem](authorized-cases-ten-hour-reference-b-degree14-adjudication.md#compatibility-tail-and-conditional-state-estimate) would then supply the original physical state enclosure below $2^{50000}\epsilon^{14}$, after retaining its separately bounded original negative-history and release-velocity tails. That implication awaits both acceptance of this proof and independent verification of the finite premises.

## Evidence boundary

The known analytical zero-parameter control is the central circular coefficient row. The already independently derived first sixth-seam kernel and $8/21$ kick test the constructor before its missing degree-fourteen target. Neither known control establishes (10) on its own. The target producer's coefficient norm is provisional until separately audited; no target output was copied into an independent oracle.

The falsifiers are an incorrect finite coefficient or trace, a requested Taylor derivative lacking its asserted continuity, a failure of the analytic clock disk, an underestimated finite-proxy norm, an uncovered exact source argument, or a missing neutral/root-transport term. A failed bound would withdraw this layer admission, not prove a terminal fate. No scalar phase, high-order angular map or physical trajectory is evaluated here.
