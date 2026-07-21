# Braid Family A

Family A contains prescribed one-braid geometries whose three binary axes are mutually orthogonal at the near-rest endpoint and converge toward the group-translation direction as the prescribed flattening coordinate increases. The canonical coordinates, response endpoints, and master-table rows are defined in [Braid Taxonomy](braid-taxonomy.md#family-a-noether-core). This chapter explains how those coordinates distinguish A1, its constrained variants, and A2.

Family A is a geometry-and-motion definition. It does not establish that an A1 or A2 record is generated, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](braid-recovery-requirements.md).

## Shared Family-A Geometry

Every Family-A member is one complete Noether braid composed of three neutral binaries. Each binary contains one electrino and one positrino. The binaries share a braid-level phase zero, while radius, axial half-separation, transverse orbit radius, frequency, phase, and circulation are binary coordinates.

At the near-rest endpoint, the three binary axes are mutually orthogonal. Their equal-component direction is the Family-A translation direction. The complete braid translates along that direction, and the translation speed is the braid's group translation speed rather than an internal architrino speed.

The prescribed flattening coordinate $\lambda_A$ connects two endpoint geometries:

| $\lambda_A$ | Binary-axis relation | Envelope description |
| --- | --- | --- |
| $0$ | Three mutually orthogonal axes | Nearly spherical near-rest endpoint in the declared weak-gradient environment. |
| $0 < \lambda_A < 1$ | Three axes converging toward the translation direction | Increasingly oblate intermediate geometry. |
| $1$ | Three coincident axes along the translation direction | Flat response endpoint assigned to the event-horizon and photon channels. |

This response is prescribed taxonomy. An EOM-solver derivation of the path through these geometries, including either physical endpoint assignment, remains open.

The coincident-axis endpoint is also a geometric boundary with Family B. A Family-A record does not become a Family-B record away from that boundary, and coincidence at one endpoint does not establish a shared dynamical branch.

## A1

A1 is the general three-radius Family-A member. Its three binary radii are pairwise different, its three frequencies are independently assignable, and binary 2 has the distinguished hinge role. The hinge is a member assignment, not an additional coordinate and not a stability result.

Because the radii are unequal, A1 does not have the exact cyclic pair-permutation symmetry of A2. A spatial rotation preserves radius, so it cannot map one A1 binary onto another binary of a different radius. An integer frequency ratio can make the full prescribed figure repeat after a common period, but it does not restore spatial equivalence among the three binaries.

### A1 Constrained Variants

Each constrained variant inherits A1's three different radii and binary-2 hinge unless its master-table row explicitly replaces a coordinate:

| Member | Added constraint | What remains inherited |
| --- | --- | --- |
| `A1.1` | One common frequency. | Three different radii and the binary-2 hinge. |
| `A1.2` | Equal radii, one common frequency, and phases $0$, $2\pi/3$, and $4\pi/3$. | The binary-2 hinge; the axial and transverse decompositions may still differ among binaries. |
| `A1.3` | Ordered frequency ratio $f_1:f_2:f_3=4:2:1$. | Three different radii, unconstrained phases, and the binary-2 hinge. |
| `A1.4` | Ordered frequency ratio $f_1:f_2:f_3=3:2:1$. | Three different radii, unconstrained phases, and the binary-2 hinge. |

The exact radius, frequency, phase, axial-half-separation, and transverse-orbit-radius rows are carried only by the [Individual Binary Master Table](braid-taxonomy.md#individual-binary-master-table).

## A2

A2 is the fully symmetric no-hinge Family-A member. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. No binary is distinguished. A $120^\circ$ rotation about the Family-A translation direction cyclically permutes the three binaries.

An exact near-rest reference fixture places the three binary axes on an orthonormal frame. At one common reference time, each positrino lies at distance $R$ from the braid center along one positive frame axis and its electrino partner lies at the antipodal point. This is the face-opposite seed used by the invariant-channel analysis in [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions).

The fixture is one exact A2 representative, not the whole A2 coordinate space. At that reference instant it uses axial half-separation $h=R$ and transverse orbit radius $\rho=0$. The A2 taxonomy permits any common pair $(h,\rho)$ satisfying the binary-radius relation, provided all three binaries share that geometry and the other A2 constraints.

The shared mathematical chapter owns the symmetry-invariance lemma, reduced channels, axial polarity-dipole identity, momentum-screw alignment, and speed budget associated with this fixture. Those results constrain the fixture under their stated assumptions; they do not certify A2 retention.

### Retention and Interpretation

The prescribed A2 geometry and its exact near-rest reference fixture do not establish retention. The following diagnostic and no-return result state what an A2 branch record must overcome.

#### Near-Antipodality Recovery Diagnostic

Exact antipodality belongs to the A2 reference fixture. A retained record under external disturbance need not preserve that ideal relation at every instant, so recovery is tested separately from the member definition. Let $\iota$ exchange the two opposite-polarity members of each binary, let $\mathbf C(T)$ be the declared braid-center curve, and let $R$ be the common A2 binary radius. Define

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R}
$$

A candidate recovery row must declare tolerances and show

$$
\sup_{T\in J}\delta_{\mathrm{anti},i}(T)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(T+T_{\mathrm{rec}})
\leq
\theta_{\mathrm{rec}}\,\delta_{\mathrm{anti},i}(T)+\varepsilon_{\mathrm{drive}},
\qquad
0\leq\theta_{\mathrm{rec}}<1
$$

for $T,T+T_{\mathrm{rec}}\in J$. Here $T_{\mathrm{rec}}$ is the declared recovery time, $\theta_{\mathrm{rec}}$ is the dimensionless recovery contraction factor, and $\varepsilon_{\mathrm{drive}}$ is the driving residue. This is a certificate target, not an established A2 property.

#### Isolated Release and the Return-Response Question

Two claims about the face-opposite seed on the zero-angular-momentum channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) must not be conflated. The symmetry claim is established: the seed stays exactly on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact — an equivariance theorem of the channel, independent of any trajectory. The retention claim is a separate question, and the isolated seed does not answer it in the affirmative: the channel carries no centrifugal support and the void row supplies no restoring term, so nothing in the isolated construction makes it a self-maintaining branch. What the seed actually does once released is open, and is a target for direct evolution rather than a recorded result. Claim level: established equivariance theorem for the channel; the dynamical fate is open.

This pairing is informative rather than damaging. A2 was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-transmitter self-hit contributions, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The threefold rotating channel of [Braid Mathematics](braid-mathematics.md#invariant-channels-and-equivariant-reductions) supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support. The environmental candidate is the sea-embedding route stated next.

The question can be stated sharply rather than qualitatively, because the invariant channel carries a conditional no-return certificate. Two monitored conditions carry it: sub-field speed, meaning every worldline stays below the field speed $c_f$; and an opposite-polarity separation floor, meaning the closest opposite-polarity non-antipodal pair stays at least one reduced radius $R$ apart. The floor holds automatically from the channel's own geometry, and the retained causal-root count reduces to exactly one root per directed pair, so sub-field speed is the only condition that must be watched forward in time. Under the two conditions the reduced-radius acceleration satisfies a signed inverse-square lower bound $\ddot R\ge -K/R^2$, with $K$ built only from the row's coupling, its declared speed and weight caps, and the polarity structure — same-polarity partner terms cancel by an exact radial-sign argument, and the opposite-polarity terms are bounded by the floor. A short energy-integral argument then closes it: if the outward speed at a chosen certificate time clears the margin $\dot R^2>2K/R$, the reduced radius cannot turn back while the two conditions hold. This conditional statement is an established derivation on the channel, not a retained-branch claim. Whether any isolated row actually clears the margin is an evolution question and is open.

The consequence sharpens the return-response question to a single named target. A return turn cannot be the first event — any return must be preceded by a violation of sub-field speed or the opposite-polarity floor — so once the margin is cleared on the isolated channel the reduced radius cannot turn back while the row stays sub-field, and retention is possible only through a term that ends sub-field speed first, driving the internal speed to the field-speed hinge where the outward drive stops before the radius can turn. If the anti-damping indications of [Braid Mathematics](braid-mathematics.md#scoped-anti-damping-results) hold, any such transverse pumping feeds escape rather than return, and its only bearing on the certificate is that it pushes the speed toward $c_f$ — the very condition whose failure ends the window. The open target is therefore precise: exhibit an internal or environmental absorber that ends sub-field speed before the margin is crossed. The fold-geometry constraint on single-site absorbers is set out in [Braid Mathematics](braid-mathematics.md#fold-geometry-of-the-click-coincidence-versus-finite-chord); the environmental candidate is the sea-embedding route below.

#### The Sea-Embedding Route

The environmental route embeds the same A2 configuration at rest in a surrounding [Noether sea](../spacetime/noether-sea.md) of like assemblies. This does not define a new taxonomy member; it is the same configuration with like assemblies allowed to supply the environmental response needed for retention. In this reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

The route inherits the return-response question directly: it asks whether the delayed response of a like-assembly population changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. Closing it requires an explicit like-assembly population record, a declared boundary condition, and a sea-response row tied to the same target branch, under the same-record evidence discipline of [Braid Recovery Requirements](braid-recovery-requirements.md). Whether a static like-assembly environment can supply retention, and whether a dynamic, formation-history-driven sea response can do what a static one cannot, are open questions; no environmental verdict is carried in this chapter.

## A1 and A2 Boundary

A1.2 and A2 share equal radii, equal frequencies, and the same three phase values, but they are not identical members:

| Coordinate or role | `A1.2` | `A2` |
| --- | --- | --- |
| Hinge | Binary 2 | None |
| Axial half-separations | $h_1,h_2,h_3$ may differ | One common $h$ |
| Transverse orbit radii | $\rho_1,\rho_2,\rho_3$ may differ | One common $\rho$ |
| Circulation | Inherited A1 value is not yet specified | One common sense |
| Cyclic binary equivalence | Not required | Required |

A1.2 reaches the A2 coordinate locus only when the remaining binary geometries and circulation data also become equal and the distinguished hinge is removed. This is a boundary coincidence between member definitions, not evidence of a physical transition.

## Claim Boundary

The Family-A definitions are prescribed. They would be falsified as EOM-solver branch claims by a same-record evolution showing that the declared coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability rows. Until such a record exists, Family A supplies exact display geometry and explicit closure targets, not a retained physical braid.
