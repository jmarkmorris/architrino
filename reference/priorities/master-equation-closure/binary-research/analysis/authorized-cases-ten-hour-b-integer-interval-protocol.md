# Directed integer intervals for the fixed preparation's finite phase

**Status: prospective numerical method, before any physical scalar target.** This protocol evaluates only the already defined finite expressions for the unchanged fixed gradient member. Independent acceptance of the initial coefficients, slow coefficients, analytical tails, actual phase bound and corrected physical section are prerequisites. Known arithmetic and transcendental controls precede any target. The eventual output is an interval decision with an explicit mathematical consumer; it is not a time-stepped trajectory or a replacement EOM solver.

## Directed arithmetic and normalization

At precision $P$, represent a real interval by two integers $[L,U]2^{-P}$. Addition is exact. Multiplication takes the minimum and maximum of the four integer products, then rounds outward after division by $2^P$. Division likewise evaluates the four endpoint quotients and rounds outward, provided the denominator interval excludes zero. Rational inputs use exact numerator/denominator division with floor and ceiling. Integer powers use these operations. Square and cube roots use integer root bounds on $L2^P$ and $L2^{2P}$ respectively, with a one-unit outward upper allowance when needed. Every operation therefore encloses its mathematical interval directly; no floating-point rounding mode or transcendental library premise is used.

The finite initial series is evaluated in normalized form

$$
Q_0=\epsilon^3 z,\qquad \delta_0=\epsilon d_0,\qquad
I_0=\epsilon^6 A,\quad A=|z|^2,\qquad
x_0=I_0^{1/3}=\epsilon^2 X,\quad X=A^{1/3}.
\tag{1}
$$

The leading controls are $z=-8i/3$, $d_0=1$, $A=64/9$. This avoids losing the small leading coordinates in a fixed absolute grid. All admitted higher coefficients are retained; contributions smaller than one grid unit receive directed interval rounding, not deletion without error. The initial phase is $-\pi/2+\arctan(z_{\rm real}/(-z_{\rm imag}))$, on its verified lower-half-plane branch. The same prepared coordinate pair supplies $A$ and the argument; no phase is reset.

The slow output consists of endpoint polynomials in $x_0$ and $\log x_0$, with rational coefficients, multiplied by powers of $\delta_0$. Denote its normalized phase by $T^{[13]}$ and endpoint multiplier by $k^{[13]}$. Evaluate

$$
\psi^{[13]}(1)=\psi_0+
\epsilon^{-9}\frac{T^{[13]}}{A d_0^3},\qquad
\delta_1^{[13]}=\epsilon^3 d_0Xk^{[13]}.
\tag{2}
$$

The finite critical phase is the expression in the [corrected section candidate](authorized-cases-ten-hour-b-final-grazing-section-v2.md), including $5/(8\delta_1^{[13]})-\pi$. The evaluator reports the entire directed interval and its quotient/remainder relative to $2\pi$. If the quotient interval straddles an integer, it reports unresolved rather than selecting one quotient.

## Elementary transcendental enclosures

Use the exact identities

$$
\pi=16\arctan(1/5)-4\arctan(1/239),\qquad
\log2=2\operatorname{atanh}(1/3),\qquad
\log3=2\operatorname{atanh}(1/2).
\tag{3}
$$

The first follows from the tangent addition formula with the angle in $(0,\pi/2)$; the other two follow from $2\operatorname{atanh}z=\log[(1+z)/(1-z)]$. These mathematical identities and the series tails are the references for the numerical instrument.

For $q>1$ and sign $s=\pm1$, sum the first $N$ terms of

$$
\frac1q\sum_{j\ge0}\frac{s^j}{q^{2j}(2j+1)}.
\tag{4}
$$

This is $\arctan(1/q)$ for $s=-1$ and $\operatorname{atanh}(1/q)$ for $s=1$. Exact rational binary splitting uses consecutive term ratio $s(2j+1)/[q^2(2j+3)]$. At each leaf its partial sum relative to the first term is one; joining intervals uses the left partial sum plus the left term-product times the right partial sum. Thus every finite sum is exact integer rational arithmetic. Independent known controls compare the complete rational result with separately accumulated direct fractions before a large sum is run.

The alternating remainder has absolute value at most $q^{-2N-1}/(2N+1)$. The positive remainder is at most that quantity divided by $1-q^{-2}$. Choose $N$ using the integer lower bounds $q^2\ge2^k$, with $k=4,15,3,2$ for $q=5,239,3,2$, so $kN\ge P+32$. The tail is smaller than one grid unit with ample margin. One extra unit on each side of the rounded finite rational therefore encloses the full transcendental value. The series proof is independent of agreement at two resolutions.

For the logarithm of the actual algebraic input use

$$
\log x_0=(-400000+2)\log2-\frac23\log3
+\frac13\log(1+\zeta),\qquad
\zeta=\frac{9A}{64}-1.
\tag{5}
$$

The small correction is evaluated as $2\operatorname{atanh}[\zeta/(2+\zeta)]$. Its interval argument must have magnitude below $1/2$. A finite directed series and the geometric absolute tail bound enclose it. The initial argument in (1) is treated similarly with the alternating arctangent series and an absolute remainder bound. These small series stop only when their proved tail fits one grid unit; interval width is retained separately.

## Controls, finite budget and decision boundary

The known suite covers signed floor/ceiling, multiplication and division across signs, exact and inexact square/cube roots, binary-split sums against direct fractions, the identities and rational bounds for $\pi$, $\log2$, $\log3$, and small argument/logarithm series. A separate known-constant profile at increasing precision measures cost before selecting the target budget. It evaluates no physical coefficients or phase. All jobs use the shared venv, the owned supervisor, advancing recursion/stage output, finite memory and output budgets, and an internal cutoff before the outer deadline.

The proposed target precision is $P=2100000$ bits. Precision is a method choice, not a physical parameter. All errors are read from the emitted directed intervals and independently proved analytical budgets; the bit count alone is not evidence of sufficient accuracy. The subject and reference evaluators must independently check coefficient bindings, normalization, transcendental enclosures, quotient selection and the final distance from $2\pi\mathbb Z$. The concrete section threshold is $2^{196000}\epsilon^2=2^{-204000}$, subject to independent section admission. A target interval meeting zero or its required exclusion neighborhood remains unresolved. No subsequent interval is substituted for an unresolved earlier physical grazing section.

Falsifiers are an incorrect signed rounding, failed integer root bracket, wrong branch in the initial phase, missing endpoint logarithm, invalid series tail or Machin angle range, input digest mismatch, unresolved quotient, or a final margin smaller than the sum of numerical and analytical uncertainties. This protocol does not authorize its target until the independent admissions are complete.
