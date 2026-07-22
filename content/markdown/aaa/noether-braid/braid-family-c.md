# Braid Family C

Family C contains prescribed assemblies composed of two complete B1 braids. The canonical assembly coordinates and master-table rows are defined in [Braid Taxonomy](braid-taxonomy.md#family-c-two-braid-composition). This chapter gives the exact two-braid path chart, distinguishes braid-center displacement from axis offset, and defines C1, C1.1, C2, and C2.1.

Family C is a geometry-and-motion definition. It does not establish that a C1, C1.1, C2, or C2.1 record is generated, bound, retained, or stable under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](braid-recovery-requirements.md).

## Shared Family-C Composition

Index the two component braids by $b\in\{1,2\}$ and the three binaries within each component by $a\in\{1,2,3\}$. A Family-C assembly therefore contains twelve architrinos on twelve prescribed paths.

Let $\mathbf C_b(T)$ be the center of component braid $b$. Define the complete assembly center and the relative braid-center displacement by

$$
\mathbf X_{\mathrm{grp}}(T)
=
\frac{\mathbf C_1(T)+\mathbf C_2(T)}{2}
$$

and

$$
\Delta\mathbf C
=
\mathbf C_2(T)-\mathbf C_1(T).
$$

The current rigid Family-C chart holds $\Delta\mathbf C$, $Q_{21}$, and $\Delta\phi$ constant. The component centers are therefore

$$
\mathbf C_1(T)
=
\mathbf X_{\mathrm{grp}}(T)-\frac12\Delta\mathbf C,
\qquad
\mathbf C_2(T)
=
\mathbf X_{\mathrm{grp}}(T)+\frac12\Delta\mathbf C.
$$

This is a geometric midpoint definition. It does not assign mass or another dynamical weight to either component. Both component centers have the group velocity $d\mathbf X_{\mathrm{grp}}/dT$ and the group translation speed $s_{\mathrm{grp}}$ defined in the taxonomy.

Choose an oriented orthonormal frame

$$
\mathcal F_b
=
\left(
\hat{\mathbf e}_{b1},
\hat{\mathbf e}_{b2},
\hat{\mathbf n}_b
\right)
$$

for each component braid. The relative orientation $Q_{21}\in SO(3)$, where $SO(3)$ is the set of proper three-dimensional rotations, maps the complete oriented frame of component 1 into the frame of component 2:

$$
\hat{\mathbf e}_{21}=Q_{21}\hat{\mathbf e}_{11},
\qquad
\hat{\mathbf e}_{22}=Q_{21}\hat{\mathbf e}_{12},
\qquad
\hat{\mathbf n}_2=Q_{21}\hat{\mathbf n}_1.
$$

For a circular B1 record, a rotation of the transverse basis about $\hat{\mathbf n}_b$ can be compensated by an equal and opposite shift of all three binary phases. The source record must therefore declare one reference meridian in each transverse frame if $Q_{21}$ and $\Delta\phi$ are to be stored as separate coordinates. Without that convention, the two fields contain a representation redundancy: changing the transverse-frame meridian and compensating the phase offset describes the same twelve paths.

For component $b$, let $f_b$ be its B1 common frequency, let $q_b\in\{+1,-1\}$ be its B1 common circulation sense, and let $(R_{ba},h_{ba},\rho_{ba},\phi_{ba})$ be the inherited binary coordinates. Set the component phase offsets to

$$
\delta_1=0,
\qquad
\delta_2=\Delta\phi.
$$

The angle and half-separation vector of binary $(b,a)$ are

$$
\theta_{ba}(T)
=
q_b\,2\pi f_bT+\phi_{ba}+\delta_b
$$

and

$$
\mathbf d_{ba}(T)
=
h_{ba}\hat{\mathbf n}_b
+
\rho_{ba}
\left[
\cos\theta_{ba}(T)\hat{\mathbf e}_{b1}
+
\sin\theta_{ba}(T)\hat{\mathbf e}_{b2}
\right],
$$

with

$$
R_{ba}^2=h_{ba}^2+\rho_{ba}^2.
$$

The twelve endpoint paths are

$$
\mathbf X_{ba1}(T)=\mathbf C_b(T)+\mathbf d_{ba}(T),
\qquad
\mathbf X_{ba2}(T)=\mathbf C_b(T)-\mathbf d_{ba}(T).
$$

These equations inherit the complete B1 definition separately within each component. Family C does not require the two components to have equal radii, equal axial half-separations, equal transverse orbit radii, equal frequencies, or equal internal phase patterns. Such equalities define constrained loci inside C1 or C2 and must be stated explicitly by a source record.

The relative phase $\Delta\phi$ is the offset between the two braid-level phase zeros at $T=0$; it is not by itself a frequency lock. For C1, the signed angular difference of corresponding binary records changes at rate

$$
\frac{d}{dT}\left(\theta_{2a}-\theta_{1a}\right)
=
2\pi q_1(f_2-f_1).
$$

It is constant only when the two component frequencies are equal. For C2, the contra-rotating phase sum changes at rate

$$
\frac{d}{dT}\left(\theta_{2a}+\theta_{1a}\right)
=
2\pi q_1(f_1-f_2),
$$

so equal component frequencies preserve the corresponding contra-rotating phase relation. The member identifiers do not impose either frequency equality.

## Center Displacement and Axis Offset

The two oriented component axes are the lines

$$
L_b(T)
=
\left\{
\mathbf C_b(T)+s\hat{\mathbf n}_b:s\in\mathbb R
\right\}.
$$

The axis offset is derived from $\Delta\mathbf C$ and $Q_{21}$; it is not an additional independent Family-C coordinate. When the axes are not parallel, their shortest separation is

$$
d_{\mathrm{axis}}
=
\frac{
\left|\Delta\mathbf C\mathbin{\cdot}
\left(\hat{\mathbf n}_1\mathbin{\times}\hat{\mathbf n}_2\right)\right|
}{
\left\|\hat{\mathbf n}_1\mathbin{\times}\hat{\mathbf n}_2\right\|
}.
$$

When the axes are parallel, it is

$$
d_{\mathrm{axis}}
=
\left\|
\Delta\mathbf C
-
\left(\Delta\mathbf C\mathbin{\cdot}\hat{\mathbf n}_1\right)
\hat{\mathbf n}_1
\right\|.
$$

The axes are coaxial exactly when they are parallel and $d_{\mathrm{axis}}=0$. Coaxiality does not require the two braid centers to coincide: $\Delta\mathbf C$ may be nonzero along the common axis. This distinction separates the axial spacing of two component braids from a transverse displacement between their axes.

Circulation comparison uses the oriented frames after $Q_{21}$ places both records in the assembly frame. This removes the sign ambiguity that would arise if one silently reversed an axis direction while continuing to call clockwise and counter-clockwise the same thing.

## C1

C1 is the same-circulation Family-C member:

$$
q_2=q_1.
$$

It inherits the full shared composition chart, including independently assignable component geometry, center displacement, relative orientation, and relative phase. Same circulation does not by itself require coaxial axes, equal frequencies, phase lock, binding, or retention.

## C2

C2 is the opposite-circulation Family-C member:

$$
q_2=-q_1.
$$

It inherits the same independent composition coordinates as C1. Opposite circulation does not by itself require coaxial axes, equal frequencies, phase lock, polarity conjugation, binding, or retention.

## C1.1 and C2.1

C1.1 is the all-equatorial constrained variant of C1, and C2.1 is the all-equatorial constrained variant of C2. Both component braids are B1.3 members:

$$
h_{ba}=0,
\qquad
\rho_{ba}=R_{ba},
\qquad
b\in\{1,2\},
\quad
a\in\{1,2,3\}.
$$

C1.1 and C2.1 also require one common oriented axis and a nonzero center displacement along that axis:

$$
\hat{\mathbf n}_2=\hat{\mathbf n}_1=\hat{\mathbf n}_C,
\qquad
\Delta\mathbf C=d_C\hat{\mathbf n}_C,
\qquad
d_C>0.
$$

The derived axis offset is therefore zero even though the braid centers are distinct. C1.1 retains the same-circulation relation $q_2=q_1$. C2.1 retains the opposite-circulation relation $q_2=-q_1$. The coordinate $d_C$ does not fix the relative phase or common-frequency values. The Borg representatives select $d_C=1.10$, centers at $(0,0,-0.55)$ and $(0,0,0.55)$, common z-axis frames, equal component frequencies $f_1=f_2=0.25$, and relative phase $\Delta\phi=\pi/3$ so that the circulation change is isolated in a directly comparable prescribed display.

## Interface With Two-Braid Physical Hypotheses

Family C supplies a generic prescribed coordinate chart for two complete B1 records. A particle or transport hypothesis may occupy a constrained locus of this chart only after its extra relations are stated explicitly.

In particular, the photon-channel hypothesis is a **coaxial contra-rotating polarity-conjugate planar pair**. C2 supplies the opposite-circulation coordinate relation only if both photon-side planar records are established as B1 components. Planarization, coaxial placement, propagation-axis alignment, polarity conjugation, pair spacing, null propagation, polarization, and helicity remain owned by [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#the-photon-gamma-coaxial-contra-rotating-polarity-conjugate-planar-pair) and its closure gates. The current taxonomy does not yet assign the photon, meson, or neutrino two-braid hypotheses to C1 or C2, because their component-member and relative-configuration mappings have not been established.

## Claim Boundary

The Family-C equations are exact prescribed paths. They would be falsified as EOM-solver branch claims by a same-record evolution showing that either component loses its B1 relations or that the declared inter-component coordinates fail the required causal-root, acceleration, action, and stability rows. Until such a record exists, C1, C1.1, C2, and C2.1 define display and comparison geometry rather than bound physical assemblies.
