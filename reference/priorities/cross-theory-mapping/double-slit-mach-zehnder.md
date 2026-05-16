# Double-Slit And Mach-Zehnder Interference

## Standard-Theory Concept

Double-slit and Mach-Zehnder experiments test quantum interference. Standard quantum mechanics assigns complex amplitudes to alternatives and computes intensities from

$$
P(x)
=
|\psi_1(x)+\psi_2(x)|^2.
$$

The central fact is not merely wave-like behavior; it is phase-sensitive outcome statistics under controlled path recombination and which-path disturbance.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

$\mathbb{A}\mathbb{A}\mathbb{A}$ should map interference into assembly and wake language: a localized assembly plus distributed causal-wake/path-history structure. The transfer-operator and basin-measure packet is the natural target because outcomes must arise from deterministic dynamics, basin partitions, detector kernels, and invariant or metastable measures.

## Task Queue

1. `phase_history_functional` — Define a path-history phase or action functional from causal-wake records. Status: `draft`.
2. `which_path_disturbance` — Model detector coupling as a material/assembly ledger update that changes the basin partition. Status: `draft`.
3. `interference_measure` — Recover $|\psi_1+\psi_2|^2$ as an effective basin-measure result. Status: `draft`.

## Closure Objects

- Path-history records $\mathcal{H}_1,\mathcal{H}_2$.
- Effective phase difference $\Delta\phi$ derived from action or wake history.
- Detector response kernel $K_i(\Gamma,\mathcal{H},\zeta)$.
- Basin partition $\{B_x\}$ with measure $\mu_*(B_x)$.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Use interference as the first phase-sensitive basin-measure proof target. |
| This file | [quantum-closure](../quantum-closure/quantum-closure.md) | Map wavefunction ontology into path-history and detector-response records. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add which-path and no-signaling constraints to quantum acceptance. |

## Failure Modes

- `interference.particle_only`: localized assembly ontology erases path-history phase.
- `interference.wave_only`: effective wave language replaces assembly and detector ledger ontology.
- `interference.probability_postulate`: outcome frequencies are assigned rather than derived from basin measures.
- `interference.which_path_gap`: detector interaction changes the pattern without a material or event ledger.
