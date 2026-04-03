# Priorities Report

This file is the canonical control surface for `priorities`. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream slug file, not in the filesystem names.

The full pre-split monolith is preserved at [archive/priorities-legacy.md](../archive/priorities-legacy.md).

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

| Rank | Slug | Title | Value | Cost | ROI |
| ---: | --- | --- | ---: | ---: | ---: |
| 1 | [`breather-proof`](../breather-proof/breather-proof.md) | Execute the frozen breather proof program | 10 | 4 | 2.50 |
| 2 | [`mass-map`](../mass-map/mass-map.md) | Noether-core stability, shielding, parameter ledger, and first mass map | 10 | 4 | 2.50 |
| 3 | [`composer-reaction`](../observer/observer.md) | Scene system, composer, reaction, solver, PDG ingest, and later enhancements | 9 | 4 | 2.25 |
| 4 | [`master-equation-closure`](../master-equation-closure/master-equation-closure.md) | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | 10 | 5 | 2.00 |
| 5 | [`dyadic-lock`](../dyadic-lock/dyadic-lock.md) | Dyadic resonance lock reduced-map program | 7 | 4 | 1.75 |
| 6 | [`standard-model-closure`](../standard-model-closure/standard-model-closure.md) | Remaining Standard Model assembly gaps, flavor mixing, and confinement | 8 | 5 | 1.60 |
| 7 | [`simulations`](../simulations/simulations.md) | Simulations, regularization, and shell numerics | 8 | 5 | 1.60 |
| 8 | [`strong-field-closure`](../strong-field-closure/strong-field-closure.md) | Remaining black-hole / strong-field quantitative closure | 4 | 5 | 0.80 |
| 9 | [`strong-field-hypotheses`](../strong-field-hypotheses/strong-field-hypotheses.md) | Preserve strong-field / tri-binary hypotheses | 2 | 3 | 0.67 |
| 10 | [`chapter-authoring`](../chapter-authoring/chapter-authoring.md) | Unified chapter authoring queue and legacy-material recovery | 3 | 5 | 0.60 |
| 11 | [`quantum-closure`](../quantum-closure/quantum-closure.md) | Born-rule / quantum closure with hard tests | 4 | 8 | 0.50 |
| 12 | [`cosmology-closure`](../cosmology-closure/cosmology-closure.md) | Cosmology transfer-function closure | 2 | 9 | 0.22 |
| 13 | [`deferred-outlook`](../deferred-outlook/deferred-outlook.md) | Deferred product / outlook work | 1 | 6 | 0.17 |
| 14 | [`planar-bridge-closure`](../planar-bridge-closure/planar-bridge-closure.md) | First planar delayed-bridge closure and tame return map | 6 | 5 | 1.20 |
| — | [`SUMMARY`](./priorities.md) | Action-items report control surface | — | — | — |
| — | [`archive`](../archive/priorities-legacy.md) | Archive | — | — | — |
| — | [`icebox`](../icebox/proof-check.md) | Icebox | — | — | — |
| — | [`composer`](../observer/composer.md) | Composer | — | — | — |
| — | [`reaction`](../observer/reaction.md) | Reaction app | — | — | — |
| — | [`solver`](../observer/solver.md) | Reaction solver | — | — | — |
| — | [`pdgfeed`](../observer/pdgfeed.md) | PDG | — | — | — |
| — | [`cruft-sprawl`](../cruft-sprawl/cruft-sprawl.md) | Cruft and sprawl reduction | — | — | — |
| — | [`glyph`](../glyph/glyph.md) | Glyph system for `\mathbb{A}\mathbb{A}\mathbb{A}` | — | — | — |
| — | [`viewports`](../viewports/viewports.md) | Viewports | — | — | — |
| — | [`3x3`](../3x3/3x3.md) | 3x3 binary-slot matrix | — | — | — |
| — | [`ellipsoid`](../ellipsoid/ellipsoid.md) | Ellipsoid app idea | — | — | — |
| — | [`phenomenological-heuristics`](../phenomenological-heuristics/phenomenological-heuristics.md) | Dyadic resonance lock archive | — | — | — |
| — | [`dynamo-team-insights`](../dynamo-team-insights/dynamo-team-insights.md) | Consolidated geometry and dynamics observations | — | — | — |
| — | [`codex`](../codex/codex.md) | Codex operator notes | — | — | — |

## Current Focus

- Workstream `breather-proof`: the architecture is frozen; the next phase is literal proof writing inside the existing theorem DAG.
- Workstream `mass-map`: derive the first reusable mass map from tri-binary geometry rather than bookkeeping the parameter ledger in isolation.
- Workstream `composer-reaction`: finish the reaction app manual workflow and bridge solved reactions back into the main composer.
- Workstream `master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.
- Workstream `planar-bridge-closure`: isolate the first planar delayed bridge strongly enough to support cone control, bounded fold transit, radial turnaround, and a tame return map.

## Top Cross-Workstream Next Actions

1. Formalize the first proof-writing package in the breather program, starting with seed-side persistence and early branch-regularity lemmas.
2. Turn the mass-side placeholders into a first derived map with one attractor family, shielding extraction, and a baseline electron-mass prediction target.
3. Finish the reaction app as a usable manual provenance tool and make accepted solves durable inside the composer timeline model.

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
