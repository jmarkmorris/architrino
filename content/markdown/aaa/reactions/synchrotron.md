# Synchrotron Cascades

Synchrotron cascades are coupled electromagnetic processes in which relativistic charged particles radiate synchrotron photons in magnetic fields, and those photons then trigger secondary channels such as pair production and further radiation. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

## Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics.

## Notation Snapshot

- $\gamma$: electron/positron Lorentz factor.
- $B$: local magnetic-field amplitude.
- $U_B = B^2/(8\pi)$: magnetic energy density.
- $\nu_c$: characteristic synchrotron frequency.
- $P_{\mathrm{syn}}$: synchrotron power per particle.
- $\tau_{\mathrm{syn}}$: synchrotron cooling timescale.
- $\tau_{\mathrm{esc}}$: escape/advection timescale.
- $\tau_{\gamma\gamma}$: pair-production optical-depth proxy.

## Physical Mechanism

A relativistic electron or positron with Lorentz factor $\gamma$ moving in magnetic field $B$ emits synchrotron radiation with characteristic frequency scaling as $\nu_c \propto \gamma^2 B$. If emitted photons are energetic enough and target photons or fields are dense enough, pair production channels open; the new pairs then radiate again, building a multi-generation cascade.

Cascade development is controlled by competition among radiative cooling, pair creation, advection, and escape. In compact high-field zones, this feedback can strongly increase pair loading and opacity.

## Core Equations

A standard synchrotron power scale is

$$
P_{\mathrm{syn}} = \frac{4}{3}\sigma_T c\,U_B\,\gamma^2,
$$

with magnetic energy density

$$
U_B=\frac{B^2}{8\pi}.
$$

The characteristic photon energy is set by

$$
E_{\gamma,\mathrm{syn}} \sim h\nu_c \propto \gamma^2 B.
$$

An operational cooling-scale relation is

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}.
$$

Cascade closure then depends on whether photon energies and path lengths satisfy pair-production thresholds and interaction depths in the local radiation field.

These equations and thresholds are the observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping must recover in validated limits.

## Regime Map

- **Weak-cascade regime:** synchrotron emission present but pair feedback limited; spectrum tracks injected particles.
- **Pair-loaded regime:** secondary pairs significantly modify emissivity and opacity.
- **Fast-cooling regime:** radiative losses dominate transport times; high-energy particles cool before escape.
- **Escape-dominated regime:** particles or photons leave the zone before deep cascade development.

## Observable Consequences

- Broadband non-thermal continua with curvature and breaks tied to cooling and escape scales.
- Polarization signatures tracing magnetic-field geometry and turbulence level.
- Pair-opacity features and spectral softening at high energies in compact sources.
- Strong coupling to inverse Compton and bremsstrahlung channels in dense radiation or matter environments.

## Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

Standard high-energy source models treat synchrotron cascades as local plasma-radiation processes governed by magnetic structure, injection spectra, and transport. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same radiative microphysics is retained while interpretation shifts to mapping cascade outputs onto assembly transport and SMBH-local recycling histories.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Mapping (Provisional)

Status convention used below:

- **Baseline:** established relation retained unchanged.
- **Provisional map:** ontology-level working hypothesis pending deeper derivation.
- **Requirement:** compatibility condition for known observables.

At the ontology level, synchrotron emission is interpreted as energy shedding from curved charged-assembly transport in magnetized medium states. The emitted photon channel remains the same observable channel as in standard modeling; the reinterpretation is about substrate bookkeeping and transport history, not cross-section replacement.

A minimal mapping for cascade depth can be expressed as a dimensionless competition ratio

$$
\mathcal{C}_{\mathrm{cas}} \equiv \frac{\tau_{\mathrm{esc}}}{\tau_{\mathrm{syn}}} \, \tau_{\gamma\gamma},
$$

with qualitative regimes:

- $\mathcal{C}_{\mathrm{cas}} \ll 1$: shallow cascade, injection-tracing spectra.
- $\mathcal{C}_{\mathrm{cas}} \sim 1$: transitional pair feedback.
- $\mathcal{C}_{\mathrm{cas}} \gg 1$: deep pair-loaded cascade.

This is a provisional map variable, not a claimed first-principles closure.

## Observer-Frame Transport

For cosmology-facing use, source-frame emissivity must be propagated to observer-frame spectra with explicit redshift and transfer factors:

$$
j_{\nu}^{\mathrm{obs}}(z_{\mathrm{obs}}) = (1+z)^{-3} \, j_{\nu(1+z)}^{\mathrm{em}}(z_{\mathrm{em}})\,\mathcal{T}(\nu,z_{\mathrm{em}}\rightarrow z_{\mathrm{obs}}),
$$

with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must reduce to conventional transport results used in high-energy astrophysics.

For substrate vs operational timing, cooling/transport bookkeeping may require explicit conversion between absolute-time and proper-time rate expressions in relativistic zones. In this file, rate equations are observer-level unless a mapping section states otherwise.

Propagation and timing conventions must stay explicit when synchrotron outputs are used in cosmology-linked arguments.

## Anticipated Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Map pair-loading predictions to assembly-density and outflow-structure variables without changing QED/QED-like reaction channels.
- Quantify joint regimes where synchrotron cascades and bremsstrahlung together set the photon bath relevant to nucleation-era mapping.
- Bound acceptable parameter freedom in provisional mapping variables so parsimony does not degrade relative to standard transport models.
