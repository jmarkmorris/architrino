# Continuous polynomial candidates for the later-turn proof

## Purpose and claim boundary

The [candidate constructor](smooth-two-particle-later-approximant.py) supplies continuous histories for an independent residual proof of the later turns. It represents 76 environmental source prefixes on $0\le s\le33/32$ and six later receiver paths on $0\le t\le2$, at $g=16$ and $c_f=1$. The receivers are the two targets, their two outward axial neighbors, and their two upward neighbors. The right target is receiver index 1.

Each candidate is a piecewise quintic polynomial defined **exactly** by dyadic rational endpoint positions, velocities and accelerations. A dyadic rational is an integer divided by a power of two. Every finite binary64 floating-point number has that exact interpretation. Once exported, these stored numbers define the candidate polynomial itself; they are not claimed to enclose the true solution. Its residual against the unchanged Master Equation must be enclosed independently before any true-history conclusion follows.

The constructor reuses the frozen [nonlinear comparison](smooth-two-particle-later-nonlinear.py) to propose its nodes. That numerical calculation omits the infinite stationary reference term. This omission is not adopted as a new physical law. The independent residual and propagation argument must include the original stationary field, either directly or through its accepted bounds, and must include the differences between actual and candidate source histories. No production EOM solver or canonical acceleration rule is modified.

## 1. Exact polynomial represented by the data

The common grid has $h=1/1024$. Cell $k$ is the closed interval $[kh,(k+1)h]$, with local coordinate $\theta=(t-kh)/h\in[0,1]$. For any one coordinate of any path, let the endpoint data be $(y_0,v_0,a_0)$ and $(y_1,v_1,a_1)$. Define

$$
\begin{aligned}
d&=y_1-y_0-hv_0-\tfrac12h^2a_0,\\
e&=h(v_1-v_0)-h^2a_0,\\
f&=h^2(a_1-a_0).
\end{aligned}
$$

The candidate on that cell is $P(\theta)=\sum_{j=0}^5c_j\theta^j$, with

$$
\begin{aligned}
c_0&=y_0,&c_1&=hv_0,&c_2&=\tfrac12h^2a_0,\\
c_3&=10d-4e+\tfrac12f,&c_4&=-15d+7e-f,&c_5&=6d-3e+\tfrac12f.
\end{aligned}
$$

All these operations define rational numbers exactly. Physical-time derivatives are $h^{-1}P'(\theta)$ and $h^{-2}P''(\theta)$. Substitution at $\theta=0,1$ recovers the six supplied endpoint data identically. Adjacent cells use the same single stored node, so position, velocity and acceleration agree at every join. The resulting candidate is $C^2$: it and its first two derivatives are continuous. Third derivatives need not agree across cells and must not be silently treated as continuous by a residual checker.

There is no authoritative rounded coefficient array. A checker should decode a stored binary64 value using an exact bit-to-rational conversion, such as Python's `float.as_integer_ratio()`, and construct the coefficients in rational or outward-rounded arithmetic. Converting the short printed decimal approximation to a rational would generally define a different polynomial. The constructor uses higher-precision floating evaluation only for its numerical interpolation and point diagnostics; those evaluations do not replace the exact definition above.

## 2. Data schema and domains

The manifest schema is `mec-008-c2-quintic-dyadic-nodes/v1`. The retained data are:

- `.local-data/master-equation-closure/later-certification/approx/approximant-h1024.npz`;
- `.local-data/master-equation-closure/later-certification/approx/approximant-h1024.json`.

The manifest gives the array-file digest, producer and frozen-input digests, exact grid, shape convention, known-control receipt, and diagnostics. The NPZ archive contains:

| Array | Shape | Meaning |
| --- | --- | --- |
| `source_points` | $(76,3)$ | Integer lattice labels of environmental emitters |
| `receivers` | $(6,3)$ | Integer labels in the order stated below |
| `source_y`, `source_v`, `source_a` | $(1057,76,3)$ each | Source position displacement, velocity and acceleration nodes |
| `receiver_y`, `receiver_v`, `receiver_a` | $(2049,6,3)$ each | Later receiver displacement, velocity and acceleration nodes |

The array axes are time node, path index, and spatial coordinate $(x,y,z)$. Positions are displacements from the integer lattice label; no subtraction of nearby unit coordinates is required. Source node $k$ has exact time $k/1024$ for $0\le k\le1056$. Receiver node $k$ has exact time $k/1024$ for $0\le k\le2048$. All six floating nodal arrays are binary64. Lattice-label arrays are integers.

The receiver order is

$$
(0,0,0),\ (1,0,0),\ (-1,0,0),\ (2,0,0),\ (0,0,1),\ (1,0,1).
$$

For a source emission time $s\le0$, the generated environmental candidate is exactly zero. No source extrapolation beyond $33/32$ or receiver extrapolation beyond 2 is authorized. At an interior join, either adjacent polynomial supplies the same position, velocity and acceleration in exact arithmetic. Enclosures spanning joins must cover each intersected piece; higher derivatives may jump there.

## 3. Exact stationary prefixes

The generated source histories begin at rest. To retain exact causal inactivity in the polynomial representation, the constructor sets all source nodal positions, velocities and accelerations to zero through the following conservative cuts:

| Smallest exciting old-source squared anchor distance | Exact zero through |
| --- | --- |
| 2 | $1/32$ |
| 3 | $11/32$ |
| 4 | $39/64$ |
| 5 | $27/32$ |

The smallest exciting distance is taken over the two supplied targets while excluding distance one: that old pulse has already completed its reception before release. Each listed cut precedes the corresponding first possible old-pulse onset. Each cut lies exactly on the export grid. Since all six endpoint values vanish on every earlier cell, those entire polynomial pieces vanish identically. The first and second derivatives also join zero exactly at the cut.

Both later target candidates are set to exact zero through $t=1$, which precedes their first generated return. The other four receiver histories retain their earlier environmental motion. The manifest lists `source_exact_zero_through` in source-path order and `receiver_exact_zero_through` as `['1','1','0','0','0','0']`. These prefixes support explicit inactive-channel arguments; a small numerical value alone would not establish exact inactivity.

## 4. How the candidate nodes were constructed

The imported comparison source is pinned at SHA-256 `814910e23345225f6129d989c1d0af411040082481fd0d3c321bed788a5da2c3`. Its existing known-control receipt is checked before import, and its bytes are checked again after construction. The earlier scripts and outputs are not edited.

First, the 76 source prefixes are numerically integrated using only the prescribed old-source rows. Their positions and velocities are sampled on the dyadic export grid, and their acceleration nodes are evaluated from those same changed-history rows. The complete source candidates are then available to the receiver calculation. The six receiver paths use the original old rows plus their generated environmental rows, with moving causal times found numerically. No later receiver state is fed backward into an earlier source prefix. This is permitted by the separately established source-time domain; that causal dependency result is an input to the construction, not a conclusion obtained from integration success.

Both stages use DOP853 with maximum step $1/512$, relative tolerance $3\times10^{-13}$ and absolute tolerance $10^{-19}$. These settings select candidate data; their acceptance flags do not certify the Master Equation. The run used 8,696 source evaluations and 15,635 receiver evaluations. The largest measured floating causal residual was $2.23\times10^{-16}$ and the largest sampled emission time was about 1.000012613, below $33/32$. These are diagnostics; the independent checker must establish its own complete-root enclosure.

## 5. Known controls and measured diagnostics

Known controls ran before the first target construction. Using exact rational arithmetic, they verified all six endpoint conditions for arbitrary rational nodal values, exact $C^2$ matching of two adjoining cells, recovery of a known degree-five polynomial, and the binary64-to-dyadic interpretation. The constructor additionally checked 48 deterministically selected target polynomial pieces by exact endpoint substitution. The universal coefficient identity and shared-node storage establish the join rule for all pieces; the 48 checks are implementation samples rather than a claim to have separately enumerated every join.

The $h=1/1024$ construction took **11.729 seconds**, including the integrations, sampling, exact endpoint spot checks and compressed export. Including point-defect diagnostics, total wall time was **15.799 seconds**, measured by `time.perf_counter` in this constructor. The first pilot therefore stayed below the assigned 60-second bound.

The following values are floating estimates of conservative polynomial coefficient-sum bounds. Their finite precision is not outward-enclosed, so they are candidates for independent verification, not accepted bounds on the true histories. The receiver column includes all six receivers; its largest position comes from an outward neighbor and must not be used as the target-only tube radius.

| Derivative order | Source candidate norm estimate | All-six-receiver candidate norm estimate |
| --- | ---: | ---: |
| 0: displacement | $1.152737\times10^{-6}$ | $1.267086\times10^{-5}$ |
| 1: velocity | $1.884995\times10^{-5}$ | $4.698808\times10^{-5}$ |
| 2: acceleration | $6.920518\times10^{-4}$ | $8.885042\times10^{-4}$ |
| 3: one-sided jerk on a cell | $2.438315\times10^{-2}$ | $3.122986\times10^{-2}$ |

For these estimates the absolute values of the appropriate differentiated power coefficients are summed on $0\le\theta\le1$, then combined into a Euclidean norm. An independent implementation can make the same calculation with exact rational coefficients and outward rounding.

The constructor also evaluated the polynomial acceleration minus the omitted-background equation at $\theta=1/4,1/2,3/4$ of every cell. The largest measured Euclidean source defect was $6.67433\times10^{-11}$, near the first $\sqrt3$ old-pulse onset at $s=0.35693359375$. The largest defect among all six receivers was $1.48619\times10^{-11}$. These are **point samples**; they do not bound the defect between samples, the stationary field, root enclosure error, or accumulated trajectory error. They are supplied only to help the independent certifier choose a useful grid and locate difficult cells.

## 6. Reproduction and handoff

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-later-approximant.py target --grid 1024
```

The candidate archive SHA-256 is `1213e65680c1d6753fd74b955013a32582b487593bad8da8dc711924fcc6de08`; the producer SHA-256 is `56b0b7c803b75a5d246fbf145143349090429f230ccb21d0b747ac22b4249c90`. The known-control receipt is bound to that producer hash. These identities name the data passed to the independent residual checker; they establish provenance, not mathematical correctness.

The next proof step is independent enclosure of the source and right-target residuals over every required cell, followed by propagation against the unchanged infinite-lattice equation. Failure to enclose a root, nonzero data inside an asserted stationary prefix, a join mismatch, an excessive continuous residual, or a source time outside the supplied prefix would invalidate the corresponding use of this candidate. Such a failure requires refinement or correction of the candidate or proof; numerical success cannot override it.
