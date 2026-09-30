# Axial staggered lattice: first-event numerical comparison

## Scope and status

**Measured, comparison grade.** The dedicated instrument in `.local-data/master-equation-closure/staggered-first-event/evolution/evolution.py` follows the scalar axial reduction of the unchanged Master Equation at $g=16$, $c_f=1$. It is an analytical comparison instrument, not an EOM solver run or a production solver. Its first speed-one crossing is a candidate requiring a continuous residual bound and propagation from the exact incoming history. Parent integration owns that certification; this artifact owns the comparison and its evaluation formulas.

The input is the exact ancient branch constructed in [the incoming-history theorem](smooth-two-particle-incoming-reachability.md), with $a=2^{-40}$ and the exact positive characteristic root $\lambda$. The comparison uses $\bar q(t)=a e^{\lambda_c t}$ for $t\le0$, with a numerical center $\lambda_c$. The incoming theorem, rather than an assertion that this exponential is exact, supplies the discrepancy bound

$$
|q^{(k)}(t)-\lambda^k a e^{\lambda t}|
\le (2\lambda)^k150000a^2 e^{2\lambda t},
\qquad k=0,1,2.
$$

Moore's separately authored integer-interval reference encloses the exact characteristic root strictly between $2.795230690086810814283894$ and $2.795230690086810814283901$. Its retained source and receipt are in `.tmp/mec-008-staggered-first-event/independent/lambda-reference.py` and `lambda-reference.json`; the high-precision pre-rounding center lies inside that interval, while its stored binary64 rounding need not. A certificate must also propagate the tiny difference between the stored binary64 exponent and that exact interval.

## Exact reduction and causal census

For every lattice identity $i\in\mathbb Z^3$,

$$
X_i(t)=i+\sigma_i q(t)e_3,
\qquad \sigma_i=(-1)^{i_1+i_2+i_3}.
$$

All infinitely many identities participate. For an even receiver, set $d=i-j$, $m=d_3$, $p=d_1^2+d_2^2$ and $\sigma=(-1)^{m+p}$. The source emission $s=t-\tau$ satisfies

$$
\tau=\sqrt{p+[m+q(t)-\sigma q(s)]^2},
\quad n_3=\frac{m+q(t)-\sigma q(s)}\tau,
\quad D=1-\sigma n_3q'(s).
$$

On a complete subunit history with uniformly separated identities, each distinct source has exactly one simple causal root and each own-history row has none. The source-root monotonicity is $D\ge1-\sup|q'|>0$; the remote ancient tail supplies the opposite endpoint sign for existence. This argument counts every source, including those outside the finite evaluation cube. After the first numerical crossing, the instrument retains a short **cross-row comparison only**. It evaluates no own-history rows there and makes no full-law continuation claim.

The exact axial acceleration is

$$
q''(t)=16S_3(q(t)e_3)+16\sum_{d\ne0}\sigma_d
\left[
\frac{n_3}{\tau^2D}
-\frac{m+q(t)}{[p+(m+q(t))^2]^{3/2}}
\right].
$$

Here $S$ is the original alternating stationary block sum. The correction sum is absolutely convergent by the ancient exponential history bound. Finite evaluation groups collect equal pairs $(m,p)$ with their exact integer multiplicities. Cube half-width $14$ contains $24388$ source labels in $3073$ groups. It is a finite evaluation of corrections plus an explicit infinite remainder; it does not replace the infinite lattice by a finite bare lattice.

### Stable evaluation of a changed row

Write $z_0=m+q(t)$, $b=\sigma q(s)$, $r_0^2=p+z_0^2$, $v_s=\sigma q'(s)$ and

$$
\epsilon=\frac{-2z_0b+b^2}{r_0^2},
\qquad u=\operatorname{expm1}\left[-\frac32\operatorname{log1p}(\epsilon)\right].
$$

Then the changed row, before its outer $\sigma$, is evaluated as

$$
\frac{\Delta K+K_0n_3v_s}{D},
\quad K_0=\frac{z_0}{r_0^3},
\quad\Delta K=\frac{z_0u-b(1+u)}{r_0^3}.
$$

This algebraic identity preserves the exponentially small initial signal without subtracting two nearly equal stationary values. Its zero-source correction is exactly zero in floating arithmetic.

## Stationary sum evaluation

**Derived evaluation identity; numerical centers remain comparison grade.** The Gaussian integral representation of $1/r$, split at parameter $1$, followed by the lattice Poisson identity gives the stationary potential

$$
P(y)=\sum_{d\ne0}\sigma_d\frac{\operatorname{erfc}(|d+y|)}{|d+y|}
+\frac1\pi\sum_{h\in(\mathbb Z+\tfrac12)^3}
\frac{e^{-\pi^2|h|^2}}{|h|^2}\cos(2\pi h\cdot y)
-\frac{\operatorname{erf}(|y|)}{|y|}.
$$

The axial acceleration kernel $S_3=-\partial_3P$ is consequently

$$
S_3(qe_3)=\sum_{d\ne0}\sigma_d\frac{m+q}{r^3}
\left[\operatorname{erfc}(r)+\frac{2r}{\sqrt\pi}e^{-r^2}\right]
+2\sum_h\frac{h_3}{|h|^2}e^{-\pi^2|h|^2}\sin(2\pi h_3q)
+\frac{d}{dq}\frac{\operatorname{erf}(q)}q.
$$

The scalar Gaussian split is a sum-evaluation identity, with no change to the Master Equation. Neutral alternating blocks admit this identity by Gaussian regularization and the convergent block derivative bounds; the resulting absolutely convergent two sums have the same stationary field. The instrument uses real cube half-width $7$ and reciprocal coordinates $\pm1/2,\pm3/2,\pm5/2$.

For $|q|\le B\le1/2$, a real exterior shell with supremum radius $m$ contains $24m^2+2\le26m^2$ sites and has $r\ge m-B$. The screened field magnitude is at most $[2/(\sqrt\pi r)+1/(\sqrt\pi r^3)]e^{-r^2}$. Therefore, with $M=N+1$,

$$
T_{\rm real}\le\frac{312}{\sqrt\pi}
\frac{M e^{-(M-B)^2}}{1-2e^{-2M}}.
$$

For a reciprocal exterior supremum shell $r=m+1/2$, its count is $24m^2+24m+8\le32r^2$. Each field row is bounded by $2e^{-\pi^2r^2}/r$. If $M=K+3/2$ follows retained coordinates up to $K+1/2$,

$$
T_{\rm reciprocal}\le
\frac{64M e^{-\pi^2M^2}}{1-2e^{-2\pi^2M}}.
$$

These are analytic truncation bounds, separate from arithmetic enclosure. For $|q|<0.005$, the center implementation uses odd Taylor coefficients of degrees $3,5,7,9,11$ from the same finite Gaussian sum, dropping the exact zero linear term. High-precision incomplete-gamma derivatives generate their centers. The degree-$13$ and higher infinite stationary remainder obeys

$$
|R_{\ge13}(q)|\le29|q|^{13}
\left[\frac{14}{1-|q|^2}+\frac{2|q|^2}{(1-|q|^2)^2}\right].
$$

This follows from the solid-harmonic coefficient bound and $\sum_{d\ne0}|d|^{-15}<29$. The finite-sum coefficient arithmetic and omitted Gaussian coefficient tails still need an independent enclosure if those centers enter a certificate. Floating high precision alone is not that enclosure.

## Infinite correction tail

For a candidate receiver/source displacement neighborhood $|q|\le B<1/2$, each omitted source with $r=|d|$ obeys $s\le t-r+2B$. If $t-(N+1)+2B<0$, all omitted emissions belong to the exact ancient history. Define

$$
Y_m=a e^{\lambda(t-m+2B)}+150000a^2e^{2\lambda(t-m+2B)},
$$

$$
V_m=\lambda a e^{\lambda(t-m+2B)}+2\lambda\,150000a^2e^{2\lambda(t-m+2B)}.
$$

For an admitted bound $\nu<1$ on these source velocities, the acceleration tail is bounded by

$$
T_{\rm correction}\le
\frac{16}{1-\nu}\sum_{m=N+1}^{\infty}(24m^2+2)
\left[\frac{2Y_m}{(m-2B)^3}+\frac{V_m}{(m-B)^2}\right].
$$

The rational factors decrease for $m\ge1$ when combined with the shell count; each exponential series can therefore be bounded by its first rational factor times $1/(1-e^{-\lambda})$ or $1/(1-e^{-2\lambda})$. A certificate substitutes outward-rounded values using Moore's $\lambda$ interval. Thus every omitted identity retains a quantified contribution.

## Archive and continuous interpolation

`trajectory.npz` contains scalar arrays `t`, `y`, `v`, `a`, the grouped source table `groups`, the floating convenience array `quintic`, and numerical scalar parameters. The rigorous intended interpolant is the quintic recomputed from the exact binary64 endpoint values interpreted as rationals, not the independently rounded convenience coefficients. For $u=(t-t_i)/h$,

$$
Q_i(u)=\sum_{k=0}^5c_ku^k,
\quad c_0=y_i,\quad c_1=hv_i,\quad c_2=h^2a_i/2.
$$

Set $d=y_{i+1}-c_0-c_1-c_2$, $e=hv_{i+1}-c_1-2c_2$, $f=h^2a_{i+1}-2c_2$. Then

$$
c_3=10d-4e+f/2,\quad c_4=-15d+7e-f,\quad c_5=6d-3e+f/2.
$$

The nonnegative-time polynomial has exact $C^2$ joins when defined this way. Its initial position and velocity match the exponential comparison. The initial acceleration is set by the comparison right-hand side, so the join to the negative-time exponential is $C^1$ with a possible very small second-derivative jump. The residual proof must retain that piecewise qualification. The forward instrument uses RK4 and delayed quintic histories; an assertion rejects a source query beyond completed history.

## Retained controls and observations

**Measured by `evolution.py known`, before either target run.** The cube-one census returned exactly $26$ labels; a known degree-five polynomial was recovered within $4.45\times10^{-16}$; a canonical collinear changed row matched its closed form within $1.39\times10^{-17}$; zero-source cancellation was exact; a constant-velocity root matched its analytical delay $1.25$; and the six-neighbor cubic coefficient was exactly $14$ in the high-precision control. `known.json` binds these controls to the instrument SHA. The target refuses a stale control receipt.

| Comparison | Grid | Time at retained endpoint | Position | Velocity | Acceleration | Wall time |
| --- | --- | --- | --- | --- | --- | --- |
| First bounded pilot | $1/128$ | $9.3203125$ | $0.2407077610343$ | $1.0601699609614$ | $7.5862388787087$ | $1.72$ s |
| Refinement | $1/512$ | $9.3203125$ | $0.2407077720873$ | $1.0601698907607$ | $7.5862396549054$ | $6.21$ s |

The refined numerical first crossing lies between $9.310546875$ and $9.3125$. At the latter node, $q=0.2326499425084$, $q'=1.0034735647490$ and $q''=6.9415996700851$. The lowest sampled root denominator was $0.9321020$, the lowest sampled source range $0.7351754$, and the largest sampled emitted source speed $0.0678980$. These are diagnostic samples, not continuous bounds. The first-crossing candidate precedes the retained cross-only endpoint.

The endpoint changes under refinement are about $1.11\times10^{-8}$ in position and $7.03\times10^{-8}$ in velocity. Agreement of these two runs is same-implementation consistency only. Neither it nor small root residuals certify the trajectory. A failure of the separate continuous residual, incoming-history propagation, all-source tail or event-sign checks would overturn a proposed event conclusion.

All runtime evidence is retained under `.local-data/master-equation-closure/staggered-first-event/evolution/`. Existing incoming-history evidence and earlier two-target experiments remain unchanged. The scientific next dependency is independent continuous residual and scalar error propagation, followed by an event conclusion on the exact fixed branch.

## Independent archive-enclosure audit

**Measured by a separately authored exact-rational reference, restricted to the stored comparison.** `archive_reference.py` reconstructs each cell first in the Bernstein basis from endpoint positions, velocities and accelerations, then converts those exact rational coefficients to powers. This is independent of `integration/archive_enclosure.py`'s direct power-coefficient construction and its binary64 interval arithmetic. A known degree-five polynomial, exact derivative values, rational interval arithmetic and exponential-series controls passed first; the target run then checked all $4772$ cells and all $28632$ power-coefficient enclosures.

Every positive-time cell has exact endpoint agreement through second derivative. The origin position and velocity equal the negative-time exponential's exact binary64-parameter values, so the full comparison is $C^1$ there; the separately acknowledged acceleration jump is retained. All first- and second-derivative Bernstein coefficients are strictly positive. Consequently the stored continuous polynomial comparison has strictly positive velocity and acceleration on its complete nonnegative-time domain. This does not transfer those signs to the exact incoming branch without error propagation.

The reference also checks every full-cell derivative enclosure through order three with exact rational interval operations. It tests $220$ selected point values and $44$ history-range queries, including exact knots, multi-cell ranges, the final endpoint, wholly negative times and ranges crossing zero. Negative-time exponential values are independently bounded with a rational Taylor series and a geometric remainder. The subject's right-cell convention for third derivatives at positive-time knots is respected; no third-derivative continuity is asserted.

Receipts are `archive-reference-known.json` and `archive-reference-target.json` in the evolution evidence directory. They bind the separately authored reference, exact archive bytes and the subject enclosure sources. The original evolution instrument, trajectory archives and original manifest are preserved. The independent audit establishes the archive reconstruction and tested enclosure operations only; it does not certify a Master Equation residual, a causal-root census on an error neighborhood or a speed-one event of the exact branch.
