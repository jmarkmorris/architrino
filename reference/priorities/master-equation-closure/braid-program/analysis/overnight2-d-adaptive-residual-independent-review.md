# Independent review of adaptive reference residual aggregation

## Disposition and scope

**Derived disposition:** the frozen [adaptive residual application](overnight2-d-adaptive-residual.py) correctly composes the reviewed polynomial and direct interval enclosures into complete reception partitions and outward residual-integral bounds for the declared comparison reference. The two completed pilots support the three reference-residual claims listed below. No invalidating mathematical or implementation defect was found in these retained applications. They do not establish actual trajectory membership, error propagation across a front, physical escape or tail admission.

**Measured receipt audit:** exact-rational aggregation of the recorded segment bounds, complete member/channel inventories and hash checks give:

| Pilot | Cell and receiver | Exact encoded reception interval | Residual norm integral upper bound |
| --- | --- | --- | --- |
| `adaptive-residual-rational-pilot.json` | 0, 0 | `[0.0, 0.1]` | `9.579683789752353e-14` |
| `adaptive-residual-first-front.json` | 43, 2 | `[4.300000000000001, 4.352040508477276]` | `4.3141409287635535e-14` |
| `adaptive-residual-first-front.json` | 44, 2 | `[4.352040508477276, 4.352068986689783]` | `6.209907178060504e-15` |

These are enclosures of the exact declared reference residual, not measured true residual integrals. The first pilot uses one polynomial segment; the front pilot uses two polynomial segments and two narrow direct segments. Every segment contains all seven ordered signed partner channels for its receiver. The two direct segments explicitly include both negative and positive source-4 traces at the first reference source-zero reception.

One reproducibility limitation remains: the completed JSON records do not store `integral_goal` or `depth`. Those parameters affect subdivision, so exact replay settings must be retained in the existing launch evidence or parent account. The explicit segment partition and its outward integral remain mathematically checkable without these heuristic settings. The missing fields do not invalidate the stated enclosure, but the receipt alone is not a complete record of every launch parameter.

The live Ramon E. Moore role and Specialist charter supplied the review lens. The [component derivation](overnight2-d-front-and-delayed-independent-review.md) and independent analytic checks below supply the mathematical evidence. The broader first-80-cell target was neither inspected nor awaited; this review makes no claim about it. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md).

## 1. Declared reference, preparation and source evaluation

The application binds `mesh-reference-t67.npz` to its domain receipt and metadata, checks the original literal balance 1 and seed 1, validates all unit signs and selected cell/member indices, and reconstructs positions as exact cumulative encoded increments. The mathematical path is the initial encoded node plus these exact increments and the local factored polynomial; floating cached positions serve numerical proposals only. A direct input audit confirmed finite increasing times starting at zero, finite arrays with the required shapes, and initial position and velocity equal to the original stored preparation. This binds the prior initialization convention without claiming that the mesh reference inherits a prior reference's trajectory-error certificate.

The unchanged, previously independently examined domain instrument certifies this mesh reference. Its receipt has seven matching dependencies and gives common speed upper bound `0.724250801106246` and simultaneous separation lower bound `3.523614453346462`. These are bounds on this comparison and its negative continuation, not on an unknown exact trajectory. The domain code's exact-node reconstruction, whole-cell speed/separation bounds and acceleration bounds are the same mathematical construction reviewed in the prefront work; this audit additionally checks the new mesh identity and input shape/initial-node binding.

For an entirely negative candidate source interval, the application uses its own `source` wrapper. Both the polynomial sine/cosine center and the constant birth-phase subtraction call the rational interval trigonometric evaluator. Conversion between independently imported interval classes uses endpoint arrays explicitly. Thus the joined source position is the encoded birth node plus the exact rigid displacement from birth, while velocity is the exact derivative of that rigid history. It does not replace the whole center interval by a midpoint approximation.

For a positive interval, `source` calls the reviewed ordinary-piece enclosure. That method encloses position and velocity values independently by comparing one polynomial extension with every intersected actual piece. It does not differentiate a uniform position remainder to infer velocity. An interval crossing source zero is rejected from this smooth route and must subdivide or use a direct row. In either route, source arguments beyond the completed comparison fail closed.

## 2. Complete signed row enclosures

For the polynomial route, every $j\ne i$ contributes its signed numerator $R_j$ and denominator $D_j=\tau_j^2(\tau_j-R_j^{\rm geom}\cdot V_j)$. Here the sign is included in the stored numerator, while the geometric displacement in the denominator is unsigned. With positive denominator lower bounds $d_j$, the common-denominator numerator for receiver acceleration $a_i$ is

$$
N=a_i\prod_jD_j-\sum_jR_j\prod_{\ell\ne j}D_\ell.
$$

The coordinate absolute-sum norm of its polynomial enclosure, divided by $\prod_jd_j$, bounds the candidate residual. The code constructs this complete signed expression before taking norms. It then adds every reviewed candidate-to-root bridge allowance. Because the bridge guard excludes source zero and its acceleration bound covers ordinary knots, the original jump is never treated as a smooth derivative in this route. Candidate root samples only propose delay polynomials; interval gap and factor checks determine validity.

For the direct route, receiver acceleration is enclosed throughout the subinterval. Each of all seven signed true-root rows is computed using the front helper, converted by interval endpoints and subtracted from that acceleration box. The coordinate absolute sum bounds the full residual norm. This route can include the source-zero velocity jump and ordinary piece boundaries because it encloses all relevant values and both traces rather than differentiating across them. Numerical midpoint roots are proposals only. Both routes use the same declared reference position, derivative, signs and original negative history.

A separate eight-member static control checks the actual complete row consumers, not merely individual channels: member $j$ is at position $(j,0,0)$, receiver zero is at the origin, all velocities and accelerations vanish, and signs alternate. The exact residual density is

$$
\left|\sum_{j=1}^7\frac{(-1)^j}{j^2}\right|=0.8312414965986394\ldots.
$$

Both `polynomial_row` and `direct_row` enclosed this exact rational sum and included partners one through seven exactly once. This independently checks signs, complete inventory and the location of the final norm.

## 3. Partition selection, subdivision and fallback

The reception cell endpoints and every interior front-bracket endpoint for that receiver form a sorted unique set of cuts. Consequently each initial open subinterval is either inside or outside each bracket; overlapping brackets do not leave an uncovered transition. The reversed initial stack, together with right-then-left child insertion, processes all leaves in increasing reception order. Each split reuses the same encoded midpoint as both child endpoints. Zero-width children are avoided by stopping subdivision when the midpoint equals an endpoint.

Inside any applicable bracket, the code encloses the complete row directly. Elsewhere it attempts the polynomial route. A domain or assertion failure causes subdivision until the allowed depth or floating endpoint resolution is exhausted; then the entire row is enclosed directly. A failed direct enclosure is not converted into a successful result. The `integral_goal` comparison is a refinement heuristic: reaching maximum depth can retain a valid bound larger than that goal. The result therefore certifies its reported integral, not a guarantee that every segment or cell met the requested heuristic goal.

`integrate_partition` requires a nonempty partition with exact outer endpoints, positive segment widths, exact adjacency and finite nonnegative residual bounds. Given those conditions,

$$
\int_a^b\|r_i(t)\|\,dt\le\sum_\ell(b_\ell-a_\ell)\rho_\ell.
$$

Each width subtraction, product and sum is outward interval arithmetic. Its returned upper endpoint is the integral allowance, not a point estimate or a two-sided integral range. The maximum reported residual is separately checked against all segment densities. Ordinary shared endpoints may belong to both closed enclosures without double-counting positive measure.

The code captures dependency identities before constructing the result, appends completed rows to local partial evidence and verifies all identities again before writing the completed JSON. An interrupted partial record is not a completed certificate. Target admission code must still verify its requested complete member/cell inventory, not infer all-member coverage from a single successful pilot.

## 4. Independent controls and receipt validation

The normal shared-venv `overnight2-d-adaptive-residual.py controls` command exited zero. It exercised the actual partition integral $7/2$, missing/duplicate/order rejection, rational center callback, ordinary-piece enclosures and guarded front helper controls. No scientific target was replayed.

Independent inline controls additionally exercised the following actual functions:

- The complete static signed-row calculation described above, through both polynomial and direct routes.
- `receiver_row` on that analytically known constant residual with synthetic bracket cuts and a depth-one refinement limit. Its five returned leaves preserve order and coverage, with the bracket leaf using the actual direct row.
- A controlled polynomial-unavailable exception, substituted only in the in-memory test module, to exercise actual subdivision and direct fallback. Both returned leaves used the true direct enclosure and integrated the known density conservatively. No source file was changed.
- An unequal three-piece partition whose exact integral is $13/4$, plus missing, reordered, duplicate, gapped, negative-density and NaN-density cases; all six invalid partitions were rejected.
- The actual negative-source wrapper against separately formed exact-rational sine/cosine series for radius two, angular rate $1/4$, a translated birth node and three negative-time arguments, checking both position and velocity.

Two first versions of review harnesses failed and were corrected before any control was counted as passed. The static history stub returned two values, whereas the candidate evaluator's contract requires position, velocity and acceleration; adding its exact zero acceleration corrected the stub. The rigid-source comparison initially added a trigonometric remainder to an exactly zero coordinate; using zero remainder for exact constant coordinates corrected that excessive test demand. Neither failure identified a subject defect. All stated controls subsequently ran and passed.

Before the receipt audit, the independent hash checker passed the known SHA-256 of `abc`, and exact rational aggregation reproduced a known $7/2$ partition. The pilot audit then verified:

- All 26 dependency identities in each pilot, using exactly one preserved helper substitution per receipt as described below.
- Every requested `(cell, receiver)` exactly once, exact encoded row endpoints, complete seven-channel inventory per segment, positive polynomial denominator and bridge floors, and ordered positive direct delay intervals.
- Exact adjacency and positive widths for every segment, inclusion of each direct-bracket segment in its recorded reception bracket, and exact-rational sums of encoded widths times densities no larger than the recorded outward integral.
- Both original source traces for source four in each of the two direct front pieces: their source intervals contain zero and their piece inventories contain `negative` and positive piece zero.
- Equality of the completed JSON rows and dependency/bracket records with their retained `.partial.jsonl` evidence. This equality is provenance continuity, not an independent mathematical enclosure proof.

The first pilot comprises one segment and seven channel records. The front pilot comprises four segments and 28 channel records. Its certified source-zero bracket for receiver two/source four is `[4.352040508377259, 4.352040508577293]`, split by the reference cell endpoint `4.352040508477276`. Thus the two narrow direct pieces cover the whole bracket without a gap, while the outer pieces use the polynomial route. Their larger residual densities, about $1.136\times10^{-6}$, contribute only through their small certified widths. No sampled residual density is promoted to a whole-interval bound.

## 5. Preserved helper and exact identities

The completed pilots used the reviewed pre-speed-guard front helper. Its source was retained at `.local-data/master-equation-closure/overnight2-d/front-enclosure-before-speed-guard.py`. A direct diff shows that the current helper adds only the explicit $0\le L<1$ check and invalid-speed controls. The audited pilot domain has valid $L$; the older helper identity therefore remains the correct producer identity. Substituting its preserved bytes during the hash audit resolves provenance without rewriting either receipt or claiming the current helper produced it.

| Artifact | SHA-256 |
| --- | --- |
| Adaptive residual application | `3676397915b444f2d6dd317610a50349b281723c2f340dfcd2cf576acb116e1b` |
| Current guarded front helper | `4763d2e72f988f31d8452d6fcb0c514b6bd0913b577e9fa73636c270e556bdb8` |
| Preserved pilot front helper | `8cc8ad41e363e6dd357a2d3d972600f4468cfdfacb5a791a8fa6a285a8088a5b` |
| Rational pilot receipt | `481f41c313c3bf92359f51e666154e0cef730812175bf022d60674a8d4c76378` |
| First-front pilot receipt | `ac40a52c3a4bf61df41862a42965fa5ebd8082fd071e8a22a8be2620880017b3` |
| Polynomial arithmetic | `3b2fd494e336027b75a91b99d05dda1ab35f1537df28a70c277b8362bbb7c6c8` |
| Ordinary source-piece enclosure | `11144e93e728e903494e623629909f9abc3b129e64bb9c227e3a13d3e259d7f2` |
| Polynomial residual checker | `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554` |
| Rational initializer | `4cea0ac572420687f0445508759403e4c2da8ef13f2bfe8e9c97c72438db2915` |
| Mesh reference NPZ | `b2f9aabf6f3dbf4ac49336e55b34b3ff89e00d005444d37ca62e19e2dd07148c` |
| Mesh reference metadata | `1c7fae9113616f0de8b2dc004b0a98dd117a9eec25d53516066ae13f3de31986` |
| Mesh domain receipt | `dd2e452fb1e145a95090ce17849cbd41555ca4c611a85fb125e1ef85bc5c2825` |

All evidence remains under its existing local runtime owner. This review wrote only its new companion, preserving the subject, dependencies, source snapshot, earlier reviews, completed pilot JSONs and partial evidence. It did not inspect the running broader target, create agents, send sidebar messages or mutate Git. The parent's already revised delayed-admission note is separate from this residual-only application and is not a claim that these pilot bounds have propagated an actual error.

The result is falsified by an uncovered interval or source piece, an omitted signed partner, an inward row or integral bound, an invalid candidate bridge, missing source-zero trace, or reference/preparation identity mismatch. Exact launch settings must be retained for reproducibility, and any broader receipt needs its own complete inventory and aggregation check. These reviewed pilot integrals alone do not extend the accepted prefront trajectory or establish a delayed-history certificate.

Closing validation reproduced the application, current guarded helper, preserved pilot helper and both completed pilot identities unchanged. All 26 dependencies per receipt were rechecked, with the same explicit preserved-helper substitution. All three distinct relative-link destinations exist by explicit filesystem checks. Scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics; its difference exit status is expected for a new file. This bounded code-and-pilot review is complete; parent integration and exact launch-setting capture remain separate receiving obligations.
