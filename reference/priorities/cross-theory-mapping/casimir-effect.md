# Casimir Effect

## Standard-Theory Concept

The Casimir effect is a boundary-dependent force between conducting or material bodies. In the ideal parallel-plate limit,

$$
\frac{F}{A}
=
-\frac{\pi^2\hbar c}{240a^4},
$$

where $a$ is plate separation. Standard calculations use boundary-modified mode sums, regularization, and material corrections.

## Existing $\mathbb{A}\mathbb{A}\mathbb{A}$ Signals

This case is useful but risky. It can sharpen boundary-sensitive Noether sea state and photon-channel language, but it should not be used as a shortcut to broad vacuum-energy claims. The corpus already says to prefer Noether sea or medium context over empty-space vacuum ontology. The Casimir mapping should therefore focus on boundary-modified material and photon-channel modes.

## Vacuum-Effect Bundle Handoff

Casimir belongs in the vacuum-effect benchmark bundle only through its boundary-sensitive rows. It should consume the shared carrier in [Radiative Corrections: Lamb Shift And $g-2$](radiative-corrections-lamb-shift-g-minus-2.md#vacuum-effect-benchmark-bundle) by selecting the material-boundary and photon-mode components:
$$
\Theta_{\mathrm{Casimir}}
=
\Pi_{\partial M,\gamma}
\Theta_{\mathrm{vac\ eff}}
=
\left(
\theta_{\mathrm{sea}},
\mathcal B_{\partial M},
\mathcal K_{\partial M},
\mathcal L_{\gamma},
\mathcal R_C
\right).
$$
Here $\mathcal B_{\partial M}$ is the plate or material boundary branch, $\mathcal K_{\partial M}$ is the boundary-conditioned photon-mode set, and $\mathcal R_C$ is the force/energy residual. This keeps Casimir in the same Noether sea and photon-channel family as other vacuum-sensitive corrections while blocking the overclaim that a boundary force directly measures an unconstrained empty-space energy density.

## Task Queue

1. `boundary_mode_record` — Define the mode restriction induced by material boundary assemblies. Status: `draft`.
2. `force_ledger` — Close plate force, recoil, material response, and medium update without untracked energy. Status: `draft`.
3. `regularization_gate` — Separate physical boundary subtraction from arbitrary divergent vacuum energy. Status: `draft`.
4. `vacuum_effect_bundle_handoff` — Project the shared vacuum-effect carrier into the Casimir boundary-mode and force rows without using Casimir as a general vacuum-energy proof. Status: `draft`.

## Closure Objects

- Boundary-conditioned mode set $\mathcal{K}_{\partial M}$.
- Material response record for conductor or dielectric plates.
- Force/energy derivative $F=-\partial E_{\mathrm{eff}}/\partial a$.
- Regularization and subtraction record with physical reference state.
- Projection $\Theta_{\mathrm{Casimir}}=\Pi_{\partial M,\gamma}\Theta_{\mathrm{vac\ eff}}$ from the shared vacuum-effect carrier.

## Promotion Map

| Source draft | Promotion target | Gate |
| --- | --- | --- |
| This file | mass-map/condensed-matter-medium-transport | Route material boundary response through medium transport rather than empty-space ontology. |
| This file | [Radiation](../../../content/markdown/aaa/reactions/radiation.md) | Test photon-channel mode restrictions and event-ledger balance. |
| This file | [validation-gates](../dormant-deferred/validation-gates/priorities.md) | Prevent Casimir reasoning from importing unconstrained vacuum-energy claims. |

## Failure Modes

- `casimir.vacuum_overclaim`: boundary force is promoted into a general Noether sea energy proof without the boundary derivation.
- `casimir.material_omission`: material conductivity, temperature, geometry, or surface corrections are ignored.
- `casimir.regularization_gap`: divergent mode sums are subtracted without a physical reference record.
- `casimir.force_no_ledger`: plate force has no recoil or medium-update ledger.
