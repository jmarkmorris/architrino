# EOM

## Current

`EOM` is the endorsed solver and sole forward production target for architrino motion. It is an extremely high-performance Equation of Motion application whose defining responsibility is to accept retained path histories and a requested absolute-time interval, evolve those histories under the canonical Master Equation of Motion, and return the extended path histories plus the causal-root, branch, error, and execution records needed to judge the run. The immediate program is correctness-first, long-horizon evolution of bounded populations and initial consumer migrations. The long-term scale program must reach a million active path identities through certified algorithmic reduction, native multithreading, SIMD/vectorization, memory locality, GPU compute, multi-GPU execution, distributed immutable histories, and streamed output. Numerical authority may require accuracy beyond the floating-point formats implemented directly by the selected hardware, especially when one run spans many orders of magnitude.

EOM is the only engine. No other engine may be introduced or cited.

EOM is endorsed now, while canonical authority for any particular output remains gated by the frozen EOM contract, independent validation, and consumer migration requirements.

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
2. Treat current prescribed-path evaluation and current model-specific stepping as separate compatibility or analysis capabilities, not as EOM evolution.
3. EOM input may contain retained **past** path history. It may not contain a prescribed **future** path that constrains the answer.
4. Every EOM force row must come from the canonical Master EOM, including the declared causal-root condition, all admitted active roots, same-source roots when present, source-normal transversality, receiver-normal branch strength, polarity convention, and declared regularization.
5. Every accepted step must extend the same retained history that supplies later causal-root evaluations. The evolution loop is therefore history $\to$ roots $\to$ acceleration $\to$ next state $\to$ extended history.
6. Architrino primitives do not have physical mass. EOM must not introduce a physical architrino mass field.
7. Performance optimizations may change representation, scheduling, indexing, and evaluation order only when deterministic and precision-controlled validation shows that they preserve the declared mathematical result.
8. No app or knowledge-tree migration begins until the independent EOM acceptance gate passes.
9. Time resolution may span many orders of magnitude within one run. EOM must support multirate evolution in which fast paths and branch events receive fine steps while slow paths may advance on coarser schedules without breaking causal synchronization or silently changing the Master EOM.
10. If a slow sector is represented by a coarse-grained or renormalization-inspired reduced model rather than the same Master EOM at a coarser numerical cadence, that model must be declared as an approximation, validated against resolved runs, and prevented from claiming full EOM authority outside its measured envelope.
11. The long-term simulation envelope includes at least $10^6$ active path identities under `eom_evolution_contract/v0/amendment-1`. That profile gates only claims of million-path capability; it does not gate bounded-population canonical evolution, the first binary outcome, or a bounded-population consumer migration. No interaction or retained-history contribution may be silently dropped to reach that scale; dense noncompressible workloads beyond the declared resource envelope must fail before publishing candidate evolution.
12. GPU and other accelerator paths remain required long-term research and implementation lanes. Their scheduling and promotion are benchmark-driven and depend on agreement with the independent oracle and declared precision budgets, not on speed alone. They do not block current bounded-population runs unless measured CPU execution cannot meet the required horizon.
13. Hardware floating point is a fast path, not the universal precision ceiling. EOM must detect ill-conditioned rows and escalate through controlled extended, software multiprecision, arbitrary-precision, or certified-enclosure paths when the declared result cannot be resolved at the current precision.
14. The production language and runtime stack must be selected against the actual EOM workload: CPU threads, SIMD, GPU and multi-GPU support, deterministic reductions, precision escalation, memory control, diagnostics, portability, safety, and maintainability. A language is not selected merely because one isolated kernel benchmarks well.
15. The supported velocity domain includes $\|\mathbf V\|<c_f$, $\|\mathbf V\|=c_f$, and $\|\mathbf V\|>c_f$. Field-speed magnitude alone is not a reason to reject or clamp a path; actual source-normal, receiver-normal, root, and branch geometry determines the event route.
16. Every ordered receiver-source pair, including self-pairs, must be logically accounted for at every accepted receiver event. A zero-root pair is explicitly or certifiably inactive; it is not silently skipped. Large certified exclusion or aggregation records may cover many pairs when membership and error bounds remain traceable. Only the coincident same-source endpoint is excluded by the canonical convention.

## Workstream Metadata

- Kind: `priority`
- Rank: `1`
- Value: `63.47`
- Cost: `4.7`
- ROI: `13.50`
- Status: `active-bounded-population-long-horizon-evolution`
- Claim level: `priority-design`
- Implementation status: `independent-oracle-phase-4-complete-reference; native-moving-history-traversal-connected-to-atomic-coupled-evolution; persistent-borg-worker-and-run-controls-executable; borg-accepted-initial-history-promotion-complete`
- Endorsed solver: `EOM`

## Working Files

- [application-and-engine-contract.md](application-and-engine-contract.md) defines the first mathematical, numerical, performance, and application boundary.
- [evolution-contract-v0.md](evolution-contract-v0.md) is the frozen versioned requirement contract for requests, accepted-step semantics, output evidence, failures, validation, and the first binary-outcome gate.
- [evolution-contract-v0-amendment-1-million-path-scale.md](evolution-contract-v0-amendment-1-million-path-scale.md) is the frozen scale amendment requiring million-path manifests, complete compact pair accounting, certified sparse evolution, and fail-closed dense-workload handling.
- [million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md) defines certified block exclusion, exact surviving-pair fallback, distributed retained-history ownership, heterogeneous batching, streamed output, and the million-path benchmark ladder.
- [master-eom-binding-v0.md](master-eom-binding-v0.md) is the frozen mathematical contract for the sharp and finite-width receiver-normal laws, core kernel, root aggregation, self-hit treatment, and caustic route.
- [master-eom-binding-v0-amendment-1-common-domain-matching.md](master-eom-binding-v0-amendment-1-common-domain-matching.md) is the ratified binding amendment for regulator-limit common-domain matching with a certified positive-regulator remainder; it changes neither boxed acceleration law nor any error budget.
- [far-field-contribution-enclosure.md](far-field-contribution-enclosure.md) defines the certified per-pair contribution bound, declared acceleration-budget slice, pre-root classification, and complete enclosed-pair ledger route.
- [precision-dynamic-range-and-certification-contract.md](precision-dynamic-range-and-certification-contract.md) is the frozen numeric acceptance contract for scale maps, split time, error budgets, certified decisions, precision escalation, heterogeneous execution, and failure behavior.
- [certified-error-budget-ledger.md](certified-error-budget-ledger.md) defines the ratified dimensionally coherent Interactive and Research certified-budget records, including ordinary-state propagation, receiver-total event allocation, provenance, and the no-independent-overlap result.
- [master-eom-binding-v0-amendment-2-run-selected-certified-budgets.md](master-eom-binding-v0-amendment-2-run-selected-certified-budgets.md) is the ratified amendment for versioned run-selected close-encounter budgets.
- [evidence/borg-certified-budget-sensitivity-apple-m3-2026-07-18.md](evidence/borg-certified-budget-sensitivity-apple-m3-2026-07-18.md) records the pre-ratification deterministic OAT and combined tolerance matrix, population scaling, finite-width regulator timing, interval inconsistency adjudication, and provisional Interactive selection.
- [evidence/borg-certified-budget-v7-implementation-validation-apple-m3-2026-07-18.md](evidence/borg-certified-budget-v7-implementation-validation-apple-m3-2026-07-18.md) records the V7 implementation, independent controls, corrected state-width comparison, and the failed Research-parity acceptance gate.
- [evidence/borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md](evidence/borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md) isolates the first V7 root-width mechanisms on seeds 0–3 and records the representation-first, no-new-budget-yet adjudication.
- [independent-dynamical-acceptance-oracle.md](independent-dynamical-acceptance-oracle.md) records the completed reference oracle: equation reference, certified root completeness, acceleration reconstruction, atomic coupled evolution, Phase 4 event and continuation controls, checkpoint/restart, refinement ladders, and the acceptance matrix.
- [language-and-numeric-architecture.md](language-and-numeric-architecture.md) defines the precision architecture and the evidence required to select the production language and accelerator stack.
- [../../architectural-decisions/eom-cpp-production-host.md](../../architectural-decisions/eom-cpp-production-host.md) records the operator-selected C++20 production host and MPFR/GMP difficult-row route.
- [performance-architecture-survey-and-baseline.md](performance-architecture-survey-and-baseline.md) records the executable Apple M3 CPU, Metal, oracle, storage, stationary block-exclusion, thread-scaling, and million-path projection baseline plus the evidence still missing for an architecture decision.
- [brainstorming.md](brainstorming.md) holds provisional features, performance ideas, and later-stage possibilities.
- [work-log.md](work-log.md) holds dated decisions, status, validation, and handoffs.

## Immediate Priority Queue

1. `coupled_retained_history_integrator` — Complete the production history-to-roots-to-acceleration-to-history kernel for bounded-population long runs: enumerate every admitted sharp root for every ordered pair including self, route certified near-multiple strata through the bound finite-width law, evaluate the Master EOM, and advance coupled histories atomically. Amendment 1 regulator matching now supports the first certified seed-0 finite-width transit; post-transit horizon and broader refinement acceptance remain open. Status: `active-production-kernel`. Depends on: completed native root, acceleration, and atomic-evolution layers.
2. `persistent_long_run_checkpoint_and_campaign_driver` — Keep retained histories resident across accepted windows; provide checkpoint/resume, deterministic campaign manifests, convergence ladders, perturbation batches, progress, cancellation, claim observables, and reusable ensemble execution without resending complete histories for every chunk. Adopt the checkpointed attractor-search harness and measured cost instrument as EOM capabilities while leaving seed choice, persistence criteria, fate classification, and collapse adjudication with the consuming scientific program. Status: `active-foundation`; single-host checkpointing, a persistent worker, and the attractor-search harness exist, while history residency and general campaign orchestration remain open. Depends on: `coupled_retained_history_integrator`.
3. `precision_convergence_and_failure_policy` — Propagate error budgets through interpolation, roots, branch evaluation, accumulation, integration, reductions, and output. Add split absolute time and retain MPFR escalation for difficult rows. Require the timestep, history-depth, sampling, regulator, perturbation, precision, and worker-count ladders used by each claim; fail closed when certification fails. Amendment 2 and both complete preset records are ratified; V7, receiver-total event allocation, provenance, state-width propagation, the UI selector, unchanged-Decimal-oracle containment, and deliberate under-budget rejection are implemented. Research parity is still open because scalar isotropic segment radii create interior-root width floors on seeds 1–2 and independently inflated segment joins create join-root width floors on seeds 0 and 3. The next remedy is a componentwise, join-correlated representation under the unchanged Research budget; a new budget is not yet justified. Status: `active-regulator-event-foundation; amendment-2-implemented-acceptance-blocked-on-research-parity`. Depends on: `coupled_retained_history_integrator`.
4. `deterministic_cpu_multithreading_and_simd` — Optimize the measured bounded-population long-horizon workload using bounded native threads, SIMD/vectorization, cache-aware layouts, deterministic reductions, cancellation, and single-thread replay. Status: `active-persistent-worker-cancellation-and-deterministic-replay`; SIMD proof and representative long-horizon measurements remain. Depends on: `coupled_retained_history_integrator`.
5. `first_binary_and_claim_outcome_gates` — Apply the base EOM contract to binary and claim outcomes with complete histories, all partner and self-root families, event routes, adaptive long-horizon evolution, convergence, and perturbation stability. Status: `pending-claim-campaign`; source: [evolution-contract-v0.md](evolution-contract-v0.md). Depends on: items 1–4, but not the million-path scale profile.
6. `eom_application_surface` — Complete the bounded-population run/inspect surface with retained-history import, duration and step controls, precision display, progress, cancellation, checkpointing, convergence, failure diagnostics, and provenance. Status: `active-borg-run-control-surface`. Depends on: the bounded-population portions of items 1–4.

## Long-Term Scale Queue

These items remain contractual architecture goals, but they do not block bounded-population canonical evolution, the first binary outcome, Borg migration, or other bounded-population consumer migrations.

1. `performance_architecture_survey_and_baseline` — Extend the measured CPU, SIMD, hierarchy, precision, storage, and output ladder through $10^4$, $10^5$, and $10^6$ paths after the immediate long-horizon workload is executable.
2. `large_population_algorithmic_scaling` — Complete compressed certified block exclusion, exact surviving-pair fallback, active-enclosure research, and noncompressible fail-closed admission for at least $10^6$ active paths. Status: `measured-accelerating-population-recursive-ladder-complete`; the unchanged bounded CPU certificate reaches 10,000 joined accelerating piecewise-cubic sparse histories and 100,000,000 logical pairs with 98.96% exact-search reduction, zero unresolved membership, 48.728-second wall time, and 1.391 GiB peak resident memory. Matched complete-path speedups are 4.320x at 128 paths and 14.020x at 512; the accelerating dense ladder provides zero reduction and fails closed at 2,048 paths. General evolved-history, million-path, active enclosure, GPU, and distributed execution remain. Packets: [recursive-block-exclusion-first-path.md](recursive-block-exclusion-first-path.md), [recursive-block-exclusion-moving-population-ladder.md](recursive-block-exclusion-moving-population-ladder.md), [recursive-block-exclusion-accelerating-population-ladder.md](recursive-block-exclusion-accelerating-population-ladder.md); evidence: [eom-recursive-block-exclusion-first-path-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-first-path-apple-m3-2026-07-16.md), [eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md), [eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md).
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
- no result claims EOM authority when the run used a prescribed analytic path, a constrained replay, or a display interpolation.

The million-path profile has its own later acceptance boundary in `eom_evolution_contract/v0/amendment-1`. It is required before claiming million-path capability, not before accepting a bounded-population run or migrating a bounded-population consumer.

## Promotion Boundary

This priority area may produce an EOM application and validated simulation artifacts. It does not by itself certify a physical branch, promote a braid, validate a photon path, or change the AAA closure score. Corpus promotion requires EOM-evolved retained histories plus the branch, convergence, conservation, and independent-evidence rows required by the specific theory claim.
