# Braid Taxonomy

This chapter describes prescribed Noether braid geometries through explicit coordinates. The taxonomy has three levels: assembly composition, individual braid, and individual binary.

Each taxonomy member receives a neutral identifier consisting of a group letter and a member number, such as `A1`, `A2`, or `B1`. The identifier carries no geometric meaning. The member's table entries and Borg depiction define the geometry.

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

One Noether braid contains six architrinos grouped into three neutral binaries. Each binary contains one electrino and one positrino. Other polarity pairings are outside the present taxonomy.

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
| Axis data | The ordered binary-axis unit vectors $(\hat{\mathbf n}_1,\hat{\mathbf n}_2,\hat{\mathbf n}_3)$. The vectors are recorded directly without assigning an axis-structure class. |
| Frequency data | The ordered binary-frequency tuple $(f_1,f_2,f_3)$. |
| Phase data | The ordered binary-phase tuple $(\phi_1,\phi_2,\phi_3)$. |
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

Here $h_a$ is the **axial half-separation**, and $\rho_a$ is the **transverse orbit radius**. The endpoint distance from the binary midpoint is the derived quantity

$$
R_a^2(T)=h_a^2(T)+\rho_a^2(T)
$$

The binary coordinate columns are:

| Coordinate | Meaning |
| --- | --- |
| Axis $\hat{\mathbf n}_a$ | The oriented binary axis. No separate axis-line coordinate is introduced. |
| Axial half-separation $h_a$ | Half of the endpoint separation measured along the binary axis. |
| Transverse orbit radius $\rho_a$ | Endpoint distance from the binary axis. |
| Frequency $f_a$ | Repetition frequency of the prescribed binary motion. |
| Phase $\phi_a$ | Phase of the binary relative to the braid record. |
| Circulation sense | Direction in which the prescribed binary motion advances. |

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

## Table Form

Each member uses one assembly entry and one binary entry for every binary in every constituent braid.

| Member ID | Braid count | Group translation speed | Relative braid-center displacement | Relative orientation | Relative phase | Relative circulation |
| --- | --- | --- | --- | --- | --- | --- |

| Member ID | Braid index | Binary index | Axis | $h_a$ | $\rho_a$ | $f_a$ | $\phi_a$ | Circulation sense |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
