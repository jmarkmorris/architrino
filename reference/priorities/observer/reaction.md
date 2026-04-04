# Reaction App

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep Reaction focused on conservative authoring, provenance legibility, manual correction, and accepted output.
- Do not restate generic solver architecture here except where the Reaction app depends on it; prefer [solver](./solver.md) for solver-component detail.
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
- The current add flow visibly supports reactants, products, polarity transforms, dissociate, associate, and center-assembly additions.
- The operator registry includes dissociate and associate handling, but the full user-facing grammar still needs to read as one coherent system.
- Mappings are authored manually by choosing a source anchor and then a valid destination anchor.
- Conservation and validity checks now run through dedicated mapping-rule runtimes instead of being scattered through UI conditionals.
- Composite participants, binary selection, anchor state, participant mutation, participant rendering, and binary glyph rendering already live in dedicated runtimes with local automated tests.
- The canonical implementation for Reaction helper, canvas, solve, structure, export, and layout runtimes now lives under `src/apps/reaction/`.
- Reaction now exposes an explicit accept / commit state in the standalone app and exports accepted `reaction-flow/v1` handoff JSON only after the current canvas has been reviewed.
- The standalone Reaction shell now separates transient action status from the persistent authoring hint and includes a dedicated visible grammar panel for corridor steps, operator-lane meaning, and live corridor/operator state counts.
- The standalone Reaction app now has a first built-in solved-reaction library seed, with free neutron beta decay loading by default when startup finds no authored canvas state to preserve.

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
- a mapping is a visible authored corridor rather than just an annotation;
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

The solver component itself is documented in [solver](./solver.md). The solver-to-Reaction payload format is owned in [solver](./solver.md#result-format). This document owns how that capability appears inside the Reaction app.

## Interfaces

### Inputs

- manually authored or selected reactants and products;
- participant templates and operator choices exposed by the Reaction app;
- current authored mappings and dissociation state;
- structured solver results in the format owned by [solver](./solver.md#result-format);
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

- [solver](./solver.md) owns the Reaction-side solve engine and algorithmic constraints.
- [pdgfeed](./pdgfeed.md) owns future PDG-facing ingest, normalization, and proposal-review work upstream of Reaction acceptance.
- [composer](./composer.md) is the downstream staging and explanation surface.
- [app-architecture](app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

### 1. Finish Manual Workflow Legibility And Operator Grammar

Status: `active`

Current:

- the lane-based canvas, mapping rules, add picker, and center assembly picker are live;
- the standalone shell now keeps corridor grammar, operator-lane meaning, and live surface-state counts visible without reusing the transient status line;
- but the manual workflow still depends on a large `ReactionCanvasUiRuntime.js` surface, and path emphasis plus deeper object-local legibility still need more focused extraction.

Objective:

- make provenance, operator use, and corridor state understandable from the visible surface without side knowledge.

### 2. Complete The Solver Cut-Over And Remove The In-Process Fallback

Status: `pending`

Current:

- the solve contract already prefers the external solver when available;
- `ReactionSolverContractRuntime.js` still falls back to the legacy in-process path.

Objective:

- finish the flash cut-over so Reaction ships one solver path, one adapter surface, and one test story.

### 3. Keep Layout, Mapping Rules, And Provenance Ownership Centralized

Status: `pending`

Current:

- lane geometry and mapping rules already live in dedicated runtimes;
- large UI surfaces can still re-accumulate those semantics if new work lands in the wrong place.

Objective:

- keep Reaction as the single provenance-authoring surface with one source of truth for geometry, anchors, and conservation.
