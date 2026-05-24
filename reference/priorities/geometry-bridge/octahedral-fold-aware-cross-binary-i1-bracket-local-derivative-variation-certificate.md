# Octahedral Fold-Aware Cross-Binary I1 Bracket-Local Derivative-Variation Certificate

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction](octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md) and [octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier](octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md). The burden-reduction packet shrank the direct local `I1.f1` zero-isolation derivative target to the actual forcing bracket. The mesh-barrier packet supplied a bracket-local sampled derivative allowance. This packet tests that allowance against mixed theta/speed variation inside every bracket cell.

It is a sampled mixed-stencil derivative-variation certificate. It is not a bracket-local directed-rounding derivative-variation enclosure, not a full directed-rounding interval derivative enclosure, not full `I1.f1` interval zero isolation, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Variation Certificate

The direct theorem-grade successor remains

$$
\texttt{I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required}.
$$

This packet advances that row by checking the existing mesh allowance against a denser mixed stencil. On every cell

$$
C
\subset
[0.124678831905,\;0.145456970556]
\times
[3.02156,\;3.02157],
$$

let $d_C$ be the derivative value at the predecessor mesh center and let $\Delta_C^{\mathrm{mesh}}$ be the predecessor local variation allowance. The packet samples $f'_\times$ on a $5\times5$ tensor stencil containing corners, axial faces, the center, and interior points, and computes

$$
\Delta_C^{\mathrm{obs}}
=
\max\{0,\max_{(\theta,v)\in S_C}f'_\times(\theta,v)-d_C\}.
$$

The sampled certificate requires

$$
\Delta_C^{\mathrm{obs}}<\Delta_C^{\mathrm{mesh}},
\qquad
\max_{(\theta,v)\in S_C}f'_\times(\theta,v)<0
$$

on all $128$ mesh cells. It also requires the six-source-root count, term root-count signature $(1,3,1,1)$, and sampled regularity witness $|F_\delta|>0$ to persist throughout the stencil.

## Computed Margins

At the default $16\times8$ predecessor mesh and $5\times5$ stencil, the executable checks

$$
128\times25=3200
$$

derivative samples. The observed derivative range is

$$
-0.100761491871
\le
f'_\times
\le
-0.060388174983,
$$

so the observed derivative clearance is

$$
0.060388174983.
$$

The largest observed derivative spread inside one predecessor mesh cell is

$$
0.00278826642474.
$$

The largest center-to-observed-maximum variation is

$$
0.00139034657825,
$$

while the largest predecessor local variation allowance is

$$
0.00139413419694.
$$

The worst observed variation-to-allowance ratio is

$$
0.997283174962,
$$

with minimum allowance domination slack

$$
3.78761869309\times10^{-6}.
$$

The corners add a small mixed-direction check beyond the axial-face data: the maximum corner excess over the axial-face maximum is

$$
1.42752990595\times10^{-7}.
$$

The minimum sampled regularity witness is

$$
\min |F_\delta|
=
0.686789509138.
$$

All stencil samples preserve six source roots and term root-count signature $(1,3,1,1)$.

## What This Adds

The earlier bracket mesh barrier used center samples and axial face samples to construct a local variation allowance. This packet checks the same allowance against mixed theta/speed stencil samples, including corners and interior points. The result shows that the allowance already dominates the observed mixed-cell variation with positive slack on every bracket cell.

That is a real narrowing of the next theorem-grade burden. A directed-rounding successor no longer has to discover where the sampled mixed variation is dangerous; it must prove that no unsampled derivative peak can exceed the observed stencil maximum by enough to consume the remaining slack. The hardest sampled cell is not the same as the weakest negative derivative cell:

- weakest allowance domination slack: `I1.f1.bracket-derivative-mesh.0.7`;
- weakest observed derivative clearance: `I1.f1.bracket-derivative-mesh.15.7`.

The packet therefore separates two burdens that were previously blended: mixed-cell variation domination and endpoint derivative clearance.

The direct successor [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.md) now sharpens this remaining burden again. It converts the unsampled-peak exclusion problem into $2048$ explicit stencil-subcell inequalities and confirms, by a $9\times9$ refined replay on each predecessor mesh cell, that no sampled refined point exceeds the parent stencil vertex maxima. The tightest remaining overshoot ceiling is still the allowance slack of `I1.f1.bracket-derivative-mesh.0.7`, about $3.78761869309\times10^{-6}$. The same successor also tests the bilinear pure-curvature and root-tube regularity routes on the refined sample grid; all $2048$ rows pass with worst sampled curvature remainder ratio $\approx0.0632306995182$, minimum sampled $|F_\delta|\approx0.686789509138$, and minimum sampled adjacent-tube separation $\approx1.28117968261$. It then emits $12288$ protected root-tube targets and $20480$ complement-slab targets, with minimum tube padding radius $\approx0.108489314201$ and minimum complement width $\approx0.325467942606$, leaving interval endpoint signs, fixed-$F_\delta$ floors, complement exclusions, and directed-rounded pure-curvature bounds as the real theorem-grade blocker.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.mjs) emits:

- predecessor validation for the local zero-isolation burden reduction and bracket derivative mesh barrier;
- one $5\times5$ mixed-stencil row for each predecessor bracket mesh cell;
- observed derivative minimum, maximum, spread, center-to-maximum variation, predecessor allowance, variation ratio, and allowance slack per cell;
- corner excess over axial-face maximum per cell;
- source-root count, term root-count signature, and sampled $\min |F_\delta|$ checks;
- explicit non-directed-rounding, non-interval, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.test.js) verifies schema validation, predecessor composition, speed-window removal, default $128$-cell and $3200$-sample margins, row-level allowance domination, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_derivative\_variation\_stencil\_certificate=true},
$$

$$
\texttt{certifies\_observed\_stencil\_derivative\_negativity\_on\_I1\_f1\_bracket=true},
$$

$$
\texttt{certifies\_observed\_stencil\_variation\_below\_existing\_mesh\_allowance=true},
$$

$$
\texttt{advances\_I1\_f1\_bracket\_local\_directed\_rounding\_derivative\_variation\_enclosure=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_local\_directed\_rounding\_derivative\_variation\_enclosure=false},
$$

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
\texttt{source-atlas-aware-i1-f1-bracket-local-derivative-variation-stencil-certificate-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it validates the predecessor mesh allowance against mixed theta/speed stencil variation on the reduced `I1.f1` bracket and converts the next row into an explicit unsampled-peak exclusion burden. The peak-budget successor further narrows that burden to finite subcell overshoot inequalities, sampled bilinear curvature feasibility, sampled root-tube regularity feasibility, and finite protected-tube/complement targets, but promotion is still blocked until an interval/Taylor backend proves those inequalities, or until a retained branch certificate consumes this sampled certificate with the remaining finite-row obligations clearly stated.
