# Spatiotemporal Query Algorithm Survey

Status: `closed-prototype-benchmark-survey`

Kind: `solver-acceleration-survey`

Source task: `spatiotemporal_query_algorithm_survey` in [solver.md](solver.md)

Primary dependencies:

- [path-history-stream-contract.md](path-history-stream-contract.md)
- [simulation-envelope-contract.md](simulation-envelope-contract.md)
- [precision.md](precision.md)

## Purpose

This survey chooses the first broad-phase query direction for future central-solver acceleration. The target is not a new authority layer. The authoritative record remains the path-history chunk store plus the model, precision, and error-budget metadata. Query indices are acceleration metadata that propose candidate source, receiver, path, time, and shell ranges before the narrow-phase root and geometry solvers classify them.

The solver needs query support for:

- space blocks;
- time blocks;
- combined spacetime blocks;
- path-vs-emission-shell candidates;
- path-vs-path candidates;
- all-to-all interaction scans;
- same-source scans;
- speed-regime transition regions.

## Query Contract

Every broad-phase index must state its coverage guarantee. A complete index may reject a fast-query path only when its construction bounds prove the requested query family is covered. An incomplete, approximate, stale, or partial index must fall back to authoritative chunk replay or emit a slow-path diagnostic.

Required query outputs:

| Output | Meaning |
| --- | --- |
| Candidate key | Stable source stream, receiver stream, source segment, receiver segment, time slab, spatial block, and query family ids. |
| Coverage status | `complete`, `conservative`, `partial`, `stale`, or `unknown`. |
| Authority label | `broad-phase-only`; never authoritative root or geometry evidence. |
| Padding record | Spatial, temporal, numeric-chart, interpolation, and error-budget padding used to avoid false negatives. |
| Merge key | Deterministic ordering key for parallel source blocks, receiver blocks, time slabs, spatial blocks, and shell batches. |
| Fallback route | Authoritative chunk scan, stricter precision replay, or halted query when coverage cannot be established. |

The first acceptance rule is strict: a benchmarked broad phase may over-generate candidates, but it must not drop true candidates before the narrow phase sees them.

## Algorithm Family Survey

| Algorithm family | Best fit | Strengths | Weaknesses | Solver use |
| --- | --- | --- | --- | --- |
| Bounding-volume hierarchy | Path-vs-path, path-vs-emission-shell, sparse all-to-all blocks, curved segment bundles. | Handles nonuniform geometry, can bound swept segments and chunk-local path bundles, supports hierarchical rejection before narrow root solving. | Dynamic updates require refit or rebuild; dense all-to-all cases can degenerate; time must be added through slabs or 4-D bounds. | Strong second prototype for chunk-local path segment bounds and emission-shell candidate pruning. |
| Interval tree | Time blocks, membership intervals, same-source history ranges, speed-regime transition rows. | Simple, exact for interval overlap, cheap to build, natural fit for active-window age-out and event maps. | No spatial rejection by itself; all-to-all scans still need another index. | Required support index for time windows, source-history availability, same-source exclusions, and threshold-event lookup. |
| Spatial hashing | Space blocks, uniform-density active windows, parallel all-to-all candidate bins, future GPU-ready cell batches. | Simple implementation, deterministic cell ids, good parallel work partitioning, low overhead for uniform cells. | Cell size is a tuning parameter; variable density and many-scale coordinates can overfill cells; huge sparse domains need local-frame normalization. | Recommended first spatial backend inside time slabs because it is easy to validate and maps cleanly to work packets. |
| k-d tree | Point-sample range queries, nearest-neighbor diagnostics, low-dimensional spatial snapshots. | Adaptive to nonuniform point clouds and useful for sample inspection. | Less natural for swept segments, time intervals, dense dynamic updates, and shell annulus queries; harder to make chunk/packet deterministic. | Useful diagnostic or offline sample index, not first broad-phase backbone. |
| R-tree | Cold archival spacetime boxes, disk-backed chunk search, mixed spatial and temporal range queries. | Natural for rectangles or boxes, supports 3-D and 4-D range queries, fits deep archival indices. | More complex to implement and verify; overlapping boxes can degenerate in dense moving histories; less SIMD and packet friendly than cell slabs. | Strong later deep-index candidate for warm/cold path-history stores, especially after chunk finalization. |
| Sweep-and-prune | Hot active-window path-vs-path overlap, coherent adjacent frames, axis projections. | Very cheap when bounds move coherently; good incremental update path; easy to run per time slab. | Weak for high-speed crossing, shell annuli, large jumps, and noncoherent cold replay; axis-only rejection can over-generate heavily. | Good active-window supplement for path-vs-path and near-collision candidate scans. |
| Emission-shell-specific index | Path-vs-emission-shell, causal-root candidate search, same-source self-hit scans, speed-regime transition neighborhoods. | Encodes the actual query geometry: source emission time, source-center bound, shell radius interval, receiver path bounds, causal-speed policy, and field-speed threshold metadata. | Specialized; requires conservative shell-radius and center padding; cannot replace general path-vs-path or archival search. | Recommended first prototype because causal roots and delayed hits are the central solver bottleneck and the existing fixture already names emission-shell broad-phase queries. |

## Block Layout Comparison

| Layout | Best algorithm families | What it rejects well | What it misses without support | Recommendation |
| --- | --- | --- | --- | --- |
| Space blocks | Spatial hashing, bounding-volume hierarchy, sweep-and-prune, k-d tree for samples. | Spatially impossible path pairs, local neighbor scans, dense-cell pressure. | Long-history time availability, emission radius compatibility, same-source exclusions, and threshold events. | Use spatial hashing first, inside explicit time slabs; add chunk-local BVH when false positives dominate. |
| Time blocks | Interval tree, time-sorted sweep-and-prune, event maps. | Impossible source/receiver overlaps, unavailable source history, inactive membership intervals, stale chunks. | Spatial separation and emission-shell radius constraints. | Treat interval lookup as mandatory support for every query family. |
| Spacetime blocks | R-tree, 4-D BVH, time-slabbed spatial hash, chunk spacetime summaries. | Joint space/time impossibility, cold chunk lookup, replay mining, block-level all-to-all pruning. | Fine shell annulus geometry and path-local branch transitions unless extra rows are stored. | Use time-slabbed spatial hash for v0; reserve R-tree or 4-D BVH for deep archival index experiments. |

## Query Family Comparison

| Query family | Most useful first index | Support indices | Narrow-phase consumer | Notes |
| --- | --- | --- | --- | --- |
| Path-vs-emission-shell | Emission-shell-specific index over time slabs and spatial cells. | Interval tree for source/receiver segment ranges; spatial hash for receiver cell enumeration; speed-regime event rows. | Causal-root solver and delayed-hit solver. | This query best matches the solver's central bottleneck: find candidate receiver path segments touched by a source emission shell before root solving. |
| Path-vs-path | Sweep-and-prune for hot windows; BVH for chunk-local swept segments. | Interval tree for overlapping time ranges; spatial hash for uniform batches. | Collision, near-hit, shared geometry, and validation replay checks. | Use sweep-and-prune when frame coherence is high; use BVH when curved segment bundles and nonuniform density dominate. |
| All-to-all | Time-slabbed spatial hashing with deterministic source and receiver block packets. | BVH per dense cell or chunk; interval tree for active histories. | Pairwise causal-root and delayed-hit batches. | The index should reduce pair pressure but must still support explicit all-to-all mode when the model contract demands it. |
| Same-source | Emission-shell-specific self-query plus interval tree. | Speed-regime transitions, same-source exclusion windows, local segment bounds. | Same-source self-hit root solver and branch-transition diagnostics. | Plain spatial search is unsafe because same-source roots depend on path history, delay sign, exclusion policy, and field-speed crossing rows. |
| Speed-regime transitions | Event or interval tree keyed by threshold-crossing rows. | Local time slabs, emission-shell index, precision-path metadata. | Event-local root solver and precision escalation. | Treat transition rows as first-class query seeds, not as ordinary path samples hidden in a spatial index. |
| Candidate causal-root search | Emission-shell-specific index, then narrow root isolation. | Interval tree, spatial hash, local frames, branch-transition rows. | Root ledger with residual, Jacobian, branch status, and first-failure code. | Broad phase proposes only candidate brackets. Root existence, count, and branch status remain narrow-phase results. |

## Emission-Shell Index Sketch

The first prototype should be a conservative `emission_shell_index.v0` built from existing path-history chunks and stored as optional deep-index metadata.

Minimum row families:

| Row | Required fields |
| --- | --- |
| `time_slab` | Time bounds, frame bounds, chunk ids, stream span, local-frame id, and precision padding. |
| `receiver_cell` | Time slab id, spatial cell id, receiver stream ids, receiver segment ids, swept-segment bounds, and interpolation padding. |
| `source_emission` | Source stream id, source segment id, emission-time interval, source-center bound, causal-speed policy, and shell-radius interval for target hit slabs. |
| `shell_cell_candidate` | Source-emission row id, target time slab id, spatial cell id, shell radius interval, conservative intersection flag, and false-positive reason when known. |
| `speed_transition` | Stream id, time interval, speed-ratio range, threshold class, and precision-path escalation hint. |

The query is:

1. Select source emission rows and target receiver time slabs through interval overlap.
2. Convert each source emission row into a conservative shell annulus for the target slab.
3. Enumerate spatial hash cells whose conservative bounds intersect that annulus.
4. Emit receiver segment candidates from those cells with deterministic merge keys.
5. Send candidates to the narrow-phase causal-root solver.

The index may store bounding spheres, axis-aligned boxes, swept-segment boxes, or local-frame bounds. The v0 implementation should prefer axis-aligned local-frame cells plus conservative padding because they are easy to serialize, audit, and replay.

## Recommended First Prototype

Prototype a hybrid:

`interval-tree time slabs + spatial-hash receiver cells + emission-shell annulus rows`

This is the best first prototype because it tests the solver's hardest common query while staying implementable against the current stream contract. It is also naturally parallel: each source block, receiver block, time slab, spatial block, and emission-shell batch can become a work packet with a stable merge key.

First-prototype scope:

| Included | Deferred |
| --- | --- |
| Uniform local-frame spatial cells per time slab. | Full R-tree or 4-D BVH deep-index backend. |
| Conservative shell annulus intersection against receiver cells. | Exact shell-vs-curved-path classification in broad phase. |
| Interval lookup for source and receiver segment windows. | Dynamic online tree rebalancing for arbitrary edits. |
| Same-source option with explicit self-exclusion and positive-delay policy. | Full proof-program provider-object schemas. |
| Speed-regime transition flags as query seeds and precision hints. | GPU kernels or service backends. |
| Deterministic merge of candidate records before narrow phase. | Compression-tuned archival index formats. |

The first prototype should not attempt to be the final general index. Its job is to prove that the stream store can produce conservative path-vs-emission-shell candidates faster than brute-force chunk replay while preserving every true candidate.

## Benchmark Shape

Benchmark name: `emission_shell_broad_phase_query_v0`.

Synthetic run shape:

| Dimension | Sweep |
| --- | --- |
| Path count | 16, 64, 256, and 1024 paths. |
| Time slabs | 32 and 128 slabs per run. |
| Path families | Linear drift, circular paths, helical paths, clustered near-collision paths, and one same-source self-hit family. |
| Speed regimes | Sub-field-speed, near-field-speed, exact-threshold row, super-field-speed, and mixed transition rows using recorded $v / c_f$ ranges. |
| Density | Sparse uniform, clustered, and dense all-to-all stress cases. |
| Query modes | Path-vs-emission-shell, path-vs-path comparison, all-to-all, same-source-enabled, and speed-regime transition seeded. |
| Precision metadata | `scaled_f64_strict` baseline with local-frame padding; one `validation_replay` oracle pass for representative slices. |

Oracle:

- brute-force authoritative chunk replay over the same path segments;
- exact synthetic hit labels where the generator can provide them;
- narrow-phase root isolation for sampled candidate and rejected ranges.

Metrics:

| Metric | Required reason |
| --- | --- |
| Recall | Must be 1.0 against oracle true candidates for covered query families. |
| False-positive ratio | Measures how much narrow-phase work remains after broad-phase pruning. |
| Candidate count reduction | Compares indexed candidates against brute-force segment-pair count. |
| Build time and query time | Separates index construction cost from query acceleration. |
| Memory bytes per path sample | Keeps deep-index pressure visible to the simulation envelope. |
| Stream read volume | Measures whether the query actually avoids full chunk scans. |
| Deterministic merge check | Confirms parallel partitioning does not change candidate order or count. |
| Transition preservation | Confirms same-source and speed-regime transition candidates survive partitioning. |

Initial benchmark target:

1. Zero false negatives for path-vs-emission-shell candidates on all covered synthetic cases.
2. Deterministic candidate output across single-thread and partitioned work-packet order.
3. Lower candidate count than brute-force all-segment pairing on sparse and clustered cases.
4. Explicit diagnostic degradation on dense all-to-all cases rather than hidden candidate loss.
5. Recorded fallback to authoritative chunk replay when coverage metadata is stale, partial, or missing.

## Prototype Benchmark Evidence

Implemented solver API: `query_emission_shell_broad_phase_indexed_v0` in [Geometry.hpp](../../../src/solver/include/architrino/solver/Geometry.hpp) and [Geometry.cpp](../../../src/solver/src/Geometry.cpp).

Implemented app-facing ABI and bridge path: `architrino_solver_query_emission_shell_broad_phase_indexed_v0_f64`, `indexOptions.strategy = "emission_shell_broad_phase_v0"`, and `scanSummary.executionPath = "native_c_abi_indexed_v0"`.

Implemented benchmark case: `emission-shell-broad-phase-v0` in [solver_benchmark.cpp](../../../src/solver/native/solver_benchmark.cpp).

The v0 fixture builds synthetic source and receiver path-history streams, replays the rows from chunk-backed storage, compares the solver-owned indexed candidate set against brute-force chunk replay, and fails if any oracle broad-phase candidate is missing or if sampled narrow-phase hit counts change. It also splits each scenario into deterministic work packets, validates `solver-work-packet.v1` headers with `emission_shell_candidate.v1` outputs, merges packet results through the solver merge-order helper, and fails if packet replay changes the indexed candidate set.

Latest local benchmark run on 2026-06-20:

| Metric | Value |
| --- | ---: |
| Scenario count | 4 |
| Path-count sweep | 16, 64, 256, 1024 |
| Time-slab sweep | 32, 128 |
| Brute-force replay pairs | 1,118,464 |
| Brute-force candidates | 305 |
| Indexed pair tests | 18,981 |
| Indexed candidates | 305 |
| Missing oracle candidates | 0 |
| Broad-phase recall | 1.0 |
| Candidate count reduction | 0.999727 |
| Indexed pair-test reduction | 0.983029 |
| Sampled narrow-phase hits | 158 |
| Same-source candidates | 5 |
| Speed-regime transition candidates | 105 |
| Chunk replay rows | 2,720 |
| Chunk replay bytes | 261,120 |
| Work packets | 16 |
| Work-packet candidates | 305 |
| Work-packet missing candidates | 0 |
| Work-packet extra candidates | 0 |
| Work-packet merge-order mismatches | 0 |

This is a solver-owned native API, C ABI, app-bridge opt-in path, and benchmark fixture. Future scoped work may add larger stress coverage, make the indexed strategy the preferred default for supported envelopes, and add threshold-based performance acceptance.

## Decision

Adopt the emission-shell-specific hybrid as the first prototype. Keep bounding-volume hierarchies, R-trees, and sweep-and-prune as comparison candidates after the v0 fixture exists:

- compare a block-local BVH against the spatial-hash cell backend when clustered false positives dominate;
- compare an R-tree against time-slabbed spatial hashing for cold archival chunk lookup;
- compare sweep-and-prune against the hash backend for hot active-window path-vs-path workloads.

The first benchmark should answer one question before broadening: can the solver build a conservative, stream-backed path-vs-emission-shell broad phase that preserves every true candidate while reducing narrow-phase root work enough to justify the index?

## Completion Judgment

`spatiotemporal_query_algorithm_survey` is closed as a survey and first-prototype
selection artifact. The survey compares the relevant query families, selects the
emission-shell-specific hybrid, and records benchmark evidence for
`emission-shell-broad-phase-v0` against brute-force chunk replay. Larger
stress-scale thresholds, deterministic packet execution breadth, and solver
contract integration are future scoped implementation work, not blockers for
this survey closeout.
