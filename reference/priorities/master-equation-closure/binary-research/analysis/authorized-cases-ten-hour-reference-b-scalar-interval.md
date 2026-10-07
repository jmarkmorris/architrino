# Blind reference for the directed scalar phase consumer

Frozen before the proposed integer-interval evaluator is disclosed. Claim grade: derived representation and numerical proof obligations. The unchanged member has $\varepsilon=2^{-200000}$. The prepared input and finite slow coefficient identities are independently accepted; their analytic and actual-history errors must remain explicit additions to the final scalar interval. This note does not evaluate a phase or classify a branch.

## Exact normalized scalar identity

Factor the accepted initial coordinate polynomials as $Q_0=\varepsilon^3 z$, $\delta_0=\varepsilon d$, where $z=-8i/3+O(\varepsilon)$ and $d=1+O(\varepsilon^2)$. Define $A=|z|^2$ on the real input, $X=A^{1/3}>0$ and $x=I_0^{1/3}=\varepsilon^2X$. These normalized quantities remain of order one, while $I_0=\varepsilon^6A$. The original lifted initial phase is

$$
 \psi_0=-\frac\pi2+\arctan\left(\frac{\Re z}{-\Im z}\right).
$$

The negative imaginary sign and tiny real ratio are independently certified by the coefficient bound. This identity fixes its quadrant; a generic single-argument arctangent without that sign check is insufficient.

For the accepted normalized phase polynomial $T$ and endpoint multiplier polynomial $k$, evaluate their exact Laurent-logarithmic endpoint expressions at $(\delta_0,x,\log x)$. Then

$$
 \psi(1)=\psi_0+\varepsilon^{-9}\frac{T}{A d^3},\qquad
 \delta_1=\varepsilon^3 dXk.
$$

The logarithm is conveniently split using the known leading $A=64/9$:

$$
 \log x=-399998\log2-\frac23\log3
 +\frac13\log\left(\frac{9A}{64}\right).
$$

Every coefficient, endpoint power and logarithmic term must be retained, even when its leading contribution is much smaller than the leading phase. The critical scalar is $\psi(1)+5/(8\delta_1)-\pi$, with all accepted section, multiplier, input and actual phase errors appended. No unproved cancellation is used to shorten that list.

## Directed integer intervals

A fixed-point interval with scale $2^P$ can be certified entirely with integer arithmetic. For every product, quotient or rational coefficient, the lower endpoint uses the mathematical floor and the upper endpoint the mathematical ceiling, including negative operands. Division requires a denominator interval excluding zero. Products take all four endpoint combinations. Exact dyadic shifts must preserve both endpoints and round outward if they discard bits.

A square or cube root interval can be enclosed by integer root inequalities on suitably scaled nonnegative endpoints. The cube root here is positive. No library floating-point rounding mode is required. Horner evaluation or exact term sums are both valid if every intermediate rounding is outward; a small computed width is meaningful only after those contracts are checked.

For $|y|<1$, the exact series

$$
 \operatorname{atanh}y=\sum_{j=0}^{n-1}\frac{y^{2j+1}}{2j+1}+R_n,
 \qquad |R_n|\le\frac{|y|^{2n+1}}{(2n+1)(1-y^2)}
$$

supplies logarithms through $\log a=2\operatorname{atanh}((a-1)/(a+1))$. Rational $y=1/3$ and $1/2$ give $\log2$ and $\log3$. The tiny near-one correction uses the same identity with its certified interval argument. Alternating arctangent tails are bounded by the first omitted term for positive rational argument; odd symmetry handles a negative input. Exact rational binary splitting is a method of summing the same finite series, not an independent transcendental premise.

The Machin identity $\pi=16\arctan(1/5)-4\arctan(1/239)$ can be checked by the tangent addition formula and a quadrant bound: the right side lies in $(3,4)$ and has zero sine at the appropriate quarter-angle relation. Its two interval series and explicit tails therefore enclose $\pi$. Known controls must separately exercise the rational binary split against direct short sums and the sign/orientation of both tails.

## Precision and the final integer comparison

The phase has magnitude of order $\varepsilon^{-9}=2^{1800000}$. An absolute fixed-point error of order $2^{-P}$ before this amplification becomes order $2^{1800000-P}$ afterward. The proposed exclusion margin is $2^{196000}\varepsilon^2=2^{-204000}$. Thus precision must exceed roughly 2,004,000 bits plus a proved allowance for accumulated interval operations and multiplication by the large revolution index. A 65,536-bit run can profile constant-generation cost, but cannot decide this physical target at that margin. The actual emitted interval width, not this rough count, is the acceptance condition.

The multiple of $2\pi$ must be enclosed with the same directed discipline. For a positive critical interval $[L,U]$ and $2\pi\in[p_-,p_+]$, bounds on its quotient are $L/p_+$ and $U/p_-$. Integer floors determine whether one revolution cell contains the whole interval. If a boundary might be crossed, the result is unresolved unless a finer certified subdivision or precision removes that uncertainty. The distance to both neighboring multiples must use the interval for $\pi$ multiplied by the actual integer index; treating the integer as exact does not make that product error vanish.

Receipt storage should preserve exact integer endpoints, the binary precision, all input digests, truncation parameters and tail bounds. Hexadecimal integers avoid decimal conversion limits for million-bit values. A small decimal summary is not the certificate. The final numerical audit must use an independently authored evaluator or independently check every certificate against these identities; rerunning the producer is not evidence of accuracy.

Known controls include signed directed division, multiplication across zero, exact and inexact roots, rational series sums and tails, the Machin quadrant, normalized leading phase, and both a separated and a boundary-containing modular interval. Falsifiers are an inward rounding, an omitted analytic tail, a wrong normalized power, loss of the initial phase quadrant, or failure to exclude the entire prescribed neighborhood of every multiple. No target computation or subject source was accessed.
