# Braid Family A

Family A contains prescribed one-braid geometries whose three binary axes are mutually orthogonal at the near-rest endpoint and converge toward the group-translation direction as the prescribed flattening coordinate increases. The canonical coordinates, response endpoints, and master-table rows are defined in [Braid Taxonomy](braid-taxonomy.md#family-a-noether-core). This chapter explains how those coordinates distinguish A1, A2, A3, and their constrained loci.

Family A is a geometry-and-motion definition. It does not establish that an A1, A2, or A3 record is generated, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](braid-recovery-requirements.md).

## Shared Family-A Geometry

Every Family-A member is one complete Noether braid composed of three neutral binaries. Each binary contains one electrino and one positrino. The three binary midpoints coincide with the braid center. The binaries share a braid-level phase zero, while radius, axial half-separation, transverse orbit radius, frequency, phase, and circulation are binary coordinates.

At the near-rest endpoint, the three binary axes are mutually orthogonal. Their equal-component direction is the Family-A translation direction. The complete braid translates along that direction, and its group speed is distinct from the internal architrino speeds.

Every Family-A Borg catalog representative uses this near-rest endpoint: $\lambda_A=0$, source axes along $x$, $y$, and $z$, and corresponding binary orbit planes yz, xz, and xy. This prescribed display selection does not remove the intermediate and flat response geometries from the wider Family-A taxonomy.

The prescribed flattening coordinate $\lambda_A$ connects two endpoint geometries:

| $\lambda_A$ | Binary-axis relation | Envelope description |
| --- | --- | --- |
| $0$ | Three mutually orthogonal axes | Nearly spherical near-rest endpoint in the declared weak-gradient environment. |
| $0 < \lambda_A < 1$ | Three axes converging toward the translation direction | Increasingly oblate intermediate geometry. |
| $1$ | Three coincident axes along the translation direction | Flat Family-A response geometry used as prescribed input in event-horizon and photon-channel response studies. |

This response is prescribed taxonomy. An EOM-solver derivation of the path through these geometries, including either physical endpoint assignment, remains open.

The coincident-axis endpoint is also a geometric boundary with Family B. A Family-A record does not become a Family-B record away from that boundary, and coincidence at one endpoint does not establish a shared dynamical branch.

## A1

A1 is the zero-axial-offset Family-A member. Its indices $a\in\{1,2,3\}$ are persistent record identities. They are not assigned by sorting the radii, frequencies, speeds, or later dynamical roles. The radii are independently assignable positive coordinates, and equal values are permitted. The three frequencies are likewise independently assignable.

For every A1 binary,

$$
\mathbf c_a(T)=\mathbf X_{\mathrm{grp}}(T),
\qquad
h_a=0,
\qquad
\rho_a=R_a.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-a1527409c4a34726)

The two architrinos therefore remain antipodal while traversing the same geometric circle, whose center is the braid center. The three binary circles need not share one plane: at the near-rest endpoint their plane normals are the three mutually orthogonal Family-A axes.

A1 does not require the exact cyclic binary-permutation symmetry of A2. When its binary coordinates differ, a spatial rotation cannot map one binary onto another with different geometry. An integer frequency ratio can make the full prescribed figure repeat after a common period, but it does not by itself establish spatial equivalence.

### A1 Constrained Variants

Each constrained variant inherits A1's persistent binary indices, common braid center, and zero axial half-separation unless its master-table row explicitly replaces another coordinate:

| Member | Added constraint | What remains inherited |
| --- | --- | --- |
| `A1.1` | One common frequency. | Independently assignable radii and phases; $h_a=0$ and $\rho_a=R_a$. |
| `A1.2` | Equal radii, one common frequency, and phases $0$, $2\pi/3$, and $4\pi/3$. | The shared zero-axial-offset relation remains fixed. |
| `A1.3` | Indexed frequency ratio $f_1:f_2:f_3=4:2:1$. | Independently assignable radii and unconstrained phases; the ratio does not order the radii. |
| `A1.4` | Indexed frequency ratio $f_1:f_2:f_3=3:2:1$. | Independently assignable radii and unconstrained phases; the ratio does not order the radii. |

The exact radius, frequency, phase, axial-half-separation, and transverse-orbit-radius rows are carried only by the [Individual Binary Master Table](braid-taxonomy.md#individual-binary-master-table).

## A2

A2 is the fully symmetric Family-A member. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. No binary is distinguished. A $120^\circ$ rotation about the Family-A translation direction cyclically permutes the three binaries.

An exact near-rest reference fixture places the three binary axes on an orthonormal frame. At one common reference time, each positrino lies at distance $R$ from the braid center along one positive frame axis and its electrino partner lies at the antipodal point. This is the face-opposite seed used by the invariant-channel analysis in [A2 Symmetry and Return Response](braid-a2-symmetry-and-return-response.md#invariant-channels-and-equivariant-reductions).

The fixture is one exact A2 representative, not the whole A2 coordinate space. At that reference instant it uses axial half-separation $h=R$ and transverse orbit radius $\rho=0$. In the taxonomy motion about each binary's own fixed axis, that snapshot is static because $\rho=0$; the body-diagonal rotating channel is a distinct prescribed motion of the same six positions. The A2 taxonomy permits any common pair $(h,\rho)$ satisfying the binary-radius relation, provided all three binaries share that geometry and the other A2 constraints.

The member-specific symmetry lemma, reduced channels, two-ring geometry, axial polarity-dipole identity, momentum-screw alignment, and retention questions are developed in [A2 Symmetry and Return Response](braid-a2-symmetry-and-return-response.md). Those results constrain the fixture under their stated assumptions; they do not certify A2 retention.

## A3

A3 is the general axial-decomposition Family-A member. It retains the common braid center and persistent binary identities of A1 while permitting each binary to carry its own nonnegative axial half-separation and transverse orbit radius:

$$
R_a^2=h_a^2+\rho_a^2.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7e6f31f81fbb0c72)

For endpoint sign $\sigma\in\{+1,-1\}$, the center of the endpoint's circular path is

$$
\mathbf O_{a,\sigma}(T)
=
\mathbf X_{\mathrm{grp}}(T)
+
\sigma h_a\hat{\mathbf n}_a.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-d58d2d8ae9db1d0c)

Thus $h_a>0$ separates the two endpoint orbit centers by $2h_a\hat{\mathbf n}_a$, even though the endpoint positions remain antipodal about the binary midpoint at every common time. A3 permits $h_a=0$, so A1 is its exact zero-axial-offset subset rather than a disjoint class.

### A3 Constrained Variants

The A3 suffixes carry the same frequency, radius, and phase restrictions as the corresponding A1 suffixes, while retaining independently assignable axial/transverse decompositions:

| Member | Added constraint | What remains inherited |
| --- | --- | --- |
| `A3.1` | One common frequency. | Independently assignable radii, decompositions, and phases. |
| `A3.2` | Equal radii, one common frequency, and phases $0$, $2\pi/3$, and $4\pi/3$. | The axial and transverse decompositions may differ among binaries. |
| `A3.3` | Indexed frequency ratio $f_1:f_2:f_3=4:2:1$. | Independently assignable radii, decompositions, and unconstrained phases. |
| `A3.4` | Indexed frequency ratio $f_1:f_2:f_3=3:2:1$. | Independently assignable radii, decompositions, and unconstrained phases. |

For every shared suffix $n\in\{1,2,3,4\}$,

$$
A1.n=A3.n\mathbin{\cap}\{h_1=h_2=h_3=0\}.
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-63d084e7f4c1ef0c)

## A1, A2, and A3 Relations

A1.2, A2, and A3.2 share equal radii, equal frequencies, and the same three phase values, but they are not identical members:

| Coordinate or relation | `A1.2` | `A2` | `A3.2` |
| --- | --- | --- | --- |
| Axial half-separations | $h_1=h_2=h_3=0$ | One common $h$ | $h_1,h_2,h_3$ may differ |
| Transverse orbit radii | $\rho_1=\rho_2=\rho_3=R$ | One common $\rho$ | $\rho_1,\rho_2,\rho_3$ may differ |
| Circulation | Inherited A1 value is not yet specified | One common sense | Inherited A3 value is not yet specified |
| Cyclic binary equivalence | Not required | Required | Not required |

A1.2 is the $h=0$ locus of A3.2. A2 occupies the cyclically symmetric locus of A3 and intersects A1 when its common geometry also has $h=0$. These coordinate coincidences do not establish a physical transition.

## Claim Boundary

The Family-A definitions are prescribed. They would be falsified as EOM-solver branch claims by a same-record evolution showing that the declared coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability rows. Until such a record exists, Family A supplies exact display geometry and explicit closure targets, not a retained physical braid.
