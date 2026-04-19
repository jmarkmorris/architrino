# pdgapps

## LLM Instructions

- Keep this document focused on the overall architectural approach for how the PDG workstream fits inside the broader Architrino web app.
- Keep `Design` descriptive and durable; move task-shaped work into `Priorities`.
- Prefer app-boundary rules, ownership, and runtime-structure guidance over file-by-file migration detail.
- Do not restate app-specific product design that belongs in [pdgsolve](pdgsolve.md), [pdgedit](pdgedit.md), or [pdgfeed](pdgfeed.md).
- Keep app-specific migration inventories in the owning app docs rather than turning this architecture note into a file-by-file tracker.

## Purpose

This document defines the overall architectural approach for incorporating the PDG workstream into the Architrino web app.

It owns:

- the role of the main Architrino web app as launcher and discovery surface;
- the role of dedicated web apps such as `pdgedit` as independent runtimes within one repo;
- the role of adjacent non-UI PDG boundaries such as `pdgfeed` and `pdgsolve` within the same forward pipeline;
- the rules for app boundaries, shared code, and cross-app exchange;
- the modularity rules that keep growth from collapsing back into one shared runtime;
- and the testing and enforcement posture that protects those boundaries over time.

It does not own:

- app-specific product direction;
- detailed solver behavior;
- PDG ingest design beyond its place in the app architecture;
- or detailed file-migration inventories.

## Current State

- The codebase still has `pdgedit.html` as a standalone entrypoint in-repo, but the main Architrino web surface no longer exposes launcher routes into archived PDG tools; `pdgsolve` intentionally remains a Python and contract boundary without a standalone UI.
- `pdgedit` now owns a meaningful app tree under `src/apps/pdgedit/`, and root `app.js` has been thinned to entry glue.
- The forward architectural split is now clearer in docs: `pdgfeed -> pdgsolve -> pdgedit`.
- The main remaining structural debt is concentrated in oversized shared roots, broad coordinator files, and migration-era assumptions that still reflect older shared-runtime thinking.
- The repository has the right overall direction, but the architecture still needs stronger enforcement so improvements do not drift back into shared-runtime coupling.
- Near-term work still has to run on two tracks at once: make the dedicated authored-surface app more useful, and keep improving seams so that usefulness does not come at the cost of tighter coupling.

## Design

### Overall Runtime Shape

The Architrino web app should be understood as one product with a dedicated authored-surface runtime plus adjacent non-UI PDG boundaries.

The intended structure is:

- one repo;
- one main Architrino discovery surface;
- one `pdgedit` runtime;
- `pdgfeed` and `pdgsolve` as contract-first CLI boundaries in the same chain;
- and explicit data boundaries between those stages.

This is not a multi-product split. It is one product with a launcher and discovery layer, a dedicated web tool that opens into its own runtime when the user enters it, and upstream PDG boundaries that stay outside the browser runtime.

### Main Web App Role

The main web app should remain the sphere-based entry and discovery surface.

Its job is to:

- expose the scene network and discovery model;
- route users into dedicated apps when a scene or workflow calls for them;
- provide shared platform or shell infrastructure where that infrastructure is truly app-neutral;
- and stay out of app-specific domain behavior once a dedicated app is entered.

The main web app should not continue accumulating app-specific state or logic just because it was the original host.

### Dedicated App Role

Dedicated web apps such as `pdgedit` should be treated as standalone runtimes within the overall Architrino experience.

Each dedicated web app should own:

- its own app composition;
- its own runtime state and UI behavior;
- its own domain logic and supporting modules;
- and its own import or export adapters at the app boundary.

Each dedicated web app should avoid reaching back into another app's runtime for behavior that belongs behind an explicit data boundary.

Adjacent non-UI boundaries such as `pdgfeed` and `pdgsolve` should follow the same ownership rule on the data side:

- own their own CLI behavior and contract logic;
- avoid becoming hidden browser runtimes by accident;
- and hand off only explicit versioned data to downstream apps.

Boundary translation should usually live inside the component that owns that boundary rather than becoming a new middle app by default.

In particular:

- upstream components may translate higher-scale composite language into explicit assembly-native request data before that data reaches `pdgsolve`;
- downstream publication components may translate explicit accepted assemblies into grouping or composite display language after `pdgsolve` finishes;
- and `pdgsolve` core should not absorb either translation job.

### Cross-App Boundary Rule

The preferred boundary between dedicated apps and adjacent PDG boundaries is explicit versioned data, not shared live behavior.

Allowed sharing:

- repo, build, and deploy tooling;
- generic platform or shell infrastructure;
- static schemas and contract definitions;
- static catalogs as data when they are truly app-neutral;
- request manifests and test cases that stay on the data side of the seam;
- test cases, example documents, and enforcement rules.

Not allowed:

- direct cross-app runtime imports;
- shared app-specific stores;
- shared app-specific overlay state;
- shared app-specific UI behavior;
- or hidden coupling through launcher-state assumptions.

When dedicated apps exchange information, or when `pdgsolve` hands published output to `pdgedit`, the exchange should happen through a versioned contract rather than through shared executable helpers.

For the intended forward solve and publication chain:

- `pdgfeed` emits explicit upstream request data and owns upstream composite-to-assembly translation for PDG-facing terms;
- `pdgsolve` owns solve, review, acceptance, and publication;
- `pdgedit` owns final `pdgedit/v1` documents, direct authored-surface editing, and downstream visual grouping effects in that document family;
- and the connections between them are explicit data rather than shared runtime logic.

### Boundary Translation Ownership

The preferred pattern is boundary translators and adapters, not extra dedicated apps inserted into the middle of the chain.

That means:

- if a higher-scale description such as `neutron`, `proton`, or another composite term needs to become explicit assemblies, that translation belongs to the upstream boundary owner;
- if explicit accepted assemblies later need to reappear as composite labels or spans, that translation belongs to the downstream publication owner;
- and dedicated new apps should be added only when the translation step itself becomes a substantial operator-facing workflow with its own independent review or runtime needs.

So the default answer is not "add a composite app between `pdgfeed` and `pdgsolve`."

The default answer is:

- keep the existing workstream chain;
- sharpen the versioned contracts;
- and keep translation modules and review surfaces with the component that already owns the relevant seam.

### Composition Roots And Ownership

Large top-level files may wire behavior together, but they should not own the behavior.

The architecture should keep moving toward:

- thin composition roots;
- focused modules with one job;
- explicit ownership of state, layout, rendering, interaction, import or export, validation, and persistence;
- and local module families under each app tree rather than app logic living in generic coordinators.

This applies especially to large shared-root hotspots such as `app.js`.

### One Source Of Truth

Behaviorally meaningful facts should have one authoritative definition.

Do not duplicate:

- geometry and stage layout;
- anchor semantics;
- mapping-validity rules;
- contract structure;
- or other stateful semantics across CSS assumptions, DOM inference, and duplicate JS heuristics.

If a value affects behavior, there should be one source of truth for that value.

### State And Contracts

State should be explicit.

Prefer:

- explicit stores and state builders;
- typed or structured document structures;
- explicit import or export adapters;
- and data contracts that survive independent app evolution.

Avoid:

- closure-owned mutable registries;
- DOM-structure inference as a data source;
- or state that only exists because render order happened to create it.

### Why This Architecture Matters

The strongest reason for this architecture is change isolation.

If dedicated workstream components continue to run as one shared runtime, a local refactor in one tool can still leak into another through:

- shared boot order;
- shared state;
- shared DOM;
- shared imports;
- or a large shared composition root.

Independent runtimes plus explicit contracts reduce that risk while keeping the whole system inside one coherent product.

This is why architectural cleanup is not optional follow-on work. It is part of feature delivery for this workstream.

## Interfaces

### Main Web App To Dedicated Apps

The main web app should hand off to dedicated apps through route, scene, or launch-level entrypoints rather than by embedding large amounts of app logic directly in the launcher runtime.

### Dedicated App To Dedicated App

Dedicated components should talk through versioned data contracts.

For the intended `pdgfeed -> pdgsolve -> pdgedit` architecture, that means:

- `pdgfeed` owns explicit upstream request data;
- `pdgsolve` owns accepted solve state and publication;
- `pdgedit` owns the final authored-surface document boundary and downstream visual grouping effects in that document family;
- app-to-app exchange happens through explicit versioned data;
- and app-specific runtime behavior stays local to the owning app.

### Shared Infrastructure Surface

Shared infrastructure should stay narrow and app-neutral.

Good shared surfaces:

- build and deploy tooling;
- platform shell utilities;
- schemas and test cases;
- generic rendering or utility helpers that carry no app semantics;
- and enforcement scripts that protect boundaries.

Bad shared surfaces:

- app-specific stores;
- app-specific UI runtime helpers;
- app-specific catalogs that change behavior;
- checked-in generated solved app-state catalogs when the intended boundary is a runtime request or result seam;
- or compatibility shims that become permanent architecture by accident.

### Cross-App Checks

The architecture should keep the following checks in place:

- forbidden cross-import checks;
- contract validation for test cases;
- `pdgsolve` publication-contract tests;
- `pdgedit` document validation tests;
- and smoke tests proving `pdgedit` boots independently.

## Priorities

### 1. Keep Cross-App Exchange Contract-First

Status: `active`

Current:

- explicit app-boundary contracts already exist for the `pdgfeed -> pdgsolve -> pdgedit` chain;
- and `pdgedit` already consumes published handoff data without importing upstream runtime code.

Objective:

- keep component exchange versioned and data-first as the contract grows.

### 2. Reduce The Remaining Oversized Composition Roots

Status: `active`

Current:

- root `app.js` is now thin;
- but some runtime concentration is still larger than the intended long-term boundaries.

Objective:

- move app-owned behavior into smaller modules and leave composition roots with wiring only.

### 3. Keep New Work Landing In App-Owned Trees

Status: `pending`

Current:

- the dedicated authored-surface app now has a substantial `src/apps/pdgedit/` module family;
- but new work can still drift toward generic shared roots if ownership is not enforced.

Objective:

- make ownership obvious in the codebase by defaulting new app behavior to the app tree, not the legacy shared root.

## Refactoring Guidance

### Avoiding A Refactoring Slog

Based on the way this codebase has already evolved, the most important way to avoid a refactoring slog is to keep the work directional and bounded.

Best practices:

- decide the target ownership first, so each move has an obvious destination rather than becoming one more temporary stop;
- move one responsibility cluster at a time instead of trying to clean up everything in one pass;
- keep composition roots thin while you refactor, rather than adding new behavior there because it feels convenient during the transition;
- add or preserve tests and contract test cases before high-risk moves so the refactor has a visible safety rail;
- prefer explicit adapters, facades, and temporary re-exports over hidden compatibility behavior;
- keep temporary shims obviously temporary and delete them once callers migrate;
- avoid mixing app-boundary cleanup with unrelated behavior changes unless the two are tightly coupled;
- prefer small supervised extractions over giant codemod-style rewrites when state, rendering, and input behavior are involved;
- and keep one source of truth intact while moving code, instead of duplicating semantics across old and new homes just for now.

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
- the same geometry, mapping rule, or contract structure is about to be defined in two places;
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

- [pdg](pdg.md)
- [pdgsolve](pdgsolve.md)
- [pdgedit](pdgedit.md)
- [pdgfeed](pdgfeed.md)
