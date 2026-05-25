# Agency and Internal Causation

This document defines how agency language is used in $\mathbb{A}\mathbb{A}\mathbb{A}$ without adding a separate agency substance or a law-breaking freedom. The detailed quantum-mechanical context remains in [Reality, Quantum, and Causality](../quantum/reality-quantum-causality.md); this page isolates the philosophical and dynamical interpretation.

It also belongs with [Measurement Ontology](../quantum/measurement-ontology.md), [Superposition Mechanism](theory-bridges/superposition-mechanism.md), [Philosophy of Science](philosophy-of-science.md), and [Information / Computation](information-computation.md).

## Internal vs External Causation

The central distinction is not between caused and uncaused behavior. Every admissible behavior remains physically caused. The distinction is between behavior determined almost entirely by an external perturbation and behavior routed through a system's own internal state, threshold placement, feedback history, and attractor structure.

An externally determined system behaves like a fixed-threshold detector in the relevant context. A simple atom in a laser beam may absorb or fail to absorb according to its state and the incident field, but the example does not by itself exhibit a rich internal control architecture that changes its future responsiveness. The causal chain is still lawful, but most of the explanatory weight lies in the externally supplied condition and the fixed response rule.

An internally causal system has state-dependent responsiveness. The He-Rb-He example discussed in [Reality, Quantum, and Causality](../quantum/reality-quantum-causality.md) can be read this way: the assembly may sit in a damped `Ignore Mode` or in a high-sensitivity `Leverage Mode`, and the current mode depends on recent history plus structural feedback. These names are mode labels for a proposed Switch mechanism, not independent ontology.

From the outside, this can look like choice. In the theory-native description, it is attractor selection through internal configuration, path history, and incoming perturbation.

## Functional Agency

Functional agency names a capacity of sufficiently complex assemblies to modulate their own response profile. It does not mean violation of physical law. The relevant capacities are adaptation, discrimination, self-regulation, and navigation among available attractors.

The local vocabulary distinguishes two levels:

- A **Switch** is a bias-to-state mechanism: an upstream bias places a metastable unit nearer to or farther from a threshold, and a later perturbation executes the transition or leaves it inactive.
- A **Decider** is a candidate bias-setting complex: a larger architecture that can tune Switch-like elements, route feedback, and alter future responsiveness.

The He-Rb-He example is currently best treated as a computed Switch candidate, not as a proof of minimal agency. A Decider remains a higher-level architectural claim whose minimality and implementation details require separate derivation.

This vocabulary should not be read as branch-choice metaphysics. In quantum comparisons, a Decider does not select an ontic world from a set of already existing worlds. It changes the physical basin partition, threshold placement, and response timing of an assembly before later perturbations are resolved. Any claim that agency changes outcome statistics must therefore report the bias state, work or dissipation ledger, hold time, and measurable basin-weight shift.

## Primitive Metastability

The deeper point is that metastability is not an accidental feature of complicated organisms. In the current [Noether swarm](../noether-swarm/noether-swarm.md) architecture, every Noether swarm contains a middle binary at the field-speed hinge $v=c_f$, while [Nested Shell Swarm Dynamics](../noether-swarm/nested-shell-swarm-dynamics.md) treats that middle layer as the separator-sensitive fulcrum between the inner self-hit engine and the outer coupling layer. Metastability is therefore built into ordinary assembly structure.

This does not make every Noether swarm an agent. A bare Noether swarm has a threshold-sensitive internal hinge, but it has not yet been shown to set its own threshold, hold a bias, or reuse feedback. The philosophical ladder is:

| Level | Philosophical reading |
| --- | --- |
| Bare Noether swarm | Metastability exists as a physical threshold resource. |
| Switch | Bias-to-state behavior exists when one preparation moves a metastable unit nearer to or farther from a transition boundary. |
| Decider | Functional decision exists when an assembly can set, hold, update, and reuse bias states that change later basin weights. |
| Mature agent | Compatibilist agency exists when many such controlled thresholds are integrated with memory, feedback, and record-making action. |

The most primitive assembly that can make a decision is therefore not the first metastable assembly. It is the first assembly whose internal preparation changes the later basin distribution under the same external boundary context. A metastable middle binary supplies the possibility of alternatives; controlled threshold placement supplies the decision.

## Determinism and Predictability

Determinism does not imply simplicity or practical predictability. A deterministic system can still be high-dimensional, nonlinear, history-dependent, and sensitive near bifurcation boundaries. Under those conditions, limited observers may experience outcomes as open even when the underlying dynamics remain lawful.

The relevant contrast with a simple mechanical body is therefore structural. A networked Decider can contain tunable thresholds, feedback loops, memory-bearing state, and mechanisms that place sub-assemblies nearer to or farther from bifurcation points. A simple impact model lacks that internal control layer in the context being analyzed.

This distinction also keeps ontological and epistemic claims separate. Ontologically, the system evolves through physical dynamics. Epistemically, a Physical Observer may not have enough access to the microstate, wake-phase history, and threshold geometry to predict which attractor will be selected.

The same point can be stated as a local non-closure condition. For a candidate Decider or Switch complex occupying $\Omega\subset\Sigma_t$, write its resolved internal state as $X_\Omega(t)$, its relevant path-history as $\mathcal{H}_{\Omega}^{<t}$, and the causal wakes entering through its boundary as $\mathcal{B}_{\partial\Omega}(t)$. Its effective subsystem evolution has the form
$$
\frac{dX_\Omega}{dt}
=
F_\Omega\!\left(
X_\Omega(t),
\mathcal{H}_{\Omega}^{<t},
\mathcal{B}_{\partial\Omega}(t),
N_{\text{sea}}|_{\Omega}(t)
\right).
$$
The basin geometry and threshold control of the subsystem are therefore functions of internal state plus omitted boundary wakes and Noether sea conditions, not of the locally inspected state alone. Local prediction can fail for an open subsystem even when the $\mathbb{U}_{\text{now}}$ universe-state perspective remains globally deterministic, because the global state retains the finite-speed signals and path-history data that the Physical Observer has not resolved.

A sharper validation condition is to hold the external boundary context fixed and ask whether internal preparation changes the basin weights. Let
$$
c_\Omega(t)=\left(\mathcal{H}_{\Omega}^{<t},\mathcal{B}_{\partial\Omega}(t),N_{\text{sea}}|_{\Omega}(t)\right)
$$
denote that fixed context. For a time window $T$, let $P_{c_\Omega,x,T}(k)$ be the normalized measure of admissible histories that resolve into basin $B_k$ when the internal state is prepared as $X_\Omega(t)=x$. A Switch or Decider claim has measurable internal content only if there are admissible internal states $x_a$ and $x_b$ such that
$$
D\!\left(P_{c_\Omega,x_a,T},P_{c_\Omega,x_b,T}\right)\ge\epsilon_I,
$$
where $D$ is a declared distance on outcome distributions and $\epsilon_I$ is the resolution threshold for the experiment or simulation. The same boundary context $c_\Omega(t)$ must be used on both sides, and the work, dissipation, and hold time needed to maintain $x_a$ or $x_b$ must be recorded. If this distance vanishes under fixed boundary context, the behavior is externally driven or observationally equivalent to a fixed-threshold response. If it is nonzero, the system's stored configuration changes the basin partition without breaking deterministic law.

## Will as Threshold Setting

In this framework, `will` is a compatibilist and functional term for organized threshold setting across a networked assembly. It is not a primitive force and not an exception to causality.

Because metastability is already present in Noether swarm architecture, the philosophical burden shifts. The question is not how uncaused freedom enters matter. The question is how matter with built-in metastable hinges becomes organized enough to prepare its own boundary conditions. On this reading, will is the assembly-level governance of sensitivity: which thresholds are softened, which are damped, which records are allowed to form, and which incoming causal-wake patterns are ignored.

When a Decider amplifies a signal, the proposed sequence is:

1. A subset of sub-assemblies shifts into a higher-sensitivity state.
2. The shift is caused by prior internal updates, feedback, and path history.
3. An incoming potential packet pushes metastable units across their boundaries.
4. The transition cascade creates a macroscopic record or action.

At this scale, threshold boundaries may be modeled as saddle-node or related bifurcation boundaries in a high-dimensional network. The important claim is that the outcome is routed through the assembly's stored configuration and internal update rules rather than imposed as a bare external command.

## Compatibilist Agency

Libertarian free will, understood as uncaused choice or law-violating initiation, is not part of this ontology. Randomness also does not supply freedom; it merely replaces law-governed control with indeterminacy.

Compatibilist agency is the stronger defensible claim. An assembly can count as functionally agentic when its behavior depends on internal architecture, memory-bearing state, feedback, and threshold control in a way that supports adaptive navigation. The difference between a primitive Switch and a mature Decider is a difference in organization and complexity, not a break in physical law.

The He-Rb-He example supplies a minimal worked foothold for threshold tuning. It should not be overread as proving full agency from three atoms. Its value is that it makes the bridge from deterministic dynamics to internal responsiveness concrete.

## Summary

| Concept | Architrino Framework Position |
| --- | --- |
| **Determinism** | Yes, fundamentally (absolute time + master equation; deterministic multistability at thresholds) |
| **Ontological Randomness** | Not used as the agency mechanism; apparent openness comes from inaccessible microstate and path-history detail |
| **Libertarian Free Will** | Excluded as uncaused or law-violating initiation |
| **Compatibilist Agency** | Allowed when complex assemblies navigate deterministic dynamics through internal state and feedback |
| **Mechanism of "Decision"** | Threshold tuning + feedback + memory in networked assemblies |
| **Metastability Substrate** | Field-speed middle binary in the Noether swarm supplies a primitive threshold resource, but not agency by itself |
| **Validation Target** | Fixed boundary context plus different internal preparations must produce a measurable basin-weight shift with work, dissipation, and hold time recorded |
| **Switch** | Bias-to-state mechanism; computed example currently uses He-Rb-He |
| **Decider** | Candidate bias-setting architecture built from controlled thresholds, feedback, and memory |

## Closing Statement

The strongest current claim is that agency can be made physically intelligible as organized threshold control inside deterministic multistable dynamics. That claim remains compatible with absolute time, causal wake history, and lawful assembly evolution. What remains open is the closure path from minimal Switch examples to a fully specified Decider architecture with computed thresholds, feedback channels, and falsifiable predictions.
