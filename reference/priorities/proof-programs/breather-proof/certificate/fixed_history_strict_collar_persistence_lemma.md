# Fixed-History Strict-Collar Persistence Lemma

## Scope

This packet extracts a reusable mathematical lemma from the rejected fixed-cosine packet. It records why mesh-only refinement cannot consume positive-width parent-complement equality cores under the strict simple-root coverage rule.

Sources:

- `fixed_cosine_refinement_rescue_test.md`
- `fold_parent_w_positive_overlap_subdivision_attempt.md`
- `fold_parent_u_positive_overlap_subdivision_attempt.md`
- `fold_parent_regular_boundary_coverage_attempt.md`
- `content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md`
- `content/markdown/aaa/proof-programs/collinear-breather.md`

This packet does not edit live ledger artifacts and does not authorize branch-chart construction.

## Lemma

**Fixed-history strict-collar persistence lemma.** Fix a candidate history and a parent strip
$$
R\times S
$$
on which one null coordinate
$$
y\in\{u,w\}
$$
is monotone on both factors. Let
$$
Y_R^y=y(R),
\qquad
Y_S^y=y(S),
\qquad
O_{R,S}^{y}=Y_R^y\cap Y_S^y
$$
be a positive-width null-coordinate overlap after accepted simple-root and fold-layer rows have been removed. Under the strict simple-root acceptance rule
$$
\operatorname{dist}(Y_{\mathrm{receiver}}^y,\partial Y_{\mathrm{source}}^y)>0,
$$
no finite mesh refinement by inverse $y$-thresholds can consume the whole closed equality core using only strict simple-root rectangles.

Equivalently, any accepted interior simple-root rectangle leaves equality-boundary collars in the parent complement, while any rectangle expanded to include the whole closed equality core has zero source-coverage margin at at least one boundary.

## Proof Sketch

On a monotone regular branch, $y$ is a homeomorphism from the phase interval onto its value interval. The equality-bearing set in $R\times S$ is therefore controlled by the value overlap
$$
O_{R,S}^{y},
$$
not by the mesh. Refinement can subdivide the preimage of this same overlap, but it cannot change the overlap while the candidate history and interval endpoints remain fixed.

A strict simple-root subrow requires the receiver value interval to lie a positive distance inside the source value interval. Such a subrow can cover only interior value levels of
$$
O_{R,S}^{y}.
$$
If the subrow is shrunk inward, the deleted threshold collars remain in the parent complement and still carry equality. If it is expanded to the boundary of the equality core, the distance to $\partial Y_S^y$ becomes zero, violating the strict coverage rule. A finite collection of such subrows repeats the same obstruction at its outermost equality thresholds. Endpoint exclusion does not apply because the residual is a positive-width value overlap, not a finite endpoint-contact set.

## Consequence For The Rejected Cosine Packet

The fixed cosine packet's obstruction is not insufficient numerical resolution. It is an intrinsic fixed-history overlap invariant under monotone inverse-threshold refinement. Mesh refinement can expose cleaner interior simple-root diagnostics and empty wings, but it cannot certify the parent complements while positive-width equality collars remain and the strict simple-root contract is unchanged.

Thus the next mathematical move cannot be another fixed-history mesh refinement. It must be one of:

1. a new candidate history whose null-coordinate ranges acquire strict parent-complement gaps;
2. a constructive separation direction for a fresh collocation candidate;
3. a genuinely proved same-packet complement predicate such as a finite regular-boundary theorem with inclusion and domination;
4. or a separate strict-gap certificate for non-core endpoint-scale leftovers plus an accepted route for every positive-width equality core.

## Link To The Separation-Direction Lemma

This lemma supplies the negative half of the next-candidate strategy. The positive half is `null_coordinate_separation_direction_lemma.md`: once the fixed-history overlap is known to persist under mesh refinement, the solver should search for a perturbation direction that changes
$$
y_{\sigma}(\theta;X,T)=c_fT\theta+\sigma X(\theta)
$$
so that the residual collars acquire strict null-coordinate gaps.

## Promotion Decision

Promoted in narrow form through the fresh-candidate gap-opening paragraph in `content/markdown/aaa/proof-programs/closed-form-collinear-breather-ansatz.md`. The user-facing claim is local: refining the rejected cosine mesh cannot remove fixed-history equality collars, so the next packet must change the null-coordinate geometry itself.

It should not be promoted as a general no-go for all future candidates, and it should not be used to canonize regular-boundary coverage.
