# Octahedral Fold-Aware Cross-Binary Theta3minus Speed-Dependent Fold-Pair First-Y G/D Successor Coefficient Recurrence Lemma

Promotion status: `defer-with-blocker`.

The h27 through h37 successor coefficient packets expose a repeatable
coefficient mechanism. This packet proves the formal recurrence and the formal
$G,D$ coefficient identity that the executable certificates witness. It is not
yet an analytic all-order closure theorem: convergence, continuous tail bounds,
and retained branch composition remain open. The immediate theory advance is
that the finite rows are no longer isolated coincidences; they are instances of
one formal fold-null recurrence.

## Formal Coefficient Theorem

Fix the certified positive speed-ratio enclosure

$$
\nu\in[3.02156,3.02157]
$$

and the $\theta_{3-}^{-}$ moving-fold chart. Let the source equation be written
in the local fold coordinates as

$$
F(\delta,\phi;\nu)
=
\nu^{-2}\delta^2-2+\sin\phi+\sin\delta.
$$

The fold-null second derivative is

$$
F_{\eta\eta}(\nu)
:=
(\partial_\delta-\partial_\phi)^2F\big|_{(\delta_f,\phi_f)}
=
\frac{2}{\nu^2}-\sin\delta_f(\nu)-\sin\phi_f(\nu).
$$

This is the geometric slope quantity that the finite certificates inherited
under the local name $F_{\delta\delta}$; it is not the ordinary partial
$\partial_\delta^2F$.

For fixed $n\ge0$, assume the predecessor graph has already selected

$$
\delta_\varepsilon(y,\nu)
=
\delta_f(\nu)+\varepsilon\beta(\nu)y+\gamma(\nu)y^2
+\sum_{j=0}^{n-1}h_{j,\varepsilon}(\nu)y^{j+3}
+O(y^{n+3})
$$

with paired fold coordinate

$$
\phi_\varepsilon(y,\nu)
=
\phi_f(\nu)-\varepsilon\beta(\nu)y-(\gamma(\nu)+2)y^2
-\sum_{j=0}^{n-1}h_{j,\varepsilon}(\nu)y^{j+3}
+O(y^{n+3}),
$$

and assume the source coefficients through $y^{n+3}$ vanish. Introduce the
next local coordinate by

$$
\delta_{n,X}
=
\delta_\varepsilon+X_{n,\varepsilon}y^{n+3},
\qquad
\phi_{n,X}
=
\phi_\varepsilon-X_{n,\varepsilon}y^{n+3},
$$

and set

$$
R_{n,\varepsilon}(y,X,\nu)
=
F(\delta_{n,X},\phi_{n,X};\nu).
$$

Then the $y^{n+4}$ coefficient is affine in $X_{n,\varepsilon}$:

$$
\operatorname{Shift}_{n+4}
\left(
R_{n,\varepsilon}
\right)
=
C_{n,\varepsilon}(\nu)
+S_{n,\varepsilon}(\nu)X_{n,\varepsilon}
+O(y),
$$

with the inherited fold-local slope

$$
S_{n,\varepsilon}(\nu)
=
\varepsilon\beta(\nu)F_{\eta\eta}(\nu).
$$

When $0\notin S_{n,\varepsilon}$ on the speed enclosure, the next formal
coefficient is

$$
h_{n,\varepsilon}(\nu)
=
-\frac{C_{n,\varepsilon}(\nu)}{S_{n,\varepsilon}(\nu)}.
$$

This is the formal recurrence implemented by the finite h27 through h37
successor certificates. Since $S_{n,\varepsilon}=\varepsilon\beta
F_{\eta\eta}$ is independent of $n$, slope separation is not a new burden at
each successor row. One certified interval proof that $\beta F_{\eta\eta}$ is
bounded away from zero on the speed enclosure discharges the solve denominator
for every formal row in this chart.

## Proof Sketch

The fold conditions are

$$
F(\delta_f,\phi_f;\nu)=0,
\qquad
F_\delta(\delta_f,\phi_f;\nu)-F_\phi(\delta_f,\phi_f;\nu)=0.
$$

The successor variable enters only in the fold-null direction:

$$
\partial_X\delta_{n,X}=y^{n+3},
\qquad
\partial_X\phi_{n,X}=-y^{n+3}.
$$

Therefore

$$
\partial_XR_{n,\varepsilon}
=
y^{n+3}
\left(F_\delta-F_\phi\right)(\delta_{n,X},\phi_{n,X};\nu).
$$

Expanding the bracket at the fold gives

$$
F_\delta-F_\phi
=
\varepsilon\beta y
(\partial_\delta-\partial_\phi)^2F\big|_{(\delta_f,\phi_f)}
+O(y^2)
=
\varepsilon\beta F_{\eta\eta}y+O(y^2).
$$

Thus

$$
\partial_XR_{n,\varepsilon}
=
\varepsilon\beta F_{\eta\eta}y^{n+4}+O(y^{n+5}).
$$

Quadratic and higher powers of $X_{n,\varepsilon}$ begin at $y^{2n+6}$. Since
$2n+6>n+4$ for every $n\ge0$, they never affect the $y^{n+4}$ coefficient in
this formal chart. The $y^{n+4}$ coefficient is therefore exactly affine in
$X_{n,\varepsilon}$ with slope $\varepsilon\beta F_{\eta\eta}$, and the
displayed solve makes the source coefficients vanish through $y^{n+4}$ without
changing the predecessor coefficients. This proves the formal recurrence, not
only the observed finite rows.

## Structural G/D Identity

The coefficient identity is not a numerical accident. The directed-rounded
scripts construct the paired $D$ series from the paired $G$ series by

$$
D_{\mathrm{pair}}(y)=(1-y\partial_y)G_{\mathrm{pair}}(y).
$$

If

$$
G_{\mathrm{pair}}(y)=\sum_{m\ge0}G_m y^m,
\qquad
D_{\mathrm{pair}}(y)=\sum_{m\ge0}D_m y^m,
$$

then

$$
D_m=(1-m)G_m.
$$

The quotient coefficients use $Q_{G,k}=G_{k+2}$ and
$Q_{D,k}=D_{k+2}$, so

$$
Q_{D,k}=-(k+1)Q_{G,k},
\qquad
Q_{D,k}+(k+1)Q_{G,k}=0.
$$

Directed-rounded intervals only witness this containment after floating-point
rounding; the identity itself is structural and all-order at the formal series
level.

## Tail Identity

After the coefficient row through $k=n$ has been certified, write

$$
Q_G=A_{G,n}+y^{n+1}T_G^{(n+1)},
\qquad
Q_D=A_{D,n}+y^{n+1}T_D^{(n+1)}.
$$

Along a certified successor root graph, the formal identity becomes

$$
T_D^{(n+1)}
=
-(n+2)T_G^{(n+1)}
-\mathcal D_y^{(X_{n+1})}T_G^{(n+1)},
$$

where

$$
\mathcal D_y^{(X_{n+1})}
=
y\partial_y+\Xi_\varepsilon\partial_{X_{n+1}}.
$$

This explains why each finite packet moves the open problem forward without
changing the algebraic identity: the coefficient row is closed, while the
successor tail still requires a root-tangent enclosure.

## What This Closes

This packet closes three row-ladder uncertainties:

- the $h_n$ solve is formally affine at every successor order, not just through
  the last computed row;
- the solve slope is the same fold-null quantity
  $\varepsilon\beta F_{\eta\eta}$ at every row, so denominator separation is a
  single chart property rather than a row-by-row surprise;
- the $Q_{D,k}+(k+1)Q_{G,k}=0$ identity is an all-order structural identity of
  $D_{\mathrm{pair}}=(1-y\partial_y)G_{\mathrm{pair}}$, with interval
  certificates serving as rounded witnesses.

## Remaining Proof Burden

The formal recurrence is not yet an analytic all-order closure theorem. A
finished retention proof must still show:

- the formal power-series expansion is valid uniformly on the certified speed
  enclosure;
- $\beta F_{\eta\eta}$ has a directed-rounded nonzero interval on the speed
  enclosure, stated once as a chart certificate rather than rechecked as a row
  event;
- coefficient growth admits a convergence, asymptotic, or finite-remainder
  bound strong enough to close the first-y $G,D$ quotient;
- the root-tangent operator $\mathcal D_y^{(X_{n+1})}$ is certified on a
  successor root graph, not applied as a constant-$X$ derivative;
- the resulting first-y enclosure composes with the scaled remainder, `I1`
  regular critical exhaustion, interval quadrature, and retained branch tests.

Until those burdens are discharged, the h27 through h37 packets remain
finite-order analytic certificates, while this packet supplies the formal
all-order recurrence and identity behind them.
