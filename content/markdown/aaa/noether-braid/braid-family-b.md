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

[View →](../../../../equation-mapping.html#corpus-equation-54d313539812c1d4)

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

[View →](../../../../equation-mapping.html#corpus-equation-04282641cf34ccfa)

The two endpoint paths are

$$
\mathbf X_{a1}(T)=\mathbf C(T)+\mathbf d_a(T),
\qquad
\mathbf X_{a2}(T)=\mathbf C(T)-\mathbf d_a(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-be542cb4c4f261ed)

These equations make the B1 restrictions explicit: the endpoints of each neutral binary remain antipodal about the common braid center; all three binaries use the same axis, frequency, and circulation sense; and the radii, axial half-separations, transverse orbit radii, and phases may differ by binary.

The radius decomposition $R_a^2=h_a^2+\rho_a^2$ is defined in the [Individual Binary](braid-taxonomy.md#individual-binary) coordinate section. The internal speed of either endpoint of binary $a$ is

$$
s_a=2\pi f\rho_a.
$$

[View →](../../../../equation-mapping.html#corpus-equation-9436c6e91de8ff69)

Thus internal speed is controlled by transverse orbit radius rather than by total binary radius alone. If a display derives the optional angle $\alpha_a=\operatorname{atan2}(h_a,\rho_a)$, the same relation is $s_a=2\pi fR_a\cos\alpha_a$. The angle is not a primary taxonomy coordinate.

## B1

B1 is the fixed-coordinate common-frequency co-rotating member of Family B. Its member-level constraints are:

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

Fixed-coordinate here means that the declared $R_a$, $h_a$, $\rho_a$, $f$, $\phi_a$, frame, and circulation sense do not change during the prescribed record. The architrinos still move on their declared orbits. This is a prescribed-chart restriction, not evidence that the EOM solver retains the assembly.

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

[View →](../../../../equation-mapping.html#corpus-equation-203e10f143bbff54)

for the declared common frequency $f>0$. Active-candidate eligibility requires

$$
\mathcal K_{\perp}>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-b841a65a4eff2317)

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

### Equal-Radius Phase-Symmetric Acceleration-Balance Locus

One exact B1.3 sublocus sets $R_1=R_2=R_3=R$ and assigns the three binary phases $0$, $2\pi/3$, and $4\pi/3$. Each binary has antipodal opposite-polarity endpoints. The six endpoints therefore form a regular hexagon with alternating polarities while sharing one center, one axis, one angular rate, and one circulation sense.

For the default uncapped Master Equation with $c_f=1$, a complete-root circular-path calculation gives the dimensionless speed $\beta_f=2.974307176117306$ and compatible scale $R/R_*=0.5617317000713459$, where $R_*=\kappa\epsilon^2/c_f^2$.

The measured 72-root directed ledger includes every nontrivial same-transmitter root and excludes only the coincident self root. Its maximum radial, tangential, axial, and full-vector prescribed-acceleration residuals are respectively $3.2862601528904634\times10^{-14}$, $6.88338275267597\times10^{-14}$, $0$, and $7.62510728881475\times10^{-14}$. Tightening the root tolerance preserves the root topology and gives maximum full-vector residual $4.500069559058899\times10^{-12}$; the minimum Jacobian floor is $0.11680602873827528$. An independently authored generic prescribed-history evaluator checks the cross-transmitter roots and acceleration contributions, while an independently authored circular-binary evaluator checks the nontrivial same-transmitter roots. Rotational covariance is checked both algebraically and over a full cycle.

Plainly: at this one regular hexagonal point, every architrino receives the inward acceleration required by its prescribed circle, with no measurable tangential or out-of-plane remainder. The complete equal-radius chart with unequal binary phases remains unresolved, as does the broader B1.3 chart with unequal radii. This is prescribed acceleration balance, not retention, binding, stability, release survival, physical identity, or scientific acceptance.

### Deprecated Axial-Limit Control

The former catalog identifier `B1.4` selected the all-axial limit

$$
\rho_a=0,
\qquad
h_a=R_a
\qquad
\text{for every }a\in\{1,2,3\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-fdb492c8ebf10b7a)

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

[View →](../../../../equation-mapping.html#corpus-equation-ebaf153c4e2667f7)

This limit has $\mathcal K_{\perp}=0$: frequency, phase, and circulation labels do not create internal motion, and translation of $\mathbf C(T)$ only transports the static axial arrangement. The stable `B1.4` identifier and its prescribed source and record remain a deprecated axial-limit null control for historical reproducibility. It is not an active taxonomy member, a Borg catalog selection, a future sweep candidate, or a comparative-ranking participant.

## Axial Translation

When the braid center translates along the common axis at constant group speed,

$$
\mathbf C(T)
=
\mathbf C(0)+s_{\mathrm{grp}}T\hat{\mathbf n}_B,
$$

[View →](../../../../equation-mapping.html#corpus-equation-b1c5b16e8a9576b1)

each non-axial endpoint follows an exact screw path: axial translation plus circular motion about the same axis. The axial and transverse velocity components are orthogonal, so the exact site-speed split is the channel kinematics developed in [Braid Mathematics](braid-mathematics.md#transverse-internal-motion-speed-budget-lemma). A mechanism that fixes the total speed budget remains an open branch hypothesis.

Axial translation is a B1 specialization, not a Family-B requirement. A record whose group velocity is not parallel to $\hat{\mathbf n}_B$ retains the same internal B1 geometry but is not an axial screw path.

## Boundary with Family A

Family A and Family B share a coordinate boundary. At $\lambda_A=1$, the three Family-A axes coincide with the Family-A translation direction. A common-frequency Family-A record with one common circulation sense then satisfies the B1 axis, frequency, and circulation relations. It reaches the source-defined common-center B1 chart only if its three binary midpoints also coincide with the braid center.

The A2 face-opposite seed supplies a second exact overlap: common-frequency co-rotation about its body diagonal occupies the [cyclic-symmetric A2/B1 sublocus](braid-b1-symmetry.md#cyclic-symmetric-a2b1-overlap), independently of $\lambda_A=1$. These overlaps are coordinate-locus statements. They do not identify Family A with Family B away from the shared loci and do not establish a physical transition between them.

## Claim Boundary

The B1 equations define prescribed paths exactly. The equal-radius phase-symmetric B1.3 locus above also satisfies prescribed acceleration balance under the stated complete-root calculation. These statements would be falsified as EOM-solver branch claims by a same-record evolution showing that the common-axis, common-frequency, common-center, or fixed-coordinate relations cannot be retained under the required causal-root, acceleration, action, and stability records. B1 therefore supplies exact display geometry, one acceleration-balanced prescribed sublocus, and explicit closure targets, not a retained physical braid.
