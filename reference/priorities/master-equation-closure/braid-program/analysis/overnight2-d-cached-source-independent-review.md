# Independent review of whole-piece source caching

## Disposition and exact scope

**Derived and control-tested disposition:** the whole-positive-piece enclosure, its synchronous matrix-only integration and the exact-entry prefix composition are accepted as conditional validation components. No blocking mathematical or implementation defect was found in the frozen subjects. The cache replaces repeated trimmed-piece source boxes with valid, generally wider whole-piece boxes; it does not change the declared comparison path, root construction, delayed error equation or admission gates. This review establishes no original trajectory extension or performance improvement.

The Ramon E. Moore role supplied the lens. Independent enclosure derivation, exact rational cases and adversarial synthetic execution supplied evidence. The four subject SHA-256 identities, checked at opening and closure, are:

| Frozen subject | SHA-256 |
| --- | --- |
| [Piece-box helper](overnight2-d-piece-box-cache.py) | `d5fde114e7e8abe958d77fc21c5017679383115690e89af1a8b7323f9de927ba` |
| [Cached-source entry](overnight2-d-cached-source-admission.py) | `d99d413aafab880f35b19a7d6a5fb919c2e8df399579341ed3f524790f0fefe6` |
| [Cached-source prefix](overnight2-d-cached-source-prefix.py) | `283998cdf93422543b09ed24638c05e20748fcf793d66dc739e6f30fd522a5fb` |
| [Construction note](overnight2-d-cached-source-admission.md) | `9698737a88b1ad49c67e9208de4aac5f579ad14cf9d466919ea93711d880b2be` |

The reused dense-region source remains `4b366ac045bb8198c0bbeb41bc52faed9b664833a6e6926541065acd77f60fd6`; its interval primitive source remains `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`; the guarded global entry remains `68a98cd07f44806b05e5107abeb6dcb2d95786c38c250937905f1566a005c68f`; the delayed core remains `d0ecd08abb5e714a3c8611e10ffec79d7cb642401f68a0ae582f2d400e7ada7f`. No oracle or earlier source was edited.

## Independent enclosure derivation

Consider the cubic Hermite part $H(u)$ of a positive piece, with true width $h>0$ and $u\in[0,h]$. Its acceleration is affine, so each coordinate lies in the interval hull of the two exact endpoint accelerations. The evaluated endpoint boxes enclose those values even when $h$ itself is enclosed by an outward interval: treating repeated appearances of the same width independently enlarges the interval image rather than removing the true evaluation.

Let $A_c$ be the maximum absolute endpoint-hull value in coordinate $c$, and let $m=h/2$. Integration from $m$ gives

$$
|H'_c(u)-H'_c(m)|\le A_c h/2,
\qquad
|H_c(u)-H_c(m)|\le\bigl(|H'_c(m)|+A_c h/2\bigr)h/2.
$$

These are precisely the componentwise velocity and position radii in the helper. An interval midpoint value may overestimate the magnitude used in the radius; that is conservative. The position radius is deliberately not the sharper integrated quadratic bound. It is valid for the complete piece, which is all the consumer requires.

For the factored correction $b(q)R(q)$, where $b(q)=q^2(1-q)^2$ and $q=u/h$, write coefficient-vector norm bounds $R_0\ge\sup|R|$, $R_1\ge\sup|R'|$ and $R_2\ge\sup|R''|$. The elementary bounds $|b|\le1/16$, $|b'|\le1/2$, $|b''|\le2$ give

$$
\beta_x=R_0/16,\qquad
\beta_v=(R_0/2+R_1/16)/h,\qquad
\beta_a=(2R_0+R_1+R_2/16)/h^2.
$$

The reused implementation obtains each vector bound from sums of absolute encoded coefficients, a valid L1 upper bound on Euclidean magnitude. Each norm bound also bounds every coordinate. Adding its symmetric radius to the corresponding Hermite box therefore encloses the full corrected path, velocity and acceleration. Position additionally receives an enclosure of the exact cumulative initial-node-plus-increment sum. Later rounded absolute position nodes are not substituted for this sum.

All midpoint evaluations, width divisions, radius products and additions use the frozen outward primitives. Taking a maximum, minimum, absolute value or sign reversal of finite interval endpoints needs no additional floating addition. The IEEE binary64 assumptions are inherited from the primitive's declared contract. Zero acceleration is handled by componentwise magnitudes without square roots, avoiding the prior zero-norm availability issue. Widths whose outward interval contains zero, overflow or invalid finite intervals reject rather than certify a box. This review is for the declared binary64 reference arrays with valid exact-node enclosures, not a generic arbitrary-dtype interpolation API.

## Piece coverage and cache identity

For a positive query $[s_-,s_+]$, the lower search uses the knot immediately before a lower endpoint found with `side='left'`; the upper search includes the piece beginning at an upper knot. The subsequent closed-interval intersection test retains every intersected piece. Consequently a point at an ordinary knot includes both adjacent acceleration traces, a terminal endpoint includes its last available piece, and a wider interval returns the hull of all intersected complete pieces. Enlarging from a trimmed interval loses precision but remains valid. The positive cache rejects nonpositive, reversed, empty and beyond-end queries through its guards and interval constructors.

The composition deliberately routes every query with lower endpoint at or below zero to the original complete evaluator, retaining the negative rigid branch and original velocity traces. Thus the fingerprint rejection contract applies to cached positive queries; a nonpositive query is freshly evaluated by the original path rather than served from stale cached boxes. Any later positive query of a changed same data object still rejects.

The cache fingerprint covers time nodes, increments, velocities, correction coefficients, initial positions and both node-enclosure endpoints, with shapes and dtypes. Every positive query compares the current fingerprint and data-object identity. A different object builds a new cache; mutation of any of the bound mathematical inputs in the same object rejects. The helper relies on the caller's valid exact-node enclosure; a hash does not itself prove the cumulative sum. The unchanged core constructs that enclosure from the original initial node and increments and binds the reference and domain receipts before use.

## Integration, domain guard and prefix boundaries

The new matrix wrapper checks that the original source evaluator is installed, replaces it only during the synchronous frozen matrix call, and restores it in `finally`, including on exceptions. The main wrapper clears its cache and restores the evaluator on every exit. This is an in-process, nonreentrant composition; it is not a concurrency-safe general monkey-patching service. A foreign replacement is rejected before the matrix call. The Taylor candidate and point evaluations run outside that scope and retain their original source evaluator. Cached position boxes are genuine enclosures even though the present matrix call consumes velocity and acceleration only.

The old matrix code still constructs the root/source interval, intersects the geometric delay floor, forms the translated normal and evaluates the signed matrices using the complete source box. The wrapper only adds `source_box_method` metadata. Strictly positive final source intervals record `whole-positive-piece-cache`; intervals meeting zero record `original-complete-source`. The entry adds its own source, the helper and the reused dense-region source to the inherited binding chain. It retains the global domain snapshot and actual header/final serialization guard.

The prefix adapter accepts only the exact cached-source entry and requires the new entry/helper plus the inherited global, Taylor, screened, geometry and core source paths on the header actually consumed. It keeps terminal authentication before partial reads, exact ordered records, earlier-prefix preservation, source versus selected arguments, rational physical conversion, exclusive output and source-byte/lease closing checks. It adds its own identity without replacing earlier identities. As before, this structural extraction is not a complete mathematical dependency adjudication or proof of the partial's creator: a real application review must inspect the complete producer closure and independently associate the closed run with flushed source rows. Source-run costs are not attributed to an extracted prefix as if it had run separately.

## Independent known controls

All controls below used synthetic or analytically known inputs, with no original trajectory target or active partial read. The frozen producer's inherited controls were run as regression evidence; their agreement alone was not counted as an independent mathematical reference.

1. The independently authored helper/matrix script first checked exact polynomial convolution and the derivative of $q^5$. It then checked complete boxes for $x=t^2+3$ over unequal widths two and three, a degree-seven factored correction with independently evaluated rational derivatives, two quadratic acceleration traces 2 and 4 at one knot, a terminal endpoint, a query spanning pieces and a large exact initial-node offset with an increment smaller than one absolute-node ulp. Deliberately unrelated later cached `X` entries did not replace the mathematical increment sum.
2. Separate mutations of `T`, `DX`, `V`, `C`, `X[0]`, node lower endpoints and node upper endpoints all rejected through the fingerprint. The helper rejected a different data object paired with the old cache and invalid positive domains. The composition rebuilt for a fresh object and routed a zero-crossing interval through the original evaluator.
3. The actual frozen matrix consumer, through the cache wrapper, enclosed the independent static tensors $B=\operatorname{diag}(-1/4,1/8,1/8)$ and $C=\operatorname{diag}(1/4,0,0)$ for a positive-polarity channel of range two with stationary source. Metadata and restoration were checked. Injected matrix exceptions restored the original evaluator; a foreign evaluator was rejected; an injected main failure cleared the cache and restored the evaluator. All required entry/helper/domain bindings and the inherited JSON guard remained present.
4. A full synthetic prefix application preserved its prior record, selected two complete cells from a three-cell declared run, converted velocity $1/4$ to position one at weight $1/4$, retained source arguments, recorded null prefix resources and explicitly unestablished creator association. Wrong entries, noncanonical flags, every required cache/global/Taylor/geometry binding omission, duplicate output, consumed-header replacement and stable missing header bindings were rejected. A live lease was rejected before any partial read.
5. Independent actual-core-main synthetic controls invoked the new cache entry, while replacing scientific computations with fixed known values. Real file loading, dependency binding and header/final serialization remained active. Normal header/final bytes were unchanged by the JSON proxy; missing/duplicate/wrong domain identities and inactive context rejected. Replacement after initial domain binding but before capture rejected before a scientific cell or header write; corruption of the final domain identity rejected before final output. Standard JSON functions remained unchanged, and both cache and global context were cleared on exit.

The independent scripts are `.tmp/overnight2-d-review-cached-source/independent-controls.py`, `prefix-controls.py` and `domain-identity-controls.py`, retained by exclusive byte-verified copy under the runtime `independent-review-instruments/overnight2-d-review-cached-source/` owner. Their SHA-256 identities are respectively `3bfa10ac9ea017ee022401d6ebab4d50634c8d9950f27d4c030d78fb3907460a`, `1e0028e004ddd4a62a54fd65582de38ccefef59d40e3465394930659cdb3dbb0`, and `868faae09838d8acad5d2e1cd92eb0eb0a95ddb2a5830f23b98c2006cb226f58`. The retained control receipt is `9a3f00e47e973581e6fb726a282a7888eae5de2333ca64ef360943ba194d9394`. A known SHA256(abc) check preceded preservation, and original/copy bytes matched.

## Application boundary and falsifiers

The controls and derivation authorize consideration of a separately scoped pilot, not automatic selection for the continuation. Wider cached boxes can enlarge matrix norms, force more trial attempts or fail admission; rebuilding or hashing costs may offset saved polynomial work. Only a matched completed pilot can measure those effects. A real pilot requires its complete ordinary-root/source-history/residual/scalar/strict-trial and provenance audit, including the actual cached source intervals and both traces.

An exact polynomial value outside a cached box, an omitted intersected trace, acceptance of a changed consumed input in a positive cache query, a leaked evaluator replacement, missing execution identity, a mismatched activated domain or an unexplained producer association falsifies the corresponding component/application claim. No current fixed-weight or global-Taylor receipt was modified. The review wrote only this new companion and private controls/retained evidence; no science producer, oracle, previous review, active partial, Git state or shared research account was changed.
