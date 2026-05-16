# General Relativity Observables

This chapter is the observer-facing checklist for the spacetime branch. Its purpose is to say, in one place, which general-relativistic observables must be matched by the constitutive medium picture and where the framework is allowed to differ only after that closure is secured.

Read it as a phenomenology gate rather than as a derivation chapter: the metric and PPN notes carry the constitutive work, while this page states the observable obligations and their regime boundaries.

## Purpose

This chapter is the observer-level checklist for where the spacetime branch of $\mathbb{A}\mathbb{A}\mathbb{A}$ must reproduce general relativity and where it is allowed to differ. It is not the constitutive derivation itself. That work lives in the metric and PPN chapters. The role of this page is to collect the observable-facing map in one place.

## Core Interpretation

At the substrate level:

- space remains Euclidean,
- time remains absolute,
- and the [Noether Sea](noether-sea.md) is the dynamical medium.

At the observer level, the same medium must generate the effective metric behavior usually attributed to curved spacetime. Therefore the phenomenology requirement is:

$$
\text{medium response}
\;\Longrightarrow\;
\text{effective metric observables}.
$$

The closure demand is not merely qualitative resemblance. The same constitutive map must jointly recover redshift, Shapiro delay, light bending, perihelion precession, and gravitational-wave propagation in the regimes where GR is already tested.

### Causal-order and scale recovery

Before the individual observables are checked, the effective metric map has to pass a structural check: Physical Observers must infer the same causal ordering, local clock scale, and negligible preferred-frame leakage that the GR comparison metric would provide in the validated regime. This is the phenomenology-side version of the causal-order diagnostic in [observer-framework.md](./observer-framework.md#effective-causal-order-recovery):
$$
\mathcal{R}_{\mathrm{causal}}(\theta)
=
d_{\mathrm{ord}}\!\left(\prec_{\mathrm{eff}}(\theta),\prec_{\mathrm{GR}}\right)
+
\lambda_{\tau}
\left\|
\frac{d\tau_{\mathrm{eff}}}{dt}(\theta)
-
\frac{d\tau_{\mathrm{GR}}}{dt}
\right\|_{W}
+
\lambda_{\mathrm{PF}}
\sum_{i=1}^{3}\alpha_i(\theta)^2.
$$
The causal-order term tests the effective light-cone structure, the clock term supplies local scale, and the preferred-frame term keeps the absolute substrate frame hidden below observational bounds. Passing this check does not replace the redshift, Shapiro, lensing, 1PN, quantum-gravity EFT, or gravitational-wave tests below; it prevents them from being fit by mutually incompatible causal and clock conventions.

### Global continuation and cosmic-censorship comparison

Global hyperbolicity, Cauchy surfaces, Cauchy horizons, and cosmic censorship are standard GR comparison tools for asking when initial data determine a maximal observer-level spacetime. They are not substrate assumptions in $\mathbb{A}\mathbb{A}\mathbb{A}$, because the native dynamics live in absolute timespace with path-history records. Their retained value is as an extension discipline: when the effective metric comparison would treat a region as losing unique continuation, the native account must identify which finite boundary wake data, Noether-Sea state, and closure-label ensemble determine the continuation.

The comparison burden can be stated as a finite-access residual rather than as an imported global axiom. For a compact comparison region $\Omega$ and window $W=[t_i,t_f]$, the strong-field or cosmology packet must specify a continuation map from the same record class used by the weak-field observables,
$$
\mathcal{T}_{\Omega,W}^{\theta}:
\left(
X_\Omega(t_i),
\mathcal{H}_{\Omega}^{<t_i},
\mathcal{B}_{\partial\Omega}|_{W},
N_{\text{sea}}|_{\Omega\times W}
\right)
\longrightarrow
\mathcal{S}_{\Omega}(t_f),
$$
where $\mathcal{S}_{\Omega}(t_f)$ is the finite accepted endpoint or branch-label set. A GR comparison that assumes global hyperbolicity can be used only after the same $\theta$ also recovers the local causal-order, clock, PPN, and gravitational-wave observables above. If $\mathcal{S}_{\Omega}(t_f)$ is empty, infinite without a finite ledger, or selected by an external global assumption rather than by the recorded boundary data, the effective-metric continuation has not closed.

## Weak-Field Observables That Must Match GR

### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt}
\approx
\sqrt{1+\frac{2\Phi_N}{c_0^2}-\frac{v^2}{c_0^2}}
$$
in the weak-field, low-velocity observer regime, where $c_0\equiv c_{\text{eff}}(\infty)$ is the dressed asymptotic clock/signal speed. The primitive wake speed $c_f$ still belongs inside delayed-root and self-hit equations; it is not the default denominator for observer clock dilation unless a closure result identifies the relevant dressed branch with $c_f$. For static clocks this reduces to
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_0^2}.
$$

Operationally, GPS offsets, Pound-Rebka, and related clock-comparison tests are the direct acceptance layer. Height-resolved optical-clock comparisons sharpen this layer: near Earth's surface, $\Delta\nu/\nu\approx gL/c_0^2$, so a $1\,\mathrm{mm}$ clock-sample separation corresponds to about $1.1\times10^{-19}$ and a $33\,\mathrm{cm}$ separation to about $3.6\times10^{-17}$. The same clock law must handle both separated clocks and extended collective clock samples without replacing the constitutive coefficients used for Shapiro delay and lensing.

### Shapiro delay

In the refractive-medium picture, one-way path time is
$$
t[\Gamma]=\frac{1}{c_0}\int_\Gamma \bar{\chi}_{\text{sea}}(\mathbf{x})\,ds,
$$
with
$$
\bar{\chi}_{\text{sea}}(\mathbf{x})
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf{x})}
=
\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf{x})
=
1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_0^2}
+O(c_0^{-4}).
$$

For a point mass, the resulting delay is
$$
\Delta t
=
\frac{(1+\gamma_{\text{eff}})GM}{c_0^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_0^{-5}),
$$
which must match the GR coefficient at current solar-system precision.

### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\text{eff}})
\frac{GM}{b\,c_0^2},
$$
with impact parameter $b$. In the GR-matching limit $\gamma_{\text{eff}}=1$, this reduces to the standard
$$
\Delta\theta \approx \frac{4GM}{b\,c_0^2}.
$$

So Shapiro delay and lensing are not separate fit channels. They are two readouts of the same constitutive coefficient.

### Perihelion and 1PN orbital structure

The effective metric subclass must also reproduce the standard 1PN orbital correction structure, summarized through the PPN parameters $\gamma_{\text{eff}}$ and $\beta_{\text{eff}}$. At the phenomenology level the requirement is simple:

- Mercury-type precession,
- geodetic precession,
- and other weak-field orbital tests

must all be reproduced by the same $(\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i)$ package already used for light and clock observables.

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
\right],
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
\right|.
$$

This residual is not a demand that the Noether Sea be rewritten as a graviton field. It is a demand that the same weak-field constitutive record that yields redshift, lensing, and wave propagation also recover the long-distance quantum correction in the regime where the effective theory is predictive.

Massive-superposition entanglement experiments add a second low-energy quantum-gravity benchmark. If two isolated massive probes acquire an entanglement witness through gravity alone, the retained data product is the branch-dependent interaction phase, not a decision between graviton-field ontology and quantized-geometry ontology. The corresponding validation packet in [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md) requires the same effective-metric record $\theta$ to generate the mediated-entanglement phase while keeping non-gravitational coupling residuals bounded and preventing the gravity-side response from becoming an unmodeled which-path record.

## Preferred-Frame Leakage

Because the ontology contains an absolute frame, the observer-level phenomenology must still suppress preferred-frame signatures.

That means the effective PPN drift parameters
$$
\alpha_1,\alpha_2,\alpha_3
$$
must be observationally negligible in validated regimes. This is not optional. If the medium leaves a measurable ether-wind residue in the solar-system and pulsar regimes, the spacetime branch fails regardless of its conceptual elegance.

## Gravitational-Wave Channel

The medium picture must recover the observed near-luminal propagation of gravitational disturbances:
$$
\left|\frac{v_{\mathrm{GW}}-c_0}{c_0}\right| \ll 1.
$$

In repo terms, gravitational waves are propagating collective disturbances of the Noether Sea. Their speed, dispersion, and polarization content must remain consistent with current timing bounds and detector-mode constraints. Any large medium-dispersion signature or unsuppressed scalar/vector/longitudinal response in already-tested bands is excluded. A cosmological-scale finite-range response must therefore decouple from the weak-field gravitational-wave channel through the same constitutive coefficient record, not through an observational-channel-specific patch.

## Strong-Field Regime

Weak-field GR matching is the conservative requirement. Strong-field behavior is where the theory may differ.

Use the canonical event-horizon alignment condition defined in
[singularity-resolution.md](./singularity-resolution.md#canonical-strong-field-alignment-condition).

The strong-field interpretation is therefore:

- outside the alignment regime, GR-like effective geometry should emerge to the accuracy already tested,
- near the alignment regime, departures may appear through medium saturation, coplanarity, altered signal propagation, and assembly reconfiguration,
- but those departures must be stated as predictions, not used as excuses to miss weak-field closure.

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
\neq \varnothing.
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
