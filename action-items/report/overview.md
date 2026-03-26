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

## Ranked Priority Workstreams

| Rank | Slug | Title | Kind | Value | Cost | ROI | Status | Folder |
| ---: | --- | --- | --- | ---: | ---: | ---: | --- | --- |
| 1 | `breather-proof` | Execute the frozen breather proof program | `priority` | 10 | 4 | 2.50 | active | [breather-proof](../breather-proof/overview.md) |
| 2 | `mass-map` | Noether-core stability, shielding, parameter ledger, and first mass map | `priority` | 10 | 4 | 2.50 | active | [mass-map](../mass-map/overview.md) |
| 3 | `composer-reaction` | Scene system, composer, PDG solver, applications, and later enhancements | `priority` | 9 | 4 | 2.25 | active | [composer-reaction](../composer-reaction/overview.md) |
| 4 | `master-equation-closure` | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | `priority` | 10 | 5 | 2.00 | active | [master-equation-closure](../master-equation-closure/overview.md) |
| 5 | `dyadic-lock` | Dyadic resonance lock reduced-map program | `priority` | 7 | 4 | 1.75 | queued | [dyadic-lock](../dyadic-lock/overview.md) |
| 6 | `standard-model-closure` | Remaining Standard Model assembly gaps, flavor mixing, and confinement | `priority` | 8 | 5 | 1.60 | queued | [standard-model-closure](../standard-model-closure/overview.md) |
| 7 | `simulations` | Simulations, regularization, and shell numerics | `priority` | 8 | 5 | 1.60 | queued | [simulations](../simulations/overview.md) |
| 8 | `strong-field-closure` | Remaining black-hole / strong-field quantitative closure | `priority` | 4 | 5 | 0.80 | queued | [strong-field-closure](../strong-field-closure/overview.md) |
| 9 | `strong-field-hypotheses` | Preserve strong-field / tri-binary hypotheses | `hypothesis-bank` | 2 | 3 | 0.67 | watchlist | [strong-field-hypotheses](../strong-field-hypotheses/overview.md) |
| 10 | `chapter-authoring` | Unified chapter authoring queue and legacy-material recovery | `priority` | 3 | 5 | 0.60 | queued | [chapter-authoring](../chapter-authoring/overview.md) |
| 11 | `quantum-closure` | Born-rule / quantum closure with hard tests | `deferred-priority` | 4 | 8 | 0.50 | deferred | [quantum-closure](../quantum-closure/overview.md) |
| 12 | `cosmology-closure` | Cosmology transfer-function closure | `deferred-priority` | 2 | 9 | 0.22 | deferred | [cosmology-closure](../cosmology-closure/overview.md) |
| 13 | `deferred-outlook` | Deferred product / outlook work | `deferred-priority` | 1 | 6 | 0.17 | deferred | [deferred-outlook](../deferred-outlook/overview.md) |

## Full Directory Rollup

This table is the place to notice category mistakes. Not every direct child of `action-items` is a true priority workstream.

| Slug | Kind | Rank | Status | Keep As Active Action Item? | Folder |
| --- | --- | ---: | --- | --- | --- |
| `report` | `control-surface` | — | canonical | yes | [report](../report/overview.md) |
| `priorities` | `compatibility-index` | — | compatibility | probably not | [priorities](../priorities/overview.md) |
| `archive` | `archive` | — | reference | no | [archive](../archive/) |
| `icebox` | `archive-scratch` | — | frozen | no | [icebox](../icebox/) |
| `breather-proof` | `priority` | 1 | active | yes | [breather-proof](../breather-proof/overview.md) |
| `mass-map` | `priority` | 2 | active | yes | [mass-map](../mass-map/overview.md) |
| `composer-reaction` | `priority` | 3 | active | yes | [composer-reaction](../composer-reaction/overview.md) |
| `master-equation-closure` | `priority` | 4 | active | yes | [master-equation-closure](../master-equation-closure/overview.md) |
| `dyadic-lock` | `priority` | 5 | queued | yes | [dyadic-lock](../dyadic-lock/overview.md) |
| `standard-model-closure` | `priority` | 6 | queued | yes | [standard-model-closure](../standard-model-closure/overview.md) |
| `simulations` | `priority` | 7 | queued | yes | [simulations](../simulations/overview.md) |
| `strong-field-closure` | `priority` | 8 | queued | yes | [strong-field-closure](../strong-field-closure/overview.md) |
| `strong-field-hypotheses` | `hypothesis-bank` | 9 | watchlist | maybe | [strong-field-hypotheses](../strong-field-hypotheses/overview.md) |
| `chapter-authoring` | `priority` | 10 | queued | yes | [chapter-authoring](../chapter-authoring/overview.md) |
| `quantum-closure` | `deferred-priority` | 11 | deferred | maybe later | [quantum-closure](../quantum-closure/overview.md) |
| `cosmology-closure` | `deferred-priority` | 12 | deferred | maybe later | [cosmology-closure](../cosmology-closure/overview.md) |
| `deferred-outlook` | `deferred-priority` | 13 | deferred | no, until theory stabilizes | [deferred-outlook](../deferred-outlook/overview.md) |
| `composer` | `support-note` | — | supporting | maybe merge into `composer-reaction` later | [composer](../composer/overview.md) |
| `reaction` | `support-note` | — | supporting | maybe merge into `composer-reaction` later | [reaction](../reaction/overview.md) |
| `glyph` | `support-note` | — | supporting | maybe keep separate | [glyph](../glyph/overview.md) |
| `viewports` | `support-note` | — | supporting | maybe merge into `composer-reaction` later | [viewports](../viewports/overview.md) |
| `3x3` | `idea-note` | — | speculative | probably not | [3x3](../3x3/overview.md) |
| `ellipsoid` | `idea-note` | — | speculative | probably not | [ellipsoid](../ellipsoid/overview.md) |
| `phenomenological-heuristics` | `archive-note` | — | scratch | probably not | [phenomenological-heuristics](../phenomenological-heuristics/overview.md) |
| `dynamo-team-insights` | `team-note` | — | supporting | probably not | [dynamo-team-insights](../dynamo-team-insights/overview.md) |
| `codex` | `operator-note` | — | supporting | probably not | [codex](../codex/overview.md) |

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
- Go back and clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### Payment / Account / Identity

- Attempt to understand OpenAI billing.
- Use whatever OpenAI credits are available.
- Use the `$50` entourages each month.

### Convenience Purchase

- Get a Mac mini when the `M5` comes out.

### Raw Research Prompts

- What is the smallest assembly that can make a decision?
- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will.
