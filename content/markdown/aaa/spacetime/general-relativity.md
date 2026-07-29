# General Relativity

This chapter is the observer-facing checklist for the spacetime branch. It says, in one place, which general-relativistic observables must be matched by the constitutive medium picture and where the framework is allowed to differ only after that closure is secured.

Read it as a phenomenology gate rather than as a derivation chapter. The metric and PPN notes carry the constitutive work; this page states the observable obligations and their regime boundaries.

The central question is not whether $\mathbb{A}\mathbb{A}\mathbb{A}$ can describe gravity in different words. The question is whether one Noether sea response record can reproduce the network of tested GR observables without switching hidden assumptions between rows. Redshift, Shapiro delay, bending, orbital precession, equivalence-principle behavior, and gravitational waves must come from the same effective-geometry map in the regime where GR already works.

## Purpose

This chapter is the observer-level checklist for where the spacetime branch of $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce general relativity and where it is allowed to differ. It is not the constitutive derivation itself. That work lives in the metric and PPN chapters. The role of this page is to collect the observable-facing map in one place.

## Core Interpretation

At the substrate level:

- space remains Euclidean,
- time remains absolute,
- and the [Noether sea](noether-sea.md) is the dynamical medium.

At the observer level, the same Noether sea must generate the effective metric behavior usually attributed to curved spacetime. Therefore the phenomenology requirement is:

$$
\text{medium response}
\;\Longrightarrow\;
\text{effective metric observables}
$$

The closure demand is not merely qualitative resemblance. The same constitutive map must jointly recover redshift, Shapiro delay, light bending, perihelion precession, and gravitational-wave propagation in the regimes where GR is already tested.

Every row below should be treated as a test of the same medium record. If a clock result, a lensing result, and a gravitational-wave result require different hidden records, the branch has produced separate fits rather than a GR recovery.

Notation convention: $G_N$ denotes the standard Newtonian and low-energy GR comparison constant in the observable benchmark formulas below. $G_{\mathrm{eff}}(\theta)$ denotes the recovered constitutive coefficient of a candidate Noether sea record, and a validated weak-field branch must make $G_{\mathrm{eff}}(\theta)\to G_N$ in the same record that recovers the clock, lensing, PPN, and gravitational-wave rows. Nearby standard-comparison formulas may retain $G$ as ordinary GR shorthand; this chapter writes $G_N$ when the constant belongs to the benchmark rather than to the constitutive map.

### Network evidence and nuisance separation

The empirical gravity lesson is that one precise test is not enough to establish an effective metric branch. A measurement can accidentally agree with the right number while sharing an unmodeled nuisance with the theory input, as in historical redshift and solar-system cases (Pound–Rebka thermal-gradient control; Eddington-1919 eclipse-systematics). The phenomenology gate therefore treats GR recovery as a network constraint:
$$
\mathcal{E}_{\mathrm{GR}}(\theta)
=
\mathbf{r}_{\mathrm{net}}(\theta)^{\mathsf T}
C_{\mathrm{net}}^{-1}
\mathbf{r}_{\mathrm{net}}(\theta)
$$
where $\mathbf{r}_{\mathrm{net}}$ contains the redshift, Shapiro, lensing, 1PN, preferred-frame, equivalence-principle, gravitational-wave, and CMB-derived gravity rows that are claimed by the same record $\theta$. The covariance $C_{\mathrm{net}}$ must include detector calibration, astrophysical nuisance parameters, foregrounds, and external-source uncertainty. A channel passes only when the same $\theta$ survives this joint network; agreement in a single row is a prompt for cross-checks, not closure.

### Causal-order and scale recovery

Before the individual observables are checked, the effective metric map has to pass a structural check: Physical Observers must infer the same causal ordering, local clock scale, and negligible preferred-frame leakage that the GR comparison metric would provide in the validated regime. The following diagnostic is imported unchanged from [observer-framework.md](./observer-framework.md#effective-causal-order-recovery):
$$
\mathcal{R}_{\mathrm{causal}}(\theta)
=
d_{\mathrm{ord}}\!\left(\prec_{\mathrm{eff}}(\theta),\prec_{\mathrm{GR}}\right)
+
\lambda_{\tau}
\left\|
\frac{d\tau_{\mathrm{eff}}}{dt_{\mathrm{eff}}}(\theta)
-
\frac{d\tau_{\mathrm{GR}}}{dt_{\mathrm{eff}}}
\right\|_{W}
+
\lambda_{\mathrm{PF}}
\sum_{i=1}^{3}\alpha_i(\theta)^2
$$
The causal-order term tests the effective light-cone structure, the clock term supplies local scale, and the preferred-frame term keeps preferred-frame signatures below observational bounds. Passing this check does not replace the redshift, Shapiro, lensing, 1PN, quantum-gravity EFT, or gravitational-wave tests below; it prevents them from being fit by mutually incompatible causal and clock conventions.

The labels $\tau_{\mathrm{eff}}$ and $\tau_{\mathrm{GR}}$ mark the candidate observer-record clock readout and the GR comparison clock readout. They are scale readouts in the effective observer layer, not additional substrate time variables.

In plain terms, the observer cannot be allowed to recover one causal story from photons, a different clock story from matter, and a third timing story from gravitational waves. The tested regime must look like one effective spacetime to the Physical Observer.

### Global continuation and cosmic-censorship comparison

Global hyperbolicity, Cauchy surfaces, Cauchy horizons, and cosmic censorship are standard GR comparison tools for asking when initial data determine a maximal observer-level spacetime. They are not substrate assumptions in $\mathbb{A}\mathbb{A}\mathbb{A}$, because the native dynamics live in absolute timespace with path-history records. Their retained value is as an extension discipline: when the effective metric comparison would treat a region as losing unique continuation, the native account must identify which finite boundary wake data, Noether sea state, and closure-label ensemble determine the continuation.

The comparison burden can be stated as a finite-access residual rather than as an imported global axiom. For a compact comparison region $\Omega$ and window $W=[T_i,T_f]$, the strong-field or cosmology packet must specify a continuation map from the same record class used by the weak-field observables,
$$
\mathcal{T}_{\Omega,W}^{\theta}:
\left(
X_\Omega(T_i),
\mathcal{H}_{\Omega}^{<T_i},
\mathcal{B}_{\partial\Omega}|_{W},
N_{\text{sea}}|_{\Omega\times W}
\right)
\longrightarrow
\mathcal{S}_{\Omega}(T_f)
$$
where $\mathcal{S}_{\Omega}(T_f)$ is the finite accepted endpoint or branch-label set. A GR comparison that assumes global hyperbolicity can be used only after the same $\theta$ also recovers the local causal-order, clock, PPN, and gravitational-wave observables above. If $\mathcal{S}_{\Omega}(T_f)$ is empty, infinite without a finite ledger, or selected by an external global assumption rather than by the recorded boundary data, the effective-metric continuation has not closed.

## Weak-Field Observables That Must Match GR

### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt_{\mathrm{eff}}}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{\|\mathbf w\|^2}{c_0^2}}
$$
in the weak-field, low-velocity observer regime, where $\mathbf w$ is the sea-relative drift of the clock in the weak homogeneous limit and $c_0\equiv c_{\text{eff}}(\infty)$ is the dressed asymptotic clock/signal speed. The primitive wake speed $c_f$ still belongs inside delayed-root and self-hit equations; it is not the default denominator for observer clock dilation unless a closure result identifies the relevant dressed branch with $c_f$. For static clocks this reduces to
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_0^2}
$$

Operationally, GPS offsets, Pound-Rebka, and related clock-comparison tests are the direct acceptance layer. Height-resolved optical-clock comparisons (mm-baseline Sr optical-lattice clock comparison, Bothwell-class) sharpen this layer: near Earth's surface, $\Delta\nu/\nu\approx gL/c_0^2$, so a $1\,\mathrm{mm}$ clock-sample separation corresponds to about $1.1\times10^{-19}$ and a $33\,\mathrm{cm}$ separation to about $3.6\times10^{-17}$. The same clock law must handle both separated clocks and extended collective clock samples without replacing the constitutive coefficients used for Shapiro delay and lensing.

### Shapiro delay

In the refractive-medium picture, one-way path time is
$$
t_{\mathrm{eff}}[\Gamma]=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)\,ds_{\mathrm{eff}}
$$
with
$$
\bar{\chi}_{\text{sea}}(x_{\mathrm{eff}}^i)
\equiv
\frac{c_0}{c_{\text{eff}}(x_{\mathrm{eff}}^i)}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(x_{\mathrm{eff}}^i)
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^i)}{c_0^2}
+O(c_0^{-4})
$$

For a point mass, the resulting delay is
$$
\Delta t_{\mathrm{eff}}
=
\frac{(1+\gamma_{\mathrm{PPN}})G_N M}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_0^{-5})
$$
which must match the GR coefficient at current solar-system precision.

### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\mathrm{PPN}})
\frac{G_N M}{b\,c_0^2}
$$
with impact parameter $b$. In the GR-matching limit $\gamma_{\mathrm{PPN}}=1$, this reduces to the standard
$$
\Delta\theta \approx \frac{4G_N M}{b\,c_0^2}
$$

So Shapiro delay and lensing are not separate fit channels. They are two readouts of the same constitutive coefficient.

### Perihelion and 1PN orbital structure

The effective metric subclass must also reproduce the standard 1PN orbital correction structure, summarized through the PPN parameters $\gamma_{\mathrm{PPN}}$ and $\beta_{\mathrm{PPN}}$. At the phenomenology level the requirement is simple:

- Mercury-type precession,
- geodetic precession,
- and other weak-field orbital tests

must all be reproduced by the same $(\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_i)$ package already used for light and clock observables.

For the classical weak-field suite, the comparison record can be made explicit. On an observation window $W$, let $\theta_W$ denote the retained Noether sea state, source assembly record, observer clock/ruler state, signal-channel data, boundary wake data, and the ADM/Cartan projection
$$
\theta_W
\longmapsto
\left(
N,u^i_{\mathrm{sea,eff}},e^a{}_i,\gamma_{ij}^{\mathrm{eff}},
\Phi_{\text{eff}},
\chi_{\text{sea}}
\right)
$$
The observable residual bundle is then
$$
\mathbf{r}_{\mathrm{GR}}(\theta_W)
=
\begin{pmatrix}
R_{\mathrm{red}}\\
R_{\mathrm{Shap}}\\
R_{\mathrm{lens}}\\
R_{\mathrm{acc}}\\
R_{\mathrm{1PN}}\\
\alpha_1\\
\alpha_2\\
\alpha_3
\end{pmatrix},
\qquad
R_{\mathrm{acc}}
=
\frac{\left\|\frac{d^2x_{\mathrm{eff}}^i}{dt_{\mathrm{eff}}^2}+(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W}
{\left\|(\gamma_{\mathrm{eff}}^{-1})^{ij}\partial_{x_{\mathrm{eff}}^j}\Phi_{\text{eff}}\right\|_W+\varepsilon}
$$
The redshift, Shapiro, lensing, acceleration, 1PN, and preferred-frame rows are acceptable only when they are projections of this same $\theta_W$. If any row requires replacing $N$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, $\gamma_{ij}^{\mathrm{eff}}$, $\Phi_{\text{eff}}$, $\chi_{\text{sea}}$, or the boundary/noise record, the phenomenology pass has become a set of separate fits rather than a GR recovery.

Solar oblateness supplies the nuisance-control version of the same rule. Mercury-type precession may be written as
$$
\Delta\varpi_{\mathrm{obs}}
=
\Delta\varpi_{\mathrm{PPN}}(\theta_W)
+\Delta\varpi_{J_{2,\odot}}
+\Delta\varpi_{\mathrm{asteroid}}
+\Delta\varpi_{\mathrm{noise}}
$$
where $\Delta\varpi_{J_{2,\odot}}$ is the contribution from the Sun's quadrupole moment and the remaining terms collect other modeled ephemeris corrections. A constitutive map cannot improve its PPN fit by silently moving a mismatch into $\Delta\varpi_{J_{2,\odot}}$ or by using a solar-interior assumption inconsistent with helioseismology and light-deflection records. The precession row closes only after the nuisance record is fixed independently enough that $\Delta\varpi_{\mathrm{PPN}}$ is the recovered effect rather than a residual after subtraction.

The perihelion row should carry the explicit GR target rather than only the name of the test. For a weak-field bound orbit with semi-major axis $a$ and eccentricity $e$,
$$
\Delta\varpi_{\mathrm{GR}}
=
\frac{6\pi G_N M}{a(1-e^2)c_0^2}
$$
per orbit. In the PPN projection this is the special case of
$$
\Delta\varpi_{\mathrm{PPN}}
=
\frac{2\pi G_N M}{a(1-e^2)c_0^2}
\left(2+2\gamma_{\text{PPN}}-\beta_{\text{PPN}}\right)
$$
so Mercury-type precession is a joint test of the same spatial-compliance coefficient that controls lensing and the same nonlinear clock coefficient that controls $\beta_{\text{PPN}}$.

### Low-Energy Quantum-Gravity EFT Benchmark

The classical weak-field observables above do not exhaust the recovery gate. Standard low-energy effective-field-theory calculations treat GR as a valid long-distance theory and separate unknown high-energy local terms from calculable infrared behavior. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not take the quantized metric as microscopic ontology, but it must recover the same long-distance observer-level data product where the expansion is controlled.

For two slowly moving masses, use the schematic benchmark

$$
V_{\mathrm{GR\text{-}EFT}}(r)
=
-\frac{G_N m_1 m_2}{r}
\left[
1
+\alpha_{\mathrm{1PN}}\frac{G_N(m_1+m_2)}{c_0^2 r}
+\alpha_{\hbar}\frac{G_N\hbar}{c_0^3 r^2}
+\cdots
\right]
$$

where $\alpha_{\mathrm{1PN}}$ and $\alpha_{\hbar}$ are fixed by the standard low-energy calculation rather than fitted as new $\mathbb{A}\mathbb{A}\mathbb{A}$ parameters. A useful closure residual is

$$
\mathcal{R}_{\mathrm{qG}}(r;\theta)
=
\left|
\frac{
V_{\mathbb{A}\mathbb{A}\mathbb{A}}(r;\theta)
-V_{\mathrm{GR\text{-}EFT}}(r)
}{
G_N m_1 m_2/r
}
\right|
$$

This residual is not a demand that the Noether sea be rewritten as a graviton field. It is a demand that the same weak-field constitutive record that yields redshift, lensing, and wave propagation also recover the long-distance quantum correction in the regime where the effective theory is predictive.

Massive-superposition entanglement experiments add a second low-energy quantum-gravity benchmark. If two isolated massive probes acquire an entanglement witness through gravity alone, the retained data product is the branch-dependent interaction phase, not a decision between graviton-field ontology and quantized-geometry ontology. The corresponding validation packet in [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md) requires the same effective-metric record $\theta$ to generate the mediated-entanglement phase while keeping non-gravitational coupling residuals bounded and preventing the gravity-side response from becoming an unmodeled which-path record.

## Equivalence-Principle Channels

The weak equivalence principle and the strong equivalence principle are distinct benchmark rows. For two compact test assemblies $A$ and $B$ falling toward an external source $S$, define the composition residual
$$
\eta_{AB}^{S}
=
\frac{2(a_A^S-a_B^S)}{a_A^S+a_B^S}
$$
The weak equivalence row requires $\eta_{AB}^{S}$ to vanish within the material-composition bounds while the same clock, signal, and PPN record is held fixed. The point is not to assume equivalence as a substrate axiom, but to recover it as an observer-level constraint on the same record $\theta_W$. If local clock/ruler states for different apparatuses are allowed to absorb the gravitational response through material-dependent scale factors $\lambda_A(x_{\mathrm{eff}}^i;\theta_W)$, the residual must also satisfy
$$
\mathcal{R}_{\mathrm{scale\text{-}EP}}^{S}(\theta_W)
=
\max_{A,B}
\frac{
\left\|
\nabla\ln\!\left(\lambda_A/\lambda_B\right)
\right\|_W
}{
\left\|\nabla\Phi_{\text{eff}}\right\|_W/c_0^2+\varepsilon
}
\ll 1
$$
with the source assembly, boundary wake data, cosmological record, and PPN coefficients held fixed. This forbids a flat-description or local-unit rewriting from replacing universal gravitational acceleration by apparatus-specific material response.

The same statement can be read in mechanism language. Inertial response and gravitational response need not have identical substrate triggers: one can come from imposed acceleration of the assembly ledger, while the other can come from a Noether sea gradient. They recover the equivalence principle only if both triggers perturb the same shielded internal ledger through the same weak homogeneous response map. Any Mach-like dependence on the surrounding matter distribution must therefore appear as a common-mode feature of $\theta_W$, not as a body-specific adjustment of inertia.

Equivalence recovery therefore couples the torsion-balance row, clock-comparison row, and cosmological/boundary record: a Mach-like dependence of inertial standards on the surrounding matter distribution is admissible only if it is common to the accepted observer record and leaves no composition-dependent acceleration residue.

A separate strong-equivalence row tests whether gravitational self-energy or medium binding changes the acceleration of extended bodies:

$$
\eta_{\mathrm{SEP}}
=
\frac{\Delta a_{\mathrm{self}}}{a}
\bigg/
\left(
\frac{E_{\mathrm{grav},1}}{m_1c_0^2}
-
\frac{E_{\mathrm{grav},2}}{m_2c_0^2}
\right)
$$
where the denominator compares gravitational binding-energy fractions for two bodies in the same external field. This row is a recovery target for lunar-ranging, binary-pulsar, and compact-body tests; it is not interchangeable with the material-composition torsion-balance row. The same residual bundle must also keep active, passive, inertial, and energy-defined mass equal in the nonrelativistic limit, or else the Newtonian and PPN rows are being fit with inconsistent mass concepts.

## Preferred-Frame Leakage

Because the ontology contains an absolute frame, the observer-level phenomenology must still suppress preferred-frame signatures.

That means the effective PPN drift parameters
$$
\alpha_1,\alpha_2,\alpha_3
$$
must be observationally negligible in validated regimes. This is not optional. If the Noether sea leaves a measurable preferred-frame residue in the solar-system and pulsar regimes, the spacetime branch fails regardless of its conceptual elegance.

## Gravitational-Wave Channel

The Noether sea picture must recover the observed near-luminal propagation of gravitational disturbances:
$$
\left|\frac{v_{\mathrm{GW}}-c_0}{c_0}\right|
\le
\varepsilon_{\mathrm{GW}}
$$

Here $\varepsilon_{\mathrm{GW}}$ is the multi-messenger speed tolerance owned by the [GW Speed](../validation/constraint-ledger.md#gw-speed) ledger row. In this framework, gravitational waves are propagating collective disturbances of the Noether sea. Their speed, dispersion, and polarization content must remain consistent with current timing bounds and detector-mode constraints. Any large medium-dispersion signature or unsuppressed scalar/vector/longitudinal response in already-tested bands is excluded. A cosmological-scale finite-range response must therefore decouple from the weak-field gravitational-wave channel through the same constitutive coefficient record, not through an observational-channel-specific patch.

## Strong-Field Regime

Weak-field GR matching is the conservative requirement. Strong-field behavior is where the theory may differ.

Use the canonical event-horizon alignment condition defined in
[singularity-resolution.md](./singularity-resolution.md#canonical-strong-field-alignment-condition).

The strong-field interpretation is therefore:

- outside the alignment regime, GR-like effective geometry should emerge to the accuracy already tested,
- near the alignment regime, departures may appear through medium saturation, coplanarity, altered signal propagation, and assembly reconfiguration,
- but those departures must be stated as predictions, not used as excuses to miss weak-field closure.

The exterior benchmark still includes the standard compact-object scales before any native horizon-interface departure is promoted:
$$
r_s=\frac{2G_N M}{c_0^2},
\qquad
r_{\mathrm{ph}}=\frac{3G_N M}{c_0^2},
\qquad
r_{\mathrm{ISCO}}=\frac{6G_N M}{c_0^2}
$$
for the Schwarzschild comparison branch. The first is the effective horizon radius, the second the null photon-orbit radius, and the third the innermost stable circular orbit for massive test bodies in the nonrotating exterior comparison. A native black-hole record may reinterpret what the horizon is made of, but it must still recover these exterior scales, or provide a declared residual template, before using strong-field ontology to explain compact-object observations.

## Closure Targets

This chapter is closed only if the spacetime branch can demonstrate all of the following from one constitutive map:

1. clock slowing / redshift,
2. Shapiro delay,
3. light bending,
4. 1PN orbital corrections,
5. the standard long-distance quantum-gravity EFT correction as an observer-level weak-field benchmark,
6. negligible preferred-frame leakage in tested regimes,
7. gravitational-wave speed, dispersion, and two-mode polarization compatibility,
8. non-arbitrary finite-boundary continuation wherever a strong-field or cosmological comparison invokes global extension assumptions.

The same coefficient set must survive all eight.

## Falsification Gate

The GR-observables interface fails if any of the following occur:

- redshift, lensing, and Shapiro delay require different constitutive parameter choices,
- the long-distance quantum correction to the Newtonian potential requires an independent weak-field coefficient set,
- preferred-frame leakage exceeds the bounds recorded in [constraint-ledger.md](../validation/constraint-ledger.md),
- gravitational-wave propagation departs from observational timing, dispersion, or polarization bounds in validated regimes,
- a strong-field or cosmology packet needs an unrecorded global assumption to select its continuation,
- or the weak-field map cannot recover the GR coefficients to the required precision while remaining consistent with the rest of the substrate story.

In compact form, the required acceptance set is
$$
\mathcal{C}_{\text{redshift}}
\cap
\mathcal{C}_{\text{Shapiro}}
\cap
\mathcal{C}_{\text{lensing}}
\cap
\mathcal{C}_{\text{1PN}}
\cap
\mathcal{C}_{\text{qG-EFT}}
\cap
\mathcal{C}_{\text{PF}}
\cap
\mathcal{C}_{\text{GW}}
\cap
\mathcal{C}_{\text{cont}}
\neq \varnothing
$$

If that intersection is empty, the effective-metric program is not yet viable.

## Related Chapters

- [emergent-metric.md](./emergent-metric.md)
- [ppn-parameters.md](./ppn-parameters.md)
- [proper-time-and-time-dilation.md](./proper-time-and-time-dilation.md)
- [gravitational-waves.md](./gravitational-waves.md)
- [singularity-resolution.md](./singularity-resolution.md)
- [black-holes.md](./black-holes.md)
- [../validation/constraint-ledger.md](../validation/constraint-ledger.md)
