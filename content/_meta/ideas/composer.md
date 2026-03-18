# Composer

## Why this note exists

The webapp already contains an early composer surface. It is no longer just a vague future idea. There is a working UI path for scene preview, JSON export, path editing, frame editing, and camera flight preview. That existing work is enough to justify one clear architecture note before the composer expands into full assembly authoring.

This note is the single reference for:

- what the composer is in the current app,
- how it relates to the existing scene system,
- what the canonical authored output should be,
- what requirements the composed-animation scene type must satisfy,
- and what near-term implementation path makes sense.

---

## Relation to the existing scene system

The composer should not replace the current explicit scene network. It should add a new authored special scene type within it.

The intended runtime pattern is:

- a higher-level collection or index scene can still show selectable spheres or nodes,
- one of those nodes can point to a composed animation scene,
- opening that node should switch into a dedicated composed-animation runtime rather than into a markdown reader scene,
- and the composed animation scene should then render authored assemblies, paths, reactions, and playback controls.

This is closer to the current handling of special interactive scenes such as the periodic table and atom drill-down flow than to the standard sphere-to-markdown pattern.

Important consequences:

- these scenes are authored scene files, not markdown leaves,
- they should not assume that the primary interaction target is `markdownPath`,
- they belong in the explicit scene network and should remain searchable and navigable through the same manifest pipeline,
- and their internal content should be driven by authored animation data rather than by the normal `{ scene, objects[] }` plus markdown drill-down contract alone.

Taxonomically, these scenes sit closest to tool scenes and animation scenes. In runtime terms, they likely need a dedicated scene type such as `Scene-Composed-Animation`.

---

## Product stance

The composer should remain an overlay editor controlling a live 3D viewport.

The current initial UI is a valid starting point and should be preserved as the shell that expands into fuller assembly authoring. The right move is not to invent a different metaphor. It is to formalize and deepen the one that is already emerging.

That means:

- structured side panels remain primary,
- the central viewport remains the live visual truth,
- export/import remains canonical JSON,
- and in-runtime controls likely remain in the corners, but with an abbreviated set relevant to composed animation playback, camera, selection, and inspection.

The composer should be treated as a future core capability, not as a side panel.

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

The composer is already more than a scene-form generator. It is the start of an authoring environment.

---

## Canonical output

The composer should primarily output canonical JSON, not a saved program.

The intended architecture is:

1. composer/editor state,
2. normalizer and validator,
3. canonical JSON scene spec,
4. general composed-animation runtime/player.

This is the cleanest contract because the authored artifact should be:

- inspectable,
- diffable,
- schema-validatable,
- round-trippable through save, load, edit, and re-export,
- renderer-agnostic at the authored-data level,
- and deterministic enough for replay and debugging.

Programmatic builders or helpers may still exist, but they should compile down to the same canonical JSON before save/export.

The runtime should be general enough to read any valid composed-animation JSON scene and render it, rather than requiring a custom program per scene.

---

## Consolidated requirements

This section merges the remaining useful requirements into one set.

### 1. Scene-system requirements

- The format must work as the authored payload of a dedicated composed-animation scene type inside the existing scene graph.
- Higher-level collection scenes must be able to link to these scenes without forcing a markdown-target interaction model.
- The authored output should be an authored scene file that participates in the existing scene graph as a special scene type.
- Migration should preserve compatibility with the existing scene network so higher-level collection scenes can still link to these authored animation scenes using the current navigation model.

### 2. General design requirements

- One canonical authored model should cover both static diagrams and time-based animated assembly scenes.
- Declarative authored data should be the default. Imperative or solver-backed behavior should be optional and explicitly marked.
- Deterministic defaults are required, but every meaningful default should be overrideable.
- Stable ids are required for all authored entities, assemblies, charges, paths, reactions, annotations, and anchors.
- Every composed-animation scene should have an explicit master timeline in seconds so frequencies in Hz and timed reaction events are unambiguous.

### 3. Scene and assembly requirements

- Assemblies should be recursive. A scene may contain nested assemblies, and an assembly may contain sub-assemblies with their own local frames, transforms, and motion.
- The same composition model should work for simple scene nodes, Noether cores, bound charges, and larger particle-like assemblies.
- Assemblies should support metadata, links, drill-down targets, and inspectable annotations.
- Presets are useful, but every preset instance must remain editable as explicit structured data.
- Assemblies should be saveable to a reusable library so authored structures can be inserted, versioned, and reused across scenes.

### 4. Noether core requirements

- The composer should support explicit authoring of a Noether core as a first-class assembly component.
- A Noether core should support shell geometry, orbital bands or layers, internal architrino organization, and optional multi-core composition.
- Core state should distinguish rest geometry from runtime deformation and motion state.
- A moving Noether core should be able to oblate along the axis of travel according to the Lorentz contraction law as velocity approaches \(c_f\).
- The deformation model should make the direction of travel explicit so the contracted axis is not ambiguous.
- The composer should allow both static inspection of a core and time-based playback of the core while it moves and deforms.

### 5. Internal dynamics requirements

- Internal architrinos should be authorable as explicit orbiting constituents of the Noether core rather than as hidden renderer effects.
- The composer should support circular and elliptical orbit families at minimum, with room for more general path-based internal motion later.
- Internal orbital motion should continue coherently while the containing assembly is translating, rotating, or deforming.
- Local orbital motion should compose cleanly with parent assembly transforms and parent path motion.
- Phase, angular speed, tilt, band attachment, and modulation should be explicit authored parameters.

### 6. Personality charge requirements

- Personality charges should be first-class typed entities such as `electrino` and `positrino`, with room for future extensions.
- Charges should support both independent scene-level placement and bound-to-core attachment derived from core configuration.
- Charge placement, count, sizing, orientation, and attachment policy should be declarative.
- The composer should support secondary small-scale charge motion such as jiggle, wobble, or bounded local perturbation without hiding that behavior in renderer-only code.
- Charge motion should be able to ride on top of larger assembly translation, rotation, and reaction choreography.

### 7. Motion, transform, and path requirements

- Every assembly should be able to translate and/or rotate independently of its internal motion.
- Motion must be frame-aware. Local motion, parent-relative motion, and absolute motion should be distinct and composable.
- The authored model should support fixed placement, straight-line motion, circular orbit, elliptical orbit, arbitrary paths, spin, and deforming motion.
- Arbitrary paths should support explicit points, spline-smoothed points, and primitive parameterizations where useful.
- Path, orbit, spin, translation, deformation, and jiggle should be composable rather than mutually exclusive.
- Time mapping, repeat behavior, phase offsets, and playback rate should be explicit.

### 8. Path authoring requirements

- Path authoring must be 3D-native even when early editing flows are visually simple.
- The composer should support straight-line paths, circles, ellipses, splines, polylines, and arbitrary smoothed point sets at minimum.
- A path should declare its reference frame, time domain, repeat behavior, geometric payload, and preview style.
- Parent motion and local path motion should combine predictably so that nested transport is authorable without ad hoc exceptions.
- Camera flight paths and assembly motion paths should both be explicit structured objects, not implicit editor state.

### 9. Reaction requirements

- The composer should support reactions as first-class authored objects, not just as animation presets.
- A reaction should be able to involve multiple assemblies and multiple timed stages.
- Reaction authoring should support disassembly of reactants into constituent parts, transfer or handoff of those parts, and reassembly into products.
- Participants, timelines, triggers, branches, emissions, products, and handoff paths should be explicit.
- Reaction playback should support both structural changes and geometric choreography through space and time.
- Provenance should be preserved through reaction steps so authored outputs can show where components came from and where they went.

### 10. View and workflow requirements

- The composer should keep the current pattern of structured side panels plus live viewport preview.
- Preview should update from authored draft state with minimal guesswork.
- The viewport should support camera framing, camera flights, and scene playback without entangling view state with assembly semantics.
- In any authored scene, camera path and camera orientation may also evolve over the same scene timeline as the assembly animation.
- Camera paths should be first-class authored objects that can be saved, edited, reused, and attached to scene playback.
- The system should support authored automatic camera-follow modes analogous to photo-drone follow shots, but adapted to moving assemblies so the camera can orbit, trail, lead, flank, or otherwise observe a moving particle from changing orientations over time.
- Guided and advanced editing modes are desirable so the same tool can serve both preset-first authoring and direct schema-level editing.
- Runtime controls should fit the app's existing corner-control language, but allow an abbreviated animation-specific control set.

### 11. Validation and migration requirements

- Structural validation should be provided by schema, with semantic lint on ids, references, motion targets, path references, palette names, and unsupported enums.
- Authored data should separate canonical saved values from preview-only helpers or temporary editing state.
- The migration path from the current `{ scene, objects[] }` runtime model to a fuller canonical assembly model should be explicit and incremental.
- The minimum useful subset should be implementable before the full reaction and provenance system is complete.

### 12. Additional requirements worth carrying now

- Units, time base, and angle conventions should be explicit in authored data.
- Palette and visual assignment policy should be explicit and deterministic.
- The model should support both 2D-facing presentation scenes and true 3D assembly scenes without forcing the same layout semantics onto both.
- Performance and preview quality controls should be explicit so dense assemblies and reactions can remain inspectable during authoring.
- The schema should leave room for future solver-backed motion without making the initial authoring model depend on a full physics solver.

---

## Data-model direction

The composer should use explicit structured data rather than inferred state.

The data model should distinguish at least these layers:

- scene identity and runtime type,
- spatial layout,
- view/camera state,
- path definitions,
- assembly definitions,
- reactions and transfers,
- provenance records.

Important distinction:

- `type`: what runtime scene type this is,
- `layout`: where things are arranged in space,
- `view`: how the camera or observer sees them,
- `time`: how animation evolves,
- `structure`: what is contained by what.

None of these should be collapsed into one overloaded field.

Paths should remain first-class objects. Reactions should remain first-class objects. Provenance should remain explicit data, not just a rendered effect.

---

## Draft schema direction

A first practical composer schema stack could look like this:

- `SceneSpec`
- `LayoutSpec`
- `ViewSpec`
- `PathSpec`
- `AssemblySpec`
- `AssemblyLibrarySpec`
- `CoreSpec`
- `ChargeSpec`
- `ReactionSpec`
- `TransferSpec`
- `ProvenanceSpec`
- `CameraPathSpec`

### SceneSpec

Purpose:

- identify the root authored object,
- declare the runtime scene type,
- hold nested assemblies or child authored structures,
- define time and units,
- connect layout, view, playback, and structure.

Draft root shape:

```js
SceneSpec {
  scene: {
    id: string,
    type: "Scene-Composed-Animation",
    kind: "composed_animation",
    name: string,
    mode?: "2d" | "2.5d" | "3d",
    layout?: LayoutSpec,
    view?: ViewSpec,
    time?: TimeSpec,
    palette?: PaletteBinding,
    controls?: ControlSpec
  },
  assemblies: AssemblySpec[],
  libraryRefs?: string[],
  paths?: PathSpec[],
  cameraPaths?: CameraPathSpec[],
  reactions?: ReactionSpec[],
  transfers?: TransferSpec[],
  provenance?: ProvenanceSpec[],
  metadata?: Record<string, unknown>
}
```

### LayoutSpec

Purpose:

- define spatial arrangement,
- stay independent from camera/view state,
- remain extensible from simple authored layouts to full 3D placement schemes.

For composer work, layout must be 3D-capable even if some early editing flows still feel planar.

### ViewSpec

Purpose:

- define camera framing,
- support orbit, fly, or waypoint-based motion,
- support automatic follow-camera modes for moving assemblies,
- support playback views without rewriting assembly layout.

This is important because the composer already has camera waypoint and flight concepts in the runtime.

Draft shape:

```js
ViewSpec {
  activeCameraPath?: string,
  cameraPaths?: CameraPathSpec[],
  defaultCamera?: {
    position?: [number, number, number],
    lookAt?: [number, number, number],
    orientation?: [number, number, number]
  }
}
```

### PathSpec

Purpose:

- define how an object moves through its frame,
- allow function paths, point paths, straight-line paths, or group paths,
- preserve repeat and sampling behavior explicitly.

Draft shape:

```js
PathSpec {
  id: string,
  kind: "line" | "function" | "points" | "group",
  frame: FrameSpec,
  time?: TimeMapSpec,
  style?: StyleSpec,
  payload: Record<string, unknown>
}
```

### AssemblySpec

Purpose:

- define reusable assembly-oriented structures,
- support recursive composition,
- carry local attributes such as geometry, transforms, charges, and internal organization.

Draft shape:

```js
AssemblySpec {
  id: string,
  role: "assembly" | "core" | "charge" | "annotation" | string,
  transform?: TransformSpec,
  motion?: MotionSpec | MotionSpec[],
  children?: AssemblySpec[],
  core?: CoreSpec,
  charge?: ChargeSpec,
  annotations?: Record<string, unknown>,
  metadata?: Record<string, unknown>
}
```

### AssemblyLibrarySpec

Purpose:

- store reusable authored assemblies outside one scene,
- support insertable presets without losing explicit authored structure,
- allow versioned reuse across multiple composed-animation scenes.

Draft shape:

```js
AssemblyLibrarySpec {
  entries: Array<{
    id: string,
    version?: string,
    assembly: AssemblySpec,
    metadata?: Record<string, unknown>
  }>
}
```

### CoreSpec

Purpose:

- define an explicit Noether core,
- support shell geometry, band structure, internal architrino organization, and deformation.

Draft shape:

```js
CoreSpec {
  coreType: "noether",
  profile?: "spherical" | "flat" | "custom",
  shell?: GeometrySpec,
  bands?: Array<{
    id: string,
    radius: number,
    color?: ColorRef
  }>,
  binaries?: Array<{
    id: string,
    motion: MotionSpec
  }>,
  architrinos?: Array<{
    id: string,
    orbit: MotionSpec
  }>,
  deformation?: {
    type: "none" | "lorentz_oblate" | "pulse" | "custom",
    axisSource?: "velocity" | "path_tangent" | "custom",
    params?: Record<string, number>
  }
}
```

### ChargeSpec

Purpose:

- define typed personality charges,
- support binding mode, placement policy, and local secondary motion.

Draft shape:

```js
ChargeSpec {
  type: "electrino" | "positrino" | string,
  attach: "independent" | "bound_to_core",
  placement?: "band" | "shell" | "custom",
  placementParams?: Record<string, number>,
  motion?: MotionSpec | MotionSpec[]
}
```

### MotionSpec

Purpose:

- define composable motion primitives for transport, internal dynamics, and deformation.

Draft shape:

```js
MotionSpec =
  | { type: "fixed" }
  | { type: "translate", velocity?: [number, number, number], angularVelocity?: [number, number, number] }
  | { type: "orbit.circular", center: Ref, radius: number, frequencyHz: number, phase?: number, direction?: "cw" | "ccw" }
  | { type: "orbit.elliptical", center: Ref, a: number, b: number, frequencyHz: number, phase?: number, tilt?: [number, number, number], direction?: "cw" | "ccw" }
  | { type: "path", pathId: string, speed?: number, phase?: number }
  | { type: "jiggle", amplitude: number, frequency?: number, seed?: number }
  | { type: "deform", profile: "lorentz_oblate" | string, target?: Ref, params?: Record<string, number> }
```

### TimeSpec

Purpose:

- define the master scene timeline in seconds,
- make playback length, rate, and looping explicit,
- provide the base clock for Hz-based motion.

Draft shape:

```js
TimeSpec {
  timeBase: "seconds",
  start: number,
  end: number,
  playbackRate?: number,
  loop?: boolean
}
```

### CameraPathSpec

Purpose:

- define camera position and viewing orientation over the same scene timeline as assembly animation,
- support both explicit authored paths and automatic follow-camera modes.

Draft shape:

```js
CameraPathSpec {
  id: string,
  mode: "waypoints" | "follow",
  frame?: FrameSpec,
  timing?: TimeMapSpec,
  waypoints?: Array<{
    t: number,
    position?: [number, number, number],
    lookAt?: [number, number, number],
    orientation?: [number, number, number]
  }>,
  follow?: {
    target: Ref,
    style: "trail" | "lead" | "flank" | "orbit" | "custom",
    distance?: number,
    height?: number,
    lateralOffset?: number,
    lookAtTarget?: Ref
  }
}
```

### ReactionSpec and TransferSpec

Purpose:

- model exchanges, relocks, handoffs, disassembly, and branch outcomes,
- connect time, participants, and path geometry,
- remain explicit enough for export, validation, and replay.

Draft shape:

```js
ReactionSpec {
  id: string,
  participants: Array<{ assembly: Ref, role: "reactant" | "product" | "catalyst" | "emission" }>,
  timeline?: Array<{
    t: number,
    action: "spawn" | "despawn" | "transform" | "detach" | "attach" | "handoff" | "reassemble",
    target: Ref,
    params?: Record<string, unknown>
  }>,
  outputs?: Array<{ toScene?: string }>
}
```

### ProvenanceSpec

Purpose:

- record causal origin and transfer history,
- survive export/import,
- support both visualization and analysis.

Possible fields include:

- source id,
- destination id,
- transfer time,
- path or corridor id,
- recruited substrate source,
- confidence or validation state.

---

## Near-term implementation stance

The near-term composer should not try to solve the full final problem all at once.

The right near-term stance is:

1. keep the current overlay-based authoring shell,
2. strengthen the exported scene/spec structure,
3. add a dedicated `Scene-Composed-Animation` runtime path,
4. make paths, frame state, and camera state more explicit,
5. add recursive assembly authoring,
6. add explicit Noether core authoring,
7. add bound personality charge authoring,
8. add explicit translation, rotation, and internal orbit motion,
9. add reaction objects,
10. add provenance objects,
11. move progressively toward a truly 3D-first authoring model.

That path respects the current implementation while still aiming at the correct long-term ontology.

---

## Coverage of the target scenes

The draft schema above is intended to be able to describe the target scenes discussed so far.

- A translating electron-like assembly is covered by `TimeSpec`, a root `AssemblySpec`, a straight-line `PathSpec`, a `CoreSpec` with internal `architrinos`, and bound `ChargeSpec` entries for the six electrino personality charges.
- A high-velocity Lorentz-oblate flythrough is covered by parent transport motion plus `CoreSpec.deformation` with `type: "lorentz_oblate"` and an axis derived from velocity or path tangent.
- A curved-path assembly with charge jiggle is covered by spline or point-based `PathSpec` plus local `jiggle` motions on the charge specs.
- A reaction with disassembly and reassembly is covered by `ReactionSpec`, `TransferSpec`, and `ProvenanceSpec` on the shared scene timeline.
- A photon-like paired-core assembly is covered by one parent `AssemblySpec` containing two child flat `CoreSpec` objects, a small authored offset in local transforms, and explicit `binaries` whose motions carry `direction: "cw"` or `direction: "ccw"`.
- Camera action across any of these scenes is covered by `ViewSpec` plus `CameraPathSpec`, either as explicit waypoints with `position`, `lookAt`, or `orientation`, or as authored follow modes such as trail, lead, flank, or orbit around a moving target assembly.

---

## Recommended direction

The long-term vision should be:

- a 3D-first authoring environment,
- a dedicated composed-animation scene type inside the existing scene graph,
- canonical JSON export from structured authored data,
- a general runtime that can render any valid composed-animation scene,
- explicit Noether core, charge, path, and reaction authoring,
- explicit time-aware playback,
- recursive assembly construction,
- explicit provenance and path-history.

The correct next step is to treat this document as the single source of truth for the composer architecture and composed-animation scene model.

---

## Example scenes this model should be able to author

These are authored animation targets that the canonical JSON model and runtime should be able to express deterministically on a shared scene timeline in seconds.

In any of these scenes, camera path and camera orientation may also change as the timeline progresses.

### 1. Translating electron-like assembly

- A low apparent energy Noether core.
- Internal orbital planes are approximately orthogonal.
- The nested assembly is configured as an electron-like structure with six electrino personality charges arranged in a fourth shell.
- The full assembly travels through the scene on a straight-line path.
- Internal architrinos continue their authored orbital motion while the assembly translates.
- Bound personality charges remain attached to the assembly while preserving their own placement and optional secondary motion.

### 2. Translating and rotating bound assembly

- A Noether core assembly translates along an authored path while the whole assembly also rotates.
- Internal orbit motion remains coherent in the assembly frame during transport and rotation.
- The runtime composes local orbit motion with parent translation and parent rotation.

### 3. High-velocity Lorentz-oblate flythrough

- A Noether core assembly accelerates into a high-velocity segment.
- The deformation profile becomes Lorentz-oblate along the direction of travel as velocity approaches \(c_f\).
- Internal constituents and bound charges remain visually attached to the deformed assembly through the authored motion.

### 4. Curved-path assembly with charge jiggle

- A bound assembly follows a curved spline path through the scene.
- Personality charges are attached declaratively to the core.
- Charges exhibit small local jiggle motion superposed on the larger assembly transport.

### 5. Reaction with disassembly and reassembly

- Two or more incoming assemblies follow authored approach paths.
- At specified timeline moments, reactants disassemble into explicit constituent parts.
- Selected parts transfer across handoff paths or reaction corridors.
- Product assemblies reassemble from those parts and continue on authored outgoing paths.
- Provenance records preserve where each transferred component came from.

### 6. Photon-like paired-core assembly

- A photon-like assembly is authored as two flat Noether cores inside one parent assembly.
- The second core follows the first at a small authored offset.
- The first core carries three binary internal motions rotating clockwise.
- The second core carries three binary internal motions rotating counterclockwise.
- Both cores remain explicit authored sub-assemblies rather than hidden procedural effects.
- The full paired-core assembly may itself translate, rotate, and follow an authored path while the internal motions continue.
