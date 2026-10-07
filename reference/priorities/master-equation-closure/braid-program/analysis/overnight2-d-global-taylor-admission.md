# Reusing complete reference acceleration bounds in the Taylor enclosure

## Conditional construction

The accepted exact-increment reference-domain receipt already bounds the Euclidean norm of each member's acceleration on every positive reference cell, including both ordinary knot traces. The [domain instrument](overnight2-d-dense-region.py) adds the cubic Hermite endpoint acceleration bound to the complete polynomial-correction bound and takes the maximum over every cell. Its [independent mathematical audit](overnight2-d-prefront-admission-independent-review.md#1-exact-comparison-and-independent-reference-domain-audit) establishes that construction. These are reference-path bounds, not bounds on the unknown actual acceleration.

The [new admission composition](overnight2-d-global-taylor-admission.py) proposes reusing these eight bounds in the already reviewed [Taylor construction](overnight2-d-taylor-geometry.md). If a candidate source interval lies entirely in the positive certified reference domain, the source's velocity is absolutely continuous there and its acceleration norm is bounded by the corresponding complete value $M_j$. For any center $s_0$ in that interval,

$$
Q_j(s)=Q_j(s_0)+Q'_j(s_0)(s-s_0)+e_j(s),
\qquad |e_j(s)|\le\frac{M_j}{2}|s-s_0|^2.
$$

The existing interval point evaluation encloses $Q_j(s_0),Q'_j(s_0)$. The polynomial source displacement supplies the radius, and the same polynomial arithmetic encloses the squared causal gap and displacement. The only changed mathematical input is which valid acceleration upper bound supplies $M_j$. The downstream complete source velocity/acceleration matrix enclosure is still computed on its enlarged source interval; it is not replaced by the scalar bound.

Negative source intervals retain the previous local construction. An interval crossing the original velocity jump still rejects Taylor and passes to the existing screened fallback. A positive interval extending beyond the certified endpoint is rejected. The reference remains continuously differentiable across its positive knots, so acceleration trace jumps do not invalidate the integral Taylor remainder.

## Binding the consumed domain

The new entry snapshots the requested domain object, and it activates the complete bounds only when the core's first actual domain-binding call receives that exact object and the inherited dependency verifier passes. Control execution keeps that activation disabled. Eight finite nonnegative bounds, a finite positive endpoint and exact-increment semantics are required. The frozen core separately binds the reference bytes to that consumed domain, checks its endpoint against the loaded reference, and retains all original preparation, residual, initial, event, history and strict-trial checks. The new source is included in every binding closure.

The snapshot also retains the domain file's exact byte identity. A serialization guard on the private imported core checks the actual dependency objects passed for its input header and final receipt before delegating to unchanged JSON serialization. Exactly one domain dependency must have that snapshot identity, and activation must have succeeded. This rejects a domain replacement after activation but before the core captures dependency hashes. Replacements after that capture remain subject to the core's existing closing identity checks. The guard does not change data or serialized bytes; the original standard-library module and mathematical instruments are unchanged. The unrepaired source and note remain preserved before this pre-use provenance repair.

Every selected Taylor channel records whether its acceleration bound came from the complete positive reference or a local source interval. The values and remainder continue to use the original Taylor metadata fields. The screened selection and complete geometry contract are unchanged. Reusing a wider complete bound can worsen a particular enclosure; measured usefulness still requires a same-cell pilot and all downstream gates.

The [matching prefix adapter](overnight2-d-global-taylor-prefix.py) recognizes only this new executed entry. On the actual consumed header it requires that entry and its inherited screened Taylor composition in addition to the earlier Taylor/core/helper bindings. It retains the full closed-run, source-byte, lease-byte, canonical-command, whole-prefix and exclusive-output checks, and adds its own identity. Independent writer association remains required.

## Verification and limits

Known quadratic controls exercise the complete-bound remainder across a positive knot. Domain controls reject birth-crossing, beyond-endpoint, mismatched endpoint, missing-member and nonfinite-bound cases. The prefix adapter retains exact-entry and missing-source controls. The [initial component review](overnight2-d-global-taylor-independent-review.md), [separate identity-repair verification](overnight2-d-global-taylor-identity-repair-independent-review.md) and [same-cell actual-output review](overnight2-d-global-taylor-pilot-independent-review.md) accept the construction, repaired integration and original-cell pilot. The last review independently bounds every positive reference cell's acceleration and all 56 pilot Taylor remainders, with separate whole-cell gap checks on the deciding channels. No source or receipt of an earlier executed producer is changed.

The construction omits one whole-source-interval position/velocity/acceleration evaluation per positive Taylor attempt; the point evaluation and complete downstream matrix evaluation remain. The accepted same-cell pilot measured 19.775500874966383 seconds, compared with 27.23596499999985 seconds for the preceding screened Taylor pilot on the same incoming history. This is a single-cell observation, not a future cost guarantee. A bound not covering the complete candidate source interval, a mismatch between the consumed domain and activated bounds, an omitted executed source, or a failed remainder/root/trial inequality would invalidate the application. The pilot ends behind the separately accepted 482-cell history and supplies no later actual trajectory interval or tail entry.
