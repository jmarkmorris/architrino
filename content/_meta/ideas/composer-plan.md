# Composer Integration Plan

## Purpose

This note turns the architecture in [composer.md](composer.md) into a practical implementation plan for the current webapp.

The central decision is:

- keep the existing composer working,
- do not destabilize its current scene entry and overlay shell,
- and build the next system as **composer-II** behind new runtime seams until it is strong enough to replace the old internal draft model.

That means the migration should be evolutionary, not destructive.

---

## Core decision

Yes, we should leave the existing composer as it is while building `composer-II`.

That is the safest and most productive approach.

Why:

- the current composer already has the correct entrypoint in the app,
- it already owns a dedicated overlay and live canvas,
- it already supports preview and export flow,
- and it already gives us a visible place to integrate the new system incrementally.

So the plan is not:

- delete the old composer,
- pause work until the new one is complete,
- and then attempt a big-bang replacement.

The plan is:

1. preserve the current composer scene and shell,
2. introduce a parallel `composer-II` document/runtime model,
3. let the new model coexist with the old one during development,
4. gradually rewire panels and preview/export onto the new engines,
5. and only then retire the older ad hoc draft internals.

---

## What exists today

The current composer entry and shell already live in the right place.

Current integration points:

- [app.js](../../app.js)
- [src/runtime/ComposerUiRuntime.js](../../src/runtime/ComposerUiRuntime.js)
- [src/runtime/ComposerControlsUiRuntime.js](../../src/runtime/ComposerControlsUiRuntime.js)
- [src/runtime/ComposerCanvasUiRuntime.js](../../src/runtime/ComposerCanvasUiRuntime.js)
- [content/scenes/archie/composer.json](../../scenes/archie/composer.json)

Current behavior, in practical terms:

- a dedicated Archie scene launches the composer overlay,
- the overlay owns several panels,
- the canvas supports path editing, frame editing, and camera preview,
- preview can generate a temporary scene,
- export can dump JSON.

That is enough to serve as the host shell for `composer-II`.

---

## Composer vs Composer-II

The cleanest near-term structure is:

- **Composer**
  - the current stable overlay, panels, and preview/export shell;
- **Composer-II**
  - the new AAA-native authoring model, scene document core, timeline model, viewport primitive stack, and validation model.

This should not initially be treated as a separate user-facing product. It is a development architecture boundary.

The user-facing flow can still say “Composer.”

Internally, however, we should distinguish:

- old draft builder code,
- from the new canonical scene authoring system.

Recommended practical rule:

- old composer stays as the fallback authoring path until `composer-II` can produce one polished MVP scene end to end.

---

## Integration strategy

The current shell should remain the host.

The replacement should happen in layers.

### Layer 1. Preserve the current scene and overlay entry

Do not change the basic launch model yet.

Keep:

- the Archie composer scene,
- the overlay mode,
- the docs button,
- the preview button,
- the export button,
- and the current live canvas region.

This preserves continuity while the new system is developed.

### Layer 2. Introduce a new scene document core

The first major replacement should be the internal draft data model.

Current draft behavior is still largely shaped by:

- node count,
- node labels,
- one editable path,
- frame state,
- camera flight preview.

`composer-II` should replace that with the MVP canonical scene model from [composer.md](composer.md):

- `scene`
- `assemblies`
- `paths`
- `cameraPaths`
- `cameraShots`
- `overlays`
- `tracks`
- `markers`
- `pauses`

At first, this can live beside the older draft builder rather than replacing it immediately.

### Layer 3. Replace the viewport primitive model

The current canvas is already the right conceptual place, but its primitives are still too thin.

The new viewport should render the AAA-native primitive set:

- spheres,
- paths,
- orbit or shell traces,
- ellipse or ellipsoid guides,
- callout leaders,
- text labels.

This is the key design transition from “demo editor” to “native AAA authoring surface.”

### Layer 4. Replace the editorial model

Once the scene document and viewport primitives are in place, the next layer is the timeline/editorial model:

- markers,
- pauses,
- overlay clips,
- camera shots,
- transitions,
- track ordering.

This is where the sequence and shot levels become real.

### Layer 5. Replace the panel logic

The current panel set can remain initially, but the new architecture should gradually take over panel ownership.

The end state should follow the stable workspace grammar from [composer.md](composer.md):

- top context bar,
- left rail,
- central viewport,
- right inspector,
- bottom timeline.

This does not need to be delivered all at once.

### Layer 6. Promote the new preview/export flow

The preview and export buttons should eventually target only `composer-II` canonical scene data.

That is the moment when the old builder becomes unnecessary.

---

## Recommended file/module plan

The current files suggest a clean incremental split.

### Existing host files to keep

- [app.js](../../app.js)
  - keep as the top-level integration point for now;
- [src/runtime/ComposerUiRuntime.js](../../src/runtime/ComposerUiRuntime.js)
  - keep as the shell/runtime controller, but gradually route actions to new engines;
- [src/runtime/ComposerControlsUiRuntime.js](../../src/runtime/ComposerControlsUiRuntime.js)
  - keep as the UI event host, but migrate controls to structured command handling;
- [src/runtime/ComposerCanvasUiRuntime.js](../../src/runtime/ComposerCanvasUiRuntime.js)
  - keep as the canvas event wiring seam.

### New modules to add

Recommended new runtime modules under `src/runtime/` or a composer-specific subfolder:

- `Composer2SceneDocumentRuntime`
  - canonical MVP scene state, normalization, ids, references;
- `Composer2TimelineRuntime`
  - playhead, markers, pauses, clip timing, tracks;
- `Composer2ViewportRuntime`
  - sphere/path/orbit/guide rendering and selection;
- `Composer2CameraRuntime`
  - camera paths, shots, transitions, follow behavior;
- `Composer2OverlayRuntime`
  - text, callout, ellipse, ellipsoid overlays;
- `Composer2LibraryRuntime`
  - reusable motifs, instances, overrides;
- `Composer2ValidationRuntime`
  - structural validation and lint;
- `Composer2WorkspaceRuntime`
  - level switching, selection context, panel state.

The point is not to create layers for the sake of purity. The point is to separate:

- scene semantics,
- timeline semantics,
- viewport semantics,
- and editor-shell semantics.

---

## Panel migration plan

The current panel ids in [content/scenes/archie/composer.json](../../scenes/archie/composer.json) are:

- `composer_tree`
- `composer_path`
- `composer_orbit`
- `composer_interactions`
- `composer_preview`
- `composer_export`

These are workable temporary seeds.

Recommended migration:

- `composer_tree`
  - becomes scene tree / assembly tree / library browser;
- `composer_path`
  - becomes path and timeline staging controls;
- `composer_orbit`
  - becomes shell/orbit reveal and constituent controls;
- `composer_interactions`
  - becomes overlays, markers, pauses, and shot controls;
- `composer_preview`
  - becomes runtime-player preview of canonical scene data;
- `composer_export`
  - becomes canonical JSON export, later package/render export.

This lets the current panel architecture evolve instead of being discarded.

---

## MVP definition for Composer-II

`composer-II` should be considered real when it can author one polished scene that demonstrates the native AAA grammar:

- one sphere-like assembly,
- moving on one path,
- with one orbital or shell reveal,
- with one or more pauses,
- with one or more markers,
- with one or more overlays,
- with one or more camera shots,
- and export canonical JSON that the runtime player can render correctly.

That is the threshold after which it becomes rational to retire the old draft builder.

---

## Suggested implementation order

### Phase A. Establish the new scene document

1. Define the MVP scene schema in code.
2. Add normalization and reference helpers.
3. Add canonical export from that schema.

### Phase B. Replace the viewport primitives

1. Render sphere bodies/proxies.
2. Render paths.
3. Render orbit or shell traces.
4. Add selection on those primitives.

### Phase C. Add the timeline/editorial layer

1. Markers.
2. Pauses.
3. Overlays.
4. Camera shots and transitions.
5. Track ordering.

### Phase D. Rewire the shell

1. Repoint current panels to the new engines.
2. Make preview use canonical scene data.
3. Make export use canonical scene data.

### Phase E. Add deeper AAA structure

1. Constituent drill-down.
2. Shell/orbit reveal logic.
3. Larger assembly collapse/proxy logic.
4. Later: reactions, transfer, provenance.

---

## Practical answer to the integration question

Yes, we should integrate this into the existing composer app.

But we should do it by:

- preserving the current shell,
- building `composer-II` inside it,
- letting both coexist for a while,
- and only removing the older internal builder once the new AAA-native scene model is demonstrably better and complete enough to carry real scenes.

That is the most stable path, the fastest path to visible progress, and the path that best protects the current app while the architecture matures.
