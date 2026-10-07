# Whole-piece source bounds for the delayed matrix calculation

## Construction and mathematical scope

The [complete-bound Taylor entry](overnight2-d-global-taylor-admission.md) retains a separate source velocity/acceleration enclosure inside every delayed matrix calculation. The frozen consumer reconstructs polynomial boxes on every intersected source piece. The [new cache helper](overnight2-d-piece-box-cache.py) instead computes conservative boxes for each complete positive reference piece once, then takes their hull on each query. Enlarging from a trimmed interval to the complete intersected piece can loosen the bound. It does not omit any part of the requested source interval.

The source remains the exact-increment Hermite reference plus its factored correction. On one piece of width $h$, use local time $u\in[0,h]$, exact increment $\Delta X$, endpoint velocities and an enclosing exact-node offset. The cubic Hermite acceleration is affine in $u$. Its componentwise hull of the two endpoint acceleration boxes therefore encloses every intermediate acceleration. Write that hull as $A$ and its componentwise absolute upper bound as $|A|_\square$. If $x_m,v_m$ enclose the Hermite position and velocity at $h/2$, then the complete-piece componentwise radii

$$
r_v=|A|_\square\frac h2,
\qquad
r_x=(|v_m|_\square+r_v)\frac h2
$$

enclose velocity about $v_m$ and position about $x_m$. All products, sums, endpoint evaluations, widths and offsets use the unchanged outward interval primitives. The width itself is the outward difference of exact encoded time nodes; treating it as an interval conservatively contains the actual positive width.

The [already reviewed correction bounds](overnight2-d-dense-region.py) supply nonnegative norm uppers $\beta_x,\beta_v,\beta_a$ for the full factored polynomial correction and its first two derivatives on the piece. Add the corresponding symmetric componentwise radius to each Hermite enclosure. A Euclidean or L1 norm bound is also an upper bound for each component. The resulting acceleration box is the Hermite endpoint hull enlarged by $\beta_a$; the position box includes the exact-node interval offset. No cached binary64 position after the initial node replaces the exact increment sum.

For a positive query interval, select every intersected piece using the same inclusive endpoint convention as the original source evaluator. A query exactly at an ordinary knot includes both adjacent acceleration traces. Return the componentwise hull of all selected whole-piece boxes and their complete piece-index inventory. Source intervals meeting zero retain the original complete source evaluator, including the negative rigid branch and both original velocity traces. Queries beyond the completed reference fail closed.

## Integration and binding

The [new composition](overnight2-d-cached-source-admission.py) installs the cache only during the frozen matrix consumer's synchronous call and restores the original source evaluator in a `finally` block. The Taylor point evaluation, candidate polynomial, causal displacement proof and source-before-cell construction keep their original evaluators. All returned cached position boxes are valid too, even though the current matrix consumer uses only the velocity and acceleration boxes. No placeholder value is substituted for a mathematical enclosure.

The cache is tied to the consumed data object and a SHA-256 fingerprint of every mathematical array it uses: time nodes, increments, velocities, corrections, initial positions and both exact-node enclosure endpoints, including shapes and dtypes. Each query verifies that fingerprint. A different data object starts a fresh cache; changed arrays of the same object are rejected. The cache adds no persistent science file and makes no mutation to the reference arrays. The executed helper, composition and reused domain source are appended to the inherited dependency closure. The complete-bound domain serialization guard and all original preparation, resumption, residual, event, source-history, strict-trial and resource checks remain in force.

The metadata records `whole-positive-piece-cache` only when the final source interval is strictly positive; a source interval meeting zero records `original-complete-source`. The [matching prefix adapter](overnight2-d-cached-source-prefix.py) recognizes the exact new entry, requires the new helper in the consumed header and preserves inherited global/Taylor/core bindings, closed-run authentication, exact source-byte and ordered-prefix checks, exclusive output and its own source identity. Independent writer association remains a separate output-review obligation.

## Known controls and proposed use

Before target use, inherited admission controls and new exact controls passed a piecewise quadratic with different acceleration traces at its knot, whole-piece position/velocity/acceleration containment at rational points, the factored correction $u^2(1-u)^2$, and rejection after mutation of a consumed velocity array. Prefix known controls also passed. The helper uses componentwise absolute acceleration bounds, so a stationary component requires no square root of an outward subnormal interval.

These are component controls, not an original application or an independent proof of every cached target box. Independent review must reconstruct the enclosure argument and exercise the integration, trace, mutation, source-binding and selector boundaries before a pilot. A measured same-cell pilot with the same incoming history is required before selecting this method for continuation. Fewer source evaluations alone do not establish lower cost or better error bounds. The current active global-Taylor calculation uses none of these new files.

An omitted piece or trace, invalid Hermite/correction enclosure, changed consumed array accepted by the cache, leaked source-evaluator replacement, missing executed dependency or failed strict trajectory trial would invalidate the corresponding application. No new actual history or tail entry follows from this proposal.
