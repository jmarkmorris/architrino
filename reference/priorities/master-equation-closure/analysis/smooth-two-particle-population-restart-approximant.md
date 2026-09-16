# A complete affected-population polynomial at the restart time

## Construction and claim boundary

The [constructor](smooth-two-particle-population-restart-approximant.py) supplies a numerical polynomial proposal for every environmental identity potentially reached by time $13/4$, together with both original targets. The lattice, alternating polarity, supplied history, coupling $g=16$, wake speed $c_f=1$, and infinite stationary block prescription are unchanged. The numerical center omits the stationary block field; the separate full-law residual and propagated-error certificate must include it before the proposal can support an actual restart state.

A population restart needs positions and velocities of all affected identities at one common time. The earlier target construction needed only each transmitter's earlier causal history, so its environmental arrays ended before the target array. The present construction fills that gap: every represented path ends at the same time, $13/4$. It introduces no new prescribed future; the environmental suffixes are integrated from their retained state under the numerical comparison equation.

For a receiver anchored at the integer vector $n_i$, let $y_i(t)$ be its displacement in lattice-spacing units. For a source anchored at $n_j$, the causal time $s$ solves

$$
s+\lVert n_i+y_i(t)-n_j-y_j(s)\rVert=t.
$$

Writing $R_0=n_i+y_i(t)-n_j$, $R=R_0-y_j(s)$ and $K(R)=R/\lVert R\rVert^3$, the changed generated-source acceleration row is

$$
16\sigma_i\sigma_j\left[
\frac{K(R)}{1-\widehat R\cdot y'_j(s)}-K(R_0)
\right].
$$

The original supplied-pulse rows are evaluated separately with their fixed past. The omitted numerical-center term is the unchanged infinite stationary block sum at the receiving displacement, which the residual certificate must add back. Thus the displayed row is a reference subtraction inside the proof calculation, not an alternative physical law.

The construction retains the earlier 361 source histories through $89/32$. Newly required environmental identities append after that table and begin at rest. Their first old-pulse shell has squared radius 18 through 21, and their declared zero cut is an exact grid lower bound for $\sqrt m-11/8$. The partner remains at index 76. Its full path is the exact plane reflection of the previously accepted right-target polynomial through $13/4$; the right target itself is copied unchanged.

After the known controls passed, the constructor's exact integer census found 504 environmental identities and two targets, or 506 distinct identities represented. The source table contains 505 paths, including the partner, with the right target stored separately. The 144 added environmental identities have first squared shell radii 18, 19, 20 and 21, with counts 40, 24, 32 and 48. The complete label order is retained in the plan receipt. This is the constructor's measured census; the independent proof must establish its completeness for the unchanged dynamics.

Every appended environmental acceleration samples only the frozen source table through $73/32$: the 247 histories in `bridge-h13-4.npz` and that archive's right-target prefix. Thus both original targets appear among the 248 incoming identities. Generated source candidates include all distinct-label pairs with squared anchor range at most ten; the two supplied-pulse rows are handled separately. These conservative lists include inactive rows. Completeness and the exact active channel count belong to the independent causal census.

There are 28638 stored environmental generated-row candidates and 1008 old-pulse candidates. In the archive, `source_edges` has columns receiver index in the current 505-path table and transmitter index in the incoming 248-path table. `source_old_edges` uses the separately stored original target labels. The unchanged right-target `target_edges` also refers to the incoming table, preserving its accepted graph. All self rows are excluded. Each array's declared indexing table is therefore part of its interpretation.

All paths use shared position, velocity and acceleration nodes on the grid $1/1024$, ending at $13/4$. Their binary64 values represent exact dyadic data. The frozen quintic Hermite reconstruction makes every shared-node join exactly $C^2$. The constructor rejects every incoming-history query beyond $73/32$, verifies earlier node preservation and partner reflection, and records observed emission margins. These implementation checks do not replace the independent history-domain theorem.

## Controls and local evidence

Known controls precede the target run: exact unit-neighbor and first-shell examples, rational lower zero cuts, exact rational endpoint conditions, a known quintic history, zero generated past, future-query rejection, plane reflection, ordered pair selection and the zero changed row. Source-code hashes provide provenance; archived data hashes are verified. Reuse of the frozen numerical kernel is not an independent full-equation check.

The first plan attempt exposed a serialization defect in a newly added diagnostic: NumPy extended-precision scalars could not be written directly to JSON. The helper now converts report values explicitly to binary64 and additionally checks a constant $(0,3,4)$ path with exact norm five and zero derivatives, including its JSON round trip. Fresh known controls passed before the successful plan and before any target evolution. This repair changes report serialization, not the trajectory kernel.

The inherited environmental-only coefficient-sum bounds through $89/32$ are $0.00011255886523$ in position, $0.00035578971246$ in velocity and $0.00099266114751$ in acceleration. The corresponding partner-only position and velocity bounds are smaller, $0.00007607781664$ and $0.00022766690096$. These floating-point diagnostics are not outward certificates; they show that removing the two targets alone does not remove the largest environmental prefix norm.

The separately controlled, non-evolving prefix diagnostic also retains per-path and first-shell grouped bounds at five time cuts in `prefix-norms.json`, with its prior controls in `prefix-norms-known.json`. Its environmental prefix maxima are:

| Prefix end | Position diagnostic | Velocity diagnostic |
| --- | ---: | ---: |
| $73/32$ | $1.8511464814\times10^{-5}$ | $1.0045274628\times10^{-4}$ |
| $5/2$ | $4.5541217712\times10^{-5}$ | $1.9183430614\times10^{-4}$ |
| $21/8$ | $6.8271558427\times10^{-5}$ | $2.5613636018\times10^{-4}$ |
| $11/4$ | $1.0206406945\times10^{-4}$ | $3.3400828438\times10^{-4}$ |
| $89/32$ | $1.1255886523\times10^{-4}$ | $3.5578971246\times10^{-4}$ |

These summaries can guide a time-dependent source envelope. Replacing the final maximum by a smaller earlier bound in an actual proof requires the independent outward polynomial enclosure and the corresponding actual-history error allowance.

The finer `prefix-norms-dense.json` provides the same source and shell breakdown at every $1/32$ endpoint from $74/32$ through $89/32$. Its known controls ran before this diagnostic. It reads the same retained arrays and performs no trajectory integration. At every reported cut, an environmental identity supplies the largest position bound across all paths; the right target has the partner's norm by exact reflection.

Local output lives at the literal path `.local-data/master-equation-closure/population-restart/approximant/`. The `plan.json` lists the identity order, domains and zero cuts before launch. The eventual `candidate.npz` contains all node arrays and conservative graphs; `candidate.json` records domains, measured numerical bounds, preservation checks, data hashes and the prior known-control receipt. These ignored outputs are evidence inputs for the separate certificate.

## Completed numerical proposal

The watched target construction completed in 300.307 wall seconds. It made 7922 acceleration evaluations, with numerical progress emitted every five seconds. The canonical supervisor reports exit code zero and a closed process group. Its first sandboxed launch failed before spawning the target; the approved supervisor launch then ran the single construction to completion. No later trajectory search was launched.

The largest sampled generated-source emission time was $2.2503916261668055$, leaving $0.030858373833194452$ before the incoming-history endpoint $73/32$. The smallest sampled causal range was $0.9996083738331946$, the smallest sampled transmitter factor was $0.9999157854594742$, and the maximum numerical causal-root residual was $4.440892098500626\times10^{-16}$. These are numerical diagnostics over integrator evaluations and node construction, not continuous outward root enclosures.

All inherited source nodes through $89/32$, the accepted right-target nodes through $13/4$, and the exact reflected partner passed bitwise preservation checks. All 505 source paths and the separate right target have 3329 nodes, ending at $13/4$. The environmental-only and target coefficient-sum diagnostics are:

| Path family | Position | Velocity | Acceleration |
| --- | ---: | ---: | ---: |
| 504 environmental histories | $0.000416851016105$ | $0.000978173795973$ | $0.003593701115165$ |
| Either target | $0.000268169135784$ | $0.000879835774800$ | $0.004613023692424$ |

The environmental endpoint-only maxima are $0.00041685101525589397$ in position norm and $0.0009781708463543555$ in velocity norm. The manifest retains the individual path bounds and endpoint values. These floating-point diagnostics remain candidate-grade; the independently accepted actual-state bounds come from the separate certificate and error propagation.

| Frozen evidence | SHA-256 |
| --- | --- |
| New `candidate.npz` in the population-restart approximant directory | `c9dcef9578f2cc3a745dc9c258b20317d327e40c642b2aec1fcf48a371def8fb` |
| New constructor source | `94d6da643d8244237e1d63e3e6ef0e80a8c9b38b15df2a4064336635ff910d1d` |
| Incoming `bridge-h13-4.npz` | `3cb6a1aafe1b28533442a0579aa48c439285c7cc3c0c9d1baef9e977eedb2ce1` |
| Retained preceding `candidate.npz` through $89/32$ in source time | `b0964b2d7a819cbe8f208eb6bd4ecee2f6a10abe09429027f60e454b6d7e9e5b` |

The [independent adjudication](smooth-two-particle-population-restart-independent-adjudication.md) discharges the complete-population census, full stationary-field residual, incoming-error propagation and outward history/state obligations. It accepts the 506-history restart state at $13/4$ and actual full-population continuation, including 676 affected identities, through $15/4$. Its separate target argument accepts strictly positive vertical velocity through that endpoint. The polynomial archive remains a numerical comparison object; those actual-solution conclusions derive from the full-law certificate and independent review. The archive does not store all 676 trajectories through $15/4$. A missing identity, uncovered emission time, false early zero, altered inherited node, defective polynomial join, or invalid full-law residual bound would falsify the corresponding acceptance premise. The supplied history and all previous reference instruments and archives remain unchanged.

## Independent exact join verification

The separately authored instrument at the literal scratch path `.tmp/mec-008-population-restart/dahlquist/exact_population_joins.py` imports neither the constructor's interpolation code nor the residual checker's path class. It reconstructs each scalar quintic directly with arbitrary-size integer arithmetic. Each archived binary64 value is decoded as its exact integer divided by a power of two, and the grid width $h=1/1024$ is exact.

For one component of one cell, put $u=(t-t_k)/h$ and

$$
w=(y_0,hv_0,h^2a_0,y_1,hv_1,h^2a_1)^\mathsf T.
$$

The independent normalized coefficient matrix is

$$
c=Hw,
\qquad
2H=\begin{pmatrix}
2&0&0&0&0&0\\
0&2&0&0&0&0\\
0&0&1&0&0&0\\
-20&-12&-3&20&-8&1\\
30&16&3&-30&14&-2\\
-12&-6&-1&12&-6&1
\end{pmatrix},
\qquad p(u)=\sum_{j=0}^{5}c_j u^j.
$$

The endpoint operator taking $(p(0),p'(0),p''(0),p(1),p'(1),p''(1))$ satisfies $EH=I$ exactly. Dividing the first and second normalized derivatives by $h$ and $h^2$ recovers the physical nodal velocity and acceleration. Uniqueness follows because the difference of two qualifying quintics would have triple zeros at both endpoints and hence, unless identically zero, degree at least six. This establishes the declared Hermite polynomial without relying on numerical parity with the producer.

Before the target archive was read, the instrument reconstructed the closed-form quadratic $q(t)=2-3t+5t^2$ on $[3/4,7/8]$, verified its value and first two derivatives at an interior rational point, and checked the exact endpoint-matrix identity. Those controls passed and were recorded in `exact-joins-known.json`.

The target audit then passed for all 505 stored source paths over $[73/32,13/4]$. It included the preceding cell as a guard, so the entry join at $73/32$ was checked against the retained past. Across all three Cartesian components it reconstructed 1504395 scalar quintics, checked 9026370 exact endpoint equalities and 4508640 exact adjacent position, velocity and acceleration equalities. Every comparison used exact integer dyadics with no tolerance. The audit completed in 15.331 wall seconds; `exact-joins.json` binds it to the frozen archive hash. This proves polynomial join compatibility, not an acceleration residual or an actual-solution error bound.

### Prospective first-onset population through $15/4$

The same independent instrument enumerates integer environmental labels using

$$
m(n)=\min\{\lVert n-a\rVert^2:\ a\in\{0,e_1\},\ \lVert n-a\rVert^2\ge2\},
\qquad \sqrt{m(n)}-11/8\le H,
$$

with the two target labels excluded from the environmental set. At $H=13/4$ this exactly reproduces the 504 environmental labels stored in the archive. At $H=15/4$, the threshold is $m\le26$, giving 674 environmental labels and therefore 676 identities including the targets. This instrument supplies the first-onset census; it does not evolve those environmental histories to $15/4$. The independently accepted first-excitation and continuation theorem establishes their actual inclusion and shows that generated chains cannot enlarge this census.

| First squared shell | Environmental count | First squared shell | Environmental count |
| ---: | ---: | ---: | ---: |
| 2 | 24 | 14 | 48 |
| 3 | 8 | 16 | 10 |
| 4 | 12 | 17 | 56 |
| 5 | 32 | 18 | 40 |
| 6 | 24 | 19 | 24 |
| 8 | 16 | 20 | 32 |
| 9 | 34 | 21 | 48 |
| 10 | 32 | 22 | 24 |
| 11 | 24 | 24 | 24 |
| 12 | 8 | 25 | 42 |
| 13 | 32 | 26 | 80 |

The new shells 22, 24, 25 and 26 add 170 environmental labels beyond the $13/4$ census. The finite enumeration box contains every eligible integer point: squared distance at most 26 from either target requires each coordinate difference to have magnitude at most five. The count is an exact integer computation, with known shell examples checked before the target census; it does not assert that every listed path is nonconstant at the endpoint or provide a new trajectory.

### Static height illustration

The new local figure is `.local-data/master-equation-closure/population-restart/approximant/diagnostics/common-height.png`, with an SVG sibling. It preserves the earlier figure and the frozen trajectories. Its separately controlled height evaluator passed a known quadratic at interior points, cell boundaries and the final endpoint before rendering. The new image was visually inspected for legible labels and scale separation.

The final figure marks the independently accepted height boundary at $15/4$, retains the four earlier turns in an enlarged inset, and labels the 506-history restart at $13/4$ and the 676 affected identities by $15/4$. The line remains explicitly a numerical approximation, surrounded by the accepted piecewise position allowances: $1.2\times10^{-7}$ through $11/4$, $4.1\times10^{-5}$ through $13/4$, and $7.4\times10^{-5}$ thereafter. The final interval from `check/signs.json` is

$$
z(15/4)\in[0.0015120317369886366,\ 0.0016600317369886391].
$$

The accepted velocity allowance is $0.00031$; the continuous lower velocity bound on $[13/4,15/4]$ is strictly positive. Thus the next maximum has not occurred by this endpoint. This is a finite-interval statement for the supplied history, with no all-time growth or settling conclusion. The plotted endpoint label rounds outward to $1512.0$–$1660.1$ millionths. Exact rational floor and ceiling operations determine these displayed endpoints, with known positive, negative and exact-endpoint controls run before rendering. Fresh known controls preceded the accepted render; the plot's `known.json` and `plot-receipt.json` retain the controls and the authenticated curve, population and sign-receipt hashes.

## Reproduction

Run the controls first, inspect the plan, and then run the bounded constructor with the shared venv and watched supervisor:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-approximant.py known
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-approximant.py plan
node scripts/dev/owned-compute-supervisor.mjs run --owner-task "$CODEX_SESSION_ID" --deadline-seconds 1200 -- "${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/analysis/smooth-two-particle-population-restart-approximant.py target
```

A reproduction replaces the new local candidate outputs; preserve a frozen evidence copy before any independently authorized rerun. The completed run's operational receipt is the lease for `e1add4d1-8703-4c79-ad63-12a4637fd39c` under `.local-data/owned-compute/`, with its stdout and stderr under that owner's `logs/` directory. These operational records establish process completion, not scientific acceptance.
