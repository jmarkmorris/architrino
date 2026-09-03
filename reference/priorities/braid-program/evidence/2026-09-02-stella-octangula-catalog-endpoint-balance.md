# Stella-Octangula Exact Catalog-Endpoint Balance Exclusion

## Scope

This packet asks whether the exact static stella-octangula catalog history is acceleration-balanced at its terminal endpoint. The bound history is exactly $0\leq T\leq 1$, the observation time is $T=1$, and the numerical instantiation uses $c_f=1$ and coupling $1$. The [predeclaration](2026-09-02-stella-octangula-catalog-endpoint-balance.predeclaration.v1.json) freezes the identity, history, root inventory, unchanged independent reference, tolerances, and fail-closed decision rule before the [result packet](2026-09-02-stella-octangula-catalog-endpoint-balance.packet.v1.json) is generated.

Plainly: this calculation tests one saved static history at the first time when its one-time-unit record can contain every inter-member delay. It does not reuse the earlier result for a different extended-history identity.

## Exact source binding

The source is [the static stella-octangula assembly](../configurations/stella-octangula-static-assembly.v3.json), bound by source-file SHA-256 `cfe4893b81eb3a079961633755af07d4c46aca719ec1ce1db1cc7eb5102b5825` and exact identity `asm-242282e6154b97b00ac9d8e5123cde46` + `242282e6154b97b00ac9d8e5123cde4664abac9f364e214babbe2e7d0bdc89a8`. The exact-source hash is `9b4330d6e03a358432f73d65b957c9aaad44e54a013b8b5cfa9cba6b7b5107a3`; the complete protocol hash is `086ed1109a2ac6c6a64b8fa529c8007209efac234f60c7578d5d5e2a1bc736f9`.

Each endpoint probe excludes only its identically labeled source. Every receiver has three opposite-polarity roots at distance $1/\sqrt{3}$, three same-polarity roots at distance $\sqrt{2/3}$, and one opposite-polarity antipodal root at distance $1$. The antipodal roots emit at the retained left boundary $T=0$; all other roots emit strictly inside the record. The frozen inventory is seven roots per receiver and $56$ roots in total.

Plainly: every other member contributes exactly once. The calculation explicitly checks the eight roots that sit on the oldest allowed instant, so endpoint inclusion is part of the measured result rather than an assumption.

## Independent acceleration reference

The independent reference is the unchanged stationary-pair oracle used by the earlier release diagnostic. It directly sums

$$
\mathbf a_i=\kappa\sum_{j\ne i}q_iq_j\frac{\mathbf x_i-\mathbf x_j}{\lVert\mathbf x_i-\mathbf x_j\rVert^3}
$$

without calling the production causal-root evaluator. For circumradius $R$, its closed form is

$$
\mathbf a_i=\frac{\kappa}{R^3}\left(\frac{3\sqrt{6}}{8}-\frac{1+3\sqrt{3}}{4}\right)\mathbf x_i.
$$

At $R=1/2$ and $\kappa=1$, the coefficient is $-5.043835617063730$ and the predicted acceleration magnitude is $2.521917808531865$.

Plainly: the second calculation was authored separately and was not changed with this packet. Agreement therefore checks the causal-root evaluator against a genuinely different route for this stationary case.

## Measured result and adjudication

The exact evaluator certified all $56$ roots, including the eight left-boundary antipodal roots. Its maximum root residual was $6.283862319378386\times10^{-14}$. All eight evaluated acceleration vectors agreed with the independent pair sum with maximum vector discrepancy $0$ at binary floating-point precision; the maximum tangential residual was $3.8459253727671276\times10^{-16}$. Every member had inward acceleration magnitude $2.5219178085318643$ and radial coefficient $-5.043835617063729$.

The exact prescribed static history is therefore adjudicated `H1 P[D]`, `H2 P[D]`, `H3 P[D/M]`, `H4 F[D/M]`, and `H5 N/A`, with disposition `excluded-prescribed-balance`. Here `H4 F[D/M]` is a scoped negative: the declared static positions require zero acceleration, while the independently checked master-equation acceleration is nonzero at the terminal full-history endpoint.

Plainly: the saved static history is not an acceleration-balanced solution. This eliminates that exact prescription; it does not eliminate a moving stella-octangula history with a new identity.

## Claim grade and falsifier

Claim grade: **derived-and-measured exact catalog-endpoint balance exclusion**. The result establishes terminal causal-root completeness and nonzero inward acceleration only for the exact catalog identity, its exact stationary $[0,1]$ history, the isolated eight-member inventory, $c_f=1$, and coupling $1$. It establishes no future EOM evolution, moving history, braid classification, binding, retention, stability, energy, or physical realization. It also does not transfer the earlier extended-history release-source identity's evidence into this identity.

The adjudication is falsified if the source bytes or exact identity differ, the history is not exactly $[0,1]$, any retained non-self root is missing or extra, a left-boundary antipodal root is rejected, the independent pair sum or closed form differs beyond the frozen tolerance, or the measured acceleration is compatible with zero at the frozen balance tolerance.

Plainly: any failure in the exact binding, complete root inventory, or independent acceleration agreement withdraws the verdict rather than weakening the checks.

The machine packet verdict is `passed`; its result hash is `370fad3758e579bcda876db6f14ef8d19bc7a5f465115756732e2b8d828d8a10`.
