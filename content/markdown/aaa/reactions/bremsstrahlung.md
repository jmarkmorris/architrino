# Bremsstrahlung

Bremsstrahlung ("braking radiation") is electromagnetic emission generated when a charged particle is accelerated by another charge, typically an electron deflected by an ion or nucleus. Because the acceleration history spans many scattering angles and impact parameters, bremsstrahlung produces a broad continuum rather than a line spectrum. In practice it is a core process in nuclear and particle experiments, hot-plasma diagnostics, and high-energy astrophysical source modeling.

## Teaching Path

This chapter is organized in three layers:

1. **Standard baseline:** what is already established (mechanism, emissivity, scaling laws).
2. **Radiation inheritance:** how the channel specializes the shared closure-residual routing in [Radiation](radiation.md).
3. **$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping layer:** how the same observables are re-expressed in assembly-language terms.

Read left-to-right as: baseline physics $\rightarrow$ shared radiation routing $\rightarrow$ channel-specific ontology mapping.

Terminology in this chapter follows [mode-taxonomy.md](../interactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

## Notation Snapshot

- $\Delta E_e$: projectile electron energy loss per event.
- $E_\gamma$: emitted photon energy.
- $\Delta E_{\mathrm{recoil}}$: target recoil energy channel.
- $\Delta E_{\mathrm{med}}$: medium-excitation energy channel.
- $E_{\text{exc}}^{\mathrm{br}}$: bremsstrahlung excitation energy inherited from the radiation closure-residual ledger.
- $\mathcal{R}_{\Theta}^{\mathrm{br}}$: bremsstrahlung closure-mismatch residual.
- $\mathcal{S}_{\mathrm{wake}}$: effective wake intensity variable.
- $\mathcal{S}_{\gamma}^{\mathrm{br}}$: bremsstrahlung photon-channel drive inherited from the radiation planar-mode gate.
- $\mathcal{S}_*$: effective bremsstrahlung proxy for the inherited planar-mode threshold scale.
- $E_{\gamma,\min}$: hypothesized minimum stable planar-mode energy.
- $\Gamma_{\mathrm{eff}}$: absolute-time/proper-time conversion factor.
- $\rho_{\text{NS}}(\mathbf{x},t)$: local physical Noether swarm density.

## Physical Mechanism

In a Coulomb encounter, the projectile momentum changes by $\Delta \mathbf{p}$, and this acceleration drives radiation. For electron-ion bremsstrahlung, emitted power increases with target charge and projectile energy, while spectral shape is set by scattering kinematics, screening, and medium optical depth.

At low photon energies, multiple small-angle encounters contribute strongly and infrared-safe observables require inclusive treatment. At high energies, relativistic corrections, recoil, and quantum suppression effects become important.

## Prerequisites (Minimal)

- Photon assembly ontology (planar-mode nested shell swarm language at micro level).
- Shared radiation routing in [Radiation](radiation.md).
- Master Equation state-transition framework (emissive vs non-emissive microstates).
- Emergent metric/geodesic transport framework (observer-level propagation and lensing).
- Absolute-time to proper-time conversion rules used for rate equations.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Micro-Physical Derivation (Interpretive Map)

Status convention used below:

- **Baseline:** established standard-physics relation retained unchanged.
- **Provisional map:** working $\mathbb{A}\mathbb{A}\mathbb{A}$ parameterization pending derivation.

### Radiation Inheritance

Bremsstrahlung is the charged-assembly deceleration specialization of the shared radiation program in [Radiation](radiation.md). The standard phrase "acceleration drives radiation" remains the observer-level baseline. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ map, the channel-specific claim is narrower: the target encounter changes the electron assembly's transport state quickly enough to create a closure mismatch, and only the portion of that mismatch routed through the photon basin becomes planar-mode output.

The inherited skeleton is

$$
\text{charged-assembly deceleration near a target}
\longrightarrow
\text{closure mismatch}
\longrightarrow
\text{bremsstrahlung excitation basin}
\longrightarrow
\text{planar-mode photon, recoil, medium excitation, or residual internal energy}.
$$

For this channel, the radiation residual can be specialized as the derivation target

$$
\mathcal{R}_{\Theta}^{\mathrm{br}}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma_e(t),
\mathcal{C}_{o'j}(t),
J_{o'j},
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t);
Z,b,\left\|\frac{d\mathbf{v}_e}{dt}\right\|
\right).
$$

Here $\Gamma_e(t)$ is the electron-assembly microstate, $\mathcal{C}_{o'j}(t)$ and $J_{o'j}$ are the active causal-root and Jacobian data during the target encounter, $Z$ and $b$ summarize the observer-level target charge and impact-parameter geometry, and $\left\| d\mathbf{v}_e/dt\right\|$ is the deceleration magnitude. This equation does not derive the QED bremsstrahlung cross-section. It names the closure functional that must later recover the validated cross-section and emissivity limits.

The corresponding excitation energy is inherited from the radiation basin definition:

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_C(\Gamma_{e,\text{post shock}})
-
E_C(\Gamma_{e,\text{nearest stable rung}}).
$$

The planar-mode gate is likewise inherited:

$$
\mathcal{S}_{\gamma}^{\mathrm{br}}
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}^{\mathrm{br}}\ge E_{\gamma,\min}.
$$

Only when both conditions are met is photon output allowed. If the closure residual remains below the planar-mode basin, or if $E_{\text{exc}}^{\mathrm{br}}$ is sub-threshold, the event must route energy into medium excitation, recoil, or residual internal energy instead of treating the missing photon as a silent loss.

### Wake Shock Definition (Channel Specialization)

In this document, a **wake shock** is the bremsstrahlung name for the inherited radiation closure residual when it is produced by strong target-induced deceleration of the electron Noether swarm assembly. It is not merely a descriptive label for radiation. Operationally, it is the threshold crossing where the electron assembly's internal curvature mode is driven across the field-speed symmetry point in the middle binary (near $v \approx c_f$), creating a transient high-curvature state that can shed energy into the surrounding Noether sea.

A minimal trigger condition is written as

$$
\mathcal{I}_e\!\left(\rho_{\text{NS}}(\mathbf{x},t),\left\|\frac{d\mathbf{v}_e}{dt}\right\|,\Xi_e\right) \ge \mathcal{I}_{\mathrm{crit}},
$$

where $\Xi_e$ denotes electron-assembly internal state variables. In Master Equation language, wake shock onset corresponds to entry into the emission-capable region of state space, with transition kernel weight from non-emissive to emissive microstates increased above baseline.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the projectile electron assembly enters the dense wake potential of a target with charge decorations $Z$. Path curvature and deceleration generate a wake shock in the electron assembly by increasing $\mathcal{R}_{\Theta}^{\mathrm{br}}$. In the corrected master-law picture, the received interaction is shaped not only by inverse-square proximity but also by Jacobian-weighted bunching of delayed causal flux along the active branches during the deflection. When the local shock intensity exceeds the inherited planar-mode stability threshold, shed energy nucleates a photon mode modeled as a coaxial contra-rotating pro/anti planar pair in the Noether sea. This reframes "acceleration drives radiation" as an assembly transition channel rather than a purely classical wave statement.

A minimal radiation-inherited event ledger starts with the projectile source depletion. For $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$,

$$
\Delta\mathcal Q_{e}^{0}
=
\mathcal Q_{e}^{-}
-
\mathcal Q_{e}^{+}
=
\mathcal Q_{\gamma}^{\mathrm{sub}}
+
\mathcal Q_{Z,\mathrm{recoil}}^{0}
+
\mathcal Q_{\mathrm{med}}^{0}
+
\mathcal Q_{\mathrm{wake}}^{0}
+
\mathcal Q_{\mathrm{handoff}}^{0}
+
\mathcal Q_{\mathrm{rem}}^{0}.
$$

The energy component reduces to

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_{\gamma}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\text{rem}},
$$

where $E_{\gamma}$ is emitted photon energy, $\Delta E_{\mathrm{recoil}}$ is target recoil energy, $\Delta E_{\mathrm{med}}$ is genuine medium excitation (for example plasmons/phonons in dense environments), and $\Delta E_{\text{rem}}$ is residual internal excitation left in the source assembly. The projectile energy loss $\Delta E_e$ supplies this ledger at event level, with the common approximation $\Delta E_e\approx E_{\text{exc}}^{\mathrm{br}}$ used only when untracked stopping, recoil preparation, and remnant channels are negligible. In the lone heavy-target limit, $\Delta E_{\mathrm{recoil}} \approx 0$ energetically but still carries momentum closure. Mapping work focuses on identifying when wake-shock energy crosses the photon-composite stability threshold so discrete photon output is recovered from continuous transport.

Interpretive takeaway: this section defines event-level state transition and bookkeeping, not a replacement of validated QED cross-sections.

### Provisional Effective Parameterization (Pending Derivation)

To make the wake language calculable, the current $\mathbb{A}\mathbb{A}\mathbb{A}$ program uses a provisional mapping ansatz. The variable $\mathcal{S}_{\mathrm{wake}}$ is an effective proxy for the inherited photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{br}}$, not a separate radiation ontology. This is a working effective form pending derivation from the Master Equation, not a claimed first-principles closure:

$$
\mathcal{S}_{\mathrm{wake}} \equiv A_{\mathrm{tb}} \, \bigl[\rho_{\text{NS}}(\mathbf{x},t)\bigr]^{\alpha} \left\|\frac{d\mathbf{v}_e}{dt}\right\|^{\beta},
$$

Conceptual nucleation picture for this ansatz: a photon mode modeled as a coaxial contra-rotating pro/anti planar pair is treated as a stable attractor that appears only when wake-driven internal concentration exceeds a local stability barrier. The threshold scale $\mathcal{S}_*$ represents the effective bremsstrahlung proxy for $\mathcal{S}_{\gamma,*}$ and is interpreted as an effective function of Noether sea stiffness plus local nested shell swarm geometry. The coupling through $E_{\text{exc}}^{\mathrm{br}}/E_{\gamma,\min}$ represents available shed energy relative to minimum stable planar-mode cost. The exponential response is used as a first-pass survival-style ansatz for threshold crossing with sensitivity to local fluctuations; it is not yet claimed as unique.

$$
P_{\mathrm{nuc}}(E_\gamma) = 1 - \exp\!\left[-\left(\frac{\mathcal{S}_{\mathrm{wake}}-\mathcal{S}_*}{\mathcal{S}_*}\right)_+ \left(\frac{E_{\text{exc}}^{\mathrm{br}}}{E_{\gamma,\min}}\right)\right],
$$

with $(x)_+ \equiv \max(x,0)$. Here $A_{\mathrm{tb}},\alpha,\beta,\mathcal{S}_*$ are effective Noether sea response parameters. This is explicitly a mapping goal, not yet a closed derivation.

Interpretation of coefficients in the current draft:

- $A_{\mathrm{tb}}$: normalization for assembly-to-medium coupling strength.
- $\alpha$: sensitivity exponent to local Noether sea density.
- $\beta$: sensitivity exponent to deceleration magnitude.
- $\mathcal{S}_*$: effective bremsstrahlung proxy for the inherited planar-mode onset scale $\mathcal{S}_{\gamma,*}$.

Status and handling:

- Parameters are currently phenomenological placeholders with bounded priors, to be reduced or eliminated by Master Equation derivation.
- If fit is required before derivation, parameter count and uncertainty ranges are tracked explicitly as theory-cost items, rather than treated as hidden freedom.
- Parsimony assessment is therefore provisional until derivation quality is established in the foundations track.

For gravity integration, the same source terms can be expressed through the emergent metric fields that govern local geodesics:

$$
\mathcal{S}_{\mathrm{wake}} = \mathcal{S}_{\mathrm{wake}}\!\left(g_{\mu\nu},\nabla g_{\mu\nu},u_e^\mu,\rho_{\text{NS}}(\mathbf{x},t)\right).
$$

### Emergence of Radiation from Assembly Dynamics

This section states the mechanism-level emergence claim explicitly:

1. **Mechanism:** deceleration-driven internal reconfiguration in the electron assembly produces a closure mismatch $\mathcal{R}_{\Theta}^{\mathrm{br}}$ and excitation energy $E_{\text{exc}}^{\mathrm{br}}$; if the inherited planar-mode threshold is crossed, a planar mode is nucleated and propagates as a photon assembly.
2. **Microstate mapping:** non-emissive states satisfy $\mathcal{I}_e < \mathcal{I}_{\mathrm{crit}}$; emissive states satisfy $\mathcal{I}_e \ge \mathcal{I}_{\mathrm{crit}}$ and admit planar-mode nucleation probability $P_{\mathrm{nuc}}>0$.
3. **Classical-limit recovery:** for many emissions over smooth trajectories, coarse-grained power recovers the standard acceleration-radiation scaling (Larmor/Lienard class) in weak-coupling validated regimes.
4. **Declared breakdown regime:** near unresolved ultra-strong-field or ultra-high-energy domains, this effective mapping is not assumed complete and requires direct Master Equation treatment.

## Core Equations (Observer-Level Baselines)

A compact emissivity form for thermal free-free emission is

$$
\epsilon_{\nu}^{\mathrm{ff}} \propto Z^2 n_e n_i T^{-1/2} e^{-h\nu/(k_B T)} g_{\mathrm{ff}}(\nu,T),
$$

where $Z$ is ion charge, $n_e$ and $n_i$ are number densities, and $g_{\mathrm{ff}}$ is the Gaunt factor (quantum correction). In dense plasma or condensed regimes, screening-length limits (Debye/collective shielding) modify both the effective interaction range and the integration limits folded into $g_{\mathrm{ff}}$. Frequency-integrated thermal emissivity scales approximately as

$$
\epsilon_{\mathrm{ff}} \propto Z^2 n_e n_i T^{1/2}.
$$

For high-energy scattering language, the differential yield is tracked with $d\sigma/dk$ (photon energy $k$), including screening and Coulomb corrections in the target.

Baseline takeaway: these equations are the standard observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping is built to recover in its low-energy continuum limit. The wake-shock model does not replace the validated formulas; it supplies the proposed closure-residual provenance that must reduce to them before any Noether sea-dependent deviation is treated as physical.

### Shock-Cooling Ledger in Outflows

Jet and outflow shocks require an additional branch check before a continuum component is identified as bremsstrahlung or free-free emission. In dense radiative shocks, such as many young-stellar-object working surfaces, the total cooling function $\Lambda(T_s)$ is usually dominated by line cooling, recombination, molecular, or other channel rows over part of the temperature range. Bremsstrahlung is retained only for the part of the emissivity budget that the local plasma state actually assigns to free-free emission.

For a post-shock cell, use the observer-level cooling estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

and compare it to the flow time $t_{\mathrm{dyn}}\sim \ell_j/v_j$. The free-free branch is promoted when its fractional cooling contribution

$$
f_{\mathrm{ff}}
=
\frac{\Lambda_{\mathrm{ff}}(T_s,n_e,n_i,Z)}
{\Lambda(T_s)}
$$

is above the channel-inclusion threshold for the modeled zone. Otherwise the same shock residual should remain in the line, molecular, heat, recoil, or medium-excitation rows rather than being silently folded into bremsstrahlung. This is an observer-level plasma diagnostic. The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is to derive which event records feed $\Lambda_{\mathrm{ff}}$ and which feed the competing channels while preserving the shared energy ledger.

## Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^- + Z \rightarrow e^- + Z + \gamma$ (electron-ion/nuclear bremsstrahlung baseline channel).
- $e^+ + Z \rightarrow e^+ + Z + \gamma$ (positron analog in mixed plasmas/beams).
- Thermal free-free ensemble channel (many-event superposition governing continuum emissivity).

Associated pair/Compton channels are included when they exceed the same contribution threshold in the modeled zone.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Bremsstrahlung channel:** target-induced deceleration drives the inherited closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$; above the planar-mode threshold, photon mode nucleation carries emitted energy-momentum.
- **Positron analog:** same wake-threshold logic with sign-reversed charge trajectory in observer-level kinematics.
- **Thermal ensemble:** macroscopic free-free emissivity is the aggregate of many local planar-mode nucleation events under screened Coulomb transport.

## Shared Photon Event Record

Use the same photon-channel event record here as in [Synchrotron Cascades](synchrotron.md) and [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md). A bremsstrahlung planar-mode event should record:

- incoming and outgoing charged assembly identity, momentum, and path-history provenance;
- target assembly identity, recoil term, and coherent or resolved geometry regime;
- local Noether sea state variables $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, excitation state, and relevant causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$, excitation energy $E_{\text{exc}}^{\mathrm{br}}$, and wake-strain or shock-intensity status relative to the planar-mode threshold;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon Gate B event residual, including source depletion, recoil, causal-wake, accepted/rejected handoff, helicity, and balance rows;
- causal-wake ledger and identity-routing fields from the shared radiation schema, so photon output is not treated as a source of new substrate identities;
- residual medium excitation $\Delta E_{\mathrm{med}}$ and any non-radiative channel that receives sub-threshold energy.

This record is a derivation target. It should recover standard $d\sigma/dk$, screening, form-factor, and emissivity limits before any Noether sea-dependent deviation is treated as physical. The polarization basis and transverse angular-momentum ledger are photon Gate B handoffs from [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md); this chapter records emission provenance, not photon spin closure.

## IR Regularization as a Stability Floor

Standard soft-photon emission produces infrared-divergent exclusive rates, handled by inclusive observables and resummation. In $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation, an additional hypothesis is available: stable planar photon assemblies exist only above a minimum nucleation energy $E_{\gamma,\min}$.

This implies a channel bifurcation:

- **If $E_{\text{exc}}^{\mathrm{br}} > E_{\gamma,\min}$ with the planar-mode drive above threshold:** wake shock locks into a planar mode and emits a photon.
- **If $E_{\text{exc}}^{\mathrm{br}} < E_{\gamma,\min}$ or the planar-mode drive remains below threshold:** no stable planar mode forms, and energy dissipates as non-radiative heating/turbulence in the local Noether sea.

This gives a physical low-energy floor for discrete photon output while preserving the inclusive-observable interpretation.

Interpretation split used in this draft:

- **Epistemic reinterpretation (default-safe):** sub-threshold energy loss is attributed to local Noether sea heating rather than resolved soft-photon quanta, while inclusive observables remain QED-standard in tested regimes.
- **Ontic prediction (conditional):** if $E_{\gamma,\min}$ is above current soft-photon sensitivity, the model predicts a measurable low-frequency turnover at $\nu_{\min}=E_{\gamma,\min}/h$.

Current status: this chapter treats the claim as epistemic by default and promotes ontic turnover as a conditional extension.

Connection to the photon closure interface: $E_{\gamma,\min}$ should be read as a candidate expression of the planar-pair stability boundary, not as a free cutoff. The first derivation must decide whether that boundary vanishes, lies below current soft-photon sensitivity, or produces a measurable turnover while preserving inclusive QED observables.

## $Z^2$ Scaling and Finite-Geometry Resolution

The leading $Z^2$ behavior follows coherent target-charge action at large impact parameter and low momentum transfer. At sufficiently small impact parameter $b$ (high $q$), the projectile resolves finite target geometry and coherence drops.

- **Coherent regime ($b \gg R_{\mathrm{nuc}}$):** interaction with aggregate nuclear charge; power tracks $\propto Z^2$.
- **Incoherent-resolution regime ($b \lesssim R_{\mathrm{nuc}}$):** interaction resolves constituent proton assemblies; scaling moves toward $\propto Z$ with suppression encoded by nuclear form factor $F(q^2)$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping, finite geometry is explicitly the spatial distribution of proton nested shell swarms in the nucleus. Deviation from pure $Z^2$ is therefore the observable transition from coherent whole-assembly wake coupling to resolved sub-assembly coupling, with additional screening from the atomic electron envelope.

A gravity-coupled extension can be written as

$$
\frac{d\sigma}{dk} \propto Z_{\mathrm{eff}}^2 \, |F(q^2)|^2 \, \left[1+\delta_g(r,\Phi)\right],
$$

where $\delta_g$ parameterizes local metric/Noether sea corrections. For standard nuclei in laboratory regimes, $\delta_g$ is expected to be subdominant; the term is retained so compact-object surface applications can be treated in one formalism.

## Momentum-Flux Closure at Emission

$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping enforces local momentum-flux balance at the emission vertex:

$$
\Delta \mathbf{p}_e + \mathbf{p}_{\gamma} + \Delta \mathbf{p}_{\mathrm{recoil}} + \Delta \mathbf{p}_{\mathrm{med}} = 0.
$$

Photon emission angle is therefore constrained by incident electron momentum, target potential geometry, and local wake transfer into planar mode plus recoil channel. For isolated heavy targets, momentum closure is dominated by $\Delta \mathbf{p}_{\mathrm{recoil}}$ with negligible recoil energy; medium momentum terms are reserved for explicit collective-excitation environments. This is the micro-level closure condition behind macroscopic angular spectra.

The radiation-zone benchmark is stronger than total momentum balance. In the straight-line deceleration limit, with $\mathbf{v}\parallel\mathbf{a}$, $\beta=\|\mathbf{v}\|/c$, $\gamma=(1-\beta^2)^{-1/2}$, and $\theta$ the angle between the outgoing radiation direction and $\mathbf{v}$, the observer-level angular power target is

$$
\frac{dP_{\mathrm{br,std}}}{d\Omega}
=
\frac{q^2\|\mathbf{a}\|^2}{16\pi^2\epsilon_0c^3}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^5}.
$$

The corresponding total-power target is

$$
P_{\mathrm{br,std}}
=
\frac{q^2\gamma^6\|\mathbf{a}\|^2}{6\pi\epsilon_0c^3}.
$$

This supplies a channel-local radiation energy-momentum closure check:

$$
\Delta_{\mathrm{br,pow}}
=
\frac{\int_{t_i}^{t_f}P_{\mathrm{map}}(t)\,dt}
{\int_{t_i}^{t_f}P_{\mathrm{br,std}}(t)\,dt}
-1,
\qquad
\Delta_{\mathrm{br,ang}}(\theta)
=
\frac{(dP_{\mathrm{map}}/d\Omega)(\theta)}
{(dP_{\mathrm{br,std}}/d\Omega)(\theta)}
-1.
$$

In validated weak-field bremsstrahlung regimes, $\Delta_{\mathrm{br,pow}}\rightarrow0$ and $\Delta_{\mathrm{br,ang}}(\theta)\rightarrow0$ after screening, recoil, and form-factor corrections are applied through the same event record. The emitted photon ledger must also pass $\Delta_{\gamma,\mathrm{flux}}=0$ from [Radiation](radiation.md); otherwise a correct-looking photon spectrum has not closed the local energy-momentum route.

## Time Parameterization (Absolute vs Proper Time)

Rate equations in this file are observer-level unless noted. For substrate-level $\mathbb{A}\mathbb{A}\mathbb{A}$ transport, convert via

$$
\frac{dE_e}{d\tau_e} = \frac{dE_e}{dt}\,\frac{dt}{d\tau_e},
\qquad
\frac{dt}{d\tau_e} = \Gamma_{\mathrm{eff}}(v_e,\rho_{\text{NS}}(\mathbf{x},t),\Phi).
$$

For operational closure in this chapter, use the provisional split

$$
\Gamma_{\mathrm{eff}} \approx \gamma(v_e)\,\left[1+\delta_{\rho}(\rho_{\text{NS}}(\mathbf{x},t))+\delta_{\Phi}(\Phi)\right],
$$

with $\gamma(v_e)=1/\sqrt{1-v_e^2/c^2}$ and $|\delta_{\rho}|,|\delta_{\Phi}|\ll 1$ in laboratory and weak-field astrophysical regimes where standard relativistic timing is already validated. The full derivation and regime-dependent corrections are delegated to the metric/time foundations chapter; this file uses the above form as a controlled working map.

This keeps cooling in proper time and substrate evolution in absolute time explicitly connected.

## Cosmological Propagation and Redshift Map

For source emissivity at emission redshift $z_{\mathrm{em}}$, the observer-level mapping target is

$$
\epsilon_\nu^{\mathrm{obs}}(z_{\mathrm{obs}}) = (1+z)^{-4}\,\epsilon_{\nu(1+z)}^{\mathrm{ff}}(z_{\mathrm{em}})\,\mathcal{T}(\nu, z_{\mathrm{em}}\to z_{\mathrm{obs}}),
$$

with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$ and $\mathcal{T}$ the transfer factor (absorption/scattering in plasma and any Noether sea-specific opacity).

## Thermal Equilibrium Assumptions in Evolving Noether Sea States

The free-free forms above assume local thermodynamic equilibrium (LTE). In evolving Noether sea states, define

$$
\mathcal{R}_{\mathrm{LTE}} \equiv \frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}.
$$

- **$\mathcal{R}_{\mathrm{LTE}} \ll 1$:** assembly-medium coupling is fast, LTE emissivity is valid with instantaneous state variables.
- **$\mathcal{R}_{\mathrm{LTE}} \gtrsim 1$:** non-equilibrium corrections are required; emissivity must be computed from evolving distribution functions rather than a single local $T$.

This ratio provides a diagnostic for when LTE-based closure is expected to hold.

## Geodesics and Lensing Consistency

Bremsstrahlung photons, once emitted, are modeled as propagating on null geodesics of the emergent metric:

$$
ds^2 = 0,\qquad k^\mu \nabla_\mu k^\nu = 0.
$$

This keeps transport treatment aligned with the same geometric sector used across the spacetime mapping.

## Photon Ontology Note

In $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, the photon is fundamentally a coaxial contra-rotating pro/anti planar pair assembly propagating through the Noether sea. The language of "field quanta" and effectively continuous emission is retained as a coarse-grained description over many discrete planar-mode nucleation events. In this file, $\mathbf{p}_{\gamma}$ denotes momentum of that discrete assembly object at micro level, while standard QED field language is used for observer-level rates and spectra.

Event-level provenance for cosmology-facing use is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

## Regime Map

- **Thermal bremsstrahlung (free-free):** hot plasmas, continuum X-ray backgrounds, cluster gas.
- **Non-thermal bremsstrahlung:** energetic electron populations in shocks, jets, and dense targets.
- **Thin target:** particles radiate while largely retaining energy; spectrum follows injected particle distribution.
- **Thick target:** repeated interactions strongly cool particles; emergent spectrum encodes transport and stopping depth.

## Observable Consequences

- Broadband continuum from X-ray to gamma-ray, often with weak line structure superposed from other processes.
- Cooling-channel competition with synchrotron, inverse Compton, and adiabatic losses.
- Diagnostics of density and composition through normalization $\propto Z^2 n_e n_i$.
- Background channel in detector and beamline environments, especially with high-$Z$ materials.

## Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

In standard plasma and astrophysical modeling, bremsstrahlung is treated as a local radiative process inside a given source geometry and transport model. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same reaction physics is retained at network level, while interpretation changes at background level: bremsstrahlung constrains how assembly transport, compression, and outflow map to observable photon continua.
