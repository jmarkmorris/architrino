# Failure Criteria

This chapter states the hard-stop conditions for $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish ordinary incompleteness from genuine failure modes, especially where a local success in one sector cannot survive the shared closure intersection.

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

be the sector set. A candidate promoted closure is a record $\theta\in\mathfrak{X}$ whose shared coordinates include

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
\right),
$$

where $A$ is the assembly or branch family, $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{R}$ is the active residual family, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\zeta$ is shielding or exposure data, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether-Sea response object, and $\{B_i\}$ is the basin or channel partition. Sector-local coordinates $Z_S(\theta)$ record the benchmark variables, theorem assumptions, provenance rows, and tolerances used by sector $S$.

For each sector $S$, fix a gate predicate $P_S:\mathfrak{X}\to\{0,1\}$, a benchmark map $\mathcal{B}_S:\mathfrak{X}\to\mathfrak{B}_S$, a validated benchmark region $\mathfrak{B}^{\mathrm{obs}}_S\subseteq\mathfrak{B}_S$, a benchmark metric $d_S$, a tolerance $\epsilon_S$, and a no-go pass predicate $\mathcal{G}_S:\mathfrak{X}\to\{0,1\}$. Define the distance from a benchmark point to the validated region by

$$
\operatorname{dist}_{d_S}(b,\mathfrak{B}^{\mathrm{obs}}_S)
=
\inf_{b'\in\mathfrak{B}^{\mathrm{obs}}_S}d_S(b,b').
$$

The sector acceptance set is the mathematical subset

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
\right\}.
$$

The shared acceptance intersection is

$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\bigcap_{S\in\mathfrak{S}}\mathcal{C}_S.
$$

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
\right].
$$

This rule does not make the validation suite less severe. It prevents a residual-bearing closure record from being rejected by a criticism that has not identified which accepted observable, mathematical consistency condition, or no-go assumption has actually changed.

### Null-Result Residual for Added Channels

When a closure attempt predicts channels outside the validated Standard Model and GR-facing benchmark set, those channels must be tested against null results before the record can be promoted. Let $\mathfrak{E}_{\theta}^{\mathrm{new}}$ be the set of predicted additional channels for a candidate record $\theta$: unstable baryon channels, new charged or neutral partners, extra gauge or transport modes, preferred-frame leakage channels, or other non-baseline outputs that would have produced an observed rate, cross-section, lifetime shift, branching ratio, dispersion, or anisotropy. For each channel $e$, let $O_e(\theta)\ge0$ be the predicted observable and $O_e^{\max}$ the accepted upper bound in the comparison regime. Define

$$
\mathcal{R}_{\mathrm{null}}(\theta)
=
\sup_{e\in\mathfrak{E}_{\theta}^{\mathrm{new}}}
\left[
\log\frac{O_e(\theta)}{O_e^{\max}}
\right]_+,
\qquad
[x]_+\equiv\max(x,0).
$$

A promoted record must satisfy

$$
\mathcal{R}_{\mathrm{null}}(\theta)=0
$$

using the same shared coordinates $\theta_{\mathrm{join}}$ that recover the positive benchmarks. A channel may avoid this gate only by being outside the validated comparison domain, by being an exactly unobservable gauge redundancy, or by being proven absent in the accepted branch family. It is not enough to add a large symmetry, partner family, hidden transport dimension, or unstable reaction corridor and then tune it below every bound with sector-specific parameters.

For symmetry-container comparisons, the extra-sector test is part of the positive claim rather than a later cleanup. If a larger algebra, hidden sector, or partner family is invoked to explain one observed pattern, every non-baseline channel it brings into the tested domain must either be exactly redundant, absent in the accepted branch family, or routed through the same $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ record that recovered the observed pattern.

#### Operational Null-Result Ledger

For audits and simulations, the same condition should be expanded into a channel ledger rather than left as a single symbol. Let $\theta_+$ denote the record used for the positive Standard-Model, GR, quantum, and cosmology benchmarks, and let $\theta_e$ denote the record used to suppress a predicted non-baseline channel $e$. Define the shared-record split
$$
\Delta_{\mathrm{shared}}(e;\theta)
=
\operatorname{dist}_{\mathrm{shared}}\!\left(
\pi_{\mathrm{shared}}\theta_e,
\pi_{\mathrm{shared}}\theta_+
\right),
$$
where $\pi_{\mathrm{shared}}$ keeps the common Noether-Sea, assembly, weak-exposure, metric, and provenance coordinates consumed by both the positive benchmark and the null channel. The operational audit residual is
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
\right).
$$
The original promotion condition is recovered by requiring $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$. This form rejects a second failure mode: a channel can be numerically hidden but still fail because its suppression uses a different shared record from the one that fit the observed sector.

| Added-channel family | Example observable $O_e(\theta)$ | Null data product | Same-record requirement |
| --- | --- | --- | --- |
| Mirror matter or added charged partners | production cross-section, branching ratio, stable relic abundance | collider exclusions, precision electroweak fits, cosmological abundance bounds | the axial-layer and gauge-representation record that yields observed fermions must also exclude the partner branch |
| Superpartners or large symmetry partners | missing-energy rate, partner mass threshold, coupling strength | collider missing-energy and resonance searches | partner absence must follow from the accepted branch family, not from an independent mass threshold |
| Proton-instability or baryon-violating corridors | $\Gamma_p(\theta)$ or forbidden nuclear transition rate | proton-lifetime and rare-event limits | the same color/topology and reaction-provenance ledger used for hadrons must suppress the channel |
| Extra gauge bosons or gauge modes | resonance rate, precision-contact term, long-range force strength | collider, fifth-force, and precision-scattering bounds | the effective gauge residual must recover $U(1)_Y\times SU(2)_L\times SU(3)_c$ without an unsuppressed added mode |
| Hidden transport or extra propagation modes | dispersion, birefringence, scalar/vector gravitational-wave response | photon, gravitational-wave, and timing residuals | the same Noether-Sea response map must set clock, signal, and metric channels |
| Sterile or neutral partner branches | mixing angle, $\Delta N_{\mathrm{eff}}$, relic abundance, free-streaming scale | oscillation, BBN, CMB, and structure-formation bounds | the neutral-sector Hamiltonian and cosmology record must be shared |
| Preferred-frame leakage channels | two-way anisotropy, clock drift, PPN preferred-frame coefficients | resonator, atomic-clock, solar-system, and gravitational-wave timing bounds | the Lorentz-closure map must suppress leakage without retuning clock, ruler, or signal coefficients |

For the hidden-transport family, free-space birefringence is a direct null-result specialization rather than a new ontology. If $v_+(\omega,\hat{\mathbf{k}};\theta)$ and $v_-(\omega,\hat{\mathbf{k}};\theta)$ are the two physical photon-polarization propagation speeds extracted from the same record $\theta$, define
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
\right|.
$$
The photon/effective-metric record can be promoted only when $\mathcal{R}_{\mathrm{biref}}(\theta)\le\epsilon_{\mathrm{biref}}$ in the declared weak homogeneous regime and when the same $\theta$ also supplies the clock, ruler, signal, and metric coefficients used for the positive GR-facing benchmarks. If birefringence is numerically hidden by switching to a different channel record than the one used for lensing, Shapiro delay, spectra, or photon synchronization, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ fails even if the split is individually small.

#### Null-Result Ownership Matrix

The following matrix assigns each recurring null-result family to the corpus homes that should carry the positive derivation and the absence proof. The owner document does not need to reproduce every experimental limit; it must state the observable $O_e(\theta)$, name the comparison bound $O_e^{\max}$, and route the channel through $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ when the channel is predicted.

| Channel family | Observable vector | Bound symbol | Primary owner | Supporting gates |
| --- | --- | --- | --- | --- |
| Mirror matter / added charged fermions | $(\sigma_{\mathrm{prod}},B_{\mathrm{vis}},\Omega_{\mathrm{relic}})$ | $O_{\mathrm{mirror}}^{\max}$ | [Quantum Number Mapping](../assemblies/fermions/quantum-number-mapping.md) | [Gauge Symmetries](../interactions/gauge-symmetries.md), [Known Tensions](known-tensions.md) |
| Superpartners / symmetry partners | $(\sigma_{\mathrm{miss}},m_{\mathrm{partner}},B_{\mathrm{cascade}})$ | $O_{\mathrm{partner}}^{\max}$ | [Gauge Symmetries](../interactions/gauge-symmetries.md) | [Theory Differentials](../philosophy-history/theory-differentials.md), [No-Go Theorems](no-go-theorems.md) |
| Proton-instability corridors | $(\Gamma_p,B_{p\to e^+\pi^0},B_{p\to\bar\nu K^+})$ | $\Gamma_p^{\max}$ | [Color Charge SU(3)](../assemblies/fermions/color-charge-su3.md) | [Reaction Ledger](reaction-ledger.md), [Known Tensions](known-tensions.md) |
| Extra gauge bosons / gauge modes | $(\sigma_{Z'},\sigma_{W'},g_{\mathrm{new}},\Delta_{\mathrm{contact}})$ | $O_{\mathrm{gauge+}}^{\max}$ | [Gauge Symmetries](../interactions/gauge-symmetries.md) | [Gauge Structure Emergence](../interactions/gauge-structure-emergence.md), [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md) |
| Hidden transport / extra propagation modes | $(\Delta v/c,\omega_{\mathrm{disp}},h_{\mathrm{scalar}},h_{\mathrm{vector}})$ | $O_{\mathrm{transport}}^{\max}$ | [Constraint Ledger](constraint-ledger.md) | [Observer Framework](../spacetime/observer-framework.md), [PPN Parameters](../spacetime/ppn-parameters.md) |
| Sterile / neutral partner branches | $(\theta_{\mathrm{mix}},\Delta N_{\mathrm{eff}},\Omega_{\nu_R},\lambda_{\mathrm{fs}})$ | $O_{\mathrm{sterile}}^{\max}$ | [Neutrinos](../assemblies/fermions/neutrinos.md) | [Dark Matter](../cosmology/dark-matter.md), [CMB](../cosmology/CMB.md) |
| Preferred-frame leakage | $(\Delta_{\mathrm{tw}},\delta\nu/\nu,\alpha_1,\alpha_2,\alpha_3)$ | $O_{\mathrm{LV}}^{\max}$ | [Lorentz Kinematics](../spacetime/lorentz-kinematics.md) | [PPN Parameters](../spacetime/ppn-parameters.md), [Constraint Ledger](constraint-ledger.md) |

For proton-instability corridors, convert every current partial-mean-life lower limit $\tau_c^{\min}$ into a channel-rate ceiling
$$
\Gamma_{p,c}^{\max}=\frac{1}{\tau_c^{\min}}.
$$
The current benchmark scale is already severe: PDG 2024 summaries give $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence. These numbers are comparison anchors, not permanent constants; a closure packet should cite the current experimental source when the hadronic gate is evaluated.

## Sector Acceptance Sets

| Sector | Predicate $P_S(\theta)=1$ | Benchmark condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal{C}_{\mathrm{weak}}$ | One weak-coupling-triad exposure record $\mathcal{E}_{\mathrm{weak}}(A)=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal{L}_A]$ supplies `V-A`, CKM/PMNS overlap, and weak-corridor provenance without redefining $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, or the exposed domain. | $\mathcal{B}_{\mathrm{weak}}(\theta)$ lies in the observed charged-current handedness, mixing, and provenance region within $\epsilon_{\mathrm{weak}}$. | Right-handed charged-current coupling is not strongly suppressed in the validated regime, or the weak exposure domain changes between chirality, mixing, and provenance. |
| $\mathcal{C}_{\mathrm{quantum}}$ | A transfer operator or return map $\mathcal{T}_{\Delta t}$, basin partition $\{B_i\}$, invariant or metastable measure $\mu_*$, and detector kernel produce $p_i=\mu_*(B_i)$ from $\Gamma$ and $\mathcal{H}$ without assigning probabilities as an external rule. | $\mathcal{B}_{\mathrm{quantum}}(\theta)$ lies in the Born-rule, Bell/CHSH/Tsirelson/GHZ/Hardy, Leggett-Garg temporal-correlation, detector-record, and no-signaling benchmark region within $\epsilon_{\mathrm{quantum}}$. | The validated regime gives non-Born weights, a classical-axis linear-correlation failure, untracked temporal-measurement disturbance, superluminal signal transfer, or a detector kernel not derived from the recorded causal state. |
| $\mathcal{C}_{\mathrm{gravity}}$ | One Noether-Sea response map $\mathcal{M}_{\mathrm{sea}}^{ab}$ supplies clock, ruler, effective signal-speed, weak-field metric, and PPN channels without changing coefficients per observable. | $\mathcal{B}_{\mathrm{gravity}}(\theta)$ lies in the redshift, Shapiro-delay, lensing, orbital, gravitational-wave-speed, PPN, and preferred-frame bound region within $\epsilon_{\mathrm{gravity}}$. | Clock, ruler, signal, or metric coefficients must be tuned independently, ordinary dissipative drag appears in stable motion, or preferred-frame leakage exceeds the recorded bounds. |
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding rows. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether-core inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$ selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, non-radiative remnant, or reaction rows explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Lienard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss, a missing recoil/provenance row, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
| $\mathcal{C}_{\mathrm{cosmology}}$ | One source, transport, thermalization, and clock-rate record uses the same $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance ledger across local source channels and observer-level cosmology. | $\mathcal{B}_{\mathrm{cosmology}}(\theta)$ lies in the BBN, CMB blackbody, damping, anisotropy, polarization handoff, redshift, $H(z)$, BAO, and growth benchmark region within $\epsilon_{\mathrm{cosmology}}$. | BBN photon loading, CMB thermalization, redshift handoff, or structure growth requires unbalanced substrate creation, per-source retuning, or Noether-Sea variables incompatible with local reaction / radiation ledgers. |

## Promotion Lemma

For sector $S$, let $\pi_S:\mathfrak{X}\to\mathfrak{X}_S$ be the projection that keeps the sector-$S$ coordinates and shared coordinates consumed by that sector. For a local sector result $c\in\mathfrak{X}_S$, define the extension fiber

$$
\operatorname{Ext}_S(c)
=
\left\{
\theta\in\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
:
\pi_S(\theta)=c
\right\}.
$$

**Lemma.** A local sector result $c$ is promotable through the validation gate if and only if $c\in\pi_S(\mathcal{C}_S)$ and

$$
\operatorname{Ext}_S(c)\ne\varnothing.
$$

Proof route: if $c$ is promoted, the promoted record must retain the sector-$S$ result and pass every sector gate, so it is an element of $\operatorname{Ext}_S(c)$. Conversely, any $\theta\in\operatorname{Ext}_S(c)$ is a shared closure record whose sector-$S$ projection equals $c$ and whose weak, quantum, gravity, hadronic, radiation, and cosmology predicates all pass; therefore the local result has survived the validation gate. If the fiber is empty, the result is blocked by at least one sector predicate, benchmark region, no-go record, or failure condition.

## Incompatibility Witnesses

A local claim $c$ imposes a constraint subset $I(c)\subseteq\mathfrak{X}$ consisting of all closure records that preserve the claim's definitions, coefficients, ledger rows, and effective-limit assumptions. For a target sector $T$, define the constrained target set

$$
\mathcal{C}_T\!\mid c
=
\mathcal{C}_T\cap I(c).
$$

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
\right),
$$

where

$$
\delta_T(c)
=
\epsilon_T
-
\inf_{\theta\in I(c),\,P_T(\theta)=1,\,\mathcal{G}_T(\theta)=1}
\operatorname{dist}_{d_T}\!\left(\mathcal{B}_T(\theta),\mathfrak{B}^{\mathrm{obs}}_T\right).
$$

The witness empties the target gate when $\mathcal{C}_T\!\mid c=\varnothing$. It damages the target gate when $\mathcal{C}_T\!\mid c\ne\varnothing$ but $\delta_T(c)$ removes a required tolerance margin, forces a hidden sector-specific parameter split, or leaves a required ledger row undefined.

| Witness class | Imposed local claim $c$ | Target effect | Failure code |
| --- | --- | --- | --- |
| Weak-domain split | $I(c)$ requires distinct weak exposure domains for `V-A`, CKM/PMNS, and weak-corridor provenance. | $\mathcal{C}_{\mathrm{weak}}\!\mid c=\varnothing$ because $P_{\mathrm{weak}}$ requires one weak-coupling-triad exposure record. | `weak.hidden_domain_split` |
| Gravity coefficient split | $I(c)$ requires separate clock, ruler, signal, and PPN coefficients not derived from one $\mathcal{M}_{\mathrm{sea}}^{ab}$. | $\mathcal{C}_{\mathrm{gravity}}\!\mid c=\varnothing$ if the split is needed for benchmark recovery. | `gravity.hidden_tuning` |
| Radiation-cosmology split | $I(c)$ fits blackbody recovery with $\chi_{\text{sea}}^{\mathrm{CMB}}(\mathbf{x},t)$ incompatible with the BBN or local radiation event ledger. | $\mathcal{C}_{\mathrm{cosmology}}\!\mid c=\varnothing$ or $\delta_{\mathrm{cosmology}}(c)<0$. | `cosmology.incompatible_transport_limit` |
| Quantum signal leak | $I(c)$ recovers Bell correlations through a detector kernel that transfers controllable signals outside the causal-wake ledger. | $\mathcal{C}_{\mathrm{quantum}}\!\mid c=\varnothing$ and the same record damages $\mathcal{C}_{\mathrm{gravity}}$ through preferred-frame leakage. | `quantum.signal_transfer` |
| Event-ledger omission | $I(c)$ routes radiation, reaction, measurement, or strong-field release without a required $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium, or remnant row. | The target sector using that event has no admissible $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ completion. | `event.missing_ledger_row` |
| Null-result violation | $I(c)$ predicts a non-baseline channel $e\in\mathfrak{E}_{\theta}^{\mathrm{new}}$ with $O_e(\theta)>O_e^{\max}$ in a tested regime. | The relevant sector gate may fit its positive benchmark, but the shared closure record fails $\mathcal{R}_{\mathrm{null}}(\theta)=0$. | `null.observed_absence_violation` |

## Testable Failure Modes

| Failure mode | Mathematical test | Routed workstream |
| --- | --- | --- |
| Empty intersection | $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$ or $\operatorname{Ext}_S(c)=\varnothing$ for a proposed local promotion. | [Known Tensions](known-tensions.md), [Closure Scorecard](closure-scorecard.md) |
| Hidden tuning | A shared variable or map has sector-specific values $p_S\ne p_T$ with no recorded state variable, or the same benchmark family is recovered only by changing $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, the branch-chart revision record, equality map, root-coordinate split, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_{\text{core}}(\mathbf{x},t)$, or $\chi_{\text{sea}}(\mathbf{x},t)$ between cases. Branch-chart revisions selected after residual inspection rather than declared from branch geometry fail this test. | [Parameter Ledger](parameter-ledger.md), [Constraint Ledger](constraint-ledger.md) |
| Null-result violation | $\mathcal{R}_{\mathrm{null}}(\theta)>0$ for a predicted added channel in a validated comparison regime. | [Known Tensions](known-tensions.md), [Constraint Ledger](constraint-ledger.md) |
| Missing conservation/provenance field | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ has an undefined or nonzero required row after all claimed outputs, recoil, medium updates, remnants, polarity / charge, architrino inventory, source identity, emission time, causal-root branch, and branch-Jacobian records are included. | [Reaction Ledger](reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](reaction-cosmology-provenance-ledger.md) |
| Benchmark-only fitting | A target benchmark in $\mathfrak{B}^{\mathrm{obs}}_S$ is used as an input to $\mathcal{L}_A$, $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, a branch-chart revision, an equality map, a root-coordinate split, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ rather than as an output of a replayable closure record. | [Particle Masses](../assemblies/particle-masses.md), [Measurement Ontology](../quantum/measurement-ontology.md), [Radiation](../reactions/radiation.md) |
| Incompatible effective limits | Two sectors require asymptotic maps whose overlap is empty, for example incompatible weak-field metric limits, photon / radiation limits, blackbody / BBN transport limits, or quantum no-signaling / gravity causal limits. | [Known Tensions](known-tensions.md), [GR Phenomenology](../spacetime/gr-phenomenology.md), [Cosmology Ontology](../cosmology/cosmology-ontology.md) |

## Preferred-Frame Hiding Stop Condition

1. **Hard wall:** If the Euclidean-void rest frame is detectable by any physical experiment, for example a Michelson-Morley-type null test, at $\Delta c/c > 10^{-17}$, the theory fails.
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma$ and $T=\gamma T_0$, from delayed causal closure and Noether-Sea response rather than from kinematic postulates.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether Sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

## Critical Stop Conditions

- **$c_f$ variance:** If field speed varies in the true void, the theory fails.
- **Noether-Sea drag:** If the Noether Sea causes orbital decay or secular kinetic-energy loss through ordinary dissipative drag, rather than a reversible medium-dressed inertial response, the theory fails.
- **Lorentz leakage:** If absolute motion affects atomic spectra above $10^{-17}$, the theory fails.
- **Empty shared intersection:** If quantitative development makes $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$, the present implementation is rejected even if individual sector chapters remain locally suggestive.
