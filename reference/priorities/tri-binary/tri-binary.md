# Tri-Binary

## Workstream Metadata

- Kind: `priority`
- Rank: `5`
- Value: `28.34`
- Cost: `5.4`
- ROI: `5.25`
- Status: `migration-planning`

## Task Queue

1. `tri_binary_model_migration` — Migrate the corpus, priority ledgers, validation surfaces, simulations, and web/app assets from the nested Noether-core model to the new Tri-Binary model. Status: `planning`. Depends on: PR snapshot and operator approval for each edit batch.

## Scope

This workstream now owns the migration from the former nested tri-binary model to the new Tri-Binary model. The new model drops `nested` as architecture language and treats the three binaries as same-level components rather than inner, middle, and outer radial tiers. The migration must replace model assumptions, equations, validation gates, diagrams, and app assets only after the new form has been stated with enough precision to preserve charge bookkeeping, conservation ledgers, Standard Model-facing mappings, Lorentz / photon closure targets, strong-field behavior, and simulation reproducibility.

The first migration priority is not to promote new textbook prose immediately. It is to identify every affected theory surface, decide what survives as a theorem target, and keep the rollback path legible while the new architecture is derived.

## Migration Work Items

1. `archive_ntb_snapshot` — Decide how to preserve the former nested tri-binary model before migration. Status: `open`. Depends on: PR snapshot. Notes: decide whether GitHub history is enough or whether to add a compact archival document summarizing the former assumptions, equations, gates, known blockers, and rollback route.
2. `formalize_tri_binary_architecture` — State the new Tri-Binary branch definition. Status: `open`. Depends on: none. Notes: define the three same-level binaries, common energy level, common radius, orbital velocity $c_f$, phase offsets, noncollision conditions, central inventory, allowed symmetries, and closure variables.
3. `choose_same_level_labels` — Replace `I,M,O`, `I,M,L`, `inner`, `middle`, and `outer` with labels appropriate to three same-level binaries. Status: `open`. Depends on: `formalize_tri_binary_architecture`. Notes: do not introduce broad new labels in corpus prose until the label choice is accepted.
4. `relocate_polar_charge_model` — Rebuild the former axial / polar-charge layer around the new central placement. Status: `open`. Depends on: `formalize_tri_binary_architecture`. Notes: preserve electric charge, weak-coupling triads, axial inventory, chirality exposure, color bookkeeping, and reaction provenance or explicitly replace them.
5. `noether_core_corpus_rewrite` — Revise the Noether-core scaffold, Noether-core geometry, and Tri-Binary dynamics chapters. Status: `open`. Depends on: `formalize_tri_binary_architecture`, `choose_same_level_labels`. Notes: remove nested-radius behavior and replace it with same-level choreography, central inventory, and new branch-certificate language.
6. `math_and_gate_reset` — Audit and replace old equations, gates, residuals, certificates, and proof burdens that assume radial nesting or role-separated layers. Status: `open`. Depends on: `formalize_tri_binary_architecture`. Notes: affected surfaces include branch identity, root ledgers, shielding extraction, Lorentz residuals, photon gates, angular-momentum ledgers, and event-ledger joins.
7. `mass_map_reset` — Redefine $A_0$, branch-search state vectors, energy and shielding extraction, medium-response probes, and mass-hierarchy routes for the same-level Tri-Binary. Status: `open`. Depends on: `math_and_gate_reset`. Notes: no mass-facing quantities should be promoted until a revised branch certificate exists.
8. `generation_flavor_reset` — Rebuild generation, CKM/PMNS, quark/lepton, and shielding/exposure claims under the new architecture. Status: `open`. Depends on: `relocate_polar_charge_model`, `mass_map_reset`. Notes: replace nested shielding depletion with the new mechanism rather than patching old generation prose.
9. `spin_angular_momentum_reset` — Rework the spinor, angular-momentum, chirality, helicity, and Bell/measurement prerequisites for the new Tri-Binary branch geometry. Status: `open`. Depends on: `formalize_tri_binary_architecture`, `relocate_polar_charge_model`.
10. `photon_radiation_pair_reset` — Recheck photon Gate A/B/C, radiation Gate C, pair production, absorption, emission, and reaction event ledgers. Status: `open`. Depends on: `math_and_gate_reset`, `spin_angular_momentum_reset`. Notes: keep the coaxial contra-rotating pro/anti planar pair only if it survives the new architecture.
11. `lorentz_metric_reset` — Rebuild moving-assembly deformation, clock/ruler retuning, effective metric, preferred-frame leakage, and PPN/SME residual targets. Status: `open`. Depends on: `formalize_tri_binary_architecture`, `math_and_gate_reset`.
12. `strong_field_cosmology_reset` — Reassess black-hole, singularity-resolution, horizon-interface, inflation-like, expansion, redshift, and Noether-Sea constitutive claims. Status: `open`. Depends on: `lorentz_metric_reset`, `mass_map_reset`.
13. `simulation_fixture_reset` — Update scripts, fixtures, branch scanners, validation protocols, convergence tests, scene-graph assumptions, and generated artifacts that encode the nested model. Status: `open`. Depends on: `formalize_tri_binary_architecture`, `math_and_gate_reset`.
14. `webapp_image_and_scene_reset` — Inventory and update webapp diagrams, generated images, scene graph entries, lesson views, and app copy that visually or textually encode nested shells or inner/middle/outer behavior. Status: `open`. Depends on: `choose_same_level_labels`, `noether_core_corpus_rewrite`.
15. `migration_batch_plan` — Sequence the migration into reviewable edit batches. Status: `open`. Depends on: all inventory items above. Notes: keep early batches focused on priority-side architecture, then canonical corpus definitions, then dependent sector pages, then simulations/assets, with validation after each batch.

## Detailed Priority Files

The sibling files in this directory are pre-migration source material unless a later edit batch explicitly updates them:

| File | Current role in the migration |
| --- | --- |
| [tri-binary-causal-closure.md](tri-binary-causal-closure.md) | Former workstream body for rest mass, proper time, and relativistic limits; preserve as legacy source material until the archive decision is made. |
| [tri-binary-dependency-map.md](tri-binary-dependency-map.md) | Former causal-closure dependency map; use as an inventory of proof burdens to preserve, replace, or retire. |
| [rest-mass-proper-time-relativity-synthesis.md](rest-mass-proper-time-relativity-synthesis.md) | Former synthesis for rest mass, proper time, effective relativity, photons, measurement, and strong-field limits; use as a migration source, not as settled doctrine. |
| [plain-language-relativity-bridge.md](plain-language-relativity-bridge.md) | Former reader-orientation bridge; update only after the formal model reset stabilizes. |
| [residual-routing-event-ledger.md](residual-routing-event-ledger.md) | Shared event-ledger theorem packet; preserve the ledger discipline while checking all branch-specific assumptions. |
| [radiation-gate-c-benchmarks.md](radiation-gate-c-benchmarks.md) | Radiation benchmark packet; re-run against the new photon and event-ledger architecture before promotion. |

## Promotion Decision

Current migration material is `priority-only`. It is not ready for direct promotion into `content/markdown/aaa` until the new Tri-Binary architecture has a formal branch definition, a charge/provenance replacement for the former axial layer, and a first pass over the affected equations and gates.
