# Complete radial exclusion: analytical bounds and frozen interval protocol

Status: new bounded exclusion subject, 2026-10-05. The earlier diagnostic search and its reference files remain frozen. The selected laws retain $K_{ij}=c_f=1$, self sign $+1$, partner sign $-1$, $h\in\{1/16,1/32\}$, $\rho\in\{1/32,1/64\}$ and the same triangular window. The target is continuous coverage of $\beta\in[\pi/2,8]$, $R\in[1/512,2]$. No coefficient, boundary law or spectrum is varied.

## A further analytical partial exclusion

Claim grade: derived. Define $g(r)=r^2/(r^2+\rho^2)^{3/2}$. The nonnegative self radial input gives

$$
-RA_r\le\frac12\int_0^{2R+h}g(r_p(\tau))\delta_h(r_p(\tau)-\tau)\,d\tau.
$$

The function $g$ reaches its maximum $2/(3\sqrt3\rho)<2/(5\rho)$ at $r=\sqrt2\rho$, and $g(r)\le1/r$ for positive $r$. On active ages, $r_p\ge(\tau-h)_+$. For ages at most $h+2\rho$, use the maximum; thereafter use $1/(\tau-h)$. If $R\ge\rho$, integration yields

$$
-RA_r\le\frac1{5\rho}+\frac2{5h}+\frac{\log(R/\rho)}{2h}.
$$

If $R<\rho$, the constant maximum on the shorter whole support gives a bound no larger than the first two terms. Thus for every radius,

$$
-RA_r\le U(R):=\frac1{5\rho}+\frac2{5h}+\frac{\max(0,\log(R/\rho))}{2h}.
$$

Radial balance is impossible wherever $\beta^2>U(R)$. This uses the complete age support and no circle root truncation. For $R\le2$, the inequality $\log2<7/10$ gives $U<232/5$ for $(h,\rho)=(1/16,1/32)$ and $U<292/5$ for $(1/16,1/64)$. The logarithm bound follows from $1+7/10+(7/10)^2/2+(7/10)^3/6>2$. Consequently the first law has no such circle with $\beta\ge7$, and the second has none with $\beta\ge31/4$, for any $R\le2$. The stronger conditions $\beta^2>232/5$ and $\beta^2>292/5$ are also available. For thinner windows the radius-dependent expression still excludes regions. These are partial results; the remaining parameter boxes require further proof.

## Exact phase-integral reduction

Put $q_s^2=2(1-\cos\theta)$, $q_p^2=2(1+\cos\theta)$, $u=\rho/R$, $v=R/h$ and $W(t)=\max(0,1-|t|)$. The exact radial balance residual is

$$
F_2(\beta,R)=\beta^2+\frac1{2\beta h}\int_0^\Theta\left[G(q_s^2,u)W\!\left(v\left(q_s-\frac\theta\beta\right)\right)-G(q_p^2,u)W\!\left(v\left(q_p-\frac\theta\beta\right)\right)\right]d\theta,
\quad G(z,u)=\frac z{(z+u^2)^{3/2}}.
$$

For a parameter rectangle $[\beta_-,\beta_+]\times[R_-,R_+]$, any outward upper bound $\Theta\ge\beta_+(2+h/R_-)$ covers every actual complete support. The integrand is exactly zero beyond each path's own support, so extending it to the rectangle's common endpoint changes no integral. The identity follows from $RA_{r,j}=\sigma_j\int r_j^2\delta_h/(2(r_j^2+\rho^2)^{3/2})\,d\tau$ and $d\tau=R\,d\theta/\beta$.

The coordinator independently checked this coefficient, support and the following enclosure plan before implementation targets. A strictly positive interval lower bound for $F_2$ excludes radial balance on the entire parameter box, regardless of tangent.

## Outward arithmetic and complete corner treatment

Use exact dyadic phase cells of width $1/N$, initially $N=256$. For each cell and parameter box, interval arithmetic encloses $q_s^2,q_p^2,u,v,\theta/\beta$, both window arguments and the complete integrand. The range of $G$ is sharpened using its decrease with $u>0$ and its single maximum as a function of $z$ at $z=2u^2$; minima occur at endpoint values of $z$. Both signed channels remain in the result. The final possibly signed integral difference is multiplied by the common positive prefactor using full signed interval arithmetic.

Every triangular support corner, central corner, chord cusp and parameter-dependent touching event is enclosed by the interval ranges of square root, absolute value and positive part. No derivative quadrature rule is used. A cell containing a corner is retained as an interval cell; it is never silently treated as a smooth interval or omitted. This replaces pointwise corner-root estimates with a complete range enclosure of the nonsmooth integrand.

All basic arithmetic uses IEEE binary64 operations expanded by `nextafter` in the required outward direction. Square root is expanded similarly. The implementation assumes correctly rounded IEEE basic operations and square root, with gradual underflow; nonfinite outputs fail rather than become exclusions. No floating sine, cosine, logarithm or power routine supplies a certificate. Cosine ranges are obtained from a degree-40 Taylor polynomial at each exact phase midpoint after interval range reduction by an enclosed $2\pi$ multiple, with the Lagrange remainder and the cell half-width added. The range-reduced midpoint is checked to have absolute value below four; the remainder bound is $4^{41}/41!$. Integer range-reduction choices may use an approximate angle because any integer multiple is valid once the reduced interval and remainder bound are checked.

The interval for $\pi$ is obtained by rational alternating series in Machin's identity $\pi=16\arctan(1/5)-4\arctan(1/239)$. Each alternating remainder is enclosed by its next term, and rational endpoints are converted to binary64 outward by exact comparison with the converted float. The identity follows from the tangent addition formula and the angle lying in the first quadrant. Polynomial operations thereafter use only outward basic arithmetic.

Nonnegative integrand lower and upper arrays are summed separately. Each floating reduction is expanded by the worst-case addition bound $\gamma_{n-1}=(n-1)2^{-53}/(1-(n-1)2^{-53})$: a lower sum is divided outward by $1+\gamma_{n-1}$, and an upper sum by $1-\gamma_{n-1}$. This bound is valid for any addition tree with at most $n-1$ rounded additions and does not assume that a single `nextafter` encloses an entire reduction. Multiplication by the exact phase-cell width and all final operations are again outward.

## Known-first obligation and bounded target

Before any circle target, the instrument must pass exact rational arithmetic comparisons, the square-root enclosure of two, known rational trigonometric inequalities, and a constant-chord stationary-source integral whose exact softened response is known. The integral control uses the same interval accumulation and window machinery with constant chord values, so it checks support, triangular normalization and prefactors independently of a circular target. Its enclosure must contain the independently calculated exact reference and narrow under phase refinement. Known controls are recorded before target work. The coordinator then inspects the frozen implementation before its first target.

The parameter cover begins at the dyadic lower speed $201/128<\pi/2$, slightly enlarging the target domain, and ends at eight. Radius endpoints are dyadic and cover $[2^{-9},2]$ exactly. An analytical mask may exclude a box using either the previously admitted small-radius necessary inequality or the new $U(R)$ bound; on a dyadic radius shell, $\max(0,\log(R/\rho))$ is bounded by an integer multiple of $7/10$ without numerical logarithms.

A bounded pilot evaluates boxes spanning low, middle and high speeds and small, intermediate and large dyadic radii, for each fixed law, before any full subdivision tree. It reports wall time, phase-cell counts and proved/unresolved status. Full coverage, if launched after review of the pilot, uses a finite initial dyadic cover and adaptive subdivision. Each box has its exact endpoints, exclusion method and lower residual recorded, or is retained as unresolved. A parameter split or finer phase grid is a refinement of the same mathematical enclosure, not a changed equation. Processing limits and the science cutoff end the computation with all pending boxes retained. No absence-of-output or unfinished-box inference is permitted.

Falsifiers include an incorrect phase coefficient; a source age beyond the asserted support; a failed arithmetic or trigonometric enclosure; incorrect signed-prefactor handling; lost corner-containing cells; gaps in the parameter cover; or a balanced circle inside an excluded box. The original floating search is not an oracle for this certificate and remains unchanged. No spectral or nonlinear fate calculation belongs to this assignment.
