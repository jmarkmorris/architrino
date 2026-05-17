# Noether Core Geometry

This chapter is the canonical home for the geometric footprint of the Noether core: its dynamic exclusion zone, oblate spheroidal envelope, and assembly-level deformation channels. It sits in the Noether Sea and effective-spacetime branch because the geometry of many such envelopes is the local material out of which Noether-Sea density, strain, and delay variables are coarse-grained. The nested-binary scaffold itself belongs in [Nested Binaries and the Noether Core](./noether-core.md). The delayed dynamics that stabilize and deform the tri-binary belong in [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md).

The core is not a static object. It is a dynamic system of six architrinos in a triply nested binary configuration. The high-frequency paths of those constituents sweep out a persistent volume of intense wake activity. That swept volume is the Noether core's effective exclusion envelope.

## Ownership Boundary

This chapter owns:

- the dynamic exclusion-zone interpretation of a Noether core,
- the oblate spheroidal form of the low-energy core envelope,
- the role of the outer binary in setting the leading boundary,
- and assembly-level deformation of the envelope under external effective fields, nearby wakes, and Noether-Sea conditions.

This chapter does not own:

- primitive architrino ontology; see [Architrino](../foundations/architrino.md),
- the nested-binary scaffold; see [Nested Binaries and the Noether Core](./noether-core.md),
- exact delay-root dynamics; see [Master Equation](../dynamics/master-equation.md) and [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md),
- observer clocks and rulers; see [Proper Time and Time Dilation](proper-time-and-time-dilation.md),
- or metric reconstruction; see [Emergent Metric](emergent-metric.md).

## Dynamic Exclusion Zone

The six architrinos within a Noether core are in rapid orbital motion. The superposition of their fluctuating potential wakes creates a region that is difficult for other architrinos or assemblies to penetrate without being strongly accelerated, deflected, or phase-disrupted.

This region acts as a dynamic **exclusion zone**. It is not a solid object with a hard material surface. It is a coherent region of intense wake activity defined by the collective path history of the constituent architrinos.

Another Noether core approaching this region does not encounter a classical wall. It encounters a rapidly varying causal-wake environment whose accelerations and phase constraints can prevent stable transit through the core volume.

## Assembly-Noether-Sea Interface Diagnostic

The dynamic exclusion zone supplies a spatial approximation to a deeper ledger boundary. At the exact level, an assembly is defined by the architrinos, closure labels, and wake-exchange records phase-locked to that assembly. The surrounding Noether Sea is the neighboring neutral-core population and its ambient wake record after the assembly ledger has been excluded.

For an assembly $a$, let $\mathcal{W}_{a}^{\mathrm{locked}}(\mathbf{x},t)$ denote the local coarse-grained wake/exclusion contribution tied to the assembly's accepted closure label, and let $\mathcal{W}_{\mathrm{sea}}^{\mathrm{ambient}}(\mathbf{x},t)$ denote the ambient Noether-Sea contribution in the same region. A practical interface diagnostic is

$$
D_a(\mathbf{x},t)
=
\frac{
\left\lVert\mathcal{W}_{a}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
}{
\left\lVert\mathcal{W}_{a}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
+
\left\lVert\mathcal{W}_{\mathrm{sea}}^{\mathrm{ambient}}(\mathbf{x},t)\right\rVert
}.
$$

Then the effective assembly-Noether-Sea interface for a declared stability threshold $D_*$ is the level set

$$
\partial\Omega_a(D_*,t)
=
\left\{
\mathbf{x}\in\Sigma_t:
D_a(\mathbf{x},t)=D_*
\right\}.
$$

The level-set threshold is not universal. A penetration calculation, packing calculation, clock-coupling calculation, and reaction-corridor calculation may choose different $D_*$ values because they test different stability criteria. What must remain invariant is the level distinction: exact assembly membership is a closure-ledger fact, while $\partial\Omega_a(D_*,t)$ is a spatial interface extracted from that ledger and the surrounding Noether-Sea response.

## Oblate Spheroidal Form

The tri-binary structure of the Noether core is anisotropic. The three nested binaries orbit and precess, with their orbital planes tending toward mutual orthogonality in stable low-apparent-energy conditions. The time-averaged envelope is therefore not perfectly spherical.

The leading boundary of the exclusion zone is set primarily by the **outer binary**:

- it has the largest orbital radius,
- it has the slowest frequency,
- and its orbital plane defines the dominant equatorial plane of the assembly.

The inner and middle binaries supply the high-frequency internal wake structure and stabilizing density of the envelope. The outer binary supplies the main geometric boundary. Together, outer orbit sweep plus system precession naturally produce a flattened-pole, equatorial-bulge form: an **oblate spheroidal exclusion envelope**.

In low-energy prose, "Noether core shape" should usually mean this effective envelope, not a literal material surface.

## Canonical Geometry Variables

For the oblate spheroidal exclusion envelope, use $R_{\parallel}$ for the semiaxis along the contraction or drift-aligned direction and $R_{\perp}$ for the transverse semiaxis. The canonical shape ratio is
$$
\xi\equiv\frac{R_{\parallel}}{R_{\perp}},
$$
so $\xi=1$ denotes a spherical envelope and $\xi<1$ denotes an oblate envelope compressed along the parallel axis.

Use
$$
\lambda\equiv\frac{R_{\perp}}{R_{\perp,0}}
$$
for the transverse scale ratio relative to a stated reference envelope. The pair $(\xi,\lambda)$ belongs first to Noether-core geometry: $\xi$ records shape and $\lambda$ records scale.

Observer clock behavior is a downstream readout, not the definition of either geometry variable. In a successful homogeneous Lorentz-closure regime, the theory should derive
$$
\frac{\omega_{\text{clk}}}{\omega_0}=\frac{d\tau}{dt}\to\xi\to\frac{1}{\gamma},
$$
but this is a closure target linking the clock channel to the oblate envelope. It should not be used to define $\xi$.

## Lorentz Projection Role

For branch-quantized Lorentz response, the envelope variables $(\xi,\lambda)$ are projection variables. They expose the geometry of a stable all-layer Noether-core branch to external clocks, rulers, and nearby assemblies, but they do not by themselves contain the full branch state.

The hidden branch state contains the inner, middle, and outer layer radii, frequencies, speeds, axes, active causal-root ledger, and wake exchange. The outer binary controls the leading boundary because it has the largest radius and weakest shielding. Therefore the observed ruler factor is extracted through the outer envelope,
$$
\gamma_{\mathrm{rul}}^{(q)}(v)
\equiv
\frac{R_{\perp,q}(v)}{R_{\parallel,q}(v)}
=
\frac{1}{\xi_q(v)},
$$
but the branch $q$ is accepted only when the inner and middle ledgers also retune consistently with clock closure, conservation, and preferred-frame leakage bounds.

The direct Lorentz-to-geometry map comes from a closed return cycle. In a homogeneous cell, define
$$
\gamma_{\text{eff}}(v)
\equiv
\frac{1}{\sqrt{1-v^2/c_{\text{eff}}^2}}.
$$
The longitudinal return time for an envelope semiaxis $R_{\parallel}$ is
$$
T_{\parallel}
=
\frac{R_{\parallel}}{c_{\text{eff}}-v}
+
\frac{R_{\parallel}}{c_{\text{eff}}+v}
=
\frac{2R_{\parallel}}{c_{\text{eff}}}\gamma_{\text{eff}}^2,
$$
while the transverse causal-budget return time is
$$
T_{\perp}
=
\frac{2R_{\perp}}{c_{\text{eff}}}\gamma_{\text{eff}}.
$$
Requiring $T_{\parallel}=T_{\perp}+O(\epsilon_{\mathrm{LV}}T_0)$ gives
$$
\xi_q(v)
=
\frac{R_{\parallel,q}(v)}{R_{\perp,q}(v)}
=
\frac{1}{\gamma_{\text{eff}}(v)}
+O(\epsilon_{\mathrm{LV}}).
$$
The role of the geometry chapter is to record this as an envelope projection, not as a primitive definition. The derivation and closure coefficients belong to [Lorentz Kinematics](lorentz-kinematics.md#closed-return-derivation-of-the-lorentz-axis-ratio).

This distinction prevents an outer-only shortcut. An outer-binary oblation model can estimate the visible deformation channel, while a mature Lorentz closure must show that the same branch update also determines the clock factor
$$
\gamma_{\mathrm{clk}}^{(q)}(v)=\frac{T_q(v)}{T_0}
$$
and that the admitted branches satisfy
$$
\gamma_{\mathrm{clk}}^{(q)}(v)
=
\gamma_{\mathrm{rul}}^{(q)}(v)
+O(\epsilon_{\mathrm{LV}}).
$$
The envelope is therefore the visible projection of the all-three-binary causal-root ledger, not an independently assigned Lorentz surface.

## Retuning Projection to Envelope Variables

The cadence-scale retuning map must project into $(\lambda,\xi)$ through the envelope geometry, not by assigning those variables independently. Let

$$
\mathbf{e}_q
=
\left(
\ln R_{\parallel,q},\,
\ln R_{\perp,q}
\right)^{T}
$$

denote the logarithmic semiaxis record of branch $q$. The envelope projection is a branch-dependent map

$$
\mathbf{e}_q
=
\mathcal{P}_{\mathrm{env}}^{(q)}
\!\left(
\ln R_I,\ln R_M,\ln R_O,\,
\mathbf{A}_I,\mathbf{A}_M,\mathbf{A}_O,\,
\mathcal{L}_{\mathrm{root}},\mathcal{L}_{\mathrm{wake}}
\right),
$$

where the axes, root ledger, and wake ledger are part of the branch data. The induced geometry increments are therefore

$$
\Delta\ln\lambda
=
\Delta\ln R_{\perp,q},
\qquad
\Delta\ln\xi
=
\Delta\ln R_{\parallel,q}
-
\Delta\ln R_{\perp,q}.
$$

In the low-stress outer-dominated branch, this reduces to the useful estimate

$$
\Delta\ln\lambda
\approx
\Delta\ln R_O,
\qquad
\Delta\ln\xi
\approx
\Delta\ln R_{\parallel,O}
-
\Delta\ln R_{\perp,O}.
$$

This approximation is a projection estimate, not a branch proof. It fails when middle-layer hinge motion, inner self-hit history, axis precession, or neighbor-induced strain contributes at the same order as the outer binary. Those failures are informative: they identify which hidden ledger entries must be retained before the retuning map can be used for clock, ruler, or Noether-Sea transport calculations.

## Deformability of the Envelope

The oblate spheroidal envelope is deformable because it is generated by orbit paths, not by a rigid shell. Those paths depend on the superposition of:

- internal binary wakes,
- self-hit and partner-hit closure,
- nearby assembly wakes,
- Noether-Sea density and stress,
- and the core's translational state through the medium.

External effective fields, nearby assembly wakes, and dense local assemblies can perturb the binary paths. The outer binary is the most exposed channel because it is the largest and most weakly shielded layer. A distortion of that outer path changes the exclusion envelope.

This gives the Noether core two distinct geometric roles:

1. As an assembly, it can deform while preserving nested-binary identity across a stable regime.
2. As a medium constituent, many deforming cores can contribute to coarse-grained Noether-Sea density, strain, and signal-propagation changes.

The claim that those coarse-grained changes reconstruct observer-level gravity is not owned here. It belongs to [Emergent Metric](emergent-metric.md), [PPN Parameters](ppn-parameters.md), and [Proper Time and Time Dilation](proper-time-and-time-dilation.md).

For the special-relativity-facing comparison of this deformation channel, see [Special Relativity and Deformable Noether Cores](../theory-bridges/special-relativity-noether-core.md). For the focused synthesis of the closed-return quantization claim, see [Return-Cycle Lorentz Quantization](../theory-bridges/return-cycle-lorentz-quantization.md).

## Geometry Interfaces

For local assembly modeling, use this page as the geometric source for:

- an oblate envelope boundary,
- principal axes set by tri-binary orientation,
- deformation of the outer-binary envelope under local gradients,
- and exclusion-volume changes relevant to packing, shielding, and collision channels.

For dynamics modeling, use [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md), where the oblate causal envelope is treated as a delay-geometry input and a simulation target.

For medium modeling, use [Noether Sea](noether-sea.md) and [Spacetime Assemblies](spacetime-assemblies.md), where many Noether cores become a coupled medium rather than isolated assembly envelopes.

## Summary Commitment

> **Noether Core Geometry Commitment:** A Noether core has an oblate spheroidal exclusion envelope generated by the path history of its nested binaries. The envelope is dynamic and deformable, not a rigid surface. Its deformation is an assembly-level input to Noether-Sea state variables, while metric and gravity-language reconstruction belongs to the spacetime branch.

> **Lorentz Projection Commitment:** In Lorentz closure, the outer-binary envelope supplies the leading observable ruler projection, while the accepted branch state remains an all-three-binary causal-root ledger. The geometry chapter records $\xi$ and $\lambda$ as projection variables; it does not reduce clock, mass, or action-ledger closure to outer-envelope shape alone.
