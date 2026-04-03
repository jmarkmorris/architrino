# Composer

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep Composer focused on staging, observer work, overlays, playback, and scene output.
- Do not restate solver internals or PDG-ingest plans here except where Composer must interface with them.
- Keep cross-app handoff details brief here and prefer the contract-owning document when it exists.
- Keep cross-cutting app-boundary and modularity doctrine in [app-architecture](./app-architecture.md); keep only Composer-specific seams and boundaries here.

## Purpose

The composer is the animation authoring surface for visualizing architrino assemblies.

Its job is to turn solved reaction flow and authored scene material into a staged scene with:

- assemblies and paths;
- reaction timing;
- observer motion and framing;
- overlays and supporting media;
- playback behavior;
- and repo-ready scene output.

It owns:

- spatial staging and choreography;
- observer-facing framing and autoscale behavior;
- explanatory overlays and media presentation;
- scene editing, preview, persistence, and export;
- and the final authored visual language of the composed scene.

It does not own:

- low-level reaction solving;
- PDG channel ingest;
- or live cross-app runtime behavior with Reaction.

## Current State

- The composer already has a substantial runtime surface rather than a placeholder shell.
- It can build a canonical scene document, generate preview scene data, export JSON, save browser-local drafts, and download repo-ready scene JSON.
- The main runtime already exposes scene-tree, path, orbit, preview, and export-style workflows through the composer overlay.
- The timeline already supports pause, warp, image, video, and graphic items.
- `Audio` and `Observer` already appear in the add menu, but those paths are still placeholder authoring blocks rather than fully implemented timeline objects.
- User-facing language has started shifting toward `Observer`, but the underlying document path still uses `cameraPaths` and `cameraShots`.
- `ComposerViewportFramingRuntime.js` already normalizes shot framing, required versus optional assembly participation, and autoscale target selection.
- A first-pass autoscale behavior already exists in code, but the authored framing UI is still missing.
- A canonical structure bridge exists, and a narrow live mutation path exists for `Split Group`, but composer-side structural editing is still incomplete.
- The composer can now ingest a versioned Reaction-owned handoff document, preserve imported transfer and stage data, and instantiate a staged reaction scene from it.
- The `reaction-flow/v1` intake now round-trips imported transfer ids and stage markers and keeps the Composer side of the bridge data-first.
- The current import and contract coverage is still centered on the baseline reaction-flow fixture, so downstream particle-family-specific coverage remains thinner than the upstream Reaction and solver tests.

## Design

### Role In The Scene System

The composer should not replace the current explicit scene network. It should add an authored composed-scene type within it.

That means:

- higher-level collection or index scenes can still point to composed scenes;
- opening a composed scene should enter a dedicated composed-animation runtime rather than a markdown reader;
- composed scenes should remain part of the normal scene network and manifest pipeline;
- and their content should be driven by authored animation data rather than by the normal scene-plus-markdown contract alone.

### Authoring Stance

The composer should remain an overlay editor controlling a live 3D viewport.

The intended authoring grammar is:

- the live canvas is the primary authoring surface;
- assembly-specific actions happen from the assembly itself where practical;
- path-specific authoring happens from path points or local canvas interactions;
- persistent side panels should keep shrinking toward scene-level control only;
- transport and playback controls should stay compact and timeline-adjacent;
- and import/export should remain canonical JSON rather than ad hoc UI state.

The composer should stay visual and canvas-first rather than turning back into a large inspector-driven tool.

### Observer And Framing Model

The composer should speak in observer language rather than camera language at the author-facing layer.

The target model is:

- the central viewport is the live observer view;
- a shot is an observer interval with teaching intent;
- observer intervals can carry framing intent and synchronized observer-path behavior;
- assemblies can be marked `required` or `optional` for viewport participation;
- interval-level framing overrides can refine those defaults;
- and autoscale should respond to authored framing intent rather than just "fit everything."

The implementation may still use camera objects internally, but the author-facing model should consistently present observer behavior.

### Media And Overlay Boundary

The current narrow media boundary should remain explicit.

Supported formats for this phase:

- images: `jpg`, `jpeg`, `png`, `svg`;
- video: `mp4`, `mov`;
- audio: `mp3`.

The current implementation should not broaden into `webp`, `webm`, `aac`, or `m4a` during this pass.

Imported media should live in:

- `content/assets/composer/images/`
- `content/assets/composer/video/`
- `content/assets/composer/audio/`

For the current design:

- image and video are viewport overlays rather than scene-space geometry;
- overlays are visible only during their authored timeline spans;
- overlays are directly draggable and resizable in observer view;
- and explanatory overlays should extend the current small language of callout text, leader lines, and attachment to assemblies or path points.

### Visual Grammar

The composer should behave like a unified authoring instrument built from the core architrino visual grammar rather than like a generic media editor.

The canonical rendered primitive set should remain small:

- sphere;
- path;
- orbit or shell trace;
- ellipse or ellipsoid guide;
- callout leader;
- text label.

Preferred reveal order:

1. sphere-like proxy at coarse scale;
2. reveal path when motion matters;
3. reveal orbit or shell trace when repeated structure matters;
4. reveal constituent spheres and local paths when constitution matters.

Preferred viewport rendering stack:

1. background field;
2. path and orbit traces;
3. sphere bodies and sphere-like proxies;
4. shell and ellipsoid guides;
5. callout leaders;
6. text labels.

### Structure Editing Direction

The canonical-structure bridge is the right direction of travel for deeper Composer editing.

That means:

- extend the existing read path into more viewport and editor surfaces;
- move real mutation paths onto shared structure transforms rather than bespoke composer-only logic;
- make parent and child nesting read as local structure rather than grouped ids alone;
- keep free architrinos as outputs of structure-changing edits rather than top-level add-menu stamps;
- and continue expanding richer structure depiction only after the canonical edit path is in place.

## Interfaces

### Inputs

- authored scene documents and local drafts;
- assembly, path, and timing data authored directly in Composer;
- imported reaction-flow handoff data from Reaction;
- and referenced media assets for overlays and editorial material.

### Outputs

- canonical composed scene documents;
- preview scene data and browser-local drafts;
- repo-ready scene JSON exports;
- and authored observer/framing/overlay state suitable for playback and publication.

### Upstream And Downstream Boundaries

Composer should consume a versioned Reaction-owned handoff document and translate it into Composer-owned scene state.

Composer should not:

- solve the reaction again;
- import Reaction runtime code to perform the handoff;
- or depend on shared live UI state across the Composer/Reaction boundary.

The Composer-side intake should be strong enough to receive:

- participant identities and roles;
- solved mapping corridors or equivalent provenance paths;
- stage timing such as dissociate, transit, and associate / reassembly intervals;
- observer hints such as initial framing targets or flyby anchors;
- and labels or overlays needed to explain the reaction.

### Neighboring Components

- [reaction](./reaction.md) owns the conservative authoring workflow that feeds Composer.
- [solver](./solver.md) owns Reaction-side solve logic and should remain upstream.
- [pdgfeed](./pdgfeed.md) is future upstream seed/proposal work and should stay outside Composer runtime concerns.
- [app-architecture](./app-architecture.md) owns the app-boundary rule that keeps the handoff explicit.
- [app-architecture](./app-architecture.md) owns the cross-cutting app-boundary and modularity discipline.

## Priorities

### 1. Finish The Composer-Owned Runtime Cut-Over From `app.js`

Status: `active`

Current:

- `src/apps/composer/` now covers import, draft state, document workspace, playback, pointer, viewport, and authoring runtimes;
- but `src/apps/composer/main.js` still imports `app.js`, and `app.js` still holds substantial Composer behavior at about 7.1k lines.

Objective:

- leave `app.js` as thin shell glue and give Composer a fully app-owned bootstrap/runtime path.

### 2. Finish Authored Observer Framing And Autoscale UI

Status: `active`

Current:

- framing normalization, required/optional assembly targeting, autoscale math, and Reaction observer-hint import are already live;
- but there is still no compact author-facing UI for editing that model.

Objective:

- let authors set and inspect observer framing intent directly instead of relying on defaults and imported hints.

### 3. Replace Placeholder `Observer` And `Audio` Timeline Blocks

Status: `next`

Current:

- the timeline menu still inserts placeholder `Observer` and `Audio` blocks instead of real authored objects.

Objective:

- turn `Observer` into a true timeline object and either implement `Audio` or remove its placeholder path until it is real.

### 4. Expand Contract-Driven Import Coverage For Downstream Reaction Content

Status: `next`

Current:

- Composer already consumes `reaction-flow/v1`, and the neutron baseline is covered by schema and import tests;
- downstream coverage is still thin for mesons and newer assemblies such as `Noether Pair`.

Objective:

- prove that Composer stays a pure contract consumer as upstream particle and assembly coverage grows.

### 5. Move More Editing Onto Canonical Structure Transforms

Status: `pending`

Current:

- Composer can already carry imported `structureKey` and stage data, and a narrow canonical edit path exists;
- more authoring flows still depend on Composer-local mutations.

Objective:

- make structure reads and edits share one canonical model so nesting, scale, and transfer staging stay coherent.

## Related Priorities

- [composer-reaction](./observer.md)
- [reaction](./reaction.md)
- [solver](./solver.md)
- [pdgfeed](./pdgfeed.md)
- [app-architecture](./app-architecture.md)
- [viewports](../viewports/viewports.md)
- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)

## Related AAA Notes

- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
