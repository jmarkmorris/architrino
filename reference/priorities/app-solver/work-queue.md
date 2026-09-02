# EOM Work Queue

This is the canonical execution ledger for accepted App Solver work. [priorities.md](priorities.md) owns the solver contract, architecture, and acceptance boundary; this file owns locally ranked implementation and verification tasks.

## Next real work

`EOM-007` — complete the solver-owned bounded-population run and inspection surface.

## Rules

1. Rank each live unresolved object by marginal ROI; item 1 is the local winner.
2. Keep scientific campaign ownership outside this queue.
3. Use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn`; place contractual later-scale work in the deferred/blocked section.
4. Require an independent oracle or theorem for numerical-correctness claims.

## Ranked Next Objects

1. `eom_application_surface` — [EOM-007](#eom-007--eom-application-surface). Status: `Queued`.
2. `first_binary_and_claim_outcome_gates` — [EOM-006](#eom-006--first-binary-and-claim-outcome-gates). Status: `Deferred / blocked`.
3. `performance_architecture_survey_and_baseline` — [EOM-008](#eom-008--performance-architecture-survey-and-baseline). Status: `Deferred / blocked`.
4. `large_population_algorithmic_scaling` — [EOM-009](#eom-009--large-population-algorithmic-scaling). Status: `Deferred / blocked`.
5. `gpu_multi_gpu_and_heterogeneous_execution` — [EOM-010](#eom-010--gpu-and-heterogeneous-execution). Status: `Deferred / blocked`.
6. `distributed_history_streaming_and_restart` — [EOM-011](#eom-011--distributed-history-streaming-and-restart). Status: `Deferred / blocked`.
7. `million_path_performance_and_acceptance_gate` — [EOM-012](#eom-012--million-path-performance-and-acceptance-gate). Status: `Deferred / blocked`.

## Discussion-scoped

### EOM-013 — Safety-zone speed and accuracy assessment

- **Status:** discussion-scoped; assessment only, implementation requires an operator decision.
- **Priority object:** `architrino_safety_zone_assessment`; unranked pending an agreed operational scope, with the existing ranked next objects unchanged.
- **Request / acceptance:** Consider a numerical safety or exclusion zone around each architrino as a possible way to simulate much faster. Compare the potential speed benefit with accuracy loss when an unchanged-law trajectory would enter the zone, and with the cost of detecting and handling entry. Treat speedup and acceptable accuracy as unmeasured hypotheses, not established benefits or a physical size assigned to an architrino.
- **Operational questions:** Define the zone's shape, radius and any adaptive rule; distinguish separation at the same absolute time from receiver-to-delayed-emission separation; specify treatment of partner and self-history interactions. Define boundary equality, overlapping zones, and entry detection throughout a timestep, including interpolation uncertainty. Compare stopping or refining at entry with explicitly approximate continuation; select no clipping, softening, reflection, or omitted interaction by this task alone.
- **Evidence / blocker:** No zone definition or speed/accuracy measurement is accepted. Inspect the actual close-approach and root-evaluation paths against the [evolution contract](contracts/evolution-contract-v1.md), distinguishing the proposed zone from existing certified block exclusion. Any later authorized experiment must use $c_f=1$, matched initial histories and simulated duration, measured wall time and resource use, and independently checked unchanged-law controls both with and without zone entry. Test smaller radii and tighter timesteps; report path, acceleration, root-accounting and downstream fate differences, and mark any altered continuation's claim boundary explicitly.
- **Completion / falsifier:** Return a pros-and-cons assessment, a precise proposed operational definition, a reproducible comparison plan, and an operator decision to reject, defer, or authorize a bounded experiment. A later speed/accuracy claim fails if measured savings disappear after zone-handling costs, entries or roots are missed, or discrepancies exceed the declared accuracy budget. Implementation, contract changes, and braid-fate acceptance remain separately authorized work.

Plainly: the task asks whether avoiding expensive close encounters is worth the information lost, and exactly what the solver would do when a path reaches the proposed zone. It does not assume that keeping paths outside the zone reproduces the original motion.

## Queued

### EOM-007 — EOM application surface

- **Status:** Queued
- **Priority object:** `eom_application_surface`
- **Request / acceptance:** Complete retained-history import, duration/step controls, precision display, progress, cancellation, checkpointing, convergence, failure diagnostics, and provenance for bounded populations.
- **Evidence / blocker:** Borg already provides the current run-control consumer surface. Queue remaining surface work behind the coupled retained-history and precision acceptance boundary.
- **Completion:** The run/inspect surface exposes no app-local solver path and passes focused consumer integration checks.

## Deferred / blocked

### EOM-006 — First binary and claim outcome gates

- **Status:** Deferred / blocked
- **Priority object:** `first_binary_and_claim_outcome_gates`
- **Request / acceptance:** Apply the base EOM contract to a complete binary/claim run with histories, partner/self roots, event routes, long-horizon evolution, convergence, and perturbation stability.
- **Evidence / blocker:** EOM-002 is complete; this depends on EOM-003 through EOM-005. Scientific fate booking belongs to Braid Program.
- **Completion:** The run packet passes the frozen contract or returns a declared failure without overclaiming.

### EOM-008 — Performance architecture survey and baseline

- **Status:** Deferred / blocked
- **Priority object:** `performance_architecture_survey_and_baseline`
- **Request / acceptance:** Extend measured CPU, SIMD, hierarchy, precision, storage, and output baselines through $10^4$, $10^5$, and $10^6$ paths after the immediate kernel is executable.
- **Evidence / blocker:** Later-scale contractual goal.
- **Completion:** Reproducible profiles cover the declared ladder and expose dense/noncompressible failures.

### EOM-009 — Large-population algorithmic scaling

- **Status:** Deferred / blocked
- **Priority object:** `large_population_algorithmic_scaling`
- **Request / acceptance:** Extend the certified causal index from block exclusion plus exact surviving-pair evaluation to certified active aggregation for large populations. The target is an FMM-like reduction of both causal-root discovery and acceleration accumulation over receiver membership, source membership, and source-time slabs, while preserving exact fallback and fail-closed dense admission. This is an algorithmic enhancement to the EOM solver, not a change to the Master Equation or an imported physical law.
- **Mathematical target:** For receiver $i$ at accepted time $T$, every contributing source-history branch must satisfy $g_{ij}(T,S)=\lVert\mathbf X_i(T)-\mathbf X_j(S)\rVert-c_f(T-S)=0$. An admitted active source block $B$ must return a certified enclosure $\mathbf A_{iB}\in\widetilde{\mathbf A}_{iB}+\mathcal E_{iB}$ for each receiver, where $\mathcal E_{iB}$ covers root-count and branch-topology uncertainty, source-history approximation, kernel approximation, expansion or interpolation truncation, rounding, and deterministic reduction. Apply $c_f=1$ in every numerical fixture and benchmark.
- **Algorithmic precedent and boundary:** Use Greengard and Rokhlin, [“A Fast Algorithm for Particle Simulations”](https://doi.org/10.1016/0021-9991(87)90140-9) (1987), and Carrier, Greengard, and Rokhlin, [“A Fast Adaptive Multipole Algorithm for Particle Simulations”](https://doi.org/10.1137/0909044) (1988), as comparison precedents for hierarchical spatial clustering, admissibility, expansion, translation, and exact near-block evaluation. Those methods address an instantaneous spatial kernel; they do not certify delayed path-history roots, branch creation or loss, source-time boundaries, or EOM correctness.
- **Independent reference first:** Before changing the production aggregation path, freeze separately authored small-population controls: exhaustive ordered-pair root enumeration and acceleration summation, plus analytically known stationary and linear-history cases where available. Production and reference implementations must not be modified together to manufacture agreement. Each check must identify whether it establishes root completeness, branch identity, acceleration enclosure, accepted-state agreement, or only deterministic replay.
- **Certified admission work:** Define receiver/source/history block bounds strong enough to prove causal ordering and a stable contributing-root/branch ledger across the whole admitted block. A block containing a possible zero of its residual enclosure, a root birth or merger, a fold or near-multiple ambiguity, a source-history endpoint crossing, a sharp-chart boundary, or an unresolved self-history case must subdivide or route to exact evaluation. Point estimates, distance cutoffs, occupancy, and density alone cannot admit or exclude a block.
- **Active representation work:** Evaluate multipole, interpolation, low-rank, and kernel-independent representations only on blocks that passed causal and branch certification. Record expansion order or numerical rank, source-time resolution, coefficient/remainder bounds, validity interval, and reconstructible receiver/source/history membership. Reuse across accepted steps is allowed only while those certificates remain valid; invalidation must be deterministic and recorded.
- **Parallel execution work:** Parallelize certified-index construction, traversal, admissible-block transforms, and exact fallback tiles with bounded workers, deterministic receiver ownership, fixed reduction order, cancellation, and single-worker replay. Keep the algorithm and certificate format backend-neutral; EOM-010 owns GPU or heterogeneous realization, and EOM-011 owns distributed history placement and restart.
- **Complete-accounting invariant:** For every accepted step, every ordered relationship, including self-history, must appear exactly once in a disjoint route: certified exclusion, certified active aggregation, exact evaluation, or unresolved failure. The compact ledger must reconstruct each block's membership, time slab, certificate, error debit, fallback reason, and reduction position. No approximation may silently omit a relationship or collapse distinct causal branches.
- **Benchmark and break-even packet:** Compare direct exhaustive evaluation, the current certified-exclusion-plus-exact-fallback route, and the proposed active-aggregation route on matched stationary, linear, and evolved histories across uniform, clustered, sparse, adversarial, and dense populations. Measure accepted simulated time per wall-clock second, root and branch counts, index nodes visited, excluded and aggregated blocks, exact-pair fallback rate, subdivision depth, expansion order or rank, worker scaling, peak resident memory, history traffic, certificate overhead, and total error-budget use. Report the measured break-even population and geometry; asymptotic notation or reduced pair counts alone do not establish lower cost.
- **Dependencies / blocker:** EOM-002 must supply accepted coupled histories and complete ordered-pair semantics; EOM-004 must supply composable precision and failure budgets; EOM-005 supplies the bounded deterministic CPU execution baseline; and EOM-008 supplies the representative scaling profiles. The accepted [million-path execution architecture](contracts/million-path-certified-execution-architecture.md), [million-path amendment](contracts/evolution-contract-v1-amendment-1-million-path-scale.md), and [far-field contribution enclosure](contracts/far-field-contribution-enclosure.md) own the existing certificate and fallback boundaries. Sparse accelerating ladders and per-pair enclosures do not yet establish evolved-history active aggregation or a million-path route.
- **Completion:** An independent small-population packet establishes the same complete root/branch ledger and encloses the exhaustive acceleration and accepted state; results remain within the declared budget across worker counts and checkpoint continuation; the accounting ledger is complete and reconstructible; representative workloads show a measured break-even benefit; and dense or noncompressible cases subdivide, fall back, or stop without silently advancing. EOM-012 remains the separate million-path performance and acceptance gate.
- **Falsifier:** Reject or redesign the enhancement if any ordered relationship or causal branch is missing or duplicated, an independent-reference acceleration falls outside the declared enclosure, block reuse crosses a certificate boundary, worker count or restart changes a discrete accepted decision beyond policy, measured certificate/fallback overhead removes the claimed benefit, or a workload advances after its completeness or precision budget is unresolved.

Plainly: ordinary FMM groups distant particles using their positions at one time. This task may group work only after proving that an entire receiver/source/history block has the same safe causal structure. Ambiguous blocks return to smaller blocks or exact pair evaluation, so speed never comes from guessing away a delayed interaction.

### EOM-010 — GPU and heterogeneous execution

- **Status:** Deferred / blocked
- **Priority object:** `gpu_multi_gpu_and_heterogeneous_execution`
- **Request / acceptance:** Promote accelerator kernels and return paths only through deterministic reductions, convergence, CPU-reference agreement, and independent-oracle acceptance.
- **Evidence / blocker:** Does not block bounded-population CPU acceptance.
- **Completion:** Every used backend satisfies the declared precision and replay policy.

### EOM-011 — Distributed history streaming and restart

- **Status:** Deferred / blocked
- **Priority object:** `distributed_history_streaming_and_restart`
- **Request / acceptance:** Add distributed immutable history ownership, causal prefetch, atomic manifests, streamed output, and restart.
- **Evidence / blocker:** Depends on accepted local checkpoint/resume and scale architecture.
- **Completion:** Distributed restart reproduces uninterrupted execution within the declared budget.

### EOM-012 — Million-path performance and acceptance gate

- **Status:** Deferred / blocked
- **Priority object:** `million_path_performance_and_acceptance_gate`
- **Request / acceptance:** Pass the million-path amendment with complete compact accounting, nested controls, heterogeneous parity, distributed restart, and dense-workload evidence requiring verification before advancement.
- **Evidence / blocker:** Later capability claim; it does not gate bounded-population migration.
- **Completion:** The amendment’s full acceptance matrix passes.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
