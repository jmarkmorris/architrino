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

- The repository already has a dedicated `Reaction Designer` scene and a first-class reaction-solver runtime.
- The current deployment already has a dedicated Reaction entrypoint, though some launcher-era shared-root cleanup still remains.
- The live manual workflow is lane-based, with reactants on the left, products on the right, and operator lanes between them.
- The current add flow visibly supports reactants, products, polarity transforms, dissociate, associate, and center-assembly additions.
- The operator registry includes dissociate and associate handling, but the full user-facing grammar still needs to read as one coherent system.
- Mappings are authored manually by choosing a source anchor and then a valid destination anchor.
- Conservation and validity checks now run through dedicated mapping-rule runtimes instead of being scattered through UI conditionals.
- Composite participants, binary selection, anchor state, participant mutation, participant rendering, and binary glyph rendering already live in dedicated runtimes with local automated tests.
- The canonical implementation for Reaction helper, solver, structure, and layout runtimes now lives under `src/apps/reaction/`.
- The Reaction app is already useful for manual provenance work, but it still lacks a production-hardened accept-and-export path downstream.

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

The near-term baseline should remain the current left / center / right hierarchy solver surface rather than jumping immediately to full free placement.

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
- [app-architecture](./app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

### 1. Replace Free-Architrino Tile Group With One Aggregate Ledger Tile

Status: `active`

Goal:

- stop implying that center-lane `Free Architrinos` are attached to specific `I` / `M` / `O` binaries and present them instead as one aggregate bucket tile with visible corner counts.

Why it matters:

- the current grouped binary-style depiction overcommits the app to a solver story we do not actually know, while the solving model only needs available free-architrino ledger content rather than fixed per-binary identity.

Next steps:

- replace the current grouped `Free Architrinos` center tile with a single tile presentation;
- show the available electrino and positrino counts directly on that tile, such as corner-count treatment rather than binary-slot assignment;
- keep the solver-facing meaning as an aggregate usable ledger rather than as three authored binary-coupled subunits;
- and preserve clear balanced versus unbalanced state in the new tile grammar.

### 2. Finish Manual Workflow Legibility

Status: `next`

Goal:

- make conservative mapping, operator use, and state legibility reliable in the live Reaction UI.

Why it matters:

- Reaction is the upstream authoring truth for provenance and conservation, so the manual workflow must be trustworthy and understandable.

Next steps:

- make operator and center-assembly state self-explanatory;
- improve anchor-role legibility and path tracing;
- and keep learning the app possible from the visible surface grammar.

### 3. Unify Dissociate And Associate As One Grammar

Status: `active`

Goal:

- make the operator set read as one coherent reaction language rather than partially split UI behaviors.

Why it matters:

- the app is strongest when authors can understand disassembly, handoff, and reassembly as one workflow instead of unrelated controls.

Next steps:

- align menus, labels, and guidance across the operator set;
- keep conservation semantics centralized;
- and remove leftover wording or behavior that makes the grammar feel fragmented.

### 4. Add Explicit Accept And Downstream Export

Status: `pending`

Goal:

- add a clear accept / commit path that turns accepted Reaction work into stable downstream output.

Why it matters:

- Reaction is already useful for manual provenance work, but it still needs a durable way to hand accepted results downstream.

Next steps:

- define the accepted-output path in a versioned way;
- make accepted result ownership explicit inside Reaction;
- and keep the downstream boundary data-first rather than runtime-coupled.

### 5. Keep Conservation And Layout Rules Centralized

Status: `pending`

Goal:

- keep lane geometry, anchor semantics, and conservation rules as explicit Reaction-owned sources of truth.

Why it matters:

- the app becomes harder to trust and maintain when those rules leak into CSS, DOM heuristics, or ad hoc menu code.

Next steps:

- keep rule logic in dedicated Reaction-owned runtimes;
- keep lane geometry derived from the explicit layout model;
- and keep mapping semantics out of incidental render behavior.

### 6. Keep Reaction As The Primary Provenance Authoring Surface

Status: `pending`

Goal:

- keep Reaction, not downstream or launcher-era surfaces, as the primary place where conservative provenance is authored and reviewed.

Why it matters:

- the clearer this ownership becomes, the easier it is to keep upstream and downstream boundaries honest without provenance work drifting back into older surfaces.

Next steps:

- keep Reaction-side review and correction explicit;
- keep provenance authoring out of downstream Composer tooling;
- and continue reducing launcher-era coupling as the standalone app boundary hardens.

### 6. Harden Reaction Export And Contract Ownership

Status: `pending`

Goal:

- keep Reaction clearly responsible for the export side of the handoff contract.

Why it matters:

- Reaction is the upstream authoring and acceptance surface, so the contract has to track current solver and app output honestly.

Next steps:

- keep `reaction-flow/v1` as the only intended bridge;
- refresh the schema against current solver output;
- add or keep Reaction export tests around that contract;
- and keep the Reaction side of the boundary explicit before deeper downstream integration.
