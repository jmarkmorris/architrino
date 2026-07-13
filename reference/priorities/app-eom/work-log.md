# EOM Work Log

This file holds dated decisions, implementation status, validation results, failed paths, migration handoffs, and operator/developer communication for the EOM priority area. Keep the live queue in [priorities.md](priorities.md), provisional ideas in [brainstorming.md](brainstorming.md), the defining contract in [application-and-engine-contract.md](application-and-engine-contract.md), and migration sequencing in [migration-plan.md](migration-plan.md).

## 2026-07-13 — Priority Area Created

- Created `reference/priorities/app-eom/` for the operator-selected `EOM` Equation of Motion application.
- Recorded the defining contract as retained past paths plus an absolute-time interval in, Master-EOM-evolved paths out.
- Prohibited prescribed future paths, path constraints, guidance, snapping, analytic target orbits, and display curves from serving as EOM evolution.
- Recorded the decision to leave the existing central solver and all current dependencies in place during the standalone EOM build.
- Ranked the initial work around the evolution contract, canonical Master EOM binding, independent oracle, coupled retained-history integrator, timestep/event control, deterministic multithreading, precision/convergence, streaming/checkpointing, application surface, knowledge-tree quarantine, Borg shadow migration, and later consumer-by-consumer migration.
- Recorded the initial quarantine disposition for Borg, Causal Delay Feedback, Animator, Photon, Ideal Braid, braid-ideal research instruments, T3, and unclassified consumers.
- No solver source, app source, generated artifact, fixture, or current priority packet was changed.

## 2026-07-13 — Extreme-Performance And Multiscale Mandate Added

- Expanded the performance requirement from native multithreading to an all-avenues program covering algorithmic scaling, SIMD/vectorization, memory locality, GPU, multi-GPU, heterogeneous CPU/GPU pipelines, and distributed execution.
- Added a many-orders-of-magnitude multirate integration priority: fast paths and branch events may receive fine steps while slow paths use coarser same-law schedules, provided one causal absolute-time ledger and controlled cross-rate interpolation are preserved.
- Separated same-law multirate stepping from renormalization-inspired reduced slow-sector models. Reduced models require an explicit approximation status, resolved comparison, remainder/error budget, and measured validity envelope.
- Added a target envelope of many thousands to tens of thousands of architrinos and recorded the $N=10^4$ brute-force control scale of $10^8$ ordered receiver-source pairs per receiver time before history/root multiplicity.
- Added dedicated queue items for the performance architecture survey, large-population algorithmic scaling, deterministic CPU/SIMD execution, GPU/multi-GPU/heterogeneous execution, and a cross-backend performance-envelope gate.
- Removed the earlier deferral of GPU/distributed exploration. Accelerator work may proceed alongside the correctness-first CPU path, but no backend gains EOM authority until it passes the independent oracle and convergence gates.

## 2026-07-13 — Precision And Language Elevated To Architecture Gates

- Recorded that EOM precision may need to exceed the floating-point formats implemented directly by CPU and GPU hardware, particularly when absolute epochs, local timesteps, path scales, residuals, and interaction sums span many orders of magnitude.
- Added a precision architecture covering stable scaling, local space/time origins, error-controlled reductions, per-row adaptive escalation, software extended and arbitrary precision, interval or ball enclosures, certified discrete decisions, and fail-closed behavior at the configured precision ceiling.
- Added a focused pre-implementation decision packet for the production language, runtime, accelerator stack, and precision libraries.
- Required language selection to use representative EOM kernels and end-to-end accepted-history benchmarks across CPU threads, SIMD, GPU, irregular events, multiprecision escalation, storage, and restart behavior.
- Preserved the headless native compute boundary while allowing a thin application shell in another language. The shell may configure and inspect runs but may not reimplement EOM physics or numerical acceptance.
- No implementation language or accelerator API was selected by this update; the decision remains evidence-gated.

## 2026-07-13 — Current Native Master-Equation Routine Audited

- Verified that `architrino_solver_integrate_master_equation_motion_f64` validates but does not use its field-speed and history-depth request during acceleration evaluation.
- Verified that the routine consumes only instantaneous initial states, uses compiled Borg coupling and softening constants, evaluates same-time partner positions, excludes every self-pair, omits $D_s$, $D_T$, $W^{\mathrm{rec}}$, and causal-root evaluation, and uses only the source charge magnitude rather than $|q_iq_j|$.
- Verified that the routine reports `canonical_eom_evidence = 1` and zero wake rows, and that the native smoke test requires both conditions.
- Reconstructed the routine's current blamed introduction at 2026-07-01 09:36 EDT in commit `e50fd678ef` and the same-day fixed-coupling/request-discard modification at 14:02 EDT in commit `4cb2e9521a`.
- Added EOM counter-tests for field-speed/history sensitivity, retained-history sufficiency, complete ordered-pair accounting including self, exact field-speed and super-field-speed regimes, canonical per-root rows, and evidence-status integrity.
- Preserved the current routine and ABI unchanged for dependencies; the audit changes its evidence classification, not its runtime behavior.

## 2026-07-13 — Solver Requirements Integrated Into Evolution Contract v0

- Promoted the supplied solver requirements into `eom_evolution_contract/v0`, a focused normative draft rather than leaving them only in an attachment or chat record.
- Defined the invariant that every accepted trajectory segment comes from causal roots of the same run's accepted retained history.
- Required continuous evaluable initial histories, root continuation through $dS/dT=D_T/D_s$, independent recovery scans, root-completeness certification, coupled immutable-state advancement, operational tolerance control, and fail-closed history boundaries.
- Required canonical $D_s$, $D_T$, signed branch orientation, unsigned receiver-normal weight, polarity, charge product, inverse-square direction, $\eta$, and $\epsilon_c$ on the force rows actually consumed by integration.
- Defined capability-derived `canonical`, `conditional`, `reference`, `display-only`, and `failed` evidence levels; successful execution cannot self-assign authority.
- Added reconstructible per-root and per-step evidence schemas, explicit failure codes, sixteen validation gates, and a binary-outcome boundary requiring complete histories and stable full-history return for recurrence claims.
- Reconciled the supplied velocity controls with the live Master Equation: constant-velocity straight super-field-speed motion is a zero-nontrivial-self-hit control, while exactly field-speed straight motion is a degenerate tangent case rather than an ordinary simple root.
- Treated existing ABI, streaming, root, and precision components as audit-gated reuse candidates only; no existing runtime received EOM authority and no solver or app implementation was changed.

## 2026-07-13 — Initial-Data Framing Corrected

- Corrected language that contrasted continuous initial histories with a supposed state-only start. For a delayed Master EOM, the initial datum is a history function by mathematical type; an instantaneous position and velocity are only endpoint evaluations and cannot define the problem.
- Made `continuous retained history functions only` an explicit contract status field and prohibited an instantaneous-state-only EOM request variant.
- Recorded the architecture hierarchy: the canonical mathematics defines the admissible interface, and implementations are classified against it. The current ABI's state-only input is a contract failure, not an alternate or reduced EOM mode.

## 2026-07-13 — Requirements Frozen And Queue Advanced

- Accepted the operator's decision that EOM requirements are complete and froze `eom_evolution_contract/v0`; later requirement changes now require an explicit amendment or successor contract version.
- Removed the completed `evolution_contract` item from the live priority queue and renumbered the remaining items.
- Promoted `master_eom_binding/v0` to the active item. It must pin the exact canonical sharp and regulated equations, constants, boundary conventions, root aggregation, and caustic routes before numerical architecture or production implementation.
- Reordered the pre-implementation gates so the precision contract and independent oracle precede the final language/runtime decision. Candidate performance kernels may inform the decision, but cannot define correctness.
- Kept the knowledge-tree provenance quarantine active in parallel because it does not depend on EOM implementation and prevents further consumption of false canonical evidence.

## 2026-07-13 — Master EOM Binding Draft Exposed Regulated-Law Mismatch

- Bound the unambiguous history space, causal-root condition, all-pair/self-pair domain, sharp receiver-normal acceleration, polarity, root transport, separator taxonomy, memory-boundary route, and caustic failure boundary in `master_eom_binding/v0`.
- Derived the finite-width simple-root limit and found that the current dual-mollified corpus equation omits the receiver-normal numerator $|D_T|$. As written, its delta collapse produces $1/|D_s|$ rather than the canonical $|D_T/D_s|$ branch strength.
- Found that the current core factor $\widehat{\mathbf r}/(r^2+\epsilon_c^2)$ remains direction-undefined at $\mathbf r=0$, so it does not provide a complete coordinate-coincidence continuation.
- Staged the receiver-normal finite-width equation and recommended the smooth radial kernel $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$ because it is rotationally equivariant, zero at coincidence, polarity-blind apart from the canonical sign/charge factor, and converges to $\widehat{\mathbf r}/r^2$ off the origin.
- Marked the binding `priority-only` and blocked its freeze on operator confirmation of the core kernel. No current solver, ABI, app, or reader-facing Master Equation prose was changed.

## 2026-07-13 — Master EOM Binding Accepted And Promoted

- Accepted the operator's decision to bind the receiver-normal finite-width correction and the smooth radial core kernel.
- Corrected the canonical dual-mollified Master Equation so its integrand contains $|D_T|$ and uses $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$.
- Defined the complete receiver-normal vector integrand at coordinate coincidence by its zero continuous extension; the direction-dependent scalar $D_T$ is not evaluated independently at $\mathbf r=\mathbf 0$.
- Recorded the simple-root delta collapse to the canonical $|D_T/D_s|$ branch strength and froze `master_eom_binding/v0` against the resulting canonical source hash.
- Removed the completed Master EOM binding item from the live queue and advanced the precision contract.
- Left the current solver, ABI, apps, and dependencies unchanged.

## 2026-07-13 — Numeric Certification Contract Frozen

- Froze `eom_numeric_certification/v0` as the numeric acceptance requirement for the independent oracle and every later CPU, GPU, multi-GPU, distributed, and checkpoint backend.
- Required scale maps, local pair frames, epoch-plus-offset absolute time, certified time ordering, and rejection of steps that do not advance in their own time representation.
- Separated exact or enclosed discrete decisions from continuous error enclosures and defined a propagated per-stage budget across history, interpolation, roots, geometry, $D_s$, $D_T$, kernel evaluation, accumulation, integration, and output.
- Defined the precision ladder from hardware binary64 through verified extended formats, expansions or binary128-class arithmetic, arbitrary precision, interval or ball arithmetic, and exact or adaptive predicates.
- Required smallest-unit precision escalation, certified root-complement exclusion, deterministic or enclosed parallel reductions, GPU difficult-row return, multirate history synchronization, explicit resource ceilings, and fail-closed numeric failure codes.
- Removed the completed precision-contract item from the live queue and advanced the independent dynamical acceptance oracle.

## 2026-07-13 — Independent Oracle Reference Kernel Started

- Selected Python with mpmath arbitrary precision for the independent oracle nucleus; this is deliberately separate from the production-language decision and imports no current or future production solver code.
- Implemented direct reference evaluations for causal residuals, $D_s$, $D_T$, sharp per-root acceleration, the smooth core kernel, the zero-extended finite-width integrand, and refinement of one declared sign-changing simple-root bracket.
- Added six independent controls covering the analytic stationary root, inverse-square acceleration, exact-$c_f$ silent branch, super-$c_f$ receiver, constant straight super-$c_f$ same-path no-root behavior, coordinate-coincidence zero extension, and finite-width simple-root convergence.
- Kept the priority active because the current refiner does not certify the retained root-free complement and the oracle does not yet evolve coupled retained histories.
- Defined the remaining phases for interval history intake, certified root completeness, finite-width acceleration enclosure, atomic coupled method-of-steps evolution, and the full negative-control matrix.

## 2026-07-13 — Certified Retained-History And Root-Completeness Layer Completed

- Implemented exact-decimal, contiguous piecewise-cubic retained histories with nominal $C^1$ continuity, explicit position and velocity reconstruction-error radii, and deterministic history digests.
- Implemented directed-rounding decimal interval arithmetic for polynomial position, velocity, separation, causal residual, and source-normal evaluation without admitting binary floating-point inputs.
- Implemented exhaustive classification of every cell in the declared retained search interval as root free, a unique simple-root bracket, an excluded coincident endpoint, or unresolved. A root-free-complement claim is emitted only when no unresolved cells remain.
- Preserved multiple roots, close roots, exact roots, and segment-boundary roots; recorded memory-boundary contact separately so a truncated history cannot claim complete causal coverage.
- Added rigorous open-cell exclusions for an $H(0)$ coincident endpoint under a uniform sub-$c_f$ speed bound or a uniform super-$c_f$ velocity-component bound. Exactly-on-the-rail motion remains unresolved rather than being forced into a simple-root result.
- Made tangencies, folds, reconstruction uncertainty, root-search depth exhaustion, and root-search cell exhaustion fail closed with explicit unresolved reasons.
- Added `eom_root_completeness_certificate/v0` records containing exact decimal tokens, search policy and resource use, root and cell ledgers, history identities and digests, and an input-sensitive certificate digest.
- Added nineteen certified-history and interval controls alongside the six independent equation-reference controls. The full 25-test oracle suite passes.
- Advanced the active oracle work from the reference kernel and root layer to certified acceleration enclosure. Coupled retained-history evolution and production authority remain incomplete.

## 2026-07-13 — Million-Path Scale Amendment And Execution Architecture Accepted

- Amended the frozen evolution requirements with `eom_evolution_contract/v0/amendment-1`, raising the target from thousands or tens of thousands to at least $10^6$ active path identities with continuous retained histories.
- Distinguished a million active paths from a million stored history rows and recorded the synchronized $N^2=10^{12}$ logical ordered-relationship domain before root multiplicity and history search.
- Defined complete disjoint pair accounting through excluded, exact, enclosed, and unresolved membership classes; accepted evolution requires complete coverage and zero unresolved relationships.
- Derived the certified receiver-source-time block residual enclosure $\mathcal G_{RB}(I)$ and permitted block pruning only when that enclosure excludes zero.
- Bound the first production implementation to exact evaluation of every surviving active candidate. Later active aggregation requires certified root topology, reconstructible membership, and an acceleration remainder inside the accepted-state error budget.
- Designed deterministic receiver ownership, immutable content-addressed history chunks, causal residency and prefetch, heterogeneous regular and difficult queues, fixed reduction identities, atomic accepted-window publication, streamed output manifests, and reproducible distributed restart.
- Added an honest dense-workload boundary: if certified exclusion and controlled aggregation cannot reduce a noncompressible workload inside the declared hardware envelope, preflight returns `resource_envelope_exceeded` before publishing candidate evolution.
- Added the $N=10^4$, $10^5$, and $10^6$ benchmark ladder, million-path certified sparse evolution, exhaustive nested parity controls, heterogeneous parity, restart/output reconstruction, and dense fail-closed validation.
- Preserved the existing central solver, current dependencies, independent oracle, Master Equation binding, and numeric certification contract unchanged.
