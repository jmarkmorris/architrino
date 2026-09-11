# Entropy

Entropy quantifies uncertainty under a declared measure and description. In $\mathbb{A}\mathbb{A}\mathbb{A}$ it is not a primitive substance, a field in the [Euclidean void](../foundations/euclidean-void.md)—the fixed three-dimensional spatial container—or the generator of [absolute time](../foundations/absolute-time.md). This chapter distinguishes uncertainty about which retained record occurs from uncertainty about the complete histories compatible with one observed record. Neither quantity is an independent gravitational mechanism.

This chapter collects the entropy rule used across time, energy, measurement, computation, horizon, and cosmology discussions. The central discipline is the same-record rule: an analysis may not fit entropy, temperature, flux, probability weights, apparatus cost, or horizon labels from separate hidden ensembles. If a thermal, quantum, horizon, or computational comparison is claimed, the entropy appearing in that comparison must be a projection of the same record that supplies the other quantities.

## Plain-Language Reading

One use of entropy measures the hidden detailed stories compatible with what a record can see. Many exact arrangements can project to the same coarse record of a room. A different use measures uncertainty about which room record will be observed. These are conditional history entropy and record-outcome entropy, respectively; they answer different questions even when computed from the same preparation.

This is also why visible disorder is only a shortcut, not the definition. A jagged, broken, or visually mixed object can still have lower entropy than a smoother thermal state if fewer complete histories are compatible with its retained record. In this chapter, disorder language is acceptable only when it tracks the declared measure, macrostate partition, and unresolved history count.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, inherited entropy language usually measures unresolved path history without naming it that way. An [architrino](../foundations/architrino.md) is a primitive pointlike entity carrying one polarity, and its causal wake is the expanding record emitted along its path. Heat spreading, phase scrambling, apparatus irreversibility, and horizon bookkeeping all express the same pressure: a finite record no longer retains enough exact architrino, assembly, causal-wake, boundary, and Noether sea history to reconstruct one unique detailed past.

Entropy remains useful because it audits coarse descriptions. It asks whether a measurement record is really stable, whether heat and work bookkeeping close, whether computation or memory reset has a physical cost, whether a horizon label count comes from real boundary records, and whether an analysis is using one hidden record for entropy while using another for temperature, flux, or probability. In that sense, entropy is not fundamental ontology, but it is a powerful test of whether an effective description is physically honest.

A complete universe path history determines its realized record, but does not by itself assign probabilities to alternative histories. An entropy calculation also needs a declared preparation measure or counting reference. The record map specifies which histories are grouped together; the measure specifies their weights.

The retained record may also include incoming causal-wake and potential data. A wake-inclusive entropy measures how many complete source and path-history configurations could produce the same incoming potential record, boundary-wake record, or apparatus response in the declared window. This is the form needed when measurement, radiation, horizon, or Noether sea thermodynamic bookkeeping depends on incoming causal structure rather than only on material state variables inside the window.

A common thermodynamic lesson can therefore be restated without changing the ontology: the same amount of energy can be more or less usable depending on how concentrated, phase-organized, spectrally sharp, or gradient-bearing the retained record is. Energy conservation belongs to the full same-record ledger. Entropy asks how much of that ledger has been dispersed into unresolved alternatives.

The quantum version says the same thing in a sharper language. A complete comparison state may remain pure or measure-preserving, while a subsystem looks mixed after the rest of the entangled record has been placed outside the access window. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that is not proof that information is a primitive substance. It is another record-coarse-graining: the retained channel cannot carry the full compatible path-history and correlation record.

## Core Definition

Let $\mu_T$ be a measure on complete deterministic histories compatible with a declared preparation. In a deterministic substrate this measure is not fundamental randomness. It is the pushforward of preparation-limited ignorance over the unresolved initial history and incoming-wake data. If the preparation fixes the present record at $T_{\mathrm{prep}}$ only up to a retained history depth $h$, let $\nu_{\mathrm{prep}}$ be the measure on the unfixed segment $[T_{\mathrm{prep}}-h,T_{\mathrm{prep}}]$ and let $\mathcal{F}_{T_{\mathrm{prep}}\to T}$ be the deterministic delayed-flow map. Then

$$
\mu_T
=
\left(\mathcal{F}_{T_{\mathrm{prep}}\to T}\right)_*\nu_{\mathrm{prep}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d02a207cc2ecbebe)

A pushforward assigns an outcome set the probability of all input histories mapped into it: $\mu_T(B)=\nu_{\mathrm{prep}}(\mathcal F_{T_{\mathrm{prep}}\to T}^{-1}(B))$. The preparation must supply enough history and incoming-wake data to define this delayed flow on its stated domain. Probabilities describe unresolved preparation data, not stochastic substrate law. Multiple deterministic basins can then yield a distribution of record-limited outcomes.

Let $W(T)$ be the access window and let $\mathcal{Q}$ be the coarse-graining used by a Physical Observer, apparatus, or simulation record. The record projection

$$
\Pi_{\mathcal{Q},W}:\Gamma_T\longrightarrow \mathcal{Z}_{\mathcal{Q},W}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c51d1c26cf596fd3)

maps complete histories into retained record variables. Here $\Gamma_T$ is the preparation-conditioned complete-history space at absolute time $T$, and $\mathcal{Z}_{\mathcal{Q},W}$ is the retained record-state space selected by the coarse-graining and access window. The pushed-forward record measure is

$$
\nu_{\mathcal{Q},W,T}
=
(\Pi_{\mathcal{Q},W})_*\mu_T
=
(\Pi_{\mathcal{Q},W})_*
\left(\mathcal{F}_{T_{\mathrm{prep}}\to T}\right)_*
\nu_{\mathrm{prep}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d5fa004c9aae8977)

and its record-outcome entropy is

$$
S_{\Pi,W}(T)
=
k_B\,\mathcal{H}\!\left(\nu_{\mathcal{Q},W,T}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-652414f6f55d17de)

where $\mathcal H$ is Shannon entropy for a discrete record. Thus $S_{\Pi,W}=k_BH(Z)$ for the random retained record $Z=\Pi_{\mathcal Q,W}(X)$ of a history $X$. It measures uncertainty about which record occurs, before that record is observed.

On a continuous record space, the entropy functional also requires a declared reference measure $\lambda_{\mathcal{Q},W}$. When $\nu_{\mathcal{Q},W,T}$ is absolutely continuous with respect to that reference, write

$$
\mathcal{H}_{\lambda_{\mathcal{Q},W}}
\!\left(\nu_{\mathcal{Q},W,T}\right)
=
-
\int_{\mathcal{Z}_{\mathcal{Q},W}}
\log\!\left(
\frac{d\nu_{\mathcal{Q},W,T}}
{d\lambda_{\mathcal{Q},W}}
\right)
d\nu_{\mathcal{Q},W,T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7ae0d5858da7a312)

Bare differential entropy is chart-dependent, so neither the coordinate chart nor its volume element may remain implicit in a quantitative entropy claim.

For discrete histories, the conditional inference entropy of one observed record $z$ is $S^{\mathrm{inf}}(z)=k_BH(X\mid Z=z)$. Conditioning means restricting the preparation to the fiber $\Pi^{-1}(z)$ and dividing by its positive probability. Averaging over records gives $S^{\mathrm{inf}}=k_BH(X\mid Z)$ and the chain rule $k_BH(X)=S_{\Pi,W}+S^{\mathrm{inf}}$. An observable constant on each fiber may still vary between fibers and contribute to record-outcome entropy; unresolved variation within a fiber instead contributes to conditional inference entropy.

For example, take four equiprobable histories. A constant record has $H(Z)=0$ and $H(X\mid Z)=\log4$; a record distinguishing two equal pairs has both entropies equal to $\log2$; an exact record has $H(Z)=\log4$ and $H(X\mid Z)=0$. Refining the record increases its outcome entropy and decreases the average hidden uncertainty, with their sum unchanged. Conditional entropy in a particular nonuniform subfiber need not decrease under refinement; the monotonicity statement concerns the average.

The exact data-processing statement concerns distinguishability between candidate history measures. Here $D_{\mathrm{KL}}(\mu\|\mu')=\int\log(d\mu/d\mu')\,d\mu$ is the Kullback–Leibler divergence: the expected logarithmic likelihood ratio. It is infinite when the second measure assigns zero weight to an event of positive first-measure weight. For two preparation-conditioned measures $\mu_T$ and $\mu'_T$ on the same history domain,

$$
D_{\mathrm{KL}}
\!\left(
(\Pi_{\mathcal{Q},W})_*\mu_T
\mathrel{\|}
(\Pi_{\mathcal{Q},W})_*\mu'_T
\right)
\le
D_{\mathrm{KL}}
\!\left(
\mu_T
\mathrel{\|}
\mu'_T
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-545fdfd3ca357464)

Projection cannot increase the retained record's ability to distinguish the two candidate history ensembles; this is the data-processing inequality for relative entropy, whose classical form uses the divergence introduced by [Kullback and Leibler (1951)](https://doi.org/10.1214/aoms/1177729694). This loss of distinguishability is not automatically an increase of Shannon or thermodynamic entropy; an entropy-growth claim still requires the fixed reference measure, coarse-graining, access window, and boundary ledger declared above.

For a discrete coarse partition with probabilities $p_\alpha$, the record entropy takes the Gibbs/Shannon form introduced for communication ensembles by [Shannon (1948)](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x):

$$
S_{\mathcal{Q}}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$

[View →](../../../../equation-mapping.html#corpus-equation-07a57793d3877ba2)

For the Boltzmann count of one retained macrostate, let $\lambda$ be a declared counting or phase-volume measure and let $\lambda_0$ be the reference cell that makes the count dimensionless. Define

$$
\Omega_{\mathcal{Q},W}(T)
=
\frac{\lambda\!\left(\Gamma_{\mathcal{Q},W(T)}\right)}{\lambda_0},
\qquad
S^{\mathrm B}_{\mathcal{Q},W}(T)
=
k_B\log \Omega_{\mathcal{Q},W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3004d4ff5fe0f531)

where $\Gamma_{\mathcal{Q},W(T)}$ is the set of complete microhistories compatible with the retained macroscopic records in that window. The measure $\lambda$ is not the normalized preparation probability $\mu_T$: inserting a probability directly into $k_B\log\mu_T(\Gamma)$ would give a nonpositive log-probability rather than a Boltzmann count.

This Boltzmann log-volume is distinct from $H(Z)$. For a finite fiber with uniform conditional weights, $S^{\mathrm{inf}}(z)=k_B\log|\Pi^{-1}(z)|$ agrees with its Boltzmann count. Without uniform weights, conditional Shannon entropy can be smaller than that log-count. Identification of either expression with thermodynamic entropy requires the physical state-counting and heat/work reduction appropriate to the comparison.

In a discrete exact record, each observed fiber contains one history and its conditional inference entropy is zero. The ensemble of exact records can still have nonzero outcome entropy $k_BH(X)$. In a continuous history space, conditioning on a zero-probability record requires a specified regular conditional measure or limiting construction; a singleton does not by itself define differential entropy. Thermodynamic macrostates group histories by physically retained pressure, temperature, density, spectral, boundary, apparatus, or control variables.

The quotient $\Gamma_T/\!\sim_{\mathcal Q,W}$ is the set of equivalence classes with the same record. Refining it shrinks each active fiber, so its Boltzmann log-volume cannot increase at fixed counting reference, while record-outcome entropy cannot decrease for finite discrete partitions. Neither direction is a universal thermodynamic law.

### Measure-Domain and Flow Guardrail

The measure notation above is conditional on a declared delayed-history domain. For a finite retained memory depth $h$ and regularization $\eta>0$, one admissible setting is a path-history space
$$
\mathfrak{X}_{h,\eta}
=
C\!\left([-h,0];\mathcal{Z}_{\eta}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-88e352bcac5be834)

where $\mathcal{Z}_{\eta}$ is the declared regularized state space for $\mathsf Z=(\mathbf X,\mathbf V)$; a finite-dimensional Galerkin or return-section chart is another admissible setting when its projection error is included in the record. The preparation measure must be defined on that domain, and the delayed flow must at least be measurable on the retained window.

Conservation of fine-grained entropy requires an invertible flow preserving the declared reference measure, with regularization, endpoints, and memory-boundary conventions fixed. Quasi-invariance alone preserves null sets, not volumes: scaling a uniform variable from $[0,1]$ to $[0,2]$ raises its differential entropy relative to fixed Lebesgue measure by $\log2$. A non-volume-preserving flow requires the corresponding logarithmic Jacobian or Radon–Nikodym correction; a transported reference must be named explicitly. Determinism alone does not provide a Liouville theorem for a delayed system. Limits $h\to\infty$ or $\eta\to0$ remain separate closure targets.

### Receiver Inference Fibers and Provenance Graphs

A receiver construction makes the distinction concrete. A causal root is a prior emission time whose expanding wake meets the receiver at the reception event; several roots may contribute. For receiver $i$ at $(\mathbf X_i(T),T)$, let the retained hit record be

$$
\mathcal{H}_i^{\mathrm{hit}}(T)
=
\left\{
\left(\ell_\rho,\|\mathbf{A}_\rho\|\right)
\right\}_{\rho\in R_i(T)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c1a96d4138be1abb)

where $\rho\in R_i(T)$ indexes an active received root, $\ell_\rho$ is the retained unoriented line of action, and $\|\mathbf{A}_\rho\|$ is the retained hit strength. If an apparatus retains oriented directions or source tags, those data are added to $\mathcal{H}_i^{\mathrm{hit}}$ explicitly. The receiver inference fiber is

$$
\Gamma_i^{\mathrm{hit}}(T)
=
\left\{
\gamma\in\Gamma_T:
\text{the delayed branch sum of }\gamma
\text{ reproduces }
\mathcal{H}_i^{\mathrm{hit}}(T)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7cdb17d11b9d0cd8)

and the receiver-hit entropy is

$$
S_i^{\mathrm{hit}}(T)
=
k_B\,\mathcal{H}
\left(
\mu_T\big|_{\Gamma_i^{\mathrm{hit}}(T)}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5e11552e3011c989)

This is conditional inference entropy on the receiver's fiber, not the entropy of the distribution of possible hit records. The electrino/positrino antipode ambiguity and surrogate-location recast in [Master Equation](master-equation.md#informational-ambiguity-at-the-receiver) establish a local inference ambiguity. Equal hit records alone do not define an admissible transformation of complete histories. A measure-preserving involution additionally requires a full-history map that stays admissible, returns the original history when applied twice, and preserves the preparation weights. Swapping two compatible histories of weights $0.9$ and $0.1$ preserves their common record but not their measure. Computing the fiber entropy requires the stated weights or an explicit finite counting model.

The restricted probability measure in this formula is normalized by the fiber probability, which must be positive and finite. For a zero-probability fiber this elementary restriction is undefined; a regular conditional distribution, if supplied, is a separate construction.

For many retained roots, a causal-wake provenance graph has roots as vertices and joins roots assigned to a common transmitter worldline segment. Write $G_{\mathrm{prov}}(W;\gamma)$ when that assignment is supplied by one candidate complete history $\gamma$. If retained source tags determine the edges, they define an observed graph $G_{\mathrm{prov}}(W)$; otherwise the conditional history measure induces a distribution over possible graphs. Hidden transmitter identities do not automatically specify one observed graph.

Connected components then encode shared provenance, and an edge crossing an access cut records a shared source on opposite sides. These structures help organize concordance, unresolved boundary assignments, and wake escapement. They do not supply entropy by topology alone: the compatible assignments and their probabilities must be specified for each use.

## Minimum Specification

Every entropy statement in $\mathbb{A}\mathbb{A}\mathbb{A}$ should declare five ingredients before the number is treated as physical. First, it should name the preparation and measure $\mu_T$ on compatible deterministic histories. Second, it should name the access window $W(T)$ and retained record carrier: apparatus state, boundary wake data, Noether sea state, Physical Observer record, or simulation record. Third, it should name the coarse-graining $\mathcal{Q}$ and the projection $\Pi_{\mathcal{Q},W}$. Fourth, it should identify the entropy functional and state the comparison job: work availability, heat flow, coding, measurement locking, horizon label counting, cosmology, or another defined use. Fifth, for open windows, it should include boundary flux and record-change residuals rather than silently treating the window as isolated.

This checklist is not extra ontology. It is the minimum context needed for an entropy claim to say something definite. Without these ingredients, a phrase such as "the entropy increased," "the system is maximally entropic," or "information was lost" has not yet specified which alternatives were unresolved, which record retained them, or which comparison class made the claim meaningful.

## Temperature as a Same-Record Ensemble Variable

Temperature inherits the same discipline. It is not a primitive substrate property of an architrino, a single Noether braid, or the Euclidean void. It is an effective ensemble variable admitted only when a declared coarse-graining retains enough accessible energy exchange, state counting, and local stability for a thermodynamic or kinetic readout to be meaningful.

A minimal temperature-availability record should declare the ensemble, retained window, measure, energy ledger, fixed inventory, fixed volume or access variable, retained Noether sea state, equilibrium or thermalization residual, and observer handoff. Schematically,

$$
\mathcal A_T(W)
=
\left(
\mathcal Q,
W,
\mu,
E_{\mathcal Q,W},
\mathcal N,
\mathcal V,
\theta_{\text{sea}},
\mathcal R_{\mathrm{eq}},
\mathcal O_{\mathrm{obs}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7fa143c0847a4786)

where $\mathcal R_{\mathrm{eq}}$ records whether local thermodynamic equilibrium, detailed balance, or another thermalization condition has been derived, and $\mathcal O_{\mathrm{obs}}$ records how the temperature is measured, redshifted, or reconstructed. If $S_{\mathcal Q,W}$ is physical entropy and the derivative is stable inside the declared record, the temperature channel is

$$
\frac{1}{T_{\mathcal Q,W}}
=
\left(
\frac{\partial S_{\mathcal Q,W}}
{\partial E_{\mathcal Q,W}}
\right)_{\mathcal N,\mathcal V,\theta_{\mathrm{sea}},\mathcal C^{\mathrm{ctrl}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e50470a88034bb5c)

The derivative is taken along the admitted thermal state family, with inventory, volume, sea parameters, and external controls fixed; any other independently varying state variables must likewise be declared and held fixed. Here $S_{\mathcal Q,W}$ denotes the justified thermodynamic entropy, not arbitrary record-outcome entropy. A kinetic temperature is a special thermal comparison, available only when the accessible velocity or mode distribution has thermalized. For example, a Maxwell–Boltzmann comparison may be used only after the retained record shows

$$
f_{\mathcal Q}(\mathbf{v};\theta_{\text{sea}})
\approx
f_{\mathrm{MB}}(\mathbf{v};T_{\mathrm{kin}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-d05af14c09f7f759)

inside a declared tolerance. Without that ensemble measure or entropy-energy derivative, a high cadence, high internal energy, strong medium response, or local excitation is not yet a temperature.

At human scales, the temperature of matter is therefore a bulk property of Standard Model assemblies and their accessible modes. Atoms, molecules, solids, and plasmas redistribute energy through translational motion, molecular rotation and vibration, electron-envelope excitation, lattice or phonon occupation, photon exchange, recoil, and local Noether sea response. The scalar temperature summarizes the accessible distribution after coarse-graining; it does not measure all shielded internal assembly energy, and it is not a hidden sink for event-ledger imbalance. If a channel becomes heat, the event record must still route the energy into named electron-envelope, bonding or lattice, Noether sea, recoil, remnant, boundary, or radiation rows.

For Noether sea cadence transport, the same-record condition means temperature may bias the rates of accepted branch-ledger transitions but may not be treated as a direct single-braid heat property. The theorem target is stated in [Noether Sea](../spacetime/noether-sea.md#temperature-conditioned-branch-transition-target).

## Work Availability and Energy Spread

Traditional thermodynamics often introduces entropy as a measure of energy spread. In this chapter that is the work-availability face of record coarse-graining. A hot reservoir, chemical store, coherent photon-channel stream, or gravitational potential gradient is low entropy only relative to a work channel and comparison record that can use the concentration. After the same energy is distributed among many thermal, boundary, or wake-history microrecords, the total energy ledger may still close, but the retained record supports less extractable work.

For a fixed reference bath or readout channel with temperature $T_R$ declared by the same record, define the availability diagnostic

$$
A_{\mathcal{Q},W}^{(T_R)}(T)
=
E_{\mathcal{Q},W}(T)
-
T_R S_{\mathcal{Q},W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9e9e516ea1e74787)

Here $S_{\mathcal Q,W}$ must be thermodynamic entropy for the same effective state and reservoir model. The usual work bound additionally assumes a closed material system, one fixed-temperature bath $T_R$, the first- and second-law thermal comparison, and a declared useful-work channel with control, reset, and boundary costs included. Under these assumptions,

$$
W_{\mathrm{useful}}
\le
A_{\mathcal{Q},W}^{(T_R)}(T_i)
-
A_{\mathcal{Q},W}^{(T_R)}(T_f)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3adfd7250e4ba0ba)

with any remaining control or boundary terms stated separately. This is an effective recovery comparison, not a theorem obtained by inserting arbitrary $H(Z)$ into $E-T_RS$. Increasing thermodynamic entropy at fixed energy reduces this availability within that comparison.

For resource-theory uses, the maximum work must also be indexed by the allowed apparatus control and readout class. Let $\mathcal{C}^{\mathrm{ctrl}}_W$ denote the declared controls, measurements, feedback operations, and reset operations available in the window, and let $R_f$ denote the required final record. Then the same physical system supports the diagnostic

$$
W_{\max}\!\left(\theta_W;\mathcal{C}^{\mathrm{ctrl}}_W,R_f\right)
=
\sup_{\alpha\in\mathcal{C}^{\mathrm{ctrl}}_W}
\Delta E_{\mathrm{weight}}\!\left[\alpha:\theta_W\to R_f\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-ca4951d25b4b8f31)

The weight increment is net work after control, measurement, feedback, and reset costs; $\theta_W$ is the initial physical record. Only processes that attain the required $R_f$ enter the supremum. If none do, that constrained optimization is infeasible. A broader availability envelope may explicitly include a no-extraction process with zero work and its compatible final record. Knowledge of a controllable distinction matters only through an available physical record and control channel.

This also disciplines heat-death language. A claim that a universe window has no usable work left is not a bare statement about the complete microstate; it is a statement about a declared class of controls, readouts, reservoirs, and final records. For a control family $\mathcal{C}^{\mathrm{ctrl}}$ over admissible windows, the remaining work-availability envelope can be written schematically as

$$
\mathcal{A}_{\mathrm{use}}(T;\mathcal{C}^{\mathrm{ctrl}})
=
\sup_{W,R_f}
W_{\max}\!\left(\theta_W(T);\mathcal{C}^{\mathrm{ctrl}}_W,R_f\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d244d05e174e24c)

This envelope distinguishes exposed gradients from internal assembly energy whose accessibility may depend on shielding. As a separate gross-exposure proxy, for fixed nonnegative internal-energy accounts define

$$
E_{\mathrm{exposure}}^{\max}
=
\sup_{\alpha\in\mathcal C^{\mathrm{ctrl}}_{\mathrm{shield}}\cup\{0\}}
\sum_A
\left(\zeta_{\mathrm{probe},\alpha}(A)-\zeta_{\mathrm{probe},0}(A)\right)_+
E_{\mathrm{internal}}(A)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c57f5580363bf27d)

Here $\mathcal C^{\mathrm{ctrl}}_{\mathrm{shield}}$ contains the declared leakage-changing operations, $0$ denotes doing nothing, and $[x]_+=\max(x,0)$. The proxy is zero when no such change is available. It estimates increased exposure and omits extraction efficiency, control/reset costs, changes of internal energy, and final-state constraints. Actual availability is computed by $W_{\max}$ on a cost-complete process. In normalized units $c_f=1$, an abstract process exposing one energy unit at a control cost of two has proxy one and net work minus one. The example distinguishes objectives; it does not establish a physical de-shielding process.

Separate exposed-energy and shielding optima can be added only if their controls, resources, costs, and final constraints are separable and jointly attainable. If admissible controls yield contributions $(1,0)$ or $(0,1)$, their joint maximum is one although the sum of separate maxima is two. Exhaustion of exposed gradients alone therefore does not settle availability when additional shielding controls are admitted.

A proposed assembly inertial-response map does not by itself establish extractable energy. In the trace ansatz of [Energy](energy.md#emergent-inertia-mass-from-shielded-energy), assume the prefactor $\alpha_{\mathrm m}E_{\mathrm{internal}}/c_{\mathrm{eff},0}^2$ is positive, where $\alpha_{\mathrm m}$ is the proposed map coefficient and $c_{\mathrm{eff},0}$ its reference effective propagation speed. The exact positivity criterion for the scalar trace coefficient $m_{\mathrm{tr}}$ is

$$
m_{\mathrm{tr}}>0
\quad\Longleftrightarrow\quad
B+C>0,
\qquad
B=\zeta_{\mathrm{probe}}(A)(1+\delta\mathcal M_0),
\quad
C=\frac13\mathcal Z_{\mathrm{tf},ab}(A)\delta\mathcal M_{\mathrm{tf}}^{ab}
$$

[View →](../../../../equation-mapping.html#corpus-equation-00d5e9889b634686)

The contraction $C$ is signed. The stronger bound $B>|C|$ is sufficient, not necessary: $B=1$, $C=1.62$ gives a positive trace bracket $2.62$ while failing that bound. Here $m_{\mathrm{tr}}$ is a candidate scalar summary of an assembly response tensor, not a derived physical mass or an architrino property. Positive trace proves neither positive response in every direction nor usable work. Mass formation and its relation to gravitational response remain open. Extraction must respect the declared control and final-state class; assembly dissociation is permissible when that class admits it, while a protocol requiring the original assembly to survive excludes it.

A heat-death statement for that control family means $\mathcal{A}_{\mathrm{use}}$ tends to zero or below the declared operational threshold. It does not prove that every possible future record system, assembly class, or Noether sea access channel has no usable distinction. It proves only the exhaustion of usable gradients and accessible shielded reservoirs for the stated comparison class.

For open windows, the same point must be stated with boundary records. A planetary, biological, or engineered window may receive and emit nearly equal total energy while still being driven by low-entropy input. The relevant record distinguishes incoming concentrated photon-channel packets, chemical gradients, or potential-gradient data from outgoing lower-frequency radiation, heat, and boundary-wake history:

$$
\mathcal{B}_{\partial W}^{\mathrm{therm}}
=
\left(
\dot E_{\mathrm{in}},
\rho_{\mathrm{in}}(\nu,\Omega),
\dot E_{\mathrm{out}},
\rho_{\mathrm{out}}(\nu,\Omega),
\mathcal{B}_{\mathrm{wake}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-023b39cf30d1f321)

where $\rho_{\mathrm{in}}$ and $\rho_{\mathrm{out}}$ are retained spectral/angular records, not new ontological fluids. The entropy claim is physical only when this boundary record is the same one used for energy flux, internal work, heat, and observer readout.

## Complexity and Driven Intermediate Windows

Entropy and complexity answer different questions. Entropy compares how many compatible histories remain unresolved after a coarse-graining. Complexity asks whether the path between low-entropy and high-entropy records passes through organized intermediate structures. Low entropy can be simple, high entropy can be simple, and the interesting dynamics often occur in a driven window between them.

For an effective thermodynamic regime with an additive inside/environment account, one class of organization-maintaining processes satisfies

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{inside}}
+
\Delta S_{\mathcal{Q},\partial W+\mathrm{env}}^{\mathrm{export}}
\ge
0,
\qquad
\Delta S_{\mathcal{Q},W}^{\mathrm{inside}}\le 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-862813fe9924497e)

where both terms denote thermodynamic entropy and include the same boundary exchanges. The second inequality specifies this process class, not all organized systems: a maintained steady state can have zero internal change while producing and exporting entropy. General correlated record entropies require $H(A,B)=H(A)+H(B)-I(A;B)$, where mutual information $I$ measures the information shared between the two records. A reversible map $(X,0)\mapsto(X,X)$ for a fair bit preserves joint entropy but raises the sum of marginal entropies by $\log2$ through correlation. That increase alone is not physical entropy production.

Origin-of-life and metabolism-first arguments are useful comparison pressure at this level. They do not show that entropy creates life, and they do not add biological ontology to $\mathbb{A}\mathbb{A}\mathbb{A}$. They say that a plausible prebiotic reaction window must name usable gradients, compartment-like retention, reaction throughput, and entropy export. In native terms, that becomes a finite-window reaction-ledger problem: the source record must show how low-entropy chemical, photon-channel, geothermal, or potential-gradient input is converted into persistent organized records while the boundary ledger exports a larger entropy burden.

A provisional assembly diagnostic can compare coherent and incoherent records. Fix finite alphabets of sizes $n_{\mathrm{coh}},n_{\mathrm{incoh}}\ge2$, a window, and a common preparation measure. Declare which retained variables represent phase-locked behavior and which represent the background; their pushforward distributions define the marginal record-outcome entropies $S^{\mathrm{coh}}$ and $S^{\mathrm{incoh}}$. Use the fixed normalization $S^{\max}=k_B\log\max(n_{\mathrm{coh}},n_{\mathrm{incoh}})$, retaining only jointly admissible distributions induced by the same histories. Then define

$$
\mathcal{C}_W
=
\frac{S_{\mathcal{Q},W}^{\mathrm{incoh}}}
{S_{\mathcal{Q},W}^{\max}}
\left(
1
-
\frac{S_{\mathcal{Q},W}^{\mathrm{coh}}}
{S_{\mathcal{Q},W}^{\max}}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-7cefab91c3835353)

Writing the two normalized marginal entropies as $x$ and $y$, this score is $x(1-y)$ and peaks at $(1,0)$ on the full unit square. This is a derived property of the score, not a stability theorem. Its association with stable assemblies is a guessed diagnostic hypothesis to test on a fixed assembly/background family; changing unrelated background noise can alter the score without changing core dynamics. Stability must be established independently from actual admissible trajectories and their perturbations. Stable assemblies away from the proposed ridges, or unstable assemblies on them, would reject that association.

## Mapping in from Standard Entropies

Legacy entropy formulas survive as effective projections with different prerequisites.

Clausius entropy, $dS=\delta Q_{\mathrm{rev}}/T_{\mathrm{temp}}$, is licensed only in a regime where the reversible comparison class, heat channel, and temperature channel are defined by the same physical record. Without that record, the formula is a comparison mnemonic rather than a substrate claim.

The Clausius definition also has a direction of dependence that must not be reversed. A cycle statement can be made without entropy:

$$
\oint \frac{\delta Q}{T_{\mathrm{temp}}}\le 0,
\qquad
\oint_{\mathrm{rev}}\frac{\delta Q_{\mathrm{rev}}}{T_{\mathrm{temp}}}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-eb3ae6f3bd77fe38)

for the declared heat reservoirs, temperature scale, and reversible comparison class. Only after that integrability condition is available does the entropy difference

$$
\Delta S_{\mathrm{Cl}}
=
\int_{A}^{B}\frac{\delta Q_{\mathrm{rev}}}{T_{\mathrm{temp}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-427412577e15da0c)

become path-independent. In this chapter, a claim that "entropy broke the second law" must therefore specify which entropy is being used. If the Clausius integrability condition fails, the thermodynamic entropy used in that comparison was not well-defined in the first place.

One candidate obstruction to integrability is a Noether sea response that fails to return over the thermodynamic cycle. Let the sea-retuning lag be

$$
\Lambda_{\text{sea}}(W)
=
\frac{
T_{\text{retune}}\!\left(\theta_{\text{sea}}\right)
}{
P_{\text{cycle}}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-de8aeecf345df1bf)

where $T_{\text{retune}}$ is the relaxation time for the Noether sea response variables retained by the record and $P_{\text{cycle}}$ is the duration of the reversible-comparison cycle. The condition $\Lambda_{\text{sea}}\ll1$ is neither necessary nor sufficient by itself for a state function; it is a scale-separation diagnostic. When $\Lambda_{\text{sea}}\gtrsim1$, cycle-scale hysteresis becomes likely and must be measured. A nonzero period $\oint\delta Q_{\mathrm{rev}}/T_{\mathrm{temp}}$ on the declared comparison cycle, not the timescale ratio alone, is the obstruction to path independence.

In differential-form language, $\delta Q/T_{\mathrm{temp}}$ is an exact 1-form on the admitted state domain only if its integral is path-independent, equivalently if its periods vanish together with the required local closure conditions. Fast retuning may support that limit but does not prove it. The measurable candidate signature is a hysteresis-loop period that varies systematically with the sea-retuning lag rather than with an independently assigned entropy defect.

> Claim grade: guessed for Noether sea lag as the controlling source of the hysteresis period. Falsifier: a certified sea branch with large $\Lambda_{\mathrm{sea}}$ and vanishing periods, or small $\Lambda_{\mathrm{sea}}$ with a regulator-stable nonzero period after other state variables are retained, would refute the proposed one-parameter control.

Boltzmann entropy, $S=k_B\log \Omega$, maps to the count or measure of complete architrino and assembly histories compatible with the retained macrostate. The textbook counting form is the uniform-weight special case of Gibbs/Shannon entropy:

$$
p_\alpha=\frac{1}{\Omega}
\quad\Longrightarrow\quad
-k_B\sum_{\alpha=1}^{\Omega}p_\alpha\log p_\alpha
=
k_B\log\Omega
$$

[View →](../../../../equation-mapping.html#corpus-equation-56ca9b5506deb8f2)

The Boltzmann log-count itself uses cardinality or phase volume. Its identification with conditional Gibbs/Shannon entropy additionally assumes uniform weights within the compatible macrostate. For an exact-history partition, every observed singleton has zero Boltzmann and conditional inference entropy, while the distribution over those exact records may still have nonzero outcome entropy. The thermodynamic identification requires macrostates tied to measurable, controllable, or dynamically stable distinctions.

Elementary thermal examples often count energy-quanta arrangements: one macrostate may specify only how much energy lies in each body, while many bond-level or molecule-level allocations remain unresolved. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement is the same mathematical role with a deeper state space: count complete deterministic histories compatible with the retained energy, wake, boundary, apparatus, and Noether sea records.

Gibbs/Shannon entropy can be evaluated on a distribution of records or on a conditional distribution of histories, with the distinction stated. These uses cover apparatus outcomes, basin weights, and coding descriptions. Sharing a physical record is necessary for a thermodynamic comparison, but not sufficient: its entropy must also reproduce the admitted heat, work, and equilibrium relations.

At deterministic-multistability points, choose a measurable preparation-conditioned subset $\Gamma_{\mathrm{prep}}(T)\subseteq\Gamma_T$ with $0<\mu_T(\Gamma_{\mathrm{prep}}(T))<\infty$. Let the measurable sets $\{B_k\}$ partition every admitted outcome at $T_+$, including any nonsettled outcome, and let the flow be defined almost everywhere on this subset. The basin weights are

$$
w_k
=
\frac{
\mu_T\!\left(
\mathcal{F}_{T\to T_+}^{-1}(B_k)
\cap
\Gamma_{\mathrm{prep}}(T)
\right)
}{
\mu_T\!\left(\Gamma_{\mathrm{prep}}(T)\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d66a142244462fcd)

and their record-outcome entropy is $-k_B\sum_k w_k\log w_k$. The stated domain ensures normalization; zero conditioning mass leaves this ratio undefined. These weights depend on the declared preparation measure and do not select the realized branch. Recovering Born probabilities requires the further physical preparation and measurement mapping, not just this conditional-probability identity.

Von Neumann and entanglement entropies map to a declared quantum comparison record, factorization, and access cut. For a retained sector $A$ and unresolved complement $\bar A$, the standard reduced record is

$$
\rho_A(\theta)
=
\mathrm{Tr}_{\bar A}\rho_{A\bar A}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-cac11114d19667e3)

with entropy

$$
S_A(\theta)
=
-k_B\,\mathrm{Tr}\!\left(\rho_A(\theta)\log\rho_A(\theta)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-8864618cd932a12a)

Even when the full comparison state is pure, reversible, or measure-preserving, $S_A$ can be nonzero because correlations with $\bar A$ have been excluded from the retained record. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is an access-cut entropy: the same mathematical role must be recovered as coarse-graining over unresolved path-history, apparatus, boundary-wake, and Noether sea correlations that cross the declared cut.

A candidate substrate account uses the provenance graph across an access cut. For a cut $\Sigma$ separating retained sector $A$ from complement $\bar A$, and a specified tagged record or candidate history, build

$$
G_{\mathrm{prov}}(\Sigma)
=
\left(
V_A\sqcup V_{\bar A},
E_{\Sigma}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-13793d1954c6ff5d)

where vertices are retained roots on the two sides and an edge records a shared transmitter segment. Let $\operatorname{Assign}(G_{\mathrm{prov}}(\Sigma),\mathcal B_\Sigma)$ be the finite set of globally compatible unresolved assignments consistent with the retained boundary record, and let $p$ be their normalized conditional distribution. Its inference entropy satisfies

$$
S_{\Sigma}^{\mathrm{inf}}
=k_BH(p)
\le k_B\log\left|\operatorname{Assign}
\left(G_{\mathrm{prov}}(\Sigma),\mathcal B_\Sigma\right)\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbca934e3fdd96a1)

Equality requires uniform weights on all assignments. Thus the right side is log-capacity, not automatically the sampled entropy or quantum entanglement entropy. Recovery of the latter additionally requires the quantum comparison state and its factorization. A closed global record alone does not establish purity or measure preservation.

A finite-edge capacity bound requires that the tuple of crossing-edge labels distinguish every assignment being counted. If this injection exists and edge $e$ has at most $d_e$ labels, with no extra uncounted internal multiplicity, then

$$
\left|\operatorname{Assign}(G_{\mathrm{prov}}(\Sigma),\mathcal B_\Sigma)\right|
\le
\prod_{e\in E_\Sigma}d_e,
\qquad
S_\Sigma^{\mathrm{inf}}
\le
k_B\sum_{e\in E_\Sigma}\log d_e.
$$

[View →](../../../../equation-mapping.html#corpus-equation-fb24ad351d46fbe8)

Finite, regulator-stable crossing-edge density and mean $\log d_e$ provide an upper bound of area order. A positive area law also requires a positive limiting entropy per area for the globally compatible distribution; capacity alone does not ensure it. For example, any number of binary edges constrained to one common fair bit has entropy $k_B\log2$, independent of area. The proposed realization by terminal Noether braid patches and labels $(\chi_u,N_{s,u},M_{p,u})$ remains a hypothesis. The black-hole coefficient requires both physical patch-area normalization and the appropriate positive entropy density.

> Claim grade: derived for the finite-alphabet bound under the injection assumption; guessed for a positive area density realized by terminal Noether braid patches. Falsifier: an assignment not distinguished by its edge-label tuple invalidates the bound's application; vanishing entropy density, unbounded capacities, or failure of regulator stability rejects the proposed area-law realization.

For a coding record with source distribution $P=\{p_i\}$, the Shannon entropy in bits is

$$
H_2(P)
=
-\sum_i p_i\log_2 p_i
$$

[View →](../../../../equation-mapping.html#corpus-equation-55d214c966975711)

This has a precise compression interpretation: for any prefix-free code $\mathcal{C}$ that encodes symbols drawn from $P$, the average code length obeys

$$
\bar L_{\mathcal{C}}(P)
\ge
H_2(P)
$$

[View →](../../../../equation-mapping.html#corpus-equation-91a0fc328c7189d2)

with block codes able to approach the bound under the usual coding assumptions. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this is not free-floating information. It is an entropy of a declared symbol record, model class, and decoding channel.

Cross-entropy makes model dependence explicit. If the prediction model uses $Q=\{q_i\}$ while symbols have distribution $P$, the expected ideal logarithmic coding cost is

$$
H_2(P,Q)
=
-\sum_i p_i\log_2 q_i
$$

[View →](../../../../equation-mapping.html#corpus-equation-aa7fc6e93bb39f97)

This is log-loss, not every implemented mean code length: $P=Q=(0.9,0.1)$ gives about $0.469$ bits, whereas a binary prefix code for two individual symbols needs at least one bit each. Block or arithmetic coding can approach the ideal rate under its coding assumptions and overhead. For compatible support, $H_2(P,Q)=H_2(P)+D_{\mathrm{KL}}(P\|Q)/\log2$; if $q_i=0<p_i$, the loss is infinite. The excess measures model mismatch. Physical cost still requires a symbol carrier, encoder, decoder, update protocol, and device/boundary account.

Record entropy maps to durable alternatives in an apparatus or observer channel. A record is not merely a symbolic label. It is an assembly/environment state that persists long enough to be read, copied, or reset within a declared window.

Horizon entropy maps to observer-accessible boundary or horizon-interface label capacity. It is not a literal statement that the Euclidean void is made of area bits. The label count must be derived from strong-field Noether sea and orthogonal-axis three-binary records.

Computation entropy maps to implemented device cost. Bit logic alone does not create a thermodynamic cost. A cost claim is physical only after the device state space, success criterion, reset operation, heat/work ledger, and boundary exchange have been declared.

## Mapping out to Effective Physics

The outward map from $\mathbb{A}\mathbb{A}\mathbb{A}$ to effective entropy has five steps.

First, choose the physical window $W$, record carrier, preparation measure, and allowed controls. Second, define the coarse-graining $\mathcal Q$ and its projection. Third, form either the pushforward distribution of possible records or the conditional distribution of histories given the observed record, according to the question. Fourth, compute the specified outcome entropy, inference entropy, or Boltzmann log-volume with its reference. Fifth, establish its physical reduction before comparing it with a thermodynamic, quantum, or horizon law.

In a coarse local thermodynamic regime, suppose the chosen entropy admits an additive density and current, with correlations absent or controlled by an explicit approximation. Only under that reduction does a moving-window balance take the form

$$
\frac{dS_{\mathcal{Q},W}}{dT}
=
\sigma_W(T)
-
\int_{\partial W(T)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
+
\mathcal{R}_{\mathcal{Q}}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-efa0c673ea34bd29)

Here $\sigma_W$ is total physical production inside the window, $\mathbf J_S$ is its entropy current, $s_{\mathcal Q}$ the additive density, $\mathbf u_{\partial W}$ the boundary velocity, and $\mathcal R_{\mathcal Q}$ the change caused by switching record maps or reference conventions. The moving-boundary term follows by transport of the admitted density; it does not establish that such a local density exists for a general history entropy. A general correlated record account retains mutual-information changes and information transfer explicitly. For a fixed spatial window, $\mathbf u_{\partial W}=\mathbf0$.

On a regular observer chart, the projection rank, retained variables, reference measure, and coarse-graining are fixed. When a branch fold, record separator, projection-rank change, or coarse-graining handoff changes that chart, $\mathcal{R}_{\mathcal{Q}}$ is the bookkeeping correction produced by comparing the old and new record maps. It is not a local production term and must not be absorbed into $\sigma_W$ or the boundary flux. A quantitative chart-change row must name both maps and compare them through a declared common refinement; otherwise an apparent entropy jump cannot be assigned uniquely to physical irreversibility rather than changed bookkeeping.

A monotone entropy statement is therefore conditional:

$$
\frac{dS_{\mathcal{Q},W}}{dT}\ge 0
\quad\Longleftrightarrow\quad
\sigma_W(T)+\mathcal{R}_{\mathcal{Q}}(T)
\ge
\int_{\partial W(T)}
\left(
\mathbf{J}_S
-
s_{\mathcal{Q}}\mathbf{u}_{\partial W}
\right)
\cdot\hat{\mathbf{n}}\,dA
$$

[View →](../../../../equation-mapping.html#corpus-equation-abb650d46adaa80a)

for the declared record. The phrase "entropy of the universe" is not a complete claim unless it supplies the measure, window, boundary, and residual terms.

Wake escapement gives a candidate route to increasing hidden uncertainty. Let $\mathcal E_{\mathrm{esc}}(W)$ be the geometric set in [Energy](energy.md#wake-escapement). On a finite discrete common history partition $X$, compare records $Z_-$ and $Z_+=f(Z_-)$ before and after removing specified escaping labels, with the history measure held fixed during this comparison. The lost information is $L_{\mathrm{esc}}=H(X\mid Z_+)-H(X\mid Z_-)=I(X;Z_-\mid Z_+)\ge0$. Define $\Sigma_{\mathrm{esc}}$ as its rate when that limit exists; additional dynamical evolution is accounted for separately. The physical mechanism target is

$$
\frac{d}{dT}S^{\mathrm{inf}}_W(T)
=
k_B\sigma_W^{\mathrm{int}}(T)
+
k_B\Sigma_{\mathrm{esc}}\left(\mathcal E_{\mathrm{esc}}(W),\mu_T,\Pi_{\mathcal Q,W};T\right)
+
\mathcal R_{\Pi,W}(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3a30bd457031e485)

Here $\sigma_W^{\mathrm{int}}$ names the remaining interior contribution to conditional uncertainty, not an already proved nonnegative thermodynamic production, and $\mathcal R_{\Pi,W}$ contains other projection changes, excluding the label loss assigned to $\Sigma_{\mathrm{esc}}$. This equality is a proposed physical decomposition, not a consequence of counting escaping roots. A hundred duplicate labels may carry only one bit. Losing a fair bit increases hidden uncertainty by $\log2$ but decreases record-outcome entropy by $\log2$. Moreover, positive outward thermodynamic entropy flux enters the earlier window balance with a minus sign. Identifying information loss with that flux or with physical production therefore requires a separate reduction with its signs established.

The dynamics stack proposes a common memory-boundary origin for several residuals: wake escapement in the energy ledger, the $\omega_{\mathrm{mem}}$ leak in [Effective Lagrangian](effective-lagrangian.md#effective-hamiltonian-domain-criterion), response-center drift in [Energy](energy.md#energy-conservation-and-exchange), and lost distinctions in the entropy record. These objects have different mathematical types and cannot be identified merely by analogy. The closure target is a single boundary functional whose distinct projections reproduce each residual on the same retained branch. A secular boundary record is a candidate common source of apparent dissipation, non-Hamiltonian projection, center drift, and observer-window entropy growth.

> Claim grade: guessed for the existence of one boundary functional producing all four projections. Falsifier: two residuals that remain nonzero on independently closed, mutually incompatible boundary records, or a proof that their boundary terms cannot be projections of one functional, would reject the proposed unification.

## Second Law and Same-Record Monotonicity

Traditional second-law formulations are effective comparisons: Clausius constrains heat cycles, Kelvin–Planck constrains cyclic conversion of heat from one reservoir into work, Boltzmann typicality concerns measures of macrostates, and Maxwell-demon analyses include memory resources. Their equivalence requires the relevant thermal and statistical hypotheses. None follows from a general record-entropy definition alone.

For a thermodynamic isolated comparison with a fixed record class, a nondecrease claim requires a derived or measured typicality statement under a specified preparation and time window. Ideal reversible comparisons can have zero thermodynamic entropy change. A singleton exact-history fiber has zero conditional inference entropy, but that fact is not a thermodynamic second-law statement.

Complete energy, inventory, and causal-history accounting does not imply a universal entropy equality. Hidden conditional uncertainty can increase as accessible distinctions are lost; record-outcome entropy has a different refinement direction. A thermodynamic entropy-growth claim additionally requires its physical coarse description and boundary conditions.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ the second law is a recovery target for finite-window typicality and physical bookkeeping, not a source of absolute time. In the additive thermodynamic regime above, the diagnostic removing map changes from measured inside and environment changes is

$$
\Delta S_{\mathcal Q,\mathrm{tot}}^{\mathrm{phys}}
=
\Delta S_{\mathcal Q,W}
+
\Delta S_{\mathcal Q,\partial W+\mathrm{env}}
-
\int_{T_i}^{T_f}\left(\mathcal R_{\mathcal Q,W}+\mathcal R_{\mathcal Q,\mathrm{env}}\right)dT
\ge -\epsilon_{\mathrm{fluc}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bef0d330f181c4dd)

Both observed entropy changes already contain their map-change terms, so those terms are subtracted once. With no physical evolution, a record-map change alone gives zero corrected change. Internal transfers cancel between the two accounts when all relevant boundaries are included. Without the additive reduction, replace their sum by the joint entropy or include its correlation correction.

The inequality is a conditional statistical target: a finite $\epsilon_{\mathrm{fluc}}\ge0$ must satisfy a declared bound $\Pr_{\mu_{\mathrm{prep}}}(\Delta S_{\mathcal Q,\mathrm{tot}}^{\mathrm{phys}}<-\epsilon_{\mathrm{fluc}})\le\delta$ for a stated failure probability $\delta$, system class, and duration. No such bound is derived merely by naming the tolerance. Macroscopic negligibility and microscopic fluctuation sizes must be justified in the particular comparison.

For an isolated thermodynamic system with fixed maps, the target reduces to the effective nondecrease statement. A refrigerator may have a negative inside change paid for by a larger environmental increase. Reversible comparisons have zero physical production; irreversible ones can have positive production with both chart residuals zero. For a Maxwell-demon comparison, the memory, actuator, target, work store, and reset channel must be included in the declared physical accounting.

Record-circularity pressure lands exactly here. The second law does not by itself prove that a present record descends from a low-entropy past; it uses a low-defect boundary condition and ordinary history-backed records to make the second-law inference trustworthy. In this chapter that burden is not hidden. The path-history measure, boundary-condition prior, and observer record all belong in $\theta_W$, and the Boltzmann-brain residual $\mathcal{R}_{\mathrm{BB}}(\theta)$ below is the extreme test of whether isolated observer-fluctuation records have been suppressed relative to shared history-backed records.

What survives from the traditional interpretation is strong: thermodynamics is not being rejected. Heat engines, irreversible mixing, work availability, macrostate dominance, memory reset, decoherence, and horizon bookkeeping remain real effective constraints. What changes is the level assignment. The second law is a theorem target about projected deterministic histories and declared records, not an ontological rival to the substrate dynamics.

## Same-Record Closure Rule

A thermodynamic analysis has one declared record. In a local horizon, measurement, computation, or near-equilibrium simulation, write that record schematically as

$$
\theta_W
=
\left(
\mathcal{H}^{W},
\mathcal{B}^{(O)}(W),
\left.\mathcal{N}_{\mathrm{sea}}\right|_W,
O_W,
\Pi_{\mathrm{eff}},
\mu_{\theta}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5da3c27369963180)

where $\mathcal{H}^{W}$ is retained path-history data, $\mathcal{B}^{(O)}(W)$ is observer-accessible boundary or apparatus record data, $\left.\mathcal{N}_{\mathrm{sea}}\right|_W$ is the resolved Noether sea state on the window, $O_W$ is the observer clock/ruler/readout state when an observer is part of the comparison, $\Pi_{\mathrm{eff}}$ is the effective projection, and $\mu_{\theta}$ is the conditional measure over unresolved deterministic histories.

The admissible comparison has the form

$$
\left(
S,\,
T,\,
dQ,\,
\Delta E,\,
\{p_i\},\,
\mathcal{B}_{\mathrm{rec}}
\right)
=
\mathcal{P}_{\mathcal{Q},W}(\theta_W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-543128a06c7e474c)

where all listed quantities are projections of the same $\theta_W$. If entropy is computed from one $\theta_W$, temperature from another, Born-style basin weights from a third, and flux from a fourth, the analysis has not established their compatibility. It has fitted separate descriptions.

This rule is why entropy appears as a discipline across many chapters. It protects the Born-rule program from using one ensemble for outcome weights and another for apparatus thermodynamics. It protects horizon thermodynamics from assigning independent entropy, temperature, and stress records. It protects computation-cost claims from treating logical form as a free physical process.

In the language of the core definition, the same-record rule says that entropy, temperature, heat flux, basin weights, and record costs must be constructed consistently from one declared history measure and its retained records, with the required conditioning and physical reductions stated. Fitting them from separate ensembles is a split-fiber error: the quantities may be individually meaningful, but the analysis has not shown that they are compatible projections of one physical record.

## Entropy and Absolute Time

Absolute time is the ordering parameter of the substrate law. Entropy does not create it. The causal arrow enters the dynamics through delayed causal wakes: only emissions from $T_t < T_r$ can contribute to a receiver at reception time $T_r$. Thermodynamic, biological, measurement, and cosmological arrows are finite-window consequences of dynamics, boundary conditions, and retained records.

Under a fixed discrete history measure, discarding retained information increases average conditional inference entropy and decreases record-outcome entropy. Over physical time the measure also evolves; neither sign follows from projection alone for an arbitrary moving record. A thermodynamic arrow requires dynamics, preparation, and the physical entropy reduction. It does not generate time itself.

The arrow-of-time closure problem is therefore sharper than a generic second-law slogan. A mature account must explain why the admissible early record is low-defect or low-entropy in the relevant coarse-graining, and why later macroscopic reversal would require reconstruction of path-history and wake-phase detail no finite observer or apparatus can retain.

The past-hypothesis comparison also depends on the partition. A nearly uniform early matter record can look high entropy under a non-gravitating gas coarse-graining and low entropy under a gravitational coarse-graining, because gravitational clumping, potential-energy release, and horizon labels open far larger compatible records later. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the lesson is not that gravity is entropy. It is that a cosmological entropy statement must name whether its macrostate includes Noether sea state, potential gradients, causal-wake boundary data, and horizon-interface records.

The standard cosmology comparison gives a useful scale check for this distinction. The entropy budget of [Egan and Lineweaver (2010)](https://doi.org/10.1088/0004-637X/710/2/1825) estimates the observable-universe total at about $10^{104}k_B$, dominated by supermassive black holes, and the current cosmic-event-horizon entropy at about $10^{122}k_B$; radiation estimates are many orders of magnitude smaller. These estimates are model- and horizon-dependent, so the chapter uses only the robust ordering $S_{\gamma,\mathrm{CMB}}\ll S_{\mathrm{BH,pop}}\ll S_{\mathrm{horizon}}$ as a comparison target. They are not substrate entropy of the Euclidean void. The corresponding exponential expression below is a sensitivity illustration for the size of a compatible-history fiber, not a measured probability that an external random draw selected the universe:
$$
f_{\mathrm{early}}
\sim
\exp\!\left[-\frac{S_{\max}-S_{\mathrm{early}}}{k_B}\right]
\approx
\exp(-10^{122})
$$

[View →](../../../../equation-mapping.html#corpus-equation-de56fe84878a628b)

Its exponent inherits the chosen cosmological entropy budget and must be recomputed if that budget changes.

## Heat Death and Its Escapes

> Claim grade: inferred for the three possible openings below; none is a derived cyclic mechanism. Falsifier: show that every admissible late-time branch with the declared matter content and boundary conditions approaches one fixed maximum-entropy macrostate, or show that the proposed openings cannot be represented by the same retained history measure and boundary ledger.

A pure relaxation to one fixed maximum-entropy macrostate is not derived here. Three conditional openings remain. First, if a retained regularized branch is invertible and preserves the reference measure used for fine-grained entropy, that fine-grained entropy is constant while a declared coarse entropy may change; without that measure-preservation certificate, even this statement remains open. Second, gravitating systems can exhibit negative heat capacity and horizon formation, so an ordinary extensive equilibrium picture cannot be assumed without specifying the boundary and ensemble. Third, a de Sitter-like cosmological horizon has an area entropy in the standard comparison framework of [Gibbons and Hawking (1977)](https://doi.org/10.1103/PhysRevD.15.2738), but whether an analogous accessible ceiling changes along an $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmological history must be derived rather than assumed.

These are openings, not a mechanism. Any concrete cyclic or recycling cosmology that would exploit them must still close a global entropy ledger — every local thermodynamic decrease accounted for by compensating changes under the admitted global balance — and that accounting, together with a named substrate driver, remains open work rather than a result asserted here.

Boltzmann-brain pressure exposes the same rule in extreme form. A retained observer record cannot certify the low-entropy history that is then used to certify the retained observer record. The analysis must separate the internal consistency of a memory record from the boundary-condition claim that the record descends from a shared low-defect universe path history. Let $\Gamma_{\mathrm{hist}}$ denote compatible complete histories in which observer records, cosmological traces, and low-defect boundary data descend from one shared path-history record. Let $\Gamma_{\mathrm{BB}}$ denote compatible complete histories in which an observer record is an isolated high-entropy fluctuation with no shared supporting cosmological record. The corresponding fluctuation residual is

$$
\mathcal{R}_{\mathrm{BB}}(\theta)
=
\frac{
\mu_{\theta}\!\left(\Gamma_{\mathrm{BB}}\right)
}{
\mu_{\theta}\!\left(\Gamma_{\mathrm{hist}}\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-204207c15eada109)

for the same measure and window, with positive finite denominator and finite numerator. If the denominator is zero and the numerator positive, the ratio is infinite in the extended sense; if both vanish, the comparison is undefined. A mature entropy cosmology must establish $\mathcal R_{\mathrm{BB}}\ll1$ on its admitted class or explain why that class is inapplicable. The ratio's definition alone does not settle record circularity.

The delayed dynamics supply a sharper discriminator than the bare measure ratio. For a candidate observer record $O_W$, define the wake-concordance order parameter

$$
\mathcal{K}(O_W)
=
\frac{
\#\left\{
\text{roots at }O_W
\text{ sharing a transmitter worldline with roots at neighboring receivers}
\right\}
}{
\#\left\{
\text{incoming roots at }O_W
\right\}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ae0767b0c14ea807)

The denominator counts retained incoming roots and must be nonzero; otherwise $\mathcal K$ is undefined, not evidence for either history class. Edges must come from retained tags or be evaluated on candidate histories with their conditional weights. The proposed discriminator is that history-backed records tend toward high $\mathcal K$, while isolated fluctuations tend toward low $\mathcal K$. Shared provenance does not itself prove a low-entropy past or exclude a high-$\mathcal K$ fluctuation; the claim requires distributions over both independently specified history classes.

> Claim grade: guessed for $\mathcal K$ as a discriminator between history-backed and isolated-fluctuation records. Falsifier: overlapping $\mathcal K$ distributions for the two independently constructed history classes under the same receiver neighborhood, window, and preparation measure would reject the discriminator.

## Measurement and Computation

Measurement records require physical persistence, but persistence does not impose a universal positive entropy-production threshold. For a declared apparatus/environment channel, define the same-record entropy change

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(T_{\mathrm{rec},0}+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(T_{\mathrm{rec},0})
$$

[View →](../../../../equation-mapping.html#corpus-equation-152e11c0be2d33aa)

with $T_{\mathrm{rec},0}$ the start of the record-formation window. A particular irreversible apparatus may require a positive locking threshold

$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
S_{\mathrm{lock}}>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-970ce7dd80e2198c)

with $S_{\mathrm{lock}}$ measured for that apparatus class and readout channel. This is neither a collapse law nor a universal condition on measurement. A reversible measurement model, a metastable record, or a record stabilized by an energy barrier can have a different entropy ledger. The physical requirement is that the declared persistence and readout tests pass while all work, heat, and boundary terms remain on the same record.

> Claim grade: guessed for any positive $S_{\mathrm{lock}}$ criterion and measured only after a named apparatus determines it. Falsifier: a record in the same declared apparatus class that passes the persistence and readout tests with $\Delta S_{\mathcal Q,W}^{\mathrm{app+env}}<S_{\mathrm{lock}}$ would reject that threshold.

For an initially uncorrelated memory with $N$ equiprobable states, a thermal reset comparison with no usable side information gives the environment-plus-boundary bound associated with [Landauer's principle](https://doi.org/10.1147/rd.53.0183):

$$
\Delta S_{\mathrm{env}}+\Delta S_{\mathrm{boundary}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2
$$

[View →](../../../../equation-mapping.html#corpus-equation-8e32d3ee892a905c)

Here $\varepsilon_\mu$ is an upper bound on the final memory's dimensionless Shannon entropy under a declared reset-error model, not an error probability or readout tolerance. Perfect reset has $\varepsilon_\mu=0$. A binary reset with failure probability $p$ has final entropy $h(p)=-p\log p-(1-p)\log(1-p)$; for $p=0.1$, this is about $0.325$, not $0.1$. The bound follows from the admitted thermal entropy balance and initial-minus-final memory entropy; it is an effective comparison, not a primitive acceleration law.

For a nonuniform initial memory, replace $k_B\log N$ by its initial entropy. Accessible side information and correlations change the erased quantity and require a joint account: a retained exact copy of a bit permits a reversible controlled reset of the first bit while consuming their correlation. Resetting the copy later must be included in the full protocol. The uncorrelated bound above must not be applied unchanged to that correlated intermediate operation.

A nonresetting demon consumes a blank-memory resource. A cyclic device restores its designated memory and working apparatus variables; its bath, work store, and processed targets may change and carry heat, entropy, useful work, or outputs. Restoring all those external resources as well is a separate global-cycle condition. A claimed net benefit must include every consumed resource and exported record in the same physical account.

The same logic applies to computation, but completion probability alone supplies no universal thermodynamic lower bound. A probabilistic implemented step must identify the logical map, input distribution, accepted output set, device transition, reset convention, and boundary ledger. Only the logically erased information in that physical implementation can enter a Landauer-style bound. A formula proportional solely to $\log(1/p_s)$ would confuse outcome surprise with erased information and is not an admissible cost claim.

## Horizons and Emergent Gravity

Horizon entropy is the most stringent test of this mapping because it connects record counting, effective geometry, energy flux, and unitarity pressure. The useful comparison target is not that gravity is "really entropy." The target is that one strong-field Noether sea record supplies the observer-level entropy, temperature, flux, and metric response together.

For a local horizon patch $\partial\Omega$, let $\mathcal B_{\partial\Omega}^{(O)}(\theta;W)$ be the finite set of globally compatible boundary-label configurations for the same observer record. Under uniform conditional weights, the proposed entropy is

$$
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-d4b9f11a3d394868)

With nonuniform weights $p$, the corresponding Shannon entropy is $k_BH(p)\le k_B\log|\mathcal B_{\partial\Omega}^{(O)}|$; the displayed count is then only capacity. Its identification with physical horizon entropy remains a recovery target. The local Clausius comparison is

$$
\delta_\ell Q_{\partial\Omega}^{(O)}
=
T_U^{(O)}
\delta_\ell S_{\partial\Omega}^{(O)}
+
\mathcal{O}(k_B T_U^{(O)}\epsilon_{\mathrm{local}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-942866b57cc90932)

Here $T_U^{(O)}$ is the temperature of the observer's Unruh comparison channel, $\delta_\ell$ denotes a first variation along a declared family of nearby horizon records indexed by $\ell$, and $\epsilon_{\mathrm{local}}$ is a dimensionless bound on the retained local approximation error. The error estimate must be uniform over that variation family. This is a recovery target: entropy, temperature, heat variation, and metric response must be supplied by the same record, not independently fitted.

A proposed black-hole route uses terminal orthogonal-axis three-binary alignment and compatible horizon labels. For a connected block $U$ of patches, define the log-capacity density

$$
s_{\mathrm{align}}(\theta)
=
\lim_{\lvert U\rvert\to\infty}
\frac{1}{\lvert U\rvert}
\log
\left|
\mathcal{L}_U(\theta)
\right|
$$

[View →](../../../../equation-mapping.html#corpus-equation-cba6c463de59bfe3)

when the limit exists along a stated growing-block family with vanishing boundary-to-area corrections. For a nonuniform measure, the entropy density is instead the corresponding limit of $H(p_U)/|U|$ and need not equal this capacity density. Let $a_\theta$ be physical area per patch and $\ell_{\mathrm{eff}}$ a recovered length scale, whose square is an area. Under the uniform-weight realization, the target is

$$
\frac{s_{\mathrm{align}}(\theta)}
{a_{\theta}}
\longrightarrow
\frac{1}{4\ell_{\mathrm{eff}}^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2bef8565d46260ad)

This target avoids a false one-patch interpretation. The coefficient is a block entropy density and patch-area normalization, not a literal independent count on one microscopic patch. Writing the right-hand side as $1/4$ is valid only after areas have been nondimensionalized by $\ell_{\mathrm{eff}}^2$.

The candidate terminal-alignment description proposes a common interface axis and local labels $\ell_u=(\chi_u,N_{s,u},M_{p,u})$ in finite sets $\mathcal L_u$. Completeness of this classification must be derived from the admitted branch dynamics. The global set $\mathcal L_U(\theta)$ consists of tuples satisfying all shared-history and boundary constraints, so

$$
\mathcal L_U(\theta)
=\left\{(\ell_u)_{u\in U}\in\prod_{u\in U}\mathcal L_u:
\text{all global compatibility constraints hold}\right\},
\qquad
|\mathcal L_U(\theta)|\le\prod_{u\in U}|\mathcal L_u|
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ff215aa6d15e556)

Here $\chi_u$ is the proposed handedness label and $(N_{s,u},M_{p,u})$ the self-hit and partner-hit ledger index. Equality holds only if every local combination is globally compatible. Two binary patches constrained to equal labels admit two global configurations, not four. Uniform weights on those two give entropy $k_B\log2$; weights $(0.9,0.1)$ give only about $0.325k_B$. Recovering $1/(4\ell_{\mathrm{eff}}^2)$ requires the actual global entropy density, patch area, and independently recovered length scale. Neither local multiplicity nor the upper bound establishes that coefficient.

Page-curve, island, replica-wormhole, Ryu-Takayanagi, and AdS/CFT calculations remain high-value comparison mathematics. They sharpen the required entropy and unitarity bookkeeping. They do not provide the $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism unless their constraints are recovered from horizon-interface labels, path-history bookkeeping, Noether sea storage, and release-channel selection.

Entanglement-entropy calculations sharpen the access-cut side of that same problem. A horizon partition can make an outside retained record mixed while the full comparison record remains closed. The native target is therefore not to import an abstract inaccessible complement as ontology, but to derive which horizon-interface labels, Noether sea storage modes, and release-channel selections play the role of the traced-out complement.

## Failure Modes

The most common failure mode is an unqualified entropy statement. An entropy claim is incomplete when it omits the measure, coarse-graining, access window, retained record, or boundary terms.

Another failure mode is disembodied information. Shannon uncertainty over symbols is not automatically heat, work, Clausius entropy, or physical record cost. A compression or prediction score is a statement about a declared symbol model and record channel. It becomes thermodynamic only when implemented through an apparatus and boundary ledger.

A third failure mode is entropic gravity as a substitute for the mass mechanism. Thermodynamic or entropic derivations of force are comparison benchmarks, but inertial mass remains open until the assembly ledger supplies closed internal causal history, shielding extraction, Noether sea response, and acceleration response.

A fourth failure mode is fitted horizon bookkeeping. If a black-hole or local-horizon analysis uses one record for entropy, another for temperature, another for stress, and another for release channels, the apparent agreement is not a native derivation.

The fifth failure mode is promoting entropy into time. Entropy can diagnose an emergent arrow inside a stated physical and inferential window. It does not supply the absolute ordering parameter $T$.

A sixth failure mode is confusing entropy with complexity. Low entropy can be simple, maximum entropy can be simple, and complex organized structures normally belong to driven intermediate windows that export more entropy than they locally suppress. For $\mathbb{A}\mathbb{A}\mathbb{A}$, biological or self-organizing examples are open-window bookkeeping, not exceptions to deterministic dynamics.

A seventh failure mode is record circularity. If an analysis uses retained records to infer a low-entropy past while also using that inferred low-entropy past to justify the reliability of the retained records, it has not resolved the arrow-of-time problem. It must expose the same-record path-history measure and boundary-condition prior that suppress isolated observer-fluctuation records relative to history-backed observer records.

An eighth failure mode is treating "entropy never decreases" as a primitive second law. Clausius entropy depends on a reversible-cycle integrability condition, statistical entropy can fluctuate in small or finite windows, and resource entropy depends on the declared control/readout class. An analysis must state which second-law form it is invoking before monotonicity has content.

A ninth failure mode is quoting entanglement entropy without declaring the factorization and access cut. A subsystem entropy is not automatically entropy of the whole universe. It is a statement about what remains after a complement has been excluded from the retained record.

A tenth failure mode is promoting present human or laboratory macrostates into the final state-space partition of the universe. Heat-death claims, order claims, and "maximum entropy" claims must declare the manipulation class and record system for which usable gradients are exhausted. Otherwise they have converted a useful thermodynamic extrapolation into an unsupported ontology of all future access.

## Interfaces

The energy-side residuals are stated in [Energy](energy.md#entropy-free-energy-and-coarse-residuals). The time-side arrow distinction is stated in [Absolute Time](../foundations/absolute-time.md#time-orientation-and-causal-ordering). Measurement locking is stated in [Measurement Ontology](../quantum/measurement-ontology.md). Computation cost is treated in [Information / Computation](../philosophy-history/information-computation.md#thermodynamic-cost-of-computation). Local-horizon recovery is stated in [Emergent Metric](../spacetime/emergent-metric.md#local-horizon-recovery-target), with the simulation-facing scaffold in [Thermodynamic Residual](../validation/simulations/thermodynamic-residual.md). The strong-field horizon target is stated in [Black Holes](../spacetime/black-holes.md#horizon-interface).

The consolidated rule is simple: entropy is accepted only as a declared projection of retained deterministic histories, and every effective entropy claim must name the record that makes the projection physical.

## References

- Jacob D. Bekenstein, “Black Holes and Entropy,” *Physical Review D* 7 (1973): 2333–2346, [doi:10.1103/PhysRevD.7.2333](https://doi.org/10.1103/PhysRevD.7.2333).
- Chas A. Egan and Charles H. Lineweaver, “A Larger Estimate of the Entropy of the Universe,” *The Astrophysical Journal* 710 (2010): 1825–1834, [doi:10.1088/0004-637X/710/2/1825](https://doi.org/10.1088/0004-637X/710/2/1825).
- G. W. Gibbons and S. W. Hawking, “Cosmological Event Horizons, Thermodynamics, and Particle Creation,” *Physical Review D* 15 (1977): 2738–2751, [doi:10.1103/PhysRevD.15.2738](https://doi.org/10.1103/PhysRevD.15.2738).
- S. W. Hawking, “Particle Creation by Black Holes,” *Communications in Mathematical Physics* 43 (1975): 199–220, [doi:10.1007/BF02345020](https://doi.org/10.1007/BF02345020).
- Solomon Kullback and Richard A. Leibler, “On Information and Sufficiency,” *The Annals of Mathematical Statistics* 22 (1951): 79–86, [doi:10.1214/aoms/1177729694](https://doi.org/10.1214/aoms/1177729694).
- Rolf Landauer, “Irreversibility and Heat Generation in the Computing Process,” *IBM Journal of Research and Development* 5 (1961): 183–191, [doi:10.1147/rd.53.0183](https://doi.org/10.1147/rd.53.0183).
- Claude E. Shannon, “A Mathematical Theory of Communication,” *Bell System Technical Journal* 27 (1948): 379–423, 623–656, [part I](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x) and [part II](https://doi.org/10.1002/j.1538-7305.1948.tb00917.x).
