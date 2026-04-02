# Glyph System for $\mathbb{A}\mathbb{A}\mathbb{A}$

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

## First reaction-solver glyph vocabulary

The general 3D-to-SVG glyph language above still needs a first concrete vocabulary for the reaction solver.

That first vocabulary should be deliberately compact and editor-friendly. Here compact means a reduced, authoring-facing presentation variant rather than a new term from the underlying geometry or dynamics. It is not trying to show every detail of a full assembly glyph at once. It is trying to give the solver a small, legible symbolic language for choosing binary state quickly and consistently.

The current implementation target is therefore narrower than some earlier drafts: the binary glyph layer is now stable enough to implement, while the whole-quark color layer should remain provisional until the slot/axis relation is closed more cleanly.

### Design split

The first-pass reaction glyph grammar should separate three concerns:

- **binary structure**;
- **binary axial state**;
- and **whole-quark color**.

Those should not all be encoded by the same visual channel. At the moment, only the first two are promoted into the current prototype and generator.

The recommended split is:

- the **purple orbit** and **purple axis** encode binary structure;
- the **red and blue spheres** encode architrino polarity at specific semantic sites;
- and the **quark color** should eventually be applied at the whole-quark level, not by changing the internal red/blue binary dots.

This keeps the symbol readable and prevents any future quark-color system from colliding with the existing red/blue architrino language.

### Canonical binary orientation

For the first reaction-solver binary glyph, use a canonical 2D orientation:

- the binary orbit is a **horizontal purple ellipse**;
- the binary axis is a **vertical purple line** through the center;
- the left binary pole is the **blue electrino**;
- the right binary pole is the **red positrino**;
- the top axis site is the **top axial architrino**;
- and the bottom axis site is the **bottom axial architrino**.

That gives a stable authored reading order:

- horizontal pair = the binary;
- vertical pair = the binary's axial architrinos.

### Full binary axial-state set

When the reaction solver needs the full authored state of a binary, it should distinguish all four top/bottom axial assignments:

- `e/e`
- `e/p`
- `p/e`
- `p/p`

Here the notation is **top/bottom**.

So:

- `p/e` means **positrino above** and **electrino below**;
- `e/p` means **electrino above** and **positrino below**.

For compact chip labels, prefer the charge-unit notation already used in the mathematical style guide: $-\epsilon$ for an electrino and $+\epsilon$ for a positrino.

In the current prototype, the compact label is not drawn as a single slash string. Instead:

- the **top** axial architrino is written in the **upper-left** corner;
- the **bottom** axial architrino is written in the **lower-right** corner;
- and the two corner terms use the same red/blue polarity colors as the axial dots themselves.

This makes the tile easier to read at a glance because the glyph remains dominant while the charge labels stay secondary.

### Collapsed neutral-binary rule

Sometimes the UI will want a reduced vocabulary instead of showing both neutral binaries.

In those cases, only one neutral binary should be shown, and the canonical representative should be:

- **positrino above, electrino below**
- that is, **`p/e`** in top/bottom notation.

So the reduced three-state set becomes:

- `e/e`
- `p/e`
- `p/p`

This should be a deliberate rule rather than an incidental renderer choice, so the same neutral representative appears consistently across menus, docs, and solver views.

### Whole-quark color is deferred

Earlier drafts of this note tried to make quark color part of the first-pass glyph vocabulary. That is no longer the right implementation target.

At present:

- the binary glyph is stable enough to implement as a first-class object;
- the whole-quark color story is still under active theoretical revision;
- and the current SVG prototype should therefore stop short of claiming a settled quark-color encoding.

The reason is structural. The open 3x3x3 bookkeeping problem in [3x3.md](../3x3/3x3.md) has not yet been reconciled cleanly with the canonical axis-based quark-color picture in [quarks.md](../../content/markdown/aaa/assemblies/fermions/quarks.md). Until that bridge is explicit, a quark-color picker would look more final than the theory currently warrants.

So this note should treat:

- binary structure and axial state as **implemented scope**;
- and whole-quark color as **deferred scope**.

### Compact chip behavior

In the reaction solver menu, these should appear as compact clickable chips.

The binary axial-state chips should show:

- the binary glyph at center;
- the two corner charge terms when axial state is shown;
- or no axial-state labels at all for the bare neutral-binary view.

Selection should be made obvious by changing the chip background and emphasis state.

Important rule:

- the **background fill** means **UI selection**;
- it should **not** redefine the meaning of the internal red/blue/purple glyph channels.

### First-pass semantic fields

The reduced reaction-solver glyph vocabulary should introduce explicit semantic fields like:

```json
{
  "type": "binary_glyph",
  "binaryPoles": {
    "left": "electrino",
    "right": "positrino"
  },
  "binaryAxialState": {
    "top": "positrino",
    "bottom": "electrino"
  },
  "presentation": {
    "variant": "compact",
    "labelMode": "corner_epsilon",
    "showLabels": true,
    "showAxialState": true,
    "collapsedNeutralRepresentative": "p/e"
  }
}
```

This should be read as:

- `binaryPoles` keeps the left/right binary poles canonical;
- `binaryAxialState` controls the full top/bottom binary state;
- `labelMode` records the corner-label convention;
- `showAxialState` distinguishes bare from axial-state variants;
- and `collapsedNeutralRepresentative` records the canonical neutral choice when a reduced menu is used.

For a bare neutral-binary tile, the same object can suppress axial-architrino labels and markers at the presentation layer rather than switching to a separate symbol family.

### Relationship to the broader glyph system

These reaction-solver glyphs should be treated as a **reduced editor vocabulary** derived from the broader glyph system, not as a competing icon set.

In other words:

- the general glyph system still owns the full 3D semantic assembly model;
- the solver glyph chips are compact projections of that semantic model for authoring tasks;
- and both should share the same underlying semantic fields wherever possible.

### Current implementation status

The current concrete implementation artifacts are:

- the generator at [scripts/glyphs/glyph.py](../../scripts/glyphs/glyph.py);
- standalone outputs at [glyph-binary-bare.svg](../../scripts/glyphs/glyph-binary-bare.svg), [glyph-binary-negative.svg](../../scripts/glyphs/glyph-binary-negative.svg), [glyph-binary-neutral.svg](../../scripts/glyphs/glyph-binary-neutral.svg), and [glyph-binary-positive.svg](../../scripts/glyphs/glyph-binary-positive.svg);
- and the canonical page artifact at [quark-glyph-prototype.svg](../../scripts/glyphs/quark-glyph-prototype.svg).

Those artifacts now cover:

- one bare neutral-binary tile;
- the full four-state axial set;
- and the reduced-menu convention in which `p/e` is the canonical neutral representative.

### Immediate next build target

The next practical implementation target should be:

- a reference schema for the binary glyph object;
- a renderer rule that can switch between the full four-state binary set and the reduced `e/e`, `p/e`, `p/p` set;
- and a composer-side binary picker that consumes the same semantic fields as the generator.

## Immediate next steps

Natural follow-on work from this note would be:

- a reference JSON schema for `binary_glyph`;
- a runtime SVG renderer that consumes the same binary-glyph semantic object;
- a pure SVG renderer;
- a composer-side glyph editor surface;
- a canonical library of reference assemblies for the first binary vocabulary;
- and a separate follow-on note that reopens whole-quark color only after the 3x3x3 and axis-basis relation is closed.

## Related Action Items

- [3x3](../3x3/3x3.md)
- [standard-model-closure](../standard-model-closure/standard-model-closure.md)
- [composer-reaction](../observer/observer.md)
- [viewports](../viewports/viewports.md)

## Related AAA Notes

- [quarks](../../content/markdown/aaa/assemblies/fermions/quarks.md)
- [color-charge-su3](../../content/markdown/aaa/assemblies/fermions/color-charge-su3.md)
- [scene-taxonomy](../../content/markdown/aaa/archie/scene-taxonomy.md)
- [about-the-webapp](../../content/markdown/aaa/archie/about-the-webapp.md)
