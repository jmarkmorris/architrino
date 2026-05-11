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

## Weak-Field Observables That Must Match GR

### Gravitational redshift and clock rates

The clock channel must reproduce
$$
\frac{d\tau}{dt}
\approx
\sqrt{1+\frac{2\Phi_N}{c_f^2}-\frac{v^2}{c_f^2}}
$$
in the weak-field, low-velocity regime. For static clocks this reduces to
$$
\frac{\Delta \nu}{\nu}
\approx
\frac{\Delta \Phi_N}{c_f^2}.
$$

Operationally, GPS offsets, Pound-Rebka, and related clock-comparison tests are the direct acceptance layer.

### Shapiro delay

In the refractive-medium picture, one-way path time is
$$
t[\Gamma]=\frac{1}{c_f}\int_\Gamma \chi_{\text{sea}}(\mathbf{x})\,ds,
$$
with
$$
\chi_{\text{sea}}(\mathbf{x})=1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+O(c_f^{-4}).
$$

For a point mass, the resulting delay is
$$
\Delta t
=
\frac{(1+\gamma_{\text{eff}})GM}{c_f^3}
\ln\!\left(\frac{r_1+r_2+R}{r_1+r_2-R}\right)
+O(c_f^{-5}),
$$
which must match the GR coefficient at current solar-system precision.

### Light bending

The same refractive map must recover the 1PN deflection law
$$
\Delta\theta
\approx
2(1+\gamma_{\text{eff}})
\frac{GM}{b\,c_f^2},
$$
with impact parameter $b$. In the GR-matching limit $\gamma_{\text{eff}}=1$, this reduces to the standard
$$
\Delta\theta \approx \frac{4GM}{b\,c_f^2}.
$$

So Shapiro delay and lensing are not separate fit channels. They are two readouts of the same constitutive coefficient.

### Perihelion and 1PN orbital structure

The effective metric subclass must also reproduce the standard 1PN orbital correction structure, summarized through the PPN parameters $\gamma_{\text{eff}}$ and $\beta_{\text{eff}}$. At the phenomenology level the requirement is simple:

- Mercury-type precession,
- geodetic precession,
- and other weak-field orbital tests

must all be reproduced by the same $(\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i)$ package already used for light and clock observables.

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
\left|\frac{v_{\mathrm{GW}}-c}{c}\right| \ll 1.
$$

In repo terms, gravitational waves are propagating collective disturbances of the Noether Sea. Their speed, dispersion, and polarization content must remain consistent with current timing bounds. Any large medium-dispersion signature in already-tested bands is excluded.

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
5. negligible preferred-frame leakage in tested regimes,
6. gravitational-wave speed compatibility.

The same coefficient set must survive all six.

## Falsification Gate

The GR-observables interface fails if any of the following occur:

- redshift, lensing, and Shapiro delay require different constitutive parameter choices,
- preferred-frame leakage exceeds the bounds recorded in [constraint-ledger.md](../validation/constraint-ledger.md),
- gravitational-wave propagation departs from observational timing bounds in validated regimes,
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
\mathcal{C}_{\text{PF}}
\cap
\mathcal{C}_{\text{GW}}
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
