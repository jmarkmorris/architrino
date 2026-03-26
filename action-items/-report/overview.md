# Action-Items Report

This file is the canonical control surface for `action-items`. Directory names are stable identities. Rank, status, and classification live here and in each workstream `tasks.yaml`, not in the filesystem names.

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

## Unified Priority Table

This single table is the canonical rollup for every direct child of `action-items`. Use it to maintain ranking, notice category mistakes, and decide which directories still deserve to live here as active workstreams.

| Rank | Slug | Title | Kind | Value | Cost | ROI | Status | Keep As Active Action Item? | Folder |
| ---: | --- | --- | --- | ---: | ---: | ---: | --- | --- | --- |
| 1 | `breather-proof` | Execute the frozen breather proof program | `priority` | 10 | 4 | 2.50 | active | yes | [breather-proof](../breather-proof/overview.md) |
| 2 | `mass-map` | Noether-core stability, shielding, parameter ledger, and first mass map | `priority` | 10 | 4 | 2.50 | active | yes | [mass-map](../mass-map/overview.md) |
| 3 | `composer-reaction` | Scene system, composer, PDG solver, applications, and later enhancements | `priority` | 9 | 4 | 2.25 | active | yes | [composer-reaction](../composer-reaction/overview.md) |
| 4 | `master-equation-closure` | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | `priority` | 10 | 5 | 2.00 | active | yes | [master-equation-closure](../master-equation-closure/overview.md) |
| 5 | `dyadic-lock` | Dyadic resonance lock reduced-map program | `priority` | 7 | 4 | 1.75 | queued | yes | [dyadic-lock](../dyadic-lock/overview.md) |
| 6 | `standard-model-closure` | Remaining Standard Model assembly gaps, flavor mixing, and confinement | `priority` | 8 | 5 | 1.60 | queued | yes | [standard-model-closure](../standard-model-closure/overview.md) |
| 7 | `simulations` | Simulations, regularization, and shell numerics | `priority` | 8 | 5 | 1.60 | queued | yes | [simulations](../simulations/overview.md) |
| 8 | `strong-field-closure` | Remaining black-hole / strong-field quantitative closure | `priority` | 4 | 5 | 0.80 | queued | yes | [strong-field-closure](../strong-field-closure/overview.md) |
| 9 | `strong-field-hypotheses` | Preserve strong-field / tri-binary hypotheses | `hypothesis-bank` | 2 | 3 | 0.67 | watchlist | maybe | [strong-field-hypotheses](../strong-field-hypotheses/overview.md) |
| 10 | `chapter-authoring` | Unified chapter authoring queue and legacy-material recovery | `priority` | 3 | 5 | 0.60 | queued | yes | [chapter-authoring](../chapter-authoring/overview.md) |
| 11 | `quantum-closure` | Born-rule / quantum closure with hard tests | `deferred-priority` | 4 | 8 | 0.50 | deferred | maybe later | [quantum-closure](../quantum-closure/overview.md) |
| 12 | `cosmology-closure` | Cosmology transfer-function closure | `deferred-priority` | 2 | 9 | 0.22 | deferred | maybe later | [cosmology-closure](../cosmology-closure/overview.md) |
| 13 | `deferred-outlook` | Deferred product / outlook work | `deferred-priority` | 1 | 6 | 0.17 | deferred | no, until theory stabilizes | [deferred-outlook](../deferred-outlook/overview.md) |
| — | `-report` | Action-items report control surface | `control-surface` | — | — | — | canonical | yes | [-report](./overview.md) |
| — | `archive` | Archive | `archive` | — | — | — | reference | no | [archive](../archive) |
| — | `icebox` | Icebox | `archive-scratch` | — | — | — | frozen | no | [icebox](../icebox) |
| — | `composer` | Composer | `support-note` | — | — | — | supporting | maybe merge into `composer-reaction` later | [composer](../composer/overview.md) |
| — | `reaction` | Reaction design | `support-note` | — | — | — | supporting | maybe merge into `composer-reaction` later | [reaction](../reaction/overview.md) |
| — | `glyph` | Glyph system for `\mathbb{A}\mathbb{A}\mathbb{A}` | `support-note` | — | — | — | supporting | maybe keep separate | [glyph](../glyph/overview.md) |
| — | `viewports` | Viewports | `support-note` | — | — | — | supporting | maybe merge into `composer-reaction` later | [viewports](../viewports/overview.md) |
| — | `3x3` | 3x3 binary-slot matrix | `idea-note` | — | — | — | speculative | probably not | [3x3](../3x3/overview.md) |
| — | `ellipsoid` | Ellipsoid app idea | `idea-note` | — | — | — | speculative | probably not | [ellipsoid](../ellipsoid/overview.md) |
| — | `phenomenological-heuristics` | Dyadic resonance lock archive | `archive-note` | — | — | — | scratch | probably not | [phenomenological-heuristics](../phenomenological-heuristics/overview.md) |
| — | `dynamo-team-insights` | Consolidated geometry and dynamics observations | `team-note` | — | — | — | supporting | probably not | [dynamo-team-insights](../dynamo-team-insights/overview.md) |
| — | `codex` | Codex operator notes | `operator-note` | — | — | — | supporting | probably not | [codex](../codex/overview.md) |

## Current Focus

- Workstream `breather-proof`: the architecture is frozen; the next phase is literal proof writing inside the existing theorem DAG.
- Workstream `mass-map`: derive the first reusable mass map from tri-binary geometry rather than bookkeeping the parameter ledger in isolation.
- Workstream `composer-reaction`: finish the reaction app manual workflow and bridge solved reactions back into the main composer.
- Workstream `master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.

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
