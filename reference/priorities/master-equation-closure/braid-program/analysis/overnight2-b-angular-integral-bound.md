# A scale-invariant restriction from the necessary torque mean

## Proposed result

Claim grade: derived, pending independent reconstruction. Every regular periodic normalized limiting orbit with positive angular constant $\ell$ and zero necessary torque mean must satisfy
$$
0<|\mathcal I|\ell^2<\frac{2809}{31250}<\frac9{100}.
$$
Here $\mathcal I<0$ is the mathematical first integral derived for the simultaneous limiting equation; it is not a physical energy premise or a first integral of arbitrary finite-speed delayed paths. The product is unchanged by the limiting homogeneity rescaling $r,z\mapsto s(r,z)$, $\ell\mapsto\sqrt s\ell$, $\mathcal I\mapsto\mathcal I/s$. The scenario remains canonical with $K=c_f=1$.

This is an additional necessary condition on all regular periodic limiting shapes, independent of Fourier or rational representation and of a reflection-symmetric preparation. In particular, the region $|\mathcal I|\ell^2\ge9/100$ cannot supply a zero-torque limit. No finite-speed threshold or numerical candidate membership follows.

## Height required by zero torque

The accepted torque condition is
$$
0=M_\chi=\ell\left\langle\frac{C(h)}{r^2}\right\rangle,
\qquad h=z/r,
$$
$$
C(h)=\frac{N(x)}{12(1+4x)^2(1+x)},\quad x=h^2,\quad
N(x)=19-72x-192x^2-128x^3.
$$
The denominator is positive and $N'(x)=-72-384x-384x^2<0$ for $x\ge0$. Its unique positive zero determines $h_C>0$. The compact-family review has already established that zero torque requires $\max|h|>h_C$: the planar case is strictly positive; every nonplanar periodic height changes sign, and therefore an interval about a height zero contributes strictly positively if $|h|\le h_C$ everywhere.

An exact rational evaluation sharpens a convenient lower bound:
$$
N(25/144)=\frac{1007}{23328}>0,
\qquad h_C>\frac5{12}.
$$
For clarity, the terms are $72(25/144)=25/2$, $192(25/144)^2=625/108$ and $128(25/144)^3=15625/23328$, giving the displayed numerator. Thus some phase of every zero-torque orbit has $|h|>5/12$.

## First integral at that phase

Write the positive shape depth as
$$
a(h)=-u_{\rm sh}(h)=\frac1{\sqrt{1+4h^2}}+\frac1{4\sqrt{1+h^2}}-\frac1{\sqrt3}.
$$
Along every regular periodic limiting orbit the accepted height confinement gives $a(h)>0$. The first integral implies the pointwise identity
$$
|\mathcal I|r+\frac{\ell^2}{2r}+\frac r2(\dot r^2+\dot z^2)=a(h).
$$
The first two positive terms have product $|\mathcal I|\ell^2/2$. Their sum is at least $\sqrt{2|\mathcal I|\ell^2}$, since the square of the difference of their positive square roots is nonnegative. Hence
$$
\sqrt{2|\mathcal I|\ell^2}\le a(h)
$$
at every phase. The function $a$ is even and strictly decreasing for $h>0$. At the phase with $|h|>5/12$,
$$
\sqrt{2|\mathcal I|\ell^2}<a(5/12)
=\frac6{\sqrt{61}}+\frac3{13}-\frac1{\sqrt3}.
$$
This also gives the stronger exact necessary bound $|\mathcal I|\ell^2<a(h_C)^2/2$, using $\max|h|>h_C$ and positivity before squaring; no approximation of $h_C$ is required for that symbolic statement.

## Explicit rational ceiling

The following strict rational comparisons use positive numbers only:
$$
\frac6{\sqrt{61}}<\frac{77}{100},\qquad
\frac3{13}<\frac{231}{1000},\qquad
\frac1{\sqrt3}>\frac{577}{1000}.
$$
The first follows from $360000<61\cdot5929=361669$, the second from $3000<3003$, and the third from $3\cdot577^2=998787<1000000$. Therefore
$$
a(5/12)<\frac{770+231-577}{1000}=\frac{53}{125}.
$$
All quantities in the first-integral inequality are nonnegative, so squaring preserves its strict order and gives
$$
|\mathcal I|\ell^2<\frac12\left(\frac{53}{125}\right)^2
=\frac{2809}{31250}.
$$
Finally $9/100-2809/31250=7/62500>0$. This is a sufficient explicit ceiling, with no optimality claim; the sharper expression involving $h_C$ is retained above.

The same inequalities give a direct positive-torque exclusion for the complementary region. If $|\mathcal I|\ell^2\ge2809/31250$, the pointwise first-integral bound prevents $|h|\ge5/12$. Since $5/12<h_C$, the torque integrand is strictly positive at every phase. For $\ell>0$, its period mean is strictly positive. This proves the exclusion without assuming zero torque and deriving a contradiction separately.

## Scope, falsifiers and preservation

This result assumes a regular periodic limiting orbit with positive radius and angular constant, the accepted negative first integral and canonical torque coefficient. It does not need a period bound, radius ceiling, waveform degree or chosen section. Negative angular orientation reverses the torque sign; the zero-mean restriction on the squared constant is unchanged if that case is separately admitted. Compact exact slow families in the current positive-rate scenario have $\ell>0$ already.

An error in the polynomial evaluation, in the pointwise first-integral signs, in the strict monotonicity of the shape depth, or in any exact rational comparison defeats its corresponding step. A regular periodic limiting orbit with zero torque and product at or above the stated ceiling would directly falsify the result. Neither an arbitrary nonperiodic preparation nor a finite-speed delayed orbit is a counterexample to this limiting theorem.

All calculations are displayed exact arithmetic; no new numerical instrument or target is needed. Original evidence remains unchanged. Independent reconstruction and parent integration into the second-allocation account are pending before acceptance.
