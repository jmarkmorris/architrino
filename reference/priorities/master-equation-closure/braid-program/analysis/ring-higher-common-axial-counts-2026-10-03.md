# Common axial growth across the hundred recorded six-member rungs

Date: 2026-10-03. Scenario: unchanged Master Equation, every positive-delay self root, no cap, multiplier, root exclusion or event rule. All numbers use $K=c_f=1$. **Grade: computer-assisted derived complete scalar spectral counts, frozen for separate independent adjudication.** The exact balances and complete ordinary ledgers are inherited from the [hundred-reference Cartesian admission](ring-symmetric-independent-adjudication-2026-10-03.md); a spectrum is never evaluated about an unbalanced preparation.

## Result and domain

The [hundred-row table](ring-common-axial-all100-table-2026-10-03.md) records the following counts, including algebraic multiplicity, of strictly growing roots in the common axial sector:

| Recorded even rungs | References | Roots with positive real part |
| --- | ---: | ---: |
| T02–T08 | 4 | 0 |
| T10–T64 | 28 | 2 |
| T66–T178 | 57 | 4 |
| T180–T200 | 11 | 6 |

The imaginary boundary has no nonneutral root. These are complete right-half-plane counts for one scalar sector, with a proved outer exclusion rather than a finite frequency scan. They do not count the differential axial or planar sectors. Every recorded ring already has growing common planar modes, so the first row does not establish a stable ring. The changes occur between adjacent *recorded* references; no intervening continuous exact ring is postulated and no Hopf bifurcation along an exact family is claimed.

The [separately adjudicated lower-rung strip exclusions](ring-common-axial-independent-adjudication-2026-10-03.md) remain stronger at T02/T04/T06: their nonneutral root real parts are below $-0.4,-1,-0.5$. For T08 the present zero count implies an existential common-sector spectral gap, without a numerical damping bound. For Re $s\ge-1$, the same outer-cap estimate confines every possible root to a compact disk. A nonzero entire function has finitely many zeros there, and none is on or right of the imaginary axis. Hence their distances to that axis have a positive minimum, if this set is nonempty; otherwise the unit strip is already root-free. This yields some positive gap. The lower-rung inverse-transform argument then gives linear damping modulo fixed translation for the specified preparation. This is a conditional derived consequence of the full count, not an additional measured rate.

At every reference in the other three rows, a nonzero flat-past common axial velocity increment $U$ has transform $Z(s)=U/H(s)$. Every counted zero of $H$ in the open right half-plane is a pole of that transfer: its nonzero constant numerator cannot cancel any of them. Thus this specified common axial preparation has growing linear components instead of a pure ring-down. Simple poles yield exponentials, with oscillation for nonreal roots; repeated poles can add powers of time. Root locations or simplicity are not inferred from a winding count. This conclusion concerns the first variation; no finite nonlinear prepared trajectory or later destination is retained.

**Falsifier:** failure of the admitted exact reference, a missing ordinary hit, an invalid outward boundary enclosure, an incorrect winding orientation, a zero on the claimed imaginary boundary, or failure of the outer domination inequality overturns the associated count. A different past or input changes the response statement. The binary receipt for each rung, rather than its rounded radius or a sampled phase plot, exposes the full check.

## Entire scalar function and complete contour

For a common axial displacement, the first-order delay change is zero because reference source velocity and separation are planar. The [axial first variation](ring-axial-independent-adjudication-2026-10-03.md) gives

$$
z''(T)=\sum_jw_j[z(T)-z(T-d_j)],\qquad
w_j=\frac{(-1)^{m_j}}{d_j^3|D_j|}.
$$

All complete reference rows are included, with either sign of $D_j$ and every ordinary self hit. Set

$$
H(s)=s^2-\sum_jw_j(1-e^{-sd_j}),\qquad
E_1(q)=\int_0^1e^{-qt}\,dt,
$$

$$
G(s)=H(s)/s=s-\sum_jw_jd_jE_1(sd_j).
$$

The entire extension has $E_1(0)=1$ and $G(0)=-\sum_jw_jd_j$. The outward start interval is strictly positive at every target, so the removed translation zero of $H$ is simple and $G$ has no zero there. Treating $G$ as a meromorphic quotient without filling in zero would invalidate this boundary count; the implementation fills it explicitly.

For $\Re s\ge0$, the cap

$$
C_0=2\sum_j|w_j|
$$

gives $|H(s)-s^2|\le C_0$. Choose $L=\lceil\sqrt{C_0^{\rm upper}}\rceil+1$, so $L^2>C_0$. Every possible right-half-plane zero lies inside $|s|<L$. On the right semicircle, $G(s)/s$ lies in the open disk centered at one with radius $C_0/L^2<1$. Its zero-free homotopy is the admitted outer-boundary argument, not a truncation of the spectrum.

The vertical upper boundary $s=i\omega$, $0\le\omega\le L$, is covered by outward complex rectangles excluding zero. Each panel also encloses its two endpoint values. Binary midpoint vertices lie inside those rectangles; convexity gives a zero-free homotopy to a polygon. Real coefficients supply the lower half by conjugation. Starting on the positive real axis and ending in the upper half-plane with the outer domination, the admitted clockwise convention counts $-2k$ zeros, where $k$ is the net negative-real-ray crossing count of the upper polygon. Here $k=0,-1,-2,-3$ across the four groups. Both point vertices and crossing tests are outward bounded. No phase unwrapping or finite list of Newton roots supplies the count.

Near zero the new wrapper evaluates $E_1$ by its Taylor series through degree 24. For $Q\ge|q|$, the remaining norm is bounded by

$$
|E_1(q)-\sum_{k=0}^{24}(-q)^k/(k+1)!|
\le e^Q Q^{25}/26!.
$$

This follows by integrating the exponential Taylor remainder on $0\le t\le1$. The series enclosure is used only for $Q\le1/4$; larger zero-containing panels receive an infinite interval and must subdivide. Away from zero the quotient $(1-e^{-q})/q$ is evaluated outward. A failed subdivision budget would leave the target incomplete, never a zero count.

## Controls, inherited premises and frozen identities

The [new wrapper](../../../../../scripts/braid-program/ring_common_axial_higher_rungs_20261003.py), SHA-256 `9fca837d700c3815663d549b8de4d93b3945767ca199c318d8741dbe3ee300ad`, reuses the admitted subject contour primitive with SHA-256 `0e4fb74fba6ff5a7f74140070ee6b1e7cf9dc5652f822961516c37f80116acf3`. This reuse is declared implementation dependence; it is not independent adjudication of a higher-rung result. Its exact-reference gate binds each certificate to the frozen independent hundred-reference admission.

Before targets, the final wrapper passes the analytical stable count zero and conjugate positive count two controls, using $s+1$ and $[(s-1/2)^2+1]/(s+3)$ in their declared domain, plus $E_1(0)=1$ and its closed imaginary-argument identity. The known receipt is retained at `.local-data/ring-exploration/common-axial-higher/known.json`. Six first targets then count T08/T10/T20/T50/T100/T200; the other 94 targets include T02/T04/T06 at literal strip depth zero. Each successful final receipt binds the exact gamma binary tuple `[0,0,0,0]`, the method, instrument, reference, cap, panels, vertices and integer count. Earlier depth-$0.05$ exploratory receipts are preserved but do not establish a positive-real-part count.

Owned run `7dd4f6a6-4585-4711-a48a-db2147baff0f` completed the six zero-depth samples in 25.964 wall seconds. Owned run `ba92a512-2b00-48dd-92e4-54209f7620dc` completed the other 94 in 754.923 wall seconds, exit zero, stderr zero and closed process group, by its supervised final lease. All targets passed under the shared venv. These are measured invocation costs on this machine under concurrent work, not a general cost model.

The [receipt projector](../../../../../scripts/braid-program/ring_common_axial_count_table_20261003.py) passes an exact four-row grouping control before extracting the targets. Its all-hundred diagnostic summary SHA-256 is `253d36819d0292adc1e4d253d6fa021e6b1508d7796afbb025c12b993ddf2cec`, and the hundred-row table SHA-256 is `2a560ae31adf858032849a931786c39d7f91d3b6bc6ce96b06ba635d16a7eddc`. The projector checks identities and declared fields; it does not revalidate contour mathematics or individual boundary inequalities.

```sh
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_higher_rungs_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_higher_rungs_20261003.py --stage target --gamma 0 --rungs 8 10 20 50 100 200
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_count_table_20261003.py --stage known
"${AAA_VENV:-../.venv}/bin/python" scripts/braid-program/ring_common_axial_count_table_20261003.py --stage target
```

The table projection requires every even target T02 through T200, not just the six displayed reproduction samples. The subject and its instruments remain frozen during separate adjudication. Shared queue, index and manuscript acceptance belongs to the coordinator after review.
