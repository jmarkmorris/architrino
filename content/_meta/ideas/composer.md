# Composer

## Why this note exists

The webapp already contains an early composer surface. It is no longer just a vague future idea. There is a working UI path for scene preview, JSON export, path editing, frame editing, and camera flight preview. That existing work is enough to justify a clearer architecture note before the composer expands into full assembly authoring.

This note describes:

- what the composer appears to be today,
- what it should become,
- why it will need a strongly 3D-first model,
- and how the early data structures can support that future without repeating the taxonomy problems now being removed elsewhere.

---

## Consolidated requirements

This section merges the requirements already implied in this note, the draft JS-facing language note, and the near-term needs for assembly authoring.

### 1. Product direction

- The composer should remain an overlay editor controlling a live 3D viewport.
- The current initial UI is a valid starting point and should be preserved as the shell that expands into fuller assembly authoring.
- The composer should support both static diagrams and time-based animated assembly scenes through one canonical authored model.
- Declarative authored data should be the default. Imperative or solver-backed behavior should be optional and explicitly marked.

### 2. Canonical authored output

- The composer should export canonical JSON from structured authored data rather than from inferred renderer state.
- Exported data should round-trip through preview, save, load, edit, re-export, and validation.
- The canonical model should keep scene identity, layout, view, path, assembly structure, reactions, and provenance distinct rather than collapsing them into overloaded fields.
- Stable ids are required for all authored entities, assemblies, charges, paths, reactions, annotations, and anchors.
- The exported artifact should be an authored scene file that participates in the existing scene graph as a special scene type rather than as a markdown-target sphere scene.

### 3. Scene and assembly model

- Assemblies should be recursive. A scene may contain nested assemblies, and an assembly may contain sub-assemblies with their own local frames, transforms, and motion.
- The same composition model should work for simple scene nodes, Noether cores, bound charges, and larger particle-like assemblies.
- The composer should support reusable presets, but every preset instance must remain editable as explicit structured data.
- Assemblies should support metadata, links, drill-down targets, and inspectable annotations.

### 4. Noether core authoring

- The composer should support explicit authoring of a Noether core as a first-class assembly component.
- A Noether core should support shell geometry, orbital bands or layers, internal architrino organization, and optional multi-core composition.
- Core state should distinguish rest geometry from runtime deformation and motion state.
- A moving Noether core should be able to oblate along the axis of travel according to the Lorentz contraction law as velocity approaches \(c_f\).
- The deformation model should make the direction of travel explicit so the contracted axis is not ambiguous.
- The composer should allow both static inspection of a core and time-based playback of the core while it moves and deforms.

### 5. Architrino orbital dynamics

- Internal architrinos should be authorable as explicit orbiting constituents of the Noether core rather than as hidden renderer effects.
- The composer should support circular and elliptical orbit families at minimum, with room for more general path-based internal motion later.
- Internal orbital motion should continue coherently while the containing assembly is translating, rotating, or deforming.
- Local orbital motion should compose cleanly with parent assembly transforms and parent path motion.
- Phase, angular speed, tilt, and band attachment should be explicit authored parameters.

### 6. Personality charges

- Personality charges should be first-class typed entities such as `electrino` and `positrino`, with room for future extensions.
- Charges should support both independent scene-level placement and bound-to-core attachment derived from core configuration.
- Charge placement, count, sizing, orientation, and attachment policy should be declarative.
- The composer should support secondary small-scale charge motion such as jiggle, wobble, or bounded local perturbation without hiding that behavior in renderer-only code.
- Charge motion should be able to ride on top of larger assembly translation, rotation, and reaction choreography.

### 7. Motion, transforms, and frames

- Every assembly should be able to translate and/or rotate independently of its internal motion.
- Motion must be frame-aware. Local motion, parent-relative motion, and absolute motion should be distinct and composable.
- The authored model should support fixed placement, straight-line motion, circular orbit, elliptical orbit, arbitrary paths, and deforming motion.
- Arbitrary paths should support explicit points, spline-smoothed points, and primitive parameterizations where useful.
- Time mapping, repeat behavior, phase offsets, and playback rate should be explicit.
- Path, orbit, spin, translation, deformation, and jiggle should be composable rather than mutually exclusive.

### 8. Path authoring

- Path authoring must be 3D-native even when early editing flows are visually simple.
- The composer should support straight-line paths, circles, ellipses, splines, polylines, and arbitrary smoothed point sets at minimum.
- A path should declare its reference frame, time domain, repeat behavior, geometric payload, and preview style.
- Parent motion and local path motion should combine predictably so that nested transport is authorable without ad hoc exceptions.
- Camera flight paths and assembly motion paths should both be explicit structured objects, not implicit editor state.

### 9. Reactions, disassembly, and reassembly

- The composer should support reactions as first-class authored objects, not just as animation presets.
- A reaction should be able to involve multiple assemblies and multiple timed stages.
- Reaction authoring should support disassembly of reactants into constituent parts, transfer or handoff of those parts, and reassembly into products.
- Participants, timelines, triggers, branches, emissions, products, and handoff paths should be explicit.
- Reaction playback should support both structural changes and geometric choreography through space and time.
- Provenance should be preserved through reaction steps so authored outputs can show where components came from and where they went.

### 10. View, preview, and authoring workflow

- The composer should keep the current pattern of structured side panels plus live viewport preview.
- Preview should update from authored draft state with minimal guesswork.
- The viewport should support camera framing, camera flights, and scene playback without entangling view state with assembly semantics.
- The authoring loop should remain: define, adjust, preview, validate, export.
- Guided and advanced editing modes are desirable so the same tool can serve both preset-first authoring and direct schema-level editing.
- Runtime controls should likely remain in the corners, but the visible set should be abbreviated to the controls relevant to composed animation playback, inspection, and drill-down.

### 11. Validation, determinism, and migration

- Structural validation should be provided by schema, with semantic lint on ids, references, motion targets, path references, palette names, and unsupported enums.
- Deterministic defaults are required, but every meaningful default should be overrideable.
- Authored data should separate canonical saved values from preview-only helpers or temporary editing state.
- The migration path from the current `{ scene, objects[] }` runtime model to a fuller canonical assembly model should be explicit and incremental.
- The minimum useful subset should be implementable before the full reaction and provenance system is complete.
- Migration should preserve compatibility with the existing scene network so higher-level collection scenes can still link to these authored animation scenes using the current navigation model.

### 12. Additional requirements worth carrying now

- Units, time base, and angle conventions should be explicit in authored data.
- Palette and visual assignment policy should be explicit and deterministic.
- The model should support both 2D-facing presentation scenes and true 3D assembly scenes without forcing the same layout semantics onto both.
- Performance and preview quality controls should be explicit so dense assemblies and reactions can remain inspectable during authoring.
- The schema should leave room for future solver-backed motion without making the initial authoring model depend on a full physics solver.

---

## What exists today

The current webapp runtime already exposes a composer overlay with multiple panels and export flow.

Observed composer capabilities in the runtime:

- scene id and scene name inputs,
- node count and node label inputs,
- path mode selection and path reset,
- frame edit toggle, frame reset, and frame scale control,
- camera POI mode,
- camera waypoint add and clear,
- camera flight preview toggle,
- camera speed and camera radius controls,
- preview panel,
- docs panel,
- JSON export.

The current composer surface already suggests an intended authoring loop:

1. define a scene draft,
2. adjust path and frame geometry,
3. define camera behavior,
4. preview the scene live,
5. export canonical JSON.

That means the composer is already conceptually more than a scene-form generator. It is the start of an authoring environment.

---

## Relation to the existing scene system

The composer should not replace the existing scene system. It should add a new authored special scene type within it.

The intended runtime pattern is:

- a higher-level collection or index scene can still show selectable spheres or nodes,
- one of those nodes can point to a composed animation scene,
- opening that node should switch into the composed animation runtime rather than into a markdown reader scene,
- and the composed animation scene should then render its own authored assemblies, paths, reactions, and playback controls.

This is closer to the current handling of special interactive scenes such as the periodic table and atom drill-down flow than to the standard sphere-to-markdown pattern.

Important consequences:

- these scenes are authored scene files, not markdown leaves,
- they should not assume that the primary interaction target is `markdownPath`,
- they belong in the explicit scene network and should remain searchable and navigable through the same manifest pipeline,
- and their internal content should be driven by authored animation data rather than by the normal `objects[]` plus markdown drill-down contract alone.

Taxonomically, these scenes sit closest to tool scenes and animation scenes. In runtime terms, they likely need a dedicated scene type such as `Scene-Composed-Animation` rather than being treated as an ordinary diagram or markdown scene.

The current UI direction still fits this well:

- keep the corner-control language used elsewhere in the app,
- keep the overlay-based authoring model for the composer itself,
- and present an abbreviated in-runtime control set for playback, camera, selection, and relevant inspection.

---

## The composer should become a world-building tool

The composer should eventually be the place where we build assemblies, define paths, specify reactions, and record provenance.

That makes it a deeper tool than a scene editor.

It needs to support at least four layers at once:

- assembly geometry,
- motion/path definition,
- reaction and transfer logic,
- provenance and causal history.

Those layers are tightly related in $\mathbb{A}\mathbb{A}\mathbb{A}$. If the tool is only a 2D scene arranger, it will fail to represent the actual ontology of assemblies moving, coupling, exchanging content, and leaving causal traces.

---

## Why the composer must become 3D-first

For ordinary document scenes, a 2D presentation can be enough. For the composer, that is not true.

Assemblies, paths, reactions, and provenance are fundamentally spatial and often directional. The composer therefore needs a primary metaphor of:

- 3D space for placement and structure,
- time for motion and animation,
- causal history for provenance.

This matters especially for:

- nested assemblies,
- orbital frames,
- transfer paths,
- camera flights,
- reaction corridors,
- provenance traces showing where content came from and where it went.

The future composer should therefore be understood as a **3D plus time** authoring environment.

That does not mean the UI must become a full in-world 3D editor immediately. It means the underlying data model must already assume:

- positions are fundamentally 3D,
- paths are fundamentally 3D,
- view is camera state over 3D content,
- reactions unfold over time,
- provenance may need to be visualized as a directed history through space and time.

---

## Recommended UI metaphor

The current best approach is still an overlay editor controlling a 3D viewport.

Primary model:

- center: live 3D viewport,
- side panels: structured editing,
- bottom or side transport: time and preview controls,
- export/import panel: canonical JSON,
- optional docs panel: scene spec and authoring help.

Why this is the right first model:

- forms are better for exact parameters,
- 3D gizmos alone are too imprecise for dense nested assemblies,
- overlay controls are faster to implement and validate,
- the viewport can still provide direct manipulation where useful.

So the composer should not be thought of as a flat form or as a pure in-world editor. It should be a **3D viewport with structured authoring overlays**.

---

## Future scope

The composer should eventually support all of the following.

### 1. Assembly construction

The composer should let the user define assemblies at multiple levels:

- primitive path-bearing units,
- sub-assemblies,
- full particle-like assemblies,
- nested assemblies composed recursively.

This should include:

- reusable presets,
- explicit nested frames,
- local versus parent-relative motion,
- editable charge distribution and orientation metadata where relevant.

### 2. Path authoring

The composer should support multiple path sources:

- function-defined paths,
- explicit point paths,
- simulated paths,
- group or center-of-momentum paths,
- handoff paths during reactions or transfers.

Path authoring must be 3D-native.

That implies:

- spline and polyline editing in 3D,
- primitive path modes like circle, ellipse, helix, and spiral,
- local-frame editing,
- repeat modes,
- time mapping along paths.

### 3. Reaction design

The composer should allow reaction-level authoring, not just static scenes.

That includes:

- defining participating assemblies,
- specifying triggers or time windows,
- showing transfers or exchanges,
- showing branching outcomes when needed,
- capturing reaction geometry rather than only text labels.

This is where 3D plus time becomes essential. A reaction is not just a list of products. It is a structured spatiotemporal event.

### 4. Provenance

The composer should eventually support explicit provenance tracking.

This should include:

- identity or content source tagging,
- transfer history,
- handoff chains,
- recruited substrate or relock provenance where relevant,
- causal path-history for visible contributions.

A mature composer should be able to show not only what an assembly is, but also how a particular component or contribution arrived there.

---

## Early data-structure view

The composer should use explicit structured data rather than inferred state.

That means the data model should distinguish at least these layers:

- scene structure,
- spatial layout,
- view/camera state,
- path definitions,
- assembly definitions,
- reactions and transfers,
- provenance records.

### Scene versus layout versus view

The emerging direction from the scene-taxonomy work fits the composer well.

Recommended distinction:

- `type`: what the scene is,
- `layout`: where things are arranged in 3D space,
- `view`: how the camera or observer sees them.

For composer-related scenes this matters a lot:

- layout stores structure and placement,
- view stores camera framing or traversal,
- time/animation stores evolution,
- none of these should be collapsed into one overloaded field.

### Paths are first-class

Paths should remain first-class objects.

A path should be able to declare:

- source type,
- reference frame,
- repeat behavior,
- time domain,
- geometric payload,
- rendering/preview style.

This is already strongly suggested by the existing composer chapter and is the right direction.

### Assemblies are recursive scene objects

Assemblies should be representable as nested objects with their own:

- frame,
- path,
- local geometry,
- internal children,
- style,
- charges or other assembly attributes.

The important point is recursive composition. A proton, electron, meson, or more speculative structure should all be buildable from the same nested scene logic rather than from many special-case object types.

### Reactions should be explicit graph objects

Reactions should not be hidden inside ad hoc animation settings.

They should be explicit objects with fields such as:

- participants,
- trigger or time window,
- interaction mode,
- transfer or handoff behavior,
- outcome branches,
- provenance updates.

This will keep reaction authoring inspectable and exportable.

### Provenance should be explicit data, not just visual traces

A provenance trace may be displayed visually, but it should also exist as structured data.

That data might eventually include:

- emitter or source id,
- receiver or destination id,
- transfer time,
- path or corridor id,
- recruited substrate source,
- confidence or validation state.

That is necessary if provenance is to become something more than a rendered effect.

---

## Early schema direction

A first practical composer schema stack could look like this:

- `SceneSpec`
- `LayoutSpec`
- `ViewSpec`
- `PathSpec`
- `AssemblySpec`
- `ReactionSpec`
- `TransferSpec`
- `ProvenanceSpec`
- `CameraPathSpec`

### SceneSpec

Purpose:

- identify the root authored object,
- hold nested scene or assembly objects,
- define time and units,
- connect layout, view, and children.

### LayoutSpec

Purpose:

- define spatial arrangement,
- stay independent from camera/view state,
- remain extensible from 2D-derived layouts to full 3D placement schemes.

For composer work, layout must be 3D-capable even if some early editing flows still feel planar.

### ViewSpec

Purpose:

- define camera framing,
- support orbit, fly, or waypoint-based motion,
- support playback views without rewriting assembly layout.

This is important because the composer already has camera waypoint and flight concepts in the runtime.

### PathSpec

Purpose:

- define how an object moves through its frame,
- allow function paths, point paths, simulated paths, and group paths,
- preserve repeat and sampling behavior explicitly.

### AssemblySpec

Purpose:

- define reusable assembly-oriented structures,
- support recursive composition,
- carry local attributes such as geometry mode, charges, or internal organization.

### ReactionSpec and TransferSpec

Purpose:

- model exchanges, relocks, handoffs, and branch outcomes,
- connect time, participants, and path geometry,
- remain explicit enough for export, validation, and replay.

### ProvenanceSpec

Purpose:

- record causal origin and transfer history,
- survive export/import,
- support both visualization and analysis.

---

## Near-term implementation stance

The near-term composer should not try to solve the full final problem all at once.

The right near-term stance is:

1. keep the current overlay-based authoring shell,
2. strengthen the exported scene/spec structure,
3. make paths, frame state, and camera state more explicit,
4. add recursive assembly authoring,
5. add reaction objects,
6. add provenance objects,
7. move progressively toward a truly 3D-first authoring model.

That path respects the current implementation while still aiming at the correct long-term ontology.

---

## Relationship to the new scene ontology

The composer does not replace the new scene taxonomy. It sits on top of it.

The taxonomy note says:

- `type` identifies the scene type,
- `layout` handles spatial organization,
- `view` is distinct from layout,
- structural hierarchy is not the same thing as links.

The composer is where those distinctions become operational rather than merely conceptual.

In particular, the composer will put pressure on the data model to keep these things separate:

- scene identity,
- spatial arrangement,
- camera/view behavior,
- path-history,
- reaction structure,
- provenance.

That is another reason to get the ontology clean now.

---

## Recommended direction

The composer should be treated as a future core capability, not as a side panel.

The long-term vision should be:

- a 3D-first authoring environment,
- explicit time-aware scene playback,
- recursive assembly construction,
- explicit reactions and transfers,
- explicit provenance/path-history,
- canonical JSON export from structured authored data.

The current webapp already contains the early shell for this. The next step is not to invent a different metaphor. It is to formalize and deepen the one that is already emerging.
