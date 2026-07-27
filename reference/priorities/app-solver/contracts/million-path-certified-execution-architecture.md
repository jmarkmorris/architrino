# Million-Path Certified Execution Architecture

## Status

- Architecture id: `eom_million_path_execution/v0`
- Stage: `accepted-priority-design`
- Governing amendment: [eom_evolution_contract/v0/amendment-1](./evolution-contract-v1-amendment-1-million-path-scale.md)
- Mathematical model: unchanged `master_eom_binding/v0`
- Numeric contract: unchanged `eom_numeric_certification/v0`
- Implementation status: not started
- Production authority: none

## Architectural Outcome

The million-path engine is not a loop that calls the independent pair oracle
$10^{12}$ times. The oracle defines and tests one correctness unit. Production
execution operates on content-addressed history blocks, proves large regions of
the ordered-pair domain root free, compacts the surviving work into
heterogeneous batches, and preserves exact or enclosed accounting through the
accepted history append.

The baseline authority boundary is deliberately asymmetric:

- **inactive blocks:** may be collapsed by a certified root-free proof;
- **possibly active blocks:** subdivide until exact ordered-pair evaluation;
- **active aggregation:** prohibited until a separate root-topology and force
  remainder certificate fits the accepted-state error budget;
- **unresolved work:** rejects the complete candidate execution window.

This makes performance an implementation of the existing mathematical domain,
not permission to redefine it.

## Scale Model

For $N$ paths, $H$ hot history segments per path, segment footprint
$s_{\mathrm{seg}}$, and $N_R$ receivers active in one event window,

$$
M_{\mathrm{hot}}\approx NHs_{\mathrm{seg}},
\qquad
P_{\mathrm{logical}}=N_R N.
$$

Illustratively, with $N=10^6$ and $s_{\mathrm{seg}}=320$ bytes, $H=32$
requires about $10.24$ GB before indices and execution buffers, while $H=128$
requires about $40.96$ GB. Arbitrary-precision rows can be larger. Hot history
therefore cannot be assumed to fit on one accelerator, and output cannot be an
inline response object.

The implementation reports separate scale counts for path identities, retained
segments, logical ordered relationships, candidate tiles, exact pair rows,
roots, and output rows. These quantities must not be conflated in performance
claims.

## Data Plane

### Global Manifest

The run manifest binds:

- ordered path identities and polarity/charge metadata;
- immutable retained-history chunk identities;
- model, amendment, numeric-policy, scheduler, and backend versions;
- receiver-owner partition and source-history shard map;
- causal-index root identity;
- resource projection and output/checkpoint destinations.

The manifest is small enough for every control-plane participant. Coefficients,
history samples, and output rows remain in chunks.

### History Chunk Layout

The production layout is structure-of-arrays by coefficient, coordinate,
derivative, error radius, and path identity. Each chunk covers a bounded path
membership set and accepted time slab. It carries:

- stable epoch plus local time coordinates;
- polynomial or declared dense-output coefficients;
- interpolation and source-data enclosures;
- spatial bounding boxes and velocity bounds over the slab;
- predecessor and content hashes;
- backend-neutral serialization for restart and stricter replay.

Chunks are immutable after acceptance. New evolution appends new chunks and a
new manifest. Garbage collection and cold compression cannot remove history
still reachable by any admitted causal search.

### Residency Tiers

1. Accelerator memory holds the active receiver state, active source slabs,
   causal-index nodes, and current work queues.
2. Host memory holds a larger hot-history window, precision-escalation inputs,
   and asynchronous transfer buffers.
3. Local non-volatile storage holds checkpoint and near-cold chunks.
4. Distributed storage holds content-addressed history and output shards.

Prefetch follows certified causal reach and scheduled receiver windows. A
cache miss may stall or reschedule work; it cannot be interpreted as root-free.

## Certified Causal Index

The causal index is a hierarchy over receiver membership, source membership,
and source time slabs. Each node stores outward bounds sufficient to construct
the amendment's residual interval $\mathcal G_{RB}(I)$.

Traversal returns exactly one of four routes:

1. `excluded`: zero is outside the block residual enclosure;
2. `subdivide`: the block is inconclusive and has children;
3. `exact_tile`: the block is inconclusive and meets the exact-batch size or
   conditioning policy; every covered pair is promoted to a complete retained-
   interval exact search;
4. `unresolved`: certification or resources failed, rejecting the candidate
   window.

An optional monotonicity route may also exclude a block when a valid separation
direction enclosure exists, the entire $D_s$ enclosure has one strict sign, and
the corresponding endpoint residual enclosures prove absence. If the block
separation enclosure contains coordinate coincidence, the direction-based
route is unavailable and the node subdivides.

The block tree is rebuilt or incrementally refit only from accepted history.
Predictor paths never enter the authoritative index.

## Work Decomposition

### Receiver Ownership

The preferred distributed partition assigns each active receiver to exactly one
owner for an accepted event window. Source-history chunks are replicated,
cached, or fetched according to causal reach. Receiver ownership has three
advantages:

- one location owns the receiver's complete logical pair coverage;
- exact and enclosed contributions reduce locally before any cross-node state
  commit;
- output history has one writer per receiver.

If memory forces source partitioning, partial receiver sums merge through a
versioned fixed tree with an enclosure covering every permitted schedule. The
tree identity becomes part of the step record.

### Heterogeneous Queues

Work is compacted into queues by mathematical condition, not merely hardware:

| Queue | Work | Authority route |
| --- | --- | --- |
| Block-bound bulk | Bounding boxes, delay bounds, and residual enclosures | Promoted SIMD/GPU enclosure kernel or stricter replay. |
| Exact regular pairs | History interpolation, residual cells, simple roots, and regular acceleration records | Batched CPU SIMD or GPU kernels under the common budget. |
| Difficult roots | Near-zero $D_s$, close roots, folds, or uncertain root counts | Stricter device kernel, CPU extended precision, arbitrary precision, or interval service. |
| Difficult reductions | Strong cancellation or budget overflow | Expansion, long accumulator, arbitrary precision, or interval reduction. |
| Storage and checkpoint | Immutable chunk writes, hashes, and manifest preparation | Asynchronous, but unable to mutate accepted state. |

Queue migration preserves the original row or block identity. A stricter result
replaces a candidate; it does not create a second contribution.

### Multi-GPU And Distributed Scheduling

- Partition receiver-owner ranges first.
- Cache source slabs on devices with the greatest causal demand.
- Batch transfers by immutable chunk identity and overlap them with independent
  receiver work.
- Steal unopened receiver tiles, never partially reduced receiver state, unless
  the deterministic merge policy explicitly supports it.
- Reserve CPU capacity for control flow, high-precision replay, event handling,
  manifest assembly, and failure diagnosis.
- Apply backpressure before output or checkpoint queues can exhaust the accepted
  resource envelope.

## Execution Pipeline

One accepted execution window follows this order:

1. Validate the input manifest, amendment, model, numeric policy, and resource
   projection.
2. Select active receiver events under the multirate schedule.
3. Resolve required source-history chunks and verify content hashes.
4. Traverse certified block bounds and emit exclusion records or exact tiles.
5. Deduplicate the surviving tile memberships, promote each surviving ordered
   pair once, and compact complete-pair searches into regular and difficult root
   queues.
6. Certify complete roots and evaluate canonical acceleration rows.
7. Merge every receiver's block memberships and exact rows; verify complete,
   disjoint pair coverage.
8. Reduce acceleration under the declared deterministic or enclosed policy.
9. Construct all candidate path extensions from the same immutable accepted
   state.
10. Complete correction, event, precision, and accepted-state checks.
11. Prepare output chunks and the next manifest without publishing them.
12. Commit the accepted window atomically across receiver owners, or discard all
    candidate chunks and emit the exact first failure.

## Complexity And Honest Limits

Let $B$ be visited block nodes, $P_{\mathrm{exact}}$ surviving exact pairs,
$R$ admitted roots, and $Q$ stricter replays. The useful workload measure is

$$
W
\sim
C_B B
+C_P P_{\mathrm{exact}}
+C_R R
+C_Q Q
+C_{\mathrm{io}}.
$$

The architecture succeeds when certified exclusion keeps $B$ and
$P_{\mathrm{exact}}$ within the declared resource envelope. It does not provide
a worst-case subquadratic bound for arbitrary Master-EOM histories. If nearly
all $N^2$ relationships remain active and noncompressible, the engine must
project the cost, request an adequate distributed envelope, shorten or
repartition the requested work, or return `resource_envelope_exceeded` before
publishing candidate evolution.

No visual similarity, neighbor cutoff, average-density assumption, or
uncertified multipole claim may conceal this limit.

## Output And Restart

The application response contains a compact run summary plus content-addressed
manifests for:

- complete evolved retained histories;
- root, exclusion, interaction, and step ledgers;
- numeric and backend provenance;
- checkpoints and continuation state;
- optional display derivatives.

Output chunks are partitioned by receiver-owner range and accepted time slab.
The caller may stream chunks while evolution continues, but a manifest exposes
only accepted chunks. Display sampling may be much coarser than integration or
history storage and is explicitly non-authoritative.

Restart reloads the manifest, hot history, causal-index root, active branch
identities, multirate scheduler, precision state, deterministic reduction tree,
and pending resource policy. A restarted run must reproduce the uninterrupted
continuation under the declared reproducibility contract.

## Benchmark And Promotion Ladder

1. Exhaustive single-thread controls at small $N$.
2. CPU block-exclusion parity against exhaustive pair searches.
3. GPU block-bound candidates with independent CPU enclosure replay.
4. Promoted GPU enclosure kernels after directed-bound validation.
5. Multi-GPU receiver ownership with deterministic local reduction.
6. Distributed immutable-history fetch, atomic accepted-window commit, and
   restart.
7. Population ladder $N=10^4$, $10^5$, and $10^6$ with reported exclusion,
   exact-pair, root, escalation, memory, transfer, storage, and output metrics.
8. Million-path certified sparse evolution and dense control required for advancement from
   the governing amendment.

No benchmark stage grants EOM authority until the independent oracle,
convergence, ledger reconstruction, and evidence negative controls also pass.

## Implementation Boundaries

- The independent Python oracle remains correctness-first and is not ported into
  the production batch engine.
- The production language remains an evidence-gated decision.
- Block exclusion, root solving, interaction evaluation, history storage,
  reduction, integration, and visualization remain separate modules.
- The first accepted implementation performs exact surviving-pair evaluation;
  active hierarchical aggregation is a later independently certified feature.
