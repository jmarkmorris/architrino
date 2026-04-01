# Reaction Solver

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Distinguish clearly between current implemented behavior, intended architecture, and future expansion.
- Do not duplicate Reaction-to-Composer contract details here beyond what the solver must produce or consume; prefer the contract-owning document when it exists.
- Do not widen solver scope by turning authored app operators into generic planner primitives.

## Purpose

The Reaction solver is the Reaction-side solving component that turns authored participants into conservative candidate mappings and operator placements.

It owns:

- abstract solve-state construction;
- candidate generation and selection;
- operator insertion and row placement;
- projection back into live Reaction participants and mappings;
- and solver-specific constraints on provenance and conservation.

It does not own:

- Composer staging, observer work, or explanatory overlays;
- the final cross-app handoff contract;
- PDG channel ingest as its own concern;
- or broad UI/runtime policy outside the Reaction app.

## Current State

- The repository already has a real solver seam rather than a placeholder plan.
- The current solve path includes dedicated runtimes for solve state, proposal building, candidate selection, matching, associate construction, layout, projection, and UI wiring.
- The solver already supports several important conservative solve families, including direct reuse, composite carry-through, fragment reuse, and `Associate`-based reassembly.
- The solver can rerun from a clean auto-solve baseline while preserving manual operators and manual dissociated-composite state.
- Automated coverage already exists for solve state, proposal logic, layout, projection, and the solver UI.
- The main remaining technical risk is that the UI runtime is still too large and still carries too much subsystem behavior.

Current implementation inventory:

- `src/apps/reaction/ReactionSolveStateRuntime.js`
- `src/apps/reaction/ReactionSolveProposalRuntime.js`
- `src/apps/reaction/ReactionSolveSelectionRuntime.js`
- `src/apps/reaction/ReactionSolveMatchRuntime.js`
- `src/apps/reaction/ReactionSolveAssociateRuntime.js`
- `src/apps/reaction/ReactionSolveLayoutRuntime.js`
- `src/apps/reaction/ReactionSolveProjectionRuntime.js`
- `src/apps/reaction/ReactionSolverUiRuntime.js`

Current test coverage inventory:

- `tests/reaction-solve-state.test.js`
- `tests/reaction-solve-proposal.test.js`
- `tests/reaction-solve-layout.test.js`
- `tests/reaction-solve-projection.test.js`
- `tests/reaction-solver-ui.test.js`

## Design

### Solve Pipeline

The intended solve flow is:

1. build an abstract solve state from current participants and mappings;
2. generate candidate mappings and operator insertions over that state;
3. select among explicit candidate families;
4. place solve-generated operators using the shared surface-grid model;
5. project the selected plan back into live Reaction participants and mappings.

This component should stay planner-first. It should reason over explicit solve-state entries, not over DOM shape, menu state, or incidental render structure.

Current solve-pipeline details:

- solve state separates reactants, products, operators, and center assemblies;
- the current proposal layer builds plans over explicit candidate families and reports unresolved reactants and products;
- layout uses explicit surface-row centers plus row-bias heuristics when operators compete for nearby lane regions;
- projection creates solve-generated operators, resolves deferred endpoints, and materializes mappings back into the live Reaction UI;
- and the UI runtime removes only solve-generated operators before rerunning solve, clears auto-dissociation markers, and keeps manual operators and manual dissociated-composite state intact.

### Current Rule Order

The current implemented solve order is:

1. Build solve state from live participants.
2. Partition entries into `reactants`, `products`, `center assemblies`, `operators`, and `unsupported`.
3. Treat `reactants` plus `center assemblies` as the current source pool for proposal building.
4. Build source sub-pools for special rules:
5. `associateSourceEntries` contains full `Noether core` roots, full `Free Architrinos` roots, and top-level `Noether core` children pulled from composite sources.
6. `compositeChildSourceEntries` contains top-level constituent children from composite sources.
7. `standaloneRootSourceEntries` contains non-composite standalone roots.
8. For each source/product pair, try base candidate families in this order:
9. `composite-carry-through` first;
10. then `direct-root`;
11. then `center-root-direct`.
12. Build `fragment-root-direct` candidates from composite-child source entries into standalone product roots.
13. Build `associate-photon` candidates from pairs of opposite-polarity `Noether core` sources into photon products.
14. For each product that does not already have an identical direct reactant, try `Associate` reassembly in this order:
15. `associate-standalone` first;
16. then `associate-composite`.
17. Run the main candidate-set selector across base, fragment, and associate candidates together.
18. Build `partial-composite-direct` candidates only after the main selection pass, and only from still-unresolved reactant/product pairs.
19. Run a second selector for those partial-composite candidates, excluding already-used source fragments.
20. Run the `product-child-direct` selection pass last, but the current proposal builder does not populate that candidate family yet, so this pass is effectively inactive today.
21. Mark a composite reactant auto-dissociated if the selected mappings consume one of its internal child rows instead of its root.
22. Place solve-generated operators onto the shared surface grid.
23. Project solve-generated operators, mappings, and auto-dissociation markers back into live Reaction state.

The current selection order inside the solver is also explicit:

- candidate profiles are presorted by more fully resolved whole products, then more matched target nodes, then fewer partial-product claims, then higher candidate score, then a stable text identity tie-break;
- the set-level selector then prefers more fully resolved whole products, then more matched target nodes, then fewer partial-product claims, then more matched source nodes, then higher total score, then a stable identity tie-break;
- this means the solver currently prefers stronger whole-product solutions over weaker residue-heavy plans even before any future chemistry or PDG-facing heuristics are added.

### Current Assembly And Operator Rules

All current candidate families share one conservative gate unless noted otherwise:

- any direct mapping candidate must pass `evaluateReactionMappingCandidate`;
- that gate currently requires known source and target inventories;
- it currently requires equal `electrino` / `positrino` ledger on both sides;
- and it forbids direct mapping between full tri-binary `Pro Noether Core` and `Anti Noether Core`.

Current implemented assembly and operator rules are:

- `composite-carry-through` applies only when source and product share direct participant identity and both top-level composite trees can be fully matched child-to-child;
- `direct-root` applies only when source and product share the same template id and polarity and the direct conservative mapping gate allows the root-to-root mapping;
- `center-root-direct` applies only when the source is a center assembly, the product is not a composite product, and the direct conservative mapping gate allows the root-to-root mapping;
- `fragment-root-direct` applies only when a top-level source child has the same template id as a standalone product root, polarity is compatible, and the direct conservative mapping gate allows the mapping;
- `partial-composite-direct` applies only when source and product share direct participant identity, some top-level child mappings are valid, and full composite carry-through was not possible;
- `Associate` is the only operator the solver currently inserts explicitly into the plan;
- explicit `Dissociate` operators are not inserted by the current planner;
- instead, dissociation is currently represented as an auto-dissociation mark on a composite reactant when the selected mappings consume internal child rows.

Current `Associate` rules are:

- `associate-photon` requires exactly two source entries that classify as `Noether core`, opposite core polarities, a photon product with both `pro` and `anti` child targets, and exact full-inventory equality between the two sources combined and the photon product;
- `associate-standalone` requires a non-photon, non-composite standalone product, at least one `Noether core` source, at least one `Free Architrinos` source, two different source participants, target polarity compatibility with the chosen core, and equality of the resulting `electrino` / `positrino` ledger with the product inventory;
- `associate-composite` requires a composite product with at least two target child nodes, at least as many source entries as target child nodes, a valid conservative mapping from each chosen source to its assigned target child, at least two distinct source entries in the finished plan, and exact full-inventory equality between all chosen sources combined and the composite product;
- when multiple `Associate` assignments are possible, the solver prefers assignments with more matched target nodes, then higher pair score, then a stable source-identity tie-break;
- every solve-generated `Associate` currently uses operator lane `1` and produces exactly one assembled output participant.

Current special assembly-source rules are:

- `Noether core` and `Free Architrinos` are treated as source assemblies, not solver-defined operators;
- `Noether core`, `W-`, `W+`, `Z`, and `Free Architrinos` can appear as center assemblies in solve state;
- only `Noether core` and `Free Architrinos` currently participate in the special `Associate` construction rules;
- center assemblies may map directly into currently supported standalone products through `center-root-direct`;
- the current planner does not yet introduce new bosons as intermediate solve-generated participants during search;
- and broader weak-boson-mediated construction is still outside the implemented rule set.

Current placement and projection rules are:

- only solve-generated operators are removed before a fresh rerun;
- manual operators remain in the surface and also occupy lane rows for later layout;
- solve-generated operators are placed after candidate selection, not during candidate generation;
- placement prefers the target-side row center for `Associate` when available, otherwise the shared center of connected rows;
- placement avoids occupied rows inside the chosen operator lane by nearest-row search with a small direction bias;
- projection creates the solve-generated operator participants, resolves deferred operator endpoints into concrete node keys, applies the selected mappings, and marks any newly auto-dissociated composite reactants;
- and projection does not create an explicit `Dissociate` operator participant today.

### Solver Boundaries

The current implementation lives inside the Reaction app, but the long-term solver architecture should be split into a headless planning core plus app-side adapters.

It should:

- feed the Reaction app's manual review and correction workflow;
- preserve provenance and conservation as first-order constraints;
- expose explicit, versioned solver inputs and outputs rather than depending on UI state;
- remain independent of Composer runtime code;
- and remain reusable by future PDG ingest or other seed layers.

It should not:

- solve the reaction again inside Composer;
- stage final authored animation;
- or smuggle cross-app behavior through shared runtime code.

### Present Capabilities

The current solver already supports:

- direct root matches for identical conservative standalone participants;
- direct standalone reuse for slot-based fermions;
- full composite carry-through for identical composites;
- fragment-to-root mapping from a composite child into a standalone product;
- `Associate`-based composite reassembly for composite products;
- `Associate`-based composite reassembly from mixed fragment and standalone inputs;
- `Associate` construction for supported standalone outputs from `Noether core` and `Free Architrinos`;
- `Higgs Cluster -> Photon + Photon` through auto-dissociation plus two `Associate` operators;
- supported center bosons as source-side participants when the user has already authored them;
- direct center-boson mapping to currently supported conservative standalone products;
- candidate selection that prefers stronger whole-product solutions over weaker partial residue paths;
- repeated `Solve` from a clean auto-solve baseline without duplicating solve-generated operators;
- automatic reactant composite dissociation marking when internal rows are mapped;
- and persistent manual dissociated-composite state alongside solve-created dissociation marks.

### Operator Semantics

The solver must stay faithful to the Reaction app's authored operator language.

Current explicit constraints:

- `Associate` is a gather-and-assemble operator.
- `Associate` may consume many inputs but produces exactly one assembled output.
- `Associate` must not become a generic weak-reaction junction, transform shim, or many-output routing node.
- The solver's operator set is constrained by the Reaction app rather than expanded ad hoc by planner convenience.
- Center assemblies such as `Noether core`, `W-`, `W+`, `Z`, and `Free Architrinos` are supported participants, not solver-defined operators.
- The current fixed solver operator set is `Associate` and `Dissociate`.

### Composite And Dissociation Rules

Composite handling is one of the key design boundaries.

The solver should:

- preserve direct carry-through for the same composite when that is the right solve;
- use `Associate` to build composite products unless the solve is that direct carry-through case;
- allow solver-created internal-row mappings to auto-dissociate a composite when the selected plan requires it;
- preserve manual dissociated-composite state as valid authored state;
- and eventually represent selected dissociation explicitly at the plan level rather than as an implicit side effect.

The solver should not assume that composite internals are available only when the user manually pre-dissociated the composite. That would break already needed solve cases.

Current additional limits that should remain explicit:

- composite product child rows are not the final product except in the direct same-composite carry-through case;
- boson decay and broader weak-boson-mediated construction are not implemented yet;
- the solver does not yet evaluate plans that introduce a new boson as an intermediate participant during the main search;
- the solver does not yet insert explicit `Dissociate` operators as part of the selected solve plan;
- and solver handling of dissociated composite reactants still needs to become more explicit at the planning level.

### Primitive-First Planning

The next major expansion should remain primitive-first.

The planner should reason in the primitive language of:

- `Dissociate`;
- `Associate`;
- `Noether core`;
- `Free Architrinos`;
- direct mappings;
- and dissociated-composite access.

If an exact solved primitive subgraph later matches a boson-like structure, that pattern may be recognized or collapsed for readability. The solver should not become boson-first before primitive charge-routing is complete.

### Rearchitecture Direction

The next solver architecture should separate four concerns that are still too entangled today:

- input normalization into a solver-owned abstract request;
- headless search, scoring, and plan construction;
- app-side projection of a selected plan into live Reaction state;
- and downstream export or import adapters for other tools.

The browser should not remain the only place where solving can happen. The current JavaScript planner is a useful working reference and a good source of tests and behavior inventory, but the main search engine should move toward a headless core that can be profiled, exercised from fixtures, and run without the Reaction UI.

### External Solver Core

The intended rebuilt solver core is an external command-line tool, likely implemented in Python.

That core should own:

- normalized solve-request parsing;
- conservative candidate generation and search;
- scoring, ranking, and residue accounting;
- and emission of an explicit solve result that app runtimes can consume.

It should not own:

- DOM-driven geometry;
- Reaction menu state or interaction state;
- Composer staging or observer behavior;
- or hidden assumptions about one specific app shell.

Python is the right current direction because the main pressure is on correctness, robustness, testability, and speed of solver iteration rather than browser-local coupling. The important architectural point is the headless executable boundary, not Python for its own sake.

### Invocation Modes

The external solver should support two input modes:

- structured JSON for full-fidelity solving, regression fixtures, and app integration;
- and a compact command-line shorthand for quick experiments and batch runs.

The compact shorthand should stay intentionally short. The intended shape is:

- `--r [PNeuctdsbhHVWZ...]`
- `--p [PNeuctdsbhHVWZ...]`

Those concise reactant and product strings should be treated as a convenience syntax over the same normalized solver request, not as a second independent model.

Current best read of the intended compact particle alphabet:

| Code | Intended particle | Notes |
| --- | --- | --- |
| `P` | proton | aligns with existing `Pro Proton` support |
| `N` | neutron | aligns with existing `Pro Neutron` support |
| `e` | electron | aligns with existing `Pro Electron` support |
| `u` | up quark | first-generation up-type quark |
| `c` | charm quark | second-generation up-type quark |
| `t` | top quark | third-generation up-type quark |
| `d` | down quark | first-generation down-type quark |
| `s` | strange quark | second-generation down-type quark |
| `b` | bottom quark | third-generation down-type quark |
| `V` | neutrino | likely ASCII stand-in for `\nu` |
| `H` | Higgs cluster | the most natural uppercase `H` reading |
| `h` | photon | likely the `h\nu` mnemonic rather than a second Higgs code |
| `W` | `W` boson family | sign probably needs a later polarity or suffix convention such as `W+` / `W-` |
| `Z` | `Z` boson | direct match |

This alphabet appears to describe particle-level shorthand rather than every internal solver assembly. In particular, `Noether core` and `Free Architrinos` are solver-relevant assemblies today, but they do not fit cleanly into the current one-letter sketch and should be treated as out of scope for this first compact notation unless separate codes are reserved for them.

### Result And Integration Contract

The rebuilt solver should return explicit structured output rather than mutating app state directly.

That output should be rich enough to carry:

- solved participants and participant roles;
- selected mappings and provenance claims;
- explicit operator insertions and placements or placement hints;
- unresolved residue and ambiguity reporting;
- and enough staged structure to feed Reaction review and later downstream export.

The Reaction app should consume that output through a projection adapter that materializes the solve into live participants, mappings, dissociation state, and operator placement. Composer should remain downstream of accepted Reaction output through explicit versioned data such as `reaction-flow/v1`, rather than calling solver runtime code.

### Direct Composer Path

The external solver should eventually make a fast path possible in which a headless solve can feed Composer without first opening the Reaction UI.

That path is useful for rapid iteration and batch generation, but it should still respect the app boundary:

- solve outside Composer;
- hand off through explicit structured data;
- and keep Composer focused on staging rather than on replanning the reaction.

Even with a direct Composer path, the Reaction app still matters. It remains the natural review and correction surface for provenance, and it remains the likely source of reaction-app imagery or other visual artifacts that Composer can reuse in final animation products.

### Geometry And Modularity

The shared surface grid must remain the source of truth for solver placement.

Do not:

- duplicate lane geometry across CSS and JS;
- infer centers from ad hoc rendered offsets;
- or collapse new solve logic back into the UI runtime.

The long-term target is for the solver UI runtime to become composition and wiring only, with domain logic staying in focused runtimes.

### File Boundaries

On the browser side, the current solver file boundaries should remain the basis for extension during the transition:

- `ReactionSolveStateRuntime.js`
- `ReactionSolveProposalRuntime.js`
- `ReactionSolveSelectionRuntime.js`
- `ReactionSolveMatchRuntime.js`
- `ReactionSolveAssociateRuntime.js`
- `ReactionSolveProjectionRuntime.js`
- `ReactionSolveLayoutRuntime.js`

Those runtimes should increasingly act as:

- the reference implementation for current behavior;
- the projection and layout adapters for Reaction;
- and the bridge layer to a future external solver contract.

Likely durable boundaries in the rearchitected system are:

- a normalized solve-request schema;
- a compact-notation parser for command-line use;
- a headless external solve core;
- a structured solve-result schema;
- a Reaction projection adapter;
- a Reaction surface-grid placement adapter;
- and an export or import adapter for downstream Composer flow.

Likely next extraction targets from the current UI runtime remain:

- a surface-grid placement runtime;
- a menu and picker runtime;
- a route-render runtime;
- and a participant-interaction runtime.

## Interfaces

### Inputs

- authored Reaction participants;
- normalized headless solve requests;
- compact reactant and product shorthand for command-line solving;
- current authored mappings and manual operator placements;
- current dissociated-composite state;
- and future normalized seeds from PDG ingest or other upstream sources.

### Outputs

- selected conservative mappings;
- solve-generated operator placements;
- structured solve results suitable for app adapters;
- projected live Reaction-side participants and mappings;
- unresolved residue reporting;
- and, downstream of Reaction, material that can later feed the Reaction-owned handoff document.

### Neighboring Components

- [reaction](./reaction.md) owns manual authoring, review, and the broader app workflow around the solver.
- [pdg-ingest](./pdg-ingest.md) should eventually feed normalized seeds and candidate-review context into this solver rather than replacing it.
- [composer](./composer.md) is downstream and should consume accepted Reaction output rather than invoke solver runtime code.
- [app-architecture](./app-architecture.md) defines the app-boundary rule that prohibits direct Composer/Reaction runtime coupling.
- [app-architecture](./app-architecture.md) owns the cross-cutting app-boundary and modularity rules that apply here.

## Priorities

### 1. Shrink The Solver UI Runtime

Status: `active`

Goal:

- keep `ReactionSolverUiRuntime.js` moving toward composition-only wiring.

Why it matters:

- this is still the biggest solver-side readability, testability, and regression hotspot.

Next steps:

- continue moving domain logic into focused runtimes;
- keep layout, proposal, projection, and interaction seams explicit;
- and avoid adding new solve behavior directly to the UI runtime.

Execution rule:

- when a newly reported solve bug appears, add a targeted regression test before or with the fix.

### 2. Extend Primitive Charge Routing

Status: `next`

Goal:

- move beyond the current `Associate`-centered families so the solver can reason through authored or generated `Dissociate`, `Noether core`, and `Free Architrinos` paths.

Why it matters:

- this is the main missing capability before boson recognition or broader PDG-facing work becomes well-founded.

Next steps:

- add focused candidate families with targeted tests;
- represent selected composite dissociation more explicitly at the plan level;
- and keep manual dissociated-composite behavior stable while the planner grows.

### 3. Improve Residue And Dissociation Reporting

Status: `pending`

Goal:

- make unresolved residue and solve-created dissociation legible in the plan and projection layers.

Why it matters:

- solver behavior is easier to trust and debug when leftover fragments and auto-dissociation are explicit.

Next steps:

- improve residue reporting in proposal output;
- preserve clean projection of solve-created dissociation into the live Reaction surface;
- and add regression tests around those cases.

Stability constraint:

- direct center-boson mapping for currently supported product cases should remain stable while residue and dissociation reporting improve.

### 4. Add Exact Boson Recognition On Top Of Primitive Solves

Status: `pending`

Goal:

- recognize exact boson-shaped subgraphs only after primitive charge-routing is working.

Why it matters:

- this preserves the primitive-first planning model while still allowing readable derived shorthand later.

Next steps:

- define exact recognizers over primitive solved subgraphs;
- keep authored source-side bosons valid;
- and avoid widening the first-pass solve search space with free synthetic boson insertion.

### 5. Stay Ready For PDG Seeds Without Becoming PDG-Specific

Status: `pending`

Goal:

- keep the solver reusable as the normalized planning core for future PDG ingest.

Why it matters:

- PDG work should reuse this seam rather than create a parallel solver.

Next steps:

- keep the abstract solve state as the planner boundary;
- keep solver inputs normalized and UI-independent;
- and let PDG ingest talk to the solver through explicit seed/proposal shapes rather than shared UI code.

### 6. Solver Rearchitecture

Objective:

- rearchitect the solver around a fast external headless core with explicit JSON and compact CLI inputs, while preserving clean Reaction review and Composer handoff boundaries.
