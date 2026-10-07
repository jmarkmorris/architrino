# Independent phase monotonicity and exceptional parameter measure

Claim grade: derived analytical reference, frozen before any new coordinator density subject. All parameters belong to the original complete compatible degree-five family and satisfy $0<\varepsilon\le e=2^{-200000}$. The [independent positive-interval reference](authorized-cases-ten-hour-reference-b-positive-interval-blind.md) supplies the full finite critical expression $\Theta$, its complex relative disks and slow-path majorants. The [corrected zero-branch assessment](authorized-cases-ten-hour-reference-b-zero-branch-adjudication.md) supplies the uniform necessary condition for zero terminal speed. No new numerical target is needed.

## Derivative of the complete critical expression

The following estimate retains all accepted finite coefficients and logarithms:

$$
 \left|\Theta'(\varepsilon)+\frac{81}{256}\varepsilon^{-10}\right|
 <2^{11006}\varepsilon^{-9}.
 \tag{1}
$$

To derive it, use a complex disk $|z-\varepsilon|\le\varepsilon/4$ for each real center in the admitted range. The previous proof applies uniformly because all its smallness conditions improve as the center decreases. Write $Q=z^3Z$, $\delta_0=zd$, $A=Z_r^2+Z_i^2$, $I_0=z^6A$, and $x_0=z^2A^{1/3}$. The accepted initial coefficient norm gives $|A-64/9|\le2^{4100}|z|$, $|d-1|\le2^{4096}|z|^2$, and hence

$$
 |Ad^3-64/9|\le2^{4110}|z|,\qquad |Ad^3|>6.
 \tag{2}
$$

The slow Cauchy radius is $\rho=2^{-10000}$. Its normalized phase coefficients obey $|T_n|\le64\rho^{-n}$ on the whole complex intensity path. The constant coefficient is exactly $T_0=(1-I_0)/4$, as follows by setting the auxiliary slow parameter to zero, where $k=1$ and $H=1/2$. Therefore

$$
 |T_{13}-1/4|
 \le |I_0|/4+64\frac{|\delta_0|/\rho}{1-|\delta_0|/\rho}
 <2^{10009}|z|.
 \tag{3}
$$

Here $|\delta_0|<2|z|$, $|I_0|<8|z|^6$, and $|\delta_0|/\rho<1/2$. Combining (2) and (3) bounds the leading normalized term by

$$
 \left|\frac{T_{13}}{Ad^3}-\frac9{256}\right|<2^{10012}|z|.
$$

The reciprocal grazing correction multiplied by $z^9$ is $5z^6/(8dA^{1/3}k_{13})$, whose modulus is below $2|z|^6$, since all three denominator factors retain their explicit margins. The lifted initial phase and $-\pi$, multiplied by $z^9$, contribute at most $8|z|^9$. Consequently the full finite expression satisfies

$$
 \left|z^9\Theta(z)-\frac9{256}\right|<2^{11000}|z|.
 \tag{4}
$$

This estimate is on punctured relative disks, not a claim that logarithmic terms become holomorphic at zero. For $G(z)=\Theta(z)-(9/256)z^{-9}$, it implies $|G(z)|<2^{11004}\varepsilon^{-8}$ on the disk, because $|z|\ge3\varepsilon/4$ and $(4/3)^8<16$. Cauchy's derivative estimate at its center proves (1).

Since $2^{11006}e<1/100$, (1) yields the convenient uniform inequalities

$$
 \frac14\varepsilon^{-10}< -\Theta'(\varepsilon)
 <\frac12\varepsilon^{-10}.
 \tag{5}
$$

Thus the full critical expression is strictly decreasing and tends to positive infinity as $\varepsilon\downarrow0$. This is a bound on the accepted finite comparison function. It does not assert monotonicity of the actual terminal speed or of the actual lifted physical phase discrepancy.

## Measure of the still-possible zero-speed parameters

Let $C=2^{191000}$ and define the analytically unresolved set

$$
 \mathcal B=\{\varepsilon\in(0,e]:
 \operatorname{dist}(\Theta(\varepsilon),2\pi\mathbb Z)
 \le C\varepsilon^2\}.
 \tag{6}
$$

Every possible zero-terminal-speed member lies in $\mathcal B$ by the corrected, uniformly admitted consumer. Every parameter outside it has the positive-terminal-speed alternative of the original all-future dichotomy. This is an inclusion, not an existence assertion for a zero-speed member.

For any $0<E\le e$, partition $(0,E]$ into shells $(u/2,u]$ with $u=E2^{-j}$. Enlarge the tolerance on each shell to $\tau=Cu^2<1$. The phase image is an interval of length $L$. By (5),

$$
 L\le\frac12(u/2)^{-10}\frac u2=256u^{-9},
 \qquad \min|\Theta'|\ge\frac14u^{-10}.
$$

At most $L/(2\pi)+2$ of the intervals of radius $\tau$ around integer turns intersect this image. This count follows by enlarging the phase image at both ends by $\tau$, using $2\tau<2\pi$. The inverse derivative bound therefore gives

$$
 |\mathcal B\cap(u/2,u]|
 \le8\tau u^{10}\left(\frac L{2\pi}+2\right)
 <\frac{1024}{3}Cu^3+16Cu^{12}
 <2^{10}Cu^3,
 \tag{7}
$$

where $\pi>3$ and $u<1$ suffice for the last two inequalities. Summing the geometric series yields the explicit bound

$$
 \boxed{\quad |\mathcal B\cap(0,E]|<2^{191011}E^3,\qquad
 \frac{|\mathcal B\cap(0,E]|}{E}<2^{191011}E^2.\quad}
 \tag{8}
$$

At $E=e$, the absolute bound is $2^{-408989}$ and the relative bound is $2^{-208989}$. The possible zero-speed set has one-sided Lebesgue density zero at the zero parameter. No probability law, physical population frequency, or measure on arbitrary complete histories is introduced. The complement is an open set of classified positive-speed parameters in the original one-dimensional family. The finite critical expression does cross infinitely many integer turns as the parameter decreases, but (6) cannot establish that any corresponding physical member has zero terminal speed.

Known analytical controls are the exact zero-parameter slow equation $F=0,H=1/2$, its normalized phase $(1-I_0)/4$, the initial cubic coefficient $-8i/3$, and the elementary inverse-image bound for a monotone function with a positive derivative floor. Falsifiers are an omitted finite term in (4), a denominator or complex-path failure in the previously accepted domain, an invalid uniform zero-branch implication, or an incorrect inverse-image count. Only this new proof was written; no evaluator, physical history or compute process was launched.
