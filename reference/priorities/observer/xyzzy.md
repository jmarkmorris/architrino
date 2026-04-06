# Xyzzy

## LLM Instructions

- Keep `Priorities` ordered as the current work queue, with the most important active item first.
- Keep `Design` descriptive and stable; move task-shaped material into `Priorities`.
- Keep Xyzzy focused on the authoring surface, the visible tile grammar, and the JSON boundary with the solver.
- Prefer simple surface rules over inferred geometry, hidden spacing logic, or special-case rendering heuristics.
- Use `xyzzy` in code and file naming for the new app family.
- Do not introduce geometry concepts that depend on explicit gap calculation between tiles.

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
- or a surface model that depends on inferred sub-tile geometry.

## Design

### Surface Primitive

The basic surface primitive is the tile.

Each tile is a fixed visual glyph block whose artwork includes half-gap padding on all four sides. That visual spacing belongs to the glyph design itself, not to layout math.

Therefore:

- tiles may be abutted horizontally with no programmatic gap calculation;
- tiles may be abutted vertically with no programmatic gap calculation;
- visible spacing comes from the tile glyph artwork alone;
- and runtime layout should not calculate, store, or infer tile gaps.

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
- a centered positrino count at the top of the interior bordered glyph;
- and a centered electrino count at the bottom of the interior bordered glyph.

`Pass Thru` is an explicit operator type.

`Pass Thru`, `Associate`, and `Dissociate` should all use the same one-tile operator layout:

- centered positrino count at the top;
- centered operator title in the middle;
- and centered electrino count at the bottom.

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

### 1. Define The Xyzzy JSON Contract

Status: `active`

Current:

- the new surface grammar is clear at the tile and interaction level;
- but the canonical Xyzzy document shape is not yet written down completely.

Objective:

- define one JSON schema for assemblies, operators, splines, and composite-label effects;
- make four-tile assembly payloads explicit;
- make one-tile operator payloads explicit;
- make semantic placement role explicit in JSON rather than inferred only from `x`;
- keep the top-level document flat;
- require stable ids on all authored record types;
- make array order authorial only;
- make placement explicit in record fields rather than implied by array position;
- and make adjacency-based spline links explicit.

Done when:

- a single Xyzzy document shape exists;
- the four-tile assembly grammar and one-tile operator grammar are explicit in JSON;
- assembly tile content is explicit in JSON rather than implied only by `type`;
- semantic placement role is explicit and validated against placement coordinates;
- the document uses flat top-level lists for main authored objects;
- every authored record type carries a stable id;
- array order is non-semantic;
- and placement is explicit in record fields;
- and composite-label after-effects are defined as final-pass records.

### 2. Make Tile Geometry Gap-Free In Code

Status: `next`

Current:

- the visual direction is to place half-gap spacing inside the glyph artwork itself;
- but the implementation rules still need to state that runtime tile layout never computes gaps.

Objective:

- remove gap calculation from the runtime model;
- treat tiles as abutted units in both horizontal and vertical directions;
- model assemblies and operators as simple grid rectangles;
- define one fixed reaction-diagram column strip with dedicated routing bands;
- make object placement strict by object class and strip position;
- and make tile-edge attachment math depend only on tile bounds plus the fixed strip.

Done when:

- layout uses abutted tile rectangles only;
- assemblies are always `4x1` and operators are always `1x1` at the surface-geometry level;
- the 20-column strip is explicit and enforced;
- each object class has one exact allowed placement region in that strip;
- no runtime gap values are needed for placement or spline attachment;
- and visual spacing comes entirely from glyph design.

### 3. Implement Adjacent-Column Spline Authoring

Status: `next`

Current:

- the target interaction is defined;
- but the interaction and deletion rules are not yet captured in runtime behavior.

Objective:

- implement click plus `Shift` plus click authored linking between neighboring object bands;
- keep links object-to-object only;
- limit links to neighboring object bands separated by one routing band;
- treat `Shift` as the spline-authoring gesture rather than introducing a separate persistent tool mode;
- treat links as undirected endpoint pairs while preserving the left-to-right reaction flow implied by band order;
- ignore repeated creation attempts for the same endpoint pair;
- forbid self-links;
- keep each link inside one routing column;
- attach splines to the vertical middle of the relevant outer edges;
- and remove a spline when the spline itself is clicked.

Done when:

- assemblies and operators can be linked by the adjacent-column gesture;
- internal assembly tiles are not individual link endpoints;
- non-neighboring object-band links are rejected by the base interaction;
- the temporary link state exists only while `Shift`-driven linking is in progress;
- duplicate links between the same two endpoint objects are ignored rather than duplicated;
- self-links cannot be created;
- each link uses exactly one valid routing column;
- and spline deletion is direct and explicit.

### 4. Add Composite Labels As A Final Rendering Pass

Status: `next`

Current:

- composite labels and their vertical span line are specified as after-effects;
- but the reserved outer tile space and final-pass render rules still need to be formalized in implementation.

Objective:

- reserve one tile space in the outer label regions on both the left and right sides of the reaction diagram;
- render composite labels only after base objects and splines;
- and keep them fully JSON-driven.

Done when:

- the outer label tile space is reserved;
- composite labels are drawn as the last structural pass;
- and no earlier layout stage depends on them.
