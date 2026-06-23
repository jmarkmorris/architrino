# Stern-Gerlach Measurement

## Standard-Theory Concept

Stern-Gerlach experiments split spin-bearing particles into discrete outcome beams in an inhomogeneous magnetic field. For spin-$\tfrac{1}{2}$ systems, measurement along axis $\hat{\mathbf{m}}$ yields outcomes $\pm\hbar/2$ with probabilities determined by the spinor state's projection onto that axis.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

The angular-momentum and spin closure lane already identifies Stern-Gerlach response as a downstream hard gate. $\mathbb{A}\mathbb{A}\mathbb{A}$ needs an ordered-frame spinor lift, a detector/appartus branch-sum impulse, a separatrix in reduced state space, and a basin measure that produces the half-angle rule without external probability postulates.

## Task Queue

1. `ordered_frame_coordinate` — Define the effective spinor coordinate from Noether braid ordered-frame history. Status: `draft`.
2. `apparatus_kernel` — Construct $K_{\pm}^{\mathrm{SG}}$ from apparatus coupling and branch-sum impulse. Status: `draft`.
3. `half_angle_measure` — Recover the spin-$\tfrac{1}{2}$ projection law from basin measures. Status: `draft`.

## Closure Objects

- Ordered-core spinor or quotient coordinate.
- Separatrix $\Sigma_{\hat{\mathbf{m}}}^{\mathrm{SG,red}}$.
- Response kernels $K_{\pm}^{\mathrm{SG}}$.
- Preparation measure $\mu_\alpha$ and record-cycle measure $d\nu_{\mathrm{rec}}$.
- Angular-momentum event ledger for apparatus and target.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | [angular-momentum-spin/photon-measurement-bell-gates](../braid-angular-momentum-spin/photon-measurement-bell-gates.md) | Treat Stern-Gerlach as the first concrete measurement-response proof target. |
| This file | [quantum-closure/transfer-operator-basin-measure](../quantum-closure/transfer-operator-basin-measure.md) | Route outcome weights through basin measures and detector kernels. |
| This file | [validation-gates](../validation-gates/validation-gates.md) | Add discrete spin outcome recovery and no-signaling discipline. |

## Failure Modes

- `sg.continuous_smear`: discrete beams cannot be recovered from deterministic dynamics.
- `sg.spinor_import`: spinor Hilbert-space behavior is imported without an ordered-frame substrate map.
- `sg.no_apparatus_ledger`: apparatus momentum and angular momentum updates are missing.
- `sg.measure_postulate`: outcome weights require an external collapse or probability postulate.
