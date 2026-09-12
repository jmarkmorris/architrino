# Reactions

## Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

For concrete channel applications of this vocabulary, see [Radiation](../../../../markdown/aaa/reactions/radiation.md), [Atomic Transition Radiation](../../../../markdown/aaa/reactions/atomic-transition-radiation.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [Electron](../../../../markdown/aaa/assemblies/fermions/electron.md), and [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md).

### Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

This taxonomy records the reaction channel grouping; it does not derive the angular-momentum or spin rule for that grouping. Photon Gate B, weak-corridor vector spin, Pauli/statistics closure, and spin-sensitive measurement outcomes inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md) and should remain marked as closure targets in reaction prose.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

An assembly is a configuration of [architrinos](../../../../markdown/aaa/foundations/architrino.md), the point entities with fixed polarity and no primitive mass. Their causal wakes record past emissions and determine later acceleration through the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md). The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) names ambient assembly contents in the Euclidean void; absolute time $T$ orders their histories. The following terms classify proposed transitions in those histories:

- **Mode-lock event:** a transition in the assembly classification when a driven Noether braid/wake configuration enters a propagating or bound mode. Calling the classification discrete does not impose a discontinuity on constituent paths; the candidate mode's existence, formation, and persistence require separate dynamical evidence.
- **Wake-strain threshold:** a proposed channel-specific boundary in admissible path-history space, expressed through a declared diagnostic of delayed acceleration and assembly response. A threshold crossing alone establishes neither capture into a mode nor its stability.
- **Nucleation:** relocking/reorganization of existing substrate content (with provenance-preserving architrino bookkeeping), not creation ex nihilo.
- **Planar-mode nucleation (photon channels):** proposed lock-in to a coaxial contra-rotating polarity-conjugate planar-pair mode, with Gate A energy-momentum targets and Gate B transverse-ledger targets.
- **Corridor-mode nucleation (weak channels):** lock-in to corridor-type interaction modes used for $W^\pm/Z$ channel bookkeeping.
- **Pair nucleation:** local substrate recruitment/reconfiguration into $e^+e^-$ assemblies under threshold-satisfying two-photon forcing, constrained to recover standard kinematic and rate limits in validated regimes. The incoming photon ledgers close at the vertex; the outgoing charged-assembly identities require identity-routed substrate content rather than relabeling the photon constituents.

The coaxial contra-rotating polarity-conjugate planar pair is a proposed photon carrier whose acceleration-balance closure remains open. Consequently, `lock-in` and `stable planar-pair mode` vocabulary throughout this taxonomy is referent-pending; see Photon Referent Status in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md). The charged-pair and corridor assignments also require their own dynamical realizations. A compatible retained history must satisfy the acceleration law before perturbations can establish stability. Charge counts and channel names alone establish neither result.

Observer-level equations remain the operational layer. Agreement with threshold, cross-section, timing, and conservation benchmarks is necessary for an assembly interpretation; agreement obtained by inserting those benchmark equations is a comparison, not an independent derivation of the assembly mechanism.

### Low-Energy Standard Model Assemblies in the Noether Sea

This section is the canonical stepwise map for low-energy Standard Model channels interpreted in $\mathbb{A}\mathbb{A}\mathbb{A}$ language.

#### Regime Assumptions

- Each channel declares its energy and momentum-transfer range and the approximation used. The Standard Model (SM), quantum electrodynamics (QED), and quantum chromodynamics (QCD) supply observer-level comparison descriptions within their specified domains.
- The Noether sea supplies candidate ambient assembly content and response; its storage, transport, and relocking laws require derivation. It is physical content within absolute time and the Euclidean void, not their replacement.
- A laboratory or astrophysical location does not itself define a low-energy regime. Weak contact interactions require momentum transfers small compared with the mediator scale; classical radiation additionally requires control of quantum recoil and strong-field effects. The scenarios below have separate validity conditions.

#### Hybrid Standard Model Routing

A Standard Model comparison row must name which effective layer supplies the observer-level prediction. $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction language may then map the provenance and assembly changes, but it may not replace the validated Standard Model prediction source with an unmarked substrate story.

| Channel use | Observer-level prediction source | Required matching record |
| --- | --- | --- |
| Short-distance electroweak or collider channel | Renormalized perturbative chiral-gauge chart, with declared input scheme | Gauge-invariant amplitude or detector-level observable, scheme, order, expansion parameter, and systematic remainder |
| Low-energy weak or nuclear channel | Matched weak effective theory plus QCD or nuclear matrix elements | Operator basis, normalization, CKM/PMNS factor when applicable, matrix-element source, and uncertainty class |
| Hadronic strong channel | QCD calculation, lattice-QCD matrix element, factorization theorem, or validated phenomenological input | Color-singlet operator or infrared-safe observable, scale, scheme, and truncation or lattice-continuum record |
| Pure QED or transport channel | Validated QED, kinetic, or material-response model | Observable definition, medium assumptions, boundary conditions, and error budget |

The reaction row therefore records a Standard Model prediction as a structured object: energy regime, operator or detector functional, matching map, expansion or scaling parameter, remainder estimate, and consistency statements such as gauge invariance, unitarity, positivity, or infrared safety when the selected prediction source requires them. A finite regulator or fit trend is evidence only after this record states how the regulator is removed, matched, or bounded.

#### Canonical Stepwise Workflow

1. **Define observer-level channel** Use the standard reaction statement first (for example $e^- + Z \rightarrow e^- + Z + \gamma$ or $\gamma + \gamma \rightarrow e^+ + e^-$).

2. **Set validated closure targets** Declare the required observer-level closures before ontology mapping:
- kinematic threshold closure,
- differential/total rate closure,
- energy-momentum closure,
- timing/frame closure.

3. **Initialize assembly state** Record an observer-facing summary tuple: `(identity, provenance path, charge sector, momentum, local Noether sea state)`. This tuple is not sufficient initial data for the delayed acceleration law. Its provenance pointer must resolve to constituent identities, polarities, positions, velocities, compatible retained histories, boundary inputs, and all admitted causal roots, including self-hits. Any finite history truncation needs an omitted-history bound. Momentum is an assembly/observer readout, not a primitive architrino property.

4. **Characterize local Noether sea state** Specify Noether sea state variables used by mapping, with arguments suppressed only when the local context is clear: $(\rho_{\text{NS}}(\mathbf X,T), n(\mathbf X,T), \chi_{\text{sea}}(\mathbf X,T), \mathcal{V}_{\mathrm{NS}}, \nabla \rho_{\text{NS}}, \Phi_{\text{eff}}, T_{\mathrm{sea}}^{\mathrm{th}}, J_{\mathrm{loc}})$. Here $\rho_{\text{NS}}$ is the coarse-grained braid number density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ its normalization to a declared reference density, and $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ the delay factor for the dressed assembly channel. The gradient acts on native position $\mathbf X$, while $\Phi_{\text{eff}}$ is an effective potential whose observer map must be supplied. The quantity $\mathcal{V}_{\mathrm{NS}}$ is the candidate anisotropy/vorticity response used below, $T_{\mathrm{sea}}^{\mathrm{th}}$ is the effective temperature of an ensemble of internal excitations as in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md), and $J_{\mathrm{loc}}$ records the causal roots, their Jacobians, and same-record transmitter-side acceleration weights. These summaries require extraction from the retained histories; they do not define a closed constitutive evolution by themselves.

Magnetic-like observer language belongs at this mapping layer. At substrate level each primitive contribution acts along the delayed line joining an architrino transmitter to an architrino receiver. Projection perpendicular to an assembly's group velocity defines a transverse diagnostic; identifying any part of it with a magnetic response requires a separate effective-law derivation. Direct wakes, sea-mediated response, and mixed contributions remain possible until that derivation separates them.

For an assembly $A$, choose a center and an averaging convention, and let $\mathbf V_A$ be that center's group velocity relative to the declared frame. With $\|\mathbf{V}_A\| > 0$, define
$$
\Pi_{\perp}^{ij}(A)
=
\delta^{ij}-\hat V_A^i\hat V_A^j,
\qquad
\hat{\mathbf{V}}_A=\frac{\mathbf{V}_A}{\|\mathbf{V}_A\|}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f749e629ce4f75fc)

Here $i,j$ are Cartesian component indices and $\delta^{ij}$ is the Euclidean identity tensor. The projector removes the component parallel to $\mathbf V_A$; it is undefined at zero group velocity, where a channel must retain the full vector response or declare a separate physical axis. A candidate transverse-channel representation is
$$
A_{\perp,A}^{i}(T_r)
=
\Pi_{\perp}^{ij}(A)
\sum_{k}\sum_{T_t\in\mathcal{C}_{Ak}(T_r)}
\mathcal{K}_{Ak}\!\left(T_r;T_t,\mathcal{V}_{\mathrm{NS}},R_A\right)
\hat r_{Ak,j}(T_r;T_t)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-89a7192db3da63be)

The weight $\mathcal{K}_{Ak}$ has acceleration units and packages a declared constituent-to-center response, inverse-square causal-wake geometry, polarity, and the transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$. The factor $D_t$ records root transversality; its magnitude already supplies the branch density in $W^{\mathrm{acc}}$ and must not be multiplied in a second time. Retain a nonzero transversality floor and a complete root inventory on the simple-root chart; singular roots need the corresponding continuation or regularization treatment. Any Noether sea response in $\mathcal K$ must be independently derived or explicitly modeled, with its overlap with explicitly summed sea constituents removed. The argument $R_A$ records the assembly envelope scale and orientation. Neither this composite weight nor a fit to transverse acceleration derives an independent magnetic response law.

In this representation, $k$ must retain both a constituent receiver in $A$ and an architrino transmitter; $\mathcal{C}_{Ak}(T_r)$ is their causal-root set at reception time $T_r$, and $\hat r_{Ak,j}(T_r;T_t)$ is the corresponding delayed unit-direction component. Repeated $j$ is summed. An assembly center is not a primitive receiver. For fixed center weights $w_a$ with $\sum_a w_a=1$, the center acceleration is $\sum_a w_a\mathbf A_a$; a time-dependent center rule adds derivatives of its weights and must be accounted for separately. This explains the aggregation required before the displayed map can describe a physical assembly response.

The identity $\mathbf V_A\cdot\Pi_\perp\mathbf A=0$ holds for every vector $\mathbf A$, including a transverse electric comparison response. It therefore certifies only orthogonality. Recovery of magnetic deflection needs the correct dependence on charge, velocity, source geometry, and frame; orthogonality alone supplies neither that law nor a conserved assembly energy.

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

[View →](../../../../../equation-mapping.html#corpus-equation-ba312b24b795bddb)

where the continuity component is

$$
\Delta_{\mathrm{cont}}
\equiv
\partial_{t_{\mathrm{eff}}}\rho_{\mathrm{eff}}
+
\nabla_{\mathrm{eff}}\cdot\mathbf{J}_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-452b366787f8f374)

and the gauge component requires every observer-level observable $\mathcal O$ used by the channel to obey

$$
\Delta_{\mathrm{gauge}}[\mathcal O,\chi_{\mathrm g}]
\equiv
\mathcal O[A_{\mu}^{\mathrm{eff}}+\partial_\mu\chi_{\mathrm g}]
-
\mathcal O[A_{\mu}^{\mathrm{eff}}]
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9d522820850a7f72)

Here $t_{\mathrm{eff}}$ and $\nabla_{\mathrm{eff}}$ refer to the declared observer chart, $\rho_{\mathrm{eff}}$ and $\mathbf J_{\mathrm{eff}}$ are its charge density and current, and $A_\mu^{\mathrm{eff}}$ is its electromagnetic potential. The gauge function $\chi_{\mathrm g}$ changes the potential description without changing the physical observable. The displayed test applies to observables written as functionals of the potential after other dependencies are consistently included or eliminated. If charged matter fields are explicit, they must transform along with the potential under the same charge and derivative convention. Allowed gauge functions must also respect the declared boundary conditions; changing a physical boundary input is not a gauge test. The subscript keeps $\chi_{\mathrm g}$ distinct from the delay-factor family $\chi_{\text{sea}}$, $\chi_\gamma$, $\chi_{\mathrm{eff}}$.

The energy, momentum, and angular-momentum components are defined by the effective electromagnetic energy-momentum gate in [Radiation](../../../../markdown/aaa/reactions/radiation.md). A nonzero subsystem balance can represent exchange with a named photon, material, recoil, wake, or remnant contribution only when that transfer is evaluated independently and counted once. The complete residual must then vanish in the declared limit or lie within a stated error bound. Naming an unmeasured remainder does not close the balance, and neither a continuity nor a gauge failure can be repaired by assigning it to heat. These conditions make the effective ledger a recovery test rather than a conservation law inserted into the substrate dynamics.

5. **Evaluate wake-strain trigger** Evaluate a channel-specific diagnostic from the delayed acceleration and response history, with its threshold and observation interval declared.
- Below a proposed threshold, the selected mode is unavailable within that model; elastic transport, stored internal excitation, recoil, other radiation, and medium exchange remain separately evaluated possibilities. Heating requires an ensemble thermalization account.
- Above a proposed threshold, test whether the history enters the candidate mode's basin, the set of admissible histories that actually approach it. Crossing alone supplies neither a capture probability nor a stable product. Without a derived diagnostic and basin, this step remains a proposed mechanism.

6. **Apply channel-specific lock rule** Select the mode family:
- planar-mode for photon emission channels,
- pair nucleation for $\gamma\gamma$ conversion channels,
- corridor-mode for weak channels.

For photon channels, keep the two photon ledgers separate. Gate A records propagation and kinematics: $\hat{\mathbf{k}}$, $c_\gamma$, $E_\gamma$, $\mathbf{p}_\gamma$, phase frequency, and null-branch status. Gate B records polarization and spin closure: transverse basis, analyzer axis, material analyzer projector, helicity target, accepted/rejected capture channel, native capture measure, invariant unresolved-material measure, and no-longitudinal-mode status.

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

[View →](../../../../../equation-mapping.html#corpus-equation-7b6389e8d8494465)

Here $\Delta_A$ is the photon Gate A residual; $\Delta_Q^\gamma$, $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\parallel}^{\mathrm{sub}}$, $\Delta_{\mathrm{hel}}^\gamma$, and $\Delta_{\epsilon}^{\gamma}$ test the planar-pair substrate, transverse survival, longitudinal exclusion, helicity, and analyzer-basin rows; and $\Delta_{\mathrm{src}}^\gamma$, $\Delta_{\mathrm{recoil}}^\gamma$, $\Delta_{\mathrm{med}}^\gamma$, $\Delta_{\mathrm{wake}}^\gamma$, $\Delta_{\mathrm{handoff}}^\gamma$, $\Delta_{\mathrm{rem}}^\gamma$, and $\Delta_{\mathrm{bal}}^\gamma$ test the source, recoil, medium, causal-wake, analyzer-handoff, remnant, and event-balance rows. A reaction chapter may cite this vector as a bookkeeping contract, not as a derivation of photon polarization.

7. **Execute provenance-conserving relock** Update assembly graph by relocking existing substrate content. No ex nihilo creation is permitted in ontology bookkeeping; recruitment comes from local Noether braid availability.

8. **Test complete event balances** Derive and evaluate the assembly/observer accounts, including boundary exchange and any recruited sea inventory:
- $\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}$,
- $\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}$,
- spin/angular-momentum ledger balance for emitted, absorbed, or converted vector modes,
- provenance ledger balance across reactants, products, and recruited substrate content.

Here $Q$ is effective electric charge and $p^\mu$ is four-momentum in one declared effective inertial chart; they are not architrino masses or primitive four-vectors. A finite event includes all input/output fluxes, retained wake changes, recoil, medium changes, and remnants. Primitive identity and polarity counts are preserved by the ontology, but this alone does not derive energy, momentum, or angular-momentum conservation. The spin/angular-momentum line is a recovery requirement whose channel content belongs to the angular-momentum ledger, photon Gate B, the massive-vector corridor model, or the spin-statistics proof as appropriate.

9. **Project back to observer-level outputs** Compute spectra, cross-sections, rates, and timing in standard variables. Accept mapping only if closure targets from Step 2 are recovered within validated limits.

#### Detailed Scenario A: Bremsstrahlung Channel

Observer channel: $e^\pm + Z \rightarrow e^\pm + Z + \gamma$.

Step map:
1. Incoming charged assembly follows a deflected trajectory in target potential.
2. In the candidate assembly interpretation, deflection changes the causal-root geometry and transmitter-side acceleration weights; a derived response functional must determine the resulting wake-strain diagnostic.
3. A planar-mode threshold nominates a photon-formation opportunity. Formation of the proposed coaxial contra-rotating polarity-conjugate planar pair additionally requires a compatible history, capture dynamics, and persistence.
4. Without that capture, retain elastic scattering, recoil, internal excitation, and any other radiative or medium channels in the event balance; absence of the selected photon output does not imply heating.
5. Event closure requires recoil plus emitted-photon momentum balance at vertex level.
6. Observer-level result must recover standard $d\sigma/dk$ with screening/form-factor corrections in the validated regime.

Minimum observer-level closure equations, for a resolved target $Z$ whose initial and final states include its recoil and any retained excitation:

$$
e^\pm + Z \rightarrow e^\pm + Z + \gamma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df6eee7222616d8d)

$$
p^\mu_{e,\mathrm{in}} + p^\mu_{Z,\mathrm{in}} = p^\mu_{e,\mathrm{out}} + p^\mu_{Z,\mathrm{out}} + k^\mu_{\gamma}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-47c0f5549f5ccada)

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88ff383d1656ebfe)

$$
\left(\frac{d\sigma}{dk}\right)_{\mathrm{map}} \rightarrow \left(\frac{d\sigma}{dk}\right)_{\mathrm{std}}
\quad \text{(validated limit)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2234c027eda6b60d)

Here $p_e^\mu$ and $p_Z^\mu$ are electron/positron and target four-momenta, $k_\gamma^\mu$ is photon four-momentum, and $k$ in $d\sigma/dk$ denotes photon energy. The cross-section $\sigma$ is the channel event rate per target divided by the incident flux. The displayed balance is the closed-channel comparison limit; additional material, medium, or wake transfers require explicit contributions. Agreement is tested for a declared target, energy range, screening model, and detector acceptance, using predictions fixed before comparison.

#### Detailed Scenario B: Synchrotron Emission and Pair-Loaded Loop

Observer channels:
- effective emission: $e^\pm \xrightarrow{B} e^\pm + \gamma_{\mathrm{syn}}$, with $B$ written over the arrow because the magnetic state is an environment, not a reaction participant,
- pair channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Directional magnetic state $B$ is an observer-level field. Its representation through $\mathcal{V}_{\mathrm{NS}}$, delayed branch geometry, and transmitter-side acceleration weights is a constitutive recovery target; the direct-wake and sea-mediated shares are not fixed by the taxonomy.
2. Curved charged-assembly transport drives repeated planar-mode opportunities.
3. Emitted photons propagate and may enter pair threshold windows in dense radiation zones.
4. The pair-nucleation hypothesis requires an identity-resolved relocking history and complete energy-momentum accounts for the local substrate.
5. A continuing cascade additionally requires conversion and emission rates sufficient over the residence interval. Kinematically accessible channels alone do not establish a pair-loaded loop.
6. Observer-level closures required:
- pair threshold $s \ge 4m_e^2$,
- Breit-Wheeler rate-limit recovery,
- synchrotron cooling/polarization recovery in weak-gravity Lorentzian limits.

Minimum observer-level closure equations, with magnetic-energy expressions in Gaussian units and invariant-mass thresholds in comparison units $c=1$. The power below is the classical ultrarelativistic average over isotropically distributed pitch angles at fixed $\gamma$; pitch angle is the angle between electron velocity and $B$. Before this average, the benchmark is $P(\alpha)=2\sigma_T c U_B\gamma^2\beta^2\sin^2\alpha$, with $\langle\sin^2\alpha\rangle=2/3$. Taking $\beta\to1$ gives the displayed coefficient; a beam at one pitch angle requires the angle-dependent expression. These are classical comparison formulas with quantum-recoil and strong-field corrections negligible, not substrate laws.

$$
P_{\mathrm{syn}}=\frac{4}{3}\sigma_T c\,U_B\,\gamma^2,
\qquad
U_B=\frac{B^2}{8\pi}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3188bc68d54493d1)

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f6999760323a2911)

The symbols $\sigma_T$, $U_B$, and $E_e$ denote the Thomson cross-section, magnetic energy density, and electron energy. The factors $\beta=v/c$ and $\gamma=(1-\beta^2)^{-1/2}$ use standard observer comparison notation. Here $c$ is the calibrated observer speed, not an assumed identification with primitive $c_f$; new native numerical evaluations use $c_f=1$. The quantity $\tau_{\mathrm{syn}}$ is the comparison cooling timescale measured in the same effective frame as $E_e$ and $P_{\mathrm{syn}}$, not substrate absolute time or an automatically identified proper-clock reading. The scaling requires a specified field and pitch distribution and synchrotron-dominated losses.

$$
s=(k_1+k_2)^2 \ge 4m_e^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-983a302c7545ca17)

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-da9a4c71cb774c8c)

#### Detailed Scenario C: Pair Production as Standalone Conversion

Observer channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Two photon modes, each modeled as a coaxial contra-rotating polarity-conjugate planar pair, enter overlap geometry with center-of-momentum invariant $s$.
2. Threshold gate: the isolated two-photon comparison channel is kinematically accessible only for $s \ge 4m_e^2$; this is a necessary energy condition, not a formation or nonzero-rate certificate.
3. Above threshold, the proposed substrate mechanism must supply a compatible relocking history into charged pair assemblies. Threshold satisfaction alone does not produce that history.
4. Provenance ledger records conversion path from incoming photon modes plus recruited substrate pool.
5. Projected observer-level rate must match Breit-Wheeler behavior in validated regimes.

Minimum closure equations:

$$
\gamma + \gamma \rightarrow e^+ + e^-
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b085125ff6c1bafc)

$$
s=(k_1+k_2)^2=2E_1E_2(1-\cos\theta)\ge 4m_e^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9b851271dd15de01)

$$
k_1^\mu+k_2^\mu=p^\mu_{e^-}+p^\mu_{e^+}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e24a26c65e73f194)

These two equations use a local effective inertial chart with signature $(+,-,-,-)$ and comparison units $c=1$: $k_i^\mu=(E_i,\mathbf k_i)$ are on-shell photon four-momenta, $m_e$ is the observer electron mass, and $\theta$ is the angle between the incoming photon directions. Expanding the square with $k_i^2=0$ gives $s=2E_1E_2(1-\cos\theta)$; parallel photons give $s=0$, regardless of their separate energies. The displayed two-body balance applies only when omitted surroundings have zero net four-momentum change. A sea-recruitment model instead requires $k_1^\mu+k_2^\mu+P_{\mathrm{sea,in}}^\mu=p_{e^-}^\mu+p_{e^+}^\mu+P_{\mathrm{sea,out}}^\mu$, with the sea symbols covering all omitted ambient, wake, and remnant accounts over the same event boundary. Recovery of the isolated Breit-Wheeler limit must demonstrate that their net contribution vanishes or is bounded at the declared accuracy; conserved constituent counts do not imply this cancellation.

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-da9a4c71cb774c8c-2)

#### Detailed Scenario D: Weak-Channel Transition (Terminology Boundary)

Observer examples: low-energy beta-process channels using $W^\pm$ exchange language.

Step map:
1. Use standard weak-interaction equations and couplings as observer-level comparison targets; a calculation that takes those couplings as input is a benchmark calculation, not their substrate derivation.
2. At ontology layer, reserve corridor-mode terminology for weak-channel lock bookkeeping only.
3. Do not reuse corridor-mode terms for photon channels.
4. Accept mapping only if weak-channel rates and branching behavior remain consistent with validated limits.

Minimum closure equations:

$$
\text{Use standard weak-channel amplitudes/rates:}\quad \mathcal{M}_{\mathrm{map}} \rightarrow \mathcal{M}_{\mathrm{SM}}
\quad \text{(validated limit)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9124b64811fc0bce)

Here $\mathcal{M}$ is standard amplitude notation for the comparison row, not the timespace manifold $\mathcal{M}$.

$$
\Gamma_{\mathrm{map}} \rightarrow \Gamma_{\mathrm{SM}},
\qquad
\mathrm{BR}_{\mathrm{map}} \rightarrow \mathrm{BR}_{\mathrm{PDG}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-112c86834436b765)

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

[View →](../../../../../equation-mapping.html#corpus-equation-375afdbe6ba0b446)

Here the Particle Data Group (PDG) supplies the selected observer comparison data, and $\mathbf y_{\mathrm{map}}$ contains the corresponding mapped predictions. The data vector may include boson masses $M_W,M_Z$, widths $\Gamma_W,\Gamma_Z$, weak mixing angles, quark mixing entries (CKM), neutrino mixing entries (PMNS), lifetimes, or branching fractions. The displayed whitening formula applies when $C_{\mathrm{weak}}$ is a specified symmetric positive-definite covariance matrix for the residual vector; a general uncertainty convention is not a matrix inverse. It rescales correlated discrepancies to dimensionless components. A singular covariance needs independent coordinates or a justified restriction to its supported subspace, with exact constraints checked separately. Upper limits and asymmetric or separately reported statistical/systematic errors require their published likelihood or comparison rule, not an unmarked symmetric covariance. State the dataset version, correlations, theory uncertainty, and which data were used to fit parameters; a small fitted residual alone is not predictive validation.

For charged weak processes with momentum transfer well below the $W$ mass scale, the same mapping must also recover the leading contracted current-current comparison limit in units $\hbar=c=1$:
$$
\mathcal{L}_{\mathrm{map}}^{\mathrm{low}}
\rightarrow
-\frac{4G_F}{\sqrt 2}\,J_+^\mu J^-_\mu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-411cbec73e234e62)

Here $J_+^\mu$ and $J_-^\mu$ are conjugate charged weak currents using the left-chiral projector $P_L=(1-\gamma^5)/2$, including the applicable flavor factors; $\gamma^5$ is the standard chirality matrix. With currents written using $1-\gamma^5$ instead, their product is four times larger and the coefficient is $-G_F/\sqrt2$. The symbols $\mathcal L_{\mathrm{map}}^{\mathrm{low}}$ and $G_F$ denote the effective interaction density and Fermi coupling. Deriving $G_F$ from a corridor scale is an open recovery obligation, as explained in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#low-energy-four-fermi-limit); it is not achieved by inserting the measured value. Precision comparisons also require matching corrections and the relevant nuclear or hadronic matrix elements. This ties the target to beta-reaction and muon-reaction measurements (SM labels: `beta decay`, `muon decay`) while keeping finite-mediator exchange at its appropriate comparison scale.

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}},
\qquad
\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0c0c70834a1feab9)

#### Practical Authoring Rule for `reactions/*.md`

Each reaction chapter should include three short blocks:
- `Core Channels (Inclusion Rule)` using `BR > 1%` where PDG branching exists or `>1% contribution` where transport dominance is the relevant criterion. This is a presentation rule, not a license to discard smaller channels from conservation or precision calculations. Define the denominator, regime, and source of each contribution, retain channels required by the observable, and bound the combined omitted contribution.
- $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel using the stepwise map above.
- `Observer-Level Closure Checks` listing thresholds/rates/conservation/timing gates that keep mapping scientifically constrained.

### Core Terms

- **Mode-lock event:** transition into a candidate propagating or bound assembly mode under the history and stability conditions stated above.
- **Wake-strain threshold:** channel-specific diagnostic boundary whose relation to capture must be derived from admissible histories.
- **Nucleation:** formation of an assembly mode from existing substrate content; its persistence and effective conservation accounts require separate evidence.

### Channel-Specific Terms

- **Planar-mode nucleation:** photon-channel lock-in language for forming a coaxial contra-rotating polarity-conjugate planar-pair mode (a proposed carrier; referent-pending per the carrier-grade note in the assembly-level interpretation section). Use for electromagnetic radiation channels (for example synchrotron, bremsstrahlung) unless a chapter justifies another term. The term carries Gate A kinematic closure and Gate B transverse-ledger closure, but those closures should be tested separately.
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

### Sources and Comparison Scope

Condon and Ransom, *Essential Radio Astronomy* (2016), [§5.2.3, equations 5.37–5.42](https://www.cv.nrao.edu/~sransom/web/Ch5.html), supplies the classical pitch-angle dependence and isotropic average used in Scenario B. It supports the observer benchmark, not the proposed assembly mechanism.

Erler and Freitas, “Electroweak Model and Constraints on New Physics,” in the Particle Data Group's *Review of Particle Physics* (2024), [§10.1, equation 10.6 and the following low-momentum limit](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf), supplies the weak-current normalization and comparison-scale condition in Scenario D. Channel-specific measurements still require their own identified dataset and uncertainty convention.

### Related Chapters

- [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md)
- [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md)
- [Radiation](../../../../markdown/aaa/reactions/radiation.md)
- [Atomic Transition Radiation](../../../../markdown/aaa/reactions/atomic-transition-radiation.md)
- [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md)
- [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md)

## Radiation

Radiation is the $\mathbb{A}\mathbb{A}\mathbb{A}$ program for how assemblies shed or reroute excess action and energy. A radiative event is not defined merely by acceleration or by the presence of excess energy. It is a branch-routing problem: a driven assembly or local Noether sea state relaxes into one or more allowed channels such as photon output, medium excitation, recoil, residual internal energy, heat, or reaction products.

An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a point transceiver with fixed polarity; an assembly is a configuration of those constituents and their coupled path histories. A [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) is a neutral braided assembly scaffold, and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient population of neutral assemblies. A branch specifies candidate motion with its retained history; a return map compares that history before and after a declared cycle. A closure residual measures failure to meet a specified return or balance condition. Defining such a residual does not exhibit a stable branch or derive an energy functional. The mechanisms below remain conditional on those constructions.

The important reader split is carrier versus source mechanism. A gamma ray, X-ray, radio photon, and visible photon use the same photon-channel ontology when the carrier is a photon; their differences are frequency, source history, and path ledger. Alpha, beta, neutron, and non-photon radiation labels instead name outgoing assemblies or reaction products and must use reaction provenance. Photon output is described through planar-mode nucleation, while non-radiative channels remain explicit when the available energy does not lock into a stable photon assembly.

The detailed channel pages remain [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), and [Atomic Transition Radiation](../../../../markdown/aaa/reactions/atomic-transition-radiation.md). Photon assembly ontology belongs in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), while channel vocabulary follows [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md). Event-level conservation uses [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), and cosmology-facing radiation provenance is tracked in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

This page is a foundation-up overview. It states the shared mechanism and the closure targets that individual channel pages must specialize. It does not by itself prove blackbody radiation, photon spin, atomic spectra, or QED cross sections.

### Radiation Versus The Always-On Wake

Every architrino emits its wake at all times. The causal wake-surface record that carries the potential is broadcast continuously by every source — moving or still, bound or free — and mediating acceleration through that record is the ordinary business of the substrate. This constant emission is *not* radiation. Radiation is the narrower event defined above: a *routed closure residual*, in which a driven, non-adiabatically disturbed assembly sheds part of that residual into an outgoing carrier — a planar-mode photon assembly, or a reaction-product assembly such as an alpha, beta electron, neutron, or neutrino (see [Radioactivity Naming](#radioactivity-naming)). If no residual is routed, nothing is radiated, even though the wake never stops.

The always-on wake is therefore the emission of the potential, and it should keep the name **wake**. The word `transmission` is reserved in this chapter for the material row where a photon passes through a medium (reflection, transmission, absorption); it must not be reused for the substrate wake, or the two meanings collide.

A steady bound assembly makes the distinction sharp. A stable Noether braid emits its wake on every cycle, yet a certified non-radiative return map must carry no routed residual: over a cycle the far-zone transport of energy, momentum, and angular momentum must net to zero. That zero-flux statement is a closure target, not a consequence of the inverse-square per-hit acceleration alone. The canonical fixed-hit multiplier reads transmitter position and velocity but no separate transmitter acceleration or higher derivative. Acceleration can still be represented across a sequence of changing roots and velocities, while any irreversible radiative share must appear in a derived wake-energy current or as nucleated photon assemblies with source-depletion, recoil, medium, wake, and remnant rows. The substrate statement is therefore not that acceleration creates a primitive $1/r$ acceleration term; it is that a driven event may leave a closure residual that the channel ledger routes into outgoing transport. Recovering the Larmor/Liénard and synchrotron far-zone laws from those event records remains a derivation target. The Master Equation is acceleration-blind only at one fixed hit. That fact does not prove that accelerated histories cannot radiate, and the $1/r^2$ acceleration falloff does not by itself determine the energy reaching a distant boundary.

### Radiation as the Cost of an Unprepared Path

The unprepared-path account is a candidate mechanism and derivation target for the accelerated sector. It sharpens the routed-residual reading above without adding a new primitive.

The primary statement is the event-ledger rule above. The unprepared-path picture is a sea-dependent candidate for how a residual can arise: at constant sub-field-speed group velocity, forward causal influence and the local Noether sea response can settle into a phase-matched channel, whereas acceleration, an abrupt material boundary, or transport faster than a medium's phase speed can make arrival geometry differ from the prepared response. The resulting mismatch is a candidate contribution to $\mathcal R_{\Theta}$, not a replacement for its Master Equation derivation. In a sea-free idealization this preparation picture has no medium response to invoke; the prediction must then come entirely from the causal-root density, return map, and photon event ledger. This separation makes Cherenkov and transition radiation decisive recovery tests rather than exceptions hidden by the word “acceleration.”

One quantitative scaffold can test that candidate. Let $d>0$ be the initial separation from a forward signal to a comparison point moving in the same direction at constant group speed $v<c_f$, both measured in the Euclidean-void frame. A signal advancing at $c_f$ closes that separation at $c_f-v$. The resulting catch-up duration, measured in absolute time, is $t_{\mathrm{prep}}$ below. It is not yet a medium relaxation time. For approximately constant transverse acceleration $\mathbf a_\perp$ during that duration, the leading displacement estimate is

$$
t_{\mathrm{prep}}=\frac{d}{c_f-v},
\qquad
\delta_\perp\simeq\frac{1}{2}\|\mathbf a_\perp\|t_{\mathrm{prep}}^2.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-79e0f11197f23c62)

With $\beta_f=v/c_f$ and $\gamma_f=(1-\beta_f^2)^{-1/2}$, the exact identity $1/(1-\beta_f)=(1+\beta_f)\gamma_f^2$ gives $1/(1-\beta_f)\simeq2\gamma_f^2$ as $\beta_f\to1^-$:

$$
\delta_\perp
\simeq
\frac{2\|\mathbf a_\perp\|\gamma_f^4d^2}{c_f^2}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0be17fe0322e3638)

This is a kinematic candidate, not a power law. The displacement expansion requires small accumulated turning and small relative acceleration variation over $t_{\mathrm{prep}}$; at fixed nonzero acceleration and fixed $d$, that domain need not survive $v\to c_f$. In the standard observer-level comparison, transverse radiation has the target $P_{\perp}\propto\gamma^4\|\mathbf a_\perp\|^2$; at fixed effective magnetic field $B$ and fixed pitch angle in the ultrarelativistic regime, the trajectory response gives $P_{\mathrm{syn}}\propto U_B\gamma^2$, where $U_B$ is magnetic energy density. Here the comparison acceleration is measured in observer time, and its Lorentz factor $\gamma$ is not identified with $\gamma_f$ without a clock and channel-speed map. Within an overlapping validity domain, a quadratic fixed-$d$ displacement rule would supply a $\gamma_f^8$ factor. Recovering the observer power law therefore requires a derived transfer rule, a state-dependent $d$, or another explicitly justified factor.

At assembly level, a resolved transfer must name its counterparty: photon output or capture, medium excitation, recoil, or a causal-wake ledger update. Calling that transfer an action quantum additionally requires the channel's action-normalization and quantization derivation. This statement does not apply to each primitive causal-root hit, because a candidate bound assembly undergoes continuous substrate acceleration without a photon being assigned to every hit. An elastic deflection also need not emit a photon; recoil, medium, and wake entries can carry its balance. This is an accounting requirement for resolved assembly events.

### Forms At A Glance

In ordinary physics language, radiation can mean electromagnetic light, emitted particles, thermal emission, scattering-shifted photons, or gravitational waves. In $\mathbb{A}\mathbb{A}\mathbb{A}$ those are not one ontology. The first split is between the carrier that leaves or perturbs the event and the source mechanism that produced the outgoing record.

| Form | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading | Boundary discipline |
| --- | --- | --- |
| Photon-channel radiation | Electromagnetic bands such as radio, microwave, infrared, visible, ultraviolet, X-ray, and gamma-ray radiation are photon-channel records with different frequency, energy, source, and path-history ledgers. | The carrier is still modeled as the coaxial contra-rotating polarity-conjugate planar pair (a proposed assembly, referent-pending); the band name is not a separate substrate ontology. |
| Source-specific photon mechanisms | Atomic transition radiation, bremsstrahlung, synchrotron emission, thermal free-free emission, and medium relaxation are different trigger geometries for routing a closure residual into photon output. | Each mechanism must keep its source depletion, recoil, medium, remnant, polarization handoff, and benchmark recovery rows explicit. |
| Medium-speed and boundary radiation | Cherenkov radiation tests uniform motion with $v>c_{\mathrm{phase}}$ in a material response channel; transition radiation tests constant-velocity passage across an abrupt response boundary. | These are observer-level recovery targets for the sea-dependent preparation map. They do not establish a substrate mechanism until the same material event record derives the angle, spectrum, boundary dependence, and energy-momentum ledger. |
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
| Gamma radiation | photon-channel packet from nuclear de-excitation or related high-energy nuclear transition | photon output modeled as a planar mode (proposed carrier) whose source mechanism is nuclear |
| X-ray radiation | photon-channel packet usually sourced by electron-envelope transition, braking, or inner-shell rearrangement | photon output modeled as a planar mode (proposed carrier) whose source mechanism is atomic or charged-particle transport |

Thus gamma rays and X-rays differ mainly by source mechanism and frequency band, not by photon ontology. Alpha, beta, and neutron radiation are outgoing assemblies or reaction products and must use the reaction ledger rather than the photon-only planar-mode record.

### Foundation-Up Mechanism

The foundation-up radiation question is whether rapid transport changes can leave a Noether braid internally mismatched relative to its nearest stable closure class. A moving Noether braid has a velocity-deformed causal envelope, while a gravitational gradient skews its delay loops and phase closure. If a reaction suddenly decelerates the assembly, if curved transport changes too quickly, or if the assembly crosses a sharp Noether sea gradient, the external transport state can change faster than the three indexed binary ledgers can adiabatically retune.

The resulting residual is first a closure mismatch, not yet a photon. For persistent binary index $a\in\{1,2,3\}$,

$$
\delta\Theta_a
=
\Theta_a(T;\mathbf{V}_{\text{before}},G_{\text{grad}})
-
\Theta_a(T;\mathbf{V}_{\text{after}},G_{\text{grad}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f5343bbfbab6607)

Here $\Theta_a$ denotes binary $a$'s phase-closure ledger evaluated at absolute time $T$ over a separately declared comparison window, distinct from the coarse Noether sea response record $\Theta_E^{(\ell)}$ used in the material sections below. The before and after records must use one phase convention, one comparison window, and continuously matched phase lifts, including any winding counts. Subtracting unrelated representatives modulo $2\pi$ would create a false residual. The argument $\mathbf V$ denotes the transport state being retuned, and $G_{\text{grad}}$ denotes the local gradient data that modifies the delay loops. The displayed comparison holds that gradient data fixed; a gradient-crossing event must also supply its before and after gradient records. The index is persistent, $a\in\{1,2,3\}$, and does not encode radius order or a fixed dynamical role.

A compact residual magnitude can be treated as a derivation target:

$$
\mathcal{R}_{\Theta}
=
\left(\sum_{a\in\{1,2,3\}} w_a\,\delta\Theta_a^2\right)^{1/2},
\qquad
w_a>0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b11866cd30210706)

For fixed positive weights $w_a$, this is a norm of the three declared real phase differences. The physical weights must be derived from the layer hierarchy, active causal-root branches, and local Noether sea coupling. The norm does not define the nearest closure class: that requires an admissible reference family and a distance or minimization rule on the retained histories. Distinct histories can have the same phase differences while differing in velocities, causal roots, or stability. Thus zero phase residual alone certifies neither a return nor a physical branch.

### Closure Residuals

A closure residual becomes radiatively relevant only when it cannot be absorbed by ordinary adiabatic retuning. The useful comparison is between the retuning time of the core and the driving time of the disturbance:

$$
\epsilon_{\text{ad}}
\equiv
\frac{\tau_{\text{retune}}}{\tau_{\text{drive}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fe68e3eec7132cc4)

The durations $\tau_{\text{retune}}$ and $\tau_{\text{drive}}$ must be measured using the same declared clock. Small $\epsilon_{\text{ad}}$ supports an adiabatic approximation only on an established stable branch with a finite relaxation margin and controlled drive amplitude. It does not establish that branch, exclude a separatrix crossing, or imply heating. Large $\epsilon_{\text{ad}}$ indicates that retuning need not keep pace; it does not by itself select a radiative outcome. Radiation requires a derived transfer into an allowed outgoing channel.

Astrophysical jets add a useful macroscopic stress test for this same split. A supersonic working surface can create a large closure residual. Comparing the shocked material's cooling and propagation times tests one part of the observer-level energy budget, without selecting its outgoing channels. A compact comparison diagnostic is

$$
\mathcal{R}_{\mathrm{cool}}
\equiv
\frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
\qquad
t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e946ba3b255c89bc)

with an observer-level thermal-plasma estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-03f4023e6a7897a8)

Here $v_j$ and $\ell_j$ are the effective jet speed and propagation scale, $T_s$ is the post-shock temperature, and $\Lambda(T_s)$ is a cooling function normalized so that $n_e n_H\Lambda$ is radiated energy per volume per observer time. The numerator divided by $\gamma_{\mathrm{gas}}-1$ is the thermal energy density in a one-temperature ideal-gas comparison with total particle density approximated by $n_e+n_H$; $n_e$ is electron density, $n_H$ is hydrogen-nucleus density, $k_B$ is Boltzmann's constant, and $\gamma_{\mathrm{gas}}>1$ is the heat-capacity ratio. The estimate assumes optically thin losses and a specified composition and ionization state. Small $\mathcal{R}_{\mathrm{cool}}$ diagnoses rapid loss through the cooling processes included in $\Lambda$; large $\mathcal{R}_{\mathrm{cool}}$ diagnoses slow loss through those processes. Neither ratio determines particle acceleration, magnetic response, a non-thermal spectrum, or energy partition by itself. Those require the relevant channel rates and transport, including optical depth and competing cooling processes. These are observer-level diagnostics, not substrate premises.

The residual ledger should track at least four quantities:

| Ledger entry | Required meaning |
| --- | --- |
| $\delta\Theta_a$ | phase-closure mismatch of each persistent binary index in the candidate source record; no taxonomy member is implied |
| $\Delta E_{\text{int}}$ | excess internal energy above the nearest stable rung |
| $\Delta \mathbf{p}_{\text{asm}}$ | change in assembly momentum during the drive |
| $\Delta \mathcal{J}_{\text{wake}}$ | angular-momentum and causal-wake ledger imbalance to be closed |

This is the point where the radiation page connects to the Master Equation: the residual must be computed from delayed causal-wake hits and branch Jacobians, rather than appended as a phenomenological "radiation reaction" term. The theorem target is a residual functional

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(\Gamma(T),\mathcal{C}_{o'j}(T),J_{o'j},\rho_{\text{NS}}(\mathbf X,T),\chi_{\text{sea}}(\mathbf X,T)\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c37c9be06f023431)

Here $\Gamma(T)$ must include the retained assembly history needed by delayed evolution, not only instantaneous positions and velocities. The notation $\mathcal C_{o'j}$ identifies the active emission times from transmitter $j$ reaching receiver $o'$, and $J_{o'j}$ identifies the declared causal Jacobian data. The Noether sea density $\rho_{\text{NS}}$ and delay factor $\chi_{\text{sea}}$ summarize medium inputs whose response map also remains to be derived. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) fixes the acceleration from admitted hits; it does not supply this residual functional by naming its arguments.

The classical point-charge comparison sharpens this requirement. A singular charged source makes the near-field energy formally divergent, so the observed inertial mass cannot be identified with electromagnetic field energy alone without adding a compensating internal term. In $\mathbb{A}\mathbb{A}\mathbb{A}$ language, that pathology is a warning against treating radiation damping as a separate acceleration law attached after the motion has been chosen. The event record must instead expose the finite balance

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
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a7fcee81ae6640f3)

This is an effective energy-momentum comparison, with $P^\mu=(E/c_0,\mathbf p)$ in a declared observer chart and fixed speed calibration $c_0$; it is not a substrate four-vector law. Each $\Delta P^\mu$ is a signed final-minus-initial change in a disjoint account. The near-field term records reversible storage, the wake term records history-dependent exchange, and the mass/remnant term records internal or remnant contributions excluded from the assembly term. Medium and external-driver transfers must be included explicitly in those assigned accounts or added to the balance. Finite separate accounts and a zero total are targets, not consequences of this definition. In particular, a vanishing conservation residual is not a damping term: damping must be extracted from a nonzero outgoing irreversible transfer, with reversible storage and recoil accounted for separately.

Classical decompositions that compare outgoing and incoming field pieces can be used only as effective recovery tools. In the corpus notation their role is to test whether the same causal-wake history keeps every row of $\mathcal{D}_{\mathrm{rad}}$ finite when the comparison tube around the source is shrunk. They do not license acausal substrate dynamics: any nonlocal-looking term must be re-expressed as branch accounting over the event window, with delayed path-history provenance and a named residual row for every unmatched energy-momentum component.

### Excitation Basins

For a derived return map, a basin is a set of retained histories sharing a specified relaxation outcome, and a separatrix is its boundary. A phase mismatch alone does not identify either. The following proposed classification assumes that an admissible stable reference rung, its basin, and a common energy functional have been supplied. For a post-drive state above that reference in the same energy convention, the excess energy is the gap

$$
E_{\text{exc}}
=
E_C(\Gamma_{\text{post shock}})
-
E_C(\Gamma_{\text{nearest stable rung}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-73e2a1b9f3769f52)

Here $E_C$ is the proposed closure-class energy functional evaluated on a retained history, and the subscript `post shock` labels the post-drive state. Positivity of this difference and dynamical access to the reference rung are separate requirements. The simplest proposed basin classification is:

| Basin | Condition | Radiation meaning |
| --- | --- | --- |
| Retuning basin | $\mathcal{R}_{\Theta} < \mathcal{R}_{\text{retune}}$ | no resolved event; the core returns to the same rung |
| Excited basin | $\mathcal{R}_{\text{retune}} \le \mathcal{R}_{\Theta} < \mathcal{R}_{\gamma}$ | excess energy exists, but stable photon output is not guaranteed |
| Planar-mode basin | $\mathcal{R}_{\Theta}\ge\mathcal{R}_{\gamma}$ with sufficient channel geometry | photon-channel nucleation is allowed |
| Dissociation or reaction basin | closure residual destabilizes assembly identity | energy routes into products, recoil, and medium excitation |

The thresholds in this table are names for proof targets, not asserted universal constants. A completed derivation must compute the relevant separatrices from the local return map of the driven assembly. The same external energy transfer can therefore be radiative in one geometry and non-radiative in another if the basin boundary is different.

### Planar-Mode Nucleation

Photon output is modeled as the lock-in of a coaxial contra-rotating polarity-conjugate planar pair. In the language of [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md), the photon branch is a planar-mode nucleation event: shed energy, wake stress, and Noether sea state jointly cross the stability boundary for a propagating photon assembly.

A minimal nucleation gate can be written as a two-condition target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{NS}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-982ba49e54ca79ee)

Here $\mathcal{S}_{\gamma}$ is the local photon-channel drive, $\mathcal{S}_{\gamma,*}$ is the planar-mode stability boundary, $J_{\text{loc}}$ is the local causal-root/Jacobian data — including the same-record transmitter-side acceleration weight — as declared in [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md), and $E_{\gamma,\min}$ is the minimum stable planar-mode cost if such a floor survives the derivation. This form is only a scaffold. The burden is to derive $\mathcal{S}_{\gamma}$ from wake-strain geometry, causal-root branch data, and Noether sea coupling, then recover the validated limits used by bremsstrahlung, synchrotron emission, atomic transitions, Compton-like scattering, pair channels, and thermal radiation.

Once the planar mode nucleates, the event record must carry the photon Gate A and Gate B data without treating those gates as locally proven. Gate A supplies kinematics and optics: $E_\gamma$, $\mathbf{p}_{\gamma}$, direction, phase frequency, and local photon-channel speed $c_\gamma$. Gate B supplies transverse angular-momentum, polarization, helicity, and capture/rejection ledgers. This radiation overview uses those records as requirements; their proofs remain in the photon and angular-momentum programs.

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

[View →](../../../../../equation-mapping.html#corpus-equation-ca32fb61bc15bc55)

This is a post-drive emission budget: no further external work or incoming photon energy is supplied during the declared relaxation window. Its accounts must be disjoint. The medium term includes any assigned wake exchange, recoil excludes kinetic energy already in another term, the remnant term denotes retained excess excitation, and the reaction term denotes product energy relative to the same reference. A non-reaction photon event has $\Delta E_{\text{rxn}}=0$, but it can still transfer energy to medium, recoil, and remnant accounts; that condition alone is not a purely radiative limit. A photon-free event has $E_\gamma=0$. Capture, continued driving, and reactions with a different reference require the full signed incoming/outgoing budget, not this emission-only reduction.

In weak-coupling comparison limits, the same ledger must also recover the standard rate and scattering normalizations. Fermi's golden rule is the rate target for a near-continuum of final states, over a window long enough to resolve the relevant energy scale but short enough that transition probability remains perturbatively small:
$$
\Gamma_{\mathbb{A}\mathbb{A}\mathbb{A}\to f}
\rightarrow
\frac{2\pi}{\hbar}
\left|\mathcal{M}_{\mathrm{eff}}\right|^2
\rho_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1f60966cc39e9463)

Here $\mathcal M_{\mathrm{eff}}$ is the perturbing matrix element with energy units, $\rho_f$ is final-state density per unit energy at the allowed energy, and $\hbar=h/(2\pi)$ is the reduced Planck action scale. The arrow is a recovery limit, not an identity for every finite event window. A scattering cross section is transition rate divided by incident flux, or event probability divided by time-integrated incident fluence with consistent state normalization. The final-state phase-space integral must be performed once, either inside the rate or in its differential form. These are observer-level summaries whose derivation from the retained history remains open.

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

[View →](../../../../../equation-mapping.html#corpus-equation-bbb8335828dd3cfd)

The corresponding polarity, architrino-inventory, identity-routing, and path-history ledgers must also close. Non-radiative shedding is therefore not a discard bin. It is the required accounting for medium heating, turbulence, phonon/plasmon-like excitations, unresolved causal-wake stress, recoil, and residual internal excitation when no stable photon assembly leaves the event.

### Path Frequency Exchange

A photon-channel packet can also change frequency during transport without being replaced by a newly emitted photon. In standard comparison language, Compton and Sunyaev-Zeldovich processes are the important calibration family: a photon scatters from an intervening electron population and leaves with a shifted frequency. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is a transport exchange row. It belongs between photon propagation and reaction bookkeeping, not under ordinary transmitter emission alone.

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

[View →](../../../../../equation-mapping.html#corpus-equation-f9443e4a405cfbd4)

The $\Delta E$ terms are final-minus-initial changes in disjoint accounts, and $\epsilon_E>0$ is a declared energy-error allowance. Both frequencies must use the same local observer clock and energy calibration; identifying their energy difference with $h(\nu^+-\nu^-)$ requires the Gate A map. A frequency boost then requires a corresponding loss from the target or medium. A frequency depletion requires a named gain elsewhere. Target internal energy, target recoil, and retained excitation must not be counted twice. The outgoing packet must also retain the Gate A kinematic and Gate B polarization handoffs, or the process requires a capture, re-emission, pair-production, or other reaction record.

This distinction is cosmologically important. A redshift or blueshift accumulated along a path is not an unexplained energy loss or gain if the path-frequency exchange ledger closes. It is also not automatically evidence of geometric expansion. The corresponding cosmology pages must consume this radiation record before promoting redshift-distance, CMB temperature, or SZ/kSZ data products into expansion, dark-energy, or growth claims.

The strong-field version of the same rule occurs near a black-hole horizon interface. A photon-channel packet, or a photon-channel-adjacent mode, may be processed close to the orthogonal-axis three-binary symmetry-breaking point, where planar lock and high local energy exchange are part of the strong-field record. Interior segments can blueshift the packet; exterior or transport segments can redshift it; either case remains a frequency-exchange row only while the packet keeps its photon Gate A and Gate B handoffs. If the handoffs fail, the event must be reclassified as capture, re-emission, pair production, medium excitation, or another release-channel reaction.

Curved photon transport adds a transverse version of the same discipline. In ordinary weak lensing, the outgoing path direction changes coherently through the Noether sea response while the photon remains one Gate A/B packet. Let $\hat{\mathbf{k}}(\ell)$ be the path tangent and
$$
\kappa_\gamma(\ell)
=
\left\|
\frac{d\hat{\mathbf{k}}}{d\ell}
\right\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-efaeee5116926cc9)

the Euclidean path-curvature proxy along the transported packet; during coherent transport the path tangent $\hat{\mathbf{k}}(\ell)$ coincides at each point with the Gate A propagation axis $\hat{\mathbf k}$ of the packet. The coherent-lensing branch requires
$$
E_{\gamma}^{+}
=
E_{\gamma}^{-}
+\Delta E_{\mathrm{path}},
\qquad
\mathbf p_{\gamma}^{+}
=
\mathbf p_{\gamma}^{-}
-\Delta\mathbf p_{\mathrm{sea}}
-\Delta\mathbf p_{\mathrm{recoil}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3767dd0c9810d99c)

Here $\ell$ is Euclidean path arclength, $\Delta E_{\mathrm{path}}$ is energy transferred into the photon, and the sea and recoil momentum terms are final-minus-initial gains of the counterparties, hence their minus signs. All quantities require a common frame and a declared native-to-observer map. The relation assumes no free-photon identity change. A high-gradient or strong-field candidate may instead be tested with the following dimensionless diagnostic:
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

[View →](../../../../../equation-mapping.html#corpus-equation-47a8993ebc3f74b2)

Here $\Delta\mathbf p_{\gamma,\perp}$ is the transverse momentum change relative to the declared incoming axis, $\varepsilon_p>0$ is a momentum floor, $\lambda_\kappa\ge0$ is a dimensionless diagnostic weight, $\Gamma_\gamma$ is the transport path, and $\mathcal R_{\mathrm{GateA/B}}\ge0$ measures the specified handoff defect. Ordinary coherent bending already gives nonzero curvature and transverse momentum change. This expression therefore measures bending as well as possible defects; positivity is not evidence of extra radiation or loss of photon identity. Any emission threshold must be derived relative to an accepted coherent-transport family, with its energy source and medium or recoil uptake specified.

**Effective electromagnetic energy-momentum gate.** Standard electromagnetic energy and momentum bookkeeping supplies a useful recovery ledger for radiation, but only at the observer/channel level. The fields $\mathbf{E}_{\mathrm{eff}}$ and $\mathbf{B}_{\mathrm{eff}}$ in this subsection are effective comparison variables reconstructed from the channel map. They are not substrate objects added to the Euclidean void or to the Noether sea.

For a declared vacuum Maxwell comparison in a local inertial observer chart, define

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

[View →](../../../../../equation-mapping.html#corpus-equation-f903c7efe3a0e88f)

and

$$
\mathbf{g}_{\mathrm{EM}}
=
\frac{1}{c^2}\mathbf{S}_{\mathrm{EM}}
=
\epsilon_0\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b63dd026736b930)

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

[View →](../../../../../equation-mapping.html#corpus-equation-181c8e23e97f48f5)

Note the sign convention: $\sigma_{\mathrm{EM}}^{ij}$ is the momentum flux out of $V$, the negative of the textbook Maxwell stress tensor $T_{\mathrm{Maxwell}}^{ij}$, which is why it enters the momentum residual below with a plus sign.

For a control volume $V$ with outward unit normal $\hat{\mathbf{n}}$, the effective energy residual is

$$
\Delta_E^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V u_{\mathrm{EM}}\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA
+
\int_V\mathbf{J}_{\mathrm{eff}}\cdot\mathbf{E}_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-984703fdc12f15a2)

The effective Lorentz-force density is

$$
f_{\mathrm{L}}^i
=
\rho_{\mathrm{eff}}E_{\mathrm{eff}}^i
+
\left(\mathbf{J}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}\right)^i
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f7297c236c971227)

and the momentum residual is

$$
\Delta_{p,i}^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V g_{\mathrm{EM}}^i\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\sigma_{\mathrm{EM}}^{ij}\hat n_j\,dA
+
\int_V f_{\mathrm{L}}^i\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e662bc8aaa5b64e0)

The angular-momentum residual is the corresponding moment of the momentum ledger:

$$
\Delta_{J^i}^{\mathrm{EM}}(V)
=
\frac{d}{dt_{\mathrm{eff}}}\int_V \epsilon^i{}_{jk}x_{\mathrm{eff}}^j g_{\mathrm{EM}}^k\,d^3x_{\mathrm{eff}}
+
\int_{\partial V}\epsilon^i{}_{jk}x_{\mathrm{eff}}^j(\sigma_{\mathrm{EM}}\hat{\mathbf{n}})^k\,dA
+
\int_V\epsilon^i{}_{jk}x_{\mathrm{eff}}^j f_{\mathrm{L}}^k\,d^3x_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5f6beeca298812f)

The tensor $\sigma_{\mathrm{EM}}^{ij}$ is symmetric, so this effective comparison ledger carries the standard angular-momentum closure condition. A radiation, scattering, or material-capture event may use this gate only as a benchmark: the $\mathbb{A}\mathbb{A}\mathbb{A}$ event record must still name the source assembly, causal-root history, medium rows, recoil, and identity routing that generate the effective quantities.

Here $u_{\mathrm{EM}}$ is field energy density, $\mathbf S_{\mathrm{EM}}$ is energy flux, and $\mathbf g_{\mathrm{EM}}$ is momentum density. The constants $\epsilon_0$ and $\mu_0$ obey $c^{-2}=\epsilon_0\mu_0$ in this standard comparison; its $c$ is the observer vacuum calibration, not an identified substrate or material speed. The current $\mathbf J_{\mathrm{eff}}$ and charge density $\rho_{\mathrm{eff}}$ include the sources required by that comparison. The volume $V$ is fixed in the observer chart, the angular-momentum origin is fixed, and $\epsilon^i{}_{jk}$ is the antisymmetric spatial symbol. Moving boundaries require transport terms. Macroscopic dispersive material fields require their material storage and stress accounts; the vacuum formulas alone do not supply them.

For an outgoing photon packet crossing a large source-centered sphere with radial propagation in the far-field vacuum comparison zone, the flux version of the Gate A handoff is

$$
\Delta_{\gamma,\mathrm{flux}}
=
\left(
E_\gamma
-
\int_{t_{\mathrm{eff},i}}^{t_{\mathrm{eff},f}}\int_{\partial V}
\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA\,dt_{\mathrm{eff}},
\quad
\mathbf{p}_\gamma
-
\frac{1}{c}
\int_{t_{\mathrm{eff},i}}^{t_{\mathrm{eff},f}}\int_{\partial V}
(\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}})\hat{\mathbf{n}}\,dA\,dt_{\mathrm{eff}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-503ce3cc8156900b)

The time interval must cover the packet crossing, and background, incoming radiation, other outgoing carriers, and changes of stored near-field energy must be separated. Only radial propagation justifies replacing the momentum-flux tensor by the normal-directed energy flux in this formula; a general boundary uses $\sigma_{\mathrm{EM}}^{ij}\hat n_j$. A vanishing $\Delta_{\gamma,\mathrm{flux}}$ closes this photon-only comparison. If other transfers are present, they must be computed and the enlarged balance rechecked. Naming an unresolved wake or material account does not close the check.

### Radiation Event-Record Schema

Every resolved radiation, sub-threshold shedding, photon-capture, or radiation-coupled reaction record should use the same event schema. A photon-free event has no incoming or outgoing photon energy and no photon polarization handoff. A capture event instead has $E_{\gamma,\mathrm{in}}>0$ even when $E_{\gamma,\mathrm{out}}=0$; its incoming polarization and angular-momentum transfer remain required. The emission shorthand $E_\gamma$ must therefore be expanded into incoming and outgoing entries whenever the event includes capture or scattering.

| Required field | Required content | Closure role |
| --- | --- | --- |
| Source assembly | Identity and pre/post state of the driven assembly, photon assembly, or resolved local Noether sea excitation whose residual is being routed | Prevents treating radiation as free energy detached from an assembly or medium source |
| Source depletion row | $\Delta\mathcal Q_{\mathrm{src}}^{0}=\mathcal Q_{\mathrm{src}}^{-}-\mathcal Q_{\mathrm{src}}^{+}$ for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, with the source branch and event window named | Keeps photon output tied to what the driven source lost rather than to an isolated outgoing quantum |
| Trigger geometry | Deceleration, curved transport, gradient crossing, photon overlap, capture geometry, or medium-relaxation geometry, including local $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, and $\chi_{\text{sea}}(\mathbf X,T)$ when they affect the channel | Identifies why this event entered a retuning, excitation, planar-mode, or reaction basin |
| $\delta\Theta_a$ | Phase-closure mismatch for each active persistent binary index $a\in\{1,2,3\}$, or an explicit reason the channel uses a reduced assembly ledger | Keeps the event tied to the closure-residual mechanism rather than to acceleration language alone |
| $E_{\text{exc}}$ | Excess internal or medium excitation energy above the nearest stable rung before routing | Supplies the left side of the shedding ledger |
| $E_\gamma$ | Photon energy for each emitted, absorbed, shifted, or captured photon assembly; record incoming and outgoing energies separately, both zero only for photon-free events | Carries the Gate A energy-frequency and momentum handoff without proving it locally |
| Recoil | $\Delta E_{\text{recoil}}$, $\Delta \mathbf{p}_{\text{recoil}}$, and the assembly or medium component receiving recoil | Closes local momentum and energy at the event vertex |
| Medium excitation | $\Delta E_{\text{med}}$, $\Delta \mathbf{p}_{\text{med}}$, excitation type, and returned or retained Noether sea content | Prevents unresolved medium heating or turbulence from becoming an implicit loss term |
| Polarization handoff | Gate B acceptance data for every incoming or outgoing photon: transverse basis, analyzer or transport basis if present, helicity state or outcome record, accepted/rejected capture channel, and angular-momentum ledger | Records inherited photon Gate B requirements; total capture still requires the incoming handoff |
| Photon Gate B event residual | $\mathcal R_{\gamma B}^{\mathrm{event}}$ or the channel-local equivalent naming source, recoil, medium, wake, handoff, remnant, helicity, and balance entries whenever a photon participates | Prevents a clean transverse ledger from being promoted before the event ledger closes |
| Causal-wake ledger | Source identities, emission times, active causal-root branches, branch Jacobians, path-history provenance, and $\Delta \mathcal{J}_{\text{wake}}$ | Makes deterministic replay and angular-momentum balance depend on delayed wake history |
| Identity routing | Bijection or equivalent route for participating architrino identities after named Noether sea reservoir terms are included | Prevents photon output, causal wakes, or unresolved medium terms from being treated as sources of new substrate identities |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate, with any unresolved Gate A, Gate B, Gate C, reaction, or cosmology handoff named explicitly | Prevents a local channel record from being promoted to completed doctrine before its inherited gates close |

For photon-capture records, $E_\gamma$ names the incoming, outgoing, shifted, or captured photon ledger; it is not an identity source for different outgoing assemblies unless the channel is explicitly a reaction or pair-production record. In those cases, the same schema must add the recruited target or Noether sea inventory to the identity-routing field.

The schema requires the following source-depletion balance. It follows algebraically only after conservation of a complete, disjoint event ledger has been established; defining its entries does not prove conservation:

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

[View →](../../../../../equation-mapping.html#corpus-equation-7572f20bbbfa4ac3)

The superscript $0$ labels event-window transfers in one declared frame; `sub` labels the photon-side assembly/wake account, with outgoing minus incoming transfer when photons enter the event. The other right-hand terms are disjoint final-minus-initial gains, whereas source depletion is initial minus final and can be negative for capture. The $\mathcal Q=\mathbf J$ component is the full angular-momentum balance about one common origin. Gate B separately concerns transverse polarization response and intrinsic spin; a transverse polarization vector does not imply that spin angular momentum is perpendicular to propagation. Orbital angular momentum and changes of origin must be accounted for before extracting a photon helicity.

The event-window helicity projection is the $\hat{\mathbf k}$ component of that same balance. Define

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

[View →](../../../../../equation-mapping.html#corpus-equation-0f23e3d04627e3a5)

For a resolved helicity eigenchannel whose intrinsic photon angular-momentum account has already passed Gate B, the target is

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
=
\frac{
\hat{\mathbf k}\cdot
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

[View →](../../../../../equation-mapping.html#corpus-equation-05b96accb5630ef4)

The two projected expressions agree when $\mathbf B_{\gamma}^{0}=\mathbf0$. Their difference has magnitude at most $\|\mathbf B_{\gamma}^{0}\|/\hbar$, because $\hat{\mathbf k}$ is a unit vector. Neither balance nor absence of transverse angular-momentum leakage forces the projection to be $+1$ or $-1$: that spectrum is a separate Gate B requirement. A general polarization state is not assigned a definite helicity by this identity; its expectation and outcome weights require the corresponding Gate B state and analyzer record.

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

[View →](../../../../../equation-mapping.html#corpus-equation-ca32fb61bc15bc55-2)

Channel pages may add specialized variables, but they should not remove these fields. The polarization handoff remains inherited from photon Gate B; radiation records carry the fields needed by that gate, while the photon-spin and polarization proof remains outside the local radiation event record.

The repeated energy equation is the same post-drive emission reduction specified in [Non-Radiative Shedding](#non-radiative-shedding). For capture or scattering, subtract incoming photon energy from outgoing photon energy in the signed balance and include any external supply; the emission reduction is not the general schema's universal energy equation.

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

[View →](../../../../../equation-mapping.html#corpus-equation-1baa56cbe8ea2339)

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

[View →](../../../../../equation-mapping.html#corpus-equation-a42eb2252cc2697c)

so any longitudinal response must cancel, remain unexposed below tolerance, or route to a material, remnant, medium-bound, or massive-vector channel rather than a free photon.

For a declared benchmark family $b$, the Gate C output should be a normalized residual vector rather than a narrative pass:

$$
\mathbf{R}_{\gamma,b}(\mathsf e)
=
\left(
\frac{\Delta_E}{E_b+\varepsilon_E},
\frac{\|\Delta_{\mathbf{p}}\|}{p_b+\varepsilon_p},
\frac{\|\Delta_{\mathbf{J}}\|}{J_b+\varepsilon_J},
\frac{\left\|P_{\parallel,\hat{\mathbf{k}}}\Pi_{\gamma}\mathcal{L}_A(\mathsf e)\right\|_{\gamma}}{\epsilon_{\gamma,\parallel}},
R_{\mathrm{bench},b},
R_{\mathrm{replay},b}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9f79567629bf1e99)

The denominators must be positive, predeclared error allowances: $E_b$ and $\varepsilon_E$ carry energy units, $p_b$ and $\varepsilon_p$ momentum units, and $J_b$ and $\varepsilon_J$ angular-momentum units. Setting the allowances equal to full signal scales would permit order-one conservation defects and does not establish precision recovery. The floors cannot be enlarged after seeing a residual. The operator $\Pi_\gamma$ extracts the photon response from the event ledger $\mathcal L_A$, $P_{\parallel,\hat{\mathbf k}}$ projects along the propagation axis, and $\|\cdot\|_\gamma$ and $\epsilon_{\gamma,\parallel}>0$ specify its response norm and tolerance. The event is $\mathsf e$, and $\operatorname{Bench}_\gamma$ requires the declared independent benchmark comparisons. The dimensionless $R_{\mathrm{bench},b}$ tests the family-specific observable; $R_{\mathrm{replay},b}$ tests reuse of the same residual definition, channel boundary, and Noether sea variables across the event panel without retuning. Replay alone supplies consistency, not independent correctness. The acceptance target is

$$
\left\|\mathbf{R}_{\gamma,b}(\mathsf e)\right\|_{\infty}
\le
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bc46a40eed5f69a4)

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

[View →](../../../../../equation-mapping.html#corpus-equation-008b07a26ad17060)

The five entries are theorem-target data, not a completed QFT scattering derivation:

| Grammar entry | Required content | Validation role |
| --- | --- | --- |
| $\mathfrak{L}_{\mathrm{in}}$ | incoming assembly, photon, medium, and Noether sea ledgers: identities, $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, architrino inventory, causal-root branches, and path-history provenance | fixes what enters the event before any channel assignment is made |
| $W_{\mathrm{int}}$ | finite absolute-time interaction window $[T_i,T_f]$ with the resolved local geometry, branch Jacobians, transient assembly or resonance record, and recruited or returned Noether sea content; observer comparisons additionally declare its clock map | prevents replacing the local collision or channel window by an instantaneous black box |
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

[View →](../../../../../equation-mapping.html#corpus-equation-7250d9451a9eb8e3)

Every conservation component must vanish within its declared error allowance after all computed transfers are included. A named but unevaluated residual records an open obligation; a benchmark mismatch remains a failed comparison until resolved. Here $\Delta\mathcal{N}_{\mathrm{id}}$ is the identity-routing residual after explicit Noether sea reservoir terms are included, and $\Delta_{\mathrm{bench}}$ is the observer-level benchmark residual for the declared regime. This grammar must recover the standard incoming/outgoing accounting and thresholds in its relativistic comparison limit. It does not by itself derive amplitudes, cross sections, or production rates.

### Photon-Material Surface Routing

A material surface interaction is the near-field Gate C version of the same event schema. It should not be pictured as a small projectile striking a hard wall. At atomic resolution the incoming photon is modeled as a coaxial contra-rotating polarity-conjugate planar pair (a proposed carrier, referent-pending) with Gate A and Gate B ledgers, while the material supplies an electron-envelope branch, a nuclear source envelope, a bonding or lattice branch, and a local Noether sea response record. The local event state can be written as

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

[View →](../../../../../equation-mapping.html#corpus-equation-04359a740f4c3947)

where $\gamma_{\mathrm{in}}$ carries $E_{\gamma,\mathrm{in}}$, $\mathbf{p}_{\gamma,\mathrm{in}}$, direction, phase frequency, local $c_\gamma$, and transverse ledger data; $\mathcal B_e$ is the realized electron-envelope branch; $\mathcal A_{\mathrm{nuc}}^{Z,N}$ is the nuclear assembly ledger; $\mathcal B_{\mathrm{lat}}$ is the realized material bonding or lattice branch; $\Theta_E^{(\ell)}$ is the coarse Noether sea response record in the surface cell; and $\mathcal H_{\gamma\to\Omega}$ is the causal-wake and path-history ledger for the incoming packet and local material window.

The route decision selects a finite channel set

$$
I_{\mathrm{surf}}
\subset
\{
B_{\mathrm{refl}},
B_{\mathrm{trans}},
B_{\mathrm{cap}},
B_{\mathrm{scat}},
B_{\mathrm{heat}},
B_{\mathrm{recoil}},
B_{\mathrm{rem}}
\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6be2dcca60eb646f)

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

[View →](../../../../../equation-mapping.html#corpus-equation-3964eee95d15b27d)

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

[View →](../../../../../equation-mapping.html#corpus-equation-9ae869e9778345e5)

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

[View →](../../../../../equation-mapping.html#corpus-equation-6266434e70904a89)

Here $E_{\gamma,\mathrm{out}}$ sums reflected, transmitted, and scattered free-photon energies. Zero outgoing energy does not erase the incoming polarization transfer. The displayed balances use disjoint accounts: any remnant or recoil angular momentum is included in the specified electron, lattice, sea, or wake term, and any remnant momentum is included in its named material carrier. Wake energy is assigned within the sea or remnant account. If those assignments do not cover an event, the missing terms must be added before conservation is claimed. The material branch variables above are required candidate inputs, not branches established here. For ordinary optical or infrared surface events, the nuclear inventory remains fixed: $\Delta Z=0$ and $\Delta A=0$, with $Z$ the proton count and $A$ the nucleon count, unless a separate nuclear-reaction gate is supplied.

| Route | Material meaning | Required closure target |
| --- | --- | --- |
| $B_{\mathrm{refl}}$ | coherent re-release of an outgoing planar-pair branch, typically supported by a collective surface-electron response in a metal-like branch | recover phase, angle, polarization, and skin-depth behavior without treating reflection as a hard bounce |
| $B_{\mathrm{trans}}$ | outgoing photon crosses the material boundary into the transmitted channel | recover transmitted flux, direction, phase, and polarization with the same material balance |
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

[View →](../../../../../equation-mapping.html#corpus-equation-36c52d182bec59e9)

The weighted balance diagnostic over $N$ bounces is
$$
\mathcal R_{\mathrm{cav}}
=
\sum_{b=1}^{N}
w_b\,\mathcal R_{\mathrm{mir}}(b),
\qquad
w_b\ge0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b48b7fce650d8573)

Here $\mathcal R_{\mathbf p\mathbf J,b}$ is a nonnegative normalized momentum/angular-momentum balance defect, and $w_b$ are predeclared weights. A zero energy-balance defect permits complete absorption if the absorbed energy is correctly recorded; it does not measure optical loss. Moreover, a zero-weight bounce contributes no information to $\mathcal R_{\mathrm{cav}}$. Every included bounce therefore requires its own check. Apparent lossless reflection additionally requires outgoing optical survival and phase preservation within stated tolerances; for a passive single tracked channel its energy survival is the product of the per-bounce energy survival fractions, not the sum of conservation residuals.

The worked surface case is still a derivation target. It fails if reflection is modeled as a hard geometric bounce with no electron-envelope response, if absorption becomes annihilation or untracked heat, if the same material requires separate Noether sea variables for reflection and absorption, if a hidden longitudinal free-photon channel is used, or if ordinary optical events change nuclear inventory without a separate reaction provenance ledger.

**Causal material response and skin-depth ledger.** Photon-material routing needs a constitutive response target in addition to the event ledger. In the effective material description, a local response kernel $\mathcal X_\Omega$ maps the applied channel field to the coarse material polarization,

$$
\mathbf{P}_\Omega(t_{\mathrm{eff}},x_{\mathrm{eff}}^i)
=
\int_{-\infty}^{+\infty}
\mathcal X_\Omega(t_{\mathrm{eff}}-t'_{\mathrm{eff}};x_{\mathrm{eff}}^i)\,
\mathbf{E}_{\Omega}(t'_{\mathrm{eff}},x_{\mathrm{eff}}^i)\,dt'_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f13f0aff8c9a897)

with causality requiring

$$
\mathcal X_\Omega(\Delta t_{\mathrm{eff}};x_{\mathrm{eff}}^i)=0
\qquad
\text{for}\quad
\Delta t_{\mathrm{eff}}<0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-42bb821f98b93e5f)

This convolution assumes linear, time-translation-invariant response local in the declared effective spatial chart; $\mathbf P_\Omega$ is material polarization and $\mathbf E_\Omega$ is the applied comparison field. The harmonic convention is $e^{-i\omega t_{\mathrm{eff}}}$, so the forward transform of the response kernel uses $e^{i\omega\Delta t_{\mathrm{eff}}}$. Causal support together with suitable stability and integrability gives analyticity for $\operatorname{Im}\omega>0$; causal support alone allows growing kernels whose poles lie in that half-plane. The unsubtracted Kramers-Kronig formulas below additionally require sufficient large-frequency decrease and well-defined boundary values. A nonzero instantaneous response must first be separated, and singular boundary terms need their distributional or subtracted form. On that declared domain, the response map must recover

$$
\Delta_{\mathrm{KK}}^{\operatorname{Re}}(\omega)
=
\operatorname{Re}\mathcal X_\Omega(\omega)
-
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Im}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a7b245913068f53b)

$$
\Delta_{\mathrm{KK}}^{\operatorname{Im}}(\omega)
=
\operatorname{Im}\mathcal X_\Omega(\omega)
+
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Re}\mathcal X_\Omega(\omega')}{\omega'-\omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7a6d4752a389de6f)

Here $\mathcal P$ denotes the Cauchy principal value. Both residuals must vanish within declared integration and coarse-graining errors on the stated domain. This is a consistency test for a causal stable response with the assumed asymptotics; it does not establish passivity, a microscopic material realization, or a substrate response law.

For a homogeneous, isotropic, spatially local linear material comparison, use the effective response below. The permittivity $\epsilon_\Omega$ excludes the mobile-carrier contribution already assigned to conductivity $\sigma_\Omega$, and $\mu_\Omega$ is permeability. This division prevents counting the same carrier response twice:

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

[View →](../../../../../equation-mapping.html#corpus-equation-04aa86114c3eda82)

For a mode proportional to $e^{ikz_{\mathrm{eff}}-i\omega t_{\mathrm{eff}}}$ with $\omega>0$, choose the passive branch $k_2>0$. Its field-amplitude skin depth and, when $k_1>0$, its $B$-relative-to-$E$ phase offset are

$$
\delta_{\mathrm{skin}}(\omega)=\frac{1}{k_2(\omega)},
\qquad
\phi_{EB}(\omega)=\tan^{-1}\!\left(\frac{k_2(\omega)}{k_1(\omega)}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dbde9590ecc164bd)

The intensity attenuation length is $1/(2k_2)$, whereas $\delta_{\mathrm{skin}}$ measures amplitude attenuation. The phase uses the full argument of $k$ outside $k_1>0$; an $H$-relative-to-$E$ phase also includes complex permeability. The low-frequency good-conductor Drude limit requires $\omega\tau_{\mathrm D}\ll1$, $\sigma_{\mathrm{DC}}\gg\omega|\epsilon_\Omega|$, and approximately real positive $\mu_\Omega$. Here $\tau_{\mathrm D}$ is a material relaxation duration in observer time and $\sigma_{\mathrm{DC}}$ is direct-current conductivity:

$$
\sigma_\Omega(\omega)
=
\frac{\sigma_{\mathrm{DC}}}{1-i\omega\tau_{\mathrm D}},
\qquad
\delta_{\mathrm{skin}}(\omega)
\rightarrow
\left(\frac{2}{\mu_\Omega\omega\sigma_{\mathrm{DC}}}\right)^{1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d58a53912edab28d)

In the collisionless free-carrier comparison, take $\omega\tau_{\mathrm D}\gg1$, a vacuum background permittivity, and negligible magnetic response. With mobile-carrier density $n_{\mathrm{car}}$, effective carrier charge $q$, and effective carrier mass $m$,

$$
\omega_p^2
=
\frac{n_{\mathrm{car}}q^2}{m\epsilon_0},
\qquad
\epsilon_{\mathrm{eff}}(\omega)
\rightarrow
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4cf951f35ad17f55)

Neither $q$ nor $m$ is an architrino-level input here. In this lossless comparison, with $c^2=1/(\mu_0\epsilon_0)$, the transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
\qquad
(\omega>\omega_p)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d67c651eb40622de)

while $\omega < \omega_p$ routes to an evanescent reflection/skin-depth row rather than to an untracked disappearance of the photon ledger. If $\epsilon_{\mathrm{eff}}(\omega)=0$ supports a longitudinal plasma oscillation, that excitation belongs in the medium-excitation row; it is not a hidden longitudinal free-photon branch.

For a surface event normalized by incoming flux and polarization branch $b\in\{\perp,\parallel\}$, the material-response ledger is

$$
\mathsf L_{\mathrm{surf}}(\omega,\theta,b)
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

[View →](../../../../../equation-mapping.html#corpus-equation-7411087d400d5fe6)

with scalar routing condition

$$
R_b+T_b+A_b+Q_b^{\mathrm{rem}}=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cc8c8d46d80be6bf)

All four terms are dimensionless fractions of incoming energy integrated over the same event window, or consistent steady-state flux fractions where no energy accumulates. Here $R_b$ includes reflected photon output, $T_b$ includes transmitted photon output, $A_b$ includes dissipative material uptake excluding the retained excitation in $Q_b^{\mathrm{rem}}$, and recoil is assigned within the material uptake. Diffuse photon output must be included in reflected/transmitted totals or given another explicit term. An independently driven or amplifying surface requires its supplied energy as an input. For a planar interface between transparent isotropic nonmagnetic media, the standard comparison is

$$
n_1\sin\theta_I=n_2\sin\theta_T,
\qquad
\tan\theta_B=\frac{n_2}{n_1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fed3080c4f36c7b8)

Here $n_1$ and $n_2$ are optical phase indices in this standard comparison, distinct from normalized Noether sea density $n(\mathbf X,T)$; $\theta_I$ and $\theta_T$ are incidence and transmission angles relative to the interface normal. The stated Brewster angle $\theta_B$ is the zero-reflection angle for polarization parallel to the incidence plane, under these material assumptions. The simple ratio need not hold for magnetic, anisotropic, or absorbing media. In conducting limits, the ledger must recover attenuation through $k_2$ and $\delta_{\mathrm{skin}}$ while keeping energy, momentum, and angular momentum assigned to the same event record.

### Ensemble Temperature

The term "hot" should be used with care. A single excited Noether braid is not hot in the full thermodynamic or blackbody sense. It is better described as internally excited, closure-mismatched, or metastable above a local stable rung. Temperature is an ensemble-level effective variable: many assemblies must exchange energy, emit, absorb, scatter, and thermalize so that a stable distribution can be assigned.

At the ensemble level, the relevant object is not one value of $E_{\text{exc}}$ but a distribution over assembly states and photon modes. A disciplined temperature definition should come from an entropy-energy relation for the ensemble,

$$
\frac{1}{k_B T_{\text{ens}}}
=
\left(\frac{\partial S_{\text{ens}}}{\partial E_{\text{ens}}}\right)_{\mathcal{N},\mathcal{V}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-24b769c1a722aa26)

Here $S_{\text{ens}}$ is dimensionless entropy, namely physical entropy divided by $k_B$, and $E_{\text{ens}}$ is ensemble energy. With physical entropy instead, the derivative would equal $1/T_{\text{ens}}$. This definition presupposes a differentiable equilibrium entropy in the declared ensemble; it does not prove thermalization. The symbols $\mathcal N$ and $\mathcal V$ denote inventory and effective volume held fixed in the coarse-graining. An equivalent kinetic definition also requires a distribution shown to thermalize under the interaction rules.

For radiation channels, local thermodynamic equilibrium is a claim about the local state whose maintenance can be tested against competing timescales. Reusing the diagnostic from bremsstrahlung,

$$
\mathcal{R}_{\mathrm{LTE}}
\equiv
\frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-42013aabe5e135c7)

Here the coupling and cooling durations use the same observer clock. Small $\mathcal{R}_{\mathrm{LTE}}$ supports one scale separation for maintaining local thermodynamic equilibrium during cooling, not a sufficient condition: the coupling must thermalize the relevant degrees of freedom and outrun drive, transport, and escape as well. Large $\mathcal{R}_{\mathrm{LTE}}$ warns that cooling can outpace equilibration but does not alone prove a non-equilibrium state. A one-temperature emissivity requires the corresponding distribution and population conditions. Material equilibrium does not by itself put the photon bath in blackbody equilibrium.

### Blackbody Limit

Blackbody behavior is a stronger claim than radiation. It requires repeated emission, absorption, scattering, and mode exchange until the photon bath approaches detailed balance with the material or Noether sea ensemble. In the weak homogeneous validated limit, the closure target is the usual Planck occupation form,

$$
\bar n_\gamma(\nu)
=
\frac{1}{\exp(h\nu/(k_B T_{\mathrm{temp}}))-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c0ea9bd422d056e)

with effective photon chemical potential driven to zero in the fully thermalized photon bath. This is an observer-level recovery target. The foundation-up task is to show how planar-mode nucleation, planar-mode capture, Compton-like redistribution, pair channels, and non-radiative medium exchange jointly produce the same limit.

At equilibrium, the temperature in the Planck occupation is the same ensemble temperature defined above: $T_{\mathrm{temp}}\equiv T_{\mathrm{ens}}$. The separate labels only distinguish the formula's conventional temperature notation from the ensemble definition.

The minimum detailed-balance condition is schematic but useful:

$$
\Gamma_{i\to j+\gamma}\,f_i\,(1+\bar n_\gamma)
=
\Gamma_{j+\gamma\to i}\,f_j\,\bar n_\gamma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-49ab805967d09a67)

Here $f_i$ and $f_j$ are ensemble occupation weights for material or assembly states, while $\Gamma$ denotes the effective transition coefficient before multiplication by the explicit photon occupation factors. The factors $g_i,g_j$ below count state degeneracies; coefficients and populations must use matching per-state or summed-state conventions. This equation states a balance to recover, not a proof of blackbody behavior. Its algebraic Planck solution requires nonzero connected transition rates and positive $h\nu/(k_BT_{\text{ens}})$; if both coefficients vanish, the equation is $0=0$ for every occupation.

The detailed-balance theorem target is more specific than the schematic equation. For a transition with $E_i-E_j=h\nu$, Gate C must derive an ensemble weight ratio

$$
\frac{f_i}{f_j}
=
\frac{g_i}{g_j}\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5399475bb00ebeb1)

from the thermalized assembly ensemble, together with a rate-degeneracy relation

$$
\Gamma_{i\to j+\gamma}\,g_i
=
\Gamma_{j+\gamma\to i}\,g_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b39b780bb35f9e95)

Those two conditions make the detailed-balance equation imply

$$
\frac{\bar n_\gamma}{1+\bar n_\gamma}
=
\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ddb17a2e31fb1116)

and therefore recover the Planck occupation. The point is not to postulate these relations at the substrate level; the point is to identify exactly what the assembly return map, planar-mode capture/release rates, and coarse-grained ensemble measure must prove before blackbody language becomes available.

For cosmology-facing claims, thermalization depth is a diagnostic rather than a new ontology term. A useful provisional target is

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_{\mathrm{eff},a},t_{\mathrm{eff},b})
=
\int_{t_{\mathrm{eff},a}}^{t_{\mathrm{eff},b}}
\left[
\tau_{\mathrm{cap}}^{-1}
+
\tau_{\mathrm{scat}}^{-1}
+
\tau_{\mathrm{pair}}^{-1}
+
\tau_{\mathrm{med}}^{-1}
\right](\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c23f3cbef64110c7)

The terms are effective interaction rates for capture/release, scattering, pair channels, and medium exchange, all in the same observer time. At fixed $\nu$ this is an interaction-depth diagnostic; a frequency-changing trajectory requires rates evaluated along its frequency history or a frequency redistribution operator. Many interactions do not necessarily erase a spectral distortion: elastic scattering can change direction without changing occupation, and photon-number-conserving exchange alone does not generally drive chemical potential to zero. Approach from a specified non-equilibrium distribution requires large integrated relaxation in every relevant distortion mode, including a number-changing channel where needed, plus detailed balance and controlled escape. An initially Planckian bath can remain Planckian without a large interaction depth, so the displayed sum is not a universal necessary condition either.

For cosmology-facing use, the blackbody limit also requires thermalization depth, damping, anisotropy, polarization, and redshift handoff to remain consistent with the same provenance record. The CMB claim is therefore not "many photons exist." The claim to prove is that source channels plus Noether sea transport can generate and preserve a near-blackbody photon bath within observational limits.

### Channel Routing

Channel routing is the event-level decision tree that sends the closure residual into allowed outputs. It should be recorded before a channel is used in a larger reaction or cosmology argument.

| Channel family | Trigger geometry | Primary output | Required closure target |
| --- | --- | --- | --- |
| Bremsstrahlung | charged-assembly acceleration or deflection near a target assembly, including direction changes at nearly constant speed | planar-mode photon, recoil, medium excitation | recover $d\sigma/dk$, screening, form-factor, and free-free emissivity limits |
| Synchrotron | curved charged-assembly transport in an anisotropic Noether sea state | repeated planar-mode photon output | recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, cooling breaks, and polarization limits |
| [Atomic transition](../../../../markdown/aaa/reactions/atomic-transition-radiation.md) | electron-assembly envelope moves between effective resonance basins | line photon plus recoil and residual atomic state | recover spectral line frequencies after local clock/rate conversion |
| Pair association and neutral relock radiation | photon overlap, charged pair association, or charged pair relock | photons, $e^+e^-$ assemblies, recoil, and recruited or returned Noether braid content | recover threshold, cross-section, and inventory plus identity-routing conservation in validated regimes |
| Thermal free-free | ensemble of screened charged encounters | continuum photon bath plus medium heating | recover thermal emissivity under the distribution and scale-separation assumptions in [Ensemble Temperature](#ensemble-temperature), with non-equilibrium corrections when those assumptions fail |
| Compton-like scattering | photon assembly captured and re-released by a charged assembly | shifted photon, recoil, and possible heat channel | recover energy-momentum transfer and standard scattering limits |
| Coherent elastic scattering | bound or free charged response re-routes an incoming photon without a resolved internal target excitation | photon with frequency preserved only to the declared recoil and Doppler accuracy, plus material or wake handoff | recover Rayleigh and Thomson limits, including the Rayleigh low-frequency scaling, from the same incoming/outgoing event record |
| Photoelectric effect | incoming photon-channel event reaches a material electron-envelope or surface basin above its release threshold | emitted electron assembly, recoil, remnant excitation, or heat | recover threshold frequency, intensity-count scaling, stopping-potential linearity, and maximum kinetic-energy relation $K_{\max}=h\nu-\Phi_{\mathrm{work}}$ from one surface event record |
| Free-bound recombination radiation | a free charged assembly associates into a bound atomic envelope basin | recombination photon, recoil, and residual atomic or medium energy | recover continuum-to-line capture spectra and detailed balance with the inverse bound-free channel from one event family |
| Cherenkov and transition radiation | uniform charged transport outruns a material phase channel, or crosses a sharp material-response boundary | directional photon output plus material recoil and polarization update | recover the Cherenkov threshold and angle and the transition-radiation boundary dependence without treating acceleration as a necessary observer-level trigger |
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

[View →](../../../../../equation-mapping.html#corpus-equation-1b9394889f3c87c2)

Gravitational-wave radiation sits outside this table. It is a tensor/effective-metric channel whose closure targets are speed, dispersion, polarization content, detector-side strain provenance, and source-side quadrupole recovery, handled in [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). It should not be promoted as another photon-output branch.

The channel pages specialize the skeleton. This overview supplies the shared rule: no radiation claim is complete until the event record identifies the source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, closure status, and observer-level recovery limit.

The routing skeleton is a theorem-target contract, not a completed event-routing theorem. Radiation-coupled reaction and pair channels remain open worked sector cases until they satisfy the event-ledger contract in [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md#residual-routing-event-ledger-contract): a replayable residual, a stated channel boundary, a selected output assignment, a closed $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, benchmark recovery, and explicit failure modes.

### Radiation Closure-Target Ledger

The routing skeleton above becomes useful only if each benchmark is carried as a classified closure item. In this ledger, `ontology` names what the theory treats as real at the substrate or assembly level; `derivation target` names a result that must be recovered from dynamics, symmetry, simulation, or constitutive closure; `effective summary` names an observer-level formula retained as a recovery target; and `speculation` names a possible extension that cannot be used to repair a failed benchmark.

| Target | Class | Concrete closure requirement | Validation check | Failure condition |
| --- | --- | --- | --- | --- |
| Radiative event ontology | ontology | A radiative event is a routed closure residual (this event structure is the ontology claim). Photon output is a planar-mode nucleation event whose photon branch is modeled as the coaxial contra-rotating polarity-conjugate planar pair, a proposed carrier (referent-pending) whose acceleration-balance closure remains open; medium excitation, recoil, residual internal energy, and reaction products remain explicit non-photon channels. | Every channel event record identifies the source assembly, trigger geometry, local Noether sea state, $\mathcal{R}_{\Theta}$, $E_{\text{exc}}$, photon or non-photon outputs, and conservation ledgers. | If radiation is treated as primitive acceleration-field output or as untracked energy loss, the ontology has been bypassed. |
| Scattering/reaction event grammar | derivation target | Express every scattering, relativistic collision, pair-channel, and radiation-coupled reaction as $\mathcal{E}_{\mathrm{scat/rxn}}=(\mathfrak{L}_{\mathrm{in}},W_{\mathrm{int}},\mathfrak{T}_{\mathrm{cons}},\mathfrak{L}_{\mathrm{out}},\mathfrak{R}_{\mathrm{res}})$, with incoming ledgers, a finite interaction window, conserved transfers, outgoing ledgers, and residual checks all present. | A completed channel must drive every conservation defect to its declared tolerance after computed transfers are included and pass the independent benchmark comparison. Named unevaluated terms remain open. | If products are listed without incoming provenance, if the interaction window is hidden, if observer-level creation language bypasses identity routing, or if standard scattering limits are asserted without residual checks, the event grammar has failed. |
| Larmor/Liénard recovery | derivation target | Coarse-grain repeated planar-mode nucleation from smooth weak-field charged-assembly acceleration so that the nonrelativistic power scales as $P\propto\|\mathbf{a}\|^2$ and the relativistic observer-level limit recovers the Larmor/Liénard class after clock and rate conversion. | Sweep smooth acceleration histories at fixed weak homogeneous Noether sea state and recover the standard power and angular limits before claiming channel-specific deviations. | If the low-speed limit is not quadratic in acceleration, or if the relativistic limit requires a separately fitted radiation threshold, the radiation map is not closed. |
| Medium-speed and boundary radiation | derivation target | Recover Cherenkov radiation for uniform transport with $v>c_{\mathrm{phase}}$ and transition radiation at an abrupt material-response boundary from the same sea-dependent event grammar. | Derive threshold, angle or boundary dependence, spectrum, recoil, and material energy-momentum transfer without inserting an acceleration-only trigger. | If the model forbids radiation at constant velocity in these validated material regimes, or reproduces them only by relabeling a fitted photon source as a closure residual, the preparation map fails. |
| Bremsstrahlung emissivity | derivation target | Integrate the charged-assembly acceleration or deflection event record over impact parameters, screening, target geometry, and ensemble distributions to recover free-free emissivity, including $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{-1/2}e^{-h\nu/(k_B T_{\mathrm{temp}})}g_{\mathrm{ff}}$ and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{1/2}$ in the nonrelativistic thermal comparison. | With the required distributions and scale separations established as in [Ensemble Temperature](#ensemble-temperature), recover $d\sigma/dk$, screening, form-factor, and emissivity limits from the same channel record used by [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md). The cooling ratio alone does not establish those assumptions. | If cross-section and emissivity closure require different Noether sea state variables or hidden per-plasma fits, the channel fails as a derivation. |
| Shock cooling branch selection | derivation target | For jet heads, knots, dense gas impacts, and other supersonic working surfaces, use $\mathcal{R}_{\mathrm{cool}}=t_{\mathrm{cool}}/t_{\mathrm{dyn}}$ to diagnose cooling through the included channels, then derive thermal, non-thermal, and stored-energy shares from the complete response and rate record. | Compare source records against thermal and non-thermal shock benchmarks with declared distributions, optical depths, acceleration processes, and competing cooling rates. | If the model assigns spectral type or energy partition from the cooling ratio alone, or fits each share separately, the radiation branch has not closed. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Map anisotropic Noether sea state to effective magnetic transport and recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling-break behavior from curved charged-assembly routing. | Sweep $\gamma$, $B$, and pitch geometry while holding the same $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ mapping; recover the standard scaling before using synchrotron cascades in source or cosmology arguments. | If the factor-of-$\gamma^2$ frequency scaling is absent, or if the $B$ map must be redefined between trajectory curvature and emission, the synchrotron branch fails. |
| Pair thresholds and pair-channel provenance | derivation target | Recover the standard pair thresholds while preserving architrino inventory: for photon-photon pair production, the Gate C target includes $s\ge 4m_e^2c^4$ and $E_1E_2(1-\cos\theta_{12})\ge 2(m_ec^2)^2$ in the validated limit. | The event record must identify incoming photon assemblies, outgoing $e^+e^-$ assemblies, recoil or medium terms, and the standard threshold/cross-section limit. It must also decide the provenance fork: direct rearrangement from the two photon ledgers, or recruited and returned neutral Noether braid content from the Noether sea. | If pair production is described as creation from nothing, violates inventory conservation, hides which fork supplies the outgoing inventories, or shifts the threshold without a controlled new-physics claim, the pair channel is not closed. |
| Compton-like scattering | derivation target | Treat photon capture and re-release by a charged assembly as a Gate C vertex and recover the observer-level Compton shift $\lambda'-\lambda=(h/(m_ec))(1-\cos\theta)$, the Thomson low-energy limit, and the Klein-Nishina high-energy correction. | The same vertex record must close incoming photon data, charged-assembly recoil, shifted outgoing photon data, heat or residual excitation, and energy-momentum transfer. | If scattering is modeled only as phenomenological frequency loss, or if recoil and shifted photon provenance cannot close together, the Compton-like branch fails. |
| Photoelectric effect | derivation target | Treat photoelectric emission as a Gate C material-capture event, not as proof that photon energy is free-standing ontology. The threshold target is $h\nu\ge\Phi_{\mathrm{work}}$, with $K_{\max}=h\nu-\Phi_{\mathrm{work}}$ and $eV_s=K_{\max}$ in the validated limit. | The same surface event record must close incoming photon data, electron-envelope release, work-function threshold, recoil, heat or remnant excitation, and outgoing electron energy. Above threshold, intensity changes the event count while frequency controls the per-event energy available. | If subthreshold intensity can accumulate into emission without a declared intermediate excitation ledger, if stopping-potential linearity is fitted separately from the photon energy-frequency row, or if recoil, heat, and remnant rows disappear, the photoelectric branch fails. |
| Effective EM Gate residual | derivation target | Any use of Maxwell-level variables must satisfy $\mathcal{G}_{\mathrm{EM}}=(\Delta_{\mathrm{cont}},\Delta_E^{\mathrm{EM}},\Delta_{\mathbf{p}}^{\mathrm{EM}},\Delta_{\mathbf{J}}^{\mathrm{EM}},\Delta_{\mathrm{gauge}})$ in the declared standard-limit regime. Any additional event transfers must be computed and the enlarged balance rechecked; naming a residual is not closure. The capacitor-gap comparison is the minimal loop-surface check: the same boundary loop must give the same magnetic circulation whether the chosen surface cuts conduction current or changing electric flux. | Evaluate the effective continuity, Poynting-flux, Maxwell-stress, angular-momentum, and gauge-invariance residuals on the same event record used for photon or material routing. | If the channel recovers a spectrum while hiding charge continuity, stress recoil, gauge dependence, loop-surface dependence, or energy-momentum mismatch in the effective field layer, the EM comparison gate has failed. |
| Causal response-function analyticity | derivation target | Causal stable material response must recover analyticity for $\operatorname{Im}\omega>0$ and the applicable Kramers-Kronig relations, with instantaneous terms, high-frequency asymptotics, and any real-axis singularities treated explicitly as in [Photon-Material Surface Routing](#photon-material-surface-routing). | Check paired absorption and dispersion from one response kernel with the declared convergence and stability assumptions. | Acausal response or unexplained independent tuning fails the comparison; an unsubtracted formula applied outside its domain is not evidence against an otherwise causal material. |
| Material absorption/reflection/skin-depth ledger | derivation target | Surface events must use one ledger $\mathsf L_{\mathrm{surf}}(\omega,\theta,b)$ for reflection, transmission, absorption, remnant excitation, skin depth, complex wavenumber, response analyticity, and EM energy-momentum residuals. | Recover Fresnel/Snell/Brewster behavior in transparent limits, $\delta_{\mathrm{skin}}\rightarrow(2/(\mu\omega\sigma_{\mathrm{DC}}))^{1/2}$ in low-frequency Drude conductors, and plasma cutoff behavior near $\omega_p$. | If reflection is a hard bounce, absorption is untracked heat, skin depth is detached from conductivity, or longitudinal plasma oscillation is treated as a free photon mode, the material route fails. |
| Blackbody recovery | derivation target | Show that repeated emission, absorption, Compton-like redistribution, pair channels, and non-radiative exchange reach detailed balance with Planck occupation $\bar n_\gamma(\nu)=1/(\exp(h\nu/(k_B T_{\mathrm{temp}}))-1)$ and effective photon chemical potential driven to zero. | Recover the Planck spectrum, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff using one provenance record and one Noether sea state map. | If blackbody recovery needs per-observable retuning, unbalanced photon loading, or a different transport map from the source channels, the thermal branch fails. |
| Free photon polarization boundary | derivation target | Radiation pages may record polarization basis, transverse angular-momentum ledger, and observer-level polarization recoveries as downstream requirements, but free photon polarization, helicity, Malus' law, and analyzer statistics are Gate B results. | Every radiation, scattering, pair, or cosmology use of photon polarization must point back to the Gate B handoff instead of deriving new free-photon polarization rules locally. | If a channel page invents its own free photon polarization derivation, adds a longitudinal free mode, or treats Gate B as already proven inside radiation, the closure boundary is violated. |
| Noether sea-dependent radiation deviations | speculation | Deviations tied to $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, threshold floors, or transmitter-history transport are candidate predictions only after the validated limits above are recovered. | A proposed deviation must state the benchmark-preserving limit, the residual term, and the measurable regime before being used in a source model. | If a deviation is used to rescue a failed standard recovery or is fitted independently per observable, it is not accepted as radiation closure. |

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

[View →](../../../../../equation-mapping.html#corpus-equation-736f16fe291fca45)

This is a radiative closure program, not yet a completed derivation of blackbody radiation. It keeps strong source insights in play while preserving the distinction between ontology, derivation targets, effective summaries, and speculative extensions.

The final diagram specializes the rapid-drive case. Uniform-motion material radiation, initially excited sources, and photon capture use their own declared trigger and input records. Standard benchmark formulas in the tables carry their comparison domains: synchrotron scalings require the stated relativistic and pitch-angle limit; the two-photon threshold and Compton formula use a common inertial observer chart, with the Compton target initially at rest; the photoelectric maximum-energy and intensity-count relations refer to the single-photon regime. Outside that regime, multiphoton or intermediate-state processes require their own incoming energy and event accounting.

### Sources for Comparison Limits

The rate normalization and time-window restrictions in [Non-Radiative Shedding](#non-radiative-shedding) follow the standard comparison developed in B. Zwiebach, *Quantum Physics III*, MIT 8.06 (2018), [chapter 4, section 4.3, pp. 89–94](https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/89ef6d5958ee59bae9a91345c3d8c8e4_MIT8_06S18ch4.pdf). D. Tong, *Electromagnetism* (2015), [chapter 7, sections 7.5.4 and 7.6](https://www.damtp.cam.ac.uk/user/tong/em/el6.pdf), supplies the causal-response and conductor comparisons. These sources constrain effective recovery; they do not derive Architrino branches or material response.

## Atomic Transition Radiation

Atomic transition radiation is an exploratory mapping of atomic line emission and absorption into Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. A line is a narrow range of emitted or absorbed frequencies. An assembly is a collection of [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers whose past emissions supply delayed acceleration contributions; an envelope basin is a candidate persistent atomic response pattern. In this mapping an electron-assembly envelope changes basin, and the released energy is partitioned among a photon channel, recoil, medium excitation, and residual atomic energy. Action, which has energy-times-time units, requires its own derived ledger and is not interchangeable with the energy entries below. The atomic labels and transition mechanism remain recovery targets.

This page specializes the shared routing skeleton in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The envelope energies and spectral labels are inherited from [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md), while photon ontology and Gate A/B/C closure requirements are inherited from [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface). Reaction provenance follows [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), and cosmology-facing photon records remain downstream of [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

The proposed photon carrier is a coaxial contra-rotating polarity-conjugate planar pair: two planar braid configurations sharing an axis, circulating oppositely, and related by reversal of constituent polarities. Gate A tests its propagation and energy-frequency relation; Gate B tests its polarization and angular-momentum content; Gate C tests its emission and capture transitions. These are inherited proof requirements. This chapter specifies the atomic event record and the balances that a completed derivation must establish. The local [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), the proposed ambient population of neutral assemblies, can change during the event; its pre/post state must be accounted for rather than assumed unchanged.

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

[View →](../../../../../equation-mapping.html#corpus-equation-b9be97b2cf002651)

Here $\mathcal W_{\mathrm{nuc}}$ summarizes the nuclear constituents' delayed wakes, $\rho_{\text{NS}}(\mathbf X,T)$ is the physical Noether braid density, $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$ is its normalization by a fixed reference density, and $\chi_{\text{sea}}(\mathbf X,T)$ is the Noether sea delay factor. Positions $\mathbf X$ lie in the fixed Euclidean void and $T$ is absolute time. Both envelope energies use one common environment and energy calibration. For a changing environment, the reference gap minus the actual pre/post envelope-energy drop must be included exactly once in the resolved environment correction. The gap is an effective atomic quantity; existence and stability of its candidate basins remain dynamical obligations.

In the one-photon comparison, $h$ is the observer-level Planck energy-frequency calibration and $\nu_{a\to b}^{\mathrm{loc}}$ is the local phase frequency before observer clock/rate conversion. With all energy entries in that same calibration, the target line energy is

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

[View →](../../../../../equation-mapping.html#corpus-equation-85d921c8becb36d5)

The changes $\Delta E_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, and $\Delta E_{\mathrm{rem}}$ mean final minus initial center-of-mass kinetic energy, medium/environment energy, and residual internal energy not already included in the envelope labels. The partition must allocate interactions and environmental corrections without overlap. These changes can be negative; nonnegative shares describe the restricted case of an initially resting atom and passive channels taking up energy. An excitation already contained in $E_{\mathrm{env}}(b)$ cannot also be charged to $\Delta E_{\mathrm{rem}}$.

The observer-level frequency comparison then applies the $\left(\Gamma_N^{(\ell)}\right)^{-1}$ clock-rate conversion owned by [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md) and [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), where $\Gamma_N^{(\ell)}$ is the cadence-stretch diagnostic at the declared coarse-graining length $\ell$. Its physical derivation remains open. Gate A supplies the separate recovery target $E_\gamma\simeq h\nu_\gamma^{\mathrm{loc}}$; negligible non-photon terms additionally give $E_\gamma\simeq\Delta E_{a\to b}^{\mathrm{env}}$. In dense media, strong gradients, or unresolved recoil regimes, the non-photon terms remain explicit.

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

[View →](../../../../../equation-mapping.html#corpus-equation-2f406f80f0996c17)

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

[View →](../../../../../equation-mapping.html#corpus-equation-2e0c9ac5db9d4b6b)

For this residual, $\varepsilon_{\mathrm{evt}}>0$ is a fixed energy normalization floor and $\Delta_{\mathrm{evt}}^{\mathrm{tol}}>0$ is a dimensionless tolerance declared with the measurement or computation uncertainty. Neither may be retuned to make an event pass. Each balance entry must be extracted independently of the equality being tested: defining the remnant as the missing balance would make the residual identically zero.

The frequency readout must then agree with the local photon record through a separately evaluated Gate A relation:

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

[View →](../../../../../equation-mapping.html#corpus-equation-4bd962be19ab37c8)

Here $\varepsilon_\gamma>0$ has energy units and $\Delta_\gamma^{\mathrm{tol}}>0$ is dimensionless. The phase frequency must be measured from the photon record with an independently fixed $h$ calibration, rather than defined by $E_\gamma/h$. A small residual tests the declared readouts and uncertainty budget; it does not derive energy conservation or establish a photon branch.

The benchmark fails if a Rydberg-consistent line can be obtained only by dropping recoil, medium excitation, or residual atomic energy from the ledger; if the planar-mode gate is changed between hydrogen lines; if the photon-channel speed used by the spectral comparison differs from the emitted photon record; or if path-history provenance is not sufficient to replay which envelope transition produced the candidate pair. The leading Rydberg comparison also inherits Atomic Spectra's line-dependent correction budget; a common fitted scale alone does not predict its absolute value.

### Planar-Mode Gate

A basin transition is not automatically photon emission. The proposed planar-mode nucleation criterion in the radiation program includes the following necessary tests in the passive energy-sharing case:

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

[View →](../../../../../equation-mapping.html#corpus-equation-0d48d686f1b59903)

The symbol $\mathcal S_{\gamma}^{\mathrm{at}}$ denotes the proposed photon-channel drive, and $\mathcal S_{\gamma,*}$ its threshold in the same units. Its arguments record the pre/post atomic microstates $\Gamma_a,\Gamma_b$, the nuclear causal-wake envelope, local Noether sea state, and causal-root/Jacobian data $J_{\mathrm{loc}}$ including the transmitter-side acceleration weight. A causal root pairs a receiver event with a past transmitter emission whose wake reaches it; the Jacobian records how that root changes with time. The completed Gate C account must compute the drive from the delayed dynamics, not fit it separately for each line. The energy scale $E_{\gamma,\min}$ is a speculative minimum stable photon energy, not an established positive threshold.

The usable photon energy is the gap after all signed non-photon changes above have been included. It must be positive and, if the chosen model has an active minimum, at least $E_{\gamma,\min}$. Thus the displayed raw-gap test is insufficient: a gap larger than the minimum can still leave too little energy after recoil. Dynamic accessibility, constituent inventory, momentum and angular-momentum compatibility, and inherited Gate A/B acceptance are separate requirements.

The following two-case sketch is restricted to transitions for which those other requirements have already been established. Its photon-output case assumes the usable-energy test, and its non-radiative case assumes an accessible alternative channel. Outside that restricted domain a threshold comparison alone decides neither outcome; the event can remain unresolved or the transition can fail to occur:

$$
\text{envelope basin transition}
\longrightarrow
\begin{cases}
\text{planar-mode photon output}, & \mathcal S_{\gamma}^{\mathrm{at}}\ge\mathcal S_{\gamma,*},\\
\text{non-radiative shedding or retained excitation}, & \mathcal S_{\gamma}^{\mathrm{at}}<\mathcal S_{\gamma,*}.
\end{cases}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbca9f1eaffa2e4e)

### Event Ledger

A resolved emission event is tested against the following effective energy balance over one declared event boundary and time window. All entries share a reference frame, calibration, and disjoint allocation of stored and exchanged energy:

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

[View →](../../../../../equation-mapping.html#corpus-equation-2f406f80f0996c17-2)

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

[View →](../../../../../equation-mapping.html#corpus-equation-24c602bf263c5241)

Here $\Delta \mathbf p_{\mathrm{atom}}$ is the internal envelope-redistribution entry and $\Delta \mathbf p_{\mathrm{recoil}}$ is the center-of-mass recoil entry. In a declared center-of-mass decomposition the internal momentum sums to zero and the recoil entry is the atom's whole momentum change; this is a bookkeeping convention whose effective momentum map must be supplied. The medium entry must include the remaining boundary and wake-associated momentum exchange. If that partition has not been established, the displayed four-term balance is incomplete.

Angular momentum is tested component by component about one common origin and over the same event window. The following compact ledger requires a disjoint decomposition: the atomic term excludes center-of-mass recoil and any remnant or handoff contribution listed separately:

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

[View →](../../../../../equation-mapping.html#corpus-equation-92574b5038daf361)

The photon term $\mathcal J_{\gamma}^{\perp}$ is a Gate B handoff from the two-transverse-polarization sector. To use it in this balance, that handoff must supply the complete photon angular-momentum contribution, including orbital contribution about the declared origin; a polarization projection alone is insufficient. The superscript does not assert that the total angular-momentum vector is perpendicular to propagation. Recoil, wake, material handoff, medium, and remnant entries must also be independently defined and may not count the same transfer twice. A photon record carries its transverse polarization basis, helicity label where applicable, capture outcome, and no-longitudinal-polarization status. Photon spin, Malus' polarization-intensity law, and the squared-amplitude capture rule remain inherited derivations.

The minimum event record is:

| Field | Required content |
| --- | --- |
| Atomic state | Pre/post atomic envelope basins $a,b$, nuclear causal-wake envelope $\mathcal W_{\mathrm{nuc}}$, and closure status of the orbital labels used |
| Local Noether sea state | $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy if relevant, and local causal-root/Jacobian data including the same-record transmitter-side acceleration weight |
| Transition gap | $\Delta E_{a\to b}^{\mathrm{env}}$ and the clock/rate conversion used for observer comparison |
| Channel decision | Planar-mode gate status, non-radiative alternatives, and whether $E_{\gamma,\min}$ is active in the chosen model |
| Photon output or capture | $E_\gamma$, $\mathbf p_\gamma$, direction, phase frequency, local photon-channel speed $c_\gamma$, and Gate A null-branch status |
| Polarization handoff | Transverse basis, helicity label where applicable, accepted/rejected capture channel, Gate B event-residual status, and closure status |
| Recoil and medium terms | $\Delta E_{\mathrm{recoil}}$, $\Delta \mathbf p_{\mathrm{recoil}}$, $\Delta E_{\mathrm{med}}$, $\Delta \mathbf p_{\mathrm{med}}$, and any residual atomic excitation |
| Path-history provenance | Source identities, emission times, active causal-root branches, branch Jacobians, and delayed wake history needed for deterministic replay |
| Constituent routing | Before/after identities and $\epsilon_+/\epsilon_-$ polarity counts for atom, candidate photon, and participating Noether sea content, including any material returned after capture |
| Accounting and statistics | Common boundary, frame, time window, energy calibration, signed disjoint energy/momentum/angular-momentum entries, ensemble preparation, normalized source-basin measure, and declared uncertainties |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate |

### Absorption and Stimulated Channels

Absorption is the opposite energy-transfer channel to emission: an incoming candidate photon is captured while the atom enters a higher envelope basin. This channel description does not establish a literal time reversal of the full delayed history or a capture probability. For a matched environment and negligible remnant change, its compact energy target is

$$
b+\gamma \to a,
\qquad
E_\gamma
\simeq
\Delta E_{a\to b}^{\mathrm{env}}
+
\Delta E_{\mathrm{recoil}}
+
\Delta E_{\mathrm{med}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8e7a69364d20e9b9)

where the changes are evaluated for this absorption event, not copied from an emission event. If the remnant changes, $\Delta E_{\mathrm{rem}}$ must also be added to the right-hand side. For an initially resting atom in a passive environment, the photon supplies the gap plus recoil and any other uptake. This produces the recoil contribution to an emission/absorption line offset in the effective comparison. A moving atom or an excited medium can supply energy, so its change need not be positive.

In the momentum and angular-momentum balances, replace the outgoing photon contribution by the negative of the incoming contribution for absorption, and use the actual absorption pre/post atomic and medium states. The same event boundary and sign convention apply to every entry.

This is a proposed account of ordinary photon capture by the same atomic assembly. Atomic identity does not remove the constituent-routing obligation: the incoming pair's architrinos must remain explicitly assigned to the post-event atom, medium, or outgoing content. If the event has different outgoing Standard Model assemblies, the channel must additionally identify the target or Noether sea content supplying those inventories.

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

[View →](../../../../../equation-mapping.html#corpus-equation-44c7979f1ff98aac)

Here $\Delta E_{e\text{-env}}$, $\Delta E_{\mathrm{lat}}$, and $\Delta E_{\mathrm{sea}}$ are signed changes in electron-envelope, lattice, and Noether sea energy; the remnant excludes them. The equation assumes no unlisted external work or boundary flux. This extends the Gate C target to a distributed material final state. A Vantablack-like branch is the proposed limit of little escaping light after repeated interactions; small $E_{\gamma,\mathrm{out}}$ in a finite window alone does not distinguish absorption from delayed escape or storage. A metal-like branch is a proposed coherent outgoing-light channel. Neither limit is established by its name or energy balance; absorption, reflection, scattering, and thermalization require the corresponding response and transport histories.

Stimulated emission and absorption belong to the same Gate C rate program. In the weak homogeneous thermal-equilibrium comparison, pairwise detailed balance means equal forward and reverse ensemble fluxes. For resolved atomic sublevels and a matched photon mode, the target is:

$$
\Gamma_{a\to b+\gamma}\,f_a\,(1+\bar n_\gamma)
=
\Gamma_{b+\gamma\to a}\,f_b\,\bar n_\gamma
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2036c6f12a4f721e)

Here $f_a$ and $f_b$ are occupation weights of resolved atomic sublevels, and $\bar n_\gamma$ is the mean occupation of the matched photon mode. The two $\Gamma$ coefficients exclude the explicit occupation factors; $1+\bar n_\gamma$ separates spontaneous and stimulated emission in this comparison. If $a,b$ group degenerate sublevels, the coefficients must include the consistent sublevel sums and averages. An arbitrary weak homogeneous ensemble need not obey this equality: when $f_a>0$ and $\bar n_\gamma=0$, the emission flux can be positive while the absorption flux vanishes. Away from equilibrium their difference governs population change. The equilibrium condition and occupation factors remain observer-level recovery targets.

Optical dispersion adds the line-strength version of the same target. In the old Lorentz-Drude comparison, anomalous dispersion and absorption were summarized by an effective population of resonant oscillators for each line. The quantum correction was to read that measured coefficient through Einstein transition probabilities rather than as a literal count of independently vibrating electrons. In this chapter that coefficient belongs with Einstein coefficients and oscillator strengths as an observer-level comparison object. It must be recovered from the same Gate C rate ledger that supplies emission, absorption, stimulated channels, and detailed balance.

Matrix mechanics is the algebraic face of this Gate C target. Heisenberg's replacement of classical Fourier modes by indexed transition amplitudes is safe here only as observer-level comparison: the indices label pre/post atomic basins, the intensities project from Gate C rates, and the noncommutative product records how sequential transition quantities compose through intermediate basin labels. The multiplication rule is a recovery target for effective operator algebra, not a substrate postulate.

The practical rule is that a line may not use incompatible models for its frequency and strength. For a transition pair $a,b$, the gap, emission and absorption rates, dispersion response, and stimulated coefficients must share one event family, environment, photon branch, recoil convention, and ensemble preparation. A single deterministic event supplies neither an ensemble rate nor a complex transition amplitude. Dispersion and matrix composition additionally need the phase-sensitive response: magnitudes alone do not determine interference or the product of effective operators. A separate resonator population unrelated to the Gate C ensemble would be a fit rather than the stated recovery.

### Gate C Rate Target

The native rate target uses an ensemble of atomic, photon, and local Noether sea histories. First define a finite-window transition probability divided by its duration $T_W>0$, measured in absolute time. The symbol $\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ in this schematic expression denotes that window-dependent diagnostic, not an established constant transition rate:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\frac{1}{T_W}\,
\mu_{T_W}\!\left\{
\zeta\in\mathcal B_a:
\Phi_{T_W}(\zeta)\in\mathcal B_{b+\gamma}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-241c2b2b9867e389)

The set $\mathcal B_a$ denotes the prepared source basin, $\zeta$ includes the admissible delayed history and boundary data, and $\mu_{T_W}$ is a dimensionless probability measure conditioned on that preparation, with $\mu_{T_W}(\mathcal B_a)=1$. Its window restrictions must come from one declared ensemble rather than separate fits. The map $\Phi_{T_W}$ evolves that history over the window on a domain where existence and uniqueness hold. The target set $\mathcal B_{b+\gamma}$ includes a durable record that the specified transition occurred. If it records only the endpoint atomic state, an emission followed by recapture can be missed. Repeated events require an event count and source-basin residence time, not this single-event indicator.

For a normalized indicator probability $P_{ab}(T_W)$, the displayed diagnostic satisfies $0\le P_{ab}(T_W)/T_W\le1/T_W$. Hence its limit at fixed preparation as $T_W\to\infty$ is zero. For example, a comparison process with constant escape rate $\lambda>0$ has $P_{ab}(T_W)=1-\exp(-\lambda T_W)$: division by the window approximates $\lambda$ only while $\lambda T_W\ll1$. A survival probability $S_a(T_W)$ instead defines the conditional escape rate $-d\ln S_a/dT_W$ where differentiable; channel-specific rates additionally resolve the competing exits. These identities constrain how a rate is estimated; they do not supply the physical ensemble or transition law.

The weak-coupling recovery target is a rate extracted in a scale-separated window, long compared with the relevant correlation time but short compared with source depletion and finite-system recurrence. A plateau of the finite-window diagnostic in that domain, together with a justified continuum approximation, must recover the following observer-level structure:

$$
\Gamma_{a\to b+\gamma}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\longrightarrow
\frac{2\pi}{\hbar}
\left|
\langle b;\gamma|\widehat V_{\mathrm{eff}}|a;0\rangle
\right|^2
\rho_\gamma(\Delta E)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-56ce8a6c189f5810)

Here $\hbar=h/(2\pi)$, $\widehat V_{\mathrm{eff}}$ is an effective interaction operator, and $\rho_\gamma(\Delta E)$ is the density of available final states per unit energy under the same photon-mode normalization. The states $|a;0\rangle$ and $|b;\gamma\rangle$ label the initial atom with no photon in the selected mode and the final atom with one photon. The photon energy and available final states must include the recoil and other corrections already present in the event ledger; using the bare envelope gap is the ideal zero-correction limit. A density-only factorization further assumes that matrix-element variation over the summed states is controlled. Otherwise the squared matrix element belongs inside the state sum or integral. This formula uses one declared clock convention; any comparison with an observer rate requires the corresponding duration conversion.

The operator remains a comparison object. Its amplitudes, relative phases, state normalization, and coupling scale $\alpha$ must emerge from the same assembly and photon histories. Neither capture probabilities alone nor writing a squared-amplitude formula establishes that recovery.

For a general final channel $f$, the same scale-separated, consistently normalized comparison target is
$$
\Gamma_{a\to f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\rightarrow
\frac{2\pi}{\hbar}
\left|\mathcal{M}_{a\to f}^{\mathrm{eff}}\right|^2
\rho_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-542b0eccb2bd0902)

Here $\mathcal M_{a\to f}^{\mathrm{eff}}$ is the effective transition matrix element and $\rho_f$ the final-state density per unit energy, with the same sum-or-integral qualification. The arrows denote a recovery obligation, not an infinite-window limit of a bounded probability divided by time. Discrete atomic labels and continuum photon or recoil states must be derived and counted under one compatible ensemble and normalization.

Selection rules are Gate C closure targets for which channels have zero, small, or appreciable transition weight after the full event constraints are applied. Each statement names its approximation, ensemble, and channel; a forbidden leading contribution can coexist with higher-order, medium-assisted, or multi-photon transitions. Observing no events in a finite sample does not prove zero measure. Exact exclusion needs a symmetry or dynamical argument, while suppression requires an uncertainty bound relative to a declared rate scale.

### Observer-Level Recovery

The benchmark recoveries for this page are:

- spectral line frequencies after local clock/rate conversion;
- absorption and emission rates in the Fermi's Golden Rule limit;
- Einstein coefficient relations and detailed balance in thermalized ensembles;
- the hydrogen $2s\to1s$ two-photon continuum, with one vertex closing a shared ledger $E_{\gamma,1}+E_{\gamma,2}=\Delta E_{2s\to1s}^{\mathrm{env}}-\Delta E_{\mathrm{recoil}}-\Delta E_{\mathrm{med}}-\Delta E_{\mathrm{rem}}$ and both photons carrying separate Gate A/B rows;
- Lyman-$\alpha$ resonant trapping and escape as a coupled emission-capture-transport recovery, not as a modified local line gap;
- natural line widths as a recovery target for transition-time and basin-escape statistics;
- recoil, Doppler, pressure, Zeeman, Stark, fine-structure, and hyperfine corrections only after the relevant transport, medium, and spin-ledger dependencies are supplied.

Spin-sensitive line structure remains downstream of the angular-momentum proof program. This page may record the event ledger for such lines, but fine-structure, spin-orbit, Zeeman, and hyperfine interpretations must inherit the completed internal spinor ledger and measurement-response model rather than being derived from atomic spectra alone.

Cosmology-facing use of any line should keep source-branch changes separate from propagation. In the redshift factorization of [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#observable-frequency-form), an altered transition gap belongs in $B_X(E)$, while endpoint cadence, launch motion, and Noether sea path accumulation belong in their own factors. The [21 cm hydrogen line example](../../../../markdown/aaa/cosmology/expansion-mechanism.md#21-cm-hydrogen-line-example) applies this rule to hyperfine emission without treating the hyperfine splitting as closed here.

### Closure Status

Proposed ontology (referent-pending): a photon emitted or captured in this channel is modeled as a coaxial contra-rotating polarity-conjugate planar pair (the planar-pair acceleration-balance closure is still open), and atomic line radiation is a routed assembly-level transition rather than excitation of a separate fundamental electromagnetic field.

Derivation targets: compute $\mathcal S_{\gamma}^{\mathrm{at}}$, recover the weak-coupling transition-rate limit, derive selection-rule basin measures, close recoil and medium ledgers, recover the hydrogen $2s\to1s$ two-photon and Lyman-$\alpha$ escape bottlenecks, and recover detailed balance without changing the Noether sea state map between emission, absorption, and thermal ensembles. The named single-record closure requires frequency, emission and absorption strength, dispersion strength, stimulated coefficients, and continuum inverse channels to project from the same event family.

Effective summaries: orbital labels, line frequencies, Einstein coefficients, oscillator strengths, and effective operators remain useful comparison objects when their closure status is stated.

Speculative extensions: minimum stable photon energy, Noether sea-dependent line deviations, and basin-escape explanations of linewidths should remain provisional until the standard isolated-atom limits are recovered.

If the mapping reproduces standard line data only by preserving the same independent fit inputs and supplies no new cross-channel consistency constraint, its remaining value is interpretive rather than a derived reduction of the atomic-radiation description.

### Comparison Source

MIT OpenCourseWare, *8.06 Quantum Physics III* (Spring 2016), [Chapter 2: Time-Dependent Approximation Methods](https://www.ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2016/0c27511c09675d8d385577023328248b_MIT8_06S16_chap2.pdf), §§2.1–2.3, supplies the observer-level transition-rate, spontaneous/stimulated-emission, and thermal-equilibrium comparisons. Its quantum operators and photon occupation factors are comparison targets here. The bounded-probability argument above is a separate mathematical check on the proposed basin-measure definition.

## Bremsstrahlung

Bremsstrahlung ("braking radiation") is the standard electromagnetic comparison process in which emission accompanies the acceleration of a charged particle by another charge, typically an electron deflected by an ion or nucleus. An unbound encounter permits a continuous range of photon energies; the scattering geometry and projectile distribution determine the continuum spectrum. In practice it is a core process in nuclear and particle experiments, hot-plasma diagnostics, and high-energy astrophysical source modeling. The Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, material below is an exploratory mapping of this effective channel, not a claim that atomic or electron-envelope structure is a substrate premise.

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
- $E_{\mathrm{ref}}>0$: declared normalization energy for the provisional nucleation ansatz; it is not itself a photon floor.
- $\Gamma_{\mathrm{eff}}$: effective-time/proper-time conversion factor; its relation to the Noether sea cadence factor $\Gamma_N$ requires a clock and observer-chart projection.
- $\rho_{\text{NS}}(\mathbf X,T)$: local physical Noether braid density.
- $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$: density normalized to a declared reference $\rho_{\text{NS},0}>0$; $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ is the separate sea delay factor, with $c_{\text{eff}}$ the declared effective propagation speed.

### Physical Mechanism

In the standard Coulomb comparison, the projectile momentum changes by $\Delta \mathbf{p}$ and its acceleration contributes to radiation. For electron-ion bremsstrahlung, emitted power and spectral shape depend on target charge, projectile energy, scattering kinematics, screening, and medium optical depth.

Here acceleration includes changes in direction at nearly constant speed. At low photon energies, infrared-safe observables combine experimentally unresolved emission with the corresponding virtual corrections in quantum electrodynamics (QED). In material, interference among encounters during photon formation and dielectric response can suppress emission; a sum of independent local events is not valid in every regime. At high energies, relativistic corrections and recoil also become important.

### Prerequisites (Minimal)

- Photon assembly hypothesis (planar-mode photon-assembly language at micro level).
- Shared radiation routing in [Radiation](../../../../markdown/aaa/reactions/radiation.md).
- [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) acceleration law and its proposed coarse-grained transition map.
- Emergent metric/geodesic transport framework (observer-level propagation and lensing).
- Absolute-time to proper-time conversion rules used for rate equations.

<a id="mathbbamathbbamathbba-micro-physical-derivation-interpretive-map"></a>

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Micro-Physical Mapping

An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a persistent point transceiver with polarity and path history. Its causal wake is the expanding emission record that later reaches other architrinos. Assemblies are coupled configurations of these constituents; a Noether braid is their proposed neutral scaffold, and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient assembly population. Their motion is described in the fixed Euclidean void against absolute time $T$. Effective charge, energy, momentum, and radiation laws are observer-level quantities to recover from those histories.

Status convention used below:

- **Baseline:** established standard-physics relation retained unchanged.
- **Provisional map:** working $\mathbb{A}\mathbb{A}\mathbb{A}$ parameterization pending derivation.

#### Radiation Inheritance

Bremsstrahlung specializes the target-encounter channel of [Radiation](../../../../markdown/aaa/reactions/radiation.md). The standard phrase "acceleration drives radiation" remains the observer-level baseline. In the proposed assembly mechanism, the encounter disturbs a repeating internal history, creating a closure mismatch: a failure of the driven history to return to its reference configuration. A photon basin denotes the set of histories that produce a persistent propagating photon state. Deriving such a basin and its population measure remains necessary before assigning emission probabilities.

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

[View →](../../../../../equation-mapping.html#corpus-equation-329c2e76557aa51d)

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

[View →](../../../../../equation-mapping.html#corpus-equation-2e76edb7b02fd102)

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

[View →](../../../../../equation-mapping.html#corpus-equation-a469384a4795245d)

Here $E_C$ is a proposed closure-class energy functional. Its domain, reference branch, and rule selecting the "nearest stable rung" must be declared; a phase-space distance alone does not select an energetically accessible final state. The displayed difference is an available excitation energy only on a branch where the reference exists and the difference is nonnegative. It is not automatically the projectile's total energy loss.

The planar-mode gate is likewise inherited as a necessary eligibility condition in the proposed model:

$$
\mathcal{S}_{\gamma}^{\mathrm{br}}
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}^{\mathrm{br}}\ge E_{\gamma,\min}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b70f06ee5831829)

Both conditions must hold in this model, but neither proves a retained photon branch or guarantees an emission event. If no photon is produced, transferred energy remains in explicitly evaluated recoil, medium, wake, or remnant accounts; unchanged source energy is also possible. An unresolved account is not evidence of heating.

#### Wake Shock Definition (Channel Specialization)

In this document, a **wake shock** is the bremsstrahlung name for the inherited radiation closure residual when it is produced by strong target-induced deceleration of the electron Noether braid assembly. It is not merely a descriptive label for radiation. Operationally, the candidate mechanism (a derivation target, not an established result) is the threshold crossing where the electron assembly's internal curvature mode is driven across the field-speed symmetry point in a declared binary channel (near $v \approx c_f$), creating a transient high-curvature state that can shed energy into the surrounding Noether sea. Falsifier: simulated emission events that radiate without any internal-channel $c_f$ crossing would falsify the wake-shock identification.

A minimal trigger condition is written as

$$
\mathcal{I}_e\!\left(\rho_{\text{NS}}(\mathbf X,T),\left\|\frac{d\mathbf{V}_e}{dT}\right\|,\Xi_e\right) \ge \mathcal{I}_{\mathrm{crit}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1bc47837a9f5324b)

Here $\Xi_e$ denotes internal state variables, $\mathcal I_e$ is a proposed excitation diagnostic, and $\mathcal I_{\mathrm{crit}}$ is its proposed threshold. Neither is evaluated here. The deterministic Master Equation supplies accelerations from path history; a statistical transition kernel requires a separately declared ensemble and outcome map. The inequality alone supplies neither that kernel nor a photon-producing trajectory.

The proposed mechanism associates target-induced changes in constituent paths with an increase in $\mathcal{R}_{\Theta}^{\mathrm{br}}$. In the canonical Master Equation, each acceleration contribution combines inverse-square proximity with the transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ measures how transmitter motion spaces the arriving wake surfaces. That factor is counted once. Receiver motion changes root playback and the subsequent deflected path, but it does not multiply an already arriving acceleration. Photon formation from those histories remains a proposed transition into a coaxial contra-rotating polarity-conjugate planar pair. Its acceleration balance, persistence, and emission probability remain open under [Photon Referent Status](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-referent-status).

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

[View →](../../../../../equation-mapping.html#corpus-equation-5bddc2ba724f7231)

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

[View →](../../../../../equation-mapping.html#corpus-equation-6152bb94e2f88850)

Here $E_{\gamma}$ is emitted photon energy, $\Delta E_{\mathrm{recoil}}$ is the target's recoil-energy change, $\Delta E_{\mathrm{med}}$ is genuine medium excitation, and $\Delta E_{\text{rem}}$ is excitation retained above the chosen final reference. This reduced equation applies only when additional wake and handoff energy changes vanish within the declared tolerance, and external driving has ended. Otherwise those changes remain explicit in the full budget. It is not obtained merely by selecting the energy component of the preceding source-depletion identity.

For an arithmetic example in normalized wake-speed units with $c_f=1$, choose an arbitrary comparison energy unit. A prepared excitation of ten units that emits six and retains four loses six units from the source. Its initial excitation and its source depletion are different quantities. In an encounter, the formation of that excitation and any change in projectile group motion need their own accounted transfer. The approximation $\Delta E_e\approx E_{\text{exc}}^{\mathrm{br}}$ therefore requires a derived relation between the chosen preparation and final reference, not just small recoil. For a heavy target initially at rest, declaring recoil energy negligible requires an independent estimate below the event's energy tolerance; finite recoil momentum remains in the momentum budget.

Interpretive takeaway: this section defines event-level state transition and bookkeeping, not a replacement of validated QED cross-sections.

#### Provisional Effective Parameterization (Pending Derivation)

To make the wake language calculable, the $\mathbb{A}\mathbb{A}\mathbb{A}$ program uses a provisional mapping ansatz. The variable $\mathcal{S}_{\mathrm{wake}}$ is an effective proxy for the inherited photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{br}}$, not a separate radiation ontology. This is a working effective form pending derivation from the Master Equation, not a claimed first-principles closure:

$$
\mathcal{S}_{\mathrm{wake}} \equiv A_{\mathrm{tb}} \, \bigl[\rho_{\text{NS}}(\mathbf X,T)\bigr]^{p_\rho} \left\|\frac{d\mathbf{V}_e}{dT}\right\|^{p_a}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-58c156aba5292fb1)

The ansatz assumes a candidate photon basin separated by a local barrier; it does not exhibit a stable attractor. The threshold scale $\mathcal{S}_*>0$ is an effective proxy for $\mathcal{S}_{\gamma,*}$. Require $A_{\mathrm{tb}}\ge0$, finite $\mathcal{S}_{\mathrm{wake}}\ge0$, $E_{\text{exc}}^{\mathrm{br}}\ge0$, and $E_{\mathrm{ref}}>0$. The dimensions of $A_{\mathrm{tb}}$ compensate the density and acceleration powers so that $\mathcal{S}_{\mathrm{wake}}/\mathcal S_*$ is dimensionless. A domain containing zero density or zero acceleration must exclude exponents that make this proxy singular. The following exponential is a proposed response per declared encounter window, conditional on satisfying the inherited energy floor:

$$
P_{\mathrm{nuc}} = 1 - \exp\!\left[-\left(\frac{\mathcal{S}_{\mathrm{wake}}-\mathcal{S}_*}{\mathcal{S}_*}\right)_+ \left(\frac{E_{\text{exc}}^{\mathrm{br}}}{E_{\mathrm{ref}}}\right)\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-39838758c5c2a16a)

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

[View →](../../../../../equation-mapping.html#corpus-equation-933fba4042b97473)

The effective metric $g^{\mathrm{eff}}_{\mu\nu}$ and electron four-velocity $u_e^\mu$ belong to a declared observer chart. Here $\nabla g^{\mathrm{eff}}$ can only denote coordinate-gradient data unless another derivative is specified: the metric-compatible covariant derivative of the metric is zero. Coordinate gradients alone are chart-dependent and cannot serve as an invariant local trigger. Equivalence of this parameterization with the path-derived proxy requires a constitutive map; it does not follow from rewriting its arguments.

#### Emergence of Radiation from Assembly Dynamics

The proposed emergence route has four parts:

1. **Mechanism hypothesis:** encounter-driven internal reconfiguration produces a closure mismatch $\mathcal{R}_{\Theta}^{\mathrm{br}}$ and a nonnegative excitation budget on a declared reference branch; eligible histories are candidates for photon formation.
2. **Microstate mapping target:** derive the relation between $\mathcal I_e$, the two eligibility gates, and the measure of histories that actually emit. A scalar threshold alone does not establish $P_{\mathrm{nuc}}>0$.
3. **Classical-limit recovery (open derivation target):** for many emissions over smooth trajectories, coarse-grained power must recover the standard acceleration-radiation scaling (Larmor/Liénard class) in weak-coupling validated regimes; this recovery has not been derived and is graded open in the [Radiation closure-target ledger](../../../../markdown/aaa/reactions/radiation.md#radiation-closure-target-ledger).
4. **Declared breakdown regime:** near unresolved ultra-strong-field or ultra-high-energy domains, this effective mapping is not assumed complete and requires direct Master Equation treatment.

### Core Equations (Observer-Level Baselines)

Observer-level baselines in this chapter use SI units (explicit $\epsilon_0$); the Gaussian-unit displays in [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md) declare their convention locally.

A compact emissivity form for nonrelativistic electron-ion free-free emission, with nondegenerate Maxwellian electrons at temperature $T_{\mathrm{temp}}$, is

$$
\epsilon_{\nu}^{\mathrm{ff}} \propto Z^2 n_e n_i T_{\mathrm{temp}}^{-1/2} e^{-h\nu/(k_B T_{\mathrm{temp}})} g_{\mathrm{ff}}(\nu,T_{\mathrm{temp}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-520d7f9d5ee80114)

Here $Z$ is the ion charge number, $n_e$ and $n_i$ are electron and ion number densities, $\nu$ is frequency, $h$ is Planck's constant, $k_B$ is Boltzmann's constant, and $g_{\mathrm{ff}}$ is the Gaunt correction factor. Define $\epsilon_\nu^{\mathrm{ff}}$ as energy emitted per volume, time, frequency, and solid angle, in the plasma rest frame. Angle-integrated emission is $4\pi\epsilon_\nu^{\mathrm{ff}}$ for isotropic emission. For mixtures, replace $Z^2n_i$ with the ion-species sum $\sum_i Z_i^2n_i$. Dense, strongly coupled, degenerate, or relativistic plasma requires an appropriate kinetic and dielectric calculation; it is not covered by changing a Debye cutoff alone. Frequency integration gives the approximate temperature scaling

$$
\epsilon_{\mathrm{ff}} \propto Z^2 n_e n_i T_{\mathrm{temp}}^{1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-647af9e15934a4da)

For high-energy scattering language, the differential yield is tracked with $d\sigma/dk$ (photon energy $k$), including screening and Coulomb corrections in the target.

The temperature scaling suppresses the thermally averaged Gaunt factor and holds within the stated thermal regime. These observer-level equations are recovery targets. The wake-shock proposal supplies a candidate account of their provenance; it has not derived them.

Free-free absorption is the inverse-bremsstrahlung partner of this emissivity. For thermal electrons obeying the detailed-balance assumptions, the observer-level Kirchhoff relation uses the net absorption coefficient $\alpha_\nu^{\mathrm{ff}}$, including stimulated emission, and the Planck specific intensity $B_\nu(T_{\mathrm{temp}})$:

$$
\alpha_\nu^{\mathrm{ff}}
=
\frac{\epsilon_\nu^{\mathrm{ff}}}{B_\nu(T_{\mathrm{temp}})}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cd313d722c812c8b)

Using angle-integrated emissivity in this equation would require an additional $4\pi$ in the denominator. The relation concerns local transfer coefficients; it does not require the actual radiation field to be Planckian. The [free-free derivation by Condon and Ransom](https://www.cv.nrao.edu/~sransom/web/Ch4.html), equations 4.29–4.39 and 4.51, makes the angular normalization and thermal distribution explicit.

For fixed ionization and composition in the ideal thermal regime, the Rosseland mean opacity per unit mass has the Kramers scaling $\kappa_{\mathrm{ff}}\propto\rho T_{\mathrm{temp}}^{-7/2}$, where $\rho$ is material mass density. This is a weighted inverse-opacity average appropriate to diffusive radiation transport, not the unweighted frequency integral of emissivity. Emission and absorption must arise from the same encounter dynamics with the appropriate distributions and stimulated contribution. Independent fits alone do not establish detailed balance.

#### Shock-Cooling Ledger in Outflows

Jet and outflow shocks require an additional branch check before a continuum component is identified as bremsstrahlung or free-free emission. In dense radiative shocks, such as many young-stellar-object working surfaces, the total cooling function $\Lambda(T_s)$ is usually dominated by line cooling, recombination, molecular, or other channel rows over part of the temperature range. Bremsstrahlung is retained only for the part of the emissivity budget that the local plasma state actually assigns to free-free emission.

For an optically thin, fully ionized hydrogen cell with one electron-ion temperature $T_s$ and ideal-gas ratio of specific heats $\gamma_{\mathrm{gas}}>1$, use the observer-level cooling estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ee71137279fbf3b4)

Here $n_H$ counts hydrogen nuclei and $n_e n_H\Lambda(T_s)$ is radiated energy per volume and time. The numerator divided by $\gamma_{\mathrm{gas}}-1$ is the thermal energy density in this restricted composition. Other ions, neutrals, molecular degrees of freedom, or ionization energy require their own energy contributions. Compare this cooling time with the flow time $t_{\mathrm{dyn}}\sim \ell_j/v_j$, where $\ell_j$ is a zone length and $v_j$ its flow speed in the same frame. Define the fractional free-free contribution, using the same $n_e n_H$ normalization for both cooling coefficients, by

$$
f_{\mathrm{ff}}
=
\frac{\Lambda_{\mathrm{ff}}(T_s,n_e,n_i,Z)}
{\Lambda(T_s)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-078029bf434891a8)

A separate free-free component is included when this fraction exceeds the declared modeling threshold. A smaller component still contributes to the remainder budget; its energy is not reassigned to a different physical channel. The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is to derive which event records feed each cooling channel while preserving the full energy ledger.

### Core Channels (Inclusion Rule)

For a practical channel inventory, list components contributing at least about 1% of the modeled emissivity, opacity, or energy loss in the declared regime. Bremsstrahlung is a scattering/transport process, so this fraction is not a particle branching ratio. Bound the combined omitted contribution against the required accuracy; many individually small channels can be important in aggregate. Conservation and detailed-balance accounts retain the full contribution regardless of display threshold.

- $e^- + Z \rightarrow e^- + Z + \gamma$ (electron-ion/nuclear bremsstrahlung baseline channel).
- $e^+ + Z \rightarrow e^+ + Z + \gamma$ (positron analog in mixed plasmas/beams).
- Thermal free-free ensemble channel (many-event superposition governing continuum emissivity).
- Inverse bremsstrahlung/free-free absorption (the same encounter family with incoming photon energy routed into charged and medium motion).

Associated pair/Compton channels are included when they exceed the same contribution threshold in the modeled zone.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Bremsstrahlung hypothesis:** target-induced acceleration drives the inherited closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$; photon-eligible histories require a derived outgoing mode and energy-momentum transfer.
- **Positron analog:** the projectile charge is reversed. At a fixed target this changes the interaction and generally the trajectory; it does not simply reverse the electron trajectory or prove equal rates. The positron encounter requires its own kinematic and Coulomb-correction benchmark.
- **Thermal ensemble target:** recover free-free emissivity by averaging the admissible encounter histories. An independent-event sum requires formation-length and medium-interference effects to be negligible or explicitly included.
- **Free-free absorption target:** derive incoming-photon transfer into charged-assembly motion, recoil, and medium excitation from the same microscopic encounter family with the appropriate initial-state distribution.

### Shared Photon Event Record

Use the same photon-channel event record here as in [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). A bremsstrahlung planar-mode event should record:

- incoming and outgoing charged assembly identity, momentum, and path-history provenance;
- target assembly identity, recoil term, and coherent or resolved geometry regime;
- local Noether sea state variables $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, excitation state, and relevant causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{br}}$, excitation energy $E_{\text{exc}}^{\mathrm{br}}$, and wake-strain or shock-intensity status relative to the planar-mode threshold;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon emission residual, including source depletion, recoil, causal-wake transfer, retained and rejected handoff contributions, helicity, and balance terms;
- causal-wake ledger and identity-routing fields from the shared radiation schema, so photon output is not treated as a source of new substrate identities;
- residual medium excitation $\Delta E_{\mathrm{med}}$ and any non-radiative channel that receives sub-threshold energy.

This record is a derivation target. It should recover standard $d\sigma/dk$, screening, form-factor, and emissivity limits before any Noether sea-dependent deviation is treated as physical. The polarization basis and transverse angular-momentum account follow the photon conditions in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md); this chapter records emission provenance, not photon spin closure.

<a id="ir-regularization-as-a-stability-floor"></a>

### Infrared Behavior and the Candidate Stability Floor

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

### $Z^2$ Scaling and Finite-Geometry Resolution

In the standard comparison, coherent nuclear scattering adds amplitudes from the proton charges before squaring. Let $q_{\mathrm{tr}}$ denote momentum-transfer magnitude and $R_{\mathrm{nuc}}$ nuclear radius. The phase-resolution parameter is $q_{\mathrm{tr}}R_{\mathrm{nuc}}/\hbar$, where $\hbar$ is the reduced Planck constant. Impact parameter alone does not fix momentum transfer independently of projectile energy and encounter kinematics.

- **Coherent elastic contribution:** unresolved proton phases give $Z^2$ scaling. Finite nuclear size suppresses this contribution through the normalized elastic form factor, with $F(0)=1$.
- **Resolved inclusive contribution:** incoherent scattering sums probabilities over distinguishable final states. A contribution proportional to $Z$ requires an additional structure function; it is not produced by multiplying the coherent $Z^2$ term by $|F|^2$.

For independent identical proton-position distributions, expanding the squared amplitude gives the illustrative structure factor $Z+Z(Z-1)|F|^2$. Its coherent elastic part is $Z^2|F|^2$ and its variance is $Z(1-|F|^2)$. At $F=0$ the elastic part vanishes while the inclusive sum retains $Z$. Correlations, recoil, excitation thresholds, and constituent response can change this simple limit. Atomic-electron screening is separate from nuclear-size resolution. In the assembly interpretation, deriving these amplitudes and inclusive sums from proton and electron histories remains a recovery target; deviation from $Z^2$ alone does not identify a Noether braid mechanism.

A speculative multiplicative correction to the coherent elastic contribution can be written as

$$
\frac{d\sigma}{dk} \propto Z_{\mathrm{eff}}^2 \, |F(q_{\mathrm{tr}}^2)|^2 \, \left[1+\delta_g(r,\Phi_{\text{eff}})\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-81a3234d5ca1d29f)

Here $Z_{\mathrm{eff}}$ represents the declared screened charge factor, $k$ is photon energy, $r$ is a declared environmental location variable, and $\delta_g$ is an uncomputed dimensionless correction depending on the effective potential $\Phi_{\mathrm{eff}}$. Positivity requires $1+\delta_g\ge0$; benchmark compatibility requires the correction to vanish or remain within independently measured uncertainty in the comparison regime. This ansatz omits the resolved incoherent contribution and does not derive compact-object transport.

### Momentum-Flux Closure at Emission

An effective event record must recover momentum balance. With each $\Delta\mathbf p$ defined as outgoing minus incoming momentum, a reduced balance is

$$
\Delta \mathbf{p}_e + \mathbf{p}_{\gamma} + \Delta \mathbf{p}_{\mathrm{recoil}} + \Delta \mathbf{p}_{\mathrm{med}} = 0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7c49bf1ca81f2945)

Here $\mathbf p_\gamma$ is outgoing photon momentum and no incoming photon is included. These momentum-change signs differ from the source-depletion sign used for $\Delta\mathcal Q_e^0$ above. The reduced equation is valid only if wake, handoff, and other boundary momentum fluxes vanish or are explicitly included in the listed terms without double counting. Otherwise they must be added. No conserved assembly momentum functional has been derived here from the master equation.

For a sufficiently heavy, slowly recoiling target, finite recoil momentum can carry little recoil energy in the effective description. This does not imply that recoil dominates the vector balance. Momentum conservation constrains but does not determine the angular distribution; that distribution requires the encounter dynamics and radiation map.

The radiation-zone benchmark is stronger than total momentum balance. For a classical point-charge comparison with collinear velocity and acceleration, including antiparallel deceleration, let $\mathbf a=d\mathbf v/dt_{\mathrm{eff}}$, $\beta=\|\mathbf{v}\|/c$, $\gamma=(1-\beta^2)^{-1/2}$, and $\theta$ be the angle between the outgoing radiation direction and $\mathbf{v}$. Here $q$ is electric charge, $\epsilon_0$ vacuum permittivity, and $c$ the observer-level light speed, not a new numerical value for $c_f$. The power per unit emission time $t_{\mathrm{eff}}$, evaluated at the retarded source event, is

$$
\frac{dP_{\mathrm{br,std}}}{d\Omega}
=
\frac{q^2\|\mathbf{a}\|^2}{16\pi^2\epsilon_0c^3}
\frac{\sin^2\theta}{(1-\beta\cos\theta)^5}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e95e79369ff6f294)

The fifth power in the denominator refers to emission time. Power per detector arrival time has a sixth power because $dt_{\mathrm{arr}}=(1-\beta\cos\theta)\,dt_{\mathrm{eff}}$ for the distant stationary-observer comparison. The distinction and collinear restriction follow from the standard radiation derivation ([Kaplunovsky, *Radiation from Accelerated Charges*, equations 71–79](https://web2.ph.utexas.edu/~vadim/Classes/2022s/accel.pdf)). General deflecting trajectories require the full vector angular kernel; quantum, screening, and medium corrections require their own benchmark. None of these standard laws is an architrino-level premise.

Angular integration in this collinear classical regime gives the corresponding total power

$$
P_{\mathrm{br,std}}
=
\frac{q^2\gamma^6\|\mathbf{a}\|^2}{6\pi\epsilon_0c^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5184fa9700cf1bac)

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

[View →](../../../../../equation-mapping.html#corpus-equation-f154785a1a258d4a)

The power ratio is defined only for a positive reference integral, and the angular ratio only where the reference angular power is positive. At the axial nodes $\theta=0,\pi$, or in a zero-acceleration control, use absolute or finite-bin differences instead. Recovery requires both residuals to approach zero within stated errors in a common benchmark regime; this chapter supplies no measured convergence result. Applying corrections to one side does not preserve the displayed uncorrected benchmark automatically. The emitted photon ledger must independently satisfy the $\Delta_{\gamma,\mathrm{flux}}$ test from [Radiation](../../../../markdown/aaa/reactions/radiation.md); a correct-looking spectrum alone does not close energy and momentum transfer.

### Time Parameterization (Effective Observer Time vs Proper Time)

Rate equations in this file are observer-level unless noted, written against the effective observer time $t_{\mathrm{eff}}$; substrate evolution remains in absolute time $T$. Convert via

$$
\frac{dE_e}{d\tau_e} = \frac{dE_e}{dt_{\mathrm{eff}}}\,\frac{dt_{\mathrm{eff}}}{d\tau_e},
\qquad
\frac{dt_{\mathrm{eff}}}{d\tau_e} = \Gamma_{\mathrm{eff}}(v_e,\rho_{\text{NS}}(\mathbf X,T),\Phi_{\text{eff}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ffca71ed870457ae)

The first equality is the chain rule, assuming a differentiable monotone clock map; it does not provide that map. Let $J_e=dt_{\mathrm{eff}}/dT$ be the observer-chart Jacobian along the electron history and let $\Omega_e/\Omega_{e,0}=d\tau_e/dT$ be the normalized electron-clock cadence. Then $\Gamma_{\mathrm{eff}}=J_e/(\Omega_e/\Omega_{e,0})$. In [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), $\Gamma_N=1/C_N$ is the inverse normalized Noether sea cadence, not automatically an electron-clock conversion. Identifying the clock cadence with $C_N$ requires a vanishing clock/sea mismatch; identifying $\Gamma_{\mathrm{eff}}$ with $\Gamma_N$ also requires $J_e=1$. Recovery of $\gamma$ is a further conditional target.

A proposed weak-correction parametrization is

$$
\Gamma_{\mathrm{eff}} \approx \gamma(v_e)\,\left[1+\delta_{\rho}(\rho_{\text{NS}}(\mathbf X,T))+\delta_{\Phi}(\Phi_{\text{eff}})\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-153e484cb4cb3d2c)

with $\gamma(v_e)=1/\sqrt{1-v_e^2/c^2}$ in the declared effective chart. The smallness of $\delta_\rho$ and $\delta_\Phi$ is a benchmark constraint, not a measurement reported here. Density and effective potential can encode the same sea variation, so their corrections cannot be fitted as independent contributions without a derivation that prevents double counting. The proposed argument list may also be insufficient when clock response depends on additional assembly state or history.

Connecting cooling to absolute-time evolution requires both $J_e$ and the electron-clock cadence, with their applicable domains established independently.

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

[View →](../../../../../equation-mapping.html#corpus-equation-46bbdaa5dfbbd001)

Define the net transfer by $1+z_X=\nu_E/\nu_R>0$, using endpoint frequencies in declared observer frames. The decomposition above is bookkeeping only until its terms are independently specified. For collisionless, nondispersive propagation admitting a metric geometric-optics description and conserving photon phase-space occupation, a restricted observer-level transfer target is

$$
I_\nu^{\mathrm{obs}}(R) = (1+z_X)^{-3}\,I_{\nu(1+z_X)}(E)\,\mathcal{T}(\nu, E\to R)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-593608113225bea2)

Here $\nu$ is received frequency, $I_\nu$ is specific intensity per frequency and solid angle along the declared ray, and the source intensity is obtained by radiative transfer through the emitting column, not by identifying it with local emissivity. With no intervening interactions, $\mathcal T=1$ and invariance of $I_\nu/\nu^3$ gives the cubic factor. A multiplicative $\mathcal T$ can additionally describe pure attenuation out of that ray and frequency, with no in-scattering, frequency redistribution, or distributed source term. General plasma scattering, emission, or sea-mediated energy exchange requires a transport equation with the appropriate source and redistribution terms; logging an arbitrary $Y_{X,\mathrm{path}}$ does not establish the invariant.

For frequency-independent $z_X$ and $\mathcal T=1$, integrating with $d\nu_E=(1+z_X)d\nu_R$ gives the bolometric factor $(1+z_X)^{-4}$. A frequency-dependent transmission must remain inside the integral. In a homogeneous metric comparison, $1+z=(1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$ is valid when both endpoint factors use the same reference; no expansion or metric dynamics is derived from that notation.

### Thermal Equilibrium Assumptions in Evolving Noether Sea States

Thermal free-free emissivity assumes the specified electron distribution and encounter physics; a Maxwellian electron distribution does not by itself require an equilibrium radiation field. Kirchhoff's relation requires the corresponding detailed-balance conditions. To diagnose one possible departure from local equilibrium in evolving Noether sea states, define

$$
\mathcal{R}_{\mathrm{LTE}} \equiv \frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96f88ca8e700036b)

- **$\mathcal{R}_{\mathrm{LTE}} \ll 1$:** the specified coupling is faster than cooling. This supports an equilibrium approximation only if it is the relevant equilibration process and is also faster than driving, transport, and state evolution. Electron thermalization, electron-ion energy exchange, and changes in ionization state can have different timescales.
- **$\mathcal{R}_{\mathrm{LTE}} \gtrsim 1$:** that coupling cannot maintain equilibrium against cooling by timescale separation alone. An independently faster equilibration process may still maintain the electron distribution; otherwise evolve the distribution rather than assuming a single temperature $T_{\mathrm{temp}}$.

This ratio is not a sufficient LTE criterion and does not determine whether radiation is Planckian. A plasma may have approximately thermal free-free coefficients while its optically thin escaping radiation remains far from equilibrium.

### Geodesics and Lensing Consistency

In a transparent, nondispersive geometric-optics regime where an effective metric has been established, the standard propagation target is

$$
ds_{\mathrm{eff}}^2 = 0,\qquad k^\mu \nabla^{\mathrm{eff}}_\mu k^\nu = 0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3891d730ab9c321d)

with $ds_{\mathrm{eff}}^2$ and $\nabla^{\mathrm{eff}}$ built from $g^{\mathrm{eff}}_{\mu\nu}$ and $k^\mu$ the affinely parametrized ray tangent. These equations are an effective recovery target, not a substrate law or a derivation of that metric. In a dispersive plasma, the frequency-dependent propagation law must instead be established from the medium response; a vacuum null-geodesic approximation is not automatic, especially near a plasma cutoff.

### Observer-Level Closure Checks

Per the authoring rule in [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md), the closure checks for this channel are collected here:

- **Radiated-power recovery:** compare independent mapped and reference instruments in the same classical collinear regime, with the same emission-time convention and positive denominators. Use absolute or finite-bin differences at nodes, and separately specified benchmarks when corrections change the target.
- **Photon ledger closure:** the emitted photon must pass $\Delta_{\gamma,\mathrm{flux}}=0$ from [Radiation](../../../../markdown/aaa/reactions/radiation.md).
- **Event conservation:** retain the complete source, wake, handoff, photon, recoil, and medium accounts. Use the reduced energy and momentum rows only after verifying their omitted terms and remnant convention.
- **Equilibrium validity:** test the electron distribution and all relevant equilibration times against state evolution; $\mathcal R_{\mathrm{LTE}}$ alone is insufficient. Recover emissivity and net absorption with consistent angular normalization and microscopic detailed balance where applicable.
- **Cross-section recovery:** distinguish coherent elastic form-factor suppression from resolved inclusive scattering, atomic screening, and material formation effects in the declared benchmark regime.

### Photon Ontology Note

The photon candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a coaxial contra-rotating polarity-conjugate planar pair assembly whose acceleration-balance and physical branch existence remain unresolved. Relating many such candidate emissions to effective field language is a proposed coarse-graining map. In this file, $\mathbf p_\gamma$ denotes the effective momentum assigned to a candidate emitted carrier; neither that assignment nor standard QED rates supplies a conserved primitive architrino momentum or proves that the carrier exists.

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

If that map reproduces standard continua only by retaining independent emissivity and absorption fits, without reducing parameter freedom or adding a cross-channel consistency constraint, it remains an optional interpretive layer rather than a derived improvement.

## Synchrotron

Synchrotron radiation is the observer-level process in which relativistic charged particles following curved paths in a magnetic environment emit broadband, polarized photons. A synchrotron cascade begins when those photons trigger secondary channels such as pair production and the new charged particles radiate again. The cascade redistributes injected particle energy into broadband non-thermal emission, with spectral shape set by magnetic field strength, source compactness, transport geometry, and escape times.

### Scope

This chapter presents synchrotron-cascade theory first in standard observer-level form, then in a provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology map that preserves established reaction physics. The classical formulas assume ultrarelativistic leptons, negligible quantum recoil per emitted photon, and a magnetic field approximately uniform over the radiation formation region. They are recovery targets, not premises for individual architrino motion. Unless a transport transformation is stated, $B$, particle energy, frequency, power, and cooling duration refer to the same local plasma rest frame, with effective coordinate time $t_{\mathrm{eff,src}}$. A distant observer's arrival time requires a separate propagation and bulk-motion map.

Terminology follows [Mode Taxonomy](../../../../markdown/aaa/reactions/mode-taxonomy.md): **planar-mode nucleation** names the proposed reorganization of existing architrinos into a propagating photon carrier; `corridor` terms are reserved for weak-channel contexts. An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a persistent polarity-bearing point whose past trajectory fixes its expanding causal wake. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) sums delayed wake contributions as accelerations in fixed Euclidean space and absolute time $T$. A [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) is a candidate neutral assembly of coupled architrino histories; the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient population of such structures. Their response and the proposed planar photon carrier require their own dynamics and stability evidence.

### Notation Snapshot

- $\gamma=(1-\beta^2)^{-1/2}$: electron/positron Lorentz factor in the declared local effective frame, with $\beta=\|\mathbf v\|/c$ and $c$ the observer-level vacuum light speed.
- $B$: local magnetic-field amplitude.
- $U_B = B^2/(8\pi)$: magnetic energy density.
- $\nu_c$: characteristic synchrotron frequency.
- $P_{\mathrm{syn}}$: synchrotron power per particle.
- $\tau_{\mathrm{syn}}$: synchrotron cooling timescale.
- $\tau_{\mathrm{esc}}$: escape/advection timescale.
- $\tau_{\gamma\gamma}$: pair-production optical-depth proxy.
- $\mathcal{V}_{\mathrm{NS}}$: provisional anisotropic Noether sea state mapped to observer-level magnetic structure.
- $G_{\text{grad}}$: local Noether sea gradient data entering delayed acceleration and assembly response, inherited from the shared radiation description.
- $\mathcal{R}_{\Theta}^{\mathrm{syn}}$: synchrotron closure residual produced by curved charged-assembly transport.
- $\mathcal{S}_{\gamma}^{\mathrm{syn}}$: synchrotron photon-channel drive for planar-mode nucleation.

Here $e>0$ is the elementary charge magnitude, $m_e$ the effective electron mass, $h$ Planck's constant, and $\sigma_T$ the Thomson scattering cross section. These are standard comparison quantities, not primitive architrino properties. The pitch angle $\alpha$ is the angle between a lepton's velocity and the local magnetic field. The primitive wake speed $c_f$ is distinct from $c$; any numerical substrate calculation uses normalized wake-speed units with $c_f=1$.

### Physical Mechanism

A relativistic electron or positron with Lorentz factor $\gamma$ moving in magnetic field $B$ emits synchrotron radiation with characteristic frequency scaling as $\nu_c \propto \gamma^2 B$. If emitted photons are energetic enough and target photons or fields are dense enough, pair production channels open; the new pairs then radiate again, building a multi-generation cascade.

Cascade development is controlled by competition among radiative cooling, pair production, advection, and escape. In compact high-field zones, this feedback can strongly increase pair loading and opacity.

This is the observer-level mechanism. The $\mathbb{A}\mathbb{A}\mathbb{A}$ layer below does not replace these formulas; it asks which Noether braid velocity deformation and closure residual must be present for the same photon output to occur, and whether an anisotropic Noether sea state is required to carry part of that response.

### Core Equations

For an isotropic distribution of pitch angles and $\beta\simeq1$, the standard mean power per lepton is

$$
P_{\mathrm{syn}} = \frac{4}{3}\sigma_T c\,U_B\,\gamma^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e4160624af592502)

with magnetic energy density

$$
U_B=\frac{B^2}{8\pi}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aec046c00aefc21b)

For a single pitch angle, the classical comparison law is $P_{\mathrm{syn}}(\alpha)=2\sigma_T cU_B\gamma^2\beta^2\sin^2\alpha$. Isotropy gives the normalized angle measure $\tfrac12\sin\alpha\,d\alpha$, hence $\langle\sin^2\alpha\rangle=2/3$ and the displayed ultrarelativistic mean. An individual particle moving parallel to $B$ has zero magnetic deflection in this idealization; the mean power is not its emission law. Magnetic-field expressions use Gaussian units; the radiation-zone and plasma-response comparisons below use SI with explicit vacuum permittivity $\epsilon_0$. Constants must not be mixed across these systems.

The characteristic photon energy is set by

$$
E_{\gamma,\mathrm{syn}} \sim h\nu_c \propto \gamma^2 B
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ed82a7bf474887f)

For pitch angle $\alpha$, a standard critical-frequency expression is

$$
\nu_c = \frac{3}{2}\gamma^2\frac{eB}{2\pi m_e c}\sin\alpha
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1f79f6da2093da4e)

For an isotropic pitch-angle distribution at fixed $\gamma$ and $B$, $\langle\sin\alpha\rangle = \pi/4$, so the number-weighted mean critical frequency is $\langle\nu_c\rangle=(3e/16 m_e c)\gamma^2 B$. This mean does not locate the peak of the angle-integrated spectrum, which weights the full frequency-dependent emissivity.

An operational energy-loss (cooling) timescale relation is

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a323ffe1b97df9dd)

Here $E_e=\gamma m_ec^2$ and $\tau_{\mathrm{syn}}=E_e/|dE_e/dt_{\mathrm{eff,src}}|$ denote local effective energy and its instantaneous loss timescale. The inverse-$\gamma B^2$ scaling assumes the same ultrarelativistic pitch-angle average and synchrotron-dominated cooling. It is neither an exact time to zero energy nor a photon arrival-time interval.

Cascade closure then depends on whether photon energies and path lengths satisfy pair-production thresholds and interaction depths in the local radiation field.

These equations and thresholds are the observer-level scaffold that $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping must recover in validated limits.

#### Spectral Shape and Cooling Breaks

Take continuous injection $Q_{\mathrm{inj}}(\gamma)\propto\gamma^{-p}$ between $\gamma_{\min}$ and $\gamma_{\max}$, with $p>2$, homogeneous $B$, isotropic pitch angles, and synchrotron-dominated losses over an energy-independent residence duration $\tau_{\mathrm{esc}}$. The resident distribution $N(\gamma)$ changes under cooling and need not retain the injection exponent. Define $\gamma_{\mathrm{cool}}$ by $\tau_{\mathrm{syn}}(\gamma_{\mathrm{cool}})=\tau_{\mathrm{esc}}$. Slow cooling means $\tau_{\mathrm{syn}}(\gamma_{\min})>\tau_{\mathrm{esc}}$, even though higher-energy particles can cool within the same interval. With $\nu_m=\nu_c(\gamma_{\min})$ and $\nu_{\mathrm{cool}}=\nu_c(\gamma_{\mathrm{cool}})$, the ordering is $\nu_m<\nu_{\mathrm{cool}}$. The optically thin emissivity $j_\nu$, energy emitted per unit time, volume, solid angle, and frequency, has the following asymptotic segments:

$$
j_\nu \propto \begin{cases}
\nu^{1/3}, & \nu < \nu_m, \\
\nu^{-(p-1)/2}, & \nu_m < \nu < \nu_{\mathrm{cool}}, \\
\nu^{-p/2}, & \nu_{\mathrm{cool}} < \nu < \nu_{\mathrm{max}}.
\end{cases}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b9c3b8dbea91403e)

Here $\nu_{\mathrm{max}} \propto \gamma_{\mathrm{max}}^2 B$ is the characteristic high-frequency cutoff scale, not an exact upper photon frequency. The segments apply away from smooth breaks and cutoffs, above self-absorption and plasma suppression. The cooled high-energy distribution steepens to $N(\gamma)\propto\gamma^{-(p+1)}$, giving the $-p/2$ spectral slope. If the cooling break exceeds the cutoff, that segment is absent.

Fast cooling means $\tau_{\mathrm{syn}}(\gamma_{\min})<\tau_{\mathrm{esc}}$. In this same approximation the break Lorentz factor is

$$
\gamma_{\mathrm{cool}} \approx \frac{6\pi m_e c}{\sigma_T B^2 t_{\mathrm{esc}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6175116390eb6d7d)

where $t_{\mathrm{esc}}\equiv\tau_{\mathrm{esc}}$ is the local residence duration, not the absolute epoch $T$. This cooling-break expression also applies in slow cooling; the ordering relative to $\gamma_{\min}$ selects the regime. For $\gamma_{\mathrm{cool}}<\gamma_{\min}$, the fast-cooling spectrum has the standard three-segment form

$$
j_\nu \propto \begin{cases}
\nu^{1/3}, & \nu < \nu_c(\gamma_{\mathrm{cool}}), \\
\nu^{-1/2}, & \nu_c(\gamma_{\mathrm{cool}}) < \nu < \nu_m, \\
\nu^{-p/2}, & \nu > \nu_m.
\end{cases}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1509956092cf52e8)

The $-1/2 \to -p/2$ break sits at the injection frequency $\nu_m$, not at $\nu_c(\gamma_{\mathrm{cool}})$. The last segment ends near the high-frequency cutoff; the first assumes relativistic emitting particles and frequencies above absorption and dispersion effects. A cooled $N(\gamma)\propto\gamma^{-2}$ interval supplies the $-1/2$ segment. Competing inverse-Compton losses, time-dependent injection, or inhomogeneous transport require a revised cooling calculation.

These break structures are testable against broadband spectral energy distributions (SEDs) in active galactic nuclei (AGN), gamma-ray bursts (GRBs), and pulsar wind nebulae, after the source model and frame transformation are specified.

Synchrotron self-absorption supplies the low-frequency inverse channel. With absorption coefficient $\alpha_\nu^{\mathrm{ssa}}$ and source function

$$
S_\nu^{\mathrm{ssa}}
=
\frac{j_\nu}{\alpha_\nu^{\mathrm{ssa}}},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d93aee8fd229eedf)

a homogeneous optically thick source approaches $I_\nu\simeq S_\nu^{\mathrm{ssa}}$. The $I_\nu\propto\nu^{5/2}$ branch requires that the electrons sampled by emission and absorption lie within the power-law part of the resident distribution. It is not universal below the turnover: for a truncated distribution with self-absorption frequency $\nu_a\ll\nu_m$ and negligible cooling below $\gamma_{\min}$, the low-frequency branch instead has $I_\nu\propto\nu^2$. The same charged-transport event family must generate $j_\nu$, $\alpha_\nu^{\mathrm{ssa}}$, and the source function. Plasma suppression, including the observer-level Razin-Tsytovich limit, is a separate transport recovery and must not be hidden inside the self-absorption coefficient.

### Core Channels (Inclusion Rule)

This chapter uses a dominant-channel rule: include reactions/channels that contribute at least about 1% in the relevant regime. Where PDG branching ratios are defined, this is a `BR > 1%` rule; where transport channels are not tabulated by PDG branching, use contribution to modeled emissivity/opacity.

- $e^\pm \xrightarrow{B} e^\pm + \gamma_{\mathrm{syn}}$ (effective synchrotron emission channel, with $B$ an environment rather than a reaction participant).
- $\gamma + \gamma \rightarrow e^+ + e^-$ (Breit-Wheeler two-photon interaction / photon-photon pair-production channel in dense radiation fields, distinct from Schwinger vacuum pair production).
- Secondary-loop channel: newly produced $e^\pm$ re-enter synchrotron emission, closing the cascade.

The 1% threshold is a modeling convention for cascade tractability, not a fundamental physics cutoff or a measured omission error. Each application must evaluate contributions over its energy and angular range, including their cumulative effect and feedback. Triplet pair production $e^\pm + \gamma \rightarrow e^\pm + e^+ + e^-$ depends on the incident lepton and photon distributions; magnetic strength alone does not establish its importance. Inverse Compton scattering and strong-field channels must be included whenever the declared regime makes their cooling, opacity, or secondary injection material. The three channels above define the pedagogical synchrotron-pair loop, not a complete transport inventory.

### Radiation Inheritance

Synchrotron emission is the curved charged-assembly transport specialization of the shared radiation description in [Radiation](../../../../markdown/aaa/reactions/radiation.md). The standard phrase "a magnetic field bends a relativistic charge and the charge radiates" remains the observer-level baseline. In the provisional sea-mediated branch studied here, anisotropic Noether sea response and spatial gradients alter delayed accelerations and deform the moving Noether braid faster than its internal phase relations can retune. A resulting mismatch is a candidate input to photon formation, not evidence of a photon. A direct-wake or mixed branch remains admissible until the provenance controls distinguish it.

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

[View →](../../../../../equation-mapping.html#corpus-equation-7577cbec246f202a)

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

[View →](../../../../../equation-mapping.html#corpus-equation-b4332d9cf3c37357)

Here $a$ labels the three persistent binaries of the candidate charged-assembly scaffold, without ordering them by radius or speed. The phase-closure quantity $\Theta_a$ must be evaluated on the same declared history interval for the curved and adiabatic reference states. Differences require a common phase lift, or an explicitly wrapped angular difference, so that adding a full cycle does not create a spurious mismatch. With fixed positive weights $w_a>0$ and a declared normalization, the following bookkeeping norm specializes the shared radiation residual:

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

[View →](../../../../../equation-mapping.html#corpus-equation-ba1184981f472f21)

Here $\Gamma_{e^\pm}(T)$ denotes the charged assembly state together with the retained path history needed by delayed dynamics; an instantaneous position-and-velocity snapshot is insufficient. In the inherited notation, $o'$ denotes a receiver and $j$ a transmitter; $\mathcal{C}_{o'j}(T)$ is their active causal-root set and $J_{o'j}$ records its declared Jacobian data. The transmitter-side acceleration weight is $c_f/|D_t|$, with $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}$; signed root playback is the separate ratio $D_r/D_t$, with $D_r=c_f-\mathbf V_r\cdot\hat{\mathbf r}$. The direction $\hat{\mathbf r}$ joins the transmitter's emission position to the receiver. Neither weight nor playback is supplied by an unspecified scalar $J$ alone. The sea number density $\rho_{\text{NS}}$, response descriptor $\chi_{\text{sea}}$, anisotropic state $\mathcal{V}_{\mathrm{NS}}$, and gradient data $G_{\text{grad}}$ require a common retained medium record. The norm and its weights are diagnostic definitions; their constitutive derivation and the frequency, power, cooling-break, and polarization recoveries remain open.

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

[View →](../../../../../equation-mapping.html#corpus-equation-bb43b2bd72ee9989)

The inequalities specify a proposed necessary eligibility screen, not a sufficient photon-formation theorem. Here $J_{\text{loc}}$ is the local causal-root data, $\mathcal{S}_{\gamma,*}$ a candidate boundary in the photon-channel drive, and $E_{\text{exc}}^{\mathrm{syn}}$ the available excitation energy. A positive minimum cost $E_{\gamma,\min}$ is conditional on a derivation; it is not an established universal photon-energy floor. Sub-threshold events retain explicit non-photon energy accounts. Passing the screen still requires an admissible evolving branch and the inherited photon checks. In the following spectral target, $\nu_{\gamma}^{\mathrm{out}}$ means the critical scale extracted from the emitted distribution, not the frequency of every individual photon:

$$
\nu_{\gamma}^{\mathrm{out}}
\longrightarrow
\nu_c
=
\frac{3}{2}\gamma^2\frac{eB_{\mathrm{eff}}}{2\pi m_e c}\sin\alpha
$$

[View →](../../../../../equation-mapping.html#corpus-equation-51eba6dbe379aab4)

in weak homogeneous classical limits, with $B_{\mathrm{eff}}$ the observer-level magnetic amplitude reconstructed from $\mathcal{V}_{\mathrm{NS}}$. Synchrotron emission is broadband; matching this scale must be accompanied by the spectral shape and normalization. The $\gamma^2B$ scaling must come from the coupled velocity-deformation and anisotropic-state map, not from tuning $\mathcal{S}_{\gamma,*}$ after the fact.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel

- **Synchrotron emission channel:** (provisional map) curved charged-assembly transport through an anisotropic Noether sea state produces $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ through delayed acceleration and internal deformation. Threshold crossing nominates a photon channel; actual [photon formation](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) requires a retained branch. Interaction energy supplies the energetic account, while named pre-existing constituents supply the inventory. The charged remnant retains its declared identity, with any constituent exchange explicitly routed. The photon-side target is the proposed **coaxial contra-rotating polarity-conjugate planar pair** description, whose physical referent remains unestablished.
- **Pair channel:** (provisional map) two-photon overlap, with each photon treated as a coaxial contra-rotating polarity-conjugate planar pair, associates local substrate content into a charged $e^+e^-$ assembly pair. The complete inventory includes incoming photons and participating sea content, and outgoing charged assemblies and residual medium. Identity, polarity, and conservation accounts must close across that entire partition.
- **Cascade loop:** (provisional map) repeated emission-pair-emission cycles are modeled as repeated mode-lock events under the same observer-level thresholds.

### Shared Photon Event Record

Use the same photon-channel event record here as in [Radiation](../../../../markdown/aaa/reactions/radiation.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md). Photon Gate A denotes the required kinematic and optical recovery, Gate B the transverse polarization and angular-momentum recovery, and Gate C the interaction and transition recovery. Naming these inherited requirements does not establish that a photon branch exists. A synchrotron planar-mode event should record:

- charged assembly identity, energy, momentum, pitch geometry, and path-history provenance before and after the curved transport segment;
- Noether braid velocity-deformation state, effective magnetic-state map $\mathcal{V}_{\mathrm{NS}}$, gradient data $G_{\text{grad}}$, and local Noether sea variables $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, excitation state, and causal-branch Jacobian data;
- closure residual $\mathcal{R}_{\Theta}^{\mathrm{syn}}$, wake-strain eigenvalue or threshold status, and photon-channel drive $\mathcal{S}_{\gamma}^{\mathrm{syn}}$ that permits or forbids planar-mode nucleation;
- photon output $E_\gamma$, direction, polarization basis, transverse angular-momentum ledger, and local photon-channel speed $c_\gamma$;
- photon Gate B event residual, including source depletion, recoil, causal-wake, accepted/rejected handoff, helicity, and balance rows;
- recoil, medium excitation, residual internal energy, and pair-channel handoff terms when the emitted photon enters a cascade loop.

For a declared event window and common accounting frame, the source-depletion balance requirement is

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

[View →](../../../../../equation-mapping.html#corpus-equation-ff7680b64eda969a)

Here $\Delta\mathcal Q_{e^\pm}^{0}$ is the before-minus-after depletion of the declared emitting source account; $\mathcal Q$ denotes energy, momentum, or angular momentum, with the last evaluated about one declared origin. A depletion sign does not require every component to be positive. The superscripts label the inherited common-frame accounts. Photon, recoil, medium, wake, handoff, and remnant entries are signed net transfers or allocations over that same window, not unrelated final totals. Every contribution is counted once: a recoil or internal-energy change already included in source depletion cannot also be charged to an overlapping remnant account. External input must be added explicitly or included in an enlarged source account. Equality is a condition to verify, not conservation proved by writing a balance. Pair-production vertices likewise close the incoming photon accounts and route all existing constituent identities through the final pair and medium.

This record is a derivation target. It must recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, standard polarization limits, and Breit-Wheeler behavior in validated regimes before any Noether sea-dependent deviation is treated as physical. The polarization basis, transverse angular-momentum ledger, and linear-polarization limits are photon Gate B consumers from [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) and [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), not a local derivation of photon helicity.

### Observer-Level Closure Checks

- Pair threshold closure: define energy-valued effective four-vectors $k_i^\mu=(E_i,c\mathbf p_i)$ with the $+---$ Minkowski convention, used only for this standard comparison. Then $s=(k_1+k_2)^2=2E_1E_2(1-\cos\theta_{12})$ has units of energy squared, and the threshold is $s\ge4m_e^2c^4$. For head-on photon directions it reduces to $E_1E_2\ge(m_ec^2)^2$. With conventional momentum-valued four-vectors $(E_i/c,\mathbf p_i)$, an extra factor $c^2$ multiplies their squared sum to give this same $s$. The unpolarized Breit-Wheeler cross-section peaks near $s\approx8m_e^2c^4$; its shape, normalization, and angularly weighted interaction rate are comparison targets.
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

[View →](../../../../../equation-mapping.html#corpus-equation-76c8e0c9627088f2)

where $\psi_{\mathrm{syn}}$ is the synthetic electric-vector position angle and $\psi_{B,\mathrm{eff}}^{\perp}$ is the expected electric-vector basis perpendicular to the projected magnetic direction for the optically thin shock model. Both angles are defined modulo $\pi$. The average must declare its spatial or intensity weights and exclude locations with undefined polarization angle. The sine residual respects the $\pi$ ambiguity. Persistent misalignment beyond the combined model and measurement uncertainty, after Faraday rotation, beam averaging, and field disorder are accounted for, would falsify the tested directional map in that regime. This remains a source-scale Gate B consumer.
- Radiation-zone closure: for a local effective trajectory segment with $\mathbf v\cdot\mathbf a_\perp=0$, take the polar axis along $\mathbf v$ and azimuth $\phi=0$ along $\mathbf a_\perp$, where $\mathbf a_\perp=d\mathbf v/dt_{\mathrm{eff,src}}$. For $\beta=\|\mathbf v\|/c$, recover the angular power per unit source emission time

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

[View →](../../../../../equation-mapping.html#corpus-equation-f5ba8d661bd2a9a3)

and the total-power target

$$
P_{\perp,\mathrm{std}}
=
\frac{q^2\gamma^4\|\mathbf{a}_\perp\|^2}{6\pi\epsilon_0c^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3490e3f8e44afe77)

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

[View →](../../../../../equation-mapping.html#corpus-equation-b1a9e7b2750d57fb)

with $P_{\mathrm{map}}$ evaluated per the same source emission time, $\nu_{\gamma}^{\mathrm{out}}$ the fitted critical spectral scale, and $\Delta_{\gamma,\mathrm{flux}}$ the energy-momentum flux residual inherited from [Radiation](../../../../markdown/aaa/reactions/radiation.md). Arrival-time angular power has an additional factor $(1-\beta\cos\theta)^{-1}$ for a distant stationary receiver; it cannot be integrated as though it were this emission-time target. The ratios require nonzero reference power and frequency. Zero-deflection cases need absolute residuals with declared units and tolerances. In the stated classical comparison limit all applicable components must approach zero without retuning the magnetic response map.
- Rate closure: recover standard synchrotron and Breit-Wheeler limits in validated regimes.
- Absorption closure: recover $\alpha_\nu^{\mathrm{ssa}}$ and the source function from the same event family that supplies $j_\nu$, including the $\nu^{5/2}$ or $\nu^2$ branch under its stated distribution and frequency conditions. Keep Razin-Tsytovich suppression in the material-dispersion account.
- Timing closure: recover the standard clock relation on the declared homogeneous moving branch, including the matter-clock/sea identification and effective-chart Jacobian. Source cooling durations and distant arrival times also require their own bulk-motion and propagation factors; weak gravity alone does not set those maps to unity.
- Polarization closure: for an optically thin uniform field, isotropic lepton directions, and resident energy exponent $p_e$ away from spectral breaks, recover $\Pi=(p_e+1)/(p_e+7/3)$. The familiar $70\%-75\%$ range corresponds approximately to $2\le p_e\le3$, not to every synchrotron spectrum. Here $p_e=p$ in an uncooled injection segment and $p_e=p+1$ in the cooled high-energy segment. Compare the sky-projected electric-vector direction and Stokes parameters after propagation; field disorder, Faraday rotation, and averaging alter the observed polarization. An empirical tolerance requires a named source, band, instrument, and uncertainty model.

### Regime Map

- **Weak-cascade regime:** synchrotron emission is present but pair feedback is limited; the primary spectrum still depends on cooling and transport as well as injection.
- **Pair-loaded regime:** secondary pairs significantly modify emissivity and opacity.
- **Fast-cooling regime:** $\tau_{\mathrm{syn}}(\gamma_{\min})<\tau_{\mathrm{esc}}$, so even the lowest-energy injected relativistic particles cool substantially before escape.
- **Escape-dominated regime:** particles or photons leave the zone before deep cascade development.

### Observable Consequences

- Broadband non-thermal continua with curvature and breaks tied to cooling and escape scales.
- Polarization signatures tracing magnetic-field geometry and turbulence level.
- Pair-opacity features and spectral softening at high energies in compact sources.
- Strong coupling to inverse Compton and bremsstrahlung channels in dense radiation or matter environments.

#### Jet and Outflow Source Benchmarks

Resolved AGN and microquasar jets provide source-scale comparisons because their knots, hot spots, lobes, and continua constrain morphology, spectra, and polarization together. In standard source language, the relevant variables are jet speed $v_j$, bulk Lorentz factor $\gamma_j$, jet-to-ambient mass-density ratio $\eta_j=\rho_j/\rho_a$, Mach number $M_j$ relative to the declared sound speed, magnetic amplitude $B_{\mathrm{eff}}$, electron distribution $N_e(\gamma)$, and source size $L$. They remain observer-level comparison variables reconstructed from event and medium records. The bulk factor $\gamma_j$ is distinct from the individual lepton factor $\gamma$ in the plasma rest frame.

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

[View →](../../../../../equation-mapping.html#corpus-equation-341f21dbefe125fb)

where $I_{\nu}^{\mathrm{syn}}$ and $I_{\nu}^{\mathrm{IC}}$ are synthetic synchrotron and inverse-Compton maps, $\Pi_{\nu}$ and $\psi_{\nu}$ the linear-polarization fraction and angle, $\nu_{\mathrm{br}}$ the cooling-break frequency, and $\Delta_{\mathrm{pol}}^{K}$ the knot-scale angular residual. For a source whose X-rays are attributed to inverse Compton scattering, the same transport and magnetic response model must reproduce both components, including the seed-photon distribution. X-ray emission is not assigned to that process by observing a jet; competing synchrotron and other source models require their own component tests. Cross-band consistency is necessary but does not by itself validate the underlying assembly dynamics.

An observed continuum identified as synchrotron supports an inference of relativistic charged emitters in a magnetic environment under the selected source model. Total intensity alone does not establish an ordered field: unresolved randomly directed fields also emit. Polarization and propagation diagnostics constrain field organization, while composition requires additional evidence distinguishing electron-proton, electron-positron, or other contributions. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, identity routing and effective inertia remain separate recovery problems.

### Standard Interpretation vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

Standard high-energy source models treat synchrotron cascades as local plasma-radiation processes governed by magnetic structure, injection spectra, and transport. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ program, the same radiative microphysics is retained while interpretation shifts to mapping cascade outputs onto assembly transport and SMBH-local recycling histories.

### Provisional $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Map

Status convention used below:

- **Baseline:** standard comparison relation retained within its declared regime.
- **Provisional map:** ontology-level working hypothesis pending deeper derivation.
- **Requirement:** compatibility condition for known observables.

#### Architrino-Level Hypotheses

This file uses the following provisional mapping targets.

- **Synchrotron emission (provisional):** a charged Noether braid assembly in curved transport through $\mathcal{V}_{\mathrm{NS}}$ develops an internal velocity deformation. Gradient data $G_{\text{grad}}$, transmitter-side acceleration weights, receiver-side root playback, and changing delayed geometry enter the candidate residual $\mathcal{R}_{\Theta}^{\mathrm{syn}}$. A crossed threshold permits further branch testing; a photon is counted only when admissible evolution produces the required propagating output. Recoil, medium, wake, handoff, and remnant accounts must balance the remaining transfer. The threshold and any wake-strain operator require definitions on the same retained history. Hand-tuning them to reproduce $P_{\mathrm{syn}}(\gamma,B)$ or $\nu_c\propto\gamma^2B$ supplies a fit. A derivation requires the Master Equation, independent checks, and formation and persistence evidence for the candidate output.
- **Magnetic field ontology (provisional mapping):** $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ proposes a map from directional Noether sea response to an effective magnetic field. Its microscopic cause must be reconstructed from delayed accelerations. At assembly/comparison grade it must recover the Gaussian magnetic Lorentz-force law $\mathbf F_{\mathrm{eff}}=q(\mathbf v/c)\times\mathbf B_{\mathrm{eff}}$, including nonzero transverse deflection in a spatially uniform nonzero field. Dependence solely on gradients $\partial_{X^i}\mathcal V_{\mathrm{NS}}^j$ would fail that uniform-state test unless additional response variables supply the deflection. Maxwell propagation $\omega=ck$ is a separate transparent, nondispersive limit, not a consequence of uniform anisotropy. Optically thin linear polarization is referenced to the field projected on the sky; the electromagnetic electric vector is transverse to photon propagation, not generally to every emitter velocity. Photon helicity and analyzer statistics remain Gate B requirements. A converged mismatch in frequency scaling or projected polarization beyond a declared uncertainty rejects the tested response map. A $15^\circ$ angular screen is only a proposed diagnostic choice, not an established observational tolerance or a verdict on every possible sea response.
- **Pair production mapping (provisional):** $\gamma+\gamma\rightarrow e^+ + e^-$ is modeled as reorganization of existing local substrate content triggered by two photon carriers above threshold. Their histories provide energy, momentum, and trigger geometry; participating photon and sea constituents require explicit identity routing. The threshold is $s\ge4m_e^2c^4$ in the energy-squared convention defined above. The standard unpolarized Breit-Wheeler cross-section is
$$
\sigma_{\gamma\gamma} = \frac{\pi r_e^2}{2}\left(1-\beta^2\right)\left[\left(3-\beta^4\right)\ln\left(\frac{1+\beta}{1-\beta}\right) - 2\beta(2-\beta^2)\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-275707859b37a0e9)

where the comparison formula's local $\beta\equiv\beta_{\mathrm{pair}}=\sqrt{1-4m_e^2c^4/s}$ is the outgoing lepton speed divided by $c$ in the pair center-of-momentum frame, distinct from the source lepton's speed ratio. The classical electron radius is $r_e=e^2/(m_ec^2)$ in Gaussian units. Below threshold the cross section vanishes. Polarized incoming photons require the polarization-dependent cross sections or a justified average. Agreement within a factor of two over $4m_e^2c^4<s<100m_e^2c^4$ is at most a proposed coarse screen; recovering the standard limit requires convergence to the benchmark with quantified error. A discrepancy first identifies a failed or incomplete model or calculation. Observable new physics requires independently verified predictions and discriminating data.

These mapping targets are ontology-level and must reduce to standard synchrotron/pair-production observables in validated limits.

#### Curvature Convention

In this chapter, "curved transport" means a charged assembly's trajectory changing direction in the Euclidean void through constituent delayed accelerations. Effective magnetic forcing describes the corresponding observer-level response. Curved-spacetime language is an effective description of transport and timing, not the substrate mechanism.

Operationally: compute emissivity and spectra with standard observer-frame equations; interpret underlying trajectory control through the Noether sea anisotropy map when using $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The candidate curvature response therefore joins Noether braid deformation along the assembly's Euclidean trajectory to the declared gradient data and sea anisotropy. Effective geodesic language remains available for observer-frame propagation and timing. Recovery requires the same emissivity within independently established errors in the shared weak-gravity regime. Any discriminating experiment must follow a derived departure and its predicted magnitude; near-horizon or strong-field settings are candidate comparison environments, not the only possible tests.

#### Conservation Note for Pair Production

This chapter uses the nucleation interpretation (not creation from nothing): pair channels reorganize substrate content into new charged assemblies. In this ontology, each architrino has provenance and identity through path history in absolute time; interaction channels redistribute and relock existing constituents rather than instantiate new substrate entities.

Thus, when this channel says the incoming photons are consumed, it means their free planar-pair ledgers terminate at the vertex and their energy-momentum and Gate B handoffs enter the event record. It does not mean the outgoing $e^+e^-$ worldlines are simply the photon constituents under new labels. The charged-pair inventories must be supplied by identity-routed local substrate content, and the terminated planar pairs' own constituent architrinos are identity-routed in the same event record: they either join the recruited charged-pair inventories or return to the local Noether sea record, and the ledger must say which.

Operationally, pair production is modeled as association of neutral local substrate content (Noether sea braids)[^architrino-count] into a charged $e^+e^-$ assembly pair when incident photon energy and geometry satisfy the pair threshold window. The incoming photon energy supplies the separation and association work required for charged-state lock-in.

The bookkeeping requirement is therefore threefold: identity-routed global architrino conservation, path-history-consistent provenance through reaction channels, and local energy-momentum conservation at the interaction zone.

Any additional dependence of pair yield on local Noether sea state beyond standard kinematic threshold conditions is treated here as a mapping/simulation goal, not as an asserted observational deviation.

A minimal cascade-depth diagnostic can be expressed through competing timescale ratios. Define the dimensionless cascade parameter as

$$
\mathcal{C}_{\mathrm{cas}} \equiv \left(\frac{\tau_{\mathrm{esc}}}{\tau_{\mathrm{syn}}}\right) \left(\frac{L}{L_{\gamma\gamma}}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7449c337cd365bf6)

where

$$
L_{\gamma\gamma} \equiv (n_\gamma \sigma_{\gamma\gamma})^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7b571f94ead81a99)

is a homogeneous estimate of the photon-photon mean free path and $L$ the source size. Here $n_\gamma$ is target photon number density and $\sigma_{\gamma\gamma}$ must be an effective cross section averaged over target energies and collision directions with the relative-flux factor $1-\cos\theta_{12}$. A cross section at one arbitrarily selected $s$ does not represent a broadband anisotropic target bath.

The product is a heuristic indicator with two independent controls:

- $\tau_{\mathrm{esc}}/\tau_{\mathrm{syn}}\ll1$: little synchrotron cooling before particle escape.
- $L/L_{\gamma\gamma}\ll1$: most photons escape without producing pairs.
- Both ratios large, with sufficient above-threshold photons: a candidate regime for repeated cooling and pair conversion.

The value of $\mathcal C_{\mathrm{cas}}$ alone cannot classify cascade depth. For example, ratios $10^6$ and $10^{-3}$ give $\mathcal C_{\mathrm{cas}}=10^3$ while a homogeneous single photon path has pair-conversion probability $1-e^{-10^{-3}}\simeq10^{-3}$. A large product therefore does not ensure appreciable conversion on each generation. These dimensionless diagnostic values use normalized wake-speed units $c_f=1$ and make no substrate simulation claim. Pair multiplicity also depends on photon energies, secondary emission, field geometry, and escape directions.

### Observer-Frame Transport

For cosmology-facing use, source-frame emissivity must be propagated to observer-frame spectra with explicit frequency, intensity, and path maps. For a declared emission record $E$, receiver record $R$, and photon channel $X$, define the positive frequency ratio and its signed logarithm

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

[View →](../../../../../equation-mapping.html#corpus-equation-e2d9f8e741f2a1ce)

$$
I_{\nu}^{\mathrm{obs}}(R) = (1+z_X)^{-3} \, I_{\nu(1+z_X)}^{\mathrm{em}}(E)\,\mathcal{T}(\nu,E\rightarrow R)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1d2109501424b0d2)

Here $1+z_X=\nu_{\mathrm{em}}/\nu_{\mathrm{obs}}$. The terms in $Z_X^{E\to R}$ separate endpoint clock comparison, source-branch response, launch or relative motion, and path frequency exchange. The displayed intensity law is the collisionless, nondispersive geometric-optics comparison, for which $I_\nu/\nu^3$ is invariant, followed by a diagonal attenuation factor $\mathcal T$. The emitted specific intensity $I_\nu^{\mathrm{em}}$ is already integrated through the source column; it is not the volume emissivity $j_\nu$. Absorption or scattering out of a beam can supply attenuation such as $e^{-\tau_{\gamma\gamma}}$, provided no in-scattered contribution is being omitted.

General scattering mixes incoming directions and frequencies. It requires a redistribution kernel and source terms in the transfer equation; a scalar multiplier of one shifted source frequency cannot create that redistributed spectrum. A signed $Y_{X,\mathrm{path}}$ may record a particular photon's Compton-like frequency exchange, but does not prove collisionless intensity invariance for an ensemble undergoing such exchanges. Dispersive material transport likewise requires its own response map. A nearby source has $\mathcal T\simeq1$ only when its absorption and scattering optical depths are small; small redshift does not imply transparency.

In the standard homogeneous limit, $1+z_X$ reduces to the conventional transport notation $1+z \equiv (1+z_{\mathrm{em}})/(1+z_{\mathrm{obs}})$. In standard-limit regimes, this must recover the conventional transport results used in high-energy astrophysics.

When the path includes plasma or conducting material, use the material response inherited from [Radiation](../../../../markdown/aaa/reactions/radiation.md). In the SI comparison for a cold, collisionless, homogeneous, effectively unmagnetized electron plasma with stationary ions,

$$
\epsilon_{\mathrm{eff}}(\omega)
\approx
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right),
\qquad
\omega_p^2=\frac{n_{\mathrm{car}}q^2}{m\epsilon_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-772117694e1ea48c)

Here $n_{\mathrm{car}}$ is carrier number density, $q$ the carrier charge, $m$ its effective mass, and $\omega_p$ the plasma frequency; these are medium-level comparison quantities. In this scalar approximation, angular frequencies $\omega>\omega_p$ admit the transverse propagating branch

$$
\omega^2=\omega_p^2+c^2k^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac3cff5bf8e5bdd1)

while $\omega<\omega_p$ gives an evanescent wavenumber $k=i\kappa_{\mathrm{ev}}$ in the ideal bulk medium; reflection or transmission through a finite layer depends on boundary matching. In magnetized, warm, or collisional material the dielectric response generally depends on direction and polarization, so a tensor or other appropriate response replaces this scalar formula. For a passive homogeneous or slowly varying absorbing mode, write $k=k_1+ik_2$ with $k_2\ge0$ and amplitude convention $\exp(ik\ell-i\omega t_{\mathrm{eff,src}})$. Squaring the amplitude gives the intensity attenuation

$$
\mathcal{T}_{\mathrm{abs}}(\omega)
=
\exp\!\left[-2\int_{\mathrm{path}}k_2(\omega,s)\,ds\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-34c0239a48b401b7)

If $\epsilon_{\mathrm{eff}}(\omega)=0$ produces a longitudinal plasma oscillation, the cascade record routes it into medium excitation or plasmon-like content. It is not counted as a free photon branch and it cannot repair a failed Gate B no-longitudinal-mode check.

The same plasma record must recover Razin-Tsytovich suppression when refractive beaming is modified at low frequency. That suppression is a medium-dispersion effect and remains distinct from synchrotron self-absorption, even when both contribute to one observed turnover.

#### Absolute-Time vs Proper-Time Bookkeeping (Provisional)

The cooling formula is a local plasma-frame timescale. In the following comparison display the label $\mathrm{obs}$ denotes that local effective observer, not a distant detector:

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}} \approx \frac{6\pi m_e c}{\sigma_T B^2\gamma}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5adba000797d941e)

For a moving source, distant arrival durations additionally depend on bulk Doppler and propagation factors. For example, a constant-Doppler unresolved moving source has $\Delta t_{\mathrm{eff,arr}}=(1+z_{\mathrm{cos}})\Delta t_{\mathrm{eff,src}}/\delta_j$, where $z_{\mathrm{cos}}$ is the cosmological redshift and $\delta_j=[\gamma_j(1-\beta_j\cos\theta_j)]^{-1}$, with $\beta_j=v_j/c$ and viewing angle $\theta_j$. The electron factor $\gamma$ in the cooling law is not this bulk factor. For substrate bookkeeping, a separate positive clock map would supply

$$
dT = \Gamma_{\mathrm{eff}}(v,\rho_{\text{NS}},n,\Phi_{\text{eff}})\,d\tau_{\mathrm{asm}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cacc475e84329389)

where $T$ is absolute time, $\tau_{\mathrm{asm}}$ an assembly clock readout, and $\Gamma_{\mathrm{eff}}=dT/d\tau_{\mathrm{asm}}>0$ the proposed conversion for that clock. The arguments name speed, sea density, refractive response $n$, and effective clock potential $\Phi_{\mathrm{eff}}$; no functional law is specified here. It is distinct from the history state $\Gamma_{e^\pm}$. [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#noether-sea-braid-cadence) defines $\Gamma_N$ from the sea's own cadence and requires a tested matter-clock/sea identification before using it as this conversion. The local effective chart also requires its Jacobian $dt_{\mathrm{eff,src}}/dT$. Only on a declared branch with the corresponding identifications may $\Gamma_{\mathrm{eff}}\to\Gamma_N\to\gamma$. For the same energy functional $E$ along the same history, the chain rule gives

$$
\left(\frac{dE}{dT}\right)_{\mathrm{abs}}=\frac{1}{\Gamma_{\mathrm{eff}}}\left(\frac{dE}{d\tau_{\mathrm{asm}}}\right),
\qquad
\tau_{\mathrm{syn}}^{\mathrm{abs}}=\Gamma_{\mathrm{eff}}\,\tau_{\mathrm{syn}}^{\mathrm{asm}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-03cc899056a134f5)

The first identity reparameterizes the derivative; it does not transform energy between frames. The second holds pointwise for the instantaneous timescale $E/|dE/d\text{clock}|$. For finite intervals the correct relation is $\Delta T=\int\Gamma_{\mathrm{eff}}\,d\tau_{\mathrm{asm}}$; replacing the integral by one factor requires that factor to be effectively constant. In particular, cooling changes $\gamma$, so dividing a full cooling duration by its initial $\gamma$ is generally invalid.

As a standard-units local comparison, take $\gamma=10^4$, $B=1\,\mathrm{G}$, identify $t_{\mathrm{eff,src}}$ with $T$ over the example, and use $\Gamma_{\mathrm{eff}}\approx\gamma$ only for the instantaneous rate. The corresponding rounded dimensional values are

$$
\tau_{\mathrm{syn}}^{\mathrm{obs}}\approx 7.7\times 10^4\,\mathrm{s},
\qquad
\tau_{\mathrm{syn}}^{\mathrm{asm}}\approx \frac{\tau_{\mathrm{syn}}^{\mathrm{obs}}}{\Gamma_{\mathrm{eff}}}\approx 7.7\,\mathrm{s}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2997ff94cf43b4c7)

These values illustrate the instantaneous factor-of-$10^4$ conversion, not an elapsed assembly lifetime or a derived substrate law. Their dimensional units are standard comparison units; no numerical value for $c_f$ is inferred from them. A substrate instantiation uses $c_f=1$ and must separately declare the maps into seconds, gauss, effective energy, and the photon speed. A proposed $10\%$ cooling-break screen has no universal observational status: source-specific data, calibration, bulk motion, field strength, and injection uncertainties determine a valid comparison. A deviation from the standard clock law requires a derived prediction and independent tests in its stated domain; proximity to a horizon or a large proposed sea density does not establish that a regime is unconstrained.

Propagation and timing conventions must remain explicit in cosmology-facing use.

### Open Mapping Targets

- Recover observed cascade-like spectral slopes and break structures in limits where synchrotron cooling dominates.
- Recover synchrotron self-absorption from the same event family as emissivity, including the optically thick source function and its separation from plasma-dispersion suppression.
- Derive the synchrotron wake-strain threshold and $\mathcal{R}_{\Theta}^{\mathrm{syn}}$ from Noether braid velocity deformation, $G_{\text{grad}}$, transmitter-side acceleration weights, signed root playback, and $\mathcal{V}_{\mathrm{NS}}$.
- Map pair-loading predictions to assembly-density and outflow-structure variables without changing QED/QED-like reaction channels.
- Quantify joint regimes where synchrotron cascades and bremsstrahlung together set the photon bath relevant to nucleation-era mapping.
- Bound acceptable parameter freedom in provisional mapping variables so parsimony does not degrade relative to standard transport models.

### Possible Explanatory Gain

This mapping aims at mechanistic compression across channels:

- One substrate language for synchrotron, pair production, and bremsstrahlung as wake/assembly transport outcomes.
- A single timing-conversion layer for rate equations (`observer` vs `assembly` clocks) used consistently in simulation bookkeeping.
- A testable mapping hypothesis that pair-loading boundaries depend on local Noether sea state variables ($\rho_{\text{NS}}$, $n$, anisotropy) in addition to standard observer-level compactness controls.

If future derivations show no measurable deviations in tested regimes, they do not establish new phenomenology there. Explanatory gain could still come from deriving the common mechanism with fewer independent assumptions or parameters; that gain requires an explicit comparison.

### Conditions for a Useful Reinterpretation

The reinterpretation is justified only if it improves theory structure, not vocabulary. In this chapter the intended payoff is:

- A single substrate mechanism class for radiation channels usually treated separately (synchrotron, pair loading, bremsstrahlung).
- A common conservation/provenance bookkeeping layer for mapping reaction networks into absolute-time assembly simulations.
- A constrained bridge from standard observables to substrate variables, so mapping claims can fail under consistency checks rather than being post-hoc fits.

Cosmology-facing provenance across synchrotron, pair production, bremsstrahlung, BBN photon loading, and CMB thermalization is tracked in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

If derivations show (i) no measurable deviations in any tested regime, (ii) no reduction in parameter count relative to standard plasma/QED models, and (iii) no new consistency constraints that eliminate existing fine-tuning, then the $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation provides only ontological vocabulary change without explanatory gain. In that case, standard transport remains the preferred description for cascade phenomenology, and the $\mathbb{A}\mathbb{A}\mathbb{A}$ mapping is demoted to an optional interpretive layer rather than a foundational claim.

### Sources and Comparison Limits

Wayne Hu's [Synchrotron lecture notes](https://background.uchicago.edu/~whu/Courses/Ast305_10/ast305_10.pdf), AST 305, Set 10 (2010), derive the classical pitch-angle power and broadband spectrum used here. Sari, Piran, and Narayan, [Spectra and Light Curves of Gamma-Ray Burst Afterglows](https://arxiv.org/abs/astro-ph/9712005), 1998, DOI 10.1086/311269, Section 2, give the slow- and fast-cooling segments; their bulk Lorentz factor must be distinguished from the lepton factor used here. Granot, Piran, and Sari, [Synchrotron Self Absorption in GRB Afterglow](https://arxiv.org/abs/astro-ph/9808007), 1999, DOI 10.1086/308052, Section 1, supply the low-frequency $\nu^2$ counterexample to a universal $\nu^{5/2}$ rule.

Gould and Schréder, [Pair Production in Photon-Photon Collisions](https://doi.org/10.1103/PhysRev.155.1404), 1967, equations (1)–(2), identify the unpolarized pair cross section and energy-angle threshold. Bandiera and Petruk, [Synchrotron polarization with a partially random magnetic field](https://arxiv.org/abs/2405.14534), 2024, Section 2, distinguish sky-projected polarization, electron-spectrum dependence, and random-field averaging. These are observer-level comparisons and do not establish the proposed architrino or photon branches.

[^architrino-count]: Each recruited Noether sea braid contributes its declared $(N_{\mathrm{arch}})_{\mathrm{braid}}$ identities. Conservation requires that the initial participating photon and sea inventories equal the final charged-pair and residual-medium inventories, identity by identity and polarity by polarity. Photon constituents joining the pair are counted once; those returned to the medium remain in the final medium inventory. A braid-only count suffices only for a declared partition that routes all photon constituents elsewhere and accounts for them there. Explicit event provenance remains a derivation and simulation obligation.
