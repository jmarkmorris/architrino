# Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

For concrete channel applications of this vocabulary, see [Radiation](radiation.md), [Atomic Transition Radiation](atomic-transition-radiation.md), [Bremsstrahlung](bremsstrahlung.md), [Synchrotron](synchrotron.md), [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), [Electron](../assemblies/fermions/electron.md), and [Neutrinos](../assemblies/fermions/neutrinos.md).

## Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

This taxonomy records the reaction channel grouping; it does not derive the angular-momentum or spin rule for that grouping. Photon Gate B, weak-corridor vector spin, Pauli/statistics closure, and spin-sensitive measurement outcomes inherit [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) and should remain marked as closure targets in reaction prose.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

An assembly is a configuration of [architrinos](../foundations/architrino.md), the point entities with fixed polarity and no primitive mass. Their causal wakes record past emissions and determine later acceleration through the [Master Equation](../dynamics/master-equation.md). The [Noether sea](../spacetime/noether-sea.md) names ambient assembly contents in the Euclidean void; absolute time $T$ orders their histories. The following terms classify proposed transitions in those histories:

- **Mode-lock event:** a transition in the assembly classification when a driven Noether braid/wake configuration enters a propagating or bound mode. Calling the classification discrete does not impose a discontinuity on constituent paths; the candidate mode's existence, formation, and persistence require separate dynamical evidence.
- **Wake-strain threshold:** a proposed channel-specific boundary in admissible path-history space, expressed through a declared diagnostic of delayed acceleration and assembly response. A threshold crossing alone establishes neither capture into a mode nor its stability.
- **Nucleation:** relocking/reorganization of existing substrate content (with provenance-preserving architrino bookkeeping), not creation ex nihilo.
- **Planar-mode nucleation (photon channels):** proposed lock-in to a coaxial contra-rotating polarity-conjugate planar-pair mode, with Gate A energy-momentum targets and Gate B transverse-ledger targets.
- **Corridor-mode nucleation (weak channels):** lock-in to corridor-type interaction modes used for $W^\pm/Z$ channel bookkeeping.
- **Pair nucleation:** local substrate recruitment/reconfiguration into $e^+e^-$ assemblies under threshold-satisfying two-photon forcing, constrained to recover standard kinematic and rate limits in validated regimes. The incoming photon ledgers close at the vertex; the outgoing charged-assembly identities require identity-routed substrate content rather than relabeling the photon constituents.

The coaxial contra-rotating polarity-conjugate planar pair is a proposed photon carrier whose acceleration-balance closure remains open. Consequently, `lock-in` and `stable planar-pair mode` vocabulary throughout this taxonomy is referent-pending; see Photon Referent Status in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md). The charged-pair and corridor assignments also require their own dynamical realizations. A compatible retained history must satisfy the acceleration law before perturbations can establish stability. Charge counts and channel names alone establish neither result.

Observer-level equations remain the operational layer. Agreement with threshold, cross-section, timing, and conservation benchmarks is necessary for an assembly interpretation; agreement obtained by inserting those benchmark equations is a comparison, not an independent derivation of the assembly mechanism.

## Low-Energy Standard Model Assemblies in the Noether Sea

This section is the canonical stepwise map for low-energy Standard Model channels interpreted in $\mathbb{A}\mathbb{A}\mathbb{A}$ language.

### Regime Assumptions

- Each channel declares its energy and momentum-transfer range and the approximation used. The Standard Model (SM), quantum electrodynamics (QED), and quantum chromodynamics (QCD) supply observer-level comparison descriptions within their specified domains.
- The Noether sea supplies candidate ambient assembly content and response; its storage, transport, and relocking laws require derivation. It is physical content within absolute time and the Euclidean void, not their replacement.
- A laboratory or astrophysical location does not itself define a low-energy regime. Weak contact interactions require momentum transfers small compared with the mediator scale; classical radiation additionally requires control of quantum recoil and strong-field effects. The scenarios below have separate validity conditions.

### Hybrid Standard Model Routing

A Standard Model comparison row must name which effective layer supplies the observer-level prediction. $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction language may then map the provenance and assembly changes, but it may not replace the validated Standard Model prediction source with an unmarked substrate story.

| Channel use | Observer-level prediction source | Required matching record |
| --- | --- | --- |
| Short-distance electroweak or collider channel | Renormalized perturbative chiral-gauge chart, with declared input scheme | Gauge-invariant amplitude or detector-level observable, scheme, order, expansion parameter, and systematic remainder |
| Low-energy weak or nuclear channel | Matched weak effective theory plus QCD or nuclear matrix elements | Operator basis, normalization, CKM/PMNS factor when applicable, matrix-element source, and uncertainty class |
| Hadronic strong channel | QCD calculation, lattice-QCD matrix element, factorization theorem, or validated phenomenological input | Color-singlet operator or infrared-safe observable, scale, scheme, and truncation or lattice-continuum record |
| Pure QED or transport channel | Validated QED, kinetic, or material-response model | Observable definition, medium assumptions, boundary conditions, and error budget |

The reaction row therefore records a Standard Model prediction as a structured object: energy regime, operator or detector functional, matching map, expansion or scaling parameter, remainder estimate, and consistency statements such as gauge invariance, unitarity, positivity, or infrared safety when the selected prediction source requires them. A finite regulator or fit trend is evidence only after this record states how the regulator is removed, matched, or bounded.

### Canonical Stepwise Workflow

1. **Define observer-level channel** Use the standard reaction statement first (for example $e^- + Z \rightarrow e^- + Z + \gamma$ or $\gamma + \gamma \rightarrow e^+ + e^-$).

2. **Set validated closure targets** Declare the required observer-level closures before ontology mapping:
- kinematic threshold closure,
- differential/total rate closure,
- energy-momentum closure,
- timing/frame closure.

3. **Initialize assembly state** Record an observer-facing summary tuple: `(identity, provenance path, charge sector, momentum, local Noether sea state)`. This tuple is not sufficient initial data for the delayed acceleration law. Its provenance pointer must resolve to constituent identities, polarities, positions, velocities, compatible retained histories, boundary inputs, and all admitted causal roots, including self-hits. Any finite history truncation needs an omitted-history bound. Momentum is an assembly/observer readout, not a primitive architrino property.

4. **Characterize local Noether sea state** Specify Noether sea state variables used by mapping, with arguments suppressed only when the local context is clear: $(\rho_{\text{NS}}(\mathbf X,T), n(\mathbf X,T), \chi_{\text{sea}}(\mathbf X,T), \mathcal{V}_{\mathrm{NS}}, \nabla \rho_{\text{NS}}, \Phi_{\text{eff}}, T_{\mathrm{sea}}^{\mathrm{th}}, J_{\mathrm{loc}})$. Here $\rho_{\text{NS}}$ is the coarse-grained braid number density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ its normalization to a declared reference density, and $\chi_{\text{sea}}=c_f/c_{\text{eff}}$ the delay factor for the dressed assembly channel. The gradient acts on native position $\mathbf X$, while $\Phi_{\text{eff}}$ is an effective potential whose observer map must be supplied. The quantity $\mathcal{V}_{\mathrm{NS}}$ is the candidate anisotropy/vorticity response used below, $T_{\mathrm{sea}}^{\mathrm{th}}$ is the effective temperature of an ensemble of internal excitations as in [Dark Energy](../cosmology/dark-energy.md), and $J_{\mathrm{loc}}$ records the causal roots, their Jacobians, and same-record transmitter-side acceleration weights. These summaries require extraction from the retained histories; they do not define a closed constitutive evolution by themselves.

Magnetic-like observer language belongs at this mapping layer. At substrate level each primitive contribution acts along the delayed line joining an architrino transmitter to an architrino receiver. Projection perpendicular to an assembly's group velocity defines a transverse diagnostic; identifying any part of it with a magnetic response requires a separate effective-law derivation. Direct wakes, sea-mediated response, and mixed contributions remain possible until that derivation separates them.

For an assembly $A$, choose a center and an averaging convention, and let $\mathbf V_A$ be that center's group velocity relative to the declared frame. With $\|\mathbf{V}_A\| > 0$, define
$$
\Pi_{\perp}^{ij}(A)
=
\delta^{ij}-\hat V_A^i\hat V_A^j,
\qquad
\hat{\mathbf{V}}_A=\frac{\mathbf{V}_A}{\|\mathbf{V}_A\|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f749e629ce4f75fc)

Here $i,j$ are Cartesian component indices and $\delta^{ij}$ is the Euclidean identity tensor. The projector removes the component parallel to $\mathbf V_A$; it is undefined at zero group velocity, where a channel must retain the full vector response or declare a separate physical axis. A candidate transverse-channel representation is
$$
A_{\perp,A}^{i}(T_r)
=
\Pi_{\perp}^{ij}(A)
\sum_{k}\sum_{T_t\in\mathcal{C}_{Ak}(T_r)}
\mathcal{K}_{Ak}\!\left(T_r;T_t,\mathcal{V}_{\mathrm{NS}},R_A\right)
\hat r_{Ak,j}(T_r;T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-89a7192db3da63be)

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

[View →](../../../../equation-mapping.html#corpus-equation-ba312b24b795bddb)

where the continuity component is

$$
\Delta_{\mathrm{cont}}
\equiv
\partial_{t_{\mathrm{eff}}}\rho_{\mathrm{eff}}
+
\nabla_{\mathrm{eff}}\cdot\mathbf{J}_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-452b366787f8f374)

and the gauge component requires every observer-level observable $\mathcal O$ used by the channel to obey

$$
\Delta_{\mathrm{gauge}}[\mathcal O,\chi_{\mathrm g}]
\equiv
\mathcal O[A_{\mu}^{\mathrm{eff}}+\partial_\mu\chi_{\mathrm g}]
-
\mathcal O[A_{\mu}^{\mathrm{eff}}]
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-9d522820850a7f72)

Here $t_{\mathrm{eff}}$ and $\nabla_{\mathrm{eff}}$ refer to the declared observer chart, $\rho_{\mathrm{eff}}$ and $\mathbf J_{\mathrm{eff}}$ are its charge density and current, and $A_\mu^{\mathrm{eff}}$ is its electromagnetic potential. The gauge function $\chi_{\mathrm g}$ changes the potential description without changing the physical observable. The displayed test applies to observables written as functionals of the potential after other dependencies are consistently included or eliminated. If charged matter fields are explicit, they must transform along with the potential under the same charge and derivative convention. Allowed gauge functions must also respect the declared boundary conditions; changing a physical boundary input is not a gauge test. The subscript keeps $\chi_{\mathrm g}$ distinct from the delay-factor family $\chi_{\text{sea}}$, $\chi_\gamma$, $\chi_{\mathrm{eff}}$.

The energy, momentum, and angular-momentum components are defined by the effective electromagnetic energy-momentum gate in [Radiation](radiation.md). A nonzero subsystem balance can represent exchange with a named photon, material, recoil, wake, or remnant contribution only when that transfer is evaluated independently and counted once. The complete residual must then vanish in the declared limit or lie within a stated error bound. Naming an unmeasured remainder does not close the balance, and neither a continuity nor a gauge failure can be repaired by assigning it to heat. These conditions make the effective ledger a recovery test rather than a conservation law inserted into the substrate dynamics.

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

[View →](../../../../equation-mapping.html#corpus-equation-7b6389e8d8494465)

Here $\Delta_A$ is the photon Gate A residual; $\Delta_Q^\gamma$, $\Delta_{\mathrm{surv}}^\gamma$, $\Delta_{\parallel}^{\mathrm{sub}}$, $\Delta_{\mathrm{hel}}^\gamma$, and $\Delta_{\epsilon}^{\gamma}$ test the planar-pair substrate, transverse survival, longitudinal exclusion, helicity, and analyzer-basin rows; and $\Delta_{\mathrm{src}}^\gamma$, $\Delta_{\mathrm{recoil}}^\gamma$, $\Delta_{\mathrm{med}}^\gamma$, $\Delta_{\mathrm{wake}}^\gamma$, $\Delta_{\mathrm{handoff}}^\gamma$, $\Delta_{\mathrm{rem}}^\gamma$, and $\Delta_{\mathrm{bal}}^\gamma$ test the source, recoil, medium, causal-wake, analyzer-handoff, remnant, and event-balance rows. A reaction chapter may cite this vector as a bookkeeping contract, not as a derivation of photon polarization.

7. **Execute provenance-conserving relock** Update assembly graph by relocking existing substrate content. No ex nihilo creation is permitted in ontology bookkeeping; recruitment comes from local Noether braid availability.

8. **Test complete event balances** Derive and evaluate the assembly/observer accounts, including boundary exchange and any recruited sea inventory:
- $\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}$,
- $\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}$,
- spin/angular-momentum ledger balance for emitted, absorbed, or converted vector modes,
- provenance ledger balance across reactants, products, and recruited substrate content.

Here $Q$ is effective electric charge and $p^\mu$ is four-momentum in one declared effective inertial chart; they are not architrino masses or primitive four-vectors. A finite event includes all input/output fluxes, retained wake changes, recoil, medium changes, and remnants. Primitive identity and polarity counts are preserved by the ontology, but this alone does not derive energy, momentum, or angular-momentum conservation. The spin/angular-momentum line is a recovery requirement whose channel content belongs to the angular-momentum ledger, photon Gate B, the massive-vector corridor model, or the spin-statistics proof as appropriate.

9. **Project back to observer-level outputs** Compute spectra, cross-sections, rates, and timing in standard variables. Accept mapping only if closure targets from Step 2 are recovered within validated limits.

### Detailed Scenario A: Bremsstrahlung Channel

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

[View →](../../../../equation-mapping.html#corpus-equation-df6eee7222616d8d)

$$
p^\mu_{e,\mathrm{in}} + p^\mu_{Z,\mathrm{in}} = p^\mu_{e,\mathrm{out}} + p^\mu_{Z,\mathrm{out}} + k^\mu_{\gamma}
$$

[View →](../../../../equation-mapping.html#corpus-equation-47c0f5549f5ccada)

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-88ff383d1656ebfe)

$$
\left(\frac{d\sigma}{dk}\right)_{\mathrm{map}} \rightarrow \left(\frac{d\sigma}{dk}\right)_{\mathrm{std}}
\quad \text{(validated limit)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2234c027eda6b60d)

Here $p_e^\mu$ and $p_Z^\mu$ are electron/positron and target four-momenta, $k_\gamma^\mu$ is photon four-momentum, and $k$ in $d\sigma/dk$ denotes photon energy. The cross-section $\sigma$ is the channel event rate per target divided by the incident flux. The displayed balance is the closed-channel comparison limit; additional material, medium, or wake transfers require explicit contributions. Agreement is tested for a declared target, energy range, screening model, and detector acceptance, using predictions fixed before comparison.

### Detailed Scenario B: Synchrotron Emission and Pair-Loaded Loop

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

[View →](../../../../equation-mapping.html#corpus-equation-3188bc68d54493d1)

$$
\tau_{\mathrm{syn}} \sim \frac{E_e}{P_{\mathrm{syn}}} \propto \frac{1}{\gamma B^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f6999760323a2911)

The symbols $\sigma_T$, $U_B$, and $E_e$ denote the Thomson cross-section, magnetic energy density, and electron energy. The factors $\beta=v/c$ and $\gamma=(1-\beta^2)^{-1/2}$ use standard observer comparison notation. Here $c$ is the calibrated observer speed, not an assumed identification with primitive $c_f$; new native numerical evaluations use $c_f=1$. The quantity $\tau_{\mathrm{syn}}$ is the comparison cooling timescale measured in the same effective frame as $E_e$ and $P_{\mathrm{syn}}$, not substrate absolute time or an automatically identified proper-clock reading. The scaling requires a specified field and pitch distribution and synchrotron-dominated losses.

$$
s=(k_1+k_2)^2 \ge 4m_e^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-983a302c7545ca17)

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-da9a4c71cb774c8c)

### Detailed Scenario C: Pair Production as Standalone Conversion

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

[View →](../../../../equation-mapping.html#corpus-equation-b085125ff6c1bafc)

$$
s=(k_1+k_2)^2=2E_1E_2(1-\cos\theta)\ge 4m_e^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-9b851271dd15de01)

$$
k_1^\mu+k_2^\mu=p^\mu_{e^-}+p^\mu_{e^+}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e24a26c65e73f194)

These two equations use a local effective inertial chart with signature $(+,-,-,-)$ and comparison units $c=1$: $k_i^\mu=(E_i,\mathbf k_i)$ are on-shell photon four-momenta, $m_e$ is the observer electron mass, and $\theta$ is the angle between the incoming photon directions. Expanding the square with $k_i^2=0$ gives $s=2E_1E_2(1-\cos\theta)$; parallel photons give $s=0$, regardless of their separate energies. The displayed two-body balance applies only when omitted surroundings have zero net four-momentum change. A sea-recruitment model instead requires $k_1^\mu+k_2^\mu+P_{\mathrm{sea,in}}^\mu=p_{e^-}^\mu+p_{e^+}^\mu+P_{\mathrm{sea,out}}^\mu$, with the sea symbols covering all omitted ambient, wake, and remnant accounts over the same event boundary. Recovery of the isolated Breit-Wheeler limit must demonstrate that their net contribution vanishes or is bounded at the declared accuracy; conserved constituent counts do not imply this cancellation.

$$
\sigma_{\gamma\gamma,\mathrm{map}}(s) \rightarrow \sigma_{\gamma\gamma,\mathrm{BW}}(s)
\quad \text{(validated limit)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-da9a4c71cb774c8c-2)

### Detailed Scenario D: Weak-Channel Transition (Terminology Boundary)

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

[View →](../../../../equation-mapping.html#corpus-equation-9124b64811fc0bce)

Here $\mathcal{M}$ is standard amplitude notation for the comparison row, not the timespace manifold $\mathcal{M}$.

$$
\Gamma_{\mathrm{map}} \rightarrow \Gamma_{\mathrm{SM}},
\qquad
\mathrm{BR}_{\mathrm{map}} \rightarrow \mathrm{BR}_{\mathrm{PDG}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-112c86834436b765)

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

[View →](../../../../equation-mapping.html#corpus-equation-375afdbe6ba0b446)

Here the Particle Data Group (PDG) supplies the selected observer comparison data, and $\mathbf y_{\mathrm{map}}$ contains the corresponding mapped predictions. The data vector may include boson masses $M_W,M_Z$, widths $\Gamma_W,\Gamma_Z$, weak mixing angles, quark mixing entries (CKM), neutrino mixing entries (PMNS), lifetimes, or branching fractions. The displayed whitening formula applies when $C_{\mathrm{weak}}$ is a specified symmetric positive-definite covariance matrix for the residual vector; a general uncertainty convention is not a matrix inverse. It rescales correlated discrepancies to dimensionless components. A singular covariance needs independent coordinates or a justified restriction to its supported subspace, with exact constraints checked separately. Upper limits and asymmetric or separately reported statistical/systematic errors require their published likelihood or comparison rule, not an unmarked symmetric covariance. State the dataset version, correlations, theory uncertainty, and which data were used to fit parameters; a small fitted residual alone is not predictive validation.

For charged weak processes with momentum transfer well below the $W$ mass scale, the same mapping must also recover the leading contracted current-current comparison limit in units $\hbar=c=1$:
$$
\mathcal{L}_{\mathrm{map}}^{\mathrm{low}}
\rightarrow
-\frac{4G_F}{\sqrt 2}\,J_+^\mu J^-_\mu
$$

[View →](../../../../equation-mapping.html#corpus-equation-411cbec73e234e62)

Here $J_+^\mu$ and $J_-^\mu$ are conjugate charged weak currents using the left-chiral projector $P_L=(1-\gamma^5)/2$, including the applicable flavor factors; $\gamma^5$ is the standard chirality matrix. With currents written using $1-\gamma^5$ instead, their product is four times larger and the coefficient is $-G_F/\sqrt2$. The symbols $\mathcal L_{\mathrm{map}}^{\mathrm{low}}$ and $G_F$ denote the effective interaction density and Fermi coupling. Deriving $G_F$ from a corridor scale is an open recovery obligation, as explained in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md#low-energy-four-fermi-limit); it is not achieved by inserting the measured value. Precision comparisons also require matching corrections and the relevant nuclear or hadronic matrix elements. This ties the target to beta-reaction and muon-reaction measurements (SM labels: `beta decay`, `muon decay`) while keeping finite-mediator exchange at its appropriate comparison scale.

$$
\sum Q_{\mathrm{in}}=\sum Q_{\mathrm{out}},
\qquad
\sum p^\mu_{\mathrm{in}}=\sum p^\mu_{\mathrm{out}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0c0c70834a1feab9)

### Practical Authoring Rule for `reactions/*.md`

Each reaction chapter should include three short blocks:
- `Core Channels (Inclusion Rule)` using `BR > 1%` where PDG branching exists or `>1% contribution` where transport dominance is the relevant criterion. This is a presentation rule, not a license to discard smaller channels from conservation or precision calculations. Define the denominator, regime, and source of each contribution, retain channels required by the observable, and bound the combined omitted contribution.
- $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel using the stepwise map above.
- `Observer-Level Closure Checks` listing thresholds/rates/conservation/timing gates that keep mapping scientifically constrained.

## Core Terms

- **Mode-lock event:** transition into a candidate propagating or bound assembly mode under the history and stability conditions stated above.
- **Wake-strain threshold:** channel-specific diagnostic boundary whose relation to capture must be derived from admissible histories.
- **Nucleation:** formation of an assembly mode from existing substrate content; its persistence and effective conservation accounts require separate evidence.

## Channel-Specific Terms

- **Planar-mode nucleation:** photon-channel lock-in language for forming a coaxial contra-rotating polarity-conjugate planar-pair mode (a proposed carrier; referent-pending per the carrier-grade note in the assembly-level interpretation section). Use for electromagnetic radiation channels (for example synchrotron, bremsstrahlung) unless a chapter justifies another term. The term carries Gate A kinematic closure and Gate B transverse-ledger closure, but those closures should be tested separately.
- **Corridor-mode nucleation:** weak-channel language reserved for $W^\pm/Z$ interaction contexts.
- **Pair nucleation:** $\gamma\gamma \rightarrow e^+e^-$ language at ontology level; must map to standard threshold/rate constraints in validated limits.

## Usage Rules

- Use `mode-lock event` when speaking generically across channels.
- Use `planar-mode` for photon emission in reaction chapters.
- Reserve `corridor` wording for weak channels to avoid semantic leakage into EM chapters.
- When a chapter uses provisional ontology terms, it must also state the observer-level mapping target (threshold, cross-section, timing).

## Mapping Discipline

- Ontology language cannot replace observer-level closure tests.
- Any provisional map must preserve:
  - reaction thresholds,
  - validated rate limits,
  - conservation laws,
  - explicit frame/timing conventions.

If these are not maintained, standard QED/SM transport language is authoritative for that regime.

## Sources and Comparison Scope

Condon and Ransom, *Essential Radio Astronomy* (2016), [§5.2.3, equations 5.37–5.42](https://www.cv.nrao.edu/~sransom/web/Ch5.html), supplies the classical pitch-angle dependence and isotropic average used in Scenario B. It supports the observer benchmark, not the proposed assembly mechanism.

Erler and Freitas, “Electroweak Model and Constraints on New Physics,” in the Particle Data Group's *Review of Particle Physics* (2024), [§10.1, equation 10.6 and the following low-momentum limit](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf), supplies the weak-current normalization and comparison-scale condition in Scenario D. Channel-specific measurements still require their own identified dataset and uncertainty convention.

## Related Chapters

- [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md)
- [Effective Lagrangian](../dynamics/effective-lagrangian.md)
- [Radiation](radiation.md)
- [Atomic Transition Radiation](atomic-transition-radiation.md)
- [Bremsstrahlung](bremsstrahlung.md)
- [Synchrotron](synchrotron.md)
