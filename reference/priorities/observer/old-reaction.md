# Reaction App

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep Reaction focused on conservative authoring, provenance legibility, manual correction, and accepted output.
- Do not restate generic solver architecture here except where the Reaction app depends on it; prefer [solver](./old-solver.md) for solver-component detail.
- Do not let Composer-stage concerns or PDG-ingest plans expand this document beyond the Reaction app's own role.
- Keep contract specifics brief here and prefer the contract-owning document when it exists.

## Purpose

The Reaction app is the conservative reaction-authoring surface.

Its job is to build reactant-to-product scenarios that preserve provenance and make dissociate, associate, handoff, and reassembly structure legible.

It owns:

- manual reaction authoring and correction;
- the visible provenance workflow around participants, operators, and mappings;
- acceptance of conservative reaction structure before handoff downstream;
- and the Reaction-side UI surface in which the solver can be inspected, corrected, and validated.

It does not own:

- Composer staging, observer work, or final explanatory overlays;
- PDG channel ingest as its own component;
- or live cross-app runtime behavior with Composer.

## Current State

- The repository already has a dedicated `Reaction Designer` scene and a first-class standalone Reaction app runtime built around the reaction canvas.
- The current deployment already has a dedicated Reaction entrypoint, though some launcher-era shared-root cleanup still remains.
- The live manual workflow is lane-based, with reactants on the left, products on the right, and operator lanes between them.
- The current add flow visibly supports reactants, products, polarity transforms, dissociate, associate, `Pass Thru`, and center-assembly additions.
- Reaction now enforces a strict visible five-lane grammar: lane 1 to lane 2 to lane 3 to lane 4 to lane 5, with no same-lane or skip-lane mappings on the accepted path.
- The operator registry now includes `Dissociate`, `Associate`, and `Pass Thru`, and the grammar panel reflects the adjacent-lane-only model.
- Mappings are authored manually by choosing a source anchor and then a valid destination anchor.
- Conservation and validity checks now run through dedicated mapping-rule runtimes instead of being scattered through UI conditionals.
- Composite participants, binary selection, anchor state, participant mutation, participant rendering, and binary glyph rendering already live in dedicated runtimes with local automated tests.
- The canonical implementation for Reaction helper, canvas, solve, structure, export, and layout runtimes now lives under `src/apps/reaction/`.
- Reaction now ships one external-only solve path, and the browser-side solve bridge resolves from the origin root so the standalone app still reaches `/api/reaction/solve` when served from a subpath such as `/architrino/reaction.html`.
- Mapping authoring and route rendering now live in focused canvas runtimes so `ReactionCanvasUiRuntime.js` stays a wiring layer instead of reclaiming provenance, corridor, and connector ownership.
- Reaction now exposes an explicit accept / commit state in the standalone app and exports accepted `reaction-flow/v1` handoff JSON only after the current canvas has been reviewed.
- The standalone Reaction shell now separates transient action status from the persistent authoring hint and includes a dedicated visible grammar panel for corridor steps, operator-lane meaning, and live corridor/operator state counts.
- The standalone Reaction app now has a request-backed reaction library manifest, with the default entry solved on startup only when no authored canvas state exists to preserve.
- The live library no longer ships pre-built solved JSON artifacts; selection now resolves a canonical `solver-request/v1` fixture and asks the solver for an in-memory result.
- Accepted contract examples still carry explicit five-lane placement and `Pass Thru` carry-through steps rather than forward-skip shortcuts.

## Design

### Role In The Pipeline

Reaction sits between upstream setup and downstream Composer authoring.

Its role is to:

- make provenance explicit;
- close conservation honestly;
- let the author inspect and correct the reaction structure;
- and produce an accepted result that downstream tools can stage and explain.

Reaction should feed Composer rather than replace it.

### Author-Facing Terminology

The authored language should prefer `reaction` over `decay`.

Within that language:

- `disassembly` means opening or separating source-side structure so constituent parts become explicitly available;
- `transfer` means the provenance claim that a destination-side unit is the same authored identity as a source-side unit;
- `handoff` means the stage at which that transferred identity stops belonging to the source-side structure and becomes committed to the destination-side structure or corridor;
- `reassembly` means the product-side locking or rebuilding step in which transferred and recruited constituents settle into a new assembled structure.

These terms should remain distinct rather than collapsing into loose synonyms.

### Manual Workflow And Surface Grammar

The near-term baseline should remain the current left / center / right hierarchy reaction-canvas surface rather than jumping immediately to full free placement.

Current intended interaction model:

- authors choose or place reactants and products;
- the app shows explicit attachment points on hierarchy rows;
- mappings are authored from a valid source anchor to a valid destination anchor;
- a mapping is a visible authored corridor rather than just an annotation, and every forward corridor step advances exactly one lane;
- and center assemblies plus operator lanes can act as conservative junctions where the reaction requires them.

The live UI should continue becoming more self-explanatory through:

- clearer operator and assembly state where conservation or commitment matters;
- clearer balanced versus unbalanced center tiles;
- stronger visual distinction among source, target, mapped, and ineligible anchors;
- better path tracing through hover, emphasis, or dimming of unrelated paths;
- and clearer blank-space and object-local authoring grammar.

### Provenance And Mapping Rules

The mapping model should stay conservative and provenance-aware.

Core rules:

- one mapping connects one source to one destination at first pass;
- mappings should be allowed only when source and target conserve the same `electrino` and `positrino` inventory for the modeled unit;
- accepted mappings should carry provenance even when the app or solver must infer leaf-level detail to keep the ledger honest;
- accepted mappings may only connect adjacent lanes in the visible five-lane surface grammar;
- invalid targets should deactivate rather than allowing invalid mappings to be drawn;
- and operator or assembly behavior should remain conservative under the same mapping and inventory rules as the rest of the surface.

The authored corridor is not just a diagram line. It is the visible claim of continuity through the reaction interval.

### Composite Depiction And Special Participants

Composite depiction should remain legible and reversible.

The intended surface grammar is:

- preserve seam-side composite cards;
- keep split behavior reversible through re-add rather than hidden state;
- keep internal composite join lines visually subordinate to main mapping lines;
- and keep any non-primary transfer affordances visually subordinate to the dedicated Reaction mapping workflow.

The app also needs a legible way to represent special coarse participants such as spacetime-like recruitment and return, but those should remain explicit app semantics rather than getting buried as implicit solver behavior.

### Solver Screen Within Reaction

Reaction may host a dedicated solver screen or mode because provenance closure is one of its core jobs.

That screen should be understood as:

- a Reaction-side review and correction surface;
- specialized for reaction solving rather than final scene staging;
- allowed to share contract vocabulary and visual language with Composer, but not Composer runtime code;
- and downstream of future PDG seeds or proposals when those exist.

The solver component itself is documented in [solver](./old-solver.md). The solver-to-Reaction payload format is owned in [solver](./old-solver.md#result-format). This document owns how that capability appears inside the Reaction app.

## Interfaces

### Inputs

- manually authored or selected reactants and products;
- participant templates and operator choices exposed by the Reaction app;
- current authored mappings and dissociation state;
- structured solver results in the format owned by [solver](./old-solver.md#result-format);
- and future normalized seeds or proposals from [pdgfeed](./pdgfeed.md).

### Outputs

- accepted reaction participants with stable ids;
- operator placements and roles;
- conservative source-to-destination mappings with provenance;
- enough staged timing to distinguish disassembly, transfer, handoff, and reassembly;
- and accepted Reaction-side output that can feed the versioned handoff/export path downstream.

### Upstream And Downstream Boundaries

Reaction should:

- accept manual setup and future normalized upstream seeds;
- own inspection, correction, validation, and acceptance;
- and hand accepted output downstream through explicit versioned data.

Reaction should not:

- stage the final authored animation;
- rely on shared live UI state with Composer;
- or treat Composer as part of its runtime.

### Neighboring Components

- [solver](./old-solver.md) owns the Reaction-side solve engine and algorithmic constraints.
- [pdgfeed](./pdgfeed.md) owns future PDG-facing ingest, normalization, and proposal-review work upstream of Reaction acceptance.
- [composer](./composer.md) is the downstream staging and explanation surface.
- [app-architecture](app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

The canonical registry work from [solver](./old-solver.md) is now in place. These are the next Reaction-side follow-ups so the app fully consumes that shared object model instead of keeping local repair logic and incomplete connector/document semantics.

### 1. Replace Reaction-Side Object Heuristics With Canonical Registry Reads

Status: `active`

Current:

- Reaction still derives too much object behavior from scattered label, structure, import, and rendering logic;
- charged leptons and neutrinos can still collapse through local heuristics rather than through one canonical object definition;
- and properties such as outer-shell depiction, core family, allowed lanes, and connector policy are not yet owned by one shared source of truth.

Objective:

- make Reaction read object identity, structure characteristics, lane eligibility, and connector policy from the canonical registry added in [solver](./old-solver.md);
- remove local object-type guesses from the library import path, render path, and test helpers;
- and make surface behavior for objects such as muons, muon neutrinos, Noether cores, Noether pairs, and Unbound Architrinos come directly from the registry rather than from app-specific fallback logic.

This should include, at minimum, registry-driven behavior for:

- object/template identity;
- core form and family characteristics, including the `h1` / `h2` / `h3`-style basis where applicable;
- whether the object is a particle, core, composite assembly, operator-adjacent special participant, or other screenable type;
- which lanes or placement classes the object may occupy;
- whether it has an internal connector, an output connector, both, or neither in each allowed lane;
- and which visual shell or outer structure belongs to that object type.

Done when:

- Reaction no longer decides object structure or connector behavior by object-name heuristics;
- lane legality and connector availability are derived from the shared registry;
- and the render surface shows the correct object shell and family characteristics because the registry says so, not because Reaction guessed correctly.

### 2. Make Reaction Treat `solver-result/v1` As A Full Render Specification

Status: `active`

Current:

- the intended contract already says the solver result should be a render-specification boundary;
- but Reaction still has code paths that can repair, infer, or smooth over missing structure when the solve payload is not explicit enough;
- and that makes it too easy to accept partial solves that only happen to draw something plausible.

Objective:

- make the Reaction app a renderer and reviewer of solver-owned solved JSON rather than a place that reconstructs omitted placement, staging, or connectivity;
- require `solver-result/v1` and accepted `reaction-flow/v1` handoff docs to explicitly carry the full participant set, operator set, dissociation state, placement, connector roles, and connectivity needed to render the image;
- and remove any remaining adapter or import shims that invent missing intermediate objects, lane placements, or route attachments.

This should mean:

- if the solver expects a Noether Pair or Noether Quad recruitment assembly, the solved JSON must place it in the reactant or product column explicitly;
- if the solver expects Unbound Architrinos, the solved JSON must place them in the middle lane explicitly;
- if a composite is opened, the solved JSON must explicitly mark its dissociated-composite state;
- if a participant or operator exposes only a right/output connector, the solved JSON must never route it backward into an earlier lane or column;
- and if an operator or participant appears on screen, the solved JSON must already specify how it is connected.

If that same solved participant is later projected into Xyzzy, the Xyzzy surface may render it as the four-tile `Unbound | Electrinos | Positrinos | Architrinos` group without changing the underlying participant identity.

Done when:

- Reaction can load a solved document and render it without inferring missing stages;
- any solve that omits required staging or connectivity fails validation instead of being patched in-app;
- any solved document that routes from a later lane back into an earlier one is rejected as incomplete rather than treated as a usable library solve result;
- and Reaction library entries are solver requests whose returned solve result is rendered directly rather than being repaired into a separate checked-in solved artifact.

### 3. Add First-Class Center-Lane Connector Semantics To The Reaction Runtime

Status: `active`

Current:

- center-lane assemblies and special participants still do not have one first-class connector model spanning anchor creation, route rendering, import/export, and accessibility metadata;
- there is still too much chance of using the wrong side of a center object as though it were a reactant or product connector;
- and that makes it possible to draw routes from an input-side connector when the rendered object is supposed to emit from its right-side output connector.

Objective:

- introduce first-class connector roles for center-lane participants and assemblies so input-side versus output-side attachment is explicit everywhere in Reaction;
- make route geometry, anchor rendering, hit targets, and aria labeling read those connector roles directly;
- and ensure center-lane participants never rely on reactant/product fallback semantics.

This should cover at least:

- center-lane assemblies whose internal/input connector is on the left and whose output connector is on the right;
- special middle-lane participants such as Unbound Architrinos that must accept routed input on the correct side and emit through the correct side when their ledger is forwarded;
- and operator-to-center plus center-to-operator attachments that should be unambiguous at render time.

Done when:

- the render runtime can tell, from the object definition and placement alone, which connector side is valid for each mapping endpoint;
- routes no longer appear to leave a center object from the wrong side;
- and connector semantics are enforced uniformly in runtime code, import/export, and tests.

### 4. Make Dissociation, Recruitment, And Composite State Fully Explicit In Reaction Documents

Status: `active`

Current:

- dissociation and recruitment staging can still be under-specified or only partially enforced once the solved document reaches Reaction;
- composite-open state is not yet treated as a fully validated part of the Reaction-side document contract;
- and the intended lane grammar for assemblies versus middle-lane special participants still needs stricter enforcement.

Objective:

- make the accepted Reaction-side document carry enough explicit state to render composite opening, per-core dissociation, recruited middle-lane pools, and downstream association without interpretation;
- enforce the lane grammar that spacetime-style assemblies such as Noether Pair and Noether Quad belong only in the reactant or product columns;
- enforce the lane grammar that Unbound Architrinos belong only in the middle lane;
- and ensure that when a composite is drawn as opened, that opened state and its downstream per-core dissociation stages are explicit in the document rather than implied by the viewer.

For the current weak-reaction cases, this should specifically mean:

- a recruited Noether Pair stays in column 1 or column 5, never in the middle lanes;
- the Noether Pair can dissociate at the composite level to expose pro and anti Noether cores;
- each exposed Noether core can then route to its own dissociate operator when the solve requires that stage;
- the resulting Unbound Architrinos feed the middle-lane Unbound Architrinos object and update its ledger there;
- and the resulting middle-lane cores or other surviving intermediates route onward to the appropriate associate operators.

Done when:

- the accepted Reaction document says exactly which composites are opened, which dissociate stages occur, and which recruited middle-lane pools receive the resulting flow;
- the lane grammar for assemblies and Unbound Architrinos is validated, not merely preferred;
- and the rendered reaction image is a direct consequence of the document rather than of viewer-side inference.

### 5. Add Durable Reaction Regressions For Reaction Library Surface Behavior

Status: `active`

Current:

- several cobalt-session failures were UI-surface failures rather than pure solver failures;
- reaction-library selection, labeling, connector-side rendering, and composite-state rendering need durable regression coverage;
- and the Reaction library surface should make it obvious which request-backed entries are available without relying on a fragile native dropdown alone.

Objective:

- add regression coverage for the Reaction library surface, solve-on-select loading path, and returned solved-document rendering behavior;
- verify that all library entries appear in the visible controls and trigger the correct solver request;
- verify that registry-defined objects such as muons and muon neutrinos preserve the correct displayed identity and structure on load;
- and verify that dissociated composites, center-lane connector roles, and solver-owned dissociate stages all remain visible after import/export and page reload.

Done when:

- the Reaction library UI consistently exposes the full available set of request-backed reactions;
- selecting a library reaction preserves the correct object identity, structure, connector orientation, and composite state in the returned solve result;
- and future regressions of the cobalt-session failures are caught by focused Reaction tests rather than by manual screenshot review.
