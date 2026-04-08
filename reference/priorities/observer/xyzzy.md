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

The exact header control geometry and appearance for v1 is now fixed.

The two header controls must visually emulate the top-right search control and home button from the main web app HUD.

For Xyzzy, that means:

- the first top band keeps the same `80px` height already specified above;
- the controls sit inside that band at the top right;
- the controls align to the band's top edge using the same top-right HUD idiom as the main web app rather than a new centered or bottom-aligned layout;
- the JSON selector trigger sits immediately to the left of the home button;
- and the home button remains the far-right control.

The exact horizontal spacing is:

- `8px` gap between the JSON selector trigger and the home button;
- and no additional visible control between them.

The exact home-button geometry is:

- `32px` wide;
- `32px` tall;
- circular with `border-radius: 999px`;
- one `1px` border in `rgba(160, 170, 220, 0.25)`;
- background `rgba(8, 10, 18, 0.75)`;
- icon color `#f5f7ff`;
- one centered house SVG at `18px x 18px`;
- and the accessible label `Go to home`.

The exact JSON-selector trigger geometry is:

- it must use the same compact control footprint and material treatment as the main web app search control;
- `32px` tall minimum;
- one `1px` border in `rgba(160, 170, 220, 0.25)`;
- background `rgba(8, 10, 18, 0.75)`;
- text color `#f5f7ff`;
- backdrop blur matching the main app HUD treatment;
- and pointer/hover/focus behavior should match the main web app control family rather than inventing a separate Xyzzy-only button style.

Unlike the main web app search control, the Xyzzy selector is not icon-only in the openable trigger state.

Its closed trigger should therefore:

- present the selected document title as text;
- use the same visual material treatment as the main web app search/results control family;
- remain compact rather than expanding into a full-width header bar;
- and size to content with a practical minimum width sufficient to show short titles cleanly.

The exact selector dropdown geometry is:

- it opens as a floating panel below the trigger;
- top offset `44px` below the trigger origin, matching the main web app search panel drop;
- right-aligned to the trigger/home control cluster;
- minimum width `260px`;
- maximum width `80vw`;
- one `1px` border in `rgba(160, 170, 220, 0.25)`;
- `12px` corner radius;
- background `rgba(8, 10, 18, 0.75)`;
- padding `8px 10px`;
- and backdrop blur matching the main web app search panel.

The exact selector-option appearance is:

- use the same visual family as the main web app search results list;
- show one row per manifest entry using `displayTitle`;
- and keep the list compact and HUD-like rather than introducing framed cards, tiled previews, or extra descriptive text in v1.

The exact accessible labels are:

- JSON selector trigger: `Choose Xyzzy document`;
- home button: `Go to home`.

The first top band visual treatment is:

- no extra title label, caption, divider, or framing bar around the controls;
- no separate bordered container wrapping both controls together;
- no decorative chrome beyond the band and the controls themselves;
- and visual styling should read as the same translucent HUD control family already used by the main web app.

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
- stroke width: `5` in the generator specification, which corresponds to a `3px` display thickness after the `72/120` glyph fit.

In the Xyzzy binary generator and review renderer, that orbit stroke scales with the `72/120` glyph fit, so it renders at `3px` inside the `72px x 72px` tile field.

The current reaction-app rendering also applies the orbit glow filter `drop-shadow(0 0 4px rgba(162, 89, 255, 0.22))`.

#### Axis Line

- start point: `(60, 33.3333333333)`;
- end point: `(60, 86.6666666667)`;
- line length: `53.3333333334`;
- stroke color: `rgba(162, 89, 255, 0.82)`;
- stroke width: `4` in the generator specification, which corresponds to a `2.4px` display thickness after the `72/120` glyph fit.

The current Xyzzy generator and review renderer also use:

- scaling stroke;
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

Within each assembly band, authored placement should follow a dense lane standard.

That means:

- between the topmost and bottommost occupied assembly extents in one assembly band, there should be no empty lane row;
- the only routine blank row in the grid is the one reserved top row described above;
- a later composite occupying `n` rows in one assembly band counts as one occupied `n x 4` lane rectangle for this density rule;
- and create, drag, delete, and composite-edit behavior in an assembly band should preserve that no-gap lane standard.

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

### Direct Object Editing

For v1, direct object editing belongs to the authored surface itself.

These interaction rules define the intended authoring behavior even if parts of that authoring runtime remain deferred in implementation until the dedicated authoring pass lands.

It should remain single-object and surface-local:

- no persistent side panel;
- no extra top-band controls;
- no multiselect;
- no resize handles;
- and no separate visible JSON editor.

Plain click behavior is now:

- plain click on an assembly or operator selects that one object;
- plain click on empty surface clears the current object selection;
- dragging an object begins from the object itself rather than from a separate handle;
- and `Shift` remains reserved for spline authoring.

A selected object should draw one thin visible selection outline around the full outer rectangle of the object:

- `4x1` outer bounds for assemblies;
- `1x1` outer bounds for operators;
- and no per-tile internal selection boxes.

#### Create Picker

Object creation should use one transient surface-local picker.

That picker is the only create UI permitted in v1.

It should:

- appear only after double-click on an empty legal placement target;
- open anchored near the clicked row position;
- use the same translucent HUD material family as the header JSON selector dropdown;
- close on `Escape` or plain click elsewhere with no document change;
- and never appear as a permanent toolbar, side panel, or bottom tray.

The picker should never open on:

- reserved column 1 or 20;
- routing columns 6, 8, 13, or 15;
- the reserved top row;
- occupied operator cells;
- or assembly rows whose four occupied tile cells are already blocked by another object.

#### Creating Assemblies

To create an assembly:

- double-click an empty tile position in one of the three assembly bands on a normal authored row;
- treat any clicked tile in columns 2-5 as the reactant assembly slot for that row;
- treat any clicked tile in columns 9-12 as the intermediate assembly slot for that row;
- treat any clicked tile in columns 16-19 as the product assembly slot for that row;
- open the create picker with assembly entries only for that slot;
- and click one assembly entry to create the assembly immediately in that row and close the picker.

The chosen assembly entry must provide the full explicit assembly payload written to the working `xyzzy/v1` document:

- one new stable `id`;
- the assembly `type`;
- the visible `title`;
- the band-fixed `x` origin (`2`, `9`, or `16`);
- the clicked row as `y`;
- the role implied by the chosen band (`reactant`, `intermediate`, or `product`);
- and the exact four-entry `tiles` array for that assembly.

The runtime must not create an assembly by storing only `type` and later guessing the `tiles` payload.

#### Creating Operators

To create an operator:

- double-click an empty cell in column 7 or column 14 on a normal authored row;
- open the create picker with exactly three operator type choices: `Associate`, `Dissociate`, and `Pass Thru`;
- choose one operator type;
- enter explicit integer values for `positrinoCount` and `electrinoCount` in the same picker;
- and confirm creation to write the operator and close the picker.

The operator create action must write:

- one new stable `id`;
- the operator `type`;
- the canonical visible `title` for that type;
- the clicked column as `x`;
- the clicked row as `y`;
- the entered `positrinoCount`;
- and the entered `electrinoCount`.

Creation should stay blocked until both count fields are valid integers. No hidden defaults should be assumed at commit time.

#### Moving Assemblies And Operators

Object movement should be direct drag on the object itself.

The movement rule is intentionally simple in v1:

- assemblies move only vertically within their current assembly band;
- operators move only vertically within their current operator column;
- horizontal reassignment between object bands is not part of the v1 direct-editing workflow;
- to place an object in a different band, create a new object there and delete the old one;
- and `Shift`-drag has no alternate move meaning.

For assemblies, the drag affordance should cover the full four-tile rectangle:

- a pointer-down anywhere inside the visible `4x1` assembly bounds may begin the drag;
- no separate grab handle is permitted;
- and the drag should read as moving the whole assembly group up or down its lane rather than moving one internal tile.

When the user drags an object:

- the drag preview should snap to whole-row positions;
- the object's `x`, width, and height remain fixed by object class and current band;
- only `y` is eligible to change;
- the reserved top row is never a valid drop target;
- and any row whose occupied cells would overlap another object is invalid.

On drop:

- releasing an operator on one valid free row commits the new `y`;
- releasing an assembly in one assembly band should preserve the dense lane standard for that band;
- releasing anywhere else returns the object to its original row;
- no automatic row shuffling or collision resolution should occur for operators;
- and the object's stable `id` must not change.

Because movement stays inside the current band, existing spline links stay attached to the same object ids and remain valid after the move.

For assembly lanes, the intended authoring behavior is insertion-style reordering rather than sparse absolute placement:

- dragging one assembly over another assembly row should open an insertion position in that lane rather than requiring a permanently empty destination row;
- the affected lower assemblies in that same lane should shift down as needed to make room for the dragged assembly;
- and dropping an assembly should leave that lane with no empty rows between occupied assembly extents.

Composite-aware insertion may remain deferred until composite authoring is implemented, but its behavior is already fixed:

- a composite in one assembly lane should be hit-tested as one occupied `n-row x 4-column` rectangle;
- dragging an assembly over that composite rectangle should shift the composite's member assemblies down together as one block;
- and that insertion behavior should still preserve the dense no-gap lane rule.

#### Deleting Assemblies And Operators

Deletion is selection-based and immediate.

The delete gesture is:

- plain click an assembly or operator to select it;
- press `Delete` or `Backspace`;
- and remove that object from the working `xyzzy/v1` document immediately.

When an object is deleted:

- delete every link whose `endpointA` or `endpointB` references that object's id in the same edit action;
- if deleting an assembly would leave an empty lane row inside that assembly band, compact the lower assemblies in that same band upward to close the gap;
- leave unrelated objects and composite-label records unchanged;
- and do not show a confirmation dialog in v1.

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

The exact spline rendering metrics for v1 are now fixed.

The visible spline stroke is:

- stroke color `#ffffff`;
- stroke width `2px`;
- stroke opacity `1`;
- `fill: none`;
- `stroke-linecap: round`;
- `stroke-linejoin: round`;
- no dash pattern;
- no arrows;
- no glow;
- and no second visible under-stroke or halo.

The invisible click-target path is:

- one separate invisible path that follows the exact same cubic Bezier geometry as the visible spline;
- stroke width `12px`;
- `stroke: transparent`;
- `fill: none`;
- and used only for pointer targeting such as deletion.

The routing-column geometry is:

- each routing column is one tile column wide and therefore `80px` wide;
- the routing centerline is the horizontal center of that routing column;
- the spline belongs to that routing column alone;
- and the spline may bend only by shifting around that routing centerline with one fixed slot offset.

The exact endpoint anchors are:

- start point at the vertical middle of the linked left object's right outer edge facing the routing column;
- end point at the vertical middle of the linked right object's left outer edge facing the routing column;
- for assemblies, that means the midpoint of the four-tile object's outer edge;
- for operators, that means the midpoint of the one-tile object's outer edge.

The exact cubic Bezier rule is:

- `P0` is the start anchor on the left object edge;
- `P3` is the end anchor on the right object edge;
- `P1.x = P0.x + 16px`;
- `P2.x = P3.x - 16px`;
- `P1.y` equals the routing-slot y position for that spline;
- `P2.y` equals the same routing-slot y position;
- the routing-slot y position is the routing-column midpoint between the two endpoint y values plus the assigned slot offset;
- and no additional waypoints or alternate control rules are permitted in v1.

In plain terms, the spline should leave each object only a short horizontal distance, commit early toward its assigned routing slot inside the one-tile channel, and stay as taut and diagonal as possible rather than expanding into a broad S-shape through the middle.

The exact routing-column slot-offset set is:

- `-12px`
- `-6px`
- `0px`
- `6px`
- `12px`

Those are offsets from the routing-column centerline.

No other slot offsets are allowed in v1.

The deterministic slot assignment rule is:

- gather all links that use the same routing column;
- sort them by stable link id ascending;
- assign offsets in the fixed order `0`, `-6`, `6`, `-12`, `12`;
- if more than five links share one routing column, continue reusing that same five-slot cycle in sorted order;
- and do not alter endpoint rows, object placement, or link validity in order to avoid collisions.

The visible spline class is therefore completely fixed for v1:

- white;
- `2px`;
- one cubic Bezier family only;
- one routing-column control-line rule only;
- and one invisible `12px` hit path only.

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

- plain click on an object selects that object;
- plain click on empty space clears the current object selection;
- double-click on one empty legal placement target opens the create picker for that slot;
- hold `Shift` and click two valid objects to create a link;
- plain click on a spline deletes that spline immediately;
- spline deletion has no confirmation step in v1;
- and `Shift` is reserved for spline authoring, not multiselect or alternate move modes.

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

The exact assembly `tiles` field is:

- one array named `tiles`;
- length exactly `4`;
- one shared-catalog tile key for each left-to-right assembly slot;
- and no nested visible text, border-color, charge-circle, orbit, or polar detail duplicated inside the document payload.

Assembly tile payload rules are:

- tile 1 is the leftmost assembly tile and tiles 2-4 follow in visible left-to-right order;
- every `tiles` entry must be one tile key that exists in the shared Xyzzy tile catalog;
- the runtime uses those tile keys directly as the visible display payload;
- and the runtime must not rebuild the row from `type`, `title`, polarity, generation, family, or other semantic fields when `tiles` is present.

For operator records, the exact allowed `type` values for `xyzzy/v1` are now fixed:

- `associate`
- `dissociate`
- `pass-thru`

For operators, `type` is both semantic and display-driving.

That means:

- `associate` identifies the operator semantically and uses the visible operator title `Associate`;
- `dissociate` identifies the operator semantically and uses the visible operator title `Dissociate`;
- `pass-thru` identifies the operator semantically and uses the visible operator title `Pass Thru`;
- no other operator `type` values are valid in `xyzzy/v1`;
- and operator rendering may use the operator `type` to validate the expected title family and one-tile operator layout.

For assembly records, the exact allowed `type` values for `xyzzy/v1` are now fixed:

- `unbound-architrinos-assembly`
- `pro-tau-assembly`
- `anti-tau-assembly`
- `pro-muon-assembly`
- `anti-muon-assembly`
- `pro-electron-assembly`
- `anti-electron-assembly`
- `pro-tau-neutrino-assembly`
- `anti-tau-neutrino-assembly`
- `pro-muon-neutrino-assembly`
- `anti-muon-neutrino-assembly`
- `pro-electron-neutrino-assembly`
- `anti-electron-neutrino-assembly`
- `pro-bottom-quark-assembly`
- `anti-bottom-quark-assembly`
- `pro-strange-quark-assembly`
- `anti-strange-quark-assembly`
- `pro-down-quark-assembly`
- `anti-down-quark-assembly`
- `pro-top-quark-assembly`
- `anti-top-quark-assembly`
- `pro-charm-quark-assembly`
- `anti-charm-quark-assembly`
- `pro-up-quark-assembly`
- `anti-up-quark-assembly`
- `up-quark-color-variations-assembly`
- `down-quark-color-variations-family-i-assembly`
- `down-quark-color-variations-family-ii-assembly`
- `photon-assembly`
- `noether-pair-assembly`
- `noether-quad-assembly`
- `pro-proton-assembly`
- `anti-proton-assembly`
- `pro-neutron-assembly`
- `anti-neutron-assembly`
- `positive-pion-assembly`
- `negative-pion-assembly`
- `neutral-pion-u-assembly`
- `neutral-pion-d-assembly`
- `positive-kaon-assembly`
- `negative-kaon-assembly`
- `neutral-kaon-d-assembly`
- `neutral-kaon-s-assembly`
- `positive-b-meson-assembly`
- `negative-b-meson-assembly`
- `neutral-b-meson-d-assembly`
- `neutral-b-meson-b-assembly`
- `pro-noether-core-assembly`
- `anti-noether-core-assembly`

For assemblies, `type` is semantic only.

That means:

- assembly `type` identifies the semantic family of the four-tile object;
- assembly `type` must not be used to reconstruct the visible tile payload;
- assembly `type` may be used for validation, filtering, export, and transformation logic;
- and the exact rendered appearance still comes only from the explicit `tiles` array.

The `-assembly` suffix is the canonical naming form for assembly `type` values in `xyzzy/v1`.

The assembly display payload remains the explicit `tiles` array.

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

- final `xyzzy/v1` JSON documents containing assemblies, operators, splines, and composite-label effects;
- a manifest-driven list of available final `xyzzy/v1` documents for the header selector;
- user-authored assembly and operator create, move, and delete gestures on the current document;
- and user-authored adjacent-column spline links.

Those JSON documents describe the contract boundary. They do not require a built-in visible JSON panel in the authored surface.

For v1, direct object editing is part of Xyzzy itself.

That direct authoring surface is limited to:

- creating assemblies and operators through the surface-local create picker defined above;
- moving them by band-constrained vertical drag;
- deleting the selected object with immediate link cleanup;
- and authoring or deleting splines through the direct surface gestures defined here.

Even with that authoring support, Xyzzy should still not introduce:

- extra top-band controls beyond the JSON selector and home button;
- built-in visible JSON side panels;
- persistent inspector panels;
- resize handles, marquee selection boxes, or multiselect;
- context menus;
- built-in blank-document creation or a new-document button;
- or substitute editor chrome unrelated to the fixed strip and object grammar.

This note currently defines:

- surface grammar;
- placement and validation rules;
- direct create, move, delete, and link interactions;
- JSON shape constraints;
- and header document selection and bootstrap behavior.

### Document Selection And Bootstrap

The header JSON selector should be populated from a manifest of available final `xyzzy/v1` documents.

The manifest contract for Xyzzy v1 is now fixed.

The exact manifest schema id is:

- `xyzzy-library-manifest/v1`

The canonical manifest file path is:

- `content/contracts/examples/xyzzy/manifest.v1.json`

The exact top-level manifest keys are:

- `schema`
- `defaultEntryId`
- `entries`

The exact per-entry keys are:

- `id`
- `title`
- `displayTitle`
- `documentPath`
- `isDefault`

Per-entry field rules are:

- `id` must be a stable non-empty string;
- `title` must be a non-empty source title;
- `displayTitle` must be the label shown in the closed selector and dropdown options;
- `documentPath` must be the final `xyzzy/v1` asset path consumed by the Xyzzy runtime;
- `isDefault` is optional and may be used as a local redundancy marker for the default entry;
- and no `requestPath`, `sourceRequestPath`, `solverRequest`, `solverResult`, or other upstream solve payload fields belong in the Xyzzy manifest contract.

The exact path field used to load a final `xyzzy/v1` document is:

- `documentPath`

That path field is canonical for Xyzzy.

It does not alias to `requestPath`, `sourceRequestPath`, or any other alternate asset field name.

For Xyzzy, the picker should use that manifest to load available authored-surface JSON documents rather than to open a visible editor.

That manifest should point directly to final `xyzzy/v1` documents.

It should not point to raw `solver-request/v1` or `solver-result/v1` payloads.

If an upstream solver pipeline starts from some non-Xyzzy request or result format, the translation into final `xyzzy/v1` should happen before the document is published to the Xyzzy manifest and before the Xyzzy runtime reads it.

Xyzzy v1 should still not include a built-in blank-document flow or new-document button in the top bands.

Direct surface authoring should instead operate on the currently loaded document.

An author who wants a blank starting point should load a manifest entry whose `assemblies`, `operators`, `links`, and `compositeLabels` arrays are all empty.

When the app starts:

- if an entry with id `free_neutron_beta_decay` is available, load that entry by default;
- otherwise load the manifest's default entry if one is declared;
- otherwise load the first available manifest entry;
- and if no entries are available, leave the surface empty rather than inventing extra UI.

When the user chooses a different item from the header selector, the app should load that JSON document into the surface.

That selection behavior should:

- clear the currently rendered surface objects and spline paths;
- load the newly selected Xyzzy JSON document from the manifest entry's `documentPath`;
- and render only the selected document.

### Outputs

- final `xyzzy/v1` documents with stable object ids and placements;
- explicit spline link records;
- and explicit composite-label records for the final rendering pass.

### Solver Boundary

The preferred contract stance is:

- the upstream solve path may begin from any solver-facing request shape, but the JSON boundary consumed by Xyzzy is final `xyzzy/v1`;
- any translation from `solver-request/v1`, `solver-result/v1`, or another upstream solve format into `xyzzy/v1` happens outside the Xyzzy renderer;
- the Xyzzy runtime receives explicit Xyzzy-owned JSON shapes;
- assemblies and operators arrive as Xyzzy surface objects rather than as data that must be reinterpreted by the renderer;
- spline-producing relationships are explicit in JSON;
- and composite-label after-effects remain explicit data rather than inferred presentation.

The solver should not own screen coordinates or screen geometry details. Xyzzy owns the surface grid and final visual placement.

That means the practical v1 boundary is:

- send any solver-facing request upstream through a separate solve or transformation step;
- receive or publish a final `xyzzy/v1` document;
- and let the Xyzzy runtime render that `xyzzy/v1` document directly without app-side reconstruction of tile payloads, placement conventions, or link intent.

## Priorities

### 1. Define Composite Authoring On Top Of The Direct Object-Editing Workflow

Status: `deferred`

Current:

- the base direct object-editing workflow for single assemblies and operators is now defined;
- Xyzzy now reserves the outer columns and renders optional composite labels as a final pass;
- no richer composite-label semantics are intended beyond explicit visual grouping;
- composite authoring still has no explicit surface workflow of its own;
- and composite-aware assembly insertion behavior may remain deferred until that composite workflow is implemented.

Objective:

- build on the direct object-editing workflow defined above so authored assemblies in lane columns 1, 3, and 5 can become a solver request and that same authoring flow can describe composite assemblies as well as individual assemblies;
- define a composite as one authored grouping of multiple assembly rows that belong together;
- allow one optional visual span bar to illustrate the grouping, but for visual effect only;
- place the composite reactant label tile such as `Pro Neutron` in tile column 1, vertically centered against the composite rows;
- place the composite product label tile such as `Pro Proton` in tile column 20, vertically centered against the composite rows;
- treat the composite's occupied area in one lane as one `n-row x 4-column` rectangle for drag hit testing and insertion;
- and include the composite label and optional span-bar records in the solver request only as pass-through display data that the solver returns without using for solve logic.

Purposes:

- make it easy to add a composite from the same surface-local create-picker family;
- make it easy to move all rows belonging to a composite together by dragging the composite vertically within a lane;
- make it easy to drag an assembly over a composite rectangle and have that composite shift down as one block to make room;
- make it easy to delete a composite from its composite label tile without a side panel workflow;
- and preserve composite labels and spans as visual organizing graphics for still reaction images.

Done when:

- the composite workflow built on the direct object-editing model can create both individual assemblies and composite assemblies;
- a composite can author multiple grouped rows in one action;
- composite reactant and product label tiles are placed in the outer tile columns and stay vertically centered against their grouped rows;
- dragging an assembly over a composite's `n-row x 4-column` lane rectangle inserts relative to that composite as one block;
- assembly lanes remain densely packed with no empty rows between occupied assembly or composite extents;
- optional span bars remain visual-only grouping graphics;
- and composite label and span data round-trip through the solver request and response path without becoming solver-owned decision logic.

### 2. Automate Drift Detection Between The JS Renderer And The Reference Generator

Status: `next`

Current:

- the shared Xyzzy tile and review-group catalogs are now the authored source of truth;
- the JavaScript runtime remains the only app renderer;
- `scripts/glyphs/glyph.py` generates committed reference SVG artifacts for comparison;
- and the remaining risk is silent drift between the shared catalogs, the JavaScript runtime, the Python reference exporter, and the checked-in SVG outputs.

Objective:

- keep the shared JSON catalogs as the only authored design inputs;
- keep the JavaScript runtime as the only app renderer;
- keep `glyph.py` limited to reference export and comparison work;
- treat the committed `xyzzy-tile-*` and `xyzzy-group-*` SVG files as derived reference artifacts generated by one workflow;
- and add automated checks that detect filename drift, content drift, and stale generated outputs.

Done when:

- the shared Xyzzy JSON catalogs remain the only authored tile and group definitions;
- `glyph.py` reads those shared catalogs rather than any parallel hand-maintained tile inventory;
- tests verify that the committed `xyzzy-tile-*` and `xyzzy-group-*` SVG filename set matches the current catalog-defined outputs exactly;
- tests verify that regenerated reference SVG output still matches the committed canonical artifacts for representative tiles and groups;
- stale generated Xyzzy SVG files are detectable;
- and the reference SVG generation stays useful for comparison without becoming a second design system.
