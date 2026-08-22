# Neutrino Oscillations

## Standard-Theory Concept

Neutrino oscillations arise because flavor states are mixtures of mass states. During propagation, relative phases accumulate and detection probabilities vary with baseline and energy. In the two-flavor approximation,

$$
P_{\alpha\to\beta}
=
\sin^2(2\theta)
\sin^2\!\left(\frac{\Delta m^2 L}{4E}\right).
$$

The full model uses the PMNS matrix and matter effects where applicable.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This case can sharpen internal-state rotation and weak-sector exposure. The standard formula supplies a clean template: propagation phase, internal mixing, baseline-energy scaling, and detector flavor projection. $\mathbb{A}\mathbb{A}\mathbb{A}$ should map this into axial-frame exposure, weak-corridor provenance, and basin/projection measures without treating PMNS entries as fundamental inputs.

## Candidate Closure Steps

These rows decompose the case at draft grade. They are not executable queue
authority; promote an accepted task into [work-queue.md](work-queue.md) before
execution.

1. `internal_rotation` — Define the assembly-state rotation or branch-phase map that replaces mass-eigenstate phase accumulation. Status: `draft`.
2. `weak_projection` — Connect detector flavor labels to weak exposure quotient and axial-frame orientation. Status: `draft`.
3. `matter_effect_gate` — Express matter effects as material/Noether sea response without changing the vacuum mixing record. Status: `draft`.

## Closure Objects

- Internal-state evolution operator $\mathcal{U}_{\nu}(L,E)$.
- Weak exposure projection $\Pi_{\mathrm{weak}}$ and quotient $Q_{\mathrm{weak}}$.
- PMNS-compatible effective matrix as an output of overlap integrals.
- Event ledger for source reaction, propagation, and detection reaction.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [standard-model-closure/weak-sector-gauge-closure](../standard-model-closure/weak-sector-gauge-closure.md) | Use neutrino oscillation as a PMNS and weak-projection closure target. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Treat flavor outcome as detector basin projection after coherent propagation. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Add baseline-energy and matter-effect constraints to weak/quantum intersection gates. |

## Failure Modes

- `neutrino.matrix_import`: PMNS mixing is imported as a parameter table with no assembly overlap origin.
- `neutrino.phase_miss`: baseline-energy oscillation phase is not recovered.
- `neutrino.weak_projection_gap`: source and detector reaction ledgers lack weak exposure rows.
- `neutrino.matter_split`: matter effects require a different mixing ontology from vacuum propagation.
