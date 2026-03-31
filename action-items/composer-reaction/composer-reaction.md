# Composer, Reaction App, and PDG Solver

## Workstream Metadata

- Kind: `priority`
- Rank: `3`
- Value: `9`
- Cost: `4`
- ROI: `2.25`
- Status: `active`

## Task Queue

1. `reaction_manual_workflow` — Finish the reaction app manual workflow for conservative dissociate / associate / transmute authoring. Status: `next`. Depends on: none.
2. `reaction_flow_schema` — Define the shared reaction flow JSON contract used between the reaction app, PDG solver, and composer. Status: `pending`. Depends on: `reaction_manual_workflow`.
3. `pdg_solver_ingest` — Build PDG channel ingest around the official PDG data path and normalize it into reaction-app inputs. Status: `pending`. Depends on: `reaction_flow_schema`.
4. `solved_reaction_handoff` — Route accepted reaction flows from the reaction app into the composer as staged animated scenes. Status: `pending`. Depends on: `reaction_flow_schema`.
5. `viewport_autoscale_authoring` — Finish composer observer framing and autoscale authoring so reaction flybys can keep required assemblies in view. Status: `active`. Depends on: `solved_reaction_handoff`.

## Scope

This workstream covers three linked app surfaces:

- [composer.md](./composer.md) — the final animation and observer-staging surface;
- [reaction.md](./reaction.md) — the conservative manual reaction-authoring surface;
- [pdg-solver.md](./pdg-solver.md) — the planned PDG-data ingestion and reaction-seeding surface.

## Brief Overview

The intended pipeline is:

1. the PDG solver reads a reaction channel and its metadata;
2. it sends the normalized reactants, products, energy, and channel context into the reaction app;
3. the reaction app resolves a conservative provenance-preserving reaction flow;
4. the resulting reaction flow JSON is handed to the composer;
5. the composer turns that flow into an authored animation with observer flybys and autoscale.

## Current State

- The canonical implementation-aware references now live in [composer.md](./composer.md), [reaction.md](./reaction.md), and [pdg-solver.md](./pdg-solver.md). This rollup should summarize the remainder, not duplicate those notes in full.
- The composer shell is already real enough that the remaining work is about closing specific gaps rather than inventing the whole authoring model.
- The reaction app is now the primary manual provenance surface, and the old `Map On Canvas` bridge should be treated as transitional scaffolding only.
- The first shared canonical-structure bridge already exists in the composer as a read-only integration path, but it does not yet drive live structure mutations.
- Observer-path controls exist, but true authored observer intervals still do not.
- `Audio` remains placeholder-only.

## Ordered Objectives

1. Finish the reaction app as a genuinely usable manual provenance tool.
2. Bridge solved reactions back into the main composer as staged animated results.
3. Replace observer and editorial placeholders with a real authored timeline model.
4. Move composer-side structural editing and visualization onto the shared canonical structure model.

## Priority 1: Reaction App Manual Workflow

- Keep the current left / center / right hierarchy solver as the near-term reaction-authoring baseline rather than jumping immediately to free placement.
- Improve state legibility inside the existing reaction app:
  - show explicit `Transmute` incoming and outgoing ledgers;
  - make balanced versus unbalanced center tiles self-explanatory;
  - make source, target, mapped, and ineligible anchor roles more visually distinct;
  - and make path tracing easier through hover, selection, endpoint emphasis, or temporary dimming of unrelated mappings.
- Keep refining composite depiction:
  - preserve seam-side composite cards;
  - keep split behavior reversible through re-add rather than hidden state;
  - and keep internal composite join lines visually subordinate to the main mapping lines.
- Clean up the right-click grammar and top-bar guidance so the reaction app can be learned from the surface itself.
- Extend the current automated solver coverage so it also protects:
  - `Transmute` UI semantics and overflow blocking;
  - timeline / reaction handoff assumptions;
  - and the remaining visual and manual regression points that still need refresh-and-audit checking.
- Keep the old straight transfer-drafting bridge only as compatibility scaffolding while the dedicated reaction app becomes the clear primary workflow.

## Priority 2: Bridge Solved Reactions Back Into The Composer

- Convert an accepted reaction solve into durable reaction data rather than leaving it trapped in temporary solver UI state.
- Feed solved participants, mappings, and provenance into the shared reaction item on the timeline.
- Define the first concrete handoff from hierarchy mappings to staged motion grammar such as `detach`, `flight`, and `reassemble`.
- Make accepted mapping geometry become the starting point for observer-facing spline refinement rather than a disposable diagnostic overlay.
- Keep the normal composer responsible for staging, timing, viewpoint, and explanatory overlays rather than for re-solving the reaction.

## Priority 3: Replace Observer And Editorial Placeholders

- Turn `Observer` into a true timeline item with authored spans, framing intent, and synchronized observer-path behavior.
- Define the first concrete observer object model for the design view, the observer path, and any future synchronized inset.
- Finish the placeholder editorial items, especially `Audio`, observer transitions, and framing behavior.
- Improve timeline zoom and local navigation so short spans remain editable in long scenes.
- Improve media-asset entry beyond typed paths where practical.
- Continue visible observer-language cleanup while allowing runtime internals to remain transitional until the object model is stable.

## Priority 4: Move Composer Structure Onto The Shared Canonical Model

- Keep the new canonical structure bridge as the only direction of travel and stop adding fresh ontology to ad hoc composer-only assembly helpers.
- Extend the first composer-side visual path that already reads canonical structure into more viewport and editor surfaces instead of leaving the bridge as isolated summaries and badges.
- Move at least one actual composer mutation path onto shared structure transforms, likely regroup / group-split or another narrow hierarchy edit.
- Make parent and child nesting read as local structure rather than grouped ids alone.
- Add richer subassembly transforms, presets, and instance overrides once the canonical edit path exists.
- Decide how anti-Noether cores and similar theory-facing structures should be depicted and edited.
- Add structure-changing edits such as detaching an axial architrino into a free architrino and breaking a binary into free architrinos.
- Keep free architrinos as outputs of structure-changing edits, not as top-level add-menu stamps.
- Make scale changes legible in-scene, including when a structure, inset, or derived view is shown at a different scale.
- Support richer geometric depictions that matter across cases, especially oblate spheroids and spiral structures.
- Animate deeper structural behaviors directly from the architrino picture, including photon counter-rotation, self-propulsion, polarization, Malus-law behavior, axial-polarity-driven precession, equivalence-principle explanations, and ephemeral `W` and `Z` configurations.
- Make momentum constraints legible in the structure model, especially the angular and linear momentum relations that maintain relative plane angles.
- Add notation and display conventions that distinguish apparent energy from total energy.

## Active But Below The Main Four

- PDG solver and reaction-app follow-on after the manual workflow is genuinely solid:
  - ranked candidate proposals;
  - pin / forbid / rerun-on-remainder controls;
  - provenance summaries and diagram exports;
  - external API use where it sharpens solving rather than distracting from the manual baseline;
  - possible MadGraph-assisted channel work;
  - and scene-builder / API-mode handoff once the stored reaction payload is stable.
- Composer architecture follow-on:
  - retire the remaining raw timing / reaction text bridges once structured authoring can replace them cleanly;
  - close the gap between the current preview bridge and the dedicated `Scene-Composed-Animation` runtime path.
- History traces and exclusion envelopes:
  - improve UI authoring for `historyTraces`;
  - refine rendering and controls for path-history traces with window and fade semantics;
  - improve UI authoring and editing for `envelopes`;
  - and connect those displays more explicitly to the delayed and path-history model rather than treating them as generic effects.
- Workspace and persistence cleanup:
  - keep the central viewport dominant;
  - do not reintroduce large persistent assembly-detail panels;
  - keep turning repeated text-entry flows into structured or direct-manipulation authoring where that improves clarity;
  - and leave repo-facing persistence, validation, reusable libraries, and lint as later follow-on work unless they become blockers for the higher priorities.

## Guardrails

- Keep the composer visual, canvas-first, and light on persistent text authoring.
- Manage assembly-specific controls from the assembly center where practical.
- Keep path markers directly draggable.
- Make timeline items more authorable, not more abstract.
- Prefer `observer` language over `camera` language in the user-facing design.
- Keep the left panel gone as a visible authoring surface.
- Preserve a consistent look and feel as the UI gets richer.
- Avoid reintroducing large persistent inspector-style editing.
- Do not make unrelated changes.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [pdg-solver](./pdg-solver.md)
- [viewports](../viewports/viewports.md)
- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)

## Related AAA Notes

- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../content/markdown/aaa/archie/navigation-and-controls.md)
- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)



Temporary location of swe issues

ComposerReactionSolverUiRuntime.js is too large because it is not one module anymore. It is a whole subsystem collapsed into one closure.

The concrete SWE problems are:

Too many responsibilities in one file.
ComposerReactionSolverUiRuntime.js (line 705) creates the runtime, but inside that same scope it also owns:

solve orchestration at ComposerReactionSolverUiRuntime.js (line 1314)
participant mutation and splitting at ComposerReactionSolverUiRuntime.js (line 1374) and ComposerReactionSolverUiRuntime.js (line 1430)
menu and picker UI at ComposerReactionSolverUiRuntime.js (line 1672) through ComposerReactionSolverUiRuntime.js (line 2411)
surface grid placement at ComposerReactionSolverUiRuntime.js (line 1990) through ComposerReactionSolverUiRuntime.js (line 2242)
route drawing at ComposerReactionSolverUiRuntime.js (line 3054) through ComposerReactionSolverUiRuntime.js (line 3319)
DOM event wiring at ComposerReactionSolverUiRuntime.js (line 3538)
Hidden coupling through shared closure state.
Nearly every nested function reads or mutates shared state, menu state, drag state, DOM refs, and registries. That means a “small” change in solve behavior can break layout, menu behavior, drag behavior, or mapping rendering without any explicit interface boundary.

Low testability.
The more logic that only exists as nested functions inside one factory, the harder it is to test behavior directly. That is why several tests in this area are source-regex tests instead of focused behavioral tests. Extracted modules like ComposerReactionSolveProposalRuntime.js are much easier to verify.

Regression risk from unrelated edits.
The composite-title regression is exactly the kind of bug this structure invites: a UI wrapper change in one area affected composite placement in another because DOM shape, selector assumptions, render order, and layout logic are all entangled.

Poor change locality.
If you touch this file for any meaningful feature, you are editing a file that also contains solve logic, row assignment, SVG routing, menu UI, binary selection handling, and event plumbing. That increases merge conflicts and makes review harder because the diff context is huge.

Mixed abstraction levels.
The file jumps constantly between high-level orchestration and low-level pixel math. For example, solve orchestration at ComposerReactionSolverUiRuntime.js (line 1314) lives in the same module as anchor radius math at ComposerReactionSolverUiRuntime.js (line 3062). That makes the module hard to reason about because there is no stable conceptual layer.

Interfaces are implicit instead of explicit.
There is no clean contract saying “this module owns surface-row placement” or “this module owns menu state.” Instead, ownership is discovered by reading hundreds of lines of nested helpers.

What I would call the main extraction targets next are:

ComposerReactionSurfaceGridRuntime
Own row occupancy, placement, and side-column geometry.

ComposerReactionMenuRuntime
Own picker/menu state and menu rendering.

ComposerReactionRouteRenderRuntime
Own route endpoint calculation and SVG path drawing.

ComposerReactionParticipantInteractionRuntime
Own drag, click, and mapping gesture handling.

keep ComposerReactionSolverUiRuntime.js as composition/wiring only

So the core problem is not “big file bad” in the abstract. It is that this file has become the place where unrelated concerns meet without stable seams, which raises regression risk and slows every future solver change.


---


