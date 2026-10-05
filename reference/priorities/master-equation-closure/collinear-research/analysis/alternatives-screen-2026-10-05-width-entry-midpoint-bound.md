# A rigorous higher-order source enclosure route

This is a proposed efficiency route if complete range quadrature remains too expensive for the fourth-law proof envelope. It leaves the law, nominal candidate, preparation and first-crossing theorem unchanged. No target implementation or result is supplied here.

For an ordinary future-source interval $z\in[z_0,z_1]$, write $E=v^2/2$, $F=E'$, $a=1/v$, $T'=a$, and let $c$ be a receiver-frozen positive width factor. For either self or partner, $R=B-z$ and

$$
g=R-\frac{T(d)-T(z)}c,\quad
a'=-Fa^3,\quad a''=3F^2a^5-F'a^3,\quad
g'=-1+a/c,\quad g''=a'/c.
$$

On a source cell whose triangular branch is fixed, write $w(g)=(h-\sigma g)/h^2$, $\sigma\in\{-1,1\}$, or use the constant zero/peak branches. Then $w'=-\sigma g'/h^2$ and $w''=-\sigma g''/h^2$. For $f(R)=R(R^2+\rho^2)^{-3/2}$,

$$
f'(R)=\frac{\rho^2-2R^2}{(R^2+\rho^2)^{5/2}},\qquad
f''(R)=\frac{3R(2R^2-3\rho^2)}{(R^2+\rho^2)^{7/2}}.
$$

The source integrand $J=f(R)w(g)a$ has

$$
J''=f''wa-2f'w'a-2f'wa'+fw''a+2fw'a'+fwa''.
$$

These expressions admit interval evaluation from exact cubic Bernstein bounds for $E,E',E''$ and the already enclosed $T$. If $\ell=z_1-z_0$ and $m=(z_0+z_1)/2$, a classical integral Taylor remainder gives

$$
\int_{z_0}^{z_1}J(z)\,dz\in \ell J(m)+[-1,1]\frac{\ell^3}{24}\sup_{[z_0,z_1]}|J''|.
$$

This is a mathematical enclosure, not a quadrature error heuristic. Midpoint and length must themselves be exact rational/dyadic objects or enclosed outward; a rounded midpoint must not silently change the symmetric interval used by the $1/24$ remainder.

The lower and upper functional bounds contain endpoint minima or interval maxima of the triangular window. Let $g_\alpha\le g_\beta$ be the two endpoint gaps. The lower endpoint choice is determined by the sign of $g_\alpha+g_\beta$: nonnegative sum selects $g_\beta$ as the farther endpoint, nonpositive sum selects $g_\alpha$. The upper window is the peak when $g_\alpha\le0\le g_\beta$, otherwise it uses the endpoint nearest zero. An interval cell may use the smooth Taylor formula only when these branch decisions and the triangular support/sign branches are proved for every receiver/source point in the cell. Uncertain cells retain ordinary range integration or are split. Constant receiver factors $1/\alpha$ or $1/\beta$ multiply the resulting enclosure.

For the preparation source coordinate $r$, $z=d_*r^3$ and $dT=T_*dr$ remove the singular endpoint. Here $R'=-3d_*r^2$, $R''=-6d_*r$, $g'=R'+T_*/c$ and $g''=R''$. The required second derivative is

$$
J''=T_*\left[(f''(R)(R')^2+f'(R)R'')w+2f'(R)R'w'+fw''\right].
$$

The held source tail remains its exact CDF contribution. Every nonsmooth branch seam is covered by interval classification or fallback, so none can be skipped by a midpoint-zero heuristic.

> Grade: derived enclosure formulas and proposed implementation route, awaiting independent assessment. Incorrect branch classification, an under-enclosed second derivative, a rounded-center mismatch or a missing variable-endpoint source strip would invalidate a certificate. Known affine/polynomial controls must precede any target application of a future implementation.
