# Mode Taxonomy

This chapter defines the controlled vocabulary for reaction-level assembly transitions. It is the canonical terminology source for `reactions/*.md`.

For concrete channel applications of this vocabulary, see [Bremsstrahlung](bremsstrahlung.md), [Synchrotron](synchrotron.md), [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), [Electron](../assemblies/fermions/electron.md), and [Neutrinos](../assemblies/fermions/neutrinos.md).

## Scope

The goal is consistency, not new phenomenology. Standard observer-level reaction equations remain unchanged unless a chapter explicitly derives a deviation.

This taxonomy records which channel family a reaction uses; it does not derive the angular-momentum or spin rule for that family. Photon Gate B, weak-corridor vector spin, Pauli/statistics closure, and spin-sensitive measurement outcomes inherit [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md) and should remain marked as closure targets in reaction prose.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly-Level Interpretation

At assembly level, these terms refer to substrate dynamics in absolute time:

- **Mode-lock event:** a discrete stability transition where a driven Noether braid/wake configuration settles into an allowed propagating or bound mode (a named candidate realization is the [spindle braid](../noether-braid/spindle-braid.md)).
- **Wake-strain threshold:** the local instability boundary in Noether sea-coupled transport; below threshold, energy disperses into medium excitations, above threshold, stable mode formation is allowed.
- **Nucleation:** relocking/reorganization of existing substrate content (with provenance-preserving architrino bookkeeping), not creation ex nihilo.
- **Planar-mode nucleation (photon channels):** lock-in to a stable coaxial contra-rotating polarity-conjugate planar-pair mode carrying Gate A energy-momentum data and Gate B transverse-ledger data.
- **Corridor-mode nucleation (weak channels):** lock-in to corridor-type interaction modes used for $W^\pm/Z$ channel bookkeeping.
- **Pair nucleation:** local substrate recruitment/reconfiguration into $e^+e^-$ assemblies under threshold-satisfying two-photon forcing, constrained to recover standard kinematic and rate limits in validated regimes. The incoming photon ledgers close at the vertex; the outgoing charged-assembly identities require identity-routed substrate content rather than relabeling the photon constituents.

Observer-level equations remain the operational layer. Assembly-level language is accepted only when it preserves threshold, cross-section, timing, and conservation closure against standard phenomenology.

## Low-Energy Standard Model Assemblies in the Noether Sea

This section is the canonical stepwise map for low-energy Standard Model channels interpreted in $\mathbb{A}\mathbb{A}\mathbb{A}$ language.

### Regime Assumptions

- Low-energy means interaction scales where validated SM/QED/QCD effective descriptions already succeed and no beyond-tested deviation is introduced by default.
- The substrate is modeled as the Noether sea, which can store, transport, and relock assembly content under local conservation constraints.
- "Low-energy" here includes laboratory, beamline, plasma, and most astrophysical transport contexts outside unresolved near-horizon/extreme-density limits.

### Hybrid Standard Model Routing

A Standard Model comparison row must name which effective layer supplies the observer-level prediction. $\mathbb{A}\mathbb{A}\mathbb{A}$ reaction language may then map the provenance and assembly changes, but it may not replace the validated Standard Model source lane with an unmarked substrate story.

| Channel use | Observer-level source lane | Required matching record |
| --- | --- | --- |
| Short-distance electroweak or collider channel | Renormalized perturbative chiral-gauge chart, with declared input scheme | Gauge-invariant amplitude or detector-level observable, scheme, order, expansion parameter, and systematic remainder |
| Low-energy weak or nuclear channel | Matched weak effective theory plus QCD or nuclear matrix elements | Operator basis, normalization, CKM/PMNS factor when applicable, matrix-element source, and uncertainty class |
| Hadronic strong channel | QCD calculation, lattice-QCD matrix element, factorization theorem, or validated phenomenological input | Color-singlet operator or infrared-safe observable, scale, scheme, and truncation or lattice-continuum record |
| Pure QED or transport channel | Validated QED, kinetic, or material-response model | Observable definition, medium assumptions, boundary conditions, and error budget |

The reaction row therefore records a Standard Model prediction as a structured object: energy regime, operator or detector functional, matching map, expansion or scaling parameter, remainder estimate, and consistency statements such as gauge invariance, unitarity, positivity, or infrared safety when those are part of the source lane. A finite regulator or fit trend is evidence only after this record states how the regulator is removed, matched, or bounded.

### Canonical Stepwise Workflow

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
$(\rho_{\text{NS}}(\mathbf X,T), n(\mathbf X,T), \chi_{\text{sea}}(\mathbf X,T), \mathcal{V}_{\mathrm{NS}}, \nabla \rho_{\text{NS}}, \Phi_{\text{eff}}, T_{\mathrm{sea}}^{\mathrm{th}}, J_{\mathrm{loc}})$.
Here $\mathcal{V}_{\mathrm{NS}}$ is the effective Noether sea anisotropy/vorticity map used by the magnetic-like channel below, $T_{\mathrm{sea}}^{\mathrm{th}}$ is the local effective temperature characterizing internal mode excitation as in [Dark Energy](../cosmology/dark-energy.md) — a temperature entry, not a time coordinate — and $J_{\mathrm{loc}}$ is the local causal-root/Jacobian data — including the same-record transmitter-side acceleration weight — entering the delayed-branch sums below. These variables are mapping handles, not replacement observables.

Magnetic-like observer language belongs at this mapping layer. It is not a substrate-level law and is not imported from rotating-frame coordinates. At substrate level each primitive hit remains line-of-action; the magnetic-like transverse channel is the part of the delayed-branch sum that survives after projection perpendicular to the assembly drift and after Noether sea anisotropy/vorticity dressing.

For an assembly $A$ with $\|\mathbf{V}_A\| > 0$, define
$$
\Pi_{\perp}^{ij}(A)
=
\delta^{ij}-\hat V_A^i\hat V_A^j,
\qquad
\hat{\mathbf{V}}_A=\frac{\mathbf{V}_A}{\|\mathbf{V}_A\|}
$$

A minimal transverse-channel map is
$$
F_{\perp,A}^{i}(T)
=
\Pi_{\perp}^{ij}(A)
\sum_{k}\sum_{T_t\in\mathcal{C}_{Ak}(T)}
\mathcal{K}_{Ak}\!\left(T;T_t,\mathcal{V}_{\mathrm{NS}},R_A\right)
\hat r_{Ak,j}(T;T_t)
$$

The weight $\mathcal{K}_{Ak}$ packages the inverse-square causal-wake factor, the transmitter-side acceleration-weight factor of the $W^{\mathrm{acc}}$ family, the polarity sign, and the local Noether sea anisotropy/vorticity response; the transmitter-side (causal) Jacobian $D_{t}$ enters only as the transversality and root-density data that make each causal root legal, not as a separate multiplicative factor stacked on $W^{\mathrm{acc}}$ (which already carries the $1/D_{t}$ branch density). It is named $\mathcal{K}$ rather than $W$ because it is a composite, not the canonical receiver-side factor alone. The argument $R_A$ is the assembly envelope scale-and-orientation record inherited from Noether braid geometry. This equation is the allowed bridge to magnetic-like language: transverse force is recovered as a projected consequence of delayed branch geometry plus medium response, not as an independent $\mathbf{v}\times\mathbf{B}$ substrate term.

In this expression, $\mathcal{C}_{Ak}(T)$ is the causal-root set for source branch $k$ acting on assembly $A$, and $\hat r_{Ak,j}(T;T_t)$ is the $j$ component of the delayed line-of-action unit vector. The formula therefore preserves the primitive line-of-action law while naming the observer-level transverse projection.

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
\partial_{t_{\mathrm{eff}}}\rho_{\mathrm{eff}}
+
\nabla_{\mathrm{eff}}\cdot\mathbf{J}_{\mathrm{eff}}
$$

and the gauge component requires every observer-level observable $\mathcal O$ used by the channel to obey

$$
\Delta_{\mathrm{gauge}}[\mathcal O,\chi_{\mathrm g}]
\equiv
\mathcal O[A_{\mu}^{\mathrm{eff}}+\partial_\mu\chi_{\mathrm g}]
-
\mathcal O[A_{\mu}^{\mathrm{eff}}]
=0
$$

with $\chi_{\mathrm g}$ the gauge function, subscripted to keep it distinct from the delay-factor family $\chi_{\text{sea}}$, $\chi_\gamma$, $\chi_{\mathrm{eff}}$.

The energy, momentum, and angular-momentum components are defined by the effective electromagnetic energy-momentum gate in [Radiation](radiation.md). A channel passes only when these components vanish in the declared validated limit or when each nonzero term is assigned to a named photon, material, recoil, wake, or remnant row. This keeps Maxwell-level ledgers as recovery tests for channel bookkeeping rather than as primitive Noether sea dynamics.

5. **Evaluate wake-strain trigger**
Compute whether interaction forcing crosses the relevant mode boundary.
- If below threshold: no mode-lock event, energy routes into transport/heating/scattering channels.
- If above threshold: mode-lock event allowed and channel-specific nucleation/relock proceeds.

6. **Apply channel-specific lock rule**
Select the mode family:
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

### Detailed Scenario A: Bremsstrahlung Channel

Observer channel: $e^\pm + Z \rightarrow e^\pm + Z + \gamma$.

Step map:
1. Incoming charged assembly follows a deflected trajectory in target potential.
2. Deflection induces wake-strain concentration in local Noether sea coupling, with received forcing sharpened or diluted by transmitter-side acceleration weight during the scattering history.
3. If wake-strain crosses planar-mode threshold, a photon mode nucleates as a coaxial contra-rotating polarity-conjugate planar pair.
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

### Detailed Scenario B: Synchrotron Emission and Pair-Loaded Loop

Observer channels:
- effective emission: $e^\pm \xrightarrow{B} e^\pm + \gamma_{\mathrm{syn}}$, with $B$ written over the arrow because the magnetic state is an environment, not a reaction participant,
- pair channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Directional magnetic state $B$ is represented as observer shorthand for the effective Noether sea anisotropy/vorticity map $\mathcal{V}_{\mathrm{NS}}$ together with delayed branch geometry, transmitter-side factors, and transmitter-side acceleration weights that generate observer-level transverse forcing.
2. Curved charged-assembly transport drives repeated planar-mode opportunities.
3. Emitted photons propagate and may enter pair threshold windows in dense radiation zones.
4. Pair nucleation relocks local substrate content into $e^+e^-$ assemblies with provenance updates.
5. New pairs re-enter emission transport, closing the cascade loop.
6. Observer-level closures required:
- pair threshold $s \ge 4m_e^2$,
- Breit-Wheeler rate-limit recovery,
- synchrotron cooling/polarization recovery in weak-gravity Lorentzian limits.

Minimum closure equations, with magnetic-energy expressions in Gaussian units, invariant-mass thresholds in $c=1$ units, and the synchrotron power taken in the ultrarelativistic limit $\beta\to1$ (the general form carries an extra $\beta^2$):

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

### Detailed Scenario C: Pair Production as Standalone Conversion

Observer channel: $\gamma + \gamma \rightarrow e^+ + e^-$.

Step map:
1. Two photon modes, each modeled as a coaxial contra-rotating polarity-conjugate planar pair, enter overlap geometry with center-of-momentum invariant $s$.
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

### Detailed Scenario D: Weak-Channel Transition (Terminology Boundary)

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

Here $\mathcal{M}$ is standard amplitude notation for the comparison row, not the timespace manifold $\mathcal{M}$.

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

### Practical Authoring Rule for `reactions/*.md`

Each reaction chapter should include three short blocks:
- `Core Channels (Inclusion Rule)` using `BR > 1%` where PDG branching exists or `>1% contribution` where transport dominance is the relevant criterion.
- $\mathbb{A}\mathbb{A}\mathbb{A}$ Assembly Interpretation by Channel using the stepwise map above.
- `Observer-Level Closure Checks` listing thresholds/rates/conservation/timing gates that keep mapping scientifically constrained.

## Core Terms

- **Mode-lock event:** generic lock-in transition where transport energy is reorganized into a stable propagating or bound assembly mode.
- **Wake-strain threshold:** local trigger condition where trajectory forcing and Noether sea state exceed stability boundary for a mode-lock event.
- **Nucleation:** formation of a stable assembly mode from local substrate reconfiguration, with conservation/provenance bookkeeping.

## Channel-Specific Terms

- **Planar-mode nucleation:** photon-channel lock-in language for forming a coaxial contra-rotating polarity-conjugate planar-pair mode. Use for electromagnetic radiation channels (for example synchrotron, bremsstrahlung) unless a chapter justifies another term. The term carries Gate A kinematic closure and Gate B transverse-ledger closure, but those closures should be tested separately.
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

## Related Chapters

- [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md)
- [Effective Lagrangian](../dynamics/effective-lagrangian.md)
- [Bremsstrahlung](bremsstrahlung.md)
- [Synchrotron](synchrotron.md)
