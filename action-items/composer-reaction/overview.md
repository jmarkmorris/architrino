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

### `reaction_manual_workflow` — Current implementation and open repair list

Current implementation state:

- The reaction solver now opens as a first-class reaction app mode rather than reading as a composer sub-panel.
- The manual solver surface is still hierarchy-first and lane-based:
  - reactants on the left,
  - products on the right,
  - and a single center `Transmute` add lane between them.
- Side add controls are the left reactant `+`, the right product `+`, and the center transmute `+`.
- Composite assemblies now sit on the outside edges of the side columns, while their constituent rows and row-level selectors stay closer to the center mapping seam.
- Composite collectors are now structural only; mapping selectors live on the subassembly rows rather than on the composite tile itself.
- The binary slot headers must continue to be treated as a geometry-first invariant:
  - reactants read `I M O`,
  - products read `O M I`,
  - and those headers must align to the actual tri-binary tile columns for every participant layout.
- Mapping and conservation rules were re-centralized into a shared runtime so pending-target state and committed-path validation use the same structured rule seam.
- The current transmute rule is:
  - reactants may feed a transmute input,
  - transmute outputs may target products only,
  - and a transmute output path is valid only when the outgoing ledger exactly matches the incoming ledger.
- A committed transmute-output bug was fixed:
  - balanced transmute outputs were being flagged red because the destination ledger was being double-counted during committed-path validation;
  - committed validation now uses the existing outgoing ledger as-is, while pending target validation still adds the candidate destination ledger.
- Visual emphasis was partially reset:
  - default participant rows and binary choices are no longer globally dimmed,
  - invalid mappings remain red,
  - hover/selection emphasis is narrower,
  - and valid targets during mapping get only a restrained ready cue.

Open TODO list:

- Re-verify the full mapping grammar in the live UI after restart:
  - direct reactant-to-product conservation,
  - transmute input/output behavior,
  - and invalid-path red persistence.
- Reassess whether the current transmute exact-balance rule is sufficient by itself, or whether destination-structure compatibility must also be checked more explicitly for transmute outputs.
- Continue simplifying shading/highlighting so the canvas stays stable unless one of three things is true:
  - a path is hovered/selected,
  - a source anchor is armed,
  - or a rule is broken.
- Audit `I M O` / `O M I` header alignment against actual rendered geometry for all mixed simple/composite side-column layouts in the live browser, not just in structured code.
- Continue reducing UI cruft and duplicated visual mechanisms around composite assemblies; the intended signal is that a composite spans its subassemblies, not that it adds redundant selectors or echoed connector art.
- Confirm the local header-signature automation after restart so the top-left timestamp/build stamp can be trusted as a freshness indicator during UI review.
- Recheck the full commit path after restart even though the manual audit commands currently pass.

## Ordered Objectives

1. Finish the reaction app as a genuinely usable manual provenance tool.
2. Bridge solved reactions back into the main composer as staged animated results.
3. Design authored viewport autoscale so framing constraints can distinguish between required in-view assemblies and assemblies allowed to leave frame.
4. Replace observer/editorial placeholders with a real authored timeline model.
5. Move composer-side structural editing and visualization onto the shared canonical structure model.
