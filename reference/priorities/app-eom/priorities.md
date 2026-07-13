# EOM

## Current

`EOM` is the new priority area for an extremely high-performance, heterogeneous-compute Equation of Motion application. Its defining responsibility is to accept retained path histories and a requested absolute-time interval, evolve those histories under the canonical Master Equation of Motion, and return the extended path histories plus the causal-root, branch, error, and execution records needed to judge the run. The performance program must reach a million active path identities through certified algorithmic reduction, native multithreading, SIMD/vectorization, memory locality, GPU compute, multi-GPU execution, distributed immutable histories, and streamed output. Numerical authority may require accuracy beyond the floating-point formats implemented directly by the selected hardware, especially when one run spans many orders of magnitude. The implementation language and accelerator stack are therefore architecture decisions to be earned by representative EOM benchmarks, not assumptions to be inherited from an existing app.

The existing central solver remains in place unchanged for dependency preservation. EOM is a new application and engine boundary. No current solver, app bridge, fixture, or downstream consumer is removed or silently redirected during the initial EOM build.

The operator decision establishing this workstream supersedes the earlier implementation assumption that every missing dynamical capability must be added to the current central solver. Before EOM becomes a production authority, repo-level solver-ownership guidance must be aligned with this decision. Until then, this packet is the controlling priority-stage design record for EOM and does not authorize claims that EOM already exists or that any current output was EOM-evolved.

## Objective

Build a native, extremely high-performance application with deterministic or explicitly reproducible heterogeneous execution whose fundamental operation is

$$
\left\{h_{i,T_0}\right\}_{i=1}^{N},\ [T_0,T_1]
\xrightarrow{\text{Master EOM}}
\left\{h_{i,T_1}\right\}_{i=1}^{N},
$$

where $h_{i,T_0}(\theta)=\mathbf X_i(T_0+\theta)$ contains the retained prehistory required by the delayed interaction law and $h_{i,T_1}$ contains that input history followed by the path segment evolved on $[T_0,T_1]$.

The future segment must be determined by the Master EOM. EOM must not accept a prescribed future path, path constraint, analytic orbit, or display curve as a substitute for evolution.

## Non-Negotiable Boundary

1. Leave the existing central solver and its current dependencies in place during EOM development.
2. Treat current prescribed-path evaluation and current model-specific stepping as separate compatibility or analysis capabilities, not as EOM evolution.
3. EOM input may contain retained **past** path history. It may not contain a prescribed **future** path that constrains the answer.
4. Every EOM force row must come from the canonical Master EOM, including the declared causal-root condition, all admitted active roots, same-source roots when present, source-normal transversality, receiver-normal branch strength, polarity convention, and declared regularization.
5. Every accepted step must extend the same retained history that supplies later causal-root evaluations. The evolution loop is therefore history $\to$ roots $\to$ acceleration $\to$ next state $\to$ extended history.
6. Architrino primitives do not have physical mass. EOM must not introduce a physical architrino mass field.
7. Performance optimizations may change representation, scheduling, indexing, and evaluation order only when deterministic and precision-controlled validation shows that they preserve the declared mathematical result.
8. No app or knowledge-tree migration begins until the independent EOM acceptance gate passes.
9. Time resolution may span many orders of magnitude within one run. EOM must support multirate evolution in which fast paths and branch events receive fine steps while slow paths may advance on coarser schedules without breaking causal synchronization or silently changing the Master EOM.
10. If a slow sector is represented by a coarse-grained or renormalization-inspired reduced model rather than the same Master EOM at a coarser numerical cadence, that model must be declared as an approximation, validated against resolved runs, and prevented from claiming full EOM authority outside its measured envelope.
11. The target simulation envelope includes at least $10^6$ active path identities under `eom_evolution_contract/v0/amendment-1`. No interaction or retained-history contribution may be silently dropped to reach that scale; dense noncompressible workloads beyond the declared resource envelope must fail before publishing candidate evolution.
12. GPU and other accelerator paths are required research and implementation lanes, not deferred possibilities. Their promotion depends on agreement with the independent oracle and declared precision budgets, not on speed alone.
13. Hardware floating point is a fast path, not the universal precision ceiling. EOM must detect ill-conditioned rows and escalate through controlled extended, software multiprecision, arbitrary-precision, or certified-enclosure paths when the declared result cannot be resolved at the current precision.
14. The production language and runtime stack must be selected against the actual EOM workload: CPU threads, SIMD, GPU and multi-GPU support, deterministic reductions, precision escalation, memory control, diagnostics, portability, safety, and maintainability. A language is not selected merely because one isolated kernel benchmarks well.
15. The supported velocity domain includes $\|\mathbf V\|<c_f$, $\|\mathbf V\|=c_f$, and $\|\mathbf V\|>c_f$. Field-speed magnitude alone is not a reason to reject or clamp a path; actual source-normal, receiver-normal, root, and branch geometry determines the event route.
16. Every ordered receiver-source pair, including self-pairs, must be logically accounted for at every accepted receiver event. A zero-root pair is explicitly or certifiably inactive; it is not silently skipped. Large certified exclusion or aggregation records may cover many pairs when membership and error bounds remain traceable. Only the coincident same-source endpoint is excluded by the canonical convention.
17. The current native routine's `canonical_eom_evidence = 1` field is invalid for its implemented calculation. Preserve the routine for dependencies, but prohibit that field from entering new EOM authority or theory evidence.

## Workstream Metadata

- Kind: `priority`
- Status: `active-performance-architecture-survey`
- Value: `highest`
- Claim level: `priority-design`
- Implementation status: `independent-oracle-phase-4-complete-reference`
- Existing solver status: `preserved-for-current-dependencies`

## Working Files

- [application-and-engine-contract.md](application-and-engine-contract.md) defines the first mathematical, numerical, performance, and application boundary.
- [evolution-contract-v0.md](evolution-contract-v0.md) is the frozen versioned requirement contract for requests, accepted-step semantics, output evidence, failures, validation, and the first binary-outcome gate.
- [evolution-contract-v0-amendment-1-million-path-scale.md](evolution-contract-v0-amendment-1-million-path-scale.md) is the frozen scale amendment requiring million-path manifests, complete compact pair accounting, certified sparse evolution, and fail-closed dense-workload handling.
- [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md) defines certified block exclusion, exact surviving-pair fallback, distributed retained-history ownership, heterogeneous batching, streamed output, and the million-path benchmark ladder.
- [master-eom-binding-v0.md](master-eom-binding-v0.md) is the frozen mathematical contract for the sharp and finite-width receiver-normal laws, core kernel, root aggregation, self-hit treatment, and caustic route.
- [precision-dynamic-range-and-certification-contract.md](precision-dynamic-range-and-certification-contract.md) is the frozen numeric acceptance contract for scale maps, split time, error budgets, certified decisions, precision escalation, heterogeneous execution, and failure behavior.
- [independent-dynamical-acceptance-oracle.md](independent-dynamical-acceptance-oracle.md) records the completed reference oracle: equation reference, certified root completeness, acceleration reconstruction, atomic coupled evolution, Phase 4 event and continuation controls, checkpoint/restart, refinement ladders, and the acceptance matrix.
- [language-and-numeric-architecture.md](language-and-numeric-architecture.md) defines the precision architecture and the evidence required to select the production language and accelerator stack.
- [current-solver-failure-audit.md](current-solver-failure-audit.md) records the verified native-routine failures, change dates, containment rule, and EOM counter-tests.
- [migration-plan.md](migration-plan.md) defines quarantine, shadow-run, and consumer migration sequencing.
- [brainstorming.md](brainstorming.md) holds provisional features, performance ideas, and later-stage possibilities.
- [work-log.md](work-log.md) holds dated decisions, status, validation, and handoffs.

## Initial Priority Queue

1. `performance_architecture_survey_and_baseline` — Measure the bound mathematical workload before selecting the production architecture: ordered-pair/root complexity, certified block-exclusion ratio, exact-pair fallback, history interpolation pressure, active-root density, branch divergence, precision-escalation frequency, memory bandwidth, transfer, reduction cost, storage, and streamed output. Prototype candidate-language CPU, SIMD, GPU, multi-GPU, hierarchical-search, and distributed-history kernels through the $10^4$, $10^5$, and $10^6$ population ladder against the oracle and exhaustive nested controls. Status: `ready`; source: [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md), [application-and-engine-contract.md](application-and-engine-contract.md), [language-and-numeric-architecture.md](language-and-numeric-architecture.md). Depends on: completed `independent_dynamical_acceptance_oracle`.
2. `language_runtime_and_accelerator_architecture_decision` — Select the production language and compute stack from the oracle-backed representative benchmarks. Record the decision, rejected alternatives, platform envelope, precision-library posture, accelerator route, and thin application boundary. Status: `pending`; source: [language-and-numeric-architecture.md](language-and-numeric-architecture.md). Depends on: completed `independent_dynamical_acceptance_oracle`, `performance_architecture_survey_and_baseline`.
3. `coupled_retained_history_integrator` — Implement the production history-to-roots-to-acceleration-to-history kernel: enumerate every admitted root for every ordered pair including self, evaluate the bound Master EOM, advance the coupled histories, and accept or reject atomically. Keep mathematical kernels separate from backend scheduling. Status: `pending`; depends on: `language_runtime_and_accelerator_architecture_decision`.
4. `many_orders_multirate_time_integration` — Support fixed, adaptive, event-focused, individual-path, and grouped block-step schedules spanning many orders of magnitude. Preserve causal synchronization, and classify any reduced slow-sector model as an approximation with a measured envelope. Status: `pending`; depends on: `coupled_retained_history_integrator`.
5. `large_population_algorithmic_scaling` — Reach at least $10^6$ active path identities through certified receiver-source-time block exclusion, exact surviving-pair evaluation, root continuation, distributed content-addressed history indices, receiver ownership, and later active aggregation only with certified topology and remainder bounds. Demonstrate complete disjoint pair coverage and fail closed on noncompressible workloads outside the resource envelope. Status: `pending`; source: [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md). Depends on: `performance_architecture_survey_and_baseline`, `coupled_retained_history_integrator`.
6. `deterministic_cpu_multithreading_and_simd` — Implement bounded native threads, measured SIMD/vectorization, cache-aware layouts, deterministic/reproducible reductions, worker controls, cancellation, progress, and single-thread replay. Status: `pending`; depends on: `performance_architecture_survey_and_baseline`, `coupled_retained_history_integrator`.
7. `gpu_multi_gpu_and_heterogeneous_execution` — Implement and benchmark accelerator kernels, difficult-row precision escalation, CPU/GPU pipelining, multi-GPU partitioning, transfer overlap, memory residency, and distributed extension. Require oracle and convergence agreement at each promotion. Status: `pending`; depends on: `performance_architecture_survey_and_baseline`, `coupled_retained_history_integrator`.
8. `precision_convergence_and_failure_policy` — Propagate error budgets through interpolation, roots, branch evaluation, accumulation, multirate integration, reductions, and output. Require convergence across timestep, history, precision, worker count, backend, population, and regulators; fail closed when certification fails. Status: `pending`; depends on: `many_orders_multirate_time_integration`, `deterministic_cpu_multithreading_and_simd`, `gpu_multi_gpu_and_heterogeneous_execution`.
9. `bounded_history_streaming_checkpoint_restart` — Provide immutable content-addressed history chunks, accelerator/host/local/distributed residency tiers, causal prefetch, high-throughput output manifests, indexed readback, atomic accepted-window publication, checkpoint/restart, recovery, and reproducible continuation at the million-path scale while preserving numeric and precision-escalation state. Status: `pending`; source: [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md). Depends on: `large_population_algorithmic_scaling`, `precision_convergence_and_failure_policy`.
10. `performance_envelope_and_scaling_gate` — Benchmark CPU, SIMD, GPU, heterogeneous, multi-GPU, and distributed paths across population, root density, history depth, timestep ratio, precision, and output load. Pass the million-path certified sparse-evolution profile, exhaustive nested parity controls, distributed restart/output reconstruction, and dense fail-closed control. Report scaling, block exclusion, exact-pair fallback, throughput, memory, transfer, escalation cost, utilization, and numerical agreement. Status: `pending`; source: [evolution-contract-v0-amendment-1-million-path-scale.md](evolution-contract-v0-amendment-1-million-path-scale.md). Depends on: `large_population_algorithmic_scaling`, `deterministic_cpu_multithreading_and_simd`, `gpu_multi_gpu_and_heterogeneous_execution`, `bounded_history_streaming_checkpoint_restart`.
11. `first_binary_outcome_gate` — Before deciding inward spiral, outward spiral, terminal state, or stable recurrence, run a two-architrino case with complete histories, partner and self-root families, branch transitions, receiver-normal/regulator rows, adaptive many-orbit evolution, convergence, and perturbation stability. A periodic claim requires return of the full retained history. Status: `pending`; source: [evolution-contract-v0.md](evolution-contract-v0.md). Depends on: `precision_convergence_and_failure_policy`, `performance_envelope_and_scaling_gate`.
12. `eom_application_surface` — Build the run/inspect surface with history import, interval/multirate controls, model and precision display, resource/backend controls, progress, cancellation, checkpointing, convergence, failure diagnostics, and provenance. Visualization remains subordinate to native evolution. Status: `pending`; depends on: `performance_envelope_and_scaling_gate`.
13. `prediction_provenance_and_knowledge_tree_quarantine` — Inventory every consumer of prescribed paths, current solver motion, or `canonical_eom_evidence`; separate conditional path analysis from evolved paths and invalidate false dynamical authority. Status: `active-audit-needed`; source: [migration-plan.md](migration-plan.md), [current-solver-failure-audit.md](current-solver-failure-audit.md). Depends on: none.
14. `borg_shadow_run_and_first_migration` — After EOM acceptance and performance gates pass, compare Borg's compatibility path with EOM from the same initial histories and migrate Borg only when provenance and app interpretation are correct. Status: `blocked-on-eom-validation`; depends on: `eom_application_surface`, `prediction_provenance_and_knowledge_tree_quarantine`.
15. `consumer_by_consumer_migration` — Audit and authorize every remaining consumer individually as EOM evolution, conditional prescribed-history analysis, geometry/root analysis, visualization-only playback, separate model, quarantine, or retirement. Status: `blocked-on-borg-migration`; source: [migration-plan.md](migration-plan.md). Depends on: `borg_shadow_run_and_first_migration`.

## First Acceptance Boundary

EOM is not ready for migration merely because it emits paths. The first accepted build must demonstrate all of the following on one run packet:

- the output path changes when the Master EOM interaction changes and does not change in response to any display-only or prescribed future path;
- each accepted step consumes only the retained history available at that step;
- one-architrino self-history, exact-$c_f$ motion, and super-$c_f$ motion enter the same EOM contract without a magnitude-based speed clamp;
- every ordered pair resolves to an active, inactive, excluded-coincidence, unresolved, or certified-pruned record, including every self-pair;
- perturbing field speed and available history changes the root ledger in the oracle cases designed to depend on those inputs;
- active roots, excluded roots, branch strengths, acceleration rows, and the appended next state share one run identity;
- summing the emitted per-root acceleration rows reconstructs the acceleration consumed by the accepted step bit-for-bit or within its declared rounding enclosure;
- reducing timestep and tightening root/history tolerances produce a convergent answer against the independent oracle;
- difficult rows escalate precision until their root count, signs, branch identity, and accepted state are certified within the declared budget, or the run halts without publishing the candidate step;
- single-thread and multithreaded executions agree under the declared deterministic reduction policy;
- multirate execution converges toward resolved common-step runs across the declared rate hierarchy;
- GPU and other promoted backends agree with the independent oracle and CPU reference within the declared precision budget;
- the million-path scale profile completes with disjoint full-domain pair accounting, certified block exclusions, exact surviving-pair fallback, immutable distributed histories, and streamed accepted output;
- large-population acceleration is checked against exhaustive smaller controls and reports conservative error bounds for every omitted or aggregated contribution;
- checkpoint/restart reproduces uninterrupted continuation within the declared precision budget;
- no result claims EOM authority when the run used the current solver, a prescribed analytic path, a constrained replay, T3, or a display interpolation.

## Promotion Boundary

This priority area may produce an EOM application and validated simulation artifacts. It does not by itself certify a physical branch, promote a braid, validate a photon path, or change the AAA closure score. Corpus promotion requires EOM-evolved retained histories plus the branch, convergence, conservation, and independent-evidence rows required by the specific theory claim.
