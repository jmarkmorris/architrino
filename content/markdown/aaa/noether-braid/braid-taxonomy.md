# Braid Taxonomy

This chapter describes prescribed Noether braid geometries through explicit coordinates. The taxonomy has three levels: assembly composition, individual braid, and individual binary.

Each taxonomy member receives a neutral identifier consisting of a family letter and a member number, such as `A1`, `A2`, or `B1`. A decimal suffix identifies a constrained variant of a member, such as `A1.1`. The identifier carries no geometric meaning. The member's table entries and Borg depiction define the geometry. Family and member names are optional aliases.

This is a geometry-and-motion taxonomy. It does not establish that a prescribed configuration is generated, retained, or stable under the EOM solver.

## Assembly Composition

Assembly composition describes how complete braid records are combined.

| Coordinate | Meaning |
| --- | --- |
| Braid count $N_{\mathcal B}$ | Number of complete braids in the assembly. |
| Relative braid-center displacement | Position of each braid center relative to the assembly center when $N_{\mathcal B}>1$. |
| Relative orientation | Orientation of each braid record relative to the assembly reference frame. |
| Relative phase | Timing offset between braid records. |
| Relative circulation | Whether the braid records advance with the same or opposite circulation sense. |

## Individual Braid

One Noether braid consists of three neutral binaries. Each binary contains one electrino and one positrino. Other polarity pairings are outside the present taxonomy.

The overarching translation characteristic is the speed of the complete assembly group. Let $\mathbf X_{\mathrm{grp}}(T)$ be the declared translation center of the prescribed assembly group. Its group velocity and group translation speed are

$$
\mathbf V_{\mathrm{grp}}(T)=\frac{d\mathbf X_{\mathrm{grp}}}{dT}
$$

and

$$
s_{\mathrm{grp}}(T)=\left\|\mathbf V_{\mathrm{grp}}(T)\right\|
$$

For a one-braid member, $\mathbf X_{\mathrm{grp}}$ is the declared center of that braid. For a two-braid member, it is the declared center of the complete two-braid assembly. The group translation speed is distinct from the internal orbital speeds of the six architrinos in each braid.

The braid-level record contains this overarching characteristic and the coordinate collections obtained from its three binaries:

| Coordinate collection | Definition |
| --- | --- |
| Group translation speed $s_{\mathrm{grp}}$ | Translation speed of the complete one-braid or two-braid assembly group. |
| Binary midpoint data | The ordered midpoint vectors $(\mathbf c_1,\mathbf c_2,\mathbf c_3)$. A member row may constrain their relation without redefining the individual midpoint coordinate. |
| Axis data | The ordered binary-axis unit vectors $(\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3)$. The vectors are recorded directly without assigning an axis-structure class. |
| Circulation data | The ordered circulation senses of the three binaries. |

Many more braid geometries may be investigated. They are not enumerated here.

## Individual Binary

For binary $a\in\{1,2,3\}$, let the endpoint positions in the Euclidean void be $\mathbf X_{a1}(T)$ and $\mathbf X_{a2}(T)$. Define the binary midpoint and half-separation vector by

$$
\mathbf c_a(T)=\frac{\mathbf X_{a1}(T)+\mathbf X_{a2}(T)}{2}
$$

and

$$
\mathbf d_a(T)=\frac{\mathbf X_{a1}(T)-\mathbf X_{a2}(T)}{2}
$$

Given an oriented binary-axis unit vector $\hat{\mathbf n}_a(T)$, choose the endpoint and axis orientations so that the axial coordinate is nonnegative, and define

$$
h_a(T)=\mathbf d_a(T)\mathbin{\cdot}\hat{\mathbf n}_a(T)
$$

and

$$
\rho_a(T)=\left\|\mathbf d_a(T)-h_a(T)\hat{\mathbf n}_a(T)\right\|
$$

Here $h_a$ is the **axial half-separation**, and $\rho_a$ is the **transverse orbit radius**. The binary radius is the endpoint distance from the binary midpoint:

$$
R_a(T)=\left\|\mathbf d_a(T)\right\|
$$

The axial and transverse coordinates decompose that radius according to

$$
R_a^2(T)=h_a^2(T)+\rho_a^2(T)
$$

Frequency and phase belong to the individual binary. Every binary phase is specified relative to the same braid-level zero point.

The binary coordinate columns are:

| Coordinate | Meaning |
| --- | --- |
| Radius $R_a$ | Endpoint distance from the binary midpoint $\mathbf c_a$. |
| Frequency $f_a$ | Repetition frequency of the prescribed binary motion. |
| Phase $\phi_a$ | Phase of binary $a$ relative to the common braid-level zero point. |

The coordinate limits have direct geometric meanings:

- $\rho_a=0$: both endpoints remain on the binary axis.
- $h_a=0$: both endpoints lie in the plane through $\mathbf c_a$ orthogonal to the binary axis.
- $h_a>0$ and $\rho_a>0$: the endpoints occupy separated transverse orbits around the binary axis.

If a display requires an angular coordinate, it may derive

$$
\alpha_a(T)=\operatorname{atan2}\!\left(h_a(T),\rho_a(T)\right)
$$

This angle is not a primary taxonomy coordinate.

Only rigid time dependence is considered in the taxonomy table as an idealized characteristic. Other possible time dependences, including breathing, precession, and other deformations, lie outside its present scope.

## Family A: Noether Core

Family A is the original Noether core geometry. Its member distinctions and symmetry relationships are developed in [Braid Family A](braid-family-a.md). Let $\hat{\mathbf n}_a^{(0)}$ denote its three binary axes at the near-rest endpoint. These axes are mutually orthogonal:

$$
\hat{\mathbf n}_a^{(0)}\mathbin{\cdot}\hat{\mathbf n}_b^{(0)}=\delta_{ab}
$$

The near-rest axes define the equal-component braid direction

$$
\hat{\mathbf u}_A
=
\frac{
\hat{\mathbf n}_1^{(0)}
+
\hat{\mathbf n}_2^{(0)}
+
\hat{\mathbf n}_3^{(0)}
}{\sqrt3}
$$

Family A translates along this direction:

$$
\mathbf V_{\mathrm{grp}}(T)
=
s_{\mathrm{grp}}(T)\hat{\mathbf u}_A
$$

Let $\lambda_A\in[0,1]$ denote the prescribed Family-A flattening coordinate. The near-rest endpoint is $\lambda_A=0$. As $\lambda_A$ increases, the three binary axes converge toward the translation direction. The flat endpoint is

$$
\hat{\mathbf n}_1(1)
=
\hat{\mathbf n}_2(1)
=
\hat{\mathbf n}_3(1)
=
\hat{\mathbf u}_A
$$

The combined binary envelope is nearly spherical at the near-rest endpoint in a weak-gradient deep-space environment. Increasing group translation speed or gravitational gradient increases $\lambda_A$, compresses the envelope along $\hat{\mathbf u}_A$, and makes the envelope increasingly oblate. The event-horizon response endpoint and the photon-channel response endpoint use the flat limit $\lambda_A=1$. These endpoint assignments are prescribed Family-A taxonomy; deriving the response path and either physical channel from an EOM-solver record remains open.

`A1` is the general Family-A member. Its binary indices are ordered by radius,

$$
0<R_1<R_2<R_3,
$$

so binary 1 is inner, binary 2 is middle, and binary 3 is outer. A1 allows three independently assigned binary frequencies and assigns the middle binary, binary 2, the hinge role. A constrained variant `A1.x` inherits these Family-A and A1 characteristics except where its row explicitly replaces them.

`A2` is the fully symmetric Family-A member. It has no distinguished hinge. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. Thus a $120^\circ$ rotation about $\hat{\mathbf u}_A$ cyclically permutes the three binaries without selecting one of them.

## Family B: Coincident Binary Axes

Family B contains one-braid members whose three binary axes coincide. Its exact path geometry and coordinate boundaries are developed in [Braid Family B](braid-family-b.md). The B1 chart uses one common binary midpoint at the braid center,

$$
\mathbf c_1(T)
=
\mathbf c_2(T)
=
\mathbf c_3(T)
=
\mathbf X_{\mathrm{grp}}(T),
$$

and one common oriented axis:

$$
\hat{\mathbf n}_1
=
\hat{\mathbf n}_2
=
\hat{\mathbf n}_3
=
\hat{\mathbf n}_B
$$

`B1` is the rigid common-frequency member. Its binaries may have different radii, axial half-separations, transverse orbit radii, and phases, but share one midpoint, one axis, one frequency, and one circulation sense. The coincident-axis relation distinguishes Family B from Family A; the family identifier does not assert that either geometry is dynamically retained.

Family A and Family B meet on a boundary. Every Family-A member reaches the coincident-axis relation at $\lambda_A=1$; a common-frequency Family-A variant with one common circulation sense and coincident binary midpoints also occupies the B1 coordinate locus at that endpoint. This geometric coincidence does not identify the two families away from the boundary.

## Family C: Two-Braid Composition

Family C contains assemblies made from two complete `B1` braids. Its exact composition chart, twelve endpoint paths, derived axis offset, and physical-mapping boundary are developed in [Braid Family C](braid-family-c.md). The relative braid-center displacement, relative orientation, and relative phase remain explicit assembly coordinates.

`C1` is the co-rotating member: the two component braids have the same circulation sense. `C2` is the counter-rotating member: the two component braids have opposite circulation senses. These members define prescribed composition classes only; they do not assert a binding or retention mechanism.

## Master Tables

The first three tables carry the geometry. The fourth table supplies optional names, source-record routing, Borg routing, and brief explanation. A constrained variant appears only in the tables whose values it changes. In every other table, it inherits the row of its parent member. Thus `A1.2` uses the `A1` assembly and braid rows together with the `A1.2` binary and navigation rows. `NA` means not applicable.

### Assembly Composition Master Table

| Member ID | Braid count | Relative braid-center displacement | Relative orientation | Relative phase | Relative circulation |
| --- | --- | --- | --- | --- | --- |
| `A1` | 1 | NA | NA | NA | NA |
| `A2` | 1 | NA | NA | NA | NA |
| `B1` | 1 | NA | NA | NA | NA |
| `C1` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Same |
| `C2` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Opposite |

### Individual Braid Master Table

| Member ID | Braid index | Component member | Group translation speed | Binary-midpoint relation | Axis relation | Distinguished direction | Hinge binary | Common phase zero | Circulation data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | A1 | Variable $s_{\mathrm{grp}}$ | Unconstrained | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | 2 | $T=0$ | Not yet specified |
| `A2` | 1 | A2 | Variable $s_{\mathrm{grp}}$ | Unconstrained | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | None | $T=0$ | One common sense |
| `B1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | $\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B$ | $\hat{\mathbf n}_B$ | None | $T=0$ | One common sense |
| `C1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | None | $T=0$ | Common sense $q$ |
| `C1` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | None | $T=0$ | Common sense $q$ |
| `C2` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | None | $T=0$ | Sense $q$ |
| `C2` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | None | $T=0$ | Sense $-q$ |

### Individual Binary Master Table

Within `A1`, the symbols $R_1,R_2,R_3$ obey $0<R_1<R_2<R_3$ and identify the inner, middle, and outer binaries respectively. A repeated symbol $R$ or $f$ declares equality across the corresponding rows. Unconstrained phases remain $\phi_1,\phi_2,\phi_3$. The $h_a$ and $\rho_a$ columns carry the axial and transverse decomposition of $R_a$ defined above. Family-C members inherit the individual-binary rows of their two B1 components.

| Member ID | Braid index | Binary index | Radius | Axial half-separation | Transverse orbit radius | Frequency | Phase |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f_1$ | $\phi_1$ |
| `A1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f_2$ | $\phi_2$ |
| `A1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f_3$ | $\phi_3$ |
| `A1.1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `A1.1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `A1.1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A1.2` | 1 | 1 | $R$ | $h_1$ | $\rho_1$ | $f$ | $0$ |
| `A1.2` | 1 | 2 | $R$ | $h_2$ | $\rho_2$ | $f$ | $2\pi/3$ |
| `A1.2` | 1 | 3 | $R$ | $h_3$ | $\rho_3$ | $f$ | $4\pi/3$ |
| `A1.3` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $4f$ | $\phi_1$ |
| `A1.3` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A1.3` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A1.4` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $3f$ | $\phi_1$ |
| `A1.4` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A1.4` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A2` | 1 | 1 | $R$ | $h$ | $\rho$ | $f$ | $0$ |
| `A2` | 1 | 2 | $R$ | $h$ | $\rho$ | $f$ | $2\pi/3$ |
| `A2` | 1 | 3 | $R$ | $h$ | $\rho$ | $f$ | $4\pi/3$ |
| `B1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `B1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `B1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |

### Naming and Navigation Master Table

Family and member names are optional aliases. The Description column may aid navigation, but it does not define the geometry and must not introduce a characteristic absent from the first three master tables.

| Member ID | Family name | Member name | Geometry record | Borg depiction | Description |
| --- | --- | --- | --- | --- | --- |
| `A1` | Noether core | General three-radius hinge | Not yet assigned | Not yet assigned | General Family-A member with pairwise different radii, independently assignable frequencies, and binary 2 in the hinge role. |
| `A1.1` | Noether core | Equal-frequency unequal-radius | Not yet assigned | Not yet assigned | A1 constrained to one common binary frequency while retaining three different radii. |
| `A1.2` | Noether core | Equal-frequency equal-radius | Not yet assigned | Not yet assigned | A1 constrained to equal radii, equal frequencies, and phases separated by $120^\circ$. |
| `A1.3` | Noether core | 4:2:1-frequency unequal-radius | Not yet assigned | Not yet assigned | A1 constrained to the ordered frequency ratio $f_1:f_2:f_3=4:2:1$. |
| `A1.4` | Noether core | 3:2:1-frequency unequal-radius | Not yet assigned | Not yet assigned | A1 constrained to the ordered frequency ratio $f_1:f_2:f_3=3:2:1$. |
| `A2` | Noether core | Fully symmetric no-hinge | Not yet assigned | Not yet assigned | Three equivalent binaries with equal geometry, equal frequencies, $120^\circ$ phase spacing, one circulation sense, and no distinguished hinge. |
| `B1` | Coincident binary axes | Rigid common-frequency | Not yet assigned | Not yet assigned | One braid with one common binary midpoint, coincident binary axes, one common frequency, and one common circulation sense. |
| `C1` | Two-braid composition | Co-rotating B1 pair | Not yet assigned | Not yet assigned | Two complete B1 braids with a common circulation sense and explicit relative placement, orientation, and phase. |
| `C2` | Two-braid composition | Counter-rotating B1 pair | Not yet assigned | Not yet assigned | Two complete B1 braids with opposite circulation senses and explicit relative placement, orientation, and phase. |
