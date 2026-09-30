# Complete polynomial histories through $t=5$

## Result and scope

The immutable history audit establishes that the saved comparison population contains every identity in the first-excitation set through $t=5$, preserves its previously accepted input nodes, and defines continuous position, velocity and acceleration through every cell join. The first-excitation set contains **1172 environmental identities and both selected targets**, or **1174 identities**. The archive allocates 1350 identities because its original construction aimed beyond $5$; its remaining 176 environmental histories have exactly zero position, velocity and acceleration through $5$.

These are measured archive properties and derived properties of the exact dyadic comparison polynomials. They do not by themselves certify that the actual Master-Equation paths stay near those polynomials. The largest environmental polynomial displacement through $5$ is bounded above by $0.05930465151710837$, leaving approximately $0.00319534848$ before the original environmental ceiling $1/16$. The [accepted continuation assessment](smooth-two-particle-through-five-independent-adjudication.md) supplies the actual error comparison and closes that margin. Combined with its individual-path bounds, the exact triangle-inequality calculation below proves that every initially unit-separated lattice-neighbor pair remains at least $0.8825413871014336$ lattice spacings apart throughout $0\le t\le5$.

## 1. Identity census and preserved histories

The [first-excitation argument](smooth-two-particle-population-restart-continuation.md) assigns each environmental anchor $n$ a first exciting squared distance

$$
m(n)=\min\{\lVert n-c\rVert^2:\ c\in\{(0,0,0),(1,0,0)\},\ \lVert n-c\rVert^2\ge2\}.
$$

The restriction to squared distance at least two retains the previously derived unit-neighbor exception. Its first excitation is at $\sqrt{m(n)}-11/8$. The triangle inequality for chains of first-entry fronts excludes an earlier generated-only excitation outside this direct-front set, as established in the linked theorem. Consequently the complete environmental census through $5$ is the finite integer set with

$$
m(n)\le(5+11/8)^2=2601/64,
\qquad\text{equivalently}\qquad m(n)\le40.
$$

The known-controlled integer enumeration in `audit.json` records all 1172 anchors and their shell counts. Its empty early census and independently hand-countable 24-label shell-two census passed before the target enumeration. Applying the count to the actual dynamics uses the cited first-excitation theorem; counting archive rows alone would establish only allocation.

The read-only audit authenticated the five archives listed below against their previously recorded SHA-256 digests. It then decompressed each archive once and compared the relevant arrays in memory.

| Archive basename | Audited use |
| --- | --- |
| `population-h21-4.npz` | Complete saved population; actual saved endpoint $2571/512$, beyond $5$ |
| `population-h19-4.npz` | All inherited source and target node bits preserved through $19/4$ |
| `population-h17-4.npz` | All inherited source and target node bits preserved through $17/4$ |
| `target-h5.npz` | Every shared right-target position, velocity and acceleration node preserved through $5$ |
| `target-h11-2.npz` | Every shared right-target node preserved through the population archive's saved endpoint |

All five hashes matched. The full source label order is unchanged on each inherited prefix. Source index 76 is the left target at $(0,0,0)$; its displacement and all stored derivatives are the exact reflection of the right target, changing only the horizontal component's sign. Reflection comparisons use exact dyadic values, for which the two binary encodings of zero represent the same number. Prefix preservation itself was tested bit for bit, including signed zeros. The source table has 1349 entries, and the separate right target is at $(1,0,0)$.

Every declared exact-zero cutoff lies on the $1/1024$ history grid, and every source position, velocity and acceleration node through that cutoff was checked to be exactly zero. The inherited incoming-source order matches the previous source table followed by the right target. Each stored generated edge uses an environmental receiver and a valid incoming-source index; no edge joins an anchor to itself. These checks authenticate the saved candidate graph but do not prove completeness of the actual/trial union required by the residual calculation.

## 2. Continuous norm bounds

A stored position, velocity and acceleration triple at each endpoint determines a quintic polynomial on each history cell. The audit uses the frozen outward interval arithmetic and Hermite coefficient constructor from [the existing residual instrument](smooth-two-particle-later-residual.py). It independently converts the resulting power coefficients to Bernstein coefficients to bound the whole cell, rather than evaluating only saved times.

For any derivative order $d\in\{0,1,2\}$, write the vector polynomial on normalized cell time $u\in[0,1]$ as

$$
p_d(u)=\sum_{k=0}^{N}a_k u^k
=\sum_{j=0}^{N}b_j\binom Nj u^j(1-u)^{N-j},
\qquad
b_j=\sum_{k=0}^{j}\frac{\binom jk}{\binom Nk}a_k,
\qquad N=5-d.
$$

The Bernstein weights are nonnegative and sum to one. Therefore every value of $p_d$ is a convex combination of the coefficient vectors, and

$$
\lVert p_d(u)\rVert\le\max_j\lVert b_j\rVert.
$$

The instrument encloses every elementary arithmetic operation outward, including each coefficient ratio and Euclidean norm. It also takes the minimum and maximum Bernstein coefficients of the vertical component to bound target height, vertical velocity and vertical acceleration on each time bin. These are bounds on the saved polynomial, not error bounds relative to actual trajectories.

Shared endpoint triples imply exact $C^2$ joins: each adjacent polynomial has the same position and first two derivatives at the common node. The instrument checked the Hermite endpoint identities using exact fractions on all six basis inputs. Because the map from the six endpoint values to its coefficients is linear, those checks establish the identities for arbitrary dyadic node data. This covers the inherited cutoffs, exact-zero cutoffs and the point where the numerical stationary center changed, without treating an acceleration mismatch with the equation as a jump between polynomial cells.

The receipt `prefix-norms.json` contains individual-path bounds for every cumulative interval $[0,t]$ at $1/32$ cuts from $17/4$ through $5$. It also contains individual bounds on each intervening $1/32$ bin, and the corresponding vertical target intervals. The following displayed environmental bounds are rounded upward from that receipt:

| Prefix endpoint $t$ | Displacement norm | Velocity norm | Acceleration norm |
| --- | ---: | ---: | ---: |
| $17/4$ | 0.007099579 | 0.023754650 | 0.066103986 |
| $9/2$ | 0.015525270 | 0.045689772 | 0.115485875 |
| $19/4$ | 0.031356842 | 0.084380205 | 0.235391120 |
| $39/8$ | 0.043531755 | 0.113027906 | 0.326872071 |
| $5$ | 0.059304652 | 0.160487754 | 0.510067999 |

At the final prefix, the largest environmental displacement bound belongs to $(-1,0,0)$, source index 11. The largest velocity bound belongs to $(0,-1,0)$, source index 23, and the largest acceleration bound to $(-1,0,1)$, source index 12. Each bounding cell is $[5119/1024,5]$. These identify where the coefficient enclosure is largest; they do not assert uniqueness of the physical extremum or establish an actual trajectory extremum.

For either selected target, the cumulative polynomial norm bounds through $5$ are respectively $0.038030162231804505$, $0.13553430168507757$ and $0.496822337532467$. The separate vertical intervals must be combined with actual velocity errors before concluding that either target remains rising.

## 3. Simultaneous neighbor separation

The [independently accepted continuation](smooth-two-particle-through-five-independent-adjudication.md) provides a displacement upper bound $P_i$ for each path on each $1/64$ time bin from $13/4$ through $5$. Here displacement means distance from that architrino's original lattice anchor. If two anchors $n_i,n_j$ were one lattice spacing apart, the triangle inequality gives

$$
\lVert X_i(t)-X_j(t)\rVert
\ge\lVert n_i-n_j\rVert-\lVert X_i(t)-n_i\rVert-\lVert X_j(t)-n_j\rVert
\ge1-P_i-P_j.
$$

Thus a bound on how far each architrino can move also bounds how close that pair can come, without asserting which direction either one moves. The calculation enumerates every unit-anchor edge touching the 1350 represented identities and includes stationary neighbors outside that table. A pair with both anchors outside the affected set remains at distance one. All per-bin sums and comparisons use exact rational representations of the outward binary64 displacement bounds.

Taking the minimum across all 112 bins and every such edge gives the simultaneous unit-neighbor lower bound

$$
\lVert X_i(t)-X_j(t)\rVert\ge0.8825413871014336,
\qquad 13/4\le t\le5.
$$

The smallest triangle bound belongs to anchors $(0,1,0)$ and $(1,1,0)$ on the last bin. This identifies the limiting estimate, not a located closest approach. For the two selected targets, the same calculation gives the separate lower bound $0.9176591506454331$. A lower bound below the initial spacing does not imply approach: this estimate discards displacement direction and supplies only a separation guarantee.

The earlier accepted complete-population prefix extends these bounds to $0\le t\le5$. Its independent continuous polynomial displacement norm is $0.00041685101525589413$, and its monotone actual position-error bound through $13/4$ is $1.5834890105336376\times10^{-6}$. Their sum is below $0.000418434505<1/2000$; the accepted preceding source-error bounds are smaller. Consequently every unit-anchor pair has distance greater than $1-2/2000=0.999$ on $[0,13/4]$. Taking the lesser bound on the two overlapping intervals preserves the displayed $0.8825413871014336$ population bound and $0.9176591506454331$ selected-target bound throughout $[0,5]$.

The local receipt `pulse-neighbor-gap.json` preserves the original conditional arithmetic against the frozen per-path continuation record `.tmp/mec-008-through-five/hale/pulse.json`. A separate `neighbor-adoption.json` binds that calculation to the final independent acceptance and the earlier frozen `polynomial-target.json` and `population-error-target.json` under `.tmp/mec-008-population-restart/moore/`. Its fresh exact-arithmetic controls precede adoption. These are finite-interval lower bounds for simultaneous separations of specified anchor-neighbor pairs; they are neither an all-pairs minimum nor a closest-approach event certificate.

The independent distance instruments are `.tmp/mec-008-through-five/archive/neighbor-gap.py`, `pulse-neighbor.py` and `adopt-neighbor.py`. Their exact controls cover one moving anchor beside stationary neighbors, adjacent and nonadjacent moving anchors, a stationary lattice, separate-bin extrema, the prior polynomial-plus-error sum and downward rounding. Those controls passed before target arithmetic. Unchanged source snapshots are retained in the local evidence directory as `neighbor-gap-instrument.py`, `pulse-neighbor-instrument.py` and `adopt-neighbor-instrument.py`.

## 4. Evidence, reproduction and falsifiers

The local evidence directory is `.local-data/master-equation-closure/through-five/history/`. It contains `known.json`, `audit.json`, `prefix-norms.json`, and the frozen source snapshot `audit-instrument.py`. The executable source used for this pass is `.tmp/mec-008-through-five/archive/audit.py`; its exact bytes are retained in the local snapshot so the scratch path is not the only surviving instrument.

An additional receipt, `source-prefix-norms.json`, supplies the same continuous individual-path position, velocity and acceleration bounds for the 836 incoming histories in the frozen `population-h17-4.npz`, at every $1/32$ prefix from $13/4$ through $17/4$. Its `all_points` order contains the 835 stored sources followed by the right target. A separate `source-known.json` records fresh known controls before that extraction, which completed in 14.691 seconds with exit code zero. Its executable is `.tmp/mec-008-through-five/archive/source-prefix.py`; the unchanged source is retained as `source-prefix-instrument.py` in the local evidence directory. The additional extraction did not change the original audit or prefix receipts.

The companion `early-source-prefix-norms.json` extends that same 836-path mapping backward to cumulative prefixes from $73/32$ through $103/32$, again at $1/32$ spacing. It supplies the earlier source-specific acceleration bounds needed to refine inherited comparison errors while leaving the stored trajectories and their residual certificates unchanged. Fresh `early-source-known.json` controls passed before its 10.907-second target extraction. Its source and retained snapshot are respectively `.tmp/mec-008-through-five/archive/early-source-prefix.py` and `early-source-prefix-instrument.py`.

Finer time partitioning is available in two separate receipts. `fine-prefix-norms.json` supplies cumulative and local bounds at $1/64$ spacing for all 1350 allocated histories on $[13/4,5]$. `fine-source-prefix-norms.json` supplies the corresponding 836 incoming-history bounds on $[73/32,17/4]$. The extraction reauthenticated both archives and checked the complete inherited $17/4$ prefix bit for bit before restricting its columns. Fresh `fine-known.json` controls preceded the 24.382-second target run. The underlying history cell polynomials are unchanged; only their grouping into time bins is finer. The source `.tmp/mec-008-through-five/archive/fine-prefix.py` and retained `fine-prefix-instrument.py` snapshot reproduce these additional receipts. The four earlier receipts retained their recorded hashes.

The separate `dense-prefix-norms.json` and `dense-source-prefix-norms.json` receipts use $1/256$ spacing on the same respective ranges and column mappings. Fresh `dense-known.json` controls and repeated archive/prefix authentication preceded their 26.631-second extraction. The four-cell bins further reduce time-grouping overestimates without changing any comparison polynomial. Their source is `.tmp/mec-008-through-five/archive/dense-prefix.py`, retained locally as `dense-prefix-instrument.py`; the earlier receipts remain unchanged. These are reserve receipts: the accepted continuation uses the $1/64$ profiles together with exact exclusion of completed or not-yet-started supplied-pulse receptions from the comparison derivative.

The instrument passed its known controls before opening any target archive: exact six-variable Hermite endpoint identities; the vector quadratic with exact displacement norm $5t^2$, velocity norm $10t$ and acceleration norm 10; a quadratic with exact vertical derivative extrema; exact-rational quartic checks across four cells; the empty and shell-two integer censuses; the unit-neighbor exception; and bitwise equality controls. The target run then completed in 28.746 seconds with exit code zero and advancing continuous-cell progress. No trajectory was rerun and no input archive or frozen reference instrument was changed.

The source and receipts can be reproduced with the shared environment:

```bash
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/audit.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/audit.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/source-prefix.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/source-prefix.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/early-source-prefix.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/early-source-prefix.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/fine-prefix.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/fine-prefix.py target
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/dense-prefix.py known
"${AAA_VENV:-../.venv}/bin/python" .tmp/mec-008-through-five/archive/dense-prefix.py target
```

The complete-population per-path arrays have 1350 entries in the order `all_points`: the stored `source_points` followed by the separate right target. `environmental_labels` selects the 1348 allocated environmental paths; `target_indices` is `[76,1349]`. The incoming-source receipts instead have 836 entries and target indices `[76,835]`, as specified above. Cumulative records are under `prefix_profiles`; local time bins are under `bin_profiles`. The original complete-population receipt also names each grouped extremum's path and enclosing history cell. These labels and scopes are essential when using the bounds in source-specific continuation estimates.

The archive claim is falsified by a mismatching authenticated hash, a changed inherited node, an omitted first-front label, a nonzero supposedly inactive prefix, or a failed exact reflection. The polynomial enclosure claim is falsified by an error in the Hermite-to-Bernstein identity, an outward-rounding failure, or a demonstrable polynomial value outside the recorded bound. The separation claim would fail if an accepted per-path displacement bound failed, if a nonstationary exterior neighbor were omitted, or if the exact triangle arithmetic were incorrect. Actual continuation, original-class closure and complete root accounting through $5$ are established by the linked independent assessment. The next maximum remains unfound.
