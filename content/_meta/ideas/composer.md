# Composer

## Why this note exists

The webapp already contains an early composer surface. It is no longer just a vague future idea. There is a working UI path for scene preview, JSON export, path editing, frame editing, and camera flight preview. That existing work is enough to justify a clearer architecture note before the composer expands into full assembly authoring.

This note describes:

- what the composer appears to be today,
- what it should become,
- why it will need a strongly 3D-first model,
- and how the early data structures can support that future without repeating the taxonomy problems now being removed elsewhere.

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
