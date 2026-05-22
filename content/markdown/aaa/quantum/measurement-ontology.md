# Measurement Ontology

## Purpose and Scope

This chapter fixes what a measurement event is in $\mathbb{A}\mathbb{A}\mathbb{A}$ at the ontological level. It is narrower than the full Born-rule program. The aim is to state the minimum physical architecture:

- what counts as the system,
- what counts as the apparatus,
- what turns an interaction into a record,
- and what the theory must reproduce to match ordinary quantum measurement practice.

## Core Claim

Measurement is not a primitive axiom and not a special observer intervention. It is a physical interaction between assemblies that drives a metastable target across a separatrix and then locks the resulting branch into a persistent macroscopic record.

The ontology is therefore:

- **system:** an assembly or coupled assembly-subsystem with reduced state $X$,
- **apparatus:** another assembly network engineered so that its wake structure couples strongly to a chosen coordinate of $X$,
- **environment:** the surrounding Noether Sea plus uncontrolled apparatus degrees of freedom,
- **measurement outcome:** the attractor basin into which the coupled system settles,
- **record:** a durable asymmetry in apparatus/environment variables that can be re-read without reconstructing the original metastable state.

The apparatus configuration is part of the record channel, not external decoration. In a concrete detector model, the geometry, coupling settings, thresholds, and readout coarse-graining are collected into an apparatus record kernel $\mathcal{K}_A$, so the separatrix and record variable are really $\Sigma_{\mathcal{K}_A}(X,A)=0$ and $R_{\mathcal{K}_A}(A)$. The unindexed $\Sigma$ and $R$ below are shorthand after the channel is fixed. This does not make the observer a creator of the target state; it means that a record is a coupled system-apparatus event with declared physical coupling.

## No Heisenberg Cut

The ontology rejects a fundamental system-observer split.

At the substrate level there are only:

- architrinos with definite positions and velocities in absolute time,
- their causal wakes,
- and the assemblies built from those constituents.

What standard quantum mechanics calls a "measurement" is therefore just a special regime of assembly-assembly coupling with three features:

1. strong targeted perturbation of a metastable degree of freedom,
2. amplification into many apparatus degrees of freedom,
3. dissipation into the surrounding Noether Sea so that coherent reversal becomes practically inaccessible.

This also sets the comparison boundary for path-integral and generalized-quantum-mechanics language. A history-sum formalism can reproduce ordinary pointer-record probabilities and may assign measures to microscopic event statements, but those measures are not automatically $\mathbb{A}\mathbb{A}\mathbb{A}$ records. The native question remains whether the apparatus-target dynamics below produce a separatrix crossing, a durable record variable, and a persistence window without invoking an external classical observer.

Expectation values, covariance matrices, correlation functions, and decoherence rates obey the same rule. They are legitimate observer-level summaries only after the target, apparatus, environment, access region, and record channel have been declared. In closed-system, cosmology, or quantum-gravity comparisons, an averaged quantity is therefore not automatically a statement about what the substrate is doing; it is a data product that must be tied back to $\Gamma_{\mathrm{tot}}$, the retained boundary data, and the record criteria below.

The same discipline applies to ordinary measurement-rule language. A statement such as "measure an observable and obtain outcome $k$ with probability $p_k$" is not yet a substrate closure. It must be unpacked into a declared record packet
$$
(\mathcal{K}_A,\mathcal{Q},W,T,\{R_k\},\mu_{*,T})
$$
whose apparatus kernel, coarse-graining, access region, record window, record classes, and finite-time basin measure all belong to the same coupled flow. The observer-level probability is then a record statistic,
$$
p_k(\theta)
=
\mu_{*,T}\!\left(\pi^{-1}(R_k)\right),
$$
not an extra rule assigned after the dynamics. This keeps the empirical measurement formalism intact while forcing the words "measurement," "outcome," and "probability" to earn a physical record channel.

### Transfer-Operator Measure Contract

The record packet above is a finite-window object. Let $\mathcal{H}_{\eta,h}(t)$ denote the retained causal-wake and branch-ledger history at resolution $\eta$ and memory depth $h$, and let the declared coarse state space be
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
U.
$$
The coarse-state map is
$$
C_{\eta,h}:
\left(
\mathbb{U}_{\mathrm{now}}(t),
\mathcal{H}_{\eta,h}(t)
\right)
\longrightarrow
\Gamma_{\eta,h},
$$
where $\mathbb{U}_{\mathrm{now}}(t)$ is the instantaneous substrate state retained by the model and $U$ records declared apparatus controls or settings.

The measurement transfer operator is first a deterministic pushforward of the retained flow,
$$
\mathcal{T}_{\Delta t}\rho
=
\left(
\Phi_{\Delta t}^{u,\mathcal{H},\mathcal{W}_{\mathrm{sea}}}
\right)_*\rho.
$$
A reduced Markov kernel is a later compression of this pushforward, not an assumed Born kernel. It is licensed only after unresolved variables receive an explicit occupation measure from a material return map, a record cycle, or the Noether-Sea context used by the same apparatus channel. Otherwise the probability rule has been inserted at the cut rather than derived from the record-forming flow.

The rejection of the cut can be stated as a closure condition on the dynamics. Let
$$
\Gamma_{\mathrm{tot}}(t)=(X(t),A(t),Z(t),\mathcal{W}(t))
$$
collect the target coordinates $X$, apparatus coordinates $A$, retained environment coordinates $Z$, and causal-wake history $\mathcal{W}$. A valid measurement model must be the projection of one substrate flow,
$$
\dot{\Gamma}_{\mathrm{tot}}
=
F_{\mathrm{tot}}(\Gamma_{\mathrm{tot}}),
\qquad
\pi_{XA}\Phi_t^{\mathrm{tot}}(\Gamma_0)=(X(t),A(t)),
$$
not a splice between quantum dynamics on the target side and a separate classical-observer dynamics on the apparatus side. A human observer, laboratory notebook, or downstream database is therefore another possible record-bearing assembly, not an ontologically privileged endpoint of the measurement.

When the environment is compressed to an open-system map, the compression must declare its memory assumption. A standard trace-preserving completely positive comparison map has Kraus form
$$
\rho\mapsto\mathcal{L}[\rho]
=
\sum_m M_m\rho M_m^\dagger,
\qquad
\sum_m M_m^\dagger M_m=I.
$$
A differential Lindblad comparison is admissible only after the environment correlation time $\tau_{\mathrm{env}}$ is short compared with the retained record window. In that regime the benchmark generator has the form
$$
\partial_t\rho
=
-\frac{i}{\hbar}[H,\rho]
+
\sum_m
\left(
L_m\rho L_m^\dagger
-
\frac{1}{2}L_m^\dagger L_m\rho
-
\frac{1}{2}\rho L_m^\dagger L_m
\right).
$$
The native residual is a memory check, not a demand that the substrate be Markovian:
$$
\mathcal{R}_{\mathrm{open}}(\theta)
=
\max\left(
\frac{\tau_{\mathrm{env}}}{T_{\mathrm{rec}}},
\frac{\left\|\mathcal{T}_{t_0\to t_2}^{\mathcal{Q}}-\mathcal{T}_{t_1\to t_2}^{\mathcal{Q}}\mathcal{T}_{t_0\to t_1}^{\mathcal{Q}}\right\|_{\mathrm{TV}\to\mathrm{TV}}}{\varepsilon_{\mathrm{div}}},
\frac{\left\|\partial_t\rho_{\mathrm{rec}}-\mathcal{L}_{\mathrm{Lind}}[\rho_{\mathrm{rec}}]\right\|}{\varepsilon_L}
\right)
\le 1.
$$
If the first two terms are large, a Kraus or Lindblad description may remain a useful short-time fit, but it has not earned a restartable measurement state. This matches the $\mathbb{A}\mathbb{A}\mathbb{A}$ distinction between a completed record and a reduced description that has discarded live path-history memory.

## Physical-Record Import Consistency

The same rule applies when one Physical Observer records another Physical Observer's conclusion. A statement such as "observer $O_j$ is certain that record $R_k$ will occur" is not free-standing knowledge. For observer $O_i$, it is a physical communication or memory record inside $O_i$'s retained apparatus and access region. Let $C_{j\to i,k}$ denote that imported-certainty record in the declared channel for $O_i$, and let $\theta_i$ be the corresponding observer model record. With the same finite-time basin measure used for the measurement channel, write
$$
p_i(\ell|\theta_i)
=
\mu_{*,T}^{(i)}\!\left(\pi_i^{-1}(R_\ell)\right),
\qquad
c_{i\leftarrow j}(k|\theta_i)
=
\mu_{*,T}^{(i)}\!\left(\pi_i^{-1}(C_{j\to i,k})\right).
$$
Here $p_i$ is $O_i$'s direct record probability for outcome $R_\ell$, while $c_{i\leftarrow j}$ is the probability that $O_i$ has a valid physical record of $O_j$'s certified conclusion. For mutually exclusive record classes $R_k\cap R_\ell=\varnothing$, define a certainty-threshold residual
$$
\Delta_{\mathrm{cert}}^{ij}
=
\max_{k\ne \ell}
\left[
c_{i\leftarrow j}(k|\theta_i)
+
p_i(\ell|\theta_i)
-
2(1-\epsilon_C)
\right]_+,
\qquad
[x]_+\equiv\max(x,0).
$$
A valid observed-observer measurement model should satisfy
$$
\Delta_{\mathrm{cert}}^{ij}
\le
\varepsilon_{\mathrm{cert}}
$$
on the same declared apparatus kernel, coarse-graining, access region, and persistence window used for the ordinary record tests. This is not a new probability postulate. It is the measurement-cut rejection applied recursively: if $O_i$ can physically record $O_j$'s certified conclusion, that imported record must be part of the same substrate flow as $O_i$'s direct prediction. If the communication record, reference resources, or record-autonomy test fails, the observed-observer setup is not a completed measurement comparison rather than a contradiction in the ontology.

## Minimal Dynamical Model

Let $X(t)$ denote reduced coordinates for the measured subsystem and $A(t)$ the relevant apparatus coordinates. The coupled deterministic coarse-grained dynamics may be written schematically as
$$
\dot X = F_X(X,A,\mathcal{W}),
\qquad
\dot A = F_A(X,A,\mathcal{W}),
$$
where $\mathcal{W}$ denotes the local causal-wake background inherited from the apparatus, environment, and prior path history.

Let the metastable branch boundary be defined by a separatrix
$$
\Sigma(X,A)=0.
$$
Then the measurement transition is the first crossing time
$$
\tau_{\text{meas}}
=
\inf\{t>t_0:\Sigma(X(t),A(t))=0\}.
$$

This is the ontology-level replacement for instantaneous collapse. The transition is continuous in absolute time, though it may appear effectively abrupt to a coarse observer.

A Physical Observer may still be unable to resolve the crossing from the retained record. Let $\pi_O$ be the observer's access projection from the coupled measurement state to retained records, let $d_O$ be the induced record distance, and let $\epsilon_O$ be the declared record tolerance. For a branch basin $B_k$, the boundary is operationally unresolved for $O$ when

$$
d_O\!\left(
\pi_O\!\left(X(t),A(t),\mathcal{W}\right),
\pi_O(\partial B_k)
\right)
\le
\epsilon_O.
$$

This condition does not add a second ontology or a language-level vagueness postulate. It says only that the available record cannot decide the basin side. If the full measurement dynamics place $(X(t),A(t),\mathcal{W})$ inside or outside $B_k$, that fact remains substrate-level; a failure claim must instead show that the basin family or its boundary is absent, unstable under the declared coarse-graining, or not tied to the record channel.

The time at which an effective branch description becomes useful is not fixed by the phrase "superposition" alone. It depends on the apparatus kernel, coarse-graining, access region, and record window. For a declared channel $(\mathcal{K}_A,\mathcal{Q},W,T)$ and candidate basin family $\{B_i(t)\}$, a pre-record branch separation can be treated as present only when the retained transition law is no longer restartable through a single reduced state while at least two alternatives are independently recordable in that channel:
$$
\tau_{\mathrm{split}}
=
\inf\{t>t_0:\exists i\ne j,
N_{\mathcal{Q},W}(B_i(t))\ge 1,
N_{\mathcal{Q},W}(B_j(t))\ge 1,
\Delta_{\mathrm{div}}(t_0,t,T;\mathcal{Q},W)>\varepsilon_{\mathrm{div}}\}.
$$
Here $N_{\mathcal{Q},W}$ is the recordable basin count from [Wavefunction Ontology](wavefunction-ontology.md#lower-bound-on-recordable-basin-measure), and $\Delta_{\mathrm{div}}$ is the restartability residual defined below for the same coarse-graining, access region, and record window.

The record time is later, and stricter:
$$
\tau_{\mathrm{rec}}
=
\inf\{t>\tau_{\mathrm{split}}:
\Delta_{\mathrm{rec}}(t;k)\le\varepsilon_{\mathrm{rec}},
\Delta_{\mathrm{div}}(t_0,t,T;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}\}.
$$
The unresolved interval $\tau_{\mathrm{rec}}-\tau_{\mathrm{split}}$ is a validation target for a concrete apparatus model. It is not a new collapse law and not a substrate-level consciousness event. It names the window in which an effective wavefunction may need to carry multiple alternatives while the ontology still owes a finite-time record-forming transition.

Because this definition is windowed, it does not require a global decision procedure for every future trajectory question. The measurement claim is narrower: within a declared apparatus kernel, coarse-graining, access region, and record window, the coupled dynamics either reaches a recordable basin satisfying the residual tests or remains unresolved. Unbounded reachability questions for the same dynamical law belong to a separate theorem class and should not be treated as prerequisites for ordinary record formation.

### Basin-Update Equation

The standard projection rule can be retained as an effective update only after the physical record has already formed. Let $\mu_{0,\theta}$ be the preparation measure for a declared measurement channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T)$, and let
$$
\nu_{\tau_{\mathrm{rec}}}
=
\left(\Phi_{\tau_{\mathrm{rec}}-t_0}^{\mathrm{tot}}\right)_*\mu_{0,\theta}
$$
be the pushed-forward ensemble at the record time. If the completed record is the basin $B_k^{\mathrm{rec}}(\theta)$ and its measure is nonzero, then the native post-record update is conditionalization on the realized basin:
$$
\mu_{\theta,k}^{+}(B)
=
\frac{
\nu_{\tau_{\mathrm{rec}}}\!\left(B\cap B_k^{\mathrm{rec}}(\theta)\right)
}{
\nu_{\tau_{\mathrm{rec}}}\!\left(B_k^{\mathrm{rec}}(\theta)\right)
}.
$$
This is not a new stochastic law. It is the observer's effective ensemble after the deterministic apparatus-target flow has crossed the separatrix, locked the record, and passed the record-autonomy tests.

Let $\mathcal{E}_\theta$ denote the effective wavefunction extraction map for the same retained chart. The wavefunction update is then a derived description,
$$
\psi_\theta^{-}
=
\mathcal{E}_\theta(\nu_{\tau_{\mathrm{split}}}),
\qquad
\psi_{\theta,k}^{+}
=
\mathcal{E}_\theta(\mu_{\theta,k}^{+}).
$$
In subsystem language this is the measurement analogue of a conditional or effective wavefunction. If a total extracted state is written on a target-apparatus chart as $\Psi_{\mathrm{tot}}(x_S,y_A,t)$ and the apparatus record has entered the basin coordinate $Y_{A,k}$, the comparison update has the schematic form
$$
\psi_{S,k}^{\mathrm{cond}}(x_S,t)
=
\mathcal{N}_k
\Psi_{\mathrm{tot}}(x_S,Y_{A,k},t),
$$
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
\varepsilon_{\mathrm{upd}}.
$$
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
\varepsilon_{\mathrm{upd}},
$$
whenever the denominator is nonzero. This equation is the measurement-basin version of the textbook projection rule: first the coupled physical system selects and records a basin, then the observer-level wavefunction is updated to the corresponding effective eigenspace.

Generalized measurements sharpen this requirement because the observer-level measurement record is not always projective. A calibrated record channel may be represented by a POVM $\{E_m\}$ with
$$
E_m=E_m^\dagger,\qquad E_m\ge0,\qquad \sum_m E_m=I,
$$
and an instrument choice $\{M_m\}$ satisfying
$$
E_m=M_m^\dagger M_m,
\qquad
\sum_m M_m^\dagger M_m=I.
$$
The comparison probabilities and conditional updates are
$$
p_m=\operatorname{Tr}(\rho E_m),
\qquad
\rho\mapsto\rho_m^+
=
\frac{M_m\rho M_m^\dagger}{p_m}.
$$
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
\varepsilon_{\mathrm{POVM}}.
$$
This residual says that the operator summary is licensed by the apparatus record map; it is not a primitive property carried into the interaction.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ burden is not merely to reproduce the POVM probabilities. The same coupled target-apparatus-environment flow must also recover the instrument update, because different $M_m$ can give the same $E_m$ while leaving different post-record states.

For a declared channel $\theta$, let $\rho_{\theta,m}^{\mathrm{rec},+}$ be the effective state extracted from the basin-conditioned measure $\mu_{\theta,m}^+$ above, and let $\rho_{\theta,m}^{\mathrm{inst},+}=M_m\rho_\theta^-M_m^\dagger/p_m$ be the comparison instrument update. A compact generalized-measurement residual is
$$
\mathcal{R}_{\mathrm{inst}}(\theta)
=
\max_m
\max\left(
\frac{\left|\mu_{*,T}(\pi^{-1}(R_m))-p_m\right|}{\varepsilon_p},
\frac{\left\|\rho_{\theta,m}^{\mathrm{rec},+}-\rho_{\theta,m}^{\mathrm{inst},+}\right\|_1}{\varepsilon_{\mathrm{inst}}},
\frac{\left|\Delta E_{\mathrm{unrec}}(T;\theta,m)\right|}{\varepsilon_E}
\right)
\le 1.
$$
This is the measurement-channel version of the usual dilation result: a POVM can be represented as a projective measurement on a larger Hilbert space, but the native account must identify the physical apparatus, environment, and inaccessible degrees of freedom that realize that larger record space. Photon detection is the warning case. The record may use projective effects for "photon absent" and "photon present," while the instrument maps both outcomes to the no-photon post-record channel because the photon assembly has been absorbed into the apparatus/event ledger.

## What Makes an Interaction a Record

Not every separatrix crossing is a measurement record. A record requires stability and amplifiability.

Introduce a coarse record variable $R(A)$ extracted from apparatus state. A measurement record exists only if, after the transition,
$$
|R(A(t)) - R(A_{\text{pre}})| > R_*,
$$
for some readout threshold $R_*$, and if the new branch remains stable for a persistence time $T_{\text{rec}}$:
$$
\tau_{\text{persist}} > T_{\text{rec}}.
$$

Environmental locking can be sharpened as an entropy diagnostic rather than left as a prose condition. For a declared coarse-graining $\mathcal{Q}$ and retained access region $W$, let
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_0+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_0)
$$
measure the apparatus/environment entropy change associated with the candidate record channel. A strong record candidate should satisfy
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}}>0,
$$
with $S_{\mathrm{lock}}$ fixed by the apparatus class and readout channel. This is not a new collapse law. It is a closure check that the branch has exported enough unresolved apparatus/environment history that coherent reversal is no longer part of the retained measurement window.

A cyclic record channel also needs a reset-cost subgate. Let a memory-bearing apparatus have $N$ distinguishable retained record classes in the declared window, and let $\varepsilon_\mu$ bound the failure of the retained apparatus/environment flow to preserve the relevant measure during the reset comparison. Resetting those classes to one blank class is admissible only if the missing state count is exported into apparatus/environment entropy:
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2.
$$
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
}{R_*}.
$$
The candidate record is autonomous on the persistence window only if
$$
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}},
\qquad
\varepsilon_{\mathrm{rec}}\ll 1.
$$
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
\right\|_{\mathrm{TV}\to\mathrm{TV}}.
$$
The restartability closure condition is
$$
\sup_{t_1,t_2\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)
\le
\varepsilon_{\mathrm{div}},
\qquad
\varepsilon_{\mathrm{div}}\ll 1.
$$
This condition says that, after record formation, the retained apparatus-target record can be treated as a new effective starting point without carrying unresolved cross-basin history as live interference. If $\Delta_{\mathrm{div}}=O(1)$, the interaction may have decohered in a reduced description, but it has not yet supplied the independent record assumed by a wave function transition.

A candidate record must also close the same event bookkeeping that the measurement claims to expose. For a declared channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T)$ and candidate outcome event $\mathsf e_k$, define the record indicator
$$
\mathbf{1}_{\mathrm{rec}}(k;\theta)
=
\mathbf{1}\!\left[
\tau_{\text{meas}}(B_k)<\infty,\quad
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)\le\varepsilon_{\mathrm{rec}},\quad
\sup_{t_1,t_2\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{div}}(t_0,t_1,t_2;\mathcal{Q},W)\le\varepsilon_{\mathrm{div}},
\right.
$$
$$
\left.
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}\ge S_{\mathrm{lock}},\quad
\|\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e_k)\|\le\varepsilon_{\mathrm{evt}},\quad
|\Delta E_{\mathrm{unrec}}(T;\theta,k)|\le\varepsilon_E
\right].
$$
Here $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger for energy, momentum, and angular momentum, while $\Delta E_{\mathrm{unrec}}$ is the unrecorded energy residual used in the [Measurement And Heating Residual](#measurement-and-heating-residual). This filter prevents a mere correlation, weak probe, or formal branch label from being counted as a measurement outcome before it has supplied a persistent record, closed the event ledger, and kept unrecorded energy below tolerance.

## Repeated-Record Confirmation

A measurement account is incomplete if it can name single records but cannot say how repeated records confirm or disconfirm the record law. For a fixed preparation class, apparatus kernel, coarse-graining, access region, and record window, let $D_N=\{N_k\}$ be the observed counts for $N$ completed records and let $\widehat f_k=N_k/N$ be the corresponding frequencies. The same finite-time basin measure used above should determine
$$
P_\theta(k)
=
\frac{
\mu_{*,T}\!\left(\pi^{-1}(R_k)\right)\mathbf{1}_{\mathrm{rec}}(k;\theta)
}{
\sum_j
\mu_{*,T}\!\left(\pi^{-1}(R_j)\right)\mathbf{1}_{\mathrm{rec}}(j;\theta)
}
$$
for the declared record map $\pi$ and model record $\theta$, with the denominator required to be nonzero on the completed measurement channel. A compact confirmation residual is
$$
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta)
=
\max_k
\frac{\left|\widehat f_k-P_\theta(k)\right|}{\varepsilon_k(N)}.
$$
The validation target is
$$
\Pr_{\mu_{*,T}}\!\left[
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta)>1
\right]
\le
\alpha_N,
\qquad
\varepsilon_k(N)\to0,\quad
\alpha_N\to0
$$
in the calibrated repeated-record regime. This is not a new probability ontology. It is the ordinary scientific-inference burden stated in measurement language: the same substrate flow, record channel, and basin measure that produce a completed record must also produce the frequencies used to test the theory. If a model changes the measure between record formation, Born weights, thermodynamic summaries, and repeated-record statistics, it has hidden an ensemble retuning inside the measurement account.

The same finite-window measure must also survive the Born-window, thermodynamic-ensemble, and energy-ledger checks used elsewhere in the quantum closure chain. For a declared channel $\theta=(\mathcal{K}_A,\mathcal{Q},W,T)$, define the same-measure record residual
$$
\mathcal{R}_{\mathrm{same}}(\theta)
=
\max\!\left(
\Delta_{\mathrm{freq}}^{\mathrm{meas}}(N;\theta),
\frac{\Delta_{\mathrm{Born}}(T)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T)}{\varepsilon_{\mathrm{ens}}},
\max_k\frac{|\Delta E_{\mathrm{unrec}}(T;\theta,k)|}{\varepsilon_E}
\right).
$$
Here the Born-window and thermodynamic-ensemble terms are the residuals defined in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence), while the energy term is the event-ledger residual used below. A completed measurement account requires $\mathcal{R}_{\mathrm{same}}\le1$ on the same retained window. Otherwise the model has fit several observer-level summaries with different hidden ensembles rather than deriving one record-forming channel.

## Weak-Probe Limit

A weak measurement is not a different ontology. It is the small-coupling regime of the same apparatus-target dynamics in which a probe samples the target without creating a record-forming separatrix crossing on the retained trial window. Let $\epsilon$ denote the probe-coupling strength and let $(X_\epsilon,A_\epsilon)$ be the coupled trajectory under that probe. The no-record condition is
$$
|R(A_\epsilon(t_1))-R(A_{\text{pre}})|\le R_*,
\qquad
\tau_{\text{meas}}^{(\epsilon)}>t_1-t_0,
$$
where
$$
\tau_{\text{meas}}^{(\epsilon)}
=
\inf\{t>t_0:\Sigma(X_\epsilon(t),A_\epsilon(t))=0\}.
$$
Thus the individual retained interaction remains below the same record threshold used above. It may still produce a small pointer displacement $Y(A)$ whose ensemble mean is visible:
$$
\left\langle
Y(A_\epsilon(t_1))-Y(A_{\text{pre}})
\right\rangle_{\mathcal{E}}
=
O(\epsilon),
\qquad
\mathrm{Var}_{\mathcal{E}}\!\left(Y(A_\epsilon(t_1))\right)=O(1).
$$
The signal is therefore statistical: many similarly prepared trials can expose the weak channel even though no single trial has generated a durable record of the target variable.

Post-selection does not add future causation. It is ordinary conditioning on a later record-forming event. If $\mathcal{R}_f$ is the accepted later record class, let $\mu_0$ be the preparation measure and let $\Phi^{\mathrm{tot}}_{t-t_0}$ be the coupled substrate flow for the same target, apparatus, environment, and causal-wake variables used by the record channel. The physical evolution is the pushforward
$$
\mu_t
=
(\Phi^{\mathrm{tot}}_{t-t_0})_*\mu_0.
$$
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
},
$$
where $\pi$ is the declared record map for the later apparatus channel.
This conditional measure can sharpen which weak-probe displacements are averaged, but all substrate evolution still runs forward in absolute time. The closure target is to derive the weak-probe response and its post-selected statistics from the same deterministic flow, separatrix geometry, and record criterion used for ordinary measurements.

The signed-response benchmark for post-selected weak probes should therefore be stated at the ensemble level. For a declared weak-probe pointer coordinate $Y$ and accepted later record class $\mathcal{R}_f$, define the normalized conditional response
$$
\bar{Y}_{\epsilon\mid\mathcal{R}_f}
=
\frac{1}{\epsilon}
\int
\left(
Y(A_\epsilon(t_1))-Y(A_{\text{pre}})
\right)
d\mu_{\mathrm{post}}.
$$
If standard weak-value analysis predicts a signed displacement, $\mathbb{A}\mathbb{A}\mathbb{A}$ must recover that sign and magnitude as a conditional average over below-threshold probe trajectories:
$$
\left|
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
\bar{Y}_{\epsilon\mid\mathcal{R}_f}^{\mathrm{QM}}
\right|
\le
\varepsilon_Y,
$$
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
d\mu_{\mathrm{post}}.
$$
For a standard weak-measurement benchmark with prediction $T_{\Omega\mid\mathcal{R}_f}^{\mathrm{QM,weak}}$, the recovery target is
$$
\left|
\bar{T}_{\Omega\mid\mathcal{R}_f}^{\mathbb{A}\mathbb{A}\mathbb{A}}
-
T_{\Omega\mid\mathcal{R}_f}^{\mathrm{QM,weak}}
\right|
\le
\varepsilon_T,
$$
while the no-record condition above still holds on each retained trial. If two clock designs are known to agree in a calibrated regime, such as a dwell-style internal-state clock and a delay-style pulse clock, the additional equality target is
$$
\left|
\bar{T}_{\mathrm{dwell}\mid\mathcal{R}_f}
-
\bar{T}_{\mathrm{delay}\mid\mathcal{R}_f}
\right|
\le
\varepsilon_{\mathrm{eq}}.
$$
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
be the record map from the coupled target-apparatus-environment state to the retained record classes. A claimed observable label $O$ is admissible in this chapter only after it has been represented by a family of record basins
$$
B_k^{O,\mathcal{K}_A}
=
\pi_{\mathcal{K}_A}^{-1}(R_k)
\cap
\{\mathbf{1}_{\mathrm{rec}}(k;\theta)=1\}.
$$
This condition keeps the Bricmont-Goldstein/Bohmian warning in native form: a channel may reveal a position-like record, but spin-, momentum-, phase-, and energy-like labels are often apparatus-defined outcomes of an interaction. They need not be primitive properties carried unchanged into the apparatus. The deterministic substrate may still contain velocities, angular-momentum ledgers, phases, and causal-wake histories; the measurement claim is narrower, namely that the chosen apparatus kernel maps the coupled flow into a persistent record with the advertised observer-level statistics.

### Position-like measurements

The apparatus couples to spatial localization or arrival geometry. The record is a site-selective apparatus response such as a screen hit or detector cell trigger.

### Momentum- or phase-like measurements

The apparatus couples to a resonance band, interference geometry, transport mode, or late-time arrival geometry. The record is a stable branch in the apparatus-sensitive phase channel. A time-of-flight or far-field momentum record, for example, is a record of the later apparatus position or transport branch calibrated back to a momentum variable; it is not automatically a direct reading of the target's initial substrate velocity.

### Spin / discrete-outcome measurements

The apparatus couples to a discrete assembly orientation, angular-momentum response channel, or topological branch. The record is a branch-specific amplification, for example one of two detector channels.

In this language, "spin up" and "spin down" are not tiny literal arrows hidden inside the particle. They are the two stable branch labels selected by the apparatus relative to its chosen measurement axis.

For fermion spin-$\tfrac{1}{2}$, the standard Stern-Gerlach recovery target is a two-channel apparatus record with angular-momentum projections $+\hbar/2$ and $-\hbar/2$ along the apparatus axis. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that two-channel split must come from finite-time basin resolution of the target assembly plus apparatus, not from a primitive spin variable attached to an architrino.

The spin operator is therefore a compact generator of the recovered record statistics and basis rotations, not a new substrate degree of freedom. Its eigenlabels are licensed only when the apparatus kernel maps the nested shell swarm spin ledger into stable basin records with the standard half-angle probabilities.

The Stern-Gerlach-like specialization is developed in [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response). In that channel, the apparatus potential-gradient geometry couples to the full nested shell swarm spin ledger, including layer phases, frequencies, active causal-root branches, self-hit history, and causal-wake angular momentum. The two recorded outcomes are basin resolutions after a finite interaction time. The derived kernels are deterministic pullbacks of the record-forming basins. In the reduced spinor-record chart, the concrete separatrix and unbiased record-phase measure supply the comparison target for spin-$\tfrac{1}{2}$ half-angle probabilities. The Master-Equation origin of the external apparatus terms is now explicit: the angular impulse is the swarm-centered torque of delayed apparatus cross-root hits, and the record-phase measure is the invariant measure of the locked apparatus record cycle. The remaining substrate closure target is to derive the effective spinor coordinate and verify when the record cycle and apparatus impulse reduce to the ideal chart.

For an apparatus axis $\hat{\mathbf m}$, let $Z_0\in\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}$ be the incoming target-plus-apparatus state, let $\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}$ be the finite interaction map, let $G_{\mathrm{rec}}$ be the successful-record gate, and let $\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}$ be the signed separatrix functional. The lifted plus basin is

$$
B_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\left\{
Z_0:
G_{\mathrm{rec}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)=1,
\quad
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)>0
\right\}.
$$

The lifted plus probability is the pullback measure

$$
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
=
\int_{\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}}
\mathbf 1_{B_{+}^{\mathrm{lift}}(\hat{\mathbf m})}(Z_0)
\,d\mu_{\hat{\mathbf m}}^{\mathrm{in}}(Z_0).
$$

The complementary recorded basin is

$$
B_{-}^{\mathrm{lift}}(\hat{\mathbf m})
=
\left\{
Z_0:
G_{\mathrm{rec}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)=1,
\quad
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}
\left(
\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}(Z_0)
\right)<0
\right\},
$$

with

$$
P_{-}^{\mathrm{lift}}(\hat{\mathbf m})
=
\int_{\mathcal Z_{\hat{\mathbf m}}^{\mathrm{SG}}}
\mathbf 1_{B_{-}^{\mathrm{lift}}(\hat{\mathbf m})}(Z_0)
\,d\mu_{\hat{\mathbf m}}^{\mathrm{in}}(Z_0).
$$

The record-normalization residual is

$$
\Delta_{\mathrm{rec}}^{\mathrm{lift}}
=
\left|
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
+
P_{-}^{\mathrm{lift}}(\hat{\mathbf m})
-
\mu_{\hat{\mathbf m}}^{\mathrm{in}}
\left(
G_{\mathrm{rec}}\circ\Phi_{T_{\mathrm{int}}}^{\hat{\mathbf m}}=1
\right)
\right|.
$$

The ideal two-outcome Stern-Gerlach comparison requires $\Delta_{\mathrm{rec}}^{\mathrm{lift}}$ below tolerance before conditioning on successful records. A missing reject basin is not a harmless omission; it hides detector loss or failed record formation inside the plus-channel probability.

The half-angle law is then a consistency residual, not an inserted record rule:

$$
\Delta_{\mathrm{half}}^{\mathrm{lift}}
=
\left|
P_{+}^{\mathrm{lift}}(\hat{\mathbf m})
-
\cos^2\left(
\frac{\alpha(Z_0,\hat{\mathbf m})}{2}
\right)_{\mu}
\right|.
$$

Here $(\cdot)_{\mu}$ means the comparison is averaged using the derived effective spinor coordinate and incoming measure. The full substrate normal is

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG}}(Z,t)
=
D_Z
\Sigma_{\hat{\mathbf m}}^{\mathrm{SG}}(Z(t)).
$$

The reduced normal

$$
\mathcal N_{\hat{\mathbf m}}^{\mathrm{SG,red}}
=
dp_{+}
-
\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(\theta_{\mathrm{rec}})
d\theta_{\mathrm{rec}}
$$

is only a comparison target after $\psi(Z)$ and $p_+(Z;\hat{\mathbf m})$ are derived from the apparatus model. Equivalently, the reduced Stern-Gerlach record coordinate is the invariant-measure coordinate $u_{\hat{\mathbf m}}(\theta_{\mathrm{rec}})=\int_0^{\theta_{\mathrm{rec}}}\rho_{\hat{\mathbf m}}^{\mathrm{rec}}(s)\,ds$, not necessarily the raw phase $\theta_{\mathrm{rec}}/(2\pi)$. The raw phase appears only in the calibrated constant-phase-speed limit.

This is a single-assembly measurement statement. Bell-pair response and photon-polarization correlations additionally require the pair-provenance ledger and photon Gate B; they should not be treated as closed by the measurement ontology alone.

The important point is that the ontology never changes: different observables correspond to different coarse coordinates and different apparatus couplings, not different laws of collapse.

## Born-Rule Interface

This chapter does not derive the Born rule by itself. It fixes the ontology that the Born-rule derivation must sit on.

The closure target is that basin weights induced by the deterministic flow reproduce the usual outcome weights:
$$
P_k = \mu_*(B_k),
$$
with $B_k$ the record-forming attractor basins that satisfy the record, persistence, and event-ledger tests above, and $\mu_*$ the relevant invariant or coarse-grained measure. When the channel includes candidate branches that do not yet pass those tests, the normalized record probability is the filtered quantity $P_\theta(k)$ rather than a weight assigned to every formal branch label.

The measurement ontology therefore connects directly to the basin-measure program in [wavefunction-ontology.md](./wavefunction-ontology.md) and the separatrix-time program in [superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md).

This also fixes how external probability geometries should be used. A comparison framework may assign a natural measure to a space of possible configurations or records, but that measure is not automatically the Born rule. In this chapter, a candidate record map $\pi:\mathcal{M}\to\mathcal{R}$ is admissible only if the probabilities are pulled forward from the same deterministic flow that creates the apparatus record:
$$
P(R_k)=\mu_*\!\left(\pi^{-1}(R_k)\right).
$$
The source of $\mu_*$ is therefore part of the measurement closure, not an optional interpretive add-on.

The basin-measure necessity statement sharpens this interface. For a declared basin partition $\{B_i\}$ with separatrix boundaries of $\mu_*$-measure zero, the only admissible record probability is
$$
p_i
=
\int_{\Gamma_{\eta,h}}\mathbf{1}_{B_i}\,d\mu_*
=
\mu_*(B_i),
$$
up to the metastability, leakage, escape, and coarse-state errors declared for that same finite window. A weight assignment that is not this basin measure introduces an untracked kernel between the substrate flow and the recorded outcome.

The same restriction applies to branch language. If a branch or record class is emergent from later apparatus/environment dynamics, its probability cannot be inserted as an axiom before the record map, basin family, and measure source have been fixed. Assigning weights to emergent branches without that pullback repeats the measurement cut in probabilistic form. A valid branch probability must be a derived property of the same deterministic flow that creates and preserves the record, not a label attached after the ontology has already been compressed.

## External Penrose-Diosi Benchmark

Penrose-Diosi gravitational-collapse proposals provide an external comparison target for massive-superposition measurement claims. Their useful pressure is the tension between two inherited principles: local free-fall equivalence in gravity and linear superposition in quantum state descriptions. If one branch of a massive superposition can be locally transformed away only by a different free-fall frame than the other branch, the comparison asks whether the mismatch has an energy scale that should limit the lifetime of the unresolved branch description.

This comparison must be kept separate from passive external-field atom-interferometer phase tests. A single atom or dilute atom ensemble used as a passive mass in Earth's field can confirm the weak-field free-fall phase map, including a cubic-time phase coefficient, without testing whether the branch mass distribution sources a measurable gravity-side record. The Penrose-Diosi benchmark begins only when the alternatives carry different active mass-density histories $\rho_1$ and $\rho_2$ whose self-gravity or effective-metric response could contribute to record formation.

In that comparison, two alternative mass distributions $\rho_1$ and $\rho_2$ are assigned a gravitational self-energy scale
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(\mathbf{x})(\rho_1-\rho_2)(\mathbf{y})}
{\|\mathbf{x}-\mathbf{y}\|}\,d^3x\,d^3y,
$$
and a corresponding lifetime estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}.
$$

$\mathbb{A}\mathbb{A}\mathbb{A}$ does not adopt fundamental gravitational collapse or a stochastic metric. The benchmark is useful because large-mass interferometry and Bose-Einstein-condensate proposals ask whether spatial superpositions involving roughly $10^9$ to $10^{10}$ atoms remain coherent long enough to distinguish ordinary environmental decoherence, finite-time threshold resolution, and any gravity-driven collapse model. For this chapter, the comparison target is therefore not to derive $\tau_G$ as an ontological law, but to show that the $\mathbb{A}\mathbb{A}\mathbb{A}$ separatrix-time estimate for massive-superposition records remains quantitatively distinguishable from, or explicitly bounded against, the Penrose-Diosi scale.

The useful variable is mass displacement, not system size by itself. A many-degree system that leaves nearly the same mass density in each branch is a weaker test than a smaller system whose alternative branches separate appreciable mass density. For a proposed apparatus-target model, record the comparison ratio
$$
\mathcal{Q}_{\mathrm{PD}}
=
\frac{\tau_{\text{meas}}}{\tau_G}
=
\frac{\tau_{\text{meas}}\Delta E_G}{\hbar}.
$$
This ratio is not an ontology selector. It is a validation diagnostic: $\tau_{\text{meas}}$ must be derived from the Master-Equation separatrix and record-locking dynamics, while $\tau_G$ supplies an external mass-displacement benchmark. Collapse-model variants that imply persistent spontaneous heating add a separate empirical pressure, because neutron-star and low-background heating bounds can exclude that heating channel without deciding the $\mathbb{A}\mathbb{A}\mathbb{A}$ threshold-resolution mechanism.

### Measurement And Heating Residual

The heating pressure from objective-collapse comparisons should be retained as an energy-ledger test, not as imported stochastic-collapse ontology. A declared apparatus channel $(\mathcal{K}_A,\mathcal{Q},W,T)$ already has a Born-window residual $\Delta_{\mathrm{Born}}(T)$ and thermodynamic ensemble residual $\Delta_{\mathrm{ens}}(\mathcal{Q},W,T)$ in [Quantum Operator Mapping](../philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence). The same run should also carry an unrecorded energy residual after declared work, recoil, emitted assemblies, medium excitation, and boundary exchange are accounted for:
$$
\Delta E_{\mathrm{unrec}}(T;\theta)
=
\Delta E_{\mathrm{target+app+env}}(T)
{}-W_{\mathrm{decl}}(T;\theta)
{}-E_{\mathrm{recoil}}(T;\theta)
{}-E_{\mathrm{medium}}(T;\theta)
{}-E_{\mathrm{boundary}}(T;\theta).
$$
Here $\theta$ is the apparatus and environment record used for the same measurement run. The combined validation diagnostic is
$$
\mathcal{R}_{\mathrm{meas+heat}}(T;\theta)
=
\max\left(
\frac{\Delta_{\mathrm{Born}}(T)}{\varepsilon_{\mathrm{Born}}},
\frac{\Delta_{\mathrm{ens}}(\mathcal{Q},W,T)}{\varepsilon_{\mathrm{ens}}},
\frac{|\Delta E_{\mathrm{unrec}}(T;\theta)|}{\varepsilon_E}
\right).
$$
A measurement model that fits Born weights only by changing the thermodynamic ensemble, or that leaves a persistent unexplained heating term, has not closed the record-forming channel. A model may still compare to CSL-like or Penrose-Diosi-like formulas, but the retained content is the observable residual, not the external collapse mechanism.

## External Gravitational Which-Path Benchmark

Massive-superposition tests also create a second external benchmark: whether the gravitational or effective-metric readout of two branches can carry which-path information. This comparison preserves the observable pressure without adopting a stochastic-metric ontology. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the effective metric is an observer-level reconstruction, so a gravitational readout becomes measurement-relevant only when a Physical Observer apparatus can turn the branch-dependent response into an autonomous record.

Let $\rho_1(\mathbf{x},t)$ and $\rho_2(\mathbf{x},t)$ be two alternative branch-level mass-density histories, and let $h_A(t;\rho_k,\theta)$ denote the detector response channel $A$ predicted by the same effective-metric constitutive record $\theta$ for branch $k$. Define
$$
\Delta h_A(t)
=
h_A(t;\rho_1,\theta)-h_A(t;\rho_2,\theta).
$$
If $N_{AB}(t,t')$ is the covariance of unresolved detector, environmental, and boundary-wake contributions over the coherence window $T$, the gravitational distinguishability diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
=
\int_0^T\!\!\int_0^T
\Delta h_A(t)\,
N^{-1}_{AB}(t,t')\,
\Delta h_B(t')\,dt\,dt'.
$$

The comparison criterion is:
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)\le\varepsilon_{\mathrm{wp}}
$$
for an interference-preserving branch pair, unless the apparatus-target dynamics explicitly show a record-forming separatrix crossing with finite $\tau_{\text{meas}}$ and a persistent record variable. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while the interference pattern remains intact and no record-autonomy condition is satisfied, the proposed effective-metric response has overproduced observable which-path information.

The covariance $N_{AB}$ is not an ontological randomness postulate in this chapter. It must be derived, or bounded, from unresolved deterministic boundary data, local Noether-Sea state, detector calibration residuals, and ordinary environmental channels. This keeps the useful lesson from classical-quantum gravity comparisons while preserving the native claim that branch selection is finite-time assembly dynamics rather than fundamental metric collapse.

### Minimal Massive-Branch Toy Model

A first calculation can be posed without choosing a full collapse interpretation. Let a target mass $M$ have two branch-level center histories
$$
\mathbf{X}_{\pm}(t)
=
\mathbf{X}_0(t)\pm\frac{1}{2}\mathbf{d}(t),
$$
with branch densities
$$
\rho_{\pm}(\mathbf{x},t)
=
M\,\delta_{\eta}\!\left(\mathbf{x}-\mathbf{X}_{\pm}(t)\right)
+
\rho_{\mathrm{app}}(\mathbf{x},t),
$$
where $\rho_{\mathrm{app}}$ is the shared apparatus and environmental mass density. For a differential gravity readout channel $A$, define
$$
h_A(t;\rho_{\pm},\theta)
=
e_A^i
\left[
a_i^{\mathrm{eff}}(\mathbf{y}_A,t;\rho_{\pm},\theta)
-
a_i^{\mathrm{eff}}(\mathbf{y}_0,t;\rho_{\pm},\theta)
\right],
$$
where $\mathbf{y}_A$ and $\mathbf{y}_0$ are detector reference points, $e_A^i$ is the channel projection, and $a_i^{\mathrm{eff}}$ is the effective metric or weak-field acceleration readout derived from the same constitutive record $\theta$ used in the spacetime chapters.

In the weak, slowly varying limit, the branch difference has the schematic tidal form
$$
\Delta h_A(t)
\simeq
G_{\mathrm{eff}}(\theta)M\,e_A^i
\left[
D_{ij}(\mathbf{y}_A-\mathbf{X}_0)
-
D_{ij}(\mathbf{y}_0-\mathbf{X}_0)
\right]
d^j(t),
$$
with
$$
D_{ij}(\mathbf{R})
=
\frac{3R_iR_j-\|\mathbf{R}\|^2 h_{ij}}{\|\mathbf{R}\|^5}.
$$
If the unresolved readout noise is approximately stationary over the coherence window, $N_{AB}(t,t')=S_{AB}\delta(t-t')$, then
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
\simeq
\int_0^T
\Delta h_A(t)\,
S^{-1}_{AB}\,
\Delta h_B(t)\,dt.
$$

This toy model turns the benchmark into a simulation target. The required inputs are $M$, $\mathbf{d}(t)$, $\mathbf{X}_0(t)$, detector geometry $(\mathbf{y}_A,\mathbf{y}_0,e_A)$, noise matrix $S_{AB}$, coherence time $T$, and the constitutive weak-field map in $\theta$. An interference-preserving run passes the gravitational which-path gate only if $\mathcal{D}_{\mathrm{grav}}(T;\theta)\le\varepsilon_{\mathrm{wp}}$ or if the same apparatus model derives a record-forming separatrix crossing with a persistent record variable.

The observer-level covariance decomposition is owned by [Observer Framework](../spacetime/observer-framework.md#boundary-wake-covariance-scaffold). The concrete validation scaffold is [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md).

## Closure Targets

For this chapter to count as closed, the repo still needs:

1. one explicit Master-Equation apparatus-target toy model that evaluates the branch-sum impulse and record-cycle phase density,
2. one explicit record variable $R(A)$ and persistence criterion,
3. one derived estimate of finite collapse time $\tau_{\text{meas}}$, including a massive-superposition comparison against the external Penrose-Diosi scale $\tau_G$,
4. one gravitational which-path distinguishability calculation $\mathcal{D}_{\mathrm{grav}}$ for a massive-superposition apparatus, following the [Massive-Superposition Gravity Validation Packet](../validation/massive-superposition-gravity.md),
5. one bridge from basin weights to observed frequencies.

This chapter now fixes the ontology and interface. The remaining work is derivational, not definitional.

## Falsification Gate

The ontology fails if any of the following occur:

- a genuine measurement record can be shown to form without any finite-time physical branch-selection process,
- the same apparatus can produce reproducible outcomes while no durable apparatus/environment asymmetry is created,
- or experiments force strictly instantaneous projection as a fundamental event rather than an effective coarse description.

Equivalently, the theory requires
$$
\tau_{\text{meas}} > 0
$$
for real record-forming interactions, even if that time becomes extremely short in ordinary laboratory practice.

## Related Chapters

- [collapse-problem.md](../philosophy-history/theory-bridges/collapse-problem.md)
- [superposition-mechanism.md](../philosophy-history/theory-bridges/superposition-mechanism.md)
- [wavefunction-ontology.md](./wavefunction-ontology.md)
- [pilot-wave-character.md](../philosophy-history/theory-bridges/pilot-wave-character.md)
