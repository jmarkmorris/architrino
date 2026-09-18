# A fourth vertical turn and a smaller completed descent

## Question and result

The two perturbed architrinos continue downward after the preceding maximum, reach another common vertical minimum, and then rise again. The new completed downward excursion is smaller than the preceding upward excursion. This is a finite-time statement about their shared vertical coordinate, not a conclusion about their horizontal separation or eventual settling.

Current grade: **derived finite-interval result, independently accepted for the fixed supplied history**. The [continuation theorem](smooth-two-particle-next-minimum-continuation.md), [full-law residual certificate](smooth-two-particle-next-minimum-certificate.py), and [continuous turn certificate](smooth-two-particle-next-minimum-turns.py) discharge the mathematical conditions below. The [independent assessment](smooth-two-particle-next-minimum-independent-adjudication.md) accepts their combined actual-motion conclusion. The earlier three turns are the accepted inputs from the [previous full-law certificate](smooth-two-particle-later-certification-independent-adjudication.md) and [pulse-end extension](smooth-two-particle-later-pulse-end-independent-adjudication.md).

## 1. The same populated geometry and supplied past

The anchors are the simple cubic lattice $\ell\mathbb Z^3$, with one architrino at every lattice site and alternating polarity $\sigma_i=(-1)^{i_1+i_2+i_3}$. The two selected anchors are $0$ and $\ell e_1$. Their complete supplied histories contain the same smooth vertical pulse; the environmental supplied histories are stationary. At forward release all displacement and velocity values are zero. The pulse and its timing are unchanged from the preceding theorem. This supplied past is a preparation assumption: the [preparation assessment](smooth-two-particle-preparation-independent-adjudication.md) excludes interpreting it as an unforced solution extending through the whole past.

Use $c_f=1$, dimensionless time $t=T/\ell$ and dimensionless displacement $\mathbf y_i=(\mathbf X_i-\ell i)/\ell$. The fixed coefficient $g=16$ is the dimensionless coupling multiplying the acceleration sum. No additional restoring or damping term is introduced. Reflection across the plane halfway between the selected anchors makes their vertical displacements identical; write this coordinate as $z(t)$. Positive $z$ denotes height above the original lattice plane. The dimensional height is $\ell z$.

The infinite population remains in the equation. Its stationary acceleration contributions are summed by the original eight-source cubic block prescription. A changed source history supplies its exact moving-root contribution minus the stationary contribution already included in that sum. This decomposition preserves every source relationship.

## 2. Why the required source histories increase

The earlier endpoint was $H_0=259/128$. The new horizon is $H=9/4$, chosen after the numerical proposal located a minimum near $2.222$. By this time the targets receive their partner's generated forward motion, as well as additional environmental returns. Each target has 26 received changed source identities: six unit neighbors, twelve face diagonals and eight body diagonals. One unit neighbor is the other selected target. Identity counts differ from the numbers of old-pulse excitation paths that feed those histories.

The needed intermediate prefix ends at $a_1=41/32$. It contains 100 environmental histories and both selected target histories. The numerical archive stores those 100 environmental histories and the reflected partner prefix, together with the final right-target history. This is 102 distinct represented identities; reflection supplies the other final target. The full population theorem separately counts 248 histories that become nonconstant somewhere before $H$. Many of those remote changes cannot yet return to the selected pair.

Positive propagation time makes this finite history construction sufficient. With population displacement bound $B=1/64$, intermediate source bound $b_1=1/200000$, earlier source bound $b_0=1/60000$, and old source cut $a_0=33/32$,

$$
H-1+B+b_1<a_1,
\qquad
a_1-1+b_1+b_0<a_0.
$$

Thus the final target samples only the certified intermediate prefix, and that prefix samples only the already certified earlier source histories. The proof includes exact early-zero checks for trial polynomials as well as causal exclusions for actual histories. Source futures are evolved from the same Master Equation; none is extrapolated or prescribed independently.

## 3. From a numerical curve to actual motion

The [numerical constructor](smooth-two-particle-next-minimum-approximant.md) defines piecewise quintic histories with shared position, velocity and acceleration nodes. It preserves the previously certified nodes and exactly reflects the partner. Its numerical minimum near $t=2.221894879$ selects a location to investigate; that decimal is not the certified turning time.

The independent full-law comparison bounds the error in acceleration along every candidate cell, including the entire stationary block field. The accepted small-displacement estimate contributes a norm ball $22400\lVert\mathbf y\rVert^3$. Source-time shifts and their effects on source velocity enter the subsequent error propagation. The certificate reports the following continuous Euclidean residual bounds:

| Histories | Full residual upper bound |
| --- | ---: |
| Environmental and target source prefixes through $41/32$ | $9.471749\times10^{-11}$ |
| Final target through $9/4$ | $1.539527\times10^{-11}$ |

These satisfy the theorem's sufficient budgets $10^{-10}$ and $10^{-9}$. The positive integral comparison then supplies uniform target error allowances

$$
\varepsilon_P=1.3\times10^{-8},\qquad
\varepsilon_V=5\times10^{-8},\qquad
\varepsilon_A=2\times10^{-7}.
$$

They bound dimensionless position, velocity and acceleration errors. A small residual alone would not suffice: source uncertainty must be propagated through both receiving stages, and an actual regular solution must exist on the whole interval. The continuation theorem supplies those steps while preserving the supplied history, root completeness and stationary summation prescription.

## 4. The next minimum and the completed excursion

Continuous interval bounds give exactly one minimum in

$$
\frac{2274}{1024}\le t_4\le\frac{2277}{1024},
\qquad 2.220703125\le t_4\le2.2236328125.
$$

The actual vertical velocity is negative from $H_0$ to the left endpoint. It is negative at the left endpoint and positive at the right endpoint, while acceleration stays above $0.0003423119$ throughout the window. Velocity therefore crosses zero exactly once. It remains positive after the window through $H$, excluding another turn in that remaining interval. Together with the inherited earlier certificate, these are four consecutive vertical turns.

Let $m_2$ be the preceding minimum, $M_3$ the following maximum and $m_4$ the new minimum. Their certified dimensionless height intervals, displayed in millionths of a lattice spacing, are:

| Extremum | $10^6$ times dimensionless height |
| --- | ---: |
| Previous minimum $m_2$ | $[-0.428213,-0.307786]$ |
| Previous maximum $M_3$ | $[0.980320,1.100902]$ |
| New minimum $m_4$ | $[0.363061,0.389764]$ |

The preceding rise is $U=M_3-m_2$, and the new fall is $D_4=M_3-m_4$. The common maximum cancels in their difference:

$$
D_4<U\quad\Longleftrightarrow\quad m_4>m_2.
$$

The new minimum is strictly above the previous minimum, even after their respective errors are included. More quantitatively,

$$
\begin{aligned}
5.905568\times10^{-7}&<D_4<7.378403\times10^{-7},\\
1.288107\times10^{-6}&<U<1.529114\times10^{-6},\\
0.4192709&<D_4/U<0.5237783.
\end{aligned}
$$

The ratio retains the same maximum in numerator and denominator. It establishes that this completed fall is between approximately 42% and 53% of the preceding rise. At $t=9/4$ both targets are rising, with common height between $0.538084$ and $0.564085$ millionths of a lattice spacing.

## 5. Interpretation and limits

This fourth turn supports the proposed finite sequence of smaller excursions for this preparation. It supplies no all-time decay law, no limiting position and no bound excluding later growth. New received histories continue arriving, so the next excursion requires a further complete evolution and error argument. A vertical reversal is also distinct from the sign of the pair's horizontal separation velocity.

The result is falsified by an omitted received history, uncovered source time, incorrect transmitter factor, invalid stationary-field bound, failure of the actual continuation, invalid interval arithmetic, or failure of a displayed strict turn or amplitude inequality. A larger later excursion would limit an extrapolation of the observed pattern; it would not falsify these finite-interval conclusions.

## Evidence and reproduction

The retained archive and receipts are under the literal local paths `.local-data/master-equation-closure/next-minimum/approximant/` and `.local-data/master-equation-closure/next-minimum/check/`. The archive is authenticated by its numerical data hash. Script hashes record provenance and do not block later authorized source edits. Earlier accepted evidence files remain unchanged.

Fresh analytic controls passed before the target residual check: exact interval arithmetic, square-root bounds, implicit received derivatives against a separate high-precision calculation, quintic derivatives, signed accumulation and centered residual remainders. The turn instrument then passed known quadratic and correlated-ratio controls before checking the candidate. The full residual calculation completed in 16.833 seconds. These checks validate the stated mathematical computation; they do not establish that this preparation is typical of a populated universe.

The independent review separately reconstructed the population continuation, causal census and positive-series error bounds before accepting the frozen subjects. Exact rational Bernstein polynomial bounds verify every new turning window and intervening velocity sign, and independently give the tighter ratio $0.4192709175<D_4/U<0.5236717142$. The wider enclosure in Section 4 is retained as the common reported bound. Archive and exact reflection checks preserve the previously accepted histories. Reproduction with shared primitives is identified separately from these independent mathematical references.

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-minimum-certificate.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-minimum-certificate.py residual --stage both --subdivisions 8
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-minimum-turns.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-next-minimum-turns.py target
```
