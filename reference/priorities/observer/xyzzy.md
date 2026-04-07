# Xyzzy

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep Xyzzy focused on the authoring surface, the visible tile grammar, and the JSON boundary with the solver.
- Prefer simple surface rules over inferred geometry, hidden spacing logic, or special-case rendering heuristics.
- Use `xyzzy` in code and file naming for the new app family.
- Do not introduce geometry concepts that depend on explicit gap calculation between tiles.
- Do not invent surrounding app chrome, editor panels, status copy, or decorative framing that is not explicitly specified here.
- Treat JSON as a boundary contract, not as permission to add a visible JSON editor panel by default.
- Prefer glyph-defined tiles over generic cards, plain text boxes, or inferred tile appearance.

## Purpose

Xyzzy is the tile-based reaction-authoring surface.

Its job is to present a simpler authored graph made from:

- assemblies;
- operators;
- direct splines between neighboring object bands;
- and late-drawn composite labels.

It owns:

- the visible tile grammar of the surface;
- manual authorship of spline links between neighboring object bands;
- JSON import and export at the Xyzzy boundary;
- and the final rendered form of assemblies, operators, splines, and composite labels.

It does not own:

- hidden gap calculation;
- special connector widgets;
- a surface model that depends on inferred sub-tile geometry;
- or extra application chrome such as title banners, toolbars, JSON side panels, validation panels, hint copy, or decorative framed canvases unless those are explicitly specified here.

## Design

### Surface Scope

Xyzzy specifies the authored tile surface itself.

Its purpose is not to invent a surrounding standalone app shell beyond what this document names explicitly.

For v1, the following are not part of the Xyzzy surface spec unless they are added here later:

- title banners or subtitles above the surface;
- home buttons, reset buttons, export buttons, or similar toolbar controls;
- status lines, hint text, or explanatory paragraphs around the surface;
- visible JSON editor panels or validation panels;
- decorative bordered cards or framed sub-canvases around the tile surface;
- and labeled header bars such as a separate `Surface` title row above the grid.

The surface itself should therefore remain the primary artifact.

### Surface Primitive

The basic surface primitive is the tile.

Each tile is a fixed visual glyph block.

That tile artwork should be understood as two concentric regions:

- an interior bordered glyph field;
- and an outer half-gap field beyond that interior border on all four sides.

The visual half-gap belongs to the glyph design itself, not to layout math.

Therefore:

- tiles may be abutted horizontally with no programmatic gap calculation;
- tiles may be abutted vertically with no programmatic gap calculation;
- visible spacing between neighboring interior borders comes from the two abutted half-gap fields of the neighboring tiles;
- the half-gap belongs outside the interior border rather than being simulated by external CSS gap values;
- visible spacing comes from the tile glyph artwork alone;
- and runtime layout should not calculate, store, or infer tile gaps.

### Baseline Tile Box

The baseline Xyzzy tile is a fixed `80px x 80px` square.

That full `80px x 80px` tile area is filled solid black.

Inside that black tile field sits one centered rounded-corner square border with dimensions `72px x 72px`.

Because the inner square is centered both horizontally and vertically, the remaining black field is `4px` on each side.

That black outer field is part of the tile itself rather than a layout gap between neighboring tiles.

The centered inner rounded square is border only.

Its interior is clear, so the tile continues to show the same black background through the middle of the bordered square.

For the baseline tile family, that bordered inner rounded square may use one of three canonical stroke colors drawn from the current reaction app palette:

- red: `#ff5a4a`;
- blue: `#2d8cff`;
- purple: `#a259ff`.

The text payload for a tile belongs inside that centered `72px x 72px` bordered square and sits over the black tile background visible through that clear interior.

This section defines only the base tile box, the black outer field, the centered bordered square, and the allowed baseline border colors.

Text variants, text placement rules, and per-tile payload options should be specified separately.

### Standard Tile Text

Xyzzy standard text tiles may use up to three short lines of text inside the centered `72px x 72px` bordered square.

The baseline text inventory should be derived from the current reaction app tile vocabulary, but Xyzzy should express that vocabulary as explicit three-line tile text rather than corner counters or ad hoc line splitting.

The standard tile should not use corner ledger numbers.

If a tile uses fewer than three visible lines, the unused lower lines remain blank.

The generator in `scripts/glyphs/glyph.py` should be treated as reference code for this tile family.

Each row in the following table is one permitted standard-tile text form.

For polarity-driven families, the table below lists the baseline `Pro` form.

Every row in this table that begins with `Pro` also permits a matching `Anti` form.

For those matching anti forms, line 1 changes from `Pro` to `Anti`.

For most such rows, line 2, line 3, and color remain the same.

Proton and neutron are the exception:

- `Anti Proton` uses line 3 `!u !d !u`;
- and `Anti Neutron` uses line 3 `!d !u !d`.

| Line 1       | Line 2        | Line 3       | Color                                 |
| ------------ | ------------- | ------------ | ------------------------------------- |
| `<count> ϵ+` | `Associate`   | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue |
| `<count> ϵ+` | `Dissociate`  | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue |
| `<count> ϵ+` | `Pass Thru`   | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue |
| `<count> ϵ+` | `Architrinos` | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue |
|              | `Photon`      |              | white                                 |
| `Pro`        | `Noether`     | `Core`       | white                                 |
| `Negative`   | `W`           | `Boson`      | white                                 |
| `Neutral`    | `Z`           | `Boson`      | white                                 |
| `Positive`   | `W`           | `Boson`      | white                                 |
| `Noether`    | `Pair`        | `Pro+Anti`   | white                                 |
| `Noether`    | `Quad`        | `Two Pair`   | white                                 |
| `Pro`        | `Uni`         | `Binary`     | white                                 |
| `Pro`        | `Bi`          | `Binary`     | white                                 |
| `Pro`        | `Tau`         |              | white                                 |
| `Pro`        | `Muon`        |              | white                                 |
| `Pro`        | `Electron`    |              | white                                 |
| `Pro`        | `Tau`         | `Neutrino`   | white                                 |
| `Pro`        | `Muon`        | `Neutrino`   | white                                 |
| `Pro`        | `Electron`    | `Neutrino`   | white                                 |
| `Pro`        | `Bottom`      | `Quark`      | white                                 |
| `Pro`        | `Strange`     | `Quark`      | white                                 |
| `Pro`        | `Down`        | `Quark`      | white                                 |
| `Pro`        | `Top`         | `Quark`      | white                                 |
| `Pro`        | `Charm`       | `Quark`      | white                                 |
| `Pro`        | `Up`          | `Quark`      | white                                 |
| `Pro`        | `Proton`      | `u d u`      | white                                 |
| `Pro`        | `Neutron`     | `d u d`      | white                                 |
| `Positive`   | `Pion`        | `u !d`       | white                                 |
| `Negative`   | `Pion`        | `d !u`       | white                                 |
| `Neutral`    | `Pion`        | `u !u`       | white                                 |
| `Neutral`    | `Pion`        | `d !d`       | white                                 |
| `Positive`   | `Kaon`        | `u !s`       | white                                 |
| `Negative`   | `Kaon`        | `s !u`       | white                                 |
| `Neutral`    | `Kaon`        | `d !s`       | white                                 |
| `Neutral`    | `Kaon`        | `s !d`       | white                                 |
| `Positive`   | `B Meson`     | `u !b`       | white                                 |
| `Negative`   | `B Meson`     | `b !u`       | white                                 |
| `Neutral`    | `B Meson`     | `d !b`       | white                                 |
| `Neutral`    | `B Meson`     | `b !d`       | white                                 |

These text forms cover the current reaction app tile labels, picker labels, and composite preview texts, but recast them into one explicit three-line standard-tile grammar.

The reaction app binary-personality selector choices such as `e/e`, `p/e`, and `p/p` are not standard text tiles in this Xyzzy baseline.

For the three operator tiles `Associate`, `Dissociate`, and `Pass Thru`, line 1 and line 3 are not ordinary words.

Those two lines are dynamic count lines and should use the epsilon symbol form already used in `glyph.py`.

That means:

- line 1 should be written as `<count> ϵ+`;
- and line 3 should be written as `<count> ϵ-`.

There should be exactly one space between the count and the epsilon symbol.

In code or SVG entity form, that same epsilon symbol is `&#x03F5;`.

For these architrino count lines:

- a positrino count line should use the standard red text color;
- and an electrino count line should use the standard blue text color.

All other standard tile text should use white.

### Tile Glyph Construction

Assemblies and operators should be constructed from tile glyphs, not from generic cards with text dropped onto them.

For the standard binary tile language, the glyph should be built explicitly from the canonical binary components:

- the orbit ellipse;
- the axial line;
- the left and right pole charges;
- and any required top or bottom personality marks required by the tile payload.

Title tiles, free-electrino tiles, free-positrino tiles, ledger tiles, and operator tiles are also tile glyphs.

That means:

- a four-tile assembly row is four abutted glyph tiles;
- a one-tile operator is one glyph tile;
- the interior border of each tile belongs to that tile's own artwork;
- the half-gap field sits outside that interior border on all four sides;
- and the runtime should not fake this look by inserting layout gaps, panel padding, or extra wrapper borders between otherwise plain rectangles.

### Column And Row Model

The surface should use a simple tile grid.

Each visible object occupies whole tile positions in that grid. The runtime should care about:

- tile column;
- tile row;
- tile width in tiles;
- tile height in tiles;
- and the fixed routing-column layout of the surface.

Every placeable object should therefore be modeled as a rectangle on the tile grid.

The baseline rectangle rules are:

- an assembly is `w=4`, `h=1`;
- an operator is `w=1`, `h=1`.

Every object occupies exactly one row.

The surface should also reserve one full blank row at the top of the grid for future additions.

That reserved top row:

- is part of the same tile grid as the authored surface;
- is not a separate header bar or framed panel;
- is blank in v1;
- and is not a normal placement target for assemblies, operators, splines, or composite labels in v1.

Normal authored rows therefore begin below that reserved top row.

Spline attachment should use only the outer rectangle bounds of the two linked objects.

### Fixed Column Strip

The base reaction diagram should use one fixed 20-column strip.

Those columns are:

- column 1: blank, reserved for future composite-label use;
- columns 2-5: reactant assembly band;
- column 6: spline routing band;
- column 7: operator band;
- column 8: spline routing band;
- columns 9-12: intermediate assembly band;
- column 13: spline routing band;
- column 14: operator band;
- column 15: spline routing band;
- columns 16-19: product assembly band;
- column 20: blank, reserved for future composite-label use.

This makes the surface grammar explicit:

- assemblies always live in one of the four-tile assembly bands;
- operators always live in one of the one-tile operator bands;
- splines use the dedicated routing bands between those object bands;
- and the outer blank columns remain reserved for later composite-label work.

The runtime should not infer column meaning from object type or current occupancy. Column meaning is fixed by the strip definition.

Placement should also be strict by object class:

- reactant assemblies may be placed only in columns 2-5;
- intermediate assemblies may be placed only in columns 9-12;
- product assemblies may be placed only in columns 16-19;
- operators may be placed only in column 7 or column 14.

For the JSON contract, semantic placement role should be explicit rather than inferred only from `x`.

That means:

- assembly records declare `reactant`, `intermediate`, or `product`;
- and validation requires both a valid declared role and a matching allowed placement region.

### Assembly

An assembly is one horizontal strip of four abutted tiles.

The baseline assembly shape is:

- tile 1: title tile;
- tile 2: binary tile;
- tile 3: binary tile;
- tile 4: binary tile.

The typical assembly therefore contains:

- one title tile;
- and three binary tiles, which may include polar architrino glyphs using the standard tile language.

An assembly is authored and stored as one object with one placement. Its four tiles are part of one visual unit, not four independent surface objects.

The assembly record should store only its origin tile position. Internal tile positions should be implied by fixed offsets:

- title tile at offset `0`;
- second tile at offset `1`;
- third tile at offset `2`;
- fourth tile at offset `3`.

The runtime should not store independent placement data for the internal assembly tiles.

For the JSON contract, the assembly display payload should still be explicit.

That means:

- the record stores one origin position for placement;
- the four tile offsets are implied by the fixed `4x1` assembly shape;
- but the display content for tiles 1-4 is carried explicitly in assembly data rather than guessed only from `type`.

### Free Architrinos Assembly

`Free Architrinos` is also one horizontal strip of four abutted tiles.

Its tile order is:

- tile 1: title tile;
- tile 2: free electrino tile, shown as visual blue circles with no text;
- tile 3: free positrino tile, shown as visual red circles with no text;
- tile 4: ledger tile showing electrino and positrino counts.

The free electrino and free positrino tiles are visual tiles, not ad hoc overlays. The ledger tile is part of the same four-tile assembly row.

### Operator

An operator is one tile total.

The operator tile contains:

- a title;
- a centered top count line written as `<count> ϵ+` in the standard red text color;
- and a centered bottom count line written as `<count> ϵ-` in the standard blue text color.

`Pass Thru` is an explicit operator type.

`Pass Thru`, `Associate`, and `Dissociate` should all use the same one-tile operator layout:

- centered `<count> ϵ+` at the top in the standard red text color;
- centered operator title in the middle;
- and centered `<count> ϵ-` at the bottom in the standard blue text color.

For `Pass Thru`, the middle title text should be `Pass Thru`.

The operator is therefore simpler than an assembly:

- an assembly is a four-tile horizontal object;
- an operator is a one-tile object.

Even with that difference, both assemblies and operators still live on the same tile grid. Spline attachment should therefore use the same edge rule for both:

- attach at the vertical middle of the outer edge facing the routing column.

Operators remain linkable on both their left and right sides. A one-tile operator is still a full link endpoint object even though it is visually smaller than a four-tile assembly.

### Spline Authoring

Mappings are authored directly between whole objects, not through separate connection widgets.

The interaction model is:

- hold `Shift`;
- click one assembly or operator as `endpointA`;
- while still holding `Shift`, click a second assembly or operator in the next allowed object band to the left or right as `endpointB`;
- create a spline between them.

The spline should attach:

- at the vertical middle of one linked object's outer edge facing the routing column;
- and at the vertical middle of the other linked object's outer edge facing that same routing column.

This means:

- links between neighboring object bands attach from the right edge of the left-side object to the left edge of the right-side object;
- and the two clicked endpoints are only the two linked objects, not directional source and target roles.

Each link should route through the single routing column between the two neighboring object bands.

That means:

- the link starts on the left side of that routing column;
- the link ends on the right side of that same routing column;
- and the spline shape belongs to that one routing column rather than spanning multiple routing columns.

The runtime should not expose or render separate connection circles.

Spline coloring is a later finishing action, like composite labels, and should not complicate the first-pass interaction or layout model.

For the first implementation:

- splines should be uncolored;
- spline meaning should not depend on color;
- the runtime should treat all splines as one visual class;
- one spline shape only should be supported in v1;
- no alternate routing styles should be supported in v1;
- and manual bend editing should not exist in v1.

For v1 interaction behavior:

- plain click on an object does nothing special;
- plain click on empty space does nothing special;
- hold `Shift` and click two valid objects to create a link;
- plain click on a spline deletes that spline immediately;
- spline deletion has no confirmation step in v1;
- and `Shift` is reserved for spline authoring, not multiselect.

### Adjacency Rule

Spline creation should be limited to neighboring object bands separated by one routing band.

In this document, `neighboring object bands` means the next legal pair of object bands separated by exactly one routing column.

That rule keeps the authored graph legible and keeps the gesture model simple.

A valid authored spline therefore requires:

- one endpoint object in one object band;
- the other endpoint object in the next object band to the left or right;
- and the dedicated routing band between them.

Links may connect objects on any rows as long as the objects are in neighboring object bands with the correct routing column between them.

The intended neighboring-band pairs are:

- reactant assembly band to operator column 7;
- operator column 7 to intermediate assembly band;
- intermediate assembly band to operator column 14;
- operator column 14 to product assembly band.

Their routing columns are:

- reactant assembly band to operator column 7 uses routing column 6;
- operator column 7 to intermediate assembly band uses routing column 8;
- intermediate assembly band to operator column 14 uses routing column 13;
- operator column 14 to product assembly band uses routing column 15.

Non-neighboring object-band links should not be created directly by the basic interaction.

Links are not visually directed.

The implied reaction flow is left to right because the surface bands are ordered left to right from reactants toward products.

The link record may still store two endpoints for validation and serialization, but the rendered spline should not display an arrow or any other direction marker.

Links are undirected at the authored-surface level:

- `A-B` is the same link as `B-A`;
- endpoint order does not create a distinct second link;
- and uniqueness is by endpoint pair, not by ordered pair.

Self-links are forbidden.

Duplicate links between the same two endpoint objects are forbidden. If the user attempts to create the same link again, the runtime should ignore that creation attempt.

### Composite Labels

Composite labels and their vertical span line are a later rendering pass.

They should:

- be specified explicitly in JSON;
- be rendered after assemblies, operators, and splines;
- and behave as after-effects rather than core placement objects.

Composite labels belong in the first and last tile column regions. The surface layout must therefore reserve one tile space on those outer sides.

That reserved space exists so the composite label system can be added without disturbing the primary four-tile object grammar.

The base reaction diagram should therefore include:

- a one-tile reserved blank column on the far left;
- and a one-tile reserved blank column on the far right.

Those reserved outer columns exist even when no composite labels are currently drawn.

For v1, composite labels should be absent by default:

- `compositeLabels` may be omitted;
- `compositeLabels` may be empty;
- and base rendering must not depend on composite labels being present.

### Rendering Order

The preferred rendering order is:

1. reserved outer label space;
2. assembly and operator tiles;
3. splines;
4. composite labels and vertical span lines;
5. late visual finishing such as spline coloring.

This keeps the primary object grammar stable and makes the label system an explicit final pass.

### JSON Model

The Xyzzy JSON contract should describe the authored surface directly.

The contract should represent:

- assemblies;
- operators;
- spline links;
- and composite-label after-effects.

The contract should prefer explicit tile-level display records over inferred geometry.

The contract should stay flat rather than hierarchical at the top level.

The JSON contract is a boundary contract.

It does not imply that the runtime should render a visible side-by-side JSON editing panel as part of the default Xyzzy surface.

Recommended object model:

- every assembly record stores one origin tile position in an allowed four-tile assembly band, an explicit semantic role, and an explicit four-tile display payload;
- every operator record stores one grid position in an allowed one-tile operator band and a one-tile payload containing title plus positrino and electrino counts;
- every spline record stores `endpointA` and `endpointB`;
- every composite-label record stores explicit placement and vertical span intent.

The minimal operator schema should include:

- `id`
- `type`
- `x`
- `y`
- `title`
- `positrinoCount`
- `electrinoCount`

The minimal assembly schema should include:

- `id`
- `type`
- `x`
- `y`
- `title`
- `role`
- `tiles`

The `tiles` field is the canonical display payload for the four assembly tiles.

That means:

- tile 1 content is explicit;
- tiles 2-4 content is explicit;
- and those tile records are not reconstructed only from `type`.

Recommended top-level document shape:

- `assemblies`
- `operators`
- `links`
- `compositeLabels`

Every assembly, operator, link, and composite-label record must have a stable id.

Array order is authorial order only, not semantic order.

Placement must come only from explicit placement fields in the record itself, not from array position.

The runtime should not derive object type or edge attachment rules from label text.

The runtime should not support links to internal assembly tiles. Links are object-to-object only:

- assembly to assembly;
- assembly to operator;
- operator to assembly;
- operator to operator.

The runtime should reject:

- self-links;
- duplicate links between the same two endpoint objects;
- and links that do not belong to one valid routing column between neighboring object bands.

The runtime should validate placement against the fixed column strip:

- reactant assemblies may be placed only in columns 2-5;
- intermediate assemblies may be placed only in columns 9-12;
- product assemblies may be placed only in columns 16-19;
- operators may be placed only in column 7 or column 14;
- the reserved top row is not a normal placement target;
- and reserved blank columns are not normal placement targets.

No two objects may overlap.

Because assemblies are fixed-width objects, overlap should be checked by occupied tile cells, not just by origin coordinates.

### Naming

The new app family should use `xyzzy` naming in file names, code identifiers, and app-specific documents.

The goal is one clear app identity rather than mixed naming across runtime, solver, and surface modules.

## Interfaces

### Inputs

- Xyzzy JSON documents containing assemblies, operators, splines, and composite-label effects;
- user-authored placement changes on the tile grid;
- and user-authored adjacent-column spline links.

Those JSON documents describe the contract boundary. They do not require a built-in visible JSON panel in the authored surface.

For v1, this document does not yet define the full create, move, or delete workflow for assemblies and operators.

This note currently defines:

- surface grammar;
- placement and validation rules;
- JSON shape constraints;
- and spline-link interaction rules.

Detailed v1 workflows for creating, moving, and deleting assemblies and operators remain to be specified separately.

### Outputs

- Xyzzy JSON documents with stable object ids and placements;
- explicit spline link records;
- and explicit composite-label records for the final rendering pass.

### Solver Boundary

The solver boundary may be redefined to fit Xyzzy.

The preferred contract stance is:

- the solver exchanges explicit Xyzzy-owned JSON shapes;
- assemblies and operators arrive as Xyzzy surface objects rather than as data that must be reinterpreted by the renderer;
- spline-producing relationships are explicit in JSON;
- and composite-label after-effects remain explicit data rather than inferred presentation.

The solver should not own screen coordinates or screen geometry details. Xyzzy owns the surface grid and final visual placement.

## Priorities

### 1. Specify The Direct Object-Editing Workflow

Status: `active`

Current:

- the first standalone Xyzzy runtime now exists;
- the `xyzzy/v1` JSON contract, fixed 20-column strip, gap-free tile layout, adjacent-column spline authoring, and optional final-pass composite labels are now implemented;
- but assemblies and operators are still authored through explicit JSON edits because the direct create, move, and delete workflow on the surface remains unspecified.

Objective:

- define the explicit v1 or v2 surface workflow for:
  - creating assemblies and operators;
  - moving them within the fixed strip;
  - deleting them;
  - and keeping those actions consistent with the fixed object bands and occupied-tile overlap rules.

Done when:

- direct object creation, movement, and deletion are defined at the interaction level;
- the runtime no longer depends on JSON hand-editing for normal object authorship;
- and the surface workflow preserves the fixed strip, fixed object sizes, and occupied-tile validation rules.

### 2. Freeze The Richer Tile Payload Vocabulary

Status: `next`

Current:

- `xyzzy/v1` now carries explicit four-tile assembly payloads with minimal tile kinds and counts;
- but the fuller explicit payload for the standard tile language, polar glyph detail, and richer ledger or title variants is still not written down completely.

Objective:

- define the canonical explicit tile-record vocabulary for Xyzzy assemblies;
- keep tile display content explicit in JSON rather than reintroducing inference from `type`;
- and make the richer tile language precise enough that solver output and manual authoring can use the same surface records.

Done when:

- the full tile payload vocabulary is named and explicit;
- polar or ledger details do not depend on app-local inference;
- and example or solver-produced Xyzzy documents can express the intended display records directly.

### 3. Define The Solver Boundary Around `xyzzy/v1`

Status: `next`

Current:

- the standalone Xyzzy app and `xyzzy/v1` contract now exist inside the repo;
- but the upstream and downstream handoff around solver-owned output is still only described at the architectural level.

Objective:

- decide exactly what solver-owned JSON should enter and leave Xyzzy;
- keep assemblies, operators, splines, and composite-label after-effects explicit at that boundary;
- and avoid any return to screen-geometry-driven or renderer-only interpretation.

Done when:

- one solver-facing Xyzzy boundary is written down clearly;
- the exchanged object records are explicit Xyzzy-owned records;
- and the runtime does not need to reinterpret foreign geometry conventions.

### 4. Deepen Composite-Label Semantics Only When Needed

Status: `next`

Current:

- Xyzzy now reserves the outer columns and renders optional composite labels as a final pass;
- but the richer meaning of those labels beyond explicit text plus span intent is still intentionally minimal.

Objective:

- keep the current explicit final-pass model unless a real composite-label use case requires more;
- and when that need appears, define richer label semantics without disturbing the base tile grammar or spline model.

Done when:

- any richer composite-label fields are justified by concrete use;
- the outer reserved columns remain the only composite-label region;
- and base rendering stays independent of composite labels being present.

### 5. Update `glyph.py` To Generate Xyzzy Tiles

Status: `next`

Current:

- `scripts/glyphs/glyph.py` does not yet generate the tile outputs needed by the Xyzzy app;
- and the generation path for title, binary, free-particle, and ledger tiles is not yet defined as part of the Xyzzy toolchain.

Objective:

- update `scripts/glyphs/glyph.py` so it can generate the necessary tiles for the Xyzzy app;
- keep those generated tiles aligned with the canonical Xyzzy tile vocabulary;
- and avoid ad hoc manual tile creation when the tile set evolves.

Done when:

- `glyph.py` emits the required Xyzzy tile outputs;
- the generated set covers the tile families required by the Xyzzy surface grammar;
- and the generation workflow is clear enough that future Xyzzy tile updates do not require one-off manual redraws.
