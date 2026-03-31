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
- a candidate-selection runtime in `src/runtime/ComposerReactionSolveSelectionRuntime.js`;
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
  - builds the current solve plan over explicit candidate families;
  - now uses dedicated candidate selection instead of the older family-by-family greedy pick order;
  - reports unresolved reactants and products explicitly.
- `ComposerReactionSolveLayoutRuntime`
  - places inserted operators from explicit surface-row centers;
  - includes current row-bias heuristics to preserve stronger vertical ordering when operators compete for the same lane region;
  - uses the shared periodic-table-style surface grid as the source of truth.
- `ComposerReactionSolveProjectionRuntime`
  - creates solve-generated operators;
  - resolves deferred endpoints;
  - and materializes mappings back into the live reaction UI.
- `ComposerReactionSolverUiRuntime`
  - triggers solve;
  - removes only solve-generated operators before rerunning solve;
  - clears auto-dissociation markers before rebuilding;
  - and keeps manual operators and manual dissociated-composite state intact.

## Current Solver Capabilities

The present solver already supports:

- direct root matches for identical conservative standalone participants;
- full composite carry-through for identical composites;
- partial composite carry-through such as `Neutron -> Proton`;
- direct fragment-to-root mapping from a composite child into a standalone product;
- standalone-quark mapping into composite baryon product rows such as `u + u + d -> proton`;
- `Associate` construction for opposite-polarity Noether-core inputs forming a photon;
- `Higgs Cluster -> Photon + Photon` using two `Associate` operators;
- candidate selection that prefers stronger whole-product solutions over weaker fragment-plus-partial residue;
- repeated `Solve` from a clean auto-solve baseline without duplicating solve-generated operators;
- automatic reactant composite dissociation marking when internal rows are mapped;
- and persistent manual right-click dissociated-composite state.

Related current UI and naming constraints:

- quark labels are normalized to full labels such as `Pro Down Quark` and `Anti Up Quark`;
- `Gluon` has been removed from the reaction add picker;
- and the solver continues to use the canonical shared surface-grid model for placement.

## Current Limits

The current solver is still intentionally narrow.

Important current limits:

- the current candidate library is centered on direct reuse, fragment reuse, partial composite reuse, and `Associate` photon construction;
- center bosons are manual-only and still block solve instead of participating in planning;
- the planner still does not model dissociation explicitly as a first-class solve step;
- solver handling of dissociated composite reactants still needs to be made more explicit and deliberate in the planning model;
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

The major missing feature is dissociate-then-associate planning, but only through the dissociated-composite model the reaction app already uses.

The required behavior is narrower and more concrete than "only use internal rows when the composite was already manually marked dissociated."

The solver must still be able to dissociate a composite as part of a valid solve when that is what the reaction requires. A key current example is `Higgs Cluster -> Photon + Photon`: the solver must auto-dissociate the composite Higgs in order to route its internal Noether-core rows through two `Associate` operators.

So the intended rule is:

- manual dissociated-composite state remains valid authored state;
- solver-created internal-row mappings may still auto-dissociate a composite when the selected plan requires it;
- future planner work should represent that auto-dissociation explicitly as part of the chosen plan rather than treating every composite as permanently dissociated;
- and dissociation should still not become a generic free-floating planner operation that duplicates the current UI grammar.

What should be avoided is the wrong interpretation that associate planning may consume composite internals only when the composite was already manually or previously marked dissociated before solve. That would break required current behavior.

## Next Recommended Work

The next work should stay phase-by-phase and test-backed.

Recommended order:

1. take any newly reported solve bug first and add a targeted regression test for it;
2. make dissociate-then-associate planning explicit in the solve model without breaking required auto-dissociation cases such as `Higgs Cluster -> Photon + Photon`;
3. add weak-boson and center-column planning so `W-`, `W+`, and `Z` bosons can participate in solve instead of hard-blocking it;
4. only after that, expand into PDG-ingest-specific planning work.

## Near-Term Capability Targets

The next solver expansions should be framed as focused candidate families with regression tests, not as one giant pass.

Good near-term additions:

- explicit plan-level representation of composite dissociation when a chosen solve needs composite internals, while preserving manual dissociated-composite state and current auto-dissociation behavior;
- better handling of leftover fragments and residue reporting;
- explicit weak-boson-mediated construction for the cases the user actually wants to support;
- and center-column solve support for existing `W-`, `W+`, and `Z` boson assemblies.

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
