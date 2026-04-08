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
- Build exactly what is specified here and nothing else. Do not add visible UI, controls, text, panels, overlays, frames, or behaviors unless this document explicitly calls for them.

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
- or extra application chrome such as title banners, toolbars beyond the one control named below, JSON side panels, validation panels, hint copy, or decorative framed canvases unless those are explicitly specified here.

## Design

### Surface Scope

Xyzzy specifies the authored tile surface itself.

Its purpose is not to invent a surrounding standalone app shell beyond what this document names explicitly.

Xyzzy does include two minimal app-level bands at the top of the canvas.

The first top band is:

- exactly `80px` tall;
- the full width of the canvas;
- the header band for the first implementation;
- and one of the only two app-level chrome bands permitted in v1.

The second top band is:

- immediately below the first band;
- exactly `80px` tall;
- the full width of the canvas;
- reserved for future use;
- empty in v1;
- and the other app-level chrome band permitted in v1.

For v1, the first top band contains exactly two controls aligned at the top right:

- a JSON document selector;
- and a home button immediately to its right.

The JSON document selector should use the same manifest-driven picker pattern as the reaction app library picker.

That means:

- it is a compact header control, not a side panel;
- it shows the currently selected document title in the closed state;
- it opens a dropdown listbox of available solver JSON documents;
- it supports the same basic open, close, and select behavior as the reaction app picker;
- and it is the only selector control permitted in the v1 header.

The home button:

- sits at the far top right of the first band;
- uses the same home icon as the main web app home button and the reaction app home link;
- and navigates to `./index.html`.

Other than that JSON selector and home button, the first top band remains empty in v1.

The second top band remains entirely empty in v1.

Below those two top bands, the authored surface should use the full available canvas width.

The implementation must not place the surface inside a decorative frame, bordered card, inset panel, padded sub-canvas, or any other inner wrapper that gives up horizontal screen real estate.

For v1, the following are not part of the Xyzzy surface spec unless they are added here later:

- title banners or subtitles above the surface;
- any controls in the first top band other than the JSON selector and home button;
- any controls or text in the second top band;
- status lines, hint text, or explanatory paragraphs around the surface;
- visible JSON editor panels or validation panels;
- decorative bordered cards or framed sub-canvases around the tile surface;
- and labeled header bars such as a separate `Surface` title row above the grid.

If a visible element is not explicitly specified in this document, it should not appear in the v1 implementation.

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

For Xyzzy v1, the position of that frame is also numerically locked.

In outer-edge terms, the rounded-square border occupies:

- left edge `x = 4px`;
- top edge `y = 4px`;
- right edge `x = 76px`;
- and bottom edge `y = 76px`.

Equivalently, the border's outer box is exactly `72px x 72px` inset by `4px` from each tile edge.

Because the stroke width is `4px`, the SVG stroke-center rect that actually gets rendered sits at:

- `x = 6px`;
- `y = 6px`;
- `width = 68px`;
- `height = 68px`;
- and `rx = 10px`.

Those values are not optional approximations.

The shared JSON catalog, the JavaScript runtime, the review page, and the reference generator should all use that same frame position exactly.

For the baseline tile family, that bordered inner rounded square may use one of three canonical stroke colors drawn from the current reaction app palette:

- red: `#ff5a4a`;
- blue: `#2d8cff`;
- purple: `#a259ff`.

The text payload for a tile belongs inside that centered `72px x 72px` bordered square and sits over the black tile background visible through that clear interior.

This section defines only the base tile box, the black outer field, the centered bordered square, and the allowed baseline border colors.

Text variants, text placement rules, and per-tile payload options should be specified separately.

#### Outline Conformance Standard

All Xyzzy tile outlines belong to one locked geometry family.

That requirement applies to:

- standard text tiles;
- operator tiles;
- title tiles;
- charge-glyph tiles;
- binary-glyph tiles;
- and any later tile family added to the shared catalog.

For every tile family, the outline must therefore use exactly the same baseline border geometry:

- one centered inner rounded square with outer dimensions `72px x 72px`;
- the same centered placement inside the `80px x 80px` tile box;
- the same numeric outer-frame box from `x = 4px`, `y = 4px` to `x = 76px`, `y = 76px`;
- the same numeric rendered stroke rect at `x = 6px`, `y = 6px`, `width = 68px`, `height = 68px`, `rx = 10px`;
- the same `4px` stroke width;
- and the same rounded-corner geometry defined by the baseline tile box.

Content may shift inside that outline, but the outline itself may not be nudged, stretched, shrunk, or re-centered to make room for content.

In concrete terms:

- no tile family may move the outline up, down, left, or right relative to the baseline centered placement;
- no tile family may use a taller, shorter, wider, or narrower outline than the baseline `72px x 72px` standard;
- and no tile family may introduce per-type optical fudge that changes where the outline lands inside the tile box.

Therefore, when different tile types are shown side by side in a review strip, the top, bottom, left, and right extents of their inner outlines must coincide exactly.

### Standard Tile Text

Xyzzy standard text tiles may use up to three short lines of text inside the centered `72px x 72px` bordered square.

The baseline text inventory should be derived from the current reaction app tile vocabulary, but Xyzzy should express that vocabulary as explicit three-line tile text rather than corner counters or ad hoc line splitting.

The standard tile should not use corner ledger numbers.

If a tile uses fewer than three visible lines, the unused lower lines remain blank.

The shared JSON tile catalog should be treated as the source of truth for this tile family.

The JavaScript Xyzzy app should read that JSON directly.

The generator in `scripts/glyphs/glyph.py` should be treated as reference code that reads the same JSON and emits review SVGs.

`glyph.py` is not the runtime dependency of the app.

Each row in the following table is one permitted standard-tile text form.

For polarity-driven families, the table below lists the baseline `Pro` form.

Every row in this table that begins with `Pro` also permits a matching `Anti` form.

For those matching anti forms, line 1 changes from `Pro` to `Anti`.

For most such rows, line 2, line 3, and text color remain the same.

Border color also follows a polarity rule for those matching `Pro` and `Anti` pairs:

- if the `Pro` tile uses a blue border, the matching `Anti` tile uses a red border;
- if the `Pro` tile uses a red border, the matching `Anti` tile uses a blue border;
- and if the `Pro` tile uses a purple border, the matching `Anti` tile also uses a purple border.

Proton and neutron are the exception:

- `Anti Proton` uses line 3 `!u !d !u`;
- and `Anti Neutron` uses line 3 `!d !u !d`.

| Line 1       | Line 2        | Line 3       | Text Color                            | Border Color |
| ------------ | ------------- | ------------ | ------------------------------------- | ------------ |
| `<count> ϵ+` | `Associate`   | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue | purple       |
| `<count> ϵ+` | `Dissociate`  | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue | purple       |
| `<count> ϵ+` | `Pass Thru`   | `<count> ϵ-` | line 1 red; line 2 white; line 3 blue | purple       |
|              | `Unbound`     |              | white                                 | purple       |
|              | `Architrinos` |              | white                                 | purple       |
|              | `Photon`      |              | white                                 | purple       |
| `Pro`        | `Noether`     | `Core`       | white                                 | purple       |
| `Negative`   | `W`           | `Boson`      | white                                 | blue         |
| `Neutral`    | `Z`           | `Boson`      | white                                 | purple       |
| `Positive`   | `W`           | `Boson`      | white                                 | red          |
| `Noether`    | `Pair`        | `Pro+Anti`   | white                                 | purple       |
| `Noether`    | `Quad`        | `Two Pair`   | white                                 | purple       |
| `Pro`        | `Uni`         | `Binary`     | white                                 | purple       |
| `Pro`        | `Bi`          | `Binary`     | white                                 | purple       |
| `Pro`        | `Tau`         |              | white                                 | blue         |
| `Pro`        | `Muon`        |              | white                                 | blue         |
| `Pro`        | `Electron`    |              | white                                 | blue         |
| `Pro`        | `Tau`         | `Neutrino`   | white                                 | purple       |
| `Pro`        | `Muon`        | `Neutrino`   | white                                 | purple       |
| `Pro`        | `Electron`    | `Neutrino`   | white                                 | purple       |
| `Pro`        | `Bottom`      | `Quark`      | white                                 | blue         |
| `Pro`        | `Strange`     | `Quark`      | white                                 | blue         |
| `Pro`        | `Down`        | `Quark`      | white                                 | blue         |
| `Pro`        | `Top`         | `Quark`      | white                                 | red          |
| `Pro`        | `Charm`       | `Quark`      | white                                 | red          |
| `Pro`        | `Up`          | `Quark`      | white                                 | red          |
| `Pro`        | `Proton`      | `u d u`      | white                                 | red          |
| `Pro`        | `Neutron`     | `d u d`      | white                                 | purple       |
| `Positive`   | `Pion`        | `u !d`       | white                                 | red          |
| `Negative`   | `Pion`        | `d !u`       | white                                 | blue         |
| `Neutral`    | `Pion`        | `u !u`       | white                                 | purple       |
| `Neutral`    | `Pion`        | `d !d`       | white                                 | purple       |
| `Positive`   | `Kaon`        | `u !s`       | white                                 | red          |
| `Negative`   | `Kaon`        | `s !u`       | white                                 | blue         |
| `Neutral`    | `Kaon`        | `d !s`       | white                                 | purple       |
| `Neutral`    | `Kaon`        | `s !d`       | white                                 | purple       |
| `Positive`   | `B Meson`     | `u !b`       | white                                 | red          |
| `Negative`   | `B Meson`     | `b !u`       | white                                 | blue         |
| `Neutral`    | `B Meson`     | `d !b`       | white                                 | purple       |
| `Neutral`    | `B Meson`     | `b !d`       | white                                 | purple       |

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

In the baseline shared JSON catalog, the architrino count rows stay dynamic through the placeholders `N` and `M`.

In that same baseline JSON catalog, `Pro` and `Anti` are pre-expanded as explicit tile entries so the JavaScript app can keep a simple tile lookup.

That is a packaging choice rather than a visual rule.

If a later runtime wants to collapse those rows into one polarity-aware family and expand them in memory, that is allowed as long as it preserves the same tile text, border-color rules, and emitted tile forms.

### Charge Glyph Tiles

Xyzzy also uses one non-binary glyph family for the middle two tiles of the unbound-architrino group.

These are not ordinary three-line text tiles.

They use:

- the same baseline `80px x 80px` tile box;
- the same centered `72px x 72px` inner rounded border;
- two centered text lines at the top;
- and one centered charge circle in the lower half of the tile.

For Xyzzy v1, the charge-glyph metrics below are locked.

The JavaScript runtime and the reference SVG generator should use these exact values rather than improvising a separate layout rule.

Charge-glyph tiles inherit the exact same outline geometry and centered border placement as every other Xyzzy tile.

Only the text block and charge circle may move within the tile.

The outline itself must remain identical in size and alignment to the baseline standard.

#### Charge Glyph Layout

- line 1 and line 2 use the same text font and count rendering rules as standard text tiles;
- the two-line text block is shifted upward by `8px` relative to the ordinary optical-center placement;
- the charge circle is centered at `(40, 57)` in tile coordinates;
- the charge-circle radius is `7px`;
- the blue variant uses the electrino blue fill `#1879ff` with `drop-shadow(0 0 4px rgba(24, 121, 255, 0.34))`;
- and the red variant uses the positrino red fill `#ff3d3d` with `drop-shadow(0 0 4px rgba(255, 61, 61, 0.32))`.

The two committed charge-glyph tiles are:

- `Electrinos` / `N ϵ−` / blue circle, with blue text and blue border;
- and `Positrinos` / `M ϵ+` / red circle, with red text and red border.

### Binary Tiles

The reaction app also uses a distinct binary-glyph tile that is not a standard three-line text tile.

That binary tile is drawn in an SVG view box of `120 x 120` units and then scaled into the baseline `72px x 72px` inner tile square.

For Xyzzy v1, the binary-glyph metrics below are locked.

The Xyzzy generator and review renderer should use these exact values rather than re-deriving them from runtime heuristics.

#### Orbital Ellipse

- center: `(60, 60)`;
- horizontal radius: `38`;
- vertical radius: `13`;
- stroke color: `rgba(162, 89, 255, 0.96)`;
- stroke width: `7.2` in the generator specification, which corresponds to a `12px` intended design thickness scaled by the `72/120` glyph fit.

In the Xyzzy binary generator, that orbit stroke also uses a non-scaling stroke rule.

The current reaction-app rendering also applies the orbit glow filter `drop-shadow(0 0 4px rgba(162, 89, 255, 0.22))`.

#### Axis Line

- start point: `(60, 33.3333333333)`;
- end point: `(60, 86.6666666667)`;
- line length: `53.3333333334`;
- stroke color: `rgba(162, 89, 255, 0.82)`;
- stroke width: `4.8` in the generator specification, which corresponds to an `8px` intended design thickness scaled by the `72/120` glyph fit.

The current reaction-app rendering also uses:

- non-scaling stroke;
- solid full-mode axis lines with butt line caps;
- and overall axis opacity `0.84`.

For Xyzzy v1, axis styling is mode-sensitive:

- `full` mode keeps the solid vertical axis line with butt line caps;
- `axis` mode uses the same geometry, color, stroke width, and opacity, but renders that vertical axis as a dotted line;
- the dotted `axis`-mode line therefore uses `stroke-dasharray="0 8"` in the `120 x 120` glyph space;
- and that dotted `axis`-mode line uses round line caps so each dash reads as a dot.

#### Architrino Circles

There are four circles in the full binary-personality tile:

- left pole circle;
- right pole circle;
- top circle;
- and bottom circle.

The left and right pole circles are the larger pair:

- base left-pole center: `(25, 60)`;
- base right-pole center: `(95, 60)`;
- each pole-circle radius: `8.3333333333` in the `120 x 120` glyph space, which renders as `5px` in the `72px x 72px` inner tile square.

For Xyzzy v1, those two pole centers are fixed at those coordinates.

The top and bottom circles sit on the vertical axis:

- top-circle center: `(60, 25)`;
- bottom-circle center: `(60, 95)`;
- each top/bottom circle radius: `8.3333333333` in the `120 x 120` glyph space, which renders as `5px` in the `72px x 72px` inner tile square.

With those centers and radii, each circle sits `6px` away from the inner edge of the purple interior border.

The current reaction-app color definitions are:

- electrino blue fill: `#1879ff`;
- positrino red fill: `#ff3d3d`.

The current reaction-app glow filters are:

- electrino blue glow: `drop-shadow(0 0 4px rgba(24, 121, 255, 0.34))`;
- positrino red glow: `drop-shadow(0 0 4px rgba(255, 61, 61, 0.32))`.

The Xyzzy binary-tile border color follows the bottom/top polar code:

- `bb` uses a blue border;
- `rr` uses a red border;
- and the mixed cases `br` and `rb` use a purple border.

#### Locked Variant Family

For the mixed-polarity dressed-binary family, Xyzzy should express the variants as the multiplicative combination

- `(red/blue binary | blue/red binary) x (red/blue polar | blue/red polar)`.

In explicit placement terms:

- `blue/red binary` means left blue and right red;
- `red/blue binary` means left red and right blue;
- `red/blue polar` means top red and bottom blue;
- `blue/red polar` means top blue and bottom red.

That produces exactly four locked Xyzzy binary-glyph variants:

- `blue/red binary x red/blue polar`;
- `blue/red binary x blue/red polar`;
- `red/blue binary x red/blue polar`;
- `red/blue binary x blue/red polar`.

These four variants are the Xyzzy expression of the reaction-app factorization in which:

- the left/right binary pair is determined by binary polarity;
- and the top/bottom polar pair is determined by the selected polar arrangement.

In reaction-app terms, the left/right pair comes from the binary polarity swap, while the mixed top/bottom pair corresponds to the two neutral personality choices `p/e` and `e/p`.

#### Abbreviated Grammar

Xyzzy should also use a short clueful grammar for binary-glyph variants:

- `<mode>:<binary>:<polar>`.

The field meanings are:

- `mode` names which parts of the glyph are drawn;
- `binary` names the left/right colors of the horizontal binary pair;
- `polar` names the bottom/top colors of the vertical polar pair.

The allowed `mode` values are:

- `full`: draw ellipse, axis, left/right binary pair, and bottom/top polar pair;
- `axis`: draw axis, left/right binary pair, and bottom/top polar pair, but omit the ellipse;
- `polar`: draw only the bottom/top polar pair, with no ellipse, axis, or left/right binary pair.

The allowed `binary` values are:

- `br`: left blue, right red;
- `rb`: left red, right blue;
- `--`: no left/right binary pair is drawn.

The allowed `polar` values are:

- `bb`: bottom blue, top blue;
- `br`: bottom blue, top red;
- `rb`: bottom red, top blue;
- `rr`: bottom red, top red.

Examples:

- `full:br:rb` means left blue, right red, bottom red, top blue;
- `full:rb:br` means left red, right blue, bottom blue, top red;
- `polar:--:rb` means no binary scaffold and a bottom-red, top-blue polar pair.

For Xyzzy, use `left/right` ordering for the binary field and `bottom/top` ordering for the polar field.

Do not use north/east/south/west naming in the serialized Xyzzy grammar.

The shared Xyzzy binary-tile generator should expand the full valid family from this grammar:

- `full` mode: `2 x 4 = 8` variants;
- `axis` mode: `2 x 4 = 8` variants;
- `polar` mode: `1 x 4 = 4` variants.

That yields `20` generated binary-glyph tiles in total.

### Shared JSON Tile Catalog

The baseline shared JSON catalog should live in the Xyzzy app directory as `src/apps/xyzzy/xyzzy-tiles.json`.

The JavaScript app should use that JSON directly for tile lookup and dynamic count substitution.

The app-local catalog at [`src/apps/xyzzy/xyzzy-tiles.json`](../../../src/apps/xyzzy/xyzzy-tiles.json) is the canonical catalog that should stay in sync with this document.

The JavaScript tile renderer at [`src/apps/xyzzy/XyzzyTileSvgRuntime.js`](../../../src/apps/xyzzy/XyzzyTileSvgRuntime.js) and the review app at [`src/apps/xyzzy/XyzzyTileReviewAppRuntime.js`](../../../src/apps/xyzzy/XyzzyTileReviewAppRuntime.js) are the baseline implementation the future Xyzzy app should use for tile rendering.

The review entrypoint at [`src/apps/xyzzy/review/main.js`](../../../src/apps/xyzzy/review/main.js) demonstrates how the app should load the JSON and render the full tile catalog in browser-side SVG.

The `glyph.py` script should remain reference and comparison code, not the runtime tile engine of the app.

### Tile Glyph Construction

Assemblies and operators should be constructed from tile glyphs, not from generic cards with text dropped onto them.

For the current baseline tile language, a tile glyph is the simple bordered text tile defined by the shared JSON catalog and rendered by the JavaScript tile renderer.

That means the glyph is defined by:

- the fixed `80px x 80px` black outer tile;
- the centered `72px x 72px` rounded border-only inner square;
- the canonical border color token from the JSON palette;
- and the one-line, two-line, or three-line text payload defined in the JSON tile record.

Operator tiles, architrino count tiles, title-like tiles, and particle tiles are all instances of that same baseline tile renderer.

That means:

- a four-tile assembly row is four abutted glyph tiles;
- a one-tile operator is one glyph tile;
- the interior border of each tile belongs to that tile's own artwork;
- the half-gap field sits outside that interior border on all four sides;
- the JavaScript app should render those tiles from `src/apps/xyzzy/xyzzy-tiles.json` using the baseline renderer in `src/apps/xyzzy/`;
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
- sits below the two separate app-level `80px` top bands described in `Surface Scope`;
- is not a separate header bar or framed panel;
- is blank in v1;
- and is not a normal placement target for assemblies, operators, splines, or composite labels in v1.

Normal authored rows therefore begin below that reserved top row.

Spline attachment should use only the outer rectangle bounds of the two linked objects.

### Fixed Column Strip

The base reaction diagram should use one fixed 20-column strip.

At the baseline tile size of `80px`, that strip is a fixed rendered width of `1600px`.

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

The fixed `1600px` grid strip should be horizontally centered within the full-width authored surface region.

The runtime should not scale the strip down to fit smaller widths and should not wrap it in an inset frame or card.

The first implementation is desktop-only.

For v1:

- the intended target is a desktop viewport wide enough to show the centered `1600px` grid strip and header controls without horizontal scrolling;
- narrow-screen and phone-specific adaptations are out of scope;
- and the runtime should not introduce a separate responsive mobile layout or a horizontal-scroll fallback mode.

Vertical overflow belongs to the surface region below the two top bands and should scroll.

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
- tile 2: standard Xyzzy tile from the JSON catalog;
- tile 3: standard Xyzzy tile from the JSON catalog;
- tile 4: standard Xyzzy tile from the JSON catalog.

The typical assembly therefore contains:

- one title tile;
- and three standard Xyzzy tiles rendered through the shared JavaScript tile renderer.

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

### Unbound Architrinos Assembly

The solver-side participant at the JSON boundary is `Unbound Architrinos`, and the Xyzzy surface should render it as a four-tile group with the visible state title `Unbound`.

`Unbound Architrinos` is one horizontal strip of four abutted tiles.

Its tile order is:

- tile 1: title tile with centered line 2 text `Unbound`;
- tile 2: charge-glyph tile with line 1 `Electrinos`, line 2 `N ϵ−`, and one centered blue electrino circle;
- tile 3: charge-glyph tile with line 1 `Positrinos`, line 2 `M ϵ+`, and one centered red positrino circle;
- tile 4: title tile with centered line 2 text `Architrinos`.

The electrino and positrino middle tiles are visual glyph tiles, not ad hoc overlays.

The exact charge counts stay explicit in tiles 2 and 3 through the `N` and `M` count lines.

Tile 4 is therefore a closing identity tile, not a separate dedicated count tile.

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

For v1 rendering, there should be exactly one simple spline style:

- one cubic Bezier path per link;
- horizontal departure and arrival tangents at the two endpoints;
- one neutral uncolored visible stroke;
- constant stroke width;
- round line caps;
- and no arrows, glow, double strokes, or alternate path families.

To reduce visual confusion when multiple splines share the same routing column, the runtime should assign each such spline a deterministic lateral slot offset inside that routing column from a small fixed slot set.

That slotting rule should separate nearby spline paths without changing the fixed tile grid, changing endpoint rows, or introducing multiple spline style classes.

For click targeting, the runtime may use a wider invisible hit path, but it should not add a second visible stroke.

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

The link record stores two endpoints for validation and serialization, but the rendered spline should not display an arrow or any other direction marker.

For `xyzzy/v1` serialization, each link record uses canonical left-to-right endpoint order:

- `endpointA` is the id of the object in the left object band;
- `endpointB` is the id of the object in the right object band;
- and no extra bend, waypoint, color, or screen-geometry fields belong in the link record.

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

For `xyzzy/v1`, `compositeLabels` is always present as a top-level array.

When no composite labels are drawn, that array should be `[]`.

Each composite-label record uses this exact shape:

- `id`
- `side`
- `text`
- `rowStart`
- `rowEnd`

Composite-label field rules are:

- `side` must be either `left` or `right`;
- `text` must be a non-empty string;
- `rowStart` and `rowEnd` must be inclusive integer row coordinates in the same row space used by assembly and operator `y` placement;
- `rowStart` must be less than or equal to `rowEnd`;
- `side: "left"` renders in the reserved column-1 region;
- and `side: "right"` renders in the reserved column-20 region.

No explicit `x`, `width`, waypoint, or screen-coordinate fields belong in a `xyzzy/v1` composite-label record.

For v1, composite labels should be absent by default:

- `compositeLabels` should usually be empty;
- and base rendering must not depend on `compositeLabels` containing any records.

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

The top-level document should include `schema: "xyzzy/v1"`.

The contract should represent:

- assemblies;
- operators;
- spline links;
- and composite-label after-effects.

The contract should prefer explicit tile-level display records over inferred geometry.

The contract should stay flat rather than hierarchical at the top level.

The JSON contract is a boundary contract.

It does not imply that the runtime should render a visible side-by-side JSON editing panel as part of the default Xyzzy surface.

Exact object model for `xyzzy/v1`:

- every assembly record stores one origin tile position in an allowed four-tile assembly band, an explicit semantic role, and an explicit four-tile display payload;
- every operator record stores one grid position in an allowed one-tile operator band and a one-tile payload containing title plus positrino and electrino counts;
- every spline record stores exactly `id`, `endpointA`, and `endpointB`;
- and every composite-label record stores exactly `id`, `side`, `text`, `rowStart`, and `rowEnd`.

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

The exact link schema is:

- `id`
- `endpointA`
- `endpointB`

Link field rules are:

- `endpointA` and `endpointB` must each reference an existing assembly or operator id;
- `endpointA` must reference the left-side object and `endpointB` the right-side object;
- the endpoint pair must belong to one valid neighboring-band connection with one valid routing column between them;
- and no extra geometry, style, or screen-coordinate fields belong in the `xyzzy/v1` link schema.

The exact composite-label schema is:

- `id`
- `side`
- `text`
- `rowStart`
- `rowEnd`

Composite-label field rules are:

- `side` must be `left` or `right`;
- `text` must be a non-empty string;
- `rowStart` and `rowEnd` must be inclusive integer row coordinates using the same row numbering as object `y` positions;
- `rowStart` must be less than or equal to `rowEnd`;
- and no extra geometry or screen-coordinate fields belong in the `xyzzy/v1` composite-label schema.

The `tiles` field is the canonical display payload for the four assembly tiles.

That means:

- tile 1 content is explicit;
- tiles 2-4 content is explicit;
- and those tile records are not reconstructed only from `type`.

Exact top-level document shape for `xyzzy/v1`:

- `schema`
- `assemblies`
- `operators`
- `links`
- `compositeLabels`

All five top-level keys are required in a `xyzzy/v1` document.

If any of the four record collections has no entries, its value must be `[]`.

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
- a manifest-driven list of available solver JSON documents for the header selector;
- and user-authored adjacent-column spline links.

Those JSON documents describe the contract boundary. They do not require a built-in visible JSON panel in the authored surface.

For the first implementation, direct object editing is explicitly out of scope.

That means the first implementation should not develop:

- blank-document creation;
- direct creation of assemblies or operators on the surface;
- direct movement of assemblies or operators on the surface;
- direct deletion of assemblies or operators on the surface;
- drag handles, resize handles, selection boxes, or context menus for object editing;
- or substitute editing chrome invented to work around the missing workflow.

For the first implementation, Xyzzy should behave as a pure viewer of solver-produced Xyzzy JSON documents.

For v1, this document does not yet define the full create, move, or delete workflow for assemblies and operators, and that workflow is intentionally deferred rather than to be guessed during the first implementation.

This note currently defines:

- surface grammar;
- placement and validation rules;
- JSON shape constraints;
- header document selection and bootstrap behavior;
- and spline-link interaction rules.

Detailed v1 workflows for creating, moving, and deleting assemblies and operators remain to be specified separately.

### Document Selection And Bootstrap

The header JSON selector should be populated from a manifest of available solver JSON documents.

That manifest should follow the same basic shape used by the reaction app library manifest:

- a top-level schema id;
- a `defaultEntryId`;
- and an `entries` array of records with ids, titles, display titles, and JSON asset paths.

For Xyzzy, the picker should use that manifest to load available authored-surface JSON documents rather than to open a visible editor.

The first implementation should not include a built-in blank-document flow, new-document button, or manual surface-authoring mode.

When the app starts:

- if an entry with id `free_neutron_beta_decay` is available, load that entry by default;
- otherwise load the manifest's default entry if one is declared;
- otherwise load the first available manifest entry;
- and if no entries are available, leave the surface empty rather than inventing extra UI.

When the user chooses a different item from the header selector, the app should load that JSON document into the surface.

That selection behavior should:

- clear the currently rendered surface objects and spline paths;
- load the newly selected Xyzzy JSON document from the manifest entry;
- and render only the selected document.

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

Status: `deferred`

Current:

- the first standalone Xyzzy runtime now exists;
- the `xyzzy/v1` JSON contract, fixed 20-column strip, gap-free tile layout, adjacent-column spline authoring, and optional final-pass composite labels are now implemented;
- but assemblies and operators are still authored through explicit JSON documents because the direct create, move, and delete workflow on the surface remains unspecified;
- and that workflow is intentionally deferred and should not be built as part of the first implementation.

Objective:

- define the explicit later surface workflow for:
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
- but the fuller explicit payload for the standard tile language, charge-glyph and polar-glyph detail, and richer title variants is still not written down completely.

Objective:

- define the canonical explicit tile-record vocabulary for Xyzzy assemblies;
- keep tile display content explicit in JSON rather than reintroducing inference from `type`;
- and make the richer tile language precise enough that solver output and manual authoring can use the same surface records.

Done when:

- the full tile payload vocabulary is named and explicit;
- charge-glyph, binary-glyph, or polar-glyph details do not depend on app-local inference;
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

### 5. Keep The Reference Generator Aligned

Status: `next`

Current:

- the JavaScript app now has the baseline tile renderer and canonical app-local JSON catalog;
- `scripts/glyphs/glyph.py` is now reference and comparison code rather than the runtime tile engine;
- and the remaining risk is drift between the app-local JSON catalog, the JavaScript renderer, and the reference SVG outputs.

Objective:

- keep `scripts/glyphs/glyph.py` aligned with `src/apps/xyzzy/xyzzy-tiles.json`;
- keep the reference SVG outputs visually aligned with the JavaScript tile renderer;
- and avoid any return to separate hand-maintained tile definitions.

Done when:

- the app-local JSON catalog remains the single tile-definition source of truth;
- the JavaScript renderer remains the implementation used by the Xyzzy app;
- and the reference SVG generation stays useful for comparison without becoming a parallel design system.

## To Do

1. Provide at least one explicit `xyzzy/v1` example assembly payload for each four-tile family now that the tile grammar is fixed.
2. Freeze the header-selector manifest contract by specifying all unresolved contract details explicitly: the exact manifest schema id, the canonical manifest file path, the exact top-level field names, the exact per-entry field names, and whether each entry must point directly to a final `xyzzy/v1` document or may instead point to an upstream solver/request document that requires a transformation step before rendering.
3. Specify the exact header control geometry for the JSON selector and home button, including control sizes, spacing, vertical alignment, accessible labels, and header-band visual treatment.
4. Specify the exact spline rendering metrics, including stroke color, stroke width, Bezier control-point rule, routing-column slot-offset set, and invisible hit-target width. White. 2px.
5. Specify the exact allowed `type` values for assemblies and operators, and state whether each `type` is semantic only, display only, or both.
6. Provide one full canonical `xyzzy/v1` sample document plus matching manifest entry for the default `free_neutron_beta_decay` startup path.
