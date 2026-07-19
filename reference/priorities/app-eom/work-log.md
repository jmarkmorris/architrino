# EOM Work Log

This file holds dated decisions, implementation status, validation results, failed paths, migration handoffs, and operator/developer communication for the EOM priority area. Keep the live queue in [priorities.md](priorities.md), provisional ideas in [brainstorming.md](brainstorming.md), and the defining contract in [application-and-engine-contract.md](application-and-engine-contract.md).

## 2026-07-13 — Priority Area Created

- Created `reference/priorities/app-eom/` for the operator-selected `EOM` Equation of Motion application.
- Recorded the defining contract as retained past paths plus an absolute-time interval in, Master-EOM-evolved paths out.
- Prohibited prescribed future paths, path constraints, guidance, snapping, analytic target orbits, and display curves from serving as EOM evolution.
- Recorded the decision to build EOM standalone, without coupling to any other code in the repo.
- Ranked the initial work around the evolution contract, canonical Master EOM binding, independent oracle, coupled retained-history integrator, timestep/event control, deterministic multithreading, precision/convergence, streaming/checkpointing, application surface, knowledge-tree quarantine, Borg shadow migration, and later consumer-by-consumer migration.
- Recorded the initial quarantine disposition for Borg, Causal Delay Feedback, Animator, Photon, and unclassified consumers.
- No solver source, app source, generated artifact, fixture, or current priority packet was changed.

## 2026-07-13 — Extreme-Performance And Multiscale Mandate Added

- Expanded the performance requirement from native multithreading to an all-avenues program covering algorithmic scaling, SIMD/vectorization, memory locality, GPU, multi-GPU, heterogeneous CPU/GPU pipelines, and distributed execution.
- Added a many-orders-of-magnitude multirate integration priority: fast paths and branch events may receive fine steps while slow paths use coarser same-law schedules, provided one causal absolute-time ledger and controlled cross-rate interpolation are preserved.
- Separated same-law multirate stepping from renormalization-inspired reduced slow-sector models. Reduced models require an explicit approximation status, resolved comparison, remainder/error budget, and measured validity envelope.
- Added a target envelope of many thousands to tens of thousands of architrinos and recorded the $N=10^4$ brute-force control scale of $10^8$ ordered receiver-transmitter pairs per receiver time before history/root multiplicity.
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
- Required canonical $D_s$, $D_T$, signed branch orientation, unsigned receiver-side-factor weight, polarity, charge product, inverse-square direction, $\eta$, and $\epsilon_c$ on the force rows actually consumed by integration.
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

- Bound the unambiguous history space, causal-root condition, all-pair/self-pair domain, sharp receiver-side-factor acceleration, polarity, root transport, separator taxonomy, memory-boundary route, and caustic failure boundary in `master_eom_binding/v0`.
- Derived the finite-width simple-root limit and found that the current dual-mollified corpus equation omits the receiver-side-factor numerator $|D_T|$. As written, its delta collapse produces $1/|D_s|$ rather than the canonical $|D_T/D_s|$ branch strength.
- Found that the current core factor $\widehat{\mathbf r}/(r^2+\epsilon_c^2)$ remains direction-undefined at $\mathbf r=0$, so it does not provide a complete coordinate-coincidence continuation.
- Staged the receiver-side-factor finite-width equation and recommended the smooth radial kernel $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$ because it is rotationally equivariant, zero at coincidence, polarity-blind apart from the canonical sign/charge factor, and converges to $\widehat{\mathbf r}/r^2$ off the origin.
- Marked the binding `priority-only` and blocked its freeze on operator confirmation of the core kernel. No current solver, ABI, app, or reader-facing Master Equation prose was changed.

## 2026-07-13 — Master EOM Binding Accepted And Promoted

- Accepted the operator's decision to bind the receiver-side-factor finite-width correction and the smooth radial core kernel.
- Corrected the canonical dual-mollified Master Equation so its integrand contains $|D_T|$ and uses $\mathbf r/(r^2+\epsilon_c^2)^{3/2}$.
- Defined the complete receiver-side-factor vector integrand at coordinate coincidence by its zero continuous extension; the direction-dependent scalar $D_T$ is not evaluated independently at $\mathbf r=\mathbf 0$.
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
- Implemented directed-rounding decimal interval arithmetic for polynomial position, velocity, separation, causal residual, and transmitter-side-factor evaluation without admitting binary floating-point inputs.
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
- Derived the certified receiver-transmitter-time block residual enclosure $\mathcal G_{RB}(I)$ and permitted block pruning only when that enclosure excludes zero.
- Bound the first production implementation to exact evaluation of every surviving active candidate. Later active aggregation requires certified root topology, reconstructible membership, and an acceleration remainder inside the accepted-state error budget.
- Designed deterministic receiver ownership, immutable content-addressed history chunks, causal residency and prefetch, heterogeneous regular and difficult queues, fixed reduction identities, atomic accepted-window publication, streamed output manifests, and reproducible distributed restart.
- Added an honest dense-workload boundary: if certified exclusion and controlled aggregation cannot reduce a noncompressible workload inside the declared hardware envelope, preflight returns `resource_envelope_exceeded` before publishing candidate evolution.
- Added the $N=10^4$, $10^5$, and $10^6$ benchmark ladder, million-path certified sparse evolution, exhaustive nested parity controls, heterogeneous parity, restart/output reconstruction, and dense fail-closed validation.
- Preserved the independent oracle, Master Equation binding, and numeric certification contract unchanged.

## 2026-07-13 — Certified Acceleration Reconstruction Layer Completed

- Implemented `certified_acceleration.py` as an independently authored,
  exact-decimal interval reconstruction layer over the certified retained
  histories and root-completeness certificates.
- Implemented the frozen sharp-root acceleration with certified $D_s$,
  receiver-side-factor strength $|D_T/D_s|$, signed charge product, and the
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
  a future production EOM implementation.
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
  and dependencies on a production EOM backend or
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
  implements production EOM.
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
- Added a modular `src/eom` C++ library without changing any other module, ABI,
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
  records transmitter-side-factor and receiver-side-factor enclosures, preserves source
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
  receiver normal enclosures, enforces the sharp transmitter-side-factor floor, and
  emits one auditable interval-vector row per admitted root.
- Preserved the full receiver-side-factor law. The exact-field-speed receiver
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
  tampered transmitter-side-factor evidence, retained-history provenance mismatch, and an
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
- Implemented transmitter-side-factor-sign and root-count topology comparison between
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
  C++20: the smooth core kernel, receiver-side-factor magnitude, Gaussian causal
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
  receiver-side-factor magnitude, Gaussian causal surface, smooth core kernel,
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
- Corrected Borg's false EOM provenance: output without EOM provenance is
  labeled `canonicalEomEvidence=false` and
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
  architecture evidence only: the input history lacked EOM provenance, the
  tolerance is coarse, no convergence ladder
  passed, and Borg promotion remained false.
- Recorded the complete packet in
  `evidence/eom-native-traversal-checkpoint-borg-shadow-apple-m3-2026-07-13.json`. (Evidence withdrawn 2026-07-16: its retained-history baseline did not meet the current EOM provenance requirement; the refinement ladder now seeds app-authored certified inertial history, re-measurement queued.)
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
  `evidence/eom-borg-ui-persistent-traversal-refinement-apple-m3-2026-07-13.json`. (Evidence withdrawn 2026-07-16: its retained-history baseline did not meet the current EOM provenance requirement; the refinement ladder now seeds app-authored certified inertial history, re-measurement queued.)
  Borg promotion remains blocked: the full-population precision route fails
  closed, imported history lacks EOM provenance, and the
  million-path, GPU, and distributed-history gates remain open.

## 2026-07-14 — Exact circular $v=c_f$ endpoint certificate

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
- EOM solver regression result: 26 tests passed.

## 2026-07-14 — Global finite-width allocation and atomic recertification

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
- EOM solver regression result: 27 tests passed.
- Added opt-in accepted-step growth recovery, capped by an explicit maximum
  step, and reused already-certified accepted endpoint snapshots as the next
  atomic step's start snapshot. A static evolution regression verifies the
  $0.01,0.01,0.02,0.02,0.02$ recovery sequence within decimal-token rounding,
  zero rejections, and three reused start snapshots on each continuing step.
  The focused native coupled-evolution suite passes 11 tests.

## 2026-07-14 — Million-path gate moved to the long-term scale queue

- Separated base EOM correctness and bounded-population consumer acceptance
  from the optional `eom_evolution_contract/v0/amendment-1` million-path
  conformance profile.
- Removed million-path, GPU, multi-GPU, and distributed-history completion as
  dependencies of the first binary outcome and Borg's bounded 16-path
  migration. Each remains required before claiming the
  corresponding large-scale or heterogeneous capability.
- Prioritized persistent in-process retained histories, checkpoint/resume,
  deterministic convergence campaigns, claim observables, split absolute time,
  and measured CPU optimization for the actual low-tens-worldline workload.
- Claim level remains `priority-design`.

## 2026-07-14 — Analytic pinned-fold certificate lands

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

## 2026-07-14 — Evolved-history root path advances through cubic and self-root-cluster controls

- Added a demand-driven two-segment enclosure for uncertain roots at continuous
  retained-history joins.
- Extended exact evolved-history parity to reconstruct the identical accepted
 retained histories in the 90-digit oracle.
- Removed the unsound application of a local self-endpoint speed argument to
  older cells. The replacement whole-interval arc-length proof requires every
  intervening segment to be strictly sub-field; a forced-MPFR mixed-speed
  regression prevents recurrence. The old divergent oracle row is now
  complete with zero roots and zero unresolved cells.
- Added enclosed self-endpoint exclusion under a strict transmitter-side-factor sign and
  an explicit near-multiple self-root-cluster finite-width route.
- Added the cubic endpoint-tangency regression using
  `rho=0.96009867914`, `omega=1.0415596039524766`, and `c_f=1`. The 90-digit
  oracle resolves departure roots near `0.0047035` and `0.0470287`; native
  classifies the zero-to-one change as
  `coincident_endpoint_root_continuation`, not an interior fold.
- The three native suites pass 11 history-layer, 11 acceleration, and 14
  coupled-evolution tests; the 90-digit root suite passes 23 tests.

## 2026-07-14 — Cross-segment chord correlation and stable exact-circle residual

- Extended same-worldline chord correlation across continuous retained-history
  segment joins in native double, native MPFR, finite-width acceleration, and
  the independent 90-digit oracle. The chord now accumulates nominal
  polynomial increments with integrated velocity-error bounds rather than
  hulling two independent published positions.
- Added a cancellation-stable exact-circle residual using the enclosed series
  for `sin(u)-u`, plus route counters. A direct regression protects the
  cross-segment correlation mechanism.

## 2026-07-14 — Token-dominance gate for retained-error-dominated roots

- Added an explicit retained-error-token dominance test before precision
  escalation. Token-dominated simple roots now use the tolerance-scale
  strict-sign IVT bracket at binary64, including continuous segment joins.
- Preserved the unchanged `1e-5` root tolerance, `1e-24` transmitter-side-factor floor,
  and fail-closed policy. Root uniqueness still requires a sign-definite
  transmitter-side-factor hull across the accepted bracket.

## 2026-07-14 — Warm-complement carry and certified delay window

- Rejected bracket-only corrector reuse because it does not re-certify the
  root-free complement on the new candidate history. A sound reuse path needs
  either a complete exclusion partition or a global topology-preserving
  homotopy certificate.
- Implemented the operator's corrected proof object: transport complete
  root-free residual cells, not root brackets. Reuse requires exact source
  segment token identity and a strict residual sign after widening by the
  receiver-side-factor time bound plus certified candidate correction. Marginal
  cells return to the unchanged fail-closed classifier.
- Tightened the certified history window from a global position box to the
  per-history-segment radial triangle bound.
- Added an unforced arithmetic-limited MPFR fixture. It certifies two roots
  at 128 bits through `mpfr_directed_interval`.

## 2026-07-14 — Deterministic cell sharding for dominant finite-width self pairs

- Kept adaptive parent selection, cell IDs, insertion order, and the fixed
  interval reduction tree serially identical. For each selected split, the
  independent left/right centered and monotone enclosures now use four
  workers per finite-width self pair, consuming all eight requested workers
  across the two dominant pairs without changing a certificate operation.
- Added a diagnostics-only post-publication callback.

## 2026-07-14 — Adaptive step-permission diagnostics

- Added a diagnostics-only accepted-step limit and endpoint-state output. The
  acceptance rule, tolerances, fold-aware method, and controller rule were not
  changed.

## 2026-07-14 — Continuous controller and synchronized multirate publication

- Added an opt-in bounded continuous adaptive controller using the existing
  cubic step-doubling error law without changing an acceptance tolerance.
- Added opt-in mixed accepted-history cadence. Dense outward full-versus-half
  error bounds select coarse paths, enlarge their published remainder to
  enclose the fine path, recertify the mixed histories, and retain one common
  receiver time and atomic publication.
- Final validation passed 16 coupled-evolution tests, 14 history/root-layer
  tests, the EOM CMake build, and scoped whitespace checks.

## 2026-07-14 — Certificate-cost feedback

- Added opt-in deterministic certificate-cost feedback. Endpoint root searches
  may report impending MPFR escalation before paying it; the controller makes
  one `0.5` landing adjustment, suppresses immediate regrowth, and persists a
  four-step cooldown through checkpoint schema v3. Acceptance tolerances are
  unchanged.
- Final validation passed 17 coupled-evolution tests, 15 history/root-layer
  tests, the EOM CMake build, and scoped whitespace checks.

## 2026-07-15 — MPFR decimal-token cache

- Added a thread-local
## 2026-07-15 — MPFR compiled segment constants

- Compiled every retained-history segment once per exact-pair precision
  attempt: directed time bounds, twelve cubic coefficients, three derivative
  polynomials, and both error radii. Geometry and correlated self-displacement
  now reference these immutable intervals. Replaced interval-multiplication
  candidate vectors with fixed arrays while preserving order and rounding.

## 2026-07-15 — MPFR sign-directed interval products

- Generic interval productsdirected MPFR multiplications even when
  endpoint signs selected only one lower and one upper corner.
- Replaced exhaustive corner evaluation with sign-directed extremal corners.
  Ordinary products now use two MPFR multiplications, mixed-by-mixed products
  use four, and nonzero squares use two. The retained operations use the same
  corner operands and directed rounding as the exhaustive enclosure.

## 2026-07-15 — MPFR worker-local storage pool

- Added a precision-keyed storage pool owned by each exact-pair worker.
  Short-lived `MpFloat` values now lease initialized MPFR buffers and return
  them to an intrusive free list; 128-, 256-, and 512-bit buffers cannot mix.
  Arithmetic operations, operands, and directed rounding are unchanged.

## 2026-07-15 — MPFR direct precision slots

- Replaced the remaining linear worker-local precision-bucket lookup with
  direct 128-, 256-, and 512-bit free-list slots. Storage records its owning
  free list, making release direct; a stable fallback retains API-valid
  nonstandard precisions.
- The merged build passed 32 EOM tests plus forced 96-, 192-, and 384-bit
  fallback checks.

## 2026-07-15 — Borg defaults to the EOM runner

- The operator directed Borg to use EOM by default. Ordinary `/borg.html`
  now loads the retained-history asset and mounts the fail-closed EOM shadow
  runner; the superseded path was reachable only through
  `?eom=compatibility` for diagnostics.
- The local development server enables the same-origin EOM solver endpoint by
  default and constructs its process client lazily on the first request. An
  explicit false `EOM_BORG_SHADOW` environment value disables the endpoint.
- The default-route change does not promote the imported compatibility
  history or the EOM result to canonical evidence. The remaining migration
  burden is an accepted EOM initial-history construction plus the independent
  bounded-population precision and convergence gates.
- Measured by the in-app browser at the ordinary URL, the page reported
  `Runner kind: eom-shadow`, `Run source: computed-eom-shadow-chunks`, and
  completed its one requested 16-path chunk without console errors. The live
  budget reported about `2.394e+3` ms for that chunk.
- Borg's individual electrino and positrino controls now own the runtime
  population; the redundant total-architrino input is removed. Applying a new
  population constructs a complete two-row linear retained history for every
  selected path, explicitly tagged as app-authored prescribed non-EOM input,
  so the EOM runner no longer falls back to the 16-path fixture after a 1+1
  request.
- The EOM panel now defaults to actual `Forever` evolution and keeps `60`
  seconds as the finite-mode duration. The EOM runner removes its target
  endpoint in Forever mode and continues producing atomic `0.01` chunks until
  the operator presses Stop. The run-mode, duration, progress, retained-history
  source, population, and velocity controls now share one EOM Run panel.
- The first live Apply-during-Forever check exposed an unhandled worker-stdin
  `EPIPE` in the local development server. The native process client now routes
  stdin errors through its generation guard, and queued HTTP requests acquire
  the shared worker only when they begin instead of capturing a worker being
  cancelled by the preceding request.
- Measured in the in-app browser after restarting the persistent server, a 1+1
  EOM run advanced past the old ten-chunk boundary to 16 chunks while still
  reporting `running forever`; the Stop action settled at 19 published chunks,
  retained the 1+1 population, and produced no browser log entries. The server
  remained listening on port 5173 after the cancellation/restart sequence.

## 2026-07-15 — Borg accepted continuous initial history

- Replaced Borg's default compatibility-fixture and app-authored prescribed
  initial past with one exact inertial $C^1$ polynomial per selected path. Its
  SHA-256 certificate accepts it only as EOM continuous initial datum and
  records `eomOutput=false`, `canonicalEomEvidence=false`, no future path
  prescription, and zero interpolation error for the inertial polynomial.
- A superseded implementation withheld frames until the seed segments left the
  retained window. The operator later replaced that policy with immediate EOM
  publication conditioned on the certified initial history.
- The first sampled-row seed attempt failed the native continuity checker with
  `retained-history position is discontinuous`. Direct measurement showed a
  1+1 request containing 2,000 seed segments occupied 541,357 bytes. Replacing
  those samples with two exact inertial polynomials reduced the first request
  to 423 bytes and the native process completed its first step with no rejected
  steps. This is measured transport and execution evidence, not canonical EOM
  evidence.
- Added fail-closed exact-boundary trimming. A requested retained-window cut
  that does not coincide with a published segment boundary is rejected instead
  of reconstructing polynomial coefficients.
- The complete Borg JavaScript suite passed 62/62 tests, the native Borg
  process suite passed 4/4 tests, the fixture writer passed `--check`, and the
  independent oracle reference-kernel and certified-evolution suites passed
  6/6 and 10/10 tests. Those tests established exact seed representation and
  fail-closed retained-history transport; they do not require delayed viewport
  publication under the current contract.

## 2026-07-15 — Borg 16-path retained-history refinement diagnostic

- A now-retired long-horizon harness built the accepted exact inertial $C^1$
  seed and measured strict 16-path refinement, restart, precision ceilings, and
  pair-level root and acceleration diagnostics. Its delayed-publication gate is
  not part of the current Borg contract.
- Measured with the final rebuilt native Borg binary, the strict seed-cut
  ladder completed at steps `0.01`, `0.005`, and `0.0025` with state and root
  tolerances `1e-8`. The worst state difference was
  `1.1684403444789382e-13`; the one-thread and four-thread `0.0025` histories
  were byte-identical; and every case reported zero root failures. The former
  240-off-diagonal-pair `numeric_precision_limit_exhausted` failure was not
  observed on this seed input.
- A checkpointed coarse continuation certified through $T=36$, then isolated one
  off-diagonal row at a time with `numeric_precision_limit_exhausted`. Each row
  left one difficult cell after excluding all others. The internal reason was
  `interior_root_not_surrounded`; a 512-to-1024-bit replay produced the same
  pair sequence and cell counts, so arithmetic precision did not move the wall.
- Raising the coarse continuation root tolerance from `1e-3` to `1e-2` crossed that
  wall and certified through $T=39.5$. Path `1013` then entered a self-caustic
  route. The declared finite-width fallback ran but exhausted its quadrature
  proof budget. Raising the budget from 200,000 cells at depth 32 to 1,000,000
  cells at depth 40 reduced the largest cell from about `3e-6` to `1e-6` while
  leaving the unresolved total interval near `0.2`; the route did not converge.
  **Inferred:** the unchanged precision replay and nearly unchanged interval
  under five times the cell budget identify retained-history enclosure width as
  the active floor. A tighter accepted-history construction that certifies this
  event would falsify that inference.
- The former 240-pair failure is absent at the seed cut. A narrower precision
  failure occurred later in this diagnostic, but it no longer controls Borg
  startup or promotion. General solver validation owns that continuing work.

## 2026-07-16 — Borg eight-path strict retained-history adjudication

- The operator changed Borg's bounded migration target from 16 paths to the
  deterministic eight-path prefix `1001`–`1008`. This preserves the selected
  seed positions, velocities, and polarities and removes paths `1009`–`1016`
  from the target; it does not alter any retained trajectory value or master-
  equation rule. The selected population's maximum inertial-seed causal delay
  is about `79.36964`; current startup computes and outward-rounds its required
  retained-history depth from the selected state.
- The eight-path strict seed-cut ladder passed at `h=0.01`, `h/2=0.005`, and
  `h/4=0.0025`. The maximum state differences were about `5.04e-14` and
  `6.30e-14`; the one-thread and four-thread `h/4` histories were byte
  identical; and no root failure occurred.
- A rebuilt EOM solver then ran a long continuation diagnostic with root, acceleration,
  position, velocity, and correction tolerances all set to `1e-8`. It accepted
  3,241 fixed `0.01` steps through $T=32.41$ in about 4,037 seconds. The next
  step failed closed only for ordered pair `1003<-1004`: 5,134 of 5,135 root
  cells were excluded, one interior cell was not surrounded, and MPFR
  escalation exhausted at 512 bits.
- The checkpoint/resume boundary exposed and fixed a decimal-time transport
  defect: converting the native cut string `32.409999999999918` to a JavaScript
  number produced `32.40999999999992`, so the native worker correctly rejected
  the appended history as non-contiguous. Requests now preserve the exact
  native coverage-end string. The fix changes no path polynomial or error
  enclosure.
- Repeated strict timestep halving crossed each former stopping time but
  converged toward the same event. Minimum steps `0.0025`, `0.00125`,
  `0.000625`, and `0.0003125` accepted through $T=32.465$,
  $T=32.47875$, $T=32.479375$, and $T=32.4796875$, respectively. The final
  rejected interval ends at $T=32.48$; pair `1003<-1004` again leaves one
  difficult interior cell after 5,153 exclusions and exhausts 512-bit
  escalation. **Inferred:** the halving sequence approaches an off-diagonal
  delayed-root topology event, not an ordinary timestep error. An independent
  complete-root certificate or unchanged strict continuation across this
  interval would falsify that inference.
- A separate diagnostic proved that a coarse accepted checkpoint at
  $T=38.0703125$ cannot substitute for strict history: all four strict ladder
  cases rejected their first step with 19 ordinary pair-root failures plus a
  path-`1003` self-caustic route. The first missing accepted object is therefore
  the complete interior delayed-root certificate for `1003<-1004` near
  $T=32.48`. The later simple-root certificate closed that local diagnostic;
  the accepted-initial-history ladder is the current Borg migration evidence.
- The complete Borg JavaScript suite passes 63/63, including an exact native
  checkpoint-time regression, and the native Borg process suite passes 4/4.

## 2026-07-16 — `1003<-1004` certified as a simple root, not a topology event

- Added certificate-only difficult-cell diagnostics to the MPFR exact-pair
  route. They record the emission cell, undecidable midpoint residual,
  transmitter-side-factor and receiver-side-factor enclosures, endpoint signs, and source
  segment without changing root classification or acceleration.
- The formerly blocking cell at reception time $T\approx32.48$ has opposite
  residual endpoint signs and
  $D_s\in[0.8549184784,0.8549184901]$. By strict monotonicity and the
  intermediate-value theorem it contains exactly one simple root. Applying the
  mean-value theorem to the directed midpoint residual and transmitter-side-factor
  enclosures narrows the emission root to a `2.551e-9` interval, inside the
  declared `1e-8` tolerance. The earlier inference that this was an
  off-diagonal fold or root-topology event is refuted.
- The actual defect was in the last MPFR root-surrounding probe. Its intended
  half-tolerance radius produced an outward-rounded pair of endpoints whose
  represented width could exceed the tolerance by a few ulps, so the probe was
  skipped. Added a final pair of exact representable points rounded inward from
  the half-tolerance radius. It is accepted only when the represented width is
  no greater than the tolerance and directed residual enclosures have strict
  opposite signs. The route is general and contains no Borg path ID or event
  time.
- Added the closed-form independent control $g(S)=S+5.5\times10^{-9}$, whose
  unique root is $S=-5.5\times10^{-9}$ and whose source normal is exactly one.
  The native MPFR certificate and the separately authored 90-digit decimal
  oracle both certify one root, the complete root-free complement, and no
  memory-boundary contact.
- Rebuilt the Borg EOM worker and resumed the unchanged strict checkpoint.
  The step from $T=32.4796875$ through $T=32.48$ accepted with zero rejections
  and zero root failures, followed by five more accepted strict steps through
  $T=32.4815625$. Every pre-event segment on all eight paths is byte-identical;
  the crossing checkpoint contains only two appended half-step segments per
  path.
- Validation passes: independent root oracle 23/23, native history/root layer
  16/16, native acceleration 12/12, native coupled evolution 17/17, native Borg
  process 4/4, Borg JavaScript 63/63, independent phase-4 acceptance 12/12,
  independent certified evolution 10/10, and independent certified
  acceleration 16/16. The focused run-specific certificate was retired after
  the localized blocker closed; the independent control remains in the
  regression suite and the detailed packet remains available in git history.

## 2026-07-16 — MPFR exact-zero Horner fold

- The position Horner evaluation retains an exact-zero branch that copies the
  compiled coefficient for `[0,0] * x + coefficient` instead of multiplying.
  All trajectories are byte-identical, all work counts match, 32 native tests
  pass, and 96/192/384-bit fallback checks remain certified-complete.

## 2026-07-16 — first deterministic recursive block-exclusion path

- Extended the accepted moving-history certificate into a bounded recursive
  receiver/source/emission index with explicit `excluded`, `subdivide`,
  `exact_tile`, and `unresolved` routes. Relationship-level collapse accounts
  for every ordered pair, including self-pairs; any surviving time cell
  promotes the pair's complete emission interval to exact certification.
- **Derived:** outward residual exclusion is sound because every covered
  point residual is contained in the outward interval enclosure. Acceptance
  requires complete disjoint accounting and zero unresolved membership.
- **Measured:** independent root-oracle 23/23, moving-history/root 17/17,
  recursive controls 3/3, acceleration 12/12, coupled evolution 17/17, and
  native CTest 3/3 passed. No oracle root occurred in an excluded block, and
  single-thread/four-thread exact-fallback records were byte-identical.
- **Measured:** the complete sparse route, including exact fallback, reached
  10,000 paths and 100,000,000 logical pairs in 49.444 seconds with 98.96%
  exact-search reduction, zero unresolved pairs, and 1.264 GB peak resident
  memory. Matched one-thread controls measured 2.064x speedup at 128 paths and
  7.298x at 512. The dense ladder provided zero reduction and stopped at 2,048
  paths with `resource_envelope_exceeded` before candidate execution.
- Evidence and falsifiers:
  [eom-recursive-block-exclusion-first-path-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-first-path-apple-m3-2026-07-16.md).

## 2026-07-16 — Small-population performance stop rule

- **Measured basis:** successive certificate-equivalent MPFR rounds produced
  large wall-time reductions from decimal caching, compiled segment constants,
  sign-directed products, and worker-local storage. The next direct-slot round
  reduced wall time 5.6726%; the final exact-zero Horner round measured 0.6345%,
  with its three-pair whole-run confidence interval crossing zero. These are
  successive-baseline measurements and are not multiplied into one speedup.
- **Inferred engineering decision:** open-ended micro-optimization of the
  current small-population certificate path has reached diminishing returns and
  stops here. A new round requires a fresh phase-matched profile of the then-
  current accepted workload, not reuse of an earlier hotspot.
- The chosen reopening gate is a measured cost owner above 10% of total wall
  time plus a code-path argument for a certificate-equivalent change plausibly
  capable of removing at least 3% of total wall time. The 10% and 3% values are
  operating thresholds, not measured constants. A material workload or
  correctness change may also trigger remeasurement before applying the gate.
- This stop rule does not bar correctness repairs, adaptive-step or other
  algorithmic reductions in the number of certificate evaluations, or the
  separately scoped large-population certified block-exclusion program. Each
  still requires matched timing and unchanged independent acceptance evidence.
- A fresh profile and matched A-B test that meet the reopening gate would
  falsify the current diminishing-returns inference and supersede this stop.

## 2026-07-16 — moving-population recursive block-exclusion ladder

- Extended the staged benchmark to distinct accepted linear moving histories
  while leaving the recursive certificate, complete relationship accounting,
  full-interval exact fallback, and prohibited-approximation boundary
  unchanged.
- **Measured:** recursive controls passed 6/6, the moving-history/root suite and
  independent decimal oracle passed 17/17, and native CTest passed 3/3. Every
  excluded moving node was independently root-free, at least one exact-
  fallback pair contained an active root, and permitted schedules preserved
  membership and exact-row bytes.
- **Measured:** the complete sparse path reached 10,000 moving histories and
  100,000,000 logical pairs in 55.471 seconds with 98.96% exact-search
  reduction, zero unresolved membership, and 1.172 GiB peak resident memory.
  Matched one-thread speedups were 2.440x at 128 and 7.258x at 512 paths.
- **Measured:** the dense moving control excluded no relationships and stopped
  at 2,048 paths with `resource_envelope_exceeded`, accounting every projected
  relationship as unresolved rather than publishing a candidate result.
- Evidence and falsifiers:
  [eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-moving-population-apple-m3-2026-07-16.md).

## 2026-07-16 — accelerating piecewise-cubic block-exclusion ladder

- Extended the same recursive certificate to accepted histories with two
  accelerating cubic segments and exact position/velocity continuity at the
  segment join. No traversal, accounting, exact-fallback, or approximation
  rule changed.
- **Measured:** accelerating recursive controls passed 9/9, the history/root
  suite with the independent decimal oracle passed 18/18, and native CTest
  passed 3/3. Every excluded accelerating block was independently root-free,
  complete exact fallback crossed the join and found active roots, and the
  permitted schedules produced byte-identical exact packets.
- **Measured:** the complete sparse route reached 10,000 paths and 100,000,000
  logical pairs in 48.728 seconds with 98.96% exact-search reduction, zero
  unresolved membership, and 1.391 GiB peak resident memory. Matched one-
  thread speedups were 4.320x at 128 and 14.020x at 512 paths.
- **Measured:** the dense accelerating control excluded nothing and stopped at
  2,048 paths with `resource_envelope_exceeded`, accounting every projected
  pair as unresolved rather than publishing a candidate result.
- Evidence and falsifiers:
  [eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md](evidence/eom-recursive-block-exclusion-accelerating-population-apple-m3-2026-07-16.md).

## 2026-07-16 — Borg eight-path long-continuation diagnostic

- **Derived:** the retired 16-path `[0.06,0.07]` failure was misclassified.
  Ordered pair `1004<-1013` reached a base finite-width event certificate with
  `insufficient_history_depth`; because no event impulse existed, the regulator
  wrapper had no refinement series to compare. The engine nevertheless emitted
  `regulator_convergence_failed`. The engine now preserves the upstream event
  failure code, while true completed-but-nonconvergent regulator ladders retain
  `regulator_convergence_failed`.
- **Measured:** a manufactured boundary-entry control at the exact interval
  `[0.06,0.07]` rejects atomically with `insufficient_history_depth`. The full
  native coupled-evolution test covering that control passes.
- The operator confirmed that Borg's active promotion population is eight
  paths, not sixteen. The live eight-path strict seed-cut ladder passes at
  `0.01`, `0.005`, and `0.0025`; its maximum state delta is
  `6.291495102672684e-14`, and one-thread/four-thread `0.0025` histories are
  byte-identical.
- **Measured:** the best accepted strict continuation checkpoint reaches
  $T=34.4940625$. A resumed adaptive continuation with root, acceleration,
  position, velocity, and correction tolerances all `1e-8`, initial step `0.5`,
  and minimum step `0.0003125` consumed `600.174` seconds and hit the process
  timeout before publishing another accepted boundary.
- The operator subsequently selected certified artificial retained history as
  part of Borg's randomized initial condition. Under that contract, the strict
  seed-cut ladder and thread parity are the consumer promotion evidence; the
  long continuation is not a startup gate. Compatibility retirement remained
  separately operator-authorized.
- Evidence:
  [eom-borg-eight-path-promotion-attempt-apple-m3-2026-07-16.md](evidence/eom-borg-eight-path-promotion-attempt-apple-m3-2026-07-16.md).

## 2026-07-16 — Borg live bootstrap causal-history repair

- **Measured:** the port-5173 developer surface halted after six accepted
  chunks. The rejected `[0.06,0.07]` request reported
  `minimum_step_exhausted`, whose underlying atomic-step failure was
  `insufficient_history_depth` for ordered pair `1004<-1013`. The active app
  had launched the retired 16-path population with only the 10-unit
  compatibility fixture horizon.
- Aligned the live bootstrap with the current bounded migration target: the
  deterministic path prefix `1001`-`1008`, computed causal coverage for the
  accepted initial history, and the corresponding 4+4 polarity counts.
  The Simulation Envelope panel now reports the active EOM history depth and
  wake horizon rather than the compatibility fixture values. No EOM equation,
  tolerance, certificate, or fail-closed rule changed.
- **Measured:** after the native rebuild check, the former failing interval and
  the next five chunks completed directly through `T=0.12`. In the in-app
  browser the corrected run reached 213 accepted continuation chunks before an
  observed operator stop, with no solver failure.
- Validation: Borg JavaScript contract suites pass 30/30 and the native Borg
  process suite passes 4/4. A repeated `insufficient_history_depth` inside the
  computed eight-path initial-history interval, incomplete pair accounting, or
  failure to cross the former `[0.06,0.07]` interval would falsify this repair.

## 2026-07-16 — Borg eight-path block-exclusion matched replay

- **Measured:** five alternating fixed-`0.01` matched replays from the saved
  $T=34.4940625$ checkpoint produced byte-identical accepted histories and
  byte-identical complete 64-row root accounting. Every run accepted one step,
  rejected none, accounted for all 64 ordered pairs, and had zero unresolved
  membership.
- **Measured:** the certified traversal route executed and visited 127 nodes,
  but excluded zero ordered pairs. Both modes therefore performed the same 576
  root-pair certifications, 941,161 re-evaluated cells, and four MPFR pair
  evaluations.
- **Measured:** candidate/control internal EOM solver speedup was `0.9686x` by
  the mean and `0.9665x` by the median, below the predeclared `1.10x` material
  gate. The outer-process mean and median were `0.9904x` and `0.9881x`.
- **Inferred decision:** the present block certificate does not accelerate this
  dense eight-path checkpoint. No accepted result, master-equation rule, or
  trajectory value changed. The measured conclusion remains a work-log
  diagnostic and no longer controls Borg promotion; the standalone replay
  packet remains available in git history.

## 2026-07-16 — Borg accepted-initial-history promotion

- **Operator decision:** certified artificial retained history is part of
  Borg's randomized initial condition. Borg does not require the artificial
  segment to be displaced before publishing EOM evolution. General solver
  validation remains owned by the separate EOM validation workstream.
- **Derived:** for receiver endpoint $i$ and inertial source $j$, causal delay
  is bounded above by
  $\|\mathbf x_i-\mathbf x_j\|/(c_f-\|\mathbf v_j\|)$. Borg takes the maximum
  over ordered pairs, adds a declared margin, and rounds outward to the sample
  interval. The selected eight-path seed resolves to an initial-history depth
  of `79.86`; generation is one exact polynomial segment per path, not a
  sequence of evolved startup chunks.
- Borg ordinary startup now stays idle. Explicit shadow mode or **Start /
  restart** begins EOM evolution at $T=0$. Published frames carry
  `eom-evolution-conditioned-on-accepted-initial-history`; the initial-history
  certificate continues to record `eomOutput=false`.
- **Measured:** the existing strict eight-path `0.01`, `0.005`, and `0.0025`
  refinement ladder passes with maximum state delta
  `6.291495102672684e-14`; one-thread/four-thread `0.0025` histories are
  byte-identical. This is the completed Borg consumer promotion gate under the
  selected contract.
- Removed the obsolete long-horizon promotion harness, its gate-specific
  records, and the dedicated block-exclusion benchmark harness. The measured
  root and performance conclusions remain preserved as historical diagnostics.
- Falsifier: reject Borg promotion if initial-history coverage is incomplete,
  its certificate does not bind the selected population, strict refinement or
  thread determinism fails, or the app labels artificial input history as EOM
  output.

## 2026-07-16 — Priority-queue reconciliation

- Removed three completed items from the immediate priority queue per the
  completed-task removal rule and renumbered the remainder:
  `eom_sole_engine` (enforced repo-wide; restated as the standing
  Non-Negotiable Boundary rules 1–2), `borg_shadow_run_and_first_migration`
  (accepted-initial-history promotion recorded above with its evidence
  packet), and `consumer_migration` (all consumers on EOM, conditional
  analysis, or recorded-dataset playback).
- Updated workstream metadata to `borg-accepted-initial-history-promotion-complete`
  and marked the first-path recursive block-exclusion packet
  `complete-for-declared-first-path-round` to match its two completed
  follow-on ladder packets.

## 2026-07-16 — Certified far-field contribution enclosure

- **Derived:** a far subluminal source has at most one retained causal root,
  and the frozen receiver-side-factor law is bounded by
  $\kappa|q_iq_j|(c_f+v_i)/(r_{\min}^2(c_f-v_j))$. The cutoff is solved from a
  declared acceleration-width slice; it is not a distance constant.
- Implemented pre-root per-pair classification, symmetric acceleration rows,
  fixed-tree accumulation, complete exact/enclosed/unresolved snapshot
  accounting, and checkpoint binding. Failed enclosure rows fall back to the
  existing exact route.
- Bumped the Borg process contract forward to V2 with exactly 18 fields and an
  explicit enclosure fraction. Borg declares `0.25`; missing or under-length
  controls fail closed.
- **Measured:** the independent static-pair closed form is contained by the
  native interval. A 3:3 memory-boundary control rejects as
  `insufficient_history_depth` when disabled and completes through $T=3$ when
  enabled, with $36=0+6+30+0$ and maximum receiver enclosed width
  `0.0065277777777779092 <= 0.025`.
- **Derived and measured-test:** the enclosed-width ledger sums the actual
  emitted interval widths with directed upward rounding. `FFE-SUM-01` compares
  that certified upper bound with the lower edge of the declared receiver
  slice.
- **Measured:** disabled static and interacting outputs are byte-identical to
  the pre-enclosure binary. EOM tests pass 139/139, Borg tests pass 63/63, and
  all pre-commit mirrors pass.
- **Measured:** the actual seed-0 run with the final Borg `0.25` enclosure
  fraction remains blocked before dispersal at `FWC-REG-02`
  ($T=1.3759765625$, 109.33-second terminal chunk), so its live
  before/after-dispersal cost remains an explicit obligation rather than an
  inferred success.

## 2026-07-16 — Research-grade caustic track discriminator

- **Measured:** with root, position, and velocity tolerances fixed at `1e-8`,
  2,048-bit MPFR available, the event budgets unchanged at `1e-7`, and the
  ceiling unchanged at 200,000 cells, seed-0 tracks with maximum steps `0.01`
  and `0.005` halted first at `FWC-ENTRY-02` through `T=1.24965625` and
  `T=1.2846875` respectively.
- **Measured:** the `0.0025` track crossed both entry boundaries. Its routed
  `[0.3425,0.345]` attempt certified the complete core ladder, including
  $\epsilon_c=0.05$ in 5,440 cells with impulse width `9.69534e-8`, then
  rejected atomically on `FWC-STATE-01` for pair `1004<-1006`.
- **Measured:** after subdivision the run completed through `T=1.4`, but no
  accepted child regulator certificate discharged the rejected event. A
  continuation reached `T=1.4004` and halted on the ordinary
  `numeric_step_budget_exceeded` floor, not an FWC row. No full finite-width
  passage is claimed.
- **Derived:** `FWC-STATE-01` now requires separate event-aware state
  reconstruction and common-domain chart matching. Any endpoint-linear sharp
  shortcut carries outward remainders $h_C^3L_2/12$ for impulse and
  $h_C^4L_2/24$ for position moment; no raw full-window sharp trapezoid is
  admitted across a fold. Routed pairs remain pinned across child windows
  until state and exit pass or the event floor halts.
- **Measured:** the profiling instrument now retains regulator certificates
  from every attempted step, including certified regulator rows attached to a
  later state-row rejection. The EOM solver and Decimal oracle were unchanged
  by that instrumentation edit.
- Falsifier: overturn this adjudication with a same-control accepted child row
  that certifies the pinned pair's regulator, state reconstruction, common-
  domain overlap, and sharp exit, or with a derivation that supplies a finite
  full-window sharp remainder across the fold.

## 2026-07-16 — Demo-track FWC regulator disposition

- **Operator decision:** retain the default seed-0 demo track's atomic
  `FWC-REG-02` halt as its accepted adjudicated state. This closes the prior
  “certify $\epsilon_c=0.1$ or retain the halt” choice on the retain branch;
  no FWC engine change is authorized by this decision.
- **Measured basis:** on the same retained histories, raising the cell ceiling
  from 50,000 to 200,000 reduced the final impulse width from `1.95713e-7` to
  `1.82541e-7`, only `6.73%`, while the unchanged budget remained `1e-7`.
- The research-tolerance control and all remaining finite-width obligations
  are assigned to a follow-up FWC thread. The far-field enclosure packet may
  rely on the named default halt as an earlier independent terminal event; it
  may not claim a live dispersed replay until a certified trajectory reaches
  that regime.
- Falsifier: reopen the disposition if the same default retained histories
  certify $\epsilon_c=0.1$ within the unchanged `1e-7` and 200,000-cell
  budgets at bounded wall cost.

## 2026-07-16 — Borg display and certified run grades

- **Operator decision:** Borg defaults to display grade. FWC entry, regulator,
  state, and exit rows may become pair-scoped warnings; every other rejection
  remains fail-closed. Certified grade retains the existing publication gate.
- **Measured:** the final certified fixture artifact is byte-identical to the
  frozen pre-change artifact. Seed-0 display grade crossed the first regulator
  halt, carried both ordered directions of the warned encounter through the
  following entry row, and completed the requested run through $T=1.45$ with
  all post-warning segments marked `uncertified-through-encounters`.
- **Measured cost:** the $[1.35,1.40]$ encounter chunk cost `95.9311 s`; the
  $[1.40,1.45]$ continuation cost `97.0854 s`. A 64-path 32:32 display run
  completed a 0.05-time chunk in `1.293216667 s` outer wall time and produced
  384 playback frames, or `0.0386633` simulated seconds per wall second.
- The single Borg process contract is `EOM_BORG_NATIVE_V4` with exactly 22
  `RUN` fields. The cumulative provenance includes warning count, first time,
  and the reciprocal ordered-pair set needed at later atomic chunk boundaries.
- Evidence:
  [eom-run-grade-display-seed-0-and-64-2026-07-16.md](evidence/eom-run-grade-display-seed-0-and-64-2026-07-16.md).
- Falsifier: a certified deterministic token changes, an ordinary rejection is
  published in display grade, a post-warning frame lacks demotion, or the same
  measured controls fail before their recorded endpoints.

## 2026-07-16 — Display-grade immediate caustic warning path

- **Implemented:** display grade emits `FWC-ENTRY-02` at the caustic dispatch
  and continues the ordinary corrected candidate without running regulator
  ladders, event cells, state reconstruction, or exit adjudication. Complete
  root rows return the warned pair to the sharp chart; the reciprocal pair set
  remains in cumulative provenance and bridges non-complete retained-join
  entry rows only.
- **Measured:** the deterministic certified fixture artifact remained
  byte-identical at SHA-256
  `589b086b96ed3f441eaae30c8fcce177103e8d2c22b6c0fa862c1c53749deacc`.
  The display fixture accepted with one entry warning, zero regulator rows,
  and zero event impulses; its ordinary-correction negative still rejected.
- **Measured cost:** seed 0 completed $[1.35,1.40]$ in `0.925956 s` and
  $[1.40,1.45]$ in `5.19938 s`, versus the earlier `95.9311 s` and
  `97.0854 s`. The demoted run continued to $T=2.0$; the next request failed
  closed before returning a certificate on `history evaluation lies outside
  segment`, so the requested $T=3$ continuation remains open outside the FWC
  route.
- **Measured 64-path control:** 384 frames and 0.05 simulated seconds were
  produced in `1.206753167 s` outer wall time, or `0.0414335` simulated
  seconds per wall second. Replacing the event detector's repeated root-row
  identity search with the aligned certificate index removed the smooth-path
  regression without changing certified tokens.
- Evidence:
  [eom-run-grade-display-seed-0-and-64-2026-07-16.md](evidence/eom-run-grade-display-seed-0-and-64-2026-07-16.md).
- Falsifier: any certified fixture token changes, a display event emits a
  regulator/event row, an ordinary correction is published, either encounter
  chunk exceeds the declared two-times pre-FWC target on repeat without host
  contention, or the retained-history boundary is shown to be an FWC halt.

## 2026-07-16 — Pinned FWC state reconstruction

- **Derived and implemented:** routed ordered pairs now remain pinned from a
  rejected parent through every controller and atomic half-step child. A first
  half may carry state-certified/exit-pending histories only into the second
  half; it has no publication authority by itself.
- **Derived and implemented:** FWC state rows use disjoint background plus
  event endpoint assembly. Common-domain comparison certifies root tubes,
  complement, source normal, and separation before emitting the
  $h_C^3L_2/12$ impulse and $h_C^4L_2/24$ position-moment shortcut remainders.
  The raw full-window sharp trapezoid path is removed.
- **Measured:** the unchanged research-grade `h_max=0.0025` seed-0 control
  halts atomically at `T=0.3425` on `FWC-STATE-01`. Entry, regulator, endpoint
  assembly, and exit pass. On the minimum-height child, pair `1004<-1006` has
  a component-0 common-domain gap `3.51437e-11` versus complete remainder
  `6.29988e-16`; the terminal chunk costs `6.39989 s`.
- **Inferred:** on this fixed track the remaining negative is a chart-center
  obligation, not a missing track or shortcut enclosure. The next rung is the
  regulator-level/common-domain matching law, unless a separately recomputed
  tighter track moves the centers into overlap.
- The Decimal oracle was not modified. The unchanged independent event
  integral reference and the analytic interpolation-remainder derivation are
  the named independent references.
- Evidence:
  [finite-width-close-approach-caustic-route-seed-0-2026-07-16.md](evidence/finite-width-close-approach-caustic-route-seed-0-2026-07-16.md).
- Falsifier: a pinned pair disappears from a child, an exit-pending half is
  published, recomputation exceeds either emitted remainder, or the same
  control closes the componentwise common-domain gap.

## 2026-07-16 — Positive-regulator common-domain matching proposal

- **Derived:** on a certified simple-root tube, changing variables from
  emission time to the causal residual gives a Gaussian moment expansion. The
  bound finite-width law differs from the sharp law at leading order by a
  core term proportional to $-3\epsilon_c^2/(2r^2)$ and a causal-width term
  proportional to $\eta^2\partial_u^2\mathbf P_0/2$, plus higher-order, tail,
  and root-free-complement terms.
- **Derived:** the frozen law satisfies common-domain convergence as
  $\eta,\epsilon_c\to0^+$ but does not imply literal equality at fixed positive
  regulators. The current `FWC-STATE-01` comparison carries shortcut and track
  remainders but no regulator-matching remainder.
- **Inferred prediction:** the recorded `1004 <- 1006` raw component-0 gap
  remains `3.51437e-11`; a valid regulator-matching enclosure must have radius
  at least that large and is predicted to reduce the post-accounting disjoint
  distance to zero while the total remains inside the unchanged `1e-7` budget.
- Staged
  [master-eom-binding-v0-amendment-1-common-domain-matching.md](master-eom-binding-v0-amendment-1-common-domain-matching.md)
  as `pending-operator-ratification`. The frozen binding, finite-width route,
  EOM solver, and Decimal oracle were not edited.
- Falsifier: a certified regulator-error evaluation excludes the measured gap,
  independent regulator refinement does not move the raw finite-width chart
  toward the sharp chart, or theorem review finds a missing leading term.

## 2026-07-17 — Common-domain regulator-limit matching ratified

- **Operator decision:** adopted regulator-limit common-domain matching with a
  certified $R^{\mathrm{reg}}$ and rejected exact positive-regulator identity.
- **Derived binding:** on a certified common simple-root domain, fixed positive
  $\eta$ and $\epsilon_c$ need not make the sharp and finite-width chart
  integrals equal. Their componentwise distance must be enclosed by the sum of
  the numerical remainder and the regulator-matching remainder.
- **Unchanged authority:** the two boxed acceleration laws, regulator values,
  event budgets, and prohibition on using the sharp quotient when its source-
  normal floor fails are unchanged.
- **Fail-closed implementation boundary:** the current EOM solver does not yet
  emit $R^{\mathrm{reg}}$. Its existing `FWC-STATE-01` halt remains
  adjudicated until an independent implementation contains the actual chart
  difference and keeps the complete remainder inside the unchanged budget.
- Ratified
  [Master EOM Binding v0 Amendment 1](master-eom-binding-v0-amendment-1-common-domain-matching.md),
  amended [master-eom-binding-v0.md](master-eom-binding-v0.md), and propagated
  the normative condition into the finite-width route.
- Claim grade: `operator-decision` for the selected contract and `derived` for
  the matching condition. Falsifier: an analytic common-domain control lies
  outside the certified regulator remainder, or the complete numerical-plus-
  regulator row exceeds an unchanged event budget.

## 2026-07-17 — Amendment 1 regulator remainder and first certified transit

- **Derived and implemented:** common simple-root tubes now emit the
  emission-coordinate $\partial_u^2P_0$ bound, the Amendment 1 leading
  core-plus-causal-width impulse and position-moment terms, complete outward
  higher-order/tail/complement residuals, and the final
  $R^{\mathrm{num}}+R^{\mathrm{reg}}$ budget rows. A zero-containing source
  normal still prohibits the sharp quotient.
- **Independent analytic control:** for a stationary simple root, the native
  regulator row `[-2.5918113797e-8,2.5918113797e-8]` contains the exact
  normal-CDF difference `2.2853586273e-8`. The Decimal oracle was unchanged.
- **Measured prediction check:** the former minimum-height seed-0 cell
  reproduces raw gap `3.51437e-11` and numerical remainder `6.29988e-16`; the
  new regulator radius is `5.11160e-11`, so the post-accounting distance is
  zero under the unchanged `1e-7` budget. Pair `1004 <- 1002` likewise has
  `1.70130e-10` enclosed by `4.24835e-10`.
- **Measured first transit:** the certified `h_max=0.0025` run atomically
  publishes `[0.3425,0.3428125]` with entry, regulator, endpoint assembly,
  common-domain matching, and exit rows all passing. The enclosing requested
  chunk costs `5.09915 s`.
- **Post-transit boundary:** the next subdivision reaches
  `minimum_step_exhausted` through `numeric_step_budget_exceeded` at
  `T=0.3428125`; no second encounter or dispersal is reached. This is a
  non-FWC track-quality boundary, not a failed transit row.
- **Validation:** 145 EOM Python tests and 67 Borg JavaScript tests pass. Two
  deterministic fixture runs have identical SHA-256
  `d38cb2c08d2f5ff297f5abf95556986468fba83566d9970970afd76575d464a0`.
- Evidence:
  [eom-fwc-regulator-matching-remainder-seed-0-2026-07-17.md](evidence/eom-fwc-regulator-matching-remainder-seed-0-2026-07-17.md).
- Falsifier: the analytic value lies outside the emitted remainder, the raw
  gap moves materially without a law change, a complete row exceeds budget,
  the child is not published atomically, or any validation fails.

## 2026-07-17 — Ordinary-root classification and monotone interior enclosure

- **Derived:** for opposite strict endpoint signs and a one-sign transmitter-side-factor
  enclosure, the mean-value theorem encloses the unique interior root by
  $[a,b]\cap(p-G_p/D_s([a,b]))$. This asymmetric row replaces the failed
  symmetric-probe-only decision without changing the `1e-3` Borg root
  tolerance or any caustic budget.
- **Independent analytic control:** the stationary control
  $g(S)=S-0.50003059$ with source-position error $\pm0.00028$ has the exact
  admissible root set $[0.49975059,0.50031059]$. The native MPFR enclosure
  contains that complete interval, has width at most `0.001`, and certifies a
  positive source normal. The Decimal oracle was not modified.
- **Measured trajectory control:** before this change, the seed-0 display run
  halted at `T=0.3516625` on `interior_root_not_surrounded`. The rebuilt binary
  clears that row, warns through the encountered FWC entries, and reaches
  `T=0.5624046875`. It then halts on the distinct
  `endpoint_root_not_surrounded` boundary; the terminal chunk `[0.55,0.60]`
  costs `4.70107 s`.
- **Classification correction:** ordinary root-completeness failures now retain
  `root_completeness_not_certified` in display and certified grades, carry an
  empty `causticContractRow`, and report the regulator level as
  `not-applicable`. A genuine root certificate with
  `caustic_route_required` retains `FWC-ENTRY-02`; no rejected candidate is
  published.
- Claim grades: the enclosure and classification conditions are `derived`; the
  analytic containment, trajectory extent, terminal row, and wall cost are
  `measured` on 2026-07-17. Falsifiers: the analytic root set leaves the native
  bracket, the bracket exceeds the unchanged tolerance, the former seed-0 row
  again halts at `T=0.3516625`, an ordinary root failure carries an FWC row, or
  any rejected candidate appears in published history.

## 2026-07-17 — Coupled-correction terminal classification

- **Measured diagnosis:** the current seed-0 3:3 display-grade control with
  `h_max=0.025` and per-axis initial-speed maximum `0.03` reaches
  `T=0.683203125`, then rejects down to `h=0.0001` because the coupled
  correction does not converge. The terminal atomic row is
  `coupled_correction_failed`; it has no root or finite-width failure row.
- **Derived classification:** exhaustion of the controller height does not
  erase the named atomic cause. A terminal `coupled_correction_failed` row now
  remains the top-level halt code and carries no caustic contract or regulator
  level. The candidate remains rejected and publication remains atomic.
- **Measured requested-default control:** with only the initial-speed maximum
  changed to `0.01`, the same seed and controller halt at `T=0.55390625` on
  `coupled_correction_failed`; the terminal chunk costs `4.57775 s` and the
  correction residual is `0.000206005`.
- Falsifiers: the response again reports `minimum_step_exhausted` over a
  terminal coupled-correction row, any rejected candidate is published, an FWC
  row appears on the ordinary correction failure, or the stated seed-0 control
  produces a different terminal certificate with the same binary and inputs.

## 2026-07-17 — Display-grade residual-scaled correction retries

- **Derived controller:** after a display-grade
  `coupled_correction_failed` row with failed acceleration-consistency
  residual $R_c>\tau_c$, the EOM solver now selects
  $s_c=\min(1/2,0.9\sqrt{\tau_c/R_c})$. Missing or unusable residuals fall
  back to one half. Certified grade remains exact halving, and no acceptance
  or publication row changed.
- **Measured deterministic control:** with $R_c=1.29131\times10^{-5}$ and
  $\tau_c=10^{-7}$, display grade selected `0.0792003` and attempted
  `0.00316801` after `0.04`; the otherwise identical certified control
  attempted `0.02`. Both rejected candidates retained the input history
  atomically.
- **Measured seed-0 control:** with 3:3 paths, coupling `0.05`,
  `h_initial=h_max=0.025`, and `h_min=0.0001`, the terminal chunk reached
  `T=0.5528107343035016`, rejected 7 attempts, reevaluated 55,471 root cells,
  and cost `4.64220 s`. Its correction rows carried residuals near `4.59` and
  selected scales near `0.133`, reaching viable heights without intermediate
  blind halvings.
- **Measured negative speed result:** the preceding exact-halving control
  rejected 9 attempts, reevaluated 52,290 root cells, and cost `4.57775 s`.
  Fewer rejected attempts therefore did not reduce wall time on this encounter;
  the measured cost changed by about `+1.4%`. Repeated root certification, not
  the scalar height calculation, remains the next measured cost target.
- **Diagnostic correction:** the prior `0.000206005` terminal
  `correctionResidual` was the last inner-corrector value, not the later
  accepted-history recertification value that caused rejection. The response
  now reports that actual failed row and its selected retry scale.
- **Certified-parity guard:** two runs of the deterministic `all` fixture retain
  SHA-256 `d38cb2c08d2f5ff297f5abf95556986468fba83566d9970970afd76575d464a0`.
  Certified correction retries remain exact halvings, and their serialized
  response shape receives no display retry-scale field.
- **Validation:** 147 EOM Python tests and 70 Borg JavaScript tests pass; the
  repository pre-commit checks pass.
- Claim grades: the controller and unchanged-gate statement are `derived`; the
  fixture values, seed extent, cell counts, and costs are `measured` on the
  rebuilt local binary. Falsifiers: certified grade does not halve exactly,
  the emitted scale differs from the formula, a rejected candidate is
  published, the named controls do not reproduce their attempt sequences, or
  any validation fails.

## 2026-07-17 — Separate binary64 display evaluator

- **Derived implementation:** `run_grade=display` now dispatches before the
  certified snapshot route into an ordered-pair binary64 evaluator. It solves
  delayed roots with safeguarded Newton/bisection at relative tolerance
  `1e-9`, evaluates the bound master equation at those roots, and supplies
  point accelerations to the existing coupled cubic corrector. It constructs
  no interval/MPFR root work, cell ledger, root certificate, FWC row,
  regulator ladder, or full/two-half certification comparison. Certified grade
  retains its prior route.
- **Derived close-approach disposition:** core-active or near-transmitter-side-factor-
  pole pairs use the frozen finite-width regulated integrand with fixed-order
  binary64 quadrature. A continuing step records only
  `DISPLAY-REGULATOR-01/display_core_regulator_applied` with its reception
  interval and ordered pair. `display_nonfinite_state`,
  `display_root_solve_not_converged`, `display_insufficient_history_depth`, and
  `display_invalid_evaluation_request` remain fatal. Borg retains display
  history and extends a finite run's exact inertial datum by the requested run
  duration rather than discarding a still-needed emission root.
- **Derived provenance:** every display response, published segment, and Borg
  frame is `display-only`; the UI label is `DISPLAY ONLY — uncontrolled error;
  not evidence` from the first frame. Display output has no promotion path.
- **Measured 64-path acceptance:** a 32:32 seed with the default `0.3` Borg
  delivery chunk and unchanged `0.05` EOM-solver step completed through `T=3`
  without a halt. EOM-solver compute was `1.0627483 s`, or `2.82287`
  simulated seconds per wall second. End-to-end Borg throughput was `1.33374`
  sim-s/wall-s, above the `1.0` target. The measured remainder was `1.18657 s`
  in request encoding, process transfer, response parsing, and retained-history
  merge. Inside the nested EOM-solver correction timer, root batches consumed
  `0.354903 s` and history copy/hash consumed `0.537573 s`; these nested timers
  must not be added to the correction total. A `0.05`-delivery diagnostic kept
  EOM-solver throughput at `3.04973` but reduced end-to-end throughput to
  `0.435228`, locating the loss in sixty protocol round trips rather than the
  pair evaluator.
- **Measured duration controls:** the 3:3 run completed through `T=10` at
  `39.5597` EOM-solver sim-s/wall-s and `1.74979` end-to-end sim-s/wall-s. The
  8:8 run completed through `T=10` at `13.4353` EOM-solver sim-s/wall-s and
  `0.669256` end-to-end sim-s/wall-s. Neither run halted.
- **Measured smooth control:** a six-path unit-envelope control had sampled
  minimum pair separation `0.989811` against core separation `0.02` and zero
  regulator warnings through `T=1`. The maximum display/certified position
  difference at `T=1` was `7.45122e-12`, or the same fraction of the unit
  envelope radius. This is a control measurement, not a display error bound.
- **Certified parity:** the rebuilt deterministic `all` fixture retains
  SHA-256 `d38cb2c08d2f5ff297f5abf95556986468fba83566d9970970afd76575d464a0`.
- **Validation:** all 147 EOM Python tests, all 70 Borg JavaScript tests, all
  three native CTest fixtures, and the repository pre-commit checks pass.
- Claim grades: route separation and provenance enforcement are `derived`;
  rates, timings, extent, separation, trajectory difference, and SHA are
  `measured` on the rebuilt local binary. Falsifiers: the SHA changes; any
  display segment lacks `display-only`; any display request constructs a root,
  FWC, interval, MPFR, or cell certificate; a named fatal breakdown publishes;
  the stated controls halt early; or rerunning the profile yields a different
  rate outside ordinary host-load variation.

## 2026-07-17 — Certified-only Borg evolution

- **Operator decision:** Borg has one numerical evolution route: certified
  retained-history evolution. The binary64 display evaluator, warning-based
  caustic continuation, run-grade control, alternate provenance, and UI toggle
  are removed. Playback buffering, measured slow-motion playback, live-history
  retention, and diagnostics remain app presentation machinery and do not
  alter EOM-solver acceptance.
- **Derived controller:** the residual-scaled correction retry
  $s_c=\min(1/2,0.9\sqrt{\tau_c/R_c})$ now applies to certified
  `coupled_correction_failed` retries. Every correction, local-error, root,
  finite-width, and atomic-publication row remains authoritative. Missing or
  unusable residuals fall back to exact halving.
- **Forward-only protocol:** `EOM_BORG_NATIVE_V6` has one exact 20-field `RUN`
  record and one exact six-field `PATH` record. No run-grade field, warning
  continuation ledger, alternate parser, or multi-version path remains.
- **Measured certified parity control:** the same smooth one-path request was
  run through a clean `HEAD` build of the V5 certified route and the rebuilt V6
  route. After removing only the deleted run-grade metadata and nondeterministic
  wall timers, every numerical token, certificate row, published cubic, error
  radius, accepted-step count, and controller-height token was bit-identical.
- **Measured validation:** all 149 EOM Python tests and all 85 Borg JavaScript
  tests pass on the rebuilt local targets. The complete C++ target set builds,
  and the content, scene-graph, receiver-side-factor, frequency-triplet, polarity,
  and animator pre-commit validators pass.
- Claim grades: the single-route architecture, unchanged acceptance authority,
  and protocol field count are `derived` from the implementation; the build and
  validation results are `measured` on the local checkout. Falsifiers: any
  request selects a second numerical route, a rejected candidate is published,
  a non-20-field `RUN` record is accepted, the retry scale differs from the
  stated formula for its certified control, or a named validation fails.

## 2026-07-18 — Restore certified far-field enclosure after display removal

- **Configuration correction:** Borg again declares
  `farFieldEnclosureFraction=0.25`, as required by the certified far-field
  packet. The zero value belonged to display mode's evaluate-every-pair route
  and incorrectly survived its removal, disabling the certified enclosure for
  live Borg runs.
- **Measured paired control:** the rebuilt seed-0 3:3 run used coupling
  `0.0005`, maximum per-axis speed `0.001`, $h=0.05$, a `1.1` retained-history
  horizon, and 83 chunks of width `0.3`. With the enclosure fraction `0.25`, it
  completed all 83 chunks through $T=24.9$ in `4.47337` native wall seconds and
  `5.56772` outer wall seconds. The identical control with the enclosure
  disabled halted at $T=17.400490625$ with `minimum_step_exhausted`.
- **Measured mechanism control:** the independent dispersed 3:3 fixture with
  `0.25` completed with 30 enclosed off-diagonal pairs and six exact self
  pairs; the disabled control rejected as `insufficient_history_depth`.
- **Protocol hardening:** nonfinite diagnostic-only floating values now encode
  as JSON `null`. During the disabled paired control, the pre-fix response
  emitted bare `inf` and could not be parsed; after rebuilding, the same run
  returned its structured named halt without publishing the rejected step.
- **Profiler control:** `profile-borg-incremental-chunks.mjs` accepts an
  explicit `--history-depth` so a bounded Borg wake horizon can be tested
  without the profiler silently preloading the complete requested duration.
- Claim grades: the default mismatch and protocol encoding are `measured` by
  current-code inspection; the paired outcomes, timings, and ledger are
  `measured` on the rebuilt local binary. Falsifiers: Borg emits a fraction
  other than `0.25`, the enabled seed-0 control halts before $T=24.9$, the
  disabled control reaches that endpoint, a nonfinite diagnostic produces
  invalid JSON, or an enclosed-pair ledger fails its exact accounting row.

## 2026-07-18 — Coherent certified-budget ledger and Amendment 2 proposal

- **Derived:** reduced the numerical contract to two published per-step
  increments, position and velocity. Root time is charged through the complete
  acceleration enclosure; acceleration and correction residuals are integrated
  with $h$ and $h^2/2$; finite-width impulse feeds velocity directly and
  position moment feeds position directly.
- **Derived:** common-domain overlap requires no independent tolerance. Its
  numerical and Amendment 1 regulator-matching remainders spend the same
  receiver-total impulse or position-moment row budget. A separate overlap
  number would double-spend those remainders.
- **Derived proposal:** staged `Interactive certified budget` and `Research
  certified budget` as complete proposed records, including regulator values,
  precision floors, convergence slices, rounding/reduction policy, and
  resource ceilings. The completed sensitivity pass sets Research to the
  current live Borg allocation. Interactive changes only receiver acceleration
  from `0.1` to `0.3` and proposes `1e-6` receiver event totals through the
  displayed state-budget inequalities; it remains blocked by state-radius
  propagation and ratification.
- **Ratification gate:** staged Amendment 2 as pending. The frozen binding,
  native `1e-7` event values, `EOM_BORG_NATIVE_V6`, Borg defaults, and UI are
  unchanged until explicit operator ratification.
- Claim grade: `derived` for the dimensional mapping and no-independent-overlap
  result; `derived-proposal` for the two records and amendment language.
  Falsifiers: an error source cannot be charged through the stated map; a
  receiver can spend more than the sum of its routed-pair allocations; either
  preset exceeds its displayed $B_x$ or $B_v$ bound; or current source changes
  a gated value before ratification.
- **Measured negative control:** the stricter header-default combination
  (`1e-12` root, `1e-9` acceleration, and `1e-8` state/correction controls)
  spent `343.813 s` on one requested `0.05` interval and halted at
  `T=0.007593126992950852` on `FWC-STATE-01`. The finite-width execution union
  consumed `343.395 s`; acceleration precision escalation consumed `332.466`
  worker-seconds. This corrected the initial assumption that the header
  defaults were the recorded Research control.

## 2026-07-18 — Certified-budget ledger, sensitivity matrix, and ratification gate

- **Derived proposal:** staged one dimensional ledger with top-level position
  and velocity increments, receiver-total event budgets, explicit remainder
  slices, no independent common-domain overlap allowance, and resource ceilings
  separated from mathematical error. Staged Amendment 2 without editing the
  frozen binding or changing the native `1e-7` event budgets.
- **Measured OAT result:** across seeds 0–3 at six paths and `T=1.2`, only the
  receiver acceleration change `0.1 -> 0.3` changed the executed mechanism and
  wall rate. Mean rate rose from `7.60` to `10.66` simulated seconds per wall
  second; position, velocity, correction, and root `3x` rows stayed near host
  scatter. Falsifier: a repeat sweep assigns the gain to another OAT row or
  shows no correlated far-field/root-work change.
- **Measured inconsistency:** the acceleration candidate's seed-0 endpoint
  differs from the Research reference by `0.004784` position and `0.008027`
  velocity while its emitted radii are much smaller. The current published
  segment therefore does not carry the full acceleration-derived state
  allowance. Interactive authority is blocked until complete state-radius
  propagation and an independent containment control pass. Falsifier: a direct
  reconstruction shows those contributions already present in the emitted
  radii.
- **Measured hot spots:** the finite-width halt spent `34.6358 s` of `34.8246 s`
  in the event regulator ladder; the strict-state seed-3 negative spent
  `78.0756 s` of `78.6071 s` there. The ordinary 32/64-path controls remained
  dominated by the nested correction and exact-root path, and the acceleration
  speed ratio fell from `1.60x` at six paths to `1.01x` at 64. Falsifier: repeat
  phase timers move the wall cost to a different phase outside host-load
  variation.
- **Pending decision:** ratify or reject Amendment 2. No preset registry,
  protocol revision, Borg default, UI, run-selected event budget, or binding
  edit has been implemented.
- **Evidence:**
  [borg-certified-budget-sensitivity-apple-m3-2026-07-18.md](evidence/borg-certified-budget-sensitivity-apple-m3-2026-07-18.md).

## 2026-07-18 — Amendment 2 ratification and V7 implementation acceptance blocker

- **Operator decision:** ratified Amendment 2 and both complete preset records.
  The binding now permits versioned run-selected certified budgets without
  weakening any finite-width, rounding, root, or atomic-publication gate.
- **Derived implementation:** added one canonical two-preset registry, stable
  complete-allocation hashes, a two-choice UI selector, atomic preset
  controller ownership, exact V7/54 request encoding and parsing, complete
  request/response provenance, receiver-total equal routed-pair event
  allocation, zero independent overlap allowance, and charged regulator and
  matching slices. V6 has no compatibility parser.
- **Derived state correction:** published position radius now carries inherited
  position plus $h$ times inherited velocity width and $h^2/2$ times the
  acceleration width; velocity carries inherited velocity plus $h$ times the
  acceleration width. This removes the pre-ratification omitted-width defect.
- **Measured independent controls:** both selectable finite-width event budgets
  contain the unchanged Decimal-oracle value; a deliberate `1e-12`
  under-budget request rejects. The oracle implementation was not modified.
- **Measured parity failure:** the corrected widths change the retained-history
  root track. Research seeds 0–3 halt on `root_completeness_not_certified` at
  `0.3485375`, `0.3924828125`, `0.3588890625`, and `0.3186546875`, rather than
  reproducing the historical `T=1.2` control. Amendment 2 implementation
  acceptance therefore remains blocked. Falsifier: the exact V7 sweep reaches
  the old endpoints while retaining the corrected widths and every gate.
- **Measured Interactive survival:** Interactive reaches `0.3994140625`,
  `0.708203125`, `1.2` completed, and `0.29140625` on seeds 0–3. It improves
  survival on three seeds and worsens it on seed 3. At common seed-0 `T=0.3`,
  Research and Interactive intervals overlap, while the separate visible-track
  diagnostic fails on a `0.00198138` maximum velocity difference.
- **Validation:** native build and CTest `3/3`, Borg JavaScript `86/86`, EOM
  Python and unchanged-oracle `150/150`, V7 protocol `12/12`, and native coupled
  evolution `24/24` pass. The evidence record contains the exact commands and
  phase shares.
- **Fail-closed default disposition:** Research remains the Borg default because
  the explicit acceptance rule forbids Interactive default authority before
  Research parity passes. Both ratified records remain selectable for controlled
  validation.
- **Evidence:**
  [borg-certified-budget-v7-implementation-validation-apple-m3-2026-07-18.md](evidence/borg-certified-budget-v7-implementation-validation-apple-m3-2026-07-18.md).

## 2026-07-18 — Research-parity root-width mechanism adjudication

- **Measured first rows:** reproduced the four Research halts and the terminal
  minimum-step attempts. Seeds 1 and 2 stop on interior roots whose residual
  widths are `1.000337927225727e-3` and `1.000503017254976e-3` against the
  `1e-3` root ceiling. Seeds 0 and 3 stop at source-segment joins even though
  the point-residual widths are below the ceiling. Every row retains strict
  normals near one and exhausts 512-bit MPFR, so arithmetic precision and a
  transmitter-side-factor pole are excluded.
- **Derived mechanism:** candidate construction collapses the three
  componentwise state radii to one maximum, stores one scalar error, and root
  evaluation reinflates every axis by that scalar. Join validation preserves
  overlapping endpoint boxes rather than one shared endpoint state. The first
  interior-root blocker is therefore scalar isotropic width; the first
  join-root blocker is missing cross-segment endpoint correlation.
- **Adjudication:** representation improvement comes before budget change.
  Retain corrected widths and every fail-closed row, implement a componentwise
  and join-correlated diagnostic, then rerun the unchanged Research gate. A
  new root allocation becomes eligible for derivation only if that ablation
  leaves an irreducible width above `1e-3` and the induced acceleration still
  fits the Research `1e-1` row.
- **Evidence:**
  [borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md](evidence/borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md).

## 2026-07-18 — V8 axis-radius, shared-endpoint, and halted-prefix ablation

- **Derived implementation:** V8 carries three position and three velocity
  radius tokens through retained histories, checkpoints, native process
  records, and Borg. Join evaluation consumes the certified shared endpoint
  intersection and the existing one-sign monotone-root enclosure. Scalar
  maxima remain diagnostics only.
- **Measured unchanged-budget result:** Research seeds 0–3 still halt before
  `T=1.2`, at accepted prefixes `0.34931875`, `0.392578125`,
  `0.3588890625`, and `0.3249046875`. All first failures are now interior
  inertial-source roots with widths `1.0002997e-3` through
  `1.0005637e-3`, just above the unchanged `1e-3` root row. This fires the
  packet's representation-ablation falsifier and makes a new root-time budget
  derivation eligible; no budget has been changed or ratified.
- **Derived fail-closed UI behavior:** a halted native response is displayable
  only when it declares atomic steps, contains a nonempty accepted prefix, and
  supplies complete histories ending exactly at `acceptedEndTime`. Borg then
  displays that prefix, marks the failed candidate rejected, disables further
  continuation, and remains promotion-ineligible. A zero-length prefix still
  throws the fail-closed error.
- **Measured browser QA:** after refreshing the shared `5173` server onto the
  final rebuilt V8 binary, Research displayed two forward chunks through
  `T=0.38910468749999993`; Interactive displayed one through
  `T=0.2444359375`. Both ended on
  `root_completeness_not_certified` with the failed-candidate message instead
  of the prior zero-chunk `engine_exception` surface.
- **Validation:** native CTest `3/3`, Borg JavaScript `36/36`, V8 process
  protocol `12/12`, native coupled evolution `24/24`, the exact seed-0–3
  unchanged-budget sweep, and both live browser methods pass their stated
  gates. The four-seed Research parity gate itself remains failed as recorded
  above.
- **Evidence:**
  [borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md](evidence/borg-research-parity-root-width-adjudication-apple-m3-2026-07-18.md).

## 2026-07-18 — Fixed-budget Borg endurance adjudication

- **Measured first accumulated-width mechanism:** six-path Borg evolution was
  consuming optional far-field enclosures for 18 of 36 ordered pairs. Their
  first-chunk width, including `0.0111853` at the widest receiver, entered the
  state-radius recurrence despite the exact-pair fallback being affordable.
- **Derived correction:** Borg now uses exact fallback for every ordered pair,
  shared position and velocity endpoint hulls, sharp-root contraction confined
  to acceleration reconstruction, and recertified four-quarter publication.
  The preset hashes and all root, acceleration, local-error, and atomic-
  publication gates are unchanged.
- **Measured fixed-budget result:** Research and Interactive seeds 0–3 all pass
  `T=1.2`, but terminal halts still occur after `4.13` to `45.47` wall seconds,
  at accepted solver times `4.952794255188131` to `11.475`. Seven rows stop on
  root completeness; Research seed 2 stops on an uncertified caustic transit.
  The literal ten-minute gate fails.
- **Measured live UI methods:** Research completed `T=1.2` through `Start /
  restart`; Interactive completed `T=1.2` through `Apply & run`; both showed
  four of four native chunks and the browser console contained zero errors.
- **Adjudication:** do not ratchet a root tolerance. The next closure target is
  a certified richer joint-state/cross-path correlation or separately
  validated reconditioned integrator under the same fixed allocations.
- **Evidence:**
  [borg-fixed-budget-ten-minute-endurance-adjudication-apple-m3-2026-07-18.md](evidence/borg-fixed-budget-ten-minute-endurance-adjudication-apple-m3-2026-07-18.md).

## 2026-07-18 — Retained-history reconditioning and joint-state blocker

- **Derived implementation:** the MPFR root path now propagates one
  differentiable position remainder through all certified shared joins using
  `min(2 eps_x, eps_v h)`, intersected with every ordinary segment box. A
  forced-MPFR analytic fixture with zero derivative error checks the theorem
  independently of the implementation.
- **Measured fixed-budget result:** Research seed 0's difficult residual narrows
  from approximately `[-1.913e-5, 1.070277e-3]` to
  `[-1.325821449012088e-6, 1.052465045871579e-3]`, but the implied monotone root
  image remains about `1%` over the unchanged `1e-3` ceiling. The complete
  post-change seed 0–3 matrix still has seven root-completeness halts and one
  Research finite-width regulator halt; all eight stop before 45 native wall
  seconds, so the 600-second gate remains failed.
- **Measured ablations:** eight-way publication, two-half publication,
  synchronized multirate publication, embedded enclosure intersection, and an
  unpreconditioned receiver-affine interval solve all fail earlier, remain
  neutral, or widen the state. All experimental implementations were removed.
- **Adjudication:** the first missing object is now cross-path joint-state
  retention or a theorem-backed preconditioned interval corrector. Another
  single-history or publication-count change is not the next remedy.
- **Evidence:**
  [borg-retained-history-reconditioning-adjudication-apple-m3-2026-07-18.md](evidence/borg-retained-history-reconditioning-adjudication-apple-m3-2026-07-18.md).

## 2026-07-18 — Non-authoritative shadow affine dependency diagnostic

- **Derived implementation:** added a flag-gated binary64 shadow observer that
  carries shared signed symbols through all six paths, delayed-root and
  acceleration sensitivities, and frozen cubic history rows. It allocates
  fresh local-error, acceleration-width, and root-time symbols, caps the live
  set at 256 with logged hull condensation, writes only a separate NDJSON
  sidecar, and cannot feed a certified decision.
- **Measured isolation:** the standard process test shows bit-identical
  canonical published and terminal fields with the flag off versus on. No
  preset, allocation hash, certified gate, or publication token changed.
- **Measured falsification:** Research seed 0's shadow radius is
  `5.6122612883862972e-4`, giving a required two-sided width of
  `1.1224522576772594e-3`, above the fixed `1.042e-3` decision ceiling. The
  proposed architecture is therefore `FALSIFIED`, not the next remedy.
- **Measured mechanism and cost:** only `1.60%` of the aggregate position
  contribution and `9.53%` of velocity are fresh local error; retained-state
  feedback dominates. The observer's Research seed-0 outer-wall overhead is
  `216.97%`, also missing the requested low-single-digit target.
- **Next closure object:** derive a root-time budget theorem mapping admitted
  state and transmitter-side-factor bounds to the unchanged root-time ceiling before
  attempting another joint-state representation. No tolerance change is
  proposed.
- **Evidence:**
  [borg-shadow-affine-dependency-diagnostic-apple-m3-2026-07-18.md](evidence/borg-shadow-affine-dependency-diagnostic-apple-m3-2026-07-18.md).

## 2026-07-19 — Master Equation terminology migration

- **Promoted terminology:** current AAA and reader-facing equation surfaces now
  distinguish transmitter emission time $T_t$ from receiver reception time
  $T_r$, use $D_t$ and $D_r$ for the two event-side factors, and name
  $W^{\mathrm{acc}}=|D_r/D_t|$ as the receiver-weighted acceleration factor.
- **Compatibility boundary:** existing schema fields, status codes, CLI fields,
  serialized records, frozen evidence, and the old-law validator filename were
  not renamed or redefined.
- **Physics boundary:** the current receiver-weighted Master EOM and EOM solver
  semantics are unchanged. The transmitter-side acceleration proposal remains
  priority-only.
- **Measured validation:** both terminology validators pass, and 120 focused
  Equation Mapping, prescribed-root, animator, and Photon tests pass. Generated
  reading copies and indexes remain drifted because no write-mode generator was
  authorized.
- **Disposition:**
  [terminology migration disposition](archive/terminology-migration/master-equation-terminology-migration-disposition-2026-07-19.md).

## 2026-07-19 — Coincident-transition and history-only conservation closure attempt

- **Derived finite-window no-go:** on the smooth same-transmitter birth chart, the
  complete transmitter-side impulse obeys a regulator-uniform lower bound
  proportional to
  $\min(c_f/(\alpha\epsilon_c^2),L/(\eta\epsilon_c))$. Both alternatives
  diverge on every joint $\eta,\epsilon_c\to0$ path. The earlier
  $\epsilon_c^{-2}$ coefficient is retained only for its declared matched
  refinement; the new bound covers extreme paths where the fixed reception
  window changes the power of the divergence.
- **Derived acceptance result:** a fixed positive core makes the prescribed
  transition finite, but the current point-transceiver primitives do not fix a
  physical core scale, kernel, minimum self-hit delay, or alternative
  near-origin same-transmitter rule. The finite accepted transition gate therefore
  closes negatively under the current primitives.
- **Derived conservation obstruction:** the causal retained-history update
  determines acceleration but leaves the kinetic scalar $K(s)$, momentum map
  $P(s)$, and wake-account update unspecified. Defining wake changes as the
  negative accumulated motion changes balances by construction and fails the
  non-circularity requirement.
- **Promotion audit:** receiver playback remains excluded from proposed base
  acceleration on the supported simple-root domain. Global canon and EOM
  solver promotion remain deferred because same-transmitter transition and
  conservation require new derived structure or an explicit restriction of
  the claimed equation domain.
- **Artifacts:**
  [transmitter-side singular-event analysis](analysis-transmitter-factor-fold-and-coincident-birth.md),
  [history-only conservation obstruction](analysis-transmitter-factor-conservation-obstruction.md),
  [going-forward walkthrough](master-equation-import-audit-walkthrough-2026-07-18.md),
  and [promotion-readiness matrix](master-equation-promotion-readiness-matrix.md).

## 2026-07-19 — Receiver-factor change-specific promotion audit

- **Derived old-law baseline:** on the same smooth coincident same-transmitter birth
  chart used for the transmitter-side no-go result, the current
  receiver-weighted factor approaches one, the separation is $2c_ft+O(t^2)$,
  and the sharp acceleration is proportional to $t^{-2}$. Its impulse already
  diverges. The transmitter-side correction strengthens the divergence to
  $t^{-3}$ but does not create the first failed sharp continuation.
- **Exact analytic control:** the prescribed history
  $\mathbf X(T)=\hat{\mathbf e}(c_fT+\alpha T^2/2)$ has the exact newborn root
  $T_t=-T_r$, separation $2c_fT_r$, $D_t=\alpha T_r$, and
  $D_r=-\alpha T_r$. Direct substitution reproduces the old $T_r^{-2}$ and
  proposed $T_r^{-3}$ laws without a series approximation.
- **Derived conservation baseline:** neither causal retained-history law has
  fixed kinetic, momentum, and wake accounts. The current two-time action's
  formal conservation identities belong to a future-dependent equation, not
  the causal update advanced by the EOM solver.
- **Promotion-scope disposition:** coincident same-transmitter birth and causal
  conservation remain global Master Equation debts, but they do not justify
  retaining the receiver multiplier. The factor correction is ready for a
  separately authorized scoped migration that preserves root transport and
  fail-closed singular-event handling.
- **Unchanged authority boundary:** no canonical equation, EOM solver
  semantics, frozen evidence, or generated artifact was changed.
- **Artifacts:**
  [change-specific promotion audit](archive/receiver-factor-migration/analysis-receiver-factor-change-specific-promotion-audit.md),
  [going-forward walkthrough](master-equation-import-audit-walkthrough-2026-07-18.md),
  and [promotion-readiness matrix](master-equation-promotion-readiness-matrix.md).
