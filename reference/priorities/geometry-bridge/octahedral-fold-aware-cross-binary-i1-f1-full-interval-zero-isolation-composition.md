# Octahedral Fold-Aware Cross-Binary I1.f1 Full Interval Zero-Isolation Composition

Promotion status: `priority-only`.

This packet continues [octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure](octahedral-fold-aware-cross-binary-i1-forcing-bracket-interval-enclosure.md) and [octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction](octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.md). The predecessor endpoint packet supplies the imported signs

$$
f_\times(a_1)>0>f_\times(b_1),
$$

for the `I1.f1` bracket endpoints

$$
a_1=0.124678831905,
\qquad
b_1=0.145456970556.
$$

The predecessor peak-budget packet supplies the directed-rounded theta-localized Taylor derivative envelope on the finite bracket covering. For every emitted theta tile $T$ in every bracket subcell it proves

$$
U_T^\#<0,
\qquad
\sup_T f_\times' \le U_T^\#.
$$

The composition theorem is therefore direct:

1. The endpoint signs give at least one zero in $(a_1,b_1)$.
2. The negative derivative envelope makes $f_\times$ strictly decreasing on the bracket.
3. If two zeros existed, Rolle's theorem would give an interior point with $f_\times'=0$, contradicting $\sup_T f_\times'<0$ on the covering tile containing that point.

Thus the `I1.f1` bracket contains exactly one zero under the certified positive speed-ratio enclosure

$$
3.02156\le \nu \le 3.02157.
$$

This is the first theorem-grade zero-isolation closure for the representative cross-binary bracket. It is not a retained branch, not interval critical exhaustion for the whole primitive candidate list, and not an interval quadrature enclosure.

## Composition Contract

The finite covering imported from the peak-budget packet has

$$
2048
$$

bracket subcells and, at the default theta-localized Taylor split, 

$$
4096
$$

theta-localized derivative tiles. The closing condition consumed here is

$$
\max_T U_T^\# < 0.
$$

The peak-budget packet already proved that every tile's directed-rounded interval/Taylor upper envelope lies below the row budget, with worst directed-rounded interval/Taylor ratio

$$
0.0164397437213
$$

and minimum Taylor headroom

$$
3.72535118309\times10^{-6}.
$$

Those numbers show that the zero-isolation bottleneck is no longer derivative variation. The remaining live work has moved downstream: prove that the isolated zero is the correct member of the full primitive critical list, enclose the corresponding primitive integrals, and then decide whether the branch is retained.

## Claim Boundary

Closed here:

- imported endpoint sign change for `I1.f1`;
- directed-rounded negative derivative envelope on the complete finite bracket covering;
- uniqueness of the `I1.f1` bracket zero by the mean-value theorem.

Still open:

- global `I1` interval sign topology outside the isolated bracket;
- interval critical exhaustion for all primitive candidate locations;
- interval quadrature enclosure for $C_\times$, $m_Q$, and $M_Q$;
- retained branch status.

No speed band, speed window, speed minimum, or speed maximum is imposed. The packet uses only the certified positive speed-ratio enclosure.

## Executable Artifact

The executable packet is [octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs](../../../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.mjs). It imports and validates the endpoint-sign packet and the derivative peak-budget packet, then emits the theorem summary:

$$
\texttt{I1.f1.full-interval-zero-isolation-composition}.
$$

The companion test [neutral-swarm-octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.test.js](../../../tests/neutral-swarm-octahedral-fold-aware-cross-binary-i1-f1-full-interval-zero-isolation-composition.test.js) validates schema boundaries, endpoint/derivative predecessor consumption, absence of speed-band fields, downstream overclaim rejection, and CLI validation. The test accepts `AAA_TEST_HEARTBEAT=0` to suppress long-run progress lines; by default it reports peak-budget parent-row progress while building the artifact.

## Result

The result status is

$$
\texttt{source-atlas-aware-i1-f1-full-interval-zero-isolation-composition-certified}.
$$

The direct successor is [octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration](octahedral-fold-aware-cross-binary-i1-f1-critical-exhaustion-integration.md). It integrates the unique bracket zero into the primitive-critical map through $A_\times'=f_\times$ and reduces the remaining `I1` regular-cell burden to the two outside-bracket signs.

The next theorem-grade successor row after that integration is

$$
\texttt{I1.complement-sign-exclusion-interval-enclosures-required}.
$$

That successor is now sharper than the previous open row. It no longer asks whether the `I1.f1` bracket zero is unique; it asks for the left and right complement signs needed to make the isolated zero the complete `I1` regular primitive-critical contribution.
