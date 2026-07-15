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

## 2026-07-13 — Certified Acceleration Reconstruction Layer Completed

- Implemented `certified_acceleration.py` as an independently authored,
  exact-decimal interval reconstruction layer over the certified retained
  histories and root-completeness certificates.
- Implemented the frozen sharp-root acceleration with certified $D_s$,
  receiver-normal strength $|D_T/D_s|$, signed charge product, and the
  unregularized inverse-square vector law. Exact-$c_f$ receiver motion emits a
  present but silent row, and super-$c_f$ receiver motion is not clamped.
- Implemented the frozen finite-width pair law by adaptive interval quadrature
  over the complete declared retained interval, including the Gaussian causal
  mollifier, smooth radial core kernel, and complete-vector zero extension at
  coordinate coincidence.
- Corrected the decimal exponential enclosure to use guard digits and outward
  endpoint expansion because decimal transcendental evaluation itself is
  round-to-nearest rather than directed by the surrounding context.
- Required the complete $N^2$ ordered-pair domain including self-pairs and
  rejected missing, duplicate, extra, or internally inconsistent path inputs
  before reconstruction.
- Added reconstructible pair and all-path certificates with exact-decimal row
  bounds, receiver totals, declared precision and tolerances, resource use,
  history provenance, and input-sensitive digests. Final summed enclosures are
  checked against their declared tolerance before certification.
- Added sixteen controls covering analytic sharp rows, multiple roots,
  self-pairs, exact- and super-field-speed motion, finite-width quadrature,
  tangent routing, memory boundaries, provenance, resource exhaustion, and a
  complete two-path matrix. The certified-acceleration controls pass.
- Advanced the oracle to coupled retained-history evolution. The oracle remains
  priority-only, performs explicit pair evaluation, and confers no production
  authority; the production block-exclusion engine has not begun.

## 2026-07-13 — Atomic Coupled Retained-History Evolution Implemented

- Implemented `certified_evolution.py` as an independent reference method of
  steps over continuous retained histories. It imports no current or future
  production solver implementation.
- Added a simultaneous cubic acceleration corrector: every path advances from
  one immutable coupled input, and predictor histories remain confined to the
  correction attempt.
- Added full-step versus two-half-step local position and velocity error
  estimates. Correction and integration tolerances are operational; exceeding
  them rejects the complete candidate and halves the step down to the declared
  minimum.
- Added complete ordered-pair root and acceleration snapshots at each consumed
  receiver time, root-topology signatures for branch-event subdivision, and
  final recertification after the accepted error estimate is propagated into
  the appended dense-history enclosure.
- Added atomic publication certificates: rejected attempts return the original
  history digests and accepted time, while successful attempts publish every
  evolved path and its continuation-critical records together.
- Corrected two retained-history dependencies exposed by coupled evolution.
  Same-path identity now preserves the exact $H(0)$ endpoint coincidence under
  interval uncertainty, and nominal continuity is evaluated from the nominal
  polynomial rather than from an error-inflated enclosure. Polynomial
  derivative coefficients now retain the declared decimal precision.
- Corrected all-path evidence reconstruction to replay the declared
  pair-grouped reduction order. Re-summing every root row in a different
  association can produce a different outward interval even when it covers the
  same value, so that alternate association cannot be used as an exact-equality
  test.
- Added ten coupled-evolution controls covering exact inertial self-history,
  super-$c_f$ evolution, complete binary pair accounting, symmetric coupled
  motion, operational error rejection, correction exhaustion, memory-boundary
  failure, adaptive halving, branch-topology event subdivision, prohibited
  future-history input, and rollback.
- Kept every successful result at `reference` evidence status. Step doubling is
  an operational numerical error estimate, not an analytic solution proof or
  production-authority claim.
- Advanced the oracle to the acceptance matrix and event-specialized controls.
  Production block exclusion, heterogeneous execution, distributed history,
  checkpoint storage, and migration remain unstarted.

## 2026-07-13 — Independent Oracle Phase 4 Completed

- Added `phase4_acceptance.py` as a reference-only layer; it imports neither
  the current central solver nor a future production EOM implementation.
- Added certified reception-time root tubes. Persistent identities are issued
  only when every matched branch has a uniform nonzero source normal, strict
  residual signs on the tube walls, disjoint tubes, and a certified root-free
  slab complement. Root births, deaths, and lost transversality route to the
  event control rather than inheriting an identity heuristically.
- Added joint reception/emission interval quadrature for finite-width
  fold/caustic impulse. It integrates the complete triangular causal domain,
  avoids division by $D_s$, checks retained-history boundary clearance, and
  fails closed on depth, cell, or final-width exhaustion.
- Added exact-decimal content-hashed checkpoints containing the retained
  histories, reconstruction errors, charges, controller step, numeric policy,
  resource policy, accepted/rejected counts, and prefix provenance. Restore
  verifies both per-history and whole-checkpoint digests before continuation.
- Added coupled exact-halving refinement certificates requiring at least four
  levels and nonincreasing endpoint position and velocity deltas.
- Added the versioned `eom_independent_oracle_phase4_acceptance/v0` matrix. It
  rejects missing or failed controls, empty evidence, non-reference authority,
  and dependencies on the current central solver, a production EOM backend, or
  prescribed future paths.
- Added twelve Phase 4 controls covering persistent identities, root-event
  routing, tangent-event impulse, event resource exhaustion, restart identity,
  checkpoint tampering, sub-$c_f$ curved-history falsification, four-level
  inertial and interacting-binary refinement, complete matrix acceptance,
  forbidden current-solver dependency, and false canonical evidence.
- The full independent-oracle suite now passes 64 tests. The production
  block-exclusion engine remains unstarted, and every successful new record is
  reference-only.
- Removed the completed independent-oracle item from the live queue and
  advanced `performance_architecture_survey_and_baseline` to the ready item.

## 2026-07-13 — Performance Architecture Survey And Local Baseline Executed

- Added the versioned reference-only
  `eom_performance_architecture_baseline/v0` driver, a C++20 native kernel
  probe, a Metal bulk-bound probe, and five unit controls. None imports or
  changes the existing central solver, and none implements production EOM.
- Recorded an Apple M3 evidence packet with an independent 90-digit
  decimal-interval oracle cost, NumPy binary64 kernels, C++ scalar and
  auto-vector candidates, deterministic fixed-tree reduction, one-to-eight CPU
  thread scaling, Metal binary32 kernel and blit timing, local immutable-chunk
  I/O, and dense resource projections.
- Passed complete disjoint pair coverage and exhaustive active-pair parity for
  two stationary $N=256$ controls. The stationary block prototype uses
  outward-rounded distance and causal-reach bounds; it is not a general
  moving-history certificate.
- Executed the sparse stationary population ladder through $N=10^6$. The
  million-path row accounted for all $10^{12}$ ordered pairs, excluded
  `999,992,340,032`, and promoted `7,659,968` to exact fallback. It found no
  active roots in that deliberately separated control and therefore provides
  no dense-root or branch-divergence claim.
- Measured about `10.97` complete simple-root pair certificates per second in
  the correctness-first oracle, about `4.15` billion C++ bulk classification
  rows per second, and about `5.29` billion Metal binary32 rows per second at
  the wall boundary. These operations are not mathematically equivalent; the
  contrast establishes the required heterogeneous regular/difficult split.
- Measured candidate auto-vector gains of `1.173x` for classification and
  `1.424x` for interpolation across five outer process trials with seven
  internal timings each. SIMD remains an open evidence row until compiler
  reports or hardware counters verify it on the native retained-history/root
  batch.
- Measured CPU sparse-traversal speedups of `1.96x`, `3.72x`, and `4.67x` at
  two, four, and eight threads. The result includes worker creation and is a
  local synthetic bound, not the production scaling envelope.
- Projected a minimum `64 TB` for one materialized 64-byte row across the dense
  million-path ordered-pair domain. The host therefore returns
  `resource_envelope_exceeded`; the fastest bulk-kernel time projection is
  explicitly only an optimistic lower bound and not an EOM completion estimate.
- Kept Rust, multi-GPU, distributed-history, representative branch-divergence,
  and precision-escalation results unmeasured. The production language decision
  remains pending, and the production block-exclusion engine remains unstarted.
- Advanced the live survey item to
  `active-local-baseline-complete` rather than completing it. The next packet is
  the general moving-history certified block bound plus native exact-root batch,
  difficult-row return, and cross-backend parity evidence.

## 2026-07-13 — C++ Host Selected And Native Moving-History Root Layer Implemented

- Accepted the operator decision selecting C++20 as the EOM production host.
  Recorded MPFR/GMP directed interval arithmetic as the first implemented
  difficult-row precision route while preserving the separately authored
  Python decimal-interval oracle.
- Added a modular `src/eom` C++ library without changing `src/solver`, its ABI,
  or any current consumer. The new layer is executable architecture evidence,
  not yet coupled EOM evolution or migration authority.
- Implemented continuous piecewise-cubic retained histories with position and
  velocity reconstruction-error enclosures, interval coverage checks, and
  boundary continuity validation.
- Implemented `eom_moving_history_block_certificate/v0`. It evaluates moving
  receiver and source history hulls over declared time intervals, preserves
  complete receiver/source membership, and either certifies every ordered pair
  in the block root-free or sends the complete block to exact fallback.
- Implemented `eom_native_exact_pair_certificate/v0` and a bounded-thread batch.
  The batch isolates all regular simple roots, certifies the complement,
  records source-normal and receiver-normal enclosures, preserves source
  segment identity through boundary deduplication, and returns results in input
  order independently of worker completion order.
- Implemented local numeric escalation from outward binary64 intervals to
  caller-bounded MPFR directed intervals. A close two-root row that cannot use
  the binary64 tolerance path certified both roots at 128 bits. Tangent and
  exact-field-speed rail controls exhausted the declared route and returned
  `caustic_route_required` without publishing a complete root set.
- Implemented the canonical coincident same-history endpoint exclusion for
  uniformly sub-field-speed and provably super-field-speed open cells. The
  exact-field-speed rail case remains unresolved as required. Memory-boundary
  roots return `insufficient_history_depth` even when the searched complement
  is otherwise complete.
- Added six independent Python controls covering decimal-interval moving-block
  parity, regular and difficult root count/bracket/orientation parity,
  fail-closed event routes, self-endpoint behavior, memory and piecewise
  boundaries, and deterministic multithreaded replay.
- Recorded the Apple M3 packet in
  `evidence/eom-native-history-layer-apple-m3-2026-07-13.json`. Remaining work
  begins with C++ acceleration reconstruction and deterministic receiver
  reduction, then coupled atomic accepted-step evolution, production
  hierarchical block traversal, GPU difficult-row return, distributed history,
  checkpoints, and the stable application interface.

## 2026-07-13 — C++ Certified Acceleration And Deterministic Receiver Reduction Implemented

- Added `eom_native_pair_acceleration_certificate/v0`. It consumes only a
  complete exact-pair certificate covering the emission domain through the
  reception time, re-evaluates the retained histories, intersects source and
  receiver normal enclosures, enforces the sharp source-normal floor, and
  emits one auditable interval-vector row per admitted root.
- Preserved the full receiver-normal law. The exact-field-speed receiver
  control produces a certified interval containing zero acceleration, and the
  super-field-speed receiver control remains active with negative receiver
  normal and nonzero branch strength; neither velocity is clamped.
- Added `eom_native_acceleration_reconstruction_certificate/v0`. It requires
  exactly $N^2$ ordered requests including self-pairs, reconstructs pairs on a
  caller-bounded native thread pool, restores canonical receiver/source order,
  and uses `fixed_pairwise_interval_tree_v0` for deterministic receiver sums.
- Verified that a shuffled two-path request matrix accounts for all four
  ordered pairs and yields byte-identical one-thread and four-thread totals.
  Coincident static self-pairs remain present as certified inactive zero
  contributions.
- Added fail-closed controls for tangent roots, retained-memory contact,
  tampered source-normal evidence, retained-history provenance mismatch, and an
  acceleration enclosure wider than the declared tolerance. None publishes an
  acceleration total.
- Added six independent 90-decimal-digit Python-oracle parity and replay tests,
  the native fixture, and the evidence packet
  `evidence/eom-native-acceleration-layer-apple-m3-2026-07-13.json`.
- Passed strict `-Werror` compilation, Release CTest, AddressSanitizer and
  UndefinedBehaviorSanitizer fixtures, and the complete 81-test EOM family.
- This closes the correctness-first sharp acceleration/reduction layer only.
  Finite-width reconstruction, acceleration-stage MPFR escalation, coupled
  trial-history extension, and atomic accepted-step publication remain open.

## 2026-07-13 — C++ Coupled Retained-History Evolution Nucleus Implemented

- Added a native coupled-evolution request and four certificate schemas for
  acceleration snapshots, corrected substeps, atomic coupled steps, and
  complete coupled evolution.
- Implemented simultaneous cubic acceleration correction. Every predictor and
  correction iteration reads the same immutable accepted history vector and
  produces candidate segments for all paths together.
- Implemented one-full-step versus two-half-step position and velocity error
  estimates. The error limits are operational: exceeding either rejects the
  complete coupled step, and the adaptive controller halves the attempted step
  before retrying.
- Inflated the fine accepted history by the measured local discrepancy and
  reran complete root and acceleration certification on that exact history
  before publication.
- Implemented source-normal-sign and root-count topology comparison between
  substep endpoints. A changed signature returns
  `root_event_requires_subdivision` without publishing a candidate.
- Implemented atomic in-memory publication. Accepted steps expose every path
  together; rejected steps expose the unchanged input histories and matching
  provenance fingerprints. No predictor, correction iterate, full-step
  estimate, or first half-step becomes accepted state.
- Added controls for multistep static self-history, unclamped
  super-field-speed inertial history, a complete two-path binary, adaptive
  halving, tight local-error rejection, memory-boundary rejection, correction
  exhaustion, root-event subdivision, prohibited future history, and
  deterministic replay, including byte-identical one-thread and four-thread
  binary evolution at the published-history boundary.
- Added five independent 80-decimal-digit oracle parity and atomicity tests and
  recorded the evidence packet in
  `evidence/eom-native-coupled-evolution-layer-apple-m3-2026-07-13.json`.
- Passed strict `-Werror` compilation, Release CTest, AddressSanitizer and
  UndefinedBehaviorSanitizer fixtures, and the complete 86-test EOM family.
- This is the sharp-chart, binary64, in-memory correctness nucleus. Native
  finite-width event transit, acceleration-stage multiprecision, split
  absolute time, durable atomic storage, and production-scale scheduling
  remain open.

## 2026-07-13 — Native Finite-Width Acceleration And Fold Event Acceptance Implemented

- Implemented the bound finite-width causal-surface acceleration directly in
  C++20: the smooth core kernel, receiver-normal magnitude, Gaussian causal
  surface, signed charge/coupling factor, complete retained emission interval,
  and adaptive outward interval quadrature are all consumed in one auditable
  pair row.
- Added a separate acceleration precision route. Difficult finite-width rows
  replay through caller-bounded MPFR directed-interval quadrature and record
  the achieved bits independently from the root solver's precision route.
- Added `eom_native_fold_caustic_impulse_certificate/v0`. It integrates the
  regulated equation jointly over reception and emission on the complete
  causal triangular domain and fails closed on retained-memory contact,
  quadrature depth, cell, time-resolution, or enclosure-budget exhaustion.
- Integrated fold acceptance into corrected coupled substeps. A changed root
  topology remains rejected under the sharp policy; under a finite-width
  policy, every changed ordered pair must provide a certified finite impulse
  that overlaps the candidate cubic segment's endpoint-acceleration impulse.
- Verified that the prior sharp event control still rejects, while the same
  coupled trial step is accepted atomically with two event-impulse records
  under finite-width routing. One-thread and four-thread accepted-event output
  is byte-identical.
- Added fail-closed controls for finite-width acceleration cell exhaustion,
  event-impulse cell exhaustion, and atomic event-resource rejection with
  unchanged published-history fingerprints.
- Added independent decimal-interval oracle overlap for stationary
  finite-width acceleration and the tangent fold impulse, plus forced 128-bit
  MPFR acceleration replay overlap with the binary64 certificate.
- Recorded the Apple M3 evidence packet in
  `evidence/eom-native-finite-width-event-layer-apple-m3-2026-07-13.json`.
- Passed strict `-Werror` compilation, Release CTest, AddressSanitizer and
  UndefinedBehaviorSanitizer CTest, and the complete 91-test EOM family.
- Remaining numeric work is MPFR joint event quadrature, sharp-row and
  receiver-reduction MPFR replay, regulator-limit convergence, and split-time
  state representation. Production block traversal and heterogeneous scaling
  remain separate open work.

## 2026-07-13 — MPFR Joint Event Integration And Regulator Convergence Implemented

- Extended the multiprecision finite-width backend to recompute the complete
  two-time fold/caustic impulse in directed MPFR intervals. The route includes
  retained-history interpolation, causal triangular-domain area, separation,
  receiver-normal magnitude, Gaussian causal surface, smooth core kernel,
  signed coupling, adaptive quadrature, and deterministic pairwise reduction.
- Added caller-bounded event precision escalation with recorded route and
  achieved bits. The forced difficult-row control completes at 128 bits and
  overlaps the independent 80-decimal-digit event oracle.
- Added `eom_native_regulator_convergence_certificate/v0`. It evaluates
  separate causal-width and core-scale ladders so the two regulators retain
  their distinct roles. The three-level control uses causal widths
  `0.25, 0.125, 0.0625` and core scales `0.2, 0.1, 0.05`.
- Defined the executable finite-ladder acceptance rule conservatively: for
  every component, the maximum possible difference between every pair of
  interval enclosures must remain within the declared convergence tolerance.
  This comparison includes quadrature uncertainty rather than relying on
  nominal values or interval midpoints.
- Integrated regulator convergence into atomic coupled event acceptance.
  Every changed ordered pair must certify its regulator ladders before the
  base-regulator event impulse may be consumed. Resource exhaustion and
  convergence failure return `regulator_convergence_failed` without publishing
  any candidate history.
- Added a successful `0.08` regulator-envelope control and a deliberate
  `1e-12` nonconvergent control. The accepted fold step carries two event and
  two regulator certificates and remains byte-identical between one and four
  threads.
- Recorded the evidence packet in
  `evidence/eom-native-mpfr-regulator-convergence-layer-apple-m3-2026-07-13.json`.
- Passed strict `-Werror` compilation, Release CTest, AddressSanitizer and
  UndefinedBehaviorSanitizer CTest, eight native coupled tests, and the full
  92-test EOM family.
- This closes the requested MPFR joint event and declared finite regulator
  envelope layer. It does not prove an analytic sharp limit. MPFR sharp-row and
  receiver-reduction replay, split absolute time, durable transactions,
  representative coupled throughput, and production block traversal remain
  open; production block traversal was not started in this packet.

## 2026-07-13 — Hierarchical Traversal, Checkpoint/Restart, And Borg Shadow Route Implemented

- Added a deterministic hierarchical traversal over general moving retained
  histories. Every terminal node is either a certified exclusion or a compact
  exact tile; disjoint excluded plus exact coverage must equal the complete
  ordered-pair domain. Node and exact-pair limits fail closed before exact work
  exceeds the declared envelope.
- Added bounded multithreaded exact fallback for the surviving tiles and
  controls for traversal-node and exact-pair resource exhaustion. The first
  fixture accounts for all eight ordered pairs as four exclusions and four
  completed exact rows.
- Added `eom_native_evolution_checkpoint/v0`: deterministic serialization,
  content fingerprint, payload checksum, atomic temporary-file `fsync` and
  rename publication, directory `fsync`, tamper rejection, and restart. A
  checkpointed continuation reproduces the uninterrupted retained-history
  fingerprint exactly.
- Corrected Borg's false EOM provenance without removing its compatibility
  runtime. Its fixture and dynamic central-solver runner now state
  `canonicalEomEvidence=false` and
  `eomEvidenceStatus=non_eom_compatibility_output`.
- Added a separate Borg EOM shadow adapter. It imports a continuous cubic past
  through an absolute cut time, rejects state-only input, prohibits future
  paths, preserves imported-history contamination provenance, and derives
  display rows only from native atomically published history extensions.
- Added a C++ native process protocol, Node process client, same-origin local
  HTTP endpoint, and opt-in `/borg.html?eom=shadow` route. The ordinary Borg
  path remains unchanged unless the operator explicitly enables
  `EOM_BORG_SHADOW=1` and requests shadow mode.
- The first full-history 16-path attempt timed out at 180 seconds. A
  geometry-derived causal-memory cut reduced the retained window from 300 to
  about 60.62 time units. Tight root tolerances then failed closed because the
  imported frames carry up to `1.5e-8` source uncertainty and one difficult
  ordered pair, `1015<-1010`, remained unresolved through `1e-4`.
- A 16-path interval `[300,300.01]` completed one accepted atomic step with
  zero rejections at root tolerance `1e-3`; it published all 16 histories and
  32 display rows in about 48.36 seconds. This is conditional executable
  architecture evidence only: the input history came from the non-EOM
  compatibility solver, the tolerance is coarse, no convergence ladder
  passed, and Borg promotion remained false.
- Recorded the complete packet in
  `evidence/eom-native-traversal-checkpoint-borg-shadow-apple-m3-2026-07-13.json`.
  The traversal is not yet connected to coupled acceleration snapshots, and
  persistent workers, production million-path traversal, GPU, multi-GPU,
  distributed history, split time, multirate evolution, and canonical Borg
  migration remain open.

## 2026-07-13 — Borg Controls, Persistent Worker, Coupled Traversal, And Strict Control

- Added Borg EOM controls for a deterministic 1–16 path continuous-history
  subset, requested duration, automatic fixed `0.01` chunks, progress, native
  Stop, and clean Restart. The population maximum is the number of retained
  fixture histories; the surface does not manufacture state-only starts.
- Prevented the compatibility run-preset calibration from enlarging EOM's
  configured atomic chunk. Long requested durations now remain a sequence of
  separately accepted or rejected chunks.
- Replaced per-request native process creation with
  `borg-shadow-server-v0`, a persistent C++ worker protocol. Browser
  cancellation aborts the HTTP request and kills the active worker; Restart
  lazily starts a clean worker. Full histories are still transported per
  chunk, so persistent in-process history ownership remains open.
- Connected certified moving-history traversal to every coupled acceleration
  snapshot. A far binary fixture accounts for all four ordered pairs as two
  certified block exclusions and two exact self-pairs before deterministic
  receiver reduction.
- Ran a strict one-path Borg control at root tolerance `1e-8` with steps
  `0.01`, `0.005`, and `0.0025`. All cases accepted, maximum endpoint state
  delta was about `2.84e-14`, one-thread and four-thread histories were byte
  identical, and all four requests used one worker process.
- Browser QA completed a two-chunk automatic run, stopped a requested
  one-hundred-chunk run after three published chunks, and restarted to a clean
  two-chunk completion.
- Corrected a long-run absolute-time scheduling failure reproduced with two
  paths over `0.38` solver time. At chunk four, binary64 subtraction left a
  one-ULP remainder after `300.03999999999996`; the controller then attempted
  a zero-width candidate segment. The controller now snaps only a
  rounding-envelope remainder to the request's explicit decimal endpoint.
  The exact browser case completed all 38 atomic chunks. Failed browser chunks
  also terminate their runner instead of retrying indefinitely, and expose the
  native failure message in the progress row.
- Ran the same strict ladder against all 16 Borg histories. Every timestep row
  failed closed before publication with `minimum_step_exhausted` because all
  240 off-diagonal ordered pairs reported
  `numeric_precision_limit_exhausted`; the 16 self-pairs were not root
  failures. Four threads reduced the `0.0025` attempt from about `54.0`
  seconds to `21.7` seconds without changing the certified result.
- Recorded the packet in
  `evidence/eom-borg-ui-persistent-traversal-refinement-apple-m3-2026-07-13.json`.
  Borg promotion remains blocked: the full-population precision route fails
  closed, imported history is non-EOM compatibility output, and the
  million-path, GPU, and distributed-history gates remain open.

## 2026-07-14 — Exact circular $v=c_f$ endpoint certificate and §86 fold handoff

- Added a central `RetainedHistory::uniform_circular` factory. The exact
  tangential-speed token is its kinematic datum; the supplied radius is a
  close geometry cross-check, and the generated cubic-Hermite segments carry
  analytic interpolation and roundoff enclosures.
- Bound an `eom_uniform_circular_endpoint_certificate/v0` witness into the
  retained-history provenance. At its certified reception endpoint, the
  strict chord inequality excludes every noncoincident self-root for
  $0<v\le c_f$ over the whole circular prehistory.
- Preserved the fail-closed negative control: an arbitrary straight $v=c_f$
  rail remains `caustic_route_required`. A factory-produced curved $v=c_f$
  rail certifies zero roots under forced MPFR escalation, and inconsistent
  circle speed/radius/frequency input is rejected.
- The exact §86 six-worldline start now certifies all 36 root and acceleration
  rows. Its first unconstrained candidate step develops a middle self-fold in
  the real circular prehistory. The finite-width/regulator route reaches a
  corrected candidate, but the final inflated-history snapshot loses root
  completeness, so atomic publication correctly retains the time-zero
  histories.
- Native EOM regression result: 26 tests passed. The §86/§90 dynamical verdicts
  remain quarantined; the next engine target is root-complete atomic
  recertification after the first certified fold event.

## 2026-07-14 — Global finite-width allocation closes §86 first-fold publication

- Replaced the finite-width integrator's uniform per-cell error-density rule
  with a global interval budget. Active cell integrals are summed in
  chronological fixed-pairwise order, the largest enclosure-width contributor
  is refined, and acceptance still requires the total acceleration enclosure
  to meet the caller's unchanged quadrature tolerance.
- Made reduction-check cadence proportional to the active-cell population.
  This removes the quadratic repeated-summation cost without changing any
  enclosure, resource cap, or stopping condition. A 1,500-cell regression
  fixture now certifies the localized stationary finite-width row, while the
  deliberately one-cell fixture still fails closed.
- Corrected final atomic recertification to measure the gap between the
  corrected endpoint acceleration midpoint and its recertified
  inflated-history interval. The previous midpoint-to-midpoint comparison
  rejected valid containment because a $5\times10^{-3}$ quadrature enclosure
  was compared against a $2\times10^{-7}$ correction tolerance.
- The exact §86 first fold-crossing step now publishes all six histories
  atomically at the normal tolerances. Its accepted snapshot has zero
  uncertified root rows, two finite-width caustic routes, maximum 193,338 of
  300,000 quadrature cells, position error $1.36\times10^{-11}$, and velocity
  error $1.44\times10^{-6}$ against the $2\times10^{-6}$ budget.
- Native EOM regression result: 27 tests passed. No §86/§90 verdict is claimed;
  multi-cycle convergence and perturbation coverage remain open.
- A four-step refined `imx` extension publishes through
  $3.7702986964\times10^{-5}$ with zero rejections. Its stride-1 diagnostic
  log slope is $0.60113$; coarser strides lack enough samples, so the
  $6.25\times10^{-6}$-cycle row is not a dynamical verdict.
- Added opt-in accepted-step growth recovery, capped by an explicit maximum
  step, and reused already-certified accepted endpoint snapshots as the next
  atomic step's start snapshot. A static evolution regression verifies the
  $0.01,0.01,0.02,0.02,0.02$ recovery sequence within decimal-token rounding,
  zero rejections, and three reused start snapshots on each continuing step.
  The focused native coupled-evolution suite passes 11 tests.
- These controller improvements do not remove the exact-V5 pinned-fold
  feasibility wall. The multi-cycle §86 ladder is stopped; the next engine
  target is a cheap certified local treatment of the self-fold onset, or a
  certificate that the pin-level step collapse is conservative rather than
  physically required.

## 2026-07-14 — EOM endorsed; legacy solver frozen to temporary compatibility

- Recorded the operator decision that EOM is the endorsed solver and sole
  forward production target.
- Limited the existing central solver to temporary compatibility for current
  dependencies. New consumers, physical capabilities, evidence claims, and
  forward solver work may not adopt or extend it.
- Strengthened the EOM priority queue with explicit legacy-solver containment,
  consumer-by-consumer EOM migration, and final retirement after the production
  dependency inventory reaches zero.
- Aligned root contributor policy, repository orientation, the C++ host
  architectural decision, the EOM tracker, and the migration plan while
  preserving all current runtime dependencies until their individual migration
  decisions are complete.

## 2026-07-14 — Million-path gate moved to the long-term scale queue

- Separated base EOM correctness and bounded-population consumer acceptance
  from the optional `eom_evolution_contract/v0/amendment-1` million-path
  conformance profile.
- Removed million-path, GPU, multi-GPU, and distributed-history completion as
  dependencies of the claims-triage campaign, first binary outcome, and Borg's
  bounded 16-path migration. Each remains required before claiming the
  corresponding large-scale or heterogeneous capability.
- Added the claims-triage small-population long-horizon plan. Concurrent
  §97/§98 evidence then refined its immediate targets to complete-root
  continuation across evolving §97 precision walls and a provenance-bound
  drifting-circular prehistory for §98. A cheap certified exact-$v=c_f$
  pinned-fold treatment remains the parallel §86 target.
- Prioritized persistent in-process retained histories, checkpoint/resume,
  deterministic convergence campaigns, claim observables, split absolute time,
  and measured CPU optimization for the actual low-tens-worldline ledger workload.
- Claim level remains `priority-design`; no quarantined T2 or T3 claim was
  promoted by this scheduling correction.

## 2026-07-14 — Analytic pinned-fold certificate lands; §86 wall remains temporal

- Added a provenance-gated analytic finite-width route for factory-certified
  circular self-prefixes at exactly $v=c_f$. A second-order Taylor residual
  enclosure preserves the fold cancellation, while a midpoint integral plus
  the certified $\sup|A'|\,|I|^2/4$ remainder encloses the unchanged Gaussian
  master-equation integral.
- Extended circular history provenance with the complete analytic factory
  parameters. Checkpoint schema v2 serializes them and reconstructs the prefix
  through the factory, rejecting any segment mismatch before restoring the
  analytic certificate.
- Independent 90-digit quadrature is enclosed on a constructed exact fold.
  The synthetic route falls from 21,337 to 563 cells; the exact-V5 first-fold
  pair falls from 193,338 to 1,928 cells. The exact-V5 atomic-step wall time
  improves from 35.72 s to 28.50 s.
- The feasibility wall remains. Steps $10^{-3}$ and
  $1.25\times10^{-4}$ fail the unchanged velocity budget, and a tenfold
  tighter quadrature tolerance does not move the latter error. Exact-root and
  temporal-correction work now dominate. No §86/§90 verdict or score movement
  is claimed. Evidence:
  `evidence/eom-analytic-pinned-fold-apple-m3-2026-07-14.json`.

## 2026-07-14 — Pinned-fold temporal onset removes first-order step artifact

- Added `coupled_cubic_corrector_with_pinned_fold_onset/v1` in central
  `src/eom`. Eligibility is restricted to a factory-certified circular self
  path at its certified endpoint with tangential speed exactly $c_f$, complete
  root-free open search, coincident-endpoint exclusion, clear memory boundary,
  sharp start chart, and enabled analytic fold route.
- The eligible path uses its implicit right-endpoint acceleration on the first
  positive-duration substep. The full step and first half-step use the same
  rule, so the sharp-chart value at the measure-zero onset is not assigned
  positive integration weight. The master equation, root topology, analytic
  fold acceleration, atomic publication, and tolerances are unchanged.
- Added a provenance-complete onset certificate and regression coverage. A
  disabled control emits no onset certificate; arbitrary histories retain the
  ordinary cubic corrector. The model fingerprint binds the temporal-route
  flag.
- The legacy exact-V5 velocity error has observed refinement orders $0.991$,
  $0.996$, and $0.998$. The corrected ladder approaches second order with
  $1.29$, $1.63$, $1.79$, and $1.89$; position error approaches third order.
  Error reduction grows from $24.1\times$ at $10^{-3}$ to $79.9\times$ at
  $1.25\times10^{-4}$.
- The exact-V5 onset accepts $5\times10^{-4}$ at velocity error
  $1.2746\times10^{-6}$, $26.5\times$ the former step. A four-step adaptive
  probe then accepts through $t=0.0025$ with zero rejections and recovers to
  $10^{-3}$ at velocity error $2.71095\times10^{-7}$; only the first substep
  carries the two middle-path onset certificates.
- The temporal collapse was dominantly an estimator artifact, but the §86
  ladder remains cost-blocked. Post-onset steps average about 43.7 s, dominated
  by exact-root and coupled-correction snapshots. The demonstrated
  $10^{-3}$ step projects to about 6,032 steps and 3.05 days per cycle before
  convergence and perturbation multipliers. §86 and §90 remain quarantined.
  Evidence:
  `evidence/eom-pinned-fold-temporal-step-apple-m3-2026-07-14.json`.

## 2026-07-14 — Evolved-history root path advances through cubic and self-root-cluster controls

- Added a demand-driven two-segment enclosure for uncertain roots at continuous
  retained-history joins. The actual §97 replay crossed the `0.61` emission
  join, and the optimized two-step replay cost fell from about `80.8` to
  `4.05` seconds without changing the root tolerance.
- Extended exact evolved-history parity to reconstruct the identical accepted
  retained histories in the 90-digit oracle. Its first independent divergence
  was `I+<-I+` at `t=1.6275`: native had declared zero roots while the oracle
  retained 89 source-normal cells.
- Removed the unsound application of a local self-endpoint speed argument to
  older cells. The replacement whole-interval arc-length proof requires every
  intervening segment to be strictly sub-field; a forced-MPFR mixed-speed
  regression prevents recurrence. The old divergent oracle row is now
  complete with zero roots and zero unresolved cells.
- Added enclosed self-endpoint exclusion under a strict source-normal sign and
  an explicit near-multiple self-root-cluster finite-width route. The repaired
  checkpoint advanced from `1.6291314697265535` to `1.63` with 19 accepted
  steps, zero rejections, and certified acceleration. Native/oracle parity was
  complete for all 720 ordered-pair rows in the 20 emitted snapshots.
- Added the cubic endpoint-tangency regression using
  `rho=0.96009867914`, `omega=1.0415596039524766`, and `c_f=1`. The 90-digit
  oracle resolves departure roots near `0.0047035` and `0.0470287`; native
  classifies the zero-to-one change as
  `coincident_endpoint_root_continuation`, not an interior fold.
- The Section 86 runner now reports `step_wall_seconds`,
  `maximum_quadrature_cells`, and `middle_self_root_classification` together.
  The portable cell metric is the maximum over every acceleration snapshot in
  the accepted atomic step, including the full correction, both half-step
  corrections, their endpoints, and final accepted-step recertification. The
  earlier final-snapshot-only row reported `32.4315` seconds and 1,928 cells,
  with endpoint continuation; that row is preliminary and superseded for cost
  reporting. A clean all-stage timing repeat remains required after the
  competing long §97 process finishes.
- The three native suites pass 11 history-layer, 11 acceleration, and 14
  coupled-evolution tests; the 90-digit root suite passes 23 tests. The §97
  baseline continuation from `t=1.63` to `t=6.93` is active. Step and
  prehistory-segment refinement remain required. No §97/§98 flutter verdict,
  sign, slope, or growth rate is reinstated.

## 2026-07-14 — §86 cubic-tangency corrections preserve correctness but not cost

- Extended same-worldline chord correlation across continuous retained-history
  segment joins in native double, native MPFR, finite-width acceleration, and
  the independent 90-digit oracle. The chord now accumulates nominal
  polynomial increments with integrated velocity-error bounds rather than
  hulling two independent published positions.
- Added a cancellation-stable exact-circle residual using the enclosed series
  for `sin(u)-u`, plus route counters and four independently switchable §86
  ablations. A direct regression protects the cross-segment correlation
  mechanism independently of the V5 fixture.
- All four atomic one-step V5 rows accepted and classified the middle self pair
  as `coincident_endpoint_root_continuation`. Independent, correlated-only,
  stable-only, and combined rows each reached 1,928 maximum quadrature cells.
  Correlation was active in 1,582 cells; the exact-circle stable residual was
  active in zero cells at the evolved-history cost maximum.
- Concurrent-load step times were 623.540, 603.705, 543.591, and 601.144
  seconds. They are not clean benchmarks because the §97 horizon process was
  active. The portable result is unchanged cost: correct classification and
  both numerical corrections still take the same finite-width route.
- The proposed localization and delay-factored residual follow-up is retired.
  The unchanged 1,928-cell count is a determinism check, not a cost proxy. No
  §86 feasibility, horizon, flutter, migration, or score claim advances from
  this negative result.

## 2026-07-14 — §86 clean step attribution assigns cost to MPFR roots

- Suspended the competing §97 horizon process, ran the §86 fixture with one
  native worker and a 10 ms sampling profiler, then resumed §97. The fixed
  `0.0005` step accepted on its first attempt in `632.318909` seconds with zero
  rejected steps or substeps.
- Exact-pair root certification used `627.804960` seconds (`99.2861%` of wall),
  including `626.152585` MPFR CPU seconds (`99.0248%`). Finite-width execution
  used `4.500060` seconds (`0.7117%`). Retained-history reconstruction,
  traversal, copy, and hash used `0.008046` seconds (`0.00127%`).
- The corrector ran nine iterations across three accepted substeps (`4,3,2`).
  Its `581.400232` inclusive seconds contain `581.395545` seconds of snapshot
  certification; exclusive corrector control used `0.000175` seconds. There
  was no rejected-then-retried work.
- Fifty-two additional MPFR precision attempts used `445.736570` seconds
  (`70.4924%`), nested inside the root total. The profiler attributed 14,132 of
  52,510 active-worker top-of-stack samples (`26.9130%`) to allocation/free
  activity, also nested inside MPFR roots. Acceleration-stage precision
  escalation had zero attempts.
- The middle self pair remained
  `coincident_endpoint_root_continuation`; maximum quadrature cells remained
  1,928. Cells are retained as a determinism check only. Evidence:
  [section-86-step-cost-attribution-2026-07-14.json](evidence/section-86-step-cost-attribution-2026-07-14.json).

## 2026-07-14 — Token-dominance gate removes the §86 MPFR wall

- Added an explicit retained-error-token dominance test before precision
  escalation. Token-dominated simple roots now use the tolerance-scale
  strict-sign IVT bracket at binary64, including continuous segment joins.
- Preserved the unchanged `1e-5` root tolerance, `1e-24` source-normal floor,
  and fail-closed policy. Root uniqueness still requires a sign-definite
  source-normal hull across the accepted bracket.
- The same serialized fixed `0.0005` step fell from `632.318909` to `7.153516`
  seconds (`88.39x`). MPFR fell to zero pair certifications, zero attempts, and
  zero CPU seconds. The accepted step retained 14 snapshots, corrector
  iterations `4,3,2`, 1,928 cells, and
  `coincident_endpoint_root_continuation`.
- The evolved-history native/oracle replay passed 72 ordered-pair rows. The
  four suites passed 23 root-oracle, 12 native-history, 12 native-acceleration,
  and 14 native-coupled-evolution tests. Fourteen unaffected fixture pair
  certificates were bit-identical before and after.
- The root repair had already enlarged the accepted step from `9.4e-6` to
  `5e-4` (`53.19x`), reducing a braid cycle from about 640,000 steps to 12,065.
  At the previously projected approximately 6 seconds per step, the full
  six-rung ladder is 26 days rather than 7.3 years. Evidence:
  [section-86-token-dominance-root-gate-2026-07-14.json](evidence/section-86-token-dominance-root-gate-2026-07-14.json).

## 2026-07-14 — Warm-complement carry and certified delay window

- Verified the supplied exact-pin calculation. At `D=0.042`,
  `D_s=+2.3919909609593226e-4`, but
  `g(D)=-3.348840740262371e-6`; the point is not a root. The live difficult
  cell likewise has two strictly negative point residual signs. A strict
  derivative hull proves uniqueness, not IVT existence, so the proposed
  simple-root reroute would weaken the root certificate and move the accepted
  finite-width self contribution.
- Rejected bracket-only corrector reuse because it does not re-certify the
  root-free complement on the new candidate history. A sound reuse path needs
  either a complete exclusion partition or a global topology-preserving
  homotopy certificate.
- Implemented the operator's corrected proof object: transport complete
  root-free residual cells, not root brackets. Reuse requires exact source
  segment token identity and a strict residual sign after widening by the
  receiver-normal time bound plus certified candidate correction. Marginal
  cells return to the unchanged fail-closed classifier.
- Tightened the certified history window from a global position box to the
  per-history-segment radial triangle bound. The accepted §86 snapshot proves
  a `2.00966` maximum delay and excludes `5.9908` of the eight retained time
  units before root classification.
- The same-window diagnostic reduces root-cell re-evaluations from `207234`
  to `168320` (`18.78%`), while snapshots and ordered-pair searches remain
  `14` and `504`. The fair one-worker step improves from the accepted
  `7.153516` seconds to `6.388428` seconds (`1.1197615x`), so this is the
  second consecutive round below the corrected `1.5x` threshold rather than a
  physics-launch condition.
- Added an unforced arithmetic-limited MPFR fixture. It certifies two roots at
  128 bits through `mpfr_directed_interval`, while the §86 production row
  remains at zero MPFR pairs and attempts. Evidence:
  [section-86-fold-routing-warm-start-soundness-audit-2026-07-14.md](evidence/section-86-fold-routing-warm-start-soundness-audit-2026-07-14.md).
- The accepted trajectory CSV is byte-identical, corrector iterations remain
  `4,3,2`, rejections remain zero, the middle self classification remains
  `coincident_endpoint_root_continuation`, and the independent evolved-history
  replay remains 72/72 with no divergence. Machine-readable evidence:
  [section-86-warm-complement-delay-window-2026-07-14.json](evidence/section-86-warm-complement-delay-window-2026-07-14.json).
- The prematurely launched physics process was alive at approximately 195%
  CPU and was interrupted to serialize the optimization work. No replacement
  physics run was launched.

## 2026-07-14 — Parallel scaling diagnosis, deterministic cell sharding, and physics relaunch

- Profiled the post-token-gate eight-worker path before changing execution.
  Allocator leaves were only tens of samples, while condition-variable waits
  were 32,236 samples and the main thread waited in acceleration joins. The
  root worker CPU sum was only `1.85x` root wall time. Warm exclusion had made
  most of the 36 logical pairs cheap; two self pairs dominated both the root
  and finite-width phases. The live bottleneck was ordered-pair work
  imbalance, not allocator contention.
- Kept adaptive parent selection, cell IDs, insertion order, and the fixed
  interval reduction tree serially identical. For each selected split, the
  independent left/right centered and monotone enclosures now use four
  workers per finite-width self pair, consuming all eight requested workers
  across the two dominant pairs without changing a certificate operation.
- The five-step eight-worker mean fell from the accepted `3.163710` to
  `2.285774` seconds per step (`1.38410x`). Current one-worker timing was
  `6.187034` seconds, so eight-worker efficiency rose from `25.24%` to
  `33.83%`. The finite-width phase improved `1.63192x`; the root phase stayed
  flat and remains the measured imbalance. Because the total round remained
  below `1.5x`, this is the third consecutive failed round and the corrected
  stopping rule is now active.
- Physics stayed fixed: step `0.0005`, 14 first-step snapshots, 504 first-step
  root searches, corrector iterations `4,3,2`, zero rejections,
  `coincident_endpoint_root_continuation`, and zero production MPFR pairs or
  attempts. One-worker, old eight-worker, and new eight-worker trajectory CSVs
  are byte-identical with SHA-256
  `41692e362af72a2d12097cfbdcbde99e2a9c2a92612c8c0381a27fc0c69d316a`.
  Independent evolved-history parity passed 72/72 rows with no divergence;
  12 root-oracle, 14 native-history, 12 native-acceleration, 14 native-coupled
  tests, and all three CMake fixtures passed.
- Added a diagnostics-only post-publication callback and the §86 runner now
  flushes `step`, `t`, and elapsed wall seconds initially and every 100
  accepted steps. Rebuilt the physics binary at `19:31:31-0400`, 193 seconds
  newer than the latest `src/eom` change at `19:28:18-0400`.
- Relaunched the serialized one-cycle control-plus-perturbed run as PID 89129.
  It wrote the initial control heartbeat immediately and was alive at `199.2%`
  CPU. Live log: `.tmp/section86-physics-one-cycle-imx.log`; final trajectory:
  `.tmp/section86-physics-one-cycle-imx.csv`. Evidence:
  [section-86-parallel-scaling-heartbeat-2026-07-14.json](evidence/section-86-parallel-scaling-heartbeat-2026-07-14.json).

## 2026-07-14 — Adaptive step-permission measurement

- Added a diagnostics-only accepted-step limit and endpoint-state output. The
  acceptance rule, tolerances, fold-aware method, and controller rule were not
  changed.
- The 20-step adaptive run accepted every attempt and grew
  `0.0005 -> 0.001 -> 0.002`, then stayed at `0.002`. Every plateau velocity
  estimate was below the `2e-6` acceptance tolerance but above the `2.5e-7`
  growth threshold, so the plateau follows the declared controller rule.
- The run took `4707.580491333` seconds (`235.379` seconds per accepted step
  overall; `109.924` seconds over the last ten plateau steps). Accepted-step
  cost was strongly nonuniform, so step-count reduction alone does not predict
  cycle time.
- Cold-start fixed steps `0.001`, `0.002`, and `0.005` each rejected on their
  first attempt through the middle-path velocity budget. No coarse fixed row
  published a trajectory, so no `0.0005` trajectory comparison exists.
- Evidence:
  [section-86-adaptive-step-permission-2026-07-14.md](evidence/section-86-adaptive-step-permission-2026-07-14.md).

## 2026-07-14 — Continuous controller and synchronized multirate publication

- Added an opt-in bounded continuous adaptive controller using the existing
  cubic step-doubling error law without changing an acceptance tolerance.
- Added opt-in mixed accepted-history cadence. Dense outward full-versus-half
  error bounds select coarse paths, enlarge their published remainder to
  enclose the fine path, recertify the mixed histories, and retain one common
  receiver time and atomic publication.
- The four-step continuous run reached `t=0.0036611301578` in
  `405.305441583` seconds with zero rejections. The legacy controller needed
  `598.08552` seconds to reach only `t=0.0035`, establishing an early-horizon
  gain of at least `1.47564x` without a cycle-time extrapolation.
- Two multirate samples took `383.861501917` and `470.764073375` seconds.
  Their variance crosses the continuous-only result, so no multirate wall-
  time gain is established. All 108 interval components at the first three
  shared endpoints overlap, and the feature remains opt-in.
- Three paired warm-locality samples averaged `9.243083305` seconds with
  carry and `9.465927084` without it (`1.02411x`). Re-evaluated root cells
  fell `19.16%`; cell reduction again exceeded wall-time reduction.
- Final validation passed 16 coupled-evolution tests, 14 history/root-layer
  tests, the EOM CMake build, and scoped whitespace checks. Evidence:
  [section-86-continuous-controller-multirate-performance-2026-07-14.md](evidence/section-86-continuous-controller-multirate-performance-2026-07-14.md).

## 2026-07-14 — Certificate-cost feedback

- Added opt-in deterministic certificate-cost feedback. Endpoint root searches
  may report impending MPFR escalation before paying it; the controller makes
  one `0.5` landing adjustment, suppresses immediate regrowth, and persists a
  four-step cooldown through checkpoint schema v3. Acceptance tolerances are
  unchanged.
- Live probes rejected repeated subdivision because it formed a Zeno approach
  to a persistent precision boundary near `t=0.00343`. A `1.25` landing-growth
  probe was also rejected after exceeding `10:34`, at least `1.56x` slower than
  the continuous-only baseline. Neither prototype remains in the policy.
- At the continuous-only endpoint `t=0.0036611301578`, the retained policy took
  `350.498944625` seconds versus `405.305441583`: measured `1.156367x` speedup
  and `13.5223%` less wall time. It used five accepted steps and one advisory
  rejection, retaining three of the four steps saved against pinned `0.0005`.
- Endpoint midpoint deltas were at most `1.63735e-10` in position and
  `1.95358e-7` in velocity; every position and velocity interval overlapped.
  Final validation passed 17 coupled-evolution tests, 15 history/root-layer
  tests, the EOM CMake build, and scoped whitespace checks. Evidence:
  [section-86-certificate-cost-feedback-2026-07-14.md](evidence/section-86-certificate-cost-feedback-2026-07-14.md).

## 2026-07-15 — Middle self-pair MPFR decimal cache

- Replicated certificate feedback against a contemporaneous continuous-only
  control on the same pre-cache binary: `299.337702083` versus
  `318.615554583` seconds, a measured `1.064402x` speedup and `6.0505%` wall
  reduction. This confirmed the direction but not the prior one-sample
  `13.5223%` magnitude.
- A live sample placed repeated `mpfr_strtofr` conversion inside
  `mp_polynomial`/`mp_geometry` on the two active middle self-pair workers.
  Added a thread-local, attempt-local directed-rounding cache for immutable
  MPFR decimal tokens. It resets at every precision level and changes no
  interval arithmetic, certificate rule, or controller decision.
- Two matched optimized runs took `171.606387417` and `177.428446334` seconds,
  averaging `174.517416876`. Against the paired feedback baseline this is a
  measured `1.715231x` speedup and `41.6988%` wall reduction. The final MPFR
  step fell from `290.256` to a `164.1975`-second mean.
- Pre-cache and both optimized trajectory CSVs were byte-identical with SHA-256
  `48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
  MPFR attempts, root cells, accepted/rejected steps, and corrector iterations
  were unchanged. Evidence:
  [section-86-mpfr-decimal-cache-performance-2026-07-15.md](evidence/section-86-mpfr-decimal-cache-performance-2026-07-15.md).

## 2026-07-15 — MPFR compiled segment constants

- Compiled every retained-history segment once per exact-pair precision
  attempt: directed time bounds, twelve cubic coefficients, three derivative
  polynomials, and both error radii. Geometry and correlated self-displacement
  now reference these immutable intervals. Replaced interval-multiplication
  candidate vectors with fixed arrays while preserving order and rounding.
- Two matched runs took `74.158367708` and `73.169065167` seconds, averaging
  `73.663716438`. This is a measured `2.369110x` speedup and `57.7900%` wall
  reduction versus the prior decimal-cache mean. The final MPFR step fell from
  `164.1975` to a `64.78275`-second mean.
- The complete retained stack is `4.325271x` faster than the paired
  continuous-only control (`318.615554583` seconds) and `4.063570x` faster than
  the paired pre-cache certificate-feedback baseline (`299.337702083`).
- Prior-cache and both compiled-segment trajectory CSVs were byte-identical
  with SHA-256
  `48d245cb35bf95a093621495a50a6b5aa790e0d4d1b0f283bc40388d6075b351`.
  MPFR attempts, root cells, controller decisions, and corrector iterations
  were unchanged. Evidence:
  [section-86-mpfr-compiled-segment-performance-2026-07-15.md](evidence/section-86-mpfr-compiled-segment-performance-2026-07-15.md).
