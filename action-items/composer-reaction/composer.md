# Composer

## Purpose

The composer is the final animation surface in this workstream.

Its job is to take a solved reaction flow and turn it into an authored scene with:

- assemblies and paths;
- staged reaction timing;
- observer flybys;
- overlays and supporting media;
- and autoscale rules that keep the required assemblies in view.

The composer is not just a scene-layout utility. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it is the authoring layer for explicit assembly geometry, transport paths, reaction choreography, explanatory overlays, and observer motion on one shared timeline.

## Current State

- The composer already has a substantial runtime surface rather than a placeholder shell.
- It can build a canonical scene document, generate preview scene data, export JSON, save browser-local drafts, and download repo-ready scene JSON.
- The main runtime already exposes scene-tree, path, orbit, preview, and export-style workflows through the composer overlay.
- The timeline already supports pause, warp, image, video, and graphic items.
- `Audio` and `Observer` are already present in the add menu, but those paths are still placeholder authoring blocks rather than fully implemented timeline objects.
- User-facing language has started shifting toward `Observer`, but the underlying document path still uses `cameraPaths` and `cameraShots`.
- `ComposerViewportFramingRuntime.js` already normalizes shot framing, required versus optional assembly participation, and autoscale target selection.
- The first-pass autoscale behavior already exists in code, but the UI for authoring framing intent is still missing.
- A shared canonical-structure bridge exists, and a narrow live mutation path exists for `Split Group`, but composer-side structural editing is still incomplete.
- The composer does not yet ingest solved reaction flow JSON from the reaction app.

## Current Priorities

1. Add a real solved-reaction intake path so the composer can consume reaction flow JSON and instantiate staged reaction scenes from it.
2. Finish authored viewport framing and autoscale UI around required versus optional assemblies and shot-level overrides.
3. Replace the placeholder observer timeline path with a real authored observer-interval model.
4. Continue moving live structure edits onto the shared canonical structure runtimes instead of keeping bespoke composer-only logic.
5. Keep the composer as a composition root only; new reaction-handoff logic should live in focused runtimes, not in one growing top-level file.

## Relation To The Existing Scene System

The composer should not replace the current explicit scene network. It should add a new authored special scene type within it.

The intended runtime pattern is:

- a higher-level collection or index scene can still show selectable spheres or nodes;
- one of those nodes can point to a composed animation scene;
- opening that node should switch into a dedicated composed-animation runtime rather than into a markdown reader scene;
- and the composed animation scene should then render authored assemblies, paths, reactions, and playback controls.

Important consequences:

- these scenes are authored scene files, not markdown leaves;
- they should not assume that the primary interaction target is `markdownPath`;
- they belong in the explicit scene network and should remain searchable and navigable through the same manifest pipeline;
- and their internal content should be driven by authored animation data rather than by the normal scene-plus-markdown contract alone.

## Product Stance

The composer should remain an overlay editor controlling a live 3D viewport.

The right move is not to invent a different metaphor. It is to formalize and deepen the one that is already emerging:

- the live canvas is the primary authoring surface;
- persistent side panels should shrink toward scene-level controls only;
- assembly-specific authoring should happen from the assembly center handle and nearby canvas interactions;
- path-specific authoring should happen from path points or empty-canvas context menus while keeping path points directly draggable;
- the central viewport remains the live visual truth;
- export/import remains canonical JSON;
- and transport and playback controls should stay compact and timeline-adjacent rather than spread across redundant bars.

Current UI doctrine:

- keep the composer visual and canvas-first;
- manage assembly-specific actions from the assembly itself;
- keep the left panel shrinking toward scene-level control only;
- do not reintroduce large persistent text forms unless there is no workable canvas-first alternative;
- and treat context menus as part of the intended authoring grammar, not as optional convenience.

## Media And Overlay Boundaries

The composer should keep imported reference media on a deliberately narrow support boundary.

For the current webapp phase, the preferred support boundary is:

- images: `jpg`, `jpeg`, `png`, `svg`;
- video: `mp4`, `mov`;
- audio: `mp3`.

The current design should explicitly not broaden into `webp`, `webm`, `aac`, or `m4a` during this pass. The point is a small legible authoring contract, not a generic ingest tool.

Imported media should live in:

- `content/assets/composer/images/`
- `content/assets/composer/video/`
- `content/assets/composer/audio/`

For the first implementation, image and video should be true viewport overlays:

- fixed to screen space rather than embedded in scene space;
- visible only during their authored timeline span;
- directly draggable and resizable in observer view;
- and not themselves part of the assembly animation grammar.

The current explanatory overlay baseline should remain:

- a short text callout;
- a straight leader line;
- attachment to an assembly or path point;
- timeline-span authoring with the shared minimum duration;
- direct placement in the viewport;
- and shell-contact behavior for assembly targets.

Future overlay types should extend that language rather than replacing it with unrelated graphic conventions.

## Observer Metaphor And User-Facing Language

Current state:

- the runtime already supports waypoint-based observer motion, POI selection, radius/speed controls, and timeline-adjacent playback in the main viewport;
- the add menu already says `Observer` rather than `Camera`;
- but the authored observer interval is still a placeholder path in the timeline menu, and the underlying document/runtime model still uses `camera` fields internally.

So this remains the target language and model for the next pass.

The composer should stop presenting itself as a camera tool. What matters in the authored scene is what the observer sees:

- the central viewport is the live observer view;
- a shot is an observer interval with a teaching purpose;
- a motion guide is an observer path, not a camera path, in the author-facing UI;
- focus, follow, framing, and reveal should all be described as observer behavior;
- and menus, timeline items, footer hints, and docs should reinforce the observer metaphor consistently.

The implementation may still use camera objects internally. That is a runtime concern, not the author’s mental model.

## Viewport Autoscale And Authored Framing Plan

The composer now needs an explicit viewport-framing model rather than ad hoc zoom behavior.

The key requirement is not simply "fit everything." It is to let the author say which assemblies must remain in the viewport and which assemblies are allowed to leave frame. Those are different teaching choices.

The intended authored model should be:

- assemblies can carry a viewport participation policy such as `required` or `optional`;
- observer intervals or shot-like spans can override those defaults;
- the active interval determines which assemblies are required, which may leave frame, what framing preset is being used, and whether autoscale is active or manual.

This is difficult because autoscale is not one behavior. Its correct result depends on observer intent:

- fixed observer position;
- moving observer path;
- follow-style intervals;
- and staged reaction handoff where the initial solve should generate a sensible framing guess without taking control away from the author.

The first modularity step is already underway in code:

- the composer now has a shared viewport-framing runtime that can normalize shot/framing intent;
- resolve the active shot and active camera path at a given playhead time;
- and compute which assemblies are currently required versus optional for framing purposes.

Planned rollout:

1. keep the current camera behavior stable while the framing model is normalized;
2. add authored per-assembly framing participation and per-interval framing overrides;
3. add a first autoscale mode that keeps only the required set in frame;
4. expose that authored framing state in a compact observer/viewport UI;
5. use the same framing model during reaction-to-composer handoff so accepted reactions can generate a first-pass observer view and autoscale policy automatically.

## Unifying Simplification Principle

The strongest simplification available to the composer is already present in the Architrino Assembly Architecture itself.

At the lowest useful level, the scene is made from:

- spheres;
- paths that encode position and velocity;
- orbit or shell traces where motion is structured or repeating;
- and a small number of quiet explanatory overlays attached to that geometry.

Everything larger is built from that lower level. This means the composer should not behave like a generic media tool that happens to render Architrino scenes. It should behave like a unified authoring instrument whose geometry, staging, semantic zoom, and explanatory overlays are all consequences of one core visual grammar.

The canonical rendered primitive set should remain small:

- sphere;
- path;
- orbit or shell trace;
- ellipse or ellipsoid guide;
- callout leader;
- text label.

The preferred reveal sequence is:

1. sphere-like proxy at coarse scale;
2. reveal path when motion matters;
3. reveal orbit or shell trace when repeated structure matters;
4. reveal constituent spheres and local paths when constitution matters.

The preferred hide sequence is the reverse.

Recommended viewport rendering stack:

1. background field;
2. path and orbit traces;
3. sphere bodies and sphere-like proxies;
4. shell and ellipsoid guides;
5. callout leaders;
6. text labels.

## Workspace And Modularity Direction

The composer should not be treated as one flat editing surface. It needs a small number of semantic design levels so authors can move between corpus navigation, explanation design, spatial staging, and internal constituent modeling without losing orientation.

The implementation should keep the existing document core and shell seams, and concentrate new work in focused module families:

- native runtime player;
- assembly and constituent engine;
- reaction and provenance handoff engine;
- history and envelope engine;
- camera and editorial engine;
- validation and persistence engine.

Good ticket grain is one runtime behavior or one semantic family at a time. Bad ticket grain is vague work such as "finish composer."

## Required Handoff From The Reaction Pipeline

The composer-side intake contract should be strong enough to receive:

- participant identities and roles;
- solved mapping corridors or equivalent provenance paths;
- staged timing such as dissociate, transit, and associate / reassembly intervals;
- observer hints such as initial framing targets or recommended flyby anchors;
- and any supporting labels or overlays needed to explain the reaction.

The composer should not be asked to solve the reaction again. It should receive a solved flow and focus on staging, observer behavior, explanation, and playback.

## Development Constraint

The composer should remain the final explanatory instrument, not the place where low-level conservation solving gets reinvented.

That means:

- reaction solving belongs upstream;
- observer framing and autoscale belong here;
- and the handoff between them should be explicit JSON rather than ad hoc shared UI state.
