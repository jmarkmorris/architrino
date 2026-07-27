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
- **Evidence / blocker:** Exact disk-backed history and clearance certification exist; general checkpoint/resume and campaign orchestration remain open. Depends on EOM-002.
- **Completion:** Interrupted and uninterrupted continuations agree under the declared budget, with complete manifest and history provenance.

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
- **Request / acceptance:** Complete certified block exclusion, exact surviving-pair fallback, active-enclosure research, and fail-closed dense admission for the million-path profile.
- **Evidence / blocker:** Sparse accelerating ladders exist; evolved-history, million-path, active-enclosure, GPU, distributed, and dense routes remain.
- **Completion:** Complete accounting covers the declared population without silently dropping any relationship.

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
