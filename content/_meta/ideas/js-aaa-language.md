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


2. **Entity Model**
- Any node can be a body, core, charge, field marker, reaction node, or annotation.
- Entity must support geometry, material, motion, metadata, and links.

3. **Motion Model**
- Built-in motion primitives:
  - `fixed`
  - `orbit.circular`
  - `orbit.elliptical`
  - `path`
  - `deform`
- Time-based parameters with optional phase and modulation.

4. **Noether Core Model**
- Canonical core object with:
  - shell geometry
  - binary/tri-band orbital layers
  - optional deformation profile
  - attached charges
- Support single-core and multi-core assemblies.

5. **Charges / Personality Nodes**
- Typed charge entities (`electrino`, `positrino`, future extensions).
- Attach modes:
  - `independent` (scene-level nodes)
  - `bound_to_core` (derived from core config)
- Sizing/placement policies must be declarative.

6. **Color System**
- Global palette registry (named schemes like `legacy`, `spectrum19`, `jewel`).
- Scene-level and component-level palette binding.
- Deterministic assignment modes:
  - by index
  - by angular order
  - by role/type

7. **2D / 3D Support**
- Scene-level dimension mode: `2d`, `2.5d`, `3d`.
- Camera and layout policies independent from model semantics.

8. **Reactions Between Assemblies**
- Reaction graph with typed edges (`reactant`, `product`, `emission`, etc.).
- Reactions may spawn/consume/transform entities over time.
- Event hooks for transitions and drill-downs.

9. **Interactivity**
- First-class actions:
  - drill-down to scene
  - open markdown/doc
  - inspect metadata/details
- Selection and hover IDs must be stable.

10. **Validation & CI**
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
    kind: "branching" | "diagram" | "markdown_split",
    name: string,
    mode?: "2d" | "2.5d" | "3d",
    layout?: LayoutSpec,
    palette?: PaletteBinding,
    camera?: CameraSpec
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
2. Preserve `scene.kind` (`branching`, `diagram`, `markdown_split`).
3. Map `renderStyle: binarySphere/binaryShell` -> `role: core` + `CoreSpec`.
4. Map `binaryBands` + orbit runtime fields into explicit `bands` and `MotionSpec`.
5. Keep `subScenes`/`markdownPath` as interaction bindings.

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
