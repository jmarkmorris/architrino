# Transfer-Operator and Basin-Measure Theorem Packet

This detailed priority file supports [Quantum Closure](quantum-closure.md). It owns the shared measure-theoretic proof grammar for deterministic basin evolution, invariant or metastable measures, Born-rule weights, detector-response kernels, Decider bias shifts, dyadic locks, pilot-wave-like guidance, and algorithmic-resonance coherence depth.

## Core Theorem Target

The common transfer-operator form is:

$$
\mathcal{T}_{\Delta t}\rho(\Gamma)
=
\int
K_{\Delta t}(\Gamma\mid \Gamma',\mathcal{H},\mathcal{W}_{\text{sea}})
\rho(\Gamma')\,d\Gamma'.
$$

The basin partition is:

$$
\mathcal{P}=\{B_i\},
\qquad
p_i=\mu_*(B_i).
$$

A probability or decision claim is promotable only when the operator, basin partition, and invariant or metastable measure are explicit enough to compute outcome weights, detector kernels, or coherence-depth bounds.

## Required Contract

| Field | Required content |
| --- | --- |
| State space | Name the assembly state space, coarse-graining, and variables retained in $\Gamma$. |
| Transfer operator | Define $\mathcal{T}_{\Delta t}$ or an equivalent return map, including the causal-wake and Noether-Sea context. |
| Kernel | State the transition kernel $K_{\Delta t}$, deterministic map, or finite-time pushforward used. |
| Basin partition | Define $\mathcal{P}=\{B_i\}$ and the separatrices or thresholds between basins. |
| Measure | Identify $\mu_*$ as invariant, metastable, or controlled finite-time, and state the domain where that status is valid. |
| Observable weights | Compute $p_i=\mu_*(B_i)$ or the detector / register / decision statistic consumed by the sector. |
| Failure condition | State what fails if weights are assigned interpretively, if the measure is non-invariant, or if the operator hides an external ontology. |

## Consumer Map

| Consumer packet | Local responsibility | Shared theorem burden consumed here |
| --- | --- | --- |
| [quantum-closure.md](quantum-closure.md) | Born-rule closure, detector kernels, pair provenance, Bell gate, and quantum rewrite handoff. | Owns the parent queue; consumes this packet for `transfer_operator` and `invariant_measure`. |
| [agency-decision-and-decider.md](agency-decision-and-decider.md) | Minimal bias-setting complex, work ledger, hold time, and measurable basin-weight shifts. | Uses this packet to treat agency as controlled movement of basin boundaries or weights under a shared $\mu_*$. |
| [algorithmic-resonance-and-pilot-wave.md](algorithmic-resonance-and-pilot-wave.md) | Pilot-wave-like guidance, basin amplitude, feedback terms, and register coherence-depth bounds. | Uses this packet to avoid a second pilot-wave ontology and to make algorithmic resonance a quantitative stress test. |
| [dyadic-lock](../dyadic-lock/dyadic-lock.md) | Finite-$\eta$ reduced phase-amplitude map and stable `1:2` / `1:2:4` fixed-point diagnostics. | Provides a concrete reduced-map laboratory for transfer-operator stability, invariant measures, and basin gaps. |
| [photon-measurement-bell-gates.md](../angular-momentum-spin/photon-measurement-bell-gates.md) | Stern-Gerlach-like response, photon analyzer kernels, record-window quotients, and Bell placement. | Uses this packet for the invariant analyzer measure, detector kernels, and basin-weight calculations after angular-momentum prerequisites exist. |

## First Worked Cases

The first useful cases should be small and computable:

1. **Dyadic reduced map.** A finite-$\eta$ two-layer phase-amplitude return map reports fixed points, Jacobian eigenvalues, basin boundaries, and a candidate invariant or metastable measure.
2. **Photon analyzer return map.** The material analyzer map $T_s$ on $\Theta_{\hat{\mathbf a}}$ reports whether the pass-threshold coordinate $\eta_{\hat{\mathbf a}}$ has uniform pushforward.
3. **Decider basin shift.** A minimal bias state $u_0\to u_1$ reports the work/hold ledger and a measurable change $\mu_*(B_i(u_1))-\mu_*(B_i(u_0))$.

The parent quantum queue still owns the Born-rule and Bell gates. This packet supplies the reusable operator/measure grammar those gates must consume.

## Sector Ownership Rule

Consumer packets own:

1. the local state variables and coarse-graining;
2. the benchmark or observer-facing statistic;
3. the concrete basin partition and apparatus / register / decision variables;
4. the sector-specific failure modes.

This packet owns:

1. the shared transfer-operator theorem schema;
2. the invariant or metastable measure contract;
3. the rule that probabilities cannot be assigned before basin weights are computed;
4. the comparison table showing which consumer packet has consumed the theorem.

## Promotion Gate

The theorem can promote into [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md), [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md), [superposition-mechanism](../../../content/markdown/aaa/theory-bridges/superposition-mechanism.md), [pilot-wave-character](../../../content/markdown/aaa/theory-bridges/pilot-wave-character.md), or [algorithmic-resonance](../../../content/markdown/aaa/quantum/algorithmic-resonance.md) only after at least one worked case reports:

1. a state space and coarse-graining;
2. a transfer operator or return map;
3. a basin partition;
4. an invariant, metastable, or finite-time measure;
5. computed outcome weights or a computable bound;
6. a failure diagnostic.

## Failure Modes

- Born weights are imported as axioms rather than derived from $\mu_*(B_i)$.
- The operator requires a second ontic pilot field instead of a coarse-grained assembly / causal-wake description.
- A detector kernel assumes the observer-level law it is meant to derive.
- A Decider shifts labels but not measurable basin weights.
- Dyadic fixed points are promoted without basin stability or invariant-measure diagnostics.
- Algorithmic resonance claims period extraction without a coherence-depth bound.
- The measure depends on distant detector settings, violates no-signaling, or hides an untracked causal-wake transfer.

## Related Priorities

- [quantum-closure](quantum-closure.md)
- [agency-decision-and-decider](agency-decision-and-decider.md)
- [algorithmic-resonance-and-pilot-wave](algorithmic-resonance-and-pilot-wave.md)
- [dyadic-lock](../dyadic-lock/dyadic-lock.md)
- [angular-momentum-spin](../angular-momentum-spin/angular-momentum-spin.md)
- [simulations](../simulations/simulations.md)
- [validation-gates](../validation-gates/validation-gates.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [quantum-summary](../../../content/markdown/aaa/quantum/quantum-summary.md)
- [measurement-ontology](../../../content/markdown/aaa/quantum/measurement-ontology.md)
- [superposition-mechanism](../../../content/markdown/aaa/theory-bridges/superposition-mechanism.md)
- [reality-quantum-causality](../../../content/markdown/aaa/quantum/reality-quantum-causality.md)
- [wavefunction-ontology](../../../content/markdown/aaa/quantum/wavefunction-ontology.md)
- [algorithmic-resonance](../../../content/markdown/aaa/quantum/algorithmic-resonance.md)
- [pilot-wave-character](../../../content/markdown/aaa/theory-bridges/pilot-wave-character.md)
- [dyadic-resonance-lock](../../../content/markdown/aaa/dynamics/dyadic-resonance-lock.md)
- [bell-theorem](../../../content/markdown/aaa/theory-bridges/bell-theorem.md)
