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
| 1 | Weak `V-A` selection rule | The weak interaction must distinguish left-chiral fermions from right-chiral ones. | [quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) gives a geometric lock-out story, and [weak-mixing-ckm.md](../theory-bridges/weak-mixing-ckm.md) now identifies this as part of the shared weak-coupling-triad exposure problem, but no operator derivation is complete. | Derive a docking or coupling operator that exposes the weak-coupling triad for left-handed charged-current coupling, hides it for right-handed charged-current coupling, and then reuses the same domain for CKM/PMNS overlap and weak-reaction provenance. | If right-handed neutrino or right-handed charged-fermion coupling to `W` is not strongly suppressed in the same regime, or if the exposure domain must be redefined separately for mixing and provenance, the current weak-sector picture fails. |
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](./constraint-ledger.md), and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) now states the moving-assembly coefficient targets, but the full attractor proof is not complete. | Show that effective clocks, rulers, and signal transport suppress measurable preferred-frame effects below current experimental bounds by deriving the coupled shape law $L_{\parallel}=L_0/\gamma$, clock law $T=\gamma T_0$, and two-way anisotropy bounds from delayed causal closure. | Any robust preferred-frame signal above the recorded bounds, or any need to tune clock and ruler coefficients independently, falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../quantum/wavefunction-ontology.md) and [measurement-ontology.md](../quantum/measurement-ontology.md) fix the ontology, but not the derivation. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation. | If the deterministic closure produces a non-Born weighting in validated regimes, the current quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface now exists in [gr-phenomenology.md](../spacetime/gr-phenomenology.md) and [ppn-parameters.md](../spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one reusable parameter set for the weak-field metric map. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](./parameter-ledger.md) now organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../spacetime/emergent-metric.md) now states the medium-first picture, but no quantitative entropy-area or Unruh derivation is in place. | Show that the Noether Sea admits an area-scaling entropy channel, a local Rindler/Unruh recovery in the appropriate limit, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires the thermodynamic language but the medium cannot supply area scaling, local horizon temperature, or a coherent nonequilibrium boundary, the present gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, and thermalization. | [reaction-cosmology-provenance-ledger.md](./reaction-cosmology-provenance-ledger.md) defines the shared ledger, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation or pair channel through thermalization to a BBN or CMB observable, using the same Noether-Sea state variables throughout. | If BBN photon loading or CMB blackbody recovery requires unbalanced substrate creation, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | PMNS oscillation formulas exist; CKM geometry has an overlap/holonomy scaffold and is now tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the present mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, generation-by-shielding is in trouble. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | There is now a decent $4\pi$ story, but not a formal closure proof. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | The color chapter gives a topological argument, but the quantitative baryon-number status remains open. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime. | If the theory predicts generic fast proton decay, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../nuclear-atomic/nuclear-binding.md) now gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
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

If those remain open, the framework can still be a promising substrate program, but not yet a closed replacement architecture.

## Interdependence Map

Several tensions are linked and should not be treated as isolated tasks.

### Weak sector cluster

The weak-selection problem, right-handed neutrino stance, CKM/PMNS closure, weak-corridor provenance, and the quark misalignment parameter $\alpha$ all belong to the same electroweak geometry stack. The current synthesis is that these are readouts of one weak-coupling-triad exposure problem: axial-frame branch selection determines what can be exposed, the `V-A` operator determines which handedness can dock, the overlap integrals determine mixing weights, and the reaction ledger determines where the corridor payload and outgoing Noether core provenance enter and exit. A clean derivation of one should now constrain the others rather than leaving them as independent stories.

### Quantum cluster

Superposition, measurement, Born-rule emergence, and Bell/nonlocality closure are one package. A good ontology chapter without a basin-measure derivation is progress, but not endpoint closure.

### Spacetime cluster

Preferred-frame hiding, redshift, Shapiro delay, lensing, and gravitational-wave speed are all readouts of the same observer-level constitutive map. Thermodynamic-gravity closure belongs in the same cluster because area scaling, local horizon temperature, and nonequilibrium breakdown define whether the constitutive picture is merely suggestive or genuinely explanatory. These issues rise or fall together.

### Reaction-cosmology cluster

Radiative planar-mode nucleation, pair-production provenance, BBN photon loading, CMB blackbody recovery, and redshift handoff form one closure cluster when cosmology is read through SMBH-local recycling and Noether-Sea transport. A local source story is not enough; the same provenance record must carry architrino inventory, energy-momentum, thermalization depth, and observer-level comparison variables without changing the Noether-Sea state map between channels.

## Ontology Watchlist

The foundational ontology hub now keeps only stable commitments. Open questions that used to live there are tracked here or in the relevant branch chapters:

- **Deterministic branch selection:** close the rule for active causal roots, weighted sums, phase-sensitive thresholding, and basin selection in [Master Equation](../dynamics/master-equation.md) and [Binary Dynamics](../dynamics/binary-dynamics.md). The working hypothesis remains deterministic multistability, with apparent randomness coming from chaotic sensitivity to microstate and wake history.
- **Polarity unit and coupling scale:** explain $\epsilon=|e|/6$ and close $\kappa$ through [Parameter Ledger](parameter-ledger.md), [Architrino SI Base Units](architrino-si-base-units.md), and the charge-mapping chapters. The unresolved question is whether six-site tri-binary organization derives the $\epsilon$ unit, and whether $\kappa$ is related to $\epsilon$, $c_f$, $\hbar$, or Planck-alignment quantities rather than being independently postulated.
- **Quantum ontology:** keep wavefunction status, decoherence, and Born-rule recovery in [Wavefunction Ontology](../quantum/wavefunction-ontology.md), [Measurement Ontology](../quantum/measurement-ontology.md), and the Born-rule tension above. Decoherence still needs a stance on whether its irreversibility is fundamental in the Noether-Sea environment or practical because reversal is dynamically inaccessible to Physical Observers.
- **Symmetry and conservation:** close CPT stance, baryon-number status, and proton-stability regime through the particle and interaction chapters. The unresolved CPT issue is sharpened by the fact that the standard proof assumes local relativistic QFT, while this framework uses absolute time and delayed substrate dynamics.
- **Cosmological history:** keep beginning/eternity and initial-condition questions in [Cosmology Ontology](../cosmology/cosmology-ontology.md), [Expansion Mechanism](../cosmology/expansion-mechanism.md), and related cosmology modules. If the background is eternal, the theory still owes a large-scale homogeneity and isotropy account; if it has an initialization boundary, it owes an architrino-distribution account.
- **Unification claim:** treat "all forces from tri-binary geometry and Noether-Sea dynamics" as a closure program, not as a primitive ontology statement. The qualitative structure exists across interaction chapters, but quantitative derivations remain the acceptance gate.

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
\neq \varnothing.
$$

If that intersection becomes empty after quantitative work is done, the present implementation is rejected even if many individual chapters remain suggestive.

## Related Chapters

- [constraint-ledger.md](./constraint-ledger.md)
- [closure-scorecard.md](./closure-scorecard.md)
- [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md)
- [../spacetime/gr-phenomenology.md](../spacetime/gr-phenomenology.md)
- [../quantum/measurement-ontology.md](../quantum/measurement-ontology.md)
