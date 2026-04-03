# App Architecture

## LLM Instructions

- Keep this document focused on the overall architectural approach for how dedicated apps fit inside the broader Architrino web app.
- Keep `Design` descriptive and durable; move task-shaped work into `Priorities`.
- Prefer app-boundary rules, ownership, and runtime-shape guidance over file-by-file migration detail.
- Do not restate app-specific product design that belongs in [composer](./composer.md), [reaction](./reaction.md), [solver](./solver.md), or [pdgfeed](./pdgfeed.md).
- Keep app-specific migration inventories in the owning app docs rather than turning this architecture note into a file-by-file tracker.

## Purpose

This document defines the overall architectural approach for incorporating dedicated apps into the Architrino web app.

It owns:

- the role of the main Architrino web app as launcher and discovery surface;
- the role of dedicated apps such as Composer and Reaction as independent runtimes within one repo;
- the rules for app boundaries, shared code, and cross-app exchange;
- the modularity rules that keep app growth from collapsing back into one shared runtime;
- and the testing and enforcement posture that protects those boundaries over time.

It does not own:

- app-specific product direction;
- detailed solver behavior;
- PDG ingest design beyond its place in the app architecture;
- or detailed file-migration inventories.

## Current State

- The codebase already has separate `composer.html` and `reaction.html` entrypoints.
- The main web app already launches those entrypoints from the scene network rather than treating everything as one runtime mode.
- Reaction now owns a meaningful standalone app shell and much of its app-specific composition.
- Composer now owns a meaningful app tree under `src/apps/composer/`, but too much live behavior still remains concentrated in `app.js`.
- The Composer/Reaction boundary is clearer than before; the main remaining structural debt is concentrated in oversized shared roots and broad coordinator files.
- The repository has the right overall direction, but the architecture still needs stronger enforcement so improvements do not drift back into shared-runtime coupling.
- Near-term work still has to run on two tracks at once: make the dedicated apps more useful, and keep improving seams so that usefulness does not come at the cost of tighter coupling.

## Design

### Overall Runtime Shape

The Architrino web app should be understood as one product with multiple dedicated runtimes.

The intended shape is:

- one repo;
- one main Architrino discovery surface;
- one Composer runtime;
- one Reaction runtime;
- and explicit data boundaries between those runtimes.

This is not a multi-product split. It is one product with a launcher/discovery layer and dedicated tools that open into their own app runtimes when the user enters them.

### Main Web App Role

The main web app should remain the sphere-based entry and discovery surface.

Its job is to:

- expose the scene network and discovery model;
- route users into dedicated apps when a scene or workflow calls for them;
- provide shared platform or shell infrastructure where that infrastructure is truly app-neutral;
- and stay out of app-specific domain behavior once a dedicated app is entered.

The main web app should not continue accumulating app-specific state or logic just because it was the original host.

### Dedicated App Role

Dedicated apps such as Composer and Reaction should be treated as standalone runtimes within the overall Architrino experience.

Each dedicated app should own:

- its own app composition;
- its own runtime state and UI behavior;
- its own domain logic and supporting modules;
- and its own import/export adapters at the app boundary.

Each dedicated app should avoid reaching back into another app's runtime for behavior that belongs behind an explicit data boundary.

### Cross-App Boundary Rule

The preferred boundary between dedicated apps is explicit versioned data, not shared live behavior.

Allowed sharing:

- repo, build, and deploy tooling;
- generic platform or shell infrastructure;
- static schemas and contract definitions;
- static catalogs as data when they are truly app-neutral;
- fixtures, example documents, and enforcement rules.

Not allowed:

- direct cross-app runtime imports;
- shared app-specific stores;
- shared app-specific overlay state;
- shared app-specific UI behavior;
- or hidden coupling through launcher-state assumptions.

When Composer and Reaction exchange information, the exchange should happen through a versioned contract rather than through shared executable helpers.

For the current Composer/Reaction split, the intended bridge remains `reaction-flow/v1`.

### Composition Roots And Ownership

Large top-level files may wire behavior together, but they should not own the behavior.

The architecture should keep moving toward:

- thin composition roots;
- focused modules with one job;
- explicit ownership of state, layout, rendering, interaction, import/export, validation, and persistence;
- and local module families under each app tree rather than app logic living in generic coordinators.

This applies especially to large shared-root hotspots such as `app.js` and to large collapsed subsystem files such as `ReactionSolverUiRuntime.js`.

### One Source Of Truth

Behaviorally meaningful facts should have one authoritative definition.

Do not duplicate:

- geometry and lane layout;
- anchor semantics;
- mapping-validity rules;
- contract structure;
- or other stateful semantics across CSS assumptions, DOM inference, and duplicate JS heuristics.

If a value affects behavior, there should be one source of truth for that value.

### State And Contracts

State should be explicit.

Prefer:

- explicit stores and state builders;
- typed or structured document shapes;
- explicit import/export adapters;
- and data contracts that survive independent app evolution.

Avoid:

- closure-owned mutable registries;
- DOM-shape inference as a data source;
- or state that only exists because render order happened to create it.

### Why This Architecture Matters

The strongest reason for this architecture is change isolation.

If dedicated apps continue to run as one shared runtime, a local refactor in one tool can still leak into another through:

- shared boot order;
- shared state;
- shared DOM;
- shared imports;
- or a large shared composition root.

Independent app runtimes plus explicit contracts reduce that risk while keeping the whole system inside one coherent product.

This is why architectural cleanup is not optional follow-on work. It is part of feature delivery for this workstream.

## Interfaces

### Main Web App To Dedicated Apps

The main web app should hand off to dedicated apps through route, scene, or launch-level entrypoints rather than by embedding large amounts of app logic directly in the launcher runtime.

### Dedicated App To Dedicated App

Dedicated apps should talk through versioned data contracts.

For the current Composer/Reaction architecture, that means:

- Reaction owns conservative authoring and accepted output;
- Composer owns downstream staging and explanatory presentation;
- and the connection between them is explicit data rather than shared runtime logic.

### Shared Infrastructure Surface

Shared infrastructure should stay narrow and app-neutral.

Good shared surfaces:

- build and deploy tooling;
- platform shell utilities;
- schemas and fixtures;
- generic rendering or utility helpers that carry no app semantics;
- and enforcement scripts that protect boundaries.

Bad shared surfaces:

- app-specific stores;
- app-specific UI runtime helpers;
- app-specific catalogs that change behavior;
- or compatibility shims that become permanent architecture by accident.

### Cross-App Checks

The architecture should keep the following checks in place:

- forbidden cross-import checks;
- contract fixture validation;
- Reaction export tests;
- Composer import tests;
- and smoke tests proving each app boots independently.

## Priorities

### 1. Finish The Standalone App Cut-Over For Composer

Status: `active`

Current:

- standalone launch routing already exists for `composer` and `reaction_designer`;
- Reaction already boots through `src/apps/reaction/main.js`;
- but `src/apps/composer/main.js` still hands control back to `app.js`.

Objective:

- make the main web app a launcher and discovery surface only, with Composer and Reaction each owning their own runtime path.

### 2. Keep Cross-App Exchange Contract-First

Status: `active`

Current:

- `reaction-flow/v1` export/import runtimes, schemas, examples, and contract tests are already in place;
- Composer consumes the handoff without importing Reaction runtime code.

Objective:

- keep app-to-app exchange versioned and data-first as the contract grows.

### 3. Add Architectural Enforcement That Blocks Regressions

Status: `next`

Current:

- standalone launch tests, contract tests, and the Composer/Reaction boundary checker already exist;
- but the boundary checker is not part of the git-hook audit path.

Objective:

- make cross-import and shared-runtime backsliding harder to land than to avoid.

### 4. Reduce The Remaining Oversized Composition Roots

Status: `active`

Current:

- `app.js` is still about 7.1k lines;
- `ReactionCanvasUiRuntime.js` is still a 4.3k-line concentration point.

Objective:

- move app-owned behavior into smaller modules and leave composition roots with wiring only.

### 5. Keep New Work Landing In App-Owned Trees

Status: `pending`

Current:

- both apps now have substantial `src/apps/*` module families;
- Composer still relies more heavily on shared `src/runtime/` surfaces than Reaction does.

Objective:

- make ownership obvious in the codebase by defaulting new app behavior to the app tree, not the legacy shared root.

## Refactoring Guidance

### Avoiding A Refactoring Slog

Based on the way this codebase has already evolved, the most important way to avoid a refactoring slog is to keep the work directional and bounded.

Best practices:

- decide the target ownership first, so each move has an obvious destination rather than becoming one more temporary stop;
- move one responsibility cluster at a time instead of trying to "clean up everything" in one pass;
- keep composition roots thin while you refactor, rather than adding new behavior there because it feels convenient during the transition;
- add or preserve tests and contract fixtures before high-risk moves so the refactor has a visible safety rail;
- prefer explicit adapters, facades, and temporary re-exports over hidden compatibility behavior;
- keep temporary shims obviously temporary and delete them once callers migrate;
- avoid mixing app-boundary cleanup with unrelated behavior changes unless the two are tightly coupled;
- prefer small supervised extractions over giant codemod-style rewrites when state, rendering, and input behavior are involved;
- and keep one source of truth intact while moving code, instead of duplicating semantics across old and new homes "just for now."

The codebase tends to bog down when a refactor turns into broad anonymous movement. It tends to keep momentum when each pass has:

- one boundary being clarified;
- one cluster being moved;
- one set of tests proving the move;
- and one clear deletion target for temporary scaffolding afterward.

### When You Must Refactor

Refactoring is not always the first step, but it is required when leaving the code as-is would deepen the wrong architecture.

You should refactor when:

- a new feature would place app-owned logic back into a shared root such as `app.js`;
- a file that should be wiring-only is starting to accumulate domain behavior;
- the same geometry, mapping rule, or contract shape is about to be defined in two places;
- app ownership is obscured by compatibility naming or legacy wrapper layers;
- a cross-app interaction is starting to rely on shared runtime behavior instead of explicit data;
- or the next feature would be substantially harder to build or test without first extracting a clear seam.

You do not need a giant cleanup before every change. But you do need to refactor when skipping the refactor would harden the wrong boundary or make the next move materially messier.

### Migration Automation

Automation that is worth using for migration and restructuring:

1. inventory reports for routines still living in legacy shared roots.
2. dependency reports for extractions that still depend on shared globals.
3. wrapper or re-export generation where that reduces migration risk.
4. enforcement checks that catch backsliding into cross-app imports or growing shared roots.

### Supervised Migrations

Automation should stay supervised for the risky parts of the refactor.

Do not automate blindly when dealing with:

1. stateful render and pointer-interaction extractions.
2. changes that mix app globals with main-webapp globals.
3. final deletion of compatibility shims before all callers are proven migrated.

Practical order:

1. generate inventory and dependency reports first;
2. use scaffolding or re-export generation second where it helps;
3. perform the real extraction one responsibility cluster at a time;
4. then remove temporary compatibility layers once the new ownership is proven.

## Related Priorities

- [composer-reaction](./observer.md)
- [composer](./composer.md)
- [reaction](./reaction.md)
- [solver](./solver.md)
- [pdgfeed](./pdgfeed.md)
