# Bremsstrahlung

Bremsstrahlung ("braking radiation") is the standard electromagnetic comparison process in which emission accompanies the acceleration of a charged particle by another charge, typically an electron deflected by an ion or nucleus. An unbound encounter permits a continuous range of photon energies; the scattering geometry and projectile distribution determine the continuum spectrum. In practice it is a core process in nuclear and particle experiments, hot-plasma diagnostics, and high-energy astrophysical source modeling. The Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, material below is an exploratory mapping of this effective channel, not a claim that atomic or electron-envelope structure is a substrate premise.

## Teaching Path

This chapter is organized in three layers:

1. **Standard baseline:** what is already established (mechanism, emissivity, scaling laws).
2. **Radiation inheritance:** how the channel specializes the shared closure-residual routing in [Radiation](radiation.md).
3. **$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping layer:** how the same observables are re-expressed in assembly-language terms.

Read left-to-right as: baseline physics $\rightarrow$ shared radiation routing $\rightarrow$ channel-specific ontology mapping.

Terminology in this chapter follows [mode-taxonomy.md](mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

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
- $E_{\mathrm{ref}}>0$: declared normalization energy for the provisional nucleation ansatz; it is not itself a photon floor.
- $\Gamma_{\mathrm{eff}}$: effective-time/proper-time conversion factor; its relation to the Noether sea cadence factor $\Gamma_N$ requires a clock and observer-chart projection.
- $\rho_{\text{NS}}(\mathbf X,T)$: local physical Noether braid density.
- $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$: density normalized to a declared reference $\rho_{\text{NS},0}>0$; $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the separate sea delay factor, with $c_{\text{eff}}$ the declared effective propagation speed.

## Physical Mechanism

In the standard Coulomb comparison, the projectile momentum changes by $\Delta \mathbf{p}$ and its acceleration contributes to radiation. For electron-ion bremsstrahlung, emitted power and spectral shape depend on target charge, projectile energy, scattering kinematics, screening, and medium optical depth.

Here acceleration includes changes in direction at nearly constant speed. At low photon energies, infrared-safe observables combine experimentally unresolved emission with the corresponding virtual corrections in quantum electrodynamics (QED). In material, interference among encounters during photon formation and dielectric response can suppress emission; a sum of independent local events is not valid in every regime. At high energies, relativistic corrections and recoil also become important.

## Prerequisites (Minimal)

- Photon assembly hypothesis (planar-mode photon-assembly language at micro level).
- Shared radiation routing in [Radiation](radiation.md).
- [Master Equation](../dynamics/master-equation.md) acceleration law and its proposed coarse-grained transition map.
- Emergent metric/geodesic transport framework (observer-level propagation and lensing).
- Absolute-time to proper-time conversion rules used for rate equations.

<a id="mathbbamathbbamathbba-micro-physical-derivation-interpretive-map"></a>

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Micro-Physical Mapping

An [architrino](../foundations/architrino.md) is a persistent point transceiver with polarity and path history. Its causal wake is the expanding emission record that later reaches other architrinos. Assemblies are coupled configurations of these constituents; a Noether braid is their proposed neutral scaffold, and the [Noether sea](../spacetime/noether-sea.md) is the ambient assembly population. Their motion is described in the fixed Euclidean void against absolute time $T$. Effective charge, energy, momentum, and radiation laws are observer-level quantities to recover from those histories.

Status convention used below:

- **Baseline:** established standard-physics relation retained unchanged.
- **Provisional map:** working $\mathbb{A}\mathbb{A}\mathbb{A}$ parameterization pending derivation.

### Radiation Inheritance

Bremsstrahlung specializes the target-encounter channel of [Radiation](radiation.md). The standard phrase "acceleration drives radiation" remains the observer-level baseline. In the proposed assembly mechanism, the encounter disturbs a repeating internal history, creating a closure mismatch: a failure of the driven history to return to its reference configuration. A photon basin denotes the set of histories that produce a persistent propagating photon state. Deriving such a basin and its population measure remains necessary before assigning emission probabilities.

The inherited skeleton illustrates a decelerating encounter, one subset of the channel:

$$
\text{charged-assembly deceleration near a target}
\longrightarrow
\text{closure mismatch}
\longrightarrow
\text{bremsstrahlung excitation basin}
\longrightarrow
\text{planar-mode photon, recoil, medium excitation, or residual internal energy}
$$

[View →](../../../../equation-mapping.html#corpus-equation-329c2e76557aa51d)

For this channel, the radiation residual can be specialized as the derivation target

$$
\mathcal{R}_{\Theta}^{\mathrm{br}}
=
\mathcal{R}_{\Theta}\!\left(
\Gamma_e(T),
\mathcal{C}_{o'j}(T),
J_{o'j},
\rho_{\text{NS}}(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T);
Z,b,\left\|\frac{d\mathbf{V}_e}{dT}\right\|
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2e76edb7b02fd102)

Here $\Gamma_e(T)$ includes the electron-assembly state and retained history. The receiver label $o'$ and transmitter label $j$ identify constituent architrinos; $\mathcal{C}_{o'j}(T)$ lists the earlier emission times whose wakes reach the receiver, and $J_{o'j}$ denotes the declared root Jacobian data. The observer-level quantities $Z$ and $b$ specify the target charge number and impact parameter. The vector $\mathbf V_e$ is the group velocity of a declared assembly center in the absolute frame, so $\left\| d\mathbf{V}_e/dT\right\|$ is acceleration magnitude, including transverse deflection. It is not generally the magnitude of speed loss. This equation names a candidate functional; it does not derive the QED cross-section or establish that these reduced arguments suffice.

The explicit acceleration argument is a path-derived assembly diagnostic. At one hit the Master Equation reads transmitter position and velocity; a retained encounter record may estimate acceleration from the changing path and then test whether that history predicts the routed assembly transition. This provisional channel model adds no acceleration-dependent multiplier to an architrino hit.

The corresponding excitation energy is inherited from the radiation basin definition:

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_C(\Gamma_{e,\text{post shock}})
-
E_C(\Gamma_{e,\text{nearest stable rung}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-a469384a4795245d)

Here $E_C$ is a proposed closure-class energy functional. Its domain, reference branch, and rule selecting the "nearest stable rung" must be declared; a phase-space distance alone does not select an energetically accessible final state. The displayed difference is an available excitation energy only on a branch where the reference exists and the difference is nonnegative. It is not automatically the projectile's total energy loss.

The planar-mode gate is likewise inherited as a necessary eligibility condition in the proposed model:

$$
\mathcal{S}_{\gamma}^{\mathrm{br}}
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}^{\mathrm{br}}\ge E_{\gamma,\min}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b70f06ee5831829)

Both conditions must hold in this model, but neither proves a retained photon branch or guarantees an emission event. If no photon is produced, transferred energy remains in explicitly evaluated recoil, medium, wake, or remnant accounts; unchanged source energy is also possible. An unresolved account is not evidence of heating.

### Wake Shock Definition (Channel Specialization)

In this document, a **wake shock** is the bremsstrahlung name for the inherited radiation closure residual when it is produced by strong target-induced deceleration of the electron Noether braid assembly. It is not merely a descriptive label for radiation. Operationally, the candidate mechanism (a derivation target, not an established result) is the threshold crossing where the electron assembly's internal curvature mode is driven across the field-speed symmetry point in a declared binary channel (near $v \approx c_f$), creating a transient high-curvature state that can shed energy into the surrounding Noether sea. Falsifier: simulated emission events that radiate without any internal-channel $c_f$ crossing would falsify the wake-shock identification.

A minimal trigger condition is written as

$$
\mathcal{I}_e\!\left(\rho_{\text{NS}}(\mathbf X,T),\left\|\frac{d\mathbf{V}_e}{dT}\right\|,\Xi_e\right) \ge \mathcal{I}_{\mathrm{crit}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1bc47837a9f5324b)

Here $\Xi_e$ denotes internal state variables, $\mathcal I_e$ is a proposed excitation diagnostic, and $\mathcal I_{\mathrm{crit}}$ is its proposed threshold. Neither is evaluated here. The deterministic Master Equation supplies accelerations from path history; a statistical transition kernel requires a separately declared ensemble and outcome map. The inequality alone supplies neither that kernel nor a photon-producing trajectory.

The proposed mechanism associates target-induced changes in constituent paths with an increase in $\mathcal{R}_{\Theta}^{\mathrm{br}}$. In the canonical Master Equation, each acceleration contribution combines inverse-square proximity with the transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ measures how transmitter motion spaces the arriving wake surfaces. That factor is counted once. Receiver motion changes root playback and the subsequent deflected path, but it does not multiply an already arriving acceleration. Photon formation from those histories remains a proposed transition into a coaxial contra-rotating polarity-conjugate planar pair. Its acceleration balance, persistence, and emission probability remain open under [Photon Referent Status](../assemblies/bosons/electroweak-bosons.md#photon-referent-status).

A radiation-inherited event ledger compares energy $E$, momentum $\mathbf p$, and angular momentum $\mathbf J$ across one event window, in one declared frame and about one angular-momentum origin. Superscripts $-$ and $+$ label incoming and outgoing states; the superscript $0$ labels net transfers to the other accounts, not necessarily nonnegative quantities. With every boundary exchange included, the required projectile-depletion balance is, for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$,

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
\mathcal Q_{\mathrm{rem}}^{0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bddc2ba724f7231)

This balance is a recovery requirement, not a conservation theorem derived here from the acceleration law. Every term must be defined on the same history. In particular, internal excitation already included in the outgoing projectile state must not also be counted as a separate remnant transfer.

A separate, reduced relaxation budget for a prepared excitation has the form

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_{\gamma}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\text{rem}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6152bb94e2f88850)

Here $E_{\gamma}$ is emitted photon energy, $\Delta E_{\mathrm{recoil}}$ is the target's recoil-energy change, $\Delta E_{\mathrm{med}}$ is genuine medium excitation, and $\Delta E_{\text{rem}}$ is excitation retained above the chosen final reference. This reduced equation applies only when additional wake and handoff energy changes vanish within the declared tolerance, and external driving has ended. Otherwise those changes remain explicit in the full budget. It is not obtained merely by selecting the energy component of the preceding source-depletion identity.

For an arithmetic example in normalized wake-speed units with $c_f=1$, choose an arbitrary comparison energy unit. A prepared excitation of ten units that emits six and retains four loses six units from the source. Its initial excitation and its source depletion are different quantities. In an encounter, the formation of that excitation and any change in projectile group motion need their own accounted transfer. The approximation $\Delta E_e\approx E_{\text{exc}}^{\mathrm{br}}$ therefore requires a derived relation between the chosen preparation and final reference, not just small recoil. For a heavy target initially at rest, declaring recoil energy negligible requires an independent estimate below the event's energy tolerance; finite recoil momentum remains in the momentum budget.

Interpretive takeaway: this section defines event-level state transition and bookkeeping, not a replacement of validated QED cross-sections.

### Provisional Effective Parameterization (Pending Derivation)

To make the wake language calculable, the $\mathbb{A}\mathbb{A}\mathbb{A}$ program uses a provisional mapping ansatz. The variable $\mathcal{S}_{\mathrm{wake}}$ is an effective proxy for the inherited photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{br}}$, not a separate radiation ontology. This is a working effective form pending derivation from the Master Equation, not a claimed first-principles closure:

$$
\mathcal{S}_{\mathrm{wake}} \equiv A_{\mathrm{tb}} \, \bigl[\rho_{\text{NS}}(\mathbf X,T)\bigr]^{p_\rho} \left\|\frac{d\mathbf{V}_e}{dT}\right\|^{p_a}
$$

[View →](../../../../equation-mapping.html#corpus-equation-58c156aba5292fb1)

The ansatz assumes a candidate photon basin separated by a local barrier; it does not exhibit a stable attractor. The threshold scale $\mathcal{S}_*>0$ is an effective proxy for $\mathcal{S}_{\gamma,*}$. Require $A_{\mathrm{tb}}\ge0$, finite $\mathcal{S}_{\mathrm{wake}}\ge0$, $E_{\text{exc}}^{\mathrm{br}}\ge0$, and $E_{\mathrm{ref}}>0$. The dimensions of $A_{\mathrm{tb}}$ compensate the density and acceleration powers so that $\mathcal{S}_{\mathrm{wake}}/\mathcal S_*$ is dimensionless. A domain containing zero density or zero acceleration must exclude exponents that make this proxy singular. The following exponential is a proposed response per declared encounter window, conditional on satisfying the inherited energy floor:

$$
P_{\mathrm{nuc}} = 1 - \exp\!\left[-\left(\frac{\mathcal{S}_{\mathrm{wake}}-\mathcal{S}_*}{\mathcal{S}_*}\right)_+ \left(\frac{E_{\text{exc}}^{\mathrm{br}}}{E_{\mathrm{ref}}}\right)\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-39838758c5c2a16a)

Here $(x)_+ \equiv \max(x,0)$. Outside the energy-eligible domain, set the model's event probability to zero; the displayed expression alone does not enforce a nonzero $E_{\gamma,\min}$. Within the declared domain it lies in $[0,1)$ for finite inputs and vanishes at $\mathcal S_{\mathrm{wake}}=\mathcal S_*$. Thus eligibility at equality does not imply positive probability. The diagnostic $\mathcal I_e$ has no derived relation to this probability unless its relation to both gates is supplied.

The probability has no photon-energy spectrum or multiplicity distribution; subdividing an encounter also requires a consistent rate or hazard law, which is not specified. A nonzero-floor branch may set $E_{\mathrm{ref}}=E_{\gamma,\min}$ after deriving that floor; a zero-floor branch must use another finite reference scale. Keeping $E_{\mathrm{ref}}>0$ prevents a singular normalization but does not establish a physical zero-floor limit.

Interpretation of coefficients:

- $A_{\mathrm{tb}}$: normalization for assembly-to-medium coupling strength.
- $p_\rho$: sensitivity exponent to local Noether sea density (subscripted to avoid the fine-structure constant $\alpha$).
- $p_a$: sensitivity exponent to acceleration magnitude (subscripted to avoid the kinematic $\beta=\|\mathbf v\|/c$ used below).
- $\mathcal{S}_*$: effective bremsstrahlung proxy for the inherited planar-mode onset scale $\mathcal{S}_{\gamma,*}$.
- $E_{\mathrm{ref}}$: finite normalization scale used only by the provisional response ansatz; its derivation and relation, if any, to $E_{\gamma,\min}$ remain open.

Status and handling:

- Parameters are phenomenological placeholders; any fit must declare numerical ranges and a normalization domain. No fitted values or bounded priors are supplied here.
- If fit is required before derivation, parameter count and uncertainty ranges are tracked explicitly as theory-cost items, rather than treated as hidden freedom.
- Parsimony assessment is therefore provisional until derivation quality is established in the foundations track.

A proposed observer-level gravity parameterization is

$$
\mathcal{S}_{\mathrm{wake}} = \mathcal{S}_{\mathrm{wake}}\!\left(g^{\mathrm{eff}}_{\mu\nu},\nabla g^{\mathrm{eff}}_{\mu\nu},u_e^\mu,\rho_{\text{NS}}(\mathbf X,T)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-933fba4042b97473)

The effective metric $g^{\mathrm{eff}}_{\mu\nu}$ and electron four-velocity $u_e^\mu$ belong to a declared observer chart. Here $\nabla g^{\mathrm{eff}}$ can only denote coordinate-gradient data unless another derivative is specified: the metric-compatible covariant derivative of the metric is zero. Coordinate gradients alone are chart-dependent and cannot serve as an invariant local trigger. Equivalence of this parameterization with the path-derived proxy requires a constitutive map; it does not follow from rewriting its arguments.

### Emergence of Radiation from Assembly Dynamics

The proposed emergence route has four parts:

1. **Mechanism hypothesis:** encounter-driven internal reconfiguration produces a closure mismatch $\mathcal{R}_{\Theta}^{\mathrm{br}}$ and a nonnegative excitation budget on a declared reference branch; eligible histories are candidates for photon formation.
2. **Microstate mapping target:** derive the relation between $\mathcal I_e$, the two eligibility gates, and the measure of histories that actually emit. A scalar threshold alone does not establish $P_{\mathrm{nuc}}>0$.
3. **Classical-limit recovery (open derivation target):** for many emissions over smooth trajectories, coarse-grained power must recover the standard acceleration-radiation scaling (Larmor/Liénard class) in weak-coupling validated regimes; this recovery has not been derived and is graded open in the [Radiation closure-target ledger](radiation.md#radiation-closure-target-ledger).
4. **Declared breakdown regime:** near unresolved ultra-strong-field or ultra-high-energy domains, this effective mapping is not assumed complete and requires direct Master Equation treatment.

## Core Equations (Observer-Level Baselines)

Observer-level baselines in this chapter use SI units (explicit $\epsilon_0$); the Gaussian-unit displays in [Mode Taxonomy](mode-taxonomy.md) declare their convention locally.

A compact emissivity form for nonrelativistic electron-ion free-free emission, with nondegenerate Maxwellian electrons at temperature $T_{\mathrm{temp}}$, is

$$
\epsilon_{\nu}^{\mathrm{ff}} \propto Z^2 n_e n_i T_{\mathrm{temp}}^{-1/2} e^{-h\nu/(k_B T_{\mathrm{temp}})} g_{\mathrm{ff}}(\nu,T_{\mathrm{temp}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-520d7f9d5ee80114)

Here $Z$ is the ion charge number, $n_e$ and $n_i$ are electron and ion number densities, $\nu$ is frequency, $h$ is Planck's constant, $k_B$ is Boltzmann's constant, and $g_{\mathrm{ff}}$ is the Gaunt correction factor. Define $\epsilon_\nu^{\mathrm{ff}}$ as energy emitted per volume, time, frequency, and solid angle, in the plasma rest frame. Angle-integrated emission is $4\pi\epsilon_\nu^{\mathrm{ff}}$ for isotropic emission. For mixtures, replace $Z^2n_i$ with the ion-species sum $\sum_i Z_i^2n_i$. Dense, strongly coupled, degenerate, or relativistic plasma requires an appropriate kinetic and dielectric calculation; it is not covered by changing a Debye cutoff alone. Frequency integration gives the approximate temperature scaling

$$
\epsilon_{\mathrm{ff}} \propto Z^2 n_e n_i T_{\mathrm{temp}}^{1/2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-647af9e15934a4da)

For high-energy scattering language, the differential yield is tracked with $d\sigma/dk$ (photon energy $k$), including screening and Coulomb corrections in the target.

The temperature scaling suppresses the thermally averaged Gaunt factor and holds within the stated thermal regime. These observer-level equations are recovery targets. The wake-shock proposal supplies a candidate account of their provenance; it has not derived them.

Free-free absorption is the inverse-bremsstrahlung partner of this emissivity. For thermal electrons obeying the detailed-balance assumptions, the observer-level Kirchhoff relation uses the net absorption coefficient $\alpha_\nu^{\mathrm{ff}}$, including stimulated emission, and the Planck specific intensity $B_\nu(T_{\mathrm{temp}})$:

$$
\alpha_\nu^{\mathrm{ff}}
=
\frac{\epsilon_\nu^{\mathrm{ff}}}{B_\nu(T_{\mathrm{temp}})}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-cd313d722c812c8b)

Using angle-integrated emissivity in this equation would require an additional $4\pi$ in the denominator. The relation concerns local transfer coefficients; it does not require the actual radiation field to be Planckian. The [free-free derivation by Condon and Ransom](https://www.cv.nrao.edu/~sransom/web/Ch4.html), equations 4.29–4.39 and 4.51, makes the angular normalization and thermal distribution explicit.

For fixed ionization and composition in the ideal thermal regime, the Rosseland mean opacity per unit mass has the Kramers scaling $\kappa_{\mathrm{ff}}\propto\rho T_{\mathrm{temp}}^{-7/2}$, where $\rho$ is material mass density. This is a weighted inverse-opacity average appropriate to diffusive radiation transport, not the unweighted frequency integral of emissivity. Emission and absorption must arise from the same encounter dynamics with the appropriate distributions and stimulated contribution. Independent fits alone do not establish detailed balance.

### Shock-Cooling Ledger in Outflows

Jet and outflow shocks require an additional branch check before a continuum component is identified as bremsstrahlung or free-free emission. In dense radiative shocks, such as many young-stellar-object working surfaces, the total cooling function $\Lambda(T_s)$ is usually dominated by line cooling, recombination, molecular, or other channel rows over part of the temperature range. Bremsstrahlung is retained only for the part of the emissivity budget that the local plasma state actually assigns to free-free emission.

For an optically thin, fully ionized hydrogen cell with one electron-ion temperature $T_s$ and ideal-gas ratio of specific heats $\gamma_{\mathrm{gas}}>1$, use the observer-level cooling estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ee71137279fbf3b4)

Here $n_H$ counts hydrogen nuclei and $n_e n_H\Lambda(T_s)$ is radiated energy per volume and time. The numerator divided by $\gamma_{\mathrm{gas}}-1$ is the thermal energy density in this restricted composition. Other ions, neutrals, molecular degrees of freedom, or ionization energy require their own energy contributions. Compare this cooling time with the flow time $t_{\mathrm{dyn}}\sim \ell_j/v_j$, where $\ell_j$ is a zone length and $v_j$ its flow speed in the same frame. Define the fractional free-free contribution, using the same $n_e n_H$ normalization for both cooling coefficients, by

$$
f_{\mathrm{ff}}
=
\frac{\Lambda_{\mathrm{ff}}(T_s,n_e,n_i,Z)}
{\Lambda(T_s)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-078029bf434891a8)

A separate free-free component is included when this fraction exceeds the declared modeling threshold. A smaller component still contributes to the remainder budget; its energy is not reassigned to a different physical channel. The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is to derive which event records feed each cooling channel while preserving the full energy ledger.

## Core Channels (Inclusion Rule)

For a practical channel inventory, list components contributing at least about 1% of the modeled emissivity, opacity, or energy loss in the declared regime. Bremsstrahlung is a scattering/transport process, so this fraction is not a particle branching ratio. Bound the combined omitted contribution against the required accuracy; many individually small channels can be important in aggregate. Conservation and detailed-balance accounts retain the full contribution regardless of display threshold.

- $e^- + Z \rightarrow e^- + Z + \gamma$ (electron-ion/nuclear bremsstrahlung baseline channel).
- $e^+ + Z \rightarrow e^+ + Z + \gamma$ (positron analog in mixed plasmas/beams).
- Thermal free-free ensemble channel (many-event superposition governing continuum emissivity).
- Inverse bremsstrahlung/free-free absorption (the same encounter family with incoming photon energy routed into charged and medium motion).

Associated pair/Compton channels are included when they exceed the same contribution threshold in the modeled zone.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Bremsstrahlung hypothesis:** target-induced acceleration drives the inherited closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$; photon-eligible histories require a derived outgoing mode and energy-momentum transfer.
- **Positron analog:** the projectile charge is reversed. At a fixed target this changes the interaction and generally the trajectory; it does not simply reverse the electron trajectory or prove equal rates. The positron encounter requires its own kinematic and Coulomb-correction benchmark.
- **Thermal ensemble target:** recover free-free emissivity by averaging the admissible encounter histories. An independent-event sum requires formation-length and medium-interference effects to be negligible or explicitly included.
- **Free-free absorption target:** derive incoming-photon transfer into charged-assembly motion, recoil, and medium excitation from the same microscopic encounter family with the appropriate initial-state distribution.

## Shared Photon Event Record

Use the same photon-channel event record here as in [Synchrotron](synchrotron.md) and [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md). A bremsstrahlung planar-mode event should record:

- incoming and outgoing charged assembly identity, momentum, and path-history provenance;
- target assembly identity, recoil term, and coherent or resolved geometry regime;
- local Noether sea state variables $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, excitation state, and relevant causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$, excitation energy $E_{\text{exc}}^{\mathrm{br}}$, and wake-strain or shock-intensity status relative to the planar-mode threshold;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon emission residual, including source depletion, recoil, causal-wake transfer, retained and rejected handoff contributions, helicity, and balance terms;
- causal-wake ledger and identity-routing fields from the shared radiation schema, so photon output is not treated as a source of new substrate identities;
- residual medium excitation $\Delta E_{\mathrm{med}}$ and any non-radiative channel that receives sub-threshold energy.

This record is a derivation target. It should recover standard $d\sigma/dk$, screening, form-factor, and emissivity limits before any Noether sea-dependent deviation is treated as physical. The polarization basis and transverse angular-momentum account follow the photon conditions in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md); this chapter records emission provenance, not photon spin closure.

<a id="ir-regularization-as-a-stability-floor"></a>

## Infrared Behavior and the Candidate Stability Floor

Standard soft-photon emission produces infrared-divergent exclusive rates, handled by inclusive observables and resummation. In $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation, an additional hypothesis is available: stable planar photon assemblies exist only above a minimum nucleation energy $E_{\gamma,\min}$.

Within the proposed nonzero-floor model, the possibilities are:

- **Both eligibility conditions hold:** a photon channel is permitted, subject to a retained branch, an admissible final-state budget, and its event probability. Threshold equality does not guarantee emission.
- **Either eligibility condition fails:** this model produces no stable photon output. Any transferred energy must be evaluated in recoil, medium, wake, or remnant accounts. Heating requires evidence of ensemble thermalization.

The proposal does not establish a physical floor or preservation of inclusive QED observables. Replacing unresolved photon transport with local heating changes where energy and momentum travel.

Interpretation split:

- **Unresolved measurement:** a detector threshold limits which photons are recorded; it does not establish their absence or identify unrecorded energy with heat.
- **Ontic prediction (conditional):** if $E_{\gamma,\min}$ is above current soft-photon sensitivity, the model predicts a measurable low-frequency turnover at $\nu_{\min}=E_{\gamma,\min}/h$.

The floor and heat-routing claims remain physical hypotheses. Preserving tested inclusive rates requires computing the same detector-inclusive observable, including unresolved radiation and the corresponding QED comparison corrections. Material suppression from interference and dielectric response is a separate benchmark, as described in the [Particle Data Group review](https://pdg.lbl.gov/2022/reviews/rpp2022-rev-passage-particles-matter.pdf), sections 34.4.3 and 34.4.6.

Connection to the photon closure interface: $E_{\gamma,\min}$ should be read as a candidate expression of the planar-pair stability boundary, not as a free cutoff. The first derivation must decide whether that boundary vanishes, lies below current soft-photon sensitivity, or produces a measurable turnover while preserving inclusive QED observables. Any verified freely propagating photon below the proposed $\nu_{\min}$ falsifies that nonzero floor; propagation and plasma cutoffs must therefore be separated from a source-side turnover before an empirical bound is assigned.

A conditional observer-level ceiling comes from the Voyager 1 and 2 Plasma Wave System detection of outer-heliospheric radio emission at $2$–$3\,\mathrm{kHz}$, reported above the local solar-wind electron plasma frequency whenever supporting density data were available ([Kurth et al., “Detection of a radio emission at 3 kHz in the outer heliosphere,” 1984](https://ntrs.nasa.gov/citations/19850032363), NTRS 19850032363). Since $h(2\,\mathrm{kHz})\simeq8.3\times10^{-12}\,\mathrm{eV}$, a universal minimum propagating-photon energy must satisfy $E_{\gamma,\min}\lesssim10^{-11}\,\mathrm{eV}$ in the declared comparison frame if the observation is assigned to that photon channel. Applying the same number to a source nucleation floor also requires source-to-receiver frequency transfer. This conditional inference does not identify the emission mechanism or replace the plasma-transport check.

## $Z^2$ Scaling and Finite-Geometry Resolution

In the standard comparison, coherent nuclear scattering adds amplitudes from the proton charges before squaring. Let $q_{\mathrm{tr}}$ denote momentum-transfer magnitude and $R_{\mathrm{nuc}}$ nuclear radius. The phase-resolution parameter is $q_{\mathrm{tr}}R_{\mathrm{nuc}}/\hbar$, where $\hbar$ is the reduced Planck constant. Impact parameter alone does not fix momentum transfer independently of projectile energy and encounter kinematics.

- **Coherent elastic contribution:** unresolved proton phases give $Z^2$ scaling. Finite nuclear size suppresses this contribution through the normalized elastic form factor, with $F(0)=1$.
- **Resolved inclusive contribution:** incoherent scattering sums probabilities over distinguishable final states. A contribution proportional to $Z$ requires an additional structure function; it is not produced by multiplying the coherent $Z^2$ term by $|F|^2$.

For independent identical proton-position distributions, expanding the squared amplitude gives the illustrative structure factor $Z+Z(Z-1)|F|^2$. Its coherent elastic part is $Z^2|F|^2$ and its variance is $Z(1-|F|^2)$. At $F=0$ the elastic part vanishes while the inclusive sum retains $Z$. Correlations, recoil, excitation thresholds, and constituent response can change this simple limit. Atomic-electron screening is separate from nuclear-size resolution. In the assembly interpretation, deriving these amplitudes and inclusive sums from proton and electron histories remains a recovery target; deviation from $Z^2$ alone does not identify a Noether braid mechanism.

A speculative multiplicative correction to the coherent elastic contribution can be written as

$$
\frac{d\sigma}{dk} \propto Z_{\mathrm{eff}}^2 \, |F(q_{\mathrm{tr}}^2)|^2 \, \left[1+\delta_g(r,\Phi_{\text{eff}})\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-81a3234d5ca1d29f)

Here $Z_{\mathrm{eff}}$ represents the declared screened charge factor, $k$ is photon energy, $r$ is a declared environmental location variable, and $\delta_g$ is an uncomputed dimensionless correction depending on the effective potential $\Phi_{\mathrm{eff}}$. Positivity requires $1+\delta_g\ge0$; benchmark compatibility requires the correction to vanish or remain within independently measured uncertainty in the comparison regime. This ansatz omits the resolved incoherent contribution and does not derive compact-object transport.

## Momentum-Flux Closure at Emission

An effective event record must recover momentum balance. With each $\Delta\mathbf p$ defined as outgoing minus incoming momentum, a reduced balance is

$$
\Delta \mathbf{p}_e + \mathbf{p}_{\gamma} + \Delta \mathbf{p}_{\mathrm{recoil}} + \Delta \mathbf{p}_{\mathrm{med}} = 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-7c49bf1ca81f2945)

Here $\mathbf p_\gamma$ is outgoing photon momentum and no incoming photon is included. These momentum-change signs differ from the source-depletion sign used for $\Delta\mathcal Q_e^0$ above. The reduced equation is valid only if wake, handoff, and other boundary momentum fluxes vanish or are explicitly included in the listed terms without double counting. Otherwise they must be added. No conserved assembly momentum functional has been derived here from the master equation.

For a sufficiently heavy, slowly recoiling target, finite recoil momentum can carry little recoil energy in the effective description. This does not imply that recoil dominates the vector balance. Momentum conservation constrains but does not determine the angular distribution; that distribution requires the encounter dynamics and radiation map.

The radiation-zone benchmark is stronger than total momentum balance. For a classical point-charge comparison with collinear velocity and acceleration, including antiparallel deceleration, let $\mathbf a=d\mathbf v/dt_{\mathrm{eff}}$, $\beta=\|\mathbf{v}\|/c$, $\gamma=(1-\beta^2)^{-1/2}$, and $\theta$ be the angle between the outgoing radiation direction and $\mathbf{v}$. Here $q$ is electric charge, $\epsilon_0$ vacuum permittivity, and $c$ the observer-level light speed, not a new numerical value for $c_f$. The power per unit emission time $t_{\mathrm{eff}}$, evaluated at the retarded source event, is

$$
\frac{dP_{\mathrm{br,std}}}{d\Omega}
=
\frac{q^2\|\mathbf{a}\|^2}{16\pi^2\epsilon_0c^3}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^5}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e95e79369ff6f294)

The fifth power in the denominator refers to emission time. Power per detector arrival time has a sixth power because $dt_{\mathrm{arr}}=(1-\beta\cos\theta)\,dt_{\mathrm{eff}}$ for the distant stationary-observer comparison. The distinction and collinear restriction follow from the standard radiation derivation ([Kaplunovsky, *Radiation from Accelerated Charges*, equations 71–79](https://web2.ph.utexas.edu/~vadim/Classes/2022s/accel.pdf)). General deflecting trajectories require the full vector angular kernel; quantum, screening, and medium corrections require their own benchmark. None of these standard laws is an architrino-level premise.

Angular integration in this collinear classical regime gives the corresponding total power

$$
P_{\mathrm{br,std}}
=
\frac{q^2\gamma^6\|\mathbf{a}\|^2}{6\pi\epsilon_0c^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5184fa9700cf1bac)

This supplies candidate radiation-power diagnostics, not a momentum-conservation proof. In the following ratios, $t$ is shorthand only for the same emission time $t_{\mathrm{eff}}$ in numerator and denominator, and $P_{\mathrm{map}}$ must be constructed independently of the benchmark:

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
-1
$$

[View →](../../../../equation-mapping.html#corpus-equation-f154785a1a258d4a)

The power ratio is defined only for a positive reference integral, and the angular ratio only where the reference angular power is positive. At the axial nodes $\theta=0,\pi$, or in a zero-acceleration control, use absolute or finite-bin differences instead. Recovery requires both residuals to approach zero within stated errors in a common benchmark regime; this chapter supplies no measured convergence result. Applying corrections to one side does not preserve the displayed uncorrected benchmark automatically. The emitted photon ledger must independently satisfy the $\Delta_{\gamma,\mathrm{flux}}$ test from [Radiation](radiation.md); a correct-looking spectrum alone does not close energy and momentum transfer.

## Time Parameterization (Effective Observer Time vs Proper Time)

Rate equations in this file are observer-level unless noted, written against the effective observer time $t_{\mathrm{eff}}$; substrate evolution remains in absolute time $T$. Convert via

$$
\frac{dE_e}{d\tau_e} = \frac{dE_e}{dt_{\mathrm{eff}}}\,\frac{dt_{\mathrm{eff}}}{d\tau_e},
\qquad
\frac{dt_{\mathrm{eff}}}{d\tau_e} = \Gamma_{\mathrm{eff}}(v_e,\rho_{\text{NS}}(\mathbf X,T),\Phi_{\text{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-ffca71ed870457ae)

The first equality is the chain rule, assuming a differentiable monotone clock map; it does not provide that map. Let $J_e=dt_{\mathrm{eff}}/dT$ be the observer-chart Jacobian along the electron history and let $\Omega_e/\Omega_{e,0}=d\tau_e/dT$ be the normalized electron-clock cadence. Then $\Gamma_{\mathrm{eff}}=J_e/(\Omega_e/\Omega_{e,0})$. In [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), $\Gamma_N=1/C_N$ is the inverse normalized Noether sea cadence, not automatically an electron-clock conversion. Identifying the clock cadence with $C_N$ requires a vanishing clock/sea mismatch; identifying $\Gamma_{\mathrm{eff}}$ with $\Gamma_N$ also requires $J_e=1$. Recovery of $\gamma$ is a further conditional target.

A proposed weak-correction parametrization is

$$
\Gamma_{\mathrm{eff}} \approx \gamma(v_e)\,\left[1+\delta_{\rho}(\rho_{\text{NS}}(\mathbf X,T))+\delta_{\Phi}(\Phi_{\text{eff}})\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-153e484cb4cb3d2c)

with $\gamma(v_e)=1/\sqrt{1-v_e^2/c^2}$ in the declared effective chart. The smallness of $\delta_\rho$ and $\delta_\Phi$ is a benchmark constraint, not a measurement reported here. Density and effective potential can encode the same sea variation, so their corrections cannot be fitted as independent contributions without a derivation that prevents double counting. The proposed argument list may also be insufficient when clock response depends on additional assembly state or history.

Connecting cooling to absolute-time evolution requires both $J_e$ and the electron-clock cadence, with their applicable domains established independently.

## Cosmological Propagation and Redshift Map

For source emissivity at a declared emission record $E$ and receiver record $R$, first compute the observer-level signed photon-frequency transfer budget

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

[View →](../../../../equation-mapping.html#corpus-equation-46bbdaa5dfbbd001)

Define the net transfer by $1+z_X=\nu_E/\nu_R>0$, using endpoint frequencies in declared observer frames. The decomposition above is bookkeeping only until its terms are independently specified. For collisionless, nondispersive propagation admitting a metric geometric-optics description and conserving photon phase-space occupation, a restricted observer-level transfer target is

$$
I_\nu^{\mathrm{obs}}(R) = (1+z_X)^{-3}\,I_{\nu(1+z_X)}(E)\,\mathcal{T}(\nu, E\to R)
$$

[View →](../../../../equation-mapping.html#corpus-equation-593608113225bea2)

Here $\nu$ is received frequency, $I_\nu$ is specific intensity per frequency and solid angle along the declared ray, and the source intensity is obtained by radiative transfer through the emitting column, not by identifying it with local emissivity. With no intervening interactions, $\mathcal T=1$ and invariance of $I_\nu/\nu^3$ gives the cubic factor. A multiplicative $\mathcal T$ can additionally describe pure attenuation out of that ray and frequency, with no in-scattering, frequency redistribution, or distributed source term. General plasma scattering, emission, or sea-mediated energy exchange requires a transport equation with the appropriate source and redistribution terms; logging an arbitrary $Y_{X,\mathrm{path}}$ does not establish the invariant.

For frequency-independent $z_X$ and $\mathcal T=1$, integrating with $d\nu_E=(1+z_X)d\nu_R$ gives the bolometric factor $(1+z_X)^{-4}$. A frequency-dependent transmission must remain inside the integral. In a homogeneous metric comparison, $1+z=(1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$ is valid when both endpoint factors use the same reference; no expansion or metric dynamics is derived from that notation.

## Thermal Equilibrium Assumptions in Evolving Noether Sea States

Thermal free-free emissivity assumes the specified electron distribution and encounter physics; a Maxwellian electron distribution does not by itself require an equilibrium radiation field. Kirchhoff's relation requires the corresponding detailed-balance conditions. To diagnose one possible departure from local equilibrium in evolving Noether sea states, define

$$
\mathcal{R}_{\mathrm{LTE}} \equiv \frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-96f88ca8e700036b)

- **$\mathcal{R}_{\mathrm{LTE}} \ll 1$:** the specified coupling is faster than cooling. This supports an equilibrium approximation only if it is the relevant equilibration process and is also faster than driving, transport, and state evolution. Electron thermalization, electron-ion energy exchange, and changes in ionization state can have different timescales.
- **$\mathcal{R}_{\mathrm{LTE}} \gtrsim 1$:** that coupling cannot maintain equilibrium against cooling by timescale separation alone. An independently faster equilibration process may still maintain the electron distribution; otherwise evolve the distribution rather than assuming a single temperature $T_{\mathrm{temp}}$.

This ratio is not a sufficient LTE criterion and does not determine whether radiation is Planckian. A plasma may have approximately thermal free-free coefficients while its optically thin escaping radiation remains far from equilibrium.

## Geodesics and Lensing Consistency

In a transparent, nondispersive geometric-optics regime where an effective metric has been established, the standard propagation target is

$$
ds_{\mathrm{eff}}^2 = 0,\qquad k^\mu \nabla^{\mathrm{eff}}_\mu k^\nu = 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-3891d730ab9c321d)

with $ds_{\mathrm{eff}}^2$ and $\nabla^{\mathrm{eff}}$ built from $g^{\mathrm{eff}}_{\mu\nu}$ and $k^\mu$ the affinely parametrized ray tangent. These equations are an effective recovery target, not a substrate law or a derivation of that metric. In a dispersive plasma, the frequency-dependent propagation law must instead be established from the medium response; a vacuum null-geodesic approximation is not automatic, especially near a plasma cutoff.

## Observer-Level Closure Checks

Per the authoring rule in [Mode Taxonomy](mode-taxonomy.md), the closure checks for this channel are collected here:

- **Radiated-power recovery:** compare independent mapped and reference instruments in the same classical collinear regime, with the same emission-time convention and positive denominators. Use absolute or finite-bin differences at nodes, and separately specified benchmarks when corrections change the target.
- **Photon ledger closure:** the emitted photon must pass $\Delta_{\gamma,\mathrm{flux}}=0$ from [Radiation](radiation.md).
- **Event conservation:** retain the complete source, wake, handoff, photon, recoil, and medium accounts. Use the reduced energy and momentum rows only after verifying their omitted terms and remnant convention.
- **Equilibrium validity:** test the electron distribution and all relevant equilibration times against state evolution; $\mathcal R_{\mathrm{LTE}}$ alone is insufficient. Recover emissivity and net absorption with consistent angular normalization and microscopic detailed balance where applicable.
- **Cross-section recovery:** distinguish coherent elastic form-factor suppression from resolved inclusive scattering, atomic screening, and material formation effects in the declared benchmark regime.

## Photon Ontology Note

The photon candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a coaxial contra-rotating polarity-conjugate planar pair assembly whose acceleration-balance and physical branch existence remain unresolved. Relating many such candidate emissions to effective field language is a proposed coarse-graining map. In this file, $\mathbf p_\gamma$ denotes the effective momentum assigned to a candidate emitted carrier; neither that assignment nor standard QED rates supplies a conserved primitive architrino momentum or proves that the carrier exists.

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

If that map reproduces standard continua only by retaining independent emissivity and absorption fits, without reducing parameter freedom or adding a cross-channel consistency constraint, it remains an optional interpretive layer rather than a derived improvement.
