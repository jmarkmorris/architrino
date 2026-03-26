# Reaction Design

This note collects reaction-specific UI, solver, provenance, schema, and example-scene design material that previously lived inside [composer.md](composer.md).

## Terminology note: reaction, not decay

The composer should prefer `reaction` over `decay` in its authored animation language.

That is partly a clarity choice and partly a scope choice:

- physicists use non-physical term `decay` across several different disassembly and reassembly stories;
- the composer needs one term that can cover disassembly, transfer, handoff, and reassembly on a shared authored timeline;
- and `reaction` is broad enough to hold that whole staged process without prejudging whether the event is a simple one-way breakup or a richer channel transformation.

So when this design area becomes more visible in the UI:

- use `reaction` for the authored event object,
- use `reaction stages` for the timed substeps,
- and avoid centering `decay` as the primary composer term unless a specific scientific scene needs that narrower wording in displayed content.

## Meaning of disassembly, transfer, handoff, and reassembly

In this reaction design, these terms should mean different jobs rather than overlapping synonyms.

- `disassembly` means opening or separating a reactant-side structure so its constituent parts become explicitly available to author, map, or animate;
- `transfer` means the provenance and conservation claim that a specific constituent or packet in the destination context is the same authored identity as a specific constituent or packet from the source context;
- `handoff` means the timed reaction event or stage at which that transferred identity stops belonging to the source-side structure and becomes committed to the destination-side structure, corridor, or receiving assembly logic;
- and `reassembly` means the product-side locking or rebuilding step in which transferred and recruited constituents settle into a new assembled structure.

These distinctions matter because a reaction may need some of these operations without needing all of them at the same level.

For example:

- a reactant may disassemble without every exposed part being transferred;
- a transfer may exist as a provenance mapping even before the final visual handoff timing is authored;
- a handoff may happen before the full product has reassembled;
- and reassembly may combine transferred material with spacetime-recruited material rather than only with directly transferred parts.

So the intended reaction grammar is:

- `disassembly` answers what is opened or detached;
- `transfer` answers what persistent identity is being tracked;
- `handoff` answers when custody or structural ownership changes;
- and `reassembly` answers how the destination structure becomes whole.

That is why `transfer` should remain a useful document-model term even if the visible UI increasingly presents the user with mapping arrows, reaction corridors, and stage editing rather than raw transfer ids.

## Reaction Canvas Target Inside The Composer

The blank reaction canvas is still the right target for final authored reaction choreography inside the normal composer, even though reaction solving and provenance bookkeeping now live in a dedicated solver mode.

### Current implementation and next target

The composer no longer treats reactions as purely typed bookkeeping, but the implemented surface is now clearly split into two layers:

- the shared composer timeline and reaction span model;
- and a dedicated manual reaction-solver screen for provenance closure.

Current implemented behavior:

- reactions exist as true timeline spans with labels and stage rows;
- an active reaction can open a dedicated solver surface from the composer header;
- the solver is a structured 2D hierarchy canvas rather than a free-placement scene canvas;
- blank-space right-click on that solver surface offers `Add Reactant`, `Add Product`, `Add Transmute`, `Clear reaction canvas`, and a disabled `Auto solve`;
- reactants render in a left column, products render in a right column, and the mapping field lives between them;
- hierarchy rows expose explicit attachment points, with reactant anchors on the right edge of the reactant tree rows and product anchors on the left edge of the product tree rows;
- mappings are authored manually by clicking a source anchor and then a valid target anchor;
- invalid targets dim immediately while a source is pending, so the user sees the current conservation gate before committing a line;
- neutron, proton, and Higgs-cluster-like composite assemblies can be split into constituent rows, and those composite rows render near the mapping seam rather than buried back in the outer card lane;
- a center-lane `Transmute` tile now exists as a manual many-input / many-output junction, with one input anchor on its left and one output anchor on its right;
- the `Transmute` tile can be dragged vertically along the center lane while keeping the left-to-right reaction grammar intact;
- product-side hierarchy display now mirrors to `O M I` while canonical slot order remains `inner, middle, outer`;
- trimming a generation now strips the inner binary from a slot while keeping the tile and its axial-architrino dressing visible, so the UI does not misrepresent the surviving structure;
- full tri-binary pro and anti Noether-core-like packets are now blocked from mapping directly to each other even when coarse inventory counts match, while Gen II / Gen III structures still fall back to conservative inventory rules;
- and the solver is no longer one mostly monolithic UI file:
  - shared runtimes now own canonical structure bridging, descriptor generation, mapping semantics, binary selection, participant mutation, anchor state, anchor rendering, participant rendering, and binary glyph rendering,
  - and those extracted paths now have local automated coverage for selection rules, mutation flows, descriptor shape, mapping constraints, anchor state, and core render primitives.

That is enough to make manual reaction solving real, but it is not yet the final reaction-authoring model. The current implemented solver is intentionally constrained: it is hierarchy-first, lane-based, and manual. It does not yet provide ranked solver proposals, free placement of assemblies anywhere on the reaction surface, authored bend handles for the main reaction paths, or the richer stage-timing and playback choreography described below.

The next target should still be to keep the current solver for provenance closure while separately evolving the blank reaction canvas into the final observer-facing choreography surface.

The authoring flow should begin from nothing visible except the reaction surface itself. On an empty reaction canvas, the first right-click should offer:

- `Add Reactant`
- `Add Product`

That starting point matters because a reaction should read first as an authored relation between incoming and outgoing assemblies, not as a form that asks for low-level bookkeeping before the geometry is visible.

The preferred long-range layout is still:

- reactants and products can be placed anywhere on the reaction canvas;
- placement should be author-controlled rather than forced into left/right stacks;
- the user should be able to arrange assemblies to emulate a Feynman diagram when that is the clearest explanation;
- and the canvas should remain sparse enough that most reactions with six or fewer total reactants/products are still legible without a second layout mode.

But that should now be understood as the downstream choreography target, not as a description of the currently implemented solver. The current solver deliberately keeps the stronger left-to-right ledger grammar because that makes manual provenance closure much easier to read.

This should feel closer to a Feynman-diagram composition surface than to a spreadsheet of transfer ids.

### Core interaction model

The author should first place the incoming and outgoing assemblies:

- reactants are tagged as incoming assemblies;
- products are tagged as outgoing assemblies;
- their screen position is independent of that role;
- the author can click whole assemblies, subassemblies, members, or charges as either sources or destinations;
- the author then clicks a source on a reactant object and clicks the destination on a product object.

That click pair should create a visible authored spline across the canvas.

The first-pass mapping rule should be strict:

- one mapping connects one source to one destination.

If a higher-level object such as a binary needs to split, that split should be authored first. Only after the split exists should the author map each resulting architrino to its next destination.

The destination rule should also be strict:

- if the dragged spline endpoint does not attach to a valid product-side destination when the click is completed, the mapping does not take;
- the user may drag the endpoint while choosing a target,
- but an unattached endpoint should disappear on release rather than creating a dangling authored object.

Each spline should mean:

- this constituent remains the same authored identity,
- it moves along this corridor during the reaction interval,
- and it arrives at this destination by the end of the reaction.

So the low-level notion of a transfer should remain in the document model, but the user-facing authoring act should be a visual constituent mapping, not typed transfer references.

### Why splines are the right primitive

The handoff path should be authored as a spline rather than as a straight abstract connector because the spline can carry several jobs at once:

- identity continuity;
- geometric readability when multiple mappings cross;
- later timing control through waypoints or bend handles;
- and observer-facing choreography during playback.

During playback, the mapped constituent should follow that spline and land in the destination structure by the end of the relevant reaction stage.

This means the canvas drawing is not just a diagram. It is the authored motion path for the reaction.

The spline therefore does direct motion work, not merely explanatory annotation.

### Reaction stages in this model

Reaction stages should still exist, but they should refine the corridor behavior rather than replace it with text fields.

The intended model is:

- stage 1 can separate or expose constituents from the reactant side;
- stage 2 can move them across the corridor;
- stage 3 can reassemble or settle them into product-side structures.

The stage UI should therefore primarily answer:

- when does this mapped constituent leave the reactant structure,
- when is it in flight,
- and when does it lock into the product structure.

That is a clearer reaction grammar than asking the user to type action names and transfer ids first.

### Provenance in the visual model

The reaction canvas should make provenance obvious by construction.

Each authored spline already says:

- where the constituent came from,
- where it went,
- and which identity persisted across the reaction.

So provenance should appear as:

- stable source and destination labels on hover or selection,
- visual highlighting of all splines attached to a selected constituent,
- and optional textual summaries in the side menu only after the geometry has already made the mapping legible.

The important design rule is that provenance should be seen first and read second.

### Blank-canvas menu grammar

The reaction surface should have a constrained context-menu grammar.

On blank space:

- `Add Reactant`
- `Add Product`
- later, possibly `Add Reaction Note` or `Add Guide`

On a reactant or product assembly:

- retag as reactant or product,
- reveal constituents,
- collapse constituents,
- duplicate as template,
- remove from reaction

On a constituent handle:

- `Start Mapping`
- `Remove Mapping`
- `Show Connected Paths`

On a spline:

- retarget destination,
- drag control points,
- add bend handle,
- change stage timing,
- delete mapping

This keeps the authoring language visual and local to the object being edited.

### Relation to the main composer canvas

This reaction canvas should not replace the normal scene canvas. It should be a specialized reaction-authoring mode inside the composer.

The normal composer canvas still handles:

- assembly placement in scene space,
- paths,
- observer tooling,
- overlays,
- and the broader timeline.

The reaction canvas should handle:

- reactant/product arrangement,
- constituent correspondence,
- spline authoring across free placement,
- and staged reassembly logic.

The authored result should then feed back into the shared scene and timeline model.

Assemblies should enter this reaction canvas in two ways:

- by manual addition onto the blank reaction canvas;
- or by loading an existing library animation or scene that already contains the relevant assemblies.

### Design constraint to preserve

The reaction UI should stay legible even when the underlying theory gets dense.

So the design should prefer:

- a small number of clearly named reactant and product assemblies,
- selective constituent reveal instead of showing every charge immediately,
- splines as the main continuity primitive,
- and one obvious blank-canvas starting gesture.

The user should be able to understand the reaction authoring grammar in one glance:

- place the incoming and outgoing assemblies where the explanation is clearest,
- connect what persists,
- then play the reaction.

### First-pass implementation spec

The reaction authoring surface should have these objects:

- `ReactionCanvasObject`
  - one per reaction item;
  - stores the local reaction layout and visual mappings;
- `ReactionAssemblyNode`
  - references one authored assembly;
  - has a role of `reactant` or `product`;
  - has a 2D canvas position;
  - can expose handles for assembly, subassembly, member, and charge selection;
- `ReactionMappingSpline`
  - references exactly one source handle and one destination handle;
  - stores spline control points in reaction-canvas coordinates;
  - stores the stable identity mapping used by playback;
- `ReactionStageTiming`
  - for first pass, stages are reaction-wide rather than per-spline;
  - the first default stage set is `detach`, `flight`, `reassemble`.

The first-pass interaction sequence should be:

1. create or open a `Reaction` item on the timeline;
2. open the reaction canvas for that item;
3. right-click blank space and choose `Add Reactant` or `Add Product`;
4. choose the source of that assembly node:
   - the normal canvas add menu,
   - the library of assemblies,
   - or restoring a scene from the animation scene library;
5. place the assembly node on the canvas;
6. repeat until the reaction layout is in place;
7. reveal constituents as needed;
8. click a reactant-side source handle, then click a product-side destination handle;
9. if the destination is valid, commit the spline;
10. if the destination is invalid or absent, discard the spline on release;
11. scrub or play the reaction and confirm the mapped constituent follows the authored spline.

The first-pass validity rules should be:

- a source must belong to a node tagged `reactant`;
- a destination must belong to a node tagged `product`;
- one mapping is one-to-one;
- a mapping cannot terminate on blank space;
- a split must be authored before mapping its resulting parts;
- a reaction may have zero or more mappings, but only committed mappings affect playback.

The first-pass playback rules should be:

- the source identity remains stable through the reaction;
- during `detach`, the source separates from its reactant structure if needed;
- during `flight`, it follows the authored spline;
- during `reassemble`, it locks into the destination structure;
- if no committed mapping exists, no transfer-like motion occurs for that constituent.

The first-pass menu rules should be:

- blank canvas:
  - `Add Reactant`
  - `Add Product`
- add-source chooser after either action:
  - `From Canvas Add Menu`
  - `From Assembly Library`
  - `Restore From Animation Scene Library`
- assembly node:
  - `Set As Reactant`
  - `Set As Product`
  - `Reveal Constituents`
  - `Collapse Constituents`
  - `Remove`
- source/destination handle:
  - `Start Mapping`
  - `Show Connected Paths`
  - `Remove Mapping`
- spline:
  - `Retarget Destination`
  - `Add Bend Handle`
  - `Delete Mapping`

The first-pass non-goals should be:

- no many-to-one or one-to-many mappings;
- no dangling splines;
- no automatic product creation by dropping onto empty space;
- no required text entry for transfer ids;
- no forced left/right layout.

## Reaction Solver Screen For PDG-Style Channels

PDG-style channels deserve a separate reaction-solver screen that shares components with the composer while serving a different job.

That distinction matters because the solver is not primarily an animation surface. Its first task is to help the author close provenance: what persists, what is recruited, what is shed, and what returns to spacetime. Only after that bookkeeping is legible should the result be handed off into the normal animation composer for final path shaping, staging, observer work, and explanatory overlays.

So the likely architecture is:

- the solver is a separate screen or mode specialized for reaction solving rather than scene staging;
- it reuses common assembly rendering, constituent reveal, hierarchy inspection, selection, highlighting, and mapping-path components;
- it accepts a set of authored reactants and products, or a named reaction channel template;
- it produces one or more candidate provenance mappings;
- and the accepted result is fed back into the normal composer as reaction participants, transfer-like mappings, and a starting visual layout that the author can then refine.

This is a cleaner division of labor than forcing one screen to be equally good at:

- inventory accounting,
- channel solving,
- provenance explanation,
- and final observer-facing animation choreography.

### Hierarchy-first solver interaction

The solver should likely begin in a text-forward hierarchy view rather than in a fully spatial free-placement view.

The first prototype can also be explicitly 2D rather than pretending to be a mini version of the 3D scene composer.

That first prototype now does open from a top-right `Reaction` pill in the composer header. Clicking that pill switches the author into the dedicated solver canvas rather than into the normal scene-staging canvas.

On that 2D solver canvas, right-clicking blank space currently offers:

- `Add Reactant`
- `Add Product`
- `Add Transmute`
- `Clear reaction canvas`
- `Auto Solve`
  - visible but still not implemented in the current manual prototype.

The first useful version is now:

- a nested reactant hierarchy on the left;
- a nested product hierarchy on the right;
- a central mapping field showing the authored paths between them;
- optional center-lane `Transmute` tiles that act as conservative junctions;
- and a narrow top status bar that reports authored mapping count and short interaction guidance.

When a reactant is added:

- the author chooses from the particle list already available in the app;
- the particle card appears in the leftmost lane;
- and its hierarchy with attach points appears immediately to the right of that card.

When a product is added:

- the author chooses from the same particle list;
- the particle card appears in the rightmost lane;
- and its hierarchy with attach points appears immediately to the left of that card.

When a `Transmute` tile is added:

- it appears in the exact horizontal middle lane;
- it has one input anchor on the left and one output anchor on the right;
- it can accept many incoming mappings on the input side and many outgoing mappings on the output side;
- and it stays visually dim until the incoming and outgoing ledgers balance.

That hierarchy should allow the author to work at several levels:

- whole assembly;
- subassembly;
- member;
- binary;
- and bare architrino or axial architrino when the reaction genuinely needs that depth.

This matters because most PDG-style reactions should not require the author to move every constituent by hand. In many channels, most structure is spectator carry-through and only a smaller active frontier needs detailed solving. The solver should therefore prefer the coarsest mapping that closes the ledger honestly, and only expand a node when the author or the solver needs more detail there.

The intended manual authoring loop is now:

1. choose the reactants and products to solve;
2. add a `Transmute` tile if the reaction needs a multi-input / multi-output handoff hub;
3. inspect the reactant and product hierarchies;
4. manually author mappings by clicking a valid source anchor and then a valid target anchor;
5. split coarse composite participants only when finer provenance is required;
6. adjust the vertical position of `Transmute` to reduce visual crossings when helpful;
7. review the resulting conservative paths in the center field;
8. then hand the accepted structure off to the normal composer for final animation work.

The center mapping field is already directly editable in a manual sense:

- clicking a mapped anchor removes that mapping;
- selecting a source anchor re-evaluates which targets remain conservative;
- splitting a composite participant removes attached mappings and reopens the finer rows;
- `make pro` / `make anti` also clear attached mappings before re-rendering;
- and the visible paths are now the manual provenance graph that a later spline-authoring surface can inherit.

What is not implemented yet:

- ranked solver proposals;
- pin / forbid controls;
- rerun-on-remainder solving;
- and automatic candidate generation in the center field.

### Attachment grammar for the hierarchy view

The hierarchy view should use explicit per-line attach points rather than forcing the author to drag whole rows vaguely.

On the reactant side, each row can read:

- description first;
- attach point second.

On the product side, the order can reverse:

- attach point first;
- description second.

That asymmetry is useful because it makes the mapping field in the middle feel natural. The author can click one reactant-side attach point, then one product-side attach point, and the solver draws the proposed mapping arrow between them.

The important hierarchy rule should be exclusivity by ancestry:

- if a mapping is attached at a higher node in the hierarchy, all descendant rows should gray out;
- their attach points should deactivate while the parent-level mapping remains in force;
- removing that higher mapping should reactivate the descendants;
- and expanding a parent into children should only be needed when the reaction truly requires finer provenance than the parent-level bundle.

That gives the solver a clean coarse-to-fine grammar. A spectator-preserved structure can remain mapped at a high level, while only the active part of the reaction needs to be opened deeper.

The hierarchy view can therefore be useful even before any real auto-solver exists. Authors can work through the mapping manually, confirm that the reaction grammar feels right, and only then layer automated proposal generation on top of a workflow that is already understandable and productive.

That sequencing is attractive because it reduces risk:

- manual hierarchy mapping can ship first;
- the same UI can later host ranked solver proposals;
- and the auto-solver can be judged against an already-usable authoring baseline rather than against a speculative interface.

For a fermion-like assembly, a first-pass hierarchy could look like:

```text
- pro/anti Noether core [anchor point]
    - inner binary with axial layer [anchor point]
        - inner binary [anchor point]
        - axial architrino [anchor point]
        - axial architrino [anchor point]
    - middle binary with axial layer [anchor point]
        - middle binary [anchor point]
        - axial architrino [anchor point]
        - axial architrino [anchor point]
    - outer binary with axial layer [anchor point]
        - outer binary [anchor point]
        - axial architrino [anchor point]
        - axial architrino [anchor point]
```

The product side would use the same nesting but with the attach point rendered before the description so the middle mapping field stays visually clean.

This seems especially well suited to PDG-style reactions because it allows:

- high-level carry-through when a whole bundle persists;
- selective opening of only the active branch of the hierarchy;
- and direct visible arrows between reactant and product attachment sites without immediately committing to full free-canvas choreography.

### Conservative mapping rules and provenance

The mapping rules themselves should be conservative and provenance-aware:

- a mapping should only be allowed when the source and target conserve the same inventory of `electrino` and `positrino` for the modeled unit being moved;
- every accepted mapping should carry provenance, even if the solver or author has to guess leaf-level architrino provenance to keep the ledger closed honestly;
- and when a reactant attach point is selected, product attach points that are not conservative with that source should gray out and deactivate rather than allowing an invalid mapping to be drawn.

This first-pass conservation rule should not assume that a binary keeps the same flavor identity or shell-slot identity through the mapping. We do not yet know that binary flavor is sticky across scenarios, and axial architrinos may not be sticky either.

So the conservative test should be inventory-based rather than label-based:

- `electrino` count must be conserved exactly per mapping;
- `positrino` count must be conserved exactly per mapping;
- and a mapping should be blocked if the source and target do not carry the same `electrino` / `positrino` ledger for the unit being mapped.

That means the solver should not treat `inner`, `middle`, `outer`, or a binary flavor label by itself as enough to declare a mapping conservative. Those descriptors may still matter for readability, provenance explanation, or later rule families, but the first-pass gate should be exact inventory conservation in the mapped packet.

The implemented ledger now follows the currently exposed attachment points rather than a static template guess:

- a binary-selector attachment point derives its live ledger from the selected binary state;
- a coarse attachment point derives its ledger from the subassembly rooted at that row;
- and a `Transmute` tile sums all incoming mapped ledgers on its left anchor and all outgoing mapped ledgers on its right anchor.

The current `Transmute` rule is:

- it may collect multiple incoming reactant mappings;
- it may emit multiple outgoing product mappings;
- its output side remains conservative only while the accumulated outgoing ledger stays within the accumulated incoming ledger;
- and the tile should remain dim until incoming and outgoing ledgers match exactly.

Those rules should not remain scattered through UI conditionals forever. The solver will likely need a centralized rule registry with rule classes that can be reused or swapped in different solving situations.

Someday that may want its own small language or API for specifying reaction rules, provenance allowances, wildcard spacetime behavior, and channel-specific constraints. That specification layer might even be exposed through a skill-like interface for authoring or evolving solver rules without hard-coding every policy directly into the UI runtime.

### Wildcard spacetime participants

The solver needs explicit wildcard participants for spacetime recruitment and return.

For the current pass, the composer already has a `Higgs cluster` assembly type available in the solver, and it may still serve as an `ST-in` or `ST-out` wildcard when that is the right coarse model.

That means:

- a reaction may recruit one or more `Higgs cluster` participants from spacetime;
- a reaction may return unused or broken material back into spacetime;
- and a proposed solution does not need to consume or produce every part of a wildcard participant symmetrically.

Separately, the implemented `Transmute` tile should be treated as a reaction-logic junction, not as a spacetime ontology claim. It is a UI object for collecting multiple conservative inputs and redistributing them to conservative outputs inside one manually authored reaction solution.

This should remain an intentionally open modeling boundary rather than a hard ontology claim. It may be that local spacetime inventory is well represented by `Higgs cluster` inputs and outputs in the first implementation. It may also be that spacetime should later be modeled as containing additional detritus, partial remnants, or other reusable substrate packets beyond one named cluster type.

So the design rule should be:

- start with `Higgs cluster` as the first explicit wildcard assembly;
- but keep the schema and UI language broad enough that later solver passes can admit richer spacetime substrate families without redesigning the whole interaction model.

### Relation to the normal composer

The solver should feed the normal composer rather than replace it.

An accepted solver result should become:

- reaction participants in the authored reaction item;
- transfer-like continuity mappings that preserve provenance;
- a first-pass stage breakdown such as `detach`, `flight`, and `reassemble`;
- and an initial visual corridor or spline layout that the normal reaction canvas can refine.

This keeps one important separation clear:

- the solver screen answers what maps to what and what spacetime contributed;
- the normal composer answers how that mapping is staged, viewed, timed, and explained.

That separation is especially attractive for PDG-style reactions because the same solved provenance can later be animated in more than one explanatory way without rerunning the bookkeeping every time.

It also simplifies the architecture of the normal composer itself. If the solver owns reactant/product bookkeeping and provenance mapping, the composer no longer needs to carry reaction-specific solving concepts throughout its main screen. It can stay focused on:

- scene layout;
- timeline staging;
- path and spline refinement;
- observer work;
- overlays;
- and playback.

In that model, the normal composer simply imports a solved reaction scene or solved reaction payload produced by the manual or automatic solver. That should remove a substantial amount of special-case composer code and keep the main canvas cleaner, because the composer does not need to know how to solve the reaction. It only needs to know how to stage and explain the solved result.

## Reaction Requirements

- The composer should support reactions as first-class authored objects, not just as animation presets.
- Transfers should already exist as first-class authored mappings even before the full reaction editor is complete, so member identity can move explicitly from one assembly to another on the shared timeline.
- A reaction should be able to involve multiple assemblies and multiple timed stages.
- Reaction authoring should support disassembly of reactants into constituent parts, transfer or handoff of those parts, and reassembly into products.
- Participants, timelines, triggers, branches, emissions, products, and handoff paths should be explicit.
- Reaction playback should support both structural changes and geometric choreography through space and time.
- Provenance should be preserved through reaction steps so authored outputs can show where components came from and where they went.

## ReactionSpec, TransferSpec, And ProvenanceSpec

### ReactionSpec and TransferSpec

Purpose:

- model exchanges, relocks, handoffs, disassembly, and branch outcomes,
- connect time, participants, and path geometry,
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

### ProvenanceSpec

Purpose:

- record causal origin and transfer history,
- survive export/import,
- support both visualization and analysis.

Possible fields include:

- source id,
- destination id,
- transfer time,
- path or corridor id,
- recruited substrate source,
- confidence or validation state.

Coverage note:

- a reaction with disassembly and reassembly is covered by `ReactionSpec`, `TransferSpec`, and `ProvenanceSpec` on the shared scene timeline.

## Reaction Examples And Scene Families

### Reaction with disassembly and reassembly

- Two or more incoming assemblies follow authored approach paths.
- At specified timeline moments, reactants disassemble into explicit constituent parts.
- Selected parts transfer across handoff paths or reaction corridors.
- Product assemblies reassemble from those parts and continue on authored outgoing paths.
- Provenance records preserve where each transferred component came from.

### PDG-style reaction and decay scenes

- Authored decay chains following known PDG reaction families.
- Multi-stage disassembly and reassembly of constituents over the shared timeline.
- Branching authored outcomes with probabilities or confidence metadata.
- Reaction libraries keyed to named channels or reusable reaction templates.

### Atomic reaction scenes

- Ionization, recombination, excitation, and de-excitation scenes.
- Photon emission and absorption sequences tied to authored atomic transitions.
- Electron capture, scattering, and exchange scenes.
- Multi-assembly atomic reactions where incoming particles perturb a bound atomic structure.
