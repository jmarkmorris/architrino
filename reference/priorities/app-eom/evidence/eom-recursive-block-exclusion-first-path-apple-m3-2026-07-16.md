# EOM Recursive Block-Exclusion First-Path Evidence

## Evidence Identity

- Evidence id: `eom_recursive_block_exclusion_first_path_apple_m3_2026_07_16`
- Date: 2026-07-16
- Host: Apple M3-class `arm64` host, Darwin 25.5.0
- Implementation schema: `eom_certified_recursive_causal_index/v0`
- Benchmark schema: `eom_recursive_block_benchmark/v0`
- Authority: bounded CPU correctness and performance evidence only
- Production authority: none
- Million-path authority: none
- Active aggregation authority: none

The implementation extends the accepted moving-history block certificate into
a deterministic recursive causal index. It is not GPU, distributed, active-
contribution aggregation, or million-path production integration.

## Build Provenance

The evidence build used:

```text
cmake -S src/eom -B /tmp/eom-recursive-evidence-build-20260716 -DCMAKE_BUILD_TYPE=Release
cmake --build /tmp/eom-recursive-evidence-build-20260716 --parallel 4
```

The source, library, and benchmark binary times prove that the measured binary
was rebuilt after the solver sources and benchmark source:

| Artifact | Local modification time | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| `src/eom/include/architrino/eom/CertifiedTraversal.hpp` | 2026-07-16 04:45:29 -0400 | 3,474 | `b634a8bf1bc6492885f715e2266b483faf35893a218e5c78dd0d7211e2222dfb` |
| `src/eom/src/CertifiedTraversal.cpp` | 2026-07-16 04:33:45 -0400 | 22,115 | `9e080f8875aa2e30abec21c21cee54db7b5701d500b9038c8a545022d68abe8b` |
| `src/eom/native/eom_recursive_block_benchmark_cli.cpp` | 2026-07-16 04:40:38 -0400 | 13,385 | `7515913dba5c4379a2ceb4f032e109ec326dc185bf8919fc6f10d12a11cf5a32` |
| `libeom_native.a` | 2026-07-16 04:45:50 -0400 | 1,230,104 | `7ea752c69aa0f75809b4891898fd60c9df8050e4a3c66d1506afcad94d94edf9` |
| `eom_recursive_block_benchmark_cli` | 2026-07-16 04:45:51 -0400 | 424,864 | `66afb894ae8aa727c638014f4eef15666770120dc557bdcdaf274ace232170dc` |

## Exclusion Implication

**Derived.** Let one covered point have receiver position
$\mathbf X_i(T)$, source position $\mathbf X_j(S)$, separation
$d=\|\mathbf X_i(T)-\mathbf X_j(S)\|$, and delay $\Delta=T-S$. The accepted
history hulls enclose both positions. Outward interval subtraction and the
outward interval norm therefore give $d\in\mathcal D_{RB}(I)$. Outward time
subtraction gives $\Delta\in\Delta_{RB}(I)$. Because $c_f>0$, interval
multiplication and subtraction give

$$
d-c_f\Delta
\in
\left[
d^-_{RB}-c_f\Delta^+_{RB},
d^+_{RB}-c_f\Delta^-_{RB}
\right]
=\mathcal G_{RB}(I).
$$

The binary64 interval implementation rounds finite endpoints outward with
`std::nextafter` in `Interval.cpp`; multiplication checks all endpoint
products, and the norm uses outward square, sum, and square-root operations.
Consequently, if $0\notin\mathcal G_{RB}(I)$, no covered pair-time point can
satisfy $d-c_f(T-S)=0$. This is an implication from enclosure membership, not
a sampled-residual decision.

**Derived.** The traversal rejects a member whose
`accepted_retained_history` field is false, requires every history to cover its
declared reception or emission interval, requires the emission interval not to
extend beyond the earliest reception, and requires exact fallback to search an
interval containing the complete traversal emission interval. The canonical
coincident endpoint remains an exact-pair responsibility; block traversal does
not silently remove it.

## Recursive Accounting Result

**Derived.** Each visited block records exactly one route: `excluded`,
`subdivide`, `exact_tile`, or `unresolved`. Receiver, source, and emission
splits are midpoint-deterministic and use a fixed depth-first child order.

**Derived.** Time-cell decisions collapse into one relationship ledger. A bit
is set when any time cell for an ordered pair reaches `exact_tile`. At the end,
row-major deterministic membership ranges classify each relationship exactly
once. If the traversal finishes, every unset pair is excluded over the whole
emission interval. If node or exact-pair resources fail, every relationship
without a complete outcome becomes unresolved. The first path fixes
$P_{\mathrm{enclosed}}=0$ and accepts traversal accounting only when

$$
P_{\mathrm{logical}}
=P_{\mathrm{excluded}}+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}+P_{\mathrm{unresolved}},
\qquad
P_{\mathrm{unresolved}}=0.
$$

## Independent And Adversarial Validation

The independently authored decimal interval and exact-pair oracle files were
not modified in this change.

**Measured.** The focused validation matrix passed:

| Validation | Result |
| --- | --- |
| Independent decimal root oracle | 23/23 passed |
| EOM solver moving-history/root layer | 17/17 passed |
| New recursive block-exclusion controls | 3/3 passed |
| EOM solver acceleration layer | 12/12 passed |
| EOM solver coupled evolution | 17/17 passed |
| Native CTest fixtures | 3/3 passed |

The fixtures include a root-free block, an active-root block, a near-zero
interval overlap, coincident geometry, same-history self-pairs, analytically
known stationary histories, and a dense noncompressible population.

**Measured.** For every pair in every `excluded` node of the mixed moving-
history fixture, the independent 90-decimal-digit oracle certified the same
emission cell complete with zero roots. No independently detected active root
occurred inside an excluded block.

**Measured.** Repeated fixture executions produced identical traversal nodes,
membership ranges, counts, and exact rows. The single-thread and four-thread
exact-fallback packets were byte-identical. Population-ladder membership
fingerprints were identical across repeats at every repeated population.
Traversal itself is single-threaded in this first path; one and four threads
are the currently permitted exact-batch schedules tested here.

## Performance Method

The sparse constant-history population contains a small contiguous active
source band and a far root-free population. The root block is deliberately
inconclusive, so the result requires recursive source, receiver, and emission
subdivision before root-free blocks separate from exact tiles. The dense
population keeps every relationship inconclusive through the declared leaf
policy.

The end-to-end sparse route times both recursive traversal and complete exact
certification of every surviving pair. The exhaustive control certifies all
$N^2$ pairs with the same histories, reception time, emission interval,
numeric policy, and one native thread. Each repeated row reports the median of
three independent processes. Peak resident memory is the maximum observed
across those repeats. The $N=10{,}000$ complete sparse stage was run once under
a declared 60-second wall and 2 GiB resident-memory ceiling.

### Complete Sparse Ladder

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Exclusion / exact-search reduction | Complete-path wall seconds | Peak resident bytes | Seconds per logical pair |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 128 | 16,384 | 157 | 15,360 | 1,024 | 93.7500% | 0.037100 median | 4,587,520 | $2.26438\times10^{-6}$ |
| 512 | 262,144 | 637 | 258,048 | 4,096 | 98.4375% | 0.140685 median | 10,010,624 | $5.36671\times10^{-7}$ |
| 2,048 | 4,194,304 | 5,709 | 4,145,152 | 49,152 | 98.828125% | 1.686308 median | 79,183,872 | $4.02047\times10^{-7}$ |
| 10,000 | 100,000,000 | 135,941 | 98,960,000 | 1,040,000 | 98.9600% | 49.444270 single observed run | 1,264,402,432 | $4.94443\times10^{-7}$ |

Raw complete-path wall seconds were:

- $N=128$: `0.040535583`, `0.037099666`, `0.032059208`;
- $N=512$: `0.140685125`, `0.139894583`, `0.147497250`;
- $N=2,048$: `1.944042458`, `1.680015375`, `1.686308292`;
- $N=10,000$: `49.444270125`.

The 10,000-path run emitted heartbeats at 10.219, 20.451, 30.872, and 41.157 wall
seconds and completed while still observed.

### Matched Exhaustive Controls

| $N$ | Exhaustive exact pairs | Exhaustive wall seconds | Exhaustive peak resident bytes | Complete recursive wall seconds | Measured complete-path speedup |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 128 | 16,384 | 0.076563 median | 23,134,208 | 0.037100 | 2.064x |
| 512 | 262,144 | 1.026653 median | 325,484,544 | 0.140685 | 7.298x |

Raw exhaustive one-thread wall seconds were:

- $N=128$: `0.092275167`, `0.076451166`, `0.076562875`;
- $N=512$: `1.026653250`, `1.021041667`, `1.084934250`.

**Measured.** The recursive complete path outperformed exhaustive exact-pair
certification on both feasible matched sparse controls after paying the full
exact-fallback cost. This conclusion is a wall-time result, not a block-count
inference.

The exhaustive $N=2{,}048$ control projects 4,194,304 exact pairs, exceeding
the declared one-million-pair exhaustive ceiling. It returned
`resource_envelope_exceeded` before allocating requests; all 4,194,304
relationships were reported unresolved.

### Dense Noncompressible Control

| $N$ | Logical pairs | Visited blocks | Excluded | Exact fallback | Wall seconds | Peak resident bytes | Result |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 128 | 16,384 | 1,535 | 0 | 16,384 | 0.008411 median | 2,818,048 | complete traversal; zero reduction |
| 512 | 262,144 | 24,575 | 0 | 262,144 | 0.135443 median | 11,567,104 | complete traversal; zero reduction |
| 2,048 | 4,194,304 | 0 | 0 | 0 | 0 preflight | 1,556,480 | `resource_envelope_exceeded`; all pairs unresolved |

**Measured.** The dense fixture provides no compression. The ladder stopped at
$N=2{,}048$ because the projected exact population exceeded the declared
one-million-pair envelope. No candidate result was fabricated, and the
$N=10{,}000$ dense stage was not launched after that stop.

## Claim Grades And Limits

- **Derived:** the outward residual implication, deterministic split policy,
  accepted-history gate, complete-interval exact promotion, and disjoint
  relationship-accounting construction follow from the implementation and
  interval operations described above.
- **Measured:** the stated oracle parity, regression results, membership
  determinism, pair counts, compression, memory, wall times, and matched sparse
  speedups come from the executed controls in this record.
- **Inferred:** the increasing exact-search reduction on this staged sparse
  family suggests useful scaling for similarly clustered root-free histories.
  It is not a worst-case complexity result and does not establish performance
  for an arbitrary physical population.
- **Guessed:** no guessed conclusion is used for acceptance or performance.

This packet does not establish million-path capability, distributed ownership,
GPU parity, active-force aggregation, a general subquadratic bound, or accepted
EOM evolution at $N=10{,}000$. It measures causal indexing plus exact root
certification on accepted stationary retained histories.

## Explicit Falsifiers

The correctness conclusion is overturned by any of the following:

- the independent decimal oracle detects an active root in an `excluded`
  membership and emission interval;
- the expanded relationship ledger contains a duplicate or missing ordered
  pair, including a self-pair;
- an accepted traversal or exact-batch result has nonzero unresolved
  membership;
- a history not marked accepted contributes to an authoritative block bound;
- exact fallback searches less than the complete declared emission interval;
- a permitted schedule changes membership, accounting, or exact-row bytes.

The performance conclusion is overturned if a repeated matched one-thread
sparse control makes the complete recursive route no faster than exhaustive
exact certification at $N=128$ or $N=512$. No performance conclusion exists
for the dense control or for a population whose exhaustive control was stopped
by the resource ceiling.
