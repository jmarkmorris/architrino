# PDG Solver

## Purpose

The PDG solver is the planned channel-ingest and proposal layer that should feed the reaction app, not replace it.

Its job is to:

1. ingest published channel data and related metadata;
2. normalize that input into the same abstract reaction-solve model the reaction app can already use;
3. generate and rank candidate provenance plans;
4. project the selected plan into the reaction app for inspection, correction, and later handoff;
5. eventually return a durable reaction payload for the composer.

The key architectural point is that the planner should own solving, while the reaction app should own rendering, inspection, manual override, and validation.

The PDG-facing layer should not depend on Composer runtime code. Downstream Composer work should happen only after Reaction exports a durable handoff payload.

## Current State

The repository now has a real reaction-app solver seam. The old description of this note as "planning only" is no longer accurate.

What exists now:

- a dedicated abstract solve-state builder in `src/runtime/ComposerReactionSolveStateRuntime.js`;
- a proposal builder in `src/runtime/ComposerReactionSolveProposalRuntime.js`;
- composite child matching in `src/runtime/ComposerReactionSolveMatchRuntime.js`;
- associate-specific candidate construction in `src/runtime/ComposerReactionSolveAssociateRuntime.js`;
- operator placement in `src/runtime/ComposerReactionSolveLayoutRuntime.js`;
- plan projection back into live participants and mappings in `src/runtime/ComposerReactionSolveProjectionRuntime.js`;
- and the current reaction-app wiring in `src/runtime/ComposerReactionSolverUiRuntime.js`.

Current regression coverage already exists in:

- `tests/reaction-solve-state.test.js`;
- `tests/reaction-solve-proposal.test.js`;
- `tests/reaction-solve-layout.test.js`;
- `tests/reaction-solve-projection.test.js`;
- and `tests/reaction-solver-ui.test.js`.

So the near-term job is not "invent a solver from scratch." It is to extend the existing abstract-solve architecture without collapsing new logic back into the UI runtime.

## Current Solver Architecture

The implemented solve flow is already the right basic shape:

1. build an abstract solve state from current participants and mappings;
2. generate candidate mappings and operator insertions on that state;
3. apply row-placement heuristics using the shared surface-grid model;
4. project the chosen plan back into reaction-app participants and mappings.

That architecture is the right precursor for PDG ingest. A future PDG-facing layer should feed this abstract-solve path, not invent a separate canvas-only solver.

### Present Solve Pipeline

- `ComposerReactionSolveStateRuntime`
  - separates reactants, products, operators, and center assemblies;
  - allows existing center-lane operators during solve;
  - blocks solve when center bosons are present.
- `ComposerReactionSolveProposalRuntime`
  - builds the current greedy solve plan;
  - prefers direct reuse, then fragment and associate construction, then partial composite reuse;
  - reports unresolved reactants and products explicitly.
- `ComposerReactionSolveLayoutRuntime`
  - places inserted operators from explicit surface-row centers;
  - uses the shared periodic-table-style surface grid as the source of truth.
- `ComposerReactionSolveProjectionRuntime`
  - creates solve-generated operators;
  - resolves deferred endpoints;
  - and materializes mappings back into the live reaction UI.
- `ComposerReactionSolverUiRuntime`
  - triggers solve;
  - removes only solve-generated operators before rerunning solve;
  - clears auto-dissociation markers before rebuilding;
  - and keeps manual operators and manual shell dissociation intact.

## Current Solver Capabilities

The present solver already supports:

- direct root matches for identical conservative standalone participants;
- full composite carry-through for identical composites;
- partial composite carry-through such as `Neutron -> Proton`;
- direct fragment-to-root mapping from a composite child into a standalone product;
- `Associate` construction for opposite-polarity Noether-core inputs forming a photon;
- `Higgs Cluster -> Photon + Photon` using two `Associate` operators;
- repeated `Solve` from a clean auto-solve baseline without duplicating solve-generated operators;
- automatic reactant-shell dissociation marking when internal rows are mapped;
- and persistent manual right-click shell dissociation.

Related current UI and naming constraints:

- quark labels are normalized to full labels such as `Pro Down Quark` and `Anti Up Quark`;
- `Gluon` has been removed from the reaction add picker;
- and the solver continues to use the canonical shared surface-grid model for placement.

## Current Limits

The current solver is still intentionally narrow.

Important current limits:

- plan selection is still greedy, so local choices can still produce avoidable crossings or weaker global matches;
- the current candidate library is centered on direct reuse, fragment reuse, partial composite reuse, and `Associate` photon construction;
- center bosons are manual-only and still block solve instead of participating in planning;
- there is no dissociate-then-associate planner yet;
- there is no PDG ingest pipeline yet;
- there is no dedicated proposal-review app or reaction-flow export path yet.

## Architectural Stance

Keep the following constraints explicit.

### 1. Keep solver reasoning out of the UI runtime

`ComposerReactionSolverUiRuntime.js` is still too large and should remain a composition root, not the long-term home for new solve logic.

New domain logic should continue to land in focused runtimes such as:

- solve state;
- candidate generation;
- operator-specific construction;
- projection;
- and layout heuristics.

### 2. Keep the abstract solve state as the planner boundary

The solver should continue to reason over:

- abstract participant entries;
- source and target nodes;
- candidate mappings;
- operator insertions;
- and unresolved residue.

The planner should not depend on DOM shape, menu state, or incidental render structure.

### 3. Keep the shared surface grid canonical

Row placement must continue to use the explicit shared surface-grid model. Do not reintroduce duplicate lane geometry in CSS and JS or infer centers from ad hoc rendered offsets.

### 4. Do not model generic planner-side dissociation for composite particles

The current product direction is narrower than the old note implied.

The major missing feature is dissociate-then-associate planning, but only through the shell model the reaction app already uses:

- composite right-click dissociation is existing UI shell state;
- automatic shell dissociation already exists for mapped internal reactant rows;
- solver planning should learn to consume that shell state;
- but dissociation should not become a generic free-floating planner operation that duplicates the current UI grammar.

## Next Recommended Work

The next work should stay phase-by-phase and test-backed.

Recommended order:

1. take any newly reported solve bug first and add a targeted regression test for it;
2. improve solve-plan selection where current greedy choices are poor;
3. improve operator-layout heuristics where crossings or weak placements remain;
4. add dissociated-shell-aware planning for dissociate-then-associate scenarios through existing shell state;
5. only after that, expand into weak-boson and PDG-ingest-specific planning work.

## Near-Term Capability Targets

The next solver expansions should be framed as focused candidate families with regression tests, not as one giant pass.

Good near-term additions:

- better global ranking among competing direct, fragment, partial-composite, and associate candidates;
- shell-aware dissociate-then-associate planning that respects existing manual or auto shell state;
- better handling of leftover fragments and residue reporting;
- improved operator placement when multiple candidates compete for the same lane region;
- and later, explicit weak-boson-mediated construction for the cases the user actually wants to support.

## PDG-Specific Work That Still Does Not Exist

The following is still future work:

- official PDG channel ingest around the intended `pdg` package path;
- channel normalization into the abstract solve-state schema;
- a PDG-facing proposal-review surface or app boundary;
- stored candidate alternatives and review controls such as pin or forbid;
- and handoff of accepted solved reactions into a durable composer payload.

When that work begins, it should reuse the existing reaction solver seam instead of creating a parallel solver architecture.

If the PDG-facing layer becomes its own app or service, it should talk to Reaction through a normalized seed or proposal contract rather than through shared UI runtime code.

## Suggested File Boundaries

Current file boundaries that should remain the basis for extension:

- `ComposerReactionSolveStateRuntime.js`
- `ComposerReactionSolveProposalRuntime.js`
- `ComposerReactionSolveMatchRuntime.js`
- `ComposerReactionSolveAssociateRuntime.js`
- `ComposerReactionSolveProjectionRuntime.js`
- `ComposerReactionSolveLayoutRuntime.js`

Likely next extraction targets from the current UI runtime:

- a surface-grid placement runtime;
- a menu and picker runtime;
- a route-render runtime;
- and a participant-interaction runtime.

The goal is to keep `ComposerReactionSolverUiRuntime.js` as thin wiring over those seams.

## Related Action Items

- [composer-reaction](./composer-reaction.md)
- [reaction](./reaction.md)
- [composer](./composer.md)
- [independence](./independence.md)
- [swe](./swe.md)

## Related AAA Notes

- [pdg-api](../../content/markdown/aaa/reactions/pdg-api.md)
- [reaction-ledger](../../content/markdown/aaa/validation/reaction-ledger.md)
- [validation-protocols](../../content/markdown/aaa/validation/validation-protocols.md)
