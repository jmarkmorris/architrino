# Reactions

## Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

For concrete channel applications of this vocabulary, see [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md), and [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md).

### Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

This taxonomy records which channel family a reaction uses; it does not derive the angular-momentum or spin rule for that family. Photon Gate B, weak-corridor vector spin, Pauli/statistics closure, and spin-sensitive measurement outcomes inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and should remain marked as closure targets in reaction prose.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

At assembly level, these terms refer to substrate dynamics in absolute time:

- **Mode-lock event:** a discrete stability transition where a driven nested shell braid/wake configuration settles into an allowed propagating or bound mode.
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

#### Hybrid Standard Model Routing

A Standard Model comparison row must name which effective layer supplies the observer-level prediction. $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction language may then map the provenance and assembly changes, but it may not replace the validated Standard Model source lane with an unmarked substrate story.

| Channel use | Observer-level source lane | Required matching record |
| --- | --- | --- |
| Short-distance electroweak or collider channel | Renormalized perturbative chiral-gauge chart, with declared input scheme | Gauge-invariant amplitude or detector-level observable, scheme, order, expansion parameter, and systematic remainder |
| Low-energy weak or nuclear channel | Matched weak effective theory plus QCD or nuclear matrix elements | Operator basis, normalization, CKM/PMNS factor when applicable, matrix-element source, and uncertainty class |
| Hadronic strong channel | QCD calculation, lattice-QCD matrix element, factorization theorem, or validated phenomenological input | Color-singlet operator or infrared-safe observable, scale, scheme, and truncation or lattice-continuum record |
| Pure QED or transport channel | Validated QED, kinetic, or material-response model | Observable definition, medium assumptions, boundary conditions, and error budget |

The reaction row therefore records a Standard Model prediction as a structured object: energy regime, operator or detector functional, matching map, expansion or scaling parameter, remainder estimate, and consistency statements such as gauge invariance, unitarity, positivity, or infrared safety when those are part of the source lane. A finite regulator or fit trend is evidence only after this record states how the regulator is removed, matched, or bounded.

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
\hat{\mathbf{v}}_A=\frac{\mathbf{v}_A}{\|\mathbf{v}_A\|}
$$

A minimal transverse-channel map is
$$
F_{\perp,A}^{i}(t)
=
\Pi_{\perp}^{ij}(A)
\sum_{k}\sum_{t_0\in\mathcal{C}_{Ak}(t)}
W_{Ak}\!\left(t;t_0,\mathcal{V}_{\mathrm{NS}},R_A\right)
\hat r_{Ak,j}(t;t_0)
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
\right)
$$

where the continuity component is

$$
\Delta_{\mathrm{cont}}
\equiv
\partial_t\rho_{\mathrm{eff}}
+
\nabla\cdot\mathbf{J}_{\mathrm{eff}}
$$

and the gauge component requires every observer-level observable $\mathcal O$ used by the channel to obey

$$
\Delta_{\mathrm{gauge}}[\mathcal O,\chi]
\equiv
\mathcal O[A_{\mu}^{\mathrm{eff}}+\partial_\mu\chi]
-
\mathcal O[A_{\mu}^{\mathrm{eff}}]
=0
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
\right)
$$

Here $\Delta_A$ is the photon Gate A residual; $\Delta_Q^\gamma$, $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\parallel}^{\mathrm{sub}}$, $\Delta_{\mathrm{hel}}^\gamma$, and $\Delta_{\epsilon}^{\gamma}$ test the planar-pair substrate, transverse survival, longitudinal exclusion, helicity, and analyzer-basin rows; and $\Delta_{\mathrm{src}}^\gamma$, $\Delta_{\mathrm{recoil}}^\gamma$, $\Delta_{\mathrm{med}}^\gamma$, $\Delta_{\mathrm{wake}}^\gamma$, $\Delta_{\mathrm{handoff}}^\gamma$, $\Delta_{\mathrm{rem}}^\gamma$, and $\Delta_{\mathrm{bal}}^\gamma$ test the source, recoil, medium, causal-wake, analyzer-handoff, remnant, and event-balance rows. A reaction chapter may cite this vector as a bookkeeping contract, not as a derivation of photon polarization.

7. **Execute provenance-conserving relock**
Update assembly graph by relocking existing substrate content.
No ex nihilo creation is permitted in ontology bookkeeping; recruitment comes from local Noether braid availability.

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
2. Deflection induces wake-strain concentration in local Noether sea coupling, with received forcing sharpened or diluted by receiver-normal branch strength during the scattering history.
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
1. Directional magnetic state $B$ is represented as observer shorthand for the effective Noether sea anisotropy/vorticity map $\mathcal{V}_{\mathrm{NS}}$ together with delayed branch geometry, source-normal denominators, and receiver-normal branch strengths that generate observer-level transverse forcing.
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
3. Above threshold, local substrate relock recruits Noether braid content into charged pair assemblies.
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
\right)
$$

where $\mathbf y_{\mathrm{PDG}}$ may include $M_W$, $\Gamma_W$, $M_Z$, $\Gamma_Z$, weak mixing angles, CKM entries, PMNS entries, lifetimes, or branching fractions, and $C_{\mathrm{weak}}$ is the declared covariance or uncertainty rule for those rows. If a row is an upper limit, an asymmetric uncertainty, or a result with separated statistical and systematic errors, the channel must preserve that convention instead of converting it into an unmarked symmetric error.

For low-energy charged weak processes the same mapping must also recover the contracted current-current limit
$$
\mathcal{L}_{\mathrm{map}}^{\mathrm{low}}
\rightarrow
-\frac{4G_F}{\sqrt 2}\,J_+^\mu J^-_\mu
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

- [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md)
- [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md)
- [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md)
- [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md)

## Radiation

Radiation is the $\mathbb{A}\mathbb{A}\mathbb{A}$ workstream for energy shedding by assemblies. A radiative event is not defined merely by acceleration or by the presence of excess energy. It is the routed relaxation of a driven assembly or local Noether sea state into one or more allowed channels: photon output, medium excitation, recoil, residual internal energy, or reaction products. Photon output is described through planar-mode nucleation, while non-radiative channels remain explicit when the available energy does not lock into a stable photon assembly.

The detailed channel pages remain [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), and [Atomic Transition Radiation](../../../../markdown/aaa/reactions/atomic-transition-radiation.md). Photon assembly ontology belongs in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), while channel vocabulary follows [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md). Event-level conservation uses [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), and cosmology-facing radiation provenance is tracked in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

This page is a foundation-up overview. It states the shared mechanism and the closure targets that individual channel pages must specialize. It does not by itself prove blackbody radiation, photon spin, atomic spectra, or QED cross sections.

### Forms At A Glance

In ordinary physics language, radiation can mean electromagnetic light, emitted particles, thermal emission, scattering-shifted photons, or gravitational waves. In $\mathbb{A}\mathbb{A}\mathbb{A}$ those are not one ontology. The first split is between the carrier that leaves or perturbs the event and the source mechanism that produced the outgoing record.

| Form | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading | Boundary discipline |
| --- | --- | --- |
| Photon-channel radiation | Electromagnetic bands such as radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma-ray radiation are photon-channel records with different frequency, energy, source, and path-history ledgers. | The carrier is still the coaxial contra-rotating pro/anti planar pair; the band name is not a separate substrate ontology. |
| Source-specific photon mechanisms | Atomic transition radiation, bremsstrahlung, synchrotron emission, thermal free-free emission, and medium relaxation are different trigger geometries for routing a closure residual into photon output. | Each mechanism must keep its source depletion, recoil, medium, remnant, polarization handoff, and benchmark recovery rows explicit. |
| Thermal or blackbody radiation | A photon bath reaches an ensemble-level detailed-balance limit after repeated emission, capture, scattering, pair-channel exchange, and non-radiative medium exchange. | Blackbody language is stronger than photon emission; it requires ensemble temperature, thermalization depth, and Planck-occupation recovery. |
| Frequency-exchange radiation | Compton-like and Sunyaev-Zeldovich-style processes shift an existing photon packet through a transport exchange row. | A frequency shift is not an unexplained loss or gain; target, medium, recoil, remnant, and thermalization rows must close the ledger. |
| Material routing | Reflection, transmission, absorption, scattering, skin-depth loss, and heating are surface or medium decisions for an incoming photon ledger. | Absorption is not annihilation and reflection is not a hard bounce; energy, momentum, transverse angular momentum, remnant, and heat rows remain in the event record. |
| Reaction-product or particle radiation | Observer-level particle-radiation labels refer to outgoing assemblies or reaction products, sometimes together with photon output. | Non-photon products are not planar-mode photons; they use the reaction provenance ledger and identity-routing rows. |
| Gravitational-wave radiation | Gravitational waves are effective tensor disturbances of the Noether sea and the emergent metric channel, not photon-channel radiation. | This page can name the boundary, but the closure program belongs in [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). |

This overview focuses on photon-channel and radiation-coupled reaction routing. Particle-output and gravitational-wave uses of the word `radiation` should remain discoverable here without being folded into the photon planar-mode ontology.

#### Radioactivity Naming

Radioactivity labels mix carrier names with source mechanisms. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the useful split is:

| Standard label | Carrier or product | Native ledger reading |
| --- | --- | --- |
| Alpha radiation | outgoing helium nucleus | reaction-product routing of a bound nuclear assembly, with recoil and nuclear-remnant rows |
| Beta radiation | outgoing electron or positron plus neutrino-sector product in a beta reaction | weak-corridor reaction provenance, axial-inventory payload, neutrino routing, and recoil |
| Neutron radiation | outgoing neutron assembly | nuclear product routing, not photon-channel radiation |
| Gamma radiation | photon-channel packet from nuclear de-excitation or related high-energy nuclear transition | planar-mode photon output whose source mechanism is nuclear |
| X-ray radiation | photon-channel packet usually sourced by electron-envelope transition, braking, or inner-shell rearrangement | planar-mode photon output whose source mechanism is atomic or charged-particle transport |

Thus gamma rays and X-rays differ mainly by source mechanism and frequency band, not by photon ontology. Alpha, beta, and neutron radiation are outgoing assemblies or reaction products and must use the reaction ledger rather than the photon-only planar-mode record.

### Foundation-Up Mechanism

The foundation-up radiation question is whether rapid transport changes can leave a Noether braid internally mismatched relative to its nearest stable closure class. A moving Noether braid has a velocity-deformed causal envelope, while a gravitational gradient skews its delay loops and phase closure. If a reaction suddenly decelerates the assembly, if curved transport changes too quickly, or if the assembly crosses a sharp Noether sea gradient, the external transport state can change faster than the inner, middle, and outer binary ledgers can adiabatically retune.

The resulting residual is first a closure mismatch, not yet a photon. For layer $a\in\{I,M,O\}$,

$$
\delta\Theta_a
=
\Theta_a(T;\mathbf{V}_{\text{before}},G_{\text{grad}})
-
\Theta_a(T;\mathbf{V}_{\text{after}},G_{\text{grad}})
$$

Here $\Theta_a$ denotes the layer's phase-closure ledger over the comparison interval $T$, $\mathbf{V}$ denotes the transport state being retuned, and $G_{\text{grad}}$ denotes the local gradient data that modifies the delay loops. The notation $\{I,M,O\}$ refers to the same inner, middle, and outer nested shell braid roles that ordered-axis chapters often write as $(H,M,L)$.

A compact residual magnitude can be treated as a derivation target:

$$
\mathcal{R}_{\Theta}
=
\left(\sum_{a\in\{I,M,O\}} w_a\,\delta\Theta_a^2\right)^{1/2},
\qquad
w_a>0
$$

The weights $w_a$ are not free phenomenology in the completed theory. They must be derived from the layer hierarchy, active causal-root branches, and local Noether sea coupling. At this overview level, $\mathcal{R}_{\Theta}$ is only a bookkeeping norm for how far the post-drive assembly has been pushed away from the nearest closure class.

### Closure Residuals

A closure residual becomes radiatively relevant only when it cannot be absorbed by ordinary adiabatic retuning. The useful comparison is between the retuning time of the core and the driving time of the disturbance:

$$
\epsilon_{\text{ad}}
\equiv
\frac{\tau_{\text{retune}}}{\tau_{\text{drive}}}
$$

When $\epsilon_{\text{ad}}\ll 1$, the inner, middle, and outer ledgers remain near their stable return map, and the disturbance appears as smooth transport or small local heating. When $\epsilon_{\text{ad}}\gtrsim 1$, the post-drive state can carry a finite closure residual after the external impulse has passed. Radiation begins only if that residual is routed through an allowed shedding channel.

Astrophysical jets add a useful macroscopic stress test for this same split. A supersonic working surface can create a large closure residual, but the outgoing observer-level channel depends on how quickly the shocked material can cool relative to its propagation time. A compact comparison diagnostic is

$$
\mathcal{R}_{\mathrm{cool}}
\equiv
\frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
\qquad
t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
$$

with an observer-level thermal-plasma estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

Here $v_j$ and $\ell_j$ are the effective jet speed and propagation scale, $T_s$ is the post-shock temperature, and $\Lambda(T_s)$ is the standard cooling function. These variables do not become substrate ontology. They define an observational closure target: when $\mathcal{R}_{\mathrm{cool}}\ll1$, shocked material should route a large fraction of $E_{\text{exc}}$ into thermal line, free-free, and medium-heating rows; when $\mathcal{R}_{\mathrm{cool}}\gg1$, the same shock geometry may remain adiabatic enough for non-thermal acceleration, synchrotron emission, inverse-Compton output, and cocoon/lobe energy storage to dominate. A radiation map that uses the same shock residual for both cases must therefore expose the branch decision rather than treating "shock" as a single radiative outcome.

The residual ledger should track at least four quantities:

| Ledger entry | Required meaning |
| --- | --- |
| $\delta\Theta_a$ | phase-closure mismatch of each nested shell braid layer |
| $\Delta E_{\text{int}}$ | excess internal energy above the nearest stable rung |
| $\Delta \mathbf{p}_{\text{asm}}$ | change in assembly momentum during the drive |
| $\Delta \mathcal{J}_{\text{wake}}$ | angular-momentum and causal-wake ledger imbalance to be closed |

This is the point where the radiation page connects to the Master Equation: the residual must be computed from delayed causal-wake hits and branch Jacobians, rather than appended as a phenomenological "radiation reaction" term. The theorem target is a residual functional

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(\Gamma(t),\mathcal{C}_{o'j}(t),J_{o'j},\rho_{\text{NS}}(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t)\right)
$$

where $\Gamma(t)$ is the assembly microstate and the other inputs are the causal-root, Jacobian, density, and delay data already used elsewhere in the corpus.

The classical point-charge comparison sharpens this requirement. A singular charged source makes the near-field energy formally divergent, so the observed inertial mass cannot be identified with electromagnetic field energy alone without adding a compensating internal term. In $\mathbb{A}\mathbb{A}\mathbb{A}$ language, that pathology is a warning against treating radiation damping as a separate force law attached after the motion has been chosen. The event record must instead expose the finite balance

$$
\mathcal{D}_{\mathrm{rad}}
\equiv
\Delta P^\mu_{\mathrm{asm}}
+
\Delta P^\mu_{\gamma}
+
\Delta P^\mu_{\mathrm{near}}
+
\Delta P^\mu_{\mathrm{wake}}
+
\Delta P^\mu_{\mathrm{mass/rem}}
=0
$$

where $\Delta P^\mu_{\mathrm{near}}$ is the reversible near-field or acceleration-energy comparison row, $\Delta P^\mu_{\mathrm{wake}}$ is the causal-wake branch exchange computed from delayed path-history data, and $\Delta P^\mu_{\mathrm{mass/rem}}$ is the finite internal mass or remnant ledger that prevents electromagnetic self-energy from being mistaken for the whole mass story. A completed radiation-reaction derivation must show that the observer-level damping term is the irreversible part of this conservation residual after the reversible near-field row is separated, not an independently appended self-force.

Classical decompositions that compare outgoing and incoming field pieces can be used only as effective recovery tools. In the corpus notation their role is to test whether the same causal-wake history yields a finite $\mathcal{D}_{\mathrm{rad}}$ when the comparison tube around the source is shrunk. They do not license acausal substrate dynamics: any nonlocal-looking term must be re-expressed as branch accounting over the event window, with delayed path-history provenance and a named residual row for every unmatched energy-momentum component.

### Excitation Basins

If $\delta\Theta_a$ remains within the local basin, the core retunes without a resolved radiative event. If the mismatch crosses a separatrix, the Noether braid enters an internally excited, closure-mismatched, or metastable state above its nearest stable rung. The excess energy is then a state-space gap:

$$
E_{\text{exc}}
=
E_C(\Gamma_{\text{post shock}})
-
E_C(\Gamma_{\text{nearest stable rung}})
$$

An excitation basin is the set of post-drive states that share the same available relaxation routes. The simplest basin classification is:

| Basin | Condition | Radiation meaning |
| --- | --- | --- |
| Retuning basin | $\mathcal{R}_{\Theta}<\mathcal{R}_{\text{retune}}$ | no resolved event; the core returns to the same rung |
| Excited basin | $\mathcal{R}_{\text{retune}}\le\mathcal{R}_{\Theta}<\mathcal{R}_{\gamma}$ | excess energy exists, but stable photon output is not guaranteed |
| Planar-mode basin | $\mathcal{R}_{\Theta}\ge\mathcal{R}_{\gamma}$ with sufficient channel geometry | photon-channel nucleation is allowed |
| Dissociation or reaction basin | closure residual destabilizes assembly identity | energy routes into products, recoil, and medium excitation |

The thresholds in this table are names for proof targets, not asserted universal constants. A completed derivation must compute the relevant separatrices from the local return map of the driven assembly. The same external energy transfer can therefore be radiative in one geometry and non-radiative in another if the basin boundary is different.

### Planar-Mode Nucleation

Photon output is modeled as the lock-in of a coaxial contra-rotating pro/anti planar pair. In the language of [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md), the photon branch is a planar-mode nucleation event: shed energy, wake stress, and Noether sea state jointly cross the stability boundary for a propagating photon assembly.

A minimal nucleation gate can be written as a two-condition target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{NS}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}
$$

Here $\mathcal{S}_{\gamma}$ is the local photon-channel drive, $\mathcal{S}_{\gamma,*}$ is the planar-mode stability boundary, and $E_{\gamma,\min}$ is the minimum stable planar-mode cost if such a floor survives the derivation. This form is only a scaffold. The burden is to derive $\mathcal{S}_{\gamma}$ from wake-strain geometry, causal-root branch data, and Noether sea coupling, then recover the validated limits used by bremsstrahlung, synchrotron emission, atomic transitions, Compton-like scattering, pair channels, and thermal radiation.

Once the planar mode nucleates, the event record must carry the photon Gate A and Gate B data without treating those gates as locally proven. Gate A supplies kinematics and optics: $E_\gamma$, $\mathbf{p}_{\gamma}$, direction, phase frequency, and local photon-channel speed $c_\gamma$. Gate B supplies transverse angular-momentum, polarization, helicity, and capture/rejection ledgers. This radiation overview uses those records as requirements; their proofs remain in the photon and angular-momentum workstreams.

### Non-Radiative Shedding

Radiation is one possible relaxation channel for $E_{\text{exc}}$, not the only one. If the planar-mode gate is not crossed, the residual must still go somewhere. A minimal shedding ledger is

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{rem}}
+
\Delta E_{\text{rxn}}
$$

The pure radiative limit has $\Delta E_{\text{rxn}}=0$. A sub-threshold transport event has $E_\gamma=0$ and routes energy into $\Delta E_{\text{med}}$, $\Delta E_{\text{recoil}}$, or $\Delta E_{\text{rem}}$. A reaction event has nonzero $\Delta E_{\text{rxn}}$ and must use the full reaction provenance ledger.

In weak-coupling comparison limits, the same ledger must also recover the standard rate and scattering normalizations. A finite event window should reduce to
$$
\Gamma_{\mathbb{A}\mathbb{A}\mathbb{A}\to f}
\rightarrow
2\pi\,
\left|\mathcal{M}_{\mathrm{eff}}\right|^2
\rho_f
$$
after unit conventions are declared, with $\rho_f$ the density of accepted final records. For scattering channels, cross sections must be the same transition probability divided by incoming flux and integrated over the outgoing phase-space ledger. Thus amplitudes, decay widths, and cross sections are comparison-layer summaries of one provenance record, not independent event ontologies.

Momentum and angular momentum must close at the same vertex:

$$
\Delta \mathbf{p}_{\text{asm}}
+
\mathbf{p}_{\gamma}
+
\Delta \mathbf{p}_{\text{med}}
+
\Delta \mathbf{p}_{\text{recoil}}
+
\Delta \mathbf{p}_{\text{rxn}}
=
0
$$

The corresponding polarity, architrino-inventory, identity-routing, and path-history ledgers must also close. Non-radiative shedding is therefore not a discard bin. It is the required accounting for medium heating, turbulence, phonon/plasmon-like excitations, unresolved causal-wake stress, recoil, and residual internal excitation when no stable photon assembly leaves the event.

### Path Frequency Exchange

A photon-channel packet can also change frequency during transport without being replaced by a newly emitted photon. In standard comparison language, Compton and Sunyaev-Zeldovich processes are the important calibration family: a photon scatters from an intervening electron population and leaves with a shifted frequency. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a transport exchange row. It belongs between photon propagation and reaction bookkeeping, not under ordinary source emission alone.

For a packet entering a local segment with frequency $\nu^-$ and leaving with frequency $\nu^+$, the event record must close

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{target}}
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

The signs of the $\Delta E$ terms are ledger signs. A frequency boost has $h(\nu^+-\nu^-)>0$ and therefore requires a corresponding loss from the target or medium rows. A frequency depletion requires a named gain in target, medium, recoil, remnant, or thermalization rows. The photon Gate A and Gate B records also persist through the segment: the outgoing packet must retain a valid photon-channel kinematic and polarization handoff, or else the process becomes absorption plus re-emission, pair production, or another reaction channel with a different event record.

This distinction is cosmologically important. A redshift or blueshift accumulated along a path is not an unexplained energy loss or gain if the path-frequency exchange ledger closes. It is also not automatically evidence of geometric expansion. The corresponding cosmology pages must consume this radiation record before promoting redshift-distance, CMB temperature, or SZ/kSZ data products into expansion, dark-energy, or growth claims.

The strong-field version of the same rule occurs near a black-hole horizon interface. A photon-channel packet, or a photon-channel-adjacent mode, may be processed close to the nested shell braid symmetry-breaking threshold, where planar lock and high local energy exchange are part of the strong-field record. Interior segments can blueshift the packet; exterior or transport segments can redshift it; either case remains a frequency-exchange row only while the packet keeps its photon Gate A and Gate B handoffs. If the handoffs fail, the event must be reclassified as capture, re-emission, pair production, medium excitation, or another release-channel reaction.

Curved photon transport adds a transverse version of the same discipline. In ordinary weak lensing, the outgoing path direction changes coherently through the Noether sea response while the photon remains one Gate A/B packet. Let $\hat{\mathbf{k}}(\ell)$ be the path tangent and
$$
\kappa_\gamma(\ell)
=
\left\|
\frac{d\hat{\mathbf{k}}}{d\ell}
\right\|
$$
the Euclidean path-curvature proxy along the transported packet. The coherent-lensing branch requires
$$
E_{\gamma}^{+}
=
E_{\gamma}^{-}
+\Delta E_{\mathrm{path}},
\qquad
\mathbf p_{\gamma}^{+}
=
\mathbf p_{\gamma}^{-}
+\Delta\mathbf p_{\mathrm{sea}}
+\Delta\mathbf p_{\mathrm{recoil}},
$$
with no free-photon identity change. A high-gradient or strong-field candidate may instead open a transverse residual
$$
\mathcal R_{\perp}^{\gamma}
=
\frac{
\left\|
\Delta\mathbf p_{\gamma,\perp}
\right\|
}{
\|\mathbf p_\gamma\|+\varepsilon_p
}
+
\lambda_\kappa
\int_{\Gamma_\gamma}
\kappa_\gamma(\ell)\,d\ell
+
\mathcal R_{\mathrm{GateA/B}}.
$$
This is not a claim that lensing normally emits radiation. It is a branch-selection target: weak lensing should remain coherent photon transport, while any proposed strong transverse acceleration emission must declare the source of the residual, the recoil or medium uptake, and the threshold at which the packet leaves the ordinary lensing class.

**Effective electromagnetic energy-momentum gate.** Standard electromagnetic energy and momentum bookkeeping supplies a useful recovery ledger for radiation, but only at the observer/channel level. The fields $\mathbf{E}_{\mathrm{eff}}$ and $\mathbf{B}_{\mathrm{eff}}$ in this subsection are effective comparison variables reconstructed from the channel map. They are not substrate objects added to the Euclidean void or to the Noether sea.

For a declared standard-limit comparison, define

$$
u_{\mathrm{EM}}
=
\frac{\epsilon_0}{2}\|\mathbf{E}_{\mathrm{eff}}\|^2
+
\frac{1}{2\mu_0}\|\mathbf{B}_{\mathrm{eff}}\|^2,
\qquad
\mathbf{S}_{\mathrm{EM}}
=
\frac{1}{\mu_0}\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}
$$

and

$$
\mathbf{g}_{\mathrm{EM}}
=
\frac{1}{c^2}\mathbf{S}_{\mathrm{EM}}
=
\epsilon_0\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}
$$

The corresponding Maxwell-stress comparison tensor is

$$
\sigma_{\mathrm{EM}}^{ij}
=
\epsilon_0
\left(
\frac{1}{2}\delta^{ij}\|\mathbf{E}_{\mathrm{eff}}\|^2
-
E_{\mathrm{eff}}^iE_{\mathrm{eff}}^j
\right)
+
\frac{1}{\mu_0}
\left(
\frac{1}{2}\delta^{ij}\|\mathbf{B}_{\mathrm{eff}}\|^2
-
B_{\mathrm{eff}}^iB_{\mathrm{eff}}^j
\right)
$$

For a control volume $V$ with outward unit normal $\hat{\mathbf{n}}$, the effective energy residual is

$$
\Delta_E^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V u_{\mathrm{EM}}\,d^3x
+
\int_{\partial V}\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA
+
\int_V\mathbf{J}_{\mathrm{eff}}\cdot\mathbf{E}_{\mathrm{eff}}\,d^3x
$$

The effective Lorentz-force density is

$$
f_{\mathrm{L}}^i
=
\rho_{\mathrm{eff}}E_{\mathrm{eff}}^i
+
\left(\mathbf{J}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}\right)^i
$$

and the momentum residual is

$$
\Delta_{p,i}^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V g_{\mathrm{EM}}^i\,d^3x
+
\int_{\partial V}\sigma_{\mathrm{EM}}^{ij}\hat n_j\,dA
+
\int_V f_{\mathrm{L}}^i\,d^3x
$$

The angular-momentum residual is the corresponding moment of the momentum ledger:

$$
\Delta_{\mathbf{J}}^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V \mathbf{x}\times\mathbf{g}_{\mathrm{EM}}\,d^3x
+
\int_{\partial V}\mathbf{x}\times(\sigma_{\mathrm{EM}}\hat{\mathbf{n}})\,dA
+
\int_V\mathbf{x}\times\mathbf{f}_{\mathrm{L}}\,d^3x
$$

The tensor $\sigma_{\mathrm{EM}}^{ij}$ is symmetric, so this effective comparison ledger carries the standard angular-momentum closure condition. A radiation, scattering, or material-capture event may use this gate only as a benchmark: the $\mathbb{A}\mathbb{A}\mathbb{A}$ event record must still name the source assembly, causal-root history, medium rows, recoil, and identity routing that generate the effective quantities.

For an outgoing photon packet in a far-field comparison zone, the flux version of the Gate A handoff is

$$
\Delta_{\gamma,\mathrm{flux}}
=
\left(
E_\gamma
-
\int_{t_i}^{t_f}\int_{\partial V}
\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA\,dt,
\quad
\mathbf{p}_\gamma
-
\frac{1}{c^2}
\int_{t_i}^{t_f}\int_{\partial V}
(\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}})\hat{\mathbf{n}}\,dA\,dt
\right)
$$

The photon event closes this check only when $\Delta_{\gamma,\mathrm{flux}}=0$ in the declared standard-limit comparison, or when the residual is explicitly routed into material, recoil, remnant, or unresolved wake rows. This is the radiation energy-momentum closure check used by the channel pages.

### Radiation Event-Record Schema

Every resolved radiation, sub-threshold shedding, photon-capture, or radiation-coupled reaction record should use the same event schema. The record is required even when no photon leaves the event; in that case $E_\gamma=0$, the polarization handoff is marked not applicable, and the energy closes through recoil, medium excitation, residual internal energy, or reaction products.

| Required field | Required content | Closure role |
| --- | --- | --- |
| Source assembly | Identity and pre/post state of the driven assembly, photon assembly, or resolved local Noether sea excitation whose residual is being routed | Prevents treating radiation as free energy detached from an assembly or medium source |
| Source depletion row | $\Delta\mathcal Q_{\mathrm{src}}^{0}=\mathcal Q_{\mathrm{src}}^{-}-\mathcal Q_{\mathrm{src}}^{+}$ for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, with the source branch and event window named | Keeps photon output tied to what the driven source lost rather than to an isolated outgoing quantum |
| Trigger geometry | Deceleration, curved transport, gradient crossing, photon overlap, capture geometry, or medium-relaxation geometry, including local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ when they affect the channel | Identifies why this event entered a retuning, excitation, planar-mode, or reaction basin |
| $\delta\Theta_a$ | Phase-closure mismatch for each active layer $a\in\{I,M,O\}$, or an explicit reason the channel uses a reduced assembly ledger | Keeps the event tied to the closure-residual mechanism rather than to acceleration language alone |
| $E_{\text{exc}}$ | Excess internal or medium excitation energy above the nearest stable rung before routing | Supplies the left side of the shedding ledger |
| $E_\gamma$ | Photon energy for each emitted, absorbed, shifted, or captured photon assembly, with $E_\gamma=0$ for non-photon shedding | Carries the Gate A energy-frequency and momentum handoff without proving it locally |
| Recoil | $\Delta E_{\text{recoil}}$, $\Delta \mathbf{p}_{\text{recoil}}$, and the assembly or medium component receiving recoil | Closes local momentum and energy at the event vertex |
| Medium excitation | $\Delta E_{\text{med}}$, $\Delta \mathbf{p}_{\text{med}}$, excitation type, and returned or retained Noether sea content | Prevents unresolved medium heating or turbulence from becoming an implicit loss term |
| Polarization handoff | Gate B acceptance data when $E_\gamma\ne0$: transverse basis, analyzer or transport basis if present, helicity label, accepted/rejected capture channel, and transverse angular-momentum ledger | Records inherited photon Gate B requirements; it is not a local derivation of photon spin |
| Photon Gate B event residual | $\mathcal R_{\gamma B}^{\mathrm{event}}$ or the channel-local equivalent naming source, recoil, medium, wake, handoff, remnant, helicity, and balance rows when $E_\gamma\ne0$ | Prevents a clean transverse ledger from being promoted before the event ledger closes |
| Causal-wake ledger | Source identities, emission times, active causal-root branches, branch Jacobians, path-history provenance, and $\Delta \mathcal{J}_{\text{wake}}$ | Makes deterministic replay and angular-momentum balance depend on delayed wake history |
| Identity routing | Bijection or equivalent route for participating architrino identities after named Noether sea reservoir terms are included | Prevents photon output, causal wakes, or unresolved medium terms from being treated as sources of new substrate identities |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate, with any unresolved Gate A, Gate B, Gate C, reaction, or cosmology handoff named explicitly | Prevents a local channel record from being promoted to completed doctrine before its inherited gates close |

For photon-capture records, $E_\gamma$ names the incoming, outgoing, shifted, or captured photon ledger; it is not an identity source for different outgoing assemblies unless the channel is explicitly a reaction or pair-production record. In those cases, the same schema must add the recruited target or Noether sea inventory to the identity-routing field.

The event-balance lemma used by the schema is the source-depletion identity

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
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

For Gate B, the $\mathcal Q=\mathbf J$ component is the transverse angular-momentum balance. Photon polarization, helicity, and analyzer handoff are therefore not detached labels; they are the photon-side component of one event-window conservation record.

The event-window helicity projection is the $\hat{\mathbf e}$ component of that same balance. Define

$$
\mathbf B_{\gamma}^{0}
=
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
$$

Then

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
=
\frac{
\hat{\mathbf e}\cdot
\left(
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right)
}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

when $\mathbf B_{\gamma}^{0}=\mathbf 0$ and the photon substrate row has no transverse leakage. If the balance defect is nonzero, the projection error is bounded by $\|\mathbf B_{\gamma}^{0}\|/\hbar$.

The common energy closure for the schema is

$$
E_{\text{exc}}
=
E_\gamma
+
\Delta E_{\text{med}}
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{rem}}
+
\Delta E_{\text{rxn}}
$$

Channel pages may add specialized variables, but they should not remove these fields. The polarization handoff remains inherited from photon Gate B; radiation records carry the fields needed by that gate, while the photon-spin and polarization proof remains outside the local radiation event record.

#### Gate C Benchmark Vector

For photon-producing routes, Gate C is the radiation-sector acceptance predicate:

$$
\operatorname{GateC}_{\gamma}(\mathsf e)
=
\operatorname{Ledger}_{\gamma}(\mathsf e)
\wedge
\operatorname{Trans}_{\gamma}(\mathsf e)
\wedge
\operatorname{Bench}_{\gamma}(\mathsf e)
$$

Here $\operatorname{Ledger}_{\gamma}$ requires the event ledger to close after photon output, recoil, remnant, medium update, wake handoff, and provenance rows are included. The transversality row is inherited from photon Gate B:

$$
\operatorname{Trans}_{\gamma}(\mathsf e)
\Longleftrightarrow
\left\|
P_{\parallel,\hat{\mathbf{k}}}
\Pi_{\gamma}\mathcal{L}_A(\mathsf e)
\right\|_{\gamma}
\le
\epsilon_{\gamma,\parallel}
$$

so any longitudinal response must cancel, remain unexposed below tolerance, or route to a material, remnant, medium-bound, or massive-vector channel rather than a free photon.

For a declared benchmark family $b$, the Gate C output should be a normalized residual vector rather than a narrative pass:

$$
\mathbf{R}_{\gamma,b}(\mathsf e)
=
\left(
\frac{\Delta_E}{E_b+\varepsilon},
\frac{\|\Delta_{\mathbf{p}}\|}{p_b+\varepsilon},
\frac{\|\Delta_{\mathbf{J}}\|}{J_b+\varepsilon},
\frac{\left\|P_{\parallel,\hat{\mathbf{k}}}\Pi_{\gamma}\mathcal{L}_A(\mathsf e)\right\|_{\gamma}}{\epsilon_{\gamma,\parallel}},
R_{\mathrm{bench},b},
R_{\mathrm{replay},b}
\right)
$$

The benchmark scales $E_b$, $p_b$, and $J_b$ are declared comparison scales, not fitted recovery knobs. $R_{\mathrm{bench},b}$ is the family-specific residual, such as Larmor/Lienard power, Compton shift, pair threshold, or Planck occupation. $R_{\mathrm{replay},b}$ vanishes only when the same residual definition, channel boundary, and Noether sea variables replay across the selected event panel without retuning. The acceptance target is

$$
\left\|\mathbf{R}_{\gamma,b}(\mathsf e)\right\|_{\infty}
\le
1
$$

after photon Gate A supplies the admissible massless branch and photon Gate B supplies the transverse ledger. A radiation family is therefore not closed by matching one scalar benchmark if energy, momentum, angular momentum, transversality, provenance, or replayability still fails.

### Scattering and Reaction-Ledger Grammar

Scattering, relativistic collision, pair-channel, and radiation-coupled reaction records should refine the same event schema rather than introduce a separate bookkeeping language. A compact event-ledger grammar is

$$
\mathcal{E}_{\mathrm{scat/rxn}}
=
\left(
\mathfrak{L}_{\mathrm{in}},
W_{\mathrm{int}},
\mathfrak{T}_{\mathrm{cons}},
\mathfrak{L}_{\mathrm{out}},
\mathfrak{R}_{\mathrm{res}}
\right)
$$

The five entries are theorem-target data, not a completed QFT scattering derivation:

| Grammar entry | Required content | Validation role |
| --- | --- | --- |
| $\mathfrak{L}_{\mathrm{in}}$ | incoming assembly, photon, medium, and Noether sea ledgers: identities, $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, architrino inventory, causal-root branches, and path-history provenance | fixes what enters the event before any channel assignment is made |
| $W_{\mathrm{int}}$ | finite interaction window $[t_i,t_f]$ with the resolved local geometry, branch Jacobians, transient assembly or resonance record, and recruited or returned Noether sea content | prevents replacing the local collision or channel window by an instantaneous black box |
| $\mathfrak{T}_{\mathrm{cons}}$ | conserved transfers through the window: energy, momentum, angular momentum, polarity, identity routing, recoil, medium excitation, and wake ledger exchange | states which balances must close together at the same event, including hidden recoil and medium rows |
| $\mathfrak{L}_{\mathrm{out}}$ | outgoing stable or metastable ledgers: photons, shifted photons, scattered assemblies, reaction products, residual bound states, heat channel, recoil carrier, and remaining Noether sea record | records products without treating observer-level particle-creation language as creation from nothing |
| $\mathfrak{R}_{\mathrm{res}}$ | residual checks for conservation, identity routing, threshold recovery, cross-section or rate benchmark, unresolved remnant energy, and explicit failure modes | marks the event as baseline, derivation target, failed map, or validated limit |

The minimal residual check can be written as

$$
\mathfrak{R}_{\mathrm{res}}
=
\left(
\Delta E_{\mathrm{tot}},
\Delta\mathbf{p}_{\mathrm{tot}},
\Delta\mathbf{J}_{\mathrm{tot}},
\Delta\mathcal{N}_{\mathrm{id}},
\Delta_{\mathrm{bench}}
\right)
$$

with every component required to vanish, or to be assigned to a named residual row, before the channel can be used as a completed scattering or reaction ledger. Here $\Delta\mathcal{N}_{\mathrm{id}}$ is the identity-routing residual after explicit Noether sea reservoir terms are included, and $\Delta_{\mathrm{bench}}$ is the observer-level benchmark residual for the declared regime. At validated relativistic collision limits, this grammar must reproduce the standard incoming/outgoing state accounting, thresholds, and conservation laws. It does not by itself derive amplitudes, cross sections, or particle-creation rates.

### Photon-Material Surface Routing

A material surface interaction is the near-field Gate C version of the same event schema. It should not be pictured as a small projectile striking a hard wall. At atomic resolution the incoming photon is a coaxial contra-rotating pro/anti planar pair with Gate A and Gate B ledgers, while the material supplies an electron-envelope branch, a nuclear source envelope, a bonding or lattice branch, and a local Noether sea response record. The local event state can be written as

$$
X_{\mathrm{surf}}
=
\left(
\gamma_{\mathrm{in}},
\mathcal B_e,
\mathcal A_{\mathrm{nuc}}^{Z,N},
\mathcal B_{\mathrm{lat}},
\Theta_E^{(\ell)},
\mathcal H_{\gamma\to\Omega}
\right)
$$

where $\gamma_{\mathrm{in}}$ carries $E_{\gamma,\mathrm{in}}$, $\mathbf{p}_{\gamma,\mathrm{in}}$, direction, phase frequency, local $c_\gamma$, and transverse ledger data; $\mathcal B_e$ is the realized electron-envelope branch; $\mathcal A_{\mathrm{nuc}}^{Z,N}$ is the nuclear assembly ledger; $\mathcal B_{\mathrm{lat}}$ is the realized material bonding or lattice branch; $\Theta_E^{(\ell)}$ is the coarse Noether sea response record in the surface cell; and $\mathcal H_{\gamma\to\Omega}$ is the causal-wake and path-history ledger for the incoming packet and local material window.

The route decision selects a finite channel set

$$
I_{\mathrm{surf}}
\subset
\{
B_{\mathrm{refl}},
B_{\mathrm{cap}},
B_{\mathrm{scat}},
B_{\mathrm{heat}},
B_{\mathrm{recoil}},
B_{\mathrm{rem}}
\}
$$

The selected route must close the scalar ledger

$$
E_{\gamma,\mathrm{in}}
=
E_{\gamma,\mathrm{out}}
+
\Delta E_{e\text{-env}}
+
\Delta E_{\mathrm{lat}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{rem}}
$$

with corresponding momentum and angular-momentum rows

$$
\mathbf{p}_{\gamma,\mathrm{in}}
=
\mathbf{p}_{\gamma,\mathrm{out}}
+
\Delta \mathbf{p}_{e\text{-env}}
+
\Delta \mathbf{p}_{\mathrm{lat}}
+
\Delta \mathbf{p}_{\mathrm{sea}}
+
\Delta \mathbf{p}_{\mathrm{recoil}}
$$

$$
\mathcal J_{\gamma,\mathrm{in}}^{\perp}
=
\mathcal J_{\gamma,\mathrm{out}}^{\perp}
+
\Delta \mathcal J_{e\text{-env}}
+
\Delta \mathcal J_{\mathrm{lat}}
+
\Delta \mathcal J_{\mathrm{sea}}
+
\Delta \mathcal J_{\mathrm{wake}}
$$

Here $E_{\gamma,\mathrm{out}}=0$ when no free photon leaves the cell. In that case the photon branch has been captured or dephased as a free planar-pair mode, but the event has not lost energy; the electron-envelope, lattice, Noether sea, recoil, remnant, and wake rows carry the balance. For ordinary optical or infrared surface events, the nuclear inventory remains fixed: $\Delta Z=0$ and $\Delta A=0$ unless a separate nuclear-reaction gate is explicitly supplied.

| Route | Material meaning | Required closure target |
| --- | --- | --- |
| $B_{\mathrm{refl}}$ | coherent re-release of an outgoing planar-pair branch, typically supported by a collective surface-electron response in a metal-like branch | recover phase, angle, polarization, and skin-depth behavior without treating reflection as a hard bounce |
| $B_{\mathrm{cap}}$ | capture of the incoming planar-pair ledger into electron-envelope excitation or a higher material basin | close energy, momentum, transverse angular momentum, and remnant rows when $E_{\gamma,\mathrm{out}}=0$ |
| $B_{\mathrm{scat}}$ | outgoing photon branch survives with changed direction, phase, frequency, or polarization record | close shifted photon provenance together with recoil and material update |
| $B_{\mathrm{heat}}$ | captured action thermalizes through electron, lattice, and Noether sea updates | derive the route from material return dynamics rather than inserting untracked heat |
| $B_{\mathrm{recoil}}$ | lattice, nuclear source envelope, or medium component receives momentum balance | keep recoil even when its energy is small |
| $B_{\mathrm{rem}}$ | retained bound excitation or dephased surface state remains after the event window | record the remnant state instead of hiding it in attenuation |

A Vantablack-like absorber is then not a special photon ontology. It is a material branch with high geometric and electronic capture depth: many surface cells route the incoming planar-pair ledger into $B_{\mathrm{cap}}$, $B_{\mathrm{heat}}$, $B_{\mathrm{recoil}}$, and $B_{\mathrm{rem}}$ before a coherent $B_{\mathrm{refl}}$ escape channel can survive. A metal surface is the opposite limiting case: the conduction-electron branch supports a coherent surface-current response, so a large part of the incoming ledger reappears as $E_{\gamma,\mathrm{out}}$ with an organized phase relation, while absorption loss remains in the electron-envelope, lattice, Noether sea, and recoil rows.

High-finesse mirror cavities sharpen the same point because they look nearly lossless while still testing the surface ledger on every bounce. For bounce $b$, define
$$
\mathcal R_{\mathrm{mir}}(b)
=
\frac{
\left|
E_{\gamma,b}^{\mathrm{in}}
-E_{\gamma,b}^{\mathrm{out}}
-\Delta E_{e\text{-env},b}
-\Delta E_{\mathrm{lat},b}
-\Delta E_{\mathrm{sea},b}
-\Delta E_{\mathrm{recoil},b}
-\Delta E_{\mathrm{rem},b}
\right|
}{
E_{\gamma,b}^{\mathrm{in}}+\varepsilon_E
}
+\mathcal R_{\mathbf p\mathbf J,b}.
$$
The cavity loss residual over $N$ bounces is
$$
\mathcal R_{\mathrm{cav}}
=
\sum_{b=1}^{N}
w_b\,\mathcal R_{\mathrm{mir}}(b),
\qquad
w_b\ge0.
$$
Apparent lossless reflection means $\mathcal R_{\mathrm{mir}}(b)$ and the accumulated absorption, recoil, phase, and heating rows remain below the declared tolerance. It does not mean the photon bounced from a passive wall with zero material update.

The worked surface case is still a derivation target. It fails if reflection is modeled as a hard geometric bounce with no electron-envelope response, if absorption becomes annihilation or untracked heat, if the same material requires separate Noether sea variables for reflection and absorption, if a hidden longitudinal free-photon channel is used, or if ordinary optical events change nuclear inventory without a separate reaction provenance ledger.

**Causal material response and skin-depth ledger.** Photon-material routing needs a constitutive response target in addition to the event ledger. In the effective material description, a local response kernel $\mathcal X_\Omega$ maps the applied channel field to the coarse material polarization,

$$
\mathbf{P}_\Omega(t,\mathbf{x})
=
\int_{-\infty}^{+\infty}
\mathcal X_\Omega(t-t';\mathbf{x})\,
\mathbf{E}_{\Omega}(t',\mathbf{x})\,dt'
$$

with causality requiring

$$
\mathcal X_\Omega(\Delta t;\mathbf{x})=0
\qquad
\text{for}\quad
\Delta t<0
$$

Therefore the frequency-domain response $\mathcal X_\Omega(\omega;\mathbf{x})$ must be analytic for $\operatorname{Im}\omega>0$ in the validated linear-response regime. The Noether sea dressing map for material response must recover the Kramers-Kronig residuals

$$
\Delta_{\mathrm{KK}}^{\operatorname{Re}}(\omega)
=
\operatorname{Re}\mathcal X_\Omega(\omega)
-
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Im}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

$$
\Delta_{\mathrm{KK}}^{\operatorname{Im}}(\omega)
=
\operatorname{Im}\mathcal X_\Omega(\omega)
+
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Re}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

and pass only when both residuals vanish, up to declared coarse-graining error. This is a causality test for Noether sea dressing, not a claim that the effective response kernel is the substrate ontology.

For absorption, reflection, and skin-depth comparisons, use the effective material response

$$
\epsilon_{\mathrm{eff}}(\omega)
=
\epsilon_{\Omega}(\omega)
+
\frac{i\sigma_{\Omega}(\omega)}{\omega},
\qquad
k^2(\omega)
=
\mu_{\Omega}(\omega)\epsilon_{\mathrm{eff}}(\omega)\omega^2,
\qquad
k(\omega)=k_1(\omega)+ik_2(\omega)
$$

The attenuation and phase rows are

$$
\delta_{\mathrm{skin}}(\omega)=\frac{1}{k_2(\omega)},
\qquad
\phi_{EB}(\omega)=\tan^{-1}\!\left(\frac{k_2(\omega)}{k_1(\omega)}\right)
$$

In the low-frequency Drude conductor limit,

$$
\sigma_\Omega(\omega)
=
\frac{\sigma_{\mathrm{DC}}}{1-i\omega\tau},
\qquad
\delta_{\mathrm{skin}}(\omega)
\rightarrow
\left(\frac{2}{\mu_\Omega\omega\sigma_{\mathrm{DC}}}\right)^{1/2}
$$

In the high-frequency plasma limit, with carrier density $n_{\mathrm{car}}$,

$$
\omega_p^2
=
\frac{n_{\mathrm{car}}q^2}{m\epsilon_0},
\qquad
\epsilon_{\mathrm{eff}}(\omega)
\rightarrow
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right)
$$

The transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
\qquad
(\omega>\omega_p)
$$

while $\omega<\omega_p$ routes to an evanescent reflection/skin-depth row rather than to an untracked disappearance of the photon ledger. If $\epsilon_{\mathrm{eff}}(\omega)=0$ supports a longitudinal plasma oscillation, that excitation belongs in the medium-excitation row; it is not a hidden longitudinal free-photon branch.

For a surface event normalized by incoming flux and polarization branch $b\in\{\perp,\parallel\}$, the material-response ledger is

$$
\mathcal M_{\mathrm{surf}}(\omega,\theta,b)
=
\left(
R_b,
T_b,
A_b,
Q_b^{\mathrm{rem}},
\delta_{\mathrm{skin}},
k_1,
k_2,
\phi_{EB},
\Delta_{\mathrm{KK}}^{\operatorname{Re}},
\Delta_{\mathrm{KK}}^{\operatorname{Im}},
\Delta_E^{\mathrm{EM}},
\Delta_{\mathbf{p}}^{\mathrm{EM}}
\right)
$$

with scalar routing condition

$$
R_b+T_b+A_b+Q_b^{\mathrm{rem}}=1
$$

Here $R_b$ is coherent reflected flux, $T_b$ is transmitted flux, $A_b$ is thermalized or dephased absorption, and $Q_b^{\mathrm{rem}}$ is retained bound excitation. In transparent interface limits the same ledger must recover Snell and Brewster behavior,

$$
n_1\sin\theta_I=n_2\sin\theta_T,
\qquad
\tan\theta_B=\frac{n_2}{n_1}
$$

with the polarization branch $b$ selecting the relevant Fresnel amplitude. In absorbing or conducting limits, the ledger must recover attenuation through $k_2$ and $\delta_{\mathrm{skin}}$ while keeping energy, momentum, and transverse angular momentum assigned to the same event record.

### Ensemble Temperature

The term "hot" should be used with care. A single excited Noether braid is not hot in the full thermodynamic or blackbody sense. It is better described as internally excited, closure-mismatched, or metastable above a local stable rung. Temperature is an ensemble-level effective variable: many assemblies must exchange energy, emit, absorb, scatter, and thermalize so that a stable distribution can be assigned.

At the ensemble level, the relevant object is not one value of $E_{\text{exc}}$ but a distribution over assembly states and photon modes. A disciplined temperature definition should come from an entropy-energy relation for the ensemble,

$$
\frac{1}{k_B T_{\text{ens}}}
=
\left(\frac{\partial S_{\text{ens}}}{\partial E_{\text{ens}}}\right)_{\mathcal{N},\mathcal{V}}
$$

or from an equivalent kinetic distribution that has already been shown to thermalize under the local interaction rules. The symbols $\mathcal{N}$ and $\mathcal{V}$ denote the conserved inventory and effective volume variables held fixed in the chosen coarse-graining; they are bookkeeping variables, not new ontology.

For radiation channels, local thermodynamic equilibrium is a timescale claim. Reusing the diagnostic from bremsstrahlung,

$$
\mathcal{R}_{\mathrm{LTE}}
\equiv
\frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

When $\mathcal{R}_{\mathrm{LTE}}\ll 1$, assembly-medium coupling is fast enough that local emissivity may be computed from instantaneous ensemble variables. When $\mathcal{R}_{\mathrm{LTE}}\gtrsim 1$, the channel remains non-equilibrium, and a single local temperature is not a sufficient state description.

### Blackbody Limit

Blackbody behavior is a stronger claim than radiation. It requires repeated emission, absorption, scattering, and mode exchange until the photon bath approaches detailed balance with the material or Noether sea ensemble. In the weak homogeneous validated limit, the closure target is the usual Planck occupation form,

$$
\bar n_\gamma(\nu)
=
\frac{1}{\exp(h\nu/(k_B T))-1}
$$

with effective photon chemical potential driven to zero in the fully thermalized photon bath. This is an observer-level recovery target. The foundation-up task is to show how planar-mode nucleation, planar-mode capture, Compton-like redistribution, pair channels, and non-radiative medium exchange jointly produce the same limit.

The minimum detailed-balance condition is schematic but useful:

$$
\Gamma_{i\to j+\gamma}\,f_i\,(1+\bar n_\gamma)
=
\Gamma_{j+\gamma\to i}\,f_j\,\bar n_\gamma
$$

Here $f_i$ and $f_j$ are ensemble occupation weights for material or assembly states, while $\Gamma$ denotes the effective transition rate after the underlying assembly dynamics have been coarse-grained. This equation is not a proof of blackbody behavior. It states the rate symmetry that the completed Gate C radiation derivation must recover.

The detailed-balance theorem target is more specific than the schematic equation. For a transition with $E_i-E_j=h\nu$, Gate C must derive an ensemble weight ratio

$$
\frac{f_i}{f_j}
=
\frac{g_i}{g_j}\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

from the thermalized assembly ensemble, together with a rate-degeneracy relation

$$
\Gamma_{i\to j+\gamma}\,g_i
=
\Gamma_{j+\gamma\to i}\,g_j
$$

Those two conditions make the detailed-balance equation imply

$$
\frac{\bar n_\gamma}{1+\bar n_\gamma}
=
\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

and therefore recover the Planck occupation. The point is not to postulate these relations at the substrate level; the point is to identify exactly what the assembly return map, planar-mode capture/release rates, and coarse-grained ensemble measure must prove before blackbody language becomes available.

For cosmology-facing claims, thermalization depth is a diagnostic rather than a new ontology term. A useful provisional target is

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_a,t_b)
=
\int_{t_a}^{t_b}
\left[
\tau_{\mathrm{cap}}^{-1}
+
\tau_{\mathrm{scat}}^{-1}
+
\tau_{\mathrm{pair}}^{-1}
+
\tau_{\mathrm{med}}^{-1}
\right](\nu,t)\,dt
$$

where the terms respectively summarize planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange after those channels have been tied to event records. The condition $\mathcal{D}_{\mathrm{th}}\gg1$ is necessary for a source population to approach a blackbody photon bath, but it is not sufficient unless the same provenance record also closes Gate A kinematics, Gate B transverse handoff, Gate C transition rates, and the Noether sea state map used for redshift and damping.

For cosmology-facing use, the blackbody limit also requires thermalization depth, damping, anisotropy, polarization, and redshift handoff to remain consistent with the same provenance record. The CMB claim is therefore not "many photons exist." The claim to prove is that source channels plus Noether sea transport can generate and preserve a near-blackbody photon bath within observational limits.

### Channel Routing

Channel routing is the event-level decision tree that sends the closure residual into allowed outputs. It should be recorded before a channel is used in a larger reaction or cosmology argument.

| Channel family | Trigger geometry | Primary output | Required closure target |
| --- | --- | --- | --- |
| Bremsstrahlung | charged-assembly deceleration near a target assembly | planar-mode photon, recoil, medium excitation | recover $d\sigma/dk$, screening, form-factor, and free-free emissivity limits |
| Synchrotron | curved charged-assembly transport in an anisotropic Noether sea state | repeated planar-mode photon output | recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, cooling breaks, and polarization limits |
| [Atomic transition](../../../../markdown/aaa/reactions/atomic-transition-radiation.md) | electron-assembly envelope moves between effective resonance basins | line photon plus recoil and residual atomic state | recover spectral line frequencies after local clock/rate conversion |
| Pair association and neutral relock radiation | photon overlap, charged pair association, or charged pair relock | photons, $e^+e^-$ assemblies, recoil, and recruited or returned Noether braid content | recover threshold, cross-section, and inventory plus identity-routing conservation in validated regimes |
| Thermal free-free | ensemble of screened charged encounters | continuum photon bath plus medium heating | recover LTE emissivity when $\mathcal{R}_{\mathrm{LTE}}\ll 1$ and non-equilibrium corrections otherwise |
| Compton-like scattering | photon assembly captured and re-released by a charged assembly | shifted photon, recoil, and possible heat channel | recover energy-momentum transfer and standard scattering limits |
| Medium relaxation | Noether sea or material excitation relaxes without a resolved source-particle event | photon output if planar-mode gate opens; otherwise medium heat or turbulence | keep source, transport, and thermalization provenance explicit |
| Reaction-product or particle radiation | assembly reaction, dissociation, association, or high-energy collision with outgoing non-photon assemblies | outgoing assemblies, recoil, medium updates, and possible photon rows | use the reaction provenance ledger; do not relabel non-photon products as planar-mode photon radiation |

Every photon-producing or reaction-coupled row in this table has the same routing skeleton:

$$
\text{closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual internal energy, or reaction products}
$$

Gravitational-wave radiation sits outside this table. It is a tensor/effective-metric channel whose closure targets are speed, dispersion, polarization content, detector-side strain provenance, and source-side quadrupole recovery, handled in [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). It should not be promoted as another photon-output branch.

The channel pages specialize the skeleton. This overview supplies the shared rule: no radiation claim is complete until the event record identifies the source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, closure status, and observer-level recovery limit.

The routing skeleton is a theorem-target contract, not a completed event-routing theorem. Radiation-coupled reaction and pair channels remain open worked sector cases until they satisfy the event-ledger contract in [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md#residual-routing-event-ledger-contract): a replayable residual, a stated channel boundary, a selected output assignment, a closed $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, benchmark recovery, and explicit failure modes.

### Radiation Closure-Target Ledger

The routing skeleton above becomes useful only if each benchmark is carried as a classified closure item. In this ledger, `ontology` names what the theory treats as real at the substrate or assembly level; `derivation target` names a result that must be recovered from dynamics, symmetry, simulation, or constitutive closure; `effective summary` names an observer-level formula retained as a recovery target; and `speculation` names a possible extension that cannot be used to repair a failed benchmark.

| Target | Class | Concrete closure requirement | Validation check | Failure condition |
| --- | --- | --- | --- | --- |
| Radiative event ontology | ontology | A radiative event is a routed closure residual. Photon output is a planar-mode nucleation event whose photon branch is the coaxial contra-rotating pro/anti planar pair; medium excitation, recoil, residual internal energy, and reaction products remain explicit non-photon channels. | Every channel event record identifies the source assembly, trigger geometry, local Noether sea state, $\mathcal{R}_{\Theta}$, $E_{\text{exc}}$, photon or non-photon outputs, and conservation ledgers. | If radiation is treated as primitive acceleration-field output or as untracked energy loss, the ontology has been bypassed. |
| Scattering/reaction event grammar | derivation target | Express every scattering, relativistic collision, pair-channel, and radiation-coupled reaction as $\mathcal{E}_{\mathrm{scat/rxn}}=(\mathfrak{L}_{\mathrm{in}},W_{\mathrm{int}},\mathfrak{T}_{\mathrm{cons}},\mathfrak{L}_{\mathrm{out}},\mathfrak{R}_{\mathrm{res}})$, with incoming ledgers, a finite interaction window, conserved transfers, outgoing ledgers, and residual checks all present. | A completed channel must drive $\mathfrak{R}_{\mathrm{res}}$ to zero within tolerance or assign every nonzero term to a named remnant, medium, recoil, wake, or benchmark-failure row. | If products are listed without incoming provenance, if the interaction window is hidden, if observer-level creation language bypasses identity routing, or if standard scattering limits are asserted without residual checks, the event grammar has failed. |
| Larmor/Lienard recovery | derivation target | Coarse-grain repeated planar-mode nucleation from smooth weak-field charged-assembly acceleration so that the nonrelativistic power scales as $P\propto\|\mathbf{a}\|^2$ and the relativistic observer-level limit recovers the Larmor/Lienard class after clock and rate conversion. | Sweep smooth acceleration histories at fixed weak homogeneous Noether sea state and recover the standard power and angular limits before claiming channel-specific deviations. | If the low-speed limit is not quadratic in acceleration, or if the relativistic limit requires a separately fitted radiation threshold, the radiation map is not closed. |
| Bremsstrahlung emissivity | derivation target | Integrate the charged-assembly deceleration event record over impact parameters, screening, target geometry, and ensemble distributions to recover free-free emissivity, including $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$ and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T^{1/2}$ in the LTE limit. | In regimes with $\mathcal{R}_{\mathrm{LTE}}\ll 1$, recover $d\sigma/dk$, screening, form-factor, and emissivity limits from the same channel record used by [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md). | If cross-section and emissivity closure require different Noether sea state variables or hidden per-plasma fits, the channel fails as a derivation. |
| Shock cooling branch selection | derivation target | For jet heads, knots, dense gas impacts, and other supersonic working surfaces, route the same closure residual according to $\mathcal{R}_{\mathrm{cool}}=t_{\mathrm{cool}}/t_{\mathrm{dyn}}$: fast-cooling shocks feed thermal line, free-free, and heat rows; adiabatic shocks feed particle-acceleration, synchrotron, inverse-Compton, cocoon, or lobe rows. | Compare synthetic source records against thermal-line YSO shocks and non-thermal AGN/microquasar shocks using the same source, recoil, medium, and photon ledgers. | If the model predicts the correct morphology but cannot decide whether the shock emits thermally, non-thermally, or mostly stores energy in the Noether sea, the radiation branch has not closed. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Map anisotropic Noether sea state to effective magnetic transport and recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling-break behavior from curved charged-assembly routing. | Sweep $\gamma$, $B$, and pitch geometry while holding the same $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ mapping; recover the standard scaling before using synchrotron cascades in source or cosmology arguments. | If the factor-of-$\gamma^2$ frequency scaling is absent, or if the $B$ map must be redefined between trajectory curvature and emission, the synchrotron branch fails. |
| Pair thresholds and pair-channel provenance | derivation target | Recover the standard pair thresholds while preserving architrino inventory: for photon-photon pair production, the Gate C target includes $s\ge 4m_e^2c^4$ and $E_1E_2(1-\cos\theta_{12})\ge 2(m_ec^2)^2$ in the validated limit. | The event record must identify incoming photon assemblies, outgoing $e^+e^-$ assemblies, recoil or medium terms, and the standard threshold/cross-section limit. It must also decide the provenance fork: direct rearrangement from the two photon ledgers, or recruited and returned neutral Noether braid content from the Noether sea. | If pair production is described as creation from nothing, violates inventory conservation, hides which fork supplies the outgoing inventories, or shifts the threshold without a controlled new-physics claim, the pair channel is not closed. |
| Compton-like scattering | derivation target | Treat photon capture and re-release by a charged assembly as a Gate C vertex and recover the observer-level Compton shift $\lambda'-\lambda=(h/(m_ec))(1-\cos\theta)$, the Thomson low-energy limit, and the Klein-Nishina high-energy correction. | The same vertex record must close incoming photon data, charged-assembly recoil, shifted outgoing photon data, heat or residual excitation, and energy-momentum transfer. | If scattering is modeled only as phenomenological frequency loss, or if recoil and shifted photon provenance cannot close together, the Compton-like branch fails. |
| Effective EM Gate residual | derivation target | Any use of Maxwell-level variables must satisfy $\mathcal{G}_{\mathrm{EM}}=(\Delta_{\mathrm{cont}},\Delta_E^{\mathrm{EM}},\Delta_{\mathbf{p}}^{\mathrm{EM}},\Delta_{\mathbf{J}}^{\mathrm{EM}},\Delta_{\mathrm{gauge}})$ in the declared standard-limit regime, with nonzero residuals routed into named event rows. | Evaluate the effective continuity, Poynting-flux, Maxwell-stress, angular-momentum, and gauge-invariance residuals on the same event record used for photon or material routing. | If the channel recovers a spectrum while hiding charge continuity, stress recoil, gauge dependence, or energy-momentum mismatch in the effective field layer, the EM comparison gate has failed. |
| Causal response-function analyticity | derivation target | Material and Noether sea dressing response kernels must obey $\mathcal X_\Omega(\Delta t)=0$ for $\Delta t<0$, analyticity for $\operatorname{Im}\omega>0$, and $\Delta_{\mathrm{KK}}^{\operatorname{Re}}=\Delta_{\mathrm{KK}}^{\operatorname{Im}}=0$ in the linear-response regime. | Check that absorption and dispersion are paired by the same response kernel rather than fitted independently, and that response poles remain outside the upper-half $\omega$ plane. | If a material map tunes attenuation without the corresponding dispersion, or uses an acausal response kernel, the surface or medium-routing derivation is invalid. |
| Material absorption/reflection/skin-depth ledger | derivation target | Surface events must use one ledger $\mathcal M_{\mathrm{surf}}(\omega,\theta,b)$ for reflection, transmission, absorption, remnant excitation, skin depth, complex wavenumber, response analyticity, and EM energy-momentum residuals. | Recover Fresnel/Snell/Brewster behavior in transparent limits, $\delta_{\mathrm{skin}}\rightarrow(2/(\mu\omega\sigma_{\mathrm{DC}}))^{1/2}$ in low-frequency Drude conductors, and plasma cutoff behavior near $\omega_p$. | If reflection is a hard bounce, absorption is untracked heat, skin depth is detached from conductivity, or longitudinal plasma oscillation is treated as a free photon mode, the material route fails. |
| Blackbody recovery | derivation target | Show that repeated emission, absorption, Compton-like redistribution, pair channels, and non-radiative exchange reach detailed balance with Planck occupation $\bar n_\gamma(\nu)=1/(\exp(h\nu/(k_B T))-1)$ and effective photon chemical potential driven to zero. | Recover the Planck spectrum, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff using one provenance record and one Noether sea state map. | If blackbody recovery needs per-observable retuning, unbalanced photon loading, or a different transport map from the source channels, the thermal branch fails. |
| Free photon polarization boundary | derivation target | Radiation pages may record polarization basis, transverse angular-momentum ledger, and observer-level polarization recoveries as downstream requirements, but free photon polarization, helicity, Malus' law, and analyzer statistics are Gate B results. | Every radiation, scattering, pair, or cosmology use of photon polarization must point back to the Gate B handoff instead of deriving new free-photon polarization rules locally. | If a channel page invents its own free photon polarization derivation, adds a longitudinal free mode, or treats Gate B as already proven inside radiation, the closure boundary is violated. |
| Noether sea-dependent radiation deviations | speculation | Deviations tied to $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, threshold floors, or source-history transport are candidate predictions only after the validated limits above are recovered. | A proposed deviation must state the benchmark-preserving limit, the residual term, and the measurable regime before being used in a source model. | If a deviation is used to rescue a failed standard recovery or is fitted independently per observable, it is not accepted as radiation closure. |

### Closure Targets

The first proof burden is to derive the separatrix condition and planar-mode threshold from the Master Equation and the Noether braid ledger. The second burden is to show that the same routing record recovers known radiation channels in validated limits. The third burden is to show that ensemble thermalization can reach the blackbody limit without changing ontology or re-fitting Noether sea state variables for each observable.

In compact form, the radiation program is:

$$
\text{rapid transport or gradient change}
\longrightarrow
\text{Noether braid closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{photon output, medium excitation, recoil, residual internal energy, or reaction products}
\longrightarrow
\text{observer-level spectrum or thermal bath}
$$

This is a radiative closure program, not yet a completed derivation of blackbody radiation. It keeps strong source insights in play while preserving the distinction between ontology, derivation targets, effective summaries, and speculative extensions.

## Atomic Transition Radiation

Atomic transition radiation is the line-emission and line-absorption channel in which an electron-assembly envelope moves between effective atomic resonance basins and the excess action is routed through a photon planar-mode channel, recoil, medium excitation, or residual atomic energy.

This page specializes the shared routing skeleton in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The envelope energies and spectral labels are inherited from [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md), while photon ontology and Gate A/B/C closure requirements are inherited from [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface). Reaction provenance follows [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), and cosmology-facing photon records remain downstream of [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

This chapter is not a completed derivation of atomic transition rates. Its role is to state the first event record for the Gate C vertex: how a bound atomic envelope sheds or captures a coaxial contra-rotating pro/anti planar pair while preserving energy, momentum, angular momentum, local Noether sea state, and path-history provenance.

### Basin Transition

Atomic spectra describe effective electron-assembly envelope basins around a nuclear causal-wake envelope. Let $a$ and $b$ denote two such basins for the same atomic assembly, with $a$ the higher-energy basin in an emission event. The local envelope gap is

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_{\mathrm{env}}\!\left(a;\mathcal W_{\mathrm{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}}\right)
-
E_{\mathrm{env}}\!\left(b;\mathcal W_{\mathrm{nuc}},\rho_{\text{NS}},n,\chi_{\text{sea}}\right)
>0
$$

Here $\mathcal W_{\mathrm{nuc}}$ is the effective nuclear causal-wake envelope, $\rho_{\text{NS}}(\mathbf{x},t)$ is the physical Noether braid density, $n(\mathbf{x},t)$ is the normalized Noether braid density, and $\chi_{\text{sea}}(\mathbf{x},t)$ is the Noether sea delay factor. The gap is an effective atomic quantity, not a proof that the underlying Noether braid ledgers of the nucleus or electron have already been derived.

The observer-level line frequency is recovered only after local clock/rate conversion:

$$
h\nu_{a\to b}^{\mathrm{loc}}
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
-
\Delta E_{\mathrm{recoil}}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{rem}}
$$

In the ideal isolated line limit, the non-photon terms are negligible and $E_\gamma\simeq h\nu_{a\to b}^{\mathrm{loc}}$. In dense media, strong gradients, or unresolved recoil regimes, those terms must remain in the ledger rather than being silently absorbed into the line frequency.

### Hydrogen Line Benchmark Record

The hydrogen Rydberg benchmark in [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target) supplies the line-gap side of the test. This page supplies the event-record side. For an isolated weak-homogeneous hydrogen transition $a\to b$, the same envelope gap must close as a routed event:

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_\gamma
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\mathrm{rem}}
$$

with $\Delta E_{\mathrm{med}}$ and $\Delta E_{\mathrm{rem}}$ bounded by the declared isolated-line tolerance rather than hidden in the fitted line frequency. A compact event residual is

$$
\mathcal E_{ab}^{\mathrm{evt}}
=
\frac{
\left|
\Delta E_{a\to b}^{\mathrm{env}}
-
E_\gamma
-
\Delta E_{\mathrm{recoil}}
-
\Delta E_{\mathrm{med}}
-
\Delta E_{\mathrm{rem}}
\right|
}{
\left|
\Delta E_{a\to b}^{\mathrm{env}}
\right|
+
\varepsilon_{\mathrm{evt}}
}
\le
\Delta_{\mathrm{evt}}^{\mathrm{tol}}
$$

The frequency readout must then agree with the local photon record:

$$
\mathcal E_{ab}^{\gamma}
=
\frac{
\left|
E_\gamma
-
h\nu_{\gamma}^{\mathrm{loc}}
\right|
}{
\left|
E_\gamma
\right|
+
\varepsilon_{\gamma}
}
\le
\Delta_{\gamma}^{\mathrm{tol}}
$$

The benchmark fails if a Rydberg-consistent line can be obtained only by dropping recoil, medium excitation, or residual atomic energy from the ledger; if the planar-mode gate is changed between hydrogen lines; if the photon-channel speed used by the spectral comparison differs from the emitted photon record; or if path-history provenance is not sufficient to replay which envelope transition produced the coaxial contra-rotating pro/anti planar pair.

### Planar-Mode Gate

A basin transition is not automatically photon emission. It becomes atomic transition radiation only when the available gap and the local channel geometry cross the planar-mode nucleation gate inherited from the radiation program:

$$
\mathcal S_{\gamma}^{\mathrm{at}}
\!\left(
\Gamma_a,\Gamma_b,\mathcal W_{\mathrm{nuc}},
\rho_{\text{NS}},n,\chi_{\text{sea}},J_{\mathrm{loc}}
\right)
\ge
\mathcal S_{\gamma,*},
\qquad
\Delta E_{a\to b}^{\mathrm{env}}\ge E_{\gamma,\min}
$$

The symbol $\mathcal S_{\gamma}^{\mathrm{at}}$ denotes the atomic-transition specialization of the photon-channel drive. Its arguments record the pre/post atomic microstates $\Gamma_a,\Gamma_b$, the nuclear causal-wake envelope, local Noether sea density and delay state, and the local causal-root/Jacobian data. This is a derivation target: the completed Gate C account must compute this drive from the assembly return map and delayed causal-wake ledger, not fit it separately for each line.

If the gate is not crossed, the same basin transition may still route energy into recoil, medium excitation, internal remnant energy, or a non-radiative material update. The channel distinction is therefore:

$$
\text{envelope basin transition}
\longrightarrow
\begin{cases}
\text{planar-mode photon output}, & \mathcal S_{\gamma}^{\mathrm{at}}\ge\mathcal S_{\gamma,*},\\
\text{non-radiative shedding or retained excitation}, & \mathcal S_{\gamma}^{\mathrm{at}}<\mathcal S_{\gamma,*}.
\end{cases}
$$

### Event Ledger

A resolved emission event should close the local energy record

$$
\Delta E_{a\to b}^{\mathrm{env}}
=
E_\gamma
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
+
\Delta E_{\mathrm{rem}}
$$

The corresponding momentum ledger is

$$
\Delta \mathbf p_{\mathrm{atom}}
+
\mathbf p_{\gamma}
+
\Delta \mathbf p_{\mathrm{recoil}}
+
\Delta \mathbf p_{\mathrm{med}}
=
\mathbf 0
$$

Angular momentum and wake-carried angular momentum must close at the same vertex:

$$
\Delta \mathcal J_{\mathrm{atom}}
+
\mathcal J_{\gamma}^{\perp}
+
\Delta \mathcal J_{\mathrm{recoil}}
+
\Delta \mathcal J_{\mathrm{wake}}
+
\Delta \mathcal J_{\mathrm{handoff}}
+
\Delta \mathcal J_{\mathrm{med}}
+
\Delta \mathcal J_{\mathrm{rem}}
=
0
$$

The photon term $\mathcal J_{\gamma}^{\perp}$ is a Gate B handoff. Recoil, wake, material handoff, medium, and remnant rows are shown explicitly because a clean photon transverse ledger is not enough to close the event. This page records that an emitted or absorbed photon assembly must carry the transverse angular-momentum ledger, polarization basis, helicity label where applicable, accepted/rejected handoff where applicable, and no-longitudinal-mode status. It does not locally prove photon spin, Malus' law, or the squared-amplitude capture rule.

The minimum event record is:

| Field | Required content |
| --- | --- |
| Atomic state | Pre/post atomic envelope basins $a,b$, nuclear causal-wake envelope $\mathcal W_{\mathrm{nuc}}$, and closure status of the orbital labels used |
| Local Noether sea state | $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy if relevant, and local causal-root/Jacobian data |
| Transition gap | $\Delta E_{a\to b}^{\mathrm{env}}$ and the clock/rate conversion used for observer comparison |
| Channel decision | Planar-mode gate status, non-radiative alternatives, and whether $E_{\gamma,\min}$ is active in the chosen model |
| Photon output or capture | $E_\gamma$, $\mathbf p_\gamma$, direction, phase frequency, local photon-channel speed $c_\gamma$, and Gate A null-branch status |
| Polarization handoff | Transverse basis, helicity label where applicable, accepted/rejected capture channel, Gate B event-residual status, and closure status |
| Recoil and medium terms | $\Delta E_{\mathrm{recoil}}$, $\Delta \mathbf p_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, $\Delta \mathbf p_{\mathrm{med}}$, and any residual atomic excitation |
| Path-history provenance | Source identities, emission times, active causal-root branches, branch Jacobians, and delayed wake history needed for deterministic replay |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate |

### Absorption and Stimulated Channels

Absorption is the inverse Gate C vertex: an incoming coaxial contra-rotating pro/anti planar pair is captured by the atomic assembly and folded into a higher envelope basin when the capture geometry and gap condition match. In compact form,

$$
b+\gamma \to a,
\qquad
E_\gamma+\Delta E_{\mathrm{med}}+\Delta E_{\mathrm{recoil}}
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
$$

This is ordinary photon capture by the same atomic assembly. It changes the assembly's envelope basin and closes the incoming photon ledger, but it is not a general particle-production rule. If the event has different outgoing Standard Model assemblies, the channel must be written as a reaction or pair channel with a separate identity-routing row for the target or Noether sea content that supplies those outgoing inventories.

The same event record must decide whether the photon is absorbed, re-emitted, scattered, reflected, or routed into medium excitation. A failed capture is not an ontology failure; it is a channel-routing outcome whose energy and momentum must still close.

The material-surface version replaces a single isolated atomic pair of basins with a resolved surface cell. For a cell with electron-envelope branch $\mathcal B_e$, nuclear assembly ledger $\mathcal A_{\mathrm{nuc}}^{Z,N}$, bonding or lattice branch $\mathcal B_{\mathrm{lat}}$, local Noether sea record $\Theta_E^{(\ell)}$, and incoming photon ledger $\gamma_{\mathrm{in}}$, the capture question is whether the material return map sends the local state into an absorbed, re-emitted, scattered, reflected, heated, or retained-excitation basin. Its energy row is

$$
E_{\gamma,\mathrm{in}}
=
E_{\gamma,\mathrm{out}}
+
\Delta E_{e\text{-env}}
+
\Delta E_{\mathrm{lat}}
+
\Delta E_{\mathrm{sea}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{rem}}
$$

This is the same Gate C vertex as atomic absorption, but with the final state distributed over the material branch rather than one isolated envelope label. A Vantablack-like branch is a high-depth repeated-capture limit with $E_{\gamma,\mathrm{out}}\approx0$ after many cells. A metal-like branch is a coherent re-release limit in which the conduction-electron response carries most of the incoming ledger back into an outgoing planar-pair mode. Both limits remain provisional until the same basin-measure and event-ledger program recovers standard absorption, reflection, scattering, and thermalization behavior.

Stimulated emission and absorption belong to the same Gate C rate program. In the weak homogeneous validated limit, the coarse-grained transition ledger must recover the usual detailed-balance relation:

$$
\Gamma_{a\to b+\gamma}\,f_a\,(1+\bar n_\gamma)
=
\Gamma_{b+\gamma\to a}\,f_b\,\bar n_\gamma
$$

Here $f_a$ and $f_b$ are ensemble occupation weights for the atomic basins and $\bar n_\gamma$ is the effective photon occupation. This is an observer-level recovery target, not a substrate postulate.

Optical dispersion adds the line-strength version of the same target. In the old Lorentz-Drude comparison, anomalous dispersion and absorption were summarized by an effective population of resonant oscillators for each line. The quantum correction was to read that measured coefficient through Einstein transition probabilities rather than as a literal count of independently vibrating electrons. In this chapter that coefficient belongs with Einstein coefficients and oscillator strengths as an observer-level comparison object. It must be recovered from the same Gate C rate ledger that supplies emission, absorption, stimulated channels, and detailed balance.

Matrix mechanics is the algebraic face of this Gate C target. Heisenberg's replacement of classical Fourier modes by indexed transition amplitudes is safe here only as observer-level comparison: the indices label pre/post atomic basins, the intensities project from Gate C rates, and the noncommutative product records how sequential transition quantities compose through intermediate basin labels. The multiplication rule is a recovery target for effective operator algebra, not a substrate postulate.

The practical rule is that a line may not use one event record for its frequency and another for its strength. For a transition pair $a,b$, the envelope gap, photon-capture or photon-emission rate, absorption strength, dispersion strength, and stimulated-channel coefficients all have to project from the same pre/post atomic basins, local Noether sea state, photon branch, recoil rows, and ensemble occupation weights. If optical dispersion can be matched only by assigning a separate resonator population unrelated to the Gate C basin-measure rate, the standard dispersion formula has been fitted rather than recovered.

### Gate C Rate Target

The native rate target should be a basin-measure statement over deterministic atomic, photon, and local Noether sea microstates. For a record window $T$, a schematic form is

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T}\,
\mu_T\!\left\{
\zeta\in\mathcal B_a:
\Phi_T(\zeta)\in\mathcal B_{b+\gamma}
\right\}
$$

The set $\mathcal B_a$ denotes the resolved microstate basin corresponding to the effective atomic state $a$, $\mathcal B_{b+\gamma}$ denotes the basin in which the lower atomic state and outgoing photon assembly are accepted, $\Phi_T$ is the deterministic return map across the record window, and $\mu_T$ is the unresolved-material measure induced by the local ensemble and path-history distribution.

In the validated weak-coupling limit, this rate must reduce to the familiar transition-rate structure:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\longrightarrow
\frac{2\pi}{\hbar}
\left|
\langle b;\gamma|\widehat V_{\mathrm{eff}}|a;0\rangle
\right|^2
\rho_\gamma(\Delta E)
$$

The operator $\widehat V_{\mathrm{eff}}$ is only an effective comparison object. The foundation-up burden is to show that its matrix-element behavior emerges from overlap and capture probabilities between the atomic assembly and the photon planar-mode branch. The same passage must recover the effective electromagnetic coupling scale $\alpha$ without treating $\alpha$ as a separate ontology.

The finite-window definition above supplies the provenance version of the same limit: for long windows and weak coupling, the basin-measure rate must factor into an effective amplitude squared and a final-state density. Equivalently,
$$
\Gamma_{a\to f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\rightarrow
2\pi\,
\left|\mathcal{M}_{a\to f}^{\mathrm{eff}}\right|^2
\rho_f
$$
after unit conventions are fixed. The important closure is not the symbol $\mathcal{M}$ itself; it is that the same event window, source basin, accepted photon branch, recoil row, and residual row generate both the discrete line rate and the continuum final-state density used by the comparison formula.

Selection rules should be carried as Gate C closure targets. In this framing, an allowed line corresponds to a nonzero basin measure for the accepted photon channel after energy, momentum, transverse angular momentum, parity-like geometry, and local Noether sea constraints are applied. A forbidden or suppressed line corresponds to zero or small basin measure in the leading channel, with possible recovery through higher-order routing, medium coupling, or multi-photon channels only when the event ledger closes.

### Observer-Level Recovery

The benchmark recoveries for this page are:

- spectral line frequencies after local clock/rate conversion;
- absorption and emission rates in the Fermi's Golden Rule limit;
- Einstein coefficient relations and detailed balance in thermalized ensembles;
- natural line widths as a recovery target for transition-time and basin-escape statistics;
- recoil, Doppler, pressure, Zeeman, Stark, fine-structure, and hyperfine corrections only after the relevant transport, medium, and spin-ledger dependencies are supplied.

Spin-sensitive line structure remains downstream of the angular-momentum proof program. This page may record the event ledger for such lines, but fine-structure, spin-orbit, Zeeman, and hyperfine interpretations must inherit the completed internal spinor ledger and measurement-response model rather than being derived from atomic spectra alone.

Cosmology-facing use of any line should keep source-branch changes separate from propagation. In the redshift factorization of [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#observable-frequency-form), an altered transition gap belongs in $B_X(E)$, while endpoint cadence, launch motion, and Noether sea path accumulation belong in their own factors. The [21 cm hydrogen line example](../../../../markdown/aaa/cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) applies this rule to hyperfine emission without treating the hyperfine splitting as closed here.

### Closure Status

Accepted ontology: a photon emitted or captured in this channel is a coaxial contra-rotating pro/anti planar pair, and atomic line radiation is a routed assembly-level transition rather than excitation of a separate fundamental electromagnetic field.

Derivation targets: compute $\mathcal S_{\gamma}^{\mathrm{at}}$, recover the weak-coupling transition-rate limit, derive selection-rule basin measures, close recoil and medium ledgers, and recover detailed balance without changing the Noether sea state map between emission, absorption, and thermal ensembles.

Effective summaries: orbital labels, line frequencies, Einstein coefficients, oscillator strengths, and effective operators remain useful comparison objects when their closure status is stated.

Speculative extensions: minimum stable photon energy, Noether sea-dependent line deviations, and basin-escape explanations of linewidths should remain provisional until the standard isolated-atom limits are recovered.

## Bremsstrahlung

Bremsstrahlung ("braking radiation") is electromagnetic emission generated when a charged particle is accelerated by another charge, typically an electron deflected by an ion or nucleus. Because the acceleration history spans many scattering angles and impact parameters, bremsstrahlung produces a broad continuum rather than a line spectrum. In practice it is a core process in nuclear and particle experiments, hot-plasma diagnostics, and high-energy astrophysical source modeling.

### Teaching Path

This chapter is organized in three layers:

1. **Standard baseline:** what is already established (mechanism, emissivity, scaling laws).
2. **Radiation inheritance:** how the channel specializes the shared closure-residual routing in [Radiation](../../../../markdown/aaa/reactions/radiation.md).
3. **$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping layer:** how the same observables are re-expressed in assembly-language terms.

Read left-to-right as: baseline physics $\rightarrow$ shared radiation routing $\rightarrow$ channel-specific ontology mapping.

Terminology in this chapter follows [mode-taxonomy.md](../../../../markdown/aaa/reactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

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
- $\rho_{\text{NS}}(\mathbf{x},t)$: local physical Noether braid density.

### Physical Mechanism

In a Coulomb encounter, the projectile momentum changes by $\Delta \mathbf{p}$, and this acceleration drives radiation. For electron-ion bremsstrahlung, emitted power increases with target charge and projectile energy, while spectral shape is set by scattering kinematics, screening, and medium optical depth.

At low photon energies, multiple small-angle encounters contribute strongly and infrared-safe observables require inclusive treatment. At high energies, relativistic corrections, recoil, and quantum suppression effects become important.

### Prerequisites (Minimal)

- Photon assembly ontology (planar-mode nested shell braid language at micro level).
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
\text{planar-mode photon, recoil, medium excitation, or residual internal energy}
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
\right)
$$

Here $\Gamma_e(t)$ is the electron-assembly microstate, $\mathcal{C}_{o'j}(t)$ and $J_{o'j}$ are the active causal-root and Jacobian data during the target encounter, $Z$ and $b$ summarize the observer-level target charge and impact-parameter geometry, and $\left\| d\mathbf{v}_e/dt\right\|$ is the deceleration magnitude. This equation does not derive the QED bremsstrahlung cross-section. It names the closure functional that must later recover the validated cross-section and emissivity limits.

The corresponding excitation energy is inherited from the radiation basin definition:

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_C(\Gamma_{e,\text{post shock}})
-
E_C(\Gamma_{e,\text{nearest stable rung}})
$$

The planar-mode gate is likewise inherited:

$$
\mathcal{S}_{\gamma}^{\mathrm{br}}
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}^{\mathrm{br}}\ge E_{\gamma,\min}
$$

Only when both conditions are met is photon output allowed. If the closure residual remains below the planar-mode basin, or if $E_{\text{exc}}^{\mathrm{br}}$ is sub-threshold, the event must route energy into medium excitation, recoil, or residual internal energy instead of treating the missing photon as a silent loss.

#### Wake Shock Definition (Channel Specialization)

In this document, a **wake shock** is the bremsstrahlung name for the inherited radiation closure residual when it is produced by strong target-induced deceleration of the electron Noether braid assembly. It is not merely a descriptive label for radiation. Operationally, it is the threshold crossing where the electron assembly's internal curvature mode is driven across the field-speed symmetry point in the middle binary (near $v \approx c_f$), creating a transient high-curvature state that can shed energy into the surrounding Noether sea.

A minimal trigger condition is written as

$$
\mathcal{I}_e\!\left(\rho_{\text{NS}}(\mathbf{x},t),\left\|\frac{d\mathbf{v}_e}{dt}\right\|,\Xi_e\right) \ge \mathcal{I}_{\mathrm{crit}}
$$

where $\Xi_e$ denotes electron-assembly internal state variables. In Master Equation language, wake shock onset corresponds to entry into the emission-capable region of state space, with transition kernel weight from non-emissive to emissive microstates increased above baseline.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, the projectile electron assembly enters the dense wake potential of a target with charge decorations $Z$. Path curvature and deceleration generate a wake shock in the electron assembly by increasing $\mathcal{R}_{\Theta}^{\mathrm{br}}$. In the canonical Master EOM, the received interaction is shaped not only by inverse-square proximity but also by receiver-normal bunching of delayed causal flux along the active branches during the deflection. When the local shock intensity exceeds the inherited planar-mode stability threshold, shed energy nucleates a photon mode modeled as a coaxial contra-rotating pro/anti planar pair in the Noether sea. This reframes "acceleration drives radiation" as an assembly transition channel rather than a purely classical wave statement.

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
\mathcal Q_{\mathrm{rem}}^{0}
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
\Delta E_{\text{rem}}
$$

where $E_{\gamma}$ is emitted photon energy, $\Delta E_{\mathrm{recoil}}$ is target recoil energy, $\Delta E_{\mathrm{med}}$ is genuine medium excitation (for example plasmons/phonons in dense environments), and $\Delta E_{\text{rem}}$ is residual internal excitation left in the source assembly. The projectile energy loss $\Delta E_e$ supplies this ledger at event level, with the common approximation $\Delta E_e\approx E_{\text{exc}}^{\mathrm{br}}$ used only when untracked stopping, recoil preparation, and remnant channels are negligible. In the lone heavy-target limit, $\Delta E_{\mathrm{recoil}} \approx 0$ energetically but still carries momentum closure. Mapping work focuses on identifying when wake-shock energy crosses the photon-composite stability threshold so discrete photon output is recovered from continuous transport.

Interpretive takeaway: this section defines event-level state transition and bookkeeping, not a replacement of validated QED cross-sections.

#### Provisional Effective Parameterization (Pending Derivation)

To make the wake language calculable, the $\mathbb{A}\mathbb{A}\mathbb{A}$ program uses a provisional mapping ansatz. The variable $\mathcal{S}_{\mathrm{wake}}$ is an effective proxy for the inherited photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{br}}$, not a separate radiation ontology. This is a working effective form pending derivation from the Master Equation, not a claimed first-principles closure:

$$
\mathcal{S}_{\mathrm{wake}} \equiv A_{\mathrm{tb}} \, \bigl[\rho_{\text{NS}}(\mathbf{x},t)\bigr]^{\alpha} \left\|\frac{d\mathbf{v}_e}{dt}\right\|^{\beta}
$$

Conceptual nucleation picture for this ansatz: a photon mode modeled as a coaxial contra-rotating pro/anti planar pair is treated as a stable attractor that appears only when wake-driven internal concentration exceeds a local stability barrier. The threshold scale $\mathcal{S}_*$ represents the effective bremsstrahlung proxy for $\mathcal{S}_{\gamma,*}$ and is interpreted as an effective function of Noether sea stiffness plus local nested shell braid geometry. The coupling through $E_{\text{exc}}^{\mathrm{br}}/E_{\gamma,\min}$ represents available shed energy relative to minimum stable planar-mode cost. The exponential response is used as a first-pass survival-style ansatz for threshold crossing with sensitivity to local fluctuations; it is not yet claimed as unique.

$$
P_{\mathrm{nuc}}(E_\gamma) = 1 - \exp\!\left[-\left(\frac{\mathcal{S}_{\mathrm{wake}}-\mathcal{S}_*}{\mathcal{S}_*}\right)_+ \left(\frac{E_{\text{exc}}^{\mathrm{br}}}{E_{\gamma,\min}}\right)\right]
$$

with $(x)_+ \equiv \max(x,0)$. Here $A_{\mathrm{tb}},\alpha,\beta,\mathcal{S}_*$ are effective Noether sea response parameters. This is explicitly a mapping goal, not yet a closed derivation.

Interpretation of coefficients:

- $A_{\mathrm{tb}}$: normalization for assembly-to-medium coupling strength.
- $\alpha$: sensitivity exponent to local Noether sea density.
- $\beta$: sensitivity exponent to deceleration magnitude.
- $\mathcal{S}_*$: effective bremsstrahlung proxy for the inherited planar-mode onset scale $\mathcal{S}_{\gamma,*}$.

Status and handling:

- Parameters are phenomenological placeholders with bounded priors, to be reduced or eliminated by Master Equation derivation.
- If fit is required before derivation, parameter count and uncertainty ranges are tracked explicitly as theory-cost items, rather than treated as hidden freedom.
- Parsimony assessment is therefore provisional until derivation quality is established in the foundations track.

For gravity integration, the same source terms can be expressed through the emergent metric fields that govern local geodesics:

$$
\mathcal{S}_{\mathrm{wake}} = \mathcal{S}_{\mathrm{wake}}\!\left(g_{\mu\nu},\nabla g_{\mu\nu},u_e^\mu,\rho_{\text{NS}}(\mathbf{x},t)\right)
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
\epsilon_{\nu}^{\mathrm{ff}} \propto Z^2 n_e n_i T^{-1/2} e^{-h\nu/(k_B T)} g_{\mathrm{ff}}(\nu,T)
$$

where $Z$ is ion charge, $n_e$ and $n_i$ are number densities, and $g_{\mathrm{ff}}$ is the Gaunt factor (quantum correction). In dense plasma or condensed regimes, screening-length limits (Debye/collective shielding) modify both the effective interaction range and the integration limits folded into $g_{\mathrm{ff}}$. Frequency-integrated thermal emissivity scales approximately as

$$
\epsilon_{\mathrm{ff}} \propto Z^2 n_e n_i T^{1/2}
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

Use the same photon-channel event record here as in [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). A bremsstrahlung planar-mode event should record:

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

Interpretation split:

- **Epistemic reinterpretation (default-safe):** sub-threshold energy loss is attributed to local Noether sea heating rather than resolved soft-photon quanta, while inclusive observables remain QED-standard in tested regimes.
- **Ontic prediction (conditional):** if $E_{\gamma,\min}$ is above current soft-photon sensitivity, the model predicts a measurable low-frequency turnover at $\nu_{\min}=E_{\gamma,\min}/h$.

Status: this chapter treats the claim as epistemic by default and promotes ontic turnover as a conditional extension.

Connection to the photon closure interface: $E_{\gamma,\min}$ should be read as a candidate expression of the planar-pair stability boundary, not as a free cutoff. The first derivation must decide whether that boundary vanishes, lies below current soft-photon sensitivity, or produces a measurable turnover while preserving inclusive QED observables.

### $Z^2$ Scaling and Finite-Geometry Resolution

The leading $Z^2$ behavior follows coherent target-charge action at large impact parameter and low momentum transfer. At sufficiently small impact parameter $b$ (high $q$), the projectile resolves finite target geometry and coherence drops.

- **Coherent regime ($b \gg R_{\mathrm{nuc}}$):** interaction with aggregate nuclear charge; power tracks $\propto Z^2$.
- **Incoherent-resolution regime ($b \lesssim R_{\mathrm{nuc}}$):** interaction resolves constituent proton assemblies; scaling moves toward $\propto Z$ with suppression encoded by nuclear form factor $F(q^2)$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping, finite geometry is explicitly the spatial distribution of proton nested shell braids in the nucleus. Deviation from pure $Z^2$ is therefore the observable transition from coherent whole-assembly wake coupling to resolved sub-assembly coupling, with additional screening from the atomic electron envelope.

A gravity-coupled extension can be written as

$$
\frac{d\sigma}{dk} \propto Z_{\mathrm{eff}}^2 \, |F(q^2)|^2 \, \left[1+\delta_g(r,\Phi)\right]
$$

where $\delta_g$ parameterizes local metric/Noether sea corrections. For standard nuclei in laboratory regimes, $\delta_g$ is expected to be subdominant; the term is retained so compact-object surface applications can be treated in one formalism.

### Momentum-Flux Closure at Emission

$\mathbb{A}\mathbb{A}\mathbb{A}$ mapping enforces local momentum-flux balance at the emission vertex:

$$
\Delta \mathbf{p}_e + \mathbf{p}_{\gamma} + \Delta \mathbf{p}_{\mathrm{recoil}} + \Delta \mathbf{p}_{\mathrm{med}} = 0
$$

Photon emission angle is therefore constrained by incident electron momentum, target potential geometry, and local wake transfer into planar mode plus recoil channel. For isolated heavy targets, momentum closure is dominated by $\Delta \mathbf{p}_{\mathrm{recoil}}$ with negligible recoil energy; medium momentum terms are reserved for explicit collective-excitation environments. This is the micro-level closure condition behind macroscopic angular spectra.

The radiation-zone benchmark is stronger than total momentum balance. In the straight-line deceleration limit, with $\mathbf{v}\parallel\mathbf{a}$, $\beta=\|\mathbf{v}\|/c$, $\gamma=(1-\beta^2)^{-1/2}$, and $\theta$ the angle between the outgoing radiation direction and $\mathbf{v}$, the observer-level angular power target is

$$
\frac{dP_{\mathrm{br,std}}}{d\Omega}
=
\frac{q^2\|\mathbf{a}\|^2}{16\pi^2\epsilon_0c^3}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^5}
$$

The corresponding total-power target is

$$
P_{\mathrm{br,std}}
=
\frac{q^2\gamma^6\|\mathbf{a}\|^2}{6\pi\epsilon_0c^3}
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
-1
$$

In validated weak-field bremsstrahlung regimes, $\Delta_{\mathrm{br,pow}}\rightarrow0$ and $\Delta_{\mathrm{br,ang}}(\theta)\rightarrow0$ after screening, recoil, and form-factor corrections are applied through the same event record. The emitted photon ledger must also pass $\Delta_{\gamma,\mathrm{flux}}=0$ from [Radiation](../../../../markdown/aaa/reactions/radiation.md); otherwise a correct-looking photon spectrum has not closed the local energy-momentum route.

### Time Parameterization (Absolute vs Proper Time)

Rate equations in this file are observer-level unless noted. For substrate-level $\mathbb{A}\mathbb{A}\mathbb{A}$ transport, convert via

$$
\frac{dE_e}{d\tau_e} = \frac{dE_e}{dt}\,\frac{dt}{d\tau_e},
\qquad
\frac{dt}{d\tau_e} = \Gamma_{\mathrm{eff}}(v_e,\rho_{\text{NS}}(\mathbf{x},t),\Phi)
$$

For operational closure in this chapter, use the provisional split

$$
\Gamma_{\mathrm{eff}} \approx \gamma(v_e)\,\left[1+\delta_{\rho}(\rho_{\text{NS}}(\mathbf{x},t))+\delta_{\Phi}(\Phi)\right]
$$

with $\gamma(v_e)=1/\sqrt{1-v_e^2/c^2}$ and $|\delta_{\rho}|,|\delta_{\Phi}|\ll 1$ in laboratory and weak-field astrophysical regimes where standard relativistic timing is already validated. The full derivation and regime-dependent corrections are delegated to the metric/time foundations chapter; this file uses the above form as a controlled working map.

This keeps cooling in proper time and substrate evolution in absolute time explicitly connected.

### Cosmological Propagation and Redshift Map

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

The observer-level mapping target is then

$$
\epsilon_\nu^{\mathrm{obs}}(R) = (1+z_X)^{-4}\,\epsilon_{\nu(1+z_X)}^{\mathrm{ff}}(E)\,\mathcal{T}(\nu, E\to R)
$$

where $\mathcal{T}$ is the transfer factor for absorption, scattering in plasma, and any Noether sea-specific opacity. The $Y_{X,\mathrm{path}}$ term records signed frequency exchange along the path; $\mathcal{T}$ must not hide an unlogged photon-energy gain or loss. In the standard homogeneous limit this reduces to the conventional redshift notation with $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$.

### Thermal Equilibrium Assumptions in Evolving Noether Sea States

The free-free forms above assume local thermodynamic equilibrium (LTE). In evolving Noether sea states, define

$$
\mathcal{R}_{\mathrm{LTE}} \equiv \frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

- **$\mathcal{R}_{\mathrm{LTE}} \ll 1$:** assembly-medium coupling is fast, LTE emissivity is valid with instantaneous state variables.
- **$\mathcal{R}_{\mathrm{LTE}} \gtrsim 1$:** non-equilibrium corrections are required; emissivity must be computed from evolving distribution functions rather than a single local $T$.

This ratio provides a diagnostic for when LTE-based closure is expected to hold.

### Geodesics and Lensing Consistency

Bremsstrahlung photons, once emitted, are modeled as propagating on null geodesics of the emergent metric:

$$
ds^2 = 0,\qquad k^\mu \nabla_\mu k^\nu = 0
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

## Synchrotron

Synchrotron cascades are coupled electromagnetic processes in which relativistic charged particles radiate synchrotron photons in magnetic fields, and those photons then trigger secondary channels such as pair production and further radiation. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

### Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics.

Terminology in this chapter follows [mode-taxonomy.md](../../../../markdown/aaa/reactions/mode-taxonomy.md): photon emission is described as **planar-mode nucleation**; `corridor` terms are reserved for weak-channel contexts.

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

This is the observer-level mechanism. The $\mathbb{A}\mathbb{A}\mathbb{A}$ layer below does not replace these formulas; it asks which Noether braid velocity deformation, anisotropic Noether sea state, and closure residual must be present for the same photon output to occur.

### Core Equations

A standard synchrotron power scale is

$$
P_{\mathrm{syn}} = \frac{4}{3}\sigma_T c\,U_B\,\gamma^2
$$

with magnetic energy density

$$
U_B=\frac{B^2}{8\pi}
$$

The characteristic photon energy is set by

$$
E_{\gamma,\mathrm{syn}} \sim h\nu_c \propto \gamma^2 B
$$

For pitch angle $\alpha$, a standard critical-frequency expression is

$$
\nu_c = \frac{3}{2}\gamma^2\frac{eB}{2\pi m_e c}\sin\alpha
$$

For isotropic pitch-angle distributions, $\langle\sin\alpha\rangle = \pi/4$, so ensemble-averaged characteristic frequency becomes $\nu_c \approx (3e/4\pi m_e c)\gamma^2 B$.

An operational energy-loss (cooling) timescale relation is

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

Here $\tau_{\mathrm{syn}}$ denotes a characteristic energy-loss timescale ($E/|dE/dt|$), distinct from the instantaneous synchrotron power rate $P_{\mathrm{syn}}$.

Cascade closure then depends on whether photon energies and path lengths satisfy pair-production thresholds and interaction depths in the local radiation field.

These equations and thresholds are the observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping must recover in validated limits.

#### Spectral Shape and Cooling Breaks

For power-law injection $N(\gamma) \propto \gamma^{-p}$, the synchrotron emissivity in the slow-cooling regime ($\tau_{\mathrm{syn}} > \tau_{\mathrm{esc}}$) follows

$$
j_\nu \propto \nu^{-(p-1)/2}, \quad \nu < \nu_{\mathrm{max}}
$$

where $\nu_{\mathrm{max}} \propto \gamma_{\mathrm{max}}^2 B$ is the maximum synchrotron frequency set by the highest injected Lorentz factor.

In the fast-cooling regime ($\tau_{\mathrm{syn}} < \tau_{\mathrm{esc}}$), electrons cool to a break Lorentz factor

$$
\gamma_{\mathrm{cool}} \approx \frac{6\pi m_e c}{\sigma_T B^2 t_{\mathrm{esc}}}
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

Synchrotron emission is the curved charged-assembly transport specialization of the shared radiation program in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The standard phrase "a magnetic field bends a relativistic charge and the charge radiates" remains the observer-level baseline. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ map, the channel-specific claim is narrower: anisotropic Noether sea transport and gradient forcing deform the moving Noether braid faster than its internal closure ledgers can retune, leaving a residual that may enter the planar-mode basin.

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
a\in\{I,M,O\}
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
\right)
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

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Synchrotron emission channel:** curved charged-assembly transport through an anisotropic Noether sea state produces $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ by Noether braid velocity deformation and gradient forcing. If the inherited planar-mode threshold is crossed, the event nucleates [photon assemblies](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) from interaction energy / wake stress while conserving charged-assembly identity. The photon-side target is the canonical **coaxial contra-rotating pro/anti planar pair** description.
- **Pair channel:** two-photon overlap, with each photon treated as a coaxial contra-rotating pro/anti planar pair, associates local substrate content into a charged $e^+e^-$ assembly pair; this association must strictly conserve net architrino count and charge of participating assemblies (photons + neutral Noether sea braids $\rightarrow e^+ + e^-$), with provenance and conservation bookkeeping explicit.
- **Cascade loop:** repeated emission-pair-emission cycles are modeled as repeated mode-lock events under the same observer-level thresholds.

### Shared Photon Event Record

Use the same photon-channel event record here as in [Radiation](../../../../markdown/aaa/reactions/radiation.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). A synchrotron planar-mode event should record:

- charged assembly identity, energy, momentum, pitch geometry, and path-history provenance before and after the curved transport segment;
- Noether braid velocity-deformation state, effective magnetic-state map $\mathcal{V}_{\mathrm{NS}}$, gradient forcing $G_{\text{grad}}$, and local Noether sea variables $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, excitation state, and causal-branch Jacobian data;
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
\right\rangle_{\mathbf{x}\in K}^{1/2}
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
\right)
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

- **Synchrotron emission (provisional):** a charged Noether braid assembly in curved transport through $\mathcal{V}_{\mathrm{NS}}$ develops a Noether braid velocity deformation. Gradient forcing $G_{\text{grad}}$ and receiver-normal causal-branch bunching can leave $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ after ordinary adiabatic retuning fails; when the associated wake-strain state crosses the inherited planar-mode threshold, a photon assembly nucleates and carries the photon-row share of the source-depletion ledger. Recoil, medium, wake, handoff, and remnant rows close the rest. This nucleation threshold must be derivable from wake-strain eigenvalue conditions in simulations; hand-tuning the threshold to match observed $P_{\mathrm{syn}}(\gamma,B)$ or $\nu_c\propto\gamma^2B$ constitutes a fit, not a derivation. The mapping succeeds only if the threshold emerges naturally from the architrino master equation applied to curved charged-assembly trajectories in anisotropic Noether sea states.
- **Magnetic field ontology (provisional mapping):** observer-level $B$ is treated as the effective coarse-grained directional (vector/tensor) vorticity-anisotropy state of the Noether sea, $B \leftrightarrow \mathcal{V}_{\mathrm{NS}}$, not as a separate fundamental void field. This is a mapping target, not settled ontology. Charged-assembly curvature is therefore interpreted provisionally as transport through an anisotropic Noether sea state with explicit directionality. In validated limits, this mapping must: (i) derive the effective Lorentz-force law $\mathbf{F}_{\mathrm{eff}} = q(\mathbf{v}/c) \times \mathbf{B}_{\mathrm{eff}}$ from anisotropic Noether sea transport together with the receiver-normal geometry of delayed causal flux, rather than by postulating a primitive cross-product force term; (specifically, show that vorticity-tensor gradients $\partial_i \mathcal{V}^j_{\mathrm{NS}}$ produce perpendicular deflection under boost); (ii) reproduce Maxwell-level electromagnetic-wave propagation (dispersion relation $\omega = ck$ for photon modes in uniform $\mathcal{V}_{\mathrm{NS}}$); (iii) recover synchrotron polarization geometry ($\mathbf{E}_\gamma \perp \mathbf{B}_{\mathrm{eff}}$, $\mathbf{E}_\gamma \perp \mathbf{v}$ in observer frame) from directional emission rules in the Noether sea anisotropy basis, while inheriting photon helicity and analyzer statistics from Gate B rather than deriving them locally. **Falsification criterion:** if simulations with anisotropic Noether sea states fail to produce the factor-of-$\gamma^2$ frequency scaling in $\nu_c$ (tested via swept $B$-field and $\gamma$ at fixed pitch angle), or if polarization vectors misalign with standard geometry by $>15^\circ$ systematically, this magnetic mapping is unresolved or failed and must be replaced by a new Noether sea / assembly response map.
- **Pair production mapping (provisional):** $\gamma+\gamma\rightarrow e^+ + e^-$ is treated as nucleation of charged assemblies from local Noether sea energy-density concentration triggered by overlap of two photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs above threshold, not ex nihilo creation. The incoming photon assemblies supply energy, momentum, and trigger geometry, not new architrino identities; the recruited Noether sea content must supply the identity-routed inventory. The nucleation threshold must map to the standard kinematic condition $s\ge 4m_e^2$, and the effective rate must asymptotically reproduce the Breit-Wheeler cross-section in the relativistic limit used by cascade modeling. Operational constraint: pair-channel cross-section $\sigma_{\gamma\gamma}(s)$ computed from this nucleation picture must reproduce
$$
\sigma_{\gamma\gamma} = \frac{\pi r_e^2}{2}\left(1-\beta^2\right)\left[\left(3-\beta^4\right)\ln\left(\frac{1+\beta}{1-\beta}\right) - 2\beta(2-\beta^2)\right]
$$
(where $\beta = \sqrt{1-4m_e^2c^4/s}$) to within factor-of-2 accuracy across the range $4m_e^2c^4 < s < 100m_e^2c^4$ used in cascade modeling. Deviations larger than this bound would constitute observable new physics and require dedicated experimental tests beyond astrophysical inference.

These mapping targets are ontology-level and must reduce to standard synchrotron/pair-production observables in validated limits.

#### Curvature Convention

In this chapter, "curved transport" means Euclidean-space trajectory curvature of charged assemblies under effective magnetic forcing at substrate level. Observer-level curved-spacetime language is used only as an effective description of transport and timing, not as a replacement for the substrate trajectory picture.

Operationally: compute emissivity and spectra with standard observer-frame equations; interpret underlying trajectory control through the Noether sea anisotropy map when using $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The channel-local curvature object is therefore the Noether braid velocity deformation along the charged assembly's Euclidean trajectory, together with gradient forcing from $G_{\text{grad}}$ and anisotropy from $\mathcal{V}_{\mathrm{NS}}$. Effective geodesic language may still be used for observer-frame propagation and timing, but it is not the event-level cause of planar-mode nucleation in this chapter. Both descriptions must produce identical observer-frame synchrotron emissivity in weak-gravity zones; distinguishing experiments would require near-horizon synchrotron mapping or laboratory strong-field tests.

#### Conservation Note for Pair Production

This chapter uses the nucleation interpretation (not creation from nothing): pair channels reorganize substrate content into new charged assemblies. In this ontology, each architrino has provenance and identity through path history in absolute time; interaction channels redistribute and relock existing constituents rather than instantiate new substrate entities.

Thus, when this channel says the incoming photons are consumed, it means their free planar-pair ledgers terminate at the vertex and their energy-momentum and Gate B handoffs enter the event record. It does not mean the outgoing $e^+e^-$ worldlines are simply the photon constituents under new labels. The charged-pair inventories must be supplied by identity-routed local substrate content.

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

### Observer-Frame Transport

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
j_{\nu}^{\mathrm{obs}}(R) = (1+z_X)^{-3} \, j_{\nu(1+z_X)}^{\mathrm{em}}(E)\,\mathcal{T}(\nu,E\rightarrow R)
$$

Here $\mathcal{T}(\nu,E\rightarrow R)$ is the cumulative transfer function including absorption (for example, $e^{-\tau_{\gamma\gamma}(\nu,z)}$ for pair production on extragalactic background light) and any intervening scattering. The signed $Y_{X,\mathrm{path}}$ term must carry any Compton/Sunyaev-Zeldovich-like frequency exchange rather than being folded into a primitive expansion factor or hidden inside $\mathcal{T}$. For nearby sources ($z_X \ll 1$) with negligible path exchange, $\mathcal{T} \approx 1$.

In the standard homogeneous limit, $1+z_X$ reduces to the conventional transport notation $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must recover the conventional transport results used in high-energy astrophysics.

When the path includes plasma or conducting material, the transfer function must carry the same response rows used by [Radiation](../../../../markdown/aaa/reactions/radiation.md). In an effective plasma comparison,

$$
\epsilon_{\mathrm{eff}}(\omega)
\approx
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right),
\qquad
\omega_p^2=\frac{n_{\mathrm{car}}q^2}{m\epsilon_0}
$$

For $\omega>\omega_p$, the transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
$$

while $\omega<\omega_p$ is an evanescent or reflected transport row with $k=i\kappa_{\mathrm{ev}}$ rather than a lost photon ledger. Absorbing conductors use $k=k_1+ik_2$ and add an attenuation factor schematically of the form

$$
\mathcal{T}_{\mathrm{abs}}(\omega)
=
\exp\!\left[-2\int_{\mathrm{path}}k_2(\omega,s)\,ds\right]
$$

If $\epsilon_{\mathrm{eff}}(\omega)=0$ produces a longitudinal plasma oscillation, the cascade record routes it into medium excitation or plasmon-like content. It is not counted as a free photon branch and it cannot repair a failed Gate B no-longitudinal-mode check.

#### Absolute-Time vs Proper-Time Bookkeeping (Provisional)

In this file, $\tau_{\mathrm{syn}}$ is the observer-frame cooling timescale:

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}} \approx \frac{6\pi m_e c}{\sigma_T B^2\gamma}
$$

For ontology-level bookkeeping, use the conversion

$$
dt = \Gamma_{\mathrm{eff}}(v,\rho_{\text{NS}},n,\Phi)\,d\tau_{\mathrm{asm}}
$$

where $t$ is substrate absolute time and $\tau_{\mathrm{asm}}$ is assembly proper time. Then

$$
\left(\frac{dE}{dt}\right)_{\mathrm{abs}}=\frac{1}{\Gamma_{\mathrm{eff}}}\left(\frac{dE}{d\tau_{\mathrm{asm}}}\right),
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

### Anticipated Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Derive the synchrotron wake-strain threshold and $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ from Noether braid velocity deformation, $G_{\text{grad}}$, causal-branch Jacobians, and $\mathcal{V}_{\mathrm{NS}}$.
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

[^architrino-count]: Architrino-count conservation: each recruited Noether sea braid contributes $(N_{\mathrm{arch}})_{\mathrm{core}}$ architrinos; named braid content must exactly balance final $e^+ + e^-$ architrino count, and the event record must route the participating identities rather than assigning them to the photon channel. Explicit provenance tracking through pair events is a simulation deliverable, not an assertion in this chapter.
