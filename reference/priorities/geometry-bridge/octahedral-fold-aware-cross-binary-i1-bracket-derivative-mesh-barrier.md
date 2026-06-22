# Octahedral Fold-Aware Cross-Binary I1 Bracket Derivative Mesh Barrier

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.md). The predecessor tracks a sampled `I1.f1` simple-root branch across the no-fixed-speed-window speed-ratio enclosure. This packet advances the derivative part of that same bracket by replacing a plain point scan with a local mesh-barrier calculation on the bracket itself.

It is a bracket-local sampled derivative barrier. It is not a full directed-rounding interval derivative enclosure on `I1.derivative-negative.full-cell`, not a full `I1.f1` interval zero-isolation theorem, not interval critical exhaustion, not interval quadrature, and not a retained branch.

## Bracket-Local Barrier

The barrier is restricted to the first forcing bracket

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556,
$$

and to the certified positive speed-ratio enclosure

$$
3.02156\le v_\ast\le3.02157.
$$

The executable partitions $[a_1,b_1]\times[3.02156,3.02157]$ into $16\times8$ mesh cells. For each cell center $(\theta_c,v_c)$, it evaluates $f'_\times(\theta_c;v_c)$ and then evaluates the derivative again on the two $\theta$ faces and two speed faces. The local stencil allowance is

$$
\Delta_{\mathrm{stencil}}
=
L_\theta^{\mathrm{st}}\frac{\Delta\theta}{2}
+
L_v^{\mathrm{st}}\frac{\Delta v}{2}
+
10^{-9},
$$

where $L_\theta^{\mathrm{st}}$ and $L_v^{\mathrm{st}}$ are the sampled face-difference slopes for $f'_\times$. The row passes when

$$
f'_\times(\theta_c;v_c)
+
\Delta_{\mathrm{stencil}}
<
0.
$$

Every default mesh cell preserves six source roots and the term root-count signature $(1,3,1,1)$. The worst default cell occurs at

$$
\theta_c=0.144807653723,
\qquad
v_c=3.021569375,
$$

with sampled center derivative

$$
f'_\times(\theta_c;v_c)\approx-0.0614940465699
$$

and local upper barrier

$$
f'_\times+\Delta_{\mathrm{stencil}}
\le
-0.0603824889362.
$$

Thus the bracket derivative now has a quantitative local barrier with signed clearance

$$
0.0603824889362.
$$

## What This Adds

The preceding derivative scan proved that sampled points on the compact `I1` core were negative. This packet is stronger on the actual `I1.f1` bracket: it attaches a local finite-cell allowance to every bracket mesh cell and verifies that the upper derivative barrier is still negative. The result is still weaker than theorem-grade interval closure because the face-difference slopes are sampled stencils, not outward-rounded bounds on the true variation of the derivative.

At this stage the theorem-grade successor was still phrased as:

$$
\texttt{I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required}.
$$

However, the bracket-local burden is now sharply quantified: a directed-rounding successor can focus on proving that the true local variation of $f'_\times$ stays below the same stencil allowance, or replace the stencil allowance by an interval bound, on the small bracket where `I1.f1` lives.

The direct sampled/stencil composition successor [octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition](octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.md) consumes this derivative barrier with the endpoint signs and sampled root branch. It proves the bracket-local zero-isolation mechanism under the mesh contract. The burden-reduction successor [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction](octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md) then sharpens the local theorem-grade target to the bracket-local directed-rounding derivative-variation row; the mixed-stencil successor [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-variation-certificate.md) checks the same allowance against observed mixed theta/speed variation; the full-cell derivative row remains open only for broader interval sign-topology use.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.mjs) emits:

- no-fixed-speed-window mesh parameters using $3.02156\le v_\ast\le3.02157$;
- predecessor validation for the sampled `I1.f1` zero-isolation speed-envelope scan;
- bracket mesh rows with center derivative, face derivatives, stencil slopes, local upper barrier, and signed clearance;
- source-root preservation and term root-count signature checks;
- a global worst-cell barrier summary;
- explicit non-interval, non-critical-exhaustion, non-quadrature, and non-retention boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.test.js) verifies schema validation, predecessor composition, speed-window removal, mesh-row negativity, barrier summary values, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_bracket\_derivative\_mesh\_barrier=true},
\qquad
\texttt{certifies\_I1\_f1\_bracket\_local\_derivative\_negative\_stencil\_barrier=true},
$$

$$
\texttt{advances\_I1\_derivative\_negative\_full\_cell=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_derivative\_negative\_full\_cell\_interval\_enclosure=false},
\qquad
\texttt{certifies\_I1\_f1\_full\_interval\_zero\_isolation=false},
$$

$$
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
\qquad
\texttt{certifies\_I1\_zero\_isolation=false},
$$

$$
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-f1-bracket-derivative-mesh-barrier-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it converts the `I1.f1` bracket derivative burden from pointwise sampling into a finite mesh-barrier calculation with a signed clearance. The sampled mixed-stencil successor validates the allowance against denser observed theta/speed variation, but this packet should not be promoted into reader-facing AAA prose until the local stencil allowance is replaced by, or validated as, a directed-rounding interval derivative bound, or until a retained branch certificate consumes this bracket-local result with the remaining full-cell and finite-row obligations clearly stated.
