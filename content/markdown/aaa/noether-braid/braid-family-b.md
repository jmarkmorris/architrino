# Braid Family B

Family B contains prescribed one-braid geometries whose three binary axes are the same oriented line. The canonical coordinates and master-table rows are defined in [Braid Taxonomy](braid-taxonomy.md#family-b-coincident-binary-axes). This chapter gives the exact B1 path geometry, its coordinate boundaries, and its intersection with Family A.

Family B is a geometry-and-motion definition. It does not establish that a B1 record is generated, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](braid-recovery-requirements.md).

## Shared Family-B Geometry

Every Family-B member is one complete Noether braid composed of three neutral binaries. The binaries share one oriented axis $\hat{\mathbf n}_B$. The source-defined B1 chart also gives them one common midpoint, the braid center $\mathbf C(T)$.

Choose transverse unit vectors $\hat{\mathbf e}_1$ and $\hat{\mathbf e}_2$ so that $(\hat{\mathbf e}_1,\hat{\mathbf e}_2,\hat{\mathbf n}_B)$ is an orthonormal frame. For binary $a\in\{1,2,3\}$, define

$$
\theta_a(T)=q\,2\pi fT+\phi_a,
\qquad
q\in\{+1,-1\},
$$

where $f$ is the common frequency, $\phi_a$ is the binary phase relative to the braid-level zero point, and $q$ is the common circulation sense. The binary half-separation vector is

$$
\mathbf d_a(T)
=
h_a\hat{\mathbf n}_B
+
\rho_a
\left[
\cos\theta_a(T)\hat{\mathbf e}_1
+
\sin\theta_a(T)\hat{\mathbf e}_2
\right].
$$

The two endpoint paths are

$$
\mathbf X_{a1}(T)=\mathbf C(T)+\mathbf d_a(T),
\qquad
\mathbf X_{a2}(T)=\mathbf C(T)-\mathbf d_a(T).
$$

These equations make the B1 restrictions explicit: the endpoints of each neutral binary remain antipodal about the common braid center; all three binaries use the same axis, frequency, and circulation sense; and the radii, axial half-separations, transverse orbit radii, and phases may differ by binary.

The radius decomposition $R_a^2=h_a^2+\rho_a^2$ is defined in the [Individual Binary](braid-taxonomy.md#individual-binary) coordinate section. The internal speed of either endpoint of binary $a$ is

$$
s_a=2\pi f\rho_a.
$$

Thus internal speed is controlled by transverse orbit radius rather than by total binary radius alone. If a display derives the optional angle $\alpha_a=\operatorname{atan2}(h_a,\rho_a)$, the same relation is $s_a=2\pi fR_a\cos\alpha_a$. The angle is not a primary taxonomy coordinate.

## B1

B1 is the rigid common-frequency member of Family B. Its member-level constraints are:

| Coordinate or relation | B1 value |
| --- | --- |
| Braid count | One |
| Binary midpoints | One common braid center $\mathbf C(T)$ |
| Binary axes | $\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B$ |
| Frequency | One common $f$ |
| Circulation | One common sense $q$ |
| Radii | $R_1,R_2,R_3$ independently assignable |
| Axial half-separations | $h_1,h_2,h_3$ independently assignable subject to each radius decomposition |
| Transverse orbit radii | $\rho_1,\rho_2,\rho_3$ independently assignable subject to each radius decomposition |
| Phases | $\phi_1,\phi_2,\phi_3$ independently assignable relative to the common zero point |

Rigid here means that the declared $R_a$, $h_a$, $\rho_a$, $f$, $\phi_a$, frame, and circulation sense do not change during the prescribed record. It is a kinematic restriction, not an EOM-solver rigidity result.

### B1 Catalog Members

The live Borg catalog assigns decimal member identifiers to three prescribed B1 coordinate selections. All three inherit the B1 common midpoint, coincident axis, common frequency, and common circulation relations:

| Member ID | Coordinate selection |
| --- | --- |
| `B1.1` | Interior reference: $h_a>0$ and $\rho_a>0$ for every binary. |
| `B1.2` | High-axial interior: $h_a>\rho_a>0$ for every binary. |
| `B1.3` | All-equatorial boundary: $h_a=0$ and $\rho_a=R_a$ for every binary. |

These identifiers distinguish the catalog records; they do not replace B1 as the parent member inherited by Family-C component braids.

An active B1 candidate must contain nonzero transverse internal motion. Define the transverse-motion magnitude

$$
\mathcal K_{\perp}
=
\sum_{a=1}^{3}s_a^2
=
(2\pi f)^2\sum_{a=1}^{3}\rho_a^2
$$

for the declared common frequency $f>0$. Active-candidate eligibility requires

$$
\mathcal K_{\perp}>0
$$

or, equivalently, $\sum_a\rho_a^2>0$. This is a taxonomy nondegeneracy condition: it requires at least one binary to have internal transverse motion. It is not a retention, stability, binding, energy, or physical-realization result.

## Coordinate Boundaries

The equatorial and axial depictions are coordinate boundaries of B1, not separately identified braid families. Each binary can reach either boundary independently:

| Boundary locus | Coordinate condition | Endpoint motion |
| --- | --- | --- |
| Equatorial | $h_a=0$, $\rho_a=R_a$ | The endpoints traverse one circle in the plane through $\mathbf C(T)$ orthogonal to $\hat{\mathbf n}_B$. |
| Axial | $\rho_a=0$, $h_a=R_a$ | The endpoints remain on the common axis and have zero internal orbital speed. |
| Interior | $h_a>0$, $\rho_a>0$ | The endpoints traverse separated transverse circles on opposite sides of the braid center. |

The B1.3 all-equatorial display sets $h_a=0$ for all three binaries. Mixed boundary records are also permitted by the B1 coordinates and remain active-candidate eligible when at least one $\rho_a$ is nonzero.

At an axial locus, $\phi_a$ and $f$ remain prescribed record labels but no longer change that binary's endpoint positions because its transverse orbit radius is zero. Two axial records that differ only in those labels therefore depict the same path geometry unless another retained record gives the labels an independent dynamical role.

### Deprecated Axial-Limit Control

The former catalog identifier `B1.4` selected the all-axial limit

$$
\rho_a=0,
\qquad
h_a=R_a
\qquad
\text{for every }a\in\{1,2,3\}.
$$

Its endpoint paths remain the exact B1 coordinate-boundary equations

$$
\mathbf X_{a1}(T)
=
\mathbf C(T)+R_a\hat{\mathbf n}_B,
\qquad
\mathbf X_{a2}(T)
=
\mathbf C(T)-R_a\hat{\mathbf n}_B.
$$

This limit has $\mathcal K_{\perp}=0$: frequency, phase, and circulation labels do not create internal motion, and translation of $\mathbf C(T)$ only transports the static axial arrangement. The stable `B1.4` identifier and its prescribed source and record remain a deprecated axial-limit null control for historical reproducibility. It is not an active taxonomy member, a Borg catalog selection, a future sweep candidate, or a comparative-ranking participant.

## Axial Translation

When the braid center translates along the common axis at constant group speed,

$$
\mathbf C(T)
=
\mathbf C(0)+s_{\mathrm{grp}}T\hat{\mathbf n}_B,
$$

each non-axial endpoint follows an exact screw path: axial translation plus circular motion about the same axis. The axial and transverse velocity components are orthogonal, so the exact site-speed split is the channel kinematics developed in [Braid Mathematics](braid-mathematics.md#transverse-internal-motion-speed-budget-lemma). A mechanism that fixes the total speed budget remains an open branch hypothesis.

Axial translation is a B1 specialization, not a Family-B requirement. A record whose group velocity is not parallel to $\hat{\mathbf n}_B$ retains the same internal B1 geometry but is not an axial screw path.

## Boundary with Family A

Family A and Family B share a coordinate boundary. At $\lambda_A=1$, the three Family-A axes coincide with the Family-A translation direction. A common-frequency Family-A record with one common circulation sense then satisfies the B1 axis, frequency, and circulation relations. It reaches the source-defined common-center B1 chart only if its three binary midpoints also coincide with the braid center.

The A2 face-opposite seed supplies a second exact overlap: rigid rotation about its body diagonal occupies the [cyclic-symmetric A2/B1 sublocus](braid-b1-symmetry.md#cyclic-symmetric-a2b1-overlap), independently of $\lambda_A=1$. These overlaps are coordinate-locus statements. They do not identify Family A with Family B away from the shared loci and do not establish a physical transition between them.

## Claim Boundary

The B1 equations define prescribed paths exactly. They would be falsified as EOM-solver branch claims by a same-record evolution showing that the common-axis, common-frequency, common-center, or rigid-coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability records. Until such evidence exists, B1 supplies an exact display geometry and explicit closure targets, not a retained physical braid.
