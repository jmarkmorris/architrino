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

### EOM-014 — GPU harness static test reads a removed document

- **Status:** Queued; routed here on 2026-09-06 from [OPS-020](../aaa-operations/work-queue.md#ops-020--release-gate-profile-coverage). Repository-state defect only; no solver claim is affected.
- **Priority object:** `gpu_harness_static_test_repair`; unranked, small.
- **Defect:** `tests/solver-gpu-harness-static.test.js` reads `reference/priorities/app-solver/gpu-feasibility-harness.md` at load time and asserts that `priorities.md` links to it. Commit `4ea188081` (2026-07-16) deleted that document, and `priorities.md` no longer links it, so the test has failed with `ENOENT` for seven weeks. Its other two tests, which check that `solver-gpu-harness.html` and `src/apps/solver-gpu-harness/main.js` keep CPU parity and WebGPU detection explicit, never run because the read happens at module scope. Grade: measured on 2026-09-06 by running the file, `git show --name-status 4ea188081`, `find reference -name gpu-feasibility-harness.md`, and `grep` over `priorities.md`. The file is not among the 27 the PR gate can reach, which is why the deletion passed.
- **Decision needed:** Whether the harness's exploratory, non-authoritative status is now stated somewhere else in this lane that the test should read instead, or whether the third test is dropped and the first two kept. Do not restore the deleted document to satisfy the test.
- **Completion:** The file passes with its wiring and parity assertions intact, and the status assertion either points at the live owner of that statement or is removed with the reason recorded here.

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


## Recursive Block Exclusion Accelerating-Population Ladder

Folded on 2026-09-05 from `app-solver/analysis/recursive-block-exclusion-accelerating-population-ladder.md`, which was a separate file that had no reader and no promotion route. Content is unchanged apart from heading depth.

#### Status

- Packet id: `eom_recursive_block_exclusion_accelerating_population_ladder/v0`
- Date opened: 2026-07-16
- Claim level: `derived-and-measured-bounded-cpu-evidence`
- Implementation status: `complete-for-declared-accelerating-population-ladder`
- Production authority: none
- Parent packet: [Recursive Block Exclusion Moving-Population Ladder](#recursive-block-exclusion-moving-population-ladder)
- Evidence: [eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md)

#### Closure Target

Measure the unchanged deterministic recursive causal index on accepted accelerating piecewise-cubic retained histories. The round succeeds only if the joined histories retain complete pair accounting, independent exclusion correctness, deterministic membership, full-interval exact fallback, and a measured sparse wall-time advantage over exhaustive exact certification where the control fits the declared envelope.

#### Accelerating-History Fixture Contract

Every receiver and source path contains two contiguous cubic segments over $[0,1]$ and $[1,2]$. Position and velocity agree exactly at the join. Every segment has a nonzero quadratic or cubic position coefficient, so no path is stationary or merely linear. Receiver and source coefficients vary by path, and the second segment changes the acceleration polynomial rather than repeating the first segment.

The sparse fixture contains a small causally active accelerating source band and a far accelerating root-free population. Its root node must remain inconclusive and force deterministic receiver, source, and emission subdivision. The dense fixture must remain noncompressible through the leaf policy and route every admitted relationship to exact fallback or reject the population at resource preflight.

#### Unchanged Correctness And Approximation Boundary

- Build authoritative bounds only from histories explicitly marked accepted.
- Account for every ordered receiver-transmitter relationship, including self-pairs when receiver and source membership share an identity.
- Preserve `logical = excluded + exact + enclosed + unresolved`, with `enclosed = 0` for this path and `unresolved = 0` before acceptance.
- If any emission cell survives exclusion, search that pair's complete retained interval, including both sides of the segment join, exactly.
- Preserve causal ordering and the canonical coincident-endpoint convention.
- Treat every inconclusive block by subdivision, exact fallback, or unresolved rejection.
- Do not add a distance cutoff, sampled-residual decision, neighbor rule, density assumption, active aggregation, multipole, or other approximation.

#### Independent Validation

Use the independently authored decimal interval and exact-pair oracle without modifying it. On a nested small accelerating population:

- expand every `excluded` node into its ordered pairs and emission interval;
- require the decimal oracle to certify zero roots for every expanded row;
- require at least one independently certified active root among exact- fallback pairs over the complete $[0,2]$ interval;
- require at least one excluded or exact search interval to cross the segment join at $S=1$;
- retain coincident geometry and accelerating same-history self-pair controls;
- require identical membership and accounting under repeated runs and the permitted exact-batch thread counts.

#### Performance Ladder

Rebuild before measurement and record source, library, and binary times. Run accelerating sparse populations at $N=128$, $512$, $2{,}048$, and $10{,}000$. The final stage has a declared 120-second wall and 2 GiB resident-memory ceiling. Time traversal plus complete exact certification of every fallback pair.

Run matched one-thread exhaustive controls at $N=128$ and $512$, then stop exhaustive evaluation above its declared one-million-pair ceiling. Report wall seconds, logical pairs, visited blocks, excluded pairs, exact fallback pairs, exclusion ratio, exact-search reduction, peak resident memory, seconds per logical pair, membership fingerprint, and complete-path speedup.

Run the accelerating dense control at $N=128$ and $512$, then apply the same one-million-pair preflight at $N=2{,}048$. Stop the dense ladder at the first resource rejection. Long runs emit heartbeats and remain observed. Cost claims come only from matched end-to-end wall timing.

#### Stop Conditions And Falsifiers

Stop without weakening the certificate if an independently detected root lies in an excluded accelerating block, accounting overlaps or omits membership, an accepted result has nonzero unresolved membership, a retained-history join is not continuous, the sparse complete path fails to outperform matched exhaustive certification, or the declared wall or memory ceiling is exceeded.

Correctness is overturned by any such observation or by any permitted- schedule membership difference. Performance is overturned if the matched sparse advantage disappears under the declared repeat protocol. This packet cannot establish arbitrary evolved-history, million-path, GPU, distributed, active-aggregation, or production-evolution performance.

#### Deliverables

- scoped accelerating benchmark fixtures and tests;
- a focused evidence record under `evidence/`;
- a concise dated [work-log.md](work-log.md) entry;
- measured sparse and dense accelerating-population ladders;
- claim grades and explicit falsifiers.


## Deterministic Recursive Block-Exclusion First Path

Folded on 2026-09-05 from `app-solver/analysis/recursive-block-exclusion-first-path.md`, which was a separate file that had no reader and no promotion route. Content is unchanged apart from heading depth.

#### Status

- Packet id: `eom_recursive_block_exclusion_first_path/v0`
- Date opened: 2026-07-16
- Claim level: `priority-design`
- Implementation status: `complete-for-declared-first-path-round`
- Production authority: none
- Governing contracts: [evolution-contract-v1-amendment-1-million-path-scale.md](contracts/evolution-contract-v1-amendment-1-million-path-scale.md) and [million-path-certified-execution-architecture.md](contracts/million-path-certified-execution-architecture.md)

#### Closure Target

Implement and measure the first deterministic recursive large-population block-exclusion path over accepted retained histories. The path must prove complete ordered-pair accounting and measure the exact pair searches avoided on a staged population ladder. This round ends at CPU recursive exclusion, complete exact surviving-pair fallback, independent correctness controls, and matched performance evidence. It does not include GPU, distributed execution, active-contribution aggregation, or million-path production integration.

#### Required Traversal Contract

The causal index is bounded by a declared node, exact-pair, wall-time, and memory envelope. Each visited receiver-membership, source-membership, and emission-interval block returns exactly one route:

1. `excluded`: an outward-rounded residual enclosure proves the complete block root free;
2. `subdivide`: the enclosure is inconclusive and deterministic child blocks remain;
3. `exact_tile`: the declared leaf policy has been reached, so every covered ordered pair is promoted to complete retained-interval exact certification;
4. `unresolved`: certification or the resource envelope fails, rejecting the candidate window.

Splits are deterministic and may divide receiver membership, source membership, or emission interval. Traversal preserves causal ordering and the canonical coincident-endpoint convention. Authoritative bounds use only accepted retained histories; predictor or rejected candidate histories cannot enter the index.

#### Complete Pair Accounting

Every ordered receiver-transmitter relationship is present, including self-pairs. The disjoint relationship ledger obeys

$$
P_{\mathrm{logical}}
=
P_{\mathrm{excluded}}
+P_{\mathrm{exact}}
+P_{\mathrm{enclosed}}
+P_{\mathrm{unresolved}}.
$$

This first path has no active-contribution enclosure, so $P_{\mathrm{enclosed}}=0$. Acceptance requires $P_{\mathrm{unresolved}}=0$. Time-cell decisions collapse to one complete relationship outcome: if any time cell for a pair survives exclusion, that pair's complete retained interval enters exact certification and the pair is counted only in $P_{\mathrm{exact}}$.

Membership records must be deterministic, complete, and nonoverlapping. An inconclusive block subdivides or falls back to exact evaluation; it is never classified as inactive.

#### Exclusion Implication To Prove

For receiver membership $R$, source membership $B$, emission interval $I$, positive field speed $c_f$, separation enclosure $\mathcal D_{RB}(I)=[d^-_{RB},d^+_{RB}]$, and causal-delay enclosure $\Delta_{RB}(I)=[\Delta^-_{RB},\Delta^+_{RB}]$, the outward residual enclosure is

$$
\mathcal G_{RB}(I)
=
\left[
d^-_{RB}-c_f\Delta^+_{RB},
d^+_{RB}-c_f\Delta^-_{RB}
\right].
$$

The implementation evidence must state the inclusion proof: every covered pair-time residual lies in $\mathcal G_{RB}(I)$; therefore, if $0\notin\mathcal G_{RB}(I)$, no covered pair-time point satisfies the causal root equation. The proof must identify the outward-rounding implementation and the accepted-history inputs that support the bounds.

#### Prohibited Approximations

This path cannot use distance cutoffs, sampled-residual decisions, neighbor heuristics, average-density assumptions, active-force aggregation, multipoles, or another approximation. It cannot silently drop a retained-history contribution. A resource or certification failure produces `unresolved` and rejects the candidate result.

#### Independent Validation Matrix

Do not modify an independent oracle in the same change as the EOM solver implementation. Compare the block results against the existing independently authored decimal-interval and exact-pair oracles and against analytically known constant-history cases.

Required adversarial controls are:

- a root-free block;
- an active-root block;
- interval overlap near zero;
- coincident geometry;
- self-pairs;
- a dense noncompressible population.

The controls must show that no independently detected active root lies inside an `excluded` block. Repeated runs and every permitted thread count must emit byte-identical membership and accounting.

#### Performance Ladder

Rebuild before measurement and record source, static-library, and executable timestamps. Run staged populations such as $N=128$, $512$, $2{,}048$, and $10{,}000$, stopping safely when the declared wall-time or memory ceiling is reached. Use both sparse/root-free and dense/inconclusive populations.

Where exhaustive exact-pair evaluation is feasible, compare it with recursive block traversal under matched histories, reception time, emission interval, numeric policy, thread count, and host load. Report:

- wall seconds;
- logical pairs;
- visited blocks;
- excluded pairs;
- exact fallback pairs;
- exclusion ratio;
- exact-search reduction;
- peak memory;
- seconds per logical pair.

Cost conclusions come only from matched wall timing, not from block or cell counts. Long runs emit a heartbeat and remain observed until completion or a declared stop.

#### Stop Conditions

Stop and report without weakening the certificate if:

- an independently detected root lies in an `excluded` block;
- membership accounting is incomplete or overlapping;
- the dense workload does not fit the declared resource envelope; or
- recursive traversal does not outperform exhaustive evaluation on the intended sparse case.

#### Deliverables And Falsifiers

The round delivers a scoped EOM solver implementation and tests, a focused record under `evidence/`, a concise dated entry in [work-log.md](work-log.md), measured compression and performance results, and claim grades on every conclusion.

Correctness is overturned by any independently detected root inside an `excluded` membership, any duplicate or missing ordered pair, any accepted result with nonzero unresolved membership, any nonaccepted history used to build an authoritative bound, or any permitted schedule that changes the membership ledger. Performance is overturned when a matched sparse control does not reduce wall time relative to exhaustive exact-pair certification, or when the reported advantage disappears under the declared repeat protocol.


## Recursive Block Exclusion Moving-Population Ladder

Folded on 2026-09-05 from `app-solver/analysis/recursive-block-exclusion-moving-population-ladder.md`, which was a separate file that had no reader and no promotion route. Content is unchanged apart from heading depth.

#### Status

- Packet id: `eom_recursive_block_exclusion_moving_population_ladder/v0`
- Date opened: 2026-07-16
- Claim level: `derived-and-measured-bounded-cpu-evidence`
- Implementation status: `complete-for-declared-moving-population-ladder`
- Production authority: none
- Parent packet: [Deterministic Recursive Block-Exclusion First Path](#deterministic-recursive-block-exclusion-first-path)
- Evidence: [eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md)

#### Closure Target

Measure the existing deterministic recursive causal index on accepted nonstationary retained histories without changing its exclusion implication, relationship accounting, exact-fallback rule, or prohibited-approximation boundary. The round succeeds only if moving sparse populations retain complete pair accounting, independent exclusion correctness, deterministic membership, and a measured wall-time advantage over exhaustive exact certification where that control fits the declared envelope.

#### Moving-History Fixture Contract

Every receiver and source path has a continuous accepted retained history with nonzero velocity over the searched interval. The primary ladder uses distinct linear histories, which are exact degree-one members of the existing piecewise-cubic representation. Receiver and source velocities vary by path so the block position hulls and exact causal residuals genuinely depend on emission time; a translated stationary population does not satisfy this packet.

The sparse fixture contains a small causally active moving source band and a far moving root-free population. Its root block must be inconclusive, forcing recursive receiver, source, and emission subdivision before the index can separate exclusions from complete exact fallback. The dense fixture keeps the declared leaf population inconclusive and must either send all relationships to exact fallback or reject the population at resource preflight.

#### Unchanged Correctness Boundary

- Build authoritative bounds only from histories explicitly marked accepted.
- Account for every ordered receiver-transmitter relationship, including self-pairs when receiver and source membership share an identity.
- Preserve `logical = excluded + exact + enclosed + unresolved`, with `enclosed = 0` for this path and `unresolved = 0` before acceptance.
- If any emission cell survives exclusion, search that pair's complete declared retained interval exactly.
- Preserve causal ordering and the canonical coincident-endpoint convention.
- Treat every inconclusive block by subdivision, exact fallback, or unresolved rejection.
- Do not add a distance cutoff, sampled-residual decision, neighbor rule, density assumption, active aggregation, multipole, or other approximation.

#### Independent Validation

Use the independently authored decimal-interval and exact-pair oracle without modifying it. On a nested small moving population:

- expand every `excluded` block into its covered ordered pairs and emission interval;
- require the decimal oracle to certify zero roots for every expanded row;
- require at least one independently certified active root among the pairs promoted to exact fallback;
- include moving coincident geometry and a moving same-history self-pair in the retained regression set;
- require byte-identical membership and accounting across repeated runs and the permitted exact-batch thread counts.

#### Performance Ladder

Rebuild before measurement and record source, library, and binary times. Run moving sparse populations at $N=128$, $512$, $2{,}048$, and $10{,}000$, with a declared 90-second wall and 2 GiB resident-memory ceiling for the final stage. Time the complete path: recursive traversal plus complete exact certification of every fallback pair.

Run matched one-thread exhaustive exact-pair controls at $N=128$ and $512$, then stop exhaustive evaluation when its declared one-million-pair ceiling is exceeded. Report wall seconds, logical pairs, visited blocks, excluded pairs, exact fallback pairs, exclusion ratio, exact-search reduction, peak resident memory, seconds per logical pair, membership fingerprint, and complete-path speedup.

Run the moving dense control at $N=128$ and $512$, then apply the same one-million-pair preflight at $N=2{,}048$. Stop the dense ladder at the first resource rejection and do not launch a later dense stage.

Long runs emit a heartbeat and remain observed. Cost conclusions come only from matched end-to-end wall timing.

#### Stop Conditions And Falsifiers

Stop without weakening the certificate if an independently detected root lies in an excluded moving block, pair accounting overlaps or omits membership, an accepted result has nonzero unresolved membership, the moving sparse complete path fails to outperform matched exhaustive certification, or the declared wall or memory ceiling is exceeded.

Correctness is overturned by any such observation or by any difference in membership under a repeated permitted schedule. Performance is overturned if the matched moving sparse advantage disappears under the declared repeat protocol. No result from this packet establishes arbitrary accelerating- history, million-path, GPU, distributed, or production-evolution performance.

#### Deliverables

- scoped moving-population benchmark fixtures and tests;
- a focused evidence record under `evidence/`;
- a concise dated [work-log.md](work-log.md) entry;
- measured sparse and dense moving-population ladders;
- claim grades and explicit falsifiers.
