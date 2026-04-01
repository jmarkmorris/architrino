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

- `src/runtime/ComposerReactionSolveStateRuntime.js`
- `src/runtime/ComposerReactionSolveProposalRuntime.js`
- `src/runtime/ComposerReactionSolveSelectionRuntime.js`
- `src/runtime/ComposerReactionSolveMatchRuntime.js`
- `src/runtime/ComposerReactionSolveAssociateRuntime.js`
- `src/runtime/ComposerReactionSolveLayoutRuntime.js`
- `src/runtime/ComposerReactionSolveProjectionRuntime.js`
- `src/runtime/ComposerReactionSolverUiRuntime.js`

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

### Solver Boundaries

The solver is an internal Reaction component.

It should:

- feed the Reaction app's manual review and correction workflow;
- preserve provenance and conservation as first-order constraints;
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

### Geometry And Modularity

The shared surface grid must remain the source of truth for solver placement.

Do not:

- duplicate lane geometry across CSS and JS;
- infer centers from ad hoc rendered offsets;
- or collapse new solve logic back into the UI runtime.

The long-term target is for the solver UI runtime to become composition and wiring only, with domain logic staying in focused runtimes.

### File Boundaries

The current solver file boundaries should remain the basis for extension:

- `ComposerReactionSolveStateRuntime.js`
- `ComposerReactionSolveProposalRuntime.js`
- `ComposerReactionSolveSelectionRuntime.js`
- `ComposerReactionSolveMatchRuntime.js`
- `ComposerReactionSolveAssociateRuntime.js`
- `ComposerReactionSolveProjectionRuntime.js`
- `ComposerReactionSolveLayoutRuntime.js`

Likely next extraction targets from the current UI runtime:

- a surface-grid placement runtime;
- a menu and picker runtime;
- a route-render runtime;
- and a participant-interaction runtime.

## Interfaces

### Inputs

- authored Reaction participants;
- current authored mappings and manual operator placements;
- current dissociated-composite state;
- and future normalized seeds from PDG ingest or other upstream sources.

### Outputs

- selected conservative mappings;
- solve-generated operator placements;
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

- keep `ComposerReactionSolverUiRuntime.js` moving toward composition-only wiring.

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
