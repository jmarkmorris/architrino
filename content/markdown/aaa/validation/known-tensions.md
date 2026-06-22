# Known Tensions

This chapter is the pressure ledger for the present repo state. Its purpose is to collect the unresolved burdens that matter most for closure without mixing them with vague future ideas or low-stakes wishlist items.

## Purpose

This chapter is the pressure ledger for $\mathbb{A}\mathbb{A}\mathbb{A}$. It collects the places where the framework is not yet closed, where the present derivation stack is thinner than the claim it supports, or where current observations impose a hard quantitative burden that the repo has not yet fully carried.

This page is not a dumping ground for vague uncertainty. Each tension should identify:

- the issue,
- why it matters,
- the current repo status,
- the closure target,
- and the failure condition.

## Severity Scale

- **Tier 1:** could directly falsify the present architecture if not resolved.
- **Tier 2:** does not immediately kill the architecture, but blocks a serious Standard-Model or GR-level closure claim.
- **Tier 3:** important downstream completion issue, but not yet the main credibility gate.

## Pressure Ledger

| Tier | Issue | Why it matters | Current repo status | Closure target | Failure condition |
| --- | --- | --- | --- | --- | --- |
| 1 | Weak `V-A` selection rule | The weak interaction must distinguish left-chiral fermions from right-chiral ones. | [quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) gives a geometric lock-out story, and [weak-mixing-ckm.md](../philosophy-history/theory-bridges/weak-mixing-ckm.md) now identifies this as part of the shared weak-coupling-triad exposure problem, but no operator derivation is complete. | Derive a docking or coupling operator that exposes the weak-coupling triad for left-handed charged-current coupling, hides it for right-handed charged-current coupling, and then reuses the same domain for CKM/PMNS overlap and weak-reaction provenance. | If right-handed neutrino or right-handed charged-fermion coupling to `W` is not strongly suppressed in the same regime, or if the exposure domain must be redefined separately for mixing and provenance, the current weak-sector picture fails. |
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](./constraint-ledger.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) now states the moving-assembly coefficient targets plus the translating-binary residual test, but the full attractor proof is not complete. | First solve the translating two-body branch and test $T_u/T_0=\gamma_f$ and $L_{\parallel}/L_{\perp}=1/\gamma_f$ on the same causal-root ledger; then show that nested shell braid clocks, rulers, and signal transport suppress measurable preferred-frame effects below current experimental bounds through coupled shape, clock, and two-way anisotropy closure. | Any robust preferred-frame signal above the recorded bounds, a non-Lorentzian binary residual that cannot be traced to a controlled branch feature, or any need to tune clock and ruler coefficients independently falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../quantum/wavefunction-ontology.md) and [measurement-ontology.md](../quantum/measurement-ontology.md) fix the ontology; [quantum-operator-mapping.md](../philosophy-history/theory-bridges/quantum-operator-mapping.md) now states the finite-time invariant-measure, thermodynamic ensemble consistency, and admissible quantization-domain targets, but the derivation is still open. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation, show that the same finite-window measure projects to the thermodynamic summaries used for apparatus irreversibility, decoherence, and record formation, and restrict effective operators to a physically declared observable domain rather than a global quantization of all classical functions. | If the deterministic closure produces a non-Born weighting in validated regimes, if Born weights and thermodynamic summaries require incompatible measures, or if the operator map requires ad hoc observable-domain changes per benchmark, the current quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface now exists in [general-relativity.md](../spacetime/general-relativity.md) and [ppn-parameters.md](../spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one reusable parameter set for the weak-field metric map. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Low-energy quantum-gravity EFT recovery | Quantized metric methods are not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, but their long-distance effective predictions are fixed by known low-energy degrees of freedom. | [general-relativity.md](../spacetime/general-relativity.md) and [emergent-metric.md](../spacetime/emergent-metric.md) state the classical weak-field map; they need an explicit observer-level GR-EFT recovery gate. | Recover the standard long-distance quantum correction to the Newtonian potential using the same weak-field constitutive record that supports PPN, redshift, Shapiro delay, lensing, and gravitational-wave speed. | If the calculable low-energy quantum correction requires an independent coefficient set, spacetime closure is incomplete even if the classical observables are matched. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](./parameter-ledger.md) now organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Null-result closure for added channels | A unification claim can fail even while matching known positive benchmarks if it predicts extra channels that experiments have not seen. | [failure-criteria.md](failure-criteria.md) now defines $\mathcal{R}_{\mathrm{null}}(\theta)$ for predicted non-baseline channels, but the main sector ledgers have not all routed their null-result bounds through that residual. The concrete comparison cases are mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, sterile or neutral partner branches, and preferred-frame leakage channels. | For every added partner family, unstable baryon channel, extra gauge or transport mode, preferred-frame leakage channel, or other non-baseline output, compute $O_e(\theta)$ and show $O_e(\theta)\le O_e^{\max}$ from the same shared closure record used for the positive benchmarks. A symmetry container that includes the Standard Model as a subcase passes only when the added channels are proven absent, exactly redundant, or below bounds by the same branch record that recovers the observed sector. | If unobserved channels are hidden only by sector-specific masses, thresholds, compactification-like assumptions, or disconnected suppression factors, the framework has reproduced the failure pattern of overextended unification rather than closing it. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../spacetime/emergent-metric.md) now states the Noether sea-first picture, defines a local-horizon residual $\mathcal{R}_{\mathrm{thermo}}(\theta)$, and links the proof scaffold to [Thermodynamic Residual](./simulations/thermodynamic-residual.md); [black-holes.md](../spacetime/black-holes.md) frames horizon entropy as a block-density count over horizon-compatible reduced Noether braid closure labels. No run has yet driven the residual small from a simulated Noether sea record. | Show that the Noether sea admits an area-scaling entropy channel $S_H=k_B\log\lvert\mathcal{B}_H\rvert$ whose local coefficient is recovered as a block entropy density, a local Rindler/Unruh recovery in the appropriate limit, a Jacobson-style $dQ=T_UdS$ residual for boundary-wake data, Page-curve-compatible information release through horizon-interface channels, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires thermodynamic language but the Noether sea cannot supply area scaling, local horizon temperature, a shared stress/entropy/temperature record, Page-curve-compatible information accounting, or a coherent nonequilibrium boundary, the present gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, signed photon-frequency exchange, and thermalization. | [reaction-cosmology-provenance-ledger.md](./reaction-cosmology-provenance-ledger.md) defines the shared ledger, including path-frequency exchange, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation, pair, or Compton/SZ-like transfer channel through thermalization to a BBN or CMB observable, using the same Noether sea state variables throughout. | If BBN photon loading, CMB blackbody recovery, or redshift-budget reconstruction requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | Shared cosmology state closure | Dark-energy, $H_0$, $S_8$, CMB, BBN, BAO, weak-lensing, redshift-budget, and pre-BBN comparison claims all consume overlapping Noether sea state variables. | [cosmology-ontology.md](../cosmology/cosmology-ontology.md), [dark-energy.md](../cosmology/dark-energy.md), and [hubble-s8-tensions.md](../cosmology/hubble-s8-tensions.md) now state the shared-state requirement; [inflation-model.md](../cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN-constraints.md](../cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [structure-formation.md](../cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [gravitational-waves.md](../spacetime/gravitational-waves.md#early-universe-stochastic-background-gate) now route pre-BBN branch projections through the same record; [simulations/cosmology-shared-residual-fit.md](./simulations/cosmology-shared-residual-fit.md) supplies the first mock residual-packet scaffold; and [dark-energy.md](../cosmology/dark-energy.md) now gives a thermodynamic $\Lambda_{\mathrm{eff}}$ conjugacy target, but no empirical joint residual fit exists. | Produce one $\theta_{\mathrm{sea}}$ and projection family that keeps SN, BAO, CMB, WL, RSD, BBN, $H_0$, $S_8$, signed path-frequency-transfer rows, pre-BBN branch projections, and stochastic-background bounds inside tolerance without per-pipeline retuning; if $\Lambda_{\mathrm{eff}}$ is treated thermodynamically, derive it as a conjugate to an effective observer-level four-volume functional of the same $\theta_{\mathrm{sea}}$. | If distance, growth, early-universe, calibration, path-frequency-transfer, pre-BBN branch, stochastic-background, or thermodynamic-$\Lambda_{\mathrm{eff}}$ observables require incompatible Noether sea state records, the cosmology branch has hidden the tension rather than closed it. |
| 2 | Radiation Gate C benchmark closure | Radiation must recover standard electromagnetic and QED-like benchmarks before Noether sea-dependent deviations or cosmology source claims are credible. | [radiation.md](../reactions/radiation.md) now carries a classified closure-target ledger, with channel scaffolds in [bremsstrahlung.md](../reactions/bremsstrahlung.md), [synchrotron.md](../reactions/synchrotron.md), and [reaction-cosmology-provenance-ledger.md](./reaction-cosmology-provenance-ledger.md), but no unified Gate C derivation is complete. | Close Larmor/Lienard recovery, free-free emissivity, synchrotron $\gamma^2B$ and power scaling, pair thresholds, Compton-like scattering, and blackbody detailed balance through one event record, while treating free photon polarization as a Gate B handoff only. | If any benchmark requires per-observable retuning, violates validated limits, or derives free photon polarization outside Gate B, radiation Gate C does not close. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | PMNS oscillation formulas exist; CKM geometry has an overlap/holonomy scaffold and is now tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the present mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, generation-by-shielding is in trouble. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | There is now a decent $4\pi$ story, but not a formal closure proof. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | The color chapter gives a topological argument, but the quantitative baryon-number status remains open. Current PDG 2024 comparison bounds already put representative partial mean lives at $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence, so this is an active null-result gate rather than a qualitative concern. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime, and route every predicted baryon-violating corridor through $\Gamma_{p,c}^{\max}=1/\tau_{c}^{\min}$ in [Failure Criteria](failure-criteria.md). | If the theory predicts generic fast proton decay, or suppresses it by a sector-local parameter not tied to the same color/topology and reaction-provenance ledger that recovers hadron structure, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../nuclear-atomic/nuclear-binding.md) now gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
| 3 | Condensed-matter branch recovery | Materials provide dense, precise tests of whether electron-envelope, lattice, phonon, and Noether sea response variables remain one record instead of becoming probe-specific fits. | [condensed-matter.md](../nuclear-atomic/condensed-matter.md) now states Bloch-band, effective-mass, Fermi-surface, diffraction, phonon, Hall, and topological-response residuals; [constraint-ledger.md](constraint-ledger.md) records the corresponding response gate. No derivation yet computes these objects from the master equation or a settled material branch. | Recover Bloch form, reciprocal-lattice scattering, phonon dynamical matrices, effective mass tensors, Fermi-surface or band-gap classification, Hall sign/plateaux, and no-drag transport from one declared material branch and Noether sea state record. | If band curvature, lattice stiffness, diffraction peaks, Hall response, and transport relaxation require independent response maps, or if resistance is explained by ordinary Noether sea drag below the transport threshold, the material-response program has split from the main ontology. |
| 3 | Strong-field / black-hole closure | Strong-field claims are distinctive and therefore risky. | The alignment framing exists, but the predictive map is not yet broad. | Derive concrete departures near the alignment regime while preserving weak-field success. | If the strong-field story contradicts weak-field closure or observed compact-object data, it must be revised. |

## Highest-Leverage Cluster

The top credibility cluster is:

1. weak `V-A`,
2. preferred-frame hiding,
3. Born-rule emergence,
4. weak-field GR recovery.

Those four form the present hard gate because each one touches a major validated pillar of modern physics:

- electroweak structure,
- Lorentz hiding,
- quantum statistics,
- and relativistic gravity phenomenology.

A cross-cutting null-result discipline now sits over that cluster. A proposed closure may not buy unification by adding hidden sectors whose only role is to disappear below proton-stability, collider, precision-symmetry, preferred-frame, or cosmology bounds. The residual $\mathcal{R}_{\mathrm{null}}(\theta)$ in [Failure Criteria](failure-criteria.md#null-result-residual-for-added-channels) must vanish using the same shared record that passes the positive recovery gates.

The strict implementation is to treat each elegant symmetry package as a joint positive-and-absence record: the same $\theta$ that recovers the Standard-Model-facing rows must also set each extra-channel observable $O_e(\theta)$ to zero or below its validated bound.

If those remain open, the framework can still be a promising substrate program, but not yet a closed replacement architecture.

## Interdependence Map

Several tensions are linked and should not be treated as isolated tasks.

### Weak sector cluster

The weak-selection problem, right-handed neutrino stance, CKM/PMNS closure, weak-corridor provenance, and the quark misalignment parameter $\alpha$ all belong to the same electroweak geometry stack. The current synthesis is that these are readouts of one weak-coupling-triad exposure problem: axial-frame branch selection determines what can be exposed, the `V-A` operator determines which handedness can dock, the overlap integrals determine mixing weights, and the reaction ledger determines where the corridor payload and outgoing Noether braid provenance enter and exit. A clean derivation of one should now constrain the others rather than leaving them as independent stories.

The neutrino branch of this cluster has four empirical decision handles: the lightest-neutrino mass, the mass sum $\sum_i m_i$, neutrinoless double-beta limits or detection, and any evidence for a sterile or right-handed singlet. These data products should decide between the current minimal near-photon neutral-pair stance, a sterile $\nu_R$ branch, or a lepton-number-violating provenance channel. They should not be used to rewrite the charged-fermion axial-layer rule or to import a sterile dark-matter interpretation before the PMNS, reaction, BBN, CMB, and structure-formation gates are simultaneously satisfied.

A useful benchmark-only sharpening is the package $m_{\mathrm{lightest}}\to0$, $\sum_i m_i\approx0.06\,\mathrm{eV}$, suppressed neutrinoless double-beta rate, and any sterile or right-handed singlet behaving as cold collisionless matter only after the neutral-sector and cosmology gates close. These values should be treated as discriminator targets, not as adopted ontology: they can rank the neutral-lepton branches, but they cannot bypass the PMNS Hamiltonian, reaction provenance, BBN, CMB, structure-formation, and null-result residuals.

### Quantum cluster

Superposition, measurement, Born-rule emergence, and Bell/nonlocality closure are one package. A good ontology chapter without a basin-measure derivation is progress, but not endpoint closure.

Penrose-Diosi gravitational-collapse tests are an external benchmark for the same finite-time threshold-resolution burden, not an adopted ontology. The comparison uses the gravitational self-energy of the difference between two mass distributions,
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(\mathbf{x})(\rho_1-\rho_2)(\mathbf{y})}
{\|\mathbf{x}-\mathbf{y}\|}\,d^3x\,d^3y
$$
with the collapse-time estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$
The useful comparison pressure is the tension between local free-fall equivalence and linear superposition when the two branches carry measurably different mass distributions. The validation burden is to compare $\tau_{\text{meas}}$ for massive-superposition records, including BEC-scale spatial superpositions of roughly $10^9$ to $10^{10}$ atoms, against $\tau_G$ and against ordinary environmental decoherence, while preserving the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim that branch selection is finite-time threshold resolution rather than fundamental gravitational collapse. Any collapse variant that predicts persistent spontaneous heating must also pass low-background and compact-object heating bounds before it can serve even as a comparison baseline.

### Spacetime cluster

Preferred-frame hiding, redshift, Shapiro delay, lensing, gravitational-wave speed, and the long-distance quantum correction to Newtonian gravity are all readouts of the same observer-level constitutive map. Thermodynamic-gravity closure belongs in the same cluster because area scaling, local horizon temperature, and nonequilibrium breakdown define whether the constitutive picture is merely suggestive or genuinely explanatory. Low-energy quantum-gravity EFT is kept here as a recovery benchmark, not as a commitment that the effective metric is microscopic ontology. These issues rise or fall together.

### Reaction-cosmology cluster

Radiative planar-mode nucleation, pair-production provenance, BBN photon loading, CMB blackbody recovery, signed path-frequency exchange, and redshift handoff form one closure cluster when cosmology is read through SMBH-local recycling and Noether sea transport. A local source story is not enough; the same provenance record must carry architrino inventory, energy-momentum, thermalization depth, photon-frequency transfer, and observer-level comparison variables without changing the Noether sea state map between channels.

Pre-BBN comparison branches belong to this same cluster. They can add value only as stress tests on the shared record: light-element yields, $N_{\text{eff}}$, CMB acoustic and lensing products, matter power, and stochastic gravitational-wave bounds must all be projections of the same Noether sea history. If the branch is kept alive by independent hiding assumptions, it is a null-result failure rather than a productive extension.

### Radiation benchmark checks

Radiation Gate C closure is validated only if the same event record passes the following classified checks. These checks are not alternate ontologies; they are benchmark recoveries that prevent source-channel language from outrunning the photon and reaction ledgers.

| Check | Class | Required validation | Failure signal |
| --- | --- | --- | --- |
| Radiative event record | ontology | Record routed closure residuals, planar-mode photon output when present, non-photon shedding channels, recoil, local Noether sea state, and conservation ledgers. | Radiation is treated as primitive field emission or as untracked energy loss. |
| Larmor/Lienard recovery | derivation target | Recover $P\propto\|\mathbf{a}\|^2$ in the weak nonrelativistic limit and the Larmor/Lienard observer-level power/angular behavior after clock conversion. | Low-speed power is not quadratic in acceleration, or relativistic recovery needs a separate fit. |
| Bremsstrahlung emissivity | derivation target | Recover $d\sigma/dk$, screening/form-factor corrections, $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$, and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T^{1/2}$ in LTE. | Cross-section and emissivity require incompatible Noether sea variables or plasma-specific hidden fits. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling breaks from one effective magnetic-state map. | The $\gamma^2$ frequency scaling is absent, or the $B$ map changes between curvature and emission. |
| Pair thresholds | derivation target | Recover $s\ge4m_e^2c^4$ and the angle-dependent photon-photon threshold while preserving architrino inventory and pair provenance. | Pair channels imply creation from nothing, wrong thresholds, or unbalanced Noether braid recruitment. |
| Compton-like scattering | derivation target | Recover the Compton shift, Thomson limit, Klein-Nishina correction, recoil, and outgoing photon provenance in one Gate C vertex. | The channel becomes phenomenological frequency loss without a closed recoil and photon ledger. |
| Aharonov-Bohm phase | derivation target | Recover a relative phase proportional to enclosed magnetic flux while the local force channel on the interferometer arms vanishes, using the same effective U(1) connection and photon/action ledger as the rest of Gate C. | The phase requires a local force on the arms, an independent phase fit, or a literal gauge-potential ontology rather than a derived effective connection. |
| Blackbody recovery | derivation target | Recover Planck occupation, zero effective photon chemical potential, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff without retuning the Noether sea map. | The CMB or thermal branch needs unbalanced photon loading, per-observable retuning, or incompatible transport assumptions. |
| Free photon polarization boundary | derivation target | Use Gate B records for transverse modes, helicity, Malus' law, and analyzer statistics; radiation and cosmology pages may only consume that handoff. | Any radiation channel derives free photon polarization locally, adds a free longitudinal mode, or treats Gate B as already proven. |
| Noether sea-dependent deviations | speculation | State a benchmark-preserving limit and a measurable residual before promoting any $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, or threshold-floor effect. | A deviation is used to repair a failed standard recovery or is fitted separately per observable. |

## Ontology Watchlist

The foundational ontology hub now keeps only stable commitments. Open questions that used to live there are tracked here or in the relevant branch chapters:

- **Deterministic branch selection:** close the rule for active causal roots, weighted sums, phase-sensitive thresholding, and basin selection in [Master Equation](../dynamics/master-equation.md) and [Binary Dynamics](../dynamics/binary-dynamics.md). The working hypothesis remains deterministic multistability, with apparent randomness coming from chaotic sensitivity to microstate and wake history.
- **Polarity unit and coupling scale:** explain $\epsilon=|e|/6$ and close $\kappa$ through [Parameter Ledger](parameter-ledger.md), [Architrino SI Base Units](architrino-si-base-units.md), and the charge-mapping chapters. The unresolved question is whether six-site nested shell braid organization derives the $\epsilon$ unit, and whether $\kappa$ is related to $\epsilon$, $c_f$, $\hbar$, or Planck-alignment quantities rather than being independently postulated.
- **Quantum ontology:** keep wavefunction status, decoherence, and Born-rule recovery in [Wavefunction Ontology](../quantum/wavefunction-ontology.md), [Measurement Ontology](../quantum/measurement-ontology.md), and the Born-rule tension above. Decoherence still needs a stance on whether its irreversibility is fundamental in the Noether sea environment or practical because reversal is dynamically inaccessible to Physical Observers.
- **Symmetry and conservation:** close CPT stance, baryon-number status, and proton-stability regime through the particle and interaction chapters. The unresolved CPT issue is treated as a replacement constraint in [No-Go Theorems](no-go-theorems.md#applicability-map): the standard proof assumes local relativistic QFT, while this framework uses absolute time and delayed substrate dynamics, so the corpus must preserve tested CPT-facing observables without importing those assumptions as ontology.
- **Cosmological history:** keep beginning/eternity and initial-condition questions in [Cosmology Ontology](../cosmology/cosmology-ontology.md), [Expansion Mechanism](../cosmology/expansion-mechanism.md), and related cosmology modules. If the background is eternal, the theory still owes a large-scale homogeneity and isotropy account, including a scale-neutral residual comparing dimensionless pair-separation distributions across large windows; if it has an initialization boundary, it owes an architrino-distribution account.
- **Unification claim:** treat "all forces from nested shell braid geometry and Noether sea dynamics" as a closure program, not as a primitive ontology statement. The qualitative structure exists across interaction chapters, but quantitative derivations remain the acceptance gate.

## Acceptance Principle

The framework should be judged by the intersection of its surviving closure sets:
$$
\mathcal{C}_{\mathrm{weak}}
\cap
\mathcal{C}_{\mathrm{quantum}}
\cap
\mathcal{C}_{\mathrm{gravity}}
\cap
\mathcal{C}_{\mathrm{hadronic}}
\cap
\mathcal{C}_{\mathrm{radiation}}
\cap
\mathcal{C}_{\mathrm{cosmology}}
\neq \varnothing
$$

If that intersection becomes empty after quantitative work is done, the present implementation is rejected even if many individual chapters remain suggestive. The detailed sector predicates, benchmark tolerances, and promotion-fiber test are recorded in [Failure Criteria](failure-criteria.md).

## Related Chapters

- [constraint-ledger.md](./constraint-ledger.md)
- [closure-scorecard.md](./closure-scorecard.md)
- [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md)
- [../spacetime/general-relativity.md](../spacetime/general-relativity.md)
- [../quantum/measurement-ontology.md](../quantum/measurement-ontology.md)
