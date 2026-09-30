# Complete history coverage for the next-event comparison

## Result and scope

The independently enumerated history selection covers every required receiver and generated cross-source row on the prospective interval $[5,11/2]$, under receiver displacement $B=7/20$, accepted source-prefix displacement $b_s=7/100$, and the subunit history chart before the first global speed-one event. The [new numerical comparison](smooth-two-particle-next-event-evolution.md) contains exactly the required 1,502 receiver labels. Its 149,046 stored generated rows exactly match the independent rational numerical selector and include all 140,326 possible actual rows. No missing row was found by the exact enumeration.

This is a derived geometric and archive result. It does not establish that the actual solution remains in the prospective domain, certify an event time, or authorize evolution after an own-history root is born. The auxiliary numerical reference extends beyond its first trial speed-one crossing solely for the separate event-forcing argument. The complete supplied past, $g=16$, $c_f=1$, infinite checkerboard lattice and original stationary block field remain unchanged.

## 1. The receiver and source populations

Let $E=\{(0,0,0),(1,0,0)\}$ be the two original pulse centers. For an environmental lattice label $p\notin E$, define the accepted first-excitation squared distance

$$
m_p=\min\{|p-e|^2:e\in E,\ |p-e|^2\ge2\}.
$$

The restriction to distances at least $\sqrt2$ retains the established unit-neighbor exception: a supplied pulse at unit distance has already passed before release. The first possible environmental change occurs at $\sqrt{m_p}-11/8$. For $H=11/2$,

$$
m_p\le(H+11/8)^2=\frac{3025}{64}
\quad\Longleftrightarrow\quad m_p\le47.
$$

Exact integer enumeration gives 1,500 environmental labels and the two targets, or 1,502 receiver identities. The archive contains this set exactly, with no duplicate label. This count describes the population potentially affected by the horizon, not a count of simultaneously moving particles or the replacement of the infinite population by a finite bare lattice.

The retained source table is the old numerical archive restricted to the closed interval $[0,5]$. It contains 1,350 distinct labels, with the right target appended after the old source table and the left target already present at index 76. The [accepted through-five analysis](smooth-two-particle-through-five-independent-adjudication.md) provides the earlier history and solution-error bounds; the numerical archive's unused suffix after $5$ is not treated as accepted input. The independently accepted actual displacement bound through $5$ is below $7/100$.

To close the source cutoff, first evaluate a distinct-label causal residual at source time $5$. Its range there is at least $1-B-b_s=29/50$, whereas $H-5=1/2$. Thus the residual has crossed zero before the closed source endpoint. Before the first global speed-one event, its source-time monotonicity excludes any additional later cross root. The received source time consequently satisfies

$$
s\le H-1+B+b_s=\frac{123}{25}=4.92<5.
$$

The first-front enumeration at this source ceiling contains 1,142 labels, all included in the 1,350-source table. No unrepresented earlier source is required. This cutoff argument uses the known displacement at the closed prefix endpoint and the pre-event root chart; it does not assume a displacement bound for an uncomputed future source history.

## 2. Actual and numerical generated rows

For an environmental source $p$, put $(m,\sigma)=(m_p,11/8)$; for either generated target source put $(m,\sigma)=(2,3/8)$. At the first source-change time $s_0=\sqrt m-\sigma$, the source is still at its anchor. A nonzero received generated contribution at receiver $r$ therefore requires

$$
\sqrt m+\sqrt{|r-p|^2}\le H+B+\sigma.
$$

This follows by evaluating the monotone source-time residual at $s_0$. The source displacement allowance need not be added at that zero-displacement onset. For a rational $q\ge0$, the radical comparison is evaluated exactly through

$$
\sqrt m+\sqrt n\le q
\quad\Longleftrightarrow\quad
q^2-m-n\ge0\quad\hbox{and}\quad(q^2-m-n)^2\ge4mn.
$$

No floating square-root decision enters this selector.

Let $c_p$ be the numerical source's retained exact-zero cutoff. The proposal uses the more conservative condition

$$
0<|r-p|<H+B+b_s-c_p.
$$

The independent audit compares integer squared distances with the exact rational square of the right-hand side. Equality is excluded. It then compares every resulting ordered receiver/source pair with the saved edge array.

| Generated selection | Directed rows |
| --- | ---: |
| Possible actual rows | 140,326 |
| Exact numerical selector | 149,046 |
| Actual/numerical union | 149,046 |
| Numerical-only rows | 8,720 |
| Actual-only rows | 0 |
| Stored rows missing from either required selection | 0 |
| Stored rows outside the stated numerical selector | 0 |

The actual selector determines which rows can contribute to actual receiver sensitivity. The union determines received history-error forcing. Numerical-only rows cannot be discarded merely because the corresponding actual source is still inactive. These are prospective counts over the complete interval, not simultaneous nonzero-interaction counts.

## 3. The stationary infinite complement is covered

Matching the actual first-front census alone would not exclude a numerical source whose conservative zero cutoff sends a small premature signal to an omitted receiver. The independent complement check closes that issue explicitly.

For every environmental incoming source, exact rational comparison verifies

$$
0\le\left(\sqrt{m_p}-\frac{11}{8}\right)-c_p\le\frac1{32}.
$$

The lower inequality is checked by the main audit; the upper inequality by the complement audit. Both targets have numerical zero cutoff at least one. Every position, velocity and acceleration node through each closed cutoff is exactly zero, so the shared-node quintic is identically zero there.

The accepted outward continuous polynomial norm receipt bounds the full incoming comparison speed through $5$ by $0.16048775343823143<1$. The audit authenticates that receipt and verifies its 1,350-label ordering. It does not substitute the numerical producer's diagnostic speed summary for this bound.

Consider a hypothetical first numerical reception at an otherwise stationary receiver $r$. The source-time residual is monotone on the frozen incoming prefix. For an environmental source $p$, a received emission after $c_p$ therefore requires $|r-p|<H-c_p$. Choosing an original center $e$ attaining $m_p$ gives

$$
|r-e|\le|r-p|+|p-e|
<H-c_p+\sqrt{m_p}
\le H+\frac{11}{8}+\frac1{32}
=\frac{221}{32}.
$$

But

$$
\left(\frac{221}{32}\right)^2=\frac{48841}{1024}
<48,\qquad
48-\frac{48841}{1024}=\frac{311}{1024}>0.
$$

Thus this receiver already belongs to the enumerated set with first-excitation squared distance at most 47. The unit-neighbor exceptions also lie in that set. For a target source, the cutoff at one gives the smaller radius $H-1=9/2$. The original supplied pulses cannot reach an omitted receiver by $H$ because their first omitted shell has squared distance at least 48. Finally, the stationary block field vanishes at each anchor. There is consequently no first numerical departure outside the 1,502-label set on this reference horizon. The infinite complement is stationary for a demonstrated causal reason; its field is still included in the retained stationary sum.

## 4. The original negative-time pulses

Generated histories are zero at negative source times. The two original supplied pulse histories are retained separately by the frozen `old_rows` kernel. A pulse is supported on $[-11/8,-9/8]$ and has displacement bounded by $\epsilon=1/314928$. For an anchor distance $d=|r-e|$, a possible reception during $[5,H]$ requires

$$
5+\frac98-B-\epsilon\le d\le H+\frac{11}{8}+B+\epsilon.
$$

Exact squared-distance comparison retains 1,278 possible old-pulse rows. Their squared anchor distances are

$$
34,35,36,37,38,40,41,42,43,44,45,46,48,49,50,51,52.
$$

The numerical kernel evaluates all 3,002 nonself receiver/center pairs, including these possible rows and pairs whose contribution is zero. The original centers' own negative-time pulses cannot hit them in this interval: the elapsed time is at least $5+9/8$, while their own-past range is at most $B+\epsilon$. No required old-pulse correction is removed by the generated selector. The largest prospective receiver degree, counting the generated union and possible old-pulse rows together, is 223.

The split between negative-time pulses and positive-time generated histories is an exact changed-history bookkeeping identity on the admitted chart. Both histories meet the same anchor at source time zero. The sign of the causal residual at zero determines which half-history contains the nontrivial root; the other separately evaluated correction vanishes. The stationary row remains in the background field throughout.

## 5. Archive identity and evidence

The independent audit verifies the following against the frozen arrays:

- All 1,350 incoming labels occur in the same order, with no duplicate identity.
- Every incoming position, velocity and acceleration at $t=5$ is bitwise identical to the old archive endpoint.
- The 152 newly represented labels have exactly zero initial jets.
- Every node of the stopped numerical proposal is preserved bitwise in the auxiliary reference, including its initial acceleration and all shared joins.
- All 513 reference times are exactly $5+k/1024$, and every declared numerical zero prefix is zero through its closed endpoint.

The new instrument `.tmp/mec-008-next-event/history/audit.py` imports neither the evolution proposal nor its selector. Before the target run, it passed controls for the empty environmental census, the two disjoint twelve-label first shells, the unit-neighbor exception, radical equality and exclusion, strict range boundaries, old-pulse admission and binary identity including signed zero. Its watched target completed in 7.610 seconds internally; the supervisor reports a completed process group.

The companion `complement.py` first passed known onset-slack and excluded-shell comparisons, then authenticated the accepted outward norm receipt and proved the numerical complement exclusion. Evidence is retained under `.local-data/master-equation-closure/next-event/history/`: `target.json` gives every receiver's actual, numerical and old-pulse source lists; `census.npz` stores the complete ordered edge arrays; `complement-target.json` records the strict outside-shell margin. Retained instrument copies preserve the exact bytes; reproduction uses the original scratch paths because path resolution is relative to those locations.

| Frozen input | SHA-256 |
| --- | --- |
| Incoming population archive | `b8c445020bbfe88dc3cd13830841050f7d056a81945692df0755e127866ca988` |
| Stopped proposal | `25d3d3b33ae834ce30ec29366060e32b180a56f37b05f06c103363498b5de9b1` |
| Complete auxiliary reference | `97aa2156bae5557dd19dc7072bc973e1e2e6d33d4b60da3584fbb730172f13ac` |
| Accepted outward prefix norms | `f15e7a001aa0e003838cbd8a7f988673c36008d9bc70c2b11e01d2b75c121e5f` |

Reproduce each instrument's `known` mode before its `target` mode with the shared venv. No earlier archive, numerical instrument, independent reference, supplied history or accepted analysis was altered. Falsifiers are an omitted first-front identity, missing ordered row, invalid zero cutoff, changed endpoint jet, query beyond the closed source prefix, failed outside-shell margin, omitted old-pulse reception, or failure of the conditional receiver/source/root bounds. A failure of those prospective dynamical bounds would limit the continuation theorem without invalidating the narrower exact archive comparisons.
