# Composer / Reaction SWE

## Purpose

This file owns the cross-cutting software-engineering discipline for the Composer / Reaction workstream.

It is the place for:

- modularity rules;
- runtime-boundary rules;
- current code hotspots;
- refactor ordering;
- testing expectations;
- and enforcement rules that keep the apps stable while they are still being built.

Product direction belongs in [composer](./composer.md), [reaction](./reaction.md), and [pdg-solver](./pdg-solver.md).

App-separation policy belongs in [independence](./independence.md).

## Current Direction

The current engineering direction should be treated as explicit unless superseded by a later architecture note.

- keep the main webapp as the launcher and discovery surface;
- launch `Composer` and `Reaction Designer` from that surface as separate routes or pages;
- keep Composer and Reaction as separate app runtimes in one repo;
- use explicit JSON contracts for cross-app handoff;
- allow shared code only for narrow platform or contract concerns;
- and do not let the apps share live app logic.

This direction is not about inventing three unrelated products. The main webapp remains the sphere-based entry surface. The important change is that opening Composer or Reaction should leave that launcher runtime and enter the selected app's own runtime.

The strongest practical reason for this direction is change isolation. If Composer and Reaction continue to run inside one shared runtime, a bug or refactor in one tool can still leak into the other through shared boot order, shared state, shared DOM, shared imports, or a large shared composition root.

So the preferred boundary is:

- one repo;
- one main discovery webapp;
- one Composer runtime;
- one Reaction runtime;
- and one explicit JSON contract boundary between Composer and Reaction.

Shared code should stay narrow:

- generic platform or shell infrastructure;
- static data;
- schemas and contracts;
- and other truly app-neutral utilities.

Shared code should not include:

- app-specific state stores;
- app-specific UI behavior;
- app-specific catalogs that affect behavior;
- or direct cross-app imports.

## Current Engineering Situation

The codebase has improved, but the main engineering risks are still clear:

- Composer and Reaction are still too coupled in the live app shell.
- `app.js` is still a large composition root and must not become the home for new feature logic.
- `ComposerReactionSolverUiRuntime.js` still behaves like a subsystem collapsed into one closure.
- some catalog and structure paths still act as implicit shared runtime seams.
- regression risk is still too high when UI, layout, solver logic, and event wiring meet in the same file.

The current cleanup goal is not abstract prettiness. It is change isolation.

## Desired End State

The desired SWE end state is:

- separate Composer and Reaction app entrypoints;
- separate dependency graphs;
- thin composition roots;
- focused runtimes with explicit ownership;
- versioned cross-app contracts;
- and tests that fail when a local change leaks across the intended seam.

## Current Hotspots

### 1. `app.js`

`app.js` should remain a wiring layer and transition point, not the long-term home for:

- Composer import logic;
- Reaction solving logic;
- app-boundary orchestration;
- or new domain behavior.

Every meaningful new behavior should land in a focused runtime or app module first, with `app.js` only wiring it.

### 2. `ComposerReactionSolverUiRuntime.js`

This file is still too large because it is not one module anymore. It is a whole subsystem collapsed into one closure.

The concrete problems are:

- too many responsibilities in one file;
- hidden coupling through shared closure state;
- low testability for nested behavior;
- regression risk from unrelated edits;
- poor change locality;
- mixed abstraction levels;
- and implicit ownership instead of explicit interfaces.

Current extraction targets remain:

- `ComposerReactionSurfaceGridRuntime`
- `ComposerReactionMenuRuntime`
- `ComposerReactionRouteRenderRuntime`
- `ComposerReactionParticipantInteractionRuntime`

The target state is that `ComposerReactionSolverUiRuntime.js` becomes composition and wiring only.

### 3. Cross-App Runtime Sharing

The current repository still contains coupling points where app-specific behavior can leak:

- shared overlay mode switching;
- shared runtime catalogs;
- shared app-specific structure helpers;
- and direct scene-mode assumptions that treat Composer and Reaction as one tool.

That is exactly the class of coupling that [independence](./independence.md) is trying to retire.

## Modularity Rules

### 1. Composition Roots Stay Thin

Large top-level files may wire behavior together, but they should not own the behavior.

In practice:

- new features do not start in `app.js`;
- new solve behavior does not start in `ComposerReactionSolverUiRuntime.js`;
- new Composer import behavior does not start in a general coordinator;
- and new layout logic does not get duplicated between CSS assumptions and JS heuristics.

### 2. Each Module Needs One Job

Good module boundaries are by responsibility:

- state construction;
- candidate generation;
- layout;
- render;
- interaction;
- import/export;
- validation;
- persistence.

Bad boundaries are accidental:

- "misc helpers";
- "extra utils";
- or a giant runtime that quietly owns five unrelated behaviors.

### 3. One Source Of Truth For Geometry And Semantics

Do not duplicate:

- lane geometry;
- anchor semantics;
- mapping validity rules;
- or contract structure.

If a value matters to behavior, it should have one authoritative definition.

### 4. Static Facts May Be Shared; Live Behavior May Not

Across app boundaries, shared material should be limited to:

- static schemas;
- static catalogs as data;
- example documents;
- and enforcement rules.

Do not share executable app behavior across the Composer / Reaction boundary.

### 5. State Should Be Explicit

Prefer explicit stores, state builders, and typed document shapes over:

- closure-owned mutable registries;
- DOM-shape inference;
- or hidden state coupled to render order.

## Testing Rules

The workstream should keep moving toward tests that match the real seams.

Required direction:

- add regression tests before fixing newly discovered solver bugs;
- prefer behavioral tests over source-regex tests when a seam exists;
- add contract fixtures for import/export boundaries;
- add app-boot smoke tests once entrypoints split;
- and keep geometry/layout tests close to the layout source of truth.

## Ordered Refactor Track

1. create and enforce the separate Composer / Reaction app boundary;
2. define the versioned handoff contract and fixtures;
3. keep shrinking `ComposerReactionSolverUiRuntime.js` into composition-only wiring;
4. create a dedicated Composer import engine for `ReactionFlowDocument`;
5. move new app-specific logic under focused app trees rather than into legacy shared coordinators;
6. add lint and test checks that block backsliding.

## Review Standard

For this workstream, a good change should improve at least one of these:

- local ownership;
- testability;
- contract clarity;
- change isolation;
- or app-boundary enforcement.

A change that adds user-visible capability but worsens those dimensions needs a very good reason.

## Related Action Items

- [composer-reaction](./composer-reaction.md)
- [composer](./composer.md)
- [reaction](./reaction.md)
- [pdg-solver](./pdg-solver.md)
- [independence](./independence.md)
