# Action-Items Report

This file is the reporting surface for the active action-items program. Detailed work now lives under [workstreams/](./workstreams/), with one folder per ranked workstream.

The full pre-split monolith is preserved at [archive/priorities-legacy.md](./archive/priorities-legacy.md).

## Scoring System

- Score `Value` and `Cost` on the same `1-10` scale.
- For `Value`, prioritize:
  1. work that drives more solid mathematical closure, especially the EOM, assembly energy, shielding, mass, and adjacent derivations;
  2. work that improves visualization and animation enough to generate new understanding or insight.
- For `Cost`, assume math-heavy derivation cost is lower than before because the implementation/derivation burden is now mostly on Codex, while visualization and animation work is relatively cheap.
- Compute `ROI = Value / Cost`.
- Use the scoring table as the canonical ranking.
- Break ties by higher `Value`, then lower `Cost`.

## Ranked Workstreams

| # | Workstream | Value | Cost | ROI | Status | Folder |
| ---: | --- | ---: | ---: | ---: | --- | --- |
| 1 | Execute the frozen breather proof program | 10 | 4 | 2.50 | active | [01-breather-proof](./workstreams/01-breather-proof/overview.md) |
| 2 | Noether-core stability, shielding, parameter ledger, and first mass map | 10 | 4 | 2.50 | active | [02-mass-map](./workstreams/02-mass-map/overview.md) |
| 3 | Scene system, composer, PDG solver, applications, and later enhancements | 9 | 4 | 2.25 | active | [03-composer-reaction](./workstreams/03-composer-reaction/overview.md) |
| 4 | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | 10 | 5 | 2.00 | active | [04-master-equation-closure](./workstreams/04-master-equation-closure/overview.md) |
| 5 | Dyadic resonance lock reduced-map program | 7 | 4 | 1.75 | queued | [05-dyadic-lock](./workstreams/05-dyadic-lock/overview.md) |
| 6 | Remaining Standard Model assembly gaps, flavor mixing, and confinement | 8 | 5 | 1.60 | queued | [06-standard-model-closure](./workstreams/06-standard-model-closure/overview.md) |
| 7 | Simulations, regularization, and shell numerics | 8 | 5 | 1.60 | queued | [07-simulations](./workstreams/07-simulations/overview.md) |
| 8 | Remaining black-hole / strong-field quantitative closure | 4 | 5 | 0.80 | queued | [08-strong-field-closure](./workstreams/08-strong-field-closure/overview.md) |
| 9 | Preserve strong-field / tri-binary hypotheses | 2 | 3 | 0.67 | watchlist | [09-strong-field-hypotheses](./workstreams/09-strong-field-hypotheses/overview.md) |
| 10 | Unified chapter authoring queue and legacy-material recovery | 3 | 5 | 0.60 | queued | [10-chapter-authoring](./workstreams/10-chapter-authoring/overview.md) |
| 11 | Born-rule / quantum closure with hard tests | 4 | 8 | 0.50 | deferred | [11-quantum-closure](./workstreams/11-quantum-closure/overview.md) |
| 12 | Cosmology transfer-function closure | 2 | 9 | 0.22 | deferred | [12-cosmology-closure](./workstreams/12-cosmology-closure/overview.md) |
| 13 | Deferred product / outlook work | 1 | 6 | 0.17 | deferred | [13-deferred-outlook](./workstreams/13-deferred-outlook/overview.md) |

## Current Focus

- Workstream `01-breather-proof`: the architecture is frozen; the next phase is literal proof writing inside the existing theorem DAG.
- Workstream `02-mass-map`: derive the first reusable mass map from tri-binary geometry rather than bookkeeping the parameter ledger in isolation.
- Workstream `03-composer-reaction`: finish the reaction app manual workflow and bridge solved reactions back into the main composer.
- Workstream `04-master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.

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
