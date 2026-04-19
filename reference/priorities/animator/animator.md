# animator

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep animator focused on staging, observer work, overlays, playback, and scene output.
- Do not restate upstream ingest or solve plans here except where animator must interface with imported authored material.
- Keep cross-app handoff details brief here and prefer the contract-owning document when it exists.
- Keep cross-cutting app-boundary and modularity doctrine in the broader architecture notes; keep only animator-specific seams and boundaries here.

## Purpose

Animator is the animation authoring surface for visualizing architrino assemblies.

Its job is to turn authored scene material into a staged scene with:

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

- upstream ingest or solve workflows;
- imported-source acceptance or publication policy;
- or live cross-app runtime behavior.

## Current State

- Animator already has a substantial runtime surface rather than a placeholder shell.
- It can build a canonical scene document, generate preview scene data, export JSON, save browser-local drafts, and download repo-ready scene JSON.
- The main runtime already exposes scene-tree, path, orbit, preview, and export-style workflows through the current animator overlay.
- The timeline already supports pause, warp, image, video, and graphic items.
- `Audio` and `Observer` already appear in the add menu, but those paths are still placeholder authoring blocks rather than fully implemented timeline objects.
- User-facing language has started shifting toward `Observer`, but the underlying document path still uses `cameraPaths` and `cameraShots`.
- The current framing runtime already normalizes shot framing, required versus optional assembly participation, and autoscale target selection.
- A first-pass autoscale behavior already exists in code, but the authored framing UI is still missing.
- A canonical structure bridge exists, and a narrow live mutation path exists for `Split Group`, but animator-side structural editing is still incomplete.
- Imported staging data already carries observer framing, preview identifiers, and export scene data through a dedicated scene-staging contract without importing external app runtimes.

## Design

### Role In The Scene System

Animator should not replace the current explicit scene network. It should add an authored composed-scene type within it.

That means:

- higher-level collection or index scenes can still point to composed scenes;
- opening a composed scene should enter a dedicated composed-animation runtime rather than a markdown reader;
- composed scenes should remain part of the normal scene network and manifest pipeline;
- and their content should be driven by authored animation data rather than by the normal scene-plus-markdown contract alone.

### Authoring Stance

Animator should remain an overlay editor controlling a live 3D viewport.

The intended authoring grammar is:

- the live canvas is the primary authoring surface;
- assembly-specific actions happen from the assembly itself where practical;
- path-specific authoring happens from path points or local canvas interactions;
- persistent side panels should keep shrinking toward scene-level control only;
- transport and playback controls should stay compact and timeline-adjacent;
- and import/export should remain canonical JSON rather than ad hoc UI state.

Animator should stay visual and canvas-first rather than turning back into a large inspector-driven tool.

### Observer And Framing Model

Animator should speak in observer language rather than camera language at the author-facing layer.

The target model is:

- the central viewport is the live observer view;
- a shot is an observer interval with teaching intent;
- observer intervals can carry framing intent and synchronized observer-path behavior;
- assemblies can be marked `required` or `optional` for viewport participation;
- interval-level framing overrides can refine those defaults;
- and autoscale should respond to authored framing intent rather than just "fit everything."

The implementation may still use camera objects internally, but the author-facing model should consistently present observer behavior.

### Design View And Observer View

Animator has two closely related but not identical visual jobs:

- a design view where we place assemblies, paths, reactions, and timeline objects;
- and an observer view where we judge what the authored interval actually shows.

Those two readings should stay explicit.

- The design view answers: "What is in the scene, where is it, and how is it moving?"
- The observer view answers: "What will the observer actually see, when, and with what emphasis?"

The same gesture can therefore mean different things in each context. Dragging an object in the design view changes scene structure. Dragging an observer guide in the observer view may instead change observation intent, follow behavior, or reveal emphasis.

One language rule should stay explicit from the start:

- `camera` may remain an internal runtime term;
- `observer` should stay the user-facing metaphor.

Another boundary should stay explicit too:

- viewport tools are downstream of accepted authored scene material or an equivalent scene-staging contract;
- they should not solve upstream composition again or repair missing upstream geometry;
- any composite or grouping metadata seen here should come from explicit staging or adapter layers over accepted assemblies rather than from solver-core ontology;
- and they should treat imported structure as authored input rather than something to reinterpret.

### Post-Solver Grouping Display Rule

In animator, the only admitted composite language is **composite of assemblies**.

That means:

- it is future post-solver grouping metadata over related `4`-tile assemblies;
- it may be created or refined by downstream staging or adapters after import;
- it may carry adjacency, label, span, reveal, and proxy or constituent presentation metadata;
- a composite label may use an observer-facing label tile or label token such as `Photon`, but that tile or token is span-label artwork rather than an assembly row;
- it is not itself a single assembly;
- it is not a dissociate or associate target;
- it should initially be limited to lanes `1` and `20`;
- and animator must not introduce a grouping-level `Dissociate` or `Associate` interpretation.

When animator receives upstream stage timing for dissociate, transit, associate, or reassembly intervals, those timings should remain anchored to the upstream `4`-tile assembly endpoints.

Specifically:

- a dissociate interval starts from one `4`-tile assembly reactant;
- an associate interval ends at one `4`-tile assembly product;
- a composite of assemblies may be highlighted or revealed around those rows;
- but the grouping is not the thing being opened or gathered.

### Viewport Layout Direction

The standard layout choices are familiar and still useful here.

#### 1. Single Design View With Observer Guides

Advantages:

- the author always works in one place;
- structure edits and observer edits stay visibly connected;
- and it uses screen space efficiently.

Costs:

- it can become visually busy;
- the user must mentally translate from scene structure to observed result;
- and subtle framing mistakes are easy to miss.

#### 2. Split Design View And Observer Preview

Advantages:

- the division of purpose is immediately clear;
- observation can be judged while the scene is still edited directly;
- and shot and reveal decisions are easier to debug.

Costs:

- it consumes more screen space;
- duplicated controls can become awkward;
- and the relationship between the two views must stay tightly synchronized.

#### 3. Picture-In-Picture Observer Preview

Advantages:

- it preserves canvas dominance;
- keeps the active observer result visible;
- and scales well for casual authoring.

Costs:

- small previews are weak for precise composition;
- observer editing can feel secondary;
- and the preview may be ignored unless it is made salient at the right times.

#### 4. Dedicated Observer Mode

Advantages:

- strong focus;
- fewer simultaneous controls;
- and easier teaching for advanced observation design.

Costs:

- mode switching increases friction;
- it is easy to lose spatial context;
- and authors may feel like they are leaving the scene rather than refining it.

### Shared And Divergent Controls

The two views should not become unrelated tools. They should share one authoring grammar.

Shared controls should include:

- timeline scrub and play state;
- active observer interval and active observer path;
- selection and focus target;
- point-of-interest targeting;
- object visibility filters like labels, paths, envelopes, and history traces;
- playback scale and pause or warp interpretation;
- and object identity, so a selected assembly in one view is the same selected assembly in the other.

The views should diverge only where author intent diverges.

The design view should favor:

- placing assemblies;
- dragging path points;
- arranging members and nested assembly structure;
- and revealing structural guides.

The observer view should favor:

- emphasis;
- composition;
- follow and target behavior;
- distance and proximity choices;
- and timing of reveals, overlays, and explanatory attention.

### Architrino-Specific Viewport Opportunity

In animator the scene is not just geometry. It is assemblies, nested local frames, transport paths, reaction choreography, and delayed structure. That means the design view must remain truth-bearing about structure, while the observer view must remain truth-bearing about what the audience perceives.

The strongest unifying idea is:

- the observer is another authored participant attached to frames, paths, and targets rather than a detached global inspector.

That suggests a more intuitive model.

#### Observer As An Authored Participant

Instead of treating the observer as only a hidden renderer, treat it as an authored participant with:

- a position path;
- a target relationship;
- a reveal state;
- and an overlay stack.

Observer intervals can then use the same kinds of anchors already present elsewhere:

- attach to scene root;
- attach to an assembly frame;
- follow a path point;
- look toward a selected constituent;
- and inherit a local frame before applying an offset.

#### Observer Guides As Visible Scene Objects

The observer view should be backed by visible guides in the design view:

- observer origin marker;
- focus target marker;
- connecting sight line;
- focus cone or attention corridor;
- and optional composition or safe-region guides.

These guides should be draggable and targetable like other animator objects rather than hidden in forms.

#### One Scene, Two Readings

The best near-term design is:

- one dominant design view;
- one smaller observer view or inset;
- both reading from the same authored scene state;
- and both sharing selection, time, and focus.

The design view shows structure. The observer view shows perceived result. Clicking an assembly in either place should keep working on the same underlying object.

#### Semantic Reveal Tied To Assembly Scale

Because these scenes naturally move between proxy scale and constituent scale, the observer system should exploit that rather than fight it.

An observer interval should be able to declare reveal behavior such as:

- proxy-only;
- proxy plus path;
- shell-visible;
- constituent-visible;
- transfer-focused;
- or reaction-stage focus.

That keeps observation tied to the existing assembly architecture instead of treating it as mere motion through space.

#### Overlays As Real Timeline Objects

Text notes, arrows, bubbles, images, and other graphics should remain timeline objects with:

- target attachment;
- local or world anchoring;
- fade-in and fade-out;
- and visibility rules by observer interval or reveal state.

That keeps design view and observer view synchronized because the overlay remains part of the authored scene language.

### Practical Staged Direction

The staged direction should be:

1. Keep the design view dominant.
2. Add the timeline object palette for overlays and observer-related items.
3. Introduce a small observer view or inset tied to the active interval when necessary.
4. Make observer guide objects directly manipulable in the design view.
5. Let observer intervals bind to assembly frames, local targets, and reveal states rather than only raw world-space coordinates.

### Media And Overlay Boundary

The current narrow media boundary should remain explicit.

Supported formats for this phase:

- images: `jpg`, `jpeg`, `png`, `svg`;
- video: `mp4`, `mov`;
- audio: `mp3`.

The current implementation should not broaden into `webp`, `webm`, `aac`, or `m4a` during this pass.

Imported media should live in the animator image, video, and audio asset directories.

For the current design:

- image and video are viewport overlays rather than scene-space geometry;
- overlays are visible only during their authored timeline spans;
- overlays are directly draggable and resizable in observer view;
- and explanatory overlays should extend the current small language of callout text, leader lines, and attachment to assemblies or path points.

### Visual Grammar

Animator should behave like a unified authoring instrument built from the core architrino visual grammar rather than like a generic media editor.

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

The canonical-structure bridge is the right direction of travel for deeper animator editing.

That means:

- extend the existing read path into more viewport and editor surfaces;
- move real mutation paths onto shared structure transforms rather than bespoke animator-only logic;
- make parent and child nesting read as local structure rather than grouped ids alone;
- keep `Unbound Architrinos` as outputs of structure-changing edits rather than top-level add-menu stamps;
- and continue expanding richer structure depiction only after the canonical edit path is in place.

## Interfaces

### Inputs

- authored scene documents and local drafts;
- assembly, path, and timing data authored directly in animator;
- imported accepted authored output or equivalent scene-staging contracts;
- and referenced media assets for overlays and editorial material.

### Outputs

- canonical composed scene documents;
- preview scene data and browser-local drafts;
- repo-ready scene JSON exports;
- and authored observer, framing, and overlay state suitable for playback and publication.

### App Boundaries

Animator should consume accepted authored scene output or an equivalent explicit scene-staging contract and translate that data into animator-owned scene state.

Animator should not:

- resolve upstream reaction logic again;
- consume live upstream review state or request selections directly;
- import external runtime code to perform the handoff;
- or depend on shared live UI state across app boundaries.

The intake should be strong enough to receive:

- participant identities and roles;
- solved mapping corridors or equivalent provenance paths;
- stage timing such as dissociate, transit, and associate or reassembly intervals anchored to `4`-tile assembly endpoints;
- observer hints such as initial framing targets or flyby anchors;
- and labels or overlays needed to explain the reaction.

## Priorities

### 1. Finish The Animator-Owned Runtime Cut-Over From `app.js`

Status: `active`

Current:

- the app runtime now covers import, draft state, document workspace, playback, pointer, viewport, and authoring runtimes;
- the app entrypoint no longer imports root `app.js`, and root `app.js` is now thin entry glue;
- but substantial animator behavior still remains in the shared Architrino scene-shell runtime.

Objective:

- finish moving the remaining scene-shell behavior into a fully app-owned bootstrap and runtime path.

### 2. Finish Authored Observer Framing And Autoscale UI

Status: `active`

Current:

- framing normalization, required or optional assembly targeting, autoscale math, and imported observer hints are already live;
- but there is still no compact author-facing UI for editing that model.

Objective:

- let authors set and inspect observer framing intent directly instead of relying on defaults and imported hints.

### 3. Replace Placeholder `Observer` And `Audio` Timeline Blocks

Status: `next`

Current:

- the timeline menu still inserts placeholder `Observer` and `Audio` blocks instead of real authored objects.

Objective:

- turn `Observer` into a true timeline object and either implement `Audio` or remove its placeholder path until it is real.

### 4. Move More Editing Onto Canonical Structure Transforms

Status: `pending`

Current:

- animator can already carry imported `structureKey` and stage data, and a narrow canonical edit path exists;
- more authoring flows still depend on animator-local mutations.

Objective:

- make structure reads and edits share one canonical model so nesting, scale, and transfer staging stay coherent.

## Related AAA Notes

- [about-the-webapp](../../../content/markdown/aaa/archie/about-the-webapp.md)
- [scene-taxonomy](../../../content/markdown/aaa/archie/scene-taxonomy.md)
- [navigation-and-controls](../../../content/markdown/aaa/archie/navigation-and-controls.md)
