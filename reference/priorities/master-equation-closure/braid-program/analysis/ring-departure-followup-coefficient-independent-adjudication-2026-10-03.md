# Independent adjudication of T02 departure coefficient enclosures

Date: 2026-10-03. Assignment: Ring departure coefficient adjudication, Ramon E. Moore lens, stable agent `/root/ring_stability`. **Scenario: unchanged Master Equation, $K=c_f=1$, all eight ordinary hits per receiver including the positive-delay self hit.** The subject, its interval instrument, the characteristic reference and earlier instruments remain unchanged.

## Verdict and boundary

**Accepted, derived with independently constructed outward arithmetic conditional on the admitted reference and ancient-history theorem:** both coordinates of $u_1,\ldots,u_8$ lie in the intervals of the [frozen coefficient subject](ring-departure-followup-coefficient-enclosures-2026-10-03.md). The independent enclosures lie entirely inside those subject intervals, rather than merely overlapping them. The eight conservative displayed error caps for the earlier printed coefficients are also accepted. No repair to the frozen subject is required.

This verdict establishes exact Taylor coefficient enclosures and their printed-coefficient error bounds for the already established fast ancient branch. It does not prove convergence from finite coefficients, enlarge the accepted $|q|\le10^{-13}$ domain, validate a finite-time EOM trajectory or determine a fold, wake-speed event, neighbor transfer or eventual fate. The separate degree-twenty and larger-domain subjects require their own adjudications.

The [independent checker](../../../../../scripts/braid-program/ring_departure_followup_coefficient_independent_20261003.py) imports no subject implementation, jet primitives, characteristic tensors or saved coefficient answer. It reads immutable authoritative binary reference intervals and the subject coefficient intervals as comparison bounds. The earlier printed table is read only for its error comparison. Completeness of the admitted reference census, exact circular balance, existence of the ancient branch and its prior convergence theorem are inherited premises, not new conclusions of this coefficient calculation.

## A different recurrence construction

Let $\alpha_m=m\pi/3$, $u(q)=\sum_{n\ge1}u_nq^n$ and $q(T)=q(0)e^{\lambda T}$. In the rotating reception frame, for a delay $d$ define $a=qe^{-\lambda d}$ and

$$
y=S(\alpha_m-\Omega d)\{Re_1+u(a)\},\qquad Q=Re_1+u(q)-y,
$$

$$
V=S(\alpha_m-\Omega d)\{\Omega J[Re_1+u(a)]+\lambda\mathcal Eu(a)\},\qquad \mathcal E=q\partial_q.
$$

The independent implicit equation is the squared Cartesian causal gap $G=Q\cdot Q-d^2=0$, rather than the subject's square-root gap. At the exact reference root $d_0>0$, $G_d=-2d_0D_0$, with $D_0=1-Q_0\cdot V_0/d_0$. Reconstructing $D_0$ from Cartesian positions and velocities retains every negative signed transmitter row. For each degree $n$, first set $d_n=0$, evaluate the degree-$n$ gap from the lower coefficients, and set

$$
d_n=\frac{[G]_n\big|_{d_n=0}}{2d_0D_0}.
$$

This is triangular because the unknown degree-$n$ coefficient enters the gap only through the reference derivative. The ordinary reference roots and their positive range select the same local implicit branch as the unsquared equation; no spurious negative-range solution is introduced.

On that branch, $\ell=d$. Thus the independent acceleration expression is

$$
\frac{\sigma Q}{d^2\operatorname{sgn}(D_0)[d-Q\cdot V]},\qquad \sigma=(-1)^m.
$$

This avoids the subject's range square-root jet and uses the actual baseline $|D|$ by its locally fixed sign. It changes neither the response law nor the root set. The rotating path acceleration is $(\lambda^2\mathcal E^2-\Omega^2)u+2\Omega\lambda J\mathcal Eu-\Omega^2Re_1$.

Every elementary analytic function in the independent checker uses the finite powers of its zero-constant argument with explicit Taylor coefficients. Reciprocal uses a finite geometric series; exponential and sine/cosine use their power series; composition is an explicit sum of polynomial powers. The subject instead uses coefficient differential recurrences, recursive reciprocal and square root, and Horner composition. Truncating these formal analytic series is exact through the retained degree. Every scalar operation is outward interval arithmetic; correlation loss widens bounds and is not assigned a small residual tolerance.

The independent linear matrix is reconstructed from the Cartesian causal chain, not copied from $C_m,F_m,H_m$. For receiver perturbation $u_i$, fixed-emission source displacement $u_s$ and source-velocity perturbation $v_s$, the emission-time derivative is $\delta s=-n\cdot(u_i-u_s)/D$. Then $\delta Q=u_i-u_s-V\delta s$, $\delta V=v_s+A_s\delta s$, and differentiation of $n/(\ell^2|D|)$ supplies each row derivative. This gives $A(z)$ and its exact analytic derivative with independent receiver, source-position and source-velocity columns.

The admitted fast root bracket has opposite independently reconstructed determinant endpoint signs, and its determinant derivative lies in $[2374.376133554633696808\ldots,2374.376133554633696832\ldots]$. A signed endpoint refinement therefore preserves its unique true root and yields the outward interval

$$
10.6584241740493694043084684297047420425009\ldots\le\lambda\le10.6584241740493694043084684320889278335167\ldots.
$$

These displays are diagnostic; the receipt's binary endpoints are authoritative. The normalization $u_1=R(1,-A_{11}(\lambda)/A_{12}(\lambda))$ has a strictly nonzero divisor. At degrees $2$ through $8$, the reconstructed determinants $\det A(n\lambda)$ are strictly nonzero. The lower-coefficient residual $E_n$ then gives $A(n\lambda)u_n=-E_n$. Induction, the squared-gap formula and outward polynomial arithmetic enclose the exact coefficient at each degree. The full degree-eight residual enclosures contain zero at every coordinate and degree; this last check is consistency evidence, while the triangular construction and independent matrix admission supply the proof.

## Printed-coefficient error

**Derived with outward finite sums:** if $\widehat u_n$ is the earlier printed coefficient interpreted as its literal decimal value, the accepted maximum-coordinate error caps are:

| Degree | $\|u_n-\widehat u_n\|_\infty$ upper cap |
| --- | ---: |
| 1 | $2.2290\times10^{-21}$ |
| 2 | $6.9202\times10^{-19}$ |
| 3 | $1.7904\times10^{-16}$ |
| 4 | $3.7195\times10^{-14}$ |
| 5 | $6.9196\times10^{-12}$ |
| 6 | $1.2167\times10^{-9}$ |
| 7 | $2.0763\times10^{-7}$ |
| 8 | $3.4870\times10^{-5}$ |

For $P_8=\sum_{n=1}^8u_nq^n$ and the printed polynomial $\widehat P_8$, the error in Euler derivative $k=0,1,2$ is bounded coordinatewise by $\sum_{n=1}^8n^ke_n|q|^n$. At $|q|\le10^{-13}$ each is strictly below $2.230\times10^{-34}$ by the independent finite outward sum. This is added to the accepted exact-polynomial tail bound, and the rotation/Euler formulas convert it into physical position, velocity and acceleration bounds. It bounds coefficient rounding with the exact admitted $q$, $R$, $\Omega$ and $\lambda$; separately rounded kinematic parameters require their own propagation. A printed polynomial alone remains an approximation, not an exact history.

## Controls, chronology and immutable bindings

**Measured by the independent checker's final known stage:** the squared implicit static gap returns $d=2+q$; causal-delay acceleration returns the exact coefficients $(-1)^n(n+1)/2^{n+2}$ of $(2+q)^{-2}$ through degree eight; the explicit-power exponential, trigonometric identity and rational composition match their analytical coefficients. The independent Cartesian derivative also passes a static-source derivative and a signed negative-$D$ analytical row. These known controls passed at `2026-10-04T03:12:38Z`, before the final target started at `03:12:49.984Z` and finished at `03:12:58Z`.

Two exploratory target runs conservatively failed the independent-inside-subject guard because the initial refinement stopped on an indeterminate midpoint and retained the wider original fast-root bracket. There was no nonoverlap or contradictory coefficient. The checker was changed to certify quarter-point endpoint signs before narrowing an ambiguous midpoint, and its known controls were rerun under the final source identity before the successful target. The failed runs remain operational receipts; they are not accepted scientific results.

The final owned run `5ba6a30a-74b1-4452-bbe6-1a47c81bcc45` completed in 8.782 supervised wall seconds, exit zero, no stderr, process group closed. The scientific target reports 8.727 internal wall seconds. Controls and target use only the shared venv and 135-digit outward interval arithmetic. Python compilation and new-file whitespace checks pass by their scoped commands.

| Immutable item | SHA-256 |
| --- | --- |
| Frozen subject owner | `4d1f4a3705a104595faaadf6f47536c76d7a4990b1d4558ed0e52b776cf12ebf` |
| Frozen subject instrument | `d4c4a0ba33793d66d536bb8010fd855c41b4cf3fb53dbf8adbe187c62dfe956e` |
| Subject known | `d14b9c932d73d71cf971afcdefde14eaa59c45b1252e0be77998ef6dd78827b6` |
| Subject target | `09670f8a7b0593823819a69791f20318de0b70336eaaa5ee5a0710156ac8804d` |
| Exact reference certificate | `ca1673b65e8dab0e0e602c4156e59deb3008c0d40fb52ee0dbcf8f8cc0591ff6` |
| Reference controls | `982e95cfd33571c26dc4e36443c37abf1811f72993193864c0951e5644e58087` |
| Earlier printed point receipt | `28a64e16445c243f115317435976142595dd68f00ccdffd4e7a804d4450b3f06` |
| Independent checker | `406d285b8cd25c16b88d8da33e59794537bd81f525c9f24e76a70bcc68cf970e` |
| Independent known | `088b8a8218987fdbcaf17744fab629ec2c1c177df576c19f51667807cb1b9b2f` |
| Independent target | `7d52d770da5ab306e25fe1f2abfd7642a33e88cce5908d45cd59d38965e9a27d` |

Independent receipts are local provenance under `.local-data/ring-followup/departure/coefficient-independent/`. The target binds its known receipt and immutable subject/reference identities, records the old printed-point receipt identity, and supplies all narrowed root endpoints, matrix determinants, coefficient intervals, delay coefficients, zero-containing residual coefficients and inclusion checks. Machine-read subject receipt bindings agree with their frozen instruments, certificate and reference controls. Nothing in this adjudication modifies a subject, oracle, earlier receipt or shared owner.

**Falsifiers:** a failed inherited balance, missing positive-delay root, wrong admitted fast eigenbranch or ancient-history theorem defeats the conditional claim. An incorrect Cartesian emission derivative, squared-gap sign, analytic finite-power coefficient, non-outward binary endpoint, zero-containing divisor, independent coefficient outside the subject enclosure, or literal printed-coefficient error above one of the table caps defeats the affected bound. The authoritative check is the independently constructed binary target and its pinned source, not a replay of the subject or a small residual alone.
