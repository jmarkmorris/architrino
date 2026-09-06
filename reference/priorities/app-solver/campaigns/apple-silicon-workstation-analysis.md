# Borg and EOM Solver on a Larger Apple Silicon Workstation

## Scope and decision

This analysis, dated 2026-08-30, combines live-source inspection, bounded measurements on an Apple M3 MacBook Air, and current official Apple specifications. It is a performance-planning supplement to the [performance survey](performance-architecture-survey-and-baseline.md), under the existing [EOM-005, EOM-008, EOM-009 and EOM-010 boundaries](../work-queue.md). It neither ratifies new Borg budgets nor completes those implementation tasks. The [evolution contract](../contracts/evolution-contract-v1.md), [numeric contract](../contracts/precision-dynamic-range-and-certification-contract.md), and [C++ production-host decision](../../../architectural-decisions/eom-cpp-production-host.md) retain authority.

**Recommendation, inferred from the bounded evidence:** for the requested dedicated workstation and staged sector-processing program, choose the **base Mac Studio with M5 Ultra, 30 CPU cores, 64 GPU cores, 96GB unified memory and 1TB SSD, at US \$5,499 before tax**. Its additional CPU capacity and memory bandwidth are development headroom, not demonstrated Borg acceleration. Do not buy the 36-core or 256GB upgrade solely for today's four-worker Borg workload. If the purchase is restricted to improving the current bounded solver before implementing the architecture below, the **18-core M5 Pro Mac mini with 64GB and 1TB, at \$3,199**, is the lower-cost choice. The **18-core M5 Max Studio with 64GB and 1TB, at \$3,799**, is the intermediate choice for earlier bulk-memory and Metal development. These configured prices were checked in Apple's store response, not inferred from launch prices; the hardware table identifies the sources.

The recommendation is conditional on actually pursuing receiver-level parallelism and compact block accounting. On the measured six-path Borg bridge control, four workers are only **1.22 times** as fast as one; the separate root-heavy coupled workload reaches **3.00 times**. More worker capacity cannot remove serial joint-state certification. A successful short control also does not resolve the existing coarse-step Borg acceptance failure.

Plainly: the Ultra is a development investment in the intended architecture. The present application alone does not justify its price, and a larger memory configuration has not yet earned its cost.

## Live implementation boundary

### Borg budgets and the EOM execution paths

**Measured source facts.** Both presets in [BorgCertifiedBudgets.js](../../../../src/apps/borg/BorgCertifiedBudgets.js) specify four worker threads and `requestMemoryBytes = 67108864`, or 64 MiB. Research remains the default. The difficult-row precision ladder begins at 128 MPFR bits and stops at 512; root work is bounded by 256 subdivision levels and 500,000 cells per request row. These are allocation-bound request controls, not a statement that a whole persistent worker, browser, operating system or checkpoint fits in 64 MiB. Increasing machine RAM does not change either preset or its allocation fingerprint.

[BorgEomShadowRunner.js](../../../../src/apps/borg/BorgEomShadowRunner.js) obtains the worker and request-memory controls from those allocations. [BorgNativeEomProcessClient.mjs](../../../../scripts/eom/BorgNativeEomProcessClient.mjs) checks the request against its declared allocations and uses one persistent EOM process. Its history-prefix cache can avoid retransmitting unchanged native input segments. The Display HTTP extension path and host-memory envelope additionally bound browser transport and resource admission; they do not authorize larger certified budgets. The [Borg design](../../app-borg/contracts/requirements-and-design.md) distinguishes Display's adaptive host reserve from claim-grade admission. This live transport code is newer than the historical survey's statement that every increment retransmits the entire prefix.

Plainly: the machine, the certified request and the display are three different resource budgets. Changing one does not silently change the other two.

| Phase | Live implementation | Worker usefulness and remaining limit |
| --- | --- | --- |
| Exact delayed-root batches | [ExactPairBatch.cpp](../../../../src/eom/src/ExactPairBatch.cpp), `ExactPairWorkerPool`, uses a persistent pool, an atomic next-row index, immutable history inputs and indexed result slots | Multiple pairs execute concurrently, including their local MPFR escalation. A batch mutex serializes simultaneous calls to this pool. One pair's adaptive emission-cell search remains serial. |
| Ordinary sharp and finite-width acceleration | [CertifiedAcceleration.cpp](../../../../src/eom/src/CertifiedAcceleration.cpp), `certify_acceleration_reconstruction`, assigns pair requests to threads | Pair calculations are parallel, but threads are created and joined for each reconstruction. Some binary64 finite-width cell work also uses `DeterministicParallelExecutor`; per-row inner concurrency is capped at four and apportioned from the requested count. The global budget must still be checked for nested execution. |
| Receiver/source/emission traversal | [CertifiedTraversal.cpp](../../../../src/eom/src/CertifiedTraversal.cpp), `certify_moving_history_traversal`, processes a serial pending-node stack | Receiver and source ranges split hierarchically; emission splitting exists at membership leaves. The traversal itself has no worker-count input. Only its exact fallback batch accepts threads. The coupled caller leaves the emission-depth setting at its default zero. |
| Pair selection and certificate construction | [CoupledEvolution.cpp](../../../../src/eom/src/CoupledEvolution.cpp), `certify_native_acceleration_snapshot` | History-window selection, far-field classification, map construction and much certificate bookkeeping are serial. A small-population route bypasses traversal. |
| Ordinary deterministic reduction | `certify_acceleration_reconstruction` validates and canonicalizes all pair requests, then uses the fixed pairwise interval tree | Pair work is parallel; receiver totals are currently assembled in a serial receiver loop. No scheduling-dependent atomic floating-point sum is used. |
| Joint-state acceleration | [JointAccelerationSnapshot.cpp](../../../../src/eom/src/JointAccelerationSnapshot.cpp), `certify_joint_acceleration_snapshot` | Correlated error variables are propagated through serial receiver and contribution loops; no worker-count interface exists. Each receiver scans the complete pair-certificate vector to select its rows. |
| Joint endpoint correction | [JointEndpointCorrector.cpp](../../../../src/eom/src/JointEndpointCorrector.cpp) and [Krawczyk.cpp](../../../../src/eom/src/Krawczyk.cpp) | Serial dense matrix operations certify an implicit endpoint enclosure. The corrector dimension is $3N$, hence 18 for six paths. A larger worker request does not parallelize this phase. |
| Step control and publication | Coupled full step, two half-steps, correction iterations, inflation, final recertification and atomic publication | Dependent iterations remain ordered. Recertification invokes parallel pair work, but the controller and most history assembly remain serial. Independent receiver work inside an iteration is a possible optimization. |
| History and checkpoints | [History.cpp](../../../../src/eom/src/History.cpp), [Checkpoint.cpp](../../../../src/eom/src/Checkpoint.cpp) | Block sharing and exact disk storage already exist. Token encoding, hashing, checkpoint assembly, durable write and reload are principally serial. |

Plainly: today's worker control accelerates some expensive stages, not the entire solver. The joint-state stages preserve shared uncertainty between paths; bypassing them to improve a timing would change the numerical problem.

### Pair materialization and memory layout

**Derived from the inspected code.** There are three separate quadratic structures. First, traversal allocates `vector<bool> exact_pairs` over the complete ordered-pair domain and later scans it into membership ranges. Its default tracking limit is 256 MiB; approximately $N^2/8$ bytes are needed even if every relationship will be excluded. At one million paths this bitmap alone is about 125 GB. Second, coupled traversal expands excluded nodes through nested receiver/source loops into individual zero-root certificates in `certificates_by_index`. Third, acceleration reconstruction requires exactly $N^2$ requests, creates a canonical copy and pair-certificate vector, and constructs receiver totals from them. Avoiding a matrix of acceleration values alone therefore does not remove quadratic allocation or bookkeeping.

The current memory admission estimate explicitly adds **1,024 bytes per logical pair**, together with retained segment objects and token storage. That term alone reaches about 0.95 GiB at $N=1,000$, 95.4 GiB at $N=10,000$, and 931 TiB at $N=10^6$. These are values of the current admission formula, not measured peak memory. The estimate is not a rigorous process-resident-memory bound: the measured circular-history workload below reports 3.81 MB estimated admission but roughly 56–61 MiB peak resident memory. A workstation budget must account separately for library/process overhead, cached histories, certificates, candidate snapshots, MPFR temporaries and output.

Plainly: a memory upgrade cannot make the current data structures a million-path solver. Large certified exclusions must stay compact through reduction, and the admission estimate needs calibration against actual memory use.

History storage uses immutable blocks of **64 contiguous `CubicHistorySegment` objects**, a vector of block slots, cumulative segment indexes, a two-segment terminal cache and a lazily cached exact endpoint. Appending shares old blocks and copies the active tail rather than copying every old segment. The measured object size in this build is **936 bytes before separately allocated token contents**; a 320-byte legacy projection is not its current storage footprint. Coefficient and interval arithmetic within one segment is relatively local. Across paths, however, block pointers, strings, binary searches, adaptive root-cell queues, certificate maps and variable-size roots produce irregular access. Disk-backed blocks are parsed into objects on load, and each thread maintains its own bounded cache, normally 16 blocks; cache misses also touch shared bookkeeping protected by a mutex.

The current exact terminal cache matters: the live 192-segment disk-backed control reports zero disk-block loads for endpoint access and append metadata. Recommending removal of an already repaired full-prefix endpoint scan would target obsolete code. Future work should measure the remaining interpolation, root-cell and certificate paths. The joint-history representation adds dense coefficient vectors for shared symbols; with $K$ retained symbols, it can cost $O(NHK)$ rather than $O(NH)$. The $3N$ endpoint matrix adds $O(N^2)$ storage and conventional dense inversion work. Near-linear history storage therefore also requires a certified bounded-symbol or structured joint-state representation, or a separately admitted ordinary-enclosure route. Discarding correlations without charging their remainder can invalidate acceptance.

The implementation conclusions are falsifiable at the linked entry points: a parallel traversal or joint-state caller, a reducer consuming compact exclusions without per-pair expansion, or a replacement of the dense bitmap/symbol structures would change the corresponding boundary. A future README summary alone does not establish such a change; inspect and measure the executing path.

Plainly: old histories are already shared in useful blocks, but the hot path is not a flat numerical array. The joint uncertainty representation is another scaling obligation, separate from the interaction matrix.

## Measurements from the live source tree

### Instrument, scope and repeatability

**Measured.** The host reported Apple M3, eight CPU cores comprising four performance and four efficiency cores, 24GB memory, and macOS 26.6.2. AppleClang 21 built `src/eom` in Release mode with C++20 and `-ffp-contract=off`. A new build directory was used before measurement; no solver, oracle, fixture or Borg preset was edited. One, two, four and eight workers were tested. Eight is the host's full CPU count; higher counts would measure oversubscription, not additional available cores. No performance-core affinity or thermal-state control was imposed, and ambient workstation activity was not excluded. The three trials per case support bounded timing comparisons, not confidence intervals or sustained thermal claims.

The coupled profile uses the existing [release profiler](../../../../scripts/eom/attractor-phase0-release-profile.cpp): six neutral paths, factory-certified circular past histories of depth eight with segment step 0.02, normalized $c_f=1$, a 0.2 reception interval, step 0.01 and minimum step 0.0025, root tolerance $10^{-5}$, and its unchanged sharp-chart controls. Its future is EOM-evolved. A temporary observation-only copy additionally records full-history provenance fingerprints, accepted-snapshot root brackets and signs, `sizeof`, process peak memory, and checkpoint serialization/reload. The checkpoint observation occurs after the evolution timer. Worker orders were 1/2/4/8, 8/4/2/1 and 2/8/1/4.

The Borg control uses the existing [refinement driver](../../../../scripts/eom/run-borg-eom-refinement-ladder.mjs), its accepted inertial seed at seed index zero, all six paths, normalized $c_f=1$, and the Research allocations except for explicitly named **benchmark-control** worker counts and a fixed 0.0025 step over $[0,0.01]$. A temporary wrapper preserves the entire response and runs three repetitions at each count in one persistent worker. These benchmark allocations are not new selectable certified presets. The browser canvas and rendering loop are not included.

Plainly: both tests execute the current EOM solver, but they ask different questions. The first emphasizes long retained histories and root searches; the second includes the joint-state work used by the Borg bridge.

### Coupled circular-history workload

All twelve executions complete 20 accepted steps with zero rejected steps. Medians below are seconds; peak resident memory is the maximum observed through evolution and endpoint observation within that worker row, before checkpoint work. Speedup is $S_p=t_1/t_p$, and parallel efficiency is $E_p=S_p/p$, where $p$ is the requested worker count.

| Workers | Evolution wall | Speedup | Efficiency | Root batch | Traversal | History window | Acceleration | Peak MiB |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 5.7515 | 1.000 | 100.0% | 5.2893 | 0.0987 | 0.1272 | 0.0927 | 56.28 |
| 2 | 3.1392 | 1.832 | 91.6% | 2.7123 | 0.1005 | 0.1291 | 0.0555 | 58.31 |
| 4 | 1.9203 | 2.995 | 74.9% | 1.5191 | 0.0984 | 0.1266 | 0.0386 | 60.08 |
| 8 | 1.9595 | 2.935 | 36.7% | 1.5308 | 0.0988 | 0.1272 | 0.0430 | 60.56 |

Plainly: four workers nearly triple throughput here. Eight do not improve it on this host; the unchanged traversal and history-window costs also limit further improvement.

| Workers | History copy/hash | Correction, inclusive | Final recertification, inclusive | Rejection |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 0.0368 | 4.9338 | 0.7886 | 0 |
| 2 | 0.0368 | 2.6793 | 0.4312 | 0 |
| 4 | 0.0354 | 1.6290 | 0.2632 | 0 |
| 8 | 0.0356 | 1.6192 | 0.2687 | 0 |

Plainly: correction and recertification include root and acceleration work already shown above. These overlapping timers must not be added as independent phase costs.

Each run reports 141 ordinary snapshots, 5,076 pair-certificate evaluations and 1,877,940 reevaluated root cells. The 20 accepted endpoint snapshots each account for 36 exact-route ordered pairs and 30 roots: **600 accepted-snapshot roots**, not 5,076 distinct roots. Accepted-snapshot block exclusions and grouped contributions are zero. Root MPFR attempts, finite-width execution and acceleration precision escalation are zero in this workload. The results therefore measure ordinary roots, not fold throughput. Input-history fingerprints, output-history fingerprints and the observation's step/root decision trace are identical across all trials and counts. This is deterministic execution evidence, not an independent proof of the evolved trajectories.

**Inferred bottleneck.** Root batching occupies about 92% of the one-worker total and about 79% at four workers. The measured scaling and small working set are consistent with arithmetic, root classification and certificate-construction cost, rather than proof of saturated unified-memory bandwidth. The binary64 worker timer encloses `run_double_attempt`, not the following complete certificate construction; its sum cannot be subtracted from batch wall time and called synchronization cost. Allocator cost, cache misses, bytes transferred and complete root-worker utilization were not measured. A claim that this workload is specifically bandwidth-bound, synchronization-bound or allocation-bound is therefore not established.

Plainly: roots are where this test spends its time, but the timers do not identify every reason roots are expensive. Hardware counters and allocation profiles are needed before attributing the cost to memory bandwidth.

### Borg bridge workload and the serial joint-state limit

| Workers | Bridge wall, seconds | Speedup | Efficiency | EOM wall | Ordinary roots | Ordinary acceleration | Joint snapshots | Joint endpoint contraction |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 0.7330 | 1.000 | 100.0% | 0.7178 | 0.1327 | 0.0322 | 0.3627 | 0.1470 |
| 2 | 0.6291 | 1.165 | 58.3% | 0.6258 | 0.0686 | 0.0188 | 0.3522 | 0.1451 |
| 4 | 0.6000 | 1.222 | 30.5% | 0.5968 | 0.0388 | 0.0131 | 0.3567 | 0.1470 |
| 8 | 0.6042 | 1.213 | 15.2% | 0.6011 | 0.0367 | 0.0150 | 0.3588 | 0.1454 |

Plainly: parallel roots get faster, but the larger serial joint-state stages do not. Buying more cores without changing those stages has limited value for this particular Borg workload.

All twelve bridge requests complete four accepted steps with no rejection, unchanged input and output histories, identical full `stepFailures` decision records and identical final acceleration snapshots. Each run reports 89 ordinary snapshots, 3,204 pair evaluations, 28,836 reevaluated root cells, 104 joint snapshots and 36 retained joint symbols. Each accepted endpoint has 36 ordered-pair certificates and 30 roots, giving 120 accepted-snapshot roots. Excluded blocks, enclosed pairs, grouped contributions, unresolved pairs, MPFR attempts and finite-width execution are zero. The request's memory estimate is 123,091 bytes, not peak process memory. The worker's disk-store mode is enabled, but the short run writes zero full history blocks; it is not a disk-backed endurance benchmark.

Joint-row certification takes approximately 0.34–0.35 seconds, included within joint snapshots; joint deterministic reduction takes about 0.012 seconds. History copy/hash is about 0.020 seconds. Inclusive correction medians are 0.7022/0.6146/0.5872/0.5918 seconds; recertification medians are 0.00844/0.00471/0.00300/0.00278 seconds. Ordinary traversal is zero because the selected route is `exhaustive_exact_pair_batch`; history-window selection is only a few microseconds. At four workers, joint snapshots and contraction together account for approximately 84% of EOM wall time. Their serial implementation, not an inferred bandwidth ceiling, is the immediate architectural limit. The memory, locking and allocation mix inside them remains unprofiled.

The unmodified full six-path refinement driver was also rerun. Its step-0.01 case halts at `minimum_step_exhausted` after `krawczyk_image_not_strictly_interior`; step 0.005 and both step-0.0025 worker controls complete. The driver's `strictControlPassed` remains false and its fine-step thread parity is true. The smaller-step benchmark does not erase that failed acceptance row.

Plainly: the new measurements confirm useful fine-step behavior and preserve the existing failure. They do not certify Borg's full refinement or long-horizon gate.

### Block traversal controls

The unchanged [recursive block benchmark](../../../../src/eom/native/eom_recursive_block_benchmark_cli.cpp) was run three times per worker count on 64-path moving and accelerating populations, with $c_f=1$, reception time two, emission interval $[0,2]$, 64-pair leaves, maximum emission depth two and an exact-pair cap of 100,000. These are manufactured histories, not coupled Borg evolution. The `recursive` mode includes traversal and exact fallback; the `traversal` mode does not solve roots.

| History/geometry | Excluded pairs | Exact fallback pairs | Visited nodes | Complete wall at 1/2/4/8 workers, ms | Eight-worker speedup / efficiency | Maximum peak MiB |
| --- | ---: | ---: | ---: | --- | --- | ---: |
| Moving sparse | 3,584 | 512 | 77 | 21.915 / 13.764 / 8.461 / 8.366 | 2.62 / 32.7% | 3.31 |
| Moving dense | 0 | 4,096 | 383 | 177.963 / 94.966 / 51.404 / 38.347 | 4.64 / 58.0% | 8.88 |
| Accelerating sparse | 3,584 | 512 | 77 | 24.761 / 15.479 / 9.669 / 6.054 | 4.09 / 51.1% | 3.61 |
| Accelerating dense | 0 | 4,096 | 383 | 205.823 / 106.866 / 55.025 / 41.180 | 5.00 / 62.5% | 9.86 |

Plainly: larger independent exact-pair batches can use the efficiency cores better than the six-path workloads. These milliseconds do not predict accepted Borg seconds or million-path throughput.

All 96 traversal/complete trials report certified-complete accounting and zero unresolved pairs. Grouped contributions are zero. Membership fingerprints match at every count; the sparse fingerprint is `2fdf1743792cb303` and dense is `ce26fe46df4310c3`. They fingerprint membership, not the numerical histories: equal fingerprints for moving and accelerating cases do not mean equal inputs or equal roots. The CLI does not emit actual root totals or MPFR-attempt totals, so those counts are **unmeasured**, not zero. Traversal-only medians span approximately 0.8–1.3 ms for sparse controls, 4.2–4.3 ms for moving dense and 5.3–5.8 ms for accelerating dense. Worker-count variation in that serial phase is timing variation, not parallel traversal.

Independent history-layer tests pass **35/35**, including separate decimal-interval root checks and analytic difficult controls. The existing fixture resolves two close roots at 128 MPFR bits; tangent and self-rail controls still require a caustic route at the 512-bit ceiling. The coupled-evolution suite passes **36/36**. These suites establish their local numerical controls, not scientific acceptance of the benchmark or the proposed hierarchy. The disk-history terminal-equivalence and pin-lifetime controls also pass. In 2,000 append-metadata iterations on a 192-segment disk-backed history, metadata updates take a few microseconds and cause zero disk-block loads; this narrow result must not be generalized to arbitrary root access.

Plainly: difficult roots are exercised by independent correctness controls, but their sustained workstation throughput remains a missing measurement.

## Delay-aware block architecture

### Exclusion is a statement about a whole space-and-time block

**Derived.** In absolute time and the Euclidean void, begin with

$$
g_{ij}(T,S)=\lVert\mathbf X_i(T)-\mathbf X_j(S)\rVert-c_f(T-S),\qquad S<T.
$$

Plainly: a causal hit occurs when the distance from an earlier source position to the receiver equals the distance a wake travels during the elapsed time. Here $i$ identifies the receiver, $j$ the source, $T$ reception time and $S$ emission time. Every numerical example in this analysis uses $c_f=1$.

Let $R$ be a receiver sector, $Q$ a source sector, $I$ a reception interval and $J$ an emission-time slab. Their certified position hulls are $\mathcal X_R(I)$ and $\mathcal X_Q(J)$, containing every admitted path position in the corresponding membership. Outward interval arithmetic gives

$$
G_{R,Q,I,J}
=\lVert\mathcal X_R(I)-\mathcal X_Q(J)\rVert-c_f(I-J),
\qquad
0\notin G_{R,Q,I,J}\ \Longrightarrow\ \text{no root in the block}.
$$

Plainly: exclusion is safe only if the entire possible residual misses zero. A positive nominal distance, a distant source, a small sampled value or a favorable GPU estimate is not that proof. Wide intervals may miss a real opportunity to exclude; they must never exclude a possible hit.

Use slabs entirely before the earliest reception time when possible. A slab intersecting reception requires a certified triangular-domain treatment and the canonical coincident self-endpoint convention. Exclusion of one time slab does not exclude an ordered pair at all other emission times. The coverage certificate partitions receiver/source/time membership, owns slab boundaries exactly once, and proves that the full required retained domain is covered. A pair becomes root-free only after all its admissible slabs are accounted for. For exact fallback, either search the complete emission domain once or prove that separately solved slabs have a complete, duplicate-free root union. Current fallback deliberately searches the full traversal emission interval; it is not yet a parallel independent-slab root scheduler.

Receivers can be queued in stable spatial sectors while sources are indexed by path sector and immutable history slab. Each node stores certified position/velocity bounds, path membership, time extent and history identity. Reuse an index node only for the exact accepted-history or candidate-history version it encloses. During implicit correction, new candidate segments are provisional and require their own bounds; an accepted-history index cannot certify unknown future positions. Spatial separation alone is insufficient because a moving source's earlier location, not just its current location, determines a root.

Plainly: the index is a map of where paths were during specified intervals. Keeping time and history identity in the map is what makes a spatial hierarchy compatible with delayed interaction.

### Grouping active sectors requires a stronger certificate

**Proposed, not implemented.** A regular active block may share root and contribution work only after certifying its root count, branch correspondence, separation from singular geometry, conditioning, interpolation error and complete receiver contribution error. Root-free exclusion and active grouping are different operations. The existing [far-field enclosure](../contracts/far-field-contribution-enclosure.md) can enclose a weak pair's complete possible contribution without isolating its roots, but still emits individual pair records; it is not a group of regular active sectors. Any extension must use the current [Master EOM binding](../contracts/master-eom-binding-v1.md), not copy a historical comparison kernel.

Away from zero separation, let $\widehat{\mathbf r}$ be the source-to-receiver unit direction. The derivative controlling root conditioning is

$$
\partial_S g=c_f-\widehat{\mathbf r}\cdot\mathbf V_j(S),
\qquad
|\partial_Sg|\ge\delta_S>0.
$$

Plainly: a strictly positive lower bound $\delta_S$ on the derivative magnitude means a small residual error cannot move the emission root arbitrarily far. Near a fold this bound approaches zero, so a regular-block approximation loses its justification. A speed above or equal to wake speed is not by itself a rejection rule.

For a monotone branch whose endpoint signs certify existence, the mean-value theorem bounds a root perturbation by $|\Delta S|\le\epsilon_g/\delta_S$, where $\epsilon_g$ bounds the residual perturbation. Multiple roots require separately certified disjoint branches and a root-free complement. Over a changing reception sector, branch continuation must also avoid boundary entries, mergers and orientation changes. For a regular acceleration contribution $\mathbf A$, certified derivative bounds can charge root uncertainty and grouped interpolation through

$$
\|\Delta\mathbf A\|
\le L_S\frac{\epsilon_g}{\delta_S}
+\epsilon_{\mathrm{history}}
+\epsilon_{\mathrm{group}}
+\epsilon_{\mathrm{round}},
\qquad
\sum_{B\text{ for receiver }i}\epsilon_{i,B}
\le\tau_{A,i}^{\mathrm{group}}.
$$

Plainly: $L_S$ bounds how strongly the contribution changes with emission time. History reconstruction, the group approximation and numerical rounding consume additional error. Every group spends part of one receiver's budget; repeating an entire receiver allowance for each group is invalid.

The expression is a sufficient error-accounting template, not an already proved expansion for the Master EOM kernel. A proposed polynomial, multipole or low-rank representation must supply its actual uniform derivative and remainder bounds, preserve polarity and branch multiplicity, and charge the result into the existing acceleration-to-state ledger. Integrating a bounded acceleration error over a step of width $h$ contributes at most $h\epsilon_A$ to velocity and $h^2\epsilon_A/2$ to position, before other errors. Cancellation between polarities is not permission to omit absolute error bounds. Conventional spatial multipole compression does not establish any of these delayed-root properties.

Folds, caustics, close approaches, same-transmitter special geometry, retained-history edges, uncertain root counts and failed conditioning or contribution bounds subdivide or enter the existing CPU binary64/MPFR route. If precision, history or event budgets are exhausted, the candidate step fails closed. More memory and more threads cannot repair an uncertified event model or remove a required regulator-convergence test.

Plainly: active grouping is useful only when it saves work before all pair roots have already been solved. Grouping the answers afterward does not remove quadratic root search.

### Execution, memory bounds and dense failure

```text
retained accepted histories and versioned candidate bounds
                         |
              parallel receiver-sector queues
                         |
          source-sector x emission-time block tests
             /                 |                  \
 certified root-free   certified regular      uncertain/difficult
   exclude block       grouped CPU/GPU       subdivide or exact
                        contribution           CPU/MPFR
             \                 |                  /
               receiver-owned deterministic reduction
                              |
                recertified accepted step or fail closed
```

Plainly: one receiver owner collects certified contributions in a fixed mathematical order, regardless of which worker finishes first. The acceptance boundary stays after complete accounting and recertification.

**Proposed resource invariant.** Let $H$ be retained segments per path, $b_H$ the actual bytes per segment including required numerical state, $C$ the bounded resident index/certificate count, $W$ active workers, and $Q$ the bounded exact-work queue per worker. The intended memory envelope is

$$
M\le NHb_H+Cb_C+WQb_Q+M_{\mathrm{joint}}+M_{\mathrm{output}}+M_{\mathrm{runtime}}.
$$

Plainly: history grows with paths times retained depth. Extra memory must be explicitly reserved for the index, each worker's pending roots, shared uncertainty, output buffers and process overhead. No term may secretly allocate the full interaction matrix.

Replace the bitmap with a disjoint hierarchical membership cover and a bounded traversal frontier. Preserve excluded ranges as certificates all the way to the reducer. Generate surviving requests in tiles, consume them, retain only continuation-required branch state, and stream detailed audit records. Use stable integer path IDs and canonical source/branch order, with per-worker arenas and preallocated regular-row buffers. A receiver's ordered tree can be evaluated incrementally with logarithmic partial state; bounded reorder buffers apply backpressure when an early difficult tile delays later completed tiles. Merely skipping zero additions must not change the declared interval result: reproduce the original tree's outward-rounding operations or introduce an independently checked versioned enclosure policy. Different association can alter interval width and thus acceptance even when midpoint sums look equal.

Near-$O(NH)$ total storage requires $C$, the continuation state and the joint-state representation to remain bounded relative to history, not just the removal of an acceleration matrix. Dense shared-symbol histories and the dense endpoint corrector do not meet that condition today. A structured or matrix-free corrector would need independently verified residual and contraction bounds; reducing numerical rank without bounding discarded directions is not allowed. The implementation must reject requests whose certified representation cannot fit its declared envelope before publishing a candidate.

When nearly every relationship remains active and cannot be grouped, the streamed algorithm still performs $\Theta(N^2)$ pair work per reception event, multiplied by history-search and root-refinement cost. It can preserve bounded working memory, but cannot promise near-linear time. Full per-root audit output may also remain quadratic. Report the active/exact fraction and measured root cost, cap work and output, and stop without advancing if the horizon cannot fit the resource contract. Do not invent a cutoff, retire causally reachable history, skip self-pairs or replace difficult interactions with display values to obtain a favorable scaling curve.

Plainly: streaming prevents memory explosion. It does not make a genuinely dense delayed network cheap. The honest dense outcome is exact bounded execution or an explicit resource failure.

## Exploiting the hardware without weakening arithmetic

### CPU cores, bandwidth and capacity

**Proposed priorities.** First give each receiver a direct range of pair certificates; the current joint-state scan visits the complete $N^2$ vector for each receiver, adding avoidable $O(N^3)$ membership inspection. Parallelize independent joint receiver/row certification, keeping symbol registries immutable and failures merged in canonical order. Profile the remaining endpoint matrix work before parallelizing it. Reuse acceleration workers across snapshots, share one active-thread budget with root and finite-width work, and batch tiny tasks so synchronization is amortized. Preserve deterministic numerical output even if diagnostic completion order changes; canonicalize failure selection as well as successful results.

For bandwidth, build a structure-of-arrays or short array-of-structures-of-arrays view of numerical history coefficients, interval endpoints and time bounds. Keep exact tokens and source identities in a cold provenance store, with a proven lossless or outward-enclosing conversion to the hot view. Process a tile of receivers against a source slab while its coefficients are cached; retain precomputed hulls instead of repeatedly reconstructing them from scattered strings. SIMD lanes should evaluate independent regular bounds, with masks routing uncertain lanes to scalar processing. Separate regular and difficult queues to limit branch divergence. Reuse immutable source pages across receiver work, and measure whether a shared pinned cache actually beats replicated per-thread caches before introducing shared-lock contention.

Plainly: wide memory channels pay off when the program requests long, reusable runs of numerical data. Pointer chasing and one tiny root at a time do not automatically consume the advertised bandwidth.

More performance-class cores primarily benefit independent receiver rows, exact roots and expensive MPFR cases with sufficient parallel work. More bandwidth primarily benefits slab-bound construction, bulk interpolation, batched regular contributions, large joint coefficient operations and checkpoint copies after their layouts are suitable. More capacity primarily supports deeper retained histories, larger hot indexes, bounded difficult queues, restart buffers and concurrent experiments. None directly increases a certified horizon that is blocked by an enclosure failure. Apple super cores and performance cores are both relevant CPU execution resources; their relative contribution and scheduling must be measured rather than counted as identical workers.

A useful diagnostic model is $t_p=t_{\mathrm{serial}}+t_{\mathrm{parallel}}/p+t_{\mathrm{overhead}}(p)$. It is a decomposition to test, not a fitted prediction for another chip. On the measured Borg control, roughly 0.50 seconds of joint snapshots plus endpoint contraction persists while ordinary roots shrink. Even infinite ordinary-root workers would leave that work. Measure CPU utilization, instruction/cycle counts, cache misses, memory-controller traffic, allocator samples, lock waits, disk reads and task-size distributions to distinguish compute, bandwidth, synchronization and allocation limits. An eight-worker plateau alone distinguishes none of them conclusively.

Plainly: optimize the phase that the real run actually uses. The strongest current evidence favors joint-state parallelism before a GPU rewrite or a larger worker preset.

### Conservative Metal acceleration

**Source-verified limitation.** Apple's [Metal Shading Language specification](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf), revision 2026-06-04, section 2.1, does not support `double`. The CPU solver's strict binary64 and directed MPFR arithmetic therefore cannot simply be compiled into equivalent Metal roots. Unified physical memory avoids some explicit transfers but not buffer preparation, cache traffic, dispatch latency, synchronization, shared capacity or CPU/GPU bandwidth contention.

Initially use Metal for index construction candidates, Morton ordering, compaction, prefix scans, coarse distance screens and candidate block scheduling. A GPU screen may retain too much work. It must not discard a block unless a CPU outward-bound replay certifies it, or an independently proved GPU enclosure includes conversion, arithmetic, transcendental, subnormal, overflow and compiler behavior. Unknown, non-finite and out-of-range results must return to the CPU. Binary32 epsilon padding or agreement on a random sample is not a universal exclusion proof. Disable unsafe reassociation where required; measure the exact compiler and device behavior used by the certificate.

For a later grouped GPU contribution, bound every input conversion and the complete returned contribution, root topology and reduction error against an independent CPU/MPFR calculation. Retain CPU replay and fallback for strict roots, difficult sectors and certificate checks. A float-pair representation would itself need proofs and measurements; it is not automatically strict binary64. Avoid unordered GPU floating-point atomics for receiver totals. Start with GPU candidate blocks whose CPU replay is cheaper than exhaustive pair roots, then measure whether replay consumes the gain. The GPU and Neural Engine's AI or graphics specifications are not measured interval-root throughput.

Plainly: the GPU can organize and screen large batches early. It earns numerical authority only after its complete error and exclusion behavior is independently established.

## Checkpoints, storage and reproducibility

**Measured and inspected.** The circular-profile observer creates a checkpoint, serializes it and reloads it after evolution. Every trial reproduces all output-history fingerprints. The serialized size is 1,354,561 bytes, and the roundtrip costs about 0.105–0.110 seconds on this host. This is in-memory serialization/reconstruction, not a durable write-speed measurement, and it does not by itself test future continuation. Existing coupled tests provide separate bounded restart controls. [Checkpoint.cpp](../../../../src/eom/src/Checkpoint.cpp) writes a temporary file, synchronizes it, renames it atomically and synchronizes the containing directory. Current checkpoints preserve controller step size, cost cooldown, consecutive growth-headroom count and joint history, not merely endpoint coordinates.

**Proposed.** Keep exact immutable history chunks and accepted manifests separate from display derivatives. Use incremental content-addressed checkpoint chunks and bounded buffers; do not reserialize the entire retained prefix at every short Borg increment. Preserve all future-consumed adaptive state, branch identities, precision policy and pending work, or deterministically reconstruct it with a checked rule. A checkpoint must identify only accepted data. Asynchronous writing can overlap future work only while holding an immutable accepted snapshot and enforcing backpressure; it must not expose an incomplete manifest as durable acceptance.

Plainly: restart correctness includes the decisions the solver will make next. Saving the same visible positions is insufficient.

For capacity planning, measure serialized bytes per accepted segment and certificate, not `sizeof` alone. As an explicitly assumed example, one million new segments at 1 KiB each generate about 0.95 GiB per accepted step; 1,000 such steps approach 0.93 TiB before detailed root records, replicas or backups. This is an output-budget example, not an executable million-path forecast. Measure checkpoint hash time, encode/decode time, durable write latency, sequential read rate, cold-cache restart latency and retained bytes per simulated time. A faster SSD does not provide RAM-like access to irregular MPFR history. External Thunderbolt storage is appropriate for accepted archives and checkpoints only after measured throughput and failure handling; it does not enlarge unified memory.

Keep build/source identity, mathematical-input identity, execution-budget identity and result identity separate. Worker-count changes necessarily change execution configuration; numerical histories and certified discrete decisions should still agree under the declared policy. Exclude wall times, process IDs and live cache counters from deterministic-result hashes. For an approximation with a new independently accepted enclosure policy, require independent containment, root topology and acceptance-decision agreement within the declared budget; do not claim bitwise identity unless actually measured. Timing improvements that arise from fewer accepted steps or changed failure decisions are invalid speed comparisons.

Plainly: use identical mathematical work for speed comparisons, and report changes in storage or cache behavior separately from changes in the accepted result.

## Current Mac mini and Mac Studio options

**Official specifications and prices checked 2026-08-30.** Apple announced these models on August 25; they are available for pre-order, with deliveries starting September 22. The 512GB Studio option is announced for late October. Thus no result here was measured on these new machines. The current models are M6/M5 Pro and M5 Max/M5 Ultra, not the previous M4/M3 Ultra lineup. Sources: [Mac mini specifications](https://www.apple.com/mac-mini/specs/), [Mac Studio specifications](https://www.apple.com/mac-studio/specs/), [Mac mini announcement and starting prices](https://www.apple.com/newsroom/2026/08/apple-unveils-a-more-powerful-mac-mini-featuring-the-all-new-m6-and-m5-pro/), and [Mac Studio announcement and starting prices](https://www.apple.com/newsroom/2026/08/apple-introduces-new-mac-studio-with-m5-max-and-m5-ultra/).

| Configuration | CPU / GPU cores | Advertised memory bandwidth | Unified memory | SSD | US price, before tax |
| --- | --- | --- | --- | --- | ---: |
| Mac mini M6 base | 12 CPU: 2 super, 4 performance, 6 efficiency; 12 GPU | 153 GB/s with 16GB; 170 GB/s for larger memory | 16GB; maximum 32GB | 256GB; maximum 2TB | \$899 base |
| Mac mini M5 Pro base | 15 CPU: 5 super, 10 performance; 16 GPU | 307 GB/s | 24GB; 48/64GB options | 512GB; maximum 8TB | \$1,699 base |
| Mac mini M5 Pro selected upgrade | 18 CPU; 20 GPU | 307 GB/s | 64GB | 1TB | \$3,199 configured |
| Mac Studio M5 Max base | 18 CPU: 6 super, 12 performance; 32 GPU | 460 GB/s | 36GB | 512GB; maximum 8TB | \$2,499 base |
| Mac Studio M5 Max selected upgrade | 18 CPU: 6 super, 12 performance; 40 GPU | 614 GB/s | 64GB; maximum 128GB with this chip tier | 1TB | \$3,799 configured |
| Mac Studio M5 Ultra base | 30 CPU: 10 super, 20 performance; 64 GPU | 1.2 TB/s | 96GB; 256GB option | 1TB; maximum 16TB | \$5,499 base |
| Mac Studio M5 Ultra higher chip tier | 36 CPU: 12 super, 24 performance; 80 GPU | 1.2 TB/s | 96/256GB; 512GB with this tier, later availability | Configurable through 16TB | From \$6,799; memory/storage upgrades additional |

Plainly: the 36-core Ultra buys 20% more CPU cores than the base Ultra, but no increase in advertised memory bandwidth. The base Ultra already supplies substantial room beyond four workers. No row converts GPU core counts or bandwidth into certified EOM speed.

Configured-price sources are the [64GB/1TB mini](https://www.apple.com/shop/buy-mac/mac-mini/m5-pro-chip-18-core-cpu-20-core-gpu-64gb-memory-1tb-storage) and [64GB/1TB Max Studio](https://www.apple.com/shop/buy-mac/mac-studio/m5-max-chip-18-core-cpu-40-core-gpu-64gb-memory-1tb-storage). Their returned Apple HTML contains the selected configuration and full purchase price. The [Ultra store](https://www.apple.com/shop/buy-mac/mac-studio/m5-ultra-chip-30-core-cpu-64-core-gpu-96gb-memory-1tb-storage) lists the \$6,799 higher chip starting tier. The [256GB selection](https://www.apple.com/shop/buy-mac/mac-studio/m5-ultra-chip-30-core-cpu-64-core-gpu-256gb-memory-1tb-storage) was verified as an offered configuration, but a final configured purchase price was not exposed by the retrieved page; obtain a current quote before approving that upgrade. No estimated upgrade price is substituted. Storage figures are capacities, not measured SSD bandwidth.

**Projected working-set envelope.** Start development admission at about 60% of installed memory for the entire EOM process and its resident buffers, while also retaining at least 20% system-wide reserve. The remaining allowance covers Borg, development tools, GPU buffers and caches; lower EOM admission if those consumers grow. These are conservative planning fractions, not ratified Borg limits or measured OS availability. They correspond approximately to 14 GiB on a 24GB machine, 22 GiB on 36GB, 38 GiB on 64GB, 58 GiB on 96GB, 77 GiB on 128GB and 154 GiB on 256GB. Read actual installed bytes and memory pressure on the purchased host before instantiating the budget.

Plainly: unified memory is shared by everything. A 96GB machine cannot safely devote all 96GB to retained histories.

**Base Ultra sufficiency is conditional.** With an assumed all-in ordinary-history representation of 1.5 KiB per segment, $10^5$ paths with $H=128$ need about 18.3 GiB for histories alone; $10^6$ need about 183 GiB. With a proposed, independently verified 256-byte packed numerical segment, the latter drops to about 30.5 GiB before exact tokens, joint coefficients, indexes, candidates and output. The packed figure is a design target, not current-code evidence. Therefore 96GB is ample for the measured workloads and a substantial bounded development ladder, but cannot be promised sufficient for a million paths at depth 128. Even 256GB would not make the current dense pair or joint-state representation acceptable.

Choose additional memory only when a representative retained-history run, with intended joint-state and output obligations, has a reproducible resident working set above roughly 55–60 GiB, or when simultaneous experiments and local model workloads demonstrably consume that margin. Do not infer such a requirement from population alone. If long-lived deep histories are the primary purchase requirement and their measured exact representation exceeds the 96GB envelope, choose the 256GB Ultra after obtaining its price; otherwise the base Ultra is the justified starting configuration for this development program.

Plainly: memory depth is a product of path count, retained segments and bytes per segment. Measure those factors before buying a memory tier that software redesign may make unnecessary.

## Workstation budget ladder and promotion gates

**Proposed successor budgets; none is ratified here.** Preserve the ordinary numerical, regulator, root and state tolerances of the selected Research or Interactive parent. Version resource changes explicitly and regenerate their allocation identity only in an authorized implementation. Establish the process-resident envelope separately from the logical request-memory estimate. The trial caps below are initial admission ceilings, not promises that the estimator bounds physical RAM. Keep one active EOM run initially so multiple processes cannot each consume the whole workstation budget.

| Candidate worker count | Initial logical request cap | Benchmark and promotion requirement beyond the common gate |
| ---: | --- | --- |
| 4 | Existing 64 MiB | Retain the current preset. Baseline the complete Borg bridge, root-heavy histories, difficult roots and restart, rather than declaring the existing acceptance frontier closed. |
| 8 | 256 MiB | First test the identical 64 MiB mathematical workload, then a larger history case. Require a repeatable throughput gain on the target host, deterministic results and measured peak memory. The present M3 measurements do not support promoting eight workers for these six-path cases. |
| 12 | 512 MiB | Require parallel joint receiver work, reusable worker scheduling and bounded per-worker scratch. Repeat the 8-worker workload and add at least 12 ready receiver sectors or enough independently expensive pairs. |
| 16, then 18 where useful | 1 GiB | Separate super/performance-core scheduling effects, serial correction and memory traffic. Promote 18 only if the complete run improves beyond 16 without degrading interactive responsiveness. |
| 24 | 2 GiB | Ultra target: require compact membership and bounded receiver/source/time queues; certify sparse and dense controls and retain complete branch accounting. Profile shared-cache contention and memory-controller traffic. |
| 30 | 4 GiB | Base Ultra target: repeat 24-worker cases and a sustained retained-history/checkpoint run. Prove aggregate active-thread limits, resource-stop atomicity and absence of harmful memory pressure. |
| 36 | 8 GiB | Higher Ultra only: compare the same inputs at 30 and 36, including difficult-root tails and checkpoint I/O. Buy or promote this tier only if measured additional throughput justifies it; extra headline cores alone do not. |

Plainly: each row earns its place by preserving results and improving complete-run performance. A worker cap and a memory cap are tested independently before being combined.

The **common promotion gate** freezes mathematical inputs, source/compiler identity and the independently authored reference before optimizing. Run at least five counterbalanced trials after warmup, at the prior budget and the proposed one, on stationary/linear analytical cases, sparse and dense moving histories, evolved coupled histories, clustered/near-field cases and folds/uncertain roots. Begin with small independently checkable populations and lengthen history until cold paging and checkpoint costs appear. Record all exclusive/inclusive phase definitions, wall time, accepted simulated time per second, actual peak process/tree memory, allocation and memory traffic, exact-root/MPFR/event counts, excluded/grouped blocks, subdivision depths, root/branch signs, rejection decisions and output bytes. Include a sustained thermal run on the actual purchased configuration.

For a scheduling/layout change, require bitwise accepted-history and canonical decision parity on identical inputs, single-thread replay, independent oracle containment, unchanged difficult failures, cancellation, budget exhaustion and restart at multiple adaptive cuts. For a new grouped numerical algorithm, additionally freeze and prove its error contract, compare against exhaustive independent controls, reconstruct complete pair/time membership and demonstrate receiver-total containment. A timing is usable only if the accepted horizon and decision scope match. As a proposed engineering threshold, require at least 10% median accepted-time throughput improvement over the prior tier with the trial distributions separated sufficiently to rule out the measured run noise, no more than 5% regression on the designated interactive control, and no increase in unresolved accepted cases. These thresholds are promotion criteria to ratify, not scientific constants.

Plainly: faster roots do not pass the gate if the application spends longer on certificates, changes its accepted steps, misses a branch or exhausts memory.

## Bounded implementation sequence and falsifiers

1. **Complete the cost instrument before changing budgets.** Extend the existing profiler, not the solver law, to separate root search from certificate construction, joint receiver work from matrix contraction, and allocation/lock/cache time from arithmetic. Calibrate admission against peak process memory and include disk-cache replication, observer buffers and GPU allocations. Acceptance: identical input/result fingerprints, phase definitions with no double-counted total, and a reproducible ordinary/difficult/long-history baseline. This step does not require a new machine.
2. **Parallelize the measured serial joint path.** Replace repeated full-matrix receiver filtering with indexed receiver ranges; evaluate independent receiver/row certificates in bounded queues, merge failures deterministically and reuse acceleration workers. Acceptance: exact history, bracket, branch and rejection parity at 1/2/4/8 workers; independent joint-state controls unchanged; measurable complete Borg improvement. Do not rewrite the oracle in this change. Profile the remaining dense corrector before selecting any matrix optimization.
3. **Remove quadratic resident pair accounting.** Replace the traversal bitmap and excluded-pair expansion with certified disjoint ranges, bounded exact tiles and streaming receiver reduction. Acceptance: exhaustive small-population membership parity including self-pairs and time boundaries; identical interval-tree results or a separately accepted enclosure policy; peak memory grows with histories and bounded queues rather than $N^2$ on a root-free population ladder; dense exhaustion publishes no candidate. This is not complete until joint-state workspace is separately admitted.
4. **Build reusable source-sector/time-slab bounds and hot numerical layouts.** Keep exact history tokens and accepted provenance; prove the bounds enclose the original representation. Acceptance: independent interpolation and exclusion tests, unchanged all-root coverage, measured bytes per segment and cache traffic, and a demonstrated end-to-end break-even size. More bandwidth is valuable only after this measurement.
5. **Introduce certified regular active grouping on CPU.** Start with analytically checkable stationary/linear blocks, then evolved regular branches. Acceptance: certified multiplicity/topology/conditioning, bounded group error charged to receiver totals, independent exhaustive containment, and a measured reduction in actual root work and total wall time. Adversarial folds, boundaries and dense geometry must subdivide or fall back. No asymptotic speed claim precedes measured break-even behavior.
6. **Add Metal screens, then independently certified bulk contributions.** Keep CPU replay initially and measure its full cost. Acceptance: no false exclusion on analytic/adversarial controls, proof covering the actual arithmetic envelope, all unknowns returned to CPU/MPFR, canonical receiver results, and end-to-end benefit including dispatch and buffer costs. Grouped GPU work is a separate later gate; the absence of strict `double` never disappears because the GPU is larger.
7. **Promote workstation budgets and sustained storage together.** Apply the ladder on the acquired host; retain accepted-manifest atomicity, future-consumed controller state, bounded write queues and failure recovery. Acceptance: repeatable accepted-time throughput, no unbounded history/certificate retention, multi-cut restart parity and a measured capacity margin over the intended horizon. Broader scientific acceptance remains with the owning EOM and theory gates.

Plainly: the sequence first removes costs already measured, then attacks the every-to-every representation, and only then grants authority to grouped or GPU work.

The purchase recommendation is falsified if the optimized representative workload remains dominated by serial correction, if 12–18 workers saturate it before Ultra-only cores help, if the Max achieves comparable accepted throughput at materially lower total cost, or if CPU/Metal block work cannot exploit extra bandwidth after replay and certification. The 96GB recommendation is falsified by measured required resident data above its safe envelope, sustained paging, or checkpoint/output queues that cannot remain bounded. Conversely, a 256GB upgrade is unnecessary if the intended longest-history workload plus concurrent applications stays comfortably below that envelope. Inspect phase profiles, peak-memory curves, actual traffic, accepted-history fingerprints and failure ledgers—not AI benchmarks or advertised bandwidth—to decide.

The immediate implementation blocker is **serial joint receiver certification and the uncalibrated complete cost/memory profile**, while the numerical acceptance blocker remains the coarse-step six-path Krawczyk failure. Compact pair/time accounting, structured joint-state scaling, active grouping and certified Metal work remain unimplemented. None is promoted by this document.

Plainly: a machine can accelerate certified work; it cannot turn an unresolved certificate into an accepted step.

## Reproduction and retained evidence

The measured source checkout was `3d22044fbbfdb89ebc8eca7cc50d0c1ae3eaf5f3`; solver and benchmark subject files had no staged or unstaged differences during the measurements. A source manifest additionally binds the actual files, so the commit alone is not used as a substitute for live-source identity. The SHA-256 of the canonical path/hash source list is `38743e88a2d8df56362762e1370ff5eb27d4c77b12323ec6da6c04039443b017`. Raw diagnostic output, temporary observer sources, source manifest, Apple response captures and logs are retained locally under the already ignored `.local-data/braid-program/eom-workstation-20260830/`. This is cost-instrument storage only, with no Braid Program scientific authority. No raw ledgers, binaries, generated corpus artifacts or new runtime implementation are added to Git.

| Local artifact | Bytes | Lines | SHA-256 |
| --- | ---: | ---: | --- |
| `evolution-results.json` | 1176652 | 47330 | `5db4e1666957a874f33e63e4859903071f88e63b250176fe1c0a80862d5e3727` |
| `block-results.json` | 66265 | 2210 | `7d7c5e439ed22e9ad12f623eca9f46e832d2cda7ef0343aad74987f5fab4ad0e` |
| `borg-six.json` | 11335530 | 275345 | `81097222b3e97d090cfe14eb3c130fa7672c0f28ae668ab1e9f04b62572b6128` |
| `source-manifest.json` | 13337 | 370 | `bc283667f415b5450e7cb351bbdbc3e43a3f08c42bff65e44de2ae8ddddb3710` |
| `prepare.py`, observation-only profiler transformation | 3053 | 53 | `2b6c8654cd893ae538b1ea70a9a2b64d6321c65a20948f3f587ec9b737b49f18` |
| `prepare-borg.py`, observation-only bridge transformation | 1447 | 21 | `c84a034378659521230e87723ab339ec7a1de8f64c4fff2dfa70eab64ec14fc7` |

Plainly: the document retains compact evidence and reproduction information; the verbose records remain local. Their file hashes bind the actual measured output, including variable timings, and are not promises of byte-identical regenerated benchmark files.

For the circular workload, SHA-256 of sorted-key compact JSON over the respective fingerprint arrays gives input `5db848fb22cc8cd7697febb24eae36d4e650cb03be4546a095110d6a4ffb1f2d` and accepted-history result `8c68caf4170964e6f3bed877aebf411bc857185f374c3539da1ee0e665c6c8a4`. The same encoding of the observer's step-status/time and accepted-root bracket/sign trace gives `701fd5a5686a89d5eb98d59f728e155be17675cc740e649b29ef8354b47a7b30`. These aggregate existing per-history provenance fingerprints; they are not a second independent numerical calculation. For Borg, SHA-256 of `canonicalStringify` over full input histories is `886dbaa3ff8c0d35c474558d76c8f65a3dee3913952278748c02829656bfb85d`, and over full returned histories is `50b49d399b26dd07ca8c9e4eef975f55a5c6d9dfa29216b0aef60c8e69a435e8`. Sorted-key compact JSON hashes of its complete step decisions and final acceleration snapshot are respectively `5a187a90a52440843737afab8f785edae2b12b05328aa06425d6d85b0a6e6c88` and `fa8aa5b0f6a18b35f7486fb4515654bc964f3972f2a0b4f0f794df98ef640095`.

Plainly: the history and decision hashes agree across workers; the resource configurations intentionally differ. Agreement proves repeatability of these runs, not correctness independent of the solver.

From the repository root, the unchanged base instruments reproduce the underlying workloads:

```bash
cmake -S src/eom -B /private/tmp/architrino-workstation-20260830-build -DCMAKE_BUILD_TYPE=Release
cmake --build /private/tmp/architrino-workstation-20260830-build --parallel 4
c++ -std=c++20 -O3 -DNDEBUG -ffp-contract=off -Isrc/eom/include scripts/eom/attractor-phase0-release-profile.cpp /private/tmp/architrino-workstation-20260830-build/libeom_native.a -L/opt/homebrew/lib -lmpfr -lgmp -pthread -o /private/tmp/architrino-workstation-20260830-build/phase0-profile
/private/tmp/architrino-workstation-20260830-build/phase0-profile --threads=4 --end-time=0.2 --output=/private/tmp/workstation-phase0.json
/private/tmp/architrino-workstation-20260830-build/eom_recursive_block_benchmark_cli recursive moving_dense 64 4 100000
node scripts/eom/run-borg-eom-refinement-ladder.mjs /private/tmp/architrino-workstation-20260830-build/eom_borg_shadow_cli 6
```

Plainly: vary only the worker count for a scaling comparison. The unmodified Borg command is the refinement gate, not the custom fixed-step scaling wrapper, and its coarse case currently fails.

To regenerate the observation packet locally, run the retained `prepare.py` and `prepare-borg.py` with `"${AAA_VENV:-../.venv}/bin/python"` from the repository root. They write observation-only copies under `/private/tmp/architrino-workstation-20260830/`. Compile `observed-profile.cpp` with the same command and library as above; `sweep.py` contains the counterbalanced evolution schedule, and `block-sweep.py` contains the corrected `traversal|recursive` block schedule. Run the retained `borg-scaling.mjs` with the rebuilt Borg binary and path count six. The initial attempted `complete` CLI route was rejected without producing a measurement; the actual supported route is `recursive`. The initial `/usr/bin/time -l` attempt encountered a sandbox-denied `sysctl`; retained evolution peak memory instead comes from `getrusage(RUSAGE_SELF)` in the observer, and the block CLI uses its own resident-memory instrument. No Borg peak-RSS claim is made.

If local raw artifacts are unavailable, the unchanged source drivers still reproduce the core workloads, but the observer-specific fingerprints and extra checkpoint/memory fields require reconstructing the described observation or recovering the hash-bound observer. Do not assert a fresh reproduction from this compact receipt alone. Store new trials separately, verify current source identities, and retain their volatile timing hashes separately from stable mathematical-input/result hashes.

Plainly: the receipt makes the evidence limits explicit even if the local cache is later removed.

## Validation and durable-capture decision

This analysis belongs in the existing EOM performance-planning lane, not in reader-facing theory prose. The performance survey gains one navigation link; no work-queue rank, lifecycle state, certified allocation, solver implementation, oracle or generated artifact changes. The source and benchmark review preserves unrelated checkout work. The fresh Release build, 35 history-layer tests, 36 coupled-evolution tests, all 60 extracted mathematical expressions through KaTeX 0.16.11, and all 24 local links pass. `validate-content.mjs --check --strict` reports zero errors and zero warnings; priority ranking, machine-artifact retention and `git diff --check` pass. The new document and the survey's two-line diff were reviewed, and the measured source manifest still matches every bound file. The Borg refinement failure remains explicitly recorded. No generated artifacts were rewritten, and these checks required no index or queue change.

Closure goal: measure and parallelize the joint receiver-certification path under unchanged numerical controls, then earn the first larger workstation budget with complete accepted-history, decision, memory and restart evidence.
