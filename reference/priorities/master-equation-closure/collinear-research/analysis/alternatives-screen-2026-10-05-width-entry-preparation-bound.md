# Exact rational bounds for the original compatibility coefficient

This note fixes an independent analytical reference for enclosing the original finite-width preparation coefficient. It uses the complete self and partner integral at release, including the old stationary self band. It does not alter the original preparation or comparison source.

## Complete release functional

Put $\delta=1/2048$, $a=1/2$, and let the original cubic preparation coefficient satisfy $0<A<2$. Write

$$
d_0=A\delta^2/6,\qquad
R_A(w)=d_0\left[1-(1-w/\delta)^3\right],\quad 0\le w\le\delta.
$$

At release the moving-source self range is $R_A(w)$. Its window argument $R_A(w)-w$ is negative and lies inside $[-h,0]$, because the complete prepared speed is below one and $\delta<h$. The stationary old self tail has range $d_0$ and begins at age $\delta$. Its triangular mass is $(h-\delta+d_0)^2/(2h^2)$. The complete partner band lies in the stationary tail at range $1-d_0$; no moving preparation source contributes to that partner band. Therefore the exact positive compatibility functional is

$$
F(A)=f_\rho(1-d_0)
+f_\rho(d_0)\frac{(h-\delta+d_0)^2}{2h^2}
+\frac1h\int_0^\delta f_\rho(R_A(w))
\left[1-\frac{w-R_A(w)}h\right]dw.
$$

The original coefficient is the unique root $F(A)=A$ already established by contraction. Omitting the stationary old self term would give a different coefficient, especially for the smaller spatial core.

## Rational sandwich with one square root

For $0\le R\le d_0$, the elementary convexity inequality gives

$$
\frac R{\rho^3}\left(1-\frac{3d_0^2}{2\rho^2}\right)
\le f_\rho(R)\le\frac R{\rho^3}.
$$

Every triangular factor is nonnegative. The exact polynomial moments are

$$
\int_0^\delta R_A\,dw=\frac34d_0\delta,\qquad
\int_0^\delta wR_A\,dw=\frac9{20}d_0\delta^2,\qquad
\int_0^\delta R_A^2\,dw=\frac9{14}d_0^2\delta.
$$

Define the rational expression

$$
S_{\rm lin}(A)=\rho^{-3}\left[
 d_0\frac{(h-\delta+d_0)^2}{2h^2}
+\frac1h\left(\frac34d_0\delta
-\frac9{20h}d_0\delta^2
+\frac9{14h}d_0^2\delta\right)\right].
$$

Then the complete functional obeys

$$
f_\rho(1-d_0)+\left(1-\frac{3d_0^2}{2\rho^2}\right)S_{\rm lin}(A)
\le F(A)\le f_\rho(1-d_0)+S_{\rm lin}(A).
$$

All quantities are rational for rational $A,h,\rho$ except the positive square root in $f_\rho(1-d_0)$. Exact-integer square-root brackets can therefore certify both endpoint residual signs for a rational $A$ interval. The neglected self correction is bounded explicitly by $(3d_0^2/(2\rho^2))S_{\rm lin}$; it is not inferred from floating-point quadrature agreement.

A proposed certificate instrument will use reduced BigInt rationals, a proved floor-integer-square-root routine, and a binary square-root bracket. It must pass exact rational arithmetic and known square-root bounds before applying these formulas to the four coefficient targets. The already proved strict contraction supplies uniqueness; the instrument only establishes the endpoint sign enclosure.

> Claim grade: derived, independent assessment requested. A missing old-tail contribution, incorrect polynomial moment or failed convexity bound would invalidate this reference. Target coefficient intervals must not be reported until directed endpoint signs have been computed and recorded using a known-case-validated instrument.
