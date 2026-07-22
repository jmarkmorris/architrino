# Braid Taxonomy

This chapter describes prescribed Noether braid geometries through explicit coordinates. The taxonomy has three levels: assembly composition, individual braid, and individual binary.

Each taxonomy member receives a neutral identifier consisting of a family letter and a member number, such as `A1`, `A2`, `A3`, or `B1`. A decimal suffix identifies a constrained variant of a member, such as `A1.1` or `B1.1`. The identifier carries no geometric meaning. The member's table entries and Borg depiction define the geometry. Family and member names are optional aliases.

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

`A1` is the zero-axial-offset Family-A member. All three binary midpoints coincide with the braid center, and each binary has

$$
\mathbf c_a(T)=\mathbf X_{\mathrm{grp}}(T),
\qquad
h_a=0,
\qquad
\rho_a=R_a.
$$

Thus the electrino and positrino of binary $a$ traverse the same geometric circle in the plane through the braid center orthogonal to $\hat{\mathbf n}_a$, while occupying antipodal points at every common time. The phrase "same plane" applies within each binary; the three Family-A binary planes remain distinct whenever their axes are distinct.

The A1 indices $a\in\{1,2,3\}$ are persistent record identities, not a sorting by radius, frequency, speed, or any derived dynamical role. Their radii satisfy

$$
R_a>0,
\qquad
a\in\{1,2,3\},
$$

and may be assigned independently, including equal values. The three frequencies are also independently assignable. If an evolved branch later supplies a field-speed carrier, a boundary-leading path, or another distinguished role, that role is a diagnostic derived from the branch record and does not relabel the binaries.

`A2` is the fully symmetric Family-A member. Its three binaries have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, one circulation sense, and phases separated by $120^\circ$. Thus a $120^\circ$ rotation about $\hat{\mathbf u}_A$ cyclically permutes the three binaries without selecting one of them.

`A3` is the general axial-decomposition Family-A member. Its three binary midpoints coincide with the braid center, while each persistent binary independently carries nonnegative $h_a$ and $\rho_a$ satisfying $R_a^2=h_a^2+\rho_a^2$. When $h_a>0$ and $\rho_a>0$, the two endpoint orbit centers are separated by $2h_a\hat{\mathbf n}_a$. A1 is the exact zero-axial-offset subset of A3:

$$
A1.n
=
A3.n\mathbin{\cap}
\left\{
h_1=h_2=h_3=0,
\quad
\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}
\right\}
$$

for each shared constrained-variant suffix $n\in\{1,2,3,4\}$. The unsuffixed A1 member is the corresponding zero-axial-offset subset of unsuffixed A3. A2 is selected by its cyclic symmetry constraints and occupies a symmetric locus within the A3 coordinate space; it is not renamed by this subset relation.

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

The four current Borg selections are `B1.1`, the interior reference with $h_a>0$ and $\rho_a>0$; `B1.2`, the high-axial interior selection with $h_a>\rho_a>0$; `B1.3`, the all-equatorial boundary with $h_a=0$ and $\rho_a=R_a$; and `B1.4`, the all-axial boundary with $\rho_a=0$ and $h_a=R_a$. Each inherits every other B1 relation.

Family A and Family B meet on a boundary. Every Family-A member reaches the coincident-axis relation at $\lambda_A=1$; a common-frequency Family-A variant with one common circulation sense and coincident binary midpoints also occupies the B1 coordinate locus at that endpoint. This geometric coincidence does not identify the two families away from the boundary.

## Family C: Two-Braid Composition

Family C contains assemblies made from two complete `B1` braids. Its exact composition chart, twelve endpoint paths, derived axis offset, and physical-mapping boundary are developed in [Braid Family C](braid-family-c.md). The relative braid-center displacement, relative orientation, and relative phase remain explicit assembly coordinates.

`C1` is the co-rotating member: the two component braids have the same circulation sense. `C2` is the counter-rotating member: the two component braids have opposite circulation senses. `C1.1` and `C2.1` constrain both component braids to B1.3, so every binary in both components lies on the all-equatorial boundary $h_{ba}=0$ and $\rho_{ba}=R_{ba}$. Their component axes are coaxial, and their centers are separated along the common oriented axis by the positive coordinate $d_C$:

$$
\hat{\mathbf n}_2=\hat{\mathbf n}_1=\hat{\mathbf n}_C,
\qquad
\Delta\mathbf C=d_C\hat{\mathbf n}_C,
\qquad
d_C>0.
$$

These members define prescribed composition classes only; they do not assert a binding or retention mechanism.

## Master Tables

The first three tables carry the geometry. The fourth table supplies optional names, source-record routing, Borg routing, and brief explanation. A constrained variant appears only in the tables whose values it changes. In every other table, it inherits the row of its parent member. Thus `A1.2` uses the `A1` assembly and braid rows together with the `A1.2` binary and navigation rows, while `A3.2` inherits from `A3`. `NA` means not applicable.

### Assembly Composition Master Table

| Member ID | Braid count | Relative braid-center displacement | Relative orientation | Relative phase | Relative circulation |
| --- | --- | --- | --- | --- | --- |
| `A1` | 1 | NA | NA | NA | NA |
| `A2` | 1 | NA | NA | NA | NA |
| `A3` | 1 | NA | NA | NA | NA |
| `B1` | 1 | NA | NA | NA | NA |
| `C1` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Same |
| `C2` | 2 | $\Delta\mathbf C$ | $Q_{21}$ | $\Delta\phi$ | Opposite |
| `C1.1` | 2 | $d_C\hat{\mathbf n}_C$, $d_C>0$ | Coaxial oriented axes | $\Delta\phi$ | Same |
| `C2.1` | 2 | $d_C\hat{\mathbf n}_C$, $d_C>0$ | Coaxial oriented axes | $\Delta\phi$ | Opposite |

### Individual Braid Master Table

| Member ID | Braid index | Component member | Group translation speed | Binary-midpoint relation | Axis relation | Distinguished direction | Common phase zero | Circulation data |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | A1 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | Not yet specified |
| `A2` | 1 | A2 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | One common sense |
| `A3` | 1 | A3 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | Orthogonal at $\lambda_A=0$; coincident at $\lambda_A=1$ | Translation direction $\hat{\mathbf u}_A$ | $T=0$ | Not yet specified |
| `B1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | $\mathbf c_1=\mathbf c_2=\mathbf c_3=\mathbf X_{\mathrm{grp}}$ | $\hat{\mathbf n}_1=\hat{\mathbf n}_2=\hat{\mathbf n}_3=\hat{\mathbf n}_B$ | $\hat{\mathbf n}_B$ | $T=0$ | One common sense |
| `C1` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | $T=0$ | Common sense $q$ |
| `C1` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | $T=0$ | Common sense $q$ |
| `C2` | 1 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 1 | Inherited from B1 | Inherited from B1 | $T=0$ | Sense $q$ |
| `C2` | 2 | B1 | Variable $s_{\mathrm{grp}}$ | Inherited from B1 within component 2 | Inherited from B1 | Inherited from B1 | $T=0$ | Sense $-q$ |
| `C1.1` | 1 | B1.3 | Variable $s_{\mathrm{grp}}$ | Inherited from B1.3 within component 1 | Inherited from B1.3 | Inherited from B1.3 | $T=0$ | Common sense $q$ |
| `C1.1` | 2 | B1.3 | Variable $s_{\mathrm{grp}}$ | Inherited from B1.3 within component 2 | Inherited from B1.3 | Inherited from B1.3 | $T=0$ | Common sense $q$ |
| `C2.1` | 1 | B1.3 | Variable $s_{\mathrm{grp}}$ | Inherited from B1.3 within component 1 | Inherited from B1.3 | Inherited from B1.3 | $T=0$ | Sense $q$ |
| `C2.1` | 2 | B1.3 | Variable $s_{\mathrm{grp}}$ | Inherited from B1.3 within component 2 | Inherited from B1.3 | Inherited from B1.3 | $T=0$ | Sense $-q$ |

### Individual Binary Master Table

Within A1 and A3, the symbols $R_1,R_2,R_3$ are independent positive coordinates attached to persistent binary indices. They do not encode a size order, and equality is permitted unless a constrained row says otherwise. A repeated symbol $R$ or $f$ declares equality across the corresponding rows. Unconstrained phases remain $\phi_1,\phi_2,\phi_3$. A1 fixes $h_a=0$ and $\rho_a=R_a$; A3 carries the general axial and transverse decomposition of $R_a$ defined above. Family-C members inherit the individual-binary rows of their two B1 components.

| Member ID | Braid index | Binary index | Radius | Axial half-separation | Transverse orbit radius | Frequency | Phase |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `A1` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $f_1$ | $\phi_1$ |
| `A1` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $f_2$ | $\phi_2$ |
| `A1` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f_3$ | $\phi_3$ |
| `A1.1` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $f$ | $\phi_1$ |
| `A1.1` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $f$ | $\phi_2$ |
| `A1.1` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A1.2` | 1 | 1 | $R$ | $0$ | $R$ | $f$ | $0$ |
| `A1.2` | 1 | 2 | $R$ | $0$ | $R$ | $f$ | $2\pi/3$ |
| `A1.2` | 1 | 3 | $R$ | $0$ | $R$ | $f$ | $4\pi/3$ |
| `A1.3` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $4f$ | $\phi_1$ |
| `A1.3` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $2f$ | $\phi_2$ |
| `A1.3` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A1.4` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $3f$ | $\phi_1$ |
| `A1.4` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $2f$ | $\phi_2$ |
| `A1.4` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `A2` | 1 | 1 | $R$ | $h$ | $\rho$ | $f$ | $0$ |
| `A2` | 1 | 2 | $R$ | $h$ | $\rho$ | $f$ | $2\pi/3$ |
| `A2` | 1 | 3 | $R$ | $h$ | $\rho$ | $f$ | $4\pi/3$ |
| `A3` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f_1$ | $\phi_1$ |
| `A3` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f_2$ | $\phi_2$ |
| `A3` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f_3$ | $\phi_3$ |
| `A3.1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `A3.1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `A3.1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A3.2` | 1 | 1 | $R$ | $h_1$ | $\rho_1$ | $f$ | $0$ |
| `A3.2` | 1 | 2 | $R$ | $h_2$ | $\rho_2$ | $f$ | $2\pi/3$ |
| `A3.2` | 1 | 3 | $R$ | $h_3$ | $\rho_3$ | $f$ | $4\pi/3$ |
| `A3.3` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $4f$ | $\phi_1$ |
| `A3.3` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A3.3` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `A3.4` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $3f$ | $\phi_1$ |
| `A3.4` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $2f$ | $\phi_2$ |
| `A3.4` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `B1` | 1 | 1 | $R_1$ | $h_1$ | $\rho_1$ | $f$ | $\phi_1$ |
| `B1` | 1 | 2 | $R_2$ | $h_2$ | $\rho_2$ | $f$ | $\phi_2$ |
| `B1` | 1 | 3 | $R_3$ | $h_3$ | $\rho_3$ | $f$ | $\phi_3$ |
| `B1.1` | 1 | 1 | $R_1$ | $h_1>0$ | $\rho_1>0$ | $f$ | $\phi_1$ |
| `B1.1` | 1 | 2 | $R_2$ | $h_2>0$ | $\rho_2>0$ | $f$ | $\phi_2$ |
| `B1.1` | 1 | 3 | $R_3$ | $h_3>0$ | $\rho_3>0$ | $f$ | $\phi_3$ |
| `B1.2` | 1 | 1 | $R_1$ | $h_1>\rho_1$ | $\rho_1>0$ | $f$ | $\phi_1$ |
| `B1.2` | 1 | 2 | $R_2$ | $h_2>\rho_2$ | $\rho_2>0$ | $f$ | $\phi_2$ |
| `B1.2` | 1 | 3 | $R_3$ | $h_3>\rho_3$ | $\rho_3>0$ | $f$ | $\phi_3$ |
| `B1.3` | 1 | 1 | $R_1$ | $0$ | $R_1$ | $f$ | $\phi_1$ |
| `B1.3` | 1 | 2 | $R_2$ | $0$ | $R_2$ | $f$ | $\phi_2$ |
| `B1.3` | 1 | 3 | $R_3$ | $0$ | $R_3$ | $f$ | $\phi_3$ |
| `B1.4` | 1 | 1 | $R_1$ | $R_1$ | $0$ | $f$ | $\phi_1$ |
| `B1.4` | 1 | 2 | $R_2$ | $R_2$ | $0$ | $f$ | $\phi_2$ |
| `B1.4` | 1 | 3 | $R_3$ | $R_3$ | $0$ | $f$ | $\phi_3$ |

### Naming and Navigation Master Table

Family and member names are optional aliases. The Description column may aid navigation, but it does not define the geometry and must not introduce a characteristic absent from the first three master tables.

Every Family-A Borg depiction in this table selects the near-rest endpoint $\lambda_A=0$. Its three source-defined binary axes are the mutually orthogonal $x$, $y$, and $z$ axes, so the corresponding binary orbit planes are yz, xz, and xy. The wider taxonomy retains the prescribed interpolation through $0 < \lambda_A < 1$ and the coincident-axis endpoint at $\lambda_A=1$.

| Member ID | Family name | Member name | Geometry record | Borg depiction | Description |
| --- | --- | --- | --- | --- | --- |
| `A1` | Noether core | Coincident endpoint orbits | `family-a-a1-general-v1` | `A1 — coincident endpoint orbits` | Zero-axial-offset Family-A member whose two endpoint paths share one geometric circle within each binary. |
| `A1.1` | Noether core | Equal-frequency | `family-a-a1-1-equal-frequency-v1` | `A1.1 — equal frequency` | A1 constrained to one common binary frequency while retaining independently assignable radii. |
| `A1.2` | Noether core | Equal-frequency equal-radius | `family-a-a1-2-equal-frequency-equal-radius-v1` | `A1.2 — equal frequency, equal radius` | A1 constrained to equal radii, equal frequencies, and phases separated by $120^\circ$. |
| `A1.3` | Noether core | 4:2:1-frequency | `family-a-a1-3-4-2-1-frequency-v1` | `A1.3 — 4:2:1 frequency` | A1 constrained to the indexed frequency ratio $f_1:f_2:f_3=4:2:1$; the ratio does not order the radii. |
| `A1.4` | Noether core | 3:2:1-frequency | `family-a-a1-4-3-2-1-frequency-v1` | `A1.4 — 3:2:1 frequency` | A1 constrained to the indexed frequency ratio $f_1:f_2:f_3=3:2:1$; the ratio does not order the radii. |
| `A2` | Noether core | Fully symmetric | `family-a-a2-fully-symmetric-v1` | `A2 — fully symmetric` | Three equivalent binaries with equal geometry, equal frequencies, $120^\circ$ phase spacing, and one circulation sense. |
| `A3` | Noether core | General axial decomposition | `family-a-a3-general-v1` | `A3 — general` | General Family-A member with independently assignable positive radii, frequencies, phases, and axial/transverse decompositions. |
| `A3.1` | Noether core | Equal-frequency axial decomposition | `family-a-a3-1-equal-frequency-v1` | `A3.1 — equal frequency` | A3 constrained to one common binary frequency while retaining independently assignable radii and decompositions. |
| `A3.2` | Noether core | Equal-frequency equal-radius axial decomposition | `family-a-a3-2-equal-frequency-equal-radius-v1` | `A3.2 — equal frequency, equal radius` | A3 constrained to equal radii, equal frequencies, and phases separated by $120^\circ$. |
| `A3.3` | Noether core | 4:2:1-frequency axial decomposition | `family-a-a3-3-4-2-1-frequency-v1` | `A3.3 — 4:2:1 frequency` | A3 constrained to the indexed frequency ratio $f_1:f_2:f_3=4:2:1$; the ratio does not order the radii. |
| `A3.4` | Noether core | 3:2:1-frequency axial decomposition | `family-a-a3-4-3-2-1-frequency-v1` | `A3.4 — 3:2:1 frequency` | A3 constrained to the indexed frequency ratio $f_1:f_2:f_3=3:2:1$; the ratio does not order the radii. |
| `B1.1` | Coincident binary axes | Interior reference | `illustrative-spindle-chart-hypothesis-v0` | `B1.1 — interior reference` | B1 with $h_a>0$ and $\rho_a>0$ for all three binaries. |
| `B1.2` | Coincident binary axes | High-axial interior | `illustrative-extreme-cap-tilt-spindle-variant-v0` | `B1.2 — high-axial interior` | B1 with $h_a>\rho_a>0$ for all three binaries. |
| `B1.3` | Coincident binary axes | All-equatorial boundary | `illustrative-planar-tri-binary-spindle-boundary-v0` | `B1.3 — all-equatorial boundary` | B1 with $h_a=0$ and $\rho_a=R_a$ for all three binaries. |
| `B1.4` | Coincident binary axes | All-axial boundary | `illustrative-full-cap-axial-spindle-boundary-v0` | `B1.4 — all-axial boundary` | B1 with $\rho_a=0$ and $h_a=R_a$ for all three binaries. |
| `C1` | Two-braid composition | Co-rotating B1 pair | `family-c-c1-co-rotating-b1-pair-v1` | `C1 — co-rotating B1 pair` | Two complete B1 braids with a common circulation sense and explicit relative placement, orientation, and phase. |
| `C2` | Two-braid composition | Counter-rotating B1 pair | `family-c-c2-counter-rotating-b1-pair-v1` | `C2 — counter-rotating B1 pair` | Two complete B1 braids with opposite circulation senses and explicit relative placement, orientation, and phase. |
| `C1.1` | Two-braid composition | Co-rotating B1.3 pair | `family-c-c1-1-co-rotating-b1-3-pair-v1` | `C1.1 — co-rotating B1.3 pair` | C1 constrained to two coaxial all-equatorial B1.3 components with axial center offset $d_C$. |
| `C2.1` | Two-braid composition | Counter-rotating B1.3 pair | `family-c-c2-1-counter-rotating-b1-3-pair-v1` | `C2.1 — counter-rotating B1.3 pair` | C2 constrained to two coaxial all-equatorial B1.3 components with axial center offset $d_C$. |
