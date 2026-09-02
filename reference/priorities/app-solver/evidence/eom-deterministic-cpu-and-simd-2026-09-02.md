# EOM Deterministic CPU And SIMD Disposition — 2026-09-02

## Scope And Claim Boundary

This packet resolves `EOM-005` for the accepted bounded-population EOM solver path. It measures the same two-path, post-transit, long-horizon fixture used by the bounded-population acceptance packet, with normalized $c_f=1$, through one and four bounded CPU workers and through matched vector-enabled and vector-disabled release builds. It establishes local wall-time and CPU-cost behavior, byte-identical deterministic replay, and compiler-confirmed auto-vectorization on an Apple M3 host. It does not establish million-path throughput, GPU or distributed execution, a physical branch, or a general speedup on other machines or workloads.

Claim grades are explicit: commands and timings below are **measured**; source-line and acceptance-contract consequences are **derived** from the named implementation; the explanation of the flat SIMD result is **inferred** from a one-second sampling profile and is not a hardware-counter attribution.

## Reproducible Builds

Host: Apple arm64, macOS `26.6.2`, Apple clang `21.0.0 (clang-2100.1.1.101)`.

The vector build used `-O3 -DNDEBUG` with compiler-default auto-vectorization and vectorization remarks. The scalar control used the same optimization level plus `-fno-vectorize -fno-slp-vectorize`. Both fixture binaries were rebuilt after the benchmark-only mode addition. Their SHA-256 identities were:

| Variant | SHA-256 |
| --- | --- |
| Vector-enabled | `f6b44a5f3df681398e99ae90f3aba8ddc35db7e5a048b178efcf352ed491730e` |
| Vector-disabled | `58ef3b0e7a63143c1d3f2c755577cacefb615f431394baaafe58b715998e6492` |

The matched build commands were:

```bash
cmake -S src/eom -B .tmp/eom005-vector -DCMAKE_BUILD_TYPE=Release '-DCMAKE_CXX_FLAGS_RELEASE=-O3 -DNDEBUG -Rpass=loop-vectorize -Rpass-missed=loop-vectorize -Rpass-analysis=loop-vectorize'
cmake -S src/eom -B .tmp/eom005-scalar -DCMAKE_BUILD_TYPE=Release '-DCMAKE_CXX_FLAGS_RELEASE=-O3 -DNDEBUG -fno-vectorize -fno-slp-vectorize'
cmake --build .tmp/eom005-vector --target eom_native_evolution_fixture_cli --parallel 2
cmake --build .tmp/eom005-scalar --target eom_native_evolution_fixture_cli --parallel 2
```

## Bounded-Thread Measurement

The fixture exposes `bounded-population-fine-thread-1` and `bounded-population-fine-thread-4`. Both execute the same `0.02` step request from $T=5$ through $T=6.2$ and use the same run identity; only `thread_count` differs. One warmup per variant preceded eleven alternating `/usr/bin/time -p` trials.

| Workers | Real samples (s) | Median real (s) | Median user + system (s) | Wall speedup over one worker |
| ---: | --- | ---: | ---: | ---: |
| 1 | `0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37, 0.37` | 0.37 | 0.36 | 1.000x |
| 4 | `0.29, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.29, 0.28, 0.28` | 0.28 | 0.54 | 1.321x |

Measured disposition: four bounded workers reduce median wall time by 24.3% while increasing median process CPU consumption by 50%. The complete one-worker and four-worker JSON records are byte-identical: each is 90,368 bytes with SHA-256 `fd4e3c1977ddefc8293077fec4390be136d03cee84f391fa498c325c9b7c2ff9`.

This is a wall-latency win, not a resource-efficiency win. The bounded four-worker route remains useful when accepted-time latency is the objective; single-worker replay remains the lower-CPU deterministic reference.

## SIMD Measurement And Compiler Evidence

The benchmark command was:

```bash
node scripts/eom/benchmark-native-simd.mjs --vector-binary .tmp/eom005-vector/eom_native_evolution_fixture_cli --scalar-binary .tmp/eom005-scalar/eom_native_evolution_fixture_cli --mode bounded-population-long-horizon --warmups 1 --repetitions 11 --timeout-ms 600000
```

| Build | Median real (s) | Range (s) | Median user (s) | Median system (s) | Scalar-to-vector speedup |
| --- | ---: | ---: | ---: | ---: | ---: |
| Vector-enabled | 1.07 | 1.06–1.07 | 1.55 | 0.11 | 1.000x |
| Vector-disabled | 1.07 | 1.06–1.07 | 1.56 | 0.11 | 1.000x |

All warmup and measured outputs were byte-identical: 339,882 bytes with SHA-256 `6dac1e6dc41e48d35504ac3f08ca32594882c3c59634981f200cbf13d315e620`. The compiler reported width-two vectorization in `JointEndpointCorrector.cpp` at the row normalization and elimination loops and in `CoupledEvolution.cpp` at the retained joint-history coefficient population and symbol-condensation loops.

The representative end-to-end measurement shows no SIMD wall-time gain. A one-second `sample` profile placed `nextafter`, interval arithmetic, finite checks, multiprecision integer work, and worker waiting above the compiler-vectorized loops in top-of-stack counts. This supports the inference that certified interval operations and synchronization dominate this small workload, but it does not quantify exclusive function cost or prove a hardware bottleneck.

## Correctness And Failure Controls

Deterministic agreement is protected at three levels:

1. the benchmark-only one-worker and four-worker modes emit byte-identical complete accepted-history and step records;
2. `test_bounded_population_long_horizon_packet_crosses_transit_and_refines` compares the one-worker and four-worker histories and step records exactly;
3. the same test independently evaluates the fine endpoint with the separately authored arbitrary-precision Phase 4 oracle and requires the oracle endpoint to lie inside each EOM interval.

`test_cooperative_cancellation_stops_only_at_resumable_boundary` preserves accepted-boundary cancellation, while the existing exact-pair and receiver-reduction controls preserve canonical receiver/source order and the fixed pairwise interval tree independently of worker completion order.

## Engineering Disposition

`EOM-005` is resolved as a mixed outcome:

- retain bounded CPU multithreading because it produces a measured 1.321x wall-latency gain with exact single-worker replay on the representative fine run;
- retain compiler-default auto-vectorization because it preserves exact output and requires no separate execution path;
- do not claim or promote a representative SIMD speedup, because the matched median is exactly 1.000x;
- do not introduce manual SIMD, structure-of-arrays conversion, or cache-layout specialization for this bounded workload, because the sample did not identify those loops as the limiting cost and the required measured gain is absent.

The no-specialization decision avoids adding a second numerical implementation with no demonstrated throughput value. It does not waive SIMD or cache-locality work for later large-population objects: `EOM-008` and `EOM-009` must remeasure their own representative kernels and may reopen layout or explicit-vector work when those workloads justify it.

## Falsifiers

Reject the bounded-thread result if a rebuilt matched run loses byte identity, independent-oracle containment, accepted-horizon equality, or at least a 10% median wall improvement outside trial noise. Reopen the SIMD/cache disposition if a later representative EOM kernel shows at least a 10% median accepted-time throughput gain with unchanged discrete decisions, independent containment, failure behavior, and no material regression on the designated interactive control. Any worker-count-dependent root, branch, publication, cancellation, or checkpoint decision invalidates this packet immediately.

