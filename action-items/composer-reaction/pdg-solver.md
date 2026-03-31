# PDG Solver

## Purpose

The PDG solver is the planned ingest-and-proposal app for the reaction pipeline.

Its job is to:

1. receive manually entered reactant/product entries or read PDG api reaction/channel data and related metadata;
2. normalize that data into a stable app-side schema;
3. build a candidate provenance plan from that normalized channel;
4. project the accepted plan into the reaction app;
5. return the resulting reaction flow JSON to the composer for animation.

This is the bridge between published reaction data and the internal reaction-authoring model. The selected implementation approach is the `Concrete Solver Architecture` described below.

## Current State

- There is no dedicated PDG solver runtime in `src/runtime/` yet.
- There is no dedicated PDG solver scene under `content/scenes/archie/` yet.
- The current repo state is planning and reference material:
  - this note;
  - and `content/markdown/aaa/reactions/pdg-api.md`, which records the intended official PDG data path.
- The current intended data source is the PDG Python package `pdg` with its local SQLite workflow, not an ad hoc scrape.
- No fetch pipeline, normalization layer, proposal engine, reaction-app projection layer, or composer handoff is implemented yet.

So the PDG solver is currently a planned app boundary, not a running app.

## Immediate Direction

We are using the `Concrete Solver Architecture` below as the actual implementation approach.

That means the solver work will proceed as:

1. ingest and normalize PDG channels into an abstract solve state;
2. generate candidate provenance plans on that state;
3. score those plans with conservation- and provenance-aware costs;
4. project the selected plan into the existing reaction app;
5. and only then return reaction flow JSON to the composer.

So we are not treating the solver as a loose sequence of special-case canvas passes. The planner owns the reasoning; the reaction app owns rendering and validation.

## Architectural Stance

The motivating premise remains that published channel data is not enough by itself. The missing layer is sub-component provenance: where structure is preserved, where it is broken, where it is reassociated, and where substrate recruitment is genuinely required. The solver therefore needs to reason over constituent provenance rather than treat the reaction app as a manual diagrammer for already-solved channels.

## Concrete Solver Architecture

The solver should use a small proposal engine with four layers:

1. ingest and normalize a channel into a stable abstract reaction state;
2. generate one or more candidate provenance plans on that abstract state;
3. score those plans for conservation, provenance reuse, operator count, and residue;
4. project the accepted plan into the existing reaction-app participants, operators, and mappings.

So the reaction UI remains the renderer and validator of a candidate solve, not the place where the solver's core reasoning lives.

### Core Design Principle

Treat `associate`, `dissociate`, `W-`, `W+`, and `Z` as reusable operation types, not as one-off pass-specific hacks.

That lets:

- direct neutron-to-proton quark carry-through;
- Higgs-cluster core pairing into photons;
- neutrino-oriented dissociate/reassociate cases;
- and weak-boson-mediated electron or positron formation

all be represented as different candidate constructions in one planning model.

### Solver State

The abstract solve state should contain:

- `channel`
  - normalized reactants;
  - normalized products;
  - energy or threshold context;
  - metadata from PDG.
- `available_fragments`
  - the currently usable constituent fragments, subassemblies, or whole assemblies;
  - each with provenance tags back to reactants or recruited substrate.
- `claimed_fragments`
  - fragments already committed to a candidate construction.
- `unsatisfied_products`
  - products not yet explained by the current plan.
- `operators`
  - candidate or committed operator nodes such as `associate`, `dissociate`, `w_minus_boson`, `w_plus_boson`, `z_boson`.
- `mappings`
  - abstract source-to-target provenance edges, independent of UI placement.
- `ledger_state`
  - electrino and positrino closure;
  - any other coarse closure metrics used in the reaction app.
- `residue`
  - unmatched fragments, unresolved waste, or substrate debt.
- `explanation`
  - a structured list of why each operation was chosen.

### Operation Types

The first implementation should define a small operation registry rather than one giant solver function.

Initial operation families:

- `map_direct`
  - map an existing reactant fragment or subassembly directly to a product-compatible target.
- `dissociate`
  - split a composite participant into child fragments while preserving provenance.
- `associate`
  - combine two compatible fragments into a product or intermediate assembly.
- `emit_w_minus`
  - create or route a `W-` intermediate when it is the cheapest valid way to satisfy an electron-like branch.
- `emit_w_plus`
  - create or route a `W+` intermediate when it is the cheapest valid way to satisfy a positron-like branch.
- `emit_z`
  - create or route a `Z` intermediate when it is needed for neutrino or photon-related branches.
- `recruit_substrate`
  - explicitly recruit from the spacetime bath when a channel cannot be honestly closed from visible reactants alone.
- `dump_residue`
  - explicitly mark unresolved leftover structure or waste instead of hiding it.

Each operation should declare:

- required inputs;
- produced outputs;
- provenance effect;
- ledger effect;
- cost;
- and a human-readable explanation string.

### Solve Strategy

The first production solver should use a bounded product-driven planner rather than a rigid forward-only pass list.

Recommended sequence:

1. `Peel obvious provenance`
   - lock direct subtree or fragment matches first;
   - prioritize cases where reactant structure can persist into a product with minimal change.
2. `Satisfy remaining products`
   - for each unmatched product, generate a short ranked list of candidate construction plans;
   - for example direct reuse, associate from two fragments, dissociate then reassociate, or weak-boson-mediated construction.
3. `Close ledger`
   - once product structure is mostly explained, add or validate operator outputs so electrino and positrino closure is explicit;
   - if exact closure fails, keep the solve honest and report residue or substrate recruitment.
4. `Project to reaction UI`
   - convert the chosen abstract plan into participants, operators, and mappings that the current reaction app can render and validate.

This sequence keeps the solver centered on product satisfaction and conservation rather than on UI lane choreography.

### Why This Is Better Than Literal Passes

A strict pass list such as:

1. direct mapping;
2. associate;
3. dissociate then associate;
4. weak-boson cases;
5. ledger cleanup

is useful as a first intuition, but it should become a ranking heuristic rather than the literal architecture.

Otherwise:

- an early greedy choice can block a better later solve;
- neutrino and photon cases become brittle special cases;
- and the solver becomes difficult to extend without rewriting the whole pass order.

In the recommended design, those same ideas survive as ranked candidate builders:

- direct provenance reuse remains the cheapest move;
- associate-based reconstruction remains an operation family;
- dissociate-plus-reassociate remains another operation family;
- and weak-boson motifs remain explicit constructors for electron, positron, photon, or neutrino-related branches.

### Candidate Scoring

Each candidate plan should be scored with a transparent cost model.

Lower cost should favor:

- exact structural provenance reuse;
- fewer operators;
- fewer dissociation steps;
- fewer recruited substrate fragments;
- exact electrino and positrino closure;
- and less unresolved residue.

Higher cost should apply to:

- avoidable weak-boson insertion;
- unnecessary structure breakage;
- unexplained leftovers;
- or plans that only close by excessive substrate recruitment.

The scoring model should stay simple enough that the solver can explain itself in plain language.

### Relationship To The Existing Reaction App

The current reaction app already has strong seams that the solver should reuse:

- structure classification and compatibility checks already live in shared runtimes;
- mapping validity and operator-ledger checks already exist;
- the reaction UI already knows how to render participants, operators, mappings, and unresolved red paths.

So the PDG solver should not duplicate those rules.

Instead it should:

- generate candidate participants and abstract mappings;
- materialize them into the reaction-app schema;
- let the existing mapping and ledger runtimes score or reject the result;
- and then return either a solved flow or an honest partially solved proposal with unresolved residue.

### First Concrete Product Constructors

The first candidate-construction library should cover a small, explicit set of motifs:

- `direct carry-through`
  - for cases like neutron to proton constituent reuse.
- `core-pair association`
  - for cases like opposite-polarity core pairing into a photon.
- `dissociate then polarity-preserving reassociation`
  - for cases where one composite fragment is retained and another is reopened to satisfy neutrino-style products.
- `weak-electron branch`
  - if an unmatched product is an electron, try a `W-`-mediated branch before falling back to residue.
- `weak-positron branch`
  - if an unmatched product is a positron, try a `W+`-mediated branch before falling back to residue.
- `z-mediated neutral branch`
  - use `Z` as a candidate constructor for photon or neutrino-related outcomes where the ledger and structure rules allow it.

Those should be implemented as candidate generators, not one-off global passes.

## Implementation Plan

### Phase 1: Abstract Solve State And Operation Registry

- create a dedicated PDG solver runtime boundary under `src/runtime/`;
- define the normalized solver input schema;
- define the abstract solve-state shape;
- and implement an operation registry with cost and explanation metadata.

Deliverable:

- a solver core that can run without the DOM or reaction UI.

### Phase 2: Channel Normalization

- ingest PDG channel data from the official `pdg` package path;
- normalize reactants, products, source references, and context into a stable schema;
- and translate that schema into initial abstract fragments and target products.

Deliverable:

- reproducible normalized channel payloads that can be snapshot-tested.

### Phase 3: Proposal Engine

- implement direct provenance matching first;
- add product-driven candidate generation for unmatched products;
- add bounded search or beam search over a small number of alternatives;
- and attach explanations to each candidate decision.

Deliverable:

- ranked candidate plans over abstract state, independent of rendering.

### Phase 4: Reaction-App Projection

- project the best candidate plan into reaction-app participants, operators, and mappings;
- run that projection through the existing mapping-rule and ledger validators;
- and return a solved flow, partially solved flow, or unresolved residue summary.

Deliverable:

- reaction flow JSON that the current reaction app can already inspect and render.

### Phase 5: Initial Channel Coverage

Prioritize:

1. neutron beta decay and close relatives;
2. photon and neutral-current toy channels that exercise `associate` and `Z`;
3. electron and positron branches that require `W-` or `W+`;
4. Higgs-cluster wildcard or substrate-assisted closure cases.

Deliverable:

- a narrow but honest channel set with explicit provenance output and regression tests.

### Phase 6: UI Integration And Review Tools

- add a dedicated PDG solver scene once the core planner works;
- show best candidate plus a small number of alternatives;
- allow pin, forbid, and rerun-on-remainder controls later;
- and keep final acceptance or editing in the reaction app and composer.

Deliverable:

- proposal review rather than opaque black-box autosolve.

## Suggested File Boundaries

To keep the codebase modular, the first solver implementation should aim for boundaries like:

- `PdgChannelNormalizeRuntime.js`
- `PdgSolveStateRuntime.js`
- `PdgSolveOperationRegistryRuntime.js`
- `PdgSolveCandidateRuntime.js`
- `PdgSolveScoringRuntime.js`
- `PdgReactionProjectionRuntime.js`

The existing reaction mapping, structure, and ledger runtimes should remain shared dependencies rather than being copied into PDG-specific files.

## Related Action Items

- [composer-reaction](./composer-reaction.md)
- [reaction](./reaction.md)
- [composer](./composer.md)

## Related AAA Notes

- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
- [validation-protocols](../../content/markdown/aaa/validation/validation-protocols.md)
