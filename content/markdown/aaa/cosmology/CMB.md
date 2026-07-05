# CMB in $\mathbb{A}\mathbb{A}\mathbb{A}$ Cosmology

This document combines the CMB origin timeline and prediction layer in one place, with parallel interpretation language for standard $\Lambda\mathrm{CDM}$ and $\mathbb{A}\mathbb{A}\mathbb{A}$. It sits on top of [Cosmology Ontology](./cosmology-ontology.md) and shares interfaces with [Expansion Mechanism](./expansion-mechanism.md), [BBN Constraints](./BBN-constraints.md), and [Dark Matter](./dark-matter.md).

## Core Idea

The CMB timeline is presented as an effective observer-level chronology map that is interpreted through one fixed-void, evolving-Noether sea ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$.

## Framing Guardrails

- The Euclidean void is fixed; cosmological language describes Noether sea evolution within that fixed container.
- Redshift language is consistent with Noether sea evolution plus clock-rate comparison across environments.
- Background and growth claims are kept in one shared Noether sea and assembly ontology.
- Epoch times below are an effective observer-level chronology map, not a claim of one literal global launch event in absolute-time ontology.
- The CMB rest-frame correction is an observational procedure, not an ontological axiom. It must be checked against matter catalogues, supernova residuals, and BAO directionality before it is allowed to fix the whole cosmology stack.

## Chronology Mapping Note

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses an effective chronology map that is conceptually adjacent to cyclical/recycling cosmology families, but its mechanism is explicitly SMBH-local source architecture in a fixed-void ontology.

## CMB Dipole and Matter-Dipole Gate

The CMB dipole remains a central calibration object because the standard interpretation treats it mainly as a kinematic signal from local motion. If that interpretation is complete, then distant source catalogues should show the corresponding aberration and Doppler dipole after allowing for each catalogue's number-count slope and spectral response. For a catalogue $X$, use the residual

$$
\Delta_{\mathrm{dip}}^{X}
=
\mathbf{D}_{X}
-
K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
$$

where $\mathbf{D}_{X}$ is the measured source-count dipole, $\mathbf{D}_{\mathrm{CMB}}$ is the CMB dipole vector, and $K_X(\alpha_X,x_X)$ is the catalogue-dependent kinematic amplification factor built from spectral index $\alpha_X$ and number-count slope $x_X$.

In the standard homogeneous and isotropic limit, $\Delta_{\mathrm{dip}}^{X}$ should be consistent with survey masks, source evolution, and statistical noise. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology map, a persistent residual is not immediately promoted to a new ontology. It becomes a validation target:

$$
\mathbf{D}_{X}
=
\mathbf{D}_{\mathrm{kin}}
+
\mathbf{D}_{\mathrm{sea}}
+
\mathbf{D}_{\mathrm{mask/source}}
$$

where $\mathbf{D}_{\mathrm{kin}}$ is ordinary observer motion, $\mathbf{D}_{\mathrm{sea}}$ is the contribution from Noether sea flow, density, delay, and clock-rate gradients, and $\mathbf{D}_{\mathrm{mask/source}}$ records survey selection and source-population effects. Closure requires the same Noether sea term to remain compatible with CMB anisotropy, quasar and radio-source dipoles, supernova directionality, BAO measurements, and local $H$ scatter.

This gate does not replace the TT/TE/EE or blackbody requirements. It adds a frame-consistency test: the effective CMB frame used for background inference must be the same frame, or a derived projection of the same Noether sea state, used by the matter and distance-ladder modules.

The concrete packet shape for this subgate is defined in [Cosmology Shared Residual Fit Protocol](../validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe).

## Localized CMB Feature Validation

Claims about localized CMB features, including claims sometimes interpreted as pre-Big-Bang or cyclic-history signals, must first be handled as cross-instrument data products. The retained observable is not the external interpretation. It is the question of whether a common localized residual survives masking, foreground modeling, beam handling, and comparison between independent maps such as WMAP and Planck.

Conformal-cyclic-cosmology Hawking-point or ring claims are examples of this class. They are not imported as cosmology ontology; they are localized-feature packets requiring cross-map support, mask and foreground control, and a declared look-elsewhere domain before any source interpretation is allowed.

The same discipline applies to the all-sky Planck products themselves. A Planck map is a calibrated microwave/far-infrared temperature, intensity, and polarization data product over declared frequency channels, masks, beams, foreground models, and covariance assumptions. It is not, by itself, an ontology claim about a unique global origin event. The origin story enters only through the model that projects a candidate Noether sea, photon-channel, and source-history record into the same band-limited observables.

The comparison packet must record the reduction path before the residual is interpreted: sky mask, component-separation or foreground model, beam and transfer-function handling, monopole/dipole treatment, baseline subtraction, look-elsewhere domain, and any simulation ensemble used to assign significance. Without that provenance, a localized feature can be a foreground, mask, beam, or null-statistics artifact while appearing as a cosmological signal.

Let $M_P(\hat{\mathbf{n}})$ and $M_W(\hat{\mathbf{n}})$ denote foreground-cleaned Planck and WMAP residual maps after a common mask and baseline $\Lambda\mathrm{CDM}$ subtraction, with the above provenance fields fixed before template search. For an angular template $T_{\theta,\hat{\mathbf{n}}}$ centered at sky direction $\hat{\mathbf{n}}$ with scale $\theta$, define the cross-map support statistic
$$
S_{PW}(\hat{\mathbf{n}},\theta)
=
\frac{\langle M_P,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_P^{-1}}}{\sigma_P(\theta)}
\frac{\langle M_W,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_W^{-1}}}{\sigma_W(\theta)}
$$
For a proposed set of $N$ localized features, the comparison pressure is the null probability
$$
p_N
=
\Pr_{\Lambda\mathrm{CDM}+\mathrm{foregrounds}}
\left[
\max_{\{\hat{\mathbf{n}}_i,\theta_i\}_{i=1}^{N}}
\sum_{i=1}^{N}S_{PW}(\hat{\mathbf{n}}_i,\theta_i)
\ge
S_{\mathrm{obs}}
\right]
$$

This statistic is a validation target, not a permission to import an external cosmology. If such a residual remains significant after foreground, mask, and look-elsewhere accounting, a viable $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology must either reproduce it from the same Noether sea state used for TT/TE/EE, blackbody behavior, lensing, BAO, and structure growth, or show why it is a foreground, systematic, or null-fluctuation artifact. A fit that explains localized features by changing the cosmology state independently from the acoustic peaks or lensing record fails the shared-state requirement.

Epoch labels in the mapped chronology below are effective reaction-stage names. They translate standard cosmology milestones into local release, association, thermalization, and transport regimes; they are not literal universal eras imposed on the fixed Euclidean void.

## Pre-Cosmological Steady State ($\mathbb{A}\mathbb{A}\mathbb{A}$-Only)
- Scope: $\mathbb{A}\mathbb{A}\mathbb{A}$-only steady-state background; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang era.
- Persistent galaxies and SMBHs exist in a long-lived recycling regime.
- This steady-state reservoir is later mapped onto the Big Bang timeline for physical observers.

**$\Lambda\mathrm{CDM}$ interpretation:** Outside the model; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang state.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The universe is a fixed Euclidean container populated by the Noether sea. Galaxies and SMBHs have existed indefinitely in a steady-state, recycling regime. SMBHs act as strong-field recycling sites whose horizon interfaces can return processed content to the surrounding Noether sea through several release channels. Those channels may include visible outflows, diffuse radiative release, and initially dark-sector photon-channel candidates. The released content then traverses the evolving Noether sea and can be thermally reprocessed by repeated interactions with assemblies. This steady-state backdrop is the source reservoir that later maps onto the Big Bang timeline for physical observers.

## Planck Epoch (0 to $\sim 10^{-43}$ s)
- Time window: 0 to $\sim 10^{-43}$ s.
- Regime: peak effective densities/energies; quantum-gravity behavior dominates.
- Force status: gravity is distinct; other interactions are effectively unified.

**$\Lambda\mathrm{CDM}$ interpretation:** Spacetime is in a quantum-gravity regime; ordinary field theory breaks down. The Planck scale sets the limiting energy density and length scale for known physics.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Planck Epoch: Peak Density of Energetic Architrinos):** The Noether sea reaches peak effective density in a local recycling event. Architrinos dominate the dynamics, and the Noether braid network is maximally compressed. At the event-horizon limit, the only stable assemblies are neutral Noether braids: high-energy, stealthy pairs or quad clusters that couple with a strong-like force. The photon-channel assemblies are modeled as coaxial contra-rotating pro/anti planar pairs moving at the local effective photon speed. Noether braid assemblies populate the Noether sea, so the effective gravity channel is active while the Euclidean void remains fixed. Noether braids are neutral, so there is no emergent electric force yet beyond internal binding. Axial architrinos are absent, so no weak force. A strong-like binding exists inside Noether braid couplings, but it is not externally observable until quark assemblies appear. This is the regime where self-hit effects are strongest and where the universal maximum-curvature binary (MCB) cap is approached.

## Grand Unification Epoch ($\sim 10^{-43}$ to $10^{-36}$ s)
- Time window: $\sim 10^{-43}$ to $10^{-36}$ s.
- Regime: high-energy unification with symmetry breaking beginning.
- Force status: strong interaction separates from the electroweak sector across this window.

**$\Lambda\mathrm{CDM}$ interpretation:** Gauge interactions may be unified; symmetry breaking sets the stage for later phase transitions.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Grand Unification Epoch: Binaries Dominate):** Stable binary assemblies become the dominant carriers of energy and interaction. The Noether sea organizes around binary formation, suppressing free-architrino behavior and defining the first durable interaction channels. Strong-like binding remains internal to these neutral Noether braids and is still not externally observable without quark-scale axial patterns.

## Inflationary Epoch ($\sim 10^{-36}$ to $10^{-32}$ s)
- Time window: $\sim 10^{-36}$ to $10^{-32}$ s.
- Regime: rapid effective expansion/relaxation smooths the large-scale Noether sea state and its effective geometry.
- Perturbations: primordial fluctuations are seeded for later structure.

**$\Lambda\mathrm{CDM}$ interpretation:** A scalar field drives exponential expansion, smoothing curvature and seeding primordial perturbations.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Inflationary Epoch: Noether Braid Transition):** $\mathbb{A}\mathbb{A}\mathbb{A}$ treats inflation-like behavior as sourced in SMBH-core interior dynamics. The self-hit regime of inner assemblies drives rapid effective expansion/relaxation of the surrounding Noether sea. Near the Planck-alignment boundary, terminal lock and release behavior organizes the transition from maximal-curvature dynamics into a broader, more uniform ambient state. In the mapped chronology, Noether braid behavior enters a coherent regime that later supports emergent metric summaries without invoking literal expansion of the void.

## Electroweak Epoch ($\sim 10^{-12}$ s)
- Time window: $\sim 10^{-12}$ s.
- Regime: electroweak symmetry breaking; particle masses emerge.
- Force status: electromagnetic and weak forces split; four forces become distinct thereafter.

**$\Lambda\mathrm{CDM}$ interpretation:** Electroweak symmetry breaks; particle masses emerge via the Higgs mechanism.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Electroweak Epoch: Axial Architrinos Associate with Noether braids):** Axial architrinos associate with Noether braids, setting the effective inertial response and distinguishing stable interaction channels. This is the point where electromagnetic and weak interactions become externally observable: charged assemblies appear and weak-scale coupling becomes meaningful through axial topology. This association process defines the emergent analog of particle masses and electroweak differentiation; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../assemblies/bosons/electroweak-bosons.md).

## Quark Epoch ($\sim 10^{-12}$ to $10^{-6}$ s)
- Time window: $\sim 10^{-12}$ to $10^{-6}$ s.
- Regime: quark-gluon plasma dominates the energy density.
- Force status: strong interaction active; confinement has not yet occurred.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks and gluons form a hot plasma; confinement has not yet occurred.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Quark Epoch: Emerging/Surviving Quarks Couple Vortices):** Quark-like assemblies survive as specific nested shell braid configurations with axial layers. Their coupling is mediated by vortex-like wake structures, with confinement emerging as a topological stability condition rather than a fundamental gauge field. This is the point where the strong interaction becomes externally visible through quark–quark coupling and confinement dynamics.

## Hadron Epoch ($\sim 10^{-6}$ s to $\sim 1$ s)
- Time window: $\sim 10^{-6}$ s to $\sim 1$ s.
- Regime: quark confinement produces hadrons.
- Matter: baryonic matter becomes the dominant composite sector.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks confine into hadrons (protons and neutrons), and hadronic matter becomes the dominant form of baryonic energy.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Hadron Epoch: Assemblies with Coupled Quarks Emerge):** Multi-braid assemblies stabilize, associating quark-like structures into hadron analogs. The Noether sea supports composite assemblies with persistent internal phase structure, setting the stage for nuclear binding.

## Lepton Epoch (incl. neutrino decoupling) ($\sim 1$ to $\sim 10$ s)
- Time window: $\sim 1$ to $\sim 10$ s.
- Regime: leptons and anti-leptons are abundant.
- Outcome: pair annihilation reduces lepton density and heats radiation.
- Sub-phase (neutrino decoupling, $\sim 1$ s): weak interaction rate falls below expansion/relaxation; neutrinos free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electron-positron pairs are abundant; annihilation and cooling reshape the radiation bath.
**$\Lambda\mathrm{CDM}$ (neutrino decoupling):** Weak interaction rates drop below the expansion rate; neutrinos free-stream.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Lepton Epoch: Noether braids with six $\epsilon$ axial architrinos form):** Stable lepton analogs form from Noether braids carrying six bound axial architrinos, with net observer-level $|e|$ from six $\epsilon=|e|/6$ units. Lepton-like assemblies populate the Noether sea and mediate charge-neutralization channels.
**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Neutrino Decoupling: Noether braids with Neutral Axial Layers):** Nearly neutral Noether braid assemblies lose strong coupling to the dominant plasma-like background and begin to free-stream as weakly interacting modes. In this framing, neutrino-sector free-streaming and sea coupling are part of the same parameter story that later appears as effective $N_{\text{eff}}$ language; compare [Neutrinos](../assemblies/fermions/neutrinos.md).

## Photon Epoch ($\sim 10$ s to $\sim 3.8\times10^5$ years)
- Time window: $\sim 10$ s to $\sim 3.8\times10^5$ years.
- Regime: ionized plasma with tight photon-matter coupling.
- Outcome: acoustic oscillations develop in the coupled medium.

**$\Lambda\mathrm{CDM}$ interpretation:** The photon-baryon fluid is optically thick; acoustic oscillations develop and imprint the future CMB power spectrum.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Photon Epoch: Nuclear Assembly Plasma):** A dense plasma of nuclear assemblies and photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs fills the Noether sea. Repeated scattering and wake interactions thermalize the radiation field. Acoustic-like standing modes arise from coupled oscillations of assemblies and coaxial contra-rotating pro/anti planar-pair excitations, seeding the eventual CMB peak structure.

## Big Bang Nucleosynthesis ($\sim 3$ to $\sim 20$ minutes)
- Time window: $\sim 3$ to $\sim 20$ minutes.
- Regime: light nuclei form as temperatures fall.
- Outcome: primordial abundances of D, He, and trace Li are set.

**$\Lambda\mathrm{CDM}$ interpretation:** Protons and neutrons bind into deuterium, helium, and trace lithium; abundances are set by expansion rate and reaction networks.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (BBN: Protons (15:21) and Neutrons (18:18) Associate):** Specific multi-braid assemblies corresponding to proton (15:21) and neutron (18:18) configurations associate into light nuclear assemblies. Reaction rates are controlled by assembly topology and wake-coupling cross sections in the Noether sea; this is the same light-element window developed in [BBN Constraints](./BBN-constraints.md).

## Acoustic Peak Seeding (pre-recombination)
- Time window: late photon epoch prior to recombination.
- Regime: standing-wave modes imprint a harmonic ladder.
- Outcome: peak positions/amplitudes encode medium properties and coupling.

**$\Lambda\mathrm{CDM}$ interpretation:** Acoustic oscillations in the photon-baryon fluid generate the familiar harmonic peaks. Peak positions are set by the sound horizon at recombination; relative heights encode baryon loading and radiation driving.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Nested Shell Braid Energy Ladder):** The nested shell braid system supplies three intrinsic energy scales (outer, middle, inner) that act as primary mode seeds. Coupling through the Noether sea generates a harmonic ladder from those seeds, analogous to standing acoustic modes in a cavity. The effective “sound horizon” scale is set by the Noether sea coupling length, the delay response $\chi_{\text{sea}}$, and the duration of the high-optical-depth phase, while the odd/even peak pattern reflects how baryon-like assemblies load the oscillations relative to coaxial contra-rotating pro/anti planar-pair modes.

## Recombination ($\sim 3.8\times10^5$ years)
- Time window: $\sim 3.8\times10^5$ years.
- Regime: electrons associate with nuclei; scattering drops sharply.
- Outcome: photons decouple (last scattering) and free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electrons combine with nuclei; photons decouple, producing the CMB. The last-scattering surface is established.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Recombination: Coaxial Contra-Rotating Photon Assemblies Decouple):** Electron-like assemblies lock into neutral coaxial configurations with nuclei, dramatically reducing scattering cross sections. Photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs decouple and free-stream. This defines the $\mathbb{A}\mathbb{A}\mathbb{A}$ analog of last scattering, with the CMB spectrum reflecting the thermalized Noether sea state at decoupling.

## Dark Ages ($\sim 3.8\times10^5$ years to first light)
- Time window: $\sim 3.8\times10^5$ years to first light.
- Regime: neutral medium with no luminous sources.
- Outcome: structure grows under gravity/medium dynamics.

**$\Lambda\mathrm{CDM}$ interpretation:** The universe is neutral and dark; structure grows under gravity until the first luminous objects form.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Dark Ages: Coaxial Contra-Rotating Photon Assemblies Free-Stream):** The decoupled photon assemblies, modeled as coaxial contra-rotating pro/anti planar pairs, propagate through the evolving Noether sea. The radiation field retains its thermal shape while redshifting due to medium evolution and path-integrated clock-rate comparison between emission and observation environments. Small anisotropies reflect assembly-density fluctuations rather than a single primordial event.

This retention claim is a transparent-transport invariant, not a claim of continued ordinary thermalization. After decoupling, the path map must rescale photon-channel frequency and inferred temperature together while preserving the transported bundle's occupation-shape function and transverse phase coherence. A post-decoupling mechanism that repeatedly absorbs, re-emits, scatters, or randomly kicks the photon packets may relax a spectrum in special circumstances, but it will generically erase image sharpness, anisotropy, polarization, or the near-Planck spectral shape unless those side effects are explicitly bounded.

### Entropy Split in the CMB Record

The CMB record carries two different entropy lessons that must not be collapsed into one. Its near-blackbody spectrum and uniform temperature show that the radiation sector reached a high-entropy thermal record under the photon/matter coarse-graining. The same smoothness is low entropy under the gravitational and horizon-interface coarse-graining because later clumping, potential-energy release, structure formation, and black-hole records open vastly larger compatible histories. A valid $\mathbb{A}\mathbb{A}\mathbb{A}$ CMB branch must therefore keep radiation thermalization, gravitational smoothness, Noether sea state, and horizon-interface entropy as separate projections of one shared source-and-transport record.

## SMBH Release Channels
- Scope: interpretive bridge between $\mathbb{A}\mathbb{A}\mathbb{A}$ steady-state recycling and the effective Big Bang chronology map.
- Claim: the Big Bang corresponds to the collective surfaces of SMBHs, not a singular origin.
- Outcome: outward release from SMBH recycling sites maps onto the observed CMB after thermalization and redshift.

**$\Lambda\mathrm{CDM}$ interpretation:** The Big Bang is a global origin of spacetime, setting the initial conditions for all subsequent evolution.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The Big Bang timeline is reinterpreted as the effective history of a large-scale recycling event sourced by SMBH environments. Dark-sector photon-like modes, recycled dark-sector assemblies, and other outbound excitations from SMBH horizon interfaces can propagate through the Noether sea, thermalize, and redshift into the observed CMB directly or after further conversion into visible channels. Jets and surface outflows remain plausible observer-level manifestations of this release, but they are not the only allowed morphology. The three intrinsic nested shell braid energy scales (outer/middle/inner) provide natural mode seeds for acoustic peaks, with coupling in the medium generating the harmonic ladder observed today. The CMB source interpretation is therefore a closure target for steady-state recycling dynamics in a fixed Euclidean void, not a singular origin event nor literal metric stretching of the container.

CMB photons must remain source-and-path records. A proposed background bath has to carry release provenance, thermalization depth, coherent photon-channel transport, redshift handoff, and observer-frame reconstruction in one ledger. Treating the CMB as only a painted last-scattering sphere loses the source term; treating it as only local recycled emission loses the transfer and acoustic constraints.

### Horizon-Interface Photon Release Candidate

The strong-field version of this source story should keep a specific candidate channel visible. A photon-channel packet is a coaxial contra-rotating pro/anti planar pair, while the black-hole horizon interface is the regime where nested shell braid assemblies are driven toward planar symmetry-breaking lock at $v=c_f$. The shared planar-pair geometry makes the horizon a natural candidate site for photon-channel or photon-channel-adjacent release, not merely a place where already-formed photons suffer an exterior gravitational redshift.

The same signed row can contain both sides of the process. Interior or interface segments may blueshift photon-channel packets, raising their receiver-facing phase cadence and energy relative to local exterior standards. Outward transport through the surrounding Noether sea may then redshift, thermalize, scatter, or convert those packets before they become visible to ordinary observers. The existence of such high-energy interior photon records is therefore a plausible branch of the CMB source program, but it is not a shortcut around the CMB constraints.

For a horizon-sourced contribution to the CMB bath, the source packet should be recorded schematically as
$$
\Theta_{H\gamma}
=
\left(
\mathcal{B}_{H},
Y_{\gamma,H},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{H\gamma},
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}},
\mathcal{P}_{E\to R}
\right)
$$
where $\mathcal{B}_{H}$ is the horizon-interface label ensemble, $Y_{\gamma,H}$ is the signed strong-field photon-frequency exchange row, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{H\gamma}$ is the energy, momentum, angular-momentum, provenance, and medium-update ledger for the released channel, $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}$ is the thermalization depth, and $\mathcal{P}_{E\to R}$ is the path-history propagation factor. This packet is admissible only if it feeds the same blackbody, anisotropy, polarization, damping, lensing, redshift, and BBN handoff records already required by the CMB module.

The candidate is strong because it links several otherwise separate clues: black-hole recycling, horizon-interface planar lock, photon planar-pair ontology, signed redshift/blueshift transport, and CMB thermalization. Its failure mode is equally clear. If the horizon contribution can explain only an energy scale while spoiling the near-blackbody spectrum, erasing TT/TE/EE information, overproducing spectral distortions, or requiring a different Noether sea state from the one used for redshift and growth, then it is not a valid CMB source branch.

### QSSC Contrast (Conceptual)

| Axis | QSSC-like families | $\mathbb{A}\mathbb{A}\mathbb{A}$ implementation |
|---|---|---|
| Similarity | Distributed/recycling source logic over long history | Distributed/recycling source logic over long history |
| Core difference | Phenomenological source and transport descriptions | Noether sea medium microphysics with explicit module interfaces |
| Closure standard | General background consistency goals | Hard closure targets: blackbody precision, $\Delta T/T$, and TT/TE/EE/damping coherence |

## Distributed-Emission Channels

Within the same ontology, CMB sourcing can be represented through:

1. SMBH release from horizon-interface recycling sites, including jet-like, diffuse, and initially dark-sector channels accumulated over long history,
2. medium-relaxation radiation from Noether sea state transitions,
3. conversion or dissociation channels from high-velocity or dark-sector assembly states into photon assemblies.
4. strong-field photon-channel or photon-channel-adjacent release near the horizon-interface symmetry-breaking threshold, followed by redshift, thermalization, scattering, or conversion during outward transport.

These channels are treated as parts of one shared thermalization and decoupling story; they are not separate ontologies.

Jet-transport scales in the Mpc class are treated as one member of this channel family, with cumulative contribution determined by source population statistics, release-channel selection, and medium thermalization depth.

Isotropy in this branch is attributed to long-time averaging over many source populations following the same microphysical rules, not to one-time primordial causal contact.

### Effective Thermal Spectrum of the Noether Sea

The framework does not yet identify an ontological root definition of temperature, so it should not simply equate the enormous internal energy of individual Noether braids with an ordinary thermodynamic temperature. A more disciplined distinction is required between three quantities: the internal energy scale of the braids, the local effective emissive temperature of the Noether sea if it behaves as a blackbody source, and the observer-side temperature inferred from the photon bath after emission, transport, thermalization, and redshift. On that reading, the observed $2.7255\,\mathrm{K}$ background is the temperature of the ambient microwave radiation field measured by present observers, not automatically the intrinsic temperature of the Noether sea as an emitter. The stronger claim to test is that sufficiently homogeneous regions of the Sea can generate and maintain a near-blackbody photon population whose measured spectrum tracks that emissive state after medium transport. Departures from the baseline blackbody should then encode local Noether sea state: increasing Noether braid density, anisotropy, or internal excitation near dense matter would tend to distort the spectrum away from the homogeneous limit, while the strongest deviations should arise near black-hole recycling zones, where alignment, compression, and release-channel mixing can harden, bias, or only partially re-thermalize the emitted radiation before subsequent relaxation in the surrounding Noether sea.

### Discovery-Scale Thermal Record

The 1965 Dicke-Peebles-Roll-Wilkinson and Penzias-Wilson letters are useful here as a paired constraint, not as permission to import one origin story. The theoretical side emphasized that a sufficiently hot phase with $T\gtrsim 10^{10}\,\mathrm{K}$ would drive pair production, photon exchange, and neutrino-sector equilibration rapidly enough to create a thermal radiation bath, and that subsequent homogeneous redshift would preserve the blackbody form while lowering the inferred temperature. The observational side reported an unexplained zenith antenna-temperature excess near $3.5\,\mathrm{K}$ at $4080\,\mathrm{Mc/s}$ after accounting for atmosphere, ohmic loss, back-lobe response, calibration, polarization, isotropy, and seasonal variation.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the durable lesson is the constraint packet. A CMB branch must not merely point to a distributed source population; it must carry a joint thermal and measurement record
$$
\Theta_{\mathrm{CMB}}
=
\left(
T_{\mathrm{src}},
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}},
\eta_{\gamma b},
N_{\mathrm{eff}},
Y_p,
\mathcal{P}_{\mathrm{instr}},
\mathbf{D}_{\mathrm{frame}}
\right)
$$
where $T_{\mathrm{src}}$ is the effective source or last-thermalization temperature, $\eta_{\gamma b}$ is the photon-to-baryon loading ledger, $N_{\mathrm{eff}}$ and $Y_p$ carry the neutrino and helium-facing constraints, $\mathcal{P}_{\mathrm{instr}}$ records the antenna, atmosphere, calibration, foreground, polarization, and seasonal checks, and $\mathbf{D}_{\mathrm{frame}}$ is the residual frame vector used in the dipole gate above. A distributed or recycling interpretation is admissible only when the same $\Theta_{\mathrm{CMB}}$ supports the spectrum, isotropy, BBN handoff, and frame correction. Fitting the microwave temperature while assigning the helium abundance, neutrino history, foreground subtraction, or dipole correction to separate records would reproduce a number while failing the CMB constraint.

The same record must close the photon energy inventory, not only the fitted temperature. For a declared source-and-thermalization branch $\theta$, let $u_\gamma^\theta(t_{\mathrm{eff}})$ be the effective photon energy density that reaches the CMB comparison surface, $B_{\mathrm{therm}}^\theta$ the energy transferred through thermalizing channels, $B_{\mathrm{loss}}^\theta$ the energy irreversibly routed into non-photon reservoirs, and $\mathcal{F}_\gamma^\theta$ the boundary flux through the selected comparison window. The CMB energy-budget residual can be written schematically as
$$
\mathcal{R}_{\gamma,\mathrm{CMB}}^\theta
=
\frac{
\left|
u_\gamma^\theta(t_{\mathrm{eff,obs}})
-
u_{\gamma,\mathrm{Planck}}(T_0)
\right|
}{\epsilon_u}
+
\frac{
\left|
\Delta U_{\mathrm{src}}^\theta
-
B_{\mathrm{therm}}^\theta
-
B_{\mathrm{loss}}^\theta
-
\int \mathcal{F}_\gamma^\theta\,dA_{\mathrm{eff}}\,dt_{\mathrm{eff}}
\right|
}{\epsilon_E}
$$
This residual is the CMB-facing form of source provenance. A branch that recovers a blackbody curve by adding an untracked photon bath, or by hiding excess source energy in an undeclared non-photon reservoir, has not supplied the shared record required by the CMB gate.

Post-free-streaming redshift adds the same constraint on the transport side. Once source, recoil, remnant, and boundary rows are separated, a redshifted photon bundle must close its energy deficit into the Noether sea path update,

$$
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

This is the CMB-facing projection of the bounded-region continuity law, with boundary flux, source rows, recoil, and remnant exchange separated before the transparent-path term is evaluated. It need not assume a convergent universe-wide scalar energy in order to falsify a transport branch locally. Without that local closure, a CMB branch that preserves the Planck curve only by hiding the redshift energy in an untracked bath has failed the fixed-void energy ledger.

### Historical Equality and Temperature Benchmark

The 1948 Alpher-Herman correction to Gamow is useful here as historical pressure, not as a present-parameter source. Their calculation corrected an early matter-density estimate, found that the naive matter-radiation-density intersection moved to an implausibly late time if the curvature term were neglected, and then restored that curvature term in the effective expanding-universe equation. In the corrected record, the matter/radiation intersection, a Jeans-style condensation mass and radius, a gas temperature at condensation, and a present radiation temperature of order $5\,\mathrm{K}$ were tied into one computation.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ lesson is not the historical numerical value $5\,\mathrm{K}$, since the observer-side CMB temperature comparison uses the modern calibrated value stated above. The retained benchmark is the shared-record pressure: a CMB branch should not fit present radiation temperature separately from matter-radiation equality, growth onset, and the effective curvature/expansion projection. In the fixed-void interpretation, the curvature term is read as an observer-level effective-metric projection, not as curvature of the Euclidean void.

A compact residual for this pressure is
$$
\mathcal{R}_{\mathrm{T,eq,grow}}(\theta)
=
\frac{(T_0^\theta-T_0^{\mathrm{obs}})^2}{\sigma_{T_0}^2}
+
\frac{(z_{\mathrm{eq}}^\theta-z_{\mathrm{eq}}^{\mathrm{obs}})^2}{\sigma_{z_{\mathrm{eq}}}^2}
+
\frac{(k_{\mathrm{eq}}^\theta-k_{\mathrm{eq}}^{\mathrm{obs}})^2}{\sigma_{k_{\mathrm{eq}}}^2}
+
\lambda_H
\sum_b
\frac{
\left(H_{\mathrm{eff}}^\theta(z_b)-H_{\mathrm{eff}}^{\mathrm{obs}}(z_b)\right)^2
}{
\sigma_{H,b}^2
}
+
\lambda_K
\frac{(\Omega_{K,\mathrm{eff}}^\theta-\Omega_{K,\mathrm{eff}}^{\mathrm{obs}})^2}{\sigma_K^2}
+
\lambda_g
\left[
\frac{(\ln M_{\mathrm{grow}}^\theta-\ln M_{\mathrm{grow}}^{\mathrm{ref}})^2}{\sigma_{\ln M}^2}
+
\frac{(\ln R_{\mathrm{grow}}^\theta-\ln R_{\mathrm{grow}}^{\mathrm{ref}})^2}{\sigma_{\ln R}^2}
\right]
$$
Here $T_0^\theta$ is the present observer-side radiation temperature, while $z_{\mathrm{eq}}^\theta$ and $k_{\mathrm{eq}}^\theta$ are the matter-radiation equality redshift and scale in observer variables. The term $H_{\mathrm{eff}}^\theta$ is the effective expansion or relaxation projection, and $\Omega_{K,\mathrm{eff}}^\theta$ is the effective curvature projection of the same Noether sea record. The positive-scale terms $M_{\mathrm{grow}}^\theta$ and $R_{\mathrm{grow}}^\theta$ are declared condensation/growth-scale comparisons supplied by the structure-formation packet rather than imported 1948 values. A successful CMB record must make this residual small without changing $\theta$ between the blackbody, equality, effective expansion, curvature, and growth projections.

### Thermalization-Depth and Planck-Recovery Target

The blackbody claim should be carried as a theorem target, not as a source-story assertion. A distributed-emission interpretation must show that source channels, transport, and decoupling collectively supply enough mode exchange before free streaming. A compact diagnostic is the path-integrated thermalization depth

$$
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}(\nu)
=
\int_{t_{\mathrm{eff,src}}}^{t_{\mathrm{eff,dec}}}
\tau_{\mathrm{th}}^{-1}(\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

where $\tau_{\mathrm{th}}^{-1}$ is the effective rate for the already-recorded capture/release, Compton-like redistribution, pair-channel, and medium-exchange processes. The target is $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}\gg1$ before decoupling for spectral relaxation, followed by sufficiently weak post-decoupling coupling to preserve anisotropy, polarization, and damping information rather than erase it.

The same theorem target has a line-of-sight version for steady-state or distributed-source branches. An effective microwave photosphere is not a new ontological origin surface; it is the comparison locus where the declared photon-channel transport becomes optically thin enough that photons stop being repeatedly thermalized along a given direction. For observer position $\mathbf X_{\mathrm{obs}}$, sky direction $\hat{\mathbf n}$, Euclidean path length $\ell$, and path-history time $T_\ell$ supplied by the same transport record, define

$$
\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)
=
\int_0^D
\chi_{\mathrm{op}}^\theta
\left(\nu,\mathbf X_{\mathrm{obs}}+\ell\hat{\mathbf n},T_\ell\right)
\,d\ell,
\qquad
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})
=
\inf\{D>0:\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)\ge1\}
$$

Here $\chi_{\mathrm{op}}^\theta$ is the proposed microwave-band opacity, not the Noether sea delay factor $\chi_{\text{sea}}$. The CMB-pixel question is therefore a derived closure target. For angular beam or pixel width $\Delta\alpha$ in radians, use the transverse comparison scale
$$
L_{\perp}^{\theta}(\nu,\hat{\mathbf{n}},\Delta\alpha)
\simeq
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})\,\Delta\alpha
$$
This scale is meaningful only after the branch computes $D_{\mathrm{eff}}^\theta$ from its source, transport, and thermalization record. If no finite $D_{\mathrm{eff}}^\theta$ exists, or if it varies too strongly with frequency or sky direction, the distributed-source interpretation has not supplied a stable CMB comparison surface.

Thermalization mechanisms that use this opacity or distributed absorbers must also pass a side-effect test. Let $\mathcal{A}_{\ell}^{\theta}$, $\mathcal{P}_{\ell}^{\theta}$, and $\mathcal{D}_{\mathrm{FIR}}^\theta$ denote the induced changes in temperature anisotropy, polarization, and far-infrared/submillimeter background intensity. The side-effect residual is
$$
\mathcal{R}_{\mathrm{op}}^\theta
=
\frac{\|\Delta\mathcal{A}_\ell^\theta\|}{\epsilon_A}
+
\frac{\|\Delta\mathcal{P}_\ell^\theta\|}{\epsilon_P}
+
\frac{\|\Delta\mathcal{D}_{\mathrm{FIR}}^\theta\|}{\epsilon_{\mathrm{FIR}}}
+
\frac{\|\partial_\nu\chi_{\mathrm{op}}^\theta\|_{\mathrm{CMB}}}{\epsilon_\chi}
$$
A thermalizing component is admissible only if it helps make $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}\gg1$ before the free-streaming record is fixed while keeping $\mathcal{R}_{\mathrm{op}}^\theta\le1$ afterward. This is the native exclusion of absorber stories that smooth the spectrum by erasing the anisotropy and polarization record they must also preserve.

In the weak homogeneous photon-channel limit, the observer-level recovery target is the Planck spectral form

$$
u_\nu^{\mathrm{eff}}(T_{\text{ens}})
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{\exp(h\nu/(k_B T_{\text{ens}}))-1}
$$

This formula is an effective comparison object. It becomes available only after Gate A supplies the photon energy-frequency and mode-counting interface, Gate B supplies the two transverse photon modes and polarization handoff, and Gate C drives the photon chemical potential to zero through detailed balance. The redshift handoff must then preserve spectral shape by mapping photon frequencies and inferred temperature through the same Noether sea state and clock-rate comparison variables used elsewhere in this document.

Equivalently, the transparent transport operator must commute with global frequency scaling on the blackbody family:

$$
\mathcal{T}_{\lambda}\mathcal{B}_{T}
=
\mathcal{B}_{T/\lambda}
+O(\epsilon_{\mathrm{spec}})
$$

where $\mathcal{B}_{T}$ denotes the observer-level Planck spectrum at temperature $T$ and $\lambda=1+z$ for the declared path after endpoint and launch terms are separated. This condition is stronger than fitting a final temperature. It says the transport has preserved the occupation-number shape rather than re-thermalizing an arbitrary distorted spectrum by coincidence.

The same transparent-transport branch must also carry no undeclared transverse photon-momentum transfer. After declared lensing, beam, aperture, and detector terms are removed, the image-preserving condition is $\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}})$, with any remaining transverse phase residual kept inside the polarization and anisotropy tolerances.

The spectrum gate should be stated as a calibrated comparison, not as an assumption that the theoretical Planck curve has been directly observed without apparatus structure. For frequency channels $\nu_i$, measured intensities $I_i$, foreground model $F_i(\psi)$, and calibration covariance $C_{ij}$, define
$$
\mathcal{R}_{\mathrm{spec}}(\theta,T,\psi)
=
\sum_{i,j}
\left[
I_i-F_i(\psi)-B_{\nu_i}(T;\theta)
\right]
C^{-1}_{ij}
\left[
I_j-F_j(\psi)-B_{\nu_j}(T;\theta)
\right]
$$
where $B_\nu(T;\theta)$ is the photon-channel blackbody comparison spectrum projected through the same medium record $\theta$. A distributed or recycling source story must make $\mathcal{R}_{\mathrm{spec}}$ small without using a foreground, calibration, or post-decoupling transport residual to erase the acoustic and polarization information.

In the homogeneous comparison limit, the redshift handoff must preserve the Planck form by scaling frequency and temperature together:
$$
\nu_{\mathrm{obs}}
=
\frac{\nu_{\mathrm{dec}}}{1+z},
\qquad
T_{\mathrm{obs}}
=
\frac{T_{\mathrm{dec}}}{1+z}
$$
This is an observer-level transport benchmark. It does not say that the Euclidean void expanded; it says the photon-channel distribution, endpoint clock comparison, and path-history propagation must carry a blackbody spectrum into the present microwave band without generating a chemical-potential or chromaticity residual above the CMB tolerance.

Transparency supplies the complementary exclusion test. Once the universe is optically thin in the microwave band, a redshift mechanism that changes photon frequencies without the same temperature scaling generically distorts the spectrum. The CMB branch therefore carries the distortion residual
$$
\mathcal{R}_{\mathrm{dist}}
=
\frac{\mu^2}{\sigma_\mu^2}
+
\frac{y^2}{\sigma_y^2}
+
\mathcal{R}_{\mathrm{spec}}
$$
where $\mu$ and $y$ are the chemical-potential and Compton-distortion parameters of the observer-level spectrum fit. A path-history redshift proposal passes only if it preserves the near-thermal spectrum, image sharpness, and packet time-dilation behavior in the same transport record.

The last-scattering benchmark should also retain the rate condition that makes the surface sharp. In standard comparison language decoupling occurs when the scattering rate falls through the effective expansion or relaxation rate,
$$
\Gamma_T
=
n_e\sigma_T c_0
\approx
H_{\mathrm{eff}}
$$
with recombination delayed by the high photon-to-baryon loading encoded in the same $\eta$ ledger used by BBN. The native CMB record therefore has to recover a thin enough last-scattering window, not only a plausible source story.

## Consistency Anchors

- Expansion wording here should remain consistent with [expansion-mechanism.md](./expansion-mechanism.md).
- Dark-sector loading language here should remain consistent with [dark-matter.md](./dark-matter.md) and [hubble-s8-tensions.md](./hubble-s8-tensions.md).
- Strong-field release language here should remain consistent with [../spacetime/black-holes.md](../spacetime/black-holes.md).
- Parameter-bridge wording here should remain consistent with the constraint-ledger language used in the cosmology branch.
- Reaction and thermalization provenance should remain consistent with [Reaction-Cosmology Provenance Ledger](../validation/reaction-cosmology-provenance-ledger.md).

## CMB-Module Interface

In the modular cosmology map, this page provides:

- timeline-level interpretation mapping between ontic mechanism language and observer-era chronology,
- source-to-transport-to-decoupling narrative inputs from the unified prediction layer in this document,
- bridge language tying expansion, BBN, and growth narratives into one CMB interpretation layer.

## Prediction Layer (Unified)

### Effective Comparison Object

$$
C_\ell = \langle |a_{\ell m}|^2 \rangle
$$

The formal observables remain standard; in practice this includes TT/TE/EE spectra (with damping-tail and lensing behavior), with $C_\ell$ as compact notation.

### Scalar and Tensor Closure Target

The scalar/tensor layer is an observable gate, not an origin-story selector. Whether the source story is primordial, distributed, or recycling-based, a candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ CMB record $\theta$ must reproduce the scalar perturbation spectrum and avoid an excessive tensor contribution using the same Noether sea history that later supplies TT/TE/EE, damping, lensing, and redshift handoff.

Use the comparison parameterization
$$
\mathcal{P}_{\mathcal{R}}^{\theta}(k)
=
A_{\mathrm{s}}^{\theta}
\left(\frac{k}{k_*}\right)^{
n_{\mathrm{s}}^{\theta} - 1 + \frac{1}{2}\alpha_{\mathrm{s}}^{\theta}\ln(k/k_*)
},
\qquad
r^{\theta}(k_*)
=
\frac{\mathcal{P}_{\mathrm{T}}^{\theta}(k_*)}{\mathcal{P}_{\mathcal{R}}^{\theta}(k_*)}
$$

Here $A_{\mathrm{s}}^{\theta}$ is the scalar amplitude, $n_{\mathrm{s}}^{\theta}$ the scalar tilt, $\alpha_{\mathrm{s}}^{\theta}$ an optional running term, and $r^{\theta}$ the tensor-to-scalar comparison ratio. The tensor condition is a bound,
$$
r^{\theta}(k_*) \le r_{\max}
$$
with $r_{\max}$ supplied by the current observational analysis being used for the comparison. This keeps tensor non-detection as a pressure on source models without turning any particular inflationary or anti-inflationary interpretation into corpus doctrine.

The tensor row should not collapse all early sources into a single inflation signal. Split the tensor-to-scalar comparison into vacuum-like and causal-source components,
$$
r_{\mathrm{tot}}^\theta(k_*)
=
r_{\mathrm{vac}}^\theta(k_*)
+r_{\mathrm{causal}}^\theta(k_*)
$$
where $r_{\mathrm{vac}}^\theta$ is the vacuum-like tensor contribution and $r_{\mathrm{causal}}^\theta$ is any tensor power sourced by phase-transition-like, defect-like, strong-release, recycling, or other causal-source processes. Finite-range or medium-compliance gravity comparisons enter this same tensor gate. They do not add a massive-graviton ontology; they add the requirement that the same Noether sea record which weakens the large-scale response also predicts the tensor and B-mode data products. A compact comparison residual is
$$
\mathcal{R}_{\mathrm{T,split}}(\theta)
=
\sum_{\ell \in \mathcal{L}_{\mathrm{BB}}}
\frac{
\left(C_{\ell,\mathrm{BB}}^{\theta} - C_{\ell,\mathrm{BB}}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,\mathrm{BB}}^2
}
+
\lambda_{\mathrm{vac}}
\max\!\left(0, r_{\mathrm{vac}}^\theta - r_{\mathrm{vac},\max}\right)^2
+
\lambda_{\mathrm{causal}}
\max\!\left(0, r_{\mathrm{causal}}^\theta - r_{\mathrm{causal},\max}\right)^2
+
\lambda_{\mathrm{low}}\mathcal{R}_{\mathrm{GW,low}}(\theta)
$$
where $\mathcal{L}_{\mathrm{BB}}$ is the declared B-mode comparison window, $r_{\mathrm{vac},\max}$ and $r_{\mathrm{causal},\max}$ are supplied by the data product or simulation protocol, and $\mathcal{R}_{\mathrm{GW,low}}$ is the low-frequency dispersion forecast from [Gravitational Waves](../spacetime/gravitational-waves.md#linear-wave-equation). This keeps the CMB tensor bound, causal-source tensor bound, and gravitational-wave dispersion gate tied to one comparison record rather than allowing a finite-range branch to fit them separately.

A compact residual for CMB closure is
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
=
\sum_{X\in\{\mathrm{TT},\mathrm{TE},\mathrm{EE}\}}\sum_{\ell}
\frac{(C_{\ell,X}^{\theta}-C_{\ell,X}^{\mathrm{obs}})^2}{\sigma_{\ell,X}^2}
+
\frac{(A_{\mathrm{s}}^{\theta}-A_{\mathrm{s}}^{\mathrm{obs}})^2}{\sigma_{A_{\mathrm{s}}}^2}
+
\frac{(n_{\mathrm{s}}^{\theta}-n_{\mathrm{s}}^{\mathrm{obs}})^2}{\sigma_{n_{\mathrm{s}}}^2}
+
\lambda_{\mathrm{T}}\max\!\left(0, r^{\theta}-r_{\max}\right)^2
$$

The closure target is one medium-and-assembly model with bounded $\mathcal{R}_{\mathrm{CMB}}$, not a separate fit for each observable family.

The same scalar sector must also recover the acoustic phase record rather than only the broadband amplitude and tilt. A compact phase residual can be written as
$$
\mathcal{R}_{\mathrm{phase}}(\theta)
=
\sum_{X\in\{\mathrm{TT},\mathrm{TE},\mathrm{EE}\}}\sum_{p}
\frac{
\left(\ell_{p,X}^{\theta}-\ell_{p,X}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,p,X}^2
}
$$
where $\ell_{p,X}$ denotes the location of the $p$th acoustic feature in spectrum $X$. This residual keeps acoustic ringing as an observational phase-coherence requirement. It does not select a particular origin story for why those phases are coherent.

The vector sector supplies a separate absence gate. For an effective pre-decoupling velocity field $\mathbf{u}_{\theta}^{\mathrm{eff}}$ and vorticity $\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}\equiv\nabla\times\mathbf{u}_{\theta}^{\mathrm{eff}}$, use
$$
\mathcal{R}_{V}(\theta)
=
\frac{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}\right\|^2\,dV_{\mathrm{eff}}
}{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\nabla\delta_{\gamma}^{\theta}\right\|^2\,dV_{\mathrm{eff}}
+\epsilon_V
}
$$
Here $\delta_{\gamma}^{\theta}$ is the photon-channel density contrast in the observer-level reconstruction. The numerator tests effective vector/vorticity content; the denominator normalizes it against the scalar contrast being recovered. A successful CMB history must keep this residual small in the same state record that fits TT/TE/EE.

The CMB-lensing sector adds a late-time integrated-mass reconstruction gate. In standard comparison language, lensing remaps the primary CMB by an effective lensing potential $\phi$ and yields a lensing-potential spectrum $C_{L}^{\phi\phi}$. For a candidate history $\theta$, use
$$
\mathcal{R}_{\mathrm{lens}}(\theta)
=
\sum_L
\frac{
\left(C_{L}^{\phi\phi,\theta}-C_{L}^{\phi\phi,\mathrm{obs}}\right)^2
}{
\sigma_{L,\phi}^2
}
$$
This is a data-product constraint, not a dark-sector ontology by itself. The same Noether sea and assembly history that fits the primary TT/TE/EE spectra must also project to the lensing potential consumed by the growth and dark-matter modules.

The same gate should include the smoothness pressure usually hidden inside origin-story language. Conformal-cosmology comparisons are useful here only because they isolate a real burden: the effective early record must have a very small free gravitational-mode contribution compared with the complicated strong-field behavior expected near generic collapse. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not import conformal continuation as ontology. It preserves the observable requirement by asking the CMB-producing Noether sea history to suppress effective Weyl-like curvature in the decoupling comparison layer.

For an effective metric reconstruction $g_{\theta}^{\text{eff}}$ associated with a candidate history $\theta$, one useful comparison residual is
$$
\mathcal{R}_{\mathrm{smooth}}(\theta)
=
\frac{
\int_{\Sigma_{\mathrm{dec}}}
\left\|C_{\alpha\beta\gamma\delta}(g_{\theta}^{\text{eff}})\right\|^2\,dV_{\mathrm{eff}}
}{
\int_{\Sigma_{\mathrm{dec}}}
\left\|R_{\alpha\beta}(g_{\theta}^{\text{eff}})\right\|^2\,dV_{\mathrm{eff}}
+\epsilon_R
}
$$

This is not a statement that the Euclidean void is curved. It is an observer-level diagnostic on the effective reconstruction used to compare with CMB data. A stronger closure criterion is therefore
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
+
\lambda_{\mathrm{T,eq,grow}}\mathcal{R}_{\mathrm{T,eq,grow}}(\theta)
+
\lambda_{\mathrm{phase}}\mathcal{R}_{\mathrm{phase}}(\theta)
+
\lambda_V\mathcal{R}_{V}(\theta)
+
\lambda_{\mathrm{lens}}\mathcal{R}_{\mathrm{lens}}(\theta)
+
\lambda_{\mathrm{smooth}}\mathcal{R}_{\mathrm{smooth}}(\theta)
+
\lambda_{\mathrm{T,split}}\mathcal{R}_{\mathrm{T,split}}(\theta)
\le
\varepsilon_{\mathrm{CMB}}
$$
with $\lambda_{\mathrm{T,eq,grow}}$, $\lambda_{\mathrm{phase}}$, $\lambda_V$, $\lambda_{\mathrm{lens}}$, $\lambda_{\mathrm{smooth}}$, $\lambda_{\mathrm{T,split}}$, and $\varepsilon_{\mathrm{CMB}}$ declared by the data release or simulation protocol. Passing this test would mean that the same Noether sea and assembly history recovers TT/TE/EE, blackbody behavior, radiation-temperature/equality/growth consistency, scalar/tensor bounds, causal-source tensor limits, acoustic phase coherence, vector-mode suppression, CMB-lensing reconstruction, the low effective gravitational free-mode budget, and any declared finite-range comparison branch without changing ontology between modules.

### Forward Prediction Map

Use one continuous causal map:

Noether sea state evolution $\rightarrow$ pre-decoupling coupled modes $\rightarrow$ decoupling transfer history $\rightarrow$ observed TT/TE/EE structure.

Interpretation and microphysical origin are re-grounded in assembly dynamics while retaining the same observer-level prediction objects.

### Conceptual Mapping

- Peak spacing reflects effective horizon/coupling scales of the Noether sea.
- Odd/even contrast reflects baryon-like loading relative to photon assemblies.
- High-$\ell$ damping reflects decoupling-era diffusion/opacity analogs.
- Polarization structure reflects phase relations in coupled oscillations.

### Source-Interpretation Neutrality

Whether the background is read through a primarily primordial-origin interpretation or a distributed-emission interpretation, the prediction layer is one shared parameterization of the same observables.

So source narrative is an interpretation layer, not a change in the prediction target: TT/TE/EE structure, damping behavior, and blackbody character remain part of one coherent readout.

The useful decomposition is therefore row-based rather than slogan-based. A candidate CMB history must specify
$$
\Theta_{\mathrm{CMB,src}}
=
\left(
\mathcal{S}_{\gamma},
\mathcal{D}_{\mathrm{th}},
\mathcal{T}_{\gamma},
\mathcal{P}_{\mathrm{TT/TE/EE}}
\right),
$$
where $\mathcal{S}_{\gamma}$ is the photon-channel source and release record, $\mathcal{D}_{\mathrm{th}}$ is the thermalization-depth record, $\mathcal{T}_{\gamma}$ is the coherent photon-channel transport record, and $\mathcal{P}_{\mathrm{TT/TE/EE}}$ is the transfer record for temperature and polarization spectra. A distributed-source or recycling interpretation is admissible only if these four rows are restrictions of one Noether sea and source-history record. It is not enough to fit the monopole with one story and then import acoustic peaks, damping, lensing, or polarization from a different state record.

### Redshift and Clock Link

CMB frequency scaling to present observers is interpreted through medium evolution plus environment-dependent clock-rate comparison, consistent with the expansion-mechanism framing:

$$
\frac{d\tau}{dt_{\mathrm{eff}}}=F\!\left(\mathbf V,\rho_{\text{NS}}(\mathbf X,T),n(\mathbf X,T),\chi_{\text{sea}}(\mathbf X,T),\Phi_{\text{eff}},\text{clock geometry}\right)
$$

So CMB temperature/redshift summaries remain usable while their mechanism is grounded in assembly-medium dynamics.

### Sunyaev-Zeldovich Path-History Calibration

Sunyaev-Zeldovich measurements provide a direct reminder that CMB photon frequency is a path-history record. In standard comparison language, the thermal effect shifts CMB photon frequencies through inverse-Compton exchange with hot cluster electrons, while the kinematic effect records the bulk motion of the intervening electron population. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these are not new ontology. They are calibration cases showing that a photon packet can carry signed frequency transfer from the intervening medium after decoupling.

For a line of sight $\gamma$ through an intervening region $W$, the CMB module should retain a signed path row

$$
Y_{\gamma}^{\mathrm{post}}
=
\sum_{j\in W}\Delta Y_{\gamma,j}^{\mathrm{ex}},
\qquad
\Delta Y_{\gamma,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{\gamma,j}^{+}}{\nu_{\gamma,j}^{-}}
$$

where negative increments are frequency boosts and positive increments are frequency depletions relative to the local comparison clock. The corresponding exchange residual is

$$
\mathcal{R}_{\mathrm{SZ}\text{-}\mathrm{ex}}
=
\sum_{j\in W}
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}
$$

This row is a calibration and provenance requirement, not a claim that all cosmological redshift is SZ scattering. A CMB history must still preserve the near-blackbody spectrum, anisotropy, polarization, damping, and lensing records. The SZ lesson is narrower and important: any use of CMB temperature, redshift, or kSZ velocity data must keep photon frequency transfer tied to the same Noether sea, electron-population, and path-history record rather than treating frequency as a pure expansion clock.

### Dark-Sector and Growth Link

- Neutral-assembly loading and medium response both contribute to how pre-decoupling oscillations map into late-time inferred matter amplitudes.
- This keeps CMB interpretation consistent with the shared $H_0$/$S_8$ narrative rather than splitting background and growth into separate ontologies.

### Parameter Bridges

- Keep effective $N_{\text{eff}}$ language connected to neutrino/sea coupling history.
- Keep baryon-loading and damping-tail language connected to the same reaction/transport background used in BBN framing.
