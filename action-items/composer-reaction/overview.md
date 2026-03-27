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
3. `viewport_autoscale_authoring` — Design and implement authored viewport autoscale rules so some assemblies can be marked as required to remain framed while others may leave the viewport. Status: `pending`. Depends on: `solved_reaction_handoff`.
4. `observer_timeline_model` — Replace observer placeholders with a real authored timeline model. Status: `pending`. Depends on: `viewport_autoscale_authoring`.
5. `canonical_structure_edits` — Move live composer structure edits onto the shared canonical model. Status: `pending`. Depends on: `observer_timeline_model`.

## Scope

This workstream covers the scene system, composer, reaction app, PDG solver, and later composer enhancements. The detailed architecture references are [composer.md](../composer/overview.md) and [reaction.md](../reaction/overview.md).

## Current State

- The composer shell is real enough that the remaining work is gap-closing rather than first invention.
- The reaction app is the primary manual provenance surface.
- A read-only canonical-structure bridge exists, but it does not yet drive live structure mutations.
- The reaction app modularity/reuse restructuring is largely complete for the current solver surface:
  - shared structure-domain modules now own canonical structure, classification, validation, traversal, and transforms;
  - shared reaction runtimes now own descriptor generation, mapping rules, binary selection, participant mutation, anchor state, anchor rendering, and participant rendering;
  - and the reaction solver has automated local coverage around those extracted runtimes.
- Composer-side reuse has begun but is not complete:
  - the composer can already read the shared canonical structure bridge in summaries, menus, hover states, and a first viewport-facing badge;
  - the first narrow shared-structure mutation path exists for `Split Group`;
  - but the broader composer-side structural-edit migration is paused while the canvas click paths, menus, and action grammar are being refactored for usability.
- The composer still lacks authored viewport autoscale semantics:
  - there is not yet a way to mark which assemblies must remain inside the viewport and which are allowed to exit frame;
  - any "keep these in view" rule will imply an autoscale operation, not just a fixed camera track;
  - and autoscale authoring must be designed against camera-position variants, because the correct behavior differs when the observer is fixed, moving, following a target, or participating in a staged reaction handoff.

## Ordered Objectives

1. Finish the reaction app as a genuinely usable manual provenance tool.
2. Bridge solved reactions back into the main composer as staged animated results.
3. Design authored viewport autoscale so framing constraints can distinguish between required in-view assemblies and assemblies allowed to leave frame.
4. Replace observer/editorial placeholders with a real authored timeline model.
5. Move composer-side structural editing and visualization onto the shared canonical structure model.
