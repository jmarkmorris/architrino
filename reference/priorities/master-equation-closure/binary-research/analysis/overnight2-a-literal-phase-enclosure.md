# Rational enclosure of the original nominal phase expression

**Arithmetic subject, pending independent assessment.** This calculation encloses a specified expression in the exact original tokens. It does not itself establish the phase of a coupled solution. Its use requires the separate complete-history release and accumulated-error proofs. The [corrected account](overnight2-a-canonical-adiabatic-account.md) has independently matched coefficients; no physical equation is replaced by that finite polynomial.

Retain $K=\kappa q^2=4\epsilon^2$, $c_f=1$, $w=0.00033356409519815205$, $\Delta=3.1415926535897931$, $q=0.1666666666666666666666666666666667$, and $\kappa=0.000016022161698524887$. In axes with initial centered radius along $n_0$, the exact initial quantities are

$$
r_0=\sin(\Delta/2),\quad
h_0=(w/\epsilon)r_0^2,\quad P_0=0,\quad Q_0=h_0^2/r_0,
\quad I_0=\mathcal I_6(0,Q_0,h_0),\quad \rho_0=\sqrt{I_0}.
$$

Define the leading corrected-vector direction $\phi_*$ from

$$
c_*=(Q_0-1)n_0/h_0+(2\epsilon/h_0^2)t_0,
\qquad \phi_*=\arg c_*.
$$

The expression to enclose is

$$
\theta_*=(\rho_0^{-1}-h_0)/\epsilon
-\frac{\epsilon}{h_0}(Q_0-2/3),\qquad
\Gamma=\operatorname{wrap}_{[-\pi,\pi)}(\theta_*-\phi_*-\pi).
\tag{1}
$$

All arithmetic in the [instrument](../evidence/overnight2-a-literal-phase-enclosure.py) uses rational intervals. Square-root endpoints come from integer square roots of scaled integer ratios: at decimal scale $D$, $\lfloor\sqrt{a}\,D\rfloor$ is obtained by the integer square root of $\lfloor aD^2\rfloor$, giving lower endpoint $m/D$ and upper endpoint $(m+1)/D$. Monotonicity extends this to interval inputs. The default scale is $10^{70}$; no rounded floating square root supplies an endpoint.

The value of $\pi$ is enclosed through the Machin identity

$$
\pi=16\arctan(1/5)-4\arctan(1/239).
$$

The tangent addition formula gives $\tan[4\arctan(1/5)-\arctan(1/239)]=1$, and the angle lies between zero and $\pi/2$, fixing the branch $\pi/4$. For $0<x<1$, the alternating arctangent series lies between successive partial sums; one hundred terms and the next term enclose each value. Oddness and monotonicity handle the small signed intervals. Since $Q_0-1<0$, the direction is evaluated without a quadrant ambiguity as $\phi_*=\pi/2+\arctan[-(Q_0-1)h_0/(2\epsilon)]$.

For $v=(\Delta-\pi)/2$, the alternating cosine inequalities $1-v^2/2\le\cos v\le1-v^2/2+v^4/24$ enclose $r_0$. Horner evaluation retains the even account polynomials at $P_0=0$. The winding integer is accepted only if both endpoints of $(\theta_*-\phi_*)/(2\pi)$ have the same floor; the resulting gap is then enclosed by direct interval subtraction. Printed decimals are rounded outward using integer division and are not the internal arithmetic.

**Known-first controls, 07:04:59 UTC.** Before target use, the instrument passed signed interval multiplication and reciprocal, a square spanning zero, integer-square-root enclosure, a hand four-term arctangent tail, a fixed Machin enclosure and four hand circular account values. The known receipt is retained at `.local-data/master-equation-closure/overnight2-a/literal-phase-known.json`; lease `3386113c-4e77-4418-8baf-49359ae4e2ed` closed. The target is limited to ninety internal seconds, 120 outer seconds, 512 MiB resident memory and 1 MiB output. Known controls check the arithmetic mechanisms; independent inspection of their mathematics and target expression remains required.

An incorrect interval endpoint, omitted polynomial term, wrong angle branch or changed decimal token falsifies this enclosure. Even a correct enclosure of (1) leaves the physical release, account, orientation and phase error theorem to the [main A investigation](overnight2-a-followup-and-research-2026-10-07.md).

**Bounded arithmetic revision.** The unrounded target reached its internal ninety-second timeout while adding the arctangent fractions; lease `c333c264-9513-4b31-b537-75ccf55c1fe0` closed after 93.626 seconds. Its source and original error log are preserved, with the latter copied to `literal-phase-unrounded-timeout.log` under the local evidence owner. It produced no target enclosure. The [bounded-endpoint instrument](../evidence/overnight2-a-literal-phase-rounded.py) retains the same expression and source by SHA-256, but rounds every interval outward to a rational grid of spacing $10^{-70}$. Each lower numerator is floored and each upper numerator is ceiled, including negative values. The arctangent recurrence now propagates intervals on that grid, so denominator size cannot grow through repeated addition. This is a change of validated arithmetic method, not a physical or source-token change.

The revised known controls passed at 07:08:52 UTC before its target: positive and negative outward rounding, signed products and squares, square-root inclusion, a hand alternating-tail inclusion, Machin enclosure and hand circular account values. Lease `abf1f860-a0c9-46fa-a4f3-cc635351c199` closed; receipt `literal-phase-rounded-known.json` is retained. The original ninety/120-second and memory/output limits remain unchanged. The revised source SHA-256 is recorded in the receipt; its retained-expression dependency is `dcbe3160ebff12b8098b98a221ab424c6457d74e4497efab394af456fbc02378`.

**Target interval receipt, 07:09:19 UTC.** The bounded method, SHA-256 `d7da547691e98e1e1b52ab14cb4e780593b8f8a5547befdda2d3c540576d11f1`, returned

$$
4.4505976657061\times10^{-7}<I_0<4.4505976657062\times10^{-7},
$$
$$
.0006671279986408<\rho_0<.0006671279986410,
\qquad -.328064<\Gamma<-.328061.
$$

The winding integer is $714729$. The retained receipt gives narrower outward decimal endpoints; the wider displayed bounds are sufficient for the intended comparison. Lease `2533b451-361f-49ee-be4c-48fe5d645ca8` closed with $.059$ seconds supervisor wall time. The instrument measured $.018906$ seconds and 22,626,304 bytes peak resident memory. Output and progress are retained as `literal-phase-rounded-target.json` and its `-progress.log` under the local owner. This upgrades the earlier floating diagnostic to a rational subject enclosure. Independent assessment and the physical error theorem are still separate obligations.
