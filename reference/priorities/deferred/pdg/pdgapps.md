# pdgapps

## LLM Instructions

- Keep this document focused on the deferred architecture of the PDG workstream inside the broader Architrino web app.
- Keep it descriptive and durable rather than queue-shaped.
- Prefer ownership rules, boundary rules, and verification rules over migration-era detail.
- Do not restate app-specific product design that belongs in [pdgsolve](pdgsolve.md), [pdgedit](pdgedit.md), or [pdgfeed](pdgfeed.md).

## Purpose

This document records the architectural rules that still matter for the deferred PDG workstream.

It owns:

- the role of the main Architrino web app as launcher and discovery surface;
- the role of `pdgedit` as the dedicated authored-surface runtime within this deferred chain;
- the role of `pdgfeed` and `pdgsolve` as adjacent non-UI boundaries;
- the rules for explicit stage boundaries, shared code, and cross-stage exchange;
- and the testing posture that protects those boundaries if the workstream is ever resumed.

It does not own:

- app-specific UI design;
- solver-core semantics;
- PDG ingest internals beyond their place in the architecture;
- or a live refactoring queue.

## Deferred State

- `pdgedit` remained the dedicated web runtime in this chain.
- `pdgfeed` and `pdgsolve` remained CLI-and-contract boundaries rather than browser runtimes.
- The main Architrino web surface no longer routed archived PDG tools through the active launcher.
- Shared contracts, examples, and tests remained the baseline seam between stages.
- The main architectural risk left at deferral time was backsliding into shared-root coupling if work resumed casually.

## Design

### Overall Runtime Shape

The PDG workstream should still be understood as one deferred chain with explicit stage boundaries:

- one upstream ingest boundary, `pdgfeed`;
- one solve, acceptance, and publication boundary, `pdgsolve`;
- one final authored-surface runtime, `pdgedit`;
- and one shared contract surface between them.

This is not a multi-product split. It is one deferred workstream preserved inside one repo.

### Main Web App Role

The main Architrino web app should remain a launcher and discovery surface.

Its job is to:

- expose the broader scene and navigation system;
- hand off to dedicated tools through explicit routes or entrypoints when appropriate;
- provide truly app-neutral shell infrastructure;
- and stay out of PDG-specific runtime behavior.

### Dedicated App And Boundary Roles

`pdgedit` owns:

- its own runtime state and UI behavior;
- its own domain logic;
- and its own import/export behavior at the authored-surface boundary.

`pdgfeed` and `pdgsolve` own:

- their own CLI behavior;
- their own contract logic;
- and their own side of the upstream/downstream data seams.

No stage should reach into another stage's runtime for behavior that belongs behind an explicit contract.

### Cross-Stage Boundary Rule

The preferred seam is explicit versioned data, not shared live behavior.

Allowed sharing:

- repo, build, and deploy tooling;
- app-neutral shell infrastructure;
- schemas, examples, and test cases;
- and generic helpers that carry no PDG-stage semantics.

Not allowed:

- direct cross-app runtime imports across the stage boundary;
- shared app-specific stores;
- shared app-specific UI state;
- or hidden launcher-state assumptions that substitute for contracts.

### Translation Ownership

Boundary translation belongs to the stage that owns the boundary:

- upstream translation from PDG-facing language into explicit assemblies belongs upstream of `pdgsolve`;
- downstream translation from explicit accepted assemblies into grouping or display language belongs downstream of `pdgsolve`;
- and `pdgsolve` core should remain assembly-native rather than absorbing either translation job.

### Shared Infrastructure Rule

Shared infrastructure should stay narrow and app-neutral.

Good shared surfaces:

- schemas and test cases;
- build and deploy tooling;
- generic rendering or utility helpers with no PDG-stage semantics;
- and enforcement scripts that protect stage boundaries.

Bad shared surfaces:

- app-specific stores or runtime helpers;
- app-specific catalogs that silently change behavior;
- compatibility shims that hide ownership drift;
- or checked-in generated state that substitutes for the intended contract seam.

### Verification Rule

If the workstream is reactivated, protect the boundaries with:

- contract validation for examples and manifests;
- `pdgsolve` publication-contract tests;
- `pdgedit` document validation and boot tests;
- and any targeted boundary checks that prove the stages still boot and exchange data independently.

## Reactivation Rule

If work resumes:

- start by revalidating contracts, examples, and smoke tests;
- keep new behavior inside the owning app tree or CLI module rather than reopening shared roots;
- and add new translation logic at the boundary owner, not in the middle of the chain.

## Related Priorities

- [pdg](pdg.md)
- [pdgsolve](pdgsolve.md)
- [pdgedit](pdgedit.md)
- [pdgfeed](pdgfeed.md)
