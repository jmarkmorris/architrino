# EOM Recursive Block-Exclusion Moving-Population Evidence

## Evidence Identity

- Evidence id: `eom_recursive_block_exclusion_moving_population_apple_m3_2026_07_16`
- Date: 2026-07-16
- Host: Apple M3-class `arm64` host, Darwin 25.5.0
- Implementation schema: `eom_certified_recursive_causal_index/v0`
- Benchmark schema: `eom_recursive_block_benchmark/v0`
- Authority: bounded CPU correctness and staged moving-population performance
- Production authority: none
- Million-path authority: none
- Active aggregation authority: none

This record extends the first bounded recursive certificate to accepted
nonstationary retained histories. It does not change the certificate, interval
rule, pair-accounting rule, exact-fallback rule, or prohibited-approximation
boundary.

## Build Provenance

The evidence build used:

```text
cmake -S src/eom -B /tmp/eom-moving-recursive-evidence-build-20260716-v2 -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/eom-moving-recursive-evidence-build-20260716-v2 --parallel 4
```

The source, library, and binary times show that the measured artifacts were
rebuilt after every executable source in scope:

| Artifact | Local modification time | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `src/eom/src/BlockExclusion.cpp` | 2026-07-13 21:44:19 -0400 | 3,754 | `5297bab0ef295542a8180aabcdea9176b7f5a1e0e026c7d648973d1070d19262` |
| `src/eom/src/CertifiedTraversal.cpp` | 2026-07-16 04:33:45 -0400 | 22,115 | `9e080f8875aa2e30abec21c21cee54db7b5701d500b9038c8a545022d68abe8b` |
| `src/eom/native/eom_recursive_block_benchmark_cli.cpp` | 2026-07-16 05:04:48 -0400 | 14,334 | `2e92c49cb25d120d0f67310a86dea4aac53fbbcb013369f9d4005e160b5336ac` |
| `libeom_native.a` | 2026-07-16 05:05:11 -0400 | 1,230,104 | `7391612278937fc53bd05a54bcf65cb57cd5ace2a5a9e27183b5716ac589a99b` |
| `eom_recursive_block_benchmark_cli` | 2026-07-16 05:05:14 -0400 | 424,944 | `3fa2c7e7ba22cfab4e3e3eb4d236fddfcf73475c7aa65ba969f9b1becef180b5` |

## Unchanged Exclusion Implication And Accounting

**Derived.** For every covered receiver-source-time point, accepted retained-
history hulls contain the receiver and source positions. Outward subtraction,
norm, time subtraction, multiplication by positive field speed, and final
subtraction therefore contain the causal residual

$$
g_{ij}(T,S)=\|\mathbf X_i(T)-\mathbf X_j(S)\|-c_f(T-S)
$$

inside the computed block interval $\mathcal G_{RB}(I)$. Thus
$0\notin\mathcal G_{RB}(I)$ implies that no covered point can satisfy
$g_{ij}(T,S)=0$. Linear motion changes the history hulls but not this
implication.

**Derived.** The fixed receiver, source, and emission split order produces
disjoint child blocks. Relationship collapse promotes a pair's complete
retained interval to exact certification if any emission cell survives.
Acceptance still requires

$$
P_{\mathrm{logical}}
=P_{\mathrm{excluded}}+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}+P_{\mathrm{unresolved}},
\qquad P_{\mathrm{unresolved}}=0.
$$

No distance cutoff, residual sample, neighbor rule, density assumption,
active-force aggregation, or multipole enters the decision.

## Moving Fixtures And Independent Validation

Every benchmark receiver and source has a distinct continuous linear retained
history over $[0,2]$. Linear histories are exact degree-one members of the
piecewise-cubic representation. Receiver velocities vary from `0.02` through
`0.038`. Sparse far-source velocities vary from `-0.01` through `0.006`, and
the active source band spans velocities from `0.005` through `0.015`. The dense
source velocities vary from `-0.014` through `0.006`. Every path therefore has
nonzero velocity; this is not a translated stationary fixture.

The independently authored decimal interval and exact-pair oracle files were
not modified in this change.

**Measured.** The focused validation matrix passed:

| Validation | Result |
| --- | --- |
| Moving recursive benchmark controls | 6/6 passed |
| EOM solver moving-history/root layer with decimal oracle | 17/17 passed |
| Native CTest fixtures | 3/3 passed |

**Measured.** The existing nested moving fixture expands every excluded node
to its covered ordered pairs and emission interval. The independent 90-digit
decimal oracle certified every such row complete with zero roots. At least one
pair promoted to exact fallback contained an independently detected active
root. The retained regressions include coincident geometry and moving same-
history self-pairs.

**Measured.** Repeated one-thread and permitted four-thread runs produced
identical relationship counts and membership fingerprints. Single-thread and
four-thread exact-fallback fixture packets were byte-identical. The staged
moving sparse fingerprints were `81ae816d7a4df483` at 128,
`3e74297155a4c50f` at 512, `2082072291e5e593` at 2,048, and
`a2875f4033487993` at 10,000 paths.

## Performance Method

The sparse moving population has a small active source band and a far moving
root-free population. Its root node is inconclusive, so traversal must recurse
before it can separate excluded blocks from exact fallback. The dense moving
population remains inconclusive and routes every admitted relationship to
exact certification.

The complete route times traversal plus complete exact-pair certification of
every fallback relationship. Matched exhaustive controls use the same
histories, reception time, emission interval, root policy, and one native
thread. Repeated rows report the median of three independent processes and the
maximum observed resident memory. The 10,000-path sparse stage was run once
under a declared 90-second and 2 GiB ceiling. The exhaustive and dense controls
use a separate one-million-exact-pair preflight ceiling.

### Complete Moving Sparse Ladder

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Exclusion and exact-search reduction | Complete wall seconds | Peak resident bytes | Seconds per logical pair |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 128 | 16,384 | 157 | 15,360 | 1,024 | 93.7500% | 0.032762 median | 3,964,928 | $1.99963\times10^{-6}$ |
| 512 | 262,144 | 637 | 258,048 | 4,096 | 98.4375% | 0.153897 median | 9,519,104 | $5.87069\times10^{-7}$ |
| 2,048 | 4,194,304 | 5,707 | 4,145,152 | 49,152 | 98.828125% | 2.143860 median | 78,643,200 | $5.11136\times10^{-7}$ |
| 10,000 | 100,000,000 | 136,959 | 98,960,000 | 1,040,000 | 98.9600% | 55.471141 observed | 1,258,553,344 | $5.54711\times10^{-7}$ |

Raw complete-path wall seconds were:

- $N=128$: `0.031952375`, `0.032761959`, `0.051796334`;
- $N=512$: `0.155129833`, `0.153896625`, `0.149932916`;
- $N=2,048$: `2.340006917`, `2.143860333`, `1.861734791`;
- $N=10,000$: `55.471140541`.

The 10,000-path run emitted observed heartbeats at 10.409, 20.806, 31.179,
41.476, and 51.879 seconds. It completed at 55.471 seconds with 1.172 GiB peak resident
memory, below both declared ceilings.

### Matched Exhaustive Moving Controls

| $N$ | Exhaustive wall seconds | Exhaustive peak resident bytes | Recursive wall seconds | Measured speedup |
| ---: | ---: | ---: | ---: | ---: |
| 128 | 0.079946 median | 22,511,616 | 0.032762 | 2.440x |
| 512 | 1.117054 median | 324,943,872 | 0.153897 | 7.258x |

Raw exhaustive wall seconds were:

- $N=128$: `0.079614709`, `0.079945958`, `0.080612500`;
- $N=512$: `1.117053958`, `1.069680917`, `1.120353917`.

**Measured.** Every matched repeat of the complete moving sparse route was
faster than every exhaustive repeat at the same population. This is a wall-
time result after paying the full exact-fallback cost, not an inference from
block counts.

Exhaustive $N=2{,}048$ exceeds the declared one-million-pair ceiling. It
returned `resource_envelope_exceeded` before allocating exact requests and
accounted all 4,194,304 relationships as unresolved.

### Dense Moving Noncompressible Control

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Complete wall seconds | Peak resident bytes | Result |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 128 | 16,384 | 1,535 | 0 | 16,384 | 0.687831 median | 26,263,552 | complete; zero reduction |
| 512 | 262,144 | 24,575 | 0 | 262,144 | 19.895161 median | 381,976,576 | complete; zero reduction |
| 2,048 | 4,194,304 | 0 | 0 | 0 | 0 preflight | 1,540,096 | `resource_envelope_exceeded`; all unresolved |

Raw dense complete-path wall seconds were:

- $N=128$: `0.866251750`, `0.687830792`, `0.669117250`;
- $N=512$: `13.118938833`, `21.505187583`, `19.895160541`.

**Measured.** The dense moving fixture provides no exclusion and no exact-
search reduction. The ladder stopped at 2,048 paths and did not launch a later
dense stage. This is the required fail-closed noncompressible result.

## Claim Grades And Limits

- **Derived:** the interval implication, accepted-history gate, deterministic
  subdivision, complete-interval promotion, and disjoint accounting are
  unchanged and apply to the linear moving histories.
- **Measured:** the stated tests, oracle results, deterministic fingerprints,
  accounting, compression, wall times, memory, heartbeats, sparse speedups,
  and dense rejection come from the executed instruments in this record.
- **Inferred:** similarly clustered moving populations may retain useful
  compression. This is not a worst-case bound or a claim about an arbitrary
  evolved physical population.
- **Guessed:** no guessed conclusion is used for acceptance or performance.

This record does not establish accelerating-history performance, accepted
10,000-path EOM evolution, million-path capability, GPU or distributed
execution, active-force aggregation, or a general subquadratic complexity
bound.

## Explicit Falsifiers

The correctness conclusion is overturned if the independent oracle finds a
root inside any excluded moving block, any ordered pair is missing or counted
twice, an accepted result has nonzero unresolved membership, an unaccepted
history contributes to an authoritative bound, exact fallback searches less
than the complete interval, or a permitted schedule changes membership bytes.

The performance conclusion is overturned if a repeated matched one-thread
moving sparse control makes the complete recursive route no faster than
exhaustive exact certification at 128 or 512 paths. A 10,000-path repeat above
90 seconds or 2 GiB overturns the stated final-stage resource result. No
positive performance conclusion is made for the dense control.
