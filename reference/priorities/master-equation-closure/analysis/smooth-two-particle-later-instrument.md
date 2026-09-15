# A comparison instrument for later lattice motion

## Result and limits

The first two amplitude coefficients of the prescribed two-target disturbance have been numerically continued to normalized time $t=2$ at coupling $g=16$ and wake speed $c_f=1$. The common height coefficient turns upward and downward three times between $t=1.5$ and $t=2$. Its successive extrema are approximately $4.65142\times10^{-6}$, $-3.68110\times10^{-7}$ and $1.04083\times10^{-6}$ lattice spacings. These are measured values of a derived coefficient equation. They are not certified finite-amplitude trajectories or evidence of eventual damping.

The independent first-order path-sum calculation agrees with these common-height turns. The second-order calculation also reproduces the previously accepted early horizontal comparison at the declared sample. Those controls test different parts of the instrument: the first-order reference checks the later shell transfer, while the frozen early second-order polynomial checks the receiver-position and source-time corrections. Step refinement tests discretization within this instrument. None of these checks supplies the omitted finite-amplitude remainder.

The numerical instrument is explicitly a non-production analytical comparison. The [EOM solver](../../../../src/eom/README.md) was inspected but was not run for this lattice. Its current finite explicit-history request does not represent the complete infinite stationary population used by the theorem.

Local figure — Later common height, target separation and simultaneous neighbor gaps: `.local-data/master-equation-closure/later-motion/later-motion.png`.

## The exact population and supplied past

The reference sites are $i\in\mathbb Z^3$, with one architrino at every site and polarity $(-1)^{i_1+i_2+i_3}$. Distances are in lattice spacings. The targets are $0$ and $e_1=(1,0,0)$. Both have the identical supplied vertical history

$$
\lambda p(s+11/8)e_3,\qquad
p(u)=-(1-8u)u^4(1-4u)^4\quad(0<u<1/4),
$$

and $p=0$ outside that interval. The auxiliary parameter $\lambda$ defines amplitude coefficients; the actual specified disturbance has $\lambda=1$. Every other supplied past is stationary. All paths start the forward continuation at their lattice sites with zero velocity at $t=0$. This instrument preserves that complete supplied past. The [preparation obstruction](smooth-two-particle-preparation-independent-adjudication.md) remains in force: the supplied past is not a solution of the unforced Master Equation.

Write the forward displacement as

$$
y_i(t;\lambda)=\lambda a_i(t)+\lambda^2b_i(t)+\mathcal R_i(t;\lambda).
$$

Here $a_i$ is the first coefficient, $b_i$ is the second coefficient, and $\mathcal R_i$ is the omitted remainder. The numerical code evolves $a_i,b_i$; it does not evolve or bound $\mathcal R_i$. The static infinite reference field has zero value, first derivative and second derivative at the anchor under the unchanged fixed block prescription. Thus it contributes no term to these two coefficient equations. This is an exact property of the specified infinite reference, not replacement of that reference by a finite lattice. The accepted stationary bound remains $\|S_0(y)\|\le1400\|y\|^3$ near the anchor, and that omitted cubic contribution must be included in any finite-amplitude comparison theorem.

## Derivation of a general received row

For a receiver $i$ and distinct transmitter $j$, put $r=\|i-j\|$, $n=(i-j)/r$, and $s_0=t-r$. The unperturbed emission time is $s_0$. Define

$$
K=\frac n{r^2},\qquad
Jw=\frac{w-3n(n\cdot w)}{r^3},
$$

$$
H(w,w)=\frac{-6w(n\cdot w)-3n\|w\|^2+15n(n\cdot w)^2}{r^4}.
$$

$J$ and $H$ are the first and second spatial derivatives of $R/\|R\|^3$ at the anchor separation. At the reception and emission events let

$$
A=a_i(t),\quad B=a_j(s_0),\quad V=a_j'(s_0),\quad C=a_j''(s_0),
\quad \delta=A-B,\quad s_1=-n\cdot\delta.
$$

The quantity $s_1$ is the first change in emission time. It follows by inserting the amplitude expansion into $s+\|i-j+y_i(t)-y_j(s)\|=t$. The changed-history row subtracts the stationary transmitter at its original anchor, evaluated at the same moving receiver. Its first coefficient is

$$
L(B,V)=-JB+K(n\cdot V).
$$

Its second coefficient is

$$
L\bigl(b_j(s_0),b_j'(s_0)\bigr)+Q(A,B,V,C),
$$

where

$$
\begin{aligned}
Q={}&-J(s_1V)+\tfrac12\{H(\delta,\delta)-H(A,A)\}
+(J\delta)(n\cdot V)\\
&+K\left\{(n\cdot V)^2+s_1(n\cdot C)
+\frac{\delta-n(n\cdot\delta)}r\cdot V\right\}.
\end{aligned}
$$

To obtain this expression, expand the separation as $rn+\lambda\delta+\lambda^2[b_i-b_j-s_1V]$. Then expand the kernel and the reciprocal transmitter factor $[1-\widehat R\cdot y_j'(s)]^{-1}$. Finally subtract the expansion of the stationary row $K(rn+y_i)$. The current receiver coefficient $b_i(t)$ cancels in this subtraction. Its first coefficient $A$ remains in $Q$ because the receiver changes both the sampling time and the geometric weight of the changed source. The calculation retains the canonical transmitter factor; it introduces no receiver-velocity multiplier and no damping term.

The coefficient equations are therefore

$$
\begin{aligned}
a_i''(t)&=g\sum_{j\ne i}\sigma_{ij}L\bigl(a_j(t-r),a_j'(t-r)\bigr),\\
b_i''(t)&=g\sum_{j\ne i}\sigma_{ij}
\left[L\bigl(b_j(t-r),b_j'(t-r)\bigr)+Q\right],
\end{aligned}
$$

with $\sigma_{ij}=(-1)^{\sum_k(i_k-j_k)}$. For negative emission times, use the supplied past exactly. For positive emission times, use the previously integrated coefficient history. The reference chart has no nontrivial self root; the coincident endpoint is excluded. Extending this coefficient expansion to a finite-amplitude trajectory requires the corresponding complete-root and remainder arguments, rather than a numerical omission of an unresolved self row.

## Why the infinite coefficient sum becomes finite

A changed source can influence another anchor only after the intervening anchor distance. Starting from the supplied pulse at time $-11/8$, a chain reaching site $i$ by horizon $T$ has total anchor length at most $T+11/8$. The triangle inequality therefore excludes every site farther than $T+11/8$ from both original targets. Quadratic receiver terms obey the same exclusion: when the delayed source's changed coefficients vanish, $Q$ also vanishes, even for a moving receiver.

For the $T=2$ comparison, the code stores the union of those two anchor balls. A transmitter's conservative generated-onset lower bound is

$$
\tau_j=\max\left(0,\min_{c\in\{0,e_1\}}\|j-c\|-11/8\right).
$$

A non-target transmitter row can be omitted when $\tau_j+\|i-j\|>T$. The two target transmitters also retain every possible supplied-pulse row, for which the source time may be negative. The integer-site enumeration in `coefficients.py` records 208 stored sites and 1,472 possible ordered changed-history rows for $T=2$. These are measured instrument counts; they are not a count of all architrinos in the universe or all nonzero rows at one reception time. The exact infinite stationary field remains represented by its vanishing coefficients through degree two.

## Numerical method and controls

The instrument uses classical fourth-order Runge–Kutta steps, with a common uniform time grid for all sites. Every delayed evaluation lies at least one time unit behind reception, so the step uses only previously completed coefficient histories. A quintic polynomial on each completed time cell matches the stored position, velocity and acceleration at both ends. Differentiating that same polynomial supplies the delayed source velocity and acceleration needed in $Q$. This method describes coefficient equations with fixed anchor delays; it is not a state-dependent-root integration of the complete Master Equation.

The first target run followed successful known controls. They included exact pulse extrema and support, an exactly represented quintic with its first two derivatives, a zero changed-history case, and direct high-precision differentiation of an implicit canonical row for an independently specified polynomial source history. The largest binary64 discrepancy in that last coefficient check was $1.04\times10^{-17}$. An initial known-control attempt stopped on an unsupported `mpmath.matrix.dot` call; it was corrected to `mpmath.fdot` before any target use. The separate reading instrument then passed a known cubic interpolant, linear root, quadratic minimum and stable small-distance increment before reading target outputs.

The following measurements came from the same coefficient implementation. Wall time includes the site/row census, integration and compressed history output; it excludes interpreter startup. Array bytes are allocated coefficient position, velocity and acceleration arrays, not peak resident memory.

| Step $h$ | Steps to $t=2$ | Wall time | Main array bytes | $a_{e_1,3}(2)$ | $b_{e_1,1}(2)$ |
| --- | ---: | ---: | ---: | ---: | ---: |
| $1/256$ | 512 | 1.115 s | 15,365,376 | $1.00851030242605\times10^{-6}$ | $6.66651054536442\times10^{-10}$ |
| $1/512$ | 1,024 | 2.189 s | 30,700,800 | $1.00866169682504\times10^{-6}$ | $6.66649042400327\times10^{-10}$ |
| $1/1024$ | 2,048 | 4.450 s | 61,371,648 | $1.00867134525856\times10^{-6}$ | $6.66648907204131\times10^{-10}$ |
| $1/2048$ | 4,096 | 8.917 s | 122,713,344 | $1.00867184567028\times10^{-6}$ | $6.66648880068439\times10^{-10}$ |

The successive common-height endpoint differences decrease substantially, with the first ratio approximately 15.7, consistent with fourth-order discretization in that comparison. This is a measured refinement observation, not a rigorous global error enclosure. At $h=1/2048$, the independent first-order path sum gives an endpoint difference of $1.06\times10^{-14}$ in height and $1.35\times10^{-14}$ in velocity. Across the seven independent reference samples, the largest height discrepancy is $1.06\times10^{-14}$ and the largest interpolated-velocity discrepancy is $7.48\times10^{-13}$. At $t=\sqrt2-3/8+3/25$, the frozen early quadratic polynomial differs by $3.95\times10^{-22}$ in horizontal position and $1.63\times10^{-18}$ in horizontal velocity.

After the successful scratch implementation, the source was retained under the durable analysis owner. Its known controls were rerun before a fresh $h=1/2048$ target evaluation; that run took 8.852 s and returned the same displayed endpoint values. The final figure was rendered from this replay and visually inspected after annotation placement was corrected. Initial font-cache warnings were resolved by directing the plotting cache into repository scratch storage.

## Later excursions and same-time neighbor gaps

The $h=1/2048$ coefficient curves have these measured common-height turning points. They agree with the independently derived first-order path sum; displayed digits do not constitute interval certification.

| Turn | Time | Common height coefficient |
| --- | ---: | ---: |
| Upward motion turns downward | 1.5096351024 | $4.6514196522\times10^{-6}$ |
| Downward motion turns upward | 1.8354390790 | $-3.6810971391\times10^{-7}$ |
| Upward motion turns downward | 1.9739142610 | $1.0408313970\times10^{-6}$ |

The last two extrema alone already prevent a claim that the absolute displacement from the original plane decreases monotonically after every reversal. Ring-down about a possibly displaced center would require an appropriate history-based amplitude measure and a later-time argument. The coefficient sequence by itself establishes neither damping nor growth of the actual trajectory.

For the right target, the outward neighbor starts at $(2,0,0)$ and the upward neighbor at $(1,0,1)$. The following gap values use both particles' first-plus-second coefficient positions at the same time. They include no finite-amplitude remainder enclosure. For a unit initial separation vector $e$ and relative coefficient displacement $\Delta$, the increment is evaluated stably as

$$
\sqrt{1+q}-1=\frac q{\sqrt{1+q}+1},\qquad
q=2e\cdot\Delta+\|\Delta\|^2,
$$

so cancellation against the unit lattice spacing does not erase the tiny outward-gap change. The norm is evaluated on the truncated vector curve; it is not asserted to be an exact second-order expansion of the physical gap.

| Neighbor | Smallest coefficient gap on $0\le t\le2$ | Time of that minimum | Gap at $t=2$ |
| --- | ---: | ---: | ---: |
| Outward | $1-2.48975\times10^{-11}$ | 1.89770 | $1+5.25176\times10^{-11}$ |
| Upward | $1-6.438293\times10^{-6}$ | 1.51752 | $1-3.261057\times10^{-6}$ |

These comparisons suggest that the upward neighbor is approached much more than the outward neighbor in this interval, while both gaps remain close to one lattice spacing. The finite-amplitude error needed to determine the sign of the tiny outward gap is a separate, stricter requirement than the error needed to identify the common-height reversals.

## EOM solver capability boundary

Inspection of `src/eom/include/architrino/eom/CoupledEvolution.hpp` finds a `NativeCoupledEvolutionRequest` containing an explicit finite `std::vector<NativeCoupledPathInput> paths`. Inspection of `src/eom/src/CoupledEvolution.cpp` shows the quantities named `background_start`, `background_end`, `background_impulse` and `background_position_moment` are remainders of that finite population's acceleration snapshots after event-pair contributions are removed. They are not an interface for the theorem's infinite stationary block sum. A scoped search for `background`, `lattice`, `external` and additive-acceleration interfaces in `src/eom/include` and `src/eom/src`, combined with those live request and implementation reads, found no representation of the required infinite reference population.

Consequently, entering 208 ordinary paths into the existing EOM request would define a finite physical population with boundary accelerations. It would not reproduce this theorem's stationary reference and must not be used as an equivalent control. The necessary future production capability is a certified aggregate for the unchanged infinite block sum together with the finite changed-history correction ledger. Its membership, subtraction convention, tail enclosure, receiver dependence and accepted-step contribution must remain reconstructible under the [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md). No solver-source change, new production solver, physical regulator or damping prescription was introduced here.

## Reproduction and falsifiers

The numerical source is [smooth-two-particle-later-coefficients.py](smooth-two-particle-later-coefficients.py); the separate reading and plotting source is [smooth-two-particle-later-coefficients-plots.py](smooth-two-particle-later-coefficients-plots.py). Current retained output and receipts live in `.local-data/master-equation-closure/later-motion/`. The original refinement runs remain preserved in `.tmp/mec-008-later-continuation/dahlquist/`. Execute with the repository's shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-coefficients.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-coefficients.py run --horizon 2 --dt 0.00048828125
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-coefficients-plots.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-coefficients-plots.py target coefficients-t2-h2048.npz
```

The coefficient script requires a successful known-control receipt bound to its current source hash before target use. The first-order reference used by the reading and plotting source is the independently authored `.local-data/master-equation-closure/later-motion/leading/result.json`; the early second-order reference is the unchanged `.tmp/mec-008-signed-error/target-polynomials.json`.

The independently authored first-order reference is now retained as [smooth-two-particle-later-leading.py](smooth-two-particle-later-leading.py), with its unchanged mathematical calculation replayed under `.local-data/master-equation-closure/later-motion/leading/`. The plotting source reads that retained result; the earlier scratch reference remains provenance. This path-only retention change does not revise the reference equations or coefficient integrator. Its known controls were rerun before plotting.

The coefficient derivation would be overturned by a mismatch with a correctly differentiated implicit canonical row, a nonzero stationary jet through degree two under the fixed summation rule, or an omitted anchor-delay path inside the stated horizon. The numerical comparison would be overturned by loss of refinement or disagreement with independent exact coefficients beyond the declared measured discrepancies. A later finite-amplitude ring-down claim additionally requires error bounds on the complete coupled histories and their successive excursions; those bounds are not supplied by this instrument.
