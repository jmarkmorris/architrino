# Glyph System for AAA

## Why this note exists

This note captures an implementation-ready idea for a glyph language inside $\mathbb{A}\mathbb{A}\mathbb{A}$: each assembly should admit a single symbolic SVG representation generated from a normalized 3D semantic scene graph.

The target is not a static icon pack, a font, or a one-off illustration pipeline. The target is a parametric symbolic graphics system that can support canonical assemblies, editor tooling, style themes, and eventually animation-aware symbolic reasoning.

In short:

- one assembly -> one SVG output;
- geometry should live in a normalized 3D object model;
- style should remain semantic rather than hardcoded;
- and the resulting system should be editor-friendly rather than hand-drawn.

## Core idea

Treat a glyph as:

> a 3D semantic scene graph projected into a deterministic 2D symbolic SVG.

That means the glyph system should preserve:

- spatial relationships between binaries, poles, shells, and axes;
- semantic roles such as positive, negative, neutral, orbit, shell, and axis;
- reusable hierarchical transforms;
- and a clean separation between structure and visual theme.

## Parametric Assembly Glyph System (v1)

### 0. Purpose

Design a JSON-based symbolic schema for representing 3D assemblies rendered as 2D SVG glyphs, supporting:

- multiple binaries with orientation;
- semantic roles rather than raw colors;
- nested object structure;
- parametric geometry in normalized coordinates;
- style and theme separation;
- and editor compatibility.

Each assembly should map to exactly one SVG output.

### 1. Core design principles

#### 1.1 Coordinate system

- all geometry is defined in normalized 3D space;
- the coordinate range is `[-1, +1]`;
- and the origin `(0, 0, 0)` is the assembly center.

#### 1.2 Projection model

- the default projection is orthographic;
- perspective projection remains an allowed extension;
- and the camera is defined per assembly.

### 2. Top-level schema

```json
{
  "type": "assembly",
  "version": "1.0",
  "meta": {},
  "camera": {},
  "style": {},
  "components": {
    "shells": [],
    "binaries": []
  }
}
```

### 3. Camera and orientation

```json
"camera": {
  "projection": "orthographic",
  "position": [0, 0, 3],
  "target": [0, 0, 0],
  "up": [0, 1, 0],
  "fov": null
}
```

Notes:

- orientation is fully determined by the camera;
- the editor should support rotation, orbit, and snapping to axes;
- and the camera definition should be stable enough that the same assembly yields the same glyph under the same camera.

### 4. Style and theme layer

```json
"style": {
  "roles": {
    "positive_charge": { "fill": "#ff3b30" },
    "negative_charge": { "fill": "#007aff" },
    "neutral": { "fill": "#aaaaaa" },
    "orbit": { "stroke": "#9b59b6", "width": 0.01 },
    "axis": { "stroke": "#444444", "dash": [0.02, 0.02] },
    "shell": { "stroke": "#cccccc", "opacity": 0.3 }
  },
  "node": {
    "radius": 0.06
  }
}
```

Rules:

- no hardcoded colors should appear in geometry definitions;
- geometry should refer to semantic roles;
- and themes should be swappable without changing structural data.

### 5. Components

#### 5.1 Spherical shells

Support up to four shells.

```json
"shells": [
  {
    "id": "shell_1",
    "radius": 0.4,
    "role": "shell"
  }
]
```

Render rule:

- shells project as circles, with depth ordering applied.

#### 5.2 Binaries

Support up to six binaries.

```json
"binaries": [
  {
    "id": "binary_1",
    "transform": {},
    "orbit": {},
    "axis": {},
    "poles": []
  }
]
```

### 6. Binary object definition

#### 6.1 Transform

```json
"transform": {
  "position": [0, 0, 0],
  "rotation": [0, 0, 0],
  "basis": {
    "u": [1, 0, 0],
    "v": [0, 1, 0],
    "w": [0, 0, 1]
  }
}
```

Notes:

- the schema may permit either Euler rotation or explicit basis vectors;
- the editor should support both;
- and transform composition should work cleanly in a matrix-stack pipeline.

#### 6.2 Orbit

```json
"orbit": {
  "type": "ellipse",
  "center": [0, 0, 0],
  "major": 1.2,
  "minor": 0.5,
  "normal": [0, 1, 0],
  "role": "orbit"
}
```

Derived rule:

- the ellipse lies in the plane determined by `normal`, while orientation is resolved through the binary transform.

#### 6.3 Axis

```json
"axis": {
  "type": "line",
  "start": [0, -1, 0],
  "end": [0, 1, 0],
  "role": "axis"
}
```

#### 6.4 Poles

```json
"poles": [
  {
    "id": "pole_A",
    "position": [-1, 0, 0],
    "role": "negative_charge"
  },
  {
    "id": "pole_B",
    "position": [1, 0, 0],
    "role": "positive_charge"
  }
]
```

Rules:

- pole positions are relative to the binary transform;
- decorations can remain a future extension;
- and semantic role assignment should remain distinct from rendering style.

### 7. Object-oriented nesting model

All components should be able to follow a common nested shape:

```json
{
  "id": "...",
  "type": "...",
  "transform": {},
  "children": []
}
```

Benefits:

- hierarchical assemblies;
- reusable grouped transforms;
- composition of subassemblies;
- and future animation grouping.

### 8. Rendering pipeline: JSON -> SVG

#### Step 1: resolve hierarchy

- apply transforms through a matrix stack.

#### Step 2: project 3D -> 2D

- use the assembly camera.

#### Step 3: depth sort

- apply a painter's algorithm or equivalent stable depth-ordering rule.

#### Step 4: generate SVG primitives

| Component | SVG primitive |
| --- | --- |
| Pole | `<circle>` |
| Orbit | `<ellipse>` |
| Axis | `<line>` |
| Shell | `<circle>` |

#### Step 5: apply style roles

- styles resolve through semantic roles rather than component-local hardcoding.

### 9. Editor requirements

The editor should support:

- 3D manipulation including rotate, translate, and scale;
- binary creation up to six instances;
- shell creation up to four instances;
- orbit shaping via major and minor axes;
- axis alignment tools;
- pole assignment and role switching;
- and explicit camera control.

Useful UX features:

- axis gizmos;
- snapping to cardinal axes;
- snapping to symmetry planes;
- and a live SVG preview tied to the current 3D scene state.

### 10. Size and resolution guidance

Because glyphs may become dense:

- `512 x 512` px is the absolute minimum practical output size;
- `1024 x 1024` px is preferred;
- and stroke widths should be normalized so they scale with the viewport.

### 11. Extensibility hooks

Future fields may include:

```json
"animation": {},
"field_lines": {},
"interaction": {},
"labels": {}
```

## Key distinction

This should be treated as:

> a 3D semantic assembly model -> projected symbolic glyph.

It should not be treated as:

- an icon format;
- a font definition;
- or a static SVG-only asset model.

## Why this matters

If this is done well, the glyph system becomes a language for $\mathbb{A}\mathbb{A}\mathbb{A}$ assemblies rather than a bag of isolated diagrams.

That language could eventually support:

- canonical assembly vocabularies;
- renderer generation;
- editor tooling;
- animation and state extensions;
- semantic comparison between assemblies;
- and a shared symbolic layer between theory notes, scenes, and authored interactive tools.

## Immediate next steps

Natural follow-on work from this note would be:

- a reference JSON schema;
- a pure SVG renderer;
- a composer-side glyph editor surface;
- and a canonical library of reference assemblies for the first glyph vocabulary.
