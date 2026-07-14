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
