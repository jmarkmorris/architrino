# Acceleration contributions along the exact staggered lattice history

## Result and scope

**Independently accepted computed enclosures.** Along the fixed ancient branch with amplitude $a=2^{-40}$, both polarity groups contribute positive upward acceleration at all nine reception times examined and on the incoming portion of the certified first-event window, including the event itself. Under the common centered-cube convention inherited from the original stationary sum, the complete same-polarity contribution accounts for between $5.43\%$ and $11.34\%$ of the acceleration at the first wake-speed event; the opposite-polarity contribution accounts for between $88.66\%$ and $94.57\%$. Their leading small-amplitude fractions are about $24.06\%$ and $75.94\%$, respectively. The separate history corrections and retained stationary term are quantified below so that the complete source-group allocation is not confused with a correction relative to stationary anchors.

The geometry and complete incoming history are unchanged from the [accepted first-event theorem](staggered-lattice-first-event.md). For each identity $i\in\mathbb Z^3$,

$$
X_i(t)=i+\sigma_iq(t)e_3,
\qquad \sigma_i=(-1)^{i_1+i_2+i_3},
\qquad g=16,\qquad c_f=1.
$$

Here $q$ is the common upward displacement of the positive sublattice; the negative sublattice has displacement $-q$. Position is measured in lattice spacings, time in the wake-travel time across one spacing, velocity in wake-speed units, and acceleration in spacing divided by that time unit squared. The exact branch has a nonzero, exponentially decaying disturbance at every finite past time. No finite kick or new evolution is introduced by this evaluation.

The accepted first event satisfies

$$
\frac{1191}{128}<t_*\le\frac{1193}{128},
\qquad q'(t_*)=1.
$$

Every listed reception time before the final event row lies below $t_*$. The final row evaluates an enclosure valid at the unknown incoming time $t_*$. It does not describe a full-law trajectory after the event.

## 1. What is being separated

Choose a positive receiver and let $d=j-i$ point from its anchor toward a source anchor. Put $m=d_3$, $p=d_1^2+d_2^2$, $\sigma_d=(-1)^{d_1+d_2+d_3}$ and $s=t-r$. The unique incoming source root obeys

$$
z=q(t)-m-\sigma_dq(s),\qquad
r=\sqrt{p+z^2},\qquad
n=z/r,\qquad
D=1-\sigma_dnq'(s)>0.
$$

At the receiver's present position, the corresponding stationary-source vertical separation is $z_0=q(t)-m$ and its range is $r_0=\sqrt{p+z_0^2}$. Define

$$
C_\pm[q](t)=16\sum_{\substack{d\ne0\\\sigma_d=\pm1}}
\sigma_d\left[\frac{z}{r^3D}-\frac{z_0}{r_0^3}\right].
\tag{1}
$$

The unchanged acceleration is

$$
q''(t)=16S_3(q(t)e_3)+C_+[q](t)+C_-[q](t).
\tag{2}
$$

The stationary field $S$ retains the original infinite alternating-block prescription. It is the acceleration kernel seen by the present receiver if all other sources were kept at their anchors. Each correction in (1) replaces those stationary source rows by the received history rows, including the source-velocity factor $D^{-1}$. The two correction sums are separately absolutely convergent because the distant emissions sample the exponentially small ancient history. No independently reordered bare charged-sublattice sum is used.

Equal-polarity labels have equal simultaneous displacements, so their current mutual distances remain fixed. Their causal chords use the earlier source position $q(s)$, however, and depend on $q(t)-q(s)$. Their changed-source correction need not vanish. Equation (1) quantifies this distinction without adding a rigidity constraint.

## 2. The initial proportions

The accepted shell calculation gives the linear terms

$$
DC_\pm[0]h(t)=\frac{16}{3}
\sum_{\substack{d\ne0\\\sigma_d=\pm1}}
\frac{h'(t-|d|)}{|d|^2}.
$$

For $h(t)=a e^{\lambda t}$, the exact characteristic identity is

$$
\lambda=\frac{16}{3}\sum_{d\ne0}\frac{e^{-\lambda|d|}}{|d|^2}.
$$

Hence the fractions of the leading total acceleration $\lambda^2h$ are

$$
f_\pm=\frac{16}{3\lambda}
\sum_{\substack{d\ne0\\\sigma_d=\pm1}}
\frac{e^{-\lambda|d|}}{|d|^2},
\qquad f_++f_-=1.
\tag{3}
$$

The separately certified $\lambda$ interval, finite parity sums and an outward infinite-tail bound give

$$
0.2405948533175<f_+<0.2405948533181,
$$

$$
0.7594051466814<f_-<0.7594051466831.
$$

The stationary term starts at cubic order, so its fraction tends to zero in this limit. The approximate $24.06\%$ versus $75.94\%$ split is a derived small-amplitude allocation supported by interval evaluation of (3), rather than an extrapolation to finite displacement.

For cube radius $N=14$, the omitted characteristic sum in either parity is bounded by the entire positive complement,

$$
\sum_{|d|_\infty>N}\frac{e^{-\lambda|d|}}{|d|^2}
\le\frac{26e^{-\lambda(N+1)}}{1-e^{-\lambda}}.
$$

After multiplication by $16/(3\lambda)$, this contributes less than $3.264\times10^{-17}$ to either fraction. No cancellation between polarity tails is needed.

## 3. Complete polarity contributions

The [displacement-equation derivation](staggered-lattice-displacement-equation.md#5-an-optional-complete-polarity-allocation-with-a-specified-cutoff) supplies a complete source-group allocation with a specified stationary convention. Use the same centered cube for both polarity subsets and set

$$
S_\varepsilon(u)=\lim_{N\to\infty}
\sum_{\substack{0<|d|_\infty\le N\\\sigma_d=\varepsilon}}
\varepsilon\frac{d_3+u}{|d+ue_3|^3}.
$$

In each centered cube and each parity separately, inversion cancels the constant and quadratic Taylor terms. Cubic symmetry and the zero trace of the kernel derivative cancel the linear term. The remaining terms admit an absolute Taylor-remainder representation of order $u^3/|d|^5$. Thus the common-cube limits exist, satisfy $S_++S_-=S_3$, and preserve the inherited mixed stationary sum. This defines a particular convergent allocation; it does not assert invariance under arbitrary reordering of either nonneutral bare sector.

The complete contributions are

$$
A_{\rm same}=16S_+(q)+C_+[q],\qquad
A_{\rm opposite}=16[S_3(qe_3)-S_+(q)]+C_-[q].
\tag{4}
$$

They add to $q''$ exactly. Both stationary subsets begin at cubic order, so the initial fractions (3) are also the initial complete-source fractions.

The separate instrument evaluates $S_+$ in a cube of radius $32$, containing $137312$ even-parity nonzero labels represented by $14867$ symmetry orbits. It uses the odd coefficients of degrees $3$ through $13$ in

$$
\frac{d_3+u}{|d+ue_3|^3}
=\sum_{k\ge0}(-1)^k(k+1)
\frac{P_{k+1}(d_3/|d|)}{|d|^{k+2}}u^k,
$$

where $P_n$ denotes the Legendre polynomial. Outward interval recurrences enclose every retained coefficient. For $|u|\le B<1$, the independent cube-tail estimate is

$$
|S_\varepsilon(u)-S_{\varepsilon,N}(u)|
\le\frac{13|u|^3}{N^2}
\left[\frac4{1-x^2}+\frac{2x^2}{(1-x^2)^2}\right],
\qquad x=\frac{B}{N+1}.
$$

The additional omitted polynomial orders are bounded by

$$
28B^{15}\left[\frac{16}{1-B^2}+\frac{2B^2}{(1-B^2)^2}\right],
$$

using $\sum_{d\ne0}|d|^{-17}<28$. The source-history corrections, original stationary evaluator and trajectory inputs remain exactly those of the first calculation.

## 4. Enclosures on the actual incoming branch

The following intervals include the accepted trajectory error, shifted-root uncertainty, source-history error, stationary-sum remainder and infinite changed-source tail. Every displayed lower endpoint is rounded downward and every upper endpoint upward. The underlying machine record retains more digits. These are bounds, not point measurements; their widths describe proof uncertainty rather than physical differences among members of one sublattice.

| Time | $q$ | $q\prime$ | $q\prime\prime$ | $A_{\rm same}$ | $A_{\rm opposite}$ |
| --- | --- | --- | --- | --- | --- |
| 0 | $[9.094,9.095]\times10^{-13}$ | $[2.542,2.543]\times10^{-12}$ | $[7.106,7.107]\times10^{-12}$ | $[1.709,1.710]\times10^{-12}$ | $[5.396,5.397]\times10^{-12}$ |
| 4 | $[6.503,6.548]\times10^{-8}$ | $[1.817,1.831]\times10^{-7}$ | $[5.061,5.136]\times10^{-7}$ | $[1.219,1.234]\times10^{-7}$ | $[3.841,3.903]\times10^{-7}$ |
| 6 | $[1.738,1.758]\times10^{-5}$ | $[4.858,4.913]\times10^{-5}$ | $[1.348,1.383]\times10^{-4}$ | $[3.253,3.319]\times10^{-5}$ | $[1.023,1.052]\times10^{-4}$ |
| 7 | $[2.842,2.879]\times10^{-4}$ | $[7.943,8.049]\times10^{-4}$ | $[2.200,2.270]\times10^{-3}$ | $[5.311,5.445]\times10^{-4}$ | $[1.669,1.726]\times10^{-3}$ |
| 8 | $[4.648,4.717]\times10^{-3}$ | $[1.299,1.320]\times10^{-2}$ | $[3.592,3.733]\times10^{-2}$ | $[8.668,8.938]\times10^{-3}$ | $[2.725,2.840]\times10^{-2}$ |
| 8.5 | $[1.882,1.914]\times10^{-2}$ | $[5.281,5.379]\times10^{-2}$ | $[1.474,1.546]\times10^{-1}$ | $[3.505,3.638]\times10^{-2}$ | $[1.123,1.182]\times10^{-1}$ |
| 9 | $[7.863,8.044]\times10^{-2}$ | $[2.353,2.431]\times10^{-1}$ | $[7.850,8.501]\times10^{-1}$ | $[1.471,1.572]\times10^{-1}$ | $[6.365,6.943]\times10^{-1}$ |
| 9.25 | $[1.779,1.840]\times10^{-1}$ | $[6.650,7.013]\times10^{-1}$ | $[3.497,4.043]$ | $[3.570,4.143]\times10^{-1}$ | $[3.120,3.648]$ |
| 9.3046875 | $[2.207,2.294]\times10^{-1}$ | $[9.193,9.837]\times10^{-1}$ | $[5.798,6.978]$ | $[4.727,5.735]\times10^{-1}$ | $[5.284,6.446]$ |
| $t_*$ | $[2.205,2.456]\times10^{-1}$ | $1$ | $[5.647,8.557]$ | $[4.581,6.567]\times10^{-1}$ | $[5.135,7.965]$ |

The positive same-polarity correction is therefore a genuine part of the acceleration in this decomposition. At $t=9.25$, for example, its enclosure is $[0.2738,0.3114]$, compared with $[1.310,1.448]$ for the stationary term and $[1.912,2.283]$ for the opposite-polarity correction. At the event, the unrounded bounds give

$$
0.2971479<C_+(t_*)<0.4044955,
$$

$$
2.8326635<C_-(t_*)<4.6550152,
\qquad
2.5178409<16S_3(q(t_*)e_3)<3.4969309.
$$

In particular, both the stationary contribution and the opposite-polarity correction exceed the same-polarity correction at the event. The enclosures do not order the other two terms against each other at that unknown time. Dividing the positive component bounds by the positive total bounds gives

$$
0.0347279<\frac{C_+(t_*)}{q''(t_*)}<0.0716219.
\tag{5}
$$

Thus the event fraction is well below the initial limit (3), even though the same-polarity correction itself remains positive. This comparison of initial and event fractions is not a proof that the fraction decreases monotonically at every intermediate time. The point rows establish signs at their named reception times; the event row comes from continuous coverage of the entire first-event bracket. No all-time nonlinear sign claim is inferred between the earlier samples.

The complete event contributions from (4) obey

$$
0.4581682<A_{\rm same}(t_*)<0.6566054,
\qquad
5.1359458<A_{\rm opposite}(t_*)<7.9642080.
$$

For positive intervals $A\in[a_-,a_+]$ and $B\in[b_-,b_+]$, the share $A/(A+B)$ increases with $A$ and decreases with $B$. Therefore its bounds are $a_-/(a_-+b_+)$ and $a_+/(a_++b_-)$. Applying this rule with outward arithmetic gives

$$
0.0543989<\frac{A_{\rm same}(t_*)}{q''(t_*)}<0.1133535,
$$

$$
0.8866465<\frac{A_{\rm opposite}(t_*)}{q''(t_*)}<0.9456011.
$$

These complete-sector fractions are the allocation by source polarity. Equation (5), by contrast, reports the smaller same-polarity history correction alone.

## 5. How the error bounds enter

The evaluator imports the immutable quintic archive and the accepted error functions $P(s)$ and $V(s)$, with their ancient-history and characteristic-root uncertainty. It forms

$$
q(t)\in\bar q(t)+[-P(t),P(t)],
\qquad
q'(t)\in\bar q'(t)+[-V(t),V(t)].
$$

Every source query uses its own earlier certified error bound. The source-time interval is repeatedly intersected with the causal range equation. All retained roots have positive range and positive transmitter denominator, and every queried source speed remains subunit. The exact root census is inherited from the accepted incoming theorem: one root per distinct label and no positive-delay own-history root through first arrival at speed one.

The finite cube contains $24388$ nonzero labels, with $12194$ in each polarity subset. Its exact symmetry grouping uses $3073$ source orbits. The frozen interval row `changed` already includes the polarity factor in (1); the evaluator partitions it by parity, applies each orbit's integer multiplicity once, and multiplies by $16$ once. It retains the original stationary interval evaluator separately. This explicit accounting prevents an accidental second polarity factor from reversing the source-history contribution.

For either individual correction, the evaluator adds the entire accepted absolute omitted-tail bound, which also bounds either subset. For the total it adds that bound only once. The largest such tail bound in the table and event calculation is below $6.519\times10^{-16}$. The stationary tail has its own accepted coefficient and remainder enclosure and is not included in that number.

The first-event bracket is covered by four intervals of width $1/256$. On each, the evaluator uses the matching accepted errors rather than the largest error from the entire trajectory. Taking the interval union encloses the unknown incoming event time. The underlying auxiliary cross equation exists across the full numerical bracket for the accepted comparison argument; values beyond the actual event are not promoted to a solution of the full Master Equation. Evaluating the enclosed expression at $t_*$ is legitimate because all its cross-source emissions are earlier than $t_*$ and the own-history root set is still empty at arrival.

The machine record also contains narrow comparison-path enclosures at the selected points. Their centers are useful for independent arithmetic comparison, but the actual-path intervals above carry the physical interpretation. No new trajectory has been integrated.

## 6. Evidence, independent assessment and falsifiers

The new evaluator is `.local-data/master-equation-closure/sublattice-decomposition/evaluation/evaluate.py`. Its `known` command passed before target use: both polarity signs were checked against exact rational collinear canonical rows; zero-source corrections were checked; independent exact partition and multiplicity totals were recovered; and the six odd unit-distance and twelve even distance-$\sqrt2$ labels were counted. The known-case receipt binds the exact nine frozen inputs. The target evaluation took $5.41$ seconds and left no process running.

The output `decomposition.json` retains both comparison and actual-path intervals, all selected reception times, the four event cells, root margins, tails, parity counts, source hashes and small-amplitude fractions. The separate `stationary_partition.py` passed exact nearest-shell and axial-pair coefficient controls before its target. Its `stationary-partition.json` retains the full source-group allocation, interval coefficients and separate cube and polynomial tails; that calculation took $0.040$ seconds. Both full-sector shares are positive, and their complementary fractions use the monotonicity formula above rather than an unnecessarily independent total denominator. A separate formatter passed its known decimal-rounding cases before producing the table and checks every displayed interval against its binary64 source endpoints. The existing evolution, residual, error-propagation and independent-reference inputs remain unchanged.

The [independent assessment](staggered-lattice-decomposition-independent-assessment.md) accepts both numerical partitions. A separately authored reference evaluated all nine comparison-path corrections at 65-digit precision directly from integer offsets, independently reconstructed Bernstein polynomials and unsimplified causal-root kernels. A second direct physical-space stationary sum checked the complete-sector intervals at times $0$, $9$ and $1191/128$ without using the subject's Legendre recurrence. Exact rational checks cover all 22 stationary-tail and share calculations and their event union. These independent checks supplement the inherited trajectory certificate; the two subject evaluations alone are not independent evidence for one another.

The conclusion would fail if the row were multiplied by its polarity twice, an orbit or omitted-source tail were missing, a causal interval excluded its root, the source-error lookup were smaller than the accepted history error, the stationary bound changed its summation prescription, or a displayed interval were rounded inward. The source hashes, exact known cases, interval records and separate reference provide the corresponding checks. The complete allocation uses its declared common centered-cube convention; no arbitrary bare-sum reordering or motion after the own-history obstruction is asserted.
