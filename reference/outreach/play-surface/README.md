# Play Surface Merchandise Set

Status: working product-design note. This is not an engineering drawing, safety certificate, or manufacturing specification.

Series frame: **The Wonder of Nature and the Universe**

This note captures a tenable first design for the series play-surface merchandise set. The set should let a child roll pure red and pure blue balls across modular contoured tiles while seeing path, return path, surface slope, and later potential-landscape lessons as physical play.

The product should live alongside the book series without requiring the books to depict it or match it. The play surface is a separate physical activity product for caregiver-led play, classroom use, and possible merchandise.

## Theme Expression

The play surface must make **The Wonder of Nature and the Universe** physical. A child should encounter a small, touchable world where motion can be watched, repeated, compared, and gently questioned. The hills, dips, ridges, basins, red ball, and blue ball should feel like a child's first concrete model of nature: things move, the surface matters, paths can return, and repeated play reveals lawful pattern.

The set should not read as a generic marble maze, race track, or construction toy. Its design language is landscape-and-cosmos: smooth white terrain, visible paths, gentle slopes, open space, pure red and pure blue motion, and enough visual quiet for the child to wonder what will happen next. Nature appears through touchable terrain. The universe appears through path, return path, orbit-like rolling, paired red/blue motion, and the idea that a small local event belongs to a larger ordered field.

Packaging should state and show the theme explicitly. The front, side, or back panels should use the series frame **The Wonder of Nature and the Universe** and should show the actual play surface in use, not just isolated product parts. The package should make the sequence clear:

1. wonder: a child sees a red or blue ball on a white contoured world;
2. exploration: the child or caregiver rolls the ball and watches the path change;
3. discovery: trying again shows that nature has pattern: many rolls come out almost the same, and special balanced places can let the ball go this way or that way.

Package art may draw from [the children's-book style guide](../childrens-books/style-guide.md): white/pale-purple terrain, black linework, pure red and pure blue balls, red-blue purples for path or universe accents, and natural skin and hair tones for people only. Any stars, arcs, waves, or cosmic marks should support the wonder-of-nature-and-universe theme without becoming busy decoration or hiding the actual surface.

## Design Commitments

- The set uses square modular tiles.
- The standard tile color is white plastic.
- The rolling surface has no decorative surface pattern, relief texture, embossed scenery, printed graphic, or repeated motif.
- The surface finish should be smooth satin or low-gloss white, not rough matte.
- Balls are pure red and pure blue only. There are no purple balls.
- The target ball diameter is at least `2.75"`.
- Tiles should be stackable for shipping and storage.
- Each tile should be a closed, sealed plastic shell rather than an open hollow underside.
- Tiles should join securely without detachable clips, exposed hooks, small pins, or magnets.
- Joints should be close to seamless so balls roll across them without jumping, stalling, or veering.
- The assembled field should read as a small white terrain for wondering about nature and the universe, not as a maze, raceway, or track system.
- The set should aim for compliance with applicable toy-safety requirements, including third-party review and testing before sale.

## Age And Supervision Framing

Working product intent:

- supervised caregiver-led exploration can begin around `6` months onward;
- the adult sets up the tiles, manages the balls, and stays within reach;
- infants and young toddlers are not expected to assemble tiles, handle joiners, lift tile stacks, or play unsupervised;
- early play is watching, reaching, touching, and seeing the caregiver roll the red and blue balls;
- toddler play becomes more active as the child can sit, crawl, walk, roll, and later kick or place balls intentionally.

The book series can begin at the normal picture-book stage, when a parent or caregiver reads aloud and shows pictures. The infant or toddler does not need to understand the physics lesson. The first layer is visual rhythm, caregiver attention, red/blue contrast, and the simple fact that balls follow paths.

This working intent pushes the product toward under-3 safety robustness even if the final package age grade, warning language, and marketing claim are decided later with a toy-safety lab and legal review.

## Tile Envelope

Working tile target:

- nominal tile footprint: `11" x 11"` square;
- preferred shipping-aware target: one `11" x 11"` tile inside an approximately `12" x 12" x 4"` single-tile carton;
- tile body height: `3"`;
- neutral surface plane: `1.5"` above the bottom;
- lowest ordinary surface point: `0.5"` above the bottom;
- highest ordinary surface point: `2.5"` above the bottom;
- active hills, ridges, saddles, dips, valleys, and troughs use one standard `1.0"` offset from neutral.

The `11"` tile footprint is the selected nominal size. A slightly smaller-than-12-inch tile leaves room for wall thickness, corner radii, protective packaging, and a carton that still fits a clean 12-inch shipping grid.

The `3"` body height leaves a half-inch clearance margin above the highest ordinary surface point and below the deepest ordinary surface point. That margin should help with stiffness, molded underside structure, stack protection, and packaging.

The `3"` height is the external tile envelope, not a claim that the part should be a solid plastic block. A sealed shell, twin-wall structure, welded assembly, foam-backed shell, or other manufacturable closed construction may be better than a fully solid tile for weight, cost, cooling, warping, and child handling.

## Contour Smoothness Rule

All rolling contours should use controlled sine/cosine-family transitions. In cross-section, a hill, ridge, dip, trough, saddle, basin, or valley should be built from smooth height changes, not from abrupt sculptural edges. Each contour should leave the neutral plane smoothly, reach its high or low region smoothly, and return smoothly.

The working prototype definitions should use sine, cosine, and raised-cosine functions for rolling contours and fade-outs. Do not use polynomial smoothstep easing for the playable surface when a sine/cosine definition can express the same transition.

The intended profile is:

> neutral surface -> smooth cosine rise or fall -> smooth crest or low point -> smooth cosine return -> neutral surface

The working mathematical profile for ordinary round hills and dips is a cosine lobe with no flat top and no flat bottom. For feature radius `R`, amplitude `A`, and radial distance `r` from the feature center:

> `height(r) = neutral + A x (1 + cos(pi x r / R)) / 2` for `0 <= r <= R`

and:

> `height(r) = neutral` for `r > R`

For a hill, `A` is positive. For a dip, `A` is negative. The derivative is sine-shaped, so the ball sees a gradual slope increase and gradual slope decrease with no step, lip, rim, mesa, flat-bottomed bowl, or sudden change.

For a saddle, valley, ridge, or advanced feature that needs a real level-to-level transition, use a compatible sine-eased or raised-cosine transition with zero slope at both ends. Do not force any fixed midpoint tangent as a general requirement; the slope should be chosen by play value, safety, roll distance, and prototype testing.

Lowered features need special discipline because a flat-looking bottom can turn the lesson into a hole or track instead of a smooth rolling field. A dip, basin, valley, or trough should not have a constant-depth floor, shelf, or trough centerline. The path down into the shallow area should be sine/cosine-based from every ordinary approach direction. For curved valleys, the working prototype should combine a raised-cosine profile across the valley with a raised-cosine fade along the valley length, so the low region is smooth in both directions and never becomes a flat-bottomed channel.

This is a ball-safety and lesson-clarity rule. A child should see the ball respond to smooth surface geometry, not to a sudden drop, step, sharp lip, curb, hard rim, groove, or track wall. Even visually strong one-inch hills and dips should still feel rounded and continuous under the ball. The feature may be high or low, but the transition into it must be gentle.

Three-quarter product renders are useful for checking the tile form, sidewalls, and no-pattern surface language, but they are not enough to verify or communicate the sine-eased contour law. Any final contour exemplar should include a cross-section or profile view that shows the level-to-level S-curve directly.

The play surface should express the nature-and-universe theme through the shape of the terrain and the moving red/blue balls, not through surface pattern. Stars, waves, orbit marks, scenery, dots, embossed icons, texture fields, and other decorative relief should not appear on the rolling surface.

## Field Layouts

The physical product and its demonstrations may use rectangular sets of these tiles as the rolling surface. Rectangular includes square arrangements. Book images are not required to use the play-surface tile field.

Recommended product and demonstration layouts:

- `5 x 5`: default for close child play and simple ball-rolling demonstrations;
- `6 x 6`: wider classroom/tabletop demonstrations and longer paths;
- `4 x 6`: landscape tabletop demonstrations and left-to-right paths;
- other rectangular arrangements when the use case requires a different scale.

The field should read as a single continuous play surface first and a modular tile set second. Seams may be visible, but they should be light enough that the path and ball remain the main visual lesson.

## Side Compatibility

From the tile's point of view, every side is a connection side. A side may be joined to another tile in one build and exposed on the assembled set perimeter in another build.

All ordinary tile sides should meet neighboring tiles at neutral height.

Tile-side rule:

- every tile side reaches the seam at the `1.5"` neutral plane;
- each side has a flat neutral approach band before the seam;
- slope should fade to zero before the tile boundary;
- no hill, dip, ramp, or valley should terminate directly at a side unless the tile is part of a controlled matched-pair expansion.

The initial flat approach-band target is `0.5"`, `0.75"`, or `1.0"` measured inward from each side. This number exists to provide a short neutral bridge before the seam. It should be prototyped at all three widths because a wide band wastes play area, while a narrow band may make seams too visible to the ball.

Compatibility rule:

> A child should be able to connect any ordinary tile to any other ordinary tile, in any rotation, without creating a ramp to nowhere.

## Cross-Tile Features

Cross-tile paths are allowed, but they should be designed as compatible features rather than arbitrary side-boundary slopes.

Preferred pattern:

1. A contour feature approaches the tile side.
2. The feature smoothly returns to the neutral plane.
3. The ball crosses a short neutral bridge at the seam.
4. The neighboring tile begins its own contour from the same neutral plane.

This preserves universal compatibility while still allowing longer routes, hills, basins, saddles, spirals, and return paths across several tiles.

Possible later expansion:

- matched feature-pair tiles whose sides intentionally meet with a non-neutral profile;
- keyed markings on the underside or packaging to warn that these tiles are special pairs;
- older-child or advanced sets only, after the universal neutral-side system is proven.

## Initial Tile Catalog

The first tile set should stay simple. The initial catalog uses universal neutral sides and internal contour features only. Height values below are relative to the `1.5"` neutral plane.

Height convention:

- raised features use `+1.0"` from neutral and reach `2.5"` above the tile bottom;
- lowered features use `-1.0"` from neutral and reach `0.5"` above the tile bottom;
- saddles use the same `+/-1.0"` envelope;
- the flat tile remains at `0"` relative change.

Core tiles:

| Tile | Surface feature | Height range | First-use purpose |
| --- | --- | --- | --- |
| Flat tile | No contour; full neutral surface except normal seam treatment. | `0"` relative change | Rest, reset, joining space, open path. |
| Standard offset round hill | Smooth circular mound with peak off-center in both `x` and `y`. | `+1.0"` peak | Clear deflection, beginner slope reading. |
| Wide offset round hill | Larger-radius circular mound with peak off-center in both `x` and `y`. | `+1.0"` peak | Broader visible potential barrier. |
| Standard offset round dip | Smooth circular bowl with low point off-center in both `x` and `y`. | `-1.0"` low point | Clear settling basin. |
| Wide offset round dip | Larger-radius circular bowl with low point off-center in both `x` and `y`. | `-1.0"` low point | Broader high-contrast basin lesson. |

Offset rule:

- the hill or dip center should not sit in the tile center;
- offset it in both `x` and `y` so rotations create different paths;
- keep the feature far enough from all sides to preserve the flat neutral approach band;
- use smooth slopes with no local sharp crest, lip, or rim.

## Starter Set V1

The first complete starter set is a `25`-tile prototype. It supports a `5 x 5` field or a `4 x 6` field with one spare tile. It favors repeatable path play, return-path play, basin behavior, balanced saddle behavior, and soft toddler back-rail behavior over unused open area.

The set is a prototype schedule, not a locked commercial bill of materials. Every tile family keeps universal neutral sides and an unpatterned rolling surface.

| Tile family | Count | Working contour | Concept exemplar | First-use purpose |
| --- | ---: | --- | --- | --- |
| Flat tile | `1` | `0"` relative change | [Flat](assets/concepts/sine-curve-options/sine-flat.png) | Rest, reset, joining space, open path. |
| Standard offset round hill | `4` | `+1.0"` cosine-lobe peak, standard radius | [Standard hill](assets/concepts/sine-curve-options/sine-standard-hill.png) | Clear deflection, beginner slope reading. |
| Wide offset round hill | `2` | `+1.0"` cosine-lobe peak, larger radius | [Wide hill](assets/concepts/sine-curve-options/sine-wide-hill.png) | Broader visible potential barrier. |
| Standard offset round dip | `4` | `-1.0"` cosine-lobe low point, standard radius | [Standard dip](assets/concepts/sine-curve-options/sine-standard-dip.png) | Clear settling basin. |
| Wide offset round dip | `2` | `-1.0"` cosine-lobe low point, larger radius | [Wide dip](assets/concepts/sine-curve-options/sine-wide-dip.png) | Broader high-contrast basin lesson. |
| Diagonal saddle | `1` | `+/-1.0"` side-faded saddle | [Diagonal saddle](assets/concepts/sine-curve-options/sine-diagonal-saddle.png) | A balanced place where a ball may leave by different paths. |
| Curved valley | `2` | `-1.0"` raised-cosine valley across width and length | [Curved valley](assets/concepts/sine-curve-options/sine-curved-valley.png) | A broad low route that guides without becoming a track. |
| Straight edge/rim tile | `4` | `+1.0"` raised-cosine ridge line plus one interior feature | [Straight ridge](assets/concepts/sine-curve-options/sine-straight-ridge.png) | Gentle-roll guide, straight back-rail segment, and active edge play. |
| Rounded corner rim tile | `4` | `+1.0"` raised-cosine corner ridge line plus one interior feature | [Corner ridge](assets/concepts/sine-curve-options/sine-corner-ridge.png) | Gentle-roll guide, soft corner, and active corner play. |
| Paired hill-dip | `1` | `+1.0"` hill and `-1.0"` dip | [Paired hill-dip](assets/concepts/sine-curve-options/sine-paired-hill-dip.png) | Older scenes about thresholds and path choice. |

This starter-kit mix is also a packaging test case. The four corner rim tiles and four straight edge/rim tiles are important for toddler rim behavior, but they are probably the hardest tiles to nest because their ridges sit near the side zones where generic stack supports would like to land. Do not treat the commercial starter-kit count as final until the same set can pass play-value, stack-height, sealed-underside, and carton-size checks together.

Prototype contour family notes:

- diagonal saddle: a gentle internal saddle that returns to neutral on all sides;
- curved valley: a broad low route that guides the ball without creating a side-boundary ramp, flat-bottomed trough, or constant-depth centerline;
- valleys and ridge-line features should extend to within about `0.75"` of the tile edge, then return smoothly to neutral before the side boundary;
- edge and corner rim tiles should not be blank guard pieces; each should include exactly one interior rolling feature such as a hill, dip, or curved valley, using the same sine/cosine contour law and staying within the `+/-1.0"` envelope;
- rounded corner rim tile: a high rounded ridge, `+1.0"` relative to the neutral plane, makes an internal right-angle turn close to two adjacent sides while preserving the flat neutral approach band at each side;
- straight edge/rim tile: a high rounded ridge, `+1.0"` relative to the neutral plane, runs straight near one side so it can meet the corner rim tile on the same ridge line; rotating the tile makes horizontal or opposite-side runs;
- paired hill-dip tile: an offset hill and offset dip on the same tile for older scenes about thresholds.

Ridge composability:

- ridge tiles should combine to realize many different paths, including soft perimeter rims around a toddler play field;
- a parent, older sibling, or teacher should be able to place ridge tiles along one end or one side of a floor-level play field as a back rail for gentle toddler rolling demonstrations;
- the back rail is meant to reduce routine roll-off under furniture, not to contain hard rolls, thrown balls, bounces, or high-speed launches;
- the ridge centerline should use a standard side offset so straight edge/rim tiles and corner rim tiles align when placed next to each other;
- the ridge should extend to within about `0.75"` of the tile edge while preserving the flat neutral approach band at the side boundary;
- the ridge must still smooth back to the neutral plane before the side boundary, preserving ordinary universal side compatibility;
- corner rim tiles and straight edge/rim tiles should both use a high rounded ridge at `+1.0"` relative to the neutral plane;
- ridge tiles are gentle-roll guides, not containment walls. They may keep a `2.75"` ball on the surface for many slow toddler rolls, but they are not intended for bounces, hard launches, or high-velocity play.

Do not add narrow tracks, hard rails, maze walls, or steep lips in the first generation. Those features may make the toy more game-like but would work against the universal rolling-surface lesson and create harder safety and seam problems.

## Joint Concept

The rolling surface at the joint should be formed by the two tile rims meeting cleanly. The joiner should not create the top rolling surface.

Preferred joint direction:

- underside-only alignment feature;
- broad molded tongue-and-groove, sliding dovetail, rail, or large bridge piece;
- no detachable small clip;
- no exposed latch on the play surface;
- no magnet;
- enough engagement to resist separation during normal play;
- easy adult assembly and disassembly.

The joiner may pull tiles into alignment, but the ball should only touch the molded top surfaces of the tiles.

Working seam targets:

- small visible gap, initially around `0.5 mm` to `1.0 mm`;
- vertical mismatch target under about `0.5 mm`;
- any side that is exposed on the assembled set perimeter should still be safe to touch;
- the top seam transition given only a small controlled break so it is not sharp but does not create a groove.

## The Hard-Edge Problem

A hard plastic 90-degree side transition is a problem in two different ways.

For safety, any tile side or corner that lands on the assembled set perimeter must not be sharp. This cannot rely on a preassigned perimeter side, because any side may be exposed depending on how the child assembles the set.

For rolling, top seam transitions must not behave like a curb or trough. If two tiles meet with a vertical mismatch, the ball can hop. If both tile-side transitions are rounded too aggressively, the two radii can form a small groove. If the seam is sharp, it can be both unpleasant to touch and too sensitive to manufacturing variation.

Toy-safety rules do not give a simple universal corner radius such as "all corners must be rounded to X." The working interpretation is performance-based: no accessible side, corner, seam transition, or broken-off part may become a hazardous sharp point or hazardous sharp edge before or after applicable use-and-abuse testing.

Design split:

- top rolling seam: tiny controlled edge break only, with an initial prototype range around `0.25 mm` to `0.5 mm`;
- tile sides and corners that may land on the assembled set perimeter: larger safe radii where they do not affect rolling;
- underside joiner: strong enough to hold coplanar alignment without creating a top-surface bridge.

The intended solution is:

> contoured interior -> flat neutral approach band -> tight seam -> flat neutral approach band -> contoured interior

The ball should experience the seam as a narrow line on a flat bridge, not as a wall, ditch, ramp, or discontinuity.

## Stackability

Stackability must be engineered together with play geometry, starter-kit tile selection, underside relief, and carton layout.

Desired stack features:

- sealed underside shell with no open consumer-facing cavity;
- tapered sidewalls where manufacturing allows;
- large underside corner radii and broad molded transitions;
- broad integrated stack lands, ribs, shelves, rails, or packaging supports that prevent one tile from crushing or scratching the contour surface below it;
- protected rolling surface during storage and shipping;
- no small removable spacers.

The tile should feel like a real sealed tile, not a tray. Sealed means closed to the child and to household dirt; it does not mean solid plastic all the way through. The underside may still have molded relief, shelves, rails, and stack lands, but those features should be part of the closed tile shell. They should not create detachable pieces, open dirt traps, narrow pinch gaps, or brittle hooks.

A reasonable sealed-edge cross-section to prototype:

1. The top rolling rim reaches the `1.5"` neutral surface plane at every side.
2. The exterior side wall descends from the neutral rim.
3. A generous quarter-round or fillet begins around `0.5"` below neutral, near `1.0"` above the tile bottom.
4. A short inward underside shelf may run about `0.5"` before the next transition.
5. Another generous radius turns into the sealed underside relief or base.
6. The underside remains a continuous plastic surface.

The `0.5"` inward shelf is a prototype dimension, not a fixed commitment. Its job is to give the molded shell a controlled transition and possible stack land without creating a sharp underside corner.

The earlier nesting estimate needs one correction: a flat sealed base does not meet the packaging target unless the stack is allowed to become tall. Pitch means the vertical distance from the bottom of one tile to the bottom of the next tile above it. For an `n`-tile stack, the rough stack height is:

> `3" + (n - 1) x pitch`

With a literal flat bottom plane, the upper tile bottoms out on the highest point inside its support footprint. If it directly touches that point, the pitch is that controlling height. If the design requires about `0.125"` protective clearance above the playable contour, the pitch is that controlling height plus `0.125"`, and the load must be carried somewhere else by stack lands, shelves, rails, an interleave, or packaging support.

Examples for a `13`-tile stack:

| Lower tile support case | Controlling height above lower tile bottom | Direct-contact stack height | Protected-clearance stack height |
| --- | ---: | ---: | ---: |
| Active hill or ridge, `+1.0"` from neutral | `2.5"` | `33.0"` | `34.5"` |
| Neutral plane support | `1.5"` | `21.0"` | `22.5"` |
| Dip-only low point | does not control if neutral rim exists | neutral or higher case controls | neutral or higher case controls |

Dips do not help a flat-base stack unless the base only lands inside a deliberately lowered support zone. Since ordinary tiles preserve neutral side and approach bands, a flat underside will usually hit neutral or raised surface before it can benefit from a dip.

Therefore, the target `1.0"` to `1.25"` nesting pitch requires a shaped sealed underside, not a flat bottom plate. The sealed underside needs upward relief over ordinary high contours and broad controlled stack lands where contact is acceptable. The contact points should be designed around reinforced support zones or packaging inserts, not around whatever hill, ridge, saddle, or valley happens to sit under the next tile.

This is an optimization problem over the tile set, not a packaging detail that can be solved after the surface design is finished.

Starter-kit and stackability variables:

- tile counts by type;
- stack assignment, such as which `13` tiles go in one carton stack and which `12` go in the other;
- stack order;
- tile rotation within each stack;
- underside relief geometry;
- stack-land, rib, shelf, or rail locations;
- reinforced support-zone locations on the receiving tile;
- allowed interleave or packaging-support thickness;
- carton height target.

Starter-kit and stackability constraints:

- preserve the `11" x 11"` footprint and `3"` body envelope;
- keep every ordinary tile side at the `1.5"` neutral seam plane;
- keep the sealed underside shell;
- avoid detachable spacers, sharp underside features, small breakable details, and dirt traps;
- protect the playable contours from crushing and scratching;
- keep the red and blue balls, manual, and tray inside the same carton concept;
- preserve enough hills, dips, valleys, saddles, and ridges for a useful first play set.

Starter-kit and stackability objectives:

- minimize total stack height and left-stack/right-stack height mismatch;
- reduce reliance on packaging inserts where molded geometry can solve the problem safely;
- preserve the ridge tiles if possible, because they support the toddler back-rail use case;
- identify which tile designs force the most packaging height;
- revise either the tile geometry or the starter-kit counts when a tile type creates disproportionate packaging cost.

This means the current `25`-tile mix is a working hypothesis, not a locked bill of materials. If the optimizer shows that eight ridge tiles make the two-stack carton too tall or too fragile, the next design move could be to change ridge underside relief, alter ridge placement, add a safe carton interleave, split the kit into starter and expansion sets, or change the count of ridge tiles. The decision should be made with play value and shipping geometry in the same model.

The reduced `3"` body and `+/- 1.0"` ordinary contour envelope should make nesting easier than the earlier `4"` body concept, but only if the sealed underside is shaped for nesting. Production may still need tile-specific stacking guards or shallow interleave sheets that are not part of play, especially for corner ridge and hill/dip combination tiles.

Stacking should not rely on the rolling contours carrying stack load. A safer design direction is a sealed shell with broad molded stack lands, ribs, shelves, or rails that land on controlled support zones of the tile below or on protective packaging supports. Those support zones should be reinforced and should avoid delicate rolling contours.

Stack lands, ribs, and shelves are themselves safety-critical geometry. They must not create small breakable parts, sharp edges, pinch features, brittle hooks, or hidden debris traps. They also must not collide with ridges, hills, dips, or troughs when tiles are stacked in ordinary orientations.

The intended stack model is:

> upper sealed tile shell -> broad underside stack lands or packaging support -> controlled reinforced support zones -> lower tile body

The rolling surface should sit in protected air space during storage. The stack load path should bypass the playable contour surface as much as possible.

This needs purpose-built 3D checking before design confidence is warranted. Use [tools/model_play_surface.py](tools/model_play_surface.py) to generate initial height fields, support-zone checks, and stack-clearance reports. The checker is not a CAD replacement or safety certificate; it is a fast way to catch obvious 3D contradictions before detailed CAD and lab review.

First checker finding:

- generic corner-pad and side-midpoint stack-contact zones work for flat, hill, dip, and paired hill/dip tiles in the first model;
- the same generic support zones conflict with ridge tiles and some valley/saddle geometry;
- ridge tiles probably need a different stacking support strategy: alternate support zones, shaped sealed underside relief, protective interleave, or a dedicated packaging insert.

## Manufacturing Definition Package

This note is not the manufacturing package. A manufacturer will need a controlled design-definition set.

Expected handoff artifacts:

- product requirements document, including age-grade target, safety assumptions, and starter-kit contents;
- native 3D CAD for each tile, ball, joiner, tray, and carton insert;
- neutral exchange files, such as STEP, for manufacturer review;
- 2D engineering drawings with dimensions, tolerances, datum references, material, finish, color, and inspection notes;
- geometric tolerancing for seams, tile flatness at neutral approach bands, underside stack lands, and ball-crossing mismatch;
- contour definition for each rolling surface, either directly from CAD surfaces or from a controlled height grid plus profile tolerance;
- contour design specification for each rolling feature, including neutral level, feature radius or transition width, height/depth amplitude `A`, peak, low point, or balance-region definition when applicable, and the sine/cosine-family law used to define the contour;
- cross-section verification showing that each hill, dip, ridge, trough, saddle, basin, or valley uses zero-slope or near-zero-slope starts and finishes, with the first half of the transition easing away from the old level and the second half easing into the new level;
- lowered-feature verification showing that each dip, basin, valley, or trough avoids constant-depth floors and constant-depth centerlines, including both cross-feature and lengthwise checks where the feature is elongated;
- visual exemplar package with both a three-quarter product view and a cross-section or profile view for each contour family, so the tile form and the sine-eased level-change law can be reviewed together;
- assembly drawings for underside joiners and package stacking;
- packaging drawings for the one-tile carton, 25-tile carton, accessory tray, interleaves, and pallet pattern;
- inspection and test plan for rolling behavior, seam crossing, stack height, drop/abuse, cleaning, color, and compliance.

The purpose-built checker can support the CAD process by catching obvious contradictions early, but it cannot replace CAD, engineering drawings, tolerance analysis, mold-flow/manufacturing review, or certified toy-safety testing.

## Surface Finish

The standard finish should be smooth satin white.

Avoid rough matte texture because it can:

- slow or deflect the ball;
- collect dirt and skin oil;
- make cleaning harder;
- create inconsistent rolling behavior between batches.

Avoid high gloss as the default because it can:

- show scratches quickly;
- create glare in book photography and videos;
- feel less warm in a children's-book context.

Satin white is the current compromise: cleanable, smooth enough for rolling, visually aligned with the book palette, and less glare-prone than gloss.

## Ball Requirements

The set uses:

- one pure red ball;
- one pure blue ball;
- no purple ball.

Working ball target:

- minimum diameter: `2.75"`;
- molded-in color rather than paint where possible;
- smooth, durable, cleanable surface;
- center of mass at the geometric center of the ball;
- weight high enough to roll reliably but low enough to be safe in toddler play.

Ball weight should be determined by prototype testing rather than guessed from size alone. The ball needs enough momentum to cross seams, gentle hills, and shallow valleys for a reasonable run, but not so much mass that toddler use becomes unsafe or the ball becomes hard to stop.

Initial roll-distance target:

- on a representative mixed tile field, a gentle child roll should commonly travel about `8` to `12` tile lengths before stopping;
- `8` tiles is the minimum useful target for visible path play;
- `10` tiles is the preferred first tuning target;
- `12` tiles is a useful upper target for longer tabletop scenes;
- the ball should not require a hard launch to reach that range.

The `2.75"` target is comfortably above the current CPSC small-ball threshold of `1.75"`, but it is not by itself a safety certification. It does not certify the balls, the tiles, the joiners, broken-part behavior, age grading, labeling, or the complete set. Final product development must include applicable toy-safety review and testing.

## Logistics Targets

Consumer shipping target:

- one-tile carton should fit a clean 12-inch packaging grid if the tile remains near `11" x 11"`;
- multi-tile cartons should preserve a modular footprint where possible;
- dimensional weight should be considered early because the tiles are bulky.

The `3"` body height improves the 25-tile packaging target. Preferred 25-tile carton concept:

- two side-by-side nested tile stacks;
- one stack carries `13` tiles;
- one stack carries `12` tiles;
- red and blue balls ride in a top accessory tray;
- manual/activity cards ride flat above or beside the accessory tray;
- target outer carton: about `24" x 13" x 20"`;
- stretch outer carton: about `24" x 13" x 18"` if nesting and accessory placement are excellent;
- fallback outer carton: about `24" x 13" x 22"` if contour clearance or protection requires more height.

The 25-tile carton assumes the tiles nest. With a `3"` body, the effective nesting pitch should target roughly `1.0"` to `1.25"` per added tile. This target is based on the `+/- 1.0"` ordinary contour envelope, which leaves `0.5"` of vertical clearance above the highest ordinary surface and below the deepest ordinary surface, but it still requires real nesting geometry, shaped sealed underside relief, and stack-protection features. If each tile consumes the full `3"` height in a stack, or if a flat sealed base must sit on the highest point of the tile below, the 25-tile set becomes too tall for a good consumer carton and should be split into multiple boxes or redesigned for better nesting.

Packaging impact:

- a `24" x 13" x 20"` carton has length plus girth of `90"` using the common `length + 2 x width + 2 x height` formula, and remains dimensionally plausible for parcel networks;
- dimensional weight is still substantial because the set is bulky;
- a `24" x 13"` footprint should theoretically support about six cartons per `48" x 40"` pallet layer if the final carton does not grow, before real-world clearance, carton bulge, strapping, and pallet loading constraints;
- at `20"` carton height, two carton layers plus a roughly `5.5"` pallet base produce a loaded height around `45.5"`, before top protection.

Freight target:

- design cartons around the common North American `48" x 40"` pallet footprint;
- treat the roughly `5.5"` pallet-base height as separate from the loaded pallet height;
- avoid pallet overhang;
- preserve stack strength;
- test full-pallet load stability with the actual carton and tile weight.

Air freight target:

- keep cartons compatible with `48" x 40"` freight footprints where possible;
- confirm aircraft, carrier, and service-specific height limits before treating any pallet load as air-ready.

The standard pallet footprint supports warehouse, truck, LTL, retail distribution, and ocean/container movement well. The pallet base itself is only the platform under the cartons. Loaded pallet height is the pallet base plus the stacked cartons. Air freight is more restrictive and carrier-specific.

## Safety And Compliance Targets

The product should be designed from the start for formal toy-safety review.

The working use case includes supervised child exposure from about `6` months onward. Do not assume that a `3+` label can solve the safety problem if the books, packaging, imagery, or ordinary family use invite infant and toddler interaction. If the product is intended, marketed, or foreseeably used by children under 3, the design burden is stricter: no small parts as received or after use-and-abuse testing, no small balls, no hazardous sharp points or edges, and no breakable underside details.

For toys intended primarily for children 12 years of age or younger, the manufacturer or importer should expect third-party testing by a CPSC-accepted laboratory and a Children's Product Certificate for applicable children's product safety rules. The currently accepted ASTM F963 version and effective date must be rechecked before production.

Known targets to evaluate:

- CPSC children's product and toy requirements;
- ASTM F963 applicability;
- small parts and small balls;
- sharp points and sharp edges;
- use-and-abuse testing;
- lead and other restricted substances;
- flammability;
- age grading;
- warnings and labeling;
- cleanability and foreseeable misuse.

Design implications:

- avoid detachable small parts;
- avoid magnets;
- avoid sharp tile sides and corners because any side may become part of the assembled set perimeter;
- avoid brittle clips;
- use large balls;
- prefer molded-in color over paint;
- make underside joiners too large and too integrated to become choking hazards;
- require lab review before production claims are made.

## Open Design Questions

- Final flat approach band for hills, dips, saddles, seams, and non-ridge/non-valley features. Ridge and valley feature-edge clearance is currently `0.75"`.
- Exact offset distance for the round hill and dip centers.
- Commercial starter-set count after stackability optimization, especially the count of ridge tiles.
- Exact sealed-underside relief and stack-land geometry.
- Best underside joint geometry: sliding rail, dovetail, bayonet-like large feature, or broad tongue-and-groove?
- Best sealed-shell manufacturing method: injection-molded assembly, twin-sheet thermoform, blow molding, rotational molding, welded shell, foam-backed shell, or another process?
- Best plastic and wall thickness for stiffness, weight, cost, cleanability, and child safety?
- Final labeled age grade, warning language, and supervised-use claim for the `6` months onward working intent.
- Whether the first product should be a small starter set, classroom set, or premium multi-tile set.
- Whether advanced matched-pair non-neutral side tiles should exist at all.

## External References To Recheck Before Production

- CPSC Toy Safety Business Guidance: https://www.cpsc.gov/Business--Manufacturing/Business-Education/Toy-Safety
- CPSC Toy Safety FAQ: https://www.cpsc.gov/FAQ/Toy-Safety
- CPSC Child Safety Protection Act fact sheet: https://www.cpsc.gov/s3fs-public/282.pdf
- CPSC small parts summary: https://www.cpsc.gov/s3fs-public/Small-Parts-16-C-F-R-Part-1501-English.pdf
- UPS package size and weight limits: https://www.ups.com/us/en/support/shipping-support/shipping-dimensions-weight
- FedEx freight pallet guidance: https://www.fedex.com/en-us/shipping/freight/resources/packing-guide/pallets.html
- FedEx freight boxes: https://www.fedex.com/en-us/shipping/freight/resources/packing-guide/boxes.html
- ASME Y14.5 dimensioning and tolerancing: https://www.asme.org/codes-standards/find-codes-standards/dimensioning-and-tolerancing
- ISO 1101 geometric product specifications: https://www.iso.org/standard/66777.html
- STEP ISO 10303 overview: https://downloads.steptools.com/stds/step/

## Way-Out Future Idea

A distant advanced version could use red, blue, and purple LEDs to show paths, slopes, basins, barriers, or potential values on the play surface. In that concept, purple would be a light/signaling color only; the physical balls would still remain pure red and pure blue.

This is far beyond the first-generation plastic tile. To work well, the lighted version would almost need a TV-like shaped display that follows the tile contour, while still solving sealed electronics, battery safety, impact resistance, cleanability, heat, cost, and toy-safety review. Treat this as a speculative future concept, not as a requirement for the initial merchandise set.
