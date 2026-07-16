# Octahedral Fold-Aware Cross-Binary I1 Zero-Isolation Speed-Envelope Scan

Promotion status: `priority-only`.

This packet composes [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure](octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md) with [octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan](octahedral-fold-aware-cross-binary-i1-derivative-negative-speed-envelope-scan.md). The endpoint packet certifies

$$
f_\times(a_1)>0>f_\times(b_1),
$$

and the derivative packet certifies a negative derivative speed-envelope scan for `I1.derivative-negative.full-cell` on the compact regular `I1` core. This packet turns those two rows into a concrete sampled `I1.f1` simple-root branch.

It is a sampled speed-envelope zero-isolation scan. It is not yet the full directed-rounding interval zero-isolation theorem, because the derivative row has not been enclosed over the continuous compact `I1` interval and all speeds in the enclosure by outward-rounded interval arithmetic.

## Sampled Root Branch

The scan uses only the historical positive speed-ratio zero-enclosure diagnostic; receiver-normal restart required

$$
3.02156\le v_\ast\le3.02157,
$$

with no fixed speed band. For the bracket

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556,
$$

the executable bisects $f_\times(\theta;v_\ast)=0$ for each sampled speed. The default scan uses $9$ speed samples and the same $48$-sample compact `I1` derivative scan inherited from the predecessor packet. Every sampled root row preserves the expected six source roots, remains inside the certified bracket, and has negative derivative at the root.

The resulting sampled root envelope is

$$
0.129617801662
\le
\theta_{I1.f1}
\le
0.129631781031,
$$

with sampled span

$$
1.39793672153\times10^{-5}.
$$

The derivative at the sampled roots remains bounded away from zero:

$$
-0.0903237258617
\le
f'_\times(\theta_{I1.f1};v_\ast)
\le
-0.0902959668558.
$$

Each sampled root row has term root-count signature $(1,3,1,1)$, sampled minimum $|F_\delta|=0.70663446648$, and sampled minimum same-term root separation $1.28378134743$. Across the sampled speed grid, the root branch moves monotonically downward in $\theta$ as $v_\ast$ increases. Thus the current executable row is not merely a sign-bracket target; it now carries a tracked simple-root branch:

$$
\boxed{
\texttt{I1.f1.zero-isolation.speed-envelope-scan}.
}
$$

## Composition Theorem

At the sampled speed-envelope level, the proof is:

1. The endpoint certificate gives sign-definite envelopes at $a_1$ and $b_1$.
2. The derivative scan keeps $f'_\times<0$ on the compact regular `I1` scan grid.
3. Direct bisection locates one root inside $[a_1,b_1]$ at every sampled speed.
4. The root rows preserve six source roots and have $f'_\times<0$ at the root.
5. The sampled roots form a monotone decreasing branch in speed.

This gives a sampled simple-root branch for `I1.f1`, but the theorem-grade interval statement still needs directed-rounding derivative enclosure and a directed-rounding composition of endpoint signs with derivative negativity over the whole speed enclosure. At this stage the successor was still phrased as the full compact-cell row:

$$
\texttt{I1.derivative-negative.full-cell-directed-rounding-interval-enclosure-required}.
$$

The bracket-local sampled successor [octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier](octahedral-fold-aware-cross-binary-i1-bracket-derivative-mesh-barrier.md) advances the same derivative burden on the actual `I1.f1` bracket by adding finite-cell stencil allowances. It is still not a directed-rounding interval derivative enclosure.

The composition successor [octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition](octahedral-fold-aware-cross-binary-i1-bracket-local-zero-isolation-mesh-composition.md) then consumes those endpoint signs, the sampled branch location, and the bracket-local derivative barrier into a sampled/stencil bracket-local zero-isolation mechanism. It still leaves full interval zero isolation open.

The burden-reduction successor [octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction](octahedral-fold-aware-cross-binary-i1-local-zero-isolation-burden-reduction.md) sharpens the direct theorem-grade target: local `I1.f1` zero isolation only needs derivative negativity on the `I1.f1` bracket, not on the whole compact `I1` cell. The direct local successor is therefore the bracket-local directed-rounding derivative-variation enclosure, while the full-cell derivative row remains open for broader interval sign-topology use.

## Executable Artifact

The executable diagnostic [octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs](../../../../scripts/neutral-braid/octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.mjs) emits:

- no-fixed-speed-window scan parameters using $3.02156\le v_\ast\le3.02157$;
- predecessor checks for the `I1.forcing-bracket` endpoint certificate and `I1.derivative-negative.full-cell` derivative scan;
- bisection root rows for `I1.f1` across the sampled speed grid;
- source-root preservation and derivative-at-root sign checks;
- a sampled root-theta envelope and monotone branch summary;
- explicit non-interval, non-critical-exhaustion, non-quadrature, and non-retention claim boundaries.

The companion test [neutral-braid-octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.test.js](../../../../tests/neutral-braid-octahedral-fold-aware-cross-binary-i1-zero-isolation-speed-envelope-scan.test.js) verifies schema validation, speed-window removal, predecessor composition, sampled root rows, root envelope and derivative envelope values, claim boundaries, invalid controls, overclaim rejection, and CLI emission.

## Claim Boundary

This packet may claim:

$$
\texttt{certifies\_I1\_f1\_zero\_isolation\_speed\_envelope\_scan=true},
\qquad
\texttt{certifies\_I1\_f1\_root\_branch\_speed\_envelope\_scan=true},
$$

$$
\texttt{certifies\_I1\_f1\_sampled\_simple\_root\_branch=true}.
$$

It does not claim:

$$
\texttt{certifies\_I1\_f1\_full\_interval\_zero\_isolation=false},
\qquad
\texttt{certifies\_outward\_rounded\_interval\_enclosure=false},
\qquad
\texttt{certifies\_interval\_derivative\_enclosure=false},
$$

$$
\texttt{certifies\_I1\_zero\_isolation=false},
\qquad
\texttt{certifies\_interval\_critical\_exhaustion=false},
\qquad
\texttt{retained\_branch=false}.
$$

The resulting status is

$$
\boxed{
\texttt{source-atlas-aware-i1-f1-zero-isolation-speed-envelope-scan-certified}.
}
$$

## Promotion Decision

This packet remains `priority-only` and classified as `defer with blocker`. It is mathematically substantive because it composes the endpoint and derivative scan rows into a tracked sampled simple-root branch for `I1.f1`. It should not be promoted into reader-facing AAA prose until the derivative and composition rows are upgraded to directed-rounding interval enclosures, or until a retained branch certificate consumes this sampled row with the remaining proof burden clearly stated.
