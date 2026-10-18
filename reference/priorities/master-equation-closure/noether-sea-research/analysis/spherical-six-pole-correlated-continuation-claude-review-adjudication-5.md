# Six-pole correlated continuation review: adjudication 5 (the continuation's v4.2 shared column, membership tests and E16; my K2)

Written 2026-10-14T12:18:20Z by the review role, on the coordinator's contribution 4 (12:12:27) and the PI relay of the continuation's v4.2, [steps10-cm.py](../evidence/spherical-six-pole-correlated-continuation-claude-continuation-steps10-cm.py) sha256 7fdd2b627651e06c36b511038c037a94eea37f8e9077a24fb424d8ec9e154a5e (409 lines; read: lines 1 to 26, 55 to 206, 240 to 277). No code was run for this adjudication.

## 1. The shared acceleration-error column (item 1): ADMITTED, correct and complete (derived)

**Model.** The affine form is $z = c + \sum_s g_s u_s$ with $u_s \in [-1,1]$. Write $q_0 - \hat q = \sum_s g_{s,q} u_s$. The mean-value decomposition is $A(t_0) = m_A + j\,(q_0 - \hat q) + e$, with $|e| \le r_E = r_A + r_j\,d_q$, where:
- $m_A \pm r_A$ encloses the centre acceleration, with delayed reads and the origin as boxes;
- $j \pm r_j$ encloses $A'$ over the hull of $\hat q$ and the proved start box;
- $d_q$ bounds $|q_0 - \hat q|$, because the true $q_0$ lies in the proved start box.

The same scalar $e$ enters both rows: $\Delta^2/2 \cdot e$ in $q$ and $\Delta\,e$ in $w$. So the exact contribution is the segment $(\Delta^2/2,\ \Delta)\,r_E\,u_E$, and enlarging it coordinatewise would not enclose that segment. This is the coordinator's point, and it is correct.

**Repair (v4.2, lines 81 to 95).**
- The column is stored as point midpoints $(m_{Eq}, m_{Ew})$ of the interval products, so the true column is $m + \delta$ with $|\delta_q| \le r_{Eq}$ and $|\delta_w| \le r_{Ew}$.
- Then $\delta\,u_E$ lies in the box $[-r_{Eq}, r_{Eq}] \times [-r_{Ew}, r_{Ew}]$. That box is enclosed by the new independent single-entry columns $R_q$ and $R_w$, which receive $r_{Eq}$ and $r_{Ew}$.
- So the stored set contains the true one.
- Using an upper bound $r_E$ in place of the true bound is safe: $u_E = e/r_E$ still lies in $[-1,1]$.

**Completeness, column by column.**
- (a) Every propagated column $J g_s$, including the anchor columns and earlier $E$, $R_q$ and $R_w$ columns, is stored as its point midpoint, with its radii added to the new $R_q$ and $R_w$ (lines 84 to 86).
- (b) The centre is a point, with its rounding radius and the remainder radii added to $R_q$ and $R_w$ (lines 87 to 89).
- (c) The new $R_q$ and $R_w$ columns, and the anchor columns at creation (lines 133 to 135), are single-entry. For a single-entry column, outward rounding of its one entry enlarges the segment along its own axis, so it still encloses.

No other column is stored. The repair is therefore complete for every shared column (derived from the listed lines). The remainders $R_q \in a_p\,\Delta^3/6$ and $R_w \in a_p\,\Delta^2/2$ come from the same jerk. They remain independent boxes, which is outer and valid.

**Falsifier.** A stored column whose entries come from an interval product and are not point midpoints with radii moved to independent columns; or a known flow whose exact point leaves the set. E2 and E4 test the second.

## 2. The membership tests (item 2): the certified test ADMITTED, with one stated condition; the relaxed test ADMITTED only for exclusion

**Certified zonotope test (lines 156 to 164) (derived).** For a planar zonotope $Z = c + \sum_i g_i[-1,1]$, the support function in a direction $u$ is $h_Z(u) = u\cdot c + \sum_j |u\cdot g_j|$.
- So $|u\cdot(x - c)| \le \sum_j |u\cdot g_j|$ is necessary for $x \in Z$, for EVERY $u$. Any violated normal therefore certifies "outside", whatever the generators are.
- If the nonzero generators span the plane, the facets of $Z$ are parallel to generators. Checking the normals of all generators then gives the full H-representation, so passing every check is also sufficient, and "inside" is certified.
- **CONDITION.** "Inside" is valid only when at least two nonzero generators are not parallel. With all generators parallel, $Z$ is a segment, and the routine would wrongly answer "inside" for a point along the segment's line beyond its end.

Every positive use in v4.2 meets this condition:
- E2 and the full set of E3: anchor columns $(10^{-4},0)$ and $(0,10^{-4})$ propagated by the invertible step map, whose determinant is $1 + \Delta^2/2 \ne 0$ for $j = -1$;
- E4: anchors $(10^{-3}, 5\times10^{-4})$ and $(-2\times10^{-4}, 10^{-3})$, with determinant $1.1\times10^{-6}$;
- N-R: two axis anchors through the same map;
- E16: $(1,0)$ and $(0,1)$.

Any future positive use on target forms must assert the span, or return undecided. I recommend a guard, but it is not needed for this controls record.

**Rounding margin (inferred).** The routine works at 30 digits: `mp.dps = 30` is set in the frozen step chain, line 13 of the antipodal steps file; I did not trace every exec link. The decision margin is $10^{-24}(S + D_v) + 10^{-60}$. Rounding in each projected sum is of order $10^{-30}$ times the absolute terms. This leaves about six decades of headroom unless the generators are nearly parallel, at about 1 in $10^{6}$. That does not happen in the listed controls. Near-boundary cases are reported as undecided, never as decided.

**Relaxed routine `aff_contains_point` (lines 165 to 170) (derived).** It replaces every non-anchor column by independent row errors and encloses the anchor solve by interval arithmetic. Both steps enlarge the set, so its False answer certifies exclusion and its True answer certifies nothing. Its only use in v4.2 is E16 (line 276), as the demonstrated false positive. In E3 (line 193), the tied-set test is the relaxed solve OR "not certified outside". The negative therefore passes only if both say excluded, which is the conservative direction for a negative.

**Ruling.** The relaxed test is for refusal or exclusion only. Membership in the known-control memberships (E2, E3 full, E4, N-R) may be witnessed only by the certified test, as v4.2 does.

## 3. Control E16 (item 3): ADMITTED (derived by hand)

The zonotope has generators $(1,0)$, $(0,1)$ and $(2,2)$, with centre 0.
- **Point $(3,-3)$.** For the normal $(-2,2)$ of $(2,2)$: $|-6-6| = 12 > |{-2}| + |2| + 0 = 4$, so the point is certified outside. The relaxed test gives $u_1 \in 3 \pm 2 = [1,5]$, which meets $[-1,1]$, so it answers inside. That is the known false positive, reproduced.
- **Point $(2.5,2.5)$.** It equals $(0.5,0.5) + (2,2)$, so it is truly inside. Every normal passes: the checks are $2.5 \le 3$, $2.5 \le 3$ and $0 \le 4$.
- **Point $(3.5,3.5)$.** For the normal $(0,1)$: $3.5 > 3$, so it is certified outside.

The record must show all four results as expected. Falsifier: any of them reversed in the v4.2 controls record.

## 4. My K2 relabelling: SETTLED in [companion 3](spherical-six-pole-correlated-continuation-claude-review-reference-companion-3.md)

The range of $q\,w$ on K2's parallelogram is derived exactly. The function is a saddle, it is monotone along every edge (the edge stationary points lie at about $-65$ and $-9450$), and its range is attained at the vertices, which are sample nodes. The range is $[0.45093299,\ 0.47687099]$, equal to the recorded sampled range, and the centred enclosure contains it with margins of about $10^{-4}$. No code changed and nothing was rerun. The C10 record's field `exact_sampled_range` is read as "sampled, equal to the exact range by derivation". Companion 3 also relabels the lost C4 and C6 stream sizes as UNKNOWN; the earlier figures were estimates.

## 5. Consequence for admission (ruling)

Items 1 to 3 are admitted. The v4.1 record (2739ffeb…, 58 of 58) is the record of v4.1 only and admits nothing for v4.2. Once the v4.2 controls record exists, the matched comparison is admitted if all of the following hold:
- (a) its script hash is 7fdd2b62…;
- (b) every control passes, including E16 with the four expected results, E2, E3, E4 and N-R witnessed by the certified test, and N-H;
- (c) E3 still excludes the tied set.

I will audit that record when its hash is relayed. Any later positive membership on target forms needs the span condition of section 2.
