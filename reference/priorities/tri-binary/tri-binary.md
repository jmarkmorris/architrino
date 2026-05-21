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
| [entourage-tri-binary-rearchitecture.md](entourage-tri-binary-rearchitecture.md) | Deferred source discussion and analysis packet for the architecture switch; mine selectively, do not promote wholesale. |

## Promotion Decision

Current architecture material is `priority-only`. It is not ready for direct promotion into `content/markdown/aaa`, and it does not authorize broad migration, until the new tri-binary architecture has a formal branch definition, a retained same-level branch-certificate packet, a charge/provenance replacement for the former axial layer, and an explicit architecture decision gate.
