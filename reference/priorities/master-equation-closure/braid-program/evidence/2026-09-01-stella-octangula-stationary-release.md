# Stella-Octangula Stationary-History Release Diagnostic

## Scope

This diagnostic evaluates the initial master-equation acceleration of the exact static interlocked-tetrahedron assembly at a release boundary. It does not evolve the assembly. The source members remain fixed with zero velocity throughout the declared past, $-2\leq T\leq 0$, and the evaluator measures the complete isolated eight-member causal-root sum at $T=0$ with $c_f=1$ and coupling $1$. The [predeclaration](2026-09-01-stella-octangula-stationary-release.predeclaration.v1.json) freezes the source binding, root inventory, independent reference, tolerances, and fail-closed decision before the tracked [result packet](2026-09-01-stella-octangula-stationary-release.packet.v1.json) is generated.

Plainly: the calculation asks which way each member starts accelerating when the stationary past is released. It does not show what happens after that instant.

## Exact source and release boundary

The source is [the static stella-octangula assembly](../configurations/stella-octangula-static-assembly.v3.json), bound by source-file SHA-256 `cfe4893b81eb3a079961633755af07d4c46aca719ec1ce1db1cc7eb5102b5825` and exact assembly identity `asm-242282e6154b97b00ac9d8e5123cde46` + `242282e6154b97b00ac9d8e5123cde4664abac9f364e214babbe2e7d0bdc89a8`. Extending the scientific history from the display carrier's interval to the release interval creates a distinct release-source identity, `asm-f7323f941df895a4d31624fb9d19945c` + `f7323f941df895a4d31624fb9d19945c92226e79dd5d06db02673e7b5ebca4a3`. The exact-source hash is `9b69a27cb6a47bdcc063f44089b1ceb6e56dcc65dcad21d770439dea8d45dd39`; the complete protocol hash is `a0fc3088d7f53685de92ceee0a54cb161416511f31e857d6381c0476e2f8b803`.

Each endpoint probe excludes only its identically labeled source. For every receiver, the retained stationary history contains three opposite-polarity roots at distance $1/\sqrt{3}$, three same-polarity roots at distance $\sqrt{2/3}$, and one opposite-polarity antipodal root at distance $1$. Thus the frozen inventory is seven roots per receiver and $56$ roots in total.

Plainly: every other member contributes exactly once. The two-time-unit past is longer than the largest required delay, which is one time unit.

## Independent acceleration reference

The independent reference directly sums stationary pairs without calling the production causal-root evaluator:

$$
\mathbf a_i=\kappa\sum_{j\ne i}q_iq_j\frac{\mathbf x_i-\mathbf x_j}{\lVert\mathbf x_i-\mathbf x_j\rVert^3}.
$$

For circumradius $R$, tetrahedral symmetry makes the result radial. The coefficient relative to the member position is

$$
\mathbf a_i=\frac{\kappa}{R^3}\left(\frac{3\sqrt{6}}{8}-\frac{1+3\sqrt{3}}{4}\right)\mathbf x_i.
$$

At $R=1/2$ and $\kappa=1$, this gives

$$
\mathbf a_i=-5.043835617063730\,\mathbf x_i,
\qquad
\lVert\mathbf a_i\rVert=2.521917808531865.
$$

For example, the member at $(1,1,1)/(2\sqrt{3})$ has

$$
\mathbf a=(-1.456029925629983,-1.456029925629983,-1.456029925629983).
$$

Plainly: every member initially accelerates straight toward the common center. The symmetry leaves no sideways component at release.

## Measured result

The exact evaluator certified all $56$ roots. Its maximum root residual was $5.917488721252084\times10^{-14}$. All eight evaluated acceleration vectors agreed exactly at binary floating-point precision with the independently implemented pair sum; the maximum radial-symmetry residual was $3.8459253727671276\times10^{-16}$. Every member had the same acceleration magnitude, $2.5219178085318643$, and the same radial coefficient, $-5.043835617063729$.

A separate source record retained the same stationary past from $T=-4$ through $T=0$. It reproduced every receiver's seven-root inventory and acceleration with maximum acceleration difference $0$.

Plainly: the result is not an artifact of cutting the stationary history off at $T=-2$. Making that past twice as deep changes neither the roots that can reach release nor the measured acceleration.

## Claim grade and falsifier

Claim grade: **measured prescribed-history release boundary**. The result is conditional on the exact stationary source, the isolated eight-member inventory, $c_f=1$, and coupling $1$. It establishes an inward initial acceleration and therefore shows that the stationary prescription is not a master-equation equilibrium. It establishes no future trajectory, animation, braid classification, binding, retention, stability, energy, or physical realization.

The claim is falsified if the bound source changes, if any retained non-self root is missing or extra, if the independent pair sum or closed form differs beyond the frozen tolerance, if a tangential component exceeds tolerance, or if a deeper qualifying stationary history changes the root inventory or initial acceleration.

Plainly: this packet answers the first release question only. A later short evolution must receive a new predeclaration and cannot inherit a braid label from this instantaneous result.

The machine packet verdict is `passed`; its result hash is `6812b782d0629eb70557a801b022e6c7f094a538bc2870151f55f8193a9a7268`.
