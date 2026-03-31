# Composer / Reaction Independence

## Decision

Composer and Reaction should become separate applications that live in the same repo but do not execute each other's runtime code.

If they talk to each other, they should do so through one of these arm's-length boundaries:

- versioned JSON documents;
- explicit import/export APIs;
- or later, explicit HTTP or `postMessage` interfaces built on the same versioned contract.

The stability rule is simple:

- internal changes inside Composer must not affect Reaction;
- internal changes inside Reaction must not affect Composer;
- only contract changes are allowed to create cross-app impact.

## Why This Separation Matters

The current implementation couples the two apps too tightly:

- the `Reaction Designer` scene is currently just a mode inside the Composer overlay;
- the same DOM shell hosts both tools;
- the same top-level runtime decides when one turns into the other;
- and some lower-level catalogs and structure code are shared directly at runtime.

That makes unrelated edits risky. A UI or behavior change intended for one tool can leak into the other because the real boundary is implicit instead of contractual.

The new architecture should make the boundary explicit and enforceable.

## Architectural Rule

Composer and Reaction may share repository location, build tooling, and deployment pipeline, but they may not share live app logic.

That means:

- no direct imports from Composer runtime modules into Reaction runtime modules;
- no direct imports from Reaction runtime modules into Composer runtime modules;
- no shared overlay state;
- no scene jump that "turns one app into the other";
- no shared business-logic helper that both apps execute in-process;
- no shared UI component library for app-specific authoring behavior;
- no shared template catalog in executable JS if that catalog affects app behavior.

Allowed shared artifacts are deliberately narrow:

- static JSON schemas;
- static example documents and golden fixtures;
- API documentation;
- lint/build rules that enforce the boundary;
- and truly generic platform infrastructure with no app semantics.

If a behavior is part of Composer semantics or Reaction semantics, each app should own its own implementation.

## Preferred Target Architecture

Use three app surfaces:

1. a navigator app for the scene network;
2. a Composer app;
3. a Reaction app.

The navigator can still expose `Composer` and `Reaction Designer` as discoverable nodes, but those nodes should launch separate app entrypoints rather than toggle a shared overlay mode.

Preferred structure:

```text
src/apps/navigator/
src/apps/composer/
src/apps/reaction/
src/contracts/
content/contracts/examples/
```

Preferred entrypoints:

```text
composer.html
reaction.html
```

or equivalent separate bundle entry files if the build system prefers route-based entrypoints.

The important part is not the file naming. The important part is separate bootstraps, separate roots, and separate dependency graphs.

## Contract-First Boundary

The boundary between Reaction and Composer should be a versioned handoff document.

Reaction owns:

- authoring reactants, products, operators, mappings, provenance, and staged reaction intent;
- exporting a canonical `ReactionFlowDocument`;
- validating that exported document against a versioned schema.

Composer owns:

- importing a `ReactionFlowDocument`;
- translating that document into Composer's own authored scene model;
- storing Composer-native scene data;
- and rendering or editing the resulting animation scene.

Reaction should not emit Composer's internal scene JSON directly.

Composer should interpret the handoff contract and build its own internal representation from it.

That preserves independence because the apps exchange facts, not executable behavior.

## Required Contracts

### 1. `ReactionFlowDocument`

This is the main export from Reaction.

It should contain:

- document version;
- reaction metadata;
- participant definitions;
- operator definitions;
- mapping ledger;
- staged timing or stage ordering;
- provenance ids;
- optional layout hints;
- and optional semantic tags for Composer import policy.

Example shape:

```json
{
  "schema": "reaction-flow/v1",
  "reactionId": "beta_decay_001",
  "title": "Free Neutron Beta Reaction",
  "participants": [],
  "operators": [],
  "mappings": [],
  "stages": [],
  "provenance": {},
  "hints": {}
}
```

### 2. `ComposerImportResult`

Composer should expose an import boundary that returns a deterministic result.

It should report:

- imported scene id;
- warnings;
- rejected features;
- fallback behaviors used;
- and contract version consumed.

Example shape:

```json
{
  "schema": "composer-import-result/v1",
  "sourceSchema": "reaction-flow/v1",
  "sceneId": "beta_decay_scene",
  "warnings": [],
  "fallbacks": []
}
```

### 3. Static Schema Files

Put schemas in a neutral contract location such as:

```text
src/contracts/reaction-flow/v1/schema.json
src/contracts/composer-import-result/v1/schema.json
```

These schema files are data, not runtime logic.

Each app should validate with its own local validation path rather than importing shared business logic from the other app.

## Ownership Model

Composer owns:

- scene-tree editing;
- path and observer authoring;
- overlays, media, timing, and export;
- Composer scene JSON;
- Composer-native template handling;
- Composer-native structure editing.

Reaction owns:

- reaction participants and operators;
- mapping grammar and conservation rules;
- solver behavior;
- provenance ledgers;
- reaction-specific structure interpretation;
- Reaction flow JSON export.

Contract ownership:

- shared only at the schema and example-document level;
- versioned explicitly;
- reviewed as an API boundary, not as internal refactor noise.

## What Must Be Removed From The Current Design

The following coupling patterns should be eliminated:

- `reaction_designer` being treated as a Composer overlay scene;
- Reaction controls living inside the Composer overlay shell;
- direct scene jumps between Composer mode and Reaction mode as if they were one app;
- direct runtime sharing such as template-menu rows and app-specific authoring helpers;
- direct reuse of app-specific structure bridges across both apps.

If both apps need the same conceptual particle or structure facts, move those facts into static versioned data and let each app interpret that data independently.

Do not keep one implementation and let both apps execute it.

## Design Rule For Shared Facts

There are some facts that may reasonably need one canonical source:

- schema definitions;
- static particle-template data;
- static enum-like vocabularies;
- fixture documents.

If those facts are shared, they should be shared as static data only.

Good:

- `particle-template-catalog.v1.json`
- `reaction-flow/v1/schema.json`
- `fixtures/reaction/free_neutron_beta.v1.json`

Bad:

- `ComposerCatalogRuntime.js` imported by both apps
- `ComposerAssemblyStructureBridgeRuntime.js` imported by both apps
- one app calling the other's mapper, solver, renderer, or importer directly

## Migration Plan

### Phase 1. Freeze The Boundary

Create the design boundary before moving code.

Deliverables:

- this architecture decision documented;
- versioned JSON schema location created;
- contract examples added;
- lint rule that forbids cross-imports between `src/apps/composer` and `src/apps/reaction`.

Acceptance criteria:

- no new direct dependencies are added across the future app boundary.

### Phase 2. Separate App Entrypoints

Create separate bootstraps and roots.

Deliverables:

- Composer app entrypoint;
- Reaction app entrypoint;
- navigator launch path to each app;
- removal of shared overlay-mode routing as the primary implementation.

Acceptance criteria:

- opening Composer does not boot Reaction code;
- opening Reaction does not boot Composer code.

### Phase 3. Move Reaction Into Its Own Tree

Move all Reaction-specific runtime ownership under `src/apps/reaction/`.

Deliverables:

- reaction shell;
- reaction state store;
- reaction solver UI composition root;
- reaction export API;
- reaction-local template catalog or reaction-local interpretation of shared static data.

Acceptance criteria:

- Reaction has no imports from Composer app modules.

### Phase 4. Move Composer Into Its Own Tree

Move all Composer-specific runtime ownership under `src/apps/composer/`.

Deliverables:

- composer shell;
- composer editor store;
- composer scene import path;
- composer-local template catalog or composer-local interpretation of shared static data.

Acceptance criteria:

- Composer has no imports from Reaction app modules.

### Phase 5. Introduce The Handoff Contract

Make the cross-app exchange real.

Deliverables:

- `ReactionFlowDocument` export from Reaction;
- Composer import adapter for `reaction-flow/v1`;
- import report output;
- golden test fixtures for import/export.

Acceptance criteria:

- Reaction can export a valid handoff file;
- Composer can import it without executing Reaction code.

### Phase 6. Remove Transitional Coupling

Delete the old in-process bridge.

Deliverables:

- remove shared overlay toggling;
- remove direct scene-mode switching that pretends the apps are one tool;
- remove cross-app imports;
- retire obsolete compatibility scaffolding.

Acceptance criteria:

- the only remaining connection is the explicit contract boundary.

## Stability Policy

After separation, changes should be classified like this:

- internal Composer change: no Reaction review needed unless contract behavior changes;
- internal Reaction change: no Composer review needed unless contract behavior changes;
- contract change: requires explicit version review and compatibility decision.

Preferred contract policy:

- additive backward-compatible changes may stay in the same major version;
- breaking changes require a new contract version such as `reaction-flow/v2`;
- Composer should keep importers for older stable versions as long as practical.

## Test And Enforcement Plan

The boundary should be enforced mechanically, not just socially.

Required checks:

- lint rule for forbidden cross-imports;
- contract fixture validation;
- Reaction export golden tests;
- Composer import golden tests;
- compatibility tests that prove Composer imports old stable Reaction documents;
- smoke tests proving each app can boot without the other bundle loaded.

## Recommended First Cuts

The first changes should be structural, not behavioral:

1. create `src/apps/composer/` and `src/apps/reaction/`;
2. move current app-specific boot logic into separate entry modules;
3. define `reaction-flow/v1` schema and one or two golden example files;
4. replace direct handoff assumptions with explicit export/import seams;
5. then start deleting shared runtime dependencies.

That order matters because it creates a stable seam before large code motion begins.

## Non-Goal

This separation does not require two repos.

One repo is fine.

The goal is two independent app runtimes with a versioned contract between them, not organizational theater.

## Bottom Line

Composer and Reaction should stop behaving like two modes of one tool.

They should behave like two separate authoring systems with different responsibilities:

- Reaction produces a canonical reaction-flow document.
- Composer consumes that document and builds a Composer scene from it.

They may live beside each other in the repo, but they should only touch through stable contracts.

## Related Action Items

- [composer](./composer.md)
- [reaction](./reaction.md)
- [composer-reaction](./composer-reaction.md)
- [pdg-solver](./pdg-solver.md)
- [swe](./swe.md)
