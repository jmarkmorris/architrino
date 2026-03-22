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

## First reaction-solver glyph vocabulary

The general 3D-to-SVG glyph language above still needs a first concrete vocabulary for the reaction solver.

That first vocabulary should be deliberately compact and editor-friendly. Here compact means a reduced, authoring-facing presentation variant rather than a new term from the underlying geometry or dynamics. It is not trying to show every detail of a full assembly glyph at once. It is trying to give the solver a small, legible symbolic language for choosing quark flavor, quark color, and binary personality state without crowding the menu.

### Design split

The first-pass reaction glyph grammar should separate three concerns:

- **binary structure**;
- **binary personality state**;
- and **whole-quark color**.

Those should not all be encoded by the same visual channel.

The recommended split is:

- the **purple orbit** and **purple axis** encode binary structure;
- the **red and blue spheres** encode architrino polarity at specific semantic sites;
- and the **quark color** is applied at the whole-quark level, not by changing the internal red/blue binary dots.

This keeps the symbol readable and prevents the quark-color system from colliding with the existing red/blue architrino language.

### Canonical binary orientation

For the first reaction-solver binary glyph, use a canonical 2D orientation:

- the binary orbit is a **horizontal purple ellipse**;
- the binary axis is a **vertical purple line** through the center;
- the left binary pole is the **blue electrino**;
- the right binary pole is the **red positrino**;
- the top axis site is the **top personality charge**;
- and the bottom axis site is the **bottom personality charge**.

That gives a stable authored reading order:

- horizontal pair = the binary;
- vertical pair = the binary's personality charges.

### Full binary personality state set

When the reaction solver needs the full authored state of a binary, it should distinguish all four top/bottom personality assignments:

- `e/e`
- `e/p`
- `p/e`
- `p/p`

Here the notation is **top/bottom**.

So:

- `p/e` means **positrino above** and **electrino below**;
- `e/p` means **electrino above** and **positrino below**.

For compact chip labels, prefer the charge-unit notation already used in the mathematical style guide: $-\epsilon$ for an electrino and $+\epsilon$ for a positrino. In other words, the same four states may also be shown as $-\epsilon / -\epsilon$, $-\epsilon / +\epsilon$, $+\epsilon / -\epsilon$, and $+\epsilon / +\epsilon$ when the chip wants charge-first labeling rather than particle-letter labeling.

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

### Whole-quark color from the three binaries

Quark color should not be treated as a merely decorative frame wrapped around one binary glyph. It should be read from the three-binary quark itself: **inner**, **middle**, and **outer**.

The first picker set should still be:

- `Up Red`
- `Up Purple`
- `Up Blue`
- `Down Red`
- `Down Purple`
- `Down Blue`

For this vocabulary, **purple** should replace **green** as the neutral middle case.

The structural idea is:

- an **up-type quark** is shown by three binaries containing **two positive binaries** and **one neutral binary**;
- a **down-type quark** is shown by three binaries containing **two neutral binaries** and **one negative binary**;
- and `Red`, `Purple`, `Blue` indicate whether that flavor-defining binary sits at the **inner**, **middle**, or **outer** slot.

So the color label is derived from the tri-binary arrangement rather than painted on afterward.

The internal glyphs still use:

- red for positrino;
- blue for electrino;
- and purple for orbit and axis structure.

The quark-color gallery should therefore show three binary glyphs inside each quark tile, labeled `Inner`, `Middle`, and `Outer`, so the reader can see why a given arrangement is called `Red`, `Purple`, or `Blue`.

### Compact chip behavior

In the reaction solver menu, these should appear as compact clickable chips.

The binary-personality chips should show:

- the binary glyph at center;
- and the binary state label.

The quark-color chips should show:

- the quark label such as `Up` or `Down`;
- and the three binary slots `Inner`, `Middle`, `Outer` with their respective binary glyphs.

Selection should be made obvious by changing the chip background and emphasis state.

Important rule:

- the **background fill** means **UI selection**;
- it should **not** carry the quark's semantic color meaning.

Semantic color should be read first from the tri-binary arrangement itself, not from the selected-state background.

### First-pass semantic fields

The reduced reaction-solver glyph vocabulary should introduce explicit semantic fields like:

```json
{
  "type": "quark_glyph",
  "flavor": "up",
  "quarkColor": "purple",
  "binaryPersonality": {
    "top": "positrino",
    "bottom": "electrino"
  },
  "presentation": {
    "variant": "compact",
    "collapsedNeutralRepresentative": "p/e"
  }
}
```

This should be read as:

- `flavor` controls `up` vs `down`;
- `quarkColor` controls `red`, `purple`, or `blue`;
- `binaryPersonality` controls the full top/bottom binary state;
- and `collapsedNeutralRepresentative` records the canonical neutral choice when a reduced menu is used.

### Relationship to the broader glyph system

These reaction-solver glyphs should be treated as a **reduced editor vocabulary** derived from the broader glyph system, not as a competing icon set.

In other words:

- the general glyph system still owns the full 3D semantic assembly model;
- the solver glyph chips are compact projections of that semantic model for authoring tasks;
- and both should share the same underlying semantic fields wherever possible.

### Immediate next build target

The next practical implementation target should be:

- a compact SVG prototype for the binary personality glyphs;
- a matching six-chip quark picker using `Up/Down × Red/Purple/Blue`;
- and a renderer rule that can switch between the full four-state binary set and the reduced `e/e`, `p/e`, `p/p` set.

## Immediate next steps

Natural follow-on work from this note would be:

- a reference JSON schema;
- a compact SVG prototype for the first reaction-solver binary/quark glyph vocabulary;
- a pure SVG renderer;
- a composer-side glyph editor surface;
- and a canonical library of reference assemblies for the first glyph vocabulary.
