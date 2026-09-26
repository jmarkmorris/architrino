# Preparation Wakes and Bell Causal Reach

This September 23, 2026 exploration assesses whether preparation wakes arriving ahead of daughter particles can explain Bell correlations, and whether a later setting-dependent wake channel can supply the missing dependence. It supplements the [pair-provenance source-measure owner](dynamic-pair-provenance-source-measure.md) without advancing the deferred physical recovery program. Timing and probability statements below are conditional derivations; detector amplification is a candidate mechanism, not a computed result. No substrate simulation or Bell recovery is claimed.

## Preparation Ahead of the Particle

Assume a source and detector stationary in the absolute frame, Euclidean separation $L$, emission time $T_0$, and a daughter particle moving directly at constant speed $v_p<c_f$. The arrival times are

$$
T_w=T_0+\frac{L}{c_f},\qquad
T_p=T_0+\frac{L}{v_p},\qquad
T_p-T_w=L\left(\frac1{v_p}-\frac1{c_f}\right)>0.
$$

This establishes the operator's proposed head start at conditional geometric grade. Earlier preparation emissions also arrive according to their individual emission positions and times. A final source configuration is not broadcast as a complete instantaneous data packet: wakes from its constituents carry the emission geometry admitted by the [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), and any reconstruction of the assembly configuration requires a response mechanism. For photons, $v_p<c_f$ is a candidate relation after a common coordinate calibration, not a result derived here. Laboratory optical-path lengths and observer clock intervals cannot silently replace substrate distances and absolute times.

Ahead-of-particle arrivals could condition apparatus or medium histories. Whether they leave a persistent, distinguishable trace is a separate physical question. If they also bias later setting generators, measurement independence must be checked; deterministic preparation alone neither proves nor disproves that statistical condition.

## Why Preparation Alone Remains Bell-Local

Let $\lambda$ include all relevant pre-setting preparation, medium, and apparatus history, including early wakes and correlated detector states. Let $a,b\in\{0,1\}$ label settings and $A,B\in\{-1,+1\}$ outcomes. Suppose the distribution of $\lambda$ is independent of $a,b$, and the subsequent response has no cross-wing setting influence. Then

$$
P(A,B\mid a,b)=\int d\rho(\lambda)\,K_A(A\mid a,\lambda)K_B(B\mid b,\lambda).
$$

Arbitrarily complicated local assembly dynamics, memory, amplification, and stochastic response can be included in these kernels. Write $\alpha_a(\lambda)=\sum_A A K_A(A\mid a,\lambda)$ and $\beta_b(\lambda)=\sum_B B K_B(B\mid b,\lambda)$; each lies in $[-1,1]$. The CHSH integrand obeys

$$
|\alpha_0(\beta_0+\beta_1)+\alpha_1(\beta_0-\beta_1)|
\le |\beta_0+\beta_1|+|\beta_0-\beta_1|
=2\max(|\beta_0|,|\beta_1|)\le2.
$$

Integrating gives $|S|\le2$. This analytic obstruction is independent of any particular detector implementation. Shared preparation wakes enlarge $\lambda$; they do not remove the bound. A violation attributed to this model would require rechecking independence, factorization, and trial selection rather than declaring the inequality false. Bell's [local-causality formulation](https://cqi.inf.usi.ch/qic/Bell1990.pdf) supplies the external constraint, not an architrino-level dynamical premise.

## A Setting-Dependent Channel Has a Different Timing Test

For fixed detector sites separated by $D$, let $T_a$ be the earliest setting-dependent emission at Alice, $\tau_A\ge0$ any additional encoding delay, and $T_B^{\mathrm{lock}}$ the latest time a perturbation can change Bob's eventual recorded outcome. A direct wake carrying Alice's setting is kinematically eligible only if

$$
T_a+\tau_A+\frac{D}{c_f}<T_B^{\mathrm{lock}}.
$$

The reverse direction has its own inequality. A delayed display or storage operation does not extend the physical response window if the outcome is already fixed. Relays through the source or medium add travel distance and response delays. Moving receivers require solving the actual causal-root equation rather than using fixed $D$. Simultaneous final readouts do not establish disconnection: the relevant settings can have been encoded earlier.

In an explicitly assumed common homogeneous calibration with photon speed $c_0<c_f$, a window $\Delta T$ satisfying

$$
\frac{D}{c_f}<\Delta T<\frac{D}{c_0}
$$

can be connected by the proposed wake channel while remaining disconnected by photons. As an illustrative nondimensional example only, take $c_f=1$, $D=1$, $c_0=1/10$, zero encoding delay, and $\Delta T=2$. The wake travel time is $1$ and the photon travel time is $10$. This demonstrates logical timing compatibility, not a measured speed ratio or an experimental reconstruction. If both directional setting-to-outcome routes are unavailable, and no other channel or independence failure exists, the shared-history bound applies.

This is Bell-nonlocal relative to the observer photon cone even though the wake propagates continuously and is received at one event. It requires no instantaneous action. Eligibility does not establish amplitude, pair selectivity, or the required probability law.

## Weak Wakes and Detector Response

The relevant perturbation is the difference between the full received histories for two distant settings under matched source and apparatus conditions. Large background wakes need not carry a large setting-dependent difference. The constituent acceleration contributions contain distance, polarity, direction, and transmitter-root weights; replacing their assembly sum with a single uncancelled inverse-square estimate would lose the actual obligation. Neutral-assembly cancellation, phase, averaging, and surrounding apparatus contributions must be evaluated rather than presumed.

A small perturbation can change a discrete outcome if a trajectory lies near a boundary between outcome basins. That is a possible amplification mechanism; the important quantity is the preparation measure of trajectories whose outcomes change, not the existence of one sensitive trajectory. Neither chaos nor a detector's size establishes this measure.

A conditional quantitative bound sharpens the question. Compare a proposed setting-connected model to a Bell-local reference with the same setting-independent preparation measure and complete binary trial records. For setting pair $(a,b)$ let $p_{ab}$ be the measure on which the outcome product $AB$ differs under a declared coupling of the two models. Since the product is $\pm1$,

$$
|E_{ab}-E_{ab}^{(0)}|\le2p_{ab},\qquad
|S|\le2+2\sum_{a,b}p_{ab}.
$$

Thus reaching the ideal spin-singlet value $2\sqrt2$ requires $\sum_{a,b}p_{ab}\ge\sqrt2-1$. Tiny acceleration can in principle achieve a substantial probability change through sufficient sensitivity, but that sensitivity must be derived over the source measure. This bound neither estimates the wake amplitude nor supplies the physical reference dynamics. Missed detections or setting-dependent retained samples require the experiment's corresponding inequality and cannot be discarded to improve a correlation.

## Magnetism and the Apparatus

Quantum mechanics with electromagnetic coupling describes magnetic moments and Stern-Gerlach splitting; see the [Feynman treatment](https://www.feynmanlectures.caltech.edu/III_07.html). This is an established comparison framework, not a permitted substrate premise. Deriving magnetic-like assembly response from delayed architrino interactions remains a different task. Bell's bound above does not assume a microscopic theory of magnetism: any purely local detector response still fits the kernels.

Bell experiments also use photon polarization analyzers rather than Stern-Gerlach beam splitting. The [NIST photon experiment](https://www.nist.gov/publications/strong-loophole-free-test-local-realism) and its [paper](https://arxiv.org/abs/1511.03189) provide a distinct apparatus family. A candidate must reproduce the appropriate photon polarization law separately from the spin-singlet law. Unmodelled apparatus physics matters if it supplies a concrete cross-wing causal path, setting dependence of the preparation, or an experimentally admissible selection effect; complexity alone does not evade the theorem.

## No-Signaling and the Finite-Speed Obstruction

Even when the setting channel arrives, the derived joint law must satisfy both marginal identities

$$
\sum_B P(A,B\mid a,b)=P(A\mid a),\qquad
\sum_A P(A,B\mid a,b)=P(B\mid b).
$$

On the selected route these identities must hold also for observer-spacelike records connected by $c_f$, not merely before wake arrival. A setting-dependent microscopic response can coexist mathematically with setting-independent averaged marginals, but inserting the desired quantum table or arranging a cancellation by fit is not a derivation of the response.

[Bancal and collaborators](https://arxiv.org/abs/1110.3795) establish a further obstruction for their finite-speed causal model class: reproducing the required quantum marginals in appropriate multipartite arrangements conflicts with operational no-signaling. Their analysis already allows an absolute preferred frame and loss of Bell correlations for disconnected measurements. Those features alone are not escapes.

Application requires an explicit map of the candidate's complete causal domain, screening condition, measurement events, and connected-context predictions to that theorem. Finite wake speed alone does not prove that every possible physical carrier is bounded by $c_f$: the Master Equation discusses super-field-speed constituent histories. Such histories are not automatically a usable assembly communication channel or an exemption from the theorem. Any proposed additional carrier must be derived and entered into the causal-domain assessment. No such carrier is supplied here.

## Result and Next Physical Object

The preparation-head-start statement is conditionally derived; preparation-only Bell recovery is excluded under the displayed independence and factorization assumptions. A later setting-dependent wake is kinematically possible in specified windows, but its physical strength, response measure, pair selectivity, and no-signaling law remain unresolved. The next useful physical object is a specified source–apparatus history with setting-emission and outcome-lock events, followed by a Master-Equation response calculation over a declared preparation measure. Timing failure, a product-screened law, an insufficient outcome-change measure, a setting-dependent marginal, or failure of the multipartite premise audit would each overturn the proposed route at its corresponding stage.

Potential eventual destinations are the existing Bell and measurement chapters after the physical response and its independent evidence exist. This note does not authorize corpus promotion or start a simulation campaign.
