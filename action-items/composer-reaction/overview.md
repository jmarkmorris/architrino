# Composer, Reaction App, and PDG Solver

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Task Queue

1. `reaction_manual_workflow` — Finish the reaction app manual workflow and state legibility. Status: `next`. Depends on: none.
2. `solved_reaction_handoff` — Make accepted reaction solves durable and bridge them into the main composer. Status: `pending`. Depends on: `reaction_manual_workflow`.
3. `observer_timeline_model` — Replace observer placeholders with a real authored timeline model. Status: `pending`. Depends on: `solved_reaction_handoff`.
4. `canonical_structure_edits` — Move live composer structure edits onto the shared canonical model. Status: `pending`. Depends on: `observer_timeline_model`.

## Scope

This workstream covers the scene system, composer, reaction app, PDG solver, and later composer enhancements. The detailed architecture references are [composer.md](../composer/overview.md) and [reaction.md](../reaction/overview.md).

## Current State

- The composer shell is real enough that the remaining work is gap-closing rather than first invention.
- The reaction app is the primary manual provenance surface.
- A read-only canonical-structure bridge exists, but it does not yet drive live structure mutations.

## Ordered Objectives

1. Finish the reaction app as a genuinely usable manual provenance tool.
2. Bridge solved reactions back into the main composer as staged animated results.
3. Replace observer/editorial placeholders with a real authored timeline model.
4. Move composer-side structural editing and visualization onto the shared canonical structure model.
