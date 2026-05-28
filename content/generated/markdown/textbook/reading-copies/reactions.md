# Reactions

## Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

For concrete channel applications of this vocabulary, see [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md), and [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md).

### Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

This taxonomy records which channel family a reaction uses; it does not derive the angular-momentum or spin rule for that family. Photon Gate B, weak-corridor vector spin, Pauli/statistics closure, and spin-sensitive measurement outcomes inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and should remain marked as closure targets in reaction prose.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

At assembly level, these terms refer to substrate dynamics in absolute time:

- **Mode-lock event:** a discrete stability transition where a driven nested shell swarm/wake configuration settles into an allowed propagating or bound mode.
- **Wake-strain threshold:** the local instability boundary in Noether sea-coupled transport; below threshold, energy disperses into medium excitations, above threshold, stable mode formation is allowed.
- **Nucleation:** relocking/reorganization of existing substrate content (with provenance-preserving architrino bookkeeping), not creation ex nihilo.
- **Planar-mode nucleation (photon channels):** lock-in to a stable coaxial contra-rotating pro/anti planar-pair mode carrying Gate A energy-momentum data and Gate B transverse-ledger data.
- **Corridor-mode nucleation (weak channels):** lock-in to corridor-type interaction modes used for $W^\pm/Z$ channel bookkeeping.
- **Pair nucleation:** local substrate recruitment/reconfiguration into $e^+e^-$ assemblies under threshold-satisfying two-photon forcing, constrained to recover standard kinematic and rate limits in validated regimes. The incoming photon ledgers close at the vertex; the outgoing charged-assembly identities require identity-routed substrate content rather than relabeling the photon constituents.

Observer-level equations remain the operational layer. Assembly-level language is accepted only when it preserves threshold, cross-section, timing, and conservation closure against standard phenomenology.

### Low-Energy Standard Model Assemblies in the Noether Sea

This section is the canonical stepwise map for low-energy Standard Model channels interpreted in $\mathbb{A}\mathbb{A}\mathbb{A}$ language.

#### Regime Assumptions

- Low-energy means interaction scales where validated SM/QED/QCD effective descriptions already succeed and no beyond-tested deviation is introduced by default.
- The substrate is modeled as the Noether sea, which can store, transport, and relock assembly content under local conservation constraints.
- "Low-energy" here includes laboratory, beamline, plasma, and most astrophysical transport contexts outside unresolved near-horizon/extreme-density limits.

#### Canonical Stepwise Workflow

1. **Define observer-level channel**
Use the standard reaction statement first (for example $e^- + Z \rightarrow e^- + Z + \gamma$ or $\gamma + \gamma \rightarrow e^+ + e^-$).

2. **Set validated closure targets**
Declare the required observer-level closures before ontology mapping:
- kinematic threshold closure,
- differential/total rate closure,
- energy-momentum closure,
- timing/frame closure.

3. **Initialize assembly state**
Represent each incoming participant as an assembly state tuple:
`(identity, provenance path, charge sector, momentum, local Noether sea state)`.
Path history is part of identity bookkeeping in absolute time.

4. **Characterize local Noether sea state**
Specify Noether sea state variables used by mapping, with arguments suppressed only when the local context is clear:
$(\rho_{\text{NS}}(\mathbf{x},t), n(\mathbf{x},t), \chi_{\text{sea}}(\mathbf{x},t), \mathcal{V}_{\mathrm{NS}}, \nabla \rho_{\text{NS}}, \Phi_{\text{eff}}, T_{\mathrm{eff}}, J_{\mathrm{loc}})$.
These variables are mapping handles, not replacement observables.

Magnetic-like observer language belongs at this mapping layer. It is not a substrate force law and is not imported from rotating-frame coordinates. At substrate level each primitive hit remains line-of-action; the magnetic-like transverse channel is the part of the delayed-branch sum that survives after projection perpendicular to the assembly drift and after Noether sea anisotropy/vorticity dressing.

For an assembly $A$ with $\|\mathbf{v}_A\|>0$, define
$$
\Pi_{\perp}^{ij}(A)
=
\delta^{ij}-\hat v_A^i\hat v_A^j,
\qquad
\hat{\mathbf{v}}_A=\frac{\mathbf{v}_A}{\|\mathbf{v}_A\|}.
$$

A minimal transverse-channel map is
$$
F_{\perp,A}^{i}(t)
=
\Pi_{\perp}^{ij}(A)
\sum_{k}\sum_{t_0\in\mathcal{C}_{Ak}(t)}
W_{Ak}\!\left(t;t_0,\mathcal{V}_{\mathrm{NS}},R_A\right)
\hat r_{Ak,j}(t;t_0).
$$

The weight $W_{Ak}$ packages the inverse-square causal-wake factor, polarity sign, causal Jacobian, and local Noether sea anisotropy/vorticity response. This equation is the allowed bridge to magnetic-like language: transverse force is recovered as a projected consequence of delayed branch geometry plus medium response, not as an independent $\mathbf{v}\times\mathbf{B}$ substrate term.

In this expression, $\mathcal{C}_{Ak}(t)$ is the causal-root set for source branch $k$ acting on assembly $A$, and $\hat r_{Ak,j}$ is the $j$ component of the delayed line-of-action unit vector. The formula therefore preserves the primitive line-of-action law while naming the observer-level transverse projection.

Electromagnetic field variables used in reaction chapters are effective observer/channel variables. They are not imported as substrate ontology. A reaction page that claims electromagnetic recovery should therefore pass an effective EM Gate residual,

$$
\mathcal{G}_{\mathrm{EM}}
=
\left(
\Delta_{\mathrm{cont}},
\Delta_E^{\mathrm{EM}},
\Delta_{\mathbf{p}}^{\mathrm{EM}},
\Delta_{\mathbf{J}}^{\mathrm{EM}},
\Delta_{\mathrm{gauge}}
\right),
$$

where the continuity component is

$$
\Delta_{\mathrm{cont}}
\equiv
\partial_t\rho_{\mathrm{eff}}
+
\nabla\cdot\mathbf{J}_{\mathrm{eff}},
$$

and the gauge component requires every observer-level observable $\mathcal O$ used by the channel to obey

$$
\Delta_{\mathrm{gauge}}[\mathcal O,\chi]
\equiv
\mathcal O[A_{\mu}^{\mathrm{eff}}+\partial_\mu\chi]
-
\mathcal O[A_{\mu}^{\mathrm{eff}}]
=0.
$$

The energy, momentum, and angular-momentum components are defined by the effective electromagnetic energy-momentum gate in [Radiation](../../../../markdown/aaa/reactions/radiation.md). A channel passes only when these components vanish in the declared validated limit or when each nonzero term is assigned to a named photon, material, recoil, wake, or remnant row. This keeps Maxwell-level ledgers as recovery tests for channel bookkeeping rather than as primitive Noether sea dynamics.

5. **Evaluate wake-strain trigger**
Compute whether interaction forcing crosses the relevant mode boundary.
- If below threshold: no mode-lock event, energy routes into transport/heating/scattering channels.
- If above threshold: mode-lock event allowed and channel-specific nucleation/relock proceeds.

6. **Apply channel-specific lock rule**
Select the mode family:
- planar-mode for photon emission channels,
- pair nucleation for $\gamma\gamma$ conversion channels,
- corridor-mode for weak channels.

For photon channels, keep the two photon ledgers separate. Gate A records propagation and kinematics: $\hat{\mathbf{e}}$, $c_\gamma$, $E_\gamma$, $\mathbf{p}_\gamma$, phase frequency, and null-branch status. Gate B records polarization and spin closure: transverse basis, analyzer axis, material analyzer projector, helicity target, accepted/rejected capture channel, native capture measure, invariant unresolved-material measure, and no-longitudinal-mode status.

Gate B entries are bookkeeping requirements until the transverse planar-pair ledger is derived. A reaction chapter may require helicity, polarization, analyzer pass/reject routing, or no-longitudinal-mode closure, but it should not treat the mode taxonomy itself as the proof. Rejected photon action must route through local reflection, absorption, scattering, heat, or another allowed material update, not through an extra longitudinal free-photon branch.

The compact event contract for photon Gate B is the residual vector

$$
\mathcal R_{\gamma B}^{\mathrm{event}}
=
\left(
\Delta_A,
\Delta_Q^\gamma,
\Delta_{\mathrm{surv}}^\gamma,
\Delta_{\parallel}^{\mathrm{sub}},
\Delta_{\mathrm{hel}}^\gamma,
\Delta_{\epsilon}^{\gamma},
\Delta_{\mathrm{src}}^\gamma,
\Delta_{\mathrm{recoil}}^\gamma,
\Delta_{\mathrm{med}}^\gamma,
\Delta_{\mathrm{wake}}^\gamma,
\Delta_{\mathrm{handoff}}^\gamma,
\Delta_{\mathrm{rem}}^\gamma,
\Delta_{\mathrm{bal}}^\gamma
\right).
$$

Here $\Delta_A$ is the photon Gate A residual; $\Delta_Q^\gamma$, $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\parallel}^{\mathrm{sub}}$, $\Delta_{\mathrm{hel}}^\gamma$, and $\Delta_{\epsilon}^{\gamma}$ test the planar-pair substrate, transverse survival, longitudinal exclusion, helicity, and analyzer-basin rows; and $\Delta_{\mathrm{src}}^\gamma$, $\Delta_{\mathrm{recoil}}^\gamma$, $\Delta_{\mathrm{med}}^\gamma$, $\Delta_{\mathrm{wake}}^\gamma$, $\Delta_{\mathrm{handoff}}^\gamma$, $\Delta_{\mathrm{rem}}^\gamma$, and $\Delta_{\mathrm{bal}}^\gamma$ test the source, recoil, medium, causal-wake, analyzer-handoff, remnant, and event-balance rows. A reaction chapter may cite this vector as a bookkeeping contract, not as a derivation of photon polarization.

7. **Execute provenance-conserving relock**
Update assembly graph by relocking existing substrate content.
No ex nihilo creation is permitted in ontology bookkeeping; recruitment comes from local Noether swarm availability.

8. **Enforce local conservation**
Close event-level budgets:
- $\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}$,
- $\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}$,
- spin/angular-momentum ledger balance for emitted, absorbed, or converted vector modes,
- provenance ledger balance across reactants, products, and recruited substrate content.

The spin/angular-momentum line is a conservation requirement. Its channel-specific content must be supplied by the angular-momentum ledger, photon Gate B, the massive-vector corridor model, or the spin-statistics proof as appropriate.

9. **Project back to observer-level outputs**
Compute spectra, cross-sections, rates, and timing in standard variables.
Accept mapping only if closure targets from Step 2 are recovered within validated limits.

#### Detailed Scenario A: Bremsstrahlung Channel

Observer channel: $e^\pm + Z \rightarrow e^\pm + Z + \gamma$.

Step map:
1. Incoming charged assembly follows a deflected trajectory in target potential.
2. Deflection induces wake-strain concentration in local Noether sea coupling, with received forcing sharpened or diluted by the branch Jacobian during the scattering history.
3. If wake-strain crosses planar-mode threshold, a photon mode nucleates as a coaxial contra-rotating pro/anti planar pair.
4. If not crossed, energy stays in non-radiative channels (heating/collective excitation).
5. Event closure requires recoil plus emitted-photon momentum balance at vertex level.
6. Observer-level result must recover standard $d\sigma/dk$ with screening/form-factor corrections in the validated regime.

Minimum closure equations:

$$
e^\pm + Z \rightarrow e^\pm + Z + \gamma
$$

$$
p^\mu_{e,\mathrm{in}} + p^\mu_{Z,\mathrm{in}} = p^\mu_{e,\mathrm{out}} + p^\mu_{Z,\mathrm{out}} + k^\mu_{\gamma}
$$

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}
$$

$$
\left(\frac{d\sigma}{dk}\right)_{\mathrm{map}} \rightarrow \left(\frac{d\sigma}{dk}\right)_{\mathrm{std}}
\quad \text{(validated limit)}
$$

#### Detailed Scenario B: Synchrotron Emission and Pair-Loaded Loop

Observer channels:
- effective emission: $e^\pm + B \rightarrow e^\pm + \gamma_{\mathrm{syn}}$,
- pair channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Directional magnetic state $B$ is represented as observer shorthand for the effective Noether sea anisotropy/vorticity map $\mathcal{V}_{\mathrm{NS}}$ together with the delayed branch geometry and Jacobian weighting that generate observer-level transverse forcing.
2. Curved charged-assembly transport drives repeated planar-mode opportunities.
3. Emitted photons propagate and may enter pair threshold windows in dense radiation zones.
4. Pair nucleation relocks local substrate content into $e^+e^-$ assemblies with provenance updates.
5. New pairs re-enter emission transport, closing the cascade loop.
6. Observer-level closures required:
- pair threshold $s \ge 4m_e^2$,
- Breit-Wheeler rate-limit recovery,
- synchrotron cooling/polarization recovery in weak-gravity Lorentzian limits.

Minimum closure equations:

$$
P_{\mathrm{syn}}=\frac{4}{3}\sigma_T c\,U_B\,\gamma^2,
\qquad
U_B=\frac{B^2}{8\pi}
$$

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

$$
s=(k_1+k_2)^2 \ge 4m_e^2
$$

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

#### Detailed Scenario C: Pair Production as Standalone Conversion

Observer channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Two photon modes, each modeled as a coaxial contra-rotating pro/anti planar pair, enter overlap geometry with center-of-momentum invariant $s$.
2. Threshold gate: channel allowed only for $s \ge 4m_e^2$.
3. Above threshold, local substrate relock recruits Noether swarm content into charged pair assemblies.
4. Provenance ledger records conversion path from incoming photon modes plus recruited substrate pool.
5. Projected observer-level rate must match Breit-Wheeler behavior in validated regimes.

Minimum closure equations:

$$
\gamma + \gamma \rightarrow e^+ + e^-
$$

$$
s=(k_1+k_2)^2=2E_1E_2(1-\cos\theta)\ge 4m_e^2
$$

$$
k_1^\mu+k_2^\mu=p^\mu_{e^-}+p^\mu_{e^+}
$$

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

#### Detailed Scenario D: Weak-Channel Transition (Terminology Boundary)

Observer examples: low-energy beta-process channels using $W^\pm$ exchange language.

Step map:
1. Use standard weak-interaction observer equations and couplings.
2. At ontology layer, reserve corridor-mode terminology for weak-channel lock bookkeeping only.
3. Do not reuse corridor-mode terms for photon channels.
4. Accept mapping only if weak-channel rates and branching behavior remain consistent with validated limits.

Minimum closure equations:

$$
\text{Use standard weak-channel amplitudes/rates:}\quad \mathcal{M}_{\mathrm{map}} \rightarrow \mathcal{M}_{\mathrm{SM}}
\quad \text{(validated limit)}
$$

$$
\Gamma_{\mathrm{map}} \rightarrow \Gamma_{\mathrm{SM}},
\qquad
\mathrm{BR}_{\mathrm{map}} \rightarrow \mathrm{BR}_{\mathrm{PDG}}
$$

For weak-channel rows that report a mass, width, branching fraction, lifetime, or mixing entry, the observer-facing comparison must keep the published uncertainty convention as part of the target. A compact residual is

$$
\mathcal R_{\mathrm{weak}}
=
C_{\mathrm{weak}}^{-1/2}
\left(
\mathbf y_{\mathrm{PDG}}
-
\mathbf y_{\mathrm{map}}
\right),
$$

where $\mathbf y_{\mathrm{PDG}}$ may include $M_W$, $\Gamma_W$, $M_Z$, $\Gamma_Z$, weak mixing angles, CKM entries, PMNS entries, lifetimes, or branching fractions, and $C_{\mathrm{weak}}$ is the declared covariance or uncertainty rule for those rows. If a row is an upper limit, an asymmetric uncertainty, or a result with separated statistical and systematic errors, the channel must preserve that convention instead of converting it into an unmarked symmetric error.

For low-energy charged weak processes the same mapping must also recover the contracted current-current limit
$$
\mathcal{L}_{\mathrm{map}}^{\mathrm{low}}
\rightarrow
-\frac{4G_F}{\sqrt 2}\,J_+^\mu J^-_\mu,
$$
with $G_F$ supplied by the electroweak corridor scale rather than by an independent contact parameter. This keeps corridor-mode bookkeeping tied to measured beta-reaction and muon-reaction limits (SM labels: `beta decay`, `muon decay`) while leaving the finite $W^\pm$ channel as the higher-energy provenance record.

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}},
\qquad
\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}
$$

#### Practical Authoring Rule for `reactions/*.md`

Each reaction chapter should include three short blocks:
- `Core Channels (Inclusion Rule)` using `BR > 1%` where PDG branching exists or `>1% contribution` where transport dominance is the relevant criterion.
- $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel using the stepwise map above.
- `Observer-Level Closure Checks` listing thresholds/rates/conservation/timing gates that keep mapping scientifically constrained.

### Core Terms

- **Mode-lock event:** generic lock-in transition where transport energy is reorganized into a stable propagating or bound assembly mode.
- **Wake-strain threshold:** local trigger condition where trajectory forcing and Noether sea state exceed stability boundary for a mode-lock event.
- **Nucleation:** formation of a stable assembly mode from local substrate reconfiguration, with conservation/provenance bookkeeping.

### Channel-Specific Terms

- **Planar-mode nucleation:** photon-channel lock-in language for forming a coaxial contra-rotating pro/anti planar-pair mode. Use for electromagnetic radiation channels (for example synchrotron, bremsstrahlung) unless a chapter justifies another term. The term carries Gate A kinematic closure and Gate B transverse-ledger closure, but those closures should be tested separately.
- **Corridor-mode nucleation:** weak-channel language reserved for $W^\pm/Z$ interaction contexts.
- **Pair nucleation:** $\gamma\gamma \rightarrow e^+e^-$ language at ontology level; must map to standard threshold/rate constraints in validated limits.

### Usage Rules

- Use `mode-lock event` when speaking generically across channels.
- Use `planar-mode` for photon emission in reaction chapters.
- Reserve `corridor` wording for weak channels to avoid semantic leakage into EM chapters.
- When a chapter uses provisional ontology terms, it must also state the observer-level mapping target (threshold, cross-section, timing).

### Mapping Discipline

- Ontology language cannot replace observer-level closure tests.
- Any provisional map must preserve:
  - reaction thresholds,
  - validated rate limits,
  - conservation laws,
  - explicit frame/timing conventions.

If these are not maintained, standard QED/SM transport language is authoritative for that regime.

### Related Chapters

- [Gauge Structure Emergence](../../../../markdown/aaa/interactions/gauge-structure-emergence.md)
- [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md)
- [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md)
- [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md)

## Bremsstrahlung

Bremsstrahlung ("braking radiation") is electromagnetic emission generated when a charged particle is accelerated by another charge, typically an electron deflected by an ion or nucleus. Because the acceleration history spans many scattering angles and impact parameters, bremsstrahlung produces a broad continuum rather than a line spectrum. In practice it is a core process in nuclear and particle experiments, hot-plasma diagnostics, and high-energy astrophysical source modeling.

### Teaching Path

This chapter is organized in three layers:

1. **Standard baseline:** what is already established (mechanism, emissivity, scaling laws).
2. **Radiation inheritance:** how the channel specializes the shared closure-residual routing in [Radiation](../../../../markdown/aaa/reactions/radiation.md).
3. **$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping layer:** how the same observables are re-expressed in assembly-language terms.

Read left-to-right as: baseline physics $\rightarrow$ shared radiation routing $\rightarrow$ channel-specific ontology mapping.

Terminology in this chapter follows [mode-taxonomy.md](../../../../markdown/aaa/interactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

### Notation Snapshot

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

### Physical Mechanism

In a Coulomb encounter, the projectile momentum changes by $\Delta \mathbf{p}$, and this acceleration drives radiation. For electron-ion bremsstrahlung, emitted power increases with target charge and projectile energy, while spectral shape is set by scattering kinematics, screening, and medium optical depth.

At low photon energies, multiple small-angle encounters contribute strongly and infrared-safe observables require inclusive treatment. At high energies, relativistic corrections, recoil, and quantum suppression effects become important.

### Prerequisites (Minimal)

- Photon assembly ontology (planar-mode nested shell swarm language at micro level).
- Shared radiation routing in [Radiation](../../../../markdown/aaa/reactions/radiation.md).
- Master Equation state-transition framework (emissive vs non-emissive microstates).
- Emergent metric/geodesic transport framework (observer-level propagation and lensing).
- Absolute-time to proper-time conversion rules used for rate equations.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Micro-Physical Derivation (Interpretive Map)

Status convention used below:

- **Baseline:** established standard-physics relation retained unchanged.
- **Provisional map:** working $\mathbb{A}\mathbb{A}\mathbb{A}$ parameterization pending derivation.

#### Radiation Inheritance

Bremsstrahlung is the charged-assembly deceleration specialization of the shared radiation program in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The standard phrase "acceleration drives radiation" remains the observer-level baseline. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ map, the channel-specific claim is narrower: the target encounter changes the electron assembly's transport state quickly enough to create a closure mismatch, and only the portion of that mismatch routed through the photon basin becomes planar-mode output.

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

#### Wake Shock Definition (Channel Specialization)

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

#### Provisional Effective Parameterization (Pending Derivation)

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

#### Emergence of Radiation from Assembly Dynamics

This section states the mechanism-level emergence claim explicitly:

1. **Mechanism:** deceleration-driven internal reconfiguration in the electron assembly produces a closure mismatch $\mathcal{R}_{\Theta}^{\mathrm{br}}$ and excitation energy $E_{\text{exc}}^{\mathrm{br}}$; if the inherited planar-mode threshold is crossed, a planar mode is nucleated and propagates as a photon assembly.
2. **Microstate mapping:** non-emissive states satisfy $\mathcal{I}_e < \mathcal{I}_{\mathrm{crit}}$; emissive states satisfy $\mathcal{I}_e \ge \mathcal{I}_{\mathrm{crit}}$ and admit planar-mode nucleation probability $P_{\mathrm{nuc}}>0$.
3. **Classical-limit recovery:** for many emissions over smooth trajectories, coarse-grained power recovers the standard acceleration-radiation scaling (Larmor/Lienard class) in weak-coupling validated regimes.
4. **Declared breakdown regime:** near unresolved ultra-strong-field or ultra-high-energy domains, this effective mapping is not assumed complete and requires direct Master Equation treatment.

### Core Equations (Observer-Level Baselines)

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

#### Shock-Cooling Ledger in Outflows

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

### Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^- + Z \rightarrow e^- + Z + \gamma$ (electron-ion/nuclear bremsstrahlung baseline channel).
- $e^+ + Z \rightarrow e^+ + Z + \gamma$ (positron analog in mixed plasmas/beams).
- Thermal free-free ensemble channel (many-event superposition governing continuum emissivity).

Associated pair/Compton channels are included when they exceed the same contribution threshold in the modeled zone.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Bremsstrahlung channel:** target-induced deceleration drives the inherited closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$; above the planar-mode threshold, photon mode nucleation carries emitted energy-momentum.
- **Positron analog:** same wake-threshold logic with sign-reversed charge trajectory in observer-level kinematics.
- **Thermal ensemble:** macroscopic free-free emissivity is the aggregate of many local planar-mode nucleation events under screened Coulomb transport.

### Shared Photon Event Record

Use the same photon-channel event record here as in [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md) and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). A bremsstrahlung planar-mode event should record:

- incoming and outgoing charged assembly identity, momentum, and path-history provenance;
- target assembly identity, recoil term, and coherent or resolved geometry regime;
- local Noether sea state variables $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, excitation state, and relevant causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$, excitation energy $E_{\text{exc}}^{\mathrm{br}}$, and wake-strain or shock-intensity status relative to the planar-mode threshold;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon Gate B event residual, including source depletion, recoil, causal-wake, accepted/rejected handoff, helicity, and balance rows;
- causal-wake ledger and identity-routing fields from the shared radiation schema, so photon output is not treated as a source of new substrate identities;
- residual medium excitation $\Delta E_{\mathrm{med}}$ and any non-radiative channel that receives sub-threshold energy.

This record is a derivation target. It should recover standard $d\sigma/dk$, screening, form-factor, and emissivity limits before any Noether sea-dependent deviation is treated as physical. The polarization basis and transverse angular-momentum ledger are photon Gate B handoffs from [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md); this chapter records emission provenance, not photon spin closure.

### IR Regularization as a Stability Floor

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

### $Z^2$ Scaling and Finite-Geometry Resolution

The leading $Z^2$ behavior follows coherent target-charge action at large impact parameter and low momentum transfer. At sufficiently small impact parameter $b$ (high $q$), the projectile resolves finite target geometry and coherence drops.

- **Coherent regime ($b \gg R_{\mathrm{nuc}}$):** interaction with aggregate nuclear charge; power tracks $\propto Z^2$.
- **Incoherent-resolution regime ($b \lesssim R_{\mathrm{nuc}}$):** interaction resolves constituent proton assemblies; scaling moves toward $\propto Z$ with suppression encoded by nuclear form factor $F(q^2)$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping, finite geometry is explicitly the spatial distribution of proton nested shell swarms in the nucleus. Deviation from pure $Z^2$ is therefore the observable transition from coherent whole-assembly wake coupling to resolved sub-assembly coupling, with additional screening from the atomic electron envelope.

A gravity-coupled extension can be written as

$$
\frac{d\sigma}{dk} \propto Z_{\mathrm{eff}}^2 \, |F(q^2)|^2 \, \left[1+\delta_g(r,\Phi)\right],
$$

where $\delta_g$ parameterizes local metric/Noether sea corrections. For standard nuclei in laboratory regimes, $\delta_g$ is expected to be subdominant; the term is retained so compact-object surface applications can be treated in one formalism.

### Momentum-Flux Closure at Emission

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

In validated weak-field bremsstrahlung regimes, $\Delta_{\mathrm{br,pow}}\rightarrow0$ and $\Delta_{\mathrm{br,ang}}(\theta)\rightarrow0$ after screening, recoil, and form-factor corrections are applied through the same event record. The emitted photon ledger must also pass $\Delta_{\gamma,\mathrm{flux}}=0$ from [Radiation](../../../../markdown/aaa/reactions/radiation.md); otherwise a correct-looking photon spectrum has not closed the local energy-momentum route.

### Time Parameterization (Absolute vs Proper Time)

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

### Cosmological Propagation and Redshift Map

For source emissivity at emission redshift $z_{\mathrm{em}}$, the observer-level mapping target is

$$
\epsilon_\nu^{\mathrm{obs}}(z_{\mathrm{obs}}) = (1+z)^{-4}\,\epsilon_{\nu(1+z)}^{\mathrm{ff}}(z_{\mathrm{em}})\,\mathcal{T}(\nu, z_{\mathrm{em}}\to z_{\mathrm{obs}}),
$$

with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$ and $\mathcal{T}$ the transfer factor (absorption/scattering in plasma and any Noether sea-specific opacity).

### Thermal Equilibrium Assumptions in Evolving Noether Sea States

The free-free forms above assume local thermodynamic equilibrium (LTE). In evolving Noether sea states, define

$$
\mathcal{R}_{\mathrm{LTE}} \equiv \frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}.
$$

- **$\mathcal{R}_{\mathrm{LTE}} \ll 1$:** assembly-medium coupling is fast, LTE emissivity is valid with instantaneous state variables.
- **$\mathcal{R}_{\mathrm{LTE}} \gtrsim 1$:** non-equilibrium corrections are required; emissivity must be computed from evolving distribution functions rather than a single local $T$.

This ratio provides a diagnostic for when LTE-based closure is expected to hold.

### Geodesics and Lensing Consistency

Bremsstrahlung photons, once emitted, are modeled as propagating on null geodesics of the emergent metric:

$$
ds^2 = 0,\qquad k^\mu \nabla_\mu k^\nu = 0.
$$

This keeps transport treatment aligned with the same geometric sector used across the spacetime mapping.

### Photon Ontology Note

In $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, the photon is fundamentally a coaxial contra-rotating pro/anti planar pair assembly propagating through the Noether sea. The language of "field quanta" and effectively continuous emission is retained as a coarse-grained description over many discrete planar-mode nucleation events. In this file, $\mathbf{p}_{\gamma}$ denotes momentum of that discrete assembly object at micro level, while standard QED field language is used for observer-level rates and spectra.

Event-level provenance for cosmology-facing use is tracked in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

### Regime Map

- **Thermal bremsstrahlung (free-free):** hot plasmas, continuum X-ray backgrounds, cluster gas.
- **Non-thermal bremsstrahlung:** energetic electron populations in shocks, jets, and dense targets.
- **Thin target:** particles radiate while largely retaining energy; spectrum follows injected particle distribution.
- **Thick target:** repeated interactions strongly cool particles; emergent spectrum encodes transport and stopping depth.

### Observable Consequences

- Broadband continuum from X-ray to gamma-ray, often with weak line structure superposed from other processes.
- Cooling-channel competition with synchrotron, inverse Compton, and adiabatic losses.
- Diagnostics of density and composition through normalization $\propto Z^2 n_e n_i$.
- Background channel in detector and beamline environments, especially with high-$Z$ materials.

### Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

In standard plasma and astrophysical modeling, bremsstrahlung is treated as a local radiative process inside a given source geometry and transport model. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same reaction physics is retained at network level, while interpretation changes at background level: bremsstrahlung constrains how assembly transport, compression, and outflow map to observable photon continua.

## Synchrotron Cascades

Synchrotron cascades are coupled electromagnetic processes in which relativistic charged particles radiate synchrotron photons in magnetic fields, and those photons then trigger secondary channels such as pair production and further radiation. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

### Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics.

Terminology in this chapter follows [mode-taxonomy.md](../../../../markdown/aaa/interactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

### Notation Snapshot

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

### Physical Mechanism

A relativistic electron or positron with Lorentz factor $\gamma$ moving in magnetic field $B$ emits synchrotron radiation with characteristic frequency scaling as $\nu_c \propto \gamma^2 B$. If emitted photons are energetic enough and target photons or fields are dense enough, pair production channels open; the new pairs then radiate again, building a multi-generation cascade.

Cascade development is controlled by competition among radiative cooling, pair production, advection, and escape. In compact high-field zones, this feedback can strongly increase pair loading and opacity.

This is the observer-level mechanism. The $\mathbb{A}\mathbb{A}\mathbb{A}$ layer below does not replace these formulas; it asks which Noether swarm velocity deformation, anisotropic Noether sea state, and closure residual must be present for the same photon output to occur.

### Core Equations

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

#### Spectral Shape and Cooling Breaks

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

### Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^\pm + B \rightarrow e^\pm + \gamma_{\mathrm{syn}}$ (effective synchrotron emission channel).
- $\gamma + \gamma \rightarrow e^+ + e^-$ (Breit-Wheeler two-photon interaction / photon-photon pair-production channel in dense radiation fields, distinct from Schwinger vacuum pair production).
- Secondary-loop channel: newly produced $e^\pm$ re-enter synchrotron emission, closing the cascade.

Secondary channels below the 1% contribution level are treated as corrections unless a specific regime elevates them.
This 1% threshold is a modeling convention for cascade tractability, not a fundamental physics cutoff. Subdominant channels (for example, triplet pair production $e^\pm + \gamma \rightarrow e^\pm + e^+ + e^-$, relevant in strong magnetic fields) may be included in detailed transport codes but are omitted here for pedagogical focus.

### Radiation Inheritance

Synchrotron emission is the curved charged-assembly transport specialization of the shared radiation program in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The standard phrase "a magnetic field bends a relativistic charge and the charge radiates" remains the observer-level baseline. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ map, the channel-specific claim is narrower: anisotropic Noether sea transport and gradient forcing deform the moving Noether swarm faster than its internal closure ledgers can retune, leaving a residual that may enter the planar-mode basin.

The inherited skeleton is

$$
\text{Noether swarm velocity deformation in anisotropic Noether sea transport}
\longrightarrow
\text{synchrotron closure residual}
\longrightarrow
\text{wake-strain threshold}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual internal energy, or pair-channel handoff}.
$$

The radiation page writes the retuned transport state as $\mathbf{V}$. In this channel, $\mathbf{V}$ is the Noether swarm velocity-deformation state of the charged assembly during curved transport through $\mathcal{V}_{\mathrm{NS}}$. A channel-local closure mismatch can therefore be written as the derivation target

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
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t);
\mathcal{V}_{\mathrm{NS}},
G_{\text{grad}},
\mathbf{V}_{\text{curved}}
\right).
$$

Here $\Gamma_{e^\pm}(t)$ is the charged assembly microstate; $\mathcal{C}_{o'j}(t)$ and $J_{o'j}$ are the active causal-root and Jacobian data; $\mathcal{V}_{\mathrm{NS}}$ is the anisotropic Noether sea state provisionally mapped to the observer-level $B$ field; and $G_{\text{grad}}$ records the gradient forcing that skews delay loops. This equation is not a derivation of synchrotron radiation. It names the residual functional that must later recover the validated frequency, power, cooling-break, and polarization limits.

The planar-mode gate is inherited from [Radiation](../../../../markdown/aaa/reactions/radiation.md):

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

The wake-strain threshold is therefore the channel's local expression of the planar-mode basin boundary. If the residual is sub-threshold, the event must route energy into medium excitation, recoil, or residual internal energy rather than silently declaring a missing photon. If the threshold is crossed, the emitted photon must still satisfy the standard synchrotron scaling target

$$
\nu_{\gamma}^{\mathrm{out}}
\longrightarrow
\nu_c
=
\frac{3}{2}\gamma^2\frac{eB_{\mathrm{eff}}}{2\pi m_e c}\sin\alpha
$$

in weak homogeneous limits, with $B_{\mathrm{eff}}$ the observer-level magnetic amplitude reconstructed from $\mathcal{V}_{\mathrm{NS}}$. The $\gamma^2B$ scaling must come from the coupled velocity-deformation and anisotropic-state map, not from tuning $\mathcal{S}_{\gamma,*}$ after the fact.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Synchrotron emission channel:** curved charged-assembly transport through an anisotropic Noether sea state produces $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ by Noether swarm velocity deformation and gradient forcing. If the inherited planar-mode threshold is crossed, the event nucleates [photon assemblies](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) from interaction energy / wake stress while conserving charged-assembly identity. The photon-side target is the canonical **coaxial contra-rotating pro/anti planar pair** description.
- **Pair channel:** two-photon overlap, with each photon treated as a coaxial contra-rotating pro/anti planar pair, associates local substrate content into a charged $e^+e^-$ assembly pair; this association must strictly conserve net architrino count and charge of participating assemblies (photons + neutral Noether sea swarms $\rightarrow e^+ + e^-$), with provenance and conservation bookkeeping explicit.
- **Cascade loop:** repeated emission-pair-emission cycles are modeled as repeated mode-lock events under the same observer-level thresholds.

### Shared Photon Event Record

Use the same photon-channel event record here as in [Radiation](../../../../markdown/aaa/reactions/radiation.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). A synchrotron planar-mode event should record:

- charged assembly identity, energy, momentum, pitch geometry, and path-history provenance before and after the curved transport segment;
- Noether swarm velocity-deformation state, effective magnetic-state map $\mathcal{V}_{\mathrm{NS}}$, gradient forcing $G_{\text{grad}}$, and local Noether sea variables $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, excitation state, and causal-branch Jacobian data;
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
\mathcal Q\in\{E,\mathbf p,\mathbf J\}.
$$

Pair-production cascade vertices close the incoming photon ledger and then recruit identity-routed charged-assembly content from the named target or Noether sea reservoir; they do not treat photon energy alone as an identity source.

This record is a derivation target. It must recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, standard polarization limits, and Breit-Wheeler behavior in validated regimes before any Noether sea-dependent deviation is treated as physical. The polarization basis, transverse angular-momentum ledger, and linear-polarization limits are photon Gate B consumers from [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), not a local derivation of photon helicity.

### Observer-Level Closure Checks

- Pair threshold closure: enforce $s = (k_1+k_2)^2 \ge 4m_e^2c^4$ for $\gamma\gamma \rightarrow e^+e^-$, where $k^\mu_i$ are photon 4-momenta. In the head-on collision frame this reduces to $E_1 E_2 \ge (m_e c^2)^2$; for general angle $\theta_{12}$ between photon directions, $E_1 E_2 (1-\cos\theta_{12}) \ge 2(m_e c^2)^2$. Breit-Wheeler cross-section peak occurs at $s \sim 10 m_e^2 c^4$ and must be reproduced in validated cascade limits.
- Frequency closure: recover $\nu_c = (3/2)\gamma^2(eB/2\pi m_e c)\sin\alpha$ and the ensemble scaling $\nu_c\propto\gamma^2B$ in uniform-field, weak homogeneous limits.
- Jet-shock polarization closure: in resolved AGN or microquasar working surfaces, shock compression should rotate the observer-level synchrotron polarization basis consistently with the effective $B_{\mathrm{eff}}$ geometry inferred from $\mathcal{V}_{\mathrm{NS}}$. For a declared knot or hot-spot region $K$, a useful residual is
$$
\Delta_{\mathrm{pol}}^{K}
=
\left\langle
\sin^2\!\left[
\psi_{\mathrm{syn}}(\mathbf{x})
-
\psi_{B,\mathrm{eff}}^{\perp}(\mathbf{x})
\right]
\right\rangle_{\mathbf{x}\in K}^{1/2},
$$
where $\psi_{\mathrm{syn}}$ is the synthetic linear-polarization angle and $\psi_{B,\mathrm{eff}}^{\perp}$ is the projected field-compression basis expected for the observer-level shock model. The target is not a new free-photon polarization proof; it is a source-scale Gate B consumer. Persistent knot-scale misalignment after Faraday rotation, beam averaging, and turbulent depolarization are accounted for would falsify the directional $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map in that regime.
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
\right],
$$

and the total-power target

$$
P_{\perp,\mathrm{std}}
=
\frac{q^2\gamma^4\|\mathbf{a}_\perp\|^2}{6\pi\epsilon_0c^3}.
$$

The channel residual is

$$
\Delta_{\mathrm{syn,rad}}
=
\left(
\frac{P_{\mathrm{map}}}{P_{\perp,\mathrm{std}}}-1,
\frac{\nu_{\gamma}^{\mathrm{out}}}{\nu_c}-1,
\Delta_{\gamma,\mathrm{flux}}
\right),
$$

with $\Delta_{\gamma,\mathrm{flux}}$ inherited from [Radiation](../../../../markdown/aaa/reactions/radiation.md). In validated weak homogeneous limits, all components must tend to zero without retuning the $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map.
- Rate closure: recover standard synchrotron and Breit-Wheeler limits in validated regimes.
- Timing closure: in weak-gravity astrophysical limits, $\Gamma_{\mathrm{eff}} \rightarrow \gamma_{\mathrm{SR}}$ so cooling breaks are preserved. This is an effective closure target for the clock law, not an assumption that substrate time is observer proper time.
- Polarization closure: recover observer-level synchrotron polarization geometry from directional $B$ mapping; in uniform-field limits, failure to recover linear polarization fractions $\Pi \approx 70\%-75\%$ falsifies the geometric mapping (Rybicki and Lightman 1979, Sec. 6.3; observational confirmation in radio pulsars and synchrotron nebulae typically shows $\Pi_{\mathrm{obs}} \sim 0.3$-0.7 after depolarization from field disorder and Faraday rotation).

### Regime Map

- **Weak-cascade regime:** synchrotron emission present but pair feedback limited; spectrum tracks injected particles.
- **Pair-loaded regime:** secondary pairs significantly modify emissivity and opacity.
- **Fast-cooling regime:** synchrotron cooling timescale is shorter than the dynamical/escape timescale, $\tau_{\mathrm{syn}} < \tau_{\mathrm{esc}}$, so high-energy particles cool before escape.
- **Escape-dominated regime:** particles or photons leave the zone before deep cascade development.

### Observable Consequences

- Broadband non-thermal continua with curvature and breaks tied to cooling and escape scales.
- Polarization signatures tracing magnetic-field geometry and turbulence level.
- Pair-opacity features and spectral softening at high energies in compact sources.
- Strong coupling to inverse Compton and bremsstrahlung channels in dense radiation or matter environments.

#### Jet and Outflow Source Benchmarks

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
\right),
$$

where $I_{\nu}^{\mathrm{syn}}$ and $I_{\nu}^{\mathrm{IC}}$ are the synthetic synchrotron and inverse-Compton maps, $\Pi_{\nu}$ and $\psi_{\nu}$ are the linear-polarization fraction and angle, $\nu_{\mathrm{br}}$ is the cooling-break frequency, and $\Delta_{\mathrm{pol}}^{K}$ is evaluated on knots or shock-compressed regions. A source model passes this benchmark only if the same electron transport, $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ map, and photon event ledger recover both the radio synchrotron and X-ray inverse-Compton morphology without separately tuning the field map for each band.

This source packet also disciplines composition claims. The observed synchrotron continuum proves the presence of relativistic charged leptons and an ordered effective magnetic component, but it does not by itself decide whether the bulk jet is electron-proton, electron-positron, or mixed. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, composition is therefore a downstream identity-routing and inertia-loading problem, not a result that can be read directly from the synchrotron channel alone.

### Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

Standard high-energy source models treat synchrotron cascades as local plasma-radiation processes governed by magnetic structure, injection spectra, and transport. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same radiative microphysics is retained while interpretation shifts to mapping cascade outputs onto assembly transport and SMBH-local recycling histories.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Mapping (Provisional)

Status convention used below:

- **Baseline:** established relation retained unchanged.
- **Provisional map:** ontology-level working hypothesis pending deeper derivation.
- **Requirement:** compatibility condition for known observables.

#### Provisional Architrino-Level Mapping

This file uses the following provisional mapping targets.

- **Synchrotron emission (provisional):** a charged Noether swarm assembly in curved transport through $\mathcal{V}_{\mathrm{NS}}$ develops a Noether swarm velocity deformation. Gradient forcing $G_{\text{grad}}$ and causal-branch Jacobian bunching can leave $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ after ordinary adiabatic retuning fails; when the associated wake-strain state crosses the inherited planar-mode threshold, a photon assembly nucleates and carries the photon-row share of the source-depletion ledger. Recoil, medium, wake, handoff, and remnant rows close the rest. This nucleation threshold must be derivable from wake-strain eigenvalue conditions in simulations; hand-tuning the threshold to match observed $P_{\mathrm{syn}}(\gamma,B)$ or $\nu_c\propto\gamma^2B$ constitutes a fit, not a derivation. The mapping succeeds only if the threshold emerges naturally from the architrino master equation applied to curved charged-assembly trajectories in anisotropic Noether sea states.
- **Magnetic field ontology (provisional mapping):** observer-level $B$ is currently treated as the effective coarse-grained directional (vector/tensor) vorticity-anisotropy state of the Noether sea, $B \leftrightarrow \mathcal{V}_{\mathrm{NS}}$, not as a separate fundamental void field. This is a mapping target, not settled ontology. Charged-assembly curvature is therefore interpreted provisionally as transport through an anisotropic Noether sea state with explicit directionality. In validated limits, this mapping must: (i) derive the effective Lorentz-force law $\mathbf{F}_{\mathrm{eff}} = q(\mathbf{v}/c) \times \mathbf{B}_{\mathrm{eff}}$ from anisotropic Noether sea transport together with the Jacobian-weighted geometry of delayed causal flux, rather than by postulating a primitive cross-product force term; (specifically, show that vorticity-tensor gradients $\partial_i \mathcal{V}^j_{\mathrm{NS}}$ produce perpendicular deflection under boost); (ii) reproduce Maxwell-level electromagnetic-wave propagation (dispersion relation $\omega = ck$ for photon modes in uniform $\mathcal{V}_{\mathrm{NS}}$); (iii) recover synchrotron polarization geometry ($\mathbf{E}_\gamma \perp \mathbf{B}_{\mathrm{eff}}$, $\mathbf{E}_\gamma \perp \mathbf{v}$ in observer frame) from directional emission rules in the Noether sea anisotropy basis, while inheriting photon helicity and analyzer statistics from Gate B rather than deriving them locally. **Falsification criterion:** if simulations with anisotropic Noether sea states fail to produce the factor-of-$\gamma^2$ frequency scaling in $\nu_c$ (tested via swept $B$-field and $\gamma$ at fixed pitch angle), or if polarization vectors misalign with standard geometry by $>15^\circ$ systematically, this magnetic mapping is unresolved or failed and must be replaced by a new Noether sea / assembly response map.
- **Pair production mapping (provisional):** $\gamma+\gamma\rightarrow e^+ + e^-$ is treated as nucleation of charged assemblies from local Noether sea energy-density concentration triggered by overlap of two photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs above threshold, not ex nihilo creation. The incoming photon assemblies supply energy, momentum, and trigger geometry, not new architrino identities; the recruited Noether sea content must supply the identity-routed inventory. The nucleation threshold must map to the standard kinematic condition $s\ge 4m_e^2$, and the effective rate must asymptotically reproduce the Breit-Wheeler cross-section in the relativistic limit used by cascade modeling. Operational constraint: pair-channel cross-section $\sigma_{\gamma\gamma}(s)$ computed from this nucleation picture must reproduce
$$
\sigma_{\gamma\gamma} = \frac{\pi r_e^2}{2}\left(1-\beta^2\right)\left[\left(3-\beta^4\right)\ln\left(\frac{1+\beta}{1-\beta}\right) - 2\beta(2-\beta^2)\right]
$$
(where $\beta = \sqrt{1-4m_e^2c^4/s}$) to within factor-of-2 accuracy across the range $4m_e^2c^4 < s < 100m_e^2c^4$ used in cascade modeling. Deviations larger than this bound would constitute observable new physics and require dedicated experimental tests beyond astrophysical inference.

These mapping targets are ontology-level and must reduce to standard synchrotron/pair-production observables in validated limits.

#### Curvature Convention

In this chapter, "curved transport" means Euclidean-space trajectory curvature of charged assemblies under effective magnetic forcing at substrate level. Observer-level curved-spacetime language is used only as an effective description of transport and timing, not as a replacement for the substrate trajectory picture.

Operationally: compute emissivity and spectra with standard observer-frame equations; interpret underlying trajectory control through the Noether sea anisotropy map when using $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The channel-local curvature object is therefore the Noether swarm velocity deformation along the charged assembly's Euclidean trajectory, together with gradient forcing from $G_{\text{grad}}$ and anisotropy from $\mathcal{V}_{\mathrm{NS}}$. Effective geodesic language may still be used for observer-frame propagation and timing, but it is not the event-level cause of planar-mode nucleation in this chapter. Both descriptions must produce identical observer-frame synchrotron emissivity in weak-gravity zones; distinguishing experiments would require near-horizon synchrotron mapping or laboratory strong-field tests.

#### Conservation Note for Pair Production

This chapter uses the nucleation interpretation (not creation from nothing): pair channels reorganize substrate content into new charged assemblies. In this ontology, each architrino has provenance and identity through path history in absolute time; interaction channels redistribute and relock existing constituents rather than instantiate new substrate entities.

Thus, when this channel says the incoming photons are consumed, it means their free planar-pair ledgers terminate at the vertex and their energy-momentum and Gate B handoffs enter the event record. It does not mean the outgoing $e^+e^-$ worldlines are simply the photon constituents under new labels. The charged-pair inventories must be supplied by identity-routed local substrate content.

Operationally, pair production is modeled as association of neutral local substrate content (Noether sea swarms)[^architrino-count] into a charged $e^+e^-$ assembly pair when incident photon energy and geometry satisfy the pair threshold window. The incoming photon energy supplies the separation and association work required for charged-state lock-in.

The bookkeeping requirement is therefore threefold: identity-routed global architrino conservation, path-history-consistent provenance through reaction channels, and local energy-momentum conservation at the interaction zone.

Any additional dependence of pair yield on local Noether sea state beyond standard kinematic threshold conditions is treated here as a mapping/simulation goal, not as an asserted observational deviation.

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

### Observer-Frame Transport

For cosmology-facing use, source-frame emissivity must be propagated to observer-frame spectra with explicit redshift and transfer factors:

$$
j_{\nu}^{\mathrm{obs}}(z_{\mathrm{obs}}) = (1+z)^{-3} \, j_{\nu(1+z)}^{\mathrm{em}}(z_{\mathrm{em}})\,\mathcal{T}(\nu,z_{\mathrm{em}}\rightarrow z_{\mathrm{obs}}),
$$

Here $\mathcal{T}(\nu,z_{\mathrm{em}}\rightarrow z_{\mathrm{obs}})$ is the cumulative transfer function including absorption (for example, $e^{-\tau_{\gamma\gamma}(\nu,z)}$ for pair production on extragalactic background light) and any intervening scattering. For nearby sources ($z \ll 1$), $\mathcal{T} \approx 1$.

with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must reduce to conventional transport results used in high-energy astrophysics.

When the path includes plasma or conducting material, the transfer function must carry the same response rows used by [Radiation](../../../../markdown/aaa/reactions/radiation.md). In an effective plasma comparison,

$$
\epsilon_{\mathrm{eff}}(\omega)
\approx
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right),
\qquad
\omega_p^2=\frac{n_{\mathrm{car}}q^2}{m\epsilon_0}.
$$

For $\omega>\omega_p$, the transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2,
$$

while $\omega<\omega_p$ is an evanescent or reflected transport row with $k=i\kappa_{\mathrm{ev}}$ rather than a lost photon ledger. Absorbing conductors use $k=k_1+ik_2$ and add an attenuation factor schematically of the form

$$
\mathcal{T}_{\mathrm{abs}}(\omega)
=
\exp\!\left[-2\int_{\mathrm{path}}k_2(\omega,s)\,ds\right].
$$

If $\epsilon_{\mathrm{eff}}(\omega)=0$ produces a longitudinal plasma oscillation, the cascade record routes it into medium excitation or plasmon-like content. It is not counted as a free photon branch and it cannot repair a failed Gate B no-longitudinal-mode check.

#### Absolute-Time vs Proper-Time Bookkeeping (Provisional)

In this file, $\tau_{\mathrm{syn}}$ is the observer-frame cooling timescale:

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}} \approx \frac{6\pi m_e c}{\sigma_T B^2\gamma}.
$$

For ontology-level bookkeeping, use the conversion

$$
dt = \Gamma_{\mathrm{eff}}(v,\rho_{\text{NS}},n,\Phi)\,d\tau_{\mathrm{asm}},
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

Here $\Gamma_{\mathrm{eff}}\approx\gamma$ is a placeholder SR-limit surrogate for dimensional illustration only, not a derived $\mathbb{A}\mathbb{A}\mathbb{A}$ relation. In all validated astrophysical regimes (AGN jets, pulsar wind nebulae, GRB afterglows), $\Gamma_{\mathrm{eff}}$ must reproduce the standard Lorentz factor $\gamma_{\mathrm{SR}}$ to within observational uncertainties on cooling breaks ($\lesssim 10\%$ for well-sampled SEDs). Any deviation is confined to untested extreme environments (for example, within $r \lesssim 3r_g$ of supermassive black holes, or $\rho_{\text{NS}} \gg \rho_{\mathrm{nuclear}}$) and requires explicit simulation bounds showing no conflict with validated-regime data.

Propagation and timing conventions must remain explicit in cosmology-facing use.

### Anticipated Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Derive the synchrotron wake-strain threshold and $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ from Noether swarm velocity deformation, $G_{\text{grad}}$, causal-branch Jacobians, and $\mathcal{V}_{\mathrm{NS}}$.
- Map pair-loading predictions to assembly-density and outflow-structure variables without changing QED/QED-like reaction channels.
- Quantify joint regimes where synchrotron cascades and bremsstrahlung together set the photon bath relevant to nucleation-era mapping.
- Bound acceptable parameter freedom in provisional mapping variables so parsimony does not degrade relative to standard transport models.

### Explanatory Gain (Provisional)

This mapping aims at mechanistic compression across channels:

- One substrate language for synchrotron, pair production, and bremsstrahlung as wake/assembly transport outcomes.
- A single timing-conversion layer for rate equations (`observer` vs `assembly` clocks) used consistently in simulation bookkeeping.
- A testable mapping hypothesis that pair-loading boundaries depend on local Noether sea state variables ($\rho_{\text{NS}}$, $n$, anisotropy) in addition to standard observer-level compactness controls.

If future derivations show no measurable deviations in tested regimes, the remaining claim is ontological unification rather than new phenomenology.

### Why Reinterpret (Theory Payoff)

The reinterpretation is justified only if it improves theory structure, not vocabulary. In this chapter the intended payoff is:

- A single substrate mechanism class for radiation channels usually treated separately (synchrotron, pair loading, bremsstrahlung).
- A common conservation/provenance bookkeeping layer for mapping reaction networks into absolute-time assembly simulations.
- A constrained bridge from standard observables to substrate variables, so mapping claims can fail under consistency checks rather than being post-hoc fits.

Cosmology-facing provenance across synchrotron, pair production, bremsstrahlung, BBN photon loading, and CMB thermalization is tracked in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

If derivations show (i) no measurable deviations in any tested regime, (ii) no reduction in parameter count relative to standard plasma/QED models, and (iii) no new consistency constraints that eliminate existing fine-tuning, then the $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation provides only ontological vocabulary change without explanatory gain. In that case, standard transport remains the preferred description for cascade phenomenology, and the $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping is demoted to an optional interpretive layer rather than a foundational claim.

[^architrino-count]: Architrino-count conservation: each recruited Noether sea swarm contributes $(N_{\mathrm{arch}})_{\mathrm{core}}$ architrinos; named swarm content must exactly balance final $e^+ + e^-$ architrino count, and the event record must route the participating identities rather than assigning them to the photon channel. Explicit provenance tracking through pair events is a simulation deliverable, not an assertion in this chapter.
