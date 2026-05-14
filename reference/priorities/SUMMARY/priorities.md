# Priorities Report

This file is the canonical control surface for `priorities`. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream slug file, not in the filesystem names.

The full pre-split monolith is preserved at [deferred/priorities-legacy.md](../deferred/priorities-legacy.md).

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

This single table is the canonical rollup for ranked priority workstreams and linked ranked queues. Use it to maintain ranking, notice category mistakes, and decide which directories still deserve to live here as active workstreams.

This table does not list detailed sibling files. The structural inventory for compact control files, detailed priority files, deployed targets, and deferred packets lives in [inventory.md](../inventory.md).

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

## Unranked Candidate And Archive References

These are tracked for visibility, but they are not ranked active workstreams in the scoring table.

| Slug or packet | Location | Role | Current disposition |
| --- | --- | --- | --- |
| `ellipsoid` | [ellipsoid.md](../ellipsoid/ellipsoid.md) | Effective-metric review workstream plus Ideal Core app idea. | Priority candidate under review. |
| `validation-gates` | [validation-gates.md](../validation-gates/validation-gates.md) | Cross-sector acceptance intersections, no-go applicability, and failure-condition routing. | Priority candidate under review; now has a sibling closure-intersection ledger. |
| `deferred` | [legacy-insights.md](../deferred/legacy-insights.md) | Archive and parking lot for non-current material. | Needs a deferred index later. |
| `3x3` | [3x3.md](../deferred/3x3/3x3.md) | Deferred binary-slot matrix note. | Keep deferred unless a target AAA document is selected. |
| `phenomenological-heuristics` | [phenomenological-heuristics.md](../dyadic-lock/phenomenological-heuristics.md) | Dyadic resonance lock archive source. | Keep as sibling archive unless a shared archive convention is adopted. |

## Current Focus

- Workstream `proof-programs`: architecture complete, certificate pending; the dual-mollified master-equation law is now recorded, the doubled four-arc itinerary has a coarse parity pass, and the seed-chart packet contract now fixes the next executable gate: generate one symmetry-constrained candidate collinear cycle, mesh, null-coordinate causal ledger, and certified branch chart. The planar delayed-bridge closure is kept as the queued higher-dimensional extension under the same directory.
- Workstream `mass-map`: derive the first reusable mass map from tri-binary geometry, using the sibling $A_0$ branch, energy/shielding, medium-response, and critical-transport packets rather than treating the parameter ledger in isolation.
- Workstream `tri-binary-causal-closure`: compact control file and sibling synthesis structure are in place; next active theory burden is the photon/QED gate, with radiation Gate C now captured as a separate benchmark packet for atomic, bremsstrahlung, synchrotron, Compton-like, pair, and blackbody recovery.
- Workstream `animator`: compact control file and sibling design/interface file are in place; choose the next concrete observer/framing, structure-editing, or timeline-object implementation pass before touching runtime code.
- Workstream `master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.
- Workstream `angular-momentum-spin`: use the sibling core-ledger, partition/spinor, and photon/measurement/Bell files to promote the scaffolded Noether-core angular-momentum ledger into a validated functional, generalize the solved minimal partition branch, prove or falsify ordered-frame spinor closure, and keep Bell as a downstream pair-provenance and measurement-response test.
- Workstream `standard-model-closure`: keep geometry-first work intact while the new weak-sector/gauge and nuclear-binding packets isolate two different risks: weak exposure/gauge covariance and hadronic-to-nuclear coarse-graining.
- Workstream `quantum-closure`: remain deferred, but preserve Decider minimality and pilot-wave / algorithmic-resonance opportunities as downstream transfer-operator stress tests.
- Candidate `validation-gates`: use the closure-intersection ledger to test whether weak, quantum, gravity, hadronic, radiation, and cosmology gates can survive together rather than as disconnected local wins.

## Organization Status

- First-pass flat cleanup is complete for `standard-model-closure`, `dyadic-lock`, `mass-map`, `master-equation-closure`, `simulations`, `strong-field-closure`, `strong-field-hypotheses`, `cosmology-closure`, `quantum-closure`, `proof-programs`, `angular-momentum-spin`, `animator`, `ellipsoid`, `tri-binary-causal-closure`, and `validation-gates`.
- The latest coverage pass added seven high-upside $\mathbb{A}\mathbb{A}\mathbb{A}$ gap packets without adding extra requirements subdirectories: validation gates, radiation Gate C, Decider minimality, weak-sector/gauge closure, nuclear binding, condensed-matter medium transport, and algorithmic-resonance / pilot-wave closure.
- [inventory.md](../inventory.md) is the detailed map for which files are compact control surfaces, which are detailed priority files, and which deployed AAA documents should eventually absorb promoted material.
- Remaining organization work is review-level: decide whether any priority candidate or deferred packet deserves promotion, demotion, or merger after the current theory and app priorities stabilize.

## Top Cross-Workstream Next Actions

1. Generate the breather candidate cycle and seed-chart packet first: `phi_cyc.json`, `mesh.json`, null-coordinate causal ledger, branch chart, and seed-chart interval report; then continue into corridor nonemptiness, coupled corridor, monodromy diagnostic, returned-sample report, and topology ledger on the same certified domain.
2. Advance the tri-binary photon/QED and radiation Gate C path into explicit kinematics/optics, polarization/spin, vertex, event-ledger, and benchmark-recovery packets before treating photon-based measurement or radiation as closed.
3. Validate and generalize the scaffolded architrino-level angular-momentum ledger for changing-frequency Noether cores, including wake terms, branch selection, spinor holonomy, and apparatus-response measures.
4. Turn the mass-side placeholders into a first derived map with one attractor family, shielding extraction, medium-response tensor, critical-transport threshold, and a baseline electron-mass prediction target.
5. Use the validation-gates candidate as a cross-sector pressure test: local wins must survive weak, quantum, gravity, hadronic, radiation, and cosmology acceptance gates together.
6. Select one concrete animator implementation pass from observer/framing, structure editing, or timeline objects, and keep deferred PDG material out of the active app path unless PDG work resumes.

## Info

### Repo / Branding / Community

- The new `architrino` repository went live on February 17, 2026.
- Go clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### Raw Research Prompts

- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will; route concrete claims through [agency-decision-and-decider](../quantum-closure/agency-decision-and-decider.md) or [algorithmic-resonance-and-pilot-wave](../quantum-closure/algorithmic-resonance-and-pilot-wave.md) instead of leaving them as loose prompts.

## Related AAA Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
