# Priorities Inventory

This file is the first-pass inventory for organizing [priorities](README.md). It is a developer-facing map, not a reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ chapter.

The goal is to separate three different jobs that are currently mixed together:

- **Workstream queue:** the ranked task list and current execution state for a workstream.
- **Detailed priority file:** undeployed working material, acceptance criteria, proof burdens, design constraints, or stronger draft content for one target document or one stable topic.
- **Deployed target:** the current reader-facing document under `content/markdown/aaa` that should eventually absorb promoted material.

The working direction is:

```text
raw or deferred note -> detailed priority file -> priority task -> deployed AAA document
```

## Inventory Rules

- Keep each workstream as one flat directory where practical.
- Keep the main workstream file compact: `Workstream Metadata`, `Task Queue`, `Scope`, related links, and short current-state notes.
- Put long undeployed derivations, design specs, proof packets, and app requirements in sibling files beside the main workstream file.
- Use one detailed priority file per target document or stable topic where practical.
- When a deployed AAA document is weaker than a detailed priority file, treat the detailed file as source material for a promotion task, not as a second permanent canonical document.
- Do not link from AAA documents back into `reference/priorities`; promote or restate required material inside AAA instead.

## Top-Level Workstream Inventory

| Slug | Current source | Present role | Likely deployed target(s) | Detailed-file state | Next organization action |
| --- | --- | --- | --- | --- | --- |
| `SUMMARY` | [priorities.md](SUMMARY/priorities.md) | Canonical ranking and rollup control surface. | None. | No detailed file needed. | Keep as the ranking surface; fix duplicate or stale rows during priority cleanup. |
| `angular-momentum-spin` | [angular-momentum-spin.md](angular-momentum-spin/angular-momentum-spin.md) | Mixed priority queue, corpus audit, derivation scaffold, and undeployed theory packet. | [angular-momentum-and-spin.md](../../content/markdown/aaa/theory-bridges/angular-momentum-and-spin.md), [quantum-statistics.md](../../content/markdown/aaa/quantum/quantum-statistics.md), [bell-theorem.md](../../content/markdown/aaa/theory-bridges/bell-theorem.md), [electroweak-bosons.md](../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md). | Needs sibling detailed-file split. | Keep the queue in `angular-momentum-spin.md`; move corpus audit, claim map, angular-momentum ledger, spinor closure, photon Gate B, and measurement-response material into sibling files. |
| `animator` | [animator.md](animator/animator.md) | Product requirements and design brief with some priority behavior. | App/runtime docs, scene authoring docs, and possibly [scene-taxonomy.md](../../content/markdown/aaa/archie/scene-taxonomy.md) or [ui-guidelines.md](../../content/markdown/aaa/archie/ui-guidelines.md). | Needs sibling detailed-file split. | Convert `animator.md` into an active product queue; move observer/framing, viewport, timeline, import/export, and object-model requirements into sibling files. |
| `cosmology-closure` | [cosmology-closure.md](cosmology-closure/cosmology-closure.md) | Compact deferred priority queue. | [cosmology-ontology.md](../../content/markdown/aaa/cosmology/cosmology-ontology.md), [CMB.md](../../content/markdown/aaa/cosmology/CMB.md), [BBN-constraints.md](../../content/markdown/aaa/cosmology/BBN-constraints.md), [structure-formation.md](../../content/markdown/aaa/cosmology/structure-formation.md), [hubble-s8-tensions.md](../../content/markdown/aaa/cosmology/hubble-s8-tensions.md). | Detailed overview missing if this becomes active. | Leave deferred for now; add a sibling component-interface or transfer-function file only when work resumes. |
| `deferred` | [legacy-insights.md](deferred/legacy-insights.md) and archived notes | Archive and parking lot for non-current material. | Various, not one stable target. | Not a live detailed-file area. | Add a deferred index later so parked material can be searched without promoting it to active priority status. |
| `dyadic-lock` | [dyadic-lock.md](dyadic-lock/dyadic-lock.md) | Mostly clean priority queue plus one archive packet. | [dyadic-resonance-lock.md](../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md), [binary-dynamics.md](../../content/markdown/aaa/dynamics/binary-dynamics.md). | Light detailed-file need. | Keep top-level queue; keep [phenomenological-heuristics.md](dyadic-lock/phenomenological-heuristics.md) as a sibling archive or move it to an `archive/` folder only if archives become consistent across workstreams. |
| `ellipsoid` | [ellipsoid.md](ellipsoid/ellipsoid.md) | Raw insight, undeployed theory draft, and app/design idea mixed together. | [emergent-metric.md](../../content/markdown/aaa/spacetime/emergent-metric.md), [proper-time-and-time-dilation.md](../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), [noether-core-geometry.md](../../content/markdown/aaa/spacetime/noether-core-geometry.md), [horizon-chirality.md](../../content/markdown/aaa/spacetime/horizon-chirality.md). | Needs sibling split and cleanup. | Separate raw notes, effective-metric material, and app design into sibling files before deciding whether this remains a top-level workstream. |
| `mass-map` | [mass-map.md](mass-map/mass-map.md) | Mixed priority queue plus substantial technical requirements and proof packets. | [particle-masses.md](../../content/markdown/aaa/assemblies/particle-masses.md), [parameter-ledger.md](../../content/markdown/aaa/validation/parameter-ledger.md), [energy.md](../../content/markdown/aaa/dynamics/energy.md). | Needs packet map. | Keep the first mass-map queue in `mass-map.md`; add a packet map there or in a sibling overview that maps the `a0-*` files and mass translation doctrine to deployed targets. |
| `master-equation-closure` | [master-equation-closure.md](master-equation-closure/master-equation-closure.md) | Mostly clean priority queue with bridge-program notes. | [master-equation.md](../../content/markdown/aaa/dynamics/master-equation.md), [causal-action-functional.md](../../content/markdown/aaa/dynamics/causal-action-functional.md), [emergent-metric.md](../../content/markdown/aaa/spacetime/emergent-metric.md), [proper-time-and-time-dilation.md](../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md). | Light detailed-file need. | Add sibling files only for concrete closure packets such as spiral branch-chart testing or Lorentz/GR bridge acceptance criteria. |
| `proof-programs` | [proof-programs.md](proof-programs/proof-programs.md) | Clean parent priority queue with nested proof-program packets. | [collinear-breather.md](../../content/markdown/aaa/proof-programs/collinear-breather.md), [planar-bridge-closure.md](../../content/markdown/aaa/proof-programs/planar-bridge-closure.md), [master-equation-breather.md](../../content/markdown/aaa/proof-programs/master-equation-breather.md). | Existing nested structure is justified by proof-program/certificate depth. | Preserve nested proof-program layout; add local overview files only where a packet lacks entry orientation. |
| `quantum-closure` | [quantum-closure.md](quantum-closure/quantum-closure.md) | Deferred priority queue with hard-gate requirements. | [quantum-summary.md](../../content/markdown/aaa/quantum/quantum-summary.md), [measurement-ontology.md](../../content/markdown/aaa/quantum/measurement-ontology.md), [wavefunction-ontology.md](../../content/markdown/aaa/quantum/wavefunction-ontology.md), [bell-theorem.md](../../content/markdown/aaa/theory-bridges/bell-theorem.md), [entanglement-nonlocality.md](../../content/markdown/aaa/theory-bridges/entanglement-nonlocality.md). | Detailed overview useful later. | Keep deferred until angular-momentum and measurement-response prerequisites mature; then split Born-rule and Bell-gate material into sibling files. |
| `simulations` | [simulations.md](simulations/simulations.md) | Compact priority queue. | [validation/simulations/README.md](../../content/markdown/aaa/validation/simulations/README.md), [run-protocols.md](../../content/markdown/aaa/validation/simulations/run-protocols.md), [convergence-tests.md](../../content/markdown/aaa/validation/simulations/convergence-tests.md). | Detailed overview missing if active simulation protocol work expands. | Keep compact for now; add sibling files when a concrete simulation campaign starts. |
| `standard-model-closure` | [standard-model-closure.md](standard-model-closure/standard-model-closure.md) | Clean queue with geometry-first program notes. | [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md), [quantum-number-mapping.md](../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [color-charge-su3.md](../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md), [weak-mixing-ckm.md](../../content/markdown/aaa/theory-bridges/weak-mixing-ckm.md), [electroweak-bosons.md](../../content/markdown/aaa/assemblies/bosons/electroweak-bosons.md). | Light detailed-file need. | Keep queue; create sibling files only for quark mass predictions, overlap integrals, confinement energetics, and weak corridor provenance when those become active. |
| `strong-field-closure` | [strong-field-closure.md](strong-field-closure/strong-field-closure.md) | Clean queue with quantitative closure targets. | [black-holes.md](../../content/markdown/aaa/spacetime/black-holes.md), [singularity-resolution.md](../../content/markdown/aaa/spacetime/singularity-resolution.md), [horizon-chirality.md](../../content/markdown/aaa/spacetime/horizon-chirality.md), [gr-phenomenology.md](../../content/markdown/aaa/spacetime/gr-phenomenology.md). | Detailed overview useful if promoted. | Keep compact; add sibling files for boundary conditions, observer predictions, entropy/Page-curve target, and release-channel selection when active. |
| `strong-field-hypotheses` | [strong-field-hypotheses.md](strong-field-hypotheses/strong-field-hypotheses.md) | Hypothesis bank and watchlist. | Same strong-field targets as `strong-field-closure`, but only after promotion. | Not a detailed-file area yet. | Keep as hypothesis bank unless specific hypotheses are promoted into `strong-field-closure`. |
| `tri-binary-causal-closure` | [tri-binary-causal-closure.md](tri-binary-causal-closure/tri-binary-causal-closure.md) | Mixed priority queue, synthesis draft, theorem roadmap, and deployment handoff. | [tri-binary-dynamics.md](../../content/markdown/aaa/dynamics/tri-binary-dynamics.md), [energy.md](../../content/markdown/aaa/dynamics/energy.md), [lorentz-kinematics.md](../../content/markdown/aaa/spacetime/lorentz-kinematics.md), [emergent-metric.md](../../content/markdown/aaa/spacetime/emergent-metric.md), [gr-phenomenology.md](../../content/markdown/aaa/spacetime/gr-phenomenology.md). | Needs sibling detailed-file split. | Keep the queue and dependency map; move synthesis sections and theorem-roadmap packets into sibling files by target topic. |

## Detailed Packet Inventory

| Packet | Current location | Current role | Suggested home after cleanup |
| --- | --- | --- | --- |
| Dyadic resonance lock archive | [dyadic-lock/phenomenological-heuristics.md](dyadic-lock/phenomenological-heuristics.md) | Preserved heuristics and audit output. | Keep as a sibling file unless a shared archive convention is adopted. |
| Ellipsoid ideal-core app brief | [ellipsoid/ideal-core.md](ellipsoid/ideal-core.md) | App/design brief. | Keep as sibling file if the app stays active; otherwise move to `deferred/`. |
| Mass-map $A_0$ reduced branch certificate | [mass-map/a0-reduced-branch-certificate.md](mass-map/a0-reduced-branch-certificate.md) | Technical proof/certificate packet. | Keep as sibling file. |
| Mass-map $A_0$ energy and shielding extraction | [mass-map/a0-energy-shielding-extraction.md](mass-map/a0-energy-shielding-extraction.md) | Technical extraction packet. | Keep as sibling file. |
| Mass-map $A_0$ medium-response tensor probe | [mass-map/a0-medium-response-tensor-probe.md](mass-map/a0-medium-response-tensor-probe.md) | Technical probe packet. | Keep as sibling file. |
| Tri-binary dependency map | [tri-binary-causal-closure/tri-binary-dependency-map.md](tri-binary-causal-closure/tri-binary-dependency-map.md) | Dependency and deployment handoff map. | Keep as sibling file; preserve link stability during cleanup. |
| Breather proof program | [proof-programs/breather-proof/breather-proof.md](proof-programs/breather-proof/breather-proof.md) | Nested proof-program packet. | Keep nested under proof programs. |
| Breather certificate artifacts | [proof-programs/breather-proof/certificate/seed_chart_packet.md](proof-programs/breather-proof/certificate/seed_chart_packet.md) | Certificate artifacts and reports. | Keep under `certificate/`. |
| Planar bridge closure program | [proof-programs/planar-bridge-closure/planar-bridge-closure.md](proof-programs/planar-bridge-closure/planar-bridge-closure.md) | Nested proof-program packet. | Keep nested under proof programs. |
| PDG overview | [deferred/pdg/pdg.md](deferred/pdg/pdg.md) | Deferred PDG application overview. | Promote to a live app workstream only if PDG work resumes; otherwise keep indexed under deferred. |
| PDG feed | [deferred/pdg/pdgfeed.md](deferred/pdg/pdgfeed.md) | Data-ingest requirements and grammar notes. | If resumed, move to a live `pdg` workstream as a sibling file. |
| PDG solve | [deferred/pdg/pdgsolve.md](deferred/pdg/pdgsolve.md) | Solver requirements and contract model. | If resumed, move to a live `pdg` workstream as a sibling file. |
| PDG edit | [deferred/pdg/pdgedit.md](deferred/pdg/pdgedit.md) | Editor/renderer requirements and contract model. | If resumed, move to a live `pdg` workstream as a sibling file. |
| PDG apps | [deferred/pdg/pdgapps.md](deferred/pdg/pdgapps.md) | Cross-app planning notes. | If resumed, split into app-specific sibling files. |
| 3x3 binary-slot matrix | [deferred/3x3/3x3.md](deferred/3x3/3x3.md) | Deferred theory note. | Keep deferred unless a target AAA document is selected. |
| Electron orbitals | [deferred/electron-orbitals/electron-orbitals.md](deferred/electron-orbitals/electron-orbitals.md) | Deferred atomic/quantum note. | Potential future detailed file for [atomic-structure.md](../../content/markdown/aaa/nuclear-atomic/atomic-structure.md), [atomic-spectra.md](../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), or [wavefunction-ontology.md](../../content/markdown/aaa/quantum/wavefunction-ontology.md). |
| Sim2 rewrite | [deferred/sim2rewrite.md](deferred/sim2rewrite.md) | Deferred software rewrite plan. | Keep deferred unless simulation-runtime work resumes. |
| Supergalactic plane note | [deferred/sgp.md](deferred/sgp.md) | Deferred cosmology note. | Potential future cosmology detailed file. |
| Proof-check note | [deferred/proof-check.md](deferred/proof-check.md) | Deferred proof tooling/review note. | Potential future proof-program tooling detailed file. |
| Consolidated geometry and dynamics observations | [deferred/dynamo-team-insights.md](deferred/dynamo-team-insights.md) | Large deferred insight packet. | Needs triage before promotion; likely split by target AAA topic. |
| Legacy priorities | [deferred/priorities-legacy.md](deferred/priorities-legacy.md) | Archived pre-split monolith. | Keep archived and do not promote wholesale. |
| Legacy insights | [deferred/legacy-insights.md](deferred/legacy-insights.md) | Deferred product and outlook material. | Keep deferred; promote only concrete tasks into active queues. |

## Cleanup Sequence

1. Clean the mixed high-value workstreams first: `tri-binary-causal-closure`, `angular-momentum-spin`, `mass-map`, `animator`, and `ellipsoid`.
2. For each mixed workstream, leave the first 20-40 lines as the active queue and move long undeployed content into sibling detailed files.
3. Add a small promotion table to the main workstream file or a sibling overview:

   ```text
   detailed file | target AAA document | deployed state | promotion gate | current status
   ```

4. After content moves, update [SUMMARY/priorities.md](SUMMARY/priorities.md) so rank and status reflect the cleaned structure.
5. Only then decide whether any top-level workstream should be demoted to `deferred/` or merged into another workstream.
