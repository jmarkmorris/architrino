# Octahedral Fold-Aware Cross-Binary I1 Local Zero-Isolation Burden Reduction

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition](octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.md). The previous packet composed endpoint signs, sampled root location, and bracket-local derivative negativity into a sampled/stencil zero-isolation mechanism for `I1.f1`. This packet extracts the resulting proof-burden reduction.

It is a local zero-isolation burden-reduction theorem. It is not a full directed-rounding interval derivative enclosure, not full `I1.f1` interval zero isolation, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Reduction Theorem

The older direct successor was phrased as

$$
\texttt{I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required}.
$$

That row is sufficient for `I1.f1` zero isolation, but it is stronger than the local zero theorem requires. The one-dimensional lemma is:

$$
f(a)>0>f(b),
\qquad
f'(\theta)<0\quad\text{for all }\theta\in[a,b]
\quad\Longrightarrow\quad
\exists!\,\theta_\ast\in(a,b)\text{ with }f(\theta_\ast)=0.
$$

The lemma uses derivative negativity only on the bracket, not on the whole enclosing regular cell. For the current row,

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556,
$$

so the direct theorem-grade successor for local `I1.f1` zero isolation is the bracket-local row

$$
\texttt{I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required}.
$$

The full-cell row remains open only for broader interval sign-topology use outside the local `I1.f1` zero theorem:

$$
\texttt{I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required}.
$$

## Domain Shrink

The compact regular `I1` derivative scan interval was

$$
[0.00001,\;0.997360655243],
$$

with length

$$
0.997350655243.
$$

The actual `I1.f1` bracket length is

$$
b_1-a_1
=
0.020778138651.
$$

Thus the direct derivative-enclosure domain needed for the local zero theorem is

$$
\frac{b_1-a_1}{0.997350655243}
\approx
0.0208333333334
=
\frac{1}{48}
$$

of the compact regular `I1` scan interval. Equivalently, the local proof burden is shrunk by a factor

$$
47.9999999998.
$$

The bracket-local composition already certifies, at sampled/stencil level,

$$
f_\times(a_1)>0>f_\times(b_1),
$$

with minimum endpoint signed clearance

$$
0.000471690862363,
$$

and worst local derivative upper barrier

$$
-0.0603824889362.
$$

The sampled root remains in

$$
0.129617801662
\le
\theta_{I1.f1}
\le
0.129631781031,
$$

with clearances

$$
\theta_{I1.f1}-a_1\ge0.004938969757,
\qquad
b_1-\theta_{I1.f1}\ge0.015825189525.
$$

All imported rows preserve six source roots and term root-count signature $(1,3,1,1)$.

## What This Adds

This packet changes the proof route. Before this reduction, the direct I1 successor could be read as requiring a directed-rounding derivative enclosure across the entire compact regular `I1` interval before any local zero-isolation progress counted. After the reduction, local `I1.f1` zero isolation has a smaller theorem-grade target: prove that the bracket-local derivative mesh allowance dominates true derivative variation on the bracket where the zero lives.

The sampled mixed-stencil successor [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md) advances that reduced target by checking the predecessor mesh allowance against $5\times5$ theta/speed stencil samples on each bracket mesh cell. It keeps the directed-rounding enclosure open, but it narrows the remaining burden to excluding unsampled derivative peaks large enough to consume the observed allowance slack.

The full-cell derivative row is not discarded. It remains an open global-sign-topology row if a later interval critical-exhaustion proof needs derivative control outside the `I1.f1` bracket. The point is narrower: it is not necessary for the direct local `I1.f1` zero-isolation theorem.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.mjs) emits:

- predecessor validation for the bracket-local zero-isolation mesh composition;
- the original full-cell successor row and the reduced bracket-local successor row;
- the compact regular `I1` scan interval, bracket interval, length ratio, and $48\times$ shrink factor;
- endpoint signed clearance, derivative-barrier clearance, root envelope, and root endpoint clearances;
- source-root preservation and term root-count signature checks;
- explicit non-interval, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.test.js) verifies schema validation, predecessor composition, speed-window removal, successor-row replacement, the $1/48$ bracket-domain ratio, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_local\_zero\_isolation\_burden\_reduction=true},
$$

$$
\texttt{replaces\_full\_cell\_derivative\_requirement\_for\_I1\_f1\_local\_zero\_isolation=true},
$$

$$
\texttt{shrinks\_direct\_I1\_f1\_zero\_isolation\_derivative\_domain\_to\_bracket=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_derivative\_negative\_full\_cell\_interval\_enclosure=false},
$$

$$
\texttt{certifies\_I1\_f1\_full\_interval\_zero\_isolation=false},
\qquad
\texttt{certifies\_I1\_zero\_isolation=false},
$$

$$
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{certifies\_interval\_quadrature\_enclosure=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-f1-local-zero-isolation-burden-reduction-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it replaces an overbroad direct local-zero successor with a bracket-local theorem-grade target and quantifies the domain shrink. The sampled mixed-stencil successor now narrows that target, but this packet should not be promoted into reader-facing AAA prose until the bracket-local directed-rounding derivative-variation enclosure is available, or until a retained branch certificate consumes this local reduction with the remaining global-sign-topology and finite-row obligations clearly stated.
