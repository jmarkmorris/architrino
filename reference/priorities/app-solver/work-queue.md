# EOM Work Queue

This is the canonical execution ledger for accepted App Solver work. [priorities.md](priorities.md) owns the solver contract, architecture, and acceptance boundary; this file owns locally ranked implementation and verification tasks.

## Next real work

`EOM-002` — close the bounded-population coupled retained-history kernel.

## Rules

1. Rank each live unresolved object by marginal ROI; item 1 is the local winner.
2. Keep scientific campaign ownership outside this queue.
3. Use `Queued`, `In progress`, `Awaiting verification`, `Verified`, `Superseded`, or `Withdrawn`; place contractual later-scale work in the deferred/blocked section.
4. Require an independent oracle or theorem for numerical-correctness claims.

## Ranked Next Objects

1. `coupled_retained_history_integrator` — [EOM-002](#eom-002--coupled-retained-history-integrator). Status: `In progress`.
2. `persistent_long_run_checkpoint_and_campaign_driver` — [EOM-003](#eom-003--persistent-long-run-checkpoint-and-campaign-driver). Status: `In progress`.
3. `precision_convergence_and_failure_policy` — [EOM-004](#eom-004--precision-convergence-and-failure-policy). Status: `In progress`.
4. `deterministic_cpu_multithreading_and_simd` — [EOM-005](#eom-005--deterministic-cpu-multithreading-and-simd). Status: `Queued`.
5. `first_binary_and_claim_outcome_gates` — [EOM-006](#eom-006--first-binary-and-claim-outcome-gates). Status: `Deferred / blocked`.
6. `eom_application_surface` — [EOM-007](#eom-007--eom-application-surface). Status: `Queued`.
7. `master_eom_binding_hash_drift` — [EOM-001](#eom-001--master-eom-binding-hash-drift). Status: `Queued`.
8. `performance_architecture_survey_and_baseline` — [EOM-008](#eom-008--performance-architecture-survey-and-baseline). Status: `Deferred / blocked`.
9. `large_population_algorithmic_scaling` — [EOM-009](#eom-009--large-population-algorithmic-scaling). Status: `Deferred / blocked`.
10. `gpu_multi_gpu_and_heterogeneous_execution` — [EOM-010](#eom-010--gpu-and-heterogeneous-execution). Status: `Deferred / blocked`.
11. `distributed_history_streaming_and_restart` — [EOM-011](#eom-011--distributed-history-streaming-and-restart). Status: `Deferred / blocked`.
12. `million_path_performance_and_acceptance_gate` — [EOM-012](#eom-012--million-path-performance-and-acceptance-gate). Status: `Deferred / blocked`.

## Discussion-scoped

### EOM-013 — Safety-zone speed and accuracy assessment

- **Status:** discussion-scoped; assessment only, implementation requires an operator decision.
- **Priority object:** `architrino_safety_zone_assessment`; unranked pending an agreed operational scope, with the existing ranked next objects unchanged.
- **Request / acceptance:** Consider a numerical safety or exclusion zone around each architrino as a possible way to simulate much faster. Compare the potential speed benefit with accuracy loss when an unchanged-law trajectory would enter the zone, and with the cost of detecting and handling entry. Treat speedup and acceptable accuracy as unmeasured hypotheses, not established benefits or a physical size assigned to an architrino.
- **Operational questions:** Define the zone's shape, radius and any adaptive rule; distinguish separation at the same absolute time from receiver-to-delayed-emission separation; specify treatment of partner and self-history interactions. Define boundary equality, overlapping zones, and entry detection throughout a timestep, including interpolation uncertainty. Compare stopping or refining at entry with explicitly approximate continuation; select no clipping, softening, reflection, or omitted interaction by this task alone.
- **Evidence / blocker:** No zone definition or speed/accuracy measurement is accepted. Inspect the actual close-approach and root-evaluation paths against the [evolution contract](contracts/evolution-contract-v1.md), distinguishing the proposed zone from existing certified block exclusion. Any later authorized experiment must use $c_f=1$, matched initial histories and simulated duration, measured wall time and resource use, and independently checked unchanged-law controls both with and without zone entry. Test smaller radii and tighter timesteps; report path, acceleration, root-accounting and downstream fate differences, and mark any altered continuation's claim boundary explicitly.
- **Completion / falsifier:** Return a pros-and-cons assessment, a precise proposed operational definition, a reproducible comparison plan, and an operator decision to reject, defer, or authorize a bounded experiment. A later speed/accuracy claim fails if measured savings disappear after zone-handling costs, entries or roots are missed, or discrepancies exceed the declared accuracy budget. Implementation, contract changes, and braid-fate acceptance remain separately authorized work.

Plainly: the task asks whether avoiding expensive close encounters is worth the information lost, and exactly what the solver would do when a path reaches the proposed zone. It does not assume that keeping paths outside the zone reproduces the original motion.

## In progress

### EOM-002 — Coupled retained-history integrator

- **Status:** In progress
- **Priority object:** `coupled_retained_history_integrator`
- **Request / acceptance:** Complete the production history-to-roots-to-acceleration-to-history kernel for bounded populations, including every ordered pair and self-pair, finite-width near-multiple routing, canonical Master Equation evaluation, and atomic history advancement.
- **Evidence / blocker:** Native root, acceleration, and atomic-evolution layers exist; post-transit horizon and broader refinement acceptance remain open. Display grade does not reduce this claim-grade burden.
- **Completion:** One bounded-population long-horizon packet passes root completeness, regulator/common-domain, refinement, precision, deterministic replay, and independent-oracle gates.

### EOM-003 — Persistent long-run checkpoint and campaign driver

- **Status:** In progress
- **Priority object:** `persistent_long_run_checkpoint_and_campaign_driver`
- **Request / acceptance:** Keep exact retained histories resident, retire prefixes only under solver-owned causal-support certification, and provide checkpoint/resume, crash-surviving manifests, progress, cancellation, deterministic replay, and reusable campaign execution.
- **Evidence / blocker:** Exact disk-backed history and clearance certification exist; general checkpoint/resume and campaign orchestration remain open. The concrete missing growth-memory defect found by the [CT-004 restart factorization audit](../category-theory/ct004-eom-restart-factorization-audit.md) is repaired and independently checked: checkpoint `v7` preserves the exact consecutive-headroom count, and diagnostic cuts after one, two and four accepted steps preserve the original horizon, later step decisions and complete retained-history tokens. The [repair receipt](work-log.md#2026-08-27--adaptive-growth-memory-checkpoint-repair) records 36 passing tests and 366 additional independent checks. Older incomplete checkpoint formats are explicitly rejected, not silently migrated. Restart cache-use telemetry remains different and is not claimed identical. General continuation-state sufficiency and campaign orchestration still depend on EOM-002.
- **Completion:** Preserve or lawfully reconstruct every continuation-critical controller field beyond the now-checked growth-memory repair. Interrupted and uninterrupted continuations must agree in discrete decisions and complete accepted records under the declared budget, with complete manifest and history provenance.

### EOM-004 — Precision convergence and failure policy

- **Status:** In progress
- **Priority object:** `precision_convergence_and_failure_policy`
- **Request / acceptance:** Propagate certified budgets through interpolation, roots, branches, accumulation, integration, reductions, and output; escalate precision or halt without publishing a candidate.
- **Evidence / blocker:** The open burden is live snapshot-row summation, the actual 18-by-18 endpoint-corrector Krawczyk enclosure, coefficient/remainder append and cache retention, and unchanged-hash adjudication.
- **Completion:** Declared ladders converge against the independent oracle and difficult rows either certify or fail closed.

## Queued

### EOM-005 — Deterministic CPU multithreading and SIMD

- **Status:** Queued
- **Priority object:** `deterministic_cpu_multithreading_and_simd`
- **Request / acceptance:** Optimize the measured bounded-population workload with bounded threads, SIMD, cache-aware layouts, deterministic reductions, cancellation, and single-thread replay.
- **Evidence / blocker:** Persistent worker, cancellation, and replay exist; SIMD proof and representative long-horizon measurements remain. Queue this after the coupled retained-history and precision acceptance horizon are executable.
- **Completion:** Measured speed and cost evidence accompanies deterministic agreement and independent-oracle checks.

### EOM-007 — EOM application surface

- **Status:** Queued
- **Priority object:** `eom_application_surface`
- **Request / acceptance:** Complete retained-history import, duration/step controls, precision display, progress, cancellation, checkpointing, convergence, failure diagnostics, and provenance for bounded populations.
- **Evidence / blocker:** Borg already provides the current run-control consumer surface. Queue remaining surface work behind the coupled retained-history and precision acceptance boundary.
- **Completion:** The run/inspect surface exposes no app-local solver path and passes focused consumer integration checks.

### EOM-001 — Master-EOM binding hash drift

- **Status:** Queued
- **Source:** [Borg code review A1](../app-borg/borg-code-review-2026-07-24.md)
- **Request / acceptance:** Repair the App Solver provenance binding so the declared Master Equation source snapshot and recorded digest remain synchronized under an explicit owning procedure. Either refresh the binding through that procedure or replace the repeatedly drifting whole-document pin with a stable, explicitly owned source snapshot and enforced update rule.
- **Current evidence:** `reference/priorities/app-solver/contracts/master-eom-binding-v1.md` pins `9ec3045d316bcbcc60dc3e61fcfaad4642b83af857024856f6684364ef7cab4d`, while the live `content/markdown/aaa/dynamics/master-equation.md` currently hashes to `f1ae1137484b7c5367eb094ad49a0bfdfb72161d21aa06556de4e0ba2d99d72c`. `tests/borg-eom-migration.test.js:492-516` therefore leaves the Borg family at 164/165.
- **Boundary:** This is an App Solver provenance-contract repair, not a Borg runtime regression or an acceptance claim for solver output.
- **Completion:** The recorded digest equals a fresh SHA-256 of its declared source under the adopted binding rule, and `node --test tests/borg-*.test.js` passes 165/165.

## Deferred / blocked

### EOM-006 — First binary and claim outcome gates

- **Status:** Deferred / blocked
- **Priority object:** `first_binary_and_claim_outcome_gates`
- **Request / acceptance:** Apply the base EOM contract to a complete binary/claim run with histories, partner/self roots, event routes, long-horizon evolution, convergence, and perturbation stability.
- **Evidence / blocker:** Depends on EOM-002 through EOM-005; scientific fate booking belongs to Braid Program.
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
