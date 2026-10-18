# Six-pole correlated continuation review: adjudication 6 (the continuation's v4.3 certified membership, E17 and the 60-step shortening)

Written 2026-10-14T12:22:56Z by the review role, on the coordinator's contribution 5 and the PI relay of the continuation's v4.3, [steps10-cm.py](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm.py) sha256 51a2c8a68e07a96896e62e1d83ff8bc63016e281f560765abe6d38d739883338 (read: lines 13, 155 to 220, 268 to 310). No code was run.

## 1. The facet theorem for full-dimensional sets (derived): ADMITTED for rank 2

Let $Z = c + \sum_j g_j[-1,1]$ be a planar zonotope whose nonzero generators span the plane. Then $Z$ is a centrally symmetric polygon, and each of its edges is a translate of a sum of parallel generators. The outward normals of its edges are therefore among the normals $n_i = (-g_{i,y}, g_{i,x})$ of the generators.

Since $h_Z(n) = n\cdot c + \sum_j |n\cdot g_j|$:
- $x \in Z$ if and only if $|n_i\cdot(x - c)| \le \sum_j |n_i\cdot g_j|$ for every $i$;
- each single inequality is necessary for every $Z$ whatever its rank, because it is a support-function bound.

v4.3 (lines 157 to 177) evaluates both sides as directed intervals, with the offset $x - c$ as an interval, the normals by exact swap and sign, and the products and sums in interval arithmetic. It then decides:
- OUTSIDE when the lower bound of $|n\cdot d|$ exceeds the upper bound of the support sum for some normal. Every point of the interval point then violates a necessary inequality.
- INSIDE when the upper bound of $|n\cdot d|$ is at most the lower bound of the support sum for EVERY normal. Every point then satisfies the complete H-representation.
- UNDECIDED otherwise.

Both decisions are rigorous for rank 2. Rank 2 is declared only when some cross product $g_0 \times g_j$ is certified nonzero, that is, when the lower bound of its absolute value is positive. That certifies that two generators span the plane. **Falsifier:** a point certified inside that violates some support inequality, or a point certified outside that lies in the set.

## 2. Degenerate cases (derived): ADMITTED

- **Rank 1.** Every cross product is exactly the zero interval. Since each interval contains the exact value, every generator is exactly parallel to $g_0$, and $Z$ is the segment $c + [-\sum_j|\lambda_j|, \sum_j|\lambda_j|]\,g_0$, where $g_j = \lambda_j g_0$. The routine:
  - answers OUTSIDE if the perpendicular projection $n_0\cdot d$ is certified nonzero;
  - answers UNDECIDED unless that projection is exactly the zero interval (an interval point of positive width can never be certified on a segment, which is correct);
  - otherwise applies the along-direction bound $|g_0\cdot d| \le \sum_j |g_0\cdot g_j| = |g_0|^2\sum_j|\lambda_j|$, which is exactly the segment condition.
- **Uncertain rank.** Some cross product neither certified nonzero nor exactly zero gives UNDECIDED. This is the safe refusal.
- **Rank 0.** No nonzero generator: INSIDE only for an exactly zero offset, OUTSIDE for a certified nonzero offset, else UNDECIDED. Correct.

**Inner and outer sets (lines 178 to 190).**
- INSIDE is decided on the inner zonotope, the anchor columns and the largest columns. Dropping generators means setting their symbols to 0, so the inner zonotope is a subset of the set.
- OUTSIDE is decided on the outer zonotope: the kept columns plus the remaining columns merged into the two axis columns $(r_x,0)$ and $(0,r_y)$, where $r_x$ and $r_y$ are the upward-rounded sums of the absolute entries. That box contains the sum of the dropped columns, so the outer zonotope is a superset.
- Both directions are therefore sound. In this hash `kmax` defaults to None, so all columns are kept and the outer set is used only if columns are dropped.

## 3. Scope: only the controls' known containments depend on it (verified by reading)

`zono_status`, `_zono_decide` and `aff_contains_point` are called only at lines 201, 216, 219, 230, 273, 276, 302 and 307 to 309: the controls E2, E3, E4, N-R, E16 and E17. The step inclusion uses none of them: `aff_step`, `aff_hull`, `corr_step`, the proved-enclosure intersection and the record construction. A defect in the membership routine could therefore make a control pass or fail wrongly. It could not make a reconstructed enclosure wrong.

## 4. FINDING on E17's near-boundary sub-control (inferred, not run): very likely FAILS by construction

Line 308 builds the straddling point as `I(1 - mp.mpf("1e-35"), 1 + mp.mpf("1e-35"))`, with point mp arithmetic at 30 digits. That precision is about 103 bits, so representable numbers near 1 are spaced about $2\times10^{-31}$ apart.
- Both endpoints round to exactly 1, so the "interval point" is the point $(1, 0.3)$, which lies on the boundary of the unit square.
- The routine will correctly answer INSIDE, because the closed set contains its boundary.
- The sub-control `rank2_near_boundary_undecided` expects UNDECIDED, so it will be recorded False and E17 will fail.

This is the same kind of defect as my own C8 run: binary-point construction against an intended exact width. It is a defect of the control's construction, not of the routine.
- **Basis.** `I(a, b) = iv.mpf([a, b])`, as defined at line 17 of the antipodal steps file, and `mp.dps = 30` at its line 13. I inferred that these definitions reach this script through the exec chain; I did not run it.
- **Falsifier of this inference.** The C14 record shows `rank2_near_boundary_undecided` True.
- **Fix.** `iv.mpf(1) + iv.mpf(["-1e-35", "1e-35"])` rounds outward to about $1 \pm 2\times10^{-31}$ and gives UNDECIDED. Alternatively, use a half-width above the spacing of representable numbers, for example $10^{-25}$.

All other E17 cases check by hand:
- on the segment, $(0.5,0.5)$: perpendicular projection 0, along-direction $1 \le 2$, so INSIDE;
- beside it, $(0.5,0.6)$: perpendicular projection $0.1$, so OUTSIDE;
- beyond its end, $(1.5,1.5)$: along-direction $3 > 2$, so OUTSIDE;
- unit square, $(0.999,0.3)$: INSIDE; $(1.001,0.3)$: OUTSIDE;
- rank 0: both cases as stated.

## 5. The 300-to-60 step shortening: ADMITTED (derived for consistency; margins inferred)

- E2 uses $T = 0.6 = 60 \times 0.01$ for the exact solutions and $J^{60}$ for the exact step-map image (lines 199 to 202).
- E3 propagates 60 steps both in the affine forms and in the 60-digit reference (lines 211 to 214).
- N-R runs 60 steps and uses the same $T$ (line 271).

The criteria are unchanged in form, and the known truths are recomputed for 60 steps, so each control still tests what it tested.

Margins (inferred):
- **E3.** The near-corner offset $(0.9, -0.9)\times10^{-4}$ is perpendicular to the tied direction $(1,1)$. $J^{60}$ is close to a rotation by $0.6$, so the distance from the tied segment stays about $1.3\times10^{-4}$, far above the rounding columns. Full-set membership keeps a margin of $0.1\times10^{-4}$.
- **N-R.** The exact flow departs from the centre of the second-order step map by about $60\,\Delta^4/24 \approx 2.5\times10^{-8}$, far above the $10^{-12}$ dropped set.

The run measures both. The 486-record chain, the wider chart and the step inclusion are not touched by the shortening.

## 6. Ruling for admission

The v4.3 instrument (sections 1 to 3 and 5) is ADMITTED. The admission rule of adjudication 5 applies to the hash 51a2c8a6…: full pass, E16's four results, E17's results, and certified witnesses for E2, E3, E4 and N-R.
- If C14 records E17 failing only on `rank2_near_boundary_undecided` with the answer INSIDE, that is the construction defect of section 4. The comparison is NOT admitted on that record. A v4.4 that changes only line 308's construction, followed by a controls run, is the remedy.
- If C14 records it undecided, my inference in section 4 is falsified and the record admits the comparison, subject to the rest of the rule.
