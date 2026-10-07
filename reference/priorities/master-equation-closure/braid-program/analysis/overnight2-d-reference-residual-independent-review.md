# Independent review of the reference residual checker

## Disposition

**Derived disposition:** the [frozen checker](overnight2-d-reference-residual-check.py) correctly applies the [polynomial residual theorem](overnight2-d-polynomial-residual.md), with the [reviewed domain corrections](overnight2-d-polynomial-residual-independent-review.md), to its declared increment-defined reference when its imported domain receipt belongs to that same complete reference. Its cell expansion, separate derivatives, analytic negative history, delay correction, off-root denominator margin and common-denominator residual calculation are sound under the frozen interval arithmetic contract.

**Measured pilot scope:** the retained receipt reports an outward residual upper bound of `1.8780782657850495e-12` for receiver zero on cell zero, with encoded endpoints `[0.0, 0.2]`, and includes all seven partner channels. The code and provenance audit found no defect invalidating that bounded result. This is acceptance of its conditional reference-residual meaning, not an independent target rerun, a full-prefix residual certificate or actual-history admission. No target or heavy computation ran in this review.

**Required reuse guards:** the program must bind all mathematical premises of the domain receipt, especially negative-history preparation and balance selection, rather than checking only the reference NPZ hash. It also needs explicit valid cell/receiver selection and unit signed partner-weight checks. The retained pilot satisfies these conditions on the inspected evidence, but the current generic entrypoint does not enforce all of them. The parent's research account owns integration and repairs; only this companion was authored.

## 1. Exact nodes, cell polynomials and derivatives

The reference nodes are the exact rational sums of encoded initial coordinates and encoded `DX` increments. `region.exact_nodes` accumulates `Fraction.from_float` values and brackets each exact sum with adjacent binary64 endpoints. The checker converts those endpoint arrays into its own imported interval class. Cached absolute `X[k]` values after the initial node do not define the mathematical positions used in the certificate.

For local normalized time $u=(t-T_k)/h$, write the cell displacement as

$$
H(u)+u^2(1-u)^2(R_0+R_1u+R_2u^2+R_3u^3),
$$

where $H(u)=hv_0u+bu^2+cu^3$, $b=3\Delta x-h(2v_0+v_1)$, and $c=-2\Delta x+h(v_0+v_1)$. Independent multiplication of the factored correction gives degrees two through seven

$$
R_0,\quad R_1-2R_0,\quad R_2-2R_1+R_0,\quad
R_3-2R_2+R_1,\quad R_2-2R_3,\quad R_3.
$$

These are the implemented coefficients, with the cubic contributions added at degrees two and three. The constant coefficient is the enclosed exact accumulated node. Velocity and acceleration coefficients are formed independently from these exact polynomial coefficients by $k/h$ and $k(k-1)/h^2$, before composition and truncation. The code therefore does not differentiate a mere uniform value remainder.

The reception parameterization uses outward midpoint and half-width intervals. Although these intervals include nearby surrogate affine maps, they contain the exact map from $[-1,1]$ onto the encoded cell. Such extra dependence widens the enclosure without removing any actual cell point. The numerical midpoint and half-width used only to propose a delay polynomial need not equal this exact map: the later gap enclosure certifies the proposed polynomial on the actual reception chart.

At ordinary receiver endpoints, acceleration is the selected cell's one-sided value. Adjacent cells may have different acceleration traces. The bound is therefore a one-sided cell bound, or an almost-everywhere residual bound for integration, without asserting a unique classical acceleration at every knot.

## 2. Negative history and positive source pieces

For negative source time, the checker declares

$$
\mathbf Q_j(s)=\mathbf X_j(0)+r_j
\bigl(\cos(\phi_j+\omega s)-\cos\phi_j,
\sin(\phi_j+\omega s)-\sin\phi_j,0\bigr).
$$

Its velocity is the derivative of that same analytic path. Outward trigonometric compositions and center enclosures account for evaluation and Taylor remainders. The mathematical position joins exactly at the encoded initial node; independently enclosed sine/cosine evaluations can widen the interval but do not redefine the join. The code does not import the producer's rounded `H.shift` as an exact translation. This remains a comparison past, linked to the original physical preparation through the separate initialization obligation.

`source_polys` accepts a strictly negative candidate source interval, or a strictly positive interval wholly contained in one stored polynomial cell. It rejects intervals touching or crossing zero and rejects ordinary candidate-piece crossings. These conservative failures are unresolved certification cells, not root exclusions. Midpoint-only piece assignment is not used. For a valid cell, coefficient composition encloses the entire candidate source map even when that map is not monotone.

The candidate-to-root bridge can cross ordinary interpolation knots: the positive reference has continuous velocity and a global piecewise acceleration bound, so piecewise derivative integration is legitimate there. The bridge may not cross the source-zero velocity jump. The explicit source-zero bridge guard checks both sides using the entire candidate source interval enlarged by the delay-error bound.

## 3. Candidate root and off-root correction

Let $a_c$ be the candidate-delay lower bound, $\varepsilon$ the upper bound on its squared-gap defect, and $L<1$ the complete-reference speed bound. The checker uses

$$
\delta=\frac{\varepsilon}{a_c(1-L)}.
$$

This is the theorem's safe specialization with candidate-range lower bound zero. It is less sharp than including a positive range bound, but valid. Positive present separation from the matched domain receipt supplies the missing positive-root existence premise. Complete negative history, continuity of position, and the speed bound give uniqueness by strong monotonicity of the causal gap.

For the bridge, the implemented estimates are

$$
a=a_c-\delta>0,\qquad
R_*\ge \sup|\widehat{\mathbf R}|+L\delta,
$$

$$
\inf_{\text{bridge}}w\ge w_*:=\inf\widehat w-(1+L^2+R_*M)\delta>0.
$$

Here $R_*$ denotes an upper bound and $w_*$ a lower bound, with outward evaluation when computing their numerical values. The latter estimate follows from $w'=1-|\mathbf V|^2+\mathbf R\cdot\mathbf A$ and does not assume positive $w$ before proving it. The `K` expression then matches the reviewed derivative bound. Each arithmetic operation used for these magnitudes and positive margins is enclosed by intervals. The strict sign checks on the source-zero bridge remain conservative under the declared rounding contract: a rounded sum or difference with positive exact sign cannot acquire a strictly negative sign, nor vice versa.

The global acceleration bound is the maximum of the positive-cell domain bounds and the analytic negative bound $|r_j|\omega^2$. Ordinary acceleration jumps do not require extra terms because velocity remains continuous there. A bridge crossing zero is rejected, so there is no silently omitted velocity-jump term. Since both endpoint delays are positive, every point of the actual bridge has source time less than reception time and therefore lies within the reference's complete past-through-reception domain.

For the inspected preparation, a separate outward calculation gave negative speed upper `0.7208973968071553`, below the receipt's complete-reference speed upper `0.727566639300045`, and negative acceleration upper `0.06631002246896554`. The literal polarities were `[1,1,1,1,-1,-1,-1,-1]`. Thus the unweighted sum of `K*delta` terms is appropriate for this pilot's unit-magnitude weights.

## 4. Common numerator and independence boundary

The checker forms every denominator polynomial and its positive uniform lower bound, then forms the product numerator before taking magnitudes. Each partner vector receives its signed polarity product exactly once. The final coordinate absolute-value sum is an upper bound on the Euclidean norm, so using it avoids problematic near-zero square roots without weakening validity. Polynomial truncation and analytic-history remainder contributions remain included throughout all products and subtractions.

The imported producer supplies numerical source-root samples only to propose delay coefficients. The accepted row uses the independently reconstructed reference polynomials and outward gap check. Producer root error, use of a rounded position cache or a poor polynomial fit can make the candidate fail, but none is silently assumed exact in the accepted residual calculation. This is a meaningful algebraic independence boundary; the checker still relies on the separately supplied domain certificate and frozen interval primitives.

The one-cell result does not include source-front slabs elsewhere, every receiver, or the remaining reception cells. No extrapolation from its small value to a whole-prefix residual or error trajectory is justified.

## 5. Domain and receipt binding findings

The entrypoint checks terminal time, `increment_defined`, positive separation, $L<1$, and a domain dependency entry matching the reference NPZ. This binds the positive polynomial data and associated shape/order checks made by the domain producer. It does not verify the other domain dependencies or enforce the same negative-history preparation selection. The domain producer uses literal `balances[1]`, while the residual checker loads a balance through external preparation metadata. Reusing a domain receipt with a different selected negative past can therefore invalidate $L$ even though the NPZ hash matches. Receipt fields and dependency paths must also be interpreted as the certificate's stated contract, not accepted merely because a JSON file contains positive numbers.

The safe repair is to validate the domain's relevant identities and selected preparation/balance, or independently re-establish the global negative speed bound and bind the remaining positive-domain premises. Require the expected array shapes, finite values, increasing times, nonnegative in-range starting cell, valid distinct receiver indices, supported candidate degree and unit-magnitude polarities. The last condition is mathematically necessary because the correction budget currently assumes $|\sigma_{ij}|=1$; other weights would require scaling that budget. Negative starting indices in Python address cells from the end and can construct an interval whose endpoints run backwards, so CLI input validation is substantive.

For the actual retained pilot, an independent dependency audit after a known match/mismatch control found all seven domain dependency hashes matched current files. The pilot matched 16 of its 17 dependency hashes; the sole mismatch was the subsequently guarded polynomial module. Its recorded old identity exactly matches the preserved `polynomial-enclosure-before-guards.py`. The preparation metadata selects balance one, matching the domain producer. The inspected NPZ has `T` shape `(387,)`, `X,V` shapes `(387,8,3)`, `C` shape `(386,4,8,3)` and `DX` shape `(386,8,3)`, with finite increasing times beginning at zero. These observations support the recorded pilot's specific reference binding; they do not repair the generic entrypoint.

The checker hashes dependencies when writing the receipt. A reusable certification procedure must keep loaded inputs frozen, or record startup identities and confirm them at completion, so that a concurrent edit cannot make the receipt name bytes different from those loaded. The sources were frozen for this review; no such mutation was observed.

## 6. Guard repair and independent controls

The current polynomial module replaces the previously identified exponent, shape, error and chart assertions with explicit exceptions. Eight invalid-input controls passed under `python -O`: negative, fractional and Boolean exponents; wrong coefficient shape; negative error radius; an outside-chart point; an outside-chart interval; and polynomial division. The residual entrypoint itself rejected optimized execution before controls or target loading. No assertion-based numerical control run under optimized execution is counted as evidence.

The normal shared-venv command `overnight2-d-reference-residual-check.py controls`, with one-thread BLAS environment variables and bytecode output disabled, returned exit zero. It passed the imported arithmetic controls and the subject's exact fifth-power and stationary-row controls. Additional inline known controls used exact `Fraction` arithmetic and a separately checked containment predicate:

- A second cell of width three, with initial coordinate $2^{30}$, an earlier increment $2^{-24}$ and current increment $2^{-23}$, was evaluated against independently differentiated factored Hermite-plus-bubble expressions at five points. Position, velocity and acceleration were enclosed, including the small exact accumulated-node increment absent from a rounded large-coordinate cache.
- For the affine source $Q(s)=s/2$, receiver position two at reception zero, candidate delay $15/4$ and exact delay four, the actual row correction is $992/6525-1/8$. The checker enclosed it. It reported gap upper `0.9531250000000233`, delay-error upper `0.5083333333333462`, denominator lower `25.488281249999954` and bridge-factor lower `1.1770833333333146`.
- An analytic negative circular source with radius two, angular rate $1/4$, phase zero and joined birth point $(3,4,5)$ was checked against exact rational trigonometric series and their order-100 remainder, at three points of source time $-2+q/4$. Both position and velocity enclosures passed.
- Candidate intervals crossing source zero or an ordinary polynomial join, and an error bridge crossing source zero, were rejected as intended.

The first additional cell-control attempt passed an interval object from the separately loaded region module directly into the checker's polynomial algebra and failed with a type-conversion error before evaluating the case. The corrected control used the same explicit endpoint-array conversion as the real checker and passed. This was a review-harness mistake, not a defect in the target path, and no target ran before or after it.

## 7. Identities, preservation and falsifiers

Direct SHA-256 reads and the controlled dependency audit established:

| Artifact | SHA-256 |
| --- | --- |
| Reviewed residual checker | `2e359eb860eabb81ccf796d965b3bac50bc23312aca88c4df1c6a3f601e780c9` |
| Current guarded polynomial module | `308510f8faef225562e7a0baa05f3149317ffe4a36fa30975d3c7314c14b0b1c` |
| Preserved pre-guard polynomial module used by pilot | `16a2312c80af64c785c39d07781b843ae1a5a5f6cfac4af70a763720f78abbec` |
| Pilot JSON | `c85d17a2a5c46d717f0bd3c0a4135b96f7323289d5f860a4fe71f3b9995ab8f7` |
| Domain JSON | `c1c90b07f3232027529a17b8aec7753a7528dc5c9ab5d68a8e013400dee6fdd1` |
| Reference NPZ | `a3c2962f3494c1a9cae8ff440dc8a32bffa985dd684fd5acd5deffb38cb5a52e` |
| Domain instrument | `4b366ac045bb8198c0bbeb41bc52faed9b664833a6e6926541065acd77f60fd6` |
| Kick arithmetic dependency | `ea6b4781df9db8bf71c508fedd8dfe02c7867ab1fdf51f5498d5cbdbbe12fafa` |
| Frozen interval primitive | `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff` |

The complete pilot dependency list remains in the unchanged JSON receipt. Its original arithmetic identity is preserved rather than relabeled as the repaired source. Inline controls wrote no evidence or source files; their exact analytic cases and measured outcomes are retained here. This review does not edit any subject, oracle, source data or previous review.

The closing `shasum -a 256` read reproduced the residual checker, guarded arithmetic module, archived arithmetic module and pilot JSON identities unchanged. Explicit `test -f` checks passed for the three distinct relative-link destinations in this companion; none uses a fragment. Scoped `git diff --no-index --check /dev/null` on the new companion emitted no whitespace diagnostics; its difference exit status is expected for a new file.

The mathematical application is falsified by an exact coefficient/derivative mismatch, an unenclosed analytic negative-history value, an omitted source piece or jump, an actual row error exceeding the admitted $K\delta$ bound, or a common numerator identity failure. Its receipt binding fails if the complete history differs from that certified by the imported speed/separation/acceleration bounds. The numerical enclosure is falsified by an independent exact control outside its claimed interval. Incomplete coverage and failure to prove actual trajectory membership remain open obligations, not counterexamples to the accepted local reference-residual bound.
