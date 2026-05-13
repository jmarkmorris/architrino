# Synchrotron Cascades

Synchrotron cascades are coupled electromagnetic processes in which relativistic charged particles radiate synchrotron photons in magnetic fields, and those photons then trigger secondary channels such as pair production and further radiation. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

## Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics.

Terminology in this chapter follows [mode-taxonomy.md](../interactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

## Notation Snapshot

- $\gamma$: electron/positron Lorentz factor.
- $B$: local magnetic-field amplitude.
- $U_B = B^2/(8\pi)$: magnetic energy density.
- $\nu_c$: characteristic synchrotron frequency.
- $P_{\mathrm{syn}}$: synchrotron power per particle.
- $\tau_{\mathrm{syn}}$: synchrotron cooling timescale.
- $\tau_{\mathrm{esc}}$: escape/advection timescale.
- $\tau_{\gamma\gamma}$: pair-production optical-depth proxy.
- $\mathcal{V}_{\mathrm{NS}}$: provisional anisotropic Noether-Sea state mapped to observer-level magnetic structure.
- $G_{\text{grad}}$: local Noether-Sea gradient forcing data inherited from the shared radiation closure program.
- $\mathcal{R}_{\Theta}^{\mathrm{syn}}$: synchrotron closure residual produced by curved charged-assembly transport.
- $\mathcal{S}_{\gamma}^{\mathrm{syn}}$: synchrotron photon-channel drive for planar-mode nucleation.

## Physical Mechanism

A relativistic electron or positron with Lorentz factor $\gamma$ moving in magnetic field $B$ emits synchrotron radiation with characteristic frequency scaling as $\nu_c \propto \gamma^2 B$. If emitted photons are energetic enough and target photons or fields are dense enough, pair production channels open; the new pairs then radiate again, building a multi-generation cascade.

Cascade development is controlled by competition among radiative cooling, pair creation, advection, and escape. In compact high-field zones, this feedback can strongly increase pair loading and opacity.

This is the observer-level mechanism. The $\mathbb{A}\mathbb{A}\mathbb{A}$ layer below does not replace these formulas; it asks which Noether-core velocity deformation, anisotropic Noether-Sea state, and closure residual must be present for the same photon output to occur.

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

For pitch angle $\alpha$, a standard critical-frequency expression is

$$
\nu_c = \frac{3}{2}\gamma^2\frac{eB}{2\pi m_e c}\sin\alpha.
$$

For isotropic pitch-angle distributions, $\langle\sin\alpha\rangle = \pi/4$, so ensemble-averaged characteristic frequency becomes $\nu_c \approx (3e/4\pi m_e c)\gamma^2 B$.

An operational energy-loss (cooling) timescale relation is

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}.
$$

Here $\tau_{\mathrm{syn}}$ denotes a characteristic energy-loss timescale ($E/|dE/dt|$), distinct from the instantaneous synchrotron power rate $P_{\mathrm{syn}}$.

Cascade closure then depends on whether photon energies and path lengths satisfy pair-production thresholds and interaction depths in the local radiation field.

These equations and thresholds are the observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping must recover in validated limits.

### Spectral Shape and Cooling Breaks

For power-law injection $N(\gamma) \propto \gamma^{-p}$, the synchrotron emissivity in the slow-cooling regime ($\tau_{\mathrm{syn}} > \tau_{\mathrm{esc}}$) follows

$$
j_\nu \propto \nu^{-(p-1)/2}, \quad \nu < \nu_{\mathrm{max}},
$$

where $\nu_{\mathrm{max}} \propto \gamma_{\mathrm{max}}^2 B$ is the maximum synchrotron frequency set by the highest injected Lorentz factor.

In the fast-cooling regime ($\tau_{\mathrm{syn}} < \tau_{\mathrm{esc}}$), electrons cool to a break Lorentz factor

$$
\gamma_{\mathrm{cool}} \approx \frac{6\pi m_e c}{\sigma_T B^2 t_{\mathrm{esc}}},
$$

and the spectrum develops a characteristic break at $\nu_c(\gamma_{\mathrm{cool}})$ with slopes

$$
j_\nu \propto \begin{cases}
\nu^{-1/2}, & \nu < \nu_c(\gamma_{\mathrm{cool}}) \quad \text{(slow-cooling tail)} \\
\nu^{-p/2}, & \nu > \nu_c(\gamma_{\mathrm{cool}}) \quad \text{(fast-cooling regime)}.
\end{cases}
$$

These break structures are testable against broadband SEDs in AGN jets, GRBs, and pulsar wind nebulae.

## Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^\pm + B \rightarrow e^\pm + \gamma_{\mathrm{syn}}$ (effective synchrotron emission channel).
- $\gamma + \gamma \rightarrow e^+ + e^-$ (Breit-Wheeler two-photon interaction / photon-photon annihilation channel in dense radiation fields, distinct from Schwinger vacuum pair production).
- Secondary-loop channel: newly produced $e^\pm$ re-enter synchrotron emission, closing the cascade.

Secondary channels below the 1% contribution level are treated as corrections unless a specific regime elevates them.
This 1% threshold is a modeling convention for cascade tractability, not a fundamental physics cutoff. Subdominant channels (for example, triplet pair production $e^\pm + \gamma \rightarrow e^\pm + e^+ + e^-$, relevant in strong magnetic fields) may be included in detailed transport codes but are omitted here for pedagogical focus.

## Radiation Inheritance

Synchrotron emission is the curved charged-assembly transport specialization of the shared radiation program in [Radiation](radiation.md). The standard phrase "a magnetic field bends a relativistic charge and the charge radiates" remains the observer-level baseline. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ map, the channel-specific claim is narrower: anisotropic Noether-Sea transport and gradient forcing deform the moving Noether core faster than its internal closure ledgers can retune, leaving a residual that may enter the planar-mode basin.

The inherited skeleton is

$$
\text{Noether-core velocity deformation in anisotropic Noether-Sea transport}
\longrightarrow
\text{synchrotron closure residual}
\longrightarrow
\text{wake-strain threshold}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual core energy, or pair-channel handoff}.
$$

The radiation page writes the retuned transport state as $\mathbf{V}$. In this channel, $\mathbf{V}$ is the Noether-core velocity-deformation state of the charged assembly during curved transport through $\mathcal{V}_{\mathrm{NS}}$. A channel-local closure mismatch can therefore be written as the derivation target

$$
\delta\Theta_a^{\mathrm{syn}}
=
\Theta_a(T;\mathbf{V}_{\text{curved}},G_{\text{grad}},\mathcal{V}_{\mathrm{NS}})
-
\Theta_a(T;\mathbf{V}_{\text{adiabatic}},G_{\text{grad}},\mathcal{V}_{\mathrm{NS}}),
\qquad
a\in\{I,M,O\}.
$$

The corresponding residual norm specializes the shared radiation residual:

$$
\mathcal{R}_{\Theta}^{\mathrm{syn}}
=
\left(\sum_{a\in\{I,M,O\}}w_a\left(\delta\Theta_a^{\mathrm{syn}}\right)^2\right)^{1/2}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma_{e^\pm}(t),
\mathcal{C}_{o'j}(t),
J_{o'j},
\rho_{\text{core}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t);
\mathcal{V}_{\mathrm{NS}},
G_{\text{grad}},
\mathbf{V}_{\text{curved}}
\right).
$$

Here $\Gamma_{e^\pm}(t)$ is the charged assembly microstate; $\mathcal{C}_{o'j}(t)$ and $J_{o'j}$ are the active causal-root and Jacobian data; $\mathcal{V}_{\mathrm{NS}}$ is the anisotropic Noether-Sea state provisionally mapped to the observer-level $B$ field; and $G_{\text{grad}}$ records the gradient forcing that skews delay loops. This equation is not a derivation of synchrotron radiation. It names the residual functional that must later recover the validated frequency, power, cooling-break, and polarization limits.

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
E_{\text{exc}}^{\mathrm{syn}}\ge E_{\gamma,\min}.
$$

The wake-strain threshold is therefore the channel's local expression of the planar-mode basin boundary. If the residual is sub-threshold, the event must route energy into medium excitation, recoil, or residual core energy rather than silently declaring a missing photon. If the threshold is crossed, the emitted photon must still satisfy the standard synchrotron scaling target

$$
\nu_{\gamma}^{\mathrm{out}}
\longrightarrow
\nu_c
=
\frac{3}{2}\gamma^2\frac{eB_{\mathrm{eff}}}{2\pi m_e c}\sin\alpha
$$

in weak homogeneous limits, with $B_{\mathrm{eff}}$ the observer-level magnetic amplitude reconstructed from $\mathcal{V}_{\mathrm{NS}}$. The $\gamma^2B$ scaling must come from the coupled velocity-deformation and anisotropic-state map, not from tuning $\mathcal{S}_{\gamma,*}$ after the fact.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Synchrotron emission channel:** curved charged-assembly transport through an anisotropic Noether-Sea state produces $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ by Noether-core velocity deformation and gradient forcing. If the inherited planar-mode threshold is crossed, the event nucleates [photon assemblies](../assemblies/bosons/electroweak-bosons.md) from interaction energy / wake stress while conserving charged-assembly identity. The photon-side target is the canonical **coaxial contra-rotating pro/anti planar pair** description.
- **Pair channel:** two-photon overlap, with each photon treated as a coaxial contra-rotating pro/anti planar pair, associates local substrate content into a charged $e^+e^-$ assembly pair; this association must strictly conserve net architrino count and charge of participating assemblies (photons + neutral Noether-Sea cores $\rightarrow e^+ + e^-$), with provenance and conservation bookkeeping explicit.
- **Cascade loop:** repeated emission-pair-emission cycles are modeled as repeated mode-lock events under the same observer-level thresholds.

## Shared Photon Event Record

Use the same photon-channel event record here as in [Radiation](radiation.md), [Bremsstrahlung](bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md). A synchrotron planar-mode event should record:

- charged assembly identity, energy, momentum, pitch geometry, and path-history provenance before and after the curved transport segment;
- Noether-core velocity-deformation state, effective magnetic-state map $\mathcal{V}_{\mathrm{NS}}$, gradient forcing $G_{\text{grad}}$, and local Noether-Sea variables $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, excitation state, and causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{syn}}$, wake-strain eigenvalue or threshold status, and photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{syn}}$ that permits or forbids planar-mode nucleation;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- recoil, medium excitation, residual core energy, and pair-channel handoff terms when the emitted photon enters a cascade loop.

This record is a derivation target. It must recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, standard polarization limits, and Breit-Wheeler behavior in validated regimes before any Noether-Sea-dependent deviation is treated as physical. The polarization basis, transverse angular-momentum ledger, and linear-polarization limits are photon Gate B consumers from [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../theory-bridges/angular-momentum-and-spin.md), not a local derivation of photon helicity.

## Observer-Level Closure Checks

- Pair threshold closure: enforce $s = (k_1+k_2)^2 \ge 4m_e^2c^4$ for $\gamma\gamma \rightarrow e^+e^-$, where $k^\mu_i$ are photon 4-momenta. In the head-on collision frame this reduces to $E_1 E_2 \ge (m_e c^2)^2$; for general angle $\theta_{12}$ between photon directions, $E_1 E_2 (1-\cos\theta_{12}) \ge 2(m_e c^2)^2$. Breit-Wheeler cross-section peak occurs at $s \sim 10 m_e^2 c^4$ and must be reproduced in validated cascade limits.
- Frequency closure: recover $\nu_c = (3/2)\gamma^2(eB/2\pi m_e c)\sin\alpha$ and the ensemble scaling $\nu_c\propto\gamma^2B$ in uniform-field, weak homogeneous limits.
- Rate closure: recover standard synchrotron and Breit-Wheeler limits in validated regimes.
- Timing closure: in weak-gravity astrophysical limits, $\Gamma_{\mathrm{eff}} \rightarrow \gamma_{\mathrm{SR}}$ so cooling breaks are preserved. This is an effective closure target for the clock law, not an assumption that substrate time is observer proper time.
- Polarization closure: recover observer-level synchrotron polarization geometry from directional $B$ mapping; in uniform-field limits, failure to recover linear polarization fractions $\Pi \approx 70\%-75\%$ falsifies the geometric mapping (Rybicki and Lightman 1979, Sec. 6.3; observational confirmation in radio pulsars and synchrotron nebulae typically shows $\Pi_{\mathrm{obs}} \sim 0.3$-0.7 after depolarization from field disorder and Faraday rotation).

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

## Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

Standard high-energy source models treat synchrotron cascades as local plasma-radiation processes governed by magnetic structure, injection spectra, and transport. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same radiative microphysics is retained while interpretation shifts to mapping cascade outputs onto assembly transport and SMBH-local recycling histories.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Mapping (Provisional)

Status convention used below:

- **Baseline:** established relation retained unchanged.
- **Provisional map:** ontology-level working hypothesis pending deeper derivation.
- **Requirement:** compatibility condition for known observables.

### Provisional Architrino-Level Mapping

This file uses the following provisional mapping targets.

- **Synchrotron emission (provisional):** a charged tri-binary assembly in curved transport through $\mathcal{V}_{\mathrm{NS}}$ develops a Noether-core velocity deformation. Gradient forcing $G_{\text{grad}}$ and causal-branch Jacobian bunching can leave $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ after ordinary adiabatic retuning fails; when the associated wake-strain state crosses the inherited planar-mode threshold, a photon assembly nucleates and carries away energy-momentum. This nucleation threshold must be derivable from wake-strain eigenvalue conditions in simulations; hand-tuning the threshold to match observed $P_{\mathrm{syn}}(\gamma,B)$ or $\nu_c\propto\gamma^2B$ constitutes a fit, not a derivation. The mapping succeeds only if the threshold emerges naturally from the architrino master equation applied to curved charged-assembly trajectories in anisotropic Noether-Sea states.
- **Magnetic field ontology (provisional Option B):** observer-level $B$ is currently treated as the effective coarse-grained directional (vector/tensor) vorticity-anisotropy state of the Noether Sea, $B \leftrightarrow \mathcal{V}_{\mathrm{NS}}$, rather than as a separate fundamental void field (Option A). This is a mapping option, not settled ontology. Charged-assembly curvature is therefore interpreted provisionally as transport through an anisotropic Noether-Sea state with explicit directionality. In validated limits, this mapping must: (i) derive the effective Lorentz-force law $\mathbf{F}_{\mathrm{eff}} = q(\mathbf{v}/c) \times \mathbf{B}_{\mathrm{eff}}$ from anisotropic Noether-Sea transport together with the Jacobian-weighted geometry of delayed causal flux, rather than by postulating a primitive cross-product force term; (specifically, show that vorticity-tensor gradients $\partial_i \mathcal{V}^j_{\mathrm{NS}}$ produce perpendicular deflection under boost); (ii) reproduce Maxwell-level electromagnetic-wave propagation (dispersion relation $\omega = ck$ for photon modes in uniform $\mathcal{V}_{\mathrm{NS}}$); (iii) recover synchrotron polarization geometry ($\mathbf{E}_\gamma \perp \mathbf{B}_{\mathrm{eff}}$, $\mathbf{E}_\gamma \perp \mathbf{v}$ in observer frame) from directional emission rules in the Noether-Sea anisotropy basis, while inheriting photon helicity and analyzer statistics from Gate B rather than deriving them locally. **Falsification criterion:** if simulations with anisotropic Noether-Sea states fail to produce the factor-of-$\gamma^2$ frequency scaling in $\nu_c$ (tested via swept $B$-field and $\gamma$ at fixed pitch angle), or if polarization vectors misalign with standard geometry by $>15^\circ$ systematically, Option B is ruled out and the theory must revert to treating $\mathbf{B}$ as a separate substrate field (Option A) or propose a new mapping.
- **Pair production mapping (provisional):** $\gamma+\gamma\rightarrow e^+ + e^-$ is treated as nucleation of charged assemblies from local Noether-Sea energy-density concentration triggered by overlap of two coaxial contra-rotating pro/anti planar-pair photon assemblies above threshold, not ex nihilo creation. The nucleation threshold must map to the standard kinematic condition $s\ge 4m_e^2$, and the effective rate must asymptotically reproduce the Breit-Wheeler cross-section in the relativistic limit used by cascade modeling. Operational constraint: pair-channel cross-section $\sigma_{\gamma\gamma}(s)$ computed from this nucleation picture must reproduce
$$
\sigma_{\gamma\gamma} = \frac{\pi r_e^2}{2}\left(1-\beta^2\right)\left[\left(3-\beta^4\right)\ln\left(\frac{1+\beta}{1-\beta}\right) - 2\beta(2-\beta^2)\right]
$$
(where $\beta = \sqrt{1-4m_e^2c^4/s}$) to within factor-of-2 accuracy across the range $4m_e^2c^4 < s < 100m_e^2c^4$ used in cascade modeling. Deviations larger than this bound would constitute observable new physics and require dedicated experimental tests beyond astrophysical inference.

These mapping targets are ontology-level and must reduce to standard synchrotron/pair-production observables in validated limits.

### Curvature Convention

In this chapter, "curved transport" means Euclidean-space trajectory curvature of charged assemblies under effective magnetic forcing at substrate level. Observer-level curved-spacetime language is used only as an effective description of transport and timing, not as a replacement for the substrate trajectory picture.

Operationally: compute emissivity and spectra with standard observer-frame equations; interpret underlying trajectory control through the Noether-Sea anisotropy map when using $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The channel-local curvature object is therefore the Noether-core velocity deformation along the charged assembly's Euclidean trajectory, together with gradient forcing from $G_{\text{grad}}$ and anisotropy from $\mathcal{V}_{\mathrm{NS}}$. Effective geodesic language may still be used for observer-frame propagation and timing, but it is not the event-level cause of planar-mode nucleation in this chapter. Both descriptions must produce identical observer-frame synchrotron emissivity in weak-gravity zones; distinguishing experiments would require near-horizon synchrotron mapping or laboratory strong-field tests.

### Conservation Note for Pair Production

This chapter uses the nucleation interpretation (not creation from nothing): pair channels reorganize substrate content into new charged assemblies. In this ontology, each architrino has provenance and identity through path history in absolute time; interaction channels redistribute and relock existing constituents rather than instantiate new substrate entities.

Operationally, pair production is modeled as association of neutral local substrate content (Noether-Sea cores)[^architrino-count] into a charged $e^+e^-$ assembly pair when incident photon energy and geometry satisfy the pair threshold window. The incoming photon energy supplies the separation and association work required for charged-state lock-in.

The bookkeeping requirement is therefore threefold: global architrino conservation, path-history-consistent provenance through reaction channels, and local energy-momentum conservation at the interaction zone.

Any additional dependence of pair yield on local Noether-Sea state beyond standard kinematic threshold conditions is treated here as a mapping/simulation goal, not as an asserted observational deviation.

A minimal cascade-depth diagnostic can be expressed through competing timescale ratios. Define the dimensionless cascade parameter as

$$
\mathcal{C}_{\mathrm{cas}} \equiv \left(\frac{\tau_{\mathrm{esc}}}{\tau_{\mathrm{syn}}}\right) \left(\frac{L}{L_{\gamma\gamma}}\right),
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

For cosmology-facing use, source-frame emissivity must be propagated to observer-frame spectra with explicit redshift and transfer factors:

$$
j_{\nu}^{\mathrm{obs}}(z_{\mathrm{obs}}) = (1+z)^{-3} \, j_{\nu(1+z)}^{\mathrm{em}}(z_{\mathrm{em}})\,\mathcal{T}(\nu,z_{\mathrm{em}}\rightarrow z_{\mathrm{obs}}),
$$

Here $\mathcal{T}(\nu,z_{\mathrm{em}}\rightarrow z_{\mathrm{obs}})$ is the cumulative transfer function including absorption (for example, $e^{-\tau_{\gamma\gamma}(\nu,z)}$ for pair production on extragalactic background light) and any intervening scattering. For nearby sources ($z \ll 1$), $\mathcal{T} \approx 1$.

with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must reduce to conventional transport results used in high-energy astrophysics.

### Absolute-Time vs Proper-Time Bookkeeping (Provisional)

In this file, $\tau_{\mathrm{syn}}$ is the observer-frame cooling timescale:

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}} \approx \frac{6\pi m_e c}{\sigma_T B^2\gamma}.
$$

For ontology-level bookkeeping, use the conversion

$$
dt = \Gamma_{\mathrm{eff}}(v,\rho_{\text{core}},n,\Phi)\,d\tau_{\mathrm{asm}},
$$

where $t$ is substrate absolute time and $\tau_{\mathrm{asm}}$ is assembly proper time. Then

$$
\left(\frac{dE}{dt}\right)_{\mathrm{abs}}=\frac{1}{\Gamma_{\mathrm{eff}}}\left(\frac{dE}{d\tau_{\mathrm{asm}}}\right),
\qquad
\tau_{\mathrm{syn}}^{\mathrm{abs}}=\Gamma_{\mathrm{eff}}\,\tau_{\mathrm{syn}}^{\mathrm{asm}}.
$$

Toy mapping example (local weak-gravity zone): if $\gamma=10^4$, $B=1\,\mathrm{G}$, and $\Gamma_{\mathrm{eff}}\approx\gamma$, then

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}}\approx 7.7\times 10^4\,\mathrm{s},
\qquad
\tau_{\mathrm{syn}}^{\mathrm{asm}}\approx \frac{\tau_{\mathrm{syn}}^{\mathrm{obs}}}{\Gamma_{\mathrm{eff}}}\approx 7.7\,\mathrm{s}.
$$

Here $\Gamma_{\mathrm{eff}}\approx\gamma$ is a placeholder SR-limit surrogate for dimensional illustration only, not a derived $\mathbb{A}\mathbb{A}\mathbb{A}$ relation. In all validated astrophysical regimes (AGN jets, pulsar wind nebulae, GRB afterglows), $\Gamma_{\mathrm{eff}}$ must reproduce the standard Lorentz factor $\gamma_{\mathrm{SR}}$ to within observational uncertainties on cooling breaks ($\lesssim 10\%$ for well-sampled SEDs). Any deviation is confined to untested extreme environments (for example, within $r \lesssim 3r_g$ of supermassive black holes, or $\rho_{\text{core}} \gg \rho_{\mathrm{nuclear}}$) and requires explicit simulation bounds showing no conflict with validated-regime data.

Propagation and timing conventions must remain explicit in cosmology-facing use.

## Anticipated Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Derive the synchrotron wake-strain threshold and $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ from Noether-core velocity deformation, $G_{\text{grad}}$, causal-branch Jacobians, and $\mathcal{V}_{\mathrm{NS}}$.
- Map pair-loading predictions to assembly-density and outflow-structure variables without changing QED/QED-like reaction channels.
- Quantify joint regimes where synchrotron cascades and bremsstrahlung together set the photon bath relevant to nucleation-era mapping.
- Bound acceptable parameter freedom in provisional mapping variables so parsimony does not degrade relative to standard transport models.

## Explanatory Gain (Provisional)

This mapping aims at mechanistic compression across channels:

- One substrate language for synchrotron, pair production, and bremsstrahlung as wake/assembly transport outcomes.
- A single timing-conversion layer for rate equations (`observer` vs `assembly` clocks) used consistently in simulation bookkeeping.
- A testable mapping hypothesis that pair-loading boundaries depend on local Noether-Sea state variables ($\rho_{\text{core}}$, $n$, anisotropy) in addition to standard observer-level compactness controls.

If future derivations show no measurable deviations in tested regimes, the remaining claim is ontological unification rather than new phenomenology.

## Why Reinterpret (Theory Payoff)

The reinterpretation is justified only if it improves theory structure, not vocabulary. In this chapter the intended payoff is:

- A single substrate mechanism class for radiation channels usually treated separately (synchrotron, pair loading, bremsstrahlung).
- A common conservation/provenance bookkeeping layer for mapping reaction networks into absolute-time assembly simulations.
- A constrained bridge from standard observables to substrate variables, so mapping claims can fail under consistency checks rather than being post-hoc fits.

Cosmology-facing provenance across synchrotron, pair production, bremsstrahlung, BBN photon loading, and CMB thermalization is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

If derivations show (i) no measurable deviations in any tested regime, (ii) no reduction in parameter count relative to standard plasma/QED models, and (iii) no new consistency constraints that eliminate existing fine-tuning, then the $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation provides only ontological vocabulary change without explanatory gain. In that case, standard transport remains the preferred description for cascade phenomenology, and the $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping is demoted to an optional interpretive layer rather than a foundational claim.

[^architrino-count]: Architrino-count conservation: each recruited Noether-Sea core contributes $(N_{\mathrm{arch}})_{\mathrm{core}}$ architrinos; net photon + core content must exactly balance final $e^+ + e^-$ architrino count. Explicit provenance tracking through pair events is a simulation deliverable, not an assertion in this chapter.
