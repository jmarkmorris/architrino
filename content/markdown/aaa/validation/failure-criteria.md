# Failure Criteria

This chapter states the hard-stop conditions for $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish ordinary incompleteness from genuine failure modes, especially where a local success in one sector cannot survive the shared closure intersection. A closure attempt is a proposed derivation of an accepted observer-level result from the substrate primitives, and a closure record is the complete set of assumptions, branch data, ledgers, and tolerances that the attempt consumes. A sector is one benchmark domain, such as weak reactions or cosmology, with its own accepted observations. Promotion is the step that accepts a closure record as part of the theory rather than as a local result, and a gate is a condition a record must pass before that step. Every rejection below names the gate it fails.

Its operational companions are [Validation Protocols](validation-protocols.md), [No-Go Theorems](no-go-theorems.md), [Known Tensions](known-tensions.md), [Lorentz Kinematics](../spacetime/lorentz-kinematics.md), [Proper Time and Time Dilation](../spacetime/proper-time-and-time-dilation.md), and [Absolute Time Defense](../foundations/absolute-time-defense.md).

## Shared Closure Record

Let

$$
\mathfrak{S}
=
\{
\mathrm{weak},
\mathrm{quantum},
\mathrm{gravity},
\mathrm{hadronic},
\mathrm{radiation},
\mathrm{cosmology}
\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae0906211b8f859b)

be the sector set. A candidate promoted closure is a record $\theta$ in the space $\mathfrak{X}$ of candidate closure records, whose shared coordinates include

$$
\theta_{\mathrm{join}}
=
\left(
A,
\Gamma,
\mathcal{H},
\mathcal{R},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\zeta,
\mathcal{M}_{\mathrm{sea}}^{ab},
\{B_i\}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dec17fd95fce165f)

where $A$ is the assembly or branch family, $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{R}$ is the active residual family, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\zeta$ is shielding or exposure data, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether sea response object, and $\{B_i\}$ is the basin or channel partition. Sector-local coordinates $Z_S(\theta)$ record the benchmark variables, theorem assumptions, provenance entries, and tolerances used by sector $S$. The space $\mathfrak{X}$ is the set of all such records: every $\theta\in\mathfrak{X}$ carries the shared coordinates $\theta_{\mathrm{join}}$ together with the sector-local coordinates $Z_S(\theta)$ for every sector $S\in\mathfrak{S}$.

For each sector $S$, fix a gate predicate $P_S:\mathfrak{X}\to\{0,1\}$, a benchmark map $\mathcal{B}_S:\mathfrak{X}\to\mathfrak{B}_S$ into the sector's benchmark space $\mathfrak{B}_S$, a validated benchmark region $\mathfrak{B}^{\mathrm{obs}}_S\subseteq\mathfrak{B}_S$, a benchmark metric $d_S$, a finite nonnegative tolerance $0\le\epsilon_S<\infty$, and a no-go pass predicate $\mathcal{G}_S:\mathfrak{X}\to\{0,1\}$. The gate predicate returns $1$ when the record supplies the sector's required structure, as listed in the Sector Acceptance Sets below. The no-go predicate returns $1$ only when every exclusion record of [No-Go Theorems](no-go-theorems.md) that applies to sector $S$ is satisfied and every predicted non-baseline channel whose null data product lies in the sector's comparison domain passes the null-result residual defined below; the null-result gate therefore enters the sector sets through $\mathcal{G}_S$ rather than as a separate rule. Define the distance from a benchmark point to the validated region by

$$
\operatorname{dist}_{d_S}(b,\mathfrak{B}^{\mathrm{obs}}_S)
=
\inf_{b'\in\mathfrak{B}^{\mathrm{obs}}_S}d_S(b,b')
$$

[View →](../../../../equation-mapping.html#corpus-equation-ff05dd41fc1da9a3)

Here $b$ is a benchmark point, $b'$ ranges over the validated region, and the infimum is the smallest separation the metric $d_S$ assigns between them. The distance is zero exactly when $b$ lies in the closure of the validated region, and it is infinite when that region is empty, so an undeclared benchmark region fails every record. The sector acceptance set is the mathematical subset

$$
\mathcal{C}_S
=
\left\{
\theta\in\mathfrak{X}
:
P_S(\theta)=1,\quad
\operatorname{dist}_{d_S}\!\left(\mathcal{B}_S(\theta),\mathfrak{B}^{\mathrm{obs}}_S\right)
\le
\epsilon_S,\quad
\mathcal{G}_S(\theta)=1
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4e2ee8e8c2cc7a0)

A record belongs to $\mathcal{C}_S$ when three conditions hold together: the sector predicate passes, the benchmark image lies within the tolerance $\epsilon_S$ of the validated region, and the no-go predicate passes. The shared acceptance intersection is

$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\bigcap_{S\in\mathfrak{S}}\mathcal{C}_S
$$

[View →](../../../../equation-mapping.html#corpus-equation-297152e984480f6c)

A closure attempt survives the validation gate only as an element of $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$. A sector result that lies in one $\mathcal{C}_S$ but in no element of the full intersection remains a local result rather than a promoted $\mathbb{A}\mathbb{A}\mathbb{A}$ closure.

### Residual-Bearing Criticism

A proposed failure claim must name the coordinate in $\theta_{\mathrm{join}}$, the sector predicate $P_S$, the benchmark distance, the no-go predicate $\mathcal{G}_S$, or the residual family $\mathcal{R}$ that it changes. Generic skepticism that leaves the closure record and every residual unchanged is not a closure-blocking condition. It may remain a comparison concern, but it does not promote to a validation failure until it moves an existing gate.

Let $q$ be a proposed criticism of a candidate record $\theta$. The notation $P_S(\theta;q)$, $\mathcal{B}_S(\theta;q)$, and $\mathcal{G}_S(\theta;q)$ means that the corresponding sector gate has been re-evaluated after applying the claimed change. Then $q$ can block promotion only if

$$
\left[
\exists S\in\mathfrak{S}:P_S(\theta;q)=0
\right]
\lor
\left[
\exists S\in\mathfrak{S}:
\operatorname{dist}_{d_S}\!\left(\mathcal{B}_S(\theta;q),\mathfrak{B}^{\mathrm{obs}}_S\right)
>
\epsilon_S
\right]
\lor
\left[
\exists S\in\mathfrak{S}:\mathcal{G}_S(\theta;q)=0
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-3cf57c3864ae23fe)

This rule does not make the validation suite less severe. It prevents a residual-bearing closure record from being rejected by a criticism that has not identified which accepted observable, mathematical consistency condition, or no-go assumption has actually changed.

### Null-Result Residual for Added Channels

When a closure attempt predicts channels outside the validated Standard Model and GR-facing benchmark set, those channels must be tested against null results before the record can be promoted. Let $\mathfrak{E}_{\theta}^{\mathrm{new}}$ be the set of predicted additional channels for a candidate record $\theta$: unstable baryon channels, new charged or neutral partners, extra gauge or transport modes, preferred-frame leakage channels, or other non-baseline outputs that would have produced an observed rate, cross-section, lifetime shift, branching ratio, dispersion, or anisotropy. For each channel $e$, let $O_e(\theta)\ge0$ be a calibrated scalar statistic of the predicted observable and $O_e^{\max}>0$ the accepted upper bound in the comparison regime. Define

$$
\mathcal{R}_{\mathrm{null}}(\theta)
=
\sup_{e\in\mathfrak{E}_{\theta}^{\mathrm{new}}}
\left[
\log\frac{O_e(\theta)}{O_e^{\max}}
\right]_+,
\qquad
[x]_+\equiv\max(x,0)
$$

[View →](../../../../equation-mapping.html#corpus-equation-faae5e242e82d710)

The bracket $[x]_+$ keeps only the positive excess, so a channel contributes only when its predicted observable exceeds its bound, and a channel predicted absent, with $O_e(\theta)=0$, contributes nothing. The logarithm makes the residual a dimensionless logarithmic excess, which is why the bound must be strictly positive; a bound stated as a lower limit on a lifetime is first converted to a rate ceiling, as in the proton case below. Signed or vector observables first require a declared nonnegative comparison statistic, or componentwise upper-bound tests with their respective calibrations. Search exclusions on masses and couplings instead define an accepted region in the joint parameter space; a lower mass limit is not an upper bound on mass. Such a search enters this scalar residual through its calibrated nonnegative exclusion statistic and threshold, or directly through the sector benchmark region. The observable vectors below list inputs to those comparisons, not vectors to divide by one scalar bound. When the record predicts no additional channel, $\mathfrak{E}_{\theta}^{\mathrm{new}}=\varnothing$ and the residual is zero by convention. A promoted record must satisfy

$$
\mathcal{R}_{\mathrm{null}}(\theta)=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-8936ac4a31efb763)

using the same shared coordinates $\theta_{\mathrm{join}}$ that recover the positive benchmarks. Because each sector's no-go predicate $\mathcal{G}_S$ carries this condition for the channels tested in its comparison domain, $\mathcal{R}_{\mathrm{null}}(\theta)=0$ is a necessary condition for membership in $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$; the residual-bearing disjunction above reaches it through its third clause, and the Promotion Lemma below inherits it through the extension fiber. A channel may avoid this gate only by being outside the validated comparison domain, by being an exactly unobservable gauge redundancy, or by being proven absent in the accepted branch family. It is not enough to add a large symmetry, partner family, hidden transport dimension, or unstable reaction corridor and then tune it below every bound with sector-specific parameters.

For symmetry-container comparisons, the extra-sector test is part of the positive claim rather than a later cleanup. If a larger algebra, hidden sector, or partner family is invoked to explain one observed pattern, every non-baseline channel it brings into the tested domain must either be exactly redundant, absent in the accepted branch family, or routed through the same $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ record that recovered the observed pattern.

#### Operational Null-Result Ledger

For audits and simulations, the same condition should be expanded into a channel ledger rather than left as a single symbol. Let $\theta_+$ denote the record used for the positive Standard-Model, GR, quantum, and cosmology benchmarks, and let $\theta_e$ denote the record used to suppress a predicted non-baseline channel $e$. Define the shared-record split
$$
\Delta_{\mathrm{shared}}(e;\theta)
=
\operatorname{dist}_{\mathrm{shared}}\!\left(
\pi_{\mathrm{shared}}\theta_e,
\pi_{\mathrm{shared}}\theta_+
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba8fc2bca7b714c9)

where $\pi_{\mathrm{shared}}$ keeps the common Noether sea, assembly, weak-exposure, metric, and provenance coordinates consumed by both the positive benchmark and the null channel, and $\operatorname{dist}_{\mathrm{shared}}$ is a declared metric on those shared coordinates. In a consistent audit both sub-records are the candidate itself, $\theta_e=\theta_+=\theta$, and the split vanishes; the split is nonzero only when the audit trail shows that the positive benchmark and the channel suppression consumed different shared coordinates. The operational audit residual is
$$
\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)
=
\sup_{e\in\mathfrak{E}_{\theta}^{\mathrm{new}}}
\left(
\left[
\log\frac{O_e(\theta)}{O_e^{\max}}
\right]_+
+
\lambda_{\mathrm{split}}\Delta_{\mathrm{shared}}(e;\theta)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-563febb2371718fa)

Here $\lambda_{\mathrm{split}}>0$ is a declared weight, fixed before the audit, that places the shared-record split on the same dimensionless scale as the logarithmic excess. Both summands are nonnegative and the weight is strictly positive, so $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$ holds exactly when every channel satisfies its bound and every split vanishes; a zero weight would silently drop the split condition. Requiring $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$ therefore implies the original promotion condition $\mathcal{R}_{\mathrm{null}}(\theta)=0$ and adds a second one. This form rejects a second failure mode: a channel can be numerically hidden but still fail because its suppression uses a different shared record from the one that fit the observed sector. The no-go predicates carry this operational form: $\mathcal{G}_S(\theta)=1$ requires the summand to vanish for every channel $e$ whose null data product lies in sector $S$'s comparison domain.

| Added-channel family | Example observable $O_e(\theta)$ | Null data product | Same-record requirement |
| --- | --- | --- | --- |
| Mirror matter or added charged partners | production cross-section, branching ratio, stable relic abundance | collider exclusions, precision electroweak fits, cosmological abundance bounds | the axial-layer and gauge-representation record that yields observed fermions must also exclude the partner branch |
| Superpartners or large symmetry partners | missing-energy rate or calibrated search-exclusion statistic depending on partner mass and couplings | collider missing-energy and resonance searches | partner absence must follow from the accepted branch family, not from an independent mass threshold |
| Proton-instability or baryon-violating corridors | $\Gamma_p(\theta)$ or forbidden nuclear transition rate | proton-lifetime and rare-event limits | the same color/topology and reaction-provenance ledger used for hadrons must suppress the channel |
| Extra gauge bosons or gauge modes | resonance rate, precision-contact term, long-range force strength | collider, fifth-force, and precision-scattering bounds | the effective gauge residual must recover $U(1)_Y\times SU(2)_L\times SU(3)_c$ without an unsuppressed added mode |
| Magnetic-charge or monopole sectors | monopole event rate, effective magnetic-charge flux, stable relic abundance, long-range magnetic-charge force | monopole-search, collider, cosmic-ray, and cosmological abundance bounds | the same effective gauge record that recovers electric charge, loop phase, and electromagnetic force must prove the magnetic-charge sector absent, redundant, or below bounds |
| Hidden transport or extra propagation modes | dispersion, birefringence, scalar/vector gravitational-wave response | photon, gravitational-wave, and timing residuals | the same Noether sea response map must set clock, signal, and metric channels |
| Sterile or neutral partner branches | mixing angle, $\Delta N_{\mathrm{eff}}$, relic abundance, free-streaming scale | oscillation, BBN, CMB, and structure-formation bounds | the neutral-sector Hamiltonian and cosmology record must be shared |
| Preferred-frame leakage channels | two-way anisotropy, clock drift, PPN preferred-frame coefficients | resonator, atomic-clock, solar-system, and gravitational-wave timing bounds | the Lorentz-closure map must suppress leakage without retuning clock, ruler, or signal coefficients |

For the hidden-transport family, polarization-dependent group delay is a direct null-result specialization rather than a new ontology. If $v_+(\omega,\hat{\mathbf{k}};\theta)$ and $v_-(\omega,\hat{\mathbf{k}};\theta)$ are the two physical photon-polarization propagation speeds extracted from the same record $\theta$, meaning the group speeds of the two polarization states of the photon assembly at angular frequency $\omega$ and propagation direction $\hat{\mathbf{k}}$, whose common nondispersive value is the photon-channel transport speed $c_\gamma$, define
$$
\mathcal{R}_{\mathrm{biref}}(\theta)
=
\sup_{\omega,\hat{\mathbf{k}}}
\left|
\frac{
v_+(\omega,\hat{\mathbf{k}};\theta)
-
v_-(\omega,\hat{\mathbf{k}};\theta)
}{c_0}
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-be440df4c80c8d28)

The retained symbol $\mathcal{R}_{\mathrm{biref}}$ measures differential group transport only. The residual is the largest fractional speed difference between the two polarizations, normalized by $c_0$, the asymptotic observer-sector speed calibration used in weak-field comparisons; the supremum runs over the frequencies and directions of the declared comparison regime, not over frequencies outside the tested domain. Equal group speeds do not imply equal phase speeds: $k_\pm(\omega)=\omega/c_\gamma\pm\kappa_0$ have equal derivatives $dk_\pm/d\omega$ but accumulate relative phase $2\kappa_0L$ over distance $L$, where $\kappa_0$ is a constant inverse length. A claim about phase birefringence or polarization rotation therefore also requires its separately calibrated phase/polarization comparison on the same record. The photon/effective-metric record can be promoted only when $\mathcal{R}_{\mathrm{biref}}(\theta)\le\epsilon_{\mathrm{biref}}$ in the declared weak homogeneous regime and when the same $\theta$ also supplies the clock, ruler, signal, and metric coefficients used for the positive GR-facing benchmarks. If birefringence is numerically hidden by switching to a different channel record than the one used for lensing, Shapiro delay, spectra, or photon synchronization, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ fails even if the split is individually small.

#### Null-Result Ownership Matrix

The following matrix assigns each recurring null-result family to the corpus homes that should carry the positive derivation and the absence proof. The owner document does not need to reproduce every experimental limit; it must state the observable $O_e(\theta)$, name the comparison bound $O_e^{\max}$, and route the channel through $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ when the channel is predicted.

| Channel family | Observable vector | Bound symbol | Primary owner | Supporting gates |
| --- | --- | --- | --- | --- |
| Mirror matter / added charged fermions | $(\sigma_{\mathrm{prod}},B_{\mathrm{vis}},\Omega_{\mathrm{relic}})$ | $O_{\mathrm{mirror}}^{\max}$ | [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md) | [Gauge Symmetries](../assemblies/gauge-symmetries.md), [Known Tensions](known-tensions.md) |
| Superpartners / symmetry partners | $(\sigma_{\mathrm{miss}},m_{\mathrm{partner}},B_{\mathrm{cascade}})$ | $O_{\mathrm{partner}}^{\max}$ | [Gauge Symmetries](../assemblies/gauge-symmetries.md) | [Theory Differentials](../philosophy-history/theory-differentials.md), [No-Go Theorems](no-go-theorems.md) |
| Proton-instability corridors | $(\Gamma_p,B_{p\to e^+\pi^0},B_{p\to\bar\nu K^+})$ | $\Gamma_p^{\max}$ | [Color Charge SU(3)](../assemblies/fermions/color-charge-su3.md) | [Reaction Ledger](reaction-ledger.md), [Known Tensions](known-tensions.md) |
| Extra gauge bosons / gauge modes | $(\sigma_{Z'},\sigma_{W'},g_{\mathrm{new}},\Delta_{\mathrm{contact}})$ | $O_{\mathrm{gauge+}}^{\max}$ | [Gauge Symmetries](../assemblies/gauge-symmetries.md) | [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md), [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) |
| Magnetic-charge / monopole sectors | $(R_m,Q_{m,\mathrm{eff}},\mathcal{F}_{m,\mathrm{eff}},\Omega_{\mathrm{mon}})$ | $O_m^{\max}$ | [Gauge Structure Emergence](../assemblies/gauge-structure-emergence.md) | [Gauge Symmetries](../assemblies/gauge-symmetries.md), [Constraint Ledger](constraint-ledger.md) |
| Hidden transport / extra propagation modes | $(\Delta v/c,\omega_{\mathrm{disp}},h_{\mathrm{scalar}},h_{\mathrm{vector}})$ | $O_{\mathrm{transport}}^{\max}$ | [Constraint Ledger](constraint-ledger.md) | [Observer Framework](../spacetime/observer-framework.md), [PPN Parameters](../spacetime/ppn-parameters.md) |
| Sterile / neutral partner branches | $(\theta_{\mathrm{mix}},\Delta N_{\mathrm{eff}},\Omega_{\nu_R},\lambda_{\mathrm{fs}})$ | $O_{\mathrm{sterile}}^{\max}$ | [Neutrinos](../assemblies/fermions/neutrinos.md) | [Dark Matter](../cosmology/dark-matter.md), [CMB](../cosmology/CMB.md) |
| Preferred-frame leakage | $(\Delta_{\mathrm{tw}},\delta\nu/\nu,\alpha_1,\alpha_2,\alpha_3)$ | $O_{\mathrm{LV}}^{\max}$ | [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) | [PPN Parameters](../spacetime/ppn-parameters.md), [Constraint Ledger](constraint-ledger.md) |

For proton-instability corridors, convert every current partial-mean-life lower limit $\tau_c^{\min}$ into a channel-rate ceiling
$$
\Gamma_{p,c}^{\max}=\frac{1}{\tau_c^{\min}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3bddeffcc50cf81)

Here $\Gamma_{p,c}$ is the partial rate of the proton into channel $c$, the product of its total reaction rate and the channel's branching fraction $B_c$, and $\tau_c^{\min}$ is the experimental lower limit on the partial mean life $\tau/B_c$. A lower limit on the partial mean life is therefore exactly an upper limit on the partial rate, which is the form the residual consumes. The current benchmark scale is already severe: the 2024 Particle Data Group listing gives $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and $\tau/B(p\to\bar\nu K^+)>5.9\times10^{33}\,\mathrm{yr}$, each at 90% confidence; see Sources below. These numbers are comparison anchors, not permanent constants; a closure packet should cite the current experimental source when the hadronic gate is evaluated.

## Sector Acceptance Sets

The table names each sector's predicate, benchmark condition, and falsifier. The benchmark names are established observer-level results; the owner chapters linked from the ownership matrix above and from the failure-mode table below explain what each result claims and how the comparison is made, and no benchmark enters the substrate law as a premise.

| Sector | Predicate $P_S(\theta)=1$ | Benchmark condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal{C}_{\mathrm{weak}}$ | One weak-coupling-triad exposure record $\mathcal{E}_{\mathrm{weak}}(A)=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal{L}_A]$ supplies `V-A`, CKM/PMNS overlap, and weak-corridor provenance without redefining $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, or the exposed domain. Here $\mathcal{L}_A$ is the retained ledger of branch family $A$, $\Pi_{\mathrm{weak}}$ is the weak consumer projection that keeps the exposed weak-coupling-triad data, and $Q_{\mathrm{weak}}$ is the quotient that reads the exposure class from that projection. | $\mathcal{B}_{\mathrm{weak}}(\theta)$ lies in the observed charged-current handedness, mixing, and provenance region within $\epsilon_{\mathrm{weak}}$. | Right-handed charged-current coupling is not strongly suppressed in the validated regime, or the weak exposure domain changes between chirality, mixing, and provenance. |
| $\mathcal{C}_{\mathrm{quantum}}$ | A transfer operator or return map $\mathcal{T}_{\Delta t}$, with $\Delta t$ the effective-chart time step declared in [Measurement Ontology](../quantum/measurement-ontology.md), basin partition $\{B_i\}$, invariant or metastable measure $\mu_*$, and detector kernel produce $p_i=\mu_*(B_i)$ from $\Gamma$ and $\mathcal{H}$ without assigning probabilities as an external rule. | $\mathcal{B}_{\mathrm{quantum}}(\theta)$ lies in the Born-rule, Bell/CHSH/Tsirelson/GHZ/Hardy, Leggett-Garg temporal-correlation, detector-record, and no-signaling benchmark region within $\epsilon_{\mathrm{quantum}}$. | The validated regime gives non-Born weights, a classical-axis linear-correlation failure, untracked temporal-measurement disturbance, superluminal signal transfer, or a detector kernel not derived from the recorded causal state. |
| $\mathcal{C}_{\mathrm{gravity}}$ | One Noether sea response map $\mathcal{M}_{\mathrm{sea}}^{ab}$ supplies clock, ruler, effective signal-speed, weak-field metric, and PPN channels without changing coefficients per observable. | $\mathcal{B}_{\mathrm{gravity}}(\theta)$ lies in the redshift, Shapiro-delay, lensing, orbital, gravitational-wave-speed, PPN, and preferred-frame bound region within $\epsilon_{\mathrm{gravity}}$. | Clock, ruler, signal, or metric coefficients must be tuned independently, ordinary dissipative drag appears in stable motion, or preferred-frame leakage exceeds the recorded bounds. |
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding entries. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether braid inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$, the event-ledger residual of [Radiation](../reactions/radiation.md), selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, signed photon-frequency exchange, non-radiative remnant, or reaction entries explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Liénard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, SZ-like transfer, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss or gain, a missing recoil/provenance entry, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
| $\mathcal{C}_{\mathrm{cosmology}}$ | One source, transport, signed photon-frequency-transfer, thermalization, and clock-rate record uses the same $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance ledger across local source channels and observer-level cosmology. | $\mathcal{B}_{\mathrm{cosmology}}(\theta)$ lies in the BBN, CMB blackbody, damping, anisotropy, polarization handoff, redshift-budget, $H(z)$, BAO, and growth benchmark region within $\epsilon_{\mathrm{cosmology}}$. | BBN photon loading, CMB thermalization, redshift handoff, frequency-exchange closure, or structure growth requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or Noether sea variables incompatible with local reaction / radiation ledgers. |

## Promotion Lemma

For sector $S$, let $\pi_S:\mathfrak{X}\to\mathfrak{X}_S$ be the projection that keeps the sector-$S$ coordinates and shared coordinates consumed by that sector. For a local sector result $c\in\mathfrak{X}_S$, define the extension fiber

$$
\operatorname{Ext}_S(c)
=
\left\{
\theta\in\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
:
\pi_S(\theta)=c
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-071b8555e1818934)

**Lemma.** A local sector result $c$ is promotable through the validation gate if and only if $c\in\pi_S(\mathcal{C}_S)$ and

$$
\operatorname{Ext}_S(c)\ne\varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-8559df833249e0d2)

Here promotable means that some record in $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ retains $c$ as its sector-$S$ projection. The first condition is implied by the second, because any element of the fiber lies in $\mathcal{C}_S$ and projects to $c$; it is stated separately so that the local gate a result must first pass is named. Proof route: if $c$ is promoted, the promoted record must retain the sector-$S$ result and pass every sector gate, so it is an element of $\operatorname{Ext}_S(c)$. Conversely, any $\theta\in\operatorname{Ext}_S(c)$ is a shared closure record whose sector-$S$ projection equals $c$ and whose weak, quantum, gravity, hadronic, radiation, and cosmology predicates all pass; therefore the local result has survived the validation gate. If the fiber is empty, the result is blocked by at least one sector predicate, benchmark region, no-go record, or failure condition.

## Incompatibility Witnesses

A local claim $c$ imposes a constraint subset $I(c)\subseteq\mathfrak{X}$ consisting of all closure records that preserve the claim's definitions, coefficients, ledger entries, and effective-limit assumptions. For a target sector $T$, define the constrained target set

$$
\mathcal{C}_T\!\mid c
=
\mathcal{C}_T\cap I(c)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f33de09893345388)

An incompatibility witness from sector $S$ to sector $T$ is the object

$$
W_{S\to T}(c)
=
\left(
c,
T,
I(c),
P_T,
\mathcal{B}_T,
\mathfrak{B}^{\mathrm{obs}}_T,
d_T,
\epsilon_T,
\mathcal{G}_T,
\delta_T(c)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-20f6249a882cd82b)

where

$$
\delta_T(c)
=
\epsilon_T
-
\inf_{\theta\in I(c),\,P_T(\theta)=1,\,\mathcal{G}_T(\theta)=1}
\operatorname{dist}_{d_T}\!\left(\mathcal{B}_T(\theta),\mathfrak{B}^{\mathrm{obs}}_T\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8d60299fd03e1e3d)

The margin $\delta_T(c)$ is the tolerance left over after the best record compatible with the claim has been placed as close as possible to the validated region; it is nonnegative whenever some compatible record passes the benchmark, so a negative margin certifies that none does, and it is $-\infty$ when no compatible record passes the predicates at all. The witness empties the target gate when $\mathcal{C}_T\!\mid c=\varnothing$. It damages the target gate when $\mathcal{C}_T\!\mid c\ne\varnothing$ but $\delta_T(c)$ falls below the sector's declared minimum margin, forces a hidden sector-specific parameter split, or leaves a required ledger entry undefined.

| Witness class | Imposed local claim $c$ | Target effect | Failure code |
| --- | --- | --- | --- |
| Weak-domain split | $I(c)$ requires distinct weak exposure domains for `V-A`, CKM/PMNS, and weak-corridor provenance. | $\mathcal{C}_{\mathrm{weak}}\!\mid c=\varnothing$ because $P_{\mathrm{weak}}$ requires one weak-coupling-triad exposure record. | `weak.hidden_domain_split` |
| Gravity coefficient split | $I(c)$ requires separate clock, ruler, signal, and PPN coefficients not derived from one $\mathcal{M}_{\mathrm{sea}}^{ab}$. | $\mathcal{C}_{\mathrm{gravity}}\!\mid c=\varnothing$ if the split is needed for benchmark recovery. | `gravity.hidden_tuning` |
| Radiation-cosmology split | $I(c)$ fits blackbody recovery with $\chi_{\text{sea}}^{\mathrm{CMB}}(\mathbf X,T)$ incompatible with the BBN or local radiation event ledger. | $\mathcal{C}_{\mathrm{cosmology}}\!\mid c=\varnothing$ or $\delta_{\mathrm{cosmology}}(c)<0$. | `cosmology.incompatible_transport_limit` |
| Quantum signal leak | $I(c)$ recovers Bell correlations through a detector kernel that transfers controllable signals outside the causal-wake ledger. | $\mathcal{C}_{\mathrm{quantum}}\!\mid c=\varnothing$ and the same record damages $\mathcal{C}_{\mathrm{gravity}}$ through preferred-frame leakage. | `quantum.signal_transfer` |
| Event-ledger omission | $I(c)$ routes radiation, reaction, measurement, or strong-field release without a required $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium, or remnant entry. | The target sector using that event has no admissible $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ completion. | `event.missing_ledger_row` |
| Null-result violation | $I(c)$ predicts a non-baseline channel $e\in\mathfrak{E}_{\theta}^{\mathrm{new}}$ with $O_e(\theta)>O_e^{\max}$ in a tested regime. | The relevant sector may fit its positive benchmark condition, but its no-go predicate $\mathcal{G}_S$ returns $0$ and the shared closure record fails $\mathcal{R}_{\mathrm{null}}(\theta)=0$. | `null.observed_absence_violation` |

## Testable Failure Modes

| Failure mode | Mathematical test | Routed workstream |
| --- | --- | --- |
| Empty intersection | $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$ or $\operatorname{Ext}_S(c)=\varnothing$ for a proposed local promotion. | [Known Tensions](known-tensions.md), [Closure Scorecard](closure-scorecard.md) |
| Hidden tuning | A shared variable or map has sector-specific values $p_S\ne p_T$ with no recorded state variable, or the same benchmark family is recovered only by changing $\Pi_S$ or $Q_S$ (sector $S$'s consumer projection and exposure quotient, the analogues of $\Pi_{\mathrm{weak}}$ and $Q_{\mathrm{weak}}$), $\mathcal{R}$, $\{B_i\}$, the branch-chart revision record, equality map, root-coordinate split, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_{\text{NS}}(\mathbf X,T)$, or $\chi_{\text{sea}}(\mathbf X,T)$ between cases. Branch-chart revisions selected after residual inspection rather than declared from branch geometry fail this test. | [Parameter Ledger](parameter-ledger.md), [Constraint Ledger](constraint-ledger.md) |
| Null-result violation | $\mathcal{R}_{\mathrm{null}}(\theta)>0$ for a predicted added channel in a validated comparison regime. | [Known Tensions](known-tensions.md), [Constraint Ledger](constraint-ledger.md) |
| Missing conservation/provenance field | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ has an undefined required provenance entry or a required balance residual outside its declared tolerance after all claimed outputs, recoil, medium updates, remnants, polarity / charge, architrino inventory, transmitter identity, emission time, causal-root branch, and branch-Jacobian records are included. | [Reaction Ledger](reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md) |
| Benchmark-only fitting | A target benchmark in $\mathfrak{B}^{\mathrm{obs}}_S$ is used as an input to $\mathcal{L}_A$, $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, a branch-chart revision, an equality map, a root-coordinate split, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ rather than as an output of a replayable closure record. | [Particle Masses](../assemblies/particle-masses.md), [Measurement Ontology](../quantum/measurement-ontology.md), [Radiation](../reactions/radiation.md) |
| Incompatible effective limits | Two sectors require asymptotic maps whose overlap is empty, for example incompatible weak-field metric limits, photon / radiation limits, blackbody / BBN transport limits, or quantum no-signaling / gravity causal limits. | [Known Tensions](known-tensions.md), [General Relativity](../spacetime/general-relativity.md), [Cosmology Ontology](../cosmology/cosmology-ontology.md) |

## Preferred-Frame Hiding Stop Condition

1. **Hard wall:** A predicted preferred-frame signal outside the source-checked tolerance for its calibrated observable and comparison domain rejects that realization. Here $\Delta c/c$ is the fractional difference between round-trip signal speeds along differently oriented paths, the quantity written $\Delta_{\mathrm{tw}}$ in the ownership matrix above; a Michelson-Morley-type test compares such round trips as the apparatus rotates and reports the largest orientation-dependent change. The resonator comparison anchor $10^{-17}$ is carried by the [Constraint Ledger](constraint-ledger.md#lorentz-invariance--preferred-frame-effects-tier-1), and the stop condition compares the theory's predicted leakage with the current source-checked bound for the same calibrated observable, as [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) requires.
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma_{\mathrm{eff}}$ and $P=\gamma_{\mathrm{eff}}P_0$, from delayed causal closure and Noether sea response rather than from kinematic postulates. Here $L_0$ and $P_0$ are the assembly's rest extent and rest cycle period, $L_{\parallel}$ is its extent along the direction of motion, $P$ is its cycle period in motion compared with $P_0$ in the same declared time coordinate, and $\gamma_{\mathrm{eff}}=(1-\beta_{\mathrm{eff}}^2)^{-1/2}$ with $\beta_{\mathrm{eff}}=v/c_{\mathrm{eff}}$ is the Lorentz factor of the dressed channel, with $v$ the assembly group speed relative to the reference medium and $c_{\mathrm{eff}}$ its dressed clock-and-ruler channel speed. The channel qualification is the target declared in [Lorentz Kinematics](../spacetime/lorentz-kinematics.md); the primitive wake speed $c_f$ enters it only through the dressed speed, and equality of the photon-channel speed with $c_{\mathrm{eff}}$ is a separate recovery condition.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

## Critical Stop Conditions

- **$c_f$ variance:** If the primitive causal-wake speed $c_f$, the field speed at which every architrino wake expands through the Euclidean void, varies with position, time, direction, or emitter state, the theory fails. This condition concerns the primitive speed alone. The dressed assembly-channel speed $c_{\mathrm{eff}}$ and the photon-channel speed $c_\gamma$ vary with Noether sea state by construction, and that variation is the mechanism behind the gravity-sector benchmarks rather than a failure.
- **Noether sea drag:** A predicted drag contribution outside the calibrated orbital-decay bound rejects the tested realization. On a branch claimed to be ideally periodic and isolated, secular dissipative loss contradicts that branch claim unless the full exchange account supplies the sustaining input. Energy carried away as gravitational-wave or photon output is radiation recorded in the event ledger, not drag in this sense.
- **Lorentz leakage:** A preferred-frame modulation of a named atomic transition outside that clock comparison’s calibrated tolerance rejects the tested realization. The observable is the fractional frequency modulation $\delta\nu/\nu$ of a named transition against a declared reference channel as the apparatus orientation and velocity relative to the Euclidean-void rest frame change over sidereal and annual comparison windows, the entry written $\delta\nu/\nu$ in the ownership matrix; the clock comparison must supply its own transition, reference-channel, uncertainty and domain calibration rather than inherit the resonator anchor from the [Constraint Ledger](constraint-ledger.md#lorentz-invariance--preferred-frame-effects-tier-1).
- **Empty shared intersection:** If quantitative development makes $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$, the implementation is rejected even if individual sector chapters remain locally suggestive.

## Sources

- S. Navas et al. (Particle Data Group), *Review of Particle Physics*, Phys. Rev. D 110, 030001 (2024), DOI: 10.1103/PhysRevD.110.030001; [proton listing](https://pdg.lbl.gov/2024/listings/rpp2024-list-p.pdf). Source of the two partial-mean-life lower limits quoted in the Null-Result Ownership Matrix, which the listing attributes to the Super-Kamiokande searches recorded there as TAKENAKA 20 for $p\to e^+\pi^0$ and ABE 14G for $p\to\bar\nu K^+$. These are observer-level comparison anchors, not substrate premises.
