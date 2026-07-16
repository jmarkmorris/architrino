# EOM Recursive Block-Exclusion Accelerating-Population Evidence

## Evidence Identity

- Evidence id: `eom_recursive_block_exclusion_accelerating_population_apple_m3_2026_07_16`
- Date: 2026-07-16
- Host: Apple M3-class `arm64` host, Darwin 25.5.0
- Implementation schema: `eom_certified_recursive_causal_index/v0`
- Benchmark schema: `eom_recursive_block_benchmark/v0`
- Authority: bounded CPU correctness and staged accelerating-history performance
- Production authority: none
- Million-path authority: none
- Active aggregation authority: none

This record validates the unchanged recursive certificate on accepted joined
accelerating piecewise-cubic histories. It changes no traversal rule, interval
rule, relationship accounting, exact-fallback policy, or approximation
boundary.

## Build Provenance

The evidence build used:

```text
cmake -S src/eom -B /tmp/eom-accelerating-recursive-evidence-build-20260716 -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/eom-accelerating-recursive-evidence-build-20260716 --parallel 4
```

| Artifact | Local modification time | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `src/eom/src/BlockExclusion.cpp` | 2026-07-13 21:44:19 -0400 | 3,754 | `5297bab0ef295542a8180aabcdea9176b7f5a1e0e026c7d648973d1070d19262` |
| `src/eom/src/CertifiedTraversal.cpp` | 2026-07-16 04:33:45 -0400 | 22,115 | `9e080f8875aa2e30abec21c21cee54db7b5701d500b9038c8a545022d68abe8b` |
| `src/eom/native/eom_recursive_block_benchmark_cli.cpp` | 2026-07-16 05:39:38 -0400 | 18,869 | `038a2113efc1dc13b9342a809b0a4f7bb8d4056d9335ebdcb7d1f08c928e7226` |
| `src/eom/native/eom_native_fixture_cli.cpp` | 2026-07-16 05:40:48 -0400 | 25,655 | `3fe8fa7545f9f4baf1bb41df89fa0aa88d62c0029e7699189be390f67fa9ece4` |
| `libeom_native.a` | 2026-07-16 05:42:51 -0400 | 1,230,104 | `54e2ccee420f961422c8d07387964c5b4e2661a78f310afe8c2d47e5a9c85994` |
| `eom_recursive_block_benchmark_cli` | 2026-07-16 05:42:52 -0400 | 426,016 | `9435c0de5229897d749d7df35ddb47315ddf1932f6c8fc616dd8aa441093a469` |
| `eom_native_fixture_cli` | 2026-07-16 05:42:53 -0400 | 475,832 | `50a2221c2d0b19f25e929d63f5737b859b23a2972ff95613105b55a2c758ebcc` |

The libraries and executables were built after every source in scope.

## Unchanged Certificate

**Derived.** For every covered point, accepted retained-history hulls contain
the receiver and source positions. Outward interval evaluation therefore
contains

$$
g_{ij}(T,S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)
$$

inside the computed block residual interval $\mathcal G_{RB}(I)$, including
when $I$ crosses a retained-history segment join. Consequently,
$0\notin\mathcal G_{RB}(I)$ implies that no covered pair-time point can satisfy
$g_{ij}(T,S)=0$. Acceleration and segment joins change the position hull but
not this implication.

**Derived.** Deterministic receiver, source, and emission subdivision remains
disjoint. If any emission cell survives, the complete pair interval $[0,2]$
enters exact certification. Acceptance still requires

$$
P_{\mathrm{logical}}
=P_{\mathrm{excluded}}+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}+P_{\mathrm{unresolved}},
\qquad P_{\mathrm{unresolved}}=0.
$$

No cutoff, sampled residual, neighbor rule, density assumption, aggregation,
multipole, or other approximation enters the decision.

## Accelerating Fixtures And Independent Validation

Each staged benchmark path contains two cubic segments over $[0,1]$ and
$[1,2]$. Fixed-scale integer token arithmetic defines the benchmark decimal
coefficients and constructs the second segment's position and velocity tokens
from the first segment exactly. This makes nominal position and velocity
continuous at $T=1$. Both segments have nonzero quadratic and cubic
coefficients, and the second segment changes both coefficients. The fixed
decimal tokens define the fixture itself; they are not an approximate
decision applied to another history.

The independently authored decimal interval and exact-pair oracle files were
not modified.

**Measured.** Validation passed:

| Validation | Result |
| --- | --- |
| Accelerating recursive benchmark controls | 9/9 passed |
| EOM solver history/root layer with independent decimal oracle | 18/18 passed |
| Native CTest fixtures | 3/3 passed |

**Measured.** The independent fixture has two receivers and four sources, all
with two accelerating cubic segments. Every excluded node was expanded into
its covered pairs and emission interval. The 90-digit decimal oracle certified
every expanded row complete with zero roots. One excluded far-source node
covers the complete $[0,2]$ interval and therefore crosses the join at $S=1$.

**Measured.** Every exact-fallback pair was independently searched over the
complete $[0,2]$ interval, and the decimal oracle detected active roots. The
retained suite also preserves coincident geometry and an accelerating
same-history self-pair control. Single-thread and four-thread exact packets
were byte-identical.

**Measured.** Repeated staged membership and accounting were identical. The
fingerprints were `81ae816d7a4df483` at 128, `3e74297155a4c50f` at 512,
`2082072291e5e593` at 2,048, and `a2875f4033487993` at 10,000 paths.

## Performance Method

The sparse population contains a small active accelerating source band and a
far accelerating root-free population. The dense population leaves every
relationship inconclusive. Complete-path time includes traversal and exact
certification of every fallback pair. Matched exhaustive controls use the same
histories, interval, root policy, and one native thread.

Repeated rows report the median of three independent processes and maximum
observed resident memory. The 10,000-path sparse stage was run once under the
declared 120-second and 2 GiB ceiling. Exhaustive and dense controls use a
one-million-exact-pair preflight ceiling.

### Complete Accelerating Sparse Ladder

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Exclusion and exact-search reduction | Complete wall seconds | Peak resident bytes | Seconds per logical pair |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 128 | 16,384 | 157 | 15,360 | 1,024 | 93.7500% | 0.030779 median | 4,440,064 | $1.87863\times10^{-6}$ |
| 512 | 262,144 | 637 | 258,048 | 4,096 | 98.4375% | 0.125417 median | 10,993,664 | $4.78429\times10^{-7}$ |
| 2,048 | 4,194,304 | 5,701 | 4,145,152 | 49,152 | 98.828125% | 1.869878 median | 91,144,192 | $4.45814\times10^{-7}$ |
| 10,000 | 100,000,000 | 136,953 | 98,960,000 | 1,040,000 | 98.9600% | 48.727992 observed | 1,493,417,984 | $4.87280\times10^{-7}$ |

Raw complete-path wall seconds were:

- $N=128$: `0.026671125`, `0.030779416`, `0.038473167`;
- $N=512$: `0.124891292`, `0.125417250`, `0.125954541`;
- $N=2,048$: `2.000730083`, `1.869878458`, `1.823761083`;
- $N=10,000$: `48.727991667`.

The 10,000-path run emitted observed heartbeats at 10.382, 20.776, 31.131,
and 41.504 seconds. It completed with 1.391 GiB peak resident memory, below
both declared ceilings.

### Matched Exhaustive Accelerating Controls

| $N$ | Exhaustive wall seconds | Exhaustive peak resident bytes | Recursive wall seconds | Measured speedup |
| ---: | ---: | ---: | ---: | ---: |
| 128 | 0.132976 median | 25,378,816 | 0.030779 | 4.320x |
| 512 | 1.758310 median | 368,017,408 | 0.125417 | 14.020x |

Raw exhaustive wall seconds were:

- $N=128$: `0.157597542`, `0.122624541`, `0.132976000`;
- $N=512$: `1.839174583`, `1.758309958`, `1.753429459`.

**Measured.** Every complete sparse repeat was faster than every matched
exhaustive repeat at the same population. This is an end-to-end wall-time
claim after exact fallback, not an inference from block counts.

Exhaustive $N=2{,}048$ exceeds the one-million-pair ceiling and returned
`resource_envelope_exceeded`, accounting all 4,194,304 pairs as unresolved.

### Dense Accelerating Noncompressible Control

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Complete wall seconds | Peak resident bytes | Result |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 128 | 16,384 | 1,535 | 0 | 16,384 | 0.709403 median | 29,982,720 | complete; zero reduction |
| 512 | 262,144 | 24,575 | 0 | 262,144 | 11.533815 median | 428,670,976 | complete; zero reduction |
| 2,048 | 4,194,304 | 0 | 0 | 0 | 0 preflight | 1,556,480 | `resource_envelope_exceeded`; all unresolved |

Raw dense wall seconds were:

- $N=128$: `0.724776542`, `0.708764375`, `0.709402792`;
- $N=512$: `11.434252417`, `13.012907458`, `11.533815208`.

**Measured.** The dense accelerating fixture provides no exclusion or exact-
search reduction. The ladder stopped at 2,048 paths before candidate
execution, and no later dense stage was launched.

## Claim Grades And Limits

- **Derived:** the interval implication, exact decimal join continuity,
  accepted-history gate, deterministic subdivision, complete-interval
  promotion, and disjoint accounting follow from the unchanged implementation
  and fixture construction.
- **Measured:** the tests, oracle results, deterministic records, accounting,
  wall time, memory, compression, sparse speedups, heartbeats, and dense
  rejection come from the executed instruments above.
- **Inferred:** similarly clustered accelerating histories may retain useful
  compression. This is not a worst-case complexity result or evidence for an
  arbitrary evolved physical population.
- **Guessed:** no guessed claim supports acceptance or performance.

This record does not establish general evolved-history performance, accepted
10,000-path EOM evolution, million-path capability, GPU or distributed
execution, active-force aggregation, or a general subquadratic bound.

## Explicit Falsifiers

Correctness is overturned if the independent oracle finds a root in an
excluded accelerating block, a join is discontinuous, any ordered pair is
missing or duplicated, an accepted result has nonzero unresolved membership,
an unaccepted history enters a bound, exact fallback omits either side of the
join, or a permitted schedule changes membership bytes.

Performance is overturned if a repeated matched one-thread sparse control
makes the complete recursive route no faster than exhaustive evaluation at
128 or 512 paths. A 10,000-path repeat above 120 seconds or 2 GiB overturns
the final-stage resource result. No positive performance claim is made for the
dense control.
