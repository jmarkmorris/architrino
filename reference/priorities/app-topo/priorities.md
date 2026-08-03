# Topo App

## Workstream Metadata

- Kind: `priority-app-candidate`
- Status: `design-open`
- Claim level: `priority-design`
- App name: `Topo`
- Priority directory: `app-topo`
- Execution ledger: [work queue](work-queue.md)
- Requirements packet: [requirements and design](requirements-and-design.md)
- Observable contract: [TOPO-001 observable and reference geometry v1](topo-observable-and-reference-geometry-v1.md)
- Exploratory notes: [brainstorming](brainstorming.md)
- Chronological record: [work log](work-log.md)
- Potential-product owner: [Potential](../app-potential/priorities.md)
- Shared platform: [AAA Core](../app-aaa-core/priorities.md)
- Ranking: pending the interaction contract and a reference-surface estimate

## Objective

Build a focused two-dimensional planar application that displays a topographic map around one prescribed, uniformly translating architrino. The architrino remains fixed on the canvas at the normalized default position $(2/3,1/2)$ while its represented absolute-frame translation is left to right. A slider controls $\beta=v/c_f$, and the surface is recomputed whenever $\beta$ changes.

Plainly: the view follows the architrino so the marker stays still, while the changing contour pattern shows the effect of changing its prescribed left-to-right speed.

The first release is a static single-time visualization only. It does not evolve a path, integrate an equation of motion, or infer a trajectory. Its initial scenario menu contains a single electrino and a single positrino; the menu structure remains extensible to later declared scenarios.

## Accepted Product Decisions

1. The priority-directory name is `app-topo`; the display name is `Topo`.
2. The primary surface is a normalized two-dimensional canvas with the source marker initially at $x=2/3$ and $y=1/2$.
3. Translation is left to right along the positive horizontal axis.
4. The initial speed control is $\beta=v/c_f$, with numerical work using $c_f=1$.
5. The initial scenario choices are `Single electrino` and `Single positrino`.
6. The first release is a prescribed-path, fixed-time map. Dynamics are deferred to a separately owned later phase.
7. Contours use a signed diverging palette: large positive values are red, zero is purple, and large negative values are blue.
8. Contour-level count is a user-adjustable display parameter, not a scientific parameter.
9. Linear, signed-logarithmic, and inverse-hyperbolic-sine display transforms will be compared before the default is frozen.
10. A singular source neighborhood is shown as masked or unavailable. Display masking must not be described as a physical core or a change to the wake law.
11. Topo renders declared potential products supplied through [Potential](../app-potential/priorities.md); it does not establish a competing app-local path-to-potential law.
12. The first raw map product is `Signed ordinary wake intensity`, not potential. It uses the canonical inverse-square distance factor and transmitter-side ordinary-root weight on the prescribed path, as fixed by [TOPO-001](topo-observable-and-reference-geometry-v1.md).

## Current Scientific Status

[TOPO-001](topo-observable-and-reference-geometry-v1.md) closes the prescribed single-source reference geometry and selects a source-signed ordinary wake-intensity scalar for v1. It derives the causal root, transmitter-side factor, regular domain, polarity reversal, axis controls, and exact $\beta=1$ boundary without defining a new physical law.

The canon does not yet supply a completed pointwise scalar-potential formula for this map. A later potential mode therefore remains routed to [Potential](../app-potential/priorities.md) and must be separately named, versioned, and validated.

Plainly: the first colored pixel now has an exact wake-intensity meaning. A true potential remains a different, still-open product rather than a second name for the same numbers.

## Promotion Boundary

This lane owns the Topo interaction model, fixed-source camera, two-dimensional contour renderer, display transforms, color mapping, scenario menu, and display-only validation. The canonical Master Equation owns the inverse-square and transmitter-side factors used by the v1 diagnostic composition. [Potential](../app-potential/priorities.md) owns the reusable conversion from declared path data to a potential product. The scientific lane that supplies any later observable owns its meaning and authority. The EOM solver remains the sole forward-evolution owner.

No Topo image establishes a wake law, field-speed ceiling, front or trailing enhancement, dynamics, stability, conservation, or physical validation. Those features may be displayed only when supplied by a declared mathematical product with matching authority.
