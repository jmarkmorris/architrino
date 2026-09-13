# CMB in $\mathbb{A}\mathbb{A}\mathbb{A}$ Cosmology

The cosmic microwave background (CMB) is the nearly thermal microwave radiation observed across the sky. Its spectrum, small temperature variations, and polarization constrain any account of its sources and transport. This chapter compares the standard hot-universe history associated with $\Lambda\mathrm{CDM}$, the cosmological-constant and cold-dark-matter model, with the proposed recycling interpretation in Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. It builds on [Cosmology Ontology](./cosmology-ontology.md) and connects to [Expansion Mechanism](./expansion-mechanism.md), [BBN Constraints](./BBN-constraints.md), and [Dark Matter](./dark-matter.md).

## Core Idea

The CMB timeline is presented as an effective observer-level chronology map that is interpreted through one fixed-void, evolving-Noether sea ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$.

The [Euclidean void](../foundations/euclidean-void.md) is the fixed spatial background; [absolute time](../foundations/absolute-time.md), denoted by $T$, orders substrate events. [Architrinos](../foundations/architrino.md) are polarity-bearing point entities whose past motion determines the causal wakes contributing to present acceleration. A Noether braid is a proposed neutral coupled assembly of their worldlines, and the [Noether sea](../spacetime/noether-sea.md) is the ambient assembly population. Its constitutive response, photon carriers, and cosmological release mechanisms require derivation from those histories. Here TT denotes temperature autocorrelation, EE the autocorrelation of the parity-even polarization component, and TE their signed cross-correlation; BB denotes the parity-odd polarization autocorrelation. Baryon acoustic oscillations (BAO) are a related distance-scale comparison in the matter distribution.

## Framing Guardrails

- The Euclidean void is fixed; cosmological language describes Noether sea evolution within that fixed container.
- Redshift language is consistent with Noether sea evolution plus clock-rate comparison across environments.
- Background and growth claims are kept in one shared Noether sea and assembly ontology.
- Epoch times below are an effective observer-level chronology map, not a claim of one literal global launch event in absolute-time ontology.
- The CMB rest-frame correction is an observational procedure, not an ontological axiom. It must be checked against matter catalogues, supernova residuals, and BAO directionality before it is allowed to fix the whole cosmology stack.

## Chronology Mapping Note

The $\mathbb{A}\mathbb{A}\mathbb{A}$ chronology explores a source architecture local to supermassive black holes (SMBHs). Its relationship to cyclical and recycling cosmologies is conceptual; a fixed Euclidean void and unbounded absolute time do not establish an eternal galaxy population, a steady-state distribution, or a recurrent release mechanism.

The symbol $t_{\mathrm{eff}}=0$ anchors a declared local release or reaction record in an effective observer chart; it is not the origin of absolute time. The epoch windows below are approximate standard-comparison labels, including speculative high-energy extensions. They are not measured durations of SMBH release events. Aligning many local histories with one observed chronology requires a derived clock map, source population, and correlated transport history. All assembly identifications and release sequences in this timeline are hypotheses unless a separate derivation is identified; the numerical epoch labels cannot supply those derivations.

## CMB Dipole and Matter-Dipole Gate

The CMB dipole remains a central calibration object because the standard interpretation treats it mainly as a kinematic signal from local motion. If that interpretation is complete, then distant source catalogues should show the corresponding aberration and Doppler dipole after allowing for each catalogue's number-count slope and spectral response. For a catalogue $X$, use the residual

$$
\Delta_{\mathrm{dip}}^{X}
=
\mathbf{D}_{X}
-
K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fcf045812f79ccd4)

where $\mathbf{D}_{X}$ is the dimensionless fractional source-count dipole and $\mathbf{D}_{\mathrm{CMB}}$ is the dimensionless temperature dipole divided by the CMB monopole temperature. Thus the subtraction compares like units. The catalogue-dependent kinematic factor $K_X(\alpha_X,x_X)$ uses the declared spectral-index and number-count-slope conventions; it is not a universal conversion from a temperature in kelvin to source counts.

In a statistically homogeneous and isotropic comparison, $\Delta_{\mathrm{dip}}^{X}$ must be assessed against the joint distribution of local structure, source clustering, survey selection, evolution, and measurement noise. A finite catalogue can have a structure dipole without violating statistical isotropy. A proposed decomposition in the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison is

$$
\mathbf{D}_{X}
=
\mathbf{D}_{\mathrm{kin}}
+
\mathbf{D}_{\mathrm{sea}}
+
\mathbf{D}_{\mathrm{mask/source}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc962422ae239a51)

where $\mathbf{D}_{\mathrm{kin}}$ is the catalogue-projected motion contribution, $\mathbf{D}_{\mathrm{sea}}$ is a hypothesized contribution from Noether sea flow, density, delay, and clock-rate gradients, and $\mathbf{D}_{\mathrm{mask/source}}$ includes survey selection and intrinsic source clustering. These contributions are catalogue dependent and need not be statistically independent. Assigning the residual to the sea by subtraction is not a measurement of that mechanism. Its independently specified response must remain compatible with CMB anisotropy, source dipoles, supernova directionality, BAO, and local expansion-rate inference.

This gate does not replace the TT/TE/EE or blackbody requirements. It adds a frame-consistency test: the effective CMB frame used for background inference must be the same frame, or a derived projection of the same Noether sea state, used by the matter and distance-ladder modules.

The concrete packet shape for this subgate is defined in [Cosmology Shared Residual Fit Protocol](../validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe).

## Localized CMB Feature Validation

Claims about localized CMB features, including claims sometimes interpreted as pre-Big-Bang or cyclic-history signals, must first be handled as cross-instrument data products. The retained observable is not the external interpretation. It is the question of whether a common localized residual survives masking, foreground modeling, beam handling, and comparison between independent maps such as WMAP and Planck.

Conformal-cyclic-cosmology Hawking-point or ring claims are examples of this class. They are not imported as cosmology ontology; they are localized-feature packets requiring cross-map support, mask and foreground control, and a declared look-elsewhere domain before any source interpretation is allowed.

The same discipline applies to the all-sky Planck products themselves. A Planck map is a calibrated microwave/far-infrared temperature, intensity, and polarization data product over declared frequency channels, masks, beams, foreground models, and covariance assumptions. It is not, by itself, an ontology claim about a unique global origin event. The origin story enters only through the model that projects a candidate Noether sea, photon-channel, and source-history record into the same band-limited observables.

The comparison packet must record the reduction path before the residual is interpreted: sky mask, component-separation or foreground model, beam and transfer-function handling, monopole/dipole treatment, baseline subtraction, look-elsewhere domain, and any simulation ensemble used to assign significance. Without that provenance, a localized feature can be a foreground, mask, beam, or null-statistics artifact while appearing as a cosmological signal.

Let $M_P(\hat{\mathbf{n}})$ and $M_W(\hat{\mathbf{n}})$ denote foreground-cleaned Planck and WMAP residual maps with a common mask and compatible beam treatment. A statistical $\Lambda\mathrm{CDM}$ model does not specify the particular sky realization to subtract; any fitted baseline must be defined and refitted in the null simulations. For an angular template $T_{\theta,\hat{\mathbf{n}}}$ centered at direction $\hat{\mathbf{n}}$ with angular scale $\theta$, define the cross-map support statistic
$$
S_{PW}(\hat{\mathbf{n}},\theta)
=
\frac{\langle M_P,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_P^{-1}}}{\sigma_P(\theta)}
\frac{\langle M_W,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_W^{-1}}}{\sigma_W(\theta)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3b930c43ccb882b1)

Here $\langle M,T\rangle_{C^{-1}}=M^{\mathsf T}C^{-1}T$ on the retained pixels, with covariance $C$ including the modeled sky and instrument contributions. The positive normalization $\sigma(\theta)$ is the null standard deviation of that filtered quantity, with position dependence retained when the mask requires it. The two maps observe the same sky: independent instruments do not make their filtered sky signals independent. A positive product also counts two negative template amplitudes, so a hot-feature-only search must impose its sign restriction explicitly. For a proposed set of $N$ localized features, use the null probability
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

[View →](../../../../equation-mapping.html#corpus-equation-5c821724536ea090)

The probability is over joint simulated maps containing a shared cosmological sky and the declared noise, foreground, and calibration correlations. The search domain fixes admissible scales, signs, separation or overlap of features, and any scan over $N$; otherwise the same location can be counted repeatedly or the trials penalty understated. $S_{\mathrm{obs}}$ is the result of the identical search on the observed pair. Significance would establish a discrepancy under that null, not the identity of a source mechanism. A candidate explanation must predict the feature population jointly with TT/TE/EE, blackbody behavior, lensing, BAO, and growth, without changing its source history between observables.

Epoch labels in the mapped chronology below are effective reaction-stage names. They translate standard cosmology milestones into local release, association, thermalization, and transport regimes; they are not literal universal eras imposed on the fixed Euclidean void.

## Pre-Cosmological Steady State ($\mathbb{A}\mathbb{A}\mathbb{A}$-Only)

- Scope: $\mathbb{A}\mathbb{A}\mathbb{A}$-only steady-state background; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang era.
- The candidate history assumes persistent galaxies and SMBHs in a long-lived recycling regime.
- This steady-state reservoir is later mapped onto the Big Bang timeline for physical observers.

**$\Lambda\mathrm{CDM}$ interpretation:** Outside the model; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang state.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The proposed source reservoir is a statistically sustained population of galaxies and SMBH recycling sites in the Noether sea. Visible outflows, diffuse radiation, and initially dark photon-channel candidates are possible release classes within this hypothesis. A population balance must establish replenishment and persistence; an indefinitely extended time coordinate alone establishes neither. Thermal reprocessing and the mapping to observer chronology remain separate dynamical requirements.

## Planck Epoch (0 to $\sim 10^{-43}$ s)

- Time window: 0 to $\sim 10^{-43}$ s.
- Regime: peak effective densities/energies; quantum-gravity behavior dominates.
- Interaction status: neither quantum gravity nor high-energy unification is established by this epoch label.

**$\Lambda\mathrm{CDM}$ interpretation:** The Planck scale marks where a quantum-gravity description is expected to become necessary. It is not an experimentally established maximum density or minimum length, and baseline $\Lambda\mathrm{CDM}$ does not supply a quantum-gravity theory or a settled interaction sequence at that scale.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Planck Epoch: Peak Density of Energetic Architrinos):** The candidate local history explores dense neutral assemblies and strong causal-wake interactions. A base Noether braid contains six architrinos in three neutral binaries; it is not a two- or four-architrino cluster. The proposed photon carrier is a twelve-worldline coaxial contra-rotating polarity-conjugate planar pair. Neither inventory establishes persistence, dominance, or exclusive survival near a horizon. Net neutrality alone does not eliminate multipole or medium-mediated response, and absence of an axial layer does not derive a complete interaction hierarchy. The [Master Equation](../dynamics/master-equation.md) determines self-hit contributions from earlier same-transmitter causal roots; density or instantaneous speed alone does not determine their strength. A maximal-curvature binary (MCB) cap and any effective gravity, weak, or strong channel remain recovery targets tied to a retained assembly history.

## Grand Unification Epoch ($\sim 10^{-43}$ to $10^{-36}$ s)

- Time window: $\sim 10^{-43}$ to $10^{-36}$ s.
- Regime: high-energy unification with symmetry breaking beginning.
- Interaction status: a proposed high-energy unification sequence; its transition scale is model dependent.

**$\Lambda\mathrm{CDM}$ interpretation:** Gauge interactions may be unified; symmetry breaking sets the stage for later phase transitions.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Grand Unification Epoch: Binaries Dominate):** Binary formation is the proposed precursor to more complex assemblies. Demonstrating its dominance requires formation and persistence rates from the delayed dynamics and a population balance. A binary is not itself a three-binary Noether braid, and neither label derives strong-interaction phenomenology.

## Inflationary Epoch ($\sim 10^{-36}$ to $10^{-32}$ s)

- Time window: $\sim 10^{-36}$ to $10^{-32}$ s.
- Regime: rapid effective expansion/relaxation smooths the large-scale Noether sea state and its effective geometry.
- Perturbations: primordial fluctuations are seeded for later structure.

**$\Lambda\mathrm{CDM}$ interpretation:** An inflationary extension proposes accelerated expansion, often modeled by a scalar field, to account for smoothness and perturbations. The source field and the quoted epoch window are model dependent, not consequences of the late-time $\Lambda\mathrm{CDM}$ parameterization alone.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Inflationary Epoch: Noether Braid Transition):** SMBH-core release and subsequent Noether sea relaxation are the proposed source of inflation-like behavior. Self-hit occupancy, terminal alignment, energy transfer, smoothing, and perturbation production must each follow from one source and medium history. Their occurrence and the required spatial correlations are not supplied by a planar geometry or by relabeling an inflationary epoch; see [Inflation Model](./inflation-model.md).

## Electroweak Epoch ($\sim 10^{-12}$ s)

- Time window: $\sim 10^{-12}$ s.
- Regime: electroweak symmetry breaking; particle masses emerge.
- Force status: electromagnetic and weak forces split; four forces become distinct thereafter.

**$\Lambda\mathrm{CDM}$ interpretation:** In the Standard Model thermal comparison, electroweak symmetry breaking supplies the Higgs contributions to elementary-particle masses. It does not account for all forms of mass; hadronic mass also depends on strong-interaction dynamics.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Electroweak Epoch: Axial Architrinos Associate with Noether braids):** Association of an axial layer, six additional architrinos organized around a candidate braid, is the proposed assembly mechanism. Its formation, retention, inertial response, and electromagnetic and weak response require dynamical derivation. Topology and polarity counts alone do not identify a massive particle or an interaction onset; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../assemblies/bosons/electroweak-bosons.md).

## Quark Epoch ($\sim 10^{-12}$ to $10^{-6}$ s)

- Time window: $\sim 10^{-12}$ to $10^{-6}$ s.
- Regime: quark-gluon plasma dominates the energy density.
- Force status: strong interaction active; confinement has not yet occurred.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks and gluons form a hot plasma; confinement has not yet occurred.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Quark Epoch: Emerging/Surviving Quarks Couple Vortices):** Quark-like assemblies are proposed as Noether-braid-based configurations with axial structure. The responsible branch, retention mechanism, and coupling are unestablished. Vortex-like wake patterns are a mechanism hypothesis; confinement and the observable strong interaction require the full dynamical and response calculation.

## Hadron Epoch ($\sim 10^{-6}$ s to $\sim 1$ s)

- Time window: $\sim 10^{-6}$ s to $\sim 1$ s.
- Regime: quark confinement produces hadrons.
- Matter: baryonic matter becomes the dominant composite sector.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks confine into hadrons (protons and neutrons), and hadronic matter becomes the dominant form of baryonic energy.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Hadron Epoch: Assemblies with Coupled Quarks Emerge):** Multi-braid association is the proposed route to hadron analogs. It requires a demonstrated stabilization mechanism and a phase and response history supporting the proposed composites before nuclear binding can be inferred.

## Lepton Epoch (incl. neutrino decoupling) ($\sim 1$ to $\sim 10$ s)

- Time window: $\sim 1$ to $\sim 10$ s.
- Regime: leptons and anti-leptons are abundant.
- Outcome: pair annihilation reduces lepton density and heats radiation.
- Sub-phase (neutrino decoupling, $\sim 1$ s): weak interaction rate falls below expansion/relaxation; neutrinos free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electron-positron pairs are abundant; annihilation and cooling reshape the radiation bath. **$\Lambda\mathrm{CDM}$ (neutrino decoupling):** Weak interaction rates drop below the expansion rate; neutrinos free-stream.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Lepton Epoch: Noether braids with six $\epsilon$ axial architrinos form):** A same-polarity six-site axial inventory gives observer-level charge magnitude $6\epsilon=|e|$; a mixed-polarity inventory does not generally do so. This count does not establish a stable lepton branch or its formation pathway. **$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Neutrino Decoupling: Noether braids with Neutral Axial Layers):** Neutral candidate assemblies must reproduce the measured weak response and free-streaming history. Neutrality alone gives no decoupling rate. The resulting radiation loading must agree with the same effective $N_{\text{eff}}$ comparison; see [Neutrinos](../assemblies/fermions/neutrinos.md).

## Photon Epoch ($\sim 10$ s to $\sim 3.8\times10^5$ years)

- Time window: $\sim 10$ s to $\sim 3.8\times10^5$ years.
- Regime: ionized plasma with tight photon-matter coupling.
- Outcome: acoustic oscillations develop in the coupled medium.

**$\Lambda\mathrm{CDM}$ interpretation:** The photon-baryon fluid is optically thick; acoustic oscillations develop and imprint the future CMB power spectrum.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Photon Epoch: Nuclear Assembly Plasma):** The candidate history contains matter assemblies and proposed planar-pair photon carriers coupled through the Noether sea. A derived collision and response operator must establish thermalization and coherent acoustic-like modes. Repeated scattering by itself establishes neither a Planck spectrum nor the phase relations of the CMB peaks.

## Big Bang Nucleosynthesis ($\sim 3$ to $\sim 20$ minutes)

- Time window: $\sim 3$ to $\sim 20$ minutes.
- Regime: light nuclei form as temperatures fall.
- Outcome: primordial abundances of D, He, and trace Li are set.

**$\Lambda\mathrm{CDM}$ interpretation:** Protons and neutrons bind into deuterium, helium, and trace lithium; abundances are set by expansion rate and reaction networks.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (BBN: Protons (15:21) and Neutrons (18:18) Associate):** The proposed proton and neutron inventories count negative and positive polarity sites, respectively: $15\epsilon_-+21\epsilon_+$ gives effective charge $+e$, and $18\epsilon_-+18\epsilon_+$ is neutral when $\epsilon=|e|/6$. This arithmetic does not establish the particle branches, nuclear binding, reaction cross sections, or abundance evolution. Those are the linked recovery targets in [BBN Constraints](./BBN-constraints.md).

## Acoustic Peak Seeding (pre-recombination)

- Time window: late photon epoch prior to recombination.
- Regime: standing-wave modes imprint a harmonic ladder.
- Outcome: peak positions/amplitudes encode medium properties and coupling.

**$\Lambda\mathrm{CDM}$ interpretation:** Acoustic oscillations in the photon-baryon fluid generate the peak sequence. Angular positions depend on the ratio of the sound horizon to angular-diameter distance and on phase shifts; relative heights depend on baryon loading and radiation driving. A sound horizon alone does not determine angular peak positions.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Indexed Braid Energy Rows):** A retained three-binary braid may supply three branch-derived energy scales $E_1,E_2,E_3$ that act as mode seeds. Coupling through the Noether sea may generate a harmonic ladder from those seeds, analogous to standing acoustic modes in a cavity. The effective “sound horizon” scale is set by the Noether sea coupling length, the delay response $\chi_{\text{sea}}$, and the duration of the high-optical-depth phase, while the odd/even peak pattern tests how baryon-like assemblies load the oscillations relative to coaxial contra-rotating polarity-conjugate planar-pair modes. The existence and values of three such seeds are recovery targets, not consequences of radius ordering.

## Recombination ($\sim 3.8\times10^5$ years)

- Time window: $\sim 3.8\times10^5$ years.
- Regime: electrons associate with nuclei; scattering drops sharply.
- Outcome: photons decouple (last scattering) and free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electrons combine with nuclei; photons decouple, producing the CMB. The last-scattering surface is established.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Recombination: Coaxial Contra-Rotating Photon Assemblies Decouple):** Association of electron-like and nuclear assemblies must yield the neutral matter states and opacity history required for photon decoupling. A coaxial attachment geometry or a reduced scattering cross section cannot be inferred from neutrality alone. The candidate photon carriers must then preserve the previously established thermal spectrum through the measured last-scattering window.

## Dark Ages ($\sim 3.8\times10^5$ years to first light)

- Time window: $\sim 3.8\times10^5$ years to first light.
- Regime: neutral medium with no luminous sources.
- Outcome: structure grows under gravity/medium dynamics.

**$\Lambda\mathrm{CDM}$ interpretation:** The universe is neutral and dark; structure grows under gravity until the first luminous objects form.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Dark Ages: Coaxial Contra-Rotating Photon Assemblies Free-Stream):** The proposed photon carriers propagate through the evolving Noether sea after decoupling. Spectral preservation under frequency transfer and endpoint-clock comparison is a transport requirement, not a derived consequence of their geometry. The anisotropies require the projected source, velocity, gravitational-comparison, and scattering contributions from that same history; density fluctuations alone do not specify them.

This retention claim is a transparent-transport invariant, not a claim of continued ordinary thermalization. After decoupling, the path map must rescale photon-channel frequency and inferred temperature together while preserving the transported bundle's occupation-shape function and transverse phase coherence. A post-decoupling mechanism that repeatedly absorbs, re-emits, scatters, or randomly kicks the photon packets may relax a spectrum in special circumstances, but it will generically erase image sharpness, anisotropy, polarization, or the near-Planck spectral shape unless those side effects are explicitly bounded.

### Entropy Split in the CMB Record

Radiation thermality and gravitational smoothness concern different coarse-grainings, meaning different choices of resolved variables and compatible microscopic histories. A Planck distribution is a maximum-entropy comparison only for a declared photon ensemble with fixed mean energy and accessible number-changing processes. Its observed shape constrains, but does not uniquely reconstruct, the thermalization history. A gravitational-entropy interpretation additionally needs an admissible history measure and a definition of its gravitational and horizon variables; smoothness alone gives no numerical entropy. These distinctions follow the [entropy and temperature definitions](../dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable).

## SMBH Release Channels

- Scope: interpretive bridge between $\mathbb{A}\mathbb{A}\mathbb{A}$ steady-state recycling and the effective Big Bang chronology map.
- Hypothesis: collective SMBH release supplies a history comparable with the observed hot-universe record.
- Recovery target: release, thermalization, and subsequent transport jointly produce the observed CMB.

**$\Lambda\mathrm{CDM}$ interpretation:** The hot Big Bang describes an early hot, dense phase and its subsequent evolution. A past singularity in an idealized classical extrapolation is not an established account of the ultimate origin of spacetime.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** SMBH recycling is a candidate source for a reconstructed hot-universe history. Its release classes include proposed dark assemblies, photon-like excitations, and visible outflows. Formation, escape, conversion, thermalization, and redshift each require a physical calculation. Internal braid energy scales are possible inputs to a coupled response, but three binary labels do not derive a cosmological harmonic ladder, coherent phases, or its angular scale. A successful common history must predict those observables together with the spectrum and source population.

CMB photons must remain source-and-path records. A proposed background bath has to carry release provenance, thermalization depth, coherent photon-channel transport, redshift handoff, and observer-frame reconstruction in one ledger. Treating the CMB as only a painted last-scattering sphere loses the source term; treating it as only local recycled emission loses the transfer and acoustic constraints.

### Horizon-Interface Photon Release Candidate

The strong-field candidate links the proposed planar photon carrier to a proposed terminal-alignment region near a black hole. Here $\lambda_A=1$ denotes the flat endpoint of the orthogonal-axis three-binary alignment chart. Geometry alone does not establish a horizon, a retained endpoint, threshold constituent speeds, or an escaping photon. Those require complete histories and response calculations; planar resemblance supplies a research hypothesis only.

The signed frequency ledger can describe both boosts and depletions along an admitted path. Actual exchange and comparisons between different clocks must be separated before interpreting either as an energy gain or loss. Outward propagation, scattering, thermalization, and conversion remain candidate processes until the release and transport history is supplied.

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

[View →](../../../../equation-mapping.html#corpus-equation-cd45449201b499ca)

Here $\mathcal{B}_{H}$ is the candidate horizon-interface ensemble, $Y_{\gamma,H}$ the signed strong-field frequency-exchange entry, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{H\gamma}$ the energy, momentum, angular-momentum, and medium-update ledger, $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}$ the thermalization depth, and $\mathcal{P}_{E\to R}$ the propagation factor from emission to reception. The notation records required information; it does not establish its existence. The same release history must supply the blackbody, anisotropy, polarization, damping, lensing, redshift, and BBN comparisons.

The candidate connects recycling, proposed planar alignment, photon-carrier geometry, signed frequency transfer, and thermalization. These are dependent hypotheses, not independent supporting observations. A source solution must first exhibit admissible release dynamics, then satisfy the blackbody, TT/TE/EE, distortion, redshift, and growth constraints. Agreement with an energy scale alone cannot establish a CMB source branch.

### QSSC Contrast (Conceptual)

| Axis | Quasi-steady-state cosmology (QSSC) comparisons | $\mathbb{A}\mathbb{A}\mathbb{A}$ candidate |
|---|---|---|
| Similarity | Distributed/recycling source logic over long history | Distributed/recycling source logic over long history |
| Mechanism comparison | Must identify a particular source and transport model before evaluating it | Seeks a derivation from architrino histories and Noether sea response |
| Common observational standard | Blackbody precision, temperature anisotropy, and TT/TE/EE/damping coherence | The same constraints; a microscopic proposal does not relax or automatically satisfy them |

## Distributed-Emission Channels

Within the same ontology, CMB sourcing can be represented through:

1. SMBH release from horizon-interface recycling sites, including jet-like, diffuse, and initially dark-sector channels accumulated over long history,
2. medium-relaxation radiation from Noether sea state transitions,
3. conversion or dissociation channels from high-velocity or dark-sector assembly states into photon assemblies.
4. strong-field photon-channel or photon-channel-adjacent release near the horizon-interface symmetry-breaking threshold, followed by redshift, thermalization, scattering, or conversion during outward transport.

These channels are treated as parts of one shared thermalization and decoupling story; they are not separate ontologies.

Jet-transport scales in the Mpc class are treated as one member of this channel family, with cumulative contribution determined by source population statistics, release-channel selection, and medium thermalization depth.

Long-time source averaging is a proposed route to isotropy. Identical microscopic laws do not guarantee an isotropic source distribution, sufficient independent samples, or small residual fluctuations in a finite observation. This proposal must predict its directional and frequency-dependent correlations, including the matter-dipole residual $\Delta_{\mathrm{dip}}^{X}$ of the [CMB Dipole and Matter-Dipole Gate](#cmb-dipole-and-matter-dipole-gate) and the homogeneity residual $\mathcal{R}_{\mathrm{hom}}$ in [Cosmology Ontology](./cosmology-ontology.md#inference-dependency-ledger). Superposing blackbodies of different transported temperatures does not generally produce a blackbody.

### Effective Thermal Spectrum of the Noether Sea

Temperature is an ensemble variable under the [entropy definition](../dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable), not the internal energy of one braid. Distinguish a braid's internal energy, a source's effective emissive temperature when thermal equilibrium is justified, and the temperature inferred after photon transport. Fixsen's 2009 analysis, [The Temperature of the Cosmic Microwave Background](https://arxiv.org/abs/0911.1955), reports a combined determination $2.72548\pm0.00057\,\mathrm{K}$; its separate FIRAS recalibration using WMAP gives $2.7260\pm0.0013\,\mathrm{K}$. These are observer-side radiation measurements, not measurements of an intrinsic Noether sea temperature.

A homogeneous source produces a Planck spectrum only with suitable mode statistics, energy exchange, and photon-number equilibration. Density, anisotropy, or excitation changes need not produce a particular spectral distortion: an equilibrated source can remain thermal at a different temperature, whereas mixing unequally redshifted thermal sources can distort the spectrum. Predicting the sign, magnitude, and location of any deviation requires a source and transport calculation; a black-hole environment alone fixes none of them.

### Discovery-Scale Thermal Record

The 1965 letters separate a thermal-history argument from an instrument result. Dicke, Peebles, Roll, and Wilkinson's [Cosmic Black-Body Radiation](https://articles.adsabs.harvard.edu/pdf/1965ApJ...142..414D), pp. 415–416, argued that a sufficiently hot phase with $T_{\mathrm{temp}}\gtrsim10^{10}\,\mathrm{K}$ permits rapid photon equilibration and, given the stated reaction processes, neutrino equilibration. Penzias and Wilson's [A Measurement of Excess Antenna Temperature at 4080 Mc/s](https://articles.adsabs.harvard.edu/pdf/1965ApJ...142..419P), pp. 419–420, reported a residual $3.5\pm1.0\,\mathrm{K}$ after instrument and atmosphere accounting. That single-frequency excess did not itself establish a blackbody spectrum; the companion theoretical letter explicitly requested further spectral measurements. These are historical effective-physics comparisons, not substrate laws.

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

[View →](../../../../equation-mapping.html#corpus-equation-39683ab2f74c5d17)

where $T_{\mathrm{src}}$ is source or last-thermalization temperature, $\eta_{\gamma b}=n_\gamma/n_b$ is the photon-to-baryon number ratio, $N_{\mathrm{eff}}$ parameterizes the effective relativistic radiation content, and $Y_p$ is the helium mass fraction. The conventional BBN ratio is the reciprocal, $\eta=n_b/n_\gamma$; the epoch and any intervening photon production must be retained when converting between them. $\mathcal{P}_{\mathrm{instr}}$ records the measurement corrections, and $\mathbf{D}_{\mathrm{frame}}$ is the residual frame vector. A candidate must support the spectrum, isotropy, BBN handoff, and frame correction with one physical history, while retaining the distinct measurement likelihoods and nuisance parameters of the different instruments.

The energy inventory requires a control region, time interval, and common energy convention. Let $u_\gamma^\theta$ be photon energy density in that region, $\Delta U_{\mathrm{src}}^\theta$ the positive net energy supplied by sources, $B_{\mathrm{therm}}^\theta=\Delta U_\gamma^\theta$ the net change of stored photon energy after internal redistribution, and $B_{\mathrm{loss}}^\theta$ the net transfer to non-photon reservoirs, positive when they gain energy. Define $\mathcal F_\gamma^\theta$ as the signed outward photon energy flux through the control boundary, including any boundary motion. In this inventory, $B_{\mathrm{therm}}^\theta$ is not cumulative energy processed through scattering: that would count repeatedly transferred energy more than once. A conditional energy-budget residual is
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

[View →](../../../../equation-mapping.html#corpus-equation-f1fecc4aa9a229d6)

Here $u_{\gamma,\mathrm{Planck}}(T_0)$ is the frequency integral of the calibrated Planck energy density at present temperature $T_0$ in the same volume convention. The positive tolerances $\epsilon_u$ and $\epsilon_E$ have units of energy density and energy, respectively. All transfers are counted once, and other participating boundary or storage terms must be added explicitly. The residual tests a declared effective balance; it does not derive a conserved energy functional from the Master Equation.

For a transparent-path model that attributes physical photon energy transfer solely to the Noether sea, the conditional balance is

$$
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-259699baa36eff16)

Both terms are changes in one energy convention, with positive sign for a gain. The equality requires a justified bounded-region energy law and removal or inclusion of source, recoil, remnant, stored-history, and boundary terms. A difference between endpoint-clock frequency readings alone does not establish a deposited energy: the emission and reception readings must first be mapped to the common convention. A fixed void does not by itself derive this balance. Defining the sea term as the negative photon term makes a tautology; testing the model requires an independently evaluated medium update.

### Historical Equality and Temperature Benchmark

Alpher and Herman's [Evolution of the Universe](https://doi.org/10.1038/162774b0), Nature 162, 774–775 (1948), corrected Gamow's matter-density calculation and emphasized that omitting the effective curvature term misplaced matter-radiation equality. This is historical motivation for checking linked thermal and growth inferences, not a present-parameter source or evidence for an Architrino source mechanism.

The relevant requirement is that present radiation temperature, matter-radiation equality, growth, and the effective curvature and expansion projection follow from one specified history. Equality is a crossing of matter and radiation energy densities, not a universal onset time for all structure growth. The curvature term belongs to the observer reconstruction, not the Euclidean void.

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

[View →](../../../../equation-mapping.html#corpus-equation-cff6a7b35592c256)

Here $T_0^\theta$ is the present observer-side radiation temperature, while $z_{\mathrm{eq}}^\theta$ and $k_{\mathrm{eq}}^\theta$ are the matter-radiation equality redshift and scale in observer variables. The term $H_{\mathrm{eff}}^\theta$ is the effective expansion or relaxation projection, and $\Omega_{K,\mathrm{eff}}^\theta$ is the effective curvature projection of the same Noether sea record. The positive-scale terms $M_{\mathrm{grow}}^\theta$ and $R_{\mathrm{grow}}^\theta$ are declared condensation/growth-scale comparisons supplied by the structure-formation packet rather than imported 1948 values. A successful CMB record must make this residual small without changing $\theta$ between the blackbody, equality, effective expansion, curvature, and growth projections.

The superscript $\mathrm{obs}$ here denotes model-conditioned estimates, not direct readings of equality or curvature. Correlated quantities require a joint covariance and a common inference model; transplanting their best fits from another cosmology is only a comparison diagnostic. Each logarithmic difference means the logarithm of a ratio in common units, with both scales strictly positive. The weights are fixed nonnegative comparison choices. Unspecified data, covariances, or reference growth scales leave this score unevaluated.

### Thermalization-Depth and Planck-Recovery Target

The blackbody claim should be carried as a theorem target, not as a source-story assertion. A distributed-emission interpretation must show that source channels, transport, and decoupling collectively supply enough mode exchange before free streaming. A compact diagnostic is the path-integrated thermalization depth

$$
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}(\nu)
=
\int_{t_{\mathrm{eff,src}}}^{t_{\mathrm{eff,dec}}}
\tau_{\mathrm{th}}^{-1}(\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e559ff59eea9704b)

Here $\tau_{\mathrm{th}}$ denotes a relaxation duration in effective time, distinguished by its subscript from the physical-clock readout used below. Its inverse is a derived relaxation rate for the relevant collision operator, not an arbitrary sum of interaction counts. Frequent photon-number-conserving scattering can approach kinetic equilibrium with nonzero chemical potential; recovery of a Planck spectrum additionally requires sufficiently rapid photon production and absorption, detailed balance, and control of the slow relaxation modes across the observed band. Large depth in one process alone is insufficient. After decoupling the corresponding transport must preserve anisotropy and polarization within measured limits.

The same theorem target has a line-of-sight version for steady-state or distributed-source branches. An effective microwave photosphere is not a new ontological origin surface; it is a possible escape surface associated with the declared opacity. Whether the radiation previously thermalized is a separate collision-history question. For observer position $\mathbf X_{\mathrm{obs}}$, sky direction $\hat{\mathbf n}$, Euclidean path length $\ell$, and path-history time $T_\ell$ supplied by the same transport record, define

$$
\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)
=
\int_0^D
\chi_{\mathrm{op}}^\theta
\left(\nu_\ell^\theta,\mathbf X_{\mathrm{obs}}+\ell\hat{\mathbf n},T_\ell\right)
\,d\ell,
\qquad
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})
=
\inf\{D>0:\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)\ge1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-810538e241564243)

Here $\chi_{\mathrm{op}}^\theta\ge0$ is opacity per unit Euclidean path length, $\nu$ is the observed frequency, and $\nu_\ell^\theta$ is its local frequency along the same path history. Opacity is distinct from the Noether sea delay factor $\chi_{\text{sea}}$. The displayed straight path is an unlensed comparison; a deflected ray requires its actual trajectory and path element. Set $D_{\mathrm{eff}}^\theta=+\infty$ if the optical-depth threshold is never reached. Extinction depth one locates a possible escape surface, but scattering opacity alone does not demonstrate thermalization or a narrow last-scattering distribution. In the straight-path, small-angle geometric limit, a beam width $\Delta\alpha$ in radians gives
$$
L_{\perp}^{\theta}(\nu,\hat{\mathbf{n}},\Delta\alpha)
\simeq
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})\,\Delta\alpha
$$

[View →](../../../../equation-mapping.html#corpus-equation-11d9312a2348d80b)

This is a Euclidean transverse scale; converting it to a physical-observer ruler scale requires the angular-distance and lensing map. A source extended in depth requires its full visibility distribution. Failure to obtain a finite surface rejects this photosphere subclass, not every possible optically thin distributed-source model; such an alternative must calculate its emissivity-weighted line-of-sight spectrum and correlations directly.

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

[View →](../../../../equation-mapping.html#corpus-equation-1065f140442c611a)

A thermalizing component must supply the requisite pre-decoupling relaxation while keeping the subsequent observable changes within their limits. Each norm, frequency window, and positive tolerance has a specified unit; in particular $\epsilon_\chi$ has the units of the opacity derivative. Frequency dependence of opacity is a mechanism diagnostic, not a direct measured distortion. The score requires propagation to intensity and polarization and calibration against the relevant data before it can reject a physical absorber model.

In the weak homogeneous photon-channel limit, the observer-level recovery target is the Planck spectral form

$$
u_\nu^{\mathrm{eff}}(T_{\text{ens}})
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{\exp(h\nu/(k_B T_{\text{ens}}))-1}
$$

[View →](../../../../equation-mapping.html#planck-blackbody-occupancy)

This effective comparison gives energy per volume per frequency. Here $h$ and $k_B$ are the observer-level Planck and Boltzmann constants, $\nu$ is frequency, $T_{\text{ens}}$ is ensemble temperature, and $c_\gamma$ is a constant photon-channel speed in the isotropic nondispersive comparison. A dispersive channel requires its actual mode density. The [photon recovery conditions](../assemblies/bosons/electroweak-bosons.md) separately require energy-frequency and propagation relations (Gate A), two transverse polarization modes (Gate B), and number-changing thermal equilibration (Gate C). Merely naming these conditions does not establish them. Specific intensity is $B_\nu=c_\gamma u_\nu^{\mathrm{eff}}/(4\pi)$ in this isotropic limit; it is not the same quantity as spectral energy density.

On the blackbody family, transparent transport must satisfy the following mapping property:

$$
\mathcal{T}_{\lambda}\mathcal{B}_{T_{\mathrm{temp}}}
=
\mathcal{B}_{T_{\mathrm{temp}}/\lambda}
+O(\epsilon_{\mathrm{spec}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-d846fa25c465ce88)

Here $\mathcal B_{T_{\mathrm{temp}}}$ is the calibrated Planck specific-intensity spectrum at temperature $T_{\mathrm{temp}}$, and $\lambda=1+z>0$ is the declared path's frequency-scale ratio. The error is bounded in a stated spectral norm. For the same nondispersive endpoint calibration, the Planck formula gives $B_\nu(T_{\mathrm{temp}}/\lambda)=\lambda^{-3}B_{\lambda\nu}(T_{\mathrm{temp}})$. Thus frequency remapping alone is insufficient: the amplitude, occupation measure, and ray-bundle transport must agree as well. This identity is a recovery condition on the complete transport operator, not a derived constitutive law or a general commutation theorem. An inferred density scaling does not imply expansion of the Euclidean void.

The same transparent-transport branch must also carry no undeclared transverse photon-momentum transfer. After declared lensing, beam, aperture, and detector terms are removed, the image-preserving condition is $\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}})$, with any remaining transverse phase residual kept inside the polarization and anisotropy tolerances.

The spectrum gate should be stated as a calibrated comparison, not as an assumption that the theoretical Planck curve has been directly observed without apparatus structure. For frequency channels $\nu_i$, measured intensities $I_i$, foreground model $F_i(\psi)$, and calibration covariance $C_{ij}$, define
$$
\mathcal{R}_{\mathrm{spec}}(\theta,T_{\mathrm{temp}},\psi)
=
\sum_{i,j}
\left[
I_i-F_i(\psi)-B_{\nu_i}(T_{\mathrm{temp}};\theta)
\right]
C^{-1}_{ij}
\left[
I_j-F_j(\psi)-B_{\nu_j}(T_{\mathrm{temp}};\theta)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-7d35f666919edf64)

Here $B_{\nu_i}(T_{\mathrm{temp}};\theta)$ denotes the predicted intensity integrated over channel $i$'s measured bandpass, not simply its value at a nominal central frequency. $C$ is the positive-definite total covariance on the retained data subspace, including instrument noise and declared calibration uncertainties; $\psi$ contains foreground nuisance parameters constrained by the same measurement model. A temperature fit alone tests only the monopole spectrum and cannot establish the source mechanism or the angular transfer history.

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

[View →](../../../../equation-mapping.html#corpus-equation-99a74cfa3937210c)

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

[View →](../../../../equation-mapping.html#corpus-equation-c78e3506e83a37f1)

Here $\mu$ is the dimensionless chemical-potential distortion parameter and $y$ is the Compton-distortion parameter. Fixsen et al., [The Cosmic Microwave Background Spectrum from the Full COBE/FIRAS Data Set](https://arxiv.org/abs/astro-ph/9605054) (1996), report 95% limits $|\mu|<9\times10^{-5}$ and $|y|<1.5\times10^{-5}$. These limits are not the standard deviations $\sigma_\mu,\sigma_y$ in the schematic score. If the parameters and $\mathcal R_{\mathrm{spec}}$ come from the same data, adding them double-counts information unless a joint likelihood or independent residual decomposition is used. The score is therefore a diagnostic, not a calibrated significance. An energy-injection inference additionally depends on the epoch and spectrum; no universal injection fraction follows from either limit.

The usual comparison of scattering and evolution rates is a rough decoupling diagnostic, not a determination of the surface width:
$$
\Gamma_T
=
n_e\sigma_T c_\gamma(\mathbf X_{\mathrm{dec}},T_{\mathrm{event,dec}})
\approx
H_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-34084353b5f94348)

Here $n_e$ is the free-electron number density, $\sigma_T$ is the Thomson cross section at effective comparison grade, and $T_{\mathrm{event,dec}}$ is absolute event time, distinct from decoupling temperature $T_{\mathrm{dec}}$. The speed and the rate $\Gamma_T$ must be converted to the same effective length and time convention as $n_e$, $\sigma_T$, and $H_{\mathrm{eff}}$. Last-scattering width follows from the visibility density $g(t_{\mathrm{eff}})=\Gamma_T(t_{\mathrm{eff}})\exp[-\tau_{\mathrm{sc}}(t_{\mathrm{eff}})]$, where $\tau_{\mathrm{sc}}(t_{\mathrm{eff}})=\int_{t_{\mathrm{eff}}}^{t_{\mathrm{eff,obs}}}\Gamma_T(s)\,ds$. Its shape requires the complete ionization and transport history; $\Gamma_T\approx H_{\mathrm{eff}}$ at one instant cannot supply it.

The same ionization and transfer history must continue through reionization, the later ionization of neutral matter. It has to recover the integrated scattering optical depth $\tau_{\mathrm{reion}}$, the low-$\ell$ EE polarization signal, and the quasar Gunn-Peterson and Lyman-$\alpha$ absorption record without changing the physical history per observable.

For a shared history $\theta$, retain the reionization residual
$$
\mathcal R_{\mathrm{reion}}(\theta)
=
\frac{|\tau_{\mathrm{reion}}^\theta-\tau_{\mathrm{reion}}^{\mathrm{obs}}|^2}{\sigma_{\tau,\mathrm{reion}}^2}
+
\left\|
\mathbf C_{EE,\mathrm{low}\text{-}\ell}^{-1/2}
\left(
\mathbf C_{EE}^{\theta}
-
\mathbf C_{EE}^{\mathrm{obs}}
\right)
\right\|^2
+
\mathcal R_{\mathrm{GP/Ly}\alpha}(\theta).
$$

[View →](../../../../equation-mapping.html#corpus-equation-e6c4f45ccd2d03d9)

Here $\tau_{\mathrm{reion}}$ is dimensionless optical depth and $\sigma_{\tau,\mathrm{reion}}$ its stated uncertainty. $\mathbf C_{EE,\mathrm{low}\text{-}\ell}$ is the covariance of the retained low-multipole EE data vector; it must be nonsingular on that subspace. The final term projects the same ionization history into quasar absorption observables. Optical-depth estimates extracted from these EE measurements are correlated summaries, so their separate squared residual is a diagnostic only, not an independent likelihood factor.

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

An angular spectrum measures correlations of sky-pattern coefficients. For temperature or E-mode polarization, define the ensemble comparison

$$
C_\ell^{XY} = \langle a_{\ell m}^{X}(a_{\ell m}^{Y})^* \rangle,
\qquad X,Y\in\{\mathrm{T},\mathrm{E}\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1ced8de62fcc162b)

Here $a_{\ell m}^X$ is the spherical-harmonic coefficient of the declared temperature or E-mode map, $\ell$ labels angular scale, $m$ the azimuthal component, and the star denotes complex conjugation. Statistical isotropy makes the ensemble covariance independent of $m$ and diagonal between distinct $(\ell,m)$ modes. For $X=Y$ this reduces to the nonnegative auto-spectrum; TE can have either sign. A finite masked sky supplies an estimator with beam, noise, mask, and covariance corrections, not the ensemble average itself. [Scott and Smoot, Cosmic Microwave Background (2025), §§29.3 and 29.7.1](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-cosmic-microwave-background.pdf), summarize this observer-level comparison.

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

[View →](../../../../equation-mapping.html#corpus-equation-02cdf455709d3747)

Here $k>0$ is an effective wavenumber, $k_*>0$ the fixed pivot, $A_{\mathrm{s}}^{\theta}>0$ the scalar amplitude, $n_{\mathrm{s}}^{\theta}$ the scalar tilt, $\alpha_{\mathrm{s}}^{\theta}=dn_{\mathrm{s}}^{\theta}/d\ln k$ its running at the pivot, and $r^{\theta}\ge0$ the tensor-to-scalar power ratio. The formula truncates the logarithmic power expansion and is valid only over its declared wavenumber range. A distributed active source need not reduce to one initial curvature spectrum; its unequal-time source correlations and transfer functions must then be calculated directly. The tensor condition is a bound,
$$
r^{\theta}(k_*) \le r_{\max}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0d7b24448d3984f9)

with $r_{\max}$ supplied by the current observational analysis being used for the comparison. This keeps tensor non-detection as a pressure on source models without turning any particular inflationary or anti-inflationary interpretation into corpus doctrine.

For a common scalar normalization at the same pivot, splitting the tensor amplitude into vacuum-like and causal-source components gives
$$
r_{\mathrm{tot}}^\theta(k_*)
=
r_{\mathrm{vac}}^\theta(k_*)
+r_{\mathrm{causal}}^\theta(k_*)
+r_{\mathrm{cross}}^\theta(k_*)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f0a1292ed287e3c9)

Here $r_{\mathrm{vac}}^\theta$ and $r_{\mathrm{causal}}^\theta$ are the individual nonnegative powers divided by scalar power, while $r_{\mathrm{cross}}^\theta$ is twice the real cross-power divided by that same scalar power. It vanishes only for uncorrelated sources and obeys $|r_{\mathrm{cross}}^\theta|\le2\sqrt{r_{\mathrm{vac}}^\theta r_{\mathrm{causal}}^\theta}$. The causal component includes any proposed phase-transition, defect, or recycling contribution. Their time dependence and propagation must be carried into the predicted BB spectrum. Finite-range or medium-response comparisons require the same history to supply both the gravitational-wave and CMB transfer predictions. A schematic comparison score is
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

[View →](../../../../equation-mapping.html#corpus-equation-6b0e1c1deff18955)

Here $\mathcal{L}_{\mathrm{BB}}$ is the declared B-mode window. Component limits $r_{\mathrm{vac},\max}$ and $r_{\mathrm{causal},\max}$ require a joint analysis with the matching source templates and cross-correlation assumptions; a limit on one uncorrelated template cannot be assigned separately to arbitrary correlated components. The BB prediction includes their complete transfer, lensing, and declared foreground treatment. $\mathcal{R}_{\mathrm{GW,low}}$ is the low-frequency comparison from [Gravitational Waves](../spacetime/gravitational-waves.md#linear-wave-equation). Its inclusion is diagnostic unless observations and tolerances are supplied; an unevaluated forecast is not evidence of agreement.

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

[View →](../../../../equation-mapping.html#corpus-equation-3e8962abbbd2edb1)

This is a schematic discrepancy score, not an independent-data likelihood. TT, TE, and EE estimates have cross-covariances, and their inferred $A_{\mathrm{s}}$ and $n_{\mathrm{s}}$ usually summarize the same data. Adding those summaries as independent measurements would double-count information. A calibrated comparison uses the released joint likelihood or a validated full covariance, with the same nuisance and transfer model; the displayed diagonal score is usable only with its approximation explicitly justified. An upper bound on $r$ also depends on the pivot, template, and confidence convention.

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

[View →](../../../../equation-mapping.html#corpus-equation-34ce9001ef644684)

Here $\ell_{p,X}$ denotes the position of a preselected peak, trough, or zero crossing in spectrum $X$, with the same extraction rule for prediction and data. The feature index $p$ and its matching must be fixed before fitting. These positions correlate with the spectra above; the score tests phase structure but is not additional independent data. Missing or ambiguous features must be treated explicitly, not omitted to lower the score.

A vector-sector diagnostic compares vorticity with scalar density gradients on one effective decoupling slice $\Sigma_{\mathrm{dec}}$. Let $\mathbf{u}_{\theta}^{\mathrm{eff}}$ be the effective velocity, $\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}=\nabla_{\mathrm{eff}}\times\mathbf{u}_{\theta}^{\mathrm{eff}}$ its vorticity, and $c_{\mathrm{ref}}>0$ a fixed reference speed in the same effective units. Use
$$
\mathcal{R}_{V}(\theta)
=
\frac{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}/c_{\mathrm{ref}}\right\|^2\,dV_{\mathrm{eff}}
}{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\nabla_{\mathrm{eff}}\delta_{\gamma}^{\theta}\right\|^2\,dV_{\mathrm{eff}}
+\epsilon_V
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ddf9fcdcab75c536)

Here $\delta_\gamma^\theta$ is dimensionless photon density contrast. Each integral has units of length, and the fixed positive floor $\epsilon_V$ has the same units, making the ratio dimensionless. State the slice, smoothing scale, volume, reference speed, and floor before comparison; a vanishing scalar denominator does not identify an observational vector bound. A small vorticity ratio is only a diagnostic of this velocity field. Vector metric or stress sources and their polarization transfer require separate calculation before comparison with CMB limits.

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

[View →](../../../../equation-mapping.html#corpus-equation-86cd266e69f8ec1e)

This is a data-product constraint, not a dark-sector ontology by itself. The same Noether sea and assembly history that fits the primary TT/TE/EE spectra must also project to the lensing potential consumed by the growth and dark-matter modules.

Smoothness also admits a conditional diagnostic on a reconstructed effective metric. The Weyl tensor measures the tidal part of curvature; the Ricci tensor supplies the complementary contraction. Their relative magnitude is not itself a CMB observable or an entropy measure. Relating it to temperature and polarization requires the same perturbation and transfer model, so a particular conformal-cosmology interpretation is not an additional required premise.

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

[View →](../../../../equation-mapping.html#corpus-equation-278e52f291555db1)

The norms are positive sums of squared tensor components in a declared observer-adapted orthonormal frame, not Lorentzian contractions, which need not be positive and can vanish for nonzero tensors. Use one effective slice, volume, and smoothing prescription for both integrals; $\epsilon_R>0$ has units of inverse length because squared curvature integrated over three-volume has those units. The ratio depends on the chosen observer and floor, especially when Ricci curvature is small. It is a conditional effective-geometry diagnostic and states nothing about curvature of the Euclidean void. The following weighted score combines selected comparisons:
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

[View →](../../../../equation-mapping.html#corpus-equation-26206ee0894c78a1)

The nonnegative weights and threshold $\varepsilon_{\mathrm{CMB}}$ are fixed comparison choices, with correlations handled as described above; data releases do not automatically supply this composite score. Zero weights omit conditions, and an uncomputed residual cannot count as zero. Passing the inequality establishes at most agreement for its evaluated, calibrated terms. It does not include the spectral-distortion, opacity, energy, reionization, dipole, or localized-feature comparisons and therefore cannot certify those conditions or complete CMB recovery. Their applicable constraints must also be satisfied by the same history. Vorticity and curvature ratios remain diagnostics until their observational projections are justified. No value of this score alone establishes a persistent source branch, photon realization, or microscopic theory closure.

### Forward Prediction Map

Use one continuous causal map:

Noether sea state evolution $\rightarrow$ pre-decoupling coupled modes $\rightarrow$ decoupling transfer history $\rightarrow$ observed TT/TE/EE structure.

Each arrow requires a derived response and transfer map; the sequence names the required connection but does not supply it.

### Conceptual Mapping

- Peak spacing tests the ratio of the effective sound-propagation scale to the angular-distance scale, together with phase shifts.
- Odd/even contrast constrains baryon-like loading and radiation driving within the coupled response.
- High-$\ell$ damping constrains diffusion and the finite width of the scattering history.
- Polarization tests the angular quadrupole of radiation at scattering and its correlations with temperature, not merely the existence of oscillations.

### Source-Interpretation Neutrality

Whether the background is read through a primarily primordial-origin interpretation or a distributed-emission interpretation, the prediction layer is one shared parameterization of the same observables.

So source narrative is an interpretation layer, not a change in the prediction target: TT/TE/EE structure, damping behavior, and blackbody character remain part of one coherent readout.

The physical source and transfer mechanisms can differ between these interpretations even though the observed targets are common. A candidate CMB history must specify
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

[View →](../../../../equation-mapping.html#corpus-equation-acfe5f51c56ce43a)

Here $\mathcal{S}_{\gamma}$ is the source and release record, $\mathcal{D}_{\mathrm{th}}$ the thermalization-depth record, $\mathcal{T}_{\gamma}$ the photon transport record, and $\mathcal{P}_{\mathrm{TT/TE/EE}}$ the temperature and polarization transfer record. These four components must derive from one Noether sea and source history. Sharing their names or fitting the monopole does not supply the acoustic, damping, lensing, or polarization predictions.

### Redshift and Clock Link

CMB frequency scaling to present observers is interpreted through medium evolution plus environment-dependent clock-rate comparison, consistent with the expansion-mechanism framing:

$$
\frac{d\tau}{dt_{\mathrm{eff}}}=F\!\left(\mathbf V,\rho_{\text{NS}}(\mathbf X,T),n(\mathbf X,T),\chi_{\text{sea}}(\mathbf X,T),\Phi_{\text{eff}},\text{clock geometry}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ebd38b0f4c21bd08)

Here $\tau$ is a physical-clock readout, $t_{\mathrm{eff}}$ the observer-chart time, $\mathbf V$ the native assembly group velocity, $\rho_{\text{NS}}$ the Noether braid density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ its normalized value, $\chi_{\text{sea}}$ the delay factor, and $\Phi_{\text{eff}}$ an effective potential. $F$ is an underived response function, not a freely adjustable independent prediction. Clock geometry must specify the clock assembly and retained history. The endpoint clock map and path-dependent phase transport together determine frequency comparison; the clock formula alone does not determine cosmological redshift or temperature scaling.

### Sunyaev-Zeldovich Path-History Calibration

Sunyaev-Zeldovich measurements provide a direct reminder that CMB photon frequency is a path-history record. In standard comparison language, the thermal effect shifts CMB photon frequencies through inverse-Compton exchange with hot cluster electrons, while the kinematic effect records the bulk motion of the intervening electron population. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these are not new ontology. They are calibration cases showing that a photon packet can carry signed frequency transfer from the intervening medium after decoupling.

For a photon path $\gamma$ through an intervening region $W$, define the signed frequency-transfer ledger

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

[View →](../../../../equation-mapping.html#corpus-equation-f2968b018d636df8)

Here $j$ indexes physical exchange events, and $\nu_{\gamma,j}^{-}$ and $\nu_{\gamma,j}^{+}$ are the frequencies immediately before and after the event measured in the same local frame and clock convention. Negative increments are boosts and positive increments are depletions. Transport and clock conversions between events are separate terms; this sum alone is not the total endpoint redshift. The corresponding conditional exchange residual is

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

[View →](../../../../equation-mapping.html#corpus-equation-cea08cd76f9ba137)

All energy changes use the same local frame and are positive for gains. The medium, recoil, and remnant terms are disjoint: electron recoil must not be counted again as a medium gain. The positive $\epsilon_{E,j}$ is an energy tolerance. This is a test of an explicitly justified local exchange law, not its microscopic derivation. Thermal and kinematic Sunyaev-Zeldovich (SZ) effects are ensemble scattering observables; predicting them requires the electron distribution, optical depth, angular redistribution, and spectrum, not just a sum over one packet. These comparisons constrain proposed transport without identifying all cosmological redshift with scattering.

### Dark-Sector and Growth Link

- Proposed neutral-assembly loading and medium response must be propagated through the same pre-decoupling oscillation and late-time growth calculation before assigning them inferred matter amplitudes.
- This keeps CMB interpretation consistent with the shared $H_0$/$S_8$ narrative rather than splitting background and growth into separate ontologies.

### Parameter Bridges

- Keep effective $N_{\text{eff}}$ language connected to neutrino/sea coupling history.
- Keep baryon-loading and damping-tail language connected to the same reaction/transport background used in BBN framing.
