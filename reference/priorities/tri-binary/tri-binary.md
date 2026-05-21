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
| [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) | Arclength-inverse rescore showing equal-period/root stability but persistent force residuals and $\Gamma$-convention sensitivity. |
| [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) | Equal-period-restricted rank screen showing full local arclength-inverse rank and oversized Newton step. |
| [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md) | Trust-region screen showing real restricted descent through $\rho=0.8$ but root-count loss at larger radius. |
| [antipodal-relaxation-ansatz.md](antipodal-relaxation-ansatz.md) | Pair-midpoint chart for relaxing exact antipodality while preserving center gauge, inventory, and branch-certificate obligations. |
| [retained-branch-dynamics-protocol.md](retained-branch-dynamics-protocol.md) | Concrete retained-branch search protocol with state variables, root solver, residual objective, continuation, stability diagnostics, and acceptance thresholds. |
| [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md) | Fourier/collocation solver protocol for the intrinsic curve equation with gauges, roots, barriers, and output schema. |
| [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md) | Finite-mode first-order balance matrix around the rigid octahedral carrier, with rank/solvability theorem targets. |
| [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md) | Minimal arclength-clock dynamics closure theorem target and residual/transversality conditions. |
| [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md) | Perturbation and barrier lemma for preserving active root labels, Jacobian floors, and finite memory in intrinsic solves. |
| [gamma-scale-action-row.md](gamma-scale-action-row.md) | Scale/action row for deriving $\Gamma_K$ from branch inertia and history action rather than fitting it. |
| [central-inventory-and-event-ledgers.md](central-inventory-and-event-ledgers.md) | Neutral/charged inventory rows, central-inventory split, pair-production provenance, reaction conservation, recoil, Noether-Sea updates, and heat-channel restrictions. |
| [observer-export-and-mass-map-targets.md](observer-export-and-mass-map-targets.md) | Lorentz/moving-branch exports, photon transition, mass/exposure map, generation/color rows, and strong-field/cosmology export residuals. |
| [entourage-tri-binary-rearchitecture.md](entourage-tri-binary-rearchitecture.md) | Deferred source discussion and analysis packet for the architecture switch; mine selectively, do not promote wholesale. |

## Promotion Decision

Current architecture material is `priority-only`. It is not ready for direct promotion into `content/markdown/aaa`, and it does not authorize broad migration, until the new tri-binary architecture has a formal branch definition, a retained same-level branch-certificate packet, a charge/provenance replacement for the former axial layer, and an explicit architecture decision gate.
