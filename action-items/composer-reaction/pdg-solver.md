# PDG Solver

## Purpose

The PDG solver is the planned ingest-and-seeding app for the reaction pipeline.

Its job is to:

1. read PDG reaction/channel data and related metadata;
2. normalize that data into a stable app-side schema;
3. submit the normalized channel into the reaction app;
4. let the reaction app resolve a conservative provenance-preserving flow;
5. return the resulting reaction flow JSON to the composer for animation.

This is the bridge between published reaction data and the internal reaction-authoring model.

## Current State

- There is no dedicated PDG solver runtime in `src/runtime/` yet.
- There is no dedicated PDG solver scene under `content/scenes/archie/` yet.
- The current repo state is planning and reference material:
  - this note;
  - the earlier architecture brainstorm;
  - and `content/markdown/aaa/reactions/pdg-api.md`, which records the intended official PDG data path.
- The current intended data source is the PDG Python package `pdg` with its local SQLite workflow, not an ad hoc scrape.
- No fetch pipeline, normalization layer, reaction-app bridge, or composer handoff is implemented yet.

So the PDG solver is currently a planned app boundary, not a running app.

## Current Priorities

1. Create the dedicated PDG solver app surface and runtime boundary.
2. Implement PDG ingest using the official `pdg` package and a pinned PDG database edition.
3. Normalize channel data into a stable schema that includes reactants, products, energy, branching or weight metadata, and source references.
4. Feed that normalized schema into the reaction app so it can generate conservative reaction flow JSON rather than leaving the composer to interpret raw PDG channels.
5. Return solved reaction flow data plus first-pass observer hints to the composer.

## Follow-On After The Manual Baseline Is Solid

Once the manual reaction workflow is genuinely stable, the PDG solver can expand into:

- ranked candidate proposals;
- pin, forbid, and rerun-on-remainder controls;
- provenance summaries and diagram exports;
- external API use where it sharpens solving rather than distracting from the manual baseline;
- possible MadGraph-assisted channel work;
- and scene-builder or API-mode handoff once the stored reaction payload is stable.

## APE Architectural Stance

The older brainstorming name for this layer was the **Architrino Provenance Engine (APE)**.

Its motivating premise remains useful:

- current PDG tables act like chemical equations, but they treat particles as irreducible distinct entities;
- the missing layer is sub-component provenance;
- if the solver tracks where every architrino comes from and goes to, high-energy physics becomes a kind of geometric chemistry;
- and the Noether Sea stops being treated as "nothing" and starts being treated as a real medium or reactant reservoir.

## Core Channels And Closure Checks

This design should follow a dominant-channel inclusion rule:

- include channels with at least about 1% contribution in the target regime;
- where PDG branching ratios are available, use `BR > 1%`;
- where they are not, use contribution to modeled event yield.

Initial high-priority solver channels:

- dominant electroweak reactions and scatterings;
- dominant electromagnetic radiation channels in plasma or beam contexts;
- and dominant hadronic channels used to close event-level conservation and provenance in reconstruction workflows.

Observer-level closure checks should remain explicit:

- threshold/rate closure should recover standard PDG/QFT thresholds and leading rates for implemented dominant channels;
- conservation closure should enforce charge, momentum, and energy closure at each event, with explicit provenance accounting;
- and any substrate-level parameterization must reduce to standard observer-level predictions in validated regimes.

## AAA Assembly Interpretation By Channel

- channel events are interpreted as substrate reconfiguration with provenance-preserving relocking of existing architrinos, not ex nihilo creation;
- the intermediate soup state is an operational bookkeeping layer for temporary component pools under conservation constraints;
- and solver output must provide component-level provenance from input state plus local substrate recruitment where required by channel energetics.

## Core Data Structure: The Stack

In the Standard Model, a particle is a set of quantum numbers. In this solver architecture, a particle is a hierarchical graph.

Particle object:

- core tri-binary:
  - inner binary;
  - middle binary;
  - outer binary.
- axial layer:
  - the specific architrinos attached to the poles.
- state:
  - velocity;
  - orientation;
  - phase.

Hidden reactant: spacetime medium

- the solver should assume the reaction happens in a bath of spacetime assemblies;
- it should be able to pull spacetime assemblies into the reaction to provide mass or structure;
- and it should also be able to dump broken binaries back into that bath.

## Solver Logic Flow

The solver should not jump directly from reactants to products. It should model the transitional bookkeeping in stages.

### Phase 1: Disruption

- load the reactants;
- check interaction energy;
- low energy means mostly axial stripping or exchange;
- medium energy means outer or middle binary disruption;
- high collider-like energy means deeper core disruption.

### Phase 2: Intermediate Soup

- create a temporary list of free components;
- include recruited spacetime assemblies when needed to balance mass or energy;
- calculate the net charge and net momentum of the soup.

### Phase 3: Reassembly

- look at the target product list from PDG data;
- attempt to build the product cores using the available components;
- and preserve provenance whenever possible, for example carrying one inner binary from a proton into a resulting neutron.

### Phase 4: Waste Calculation

- if there is surplus material that cannot settle into a stable assembly slot, the solver should account for that excess rather than hiding it;
- if there is a deficit, it should recruit from spacetime and account for the remainder;
- and every channel should be allowed to report waste or dark-sector-style residue explicitly instead of pretending the reaction closed perfectly on visible products alone.

## Case Study: Neutron Reaction

The neutron channel \(n \to p + e^- + \bar{\nu}_e\) remains a useful design case.

In this solver picture:

- the neutron core is loaded as the reactant structure;
- a geometric instability or channel event opens the reaction;
- spacetime material can be recruited from the Noether Sea;
- most of the neutron core persists into the proton;
- the emitted electron and anti-neutrino are assembled from the shed pattern plus recruited substrate;
- and the resulting flow diagram should show where the proton inherited structure, where spacetime inflow occurred, and how much substrate was consumed.

That is exactly the kind of output ordinary PDG channel notation does not provide.

## Waste-Heat And Unused-Pair Logic

The older "unused pair" speculation is still worth preserving as a solver design question.

If a disrupted binary cannot find a stable assembly slot within the allowed reaction window, one candidate rule is:

1. radiative damping;
2. collapse;
3. approach to max-curvature behavior;
4. terminal compact neutral binary or hard-radiation-style residue.

Whether or not the final physics claim survives unchanged, the software design implication is useful:

- the solver should be able to report a waste-heat or leftover-residue metric rather than forcing every event to close only on named visible products.

## ARL Direction

The related ARL brainstorming is still useful as the long-range execution model.

Core purpose:

- an explicit reaction language and execution model for reactions;
- deterministic or at least provenance-explicit transactions on identified constituents;
- and a GPU-friendly scheduling model for channel execution.

Fundamental premises:

- matter is built from discrete architrinos assembled into stable structures;
- each architrino has a unique id so its history can be traced across reactions;
- and the Noether Sea is a real medium containing pre-existing ids rather than a null pool.

Useful primitive operations remain:

- `LOCK(IDs)`
- `LOOSEN(IDs)`
- `QUERY_PHASE(Assembly)`
- `DOCK(A, B)`
- `EXCHANGE(A_sub, B_sub)`
- `SPLIT(Parent -> Child1, Child2)`
- `MERGE(Parent1, Parent2 -> Child)`
- `DE_STEALTH(Region)`
- `SCAVENGE(Source, NoetherSea)`

The final implementation does not need to start as a full ARL language, but it should avoid blocking that future direction.

## Required Input And Output

The PDG solver input side should be able to represent:

- the chosen PDG channel or decay mode;
- reactants and products;
- energy or threshold context;
- branching or weighting metadata when available;
- and enough source metadata to keep the pipeline reproducible.

The PDG solver output side should not try to be the final animation format by itself.

It should produce:

- normalized reaction-app input;
- solver metadata about the source channel;
- and, after reaction resolution, a reaction flow JSON that the composer can stage and animate.

## Development Constraint

The PDG solver should stay a bridge layer.

It should not become a second reaction app and it should not become a second composer. Its value is:

- reliable PDG ingest;
- clean normalization;
- disciplined handoff into the reaction app;
- disciplined handoff from solved flow into the composer;
- and preservation of the deeper provenance-oriented architecture that motivated it in the first place.

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
