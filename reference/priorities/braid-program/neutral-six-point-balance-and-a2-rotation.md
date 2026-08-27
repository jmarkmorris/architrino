# Neutral Six-Point Balance and A2 Rotation

- **Status:** priority-stage technical draft; no corpus promotion or retained-braid claim is made.
- **Source lane:** Braid Program conceptual and analytical synthesis, consolidating the former neutral-balance and A2-rotation brainstorming entries dated 2026-08-13 and 2026-08-15.
- **Proposed corpus destinations:** `content/markdown/aaa/noether-braid/braid-mathematics.md`, `content/markdown/aaa/noether-braid/braid-a2-symmetry-and-return-response.md`, and the stationary-cancellation treatment in `content/markdown/aaa/noether-braid/braid-analysis-methodology.md`.
- **Claim level:** exact identities and chart-scoped no-balance derivations; bounded historical numerical diagnostics; one externally constrained comparison; no retention, stability, binding, or physical-realization result.
- **Assumptions and proof burden:** normalized units $c_f=1$; stationary arriving histories for the instantaneous balance rows; the declared unsoftened signed inverse-square partner contribution; distinct labeled architrinos except where coordinate coincidence is explicitly transferred to a separate chart; complete delayed histories for any later dynamical claim.
- **Evidence requirements:** independent evaluation of every exact residual, a named and reproducible instrument for any renewed numerical search, certified causal-root coverage for delayed histories, and refinement envelopes for every EOM-solver continuation.
- **Promotion blockers and falsifiers:** an independently certified counterexample to a chart-scoped sign argument, an unrecorded causal-root family, a collision or coordinate-coincidence event outside the declared chart, regulator-dependent continuation, or any inference from initial balance to retention blocks promotion.

## Purpose and Scope

Neutral six-point geometry separates three questions that are often conflated: whether a prescribed configuration has zero instantaneous partner acceleration, whether a rotating chart supplies the required path acceleration, and whether a complete retained history persists under the Master Equation. This packet develops the first two questions for three electrinos and three positrinos and states the exact boundary before the third.

Plainly: a balanced drawing is not yet a braid. It becomes a physical candidate only after the delayed history, continuation, and stability obligations are supplied independently.

## Stationary Balance on a Sphere

Let six distinct sites $\mathbf x_i\in S^2$ carry polarity signs $\sigma_i\in\{-1,+1\}$ with three sites of each polarity. For stationary arriving histories and no nontrivial stationary same-transmitter roots, zero initial partner acceleration requires

$$
\mathbf A_i
=
\kappa\sum_{j\ne i}
\sigma_i\sigma_j
\frac{\mathbf x_i-\mathbf x_j}
{\|\mathbf x_i-\mathbf x_j\|^3}
=\mathbf0,
\qquad i=1,\ldots,6.
$$

Plainly: every receiver must balance its own five partner contributions. Cancellation after adding the six receiver rows together is automatic and does not keep any individual architrino at rest.

Because every site lies on the unit sphere, radial projection gives the necessary receiver-local condition

$$
\sum_{j\ne i}
\frac{\sigma_j}{\|\mathbf x_i-\mathbf x_j\|}
=0.
$$

Plainly: the distance-weighted same-polarity and opposite-polarity contributions must cancel before any tangential condition is considered.

### Exact Symmetric Negatives

The face-opposite A2 octahedron fails the stationary condition. At the positive $x$-axis site, the partner contribution is proportional to

$$
-\frac14\mathbf e_x
-\frac1{\sqrt2}(\mathbf e_y+\mathbf e_z),
$$

whose magnitude is $\sqrt{17}/4$. The alternating regular hexagon also fails, with inward radial magnitude

$$
\frac54-\frac1{\sqrt3}
\approx0.6726497308.
$$

Plainly: the symmetry reduces the calculation, but it does not produce equilibrium. Both exact rows accelerate inward or toward the opposite-polarity ring.

For the staggered triangular-antiprism family, place the electrinos on one equilateral ring at height $h$ and the positrinos on its mirror ring at $-h$, with $\rho=\sqrt{1-h^2}$. A representative electrino has

$$
\frac{\mathbf A}{\kappa}
=
\left[
\frac{1}{\sqrt3\rho^2}
-\frac{\rho}{(1+3h^2)^{3/2}}
-\frac{\rho}{4}
\right]\hat{\boldsymbol\rho}
-
\left[
\frac{4h}{(1+3h^2)^{3/2}}
+\frac{h}{4}
\right]\hat{\mathbf z}.
$$

For every $h>0$, the axial bracket is positive and the acceleration has a strictly negative axial component. The aligned triangular-prism assignment has the same one-signed obstruction,

$$
\frac{A_z}{\kappa}
=
-\frac{1}{4h^2}
-\frac{4h}{(3+h^2)^{3/2}}
<0,
\qquad h>0.
$$

Plainly: same-ring partners supply no axial contribution, while every opposite-ring contribution points toward the other ring. The aligned-ring, staggered-ring, regular-octahedral, and single-ring transitive strata therefore contain no stationary balance under the declared row.

The derivation does not classify every finite colored symmetry action on six points. A merely topological adjacency pattern also cannot determine the inverse-square vector sum without a metric embedding.

### Historical Bounded Sphere Search

A 2026-08-13 exploration used forty nonlinear least-squares starts over twelve spherical angles. It found no zero and returned the alternating regular hexagon as the best row, with full residual norm approximately $1.64765$. No durable focused evidence packet identifies the original instrument, source hash, or reproduction command, so this row is preserved as historical bounded context rather than current measured evidence.

Plainly: the search did not find a counterexample, but it cannot prove global nonexistence and is not strong enough to support a present candidate decision.

The global sphere question requires either one independently certified noncollision root of all eighteen acceleration components or a complete positive lower-bound argument after quotienting global rotation and covering symmetry strata, collision boundaries, and the remaining compact shape chart.

## Unrestricted Planar Balance

For six distinct planar sites, the same three-dimensional inverse-square partner row applies; planarity does not replace it with a logarithmic two-dimensional interaction. The stationary equations remain

$$
\mathbf A_i
=
\kappa\sum_{j\ne i}\sigma_i\sigma_j
\frac{\mathbf x_i-\mathbf x_j}{\|\mathbf x_i-\mathbf x_j\|^3}
=\mathbf0,
\qquad i=1,\ldots,6.
$$

Pairing terms in $\sum_i\mathbf x_i\mathbin{\cdot}\mathbf A_i$ gives the necessary scale identity

$$
\sum_{i<j}
\frac{\sigma_i\sigma_j}{\|\mathbf x_i-\mathbf x_j\|}
=0.
$$

Summing the three electrino rows cancels their internal pair terms and yields

$$
\sum_{p\in P}\sum_{n\in N}
\frac{\mathbf x_n-\mathbf x_p}{\|\mathbf x_n-\mathbf x_p\|^3}
=\mathbf0.
$$

Plainly: the same-polarity and opposite-polarity inverse-distance totals must balance, and the convex hulls of the two polarity classes must overlap. If one line strictly separates the two triangles, every cross-polarity contribution has the same signed projection and cannot sum to zero.

A 2026-08-15 exploration rejected the alternating regular hexagon and found no finite zero in searches over aligned and staggered concentric equilateral triangles with variable radius ratio. A separate sixty-four-start least-squares search fixed two electrinos at $(-1,0)$ and $(1,0)$, varied the remaining eight coordinates in $[-8,8]^8$, and returned a best residual norm of approximately $0.2983$ at a nearly collinear row extending to radius about $6.83$. The original numerical instrument is not durably identified, so these values remain historical bounded diagnostics rather than proof-grade evidence.

Plainly: moving sites far away can reduce some contributions without producing a finite exact balance. The bounded search therefore neither exhibits a solution nor excludes one.

The planar question requires quotienting translation, rotation, and scale before applying an interval Newton or Krawczyk certificate to one noncollision root or covering the compactified shape chart with a positive residual lower bound. A certified stationary root would not establish a stable or retained delayed-history branch.

## Rotating A2 Without an External Constraint

Let the face-opposite A2 chart co-rotate about the body diagonal $\hat{\mathbf n}=(1,1,1)/\sqrt3$. Each site has

$$
h=\frac1{\sqrt3},
\qquad
\rho=\sqrt{\frac23},
\qquad
v_{\mathrm{rim}}=\omega\rho.
$$

A rigid rotating wave requires

$$
A_{\parallel}=0,
\qquad
A_{\rho}=-\omega^2\rho,
\qquad
A_{\phi}=0.
$$

Same-ring partners have zero axial component, while all three opposite-ring contributions point toward the other ring. Their axial sum is strictly one-signed at every nonzero ring height, so the bare fixed-coordinate single-frequency two-ring chart cannot satisfy $A_{\parallel}=0$ at any sub-field rim speed.

Plainly: changing the common rotation rate cannot supply the missing axial support. The chart must flatten, deform, or acquire an additional declared response.

For stationary arriving histories followed by an instantaneous tangential release $\mathbf v_i=\omega\hat{\mathbf n}\times\mathbf x_i$, the initial common-radius curvature is

$$
\ddot R(0)
=
\frac{2\omega^2}{3}
-\frac{\kappa}{4}.
$$

The radius is flat to second order at $\omega^2=3\kappa/8$, but the axial height obeys

$$
\ddot h(0)
=
-\frac{1+4\sqrt2}{4\sqrt3}\,\kappa
\approx
-0.960834\,\kappa,
$$

independently of $\omega$.

Plainly: the tuned kick changes the radial curvature without preserving the octahedron. The immediate motion remains an axial flattening channel rather than a rigid rotating branch.

A coherently rotating prior history requires recomputation of every delayed root and transmitter-side acceleration weight. The sign obstruction still rejects the declared fixed-coordinate two-ring chart, but no spin-up, spin-down, collision, escape, breathing, or retained-branch fate follows without direct EOM-solver evolution.

## Externally Constrained Spherical Motion

Requiring $\|\mathbf x_i(T)\|=1$ introduces a normal constraint acceleration that is absent from the bare A2 release. Assume for comparison that this constraint preserves the $C_3\times\langle\iota\rangle$ channel and adds no tangential acceleration. Write

$$
h=\sin\alpha,
\qquad
\rho=\cos\alpha,
\qquad
\mathbf x=\rho\hat{\boldsymbol\rho}+h\hat{\mathbf z}.
$$

For stationary arriving histories, the partner contribution projected onto increasing latitude is

$$
\frac{A_{\alpha}}{\kappa}
=
-h\left[
\frac{1}{\sqrt3\rho^2}
+\frac{3\rho}{(1+3h^2)^{3/2}}
\right],
$$

and the constrained latitude equation is

$$
\ddot\alpha
=
A_{\alpha}
-h\rho\dot\phi^2.
$$

Plainly: both the partner contribution and co-rotation initially drive the sites toward the equator, not toward the nearer pole.

At the equator, the staggered triangles form six distinct alternating sites on one great circle, so the reduced chart can pass through without a coordinate coincidence. In an instantaneous time-symmetric surrogate, the latitude sequence is

$$
+\alpha_0
\longrightarrow 0
\longrightarrow -\alpha_0
\longrightarrow 0
\longrightarrow +\alpha_0.
$$

Combining latitude oscillation with azimuthal rotation produces a spherical-band path. Rational rotation-to-latitude frequency ratios close kinematically, while irrational ratios sample a band. Neither behavior is a retained Noether braid unless the constraint source and delayed history are supplied.

Delayed tangential acceleration may grow, shrink, bias, or destroy the surrogate oscillation. A physical claim therefore requires a substrate-derived constraint provider or an explicit external-comparison label, a complete $c_f=1$ retained history, root census, separation record, equator-crossing and turning ledger, and refinement envelope.

## Assessment and Promotion Boundary

The exact stationary and rotating identities are suitable for later textbook use because they teach why symmetry alone does not imply balance and why a constraint changes the dynamical problem. The bounded searches are not promotion-ready until their instruments and reproduction records are recovered or the searches are repeated under a predeclared current protocol. The constrained oscillator remains comparison material unless its normal response is derived from the theory.

The strongest current conclusions are chart-scoped: the named symmetric stationary strata fail, the bare fixed-coordinate nonplanar A2 rotating wave has a one-signed axial obstruction, and a radial curvature adjustment does not remove axial flattening. No global stationary-existence theorem, retained branch, stability result, binding claim, or physical particle identification follows.

## Unresolved Ideas

- Certify one collision-free spherical stationary root or a global positive residual lower bound after exhaustive symmetry and boundary coverage.
- Certify one finite planar stationary root or a global positive lower bound on the compactified planar shape chart.
- Evaluate one coherent rotating A2 retained history at $c_f=1$ with independent axial, radial, tangential, causal-root, and refinement records.
- Derive a physical spherical-constraint provider or retain the latitude oscillator strictly as an external comparison model.
