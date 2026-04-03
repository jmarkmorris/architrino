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

### 1. Finish Authored Framing And Autoscale UI

Status: `active`

Goal:

- finish the authored viewport-framing model around required versus optional assemblies and interval-level overrides.

Why it matters:

- observer framing is one of Composer's core teaching surfaces, and the runtime groundwork already exists.

Next steps:

- expose authored framing state in a compact observer/viewport UI;
- keep autoscale focused on the required set rather than "everything";
- and preserve author control over framing intent.

### 2. Replace Placeholder Observer Timeline Blocks

Status: `pending`

Goal:

- turn `Observer` into a true timeline item with authored spans, observer-path behavior, and framing intent.

Why it matters:

- the author-facing observer model is ahead of the actual timeline object model.

Next steps:

- define one concrete observer object model shared across the design view and observer path;
- finish observer transitions and framing behavior;
- and keep visible observer-language cleanup moving forward.

### 3. Move More Editing Onto Canonical Structure Transforms

Status: `pending`

Goal:

- keep migrating real editing paths onto the canonical structure model rather than composer-only mutations.

Why it matters:

- deeper Composer editing becomes more coherent and maintainable when structure reads and mutations share one model.

Next steps:

- move at least one additional real mutation path onto shared transforms;
- extend structure summaries into more viewport/editor surfaces;
- and keep scale and nesting behavior legible in-scene.

### 4. Keep New Composer Logic Out Of The Composition Root

Status: `pending`

Goal:

- keep new reaction-import, observer, and editorial logic in focused Composer runtimes rather than a growing coordinator.

Why it matters:

- Composer still carries too much structural debt in large top-level wiring paths.

Next steps:

- keep framing logic, editorial behavior, and any remaining handoff-adjacent logic in focused modules;
- keep the composition root thin;
- and use [app-architecture](./app-architecture.md) for the cross-cutting enforcement standard.

### 5. Retire Remaining Composer State And Authoring Logic From `app.js`

Status: `active`

Goal:

- move the remaining Composer draft, selection, transfer, and authoring helpers out of `app.js` and into Composer-owned runtimes.

Why it matters:

- Composer still depends too much on a shared composition root for app-owned state and authoring behavior.

Progress update:

- Composer draft-state, authoring-state, viewport-display, and assembly-label runtimes now exist under `src/apps/composer/`, and the matching helper blocks have been removed from `app.js`.
- The remaining Composer debt in `app.js` is still large, but it is concentrated rather than evenly spread: about 205 Composer-named routines remain, totaling about 6.4k LOC, with the top 20 routines accounting for about 2.8k LOC.
- Current estimate: about 5.0k-5.8k LOC still look worth extracting into Composer-owned runtimes, while about 0.6k-1.4k LOC likely remain acceptable as thin composition-root glue after the larger migrations land.

Next steps:

- keep the new state/authoring runtimes stable and avoid reintroducing direct store wrappers into `app.js`;
- treat items 6 and 7 as batch extractions rather than one helper at a time;
- prioritize the largest remaining seams first so each pass removes hundreds of lines instead of dozens;
- and leave only thin launch, wiring, and cross-runtime glue in `app.js` once the larger Composer-owned families have moved.

### 6. Extract Composer Viewport Geometry, Assets, And Authoring Modules

Status: `active`

Goal:

- continue extracting Composer-owned geometry, asset, observer-path, and inspector logic into focused modules.

Why it matters:

- these behaviors are clearly Composer-owned, but too many of them are still grouped together in broad legacy surfaces.

Progress update:

- Composer render-asset builders for textures, sprites, and overlay text now live in a dedicated Composer render-assets runtime rather than inlined inside `app.js`.
- Composer orbit/member/anchor math, member-anchor state, path/base-position sampling, and autoscale geometry helpers now live in a dedicated Composer structure-geometry runtime rather than inlined inside `app.js`.
- Composer camera/path authoring now lives in a dedicated camera-path runtime, and assembly editor plus hover-inspector behavior now live in a dedicated assembly-inspector runtime rather than inlined inside `app.js`.
- The remaining work in this item is now mostly the broader canvas/playback/interaction stack rather than the already-separated geometry, asset, camera-path, and inspector seams.

Next steps:

- keep those new camera-path and inspector seams stable while the remaining viewport stack moves out;
- start item 7 extractions with the path-point info pill and related overlay helpers;
- and keep `app.js` changes to wiring only as those focused runtimes land.

### 7. Split The Remaining Composer Canvas, Playback, And Interaction Stack

Status: `active`

Goal:

- break the remaining large Composer viewport stack into explicit runtime families instead of one broad canvas-heavy surface.

Why it matters:

- viewport render, playback, menus, media overlays, and pointer interaction are still a major concentration of Composer structural debt.

Progress update:

- The path-point info pill now lives in a dedicated Composer viewport-overlay-pill runtime rather than inlined inside `app.js`.
- Composer pointer-hit resolution now lives in a dedicated Composer pointer-hit runtime rather than inlined inside `app.js`.
- Composer pointer, drag, hover, wheel, and timeline-context interaction handling now live in a dedicated Composer pointer-interaction runtime rather than inlined inside `app.js`.
- Composer canvas bootstrap now lives in a dedicated Composer canvas-bootstrap runtime rather than inlined inside `app.js`.
- Composer playback, playhead, marker navigation, timeline rendering, and viewport-mode transport logic now live in a dedicated Composer playback-timeline runtime rather than inlined inside `app.js`.
- Composer canvas resize, frame-scale, observer-camera, and render-loop wiring now live in a dedicated Composer viewport-render runtime rather than inlined inside `app.js`.
- `app.js` is now down to about 7.1k lines, so the remaining structural debt is increasingly concentrated in a smaller set of larger viewport-facing seams.
- The remaining work in this item is now mostly the viewport visuals, media-overlay, and canvas-menu stack rather than the already-separated playback, bootstrap, pointer, and render loops.
- A refresh-time white flash still appears intermittently before the scene populates, so the remaining viewport/bootstrap work also needs a first-paint audit rather than only structural extraction.

Next steps:

- take the next larger pass through viewport visuals and media overlays so the next turn can remove another substantial chunk from `app.js`;
- move canvas/menu behavior into a Composer canvas-menu shell runtime once the viewport-visuals boundary is settled;
- trace and eliminate the refresh-time white flash so Composer and Reaction hold a stable dark first paint on browser reload;
- keep scene glue thin until the end;
- and flatten the Composer canvas framing so the canvas uses the full available area without redundant nested frames.

### 8. Accept Meson-Bearing Reaction Structures From Reaction

Status: `pending`

Goal:

- make sure downstream Composer import and display paths can accept accepted meson-bearing Reaction output without adding Composer-owned particle logic that belongs upstream.

Why it matters:

- pion, kaon, and first-pass B-meson support already exist upstream in Reaction export and solver coverage, but Composer-side downstream checks are still sparse;
- neutral authored variants such as `upi0` / `dpi0`, `dk0` / `sk0`, and `dB0` / `bB0` need to stay legible after handoff even when some upstream solve paths treat them as closure-equivalent families or closely related mesons;
- and adding this explicitly now keeps downstream expectations aligned with the current upstream particle-vocabulary expansion.

Required particle content:

- accepted `pi+` structures based on `u + anti-d`;
- accepted `pi-` structures based on `d + anti-u`;
- accepted `pi0` structures based on either `u + anti-u` or `d + anti-d`, with both remaining display-valid downstream;
- accepted `K+` structures based on `u + anti-s`;
- accepted `K-` structures based on `s + anti-u`;
- accepted `dk0` structures based on `d + anti-s`;
- accepted `sk0` structures based on `s + anti-d`, with the neutral pair staying visually distinguishable downstream;
- accepted `B+` structures based on `u + anti-b`;
- accepted `B-` structures based on `b + anti-u`;
- accepted `dB0` structures based on `d + anti-b`;
- and accepted `bB0` structures based on `b + anti-d`, with the neutral pair staying visually distinguishable downstream.

Next steps:

- add downstream handoff/import checks for pion-, kaon-, and B-bearing `reaction-flow/v1` documents rather than relying only on the baseline neutron fixture;
- keep meson rendering, labels, and neutral-pair distinction data-driven from accepted upstream output rather than Composer-local particle policy;
- confirm that Composer accepts those downstream contracts without runtime coupling back into Reaction or solver internals;
- and keep Composer as a consumer of accepted upstream meson output rather than a second particle-authoring surface.

## Related Priorities

- [composer-reaction](./observer.md)
- [reaction](./reaction.md)
- [solver](./solver.md)
- [pdgfeed](./pdgfeed.md)
- [app-architecture](./app-architecture.md)
- [viewports](../viewports/viewports.md)
- [cruft-sprawl](../cruft-sprawl/cruft-sprawl.md)

## Related AAA Notes

- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../content/markdown/aaa/archie/navigation-and-controls.md)
