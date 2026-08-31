# Braid Family C

Family C contains prescribed twelve-architrino geometries whose twelve architrino worldlines are coaxial. The canonical assembly coordinates and master-table rows are defined in [Braid Taxonomy](braid-taxonomy.md#family-c-coaxial-twelve-architrino-geometry). This chapter gives the exact common-axis path chart, the neutral-binary pairing contract, and the constrained members C1 through C6.

Family C is a geometry-and-motion definition. It does not establish that a Family-C record is generated, bound, retained, stable, or physically realized under the EOM solver. The realization-independent retention burden is stated in [Braid Recovery Requirements](braid-recovery-requirements.md).

## Shared Family-C Coordinate Chart

Choose one oriented orthonormal frame

$$
\mathcal F_C
=
\left(
\hat{\mathbf e}_1,
\hat{\mathbf e}_2,
\hat{\mathbf n}_C
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b512dd169d4151dd)

where $\hat{\mathbf n}_C$ is the common axis of all twelve architrino worldlines. Assign persistent indices

$$
m\in\{1,\ldots,12\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-aee3b66945615003)

and strictly ordered axial coordinates

$$
\xi_1<\xi_2<\cdots<\xi_{12}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2906606dee811b1c)

The adjacent spacings and total train length are

$$
d_m=\xi_{m+1}-\xi_m>0,
\qquad
m\in\{1,\ldots,11\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2596f73f93a2c254)

and

$$
L_C=\xi_{12}-\xi_1=\sum_{m=1}^{11}d_m.
$$

[View →](../../../../equation-mapping.html#corpus-equation-867390011c64e68b)

The spacing vector

$$
\mathbf d_C=(d_1,\ldots,d_{11})
$$

[View →](../../../../equation-mapping.html#corpus-equation-d5fbf3807a2fffea)

is a primary Family-C coordinate because it changes the exact causal delays between architrino worldlines. A common shift of every $\xi_m$ is absorbed into the assembly center and does not create a thirteenth axial coordinate.

Let $\mathbf X_{\mathrm{grp}}(T)$ be the prescribed assembly center. For uniform translation of that center at group speed $s_{\mathrm{grp}}$,

$$
\mathbf X_{\mathrm{grp}}(T)
=
\mathbf C_0+s_{\mathrm{grp}}T\hat{\mathbf n}_C.
$$

[View →](../../../../equation-mapping.html#corpus-equation-27664d32dd3bca91)

Worldline $m$ is

$$
\mathbf X_m(T)
=
\mathbf X_{\mathrm{grp}}(T)
+\xi_m\hat{\mathbf n}_C
+\rho_m
\left[
\cos\theta_m(T)\hat{\mathbf e}_1
+\sin\theta_m(T)\hat{\mathbf e}_2
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-797e910f52f511c6)

with

$$
\theta_m(T)
=
q_m\omega_mT+\phi_m,
\qquad
q_m\in\{+1,-1\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-8de2892fd5227395)

The twelve radii $\rho_m>0$, angular frequencies $\omega_m>0$, phases $\phi_m$, and circulation senses $q_m$ are independently declared unless a member row constrains them. A complete-return record must declare a period $P_C>0$ satisfying

$$
\frac{\omega_mP_C}{2\pi}\in\mathbb Z
$$

[View →](../../../../equation-mapping.html#corpus-equation-75d719c7d6c79a80)

for every $m$.

## Neutral-Binary Pairing

Every Family-C source record declares a fixed-point-free involution

$$
\pi:\{1,\ldots,12\}\to\{1,\ldots,12\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2389123cd27a8b4f)

satisfying

$$
\pi(\pi(m))=m,
\qquad
\pi(m)\ne m.
$$

[View →](../../../../equation-mapping.html#corpus-equation-02df9e1c24fa8c02)

The six unordered pairs $\{m,\pi(m)\}$ are the six neutral binaries. For each pair, the record declares opposite endpoint polarities and explicitly states the radius, frequency, phase, circulation, axial-midpoint, and axial-separation relations. The binary map is not inferred from axial adjacency, drawing color, or an optional Accessory Configuration.

The Family-C parent chart does not require the six binaries to divide into two complete B1 braids. A source may declare such a decomposition, but it is an additional constrained relation rather than the Family-C definition.

## Optional Accessory Configuration

A Family-C assembly may also declare an Accessory Configuration containing six additional architrino worldlines. Those six sites are separate assembly inventory: their polarity and complete prescribed paths must be declared, and they are not counted among the twelve defining Family-C architrino worldlines.

Adding or removing an Accessory Configuration does not change the Family-C member identifier. It changes the declared assembly inventory and therefore changes the source record and its hash.

## C1

C1 is the co-rotating Family-C member:

$$
q_m=q_C,
\qquad
m\in\{1,\ldots,12\},
\qquad
q_C\in\{+1,-1\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2c260fe4c04b56e4)

C1 retains the full ordered-spacing, radius, frequency, phase, and binary-pairing coordinates. It does not require equal radii, equal spacings, equal frequencies, reflection symmetry, or decomposition into two B1 components.

## C2

C2 is the counter-rotating Family-C member. The source record declares the two ordered index subsets

$$
\mathcal I_1=\{1,\ldots,6\},
\qquad
\mathcal I_2=\{7,\ldots,12\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8a976e0e99f3631d)

and imposes

$$
q_m=q_C
\quad\text{for }m\in\mathcal I_1,
\qquad
q_m=-q_C
\quad\text{for }m\in\mathcal I_2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-daa9269995d3967c)

The subsets define the circulation relation only. Neither subset is required to be a complete B1 braid, and binary counterparts may remain within one subset or cross between them when the source record declares the map exactly.

## C3 and C4

C3 is the two-B1 constrained locus of C1. C4 is the two-B1 constrained locus of C2. In both members, the twelve worldlines can be partitioned into two complete B1 components indexed by $b\in\{1,2\}$, with three neutral binaries $a\in\{1,2,3\}$ in each component.

Both component axes coincide with $\hat{\mathbf n}_C$, and their centers are separated only along that axis:

$$
\mathbf C_1(T)
=
\mathbf X_{\mathrm{grp}}(T)-\frac{d_C}{2}\hat{\mathbf n}_C,
\qquad
\mathbf C_2(T)
=
\mathbf X_{\mathrm{grp}}(T)+\frac{d_C}{2}\hat{\mathbf n}_C,
\qquad
d_C>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b9a0d3e6a07fc5ba)

For each component, let $(R_{ba},h_{ba},\rho_{ba},\phi_{ba})$ be its B1 binary coordinates, with

$$
R_{ba}^2=h_{ba}^2+\rho_{ba}^2.
$$

[View →](../../../../equation-mapping.html#corpus-equation-11c4b58e679a0c2a)

The half-separation vector is

$$
\mathbf s_{ba}(T)
=
h_{ba}\hat{\mathbf n}_C
+\rho_{ba}
\left[
\cos\theta_{ba}(T)\hat{\mathbf e}_1
+\sin\theta_{ba}(T)\hat{\mathbf e}_2
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-3909271a6331315f)

and the endpoint worldlines are

$$
\mathbf X_{ba+}(T)=\mathbf C_b(T)+\mathbf s_{ba}(T),
\qquad
\mathbf X_{ba-}(T)=\mathbf C_b(T)-\mathbf s_{ba}(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-6fb5a1df2182a13e)

Each component separately inherits the complete B1 common-midpoint, common-axis, common-frequency, common-circulation, antipodality, and polarity-conjugacy relations. The source record declares the bijection between these twelve endpoint labels and the persistent Family-C indices $m$.

C3 imposes one common circulation sense across both components. C4 imposes opposite component circulation senses. Neither member requires the two components to have equal radii, equal frequencies, equal internal phases, or a phase lock.

## C5 and C6

C5 is the all-equatorial two-B1.3 constrained locus of C3. C6 is the all-equatorial two-B1.3 constrained locus of C4. Both members impose

$$
h_{ba}=0,
\qquad
\rho_{ba}=R_{ba},
\qquad
b\in\{1,2\},
\quad
a\in\{1,2,3\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2360831584533f3b)

C5 retains the common-circulation relation. C6 retains the opposite-component-circulation relation. The axial center separation $d_C$, component frequencies, internal phases, and relative phase remain declared coordinates unless a source record constrains them.

## Exact Causal-Delay Relation

For transmitter worldline $a$ at time $T_r-u$ and receiver worldline $b$ at reception time $T_r$, every retained positive causal delay solves

$$
\left\|
\left(\xi_b-\xi_a+s_{\mathrm{grp}}u\right)\hat{\mathbf n}_C
+\mathbf r_b(T_r)-\mathbf r_a(T_r-u)
\right\|
=
c_fu,
\qquad
u>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-c2bef069b542523f)

where

$$
\mathbf r_m(T)
=
\rho_m
\left[
\cos\theta_m(T)\hat{\mathbf e}_1
+\sin\theta_m(T)\hat{\mathbf e}_2
\right].
$$

[View →](../../../../equation-mapping.html#corpus-equation-3f1ae82c3759a4c8)

This equation is exact for the prescribed chart and generally transcendental because $u$ appears inside the transmitter phase. Closed-form reduction is available only on separately demonstrated symmetric boundaries. Otherwise, prescribed-path analysis must enumerate every retained positive root without evolving any path.

## Interface With Physical Hypotheses

Family C supplies a generic prescribed coordinate chart for twelve coaxial architrino worldlines. A particle or transport hypothesis occupies a constrained locus only after its extra polarity, phase, frequency, accessory, propagation, action, and angular-momentum relations are stated explicitly.

In particular, the photon-channel hypothesis is a **coaxial contra-rotating polarity-conjugate planar pair**. C2 supplies only a twelve-worldline counter-rotation chart. It does not by itself establish the photon-side planar decomposition, polarity conjugation, propagation-axis relation, null propagation, polarization, helicity, action target, binding, retention, or physical realization. Those obligations remain owned by [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#the-photon-gamma-coaxial-contra-rotating-polarity-conjugate-planar-pair) and its closure gates.

## Claim Boundary

The Family-C equations are exact prescribed paths. A prescribed-path residual candidate is falsified when its declared causal-root, minimum-separation, speed, complete-cycle acceleration-balance, refinement, or independent-reconstruction requirements fail. Such a result remains analytical: it does not establish or refute stability, retention, binding, photon identity, quantization, or physical realization.
