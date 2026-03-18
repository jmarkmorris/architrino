# JS AAA Language (Draft 1)

## Purpose
Define a canonical JavaScript-facing interface for authoring and running AAA scenes consistently across:
- standard model particles, including single and multi-core assemblies
- personality charges (electrino/positrino)
- orbit families (circular + elliptical)
- deforming Noether cores
- 2D and 3D layouts
- reactions between assemblies with provenance of architrinos.

This is a requirements and wireframe draft, not a final spec.

## Relation to the existing scene system

This format should not replace the current explicit scene network. It should define the authored payload for a new special runtime scene type inside that network.

The intended relationship is:

- higher-level collection or index scenes may still present selectable spheres or nodes,
- one of those nodes may target a composed animation scene,
- opening that node should switch into a dedicated composed-animation runtime rather than a markdown-reader flow,
- and the composed animation scene should then render authored assemblies, paths, reactions, and playback.

This makes the format closer to the current family of special interactive scenes, such as periodic-table-driven drill-down flows, than to the standard sphere-to-markdown pattern.

In practical terms:

- composed animation scenes should remain authored scene files that participate in the same manifest and navigation graph,
- they should not rely on `markdownPath` as their primary content contract,
- and higher-level scenes may still reference them through the existing navigation model even if the opened runtime mode is different.

Taxonomically, these scenes are best understood as tool scenes and animation scenes. A dedicated runtime `scene.type` such as `Scene-Composed-Animation` is likely the cleanest way to distinguish them from ordinary diagram and markdown-view scenes, while the canonical authored payload below defines what such a scene contains.

## Design Goals
1. One model for static diagrams and animated assemblies.
2. Declarative first, imperative optional.
3. Stable IDs for all entities for linking, selection, and drill-down.
4. Composable: core + charges + fields + reactions as reusable modules.
5. Deterministic defaults with explicit overrides.

## Non-Goals (for now)
1. Full physics solver in the spec.
2. Tight coupling to Three.js internals.

## Core Requirements

1. **Scene System Relationship**
- The format must work as the authored payload of a dedicated composed-animation scene type inside the existing scene graph.
- Higher-level collection scenes must be able to link to these scenes without forcing a markdown-target interaction model.
- Scene-level runtime controls should fit the app's existing corner-control language, but allow an abbreviated animation-specific control set.

2. **Scene Types**
- `branching`, `diagram`, `markdown_split`, and `composed_animation` must be representable at the semantic level.
- `composed_animation` is the key new special case for authored assembly playback scenes.
- Scene may include both content and simulation components.

3. **Entity Model**
- Any node can be a body, core, charge, field marker, reaction node, or annotation.
- Entity must support geometry, material, motion, metadata, and links.

4. **Motion Model**
- Built-in motion primitives:
  - `fixed`
  - `orbit.circular`
  - `orbit.elliptical`
  - `path`
  - `deform`
- Time-based parameters with optional phase and modulation.

5. **Noether Core Model**
- Canonical core object with:
  - shell geometry
  - binary/tri-band orbital layers
  - optional deformation profile
  - attached charges
- Support single-core and multi-core assemblies.

6. **Charges / Personality Nodes**
- Typed charge entities (`electrino`, `positrino`, future extensions).
- Attach modes:
  - `independent` (scene-level nodes)
  - `bound_to_core` (derived from core config)
- Sizing/placement policies must be declarative.

7. **Color System**
- Global palette registry (named schemes like `legacy`, `spectrum19`, `jewel`).
- Scene-level and component-level palette binding.
- Deterministic assignment modes:
  - by index
  - by angular order
  - by role/type

8. **2D / 3D Support**
- Scene-level dimension mode: `2d`, `2.5d`, `3d`.
- Camera and layout policies independent from model semantics.

9. **Reactions Between Assemblies**
- Reaction graph with typed edges (`reactant`, `product`, `emission`, etc.).
- Reactions may spawn/consume/transform entities over time.
- Event hooks for transitions and drill-downs.

10. **Interactivity**
- First-class actions:
  - drill-down to scene
  - open markdown/doc
  - inspect metadata/details
- Selection and hover IDs must be stable.

11. **Validation & CI**
- JSON schema for structural validity.
- semantic lint:
  - missing targets
  - invalid motion refs
  - unsupported kind/type enums
  - palette name mismatch

## Proposed Canonical Object Wireframe
```js
Scene {
  scene: {
    id: string,
    type: "Scene-Index" | "Scene-Diagram" | "Scene-Markdown-View" | "Scene-Composed-Animation",
    kind: "branching" | "diagram" | "markdown_split" | "composed_animation",
    name: string,
    mode?: "2d" | "2.5d" | "3d",
    layout?: LayoutSpec,
    palette?: PaletteBinding,
    camera?: CameraSpec,
    controls?: ControlSpec
  },
  entities: Entity[],
  interactions?: InteractionSpec[],
  reactions?: ReactionSpec[],
  links?: LinkSpec[],
  metadata?: Record<string, unknown>
}
```

```js
Entity {
  id: string,
  role: "core" | "charge" | "assembly" | "field" | "reaction" | "annotation" | string,
  label?: string,
  geometry?: GeometrySpec,
  material?: MaterialSpec,
  transform?: TransformSpec,
  motion?: MotionSpec | MotionSpec[],
  children?: EntityRef[],
  bindings?: BindingSpec[],
  interaction?: {
    subScene?: string,
    markdownPath?: string,
    markdownSection?: string
  },
  metadata?: Record<string, unknown>
}
```

```js
CoreSpec (role="core") {
  coreType: "noether",
  bands?: [
    { id: "outer" | "middle" | "inner" | string, radius: number, color?: ColorRef },
  ],
  deformation?: {
    type: "none" | "pulse" | "ellipsoid" | "custom",
    params?: Record<string, number>
  },
  charges?: {
    type: "electrino" | "positrino" | string,
    count: number,
    radius?: number,
    placement: "band" | "shell" | "custom",
    placementParams?: Record<string, number>
  }[]
}
```

```js
MotionSpec =
  | { type: "fixed" }
  | { type: "orbit.circular", center: Ref, radius: number, speed: number, phase?: number }
  | { type: "orbit.elliptical", center: Ref, a: number, b: number, speed: number, phase?: number, tilt?: [number,number,number] }
  | { type: "path", pathId: string, speed: number, phase?: number }
  | { type: "deform", target: Ref, profile: string, speed: number, amplitude: number }
```

## Palette Wireframe
```js
PaletteRegistry {
  defaultSphereScheme: "jewel",
  schemes: {
    jewel: string[],
    legacy: string[],
    spectrum19: string[]
  }
}
```

```js
PaletteBinding {
  scheme: string,
  assignment: "index" | "angular" | "role",
  overrides?: Array<{ selector: string, color: string }>
}
```

## Reaction Wireframe
```js
ReactionSpec {
  id: string,
  participants: Array<{ entity: Ref, role: "reactant" | "product" | "catalyst" | "emission" }>,
  timeline?: Array<{ t: number, action: "spawn" | "despawn" | "transform" | "link" | "unlink", target: Ref, params?: any }>,
  outputs?: Array<{ toScene?: string, markdownPath?: string }>
}
```

## Authoring Levels
1. **L1 (Simple)**: scene + entities + fixed/orbit motion + drill-down.
2. **L2 (Assembly)**: core bands, typed charges, palette binding, simple reactions.
3. **L3 (Advanced)**: deformation, multi-core interaction, timeline reaction choreography.

## Migration Notes (Current App -> Canonical)
1. Map `objects[]` -> `entities[]`.
2. Preserve current scene-graph participation and add a dedicated runtime `scene.type` for authored composed animation scenes.
3. Preserve `scene.kind` (`branching`, `diagram`, `markdown_split`) for existing scenes and introduce `composed_animation` for this new class.
4. Allow higher-level collection scenes to keep their normal selectable node presentation while routing into composed animation scenes at open time.
5. Map ordinary markdown-target nodes to interaction bindings where applicable, but do not require `markdownPath` for composed animation scenes.
6. Map `renderStyle: binarySphere/binaryShell` -> `role: core` + `CoreSpec`.
7. Map `binaryBands` + orbit runtime fields into explicit `bands` and `MotionSpec`.
8. Keep `subScenes`/`markdownPath` as interaction bindings where they are still relevant.

## Open Questions
1. Should charge placement be procedural-only, declarative-only, or both?
2. How strict should determinism be for randomized layouts/phase initialization?
3. Do we need a separate `simulation` section for solver-backed scenes?
4. Should `ReactionSpec.timeline` support expressions/functions or data-only values?
5. What minimum subset is required before migration starts?

## Suggested Next Step
Define a minimal v0.1 JSON schema for:
1. `Scene`
2. `Entity`
3. `MotionSpec` (fixed + circular + elliptical only)
4. `PaletteBinding`
