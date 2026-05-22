# Radiation

Radiation is the $\mathbb{A}\mathbb{A}\mathbb{A}$ workstream for energy shedding by assemblies. A radiative event is not defined merely by acceleration or by the presence of excess energy. It is the routed relaxation of a driven assembly or local Noether-Sea state into one or more allowed channels: photon output, medium excitation, recoil, residual internal energy, or reaction products. Photon output is described through planar-mode nucleation, while non-radiative channels remain explicit when the available energy does not lock into a stable photon assembly.

The detailed channel pages remain [Bremsstrahlung](bremsstrahlung.md), [Synchrotron Cascades](synchrotron.md), and [Atomic Transition Radiation](atomic-transition-radiation.md). Photon assembly ontology belongs in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), while channel vocabulary follows [Mode Taxonomy](../interactions/mode-taxonomy.md). Event-level conservation uses [Reaction Ledger](../validation/reaction-ledger.md), and cosmology-facing radiation provenance is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

This page is a foundation-up overview. It states the shared mechanism and the closure targets that individual channel pages must specialize. It does not by itself prove blackbody radiation, photon spin, atomic spectra, or QED cross sections.

## Foundation-Up Mechanism

The foundation-up radiation question is whether rapid transport changes can leave a Noether swarm internally mismatched relative to its nearest stable closure class. A moving Noether swarm has a velocity-deformed causal envelope, while a gravitational gradient skews its delay loops and phase closure. If a reaction suddenly decelerates the assembly, if curved transport changes too quickly, or if the assembly crosses a sharp Noether-Sea gradient, the external transport state can change faster than the inner, middle, and outer binary ledgers can adiabatically retune.

The resulting residual is first a closure mismatch, not yet a photon. For layer $a\in\{I,M,O\}$,

$$
\delta\Theta_a
=
\Theta_a(T;\mathbf{V}_{\text{before}},G_{\text{grad}})
-
\Theta_a(T;\mathbf{V}_{\text{after}},G_{\text{grad}}).
$$

Here $\Theta_a$ denotes the layer's phase-closure ledger over the comparison interval $T$, $\mathbf{V}$ denotes the transport state being retuned, and $G_{\text{grad}}$ denotes the local gradient data that modifies the delay loops. The notation $\{I,M,O\}$ refers to the same inner, middle, and outer nested shell swarm roles that ordered-axis chapters often write as $(H,M,L)$.

A compact residual magnitude can be treated as a derivation target:

$$
\mathcal{R}_{\Theta}
=
\left(\sum_{a\in\{I,M,O\}} w_a\,\delta\Theta_a^2\right)^{1/2},
\qquad
w_a>0.
$$

The weights $w_a$ are not free phenomenology in the completed theory. They must be derived from the layer hierarchy, active causal-root branches, and local Noether-Sea coupling. At this overview level, $\mathcal{R}_{\Theta}$ is only a bookkeeping norm for how far the post-drive assembly has been pushed away from the nearest closure class.

## Closure Residuals

A closure residual becomes radiatively relevant only when it cannot be absorbed by ordinary adiabatic retuning. The useful comparison is between the retuning time of the core and the driving time of the disturbance:

$$
\epsilon_{\text{ad}}
\equiv
\frac{\tau_{\text{retune}}}{\tau_{\text{drive}}}.
$$

When $\epsilon_{\text{ad}}\ll 1$, the inner, middle, and outer ledgers remain near their stable return map, and the disturbance appears as smooth transport or small local heating. When $\epsilon_{\text{ad}}\gtrsim 1$, the post-drive state can carry a finite closure residual after the external impulse has passed. Radiation begins only if that residual is routed through an allowed shedding channel.

Astrophysical jets add a useful macroscopic stress test for this same split. A supersonic working surface can create a large closure residual, but the outgoing observer-level channel depends on how quickly the shocked material can cool relative to its propagation time. A compact comparison diagnostic is

$$
\mathcal{R}_{\mathrm{cool}}
\equiv
\frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
\qquad
t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j},
$$

with an observer-level thermal-plasma estimate

$$
t_{\mathrm{cool}}
=
\frac{(n_e+n_H)k_B T_s}
{(\gamma_{\mathrm{gas}}-1)n_e n_H\Lambda(T_s)}.
$$

Here $v_j$ and $\ell_j$ are the effective jet speed and propagation scale, $T_s$ is the post-shock temperature, and $\Lambda(T_s)$ is the standard cooling function. These variables do not become substrate ontology. They define an observational closure target: when $\mathcal{R}_{\mathrm{cool}}\ll1$, shocked material should route a large fraction of $E_{\text{exc}}$ into thermal line, free-free, and medium-heating rows; when $\mathcal{R}_{\mathrm{cool}}\gg1$, the same shock geometry may remain adiabatic enough for non-thermal acceleration, synchrotron emission, inverse-Compton output, and cocoon/lobe energy storage to dominate. A radiation map that uses the same shock residual for both cases must therefore expose the branch decision rather than treating "shock" as a single radiative outcome.

The residual ledger should track at least four quantities:

| Ledger entry | Required meaning |
| --- | --- |
| $\delta\Theta_a$ | phase-closure mismatch of each nested shell swarm layer |
| $\Delta E_{\text{int}}$ | excess internal energy above the nearest stable rung |
| $\Delta \mathbf{p}_{\text{asm}}$ | change in assembly momentum during the drive |
| $\Delta \mathcal{J}_{\text{wake}}$ | angular-momentum and causal-wake ledger imbalance to be closed |

This is the point where the radiation page connects to the Master Equation: the residual must be computed from delayed causal-wake hits and branch Jacobians, rather than appended as a phenomenological "radiation reaction" term. The theorem target is a residual functional

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(\Gamma(t),\mathcal{C}_{o'j}(t),J_{o'j},\rho_{\text{NS}}(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t)\right),
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
=0,
$$

where $\Delta P^\mu_{\mathrm{near}}$ is the reversible near-field or acceleration-energy comparison row, $\Delta P^\mu_{\mathrm{wake}}$ is the causal-wake branch exchange computed from delayed path-history data, and $\Delta P^\mu_{\mathrm{mass/rem}}$ is the finite internal mass or remnant ledger that prevents electromagnetic self-energy from being mistaken for the whole mass story. A completed radiation-reaction derivation must show that the observer-level damping term is the irreversible part of this conservation residual after the reversible near-field row is separated, not an independently appended self-force.

Classical decompositions that compare outgoing and incoming field pieces can be used only as effective recovery tools. In the corpus notation their role is to test whether the same causal-wake history yields a finite $\mathcal{D}_{\mathrm{rad}}$ when the comparison tube around the source is shrunk. They do not license acausal substrate dynamics: any nonlocal-looking term must be re-expressed as branch accounting over the event window, with delayed path-history provenance and a named residual row for every unmatched energy-momentum component.

## Excitation Basins

If $\delta\Theta_a$ remains within the local basin, the core retunes without a resolved radiative event. If the mismatch crosses a separatrix, the Noether swarm enters an internally excited, closure-mismatched, or metastable state above its nearest stable rung. The excess energy is then a state-space gap:

$$
E_{\text{exc}}
=
E_C(\Gamma_{\text{post shock}})
-
E_C(\Gamma_{\text{nearest stable rung}}).
$$

An excitation basin is the set of post-drive states that share the same available relaxation routes. The simplest basin classification is:

| Basin | Condition | Radiation meaning |
| --- | --- | --- |
| Retuning basin | $\mathcal{R}_{\Theta}<\mathcal{R}_{\text{retune}}$ | no resolved event; the core returns to the same rung |
| Excited basin | $\mathcal{R}_{\text{retune}}\le\mathcal{R}_{\Theta}<\mathcal{R}_{\gamma}$ | excess energy exists, but stable photon output is not guaranteed |
| Planar-mode basin | $\mathcal{R}_{\Theta}\ge\mathcal{R}_{\gamma}$ with sufficient channel geometry | photon-channel nucleation is allowed |
| Dissociation or reaction basin | closure residual destabilizes assembly identity | energy routes into products, recoil, and medium excitation |

The thresholds in this table are names for proof targets, not asserted universal constants. A completed derivation must compute the relevant separatrices from the local return map of the driven assembly. The same external energy transfer can therefore be radiative in one geometry and non-radiative in another if the basin boundary is different.

## Planar-Mode Nucleation

Photon output is modeled as the lock-in of a coaxial contra-rotating pro/anti planar pair. In the language of [Mode Taxonomy](../interactions/mode-taxonomy.md), the photon branch is a planar-mode nucleation event: shed energy, wake stress, and Noether-Sea state jointly cross the stability boundary for a propagating photon assembly.

A minimal nucleation gate can be written as a two-condition target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{NS}},\chi_{\text{sea}},J_{\text{loc}})
\ge
\mathcal{S}_{\gamma,*},
\qquad
E_{\text{exc}}\ge E_{\gamma,\min}.
$$

Here $\mathcal{S}_{\gamma}$ is the local photon-channel drive, $\mathcal{S}_{\gamma,*}$ is the planar-mode stability boundary, and $E_{\gamma,\min}$ is the minimum stable planar-mode cost if such a floor survives the derivation. This form is only a scaffold. The burden is to derive $\mathcal{S}_{\gamma}$ from wake-strain geometry, causal-root branch data, and Noether-Sea coupling, then recover the validated limits used by bremsstrahlung, synchrotron emission, atomic transitions, Compton-like scattering, pair channels, and thermal radiation.

Once the planar mode nucleates, the event record must carry the photon Gate A and Gate B data without treating those gates as locally proven. Gate A supplies kinematics and optics: $E_\gamma$, $\mathbf{p}_{\gamma}$, direction, phase frequency, and local photon-channel speed $c_\gamma$. Gate B supplies transverse angular-momentum, polarization, helicity, and capture/rejection ledgers. This radiation overview uses those records as requirements; their proofs remain in the photon and angular-momentum workstreams.

## Non-Radiative Shedding

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
\Delta E_{\text{rxn}}.
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
0.
$$

The corresponding polarity, architrino-inventory, identity-routing, and path-history ledgers must also close. Non-radiative shedding is therefore not a discard bin. It is the required accounting for medium heating, turbulence, phonon/plasmon-like excitations, unresolved causal-wake stress, recoil, and residual internal excitation when no stable photon assembly leaves the event.

**Effective electromagnetic energy-momentum gate.** Standard electromagnetic energy and momentum bookkeeping supplies a useful recovery ledger for radiation, but only at the observer/channel level. The fields $\mathbf{E}_{\mathrm{eff}}$ and $\mathbf{B}_{\mathrm{eff}}$ in this subsection are effective comparison variables reconstructed from the channel map. They are not substrate objects added to the Euclidean void or to the Noether Sea.

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
\frac{1}{\mu_0}\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}},
$$

and

$$
\mathbf{g}_{\mathrm{EM}}
=
\frac{1}{c^2}\mathbf{S}_{\mathrm{EM}}
=
\epsilon_0\mathbf{E}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}.
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
\right).
$$

For a control volume $V$ with outward unit normal $\hat{\mathbf{n}}$, the effective energy residual is

$$
\Delta_E^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V u_{\mathrm{EM}}\,d^3x
+
\int_{\partial V}\mathbf{S}_{\mathrm{EM}}\cdot\hat{\mathbf{n}}\,dA
+
\int_V\mathbf{J}_{\mathrm{eff}}\cdot\mathbf{E}_{\mathrm{eff}}\,d^3x.
$$

The effective Lorentz-force density is

$$
f_{\mathrm{L}}^i
=
\rho_{\mathrm{eff}}E_{\mathrm{eff}}^i
+
\left(\mathbf{J}_{\mathrm{eff}}\times\mathbf{B}_{\mathrm{eff}}\right)^i,
$$

and the momentum residual is

$$
\Delta_{p,i}^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V g_{\mathrm{EM}}^i\,d^3x
+
\int_{\partial V}\sigma_{\mathrm{EM}}^{ij}\hat n_j\,dA
+
\int_V f_{\mathrm{L}}^i\,d^3x.
$$

The angular-momentum residual is the corresponding moment of the momentum ledger:

$$
\Delta_{\mathbf{J}}^{\mathrm{EM}}(V)
=
\frac{d}{dt}\int_V \mathbf{x}\times\mathbf{g}_{\mathrm{EM}}\,d^3x
+
\int_{\partial V}\mathbf{x}\times(\sigma_{\mathrm{EM}}\hat{\mathbf{n}})\,dA
+
\int_V\mathbf{x}\times\mathbf{f}_{\mathrm{L}}\,d^3x.
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
\right).
$$

The photon event closes this check only when $\Delta_{\gamma,\mathrm{flux}}=0$ in the declared standard-limit comparison, or when the residual is explicitly routed into material, recoil, remnant, or unresolved wake rows. This is the radiation energy-momentum closure check used by the channel pages.

## Radiation Event-Record Schema

Every resolved radiation, sub-threshold shedding, photon-capture, or radiation-coupled reaction record should use the same event schema. The record is required even when no photon leaves the event; in that case $E_\gamma=0$, the polarization handoff is marked not applicable, and the energy closes through recoil, medium excitation, residual internal energy, or reaction products.

| Required field | Required content | Closure role |
| --- | --- | --- |
| Source assembly | Identity and pre/post state of the driven assembly, photon assembly, or resolved local Noether-Sea excitation whose residual is being routed | Prevents treating radiation as free energy detached from an assembly or medium source |
| Source depletion row | $\Delta\mathcal Q_{\mathrm{src}}^{0}=\mathcal Q_{\mathrm{src}}^{-}-\mathcal Q_{\mathrm{src}}^{+}$ for $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, with the source branch and event window named | Keeps photon output tied to what the driven source lost rather than to an isolated outgoing quantum |
| Trigger geometry | Deceleration, curved transport, gradient crossing, photon overlap, capture geometry, or medium-relaxation geometry, including local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$ when they affect the channel | Identifies why this event entered a retuning, excitation, planar-mode, or reaction basin |
| $\delta\Theta_a$ | Phase-closure mismatch for each active layer $a\in\{I,M,O\}$, or an explicit reason the channel uses a reduced assembly ledger | Keeps the event tied to the closure-residual mechanism rather than to acceleration language alone |
| $E_{\text{exc}}$ | Excess internal or medium excitation energy above the nearest stable rung before routing | Supplies the left side of the shedding ledger |
| $E_\gamma$ | Photon energy for each emitted, absorbed, shifted, or captured photon assembly, with $E_\gamma=0$ for non-photon shedding | Carries the Gate A energy-frequency and momentum handoff without proving it locally |
| Recoil | $\Delta E_{\text{recoil}}$, $\Delta \mathbf{p}_{\text{recoil}}$, and the assembly or medium component receiving recoil | Closes local momentum and energy at the event vertex |
| Medium excitation | $\Delta E_{\text{med}}$, $\Delta \mathbf{p}_{\text{med}}$, excitation type, and returned or retained Noether-Sea content | Prevents unresolved medium heating or turbulence from becoming an implicit loss term |
| Polarization handoff | Gate B acceptance data when $E_\gamma\ne0$: transverse basis, analyzer or transport basis if present, helicity label, accepted/rejected capture channel, and transverse angular-momentum ledger | Records inherited photon Gate B requirements; it is not a local derivation of photon spin |
| Photon Gate B event residual | $\mathcal R_{\gamma B}^{\mathrm{event}}$ or the channel-local equivalent naming source, recoil, medium, wake, handoff, remnant, helicity, and balance rows when $E_\gamma\ne0$ | Prevents a clean transverse ledger from being promoted before the event ledger closes |
| Causal-wake ledger | Source identities, emission times, active causal-root branches, branch Jacobians, path-history provenance, and $\Delta \mathcal{J}_{\text{wake}}$ | Makes deterministic replay and angular-momentum balance depend on delayed wake history |
| Identity routing | Bijection or equivalent route for participating architrino identities after named Noether-Sea reservoir terms are included | Prevents photon output, causal wakes, or unresolved medium terms from being treated as sources of new substrate identities |
| Closure status | Baseline, provisional map, derivation target, failed map, or inherited gate, with any unresolved Gate A, Gate B, Gate C, reaction, or cosmology handoff named explicitly | Prevents a local channel record from being promoted to completed doctrine before its inherited gates close |

For photon-capture records, $E_\gamma$ names the incoming, outgoing, shifted, or captured photon ledger; it is not an identity source for different outgoing assemblies unless the channel is explicitly a reaction or pair-production record. In those cases, the same schema must add the recruited target or Noether-Sea inventory to the identity-routing field.

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
\mathcal Q\in\{E,\mathbf p,\mathbf J\}.
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
\mathbf J_{\mathrm{rem}}^{0}.
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
\lambda_{\mathrm{hel}}\in\{+1,-1\},
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
\Delta E_{\text{rxn}}.
$$

Channel pages may add specialized variables, but they should not remove these fields. The polarization handoff remains inherited from photon Gate B; radiation records carry the fields needed by that gate, while the photon-spin and polarization proof remains outside the local radiation event record.

## Scattering and Reaction-Ledger Grammar

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
\right).
$$

The five entries are theorem-target data, not a completed QFT scattering derivation:

| Grammar entry | Required content | Validation role |
| --- | --- | --- |
| $\mathfrak{L}_{\mathrm{in}}$ | incoming assembly, photon, medium, and Noether-Sea ledgers: identities, $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, architrino inventory, causal-root branches, and path-history provenance | fixes what enters the event before any channel assignment is made |
| $W_{\mathrm{int}}$ | finite interaction window $[t_i,t_f]$ with the resolved local geometry, branch Jacobians, transient assembly or resonance record, and recruited or returned Noether-Sea content | prevents replacing the local collision or channel window by an instantaneous black box |
| $\mathfrak{T}_{\mathrm{cons}}$ | conserved transfers through the window: energy, momentum, angular momentum, polarity, identity routing, recoil, medium excitation, and wake ledger exchange | states which balances must close together at the same event, including hidden recoil and medium rows |
| $\mathfrak{L}_{\mathrm{out}}$ | outgoing stable or metastable ledgers: photons, shifted photons, scattered assemblies, reaction products, residual bound states, heat channel, recoil carrier, and remaining Noether-Sea record | records products without treating observer-level particle-creation language as creation from nothing |
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
\right),
$$

with every component required to vanish, or to be assigned to a named residual row, before the channel can be used as a completed scattering or reaction ledger. Here $\Delta\mathcal{N}_{\mathrm{id}}$ is the identity-routing residual after explicit Noether-Sea reservoir terms are included, and $\Delta_{\mathrm{bench}}$ is the observer-level benchmark residual for the declared regime. At validated relativistic collision limits, this grammar must reproduce the standard incoming/outgoing state accounting, thresholds, and conservation laws. It does not by itself derive amplitudes, cross sections, or particle-creation rates.

## Photon-Material Surface Routing

A material surface interaction is the near-field Gate C version of the same event schema. It should not be pictured as a small projectile striking a hard wall. At atomic resolution the incoming photon is a coaxial contra-rotating pro/anti planar pair with Gate A and Gate B ledgers, while the material supplies an electron-envelope branch, a nuclear source envelope, a bonding or lattice branch, and a local Noether-Sea response record. The local event state can be written as

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
\right),
$$

where $\gamma_{\mathrm{in}}$ carries $E_{\gamma,\mathrm{in}}$, $\mathbf{p}_{\gamma,\mathrm{in}}$, direction, phase frequency, local $c_\gamma$, and transverse ledger data; $\mathcal B_e$ is the realized electron-envelope branch; $\mathcal A_{\mathrm{nuc}}^{Z,N}$ is the nuclear assembly ledger; $\mathcal B_{\mathrm{lat}}$ is the realized material bonding or lattice branch; $\Theta_E^{(\ell)}$ is the coarse Noether-Sea response record in the surface cell; and $\mathcal H_{\gamma\to\Omega}$ is the causal-wake and path-history ledger for the incoming packet and local material window.

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
\}.
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
\Delta E_{\mathrm{rem}},
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
\Delta \mathbf{p}_{\mathrm{recoil}},
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
\Delta \mathcal J_{\mathrm{wake}}.
$$

Here $E_{\gamma,\mathrm{out}}=0$ when no free photon leaves the cell. In that case the photon branch has been captured or dephased as a free planar-pair mode, but the event has not lost energy; the electron-envelope, lattice, Noether-Sea, recoil, remnant, and wake rows carry the balance. For ordinary optical or infrared surface events, the nuclear inventory remains fixed: $\Delta Z=0$ and $\Delta A=0$ unless a separate nuclear-reaction gate is explicitly supplied.

| Route | Material meaning | Required closure target |
| --- | --- | --- |
| $B_{\mathrm{refl}}$ | coherent re-release of an outgoing planar-pair branch, typically supported by a collective surface-electron response in a metal-like branch | recover phase, angle, polarization, and skin-depth behavior without treating reflection as a hard bounce |
| $B_{\mathrm{cap}}$ | capture of the incoming planar-pair ledger into electron-envelope excitation or a higher material basin | close energy, momentum, transverse angular momentum, and remnant rows when $E_{\gamma,\mathrm{out}}=0$ |
| $B_{\mathrm{scat}}$ | outgoing photon branch survives with changed direction, phase, frequency, or polarization record | close shifted photon provenance together with recoil and material update |
| $B_{\mathrm{heat}}$ | captured action thermalizes through electron, lattice, and Noether-Sea updates | derive the route from material return dynamics rather than inserting untracked heat |
| $B_{\mathrm{recoil}}$ | lattice, nuclear source envelope, or medium component receives momentum balance | keep recoil even when its energy is small |
| $B_{\mathrm{rem}}$ | retained bound excitation or dephased surface state remains after the event window | record the remnant state instead of hiding it in attenuation |

A Vantablack-like absorber is then not a special photon ontology. It is a material branch with high geometric and electronic capture depth: many surface cells route the incoming planar-pair ledger into $B_{\mathrm{cap}}$, $B_{\mathrm{heat}}$, $B_{\mathrm{recoil}}$, and $B_{\mathrm{rem}}$ before a coherent $B_{\mathrm{refl}}$ escape channel can survive. A metal surface is the opposite limiting case: the conduction-electron branch supports a coherent surface-current response, so a large part of the incoming ledger reappears as $E_{\gamma,\mathrm{out}}$ with an organized phase relation, while absorption loss remains in the electron-envelope, lattice, Noether-Sea, and recoil rows.

The worked surface case is still a derivation target. It fails if reflection is modeled as a hard geometric bounce with no electron-envelope response, if absorption becomes annihilation or untracked heat, if the same material requires separate Noether-Sea variables for reflection and absorption, if a hidden longitudinal free-photon channel is used, or if ordinary optical events change nuclear inventory without a separate reaction provenance ledger.

**Causal material response and skin-depth ledger.** Photon-material routing needs a constitutive response target in addition to the event ledger. In the effective material description, a local response kernel $\mathcal X_\Omega$ maps the applied channel field to the coarse material polarization,

$$
\mathbf{P}_\Omega(t,\mathbf{x})
=
\int_{-\infty}^{+\infty}
\mathcal X_\Omega(t-t';\mathbf{x})\,
\mathbf{E}_{\Omega}(t',\mathbf{x})\,dt',
$$

with causality requiring

$$
\mathcal X_\Omega(\Delta t;\mathbf{x})=0
\qquad
\text{for}\quad
\Delta t<0.
$$

Therefore the frequency-domain response $\mathcal X_\Omega(\omega;\mathbf{x})$ must be analytic for $\operatorname{Im}\omega>0$ in the validated linear-response regime. The Noether-Sea dressing map for material response must recover the Kramers-Kronig residuals

$$
\Delta_{\mathrm{KK}}^{\operatorname{Re}}(\omega)
=
\operatorname{Re}\mathcal X_\Omega(\omega)
-
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Im}\mathcal X_\Omega(\omega')}{\omega'-\omega},
$$

$$
\Delta_{\mathrm{KK}}^{\operatorname{Im}}(\omega)
=
\operatorname{Im}\mathcal X_\Omega(\omega)
+
\mathcal P\int_{-\infty}^{+\infty}
\frac{d\omega'}{\pi}
\frac{\operatorname{Re}\mathcal X_\Omega(\omega')}{\omega'-\omega},
$$

and pass only when both residuals vanish, up to declared coarse-graining error. This is a causality test for Noether-Sea dressing, not a claim that the effective response kernel is the substrate ontology.

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
k(\omega)=k_1(\omega)+ik_2(\omega).
$$

The attenuation and phase rows are

$$
\delta_{\mathrm{skin}}(\omega)=\frac{1}{k_2(\omega)},
\qquad
\phi_{EB}(\omega)=\tan^{-1}\!\left(\frac{k_2(\omega)}{k_1(\omega)}\right).
$$

In the low-frequency Drude conductor limit,

$$
\sigma_\Omega(\omega)
=
\frac{\sigma_{\mathrm{DC}}}{1-i\omega\tau},
\qquad
\delta_{\mathrm{skin}}(\omega)
\rightarrow
\left(\frac{2}{\mu_\Omega\omega\sigma_{\mathrm{DC}}}\right)^{1/2}.
$$

In the high-frequency plasma limit, with carrier density $n_{\mathrm{car}}$,

$$
\omega_p^2
=
\frac{n_{\mathrm{car}}q^2}{m\epsilon_0},
\qquad
\epsilon_{\mathrm{eff}}(\omega)
\rightarrow
\epsilon_0\left(1-\frac{\omega_p^2}{\omega^2}\right).
$$

The transparent branch must recover

$$
\omega^2=\omega_p^2+c^2k^2
\qquad
(\omega>\omega_p),
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
\right),
$$

with scalar routing condition

$$
R_b+T_b+A_b+Q_b^{\mathrm{rem}}=1.
$$

Here $R_b$ is coherent reflected flux, $T_b$ is transmitted flux, $A_b$ is thermalized or dephased absorption, and $Q_b^{\mathrm{rem}}$ is retained bound excitation. In transparent interface limits the same ledger must recover Snell and Brewster behavior,

$$
n_1\sin\theta_I=n_2\sin\theta_T,
\qquad
\tan\theta_B=\frac{n_2}{n_1},
$$

with the polarization branch $b$ selecting the relevant Fresnel amplitude. In absorbing or conducting limits, the ledger must recover attenuation through $k_2$ and $\delta_{\mathrm{skin}}$ while keeping energy, momentum, and transverse angular momentum assigned to the same event record.

## Ensemble Temperature

The term "hot" should be used with care. A single excited Noether swarm is not hot in the full thermodynamic or blackbody sense. It is better described as internally excited, closure-mismatched, or metastable above a local stable rung. Temperature is an ensemble-level effective variable: many assemblies must exchange energy, emit, absorb, scatter, and thermalize so that a stable distribution can be assigned.

At the ensemble level, the relevant object is not one value of $E_{\text{exc}}$ but a distribution over assembly states and photon modes. A disciplined temperature definition should come from an entropy-energy relation for the ensemble,

$$
\frac{1}{k_B T_{\text{ens}}}
=
\left(\frac{\partial S_{\text{ens}}}{\partial E_{\text{ens}}}\right)_{\mathcal{N},\mathcal{V}},
$$

or from an equivalent kinetic distribution that has already been shown to thermalize under the local interaction rules. The symbols $\mathcal{N}$ and $\mathcal{V}$ denote the conserved inventory and effective volume variables held fixed in the chosen coarse-graining; they are bookkeeping variables, not new ontology.

For radiation channels, local thermodynamic equilibrium is a timescale claim. Reusing the diagnostic from bremsstrahlung,

$$
\mathcal{R}_{\mathrm{LTE}}
\equiv
\frac{\tau_{\mathrm{couple}}}{\tau_{\mathrm{cool}}}.
$$

When $\mathcal{R}_{\mathrm{LTE}}\ll 1$, assembly-medium coupling is fast enough that local emissivity may be computed from instantaneous ensemble variables. When $\mathcal{R}_{\mathrm{LTE}}\gtrsim 1$, the channel remains non-equilibrium, and a single local temperature is not a sufficient state description.

## Blackbody Limit

Blackbody behavior is a stronger claim than radiation. It requires repeated emission, absorption, scattering, and mode exchange until the photon bath approaches detailed balance with the material or Noether-Sea ensemble. In the weak homogeneous validated limit, the closure target is the usual Planck occupation form,

$$
\bar n_\gamma(\nu)
=
\frac{1}{\exp(h\nu/(k_B T))-1},
$$

with effective photon chemical potential driven to zero in the fully thermalized photon bath. This is an observer-level recovery target. The foundation-up task is to show how planar-mode nucleation, planar-mode capture, Compton-like redistribution, pair channels, and non-radiative medium exchange jointly produce the same limit.

The minimum detailed-balance condition is schematic but useful:

$$
\Gamma_{i\to j+\gamma}\,f_i\,(1+\bar n_\gamma)
=
\Gamma_{j+\gamma\to i}\,f_j\,\bar n_\gamma.
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
\Gamma_{j+\gamma\to i}\,g_j.
$$

Those two conditions make the detailed-balance equation imply

$$
\frac{\bar n_\gamma}{1+\bar n_\gamma}
=
\exp\!\left(-\frac{h\nu}{k_B T_{\text{ens}}}\right),
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
\right](\nu,t)\,dt,
$$

where the terms respectively summarize planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange after those channels have been tied to event records. The condition $\mathcal{D}_{\mathrm{th}}\gg1$ is necessary for a source population to approach a blackbody photon bath, but it is not sufficient unless the same provenance record also closes Gate A kinematics, Gate B transverse handoff, Gate C transition rates, and the Noether-Sea state map used for redshift and damping.

For cosmology-facing use, the blackbody limit also requires thermalization depth, damping, anisotropy, polarization, and redshift handoff to remain consistent with the same provenance record. The CMB claim is therefore not "many photons exist." The claim to prove is that source channels plus Noether-Sea transport can generate and preserve a near-blackbody photon bath within observational limits.

## Channel Routing

Channel routing is the event-level decision tree that sends the closure residual into allowed outputs. It should be recorded before a channel is used in a larger reaction or cosmology argument.

| Channel family | Trigger geometry | Primary output | Required closure target |
| --- | --- | --- | --- |
| Bremsstrahlung | charged-assembly deceleration near a target assembly | planar-mode photon, recoil, medium excitation | recover $d\sigma/dk$, screening, form-factor, and free-free emissivity limits |
| Synchrotron | curved charged-assembly transport in an anisotropic Noether-Sea state | repeated planar-mode photon output | recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, cooling breaks, and polarization limits |
| [Atomic transition](atomic-transition-radiation.md) | electron-assembly envelope moves between effective resonance basins | line photon plus recoil and residual atomic state | recover spectral line frequencies after local clock/rate conversion |
| Pair association and neutral relock radiation | photon overlap, charged pair association, or charged pair relock | photons, $e^+e^-$ assemblies, recoil, and recruited or returned Noether swarm content | recover threshold, cross-section, and inventory plus identity-routing conservation in validated regimes |
| Thermal free-free | ensemble of screened charged encounters | continuum photon bath plus medium heating | recover LTE emissivity when $\mathcal{R}_{\mathrm{LTE}}\ll 1$ and non-equilibrium corrections otherwise |
| Compton-like scattering | photon assembly captured and re-released by a charged assembly | shifted photon, recoil, and possible heat channel | recover energy-momentum transfer and standard scattering limits |
| Medium relaxation | Noether-Sea or material excitation relaxes without a resolved source-particle event | photon output if planar-mode gate opens; otherwise medium heat or turbulence | keep source, transport, and thermalization provenance explicit |

Every row in this table has the same routing skeleton:

$$
\text{closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual internal energy, or reaction products}.
$$

The channel pages specialize the skeleton. This overview supplies the shared rule: no radiation claim is complete until the event record identifies the source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, closure status, and observer-level recovery limit.

The routing skeleton is a theorem-target contract, not a completed event-routing theorem. Radiation-coupled reaction and pair channels remain open worked sector cases until they satisfy the event-ledger contract in [Reaction Ledger](../validation/reaction-ledger.md#residual-routing-event-ledger-contract): a replayable residual, a stated channel boundary, a selected output assignment, a closed $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, benchmark recovery, and explicit failure modes.

## Radiation Closure-Target Ledger

The routing skeleton above becomes useful only if each benchmark is carried as a classified closure item. In this ledger, `ontology` names what the theory treats as real at the substrate or assembly level; `derivation target` names a result that must be recovered from dynamics, symmetry, simulation, or constitutive closure; `effective summary` names an observer-level formula retained as a recovery target; and `speculation` names a possible extension that cannot be used to repair a failed benchmark.

| Target | Class | Concrete closure requirement | Validation check | Failure condition |
| --- | --- | --- | --- | --- |
| Radiative event ontology | ontology | A radiative event is a routed closure residual. Photon output is a planar-mode nucleation event whose photon branch is the coaxial contra-rotating pro/anti planar pair; medium excitation, recoil, residual internal energy, and reaction products remain explicit non-photon channels. | Every channel event record identifies the source assembly, trigger geometry, local Noether-Sea state, $\mathcal{R}_{\Theta}$, $E_{\text{exc}}$, photon or non-photon outputs, and conservation ledgers. | If radiation is treated as primitive acceleration-field output or as untracked energy loss, the ontology has been bypassed. |
| Scattering/reaction event grammar | derivation target | Express every scattering, relativistic collision, pair-channel, and radiation-coupled reaction as $\mathcal{E}_{\mathrm{scat/rxn}}=(\mathfrak{L}_{\mathrm{in}},W_{\mathrm{int}},\mathfrak{T}_{\mathrm{cons}},\mathfrak{L}_{\mathrm{out}},\mathfrak{R}_{\mathrm{res}})$, with incoming ledgers, a finite interaction window, conserved transfers, outgoing ledgers, and residual checks all present. | A completed channel must drive $\mathfrak{R}_{\mathrm{res}}$ to zero within tolerance or assign every nonzero term to a named remnant, medium, recoil, wake, or benchmark-failure row. | If products are listed without incoming provenance, if the interaction window is hidden, if observer-level creation language bypasses identity routing, or if standard scattering limits are asserted without residual checks, the event grammar has failed. |
| Larmor/Lienard recovery | derivation target | Coarse-grain repeated planar-mode nucleation from smooth weak-field charged-assembly acceleration so that the nonrelativistic power scales as $P\propto\lVert\mathbf{a}\rVert^2$ and the relativistic observer-level limit recovers the Larmor/Lienard class after clock and rate conversion. | Sweep smooth acceleration histories at fixed weak homogeneous Noether-Sea state and recover the standard power and angular limits before claiming channel-specific deviations. | If the low-speed limit is not quadratic in acceleration, or if the relativistic limit requires a separately fitted radiation threshold, the radiation map is not closed. |
| Bremsstrahlung emissivity | derivation target | Integrate the charged-assembly deceleration event record over impact parameters, screening, target geometry, and ensemble distributions to recover free-free emissivity, including $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$ and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T^{1/2}$ in the LTE limit. | In regimes with $\mathcal{R}_{\mathrm{LTE}}\ll 1$, recover $d\sigma/dk$, screening, form-factor, and emissivity limits from the same channel record used by [Bremsstrahlung](bremsstrahlung.md). | If cross-section and emissivity closure require different Noether-Sea state variables or hidden per-plasma fits, the channel fails as a derivation. |
| Shock cooling branch selection | derivation target | For jet heads, knots, dense gas impacts, and other supersonic working surfaces, route the same closure residual according to $\mathcal{R}_{\mathrm{cool}}=t_{\mathrm{cool}}/t_{\mathrm{dyn}}$: fast-cooling shocks feed thermal line, free-free, and heat rows; adiabatic shocks feed particle-acceleration, synchrotron, inverse-Compton, cocoon, or lobe rows. | Compare synthetic source records against thermal-line YSO shocks and non-thermal AGN/microquasar shocks using the same source, recoil, medium, and photon ledgers. | If the model predicts the correct morphology but cannot decide whether the shock emits thermally, non-thermally, or mostly stores energy in the Noether Sea, the radiation branch has not closed. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Map anisotropic Noether-Sea state to effective magnetic transport and recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling-break behavior from curved charged-assembly routing. | Sweep $\gamma$, $B$, and pitch geometry while holding the same $B\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ mapping; recover the standard scaling before using synchrotron cascades in source or cosmology arguments. | If the factor-of-$\gamma^2$ frequency scaling is absent, or if the $B$ map must be redefined between trajectory curvature and emission, the synchrotron branch fails. |
| Pair thresholds and pair-channel provenance | derivation target | Recover the standard pair thresholds while preserving architrino inventory: for photon-photon pair production, the Gate C target includes $s\ge 4m_e^2c^4$ and $E_1E_2(1-\cos\theta_{12})\ge 2(m_ec^2)^2$ in the validated limit. | The event record must identify incoming photon assemblies, recruited or returned Noether swarm content, outgoing $e^+e^-$ assemblies, recoil or medium terms, and the standard threshold/cross-section limit. | If pair production is described as creation from nothing, violates inventory conservation, or shifts the threshold without a controlled new-physics claim, the pair channel is not closed. |
| Compton-like scattering | derivation target | Treat photon capture and re-release by a charged assembly as a Gate C vertex and recover the observer-level Compton shift $\lambda'-\lambda=(h/(m_ec))(1-\cos\theta)$, the Thomson low-energy limit, and the Klein-Nishina high-energy correction. | The same vertex record must close incoming photon data, charged-assembly recoil, shifted outgoing photon data, heat or residual excitation, and energy-momentum transfer. | If scattering is modeled only as phenomenological frequency loss, or if recoil and shifted photon provenance cannot close together, the Compton-like branch fails. |
| Effective EM Gate residual | derivation target | Any use of Maxwell-level variables must satisfy $\mathcal{G}_{\mathrm{EM}}=(\Delta_{\mathrm{cont}},\Delta_E^{\mathrm{EM}},\Delta_{\mathbf{p}}^{\mathrm{EM}},\Delta_{\mathbf{J}}^{\mathrm{EM}},\Delta_{\mathrm{gauge}})$ in the declared standard-limit regime, with nonzero residuals routed into named event rows. | Evaluate the effective continuity, Poynting-flux, Maxwell-stress, angular-momentum, and gauge-invariance residuals on the same event record used for photon or material routing. | If the channel recovers a spectrum while hiding charge continuity, stress recoil, gauge dependence, or energy-momentum mismatch in the effective field layer, the EM comparison gate has failed. |
| Causal response-function analyticity | derivation target | Material and Noether-Sea dressing response kernels must obey $\mathcal X_\Omega(\Delta t)=0$ for $\Delta t<0$, analyticity for $\operatorname{Im}\omega>0$, and $\Delta_{\mathrm{KK}}^{\operatorname{Re}}=\Delta_{\mathrm{KK}}^{\operatorname{Im}}=0$ in the linear-response regime. | Check that absorption and dispersion are paired by the same response kernel rather than fitted independently, and that response poles remain outside the upper-half $\omega$ plane. | If a material map tunes attenuation without the corresponding dispersion, or uses an acausal response kernel, the surface or medium-routing derivation is invalid. |
| Material absorption/reflection/skin-depth ledger | derivation target | Surface events must use one ledger $\mathcal M_{\mathrm{surf}}(\omega,\theta,b)$ for reflection, transmission, absorption, remnant excitation, skin depth, complex wavenumber, response analyticity, and EM energy-momentum residuals. | Recover Fresnel/Snell/Brewster behavior in transparent limits, $\delta_{\mathrm{skin}}\rightarrow(2/(\mu\omega\sigma_{\mathrm{DC}}))^{1/2}$ in low-frequency Drude conductors, and plasma cutoff behavior near $\omega_p$. | If reflection is a hard bounce, absorption is untracked heat, skin depth is detached from conductivity, or longitudinal plasma oscillation is treated as a free photon mode, the material route fails. |
| Blackbody recovery | derivation target | Show that repeated emission, absorption, Compton-like redistribution, pair channels, and non-radiative exchange reach detailed balance with Planck occupation $\bar n_\gamma(\nu)=1/(\exp(h\nu/(k_B T))-1)$ and effective photon chemical potential driven to zero. | Recover the Planck spectrum, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff using one provenance record and one Noether-Sea state map. | If blackbody recovery needs per-observable retuning, unbalanced photon loading, or a different transport map from the source channels, the thermal branch fails. |
| Free photon polarization boundary | derivation target | Radiation pages may record polarization basis, transverse angular-momentum ledger, and observer-level polarization recoveries as downstream requirements, but free photon polarization, helicity, Malus' law, and analyzer statistics are Gate B results. | Every radiation, scattering, pair, or cosmology use of photon polarization must point back to the Gate B handoff instead of deriving new free-photon polarization rules locally. | If a channel page invents its own free photon polarization derivation, adds a longitudinal free mode, or treats Gate B as already proven inside radiation, the closure boundary is violated. |
| Noether-Sea-dependent radiation deviations | speculation | Deviations tied to $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, threshold floors, or source-history transport are candidate predictions only after the validated limits above are recovered. | A proposed deviation must state the benchmark-preserving limit, the residual term, and the measurable regime before being used in a source model. | If a deviation is used to rescue a failed standard recovery or is fitted independently per observable, it is not accepted as radiation closure. |

## Closure Targets

The first proof burden is to derive the separatrix condition and planar-mode threshold from the Master Equation and the Noether swarm ledger. The second burden is to show that the same routing record recovers known radiation channels in validated limits. The third burden is to show that ensemble thermalization can reach the blackbody limit without changing ontology or re-fitting Noether-Sea state variables for each observable.

In compact form, the radiation program is:

$$
\text{rapid transport or gradient change}
\longrightarrow
\text{Noether swarm closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{photon output, medium excitation, recoil, residual internal energy, or reaction products}
\longrightarrow
\text{observer-level spectrum or thermal bath}.
$$

This is a radiative closure program, not yet a completed derivation of blackbody radiation. It keeps strong source insights in play while preserving the distinction between ontology, derivation targets, effective summaries, and speculative extensions.
