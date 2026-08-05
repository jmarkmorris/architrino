# Topo Dynamic Contour Rendering Recommendation

## Decision Boundary

The current circular binary remains heatmap-only. This note evaluates future
dynamic contours but grants no implementation authority for them. The sampled
binary scalar is `signed equal-wake intensity`, not potential. A potential
contour mode requires an established $\mathbb{A}\mathbb{A}\mathbb{A}$ potential
product with its own versioned kernel and claim boundary.

Plainly: contours are being designed, not switched on. The present colors compare equal-wake intensity from prescribed paths and do not become potential lines merely because a contour algorithm exists.

## Compared Paths

| Criterion | Shader-only contours | Shared full field grid plus marching squares | Separate reduced contour grid |
| --- | --- | --- | --- |
| Heatmap parity | Strong only if contours read the exact same shader expression; hard to inspect numerically | Strong: heatmap texture and contours can consume one authored grid | Weak by default: two resolutions and often two evaluation paths can disagree |
| Runtime cost | Lowest transfer cost and usually fastest display | One field evaluation plus texture upload and CPU or worker extraction; moderate and measurable | Lower extraction cost, but adds a second field evaluation or downsample pass |
| Interaction latency | Excellent on capable GPUs | Good with worker extraction, cancellation, and last-complete-frame retention | Good, but resolution changes can cause visible contour jumps |
| Topology | Screen-space threshold bands do not naturally provide connected curves or branch records | Marching squares yields explicit connected segments with deterministic saddle handling | Coarse cells can merge, delete, or invent components near close features |
| Zero level | Easy to color but difficult to distinguish a true connected zero set from a finite-width band | First-class signed level with explicit zero-crossing segments | Vulnerable to aliasing and cancellation loss at coarse resolution |
| Labels | Requires a separate readback or CPU reconstruction path | Labels can follow retained polylines and use deterministic collision rules | Labels can drift from the visible high-resolution heatmap |
| CPU/GPU parity | Requires separately authored shader and CPU sample suites | Natural: selected grid nodes can be checked directly against a CPU reference | Must verify both the reduction rule and the field evaluator |
| Vector output | Poor; no native curves to export | Strong; polylines can feed SVG, PDF, hit testing, and accessibility summaries | Possible, but exports only the reduced approximation |
| Responsive behavior | Re-evaluates cleanly but contour thickness and band aliasing are viewport-dependent | Grid can be world-anchored, clipped, and reprojected consistently | Viewport-driven grid changes can alter topology across breakpoints |
| Maintainability | Compact renderer but embeds scientific evaluation and contour display in GPU code | Clear ownership when one field provider feeds heatmap and contour consumers | Adds a parallel path and long-term parity burden |
| Failure handling | Shader failure is hard to localize beyond a blank or fallback frame | Grid identity, level set, extraction state, and last complete frame are inspectable | Failures can be mistaken for legitimate coarse simplification |

Plainly: shader bands win raw speed, while a shared full field grid wins inspectability, connected topology, labels, parity checks, and vector reuse. A reduced grid saves work by accepting the largest scientific-display risk: it can show contour structure that the heatmap does not actually contain.

## Recommendation: One Canonical Sampled Field Path

Adopt a canonical `TopoSampledFieldFrame` path when dynamic contours are
authorized. One provider should produce a signed scalar grid, validity mask,
world chart, time, scenario identity, kernel identity, and raw-value hash. The
heatmap should upload that grid as a texture; a worker should run marching
squares over the same immutable values. Neither consumer may recompute the
scientific scalar independently.

Plainly: calculate the numbers once, then let color and contour code read the same frozen frame. This removes the most dangerous disagreement: a contour claiming a level that the heatmap never sampled.

The initial implementation plan is:

1. Define the immutable field-frame schema and a producer boundary that returns
   raw signed values plus ordinary, unavailable, singular, and unresolved masks.
2. Add selected-node parity tests against a separately authored CPU reference
   before enabling any contour UI.
3. Upload the same grid to the heatmap texture without changing its direct
   signed base-10 mapping.
4. Run interruptible marching squares in a worker, keyed by field-frame hash and
   a separately versioned level-set identity.
5. Join segments into world-space polylines, retain open/clipped versus closed
   topology, and publish only complete extraction results.
6. Render vector polylines and labels above the heatmap while keeping the last
   complete matching contour frame during recomputation.
7. Measure wall time, memory, interaction latency, and topology changes at the
   actual desktop and mobile grid sizes before selecting a production density.

Plainly: the plan first locks the shared data contract, then extracts curves, then styles them. Performance promotion waits for measurements rather than assuming that a smaller grid is automatically cheaper enough or visually safe.

## Levels, Zero, And Topology

Contour levels should be explicit raw values bound to a `levelSetId`; they must
not be recomputed from per-frame quantiles. Use symmetric nonzero magnitude
levels around zero when the product warrants them, and treat $W=0$ as its own
signed level rather than as one member of a magnitude lattice. The UI should
show which levels are active and distinguish a real zero crossing from
unavailable or masked samples.

Plainly: a red-blue boundary is a zero contour only when actual signed samples cross zero. A missing source root or masked marker must never be interpreted as a neutral scientific value.

Marching-squares saddle cells should use one declared asymptotic decider based
on the bilinear cell interpolant, with stable tie-breaking bound to cell index
and level identity. Segment joining should retain component identity, closed or
open status, viewport clipping, and the source/invalid-mask boundaries that
terminate a curve. A topology summary should report component count and
birth/death changes between matched frames.

Plainly: ambiguous four-edge cells need one reproducible connection rule. Without it, a tiny timing or viewport change can reconnect contours and falsely suggest that the field topology changed.

## Labels And Responsive Rendering

Labels should be placed on world-space polylines after joining, not on isolated
cell segments. Candidate anchors should prefer low curvature, avoid source
markers and transport controls, keep a minimum screen-space separation, and
remain stable by component identity between nearby frames. Suppression is
preferable to a label that crosses a curve or collides with controls.

Plainly: labels belong to whole curves. Stable component-aware anchors reduce flicker and keep the data view readable on both desktop and mobile layouts.

The grid should be world-anchored and clipped to the responsive visible chart.
If the orbit overflows vertically under
`clip-stage-preserve-world-scale/v1`, the contour extraction should use the
same clipped chart rather than shrinking the orbit or silently changing grid
spacing. Device-pixel density may change raster sharpness but must not change
the raw grid or level identities.

Plainly: resizing changes what portion of the world is visible, not the scientific meaning of a level or the circle's shape.

## Parity, Vector Needs, And Promotion Gate

The acceptance set should include independently selected raw CPU samples,
heatmap-texture readback at those nodes, contour interpolation residuals,
component topology fixtures, zero-level cancellation cases, invalid-mask
boundaries, label collision cases, and SVG path snapshots. GPU agreement with
the producer alone is implementation parity unless the producer has a separate
analytical or independently authored reference.

Plainly: agreement between two consumers of the same grid proves that they read the grid consistently. It does not prove that the underlying scalar is physically correct; that requires an independent reference for the producer.

Do not promote true dynamic contours until the shared frame schema, level-set
identity, topology policy, selected-node parity, vector consumer, and measured
latency budget all exist. Do not choose the reduced-grid path as the canonical
architecture. If measurements later require reduction, derive it as a declared
level-aware simplification of the canonical field frame, retain an error bound,
and verify that component topology is unchanged for the displayed levels.

Plainly: the recommendation is the shared full grid with marching squares. A reduced grid is an optional measured optimization only after it proves that it preserves the contours readers are being shown.
