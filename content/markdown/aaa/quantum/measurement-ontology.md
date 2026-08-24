# Measurement Ontology

## Purpose and Scope

This chapter fixes what a measurement event is in $\mathbb{A}\mathbb{A}\mathbb{A}$ at the ontological level. It is narrower than the full Born-rule program. The aim is to say what must physically happen before the observer-level sentence "a measurement occurred" is allowed.

The short answer is that a measurement is not an extra rule added to the equations. It is an ordinary physical interaction that becomes special because it crosses a threshold, amplifies the result, and leaves a durable record. The chapter therefore defines the minimum physical architecture:

- what counts as the system,
- what counts as the apparatus,
- what turns an interaction into a record,
- and what the theory must reproduce to match ordinary quantum measurement practice.

## Core Claim

Measurement is not a primitive axiom and not a special observer intervention. It is a physical interaction between assemblies that drives a metastable target across a separatrix and then locks the resulting branch into a persistent macroscopic record.

The ontology is therefore a coupled record channel:

- **system:** an assembly or coupled assembly-subsystem with reduced state $X$,
- **apparatus:** another assembly network engineered so that its wake structure couples strongly to a chosen coordinate of $X$,
- **environment:** the surrounding Noether sea plus uncontrolled apparatus degrees of freedom,
- **measurement outcome:** the attractor basin into which the coupled system settles,
- **record:** a durable asymmetry in apparatus/environment variables that can be re-read without reconstructing the original metastable state.

The apparatus configuration is part of the record channel, not external decoration. In a concrete detector model, the geometry, coupling settings, thresholds, and readout coarse-graining are collected into an apparatus record kernel $\mathcal{K}_A$, so the separatrix and record variable are really $\Sigma_{\mathcal{K}_A}(X,A)=0$ and $R_{\mathcal{K}_A}(A)$. The unindexed $\Sigma$ and $R$ below are shorthand after the channel is fixed. This does not make the observer a creator of the target state. It means that a record is a coupled system-apparatus event with declared physical coupling.

## No Heisenberg Cut

The ontology rejects a fundamental system-observer split.

The reason is direct. If the apparatus is made of assemblies, then it cannot sit outside physics while the target remains inside physics. The apparatus has its own causal wakes, thresholds, uncontrolled degrees of freedom, and Noether sea coupling. A measurement account must therefore include the apparatus in the same physical flow as the target.

At the substrate level there are only:

- architrinos with definite positions and velocities in absolute time,
- their causal wakes,
- and the assemblies built from those constituents.

What standard quantum mechanics calls a "measurement" is therefore just a special regime of assembly-assembly coupling with three features:

1. strong targeted perturbation of a metastable degree of freedom,
2. amplification into many apparatus degrees of freedom,
3. dissipation into the surrounding Noether sea so that coherent reversal becomes practically inaccessible.

This also sets the comparison boundary for path-integral and generalized-quantum-mechanics language. A history-sum formalism can reproduce ordinary pointer-record probabilities and may assign measures to microscopic event statements, but those measures are not automatically $\mathbb{A}\mathbb{A}\mathbb{A}$ records. The native question remains whether the apparatus-target dynamics produce a separatrix crossing, a durable record variable, and a persistence window without invoking an external classical observer.

Expectation values, covariance matrices, correlation functions, and decoherence rates obey the same rule. They are legitimate observer-level summaries only after the target, apparatus, environment, access region, and record channel have been declared. In closed-system, cosmology, or quantum-gravity comparisons, an averaged quantity is therefore not automatically a statement about what the substrate is doing; it is a data product that must be tied back to $\Gamma_{\mathrm{tot}}$, the retained boundary data, and the record criteria below.

The same discipline applies to ordinary measurement-rule language. A statement such as "measure an observable and obtain outcome $k$ with probability $p_k$" is a useful laboratory instruction, but it is not yet a substrate closure. It must be unpacked into a declared record packet
$$
(\mathcal{K}_A,\mathcal{Q},W,T_W,\{R_k\},\mu_{*,T_W})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1e97dfd8148981fe)
whose apparatus kernel, coarse-graining, access region, record window, record classes, and finite-time basin measure all belong to the same coupled flow. The observer-level probability is then a record statistic,
$$
p_k(\theta)=\mu_{*,T_W}\!\left(\pi^{-1}(R_k)\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-2d97c861f41c6dd7)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c8fe5cae0f3ec7ec)

where $\mathsf C_\theta$ is a genuine detector-target coupling, $\mathsf L_\theta$ is ledger closure for conservation and recoil transfer, $\mathsf P_\theta$ is persistence over the record window, and $\mathsf N_\theta$ is no-signaling consistency. The last factor consumes the setting-independent marginal residual defined in the [Bell closure diagnostics](../philosophy-history/theory-bridges/bell-theorem.md#bell-closure-diagnostics); it is not a label inserted after the record classes are counted.

For a declared packet the weighted outcome is the normalized eligible-measure:

$$
p_k^{\mathrm{rec}}(\theta)=
\frac{\mu_{*,T_W}\!\left(\pi^{-1}(R_k)\cap \mathsf R_\theta^{-1}(1)\right)}
{\sum_j\mu_{*,T_W}\!\left(\pi^{-1}(R_j)\cap \mathsf R_\theta^{-1}(1)\right)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bcc487ab8cd1f34e)

not an extra rule assigned after the dynamics. The unfiltered statistic $p_k(\theta)$ and the eligible-record-normalized weight $p_k^{\mathrm{rec}}(\theta)$ are generally different quantities. The latter is written $P_\theta(k)$ once the concrete state-dependent record indicator $\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)$ is available. They coincide only when record eligibility is constant and equal to one on every outcome preimage. This keeps the empirical measurement formalism intact while forcing the words "measurement," "outcome," and "probability" to earn a physical record channel. The formal rule survives; the unsupported cut between quantum target and classical apparatus does not.

### Laboratory Limit and Closed Cosmology

Ordinary laboratory quantum mechanics is recovered in the limit where the apparatus and downstream observer can be treated as large, slow, cold, and externally controllable compared with the target. In that regime the observer can prepare a channel, let the target interact, collect many trials, and treat the apparatus as if it stood outside the measured system. $\mathbb{A}\mathbb{A}\mathbb{A}$ preserves that practice as an observer-level approximation, not as an ontological cut. The "external observer" is a limiting description of a Physical Observer whose uncontrolled coupling, memory drift, and record tolerance $\epsilon_O$ are negligible for the declared experiment.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f87d209689980889)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-915cf2c09557552a)
where $\mathbb{U}_{\text{now}}(T)\equiv S(T)$ is the instantaneous ontic substrate state on the simultaneity slice at absolute time $T$ retained by the model and $U$ records declared apparatus controls or settings.

Two time labels appear in this chapter and must not be conflated. The ontic substrate flow — $\mathbb{U}_{\text{now}}$, its retained history $\mathcal{H}_{\eta,h}$, and the causal-wake background — is always indexed by absolute time $T$. The reduced record-channel coordinates $(\Gamma_{\mathrm{tot}},X,A,\Xi)$ and every bare record-channel time $t$ below live in the reduced effective chart that this coarse-state map produces; $t$ coincides with $T$ in the laboratory limit and is the effective-chart time inherited by [Wavefunction Ontology](wavefunction-ontology.md). Where an open-system or effective-metric reconstruction carries its own rescaled clock, that time is written $t_{\mathrm{eff}}$.

The measurement transfer operator is first a deterministic pushforward of the retained flow,
$$
\mathcal{T}_{\Delta t}\rho
=
\left(
\Phi_{\Delta t}^{u,\mathcal{H},\mathcal{W}_{\mathrm{sea}}}
\right)_*\rho
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ece0feb545452cba)
A reduced Markov kernel is a later compression of this pushforward, not an assumed Born kernel. It is licensed only after unresolved variables receive an explicit occupation measure from a material return map, a record cycle, or the Noether sea context used by the same apparatus channel. Otherwise the probability rule has been inserted at the cut rather than derived from the record-forming flow.

The rejection of the cut can be stated as a closure condition on the dynamics. Let
$$
\Gamma_{\mathrm{tot}}(t)=(X(t),A(t),\Xi(t),\mathcal{W}(t))
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-7a82c3e9eb7c9d1e)
collect the target coordinates $X$, apparatus coordinates $A$, retained environment coordinates $\Xi$, and causal-wake history $\mathcal{W}$. The symbol $\Xi$ keeps $Z$ available for proton number and keeps the incoming spin-ledger state $Z_{\mathrm{in}}$ below distinct from the environment. A valid measurement model must be the projection of one substrate flow,
$$
\dot{\Gamma}_{\mathrm{tot}}
=
F_{\mathrm{tot}}(\Gamma_{\mathrm{tot}}),
\qquad
\pi_{XA}\Phi_t^{\mathrm{tot}}(\Gamma_0)=(X(t),A(t))
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b54d12e373ea0d1c)
not a splice between quantum dynamics on the target side and a separate classical-observer dynamics on the apparatus side. A human observer, laboratory notebook, or downstream database is therefore another possible record-bearing assembly, not an ontologically privileged endpoint of the measurement.

When the environment is compressed to an open-system map, the compression must declare its memory assumption. A standard trace-preserving completely positive comparison map has Kraus form
$$
\rho\mapsto\mathcal{L}[\rho]
=
\sum_m M_m\rho M_m^\dagger,
\qquad
\sum_m M_m^\dagger M_m=I
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0b2498da11e53f36)
A differential Lindblad comparison is admissible only after the environment correlation time $\tau_{\mathrm{env}}$ is short compared with the effective relaxation time $\tau_{\mathrm{relax}}$ of the density-state chart. The record-persistence time is a separate apparatus property and cannot replace this Born-Markov scale separation. In the admissible regime the benchmark generator has the form
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dc6e50f871ecfe5f)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f89c2980512aadb8)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-99bd145487f161c3)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-17c19f3897bf99b8)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c40058fccc4a9cbb)
Here $\delta_{\mathrm{cert}}$ is the eligibility gap for the imported near-certainty claim. It is distinct from the joint-occurrence tolerance $\varepsilon_{\mathrm{cert}}$ below, and from the apparatus-channel resolution tolerance $\varepsilon_C$ of [Wavefunction Ontology](wavefunction-ontology.md), which is a different object. A valid observed-observer measurement model should satisfy
$$
\Delta_{\mathrm{cert}}^{ij}
\le
\varepsilon_{\mathrm{cert}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-410c32ed6f0c75ea)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-df2d7888fcd736a3)
for every $\ell\ne k$. Thus a physically imported near-certainty forces every conflicting direct-record probability to be small. A chain of imported certainties must apply this bound at each handoff and add the corresponding $\delta_{\mathrm{cert}}$ and $\varepsilon_{\mathrm{cert}}$ budgets; transitivity is not granted to a communication statement that failed its own record test. This is not a new probability postulate. It is the measurement-cut rejection applied recursively: if $O_i$ can physically record $O_j$'s certified conclusion, that imported record must be part of the same substrate flow as $O_i$'s direct prediction. If the communication record, reference resources, or record-autonomy test fails, the observed-observer setup is an incomplete measurement comparison rather than a contradiction in the ontology.

## Minimal Dynamical Model

Let $X(t)$ denote reduced coordinates for the measured subsystem and $A(t)$ the relevant apparatus coordinates. The measurement model must remain closed on the extended state already introduced above:
$$
\dot{\Gamma}_{\mathrm{tot}}
=
\left(\dot X,\dot A,\dot\Xi,\dot{\mathcal W}\right)
=
F_{\mathrm{tot}}(X,A,\Xi,\mathcal W)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-58609440dd56fd86)
where $\mathcal{W}$ denotes the local causal-wake background inherited from the apparatus, environment, and prior path history. The two-coordinate equations for $X$ and $A$ are projections of this flow; leaving $\Xi$ or $\mathcal W$ without an evolution law would not define the basins or first-crossing time used below.

Let the metastable branch boundary be defined by a separatrix
$$
\Sigma_{\mathcal K_A}(\Gamma_{\mathrm{tot}})=0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4b6de8c5da64ad8e)
The elapsed measurement duration and its corresponding chart instant are
$$
\tau_{\text{meas}}
=
\inf\left\{
\Delta t>0:
\Sigma_{\mathcal K_A}\!\left(\Gamma_{\mathrm{tot}}(t_0+\Delta t)\right)=0
\right\},
\qquad
t_{\mathrm{meas}}=t_0+\tau_{\mathrm{meas}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fd08080dd71de5df)

This is the ontology-level replacement for instantaneous collapse. The underlying substrate flow $\mathbb{U}_{\text{now}}(T)$ evolves continuously in absolute time $T$, so the reduced record-channel description it projects to crosses the separatrix continuously as well, even though the crossing may appear effectively abrupt to a coarse observer.

A Physical Observer may still be unable to resolve the crossing from the retained record. Let $\pi_O$ be the observer's access projection from the coupled measurement state to retained records, let $d_O$ be the induced record distance, and let $\epsilon_O$ be the declared record tolerance. For a branch basin $B_k$, the boundary is operationally unresolved for $O$ when

$$
d_O\!\left(
\pi_O\!\left(X(t),A(t),\mathcal{W}\right),
\pi_O(\partial B_k)
\right)
\le
\epsilon_O
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8e1b1ea72f3c9f5f)

This condition does not add a second ontology or a language-level vagueness postulate. It says only that the available record cannot decide the basin side. If the full measurement dynamics place $(X(t),A(t),\mathcal{W})$ inside or outside $B_k$, that fact remains substrate-level; a failure claim must instead show that the basin family or its boundary is absent, unstable under the declared coarse-graining, or not tied to the record channel.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dca880ae8e6ab9a7)
Here $N_{\mathcal{Q},W}$ is the recordable basin count from [Wavefunction Ontology](wavefunction-ontology.md#lower-bound-on-recordable-basin-measure), and $\Delta_{\mathrm{div}}$ is the restartability residual defined below for the same coarse-graining, access region, and record window.

The record time is later, and stricter:
$$
\tau_{\mathrm{rec}}
=
\inf\{\Delta t>\max(\tau_{\mathrm{split}},\tau_{\mathrm{meas}}):
\Delta_{\mathrm{rec}}(t_0+\Delta t;k)\le\varepsilon_{\mathrm{rec}},
\Delta_{\mathrm{div}}(t_0,t_0+\Delta t,t_W;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}\},
\qquad
t_{\mathrm{rec}}=t_0+\tau_{\mathrm{rec}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5bcb19d59f2bae24)
An admissible channel that uses a pre-record branch interval must report
$$
0\le
\tau_{\mathrm{split}}
\le
\tau_{\mathrm{meas}}
<
\tau_{\mathrm{rec}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-192c76520e93d8a1)
on the same initial-state and apparatus record. If the candidate split occurs only after the first separatrix crossing, it does not license a pre-crossing branch interval. The unresolved interval $\tau_{\mathrm{rec}}-\tau_{\mathrm{split}}$ is a validation target for a concrete apparatus model. It is not a new collapse law and not a substrate-level consciousness event. It names the window in which an effective wavefunction may need to carry multiple alternatives while the ontology still owes a finite-time persistent record.

Because this definition is windowed, it does not require a global decision procedure for every future trajectory question. The measurement claim is narrower: within a declared apparatus kernel, coarse-graining, access region, and record window, the coupled dynamics either reaches a recordable basin satisfying the residual tests or remains unresolved. Unbounded reachability questions for the same dynamical law belong to a separate theorem class and should not be treated as prerequisites for ordinary record formation.

### Basin-Update Equation

The standard projection rule can be retained as an effective update only after the physical record has already formed. Let $\mu_{0,\theta}$ be the preparation measure for a declared measurement channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$, and let
$$
\nu_{t_{\mathrm{rec}}}
=
\left(\Phi_{\tau_{\mathrm{rec}}}^{\mathrm{tot}}\right)_*\mu_{0,\theta}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3a0b9983b6f71b3d)
be the pushed-forward ensemble at the record time. If the completed record is the basin $B_k^{\mathrm{rec}}(\theta)$ and its measure is nonzero, then the native post-record update is conditionalization on the realized basin:
$$
\mu_{\theta,k}^{+}(B)
=
\frac{
\nu_{t_{\mathrm{rec}}}\!\left(B\cap B_k^{\mathrm{rec}}(\theta)\right)
}{
\nu_{t_{\mathrm{rec}}}\!\left(B_k^{\mathrm{rec}}(\theta)\right)
}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-650bdfa9bec118d9)
This is not a new stochastic law. It is the observer's effective ensemble after the deterministic apparatus-target flow has crossed the separatrix, locked the record, and passed the record-autonomy tests.

Let $\mathcal{E}_\theta$ denote the effective wavefunction extraction map for the same retained chart. The wavefunction update is then a derived description,
$$
\psi_\theta^{-}
=
\mathcal{E}_\theta(\nu_{t_{\mathrm{split}}}),
\qquad
\psi_{\theta,k}^{+}
=
\mathcal{E}_\theta(\mu_{\theta,k}^{+})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4774e10c49b2bb7b)
In subsystem language this is the measurement analogue of a conditional or effective wavefunction. If a total extracted state is written on a target-apparatus chart as $\Psi_{\mathrm{tot}}(x_S,y_A,t)$ and the apparatus record has entered the basin coordinate $Y_{A,k}$, the comparison update has the schematic form
$$
\psi_{S,k}^{\mathrm{cond}}(x_S,t)
=
\mathcal{N}_k
\Psi_{\mathrm{tot}}(x_S,Y_{A,k},t)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0e8100fa0baee3fe)
with normalization $\mathcal{N}_k$ fixed after the record exists. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not a primitive collapse event. It is the effective description extracted from the basin-conditioned measure $\mu_{\theta,k}^{+}$ after the apparatus has produced a persistent record.

For a non-degenerate operator benchmark with eigenstate $\phi_k$, the recovery target is
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-ebea67e6f30ccb61)
For a degenerate outcome $\lambda$, with projector $\Pi_\lambda$, the corresponding target is
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-01105a975c9db4d6)
whenever the denominator is nonzero. This equation is the measurement-basin version of the textbook projection rule: first the coupled physical system selects and records a basin, then the observer-level wavefunction is updated to the corresponding effective eigenspace.

Generalized measurements sharpen this requirement because the observer-level measurement record is not always projective. A calibrated record channel may be represented by a POVM $\{E_m\}$ with
$$
E_m=E_m^\dagger,\qquad E_m\ge0,\qquad \sum_m E_m=I
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6aefbf3189e0bbef)
and an instrument choice $\{M_m\}$ satisfying
$$
E_m=M_m^\dagger M_m,
\qquad
\sum_m M_m^\dagger M_m=I
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0dbbf1ee433657b8)
The comparison probabilities and conditional updates are
$$
p_m=\operatorname{Tr}(\rho E_m),
\qquad
\rho\mapsto\rho_m^+
=
\frac{M_m\rho M_m^\dagger}{p_m}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-86d193f13a693332)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b70e32d90ebeeac4)
This residual says that the operator summary is licensed by the apparatus record map; it is not a primitive property carried into the interaction.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5b730d4a402c75b9)
This is the measurement-channel version of the usual dilation result: a POVM can be represented as a projective measurement on a larger Hilbert space, but the native account must identify the physical apparatus, environment, and inaccessible degrees of freedom that realize that larger record space. Photon detection is the warning case. The record may use projective effects for "photon absent" and "photon present," while the instrument maps both outcomes to the no-photon post-record channel because the photon assembly has been absorbed into the apparatus/event ledger.

## What Makes an Interaction a Record

Not every separatrix crossing is a measurement record. A record requires stability and amplifiability.

Introduce a coarse record variable $R(A)$ extracted from apparatus state. A measurement record exists only if, after the transition,
$$
|R(A(t)) - R(A_{\text{pre}})| > R_*
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-64c10fd668a2344c)
for some readout threshold $R_*$, and if the new branch remains stable for a persistence time $T_{\text{rec}}$:
$$
\tau_{\text{persist}} > T_{\text{rec}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-edd88cc57a7006e4)

Environmental locking can be sharpened as an entropy diagnostic rather than left as a prose condition. For a declared coarse-graining $\mathcal{Q}$ and retained access region $W$, let
$$
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_{\text{meas}}+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_{\text{meas}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9ebe7131e95dd9b6)
measure the apparatus/environment entropy change associated with the candidate record channel. A strong record candidate should satisfy
$$
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}>0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-dbfa8b8c878e83f9)
with $S_{\mathrm{lock}}$ fixed by the apparatus class and readout channel. This is not a new collapse law. It is a closure check that the branch has exported enough unresolved apparatus/environment history that coherent reversal is no longer part of the retained measurement window.

A cyclic record channel also needs a reset-cost subgate. Let a memory-bearing apparatus have $N$ distinguishable retained record classes in the declared window, and let $\varepsilon_\mu$ bound the failure of the retained apparatus/environment flow to preserve the relevant measure during the reset comparison. Resetting those classes to one blank class is admissible only if the missing state count is exported into apparatus/environment entropy:
$$
\Delta S_{\mathrm{reset};\mathcal{Q},W}^{\mathrm{app+env}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-22365349396b7d5e)
For a non-uniform retained distribution, replace $k_B\log N$ by $-k_B\sum_i p_i\log p_i$. If the apparatus is not reset, the blank memory itself has been consumed as a finite physical resource and that depletion must appear in the event ledger. This reset test is a measurement-record closure condition, not a fundamental information ontology.

In plain terms, a record needs both:

- a macroscopically legible state change,
- and enough environmental locking that the branch does not immediately recohere.

This is why a microscopic interaction is not automatically a measurement, while a detector avalanche, pointer shift, bubble track, or durable bit-flip is.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-80271d376cc45d27)
The candidate record is autonomous on the persistence window only if
$$
\sup_{t\in[t_{\text{meas}},\,t_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}},
\qquad
\varepsilon_{\mathrm{rec}}\ll 1
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-640855e605b01fdf)
If $\Delta_{\mathrm{rec}}=O(1)$ on that window, the apparatus has not yet produced an independent record in the ontology of this chapter. The correct description is still an unresolved interference or weak-probe regime, not a completed branch selection.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b19365e89624e8e3)
The restartability closure condition is
$$
\sup_{t_1,t_2\in[t_{\text{meas}},\,t_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)
\le
\varepsilon_{\mathrm{div}},
\qquad
\varepsilon_{\mathrm{div}}\ll 1
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-920b7fc4aac588a5)
This condition says that, after record formation, the retained apparatus-target record can be treated as a new effective starting point without carrying unresolved cross-basin history as live interference. If $\Delta_{\mathrm{div}}=O(1)$, the interaction may have decohered in a reduced description, but it has not yet supplied the independent record assumed by a wave function transition.

A candidate record must also close the same event bookkeeping that the measurement claims to expose. For a declared channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T_W)$ and candidate outcome event $\mathsf e_k$, define the record indicator
$$
\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)
=
\mathbf{1}\!\left[
\begin{array}{l}
\tau_{\text{meas}}(B_k)<\infty,\quad
\sup_{t\in[t_{\text{meas}},\,t_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)\le\varepsilon_{\mathrm{rec}},\\
\sup_{t_1,t_2\in[t_{\text{meas}},\,t_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},\\
\Delta S_{\mathrm{lock};\mathcal{Q},W}^{\mathrm{app+env}}(\gamma)\ge S_{\mathrm{lock}},\quad
\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e_k)\|\le\varepsilon_{\mathrm{evt}},\quad
|\Delta E_{\mathrm{unrec}}(T_W;\theta,k)|\le\varepsilon_E
\end{array}
\right]
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-150d653a571ab984)
Here $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger for energy, momentum, and angular momentum, while $\Delta E_{\mathrm{unrec}}$ is the unrecorded energy residual used in the [Measurement and Heating Residual](#measurement-and-heating-residual). This filter prevents a mere correlation, weak probe, or formal branch label from being counted as a measurement outcome before it has supplied a persistent record, closed the event ledger, and kept unrecorded energy below tolerance.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-07f6452804dd0398)
for the declared record map $\pi$ and model record $\theta$, with the denominator required to be nonzero on the completed measurement channel. This $P_\theta(k)$ is the same eligible-record-normalized weight introduced as $p_k^{\mathrm{rec}}(\theta)$ above; the concrete state-dependent record indicator realizes the abstract eligibility event $\mathsf R_\theta^{-1}(1)$. A compact confirmation residual is
$$
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta)
=
\max_k
\frac{\left|\widehat f_k-P_\theta(k)\right|}{\varepsilon_k(N)}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3311faa04dfc3925)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-80576fe9b8ee42c9)
in the calibrated repeated-record regime. Here $\mathbb P_{\theta,N}=\mu_{*,T_W}^{\otimes N}$ only for independently prepared record cycles. A correlated apparatus cycle must instead supply its own $N$-record joint measure from the declared return map. This is not a new probability ontology. It is the ordinary scientific-inference burden stated in measurement language: the same substrate flow, record channel, and basin measure that produce a completed record must also produce the frequencies used to test the theory. If a model changes the measure between record formation, Born weights, thermodynamic summaries, and repeated-record statistics, it has hidden an ensemble retuning inside the measurement account.

The tolerance and confidence sequences must be coupled. In the independent-trial comparison with $K$ record classes, one admissible Hoeffding calibration is
$$
\alpha_N=N^{-2},
\qquad
\varepsilon_k(N)
=
\sqrt{\frac{\log(2K/\alpha_N)}{2N}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4ed911d524218e16)
so both sequences vanish and the tolerance has the expected square-root sampling scale, with the logarithmic factor required by the shrinking failure probability. Correlated record cycles must replace $N$ by a declared effective sample size derived from the same apparatus return map; writing $\varepsilon_k(N)\sim N^{-1/2}$ while separately sending $\alpha_N\to0$ is not sufficient unless that coupling is supplied.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1c3f303ba650ba3a)
Here the Born-window and thermodynamic-ensemble terms are the residuals defined in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence), while the energy term is the event-ledger residual used below. A completed measurement account requires $\mathcal{R}_{\mathrm{same}}\le1$ on the same retained window. Otherwise the model has fit several observer-level summaries with different hidden ensembles rather than deriving one record-forming channel.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-b051aef61226b0a2)
The survival probability after $N$ completed records is
$$
P_{\mathrm{surv}}(N,t)
=
\prod_{j=1}^{N}q_j
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-51b67a9fae66615b)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f505e4d6fea871a6)
Along nested grid refinements the intersection can only shrink. Pure conditionalization of one fixed deterministic flow therefore cannot create the quantum-Zeno limit; it can only remove histories that escaped between probes.

The probe must instead change the flow. Let $\mathcal M_{\delta t}$ be the physical probe-and-reset map and replace the free step by $\Psi_{\delta t}=\mathcal M_{\delta t}\circ\Phi_{\delta t}$. The decidable short-time criterion is
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e75851d7c13b9368)
for the post-probe conditioned density $\rho_j^+$. The positive outward flux is required; a signed net flux could vanish by cancellation while survival still leaks. A Zeno-class apparatus must derive $\sup_j\kappa_j\to0$ and a uniform quadratic loss as $\delta t\to0$. An anti-Zeno regime occurs when probe back-action increases the effective escape coefficient or separatrix access relative to the unprobed channel. The Master-Equation apparatus model must therefore derive the rate-dependent map $\mathcal M_{\delta t}$, the record basin, the back-action, and the spacing dependence.

Repeated multi-spin projections have experimentally produced quantum-Zeno subspaces and a measured projection-number scaling law in a diamond platform ([Kalb et al. 2016](https://doi.org/10.1038/ncomms13111)). This is an observer-level benchmark for the record-channel calculation, not evidence that projection is a substrate axiom.

## Weak-Probe Limit

A weak measurement is not a different ontology. It is the small-coupling regime of the same apparatus-target dynamics in which a probe samples the target without creating a record-forming separatrix crossing on the retained trial window. Let $\epsilon$ denote the probe-coupling strength and let $(X_\epsilon,A_\epsilon)$ be the coupled trajectory under that probe. The no-record condition is
$$
|R(A_\epsilon(t_1))-R(A_{\text{pre}})|\le R_*,
\qquad
\tau_{\text{meas}}^{(\epsilon)}>t_1-t_0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5f11efdb69a7958d)
where
$$
\tau_{\text{meas}}^{(\epsilon)}
=
\inf\{\Delta t>0:
\Sigma_{\mathcal K_A}(\Gamma_{\mathrm{tot},\epsilon}(t_0+\Delta t))=0\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9b1b6ae5a482bbe4)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-23063657b7ead4a7)
The signal is therefore statistical: many similarly prepared trials can expose the weak channel even though no single trial has generated a durable record of the target variable.

Post-selection does not add future causation. It is ordinary conditioning on a later record-forming event. If $\mathcal{R}_f$ is the accepted later record class, let $\mu_0$ be the preparation measure and let $\Phi^{\mathrm{tot}}_{t-t_0}$ be the coupled substrate flow for the same target, apparatus, environment, and causal-wake variables used by the record channel. The physical evolution is the pushforward
$$
\mu_t
=
(\Phi^{\mathrm{tot}}_{t-t_0})_*\mu_0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-aac68c6730e2eec3)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-32bb9edf1e083ece)
where $\pi$ is the declared record map for the later apparatus channel. This conditional measure can sharpen which weak-probe displacements are averaged, but all substrate evolution still runs forward in absolute time. The closure target is to derive the weak-probe response and its post-selected statistics from the same deterministic flow, separatrix geometry, and record criterion used for ordinary measurements.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-932c8bba60fa819a)
If standard weak-value analysis predicts a signed displacement, $\mathbb{A}\mathbb{A}\mathbb{A}$ must recover that sign and magnitude as a conditional average over below-threshold probe trajectories:
$$
\left|
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathrm{QM}}
\right|
\le
\varepsilon_Y
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-84a08b2011d3428c)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-202c72511afb4e99)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f36c548b9abecaf3)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-fc6c64e3ee41eb2e)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-140de5aecab6b09e)
be the record map from the coupled target-apparatus-environment state to the retained record classes. A claimed observable label $O$ is admissible in this chapter only after it has been represented by a family of record basins
$$
B_k^{O,\mathcal{K}_A}
=
\pi_{\mathcal{K}_A}^{-1}(R_k)
\cap
\{\gamma:\mathbf{1}_{\mathrm{rec}}(\gamma;k,\theta)=1\}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-193215dbfaee7a79)
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

The Stern-Gerlach-like specialization is developed in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response). In that channel, the apparatus potential-gradient geometry couples to the full Noether braid spin ledger, including layer phases, frequencies, active causal-root branches, self-hit history, and causal-wake angular momentum. The two recorded outcomes are basin resolutions after a finite interaction time. The derived kernels are deterministic pullbacks of the record-forming basins. In the reduced spinor-record chart, the concrete separatrix and unbiased record-phase measure supply the comparison target for spin-$\tfrac{1}{2}$ half-angle probabilities. The Master-Equation origin of the external apparatus terms is explicit: the angular impulse is the braid-centered torque of delayed apparatus cross-root hits, and the record-phase measure is the invariant measure of the locked apparatus record cycle. The remaining substrate closure target is to derive the effective spinor coordinate and verify when the record cycle and apparatus impulse reduce to the ideal chart.

For an apparatus axis $\hat{\mathbf m}$, the two recorded channels are the record-forming basins $B_{\pm}(\hat{\mathbf m})$ whose deterministic first-order kernels $K_{\pm}^{\mathrm{SG}}(\hat{\mathbf m};Z_{\mathrm{in}})=G_{\mathrm{rec}}(Z_{\mathrm{in}})\,H\!\left(\pm\mathcal Q_{\hat{\mathbf m}}(Z_{\mathrm{in}})\right)$ and observer-level probabilities $P_{\pm}(\hat{\mathbf m})=\int K_{\pm}^{\mathrm{SG}}\,d\mu_*$ are derived in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response); there $G_{\mathrm{rec}}$ is the successful-record gate, $\mathcal Q_{\hat{\mathbf m}}$ is the signed response functional at the end of the interaction window, and $\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}$ is the finite interaction map. The measurement ontology imports those kernels and adds the two acceptance gates the pair must pass before it is read as a spin measurement; it does not re-derive them.

The kernel identity already shows that the two derived channels exhaust successful records away from the first-order separatrix. It is not an independent acceptance gate. The non-vacuous record-efficiency gate compares the derived heralding efficiency with a calibration measured independently of the model:
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1cefe0676f86223c)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-8d471f9920ac21c0)
with $P_{+}+P_{-}>0$. The conditional plus-channel probability is averaged over the incoming measure in the invariant-measure record coordinate $u_{\hat{\mathbf m}}(\theta_{\mathrm{rec}})=\int_0^{\theta_{\mathrm{rec}}}\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(s)\,ds$ of the locked apparatus record cycle, not the raw phase $\theta_{\mathrm{rec}}/(2\pi)$ (which is only the calibrated constant-phase-speed limit). The effective spinor coordinate and the record-cycle density $\rho_{\hat{\mathbf m}}^{\mathrm{rec}}$ are supplied by the same ordered-frame derivation, so this residual imports them rather than re-deriving them.

This is a single-assembly measurement statement. Bell-pair response and photon-polarization correlations additionally require the pair-provenance ledger and photon Gate B; they should not be treated as closed by the measurement ontology alone.

The important point is that the ontology never changes: different observables correspond to different coarse coordinates and different apparatus couplings, not different laws of collapse.

### Interaction-Free Measurement Benchmark

Elitzur-Vaidman/Kwiat interaction-free measurement is a required stress test because a detector can record the presence of an object even on retained trials in which the probe is not absorbed by that object. The standard experimental benchmark is the single-photon interferometer demonstrated by [Kwiat et al. (1995)](https://doi.org/10.1103/PhysRevLett.74.4763). For $\mathbb{A}\mathbb{A}\mathbb{A}$, the admissible record classes must include at least detected-object, absorbed, and inconclusive outcomes, all derived from one photon-apparatus-object flow and one event ledger.

The quantitative comparison targets are the ideal single-pass success probability
$$
\eta_{\mathrm{IFM}}^{(1)}=\frac{1}{4}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f0c8086c13d6c685)
and, for an ideal $N$-stage Zeno-chained interferometer,
$$
\eta_{\mathrm{IFM}}^{(N)}
=
\cos^{2N}\!\left(\frac{\pi}{2N}\right)
\longrightarrow 1
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-c6e1bb6e33b761a0)
subject to the apparatus losses, visibility, and record-class convention declared for the experimental realization.

The native account may use the probe's unresolved causal-wake and apparatus history across the full interferometer even when the localized probe assembly is recorded in the unblocked output channel. That possibility is a mechanism target, not a completed explanation. Closure requires the declared apparatus kernel to reproduce the interaction-free success probability and visibility while the retained detected-object trials show no absorption or target-transit event, and while the photon Gate A/B/C and source-depletion/recoil ledgers remain closed. A statement that "the wake sampled the blocked arm" is not enough without that record and energy accounting.

## Born-Rule Interface

This chapter does not derive the Born rule by itself. It fixes the ontology that the Born-rule derivation must sit on.

The closure target is that basin weights induced by the deterministic flow reproduce the usual outcome weights:
$$
P_k = \mu_*(B_k)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-1685da9dd6809d0d)
with $B_k$ the record-forming attractor basins that satisfy the record, persistence, and event-ledger tests above, and $\mu_*$ the relevant invariant or coarse-grained measure. When the channel includes candidate branches that do not yet pass those tests, the normalized record probability is the filtered quantity $P_\theta(k)$ rather than a weight assigned to every formal branch label.

Born-rule statements must also stay at the preparation-to-record level. In a destructive channel, a formal comparison state need not survive as an outstate after the apparatus interaction. Photon absorption by a polarizer is the standard example: the admissible question is the probability that the declared preparation is routed into a record class such as transmitted, absorbed, or scattered by the apparatus kernel. The post-measurement state catalog is a later record update, not the object whose existence supplies the Born weight.

Probability is therefore not a property of a formal state label by itself. It is the record-facing weight produced when preparation, apparatus coupling, retained path-history, and coarse-grained dynamics route a system into a durable record class.

The measurement ontology therefore connects directly to the basin-measure program in [wavefunction-ontology.md](./wavefunction-ontology.md) and the separatrix-time program in [superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md).

This also fixes how external probability geometries should be used. A comparison framework may assign a natural measure to a space of possible configurations or records, but that measure is not automatically the Born rule. In this chapter, a candidate record map $\pi:\Gamma_{\eta,h}\to\mathcal{R}$ is admissible only if the probabilities are pulled forward from the same deterministic flow that creates the apparatus record:
$$
P(R_k)=\mu_*\!\left(\pi^{-1}(R_k)\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5678e98a1e754406)
The source of $\mu_*$ is therefore part of the measurement closure, not an optional interpretive add-on.

The load-bearing step is measure selection, not the indicator identity. Let $\nu_{\mathrm{prep}}$ be the preparation-limited unresolved-history measure, and let
$$
\nu_{\mathcal Q,W,t}
=
(\Pi_{\mathcal Q,W})_*
(\Phi_{t_0\to t}^{\mathrm{tot}})_*
\nu_{\mathrm{prep}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f1e9bc199f4814e9)
be its deterministic pushforward into the retained chart. A basin law is predictive only if a declared selection principle — for example a unique physical/SRB measure, a zero-noise limit, or unique ergodicity of a material return map — selects one $\mu_*$ for the admissible preparation class. It must also supply the equidistribution step
$$
\frac{1}{N}
\sum_{n=0}^{N-1}
\mathbf 1_{B_i}(\mathcal F_{\mathrm{ret}}^n\gamma)
\longrightarrow
\mu_*(B_i)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-959a1ace5e405d7e)
for preparation-almost-every retained state $\gamma$, where $\mathcal F_{\mathrm{ret}}$ is the declared material return map, or a finite-window error bound that plays the same role. Only after those two obligations are met does
$$
p_i
=
\int_{\Gamma_{\eta,h}}\mathbf{1}_{B_i}\,d\mu_*
=
\mu_*(B_i)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f1153a8f230c56c7)
up to the metastability, leakage, escape, and coarse-state errors declared for that same finite window. A weight assignment that is not this basin measure introduces an untracked kernel between the substrate flow and the recorded outcome.

Finite record resolution can export a probability interval before it exports a point probability. Let a finite partition $\mathcal{P}_N=\{C_a\}$ cover the retained history chart $\Gamma_{\eta,h}$ for the same setup $\theta$, and let
$$
E_k(\theta)
=
\pi^{-1}(R_k)\cap\mathsf R_\theta^{-1}(1)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-25d0bbb79bf32871)
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-bc539d6e63d1e054)
The Born-rule closure target is not merely to name a formal projector, but to show that the finite-window width
$$
\Delta p_{k,N}=p_{k,N}^+-p_{k,N}^-
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9cbf7ae57bd60068)
falls below apparatus tolerance while the calibrated central value matches the Born weight. Low-amplitude or unresolved branch labels that remain inside the boundary cells of this finite partition do not yet count as independent record probabilities; they remain unresolved measure until the apparatus channel and record partition separate them.

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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4273fd356f135273)
and a corresponding lifetime estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-f7488e6af04de800)

The layer-explicit effective-metric comparison replaces the displayed integration variables by $x_{\mathrm{eff}}^i$ and $y_{\mathrm{eff}}^i$ and computes the mass-density histories from the declared branch projection before interpreting $\Delta E_G$.

$\mathbb{A}\mathbb{A}\mathbb{A}$ does not adopt fundamental gravitational collapse or a stochastic metric. The benchmark is useful because large-mass interferometry and Bose-Einstein-condensate proposals ask whether spatial superpositions involving roughly $10^9$ to $10^{10}$ atoms remain coherent long enough to distinguish ordinary environmental decoherence, finite-time threshold resolution, and any gravity-driven collapse model. For this chapter, the comparison target is therefore not to derive $\tau_G$ as an ontological law, but to show that the $\mathbb{A}\mathbb{A}\mathbb{A}$ separatrix-time estimate for massive-superposition records remains quantitatively distinguishable from, or explicitly bounded against, the Penrose-Diosi scale.

The useful variable is mass displacement, not system size by itself. A many-degree system that leaves nearly the same mass density in each branch is a weaker test than a smaller system whose alternative branches separate appreciable mass density. For a proposed apparatus-target model, record the comparison ratio
$$
\mathcal{R}_{\mathrm{PD}}
=
\frac{\tau_{\text{meas}}}{\tau_G}
=
\frac{\tau_{\text{meas}}\Delta E_G}{\hbar}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-e0eeb26c9198651a)
This ratio is not an ontology selector. It is a validation diagnostic: $\tau_{\text{meas}}$ must be derived from the Master-Equation separatrix and record-locking dynamics, while $\tau_G$ supplies an external mass-displacement benchmark. Collapse-model variants that imply persistent spontaneous heating add a separate empirical pressure, because neutron-star and low-background heating bounds can exclude that heating channel without deciding the $\mathbb{A}\mathbb{A}\mathbb{A}$ threshold-resolution mechanism.

### Measurement and Heating Residual

The heating pressure from objective-collapse comparisons should be retained as an energy-ledger test, not as imported stochastic-collapse ontology. A declared apparatus channel $(\mathcal{K}_A,\mathcal{Q},W,T_W)$ already has a Born-window residual $\Delta_{\mathrm{Born}}(T_W)$ and thermodynamic ensemble residual $\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)$ in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence). The same run should also carry an unrecorded energy residual after declared work, recoil, emitted assemblies, medium excitation, and boundary exchange are accounted for:
$$
\Delta E_{\mathrm{unrec}}(T_W;\theta)
=
\Delta E_{\mathrm{target+app+env}}(T_W)
{}-W_{\mathrm{decl}}(T_W;\theta)
{}-E_{\mathrm{recoil}}(T_W;\theta)
{}-E_{\mathrm{medium}}(T_W;\theta)
{}-E_{\mathrm{boundary}}(T_W;\theta)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-3bf8b7dd9ded3c6b)
Here $\theta$ is the apparatus and environment record used for the same measurement run. The combined validation diagnostic is
$$
\mathcal{R}_{\mathrm{meas+heat}}(T_W;\theta)
=
\max\left(
\frac{\Delta_{\mathrm{Born}}(T_W)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T_W)}{\varepsilon_{\mathrm{ens}}},
\frac{|\Delta E_{\mathrm{unrec}}(T_W;\theta)|}{\varepsilon_E}
\right)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-48b93873d06f1bcf)
A measurement model that fits Born weights only by changing the thermodynamic ensemble, or that leaves a persistent unexplained heating term, has not closed the record-forming channel. A model may still compare to CSL-like or Penrose-Diosi-like formulas, but the retained content is the observable residual, not the external collapse mechanism.

## External Gravitational Which-Path Benchmark

Massive-superposition tests also create a second external benchmark: whether the gravitational or effective-metric readout of two branches can carry which-path information. This comparison preserves the observable pressure without adopting a stochastic-metric ontology. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the effective metric is an observer-level reconstruction, so a gravitational readout becomes measurement-relevant only when a Physical Observer apparatus can turn the branch-dependent response into an autonomous record.

Let $\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ be two alternative branch-level mass-density histories, and let $s_A(t_{\mathrm{eff}};\rho_k,\theta)$ denote the detector signal channel $A$ predicted by the same effective-metric constitutive record $\theta$ for branch $k$. Define
$$
\Delta s_A(t_{\mathrm{eff}})
=
s_A(t_{\mathrm{eff}};\rho_1,\theta)-s_A(t_{\mathrm{eff}};\rho_2,\theta)
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-4b1e33cc2e330467)
If $N_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')$ is the covariance of unresolved detector, environmental, and boundary-wake contributions over the coherence window $T_W$, the gravitational distinguishability diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}\!\!\int_0^{T_W}
\Delta s_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')\,
\Delta s_B(t_{\mathrm{eff}}')\,dt_{\mathrm{eff}}\,dt_{\mathrm{eff}}'
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-09d074ff8fe774a5)

The comparison criterion is:
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)\le\varepsilon_{\mathrm{wp}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9d5387e3f626c402)
for an interference-preserving branch pair, unless the apparatus-target dynamics explicitly show a record-forming separatrix crossing with finite $\tau_{\text{meas}}$ and a persistent record variable. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while the interference pattern remains intact and no record-autonomy condition is satisfied, the proposed effective-metric response has overproduced observable which-path information.

The covariance $N_{AB}$ is not an ontological randomness postulate in this chapter. It must be derived, or bounded, from unresolved deterministic boundary data, local Noether sea state, detector calibration residuals, and ordinary environmental channels. This keeps the useful lesson from classical-quantum gravity comparisons while preserving the native claim that branch selection is finite-time assembly dynamics rather than fundamental metric collapse.

### Minimal Massive-Branch Toy Model

A first calculation can be posed without choosing a full collapse interpretation. Let a target mass $M$ have two branch-level center histories
$$
x_{\pm,\mathrm{eff}}^i(t_{\mathrm{eff}})
=
x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})\pm\frac{1}{2}d_{\mathrm{eff}}^i(t_{\mathrm{eff}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-69b5f61929f8c109)
with branch densities
$$
\rho_{\pm}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
M\,\delta_{\eta}\!\left(x_{\mathrm{eff}}^i-x_{\pm,\mathrm{eff}}^i(t_{\mathrm{eff}})\right)
+
\rho_{\mathrm{app}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-5f0d0a2b62d184de)
where $\rho_{\mathrm{app}}$ is the shared apparatus and environmental mass density. For a differential gravity readout channel $A$, define
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-9f0932f3b1b5de50)
where $y_{A,\mathrm{eff}}^i$ and $y_{0,\mathrm{eff}}^i$ are detector reference points, $e_A^i$ is the channel projection, and $a_i^{\mathrm{eff}}$ is the effective metric or weak-field acceleration readout derived from the same constitutive record $\theta$ used in the spacetime chapters.

In the weak, slowly varying limit, the branch difference has the schematic tidal form
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

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-0aab7090391b5ffe)
with
$$
D_{ij}(R_{\mathrm{eff}}^i)
=
\frac{3R_{\mathrm{eff},i}R_{\mathrm{eff},j}-\|R_{\mathrm{eff}}^i\|^2 \gamma_{ij}^{\mathrm{eff}}}{\|R_{\mathrm{eff}}^i\|^5}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-606e461dfb8a3794)
where $\gamma_{ij}^{\mathrm{eff}}$ is the effective spatial metric of the declared observer chart and reduces to $\delta_{ij}$ in the flat weak-response limit used by this toy model. If the unresolved readout noise is approximately stationary over the coherence window, $N_{AB}(t_{\mathrm{eff}},t_{\mathrm{eff}}')=S_{AB}\delta(t_{\mathrm{eff}}-t_{\mathrm{eff}}')$, then
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\simeq
\int_0^{T_W}
\Delta s_A(t_{\mathrm{eff}})\,
S^{-1}_{AB}\,
\Delta s_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-72bafc1f86965ce7)

This toy model turns the benchmark into a simulation target. The required inputs are $M$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})$, detector geometry $(y_{A,\mathrm{eff}}^i,y_{0,\mathrm{eff}}^i,e_A)$, noise matrix $S_{AB}$, coherence time $T_W$, and the constitutive weak-field map in $\theta$. An interference-preserving run passes the gravitational which-path gate only if $\mathcal{D}_{\mathrm{grav}}(T_W;\theta)\le\varepsilon_{\mathrm{wp}}$ or if the same apparatus model derives a record-forming separatrix crossing with a persistent record variable.

The observer-level covariance decomposition is owned by [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). The concrete validation scaffold is [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md).

## Closure Targets

For this chapter to count as closed, the repo still needs:

1. one explicit Master-Equation apparatus-target toy model that evaluates the branch-sum impulse and record-cycle phase density,
2. one explicit record variable $R(A)$ and persistence criterion,
3. one derived estimate of finite collapse time $\tau_{\text{meas}}$, including a massive-superposition comparison against the external Penrose-Diosi scale $\tau_G$,
4. one gravitational which-path distinguishability calculation $\mathcal{D}_{\mathrm{grav}}$ for a massive-superposition apparatus, following the [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md),
5. one bridge from basin weights to observed frequencies.

This chapter fixes the ontology and interface. The remaining work is derivational, not definitional.

## Falsification Gate

The ontology fails if any of the following occur:

- a genuine measurement record can be shown to form without any finite-time physical branch-selection process,
- the same apparatus can produce reproducible outcomes while no durable apparatus/environment asymmetry is created,
- or, for an apparatus class with a derived lower bound $\tau_{\mathrm{meas}}\ge\tau_{\min}>0$, experiment establishes an upper bound $\tau_{\mathrm{meas}}\le\tau_{\max}<\tau_{\min}$.

Equivalently, the theory requires
$$
\tau_{\text{meas}} > 0
$$

[Explore this equation in Equation Mapping](../../../../equation-mapping.html#corpus-equation-6f5144aaa8420307)
for real record-forming interactions, even if that time becomes extremely short in ordinary laboratory practice.

The last comparison is the operator-checkable form of the finite-time claim. No finite-resolution experiment is required to establish an exactly zero duration; the model must instead expose a positive lower bound that a tighter experimental upper bound can contradict.

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
