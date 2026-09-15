# Three vertical turns under the unmodified Master Equation

## Result and scope

The two disturbed architrinos turn downward, upward, and downward again during the accepted evolution through normalized time $t=2$. Their next upward excursion is between $25.6\%$ and $30.5\%$ of the preceding downward excursion. The certificate concerns the **unmodified Master Equation**, including the infinite stationary block field, at $g=16$ and $c_f=1$, for the exact supplied past defined below.

Claim grade: **derived by a computer-assisted proof, independently accepted**. The [independent assessment](smooth-two-particle-later-certification-independent-adjudication.md) accepts the residual propagation, exact polynomial representation, interval instrument and continuous sign tests. It separately reconstructs the reception derivatives and continuous polynomial signs using high-precision implicit rows and exact rational polynomial bounds. The intervals below are the accepted instrument's outward enclosures.

This is a finite statement about shared vertical motion. The two targets have equal height by reflection symmetry, while their horizontal separation is a different coordinate. Three turns and one smaller succeeding excursion establish neither eventual settling nor decay in every coordinate. The specified past also remains a prepared mathematical input: the earlier preparation assessment excludes its interpretation as an unforced all-past solution.

![Shared target height with a certified position band and three turning windows](../../../../.local-data/master-equation-closure/later-certification/figure/later-certified-height.png)

The central curve is the continuous polynomial defined below. The shaded band encloses the actual common height within $6\times10^{-8}\ell$; the lower panels display the three velocity crossings with their velocity-error bands. The [plot source](smooth-two-particle-later-certified-plot.py) renders these already established bounds and supplies no additional mathematical acceptance.

## 1. Population, past and unchanged equation

Place one architrino at every site of the infinite simple cubic lattice $\ell\mathbb Z^3$. The positive scale $\ell$ is the initial nearest-neighbor spacing. The lattice label is $i=(i_1,i_2,i_3)$ and polarity is $\sigma_i=(-1)^{i_1+i_2+i_3}$. Nearest neighbors therefore have opposite polarity. Let $e_1,e_2,e_3$ denote the coordinate unit vectors. The two targets have labels $0$ and $e_1$; their initial line of separation lies along $e_1$, and the disturbance is vertical, along $e_3$.

Use time $t=c_fT/\ell$ and displacement $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$. The coefficient $G=\kappa q_0^2$ is the dimensional acceleration coupling and $g=G/(c_f^2\ell)$ is its dimensionless form. This calculation sets $c_f=1$ and $g=16$. It selects no dimensional value for $\ell$.

The two targets have the same supplied displacement $p(s+11/8)e_3$ in the past, where $s$ is normalized emission time and

$$
p(u)=-(1-8u)u^4(1-4u)^4\quad(0\le u\le1/4),
\qquad p(u)=0\quad\text{otherwise}.
\tag{1}
$$

Every other supplied past is stationary. At $t=0$, every label is at its anchor and at rest. The old pulses still travel through the population and excite later motion. Their largest displacement is $1/314928$ of a spacing. These entire past histories, including the environmental pasts, are part of the input; the [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) explains their limitation.

The infinite population uses the same prescribed eight-source block sum as the [accepted continuation](smooth-two-particle-later-independent-adjudication.md). Write $\mathbf S_0(\mathbf y)$ for its stationary reference acceleration field before multiplication by $g$. Inside radius $1/128$, the accepted estimates are

$$
\|\mathbf S_0(\mathbf y)\|\le1400\|\mathbf y\|^3,
\qquad
\|D\mathbf S_0(\mathbf y)\|\le4200\|\mathbf y\|^2.
\tag{2}
$$

For receiver $i$ and a changed source $j$, put $\mathbf k=i-j$, let $\mathbf U(s)$ be the source displacement, and define

$$
\begin{gathered}
\mathbf R=\mathbf k+\mathbf y_i(t)-\mathbf U(s),\qquad
r=\|\mathbf R\|,\qquad \mathbf n=\mathbf R/r,\qquad t-s=r,\\
\mathbf Q_{ij}=\frac{\mathbf K(\mathbf R)}{1-\mathbf n\cdot\mathbf U'(s)}
-\mathbf K(\mathbf k+\mathbf y_i(t)),\qquad
\mathbf K(\mathbf R)=\frac{\mathbf R}{\|\mathbf R\|^3},\\
\mathbf y_i''=g\mathbf S_0(\mathbf y_i)+g\sum_j\sigma_i\sigma_j\mathbf Q_{ij}.
\tag{3}
\end{gathered}
$$

The second kernel removes the source's already counted stationary reference contribution. Thus (3) is an exact decomposition into the infinite stationary field and finitely many received changes, not a finite-population replacement. The denominator is the original transmitter factor; the accepted speed bounds make it positive. The canonical acceleration rule contains no receiver-velocity multiplier. No spring law, friction term, mass parameter, regulator or damping coefficient enters the calculation.

The accepted continuation contains 208 histories that become nonconstant by $t=2$. Its causal dependency proof reduces the present certification to 76 environmental source prefixes through $s=33/32$ and one target through $t=2$. Each target receives 21 distinct generated source histories, carrying 25 original-pulse return paths because four sources receive two old excitations. The other target's vertical history follows by exact symmetry. Every stationary architrino remains represented in $\mathbf S_0$.

## 2. A continuous approximation with exact joins

The [polynomial construction](smooth-two-particle-later-approximant.md) supplies source paths $\mathbf P_j$ and target paths $\mathbf Z_i$ on a grid of spacing $h=1/1024$. Every stored binary64 endpoint position, velocity and acceleration is interpreted as its exact dyadic rational value, an integer divided by a power of two. These values define an approximation; they are not presumed to be bounds on the true history.

On one cell, use $\theta=(t-kh)/h$ and endpoint triples $(y_0,v_0,a_0)$ and $(y_1,v_1,a_1)$ for a single coordinate. Define

$$
\begin{aligned}
d&=y_1-y_0-hv_0-h^2a_0/2,\\
e&=h(v_1-v_0)-h^2a_0,\qquad f=h^2(a_1-a_0),\\
(c_0,c_1,c_2)&=(y_0,hv_0,h^2a_0/2),\\
(c_3,c_4,c_5)&=(10d-4e+f/2,-15d+7e-f,6d-3e+f/2),\\
P(\theta)&=\sum_{k=0}^5c_k\theta^k.
\tag{4}
\end{aligned}
$$

Substitution at $\theta=0,1$ recovers all six endpoint values. Shared nodes therefore give exact continuity of position, velocity and acceleration. Third derivatives can jump. The checker reconstructs coefficient intervals from (4), so rounding a coefficient never silently changes the defining polynomial.

Each source is exactly zero up to a conservative onset cut. For first exciting squared anchor distance $m=2,3,4,5$, respectively, those cuts are $1/32$, $11/32$, $39/64$ and $27/32$. The targets are exactly zero through $t=1$. These identities preserve causal inactivity; a merely small interpolated value would not suffice. Continuous interval evaluation verifies the source and target bounds below.

| Entire polynomial interval | Position norm bound | Speed norm bound | Acceleration norm bound |
| --- | ---: | ---: | ---: |
| All 76 sources through $33/32$ | $1.152181\times10^{-6}$ | $1.883765\times10^{-5}$ | $6.915457\times10^{-4}$ |
| Both targets through $2$ | $4.651661\times10^{-6}$ | $4.697323\times10^{-5}$ | $8.879758\times10^{-4}$ |

These displayed bounds are rounded upward from the interval receipt. They satisfy the propagation theorem's source radii $1/60000$, $1/16000$, $1/400$ and target position radius $9\times10^{-6}$. The exact data archive and its reproducible construction are identified in the development record below.

## 3. Enclosing the residual of the full law

A residual is the acceleration mismatch obtained by substituting the proposed continuous path into the equation. If that mismatch is small over the entire time interval, a separate propagation estimate can bound the resulting trajectory error. A numerical integrator's tolerance or agreement between sampled curves cannot replace that estimate.

The [residual instrument](smooth-two-particle-later-residual.py) first encloses the received emission time $s$ as an actual root of (3). The global source position bound gives an initial interval around $t-\|\mathbf k+\mathbf Z_i(t)\|$. Interval fixed-point intersections narrow it while retaining the root. Positive source denominators establish uniqueness. When the received interval crosses a source polynomial knot, every intersected piece contributes to the enclosure; no source is extrapolated past its retained prefix.

For clarity, the reception derivatives used in the check can be written directly. Let $\mathbf v,\mathbf a$ be the receiving polynomial velocity and acceleration, let $\mathbf V,\mathbf A$ be source velocity and acceleration at the received time, and put $D=1-\mathbf n\cdot\mathbf V$. Differentiating $t-s=r$ gives

$$
s'=\frac{1-\mathbf n\cdot\mathbf v}{D},\qquad
\mathbf w=\mathbf v-\mathbf V s',
$$

$$
s''=-\frac{\big(\|\mathbf w\|^2-(\mathbf n\cdot\mathbf w)^2\big)/r
+\mathbf n\cdot\big(\mathbf a-\mathbf A(s')^2\big)}{D}.
\tag{5}
$$

The receiver velocity occurs here because it changes the time of reception. Equation (5) differentiates the causal root; it does not add a receiver multiplier to acceleration. Source position, velocity and their reception derivatives then determine the first two derivatives of each changed row in (3).

For a receiving polynomial cell, let $E$ denote polynomial acceleration minus the finite changed-row sum. At midpoint $m$ and half-width $\delta$, use the centered enclosure

$$
E(t)\in E(m)+E'(m)[-\delta,\delta]
+\tfrac12E''([m-\delta,m+\delta])[0,\delta^2].
\tag{6}
$$

This applies component by component. The instrument encloses its Euclidean norm using outward arithmetic, then adds the stationary-field norm ball

$$
g\,1400\sup_{t\in I}\|\mathbf P(t)\|^3
=22400\sup_{t\in I}\|\mathbf P(t)\|^3.
\tag{7}
$$

Equation (7) includes the infinite field without having to evaluate its unknown sign. The field is present both in the source residual and in the target residual. Centering its ball at zero does not declare the physical term zero.

Every receiving cell has width $1/8192$ and lies within one polynomial piece. Source third derivatives may jump at a received knot; their one-sided enclosures bound the row's second derivative almost everywhere. Exact source $C^2$ joins make the row's first derivative continuous, which is sufficient for the integral remainder in (6). Target polynomial knots are partition boundaries, so a discontinuous target residual derivative is never assumed continuous across them.

All elementary binary64 additions, products and reciprocals round outward using adjacent representable values. Square-root endpoints are additionally checked by enclosing their squares. Grid times are exact dyadic values. The final continuous residual maxima, including (7), are

| Residual | Checked domain | Outward maximum | Sufficient budget |
| --- | --- | ---: | ---: |
| All environmental sources | 76 paths, 8,448 cells each, $0\le s\le33/32$ | $9.471749\times10^{-11}$ | $\rho_s=10^{-10}$ |
| Right target | 16,384 cells, $0\le t\le2$ | $1.539527\times10^{-11}$ | $\rho_t=10^{-9}$ |

The source budget is the closer constraint. Its largest enclosed residual occurs in the cell $[0.3572998046875,0.357421875]$. The maxima of the stationary contributions alone are below $3.422589\times10^{-14}$ for sources and $2.254303\times10^{-12}$ for the target. Maxima of separate terms need not occur in the same cell; the reported full residual is the maximum of each cell's total bound.

## 4. Propagating acceleration error to motion error

The [residual-propagation theorem](smooth-two-particle-later-residual-propagation.md) compares these polynomials directly with the accepted solution of (3). Both source and target estimates include the stationary derivative in (2). Source errors through $33/32$ obey

$$
\|\mathbf y_j-\mathbf P_j\|\le\rho_s,
\qquad
\|\mathbf y_j'-\mathbf P_j'\|\le3\rho_s.
\tag{8}
$$

This follows from the source receiver Lipschitz constant $L_s<7$ and the zero-data integral comparison: position error is bounded by $\rho_s(\cosh(\sqrt7t)-1)/7$, and velocity error by $\rho_s\sinh(\sqrt7t)/\sqrt7$. At $33/32$ their gain factors are below 1 and 3.

At a target, a source position error also shifts the causal emission time. The propagated source term includes both this shift and its acceleration-dependent effect on the received source velocity. Summing all 21 rows gives coefficient $H_P+3H_V<934.962$; the target receiver Lipschitz constant is below 1. Consequently, with $q=\rho_t+(H_P+3H_V)\rho_s$, the zero target error through $t=1$ yields

$$
\|\mathbf y_i-\mathbf Z_i\|\le q(\cosh(t-1)-1),\qquad
\|\mathbf y_i'-\mathbf Z_i'\|\le q\sinh(t-1)
\quad(1\le t\le2).
\tag{9}
$$

The passed residual budgets therefore establish uniform bounds

$$
\varepsilon_P=6\times10^{-8},\qquad
\varepsilon_V=1.2\times10^{-7},\qquad
\varepsilon_A=2\times10^{-7}
\tag{10}
$$

for position, velocity and acceleration error, respectively. Acceleration is bounded on polynomial cells and by one-sided limits at their joins. The certified target polynomial radius plus $\varepsilon_P$ is below the temporary actual radius $10^{-5}$ used in the derivative estimates. A first-exit argument therefore closes that radius throughout the interval. The small-neighborhood premise is proved rather than inferred from sampled positions.

## 5. Three consecutive vertical turns and their excursions

Let $z(t)=e_3\cdot\mathbf y_{e_1}(t)$ and $Z(t)=e_3\cdot\mathbf Z_{e_1}(t)$. Reflection in the plane $x_1=1/2$ exchanges the target labels and reverses every lattice polarity, preserving all polarity products and the vertical coordinate. The unchanged equation and supplied past are invariant under this transformation, so uniqueness gives equal actual target heights. It suffices to certify $z$ for the right target.

The [turn instrument](smooth-two-particle-later-turns.py) encloses $Z'$ at both ends of each window and $Z''$ throughout it. Subtracting or adding (10) preserves opposite endpoint velocity signs and a strict acceleration sign throughout each window. Continuous actual velocity therefore crosses zero exactly once there. These are the resulting enclosures; displayed height bounds are rounded outward and are in millionths of $\ell$.

| Actual turn | Exact normalized time window | Height in $10^{-6}\ell$ | Acceleration sign throughout |
| --- | --- | --- | --- |
| Maximum, upward to downward | $[1545/1024,1547/1024]$ | $[4.59109,4.71167]$ | Negative |
| Minimum, downward to upward | $[1878/1024,1881/1024]$ | $[-0.428213,-0.307786]$ | Positive |
| Maximum, upward to downward | $[2019/1024,2024/1024]$ | $[0.980320,1.100902]$ | Negative |

The windows are approximately $[1.508789,1.510743]$, $[1.833984,1.836915]$ and $[1.971679,1.976563]$. The exact rational intervals in the table are authoritative. Continuous polynomial velocity bounds also establish upward motion from $5/4$ to the first window, downward motion between the first and second, upward motion between the second and third, and downward motion after the third through $2$. There are therefore exactly three consecutive turns on $[5/4,2]$. This does not count or exclude events in the earlier interval $[0,5/4)$.

Write the actual extremal heights as $A$ (first peak), $B$ (trough), and $C$ (second peak). The downward excursion is $D=A-B$ and the following upward excursion is $U=C-B$. The instrument gives

$$
\begin{aligned}
4.898880\times10^{-6}&<D<5.139873\times10^{-6},\\
1.288107\times10^{-6}&<U<1.529114\times10^{-6},\\
0.256623&<\frac UD<0.304647<\frac13.
\end{aligned}
\tag{11}
$$

Excursions in (11) are normalized by $\ell$. The ratio uses the same trough in numerator and denominator. For certified intervals $A\in[A_-,A_+]$, $B\in[B_-,B_+]$, $C\in[C_-,C_+]$, monotonicity gives

$$
\frac{C_--B_+}{A_+-B_+}\le\frac UD\le
\frac{C_+-B_-}{A_--B_-}.
\tag{12}
$$

The delayed acceleration contributions have thus reversed the shared vertical velocity repeatedly and produced a smaller subsequent excursion under the unchanged law. The result is finite-interval ringing. Eight later old-pulse return paths have not completed their pulse-end receptions at $t=2$, and later incoming histories can alter the next excursion. No asymptotic decay rate, stable limiting position, full spatial return or generic preparation follows.

## Development record, reproduction and falsifiers

The residual checker is separately authored from the node-producing numerical comparison. Its mathematical reference is the exact root-differentiated equation (3)–(6) and the separately derived propagation theorem, not parity with another run of the same integrator. Known-case controls ran before every new target use. They cover exact rational interval operations, pulse derivatives and support, Hermite endpoint identities, a closed-form shifted source, independent high-precision moving-root derivatives, centered Taylor remainders, a known unique quadratic maximum, and the common-trough ratio. The separate independent assessment records what was reconstructed and any acceptance limitations.

The frozen input archive is `.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz`. The residual receipts are `check/known.json` and `check/certified-full-s8.json` under the same `later-certification/` owner. Turn receipts are `check/turns-known.json` and `check/turns.json`. Their source hashes bind each run to its instrument. The archive digest is `1213e65680c1d6753fd74b955013a32582b487593bad8da8dc711924fcc6de08`. The full residual run took 29.434 seconds by its internal `time.perf_counter` measurement; this is one instrument run, not a comparative performance claim.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-approximant.py target --grid 1024
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-residual.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-residual.py target --stage both --subdivisions 8 --batch 64 --tag certified-full-s8
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-turns.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-turns.py target
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-certified-plot.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-certified-plot.py target --assessment accepted
```

The existing archive can be checked directly without regenerating its proposed nodes. This analytical proof instrument is not an EOM solver run. No production solver or physical equation was modified by this certification work. Earlier frozen proofs, comparisons and their reviews are retained; their original conditional status describes the submitted subjects, while this synthesis and the new adjudication describe the combined result.

The certificate would fail if a required received source or causal root were omitted, a root escaped its enclosing interval, a join or asserted early zero were false, an arithmetic operation failed to enclose its exact value, the stationary-field estimate failed on the stated ball, or one of the propagated sign margins included zero. The input archive, residual source, propagation theorem and turn receipt identify where each condition can be checked. A later growing excursion would challenge eventual settling, but would not overturn these finite-horizon inequalities. A different past or coupling defines a different problem.
