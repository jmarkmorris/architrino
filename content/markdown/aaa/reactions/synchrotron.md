# Synchrotron

Synchrotron radiation is the observer-level process in which relativistic charged particles following curved paths in a magnetic environment emit broadband, polarized photons. A synchrotron cascade begins when those photons trigger secondary channels such as pair production and the new charged particles radiate again. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

## Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics.

Terminology in this chapter follows [mode-taxonomy.md](mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

## Notation Snapshot

- $\gamma$: electron/positron Lorentz factor.
- $B$: local magnetic-field amplitude.
- $U_B = B^2/(8\pi)$: magnetic energy density.
- $\nu_c$: characteristic synchrotron frequency.
- $P_{\mathrm{syn}}$: synchrotron power per particle.
- $\tau_{\mathrm{syn}}$: synchrotron cooling timescale.
- $\tau_{\mathrm{esc}}$: escape/advection timescale.
- $\tau_{\gamma\gamma}$: pair-production optical-depth proxy.
- $\mathcal{V}_{\mathrm{NS}}$: provisional anisotropic Noether sea state mapped to observer-level magnetic structure.
- $G_{\text{grad}}$: local Noether sea gradient forcing data inherited from the shared radiation closure program.
- $\mathcal{R}_{\Theta}^{\mathrm{syn}}$: synchrotron closure residual produced by curved charged-assembly transport.
- $\mathcal{S}_{\gamma}^{\mathrm{syn}}$: synchrotron photon-channel drive for planar-mode nucleation.

## Physical Mechanism

A relativistic electron or positron with Lorentz factor $\gamma$ moving in magnetic field $B$ emits synchrotron radiation with characteristic frequency scaling as $\nu_c \propto \gamma^2 B$. If emitted photons are energetic enough and target photons or fields are dense enough, pair production channels open; the new pairs then radiate again, building a multi-generation cascade.

Cascade development is controlled by competition among radiative cooling, pair production, advection, and escape. In compact high-field zones, this feedback can strongly increase pair loading and opacity.

This is the observer-level mechanism. The $\mathbb{A}\mathbb{A}\mathbb{A}$ layer below does not replace these formulas; it asks which Noether braid velocity deformation and closure residual must be present for the same photon output to occur, and whether an anisotropic Noether sea state is required to carry part of that response.

## Core Equations

A standard synchrotron power scale is

$$
P_{\mathrm{syn}} = \frac{4}{3}\sigma_T c\,U_B\,\gamma^2
$$

with magnetic energy density

$$
U_B=\frac{B^2}{8\pi}
$$

Magnetic-field expressions in this chapter use Gaussian units; the radiation-zone angular and total-power targets below are quoted in SI with explicit $\epsilon_0$. Each display is internally consistent within its declared system, and constants must not be mixed across systems.

The characteristic photon energy is set by

$$
E_{\gamma,\mathrm{syn}} \sim h\nu_c \propto \gamma^2 B
$$

For pitch angle $\alpha$, a standard critical-frequency expression is

$$
\nu_c = \frac{3}{2}\gamma^2\frac{eB}{2\pi m_e c}\sin\alpha
$$

For isotropic pitch-angle distributions, $\langle\sin\alpha\rangle = \pi/4$, so the ensemble-averaged characteristic frequency becomes $\nu_c \approx (3e/16 m_e c)\gamma^2 B$.

An operational energy-loss (cooling) timescale relation is

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

Here $\tau_{\mathrm{syn}}$ denotes a characteristic energy-loss timescale ($E/|dE/dt|$), distinct from the instantaneous synchrotron power rate $P_{\mathrm{syn}}$.

Cascade closure then depends on whether photon energies and path lengths satisfy pair-production thresholds and interaction depths in the local radiation field.

These equations and thresholds are the observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping must recover in validated limits.

### Spectral Shape and Cooling Breaks

For power-law injection $N(\gamma) \propto \gamma^{-p}$ in the slow-cooling regime ($\tau_{\mathrm{syn}} > \tau_{\mathrm{esc}}$), let $\nu_m=\nu_c(\gamma_{\min})$ and $\nu_{\mathrm{cool}}=\nu_c(\gamma_{\mathrm{cool}})$, with $\nu_m<\nu_{\mathrm{cool}}$. The optically thin spectrum has three segments:

$$
j_\nu \propto \begin{cases}
\nu^{1/3}, & \nu < \nu_m, \\
\nu^{-(p-1)/2}, & \nu_m < \nu < \nu_{\mathrm{cool}}, \\
\nu^{-p/2}, & \nu_{\mathrm{cool}} < \nu < \nu_{\mathrm{max}}.
\end{cases}
$$

Here $\nu_{\mathrm{max}} \propto \gamma_{\mathrm{max}}^2 B$ is the maximum synchrotron frequency set by the highest injected Lorentz factor. The middle slope alone must not be extended below $\nu_m$ or above the cooling break.

In the fast-cooling regime ($\tau_{\mathrm{syn}} < \tau_{\mathrm{esc}}$), electrons cool to a break Lorentz factor

$$
\gamma_{\mathrm{cool}} \approx \frac{6\pi m_e c}{\sigma_T B^2 t_{\mathrm{esc}}}
$$

and, with $\nu_m=\nu_c(\gamma_{\min})$ the injection frequency of the minimum injected Lorentz factor $\gamma_{\min}$, the fast-cooling spectrum has the standard three-segment form

$$
j_\nu \propto \begin{cases}
\nu^{1/3}, & \nu < \nu_c(\gamma_{\mathrm{cool}}), \\
\nu^{-1/2}, & \nu_c(\gamma_{\mathrm{cool}}) < \nu < \nu_m, \\
\nu^{-p/2}, & \nu > \nu_m.
\end{cases}
$$

The $-1/2 \to -p/2$ break sits at the injection frequency $\nu_m$, not at $\nu_c(\gamma_{\mathrm{cool}})$.

These break structures are testable against broadband SEDs in AGN jets, GRBs, and pulsar wind nebulae.

Synchrotron self-absorption supplies the low-frequency inverse channel. With absorption coefficient $\alpha_\nu^{\mathrm{ssa}}$ and source function

$$
S_\nu^{\mathrm{ssa}}
=
\frac{j_\nu}{\alpha_\nu^{\mathrm{ssa}}},
$$

a homogeneous optically thick power-law source approaches the standard $I_\nu\propto\nu^{5/2}$ branch below its self-absorption turnover. The same charged-transport event family must generate $j_\nu$, $\alpha_\nu^{\mathrm{ssa}}$, and the source function; otherwise emission and absorption have been fitted independently. Plasma suppression, including the observer-level Razin-Tsytovich limit, is a separate transport recovery and must not be hidden inside the self-absorption coefficient.

## Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^\pm \xrightarrow{B} e^\pm + \gamma_{\mathrm{syn}}$ (effective synchrotron emission channel, with $B$ an environment rather than a reaction participant).
- $\gamma + \gamma \rightarrow e^+ + e^-$ (Breit-Wheeler two-photon interaction / photon-photon pair-production channel in dense radiation fields, distinct from Schwinger vacuum pair production).
- Secondary-loop channel: newly produced $e^\pm$ re-enter synchrotron emission, closing the cascade.

Secondary channels below the 1% contribution level are treated as corrections unless a specific regime elevates them.
This 1% threshold is a modeling convention for cascade tractability, not a fundamental physics cutoff. Subdominant channels (for example, triplet pair production $e^\pm + \gamma \rightarrow e^\pm + e^+ + e^-$, relevant in strong magnetic fields) may be included in detailed transport codes but are omitted here for pedagogical focus.

## Radiation Inheritance

Synchrotron emission is the curved charged-assembly transport specialization of the shared radiation program in [Radiation](radiation.md). The standard phrase "a magnetic field bends a relativistic charge and the charge radiates" remains the observer-level baseline. In the provisional sea-mediated branch studied here, the channel-specific hypothesis is narrower: anisotropic Noether sea transport and gradient forcing deform the moving Noether braid faster than its internal closure ledgers can retune, leaving a residual that may enter the planar-mode basin. A direct-wake or mixed branch remains admissible until the provenance controls distinguish it.

The inherited skeleton is

$$
\text{Noether braid velocity deformation in anisotropic Noether sea transport}
\longrightarrow
\text{synchrotron closure residual}
\longrightarrow
\text{wake-strain threshold}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual internal energy, or pair-channel handoff}
$$

The radiation page writes the retuned transport state as $\mathbf{V}$. In this channel, $\mathbf{V}$ is the Noether braid velocity-deformation state of the charged assembly during curved transport through $\mathcal{V}_{\mathrm{NS}}$. A channel-local closure mismatch can therefore be written as the derivation target

$$
\delta\Theta_a^{\mathrm{syn}}
=
\Theta_a(T;\mathbf{V}_{\text{curved}},G_{\text{grad}},\mathcal{V}_{\mathrm{NS}})
-
\Theta_a(T;\mathbf{V}_{\text{adiabatic}},G_{\text{grad}},\mathcal{V}_{\mathrm{NS}}),
\qquad
a\in\{1,2,3\}
$$

The corresponding residual norm specializes the shared radiation residual:

$$
\mathcal{R}_{\Theta}^{\mathrm{syn}}
=
\left(\sum_{a\in\{1,2,3\}}w_a\left(\delta\Theta_a^{\mathrm{syn}}\right)^2\right)^{1/2}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma_{e^\pm}(T),
\mathcal{C}_{o'j}(T),
J_{o'j},
\rho_{\text{NS}}(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T);
\mathcal{V}_{\mathrm{NS}},
G_{\text{grad}},
\mathbf{V}_{\text{curved}}
\right)
$$

Here $\Gamma_{e^\pm}(T)$ is the charged assembly microstate; $\mathcal{C}_{o'j}(T)$ and $J_{o'j}$ are the active causal-root and Jacobian data; $\mathcal{V}_{\mathrm{NS}}$ is the anisotropic Noether sea state provisionally mapped to the observer-level $B$ field; and $G_{\text{grad}}$ records the gradient forcing that skews delay loops. This equation is not a derivation of synchrotron radiation. It names the residual functional that must later recover the validated frequency, power, cooling-break, and polarization limits.

The planar-mode gate is inherited from [Radiation](radiation.md):

$$
\mathcal{S}_{\gamma}^{\mathrm{syn}}
\equiv
\mathcal{S}_{\gamma}\!\left(
\Gamma_{e^\pm},
\mathcal{R}_{\Theta}^{\mathrm{syn}},
\mathcal{V}_{\mathrm{NS}},
G_{\text{grad}},
J_{\text{loc}}
\right)
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}^{\mathrm{syn}}\ge E_{\gamma,\min}
$$

The wake-strain threshold is therefore the channel's local expression of the planar-mode basin boundary. If the residual is sub-threshold, the event must route energy into medium excitation, recoil, or residual internal energy rather than silently declaring a missing photon. If the threshold is crossed, the emitted photon must still satisfy the standard synchrotron scaling target

$$
\nu_{\gamma}^{\mathrm{out}}
\longrightarrow
\nu_c
=
\frac{3}{2}\gamma^2\frac{eB_{\mathrm{eff}}}{2\pi m_e c}\sin\alpha
$$

in weak homogeneous limits, with $B_{\mathrm{eff}}$ the observer-level magnetic amplitude reconstructed from $\mathcal{V}_{\mathrm{NS}}$. The $\gamma^2B$ scaling must come from the coupled velocity-deformation and anisotropic-state map, not from tuning $\mathcal{S}_{\gamma,*}$ after the fact.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Synchrotron emission channel:** (provisional map) curved charged-assembly transport through an anisotropic Noether sea state produces $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ by Noether braid velocity deformation and gradient forcing. If the inherited planar-mode threshold is crossed, the event nucleates [photon assemblies](../assemblies/bosons/electroweak-bosons.md) from interaction energy / wake stress while conserving charged-assembly identity. The photon-side target is the proposed **coaxial contra-rotating polarity-conjugate planar pair** description (referent-pending).
- **Pair channel:** (provisional map) two-photon overlap, with each photon treated as a coaxial contra-rotating polarity-conjugate planar pair, associates local substrate content into a charged $e^+e^-$ assembly pair; this association must strictly conserve net architrino count and charge of participating assemblies (photons + neutral Noether sea braids $\rightarrow e^+ + e^-$), with provenance and conservation bookkeeping explicit.
- **Cascade loop:** (provisional map) repeated emission-pair-emission cycles are modeled as repeated mode-lock events under the same observer-level thresholds.

## Shared Photon Event Record

Use the same photon-channel event record here as in [Radiation](radiation.md), [Bremsstrahlung](bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md). A synchrotron planar-mode event should record:

- charged assembly identity, energy, momentum, pitch geometry, and path-history provenance before and after the curved transport segment;
- Noether braid velocity-deformation state, effective magnetic-state map $\mathcal{V}_{\mathrm{NS}}$, gradient forcing $G_{\text{grad}}$, and local Noether sea variables $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, excitation state, and causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{syn}}$, wake-strain eigenvalue or threshold status, and photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{syn}}$ that permits or forbids planar-mode nucleation;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon Gate B event residual, including source depletion, recoil, causal-wake, accepted/rejected handoff, helicity, and balance rows;
- recoil, medium excitation, residual internal energy, and pair-channel handoff terms when the emitted photon enters a cascade loop.

For the emitting charged assembly, the source-depletion identity is

$$
\Delta\mathcal Q_{e^\pm}^{0}
=
\mathcal Q_{\gamma}^{\mathrm{sub}}
+
\mathcal Q_{\mathrm{recoil}}^{0}
+
\mathcal Q_{\mathrm{med}}^{0}
+
\mathcal Q_{\mathrm{wake}}^{0}
+
\mathcal Q_{\mathrm{handoff}}^{0}
+
\mathcal Q_{\mathrm{rem}}^{0},
\qquad
\mathcal Q\in\{E,\mathbf p,\mathbf J\}
$$

Pair-production cascade vertices close the incoming photon ledger and then recruit identity-routed charged-assembly content from the named target or Noether sea reservoir; they do not treat photon energy alone as an identity source.

This record is a derivation target. It must recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, standard polarization limits, and Breit-Wheeler behavior in validated regimes before any Noether sea-dependent deviation is treated as physical. The polarization basis, transverse angular-momentum ledger, and linear-polarization limits are photon Gate B consumers from [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), not a local derivation of photon helicity.

## Observer-Level Closure Checks

- Pair threshold closure: enforce $s = (k_1+k_2)^2 \ge 4m_e^2c^4$ for $\gamma\gamma \rightarrow e^+e^-$, where $k^\mu_i$ are photon 4-momenta. In the head-on collision frame this reduces to $E_1 E_2 \ge (m_e c^2)^2$; for general angle $\theta_{12}$ between photon directions, $E_1 E_2 (1-\cos\theta_{12}) \ge 2(m_e c^2)^2$. Breit-Wheeler cross-section peak occurs near $s \approx 8 m_e^2 c^4$ and must be reproduced in validated cascade limits.
- Frequency closure: recover $\nu_c = (3/2)\gamma^2(eB/2\pi m_e c)\sin\alpha$ and the ensemble scaling $\nu_c\propto\gamma^2B$ in uniform-field, weak homogeneous limits.
- Jet-shock polarization closure: in resolved AGN or microquasar working surfaces, shock compression should rotate the observer-level synchrotron polarization basis consistently with the effective $B_{\mathrm{eff}}$ geometry inferred from $\mathcal{V}_{\mathrm{NS}}$. For a declared knot or hot-spot region $K$, a useful residual is
$$
\Delta_{\mathrm{pol}}^{K}
=
\left\langle
\sin^2\!\left[
\psi_{\mathrm{syn}}(x_{\mathrm{eff}}^i)
-
\psi_{B,\mathrm{eff}}^{\perp}(x_{\mathrm{eff}}^i)
\right]
\right\rangle_{x_{\mathrm{eff}}^i\in K}^{1/2}
$$
where $\psi_{\mathrm{syn}}$ is the synthetic linear-polarization angle and $\psi_{B,\mathrm{eff}}^{\perp}$ is the projected field-compression basis expected for the observer-level shock model. The target is not a new free-photon polarization proof; it is a source-scale Gate B consumer. Persistent knot-scale misalignment, after accounting for Faraday rotation, beam averaging, and turbulent depolarization, would falsify the directional $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map in that regime.
- Radiation-zone closure: for the local transverse-acceleration segment with $\mathbf{v}\cdot\mathbf{a}_\perp=0$, axes chosen so $\mathbf{v}$ lies along $z$ and $\mathbf{a}_\perp$ along $x$, and $\beta=\|\mathbf{v}\|/c$, recover the angular target

$$
\frac{dP_{\perp,\mathrm{std}}}{d\Omega}
=
\frac{q^2\|\mathbf{a}_\perp\|^2}{16\pi^2\epsilon_0c^3}
\frac{1}{(1-\beta\cos\theta)^3}
\left[
1
-
\frac{\sin^2\theta\cos^2\phi}
{\gamma^2(1-\beta\cos\theta)^2}
\right]
$$

and the total-power target

$$
P_{\perp,\mathrm{std}}
=
\frac{q^2\gamma^4\|\mathbf{a}_\perp\|^2}{6\pi\epsilon_0c^3}
$$

The channel residual is

$$
\Delta_{\mathrm{syn,rad}}
=
\left(
\frac{P_{\mathrm{map}}}{P_{\perp,\mathrm{std}}}-1,
\frac{\nu_{\gamma}^{\mathrm{out}}}{\nu_c}-1,
\Delta_{\gamma,\mathrm{flux}}
\right)
$$

with $\Delta_{\gamma,\mathrm{flux}}$ inherited from [Radiation](radiation.md). In validated weak homogeneous limits, all components must tend to zero without retuning the $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map.
- Rate closure: recover standard synchrotron and Breit-Wheeler limits in validated regimes.
- Absorption closure: recover $\alpha_\nu^{\mathrm{ssa}}$, the optically thick $I_\nu\propto\nu^{5/2}$ branch, and the source function from the same charged-transport event family that supplies $j_\nu$, while keeping Razin-Tsytovich suppression in the material-dispersion row.
- Timing closure: in weak-gravity astrophysical limits, $\Gamma_{\mathrm{eff}} \rightarrow \gamma_{\mathrm{SR}}$ so cooling breaks are preserved. This is an effective closure target for the clock law, not an assumption that substrate time is observer proper time.
- Polarization closure: recover observer-level synchrotron polarization geometry from directional $B$ mapping; in uniform-field limits, failure to recover linear polarization fractions $\Pi \approx 70\%-75\%$ falsifies the geometric mapping (Rybicki and Lightman 1979, Sec. 6.3; observational confirmation in radio pulsars and synchrotron nebulae typically shows $\Pi_{\mathrm{obs}} \sim 0.3$-0.7 (textbook-summarized benchmark; radio-pulsar and synchrotron-nebula polarimetry) after depolarization from field disorder and Faraday rotation).

## Regime Map

- **Weak-cascade regime:** synchrotron emission present but pair feedback limited; spectrum tracks injected particles.
- **Pair-loaded regime:** secondary pairs significantly modify emissivity and opacity.
- **Fast-cooling regime:** synchrotron cooling timescale is shorter than the dynamical/escape timescale, $\tau_{\mathrm{syn}} < \tau_{\mathrm{esc}}$, so high-energy particles cool before escape.
- **Escape-dominated regime:** particles or photons leave the zone before deep cascade development.

## Observable Consequences

- Broadband non-thermal continua with curvature and breaks tied to cooling and escape scales.
- Polarization signatures tracing magnetic-field geometry and turbulence level.
- Pair-opacity features and spectral softening at high energies in compact sources.
- Strong coupling to inverse Compton and bremsstrahlung channels in dense radiation or matter environments.

### Jet and Outflow Source Benchmarks

Relativistic AGN and microquasar jets are the cleanest source-scale benchmark for this chapter because their resolved knots, hot spots, lobes, and broadband continua force the same model to reproduce morphology, spectra, and polarization together. In standard source language, the relevant flow variables are the jet speed $v_j$, Lorentz factor $\gamma_j$, density ratio $\eta_j=\rho_j/\rho_a$, Mach number $M_j$, effective magnetic amplitude $B_{\mathrm{eff}}$, electron distribution $N_e(\gamma)$, and source size $L$. In this chapter they remain observer-level comparison variables reconstructed from the event and medium record, not substrate objects added to the Euclidean void.

For a resolved radio/X-ray jet region $\Omega_j$, the minimal synthetic synchrotron packet is

$$
\mathcal{J}_{\mathrm{syn}}(\Omega_j)
=
\left(
I_{\nu}^{\mathrm{syn}},
I_{\nu}^{\mathrm{IC}},
\Pi_{\nu},
\psi_{\nu},
\nu_{\mathrm{br}},
\tau_{\mathrm{syn}},
\tau_{\mathrm{esc}},
\Delta_{\mathrm{pol}}^{K}
\right)
$$

where $I_{\nu}^{\mathrm{syn}}$ and $I_{\nu}^{\mathrm{IC}}$ are the synthetic synchrotron and inverse-Compton maps, $\Pi_{\nu}$ and $\psi_{\nu}$ are the linear-polarization fraction and angle, $\nu_{\mathrm{br}}$ is the cooling-break frequency, and $\Delta_{\mathrm{pol}}^{K}$ is evaluated on knots or shock-compressed regions. A source model passes this benchmark only if the same electron transport, $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map, and photon event ledger recover both the radio synchrotron and X-ray inverse-Compton morphology without separately tuning the field map for each band.

This source packet also disciplines composition claims. The observed synchrotron continuum proves the presence of relativistic charged leptons and an ordered effective magnetic component, but it does not by itself decide whether the bulk jet is electron-proton, electron-positron, or mixed. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, composition is therefore a downstream identity-routing and inertia-loading problem, not a result that can be read directly from the synchrotron channel alone.

## Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

Standard high-energy source models treat synchrotron cascades as local plasma-radiation processes governed by magnetic structure, injection spectra, and transport. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same radiative microphysics is retained while interpretation shifts to mapping cascade outputs onto assembly transport and SMBH-local recycling histories.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Mapping (Provisional)

Status convention used below:

- **Baseline:** established relation retained unchanged.
- **Provisional map:** ontology-level working hypothesis pending deeper derivation.
- **Requirement:** compatibility condition for known observables.

### Provisional Architrino-Level Mapping

This file uses the following provisional mapping targets.

- **Synchrotron emission (provisional):** a charged Noether braid assembly in curved transport through $\mathcal{V}_{\mathrm{NS}}$ develops a Noether braid velocity deformation. Gradient forcing $G_{\text{grad}}$, transmitter-side root-density bunching, receiver-side root playback, and the changing delayed geometry can leave $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ after ordinary adiabatic retuning fails; when the associated wake-strain state crosses the inherited planar-mode threshold, a photon assembly nucleates and carries the photon-row share of the source-depletion ledger. Recoil, medium, wake, handoff, and remnant rows close the rest. This nucleation threshold must be derivable from wake-strain eigenvalue conditions in simulations; hand-tuning the threshold to match observed $P_{\mathrm{syn}}(\gamma,B)$ or $\nu_c\propto\gamma^2B$ constitutes a fit, not a derivation. The mapping succeeds only if the threshold emerges naturally from the architrino master equation applied to curved charged-assembly trajectories in anisotropic Noether sea states.
- **Magnetic field ontology (provisional mapping):** observer-level $B$ is treated as the effective coarse-grained directional (vector/tensor) vorticity-anisotropy state of the Noether sea, $B \leftrightarrow \mathcal{V}_{\mathrm{NS}}$, not as a separate fundamental void field. This is a mapping target, not settled ontology. Charged-assembly curvature is therefore interpreted provisionally as transport through an anisotropic Noether sea state with explicit directionality. In validated limits, this mapping must: (i) derive the effective Lorentz-force law $\mathbf{F}_{\mathrm{eff}} = q(\mathbf{v}/c) \times \mathbf{B}_{\mathrm{eff}}$ from anisotropic Noether sea transport together with the receiver-side geometry of delayed causal flux, rather than by postulating a primitive cross-product force term; (specifically, show that vorticity-tensor gradients $\partial_i \mathcal{V}^j_{\mathrm{NS}}$ produce perpendicular deflection under boost); (ii) reproduce Maxwell-level electromagnetic-wave propagation (dispersion relation $\omega = ck$ for photon modes in uniform $\mathcal{V}_{\mathrm{NS}}$); (iii) recover synchrotron polarization geometry ($\mathbf{E}_\gamma \perp \mathbf{B}_{\mathrm{eff}}$, $\mathbf{E}_\gamma \perp \mathbf{v}$ in observer frame) from directional emission rules in the Noether sea anisotropy basis, while inheriting photon helicity and analyzer statistics from Gate B rather than deriving them locally. **Falsification criterion:** if simulations with anisotropic Noether sea states fail to produce the factor-of-$\gamma^2$ frequency scaling in $\nu_c$ (tested via swept $B$-field and $\gamma$ at fixed pitch angle), or if polarization vectors misalign with standard geometry by $> 15^\circ$ systematically, this magnetic mapping is unresolved or failed and must be replaced by a new Noether sea / assembly response map.
- **Pair production mapping (provisional):** $\gamma+\gamma\rightarrow e^+ + e^-$ is treated as nucleation of charged assemblies from local Noether sea energy-density concentration triggered by overlap of two photon assemblies modeled as coaxial contra-rotating polarity-conjugate planar pairs above threshold, not ex nihilo creation. The incoming photon assemblies supply energy, momentum, and trigger geometry, not new architrino identities; the recruited Noether sea content must supply the identity-routed inventory. The nucleation threshold must map to the standard kinematic condition $s\ge 4m_e^2$, and the effective rate must asymptotically reproduce the Breit-Wheeler cross-section in the relativistic limit used by cascade modeling. Operational constraint: pair-channel cross-section $\sigma_{\gamma\gamma}(s)$ computed from this nucleation picture must reproduce
$$
\sigma_{\gamma\gamma} = \frac{\pi r_e^2}{2}\left(1-\beta^2\right)\left[\left(3-\beta^4\right)\ln\left(\frac{1+\beta}{1-\beta}\right) - 2\beta(2-\beta^2)\right]
$$
(where $\beta = \sqrt{1-4m_e^2c^4/s}$) to within factor-of-2 accuracy across the range $4m_e^2c^4 < s < 100m_e^2c^4$ used in cascade modeling. Deviations larger than this bound would constitute observable new physics and require dedicated experimental tests beyond astrophysical inference.

These mapping targets are ontology-level and must reduce to standard synchrotron/pair-production observables in validated limits.

### Curvature Convention

In this chapter, "curved transport" means Euclidean-space trajectory curvature of charged assemblies under effective magnetic forcing at substrate level. Observer-level curved-spacetime language is used only as an effective description of transport and timing, not as a replacement for the substrate trajectory picture.

Operationally: compute emissivity and spectra with standard observer-frame equations; interpret underlying trajectory control through the Noether sea anisotropy map when using $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The channel-local curvature object is therefore the Noether braid velocity deformation along the charged assembly's Euclidean trajectory, together with gradient forcing from $G_{\text{grad}}$ and anisotropy from $\mathcal{V}_{\mathrm{NS}}$. Effective geodesic language may still be used for observer-frame propagation and timing, but it is not the event-level cause of planar-mode nucleation in this chapter. Both descriptions must produce identical observer-frame synchrotron emissivity in weak-gravity zones; distinguishing experiments would require near-horizon synchrotron mapping or laboratory strong-field tests.

### Conservation Note for Pair Production

This chapter uses the nucleation interpretation (not creation from nothing): pair channels reorganize substrate content into new charged assemblies. In this ontology, each architrino has provenance and identity through path history in absolute time; interaction channels redistribute and relock existing constituents rather than instantiate new substrate entities.

Thus, when this channel says the incoming photons are consumed, it means their free planar-pair ledgers terminate at the vertex and their energy-momentum and Gate B handoffs enter the event record. It does not mean the outgoing $e^+e^-$ worldlines are simply the photon constituents under new labels. The charged-pair inventories must be supplied by identity-routed local substrate content, and the terminated planar pairs' own constituent architrinos are identity-routed in the same event record: they either join the recruited charged-pair inventories or return to the local Noether sea record, and the ledger must say which.

Operationally, pair production is modeled as association of neutral local substrate content (Noether sea braids)[^architrino-count] into a charged $e^+e^-$ assembly pair when incident photon energy and geometry satisfy the pair threshold window. The incoming photon energy supplies the separation and association work required for charged-state lock-in.

The bookkeeping requirement is therefore threefold: identity-routed global architrino conservation, path-history-consistent provenance through reaction channels, and local energy-momentum conservation at the interaction zone.

Any additional dependence of pair yield on local Noether sea state beyond standard kinematic threshold conditions is treated here as a mapping/simulation goal, not as an asserted observational deviation.

A minimal cascade-depth diagnostic can be expressed through competing timescale ratios. Define the dimensionless cascade parameter as

$$
\mathcal{C}_{\mathrm{cas}} \equiv \left(\frac{\tau_{\mathrm{esc}}}{\tau_{\mathrm{syn}}}\right) \left(\frac{L}{L_{\gamma\gamma}}\right)
$$

where

$$
L_{\gamma\gamma} \equiv (n_\gamma \sigma_{\gamma\gamma})^{-1}
$$

is the photon-photon mean free path and $L$ is the characteristic source size.

Qualitative regimes:

- $\mathcal{C}_{\mathrm{cas}} \ll 1$: shallow cascade, injection-tracing spectra.
- $\mathcal{C}_{\mathrm{cas}} \sim 1$: transitional pair feedback.
- $\mathcal{C}_{\mathrm{cas}} \gg 1$: deep pair-loaded cascade (relevant in compact GRB/blazar zones).

This is a heuristic competition product, not a claimed first-principles closure. In practice, cascade structure also depends on injection spectrum hardness, magnetic-field geometry, and photon escape angles.

## Observer-Frame Transport

For cosmology-facing use, source-frame emissivity must be propagated to observer-frame spectra with explicit signed photon-frequency-transfer and ordinary transfer factors. For a declared emission record $E$ and receiver record $R$, use

$$
1+z_X
=
\exp Z_X^{E\to R},
\qquad
Z_X^{E\to R}
=
Z_{\mathrm{endpoint},X}
+Z_{\mathrm{source},X}
+Z_{\mathrm{launch},X}
+Y_{X,\mathrm{path}}
$$

$$
I_{\nu}^{\mathrm{obs}}(R) = (1+z_X)^{-3} \, I_{\nu(1+z_X)}^{\mathrm{em}}(E)\,\mathcal{T}(\nu,E\rightarrow R)
$$

Here $I_\nu^{\mathrm{em}}(E)$ is the source-side specific intensity assembled by integrating $j_\nu$ and absorption through the emitting column. The $(1+z_X)^{-3}$ law applies to this mapped intensity because $I_\nu/\nu^3$ is invariant; it does not by itself map a volume emissivity without the column and volume factors. The function $\mathcal{T}(\nu,E\rightarrow R)$ is the cumulative transfer function including absorption (for example, $e^{-\tau_{\gamma\gamma}(\nu,z)}$ for pair production on extragalactic background light) and any intervening scattering. The signed $Y_{X,\mathrm{path}}$ term must carry any Compton/Sunyaev-Zeldovich-like frequency exchange rather than being folded into a primitive expansion factor or hidden inside $\mathcal{T}$. For nearby sources ($z_X \ll 1$) with negligible path exchange, $\mathcal{T} \approx 1$.

In the standard homogeneous limit, $1+z_X$ reduces to the conventional transport notation $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must recover the conventional transport results used in high-energy astrophysics.

When the path includes plasma or conducting material, the transfer function must carry the same response rows used by [Radiation](radiation.md). In an effective plasma comparison,

$$
\epsilon_{\mathrm{eff}}(\omega)
\approx
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right),
\qquad
\omega_p^2=\frac{n_{\mathrm{car}}q^2}{m\epsilon_0}
$$

For $\omega > \omega_p$, the transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
$$

while $\omega < \omega_p$ is an evanescent or reflected transport row with $k=i\kappa_{\mathrm{ev}}$ rather than a lost photon ledger. Absorbing conductors use $k=k_1+ik_2$ and add an attenuation factor schematically of the form

$$
\mathcal{T}_{\mathrm{abs}}(\omega)
=
\exp\!\left[-2\int_{\mathrm{path}}k_2(\omega,s)\,ds\right]
$$

If $\epsilon_{\mathrm{eff}}(\omega)=0$ produces a longitudinal plasma oscillation, the cascade record routes it into medium excitation or plasmon-like content. It is not counted as a free photon branch and it cannot repair a failed Gate B no-longitudinal-mode check.

The same plasma record must recover Razin-Tsytovich suppression when refractive beaming is modified at low frequency. That suppression is a medium-dispersion effect and remains distinct from synchrotron self-absorption, even when both contribute to one observed turnover.

### Absolute-Time vs Proper-Time Bookkeeping (Provisional)

In this file, $\tau_{\mathrm{syn}}$ is the observer-frame cooling timescale:

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}} \approx \frac{6\pi m_e c}{\sigma_T B^2\gamma}
$$

For ontology-level bookkeeping, use the conversion

$$
dT = \Gamma_{\mathrm{eff}}(v,\rho_{\text{NS}},n,\Phi_{\text{eff}})\,d\tau_{\mathrm{asm}}
$$

where $T$ is substrate absolute time and $\tau_{\mathrm{asm}}$ is assembly proper time. A $dT/d\tau_{\mathrm{asm}}$ ratio requires a declared clock map; $\Gamma_{\mathrm{eff}}$ is this chapter's working name for the projected cadence-stretch conversion $\Gamma_N$ of [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), with $\Gamma_{\mathrm{eff}}\to\Gamma_N\to\gamma$ in the homogeneous moving branch — one subscript away from the microstate symbol $\Gamma_{e^\pm}$ but a different object. Then

$$
\left(\frac{dE}{dT}\right)_{\mathrm{abs}}=\frac{1}{\Gamma_{\mathrm{eff}}}\left(\frac{dE}{d\tau_{\mathrm{asm}}}\right),
\qquad
\tau_{\mathrm{syn}}^{\mathrm{abs}}=\Gamma_{\mathrm{eff}}\,\tau_{\mathrm{syn}}^{\mathrm{asm}}
$$

Toy mapping example (local weak-gravity zone): if $\gamma=10^4$, $B=1\,\mathrm{G}$, and $\Gamma_{\mathrm{eff}}\approx\gamma$, then

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}}\approx 7.7\times 10^4\,\mathrm{s},
\qquad
\tau_{\mathrm{syn}}^{\mathrm{asm}}\approx \frac{\tau_{\mathrm{syn}}^{\mathrm{obs}}}{\Gamma_{\mathrm{eff}}}\approx 7.7\,\mathrm{s}
$$

Here $\Gamma_{\mathrm{eff}}\approx\gamma$ is a placeholder SR-limit surrogate for dimensional illustration only, not a derived $\mathbb{A}\mathbb{A}\mathbb{A}$ relation. In all validated astrophysical regimes (AGN jets, pulsar wind nebulae, GRB afterglows), $\Gamma_{\mathrm{eff}}$ must reproduce the standard Lorentz factor $\gamma_{\mathrm{SR}}$ to within observational uncertainties on cooling breaks ($\lesssim 10\%$ for well-sampled SEDs). Any deviation is confined to untested extreme environments (for example, within $r \lesssim 3r_g$ of supermassive black holes, or $\rho_{\text{NS}} \gg \rho_{\mathrm{nuclear}}$) and requires explicit simulation bounds showing no conflict with validated-regime data.

Propagation and timing conventions must remain explicit in cosmology-facing use.

## Anticipated Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Recover synchrotron self-absorption from the same event family as emissivity, including the optically thick source function and its separation from plasma-dispersion suppression.
- Derive the synchrotron wake-strain threshold and $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ from Noether braid velocity deformation, $G_{\text{grad}}$, transmitter-side acceleration weights, signed root playback, and $\mathcal{V}_{\mathrm{NS}}$.
- Map pair-loading predictions to assembly-density and outflow-structure variables without changing QED/QED-like reaction channels.
- Quantify joint regimes where synchrotron cascades and bremsstrahlung together set the photon bath relevant to nucleation-era mapping.
- Bound acceptable parameter freedom in provisional mapping variables so parsimony does not degrade relative to standard transport models.

## Explanatory Gain (Provisional)

This mapping aims at mechanistic compression across channels:

- One substrate language for synchrotron, pair production, and bremsstrahlung as wake/assembly transport outcomes.
- A single timing-conversion layer for rate equations (`observer` vs `assembly` clocks) used consistently in simulation bookkeeping.
- A testable mapping hypothesis that pair-loading boundaries depend on local Noether sea state variables ($\rho_{\text{NS}}$, $n$, anisotropy) in addition to standard observer-level compactness controls.

If future derivations show no measurable deviations in tested regimes, the remaining claim is ontological unification rather than new phenomenology.

## Why Reinterpret (Theory Payoff)

The reinterpretation is justified only if it improves theory structure, not vocabulary. In this chapter the intended payoff is:

- A single substrate mechanism class for radiation channels usually treated separately (synchrotron, pair loading, bremsstrahlung).
- A common conservation/provenance bookkeeping layer for mapping reaction networks into absolute-time assembly simulations.
- A constrained bridge from standard observables to substrate variables, so mapping claims can fail under consistency checks rather than being post-hoc fits.

Cosmology-facing provenance across synchrotron, pair production, bremsstrahlung, BBN photon loading, and CMB thermalization is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

If derivations show (i) no measurable deviations in any tested regime, (ii) no reduction in parameter count relative to standard plasma/QED models, and (iii) no new consistency constraints that eliminate existing fine-tuning, then the $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation provides only ontological vocabulary change without explanatory gain. In that case, standard transport remains the preferred description for cascade phenomenology, and the $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping is demoted to an optional interpretive layer rather than a foundational claim.

[^architrino-count]: Architrino-count conservation: each recruited Noether sea braid contributes $(N_{\mathrm{arch}})_{\mathrm{braid}}$ architrinos; named braid content must exactly balance final $e^+ + e^-$ architrino count, and the event record must route the participating identities rather than assigning them to the photon channel. Explicit provenance tracking through pair events is a simulation deliverable, not an assertion in this chapter.
