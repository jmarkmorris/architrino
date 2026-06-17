# Entropy and Record Coarse-Graining

Entropy enters $\mathbb{A}\mathbb{A}\mathbb{A}$ as a record-coarse-graining concept. It is not a primitive substance, not a field in the Euclidean void, not the generator of absolute time, and not an independent gravitational mechanism. It is a functional of the histories a declared observer, apparatus, simulation packet, or effective description retains after the complete deterministic state has been projected into a finite record.

This chapter collects the entropy rule used across time, energy, measurement, computation, horizon, and cosmology discussions. The central discipline is the same-record rule: a packet may not fit entropy, temperature, flux, probability weights, apparatus cost, or horizon labels from separate hidden ensembles. If a thermal, quantum, horizon, or computational comparison is claimed, the entropy appearing in that comparison must be a projection of the same record that supplies the other quantities.

## Core Definition

Let $\mu_t$ be a measure on complete deterministic histories compatible with a declared preparation. Let $W(t)$ be the access window and let $\mathcal{Q}$ be the coarse-graining used by a Physical Observer, apparatus, or simulation packet. The record projection
$$
\Pi_{\mathcal{Q},W}:\Gamma_t\longrightarrow \mathcal{Z}_{\mathcal{Q},W}
$$
maps complete histories into retained record variables. The pushed-forward record measure is
$$
\nu_{\mathcal{Q},W,t}
=
(\Pi_{\mathcal{Q},W})_*\mu_t
$$
and the corresponding observer-window entropy is
$$
S_{\Pi,W}(t)
=
k_B\,\mathcal{H}\!\left(\nu_{\mathcal{Q},W,t}\right)
$$
where $\mathcal{H}$ is the entropy functional appropriate to the retained record measure.

For a discrete coarse partition with probabilities $p_\alpha$, this reduces to the familiar Gibbs/Shannon form
$$
S_{\mathcal{Q}}
=
-k_B\sum_{\alpha}p_\alpha\log p_\alpha
$$
For a microcanonical retained window, the same idea is written as
$$
S_{\mathcal{Q},W}(t)
=
k_B\log \mu\!\left(\Gamma_{\mathcal{Q},W(t)}\right)
$$
where $\Gamma_{\mathcal{Q},W(t)}$ is the set of complete microhistories compatible with the retained macroscopic records in that window.

Plain language: entropy is not counted over reality in the abstract. It is counted over the alternatives left unresolved after the record map, measure, coarse-graining, and access window have been specified.

## Mapping In From Standard Entropies

Legacy entropy formulas survive as effective projections with different prerequisites.

Clausius entropy, $dS=\delta Q_{\mathrm{rev}}/T$, is licensed only in a regime where the reversible comparison class, heat channel, and temperature channel are defined by the same physical record. Without that record, the formula is a comparison mnemonic rather than a substrate claim.

Boltzmann entropy, $S=k_B\log \Omega$, maps to the count or measure of complete architrino and assembly histories compatible with the retained macrostate. The macrostate partition is part of the claim. Changing the partition changes the entropy statement.

Gibbs and Shannon entropies map to pushed-forward measures over unresolved alternatives. They are useful for apparatus states, basin weights, branch records, and coding descriptions, but they become thermodynamic only when the apparatus, environment, boundary exchange, and work or heat ledger are physical parts of the same packet.

Record entropy maps to durable alternatives in an apparatus or observer channel. A record is not merely a symbolic label. It is an assembly/environment state that persists long enough to be read, copied, or reset within a declared window.

Horizon entropy maps to observer-accessible boundary or horizon-interface label capacity. It is not a literal statement that the Euclidean void is made of area bits. The label count must be derived from strong-field Noether sea and nested shell swarm records.

Computation entropy maps to implemented device cost. Bit logic alone does not create a thermodynamic cost. A cost claim is physical only after the device state space, success criterion, reset operation, heat/work ledger, and boundary exchange have been declared.

## Mapping Out To Effective Physics

The outward map from $\mathbb{A}\mathbb{A}\mathbb{A}$ to effective entropy has five steps.

First, choose the physical window $W$ and the record carrier: apparatus, boundary wake data, Noether sea state, simulation domain, or Physical Observer record. Second, choose the coarse-graining $\mathcal{Q}$ that defines which complete histories count as the same retained state. Third, push the complete-history measure forward through $\Pi_{\mathcal{Q},W}$. Fourth, compute the entropy functional on the retained measure. Fifth, compare that result to the relevant effective law only with the same record still in force.

For open or cosmological windows, entropy bookkeeping must expose production, boundary flux, and record-change residuals:
$$
\frac{dS_{\mathcal{Q},W}}{dt}
=
\sigma_W(t)
-
\int_{\partial W(t)}
\mathbf{J}_S\cdot\hat{\mathbf{n}}\,dA
+
\mathcal{R}_{\mathcal{Q}}(t)
$$
Here $\sigma_W$ is local production inside the retained window, $\mathbf{J}_S$ is entropy flux through the boundary, and $\mathcal{R}_{\mathcal{Q}}$ records changes in the coarse-graining or retained record set. A monotone entropy statement is therefore conditional:
$$
\frac{dS_{\mathcal{Q},W}}{dt}\ge 0
\quad\Longleftrightarrow\quad
\sigma_W(t)+\mathcal{R}_{\mathcal{Q}}(t)
\ge
\int_{\partial W(t)}
\mathbf{J}_S\cdot\hat{\mathbf{n}}\,dA
$$
for the declared record. The phrase "entropy of the universe" is not a complete claim unless it supplies the measure, window, boundary, and residual terms.

## Same-Record Closure Rule

A thermodynamic packet has one declared record. In a local horizon, measurement, computation, or near-equilibrium simulation, write that record schematically as
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
where all listed quantities are projections of the same $\theta_W$. If entropy is computed from one $\theta_W$, temperature from another, Born-style basin weights from a third, and flux from a fourth, the packet has not derived a closure. It has fitted separate descriptions.

This rule is why entropy appears as a discipline across many chapters. It protects the Born-rule program from using one ensemble for outcome weights and another for apparatus thermodynamics. It protects horizon thermodynamics from assigning independent entropy, temperature, and stress records. It protects computation-cost claims from treating logical form as a free physical process.

## Entropy And Absolute Time

Absolute time is the ordering parameter of the substrate law. Entropy does not create it. The causal arrow enters the dynamics through delayed causal wakes: only emissions from $t_0<t$ can contribute to a receiver at $t$. Thermodynamic, biological, measurement, and cosmological arrows are finite-window consequences of dynamics, boundary conditions, and retained records.

Even if the complete deterministic dynamics preserve the underlying measure, the observer-window entropy $S_{\Pi,W}$ can increase when $\Pi_{\mathcal{Q},W}$ discards path-history, boundary-wake, or apparatus-record information. That increase is a projection effect inside the declared record. It is not evidence that time itself is generated by entropy.

The arrow-of-time closure problem is therefore sharper than a generic second-law slogan. A mature account must explain why the admissible early record is low-defect or low-entropy in the relevant coarse-graining, and why later macroscopic reversal would require reconstruction of path-history and wake-phase detail no finite observer or apparatus can retain.

## Measurement And Computation

Measurement records require entropy locking. For a declared apparatus/environment channel,
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
=
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_0+T_{\text{rec}})
-
S_{\mathcal{Q},W}^{\mathrm{app+env}}(t_0)
$$
is the entropy change associated with the candidate record. A strong record candidate satisfies
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
S_{\mathrm{lock}}>0
$$
with $S_{\mathrm{lock}}$ fixed by the apparatus class and readout channel. This is not a collapse law. It is the requirement that the branch has exported enough unresolved apparatus/environment history that coherent reversal is no longer part of the retained measurement window.

Resetting a memory-bearing apparatus with $N$ distinguishable retained record classes also requires a physical entropy ledger:
$$
\Delta S_{\mathcal{Q},W}^{\mathrm{app+env}}
\ge
k_B\log N-k_B\varepsilon_\mu,
\qquad
N\ge2
$$
For a non-uniform retained distribution, $k_B\log N$ is replaced by $-k_B\sum_i p_i\log p_i$.

The same logic applies to computation. For an implemented step $s$ with completion probability $p_s$, a lower-bound claim must attach to the device and boundary records:
$$
\Delta S_{\mathrm{env},s}
+
\Delta S_{\mathrm{target},s}
+
\Delta S_{\mathrm{boundary},s}
\ge
k_B\log(1/p_s)-\epsilon_s
$$
The inequality is not a new law of symbols. It states the burden that the same physical record defining success must also supply the entropy, heat, work, and boundary terms used to claim a cost.

## Horizons And Emergent Gravity

Horizon entropy is the most stringent test of this mapping because it connects record counting, effective geometry, energy flux, and unitarity pressure. The useful comparison target is not that gravity is "really entropy." The target is that one strong-field Noether sea record supplies the observer-level entropy, temperature, flux, and metric response together.

For an observer-accessible local horizon patch $\partial\Omega$, the boundary-label entropy target is
$$
S_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|
$$
with $\mathcal{B}_{\partial\Omega}^{(O)}$ defined by retained boundary-wake labels readable by the same Physical Observer record. The local Clausius comparison becomes a residual or variation target:
$$
\delta_\ell Q_{\partial\Omega}^{(O)}
=
T_U^{(O)}
\delta_\ell S_{\partial\Omega}^{(O)}
+
\mathcal{O}(k_B T_U^{(O)}\epsilon_{\mathrm{local}})
$$
This is a recovery target, not a postulate. The proof fails if $S_{\partial\Omega}^{(O)}$, $T_U^{(O)}$, $dQ_{\partial\Omega}^{(O)}$, and the effective metric are assigned independent records.

For black holes, the area-law coefficient must come from terminal nested shell swarm alignment and horizon-interface label compatibility. For a connected block $U$ of alignment-area patches,
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
when the limit exists after boundary corrections. The required coefficient is area-normalized:
$$
\frac{s_{\mathrm{align}}(\theta)}
{a_{\theta}}
\longrightarrow
\frac{1}{4}
$$
This target avoids a false one-patch interpretation. The coefficient is a block entropy density and patch-area normalization, not a literal independent count on one microscopic patch.

Page-curve, island, replica-wormhole, Ryu-Takayanagi, and AdS/CFT calculations remain high-value comparison mathematics. They sharpen the required entropy and unitarity bookkeeping. They do not provide the $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism unless their constraints are recovered from horizon-interface labels, path-history bookkeeping, Noether sea storage, and release-channel selection.

## Failure Modes

The most common failure mode is an unqualified entropy statement. An entropy claim is incomplete when it omits the measure, coarse-graining, access window, retained record, or boundary terms.

Another failure mode is disembodied information. Shannon uncertainty over symbols is not automatically heat, work, Clausius entropy, or physical record cost. It becomes thermodynamic only when implemented through an apparatus and boundary ledger.

A third failure mode is entropic gravity as a substitute for the mass mechanism. Thermodynamic or entropic derivations of force are comparison benchmarks, but inertial mass remains open until the assembly ledger supplies closed internal causal history, shielding extraction, Noether sea response, and acceleration response.

A fourth failure mode is fitted horizon bookkeeping. If a black-hole or local-horizon packet uses one record for entropy, another for temperature, another for stress, and another for release channels, the apparent agreement is not a native closure.

The fifth failure mode is promoting entropy into time. Entropy can diagnose an emergent arrow inside a stated physical and inferential window. It does not supply the absolute ordering parameter $t$.

## Interfaces

The energy-side residuals are stated in [Kinetic and Potential Energy](energy.md#entropy-free-energy-and-coarse-residuals). The time-side arrow distinction is stated in [Absolute Time](../foundations/absolute-time.md#time-orientation). Measurement locking is stated in [Measurement Ontology](../quantum/measurement-ontology.md). Computation cost is treated in [Information / Computation](../philosophy-history/information-computation.md#thermodynamic-cost-of-computation). Local-horizon recovery is stated in [Emergent Metric](../spacetime/emergent-metric.md#local-horizon-recovery-target), with the simulation-facing scaffold in [Thermodynamic Residual Protocol](../validation/simulations/thermodynamic-residual.md). The strong-field horizon target is stated in [Black Holes](../spacetime/black-holes.md#horizon-interface), and the dynamics-side label-count target is stated in [Nested Shell Swarm Dynamics](../noether-swarm/nested-shell-swarm-dynamics.md#terminal-alignment-label-count-target).

The consolidated rule is simple: entropy is accepted only as a declared projection of retained deterministic histories, and every effective entropy claim must name the record that makes the projection physical.
