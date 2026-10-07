# Blind rotation-normal-form conventions and controls

**Derived before the new normal-form protocol or target is disclosed.** The input is the finite geometric-angle comparison field of the original amplitude-gradient investigation. Put $x=w-1$, $q=x+iu$, $\bar q=x-iu$, and retain $\eta$ as the small parameter variable. The central field is $q_\phi=iq$, $\bar q_\phi=-i\bar q$, $(\log\eta)_\phi=0$. Complex variables are algebraic coordinates with the usual real-conjugacy constraint, not a complex physical history.

## Fix the forward-map convention first

Use a forward coordinate map from new to old variables. At one degree write

$$
q_{\mathrm{old}}=Q+\nu^n H_q(Q,\bar Q),\qquad
\log\eta_{\mathrm{old}}=\log\nu+\nu^nH_\ell(Q,\bar Q),
$$

and its conjugate. The transformed field is obtained from the exact identity $D\Phi\,X_{\mathrm{new}}=X_{\mathrm{old}}\circ\Phi$. Its degree-$n$ coefficient is $F_n-\mathcal L H_n$, where $\mathcal LH=DH\,X_0-DX_0\,H$. Thus on a monomial $Q^a\bar Q^b$, the homological divisors are

$$
i(a-b-1)\quad\text{in the }q\text{ component},\qquad
i(a-b+1)\quad\text{in its conjugate},\qquad
i(a-b)\quad\text{in the logarithmic parameter component}.
$$

The nonresonant forward correction is the coefficient divided by this divisor. The retained normal coefficient is its resonant projection. Reversing the coordinate direction reverses this sign; a consumer must not mix a backward correction with the recorded forward map.

Resonant $q$ monomials have $a-b=1$ and are $Q$ times a polynomial in $I=Q\bar Q$. Resonant logarithmic parameter monomials have $a=b$ and are polynomials in $I$. Imaginary coefficients in the resonant $q$ row are frequency changes, not removable errors. No rescaling of geometric angle is included here.

A zero-resonant correction fixes each one-degree homological solution, but does not by itself specify whether higher degrees use additive coordinate maps or Lie-flow maps. Those gauges differ at higher order. A constructor must freeze one exact composition rule and carry its full forward map before coefficients from separate implementations can be compared.

## Parameter dynamics and grading

The third input row is $(\log\eta)_\phi$, not $\eta_\phi$. In directional differentiation its contribution is $C\eta\partial_\eta$. Therefore differentiation of a degree-$n$ term produces the factor $nC$. Under the forward logarithmic map, the actual parameter is $\eta=\nu\exp(H_\ell)$; its composition changes later coefficients and cannot be replaced by $\eta=\nu$.

All coordinate composition, Jacobian inversion and homological steps are finite parameter-series operations. Truncating at order sixteen must retain every cross term with total order at most sixteen, including the parameter-component feedback. The input has no degree-one perturbation, so changes caused by a degree-two correction first affect degree four; cubic leading controls remain the raw cubic projections. Reality is preserved by conjugating coefficients and exchanging $Q,\bar Q$.

## Independent full quadratic and cubic controls

From the already known full angle field, with $w=1+x$, the complex and logarithmic rows are

$$
P_2=-2wu+i(-u^2-w^2/2),\qquad C_2=u,
$$

$$
P_3=\frac83w^2-\frac{4i}3uw,\qquad C_3=-\frac43w.
$$

The resonant projections are

$$
\langle P_2\rangle=\frac i2Q,\qquad
\langle C_2\rangle=0,\qquad
\langle P_3\rangle=2Q,\qquad
\langle C_3\rangle=-\frac43.
$$

For the forward convention above, the zero-resonant quadratic corrections are

$$
H_{2,q}=\frac12+\frac34\bar Q+\frac58Q^2
+\frac34Q\bar Q+\frac18\bar Q^2,
\qquad H_{2,\ell}=-\frac12(Q+\bar Q).
$$

The cubic corrections, unaffected by quadratic composition at this degree, are

$$
H_{3,q}=\frac{8i}3+\frac{5i}3\bar Q-\frac i3Q^2
+\frac{4i}3Q\bar Q+\frac i3\bar Q^2,
\qquad H_{3,\ell}=\frac{2i}3(Q-\bar Q).
$$

These full polynomial controls check the orientation, divisor signs, constants, conjugacy and logarithmic-parameter convention before any higher target. A simple additional control is a field containing only a resonant monomial: its correction must vanish and its coefficient must remain unchanged.

For a complete target audit, checking that every displayed output is resonant is insufficient. The retained forward coordinate map must satisfy the full conjugacy residual $D\Phi\,X_{\mathrm{normal}}-X_{\mathrm{input}}\circ\Phi=0$ through the claimed degree, and its constant/linear identity must match the fixed gauge. That exact residual is an independent consumer of the separately checked autonomous input coefficients.

A finite normal form does not prove an actual long-time error bound, a scalar phase interval or terminal section separation. Resonant slow transport can require logarithms, and the original prepared layer remains a separate input. Falsifiers are a wrong divisor sign, missing $\eta\partial_\eta$ feedback, silently changed map gauge, a failed low polynomial control or a nonzero conjugacy residual. No higher normal-form subject or target was used.
