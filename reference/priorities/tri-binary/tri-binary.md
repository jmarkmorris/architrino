# Tri-Binary

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `28.34`
- Cost: `5.4`
- ROI: `5.25`
- Status: `architecture-development`

## Task Queue

1. `tri_binary_architecture_development` — Develop the new tri-binary architecture documents inside this directory while the model remains under review. Status: `active`. Depends on: none. Notes: keep theorem-target drafts, branch-certificate schemas, central-inventory ledgers, simulation handoffs, and source-analysis packets here until the architecture is strong enough to justify broader migration.
2. `tri_binary_model_migration` — Migrate the corpus, priority ledgers, validation surfaces, simulations, and web/app assets from the nested Noether-core model to the new tri-binary model. Status: `deferred`. Depends on: accepted architecture decision, retained branch-certificate plan, PR snapshot, and operator approval for each edit batch.

## Scope

This workstream now owns development of the candidate same-level tri-binary model and the eventual migration decision. The candidate model drops `nested` as architecture language and treats the three binaries as same-level components rather than inner, middle, and outer radial tiers. It does not yet authorize corpus-wide replacement. Migration must wait until the new form has been stated with enough precision to preserve charge bookkeeping, conservation ledgers, Standard Model-facing mappings, Lorentz / photon closure targets, strong-field behavior, and simulation reproducibility.

The first priority is not migration. It is to develop the new tri-binary architecture documents in this directory while the architecture is under review. Corpus migration, priority-ledger rewrites outside this bucket, simulations, and web/app asset changes should stay deferred until the architecture is accepted as the path forward. During this phase, identify affected theory surfaces, decide what survives as a theorem target, and keep the rollback path legible while the new architecture is derived.

## Architecture And Migration Work Items

1. `formalize_tri_binary_architecture` — State the new tri-binary branch definition. Status: `active`. Depends on: none. Notes: define the three same-level binaries, common energy level, common radius, orbital velocity $c_f$, phase offsets, noncollision conditions, central inventory, allowed symmetries, and closure variables.
2. `same_level_branch_certificate_packet` — Draft the retained branch-certificate packet needed before any migration decision. Status: `active`. Depends on: `formalize_tri_binary_architecture`. Notes: include active causal roots, Jacobian floors, memory depth, tangential residuals, energy/action ledger, central inventory, exposure map, observer exports, and failure codes.
3. `central_inventory_replacement` — Rebuild the former axial / polar-charge layer around the new central-inventory ledger. Status: `active`. Depends on: `formalize_tri_binary_architecture`. Notes: preserve electric charge, weak-coupling triads, axial inventory, chirality exposure, color bookkeeping, and reaction provenance or explicitly replace them.
4. `architecture_decision_gate` — Decide whether the same-level architecture is strong enough to become the path forward. Status: `open`. Depends on: `same_level_branch_certificate_packet`, `central_inventory_replacement`. Notes: do not start broad corpus or app migration until this gate passes.
5. `archive_ntb_snapshot` — Decide how to preserve the former nested tri-binary model before migration. Status: `deferred`. Depends on: `architecture_decision_gate` and PR snapshot. Notes: decide whether GitHub history is enough or whether to add a compact archival document summarizing the former assumptions, equations, gates, known blockers, and rollback route.
6. `choose_same_level_labels` — Replace `I,M,O`, `I,M,L`, `inner`, `middle`, and `outer` with labels appropriate to three same-level binaries. Status: `deferred`. Depends on: `architecture_decision_gate`. Notes: do not introduce broad new labels in corpus prose until the label choice is accepted; Archie terminology and glossary entries that still describe tri-binary as nested are downstream migration targets, not edit targets for today.
7. `noether_core_corpus_rewrite` — Revise the Noether-core scaffold, Noether-core geometry, and tri-binary dynamics chapters. Status: `deferred`. Depends on: `architecture_decision_gate`, `formalize_tri_binary_architecture`, `choose_same_level_labels`. Notes: remove nested-radius behavior and replace it with same-level choreography, central inventory, and new branch-certificate language only after the decision gate passes.
8. `math_and_gate_reset` — Audit and replace old equations, gates, residuals, certificates, and proof burdens that assume radial nesting or role-separated layers. Status: `deferred`. Depends on: `architecture_decision_gate`. Notes: affected surfaces include branch identity, root ledgers, shielding extraction, Lorentz residuals, photon gates, angular-momentum ledgers, and event-ledger joins.
9. `mass_map_reset` — Redefine $A_0$, branch-search state vectors, energy and shielding extraction, medium-response probes, and mass-hierarchy routes for the same-level tri-binary. Status: `deferred`. Depends on: `architecture_decision_gate`, `math_and_gate_reset`. Notes: no mass-facing quantities should be promoted until a revised branch certificate exists.
10. `generation_flavor_reset` — Rebuild generation, CKM/PMNS, quark/lepton, and shielding/exposure claims under the new architecture. Status: `deferred`. Depends on: `architecture_decision_gate`, `central_inventory_replacement`, `mass_map_reset`. Notes: replace nested shielding depletion with the new mechanism rather than patching old generation prose.
11. `spin_angular_momentum_reset` — Rework the spinor, angular-momentum, chirality, helicity, and Bell/measurement prerequisites for the new tri-binary branch geometry. Status: `deferred`. Depends on: `architecture_decision_gate`, `formalize_tri_binary_architecture`, `central_inventory_replacement`.
12. `photon_radiation_pair_reset` — Recheck photon Gate A/B/C, radiation Gate C, pair production, absorption, emission, and reaction event ledgers. Status: `deferred`. Depends on: `architecture_decision_gate`, `math_and_gate_reset`, `spin_angular_momentum_reset`. Notes: keep the coaxial contra-rotating pro/anti planar pair only if it survives the new architecture.
13. `lorentz_metric_reset` — Rebuild moving-assembly deformation, clock/ruler retuning, effective metric, preferred-frame leakage, and PPN/SME residual targets. Status: `deferred`. Depends on: `architecture_decision_gate`, `formalize_tri_binary_architecture`, `math_and_gate_reset`.
14. `strong_field_cosmology_reset` — Reassess black-hole, singularity-resolution, horizon-interface, inflation-like, expansion, redshift, and Noether-Sea constitutive claims. Status: `deferred`. Depends on: `architecture_decision_gate`, `lorentz_metric_reset`, `mass_map_reset`.
15. `simulation_fixture_reset` — Update scripts, fixtures, branch scanners, validation protocols, convergence tests, scene-graph assumptions, and generated artifacts that encode the nested model. Status: `deferred`. Depends on: `architecture_decision_gate`, `formalize_tri_binary_architecture`, `math_and_gate_reset`.
16. `webapp_image_and_scene_reset` — Inventory and update webapp diagrams, generated images, scene graph entries, lesson views, and app copy that visually or textually encode nested shells or inner/middle/outer behavior. Status: `deferred`. Depends on: `architecture_decision_gate`, `choose_same_level_labels`, `noether_core_corpus_rewrite`.
17. `migration_batch_plan` — Sequence the migration into reviewable edit batches. Status: `deferred`. Depends on: `architecture_decision_gate` and all inventory items above. Notes: keep early batches focused on priority-side architecture, then canonical corpus definitions, then dependent sector pages, then simulations/assets, with validation after each batch.

## Same-Level Architecture Files

The sibling files in this directory are same-level tri-binary architecture-development source material. Nested tri-binary causal-closure packets live separately in [tri-binary-causal-closure](../tri-binary-causal-closure/tri-binary-causal-closure.md).

| File | Current role in architecture development |
| --- | --- |
| [tri-binary-architecture.md](tri-binary-architecture.md) | Same-level architecture theorem-target draft and branch-certificate plan. |
| [proof-program-and-decision-gate.md](proof-program-and-decision-gate.md) | Integration map for proof dependencies, retained branch packet rows, and architecture decision-gate status. |
| [retained-branch-promotion-theorem.md](retained-branch-promotion-theorem.md) | Composite promotion theorem for moving a same-level branch from priority-only candidate to retained branch candidate. |
| [current-dynamics-synthesis.md](current-dynamics-synthesis.md) | Current dynamics conclusion and next intrinsic-curve solve target. |
| [source-signal-triage.md](source-signal-triage.md) | Triage of the rearchitecture source discussion into converted theorem targets, blockers, priority-only signals, and rejected overclaims. |
| [same-level-branch-mathematics.md](same-level-branch-mathematics.md) | Branch chart, history space, causal-root ledger, Jacobian floor, finite-memory, regularized DDE, weak-limit, and tangential-closure targets. |
| [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md) | Carrier families, phase-lock residuals, noncollision node clearances, framed-wake parity targets, angular-momentum ledgers, and color scaffold. |
| [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) | Worked zero-offset octahedral carrier with exact noncollision floor, partner-root calculation, same-source root status, first cross-root/Jacobian screening, and rigid neutral tangential-residual failure. |
| [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md) | Phase-offset and radial-support diagnostics showing rigid octahedral rows improve but do not close force balance. |
| [polarity-phase-rigid-screen-results.md](polarity-phase-rigid-screen-results.md) | Neutral polarity-assignment and rigid phase-offset screen showing polarity reassignment helps slightly but does not retain a rigid branch. |
| [force-balance-reduction.md](force-balance-reduction.md) | Projection reduction for partner, cross-binary, self/fold-layer, and medium-response terms in tangential and radial/support closure. |
| [deformed-carrier-dynamics-ansatz.md](deformed-carrier-dynamics-ansatz.md) | Low-order deformation variables, root/force linearization, and ansatz packets for radial breathing, phase modulation, plane-normal precession, antipodal relaxation, and center-gauge motion. |
| [low-order-deformation-search-results.md](low-order-deformation-search-results.md) | First bounded deformation search showing radial breathing improves tangential residuals but fails speed/radial closure. |
| [pair-specific-deformation-search-results.md](pair-specific-deformation-search-results.md) | Site-specific radial and speed-coupled phase screen showing better speed/root behavior but persistent tangential and support residuals. |
| [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md) | Arclength-clock reduction replacing naive angle-clock speed residuals with period, tangent, and curvature closure for deformed curves. |
| [arclength-deformation-search-results.md](arclength-deformation-search-results.md) | Arclength-clock common-breathing screen: tangential improvement survives, but force-versus-curvature closure still fails. |
| [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) | Intrinsic delayed curve equation and curve-level residual vector for retained same-level dynamics. |
| [variable-speed-factor-extension.md](variable-speed-factor-extension.md) | Bounded speed factor model with modified root Jacobians, tangential acceleration, and short self-hit rows. |
| [bounded-speed-factor-proof-stack-impact-map.md](bounded-speed-factor-proof-stack-impact-map.md) | Impact map for redoing fixed-speed proof rows on the bounded speed factor ledger. |
| [bounded-speed-factor-root-sheet-certificate.md](bounded-speed-factor-root-sheet-certificate.md) | Causal-time root-sheet and force-derivative certificate needed before bounded-speed tail/root data can enter Krawczyk proof budgets. |
| [bounded-speed-factor-master-retention-theorem.md](bounded-speed-factor-master-retention-theorem.md) | Master retained-branch theorem target for the bounded speed factor model, with fixed-speed rows as the $\nu_i\equiv1$ special case. |
| [plane-normal-precession-ansatz.md](plane-normal-precession-ansatz.md) | Intrinsic arclength precession ansatz and residual rows for nonplanar same-level carrier deformation. |
| [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md) | Common nonplanar arclength screen: curvature alignment improves, but tangential closure and Jacobian margin remain open. |
| [binary-specific-plane-normal-search-results.md](binary-specific-plane-normal-search-results.md) | Binary-specific normal-mode screen showing non-refining residual valleys without hard period/Jacobian constraints. |
| [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md) | Local rank screen showing the six-variable radial-plus-normal ansatz is independent but insufficient for intrinsic residual closure. |
| [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md) | $M=2$ exact-antipodal vector Fourier rank screen with full local rank and useful clipped descent directions. |
| [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md) | First bounded nonlinear $M=2$ solve: strong training-grid descent, but off-grid residual peaks and period/unit rows remain open. |
| [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) | Denser-grid $M=2$ restart: refined force residuals improve, but period-length closure becomes the blocker. |
| [period-closure-and-winding-targets.md](period-closure-and-winding-targets.md) | Equal-period and rational-winding rows needed to retain force-improving intrinsic curves. |
| [equal-period-projection-results.md](equal-period-projection-results.md) | Minimum-norm equal-period projection preserving root floors while keeping the best refined $M=2$ force progress mostly intact. |
| [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) | Equal-period constraint-qualification lemma and restricted residual target on $\ker D\mathbf{L}$. |
| [rational-winding-screen-results.md](rational-winding-screen-results.md) | Low-integer winding screen rejecting nontrivial winding support in the current refined $M=2$ lengths. |
| [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md) | Reparameterization lemma separating physical force rows from construction-speed chart rows. |
| [arclength-inverse-variation-formulas.md](arclength-inverse-variation-formulas.md) | Variation formulas for inverse arclength phase, tangent, curvature, and delayed source phase. |
| [branch-tangent-sensitivity-equations.md](branch-tangent-sensitivity-equations.md) | Branch-tangent sensitivity equations for roots, forces, residuals, action rows, and event margins. |
| [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) | Arclength-inverse rescore showing equal-period/root stability but persistent force residuals and $\Gamma$-convention sensitivity. |
| [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) | Equal-period-restricted rank screen showing full local arclength-inverse rank and oversized Newton step. |
| [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md) | Trust-region screen showing real restricted descent through $\rho=0.8$ but root-count loss at larger radius. |
| [arclength-inverse-m3-rank-and-trust-results.md](arclength-inverse-m3-rank-and-trust-results.md) | Exact-antipodal $M=3$ rank and trust screen with full restricted rank, root-preserving descent through $\rho=0.3$, and root-ledger loss at $\rho=0.4$. |
| [arclength-inverse-m3-root-frontier.md](arclength-inverse-m3-root-frontier.md) | Root-frontier packet showing the $M=3$ root loss is an $\eta_{\max}=4$ memory-window exit and that extended-window descent survives. |
| [adaptive-root-front-dynamics.md](adaptive-root-front-dynamics.md) | Root-front velocity and memory-crossing theorem target for the $M=3$ fixed-window exit near $\rho\approx0.32056$. |
| [adaptive-memory-trust-radius-lemma.md](adaptive-memory-trust-radius-lemma.md) | Trust-radius lemma for preserving active roots, support memory, tail certificates, and ledger consistency across continuation steps. |
| [branch-event-classification-theorem.md](branch-event-classification-theorem.md) | First-event classification theorem for exact-antipodal $M=3$ continuation and proof-budget versus true-obstruction separation. |
| [branch-event-normal-forms.md](branch-event-normal-forms.md) | Local event-surface normal forms and reset rules for exact-antipodal $M=3$ branch continuation. |
| [adaptive-memory-action-row.md](adaptive-memory-action-row.md) | Adaptive memory/action row deriving a support-bound finite-memory criterion and its $\Gamma_K$ ledger obligations. |
| [tail-interval-root-exclusion-certificate.md](tail-interval-root-exclusion-certificate.md) | Tail-root exclusion certificate for proving no delayed roots exist beyond the active window before calling memory support-complete. |
| [tail-root-assimilation-theorem.md](tail-root-assimilation-theorem.md) | Tail-root assimilation theorem for extending the root ledger when support-tail roots exist. |
| [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md) | Concrete exact-antipodal $M=3$ tail-resolution protocol for the $\rho=0.8$ support gap beyond $\eta_{\mathrm{mem}}=4.5$. |
| [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md) | Executable interval enclosures for tail-slab distance, Jacobian, endpoint, and Lipschitz tests. |
| [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md) | Interval Newton and Krawczyk refinement for certifying empty tail cells or unique tail-root tubes. |
| [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md) | Coefficient-box sensitivity formulas that turn pointwise tail margins into a proof-budget radius $\rho_{\mathrm{tail}}$. |
| [support-complete-m3-tail-slab-schedule.md](support-complete-m3-tail-slab-schedule.md) | Support-tail slab schedule requiring one owned coefficient-box persistent terminal predicate per atomic cell. |
| [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md) | Mesh-lift theorem upgrading nodewise $M=3$ tail certificates to continuous arclength-cell certificates. |
| [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) | Executable support-tail ledger for endpoint ownership, cell margins, coefficient-box persistence, and master-error export. |
| [support-complete-m3-tail-algorithm-termination.md](support-complete-m3-tail-algorithm-termination.md) | Finite termination theorem for adaptive support-tail subdivision under regular tail hypotheses. |
| [support-complete-m3-tail-frontier-shrinkage.md](support-complete-m3-tail-frontier-shrinkage.md) | Diagnostic split of the unresolved support tail using the observed $\eta_{\max}=4.5$ and $5.0$ rescoring agreement. |
| [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) | Root-sheet variation theorem for differentiating assimilated tail sheets through force, curl, action, and Krawczyk rows. |
| [unresolved-tail-force-error-bound.md](unresolved-tail-force-error-bound.md) | Worst-case omitted-force and curvature-residual error bound when the finite-memory tail is not yet certified absent. |
| [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md) | Exact-antipodal parity calculation for force, tangential residuals, curvature residuals, and antipodal-relaxation trigger rules. |
| [symmetry-block-decomposition-theorem.md](symmetry-block-decomposition-theorem.md) | Row-aware pair-parity and binary-Fourier block decomposition for obstruction and midpoint-relaxation decisions. |
| [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) | Left-null/cokernel obstruction certificate for deciding whether exact-antipodal dynamics is locally blocked on a support-complete ledger. |
| [adjoint-cokernel-equations.md](adjoint-cokernel-equations.md) | Root-dependent adjoint cokernel equations, obstruction scalar bounds, and relaxation-column projected-range tests. |
| [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) | Constructive support-complete Newton closure test splitting range closure from cokernel tolerance. |
| [support-complete-m3-successor-certificate-target.md](support-complete-m3-successor-certificate-target.md) | Composite exact-antipodal $M=3$ successor target for distinguishing active-window descent, support-complete closure, and true obstruction. |
| [support-complete-m3-executable-solve-theorem.md](support-complete-m3-executable-solve-theorem.md) | Executable solve theorem for the exact-antipodal $M=3$ decision sequence and exhaustive statuses. |
| [support-complete-m3-corrector-system.md](support-complete-m3-corrector-system.md) | Support-complete exact-antipodal $M=3$ residual and corrector system for deciding candidate, obstruction, or refinement. |
| [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md) | Support-complete exact-antipodal $M=3$ action-scale protocol for deriving $\Gamma_B$ instead of fitting $\Gamma_K$. |
| [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md) | Krawczyk proof-budget certificate for support-complete exact-antipodal $M=3$ range/cokernel closure. |
| [support-complete-m3-post-tail-proof-budget.md](support-complete-m3-post-tail-proof-budget.md) | Single-ledger proof budget after tail closure for chart radius, derivative envelopes, Krawczyk, cokernel, and action rows. |
| [support-complete-m3-augmented-root-corrector.md](support-complete-m3-augmented-root-corrector.md) | Augmented exact-antipodal $M=3$ corrector with retained delayed roots as explicit variables. |
| [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md) | Exact-antipodal mode-refinement certificate for testing M4/M5 columns before opening antipodal relaxation. |
| [support-complete-m3-noether-event-handoff.md](support-complete-m3-noether-event-handoff.md) | Exact-antipodal $M=3$ Noether/event handoff after a dynamics/action candidate. |
| [support-complete-m3-stability-handoff.md](support-complete-m3-stability-handoff.md) | Exact-antipodal $M=3$ stability handoff after dynamics/action and Noether/event closure. |
| [support-complete-m3-finite-mode-convergence-handoff.md](support-complete-m3-finite-mode-convergence-handoff.md) | Exact-antipodal $M=3$ finite-mode convergence handoff from finite support-complete candidates to a curve-level candidate. |
| [support-complete-m3-master-retention-theorem.md](support-complete-m3-master-retention-theorem.md) | Master exact-antipodal $M=3$ retention theorem and normalized certificate. |
| [coefficient-space-branch-continuation-theorem.md](coefficient-space-branch-continuation-theorem.md) | Pseudo-arclength continuation theorem for a support-complete exact-antipodal $M=3$ dynamics/action branch. |
| [branch-switching-bifurcation-theorem.md](branch-switching-bifurcation-theorem.md) | Lyapunov-Schmidt branch-switch and symmetry-breaking theorem for support-complete dynamics/action zeros. |
| [collocation-refinement-error-certificate.md](collocation-refinement-error-certificate.md) | Mesh-refinement certificate for off-grid residual, root-ledger, and projector-drift errors. |
| [finite-mode-branch-convergence-theorem.md](finite-mode-branch-convergence-theorem.md) | Convergence theorem target from uniformly certified finite-mode rows to a curve-level branch. |
| [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) | Pair-midpoint column/range certificate for deciding whether antipodal relaxation is the right next chart. |
| [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md) | Pair-midpoint chart for relaxing exact antipodality while preserving center gauge, inventory, and branch-certificate obligations. |
| [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md) | Concrete retained-branch search protocol with state variables, root solver, residual objective, continuation, stability diagnostics, and acceptance thresholds. |
| [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md) | Fourier/collocation solver protocol for the intrinsic curve equation with gauges, roots, barriers, and output schema. |
| [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md) | Finite-mode first-order balance matrix around the rigid octahedral carrier, with rank/solvability theorem targets. |
| [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md) | Minimal arclength-clock dynamics closure theorem target and residual/transversality conditions. |
| [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md) | Perturbation and barrier lemma for preserving active root labels, Jacobian floors, and finite memory in intrinsic solves. |
| [same-source-self-root-exclusion-lemma.md](same-source-self-root-exclusion-lemma.md) | Ordinary same-curve self-root exclusion lemma and fold-layer obligation. |
| [fold-layer-regularization-action-theorem.md](fold-layer-regularization-action-theorem.md) | Regulated fold-layer action and weak-limit theorem target for admissible self/fold contributions. |
| [medium-response-constitutive-closure-theorem.md](medium-response-constitutive-closure-theorem.md) | Constitutive theorem target for admissible medium-response force and event exchange. |
| [delayed-force-lipschitz-envelope.md](delayed-force-lipschitz-envelope.md) | Per-root force derivative and projected-force Lipschitz envelope for certificate constants. |
| [root-ledger-floquet-stability-certificate.md](root-ledger-floquet-stability-certificate.md) | Floquet/return-map stability certificate computed on the same root ledger as the dynamics row. |
| [root-dependent-variational-equation.md](root-dependent-variational-equation.md) | Root-dependent variational equation and monodromy construction behind retained-branch Floquet multipliers. |
| [second-variation-action-stability-theorem.md](second-variation-action-stability-theorem.md) | Action-side stability theorem with second root sensitivities, Hessian quotient, Morse index, and Floquet compatibility. |
| [conservative-monodromy-stability-classification.md](conservative-monodromy-stability-classification.md) | Noether/action-aware stability classification distinguishing conservative reciprocal multipliers from dissipative contraction. |
| [noether-neutral-mode-reduction-theorem.md](noether-neutral-mode-reduction-theorem.md) | Noether and gauge neutral-mode quotient theorem for expected Hessian nullity and unit multipliers. |
| [krein-elliptic-stability-theorem.md](krein-elliptic-stability-theorem.md) | Krein-signature stability theorem for conservative unit-circle multipliers and collision risk. |
| [energy-momentum-orbital-stability-theorem.md](energy-momentum-orbital-stability-theorem.md) | Energy-momentum symplectic-slice theorem for conservative orbital stability modulo symmetries. |
| [gamma-scale-action-row.md](gamma-scale-action-row.md) | Scale/action row for deriving $\Gamma_K$ from branch inertia and history action rather than fitting it. |
| [history-force-variationality-condition.md](history-force-variationality-condition.md) | Work one-form exactness and curl test for deciding whether a delayed-force ledger is action-derived. |
| [gamma-fit-action-identifiability-lemma.md](gamma-fit-action-identifiability-lemma.md) | Projection identity and compatibility bounds separating fitted $\Gamma_K$ from action-derived $\Gamma_B$. |
| [noether-action-conservation-closure-theorem.md](noether-action-conservation-closure-theorem.md) | Noether/action closure theorem for event conservation on one root, action, inventory, and event ledger. |
| [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md) | Neutral/charged inventory rows, central-inventory split, pair-production provenance, reaction conservation, recoil, Noether-Sea updates, and heat-channel restrictions. |
| [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md) | Lorentz/moving-branch exports, photon transition, mass/exposure map, generation/color rows, and strong-field/cosmology export residuals. |
| [entourage-tri-binary-rearchitecture.md](entourage-tri-binary-rearchitecture.md) | Deferred source discussion and analysis packet for the architecture switch; mine selectively, do not promote wholesale. |

## Promotion Decision

Current architecture material is `priority-only`. It is not ready for direct promotion into `content/markdown/aaa`, and it does not authorize broad migration, until the new tri-binary architecture has a formal branch definition, a retained same-level branch-certificate packet, a charge/provenance replacement for the former axial layer, and an explicit architecture decision gate.
