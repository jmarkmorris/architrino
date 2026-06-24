# Octahedral Fold-Aware Cross-Binary I1 Bracket-Local Zero-Isolation Mesh Composition

Promotion status: `priority-only`.

This packet composes [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure](octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md), [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md), and [octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier](octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md). The endpoint packet gives the signs at the two bracket endpoints, the zero scan locates the sampled branch, and the mesh-barrier packet supplies bracket-local negative-derivative control under the sampled/stencil contract.

It is a bracket-local sampled/stencil zero-isolation composition. It is not a full directed-rounding interval derivative enclosure on `I1.derivative-negative.full-cell`, not a full `I1.f1` interval zero-isolation theorem, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Composition

The bracket is

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556,
$$

and the speed-ratio enclosure remains

$$
3.02156\le v_\ast\le3.02157.
$$

The endpoint forcing envelopes are sign-definite:

| Endpoint | Forcing envelope | Sign |
| --- | ---: | ---: |
| `I1.f1.left` | $[0.000471690862363,\;0.000472960105266]$ | $+$ |
| `I1.f1.right` | $[-0.0011858057038,\;-0.00118456783555]$ | $-$ |

Thus the sampled/stencil contract has endpoint existence:

$$
f_\times(a_1)>0>f_\times(b_1).
$$

The bracket derivative mesh barrier partitions

$$
[a_1,b_1]\times[3.02156,3.02157]
$$

into $16\times8$ cells. Every mesh row preserves six source roots and term root-count signature $(1,3,1,1)$. The worst local derivative upper barrier is

$$
\max_B\left(f'_\times(\theta_B;v_B)+\Delta_B^{\mathrm{st}}\right)
\approx
-0.0603824889362,
$$

with signed clearance

$$
0.0603824889362.
$$

Under that bracket-local mesh contract, the forcing is monotone decreasing in $\theta$ on the checked bracket cells, so the endpoint signs give existence and the derivative barrier gives at-most-one bracket zero. The sampled branch from the zero-isolation scan locates the crossing in

$$
0.129617801662
\le
\theta_{I1.f1}
\le
0.129631781031,
$$

with root clearances

$$
\theta_{I1.f1}-a_1\ge0.004938969757,
\qquad
b_1-\theta_{I1.f1}\ge0.015825189525.
$$

Thus the packet records the bracket-local sampled/stencil composition:

$$
\boxed{
\texttt{I1.f1.bracket-local-zero-isolation-mesh-composition}.
}
$$

## What This Adds

The previous zero-isolation packet tracked sampled roots, and the previous derivative packet proved a bracket-local derivative mesh barrier. This packet consumes both: the sampled roots are no longer merely located by bisection, but are tied to a bracket-level monotonicity mechanism under the mesh-barrier contract. That is a genuine reduction of the `I1.f1` zero-isolation burden, because any directed-rounding successor can now target a precise statement:

$$
\text{endpoint signs}
\;+\;
\text{bracket derivative negativity}
\Longrightarrow
\text{one bracket zero}.
$$

The remaining theorem-grade burden is not hidden. The stencil allowance must still be replaced by, or validated as, a directed-rounding interval derivative bound before this becomes full interval zero isolation. The direct proof successor for the local zero theorem is:

$$
\texttt{I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required}.
$$

The follow-on [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction](octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md) records why this is enough: full-cell derivative negativity is sufficient but not necessary for the local `I1.f1` zero theorem. The sampled mixed-stencil successor [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md) then checks the bracket mesh allowance against observed mixed theta/speed variation. The full-cell derivative row remains open only for broader interval sign-topology use.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs](../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.mjs) emits:

- predecessor validation for the endpoint sign certificate and bracket derivative mesh barrier;
- no-fixed-speed-window parameters using $3.02156\le v_\ast\le3.02157$;
- endpoint sign envelopes and the minimum endpoint signed clearance;
- the bracket derivative mesh-row count, worst derivative upper barrier, and signed derivative clearance;
- the sampled root envelope and clearances from the bracket endpoints;
- source-root preservation and term root-count signature checks;
- explicit non-interval, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.test.js](../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.test.js) verifies schema validation, predecessor composition, speed-window removal, endpoint and derivative-barrier values, root clearances, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_zero\_isolation\_mesh\_composition=true},
$$

$$
\texttt{certifies\_I1\_f1\_sampled\_stencil\_unique\_zero=true},
\qquad
\texttt{advances\_I1\_f1\_zero\_isolation=true}.
$$

It does not claim:

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
\texttt{source-atlas-aware-i1-f1-bracket-local-zero-isolation-mesh-composition-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it composes endpoint signs, sampled root location, and bracket-local derivative negativity into one bracket-local zero-isolation mechanism. The sampled mixed-stencil successor narrows the derivative-variation burden, but this packet should not be promoted into reader-facing AAA prose until the derivative mesh allowance is replaced by, or validated as, a directed-rounding interval derivative bound, or until a retained branch certificate consumes this result with the remaining full-cell and finite-row obligations clearly stated.
