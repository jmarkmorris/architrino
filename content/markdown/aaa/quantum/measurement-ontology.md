# Measurement Ontology

## Purpose and Scope

This chapter specifies a proposed physical account of measurement in $\mathbb{A}\mathbb{A}\mathbb{A}$. It is narrower than the full Born-rule program. The aim is to distinguish a readable record from the additional dynamical conditions required by the threshold mechanism studied here.

In this proposed mechanism, measurement is an ordinary physical interaction that crosses a response threshold, amplifies the result, and leaves a durable record. The chapter defines its conditional physical architecture:

- what counts as the system,
- what counts as the apparatus,
- what turns an interaction into a record,
- and what the theory must reproduce to match ordinary quantum measurement practice.

## Core Claim

Measurement is a physical interaction that creates a persistent, readable record. In the threshold mechanism developed here, coupling drives a metastable degree of the combined target and apparatus across a response threshold and amplifies the selected response. Metastable means persistent under small perturbations but capable of leaving that state under an appropriate interaction; the metastability can belong to the detector rather than to the measured target.

This mechanism is a proposed assembly-level realization of measurement, with claim grade guessed until a concrete apparatus is derived from the constituent dynamics. An assembly is an organized collection of [architrinos](../foundations/architrino.md), the polarity-bearing point entities whose delayed causal wakes determine acceleration through the [Master Equation](../dynamics/master-equation.md). The [Noether sea](../spacetime/noether-sea.md) is the surrounding population of assemblies. Defining a response threshold does not establish a stable assembly, a basin of attraction, or the existence of a record. The falsifier for a specified threshold model is a reproducible record outside its predicted response or persistence domain.

The ontology is therefore a coupled record channel:

- **system:** an assembly or coupled assembly-subsystem with reduced state $X$,
- **apparatus:** another assembly network engineered so that its wake structure couples strongly to a chosen coordinate of $X$,
- **environment:** the surrounding Noether sea plus uncontrolled apparatus degrees of freedom,
- **measurement outcome:** a distinguishable record class, represented by an attractor basin only when attraction and persistence have been established,
- **record:** a durable asymmetry in apparatus/environment variables that can be re-read without reconstructing the original metastable state.

The apparatus configuration is part of the record channel. In a concrete detector model, its geometry, settings, thresholds, and readout coarse-graining define the apparatus record kernel $\mathcal{K}_A$. A reduced threshold $\Sigma_{\mathcal{K}_A}(X,A)=0$ is valid only when the omitted environment and history are fixed or proven irrelevant; otherwise it depends on the complete retained state defined below. The record variable $R_{\mathcal{K}_A}(A)$ is the readable apparatus coordinate. Unindexed $\Sigma$ and $R$ abbreviate these channel-dependent objects. Here a crossing “separatrix” means a response threshold in this reduction or a boundary moved by driving; an invariant basin boundary of a well-posed autonomous full flow cannot be crossed by that same flow.

## No Heisenberg Cut

The ontology rejects a fundamental system-observer split.

The reason is direct. If the apparatus is made of assemblies, then it cannot sit outside physics while the target remains inside physics. The apparatus has its own causal wakes, thresholds, uncontrolled degrees of freedom, and Noether sea coupling. A measurement account must therefore include the apparatus in the same physical flow as the target.

At the substrate level there are only:

- architrinos with definite positions and velocities in absolute time,
- their causal wakes,
- and the assemblies built from those constituents.

The proposed dissipative threshold realization of measurement has three features:

1. strong targeted perturbation of a metastable degree of freedom,
2. amplification into many apparatus degrees of freedom,
3. dissipation into the surrounding Noether sea so that coherent reversal becomes practically inaccessible.

This also sets the comparison boundary for path-integral and generalized-quantum-mechanics language. A history-sum formalism can reproduce ordinary pointer-record probabilities and may assign measures to microscopic event statements, but those measures are not automatically $\mathbb{A}\mathbb{A}\mathbb{A}$ records. The native question remains whether the apparatus-target dynamics produce a separatrix crossing, a durable record variable, and a persistence window without invoking an external classical observer.

Expectation values, covariance matrices, correlation functions, and decoherence rates obey the same rule. They are legitimate observer-level summaries only after the target, apparatus, environment, access region, and record channel have been declared. In closed-system, cosmology, or quantum-gravity comparisons, an averaged quantity is therefore not automatically a statement about what the substrate is doing; it is a data product that must be tied back to $\Gamma_{\mathrm{tot}}$, the retained boundary data, and the record criteria below.

The same discipline applies to ordinary measurement-rule language. A statement such as "measure an observable and obtain outcome $k$ with probability $p_k$" is a useful laboratory instruction, but it is not yet a substrate closure. It must be unpacked into a declared record packet
$$
(\mathcal{K}_A,\mathcal{Q},W,T_W,\{R_k\},\mu_{*,T_W})
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e97dfd8148981fe)

whose apparatus kernel, coarse-graining, access region, record window, record classes, and finite-time basin measure all belong to the same coupled flow. The observer-level probability is then a record statistic,
$$
p_k(\theta)=\mu_{*,T_W}\!\left(\pi^{-1}(R_k)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-2d97c861f41c6dd7)

and is valid only after a branch has earned a record. A record is not every formal correlation. It is a branch that closes the full physical transition:

For an initial retained state $\gamma\in\Gamma_{\mathrm{tot}}$, define the state-dependent eligibility map
$$
\mathsf R_\theta(\gamma,T_W)
=
\mathsf C_\theta(\gamma,T_W)\,
\mathsf L_\theta(\gamma,T_W)\,
\mathsf P_\theta(\gamma,T_W)\,
\mathsf N_\theta(\gamma,T_W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c8fe5cae0f3ec7ec)

where $\mathsf C_\theta$, $\mathsf L_\theta$, and $\mathsf P_\theta$ are binary indicators of detector-target coupling, tested conservation/recoil accounting, and persistence. The no-signaling factor $\mathsf N_\theta$ is a channel-level consistency test using the setting-independent marginal residual in the [Bell closure diagnostics](../philosophy-history/theory-bridges/bell-theorem.md#bell-closure-diagnostics). It is evaluated on the declared preparation ensemble, including failed and rejected trials, rather than inferred from one trajectory. A failed channel test suspends the claimed probability model; it does not erase physical detector records or authorize selecting a subset that restores no-signaling.

For a declared packet the weighted outcome is the normalized eligible-measure:

$$
p_k^{\mathrm{rec}}(\theta)=
\frac{\mu_{*,T_W}\!\left(\pi^{-1}(R_k)\cap \mathsf R_\theta^{-1}(1)\right)}
{\sum_j\mu_{*,T_W}\!\left(\pi^{-1}(R_j)\cap \mathsf R_\theta^{-1}(1)\right)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bcc487ab8cd1f34e)

with a strictly positive denominator, measurable disjoint record classes, and a normalized preparation measure. The unfiltered statistic $p_k(\theta)$ is a weight per prepared trial; $p_k^{\mathrm{rec}}(\theta)$ is conditional on producing an eligible record. The latter is written $P_\theta(k)$ once the state-dependent record indicator is supplied. If the unfiltered classes exhaust the preparation ensemble, let $e_k$ be the eligibility fraction in class $k$ and $\bar e=\sum_jp_j e_j$. Then $p_k^{\mathrm{rec}}=p_k e_k/\bar e$, so the distributions coincide when $e_k=\bar e$ for every populated class. Unit efficiency is sufficient but unnecessary. Failed capture, rejection, and unresolved trials must retain their unconditional weights; conditioning can otherwise conceal a setting-dependent detection bias.

### Laboratory Limit and Closed Cosmology

Ordinary laboratory quantum mechanics is a recovery target in regimes with calibrated preparation, controlled disturbance, and persistent apparatus records. Large size, slow response, or low temperature alone neither establishes this limit nor applies to every detector. In a validated regime the observer can prepare a channel, collect trials, and treat the apparatus as if it stood outside the measured system. The "external observer" is an approximation to a Physical Observer whose uncontrolled coupling, memory drift, and record tolerance $\epsilon_O$ are negligible for the declared experiment.

Closed-system and cosmology comparisons do not have that limiting observer outside the system. A Physical Observer inside the universe is part of the same Noether sea, shares the same causal-wake history, and cannot take its own apparatus to an infinite-capacity boundary. In those settings a formal state for "the universe" is not by itself a measurement model. The comparison must declare which embedded observer, access region, finite record window, and apparatus kernel produce the retained records. Any quoted observer-entropy or finite-memory precision floor is therefore read as an access-limit diagnostic for that record channel, not as a new substrate indeterminism or a rule that a classical observer must be inserted into the ontology.

This is the measurement-side version of the cosmology shared-record rule. If the same closed system is described with one quantum state for global bookkeeping but a different effective state for an embedded observer, the difference is admissible only when both descriptions project from one substrate flow and one retained boundary-data record. Otherwise the comparison has split into an outside-view calculation and an inside-view calculation without a declared physical handoff.

### Transfer-Operator Measure Contract

The record packet above is a finite-window object. Let $\mathcal{H}_{\eta,h}(T)$ denote the retained causal-wake and branch-ledger history at resolution $\eta$ and memory depth $h$, and let the declared coarse state space be
$$
\Gamma_{\eta,h}
=
\Gamma_{\mathrm{asm}}
\times
\Gamma_{\mathrm{wake}}
\times
\Gamma_{\mathrm{sea}}
\times
\Gamma_{\mathrm{reg}}
\times
U
$$

[View →](../../../../equation-mapping.html#corpus-equation-f87d209689980889)

The coarse-state map is
$$
C_{\eta,h}:
\left(
\mathbb{U}_{\text{now}}(T),
\mathcal{H}_{\eta,h}(T)
\right)
\longrightarrow
\Gamma_{\eta,h}
$$

[View →](../../../../equation-mapping.html#corpus-equation-915cf2c09557552a)

where $\mathbb{U}_{\text{now}}(T)\equiv S(T)$ is the complete ontic state on the absolute-time slice, including the provenance and history needed for delayed evolution; $\mathcal H_{\eta,h}$ identifies the retained portion explicitly rather than adding an independent wake substance. The factors of $\Gamma_{\eta,h}$ retain assembly, wake, sea, regulator, and control data, respectively, with $U$ the control space. Finite memory depth $h$ and finite resolution $\eta$ do not establish dynamical closure: omitted-history effects must be bounded over the record window.

The ontic substrate flow is indexed by absolute time $T$. The reduced record-channel notation below uses $t$ as a comparison-chart abbreviation for $t_{\mathrm{eff}}$; $X,A,\Xi$ are reduced coordinates, not primitive position vectors. A clock map $t_{\mathrm{eff}}=\chi_\theta(T)$ with positive rate must connect that chart to the substrate, and only a calibrated unit-rate regime permits $t_{\mathrm{eff}}=T$ up to an origin shift. Durations $\tau_{\mathrm{meas}}$, $\tau_{\mathrm{rec}}$, $T_W$, and $T_{\mathrm{rec}}$ use this same record clock. Comparing them to another clock or to a substrate evolution requires the corresponding conversion.

The measurement transfer operator is first a deterministic pushforward of the retained flow,
$$
\mathcal{T}_{\Delta t}\rho
=
\left(
\Phi_{\Delta t}^{u,\mathcal{H},\mathcal{W}_{\mathrm{sea}}}
\right)_*\rho
$$

[View →](../../../../equation-mapping.html#corpus-equation-ece0feb545452cba)

A deterministic map on the retained chart exists only when all admissible full histories with the same retained state give the same retained future, within the declared error. Otherwise the pushforward must be formed on full history space before projection. A reduced Markov kernel additionally requires a preparation-conditioned measure on the discarded histories and a demonstrated memory-loss or sufficient-state condition; an occupation measure alone does not establish the Markov property. Explicit time-dependent controls require a two-time propagator or inclusion of their clock and dynamics in the extended state.

The rejection of the cut can be stated as a closure condition on the dynamics. Let
$$
\Gamma_{\mathrm{tot}}(t)=(X(t),A(t),\Xi(t),\mathcal{W}(t))
$$

[View →](../../../../equation-mapping.html#corpus-equation-7a82c3e9eb7c9d1e)

collect the target coordinates $X$, apparatus coordinates $A$, retained environment coordinates $\Xi$, and causal-wake history $\mathcal{W}$. The symbol $\Xi$ keeps $Z$ available for proton number and keeps the incoming spin-ledger state $Z_{\mathrm{in}}$ below distinct from the environment. A valid measurement model must be the projection of one substrate flow,
$$
\dot{\Gamma}_{\mathrm{tot}}
=
F_{\mathrm{tot}}(\Gamma_{\mathrm{tot}}),
\qquad
\pi_{XA}\Phi_t^{\mathrm{tot}}(\Gamma_0)=(X(t),A(t))
$$

[View →](../../../../equation-mapping.html#corpus-equation-b54d12e373ea0d1c)

not a splice between quantum dynamics on the target side and a separate classical-observer dynamics on the apparatus side. A human observer, laboratory notebook, or downstream database is therefore another possible record-bearing assembly, not an ontologically privileged endpoint of the measurement.

When the environment is compressed to an open-system map, the compression must declare its memory assumption. A standard trace-preserving completely positive comparison map has Kraus form
$$
\rho\mapsto\mathcal{L}[\rho]
=
\sum_m M_m\rho M_m^\dagger,
\qquad
\sum_m M_m^\dagger M_m=I
$$

[View →](../../../../equation-mapping.html#corpus-equation-0b2498da11e53f36)

A Born-Markov route to a differential Lindblad comparison requires short environment correlation time relative to the effective relaxation time, controlled system-environment correlations, and a completely positive generator in the chosen coarse-time or secular limit. Short correlation time alone is insufficient. A phenomenological Lindblad fit has a separate empirical domain and does not derive these assumptions. The record-persistence time is a separate apparatus property. Under the stated comparison assumptions the benchmark generator has the form
$$
\partial_{t_{\mathrm{eff}}}\rho
=
-\frac{i}{\hbar_{\mathrm{eff}}}[H,\rho]
+
\sum_m
\left(
L_m\rho L_m^\dagger
-
\frac{1}{2}L_m^\dagger L_m\rho
-
\frac{1}{2}\rho L_m^\dagger L_m
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dc6e50f871ecfe5f)

The native residual is a comparison-chart memory check, not a demand that the substrate be Markovian. Let $\mathcal E_{a\to b}$ be the effective density-state propagator on the chart used by the Lindblad fit. Then
$$
\mathcal{R}_{\mathrm{open}}(\theta)
=
\max\left(
\frac{\tau_{\mathrm{env}}}{\varepsilon_{\mathrm{BM}}\tau_{\mathrm{relax}}},
\frac{\left\|\mathcal E_{t_{\mathrm{eff},0}\to t_{\mathrm{eff},2}}-\mathcal E_{t_{\mathrm{eff},1}\to t_{\mathrm{eff},2}}\mathcal E_{t_{\mathrm{eff},0}\to t_{\mathrm{eff},1}}\right\|_{1\to1}}{\varepsilon_{\mathrm{M}}},
\frac{\left\|\partial_{t_{\mathrm{eff}}}\rho_{\mathrm{rec}}-\mathcal{L}_{\mathrm{Lind}}[\rho_{\mathrm{rec}}]\right\|_1}{\varepsilon_L}
\right)
\le 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-f89c2980512aadb8)

where $\varepsilon_{\mathrm{BM}}\ll1$ is the declared scale-separation tolerance and $\varepsilon_{\mathrm M}$ is the propagator-composition tolerance on that density-state chart. If the first two terms are large, a Kraus or Lindblad description may remain a useful short-time fit, but it has not earned a Markovian open-system interpretation. This comparison is distinct from the record-channel divisibility residual below: the latter may be order one before a record because its reduced variables deliberately omit live phase and path-history data.

## Schrödinger's Cat as a Record-Channel Problem

Schrödinger's cat is best read as a warning against treating the formal wavefunction as the ontology of a whole macroscopic situation. The point is not that a cat is literally alive and dead until a human opens a box. The point is that the standard language can slide from a microscopic unresolved trigger to an absurd macroscopic description if it does not specify where physical record formation has occurred.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ the boxed experiment is one coupled apparatus-environment packet. A compact record description can be written as
$$
\theta_{\mathrm{cat}}
=
\left(
\mathcal{K}_{\mathrm{trigger}},
\mathcal{K}_{\mathrm{box}},
\mathcal{Q}_{\mathrm{cat}},
W_{\mathrm{box}},
T_{\mathrm{box}},
\{R_{\mathrm{alive}},R_{\mathrm{dead}}\}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-99bd145487f161c3)

where the trigger, box, internal apparatus, enclosed environment, animal body, and later observer access all belong to one declared physical channel. The outside observer's ignorance is not the same thing as substrate indeterminacy. It is an access limitation: the external observer does not yet possess a record of which internal basin has been reached.

The mature record-channel translation is therefore simple. If the internal trigger and apparatus have crossed a separatrix, closed the event ledger, generated a durable internal record, and locked that record into the box environment, then the macroscopic state has already resolved inside the physical channel. Opening the box imports that completed record into the observer's own access region. If the internal apparatus has not yet produced a record, then the effective wavefunction may still carry an unresolved branch envelope for that declared channel; but that is a statement about incomplete record formation, not about a metaphysical blend of living and dead macroscopic states.

This distinction preserves the force of Schrödinger's critique. The cat thought experiment exposes a category error in the inherited language: a formal superposition over possible records was being promoted into a literal ontology for macroscopic reality. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement is record-channel explicitness. Measurement has occurred when the physical channel satisfies the record-autonomy, persistence, ledger, and energy-residual tests below; observation by a later human is one more physical record import, not the event that makes reality choose.

## Physical-Record Import Consistency

This is the record-channel response to Wigner's-friend and Frauchiger-Renner comparisons. The same rule applies when one Physical Observer records another Physical Observer's conclusion. A statement such as "observer $O_j$ is certain that record $R_k$ will occur" is not free-standing knowledge. For observer $O_i$, it is a physical communication or memory record inside $O_i$'s retained apparatus and access region. Let $C_{j\to i,k}$ denote that imported-certainty record in the declared channel for $O_i$, and let $\theta_i$ be the corresponding observer model record. With the same finite-time basin measure used for the measurement channel, write
$$
p_i(\ell|\theta_i)
=
\mu_{*,T_W}^{(i)}\!\left(\pi_i^{-1}(R_\ell)\right),
\qquad
c_{i\leftarrow j}(k|\theta_i)
=
\mu_{*,T_W}^{(i)}\!\left(\pi_i^{-1}(C_{j\to i,k})\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-17c19f3897bf99b8)

Here $p_i$ is $O_i$'s direct record probability for outcome $R_\ell$, while $c_{i\leftarrow j}$ is the probability that $O_i$ has a valid physical record of $O_j$'s certified conclusion. The imported statement is eligible as a near-certainty claim only when $c_{i\leftarrow j}(k|\theta_i)\ge1-\delta_{\mathrm{cert}}$. For mutually exclusive record classes $R_k\cap R_\ell=\varnothing$, the stronger consistency test is the same-measure joint-occurrence residual
$$
\Delta_{\mathrm{cert}}^{ij}
=
\max_{k\ne \ell}
\mu_{*,T_W}^{(i)}\!\left(
\pi_i^{-1}(C_{j\to i,k})
\cap
\pi_i^{-1}(R_\ell)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-c40058fccc4a9cbb)

Here $\delta_{\mathrm{cert}}$ is the eligibility gap for the imported near-certainty claim. It is distinct from the joint-occurrence tolerance $\varepsilon_{\mathrm{cert}}$ below, and from the apparatus-channel resolution tolerance $\varepsilon_C$ of [Wavefunction Ontology](wavefunction-ontology.md), which is a different object. A valid observed-observer measurement model should satisfy
$$
\Delta_{\mathrm{cert}}^{ij}
\le
\varepsilon_{\mathrm{cert}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-410c32ed6f0c75ea)

on the same declared apparatus kernel, coarse-graining, access region, and persistence window used for the ordinary record tests. The two premises immediately imply the conflict bound
$$
p_i(\ell\mid\theta_i)
\le
\Delta_{\mathrm{cert}}^{ij}
+
\left[1-c_{i\leftarrow j}(k\mid\theta_i)\right]
\le
\varepsilon_{\mathrm{cert}}+\delta_{\mathrm{cert}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-df2d7888fcd736a3)

for every $\ell\ne k$. Thus a physically imported near-certainty forces every conflicting direct-record probability to be small. A chain of imported certainties can add these budgets by a union bound only when its events refer to compatible records and times on a common preparation-history measure, with any conditioning declared. Separate observer marginals alone do not supply that joint measure. Transitivity is not granted to a communication statement that failed its own record test. This is not a new probability postulate: the imported record must belong to the same substrate flow as the direct prediction.

## Minimal Dynamical Model

Let $X(t)$ denote reduced coordinates for the measured subsystem and $A(t)$ the relevant apparatus coordinates. The measurement model must remain closed on the extended state already introduced above:
$$
\dot{\Gamma}_{\mathrm{tot}}
=
\left(\dot X,\dot A,\dot\Xi,\dot{\mathcal W}\right)
=
F_{\mathrm{tot}}(X,A,\Xi,\mathcal W)
$$

[View →](../../../../equation-mapping.html#corpus-equation-58609440dd56fd86)

where $\mathcal{W}$ denotes the local causal-wake background inherited from the apparatus, environment, and prior path history. The two-coordinate equations for $X$ and $A$ are projections of this flow; leaving $\Xi$ or $\mathcal W$ without an evolution law would not define the basins or first-crossing time used below.

Let the metastable branch boundary be defined by a separatrix
$$
\Sigma_{\mathcal K_A}(\Gamma_{\mathrm{tot}})=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b6de8c5da64ad8e)

Orient the smooth response threshold so that the prepared state has $\Sigma<0$ and the triggered side has $\Sigma>0$. For a transverse crossing, the elapsed trigger duration and its corresponding chart instant are
$$
\tau_{\text{meas}}
=
\inf\left\{
\Delta t>0:
\Sigma_{\mathcal K_A}\!\left(\Gamma_{\mathrm{tot}}(t_0+\Delta t)\right)=0,\quad
\frac{d}{dt}\Sigma_{\mathcal K_A}\!\left(\Gamma_{\mathrm{tot}}(t)\right)\bigg|_{t=t_0+\Delta t}>0
\right\},
\qquad
t_{\mathrm{meas}}=t_0+\tau_{\mathrm{meas}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fd08080dd71de5df)

The infimum of an empty set is $+\infty$. This expression excludes tangential contact and applies only on a well-posed, continuous history branch with a differentiable threshold; degenerate crossings require a separately stated sign-change rule. A positive initial threshold margin and a bounded rate imply a positive travel time to the threshold, but continuity alone does not imply that a crossing occurs. Continuous substrate evolution gives a continuous reduced trajectory only under a continuous projection; a quantized readout may jump. Triggering at $\tau_{\mathrm{meas}}$ precedes the completed record at $\tau_{\mathrm{rec}}$ defined below.

A Physical Observer may still be unable to resolve the crossing from the retained record. Let $\pi_O$ be the observer's access projection from the coupled measurement state to retained records, let $d_O$ be the induced record distance, and let $\epsilon_O$ be the declared record tolerance. For a branch basin $B_k$, a boundary-proximity diagnostic is

$$
d_O\!\left(
\pi_O\!\left(\Gamma_{\mathrm{tot}}(t)\right),
\pi_O(\partial B_k)
\right)
\le
\epsilon_O
$$

[View →](../../../../equation-mapping.html#corpus-equation-8e1b1ea72f3c9f5f)

Here distance to the boundary image is the infimum of the record distance over that image. Nearness to this image is a diagnostic, not a sufficient condition for ambiguity: the image can contain records whose other coordinates distinguish the sides. Operational ambiguity requires two admissible retained histories on opposite sides whose projected records agree within $\epsilon_O$. The full state includes $\Xi$ as well as target, apparatus, and wake history.

The time at which an effective branch description becomes useful is not fixed by the phrase "superposition" alone. It depends on the apparatus kernel, coarse-graining, access region, and record window. For a declared channel $(\mathcal{K}_A,\mathcal{Q},W,T_W)$, write $t_W=t_0+T_W$. For a candidate basin family $\{B_i(t)\}$, a pre-record branch separation can be treated as present only when the retained transition law is no longer restartable through a single reduced state while at least two alternatives are independently recordable in that channel:
$$
\tau_{\mathrm{split}}
=
\inf\{\Delta t>0:\ t=t_0+\Delta t,\ \exists i\ne j,
N_{\mathcal{Q},W}(B_i(t))\ge 1,
N_{\mathcal{Q},W}(B_j(t))\ge 1,
\Delta_{\mathrm{div}}(t_0,t,t_W;\mathcal{Q},W)>\varepsilon_{\mathrm{div}}\},
\qquad
t_{\mathrm{split}}=t_0+\tau_{\mathrm{split}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-dca880ae8e6ab9a7)

Here $N_{\mathcal{Q},W}$ is the recordable basin count from [Wavefunction Ontology](wavefunction-ontology.md#lower-bound-on-recordable-basin-measure), and $\Delta_{\mathrm{div}}$ is the restartability residual defined below for the same coarse-graining, access region, and record window.

For channels with a finite pre-record split time, define the record time by a full persistence interval beginning at the candidate instant $t=t_0+\Delta t$:
$$
\tau_{\mathrm{rec}}
=
\inf\{\Delta t>\max(\tau_{\mathrm{split}},\tau_{\mathrm{meas}}):
t=t_0+\Delta t,\quad t+T_{\mathrm{rec}}\le t_W,\quad
\sup_{s\in[t,t+T_{\mathrm{rec}}]}\Delta_{\mathrm{rec}}(s;k)\le\varepsilon_{\mathrm{rec}},
\sup_{t\le a<b\le t+T_{\mathrm{rec}}}\Delta_{\mathrm{div}}(t_0,a,b;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}(t)\ge S_{\mathrm{lock}}\},
\qquad
t_{\mathrm{rec}}=t_0+\tau_{\mathrm{rec}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5bcb19d59f2bae24)

An admissible channel that uses a pre-record branch interval must report
$$
0\le
\tau_{\mathrm{split}}
\le
\tau_{\mathrm{meas}}
<
\tau_{\mathrm{rec}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-192c76520e93d8a1)

on the same initial-state and apparatus record, with the record amplitude and event conditions below also satisfied. Strict separation is an additional channel condition: an infimum of times strictly after the trigger can equal the trigger, and need not be attained. A finite accepted record therefore requires an attained admissible instant or a specified tolerance rule. A channel without a non-Markovian pre-record interval need not have a finite $\tau_{\mathrm{split}}$; its record time is obtained from the same persistence tests after the trigger without that split restriction. The unresolved interval is a model-dependent validation target.

Because this definition is windowed, it does not require a global decision procedure for every future trajectory question. The measurement claim is narrower: within a declared apparatus kernel, coarse-graining, access region, and record window, the coupled dynamics either reaches a recordable basin satisfying the residual tests or remains unresolved. Unbounded reachability questions for the same dynamical law belong to a separate theorem class and should not be treated as prerequisites for ordinary record formation.

### Basin-Update Equation

The standard projection rule can be retained as an effective update only after the physical record has already formed. Let $\mu_{0,\theta}$ be the preparation measure for a declared measurement channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$, and let
$$
\nu_{t_{\mathrm{rec}}}
=
\left(\Phi_{\tau_{\mathrm{rec}}}^{\mathrm{tot}}\right)_*\mu_{0,\theta}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3a0b9983b6f71b3d)

be the pushed-forward ensemble at a common, declared record time. When different histories have different first record times, this notation instead requires the history-dependent map $\gamma\mapsto\Phi_{\tau_{\mathrm{rec}}(\gamma)}^{\mathrm{tot}}(\gamma)$, with assigned time and retained history included in the output. Persistence is verified retrospectively over the following interval, so this assignment is not automatically a stopping time for an observer's available information. Substituting one history's duration for the entire ensemble is invalid. If the completed record is the basin $B_k^{\mathrm{rec}}(\theta)$ and its measure is nonzero, the post-record ensemble update is conditionalization:
$$
\mu_{\theta,k}^{+}(B)
=
\frac{
\nu_{t_{\mathrm{rec}}}\!\left(B\cap B_k^{\mathrm{rec}}(\theta)\right)
}{
\nu_{t_{\mathrm{rec}}}\!\left(B_k^{\mathrm{rec}}(\theta)\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-650bdfa9bec118d9)

This is not a new stochastic law. It is the observer's effective ensemble after the deterministic apparatus-target flow has crossed the separatrix, locked the record, and passed the record-autonomy tests.

For a channel whose extracted states are pure, let $\mathcal{E}_\theta$ denote a proposed wavefunction extraction map on the same retained chart. Its existence and agreement with the record statistics remain recovery obligations. The comparison is
$$
\psi_\theta^{-}
=
\mathcal{E}_\theta(\nu_{t_{\mathrm{split}}}),
\qquad
\psi_{\theta,k}^{+}
=
\mathcal{E}_\theta(\mu_{\theta,k}^{+})
$$

[View →](../../../../equation-mapping.html#corpus-equation-4774e10c49b2bb7b)

In subsystem language this is the measurement analogue of a conditional or effective wavefunction. If a total extracted state is written on a target-apparatus chart as $\Psi_{\mathrm{tot}}(x_S,y_A,t)$ and the apparatus record has entered the basin coordinate $Y_{A,k}$, the comparison update has the schematic form
$$
\psi_{S,k}^{\mathrm{cond}}(x_S,t)
=
\mathcal{N}_k
\Psi_{\mathrm{tot}}(x_S,Y_{A,k},t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-0e8100fa0baee3fe)

with normalization $\mathcal{N}_k$ fixed when the slice is nonzero. Evaluating at one apparatus coordinate is equivalent to conditioning on an entire record basin only if the target state is the same, up to normalization and phase, throughout that basin. Otherwise basin conditioning produces a density operator, generally mixed, rather than this pure slice.

For an ideal repeatable non-degenerate projective instrument with eigenstate $\phi_k$, the recovery target is
$$
\inf_{\alpha_k\in\mathbb{R}}
\left\|
\psi_{\theta,k}^{+}
-
e^{i\alpha_k}\phi_k
\right\|_{\mathcal{H}_\theta}
\le
\varepsilon_{\mathrm{upd}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ebea67e6f30ccb61)

For an ideal Lüders instrument, which preserves coherence within a degenerate eigenspace, the corresponding target for projector $\Pi_\lambda$ is
$$
\inf_{\alpha_\lambda\in\mathbb{R}}
\left\|
\psi_{\theta,\lambda}^{+}
-
e^{i\alpha_\lambda}
\frac{\Pi_\lambda\psi_\theta^{-}}{\|\Pi_\lambda\psi_\theta^{-}\|_{\mathcal{H}_\theta}}
\right\|_{\mathcal{H}_\theta}
\le
\varepsilon_{\mathrm{upd}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-01105a975c9db4d6)

whenever the denominator is nonzero. For this comparison, $\psi_\theta^-$ must be propagated from its declared extraction instant to the instrument input, or the intervening evolution must be included in the comparison instrument. The equation is then a recovery target for the basin-conditioned state, not a derivation of the textbook projection rule.

Generalized measurements sharpen this requirement because the observer-level measurement record is not always projective. A calibrated record channel may be represented by a POVM $\{E_m\}$ with
$$
E_m=E_m^\dagger,\qquad E_m\ge0,\qquad \sum_m E_m=I
$$

[View →](../../../../equation-mapping.html#corpus-equation-6aefbf3189e0bbef)

and, in the efficient special case with one Kraus operator per outcome, an instrument choice $\{M_m\}$ satisfying
$$
E_m=M_m^\dagger M_m,
\qquad
\sum_m M_m^\dagger M_m=I
$$

[View →](../../../../equation-mapping.html#corpus-equation-0dbbf1ee433657b8)

Each $E_m$ is an effect specifying an outcome weight; the Kraus operator also specifies the disturbance. A general instrument has unresolved indices $\alpha$, with $E_m=\sum_\alpha M_{m\alpha}^\dagger M_{m\alpha}$ and output $\sum_\alpha M_{m\alpha}\rho M_{m\alpha}^\dagger/p_m$. The following displayed update uses the efficient case and requires $p_m>0$:
$$
p_m=\operatorname{Tr}(\rho E_m),
\qquad
\rho\mapsto\rho_m^+
=
\frac{M_m\rho M_m^\dagger}{p_m}
$$

[View →](../../../../equation-mapping.html#corpus-equation-86d193f13a693332)

At the probability level, the native record map should first recover the POVM outcome distribution before any operator is treated as a valid comparison label:
$$
\Delta_{\mathrm{POVM}}^\theta
=
\sup_{\|\psi\|=1}
d_{\mathrm{TV}}\!\left(
P_{\mathrm{rec}}^{\theta}(\cdot\mid\psi),
\langle\psi|E_{\theta}(\cdot)|\psi\rangle
\right)
\le
\varepsilon_{\mathrm{POVM}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b70e32d90ebeeac4)

This residual compares distributions on the same exhaustive set of outcomes, including no-record outcomes when present. A distribution normalized on detected records cannot be compared to an unconditional POVM unless the comparison is conditioned identically; state-dependent selection need not itself define a fixed normalized POVM. Passing the residual tests a specified apparatus/preparation class and does not create a primitive observable.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is not merely to reproduce the POVM probabilities. The same coupled target-apparatus-environment flow must also recover the instrument update, because different $M_m$ can give the same $E_m$ while leaving different post-record states.

For a declared channel $\theta$, let $\rho_{\theta,m}^{\mathrm{rec},+}$ be the effective state extracted from the basin-conditioned measure $\mu_{\theta,m}^+$ above, and let $\rho_{\theta,m}^{\mathrm{inst},+}=M_m\rho_\theta^-M_m^\dagger/p_m$ be the comparison instrument update. A compact generalized-measurement residual is
$$
\mathcal{R}_{\mathrm{inst}}(\theta)
=
\max_m
\max\left(
\frac{\left|\mu_{*,T_W}(\pi^{-1}(R_m))-p_m\right|}{\varepsilon_p},
\frac{\left\|\rho_{\theta,m}^{\mathrm{rec},+}-\rho_{\theta,m}^{\mathrm{inst},+}\right\|_1}{\varepsilon_{\mathrm{inst}}},
\frac{\left|\Delta E_{\mathrm{unrec}}(T_W;\theta,m)\right|}{\varepsilon_E}
\right)
\le 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b730d4a402c75b9)

In the state-update term, the maximum is restricted to outcomes with positive comparison and native weight; zero-weight outcomes retain the probability test but have no conditional state to compare. All tolerances are positive, and $\rho_\theta^-$ denotes the state at the instrument input time, with any evolution since $t_{\mathrm{split}}$ included. A POVM admits a larger-space projective representation, but that mathematical representation does not identify a physical apparatus. For an ideal destructive photon detector, projective absence/presence effects can coexist with both outputs in the no-photon channel. Thus effect projectivity alone never licenses the repeatable or Lüders updates above.

## What Makes an Interaction a Record

Not every separatrix crossing is a measurement record. A record requires stability and amplifiability.

Introduce a coarse record variable $R(A)$ extracted from apparatus state. A measurement record exists only if, after the transition,
$$
|R(A(t)) - R(A_{\text{pre}})| > R_*
$$

[View →](../../../../equation-mapping.html#corpus-equation-64c10fd668a2344c)

for some readout threshold $R_*$, and if the new branch remains stable for a persistence time $T_{\text{rec}}$:
$$
\tau_{\text{persist}} > T_{\text{rec}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-edd88cc57a7006e4)

For the dissipative record model, environmental locking has an additional coarse-grained entropy diagnostic. For a declared coarse-graining $\mathcal Q$, access region $W$, and candidate record instant $t$, let
$$
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}(t)
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ebe7131e95dd9b6)

measure the apparatus/environment entropy change associated with the candidate record channel. A strong record candidate should satisfy
$$
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}>0
$$

[View →](../../../../equation-mapping.html#corpus-equation-dbfa8b8c878e83f9)

with $S_{\mathrm{lock}}$ fixed by the apparatus class and readout channel, and the entropy evaluated on that declared ensemble. Positive coarse-grained entropy change is neither necessary for every stable record nor sufficient to rule out reversal. This is an extra requirement of the specified dissipative realization; its relation to persistence and accessible reversal controls must be demonstrated. An unrelated entropy increase cannot certify a record.

A cyclic record channel also needs a reset account. In the observer-level erasure comparison, take $N$ equally probable, distinguishable memory classes, initially uncorrelated with the reservoir and without retained side information that identifies the class. An ideal reset removes memory entropy $k_B\log N$. For a reversible full comparison dynamics, that entropy must be exported to the non-memory reservoir; a dimensionless, independently bounded correction $\varepsilon_\mu$ may cover specified nonidealities:
$$
\Delta S_{\mathrm{reset}}^{\mathrm{reservoir}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2
$$

[View →](../../../../equation-mapping.html#corpus-equation-22365349396b7d5e)

The reservoir includes the receiving apparatus/environment degrees of freedom and boundary exports, but excludes the erased memory. Combined memory-plus-reservoir entropy can remain constant in reversible erasure: the reservoir increase compensates the memory decrease. For nonuniform classes use $-k_B\sum_i p_i\log p_i$; accessible correlations require a conditional-entropy account. A generic measure-preservation error is not an entropy bound without an additional estimate. Recovering this erasure law from the substrate remains an obligation. Without reset, blank memory is a consumed physical resource whose depletion belongs in the event ledger.

In the specified dissipative realization, the intended record combines:

- a macroscopically legible state change,
- and enough environmental locking that the branch does not immediately recohere.

A detector avalanche, pointer shift, bubble track, or bit-flip supplies a record only when its specified readout survives the required duration; the event name alone does not establish persistence or its relation to the target.

The same distinction can be made quantitative by comparing the full apparatus-target flow with a diagnostic flow in which the candidate record channel is allowed to continue while still-unresolved cross-basin coherent influence is suppressed. Let $\Phi_t$ denote the full reduced flow on the apparatus-target state, let $\Phi_t^{(k)}$ denote that diagnostic flow for a candidate basin $B_k$, and let $\|\cdot\|_R$ be the readout norm on the record variable. Define
$$
\Delta_{\mathrm{rec}}(t;k)
=
\sup_{\Gamma_0\in B_k}
\frac{
\left\|
R(A(\Phi_t(\Gamma_0)))-
R(A(\Phi_t^{(k)}(\Gamma_0)))
\right\|_R
}{R_*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-80271d376cc45d27)

The diagnostic flow must specify exactly which couplings are suppressed, retain the other driving and initial histories, and pass an independent nonzero-response control. Choosing $\Phi_t^{(k)}=\Phi_t$ makes the residual zero identically and tests nothing. Here $\Phi_t$ abbreviates propagation from the fixed initial instant $t_0$ to chart instant $t$. The candidate record satisfies this sensitivity test on its persistence window only if
$$
\sup_{t\in[t_{\mathrm{rec}},\,t_{\mathrm{rec}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}},
\qquad
\varepsilon_{\mathrm{rec}}\ll 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-640855e605b01fdf)

An order-one residual rejects autonomy relative to the specified intervention. It does not alone distinguish unresolved interference from an intervention that materially disturbed an already stored record. A small residual tests insensitivity to that intervention and must be combined with the direct amplitude and persistence conditions.

A completed record should also make the retained reduced description restartable. Let $\mathcal{T}^{\mathcal{Q},W}_{a\to b}$ be the transition operator induced by the same substrate flow after projecting to a declared coarse-graining $\mathcal{Q}$ and retained access region $W$. For $t_0<t_1<t_2$, with $t_1$ and $t_2$ inside the candidate record window, define
$$
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)
=
\left\|
\mathcal{T}^{\mathcal{Q},W}_{t_0\to t_2}
-
\mathcal{T}^{\mathcal{Q},W}_{t_1\to t_2}
\mathcal{T}^{\mathcal{Q},W}_{t_0\to t_1}
\right\|_{\mathrm{TV}\to\mathrm{TV}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b19365e89624e8e3)

The restartability closure condition is
$$
\sup_{t_{\mathrm{rec}}\le t_1<t_2\le t_{\mathrm{rec}}+T_{\text{rec}}}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)
\le
\varepsilon_{\mathrm{div}},
\qquad
\varepsilon_{\mathrm{div}}\ll 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-920b7fc4aac588a5)

The operators require a specified lifting measure from reduced states to retained histories, and the norm is taken on the declared admissible ensemble class. This composition test checks a particular reduced restart rule. Failure does not imply that a stored bit is absent: discarded environment memory may change later target motion while the bit remains stable. Nor does agreement of two-time propagators alone establish absence of all multitime memory. These restart tests are extra requirements of this reduced description; a less compressed description may be needed for a valid record.

A candidate record must also close the same event bookkeeping that the measurement claims to expose. For a declared channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$ and candidate outcome event $\mathsf e_k$, define the record indicator
$$
\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)
=
\mathbf{1}\!\left[
\begin{array}{l}
\tau_{\mathrm{meas}}(\gamma;k)<\infty,\quad
\tau_{\mathrm{rec}}(\gamma;k)+T_{\mathrm{rec}}\le T_W,\quad
\sup_{t\in[t_{\mathrm{rec}},\,t_{\mathrm{rec}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)\le\varepsilon_{\mathrm{rec}},\\
\sup_{t_{\mathrm{rec}}\le t_1<t_2\le t_{\mathrm{rec}}+T_{\text{rec}}}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},\\
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}(t_{\mathrm{rec}};\gamma)\ge S_{\mathrm{lock}},\quad
\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e_k)\|\le\varepsilon_{\mathrm{evt}},\quad
|\Delta E_{\mathrm{unrec}}(T_W;\theta,k)|\le\varepsilon_E
\end{array}
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-150d653a571ab984)

This indicator applies to the dissipative, restartable realization just specified. It is zero unless the trajectory belongs to outcome $k$, has the required detector coupling and record amplitude, and passes the channel-level $\mathsf N_\theta$ test. The times are evaluated for that trajectory; the autonomy and restart suprema additionally certify the declared basin family. The energy, momentum, and angular-momentum components of $\mathcal L_{E\mathbf p\mathbf J}$ are residuals divided by separately declared positive scales before taking a common norm. The [unrecorded-energy residual](#measurement-and-heating-residual) tests the same event. These conventions make the concrete indicator realize the abstract eligibility event on this model class.

## Repeated-Record Confirmation

A measurement account is incomplete if it can name single records but cannot say how repeated records confirm or disconfirm the record law. For a fixed preparation class, apparatus kernel, coarse-graining, access region, and record window, let $D_N=\{N_k\}$ be the observed counts for $N$ completed records and let $\widehat f_k=N_k/N$ be the corresponding frequencies. The same finite-time basin measure used above should determine
$$
P_\theta(k)
=
\frac{
\int_{\pi^{-1}(R_k)}
\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)\,d\mu_{*,T_W}(\gamma)
}{
\sum_j
\int_{\pi^{-1}(R_j)}
\mathbf{1}_{\mathrm{rec}}(\gamma;j,\theta)\,d\mu_{*,T_W}(\gamma)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-07f6452804dd0398)

for the declared record map $\pi$ and model record $\theta$, with the denominator required to be nonzero on the completed measurement channel. This $P_\theta(k)$ is the same eligible-record-normalized weight introduced as $p_k^{\mathrm{rec}}(\theta)$ above; the concrete state-dependent record indicator realizes the abstract eligibility event $\mathsf R_\theta^{-1}(1)$. A compact confirmation residual is
$$
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta)
=
\max_k
\frac{\left|\widehat f_k-P_\theta(k)\right|}{\varepsilon_k(N)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3311faa04dfc3925)

The validation target is
$$
\mathbb P_{\theta,N}\!\left[
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta)>1
\right]
\le
\alpha_N,
\qquad
\varepsilon_k(N)\to0,\quad
\alpha_N\to0
$$

[View →](../../../../equation-mapping.html#corpus-equation-80576fe9b8ee42c9)

in the calibrated repeated-record regime. For independent identically prepared cycles, the preparation law is $\mu_{*,T_W}^{\otimes N}$ before selection. Counts of $N$ accepted records instead use the product of the single-cycle measure conditioned on eligibility, pushed forward by the outcome map, giving $P_\theta^{\otimes N}$. This equivalence requires that selection and reset do not correlate successive accepted trials. A correlated apparatus cycle must supply its own joint law. The accepted counts must be accompanied by the prepared-trial count and rejection/efficiency statistics; matching conditional frequencies alone does not validate the full channel.

The tolerance and confidence sequences must be coupled. In the independent-trial comparison with $K$ record classes, one admissible Hoeffding calibration is
$$
\alpha_N=N^{-2},
\qquad
\varepsilon_k(N)
=
\sqrt{\frac{\log(2K/\alpha_N)}{2N}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4ed911d524218e16)

for fixed finite $K$, so both sequences vanish, with the logarithmic factor required by the shrinking failure probability. This follows by applying the independent bounded-trial tail bound to each class indicator and summing the $K$ tail probabilities. Correlated cycles require a proved concentration bound for their joint law. A variance-based effective sample size alone does not justify substituting it into a Hoeffding tail bound.

The same finite-window measure must also survive the Born-window, thermodynamic-ensemble, and energy-ledger checks used elsewhere in the quantum closure chain. For a declared channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$, define the same-measure record residual
$$
\mathcal{R}_{\mathrm{same}}(\theta)
=
\max\!\left(
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta),
\frac{\Delta_{\mathrm{Born}}(T_W)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)}{\varepsilon_{\mathrm{ens}}},
\max_k\frac{|\Delta E_{\mathrm{unrec}}(T_W;\theta,k)|}{\varepsilon_E}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1c3f303ba650ba3a)

Here the Born-window and thermodynamic-ensemble terms are defined in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence), and the energy term is defined below. All must use the declared preparation and explicitly matched conditioning. Exceeding a tolerance identifies a failed comparison, whose cause may be sampling, dynamics, extraction, or ensemble mismatch; it does not by itself prove hidden ensemble retuning. The frequency component retains its stated confidence bound even when the other comparisons pass.

## Quantum-Zeno and Anti-Zeno Benchmark

Repeated record-forming interactions provide a direct benchmark for the basin-update rule. Let $B_s$ be the retained survival basin, let $\delta t=t/N$, and start from the basin-conditioned measure $\mu_0^+=\mu_0(\,\cdot\mid B_s)$. Pure evolution followed only by conditioning gives
$$
\widetilde{\mu}_j
=
(\Phi_{\delta t})_*\mu_{j-1}^+,
\qquad
q_j=\widetilde{\mu}_j(B_s),
\qquad
\mu_j^+=\widetilde{\mu}_j(\,\cdot\mid B_s)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b051aef61226b0a2)

The survival probability after $N$ completed records is
$$
P_{\mathrm{surv}}(N,t)
=
\prod_{j=1}^{N}q_j
$$

[View →](../../../../equation-mapping.html#corpus-equation-51b67a9fae66615b)

For this construction the product telescopes:
$$
P_{\mathrm{surv}}(N,t)
=
\frac{
\mu_0\!\left(
B_s\cap\bigcap_{j=1}^{N}\Phi_{j\delta t}^{-1}(B_s)
\right)
}{
\mu_0(B_s)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f505e4d6fea871a6)

Along nested grid refinements the intersection can only shrink. Pure conditionalization of one fixed deterministic flow cannot increase survival above its coarser-grid value; it rejects additional histories found outside $B_s$ at added sampling times. A history that exits and returns between all sampled times can still be missed. This argument assumes $\mu_0(B_s)>0$, nonzero intermediate conditioning denominators, and one unchanged flow.

A probe-induced increase in survival therefore requires physical back-action. Let $\mathcal M_{\delta t}$ be the probe-and-reset map and $\Psi_{\delta t}=\mathcal M_{\delta t}\circ\Phi_{\delta t}$. The following boundary-flux expansion applies only when this combined step has a smooth near-identity continuous-time realization on a smooth basin boundary with an absolutely continuous density. Let $\rho_j^+$ and $\mu_j^+$ denote the normalized, conditioned state entering the short step, $v_j$ its effective velocity on that chart, and $n$ the outward normal:
$$
q_j(\delta t)
=
1-\kappa_j\delta t+O(\delta t^2),
\qquad
\kappa_j
=
\frac{
\int_{\partial B_s}
\rho_j^+(z)\max\!\left(v_j(z)\cdot n(z),0\right)\,dA
}{
\mu_j^+(B_s)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e75851d7c13b9368)

For a moving boundary, use velocity relative to that boundary. A discontinuous reset or finite kick requires its own crossing calculation and is not covered by this flux formula. Within the smooth expansion, $\sup_j\kappa_j\to0$ and a uniformly bounded quadratic remainder suffice for vanishing total loss at fixed duration; uniform quadratic loss is a stronger sufficient condition. The physical realization must also account for probe duration, reset resources, and any record formation: sending $\delta t$ to zero with fixed nonzero probe duration is not an executable apparatus limit. An anti-Zeno comparison tests increased escape under the same preparation and duration.

Repeated multi-spin projections have experimentally produced quantum-Zeno subspaces and a measured projection-number scaling law in a diamond platform ([Kalb et al. 2016](https://doi.org/10.1038/ncomms13111)). This is an observer-level benchmark for the record-channel calculation, not evidence that projection is a substrate axiom.

## Weak-Probe Limit

The weak-probe model below is a small-coupling regime without a resolved target-branch record during the retained interaction window. It is a restricted model, not a definition of every weak measurement: a downstream pointer can produce a durable noisy record while the target disturbance remains small. Let $\epsilon$ denote the dimensionless probe strength in this local comparison, distinct from primitive polarity magnitude, and let $(X_\epsilon,A_\epsilon)$ be its coupled trajectory. The below-threshold condition for the chosen target-record variable is
$$
|R(A_\epsilon(t_1))-R(A_{\text{pre}})|\le R_*,
\qquad
\tau_{\text{meas}}^{(\epsilon)}>t_1-t_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-5f11efdb69a7958d)

where
$$
\tau_{\text{meas}}^{(\epsilon)}
=
\inf\{\Delta t>0:
\Sigma_{\mathcal K_A}(\Gamma_{\mathrm{tot},\epsilon}(t_0+\Delta t))=0,\quad
\frac{d}{dt}\Sigma_{\mathcal K_A}(\Gamma_{\mathrm{tot},\epsilon}(t))\bigg|_{t=t_0+\Delta t}>0\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9b1b6ae5a482bbe4)

Thus the individual retained interaction remains below the same record threshold used above. It may still produce a small pointer displacement $Y(A)$ whose ensemble mean is visible:
$$
\left\langle
Y(A_\epsilon(t_1))-Y(A_{\text{pre}})
\right\rangle_{\mathcal{E}}
=
O(\epsilon),
\qquad
\mathrm{Var}_{\mathcal{E}}\!\left(Y(A_\epsilon(t_1))\right)=O(1)
$$

[View →](../../../../equation-mapping.html#corpus-equation-23063657b7ead4a7)

The mean is statistically resolvable only if the leading response is nonzero and pointer samples are themselves recorded with calibrated noise. An $O(\epsilon)$ upper bound permits a zero signal. With a nonzero linear coefficient, bounded nonzero variance, and independent trials, the required sample count scales as $\epsilon^{-2}$ for fixed signal-to-noise ratio. This need not imply a sharp target-branch record on each trial.

Post-selection does not add future causation. It is ordinary conditioning on a later record-forming event. If $\mathcal{R}_f$ is the accepted later record class, let $\mu_0$ be the preparation measure and let $\Phi^{\mathrm{tot}}_{t-t_0}$ be the coupled substrate flow for the same target, apparatus, environment, and causal-wake variables used by the record channel. The physical evolution is the pushforward
$$
\mu_t
=
(\Phi^{\mathrm{tot}}_{t-t_0})_*\mu_0
$$

[View →](../../../../equation-mapping.html#corpus-equation-aac68c6730e2eec3)

The post-selected ensemble measure is then
$$
\mu_{\mathrm{post}}(B)
=
\mu_t\!\left(B\mid R_{\mathrm{post}}\in\mathcal{R}_f\right)
=
\frac{
\mu_t\!\left(B\cap\pi^{-1}(\mathcal{R}_f)\right)
}{
\mu_t\!\left(\pi^{-1}(\mathcal{R}_f)\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-32bb9edf1e083ece)

where $t$ is the later post-selection time, $\pi$ is its record map, and the denominator must be positive. Earlier pointer displacements can be averaged with this measure only if they are retained as history observables of the final state; equivalently pull the later event back to the initial-history space and condition there. The preparation, flow, and post-selection event can depend on probe strength and must be kept consistent in the limit. Conditioning does not reverse the substrate evolution.

The signed-response benchmark for post-selected weak probes should therefore be stated at the ensemble level. For a declared weak-probe pointer coordinate $Y$ and accepted later record class $\mathcal{R}_f$, define the normalized conditional response
$$
\bar{Y}_{\epsilon\mid\mathcal{R}_f}
=
\frac{1}{\epsilon}
\int
\left(
Y(A_\epsilon(t_1))-Y(A_{\text{pre}})
\right)
d\mu_{\mathrm{post}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-932c8bba60fa819a)

The $1/\epsilon$ normalization presumes that the same post-selected zero-coupling mean has been subtracted and that a finite linear-response coefficient exists. A raw baseline bias of order one would otherwise diverge. The weak-time limit below additionally requires nonvanishing selection probability and control of the limit of the conditional integral. In that calibrated regime, standard weak-value analysis supplies the observer-level target
$$
\left|
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathrm{QM}}
\right|
\le
\varepsilon_Y
$$

[View →](../../../../equation-mapping.html#corpus-equation-84a08b2011d3428c)

while still satisfying the no-record condition for each retained weak-probe trial. A negative or otherwise anomalous signed average is therefore a constraint on the conditional response kernel, not evidence for negative-mass ontology, backward substrate causation, or a completed measurement record inside the weak-probe window.

The same discipline applies when the weak probe is calibrated as a time-like observable. Let $\Omega$ be the declared region, barrier, channel, or internal state being sampled, let $Y_\Omega$ be the weak clock-pointer coordinate, and let $\alpha_T$ convert pointer displacement into the calibrated clock unit for that apparatus. The conditional weak-time response is
$$
\bar{T}_{\Omega\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\lim_{\epsilon\to0}
\frac{1}{\epsilon\,\alpha_T}
\int
\left(
Y_\Omega(A_\epsilon(t_1))-Y_\Omega(A_{\text{pre}})
\right)
d\mu_{\mathrm{post}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-202c72511afb4e99)

For a standard weak-measurement benchmark with prediction $T_{\Omega\mid\mathcal{R}_f}^{\mathrm{QM,weak}}$, the recovery target is
$$
\left|
\bar{T}_{\Omega\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
T_{\Omega\mid\mathcal{R}_f}^{\mathrm{QM,weak}}
\right|
\le
\varepsilon_T
$$

[View →](../../../../equation-mapping.html#corpus-equation-f36c548b9abecaf3)

while the no-record condition above still holds on each retained trial. If two clock designs are known to agree in a calibrated regime, such as a dwell-style internal-state clock and a delay-style pulse clock, the additional equality target is
$$
\left|
\bar{T}_{\mathrm{dwell}\mid\mathcal{R}_f}
-
\bar{T}_{\mathrm{delay}\mid\mathcal{R}_f}
\right|
\le
\varepsilon_{\mathrm{eq}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fc6c64e3ee41eb2e)

A negative value of $\bar{T}_{\Omega\mid\mathcal{R}_f}$ is therefore a signed conditional clock response in the post-selected ensemble. It is not negative absolute time, not a backward-in-time causal process, and not a claim that an intermediate record has already formed inside the weak-probe window.

## Relation to the Wavefunction

The wavefunction remains an effective observer-level object. In a measurement context it tracks:

- the coarse-grained envelope over still-accessible branches before the record forms,
- the basin weights associated with those branches,
- and the observer's epistemic uncertainty about which branch the deterministic microdynamics will realize.

Before the threshold crossing, the effective description may remain approximately unitary. After the record-forming crossing, the appropriate effective description changes because the system has entered a different attractor basin and the apparatus/environment has stored that branch information irreversibly for practical purposes.

Decoherence remains indispensable at the effective level because it estimates how off-branch interference becomes inaccessible to the apparatus and surrounding environment. It does not, by itself, select the record. A nearly diagonal reduced description can still leave the ontology owing the first crossing time, the realized basin, and the persistence condition defined above. Interpretations that treat decoherence alone as outcome selection are therefore retained only as inference shorthand unless they are backed by a separatrix-crossing and record-locking model.

The same restriction applies to credence or self-location arguments. They may describe how an observer should update after records exist, but they cannot replace the record-forming transition. The measurement ontology must still identify the basin, the first record time, the persistence window, and the measure that makes repeated records converge to the observed frequencies.

Thus "collapse" is not an extra physical law. It is the observer's forced update once the ontology has already selected a branch.

## Measurement Channels

Different measurement types correspond to different apparatus couplings, but the ontology is the same.

The channel definition must say what the apparatus actively does, not merely name the standard observable. For a declared apparatus kernel $\mathcal{K}_A$, let
$$
\pi_{\mathcal{K}_A}:
\Gamma_{\mathrm{tot}}
\longrightarrow
\mathcal{R}_{\mathcal{K}_A}
$$

[View →](../../../../equation-mapping.html#corpus-equation-140de5aecab6b09e)

be the record map from the coupled target-apparatus-environment state to the retained record classes. A claimed observable label $O$ is admissible in this chapter only after it has been represented by a family of record basins
$$
B_k^{O,\mathcal{K}_A}
=
\pi_{\mathcal{K}_A}^{-1}(R_k)
\cap
\{\gamma:\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)=1\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-193215dbfaee7a79)

This condition keeps the Bricmont-Goldstein/Bohmian warning in native form: a channel may reveal a position-like record, but spin-, momentum-, phase-, and energy-like labels are often apparatus-defined outcomes of an interaction. They need not be primitive properties carried unchanged into the apparatus. The deterministic substrate may still contain velocities, angular-momentum ledgers, phases, and causal-wake histories; the measurement claim is narrower, namely that the chosen apparatus kernel maps the coupled flow into a persistent record with the advertised observer-level statistics.

For composite assemblies, position-like and energy-like records are projections of a retained internal ledger, not primitive one-body properties. A detector may report a response center, arrival cell, ionization energy, calorimeter deposit, or spectral transition, but the substrate variables are constituent positions, velocities, shielded internal causal history, exposed coupling rows, recoil, and Noether sea response. The apparatus kernel must state which projection it reports and what internal rows are left unmeasured.

### Position-Like Measurements

The apparatus couples to spatial localization or arrival geometry. The record is a site-selective apparatus response such as a screen hit or detector cell trigger.

### Momentum- or Phase-Like Measurements

The apparatus couples to a resonance band, interference geometry, transport mode, or late-time arrival geometry. The record is a stable branch in the apparatus-sensitive phase channel. A time-of-flight or far-field momentum record, for example, is a record of the later apparatus position or transport branch calibrated back to a momentum variable; it is not automatically a direct reading of the target's initial substrate velocity.

### Spin / Discrete-Outcome Measurements

The apparatus couples to a discrete assembly orientation, angular-momentum response channel, or topological branch. The record is a branch-specific amplification, for example one of two detector channels.

In this language, "spin up" and "spin down" are not tiny literal arrows hidden inside the particle. They are the two stable branch labels selected by the apparatus relative to its chosen measurement axis.

For fermion spin-$\tfrac{1}{2}$, the standard Stern-Gerlach recovery target is a two-channel apparatus record with angular-momentum projections $+\hbar/2$ and $-\hbar/2$ along the apparatus axis. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that two-channel split must come from finite-time basin resolution of the target assembly plus apparatus, not from a primitive spin variable attached to an architrino.

The spin operator is therefore a compact generator of the recovered record statistics and basis rotations, not a new substrate degree of freedom. Its eigenlabels are licensed only when the apparatus kernel maps the Noether braid spin ledger into stable basin records with the standard half-angle probabilities.

The conditional Stern-Gerlach construction is developed in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response). Its apparatus coupling must retain internal phases, frequencies, causal roots, and wake history. The displayed basin kernels define deterministic pullbacks once a physical separatrix and record measure have been supplied. Half-angle arithmetic in an assumed spinor chart does not derive those inputs. The source leaves the spinor coordinate, conditional record measure, physical separatrix, and a concrete evaluation of the apparatus cross-root acceleration sum as substrate obligations. Angular impulse is an assembly-level projection of that sum with a declared conversion and center; architrinos carry no primitive mass or torque law.

For an apparatus axis $\hat{\mathbf m}$, the proposed channels are the record-forming basins $B_{\pm}(\hat{\mathbf m})$ with conditional first-order kernels $K_{\pm}^{\mathrm{SG}}(\hat{\mathbf m};Z_{\mathrm{in}})=G_{\mathrm{rec}}(Z_{\mathrm{in}})\,H\!\left(\pm\mathcal Q_{\hat{\mathbf m}}(Z_{\mathrm{in}})\right)$ and observer-level weights $P_{\pm}(\hat{\mathbf m})=\int K_{\pm}^{\mathrm{SG}}\,d\mu_*$ supplied by [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response). Here $G_{\mathrm{rec}}$ is the successful-record gate, $\mathcal Q_{\hat{\mathbf m}}$ is the signed response functional at the end of the interaction window, and $\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}$ is the finite interaction map. The measurement ontology uses those conditional kernels and adds two necessary acceptance comparisons; it does not establish their substrate inputs.

The kernel identity shows that the two conditional channels exhaust the successful-record gate away from the first-order separatrix. It is not independent evidence for that gate. The record-efficiency comparison tests the predicted heralding efficiency against a calibration measured independently of the model:
$$
\eta_{\mathrm{SG}}^{\mathrm{pred}}
=
P_{+}(\hat{\mathbf m})+P_{-}(\hat{\mathbf m}),
\qquad
\Delta_{\mathrm{herald}}^{\mathrm{SG}}
=
\left|
\eta_{\mathrm{SG}}^{\mathrm{pred}}
-
\eta_{\mathrm{SG}}^{\mathrm{obs}}
\right|
\le\varepsilon_{\mathrm{herald}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1cefe0676f86223c)

Here $\eta_{\mathrm{SG}}^{\mathrm{obs}}$ is the independently measured fraction of prepared trials that produce either accepted detector record for the same apparatus class, including failed capture and rejected events in the denominator. This gate can expose detector loss or failed record formation. The internal consistency identity remains $K_{+}^{\mathrm{SG}}+K_{-}^{\mathrm{SG}}=G_{\mathrm{rec}}$ when $\mathcal Q_{\hat{\mathbf m}}\ne0$; the $\mathcal Q_{\hat{\mathbf m}}=0$ separatrix requires the higher-order resolution already stated by the source derivation.

The second gate is the half-angle law, read as a consistency residual rather than an inserted record rule. For a spin-$\tfrac{1}{2}$ preparation at effective angle $\alpha$ relative to $\hat{\mathbf m}$,
$$
\Delta_{\mathrm{half}}^{\mathrm{SG}}
=
\left|
\frac{P_{+}(\hat{\mathbf m})}{P_{+}(\hat{\mathbf m})+P_{-}(\hat{\mathbf m})}
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right|
\le\varepsilon_{\mathrm{half}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8d471f9920ac21c0)

with $P_{+}+P_{-}>0$. The record coordinate $u_{\hat{\mathbf m}}(\theta_{\mathrm{rec}})=\int_0^{\theta_{\mathrm{rec}}}\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(s)\,ds$ is uniform only under a normalized continuous phase measure for the same accepted records. Raw phase is uniform only in the calibrated constant-phase-speed limit. A phase-dependent acceptance gate changes this conditional measure. These are conditional comparison ingredients, not independently derived apparatus data. Likewise, $H(0)=0$ assigns a value to the separator indicator but does not prove that the incoming measure assigns zero mass to the separator.

This is a single-assembly measurement statement. Bell-pair response and photon-polarization correlations additionally require the pair-provenance ledger and photon Gate B; they should not be treated as closed by the measurement ontology alone.

The important point is that the ontology never changes: different observables correspond to different coarse coordinates and different apparatus couplings, not different laws of collapse.

### Interaction-Free Measurement Benchmark

Elitzur-Vaidman/Kwiat interaction-free measurement is a required stress test because a detector can record the presence of an object even on retained trials in which the probe is not absorbed by that object. The standard experimental benchmark is the single-photon interferometer demonstrated by [Kwiat et al. (1995)](https://doi.org/10.1103/PhysRevLett.74.4763). For $\mathbb{A}\mathbb{A}\mathbb{A}$, the admissible record classes must include at least detected-object, absorbed, and inconclusive outcomes, all derived from one photon-apparatus-object flow and one event ledger.

For a balanced, lossless single-pass interferometer with an opaque object, the success probability per incident probe is
$$
\eta_{\mathrm{IFM}}^{(1)}=\frac{1}{4}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f0c8086c13d6c685)

and, for an ideal $N$-stage Zeno-chained interferometer,
$$
\eta_{\mathrm{IFM}}^{(N)}
=
\cos^{2N}\!\left(\frac{\pi}{2N}\right)
\longrightarrow 1
$$

[View →](../../../../equation-mapping.html#corpus-equation-c6e1bb6e33b761a0)

subject to the declared apparatus losses, visibility, and record convention. These are success probabilities per incident probe when the object is present, not efficiencies conditioned on success or absorption. In the balanced single-pass case the absorption probability is $1/2$ and the inconclusive probability is $1/4$, so success conditional on success-or-absorption is $1/3$. The two displayed constructions are different apparatus families: substituting $N=1$ into the chained formula does not recover the balanced single-pass value.

The native account may use the probe's unresolved causal-wake and apparatus history across the full interferometer even when the localized probe assembly is recorded in the unblocked output channel. That possibility is a mechanism target, not a completed explanation. Closure requires the declared apparatus kernel to reproduce the interaction-free success probability and visibility while the retained detected-object trials show no absorption or target-transit event, and while the photon Gate A/B/C and source-depletion/recoil ledgers remain closed. A statement that "the wake sampled the blocked arm" is not enough without that record and energy accounting.

## Born-Rule Interface

This chapter does not derive the Born rule by itself. It fixes the ontology that the Born-rule derivation must sit on.

The closure target is that basin weights induced by the deterministic flow reproduce the usual outcome weights:
$$
P_k = \mu_*(B_k)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1685da9dd6809d0d)

with $B_k$ the record-forming attractor basins that satisfy the record, persistence, and event-ledger tests above, and $\mu_*$ the relevant invariant or coarse-grained measure. When the channel includes candidate branches that do not yet pass those tests, the normalized record probability is the filtered quantity $P_\theta(k)$ rather than a weight assigned to every formal branch label.

Born-rule statements must also stay at the preparation-to-record level. In a destructive channel, a formal comparison state need not survive as an outstate after the apparatus interaction. Photon absorption by a polarizer is the standard example: the admissible question is the probability that the declared preparation is routed into a record class such as transmitted, absorbed, or scattered by the apparatus kernel. The post-measurement state catalog is a later record update, not the object whose existence supplies the Born weight.

Probability is therefore not a property of a formal state label by itself. It is the record-facing weight produced when preparation, apparatus coupling, retained path-history, and coarse-grained dynamics route a system into a durable record class.

The measurement ontology therefore connects directly to the basin-measure program in [wavefunction-ontology.md](./wavefunction-ontology.md) and the separatrix-time program in [superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md).

This also fixes how external probability geometries should be used. A comparison framework may assign a natural measure to a space of possible configurations or records, but that measure is not automatically the Born rule. In this chapter, a candidate record map $\pi:\Gamma_{\eta,h}\to\mathcal{R}$ is admissible only if the probabilities are pulled forward from the same deterministic flow that creates the apparatus record:
$$
P(R_k)=\mu_*\!\left(\pi^{-1}(R_k)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-5678e98a1e754406)

The source of $\mu_*$ is therefore part of the measurement closure, not an optional interpretive add-on.

The load-bearing step is measure selection, not the indicator identity. Let $\nu_{\mathrm{prep}}$ be the preparation-limited unresolved-history measure, and let
$$
\nu_{\mathcal Q,W,t}
=
(\Pi_{\mathcal Q,W})_*
(\Phi_{t_0\to t}^{\mathrm{tot}})_*
\nu_{\mathrm{prep}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1e9bc199f4814e9)

be its deterministic pushforward into the retained chart. Finite-window predictions require a specified preparation measure and flow, not a globally unique invariant measure. When repeated-cycle weights are represented by an invariant $\mu_*$, the model must explain which preparation component selects it. A physical invariant measure means that a stated preparation class approaches its statistics; naming an SRB measure or a zero-noise limit does not prove existence, uniqueness, or relevance. An invariant-measure account must also establish the frequency relation
$$
\frac{1}{N}
\sum_{n=0}^{N-1}
\mathbf 1_{B_i}(\mathcal F_{\mathrm{ret}}^n\gamma)
\longrightarrow
\mu_*(B_i)
$$

[View →](../../../../equation-mapping.html#corpus-equation-959a1ace5e405d7e)

for preparation-almost-every retained state $\gamma$, where $\mathcal F_{\mathrm{ret}}$ includes preparation and reset between trials, or supply a finite-window error bound. Iterating a trapped post-record state inside one basin would give that basin frequency one, not the trial distribution. Equidistribution of continuous observables alone does not guarantee the displayed indicator limit without a suitable measurable ergodic theorem or a zero-measure basin-boundary condition. The identity
$$
p_i
=
\int_{\Gamma_{\eta,h}}\mathbf{1}_{B_i}\,d\mu_*
=
\mu_*(B_i)
$$

[View →](../../../../equation-mapping.html#corpus-equation-f1153a8f230c56c7)

is exact for a specified measurable basin and measure; the approximation lies in identifying it with observed finite-window frequencies. Metastability, leakage, escape, preparation, and coarse-state errors belong in that comparison.

Finite record resolution can export a probability interval before it exports a point probability. Let a finite partition $\mathcal{P}_N=\{C_a\}$ cover the retained history chart $\Gamma_{\eta,h}$ for the same setup $\theta$, and let
$$
E_k(\theta)
=
\pi^{-1}(R_k)\cap\mathsf R_\theta^{-1}(1)
$$

[View →](../../../../equation-mapping.html#corpus-equation-25d0bbb79bf32871)

be the eligible record event. The lower and upper record weights at that resolution are
$$
p_{k,N}^-
=
\sum_{\substack{C_a\in\mathcal{P}_N\\ C_a\subset E_k(\theta)}}
\mu_*(C_a),
\qquad
p_{k,N}^+
=
\sum_{\substack{C_a\in\mathcal{P}_N\\ C_a\cap E_k(\theta)\ne\varnothing}}
\mu_*(C_a).
$$

[View →](../../../../equation-mapping.html#corpus-equation-bc539d6e63d1e054)

The Born-rule closure target is not merely to name a formal projector, but to show that the finite-window width
$$
\Delta p_{k,N}=p_{k,N}^+-p_{k,N}^-
$$

[View →](../../../../equation-mapping.html#corpus-equation-9cbf7ae57bd60068)

falls below apparatus tolerance and the interval contains the independently specified comparison weight within its error budget. These sums bound the unconditional eligible weight $\mu_*(E_k)$; comparisons to $P_\theta(k)$ require normalization by total eligibility or applying the same partition construction to the conditioned measure. Refinement need not shrink the interval if boundary cells retain positive measure. A sufficient route is nested generating partitions with vanishing event-boundary measure. A narrow interval alone does not establish agreement with the Born rule.

The same restriction applies to branch language. If a branch or record class is emergent from later apparatus/environment dynamics, its probability cannot be inserted as an axiom before the record map, basin family, and measure source have been fixed. Assigning weights to emergent branches without that pullback repeats the measurement cut in probabilistic form. A valid branch probability must be a derived property of the same deterministic flow that creates and preserves the record, not a label attached after the ontology has already been compressed.

## External Penrose-Diosi Benchmark

Penrose-Diosi gravitational-collapse proposals provide an external comparison target for massive-superposition measurement claims. Their useful pressure is the tension between two inherited principles: local free-fall equivalence in gravity and linear superposition in quantum state descriptions. If one branch of a massive superposition can be locally transformed away only by a different free-fall frame than the other branch, the comparison asks whether the mismatch has an energy scale that should limit the lifetime of the unresolved branch description.

This comparison must be kept separate from passive external-field atom-interferometer phase tests. A single atom or dilute atom ensemble used as a passive mass in Earth's field can confirm the weak-field free-fall phase map, including a cubic-time phase coefficient, without testing whether the branch mass distribution sources a measurable gravity-side record. The Penrose-Diosi benchmark begins only when the alternatives carry different active mass-density histories $\rho_1$ and $\rho_2$ whose self-gravity or effective-metric response could contribute to record formation.

In that comparison, two alternative mass distributions $\rho_1$ and $\rho_2$ are assigned a gravitational self-energy scale
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(x_{\mathrm{eff}}^i)(\rho_1-\rho_2)(y_{\mathrm{eff}}^i)}
{\|x_{\mathrm{eff}}^i-y_{\mathrm{eff}}^i\|}\,d^3x_{\mathrm{eff}}\,d^3y_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4273fd356f135273)

and a corresponding lifetime estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f7488e6af04de800)

The layer-explicit effective-metric comparison replaces the displayed integration variables by $x_{\mathrm{eff}}^i$ and $y_{\mathrm{eff}}^i$ and computes the mass-density histories from the declared branch projection before interpreting $\Delta E_G$.

$\mathbb{A}\mathbb{A}\mathbb{A}$ does not adopt fundamental gravitational collapse or a stochastic metric. As an external proposal, [Howl, Penrose, and Fuentes](https://arxiv.org/abs/1812.04630) discuss condensate superpositions with model-dependent examples involving roughly $10^9$ to $10^{10}$ atoms; the inferred lifetime also depends on density, geometry, displacement, and the collapse-model convention. These are proposed test configurations, not demonstrated superpositions at those scales. For this chapter, the target is to derive the apparatus trigger and record-completion times independently, then specify which observable lifetime can be compared with the Penrose-Diosi estimate. Equating a trigger time to loss of coherence or to record completion requires an additional dynamical argument.

The useful variable is mass displacement, not system size by itself. A many-degree system that leaves nearly the same mass density in each branch is a weaker test than a smaller system whose alternative branches separate appreciable mass density. For a proposed apparatus-target model, record the comparison ratio
$$
\mathcal{R}_{\mathrm{PD}}
=
\frac{\tau_{\text{meas}}}{\tau_G}
=
\frac{\tau_{\text{meas}}\Delta E_G}{\hbar}
$$

[View →](../../../../equation-mapping.html#corpus-equation-e0eeb26c9198651a)

This ratio is not an ontology selector. It compares a proposed trigger time with an external lifetime estimate; its interpretation remains conditional on the observable-time identification just described. Collapse-model variants that imply persistent spontaneous heating face a separate empirical constraint: [Tilloy and Stace](https://arxiv.org/abs/1901.05477) derive neutron-star heating bounds for specified collapse models. Such bounds constrain their modeled heating channels and parameters, not the uncomputed $\mathbb{A}\mathbb{A}\mathbb{A}$ threshold-resolution mechanism.

### Measurement and Heating Residual

The heating pressure from objective-collapse comparisons should be retained as an effective energy-ledger test, not as imported stochastic-collapse ontology or an architrino-level energy postulate. A declared apparatus channel $(\mathcal{K}_A,\mathcal{Q},W,T_W)$ already has a Born-window residual $\Delta_{\mathrm{Born}}(T_W)$ and thermodynamic ensemble residual $\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)$ in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence). For a fixed target-plus-apparatus-plus-environment control volume, define the effective residual using disjoint signed external transfers:
$$
\Delta E_{\mathrm{unrec}}(T_W;\theta)
=
\Delta E_{\mathrm{target+app+env}}(T_W)
{}-W_{\mathrm{decl}}(T_W;\theta)
{}-E_{\mathrm{boundary}}(T_W;\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3bf8b7dd9ded3c6b)

Here $\theta$ specifies the same run, control volume, effective energy map, and ledger calibration. $W_{\mathrm{decl}}$ is external work into that volume; $E_{\mathrm{boundary}}$ is every other external transfer, positive inward and negative outward, including energy carried by emitted assemblies. Neither includes a transfer already counted in the other. Recoil and medium excitation inside the volume contribute to $\Delta E_{\mathrm{target+app+env}}$ and are not subtracted again. Exchanges with an environment outside the selected volume belong in the external ledger instead. A zero residual is a recovery target conditional on the declared effective balance law and complete accounting, not a primitive conservation premise. The combined validation diagnostic is
$$
\mathcal{R}_{\mathrm{meas+heat}}(T_W;\theta)
=
\max\left(
\frac{\Delta_{\mathrm{Born}}(T_W)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)}{\varepsilon_{\mathrm{ens}}},
\frac{|\Delta E_{\mathrm{unrec}}(T_W;\theta)|}{\varepsilon_E}
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-48b93873d06f1bcf)

A measurement model that fits Born weights only by changing the thermodynamic ensemble, or that leaves a persistent unexplained heating term, has not closed the record-forming channel. A model may still compare to CSL-like or Penrose-Diosi-like formulas, but the retained content is the observable residual, not the external collapse mechanism.

## External Gravitational Which-Path Benchmark

Massive-superposition tests also create a second external benchmark: whether the gravitational or effective-metric readout of two branches can carry which-path information. This comparison preserves the observable pressure without adopting a stochastic-metric ontology. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the effective metric is an observer-level reconstruction, so a gravitational readout becomes measurement-relevant only when a Physical Observer apparatus can turn the branch-dependent response into an autonomous record.

Let $\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ be two alternative branch-level mass-density histories, and let $s_A(t_{\mathrm{eff}};\rho_k,\theta)$ denote the detector signal channel $A$ predicted by the same effective-metric constitutive record $\theta$ for branch $k$. Define
$$
\Delta s_A(t_{\mathrm{eff}})
=
s_A(t_{\mathrm{eff}};\rho_1,\theta)-s_A(t_{\mathrm{eff}};\rho_2,\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b1e33cc2e330467)

Let $N_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')$ be the covariance of unresolved detector, environmental, and boundary-wake contributions over the coherence window $T_W$, with signal and covariance expressed in the same calibrated units. On a declared finite-bandwidth readout space where this covariance is positive definite, define the squared signal-to-noise diagnostic
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}\!\!\int_0^{T_W}
\Delta s_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')\,
\Delta s_B(t_{\mathrm{eff}}')\,dt_{\mathrm{eff}}\,dt_{\mathrm{eff}}'
$$

[View →](../../../../equation-mapping.html#corpus-equation-09d074ff8fe774a5)

The inverse is an operator inverse on that readout space, not an entrywise reciprocal. Singular covariance requires an explicit supported-subspace or regularized model and treatment of signal components in null directions; silently applying a pseudoinverse could discard a noiseless distinguishing signal. Covariance alone does not specify a likelihood law or an interference-visibility relation. Under a calibrated response and noise model that connects this diagnostic to accessible which-path information, an interference-preservation target may be set as
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)\le\varepsilon_{\mathrm{wp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9d5387e3f626c402)

for the same unconditioned branch ensemble and coherence window. A later record, or a postselected interference pattern, is not an alternative way to pass this same-ensemble target. A large value together with intact interference challenges the proposed response only after the independently calibrated information-to-visibility relation predicts suppression in that experiment; the quadratic diagnostic by itself proves neither record formation nor loss of interference.

The covariance $N_{AB}$ is not an ontological randomness postulate in this chapter. It must be derived, or bounded, from unresolved deterministic boundary data, local Noether sea state, detector calibration residuals, and ordinary environmental channels. This preserves an external comparison while leaving the proposed finite-time assembly mechanism to be derived.

### Minimal Massive-Branch Toy Model

A first calculation can be posed without choosing a full collapse interpretation. Let a target mass $M$ have two branch-level center histories
$$
x_{\pm,\mathrm{eff}}^i(t_{\mathrm{eff}})
=
x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})\pm\frac{1}{2}d_{\mathrm{eff}}^i(t_{\mathrm{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-69b5f61929f8c109)

with branch densities
$$
\rho_{\pm}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
M\,\delta_{\eta}\!\left(x_{\mathrm{eff}}^i-x_{\pm,\mathrm{eff}}^i(t_{\mathrm{eff}})\right)
+
\rho_{\mathrm{app}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-5f0d0a2b62d184de)

where $\delta_\eta$ is a normalized, nonnegative mass-density profile of width $\eta>0$ and $\rho_{\mathrm{app}}$ is the shared apparatus and environmental mass density. This is an effective mass-density model, not a mass assigned to an individual architrino. For a differential gravity readout channel $A$, define
$$
s_A(t_{\mathrm{eff}};\rho_{\pm},\theta)
=
e_A^i
\left[
a_i^{\mathrm{eff}}(y_{A,\mathrm{eff}}^i,t_{\mathrm{eff}};\rho_{\pm},\theta)
-
a_i^{\mathrm{eff}}(y_{0,\mathrm{eff}}^i,t_{\mathrm{eff}};\rho_{\pm},\theta)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-9f0932f3b1b5de50)

where $y_{A,\mathrm{eff}}^i$ and $y_{0,\mathrm{eff}}^i$ are detector reference points, $e_A^i$ is the channel projection, and $a_i^{\mathrm{eff}}$ is the effective metric or weak-field acceleration readout derived from the same constitutive record $\theta$ used in the spacetime chapters.

For a conditional Newtonian weak-field comparison, at detector distances large compared with both $\eta$ and $\|d_{\mathrm{eff}}\|$, the first-order displacement expansion has the tidal form
$$
\Delta s_A(t_{\mathrm{eff}})
\simeq
-G_{\mathrm{eff}}(\theta)M\,e_A^i
\left[
D_{ij}(y_{A,\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i)
-
D_{ij}(y_{0,\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i)
\right]
d_{\mathrm{eff}}^j(t_{\mathrm{eff}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-0aab7090391b5ffe)

with
$$
D_{ij}(R_{\mathrm{eff}}^i)
=
\frac{3R_{\mathrm{eff},i}R_{\mathrm{eff},j}-\|R_{\mathrm{eff}}^i\|^2 \gamma_{ij}^{\mathrm{eff}}}{\|R_{\mathrm{eff}}^i\|^5}
$$

[View →](../../../../equation-mapping.html#corpus-equation-606e461dfb8a3794)

where $\gamma_{ij}^{\mathrm{eff}}=\delta_{ij}$ in the flat comparison chart used for this Euclidean tidal kernel; a general curved-chart response requires a separate derivation. The minus sign follows by differentiating the comparison acceleration $-G_{\mathrm{eff}}M(y-x)/\|y-x\|^3$ with respect to the source position $x$. If the unresolved readout noise is both approximately stationary and white over the resolved bandwidth, with positive-definite spectral-density matrix $S_{AB}$ and covariance $N_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')=S_{AB}\delta(t_{\mathrm{eff}}-t_{\mathrm{eff}}')$, then
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\simeq
\int_0^{T_W}
\Delta s_A(t_{\mathrm{eff}})\,
S^{-1}_{AB}\,
\Delta s_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-72bafc1f86965ce7)

This toy model defines a conditional calculation, not a completed simulation or an accepted physical branch family. Its inputs include $M$, $\eta$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})$, detector geometry $(y_{A,\mathrm{eff}}^i,y_{0,\mathrm{eff}}^i,e_A)$, noise spectrum and bandwidth, coherence time $T_W$, and the constitutive weak-field map in $\theta$. Stationarity alone permits colored temporal correlations and does not justify the white-noise reduction. A which-path comparison additionally requires the same-ensemble visibility calibration described above; a derived record must be assessed for its actual time window and cannot excuse a conflicting interference prediction.

The observer-level covariance decomposition is owned by [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). The concrete validation scaffold is [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md).

## Closure Targets

For this chapter to count as closed, the repo still needs:

1. one explicit Master-Equation apparatus-target toy model that evaluates the branch-sum impulse and record-cycle phase density,
2. one explicit record variable $R(A)$ and persistence criterion,
3. separately derived trigger and record-completion times, including an explicit observable-time identification for any massive-superposition comparison against the external Penrose-Diosi scale $\tau_G$,
4. one gravitational which-path distinguishability calculation $\mathcal{D}_{\mathrm{grav}}$ for a massive-superposition apparatus, following the [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md),
5. one bridge from basin weights to observed frequencies.

This chapter specifies a proposed ontology and conditional interfaces. The remaining obligations include well-posed delayed evolution, operational record and clock maps, an independently specified preparation measure, and derivations within an explicit apparatus model. Neither these definitions nor a repaired interface establishes physical branch existence, EOM solver acceptance, or theory closure.

## Falsification Gate

The proposed mechanism is challenged if any of the following occur, with the experimental record identified by a calibrated readout criterion independent of the mechanism being tested:

- a genuine measurement record can be shown to form without any finite-time physical branch-selection process,
- the same apparatus can produce reproducible outcomes while no durable apparatus/environment asymmetry is created,
- or, for an apparatus class with a derived lower bound $\tau_{\mathrm{meas}}\ge\tau_{\min}>0$, experiment establishes an upper bound $\tau_{\mathrm{meas}}\le\tau_{\max}<\tau_{\min}$.

For preparations strictly before the oriented trigger surface, the proposed finite-time mechanism requires
$$
\tau_{\text{meas}} > 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-6f5144aaa8420307)

when a trigger occurs. This inequality is not equivalent to the existence or persistence of a readable record. A positive lower bound requires additional dynamical control, such as a positive initial surface distance and a bounded approach rate; continuity alone supplies no uniform lower bound across preparations arbitrarily near the surface.

The bound comparison is the testable form of the finite-time claim. No finite-resolution experiment is required to establish an exactly zero duration; the model must instead expose a positive lower bound that a tighter experimental upper bound can contradict. Both bounds must concern the same preparation, clock calibration, observable event, and uncertainty budget. A record-completion bound cannot be compared directly with a trigger-time bound, and a failure of this particular separatrix model need not rule out every deterministic record mechanism.

## Related Chapters

- [measurement-problem-and-collapse.md](../philosophy-history/theory-bridges/measurement-problem-and-collapse.md)
- [superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md)
- [wavefunction-ontology.md](./wavefunction-ontology.md)
- [pilot-wave-character.md](../philosophy-history/theory-bridges/pilot-wave-character.md)
- [master-equation.md](../dynamics/master-equation.md)
- [entanglement-nonlocality.md](../philosophy-history/theory-bridges/entanglement-nonlocality.md)
- [bell-theorem.md](../philosophy-history/theory-bridges/bell-theorem.md)
- [algorithmic-resonance.md](./algorithmic-resonance.md)
- [observer-framework.md](../spacetime/observer-framework.md#physical-observers)
