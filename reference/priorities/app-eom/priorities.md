# EOM

## Current

`EOM` is the endorsed solver and sole forward production target for architrino motion. It is an extremely high-performance Equation of Motion application whose defining responsibility is to accept retained path histories and a requested absolute-time interval, evolve those histories under the canonical Master Equation of Motion, and return the extended path histories plus the causal-root, branch, error, and execution records needed to judge the run. The immediate program is correctness-first, long-horizon evolution of the bounded populations needed by the claims-triage ledger and initial consumer migrations. The long-term scale program must reach a million active path identities through certified algorithmic reduction, native multithreading, SIMD/vectorization, memory locality, GPU compute, multi-GPU execution, distributed immutable histories, and streamed output. Numerical authority may require accuracy beyond the floating-point formats implemented directly by the selected hardware, especially when one run spans many orders of magnitude.

The existing central solver remains in place temporarily for dependency preservation while its consumers migrate. It is compatibility-only: no new consumer, physical capability, evidence claim, or forward solver work may use or extend it. Existing dependencies remain operational until each has an explicit EOM migration, quarantine, retained non-evolution role, or retirement decision.

This operator decision supersedes the earlier implementation assumption that every missing dynamical capability must be added to the current central solver. EOM is endorsed now, while canonical authority for any particular output remains gated by the frozen EOM contract, independent validation, and consumer migration requirements.

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

1. Treat EOM as the sole forward solver target. All new solver capabilities, app integrations, simulation work, and solver-derived evidence paths must use or extend EOM.
2. Leave the existing central solver and its current dependencies operational only as temporary compatibility during migration. Do not add new consumers or capabilities to it.
3. Treat current prescribed-path evaluation and current model-specific stepping as separate compatibility or analysis capabilities, not as EOM evolution.
4. EOM input may contain retained **past** path history. It may not contain a prescribed **future** path that constrains the answer.
5. Every EOM force row must come from the canonical Master EOM, including the declared causal-root condition, all admitted active roots, same-source roots when present, source-normal transversality, receiver-normal branch strength, polarity convention, and declared regularization.
6. Every accepted step must extend the same retained history that supplies later causal-root evaluations. The evolution loop is therefore history $\to$ roots $\to$ acceleration $\to$ next state $\to$ extended history.
7. Architrino primitives do not have physical mass. EOM must not introduce a physical architrino mass field.
8. Performance optimizations may change representation, scheduling, indexing, and evaluation order only when deterministic and precision-controlled validation shows that they preserve the declared mathematical result.
9. No app or knowledge-tree migration begins until the independent EOM acceptance gate passes.
10. Time resolution may span many orders of magnitude within one run. EOM must support multirate evolution in which fast paths and branch events receive fine steps while slow paths may advance on coarser schedules without breaking causal synchronization or silently changing the Master EOM.
11. If a slow sector is represented by a coarse-grained or renormalization-inspired reduced model rather than the same Master EOM at a coarser numerical cadence, that model must be declared as an approximation, validated against resolved runs, and prevented from claiming full EOM authority outside its measured envelope.
12. The long-term simulation envelope includes at least $10^6$ active path identities under `eom_evolution_contract/v0/amendment-1`. That profile gates only claims of million-path capability; it does not gate ledger-sized canonical evolution, the first binary outcome, or a bounded-population consumer migration. No interaction or retained-history contribution may be silently dropped to reach that scale; dense noncompressible workloads beyond the declared resource envelope must fail before publishing candidate evolution.
13. GPU and other accelerator paths remain required long-term research and implementation lanes. Their scheduling and promotion are benchmark-driven and depend on agreement with the independent oracle and declared precision budgets, not on speed alone. They do not block current bounded-population claims-triage runs unless measured CPU execution cannot meet the required horizon.
14. Hardware floating point is a fast path, not the universal precision ceiling. EOM must detect ill-conditioned rows and escalate through controlled extended, software multiprecision, arbitrary-precision, or certified-enclosure paths when the declared result cannot be resolved at the current precision.
15. The production language and runtime stack must be selected against the actual EOM workload: CPU threads, SIMD, GPU and multi-GPU support, deterministic reductions, precision escalation, memory control, diagnostics, portability, safety, and maintainability. A language is not selected merely because one isolated kernel benchmarks well.
16. The supported velocity domain includes $\|\mathbf V\|<c_f$, $\|\mathbf V\|=c_f$, and $\|\mathbf V\|>c_f$. Field-speed magnitude alone is not a reason to reject or clamp a path; actual source-normal, receiver-normal, root, and branch geometry determines the event route.
17. Every ordered receiver-source pair, including self-pairs, must be logically accounted for at every accepted receiver event. A zero-root pair is explicitly or certifiably inactive; it is not silently skipped. Large certified exclusion or aggregation records may cover many pairs when membership and error bounds remain traceable. Only the coincident same-source endpoint is excluded by the canonical convention.
18. The current native routine's `canonical_eom_evidence = 1` field is invalid for its implemented calculation. Preserve the routine for dependencies, but prohibit that field from entering new EOM authority or theory evidence.

## Workstream Metadata

- Kind: `priority`
- Status: `active-native-coupled-history-and-borg-shadow-architecture`
- Value: `highest`
- Claim level: `priority-design`
- Implementation status: `independent-oracle-phase-4-complete-reference; native-moving-history-traversal-connected-to-atomic-coupled-evolution; persistent-borg-worker-and-run-controls-executable; borg-shadow-promotion-blocked`
- Endorsed solver: `EOM`
- Existing solver status: `temporary-compatibility-only-pending-consumer-migration`

## Working Files

- [application-and-engine-contract.md](application-and-engine-contract.md) defines the first mathematical, numerical, performance, and application boundary.
- [evolution-contract-v0.md](evolution-contract-v0.md) is the frozen versioned requirement contract for requests, accepted-step semantics, output evidence, failures, validation, and the first binary-outcome gate.
- [evolution-contract-v0-amendment-1-million-path-scale.md](evolution-contract-v0-amendment-1-million-path-scale.md) is the frozen scale amendment requiring million-path manifests, complete compact pair accounting, certified sparse evolution, and fail-closed dense-workload handling.
- [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md) defines certified block exclusion, exact surviving-pair fallback, distributed retained-history ownership, heterogeneous batching, streamed output, and the million-path benchmark ladder.
- [master-eom-binding-v0.md](master-eom-binding-v0.md) is the frozen mathematical contract for the sharp and finite-width receiver-normal laws, core kernel, root aggregation, self-hit treatment, and caustic route.
- [precision-dynamic-range-and-certification-contract.md](precision-dynamic-range-and-certification-contract.md) is the frozen numeric acceptance contract for scale maps, split time, error budgets, certified decisions, precision escalation, heterogeneous execution, and failure behavior.
- [independent-dynamical-acceptance-oracle.md](independent-dynamical-acceptance-oracle.md) records the completed reference oracle: equation reference, certified root completeness, acceleration reconstruction, atomic coupled evolution, Phase 4 event and continuation controls, checkpoint/restart, refinement ladders, and the acceptance matrix.
- [language-and-numeric-architecture.md](language-and-numeric-architecture.md) defines the precision architecture and the evidence required to select the production language and accelerator stack.
- [../../architectural-decisions/eom-cpp-production-host.md](../../architectural-decisions/eom-cpp-production-host.md) records the operator-selected C++20 production host and MPFR/GMP difficult-row route.
- [performance-architecture-survey-and-baseline.md](performance-architecture-survey-and-baseline.md) records the executable Apple M3 CPU, Metal, oracle, storage, stationary block-exclusion, thread-scaling, and million-path projection baseline plus the evidence still missing for an architecture decision.
- [claims-triage-small-population-long-horizon-plan.md](claims-triage-small-population-long-horizon-plan.md) defines the bounded-population capabilities, execution order, and evidence gate needed to adjudicate the quarantined claims without waiting for million-path infrastructure.
- [current-solver-failure-audit.md](current-solver-failure-audit.md) records the verified native-routine failures, change dates, containment rule, and EOM counter-tests.
- [migration-plan.md](migration-plan.md) defines quarantine, shadow-run, and consumer migration sequencing.
- [brainstorming.md](brainstorming.md) holds provisional features, performance ideas, and later-stage possibilities.
- [work-log.md](work-log.md) holds dated decisions, status, validation, and handoffs.

## Immediate Priority Queue

1. `legacy_solver_containment_and_prediction_provenance` — Enforce EOM as the only forward solver target; inventory every existing consumer of prescribed paths, current-solver motion, or `canonical_eom_evidence`; prohibit new old-solver consumers or capabilities; separate conditional path analysis from evolved paths; and invalidate false dynamical authority. Status: `active-highest-containment-and-migration`; Borg no longer accepts central-solver compatibility output as EOM evidence, while the broader dependency and knowledge-tree audit remains open. Source: [migration-plan.md](migration-plan.md), [current-solver-failure-audit.md](current-solver-failure-audit.md). Depends on: none.
2. `claims_triage_small_population_long_horizon_evolution` — Adjudicate the ledger-sized retained-history engine fixtures without reviving the retired §97/§98 flutter claim. General evolved-history repairs now cover tolerance-valid uncertain simple roots, continuous segment-join roots, rigorous whole-interval sub-$c_f$ self exclusion, enclosed coincident endpoints, endpoint-continuation classification, and near-multiple self-root clusters that must use the finite-width causal-surface route. Native/oracle evolved-history parity is complete through the repaired checkpoint chain at $t=1.63$; the baseline continuation to the engine horizon $t=6.93$, step refinement, and prehistory-segment refinement remain active. Wall location must be reported against publication tolerance, including matched `2e-6` and `2e-7` rows, so a root-path repair is not conflated with cube-root noise-floor mitigation. Status: `active-horizon-refinement-and-tolerance-acceptance`; source: [claims-triage-small-population-long-horizon-plan.md](claims-triage-small-population-long-horizon-plan.md), [evidence/evolved-history-root-path-independent-diagnosis-2026-07-14.md](evidence/evolved-history-root-path-independent-diagnosis-2026-07-14.md), [../app-solver/claims-triage-ledger-2026-07-12.md](../app-solver/claims-triage-ledger-2026-07-12.md). Depends on: completed `independent_dynamical_acceptance_oracle` and the existing native correctness nucleus.
3. `coupled_retained_history_integrator` — Complete the production history-to-roots-to-acceleration-to-history kernel for ledger-sized long runs: enumerate every admitted sharp root for every ordered pair including self, route certified near-multiple strata through the bound finite-width law, evaluate the Master EOM, and advance coupled histories atomically. The repaired checkpoint replay crossed the sub-field enclosure wall and the later super-field self-root-cluster wall with unchanged root tolerances; horizon and refinement acceptance remain open. The exact-$v=c_f$ §86 onset is a cubic coincident-endpoint tangency classified as endpoint continuation, not an interior fold. Its four-way whole-step ablation refuted self-chord correlation and the exact-circle stable residual as cost levers. A clean serialized one-step attribution measured 99.2861% of wall time in exact-pair root certification, including 99.0248% in MPFR work, versus 0.7117% in finite-width execution. The 1,928-cell maximum is retained as a determinism check, not as a cost proxy; no pair/cell localization or further fold optimization is active. Status: `measured-mpfr-exact-root-cost-owner`. Depends on: completed native root, acceleration, and atomic-evolution layers.
4. `persistent_long_run_checkpoint_and_campaign_driver` — Keep retained histories resident across accepted windows; provide checkpoint/resume, deterministic campaign manifests, convergence ladders, perturbation batches, progress, cancellation, and claim observables without resending complete histories for every chunk. Status: `active-foundation`; single-host checkpointing and a persistent worker exist, while history residency and ledger campaign orchestration remain open. Depends on: `coupled_retained_history_integrator`.
5. `precision_convergence_and_failure_policy` — Propagate error budgets through interpolation, roots, branch evaluation, accumulation, integration, reductions, and output. Add split absolute time and retain MPFR escalation for difficult rows. Require the timestep, history-depth, sampling, regulator, perturbation, precision, and worker-count ladders used by each ledger claim; fail closed when certification fails. Status: `active-regulator-event-foundation`. Depends on: `coupled_retained_history_integrator`.
6. `deterministic_cpu_multithreading_and_simd` — Optimize the measured bounded-population long-horizon workload using bounded native threads, SIMD/vectorization, cache-aware layouts, deterministic reductions, cancellation, and single-thread replay. Status: `active-persistent-worker-cancellation-and-deterministic-replay`; SIMD proof and representative long-horizon measurements remain. Depends on: `coupled_retained_history_integrator`.
7. `first_binary_and_claim_outcome_gates` — Apply the base EOM contract to binary and claims-triage outcomes with complete histories, all partner and self-root families, event routes, adaptive long-horizon evolution, convergence, and perturbation stability. Status: `pending-ledger-campaign`; source: [evolution-contract-v0.md](evolution-contract-v0.md). Depends on: items 2–6, but not the million-path scale profile.
8. `eom_application_surface` — Complete the bounded-population run/inspect surface with retained-history import, duration and step controls, precision display, progress, cancellation, checkpointing, convergence, failure diagnostics, and provenance. Status: `active-borg-run-control-surface`. Depends on: the bounded-population portions of items 3–6.
9. `borg_shadow_run_and_first_migration` — Compare Borg's compatibility path with EOM from identical retained histories and migrate Borg when its 16-path precision, provenance, convergence, and app-interpretation gates pass. Status: `active-controlled-shadow-single-path-pass-full-population-precision-blocked`; all tested 16-path rows currently fail closed on the 240 off-diagonal ordered pairs. Million-path, GPU, multi-GPU, and distributed-history completion do not block this migration. Depends on: `eom_application_surface`, `legacy_solver_containment_and_prediction_provenance`.
10. `consumer_by_consumer_eom_migration_and_legacy_retirement` — Migrate every eligible existing consumer to EOM individually; classify the remainder as conditional prescribed-history analysis, geometry/root analysis, visualization-only playback, separate model, quarantine, or retirement; then remove the old solver when the dependency inventory reaches zero. No new work may enter the legacy side while this queue is open. Status: `active-containment-blocked-on-borg-migration`; source: [migration-plan.md](migration-plan.md). Depends on: `borg_shadow_run_and_first_migration`, `legacy_solver_containment_and_prediction_provenance`.

## Long-Term Scale Queue

These items remain contractual architecture goals, but they do not block ledger-sized canonical evolution, the first binary outcome, Borg migration, or other bounded-population consumer migrations.

1. `performance_architecture_survey_and_baseline` — Extend the measured CPU, SIMD, hierarchy, precision, storage, and output ladder through $10^4$, $10^5$, and $10^6$ paths after the immediate long-horizon workload is executable.
2. `large_population_algorithmic_scaling` — Complete compressed certified block exclusion, exact surviving-pair fallback, active-enclosure research, and noncompressible fail-closed admission for at least $10^6$ active paths.
3. `gpu_multi_gpu_and_heterogeneous_execution` — Promote accelerator kernels, difficult-row return, CPU/GPU pipelines, multi-GPU partitioning, deterministic reduction, and transfer overlap only through oracle and convergence agreement.
4. `distributed_history_streaming_and_restart` — Add distributed immutable history ownership, causal prefetch, atomic manifests, streamed output, and distributed checkpoint/restart.
5. `million_path_performance_and_acceptance_gate` — Pass `eom_evolution_contract/v0/amendment-1` with complete compact accounting of all $10^{12}$ ordered relationships, exhaustive nested controls, heterogeneous parity, distributed restart, and dense-workload fail-closed evidence.

## Bounded-Population Acceptance Boundary

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
- every backend actually used by the accepted run agrees with the independent oracle and CPU reference within the declared precision budget;
- checkpoint/restart reproduces uninterrupted continuation within the declared precision budget;
- no result claims EOM authority when the run used the current solver, a prescribed analytic path, a constrained replay, T3, or a display interpolation.

The million-path profile has its own later acceptance boundary in `eom_evolution_contract/v0/amendment-1`. It is required before claiming million-path capability, not before accepting a ledger-sized run or migrating a bounded-population consumer.

## Promotion Boundary

This priority area may produce an EOM application and validated simulation artifacts. It does not by itself certify a physical branch, promote a braid, validate a photon path, or change the AAA closure score. Corpus promotion requires EOM-evolved retained histories plus the branch, convergence, conservation, and independent-evidence rows required by the specific theory claim.
