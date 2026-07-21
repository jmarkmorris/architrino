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
