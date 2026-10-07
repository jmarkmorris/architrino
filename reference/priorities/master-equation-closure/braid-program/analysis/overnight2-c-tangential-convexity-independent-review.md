# Independent reconstruction of tangential-pair convexity

## Verdict and verification boundary

**Derived verdict:** the [frozen tangential-pair convexity proof](overnight2-c-tangential-pair-convexity.md) is correct for $0\le v\le1$ and every interior angle in the complete equal-radius chart. Its derivative polynomial, all cubic Bernstein coefficients, auxiliary quartic Bernstein coefficients, strict positivity argument, endpoint asymptotics, and linked-gap consequence were independently reconstructed. No defect was found.

Specifically $B_v'''<0$, the complete paired tangential response $Q_v$ is strictly convex with a unique interior minimum $m_v$, and any tangential-balanced alternating configuration at positive speed has every complementary gap $x_i<m_v$. Thus its gaps summing to $\pi$ require $m_v>\pi/3$. This does not locate $m_v$ or establish existence, global phase exclusion, equal gaps, or stability. The equation remains coefficient-one logarithmic reception with $K_{\log}=c_f=1$, unchanged transmitter weighting, and all ordinary positive-delay roots.

## Known-first exact-check record

Before any target execution, the separately authored [exact checker](../evidence/overnight2-c-curvature-independent-check.py) passed five controls under the shared venv: the analytically known static cotangent third derivative; manufactured cubic Bernstein coefficients $(1,1/3,2/3,-2)$ for $1-2v+3v^2-4v^3$; quartic monomial coefficients $(0,0,0,0,1)$ for $x^4$; the quartic Bernstein partition of unity; and the second derivative of $(c+v)^3$. The known-stage receipt is `.local-data/master-equation-closure/overnight2-c/review-curvature-known.json`. It reports SymPy 1.14.0, 0.12881425023078918 seconds by `time.perf_counter`, and 61,128,704 bytes peak resident memory by `resource.getrusage`.

This pass was recorded before running the target. The new checker imports no subject instrument or parent probe and starts its target derivative from the geometric kernel. The hand derivation and the exact expansion check are distinguished below. Limits remained 30 instrument seconds, 400 MB resident memory, 50 kB output, one thread, and the unchanged exploration stop at 13:55:15 UTC and hard deadline at 15:25:15 UTC on October 7.

## Independent derivative reconstruction

Write $c=\cos(\alpha/2)$, $U=1-c^2>0$, and $D=1-vc>0$, with $\beta=\alpha-2v\sin(\alpha/2)$. Direct differentiation of the geometric chart gives the differential operator

$$
\mathcal L=\frac d{d\beta}=-\frac{\sqrt U}{2D}\frac d{dc},
\qquad B_v=\frac{c}{\sqrt U D}.
$$

Applying it once recovers $B_v'=-(1-vc^3)/(2UD^3)$. Applying it a second time and collecting terms gives an independently obtained intermediate numerator

$$
B_v''=\frac{M}{4U^{3/2}D^5},\qquad
M=2c+v(3-8c^2+c^4)+2v^2c^5.
$$

The third application therefore yields

$$
B_v'''=-\frac{UD\,\partial_cM+(3cD+5vU)M}{8U^2D^7}
=-\frac{N}{4U^2D^7}.
$$

Expanding the numerator gives

$$
\begin{aligned}
N={}&1+2c^2
+\left(\frac c2-9c^3-\frac{c^5}{2}\right)v\\
&+\left(\frac{15}{2}-24c^2+\frac{59c^4}{2}-4c^6\right)v^2
-3c^7v^3,
\end{aligned}
$$

exactly the frozen polynomial. This hand recurrence provides a separate mathematical reference. The independently authored checker also differentiates the original geometric expression three times with SymPy, verifies the intermediate $M$, expands the recurrence, and compares all ten nonzero rational coefficients with the subject. It neither imports nor executes the parent's symbolic proposal instrument.

## Reconstructing all Bernstein coefficients and their signs

For a cubic power polynomial $N=A_0+A_1v+A_2v^2+A_3v^3$, the Bernstein coefficients are $b_0=A_0$, $b_1=A_0+A_1/3$, $b_2=A_0+2A_1/3+A_2/3$, and $b_3=A_0+A_1+A_2+A_3$. Substitution and factoring give

$$
\begin{aligned}
b_0&=1+2c^2,\\
b_1&=\frac{1-c}{6}(c^4+c^3+19c^2+7c+6),\\
b_2&=\frac{(1-c)^2}{6}(-8c^4-18c^3+31c^2+44c+21),\\
b_3&=\frac{(1-c)^3}{2}(6c^4+26c^3+61c^2+52c+17).
\end{aligned}
$$

The independent exact checker confirms every coefficient by the general power-to-Bernstein identity $b_k=\sum_{j=0}^k A_j\binom{k}{j}/\binom{3}{j}$. Positivity is a separate hand argument, not an inference from sampled values:

- $b_0$ is positive. For $c\ge0$ the bracket in $b_1$ is manifestly positive. For $-1<c<0$, $c^4+c^3\ge-1$, so it is bounded below by $19c^2+7c+5>0$, whose discriminant is $49-380=-331$.
- For $0\le c<1$, $c^3,c^4\le c^2$ makes the bracket in $b_2$ at least $5c^2+44c+21>0$. For $c=-x$ with $0<x<1$, it becomes $x^3(18-8x)+(31x^2-44x+21)$. Both terms are nonnegative and the quadratic is strictly positive because its discriminant is $1936-2604=-668$.
- For $c\ge0$ the bracket in $b_3$ has positive coefficients. For $c=-x$, its power polynomial is $17-52x+61x^2-26x^3+6x^4$. Transforming to the quartic Bernstein basis gives $(17,4,7/6,2,6)$, checked independently both by the transformation formula and exact expansion. The quartic basis functions are nonnegative and sum to one on $[0,1]$, so the polynomial is at least $7/6>0$ there.

All factors $1-c$ are strictly positive for the physical interior $-1<c<1$. Thus all four cubic Bernstein coefficients are strictly positive. Their weights $(1-v)^3$, $3v(1-v)^2$, $3v^2(1-v)$, and $v^3$ are nonnegative and sum to one for $0\le v\le1$. It follows that $N>0$, including the endpoint speeds, and then $B_v'''<0$ because $4U^2D^7>0$.

At $v=0$ this reduces to the known third derivative of $\cot(\beta/2)$. At $v=1$ only $b_3$ remains and its positive factorization proves the sign at every interior angle. The vanishing of some factors as $c\to1$ is an excluded coincidence limit; it does not undermine strict interior positivity or establish a uniform derivative bound there.

## Endpoint asymptotics and the unique minimum

For any fixed $v<1$, as $\alpha\downarrow0$ the independent Taylor expansions give $\beta=(1-v)\alpha+O(\alpha^3)$, $D=(1-v)+O(\alpha^2)$, and $\cot(\alpha/2)\sim2/\alpha$. Hence $B_v(\beta)\sim2/\beta$. This expansion is fixed-speed, not uniform as $v\uparrow1$.

At $v=1$ the linear term disappears: $\beta=\alpha^3/24+O(\alpha^5)$, $D=\alpha^2/8+O(\alpha^4)$, and $B_1\sim16/\alpha^3\sim2/(3\beta)$. At the other endpoint, set $\epsilon=2\pi-\alpha\downarrow0$. For every fixed $0\le v\le1$,

$$
2\pi-\beta=(1+v)\epsilon+O(\epsilon^3),\qquad
D=(1+v)+O(\epsilon^2),\qquad
B_v\sim-\frac{2}{(1+v)\epsilon}\sim-\frac2{2\pi-\beta}.
$$

The paired function $Q_v(x)=B_v(x)-B_v(x+\pi)$ therefore tends to positive infinity at both ends of $(0,\pi)$; the term evaluated near $\pi$ stays finite in each limit. Also

$$
Q_v''(x)=B_v''(x)-B_v''(x+\pi)
=-\int_x^{x+\pi}B_v'''(y)\,dy>0.
$$

The endpoint divergences ensure an attained interior minimum, and strict convexity makes it unique. Writing it as $m_v$, differentiability gives $Q_v'(m_v)=0$ and strict increase of $Q_v'$ gives a negative derivative to its left and a positive derivative to its right. At the static control speed, $Q_0(x)=2\csc x$ and $m_0=\pi/2$, consistent with these properties. No minimum location is thereby established for positive speeds.

## Linked-gap restriction and complete histories

For $v>0$, $H_v(\pi)=\pi-2v<\pi$, so $\alpha_v(\pi)>\pi$ and $B_v(\pi)<0$. The independently reconstructed full alternating equations give

$$
Q_v(\pi-x_{i-1})-Q_v(x_i)=B_v(\pi)<0,
\qquad x_1+x_2+x_3=\pi,
\qquad x_i>0.
$$

The first argument is $\pi-x_{i-1}=x_i+x_{i+1}>x_i$. If $x_i\ge m_v$, both arguments are on the increasing side of $Q_v$ and their difference is strictly positive, even when the smaller argument equals the minimizer. This contradicts the required negative right side. Therefore every gap lies strictly below $m_v$, and summing gives $\pi<3m_v$. A speed with $m_v\le\pi/3$ is thus excluded from tangential-balanced alternating configurations. The statement is a conditional exclusion until such a minimum location is separately bounded.

These are the complete equations: each positive receiver has the preceding positive and its negative antipode, the following positive and its negative antipode, and its own negative antipode. The paired differences encode four rows and the right-side $B_v(\pi)$ encodes the fifth. The complete angle map gives exactly one ordinary positive-delay root for every distinct partner throughout $0\le v\le1$, zero positive self roots, and the remaining fifteen negative-receiver rows by antipodal symmetry. The static control changes no root selection. No omitted self or distant-history term can alter the displayed derivative or gap implication within this domain.

## Target receipt, commands, and identities

**Measured exact-algebra result:** the independent checker target passed direct differentiation, the hand recurrence, all ten power coefficients, all four cubic Bernstein coefficients, all five auxiliary quartic coefficients, and both discriminants. Its receipt `.local-data/master-equation-closure/overnight2-c/review-curvature-target.json` reports 0.1806549159809947 seconds and 61,112,320 bytes peak resident memory with SymPy 1.14.0. Output-size and resource assertions passed. This verifies algebraic identities, not the analytical inequalities by sampling; the sign, asymptotic, and root arguments are supplied above.

Commands executed in order, with the known pass recorded in this file between them:

```bash
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-curvature-independent-check.py --stage known > .local-data/master-equation-closure/overnight2-c/review-curvature-known.json
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-curvature-independent-check.py --stage target > .local-data/master-equation-closure/overnight2-c/review-curvature-target.json
```

Measured SHA-256 identities from `shasum -a 256`:

- Frozen subject: `2df7a089024ca3e38958ce97018255cb680b0bf9c4079dbe0d712a7518195a96`.
- Independent checker: `fa03177404c03364c2cc681e0c5b610a14021907ef8d04516f71137c34631d04`.
- Known receipt: `7ff65628295904bac1cad6c2823c761d9806400dbaee54ae13885d5f8c0dcdc6`.
- Target receipt: `7044c51c08765cc76e80b0c3280712fdc31bc5b0746bbf85f69e460c73e0612a`.

## Falsifiers and preservation

An incorrect differential operator or numerator coefficient, a nonpositive Bernstein coefficient at an interior $c$, a failed endpoint divergence, or a tangential-balanced alternating configuration with a gap at least $m_v$ would falsify the corresponding result. Agreement with the parent proposal's output is not the independence argument: the geometric operator, hand-derived intermediate recurrence, separately authored exact expansion, and known controls provide it. The exact checker still relies on the shared SymPy algebra implementation; it is not a formal proof of that software.

Only the authorized new review, new independent checker, and review-prefixed local receipts were written. Frozen subjects, the parent's symbolic proposal instrument, main report, shared owners, and prior evidence were preserved. Both foreground checks completed; no grid or background process was launched. The clock tool returned 2026-10-07 07:33:16 UTC at this review's start, within the unchanged allocation. Parent integration and the newly assigned subsequent interval pilot remain separate.
