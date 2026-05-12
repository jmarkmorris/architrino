# Radiation

Radiation is the $\mathbb{A}\mathbb{A}\mathbb{A}$ workstream for energy shedding by assemblies. A radiative event is not defined merely by acceleration or by the presence of excess energy. It is the routed relaxation of a driven assembly or local Noether-Sea state into one or more allowed channels: photon output, medium excitation, recoil, residual internal energy, or reaction products. Photon output is described through planar-mode nucleation, while non-radiative channels remain explicit when the available energy does not lock into a stable photon assembly.

The detailed channel pages remain [Bremsstrahlung](bremsstrahlung.md) and [Synchrotron Cascades](synchrotron.md). Photon assembly ontology belongs in [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md), while channel vocabulary follows [Mode Taxonomy](../interactions/mode-taxonomy.md). Event-level conservation uses [Reaction Ledger](../validation/reaction-ledger.md), and cosmology-facing radiation provenance is tracked in [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

This page is a foundation-up overview. It states the shared mechanism and the closure targets that individual channel pages must specialize. It does not by itself prove blackbody radiation, photon spin, atomic spectra, or QED cross sections.

## Foundation-Up Mechanism

The foundation-up radiation question is whether rapid transport changes can leave a Noether core internally mismatched relative to its nearest stable closure class. A moving Noether core has a velocity-deformed causal envelope, while a gravitational gradient skews its delay loops and phase closure. If a reaction suddenly decelerates the assembly, if curved transport changes too quickly, or if the assembly crosses a sharp Noether-Sea gradient, the external transport state can change faster than the inner, middle, and outer binary ledgers can adiabatically retune.

The resulting residual is first a closure mismatch, not yet a photon. For layer $a\in\{I,M,O\}$,

$$
\delta\Theta_a
=
\Theta_a(T;\mathbf{V}_{\text{before}},G_{\text{grad}})
-
\Theta_a(T;\mathbf{V}_{\text{after}},G_{\text{grad}}).
$$

Here $\Theta_a$ denotes the layer's phase-closure ledger over the comparison interval $T$, $\mathbf{V}$ denotes the transport state being retuned, and $G_{\text{grad}}$ denotes the local gradient data that modifies the delay loops. The notation $\{I,M,O\}$ refers to the same inner, middle, and outer tri-binary roles that ordered-axis chapters often write as $(H,M,L)$.

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

The residual ledger should track at least four quantities:

| Ledger entry | Required meaning |
| --- | --- |
| $\delta\Theta_a$ | phase-closure mismatch of each tri-binary layer |
| $\Delta E_{\text{int}}$ | excess internal energy above the nearest stable rung |
| $\Delta \mathbf{p}_{\text{asm}}$ | change in assembly momentum during the drive |
| $\Delta \mathcal{J}_{\text{wake}}$ | angular-momentum and causal-wake ledger imbalance to be closed |

This is the point where the radiation page connects to the Master Equation: the residual must be computed from delayed causal-wake hits and branch Jacobians, rather than appended as a phenomenological "radiation reaction" term. The theorem target is a residual functional

$$
\mathcal{R}_{\Theta}
=
\mathcal{R}_{\Theta}\!\left(\Gamma(t),\mathcal{C}_{o'j}(t),J_{o'j},\rho_{\text{core}}(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t)\right),
$$

where $\Gamma(t)$ is the assembly microstate and the other inputs are the causal-root, Jacobian, density, and delay data already used elsewhere in the corpus.

## Excitation Basins

If $\delta\Theta_a$ remains within the local basin, the core retunes without a resolved radiative event. If the mismatch crosses a separatrix, the Noether core enters an internally excited, closure-mismatched, or metastable state above its nearest stable rung. The excess energy is then a state-space gap:

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

Photon output is modeled as the lock-in of a coaxial contra-rotating pro/anti planar pair. In the language of [Mode Taxonomy](../interactions/mode-taxonomy.md), the photon branch is a planar-mode nucleation event: shed energy, wake stress, and medium state jointly cross the stability boundary for a propagating photon assembly.

A minimal nucleation gate can be written as a two-condition target:

$$
\mathcal{S}_{\gamma}(\Gamma,\rho_{\text{core}},\chi_{\text{sea}},J_{\text{loc}})
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
\Delta E_{\text{core remnant}}
+
\Delta E_{\text{rxn}}.
$$

The pure radiative limit has $\Delta E_{\text{rxn}}=0$. A sub-threshold transport event has $E_\gamma=0$ and routes energy into $\Delta E_{\text{med}}$, $\Delta E_{\text{recoil}}$, or $\Delta E_{\text{core remnant}}$. A reaction event has nonzero $\Delta E_{\text{rxn}}$ and must use the full reaction provenance ledger.

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

The corresponding polarity, architrino-inventory, and path-history ledgers must also close. Non-radiative shedding is therefore not a discard bin. It is the required accounting for medium heating, turbulence, phonon/plasmon-like excitations, unresolved causal-wake stress, recoil, and residual internal excitation when no stable photon assembly leaves the event.

## Ensemble Temperature

The term "hot" should be used with care. A single excited Noether core is not hot in the full thermodynamic or blackbody sense. It is better described as internally excited, closure-mismatched, or metastable above a local stable rung. Temperature is an ensemble-level effective variable: many assemblies must exchange energy, emit, absorb, scatter, and thermalize so that a stable distribution can be assigned.

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

For cosmology-facing use, the blackbody limit also requires thermalization depth, damping, anisotropy, polarization, and redshift handoff to remain consistent with the same provenance record. The CMB claim is therefore not "many photons exist." The claim to prove is that source channels plus Noether-Sea transport can generate and preserve a near-blackbody photon bath within observational limits.

## Channel Routing

Channel routing is the event-level decision tree that sends the closure residual into allowed outputs. It should be recorded before a channel is used in a larger reaction or cosmology argument.

| Channel family | Trigger geometry | Primary output | Required closure target |
| --- | --- | --- | --- |
| Bremsstrahlung | charged-assembly deceleration near a target assembly | planar-mode photon, recoil, medium excitation | recover $d\sigma/dk$, screening, form-factor, and free-free emissivity limits |
| Synchrotron | curved charged-assembly transport in an anisotropic Noether-Sea state | repeated planar-mode photon output | recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, cooling breaks, and polarization limits |
| Atomic transition | electron-assembly envelope moves between effective resonance basins | line photon plus recoil and residual atomic state | recover spectral line frequencies after local clock/rate conversion |
| Pair and annihilation radiation | photon overlap, charged pair association, or charged pair relock | photons, $e^+e^-$ assemblies, recoil, and recruited or returned Noether-core content | recover threshold, cross-section, and inventory conservation in validated regimes |
| Thermal free-free | ensemble of screened charged encounters | continuum photon bath plus medium heating | recover LTE emissivity when $\mathcal{R}_{\mathrm{LTE}}\ll 1$ and non-equilibrium corrections otherwise |
| Compton-like scattering | photon assembly captured and re-released by a charged assembly | shifted photon, recoil, and possible heat channel | recover energy-momentum transfer and standard scattering limits |
| Medium relaxation | Noether-Sea or material excitation relaxes without a resolved source-particle event | photon output if planar-mode gate opens; otherwise medium heat or turbulence | keep source, transport, and thermalization provenance explicit |

Every row in this table has the same routing skeleton:

$$
\text{closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{planar-mode photon, medium excitation, recoil, residual core energy, or reaction products}.
$$

The channel pages specialize the skeleton. This overview supplies the shared rule: no radiation claim is complete until the event record identifies the source assembly, trigger geometry, local Noether-Sea state, photon or non-photon output, recoil, conservation ledgers, and observer-level recovery limit.

## Closure Targets

The first proof burden is to derive the separatrix condition and planar-mode threshold from the Master Equation and the Noether-core ledger. The second burden is to show that the same routing record recovers known radiation channels in validated limits. The third burden is to show that ensemble thermalization can reach the blackbody limit without changing ontology or re-fitting Noether-Sea state variables for each observable.

In compact form, the radiation program is:

$$
\text{rapid transport or gradient change}
\longrightarrow
\text{Noether-core closure residual}
\longrightarrow
\text{excitation basin}
\longrightarrow
\text{photon output, medium excitation, recoil, residual core energy, or reaction products}
\longrightarrow
\text{observer-level spectrum or thermal bath}.
$$

This is a radiative closure program, not yet a completed derivation of blackbody radiation. It keeps strong source insights in play while preserving the distinction between ontology, derivation targets, effective summaries, and speculative extensions.
