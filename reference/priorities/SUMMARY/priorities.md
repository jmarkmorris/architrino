# Priorities Report

This file is the canonical control surface for `priorities`. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream slug file, not in the filesystem names.

The full pre-split monolith is preserved at [archive/priorities-legacy.md](../deferred/priorities-legacy.md).

## Scoring System

- Score `Value` and `Cost` on the same `1-10` scale.
- For `Value`, prioritize:
  1. work that drives more solid mathematical closure, especially the EOM, assembly energy, shielding, mass, and adjacent derivations;
  2. work that improves visualization and animation enough to generate new understanding or insight.
- For `Cost`, assume math-heavy derivation cost is lower than before because the implementation/derivation burden is now mostly on Codex, while visualization and animation work is relatively cheap.
- Compute `ROI = Value / Cost`.
- Use the scoring table as the canonical ranking.
- Break ties by higher `Value`, then lower `Cost`.

## Workstream Overview Structure

Each active workstream `<slug>.md` file should use the same front-matter order before any local theory or product notes:

1. `## Workstream Metadata`
2. `## Task Queue`
3. `## Scope`

After that fixed front matter, each workstream may add its own domain-specific sections such as `Current State`, `Main Directions`, `Quantitative Targets`, or `Hypotheses To Preserve`.

Keep the metadata field order fixed:

- `Kind`
- `Rank`
- `Value`
- `Cost`
- `ROI`
- `Status`

Keep task queue lines in one compact sentence form:

- `` `task_id` — Task title. Status: `state`. Depends on: ... ``

This keeps the files readable in plain Markdown, diff-friendly in git, and structurally consistent without requiring a separate machine-control file.

## Unified Priority Table

This single table is the canonical rollup for every direct child of `priorities`. Use it to maintain ranking, notice category mistakes, and decide which directories still deserve to live here as active workstreams.

Nested proof subprograms live under [proof-programs](../proof-programs/proof-programs.md). They keep local metadata for handoff clarity, but the parent `proof-programs` row is the canonical top-level ranking entry.

| Rank | Slug                                                                               | Title                                                                              | Value | Cost |  ROI |
| ---: | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----: | ---: | ---: |
|    1 | [`proof-programs`](../proof-programs/proof-programs.md)                            | Proof programs: breather certificate and planar bridge closure                     |    10 |    4 | 2.50 |
|    2 | [`mass-map`](../mass-map/mass-map.md)                                              | Noether-core stability, shielding, parameter ledger, and first mass map            |    10 |    4 | 2.50 |
|    3 | [`tri-binary-causal-closure`](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Tri-binary causal closure synthesis and dependency map                         |    10 |    4 | 2.50 |
|    4 | [`animator`](../animator/animator.md)                                              | Scene animator                                                                     |     9 |    4 | 2.25 |
|    5 | [`master-equation-closure`](../master-equation-closure/master-equation-closure.md) | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure |    10 |    5 | 2.00 |
|    6 | [`angular-momentum-spin`](../angular-momentum-spin/angular-momentum-spin.md)       | Fundamental angular-momentum and spin closure                                      |     9 |    5 | 1.80 |
|    7 | [`dyadic-lock`](../dyadic-lock/dyadic-lock.md)                                     | Dyadic resonance lock reduced-map program                                          |     7 |    4 | 1.75 |
|    8 | [`standard-model-closure`](../standard-model-closure/standard-model-closure.md)    | Remaining Standard Model assembly gaps, flavor mixing, and confinement             |     8 |    5 | 1.60 |
|    9 | [`simulations`](../simulations/simulations.md)                                        | Simulations, regularization, and shell numerics                                    |     8 |    5 | 1.60 |
|   10 | [`strong-field-closure`](../strong-field-closure/strong-field-closure.md)          | Remaining black-hole / strong-field quantitative closure                           |     4 |    5 | 0.80 |
|   11 | [`strong-field-hypotheses`](../strong-field-hypotheses/strong-field-hypotheses.md) | Preserve strong-field / tri-binary hypotheses                                      |     2 |    3 | 0.67 |
|   12 | [`chapter-authoring`](../../op/chapter-authoring.md)                               | Unified chapter authoring queue and legacy-material recovery                       |     3 |    5 | 0.60 |
|   13 | [`quantum-closure`](../quantum-closure/quantum-closure.md)                         | Born-rule / quantum closure with hard tests                                        |     4 |    8 | 0.50 |
|   14 | [`cosmology-closure`](../cosmology-closure/cosmology-closure.md)                   | Cosmology transfer-function closure                                                |     2 |    9 | 0.22 |
|    — | [`animator`](../animator/animator.md)                                              | animator                                                                           |     — |    — |    — |
|    — | [`3x3`](../3x3/3x3.md)                                                             | 3x3 binary-slot matrix                                                             |     — |    — |    — |
|    — | [`ellipsoid`](../ellipsoid/ellipsoid.md)                                           | Ellipsoid app idea                                                                 |     — |    — |    — |
|    — | [`phenomenological-heuristics`](../dyadic-lock/phenomenological-heuristics.md)     | Dyadic resonance lock archive                                                      |     — |    — |    — |



## Current Focus

- Workstream `proof-programs`: architecture complete, certificate pending; the dual-mollified master-equation law is now recorded, the doubled four-arc itinerary has a coarse parity pass, and the seed-chart packet contract now fixes the next executable gate: generate one symmetry-constrained candidate collinear cycle, mesh, null-coordinate causal ledger, and certified branch chart. The planar delayed-bridge closure is kept as the queued higher-dimensional extension under the same directory.
- Workstream `mass-map`: derive the first reusable mass map from tri-binary geometry rather than bookkeeping the parameter ledger in isolation.
- Workstream `tri-binary-causal-closure`: run the continuity pass against the dependency map, then route the photon/QED, Lorentz/GR, equivalence, and topological certification burdens to the right proof workstreams before deployment.
- Workstream `animator-reaction`: finish the forward pdgsolve/pdgedit/animator split and keep the active app path clean and contract-first.
- Workstream `master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.
- Workstream `angular-momentum-spin`: promote the scaffolded Noether-core angular-momentum ledger into a validated functional, generalize the solved minimal partition branch, prove or falsify ordered-frame spinor closure, and keep Bell as a downstream pair-provenance and measurement-response test.

## Top Cross-Workstream Next Actions

1. Generate the breather candidate cycle and seed-chart packet first: `phi_cyc.json`, `mesh.json`, null-coordinate causal ledger, branch chart, and seed-chart interval report; then continue into corridor nonemptiness, coupled corridor, monodromy diagnostic, returned-sample report, and topology ledger on the same certified domain.
2. Run the tri-binary causal closure continuity pass against its dependency map and route unresolved deployment items into priority workstreams.
3. Validate and generalize the scaffolded architrino-level angular-momentum ledger for changing-frequency Noether cores, including wake terms, branch selection, spinor holonomy, and apparatus-response measures.
4. Turn the mass-side placeholders into a first derived map with one attractor family, shielding extraction, and a baseline electron-mass prediction target.
5. Freeze the pdgsolve-to-pdgedit publication seam and land the first clean downstream handoff into animator.

## Info

### Repo / Branding / Community

- The new `architrino` repository went live on February 17, 2026.
- Go clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### Raw Research Prompts

- What is the smallest assembly that can make a decision?
- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will.

## Related AAA Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
