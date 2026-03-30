# Reaction App

## Purpose

The reaction app is the conservative reaction-authoring surface.

Its job is to build reactant-to-product scenarios that preserve provenance and make dissociate, associate, and transmute structure legible. The intended result is a much more explicit reaction diagram than a standard Feynman diagram: not just channel symbolism, but a concrete record of what came from where and how it reassembled.

## Current State

- The web app already has a dedicated `Reaction Designer` scene and a first-class reaction-solver runtime.
- The current manual workflow is lane-based:
  - reactants on the left;
  - products on the right;
  - operator lanes between them.
- The current root add flow visibly supports reactants, products, polarity transforms, associate, and transmute operators.
- The operator registry also includes dissociate handling, but the full user-facing grammar for dissociate / associate / transmute still needs to be unified and cleaned up.
- Mappings are authored manually by choosing a source anchor and then a valid destination anchor.
- Conservation and validity checks now run through shared mapping-rule runtimes instead of being scattered through UI conditionals.
- Composite participants, binary selection, anchor state, participant mutation, participant rendering, and binary glyph rendering have already been extracted into dedicated runtimes with local automated tests.
- The reaction app is real enough to do manual provenance work now, but it still has important gaps:
  - no auto solve;
  - no PDG-driven seeding;
  - no canonical reaction flow JSON export contract;
  - and no final accept-and-hand-off path into the composer.

## Current Priorities

1. Finish the manual workflow so conservative mapping, operator use, and state legibility are reliable in the live UI.
2. Define and export a canonical reaction flow JSON that captures participants, operators, mappings, provenance, and stage timing.
3. Make dissociate, associate, and transmute read as one coherent reaction grammar instead of a partially split set of UI behaviors.
4. Add an explicit accept / commit path that hands a solved reaction flow into the composer.
5. Keep lane geometry, anchor semantics, and conservation rules centralized so the reaction app stays maintainable as the operator set grows.

## Manual Workflow Gaps

Keep the current left / center / right hierarchy solver as the near-term baseline rather than jumping immediately to full free placement.

The live UI still needs:

- explicit `Transmute` incoming and outgoing ledgers;
- self-explanatory balanced versus unbalanced center tiles;
- stronger visual distinction between source, target, mapped, and ineligible anchor roles;
- and better path tracing through hover, selection, endpoint emphasis, or temporary dimming of unrelated mappings.

## Composite Depiction And Surface Grammar

- Preserve seam-side composite cards.
- Keep split behavior reversible through re-add rather than hidden state.
- Keep internal composite join lines visually subordinate to the main mapping lines.
- Clean up the right-click grammar and top-bar guidance so the reaction app can be learned from the surface itself.
- Keep the old straight transfer-drafting bridge only as compatibility scaffolding while the dedicated reaction app becomes the primary workflow.

## Terminology Note: Reaction, Not Decay

The authored language should prefer `reaction` over `decay`.

That is partly a clarity choice and partly a scope choice:

- physicists use `decay` across several different disassembly and reassembly stories;
- the app needs one term broad enough to cover disassembly, transfer, handoff, and reassembly on a shared timeline;
- and `reaction` is broad enough to hold that full staged process without prejudging whether the event is a one-way breakup or a richer channel transformation.

## Meaning Of Disassembly, Transfer, Handoff, And Reassembly

These terms should mean different jobs rather than overlapping synonyms.

- `disassembly` means opening or separating a reactant-side structure so its constituent parts become explicitly available to author, map, or animate;
- `transfer` means the provenance and conservation claim that a specific constituent or packet in the destination context is the same authored identity as one from the source context;
- `handoff` means the timed stage at which that transferred identity stops belonging to the source-side structure and becomes committed to the destination-side structure or corridor;
- `reassembly` means the product-side locking or rebuilding step in which transferred and recruited constituents settle into a new assembled structure.

That is why `transfer` should remain a useful document-model term even if the user-facing UI increasingly presents mapping arrows, reaction corridors, and stage editing rather than raw transfer ids.

## Reaction Canvas Target Inside The Composer

The blank reaction canvas is still the right target for final authored reaction choreography inside the normal composer, even though reaction solving and provenance bookkeeping now live in a dedicated solver mode.

Current implemented behavior:

- reactions exist as true timeline spans with labels and stage rows;
- an active reaction can open a dedicated solver surface from the composer header;
- the solver is a structured 2D hierarchy canvas rather than a free-placement scene canvas;
- blank-space right-click on that solver surface offers `Add Reactant`, `Add Product`, `Add Transmute`, `Clear reaction canvas`, and a disabled `Auto solve`;
- reactants render in a left column, products render in a right column, and the mapping field lives between them;
- hierarchy rows expose explicit attachment points, with reactant anchors on the right edge and product anchors on the left edge;
- mappings are authored manually by clicking a source anchor and then a valid target anchor;
- invalid targets dim immediately while a source is pending;
- neutron, proton, and Higgs-cluster-like composites can be split into constituent rows;
- a center-lane `Transmute` tile exists as a manual many-input / many-output junction;
- product-side hierarchy display mirrors to `O M I` while canonical slot order remains `inner, middle, outer`;
- and the solver is no longer one mostly monolithic UI file.

That is enough to make manual reaction solving real, but it is not yet the final reaction-authoring model. The current implemented solver is intentionally constrained: hierarchy-first, lane-based, and manual.

The longer-range canvas target is still:

- reactants and products can be placed anywhere on the reaction canvas;
- placement should be author-controlled rather than forced into left/right stacks;
- the user should be able to arrange assemblies to emulate a Feynman diagram when that is clearest;
- and the canvas should remain sparse enough that most reactions with six or fewer total reactants/products stay legible.

That should now be understood as the downstream choreography target, not as a description of the currently implemented solver.

## Core Interaction Model

The author should first place the incoming and outgoing assemblies:

- reactants are tagged as incoming assemblies;
- products are tagged as outgoing assemblies;
- their screen position is independent of that role;
- the author can click whole assemblies, subassemblies, members, or charges as either sources or destinations;
- the author then clicks a source on a reactant object and clicks the destination on a product object.

That click pair should create a visible authored spline across the canvas.

The first-pass mapping rule should be strict:

- one mapping connects one source to one destination.

If a higher-level object such as a binary needs to split, that split should be authored first. Only after the split exists should the author map each resulting constituent to its next destination.

Each spline should mean:

- this constituent remains the same authored identity;
- it moves along this corridor during the reaction interval;
- and it arrives at this destination by the end of the reaction.

The spline is therefore not just annotation. It is the authored motion path for the reaction.

## Blank-Canvas And Object Grammar

On blank space:

- `Add Reactant`
- `Add Product`
- later, possibly `Add Reaction Note` or `Add Guide`

On a reactant or product assembly:

- retag as reactant or product;
- reveal constituents;
- collapse constituents;
- duplicate as template;
- remove from reaction.

On a constituent handle:

- `Start Mapping`
- `Remove Mapping`
- `Show Connected Paths`

On a spline:

- retarget destination;
- drag control points;
- add bend handle;
- change stage timing;
- delete mapping.

This keeps the authoring language visual and local to the object being edited.

## Reaction Solver Screen For PDG-Style Channels

PDG-style channels deserve a separate reaction-solver screen that shares components with the composer while serving a different job.

That distinction matters because the solver is not primarily an animation surface. Its first task is to close provenance: what persists, what is recruited, what is shed, and what returns to spacetime. Only after that bookkeeping is legible should the result be handed off into the normal composer for final path shaping, staging, observer work, and explanatory overlays.

The likely architecture is:

- the solver is a separate screen or mode specialized for reaction solving rather than scene staging;
- it reuses common assembly rendering, constituent reveal, hierarchy inspection, selection, highlighting, and mapping-path components;
- it accepts a set of authored reactants and products, or a named reaction channel template;
- it produces one or more candidate provenance mappings;
- and the accepted result is fed back into the normal composer as reaction participants, transfer-like mappings, and a starting visual layout that the author can then refine.

### Hierarchy-First Solver Interaction

The solver should begin in a text-forward hierarchy view rather than in a fully spatial free-placement view.

The first useful version is:

- a nested reactant hierarchy on the left;
- a nested product hierarchy on the right;
- a central mapping field showing the authored paths between them;
- optional center-lane `Transmute` tiles that act as conservative junctions;
- and a narrow top status bar that reports mapping count and short interaction guidance.

That hierarchy should allow the author to work at several levels:

- whole assembly;
- subassembly;
- member;
- binary;
- and bare architrino or axial architrino when the reaction genuinely needs that depth.

The intended manual loop is:

1. choose the reactants and products to solve;
2. add a `Transmute` tile if the reaction needs a multi-input / multi-output handoff hub;
3. inspect the reactant and product hierarchies;
4. manually author mappings by clicking a valid source anchor and then a valid target anchor;
5. split coarse composite participants only when finer provenance is required;
6. adjust the vertical position of `Transmute` to reduce crossings when helpful;
7. review the resulting conservative paths in the center field;
8. then hand the accepted structure off to the normal composer for final animation work.

What is not implemented yet:

- ranked solver proposals;
- pin / forbid controls;
- rerun-on-remainder solving;
- and automatic candidate generation in the center field.

### Attachment Grammar For The Hierarchy View

The hierarchy view should use explicit per-line attach points rather than vague whole-row dragging.

On the reactant side, each row can read:

- description first;
- attach point second.

On the product side, the order can reverse:

- attach point first;
- description second.

The important hierarchy rule should be exclusivity by ancestry:

- if a mapping is attached at a higher node in the hierarchy, descendant rows should gray out;
- their attach points should deactivate while the parent-level mapping remains in force;
- removing that higher mapping should reactivate the descendants;
- and expanding a parent into children should only be needed when the reaction truly requires finer provenance than the parent-level bundle.

## Conservative Mapping Rules And Provenance

The mapping rules themselves should be conservative and provenance-aware:

- a mapping should only be allowed when the source and target conserve the same inventory of `electrino` and `positrino` for the modeled unit being moved;
- every accepted mapping should carry provenance, even if the solver or author has to infer leaf-level provenance to keep the ledger closed honestly;
- and when a reactant attach point is selected, product attach points that are not conservative with that source should gray out and deactivate rather than allowing an invalid mapping to be drawn.

The first-pass conservation rule should be inventory-based rather than label-based:

- `electrino` count must be conserved exactly per mapping;
- `positrino` count must be conserved exactly per mapping;
- and a mapping should be blocked if the source and target do not carry the same ledger for the unit being mapped.

The implemented ledger now follows the currently exposed attachment points rather than a static template guess:

- a binary-selector attachment point derives its live ledger from the selected binary state;
- a coarse attachment point derives its ledger from the subassembly rooted at that row;
- and a `Transmute` tile sums all incoming mapped ledgers on its left anchor and all outgoing mapped ledgers on its right anchor.

The current `Transmute` rule is:

- it may collect multiple incoming reactant mappings;
- it may emit multiple outgoing product mappings;
- its output side remains conservative only while the accumulated outgoing ledger stays within the accumulated incoming ledger;
- and the tile should remain dim until incoming and outgoing ledgers match exactly.

Those rules should keep moving toward a centralized rule registry rather than remaining scattered through UI conditionals.

## Regression Coverage Still Needed

Extend the current automated solver coverage beyond the present baseline so it also protects:

- `Transmute` UI semantics and overflow blocking;
- timeline / reaction handoff assumptions;
- and the remaining visual and manual regression points that still need refresh-and-audit checking.

## Wildcard Spacetime Participants

The solver needs explicit wildcard participants for spacetime recruitment and return.

For the current pass, the composer already has a `Higgs cluster` assembly type available in the solver, and it may serve as an `ST-in` or `ST-out` wildcard when that is the right coarse model.

That means:

- a reaction may recruit one or more `Higgs cluster` participants from spacetime;
- a reaction may return unused or broken material back into spacetime;
- and a proposed solution does not need to consume or produce every part of a wildcard participant symmetrically.

Separately, the implemented `Transmute` tile should be treated as a reaction-logic junction, not as a spacetime ontology claim.

## Relation To The Composer

The solver should feed the normal composer rather than replace it.

An accepted solver result should become:

- reaction participants in the authored reaction item;
- transfer-like continuity mappings that preserve provenance;
- a first-pass stage breakdown such as `detach`, `flight`, and `reassemble`;
- and an initial visual corridor or spline layout that the normal reaction canvas can refine.

This keeps one important separation clear:

- the reaction app answers what maps to what and what spacetime contributed;
- the composer answers how that mapping is staged, viewed, timed, and explained.

## Required Output Contract

The reaction app should be the place where the pipeline first becomes conservative and explicit.

Its output should include:

- reactants and products with stable ids;
- operator placements and roles;
- conservative source-to-destination mappings;
- enough stage timing to distinguish dissociation, transfer, and reassembly;
- and provenance metadata needed downstream for animation and explanation.

### Draft Schema Direction

Purpose:

- model exchanges, relocks, handoffs, disassembly, and branch outcomes;
- connect time, participants, and path geometry;
- remain explicit enough for export, validation, and replay.

Draft shape:

```js
ReactionSpec {
  id: string,
  participants: Array<{ assembly: Ref, role: "reactant" | "product" | "catalyst" | "emission" }>,
  timeline?: Array<{
    t: number,
    action: "spawn" | "despawn" | "transform" | "detach" | "attach" | "handoff" | "reassemble",
    target: Ref,
    params?: Record<string, unknown>
  }>,
  outputs?: Array<{ toScene?: string }>
}
```

Possible provenance fields include:

- source id;
- destination id;
- transfer time;
- path or corridor id;
- recruited substrate source;
- confidence or validation state.

## Example Reaction Families

### Reaction With Disassembly And Reassembly

- incoming assemblies follow authored approach paths;
- reactants disassemble into explicit constituent parts;
- selected parts transfer across handoff paths or reaction corridors;
- product assemblies reassemble from those parts and continue on authored outgoing paths;
- provenance records preserve where each transferred component came from.

### PDG-Style Reaction And Decay Scenes

- authored decay chains following known PDG reaction families;
- multi-stage disassembly and reassembly of constituents over the shared timeline;
- branching authored outcomes with probabilities or confidence metadata;
- and reaction libraries keyed to named channels or reusable reaction templates.

### Atomic Reaction Scenes

- ionization, recombination, excitation, and de-excitation scenes;
- photon emission and absorption sequences tied to authored atomic transitions;
- electron capture, scattering, and exchange scenes;
- and multi-assembly atomic reactions where incoming particles perturb a bound atomic structure.

## Development Constraint

The reaction app should continue moving toward one source of truth for conservation and layout.

In practice that means:

- keep rule logic in shared runtimes;
- keep lane geometry derived from the explicit layout model;
- and avoid duplicating mapping semantics in CSS, DOM heuristics, or ad hoc menu code.

## Related Action Items

- [composer-reaction](./composer-reaction.md)
- [composer](./composer.md)
- [pdg-solver](./pdg-solver.md)
- [viewports](../viewports/viewports.md)

## Related AAA Notes

- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
