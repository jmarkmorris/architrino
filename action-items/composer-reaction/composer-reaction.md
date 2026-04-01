# Composer / Reaction Workstream

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Scope

This workstream covers six coordinated documents with distinct jobs:

- [composer](./composer.md) — Composer product direction, current state, and Composer-owned priorities.
- [reaction](./reaction.md) — Reaction app product direction, current state, and Reaction-owned priorities.
- [pdg-solver](./pdg-solver.md) — PDG-facing solver and proposal architecture inside the Reaction-side pipeline.
- [independence](./independence.md) — the app-separation decision, API boundary, and migration plan.
- [swe](./swe.md) — cross-cutting software-engineering, modularity, testing, and refactor discipline.
- this file — workstream rollup, shared sequencing, and cross-app delivery order.

The goal of this file is to keep the workstream legible without duplicating the detailed app notes.

## Pipeline Overview

The intended long-term pipeline is:

1. PDG-facing ingest or manual setup produces Reaction-side inputs.
2. The Reaction app authors and validates conservative provenance-preserving reaction flow.
3. The Reaction app exports a versioned handoff document.
4. The Composer imports that handoff document and turns it into staged animation, observer work, and explanatory overlays.

The Composer should not solve the reaction again.

The Reaction app should not stage the final authored animation.

## Current Architectural Reality

Today, the repository still contains transitional coupling:

- some runtime seams are better than before, especially in the reaction solver;
- but the app boundary is not yet enforced the way [independence](./independence.md) requires.

That means the near-term work has two tracks running at once:

- keep building the apps so they become more useful;
- and keep improving seams so utility does not come at the cost of tighter coupling.

## Ordered Objectives

1. Finish the Reaction app manual workflow so it is reliable and usable as the primary provenance-authoring surface.
2. Define the versioned handoff contract between Reaction and Composer.
3. Add Composer import and staging from the handoff contract.
4. Separate Composer and Reaction into independent app entrypoints and dependency trees.
5. Continue shrinking monolithic runtimes and moving behavior into focused modules with testable seams.

## Active Task Queue

1. `reaction_manual_workflow` — Finish the Reaction app manual workflow for conservative dissociate / associate / transmute authoring. Status: `next`. Depends on: none.
2. `reaction_flow_schema` — Define the versioned JSON contract used between Reaction and Composer. Status: `pending`. Depends on: `reaction_manual_workflow`.
3. `composer_reaction_import` — Build the Composer-side import path for accepted reaction flows. Status: `pending`. Depends on: `reaction_flow_schema`.
4. `pdg_solver_ingest` — Build PDG channel ingest around the official PDG data path and normalize it into Reaction-side inputs. Status: `pending`. Depends on: `reaction_flow_schema`.
5. `app_boundary_split` — Separate Composer and Reaction into independent app entrypoints and remove shared overlay coupling. Status: `pending`. Depends on: `composer_reaction_import`.
6. `viewport_autoscale_authoring` — Finish Composer observer framing and autoscale authoring for imported reaction scenes. Status: `active`. Depends on: `composer_reaction_import`.

## Current Delivery Priorities

### 1. Reaction First

The Reaction app is the upstream truth for provenance and conservation.

That means the first delivery priority is still:

- reliable manual mapping;
- reliable operator grammar;
- reliable composite handling;
- and stable reaction-flow export.

Detailed product and interaction notes live in [reaction](./reaction.md).

### 2. Contract Before Deep Integration

The cross-app contract should be made explicit before more convenience coupling is added.

That means:

- define the handoff schema;
- add fixtures and validation;
- then build Composer import against that contract.

Detailed architecture and migration notes live in [independence](./independence.md).

### 3. Composer As Downstream Authoring Surface

Composer should remain responsible for:

- scene staging;
- observer motion and framing;
- explanatory overlays;
- playback;
- and repo-ready scene output.

Detailed Composer notes live in [composer](./composer.md).

### 4. SWE Work Must Continue In Parallel

The apps are being built while the codebase is being cleaned up.

That means architectural cleanup is not optional follow-on work. It is part of how the workstream stays stable:

- composition roots stay thin;
- solver and import logic move into focused runtimes;
- app boundaries are enforced;
- and regression tests grow as seams become explicit.

Detailed engineering discipline lives in [swe](./swe.md) and [pdg-solver](./pdg-solver.md).

## Guardrails

- Do not let new convenience coupling make separation harder.
- Do not put cross-app handoff logic into shared UI state.
- Do not make Composer solve reaction conservation problems.
- Do not make Reaction take over final animation authoring.
- Prefer versioned JSON contracts over shared executable helpers.
- Prefer focused runtime modules over growing coordinator files.
- Prefer regression tests before refactors that touch brittle solver behavior.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [pdg-solver](./pdg-solver.md)
- [independence](./independence.md)
- [swe](./swe.md)
- [viewports](../viewports/viewports.md)
- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)

## Related AAA Notes

- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../content/markdown/aaa/archie/navigation-and-controls.md)
- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
