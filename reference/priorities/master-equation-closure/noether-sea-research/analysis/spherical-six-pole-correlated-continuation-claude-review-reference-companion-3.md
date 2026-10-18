# Six-pole correlated continuation review: dated companion 3 (control K2 range derived exactly; lost-stream sizes are estimates)

Written 2026-10-14T12:16:06Z by the review role, at the coordinator's request (contribution 4, item 3). No code was changed and nothing was rerun.

1. **The finding.** My centred evaluator's control K2 ([centred.py v4](../evidence/spherical-six-pole-correlated-continuation-claude-review-centred.py), sha256 b6ffe10076248ce669260877a2e74368850099de49d7925e8ea1bdb8376a5bbf, lines 117 to 125) calls the range of $q\,w$ on the parallelogram exact, but computes it as the minimum and maximum over 201 nodes per edge. The coordinator is right that, as written, sampling alone does not prove the range: an extremum inside an edge could fall between nodes. Below, the range is derived by hand, so the label "exact" is now supported by a derivation and not by the sampling.

2. **The set.** $q = 1.6 + 0.01\,u_1 + 0.0001\,u_2$ and $w = 0.29 - 0.0098\,u_1 + 0.0001\,u_2$ with $(u_1,u_2) \in [-1,1]^2$. The remainder boxes $\pm 10^{-6}$ are not part of the K2 set: the sampled function `qw` omits them, and the centred sum uses only the two columns. They enter only the gradient boxes, where they make the enclosure wider, which is safe.

3. **No interior extremum (derived).** Expanding, $P = q\,w = 0.464 - 0.01278\,u_1 + 0.000189\,u_2 - 9.8\times10^{-5}\,u_1^2 + 2\times10^{-8}\,u_1 u_2 + 10^{-8}\,u_2^2$. Its Hessian $\begin{pmatrix} -1.96\times10^{-4} & 2\times10^{-8} \\ 2\times10^{-8} & 2\times10^{-8} \end{pmatrix}$ has determinant $-3.92\times10^{-12} - 4\times10^{-16} < 0$, so $P$ is a saddle. It has no interior maximum or minimum, and its extrema on the closed square lie on the boundary.

4. **No in-edge extremum (derived).**
   - On the edges $u_2 = \pm 1$: $P(u_1) = \text{const} - (0.01278 \mp 2\times10^{-8})\,u_1 - 9.8\times10^{-5}\,u_1^2$. Its stationary point is $u_1^* = -(0.01278 \mp 2\times10^{-8})/(1.96\times10^{-4}) \approx -65.2$, outside $[-1,1]$.
   - On the edges $u_1 = \pm 1$: $P(u_2) = \text{const} + (1.89\times10^{-4} \pm 2\times10^{-8})\,u_2 + 10^{-8}\,u_2^2$. Its stationary point is $u_2^* \approx -9450$, also outside $[-1,1]$.
   - So $P$ is monotone along every edge, and its range is attained at the four vertices. All four vertices are sample nodes: $x = -1 + 2j/200$ gives $\pm 1$ exactly at $j = 0$ and $j = 200$.

5. **The vertex values (derived in exact decimals).**
   - $(1,1)$: $1.6101 \times 0.2803 = 0.45131103$.
   - $(1,-1)$: $1.6099 \times 0.2801 = 0.45093299$.
   - $(-1,1)$: $1.5901 \times 0.2999 = 0.47687099$.
   - $(-1,-1)$: $1.5899 \times 0.2997 = 0.47649303$.

   The exact range is therefore $[0.45093299,\ 0.47687099]$. This equals, digit for digit, the range recorded in the [C10 record](../evidence/spherical-six-pole-correlated-continuation-claude-review-centred-v4-C10-controls.json) (sha256 7bdd0979ac946fc3dc3d3de23a69887cd0425af8c7afa274b54ee6e4db98141d) under the field name `exact_sampled_range`.

6. **Ruling on K2 (derived).** K2 stands as a control on the exact range. The centred enclosure $[0.450831,\ 0.477169]$ contains the exact range with margins of about $1.0\times10^{-4}$ and $3.0\times10^{-4}$, far above the rounding of the sample evaluation. The box enclosure $[0.445329,\ 0.482871]$ is wider, as K2 requires. The JSON field name `exact_sampled_range` is kept, because the record is frozen. It should be read as "the sampled range, which equals the exact range by the derivation in items 3 to 5 of this companion".
   - **Scope.** This proves K2 for this fixed parallelogram only. Any reuse of a sampled-range control on another set needs its own edge analysis: vertices plus the analytically located in-edge stationary points.
   - **Falsifier.** A point of the square where $q\,w$ falls outside $[0.45093299,\ 0.47687099]$.

7. **Correction to [companion 2](spherical-six-pole-correlated-continuation-claude-review-reference-companion-2.md), item 1.** The sizes of the lost C4 and C6 streams are UNKNOWN; they were never measured. The figures given there ("about 3 kB and 1.4 kB") are ESTIMATES, made by analogy with the surviving C8 streams of the same failure kind and stage (3061 and 1374 bytes). They are not measured sizes. Companion 2 itself is left unedited, because its hash has been reported.
